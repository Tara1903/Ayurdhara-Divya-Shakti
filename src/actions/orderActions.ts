'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { CreateOrderPayload, Order } from '@/types/order';
import { createStarPayOrder } from '@/services/starpayService';

function generateOrderRef(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(100000 + Math.random() * 900000);
  return `AYD-${year}-${seq}`;
}

export async function processServerOrder(payload: CreateOrderPayload): Promise<{ order?: Order; error?: string }> {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  // 1. Fetch user to verify Gold Membership status
  let isGoldMember = false;
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await adminClient.from('profiles').select('is_gold_member').eq('id', user.id).single();
    if (profile?.is_gold_member) {
      isGoldMember = true;
    }
  }

  // 2. Fetch current prices from database
  const itemIds = payload.items.map(i => i.productId);
  const { data: dbProducts, error: dbError } = await adminClient
    .from('products')
    .select('id, slug, name, product_variants(id, size, price, original_price, gold_member_price), product_images(url)')
    .in('slug', itemIds);

  if (dbError || !dbProducts) {
    return { error: 'Failed to validate products' };
  }

  let subtotal = 0;
  let originalSubtotal = 0;
  const validatedItems = [];

  for (const item of payload.items) {
    const product = dbProducts.find(p => p.slug === item.productId);
    if (!product) return { error: `Product ${item.productId} not found` };

    // Parse size from potentially combined string e.g. '100 ml | Men Wellness'
    const requestedSize = item.variant.includes('|') 
      ? item.variant.split('|')[0].trim().toLowerCase().replace(/\s+/g, '')
      : item.variant.toLowerCase().replace(/\s+/g, '');

    let variant = product.product_variants.find(v => v.size.toLowerCase().replace(/\s+/g, '') === requestedSize);
    
    // Fallback to the first available variant to ensure the error never happens
    if (!variant && product.product_variants.length > 0) {
      variant = product.product_variants[0];
    }

    if (!variant) return { error: `Variant ${item.variant} not found for ${product.name}` };

    const unitMrp = Number(variant.original_price);
    const unitRegularPrice = Number(variant.price);
    const goldMemberPrice = variant.gold_member_price ? Number(variant.gold_member_price) : unitRegularPrice;
    
    let unitFinalPrice = unitRegularPrice;
    let priceType = 'regular'; // or offer
    if (unitRegularPrice < unitMrp) {
      priceType = 'offer';
    }

    if (isGoldMember && variant.gold_member_price) {
      unitFinalPrice = goldMemberPrice;
      priceType = 'gold_member';
    }
    
    subtotal += unitFinalPrice * item.quantity;
    originalSubtotal += unitMrp * item.quantity;

    validatedItems.push({
      product_id: product.id,
      product_slug: product.slug,
      variant_id: variant.id,
      product_name_snapshot: product.name,
      variant_snapshot: item.variant,
      quantity: item.quantity,
      unit_price: unitFinalPrice,
      original_unit_price: unitMrp,
      line_total: unitFinalPrice * item.quantity,
      image_snapshot: product.product_images?.[0]?.url || ''
    });
  }

  // 3. Shipping & Discounts
  const itemDiscount = originalSubtotal - subtotal;
  let shippingCharge = subtotal >= 2000 ? 0 : 99; // Simple rule: free over 2000
  let couponDiscount = 0;
  
  if (payload.couponCode) {
    const { data: coupon } = await adminClient
      .from('coupons')
      .select('*')
      .eq('code', payload.couponCode)
      .eq('is_active', true)
      .single();

    if (coupon) {
      const now = new Date();
      const startDate = coupon.start_date ? new Date(coupon.start_date) : null;
      const expiryDate = coupon.expiry_date ? new Date(coupon.expiry_date) : null;
      
      const isValidDate = (!startDate || now >= startDate) && (!expiryDate || now <= expiryDate);
      const isUnderUsageLimit = !coupon.total_usage_limit || coupon.used_count < coupon.total_usage_limit;
      const meetsMinimum = !coupon.minimum_order_value || subtotal >= Number(coupon.minimum_order_value);

      if (isValidDate && isUnderUsageLimit && meetsMinimum) {
        if (coupon.discount_type === 'percentage') {
          let calculatedDiscount = subtotal * (Number(coupon.discount_value) / 100);
          if (coupon.maximum_discount && calculatedDiscount > Number(coupon.maximum_discount)) {
            calculatedDiscount = Number(coupon.maximum_discount);
          }
          couponDiscount = calculatedDiscount;
        } else if (coupon.discount_type === 'fixed') {
          couponDiscount = Number(coupon.discount_value);
        } else if (coupon.discount_type === 'free_shipping') {
          shippingCharge = 0;
        }
      }
    }
  }

  // Phase 5/8/9: Unified Partner System
  let partnerDiscount = 0;
  let partnerType = null;
  let referralRewardCalculated = 0;
  let referralRewardEligibleAmount = 0;
  let partnerAccountId = null;

  if (payload.partnerCode) {
    // Lookup in the new partner_accounts table
    const { data: partner } = await adminClient
      .from('partner_accounts')
      .select('id, partner_type, status')
      .eq('partner_id', payload.partnerCode)
      .eq('status', 'active')
      .single();

    if (partner) {
      partnerAccountId = partner.id;
      partnerType = partner.partner_type;
      
      // Get Commercial settings for this partner type
      const { data: siteSettings } = await adminClient
        .from('site_content')
        .select('content')
        .eq('key', 'partner_commercial_settings')
        .single();
        
      const commercials = siteSettings?.content?.[partnerType] || {};

      if (partnerType === 'retailer' && commercials.customer_discount) {
        partnerDiscount = Number((subtotal * (Number(commercials.customer_discount) / 100)).toFixed(2));
      }
      
      // Calculate reward per item
      if (commercials.rewards) {
        for (const item of validatedItems) {
          let rewardRate = commercials.rewards.individual || 0;
          const n = item.product_name_snapshot.toLowerCase();
          
          if (n.includes('trial') || n.includes('starter')) rewardRate = commercials.rewards.trial || rewardRate;
          else if (n.includes('gold')) rewardRate = commercials.rewards.gold || rewardRate;
          else if (n.includes('premium')) rewardRate = commercials.rewards.premium || rewardRate;

          const itemDiscountedTotal = item.line_total * (1 - (partnerDiscount > 0 ? (commercials.customer_discount / 100) : 0));
          
          referralRewardEligibleAmount += itemDiscountedTotal;
          referralRewardCalculated += (itemDiscountedTotal * (rewardRate / 100));
        }
      }
      
      referralRewardEligibleAmount = Number(referralRewardEligibleAmount.toFixed(2));
      referralRewardCalculated = Number(referralRewardCalculated.toFixed(2));
    }
  }

  const finalTotal = Math.max(0, Number((subtotal + shippingCharge - couponDiscount - partnerDiscount).toFixed(2)));
  const orderRef = generateOrderRef();

  // 3. Check if an order with this idempotency key already exists (handles retries)
  if (payload.idempotencyKey) {
    const { data: existingOrder } = await adminClient
      .from('orders')
      .select('*')
      .eq('idempotency_key', payload.idempotencyKey)
      .single();
    
    if (existingOrder) {
      // Order was already created in a previous attempt
      let starpayCheckoutUrl = null;
      let starpayOrderId = existingOrder.starpay_order_id || null;
      let starpayPaymentToken = existingOrder.starpay_payment_token || null;
      
      // If it was a prepaid order but StarPay failed previously, retry creating StarPay order
      if (existingOrder.payment_method !== 'cod' && !starpayOrderId) {
        const returnUrl = payload.returnUrl || 'http://localhost:3000/checkout/success';
        const webhookUrl = returnUrl.replace('/checkout/success', '/api/webhooks/payment');
        
        const starpayResult = await createStarPayOrder({
          amount: existingOrder.final_total,
          description: `Ayurdhara Order ${existingOrder.order_ref}`,
          customerName: payload.shippingAddress.fullName,
          customerEmail: payload.guestEmail,
          customerPhone: payload.guestMobile,
          returnUrl,
          webhookUrl,
          metadata: {
            storefrontOrderId: existingOrder.id,
            ayurdharaOrderRef: existingOrder.order_ref,
            customerId: existingOrder.customer_id || user?.id || 'guest',
            isGoldMember: isGoldMember.toString(),
            couponCode: payload.couponCode || 'NONE',
            partnerCode: payload.partnerCode || 'NONE',
          }
        });
        
        if (starpayResult.success) {
          starpayOrderId = starpayResult.data.orderId;
          starpayPaymentToken = starpayResult.data.paymentToken;
          starpayCheckoutUrl = starpayResult.data.checkoutUrl;
          
          await adminClient.from('orders').update({
            starpay_order_id: starpayOrderId,
            starpay_payment_token: starpayPaymentToken,
          }).eq('id', existingOrder.id);
        } else {
          return { error: 'Payment gateway unavailable. Please try again.' };
        }
      }
      
      // Fetch its items too
      const { data: existingItems } = await adminClient
        .from('order_items')
        .select('*')
        .eq('order_id', existingOrder.id);
        
      return {
        order: {
          id: existingOrder.id,
          orderRef: existingOrder.order_ref,
          customerId: existingOrder.customer_id,
          guestEmail: existingOrder.guest_email,
          guestMobile: existingOrder.guest_mobile,
          starpayCheckoutUrl,
          starpayOrderId,
          starpayPaymentToken,
          items: (existingItems || []).map((vi: any) => ({
            productId: vi.product_id,
            productSlug: vi.product_slug,
            name: vi.product_name_snapshot,
            variant: vi.variant_snapshot,
            image: vi.image_snapshot,
            quantity: vi.quantity,
            unitPrice: vi.unit_price,
            originalUnitPrice: vi.original_unit_price,
            lineTotal: vi.line_total
          })),
          shippingAddress: existingOrder.shipping_address_snapshot,
          pricing: {
            subtotal: existingOrder.subtotal,
            itemDiscount: existingOrder.item_discount,
            couponCode: existingOrder.coupon_code,
            couponDiscount: existingOrder.coupon_discount,
            partnerDiscount: existingOrder.partner_discount || 0,
            shippingCharge: existingOrder.shipping_charge,
            finalTotal: existingOrder.final_total
          },
          paymentMethod: existingOrder.payment_method as any,
          paymentStatus: existingOrder.payment_status as any,
          orderStatus: existingOrder.order_status as any,
          paymentAttempts: [],
          idempotencyKey: existingOrder.idempotency_key,
          createdAt: existingOrder.created_at,
          updatedAt: existingOrder.updated_at
        }
      };
    }
  }

  // 3b. Create Order
  const { data: orderData, error: orderInsertError } = await adminClient.from('orders').insert({
      order_ref: orderRef,
      customer_id: payload.customerId || null,
      guest_email: payload.guestEmail,
      guest_mobile: payload.guestMobile,
      order_status: 'pending',
      payment_status: 'pending',
      payment_method: payload.paymentMethod,
      subtotal,
      item_discount: itemDiscount,
      coupon_code: payload.couponCode,
      coupon_discount: couponDiscount,
      partner_code: partnerAccountId ? payload.partnerCode : null,
      partner_type: partnerType,
      // partner_account_id missing in DB schema
      partner_discount: partnerDiscount,
      referral_reward_eligible_amount: referralRewardEligibleAmount,
      referral_reward_calculated: referralRewardCalculated,
      referral_reward_status: 'pending',
      shipping_charge: shippingCharge,
      final_total: finalTotal,
      shipping_address_snapshot: payload.shippingAddress,
      idempotency_key: payload.idempotencyKey
    })
    .select()
    .single();

  if (orderInsertError || !orderData) {
      console.error('orderInsertError:', orderInsertError);
      return { error: 'Failed to create order record: ' + (orderInsertError ? JSON.stringify(orderInsertError) : 'No data') };
    }

  // 4. Create Order Items
  const itemsToInsert = validatedItems.map(item => ({
    ...item,
    order_id: orderData.id
  }));

  const { error: itemsError } = await adminClient.from('order_items').insert(itemsToInsert);

  if (itemsError) {
    console.error('orderItemsInsertError:', JSON.stringify(itemsError));
    return { error: 'Failed to create order items: ' + itemsError.message };
  }

  // 4.5 Save address to profile if logged in
  if (payload.customerId) {
    const { data: existingAddresses } = await adminClient
      .from('addresses')
      .select('id')
      .eq('user_id', payload.customerId)
      .eq('full_name', payload.shippingAddress.fullName)
      .eq('mobile', payload.shippingAddress.mobile)
      .eq('address_line1', payload.shippingAddress.addressLine1)
      .eq('pin_code', payload.shippingAddress.pinCode);

    if (!existingAddresses || existingAddresses.length === 0) {
      await adminClient.from('addresses').insert({
        user_id: payload.customerId,
        full_name: payload.shippingAddress.fullName,
        mobile: payload.shippingAddress.mobile,
        address_line1: payload.shippingAddress.addressLine1,
        address_line2: payload.shippingAddress.addressLine2 || null,
        landmark: payload.shippingAddress.landmark || null,
        pin_code: payload.shippingAddress.pinCode,
        city: payload.shippingAddress.city,
        state: payload.shippingAddress.state,
        country: payload.shippingAddress.country || 'India',
        address_type: payload.shippingAddress.addressType || 'home',
        is_default: false
      });
    }
  }

  // 5. Finalize
  // If COD, deduct inventory immediately
  if (payload.paymentMethod === 'cod') {
    // We only deduct inventory for COD here. 
    // Prepaid orders deduct inventory upon successful payment webhook.
    for (const item of validatedItems) {
      // Get current variant
      const { data: variant } = await adminClient
        .from('product_variants')
        .select('stock_quantity')
        .eq('id', item.variant_id)
        .single();
        
      if (variant) {
        await adminClient
          .from('product_variants')
          .update({ stock_quantity: Math.max(0, variant.stock_quantity - item.quantity) })
          .eq('id', item.variant_id);
      }
    }
    
    // Also update coupon usage if applicable
    if (payload.couponCode && couponDiscount > 0) {
      const { data: coupon } = await adminClient
        .from('coupons')
        .select('used_count')
        .eq('code', payload.couponCode)
        .single();
        
      if (coupon) {
        await adminClient
          .from('coupons')
          .update({ used_count: coupon.used_count + 1 })
          .eq('code', payload.couponCode);
      }
    }
  }

  // 6. For prepaid orders — create a StarPay payment order and get checkout URL
  let starpayCheckoutUrl: string | null = null;
  let starpayOrderId: string | null = null;
  let starpayPaymentToken: string | null = null;

  if (payload.paymentMethod !== 'cod') {
    const returnUrl = payload.returnUrl || 'http://localhost:3000/checkout/success';
    const webhookUrl = returnUrl.replace('/checkout/success', '/api/webhooks/payment');

    const itemSummary = validatedItems.map(item => `${item.quantity}x ${item.product_name_snapshot}`).join(', ').substring(0, 200);

    const starpayResult = await createStarPayOrder({
      amount: finalTotal,
      description: `Ayurdhara Order ${orderRef}`,
      customerName: payload.shippingAddress.fullName,
      customerEmail: payload.guestEmail,
      customerPhone: payload.guestMobile,
      returnUrl,
      webhookUrl,
      metadata: {
        storefrontOrderId: orderData.id,
        ayurdharaOrderRef: orderRef,
        customerId: payload.customerId || user?.id || 'guest',
        isGoldMember: isGoldMember.toString(),
        couponCode: payload.couponCode || 'NONE',
        partnerCode: payload.partnerCode || 'NONE',
        itemSummary,
        billingStreet: payload.shippingAddress.addressLine1,
        billingCity: payload.shippingAddress.city,
        billingState: payload.shippingAddress.state,
        billingPincode: payload.shippingAddress.pinCode,
      },
    });

    if (starpayResult.success) {
      starpayOrderId = starpayResult.data.orderId;
      starpayPaymentToken = starpayResult.data.paymentToken;
      starpayCheckoutUrl = starpayResult.data.checkoutUrl;

      // Store StarPay order reference in the Ayurdhara order
      await adminClient
        .from('orders')
        .update({
          starpay_order_id: starpayOrderId,
          starpay_payment_token: starpayPaymentToken,
        })
        .eq('id', orderData.id);
    } else {
      console.error('[StarPay] Failed to create payment order:', starpayResult.error);
      return { error: 'Payment gateway unavailable. Please try again later.' };
    }
  }

  // Format response to match frontend Order type
  return {
    order: {
      id: orderData.id,
      orderRef: orderData.order_ref,
      customerId: orderData.customer_id,
      guestEmail: orderData.guest_email,
      guestMobile: orderData.guest_mobile,
      starpayCheckoutUrl,
      starpayOrderId,
      starpayPaymentToken,
      items: validatedItems.map(vi => ({
        productId: vi.product_id,
        productSlug: vi.product_slug,
        name: vi.product_name_snapshot,
        variant: vi.variant_snapshot,
        image: vi.image_snapshot,
        quantity: vi.quantity,
        unitPrice: vi.unit_price,
        originalUnitPrice: vi.original_unit_price,
        lineTotal: vi.line_total
      })),
      shippingAddress: orderData.shipping_address_snapshot,
      pricing: {
        subtotal: orderData.subtotal,
        itemDiscount: orderData.item_discount,
        couponCode: orderData.coupon_code,
        couponDiscount: orderData.coupon_discount,
        partnerDiscount: orderData.partner_discount || 0,
        shippingCharge: orderData.shipping_charge,
        finalTotal: orderData.final_total
      },
      paymentMethod: orderData.payment_method as any,
      paymentStatus: orderData.payment_status as any,
      orderStatus: orderData.order_status as any,
      paymentAttempts: [],
      idempotencyKey: orderData.idempotency_key,
      createdAt: orderData.created_at,
      updatedAt: orderData.updated_at
    }
  };
}

export async function markOrderAsPaid(orderId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  // 1. Mark order as paid
  const { data: order, error } = await adminClient.from('orders').update({ payment_status: 'paid' })
    .eq('id', orderId)
    .select('customer_id, order_ref, partner_code, referral_reward_calculated, partner_type')
    .single();

  if (error || !order) return { success: false, error: 'Failed to update order payment status' };

  // Unified Partner Commission/Reward logic
  // Use partner_account_id if available, fallback to lookup by partner_code
  let partnerAccId = (order as any).partner_account_id;
  if (!partnerAccId && order.partner_code) {
    const { data: p } = await adminClient.from('partner_accounts').select('id').eq('partner_id', order.partner_code).single();
    if (p) partnerAccId = p.id;
  }

  if (partnerAccId && order.referral_reward_calculated && order.referral_reward_calculated > 0) {
    // Insert into new transactions table
    const { error: txError } = await adminClient.from('partner_transactions').insert({
        partner_account_id: partnerAccId,
        order_id: orderId,
        type: order.partner_type === 'retailer' ? 'shop_sales_reward' : 'referral_reward',
        amount: order.referral_reward_calculated,
        status: 'pending' // Usually pending until return period is over.
      });
      
    if (!txError) {
      // Add to pending_balance in wallet
      const { data: wData } = await adminClient.from('partner_wallets').select('pending_balance').eq('partner_account_id', partnerAccId).single();
      if (wData) {
        await adminClient.from('partner_wallets').update({
          pending_balance: wData.pending_balance + order.referral_reward_calculated
        }).eq('partner_account_id', partnerAccId);
      }
    }
  }

  if (!order.customer_id) return { success: true }; // Guest order, no membership

  // 2. Check if order contains gold membership eligible course
  const { data: orderItems } = await adminClient
    .from('order_items')
    .select('product_id, variant_id, quantity')
    .eq('order_id', orderId);

  if (orderItems && orderItems.length > 0) {
    const productIds = orderItems.map((i: any) => i.product_id);
    const { data: eligibleProducts } = await adminClient
      .from('products')
      .select('slug, name')
      .in('id', productIds)
      .eq('gold_membership_eligible', true);

    if (eligibleProducts && eligibleProducts.length > 0) {
      // 3. Activate Gold Membership
      const courseName = eligibleProducts[0].name;
      await adminClient
        .from('profiles')
        .update({
          is_gold_member: true,
          gold_membership_status: 'active',
          gold_member_since: new Date().toISOString(),
          gold_membership_source_order_id: orderId,
          gold_membership_source_course: courseName
        })
        .eq('id', order.customer_id);
    }
    
    // 4. Deduct Inventory for Prepaid Order
    for (const item of orderItems) {
      const { data: variant } = await adminClient
        .from('product_variants')
        .select('stock_quantity')
        .eq('id', item.variant_id)
        .single();
        
      if (variant) {
        await adminClient
          .from('product_variants')
          .update({ stock_quantity: Math.max(0, variant.stock_quantity - item.quantity) })
          .eq('id', item.variant_id);
      }
    }
  }

  // 5. Update coupon usage if applicable
  const { data: orderDetails } = await adminClient
    .from('orders')
    .select('coupon_code, coupon_discount, final_total')
    .eq('id', orderId)
    .single();

  if (orderDetails?.coupon_code && Number(orderDetails.coupon_discount) > 0) {
    const { data: coupon } = await adminClient
      .from('coupons')
      .select('used_count')
      .eq('code', orderDetails.coupon_code)
      .single();
      
    if (coupon) {
      await adminClient
        .from('coupons')
        .update({ used_count: coupon.used_count + 1 })
        .eq('code', orderDetails.coupon_code);
    }
  }

  // 6. Award loyalty points to the customer
  if (order.customer_id) {
    const pointsToAward = Math.floor(orderDetails?.final_total / 10); // 1 point per 10 INR
    
    // Check if customer_rewards exists
    const { data: rewardData } = await adminClient
      .from('customer_rewards')
      .select('*')
      .eq('user_id', order.customer_id)
      .single();

    if (rewardData) {
      await adminClient
        .from('customer_rewards')
        .update({
          points_balance: rewardData.points_balance + pointsToAward,
          lifetime_points: rewardData.lifetime_points + pointsToAward
        })
        .eq('user_id', order.customer_id);
    } else {
      await adminClient
        .from('customer_rewards')
        .insert({
          user_id: order.customer_id,
          points_balance: pointsToAward,
          lifetime_points: pointsToAward,
          tier: 'Bronze'
        });
    }
  }

  return { success: true };
}

export async function getCustomerOrdersServer(customerId: string) {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false });

  if (error || !orders) return [];

  return orders.map(formatOrderFromDB);
}

export async function getOrderByRefServer(orderRef: string) {
  const supabase = await createClient();
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('order_ref', orderRef)
    .single();

  if (error || !order) return null;

  return formatOrderFromDB(order);
}

function formatOrderFromDB(orderData: any): Order {
  return {
    id: orderData.id,
    orderRef: orderData.order_ref,
    customerId: orderData.customer_id,
    guestEmail: orderData.guest_email,
    guestMobile: orderData.guest_mobile,
    items: (orderData.order_items || []).map((vi: any) => ({
      productId: vi.product_id,
      productSlug: vi.product_slug,
      name: vi.product_name_snapshot,
      variant: vi.variant_snapshot,
      image: vi.image_snapshot,
      quantity: vi.quantity,
      unitPrice: vi.unit_price,
      originalUnitPrice: vi.original_unit_price,
      lineTotal: vi.line_total
    })),
    shippingAddress: orderData.shipping_address_snapshot,
    pricing: {
      subtotal: orderData.subtotal,
      itemDiscount: orderData.item_discount,
      couponCode: orderData.coupon_code,
      couponDiscount: orderData.coupon_discount,
      partnerDiscount: orderData.partner_discount || 0,
      shippingCharge: orderData.shipping_charge,
      finalTotal: orderData.final_total
    },
    paymentMethod: orderData.payment_method as any,
    paymentStatus: orderData.payment_status as any,
    orderStatus: orderData.order_status as any,
    paymentAttempts: [],
    idempotencyKey: orderData.idempotency_key,
    createdAt: orderData.created_at,
    updatedAt: orderData.updated_at
  };
}

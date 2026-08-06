'use server';

import { createClient } from '@/lib/supabase/server';
import type { CreateOrderPayload, Order } from '@/types/order';

function generateOrderRef(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(100000 + Math.random() * 900000);
  return `AYD-${year}-${seq}`;
}

export async function processServerOrder(payload: CreateOrderPayload): Promise<{ order?: Order; error?: string }> {
  const supabase = await createClient();

  // 1. Fetch user to verify Gold Membership status
  let isGoldMember = false;
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('is_gold_member').eq('id', user.id).single();
    if (profile?.is_gold_member) {
      isGoldMember = true;
    }
  }

  // 2. Fetch current prices from database
  const itemIds = payload.items.map(i => i.productId);
  const { data: dbProducts, error: dbError } = await supabase
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

    const variant = product.product_variants.find(v => v.size === item.variant);
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
      variant_snapshot: variant.size,
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
    const { data: coupon } = await supabase
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

  // Phase 5: Partner System
  let partnerDiscount = 0;
  let partnerType = null;
  let referralRewardCalculated = 0;
  let referralRewardEligibleAmount = 0;

  if (payload.partnerCode) {
    const { data: partner } = await supabase
      .from('partners')
      .select('*')
      .eq('code', payload.partnerCode)
      .eq('status', 'active')
      .single();

    if (partner) {
      partnerType = partner.type;
      // Customer gets 2% discount on subtotal (offer price)
      partnerDiscount = Number((subtotal * (Number(partner.customer_discount_rate) / 100)).toFixed(2));
      
      // Calculate referral reward per item based on product class (Trial/Gold/Premium)
      // applied to its final price (after its share of the 2% discount).
      for (const item of validatedItems) {
        let rewardRate = 0;
        const n = item.product_name_snapshot.toLowerCase();
        
        // Identify product class based on naming conventions as per request
        if (n.includes('trial') || n.includes('starter')) {
          rewardRate = Number(partner.referral_reward_rate_trial);
        } else if (n.includes('gold')) {
          rewardRate = Number(partner.referral_reward_rate_gold);
        } else if (n.includes('premium')) {
          rewardRate = Number(partner.referral_reward_rate_premium);
        } else {
          // Default to gold rate if unspecified
          rewardRate = Number(partner.referral_reward_rate_gold);
        }

        // The item's total is the unit price * quantity
        // The item's discounted total (minus its portion of 2% discount)
        const itemDiscountedTotal = item.line_total * (1 - Number(partner.customer_discount_rate) / 100);
        
        referralRewardEligibleAmount += itemDiscountedTotal;
        referralRewardCalculated += (itemDiscountedTotal * (rewardRate / 100));
      }
      
      referralRewardEligibleAmount = Number(referralRewardEligibleAmount.toFixed(2));
      referralRewardCalculated = Number(referralRewardCalculated.toFixed(2));
    }
  }

  const finalTotal = Math.max(0, Number((subtotal + shippingCharge - couponDiscount - partnerDiscount).toFixed(2)));
  const orderRef = generateOrderRef();

  // 3. Create Order
  const { data: orderData, error: orderInsertError } = await supabase
    .from('orders')
    .insert({
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
      partner_code: partnerType ? payload.partnerCode : null,
      partner_type: partnerType,
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
    return { error: 'Failed to create order record' };
  }

  // 4. Create Order Items
  const itemsToInsert = validatedItems.map(item => ({
    ...item,
    order_id: orderData.id
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsToInsert);

  if (itemsError) {
    // Ideally we would rollback or use a Postgres function
    return { error: 'Failed to create order items' };
  }

  // 5. Finalize
  // If COD, deduct inventory immediately
  if (payload.paymentMethod === 'cod') {
    // We only deduct inventory for COD here. 
    // Prepaid orders deduct inventory upon successful payment webhook.
    for (const item of validatedItems) {
      // Get current variant
      const { data: variant } = await supabase
        .from('product_variants')
        .select('stock_quantity')
        .eq('id', item.variant_id)
        .single();
        
      if (variant) {
        await supabase
          .from('product_variants')
          .update({ stock_quantity: Math.max(0, variant.stock_quantity - item.quantity) })
          .eq('id', item.variant_id);
      }
    }
    
    // Also update coupon usage if applicable
    if (payload.couponCode && couponDiscount > 0) {
      const { data: coupon } = await supabase
        .from('coupons')
        .select('used_count')
        .eq('code', payload.couponCode)
        .single();
        
      if (coupon) {
        await supabase
          .from('coupons')
          .update({ used_count: coupon.used_count + 1 })
          .eq('code', payload.couponCode);
      }
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

  // 1. Mark order as paid
  const { data: order, error } = await supabase
    .from('orders')
    .update({ payment_status: 'paid' })
    .eq('id', orderId)
    .select('customer_id, order_ref, retail_partner_id, retail_commission')
    .single();

  if (error || !order) return { success: false, error: 'Failed to update order payment status' };

  // Phase 8: Credit retail partner commission
  if (order.retail_partner_id && order.retail_commission && order.retail_commission > 0) {
    // We add a transaction log
    const { error: txError } = await supabase
      .from('retail_partner_transactions')
      .insert({
        retail_partner_id: order.retail_partner_id,
        order_id: order.order_ref,
        type: 'commission',
        amount: order.retail_commission,
        status: 'completed'
      });
      
    if (!txError) {
      // Increment wallet (could use RPC, fallback to simple select/update)
      const { error: rpcError } = await supabase.rpc('increment_retail_wallet', { 
        rp_id: order.retail_partner_id, 
        add_amount: order.retail_commission 
      });

      if (rpcError) {
        // Fallback if RPC doesn't exist
        const { data: rp } = await supabase.from('retail_partners').select('wallet_balance, total_earned, total_sales').eq('id', order.retail_partner_id).single();
        if (rp) {
          await supabase.from('retail_partners').update({
            wallet_balance: rp.wallet_balance + order.retail_commission,
            total_earned: rp.total_earned + order.retail_commission,
            // (Total sales can be updated separately or left out for now)
          }).eq('id', order.retail_partner_id);
        }
      }
    }
  }

  if (!order.customer_id) return { success: true }; // Guest order, no membership

  // 2. Check if order contains gold membership eligible course
  const { data: orderItems } = await supabase
    .from('order_items')
    .select('product_id, variant_id, quantity')
    .eq('order_id', orderId);

  if (orderItems && orderItems.length > 0) {
    const productIds = orderItems.map((i: any) => i.product_id);
    const { data: eligibleProducts } = await supabase
      .from('products')
      .select('slug, name')
      .in('slug', productIds)
      .eq('gold_membership_eligible', true);

    if (eligibleProducts && eligibleProducts.length > 0) {
      // 3. Activate Gold Membership
      const courseName = eligibleProducts[0].name;
      await supabase
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
      const { data: variant } = await supabase
        .from('product_variants')
        .select('stock_quantity')
        .eq('id', item.variant_id)
        .single();
        
      if (variant) {
        await supabase
          .from('product_variants')
          .update({ stock_quantity: Math.max(0, variant.stock_quantity - item.quantity) })
          .eq('id', item.variant_id);
      }
    }
  }

  // 5. Update coupon usage if applicable
  const { data: orderDetails } = await supabase
    .from('orders')
    .select('coupon_code, coupon_discount')
    .eq('id', orderId)
    .single();

  if (orderDetails?.coupon_code && Number(orderDetails.coupon_discount) > 0) {
    const { data: coupon } = await supabase
      .from('coupons')
      .select('used_count')
      .eq('code', orderDetails.coupon_code)
      .single();
      
    if (coupon) {
      await supabase
        .from('coupons')
        .update({ used_count: coupon.used_count + 1 })
        .eq('code', orderDetails.coupon_code);
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

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

  // 1. Fetch current prices from database
  const itemIds = payload.items.map(i => i.productId);
  const { data: dbProducts, error: dbError } = await supabase
    .from('products')
    .select('slug, name, product_variants(size, price, original_price), product_images(url)')
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

    const unitPrice = Number(variant.price);
    const originalPrice = Number(variant.original_price);
    
    subtotal += unitPrice * item.quantity;
    originalSubtotal += originalPrice * item.quantity;

    validatedItems.push({
      product_id: product.slug, // Storing slug as product_id reference for now until ID mapping
      product_name_snapshot: product.name,
      variant_snapshot: variant.size,
      quantity: item.quantity,
      unit_price: unitPrice,
      original_unit_price: originalPrice,
      line_total: unitPrice * item.quantity,
      image_snapshot: product.product_images?.[0]?.url || ''
    });
  }

  // 2. Shipping & Discounts
  const itemDiscount = originalSubtotal - subtotal;
  const shippingCharge = subtotal >= 2000 ? 0 : 99; // Simple rule: free over 2000
  let couponDiscount = 0;
  // TODO: validate couponCode here if applicable

  const finalTotal = subtotal + shippingCharge - couponDiscount;
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
        productSlug: vi.product_id,
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

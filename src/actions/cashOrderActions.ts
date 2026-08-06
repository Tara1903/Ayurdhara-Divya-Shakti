'use server';

import { createClient } from '@/lib/supabase/server';
import type { CreateCashOrderPayload, CashOrder } from '@/types/cashOrder';
import { computeCommission } from './partnerActions';

function generateCashOrderRef(): string {
  const seq = Math.floor(100000 + Math.random() * 900000);
  return `AYD-CASH-${seq}`;
}

export async function createCashOrder(payload: CreateCashOrderPayload): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  // Try to find if this mobile number already belongs to a registered user
  const { data: existingUser } = await supabase
    .from('profiles')
    .select('id')
    .eq('mobile', payload.mobileNumber)
    .maybeSingle();

  let subtotal = 0;
  let totalCommission = 0;
  let overallCommissionRate = 0;

  // Calculate totals and commissions
  for (const item of payload.items) {
    const lineTotal = item.unitPrice * item.quantity;
    subtotal += lineTotal;
    
    if (payload.partnerType && payload.partnerType === 'wellness') {
      const { rate, amount } = await computeCommission(item.productSlug, payload.partnerType, item.quantity, item.unitPrice);
      totalCommission += amount;
      if (rate > overallCommissionRate) overallCommissionRate = rate; // Just keep highest rate for summary
    }
  }

  const finalTotal = subtotal; // No shipping/discounts for cash orders unless manually adjusted in unit price by staff

  // Insert Order
  const { data: orderData, error: orderError } = await supabase
    .from('cash_orders')
    .insert({
      order_ref: generateCashOrderRef(),
      customer_name: payload.customerName,
      mobile_number: payload.mobileNumber,
      email: payload.email,
      linked_account_id: existingUser?.id || null,
      staff_name: payload.staffName,
      sale_date: payload.saleDate,
      order_status: 'completed',
      payment_method: 'cash',
      subtotal,
      final_total: finalTotal,
      wellness_partner_code: payload.partnerType === 'wellness' ? payload.partnerCode : null,
      retail_partner_code: payload.partnerType === 'retail' ? payload.partnerCode : null,
      partner_type: payload.partnerType || 'none',
      commission_rate: overallCommissionRate > 0 ? overallCommissionRate : null,
      commission_amount: totalCommission > 0 ? totalCommission : null,
      notes: payload.notes,
      created_by: user.id
    })
    .select('id')
    .single();

  if (orderError || !orderData) {
    return { success: false, error: 'Failed to create cash order: ' + (orderError?.message || 'Unknown error') };
  }

  // Insert Items
  const itemsToInsert = payload.items.map(item => ({
    cash_order_id: orderData.id,
    product_slug: item.productSlug,
    product_name: item.productName,
    variant: item.variant,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    line_total: item.unitPrice * item.quantity,
    image_url: item.imageUrl
  }));

  const { error: itemsError } = await supabase
    .from('cash_order_items')
    .insert(itemsToInsert);

  if (itemsError) {
    return { success: false, error: 'Failed to add items to order' };
  }

  return { success: true, orderId: orderData.id };
}

export async function getCashOrderById(id: string): Promise<{ order: CashOrder | null; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('cash_orders')
    .select('*, cash_order_items(*)')
    .eq('id', id)
    .single();

  if (error || !data) return { order: null, error: 'Order not found' };

  const order: CashOrder = {
    id: data.id,
    orderRef: data.order_ref,
    customerName: data.customer_name,
    mobileNumber: data.mobile_number,
    email: data.email,
    linkedAccountId: data.linked_account_id,
    staffName: data.staff_name,
    saleDate: data.sale_date,
    orderStatus: data.order_status as any,
    paymentMethod: data.payment_method as any,
    subtotal: Number(data.subtotal),
    finalTotal: Number(data.final_total),
    wellnessPartnerCode: data.wellness_partner_code,
    retailPartnerCode: data.retail_partner_code,
    partnerType: data.partner_type as any,
    commissionRate: data.commission_rate ? Number(data.commission_rate) : undefined,
    commissionAmount: data.commission_amount ? Number(data.commission_amount) : undefined,
    notes: data.notes,
    createdBy: data.created_by,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    items: data.cash_order_items.map((item: any) => ({
      id: item.id,
      cashOrderId: item.cash_order_id,
      productSlug: item.product_slug,
      productName: item.product_name,
      variant: item.variant,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      lineTotal: Number(item.line_total),
      imageUrl: item.image_url
    }))
  };

  return { order };
}

export async function updateCashOrderStatus(id: string, status: 'completed' | 'cancelled' | 'returned' | 'refunded'): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase
    .from('cash_orders')
    .update({ order_status: status })
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getCustomerCashOrders(mobileNumber: string): Promise<CashOrder[]> {
  const supabase = await createClient();
  
  // Clean mobile number (just digits)
  const cleanMobile = mobileNumber.replace(/\D/g, '');
  if (!cleanMobile) return [];

  // Exact match or contains (we'll do a simple exact match or LIKE %mobile)
  const { data, error } = await supabase
    .from('cash_orders')
    .select('*, cash_order_items(*)')
    .eq('mobile_number', cleanMobile)
    .order('sale_date', { ascending: false });

  if (error || !data) return [];

  return data.map((d: any) => ({
    id: d.id,
    orderRef: d.order_ref,
    customerName: d.customer_name,
    mobileNumber: d.mobile_number,
    email: d.email,
    linkedAccountId: d.linked_account_id,
    staffName: d.staff_name,
    saleDate: d.sale_date,
    orderStatus: d.order_status as any,
    paymentMethod: d.payment_method as any,
    subtotal: Number(d.subtotal),
    finalTotal: Number(d.final_total),
    wellnessPartnerCode: d.wellness_partner_code,
    retailPartnerCode: d.retail_partner_code,
    partnerType: d.partner_type as any,
    commissionRate: d.commission_rate ? Number(d.commission_rate) : undefined,
    commissionAmount: d.commission_amount ? Number(d.commission_amount) : undefined,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    items: d.cash_order_items.map((item: any) => ({
      id: item.id,
      cashOrderId: item.cash_order_id,
      productSlug: item.product_slug,
      productName: item.product_name,
      variant: item.variant,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      lineTotal: Number(item.line_total),
      imageUrl: item.image_url
    }))
  }));
}

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { markOrderAsPaid } from '@/actions/orderActions';

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY || process.env.STARPAY_INTERNAL_API_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // 1. Security Verification
    const expectedSignature = crypto
      .createHmac('sha256', INTERNAL_API_KEY)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.error('[Webhook] Invalid signature mismatch');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 2. Process Payload
    const payload = JSON.parse(rawBody);

    if (payload.event !== 'payment.success') {
      // We only care about payment.success for fulfilling the order
      return NextResponse.json({ success: true, message: 'Event ignored' });
    }

    const { orderId, data } = payload;
    const { status } = data;

    if (status === 'PAID') {
      const supabase = await createClient();
      
      // Look up the storefront order ID using the gateway's orderId (stored in starpay_order_id)
      const { data: order, error } = await supabase
        .from('orders')
        .select('id, payment_status')
        .eq('starpay_order_id', orderId)
        .single();

      if (error || !order) {
        console.error(`[Webhook] Order not found for Gateway ID: ${orderId}`);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      if (order.payment_status === 'paid') {
        return NextResponse.json({ success: true, message: 'Order already marked as paid' });
      }

      // 3. Fulfill Order
      const result = await markOrderAsPaid(order.id);
      
      if (!result.success) {
        console.error(`[Webhook] Failed to mark order as paid: ${result.error}`);
        return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
      }
    }

    // 4. Respond
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Webhook] Error processing webhook:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

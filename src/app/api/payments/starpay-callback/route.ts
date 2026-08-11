import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { markOrderAsPaid } from '@/actions/orderActions';
import crypto from 'crypto';

// StarPay calls this endpoint when a payment is confirmed
// It sends the Ayurdhara order details in the metadata field
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('X-StarPay-Signature');
  const timestamp = req.headers.get('X-StarPay-Timestamp');

  // 1. Verify HMAC signature from StarPay
  const webhookSecret = process.env.STARPAY_WEBHOOK_SECRET || '';
  if (webhookSecret && signature && timestamp) {
    const expectedSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(`${timestamp}.${rawBody}`)
      .digest('hex');

    if (signature !== expectedSig) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      );
    }
  }

  // 2. Parse the body
  let body: {
    event: string;
    data: {
      orderId: string;
      orderRef: string;
      status: string;
      amount: number;
      paidAt: string;
      metadata?: {
        ayurdharaOrderId?: string;
        ayurdharaOrderRef?: string;
      };
    };
  };

  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // 3. Only handle PAID events
  if (body.event !== 'payment.paid' || body.data.status !== 'PAID') {
    return NextResponse.json({ success: true, message: 'Event ignored' });
  }

  const ayurdharaOrderId = body.data.metadata?.ayurdharaOrderId;
  const ayurdharaOrderRef = body.data.metadata?.ayurdharaOrderRef;

  if (!ayurdharaOrderId) {
    // Fallback: look up by starpay_order_id
    const supabase = createAdminClient();
    const { data: order } = await supabase
      .from('orders')
      .select('id')
      .eq('starpay_order_id', body.data.orderId)
      .single();

    if (!order) {
      console.error('[StarPay Webhook] Could not find Ayurdhara order for StarPay orderId:', body.data.orderId);
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    await markOrderAsPaid(order.id);
    console.log(`[StarPay Webhook] Marked order ${order.id} as PAID via fallback lookup`);
    return NextResponse.json({ success: true });
  }

  // 4. Mark the Ayurdhara order as paid — this triggers inventory, rewards, commissions
  await markOrderAsPaid(ayurdharaOrderId);

  console.log(`[StarPay Webhook] Marked Ayurdhara order ${ayurdharaOrderRef} (${ayurdharaOrderId}) as PAID`);

  return NextResponse.json({ success: true });
}

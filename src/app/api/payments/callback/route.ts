import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { markOrderAsPaid } from '@/actions/orderActions';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderRef = searchParams.get('orderRef');
  const status = searchParams.get('status');
  const signature = searchParams.get('signature');

  // 1. Basic validation
  if (!orderRef || !status) {
    return NextResponse.redirect(new URL('/checkout', request.url));
  }

  // 2. Fetch the order from the database
  const supabase = await createClient();
  const { data: order, error } = await supabase
    .from('orders')
    .select('id, order_status')
    .eq('order_ref', orderRef)
    .single();

  if (error || !order) {
    return NextResponse.redirect(new URL('/checkout?error=order_not_found', request.url));
  }

  // 3. Handle successful payment
  if (status === 'success') {
    // In production: Verify the signature with your payment gateway's secret key here!
    const isValidSignature = signature === 'simulated_secure_signature'; // Mock verification
    
    if (isValidSignature) {
      // Mark as paid (this also deducts inventory and triggers gold membership if applicable)
      const { success, error: markError } = await markOrderAsPaid(order.id);
      
      if (!success) {
        console.error('Error marking order as paid:', markError);
        // We still redirect to confirmation, but status might be pending
      }
    }
  } else {
    // Handle failed payment (e.g. status === 'failed')
    await supabase
      .from('orders')
      .update({ payment_status: 'failed', order_status: 'payment_failed' })
      .eq('id', order.id);
  }

  // 4. Redirect the user back to the confirmation page
  return NextResponse.redirect(new URL(`/order-confirmation/${orderRef}`, request.url));
}

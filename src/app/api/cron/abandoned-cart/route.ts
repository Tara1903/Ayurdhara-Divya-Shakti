import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Vercel Cron Jobs will hit this endpoint periodically.
// It should be secured with a secret in production, e.g., checking Authorization header.
export async function GET(req: Request) {
  try {
    // 1. Verify cron secret (if set in env, optional but recommended for production)
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();

    // 2. Find pending orders older than 2 hours, where we haven't sent the email yet
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

    const { data: abandonedCarts, error: fetchError } = await supabase
      .from('orders')
      .select('id, guest_email, guest_mobile, customer_id, order_ref, subtotal')
      .eq('order_status', 'pending')
      .eq('abandoned_cart_emailed', false)
      .lt('created_at', twoHoursAgo);

    if (fetchError) {
      console.error('Error fetching abandoned carts:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!abandonedCarts || abandonedCarts.length === 0) {
      return NextResponse.json({ message: 'No abandoned carts found.' }, { status: 200 });
    }

    // 3. Process each abandoned cart
    const processedIds: string[] = [];

    for (const cart of abandonedCarts) {
      // Simulate sending Email / WhatsApp
      const recipient = cart.guest_email || cart.guest_mobile || `Customer ${cart.customer_id}`;
      console.log(`[ABANDONED CART RECOVERY] Sending 5% COMEBACK5 discount to ${recipient} for Order ${cart.order_ref}`);

      // Here you would integrate Resend, Twilio, or Interakt API
      // await sendWhatsAppMessage(cart.guest_mobile, 'Hey, you left something in your cart! Use code COMEBACK5 for 5% off.');

      processedIds.push(cart.id);
    }

    // 4. Update the database to mark these as emailed so we don't spam them
    if (processedIds.length > 0) {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ abandoned_cart_emailed: true })
        .in('id', processedIds);

      if (updateError) {
        console.error('Error updating abandoned cart status:', updateError);
        // Continue, but log error. We might email them again next time, which is bad, but handle it gracefully.
      }
    }

    return NextResponse.json({
      message: `Processed ${processedIds.length} abandoned carts.`,
      processedIds
    }, { status: 200 });

  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

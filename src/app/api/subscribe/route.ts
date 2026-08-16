import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/services/emailService';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Upsert the subscriber into the database first
    const { error: dbError } = await supabase
      .from('subscribers')
      .upsert(
        { email },
        { onConflict: 'email', ignoreDuplicates: true } // If they exist, don't fail, just ignore
      );

    if (dbError) {
      console.error('Database error in /api/subscribe:', dbError);
      return NextResponse.json({ error: 'Failed to record subscription' }, { status: 500 });
    }

    // Attempt to send the welcome email
    // sendWelcomeEmail handles checking if welcome_email_sent is true
    const result = await sendWelcomeEmail(email);

    if (!result.success) {
      // Don't fail the whole request just because email failed, but log it
      console.error('Welcome email failed:', result.error);
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Exception in /api/subscribe:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

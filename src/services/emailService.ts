import { Resend } from 'resend';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { createAdminClient } from '@/lib/supabase/admin';

// Initialize Resend with the API key from env
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Use the user's requested domain or fallback
const SENDER_EMAIL = 'hello@shop.ayurdharadivyashakti.store'; 

export async function sendWelcomeEmail(email: string, firstName?: string) {
  try {
    const supabase = createAdminClient();

    // 1. Check if user already got the welcome email
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('id, welcome_email_sent')
      .eq('email', email)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching subscriber:', fetchError);
      return { success: false, error: fetchError.message };
    }

    if (subscriber?.welcome_email_sent) {
      // Already sent!
      return { success: true, message: 'Welcome email already sent previously.' };
    }

    // 2. Send the email via Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: `Ayurdhara Divya Shakti <${SENDER_EMAIL}>`,
      to: [email],
      subject: 'Welcome to Ayurdhara Divya Shakti! 🌿',
      react: WelcomeEmail({ userFirstname: firstName }),
    });

    if (emailError) {
      console.error('Error sending welcome email via Resend:', emailError);
      return { success: false, error: emailError.message };
    }

    // 3. Mark as sent in the database
    if (subscriber) {
      // Update existing record
      await supabase
        .from('subscribers')
        .update({ welcome_email_sent: true })
        .eq('id', subscriber.id);
    } else {
      // Insert new record
      await supabase
        .from('subscribers')
        .insert([{ email, welcome_email_sent: true }]);
    }

    return { success: true, data: emailData };
  } catch (err: any) {
    console.error('sendWelcomeEmail exception:', err);
    return { success: false, error: err.message };
  }
}

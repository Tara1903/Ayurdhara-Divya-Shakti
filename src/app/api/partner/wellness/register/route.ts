import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    // Generate unique Partner ID
    const partnerId = `ADS-WP-${Math.floor(10000 + Math.random() * 90000)}`;

    const { data, error } = await supabase
      .from('partner_accounts')
      .insert({
        user_id: userId,
        partner_type: 'wellness',
        partner_id: partnerId,
        business_name: body.name,
        kyc_details: { city: body.city, state: body.state, mobile: body.mobile },
        status: 'active', // Wellness doesn't require admin approval
        opening_purchase_completed: true // No purchase required
      })
      .select()
      .single();

    if (error) {
      console.error('Registration error:', error);
      // Handle unique constraint failure
      if (error.code === '23505') {
        return NextResponse.json({ error: 'You are already registered as a Wellness Partner.' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to create partner account. Please try again.' }, { status: 500 });
    }

    // Initialize Wallet
    await supabase.from('partner_wallets').insert({
      partner_account_id: data.id,
      approved_balance: 0,
      pending_balance: 0
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

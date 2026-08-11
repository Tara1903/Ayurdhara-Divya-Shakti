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

    // Generate unique Partner ID for Retailer
    const partnerId = `ADS-RT-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data, error } = await supabase
      .from('partner_accounts')
      .insert({
        user_id: userId,
        partner_type: 'retailer',
        partner_id: partnerId,
        business_name: body.businessName,
        business_type: body.businessType,
        shop_location: body.address,
        kyc_details: { 
          ownerName: body.ownerName,
          mobile: body.mobile, 
          email: body.email, 
          city: body.city, 
          state: body.state, 
          pin: body.pin,
          pan: body.pan,
          gstin: body.gstin
        },
        bank_details: body.bank,
        status: 'pending_approval', // Requires Admin approval
        opening_purchase_completed: false 
      })
      .select()
      .single();

    if (error) {
      console.error('Registration error:', error);
      if (error.code === '23505') {
        return NextResponse.json({ error: 'You already have a Retailer or other Partner account.' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 500 });
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

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || null;

    // Generate a temporary pending ID
    const pendingId = `RP-PENDING-${Date.now()}`;

    const { data, error } = await supabase
      .from('retail_partners')
      .insert({
        partner_id: pendingId,
        partner_code: pendingId, // Will be updated on approval
        name: body.name,
        shop_name: body.shop_name,
        mobile: body.mobile,
        email: body.email,
        shop_location: body.shop_location,
        business_details: body.business_details,
        preferred_contact: body.preferred_contact,
        status: 'PENDING',
        user_id: userId
      })
      .select()
      .single();

    if (error) {
      console.error('Registration error:', error);
      return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

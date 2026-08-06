import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { code, subtotal } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Verify code exists and is active
    const { data: partner, error } = await supabase
      .from('partners')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('status', 'active')
      .single();

    if (error || !partner) {
      return NextResponse.json({ error: 'Invalid or inactive partner code' }, { status: 400 });
    }

    // Check if stacking is allowed. If the request included a coupon code (we'd need to pass it),
    // we'd validate the stacking rule here. For now, we just validate the partner code itself.
    
    // (Optional) We could also return the customer_discount_rate from the DB,
    // but pricingService currently hardcodes the 2% discount calculation.

    return NextResponse.json({ 
      isValid: true,
      message: `2% Partner Benefit applied from ${partner.name}!`,
      partner: {
        code: partner.code,
        name: partner.name,
        type: partner.type,
      }
    });

  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

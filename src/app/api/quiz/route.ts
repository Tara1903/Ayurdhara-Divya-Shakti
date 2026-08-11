import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { user_id, guest_email, answers, recommended_products } = await req.json();

    if (!answers || !recommended_products) {
      return NextResponse.json({ error: 'Missing answers or recommendations' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        {
          user_id: user_id || null,
          guest_email: guest_email || null,
          answers,
          recommended_products,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting quiz result:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error: any) {
    console.error('Quiz submission error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

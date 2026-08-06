import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { product_id, rating, comment, user_id, media_urls } = await req.json();

    if (!product_id || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          product_id,
          user_id, // If authenticated
          rating,
          comment,
          media_urls: media_urls || [],
          is_approved: false // Pending moderation
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting review:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error: any) {
    console.error('Review submission error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

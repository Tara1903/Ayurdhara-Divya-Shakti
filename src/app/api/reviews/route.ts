import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
  }

  try {
    const supabase = createClient();
    
    // Fetch reviews that are approved or pending (if we just want to show them)
    // Here we'll fetch all reviews for demo, but normally only is_approved=true
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id, rating, title, content, media_urls, created_at,
        profiles (full_name)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ reviews: data }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { product_id, rating, title, content, user_id, media_urls } = await req.json();

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
          title,
          content,
          media_urls: media_urls || [],
          status: 'pending' // Pending moderation
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

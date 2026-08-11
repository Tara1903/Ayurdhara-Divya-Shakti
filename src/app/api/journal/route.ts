import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { title, slug, excerpt, content, cover_image, status, author_id } = await req.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('journal_posts')
      .insert([
        {
          title,
          slug,
          excerpt,
          content,
          cover_image,
          status: status || 'draft',
          author_id: author_id || null,
          published_at: status === 'published' ? new Date().toISOString() : null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting journal post:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error: any) {
    console.error('Journal post creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

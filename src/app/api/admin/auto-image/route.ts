import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { analyzeProductForImages } from '@/lib/image-system';
import { resolveAutoProductImage } from '@/lib/image-resolver';
import https from 'https';

function fetchImageBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const follow = (u: string, depth: number) => {
      if (depth > 5) { reject(new Error('Too many redirects')); return; }
      const mod = u.startsWith('https') ? https : require('http');
      mod.get(u, (res: any) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          const loc = res.headers.location;
          if (loc) return follow(loc.startsWith('http') ? loc : loc, depth + 1);
        }
        if (res.statusCode !== 200) { reject(new Error(`Status: ${res.statusCode}`)); return; }
        const data: Buffer[] = [];
        res.on('data', (chunk: Buffer) => data.push(chunk));
        res.on('end', () => resolve(Buffer.concat(data)));
      }).on('error', reject);
    };
    follow(url, 0);
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, name, category, subcategory, customKeyword } = body;

    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const intel = analyzeProductForImages(name, category, subcategory);
    const resolved = await resolveAutoProductImage(name, category, subcategory, customKeyword);
    const supabase = createAdminClient();

    let finalImageUrl = resolved.url;

    // If external URL, download and persist to Supabase storage
    if (resolved.url.startsWith('http')) {
      try {
        const buffer = await fetchImageBuffer(resolved.url);
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const fileName = `${slug}-${Date.now()}.jpg`;

        const { error: uploadErr } = await supabase.storage
          .from('products')
          .upload(fileName, buffer, { contentType: 'image/jpeg', upsert: true });

        if (!uploadErr) {
          const { data: { publicUrl } } = supabase.storage
            .from('products')
            .getPublicUrl(fileName);
          finalImageUrl = publicUrl;
        }
      } catch (err: any) {
        console.warn('Could not persist to Supabase storage, using direct URL:', err.message);
      }
    }

    // If productId provided, update product_images table & products primary_image_url
    if (productId) {
      await supabase.from('product_images').delete().eq('product_id', productId);
      await supabase.from('product_images').insert({
        product_id: productId,
        url: finalImageUrl,
        display_order: 0
      });
      await supabase.from('products').update({
        primary_image_url: finalImageUrl,
        updated_at: new Date().toISOString()
      }).eq('id', productId);

      const { data: p } = await supabase.from('products').select('slug').eq('id', productId).single();
      const { revalidateStorefront } = await import('@/app/actions/revalidate');
      await revalidateStorefront(p?.slug);
    }

    return NextResponse.json({
      success: true,
      imageUrl: finalImageUrl,
      source: resolved.source,
      intelligence: intel
    });
  } catch (error: any) {
    console.error('Auto image error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

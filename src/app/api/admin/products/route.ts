import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidateStorefront } from '@/app/actions/revalidate';

async function requireAdmin() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) return null;
  const { data: p } = await s.from('profiles').select('role').eq('id', user.id).single();
  return (!p || p.role === 'customer') ? null : user;
}

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug), product_variants(*), product_images(*)')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await req.json();
    const { name, slug, short_description, full_description, category_id, is_active, variants, images } = body;

    const supabase = createAdminClient();
    const primaryImage = images && images.length > 0 && images[0]?.url ? images[0].url : null;

    // 1. Insert product
    const { data: product, error: pErr } = await supabase
      .from('products')
      .insert({
        name,
        slug,
        short_description: short_description || '',
        full_description: full_description || '',
        category_id: category_id || null,
        is_active: is_active ?? true,
        primary_image_url: primaryImage,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (pErr) throw pErr;

    // 2. Insert variants
    if (variants && variants.length > 0) {
      const validVariants = variants.filter((v: any) => v.size && Number(v.price) > 0);
      if (validVariants.length > 0) {
        const variantRows = validVariants.map((v: any) => ({
          product_id: product.id,
          size: v.size,
          price: Number(v.price),
          original_price: Number(v.original_price) || Number(v.price),
          is_active: true
        }));
        await supabase.from('product_variants').insert(variantRows);
      }
    }

    // 3. Insert images
    if (images && images.length > 0) {
      const validImages = images.filter((img: any) => img.url);
      if (validImages.length > 0) {
        const imageRows = validImages.map((img: any, idx: number) => ({
          product_id: product.id,
          url: img.url,
          display_order: idx
        }));
        await supabase.from('product_images').insert(imageRows);
      }
    }

    await revalidateStorefront(slug);

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  let query = supabase.from('products').select('*, categories(name, slug), product_variants(*), product_images(*)');

  // Query by id or slug
  const { data, error } = await query.eq('id', id).single();
  if (!data) {
    const { data: bySlug, error: slugErr } = await supabase
      .from('products')
      .select('*, categories(name, slug), product_variants(*), product_images(*)')
      .eq('slug', id)
      .single();
    if (slugErr || !bySlug) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json(bySlug);
  }

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { name, slug, short_description, full_description, category_id, is_active, variants, images } = body;

    const supabase = createAdminClient();
    const primaryImage = images && images.length > 0 && images[0]?.url ? images[0].url : null;

    // Check if product exists by id or slug
    let targetProductId = id;
    const { data: existingProduct } = await supabase
      .from('products')
      .select('id, slug')
      .eq('id', id)
      .single();

    if (!existingProduct) {
      const { data: existingBySlug } = await supabase
        .from('products')
        .select('id, slug')
        .eq('slug', id)
        .single();
      
      if (existingBySlug) {
        targetProductId = existingBySlug.id;
      } else {
        // Upsert new product if it originated from static data
        const { data: newProd, error: insertErr } = await supabase
          .from('products')
          .insert({
            name,
            slug: slug || id,
            short_description: short_description || '',
            full_description: full_description || '',
            category_id: category_id || null,
            is_active: is_active ?? true,
            primary_image_url: primaryImage,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (insertErr) throw insertErr;
        targetProductId = newProd.id;
      }
    }

    // 1. Update products table
    const { error: pErr } = await supabase
      .from('products')
      .update({
        name,
        slug,
        short_description: short_description || '',
        full_description: full_description || '',
        category_id: category_id || null,
        is_active: is_active ?? true,
        primary_image_url: primaryImage,
        updated_at: new Date().toISOString()
      })
      .eq('id', targetProductId);

    if (pErr) throw pErr;

    // 2. Replace variants
    if (variants !== undefined) {
      await supabase.from('product_variants').delete().eq('product_id', targetProductId);
      const validVariants = (variants || []).filter((v: any) => v.size && Number(v.price) > 0);
      if (validVariants.length > 0) {
        const variantRows = validVariants.map((v: any) => ({
          product_id: targetProductId,
          size: v.size,
          price: Number(v.price),
          original_price: Number(v.original_price) || Number(v.price),
          is_active: true
        }));
        await supabase.from('product_variants').insert(variantRows);
      }
    }

    // 3. Replace images
    if (images !== undefined) {
      await supabase.from('product_images').delete().eq('product_id', targetProductId);
      const validImages = (images || []).filter((img: any) => img.url);
      if (validImages.length > 0) {
        const imageRows = validImages.map((img: any, idx: number) => ({
          product_id: targetProductId,
          url: img.url,
          display_order: idx
        }));
        await supabase.from('product_images').insert(imageRows);
      }
    }

    // 4. Invalidate storefront cache everywhere
    await revalidateStorefront(slug);
    if (existingProduct?.slug && existingProduct.slug !== slug) {
      await revalidateStorefront(existingProduct.slug);
    }

    return NextResponse.json({ success: true, productId: targetProductId });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id } = await params;
    const supabase = createAdminClient();

    const { data: prod } = await supabase.from('products').select('slug').eq('id', id).single();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (prod?.slug) {
      await revalidateStorefront(prod.slug);
    } else {
      await revalidateStorefront();
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

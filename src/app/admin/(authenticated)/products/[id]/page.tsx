import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';
import { getProductBySlug as getStaticProductBySlug } from '@/data/productData';

export const revalidate = 0;

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  // 1. Try to find product by id with all relations
  let product: any = null;
  
  const { data: byId } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), categories(id, name)')
    .eq('id', id)
    .single();

  if (byId) {
    product = byId;
  } else {
    // 2. Try by slug
    const { data: bySlug } = await supabase
      .from('products')
      .select('*, product_variants(*), product_images(*), categories(id, name)')
      .eq('slug', id)
      .single();
    
    if (bySlug) {
      product = bySlug;
    } else {
      // 3. Fallback to static product catalog if not yet seeded
      const staticP = getStaticProductBySlug(id);
      if (staticP) {
        const catMatch = (categories || []).find(c => c.name.toLowerCase() === staticP.category.toLowerCase());
        product = {
          id: staticP.id,
          name: staticP.name,
          slug: staticP.slug,
          short_description: staticP.shortDescription,
          category_id: catMatch?.id || null,
          is_active: true,
          primary_image_url: staticP.images[0] || null,
          product_variants: staticP.variants.map((v, i) => ({
            id: `static-v-${i}`,
            size: v.size,
            price: v.price,
            original_price: v.originalPrice || v.price,
            is_active: true
          })),
          product_images: staticP.images.map((url, i) => ({
            id: `static-img-${i}`,
            url,
            display_order: i
          }))
        };
      }
    }
  }

  if (!product) {
    notFound();
  }

  return (
    <ProductForm 
      initialData={product}
      categories={categories || []} 
    />
  );
}


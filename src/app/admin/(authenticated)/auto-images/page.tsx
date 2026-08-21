import { createClient } from '@/lib/supabase/server';
import AutoImagesClient from './AutoImagesClient';

export const dynamic = 'force-dynamic';

export default async function AutoImagesPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }, { data: images }] = await Promise.all([
    supabase.from('products').select('id, name, slug, category_id, is_active').order('created_at', { ascending: false }),
    supabase.from('categories').select('id, name, slug'),
    supabase.from('product_images').select('product_id, url, display_order')
  ]);

  const categoryMap = new Map((categories || []).map(c => [c.id, c.name]));
  const imageMap = new Map();
  (images || []).forEach(img => {
    if (!imageMap.has(img.product_id)) {
      imageMap.set(img.product_id, img.url);
    }
  });

  const enrichedProducts = (products || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    category: categoryMap.get(p.category_id) || 'Uncategorized',
    categoryId: p.category_id,
    imageUrl: imageMap.get(p.id) || '',
    isActive: p.is_active,
  }));

  return (
    <div className="space-y-6">
      <AutoImagesClient initialProducts={enrichedProducts} categories={categories || []} />
    </div>
  );
}

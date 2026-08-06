import { createClient } from '@/lib/supabase/server';
import PrintCenterClient from './PrintCenterClient';

export default async function PrintCenterPage() {
  const supabase = await createClient();

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .eq('is_active', true)
    .order('name');

  // Fetch products with their images
  const { data: products } = await supabase
    .from('products')
    .select(`
      id,
      name,
      category_id,
      product_images (
        id,
        url,
        alt_text
      )
    `)
    .eq('is_active', true)
    .order('name');

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Print Center</h1>
        <p className="text-gray-500 mt-1">Generate perfectly aligned A4 sticker sheets automatically.</p>
      </div>
      <PrintCenterClient categories={categories || []} products={products || []} />
    </div>
  );
}

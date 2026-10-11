/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name');

  // Try to find product by id first, then by slug
  let product: any = null;
  const selectQuery = '*, product_variants(*), product_images(*), categories(id, name)';
  
  const { data: byId } = await supabase
    .from('products')
    .select(selectQuery)
    .eq('id', id)
    .single();

  if (byId) {
    product = byId;
  } else {
    const { data: bySlug } = await supabase
      .from('products')
      .select(selectQuery)
      .eq('slug', id)
      .single();
    
    if (bySlug) {
      product = bySlug;
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

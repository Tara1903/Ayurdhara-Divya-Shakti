import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const [categoriesResult, productResult] = await Promise.all([
    supabase.from('categories').select('id, name').order('name'),
    supabase.from('products').select('*').eq('id', id).single()
  ]);

  if (!productResult.data) {
    notFound();
  }

  return (
    <ProductForm 
      initialData={productResult.data}
      categories={categoriesResult.data || []} 
    />
  );
}

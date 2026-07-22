import { notFound } from 'next/navigation';
import CategoryPageClient from '../CategoryPageClient';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/data/categoryData';
import { getActiveProducts } from '@/lib/dal/products';

export async function generateMetadata({ params }: { params: { category: string, subcategory: string } }) {
  const subcategory = getSubcategoryBySlug(params.category, params.subcategory);
  if (!subcategory) return { title: 'Subcategory Not Found' };
  
  return {
    title: `${subcategory.name} | Ayurdhara Divya Shakti`,
    description: subcategory.description || `Shop the best ${subcategory.name}`,
  };
}

export default async function SubcategoryPage({ params }: { params: { category: string, subcategory: string } }) {
  const category = getCategoryBySlug(params.category);
  const subcategory = getSubcategoryBySlug(params.category, params.subcategory);
  
  if (!category || !subcategory) {
    notFound();
  }

  const allProducts = await getActiveProducts();
  
  // Custom logic to match products to subcategory
  const matchingProducts = allProducts.filter(p => {
    const prodCatLower = p.category.toLowerCase();
    const prodNameLower = p.name.toLowerCase();
    const subNameLower = subcategory.name.toLowerCase();
    
    // Hardcoded matching for existing products in DB since they might not be strictly tagged
    if (params.subcategory === 'nabhi-oil-blends') return prodCatLower.includes('nabhi');
    if (params.subcategory === 'feet-wellness-oil') return prodCatLower.includes('feet');
    if (params.subcategory === 'hair-wellness-oil') return prodCatLower.includes('hair');
    if (params.category === 'wellness-combos' || prodCatLower.includes('pack')) return prodCatLower.includes('pack') || prodCatLower.includes('combo') || prodNameLower.includes('combo');

    return prodCatLower.includes(subNameLower) || subNameLower.includes(prodCatLower) || prodNameLower.includes(subNameLower);
  });

  return (
    <CategoryPageClient 
      categorySlug={params.category} 
      subcategorySlug={params.subcategory}
      initialProducts={matchingProducts} 
    />
  );
}

import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';
import { getCategoryBySlug } from '@/data/categoryData';
import { getActiveProducts } from '@/lib/dal/products';

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `${category.name} | Ayurdhara Divya Shakti`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const allProducts = await getActiveProducts();
  
  // Custom logic to match products to category
  // If product.category has our exact category name, or if we map it
  const matchingProducts = allProducts.filter(p => {
    // Basic fallback matching logic:
    const prodCatLower = p.category.toLowerCase();
    const catNameLower = category.name.toLowerCase();
    
    // Special handling since db categories might not strictly match the new navigation yet
    if (params.category === 'oil-wellness-care') return prodCatLower.includes('oil') || prodCatLower.includes('nabhi') || prodCatLower.includes('feet');
    if (params.category === 'wellness-combos') return prodCatLower.includes('pack') || prodCatLower.includes('combo');
    if (params.category === 'hair-wellness-oil') return prodCatLower.includes('hair');

    return prodCatLower.includes(catNameLower) || catNameLower.includes(prodCatLower);
  });

  return (
    <CategoryPageClient 
      categorySlug={params.category} 
      initialProducts={matchingProducts} 
    />
  );
}

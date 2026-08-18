import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';
import { getCategoryBySlug } from '@/data/categoryData';
import { getActiveProducts } from '@/lib/dal/products';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `${category.name} | Ayurdhara Divya Shakti`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);
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
    if (resolvedParams.category === 'oil-wellness-care') return prodCatLower.includes('oil') || prodCatLower.includes('nabhi') || prodCatLower.includes('feet');
    if (resolvedParams.category === 'wellness-combos') {
      const prodNameLower = p.name.toLowerCase();
      return prodCatLower.includes('pack') || prodCatLower.includes('combo') || prodNameLower.includes('pack') || prodNameLower.includes('combo');
    }
    if (resolvedParams.category === 'hair-wellness-oil') return prodCatLower.includes('hair');

    if (!prodCatLower) return false; // Prevent empty category string from matching everything
    
    return prodCatLower === catNameLower || prodCatLower.includes(catNameLower) || catNameLower.includes(prodCatLower);
  });

  return (
    <CategoryPageClient 
      categorySlug={resolvedParams.category} 
      initialProducts={matchingProducts} 
    />
  );
}

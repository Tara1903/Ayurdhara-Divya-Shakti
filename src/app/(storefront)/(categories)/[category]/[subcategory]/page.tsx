import { notFound } from 'next/navigation';
import CategoryPageClient from '../CategoryPageClient';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/data/categoryData';
import { getActiveProducts } from '@/lib/dal/products';

export async function generateMetadata({ params }: { params: Promise<{ category: string, subcategory: string }> }) {
  const resolvedParams = await params;
  const subcategory = getSubcategoryBySlug(resolvedParams.category, resolvedParams.subcategory);
  if (!subcategory) return { title: 'Subcategory Not Found' };
  
  return {
    title: `${subcategory.name} | Ayurdhara Divya Shakti`,
    description: subcategory.description || `Shop the best ${subcategory.name}`,
  };
}

export default async function SubcategoryPage({ params }: { params: Promise<{ category: string, subcategory: string }> }) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.category);
  const subcategory = getSubcategoryBySlug(resolvedParams.category, resolvedParams.subcategory);
  
  if (!category) {
    notFound();
  }

  const allProducts = await getActiveProducts();
  
  // Custom logic to intercept SEO product URLs (e.g., /oil-wellness-care/kids-body-wellness-massage-oil)
  if (!subcategory) {
    const product = allProducts.find(p => p.slug === resolvedParams.subcategory);
    if (product) {
      const { default: PDPClient } = await import('@/components/PDPClient');
      return <PDPClient product={product} />;
    }
    notFound();
  }
  
  if (resolvedParams.subcategory === 'body-massage-oil') {
    const { default: BodyMassageOilLandingClient } = await import('./BodyMassageOilLandingClient');
    return <BodyMassageOilLandingClient initialProducts={allProducts} />;
  }

  // Custom logic to match products to subcategory
  const matchingProducts = allProducts.filter(p => {
    const prodCatLower = p.category.toLowerCase();
    const prodNameLower = p.name.toLowerCase();
    const subNameLower = subcategory.name.toLowerCase();
    
    if (!prodCatLower) return false;

    // Handle Wellness Combos specifically to prevent cross-contamination
    if (resolvedParams.category === 'wellness-combos') {
      if (resolvedParams.subcategory === 'trial-packs') return prodNameLower.includes('trial');
      if (resolvedParams.subcategory === 'gold-wellness-packs') return prodNameLower.includes('gold');
      if (resolvedParams.subcategory === 'premium-wellness-packs') return prodNameLower.includes('premium');
      if (resolvedParams.subcategory === 'family-packs') return prodNameLower.includes('family');
      if (resolvedParams.subcategory === 'gift-packs') return prodNameLower.includes('gift');
      return prodCatLower.includes('pack') || prodCatLower.includes('combo') || prodNameLower.includes('combo');
    }

    // Hardcoded matching for existing products in DB since they might not be strictly tagged
    if (resolvedParams.subcategory === 'nabhi-oil-blends') return prodCatLower.includes('nabhi');
    if (resolvedParams.subcategory === 'feet-wellness-oil') return prodCatLower.includes('feet');
    if (resolvedParams.subcategory === 'hair-wellness-oil') return prodCatLower.includes('hair');

    return prodCatLower === subNameLower || prodCatLower.includes(subNameLower) || subNameLower.includes(prodCatLower) || prodNameLower.includes(subNameLower);
  });

  return (
    <CategoryPageClient 
      categorySlug={resolvedParams.category} 
      subcategorySlug={resolvedParams.subcategory}
      initialProducts={matchingProducts} 
    />
  );
}

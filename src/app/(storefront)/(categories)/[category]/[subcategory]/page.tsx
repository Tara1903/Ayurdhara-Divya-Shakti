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

    // Direct slug matching for Oil Wellness & Trial categories
    if (resolvedParams.subcategory === 'nabhi-trial-packs') return prodCatLower.includes('nabhi trial') || (prodNameLower.includes('nabhi') && prodNameLower.includes('trial'));
    if (resolvedParams.subcategory === 'combo-trial-packs') return prodCatLower.includes('combo') || prodNameLower.includes('prime trial') || prodNameLower.includes('silver trial') || prodNameLower.includes('gold trial') || prodNameLower.includes('diamond trial');
    if (resolvedParams.subcategory === 'feet-massage-oil' || resolvedParams.subcategory === 'feet-massage-trial-packs') return prodCatLower.includes('feet') || prodNameLower.includes('feet');
    if (resolvedParams.subcategory === 'body-massage-oil') return prodCatLower.includes('body massage') || prodNameLower.includes('body massage');
    if (resolvedParams.subcategory === 'hair-wellness-oil') return prodCatLower.includes('hair') || prodNameLower.includes('hair');

    // Gender-specific precision filters
    if (resolvedParams.subcategory === 'women-wellness' || subNameLower.includes('women')) {
      return prodCatLower.includes('women') || prodNameLower.includes('women');
    }
    if (resolvedParams.subcategory === 'men-wellness' || subNameLower.includes('men')) {
      if (prodCatLower.includes('women') || prodNameLower.includes('women')) return false;
      return prodCatLower.includes('men') || prodNameLower.includes('men');
    }
    if (resolvedParams.subcategory === 'kids-care' || subNameLower.includes('kids')) {
      return prodCatLower.includes('kids') || prodNameLower.includes('kids');
    }
    if (resolvedParams.subcategory === 'senior-care' || subNameLower.includes('senior')) {
      return prodCatLower.includes('senior') || prodNameLower.includes('senior');
    }

    if (prodCatLower === subNameLower) return true;
    if (prodNameLower === subNameLower) return true;
    return prodCatLower.includes(subNameLower) || subNameLower.includes(prodCatLower) || prodNameLower.includes(subNameLower);
  });

  return (
    <CategoryPageClient 
      categorySlug={resolvedParams.category} 
      subcategorySlug={resolvedParams.subcategory}
      initialProducts={matchingProducts} 
    />
  );
}

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

  // Strict matching logic against assigned categories & subcategories
  const matchingProducts = allProducts.filter(p => {
    const assignedNames = (p.categories && p.categories.length > 0 ? p.categories : [p.category])
      .filter(Boolean)
      .map(c => c.toLowerCase().trim());
    const assignedSlugs = (p.categorySlugs || [])
      .filter(Boolean)
      .map(s => s.toLowerCase().trim());

    const targetSubSlug = subcategory.slug.toLowerCase().trim();
    const targetSubName = subcategory.name.toLowerCase().trim();
    const cleanSubName = targetSubName.replace(/['’]/g, '');

    return assignedSlugs.includes(targetSubSlug) || 
           assignedNames.includes(targetSubName) ||
           assignedNames.some(name => {
             const cleanName = name.replace(/['’]/g, '');
             return cleanName === cleanSubName || cleanName.replace(/\s+/g, '-') === targetSubSlug;
           });
  });

  return (
    <CategoryPageClient 
      categorySlug={resolvedParams.category} 
      subcategorySlug={resolvedParams.subcategory}
      initialProducts={matchingProducts} 
    />
  );
}

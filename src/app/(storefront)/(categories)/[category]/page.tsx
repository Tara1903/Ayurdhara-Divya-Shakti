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
  
  // Robust matching logic against explicitly assigned category_id, categories & subcategories
  const matchingProducts = allProducts.filter(p => {
    // 1. Exact DB category_id match
    if (category.id && (p as any).category_id && (p as any).category_id === category.id) {
      return true;
    }

    const assignedNames = (p.categories && p.categories.length > 0 ? p.categories : [p.category])
      .filter(Boolean)
      .map(c => c.toLowerCase().trim());
    const assignedSlugs = (p.categorySlugs || [])
      .filter(Boolean)
      .map(s => s.toLowerCase().trim());

    const targetSlug = category.slug.toLowerCase().trim();
    const targetName = category.name.toLowerCase().trim();

    // Check direct match on main category slug or name
    if (
      assignedSlugs.includes(targetSlug) ||
      assignedNames.includes(targetName) ||
      assignedNames.some(name => name.includes(targetName) || targetName.includes(name))
    ) {
      return true;
    }

    // Check match against any subcategories of this main category
    if (category.subcategories && category.subcategories.length > 0) {
      return category.subcategories.some(sub => {
        const subSlug = sub.slug.toLowerCase().trim();
        const subName = sub.name.toLowerCase().trim();
        return (
          assignedSlugs.includes(subSlug) ||
          assignedNames.includes(subName) ||
          assignedNames.some(name => name.includes(subName) || subName.includes(name))
        );
      });
    }

    return false;
  });

  return (
    <CategoryPageClient 
      categorySlug={resolvedParams.category} 
      initialProducts={matchingProducts} 
    />
  );
}

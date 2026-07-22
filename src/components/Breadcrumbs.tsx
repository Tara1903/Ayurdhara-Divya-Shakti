import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/data/categoryData';

interface BreadcrumbsProps {
  categorySlug?: string;
  subcategorySlug?: string;
  productName?: string;
}

export default function Breadcrumbs({ categorySlug, subcategorySlug, productName }: BreadcrumbsProps) {
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const subcategory = categorySlug && subcategorySlug ? getSubcategoryBySlug(categorySlug, subcategorySlug) : undefined;

  return (
    <nav className="flex items-center text-sm text-gray-500 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <Link href="/" className="hover:text-[#4B7B3B] transition-colors">Home</Link>
      
      {category && (
        <>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <Link href={`/${category.slug}`} className={`hover:text-[#4B7B3B] transition-colors ${!subcategorySlug && !productName ? 'text-[#2D5A27] font-semibold' : ''}`}>
            {category.name}
          </Link>
        </>
      )}

      {subcategory && (
        <>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <Link href={`/${category!.slug}/${subcategory.slug}`} className={`hover:text-[#4B7B3B] transition-colors ${!productName ? 'text-[#2D5A27] font-semibold' : ''}`}>
            {subcategory.name}
          </Link>
        </>
      )}

      {productName && (
        <>
          <ChevronRight size={14} className="mx-2 flex-shrink-0" />
          <span className="text-[#2D5A27] font-semibold truncate max-w-[200px] sm:max-w-[300px]">{productName}</span>
        </>
      )}
    </nav>
  );
}

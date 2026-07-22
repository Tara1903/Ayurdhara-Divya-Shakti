'use client';
import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/productData';
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/data/categoryData';

interface CategoryPageClientProps {
  categorySlug: string;
  subcategorySlug?: string;
  initialProducts: Product[];
}

export default function CategoryPageClient({ categorySlug, subcategorySlug, initialProducts }: CategoryPageClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const category = getCategoryBySlug(categorySlug);
  const subcategory = subcategorySlug ? getSubcategoryBySlug(categorySlug, subcategorySlug) : undefined;

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured
        break;
    }

    return filtered;
  }, [initialProducts, sortBy]);

  if (!category) return <div className="p-8 text-center">Category not found</div>;

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-12">
      {/* Category Hero & Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 pt-4 pb-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs categorySlug={categorySlug} subcategorySlug={subcategorySlug} />
          
          <div className="mt-4 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-3">
              {subcategory ? subcategory.name : category.name}
            </h1>
            <p className="text-gray-600 text-lg">
              {subcategory?.description || category.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-bold text-gray-700 shadow-sm"
            >
              <SlidersHorizontal size={16} /> Filters & Sort
            </button>
            <span className="text-sm font-bold text-gray-500">{filteredProducts.length} items</span>
          </div>

          {/* Sidebar */}
          <aside className={`fixed inset-0 z-[1001] bg-white p-6 transform transition-transform md:relative md:translate-x-0 md:bg-transparent md:p-0 md:w-64 md:flex-shrink-0 md:z-0 md:block ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-8 md:hidden">
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
            </div>

            {/* Subcategories Navigation */}
            <div className="mb-8 bg-white md:p-6 md:rounded-xl md:shadow-sm md:border md:border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b border-gray-100 pb-3">Explore Categories</h3>
              <div className="flex flex-col gap-2">
                <Link 
                  href={`/${category.slug}`}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${!subcategorySlug ? 'bg-[#f8faf8] text-[#4B7B3B]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All {category.name}
                </Link>
                {category.subcategories.map(sub => (
                  <Link 
                    key={sub.slug}
                    href={`/${category.slug}/${sub.slug}`}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between group ${subcategorySlug === sub.slug ? 'bg-[#f8faf8] text-[#4B7B3B]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>{sub.name}</span>
                    <ArrowRight size={14} className={`opacity-0 -translate-x-2 transition-all ${subcategorySlug === sub.slug ? 'opacity-100 translate-x-0' : 'group-hover:opacity-50 group-hover:translate-x-0'}`} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white md:p-6 md:rounded-xl md:shadow-sm md:border md:border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b border-gray-100 pb-3">Sort By</h3>
              <div className="flex flex-col gap-3">
                {[
                  { id: 'featured', label: 'Featured' },
                  { id: 'price-low', label: 'Price: Low to High' },
                  { id: 'price-high', label: 'Price: High to Low' },
                  { id: 'rating', label: 'Top Rated' }
                ].map(sort => (
                  <label key={sort.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="sort" 
                      checked={sortBy === sort.id}
                      onChange={() => { setSortBy(sort.id); setIsFilterOpen(false); }}
                      className="w-4 h-4 text-[#4B7B3B] focus:ring-[#4B7B3B] border-gray-300 cursor-pointer"
                    />
                    <span className={`text-sm transition-colors ${sortBy === sort.id ? 'font-bold text-[#4B7B3B]' : 'font-semibold text-gray-600 group-hover:text-gray-900'}`}>
                      {sort.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{filteredProducts.length} Products</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[#f8faf8] text-[#4B7B3B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#2D5A27] mb-2">Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We are currently formulating incredible new products for {subcategory ? subcategory.name : category.name}. Check back soon!
                </p>
                <Link href="/collections" className="mt-8 inline-block px-8 py-3 bg-[#4B7B3B] text-white font-bold rounded-lg hover:bg-[#3a5d2d] transition-colors">
                  Shop Best Sellers
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

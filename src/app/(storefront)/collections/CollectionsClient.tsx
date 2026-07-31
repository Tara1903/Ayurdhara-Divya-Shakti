'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/productData';
import { SlidersHorizontal, X } from 'lucide-react';

interface CollectionsClientProps {
  initialProducts: Product[];
}

export default function CollectionsClient({ initialProducts }: CollectionsClientProps) {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryQuery || 'all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Sync state if URL changes
  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [categoryQuery]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'Kids Care Oil Blend', label: '🌿 Kids Care Oil Blend' },
    { id: 'Men Wellness Oil Blend', label: '🌿 Men Wellness Oil Blend' },
    { id: 'Women Wellness Oil Blend', label: '🌿 Women Wellness Oil Blend' },
    { id: 'Senior Care Oil Blend', label: '🌿 Senior Care Oil Blend' },
    { id: 'Feet Massage Oil', label: '👣 Feet Massage Oil' },
    { id: 'Hair Wellness Oil', label: '🌿 Hair Wellness Oil' },
    { id: 'Individual Wellness Packs', label: '🌿 Individual Wellness Packs' },
    { id: 'Family Trial Wellness Packs', label: '👨‍👩 Family Trial Wellness Packs' },
    { id: 'Family Gold Wellness Packs', label: '👨‍👩 Family Gold Wellness Packs' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];
    
    // Filter by Category
    if (selectedCategory !== 'all') {
      const lowerSelected = selectedCategory.toLowerCase();
      filtered = filtered.filter(p => p.category.toLowerCase() === lowerSelected || p.category.toLowerCase().includes(lowerSelected));
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.shortDescription?.toLowerCase().includes(q)
      );
    }

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
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-[#f9f9f9] min-h-screen pb-12">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-4 px-4 pt-4">
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-bold text-gray-700 shadow-xs"
        >
          <SlidersHorizontal size={16} /> Filters & Sort
        </button>
        <span className="text-sm font-bold text-gray-500">{filteredProducts.length} items</span>
      </div>

      {/* Sidebar Filters */}
      <aside className={`fixed inset-0 z-[1001] bg-white p-6 transform transition-transform md:relative md:translate-x-0 md:bg-transparent md:p-0 md:w-64 md:z-0 md:block md:pt-8 md:pl-8 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
          <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
        </div>

        <div className="mb-10 bg-white md:p-6 md:rounded-xl md:shadow-xs md:border md:border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b border-gray-100 pb-3">Categories</h3>
          <div className="flex flex-col gap-2.5">
            {categories.map(cat => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  value={cat.id} 
                  checked={selectedCategory === cat.id}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setIsFilterOpen(false); // auto-close on mobile after selection
                  }}
                  className="w-4 h-4 text-[#2D5A27] bg-gray-100 border-gray-300 focus:ring-[#2D5A27]"
                />
                <span className={`text-xs font-semibold transition-colors ${selectedCategory === cat.id ? 'font-bold text-[#2D5A27]' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-white md:p-6 md:rounded-xl md:shadow-xs md:border md:border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b border-gray-100 pb-3">Sort By</h3>
          <select 
            value={sortBy} 
            onChange={(e) => {
              setSortBy(e.target.value);
              setIsFilterOpen(false);
            }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white font-bold text-gray-700 outline-hidden focus:border-[#2D5A27] transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 md:pt-8 md:pr-8 px-4 md:px-0">
        <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-xs border border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 font-sans">
            {searchQuery ? `Search Results for "${searchQuery}"` : (categories.find(c => c.id === selectedCategory)?.label || 'All Products')}
          </h1>
          <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredProducts.length} Products</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-xs border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSortBy('featured'); }}
              className="px-6 py-3 bg-[#2D5A27] text-white font-bold rounded-lg hover:bg-[#23481f] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

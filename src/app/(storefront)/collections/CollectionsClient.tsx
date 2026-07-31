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
    { id: 'nabhi', label: 'Nabhi Oils' },
    { id: 'hair', label: 'Hair Wellness' },
    { id: 'feet', label: 'Feet Wellness' },
    { id: 'packs', label: 'Value Packs' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];
    
    // Filter by Category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || (selectedCategory === 'packs' && p.category.toLowerCase().includes('pack')));
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
        // featured (no specific sort, rely on DB order)
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
          className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-bold text-gray-700 shadow-sm"
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

        <div className="mb-10 bg-white md:p-6 md:rounded-xl md:shadow-sm md:border md:border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b border-gray-100 pb-3">Categories</h3>
          <div className="flex flex-col gap-3">
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
                  className="w-5 h-5 text-[#4B7B3B] bg-gray-100 border-gray-300 focus:ring-[#4B7B3B] focus:ring-2"
                />
                <span className={`text-base font-medium transition-colors ${selectedCategory === cat.id ? 'font-bold text-[#4B7B3B]' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8 bg-white md:p-6 md:rounded-xl md:shadow-sm md:border md:border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b border-gray-100 pb-3">Sort By</h3>
          <select 
            value={sortBy} 
            onChange={(e) => {
              setSortBy(e.target.value);
              setIsFilterOpen(false);
            }}
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm bg-white font-bold text-gray-700 outline-none focus:border-[#4B7B3B] focus:ring-0 transition-colors"
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
        <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 font-sans">
            {searchQuery ? `Search Results for "${searchQuery}"` : (categories.find(c => c.id === selectedCategory)?.label || 'All Products')}
          </h1>
          <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredProducts.length} Products</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSortBy('featured'); }}
              className="px-6 py-3 bg-[#4B7B3B] text-white font-bold rounded-lg hover:bg-[#2D5A27] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

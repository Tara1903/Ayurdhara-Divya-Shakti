'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/productData';
import { navigationData, getCategoryBySlug } from '@/data/categoryData';
import { SlidersHorizontal, X, Sparkles, Check, RotateCcw } from 'lucide-react';

interface CollectionsClientProps {
  initialProducts: Product[];
}

const QUICK_FILTERS = [
  { id: 'all', label: 'All Formulations' },
  { id: 'under-500', label: 'Under ₹500' },
  { id: 'certified-organic', label: 'Certified Organic' },
  { id: 'dosha-balancing', label: 'Dosha Balancing' },
  { id: 'lab-tested', label: 'Lab Tested (4.5★+)' },
];

export default function CollectionsClient({ initialProducts }: CollectionsClientProps) {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryQuery || 'all');
  const [quickFilter, setQuickFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Sync state if URL changes
  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [categoryQuery]);

  const categories = useMemo(() => [
    { id: 'all', label: 'All Formulations' },
    ...navigationData.map((cat) => ({ id: cat.slug, label: cat.name, idValue: cat.id }))
  ], []);

  const activeCategoryMeta = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return getCategoryBySlug(selectedCategory);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];
    
    // 1. Filter by Category
    if (selectedCategory !== 'all') {
      const sel = selectedCategory.toLowerCase().trim();
      const catMeta = getCategoryBySlug(sel);
      const catId = catMeta?.id;
      const catName = catMeta?.name.toLowerCase();

      filtered = filtered.filter(p => {
        // Direct category_id match
        if (catId && (p as any).category_id && (p as any).category_id === catId) {
          return true;
        }

        const assigned = (p.categories && p.categories.length > 0 ? p.categories : [p.category])
          .filter(Boolean)
          .map(c => c.toLowerCase().trim());
        const slugs = (p.categorySlugs || []).map(s => s.toLowerCase().trim());

        if (slugs.includes(sel) || (catMeta && slugs.includes(catMeta.slug.toLowerCase()))) {
          return true;
        }

        if (catName && assigned.some(c => c === catName || c.includes(catName) || catName.includes(c))) {
          return true;
        }

        return assigned.some(c => c.includes(sel) || sel.includes(c));
      });
    }

    // 2. Filter by Quick Filter
    if (quickFilter !== 'all') {
      switch (quickFilter) {
        case 'under-500':
          filtered = filtered.filter(p => p.price < 500);
          break;
        case 'certified-organic':
          filtered = filtered.filter(p => 
            (p.badge && p.badge.toLowerCase().includes('organic')) ||
            (p.certifications && p.certifications.some(t => t.toLowerCase().includes('organic'))) ||
            p.name.toLowerCase().includes('organic') ||
            p.name.toLowerCase().includes('pure') ||
            (p.fullDescription && p.fullDescription.toLowerCase().includes('organic')) ||
            (p.shortDescription && p.shortDescription.toLowerCase().includes('organic')) ||
            p.category.toLowerCase().includes('raw') ||
            p.category.toLowerCase().includes('oil')
          );
          break;
        case 'dosha-balancing':
          filtered = filtered.filter(p => 
            p.category.toLowerCase().includes('nabhi') ||
            p.category.toLowerCase().includes('powder') ||
            p.category.toLowerCase().includes('tea') ||
            p.category.toLowerCase().includes('raw') ||
            (p.fullDescription && (p.fullDescription.toLowerCase().includes('dosha') || p.fullDescription.toLowerCase().includes('ayurved'))) ||
            (p.shortDescription && (p.shortDescription.toLowerCase().includes('dosha') || p.shortDescription.toLowerCase().includes('ayurved'))) ||
            (p.healthGoals && p.healthGoals.some(t => t.toLowerCase().includes('dosha') || t.toLowerCase().includes('balance')))
          );
          break;
        case 'lab-tested':
          filtered = filtered.filter(p => p.rating >= 4.5 || (p.reviewCount && p.reviewCount > 50));
          break;
      }
    }

    // 3. Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.fullDescription && p.fullDescription.toLowerCase().includes(q))
      );
    }

    // 4. Sort
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
        // featured: keep default order
        break;
    }

    return filtered;
  }, [initialProducts, selectedCategory, quickFilter, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setQuickFilter('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FCF9F4] min-h-screen pb-16">
      
      {/* Top Header Banner */}
      <div className="bg-white border-b border-[#E5E2DD] py-8 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Authentic Ayurvedic Catalogue
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1B4332] mb-2">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategoryMeta
                ? activeCategoryMeta.name
                : 'All 20 Sacred Formulations'}
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
              {activeCategoryMeta
                ? activeCategoryMeta.description
                : 'Explore our complete botanical lineup of 178 active formulations. Prepared strictly using traditional Ghani extraction and pure Ayurvedic wisdom.'}
            </p>
          </div>

          {/* Quick Filter Horizontal Scroll Bar */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {QUICK_FILTERS.map(pill => {
              const isSelected = quickFilter === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setQuickFilter(pill.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    isSelected
                      ? 'bg-[#FFE088] text-[#241A00] border-2 border-[#D4AF37]'
                      : 'bg-[#FCF9F4] text-stone-700 border border-[#E5E2DD] hover:border-[#D4AF37] hover:text-[#1B4332]'
                  }`}
                >
                  {isSelected && <Check size={13} className="stroke-[3]" />}
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Mobile Filter & Count Toggle Bar */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 border border-[#E5E2DD] bg-white px-4 py-2.5 rounded-xl text-xs font-bold text-[#1B4332] shadow-sm"
          >
            <SlidersHorizontal size={15} /> Filter Formulations
          </button>
          <span className="text-xs font-bold text-stone-500 bg-white px-3 py-1.5 rounded-full border border-[#E5E2DD]">
            {filteredProducts.length} Items
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside
            className={`fixed inset-0 z-[1001] bg-white p-6 transform transition-transform md:relative md:translate-x-0 md:bg-transparent md:p-0 md:w-72 md:z-0 md:block ${
              isFilterOpen ? 'translate-x-0 overflow-y-auto' : '-translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="text-xl font-serif font-bold text-[#1B4332]">Filter Formulations</h2>
              <button 
                onClick={() => setIsFilterOpen(false)} 
                className="p-2 bg-stone-100 rounded-full text-stone-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category Filter Box */}
            <div className="mb-6 bg-white p-5 rounded-2xl shadow-sm border border-[#E5E2DD]">
              <div className="flex items-center justify-between border-b border-[#E5E2DD] pb-3 mb-4">
                <h3 className="font-bold text-[#1B4332] uppercase tracking-wider text-xs">
                  All 20 Categories
                </h3>
                {selectedCategory !== 'all' && (
                  <button 
                    onClick={() => setSelectedCategory('all')} 
                    className="text-[11px] text-[#D4AF37] hover:underline font-bold"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
                {categories.map(cat => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <label 
                      key={cat.id} 
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                        isSelected 
                          ? 'bg-[#FCF9F4] text-[#1B4332] font-bold border border-[#D4AF37]/40' 
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="radio" 
                          name="category" 
                          value={cat.id} 
                          checked={isSelected}
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setIsFilterOpen(false);
                          }}
                          className="w-3.5 h-3.5 text-[#1B4332] focus:ring-[#1B4332] border-stone-300"
                        />
                        <span className="truncate max-w-[180px]">{cat.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Sort Options Box */}
            <div className="mb-6 bg-white p-5 rounded-2xl shadow-sm border border-[#E5E2DD]">
              <h3 className="font-bold text-[#1B4332] uppercase tracking-wider text-xs border-b border-[#E5E2DD] pb-3 mb-4">
                Sort By
              </h3>
              <select 
                value={sortBy} 
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setIsFilterOpen(false);
                }}
                className="w-full border border-[#E5E2DD] rounded-xl px-3 py-2.5 text-xs bg-white font-bold text-stone-700 outline-none focus:border-[#1B4332] transition-colors"
              >
                <option value="featured">Featured (Traditional)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated (4.5★+)</option>
              </select>
            </div>

            {/* Active Filters Reset Button */}
            {(selectedCategory !== 'all' || quickFilter !== 'all' || sortBy !== 'featured') && (
              <button
                onClick={resetAllFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
              >
                <RotateCcw size={14} /> Clear All Filters
              </button>
            )}
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-[#E5E2DD]">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Showing {filteredProducts.length} Sacred Formulations
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-400">Sort:</span>
                <span className="text-xs font-bold text-[#1B4332] capitalize">
                  {sortBy.replace('-', ' ')}
                </span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-[#E5E2DD] px-6">
                <div className="w-14 h-14 bg-[#FCF9F4] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E5E2DD]">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1B4332] mb-2">
                  No formulations found
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto mb-6">
                  No active formulations match your selected criteria. Try resetting the filters to explore all 178 products.
                </p>
                <button 
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-[#FFE088] hover:bg-[#D4AF37] text-[#241A00] text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

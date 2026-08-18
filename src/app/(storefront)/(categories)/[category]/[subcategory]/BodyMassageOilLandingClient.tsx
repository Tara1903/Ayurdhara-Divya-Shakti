'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/productData';
import { ArrowRight } from 'lucide-react';

interface BodyMassageOilLandingClientProps {
  initialProducts: Product[];
}

export default function BodyMassageOilLandingClient({ initialProducts }: BodyMassageOilLandingClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>('All');

  // Filter the 4 specific products
  const categoryProducts = initialProducts.filter(p => p.category === 'Body Massage Oil');

  const sizes = ['All', '50 ml', '100 ml', '200 ml'];

  const getVariant = (product: Product, size: string) => {
    return product.variants.find(v => v.size.toLowerCase() === size.toLowerCase()) || product.variants[0];
  };

  const getBadge = (size: string) => {
    if (size === '50 ml') return 'TRIAL';
    if (size === '100 ml') return 'STARTER';
    if (size === '200 ml') return 'VALUE PACK';
    return null;
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-16">
      {/* Hero Section */}
      <div className="bg-[#f2f6f1] border-b border-[#e1e9df] pt-12 pb-16 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('/images/pattern-leaf.png')] bg-repeat" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-[#4B7B3B]/10 text-[#2D5A27] text-xs font-bold uppercase tracking-widest mb-4">
            Start Your Wellness Routine
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2D5A27] mb-4">
            Body Wellness Massage Oil
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose your wellness category and experience the timeless benefits of traditional oil massage rituals with our pristine, cold-pressed blends.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="font-bold text-gray-700 uppercase tracking-wider text-sm mb-4 md:mb-0 mr-6 whitespace-nowrap">
            Filter by Size:
          </div>
          <div className="flex flex-wrap gap-2 w-full">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 min-w-[80px] md:flex-none px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedSize === size 
                    ? 'bg-[#4B7B3B] text-white shadow-md shadow-[#4B7B3B]/20' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {size} {size === '50 ml' ? '(Trial)' : size === '100 ml' ? '(Starter)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categoryProducts.map((product) => {
            const displaySize = selectedSize === 'All' ? '50 ml' : selectedSize;
            const variant = getVariant(product, displaySize);
            const badge = getBadge(variant.size);
            
            // Extract a clean emoji based on product slug for the visual
            let emoji = '🌿';
            if (product.slug.includes('kids')) emoji = '👦';
            if (product.slug.includes('men-')) emoji = '👨';
            if (product.slug.includes('women')) emoji = '👩';
            if (product.slug.includes('senior')) emoji = '👴';

            return (
              <div key={product.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square w-full bg-[#f9f9f9] flex items-center justify-center p-8">
                  {badge && (
                    <span className="absolute top-4 left-4 z-10 bg-[#D9381E] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {badge}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 text-3xl opacity-50">{emoji}</span>
                  <Image 
                    src={variant.image || '/images/placeholder.jpg'} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs font-bold text-[#4B7B3B] uppercase tracking-wider mb-2">
                    Body Massage Oil
                  </div>
                  <h3 className="font-serif font-bold text-xl text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    {product.shortDescription}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-xs font-semibold text-gray-400 mb-1">
                          {variant.size} Size
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xl text-gray-900">₹{variant.price}</span>
                          <span className="text-sm text-gray-400 line-through">₹{variant.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/oil-wellness-care/${product.slug}${selectedSize !== 'All' ? `?size=${encodeURIComponent(selectedSize)}` : ''}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#f8faf8] hover:bg-[#4B7B3B] hover:text-white text-[#2D5A27] font-bold py-3 px-4 rounded-xl transition-colors"
                    >
                      View Details <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

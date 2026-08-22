'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/productData';
import { ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface BodyMassageOilLandingClientProps {
  initialProducts: Product[];
}

export default function BodyMassageOilLandingClient({ initialProducts }: BodyMassageOilLandingClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

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

  const handleAddToCart = (product: Product, size: string) => {
    const variant = getVariant(product, size);
    addItem({
      productId: product.slug,
      name: product.name,
      image: variant.image || product.images[0],
      price: variant.price,
      originalPrice: variant.originalPrice,
      size: `${variant.size} | ${product.name.includes('Kids') ? 'Kids Care' : product.name.includes('Men') ? "Men's Care" : product.name.includes('Women') ? "Women's Care" : 'Senior Care'}`,
      quantity: 1
    });
    toast.success(`${product.name} (${variant.size}) added to cart!`);
    openCart();
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
            Choose your wellness category (Kids, Men, Women, Senior Care) and experience the timeless benefits of traditional Ayurvedic Abhyanga oil massage rituals.
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
                {size} {size === '50 ml' ? '(Trial)' : size === '100 ml' ? '(Starter)' : size === '200 ml' ? '(Value)' : ''}
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
            
            // Extract category label & emoji based on product slug
            let categoryLabel = 'Kids Care';
            let emoji = '👶';
            if (product.slug.includes('kids')) { categoryLabel = 'Kids Care'; emoji = '👶'; }
            if (product.slug.includes('men-')) { categoryLabel = "Men's Care"; emoji = '👨'; }
            if (product.slug.includes('women')) { categoryLabel = "Women's Care"; emoji = '👩'; }
            if (product.slug.includes('senior')) { categoryLabel = 'Senior Care'; emoji = '👴'; }

            return (
              <div key={product.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square w-full bg-[#f9f9f9] flex items-center justify-center p-6">
                  {badge && (
                    <span className="absolute top-3 left-3 z-10 bg-[#2D5A27] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                      {badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-2xl z-10">{emoji}</span>
                  <Image 
                    src={variant.image || '/images/categories/cat_oil_wellness_1786556871303.jpg'} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="inline-block bg-[#E88B23]/10 text-[#E88B23] text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded mb-2">
                      {categoryLabel}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-gray-900 mb-1.5 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-4 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-[11px] font-semibold text-gray-400">
                          {variant.size} Size
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-lg text-[#E88B23]">₹{variant.price}</span>
                          <span className="text-xs text-gray-400 line-through">₹{variant.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCart(product, displaySize)}
                        className="flex items-center justify-center gap-1 bg-[#2D5A27] hover:bg-[#1B3617] text-white text-xs font-bold py-2.5 px-2 rounded-xl transition-colors shadow-sm"
                      >
                        <ShoppingBag size={14} /> Add
                      </button>
                      <Link 
                        href={`/products/${product.slug}${selectedSize !== 'All' ? `?size=${encodeURIComponent(selectedSize)}` : ''}`}
                        className="flex items-center justify-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold py-2.5 px-2 rounded-xl transition-colors"
                      >
                        Details <ArrowRight size={13} />
                      </Link>
                    </div>
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

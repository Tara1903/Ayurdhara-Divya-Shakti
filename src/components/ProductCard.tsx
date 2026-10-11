"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, ChevronDown } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface ProductVariant {
  size: string;
  price: number;
  originalPrice: number;
  image?: string;
}

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    goldMemberPrice?: number;
    goldMembershipEligible?: boolean;
    discount: number;
    badge?: string;
    images: string[];
    rating: number;
    reviewCount: number;
    benefit: string;
    inclusions?: string;
    durationText?: string;
    variants?: ProductVariant[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { hasItem, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const addCart = useCartStore(state => state.addItem);

  const inWishlist = hasItem(product.slug);

  const isMassage = product.category === 'Body Massage Oil' || product.category === 'Feet Wellness Oil' || product.category === 'Hair Wellness Oil';
  const isIndividualPack = product.name === 'Trial Wellness Pack' || product.name === 'Diamond Trial Wellness Pack';
  const isFamilyPack = product.category === 'Family Trial Wellness Packs' || product.category === 'Family Gold Wellness Packs';
  const isGoldPack = product.name === 'Gold Wellness Pack' || product.name === 'Premium Wellness Pack';
  
  const isComplexPack = isFamilyPack || isGoldPack;
  const requiresCategory = isMassage || isIndividualPack;

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);

  const currentVariant = product.variants && product.variants.length > 0 ? product.variants[selectedVariantIdx] : null;
  const priceToDisplay = currentVariant ? currentVariant.price : product.price;
  const originalPriceToDisplay = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const discountToDisplay = Math.round(((originalPriceToDisplay - priceToDisplay) / originalPriceToDisplay) * 100);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeWishlist(product.slug);
    } else {
      addWishlist({
        id: product.slug,
        name: product.name,
        price: priceToDisplay,
        image: product.images[0],
        slug: product.slug
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    let finalSize = currentVariant ? currentVariant.size : 'Standard';

    if (requiresCategory) {
      if (!selectedCategory) {
        toast.error("Please select a category first.");
        return;
      }
      finalSize = `${finalSize} | ${selectedCategory}`;
    }

    addCart({
      productId: product.slug,
      name: product.name,
      price: priceToDisplay,
      originalPrice: originalPriceToDisplay,
      image: product.images[0],
      quantity: 1,
      size: finalSize
    });
    
    toast.success("Added to cart!");
  };

  return (
    <div className={`group relative flex flex-col bg-white border ${isComplexPack ? 'border-[#E0EBDC] shadow-sm' : 'border-[#E5E2DD]'} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_rgba(27,67,50,0.08)] hover:border-[#D4AF37]/40 h-full`}>
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full block bg-[#FAF7F2] overflow-hidden">
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#1B4332] text-[#FFE088] text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
        <button 
          onClick={toggleWishlist}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
        >
          <Heart size={16} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
        </button>
        <Image
          src={product.images?.[0] || '/images/categories/cat_raw_herbs_1786556977927.jpg'}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.slug}`} className="block group-hover:text-[#1B4332] transition-colors">
          <h3 className="font-serif font-bold text-gray-900 text-[15px] md:text-base leading-snug mb-1.5 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] md:text-[11px] text-gray-500 mb-2 font-semibold uppercase tracking-wider">
          <span className="text-[#1B4332] font-bold">{product.category}</span>
        </p>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{product.benefit}</p>
          
        {(product.inclusions || product.durationText) && (
          <div className="flex flex-col gap-1 mb-3 bg-[#FCF9F4] p-2.5 rounded-lg border border-[#E5E2DD]">
            {product.inclusions && (
              <div className="text-xs text-gray-700 whitespace-pre-line">
                <span className="font-semibold text-gray-900 block mb-1">What's Included:</span>
                {product.inclusions}
              </div>
            )}
            {product.durationText && (
              <div className="text-xs text-[#1B4332] font-medium mt-0.5">
                ⏳ {product.durationText}
              </div>
            )}
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-4 mt-auto">
          <span className="text-lg md:text-xl font-extrabold text-[#1B4332]">₹{priceToDisplay}</span>
          {originalPriceToDisplay > priceToDisplay && (
            <span className="text-xs text-gray-400 line-through">₹{originalPriceToDisplay}</span>
          )}
          {discountToDisplay > 0 && (
            <span className="text-xs font-bold text-[#735C00] ml-auto bg-[#FFE088]/30 px-2 py-0.5 rounded-full">{discountToDisplay}% OFF</span>
          )}
        </div>
        
        {/* Dropdowns */}
        {!isComplexPack && (
          <div className="flex flex-col gap-2 mb-3">
            {requiresCategory && (
              <div className="relative">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none border border-gray-200 text-gray-700 py-1.5 px-3 pr-8 rounded-lg text-xs focus:outline-none focus:border-[#1B4332] bg-white"
                >
                  <option value="" disabled>Choose Your Wellness Category</option>
                  <option value="Kids Care">Kids Care</option>
                  <option value="Men Wellness">Men Wellness</option>
                  <option value="Women Wellness">Women Wellness</option>
                  <option value="Senior Care">Senior Care</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            )}
            {product.variants && product.variants.length > 0 && (
              <div className="relative">
                <select 
                  value={selectedVariantIdx} 
                  onChange={(e) => setSelectedVariantIdx(Number(e.target.value))}
                  className="w-full appearance-none border border-gray-200 text-gray-700 py-1.5 px-3 pr-8 rounded-lg text-xs focus:outline-none focus:border-[#1B4332] bg-white"
                >
                  {product.variants.map((v, i) => (
                    <option key={i} value={i}>{v.size}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            )}
          </div>
        )}

        {isComplexPack ? (
          <Link 
            href={`/products/${product.slug}`}
            className="w-full bg-[#FFE088] text-[#241A00] text-center py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl block hover:bg-[#FCD870] transition-colors shadow-sm"
          >
            View Details
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-[#FFE088] hover:bg-[#FCD870] text-[#241A00] py-2.5 text-xs font-bold tracking-wide rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <ShoppingBag size={14} /> Add to Bag
            </button>
            <Link 
              href={`/products/${product.slug}`}
              className="w-full bg-white text-[#1B4332] border border-[#1B4332] py-2.5 text-xs font-bold tracking-wide rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#FCF9F4] transition-colors"
            >
              <Eye size={14} /> Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

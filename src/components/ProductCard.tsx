"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Lock, ShoppingBag, Eye, ChevronDown } from "lucide-react";
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
  const isGoldMember = user?.isGoldMember || false;

  const inWishlist = hasItem(product.slug);

  const isMassage = product.category === 'Body Massage Oil' || product.category === 'Feet Massage Oil' || product.category === 'Hair Wellness Oil';
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
    <div className={`group relative flex flex-col bg-white border ${isComplexPack ? 'border-[#E0EBDC] shadow-sm' : 'border-gray-100'} rounded-xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-gray-200 h-full`}>
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full block bg-[#f9f9f9] overflow-hidden">
        {product.badge && (
          <span className={`absolute top-2 left-2 z-10 ${isComplexPack ? 'bg-[#E88B23]' : 'bg-[#2D5A27]'} text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm`}>
            {product.badge}
          </span>
        )}
        <button 
          onClick={toggleWishlist}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
        >
          <Heart size={18} className={inWishlist ? "fill-red-500 text-red-500" : ""} />
        </button>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/products/${product.slug}`} className="block group-hover:text-[#2D5A27] transition-colors">
          <h3 className="font-bold text-gray-900 text-[15px] md:text-base leading-tight mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] md:text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">PRODUCT TYPE: <br className="hidden md:block" /><span className="text-[#2D5A27] font-bold">{product.category}</span></p>
        
        <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">{product.benefit}</p>
          
          {(product.inclusions || product.durationText) && (
            <div className="flex flex-col gap-1 mb-3 bg-[#f8fbfa] p-2 rounded-md border border-[#e8f2e9]">
              {product.inclusions && (
                <div className="text-xs text-gray-700 whitespace-pre-line">
                  <span className="font-semibold text-gray-900 block mb-1">What's Included:</span>
                  {product.inclusions}
                </div>
              )}
              {product.durationText && (
                <div className="text-xs text-[#2D5A27] font-medium mt-1">
                  ⏳ {product.durationText}
                </div>
              )}
            </div>
          )}

        <div className="flex items-end gap-2 mb-4">
          <span className="text-lg md:text-xl font-bold text-gray-900">₹{priceToDisplay}</span>
          <span className="text-sm text-gray-400 line-through mb-1">₹{originalPriceToDisplay}</span>
          <span className="text-xs font-bold text-green-600 mb-1 ml-auto">{discountToDisplay}% OFF</span>
        </div>
        
        {/* Dropdowns */}
        {!isComplexPack && (
          <div className="flex flex-col gap-2 mb-4 mt-auto">
            {requiresCategory && (
              <div className="relative">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none border border-gray-300 text-gray-700 py-1.5 px-3 pr-8 rounded text-xs focus:outline-none focus:border-[#4B7B3B] bg-white"
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
                  className="w-full appearance-none border border-gray-300 text-gray-700 py-1.5 px-3 pr-8 rounded text-xs focus:outline-none focus:border-[#4B7B3B] bg-white"
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
            className="w-full bg-[#E88B23] text-white text-center py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg block hover:bg-[#D67A18] transition-colors shadow-sm mt-auto"
          >
            View Details
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-[#E88B23] text-white py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1 hover:bg-[#D67A18] transition-colors shadow-sm"
            >
              <ShoppingBag size={12} /> Buy Now
            </button>
            <Link 
              href={`/products/${product.slug}`}
              className="w-full bg-white text-[#2D5A27] border border-[#2D5A27] py-2 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Eye size={12} /> Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

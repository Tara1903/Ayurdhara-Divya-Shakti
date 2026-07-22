"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Lock, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

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
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { hasItem, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const { addItem: addCart } = useCartStore();
  const { user } = useAuthStore();
  
  const inWishlist = hasItem(product.slug);
  const isGoldMember = user?.isGoldMember || false;
  
  const priceToDisplay = isGoldMember && product.goldMemberPrice ? product.goldMemberPrice : product.price;

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
    addCart({
      productId: product.slug,
      name: product.name,
      price: priceToDisplay,
      originalPrice: product.originalPrice,
      image: product.images[0],
      quantity: 1,
      size: 'Standard'
    });
  };

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-gray-200 h-full">
      {/* Product Image Section */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full block bg-[#f9f9f9] overflow-hidden">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-[#2D5A27] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            {product.badge}
          </span>
        )}
        {product.discount > 0 && !product.badge && (
          <span className="absolute top-2 left-2 z-10 bg-[#D9381E] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        )}
        
        <Image 
          src={product.images[0] || '/images/placeholder.jpg'} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <button 
          onClick={toggleWishlist}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white hover:text-[#D9381E] transition-all"
          aria-label="Toggle Wishlist"
        >
          <Heart size={16} fill={inWishlist ? "currentColor" : "none"} className={inWishlist ? "text-[#D9381E]" : "text-gray-500"} />
        </button>
      </Link>
      
      {/* Product Info Section */}
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/products/${product.slug}`} className="flex flex-col flex-1 no-underline">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] text-[#4B7B3B] uppercase tracking-widest font-bold">{product.category}</span>
            {product.rating > 0 && (
              <div className="flex items-center text-[11px] text-gray-500 font-semibold">
                <span className="text-[#E88B23] mr-1 text-sm">★</span> {product.rating} ({product.reviewCount})
              </div>
            )}
          </div>
          
          <h3 className="text-[15px] md:text-[16px] font-bold text-gray-800 mb-1 leading-snug line-clamp-2 group-hover:text-[#2D5A27] transition-colors font-sans">
            {product.name}
          </h3>
          
          <p className="text-[12px] text-gray-500 mb-4 line-clamp-1">{product.benefit}</p>
          
          <div className="mt-auto mb-4">
            <div className="flex items-end gap-2 mb-1">
              <span className="font-bold text-gray-900 text-lg md:text-xl">₹{priceToDisplay}</span>
              {product.originalPrice > priceToDisplay && (
                <span className="text-gray-400 text-sm line-through mb-[3px]">₹{product.originalPrice}</span>
              )}
            </div>

            {product.goldMemberPrice && !isGoldMember && (
              <div className="mt-1 flex items-center justify-between p-1.5 bg-gray-50 border border-gray-100 rounded text-[10px] font-bold uppercase tracking-wide text-gray-500">
                <div className="flex items-center gap-1">
                  <Lock size={10} />
                  <span>Gold Price</span>
                </div>
                <span>₹{product.goldMemberPrice}</span>
              </div>
            )}
            
            {product.goldMemberPrice && isGoldMember && (
              <div className="mt-1 flex items-center justify-between p-1.5 bg-[#E88B23]/10 border border-[#E88B23]/30 rounded text-[10px] font-bold uppercase tracking-wide text-[#E88B23]">
                <div className="flex items-center gap-1">
                  <span>Gold Member Applied</span>
                </div>
              </div>
            )}
          </div>
        </Link>
        
        {/* Universal Add to Cart Button (Visible always, large) */}
        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#E88B23] text-white py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-[#D67A18] transition-colors shadow-sm"
        >
          <ShoppingBag size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

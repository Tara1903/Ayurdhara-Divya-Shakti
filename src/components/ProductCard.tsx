"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/productData";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { hasItem, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const { addItem: addCart } = useCartStore();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const activeVariant =
    product.variants && product.variants.length > 0
      ? product.variants[selectedVariantIndex] || product.variants[0]
      : {
          size: "Standard",
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || "/images/placeholder.jpg",
        };

  const currentPrice = activeVariant.price || product.price;
  const currentOriginalPrice = activeVariant.originalPrice || product.originalPrice;
  const currentDiscount =
    currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : 0;

  const inWishlist = hasItem(product.slug);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeWishlist(product.slug);
    } else {
      addWishlist({
        id: product.slug,
        name: product.name,
        price: currentPrice,
        image: activeVariant.image || product.images[0],
        slug: product.slug,
      });
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addCart({
      productId: product.slug,
      name: product.name,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      image: activeVariant.image || product.images[0],
      quantity: 1,
      size: activeVariant.size,
    });
    router.push("/checkout");
  };

  return (
    <div className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(45,90,39,0.12)] hover:border-[#4B7B3B]/30 h-full">
      {/* Product Image & Badges Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full block bg-[#F5F7F4] overflow-hidden">
        {/* Offer Discount Badge */}
        {currentDiscount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-[#D9381E] text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
            {currentDiscount}% OFF
          </span>
        )}

        {/* Wellness Duration Badge (If applicable) */}
        {product.durationText && (
          <span className="absolute top-3 right-12 z-10 bg-[#2D5A27] text-[#FAF6ED] text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full shadow-xs border border-[#D4AF37]/50 flex items-center gap-1">
            🌱 {product.durationText}
          </span>
        )}

        {/* Product Image */}
        <Image
          src={activeVariant.image || product.images[0] || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Icon */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-xs hover:bg-white hover:text-[#D9381E] transition-all"
          aria-label="Toggle Wishlist"
        >
          <Heart size={16} fill={inWishlist ? "currentColor" : "none"} className={inWishlist ? "text-[#D9381E]" : "text-gray-400"} />
        </button>
      </Link>

      {/* Product Info Section */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        {/* Category Tag */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] md:text-[11px] font-bold text-[#4B7B3B] uppercase tracking-widest bg-[#E0EBDC]/60 px-2.5 py-0.5 rounded-md">
            {product.category}
          </span>
          {product.rating > 0 && (
            <div className="flex items-center text-[11px] text-gray-500 font-semibold">
              <span className="text-[#E88B23] mr-1 text-sm">★</span> {product.rating}
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} className="no-underline">
          <h3 className="text-base md:text-lg font-serif font-bold text-gray-900 mb-1 leading-snug line-clamp-1 group-hover:text-[#2D5A27] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Bottle Size / Pack Selector */}
        <div className="my-2 min-h-[36px] flex flex-col justify-center">
          {product.variants && product.variants.length > 1 ? (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] font-semibold text-gray-500 mr-1">Size / Pack:</span>
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariantIndex(idx);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-bold transition-all border ${
                    selectedVariantIndex === idx
                      ? "bg-[#2D5A27] text-white border-[#2D5A27] shadow-xs"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#4B7B3B] hover:text-[#2D5A27]"
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-[12px] font-medium text-gray-600 flex items-center gap-1.5">
              <span className="text-gray-400">Bottle Size / Pack:</span>
              <span className="font-bold text-gray-800 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">{activeVariant.size}</span>
            </div>
          )}
        </div>

        {/* Price Section: Offer Price & Strikethrough MRP */}
        <div className="mt-auto pt-3 pb-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Offer</span>
            <span className="text-xl md:text-2xl font-extrabold text-[#2D5A27]">₹{currentPrice}</span>
            {currentOriginalPrice > currentPrice && (
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-[11px] text-gray-400 font-medium">MRP</span>
                <span className="text-xs text-gray-400 line-through font-semibold">₹{currentOriginalPrice}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons: Buy Now & View Details */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            onClick={handleBuyNow}
            className="w-full bg-[#E88B23] hover:bg-[#d67b17] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all shadow-xs hover:shadow-md"
          >
            <ShoppingBag size={14} /> Buy Now
          </button>

          <Link
            href={`/products/${product.slug}`}
            className="w-full bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 text-[#2D5A27] text-xs font-bold uppercase tracking-wider py-2.5 px-2 rounded-xl flex items-center justify-center gap-1 transition-all text-center"
          >
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

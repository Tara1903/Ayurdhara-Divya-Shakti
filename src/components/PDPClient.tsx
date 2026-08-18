"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Shield, Leaf, Heart, ChevronDown, Lock, Check, Share2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { Product } from "@/data/productData";
import ProductReviews from "@/components/ProductReviews";

export default function PDPClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  
  // Mobile swipe carousel state
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { hasItem, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const isGoldMember = user?.isGoldMember || false;
  const inWishlist = hasItem(product.slug);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeWishlist(product.slug);
    } else {
      addWishlist({
        id: product.slug,
        name: product.name,
        price: currentPrice,
        image: product.images[0],
        slug: product.slug
      });
    }
  };

  const currentVariant = product.variants && product.variants.length > 0 ? product.variants[activeVariantIdx] : null;
  const currentPrice = currentVariant ? currentVariant.price : product.price;
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const currentGoldMemberPrice = currentVariant ? currentVariant.goldMemberPrice : product.goldMemberPrice;
  const currentDiscount = currentOriginalPrice ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) : product.discount;

  const getDynamicBadge = () => {
    if (product.category === 'Body Massage Oil' && currentVariant) {
      const sizeLower = currentVariant.size.toLowerCase();
      if (sizeLower === '50 ml') return 'TRIAL';
      if (sizeLower === '100 ml') return 'STARTER';
      if (sizeLower === '200 ml') return 'VALUE PACK';
    }
    return product.badge;
  };
  const dynamicBadge = getDynamicBadge();

  const handleVariantChange = (idx: number) => {
    setActiveVariantIdx(idx);
    const variant = product.variants[idx];
    if (variant && variant.image) {
      const imgIdx = product.images.findIndex(img => img === variant.image);
      if (imgIdx !== -1) {
        setActiveImage(imgIdx);
        // Scroll carousel if on mobile
        if (carouselRef.current) {
          const scrollAmount = imgIdx * carouselRef.current.clientWidth;
          carouselRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  const handleAddToCart = () => {
    useCartStore.getState().addItem({
      productId: product.slug,
      name: product.name,
      image: currentVariant && currentVariant.image ? currentVariant.image : product.images[0],
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      quantity: qty,
      size: currentVariant ? currentVariant.size : 'Standard'
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024 && window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleScrollCarousel = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const width = carouselRef.current.clientWidth;
      const newIndex = Math.round(scrollPosition / width);
      if (newIndex !== activeImage) {
        setActiveImage(newIndex);
      }
    }
  };

  return (
    <div className="bg-white text-gray-900 pb-12">
      {/* Breadcrumbs (Hidden on mobile for cleaner look, like Amazon) */}
      <div className="hidden md:block bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <nav className="flex items-center text-xs text-gray-500 tracking-wide">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <ChevronRight size={12} className="mx-1 text-gray-400" />
            <Link href={`/collections?category=${product.category.toLowerCase()}`} className="hover:text-gray-900 transition-colors">{product.category}</Link>
            <ChevronRight size={12} className="mx-1 text-gray-400" />
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="container mx-auto px-0 sm:px-6 lg:px-8 py-0 md:py-6 lg:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-0 lg:gap-8">
          
          {/* 
            MOBILE ORDERING LOGIC via CSS Order classes:
            1. Title & Info (order-1 lg:order-2)
            2. Images (order-2 lg:order-1)
            3. Variants (order-3 lg:order-none) - Placed inside Info column on desktop
            4. Buy Box (order-4 lg:order-3)
          */}

          {/* === 1. MIDDLE COLUMN ON DESKTOP / TOP ON MOBILE === */}
          <div className="flex flex-col order-1 lg:order-2 lg:col-span-5 px-4 lg:px-0 pt-4 lg:pt-0">
            {/* Brand Link */}
            <div className="flex items-center justify-between mb-1">
              <Link href={`/collections?category=${product.category.toLowerCase()}`} className="text-[#4B7B3B] text-sm hover:underline hover:text-[#2D5A27] transition-colors">
                Visit the Ayurdhara Store
              </Link>
              
              {/* Ratings (Inline on mobile top, hidden on desktop here) */}
              {product.rating > 0 && (
                <div className="lg:hidden flex items-center gap-1 cursor-pointer" onClick={() => document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'})}>
                  <span className="text-sm text-[#4B7B3B]">{product.rating}</span>
                  <div className="flex text-[#E88B23]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} color="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-[#4B7B3B]">({product.reviewCount})</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-[20px] md:text-[24px] font-medium mb-2 text-gray-900 leading-snug">{product.name}</h1>
            <p className="text-sm text-[#4b5563] mb-2">{product.shortDescription}</p>

            {/* Desktop Ratings & Badges */}
            <div className="hidden lg:flex items-center gap-4 mb-2 pb-2 border-b border-gray-200">
              {product.rating > 0 && (
                <div className="flex items-center gap-2 cursor-pointer group" onClick={() => document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'})}>
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  <div className="flex text-[#E88B23]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} color="currentColor" />
                    ))}
                  </div>
                  <ChevronDown size={12} className="text-gray-500 -ml-1" />
                  <span className="text-sm text-[#4B7B3B] group-hover:text-[#2D5A27] transition-colors">{product.reviewCount} ratings</span>
                </div>
              )}
            </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                {dynamicBadge && (
                  <span className="bg-[#232F3E] text-white text-[10px] font-bold px-2 py-0.5 flex items-center">
                    {dynamicBadge} <span className="bg-[#F90] text-[#232F3E] ml-1 px-1 rotate-3 font-black text-[9px]">PICK</span>
                  </span>
                )}
                <span className="text-xs font-semibold text-gray-900">1K+ bought in past month</span>
              </div>

            <hr className="hidden lg:block border-gray-200 mb-4" />

            {/* Price (Desktop only in this column, mobile price is in buy box) */}
            <div className="hidden lg:flex flex-col mb-4">
              <div className="flex items-start gap-2 mb-1">
                <span className="text-[#CC0C39] text-2xl font-light">-{currentDiscount}%</span>
                <span className="text-xs font-semibold relative top-1">₹</span>
                <span className="text-3xl font-medium text-gray-900">{currentPrice}</span>
              </div>
              <div className="text-sm text-[#4b5563]">
                M.R.P.: <span className="line-through">₹{currentOriginalPrice}</span>
              </div>
              <p className="text-sm font-medium mt-1">Inclusive of all taxes</p>
            </div>

            {/* Variants (Desktop only here, rendered separately for mobile later) */}
            <div className="hidden lg:block mb-6">
              {product.variants && product.variants.length > 0 && (
                <>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    Size: <span className="font-bold">{currentVariant?.size}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button 
                        key={i}
                        onClick={() => handleVariantChange(i)}
                        className={`px-3 py-1.5 border rounded text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#4B7B3B]/50 focus:border-[#4B7B3B]
                          ${i === activeVariantIdx 
                            ? 'border-[#4B7B3B] bg-green-50 font-semibold' 
                            : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                      >
                        {v.size}
                        <div className="text-xs text-[#D9381E] mt-0.5">₹{v.price}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Desktop Bullet Points */}
            <div className="hidden lg:block mt-4">
              <h3 className="font-bold text-base mb-2">About this item</h3>
              <ul className="list-disc pl-4 space-y-1 text-sm text-gray-900">
                {product.benefits.map((b, i) => (
                  <li key={i}>{b.text}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* === 2. LEFT COLUMN ON DESKTOP / 2ND ON MOBILE (Images) === */}
          <div className="order-2 lg:order-1 lg:col-span-4 mt-4 lg:mt-0 relative border-b border-gray-200 lg:border-none pb-4 lg:pb-0">
            {/* Desktop Image Layout */}
            <div className="hidden lg:flex gap-3 h-[500px]">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 w-12 overflow-y-auto overflow-x-hidden no-scrollbar pr-1">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    className={`relative w-full aspect-square rounded-md overflow-hidden border-2 transition-all focus:outline-none ${i === activeImage ? 'border-[#4B7B3B] shadow-sm' : 'border-gray-200 hover:border-[#4B7B3B]/50'}`}
                    onMouseEnter={() => setActiveImage(i)}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="flex-1 relative bg-white border border-gray-200 rounded-lg flex items-center justify-center p-4">
                <Image 
                  src={product.images[activeImage] || '/images/placeholder.jpg'} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-4 mix-blend-multiply" 
                  priority 
                />
              </div>
            </div>

            {/* Mobile Image Carousel */}
            <div className="lg:hidden w-full relative">
              <div 
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-[350px]"
                onScroll={handleScrollCarousel}
              >
                {product.images.map((img, i) => (
                  <div key={i} className="min-w-full relative snap-center flex items-center justify-center bg-white p-4">
                    <Image 
                      src={img} 
                      alt={`View ${i + 1}`} 
                      fill 
                      className="object-contain mix-blend-multiply p-2" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Dots */}
              {product.images.length > 1 && (
                <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1.5 pb-2">
                  {product.images.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full transition-colors ${i === activeImage ? 'bg-[#4B7B3B]' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              )}

              {/* Action Icons Overlay */}
              <div className="absolute bottom-4 right-4 flex gap-3 z-10">
                <button onClick={toggleWishlist} className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center">
                   <Heart size={20} fill={inWishlist ? "#2D5A27" : "none"} className={inWishlist ? "text-[#2D5A27]" : "text-gray-600"} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center">
                   <Share2 size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* === 3. VARIANTS ON MOBILE ONLY (order-3) === */}
          <div className="order-3 lg:hidden px-4 pt-4 border-b border-gray-200 pb-4">
            {product.variants && product.variants.length > 0 && (
              <>
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Size: <span className="font-bold">{currentVariant?.size}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i}
                      onClick={() => handleVariantChange(i)}
                      className={`px-2 py-2 border rounded text-xs transition-all flex flex-col items-center justify-center text-center
                        ${i === activeVariantIdx 
                          ? 'border-[#4B7B3B] bg-green-50 font-semibold' 
                          : 'border-gray-300 bg-white hover:bg-gray-50'}`}
                    >
                      <span>{v.size}</span>
                      <span className="text-[#D9381E] mt-1 font-bold">₹{v.price}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* === 4. RIGHT COLUMN ON DESKTOP / BOTTOM ON MOBILE (Buy Box) === */}
          <div className="order-4 lg:order-3 lg:col-span-3 px-4 lg:px-0 py-4 lg:py-0">
            <div className="lg:border lg:border-gray-200 lg:rounded-xl lg:p-5 lg:sticky lg:top-24 bg-white">
              
              {/* Mobile Price Display (Duplicate of desktop middle column) */}
              <div className="lg:hidden flex flex-col mb-4">
                <div className="flex items-start gap-1 mb-1">
                  <span className="text-[#CC0C39] text-xl font-light mt-1">-{currentDiscount}%</span>
                  <span className="text-sm font-semibold relative top-1">₹</span>
                  <span className="text-3xl font-medium text-gray-900">{currentPrice}</span>
                </div>
                <div className="text-sm text-[#4b5563]">
                  M.R.P.: <span className="line-through">₹{currentOriginalPrice}</span>
                </div>
                <p className="text-sm font-medium mt-1">Inclusive of all taxes</p>
              </div>

              {/* Desktop Price Display inside Buy Box */}
              <div className="hidden lg:flex items-start gap-1 mb-2">
                  <span className="text-sm font-semibold relative top-1">₹</span>
                  <span className="text-3xl font-medium text-gray-900">{currentPrice}</span>
              </div>

              <div className="mb-4">
                <span className="text-[#4B7B3B] hover:text-[#2D5A27] text-sm cursor-pointer hover:underline">FREE delivery</span> 
                <span className="text-sm font-bold text-gray-900"> Wednesday, 19 August.</span>
              </div>

              <div className="text-xl font-medium text-[#2D5A27] mb-4">
                In Stock
              </div>

              {/* Quantity */}
              <div className="mb-4 relative group w-24">
                <select 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg shadow-sm focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] py-2 px-3 cursor-pointer appearance-none"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i+1} value={i+1}>Qty: {i+1}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-2 top-2.5 pointer-events-none text-gray-900" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mb-4">
                <button 
                  onClick={handleAddToCart}
                  className={`w-full py-2.5 rounded-full text-sm font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#4B7B3B] focus:ring-offset-1 ${
                    added 
                      ? 'bg-green-600 text-white border border-green-700' 
                      : 'bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200]'
                  }`}
                >
                  {added ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button 
                  className="w-full py-2.5 rounded-full text-sm font-medium shadow-sm transition-all bg-[#E88B23] hover:bg-[#D67A18] border border-[#D67A18] focus:outline-none focus:ring-2 focus:ring-[#4B7B3B] focus:ring-offset-1"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Info */}
              <div className="grid grid-cols-12 gap-2 text-xs text-[#4B7B3B] mb-4">
                <div className="col-span-1 pt-0.5"><Lock size={12} className="text-gray-500" /></div>
                <div className="col-span-11 hover:text-[#2D5A27] hover:underline cursor-pointer">Secure transaction</div>
                
                <div className="col-span-1 pt-0.5"><Shield size={12} className="text-gray-500" /></div>
                <div className="col-span-11 hover:text-[#2D5A27] hover:underline cursor-pointer">Quality Assured</div>
              </div>

              <div className="text-xs text-[#4b5563] grid grid-cols-[1fr_2fr] gap-1 mb-4">
                <span>Ships from</span>
                <span className="text-gray-900">Ayurdhara Divya Shakti</span>
                <span>Sold by</span>
                <span className="text-gray-900">Ayurdhara Divya Shakti</span>
              </div>

              <hr className="border-gray-200 mb-4" />
              
              <button onClick={toggleWishlist} className="w-full text-left text-sm text-gray-900 border border-gray-300 rounded-md py-1.5 px-3 bg-white shadow-sm hover:bg-gray-50 flex items-center justify-center gap-2">
                <Heart size={16} fill={inWishlist ? "#2D5A27" : "none"} className={inWishlist ? "text-[#2D5A27]" : "text-gray-500"} />
                Add to Wish List
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Add to Cart (Appears when scrolling past the top on mobile) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-[100] transform transition-transform duration-300 lg:hidden ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="relative w-12 h-12 bg-gray-50 rounded border border-gray-200 overflow-hidden shrink-0">
             <Image src={product.images[activeImage]} alt="Thumb" fill className="object-contain" />
          </div>
          <div className="truncate flex-1">
            <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
            <p className="font-bold text-base text-[#D9381E]">₹{currentPrice}</p>
          </div>
          <button 
            onClick={handleAddToCart}
            className={`px-4 py-2 text-sm font-medium rounded-full shrink-0 shadow-sm transition-all ${added ? 'bg-green-600 text-white' : 'bg-[#FFD814] text-gray-900'}`}
          >
            {added ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
      
      {/* Product Details Section (Ingredients, How to Use, Specs) */}
      <div className="bg-white border-t border-gray-200 py-10 mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-xl font-bold mb-6 text-gray-900">Product information</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {/* Left Details */}
              <div>
                <h3 className="font-bold text-base mb-3 text-gray-900">Technical Details</h3>
                <div className="border border-gray-200 rounded-sm overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <tr key={key} className="bg-white">
                          <th className="p-2 font-medium text-gray-900 w-1/2 bg-[#F3F3F3] border-r border-gray-200">{key}</th>
                          <td className="p-2 text-gray-900">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Right Details */}
              <div>
                 <h3 className="font-bold text-base mb-3 text-gray-900">Key Ingredients</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                         {ing.image && (
                           <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-200">
                             <Image src={ing.image} alt={ing.name} fill className="object-cover" />
                           </div>
                         )}
                         <div>
                            <p className="font-bold text-sm text-gray-900">{ing.name}</p>
                            <p className="text-xs text-[#4B7B3B] italic mb-1">{ing.botanical}</p>
                            <p className="text-xs text-[#4b5563]">{ing.role}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Customer Reviews */}
      <ProductReviews productId={product.id} />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Shield, Leaf, Heart, ChevronDown, Lock, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { Product } from "@/data/productData";
import ProductCard from "@/components/ProductCard";

export default function PDPClient({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First open by default
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  
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

  // Derive prices from variant or fallback
  const currentVariant = product.variants && product.variants.length > 0 ? product.variants[activeVariantIdx] : null;
  const currentPrice = currentVariant ? currentVariant.price : product.price;
  const currentOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const currentGoldMemberPrice = currentVariant ? currentVariant.goldMemberPrice : product.goldMemberPrice;
  const currentDiscount = currentOriginalPrice ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) : product.discount;

  const handleVariantChange = (idx: number) => {
    setActiveVariantIdx(idx);
    const variant = product.variants[idx];
    if (variant && variant.image) {
      const imgIdx = product.images.findIndex(img => img === variant.image);
      if (imgIdx !== -1) {
        setActiveImage(imgIdx);
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
      if (window.innerWidth < 768 && window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#f9f9f9] text-gray-900 pb-12">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-[#4B7B3B] transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <Link href="/collections" className="hover:text-[#4B7B3B] transition-colors">Shop</Link>
            <ChevronRight size={14} className="mx-2 text-gray-400" />
            <span className="text-[#4B7B3B] truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-[#f9f9f9] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
              <Image 
                src={product.images[activeImage] || '/images/placeholder.jpg'} 
                alt={product.name} 
                fill 
                className="object-contain p-4 mix-blend-multiply" 
                priority 
              />
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-[#2D5A27] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-[#4B7B3B] ring-2 ring-[#4B7B3B]/20' : 'border-gray-200 hover:border-[#4B7B3B]/50 bg-[#f9f9f9]'}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col pt-2">
            <Link href={`/collections?category=${product.category.toLowerCase()}`} className="text-[#4B7B3B] text-xs font-bold uppercase tracking-widest mb-3 hover:underline">
              {product.category}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight font-sans">{product.name}</h1>
            
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-6 cursor-pointer group" onClick={() => document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'})}>
                <div className="flex text-[#E88B23]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} color="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                <span className="text-sm font-medium text-gray-500 group-hover:text-[#E88B23] transition-colors underline">({product.reviewCount} Reviews)</span>
              </div>
            )}

            <p className="text-base text-gray-600 mb-8 leading-relaxed">{product.shortDescription || product.benefit}</p>

            {/* Pricing */}
            <div className="bg-[#f9f9f9] p-6 rounded-xl border border-gray-100 mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">₹{currentPrice}</span>
                {currentOriginalPrice > currentPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through mb-1">₹{currentOriginalPrice}</span>
                    <span className="bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mb-1.5 border border-red-200">
                      Save {currentDiscount}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Inclusive of all taxes</p>

              {/* Gold Member Price Block */}
              {currentGoldMemberPrice && (
                <div className={`mt-4 p-3 rounded-lg flex items-center justify-between border ${isGoldMember ? 'bg-[#E88B23]/10 border-[#E88B23]/30' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-2">
                    {!isGoldMember && <Lock size={14} className="text-gray-400" />}
                    <span className={`text-xs font-bold uppercase tracking-wider ${isGoldMember ? 'text-[#E88B23]' : 'text-gray-600'}`}>
                      Gold Price
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${isGoldMember ? 'text-[#E88B23]' : 'text-gray-900'}`}>
                      ₹{currentGoldMemberPrice}
                    </span>
                    {!isGoldMember && (
                      <Link href="/register" className="text-[10px] font-bold text-white bg-[#1A1A1A] px-2 py-1 rounded uppercase tracking-widest hover:bg-[#E88B23] transition-colors">
                        Unlock
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v, i) => (
                    <button 
                      key={i}
                      onClick={() => handleVariantChange(i)}
                      className={`px-5 py-2.5 border-2 rounded-lg text-sm font-bold transition-all
                        ${i === activeVariantIdx 
                          ? 'border-[#4B7B3B] bg-[#4B7B3B]/5 text-[#4B7B3B]' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-[#4B7B3B]/50 hover:text-[#4B7B3B]'}`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border-2 border-gray-200 rounded-lg h-14 w-32 shrink-0 bg-white">
                <button 
                  className="flex-1 h-full flex items-center justify-center text-xl font-bold text-gray-600 hover:text-[#4B7B3B] transition-colors"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >−</button>
                <input 
                  type="number" 
                  className="w-12 text-center font-bold text-lg text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0" 
                  value={qty} 
                  readOnly 
                />
                <button 
                  className="flex-1 h-full flex items-center justify-center text-xl font-bold text-gray-600 hover:text-[#4B7B3B] transition-colors"
                  onClick={() => setQty(Math.min(10, qty + 1))}
                >+</button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className={`flex-1 h-14 flex items-center justify-center text-base font-bold uppercase tracking-widest rounded-lg transition-all shadow-md ${
                  added 
                    ? 'bg-[#4B7B3B] text-white shadow-[#4B7B3B]/30' 
                    : 'bg-[#E88B23] text-white hover:bg-[#D67A18] shadow-[#E88B23]/30 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {added ? <><Check size={20} className="mr-2"/> Added</> : 'Add to Cart'}
              </button>

              <button 
                onClick={toggleWishlist}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg transition-all shrink-0 ${inWishlist ? 'border-[#E88B23] bg-[#E88B23]/5' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                aria-label="Wishlist"
              >
                <Heart size={24} fill={inWishlist ? "#E88B23" : "none"} className={inWishlist ? "text-[#E88B23]" : "text-gray-400"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Shield className="text-[#4B7B3B] shrink-0" size={24} />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-3">
                <Leaf className="text-[#4B7B3B] shrink-0" size={24} />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Pure Ayurvedic Formula</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#4B7B3B] shrink-0" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#4B7B3B] shrink-0" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Lab Tested Quality</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why You'll Love It (Benefits) */}
      <section className="bg-white py-16 md:py-24 border-y border-gray-100 mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 font-sans">Why You'll Love It</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {product.benefits.map((b, i) => (
              <div key={i} className="bg-[#f9f9f9] p-8 rounded-2xl text-center border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-[#4B7B3B] shadow-sm">
                  <Leaf size={28} />
                </div>
                <p className="font-bold text-lg text-gray-800">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Ingredients */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 font-sans">Key Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.ingredients.map((ing, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {ing.image && (
                  <div className="relative h-56 bg-gray-50 overflow-hidden">
                    <Image src={ing.image} alt={ing.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                )}
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-1 text-gray-900">{ing.name}</h3>
                  <p className="text-sm text-[#4B7B3B] italic font-semibold mb-4">{ing.botanical}</p>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{ing.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To Use & Details (Split) */}
      <section className="bg-[#2D5A27] py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* How to Use */}
            <div>
              <h2 className="text-3xl font-bold mb-10 font-sans">How To Use</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-white text-[#2D5A27] flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">1</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-[#E88B23]">Recommended Serving</h4>
                    <p className="text-base text-gray-200 font-medium leading-relaxed">{product.usageInstructions.serving}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-white text-[#2D5A27] flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">2</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-[#E88B23]">When to Take</h4>
                    <p className="text-base text-gray-200 font-medium leading-relaxed">{product.usageInstructions.timing}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-white text-[#2D5A27] flex items-center justify-center font-bold text-xl shrink-0 shadow-lg">3</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-[#E88B23]">Instructions</h4>
                    <p className="text-base text-gray-200 font-medium leading-relaxed">{product.usageInstructions.instructions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-bold mb-10 font-sans">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {product.faqs.map((faq, i) => (
                  <div key={i} className="bg-white/10 rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
                    <button 
                      className="w-full flex justify-between items-center p-5 text-left font-bold text-lg focus:outline-none"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.question}
                      <ChevronDown size={24} className={`transform transition-transform shrink-0 ${openFaq === i ? 'rotate-180 text-[#E88B23]' : 'text-white/70'}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-base text-gray-200 border-t border-white/10 pt-4 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 font-sans">Product Information</h2>
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm md:text-base">
              <tbody className="divide-y divide-gray-200">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <tr key={key} className="hover:bg-gray-50 transition-colors">
                    <th className="p-5 font-bold text-gray-900 w-1/3 bg-gray-50/50 uppercase tracking-wider text-xs md:text-sm">{key}</th>
                    <td className="p-5 text-gray-600 font-medium">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Add to Cart */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-[100] transform transition-transform duration-300 md:hidden ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div className="truncate flex-1">
            <p className="text-xs text-gray-500 truncate font-bold uppercase tracking-wider">{product.name}</p>
            <p className="font-bold text-xl text-gray-900">₹{currentPrice}</p>
          </div>
          <button 
            onClick={handleAddToCart}
            className={`h-12 px-6 font-bold uppercase tracking-wider rounded-lg shrink-0 transition-colors shadow-sm ${added ? 'bg-[#4B7B3B] text-white' : 'bg-[#E88B23] hover:bg-[#D67A18] text-white'}`}
          >
            {added ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

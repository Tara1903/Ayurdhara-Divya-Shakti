'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Shield, Check, Info, Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { products } from '@/data/productData';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartSubtotal, getCartOriginalTotal } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'applied' | 'invalid'>('idle');

  const subtotal = getCartSubtotal();
  const originalTotal = getCartOriginalTotal();
  const itemDiscount = originalTotal - subtotal;
  
  const FREE_SHIPPING_THRESHOLD = 2000;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : 99;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  
  // Mock promo logic
  const promoDiscount = promoStatus === 'applied' ? subtotal * 0.1 : 0; // 10% off
  const finalTotal = subtotal - promoDiscount + shippingCost;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELLNESS10') {
      setPromoStatus('applied');
    } else {
      setPromoStatus('invalid');
      setTimeout(() => setPromoStatus('idle'), 3000);
    }
  };

  // Recommendations logic: Find products from the same categories as items in cart
  const cartCategories = Array.from(new Set(items.map(i => {
    const p = products.find(prod => prod.slug === i.productId);
    return p ? p.category : null;
  }).filter(Boolean)));
  
  const recommendedProducts = products
    .filter(p => cartCategories.includes(p.category) && !items.some(i => i.productId === p.slug))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#f9f9f9]">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-[#4B7B3B]">
          <ShoppingBag size={48} />
        </div>
        <h1 className="font-sans text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 text-lg text-center max-w-md">Discover authentic Ayurvedic blends crafted for your daily wellness routine.</p>
        <Link href="/collections" className="px-8 py-4 bg-[#4B7B3B] hover:bg-[#2D5A27] text-white font-bold uppercase tracking-widest rounded-lg transition-colors shadow-md">
          Explore Best Sellers
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT: Cart Items */}
          <div className="flex-1 lg:w-2/3">
            <h1 className="font-sans text-3xl font-bold mb-6 text-gray-900 pb-4 border-b border-gray-200">
              Your Bag ({items.length} item{items.length !== 1 ? 's' : ''})
            </h1>
            
            <div className="flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="relative w-full sm:w-32 h-32 sm:h-40 bg-[#f9f9f9] rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center">
                    <Link href={`/products/${item.productId}`}>
                      <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                    </Link>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                      <Link href={`/products/${item.productId}`} className="text-gray-900 font-bold text-lg hover:text-[#4B7B3B] transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 p-2 bg-gray-50 rounded-full transition-colors flex-shrink-0">
                        <X size={20} />
                      </button>
                    </div>
                    
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-2">Size: {item.size}</p>
                    
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center border-2 border-gray-200 rounded-lg bg-gray-50 h-12">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-4 text-gray-500 hover:text-[#4B7B3B] h-full flex items-center transition-colors">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center text-base font-bold text-gray-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-4 text-gray-500 hover:text-[#4B7B3B] h-full flex items-center transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        {item.originalPrice > item.price && (
                          <div className="text-sm font-medium text-gray-400 line-through mb-1">₹{item.originalPrice * item.quantity}</div>
                        )}
                        <div className="text-2xl font-bold text-gray-900">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Recommendations */}
            {recommendedProducts.length > 0 && (
              <div className="mt-16">
                <h3 className="font-sans text-2xl font-bold mb-6 text-gray-900">Complete Your Routine</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendedProducts.map(prod => (
                    <Link key={prod.id} href={`/products/${prod.slug}`} className="group bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                      <div className="relative w-full aspect-square bg-[#f9f9f9] rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                        <Image src={prod.images[0]} alt={prod.name} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1 line-clamp-1">{prod.name}</h4>
                      <div className="text-xs text-gray-500 mb-2 line-clamp-2">{prod.shortDescription}</div>
                      <div className="font-bold text-[#4B7B3B]">₹{prod.price}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-32">
              <h2 className="font-sans text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="mb-8 bg-[#f9f9f9] p-4 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center text-sm font-bold text-gray-800 mb-3">
                  <span>
                    {isFreeShipping ? (
                      <span className="flex items-center text-[#4B7B3B]"><Check size={16} className="mr-1"/> Free Shipping Unlocked</span>
                    ) : (
                      <>You're <span className="text-[#E88B23]">₹{remaining}</span> away from Free Shipping</>
                    )}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                  <div className="h-full bg-gradient-to-r from-[#4B7B3B] to-[#5c9948] transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between text-gray-600 font-medium text-lg">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">₹{subtotal}</span>
                </div>
                
                {itemDiscount > 0 && (
                  <div className="flex justify-between text-[#4B7B3B] font-bold text-lg bg-[#4B7B3B]/5 p-2 rounded-md">
                    <span>Product Discounts</span>
                    <span>-₹{itemDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 font-medium text-lg">
                  <span className="flex items-center gap-2">Shipping <Info size={16} className="text-gray-400" /></span>
                  <span className={isFreeShipping ? 'text-[#4B7B3B] font-bold uppercase tracking-wide' : 'text-gray-900 font-bold'}>{isFreeShipping ? 'Free' : `₹${shippingCost}`}</span>
                </div>

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#4B7B3B] font-bold text-lg bg-[#4B7B3B]/5 p-2 rounded-md">
                    <span>Promo Code (WELLNESS10)</span>
                    <span>-₹{promoDiscount.toFixed(0)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-xl font-bold text-gray-900">Estimated Total</span>
                <span className="text-3xl font-bold text-gray-900">₹{finalTotal.toFixed(0)}</span>
              </div>

              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Have a wellness code?</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Code" 
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#4B7B3B] focus:ring-0 font-bold text-gray-700 uppercase"
                    disabled={promoStatus === 'applied'}
                  />
                  <button 
                    onClick={handleApplyPromo}
                    disabled={promoStatus === 'applied' || !promoCode}
                    className={`px-6 py-3 font-bold uppercase tracking-widest rounded-lg transition-colors ${promoStatus === 'applied' ? 'bg-[#4B7B3B] text-white' : 'bg-gray-900 hover:bg-gray-800 text-white disabled:bg-gray-300 disabled:text-gray-500'}`}
                  >
                    {promoStatus === 'applied' ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {promoStatus === 'invalid' && <p className="text-red-500 text-sm font-bold mt-2">Invalid promo code.</p>}
              </div>

              <Link href="/checkout" className="w-full py-4 bg-[#E88B23] hover:bg-[#D67A18] text-white font-bold text-lg uppercase tracking-widest rounded-lg flex justify-center items-center gap-3 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <Shield size={24} />
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

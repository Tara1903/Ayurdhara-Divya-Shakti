'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, getCartSubtotal, removeItem, updateQuantity } = useCartStore();
  const { user } = useAuthStore();
  const isGoldMember = user?.isGoldMember || false;

  const subtotal = getCartSubtotal(isGoldMember);
  const FREE_SHIPPING_THRESHOLD = 2000;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-[#f9f9f9] shadow-2xl z-[10000] flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-gray-900 font-sans">Your Cart</h2>
          <button 
            onClick={closeCart} 
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          // Empty State
          <div className="flex-1 p-8 flex flex-col justify-center items-center text-center bg-white">
            <div className="w-24 h-24 bg-[#4B7B3B]/10 rounded-full flex items-center justify-center mb-6 shadow-sm text-[#4B7B3B]">
              <ShoppingBag size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 font-sans">Your Cart is Empty</h3>
            <p className="text-gray-500 mb-8 max-w-xs leading-relaxed">Discover authentic Ayurvedic blends crafted for your daily wellness routine.</p>
            <Link 
              href="/collections" 
              onClick={closeCart} 
              className="w-full py-4 bg-[#4B7B3B] hover:bg-[#2D5A27] text-white font-bold uppercase tracking-widest rounded-lg transition-colors shadow-md text-center"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress */}
            <div className="p-5 bg-white border-b border-gray-100 shadow-sm z-10 relative">
              <p className="text-sm font-bold text-gray-800 text-center mb-3">
                {remaining > 0 ? (
                  <>You're <span className="text-[#E88B23]">₹{remaining}</span> away from FREE shipping!</>
                ) : (
                  <span className="text-[#4B7B3B]">You've unlocked FREE shipping! 🎉</span>
                )}
              </p>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                <div 
                  className="h-full bg-gradient-to-r from-[#4B7B3B] to-[#5c9948] transition-all duration-700 ease-out relative" 
                  style={{ width: `${progress}%` }} 
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f9f9f9]">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 relative group">
                  <Link href={`/products/${item.productId}`} onClick={closeCart} className="relative w-24 h-28 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0 border border-gray-100 flex items-center justify-center">
                    <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                  </Link>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <Link href={`/products/${item.productId}`} onClick={closeCart} className="text-gray-900 font-bold text-sm leading-tight line-clamp-2 hover:text-[#4B7B3B] transition-colors pr-6">
                          {item.name}
                        </Link>
                        <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Size: {item.size}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex items-center border-2 border-gray-100 rounded-lg bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          className="px-3 py-1.5 text-gray-500 hover:text-[#4B7B3B] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="px-3 py-1.5 text-gray-500 hover:text-[#4B7B3B] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        {isGoldMember && item.goldMemberPrice && item.goldMemberPrice < item.price ? (
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-[#E88B23] uppercase tracking-wider mb-0.5">Gold Price</span>
                            <span className="font-bold text-lg text-[#E88B23]">₹{item.goldMemberPrice * item.quantity}</span>
                          </div>
                        ) : (
                          <span className="font-bold text-lg text-gray-900">₹{item.price * item.quantity}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-semibold">Subtotal</span>
                <span className="text-2xl font-bold text-gray-900">₹{subtotal}</span>
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-6 text-center">Taxes and shipping calculated at checkout</p>
              
              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-[#E88B23] hover:bg-[#D67A18] text-white font-bold uppercase tracking-widest rounded-lg transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Proceed to Checkout
                </button>
                <Link href="/cart" onClick={closeCart} className="w-full py-3.5 bg-white text-gray-700 font-bold uppercase tracking-widest rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-center transition-all">
                  View Full Cart
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}} />
    </>
  );
}

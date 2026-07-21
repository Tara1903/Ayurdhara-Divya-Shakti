'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Shield, Check, Info } from 'lucide-react';
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
      <div className="cart-page-empty" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-24) var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--charcoal)' }}>Your Wellness Bag is Waiting</h1>
        <p style={{ color: '#4B5563', marginBottom: '2rem', fontSize: '1.1rem' }}>Discover authentic Ayurvedic blends crafted for your daily routine.</p>
        <Link href="/collections" className="btn btn-primary btn-large">Explore Best Sellers</Link>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 24px 80px', display: 'flex', gap: '3rem', flexDirection: 'row', flexWrap: 'wrap' }}>
      {/* LEFT: Cart Items (65%) */}
      <div className="cart-items-section" style={{ flex: '1 1 60%', minWidth: '300px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--charcoal)', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>
          Your Bag ({items.length} item{items.length !== 1 ? 's' : ''})
        </h1>
        
        <div className="cart-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {items.map(item => (
            <div key={item.id} className="cart-page-item" style={{ display: 'flex', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid #F3F4F6' }}>
              <div className="item-image" style={{ width: '120px', height: '150px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#F9FAFB' }}>
                <Link href={`/products/${item.productId}`}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </Link>
              </div>
              <div className="item-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Link href={`/products/${item.productId}`} style={{ textDecoration: 'none', color: 'var(--charcoal)' }}>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{item.name}</h3>
                  </Link>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#6B7280' }}>Size: {item.size}</p>
                
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '4px', height: '40px' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0 1rem', background: 'transparent', border: 'none', cursor: 'pointer', height: '100%' }}>-</button>
                    <span style={{ fontSize: '0.95rem', width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0 1rem', background: 'transparent', border: 'none', cursor: 'pointer', height: '100%' }}>+</button>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {item.originalPrice > item.price && (
                      <div style={{ fontSize: '0.85rem', color: '#9CA3AF', textDecoration: 'line-through', marginBottom: '0.2rem' }}>₹{item.originalPrice * item.quantity}</div>
                    )}
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--charcoal)' }}>₹{item.price * item.quantity}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Smart Recommendations */}
        {recommendedProducts.length > 0 && (
          <div className="cart-recommendations" style={{ marginTop: '4rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--charcoal)' }}>Complete Your Routine</h3>
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
              {recommendedProducts.map(prod => (
                <Link key={prod.id} href={`/products/${prod.slug}`} className="rec-card" style={{ minWidth: '200px', flex: 1, border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1rem', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ width: '100%', height: '150px', position: 'relative', marginBottom: '1rem', borderRadius: '4px', overflow: 'hidden' }}>
                    <Image src={prod.images[0]} alt={prod.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>{prod.name}</h4>
                  <div style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '0.75rem' }}>{prod.shortDescription}</div>
                  <div style={{ fontWeight: 600 }}>₹{prod.price}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Order Summary (35%) */}
      <div className="cart-summary-section" style={{ flex: '1 1 30%', minWidth: '300px' }}>
        <div className="summary-card" style={{ backgroundColor: '#F9FAFB', padding: '2rem', borderRadius: '8px', position: 'sticky', top: '120px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: '0 0 1.5rem 0', color: 'var(--charcoal)' }}>Order Summary</h2>
          
          <div className="shipping-progress" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--charcoal)' }}>
              <span>{isFreeShipping ? <><Check size={14} style={{display:'inline', verticalAlign:'middle'}}/> Free Shipping Unlocked</> : `₹${FREE_SHIPPING_THRESHOLD - subtotal} away from Free Shipping`}</span>
            </div>
            <div style={{ height: '6px', background: '#E5E7EB', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--emerald)', transition: 'width 0.4s ease-out' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4B5563' }}>Subtotal</span>
              <span style={{ fontWeight: 500 }}>₹{subtotal}</span>
            </div>
            
            {itemDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald)' }}>
                <span>Product Discounts</span>
                <span>-₹{itemDiscount}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#4B5563', display: 'flex', alignItems: 'center', gap: '4px' }}>Shipping <Info size={14} /></span>
              <span>{isFreeShipping ? 'Free' : `₹${shippingCost}`}</span>
            </div>

            {promoDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald)' }}>
                <span>Promo Code (WELLNESS10)</span>
                <span>-₹{promoDiscount.toFixed(0)}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.35rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '2rem' }}>
            <span>Estimated Total</span>
            <span>₹{finalTotal.toFixed(0)}</span>
          </div>

          <div className="promo-section" style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#4B5563', marginBottom: '0.5rem' }}>Have a wellness code?</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter Code" 
                style={{ flex: 1, padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                disabled={promoStatus === 'applied'}
              />
              <button 
                onClick={handleApplyPromo}
                disabled={promoStatus === 'applied' || !promoCode}
                style={{ padding: '0 1rem', background: promoStatus === 'applied' ? 'var(--emerald)' : 'var(--charcoal)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {promoStatus === 'applied' ? 'Applied' : 'Apply'}
              </button>
            </div>
            {promoStatus === 'invalid' && <p style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>Invalid promo code.</p>}
          </div>

          <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center', textDecoration: 'none' }}>
            <Shield size={18} />
            Proceed to Checkout
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .cart-page {
            flex-direction: column !important;
          }
          .cart-summary-section {
            position: sticky;
            bottom: 0;
            background: white;
            z-index: 100;
            padding-top: 1rem;
            margin: 0 -24px -80px; /* Stretch to edges on mobile */
            box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
          }
          .summary-card {
            border-radius: 0 !important;
            padding: 1.5rem !important;
          }
        }
      `}} />
    </div>
  );
}

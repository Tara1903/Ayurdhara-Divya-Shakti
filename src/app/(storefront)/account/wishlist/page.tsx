'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatINR } from '@/services/pricingService';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore(state => state.addItem);
  const toggleCart = useCartStore(state => state.toggleCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="account-main">
        <h1 className="account-title" style={{ marginBottom: '2rem' }}>Wishlist</h1>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div className="btn-spinner" style={{ width: 32, height: 32, borderWidth: 3, borderColor: 'var(--sand)', borderTopColor: 'var(--forest)' }} />
        </div>
      </div>
    );
  }

  const handleMoveToCart = (item: any) => {
    addToCart({
      productId: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.price, // Fallback if no originalPrice in wishlist
      image: item.image,
      size: 'Standard Size',
      quantity: 1,
    });
    removeItem(item.id);
    toggleCart();
  };

  return (
    <div className="account-main">
      <div className="account-header" style={{ marginBottom: '2rem' }}>
        <h1 className="account-title">Wishlist</h1>
        <p className="account-subtitle">Save the formulations you'd like to explore later.</p>
      </div>

      {items.length === 0 ? (
        <div className="account-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center', background: 'transparent', borderStyle: 'dashed' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--stone)" strokeWidth="1" style={{ marginBottom: '1.5rem' }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <p style={{ fontSize: '1rem', color: 'var(--stone)', marginBottom: '1.5rem' }}>Your wishlist is currently empty.</p>
          <Link 
            href="/collections" 
            style={{
              display: 'inline-block', padding: '0.875rem 2rem', background: 'var(--charcoal)',
              color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 600
            }}
          >
            Explore Collections
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {items.map(item => (
            <div key={item.id} className="account-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              <Link href={`/products/${item.slug}`} style={{ display: 'block', position: 'relative', width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 240px" />
              </Link>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.25rem' }}>
                {item.name}
              </h3>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '1rem' }}>
                {formatINR(item.price)}
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleMoveToCart(item)}
                  style={{ flex: 1, padding: '0.75rem', background: 'var(--charcoal)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Move to Cart
                </button>
                <button 
                  onClick={() => removeItem(item.id)}
                  style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ivory)', color: 'var(--stone)', border: '1.5px solid var(--sand)', borderRadius: '6px', cursor: 'pointer' }}
                  aria-label="Remove from wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

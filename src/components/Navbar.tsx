'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const cartCount = useCartStore((state) => state.getCartCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const initializeAuth = useAuthStore((state) => state.initialize);
  
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  // Hydration fix: only render cart count after component mounts
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (!isInitialized) initializeAuth();
  }, [isInitialized, initializeAuth]);

  return (
    <>
      <nav className="site-nav" id="site-nav">
        <div className="container flex justify-between items-center">
          <Link href="/" className={`nav-brand flex items-center magnetic ${isHome ? 'hide-on-top' : ''}`} style={{ gap: '0.75rem', textDecoration: 'none' }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" className="brand-icon text-charcoal">
              <path d="M12 22C12 22 4 15 4 8.5C4 4 7.5 2 12 2C16.5 2 20 4 20 8.5C20 15 12 22 12 22Z" strokeLinejoin="round" />
              <path d="M12 22V8" />
              <path d="M12 15C10 12 8 10.5 8 10.5" strokeLinecap="round" />
              <path d="M12 15C14 12 16 10.5 16 10.5" strokeLinecap="round" />
            </svg>
            <span className="text-charcoal brand-text">
              Ayurdhara Divya Shakti
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/#philosophy" className="nav-link text-charcoal magnetic">Philosophy</Link>
            <Link href="/collections" className="nav-link text-charcoal magnetic">Collections</Link>
            <Link href="/#ingredients" className="nav-link text-charcoal magnetic">Ingredients</Link>
            <Link href="/#craft" className="nav-link text-charcoal magnetic">Craft</Link>
            <Link href="/#journal" className="nav-link text-charcoal magnetic">Journal</Link>
            
            {/* User Icon */}
            <Link href={user ? '/account' : '/login'} className="nav-link text-charcoal magnetic" style={{ display: 'flex', alignItems: 'center' }} aria-label="Account">
              <User size={20} />
            </Link>

            {/* Cart Icon */}
            <button 
              onClick={toggleCart} 
              className="nav-link text-charcoal magnetic" 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              aria-label="View Cart"
            >
              <ShoppingBag size={20} />
              {mounted && cartCount > 0 && (
                <span style={{
                  background: 'var(--emerald)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: '12px',
                  lineHeight: 1
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Mobile User Icon */}
            <Link href={user ? '/account' : '/login'} className="mobile-cart-toggle magnetic" style={{ display: 'flex', alignItems: 'center', color: 'var(--charcoal)', textDecoration: 'none' }} aria-label="Account">
              <User size={24} />
            </Link>

            <button 
              className="mobile-cart-toggle magnetic" 
              onClick={toggleCart}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative' }}
            >
              <ShoppingBag size={24} className="text-charcoal" />
              {mounted && cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-8px',
                  background: 'var(--emerald)',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="nav-toggle magnetic" id="nav-toggle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay (Ported exactly as was) */}
      <div className="mobile-nav-overlay" id="mobile-nav-overlay">
        <button className="nav-close" id="nav-close">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-nav-links">
          <Link href="/#philosophy" className="mobile-nav-link text-charcoal">Philosophy</Link>
          <Link href="/collections" className="mobile-nav-link text-charcoal" style={{ color: 'var(--gold)' }}>Collections</Link>
          <Link href="/#ingredients" className="mobile-nav-link text-charcoal">Ingredients</Link>
          <Link href="/#craft" className="mobile-nav-link text-charcoal">Craft</Link>
          <Link href="/#journal" className="mobile-nav-link text-charcoal">Journal</Link>
          <button onClick={() => { toggleCart(); document.getElementById('mobile-nav-overlay')?.classList.remove('active'); }} className="mobile-nav-link text-charcoal" style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>
            Cart {mounted && cartCount > 0 ? `(${cartCount})` : ''}
          </button>
        </div>
      </div>
    </>
  );
}

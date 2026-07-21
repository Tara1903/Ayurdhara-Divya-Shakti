'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
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
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (!isInitialized) initializeAuth();
  }, [isInitialized, initializeAuth]);

  return (
    <>
      <nav className="site-nav" id="site-nav">
        <div className="container flex justify-between items-center" style={{ height: '100%' }}>
          
          {/* Left Side: Search (Top) / Logo (Scrolled) */}
          <div className="nav-brand-container" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            
            {/* Search Bar - Hidden when scrolled */}
            <form action="/collections" method="get" className="nav-search hide-on-scrolled" style={{ position: 'relative', display: 'flex', alignItems: 'center', maxWidth: '280px', width: '100%', transition: 'opacity 0.3s ease' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--charcoal)', opacity: 0.7 }} />
              <input 
                type="search" 
                name="q" 
                placeholder="Search products..." 
                style={{ 
                  width: '100%',
                  padding: '0.6rem 1rem 0.6rem 2.5rem', 
                  background: 'transparent',
                  border: '1px solid rgba(45, 41, 38, 0.2)',
                  borderRadius: '30px',
                  color: 'var(--charcoal)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--charcoal)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(45, 41, 38, 0.2)'}
              />
            </form>

            {/* Logo - Shown when scrolled */}
            <Link href="/" className="nav-brand flex items-center magnetic show-on-scrolled" style={{ gap: '0.75rem', textDecoration: 'none', opacity: 0, position: 'absolute', pointerEvents: 'none', transition: 'opacity 0.3s ease' }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" className="brand-icon text-charcoal">
                <path d="M12 22C12 22 4 15 4 8.5C4 4 7.5 2 12 2C16.5 2 20 4 20 8.5C20 15 12 22 12 22Z" strokeLinejoin="round" />
                <path d="M12 22V8" />
                <path d="M12 15C10 12 8 10.5 8 10.5" strokeLinecap="round" />
                <path d="M12 15C14 12 16 10.5 16 10.5" strokeLinecap="round" />
              </svg>
              <span className="text-charcoal brand-text" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.05em' }}>
                Ayurdhara Divya Shakti
              </span>
            </Link>

          </div>

          {/* Right Side: Hamburger Menu ONLY */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="nav-toggle magnetic" id="nav-toggle" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}>
              <Menu size={28} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Universal Nav Overlay (Desktop & Mobile) */}
      <div className="mobile-nav-overlay" id="mobile-nav-overlay">
        <button className="nav-close" id="nav-close" style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: 'none', color: 'var(--ivory)', cursor: 'pointer', padding: '0.5rem' }}>
          <X size={36} strokeWidth={1} />
        </button>
        <div className="mobile-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
          
          <Link href="/" className="mobile-nav-link text-ivory magnetic" style={{ textDecoration: 'none' }}>Home</Link>
          <Link href="/collections" className="mobile-nav-link text-gold magnetic" style={{ textDecoration: 'none' }}>Collections</Link>
          <Link href="/#philosophy" className="mobile-nav-link text-ivory magnetic" style={{ textDecoration: 'none' }}>Philosophy</Link>
          <Link href="/#ingredients" className="mobile-nav-link text-ivory magnetic" style={{ textDecoration: 'none' }}>Ingredients</Link>
          
          <div style={{ width: '100%', height: '1px', background: 'rgba(250, 247, 242, 0.15)', margin: '1rem 0' }}></div>
          
          <Link href={user ? '/account' : '/login'} className="magnetic" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--ivory)', textDecoration: 'none', fontSize: '1.25rem', fontFamily: 'var(--font-sans)' }}>
            <User size={22} />
            <span>{user ? 'My Account' : 'Login / Register'}</span>
          </Link>
          
          <button onClick={() => { toggleCart(); document.getElementById('mobile-nav-overlay')?.classList.remove('open'); document.body.style.overflow = ''; }} className="magnetic" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--ivory)', fontSize: '1.25rem', fontFamily: 'var(--font-sans)', padding: 0 }}>
            <ShoppingBag size={22} />
            <span>Cart {mounted && cartCount > 0 ? `(${cartCount})` : ''}</span>
          </button>
          
        </div>
      </div>

      {/* Inline styles for scroll behavior */}
      <style dangerouslySetInnerHTML={{__html: `
        .site-nav.scrolled .hide-on-scrolled {
          opacity: 0 !important;
          pointer-events: none;
        }
        .site-nav.scrolled .show-on-scrolled {
          opacity: 1 !important;
          pointer-events: auto !important;
        }
        
        .mobile-nav-overlay {
          position: fixed;
          inset: 0;
          background-color: var(--deep);
          z-index: 9900;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .mobile-nav-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .mobile-nav-link {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--ivory);
        }
        .text-gold {
          color: var(--gold);
        }
      `}} />
    </>
  );
}

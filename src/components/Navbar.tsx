'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Search } from 'lucide-react';
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
          
          {/* Left: Search Bar */}
          <div className="nav-search-container" style={{ flex: 1, maxWidth: '300px' }}>
            <form action="/collections" method="get" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '10px', color: 'var(--stone)' }} />
              <input 
                type="search" 
                name="q" 
                placeholder="Search" 
                className="input-minimal" 
                style={{ 
                  paddingLeft: '2.5rem', 
                  borderBottom: '1px solid var(--charcoal)',
                  opacity: 0.7,
                  fontSize: '0.9rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem'
                }}
              />
            </form>
          </div>

          {/* Right: Hamburger Menu */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="nav-toggle magnetic" id="nav-toggle">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Universal Nav Overlay (Desktop & Mobile) */}
      <div className="mobile-nav-overlay" id="mobile-nav-overlay">
        <button className="nav-close" id="nav-close">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-nav-links">
          <Link href="/" className="mobile-nav-link text-charcoal">Home</Link>
          <Link href="/collections" className="mobile-nav-link text-charcoal" style={{ color: 'var(--gold)' }}>Collections</Link>
          <Link href="/#philosophy" className="mobile-nav-link text-charcoal">Philosophy</Link>
          <Link href="/#ingredients" className="mobile-nav-link text-charcoal">Ingredients</Link>
          <Link href="/#craft" className="mobile-nav-link text-charcoal">Craft</Link>
          <Link href="/#journal" className="mobile-nav-link text-charcoal">Journal</Link>
          
          <div style={{ height: '1px', background: 'rgba(45, 41, 38, 0.1)', margin: '1rem 0' }}></div>
          
          <Link href={user ? '/account' : '/login'} className="mobile-nav-link text-charcoal" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <User size={20} />
            {user ? 'My Account' : 'Login / Register'}
          </Link>
          
          <button onClick={() => { toggleCart(); document.getElementById('mobile-nav-overlay')?.classList.remove('active'); }} className="mobile-nav-link text-charcoal" style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 'inherit', padding: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShoppingBag size={20} />
            Cart {mounted && cartCount > 0 ? `(${cartCount})` : ''}
          </button>
        </div>
      </div>
    </>
  );
}

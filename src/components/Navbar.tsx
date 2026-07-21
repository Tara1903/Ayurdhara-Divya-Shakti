'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const isHome = pathname === '/';
  
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!isInitialized) initializeAuth();
  }, [isInitialized, initializeAuth]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <nav className="site-nav" id="site-nav">
        <div className="container flex justify-between items-center" style={{ height: '100%' }}>
          
          {/* Left Side: Logo & Search Bar */}
          <div className="nav-brand-container" style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '2rem' }}>
            
            {/* Logo - Hidden on mobile */}
            <Link href="/" className="nav-brand flex items-center magnetic" style={{ gap: '0.75rem', textDecoration: 'none' }}>
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

            {/* Search Bar - White background, black outline */}
            <form onSubmit={handleSearch} className="nav-search" style={{ position: 'relative', display: 'flex', alignItems: 'center', maxWidth: '280px', width: '100%' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--charcoal)', opacity: 0.7 }} />
              <input 
                type="search" 
                name="q" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..." 
                style={{ 
                  width: '100%',
                  padding: '0.6rem 1rem 0.6rem 2.5rem', 
                  background: 'white',
                  border: '1px solid black',
                  borderRadius: '30px',
                  color: 'var(--charcoal)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'black'}
                onBlur={(e) => e.target.style.borderColor = 'black'}
              />
            </form>

          </div>

          {/* Right Side: Cart & Hamburger Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={toggleCart} className="magnetic" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)', position: 'relative' }}>
              <ShoppingBag size={24} strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span style={{ position: 'absolute', top: '0', right: '0', background: 'var(--deep)', color: 'var(--ivory)', fontSize: '0.7rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => { setIsMobileMenuOpen(true); document.body.style.overflow = 'hidden'; }} className="nav-toggle magnetic" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--charcoal)' }}>
              <Menu size={28} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Universal Nav Overlay (Desktop & Mobile) */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} style={{ position: 'fixed', inset: 0, backgroundColor: 'var(--deep)', zIndex: 9900, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? 'auto' : 'none', transition: 'opacity 0.4s ease' }}>
        <button onClick={closeMenu} className="nav-close" style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: 'none', color: 'var(--ivory)', cursor: 'pointer', padding: '0.5rem' }}>
          <X size={36} strokeWidth={1} />
        </button>
        <div className="mobile-nav-links" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
          
          <Link href="/" onClick={closeMenu} className="mobile-nav-link text-ivory magnetic" style={{ textDecoration: 'none' }}>Home</Link>
          <Link href="/wellness-packs" onClick={closeMenu} className="mobile-nav-link text-gold magnetic" style={{ textDecoration: 'none' }}>Wellness Packs</Link>
          <Link href="/collections" onClick={closeMenu} className="mobile-nav-link text-ivory magnetic" style={{ textDecoration: 'none' }}>Collections</Link>
          <Link href="/#philosophy" onClick={closeMenu} className="mobile-nav-link text-ivory magnetic" style={{ textDecoration: 'none' }}>Philosophy</Link>
          
          <div style={{ width: '100%', height: '1px', background: 'rgba(250, 247, 242, 0.15)', margin: '1rem 0' }}></div>
          
          <Link href={user ? '/account' : '/login'} onClick={closeMenu} className="magnetic" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--ivory)', textDecoration: 'none', fontSize: '1.25rem', fontFamily: 'var(--font-sans)' }}>
            <User size={22} />
            <span>{user ? 'My Account' : 'Login / Register'}</span>
          </Link>
          
          <button onClick={() => { toggleCart(); closeMenu(); }} className="magnetic" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--ivory)', fontSize: '1.25rem', fontFamily: 'var(--font-sans)', padding: 0 }}>
            <ShoppingBag size={22} />
            <span>Cart {mounted && cartCount > 0 ? `(${cartCount})` : ''}</span>
          </button>
          
        </div>
      </div>

      {/* Inline styles for scroll behavior and mobile layout */}
      <style dangerouslySetInnerHTML={{__html: `
        .mobile-nav-link {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--ivory);
        }
        .text-gold {
          color: var(--gold);
        }
        @media (max-width: 768px) {
          .nav-brand {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}

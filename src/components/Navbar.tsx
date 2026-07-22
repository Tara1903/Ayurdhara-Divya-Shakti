'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import CategoryNavbar from './CategoryNavbar';
import { navigationData, wellnessGuideLinks, accountLinks } from '@/data/categoryData';
import { ChevronDown } from 'lucide-react';
interface SearchResult {
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
}

export default function Navbar() {
  const cartCount = useCartStore((state) => state.getCartCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const initializeAuth = useAuthStore((state) => state.initialize);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const toggleMobileCategory = (slug: string) => {
    setExpandedMobileCategory(prev => prev === slug ? null : slug);
  };

  useEffect(() => {
    setMounted(true);
    if (!isInitialized) initializeAuth();
  }, [isInitialized, initializeAuth]);

  // Debounced search against /api/search
  const fetchSearchResults = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => fetchSearchResults(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchSearchResults]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const showDropdown = isSearchFocused && searchQuery.trim().length >= 2;

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#2D5A27] text-white text-xs md:text-sm text-center py-2 px-4 font-sans font-medium tracking-wide">
        Free Shipping on all orders above ₹999 | 100% Certified Organic
      </div>
      
      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-[1000] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex justify-between items-center">
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => { setIsMobileMenuOpen(true); document.body.style.overflow = 'hidden'; }} 
              className="md:hidden text-gray-800 hover:text-[#4B7B3B] p-2 -ml-2"
            >
              <Menu size={24} strokeWidth={2} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center no-underline relative h-10 w-32 md:h-12 md:w-40">
              <Image 
                src="/images/logo.png" 
                alt="Ayurdhara Divya Shakti" 
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            {/* Desktop Navigation Links (Now moved to CategoryNavbar, leaving only static primary links here) */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/collections" className="text-sm font-bold text-gray-800 hover:text-[#4B7B3B] uppercase tracking-wider transition-colors">Shop All</Link>
              <Link href="/wellness-combos" className="text-sm font-bold text-[#E88B23] hover:text-[#D9381E] uppercase tracking-wider transition-colors">Combos</Link>
              <Link href="/wellness-guide/how-to-use" className="text-sm font-bold text-gray-800 hover:text-[#4B7B3B] uppercase tracking-wider transition-colors">Guide</Link>
            </div>

            {/* Right Side: Search, Account, Cart */}
            <div className="flex items-center gap-4 md:gap-6">
              
              {/* Desktop Search Bar */}
              <form onSubmit={handleSearch} className="hidden md:flex relative items-center w-[300px]">
                <Search size={18} className="absolute left-3 text-gray-400" />
                <input 
                  type="search" 
                  name="q" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for organic products..." 
                  autoComplete="off"
                  className="w-full py-2.5 pl-10 pr-4 bg-[#f9f9f9] border border-gray-200 rounded-full text-sm text-gray-800 font-medium focus:outline-none focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] transition-all"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                
                {/* Search Suggestions Dropdown */}
                {showDropdown && (
                  <div className="absolute top-[110%] right-0 w-[350px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-[9999]">
                    {isSearching ? (
                      <div className="p-4 text-center text-sm text-gray-500 font-medium">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <ul className="m-0 p-0 list-none">
                        {searchResults.slice(0, 4).map((result) => (
                          <li key={result.slug} className="border-b border-gray-50">
                            <Link 
                              href={`/products/${result.slug}`} 
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-12 h-12 relative rounded border border-gray-100 overflow-hidden bg-gray-50 flex-shrink-0">
                                {result.image && (
                                  <Image src={result.image} alt={result.name} fill className="object-cover" sizes="48px" />
                                )}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <div className="text-sm font-bold text-gray-800 truncate">{result.name}</div>
                                <div className="text-sm font-semibold text-[#E88B23]">₹{result.price}</div>
                              </div>
                            </Link>
                          </li>
                        ))}
                        <li>
                          <button onClick={() => handleSearch()} className="w-full p-3 bg-gray-50 text-[#4B7B3B] text-sm font-bold hover:bg-gray-100 transition-colors">
                            View all results →
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500 font-medium">No products found for &quot;{searchQuery}&quot;</div>
                    )}
                  </div>
                )}
              </form>

              <Link href={user ? '/account' : '/login'} className="hidden md:flex text-gray-700 hover:text-[#4B7B3B] transition-colors">
                <User size={24} strokeWidth={1.5} />
              </Link>
              
              <button onClick={toggleCart} className="relative p-1 text-gray-700 hover:text-[#E88B23] transition-colors focus:outline-none">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E88B23] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <CategoryNavbar />
      </nav>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[9900] flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <span className="text-xl font-serif font-bold text-[#2D5A27]">Menu</span>
          <button onClick={closeMenu} className="p-2 text-gray-600 hover:text-[#D9381E] bg-gray-50 rounded-full">
            <X size={24} strokeWidth={2} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col flex-1 overflow-y-auto">
          <form onSubmit={(e) => { handleSearch(e); closeMenu(); }} className="relative mb-6">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..." 
              className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-xl text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4B7B3B]"
            />
          </form>

          <div className="flex flex-col gap-1 pb-6">
            <Link href="/" onClick={closeMenu} className="py-4 text-xl font-bold text-gray-800 border-b border-gray-50">Home</Link>
            
            {navigationData.map((category) => (
              <div key={category.slug} className="border-b border-gray-50">
                <button 
                  onClick={() => toggleMobileCategory(category.slug)}
                  className="w-full py-4 flex items-center justify-between text-xl font-bold text-gray-800"
                >
                  {category.name}
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-200 text-gray-400 ${expandedMobileCategory === category.slug ? 'rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${expandedMobileCategory === category.slug ? 'max-h-[1000px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
                >
                  <div className="flex flex-col gap-3 pl-4 border-l-2 border-[#E88B23] ml-2">
                    <Link 
                      href={`/${category.slug}`} 
                      onClick={closeMenu} 
                      className="text-base font-bold text-[#4B7B3B] py-1"
                    >
                      Shop All {category.name} →
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link 
                        key={sub.slug} 
                        href={`/${category.slug}/${sub.slug}`} 
                        onClick={closeMenu} 
                        className="text-base font-semibold text-gray-600 py-1"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-4">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">Wellness Guide</span>
              {wellnessGuideLinks.map(link => (
                <Link key={link.slug} href={link.slug} onClick={closeMenu} className="py-2 text-lg font-semibold text-gray-700 block">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-2">
             <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">My Account</span>
             {user ? (
               accountLinks.filter(l => l.name !== 'Login').map(link => (
                 <Link key={link.slug} href={link.slug} onClick={closeMenu} className="py-2 text-lg font-semibold text-gray-700 flex items-center gap-3">
                   {link.name}
                 </Link>
               ))
             ) : (
               <Link href="/login" onClick={closeMenu} className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-xl text-gray-800 font-bold text-lg">
                 <User size={24} className="text-[#4B7B3B]" />
                 <span>Login / Register</span>
               </Link>
             )}
          </div>
        </div>
      </div>
    </>
  );
}

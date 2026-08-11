'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AccountNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const signOut = useAuthStore((state) => state.signOut);

  const links = [
    { label: 'Overview', href: '/account', exact: true },
    { label: 'Rewards', href: '/account/rewards', exact: false },
    { label: 'My Orders', href: '/account/orders', exact: false },
    { label: 'Wishlist', href: '/account/wishlist', exact: false },
    { label: 'Addresses', href: '/account/addresses', exact: false },
    { label: 'Profile', href: '/account/profile', exact: false },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="flex flex-col gap-1 w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-serif font-bold text-charcoal mb-4 px-2">My Account</h2>
      
      {links.map((link) => {
        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              isActive 
                ? 'bg-olive/10 text-olive' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      <div className="h-px bg-gray-100 my-4" />
      
      <button 
        onClick={handleSignOut} 
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sign Out
      </button>
    </nav>
  );
}

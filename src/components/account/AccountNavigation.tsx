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
    <nav className="account-nav">
      <h2 className="account-nav-title">My Account</h2>
      
      {links.map((link) => {
        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={`account-nav-link ${isActive ? 'active' : ''}`}>
            {link.label}
          </Link>
        );
      })}

      <div className="account-nav-divider" />
      
      <button onClick={handleSignOut} className="account-signout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sign Out
      </button>
    </nav>
  );
}

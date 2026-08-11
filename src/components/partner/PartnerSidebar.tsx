'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  BarChart3,
  HelpCircle,
  Package
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const NAV_SECTIONS = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/partner/dashboard/retailer', icon: LayoutDashboard },
    ]
  },
  {
    title: 'BUSINESS',
    items: [
      { label: 'Wholesale Orders', href: '/partner/dashboard/retailer/orders', icon: ShoppingCart },
      { label: 'Customer Analytics', href: '/partner/dashboard/retailer/analytics', icon: BarChart3 },
      { label: 'Stock & Inventory', href: '/partner/dashboard/retailer/stock', icon: Package },
    ]
  },
  {
    title: 'SUPPORT',
    items: [
      { label: 'Help Center', href: '/partner/dashboard/retailer/support', icon: HelpCircle },
      { label: 'Settings', href: '/partner/dashboard/retailer/settings', icon: Settings },
    ]
  }
];

export default function PartnerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const setSession = useAuthStore((state) => state.setSession);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push('/partner/login');
  };

  return (
    <aside className="w-64 h-screen bg-[#1A1A1A] border-r border-[#222] text-[#E5E5E5] flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Brand */}
      <div className="p-6 sticky top-0 bg-[#1A1A1A]/95 backdrop-blur z-10 border-b border-[#333]">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Ayurdhara Divya Shakti" width={32} height={32} className="object-contain bg-white rounded-full p-0.5" />
          <span className="font-serif text-lg tracking-wider text-white font-bold">Partner Desk</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-8">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3 px-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <Link 
                    key={itemIdx} 
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive 
                        ? 'bg-[#2D5A27]/20 text-[#E88B23]' 
                        : 'text-gray-400 hover:text-white hover:bg-[#2D5A27]/10'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer (Logout) */}
      <div className="p-4 border-t border-[#333] sticky bottom-0 bg-[#1A1A1A]">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

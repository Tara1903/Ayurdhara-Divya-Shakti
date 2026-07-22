'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  Layers, 
  Leaf, 
  HeartPulse, 
  Archive,
  ShoppingCart,
  CreditCard,
  Truck,
  Users,
  MessageSquare,
  Gift,
  Ticket,
  MessageCircle,
  Image as ImageIcon,
  LayoutTemplate,
  Home,
  MenuSquare,
  BookOpen,
  HelpCircle,
  Star,
  FileText,
  Search,
  BarChart3,
  Settings,
  Shield,
  History,
  LogOut
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const NAV_SECTIONS = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ]
  },
  {
    title: 'COMMERCE',
    items: [
      { label: 'Products', href: '/admin/products', icon: Package },
      { label: 'Collections', href: '/admin/collections', icon: Layers },
      { label: 'Categories', href: '/admin/categories', icon: Tag },
      { label: 'Ingredients', href: '/admin/ingredients', icon: Leaf },
      { label: 'Health Goals', href: '/admin/health-goals', icon: HeartPulse },
      { label: 'Inventory', href: '/admin/inventory', icon: Archive },
    ]
  },
  {
    title: 'SALES',
    items: [
      { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
      { label: 'Payments', href: '/admin/payments', icon: CreditCard },
      { label: 'Shipments', href: '/admin/shipments', icon: Truck },
    ]
  },
  {
    title: 'CUSTOMERS',
    items: [
      { label: 'Customers', href: '/admin/customers', icon: Users },
      { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    ]
  },
  {
    title: 'MARKETING',
    items: [
      { label: 'Offers', href: '/admin/marketing/offers', icon: Gift },
      { label: 'Coupons', href: '/admin/marketing/coupons', icon: Ticket },
      { label: 'Popups', href: '/admin/marketing/popups', icon: MessageCircle },
      { label: 'Banners', href: '/admin/marketing/banners', icon: ImageIcon },
      { label: 'Announcement Bar', href: '/admin/marketing/announcement-bar', icon: LayoutTemplate },
      { label: 'Merchandising', href: '/admin/marketing/merchandising', icon: Star },
    ]
  },
  {
    title: 'CONTENT',
    items: [
      { label: 'Homepage', href: '/admin/content/homepage', icon: Home },
      { label: 'Navigation', href: '/admin/content/navigation', icon: MenuSquare },
      { label: 'Journal', href: '/admin/journal', icon: BookOpen },
      { label: 'FAQs', href: '/admin/content/faqs', icon: HelpCircle },
      { label: 'Testimonials', href: '/admin/content/testimonials', icon: Star },
      { label: 'Pages', href: '/admin/content/pages', icon: FileText },
      { label: 'Footer', href: '/admin/content/footer', icon: LayoutTemplate },
    ]
  },
  {
    title: 'MEDIA & SEO',
    items: [
      { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
      { label: 'SEO', href: '/admin/seo', icon: Search },
    ]
  },
  {
    title: 'INSIGHTS',
    items: [
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
      { label: 'Admin Users', href: '/admin/admin-users', icon: Shield },
      { label: 'Permissions', href: '/admin/permissions', icon: Shield },
      { label: 'Audit Log', href: '/admin/audit-log', icon: History },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 h-screen bg-[#1A1A1A] border-r border-[#222] text-[#E5E5E5] flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Brand */}
      <div className="p-6 sticky top-0 bg-[#1A1A1A]/95 backdrop-blur z-10 border-b border-[#333]">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Ayurdhara Divya Shakti" width={32} height={32} className="object-contain" />
          <span className="font-serif text-lg tracking-wider text-white uppercase font-bold">Admin</span>
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
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-sm text-gray-400 hover:text-[#E88B23] hover:bg-[#E88B23]/10 transition-colors"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

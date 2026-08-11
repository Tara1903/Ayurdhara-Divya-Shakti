'use client';

import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function PartnerTopbar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex-1 flex items-center">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#4B7B3B] focus:ring-1 focus:ring-[#4B7B3B] sm:text-sm transition-colors"
            placeholder="Search orders, customers..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E88B23] rounded-full border border-white"></span>
        </button>
        
        <div className="h-6 w-px bg-gray-200 mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-gray-900">{user?.fullName || 'Retail Partner'}</span>
            <span className="text-xs text-[#2D5A27] font-medium tracking-wide uppercase">Active Retailer</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-[#E88B23]/10 border border-[#E88B23]/20 flex items-center justify-center text-[#E88B23]">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}

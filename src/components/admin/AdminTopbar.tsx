'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle could go here */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products, orders, customers (Cmd+K)" 
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm w-96 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-[#2D5A27] transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E88B23] rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#E0EBDC] flex items-center justify-center text-[#2D5A27] font-bold text-sm">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Admin User</span>
            <span className="text-xs text-gray-500">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

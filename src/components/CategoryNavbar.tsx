'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { navigationData, Category } from '@/data/categoryData';
import { usePathname } from 'next/navigation';

export default function CategoryNavbar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (slug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(slug);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 150); // slight delay to prevent flickering
  };

  return (
    <div className="hidden lg:block bg-white border-b border-gray-100 relative z-[999]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center gap-8 h-12">
          {navigationData.map((category) => {
            const isActive = pathname.startsWith(`/${category.slug}`);
            return (
              <li 
                key={category.slug}
                className="h-full flex items-center group relative"
                onMouseEnter={() => handleMouseEnter(category.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <Link 
                  href={`/${category.slug}`}
                  className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wider transition-colors h-full ${
                    isActive ? 'text-[#E88B23]' : 'text-gray-700 hover:text-[#4B7B3B]'
                  }`}
                >
                  {category.name}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${activeCategory === category.slug ? 'rotate-180 text-[#4B7B3B]' : 'text-gray-400'}`} />
                </Link>

                {/* Mega Menu Dropdown */}
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-gray-100 shadow-xl rounded-b-xl overflow-hidden transition-all duration-200 origin-top ${
                    activeCategory === category.slug 
                      ? 'opacity-100 scale-100 visible' 
                      : 'opacity-0 scale-95 invisible'
                  }`}
                >
                  <div className="flex">
                    {/* Left side: Description */}
                    <div className="w-1/3 bg-[#f8faf8] p-6 border-r border-gray-100 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-[#2D5A27] mb-2">{category.name}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                      </div>
                      <Link 
                        href={`/${category.slug}`}
                        className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#E88B23] hover:text-[#D9381E] transition-colors"
                      >
                        Shop All <ChevronRight size={16} />
                      </Link>
                    </div>

                    {/* Right side: Subcategories Grid */}
                    <div className="w-2/3 p-6">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {category.subcategories.map((sub) => (
                          <Link 
                            key={sub.slug} 
                            href={`/${category.slug}/${sub.slug}`}
                            className="group/link flex items-center gap-2 p-2 rounded-lg hover:bg-[#f8faf8] transition-colors"
                          >
                            <div className="w-2 h-2 rounded-full bg-gray-200 group-hover/link:bg-[#E88B23] transition-colors"></div>
                            <span className="text-sm font-semibold text-gray-700 group-hover/link:text-[#2D5A27] transition-colors">
                              {sub.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

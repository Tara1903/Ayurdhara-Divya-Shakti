'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { navigationGroups, navigationData } from '@/data/categoryData';
import { usePathname } from 'next/navigation';

export default function CategoryNavbar() {
  const [activeGroupTitle, setActiveGroupTitle] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveGroupTitle(title);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveGroupTitle(null);
    }, 180);
  };

  return (
    <div className="hidden lg:block bg-[#FCF9F4] border-b border-[#E5E2DD] relative z-[999] shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center gap-6 xl:gap-8 h-11 text-xs font-bold uppercase tracking-wider">
          {navigationGroups.map((group) => {
            const isGroupOpen = activeGroupTitle === group.title;
            const groupCategories = group.categories
              .map((catName) => navigationData.find((c) => c.name.toLowerCase() === catName.toLowerCase()))
              .filter(Boolean);

            const isGroupActive = groupCategories.some(
              (cat) => cat && pathname.startsWith(`/${cat.slug}`)
            );

            return (
              <li
                key={group.title}
                className="h-full flex items-center group relative"
                onMouseEnter={() => handleMouseEnter(group.title)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 transition-colors h-full px-2 cursor-pointer font-bold ${
                    isGroupActive || isGroupOpen
                      ? 'text-[#1B4332] border-b-2 border-[#1B4332]'
                      : 'text-stone-700 hover:text-[#1B4332]'
                  }`}
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${
                      isGroupOpen ? 'rotate-180 text-[#D4AF37]' : 'text-stone-400'
                    }`}
                  />
                </button>

                {/* Dropdown Mega Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[900px] xl:w-[1020px] max-w-[94vw] bg-white border border-[#E5E2DD] shadow-2xl rounded-b-2xl overflow-hidden transition-all duration-200 origin-top ${
                    isGroupOpen
                      ? 'opacity-100 scale-100 visible'
                      : 'opacity-0 scale-95 invisible pointer-events-none'
                  }`}
                >
                  <div className="p-6 xl:p-8">
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E2DD]/70">
                      <div>
                        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                          Sacred Vedic Categories
                        </span>
                        <h3 className="text-xl font-serif font-bold text-[#1B4332]">
                          {group.title}
                        </h3>
                      </div>
                      <Link
                        href="/collections"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:text-[#D4AF37] transition-colors"
                      >
                        Browse All 20 Formulations <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Multi-column grid */}
                    <div
                      className={`grid gap-6 ${
                        groupCategories.length <= 2
                          ? 'grid-cols-2'
                          : groupCategories.length === 3
                          ? 'grid-cols-3'
                          : groupCategories.length === 4
                          ? 'grid-cols-4'
                          : 'grid-cols-3 xl:grid-cols-4'
                      }`}
                    >
                      {groupCategories.map((cat) => {
                        if (!cat) return null;
                        return (
                          <div
                            key={cat.slug}
                            className="flex flex-col justify-between p-4 rounded-xl bg-[#FCF9F4] border border-[#E5E2DD]/60 hover:border-[#D4AF37]/60 hover:shadow-md transition-all group/card"
                          >
                            <div>
                              <Link
                                href={`/${cat.slug}`}
                                className="block font-serif font-bold text-[#1B4332] text-sm group-hover/card:text-[#D4AF37] transition-colors mb-1.5"
                              >
                                {cat.name}
                              </Link>
                              <p className="text-[12px] text-stone-600 line-clamp-2 leading-relaxed mb-3 font-normal normal-case">
                                {cat.description}
                              </p>

                              {cat.subcategories && cat.subcategories.length > 0 && (
                                <ul className="space-y-1 mb-3 pt-2 border-t border-[#E5E2DD]/50">
                                  {cat.subcategories.slice(0, 3).map((sub) => (
                                    <li key={sub.slug}>
                                      <Link
                                        href={`/${cat.slug}/${sub.slug}`}
                                        className="text-[11px] font-medium text-stone-600 hover:text-[#1B4332] transition-colors flex items-center gap-1 normal-case"
                                      >
                                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
                                        {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>

                            <Link
                              href={`/${cat.slug}`}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1B4332] group-hover/card:text-[#D4AF37] transition-colors pt-2 border-t border-[#E5E2DD]/40 mt-auto uppercase tracking-wider"
                            >
                              Explore <ChevronRight size={12} />
                            </Link>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Strip */}
                    <div className="mt-6 pt-4 border-t border-[#E5E2DD]/70 flex items-center justify-between text-xs text-stone-600 normal-case">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#1B4332]" />
                        <span>100% Raw, Lab-Tested, & Traditional Ghani Extracted</span>
                      </div>
                      <Link
                        href="/business-opportunity"
                        className="inline-flex items-center gap-1 font-bold text-[#1B4332] hover:text-[#D4AF37] uppercase tracking-wider text-[11px]"
                      >
                        <Sparkles size={13} className="text-[#D4AF37]" /> Partner With Us
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}

          {/* Quick Collections Link */}
          <li className="h-full flex items-center">
            <Link
              href="/collections"
              className={`px-2 transition-colors ${
                pathname === '/collections'
                  ? 'text-[#1B4332] border-b-2 border-[#1B4332]'
                  : 'text-stone-700 hover:text-[#1B4332]'
              }`}
            >
              All Formulations
            </Link>
          </li>

          {/* Business Opportunity Highlight */}
          <li className="h-full flex items-center">
            <Link
              href="/business-opportunity"
              className={`px-2 transition-colors flex items-center gap-1.5 ${
                pathname.startsWith('/business-opportunity')
                  ? 'text-[#B38F24] border-b-2 border-[#B38F24]'
                  : 'text-[#D4AF37] hover:text-[#B38F24]'
              }`}
            >
              <Sparkles size={13} />
              <span>Business Opportunity</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

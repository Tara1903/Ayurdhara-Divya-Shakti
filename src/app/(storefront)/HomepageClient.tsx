'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/productData';
import { ArrowRight, Star, ShieldCheck, Sparkles, HeartHandshake, Users, Store, Truck } from 'lucide-react';

interface HomepageClientProps {
  products: Product[];
}

// Exact 9 Display Order Categories
const CATEGORY_ORDER = [
  "Kids Care Oil Blend",
  "Men Wellness Oil Blend",
  "Women Wellness Oil Blend",
  "Senior Care Oil Blend",
  "Feet Massage Oil",
  "Hair Wellness Oil",
  "Individual Wellness Packs",
  "Family Trial Wellness Packs",
  "Family Gold Wellness Packs"
];

const CATEGORY_ICONS: Record<string, string> = {
  "Kids Care Oil Blend": "🌿",
  "Men Wellness Oil Blend": "🌿",
  "Women Wellness Oil Blend": "🌿",
  "Senior Care Oil Blend": "🌿",
  "Feet Massage Oil": "👣",
  "Hair Wellness Oil": "🌿",
  "Individual Wellness Packs": "🌱",
  "Family Trial Wellness Packs": "👨‍👩",
  "Family Gold Wellness Packs": "👨‍👩"
};

export default function HomepageClient({ products }: HomepageClientProps) {
  return (
    <div className="bg-[#fcfcfc] text-gray-800">
      <HeroSection />
      <CategoryNavigationIcons />
      <WrittenBrandStatement />
      
      {/* Category-Wise Product Catalog Showcase */}
      <CategoryWiseCatalogSection products={products} />
      
      <BusinessOpportunityTeaser />
      
      <DailyRitualsBanner />
      <CustomerReviewsSection />
      <BrandStorySection />
    </div>
  );
}

// ----------------------------------------------------------------------
// HERO SECTION
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="relative w-full h-[65vh] md:h-[80vh] min-h-[550px] bg-[#E0EBDC]">
      <Image 
        src="/images/promo_banner_main_1784743880111.jpg" 
        alt="Ayurdhara Divya Shakti Ayurvedic Wellness" 
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl bg-white/10 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-3xl shadow-2xl border border-white/20">
            <span className="text-[#D4AF37] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3 block">
              Pure Ayurvedic Wisdom
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-white leading-tight">
              Ayurdhara Divya Shakti
            </h1>
            <p className="text-sm sm:text-lg mb-8 text-white/90 font-medium leading-relaxed max-w-xl">
              Authentic cold-pressed Nabhi therapy oils, therapeutic foot massage blends, and multi-generational family wellness packs. Traditional healing for modern life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#catalog-showcase" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-bold text-white uppercase tracking-wider bg-[#2D5A27] hover:bg-[#23481f] transition-all rounded-xl shadow-lg hover:shadow-xl border border-[#D4AF37]/40"
              >
                Explore Catalog
              </a>
              <Link 
                href="/wellness-guide/how-to-use" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-bold text-white uppercase tracking-wider bg-white/10 hover:bg-white hover:text-[#2D5A27] border border-white/40 transition-all rounded-xl backdrop-blur-xs"
              >
                Nabhi Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// CATEGORY NAVIGATION ICONS (Top Quick Nav)
// ----------------------------------------------------------------------
function CategoryNavigationIcons() {
  const categoryLinks = [
    { name: 'Kids Care', cat: 'Kids Care Oil Blend', image: '/images/products/nabhi-kids-smart-15ml.jpg', icon: '🌿' },
    { name: 'Men Wellness', cat: 'Men Wellness Oil Blend', image: '/images/products/nabhi-men-strength-15ml.jpg', icon: '🌿' },
    { name: 'Women Wellness', cat: 'Women Wellness Oil Blend', image: '/images/products/nabhi-women-harmony-15ml.jpg', icon: '🌿' },
    { name: 'Senior Care', cat: 'Senior Care Oil Blend', image: '/images/products/nabhi-senior-comfort-15ml.jpg', icon: '🌿' },
    { name: 'Feet Massage', cat: 'Feet Massage Oil', image: '/images/category_feet_1784743921281.jpg', icon: '👣' },
    { name: 'Hair Wellness', cat: 'Hair Wellness Oil', image: '/images/category_hair_1784743931871.jpg', icon: '🌿' },
    { name: 'Individual Packs', cat: 'Individual Wellness Packs', image: '/images/products/combo-individual-trial.jpg', icon: '🌱' },
    { name: 'Family Trial', cat: 'Family Trial Wellness Packs', image: '/images/products/combo-family-trial.jpg', icon: '👨‍👩' },
    { name: 'Family Gold', cat: 'Family Gold Wellness Packs', image: '/images/products/combo-family-gold.jpg', icon: '👨‍👩' },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4B7B3B]">Curated Categories</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">Shop By Category</h2>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-4 md:gap-8 scrollbar-hide justify-start lg:justify-center px-2">
          {categoryLinks.map((item, idx) => (
            <a
              key={idx}
              href={`#cat-${item.cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="group flex flex-col items-center text-center w-24 sm:w-28 flex-shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-2xl overflow-hidden mb-2.5 bg-[#F5F7F4] shadow-xs border-2 border-gray-100 group-hover:border-[#D4AF37] transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="text-[11px] sm:text-xs font-bold text-gray-800 group-hover:text-[#2D5A27] transition-colors leading-tight">
                {item.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// WRITTEN STATEMENT
// ----------------------------------------------------------------------
function WrittenBrandStatement() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF6ED]/60 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2 block">Our Foundation</span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D5A27] mb-6">
          Rooted in Ayurvedic Wisdom, Crafted with Organic Purity
        </h2>
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full"></div>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
          Ayurveda teaches us that true vitality is cultivated through daily conscious rituals. By harnessing the transformative power of Nabhi Chikitsa (Navel Therapy) and Padabhyanga (Foot Therapy), Ayurdhara Divya Shakti delivers cold-pressed botanical oils free from synthetic additives—nourishing your body from the core.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-100 flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-[#2D5A27] mb-2" />
            <span className="text-xs font-bold text-gray-800">100% Pure Oils</span>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-100 flex flex-col items-center">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mb-2" />
            <span className="text-xs font-bold text-gray-800">AYUSH Formulated</span>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-100 flex flex-col items-center">
            <HeartHandshake className="w-8 h-8 text-[#4B7B3B] mb-2" />
            <span className="text-xs font-bold text-gray-800">All Age Care</span>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-xs border border-gray-100 flex flex-col items-center">
            <Star className="w-8 h-8 text-[#E88B23] mb-2" />
            <span className="text-xs font-bold text-gray-800">Direct Results</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// CATEGORY-WISE CATALOG SHOWCASE (Exact 1 to 9 Display Order)
// ----------------------------------------------------------------------
function CategoryWiseCatalogSection({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL');

  // Map products grouped by category order
  const groupedProducts = useMemo(() => {
    const map = new Map<string, Product[]>();
    CATEGORY_ORDER.forEach(cat => map.set(cat, []));

    products.forEach(p => {
      // Find matching category
      const targetCategory = CATEGORY_ORDER.find(cat => cat.toLowerCase() === p.category.toLowerCase()) || p.category;
      if (!map.has(targetCategory)) {
        map.set(targetCategory, []);
      }
      map.get(targetCategory)?.push(p);
    });

    return map;
  }, [products]);

  const activeCategories = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return CATEGORY_ORDER;
    }
    return [selectedCategory];
  }, [selectedCategory]);

  return (
    <section id="catalog-showcase" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4B7B3B] bg-[#E0EBDC]/50 px-3 py-1 rounded-full">
            Complete Product Range
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-3 mb-3">
            Wellness Blends Category-Wise
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore our formulations organized by target wellness goals and family size.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex overflow-x-auto gap-2 py-4 mt-6 scrollbar-hide justify-start sm:justify-center">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === 'ALL'
                  ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#4B7B3B]'
              }`}
            >
              All 9 Categories
            </button>
            {CATEGORY_ORDER.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#4B7B3B]'
                }`}
              >
                {CATEGORY_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Display Sections in Exact Order 1 to 9 */}
        <div className="space-y-16 sm:space-y-24">
          {activeCategories.map((catName, catIdx) => {
            const catProducts = groupedProducts.get(catName) || [];
            const anchorId = `cat-${catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

            return (
              <div key={catIdx} id={anchorId} className="scroll-mt-24">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b-2 border-[#E0EBDC]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{CATEGORY_ICONS[catName] || '🌿'}</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2D5A27]">
                        {catName}
                      </h3>
                      <span className="text-xs text-gray-500 font-medium">
                        {catProducts.length} {catProducts.length === 1 ? 'Product' : 'Products'} Available
                      </span>
                    </div>
                  </div>
                  {catName.includes('Pack') && (
                    <span className="mt-2 sm:mt-0 text-xs font-bold text-[#D4AF37] bg-[#FAF6ED] border border-[#D4AF37]/30 px-3 py-1 rounded-full self-start">
                      ✨ Value Wellness Saver
                    </span>
                  )}
                </div>

                {/* Product Grid */}
                {catProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {catProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500">
                    No products currently listed in this category.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// DAILY RITUALS BANNER
// ----------------------------------------------------------------------
function DailyRitualsBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#2D5A27] to-[#1E3A1E] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3 block">
          Simple Daily Practice
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-6">
          The 2-Minute Nabhi Chikitsa Ritual
        </h2>
        <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed mb-8">
          Place 2-3 drops of warmed oil into your belly button before sleep. Massage gently in clockwise circles for 1 minute. Let natural botanical essence nourish your 72,000 Nadi channels while you sleep peacefully.
        </p>
        <Link
          href="/wellness-guide/how-to-use"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-[#2D5A27] uppercase tracking-wider bg-white hover:bg-[#FAF6ED] rounded-xl transition-all shadow-md"
        >
          Read Detailed Guide <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// CUSTOMER REVIEWS
// ----------------------------------------------------------------------
function CustomerReviewsSection() {
  const reviews = [
    {
      name: "Priya Sharma",
      role: "Verified Buyer",
      text: "The Kids Smart Oil Blend has become an essential part of my children's bedtime routine. Highly recommended!",
      rating: 5,
    },
    {
      name: "Rajesh Verma",
      role: "Verified Buyer",
      text: "Feet Massage Oil relieved my nighttime tiredness after standing all day at work. I sleep so deeply now.",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      role: "Verified Buyer",
      text: "The Gold Wellness Pack was such incredible value for our whole family. Authentic Ayurvedic quality.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6ED]/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4B7B3B]">Testimonials</span>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mt-1">Loved by Families Nationwide</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-[#E88B23] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-6">"{rev.text}"</p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-900 text-sm">{rev.name}</h4>
                <span className="text-xs text-[#4B7B3B] font-semibold">{rev.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// BRAND STORY
// ----------------------------------------------------------------------
function BrandStorySection() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2D5A27] mb-4">
          Ayurdhara Divya Shakti
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Dedicated to preserving authentic Indian Ayurvedic heritage. Our cold-pressed Nabhi oils, massage blends, and multi-generational wellness packs are formulated with absolute purity and traditional care.
        </p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// BUSINESS OPPORTUNITY TEASER
// ----------------------------------------------------------------------
function BusinessOpportunityTeaser() {
  return (
    <section className="py-20 bg-[#FAF6ED] border-y border-[#E0EBDC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E88B23] mb-3 block">
          Grow With Us
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2D5A27] mb-6">
          Build Your Wellness Business
        </h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium mb-12">
          Choose your preferred business model and grow with Ayurdhara Divya Shakti as a Customer, Wellness Partner, Retail Shop, or Distributor. Enjoy zero joining fees, transparent pricing, and referral commissions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-[#E88B23]/10 text-[#E88B23] rounded-full flex items-center justify-center mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2D5A27] mb-3">Wellness Partner</h3>
            <p className="text-gray-600 leading-relaxed">Free joining. No inventory required. Earn attractive referral commissions on successful deliveries.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-[#4B7B3B]/10 text-[#4B7B3B] rounded-full flex items-center justify-center mb-6">
              <Store size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2D5A27] mb-3">Retail Shop</h3>
            <p className="text-gray-600 leading-relaxed">Special retail margins for your physical store. Easy reordering with low minimum order values.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-[#2D5A27]/10 text-[#2D5A27] rounded-full flex items-center justify-center mb-6">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#2D5A27] mb-3">Distributor</h3>
            <p className="text-gray-600 leading-relaxed">Maximum margins for bulk buyers. Scale your business across regions with exclusive distributor pricing.</p>
          </div>
        </div>

        <Link
          href="/business-opportunity"
          className="inline-flex items-center justify-center px-8 py-4 text-sm sm:text-base font-bold text-white uppercase tracking-wider bg-[#E88B23] hover:bg-[#D9381E] rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Explore Opportunities <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

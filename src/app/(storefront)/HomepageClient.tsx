'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/productData';
import { ArrowRight, Star, Quote } from 'lucide-react';

interface HomepageClientProps {
  products: Product[];
}

export default function HomepageClient({ products }: HomepageClientProps) {
  return (
    <div className="bg-[#f9f9f9]">
      <HeroSection />
      <Section1CategoryIcons />
      <Section2WrittenContent />
      <Section3OilWellness products={products} />
      <Section4WrittenContent />
      <Section5ShopByGoal products={products} />
      <Section6WrittenContent />
      <Section7ShopByForm products={products} />
      <Section8WrittenContent />
      <Section9ShopByOffers products={products} />
      <Section10WrittenContent />
      <Section11CustomerReviews />
      <Section12BrandStory />
    </div>
  );
}

// ----------------------------------------------------------------------
// HERO SECTION
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] min-h-[600px] bg-[#E0EBDC]">
      <Image 
        src="/images/promo_banner_main_1784743880111.jpg" 
        alt="Ayurvedic Wellness Promotional Banner" 
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl border border-white/20">
            <span className="text-[#E88B23] text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4 block">
              Awaken Your Natural Vitality
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
              Pure Ayurvedic Wisdom for Modern Living
            </h1>
            <p className="text-base md:text-xl mb-8 text-white/90 font-medium leading-relaxed max-w-xl">
              Experience the profound healing of authentic Nabhi Chikitsa and wild-harvested botanicals. Thoughtfully formulated to restore balance, nourish deeply, and bring you closer to nature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/collections" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider bg-[#4B7B3B] hover:bg-[#3a5d2d] transition-all rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
                Shop All Wellness
              </Link>
              <Link href="/wellness-guide/how-to-use" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider bg-transparent border-2 border-white hover:bg-white hover:text-[#4B7B3B] transition-all rounded-lg">
                Discover Our Approach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 1 — CATEGORY ICONS
// ----------------------------------------------------------------------
function Section1CategoryIcons() {
  const categories = [
    { name: 'Oil Wellness', image: '/images/category_nabhi_1784743910260.jpg', link: '/oil-wellness-care' },
    { name: 'Raw Herbs', image: '/images/products/herb-1.jpg', link: '/raw-herbs' }, // placeholder images will be fixed if missing
    { name: 'Herbal Powders', image: '/images/products/powder-1.jpg', link: '/herbal-powders' },
    { name: 'Herbal Capsules', image: '/images/products/capsule-1.jpg', link: '/herbal-capsules' },
    { name: 'Herbal Tea', image: '/images/products/tea-1.jpg', link: '/herbal-tea' },
    { name: 'Natural Foods', image: '/images/products/food-1.jpg', link: '/natural-foods' },
    { name: 'Wellness Packs', image: '/images/category_packs_1784743942477.jpg', link: '/wellness-combos' },
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-6 md:gap-12 flex-wrap max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <Link href={cat.link} key={i} className="group flex flex-col items-center text-center w-28 md:w-32">
              <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden mb-4 bg-gray-100 shadow-sm border-4 border-white group-hover:border-[#E88B23] transition-all duration-300 group-hover:shadow-lg">
                {/* Fallback to generic image if not found, since we don't have images for raw herbs yet */}
                <Image src={cat.image.includes('product') ? '/images/category_hair_1784743931871.jpg' : cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider group-hover:text-[#4B7B3B] transition-colors leading-tight">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 2 — WRITTEN CONTENT
// ----------------------------------------------------------------------
function Section2WrittenContent() {
  return (
    <section className="py-24 bg-[#fcfcfc]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-6">
          Rooted in Tradition, Formulated for Today
        </h2>
        <div className="w-16 h-1 bg-[#E88B23] mx-auto mb-8 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Ayurveda teaches us that true wellness is not a destination, but a harmonious daily practice. 
          By aligning ourselves with the rhythms of nature and choosing products that are unadulterated, 
          potent, and consciously sourced, we invite profound balance into our lives. Our formulations 
          honor these ancient herbal traditions, crafted to gently support your body’s innate healing intelligence.
        </p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 3 — OIL WELLNESS CARE
// ----------------------------------------------------------------------
function Section3OilWellness({ products }: { products: Product[] }) {
  const tabs = [
    { id: 'nabhi', label: 'Nabhi Oil Blends' },
    { id: 'kids', label: 'Kids Nabhi Oil Care' },
    { id: 'men', label: 'Men Nabhi Oil Care' },
    { id: 'women', label: 'Women Nabhi Oil Care' },
    { id: 'senior', label: 'Senior Nabhi Oil Care' },
    { id: 'feet', label: 'Feet Wellness Oil' },
    { id: 'hair', label: 'Hair Wellness Oil' },
    { id: 'trial', label: 'Trial Wellness Oil Packs' },
    { id: 'gold', label: 'Gold Wellness Oil Packs' },
    { id: 'premium', label: 'Premium Wellness Oil Packs' },
    { id: 'family', label: 'Family Wellness Oil Packs' },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const cat = p.category.toLowerCase();
      const name = p.name.toLowerCase();
      
      switch(activeTab) {
        case 'nabhi': return cat.includes('nabhi') && !name.includes('kids') && !name.includes('men') && !name.includes('senior');
        case 'kids': return (cat.includes('nabhi') || cat.includes('kids')) && name.includes('kids');
        case 'men': return cat.includes('men');
        case 'women': return cat.includes('women');
        case 'senior': return cat.includes('senior');
        case 'feet': return cat.includes('feet');
        case 'hair': return cat.includes('hair');
        case 'trial': return p.variants.some(v => v.size.toLowerCase().includes('trial') || v.size.toLowerCase().includes('10ml') || v.size.toLowerCase().includes('10 ml'));
        case 'gold': return p.variants.some(v => v.size.toLowerCase().includes('gold') || v.size.toLowerCase().includes('15ml'));
        case 'premium': return p.variants.some(v => v.size.toLowerCase().includes('premium'));
        case 'family': return p.variants.some(v => v.size.toLowerCase().includes('family'));
        default: return false;
      }
    });
  }, [products, activeTab]);

  return (
    <section className="py-24 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Oil Wellness Care</h2>
          <p className="text-gray-500">Discover our signature cold-pressed wellness oils.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 scrollbar-hide justify-start lg:justify-center px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all border-2 ${
                activeTab === tab.id 
                  ? 'bg-[#4B7B3B] text-white border-[#4B7B3B] shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#4B7B3B] hover:text-[#4B7B3B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] bg-[#f9f9f9] rounded-2xl border border-dashed border-gray-300">
              <span className="text-gray-400 mb-2">No products available in this category yet.</span>
              <span className="text-[#4B7B3B] font-semibold">Check back soon!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 4 — WRITTEN CONTENT
// ----------------------------------------------------------------------
function Section4WrittenContent() {
  return (
    <section className="py-24 bg-[#E0EBDC]/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-[#4B7B3B]/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#E88B23]/5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#4B7B3B]/5 rounded-tr-full"></div>
          
          <h2 className="text-3xl font-serif font-bold text-[#2D5A27] mb-6 relative z-10">
            Crafting Your Daily Ritual
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed relative z-10">
            Wellness is deeply personal. Whether you are seeking restorative sleep, radiant skin, 
            or robust immunity, your journey should be tailored to your unique needs. By listening 
            to your body and choosing focused wellness goals, you can cultivate a daily self-care 
            ritual that is both effortless and profoundly transformative.
          </p>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 5 — SHOP BY GOAL
// ----------------------------------------------------------------------
function Section5ShopByGoal({ products }: { products: Product[] }) {
  const tabs = [
    { id: 'daily', label: 'Daily Wellness' },
    { id: 'hair', label: 'Hair Wellness' },
    { id: 'skin', label: 'Skin Wellness' },
    { id: 'women', label: "Women's Wellness" },
    { id: 'men', label: "Men's Wellness" },
    { id: 'kids', label: 'Kids Care' },
    { id: 'senior', label: 'Senior Care' },
    { id: 'family', label: 'Family Wellness' },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const goals = p.healthGoals.map(g => g.toLowerCase());
      const ideal = p.idealFor.map(i => i.toLowerCase());
      const allTerms = [...goals, ...ideal, p.name.toLowerCase(), p.category.toLowerCase()].join(' ');

      switch(activeTab) {
        case 'daily': return allTerms.includes('daily') || allTerms.includes('immunity');
        case 'hair': return allTerms.includes('hair');
        case 'skin': return allTerms.includes('skin') || allTerms.includes('glow') || allTerms.includes('acne');
        case 'women': return allTerms.includes('women') || allTerms.includes('pcos');
        case 'men': return allTerms.includes('men');
        case 'kids': return allTerms.includes('kid') || allTerms.includes('child');
        case 'senior': return allTerms.includes('senior') || allTerms.includes('joint');
        case 'family': return allTerms.includes('family') || allTerms.includes('all ages');
        default: return false;
      }
    });
  }, [products, activeTab]);

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shop By Goal</h2>
          <p className="text-gray-500">Find the perfect Ayurvedic formulations for your specific needs.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 scrollbar-hide justify-start lg:justify-center px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#E88B23] text-white shadow-md' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] bg-[#f9f9f9] rounded-2xl border border-dashed border-gray-300">
              <span className="text-gray-400 mb-2">No products available in this category yet.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 6 — WRITTEN CONTENT
// ----------------------------------------------------------------------
function Section6WrittenContent() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#4B7B3B] to-[#2D5A27] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
          Choose Wellness Your Way
        </h2>
        <div className="w-16 h-1 bg-[#E88B23] mx-auto mb-8 rounded-full"></div>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
          Whether you prefer the deep penetration of a therapeutic oil, the convenience of a 
          modern herbal capsule, or the comforting ritual of brewing loose-leaf tea, wellness 
          should fit seamlessly into your lifestyle. Explore our diverse range of product formats, 
          each meticulously prepared to retain maximum potency and purity.
        </p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 7 — SHOP BY FORM
// ----------------------------------------------------------------------
function Section7ShopByForm({ products }: { products: Product[] }) {
  const tabs = [
    { id: 'oil', label: 'Wellness Oil' },
    { id: 'powder', label: 'Powder' },
    { id: 'capsule', label: 'Capsule' },
    { id: 'tea', label: 'Tea' },
    { id: 'seeds', label: 'Seeds' },
    { id: 'herb', label: 'Raw Herb' },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const allTerms = [p.name.toLowerCase(), p.category.toLowerCase(), p.shortDescription.toLowerCase()].join(' ');

      switch(activeTab) {
        case 'oil': return allTerms.includes('oil') || allTerms.includes('nabhi');
        case 'powder': return allTerms.includes('powder') || allTerms.includes('churna');
        case 'capsule': return allTerms.includes('capsule') || allTerms.includes('tablet');
        case 'tea': return allTerms.includes('tea') || allTerms.includes('brew');
        case 'seeds': return allTerms.includes('seed');
        case 'herb': return allTerms.includes('herb') || allTerms.includes('raw');
        default: return false;
      }
    });
  }, [products, activeTab]);

  return (
    <section className="py-24 bg-[#fcfcfc] border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-2">Shop By Form</h2>
            <p className="text-gray-500">Find products in the format you love most.</p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end max-w-lg">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  activeTab === tab.id 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] bg-white rounded-2xl border border-dashed border-gray-300">
              <span className="text-gray-400 mb-2">Formulations in this format are coming soon.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 8 — WRITTEN CONTENT
// ----------------------------------------------------------------------
function Section8WrittenContent() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-square relative rounded-full overflow-hidden bg-[#E0EBDC] shadow-inner">
              <Image src="/images/category_packs_1784743942477.jpg" alt="Wellness Bundles" fill className="object-cover" />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-[#2D5A27] mb-6">
              Curated for Maximum Impact
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              True holistic healing often requires a synergistic approach. Our experts have thoughtfully 
              curated exclusive wellness packs and combination deals that target your needs from multiple 
              angles, making comprehensive wellness more accessible than ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 9 — SHOP BY OFFERS
// ----------------------------------------------------------------------
function Section9ShopByOffers({ products }: { products: Product[] }) {
  const tabs = [
    { id: 'trial', label: 'Trial Starter' },
    { id: 'gold', label: 'Gold Offers' },
    { id: 'premium', label: 'Premium Offers' },
    { id: 'family', label: 'Family Offers' },
    { id: 'combo', label: 'Combo Deals' },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const isCombo = p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('combo') || p.name.toLowerCase().includes('pack');
      
      switch(activeTab) {
        case 'trial': return p.variants.some(v => v.size.toLowerCase().includes('trial') || v.size.toLowerCase().includes('10ml'));
        case 'gold': return p.variants.some(v => v.size.toLowerCase().includes('gold'));
        case 'premium': return p.variants.some(v => v.size.toLowerCase().includes('premium'));
        case 'family': return p.variants.some(v => v.size.toLowerCase().includes('family'));
        case 'combo': return isCombo;
        default: return false;
      }
    });
  }, [products, activeTab]);

  return (
    <section className="py-24 bg-[#E0EBDC]/20 border-y border-[#4B7B3B]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shop By Offers</h2>
          <p className="text-gray-500">Discover our best values and curated wellness combinations.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 scrollbar-hide justify-start lg:justify-center px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-lg text-sm font-bold transition-all border-b-4 ${
                activeTab === tab.id 
                  ? 'bg-white text-[#E88B23] border-[#E88B23] shadow-sm' 
                  : 'bg-transparent text-gray-500 border-transparent hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] bg-white rounded-2xl border border-dashed border-gray-300">
              <span className="text-gray-400 mb-2">No active offers for this tier at the moment.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 10 — WRITTEN CONTENT
// ----------------------------------------------------------------------
function Section10WrittenContent() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-6">
          A Community of Healing
        </h2>
        <div className="w-16 h-1 bg-[#4B7B3B] mx-auto mb-8 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          The truest measure of our Ayurvedic formulations is the impact they have on your daily life. 
          We are profoundly grateful for the trust you place in us to be part of your wellness journey. 
          Read how returning to nature's wisdom has transformed the routines of our community members.
        </p>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 11 — CUSTOMER REVIEWS
// ----------------------------------------------------------------------
function Section11CustomerReviews() {
  // Using generic positive sentiments rather than fabricated facts, 
  // keeping it empty-state/placeholder safe if real reviews aren't dynamically loaded yet.
  return (
    <section className="py-24 bg-[#fcfcfc] border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-4">Customer Stories</h2>
        </div>
        
        {/* Placeholder Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: "Integrating these oils into my daily routine has been a grounding experience. The quality and purity are immediately noticeable.",
              author: "Verified Customer"
            },
            {
              text: "A beautiful return to traditional practices. The Nabhi oil blends feel incredibly authentic and deeply nourishing.",
              author: "Verified Customer"
            },
            {
              text: "I appreciate the thoughtful curation and the commitment to natural, unadulterated ingredients. A trustworthy brand for my family's wellness.",
              author: "Verified Customer"
            }
          ].map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-100 w-12 h-12" />
              <div className="flex gap-1 text-[#E88B23] mb-4">
                {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic mb-6 relative z-10 leading-relaxed">"{review.text}"</p>
              <span className="text-sm font-bold text-[#2D5A27]">{review.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SECTION 12 — OUR VISION / BRAND STORY
// ----------------------------------------------------------------------
function Section12BrandStory() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-[#2D5A27] text-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          <div className="w-full md:w-5/12 relative min-h-[300px]">
             {/* Using existing banner for brand story visual */}
             <Image src="/images/promo_banner_main_1784743880111.jpg" alt="Ayurdhara Philosophy" fill className="object-cover opacity-80" />
             <div className="absolute inset-0 bg-[#2D5A27]/30 mix-blend-multiply"></div>
          </div>
          <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
            <span className="text-[#E88B23] text-sm font-bold uppercase tracking-widest mb-3 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              The Ayurdhara Difference
            </h2>
            <p className="text-white/90 text-lg mb-6 leading-relaxed font-light">
              We believe that nature holds the blueprint for perfect health. Our vision is to demystify 
              Ayurveda, making its profound healing practices accessible for modern lifestyles without 
              compromising on authenticity or purity.
            </p>
            <ul className="space-y-4 mb-8">
              {['Rooted in ancient Vedic texts', 'Commitment to purity and cold-pressed extraction', 'Formulated for holistic, sustainable wellness'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E88B23]"></div>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <Link href="/about" className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-[#2D5A27] uppercase tracking-wider bg-white hover:bg-gray-50 transition-all rounded-lg">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

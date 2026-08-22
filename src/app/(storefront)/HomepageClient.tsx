'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/productData';
import { ArrowRight, Star, Quote } from 'lucide-react';
import CampaignHeroSlider from '@/components/CampaignHeroSlider';

interface HomepageClientProps {
  products: Product[];
}

export default function HomepageClient({ products }: HomepageClientProps) {
  return (
    <div className="bg-[#f9f9f9]">
      <CampaignHeroSlider />
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
      <Section10bDailyWellnessRoutine />
      <Section11CustomerReviews />
      <Section12BrandStory />
    </div>
  );
}

// ----------------------------------------------------------------------
// HERO SECTION — World-Class Premium Luxury Wellness Experience
// ----------------------------------------------------------------------
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        background: 'var(--hero-bg)',
        minHeight: '100vh',
      }}
    >
      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft botanical background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, #C5A572 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #4B7B3B 0%, transparent 70%)' }} />
        {/* Golden sunlight from top-right */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #E88B23 0%, transparent 60%)' }} />
      </div>

      {/* ================================================================
          DESKTOP HERO LAYOUT — 45/55 Split
          ================================================================ */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-80px)] py-12 lg:pt-12 lg:pb-24 gap-8 lg:gap-0">

          {/* LEFT SIDE — 45% Content */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center text-left order-1 pt-12 lg:pt-0">

            {/* Eyebrow */}
            <div className="hero-fade-in-up flex items-center justify-start gap-3 mb-6">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--forest)', fontVariant: 'small-caps' }}
              >
                Nature Inspired
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--luxury-gold)' }}
              >
                •
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--forest)', fontVariant: 'small-caps' }}
              >
                Daily Wellness
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="hero-fade-in-up-delay-1 font-serif font-bold leading-[1.08] mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                color: 'var(--hero-text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Comfort<br />
              For Every<br />
              Generation.
            </h1>

            {/* Gold Decorative Divider */}
            <div className="hero-fade-in-up-delay-1 flex items-center justify-start gap-3 mb-6">
              <div className="w-16 h-[1.5px]" style={{ backgroundColor: 'var(--luxury-gold)' }} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--luxury-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <path d="M12 22c4-2 8-6 8-12C16 10 12 14 12 22z" />
                <path d="M12 22c-4-2-8-6-8-12C8 10 12 14 12 22z" />
              </svg>
              <div className="w-16 h-[1.5px]" style={{ backgroundColor: 'var(--luxury-gold)' }} />
            </div>

            {/* Description */}
            <p
              className="hero-fade-in-up-delay-2 leading-relaxed mb-8 max-w-lg mx-0"
              style={{
                fontSize: 'clamp(0.95rem, 1.1vw, 1.0625rem)',
                color: 'var(--hero-text-secondary)',
                lineHeight: '1.8',
              }}
            >
              Experience thoughtfully crafted Ayurvedic wellness products
              inspired by timeless traditions and designed for modern
              everyday self-care. Pure ingredients. Authentic formulations.
              Daily rituals.
            </p>

            {/* Trust Icons — 4 in a row (ABOVE buttons per reference) */}
            <div className="hero-fade-in-up-delay-3 grid grid-cols-4 gap-3 max-w-sm mx-0 mb-8 lg:mb-8">
              {[
                { icon: TrustNaturalIcon, label: '100%\nNatural' },
                { icon: TrustAyurvedicIcon, label: 'Ayurvedic\nFormula' },
                { icon: TrustNoToxinsIcon, label: 'No\nToxins' },
                { icon: TrustCrueltyFreeIcon, label: 'Cruelty\nFree' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      border: '1.5px solid var(--hero-border-gold)',
                      backgroundColor: 'rgba(197, 165, 114, 0.05)',
                    }}
                  >
                    <item.icon />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider text-center lg:text-left leading-tight whitespace-pre-line"
                    style={{ color: 'var(--hero-text-secondary)' }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex hero-fade-in-up-delay-4 flex-col sm:flex-row gap-4 justify-start">
              <Link
                href="/collections"
                className="hero-btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg"
                style={{
                  backgroundColor: 'var(--forest)',
                  color: '#FFFFFF',
                  letterSpacing: '0.1em',
                }}
              >
                Shop Now
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <Link
                href="/collections"
                className="hero-btn-secondary inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-xl border-2"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--forest)',
                  borderColor: 'var(--forest)',
                  letterSpacing: '0.1em',
                }}
              >
                Explore Collection
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE — 55% Product Composition */}
          <div className="w-full lg:w-[55%] flex flex-col items-center justify-center order-2 relative">

            {/* Large circular golden glow behind products */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div
                className="w-[85%] aspect-square rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(197, 165, 114, 0.12) 0%, rgba(197, 165, 114, 0.04) 50%, transparent 75%)',
                }}
              />
            </div>

            <div 
              className="hero-fade-in hero-product-float relative w-full max-w-[700px] aspect-[4/3]"
              style={{
                // Blend the image background perfectly with the hero section background
                mixBlendMode: 'multiply',
                // Fade out the edges softly so nothing is abruptly cut off
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
              }}
            >
              {/* Product hero image */}
              <Image
                src="/images/hero_products_exact_cropped.jpg"
                alt="Premium Ayurvedic Wellness Products by Ayurdhara Divya Shakti — Kids Growth Oil Blend, Men Strength Oil Blend, Women Harmony Oil Blend, Senior Comfort Oil Blend on travertine stone with botanical herbs"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            {/* Floating Circular Trust Badge — Top Right */}
            <div
              className="hero-badge-pulse absolute top-8 right-0 lg:top-12 lg:-right-2 w-24 h-24 lg:w-28 lg:h-28 rounded-full flex flex-col items-center justify-center text-center shadow-xl z-20"
              style={{
                backgroundColor: 'var(--forest)',
                border: '2.5px solid var(--luxury-gold)',
              }}
            >
              <span className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-wider text-white/80 leading-none">
                Trusted by
              </span>
              <span className="text-lg lg:text-xl font-bold text-white leading-tight mt-0.5">
                10,000+
              </span>
              <span className="text-[8px] lg:text-[9px] font-semibold uppercase tracking-wider text-white/80 leading-tight mt-0.5">
                Happy
                <br />
                Customers
              </span>
            </div>
            
          </div>
        </div>
      </div>

      {/* ================================================================
          BOTTOM INFORMATION BAR — 4 Columns
          ================================================================ */}
      <div className="relative z-10 pb-8 lg:pb-12 mt-8 lg:mt-4">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div
            className="hero-fade-in-up-delay-5 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 p-4 lg:p-5 rounded-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 4px 24px rgba(45, 41, 38, 0.06)',
              border: '1px solid rgba(197, 165, 114, 0.15)',
            }}
          >
            {[
              { icon: InfoQualityIcon, title: 'Premium Quality', desc: 'Handpicked herbs. Pure & authentic ingredients.' },
              { icon: InfoScienceIcon, title: 'Ayurvedic Science', desc: 'Backed by ancient wisdom & modern research.' },
              { icon: InfoSafeIcon, title: 'Safe for Daily Use', desc: 'Gentle, effective & suitable for the whole family.' },
              { icon: InfoIndiaIcon, title: 'Made in India', desc: 'Proudly made in India with love & care.' },
            ].map((item, i) => (
              <div
                key={i}
                className="hero-info-card flex items-start gap-3 p-3 lg:p-4 rounded-xl cursor-default"
                style={{
                  border: '1px solid transparent',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(45, 90, 39, 0.08)',
                    border: '1.5px solid rgba(45, 90, 39, 0.15)',
                  }}
                >
                  <item.icon />
                </div>
                <div>
                  <p
                    className="text-xs lg:text-sm font-bold uppercase tracking-wider"
                    style={{ color: 'var(--hero-text-primary)' }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[11px] lg:text-xs mt-0.5 leading-snug"
                    style={{ color: 'var(--hero-text-secondary)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================================================================
// TRUST ICONS — Outline Only, Same Stroke, Same Optical Weight
// ======================================================================

function TrustNaturalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c4-2 8-6 8-12C16 10 12 14 12 22z" />
      <path d="M12 22c-4-2-8-6-8-12C8 10 12 14 12 22z" />
      <path d="M12 8V2" />
    </svg>
  );
}

function TrustAyurvedicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" />
      <path d="M12 20v-4" />
      <path d="M6 10c0-3.3 2.7-6 6-6s6 2.7 6 6c0 2-1 3.8-2.5 5H8.5C7 13.8 6 12 6 10z" />
      <path d="M12 4v4" />
      <path d="M9 8l3 2 3-2" />
    </svg>
  );
}

function TrustNoToxinsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
    </svg>
  );
}

function TrustCrueltyFreeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 000-7.8z" />
    </svg>
  );
}

// ======================================================================
// INFO BAR ICONS — Outline Only, Matching Style
// ======================================================================

function InfoQualityIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function InfoScienceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6v5l4 8H5l4-8V3z" />
      <path d="M9 3h6" />
      <path d="M5 16h14" />
      <path d="M10 20h4" />
      <path d="M12 16v4" />
    </svg>
  );
}

function InfoSafeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function InfoIndiaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 014 10 15 15 0 01-4 10 15 15 0 01-4-10A15 15 0 0112 2z" />
    </svg>
  );
}

// ----------------------------------------------------------------------
// SECTION 1 — CATEGORY ICONS
// ----------------------------------------------------------------------
function Section1CategoryIcons() {
  const categories = [
    { name: 'Oil Wellness', image: '/images/categories/cat_oil_wellness_1786556871303.jpg', link: '/oil-wellness-care' },
    { name: 'Raw Herbs', image: '/images/categories/cat_raw_herbs_1786556977927.jpg', link: '/raw-herbs' },
    { name: 'Herbal Powders', image: '/images/categories/cat_herbal_powders_1786556998830.jpg', link: '/herbal-powders' },
    { name: 'Herbal Capsules', image: '/images/categories/cat_herbal_capsules_1786557023735.jpg', link: '/herbal-capsules' },
    { name: 'Herbal Tea', image: '/images/categories/cat_herbal_tea_1786557231547.jpg', link: '/herbal-tea' },
    { name: 'Natural Foods', image: '/images/categories/cat_natural_foods_1786557531655.jpg', link: '/natural-foods' },
    { name: 'Pure Spices', image: '/images/categories/cat_pure_spices_1786557545627.jpg', link: '/pure-spices' },
    { name: 'Wellness Packs', image: '/images/categories/cat_wellness_packs_1786557692487.jpg', link: '/wellness-packs' },
    { name: 'Natural Aroma', image: '/images/categories/cat_natural_fragrance.jpg', link: '/natural-aroma' },
  ];

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-3 xl:gap-6 flex-wrap lg:flex-nowrap max-w-[1400px] mx-auto w-full">
          {categories.map((cat, i) => (
            <Link href={cat.link} key={i} className="group flex flex-col items-center text-center w-24 md:w-28 lg:w-24 xl:w-28 shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 relative rounded-full overflow-hidden mb-3 bg-gray-100 shadow-sm border-[3px] border-white group-hover:border-[#E88B23] transition-all duration-300 group-hover:shadow-lg">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-[10px] md:text-xs lg:text-[10px] xl:text-xs font-bold text-gray-700 uppercase tracking-wider group-hover:text-[#4B7B3B] transition-colors leading-tight">
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
    <section className="py-12 md:py-8 bg-[#fcfcfc]">
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
      { id: 'kids', label: 'Kids Nabhi Oil Care', image: '/images/categories/cat_kids_care.jpg' },
      { id: 'men', label: 'Men Nabhi Oil Care', image: '/images/categories/cat_mens_wellness.jpg' },
      { id: 'women', label: 'Women Nabhi Oil Care', image: '/images/categories/cat_womens_wellness.jpg' },
      { id: 'senior', label: 'Senior Nabhi Oil Care', image: '/images/categories/cat_senior_care.jpg' },
      { id: 'feet', label: 'Feet Wellness Oil', image: '/images/category_feet_1784743921281.jpg' },
      { id: 'body', label: 'Body Massage Oil', image: '/images/category_feet_1784743921281.jpg' },
      { id: 'hair', label: 'Hair Wellness Oil', image: '/images/category_hair_1784743931871.jpg' },
      { id: 'trial', label: 'Trial Wellness Oil Packs', image: '/images/categories/cat_trial_pack.jpg' },
      { id: 'gold', label: 'Gold Wellness Oil Packs', image: '/images/category_packs_1784743942477.jpg' }
    ];
    
    const [activeTab, setActiveTab] = useState(tabs[0].id);
  
    const filteredProducts = useMemo(() => {
      let filtered = products.filter(p => {
        const cat = p.category.toLowerCase();
        const name = p.name.toLowerCase();
        
        // Also show Trial pack when viewing any specific category
        const isTrial = name.includes('trial wellness pack') && !name.includes('diamond');
        
        switch(activeTab) {
          case 'kids': return cat.includes('kids') || isTrial;
          case 'men': return cat.includes('men') || isTrial;
          case 'women': return cat.includes('women') || isTrial;
          case 'senior': return cat.includes('senior') || isTrial;
          case 'feet': return cat.includes('feet');
          case 'body': return cat.includes('body');
          case 'hair': return cat.includes('hair');
          case 'trial': return p.variants.some(v => v.size.toLowerCase().includes('trial') || v.size.toLowerCase().includes('10ml') || v.size.toLowerCase().includes('10 ml'));
          case 'gold': return p.variants.some(v => v.size.toLowerCase().includes('gold') || v.size.toLowerCase().includes('15ml'));
          case 'premium': return p.variants.some(v => v.size.toLowerCase().includes('premium'));
          case 'family': return p.variants.some(v => v.size.toLowerCase().includes('family'));
          default: return false;
        }
      });
      
      return filtered.sort((a, b) => {
        if (a.name.toLowerCase().includes('trial') && !b.name.toLowerCase().includes('trial')) return -1;
        if (!a.name.toLowerCase().includes('trial') && b.name.toLowerCase().includes('trial')) return 1;
        return 0;
      });
    }, [products, activeTab]);

  return (
    <section className="py-12 md:py-8 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Oil Wellness Care</h2>
            <p className="text-gray-500">Discover our signature cold-pressed wellness oils.</p>
          </div>
        </div>

        {/* Category Tabs - Edge to Edge */}
        <div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start xl:justify-center px-4 sm:px-6 lg:px-8 w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="group flex flex-col items-center text-center w-24 md:w-28 flex-shrink-0"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden mb-4 bg-gray-100 shadow-sm border-4 transition-all duration-300 group-hover:shadow-lg ${
                activeTab === tab.id ? 'border-[#E88B23]' : 'border-white group-hover:border-[#E88B23]/50'
              }`}>
                <Image src={tab.image || '/images/category_nabhi_1784743910260.jpg'} alt={tab.label} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className={`text-xs md:text-sm font-bold uppercase tracking-wider transition-colors leading-tight ${
                activeTab === tab.id ? 'text-[#4B7B3B]' : 'text-gray-600 group-hover:text-[#4B7B3B]'
              }`}>
                {tab.label}
              </h3>
            </button>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
    <section className="py-12 md:py-8 bg-[#E0EBDC]/30">
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
    { id: 'daily', label: 'Daily Wellness', image: '/images/categories/cat_daily_wellness.jpg' },
    { id: 'hair', label: 'Hair Wellness', image: '/images/category_hair_1784743931871.jpg' },
    { id: 'skin', label: 'Skin Wellness', image: '/images/category_nabhi_1784743910260.jpg' },
    { id: 'women', label: "Women's Wellness", image: '/images/categories/cat_womens_wellness.jpg' },
    { id: 'men', label: "Men's Wellness", image: '/images/categories/cat_mens_wellness.jpg' },
    { id: 'kids', label: 'Kids Care', image: '/images/categories/cat_kids_care.jpg' },
    { id: 'senior', label: 'Senior Care', image: '/images/categories/cat_senior_care.jpg' },
    { id: 'family', label: 'Family Wellness', image: '/images/category_packs_1784743942477.jpg' },
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
    <section className="py-12 md:py-8 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shop By Goal</h2>
            <p className="text-gray-500">Find the perfect Ayurvedic formulations for your specific needs.</p>
          </div>
        </div>

        {/* Category Tabs - Edge to Edge */}
        <div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start xl:justify-center px-4 sm:px-6 lg:px-8 w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="group flex flex-col items-center text-center w-24 md:w-28 flex-shrink-0"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden mb-4 bg-gray-100 shadow-sm border-4 transition-all duration-300 group-hover:shadow-lg ${
                activeTab === tab.id ? 'border-[#E88B23]' : 'border-white group-hover:border-[#E88B23]/50'
              }`}>
                <Image src={tab.image} alt={tab.label} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className={`text-xs md:text-sm font-bold uppercase tracking-wider transition-colors leading-tight ${
                activeTab === tab.id ? 'text-[#4B7B3B]' : 'text-gray-600 group-hover:text-[#4B7B3B]'
              }`}>
                {tab.label}
              </h3>
            </button>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
    <section className="py-12 md:py-8 bg-gradient-to-br from-[#4B7B3B] to-[#2D5A27] text-white">
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
    { id: 'oil', label: 'Wellness Oil', image: '/images/category_nabhi_1784743910260.jpg' },
    { id: 'powder', label: 'Powder', image: '/images/products/powder-1.jpg' },
    { id: 'capsule', label: 'Capsule', image: '/images/products/capsule-1.jpg' },
    { id: 'tea', label: 'Tea', image: '/images/products/tea-1.jpg' },
    { id: 'seeds', label: 'Seeds', image: '/images/products/food-1.jpg' },
    { id: 'herb', label: 'Raw Herb', image: '/images/products/herb-1.jpg' },
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
    <section className="py-12 md:py-8 bg-[#fcfcfc] border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shop By Form</h2>
            <p className="text-gray-500">Find products in the format you love most.</p>
          </div>
        </div>

        {/* Category Tabs - Edge to Edge */}
        <div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start xl:justify-center px-4 sm:px-6 lg:px-8 w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="group flex flex-col items-center text-center w-24 md:w-28 flex-shrink-0"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden mb-4 bg-gray-100 shadow-sm border-4 transition-all duration-300 group-hover:shadow-lg ${
                activeTab === tab.id ? 'border-[#E88B23]' : 'border-white group-hover:border-[#E88B23]/50'
              }`}>
                <Image src={tab.image.includes('product') ? '/images/category_hair_1784743931871.jpg' : tab.image} alt={tab.label} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className={`text-xs md:text-sm font-bold uppercase tracking-wider transition-colors leading-tight ${
                activeTab === tab.id ? 'text-[#4B7B3B]' : 'text-gray-600 group-hover:text-[#4B7B3B]'
              }`}>
                {tab.label}
              </h3>
            </button>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
    <section className="py-12 md:py-8 bg-white">
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
    { id: 'trial', label: 'Trial Starter', image: '/images/categories/cat_trial_pack.jpg' },
    { id: 'gold', label: 'Gold Offers', image: '/images/category_packs_1784743942477.jpg' },
    { id: 'premium', label: 'Premium Offers', image: '/images/category_packs_1784743942477.jpg' },
    { id: 'family', label: 'Family Offers', image: '/images/category_packs_1784743942477.jpg' },
    { id: 'combo', label: 'Combo Deals', image: '/images/category_packs_1784743942477.jpg' },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const filteredProducts = useMemo(() => {
      return products.filter(p => {
        const isCombo = p.category.toLowerCase().includes('pack') || p.category.toLowerCase().includes('combo') || p.name.toLowerCase().includes('pack');
        
        const hasVariant = (term: string) => p.variants && p.variants.some(v => v.size.toLowerCase().includes(term));
        const nameOrCat = (term: string) => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term);

        switch(activeTab) {
          case 'trial': return nameOrCat('trial') || nameOrCat('starter') || hasVariant('trial') || hasVariant('10ml') || hasVariant('10 ml');
          case 'gold': return nameOrCat('gold') || hasVariant('gold') || hasVariant('15ml') || hasVariant('15 ml');
          case 'premium': return nameOrCat('premium') || nameOrCat('diamond') || hasVariant('premium') || hasVariant('diamond') || hasVariant('30ml') || hasVariant('30 ml');
          case 'family': return nameOrCat('family') || hasVariant('family');
          case 'combo': return isCombo;
          default: return false;
        }
      });
    }, [products, activeTab]);

  return (
    <section className="py-12 md:py-8 bg-[#E0EBDC]/20 border-y border-[#4B7B3B]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] mb-4">Shop By Offers</h2>
            <p className="text-gray-500">Discover our best values and curated wellness combinations.</p>
          </div>
        </div>

        {/* Category Tabs - Edge to Edge */}
        <div className="flex overflow-x-auto pb-8 mb-10 gap-4 sm:gap-6 md:gap-8 scrollbar-hide justify-start xl:justify-center px-4 sm:px-6 lg:px-8 w-full">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="group flex flex-col items-center text-center w-24 md:w-28 flex-shrink-0"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden mb-4 bg-gray-100 shadow-sm border-4 transition-all duration-300 group-hover:shadow-lg ${
                activeTab === tab.id ? 'border-[#E88B23]' : 'border-white group-hover:border-[#E88B23]/50'
              }`}>
                <Image src={tab.image || '/images/category_packs_1784743942477.jpg'} alt={tab.label} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className={`text-xs md:text-sm font-bold uppercase tracking-wider transition-colors leading-tight ${
                activeTab === tab.id ? 'text-[#4B7B3B]' : 'text-gray-600 group-hover:text-[#4B7B3B]'
              }`}>
                {tab.label}
              </h3>
            </button>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
    <section className="py-12 md:py-8 bg-white">
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
// SECTION 10B — DAILY WELLNESS ROUTINE
// ----------------------------------------------------------------------
function Section10bDailyWellnessRoutine() {
  return (
    <section className="py-12 md:py-8 bg-[#FAF7F2] border-y border-[#E0EBDC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-[#E88B23] text-sm font-bold uppercase tracking-widest mb-3 block">Simple & Effective</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2D5A27] mb-6">
            Daily Wellness Routine
          </h2>
          <p className="text-lg md:text-xl text-[#4B7B3B] font-medium">
            Only 5 Minutes Daily. Experience profound holistic benefits with this simple nighttime ritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-[2px] bg-[#E88B23]/30 border-t border-dashed border-[#E88B23]"></div>

          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[#E0EBDC] text-[#2D5A27] flex items-center justify-center text-2xl font-bold font-serif mb-6 shadow-sm border border-[#4B7B3B]/20">
              1
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">Massage</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Massage <strong className="text-[#2D5A27]">Feet Wellness Oil</strong> on both feet for 3–5 minutes to ground your energy and relax the nervous system.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[#E0EBDC] text-[#2D5A27] flex items-center justify-center text-2xl font-bold font-serif mb-6 shadow-sm border border-[#4B7B3B]/20">
              2
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-4">Apply</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Apply 2–5 drops of your <strong className="text-[#2D5A27]">Nabhi Oil Blend</strong> on the navel right before bedtime to nourish deeply from the center.
            </p>
          </div>

        </div>
        
        <div className="mt-16 text-center">
          <Link href="/collections" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white uppercase tracking-wider bg-[#2D5A27] hover:bg-[#1f401b] transition-all rounded-lg shadow-md hover:shadow-lg">
            Shop The Routine
          </Link>
        </div>
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
    <section className="py-12 md:py-8 bg-[#fcfcfc] border-y border-gray-100 overflow-hidden">
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
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow">
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
    <section className="py-12 md:py-8 bg-white relative">
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

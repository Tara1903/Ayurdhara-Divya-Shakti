'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideData {
  id: string;
  headline: string;
  productsText: string;
  floatingCard: {
    title: string;
    items: string[];
  };
  trustBadge: string;
  accentColor: string;
  imagePath: string; // Transparent PNG of bottles
}

const slides: SlideData[] = [
  {
    id: 'brand',
    headline: 'Ancient Wisdom.\nEveryday Wellness.',
    productsText: 'Kids Growth Oil Blend • Men Strength Oil Blend • Women Harmony Oil Blend • Senior Comfort Oil Blend',
    floatingCard: {
      title: 'WHY AYURDHARA?',
      items: ['Premium Herbal Blends', '100% Natural', 'Daily Wellness', 'Trusted Quality']
    },
    trustBadge: 'Trusted by\n10,000+\nHappy Customers',
    accentColor: '#C5A572', // Gold
    imagePath: '/images/hero_products_exact_cropped.jpg', // Placeholder
  },
  {
    id: 'kids',
    headline: 'Gentle Care\nFor Growing Smiles.',
    productsText: 'Kids Smart Oil Blend • Kids Growth Oil Blend • Kids Calm Oil Blend • Kids Daily Care Oil Blend',
    floatingCard: {
      title: 'Made for Kids',
      items: ['Nature Inspired', 'Gentle Daily Wellness', 'Premium Ingredients']
    },
    trustBadge: 'Nature\nInspired',
    accentColor: '#2D5A27', // Forest Green
    imagePath: '/images/hero_products_exact_cropped.jpg',
  },
  {
    id: 'men',
    headline: 'Strength\nRooted In Nature.',
    productsText: 'Men Strength Oil Blend • Men Active Oil Blend • Men Heart Balance Oil Blend • Men Daily Wellness Oil Blend',
    floatingCard: {
      title: "Premium Men's Wellness",
      items: ['Daily Herbal Care', 'Nature Inspired', 'Trusted Formulation']
    },
    trustBadge: 'Premium\nQuality',
    accentColor: '#1A365D', // Luxury Navy
    imagePath: '/images/hero_products_exact_cropped.jpg',
  },
  {
    id: 'women',
    headline: 'Harmony\nIn Every Drop.',
    productsText: 'Women Harmony Oil Blend • Women Care Oil Blend • Women Glow Oil Blend • Women Daily Wellness Oil Blend',
    floatingCard: {
      title: "Women's Wellness",
      items: ['Nature Inspired', 'Daily Care', 'Premium Herbal Blend']
    },
    trustBadge: 'Authentic\nAyurveda',
    accentColor: '#6B2139', // Deep Burgundy
    imagePath: '/images/hero_products_exact_cropped.jpg',
  },
  {
    id: 'senior',
    headline: 'Comfort\nFor Every Generation.',
    productsText: 'Senior Comfort Oil Blend • Senior Active Oil Blend • Senior Balance Oil Blend • Senior Daily Wellness Oil Blend',
    floatingCard: {
      title: 'Gentle Wellness',
      items: ['Premium Care', 'Nature Inspired', 'Trusted Formula']
    },
    trustBadge: 'Time Tested\nWisdom',
    accentColor: '#8C5A2A', // Bronze Brown
    imagePath: '/images/hero_products_exact_cropped.jpg',
  },
  {
    id: 'complete',
    headline: 'Daily Wellness\nFor Every Home.',
    productsText: 'Hair Wellness Oil • Feet Wellness Oil • Wellness Packs',
    floatingCard: {
      title: 'Complete Self Care',
      items: ['Hair Wellness', 'Feet Wellness', 'Family Wellness']
    },
    trustBadge: 'Made in\nIndia',
    accentColor: '#045D56', // Elegant Teal
    imagePath: '/images/hero_products_exact_cropped.jpg',
  },
];

export default function CampaignHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeSlide = slides[currentSlide];

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500); // 5.5 seconds for a slightly faster, highly dynamic feel
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#FAF9F6] text-[#2C3E2D]"
      style={{ minHeight: 'min(90vh, 800px)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ================================================================
          MASTER ENVIRONMENT (Completely Locked Camera)
          ================================================================ */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-[0.1]" style={{ background: 'radial-gradient(circle, #E88B23 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #4B7B3B 0%, transparent 70%)' }} />
      </div>

      {/* ================================================================
          SLIDER CONTENT (Staggered Cinematic Timeline)
          Easing: cubic-bezier(.22,.61,.36,1)
          ================================================================ */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-8 h-full flex flex-col justify-center min-h-[min(90vh,800px)] pt-12 pb-24">
        
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          
          // Custom transition style for the Apple-like luxury feel
          const transitionStyle = { transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)' };
          
          return (
            <div 
              key={slide.id}
              className={`absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-8 py-12 lg:py-0 transition-opacity duration-1000 ${isActive ? 'opacity-100 pointer-events-auto z-20' : 'opacity-0 pointer-events-none z-0'}`}
              style={transitionStyle}
            >
              
              {/* LEFT SIDE CONTENT */}
              <div className="w-full lg:w-[45%] flex flex-col justify-center text-center lg:text-left mt-10 lg:mt-0">
                
                {/* Mobile Logo */}
                <div className="flex lg:hidden justify-center mb-6">
                  <div className="relative w-[65%] max-w-[280px] aspect-[765/589]" style={{ mixBlendMode: 'multiply' }}>
                    <Image src="/images/ayurdhara_logo_hero.jpg" alt="Ayurdhara Divya Shakti Logo" fill className="object-contain" priority />
                  </div>
                </div>

                {/* Trust Chips (650ms delay) */}
                <div 
                  className={`flex items-center justify-center lg:justify-start gap-3 mb-6 transition-all duration-[600ms] ${isActive ? 'opacity-100 translate-y-0 delay-[650ms]' : 'opacity-0 translate-y-4 delay-[0ms]'}`}
                  style={transitionStyle}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: slide.accentColor }}>Premium Collection</span>
                  <span className="text-xs text-[#E88B23]">✦</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C9B86]">100% Organic</span>
                </div>

                {/* Headline (450ms delay) */}
                <h1 
                  className={`font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-[#2D5A27] transition-all duration-[700ms] ${isActive ? 'opacity-100 translate-y-0 delay-[450ms]' : 'opacity-0 translate-y-8 delay-[0ms]'}`}
                  style={{ whiteSpace: 'pre-line', ...transitionStyle }}
                >
                  {slide.headline}
                </h1>

                {/* Description / Products Pill (550ms delay) */}
                <div 
                  className={`inline-flex items-center justify-center lg:justify-start gap-2 mb-6 transition-all duration-[700ms] ${isActive ? 'opacity-100 translate-y-0 delay-[550ms]' : 'opacity-0 translate-y-4 delay-[0ms]'}`}
                  style={transitionStyle}
                >
                  <div className="bg-[#FAF9F6] border border-[#E5E0D8] px-4 py-2 rounded-full shadow-sm">
                    <p className="text-sm text-gray-700 font-medium font-sans">
                      <span className="font-bold mr-1" style={{ color: slide.accentColor }}>FEATURING:</span>
                      {slide.productsText}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons (700ms delay) */}
                <div 
                  className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start transition-all duration-[700ms] ${isActive ? 'opacity-100 translate-y-0 delay-[700ms]' : 'opacity-0 translate-y-4 delay-[0ms]'}`}
                  style={transitionStyle}
                >
                  <Link href="/collections" className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-white overflow-hidden rounded-md w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300" style={{ backgroundColor: slide.accentColor }}>
                    <span className="relative z-10 flex items-center gap-2">Explore Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                  </Link>
                  <Link href="/wellness-guide/daily-wellness-routine" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#2D5A27] bg-transparent border border-[#2D5A27] rounded-md w-full sm:w-auto hover:bg-[#2D5A27] hover:text-white transition-colors duration-300">
                    Find Your Ritual
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE COMPOSITION & FLOATING CARD */}
              <div className="w-full lg:w-[55%] relative h-[400px] lg:h-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
                
                {/* Product Composition (New products slide upward 20px at 300ms, Old fade at 150ms) */}
                <div 
                  className={`absolute inset-0 right-0 w-full lg:w-[120%] h-full mix-blend-multiply transition-all duration-[1000ms] ${isActive ? 'opacity-100 translate-y-0 delay-[300ms]' : 'opacity-0 translate-y-5 delay-[150ms]'}`}
                  style={{
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
                    ...transitionStyle
                  }}
                >
                  <Image src={slide.imagePath} alt={slide.headline.replace('\n', ' ')} fill className="object-cover object-center lg:object-right" priority={index === 0} />
                </div>

                {/* Circular Trust Badge (900ms delay) */}
                <div 
                  className={`absolute top-[10%] lg:top-[15%] right-[5%] w-24 h-24 lg:w-32 lg:h-32 rounded-full border-2 border-white shadow-2xl flex items-center justify-center text-center p-2 z-30 transition-all duration-[700ms] ${isActive ? 'opacity-100 rotate-0 scale-100 delay-[900ms]' : 'opacity-0 -rotate-12 scale-90 delay-[0ms]'}`}
                  style={{ backgroundColor: slide.accentColor, ...transitionStyle }}
                >
                  <p className="text-[10px] lg:text-xs font-bold text-white uppercase tracking-widest leading-tight whitespace-pre-line">{slide.trustBadge}</p>
                </div>

                {/* Premium Glassmorphic Floating Card (800ms delay, Slides in from right, exits right) */}
                <div 
                  className={`absolute bottom-[5%] lg:bottom-[15%] right-0 lg:right-[-20px] w-[280px] lg:w-[320px] rounded-2xl border border-white/40 p-6 shadow-[0_30px_60px_rgba(0,0,0,0.1)] backdrop-blur-md z-30 transition-all duration-[800ms] ${isActive ? 'opacity-100 translate-x-0 delay-[800ms]' : 'opacity-0 translate-x-[40px] delay-[0ms]'}`}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', ...transitionStyle }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck size={20} style={{ color: slide.accentColor }} />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#2D5A27]">{slide.floatingCard.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {slide.floatingCard.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: slide.accentColor }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
        
        {/* MANUAL NAVIGATION (Desktop only) */}
        <div className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-white/50 border border-[#E5E0D8] backdrop-blur-sm flex items-center justify-center text-[#2D5A27] hover:bg-white hover:shadow-lg transition-all" aria-label="Previous Slide">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button onClick={handleNext} className="w-12 h-12 rounded-full bg-white/50 border border-[#E5E0D8] backdrop-blur-sm flex items-center justify-center text-[#2D5A27] hover:bg-white hover:shadow-lg transition-all" aria-label="Next Slide">
            <ChevronRight size={24} />
          </button>
        </div>

      </div>

      {/* ================================================================
          BOTTOM FEATURE PANEL & PAGINATION (Completely Fixed)
          ================================================================ */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-4 lg:py-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#E5E0D8]/40 backdrop-blur-sm bg-white/30">
          
          {/* Pagination Dots */}
          <div className="flex items-center gap-3 order-2 md:order-1">
            {slides.map((slide, index) => (
              <button key={slide.id} onClick={() => goToSlide(index)} className="group relative flex items-center justify-center w-8 h-8" aria-label={`Go to slide ${index + 1}`}>
                <div className={`absolute w-full h-[2px] transition-all duration-300 ${index === currentSlide ? 'bg-[#2D5A27]' : 'bg-[#2D5A27]/20 group-hover:bg-[#2D5A27]/50'}`} style={index === currentSlide ? { backgroundColor: activeSlide.accentColor } : {}} />
              </button>
            ))}
          </div>

          {/* Fixed Bottom Features */}
          <div className="flex items-center gap-6 lg:gap-12 order-1 md:order-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide opacity-80">
            {['Premium Quality', 'Ayurvedic Science', 'Safe For Daily Use', 'Made In India'].map((text, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <Star size={14} className="text-[#E88B23]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A27]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

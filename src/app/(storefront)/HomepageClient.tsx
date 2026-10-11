'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/productData';
import type { DbCategory } from '@/lib/dal/products';
import { navigationData, getCategoryBySlug } from '@/data/categoryData';
import { useAuthStore } from '@/store/authStore';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  Check, 
  MapPin, 
  Sparkles, 
  Droplets, 
  Sprout, 
  Baby, 
  Dumbbell, 
  Heart, 
  Activity, 
  Target, 
  Smile, 
  Coffee, 
  Leaf, 
  Layers, 
  Flame, 
  TreePine, 
  Apple, 
  Droplet, 
  Package, 
  Utensils, 
  Footprints, 
  ShieldCheck, 
  Award,
  ChevronDown,
  X
} from 'lucide-react';

interface HomepageClientProps {
  products: Product[];
  categories?: DbCategory[];
}

// ─── Targeted Remedies Data Model ───────────────────────────────────────────
interface Remedy {
  id: string;
  label: string;
  keywords: string[];
}

const remedies: Remedy[] = [
  { id: 'hair', label: 'Hair Fall Control', keywords: ['hair', 'bhringraj', 'scalp'] },
  { id: 'joint', label: 'Joint & Muscle Pain', keywords: ['joint', 'muscle', 'pain', 'mahanarayan'] },
  { id: 'digest', label: 'Digestive Health', keywords: ['digest', 'gut', 'triphala', 'churna'] },
  { id: 'immun', label: 'Immunity Booster', keywords: ['immun', 'chyawanprash', 'giloy', 'tulsi'] },
  { id: 'sleep', label: 'Deep Sleep', keywords: ['sleep', 'ashwagandha', 'brahmi', 'stress'] },
];

// ─── Promotional Carousel Slides Model ───────────────────────────────────────
interface PromoSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  destination: string;
  gradient: string;
  icon: any;
}

const promoSlides: PromoSlide[] = [
  {
    id: 'cold-pressed-oils',
    badge: '100% RAW & UNREFINED',
    title: 'Divya Shakti Cold Pressed Sesame & Herbal Oils',
    subtitle: 'Extracted in slow traditional stone ghani mills without heat, synthetic solvents, or chemical preservatives.',
    ctaText: 'Shop Now',
    destination: '/cold-pressed-oils',
    gradient: 'from-[#0C3829] via-[#092D21] to-[#07241A]',
    icon: Droplets,
  },
  {
    id: 'herbal-teas',
    badge: 'SACRED BOTANICALS',
    title: 'Immunity Kadhas & Pure Herbal Teas',
    subtitle: 'Hand-crafted blends with wild tulsi, giloy, and sun-dried mountain spices for circadian vitality.',
    ctaText: 'Explore Teas',
    destination: '/herbal-teas',
    gradient: 'from-[#1D3E24] via-[#16331C] to-[#0E2314]',
    icon: Coffee,
  },
  {
    id: 'natural-herbs-powder',
    badge: 'DAILY VEDA ESSENTIALS',
    title: 'Authentic Churnas & Single Herbs',
    subtitle: 'Time-tested micronized herbs for gentle digestive balance, natural Agni stimulation, and deep calm.',
    ctaText: 'View Powders',
    destination: '/natural-herbs-powder',
    gradient: 'from-[#382C1B] via-[#2D2315] to-[#1E170C]',
    icon: Layers,
  },
  {
    id: 'super-foods',
    badge: '100% PURE OJAS',
    title: 'Artisanal Superfoods & Natural Vitality',
    subtitle: 'Pure botanical and organic nutrient-dense superfoods crafted to uplift your sacred personal sanctuary.',
    ctaText: 'Discover More',
    destination: '/super-foods',
    gradient: 'from-[#173238] via-[#10272C] to-[#0A1C20]',
    icon: Sprout,
  },
];

// Helper to pick category icon
function getCategoryIconComponent(name: string) {
  const t = name.toLowerCase().trim();
  if (t.includes('ghee')) return Utensils;
  if (t.includes('honey') || t.includes('sweet')) return Droplet;
  if (t.includes('nut') || t.includes('fruit')) return TreePine;
  if (t.includes('seed')) return Sprout;
  if (t.includes('spice') && t.includes('powder')) return Sparkles;
  if (t.includes('spice')) return Flame;
  if (t.includes('powder') || t.includes('churna')) return Layers;
  if (t.includes('tea') || t.includes('cup') || t.includes('morning')) return Coffee;
  if (t.includes('nabhi')) return Target;
  if (t.includes('feet') || t.includes('foot')) return Footprints;
  if (t.includes('body') || t.includes('massage')) return Smile;
  if (t.includes('kid') || t.includes('child')) return Baby;
  if (t.includes('men')) return Dumbbell;
  if (t.includes('women')) return Heart;
  if (t.includes('senior')) return Activity;
  if (t.includes('combo') || t.includes('trial') || t.includes('pack')) return Package;
  if (t.includes('super') || t.includes('food')) return Apple;
  if (t.includes('raw') || t.includes('herb') || t.includes('jadi')) return Leaf;
  if (t.includes('oil')) return Droplets;
  return Sparkles;
}

export default function HomepageClient({ products, categories: dbCategories }: HomepageClientProps) {
  const user = useAuthStore((state) => state.user);
  const [selectedRemedy, setSelectedRemedy] = useState<number>(0);
  const [deliveryPincode, setDeliveryPincode] = useState<string>('Jaipur 302001');
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');

  // 1. Time-of-day greeting matching Android
  const [greeting, setGreeting] = useState('Good Day');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('Good Morning');
    else if (hour >= 12 && hour < 17) setGreeting('Good Afternoon');
    else if (hour >= 17 && hour < 21) setGreeting('Good Evening');
    else setGreeting('Good Night');
  }, []);

  const greetingText = user?.fullName 
    ? `${greeting}, ${user.fullName.split(' ')[0]}` 
    : greeting;

  // 2. Resolve the 20 categories
  const categoriesList = useMemo(() => {
    return navigationData;
  }, []);

  // 3. Filter products by selected remedy keywords
  const bestsellers = useMemo(() => {
    const activeKeywords = remedies[selectedRemedy].keywords;
    
    const matchesRemedy = (p: Product) => {
      const catNames = (p.categories && p.categories.length > 0 ? p.categories : [p.category]).join(' ');
      const haystack = [p.name, p.shortDescription, p.benefit, catNames].filter(Boolean).join(' ').toLowerCase();
      return activeKeywords.some(k => haystack.includes(k));
    };

    const matching = products.filter(matchesRemedy);
    const nonMatching = products.filter(p => !matchesRemedy(p));

    // Combine matching first, take up to 8
    const ordered = [...matching, ...nonMatching];
    return ordered.slice(0, 8);
  }, [products, selectedRemedy]);

  return (
    <div className="bg-[#FCF9F4] min-h-screen">
      
      {/* ── 1. GREETING & DELIVERY CITY CHIP ── */}
      <div className="border-b border-[#E5E2DD]/60 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base font-semibold text-[#414844] tracking-tight">
              {greetingText}
            </span>
          </div>

          {/* Delivery Pincode Chip */}
          <button 
            onClick={() => { setPincodeInput(deliveryPincode.replace(/\D/g, '')); setIsPincodeModalOpen(true); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0EDE9] hover:bg-[#EBE8E3] text-[#1C1C19] text-xs font-medium transition-colors border border-transparent hover:border-[#D4AF37]/40 shadow-sm"
          >
            <MapPin size={13} className="text-[#D4AF37]" />
            <span className="font-semibold">{deliveryPincode}</span>
            <ChevronDown size={12} className="text-[#717973]" />
          </button>
        </div>
      </div>

      {/* ── 2. DYNAMIC PROMOTIONAL HERO CAROUSEL ── */}
      <HomePromoCarousel slides={promoSlides} />

      {/* ── 3. SACRED FORMULATIONS: 20 CATEGORIES GRID ── */}
      <section className="py-12 md:py-16 bg-white border-b border-[#E5E2DD]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-[#1B4332] tracking-tight">
                Sacred Formulations
              </h2>
              <p className="text-xs md:text-sm text-[#717973] mt-1 font-medium">
                Traditional stone-milled and wild-harvested Ayurvedic essentials
              </p>
            </div>
            <Link 
              href="/collections" 
              className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#735C00] hover:text-[#1B4332] transition-colors flex items-center gap-1"
            >
              Explore All <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4-column tablet / 5-column desktop grid for the 20 categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5">
            {categoriesList.map((cat) => {
              const IconComp = getCategoryIconComponent(cat.name);
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className="group flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-[#FCF9F4] hover:bg-[#F6F3EE] border border-[#E5E2DD] hover:border-[#D4AF37] transition-all duration-300 hover:shadow-md text-center"
                >
                  <div className="w-13 h-13 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#E5E2DD] group-hover:scale-105 group-hover:border-[#D4AF37] transition-all duration-300 mb-3 text-[#1B4332]">
                    <IconComp size={24} strokeWidth={1.75} className="group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <span className="font-semibold text-xs sm:text-[13px] text-[#1C1C19] group-hover:text-[#1B4332] transition-colors line-clamp-2 leading-snug min-h-[34px] flex items-center justify-center">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. TARGETED REMEDIES + 5. AYURVEDIC BESTSELLERS ── */}
      <section className="py-12 md:py-16 bg-[#FCF9F4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#735C00] block mb-1.5">
                Targeted Remedies
              </span>
              <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-[#1B4332] tracking-tight">
                Ayurvedic Bestsellers
              </h2>
              <p className="text-xs md:text-sm text-[#717973] mt-1 font-medium">
                Time-tested potent artisanal batches
              </p>
            </div>
            
            <Link 
              href="/collections" 
              className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#735C00] hover:text-[#1B4332] transition-colors flex items-center gap-1 self-start md:self-auto"
            >
              View All ({products.length}) <ArrowRight size={14} />
            </Link>
          </div>

          {/* Interactive Remedy Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {remedies.map((rem, idx) => {
              const isActive = selectedRemedy === idx;
              return (
                <button
                  key={rem.id}
                  onClick={() => setSelectedRemedy(idx)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm border ${
                    isActive 
                      ? 'bg-[#1B4332] text-[#FFE088] border-[#1B4332]' 
                      : 'bg-white text-[#414844] hover:bg-[#F6F3EE] border-[#E5E2DD]'
                  }`}
                >
                  {isActive && <Check size={14} className="text-[#FFE088]" />}
                  {rem.label}
                </button>
              );
            })}
          </div>

          {/* Live Product Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. BUSINESS OPPORTUNITY BANNER: DIVYA SHAKTI NETWORK ── */}
      <section className="py-10 md:py-14 bg-white border-y border-[#E5E2DD]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#00452E] via-[#0C3829] to-[#07241A] text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-[#D4AF37]/30">
            {/* Subtle radial glow */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#FFE088] text-xs font-bold uppercase tracking-wider mb-5">
                <Award size={15} className="text-[#FFE088]" />
                <span>DIVYA SHAKTI NETWORK</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                Natural Aroma & Business Opportunity
              </h2>

              <p className="text-white/85 text-sm sm:text-base md:text-lg mb-8 leading-relaxed font-light">
                Partner with Ayurdhara as a certified Ayurvedic Wellness Consultant, Retail Shop Partner, or Regional Distributor to grow together in sacred health and sustainable abundance.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/business-opportunity"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFE088] hover:bg-[#FCD870] text-[#241A00] font-bold text-sm tracking-wide shadow-lg transition-transform hover:scale-105"
                >
                  Explore Opportunity <ArrowRight size={16} />
                </Link>
                <Link
                  href="/partner/wellness-signup"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wide border border-white/20 transition-colors"
                >
                  Join as Partner
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. RITUAL OF THE DAY: DINACHARYA ── */}
      <section className="py-12 md:py-16 bg-[#FAF7F2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#735C00] block mb-2">
              Ayurvedic Dinacharya
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#1B4332]">
              Daily 5-Minute Nighttime Wellness Routine
            </h2>
            <p className="text-xs md:text-sm text-[#717973] mt-1 font-medium">
              Ground your nervous system and restore circadian balance before sleep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2DD] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FFE088]/40 text-[#1B4332] font-serif font-bold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1B4332] mb-2">Padabhyanga (Feet Massage)</h3>
              <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                Massage <strong>Feet Wellness Oil</strong> into the soles of both feet for 3 to 5 minutes to release accumulated physical heat and calm the Vata dosha.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E2DD] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FFE088]/40 text-[#1B4332] font-serif font-bold text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1B4332] mb-2">Nabhi Chikitsa (Navel Oiling)</h3>
              <p className="text-xs sm:text-sm text-[#414844] leading-relaxed">
                Apply 2 to 5 drops of your customized <strong>Nabhi Oil Blend</strong> directly on the navel right before bedtime to nourish over 72,000 internal nadis.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 8. BRAND STORY & TRUST ── */}
      <section className="py-12 md:py-16 bg-white border-t border-[#E5E2DD]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full" />
          <h2 className="font-serif font-bold text-2xl md:text-3xl lg:text-4xl text-[#1B4332] mb-4">
            Pure Ayurveda, Rooted in Tradition
          </h2>
          <p className="text-sm md:text-base text-[#414844] max-w-3xl mx-auto leading-relaxed mb-8 font-light">
            Ayurdhara Divya Shakti formulations honor ancient classical texts and traditional extraction methods. From slow cold-pressed seed oils to unpolished raw mountain herbs, every batch is prepared to protect the vital life force (Prana) of nature.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { title: '100% Pure', desc: 'Raw, unrefined ingredients without synthetic solvents' },
              { title: 'Stone Ghani', desc: 'Slow traditional extraction preserving heat-sensitive nutrients' },
              { title: 'Ethically Sourced', desc: 'Directly sourced from trusted regional growers' },
              { title: 'Safe Daily Care', desc: 'Gentle, balanced botanicals suitable for the whole family' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#FCF9F4] border border-[#E5E2DD]">
                <ShieldCheck size={20} className="text-[#1B4332] mb-2" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1B4332] mb-1">{item.title}</h4>
                <p className="text-[11px] text-[#717973] leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PINCODE MODAL ── */}
      {isPincodeModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-bold text-lg text-[#1B4332]">Enter Delivery Pincode</h3>
              <button onClick={() => setIsPincodeModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">Enter your 6-digit delivery pincode to check local availability.</p>
            <input
              type="text"
              maxLength={6}
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 302001"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-none focus:border-[#1B4332] mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsPincodeModalOpen(false)}
                className="w-1/2 py-2 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (pincodeInput.length === 6) {
                    setDeliveryPincode(`Pincode ${pincodeInput}`);
                    setIsPincodeModalOpen(false);
                  }
                }}
                disabled={pincodeInput.length !== 6}
                className="w-1/2 py-2 rounded-xl text-xs font-bold text-[#241A00] bg-[#FFE088] hover:bg-[#FCD870] disabled:opacity-50 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── PROMOTIONAL HERO CAROUSEL COMPONENT ───
function HomePromoCarousel({ slides }: { slides: PromoSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      className="py-6 sm:py-8 bg-white border-b border-[#E5E2DD]/70"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-md">
          
          {/* Slides Container */}
          <div className="relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              const IconComp = slide.icon;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} text-white p-6 sm:p-10 md:p-12 flex flex-col justify-between transition-opacity duration-700 ${
                    isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Subtle watermark icon in corner */}
                  <IconComp className="absolute right-4 -bottom-6 w-44 h-44 text-white opacity-5 pointer-events-none" />

                  {/* Top content */}
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFE088] text-[#241A00] font-bold text-[10px] tracking-widest uppercase mb-3 sm:mb-4 shadow-sm">
                      {slide.badge}
                    </span>
                    <h1 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white max-w-2xl leading-tight mb-2 sm:mb-3">
                      {slide.title}
                    </h1>
                    <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed line-clamp-2">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Bottom content: CTA + Pagination */}
                  <div className="flex items-center justify-between pt-4 mt-auto">
                    <Link
                      href={slide.destination}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#FFE088] hover:bg-[#FCD870] text-[#241A00] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md"
                    >
                      {slide.ctaText} <ArrowRight size={14} />
                    </Link>

                    {/* Navigation Arrows + Dots */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        {slides.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => setCurrentSlide(dotIdx)}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                            className={`h-2 rounded-full transition-all ${
                              dotIdx === currentSlide 
                                ? 'w-6 bg-[#FFE088]' 
                                : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="hidden sm:flex items-center gap-1 ml-2">
                        <button
                          onClick={prevSlide}
                          aria-label="Previous slide"
                          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={nextSlide}
                          aria-label="Next slide"
                          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

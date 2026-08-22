
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { Check, Shield, ArrowRight, Award, ShoppingBag } from 'lucide-react';

const CATEGORIES = [
  'Kids Care',
  'Men Wellness',
  'Women Wellness',
  'Senior Care'
];

interface TrialPackDef {
  id: string;
  slug: string;
  name: string;
  badge: string;
  badgeColor?: string;
  mrp: number;
  offerPrice: number;
  contents: string[];
  totalQuantity: string;
  duration: string;
  image: string;
  requiresCategory: boolean;
}

const COMBO_PACKS: TrialPackDef[] = [
  {
    id: 'prime-trial-pack',
    slug: 'prime-trial-pack',
    name: 'Prime Trial Pack',
    badge: 'STARTER COMBO',
    badgeColor: 'bg-[#2D5A27]',
    mrp: 999,
    offerPrice: 699,
    contents: ['2 x 5 ml Nabhi Wellness Oils (10 ml)', '60 ml Feet Massage Oil'],
    totalQuantity: 'Total: 70 ml',
    duration: 'Up to 1 Month*',
    image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
    requiresCategory: true
  },
  {
    id: 'silver-trial-pack',
    slug: 'silver-trial-pack',
    name: 'Silver Trial Pack',
    badge: 'BEST VALUE',
    badgeColor: 'bg-[#E88B23]',
    mrp: 1499,
    offerPrice: 999,
    contents: ['4 x 5 ml Nabhi Wellness Oils (20 ml)', '120 ml Feet Massage Oil'],
    totalQuantity: 'Total: 140 ml',
    duration: 'Up to 2 Months*',
    image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
    requiresCategory: true
  },
  {
    id: 'gold-trial-pack',
    slug: 'gold-trial-pack',
    name: 'Gold Trial Pack',
    badge: 'COMPLETE SELF-CARE',
    badgeColor: 'bg-[#2D5A27]',
    mrp: 1799,
    offerPrice: 1199,
    contents: ['2 x 5 ml Nabhi Wellness Oils (10 ml)', '60 ml Feet Massage Oil', '100 ml Body Massage Oil'],
    totalQuantity: 'Total: 170 ml',
    duration: 'Up to 1 Month*',
    image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
    requiresCategory: true
  },
  {
    id: 'diamond-trial-pack',
    slug: 'diamond-trial-pack',
    name: 'Diamond Trial Pack',
    badge: 'COMPLETE WELLNESS COMBO',
    badgeColor: 'bg-[#E88B23]',
    mrp: 2299,
    offerPrice: 1599,
    contents: ['4 x 5 ml Nabhi Wellness Oils (20 ml)', '120 ml Feet Massage Oil', '100 ml Body Massage Oil'],
    totalQuantity: 'Total: 240 ml',
    duration: 'Up to 2 Months*',
    image: '/images/categories/cat_wellness_packs_1786557692487.jpg',
    requiresCategory: true
  }
];

const NABHI_PACKS: TrialPackDef[] = [
  {
    id: 'nabhi-2-variant-trial-pack',
    slug: 'nabhi-2-variant-trial-pack',
    name: 'Nabhi 2-Variant Trial Pack',
    badge: '2-VARIANT TRIAL',
    badgeColor: 'bg-[#2D5A27]',
    mrp: 499,
    offerPrice: 349,
    contents: ['2 x 5 ml Nabhi Wellness Oils (Select any 2 from 1 category)'],
    totalQuantity: 'Total: 10 ml',
    duration: 'Up to 1 Month*',
    image: '/images/categories/cat_trial_pack.jpg',
    requiresCategory: true
  },
  {
    id: 'nabhi-4-variant-trial-pack',
    slug: 'nabhi-4-variant-trial-pack',
    name: 'Nabhi 4-Variant Trial Pack',
    badge: 'ALL 4 VARIANTS',
    badgeColor: 'bg-[#E88B23]',
    mrp: 999,
    offerPrice: 599,
    contents: ['4 x 5 ml Nabhi Wellness Oils (Complete 4-oil category set)'],
    totalQuantity: 'Total: 20 ml',
    duration: 'Up to 2 Months*',
    image: '/images/categories/cat_trial_pack.jpg',
    requiresCategory: true
  }
];

const FEET_PACKS: TrialPackDef[] = [
  {
    id: 'feet-wellness-trial-pack',
    slug: 'feet-wellness-trial-pack',
    name: 'Feet Wellness Trial Pack',
    badge: '15 DAYS TRIAL',
    badgeColor: 'bg-[#2D5A27]',
    mrp: 499,
    offerPrice: 349,
    contents: ['30 ml Padabhyanga Feet Massage Oil'],
    totalQuantity: 'Total: 30 ml',
    duration: 'Up to 15 Days*',
    image: '/images/categories/cat_oil_wellness_1786556871303.jpg',
    requiresCategory: false
  },
  {
    id: 'feet-wellness-routine-pack',
    slug: 'feet-wellness-routine-pack',
    name: 'Feet Wellness Routine Pack',
    badge: '1 MONTH ROUTINE',
    badgeColor: 'bg-[#E88B23]',
    mrp: 699,
    offerPrice: 499,
    contents: ['60 ml Padabhyanga Feet Massage Oil'],
    totalQuantity: 'Total: 60 ml',
    duration: 'Up to 1 Month*',
    image: '/images/categories/cat_oil_wellness_1786556871303.jpg',
    requiresCategory: false
  }
];

export default function TrialPacksClient() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [categorySelections, setCategorySelections] = useState<Record<string, string>>({
    'prime-trial-pack': 'Kids Care',
    'silver-trial-pack': 'Kids Care',
    'gold-trial-pack': 'Kids Care',
    'diamond-trial-pack': 'Kids Care',
    'nabhi-2-variant-trial-pack': 'Kids Care',
    'nabhi-4-variant-trial-pack': 'Kids Care'
  });

  const handleAddToCart = (pack: TrialPackDef) => {
    const selectedCat = categorySelections[pack.id] || (pack.requiresCategory ? 'Kids Care' : '');
    const variantSize = selectedCat ? `${pack.totalQuantity} | ${selectedCat}` : pack.totalQuantity;

    addItem({
      productId: pack.id,
      name: pack.name,
      image: pack.image,
      price: pack.offerPrice,
      originalPrice: pack.mrp,
      size: variantSize,
      quantity: 1
    });

    toast.success(`${pack.name} added to cart!`);
    openCart();
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1B3617] via-[#2D5A27] to-[#1B3617] text-white py-14 px-4 text-center relative overflow-hidden shadow-md">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-4 border border-white/20">
            <Shield size={16} className="text-[#E88B23]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E88B23]">
              AYURDHARA DIVYA SHAKTI &bull; OIL WELLNESS CARE
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold mb-3">
            TRY OUR TRIAL WELLNESS PACKS
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto font-medium">
            Start Small. Experience Authentic Ayurvedic Restorative Care.
          </p>
          <div className="mt-4 inline-block bg-[#E88B23] text-white px-5 py-1.5 rounded-full font-extrabold text-sm shadow-sm">
            Trial Packs Starting ₹349
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto max-w-6xl px-4 py-12 space-y-16">

        {/* 1. COMBO TRIAL PACKS */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
              SECTION 1 &bull; STARTER &amp; COMPLETE COMBOS
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
              Combo Trial Packs (Family Trial Oil Wellness Packs)
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Synchronized bundles pairing targeted Nabhi wellness oils with soothing Feet &amp; Body massage oils.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMBO_PACKS.map((pack) => (
              <div key={pack.id} className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-5 flex flex-col justify-between hover:shadow-lg transition-all">
                <div className="space-y-3.5">
                  <span className={`${pack.badgeColor} text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block`}>
                    {pack.badge}
                  </span>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#1B3617]">{pack.name}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-extrabold text-[#E88B23]">₹{pack.offerPrice}</span>
                      <span className="text-xs text-stone-400 line-through">MRP: ₹{pack.mrp}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs border-y border-stone-200 py-3">
                    {pack.contents.map((item, idx) => (
                      <p key={idx} className="font-semibold text-stone-800 flex items-start gap-1.5">
                        <Check size={14} className="text-[#2D5A27] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </p>
                    ))}
                    <div className="pt-1.5 text-stone-500 font-medium">
                      {pack.totalQuantity} | {pack.duration}
                    </div>
                  </div>

                  {pack.requiresCategory && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600">Category:</label>
                      <select 
                        value={categorySelections[pack.id] || 'Kids Care'}
                        onChange={(e) => setCategorySelections(prev => ({ ...prev, [pack.id]: e.target.value }))}
                        className="w-full bg-white border border-stone-300 rounded-md p-1.5 text-xs font-semibold text-stone-800"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(pack)}
                  className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold py-2.5 rounded-xl transition-all mt-6 text-sm shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag size={15} /> Add to Cart (₹{pack.offerPrice})
                </button>
              </div>
            ))}
          </div>
        </section>


        {/* 2. NABHI TRIAL PACKS */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
              SECTION 2 &bull; NABHI TRIAL PACKS
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
              Nabhi 2-Variant &amp; 4-Variant Trial Packs
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Select 2 targeted oils or get the complete 4-oil category set for comprehensive care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {NABHI_PACKS.map((pack) => (
              <div key={pack.id} className="bg-[#FAF8F5] rounded-2xl border-2 border-stone-200 p-6 md:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`${pack.badgeColor} text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block mb-1.5`}>
                        {pack.badge}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1B3617]">{pack.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 line-through">MRP: ₹{pack.mrp}</span>
                      <span className="text-2xl md:text-3xl font-extrabold text-[#E88B23] block">₹{pack.offerPrice}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                    <div>
                      <span className="text-stone-500 font-bold uppercase block">Volume</span>
                      <span className="font-bold text-stone-900 text-sm">{pack.totalQuantity}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-bold uppercase block">Duration</span>
                      <span className="font-bold text-stone-900 text-sm">{pack.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600">
                    &bull; {pack.contents[0]}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-stone-700">Select Category:</label>
                    <select 
                      value={categorySelections[pack.id] || 'Kids Care'}
                      onChange={(e) => setCategorySelections(prev => ({ ...prev, [pack.id]: e.target.value }))}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleAddToCart(pack)}
                    className="w-full bg-[#2D5A27] hover:bg-[#1B3617] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Buy Now (₹{pack.offerPrice}) <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* 3. FEET MASSAGE OILS */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
              SECTION 3 &bull; FEET MASSAGE OILS
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
              Feet Massage Oils (Trial Packs)
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Deep relaxation Padabhyanga formulation for calm nerves and overnight foot recovery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEET_PACKS.map((pack) => (
              <div key={pack.id} className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 md:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`${pack.badgeColor} text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block mb-1.5`}>
                        {pack.badge}
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1B3617]">{pack.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 line-through">MRP: ₹{pack.mrp}</span>
                      <span className="text-2xl md:text-3xl font-extrabold text-[#E88B23] block">₹{pack.offerPrice}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                    <div>
                      <span className="text-stone-500 font-bold uppercase block">Bottle Size</span>
                      <span className="font-bold text-stone-900 text-sm">{pack.totalQuantity}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-bold uppercase block">Duration</span>
                      <span className="font-bold text-stone-900 text-sm">{pack.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600">
                    &bull; {pack.contents[0]}
                  </p>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleAddToCart(pack)}
                    className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Buy Now (₹{pack.offerPrice}) <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}


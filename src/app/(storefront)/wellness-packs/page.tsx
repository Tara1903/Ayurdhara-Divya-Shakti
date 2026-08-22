'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { Check, ShoppingBag, ArrowRight, Info, Award } from 'lucide-react';

const NABHI_CATEGORIES = [
  {
    id: 'kids',
    name: 'Kids Care Oil Blend',
    shortName: 'KIDS CARE',
    description: 'Gentle, nourishing botanical formulations crafted for young vitality and calm sleep.',
    icon: '👶',
    products: [
      { id: 'kids-smart-oil-blend', slug: 'kids-smart-oil-blend', name: 'Kids Smart Oil Blend', benefit: 'Focus, learning clarity and cognitive nourishment' },
      { id: 'kids-growth-oil-blend', slug: 'kids-growth-oil-blend', name: 'Kids Growth Oil Blend', benefit: 'Natural muscle tone, bone vitality and active development' },
      { id: 'kids-calm-oil-blend', slug: 'kids-calm-oil-blend', name: 'Kids Calm Oil Blend', benefit: 'Soothing restlessness, evening relaxation and sound sleep' },
      { id: 'kids-daily-care-oil-blend', slug: 'kids-daily-care-oil-blend', name: 'Kids Daily Care Oil Blend', benefit: 'Everyday resilience, skin softness and digestive balance' }
    ]
  },
  {
    id: 'men',
    name: "Men's Care Oil Blend",
    shortName: "MEN'S CARE",
    description: 'Vitalizing botanical oils designed for stamina, strength, heart wellness and active energy.',
    icon: '👨',
    products: [
      { id: 'men-strength-oil-blend', slug: 'men-strength-oil-blend', name: 'Men Strength Oil Blend', benefit: 'Physical stamina, core vitality and enduring strength' },
      { id: 'men-active-oil-blend', slug: 'men-active-oil-blend', name: 'Men Active Oil Blend', benefit: 'Daily energy booster, fatigue relief and post-workout recovery' },
      { id: 'men-heart-balance-oil-blend', slug: 'men-heart-balance-oil-blend', name: 'Men Heart Balance Oil Blend', benefit: 'Cardiovascular nourishment, peaceful breath and stress release' },
      { id: 'men-daily-wellness-oil-blend', slug: 'men-daily-wellness-oil-blend', name: 'Men Daily Wellness Oil Blend', benefit: 'Overall metabolic harmony and daily endurance support' }
    ]
  },
  {
    id: 'women',
    name: "Women's Care Oil Blend",
    shortName: "WOMEN'S CARE",
    description: 'Balancing herbal formulations supporting feminine radiance, hormonal calm and inner harmony.',
    icon: '👩',
    products: [
      { id: 'women-care-oil-blend', slug: 'women-care-oil-blend', name: 'Women Care Oil Blend', benefit: 'Daily hormonal balance, vitality and inner calm' },
      { id: 'women-daily-wellness-oil-blend', slug: 'women-daily-wellness-oil-blend', name: 'Women Daily Wellness Oil Blend', benefit: 'Full-body rejuvenation and everyday wellness routine' },
      { id: 'women-glow-oil-blend', slug: 'women-glow-oil-blend', name: 'Women Glow Oil Blend', benefit: 'Luminous skin hydration, complexion clarity and inner youth' },
      { id: 'women-harmony-oil-blend', slug: 'women-harmony-oil-blend', name: 'Women Harmony Oil Blend', benefit: 'Monthly comfort, emotional equilibrium and soothing relaxation' }
    ]
  },
  {
    id: 'senior',
    name: 'Senior Care Oil Blend',
    shortName: 'SENIOR CARE',
    description: 'Gentle, warming restorative blends for joint mobility, deep comfort and steady balance.',
    icon: '👴',
    products: [
      { id: 'senior-active-oil-blend', slug: 'senior-active-oil-blend', name: 'Senior Active Oil Blend', benefit: 'Smooth joint mobility, ease of movement and daytime active comfort' },
      { id: 'senior-daily-wellness-oil-blend', slug: 'senior-daily-wellness-oil-blend', name: 'Senior Daily Wellness Oil Blend', benefit: 'Nourishing constitutional vitality and gentle strength' },
      { id: 'senior-comfort-oil-blend', slug: 'senior-comfort-oil-blend', name: 'Senior Comfort Oil Blend', benefit: 'Warming comfort for tired muscles and deep night restoration' },
      { id: 'senior-balance-oil-blend', slug: 'senior-balance-oil-blend', name: 'Senior Balance Oil Blend', benefit: 'Nervous system relaxation and grounded steadiness' }
    ]
  }
];

export default function WellnessPacksPage() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [selectedNabhiCat, setSelectedNabhiCat] = useState('kids');
  const [nabhi2Cat, setNabhi2Cat] = useState('Kids Care');
  const [nabhi4Cat, setNabhi4Cat] = useState('Kids Care');
  const [feetTrialCat, setFeetTrialCat] = useState('Kids Care');
  const [feetRoutineCat, setFeetRoutineCat] = useState('Kids Care');
  const [bodyTrialCat, setBodyTrialCat] = useState('Kids Care');
  const [bodyStarterCat, setBodyStarterCat] = useState('Kids Care');
  const [bodyValueCat, setBodyValueCat] = useState('Kids Care');
  
  const [primeCat, setPrimeCat] = useState('Kids Care');
  const [silverCat, setSilverCat] = useState('Kids Care');
  const [goldCat, setGoldCat] = useState('Kids Care');
  const [diamondCat, setDiamondCat] = useState('Kids Care');

  const currentCategoryData = NABHI_CATEGORIES.find(c => c.id === selectedNabhiCat) || NABHI_CATEGORIES[0];

  const handleQuickAdd = (id: string, name: string, price: number, originalPrice: number, size: string, image: string) => {
    addItem({
      productId: id,
      name,
      image,
      price,
      originalPrice,
      size,
      quantity: 1
    });
    toast.success(`${name} (${size}) added to cart!`);
    openCart();
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1A1A1A] pb-24">
      {/* Header Banner - Official PDF Layout */}
      <section className="bg-gradient-to-r from-[#1B3617] via-[#2D5A27] to-[#1B3617] text-white py-12 px-4 relative overflow-hidden shadow-md">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#E88B23]/20 text-[#E88B23] border border-[#E88B23]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Award size={14} /> 100% Pure | Natural | Trusted Wellness
          </div>
          <h2 className="text-xl md:text-2xl font-serif tracking-widest text-[#E88B23] font-bold mb-1">
            AYURDHARA DIVYA SHAKTI
          </h2>
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold tracking-tight text-white mb-3">
            OIL WELLNESS CARE
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-medium">
            COMPLETE PRICE &amp; PACK STRUCTURE
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-10 space-y-16">
        {/* TOP SECTION: 4 NABHI CATEGORIES (16 VARIANTS) */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8">
            <div>
              <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
                4 NABHI WELLNESS CATEGORIES (16 VARIANTS)
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
                Existing Individual Wellness Oils
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                Targeted Ayurvedic belly-button Nabhi formulations for every family member.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-amber-300 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-center">
                <span className="text-xs uppercase text-stone-500 font-bold block">Size</span>
                <span className="text-lg font-bold text-stone-800">5 ml</span>
              </div>
              <div className="h-8 w-px bg-stone-300"></div>
              <div className="text-center">
                <span className="text-xs uppercase text-stone-500 font-bold block">Each Variant</span>
                <span className="text-2xl font-extrabold text-[#E88B23]">₹199</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {NABHI_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedNabhiCat(cat.id)}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-xl font-bold text-sm transition-all border-2 ${
                  selectedNabhiCat === cat.id
                    ? 'border-[#2D5A27] bg-[#2D5A27] text-white shadow-md'
                    : 'border-stone-200 bg-[#FAF8F5] text-stone-700 hover:border-stone-400'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.shortName}</span>
              </button>
            ))}
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-6 flex items-start gap-3">
            <Info size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-amber-900 font-medium">
              <strong>Interactive Catalog:</strong> Customer selects <strong>{currentCategoryData.name}</strong> &rarr; Website displays the 4 specialized variants belonging to this category.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {currentCategoryData.products.map((prod) => (
              <div 
                key={prod.id} 
                className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-5 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white mb-4 border border-stone-100 flex items-center justify-center">
                    <Image
                      src="/images/categories/cat_oil_wellness_1786556871303.jpg"
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[#2D5A27] text-xs font-bold px-2 py-0.5 rounded-md border border-stone-200">
                      5 ml
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1B3617] line-clamp-2 mb-1.5">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {prod.benefit}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-stone-400 line-through">₹299</span>
                    <span className="text-lg font-bold text-[#E88B23] block">₹199</span>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(prod.id, prod.name, 199, 299, '5 ml', '/images/categories/cat_oil_wellness_1786556871303.jpg')}
                    className="bg-[#2D5A27] hover:bg-[#1B3617] text-white text-xs font-bold py-2 px-3.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <ShoppingBag size={14} /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 1: NABHI TRIAL PACKS */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
              1. NABHI TRIAL PACKS
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
              Family Trial Oil Wellness Packs
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Customizable multi-variant Nabhi oil packs with up to 2 months of wellness care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 2-Variant */}
            <div className="bg-[#FAF8F5] rounded-2xl border-2 border-stone-200 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-[#2D5A27] tracking-wider block mb-1">
                      Option A
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1B3617]">
                      NABHI 2-VARIANT TRIAL PACK
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">MRP: ₹499</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-[#E88B23] block">₹349</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Volume</span>
                    <span className="font-bold text-stone-900 text-sm">2 x 5 ml = 10 ml</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Duration</span>
                    <span className="font-bold text-stone-900 text-sm">Up to 1 Month*</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic">
                  &bull; Select any 2 variants from one category (Kids, Men, Women, or Senior Care).
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-stone-700">Select Category:</label>
                  <select 
                    value={nabhi2Cat} 
                    onChange={(e) => setNabhi2Cat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care (Select 2 of 4 Variants)</option>
                    <option value="Men Wellness">Men&apos;s Care (Select 2 of 4 Variants)</option>
                    <option value="Women Wellness">Women&apos;s Care (Select 2 of 4 Variants)</option>
                    <option value="Senior Care">Senior Care (Select 2 of 4 Variants)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleQuickAdd('nabhi-2-variant-trial-pack', 'Nabhi 2-Variant Trial Pack', 349, 499, `2x5ml | ${nabhi2Cat}`, '/images/categories/cat_trial_pack.jpg')}
                  className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Buy 2-Variant Pack (₹349) <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* 4-Variant */}
            <div className="bg-[#FAF8F5] rounded-2xl border-2 border-[#2D5A27] p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-[#2D5A27] tracking-wider block mb-1">
                      Option B
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1B3617]">
                      NABHI 4-VARIANT TRIAL PACK
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">MRP: ₹999</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-[#E88B23] block">₹599</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Volume</span>
                    <span className="font-bold text-stone-900 text-sm">4 x 5 ml = 20 ml</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Duration</span>
                    <span className="font-bold text-stone-900 text-sm">Up to 2 Months*</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 italic">
                  &bull; All 4 variants from one category (Complete specialized care).
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-stone-700">Select Category:</label>
                  <select 
                    value={nabhi4Cat} 
                    onChange={(e) => setNabhi4Cat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care (All 4 Variants Included)</option>
                    <option value="Men Wellness">Men&apos;s Care (All 4 Variants Included)</option>
                    <option value="Women Wellness">Women&apos;s Care (All 4 Variants Included)</option>
                    <option value="Senior Care">Senior Care (All 4 Variants Included)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleQuickAdd('nabhi-4-variant-trial-pack', 'Nabhi 4-Variant Trial Pack', 599, 999, `4x5ml | ${nabhi4Cat}`, '/images/categories/cat_trial_pack.jpg')}
                  className="w-full bg-[#2D5A27] hover:bg-[#1B3617] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Buy 4-Variant Pack (₹599) <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEET MASSAGE OILS */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
              2. FEET MASSAGE OILS
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
              Feet Massage Oils (Trial Packs)
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Padabhyanga foot massage oils formulated for soothing deep sleep, nerve calming and fatigue release.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#2D5A27] block mb-1">15-Day Trial</span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1B3617]">
                      FEET WELLNESS TRIAL PACK
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">MRP: ₹499</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-[#E88B23] block">₹349</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Bottle Size</span>
                    <span className="font-bold text-stone-900 text-sm">30 ml</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Duration</span>
                    <span className="font-bold text-stone-900 text-sm">Up to 15 Days*</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600">
                  Ideal for first-time foot wellness trial before starting a monthly bedtime routine.
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-stone-700">Select Category / Age Group:</label>
                  <select 
                    value={feetTrialCat} 
                    onChange={(e) => setFeetTrialCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care (Gentle Bedtime Relaxation)</option>
                    <option value="Men Wellness">Men&apos;s Care (Deep Muscle Relief)</option>
                    <option value="Women Wellness">Women&apos;s Care (Stress Relief &amp; Calm)</option>
                    <option value="Senior Care">Senior Care (Joint &amp; Nerve Ease)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleQuickAdd('feet-wellness-trial-pack', 'Feet Wellness Trial Pack', 349, 499, `30 ml | ${feetTrialCat}`, '/images/categories/cat_oil_wellness_1786556871303.jpg')}
                  className="w-full bg-[#2D5A27] hover:bg-[#1B3617] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Buy Feet Trial (₹349) <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#2D5A27] block mb-1">1-Month Routine</span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1B3617]">
                      FEET WELLNESS ROUTINE PACK
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">MRP: ₹699</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-[#E88B23] block">₹499</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Bottle Size</span>
                    <span className="font-bold text-stone-900 text-sm">60 ml</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Duration</span>
                    <span className="font-bold text-stone-900 text-sm">Up to 1 Month*</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600">
                  Full 1-month bedtime routine pack for long-term foot care, cracked heel recovery and calm nights.
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-stone-700">Select Category / Age Group:</label>
                  <select 
                    value={feetRoutineCat} 
                    onChange={(e) => setFeetRoutineCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care (Gentle Bedtime Relaxation)</option>
                    <option value="Men Wellness">Men&apos;s Care (Deep Muscle Relief)</option>
                    <option value="Women Wellness">Women&apos;s Care (Stress Relief &amp; Calm)</option>
                    <option value="Senior Care">Senior Care (Joint &amp; Nerve Ease)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleQuickAdd('feet-wellness-routine-pack', 'Feet Wellness Routine Pack', 499, 699, `60 ml | ${feetRoutineCat}`, '/images/categories/cat_oil_wellness_1786556871303.jpg')}
                  className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Buy Routine Pack (₹499) <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BODY MASSAGE OILS */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
              3. BODY MASSAGE OILS
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
              Body Wellness Massage Oils (Abhyanga Therapy)
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Restorative full-body botanical oils formulated for joint comfort, deep muscle revitalization and glowing vitality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 50 ml Trial */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#2D5A27] block mb-1">15-Day Trial</span>
                    <h3 className="text-lg font-serif font-bold text-[#1B3617]">
                      BODY WELLNESS TRIAL PACK
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">MRP: ₹499</span>
                    <span className="text-2xl font-extrabold text-[#E88B23] block">₹349</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Bottle Size</span>
                    <span className="font-bold text-stone-900 text-sm">50 ml</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Duration</span>
                    <span className="font-bold text-stone-900 text-sm">Up to 15 Days*</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600">
                  Ideal for first-time full body massage ritual and skin rejuvenation.
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-stone-700">Select Category / Age Group:</label>
                  <select 
                    value={bodyTrialCat} 
                    onChange={(e) => setBodyTrialCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care (Gentle Daily Massage)</option>
                    <option value="Men Wellness">Men&apos;s Care (Active Energy &amp; Muscle Tone)</option>
                    <option value="Women Wellness">Women&apos;s Care (Inner Radiance &amp; Balance)</option>
                    <option value="Senior Care">Senior Care (Joint Ease &amp; Warming Care)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleQuickAdd('body-wellness-trial-pack', 'Body Wellness Trial Pack', 349, 499, `50 ml | ${bodyTrialCat}`, '/images/categories/cat_oil_wellness_1786556871303.jpg')}
                  className="w-full bg-[#2D5A27] hover:bg-[#1B3617] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Buy 50 ml Trial (₹349) <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* 100 ml Starter */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#E88B23] block mb-1">1-Month Routine</span>
                    <h3 className="text-lg font-serif font-bold text-[#1B3617]">
                      BODY WELLNESS STARTER PACK
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">MRP: ₹899</span>
                    <span className="text-2xl font-extrabold text-[#E88B23] block">₹599</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Bottle Size</span>
                    <span className="font-bold text-stone-900 text-sm">100 ml</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Duration</span>
                    <span className="font-bold text-stone-900 text-sm">Up to 1 Month*</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600">
                  Full 1-month bedtime and morning Abhyanga body massage supply.
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-stone-700">Select Category / Age Group:</label>
                  <select 
                    value={bodyStarterCat} 
                    onChange={(e) => setBodyStarterCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care (Gentle Daily Massage)</option>
                    <option value="Men Wellness">Men&apos;s Care (Active Energy &amp; Muscle Tone)</option>
                    <option value="Women Wellness">Women&apos;s Care (Inner Radiance &amp; Balance)</option>
                    <option value="Senior Care">Senior Care (Joint Ease &amp; Warming Care)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleQuickAdd('body-wellness-starter-pack', 'Body Wellness Starter Pack', 599, 899, `100 ml | ${bodyStarterCat}`, '/images/categories/cat_oil_wellness_1786556871303.jpg')}
                  className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Buy 100 ml Pack (₹599) <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* 200 ml Value */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#2D5A27] block mb-1">2-3 Months Value</span>
                    <h3 className="text-lg font-serif font-bold text-[#1B3617]">
                      BODY WELLNESS VALUE PACK
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 line-through">MRP: ₹1499</span>
                    <span className="text-2xl font-extrabold text-[#E88B23] block">₹999</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Bottle Size</span>
                    <span className="font-bold text-stone-900 text-sm">200 ml</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-bold uppercase block">Duration</span>
                    <span className="font-bold text-stone-900 text-sm">Up to 2-3 Months*</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600">
                  Best value family &amp; long-term daily body massage economy pack.
                </p>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-stone-700">Select Category / Age Group:</label>
                  <select 
                    value={bodyValueCat} 
                    onChange={(e) => setBodyValueCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-sm font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care (Gentle Daily Massage)</option>
                    <option value="Men Wellness">Men&apos;s Care (Active Energy &amp; Muscle Tone)</option>
                    <option value="Women Wellness">Women&apos;s Care (Inner Radiance &amp; Balance)</option>
                    <option value="Senior Care">Senior Care (Joint Ease &amp; Warming Care)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => handleQuickAdd('body-wellness-value-pack', 'Body Wellness Value Pack', 999, 1499, `200 ml | ${bodyValueCat}`, '/images/categories/cat_oil_wellness_1786556871303.jpg')}
                  className="w-full bg-[#2D5A27] hover:bg-[#1B3617] text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Buy 200 ml Pack (₹999) <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: COMBO TRIAL PACKS */}
        <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200">
          <div className="border-b border-stone-200 pb-4 mb-8">
            <div className="inline-block bg-[#2D5A27] text-white text-xs font-bold uppercase px-3 py-1 rounded-md mb-2">
              4. COMBO TRIAL PACKS
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1B3617]">
              Complete Family Trial Oil Wellness Combos
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Synchronized Nabhi, Feet, and Body massage bundles for complete holistic self-care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Prime */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-4">
                <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block">
                  STARTER COMBO
                </span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1B3617]">PRIME TRIAL PACK</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-[#E88B23]">₹699</span>
                    <span className="text-xs text-stone-400 line-through">MRP: ₹999</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs border-y border-stone-200 py-3">
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 2 x 5 ml Nabhi Oils
                  </p>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 60 ml Feet Massage Oil
                  </p>
                  <div className="pt-1 text-stone-500 font-medium">Total: <strong>70 ml</strong> | Up to 1 Month*</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-600">Category:</label>
                  <select 
                    value={primeCat} 
                    onChange={(e) => setPrimeCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-md p-1.5 text-xs font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care</option>
                    <option value="Men Wellness">Men&apos;s Care</option>
                    <option value="Women Wellness">Women&apos;s Care</option>
                    <option value="Senior Care">Senior Care</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleQuickAdd('prime-trial-pack', 'Prime Trial Pack', 699, 999, `70ml | ${primeCat}`, '/images/categories/cat_wellness_packs_1786557692487.jpg')}
                className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold py-2.5 rounded-xl transition-all mt-6 text-sm shadow-sm"
              >
                Add Prime (₹699)
              </button>
            </div>

            {/* Silver */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-4">
                <span className="bg-[#E88B23]/15 text-[#E88B23] text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block">
                  BEST VALUE
                </span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1B3617]">SILVER TRIAL PACK</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-[#E88B23]">₹999</span>
                    <span className="text-xs text-stone-400 line-through">MRP: ₹1499</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs border-y border-stone-200 py-3">
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 4 x 5 ml Nabhi Oils
                  </p>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 120 ml Feet Massage Oil
                  </p>
                  <div className="pt-1 text-stone-500 font-medium">Total: <strong>140 ml</strong> | Up to 2 Months*</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-600">Category:</label>
                  <select 
                    value={silverCat} 
                    onChange={(e) => setSilverCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-md p-1.5 text-xs font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care</option>
                    <option value="Men Wellness">Men&apos;s Care</option>
                    <option value="Women Wellness">Women&apos;s Care</option>
                    <option value="Senior Care">Senior Care</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleQuickAdd('silver-trial-pack', 'Silver Trial Pack', 999, 1499, `140ml | ${silverCat}`, '/images/categories/cat_wellness_packs_1786557692487.jpg')}
                className="w-full bg-[#2D5A27] hover:bg-[#1B3617] text-white font-bold py-2.5 rounded-xl transition-all mt-6 text-sm shadow-sm"
              >
                Add Silver (₹999)
              </button>
            </div>

            {/* Gold */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-4">
                <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block">
                  COMPLETE SELF-CARE
                </span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1B3617]">GOLD TRIAL PACK</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-[#E88B23]">₹1,199</span>
                    <span className="text-xs text-stone-400 line-through">MRP: ₹1799</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs border-y border-stone-200 py-3">
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 2 x 5 ml Nabhi Oils
                  </p>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 60 ml Feet Massage Oil
                  </p>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 100 ml Body Massage Oil
                  </p>
                  <div className="pt-1 text-stone-500 font-medium">Total: <strong>170 ml</strong> | Up to 1 Month*</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-600">Category:</label>
                  <select 
                    value={goldCat} 
                    onChange={(e) => setGoldCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-md p-1.5 text-xs font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care</option>
                    <option value="Men Wellness">Men&apos;s Care</option>
                    <option value="Women Wellness">Women&apos;s Care</option>
                    <option value="Senior Care">Senior Care</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleQuickAdd('gold-trial-pack', 'Gold Trial Pack', 1199, 1799, `170ml | ${goldCat}`, '/images/categories/cat_wellness_packs_1786557692487.jpg')}
                className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold py-2.5 rounded-xl transition-all mt-6 text-sm shadow-sm"
              >
                Add Gold (₹1,199)
              </button>
            </div>

            {/* Diamond */}
            <div className="bg-[#FAF8F5] rounded-2xl border-2 border-[#2D5A27] p-6 flex flex-col justify-between hover:shadow-lg transition-all shadow-sm">
              <div className="space-y-4">
                <span className="bg-[#2D5A27] text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md inline-block">
                  FLAGSHIP COMBO
                </span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1B3617]">DIAMOND TRIAL PACK</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-[#E88B23]">₹1,599</span>
                    <span className="text-xs text-stone-400 line-through">MRP: ₹2299</span>
                  </div>
                </div>
                <div className="space-y-2 text-xs border-y border-stone-200 py-3">
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 4 x 5 ml Nabhi Oils
                  </p>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 120 ml Feet Massage Oil
                  </p>
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Check size={14} className="text-[#2D5A27]" /> 100 ml Body Massage Oil
                  </p>
                  <div className="pt-1 text-stone-500 font-medium">Total: <strong>240 ml</strong> | Up to 2 Months*</div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-600">Category:</label>
                  <select 
                    value={diamondCat} 
                    onChange={(e) => setDiamondCat(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-md p-1.5 text-xs font-semibold text-stone-800"
                  >
                    <option value="Kids Care">Kids Care</option>
                    <option value="Men Wellness">Men&apos;s Care</option>
                    <option value="Women Wellness">Women&apos;s Care</option>
                    <option value="Senior Care">Senior Care</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => handleQuickAdd('diamond-trial-pack', 'Diamond Trial Pack', 1599, 2299, `240ml | ${diamondCat}`, '/images/categories/cat_wellness_packs_1786557692487.jpg')}
                className="w-full bg-[#2D5A27] hover:bg-[#1B3617] text-white font-bold py-2.5 rounded-xl transition-all mt-6 text-sm shadow-md"
              >
                Add Diamond (₹1,599)
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { Check, Shield, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'Kids Care',
  'Men Wellness',
  'Women Wellness',
  'Senior Care'
];

interface BaseTrialPack {
  id: string;
  slug: string;
  name: string;
  mrp: number;
  offerPrice: number;
  contents: string[];
  totalQuantity: string;
  image: string;
  badge: string;
}

const INDIVIDUAL_PACK: BaseTrialPack = {
  id: 'individual-trial-wellness-pack',
  slug: 'individual-trial-wellness-pack',
  name: 'Trial Wellness Pack',
  mrp: 749,
  offerPrice: 499,
  contents: ['10 ml Nabhi Wellness Oil', '30 ml Feet Massage Oil'],
  totalQuantity: '40 ml',
  image: '/images/products/individual-trial-wellness-pack.jpg',
  badge: 'STARTER TRIAL'
};

const DIAMOND_PACK: BaseTrialPack = {
  id: 'diamond-trial-wellness-pack',
  slug: 'diamond-trial-wellness-pack',
  name: 'Diamond Trial Wellness Pack',
  mrp: 1499,
  offerPrice: 999,
  contents: ['10 ml Nabhi Wellness Oil', '30 ml Feet Massage Oil', '100 ml Body Massage Oil'],
  totalQuantity: '140 ml',
  image: '/images/products/diamond-trial-wellness-pack.jpg',
  badge: 'BEST VALUE TRIAL'
};

const FAMILY_PACKS = [
  { members: 2, id: '2-member-family-trial-pack', name: '2 Member Family Trial Pack', mrp: 1499, offerPrice: 899 },
  { members: 3, id: '3-member-family-trial-pack', name: '3 Member Family Trial Pack', mrp: 2249, offerPrice: 1299 },
  { members: 4, id: '4-member-family-trial-pack', name: '4 Member Family Trial Pack', mrp: 2999, offerPrice: 1699 },
  { members: 5, id: '5-member-family-trial-pack', name: '5 Member Family Trial Pack', mrp: 3749, offerPrice: 2099 }
];

export default function TrialPacksClient() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [individualCategory, setIndividualCategory] = useState<string>('');
  const [diamondCategory, setDiamondCategory] = useState<string>('');
  const [selectedFamilyPackIndex, setSelectedFamilyPackIndex] = useState<number>(0);
  const [familySelections, setFamilySelections] = useState<Record<number, string>>({});

  const handleAddToCart = (
    productId: string, 
    name: string, 
    price: number, 
    originalPrice: number, 
    sizePrefix: string, 
    selectedConfig: string,
    image: string
  ) => {
    if (!selectedConfig) {
      toast.error('Please select a wellness category before adding to cart.');
      return;
    }

    const fullVariantString = `${sizePrefix} | ${selectedConfig}`;

    addItem({
      productId,
      name,
      image,
      price,
      originalPrice,
      size: fullVariantString,
      quantity: 1,
    });
    
    toast.success('Trial pack added to cart!');
    openCart();
  };

  const currentFamilyPack = FAMILY_PACKS[selectedFamilyPackIndex];

  const handleFamilySelectionChange = (memberIndex: number, category: string) => {
    setFamilySelections(prev => ({ ...prev, [memberIndex]: category }));
  };

  const handleFamilyAddToCart = () => {
    for (let i = 0; i < currentFamilyPack.members; i++) {
      if (!familySelections[i]) {
        toast.error(`Please select a category for Member ${i + 1}`);
        return;
      }
    }

    const selectionsString = Array.from({ length: currentFamilyPack.members })
      .map((_, i) => `M${i + 1}: ${familySelections[i]}`)
      .join(', ');

    handleAddToCart(
      currentFamilyPack.id,
      currentFamilyPack.name,
      currentFamilyPack.offerPrice,
      currentFamilyPack.mrp,
      'Trial',
      selectionsString,
      `/images/products/${currentFamilyPack.members}-member-family-trial-pack.jpg`
    );
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#4B7B3B] to-[#2D5A27] text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full mb-6">
            <Shield size={16} className="text-[#E88B23]" />
            <span className="text-sm font-semibold tracking-wider">FIRST TIME CUSTOMERS</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            ?? TRY OUR TRIAL PACKS
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 font-medium">
            Start Small. Experience Your Wellness Routine.
          </p>
          <div className="bg-[#E88B23] text-white px-6 py-2 rounded-full inline-block font-bold text-lg shadow-lg">
            Trial Wellness Packs Starting ₹499
          </div>
          <p className="mt-6 text-sm text-white/70 max-w-lg mx-auto">
            Choose your category and experience up to 1 month of premium Ayurvedic wellness formulations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-16">

        {/* 1. INDIVIDUAL TRIAL */}
        <ProductSection 
          pack={INDIVIDUAL_PACK}
          selectedCategory={individualCategory}
          onSelectCategory={setIndividualCategory}
          onAddToCart={() => handleAddToCart(INDIVIDUAL_PACK.id, INDIVIDUAL_PACK.name, INDIVIDUAL_PACK.offerPrice, INDIVIDUAL_PACK.mrp, 'Trial', individualCategory, INDIVIDUAL_PACK.image)}
        />

        {/* 2. DIAMOND TRIAL */}
        <ProductSection 
          pack={DIAMOND_PACK}
          selectedCategory={diamondCategory}
          onSelectCategory={setDiamondCategory}
          onAddToCart={() => handleAddToCart(DIAMOND_PACK.id, DIAMOND_PACK.name, DIAMOND_PACK.offerPrice, DIAMOND_PACK.mrp, 'Trial', diamondCategory, DIAMOND_PACK.image)}
        />

        {/* 3. FAMILY PACKS */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="bg-[#E0EBDC]/30 p-8 text-center border-b border-[#4B7B3B]/10 relative">
            <span className="absolute top-4 right-4 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              FAMILY TRIAL
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] mb-2">??????????? FAMILY TRIAL WELLNESS PACKS</h2>
            <p className="text-gray-600 font-medium">Up to 1 Month Wellness Care. Everyone gets their own targeted category.</p>
          </div>

          <div className="p-8 lg:p-10">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {FAMILY_PACKS.map((pack, index) => (
                <button
                  key={pack.members}
                  onClick={() => setSelectedFamilyPackIndex(index)}
                  className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                    selectedFamilyPackIndex === index 
                      ? 'bg-[#2D5A27] text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {pack.members} Member (₹{pack.offerPrice})
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-5 gap-10 items-start">
              <div className="md:col-span-2 relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-8">
                 <div className="w-full h-full relative">
                    <Image src={`/images/products/${currentFamilyPack.members}-member-family-trial-pack.jpg`} alt={currentFamilyPack.name} fill className="object-cover" unoptimized />
                 </div>
              </div>

              <div className="md:col-span-3 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gray-400 text-lg line-through font-medium">MRP: ₹{currentFamilyPack.mrp}</span>
                    <span className="text-3xl font-bold text-[#E88B23]">₹{currentFamilyPack.offerPrice}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Customize Your Family Pack</h3>
                  <p className="text-sm text-gray-500 mb-6">Each member receives: <span className="font-bold text-[#2D5A27]">10 ml Nabhi Oil + 30 ml Feet Massage Oil</span></p>
                  
                  <div className="space-y-4">
                    {Array.from({ length: currentFamilyPack.members }).map((_, idx) => (
                      <div key={idx} className="bg-[#fcfcfc] p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-[#2D5A27] mb-2">Member {idx + 1} Wellness Category</label>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.map(c => (
                            <button
                              key={c}
                              onClick={() => handleFamilySelectionChange(idx, c)}
                              className={`py-1.5 px-3 rounded-md text-xs font-bold border transition-all ${
                                familySelections[idx] === c 
                                  ? 'border-[#2D5A27] bg-[#2D5A27]/5 text-[#2D5A27]' 
                                  : 'border-gray-200 bg-white text-gray-500 hover:border-[#2D5A27]/30'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleFamilyAddToCart}
                  className="w-full bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-8"
                >
                  Buy {currentFamilyPack.name} Now <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function ProductSection({ pack, selectedCategory, onSelectCategory, onAddToCart }: { 
  pack: BaseTrialPack, 
  selectedCategory: string, 
  onSelectCategory: (c: string) => void,
  onAddToCart: () => void 
}) {
  const router = useRouter();
  return (
    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row relative">
      <span className="absolute top-4 right-4 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
        {pack.badge}
      </span>
      <div className="md:w-5/12 bg-gray-50 relative p-8 flex items-center justify-center min-h-[300px]">
        <div className="w-full h-full relative aspect-square rounded-xl overflow-hidden shadow-inner border border-gray-200 bg-white">
          <Image src={pack.image} alt={pack.name} fill className="object-cover" unoptimized />
        </div>
      </div>
      <div className="md:w-7/12 p-8 lg:p-10 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] mb-2">{pack.name}</h2>
        
        <div className="flex items-center gap-3 mb-6">
          <span className="text-gray-400 text-lg line-through font-medium">MRP: ₹{pack.mrp}</span>
          <span className="text-3xl font-bold text-[#E88B23]">₹{pack.offerPrice}</span>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Contents</h4>
            <ul className="space-y-1">
              {pack.contents.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-[#2D5A27] font-medium">
                  <Check size={16} className="text-[#E88B23]" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-6">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Quantity</h4>
              <p className="font-bold text-[#1A1A1A]">{pack.totalQuantity}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Duration</h4>
              <p className="font-bold text-[#1A1A1A]">Up to 1 Month</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] p-5 rounded-xl border border-gray-200 mb-6">
          <label className="block text-sm font-bold text-[#2D5A27] mb-3">Choose Your Wellness Category</label>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => onSelectCategory(c)}
                className={`py-2.5 px-3 rounded-lg text-sm font-bold border-2 transition-all ${
                  selectedCategory === c 
                    ? 'border-[#2D5A27] bg-[#2D5A27]/5 text-[#2D5A27]' 
                    : 'border-gray-200 bg-white text-gray-500 hover:border-[#2D5A27]/30'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="text-xs text-center text-gray-400 mt-3">* Select 1 Category for all products in this pack</p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={onAddToCart}
            className="flex-1 bg-[#E88B23] hover:bg-[#d07b1d] text-white font-bold text-lg py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Buy Now <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => router.push(`/products/${pack.slug}`)}
            className="flex-1 bg-white hover:bg-gray-50 text-[#2D5A27] border-2 border-[#2D5A27] font-bold text-lg py-3.5 rounded-xl transition-all flex items-center justify-center"
          >
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}

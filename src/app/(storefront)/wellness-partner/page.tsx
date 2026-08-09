import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Share2, Wallet, Users, Link as LinkIcon, Gift, LayoutDashboard, Store, Truck } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'BE OUR WELLNESS PARTNER | Ayurdhara Divya Shakti',
  description: 'Join ADS Wellness Circle and share Ayurdhara Divya Shakti wellness products with your friends, family and community.',
};

export default function WellnessPartnerPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] font-sans pb-24">
      {/* SECTION 1 - HERO */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-[#2D5A27] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E88B23] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#4B7B3B] blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20">
            ADS WELLNESS CIRCLE
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            BE OUR WELLNESS PARTNER
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            Join ADS Wellness Circle and share Ayurdhara Divya Shakti wellness products with your friends, family and community.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#E88B23] mb-10">
            "Share Wellness. Build Connections. Earn Through Genuine Referrals."
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="text-[#E88B23]" />
              <span className="font-bold">10% Trial Referral Reward</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="text-[#E88B23]" />
              <span className="font-bold">12% Gold Referral Reward</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#join-form" className="px-8 py-4 bg-[#E88B23] hover:bg-[#D9381E] text-white font-bold rounded-full transition-colors flex items-center gap-2 text-lg shadow-lg">
              JOIN ADS WELLNESS CIRCLE <ChevronRight size={20} />
            </a>
            <Link href="/collections" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/30 transition-colors text-lg">
              EXPLORE WELLNESS PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 - HOW IT WORKS */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">HOW IT WORKS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E88B23] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">01</div>
              <Users size={48} className="mx-auto text-[#4B7B3B] mb-6 mt-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">JOIN</h3>
              <p className="text-gray-600">Become an approved ADS Wellness Circle Partner.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E88B23] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">02</div>
              <Share2 size={48} className="mx-auto text-[#4B7B3B] mb-6 mt-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">SHARE</h3>
              <p className="text-gray-600">Share genuine Ayurdhara Divya Shakti products and wellness packs through your referral link or code.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E88B23] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">03</div>
              <Wallet size={48} className="mx-auto text-[#4B7B3B] mb-6 mt-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">EARN</h3>
              <p className="text-gray-600">Receive eligible referral rewards from successful product purchases.</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 italic">
            "Rewards are linked to genuine product sales. Recruitment alone does not generate commission."
          </p>
        </div>
      </section>

      {/* SECTION 3 - WELLNESS PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">WELLNESS PRODUCTS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our premium selection of highly effective natural formulations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-gray-100 rounded-2xl bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">INDIVIDUAL NABHI OIL BLENDS</h3>
              <p className="text-[#E88B23] font-semibold mb-6">16 variants</p>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">10 ml</h4>
                    <span className="text-sm font-bold text-[#E88B23] bg-[#E88B23]/10 px-2 py-1 rounded">33% OFF</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">MRP ₹299</div>
                    <div className="text-2xl font-bold text-[#2D5A27]">₹199</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">20 ml</h4>
                    <span className="text-sm font-bold text-[#E88B23] bg-[#E88B23]/10 px-2 py-1 rounded">30% OFF</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">MRP ₹499</div>
                    <div className="text-2xl font-bold text-[#2D5A27]">₹349</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 border border-gray-100 rounded-2xl bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">FEET MASSAGE OIL</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">30 ml</h4>
                    <span className="text-sm font-bold text-[#E88B23] bg-[#E88B23]/10 px-2 py-1 rounded">33% OFF</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">MRP ₹599</div>
                    <div className="text-xl font-bold text-[#2D5A27]">₹399</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">100 ml</h4>
                    <span className="text-sm font-bold text-[#E88B23] bg-[#E88B23]/10 px-2 py-1 rounded">33% OFF</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">MRP ₹1,799</div>
                    <div className="text-xl font-bold text-[#2D5A27]">₹1,199</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">200 ml</h4>
                    <span className="text-sm font-bold text-[#E88B23] bg-[#E88B23]/10 px-2 py-1 rounded">33% OFF</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 line-through">MRP ₹3,299</div>
                    <div className="text-xl font-bold text-[#2D5A27]">₹2,199</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - INDIVIDUAL WELLNESS PACKS */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">INDIVIDUAL WELLNESS PACKS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trial */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="absolute top-0 right-0 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">33% OFF</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">TRIAL WELLNESS PACK</h3>
              <p className="text-gray-500 font-medium mb-6">Up to 1 Month</p>
              
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#4B7B3B] mt-0.5 shrink-0" />
                  <span>10 ml Nabhi Oil Blend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#4B7B3B] mt-0.5 shrink-0" />
                  <span>30 ml Feet Massage Oil</span>
                </li>
              </ul>
              
              <div className="pt-6 border-t border-gray-100 flex items-end gap-3">
                <span className="text-4xl font-bold text-[#2D5A27]">₹499</span>
                <span className="text-lg text-gray-400 line-through mb-1">MRP ₹749</span>
              </div>
            </div>

            {/* Gold */}
            <div className="bg-[#2D5A27] p-8 rounded-2xl shadow-lg border border-[#3e7236] relative text-white transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">27% OFF</div>
              <h3 className="text-2xl font-bold mb-2">GOLD WELLNESS PACK</h3>
              <p className="text-white/70 font-medium mb-6">Up to 4 Months</p>
              
              <ul className="space-y-3 mb-8 text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#E88B23] mt-0.5 shrink-0" />
                  <span>40 ml Nabhi Oil Blend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#E88B23] mt-0.5 shrink-0" />
                  <span>4 × 10 ml variants</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#E88B23] mt-0.5 shrink-0" />
                  <span>100 ml Feet Massage Oil</span>
                </li>
              </ul>
              
              <div className="pt-6 border-t border-white/20 flex items-end gap-3">
                <span className="text-4xl font-bold text-[#E88B23]">₹2,199</span>
                <span className="text-lg text-white/50 line-through mb-1">MRP ₹2,999</span>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="absolute top-0 right-0 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">27% OFF</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">PREMIUM WELLNESS PACK</h3>
              <p className="text-gray-500 font-medium mb-6">Up to 8 Months</p>
              
              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#4B7B3B] mt-0.5 shrink-0" />
                  <span>80 ml Nabhi Oil Blend</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#4B7B3B] mt-0.5 shrink-0" />
                  <span>4 × 20 ml variants</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-[#4B7B3B] mt-0.5 shrink-0" />
                  <span>200 ml Feet Massage Oil</span>
                </li>
              </ul>
              
              <div className="pt-6 border-t border-gray-100 flex items-end gap-3">
                <span className="text-4xl font-bold text-[#2D5A27]">₹3,999</span>
                <span className="text-lg text-gray-400 line-through mb-1">MRP ₹5,499</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 & 6 - FAMILY PACKS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* FAMILY TRIAL */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#2D5A27] mb-8 border-b pb-4">FAMILY TRIAL</h2>
              <div className="space-y-4">
                {[
                  { m: 2, mrp: 1499, offer: 899, off: 40 },
                  { m: 3, mrp: 2249, offer: 1299, off: 42 },
                  { m: 4, mrp: 2999, offer: 1699, off: 43 },
                  { m: 5, mrp: 3749, offer: 2099, off: 44 }
                ].map(pack => (
                  <div key={`trial-${pack.m}`} className="flex justify-between items-center bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-[#4B7B3B] transition-colors">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{pack.m} Member Family Trial</h4>
                      <span className="text-sm font-bold text-[#E88B23] bg-[#E88B23]/10 px-2 py-1 rounded inline-block mt-1">{pack.off}% OFF</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400 line-through">MRP ₹{pack.mrp.toLocaleString('en-IN')}</div>
                      <div className="text-2xl font-bold text-[#2D5A27]">₹{pack.offer.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAMILY GOLD */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#2D5A27] mb-8 border-b pb-4">FAMILY GOLD</h2>
              <div className="space-y-4">
                {[
                  { m: 2, mrp: 5499, offer: 3999, off: 27 },
                  { m: 3, mrp: 8249, offer: 5799, off: 30 },
                  { m: 4, mrp: 10999, offer: 7499, off: 32 },
                  { m: 5, mrp: 13749, offer: 8999, off: 35 }
                ].map(pack => (
                  <div key={`gold-${pack.m}`} className="flex justify-between items-center bg-[#2D5A27]/5 p-5 rounded-xl border border-[#2D5A27]/20 hover:border-[#4B7B3B] transition-colors">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{pack.m} Member Family Gold</h4>
                      <span className="text-sm font-bold text-[#E88B23] bg-[#E88B23]/10 px-2 py-1 rounded inline-block mt-1">{pack.off}% OFF</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 line-through">MRP ₹{pack.mrp.toLocaleString('en-IN')}</div>
                      <div className="text-2xl font-bold text-[#2D5A27]">₹{pack.offer.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 7 - REFERRAL REWARDS */}
      <section className="py-20 bg-[#2D5A27] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#E88B23]">EARN THROUGH GENUINE REFERRALS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="text-[#E88B23]" size={28} />
                <h3 className="text-2xl font-bold">TRIAL PACKS</h3>
              </div>
              <p className="text-3xl font-bold text-[#E88B23] mb-6">10% Referral Reward</p>
              
              <div className="space-y-4">
                <p className="font-semibold text-white/70 uppercase tracking-wider text-sm border-b border-white/20 pb-2">Examples:</p>
                <div className="flex justify-between items-center"><span className="text-white/80">₹499 sale</span><span className="font-bold">→ ₹49.90 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹899 sale</span><span className="font-bold">→ ₹89.90 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹1,299 sale</span><span className="font-bold">→ ₹129.90 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹1,699 sale</span><span className="font-bold">→ ₹169.90 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹2,099 sale</span><span className="font-bold">→ ₹209.90 reward</span></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Gift className="text-[#E88B23]" size={28} />
                <h3 className="text-2xl font-bold">GOLD PACKS</h3>
              </div>
              <p className="text-3xl font-bold text-[#E88B23] mb-6">12% Referral Reward</p>
              
              <div className="space-y-4">
                <p className="font-semibold text-white/70 uppercase tracking-wider text-sm border-b border-white/20 pb-2">Examples:</p>
                <div className="flex justify-between items-center"><span className="text-white/80">₹2,199 sale</span><span className="font-bold">→ ₹263.88 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹3,999 sale</span><span className="font-bold">→ ₹479.88 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹5,799 sale</span><span className="font-bold">→ ₹695.88 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹7,499 sale</span><span className="font-bold">→ ₹899.88 reward</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">₹8,999 sale</span><span className="font-bold">→ ₹1,079.88 reward</span></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center">
             <h3 className="text-xl font-bold mb-2">PREMIUM PACK</h3>
             <p className="text-white/80">Referral rate: <span className="font-bold text-[#E88B23]">TO BE DEFINED</span></p>
          </div>
        </div>
      </section>

      {/* SECTION 8 - PARTNER BENEFITS */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">PARTNER BENEFITS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Users className="text-[#4B7B3B] mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">🌿 WELLNESS COMMUNITY</h3>
              <p className="text-gray-600">Share wellness products with people you know.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <LinkIcon className="text-[#4B7B3B] mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">🔗 PERSONAL REFERRAL LINK</h3>
              <p className="text-gray-600">Approved partners receive a referral link/code.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Gift className="text-[#4B7B3B] mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">🎁 PRODUCT-BASED REWARDS</h3>
              <p className="text-gray-600">Rewards are connected to eligible product sales.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <LayoutDashboard className="text-[#4B7B3B] mb-4" size={32} />
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">📊 PARTNER DASHBOARD</h3>
              <p className="text-gray-600">Track referrals, orders and approved rewards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 - PARTNER DASHBOARD PREVIEW & SECTION 10/11 - OTHER PARTNERS */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Dashboard Preview */}
            <div className="lg:col-span-1 bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2D5A27] mb-6">Partner Dashboard Features</h3>
              <ul className="space-y-3 text-gray-700 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Partner Profile</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Referral Link</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Referral Code</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Total Referrals</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Successful Orders</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Pending Rewards</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Approved Rewards</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Referral History</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Payout Status</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Product Catalogue</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Share Product</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#E88B23]" /> Terms & Conditions</li>
              </ul>
            </div>

            {/* Other Partners */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-[#2D5A27]/5 border border-[#2D5A27]/20 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Store className="text-[#4B7B3B]" size={28} />
                    <h3 className="text-2xl font-bold text-gray-800">BECOME A RETAIL PARTNER</h3>
                  </div>
                  <p className="text-gray-600 mb-3">For physical shops interested in selling Ayurdhara Divya Shakti products.</p>
                  <p className="font-bold text-[#E88B23]">"Special Retail Partner Pricing"</p>
                </div>
                <a href="#join-form" className="px-6 py-3 bg-[#2D5A27] hover:bg-[#1f3f1b] text-white font-bold rounded-lg transition-colors whitespace-nowrap">
                  APPLY AS RETAIL PARTNER
                </a>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="text-gray-600" size={28} />
                    <h3 className="text-2xl font-bold text-gray-800">BECOME A DISTRIBUTION PARTNER</h3>
                  </div>
                  <p className="text-gray-600 mb-3">For bulk and distribution business.</p>
                  <p className="font-bold text-[#E88B23]">"Special Distributor Pricing"</p>
                </div>
                <a href="#join-form" className="px-6 py-3 bg-gray-800 hover:bg-black text-white font-bold rounded-lg transition-colors whitespace-nowrap">
                  APPLY AS DISTRIBUTION PARTNER
                </a>
              </div>

              <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
                 <p className="text-sm text-gray-600 flex items-start gap-2">
                   <Users className="text-orange-400 shrink-0 mt-0.5" size={18} />
                   Note: Confidential Retail and Distributor pricing is only accessible to approved and logged-in partners through their dedicated dashboard portal.
                 </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14 - JOIN FORM */}
      <section id="join-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif font-bold text-[#2D5A27] mb-3">JOIN THE NETWORK</h2>
              <p className="text-gray-600">Submit your application below.</p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4B7B3B] bg-white text-black" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label>
                  <input type="tel" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4B7B3B] bg-white text-black" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4B7B3B] bg-white text-black" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4B7B3B] bg-white text-black" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Partner Type</label>
                <select className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4B7B3B] bg-white text-black" required>
                  <option value="">Select Partner Type...</option>
                  <option value="wellness">Wellness Circle Partner</option>
                  <option value="retail">Retail Partner</option>
                  <option value="distribution">Distribution Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Referral Code (Optional)</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#4B7B3B] bg-white text-black" />
              </div>

              <div className="flex items-start gap-3 pt-4">
                <input type="checkbox" id="terms" className="mt-1 w-5 h-5 accent-[#4B7B3B]" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the ADS Wellness Circle Terms & Conditions.
                </label>
              </div>

              <button type="submit" className="w-full py-4 bg-[#E88B23] hover:bg-[#D9381E] text-white font-bold rounded-xl text-lg transition-colors mt-4">
                SUBMIT APPLICATION
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 15 - PROGRAM RULES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Program Rules & Disclaimers</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Referral rewards apply only to eligible successful product sales.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Recruitment alone does not generate commission.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> No guaranteed income.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Cancelled/refunded orders are not eligible.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Duplicate/self-referrals may be rejected.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Referral attribution must be through the official referral link/code.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Reward eligibility is subject to the official program terms.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Applicable taxes/TDS and legal requirements may apply.</li>
              <li className="flex gap-3"><span className="text-[#E88B23]">•</span> Partner status does not guarantee sales or income.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 16 - FINAL CTA */}
      <section className="py-24 bg-[#2D5A27] text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">READY TO JOIN ADS WELLNESS CIRCLE?</h2>
          <p className="text-xl text-white/90 mb-12 italic">
            "Share products you believe in and build genuine wellness connections."
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#join-form" className="px-8 py-4 bg-[#E88B23] hover:bg-[#D9381E] text-white font-bold rounded-xl transition-colors shadow-lg">
              JOIN AS WELLNESS PARTNER
            </a>
            <a href="#join-form" className="px-8 py-4 bg-white text-[#2D5A27] hover:bg-gray-100 font-bold rounded-xl transition-colors">
              BECOME A RETAIL PARTNER
            </a>
            <a href="#join-form" className="px-8 py-4 bg-black text-white hover:bg-gray-900 font-bold rounded-xl transition-colors border border-gray-800">
              BECOME A DISTRIBUTION PARTNER
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

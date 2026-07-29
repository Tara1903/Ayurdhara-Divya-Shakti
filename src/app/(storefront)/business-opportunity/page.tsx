import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Store, Users, User, ShoppingBag, Truck, IndianRupee, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Business Opportunity | Ayurdhara Divya Shakti',
  description: 'Build your wellness business with Ayurdhara Divya Shakti. Become a Wellness Partner, Retail Shop, or Distributor today.',
};

export default function BusinessOpportunityPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] font-sans pb-24">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#2D5A27] text-white">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E88B23] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#4B7B3B] blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-semibold tracking-wider uppercase mb-6 border border-white/20">
            Grow With Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            Build Your Wellness Business With Ayurdhara Divya Shakti
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Choose your preferred business model and grow with us as a Customer, Wellness Partner, Retail Shop, or Distributor.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#join" className="w-full sm:w-auto px-8 py-4 bg-[#E88B23] hover:bg-[#D9381E] text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-[#E88B23]/30">
              Become a Wellness Partner
            </Link>
            <Link href="#join" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-[#2D5A27] rounded-full font-bold text-lg transition-all shadow-lg border border-transparent hover:border-[#2D5A27]">
              Become a Distributor
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Product Pricing Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">Product Pricing Structure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Transparent and profitable pricing tiers for every business level.</p>
          </div>
          
          <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-100 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8faf8] text-[#2D5A27]">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm border-b border-gray-100 whitespace-nowrap">Product</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm border-b border-gray-100 text-center whitespace-nowrap">MRP</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm border-b border-gray-100 text-center whitespace-nowrap">Customer</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm border-b border-gray-100 text-center whitespace-nowrap text-[#E88B23]">Wellness Partner</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm border-b border-gray-100 text-center whitespace-nowrap">Retail Shop</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-sm border-b border-gray-100 text-center whitespace-nowrap">Distributor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: "Nabhi Oil Blend 10 ml", mrp: "₹299", customer: "₹199", partner: "₹199 + ₹20 Referral", retail: "₹140", dist: "₹120" },
                  { name: "Nabhi Oil Blend 60 ml", mrp: "₹1,199", customer: "₹899", partner: "₹899 + ₹90 Referral", retail: "₹650", dist: "₹560" },
                  { name: "Feet Wellness Oil 20 ml", mrp: "₹499", customer: "₹349", partner: "₹349 + ₹35 Referral", retail: "₹250", dist: "₹210" },
                  { name: "Feet Wellness Oil 200 ml", mrp: "₹2,999", customer: "₹1,999", partner: "₹1,999 + ₹200 Referral", retail: "₹1,450", dist: "₹1,250" },
                  { name: "Hair Wellness Oil 50 ml", mrp: "₹799", customer: "₹499", partner: "₹499 + ₹50 Referral", retail: "₹350", dist: "₹300" },
                  { name: "Hair Wellness Oil 100 ml", mrp: "₹1,399", customer: "₹899", partner: "₹899 + ₹90 Referral", retail: "₹650", dist: "₹560" },
                  { name: "Hair Wellness Oil 200 ml", mrp: "₹2,499", customer: "₹1,599", partner: "₹1,599 + ₹160 Referral", retail: "₹1,150", dist: "₹990" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-800 border-r border-gray-50 whitespace-nowrap">{row.name}</td>
                    <td className="py-4 px-6 text-gray-500 line-through text-center border-r border-gray-50">{row.mrp}</td>
                    <td className="py-4 px-6 font-medium text-gray-800 text-center border-r border-gray-50">{row.customer}</td>
                    <td className="py-4 px-6 font-bold text-[#E88B23] text-center border-r border-gray-50 bg-[#E88B23]/5">{row.partner}</td>
                    <td className="py-4 px-6 font-medium text-[#4B7B3B] text-center border-r border-gray-50">{row.retail}</td>
                    <td className="py-4 px-6 font-bold text-[#2D5A27] text-center">{row.dist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 bg-[#E88B23]/10 border border-[#E88B23]/20 rounded-xl">
            <ShieldCheck className="text-[#E88B23] flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              <span className="font-bold text-[#E88B23]">Note:</span> Wellness Partners purchase products at the same price as customers and earn referral commission only after successful order delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Wellness Pack Pricing */}
      <section className="py-20 bg-[#f8faf8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">Wellness Packs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Premium curated packs for comprehensive wellness.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Trial Starter", mrp: "₹1,597", customer: "₹1,047", partner: "₹1,047 + ₹105", retail: "₹740", dist: "₹630" },
              { name: "Gold Wellness Pack", mrp: "₹3,997", customer: "₹2,597", partner: "₹2,597 + ₹260", retail: "₹1,900", dist: "₹1,630" },
              { name: "Premium Wellness Pack", mrp: "₹6,697", customer: "₹4,497", partner: "₹4,497 + ₹450", retail: "₹3,250", dist: "₹2,800" },
              { name: "Family Gold", mrp: "₹7,994", customer: "₹5,194", partner: "₹5,194 + ₹520", retail: "₹3,800", dist: "₹3,260" },
              { name: "Family Premium (3 Person)", mrp: "₹20,091", customer: "₹13,491", partner: "₹13,491 + ₹1,350", retail: "₹9,750", dist: "₹8,400" },
              { name: "Family Premium (4 Person)", mrp: "₹26,788", customer: "₹17,988", partner: "₹17,988 + ₹1,800", retail: "₹13,000", dist: "₹11,200" },
            ].map((pack, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white hover:border-[#E88B23]/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#E88B23]/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                <h3 className="text-xl font-bold text-[#2D5A27] mb-6">{pack.name}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">MRP</span>
                    <span className="line-through text-gray-400 font-medium">{pack.mrp}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                    <span className="font-semibold text-gray-700">Customer</span>
                    <span className="font-bold text-gray-800">{pack.customer}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-[#E88B23]/20 pb-2 bg-[#E88B23]/5 -mx-4 px-4 py-1 rounded">
                    <span className="font-bold text-[#E88B23]">Wellness Partner</span>
                    <span className="font-bold text-[#E88B23]">{pack.partner}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="font-semibold text-gray-700">Retail Shop</span>
                    <span className="font-bold text-[#4B7B3B]">{pack.retail}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-gray-700">Distributor</span>
                    <span className="font-bold text-[#2D5A27]">{pack.dist}</span>
                  </div>
                </div>

                <Link href="#join" className="block w-full py-3 text-center rounded-xl bg-[#2D5A27] text-white font-bold hover:bg-[#1A3816] transition-colors shadow-md">
                  Select Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Order Policy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">Partnership Requirements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Clear, straightforward policies for every level of partnership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Customer */}
            <div className="bg-[#f8faf8] rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#4B7B3B]">
                <User size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#2D5A27] mb-6">Customer</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#4B7B3B] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700 font-medium">No minimum order requirement.</span>
                </li>
              </ul>
            </div>

            {/* Wellness Partner */}
            <div className="bg-[#E88B23]/10 rounded-2xl p-8 border border-[#E88B23]/30 shadow-md relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#E88B23] text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Popular</div>
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#E88B23]">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#2D5A27] mb-6">Wellness Partner</h3>
              <ul className="space-y-4">
                {[
                  "Free joining",
                  "No joining fee",
                  "No stock required",
                  "Earn referral commission",
                  "Online dashboard"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#E88B23] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-800 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Retail Shop */}
            <div className="bg-[#f8faf8] rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#4B7B3B]">
                <Store size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#2D5A27] mb-6">Retail Shop</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#4B7B3B] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700 font-medium">First order ₹10,000</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#4B7B3B] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700 font-medium">Reorder ₹5,000</span>
                </li>
              </ul>
            </div>

            {/* Distributor */}
            <div className="bg-[#2D5A27] text-white rounded-2xl p-8 shadow-xl">
              <div className="w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center mb-6 text-white">
                <Truck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Distributor</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#E88B23] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white/90 font-medium">First order ₹50,000</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#E88B23] flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-white/90 font-medium">Reorder ₹25,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Join Ayurdhara? */}
      <section className="py-20 bg-[#f8faf8] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">Why Join Ayurdhara?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the benefits of partnering with a premium wellness brand.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Free Joining", icon: <Users size={24} />, desc: "Start your wellness journey with absolutely zero joining fees or hidden charges." },
              { title: "No Inventory Required", icon: <ShoppingBag size={24} />, desc: "As a Wellness Partner, you don't need to maintain any stock or handle shipping." },
              { title: "Referral Income", icon: <IndianRupee size={24} />, desc: "Earn attractive referral commissions on every successful delivery made through your network." },
              { title: "Transparent Pricing", icon: <ShieldCheck size={24} />, desc: "Clear, structured pricing tiers ensuring profitable margins across all business levels." },
              { title: "Premium Products", icon: <Store size={24} />, desc: "Access our exclusive range of high-quality, authentic Ayurvedic wellness products." },
              { title: "Business Growth", icon: <CheckCircle2 size={24} />, desc: "Scale your business from a Partner to a Retail Shop or Distributor seamlessly." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-full bg-[#E88B23]/10 flex items-center justify-center text-[#E88B23] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2D5A27] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Referral Policy */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-[#2D5A27] text-white rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 relative z-10 flex items-center gap-3">
              <ShieldCheck className="text-[#E88B23]" size={32} />
              Referral Policy
            </h2>
            
            <div className="space-y-4 relative z-10 text-lg text-white/90">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[#E88B23] mt-2.5 flex-shrink-0"></div>
                <p>Referral commission is paid <strong className="text-white">only after successful delivery</strong>.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[#E88B23] mt-2.5 flex-shrink-0"></div>
                <p>No commission is paid on cancelled, returned, or refunded orders.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-[#E88B23] mt-2.5 flex-shrink-0"></div>
                <p>Monthly payout is processed after thorough verification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 bg-[#f8faf8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D5A27] mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How can I become a Wellness Partner?", a: "You can become a Wellness Partner by simply registering through our online portal. Select the Wellness Partner option during signup and complete your profile to access your dashboard." },
              { q: "Is joining free?", a: "Yes, joining as a Customer or Wellness Partner is completely free with no hidden or annual charges." },
              { q: "Do I need to purchase stock?", a: "No, as a Wellness Partner you do not need to purchase or hold any inventory. You simply refer products, and we handle the fulfillment." },
              { q: "When is referral commission paid?", a: "Commissions are calculated and paid monthly, strictly after the successful delivery and verification of the referred orders." },
              { q: "What is the minimum distributor order?", a: "To become a Distributor, your first order must be at least ₹50,000, and subsequent reorders must be a minimum of ₹25,000." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#2D5A27] mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final Call To Action */}
      <section id="join" className="py-24 bg-white border-t border-gray-100 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D5A27] mb-8">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Join the Ayurdhara Divya Shakti family today and turn your passion for wellness into a thriving business.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/register" className="w-full md:w-auto px-8 py-4 bg-[#E88B23] hover:bg-[#D9381E] text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Become a Wellness Partner
            </Link>
            <Link href="/register" className="w-full md:w-auto px-8 py-4 bg-[#f8faf8] hover:bg-gray-100 text-[#2D5A27] border border-[#2D5A27]/20 hover:border-[#2D5A27] rounded-full font-bold text-lg transition-all shadow-sm">
              Become a Retail Shop
            </Link>
            <Link href="/register" className="w-full md:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-[#2D5A27] border border-[#2D5A27] rounded-full font-bold text-lg transition-all shadow-sm">
              Become a Distributor
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Join Now Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 z-[9000] md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <Link href="#join" className="flex items-center justify-center w-full py-3.5 bg-[#2D5A27] text-white rounded-xl font-bold text-lg shadow-lg">
          Join Now <ChevronRight size={20} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

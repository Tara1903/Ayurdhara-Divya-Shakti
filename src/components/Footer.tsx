import Link from 'next/link';
import { Sparkles, Smartphone, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#14261C] text-stone-200 pt-16 pb-10 border-t-4 border-[#D4AF37]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Mission */}
          <div>
            <span className="text-2xl font-serif tracking-wide block mb-4 text-[#FFE088] font-bold">
              Ayurdhara Divya Shakti
            </span>
            <p className="text-xs leading-relaxed text-stone-300 font-medium mb-4">
              Sacred Vedic Formulations rooted in classical Charaka Samhita traditions. 
              Our 20 authentic collections span pure Cold-Pressed Ghani Oils, Nabhi Marma Drops, 
              Wild Raw Herbs, Bilona Cow Ghee, and Botanical Rasayanas — crafted to restore 
              vital Dosha harmony.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#FFE088] text-xs font-semibold">
              <ShieldCheck size={14} /> 100% Raw, Lab-Tested & Ayurvedic
            </div>
          </div>

          {/* Authentic Categories */}
          <div>
            <h4 className="text-xs font-bold mb-5 tracking-widest text-white uppercase border-b border-white/10 pb-2">
              Sacred Formulations
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium">
              <Link href="/cold-pressed-oils" className="text-stone-300 hover:text-[#FFE088] transition-colors">Cold Pressed Oils (Ghani)</Link>
              <Link href="/nabhi-oil-wellness" className="text-stone-300 hover:text-[#FFE088] transition-colors">Nabhi Wellness Oils</Link>
              <Link href="/hebs-natural-raw" className="text-stone-300 hover:text-[#FFE088] transition-colors">Hebs Natural Raw (Jadi Buti)</Link>
              <Link href="/natural-herbs-powder" className="text-stone-300 hover:text-[#FFE088] transition-colors">Natural Herbs Powder</Link>
              <Link href="/healthy-seeds" className="text-stone-300 hover:text-[#FFE088] transition-colors">Healthy Vitality Seeds</Link>
              <Link href="/morning-fresh-herbal-cup" className="text-stone-300 hover:text-[#FFE088] transition-colors">Morning Fresh Herbal Cup</Link>
              <Link href="/combo-trial-packs" className="text-stone-300 hover:text-[#FFE088] transition-colors">Combo & Trial Packs</Link>
              <Link href="/collections" className="text-[#FFE088] hover:underline font-bold mt-1">View All 20 Categories →</Link>
            </div>
          </div>

          {/* Business Opportunity & Care */}
          <div>
            <h4 className="text-xs font-bold mb-5 tracking-widest text-white uppercase border-b border-white/10 pb-2">
              Opportunity & Support
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium">
              <Link href="/business-opportunity" className="text-[#FFE088] hover:text-white transition-colors font-bold flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#D4AF37]" /> Business Opportunity Network
              </Link>
              <Link href="/mobile-app" className="text-stone-300 hover:text-[#FFE088] transition-colors flex items-center gap-1.5">
                <Smartphone size={14} /> Download Mobile App
              </Link>
              <Link href="/wellness-guide/how-to-use" className="text-stone-300 hover:text-[#FFE088] transition-colors">Ayurvedic Usage Guide</Link>
              <Link href="/faq" className="text-stone-300 hover:text-[#FFE088] transition-colors">FAQs & Purity Standards</Link>
              <Link href="/account/orders" className="text-stone-300 hover:text-[#FFE088] transition-colors">Track Your Order</Link>
              <Link href="/membership" className="text-stone-300 hover:text-[#FFE088] transition-colors">Divya Shakti Membership</Link>
            </div>
          </div>

          {/* Vedic Newsletter */}
          <div>
            <h4 className="text-xs font-bold mb-5 tracking-widest text-white uppercase border-b border-white/10 pb-2">
              Dinacharya Circle
            </h4>
            <p className="text-xs mb-4 text-stone-300 font-medium leading-relaxed">
              Join our sacred community to receive seasonal Ritucharya guidance, ancient herbal recipes, and member privileges.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full p-2.5 bg-white/10 border border-white/15 text-white placeholder-stone-400 text-xs rounded-lg focus:outline-none focus:border-[#FFE088] transition-colors" 
              />
              <button className="w-full p-2.5 bg-[#FFE088] hover:bg-[#D4AF37] text-[#241A00] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm">
                Join Circle
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="pt-8 border-t border-white/10 text-center mb-6">
          <p className="text-[11px] text-stone-400 font-medium max-w-4xl mx-auto leading-relaxed">
            Disclaimer: These traditional formulations are crafted for holistic wellness, self-care, and daily vitality rituals. Product information is not intended to substitute professional medical counsel, diagnose, treat, or cure medical conditions.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400 font-medium">
          <span>&copy; {new Date().getFullYear()} Ayurdhara Divya Shakti. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/account-deletion" className="hover:text-white transition-colors">Account Deletion</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

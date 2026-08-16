"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check } from "lucide-react";

interface WellnessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WellnessPopup({ isOpen, onClose }: WellnessPopupProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const features = [
    "Age-specific wellness blends",
    "Premium cold-pressed oil base",
    "Carefully selected herbal ingredients",
    "Simple 5-minute daily routine",
    "Trial, Gold & Premium wellness packs",
    "Individual & Family wellness options",
    "Easy online ordering",
    "Premium packaging & doorstep delivery"
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#f8faf8] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-white/90 shadow-sm hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Image Section (Left on Desktop, Top on Mobile) */}
        <div className="relative w-full h-48 md:h-auto md:w-5/12 bg-green-50 shrink-0">
          <Image 
            src="/images/placeholder.jpg" 
            alt="Ayurdhara Wellness Ritual" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D5A27]/80 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#2D5A27]/20" />
          <div className="absolute bottom-6 left-6 text-white md:hidden">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E88B23] mb-1">🌿 Ayurdhara Divya Shakti</p>
            <h3 className="font-bold text-xl leading-tight">Your Everyday<br />Wellness Ritual</h3>
          </div>
        </div>

        {/* Content Section (Right on Desktop, Bottom on Mobile) - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 hide-scrollbar">
          <div className="max-w-xl mx-auto">
            
            <div className="hidden md:block mb-6">
              <p className="text-xs font-bold text-[#E88B23] uppercase tracking-widest mb-2">
                🌿 Ayurdhara Divya Shakti
              </p>
              <h2 className="text-3xl font-bold text-[#2D5A27] leading-tight">
                Your Everyday<br />Wellness Ritual
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-1">
                आपका रोज़ का Wellness Ritual
              </p>
            </div>

            {/* Hook Box */}
            <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm mb-8 text-center">
              <p className="text-[#4B7B3B] font-bold text-base sm:text-lg">
                5 Minutes. 2 Simple Steps. Daily Self-Care.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                सिर्फ 5 मिनट — 2 आसान कदम — रोज़ की Self-Care.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8 text-sm text-gray-700">
              <div className="flex gap-3">
                <span className="text-xl leading-none">🪔</span>
                <div>
                  <p className="font-bold text-[#2D5A27]">Nabhi Wellness Oil Blends</p>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">Age & lifestyle-focused wellness blends for Kids, Men, Women & Seniors.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-xl leading-none">👣</span>
                <div>
                  <p className="font-bold text-[#2D5A27]">Feet Massage Oil</p>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">A soothing massage ritual for your feet and everyday relaxation.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-xl leading-none">🌿</span>
                <div>
                  <p className="font-bold text-[#2D5A27]">Natural Oil-Based Wellness Care</p>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">Crafted with carefully selected oils and traditional herbal ingredients.</p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-[#2D5A27]/5 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-[#2D5A27] mb-1">WHY CHOOSE US?</h3>
              <p className="text-sm text-gray-500 mb-4">क्यों चुनें हमें?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check size={16} className="text-[#4B7B3B] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mb-8">
              <h3 className="font-bold text-[#2D5A27] text-lg flex items-center justify-center gap-2">
                💚 YOUR WELLNESS. YOUR ROUTINE.
              </h3>
              <p className="text-sm text-gray-600 mt-1 mb-3">आपका Wellness — आपकी रोज़ की आदत।</p>
              <p className="text-[#E88B23] font-semibold text-sm">Start small. Stay consistent.</p>
              <p className="text-gray-500 text-sm mt-0.5">आज से अपनी daily wellness routine शुरू करें।</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link 
                href="/products/trial-wellness-pack" 
                onClick={onClose}
                className="flex-1 py-3.5 px-6 text-center text-sm font-bold text-white bg-gradient-to-r from-[#2D5A27] to-[#3a7232] rounded-xl hover:shadow-lg hover:shadow-[#2D5A27]/20 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                START WITH TRIAL PACK
              </Link>
              <Link 
                href="/collections" 
                onClick={onClose}
                className="py-3.5 px-8 text-center text-sm font-bold text-[#2D5A27] bg-green-50 rounded-xl hover:bg-green-100 transition-colors whitespace-nowrap"
              >
                SHOP ALL BLENDS
              </Link>
            </div>
            
            <p className="text-[10px] text-center text-gray-400 leading-relaxed max-w-md mx-auto pb-4">
              For external wellness/self-care use. Product benefits are intended as general wellness support and are not claims to diagnose, treat or cure disease.
            </p>
            
          </div>
        </div>
      </div>
      
      {/* Hide Scrollbar Style */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

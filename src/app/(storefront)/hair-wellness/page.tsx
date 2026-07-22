'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Droplets, Sparkles, Star, Heart } from 'lucide-react';
import './hair-wellness.css';

export default function HairWellnessPage() {
  useEffect(() => {
    // Reveal animations on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(s => observer.observe(s));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hair-wellness-page min-h-screen bg-sand text-charcoal">
      {/* Hero Section */}
      <section className="hair-hero relative pt-32 pb-16 px-6 lg:px-12 flex flex-col items-center text-center">
        <span className="text-overline text-gold mb-6 tracking-widest uppercase fade-in-section">Ayurdhara Divya Shakti</span>
        <h1 className="text-display italic text-forest mb-6 max-w-4xl fade-in-section">
          Nourish Your Crown with Timeless Ayurvedic Wisdom
        </h1>
        <p className="text-body max-w-2xl text-stone mb-12 fade-in-section">
          Experience the ultimate scalp and hair care. Our Hair Wellness Oil is a luxurious blend of premium base oils and traditional Ayurvedic herbs designed to deeply condition, soften, and nourish your hair.
        </p>
        <Link href="/products/hair-wellness-oil" className="btn btn-primary magnetic fade-in-section">
          Discover Hair Wellness Oil
        </Link>
      </section>

      {/* Base Oils Section */}
      <section className="py-24 px-6 lg:px-12 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-section">
            <h2 className="text-title text-forest mb-4">Premium Base Oil Blend</h2>
            <p className="text-body text-stone max-w-2xl mx-auto">
              A foundational blend of nature's most nourishing oils, carefully selected to provide intense hydration, deep conditioning, and a healthy-looking shine.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center fade-in-section">
            {[
              { name: 'Olive Oil', desc: 'Moisturizing' },
              { name: 'Coconut Oil', desc: 'Hydrating' },
              { name: 'Sesame Oil', desc: 'Deep Penetrating' },
              { name: 'Sweet Almond Oil', desc: 'Vitamin Rich' },
              { name: 'Mustard Oil', desc: 'Invigorating' },
              { name: 'Castor Oil', desc: 'Thickening' }
            ].map((oil, i) => (
              <div key={i} className="oil-card p-6 bg-sand rounded-xl shadow-soft">
                <Droplets className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-display text-lg text-forest mb-2">{oil.name}</h3>
                <span className="text-xs text-stone uppercase tracking-wide">{oil.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Herbs Section */}
      <section className="py-24 px-6 lg:px-12 bg-forest text-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-section">
            <h2 className="text-title mb-4">Traditional Ayurvedic Herbs</h2>
            <p className="text-body max-w-2xl mx-auto opacity-80">
              Infused with powerful botanicals renowned in Ayurveda for their remarkable ability to rejuvenate the scalp and promote healthy, vibrant hair.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-section">
            {[
              { name: 'Bhringraj', desc: 'The "King of Herbs" for lustrous hair vitality.' },
              { name: 'Amla', desc: 'Rich in Vitamin C for robust scalp nourishment.' },
              { name: 'Brahmi', desc: 'Calms the mind while deeply conditioning the roots.' },
              { name: 'Fenugreek', desc: 'Adds softness and natural volume.' },
              { name: 'Hibiscus', desc: 'Enhances natural shine and color.' },
              { name: 'Neem', desc: 'Purifies and maintains a clean, balanced scalp.' },
              { name: 'Rosemary', desc: 'Invigorates the scalp for healthy-looking hair.' },
              { name: 'Aloe Vera', desc: 'Soothes and intensely hydrates every strand.' }
            ].map((herb, i) => (
              <div key={i} className="herb-card p-8 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                <Leaf className="w-6 h-6 text-gold mb-4" />
                <h3 className="font-display text-xl mb-3">{herb.name}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{herb.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routine Section */}
      <section className="py-24 px-6 lg:px-12 bg-sand text-center">
        <div className="max-w-3xl mx-auto fade-in-section">
          <h2 className="text-title text-forest mb-8">The Weekly Ritual</h2>
          <div className="bg-ivory p-8 rounded-2xl shadow-soft">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="flex-1">
                <span className="text-gold font-bold text-lg block mb-2">01</span>
                <h3 className="text-xl text-forest mb-2">Warm & Apply</h3>
                <p className="text-sm text-stone">Gently warm the oil and massage deeply into your scalp and hair length.</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-stone/20"></div>
              <div className="flex-1">
                <span className="text-gold font-bold text-lg block mb-2">02</span>
                <h3 className="text-xl text-forest mb-2">Rest & Absorb</h3>
                <p className="text-sm text-stone">Leave on for at least an hour, or overnight for maximum nourishment.</p>
              </div>
              <div className="hidden md:block w-px h-16 bg-stone/20"></div>
              <div className="flex-1">
                <span className="text-gold font-bold text-lg block mb-2">03</span>
                <h3 className="text-xl text-forest mb-2">Cleanse</h3>
                <p className="text-sm text-stone">Wash out with a gentle, natural cleanser to reveal soft, vibrant hair.</p>
              </div>
            </div>
            <Link href="/collections" className="link-editorial text-sm">Shop Hair Combos &rarr;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

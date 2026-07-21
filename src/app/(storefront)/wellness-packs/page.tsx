'use client';
import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Droplets, Gift, Sun, Leaf, TestTube } from 'lucide-react';
import './wellness-packs.css';

const categories = [
  {
    title: "Trial Starter Pack",
    subtitle: "Daily resilience, routine support, and wellness picks.",
    href: "/products/individual-trial-combo",
    image: "/images/categories/trial-starter.jpg",
    icon: <Shield size={20} strokeWidth={1.5} />,
    badge: "POPULAR"
  },
  {
    title: "Gold Trial (Super Starter)",
    subtitle: "Advanced support and family-ready wellness picks.",
    href: "/products/family-trial-pack",
    image: "/images/categories/gold-trial.jpg",
    icon: <TestTube size={20} strokeWidth={1.5} />
  },
  {
    title: "Gold Wellness Course",
    subtitle: "Individual wellness routines for a softer night.",
    href: "/products/individual-gold-wellness-pack",
    image: "/images/categories/gold-wellness.jpg",
    icon: <Sparkles size={20} strokeWidth={1.5} />
  },
  {
    title: "Family Gold Wellness Course",
    subtitle: "Beauty-support powders and family-led routines.",
    href: "/products/family-gold-wellness-pack",
    image: "/images/categories/family-gold.jpg",
    icon: <Sun size={20} strokeWidth={1.5} />
  },
  {
    title: "Premium Wellness Course",
    subtitle: "Ingredient-led shopping for calmer, more ritual-driven lives.",
    href: "/products/premium-wellness-pack",
    image: "/images/categories/premium-course.jpg",
    icon: <Leaf size={20} strokeWidth={1.5} />
  },
  {
    title: "Hair Trial Combo",
    subtitle: "Single oils and blends built for quick daily hair wellness habits.",
    href: "/products/hair-trial-combo",
    image: "/images/categories/hair-combo.png",
    icon: <Droplets size={20} strokeWidth={1.5} />,
    badge: "NEW"
  },
  {
    title: "Hair Gold Wellness Combo",
    subtitle: "Premium combos and flagship kits that feel giftable.",
    href: "/products/hair-gold-wellness-combo",
    image: "/images/categories/hair-gold.png",
    icon: <Gift size={20} strokeWidth={1.5} />
  }
];

export default function WellnessPacksPage() {
  return (
    <div className="wellness-packs-page bg-ivory pb-64 pt-32 min-h-screen">
      <div className="container">
        
        <div className="wellness-packs-header mb-48 pt-24">
          <p className="text-overline text-gold mb-16 uppercase tracking-widest text-sm">Our Main Offerings</p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-24">
            <h1 className="text-display text-forest font-serif" style={{ fontSize: '3.5rem', lineHeight: 1.1 }}>
              Fast category scanning built for real shopping behavior.
            </h1>
            <p className="text-body text-stone max-w-sm md:text-right">
              Browse by need instead of digging through long copy blocks. Select a category below to discover your perfect regimen.
            </p>
          </div>
        </div>

        <div className="wellness-packs-grid">
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.href} className="wellness-pack-card group">
              <div className="wpc-bg">
                <img src={cat.image} alt={cat.title} />
                <div className="wpc-gradient"></div>
              </div>
              
              <div className="wpc-content">
                <div className="flex justify-between items-start mb-auto">
                  <div className="wpc-icon">
                    {cat.icon}
                  </div>
                  {cat.badge && (
                    <div className="wpc-badge">
                      {cat.badge}
                    </div>
                  )}
                </div>
                
                <div className="wpc-text-content">
                  <h3 className="wpc-title font-serif">{cat.title}</h3>
                  <p className="wpc-subtitle">{cat.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

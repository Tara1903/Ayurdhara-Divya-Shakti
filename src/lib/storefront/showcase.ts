import type { Product } from "@/types";

export interface ProductShowcaseMeta {
  rating: number;
  reviewCount: number;
  ctaLabel: string;
  trustLabel: string;
  badge?: string;
}

const showcaseMetaBySlug: Record<string, ProductShowcaseMeta> = {
  "ayur-therapy-premium-immunity-kit": {
    rating: 4.9,
    reviewCount: 182,
    ctaLabel: "Shop Kit",
    trustLabel: "Premium pick",
    badge: "Premium",
  },
  "purush-shakti-9-in-1-wellness-kit": {
    rating: 4.8,
    reviewCount: 146,
    ctaLabel: "Shop Kit",
    trustLabel: "Best seller",
    badge: "Best Seller",
  },
  "stree-arogya-9-in-1-wellness-kit": {
    rating: 4.8,
    reviewCount: 168,
    ctaLabel: "Shop Kit",
    trustLabel: "Most loved",
    badge: "Most Popular",
  },
  "bal-sanrakshan-9-in-1-wellness-kit": {
    rating: 4.7,
    reviewCount: 74,
    ctaLabel: "View Kit",
    trustLabel: "Gentle care",
    badge: "Gentle Care",
  },
  "vriddha-seva-9-in-1-wellness-kit": {
    rating: 4.8,
    reviewCount: 89,
    ctaLabel: "View Kit",
    trustLabel: "Comfort focused",
    badge: "Senior Care",
  },
  "parivar-swasthya-9-in-1-wellness-kit": {
    rating: 4.8,
    reviewCount: 126,
    ctaLabel: "Shop Kit",
    trustLabel: "Family favorite",
    badge: "Family Pick",
  },
  "immunity-support-combo": {
    rating: 4.7,
    reviewCount: 92,
    ctaLabel: "View Combo",
    trustLabel: "Popular bundle",
    badge: "Organic",
  },
  "family-daily-combo": {
    rating: 4.7,
    reviewCount: 88,
    ctaLabel: "View Combo",
    trustLabel: "Shared routine",
    badge: "Popular",
  },
  "hair-ritual-combo": {
    rating: 4.6,
    reviewCount: 61,
    ctaLabel: "View Combo",
    trustLabel: "Beauty bundle",
    badge: "Save ₹200",
  },
  "skin-balance-combo": {
    rating: 4.7,
    reviewCount: 67,
    ctaLabel: "View Combo",
    trustLabel: "Glow support",
    badge: "Popular",
  },
  "amla-rasayan-powder": {
    rating: 4.8,
    reviewCount: 109,
    ctaLabel: "View Product",
    trustLabel: "Daily immunity",
    badge: "Organic",
  },
  "jeera-digestive-comfort-powder": {
    rating: 4.7,
    reviewCount: 93,
    ctaLabel: "View Product",
    trustLabel: "Daily comfort",
    badge: "Popular",
  },
  "moringa-energy-blend": {
    rating: 4.6,
    reviewCount: 72,
    ctaLabel: "View Product",
    trustLabel: "Morning ritual",
    badge: "New",
  },
  "lodhra-skin-balance-powder": {
    rating: 4.7,
    reviewCount: 84,
    ctaLabel: "View Product",
    trustLabel: "Beauty ritual",
    badge: "Organic",
  },
  "keshya-hair-support-powder": {
    rating: 4.7,
    reviewCount: 77,
    ctaLabel: "View Product",
    trustLabel: "Beauty support",
    badge: "Popular",
  },
  "nabhik-digestive-support-oil": {
    rating: 4.8,
    reviewCount: 115,
    ctaLabel: "View Product",
    trustLabel: "Core ritual",
    badge: "Organic",
  },
  "feet-relax-grounding-oil": {
    rating: 4.9,
    reviewCount: 132,
    ctaLabel: "View Product",
    trustLabel: "Night ritual",
    badge: "Bestseller",
  },
  "nasal-clarity-support-oil": {
    rating: 4.6,
    reviewCount: 58,
    ctaLabel: "View Product",
    trustLabel: "Ayurvedic pick",
    badge: "New",
  },
  "keshya-hair-oil": {
    rating: 4.7,
    reviewCount: 81,
    ctaLabel: "View Product",
    trustLabel: "Beauty care",
    badge: "Popular",
  },
  "body-relief-oil": {
    rating: 4.7,
    reviewCount: 69,
    ctaLabel: "View Product",
    trustLabel: "Comfort ritual",
    badge: "Organic",
  },
};

function getDefaultMeta(product: Product): ProductShowcaseMeta {
  if (product.type === "wellness-kit") {
    return {
      rating: 4.8,
      reviewCount: 96,
      ctaLabel: "Shop Kit",
      trustLabel: "9-in-1 system",
      badge: product.badge,
    };
  }

  if (product.type === "combo") {
    return {
      rating: 4.7,
      reviewCount: 54,
      ctaLabel: "View Combo",
      trustLabel: "Bundle offer",
      badge: product.badge,
    };
  }

  return {
    rating: 4.7,
    reviewCount: 48,
    ctaLabel: "View Product",
    trustLabel: "Daily wellness",
    badge: product.badge,
  };
}

export function getProductShowcaseMeta(product: Product): ProductShowcaseMeta {
  return showcaseMetaBySlug[product.slug] ?? getDefaultMeta(product);
}

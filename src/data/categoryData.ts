export interface SubCategory {
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
  description: string;
  subcategories: SubCategory[];
}

export const navigationData: Category[] = [
  {
    name: "Oil Wellness Care",
    slug: "oil-wellness-care",
    description: "Traditional Ayurvedic oil blends for deep nourishment and holistic healing.",
    subcategories: [
      { name: "Kids Care Oil Blend", slug: "kids-care" },
      { name: "Men's Care Oil Blend", slug: "men-wellness" },
      { name: "Women's Care Oil Blend", slug: "women-wellness" },
      { name: "Senior Care Oil Blend", slug: "senior-care" },
      { name: "Nabhi Trial Packs", slug: "nabhi-trial-packs" },
      { name: "Feet Massage Oils", slug: "feet-massage-oil" },
      { name: "Body Massage Oil", slug: "body-massage-oil" },
      { name: "Hair Wellness Oil", slug: "hair-wellness-oil" },
      { name: "Combo Trial Packs", slug: "combo-trial-packs" },
    ]
  },
  {
    name: "Raw Herbs",
    slug: "raw-herbs",
    description: "Pure, wild-harvested raw herbs sourced directly from nature.",
    subcategories: [
      { name: "Single Herbs", slug: "single-herbs" },
      { name: "Premium Herbs", slug: "premium-herbs" },
      { name: "Seasonal Collections", slug: "seasonal-collections" },
    ]
  },
  {
    name: "Herbal Powders",
    slug: "herbal-powders",
    description: "Finely ground herbal powders for daily nutrition and wellness.",
    subcategories: [
      { name: "Single Herb Powder", slug: "single-herb-powder" },
      { name: "Wellness Powder Blends", slug: "wellness-powder-blends" },
      { name: "Superfood Powders", slug: "superfood-powders" },
      { name: "Daily Nutrition Powders", slug: "daily-nutrition-powders" },
    ]
  },
  {
    name: "Herbal Capsules",
    slug: "herbal-capsules",
    description: "Convenient and potent herbal capsules for targeted health goals.",
    subcategories: [
      { name: "Single Herb Capsules", slug: "single-herb-capsules" },
      { name: "Wellness Capsules", slug: "wellness-capsules" },
      { name: "Daily Care Capsules", slug: "daily-care-capsules" },
      { name: "Premium Herbal Capsules", slug: "premium-herbal-capsules" },
    ]
  },
  {
    name: "Herbal Tea & Drinks",
    slug: "herbal-tea-drinks",
    description: "Soothing herbal teas, traditional kadhas, and wellness drinks.",
    subcategories: [
      { name: "Herbal Teas", slug: "herbal-teas" },
      { name: "Kadha", slug: "kadha" },
      { name: "Wellness Drinks", slug: "wellness-drinks" },
    ]
  },
  {
      name: "Natural Foods",
      slug: "natural-foods",
      description: "Pure, unprocessed natural foods for a healthy lifestyle.",
      subcategories: [
        { name: "Cold Pressed Oils", slug: "cold-pressed-oils" },
        { name: "Honey", slug: "honey" },
        { name: "Ghee", slug: "ghee" },
        { name: "Dry Fruits", slug: "dry-fruits" },
        { name: "Seeds", slug: "seeds" },
        { name: "Jaggery", slug: "jaggery" }
      ]
    },
  {
    name: "Pure Spices",
    slug: "pure-spices",
    description: "Authentic, unadulterated spices for wellness and culinary perfection.",
    subcategories: [
      { name: "Whole Spices", slug: "whole-spices" },
      { name: "Powdered Spices", slug: "powdered-spices" },
      { name: "Spice Blends", slug: "spice-blends" },
      { name: "Ayurvedic Spices", slug: "ayurvedic-spices" },
    ]
  },
  {
    name: "Wellness Packs",
    slug: "wellness-packs",
    description: "Curated Nabhi trial packs, feet massage oils, and complete wellness combos.",
    subcategories: [
      { name: "Combo Trial Packs", slug: "combo-trial-packs" },
      { name: "Nabhi Trial Packs", slug: "nabhi-trial-packs" },
      { name: "Feet Massage Oils", slug: "feet-massage-oil" },
    ]
  },
  {
    name: "Natural Aroma",
    slug: "natural-aroma",
    description: "Pure-inspired aromas, therapeutic essential oils and wellness fragrances for everyday self-care, relaxation and natural living.",
    subcategories: [
      { name: "Essential Oils", slug: "essential-oils" },
      { name: "Natural Fragrance", slug: "natural-fragrance" },
      { name: "Wellness Aroma", slug: "wellness-aroma" },
      { name: "Diffuser Blends", slug: "diffuser-blends" },
      { name: "Essential Oil Combos", slug: "essential-oil-combos" }
    ]
  }
];

export const wellnessGuideLinks = [
  { name: "How to Use", slug: "/wellness-guide/how-to-use" },
  { name: "Daily Wellness Routine", slug: "/wellness-guide/daily-wellness-routine" },
  { name: "Blogs", slug: "/blog" },
  { name: "FAQs", slug: "/faq" },
];

export const accountLinks = [
  { name: "Login", slug: "/login" },
  { name: "Orders", slug: "/account/orders" },
  { name: "Wishlist", slug: "/account/wishlist" },
  { name: "Membership", slug: "/membership" },
];

const categorySlugAliases: Record<string, string> = {
  "cold-pressed-oils": "oil-wellness-care",
  "healthy-seeds": "natural-foods",
  "kids-wellness-products": "oil-wellness-care",
  "men-wellness-products": "oil-wellness-care",
  "women-wellness-products": "oil-wellness-care",
  "senior-wellness-products": "oil-wellness-care",
  "nabhi-oil-wellness": "oil-wellness-care",
  "body-massage-oil": "oil-wellness-care",
  "morning-fresh-herbal-cup": "herbal-tea-drinks",
  "hebs-natural-raw": "raw-herbs",
  "natural-herbs-powder": "herbal-powders",
  "raw-spices": "pure-spices",
  "powder-shape-spices-herbs": "pure-spices",
  "dry-fruits-and-nuts": "natural-foods",
  "super-foods": "natural-foods",
  "feet-wellness-oil": "oil-wellness-care",
  "natural-sweetner-raw-honey": "natural-foods",
  "herbal-teas": "herbal-tea-drinks",
  "herbal-tea": "herbal-tea-drinks",
  "combo-trial-packs": "wellness-packs",
  "desi-ghee": "natural-foods",
  "natural-fragrance-essential-oils": "natural-aroma",
};

export function getCategoryBySlug(slug: string): Category | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  const canonical = categorySlugAliases[clean] || clean;

  if (canonical === 'natural-aroma' || clean === 'natural-aroma' || clean === 'natural-fragrance-essential-oils') {
    return navigationData.find(cat => cat.slug === 'natural-aroma');
  }

  return (
    navigationData.find(cat => cat.slug.toLowerCase() === canonical) ||
    navigationData.find(cat => cat.slug.toLowerCase() === clean)
  );
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): SubCategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find(sub => sub.slug === subcategorySlug);
}

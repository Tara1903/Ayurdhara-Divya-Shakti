export interface SubCategory {
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
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
      { name: "Nabhi Oil Blends", slug: "nabhi-oil-blends" },
      { name: "Feet Wellness Oil", slug: "feet-wellness-oil" },
      { name: "Hair Wellness Oil", slug: "hair-wellness-oil" },
      { name: "Wellness Packs", slug: "wellness-packs" },
      { name: "Family Wellness Packs", slug: "family-wellness-packs" },
    ]
  },
  {
    name: "Raw Herbs",
    slug: "raw-herbs",
    description: "Pure, wild-harvested raw herbs sourced directly from nature.",
    subcategories: [
      { name: "Single Herbs", slug: "single-herbs" },
      { name: "Premium Herbs", slug: "premium-herbs" },
      { name: "Seasonal Herbs", slug: "seasonal-herbs" },
      { name: "Herb Collection", slug: "herb-collection" },
    ]
  },
  {
    name: "Herbal Powders",
    slug: "herbal-powders",
    description: "Finely ground herbal powders for daily nutrition and wellness.",
    subcategories: [
      { name: "Single Herb Powders", slug: "single-herb-powders" },
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
      { name: "Herbal Tea", slug: "herbal-tea" },
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
      { name: "Jaggery", slug: "jaggery" },
    ]
  },
  {
    name: "Wellness Combos",
    slug: "wellness-combos",
    description: "Curated wellness combos and gift packs for comprehensive care.",
    subcategories: [
      { name: "Trial Packs", slug: "trial-packs" },
      { name: "Gold Wellness Packs", slug: "gold-wellness-packs" },
      { name: "Premium Wellness Packs", slug: "premium-wellness-packs" },
      { name: "Family Packs", slug: "family-packs" },
      { name: "Gift Packs", slug: "gift-packs" },
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

export function getCategoryBySlug(slug: string): Category | undefined {
  return navigationData.find(cat => cat.slug === slug);
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): SubCategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find(sub => sub.slug === subcategorySlug);
}

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
    description: "Traditional Ayurvedic oil blends for deep nourishment, vitality, and holistic healing.",
    subcategories: [
      { name: "Kids Care Oil Blend", slug: "kids-care-oil-blend", description: "Gentle Nabhi oil blends formulated for children." },
      { name: "Men Wellness Oil Blend", slug: "men-wellness-oil-blend", description: "Vigor, stamina, and metabolic oil blends for men." },
      { name: "Women Wellness Oil Blend", slug: "women-wellness-oil-blend", description: "Hormonal balance, radiance, and wellness blends for women." },
      { name: "Senior Care Oil Blend", slug: "senior-care-oil-blend", description: "Vata soothing, joint mobility, and sleep oils for seniors." },
      { name: "Feet Massage Oil", slug: "feet-massage-oil", description: "Traditional Padabhyanga foot massage oils for deep sleep and heat release." },
      { name: "Hair Wellness Oil", slug: "hair-wellness-oil", description: "Kshirapak Vidhi scalp & hair oils for root fortification." },
      { name: "Individual Wellness Packs", slug: "individual-wellness-packs", description: "1 to 8 Month complete personal wellness care kits." },
      { name: "Family Trial Wellness Packs", slug: "family-trial-wellness-packs", description: "1 Month trial packs for 2 to 5 family members." },
      { name: "Family Gold Wellness Packs", slug: "family-gold-wellness-packs", description: "4 Month Gold wellness regimens for 2 to 5 family members." },
    ]
  },
  {
    name: "Kids Care Oil Blend",
    slug: "kids-care-oil-blend",
    description: "Gentle, child-safe Ayurvedic Nabhi oils for focus, growth, calm, and daily defense.",
    subcategories: []
  },
  {
    name: "Men Wellness Oil Blend",
    slug: "men-wellness-oil-blend",
    description: "Ayurvedic Nabhi formulations to support male vitality, stamina, and heart balance.",
    subcategories: []
  },
  {
    name: "Women Wellness Oil Blend",
    slug: "women-wellness-oil-blend",
    description: "Holistic oil blends for female hormonal balance, glow, and daily vitality.",
    subcategories: []
  },
  {
    name: "Senior Care Oil Blend",
    slug: "senior-care-oil-blend",
    description: "Vata-pacifying Ayurvedic Nabhi oils for senior joint comfort and quiet sleep.",
    subcategories: []
  },
  {
    name: "Feet Massage Oil",
    slug: "feet-massage-oil",
    description: "Padabhyanga foot massage oils to draw out body heat and induce deep restorative sleep.",
    subcategories: []
  },
  {
    name: "Hair Wellness Oil",
    slug: "hair-wellness-oil",
    description: "Kshirapak 72-hour Ayurvedic hair oil for strong roots and dense hair.",
    subcategories: []
  },
  {
    name: "Individual Wellness Packs",
    slug: "individual-wellness-packs",
    description: "Curated Nabhi & Feet oil packs offering 1, 4, or 8 Months of complete self-care.",
    subcategories: []
  },
  {
    name: "Family Trial Wellness Packs",
    slug: "family-trial-wellness-packs",
    description: "1 Month Ayurvedic trial packs customized for 2, 3, 4, or 5 family members.",
    subcategories: []
  },
  {
    name: "Family Gold Wellness Packs",
    slug: "family-gold-wellness-packs",
    description: "4 Month Gold Ayurvedic regimens for 2, 3, 4, or 5 family members.",
    subcategories: []
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

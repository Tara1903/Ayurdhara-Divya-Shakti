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
  iconName?: string;
  image?: string;
  subcategories: SubCategory[];
}

export const navigationData: Category[] = [
  {
    id: "3b8b46d3-e5df-4bd8-aef9-d13bb7b1ec83",
    name: "Cold Pressed Oils",
    slug: "cold-pressed-oils",
    description: "Pure, raw and unrefined oils extracted in slow traditional stone ghani mills without heat, synthetic solvents, or chemical preservatives.",
    iconName: "Droplets",
    image: "/images/categories/cat_oil_wellness_1786556871303.jpg",
    subcategories: [
      { name: "Sesame Oil", slug: "sesame-oil" },
      { name: "Mustard Oil", slug: "mustard-oil" },
      { name: "Herbal Infusions", slug: "herbal-infusions" },
    ]
  },
  {
    id: "578feffe-c60c-4dbf-9016-3549d83381ae",
    name: "HEALTHY SEEDS",
    slug: "healthy-seeds",
    description: "100% Pure, raw and nutrient-dense vitality seeds. Rich in plant protein, Omega-3s, and essential minerals for gut vitality and sustained energy.",
    iconName: "Sprout",
    image: "/images/categories/cat_natural_foods_1786557531655.jpg",
    subcategories: [
      { name: "Chia Seeds", slug: "chia-seeds" },
      { name: "Flax Seeds", slug: "flax-seeds" },
      { name: "Pumpkin Seeds", slug: "pumpkin-seeds" },
      { name: "Sunflower Seeds", slug: "sunflower-seeds" },
    ]
  },
  {
    id: "edcff1f3-7890-42b0-9176-c97ff84dc33a",
    name: "Kids wellness products",
    slug: "kids-wellness-products",
    description: "Gentle, non-irritating botanical formulations, soothing body oils, and natural herbs crafted especially for children's delicate constitution.",
    iconName: "Baby",
    image: "/images/categories/cat_kids_care.jpg",
    subcategories: [
      { name: "Kids Nabhi Oils", slug: "kids-nabhi-oils" },
      { name: "Kids Massage Oils", slug: "kids-massage-oils" },
      { name: "Gentle Herb Blends", slug: "kids-gentle-herbs" },
    ]
  },
  {
    id: "a244d98b-b00b-4ab0-9e4a-eb8a02e6f58b",
    name: "Men Wellness Products",
    slug: "men-wellness-products",
    description: "Artisanal herbal blends, energizing massage oils, and restorative tonics designed to support vigor, stamina, and daily vitality in men.",
    iconName: "Dumbbell",
    image: "/images/categories/cat_mens_wellness.jpg",
    subcategories: [
      { name: "Men Strength Oils", slug: "men-strength-oils" },
      { name: "Men Vitality Blends", slug: "men-vitality-blends" },
    ]
  },
  {
    id: "dfe3afe0-fc2e-4fab-8d82-26ebeb4cc38f",
    name: "Women Wellness Products",
    slug: "women-wellness-products",
    description: "Hormonal balance support, nourishing herbal care, and gentle botanical oils tuned to each phase of a woman's natural rhythm and life stages.",
    iconName: "Heart",
    image: "/images/categories/cat_womens_wellness.jpg",
    subcategories: [
      { name: "Women Harmony Oils", slug: "women-harmony-oils" },
      { name: "Cycle Balance Blends", slug: "cycle-balance-blends" },
    ]
  },
  {
    id: "ae49255e-18d5-4c05-be56-73331c883993",
    name: "Senior Wellness Products",
    slug: "senior-wellness-products",
    description: "Deep joint comfort, muscle ease, and grounding wellness oils prepared with potent Ayurvedic rasayanas for graceful, comfortable aging.",
    iconName: "Activity",
    image: "/images/categories/cat_senior_care.jpg",
    subcategories: [
      { name: "Joint Comfort Oils", slug: "joint-comfort-oils" },
      { name: "Restorative Tonics", slug: "restorative-tonics" },
    ]
  },
  {
    id: "6b526fad-c43b-4649-a4ec-7df6e1645993",
    name: "Nabhi oil wellness",
    slug: "nabhi-oil-wellness",
    description: "Authentic Pechoti-method belly button wellness drops. Nourish hundreds of meridian pathways directly from the anatomical center of your body.",
    iconName: "Target",
    image: "/images/category_nabhi_1784743910260.jpg",
    subcategories: [
      { name: "Daily Nabhi Drops", slug: "daily-nabhi-drops" },
      { name: "Sleep & Calm Drops", slug: "sleep-calm-drops" },
      { name: "Digestion Drops", slug: "digestion-drops" },
    ]
  },
  {
    id: "924456bf-65a3-4340-af53-ef7b0ca06536",
    name: "Body Massage Oil",
    slug: "body-massage-oil",
    description: "Luxurious Abhyanga botanical body oils infused with sun-dried herbs to relieve accumulated tension, tone muscles, and restore luster to skin.",
    iconName: "Smile",
    image: "/images/categories/cat_oil_wellness_1786556871303.jpg",
    subcategories: [
      { name: "Abhyanga Body Oils", slug: "abhyanga-body-oils" },
      { name: "Therapeutic Oils", slug: "therapeutic-oils" },
    ]
  },
  {
    id: "7cd15639-b3ad-4940-bd25-98f5033b3830",
    name: "Morning Fresh herbal cup",
    slug: "morning-fresh-herbal-cup",
    description: "Awaken digestive Agni with refreshing herbal infusions and sunrise wellness blends, crafted without caffeine or artificial flavorings.",
    iconName: "Coffee",
    image: "/images/categories/cat_herbal_tea_1786557231547.jpg",
    subcategories: [
      { name: "Sunrise Kadhas", slug: "sunrise-kadhas" },
      { name: "Detox Infusions", slug: "detox-infusions" },
    ]
  },
  {
    id: "751fdc2e-ef6b-43ba-a4ea-5d02433d5162",
    name: "Hebs Natural Raw",
    slug: "hebs-natural-raw",
    description: "Whole wild-harvested authentic Jadi Butis, roots, barks, and leaves directly from sacred forest habitats for traditional preparations.",
    iconName: "Leaf",
    image: "/images/categories/cat_raw_herbs_1786556977927.jpg",
    subcategories: [
      { name: "Whole Roots", slug: "whole-roots" },
      { name: "Sacred Barks", slug: "sacred-barks" },
      { name: "Herbal Leaves", slug: "herbal-leaves" },
    ]
  },
  {
    id: "2d7eec5a-023a-44bf-b53d-da0fccd6c979",
    name: "Natural Herbs Powder",
    slug: "natural-herbs-powder",
    description: "Finely micronized single herbs and balanced classical churnas for smooth absorption and gentle daily nourishment.",
    iconName: "Layers",
    image: "/images/categories/cat_herbal_powders_1786556998830.jpg",
    subcategories: [
      { name: "Triphala Churna", slug: "triphala-churna" },
      { name: "Ashwagandha Powder", slug: "ashwagandha-powder" },
      { name: "Single Herb Powders", slug: "single-herb-powders" },
    ]
  },
  {
    id: "bf6371a1-20f4-4183-a581-27ca5e43e43b",
    name: "Raw Spices",
    slug: "raw-spices",
    description: "Sun-dried whole organic kitchen spices, aromatic seeds, and digestive condiments handpicked for authentic culinary and healing traditions.",
    iconName: "Flame",
    image: "/images/categories/cat_pure_spices_1786557545627.jpg",
    subcategories: [
      { name: "Whole Spices", slug: "whole-spices" },
      { name: "Aromatic Seeds", slug: "aromatic-seeds" },
    ]
  },
  {
    id: "8005d369-3342-449d-9c90-1b18ed1dcfd1",
    name: "Powder Shape Spices & Herbs",
    slug: "powder-shape-spices-herbs",
    description: "Pure stone-ground spice powders and fragrant culinary masalas packed with natural essential oils and vibrant taste.",
    iconName: "Sparkles",
    image: "/images/categories/cat_pure_spices_1786557545627.jpg",
    subcategories: [
      { name: "Pure Turmeric", slug: "pure-turmeric" },
      { name: "Digestive Masalas", slug: "digestive-masalas" },
    ]
  },
  {
    id: "99054fdf-4bab-4a03-8e46-50f66a30ad14",
    name: "Dry Fruits And Nuts",
    slug: "dry-fruits-and-nuts",
    description: "Selected premium grade dry fruits and nuts offering wholesome healthy fats, clean brain fuel, and dense nourishment.",
    iconName: "TreePine",
    image: "/images/categories/cat_natural_foods_1786557531655.jpg",
    subcategories: [
      { name: "Almonds & Walnuts", slug: "almonds-walnuts" },
      { name: "Raisins & Figs", slug: "raisins-figs" },
    ]
  },
  {
    id: "bc4a7cc0-994d-47ea-a36b-22b848428b9e",
    name: "Super Foods",
    slug: "super-foods",
    description: "100% pure botanical superfoods, Ojas-boosting natural foods, and revitalizing supplements to sustain peak vitality throughout the day.",
    iconName: "Apple",
    image: "/images/categories/cat_natural_foods_1786557531655.jpg",
    subcategories: [
      { name: "Daily Superfoods", slug: "daily-superfoods" },
      { name: "Vitality Boosters", slug: "vitality-boosters" },
    ]
  },
  {
    id: "b3e412db-9b12-4bfd-aedf-296e1dc1cb95",
    name: "Feet Wellness Oil",
    slug: "feet-wellness-oil",
    description: "Padabhyanga foot massage oils formulated to draw out excess body heat, soothe weary nerves, and encourage deep restorative sleep.",
    iconName: "Footprints",
    image: "/images/category_feet_1784743921281.jpg",
    subcategories: [
      { name: "Padabhyanga Oils", slug: "padabhyanga-oils" },
      { name: "Night Soothing Blends", slug: "night-soothing-blends" },
    ]
  },
  {
    id: "5f2c9ddd-65a3-4011-a73e-cb3d5085e637",
    name: "Natural Sweetner And Raw Honey",
    slug: "natural-sweetner-raw-honey",
    description: "Raw unheated forest honey, organic mineral-rich jaggery powder, and unrefined natural sweeteners for pure, sattvic sweetness.",
    iconName: "Droplet",
    image: "/images/categories/cat_natural_foods_1786557531655.jpg",
    subcategories: [
      { name: "Forest Raw Honey", slug: "forest-raw-honey" },
      { name: "Organic Jaggery", slug: "organic-jaggery" },
    ]
  },
  {
    id: "478236ff-f937-4734-9acc-0ee34dbae147",
    name: "Herbal Teas",
    slug: "herbal-teas",
    description: "Comforting loose-leaf wellness brews, warming winter kadhas, and soothing floral teas blended with wild mountain herbs and spices.",
    iconName: "Coffee",
    image: "/images/categories/cat_herbal_tea_1786557231547.jpg",
    subcategories: [
      { name: "Immunity Kadhas", slug: "immunity-kadhas" },
      { name: "Relaxing Herbal Teas", slug: "relaxing-herbal-teas" },
    ]
  },
  {
    id: "619f9370-4428-441e-9cfd-bbf33e3617ed",
    name: "Combo Trial Packs",
    slug: "combo-trial-packs",
    description: "Thoughtfully assembled multi-bottle trial kits, family wellness sets, and gift packs to explore the full benefits of holistic Ayurveda.",
    iconName: "Package",
    image: "/images/categories/cat_wellness_packs_1786557692487.jpg",
    subcategories: [
      { name: "Trial Wellness Packs", slug: "trial-wellness-packs" },
      { name: "Family Gold Packs", slug: "family-gold-packs" },
    ]
  },
  {
    id: "f8d161c7-89e1-43ff-967e-4fb0be25441d",
    name: "Desi Ghee",
    slug: "desi-ghee",
    description: "Traditional bilona churned A2 desi cow and buffalo ghee, prepared using Vedic methods for maximum Agni support and luscious golden aroma.",
    iconName: "Utensils",
    image: "/images/categories/cat_natural_foods_1786557531655.jpg",
    subcategories: [
      { name: "A2 Cow Ghee", slug: "a2-cow-ghee" },
      { name: "Desi Buffalo Ghee", slug: "desi-buffalo-ghee" },
    ]
  }
];

// Legacy slug aliases for backwards-compatibility
const legacyAliases: Record<string, string> = {
  "oil-wellness-care": "cold-pressed-oils",
  "oil-wellness": "cold-pressed-oils",
  "raw-herbs": "hebs-natural-raw",
  "herbal-powders": "natural-herbs-powder",
  "herbal-tea": "herbal-teas",
  "herbal-tea-drinks": "herbal-teas",
  "natural-foods": "healthy-seeds",
  "pure-spices": "raw-spices",
  "wellness-packs": "combo-trial-packs",
  "natural-fragrance-essential-oils": "morning-fresh-herbal-cup",
  "natural-aroma": "morning-fresh-herbal-cup",
  "natural-sweetner-and-raw-honey": "natural-sweetner-raw-honey",
  "kids-care": "kids-wellness-products",
  "men-wellness": "men-wellness-products",
  "women-wellness": "women-wellness-products",
  "senior-care": "senior-wellness-products",
  "feet-massage-oil": "feet-wellness-oil",
  "nabhi-trial-packs": "nabhi-oil-wellness",
};

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
  { name: "Business Opportunity", slug: "/account/business-opportunity" },
  { name: "Membership", slug: "/membership" },
];

/**
 * Grouped navigation collections for the desktop mega menu.
 */
export const navigationGroups = [
  {
    title: "Oils & Topical Care",
    categories: [
      "Cold Pressed Oils",
      "Nabhi oil wellness",
      "Body Massage Oil",
      "Feet Wellness Oil",
    ]
  },
  {
    title: "Sacred Herbs & Powders",
    categories: [
      "Hebs Natural Raw",
      "Natural Herbs Powder",
    ]
  },
  {
    title: "Teas & Vitality Drinks",
    categories: [
      "Herbal Teas",
      "Morning Fresh herbal cup",
    ]
  },
  {
    title: "Spices, Seeds & Superfoods",
    categories: [
      "HEALTHY SEEDS",
      "Raw Spices",
      "Powder Shape Spices & Herbs",
      "Dry Fruits And Nuts",
      "Super Foods",
    ]
  },
  {
    title: "Personal Care & Packs",
    categories: [
      "Kids wellness products",
      "Men Wellness Products",
      "Women Wellness Products",
      "Senior Wellness Products",
      "Combo Trial Packs",
      "Desi Ghee",
      "Natural Sweetner And Raw Honey",
    ]
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  const canonicalSlug = legacyAliases[clean] || clean;

  return navigationData.find(cat => 
    cat.slug.toLowerCase() === canonicalSlug ||
    cat.slug.toLowerCase() === clean ||
    cat.id === clean ||
    cat.name.toLowerCase() === clean ||
    clean.includes(cat.slug.toLowerCase()) ||
    cat.slug.toLowerCase().includes(clean)
  );
}

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): SubCategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find(sub => 
    sub.slug.toLowerCase() === subcategorySlug.toLowerCase() ||
    sub.name.toLowerCase() === subcategorySlug.toLowerCase()
  );
}

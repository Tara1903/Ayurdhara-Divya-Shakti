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

/**
 * Top-level navigation categories for desktop and mobile header menus
 */
export const navigationData: Category[] = [
  {
    name: "Oil Wellness Care",
    slug: "oil-wellness-care",
    description: "Pure stone-ghani cold-pressed oils, Pechoti belly button drops, and therapeutic massage formulations.",
    subcategories: [
      { name: "Cold Pressed Oils", slug: "/cold-pressed-oils" },
      { name: "Nabhi Oil Wellness", slug: "/nabhi-oil-wellness" },
      { name: "Body Massage Oil", slug: "/body-massage-oil" },
      { name: "Feet Wellness Oil", slug: "/feet-wellness-oil" },
      { name: "Kids Care Oil", slug: "/kids-wellness-products" },
      { name: "Men's Care Oil", slug: "/men-wellness-products" },
      { name: "Women's Care Oil", slug: "/women-wellness-products" },
      { name: "Senior Care Oil", slug: "/senior-wellness-products" },
    ]
  },
  {
    name: "Raw Herbs",
    slug: "hebs-natural-raw",
    description: "Authentic whole wild-harvested Jadi Butis, sacred roots, barks, and leaves directly from forest habitats.",
    subcategories: [
      { name: "All Raw Herbs", slug: "/hebs-natural-raw" },
      { name: "Sacred Roots", slug: "/hebs-natural-raw/whole-roots" },
      { name: "Forest Barks", slug: "/hebs-natural-raw/sacred-barks" },
      { name: "Herbal Leaves", slug: "/hebs-natural-raw/herbal-leaves" },
    ]
  },
  {
    name: "Herbal Powders",
    slug: "natural-herbs-powder",
    description: "Finely micronized single botanical herbs and classical balanced Ayurvedic churnas for daily vitality.",
    subcategories: [
      { name: "All Herbal Powders", slug: "/natural-herbs-powder" },
      { name: "Single Herb Powders", slug: "/natural-herbs-powder/single-herb-powders" },
      { name: "Digestive Churnas", slug: "/natural-herbs-powder/triphala-churna" },
      { name: "Vitality Powders", slug: "/natural-herbs-powder/ashwagandha-powder" },
    ]
  },
  {
    name: "Herbal Teas & Drinks",
    slug: "herbal-teas",
    description: "Comforting loose-leaf herbal wellness teas, caffeine-free sunrise kadhas, and soothing infusions.",
    subcategories: [
      { name: "Herbal Teas", slug: "/herbal-teas" },
      { name: "Morning Fresh Herbal Cup", slug: "/morning-fresh-herbal-cup" },
      { name: "Immunity Kadhas", slug: "/herbal-teas/immunity-kadhas" },
      { name: "Detox Infusions", slug: "/morning-fresh-herbal-cup/detox-infusions" },
    ]
  },
  {
    name: "Seeds & Natural Foods",
    slug: "healthy-seeds",
    description: "100% raw vitality seeds, nutrient-dense dry fruits, forest honey, and Vedic bilona cow ghee.",
    subcategories: [
      { name: "Healthy Seeds", slug: "/healthy-seeds" },
      { name: "Dry Fruits And Nuts", slug: "/dry-fruits-and-nuts" },
      { name: "Super Foods", slug: "/super-foods" },
      { name: "Raw Forest Honey", slug: "/natural-sweetner-raw-honey" },
      { name: "Desi Ghee (Bilona)", slug: "/desi-ghee" },
    ]
  },
  {
    name: "Pure Spices",
    slug: "raw-spices",
    description: "Sun-dried whole organic kitchen spices and fragrant stone-ground masalas rich in natural essential oils.",
    subcategories: [
      { name: "Raw Whole Spices", slug: "/raw-spices" },
      { name: "Powder Shape Spices", slug: "/powder-shape-spices-herbs" },
      { name: "Aromatic Seeds", slug: "/raw-spices/aromatic-seeds" },
      { name: "Digestive Masalas", slug: "/powder-shape-spices-herbs/digestive-masalas" },
    ]
  },
  {
    name: "Combo & Trial Packs",
    slug: "combo-trial-packs",
    description: "Thoughtfully assembled multi-bottle trial kits, family wellness sets, and gift packs.",
    subcategories: [
      { name: "Combo Trial Packs", slug: "/combo-trial-packs" },
      { name: "Trial Wellness Packs", slug: "/combo-trial-packs/trial-wellness-packs" },
      { name: "Family Gold Packs", slug: "/combo-trial-packs/family-gold-packs" },
    ]
  }
];

/**
 * All 20 authentic database categories
 */
export const allCategories: Category[] = [
  {
    id: "3b8b46d3-e5df-4bd8-aef9-d13bb7b1ec83",
    name: "Cold Pressed Oils",
    slug: "cold-pressed-oils",
    description: "Pure, raw and unrefined oils extracted in slow traditional stone ghani mills without heat or chemicals.",
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
    description: "100% Pure, raw and nutrient-dense vitality seeds rich in plant protein, Omega-3s, and essential minerals.",
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
    description: "Gentle botanical formulations, soothing body oils, and natural herbs crafted for delicate skin.",
    subcategories: [
      { name: "Kids Nabhi Oils", slug: "kids-nabhi-oils" },
      { name: "Kids Massage Oils", slug: "kids-massage-oils" },
    ]
  },
  {
    id: "a244d98b-b00b-4ab0-9e4a-eb8a02e6f58b",
    name: "Men Wellness Products",
    slug: "men-wellness-products",
    description: "Artisanal herbal blends, energizing massage oils, and restorative tonics designed to support vigor and stamina.",
    subcategories: [
      { name: "Men Strength Oils", slug: "men-strength-oils" },
      { name: "Men Vitality Blends", slug: "men-vitality-blends" },
    ]
  },
  {
    id: "dfe3afe0-fc2e-4fab-8d82-26ebeb4cc38f",
    name: "Women Wellness Products",
    slug: "women-wellness-products",
    description: "Hormonal balance support, nourishing herbal care, and gentle botanical oils tuned to women's natural rhythm.",
    subcategories: [
      { name: "Women Harmony Oils", slug: "women-harmony-oils" },
      { name: "Cycle Balance Blends", slug: "cycle-balance-blends" },
    ]
  },
  {
    id: "ae49255e-18d5-4c05-be56-73331c883993",
    name: "Senior Wellness Products",
    slug: "senior-wellness-products",
    description: "Deep joint comfort, muscle ease, and grounding wellness oils prepared with potent Ayurvedic rasayanas.",
    subcategories: [
      { name: "Joint Comfort Oils", slug: "joint-comfort-oils" },
      { name: "Restorative Tonics", slug: "restorative-tonics" },
    ]
  },
  {
    id: "6b526fad-c43b-4649-a4ec-7df6e1645993",
    name: "Nabhi oil wellness",
    slug: "nabhi-oil-wellness",
    description: "Authentic Pechoti-method belly button wellness drops to nourish meridian pathways.",
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
    description: "Luxurious Abhyanga botanical body oils infused with sun-dried herbs to relieve accumulated tension.",
    subcategories: [
      { name: "Abhyanga Body Oils", slug: "abhyanga-body-oils" },
      { name: "Therapeutic Oils", slug: "therapeutic-oils" },
    ]
  },
  {
    id: "7cd15639-b3ad-4940-bd25-98f5033b3830",
    name: "Morning Fresh herbal cup",
    slug: "morning-fresh-herbal-cup",
    description: "Awaken digestive Agni with refreshing herbal infusions and sunrise wellness blends, crafted without caffeine.",
    subcategories: [
      { name: "Sunrise Kadhas", slug: "sunrise-kadhas" },
      { name: "Detox Infusions", slug: "detox-infusions" },
    ]
  },
  {
    id: "751fdc2e-ef6b-43ba-a4ea-5d02433d5162",
    name: "Hebs Natural Raw",
    slug: "hebs-natural-raw",
    description: "Whole wild-harvested authentic Jadi Butis, roots, barks, and leaves directly from sacred forest habitats.",
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
    description: "Sun-dried whole organic kitchen spices, aromatic seeds, and digestive condiments handpicked for authentic cooking.",
    subcategories: [
      { name: "Whole Spices", slug: "whole-spices" },
      { name: "Aromatic Seeds", slug: "aromatic-seeds" },
    ]
  },
  {
    id: "8005d369-3342-449d-9c90-1b18ed1dcfd1",
    name: "Powder Shape Spices & Herbs",
    slug: "powder-shape-spices-herbs",
    description: "Pure stone-ground spice powders and fragrant culinary masalas packed with natural essential oils.",
    subcategories: [
      { name: "Pure Turmeric", slug: "pure-turmeric" },
      { name: "Digestive Masalas", slug: "digestive-masalas" },
    ]
  },
  {
    id: "99054fdf-4bab-4a03-8e46-50f66a30ad14",
    name: "Dry Fruits And Nuts",
    slug: "dry-fruits-and-nuts",
    description: "Selected premium grade dry fruits and nuts offering wholesome healthy fats and clean brain fuel.",
    subcategories: [
      { name: "Almonds & Walnuts", slug: "almonds-walnuts" },
      { name: "Raisins & Figs", slug: "raisins-figs" },
    ]
  },
  {
    id: "bc4a7cc0-994d-47ea-a36b-22b848428b9e",
    name: "Super Foods",
    slug: "super-foods",
    description: "100% pure botanical superfoods, Ojas-boosting natural foods, and revitalizing supplements.",
    subcategories: [
      { name: "Daily Superfoods", slug: "daily-superfoods" },
      { name: "Vitality Boosters", slug: "vitality-boosters" },
    ]
  },
  {
    id: "b3e412db-9b12-4bfd-aedf-296e1dc1cb95",
    name: "Feet Wellness Oil",
    slug: "feet-wellness-oil",
    description: "Padabhyanga foot massage oils formulated to draw out excess body heat and encourage deep restorative sleep.",
    subcategories: [
      { name: "Padabhyanga Oils", slug: "padabhyanga-oils" },
      { name: "Night Soothing Blends", slug: "night-soothing-blends" },
    ]
  },
  {
    id: "5f2c9ddd-65a3-4011-a73e-cb3d5085e637",
    name: "Natural Sweetner And Raw Honey",
    slug: "natural-sweetner-raw-honey",
    description: "Raw unheated forest honey, organic mineral-rich jaggery powder, and unrefined natural sweeteners.",
    subcategories: [
      { name: "Forest Raw Honey", slug: "forest-raw-honey" },
      { name: "Organic Jaggery", slug: "organic-jaggery" },
    ]
  },
  {
    id: "478236ff-f937-4734-9acc-0ee34dbae147",
    name: "Herbal Teas",
    slug: "herbal-teas",
    description: "Comforting loose-leaf wellness brews, warming winter kadhas, and soothing floral teas blended with mountain herbs.",
    subcategories: [
      { name: "Immunity Kadhas", slug: "immunity-kadhas" },
      { name: "Relaxing Herbal Teas", slug: "relaxing-herbal-teas" },
    ]
  },
  {
    id: "619f9370-4428-441e-9cfd-bbf33e3617ed",
    name: "Combo Trial Packs",
    slug: "combo-trial-packs",
    description: "Thoughtfully assembled multi-bottle trial kits, family wellness sets, and gift packs.",
    subcategories: [
      { name: "Trial Wellness Packs", slug: "trial-wellness-packs" },
      { name: "Family Gold Packs", slug: "family-gold-packs" },
    ]
  },
  {
    id: "f8d161c7-89e1-43ff-967e-4fb0be25441d",
    name: "Desi Ghee",
    slug: "desi-ghee",
    description: "Traditional bilona churned A2 desi cow and buffalo ghee, prepared using Vedic methods for Agni support.",
    subcategories: [
      { name: "A2 Cow Ghee", slug: "a2-cow-ghee" },
      { name: "Desi Buffalo Ghee", slug: "desi-buffalo-ghee" },
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
  { name: "Business Opportunity", slug: "/account/business-opportunity" },
  { name: "Membership", slug: "/membership" },
];

const categorySlugAliases: Record<string, string> = {
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
  "kids-care": "kids-wellness-products",
  "men-wellness": "men-wellness-products",
  "women-wellness": "women-wellness-products",
  "senior-care": "senior-wellness-products",
  "feet-massage-oil": "feet-wellness-oil",
  "nabhi-trial-packs": "nabhi-oil-wellness",
};

export function getCategoryBySlug(slug: string): Category | undefined {
  if (!slug) return undefined;
  const clean = slug.trim().toLowerCase();
  const canonical = categorySlugAliases[clean] || clean;

  // 1. Check allCategories (the 20 DB categories)
  const foundInAll = allCategories.find(cat => 
    cat.slug.toLowerCase() === canonical ||
    cat.slug.toLowerCase() === clean ||
    cat.id === clean ||
    cat.name.toLowerCase() === clean ||
    clean.includes(cat.slug.toLowerCase()) ||
    cat.slug.toLowerCase().includes(clean)
  );
  if (foundInAll) return foundInAll;

  // 2. Check navigationData (header categories)
  return navigationData.find(cat => 
    cat.slug.toLowerCase() === canonical ||
    cat.slug.toLowerCase() === clean ||
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

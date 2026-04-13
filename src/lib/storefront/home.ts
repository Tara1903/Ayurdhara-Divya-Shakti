import type { Product } from "@/types";

export interface HeroTheme {
  from: string;
  via: string;
  to: string;
  glow: string;
  accent: string;
  panel: string;
}

export interface HeroSlideConfig {
  id: string;
  productSlug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  benefitChips: string[];
  theme: HeroTheme;
}

export interface HomeHeroSlide extends HeroSlideConfig {
  product: Product;
}

export interface ProductRailConfig {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  productSlugs: string[];
}

export interface ProductRail extends ProductRailConfig {
  products: Product[];
}

export interface CategoryShowcase {
  title: string;
  descriptor: string;
  href: string;
  image: string;
  icon: string;
  badge?: string;
}

export interface TrustBadge {
  title: string;
  subtitle: string;
  icon: string;
}

export interface BrandStoryContent {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  image: string;
}

const heroSlideConfigs: HeroSlideConfig[] = [
  {
    id: "premium-immunity",
    productSlug: "ayur-therapy-premium-immunity-kit",
    eyebrow: "Flagship Wellness Kit",
    title: "Complete 9-in-1 Ayurvedic wellness made simple to shop.",
    subtitle: "Flagship immunity, digestion, and evening-balance support in one premium ritual.",
    primaryCtaLabel: "Shop Wellness Kits",
    primaryCtaHref: "/wellness-kits",
    secondaryCtaLabel: "Explore How It Works",
    secondaryCtaHref: "/how-it-works",
    benefitChips: ["9-in-1 therapy system", "Save ₹200", "Limited premium batch"],
    theme: {
      from: "#f2ecd8",
      via: "#dfe8cf",
      to: "#d0dbc0",
      glow: "rgba(212, 175, 55, 0.34)",
      accent: "#2e7d32",
      panel: "rgba(255,253,248,0.72)",
    },
  },
  {
    id: "purush-shakti",
    productSlug: "purush-shakti-9-in-1-wellness-kit",
    eyebrow: "Daily Energy Support",
    title: "Men's wellness kits built for modern schedules and calmer recovery.",
    subtitle: "A focused routine for energy, digestion, and night-time reset without shopping product by product.",
    primaryCtaLabel: "View Men Kit",
    primaryCtaHref: "/products/purush-shakti-9-in-1-wellness-kit",
    secondaryCtaLabel: "Browse Best Sellers",
    secondaryCtaHref: "/wellness-kits",
    benefitChips: ["Energy support", "Digestive rhythm", "Deep relax finish"],
    theme: {
      from: "#efe8d8",
      via: "#d8e2d0",
      to: "#becdb9",
      glow: "rgba(130, 105, 61, 0.22)",
      accent: "#224f2e",
      panel: "rgba(252,248,240,0.72)",
    },
  },
  {
    id: "stree-arogya",
    productSlug: "stree-arogya-9-in-1-wellness-kit",
    eyebrow: "Women's Ritual Care",
    title: "A softer, premium routine for cycle balance, skin support, and calm evenings.",
    subtitle: "Shorter copy, clearer value, and a product-first path into women's wellness shopping.",
    primaryCtaLabel: "View Women Kit",
    primaryCtaHref: "/products/stree-arogya-9-in-1-wellness-kit",
    secondaryCtaLabel: "See New Arrivals",
    secondaryCtaHref: "/herbal-powders",
    benefitChips: ["Skin balance", "Evening calm", "Beauty-support powders"],
    theme: {
      from: "#f4ede6",
      via: "#e6ded6",
      to: "#d6d7ca",
      glow: "rgba(212, 175, 55, 0.18)",
      accent: "#3f6c47",
      panel: "rgba(255,251,247,0.72)",
    },
  },
  {
    id: "family-care",
    productSlug: "parivar-swasthya-9-in-1-wellness-kit",
    eyebrow: "Family Everyday Care",
    title: "Shared household wellness with one clean system instead of a crowded shelf.",
    subtitle: "Immunity, digestion, and calmer evenings arranged into a family-ready shopping decision.",
    primaryCtaLabel: "View Family Kit",
    primaryCtaHref: "/products/parivar-swasthya-9-in-1-wellness-kit",
    secondaryCtaLabel: "Shop Daily Essentials",
    secondaryCtaHref: "/combos",
    benefitChips: ["Family favorite", "Daily wellness", "Fast-moving stock"],
    theme: {
      from: "#f0ebdd",
      via: "#dfe6d8",
      to: "#cddac9",
      glow: "rgba(88, 138, 90, 0.18)",
      accent: "#2d6a39",
      panel: "rgba(252,253,248,0.7)",
    },
  },
];

export const featuredProductSlugs = [
  "ayur-therapy-premium-immunity-kit",
  "purush-shakti-9-in-1-wellness-kit",
  "stree-arogya-9-in-1-wellness-kit",
  "parivar-swasthya-9-in-1-wellness-kit",
];

const productRailConfigs: ProductRailConfig[] = [
  {
    id: "best-sellers",
    title: "Best Sellers",
    subtitle: "The products customers reach for first when they want a faster buying decision.",
    href: "/wellness-kits",
    productSlugs: [
      "purush-shakti-9-in-1-wellness-kit",
      "stree-arogya-9-in-1-wellness-kit",
      "parivar-swasthya-9-in-1-wellness-kit",
      "ayur-therapy-premium-immunity-kit",
      "feet-relax-grounding-oil",
      "amla-rasayan-powder",
    ],
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    subtitle: "Fresh additions, small-batch oils, and newer bundles for shoppers who like to explore.",
    href: "/herbal-oils",
    productSlugs: [
      "nasal-clarity-support-oil",
      "moringa-energy-blend",
      "body-relief-oil",
      "skin-balance-combo",
      "keshya-hair-oil",
      "lodhra-skin-balance-powder",
    ],
  },
  {
    id: "immunity-care",
    title: "Immunity Care",
    subtitle: "Daily support products and flagship kits curated for resilience-led routines.",
    href: "/wellness-kits",
    productSlugs: [
      "ayur-therapy-premium-immunity-kit",
      "parivar-swasthya-9-in-1-wellness-kit",
      "amla-rasayan-powder",
      "immunity-support-combo",
      "feet-relax-grounding-oil",
    ],
  },
  {
    id: "digestive-care",
    title: "Digestive Care",
    subtitle: "Quick-scan support for everyday comfort, lighter evenings, and nabhi-centered rituals.",
    href: "/herbal-powders",
    productSlugs: [
      "nabhik-digestive-support-oil",
      "jeera-digestive-comfort-powder",
      "parivar-swasthya-9-in-1-wellness-kit",
      "purush-shakti-9-in-1-wellness-kit",
      "weight-rhythm-combo",
    ],
  },
  {
    id: "wellness-essentials",
    title: "Wellness Essentials",
    subtitle: "High-frequency products for daily rituals, quick gifts, and easy cart building.",
    href: "/combos",
    productSlugs: [
      "feet-relax-grounding-oil",
      "amla-rasayan-powder",
      "moringa-energy-blend",
      "family-daily-combo",
      "body-relief-oil",
      "hair-ritual-combo",
    ],
  },
  {
    id: "skin-beauty",
    title: "Skin & Beauty",
    subtitle: "Women-led rituals, beauty-support powders, and bundles that feel premium but easy to scan.",
    href: "/combos",
    productSlugs: [
      "stree-arogya-9-in-1-wellness-kit",
      "keshya-hair-oil",
      "keshya-hair-support-powder",
      "lodhra-skin-balance-powder",
      "skin-balance-combo",
    ],
  },
  {
    id: "ayurvedic-picks",
    title: "Ayurvedic Picks",
    subtitle: "A mixed rail of thoughtful, ritual-first products for shoppers who want to browse deeper.",
    href: "/raw-herbs",
    productSlugs: [
      "vriddha-seva-9-in-1-wellness-kit",
      "bal-sanrakshan-9-in-1-wellness-kit",
      "nasal-clarity-support-oil",
      "body-relief-oil",
      "family-daily-combo",
    ],
  },
];

export const categoryShowcase: CategoryShowcase[] = [
  {
    title: "Immunity",
    descriptor: "Daily resilience, routine support, and family-ready wellness picks.",
    href: "/wellness-kits",
    image:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
    icon: "shield",
    badge: "Popular",
  },
  {
    title: "Digestion",
    descriptor: "Nabhi oils, powders, and comfort-led support for calmer evenings.",
    href: "/herbal-powders",
    image:
      "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?auto=format&fit=crop&w=1200&q=80",
    icon: "cup",
  },
  {
    title: "Stress Relief",
    descriptor: "Grounding oils and wind-down products for softer night routines.",
    href: "/herbal-oils",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1200&q=80",
    icon: "sparkles",
  },
  {
    title: "Skin Care",
    descriptor: "Beauty-support powders and women-led routines with a premium finish.",
    href: "/combos",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    icon: "flower",
  },
  {
    title: "Tea & Infusions",
    descriptor: "Ingredient-led herb shopping for calmer, more ritual-driven cups.",
    href: "/raw-herbs",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
    icon: "leaf",
  },
  {
    title: "Supplements",
    descriptor: "Single powders and blends built for quick daily wellness habits.",
    href: "/herbal-powders",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    icon: "capsules",
  },
  {
    title: "Daily Wellness",
    descriptor: "Family, senior, and premium kit routines designed for repeat buying.",
    href: "/wellness-kits",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=80",
    icon: "sun",
    badge: "Best Value",
  },
  {
    title: "Gift Packs",
    descriptor: "Premium combos and flagship kits that feel giftable from first glance.",
    href: "/combos",
    image:
      "https://images.unsplash.com/photo-1543364195-bfe6e4932397?auto=format&fit=crop&w=1200&q=80",
    icon: "gift",
  },
];

export const trustBadges: TrustBadge[] = [
  { title: "100% Organic", subtitle: "Clean sourcing and small-batch care.", icon: "leaf" },
  { title: "Ayurvedic Formulas", subtitle: "Ritual-first product design.", icon: "sparkles" },
  { title: "Lab Tested", subtitle: "Quality checked before dispatch.", icon: "flask" },
  { title: "Trusted Ingredients", subtitle: "Purposeful combinations, not clutter.", icon: "shield" },
  { title: "Fast Delivery", subtitle: "Quick dispatch on core ranges.", icon: "truck" },
  { title: "Easy Returns", subtitle: "Simple support if you need help.", icon: "rotate" },
];

export const brandStory: BrandStoryContent = {
  eyebrow: "Our Story",
  title: "Ancient routine clarity, rebuilt for modern shopping behavior.",
  body: "Ayurdhara Divya Shakti was shaped to make Ayurvedic care easier to understand, easier to trust, and easier to buy. We lead with curated systems, clear benefits, and premium presentation instead of crowded shelves and long explanations.",
  href: "/how-it-works",
  linkLabel: "Read More",
  image:
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
};

function pickProductsBySlugs(allProducts: Product[], slugs: string[]) {
  const bySlug = new Map(allProducts.map((product) => [product.slug, product]));

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter(Boolean) as Product[];
}

export function buildHeroSlides(allProducts: Product[]): HomeHeroSlide[] {
  const bySlug = new Map(allProducts.map((product) => [product.slug, product]));

  return heroSlideConfigs
    .map((slide) => {
      const product = bySlug.get(slide.productSlug);
      if (!product) {
        return null;
      }

      return {
        ...slide,
        product,
      };
    })
    .filter(Boolean) as HomeHeroSlide[];
}

export function buildFeaturedProducts(allProducts: Product[]) {
  return pickProductsBySlugs(allProducts, featuredProductSlugs);
}

export function buildProductRails(allProducts: Product[]): ProductRail[] {
  return productRailConfigs
    .map((config) => ({
      ...config,
      products: pickProductsBySlugs(allProducts, config.productSlugs),
    }))
    .filter((rail) => rail.products.length > 0);
}

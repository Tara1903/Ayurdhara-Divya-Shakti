export interface ProductVariant {
  id?: string;
  size: string;
  price: number;
  originalPrice: number;
  goldMemberPrice?: number;
  pricingStatus?: 'official' | 'demo';
  goldPricingEnabled?: boolean;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  story: string;
  benefit: string;
  benefits: { icon: string; text: string }[];
  ingredients: { name: string; botanical: string; role: string; image?: string }[];
  images: string[];
  variants: ProductVariant[];
  price: number;
  originalPrice: number;
  goldMemberPrice?: number;
  discount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  healthGoals: string[];
  idealFor: string[];
  usageInstructions: { serving: string; timing: string; instructions: string };
  specifications: Record<string, string>;
  certifications: string[];
  faqs: { question: string; answer: string }[];
  relatedProductIds: string[];
  routineProductIds: string[];
  selectionType?: 'single' | 'four-distinct' | 'per-member';
  memberCount?: number;
  durationText?: string;
  inclusions?: string;
  totalQuantityMl?: string;
  goldMembershipEligible?: boolean;
  categories?: string[];
  categoryIds?: string[];
  categorySlugs?: string[];
}

// All products are served from the live Supabase database.
// This array is intentionally empty — do not add static/demo data here.
export const products: Product[] = [];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map(p => p.slug);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import type { Product } from '@/data/productData';
import { logger } from '../logger';
import { safeGetConfig } from '../config/env';

// ─── Helpers ─────────────────────────────────────────────────────────────

function getStatelessClient() {
  const config = safeGetConfig();
  if (!config) {
    return createSupabaseClient('https://placeholder.supabase.co', 'placeholder');
  }
  return createSupabaseClient(config.supabase.url, config.supabase.anonKey);
}

// ─── DB → App Mapper ─────────────────────────────────────────────────────────

function calculateDiscount(original?: number, current?: number): number {
  if (!original || !current || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

function mapDbProductToAppProduct(dbProduct: any): Product {
  const variants = (dbProduct.product_variants || [])
    .filter((v: any) => v.is_active !== false)
    .sort((a: any, b: any) => (a.price || 0) - (b.price || 0));

  const images = (dbProduct.product_images || [])
    .filter((img: any) => img.variant_id === null)
    .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
    .map((img: any) => img.url);

  if (images.length === 0 && dbProduct.primary_image_url) {
    images.push(dbProduct.primary_image_url);
  }

  // Extract all categories — fallback to primary category from FK
  const junctionCategories = (dbProduct.product_categories || [])
    .map((pc: any) => pc.categories)
    .filter(Boolean);

  const primaryCategory = dbProduct.categories;
  const allCategoryRecords = junctionCategories.length > 0
    ? junctionCategories
    : (primaryCategory ? [primaryCategory] : []);

  const categories = Array.from(new Set(allCategoryRecords.map((c: any) => c.name).filter(Boolean))) as string[];
  const categoryIds = Array.from(new Set([
    dbProduct.category_id,
    ...(dbProduct.product_categories || []).map((pc: any) => pc.category_id),
    ...allCategoryRecords.map((c: any) => c.id)
  ].filter(Boolean))) as string[];
  const categorySlugs = Array.from(new Set(allCategoryRecords.map((c: any) => c.slug).filter(Boolean))) as string[];

  const primaryCategoryName = categories[0] || primaryCategory?.name || 'Ayurvedic Wellness';

  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    category: primaryCategoryName,
    categories,
    categoryIds,
    categorySlugs,
    shortDescription: dbProduct.short_description || '',
    fullDescription: dbProduct.full_description || '',
    story: dbProduct.story || '',
    benefit: dbProduct.primary_benefit || '',
    benefits: dbProduct.benefits || [],
    ingredients: (dbProduct.product_ingredients || []).map((pi: any) => ({
      name: pi.ingredients?.name,
      botanical: pi.ingredients?.botanical_name,
      role: pi.ingredients?.role,
      image: pi.ingredients?.image_url,
    })),
    images,
    variants: variants.map((v: any) => {
      const vImg = (dbProduct.product_images || []).find(
        (img: any) => img.variant_id === v.id
      );
      return {
        id: v.id,
        size: v.size,
        price: v.price,
        originalPrice: v.original_price,
        goldMemberPrice: v.gold_member_price,
        pricingStatus: v.pricing_status,
        goldPricingEnabled: v.gold_pricing_enabled,
        image: vImg ? vImg.url : (images[0] || ''),
      };
    }),
    price: variants[0]?.price || 0,
    originalPrice: variants[0]?.original_price || 0,
    goldMemberPrice: variants[0]?.gold_member_price || undefined,
    discount: calculateDiscount(variants[0]?.original_price, variants[0]?.price),
    rating: dbProduct.rating || 5.0,
    reviewCount: dbProduct.review_count || 1,
    badge: dbProduct.badge || undefined,
    healthGoals: (dbProduct.product_health_goals || []).map(
      (phg: any) => phg.health_goals?.name
    ).filter(Boolean),
    idealFor: dbProduct.ideal_for || [],
    usageInstructions: dbProduct.usage_instructions || { serving: '', timing: '', instructions: '' },
    specifications: dbProduct.specifications || {},
    certifications: dbProduct.certifications || [],
    faqs: dbProduct.faqs || [],
    relatedProductIds: dbProduct.related_product_ids || [],
    routineProductIds: dbProduct.routine_product_ids || [],
    durationText: dbProduct.duration_text || undefined,
    totalQuantityMl: dbProduct.total_quantity_ml || undefined,
    goldMembershipEligible: dbProduct.gold_membership_eligible || false,
  };
}

const PRODUCT_QUERY = `
  id, slug, name, short_description, full_description, story, primary_benefit,
  rating, review_count, badge, ideal_for, usage_instructions, benefits, specifications,
  certifications, faqs, related_product_ids, routine_product_ids, duration_text, total_quantity_ml,
  gold_membership_eligible, category_id,
  categories(id, name, slug),
  product_categories(category_id, categories(id, name, slug)),
  product_variants(id, size, price, original_price, gold_member_price, pricing_status, gold_pricing_enabled, is_active),
  product_images(url, variant_id, display_order),
  product_ingredients(display_order, ingredients(name, botanical_name, role, image_url)),
  product_health_goals(health_goals(name, slug))
`;

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order?: number | null;
  is_active?: boolean;
}

// ─── Cached DAL Functions ─────────────────────────────────────────────────────

export const getActiveCategories = unstable_cache(
  async (): Promise<DbCategory[]> => {
    const config = safeGetConfig();
    if (!config) return [];

    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, description, image_url, display_order, is_active')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error || !data) {
      logger.error({ message: 'getActiveCategories failed', context: 'DAL', data: error });
      return [];
    }
    return data;
  },
  ['all-active-categories'],
  { revalidate: 60, tags: ['categories'] }
);

export const getActiveProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const config = safeGetConfig();
    if (!config) {
      logger.warn({ message: 'Supabase not configured — returning empty product list', context: 'DAL' });
      return [];
    }

    const startTime = Date.now();
    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error({ message: 'getActiveProducts query failed', context: 'DAL', data: error });
      return [];
    }

    logger.debug({ message: 'getActiveProducts success', context: 'DAL', duration: Date.now() - startTime });
    return (data || []).map(mapDbProductToAppProduct);
  },
  ['all-products'],
  { revalidate: 60, tags: ['products'] }
);

export const getProductBySlugFromDB = unstable_cache(
  async (slugOrId: string): Promise<Product | null> => {
    const config = safeGetConfig();
    if (!config) return null;

    const startTime = Date.now();
    const supabase = getStatelessClient();

    // 1. Direct search by slug
    const { data: bySlug } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('slug', slugOrId)
      .eq('is_active', true)
      .limit(1);

    if (bySlug && bySlug.length > 0) {
      logger.debug({ message: `getProductBySlug success (slug): ${slugOrId}`, context: 'DAL', duration: Date.now() - startTime });
      return mapDbProductToAppProduct(bySlug[0]);
    }

    // 2. Direct search by ID
    const { data: byId } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('id', slugOrId)
      .eq('is_active', true)
      .limit(1);

    if (byId && byId.length > 0) {
      logger.debug({ message: `getProductBySlug success (id): ${slugOrId}`, context: 'DAL', duration: Date.now() - startTime });
      return mapDbProductToAppProduct(byId[0]);
    }

    logger.warn({ message: `Product not found in DB: ${slugOrId}`, context: 'DAL' });
    return null;
  },
  ['product-by-slug'],
  { revalidate: 60, tags: ['products'] }
);

export const getAllActiveProductSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const config = safeGetConfig();
    if (!config) return [];

    const supabase = getStatelessClient();
    const { data, error } = await supabase.from('products').select('slug').eq('is_active', true);

    if (error || !data) return [];
    return data
      .map((p: any) => p.slug)
      .filter((s: string) => s && !/[<>:"/\\|?*\x00-\x1F]/.test(s));
  },
  ['all-product-slugs'],
  { revalidate: 60, tags: ['products'] }
);

export const getProductsByCategory = unstable_cache(
  async (categorySlugOrId: string): Promise<Product[]> => {
    const allProducts = await getActiveProducts();
    const clean = categorySlugOrId.toLowerCase().trim();

    return allProducts.filter(p => {
      const assignedNames = (p.categories && p.categories.length > 0 ? p.categories : [p.category])
        .filter(Boolean)
        .map(c => c.toLowerCase().trim());
      const assignedSlugs = (p.categorySlugs || [])
        .filter(Boolean)
        .map(s => s.toLowerCase().trim());
      const assignedIds = (p.categoryIds || []).map(id => id.toLowerCase().trim());

      return (
        assignedSlugs.includes(clean) ||
        assignedIds.includes(clean) ||
        assignedNames.some(n => n === clean || n.replace(/\s+/g, '-') === clean || clean.includes(n) || n.includes(clean)) ||
        assignedSlugs.some(s => s.includes(clean) || clean.includes(s))
      );
    });
  },
  ['products-by-category'],
  { revalidate: 60, tags: ['products'] }
);

export async function searchProductsFromDB(term: string, limit = 6): Promise<Product[]> {
  const config = safeGetConfig();
  if (!config) return [];

  const supabase = getStatelessClient();
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('is_active', true)
    .or(`name.ilike.%${term}%,short_description.ilike.%${term}%`)
    .limit(limit);

  if (error || !data) {
    return [];
  }
  return data.map(mapDbProductToAppProduct);
}

export async function getRecommendedProducts(categoryNames: string[], excludeSlugs: string[] = [], limit = 4): Promise<Product[]> {
  const allProducts = await getActiveProducts();
  const lowerCatNames = categoryNames.map(c => c.toLowerCase());
  return allProducts.filter(p => {
    if (excludeSlugs.includes(p.slug)) return false;
    const pCats = (p.categories && p.categories.length > 0 ? p.categories : [p.category]).map(c => c.toLowerCase());
    return pCats.some(c => lowerCatNames.includes(c));
  }).slice(0, limit);
}

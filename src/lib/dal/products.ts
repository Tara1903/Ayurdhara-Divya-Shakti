import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';
import type { Product } from '@/data/productData';
import { products as staticProducts } from '@/data/productData';
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

/**
 * Checks if the database is both configured and properly seeded.
 * Caches the true state to avoid repeated metadata lookups.
 */
const checkDatabaseInitialization = unstable_cache(
  async (): Promise<boolean> => {
    const config = safeGetConfig();
    if (!config) return false;

    const supabase = getStatelessClient();
    try {
      const { data, error } = await supabase
        .from('app_metadata')
        .select('database_initialized')
        .single();
        
      if (error || !data) {
        logger.warn({ message: 'app_metadata table missing or unreadable. Using fallback.', context: 'DAL' });
        return false;
      }

      return data.database_initialized === true;
    } catch (err) {
      logger.error({ message: 'Error checking database initialization', context: 'DAL', data: err });
      return false;
    }
  },
  ['db-initialization-check'],
  { revalidate: 60, tags: ['metadata'] }
);


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

  return {
    id: dbProduct.id,
    slug: dbProduct.slug,
    name: dbProduct.name,
    category: dbProduct.categories?.name || 'Uncategorized',
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
    rating: dbProduct.rating || 0,
    reviewCount: dbProduct.review_count || 0,
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
  gold_membership_eligible,
  categories(name, slug),
  product_variants(id, size, price, original_price, gold_member_price, pricing_status, gold_pricing_enabled, is_active),
  product_images(url, variant_id, display_order),
  product_ingredients(display_order, ingredients(name, botanical_name, role, image_url)),
  product_health_goals(health_goals(name, slug))
`;

// ─── Cached DAL Functions ─────────────────────────────────────────────────────

export const getActiveProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const isReady = await checkDatabaseInitialization();
    if (!isReady) {
      logger.info({ message: 'Using static fallback for getActiveProducts', context: 'DAL' });
      return staticProducts;
    }
    
    const startTime = Date.now();
    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error({ message: 'Query failed, using fallback', context: 'DAL', data: error });
      return staticProducts;
    }

    logger.debug({ message: 'getActiveProducts success', context: 'DAL', duration: Date.now() - startTime });
    return (data || []).map(mapDbProductToAppProduct);
  },
  ['all-products'],
  { revalidate: 60, tags: ['products'] }
);

export const getProductBySlugFromDB = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    const isReady = await checkDatabaseInitialization();
    if (!isReady) {
      logger.info({ message: `Using static fallback for getProductBySlug: ${slug}`, context: 'DAL' });
      return staticProducts.find(p => p.slug === slug) || null;
    }

    const startTime = Date.now();
    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      logger.warn({ message: `Product not found in DB: ${slug}`, context: 'DAL' });
      return staticProducts.find(p => p.slug === slug) || null;
    }

    logger.debug({ message: `getProductBySlug success: ${slug}`, context: 'DAL', duration: Date.now() - startTime });
    return mapDbProductToAppProduct(data);
  },
  ['product-by-slug'],
  { revalidate: 60, tags: ['products'] }
);

export const getAllActiveProductSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const isReady = await checkDatabaseInitialization();
    if (!isReady) return staticProducts.map(p => p.slug);

    const supabase = getStatelessClient();
    const { data, error } = await supabase.from('products').select('slug').eq('is_active', true);

    if (error || !data) return staticProducts.map(p => p.slug);
    return data.map((p: any) => p.slug);
  },
  ['product-slugs'],
  { revalidate: 3600, tags: ['products'] }
);

export const getProductsByCategory = unstable_cache(
  async (categorySlug: string): Promise<Product[]> => {
    const isReady = await checkDatabaseInitialization();
    if (!isReady) {
      return staticProducts.filter(p => p.category.toLowerCase().replace(/ /g, '-') === categorySlug || p.slug.includes(categorySlug));
    }

    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('is_active', true)
      .eq('categories.slug', categorySlug);

    if (error) {
      return staticProducts.filter(p => p.category.toLowerCase().replace(/ /g, '-') === categorySlug || p.slug.includes(categorySlug));
    }
    return (data || []).map(mapDbProductToAppProduct);
  },
  ['products-by-category'],
  { revalidate: 60, tags: ['products'] }
);

export async function searchProductsFromDB(term: string, limit = 6): Promise<Product[]> {
  const isReady = await checkDatabaseInitialization();
  const lowerTerm = term.toLowerCase();
  
  if (!isReady) {
    return staticProducts.filter(p => 
      p.name.toLowerCase().includes(lowerTerm) || p.shortDescription.toLowerCase().includes(lowerTerm)
    ).slice(0, limit);
  }

  const supabase = getStatelessClient();
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('is_active', true)
    .or(`name.ilike.%${term}%,short_description.ilike.%${term}%`)
    .limit(limit);

  if (error || !data) {
    return staticProducts.filter(p => 
      p.name.toLowerCase().includes(lowerTerm) || p.shortDescription.toLowerCase().includes(lowerTerm)
    ).slice(0, limit);
  }
  return data.map(mapDbProductToAppProduct);
}

export async function getRecommendedProducts(categoryNames: string[], excludeSlugs: string[] = [], limit = 4): Promise<Product[]> {
  const isReady = await checkDatabaseInitialization();
  if (!isReady) {
    return staticProducts.filter(p => categoryNames.includes(p.category) && !excludeSlugs.includes(p.slug)).slice(0, limit);
  }

  const supabase = getStatelessClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, slug, name, short_description, primary_image_url, badge, rating, review_count,
      product_variants(price, original_price, size, is_active),
      product_images(url, display_order, variant_id),
      categories!inner(name)
    `)
    .eq('is_active', true)
    .in('categories.name', categoryNames)
    .not('slug', 'in', `(${excludeSlugs.map(s => `"${s}"`).join(',')})`)
    .limit(limit);

  if (error || !data) {
    return staticProducts.filter(p => categoryNames.includes(p.category) && !excludeSlugs.includes(p.slug)).slice(0, limit);
  }
  return data.map(mapDbProductToAppProduct);
}

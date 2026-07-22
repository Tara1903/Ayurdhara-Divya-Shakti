import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

// Helper for stateless public queries (doesn't read cookies)
function getStatelessClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
  );
}
import type { Product } from '@/data/productData';

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

  // Fallback to primary_image_url if no product_images
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
    usageInstructions: dbProduct.usage_instructions || {
      serving: '',
      timing: '',
      instructions: '',
    },
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
  *,
  categories(name, slug),
  product_variants(*, is_active),
  product_images(*, display_order),
  product_ingredients(
    display_order,
    ingredients(name, botanical_name, role, image_url)
  ),
  product_health_goals(
    health_goals(name, slug)
  )
`;

// ─── Cached DAL Functions ─────────────────────────────────────────────────────

/**
 * Get all active products. Cached with tag 'products'.
 * Revalidated when admin makes changes.
 */
export const getActiveProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[DAL] Error fetching products:', error);
      return [];
    }

    return (data || []).map(mapDbProductToAppProduct);
  },
  ['all-products'],
  { revalidate: 60, tags: ['products'] }
);

/**
 * Get a single product by slug. Cached per-slug with tag 'products'.
 */
export const getProductBySlugFromDB = unstable_cache(
  async (slug: string): Promise<Product | null> => {
    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return null;
    }

    return mapDbProductToAppProduct(data);
  },
  ['product-by-slug'],
  { revalidate: 60, tags: ['products'] }
);

/**
 * Get all active product slugs (for generateStaticParams).
 */
export const getAllActiveProductSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select('slug')
      .eq('is_active', true);

    if (error || !data) return [];
    return data.map((p: any) => p.slug);
  },
  ['product-slugs'],
  { revalidate: 3600, tags: ['products'] }
);

/**
 * Get products by category slug.
 */
export const getProductsByCategory = unstable_cache(
  async (categorySlug: string): Promise<Product[]> => {
    const supabase = getStatelessClient();
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_QUERY)
      .eq('is_active', true)
      .eq('categories.slug', categorySlug);

    if (error) return [];
    return (data || []).map(mapDbProductToAppProduct);
  },
  ['products-by-category'],
  { revalidate: 60, tags: ['products'] }
);

/**
 * Search products by term (for API route).
 * NOT cached — called fresh on each search.
 */
export async function searchProductsFromDB(
  term: string,
  limit = 6
): Promise<Product[]> {
  const supabase = getStatelessClient();
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_QUERY)
    .eq('is_active', true)
    .or(`name.ilike.%${term}%,short_description.ilike.%${term}%`)
    .limit(limit);

  if (error || !data) return [];
  return data.map(mapDbProductToAppProduct);
}

/**
 * Get products for cart recommendations (by category).
 */
export async function getRecommendedProducts(
  categoryNames: string[],
  excludeSlugs: string[] = [],
  limit = 4
): Promise<Product[]> {
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

  if (error || !data) return [];
  return data.map(mapDbProductToAppProduct);
}

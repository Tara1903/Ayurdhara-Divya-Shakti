import { createClient } from '@/lib/supabase/client';
import { products as staticProducts, type Product, type ProductVariant } from '@/data/productData';

export const productService = {
  async getProducts(): Promise<Product[]> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn('Supabase URL not found. Falling back to static products.');
      return staticProducts;
    }

    const supabase = createClient();
    
    // Fetch products with their relationships
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        product_variants(*),
        product_images(*),
        product_ingredients(
          ingredients(name, botanical_name, role, image_url)
        ),
        product_health_goals(
          health_goals(name)
        )
      `)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return (data || []).map(mapDbProductToAppProduct);
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return staticProducts.find(p => p.slug === slug) || null;
    }

    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        product_variants(*),
        product_images(*),
        product_ingredients(
          ingredients(name, botanical_name, role, image_url)
        ),
        product_health_goals(
          health_goals(name)
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Error fetching product by slug:', error);
      return null;
    }

    return mapDbProductToAppProduct(data);
  }
};

// Map the relational DB schema back to the frontend's expected Product interface
function mapDbProductToAppProduct(dbProduct: any): Product {
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
      image: pi.ingredients?.image_url
    })),
    // Distinct images, sorted by display_order
    images: (dbProduct.product_images || [])
      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
      .filter((img: any) => img.variant_id === null) // only global images
      .map((img: any) => img.url),
    variants: (dbProduct.product_variants || []).map((v: any) => {
      // Find image for this variant
      const vImg = (dbProduct.product_images || []).find((img: any) => img.variant_id === v.id);
      return {
        id: v.id,
        size: v.size,
        price: v.price,
        originalPrice: v.original_price,
        goldMemberPrice: v.gold_member_price,
        pricingStatus: v.pricing_status,
        goldPricingEnabled: v.gold_pricing_enabled,
        image: vImg ? vImg.url : ''
      };
    }),
    price: dbProduct.product_variants?.[0]?.price || 0,
    originalPrice: dbProduct.product_variants?.[0]?.original_price || 0,
    goldMemberPrice: dbProduct.product_variants?.[0]?.gold_member_price || undefined,
    discount: calculateDiscount(dbProduct.product_variants?.[0]?.original_price, dbProduct.product_variants?.[0]?.price),
    rating: dbProduct.rating || 0,
    reviewCount: dbProduct.review_count || 0,
    badge: dbProduct.badge || undefined,
    healthGoals: (dbProduct.product_health_goals || []).map((phg: any) => phg.health_goals?.name),
    idealFor: dbProduct.ideal_for || [],
    usageInstructions: dbProduct.usage_instructions || { serving: '', timing: '', instructions: '' },
    specifications: dbProduct.specifications || {},
    certifications: dbProduct.certifications || [],
    faqs: dbProduct.faqs || [],
    relatedProductIds: dbProduct.related_product_ids || [],
    routineProductIds: dbProduct.routine_product_ids || [],
    durationText: dbProduct.duration_text || undefined,
    totalQuantityMl: dbProduct.total_quantity_ml || undefined,
    goldMembershipEligible: dbProduct.gold_membership_eligible || false
  };
}

function calculateDiscount(original?: number, current?: number): number {
  if (!original || !current || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

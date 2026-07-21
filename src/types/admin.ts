export type AdminRole = 
  | 'super_admin' 
  | 'store_manager' 
  | 'catalog_manager' 
  | 'content_manager' 
  | 'marketing_manager' 
  | 'order_manager' 
  | 'support' 
  | 'viewer';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  hero_image_url: string | null;
  mobile_image_url: string | null;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  internal_name: string;
  title: string;
  description: string | null;
  offer_type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping';
  discount_value: number;
  minimum_order_value: number;
  maximum_discount: number | null;
  eligible_product_ids: string[] | null;
  eligible_category_ids: string[] | null;
  eligible_collection_ids: string[] | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
  promotional_image_url: string | null;
  badge_text: string | null;
  display_locations: string[] | null;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed' | 'free_shipping';
  discount_value: number;
  minimum_order_value: number;
  maximum_discount: number | null;
  start_date: string | null;
  expiry_date: string | null;
  total_usage_limit: number | null;
  used_count: number;
  per_customer_limit: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  key: string;
  content: any;
  version: number;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  context: 'global' | 'shipping' | 'payment' | 'product' | 'category';
  context_id: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  display_name: string;
  quote: string;
  image_url: string | null;
  product_id: string | null;
  display_location: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_id: string | null;
  category: string | null;
  tags: string[] | null;
  status: 'draft' | 'published' | 'archived';
  publish_date: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface InventoryLog {
  id: string;
  product_id: string;
  variant_id: string;
  quantity_change: number;
  reason: 'stock_added' | 'manual_adjustment' | 'order_reserved' | 'reservation_released' | 'order_fulfilled' | 'return_restocked' | 'damaged_stock';
  actor_id: string | null;
  reference_id: string | null;
  note: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  old_data: any | null;
  new_data: any | null;
  created_at: string;
}

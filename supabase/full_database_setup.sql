-- Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--------------------------------------------------------
-- 1. USERS & PROFILES
--------------------------------------------------------
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  mobile TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  landmark TEXT,
  pincode TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  address_type TEXT DEFAULT 'home' CHECK (address_type IN ('home', 'work', 'other')),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 2. CATALOG: CATEGORIES, HEALTH GOALS, INGREDIENTS
--------------------------------------------------------
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE health_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  botanical_name TEXT,
  short_description TEXT,
  role TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 3. PRODUCTS
--------------------------------------------------------
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  short_description TEXT,
  full_description TEXT,
  story TEXT,
  primary_benefit TEXT,
  rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  badge TEXT,
  ideal_for JSONB, -- Array of strings
  usage_instructions JSONB, -- { serving, timing, instructions }
  benefits JSONB, -- Array of { icon, text }
  specifications JSONB,
  certifications JSONB,
  faqs JSONB,
  related_product_ids JSONB,
  routine_product_ids JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2) NOT NULL,
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  reserved_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 4. RELATIONSHIPS (Many-to-Many)
--------------------------------------------------------
CREATE TABLE product_ingredients (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  PRIMARY KEY (product_id, ingredient_id)
);

CREATE TABLE product_health_goals (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  health_goal_id UUID REFERENCES health_goals(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, health_goal_id)
);

--------------------------------------------------------
-- 5. ORDERS & PAYMENTS
--------------------------------------------------------
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_ref TEXT UNIQUE NOT NULL, -- AYD-2026-000123
  customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  guest_email TEXT,
  guest_mobile TEXT,
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  item_discount NUMERIC(10,2) DEFAULT 0,
  coupon_code TEXT,
  coupon_discount NUMERIC(10,2) DEFAULT 0,
  shipping_charge NUMERIC(10,2) DEFAULT 0,
  final_total NUMERIC(10,2) NOT NULL,
  shipping_address_snapshot JSONB NOT NULL,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name_snapshot TEXT NOT NULL,
  variant_snapshot TEXT NOT NULL,
  image_snapshot TEXT,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  original_unit_price NUMERIC(10,2) NOT NULL,
  line_total NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE payment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  payment_reference TEXT,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'authorized', 'paid', 'failed', 'cancelled')),
  provider TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 6. WISHLIST & REVIEWS
--------------------------------------------------------
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE wishlist_items (
  wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (wishlist_id, product_id)
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 7. TRIGGERS
--------------------------------------------------------

-- Auto-update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Auto-create profile on auth.user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  
  -- Create empty wishlist
  INSERT INTO public.wishlists (user_id) VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
-- Enable Row Level Security (RLS) on all tables

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------
-- PUBLIC READ ACCESS (Catalog)
--------------------------------------------------------
-- Everyone can read the catalog
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for health_goals" ON health_goals FOR SELECT USING (true);
CREATE POLICY "Public read access for ingredients" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access for product_variants" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public read access for product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read access for product_ingredients" ON product_ingredients FOR SELECT USING (true);
CREATE POLICY "Public read access for product_health_goals" ON product_health_goals FOR SELECT USING (true);
CREATE POLICY "Public read access for approved reviews" ON reviews FOR SELECT USING (status = 'approved');

--------------------------------------------------------
-- PROFILE SECURITY
--------------------------------------------------------
-- Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Users can only view and manage their own addresses
CREATE POLICY "Users can view own addresses" ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own addresses" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own addresses" ON addresses FOR DELETE USING (auth.uid() = user_id);

--------------------------------------------------------
-- ORDERS & PAYMENTS SECURITY
--------------------------------------------------------
-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);

-- Users can view their own order items
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
);

-- Users can view their own payment attempts
CREATE POLICY "Users can view own payment attempts" ON payment_attempts FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = payment_attempts.order_id AND orders.customer_id = auth.uid())
);

--------------------------------------------------------
-- WISHLIST SECURITY
--------------------------------------------------------
CREATE POLICY "Users can view own wishlist" ON wishlists FOR SELECT USING (auth.uid() = user_id);
-- Insert/Update is handled by trigger mostly, but just in case
CREATE POLICY "Users can update own wishlist" ON wishlists FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own wishlist items" ON wishlist_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM wishlists WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid())
);
CREATE POLICY "Users can insert own wishlist items" ON wishlist_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM wishlists WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid())
);
CREATE POLICY "Users can delete own wishlist items" ON wishlist_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM wishlists WHERE wishlists.id = wishlist_items.wishlist_id AND wishlists.user_id = auth.uid())
);

--------------------------------------------------------
-- REVIEWS
--------------------------------------------------------
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pending reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

--------------------------------------------------------
-- ADMIN BYPASS
--------------------------------------------------------
-- Admins need full access to everything. We can either do this via a role check function,
-- or rely on the `service_role` key bypassing RLS entirely.
-- Since Phase 8 is Admin, and for now we only use the service_role key to seed, 
-- we will just let `service_role` handle admin writes automatically.
--------------------------------------------------------
-- PHASE 8: ADMIN CONTROL CENTER & CMS SCHEMA
--------------------------------------------------------

--------------------------------------------------------
-- 1. ADMIN ROLES & RBAC
--------------------------------------------------------
-- Update the existing role check on profiles
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('customer', 'super_admin', 'store_manager', 'catalog_manager', 'content_manager', 'marketing_manager', 'order_manager', 'support', 'viewer'));

--------------------------------------------------------
-- 2. COLLECTIONS (Merchandising)
--------------------------------------------------------
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  hero_image_url TEXT,
  mobile_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE collection_products (
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  PRIMARY KEY (collection_id, product_id)
);

--------------------------------------------------------
-- 3. MARKETING: OFFERS & COUPONS
--------------------------------------------------------
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  internal_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  offer_type TEXT NOT NULL CHECK (offer_type IN ('percentage', 'fixed', 'bogo', 'free_shipping')),
  discount_value NUMERIC(10,2) DEFAULT 0,
  minimum_order_value NUMERIC(10,2) DEFAULT 0,
  maximum_discount NUMERIC(10,2),
  eligible_product_ids JSONB, -- Array of product UUIDs
  eligible_category_ids JSONB, -- Array of category UUIDs
  eligible_collection_ids JSONB,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT false,
  promotional_image_url TEXT,
  badge_text TEXT,
  display_locations JSONB, -- ['homepage', 'product_card', 'cart', etc.]
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'free_shipping')),
  discount_value NUMERIC(10,2) NOT NULL,
  minimum_order_value NUMERIC(10,2) DEFAULT 0,
  maximum_discount NUMERIC(10,2),
  start_date TIMESTAMP WITH TIME ZONE,
  expiry_date TIMESTAMP WITH TIME ZONE,
  total_usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  per_customer_limit INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 4. CMS: HOMEPAGE, FOOTER, NAVIGATION, STATIC PAGES
--------------------------------------------------------
-- Using a generic key-value store for site-wide settings & content blocks
CREATE TABLE site_content (
  key TEXT PRIMARY KEY, -- e.g., 'homepage_hero', 'footer_links', 'announcement_bar'
  content JSONB NOT NULL,
  version INTEGER DEFAULT 1,
  updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  context TEXT DEFAULT 'global' CHECK (context IN ('global', 'shipping', 'payment', 'product', 'category')),
  context_id UUID, -- Optional ID if linked to specific product/category
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  quote TEXT NOT NULL,
  image_url TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  display_location TEXT DEFAULT 'homepage',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 5. JOURNAL / BLOG
--------------------------------------------------------
CREATE TABLE journal_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category TEXT,
  tags JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  publish_date TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 6. INVENTORY HISTORY
--------------------------------------------------------
CREATE TABLE inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  quantity_change INTEGER NOT NULL,
  reason TEXT NOT NULL CHECK (reason IN ('stock_added', 'manual_adjustment', 'order_reserved', 'reservation_released', 'order_fulfilled', 'return_restocked', 'damaged_stock')),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reference_id TEXT, -- e.g., Order ID
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 7. AUDIT LOGS
--------------------------------------------------------
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

--------------------------------------------------------
-- 8. TRIGGERS FOR UPDATED_AT
--------------------------------------------------------
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_offers_updated_at BEFORE UPDATE ON offers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_journal_articles_updated_at BEFORE UPDATE ON journal_articles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
--------------------------------------------------------
-- PHASE 8: ADMIN ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------

-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('super_admin', 'store_manager', 'catalog_manager', 'content_manager', 'marketing_manager', 'order_manager', 'support')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all new tables
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------
-- PUBLIC READ ACCESS (For Storefront)
--------------------------------------------------------
-- Customers can read active collections
CREATE POLICY "Public read active collections" 
ON collections FOR SELECT 
USING (is_active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date > now()));

CREATE POLICY "Public read collection products" 
ON collection_products FOR SELECT 
USING (true);

-- Customers can read active offers for display
CREATE POLICY "Public read active offers" 
ON offers FOR SELECT 
USING (is_active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date > now()));

-- Customers CANNOT read coupons table directly (validation happens via Edge Function / Server Action)

-- Customers can read site content
CREATE POLICY "Public read site content" 
ON site_content FOR SELECT USING (true);

-- Customers can read published pages
CREATE POLICY "Public read published pages" 
ON pages FOR SELECT USING (is_published = true);

-- Customers can read active FAQs
CREATE POLICY "Public read active FAQs" 
ON faqs FOR SELECT USING (is_active = true);

-- Customers can read active testimonials
CREATE POLICY "Public read active testimonials" 
ON testimonials FOR SELECT USING (is_active = true);

-- Customers can read published journal articles
CREATE POLICY "Public read published articles" 
ON journal_articles FOR SELECT 
USING (status = 'published' AND (publish_date IS NULL OR publish_date <= now()));

--------------------------------------------------------
-- ADMIN FULL ACCESS (For Admin Control Center)
--------------------------------------------------------
-- Only admins can see and modify everything in these tables
CREATE POLICY "Admins full access on collections" ON collections FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on collection_products" ON collection_products FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on offers" ON offers FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on coupons" ON coupons FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on site_content" ON site_content FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on pages" ON pages FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on faqs" ON faqs FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on testimonials" ON testimonials FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on journal_articles" ON journal_articles FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on inventory_logs" ON inventory_logs FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on audit_logs" ON audit_logs FOR ALL USING (is_admin());

-- Modify Phase 7 tables to ensure Admins have full access
-- Note: Phase 7 created basic policies, here we explicitly add admin policies if missing
-- Assuming tables like products, categories, orders already have RLS enabled
CREATE POLICY "Admins full access on products" ON products FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on product_variants" ON product_variants FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on categories" ON categories FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on ingredients" ON ingredients FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on health_goals" ON health_goals FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on orders" ON orders FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on order_items" ON order_items FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on payment_attempts" ON payment_attempts FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on profiles" ON profiles FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on addresses" ON addresses FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on reviews" ON reviews FOR ALL USING (is_admin());
--------------------------------------------------------
-- Phase 10: Pricing & Gold Membership Upgrade
--------------------------------------------------------

-- 1. Update `profiles` table
ALTER TABLE profiles
ADD COLUMN is_gold_member BOOLEAN DEFAULT false,
ADD COLUMN gold_membership_status TEXT DEFAULT 'inactive' CHECK (gold_membership_status IN ('active', 'inactive', 'suspended')),
ADD COLUMN gold_member_since TIMESTAMP WITH TIME ZONE,
ADD COLUMN gold_membership_source_order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
ADD COLUMN gold_membership_source_course TEXT;

-- 2. Update `products` table
ALTER TABLE products
ADD COLUMN duration_text TEXT,
ADD COLUMN total_quantity_ml TEXT,
ADD COLUMN gold_membership_eligible BOOLEAN DEFAULT false;

-- 3. Update `product_variants` table
-- Note: 'original_price' acts as MRP. 'price' acts as Regular Offer Price.
ALTER TABLE product_variants
ADD COLUMN gold_member_price NUMERIC(10,2),
ADD COLUMN pricing_status TEXT DEFAULT 'official' CHECK (pricing_status IN ('official', 'demo')),
ADD COLUMN gold_pricing_enabled BOOLEAN DEFAULT true;

-- 4. Update `order_items` table
ALTER TABLE order_items
ADD COLUMN unit_mrp NUMERIC(10,2),
ADD COLUMN unit_regular_price NUMERIC(10,2),
ADD COLUMN unit_final_price NUMERIC(10,2),
ADD COLUMN price_type TEXT DEFAULT 'regular' CHECK (price_type IN ('regular', 'offer', 'gold_member', 'course_offer'));

-- 5. Data Migration (Set explicit prices and assign demo prices to others)
DO $$
DECLARE
    rec RECORD;
BEGIN
    -- Initialize all products to demo status initially, unless explicitly matched below.
    UPDATE product_variants SET pricing_status = 'demo';

    -- Define explicit prices for known matching sizes.
    -- Assuming Nabhi Oil Blends have sizes like '10 ml', '15 ml', '60 ml'
    -- and Feet Wellness Oils have '30 ml', '150 ml', '500 ml'.
    
    -- We match variants based on size and product name/category.
    FOR rec IN 
        SELECT pv.id, pv.size, p.name, c.name as category_name
        FROM product_variants pv
        JOIN products p ON pv.product_id = p.id
        LEFT JOIN categories c ON p.category_id = c.id
    LOOP
        -- Nabhi Oil 10 ml
        IF (rec.name ILIKE '%Nabhi%' OR rec.category_name ILIKE '%Nabhi%') AND (rec.size ILIKE '%10%' AND rec.size ILIKE '%ml%') THEN
            UPDATE product_variants 
            SET original_price = 299, price = 199, gold_member_price = 149, pricing_status = 'official'
            WHERE id = rec.id;
        
        -- Nabhi Oil 15 ml
        ELSIF (rec.name ILIKE '%Nabhi%' OR rec.category_name ILIKE '%Nabhi%') AND (rec.size ILIKE '%15%' AND rec.size ILIKE '%ml%') THEN
            UPDATE product_variants 
            SET original_price = 499, price = 349, gold_member_price = 249, pricing_status = 'official'
            WHERE id = rec.id;

        -- Premium Nabhi Oil 60 ml
        ELSIF (rec.name ILIKE '%Nabhi%' OR rec.category_name ILIKE '%Nabhi%') AND (rec.size ILIKE '%60%' AND rec.size ILIKE '%ml%') THEN
            UPDATE product_variants 
            SET original_price = 1199, price = 899, gold_member_price = 699, pricing_status = 'official'
            WHERE id = rec.id;

        -- Feet Wellness Oil 30 ml
        ELSIF (rec.name ILIKE '%Feet%' OR rec.category_name ILIKE '%Feet%') AND (rec.size ILIKE '%30%' AND rec.size ILIKE '%ml%') THEN
            UPDATE product_variants 
            SET original_price = 699, price = 499, gold_member_price = 399, pricing_status = 'official'
            WHERE id = rec.id;

        -- Feet Wellness Oil 150 ml
        ELSIF (rec.name ILIKE '%Feet%' OR rec.category_name ILIKE '%Feet%') AND (rec.size ILIKE '%150%' AND rec.size ILIKE '%ml%') THEN
            UPDATE product_variants 
            SET original_price = 2499, price = 1799, gold_member_price = 1499, pricing_status = 'official'
            WHERE id = rec.id;

        -- Premium Feet Wellness Oil 500 ml
        ELSIF (rec.name ILIKE '%Feet%' OR rec.category_name ILIKE '%Feet%') AND (rec.size ILIKE '%500%' AND rec.size ILIKE '%ml%') THEN
            UPDATE product_variants 
            SET original_price = 5999, price = 3999, gold_member_price = 2999, pricing_status = 'official'
            WHERE id = rec.id;

        -- Set fallback demo prices for any other product_variants
        ELSE
            -- Example: 20% discount for offer, 10% further discount for gold member
            UPDATE product_variants
            SET 
                price = LEAST(price, ROUND(original_price * 0.8)),
                gold_member_price = ROUND(LEAST(price, ROUND(original_price * 0.8)) * 0.9),
                pricing_status = 'demo'
            WHERE id = rec.id AND pricing_status = 'demo';
        END IF;
    END LOOP;

    -- Update Courses with specific pricing and eligibility
    -- Trial Starter Pack (no gold eligibility)
    UPDATE products SET gold_membership_eligible = false WHERE name ILIKE '%Trial Starter%';
    UPDATE product_variants SET original_price = 999, price = 499, pricing_status = 'official', gold_pricing_enabled = false
    WHERE product_id IN (SELECT id FROM products WHERE name ILIKE '%Trial Starter%');

    -- Gold Trial - Super Starter Pack
    UPDATE products SET gold_membership_eligible = false WHERE name ILIKE '%Gold Trial%' OR name ILIKE '%Super Starter%';
    UPDATE product_variants SET original_price = 1999, price = 999, pricing_status = 'official', gold_pricing_enabled = false
    WHERE product_id IN (SELECT id FROM products WHERE name ILIKE '%Gold Trial%' OR name ILIKE '%Super Starter%');

    -- Gold Wellness Course
    UPDATE products SET gold_membership_eligible = true, duration_text = 'Up to 90 Days', total_quantity_ml = '210 ml' WHERE name ILIKE '%Gold Wellness Course%' AND name NOT ILIKE '%Family%';
    UPDATE product_variants SET original_price = 3999, price = 1899, pricing_status = 'official', gold_pricing_enabled = false
    WHERE product_id IN (SELECT id FROM products WHERE name ILIKE '%Gold Wellness Course%' AND name NOT ILIKE '%Family%');

    -- Family Gold Wellness Course
    UPDATE products SET gold_membership_eligible = true, duration_text = 'Up to 90 Days', total_quantity_ml = '840 ml' WHERE name ILIKE '%Family Gold Wellness Course%';
    UPDATE product_variants SET original_price = 9999, price = 4999, pricing_status = 'official', gold_pricing_enabled = false
    WHERE product_id IN (SELECT id FROM products WHERE name ILIKE '%Family Gold Wellness Course%');

    -- Premium Wellness Course
    UPDATE products SET gold_membership_eligible = true, duration_text = 'Up to 9-10 Months', total_quantity_ml = '740 ml' WHERE name ILIKE '%Premium Wellness Course%' AND name NOT ILIKE '%Family%';
    UPDATE product_variants SET original_price = 9999, price = 4499, pricing_status = 'official', gold_pricing_enabled = false
    WHERE product_id IN (SELECT id FROM products WHERE name ILIKE '%Premium Wellness Course%' AND name NOT ILIKE '%Family%');

    -- Family Premium Wellness Course
    UPDATE products SET gold_membership_eligible = true, duration_text = 'Up to 9-10 Months', total_quantity_ml = '1960 ml' WHERE name ILIKE '%Family Premium Wellness Course%';
    UPDATE product_variants SET original_price = 19999, price = 8999, pricing_status = 'official', gold_pricing_enabled = false
    WHERE product_id IN (SELECT id FROM products WHERE name ILIKE '%Family Premium Wellness Course%');

END $$;

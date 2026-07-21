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

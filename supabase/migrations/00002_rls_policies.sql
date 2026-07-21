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

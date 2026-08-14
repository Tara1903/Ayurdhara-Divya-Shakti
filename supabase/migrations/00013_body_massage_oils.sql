DO $$
DECLARE
  v_category_id UUID;
  v_prod_id UUID;
BEGIN
  -- 1. Insert Category
  INSERT INTO categories (name, slug, description, display_order)
  VALUES (
    'Body Massage Oil', 
    'body-massage-oil', 
    'Traditional Ayurvedic body massage oil blends for deep nourishment and holistic healing.', 
    10
  )
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_category_id;
  
  -- 2. Kids Product
  INSERT INTO products (slug, name, category_id, short_description, full_description, primary_benefit, is_active, badge)
  VALUES (
    'kids-body-wellness-massage-oil', 
    'Kids Body Wellness Massage Oil', 
    v_category_id, 
    'Natural Body Wellness Massage Oil crafted for kids.', 
    'Designed for daily body massage, relaxation, and a self-care routine. The Kids Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.', 
    'Supports relaxation and everyday wellness.', 
    true, 
    'NEW'
  )
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_prod_id;
  
  INSERT INTO product_variants (product_id, size, original_price, price, sku, stock_quantity) VALUES
  (v_prod_id, '50 ml', 399, 249, 'ADS-BMO-KIDS-50', 100),
  (v_prod_id, '100 ml', 699, 449, 'ADS-BMO-KIDS-100', 100),
  (v_prod_id, '200 ml', 1299, 799, 'ADS-BMO-KIDS-200', 100),
  (v_prod_id, '500 ml', 2999, 1799, 'ADS-BMO-KIDS-500', 100)
  ON CONFLICT (sku) DO NOTHING;

  -- 3. Men Product
  INSERT INTO products (slug, name, category_id, short_description, full_description, primary_benefit, is_active, badge)
  VALUES (
    'men-body-wellness-massage-oil', 
    'Men Body Wellness Massage Oil', 
    v_category_id, 
    'Natural Body Wellness Massage Oil crafted for men.', 
    'Designed for daily body massage, relaxation, and a self-care routine. The Men Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.', 
    'Supports relaxation and everyday wellness.', 
    true, 
    'NEW'
  )
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_prod_id;

  INSERT INTO product_variants (product_id, size, original_price, price, sku, stock_quantity) VALUES
  (v_prod_id, '50 ml', 399, 249, 'ADS-BMO-MEN-50', 100),
  (v_prod_id, '100 ml', 699, 449, 'ADS-BMO-MEN-100', 100),
  (v_prod_id, '200 ml', 1299, 799, 'ADS-BMO-MEN-200', 100),
  (v_prod_id, '500 ml', 2999, 1799, 'ADS-BMO-MEN-500', 100)
  ON CONFLICT (sku) DO NOTHING;
  
  -- 4. Women Product
  INSERT INTO products (slug, name, category_id, short_description, full_description, primary_benefit, is_active, badge)
  VALUES (
    'women-body-wellness-massage-oil', 
    'Women Body Wellness Massage Oil', 
    v_category_id, 
    'Natural Body Wellness Massage Oil crafted for women.', 
    'Designed for daily body massage, relaxation, and a self-care routine. The Women Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.', 
    'Supports relaxation and everyday wellness.', 
    true, 
    'NEW'
  )
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_prod_id;

  INSERT INTO product_variants (product_id, size, original_price, price, sku, stock_quantity) VALUES
  (v_prod_id, '50 ml', 399, 249, 'ADS-BMO-WOMEN-50', 100),
  (v_prod_id, '100 ml', 699, 449, 'ADS-BMO-WOMEN-100', 100),
  (v_prod_id, '200 ml', 1299, 799, 'ADS-BMO-WOMEN-200', 100),
  (v_prod_id, '500 ml', 2999, 1799, 'ADS-BMO-WOMEN-500', 100)
  ON CONFLICT (sku) DO NOTHING;

  -- 5. Senior Product
  INSERT INTO products (slug, name, category_id, short_description, full_description, primary_benefit, is_active, badge)
  VALUES (
    'senior-body-wellness-massage-oil', 
    'Senior Body Wellness Massage Oil', 
    v_category_id, 
    'Natural Body Wellness Massage Oil crafted for seniors.', 
    'Designed for daily body massage, relaxation, and a self-care routine. The Senior Body Wellness Massage Oil is meticulously crafted to support everyday wellness. Experience the timeless benefits of traditional oil massage rituals.', 
    'Supports relaxation and everyday wellness.', 
    true, 
    'NEW'
  )
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_prod_id;

  INSERT INTO product_variants (product_id, size, original_price, price, sku, stock_quantity) VALUES
  (v_prod_id, '50 ml', 399, 249, 'ADS-BMO-SENIOR-50', 100),
  (v_prod_id, '100 ml', 699, 449, 'ADS-BMO-SENIOR-100', 100),
  (v_prod_id, '200 ml', 1299, 799, 'ADS-BMO-SENIOR-200', 100),
  (v_prod_id, '500 ml', 2999, 1799, 'ADS-BMO-SENIOR-500', 100)
  ON CONFLICT (sku) DO NOTHING;

END $$;

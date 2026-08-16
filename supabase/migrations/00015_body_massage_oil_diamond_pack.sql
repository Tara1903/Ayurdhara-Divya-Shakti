-- 00015_body_massage_oil_diamond_pack.sql

DO $$ 
DECLARE
  v_kids_id UUID;
  v_men_id UUID;
  v_women_id UUID;
  v_senior_id UUID;
  v_diamond_pack_id UUID;
  v_category_id UUID;
BEGIN
  -- Get existing product IDs for the 4 Body Massage Oils
  SELECT id INTO v_kids_id FROM products WHERE slug = 'kids-body-wellness-massage-oil';
  SELECT id INTO v_men_id FROM products WHERE slug = 'men-body-wellness-massage-oil';
  SELECT id INTO v_women_id FROM products WHERE slug = 'women-body-wellness-massage-oil';
  SELECT id INTO v_senior_id FROM products WHERE slug = 'senior-body-wellness-massage-oil';

  -- Remove 500ml variants
  DELETE FROM product_variants 
  WHERE size = '500 ml' AND product_id IN (v_kids_id, v_men_id, v_women_id, v_senior_id);

  -- Update Kids Pricing
  UPDATE product_variants SET original_price = 499, price = 349 WHERE product_id = v_kids_id AND size = '50 ml';
  UPDATE product_variants SET original_price = 799, price = 599 WHERE product_id = v_kids_id AND size = '100 ml';
  UPDATE product_variants SET original_price = 1499, price = 999 WHERE product_id = v_kids_id AND size = '200 ml';

  -- Update Men Pricing
  UPDATE product_variants SET original_price = 499, price = 349 WHERE product_id = v_men_id AND size = '50 ml';
  UPDATE product_variants SET original_price = 799, price = 599 WHERE product_id = v_men_id AND size = '100 ml';
  UPDATE product_variants SET original_price = 1499, price = 999 WHERE product_id = v_men_id AND size = '200 ml';

  -- Update Women Pricing
  UPDATE product_variants SET original_price = 499, price = 349 WHERE product_id = v_women_id AND size = '50 ml';
  UPDATE product_variants SET original_price = 799, price = 599 WHERE product_id = v_women_id AND size = '100 ml';
  UPDATE product_variants SET original_price = 1499, price = 999 WHERE product_id = v_women_id AND size = '200 ml';

  -- Update Senior Pricing
  UPDATE product_variants SET original_price = 499, price = 349 WHERE product_id = v_senior_id AND size = '50 ml';
  UPDATE product_variants SET original_price = 799, price = 599 WHERE product_id = v_senior_id AND size = '100 ml';
  UPDATE product_variants SET original_price = 1499, price = 999 WHERE product_id = v_senior_id AND size = '200 ml';

  -- Insert Diamond Pack
  SELECT id INTO v_category_id FROM categories WHERE name = 'Individual Wellness Packs';

  IF v_category_id IS NOT NULL THEN
    INSERT INTO products (
      id, slug, name, category_id, short_description, full_description, story, primary_benefit,
      rating, review_count, badge, is_active
    ) VALUES (
      gen_random_uuid(), 'diamond-trial-wellness-pack', '💎 Diamond Trial Wellness Pack', v_category_id,
      'Experience three simple wellness rituals in one premium trial pack.',
      'Complete 3-Step Wellness Trial. Experience three simple wellness rituals in one premium trial pack. Designed for daily self-care and holistic wellness.',
      'Rooted in ancient Ayurvedic texts, our wellness blends are crafted using only the most pristine, cold-pressed oils and wild-harvested botanicals.',
      'Complete 3-Step Wellness Trial (Nabhi • Feet • Body)',
      5.0, 0, 'DIAMOND TRIAL', true
    ) ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_diamond_pack_id;

    -- If the product was newly inserted, it will return an ID
    IF v_diamond_pack_id IS NOT NULL THEN
      INSERT INTO product_variants (
        product_id, size, price, original_price, stock_quantity
      ) VALUES (
        v_diamond_pack_id, '1 Pack', 999, 1499, 100
      );
    END IF;
  END IF;

END $$;

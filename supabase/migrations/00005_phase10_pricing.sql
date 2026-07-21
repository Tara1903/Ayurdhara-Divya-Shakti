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

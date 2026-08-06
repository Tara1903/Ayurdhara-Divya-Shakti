-- Migration 00007: Expansion Features (Dosha Quiz, Abandoned Carts, Review Media)

-- 1. Dosha Quiz tags for products
ALTER TABLE products 
ADD COLUMN dosha_tags JSONB; -- e.g. '["vata", "pitta"]'

-- 2. Abandoned Carts tracking
ALTER TABLE orders 
ADD COLUMN abandoned_cart_emailed BOOLEAN DEFAULT false;

-- 3. Review Media (Photos & Videos)
ALTER TABLE reviews 
ADD COLUMN media_urls JSONB; -- array of strings (urls)

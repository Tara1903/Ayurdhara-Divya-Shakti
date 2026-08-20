-- Add product_slug to order_items to support the frontend mapping
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_slug TEXT;

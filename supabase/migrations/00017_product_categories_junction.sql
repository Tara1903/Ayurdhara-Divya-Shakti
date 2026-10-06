-- Migration: 00017_product_categories_junction.sql
-- Description: Create product_categories junction table for many-to-many product-category assignment,
-- enable Row Level Security, and backfill existing product categories.

CREATE TABLE IF NOT EXISTS public.product_categories (
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (product_id, category_id)
);

-- Indexes for fast relational lookup in both directions
CREATE INDEX IF NOT EXISTS idx_product_categories_product_id ON public.product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_category_id ON public.product_categories(category_id);

-- Enable Row Level Security
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

-- Drop policies if they already exist to ensure idempotency
DROP POLICY IF EXISTS "Public read product_categories" ON public.product_categories;
DROP POLICY IF EXISTS "Admin full access product_categories" ON public.product_categories;

-- Allow public read access (for storefront, mobile app, and API visitors)
CREATE POLICY "Public read product_categories" ON public.product_categories
  FOR SELECT USING (true);

-- Allow authenticated admins and service role full write access
CREATE POLICY "Admin full access product_categories" ON public.product_categories
  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Backfill existing single-category products into product_categories table
INSERT INTO public.product_categories (product_id, category_id)
SELECT id, category_id FROM public.products
WHERE category_id IS NOT NULL
ON CONFLICT (product_id, category_id) DO NOTHING;

-- Migration: 00011_starpay_integration
-- Description: Adds StarPay payment gateway reference columns to orders table

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS starpay_order_id TEXT,
  ADD COLUMN IF NOT EXISTS starpay_payment_token TEXT;

-- Index for quick lookup by starpay_order_id (used in webhook)
CREATE INDEX IF NOT EXISTS idx_orders_starpay_order_id ON orders(starpay_order_id);

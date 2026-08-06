-- Migration: 00006_partners_system
-- Description: Add partners table and update orders table for partner discount and referral rewards.

-- 1. Create partners table
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('wellness_partner', 'retail_partner')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  referral_reward_rate_trial NUMERIC(5,2) DEFAULT 10.00,
  referral_reward_rate_gold NUMERIC(5,2) DEFAULT 12.00,
  referral_reward_rate_premium NUMERIC(5,2) DEFAULT 15.00,
  customer_discount_rate NUMERIC(5,2) DEFAULT 2.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to auto-update updated_at for partners
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Add RLS to partners
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins full access on partners" ON partners FOR ALL USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Anyone can read active partners (needed for validation during checkout)
CREATE POLICY "Public read access to active partners" ON partners FOR SELECT USING (
  status = 'active'
);

-- 2. Update orders table
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS partner_code TEXT,
  ADD COLUMN IF NOT EXISTS partner_type TEXT,
  ADD COLUMN IF NOT EXISTS partner_discount NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referral_reward_eligible_amount NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referral_reward_calculated NUMERIC(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referral_reward_status TEXT DEFAULT 'pending' CHECK (referral_reward_status IN ('pending', 'approved', 'paid', 'cancelled'));

-- 3. Update site_content with default partner settings
INSERT INTO site_content (key, content, version)
VALUES (
  'partner_settings', 
  '{"allow_partner_discount_stacking": false}', 
  1
) ON CONFLICT (key) DO NOTHING;

-- Migration: 00008_comprehensive_partner_system
-- Description: Creates full Partner Ecosystem (Accounts, Wallets, Transactions, Distributor Networks)

-- 1. Create partner_accounts table (Centralized for all 3 types)
CREATE TABLE IF NOT EXISTS partner_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  partner_type TEXT NOT NULL CHECK (partner_type IN ('wellness', 'retailer', 'distributor')),
  partner_id TEXT UNIQUE NOT NULL, -- e.g. ADS-WP-XXX, ADS-RT-XXX
  status TEXT DEFAULT 'pending_approval' CHECK (status IN ('active', 'pending_verification', 'pending_approval', 'suspended', 'inactive', 'low_activity', 'reorder_due')),
  
  -- Basic Business Info
  business_name TEXT,
  business_type TEXT,
  shop_location TEXT,
  preferred_contact TEXT,
  
  -- KYC & Legal (JSON to store multiple fields without cluttering schema)
  kyc_details JSONB DEFAULT '{}'::jsonb,
  bank_details JSONB DEFAULT '{}'::jsonb,
  
  -- Commercial state
  opening_purchase_completed BOOLEAN DEFAULT false,
  repeat_purchase_status TEXT DEFAULT 'none',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- A user can have multiple partner accounts, but only one per type
  UNIQUE (user_id, partner_type)
);

CREATE TRIGGER update_partner_accounts_updated_at BEFORE UPDATE ON partner_accounts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 2. Create partner_wallets
CREATE TABLE IF NOT EXISTS partner_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_account_id UUID REFERENCES partner_accounts(id) UNIQUE NOT NULL,
  approved_balance NUMERIC(10,2) DEFAULT 0,
  pending_balance NUMERIC(10,2) DEFAULT 0,
  withdrawn_balance NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TRIGGER update_partner_wallets_updated_at BEFORE UPDATE ON partner_wallets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 3. Create partner_transactions
CREATE TABLE IF NOT EXISTS partner_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_account_id UUID REFERENCES partner_accounts(id) NOT NULL,
  order_id UUID REFERENCES orders(id),
  type TEXT NOT NULL CHECK (type IN ('referral_reward', 'shop_sales_reward', 'payout', 'reversal')),
  amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'reversed')),
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create distributor_retailer_network
CREATE TABLE IF NOT EXISTS distributor_retailer_network (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  distributor_id UUID REFERENCES partner_accounts(id) NOT NULL,
  retailer_id UUID REFERENCES partner_accounts(id) NOT NULL,
  assigned_by UUID REFERENCES auth.users(id), -- Admin who assigned it
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE (distributor_id, retailer_id)
);

-- 5. Row Level Security

ALTER TABLE partner_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributor_retailer_network ENABLE ROW LEVEL SECURITY;

-- Admins get full access
CREATE POLICY "Admins full access on partner_accounts" ON partner_accounts FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins full access on partner_wallets" ON partner_wallets FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins full access on partner_transactions" ON partner_transactions FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Admins full access on distributor_retailer_network" ON distributor_retailer_network FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Partners can read their own accounts
CREATE POLICY "Partners can read own account" ON partner_accounts FOR SELECT USING (auth.uid() = user_id);
-- Partners can read their own wallets
CREATE POLICY "Partners can read own wallet" ON partner_wallets FOR SELECT USING (partner_account_id IN (SELECT id FROM partner_accounts WHERE user_id = auth.uid()));
-- Partners can read their own transactions
CREATE POLICY "Partners can read own transactions" ON partner_transactions FOR SELECT USING (partner_account_id IN (SELECT id FROM partner_accounts WHERE user_id = auth.uid()));

-- Distributors can read their own retailer network
CREATE POLICY "Distributors can read their network" ON distributor_retailer_network FOR SELECT USING (distributor_id IN (SELECT id FROM partner_accounts WHERE user_id = auth.uid()));

-- Insert Default Commercial Settings into site_content
INSERT INTO site_content (key, content, version)
VALUES (
  'partner_commercial_settings',
  '{
    "wellness": {
      "rewards": {
        "individual": 3,
        "trial": 10,
        "gold": 12,
        "premium": 15
      },
      "requirements": {
        "opening_purchase": 0,
        "repeat_purchase": 0
      }
    },
    "retailer": {
      "rewards": {
        "individual": 5,
        "trial": 20,
        "gold": 24,
        "premium": 30
      },
      "requirements": {
        "opening_purchase": 10000,
        "repeat_purchase": 5000
      },
      "customer_discount": 2
    },
    "distributor": {
      "requirements": {
        "opening_purchase": 50000,
        "repeat_purchase": 25000
      }
    }
  }',
  1
) ON CONFLICT (key) DO UPDATE SET content = EXCLUDED.content;

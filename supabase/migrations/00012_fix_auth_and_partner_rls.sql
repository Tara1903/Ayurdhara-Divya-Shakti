-- Migration: 00012_fix_auth_and_partner_rls
-- Description: Updates the new user trigger to include mobile number and fixes RLS for partners.

-- 1. Fix trigger to include mobile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, mobile, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'mobile',
    'customer'
  );
  
  -- Create empty wishlist
  INSERT INTO public.wishlists (user_id) VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Fix RLS policies for partners to use is_admin() instead of exact match for 'admin'
DROP POLICY IF EXISTS "Admins full access on partner_accounts" ON partner_accounts;
DROP POLICY IF EXISTS "Admins full access on partner_wallets" ON partner_wallets;
DROP POLICY IF EXISTS "Admins full access on partner_transactions" ON partner_transactions;
DROP POLICY IF EXISTS "Admins full access on distributor_retailer_network" ON distributor_retailer_network;

CREATE POLICY "Admins full access on partner_accounts" ON partner_accounts FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on partner_wallets" ON partner_wallets FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on partner_transactions" ON partner_transactions FOR ALL USING (is_admin());
CREATE POLICY "Admins full access on distributor_retailer_network" ON distributor_retailer_network FOR ALL USING (is_admin());

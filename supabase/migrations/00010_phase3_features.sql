-- Migration: 00010_phase3_features
-- Description: Adds tables for Loyalty Program (customer_rewards) and Journal Editor (journal_posts)

-- 1. Create customer_rewards table
CREATE TABLE IF NOT EXISTS customer_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  points_balance INTEGER DEFAULT 0 NOT NULL,
  lifetime_points INTEGER DEFAULT 0 NOT NULL,
  tier TEXT DEFAULT 'Bronze' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_user_reward UNIQUE (user_id)
);

ALTER TABLE customer_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins full access on customer_rewards" ON customer_rewards FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Users can read own rewards" ON customer_rewards FOR SELECT USING (auth.uid() = user_id);

-- 2. Create journal_posts table
CREATE TABLE IF NOT EXISTS journal_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' NOT NULL, -- 'draft' or 'published'
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published posts" ON journal_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins full access on journal_posts" ON journal_posts FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');


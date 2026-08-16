-- Migration: 00014_newsletter_subscribers.sql
-- Create subscribers table to track newsletter signups and welcome emails

CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    welcome_email_sent BOOLEAN DEFAULT FALSE NOT NULL
);

-- Enable RLS
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the newsletter popup form)
CREATE POLICY "Allow anonymous inserts into subscribers" ON public.subscribers
    FOR INSERT WITH CHECK (true);

-- Allow admins full access
CREATE POLICY "Allow admins full access to subscribers" ON public.subscribers
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Optionally, if using service_role key on the backend, it bypasses RLS anyway.

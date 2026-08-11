-- Migration: 00009_phase1_features
-- Description: Adds columns and tables for Phase 1 (Reviews images, Quiz, Storage buckets)

-- 1. Add images to reviews (REMOVED - already handled by 00007 as media_urls)

-- 2. Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_email TEXT,
  answers JSONB NOT NULL,
  recommended_products JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins full access on quiz_results" ON quiz_results FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');
CREATE POLICY "Users can read own quiz_results" ON quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert quiz_results" ON quiz_results FOR INSERT WITH CHECK (true);

-- 3. Seed Quiz Config into site_content
INSERT INTO site_content (key, content, version)
VALUES (
  'wellness_quiz_config',
  '{
    "title": "Find Your Personalized Ayurvedic Routine",
    "description": "Answer a few questions to discover the products perfectly tailored to your dosha and lifestyle.",
    "questions": [
      {
        "id": "q1",
        "question": "What is your primary health goal right now?",
        "options": [
          {"value": "stress_sleep", "label": "Reducing stress and improving sleep"},
          {"value": "hair_growth", "label": "Hair growth and scalp health"},
          {"value": "digestion_weight", "label": "Digestion and weight management"},
          {"value": "kids_health", "label": "Immunity and focus for my child"}
        ]
      },
      {
        "id": "q2",
        "question": "How would you describe your daily energy levels?",
        "options": [
          {"value": "high", "label": "Consistently high, but I sometimes burn out"},
          {"value": "fluctuating", "label": "Up and down throughout the day"},
          {"value": "low", "label": "Often sluggish or fatigued"}
        ]
      },
      {
        "id": "q3",
        "question": "Which best describes your current routine?",
        "options": [
          {"value": "busy", "label": "Very busy, need quick and easy solutions"},
          {"value": "balanced", "label": "I have some time to dedicate to wellness"},
          {"value": "dedicated", "label": "I have a strict wellness routine already"}
        ]
      }
    ]
  }',
  1
) ON CONFLICT (key) DO UPDATE SET content = EXCLUDED.content;

-- 4. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-reviews', 'product-reviews', true),
  ('partner-documents', 'partner-documents', false)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage Policies for product-reviews
CREATE POLICY "Public reviews are viewable by everyone" ON storage.objects FOR SELECT USING (bucket_id = 'product-reviews');
CREATE POLICY "Authenticated users can upload reviews" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-reviews' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own reviews" ON storage.objects FOR UPDATE USING (bucket_id = 'product-reviews' AND auth.uid() = owner);
CREATE POLICY "Users can delete own reviews" ON storage.objects FOR DELETE USING (bucket_id = 'product-reviews' AND auth.uid() = owner);

-- 6. Storage Policies for partner-documents
CREATE POLICY "Partners can upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'partner-documents' AND auth.role() = 'authenticated');
CREATE POLICY "Partners can view own documents" ON storage.objects FOR SELECT USING (bucket_id = 'partner-documents' AND auth.uid() = owner);
CREATE POLICY "Admins can view all partner documents" ON storage.objects FOR SELECT USING (bucket_id = 'partner-documents' AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

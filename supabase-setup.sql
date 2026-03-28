-- ============================================
-- Wine Mapper - Supabase Database Setup
-- ============================================
-- Run this SQL in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/enkrmsbwtxfjkqrkygjh/sql/new
-- ============================================

-- Wine cache table
CREATE TABLE IF NOT EXISTS wine_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lookup_key TEXT UNIQUE NOT NULL,
  producer TEXT,
  name TEXT,
  vintage INTEGER,
  country TEXT,
  region TEXT,
  sub_region TEXT,
  village TEXT,
  appellation TEXT,
  classification TEXT,
  type TEXT,
  grape_varieties TEXT[],
  abv REAL,
  aging TEXT,
  taste_type TEXT,
  bottler TEXT,
  certifications TEXT[],
  producer_url TEXT,
  price_range JSONB,
  aromas TEXT[],
  palate JSONB,
  grape_base_aromas TEXT[],
  grape_base_palate JSONB,
  description TEXT,
  confidence TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Region cache table
CREATE TABLE IF NOT EXISTS region_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lookup_key TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  sub_region TEXT,
  village TEXT,
  guide_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS policies
ALTER TABLE wine_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE region_cache ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Allow public read on wine_cache" ON wine_cache FOR SELECT USING (true);
CREATE POLICY "Allow public read on region_cache" ON region_cache FOR SELECT USING (true);

-- Allow service role to insert/update
CREATE POLICY "Allow service insert on wine_cache" ON wine_cache FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service update on wine_cache" ON wine_cache FOR UPDATE USING (true);
CREATE POLICY "Allow service insert on region_cache" ON region_cache FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service update on region_cache" ON region_cache FOR UPDATE USING (true);

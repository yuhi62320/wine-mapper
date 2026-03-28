-- Grape varieties master table
CREATE TABLE IF NOT EXISTS grape_varieties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT UNIQUE NOT NULL,
  name_ja TEXT NOT NULL,
  aliases TEXT[] DEFAULT '{}',
  is_red BOOLEAN NOT NULL,
  origin_country TEXT,
  origin_region TEXT,
  description_ja TEXT,
  characteristics TEXT,
  typical_aromas TEXT[] DEFAULT '{}',
  typical_palate JSONB,
  food_pairings TEXT[] DEFAULT '{}',
  notable_regions TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_grape_name_en_lower ON grape_varieties (LOWER(name_en));
CREATE INDEX IF NOT EXISTS idx_grape_is_red ON grape_varieties (is_red);

-- RLS
ALTER TABLE grape_varieties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on grape_varieties" ON grape_varieties FOR SELECT USING (true);
CREATE POLICY "Allow service insert on grape_varieties" ON grape_varieties FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service update on grape_varieties" ON grape_varieties FOR UPDATE USING (true);

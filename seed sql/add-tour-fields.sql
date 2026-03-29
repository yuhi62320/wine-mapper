-- ============================================
-- Wine Mapper - Add Tour Data Fields
-- ============================================
-- Adds tour_data JSONB column to region_cache and winery_cache
-- for storing tour/travel information.
-- Run in Supabase SQL Editor.
-- ============================================

-- Add tour_data to region_cache
ALTER TABLE region_cache ADD COLUMN IF NOT EXISTS tour_data JSONB;

-- Add tour_data to winery_cache
ALTER TABLE winery_cache ADD COLUMN IF NOT EXISTS tour_data JSONB;

-- Add hero_image_url to region_cache for verified image URLs
ALTER TABLE region_cache ADD COLUMN IF NOT EXISTS hero_image_url TEXT;

-- Add image_url to winery_cache for verified image URLs
ALTER TABLE winery_cache ADD COLUMN IF NOT EXISTS image_url TEXT;

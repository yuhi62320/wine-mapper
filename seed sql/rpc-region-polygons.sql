-- ============================================================================
-- RPC functions for wine_region_polygons table
-- Run this in Supabase SQL Editor to create the required functions.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Function: get_region_polygons_by_country
-- Returns all region polygons for a given country with geometry as GeoJSON.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_region_polygons_by_country(p_country TEXT)
RETURNS TABLE (
  id UUID,
  name TEXT,
  name_ja TEXT,
  name_local TEXT,
  country TEXT,
  region TEXT,
  sub_region TEXT,
  type TEXT,
  level TEXT,
  properties JSONB,
  geojson JSONB
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    p.id,
    p.name,
    p.name_ja,
    p.name_local,
    p.country,
    p.region,
    p.sub_region,
    p.type,
    p.level,
    p.properties,
    ST_AsGeoJSON(p.geom)::jsonb AS geojson
  FROM wine_region_polygons p
  WHERE p.country = p_country
  ORDER BY p.level, p.name;
$$;

-- ---------------------------------------------------------------------------
-- Function: get_region_polygons_bbox
-- Returns region polygons intersecting a bounding box.
-- Uses geom_simplified for zoom < 8, full geom for zoom >= 8.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_region_polygons_bbox(
  p_west DOUBLE PRECISION,
  p_south DOUBLE PRECISION,
  p_east DOUBLE PRECISION,
  p_north DOUBLE PRECISION,
  p_zoom INT
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  name_ja TEXT,
  name_local TEXT,
  country TEXT,
  region TEXT,
  sub_region TEXT,
  type TEXT,
  level TEXT,
  properties JSONB,
  geojson JSONB
)
LANGUAGE sql
STABLE
AS $$
  SELECT
    p.id,
    p.name,
    p.name_ja,
    p.name_local,
    p.country,
    p.region,
    p.sub_region,
    p.type,
    p.level,
    p.properties,
    CASE
      WHEN p_zoom < 8 THEN ST_AsGeoJSON(COALESCE(p.geom_simplified, p.geom))::jsonb
      ELSE ST_AsGeoJSON(p.geom)::jsonb
    END AS geojson
  FROM wine_region_polygons p
  WHERE ST_Intersects(
    p.geom,
    ST_MakeEnvelope(p_west, p_south, p_east, p_north, 4326)
  )
  ORDER BY p.level, p.name;
$$;

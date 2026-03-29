CREATE OR REPLACE FUNCTION insert_region_polygon(
  p_name text,
  p_country text,
  p_region text,
  p_sub_region text,
  p_type text,
  p_level text,
  p_geojson text,
  p_simplify_tolerance float DEFAULT 0.01,
  p_properties jsonb DEFAULT '{}'
)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  new_id uuid;
  g geometry;
BEGIN
  g := ST_Multi(ST_SetSRID(ST_GeomFromGeoJSON(p_geojson), 4326));
  INSERT INTO wine_region_polygons
    (name, country, region, sub_region, type, level, geom, geom_simplified, properties)
  VALUES
    (p_name, p_country, p_region, p_sub_region, p_type, p_level,
     g, ST_SimplifyPreserveTopology(g, p_simplify_tolerance), p_properties)
  RETURNING id INTO new_id;
  RETURN new_id;
END;
$$;

-- Remove the MultiPolygon type constraint and allow any geometry type.
-- ST_Multi will still be used to ensure MultiPolygon, but the column
-- won't reject valid geometry that PostGIS internally tracks as Polygon.

-- Drop existing type constraints by altering to generic geometry
ALTER TABLE wine_region_polygons
  ALTER COLUMN geom TYPE geometry(Geometry, 4326)
  USING geom::geometry(Geometry, 4326);

ALTER TABLE wine_region_polygons
  ALTER COLUMN geom_simplified TYPE geometry(Geometry, 4326)
  USING geom_simplified::geometry(Geometry, 4326);

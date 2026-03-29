import { createServiceClient } from "@/lib/supabase-server";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RegionPolygonFeature {
  type: "Feature";
  geometry: GeoJSON.Geometry;
  properties: {
    id: string;
    name: string;
    name_ja: string | null;
    name_local: string | null;
    country: string;
    region: string | null;
    sub_region: string | null;
    type: string | null;
    level: number | null;
    properties: Record<string, unknown> | null;
  };
}

export interface RegionPolygonCollection {
  type: "FeatureCollection";
  features: RegionPolygonFeature[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build an empty GeoJSON FeatureCollection.
 */
function emptyCollection(): RegionPolygonCollection {
  return { type: "FeatureCollection", features: [] };
}

// ─── Query by Country ────────────────────────────────────────────────────────

/**
 * Fetch all region polygons for a given country.
 * Uses ST_AsGeoJSON via a Supabase RPC to convert geometry to GeoJSON.
 */
export async function getRegionPolygonsByCountry(
  country: string
): Promise<RegionPolygonCollection> {
  const supabase = createServiceClient();

  const { data, error } = await supabase.rpc("get_region_polygons_by_country", {
    p_country: country,
  });

  if (error) {
    console.error(
      "[supabase-polygons] getRegionPolygonsByCountry error:",
      error.message
    );
    return emptyCollection();
  }

  if (!data || !Array.isArray(data)) {
    return emptyCollection();
  }

  const features: RegionPolygonFeature[] = data.map((row: Record<string, unknown>) => ({
    type: "Feature" as const,
    geometry: row.geojson as GeoJSON.Geometry,
    properties: {
      id: row.id as string,
      name: row.name as string,
      name_ja: (row.name_ja as string) ?? null,
      name_local: (row.name_local as string) ?? null,
      country: row.country as string,
      region: (row.region as string) ?? null,
      sub_region: (row.sub_region as string) ?? null,
      type: (row.type as string) ?? null,
      level: (row.level as number) ?? null,
      properties: (row.properties as Record<string, unknown>) ?? null,
    },
  }));

  return { type: "FeatureCollection", features };
}

// ─── Query by Bounding Box ──────────────────────────────────────────────────

/**
 * Fetch region polygons within a bounding box.
 * Uses simplified geometry for low zoom levels (< 8).
 */
export async function getRegionPolygonsByBbox(
  bbox: [number, number, number, number],
  zoom: number
): Promise<RegionPolygonCollection> {
  const [west, south, east, north] = bbox;
  const supabase = createServiceClient();

  const { data, error } = await supabase.rpc("get_region_polygons_bbox", {
    p_west: west,
    p_south: south,
    p_east: east,
    p_north: north,
    p_zoom: zoom,
  });

  if (error) {
    console.error(
      "[supabase-polygons] getRegionPolygonsByBbox error:",
      error.message
    );
    return emptyCollection();
  }

  if (!data || !Array.isArray(data)) {
    return emptyCollection();
  }

  const features: RegionPolygonFeature[] = data.map((row: Record<string, unknown>) => ({
    type: "Feature" as const,
    geometry: row.geojson as GeoJSON.Geometry,
    properties: {
      id: row.id as string,
      name: row.name as string,
      name_ja: (row.name_ja as string) ?? null,
      name_local: (row.name_local as string) ?? null,
      country: row.country as string,
      region: (row.region as string) ?? null,
      sub_region: (row.sub_region as string) ?? null,
      type: (row.type as string) ?? null,
      level: (row.level as number) ?? null,
      properties: (row.properties as Record<string, unknown>) ?? null,
    },
  }));

  return { type: "FeatureCollection", features };
}

import { createServiceClient } from "@/lib/supabase-server";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WineCacheRow {
  id?: string;
  lookup_key: string;
  producer?: string;
  name?: string;
  vintage?: number;
  country?: string;
  region?: string;
  sub_region?: string;
  village?: string;
  appellation?: string;
  classification?: string;
  type?: string;
  grape_varieties?: string[];
  abv?: number;
  aging?: string;
  taste_type?: string;
  bottler?: string;
  certifications?: string[];
  producer_url?: string;
  price_range?: { min: number; max: number };
  aromas?: string[];
  palate?: {
    sweetness: number;
    acidity: number;
    tannin: number | null;
    body: number;
    finish: number;
  };
  grape_base_aromas?: string[];
  grape_base_palate?: {
    sweetness: number;
    acidity: number;
    tannin: number | null;
    body: number;
    finish: number;
  };
  description?: string;
  confidence?: string;
  image_url?: string;
}

export interface RegionCacheRow {
  id?: string;
  lookup_key: string;
  country: string;
  region: string;
  sub_region?: string;
  village?: string;
  guide_data: Record<string, unknown>;
  tour_data?: Record<string, unknown>;
  hero_image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// ─── Key Builders ────────────────────────────────────────────────────────────

/**
 * Build a normalized lookup key for wine cache.
 * Joins lowercased, trimmed fields with "|".
 * Example: "chateau margaux|les forts|2015|france|bordeaux|red"
 */
export function buildWineLookupKey(params: {
  producer?: string;
  name?: string;
  vintage?: string;
  country?: string;
  region?: string;
  type?: string;
}): string {
  const parts = [
    params.producer,
    params.name,
    params.vintage,
    params.country,
    params.region,
    params.type,
  ];
  return parts
    .map((p) => (p ?? "").trim().toLowerCase())
    .join("|");
}

/**
 * Build a normalized lookup key for region cache.
 * Same normalization as wine: lowercase, trim, join with "|".
 */
export function buildRegionLookupKey(params: {
  country: string;
  region: string;
  subRegion?: string;
  village?: string;
}): string {
  const parts = [
    params.country,
    params.region,
    params.subRegion,
    params.village,
  ];
  return parts
    .map((p) => (p ?? "").trim().toLowerCase())
    .filter(Boolean)
    .join("|");
}

// ─── Wine Cache Operations ───────────────────────────────────────────────────

/**
 * Retrieve a cached wine by exact lookup key match.
 * Returns null if no match is found.
 */
export async function getCachedWine(
  lookupKey: string
): Promise<WineCacheRow | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("wine_cache")
    .select("*")
    .eq("lookup_key", lookupKey)
    .maybeSingle();

  if (error) {
    console.error("[supabase-cache] getCachedWine error:", error.message);
    return null;
  }
  return data as WineCacheRow | null;
}

/**
 * Search wine cache candidates using fuzzy ILIKE matching on producer and name.
 * Optionally filters by type. Returns up to 5 results.
 */
export async function searchWineCandidates(params: {
  producer?: string;
  name?: string;
  country?: string;
  region?: string;
  type?: string;
}): Promise<WineCacheRow[]> {
  const supabase = createServiceClient();
  let query = supabase.from("wine_cache").select("*");

  if (params.producer) {
    query = query.ilike("producer", `%${params.producer}%`);
  }
  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }
  if (params.type) {
    query = query.eq("type", params.type);
  }

  const { data, error } = await query.limit(5);

  if (error) {
    console.error(
      "[supabase-cache] searchWineCandidates error:",
      error.message
    );
    return [];
  }
  return (data as WineCacheRow[]) ?? [];
}

/**
 * Upsert a wine into the cache.
 * On conflict with lookup_key, all fields and updated_at are refreshed.
 */
export async function setCachedWine(data: WineCacheRow): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase.from("wine_cache").upsert(
    {
      ...data,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "lookup_key" }
  );

  if (error) {
    console.error("[supabase-cache] setCachedWine error:", error.message);
  }
}

// ─── Region Cache Operations ─────────────────────────────────────────────────

/**
 * Retrieve a cached region by exact lookup key match.
 * Returns null if no match is found.
 */
export async function getCachedRegion(
  lookupKey: string
): Promise<RegionCacheRow | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("region_cache")
    .select("*")
    .eq("lookup_key", lookupKey)
    .maybeSingle();

  if (error) {
    console.error("[supabase-cache] getCachedRegion error:", error.message);
    return null;
  }
  return data as RegionCacheRow | null;
}

/**
 * Upsert a region into the cache.
 * On conflict with lookup_key, guide_data and updated_at are refreshed.
 */
export async function setCachedRegion(data: {
  lookupKey: string;
  country: string;
  region: string;
  subRegion?: string;
  village?: string;
  guideData: Record<string, unknown>;
  tourData?: Record<string, unknown>;
  heroImageUrl?: string;
}): Promise<void> {
  const supabase = createServiceClient();
  const row: Record<string, unknown> = {
    lookup_key: data.lookupKey,
    country: data.country,
    region: data.region,
    sub_region: data.subRegion ?? null,
    village: data.village ?? null,
    guide_data: data.guideData,
    updated_at: new Date().toISOString(),
  };
  if (data.tourData) row.tour_data = data.tourData;
  if (data.heroImageUrl) row.hero_image_url = data.heroImageUrl;

  const { error } = await supabase.from("region_cache").upsert(
    row,
    { onConflict: "lookup_key" }
  );

  if (error) {
    console.error("[supabase-cache] setCachedRegion error:", error.message);
  }
}

/**
 * Partially update a region's fields (e.g. fill gaps like tour_data).
 */
export async function updateCachedRegion(
  lookupKey: string,
  fields: Partial<{ guide_data: Record<string, unknown>; tour_data: Record<string, unknown>; hero_image_url: string }>
): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("region_cache")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("lookup_key", lookupKey);

  if (error) {
    console.error("[supabase-cache] updateCachedRegion error:", error.message);
  }
}

// ─── Winery Cache Operations ────────────────────────────────────────────────

export interface WineryCacheRow {
  id?: string;
  lookup_key: string;
  name: string;
  name_ja?: string;
  country: string;
  region?: string;
  sub_region?: string;
  village?: string;
  lat?: number;
  lng?: number;
  website?: string;
  description?: string;
  guide_data?: Record<string, unknown>;
  tour_data?: Record<string, unknown>;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Build a normalized lookup key for winery cache.
 * Uses lowercase producer name.
 */
export function buildWineryLookupKey(producerName: string): string {
  return producerName.trim().toLowerCase();
}

/**
 * Retrieve a cached winery by producer name lookup key.
 */
export async function getCachedWinery(
  lookupKey: string
): Promise<WineryCacheRow | null> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("winery_cache")
    .select("*")
    .eq("lookup_key", lookupKey)
    .maybeSingle();

  if (error) {
    console.error("[supabase-cache] getCachedWinery error:", error.message);
    return null;
  }
  return data as WineryCacheRow | null;
}

/**
 * Upsert a winery into the cache.
 */
export async function setCachedWinery(data: {
  lookupKey: string;
  name: string;
  nameJa?: string;
  country: string;
  region?: string;
  subRegion?: string;
  village?: string;
  lat?: number;
  lng?: number;
  website?: string;
  description?: string;
  guideData?: Record<string, unknown>;
  tourData?: Record<string, unknown>;
  imageUrl?: string;
}): Promise<void> {
  const supabase = createServiceClient();
  const row: Record<string, unknown> = {
    lookup_key: data.lookupKey,
    name: data.name,
    name_ja: data.nameJa ?? null,
    country: data.country,
    region: data.region ?? null,
    sub_region: data.subRegion ?? null,
    village: data.village ?? null,
    lat: data.lat ?? null,
    lng: data.lng ?? null,
    website: data.website ?? null,
    description: data.description ?? null,
    guide_data: data.guideData ?? null,
    updated_at: new Date().toISOString(),
  };
  if (data.tourData) row.tour_data = data.tourData;
  if (data.imageUrl) row.image_url = data.imageUrl;

  const { error } = await supabase.from("winery_cache").upsert(
    row,
    { onConflict: "lookup_key" }
  );

  if (error) {
    console.error("[supabase-cache] setCachedWinery error:", error.message);
  }
}

/**
 * Partially update a winery's fields (e.g. fill gaps like tour_data).
 */
export async function updateCachedWinery(
  lookupKey: string,
  fields: Partial<{ guide_data: Record<string, unknown>; tour_data: Record<string, unknown>; image_url: string; website: string; description: string }>
): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase
    .from("winery_cache")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("lookup_key", lookupKey);

  if (error) {
    console.error("[supabase-cache] updateCachedWinery error:", error.message);
  }
}

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
}): Promise<void> {
  const supabase = createServiceClient();
  const { error } = await supabase.from("region_cache").upsert(
    {
      lookup_key: data.lookupKey,
      country: data.country,
      region: data.region,
      sub_region: data.subRegion ?? null,
      village: data.village ?? null,
      guide_data: data.guideData,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "lookup_key" }
  );

  if (error) {
    console.error("[supabase-cache] setCachedRegion error:", error.message);
  }
}

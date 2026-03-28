import { createServiceClient } from "@/lib/supabase-server";

// Row type matching the grape_varieties table schema
export interface GrapeVarietyRow {
  id: string;
  name_en: string;
  name_ja: string;
  aliases: string[];
  is_red: boolean;
  origin_country: string | null;
  origin_region: string | null;
  description_ja: string | null;
  characteristics: string | null;
  typical_aromas: string[];
  typical_palate: {
    sweetness: number;
    acidity: number;
    tannin: number | null;
    body: number;
    finish: number;
  } | null;
  food_pairings: string[];
  notable_regions: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Fetch all grape varieties, optionally filtered by color
export async function getAllGrapes(
  filter?: { isRed?: boolean }
): Promise<GrapeVarietyRow[]> {
  const supabase = createServiceClient();

  let query = supabase
    .from("grape_varieties")
    .select("*")
    .order("name_en", { ascending: true });

  if (filter?.isRed !== undefined) {
    query = query.eq("is_red", filter.isRed);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch grape varieties: ${error.message}`);
  }

  return (data ?? []) as GrapeVarietyRow[];
}

// Fetch a single grape variety by its UUID
export async function getGrapeById(
  id: string
): Promise<GrapeVarietyRow | null> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("grape_varieties")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch grape by id: ${error.message}`);
  }

  return data as GrapeVarietyRow | null;
}

// Look up a grape variety by its English name (case-insensitive)
export async function getGrapeByNameEn(
  nameEn: string
): Promise<GrapeVarietyRow | null> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("grape_varieties")
    .select("*")
    .ilike("name_en", nameEn)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch grape by name_en: ${error.message}`);
  }

  return data as GrapeVarietyRow | null;
}

// Search grape varieties by name (English or Japanese), limited to 20 results
export async function searchGrapes(
  query: string
): Promise<GrapeVarietyRow[]> {
  const supabase = createServiceClient();

  const pattern = `%${query}%`;

  const { data, error } = await supabase
    .from("grape_varieties")
    .select("*")
    .or(`name_en.ilike.${pattern},name_ja.ilike.${pattern}`)
    .limit(20);

  if (error) {
    throw new Error(`Failed to search grape varieties: ${error.message}`);
  }

  return (data ?? []) as GrapeVarietyRow[];
}

// Upsert a grape variety, resolving conflicts on name_en
export async function upsertGrape(
  data: Partial<GrapeVarietyRow> & {
    name_en: string;
    name_ja: string;
    is_red: boolean;
  }
): Promise<void> {
  const supabase = createServiceClient();

  const { error } = await supabase
    .from("grape_varieties")
    .upsert(
      { ...data, updated_at: new Date().toISOString() },
      { onConflict: "name_en" }
    );

  if (error) {
    throw new Error(`Failed to upsert grape variety: ${error.message}`);
  }
}

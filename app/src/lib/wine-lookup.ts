import { PalateLevel } from "./types";

export interface WineLookupResult {
  priceRange: { min: number; max: number };
  aromas: string[];
  palate: {
    sweetness: PalateLevel;
    acidity: PalateLevel;
    tannin: PalateLevel | null;
    body: PalateLevel;
    finish: PalateLevel;
  };
  description: string;
  suggestedGrapes: string[];
  suggestedAbv: number | null;
  confidence: "high" | "medium" | "low";
}

export interface WineLookupQuery {
  producer: string;
  name: string;
  vintage: string;
  country: string;
  region: string;
  grapeVarieties: string[];
  type: string;
}

/**
 * Call the /api/wine-lookup endpoint to get wine-specific data.
 * Returns null if the lookup fails or API key is not configured.
 */
export async function lookupWine(
  query: WineLookupQuery
): Promise<WineLookupResult | null> {
  try {
    const res = await fetch("/api/wine-lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.error) return null;

    // Clamp palate values to valid PalateLevel range
    const clamp = (v: number): PalateLevel =>
      Math.max(1, Math.min(5, Math.round(v))) as PalateLevel;

    return {
      priceRange: data.priceRange || { min: 0, max: 0 },
      aromas: Array.isArray(data.aromas) ? data.aromas : [],
      palate: {
        sweetness: clamp(data.palate?.sweetness ?? 3),
        acidity: clamp(data.palate?.acidity ?? 3),
        tannin: data.palate?.tannin != null ? clamp(data.palate.tannin) : null,
        body: clamp(data.palate?.body ?? 3),
        finish: clamp(data.palate?.finish ?? 3),
      },
      description: data.description || "",
      suggestedGrapes: Array.isArray(data.suggestedGrapes)
        ? data.suggestedGrapes
        : [],
      suggestedAbv: data.suggestedAbv ?? null,
      confidence: data.confidence || "low",
    };
  } catch {
    return null;
  }
}

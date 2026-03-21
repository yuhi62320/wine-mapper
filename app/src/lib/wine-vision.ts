import { PalateLevel, WineType } from "./types";

export interface WineVisionLabel {
  producer: string;
  name: string;
  country: string;
  region: string;
  subRegion: string;
  vintage: number | null;
  appellation: string;
  classification: string;
  abv: number | null;
  volume: number | null;
  bottler: string;
  grapeVarieties: string[];
  aging: string;
  tasteType: string;
  certifications: string[];
  type: WineType;
}

export interface WineVisionKnowledge {
  priceRange: { min: number; max: number };
  aromas: string[];
  palate: {
    sweetness: PalateLevel;
    acidity: PalateLevel;
    tannin: PalateLevel | null;
    body: PalateLevel;
    finish: PalateLevel;
  };
  grapeBaseAromas: string[];
  grapeBasePalate: {
    sweetness: PalateLevel;
    acidity: PalateLevel;
    tannin: PalateLevel | null;
    body: PalateLevel;
    finish: PalateLevel;
  };
  description: string;
  producerUrl: string;
  confidence: "high" | "medium" | "low";
}

export interface WineVisionResult {
  label: WineVisionLabel;
  knowledge: WineVisionKnowledge;
}

const clamp = (v: number): PalateLevel =>
  Math.max(1, Math.min(5, Math.round(v))) as PalateLevel;

function sanitizePalate(p: Record<string, unknown> | undefined): {
  sweetness: PalateLevel;
  acidity: PalateLevel;
  tannin: PalateLevel | null;
  body: PalateLevel;
  finish: PalateLevel;
} {
  return {
    sweetness: clamp(Number(p?.sweetness) || 3),
    acidity: clamp(Number(p?.acidity) || 3),
    tannin: p?.tannin != null ? clamp(Number(p.tannin)) : null,
    body: clamp(Number(p?.body) || 3),
    finish: clamp(Number(p?.finish) || 3),
  };
}

const VALID_TYPES: WineType[] = [
  "red", "white", "rose", "sparkling", "fortified", "dessert", "orange",
];

/**
 * Send a wine label image to Claude Vision for analysis.
 * Returns structured label data + wine knowledge, or null on failure.
 */
export async function analyzeWineLabel(
  imageBase64: string,
  mediaType: string = "image/jpeg"
): Promise<WineVisionResult | null> {
  try {
    const res = await fetch("/api/wine-vision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, mediaType }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.error) return null;

    const label = data.label || {};
    const knowledge = data.knowledge || {};

    return {
      label: {
        producer: String(label.producer || ""),
        name: String(label.name || ""),
        country: String(label.country || ""),
        region: String(label.region || ""),
        subRegion: String(label.subRegion || ""),
        vintage: label.vintage != null ? Number(label.vintage) : null,
        appellation: String(label.appellation || ""),
        classification: String(label.classification || ""),
        abv: label.abv != null ? Number(label.abv) : null,
        volume: label.volume != null ? Number(label.volume) : null,
        bottler: String(label.bottler || ""),
        grapeVarieties: Array.isArray(label.grapeVarieties)
          ? label.grapeVarieties.map(String)
          : [],
        aging: String(label.aging || ""),
        tasteType: String(label.tasteType || ""),
        certifications: Array.isArray(label.certifications)
          ? label.certifications.map(String)
          : [],
        type: VALID_TYPES.includes(label.type) ? label.type : "red",
      },
      knowledge: {
        priceRange: knowledge.priceRange || { min: 0, max: 0 },
        aromas: Array.isArray(knowledge.aromas)
          ? knowledge.aromas.map(String)
          : [],
        palate: sanitizePalate(knowledge.palate),
        grapeBaseAromas: Array.isArray(knowledge.grapeBaseAromas)
          ? knowledge.grapeBaseAromas.map(String)
          : [],
        grapeBasePalate: sanitizePalate(knowledge.grapeBasePalate),
        description: String(knowledge.description || ""),
        producerUrl: String(knowledge.producerUrl || ""),
        confidence: knowledge.confidence || "low",
      },
    };
  } catch {
    return null;
  }
}

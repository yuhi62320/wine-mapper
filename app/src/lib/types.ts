export type WineType =
  | "red"
  | "white"
  | "rose"
  | "sparkling"
  | "fortified"
  | "dessert"
  | "orange";

export const WINE_TYPE_LABELS: Record<WineType, { en: string; ja: string }> = {
  red: { en: "Red", ja: "赤" },
  white: { en: "White", ja: "白" },
  rose: { en: "Rosé", ja: "ロゼ" },
  sparkling: { en: "Sparkling", ja: "スパークリング" },
  fortified: { en: "Fortified", ja: "フォーティファイド" },
  dessert: { en: "Dessert", ja: "デザート" },
  orange: { en: "Orange", ja: "オレンジ" },
};

export const WINE_TYPE_COLORS: Record<WineType, string> = {
  red: "#722f37",
  white: "#f5e6a3",
  rose: "#f4a7b9",
  sparkling: "#e8d5b7",
  fortified: "#8b4513",
  dessert: "#daa520",
  orange: "#e8913a",
};

export type PalateLevel = 1 | 2 | 3 | 4 | 5;

export interface PalateRating {
  sweetness: PalateLevel;
  acidity: PalateLevel;
  tannin: PalateLevel | null; // null for non-red wines
  body: PalateLevel;
  finish: PalateLevel;
}

export interface WineLog {
  id: string;
  name: string;
  vintage: number | null;
  type: WineType;
  grapeVarieties: string[];
  producer: string;
  producerUrl: string;
  country: string;
  region: string;
  subRegion: string;
  appellation: string;
  abv: number | null;
  price: number | null;
  aromas: string[];
  palate: PalateRating;
  rating: number; // 1-5
  notes: string;
  date: string; // ISO date
  createdAt: string;
}

export interface UserProfile {
  xp: number;
  wineCount: number;
  countriesExplored: string[];
  regionsExplored: string[];
  grapesExplored: string[];
  earnedBadgeIds: string[];
  streakWeeks: number;
  lastLogWeek: string; // ISO week like "2026-W12"
}

export interface Rank {
  name: string;
  nameJa: string;
  minXp: number;
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  category: "region" | "grape" | "style" | "milestone" | "streak";
  icon: string;
  condition: (profile: UserProfile, wines: WineLog[]) => boolean;
}

export interface AromaDescriptor {
  en: string;
  ja: string;
}

export interface AromaSubcategory {
  name: AromaDescriptor;
  descriptors: AromaDescriptor[];
}

export interface AromaCategory {
  name: AromaDescriptor;
  subcategories: AromaSubcategory[];
}

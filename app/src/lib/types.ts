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

  // === Mandatory label fields (法律義務) ===
  producer: string;             // 生産者名 (Domaine, Château, Winery)
  country: string;              // 原産国
  region: string;               // 原産地 (産地名 / Appellation)
  subRegion: string;            // サブ地域
  village: string;              // 村名 / コミューン (Pauillac, Chambolle-Musigny, etc.)
  appellation: string;          // 格付け (AOC, DOCG, Grand Cru, etc.)
  vintage: number | null;       // 収穫年 (ヴィンテージ)
  classification: string;       // 品質分類 (Premier Cru, Crianza, Reserva, etc.)
  abv: number | null;           // アルコール度数
  volume: number | null;        // 内容量 (ml)
  bottler: string;              // 瓶詰め元 ("Mis en bouteille au château", etc.)

  // === Optional label fields (任意項目) ===
  name: string;                 // ワイン名 / キュヴェ名
  grapeVarieties: string[];     // ブドウ品種
  aging: string;                // 熟成表記 (Reserva, Barrique, Elevé en fûts de chêne, etc.)
  tasteType: string;            // 味わいタイプ (Sec, Brut, Doux, etc.)
  certifications: string[];     // 認証・受賞 (Bio, Organic, medal, etc.)
  producerUrl: string;          // 生産者HP
  rakutenUrl: string;           // 楽天市場アフィリエイトリンク（メイン）
  rakutenItems?: RakutenItemData[]; // 楽天市場アフィリエイトリンク（最大5個）

  // === User input ===
  type: WineType;
  price: number | null;
  aromas: string[];
  palate: PalateRating;
  rating: number;               // 1-5
  notes: string;
  date: string;                 // ISO date
  createdAt: string;

  // === Saved tours (optional) ===
  tours?: WineTour[];
  wineryId?: string;
}

export interface RakutenItemData {
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  shopName: string;
  imageUrl: string;
  reviewAverage: number;
  reviewCount: number;
}

export interface WineTour {
  title: string;
  description: string;
  type: "winery_visit" | "wine_tour" | "food_pairing" | "harvest_experience" | "city_tour" | "accommodation";
  location: string;
  duration: string;
  bestSeason: string;
  priceRange: string;
  highlights: string[];
  bookingTip: string;
  imageKeyword?: string;
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
  description?: string;
}

export interface Badge {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  category: "milestone" | "discovery" | "expertise" | "collection" | "style" | "terroir" | "culture" | "streak" | "legend" | "region" | "grape";
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  icon: string;
  condition: (profile: UserProfile, wines: WineLog[]) => boolean;
}

export interface SubRegion {
  name: string;
  nameJa: string;
  lat: number;
  lng: number;
}

export interface WineRegion {
  name: string;
  nameJa: string;
  lat: number;
  lng: number;
  subRegions: SubRegion[];
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

export interface Winery {
  id: string;
  name: string;
  nameJa: string;
  country: string;
  region: string;
  subRegion: string;
  village: string;
  lat: number | null;
  lng: number | null;
  website: string;
  description: string;
  guideData: Record<string, unknown> | null;
  tourData?: Record<string, unknown> | null;
  wineIds: string[]; // IDs of associated WineLog entries
  createdAt: string;
}

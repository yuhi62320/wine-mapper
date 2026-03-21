import { PalateLevel } from "./types";

// === Grape variety defaults ===

export interface GrapeProfile {
  aromas: string[]; // Japanese aroma descriptor keys
  palate: {
    sweetness: PalateLevel;
    acidity: PalateLevel;
    tannin: PalateLevel | null;
    body: PalateLevel;
    finish: PalateLevel;
  };
  abvRange: [number, number]; // [min, max]
  isRed: boolean;
}

export const GRAPE_PROFILES: Record<string, GrapeProfile> = {
  // === RED ===
  "Cabernet Sauvignon": {
    aromas: ["カシス", "ブラックチェリー", "杉", "ピーマン", "ヴァニラ", "タバコ"],
    palate: { sweetness: 1, acidity: 3, tannin: 5, body: 5, finish: 5 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Merlot": {
    aromas: ["プラム", "ブラックチェリー", "チョコレート", "ヴァニラ", "すみれ"],
    palate: { sweetness: 2, acidity: 3, tannin: 3, body: 4, finish: 4 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Pinot Noir": {
    aromas: ["ラズベリー", "さくらんぼ", "ばら", "きのこ", "紅茶"],
    palate: { sweetness: 1, acidity: 4, tannin: 2, body: 3, finish: 4 },
    abvRange: [12.0, 14.0],
    isRed: true,
  },
  "Syrah": {
    aromas: ["ブラックベリー", "黒胡椒", "すみれ", "燻製", "オリーヴ"],
    palate: { sweetness: 1, acidity: 3, tannin: 4, body: 5, finish: 4 },
    abvRange: [13.0, 15.5],
    isRed: true,
  },
  "Shiraz": {
    aromas: ["ブラックベリー", "プラム", "チョコレート", "黒胡椒", "ヴァニラ"],
    palate: { sweetness: 2, acidity: 3, tannin: 4, body: 5, finish: 5 },
    abvRange: [13.5, 15.5],
    isRed: true,
  },
  "Grenache": {
    aromas: ["いちご", "ラズベリー", "白胡椒", "オレンジピール"],
    palate: { sweetness: 2, acidity: 3, tannin: 2, body: 4, finish: 3 },
    abvRange: [13.5, 16.0],
    isRed: true,
  },
  "Tempranillo": {
    aromas: ["さくらんぼ", "プラム", "レザー", "ヴァニラ", "タバコ"],
    palate: { sweetness: 1, acidity: 3, tannin: 4, body: 4, finish: 4 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Sangiovese": {
    aromas: ["さくらんぼ", "トマト", "ハーブ", "レザー", "紅茶"],
    palate: { sweetness: 1, acidity: 5, tannin: 4, body: 4, finish: 4 },
    abvRange: [12.5, 14.5],
    isRed: true,
  },
  "Nebbiolo": {
    aromas: ["ばら", "タール", "さくらんぼ", "紅茶", "スパイス"],
    palate: { sweetness: 1, acidity: 5, tannin: 5, body: 4, finish: 5 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Malbec": {
    aromas: ["プラム", "ブラックベリー", "すみれ", "チョコレート", "コーヒー"],
    palate: { sweetness: 2, acidity: 3, tannin: 4, body: 5, finish: 4 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Zinfandel": {
    aromas: ["ブラックベリー", "ジャム", "黒胡椒", "シナモン", "ヴァニラ"],
    palate: { sweetness: 2, acidity: 3, tannin: 3, body: 5, finish: 4 },
    abvRange: [13.5, 16.0],
    isRed: true,
  },
  "Cabernet Franc": {
    aromas: ["ラズベリー", "ピーマン", "すみれ", "ハーブ"],
    palate: { sweetness: 1, acidity: 4, tannin: 3, body: 3, finish: 3 },
    abvRange: [12.5, 14.0],
    isRed: true,
  },
  "Barbera": {
    aromas: ["さくらんぼ", "プラム", "スパイス", "ハーブ"],
    palate: { sweetness: 1, acidity: 5, tannin: 2, body: 4, finish: 3 },
    abvRange: [13.0, 14.5],
    isRed: true,
  },
  "Gamay": {
    aromas: ["いちご", "さくらんぼ", "バナナ", "キャンディ"],
    palate: { sweetness: 2, acidity: 4, tannin: 1, body: 2, finish: 2 },
    abvRange: [11.5, 13.0],
    isRed: true,
  },
  "Mourvèdre": {
    aromas: ["ブラックベリー", "レザー", "燻製", "ハーブ"],
    palate: { sweetness: 1, acidity: 3, tannin: 4, body: 5, finish: 4 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Pinotage": {
    aromas: ["プラム", "燻製", "チョコレート", "バナナ"],
    palate: { sweetness: 2, acidity: 3, tannin: 3, body: 4, finish: 3 },
    abvRange: [13.0, 14.5],
    isRed: true,
  },
  "Nero d'Avola": {
    aromas: ["プラム", "さくらんぼ", "スパイス", "チョコレート"],
    palate: { sweetness: 2, acidity: 3, tannin: 4, body: 4, finish: 4 },
    abvRange: [13.0, 14.5],
    isRed: true,
  },
  "Primitivo": {
    aromas: ["ブラックベリー", "ジャム", "スパイス", "チョコレート"],
    palate: { sweetness: 3, acidity: 3, tannin: 3, body: 5, finish: 4 },
    abvRange: [13.5, 16.0],
    isRed: true,
  },
  "Carménère": {
    aromas: ["ピーマン", "プラム", "スパイス", "コーヒー"],
    palate: { sweetness: 2, acidity: 3, tannin: 3, body: 4, finish: 3 },
    abvRange: [13.0, 14.5],
    isRed: true,
  },
  "Tannat": {
    aromas: ["ブラックベリー", "プラム", "レザー", "スパイス"],
    palate: { sweetness: 1, acidity: 3, tannin: 5, body: 5, finish: 5 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Touriga Nacional": {
    aromas: ["すみれ", "ブラックベリー", "ハーブ", "チョコレート"],
    palate: { sweetness: 2, acidity: 3, tannin: 4, body: 5, finish: 5 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Aglianico": {
    aromas: ["プラム", "チョコレート", "タバコ", "スパイス"],
    palate: { sweetness: 1, acidity: 4, tannin: 5, body: 5, finish: 5 },
    abvRange: [13.0, 15.0],
    isRed: true,
  },
  "Corvina": {
    aromas: ["さくらんぼ", "アーモンド", "スパイス", "ハーブ"],
    palate: { sweetness: 2, acidity: 4, tannin: 3, body: 3, finish: 3 },
    abvRange: [12.0, 14.0],
    isRed: true,
  },

  // === WHITE ===
  "Chardonnay": {
    aromas: ["りんご", "洋梨", "バター", "ヴァニラ", "柑橘類"],
    palate: { sweetness: 1, acidity: 3, tannin: null, body: 4, finish: 4 },
    abvRange: [12.5, 14.5],
    isRed: false,
  },
  "Sauvignon Blanc": {
    aromas: ["グレープフルーツ", "パッションフルーツ", "ハーブ", "青草"],
    palate: { sweetness: 1, acidity: 5, tannin: null, body: 2, finish: 3 },
    abvRange: [12.0, 13.5],
    isRed: false,
  },
  "Riesling": {
    aromas: ["りんご", "ライム", "はちみつ", "ペトロール"],
    palate: { sweetness: 3, acidity: 5, tannin: null, body: 2, finish: 4 },
    abvRange: [8.0, 13.0],
    isRed: false,
  },
  "Pinot Grigio": {
    aromas: ["りんご", "洋梨", "レモン", "アーモンド"],
    palate: { sweetness: 1, acidity: 3, tannin: null, body: 2, finish: 2 },
    abvRange: [12.0, 13.5],
    isRed: false,
  },
  "Pinot Gris": {
    aromas: ["洋梨", "はちみつ", "スパイス", "柑橘類"],
    palate: { sweetness: 2, acidity: 3, tannin: null, body: 3, finish: 3 },
    abvRange: [12.5, 14.0],
    isRed: false,
  },
  "Gewürztraminer": {
    aromas: ["ライチ", "ばら", "スパイス", "はちみつ"],
    palate: { sweetness: 3, acidity: 2, tannin: null, body: 4, finish: 4 },
    abvRange: [13.0, 15.0],
    isRed: false,
  },
  "Viognier": {
    aromas: ["桃", "アプリコット", "すいかずら", "スパイス"],
    palate: { sweetness: 2, acidity: 2, tannin: null, body: 4, finish: 4 },
    abvRange: [13.0, 15.0],
    isRed: false,
  },
  "Chenin Blanc": {
    aromas: ["りんご", "はちみつ", "カリン", "柑橘類"],
    palate: { sweetness: 2, acidity: 5, tannin: null, body: 3, finish: 3 },
    abvRange: [11.5, 14.0],
    isRed: false,
  },
  "Sémillon": {
    aromas: ["レモン", "はちみつ", "ワックス", "洋梨"],
    palate: { sweetness: 2, acidity: 3, tannin: null, body: 4, finish: 3 },
    abvRange: [12.0, 14.0],
    isRed: false,
  },
  "Muscat": {
    aromas: ["マスカット", "オレンジの花", "ばら", "はちみつ"],
    palate: { sweetness: 4, acidity: 2, tannin: null, body: 2, finish: 2 },
    abvRange: [5.0, 15.0],
    isRed: false,
  },
  "Moscato": {
    aromas: ["マスカット", "桃", "オレンジの花", "はちみつ"],
    palate: { sweetness: 4, acidity: 3, tannin: null, body: 1, finish: 2 },
    abvRange: [5.0, 7.0],
    isRed: false,
  },
  "Albariño": {
    aromas: ["桃", "柑橘類", "ハーブ", "ミネラル"],
    palate: { sweetness: 1, acidity: 4, tannin: null, body: 3, finish: 3 },
    abvRange: [12.0, 13.5],
    isRed: false,
  },
  "Grüner Veltliner": {
    aromas: ["青りんご", "白胡椒", "ハーブ", "柑橘類"],
    palate: { sweetness: 1, acidity: 4, tannin: null, body: 3, finish: 3 },
    abvRange: [12.0, 13.5],
    isRed: false,
  },
  "Torrontés": {
    aromas: ["ばら", "ライチ", "柑橘類", "ハーブ"],
    palate: { sweetness: 2, acidity: 3, tannin: null, body: 3, finish: 3 },
    abvRange: [13.0, 14.5],
    isRed: false,
  },
  "Vermentino": {
    aromas: ["レモン", "ハーブ", "アーモンド", "柑橘類"],
    palate: { sweetness: 1, acidity: 4, tannin: null, body: 3, finish: 2 },
    abvRange: [12.0, 13.5],
    isRed: false,
  },
  "Trebbiano": {
    aromas: ["りんご", "レモン", "アーモンド"],
    palate: { sweetness: 1, acidity: 3, tannin: null, body: 2, finish: 2 },
    abvRange: [11.5, 13.0],
    isRed: false,
  },
  "Assyrtiko": {
    aromas: ["レモン", "ミネラル", "ハーブ", "柑橘類"],
    palate: { sweetness: 1, acidity: 5, tannin: null, body: 3, finish: 4 },
    abvRange: [12.5, 14.0],
    isRed: false,
  },
  "Koshu": {
    aromas: ["柑橘類", "白桃", "ハーブ", "ミネラル"],
    palate: { sweetness: 1, acidity: 3, tannin: null, body: 2, finish: 2 },
    abvRange: [10.0, 12.5],
    isRed: false,
  },
  "Melon de Bourgogne": {
    aromas: ["レモン", "りんご", "ミネラル", "潮風"],
    palate: { sweetness: 1, acidity: 4, tannin: null, body: 2, finish: 2 },
    abvRange: [11.5, 12.5],
    isRed: false,
  },
};

// === Region defaults (typical grapes, price ranges) ===

export interface RegionDefaults {
  countryCode: string;
  regionName: string;
  typicalGrapes: string[];
  priceRange: [number, number]; // JPY [min, max]
  typicalAbv: [number, number];
}

export const REGION_DEFAULTS: RegionDefaults[] = [
  // France
  { countryCode: "FR", regionName: "Bordeaux", typicalGrapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"], priceRange: [2000, 15000], typicalAbv: [13.0, 14.5] },
  { countryCode: "FR", regionName: "Burgundy", typicalGrapes: ["Pinot Noir", "Chardonnay"], priceRange: [3000, 30000], typicalAbv: [12.5, 14.0] },
  { countryCode: "FR", regionName: "Champagne", typicalGrapes: ["Chardonnay", "Pinot Noir", "Pinot Meunier"], priceRange: [4000, 30000], typicalAbv: [12.0, 12.5] },
  { countryCode: "FR", regionName: "Rhône", typicalGrapes: ["Syrah", "Grenache", "Mourvèdre", "Viognier"], priceRange: [1500, 10000], typicalAbv: [13.0, 15.0] },
  { countryCode: "FR", regionName: "Loire", typicalGrapes: ["Sauvignon Blanc", "Chenin Blanc", "Cabernet Franc"], priceRange: [1500, 6000], typicalAbv: [12.0, 13.5] },
  { countryCode: "FR", regionName: "Alsace", typicalGrapes: ["Riesling", "Gewürztraminer", "Pinot Gris"], priceRange: [2000, 8000], typicalAbv: [12.5, 14.0] },
  { countryCode: "FR", regionName: "Provence", typicalGrapes: ["Grenache", "Syrah", "Mourvèdre"], priceRange: [1500, 5000], typicalAbv: [12.5, 13.5] },
  { countryCode: "FR", regionName: "Languedoc-Roussillon", typicalGrapes: ["Syrah", "Grenache", "Mourvèdre", "Carignan"], priceRange: [800, 4000], typicalAbv: [13.0, 14.5] },

  // Italy
  { countryCode: "IT", regionName: "Tuscany", typicalGrapes: ["Sangiovese", "Cabernet Sauvignon", "Merlot"], priceRange: [1500, 15000], typicalAbv: [13.0, 14.5] },
  { countryCode: "IT", regionName: "Piedmont", typicalGrapes: ["Nebbiolo", "Barbera", "Dolcetto"], priceRange: [2000, 20000], typicalAbv: [13.0, 15.0] },
  { countryCode: "IT", regionName: "Veneto", typicalGrapes: ["Corvina", "Garganega", "Glera"], priceRange: [1000, 8000], typicalAbv: [11.5, 15.0] },
  { countryCode: "IT", regionName: "Sicily", typicalGrapes: ["Nero d'Avola", "Nerello Mascalese"], priceRange: [1000, 5000], typicalAbv: [13.0, 14.5] },

  // Spain
  { countryCode: "ES", regionName: "Rioja", typicalGrapes: ["Tempranillo", "Garnacha", "Graciano"], priceRange: [1000, 8000], typicalAbv: [13.0, 14.5] },
  { countryCode: "ES", regionName: "Ribera del Duero", typicalGrapes: ["Tempranillo"], priceRange: [1500, 10000], typicalAbv: [13.5, 15.0] },
  { countryCode: "ES", regionName: "Priorat", typicalGrapes: ["Grenache", "Carignan"], priceRange: [2000, 15000], typicalAbv: [14.0, 16.0] },

  // USA
  { countryCode: "US", regionName: "Napa Valley", typicalGrapes: ["Cabernet Sauvignon", "Chardonnay", "Merlot"], priceRange: [3000, 30000], typicalAbv: [13.5, 15.5] },
  { countryCode: "US", regionName: "Sonoma", typicalGrapes: ["Pinot Noir", "Chardonnay", "Zinfandel"], priceRange: [2000, 15000], typicalAbv: [13.0, 15.0] },
  { countryCode: "US", regionName: "Willamette Valley", typicalGrapes: ["Pinot Noir", "Pinot Gris", "Chardonnay"], priceRange: [2500, 12000], typicalAbv: [12.5, 14.0] },

  // Argentina
  { countryCode: "AR", regionName: "Mendoza", typicalGrapes: ["Malbec", "Cabernet Sauvignon", "Bonarda"], priceRange: [800, 5000], typicalAbv: [13.0, 15.0] },
  { countryCode: "AR", regionName: "Salta", typicalGrapes: ["Torrontés", "Malbec"], priceRange: [1000, 5000], typicalAbv: [13.0, 14.5] },

  // Chile
  { countryCode: "CL", regionName: "Maipo Valley", typicalGrapes: ["Cabernet Sauvignon", "Carménère"], priceRange: [800, 5000], typicalAbv: [13.0, 14.5] },
  { countryCode: "CL", regionName: "Colchagua", typicalGrapes: ["Cabernet Sauvignon", "Carménère", "Syrah"], priceRange: [800, 5000], typicalAbv: [13.5, 14.5] },
  { countryCode: "CL", regionName: "Casablanca", typicalGrapes: ["Sauvignon Blanc", "Chardonnay", "Pinot Noir"], priceRange: [1000, 4000], typicalAbv: [12.5, 13.5] },

  // Australia
  { countryCode: "AU", regionName: "Barossa Valley", typicalGrapes: ["Shiraz", "Grenache", "Mourvèdre"], priceRange: [1500, 15000], typicalAbv: [14.0, 15.5] },
  { countryCode: "AU", regionName: "McLaren Vale", typicalGrapes: ["Shiraz", "Grenache"], priceRange: [1500, 8000], typicalAbv: [14.0, 15.0] },
  { countryCode: "AU", regionName: "Margaret River", typicalGrapes: ["Cabernet Sauvignon", "Chardonnay"], priceRange: [2000, 10000], typicalAbv: [13.5, 14.5] },

  // New Zealand
  { countryCode: "NZ", regionName: "Marlborough", typicalGrapes: ["Sauvignon Blanc", "Pinot Noir"], priceRange: [1500, 5000], typicalAbv: [12.5, 14.0] },
  { countryCode: "NZ", regionName: "Central Otago", typicalGrapes: ["Pinot Noir"], priceRange: [2500, 10000], typicalAbv: [13.0, 14.5] },

  // South Africa
  { countryCode: "ZA", regionName: "Stellenbosch", typicalGrapes: ["Cabernet Sauvignon", "Pinotage", "Syrah"], priceRange: [1000, 6000], typicalAbv: [13.5, 14.5] },

  // Portugal
  { countryCode: "PT", regionName: "Douro", typicalGrapes: ["Touriga Nacional", "Tinta Roriz"], priceRange: [1000, 8000], typicalAbv: [13.0, 14.5] },
  { countryCode: "PT", regionName: "Vinho Verde", typicalGrapes: ["Albariño", "Loureiro"], priceRange: [800, 2500], typicalAbv: [9.0, 12.0] },

  // Germany
  { countryCode: "DE", regionName: "Mosel", typicalGrapes: ["Riesling"], priceRange: [1500, 8000], typicalAbv: [8.0, 12.5] },
  { countryCode: "DE", regionName: "Rheingau", typicalGrapes: ["Riesling"], priceRange: [2000, 10000], typicalAbv: [11.0, 13.0] },
  { countryCode: "DE", regionName: "Pfalz", typicalGrapes: ["Riesling", "Pinot Noir"], priceRange: [1500, 6000], typicalAbv: [12.0, 13.5] },

  // Austria
  { countryCode: "AT", regionName: "Wachau", typicalGrapes: ["Grüner Veltliner", "Riesling"], priceRange: [2000, 10000], typicalAbv: [12.0, 14.0] },

  // Japan
  { countryCode: "JP", regionName: "Yamanashi", typicalGrapes: ["Koshu", "Muscat Bailey A"], priceRange: [1500, 5000], typicalAbv: [10.0, 13.0] },
  { countryCode: "JP", regionName: "Nagano", typicalGrapes: ["Merlot", "Chardonnay", "Cabernet Sauvignon"], priceRange: [2000, 6000], typicalAbv: [12.0, 13.5] },

  // Georgia
  { countryCode: "GE", regionName: "Kakheti", typicalGrapes: ["Saperavi", "Rkatsiteli"], priceRange: [1000, 4000], typicalAbv: [12.0, 14.0] },

  // Hungary
  { countryCode: "HU", regionName: "Tokaj", typicalGrapes: ["Furmint", "Hárslevelű"], priceRange: [2000, 15000], typicalAbv: [9.0, 14.0] },
];

// === Helper functions ===

/** Get grape profile, returns undefined if not found */
export function getGrapeProfile(grape: string): GrapeProfile | undefined {
  return GRAPE_PROFILES[grape];
}

/** Get region defaults */
export function getRegionDefaults(countryCode: string, regionName: string): RegionDefaults | undefined {
  return REGION_DEFAULTS.find(
    (r) => r.countryCode === countryCode && r.regionName === regionName
  );
}

/** Merge aromas from multiple grapes, dedup */
export function getDefaultAromas(grapes: string[]): string[] {
  const aromas = new Set<string>();
  for (const grape of grapes) {
    const profile = GRAPE_PROFILES[grape];
    if (profile) {
      for (const a of profile.aromas) {
        aromas.add(a);
      }
    }
  }
  return Array.from(aromas);
}

/** Average palate from multiple grapes */
export function getDefaultPalate(grapes: string[], isRed: boolean) {
  const profiles = grapes
    .map((g) => GRAPE_PROFILES[g])
    .filter((p): p is GrapeProfile => !!p);

  if (profiles.length === 0) {
    return {
      sweetness: 3 as PalateLevel,
      acidity: 3 as PalateLevel,
      tannin: (isRed ? 3 : null) as PalateLevel | null,
      body: 3 as PalateLevel,
      finish: 3 as PalateLevel,
    };
  }

  const avg = (vals: number[]) =>
    Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) as PalateLevel;

  return {
    sweetness: avg(profiles.map((p) => p.palate.sweetness)),
    acidity: avg(profiles.map((p) => p.palate.acidity)),
    tannin: isRed
      ? avg(profiles.filter((p) => p.palate.tannin !== null).map((p) => p.palate.tannin!))
      : null,
    body: avg(profiles.map((p) => p.palate.body)),
    finish: avg(profiles.map((p) => p.palate.finish)),
  };
}

/** Get average ABV from grapes */
export function getDefaultAbv(grapes: string[]): number | null {
  const profiles = grapes
    .map((g) => GRAPE_PROFILES[g])
    .filter((p): p is GrapeProfile => !!p);
  if (profiles.length === 0) return null;
  const avg =
    profiles.reduce((sum, p) => sum + (p.abvRange[0] + p.abvRange[1]) / 2, 0) /
    profiles.length;
  return Math.round(avg * 10) / 10;
}

/** Get price range string */
export function formatPriceRange(range: [number, number]): string {
  return `¥${range[0].toLocaleString()}〜¥${range[1].toLocaleString()}`;
}

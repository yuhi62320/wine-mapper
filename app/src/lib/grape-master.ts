/**
 * Grape variety master data.
 * Canonical ID is the English name. Matching is case-insensitive
 * and checks all aliases (Japanese, common synonyms, etc.).
 */

export interface GrapeMaster {
  id: string;       // canonical English name (key)
  nameEn: string;
  nameJa: string;
  aliases: string[]; // all alternative spellings / languages
  isRed: boolean;
}

export const GRAPE_MASTER: GrapeMaster[] = [
  // ===== RED =====
  {
    id: "Cabernet Sauvignon",
    nameEn: "Cabernet Sauvignon",
    nameJa: "カベルネ・ソーヴィニヨン",
    aliases: ["カベルネソーヴィニヨン", "カベルネ ソーヴィニヨン", "Cab Sauv", "CS"],
    isRed: true,
  },
  {
    id: "Merlot",
    nameEn: "Merlot",
    nameJa: "メルロー",
    aliases: ["メルロ", "Merlot Noir"],
    isRed: true,
  },
  {
    id: "Pinot Noir",
    nameEn: "Pinot Noir",
    nameJa: "ピノ・ノワール",
    aliases: ["ピノノワール", "ピノ ノワール", "Spätburgunder", "Pinot Nero", "シュペートブルグンダー"],
    isRed: true,
  },
  {
    id: "Syrah",
    nameEn: "Syrah",
    nameJa: "シラー",
    aliases: ["Shiraz", "シラーズ"],
    isRed: true,
  },
  {
    id: "Grenache",
    nameEn: "Grenache",
    nameJa: "グルナッシュ",
    aliases: ["Garnacha", "ガルナッチャ", "Grenache Noir", "Cannonau"],
    isRed: true,
  },
  {
    id: "Tempranillo",
    nameEn: "Tempranillo",
    nameJa: "テンプラニーリョ",
    aliases: ["Tinta Roriz", "Tinta de Toro", "Aragonez", "Cencibel", "ティンタ・ロリス"],
    isRed: true,
  },
  {
    id: "Sangiovese",
    nameEn: "Sangiovese",
    nameJa: "サンジョヴェーゼ",
    aliases: ["サンジョベーゼ", "Brunello", "Morellino", "Prugnolo Gentile"],
    isRed: true,
  },
  {
    id: "Nebbiolo",
    nameEn: "Nebbiolo",
    nameJa: "ネッビオーロ",
    aliases: ["ネビオーロ", "Spanna", "Chiavennasca"],
    isRed: true,
  },
  {
    id: "Malbec",
    nameEn: "Malbec",
    nameJa: "マルベック",
    aliases: ["Côt", "Auxerrois", "コット"],
    isRed: true,
  },
  {
    id: "Zinfandel",
    nameEn: "Zinfandel",
    nameJa: "ジンファンデル",
    aliases: ["Primitivo", "プリミティーヴォ", "Tribidrag"],
    isRed: true,
  },
  {
    id: "Cabernet Franc",
    nameEn: "Cabernet Franc",
    nameJa: "カベルネ・フラン",
    aliases: ["カベルネフラン", "カベルネ フラン", "Bouchet", "Breton"],
    isRed: true,
  },
  {
    id: "Barbera",
    nameEn: "Barbera",
    nameJa: "バルベーラ",
    aliases: ["バルベラ"],
    isRed: true,
  },
  {
    id: "Gamay",
    nameEn: "Gamay",
    nameJa: "ガメイ",
    aliases: ["ガメ", "Gamay Noir"],
    isRed: true,
  },
  {
    id: "Mourvèdre",
    nameEn: "Mourvèdre",
    nameJa: "ムールヴェードル",
    aliases: ["Monastrell", "モナストレル", "Mataro"],
    isRed: true,
  },
  {
    id: "Pinotage",
    nameEn: "Pinotage",
    nameJa: "ピノタージュ",
    aliases: [],
    isRed: true,
  },
  {
    id: "Nero d'Avola",
    nameEn: "Nero d'Avola",
    nameJa: "ネロ・ダーヴォラ",
    aliases: ["ネロダーヴォラ", "Calabrese"],
    isRed: true,
  },
  {
    id: "Carménère",
    nameEn: "Carménère",
    nameJa: "カルメネール",
    aliases: ["Carmenere", "カルメネーレ"],
    isRed: true,
  },
  {
    id: "Tannat",
    nameEn: "Tannat",
    nameJa: "タナ",
    aliases: ["タナット"],
    isRed: true,
  },
  {
    id: "Touriga Nacional",
    nameEn: "Touriga Nacional",
    nameJa: "トゥリガ・ナシオナル",
    aliases: ["トゥーリガ・ナショナル", "Touriga"],
    isRed: true,
  },
  {
    id: "Aglianico",
    nameEn: "Aglianico",
    nameJa: "アリアニコ",
    aliases: ["アリアーニコ"],
    isRed: true,
  },
  {
    id: "Corvina",
    nameEn: "Corvina",
    nameJa: "コルヴィーナ",
    aliases: ["コルビーナ", "Corvina Veronese"],
    isRed: true,
  },
  {
    id: "Petit Verdot",
    nameEn: "Petit Verdot",
    nameJa: "プティ・ヴェルド",
    aliases: ["プティヴェルド", "Petite Verdot"],
    isRed: true,
  },
  {
    id: "Carignan",
    nameEn: "Carignan",
    nameJa: "カリニャン",
    aliases: ["Cariñena", "Mazuelo", "カリニャーノ"],
    isRed: true,
  },
  {
    id: "Cinsault",
    nameEn: "Cinsault",
    nameJa: "サンソー",
    aliases: ["Cinsaut"],
    isRed: true,
  },
  {
    id: "Dolcetto",
    nameEn: "Dolcetto",
    nameJa: "ドルチェット",
    aliases: [],
    isRed: true,
  },
  {
    id: "Nerello Mascalese",
    nameEn: "Nerello Mascalese",
    nameJa: "ネレッロ・マスカレーゼ",
    aliases: ["ネレッロマスカレーゼ"],
    isRed: true,
  },
  {
    id: "Bonarda",
    nameEn: "Bonarda",
    nameJa: "ボナルダ",
    aliases: [],
    isRed: true,
  },
  {
    id: "Saperavi",
    nameEn: "Saperavi",
    nameJa: "サペラヴィ",
    aliases: [],
    isRed: true,
  },
  {
    id: "Muscat Bailey A",
    nameEn: "Muscat Bailey A",
    nameJa: "マスカット・ベーリーA",
    aliases: ["マスカットベーリーA", "MBA"],
    isRed: true,
  },

  // ===== WHITE =====
  {
    id: "Chardonnay",
    nameEn: "Chardonnay",
    nameJa: "シャルドネ",
    aliases: ["Morillon"],
    isRed: false,
  },
  {
    id: "Sauvignon Blanc",
    nameEn: "Sauvignon Blanc",
    nameJa: "ソーヴィニヨン・ブラン",
    aliases: ["ソーヴィニヨンブラン", "ソービニョンブラン", "Fumé Blanc", "フュメブラン"],
    isRed: false,
  },
  {
    id: "Riesling",
    nameEn: "Riesling",
    nameJa: "リースリング",
    aliases: [],
    isRed: false,
  },
  {
    id: "Pinot Grigio",
    nameEn: "Pinot Grigio",
    nameJa: "ピノ・グリージョ",
    aliases: ["ピノグリージョ", "Pinot Gris", "ピノ・グリ", "ピノグリ", "Grauburgunder", "グラウブルグンダー", "Ruländer"],
    isRed: false,
  },
  {
    id: "Gewürztraminer",
    nameEn: "Gewürztraminer",
    nameJa: "ゲヴュルツトラミネール",
    aliases: ["Gewurztraminer", "ゲヴェルツトラミネール", "Traminer"],
    isRed: false,
  },
  {
    id: "Viognier",
    nameEn: "Viognier",
    nameJa: "ヴィオニエ",
    aliases: ["ビオニエ"],
    isRed: false,
  },
  {
    id: "Chenin Blanc",
    nameEn: "Chenin Blanc",
    nameJa: "シュナン・ブラン",
    aliases: ["シュナンブラン", "Steen", "Pineau de la Loire"],
    isRed: false,
  },
  {
    id: "Sémillon",
    nameEn: "Sémillon",
    nameJa: "セミヨン",
    aliases: ["Semillon"],
    isRed: false,
  },
  {
    id: "Muscat",
    nameEn: "Muscat",
    nameJa: "ミュスカ",
    aliases: ["Moscato", "モスカート", "Muscat Blanc", "Moscatel", "マスカット"],
    isRed: false,
  },
  {
    id: "Albariño",
    nameEn: "Albariño",
    nameJa: "アルバリーニョ",
    aliases: ["Alvarinho", "Albarino"],
    isRed: false,
  },
  {
    id: "Grüner Veltliner",
    nameEn: "Grüner Veltliner",
    nameJa: "グリューナー・フェルトリーナー",
    aliases: ["Gruner Veltliner", "グリューナーフェルトリーナー"],
    isRed: false,
  },
  {
    id: "Torrontés",
    nameEn: "Torrontés",
    nameJa: "トロンテス",
    aliases: ["Torrontes"],
    isRed: false,
  },
  {
    id: "Vermentino",
    nameEn: "Vermentino",
    nameJa: "ヴェルメンティーノ",
    aliases: ["Rolle"],
    isRed: false,
  },
  {
    id: "Trebbiano",
    nameEn: "Trebbiano",
    nameJa: "トレッビアーノ",
    aliases: ["Ugni Blanc", "ユニブラン"],
    isRed: false,
  },
  {
    id: "Assyrtiko",
    nameEn: "Assyrtiko",
    nameJa: "アシルティコ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Koshu",
    nameEn: "Koshu",
    nameJa: "甲州",
    aliases: ["コシュウ"],
    isRed: false,
  },
  {
    id: "Melon de Bourgogne",
    nameEn: "Melon de Bourgogne",
    nameJa: "ムロン・ド・ブルゴーニュ",
    aliases: ["Muscadet"],
    isRed: false,
  },
  {
    id: "Verdejo",
    nameEn: "Verdejo",
    nameJa: "ベルデホ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Fiano",
    nameEn: "Fiano",
    nameJa: "フィアーノ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Garganega",
    nameEn: "Garganega",
    nameJa: "ガルガネーガ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Glera",
    nameEn: "Glera",
    nameJa: "グレーラ",
    aliases: ["Prosecco"],
    isRed: false,
  },
  {
    id: "Marsanne",
    nameEn: "Marsanne",
    nameJa: "マルサンヌ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Roussanne",
    nameEn: "Roussanne",
    nameJa: "ルーサンヌ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Müller-Thurgau",
    nameEn: "Müller-Thurgau",
    nameJa: "ミュラー・トゥルガウ",
    aliases: ["Muller-Thurgau", "Rivaner", "ミュラートゥルガウ"],
    isRed: false,
  },
  {
    id: "Silvaner",
    nameEn: "Silvaner",
    nameJa: "シルヴァーナー",
    aliases: ["Sylvaner"],
    isRed: false,
  },
  {
    id: "Furmint",
    nameEn: "Furmint",
    nameJa: "フルミント",
    aliases: [],
    isRed: false,
  },
  {
    id: "Rkatsiteli",
    nameEn: "Rkatsiteli",
    nameJa: "ルカツィテリ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Cortese",
    nameEn: "Cortese",
    nameJa: "コルテーゼ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Pinot Meunier",
    nameEn: "Pinot Meunier",
    nameJa: "ピノ・ムニエ",
    aliases: ["ピノムニエ", "Meunier", "Schwarzriesling"],
    isRed: false, // used mainly in sparkling
  },
  {
    id: "Petit Manseng",
    nameEn: "Petit Manseng",
    nameJa: "プティ・マンサン",
    aliases: ["プティマンサン"],
    isRed: false,
  },
  {
    id: "Grillo",
    nameEn: "Grillo",
    nameJa: "グリッロ",
    aliases: [],
    isRed: false,
  },
  {
    id: "Pecorino",
    nameEn: "Pecorino",
    nameJa: "ペコリーノ",
    aliases: [],
    isRed: false,
  },
];

// Build lookup index (case-insensitive)
const lookupIndex = new Map<string, string>();

for (const g of GRAPE_MASTER) {
  const addKey = (key: string) => lookupIndex.set(key.toLowerCase(), g.id);
  addKey(g.id);
  addKey(g.nameEn);
  addKey(g.nameJa);
  for (const alias of g.aliases) {
    addKey(alias);
  }
}

/**
 * Normalize a grape name to canonical ID.
 * Matches English name, Japanese name, and all aliases (case-insensitive).
 * Returns the canonical ID or null if not found.
 */
export function normalizeGrape(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Exact match (case-insensitive)
  const exact = lookupIndex.get(trimmed.toLowerCase());
  if (exact) return exact;

  // Try removing common separator differences
  const normalized = trimmed
    .replace(/[・\s\-\.]+/g, "")
    .toLowerCase();
  for (const [key, id] of lookupIndex) {
    if (key.replace(/[・\s\-\.]+/g, "") === normalized) {
      return id;
    }
  }

  return null;
}

/**
 * Normalize a list of grape names, dedup by canonical ID.
 * Returns array of canonical IDs.
 */
export function normalizeGrapes(inputs: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const input of inputs) {
    const id = normalizeGrape(input);
    const key = id || input.trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      result.push(key);
    }
  }
  return result;
}

/**
 * Get grape master entry by any name/alias.
 */
export function findGrape(input: string): GrapeMaster | undefined {
  const id = normalizeGrape(input);
  if (!id) return undefined;
  return GRAPE_MASTER.find((g) => g.id === id);
}

/**
 * Get display name for a grape (Japanese + English).
 */
export function getGrapeDisplayName(input: string): string {
  const grape = findGrape(input);
  if (!grape) return input;
  return `${grape.nameJa}（${grape.nameEn}）`;
}

/**
 * Get all grape names for autocomplete suggestions.
 * Returns array of { id, label } where label is "日本語名 (English Name)"
 */
export function getGrapeSuggestions(): { id: string; label: string }[] {
  return GRAPE_MASTER.map((g) => ({
    id: g.id,
    label: `${g.nameJa}（${g.nameEn}）`,
  }));
}

import { Badge, Rank, UserProfile, WineLog } from "./types";

// ============================================================
// BADGE RARITY & POINT SYSTEM
// ============================================================
// Badge rarity determines point value. Total badge points → Rank.
//
//   ★       Common      = 1 pt   (natural milestones, first-time experiences)
//   ★★      Uncommon    = 3 pt   (some dedication required)
//   ★★★     Rare        = 7 pt   (significant commitment)
//   ★★★★    Epic        = 15 pt  (impressive achievement)
//   ★★★★★   Legendary   = 30 pt  (extraordinary, bragging rights)
// ============================================================

export type BadgeRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export const RARITY_POINTS: Record<BadgeRarity, number> = {
  common: 1,
  uncommon: 3,
  rare: 7,
  epic: 15,
  legendary: 30,
};

export const RARITY_LABELS: Record<BadgeRarity, { en: string; ja: string; stars: string }> = {
  common:    { en: "Common",    ja: "コモン",      stars: "★" },
  uncommon:  { en: "Uncommon",  ja: "アンコモン",  stars: "★★" },
  rare:      { en: "Rare",      ja: "レア",        stars: "★★★" },
  epic:      { en: "Epic",      ja: "エピック",    stars: "★★★★" },
  legendary: { en: "Legendary", ja: "レジェンダリー", stars: "★★★★★" },
};

// ============================================================
// RANKS: 10 tiers, unlocked by total badge points
// ============================================================

export const RANKS: Rank[] = [
  { name: "Néophyte",         nameJa: "ネオフィット",         minXp: 0,   icon: "🌱", description: "ワインの世界への扉を開いた" },
  { name: "Dégustateur",      nameJa: "デギュスタトゥール",   minXp: 5,   icon: "👅", description: "「飲む」から「味わう」への転換" },
  { name: "Épicurien",        nameJa: "エピキュリアン",       minXp: 15,  icon: "🍷", description: "ワインのある生活を楽しんでいる" },
  { name: "Explorateur",      nameJa: "エクスプロラトゥール", minXp: 35,  icon: "🧭", description: "未知の産地と品種を求めて旅する者" },
  { name: "Œnophile",         nameJa: "エノファイル",         minXp: 70,  icon: "❤️‍🔥", description: "ワインへの愛が本物になった" },
  { name: "Connaisseur",      nameJa: "コネスール",           minXp: 120, icon: "🎩", description: "目利きの称号。知識と経験の結晶" },
  { name: "Sommelier",        nameJa: "ソムリエ",             minXp: 200, icon: "🎖️", description: "プロフェッショナルに匹敵する力" },
  { name: "Grand Cru",        nameJa: "グラン・クリュ",       minXp: 320, icon: "⭐", description: "特級の存在。ワインの世界の頂点が見える" },
  { name: "Master of Wine",   nameJa: "マスター・オブ・ワイン", minXp: 500, icon: "👑", description: "世界421名のMWに並ぶ至高の知性" },
  { name: "Dionysus",         nameJa: "ディオニュソス",       minXp: 750, icon: "🏛️", description: "酒神。すべてを極めし伝説の存在" },
];

export function getTotalBadgePoints(profile: UserProfile, wines: WineLog[]): number {
  let total = 0;
  for (const badge of BADGES) {
    if (badge.condition(profile, wines)) {
      total += RARITY_POINTS[badge.rarity];
    }
  }
  return total;
}

export function getEarnedBadges(profile: UserProfile, wines: WineLog[]): Badge[] {
  return BADGES.filter((b) => b.condition(profile, wines));
}

export function getCurrentRank(xp: number): Rank {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) rank = r;
  }
  return rank;
}

export function getNextRank(xp: number): Rank | null {
  for (const r of RANKS) {
    if (xp < r.minXp) return r;
  }
  return null;
}

export function getRankProgress(xp: number): number {
  const current = getCurrentRank(xp);
  const next = getNextRank(xp);
  if (!next) return 100;
  const range = next.minXp - current.minXp;
  const progress = xp - current.minXp;
  return Math.round((progress / range) * 100);
}

// Keep for backward compat but badge points are the primary system now
export function calculateXpForLog(wine: WineLog): number {
  let xp = 10;
  if (wine.notes.length > 0) xp += 5;
  if (wine.aromas.length >= 3) xp += 5;
  return xp;
}

export function calculateBonusXp(
  wine: WineLog,
  profile: UserProfile
): { xp: number; reasons: string[] } {
  let xp = 0;
  const reasons: string[] = [];
  if (wine.country && !profile.countriesExplored.includes(wine.country)) {
    xp += 50;
    reasons.push(`🌍 新しい国: ${wine.country} (+50 XP)`);
  }
  if (wine.region && !profile.regionsExplored.includes(wine.region)) {
    xp += 25;
    reasons.push(`🗺️ 新しい地域: ${wine.region} (+25 XP)`);
  }
  for (const grape of wine.grapeVarieties) {
    if (!profile.grapesExplored.includes(grape)) {
      xp += 20;
      reasons.push(`🍇 新しい品種: ${grape} (+20 XP)`);
    }
  }
  return { xp, reasons };
}

// ============================================================
// HELPER: Count wines by dimension
// ============================================================

function countByCountry(wines: WineLog[], country: string): number {
  return wines.filter((w) => w.country === country).length;
}

function countByRegion(wines: WineLog[], region: string): number {
  return wines.filter((w) => w.region === region).length;
}

function countByGrape(wines: WineLog[], grape: string): number {
  return wines.filter((w) => w.grapeVarieties.includes(grape)).length;
}

function uniqueRegionsInCountry(wines: WineLog[], country: string): number {
  return new Set(wines.filter((w) => w.country === country).map((w) => w.region)).size;
}

function uniqueCountries(wines: WineLog[]): Set<string> {
  return new Set(wines.map((w) => w.country).filter(Boolean));
}

function uniqueGrapes(wines: WineLog[]): Set<string> {
  return new Set(wines.flatMap((w) => w.grapeVarieties));
}

function maxWinesFromSingleCountry(wines: WineLog[]): number {
  const counts: Record<string, number> = {};
  for (const w of wines) {
    if (w.country) counts[w.country] = (counts[w.country] || 0) + 1;
  }
  return Math.max(0, ...Object.values(counts));
}

function maxWinesFromSingleRegion(wines: WineLog[]): number {
  const counts: Record<string, number> = {};
  for (const w of wines) {
    if (w.region) counts[w.region] = (counts[w.region] || 0) + 1;
  }
  return Math.max(0, ...Object.values(counts));
}

function maxWinesFromSingleGrape(wines: WineLog[]): number {
  const counts: Record<string, number> = {};
  for (const w of wines) {
    for (const g of w.grapeVarieties) {
      counts[g] = (counts[g] || 0) + 1;
    }
  }
  return Math.max(0, ...Object.values(counts));
}

function maxRegionsInSingleCountry(wines: WineLog[]): number {
  const countryRegions: Record<string, Set<string>> = {};
  for (const w of wines) {
    if (w.country && w.region) {
      if (!countryRegions[w.country]) countryRegions[w.country] = new Set();
      countryRegions[w.country].add(w.region);
    }
  }
  return Math.max(0, ...Object.values(countryRegions).map((s) => s.size));
}

function hasVerticalTasting(wines: WineLog[], minVintages: number): boolean {
  const producerVintages: Record<string, Set<number>> = {};
  for (const w of wines) {
    if (w.producer && w.vintage) {
      if (!producerVintages[w.producer]) producerVintages[w.producer] = new Set();
      producerVintages[w.producer].add(w.vintage);
    }
  }
  return Object.values(producerVintages).some((v) => v.size >= minVintages);
}

const NOBLE_GRAPES = ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Chardonnay", "Sauvignon Blanc", "Riesling"];

// ============================================================
// BADGES: ~80 badges across breadth × depth dimensions
// ============================================================

export const BADGES: Badge[] = [

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📊 VOLUME — Total wines logged (breadth of experience)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "log-1", name: "First Sip", nameJa: "最初の一杯", description: "初めてのワインを記録した", category: "milestone", rarity: "common", icon: "🥂",
    condition: (p) => p.wineCount >= 1 },
  { id: "log-12", name: "Case Complete", nameJa: "1ケース達成", description: "12本（1ケース分）記録した", category: "milestone", rarity: "common", icon: "📦",
    condition: (p) => p.wineCount >= 12 },
  { id: "log-50", name: "Half Century", nameJa: "半世紀の味", description: "50本記録した", category: "milestone", rarity: "uncommon", icon: "🎯",
    condition: (p) => p.wineCount >= 50 },
  { id: "log-100", name: "Centurion", nameJa: "百本の記憶", description: "100本記録した", category: "milestone", rarity: "rare", icon: "💯",
    condition: (p) => p.wineCount >= 100 },
  { id: "log-300", name: "Cellar Worthy", nameJa: "セラーに値する", description: "300本記録した", category: "milestone", rarity: "epic", icon: "🏛️",
    condition: (p) => p.wineCount >= 300 },
  { id: "log-500", name: "Grand Cellar", nameJa: "グラン・セラー", description: "500本記録した", category: "milestone", rarity: "epic", icon: "🏰",
    condition: (p) => p.wineCount >= 500 },
  { id: "log-1000", name: "Millennial Taster", nameJa: "千本の舌", description: "1000本記録。もはや伝説", category: "milestone", rarity: "legendary", icon: "🌟",
    condition: (p) => p.wineCount >= 1000 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🌍 COUNTRIES — Breadth: how many countries
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "country-2", name: "Passport Stamp", nameJa: "最初のスタンプ", description: "2カ国のワインを体験した", category: "discovery", rarity: "common", icon: "🛫",
    condition: (p) => p.countriesExplored.length >= 2 },
  { id: "country-5", name: "Globe Trotter", nameJa: "世界旅行者", description: "5カ国のワインを体験した", category: "discovery", rarity: "uncommon", icon: "🌍",
    condition: (p) => p.countriesExplored.length >= 5 },
  { id: "country-10", name: "World Explorer", nameJa: "ワールド・エクスプローラー", description: "10カ国のワインを体験した", category: "discovery", rarity: "rare", icon: "🌏",
    condition: (p) => p.countriesExplored.length >= 10 },
  { id: "country-15", name: "Continental", nameJa: "コンチネンタル", description: "15カ国のワインを体験した", category: "discovery", rarity: "epic", icon: "✈️",
    condition: (p) => p.countriesExplored.length >= 15 },
  { id: "country-20", name: "Wine Diplomat", nameJa: "ワイン外交官", description: "20カ国のワインを制覇した", category: "discovery", rarity: "legendary", icon: "🕊️",
    condition: (p) => p.countriesExplored.length >= 20 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🏴 COUNTRY DEPTH — How many wines from a single country
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "country-depth-5", name: "Country Regular", nameJa: "お国の常連", description: "1つの国のワインを5本飲んだ", category: "terroir", rarity: "common", icon: "🏠",
    condition: (_p, w) => maxWinesFromSingleCountry(w) >= 5 },
  { id: "country-depth-15", name: "Country Devotee", nameJa: "国への献身", description: "1つの国のワインを15本飲んだ", category: "terroir", rarity: "uncommon", icon: "🏡",
    condition: (_p, w) => maxWinesFromSingleCountry(w) >= 15 },
  { id: "country-depth-30", name: "Country Expert", nameJa: "その国の専門家", description: "1つの国のワインを30本飲んだ", category: "terroir", rarity: "rare", icon: "🎓",
    condition: (_p, w) => maxWinesFromSingleCountry(w) >= 30 },
  { id: "country-depth-50", name: "Country Ambassador", nameJa: "その国の大使", description: "1つの国のワインを50本飲んだ", category: "terroir", rarity: "epic", icon: "🏛️",
    condition: (_p, w) => maxWinesFromSingleCountry(w) >= 50 },
  { id: "country-depth-100", name: "Country Master", nameJa: "その国のマスター", description: "1つの国のワインを100本飲んだ", category: "terroir", rarity: "legendary", icon: "👑",
    condition: (_p, w) => maxWinesFromSingleCountry(w) >= 100 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🗺️ REGIONS — Breadth: how many regions total
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "region-3", name: "Region Curious", nameJa: "地域への好奇心", description: "3つの地域を探索した", category: "discovery", rarity: "common", icon: "📍",
    condition: (p) => p.regionsExplored.length >= 3 },
  { id: "region-10", name: "Region Explorer", nameJa: "地域探索者", description: "10の地域を探索した", category: "discovery", rarity: "uncommon", icon: "🗺️",
    condition: (p) => p.regionsExplored.length >= 10 },
  { id: "region-25", name: "Terroir Seeker", nameJa: "テロワールの求道者", description: "25の地域を探索した", category: "discovery", rarity: "rare", icon: "🧭",
    condition: (p) => p.regionsExplored.length >= 25 },
  { id: "region-50", name: "Terroir Master", nameJa: "テロワール・マスター", description: "50の地域を探索した", category: "discovery", rarity: "epic", icon: "🌐",
    condition: (p) => p.regionsExplored.length >= 50 },
  { id: "region-100", name: "World Atlas", nameJa: "世界ワイン地図", description: "100の地域を制覇した", category: "discovery", rarity: "legendary", icon: "📚",
    condition: (p) => p.regionsExplored.length >= 100 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📌 REGION DEPTH — How many wines from a single region
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "region-depth-3", name: "Region Regular", nameJa: "地域の常連", description: "1つの地域のワインを3本飲んだ", category: "terroir", rarity: "common", icon: "📌",
    condition: (_p, w) => maxWinesFromSingleRegion(w) >= 3 },
  { id: "region-depth-10", name: "Region Devotee", nameJa: "地域への献身", description: "1つの地域のワインを10本飲んだ", category: "terroir", rarity: "uncommon", icon: "🏘️",
    condition: (_p, w) => maxWinesFromSingleRegion(w) >= 10 },
  { id: "region-depth-25", name: "Region Specialist", nameJa: "地域のスペシャリスト", description: "1つの地域のワインを25本飲んだ", category: "terroir", rarity: "rare", icon: "🔬",
    condition: (_p, w) => maxWinesFromSingleRegion(w) >= 25 },
  { id: "region-depth-50", name: "Region Authority", nameJa: "地域の権威", description: "1つの地域のワインを50本飲んだ", category: "terroir", rarity: "epic", icon: "🏆",
    condition: (_p, w) => maxWinesFromSingleRegion(w) >= 50 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🗾 REGIONS IN COUNTRY — How many regions within one country
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "country-regions-3", name: "Multi-Region", nameJa: "マルチリージョン", description: "1つの国の3地域を体験した", category: "terroir", rarity: "common", icon: "🗾",
    condition: (_p, w) => maxRegionsInSingleCountry(w) >= 3 },
  { id: "country-regions-5", name: "Deep Diver", nameJa: "ディープダイバー", description: "1つの国の5地域を体験した", category: "terroir", rarity: "uncommon", icon: "🤿",
    condition: (_p, w) => maxRegionsInSingleCountry(w) >= 5 },
  { id: "country-regions-8", name: "National Expert", nameJa: "ナショナル・エキスパート", description: "1つの国の8地域を体験した", category: "terroir", rarity: "rare", icon: "🎯",
    condition: (_p, w) => maxRegionsInSingleCountry(w) >= 8 },
  { id: "country-regions-10", name: "National Authority", nameJa: "ナショナル・オーソリティ", description: "1つの国の10地域を制覇した", category: "terroir", rarity: "epic", icon: "📖",
    condition: (_p, w) => maxRegionsInSingleCountry(w) >= 10 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🍇 GRAPE VARIETIES — Breadth: how many varieties
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "grape-3", name: "First Trio", nameJa: "最初の3品種", description: "3品種のワインを体験した", category: "expertise", rarity: "common", icon: "🌱",
    condition: (p) => p.grapesExplored.length >= 3 },
  { id: "grape-noble", name: "Noble Six", nameJa: "ノーブル・シックス", description: "6大国際品種を全て体験した", category: "expertise", rarity: "uncommon", icon: "👑",
    condition: (p) => NOBLE_GRAPES.every((g) => p.grapesExplored.includes(g)) },
  { id: "grape-10", name: "Grape Explorer", nameJa: "品種探索者", description: "10品種のワインを体験した", category: "expertise", rarity: "uncommon", icon: "🍇",
    condition: (p) => p.grapesExplored.length >= 10 },
  { id: "grape-25", name: "Ampélographe", nameJa: "アンペログラフ", description: "25品種を体験した", category: "expertise", rarity: "rare", icon: "🌿",
    condition: (p) => p.grapesExplored.length >= 25 },
  { id: "grape-50", name: "Grape Genome", nameJa: "品種のゲノム", description: "50品種を制覇した。ソムリエ試験レベル", category: "expertise", rarity: "epic", icon: "🧬",
    condition: (p) => p.grapesExplored.length >= 50 },
  { id: "grape-100", name: "Living Vine Library", nameJa: "生きた品種図鑑", description: "100品種を体験。あなた自身がマスタデータ", category: "expertise", rarity: "legendary", icon: "📖",
    condition: (p) => p.grapesExplored.length >= 100 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🍷 GRAPE DEPTH — How many wines of a single variety
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "grape-depth-5", name: "Variety Regular", nameJa: "品種の常連", description: "1つの品種を5回飲んだ", category: "expertise", rarity: "common", icon: "🔁",
    condition: (_p, w) => maxWinesFromSingleGrape(w) >= 5 },
  { id: "grape-depth-10", name: "Variety Devotee", nameJa: "品種への献身", description: "1つの品種を10回飲んだ", category: "expertise", rarity: "uncommon", icon: "💜",
    condition: (_p, w) => maxWinesFromSingleGrape(w) >= 10 },
  { id: "grape-depth-25", name: "Mono-Cépage", nameJa: "モノセパージュ", description: "1つの品種を25回飲んだ。その品種のすべてを知る", category: "expertise", rarity: "rare", icon: "🎯",
    condition: (_p, w) => maxWinesFromSingleGrape(w) >= 25 },
  { id: "grape-depth-50", name: "Varietal Master", nameJa: "品種のマスター", description: "1つの品種を50回飲んだ。世界随一の理解者", category: "expertise", rarity: "epic", icon: "🏅",
    condition: (_p, w) => maxWinesFromSingleGrape(w) >= 50 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🌈 WINE TYPES — Breadth & depth of styles
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "type-rainbow", name: "Rainbow Cellar", nameJa: "虹のセラー", description: "全7タイプを体験した", category: "collection", rarity: "rare", icon: "🌈",
    condition: (_p, w) => new Set(w.map((v) => v.type)).size >= 7 },
  { id: "type-red-20", name: "Rouge Devotee", nameJa: "赤ワインの信徒", description: "赤ワインを20本記録した", category: "collection", rarity: "uncommon", icon: "🍷",
    condition: (_p, w) => w.filter((v) => v.type === "red").length >= 20 },
  { id: "type-white-20", name: "Blanc Purist", nameJa: "白ワインの求道者", description: "白ワインを20本記録した", category: "collection", rarity: "uncommon", icon: "🥃",
    condition: (_p, w) => w.filter((v) => v.type === "white").length >= 20 },
  { id: "type-sparkling-10", name: "Bubble Enthusiast", nameJa: "泡の虜", description: "スパークリングを10本記録した", category: "collection", rarity: "uncommon", icon: "🫧",
    condition: (_p, w) => w.filter((v) => v.type === "sparkling").length >= 10 },
  { id: "type-rose-5", name: "Rosé Garden", nameJa: "ロゼの庭", description: "ロゼを5本記録した", category: "collection", rarity: "common", icon: "🌸",
    condition: (_p, w) => w.filter((v) => v.type === "rose").length >= 5 },
  { id: "type-fortified-5", name: "Fortified Fortress", nameJa: "酒精強化の砦", description: "酒精強化ワインを5本記録した", category: "collection", rarity: "uncommon", icon: "🏯",
    condition: (_p, w) => w.filter((v) => v.type === "fortified").length >= 5 },
  { id: "type-dessert-5", name: "Sweet Sommelier", nameJa: "甘美なソムリエ", description: "デザートワインを5本記録した", category: "collection", rarity: "uncommon", icon: "🍯",
    condition: (_p, w) => w.filter((v) => v.type === "dessert").length >= 5 },
  { id: "type-orange-3", name: "Orange Pioneer", nameJa: "オレンジの開拓者", description: "オレンジワインを3本記録した", category: "collection", rarity: "uncommon", icon: "🧡",
    condition: (_p, w) => w.filter((v) => v.type === "orange").length >= 3 },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 💰 PRICE — Value discovery & prestige
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "price-treasure-5", name: "Treasure Hunter", nameJa: "掘り出し物ハンター", description: "2,000円以下で★4以上を5本発見した", category: "expertise", rarity: "uncommon", icon: "🔍",
    condition: (_p, w) => w.filter((v) => v.price && v.price <= 2000 && v.rating >= 4).length >= 5 },
  { id: "price-treasure-15", name: "Treasure Master", nameJa: "掘り出し物の達人", description: "2,000円以下で★4以上を15本発見した。真の目利き", category: "expertise", rarity: "epic", icon: "💎",
    condition: (_p, w) => w.filter((v) => v.price && v.price <= 2000 && v.rating >= 4).length >= 15 },
  { id: "price-premium-5", name: "Premium Palate", nameJa: "プレミアムな舌", description: "10,000円以上のワインを5本記録した", category: "collection", rarity: "rare", icon: "💰",
    condition: (_p, w) => w.filter((v) => v.price && v.price >= 10000).length >= 5 },
  { id: "price-grand-vin", name: "Grand Vin", nameJa: "グラン・ヴァン", description: "50,000円以上のワインを記録した", category: "collection", rarity: "legendary", icon: "💎",
    condition: (_p, w) => w.some((v) => v.price && v.price >= 50000) },
  { id: "price-range", name: "Full Spectrum", nameJa: "全価格帯の探究者", description: "1,000円以下と30,000円以上の両方を記録した", category: "expertise", rarity: "rare", icon: "⚖️",
    condition: (_p, w) => w.some((v) => v.price && v.price <= 1000) && w.some((v) => v.price && v.price >= 30000) },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📊 VERTICAL & HORIZONTAL — Tasting depth
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "vertical-3", name: "Vertical Tasting", nameJa: "垂直テイスティング", description: "同じ生産者の3ヴィンテージを記録した", category: "expertise", rarity: "rare", icon: "📊",
    condition: (_p, w) => hasVerticalTasting(w, 3) },
  { id: "vertical-5", name: "Deep Vertical", nameJa: "ディープ・ヴァーティカル", description: "同じ生産者の5ヴィンテージを記録した", category: "expertise", rarity: "epic", icon: "📈",
    condition: (_p, w) => hasVerticalTasting(w, 5) },
  { id: "vertical-10", name: "Decade Vertical", nameJa: "10年の垂直", description: "同じ生産者の10ヴィンテージを記録した。圧巻", category: "expertise", rarity: "legendary", icon: "🏛️",
    condition: (_p, w) => hasVerticalTasting(w, 10) },
  { id: "old-vintage-20", name: "Old Vine Treasure", nameJa: "古酒の宝物", description: "20年以上前のヴィンテージを記録した", category: "collection", rarity: "rare", icon: "⏳",
    condition: (_p, w) => w.some((v) => v.vintage && v.vintage <= new Date().getFullYear() - 20) },
  { id: "old-vintage-30", name: "Antique Wine", nameJa: "アンティーク・ワイン", description: "30年以上前のヴィンテージを記録した", category: "collection", rarity: "epic", icon: "🏺",
    condition: (_p, w) => w.some((v) => v.vintage && v.vintage <= new Date().getFullYear() - 30) },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ✍️ TASTING SKILL — Notes, aromas, ratings
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "aroma-hunter", name: "Aroma Hunter", nameJa: "アロマ・ハンター", description: "1本に6つ以上の香りを記録した", category: "expertise", rarity: "common", icon: "🌹",
    condition: (_p, w) => w.some((v) => v.aromas.length >= 6) },
  { id: "nose-of-gold", name: "Nez d'Or", nameJa: "黄金の鼻", description: "累計100種以上の異なる香りを記録した", category: "expertise", rarity: "epic", icon: "✨",
    condition: (_p, w) => new Set(w.flatMap((v) => v.aromas)).size >= 100 },
  { id: "verbose-10", name: "Eloquent Palate", nameJa: "雄弁な味覚", description: "100文字以上のノートを10本で書いた", category: "expertise", rarity: "uncommon", icon: "✍️",
    condition: (_p, w) => w.filter((v) => v.notes.length >= 100).length >= 10 },
  { id: "discerning", name: "Discerning Palate", nameJa: "峻別する舌", description: "★1と★5の両方を付けた", category: "expertise", rarity: "common", icon: "⚖️",
    condition: (_p, w) => w.some((v) => v.rating === 1) && w.some((v) => v.rating === 5) },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🇯🇵 JAPANESE WINE CULTURE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "koshu", name: "Koshu Pioneer", nameJa: "甲州の先駆者", description: "甲州ワインを記録した", category: "culture", rarity: "common", icon: "🗾",
    condition: (p) => p.grapesExplored.includes("Koshu") },
  { id: "bailey-a", name: "Bailey A Discovery", nameJa: "ベーリーAの発見", description: "マスカット・ベーリーAを記録した", category: "culture", rarity: "common", icon: "🍇",
    condition: (p) => p.grapesExplored.includes("Muscat Bailey A") },
  { id: "nihon-5", name: "Nihon Wine Lover", nameJa: "日本ワイン愛好家", description: "日本ワインを5本記録した", category: "culture", rarity: "uncommon", icon: "🇯🇵",
    condition: (_p, w) => w.filter((v) => v.country === "Japan").length >= 5 },
  { id: "nihon-regions", name: "Nihon Wine Master", nameJa: "日本ワインの達人", description: "日本の3地域以上を体験した", category: "culture", rarity: "rare", icon: "🎌",
    condition: (_p, w) => new Set(w.filter((v) => v.country === "Japan").map((v) => v.region)).size >= 3 },
  { id: "ancient-vine", name: "Ancient Vine", nameJa: "古代品種の探求者", description: "ジョージア、ギリシャ、レバノンのワインを記録した", category: "culture", rarity: "uncommon", icon: "🏺",
    condition: (p) => ["Georgia", "Greece", "Lebanon"].some((c) => p.countriesExplored.includes(c)) },
  { id: "old-new-world", name: "Old Meets New", nameJa: "旧世界と新世界の邂逅", description: "旧世界5大国と新世界のワインを両方体験した", category: "culture", rarity: "rare", icon: "🤝",
    condition: (p) => {
      const old5 = ["France", "Italy", "Spain", "Germany", "Portugal"];
      const newW = ["United States", "Australia", "New Zealand", "Chile", "Argentina", "South Africa"];
      return old5.some((c) => p.countriesExplored.includes(c)) && newW.some((c) => p.countriesExplored.includes(c));
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔥 STREAK — Consistency
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { id: "streak-4", name: "Monthly Regular", nameJa: "月間レギュラー", description: "4週間連続で記録した", category: "streak", rarity: "common", icon: "🔥",
    condition: (p) => p.streakWeeks >= 4 },
  { id: "streak-12", name: "Quarterly Passion", nameJa: "四半期の情熱", description: "12週間連続で記録した", category: "streak", rarity: "uncommon", icon: "⚡",
    condition: (p) => p.streakWeeks >= 12 },
  { id: "streak-26", name: "Half Year Devotion", nameJa: "半年の献身", description: "26週間連続で記録した", category: "streak", rarity: "rare", icon: "💪",
    condition: (p) => p.streakWeeks >= 26 },
  { id: "streak-52", name: "Annual Obsession", nameJa: "年間の執念", description: "52週間（1年間）連続で記録した", category: "streak", rarity: "legendary", icon: "🏆",
    condition: (p) => p.streakWeeks >= 52 },
];

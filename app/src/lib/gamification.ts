import { Badge, Rank, UserProfile, WineLog } from "./types";

export const RANKS: Rank[] = [
  { name: "Grape Picker", nameJa: "グレープピッカー", minXp: 0, icon: "🍇" },
  { name: "Cellar Hand", nameJa: "セラーハンド", minXp: 100, icon: "🪣" },
  { name: "Wine Enthusiast", nameJa: "ワイン愛好家", minXp: 300, icon: "🍷" },
  { name: "Tasting Room Regular", nameJa: "テイスティングルーム常連", minXp: 600, icon: "🥂" },
  { name: "Cork Puller", nameJa: "コルクプラー", minXp: 1000, icon: "🔧" },
  { name: "Oenophile", nameJa: "エノファイル", minXp: 1800, icon: "📚" },
  { name: "Cellar Master", nameJa: "セラーマスター", minXp: 3000, icon: "🏰" },
  { name: "Sommelier", nameJa: "ソムリエ", minXp: 5000, icon: "🎖️" },
  { name: "Grand Cru", nameJa: "グラン・クリュ", minXp: 8000, icon: "⭐" },
  { name: "Master of Wine", nameJa: "マスター・オブ・ワイン", minXp: 15000, icon: "👑" },
];

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

export function calculateXpForLog(wine: WineLog): number {
  let xp = 10; // base
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
    reasons.push(`新しい国: ${wine.country} (+50 XP)`);
  }
  if (wine.region && !profile.regionsExplored.includes(wine.region)) {
    xp += 25;
    reasons.push(`新しい地域: ${wine.region} (+25 XP)`);
  }
  for (const grape of wine.grapeVarieties) {
    if (!profile.grapesExplored.includes(grape)) {
      xp += 20;
      reasons.push(`新しい品種: ${grape} (+20 XP)`);
    }
  }
  return { xp, reasons };
}

const NOBLE_GRAPES = [
  "Cabernet Sauvignon",
  "Merlot",
  "Pinot Noir",
  "Chardonnay",
  "Sauvignon Blanc",
  "Riesling",
];

export const BADGES: Badge[] = [
  // Milestones
  {
    id: "first-sip",
    name: "First Sip",
    nameJa: "最初の一杯",
    description: "Log your first wine",
    category: "milestone",
    icon: "🥂",
    condition: (p) => p.wineCount >= 1,
  },
  {
    id: "case-complete",
    name: "Case Complete",
    nameJa: "1ケース達成",
    description: "Log 12 wines",
    category: "milestone",
    icon: "📦",
    condition: (p) => p.wineCount >= 12,
  },
  {
    id: "half-century",
    name: "Half Century",
    nameJa: "50本達成",
    description: "Log 50 wines",
    category: "milestone",
    icon: "🎯",
    condition: (p) => p.wineCount >= 50,
  },
  {
    id: "centurion",
    name: "Centurion",
    nameJa: "100本達成",
    description: "Log 100 wines",
    category: "milestone",
    icon: "💯",
    condition: (p) => p.wineCount >= 100,
  },
  // Region
  {
    id: "globe-trotter-5",
    name: "Globe Trotter",
    nameJa: "世界旅行者",
    description: "Log wines from 5 countries",
    category: "region",
    icon: "🌍",
    condition: (p) => p.countriesExplored.length >= 5,
  },
  {
    id: "globe-trotter-10",
    name: "Globe Trotter II",
    nameJa: "世界旅行者 II",
    description: "Log wines from 10 countries",
    category: "region",
    icon: "🌏",
    condition: (p) => p.countriesExplored.length >= 10,
  },
  {
    id: "region-explorer-5",
    name: "Region Explorer",
    nameJa: "地域探索者",
    description: "Log wines from 5 regions",
    category: "region",
    icon: "🗺️",
    condition: (p) => p.regionsExplored.length >= 5,
  },
  {
    id: "region-explorer-10",
    name: "Region Explorer II",
    nameJa: "地域探索者 II",
    description: "Log wines from 10 regions",
    category: "region",
    icon: "🧭",
    condition: (p) => p.regionsExplored.length >= 10,
  },
  // Grape
  {
    id: "noble-six",
    name: "Noble Six",
    nameJa: "ノーブル・シックス",
    description: "Try all 6 noble grapes",
    category: "grape",
    icon: "👑",
    condition: (p) =>
      NOBLE_GRAPES.every((g) => p.grapesExplored.includes(g)),
  },
  {
    id: "grape-explorer-10",
    name: "Grape Explorer",
    nameJa: "品種探索者",
    description: "Try 10 different grape varieties",
    category: "grape",
    icon: "🍇",
    condition: (p) => p.grapesExplored.length >= 10,
  },
  {
    id: "grape-explorer-25",
    name: "Grape Explorer II",
    nameJa: "品種探索者 II",
    description: "Try 25 different grape varieties",
    category: "grape",
    icon: "🌿",
    condition: (p) => p.grapesExplored.length >= 25,
  },
  // Style
  {
    id: "bubble-enthusiast",
    name: "Bubble Enthusiast",
    nameJa: "泡愛好家",
    description: "Log 5 sparkling wines",
    category: "style",
    icon: "🫧",
    condition: (_p, wines) =>
      wines.filter((w) => w.type === "sparkling").length >= 5,
  },
  {
    id: "rose-lover",
    name: "Rosé Lover",
    nameJa: "ロゼ好き",
    description: "Log 5 rosé wines",
    category: "style",
    icon: "🌸",
    condition: (_p, wines) =>
      wines.filter((w) => w.type === "rose").length >= 5,
  },
  {
    id: "sweet-tooth",
    name: "Sweet Tooth",
    nameJa: "甘党",
    description: "Log 5 dessert wines",
    category: "style",
    icon: "🍯",
    condition: (_p, wines) =>
      wines.filter((w) => w.type === "dessert").length >= 5,
  },
  // Streak
  {
    id: "weekly-regular",
    name: "Weekly Regular",
    nameJa: "週間レギュラー",
    description: "Maintain a 4-week logging streak",
    category: "streak",
    icon: "🔥",
    condition: (p) => p.streakWeeks >= 4,
  },
  {
    id: "dedicated-taster",
    name: "Dedicated Taster",
    nameJa: "熱心なテイスター",
    description: "Maintain a 12-week logging streak",
    category: "streak",
    icon: "⚡",
    condition: (p) => p.streakWeeks >= 12,
  },
];

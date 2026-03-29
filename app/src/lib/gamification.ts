import { Badge, Rank, UserProfile, WineLog } from "./types";

// ============================================================
// BADGE RARITY & POINT SYSTEM
// ============================================================
// Rarity labels are kept for backward compatibility.
// Internally, each tier has its own point value (TIER_POINTS).
//
//   Tier 1  Common      = 1 pt
//   Tier 2  Uncommon    = 3 pt
//   Tier 3  Rare        = 5 pt
//   Tier 4  Rare        = 7 pt
//   Tier 5  Epic        = 10 pt
//   Tier 6  Epic        = 15 pt
//   Tier 7  Legendary   = 25 pt
// ============================================================

export type BadgeRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

// Simple rarity-to-points mapping (backward compat export)
export const RARITY_POINTS: Record<BadgeRarity, number> = {
  common: 1,
  uncommon: 3,
  rare: 7,
  epic: 15,
  legendary: 25,
};

export const RARITY_LABELS: Record<BadgeRarity, { en: string; ja: string; stars: string }> = {
  common:    { en: "Common",    ja: "コモン",        stars: "★" },
  uncommon:  { en: "Uncommon",  ja: "アンコモン",    stars: "★★" },
  rare:      { en: "Rare",      ja: "レア",          stars: "★★★" },
  epic:      { en: "Epic",      ja: "エピック",      stars: "★★★★" },
  legendary: { en: "Legendary", ja: "レジェンダリー", stars: "★★★★★" },
};

// Actual points per tier (1-indexed, index 0 unused)
export const TIER_POINTS = [0, 1, 3, 5, 7, 10, 15, 25] as const;

// Tier number to rarity label mapping
const TIER_RARITY: BadgeRarity[] = [
  "common",    // placeholder index 0
  "common",    // tier 1
  "uncommon",  // tier 2
  "rare",      // tier 3
  "rare",      // tier 4
  "epic",      // tier 5
  "epic",      // tier 6
  "legendary", // tier 7
];

function tierRarity(tier: number): BadgeRarity {
  return TIER_RARITY[tier] ?? "common";
}

function tierPoints(tier: number): number {
  return TIER_POINTS[tier] ?? 0;
}

// ============================================================
// STAT TIER & CATEGORY TYPES
// ============================================================

export interface StatTier {
  tier: number; // 1-7
  name: string;
  nameJa: string;
  threshold: number;
  rarity: BadgeRarity;
  points: number;
  image: string; // path like "/badges/volume-tier1.png"
}

export interface StatCategory {
  id: string; // "volume", "countries-breadth", etc.
  name: string;
  nameJa: string;
  icon: string; // material icon name
  tiers: StatTier[];
}

// ============================================================
// STAT CATEGORY DEFINITIONS (7 categories x 7 tiers)
// ============================================================

function buildTiers(
  categoryId: string,
  thresholds: number[],
  names: string[],
  namesJa: string[],
): StatTier[] {
  return thresholds.map((threshold, i) => {
    const tier = i + 1;
    return {
      tier,
      name: names[i],
      nameJa: namesJa[i],
      threshold,
      rarity: tierRarity(tier),
      points: tierPoints(tier),
      image: `/badges/${categoryId}-tier${tier}.png`,
    };
  });
}

export const STAT_CATEGORIES: StatCategory[] = [
  {
    id: "volume",
    name: "Volume",
    nameJa: "記録数",
    icon: "wine_bar",
    tiers: buildTiers(
      "volume",
      [1, 12, 30, 75, 150, 400, 1000],
      ["First Glass", "One Case", "Half Century", "Centurion", "Cellar", "Grand Cellar", "Millennium"],
      ["初杯", "ワンケース", "ハーフセンチュリー", "センチュリオン", "セラー", "グランセラー", "ミレニアム"],
    ),
  },
  {
    id: "countries-breadth",
    name: "Countries Breadth",
    nameJa: "訪問国数",
    icon: "public",
    tiers: buildTiers(
      "countries-breadth",
      [2, 5, 10, 17, 25, 35, 50],
      ["Passport", "Traveler", "Explorer", "Jet Setter", "Continental", "Diplomat", "World Master"],
      ["パスポート", "トラベラー", "エクスプローラー", "ジェットセッター", "コンチネンタル", "ディプロマット", "ワールドマスター"],
    ),
  },
  {
    id: "countries-depth",
    name: "Countries Depth",
    nameJa: "最多国ワイン数",
    icon: "flag",
    tiers: buildTiers(
      "countries-depth",
      [3, 8, 15, 30, 50, 75, 100],
      ["Visitor", "Regular", "Fan", "Expert", "Ambassador", "Authority", "Country Master"],
      ["ビジター", "レギュラー", "ファン", "エキスパート", "アンバサダー", "オーソリティ", "カントリーマスター"],
    ),
  },
  {
    id: "price",
    name: "Price",
    nameJa: "最高価格",
    icon: "payments",
    tiers: buildTiers(
      "price",
      [1000, 3000, 5000, 10000, 30000, 50000, 100000],
      ["Table", "Casual", "Premium", "High-End", "Luxury", "Grand Vin", "Iconic"],
      ["テーブル", "カジュアル", "プレミアム", "ハイエンド", "ラグジュアリー", "グランヴァン", "アイコニック"],
    ),
  },
  {
    id: "vintage",
    name: "Vintage",
    nameJa: "最古ヴィンテージ",
    icon: "hourglass_bottom",
    tiers: buildTiers(
      "vintage",
      [3, 5, 10, 15, 20, 30, 50],
      ["Fresh", "Young", "Mature", "Aged", "Classic", "Antique", "Heritage"],
      ["フレッシュ", "ヤング", "マチュア", "エイジド", "クラシック", "アンティーク", "ヘリテージ"],
    ),
  },
  {
    id: "streak",
    name: "Streak",
    nameJa: "連続記録週",
    icon: "local_fire_department",
    tiers: buildTiers(
      "streak",
      [2, 4, 8, 13, 26, 40, 52],
      ["Starter", "Weekly", "Monthly", "Quarterly", "Half Year", "Annual", "Legend"],
      ["スターター", "ウィークリー", "マンスリー", "クォータリー", "ハーフイヤー", "アニュアル", "レジェンド"],
    ),
  },
  {
    id: "grape",
    name: "Grape",
    nameJa: "品種数",
    icon: "eco",
    tiers: buildTiers(
      "grape",
      [3, 6, 12, 20, 35, 60, 100],
      ["Beginner", "Trio+", "Explorer", "Collector", "Sommelier", "Ampelographer", "Living Library"],
      ["ビギナー", "トリオ＋", "エクスプローラー", "コレクター", "ソムリエ", "アンペログラフ", "リビングライブラリー"],
    ),
  },
];

// ============================================================
// RANKS: 7 tiers, unlocked by cumulative stat-tier points
// ============================================================

export const RANKS: Rank[] = [
  { name: "Bronze",       nameJa: "ブロンズ",       minXp: 0,   icon: "🥉", description: "ワインの世界への第一歩" },
  { name: "Silver",       nameJa: "シルバー",       minXp: 15,  icon: "🥈", description: "着実に経験を積んでいる" },
  { name: "Gold",         nameJa: "ゴールド",       minXp: 45,  icon: "🥇", description: "ワインの知識と探求が形になってきた" },
  { name: "Platinum",     nameJa: "プラチナ",       minXp: 90,  icon: "💠", description: "多方面での深い理解を持つ" },
  { name: "Diamond",      nameJa: "ダイヤモンド",   minXp: 160, icon: "💎", description: "並外れた経験と情熱の持ち主" },
  { name: "Master",       nameJa: "マスター",       minXp: 260, icon: "👑", description: "ワインの世界を極めし者" },
  { name: "Grand Master", nameJa: "グランマスター", minXp: 390, icon: "🏛️", description: "全てを制覇した伝説の存在" },
];

// Rank image paths (parallel to RANKS array)
export const RANK_IMAGES = [
  "/badges/rank-tier1.png",
  "/badges/rank-tier2.png",
  "/badges/rank-tier3.png",
  "/badges/rank-tier4.png",
  "/badges/rank-tier5.png",
  "/badges/rank-tier6.png",
  "/badges/rank-tier7.png",
];

// ============================================================
// HELPER: Compute stat values from wine logs
// ============================================================

function maxWinesFromSingleCountry(wines: WineLog[]): number {
  const counts: Record<string, number> = {};
  for (const w of wines) {
    if (w.country) counts[w.country] = (counts[w.country] || 0) + 1;
  }
  return Math.max(0, ...Object.values(counts));
}

function highestPrice(wines: WineLog[]): number {
  let max = 0;
  for (const w of wines) {
    if (w.price && w.price > max) max = w.price;
  }
  return max;
}

function oldestVintageYears(wines: WineLog[]): number {
  const currentYear = new Date().getFullYear();
  let maxYears = 0;
  for (const w of wines) {
    if (w.vintage) {
      const years = currentYear - w.vintage;
      if (years > maxYears) maxYears = years;
    }
  }
  return maxYears;
}

function uniqueCountries(wines: WineLog[]): number {
  return new Set(wines.map((w) => w.country).filter(Boolean)).size;
}

function uniqueGrapes(wines: WineLog[]): number {
  return new Set(wines.flatMap((w) => w.grapeVarieties)).size;
}

// ============================================================
// STAT TIER LOOKUP
// ============================================================

/**
 * Get the current achieved tier for a stat category based on its value.
 * Returns null if no tier is achieved (value below tier 1 threshold).
 */
export function getStatTier(categoryId: string, value: number): StatTier | null {
  const category = STAT_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

  let achieved: StatTier | null = null;
  for (const tier of category.tiers) {
    if (value >= tier.threshold) {
      achieved = tier;
    } else {
      break;
    }
  }
  return achieved;
}

/**
 * Get the next tier after the current one, or null if maxed out.
 */
function getNextStatTier(categoryId: string, value: number): StatTier | null {
  const category = STAT_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

  for (const tier of category.tiers) {
    if (value < tier.threshold) return tier;
  }
  return null;
}

// ============================================================
// PROFILE STATS
// ============================================================

/**
 * Compute the raw stat value for each category from user profile + wine logs.
 */
function getStatValue(categoryId: string, profile: UserProfile, wines: WineLog[]): number {
  switch (categoryId) {
    case "volume":
      return profile.wineCount;
    case "countries-breadth":
      // Use profile if available, otherwise compute from wines
      return profile.countriesExplored.length > 0
        ? profile.countriesExplored.length
        : uniqueCountries(wines);
    case "countries-depth":
      return maxWinesFromSingleCountry(wines);
    case "price":
      return highestPrice(wines);
    case "vintage":
      return oldestVintageYears(wines);
    case "streak":
      return profile.streakWeeks;
    case "grape":
      return profile.grapesExplored.length > 0
        ? profile.grapesExplored.length
        : uniqueGrapes(wines);
    default:
      return 0;
  }
}

export function getProfileStats(
  profile: UserProfile,
  wines: WineLog[],
): { category: StatCategory; value: number; currentTier: StatTier | null; nextTier: StatTier | null }[] {
  return STAT_CATEGORIES.map((category) => {
    const value = getStatValue(category.id, profile, wines);
    return {
      category,
      value,
      currentTier: getStatTier(category.id, value),
      nextTier: getNextStatTier(category.id, value),
    };
  });
}

// ============================================================
// BACKWARD COMPAT: BADGES (generated from stat tiers)
// ============================================================

// Map stat category id to badge category
function badgeCategoryFor(statId: string): Badge["category"] {
  switch (statId) {
    case "volume":            return "milestone";
    case "countries-breadth": return "discovery";
    case "countries-depth":   return "terroir";
    case "price":             return "collection";
    case "vintage":           return "collection";
    case "streak":            return "streak";
    case "grape":             return "expertise";
    default:                  return "milestone";
  }
}

// Icon per stat category (used for generated badges)
const STAT_ICONS: Record<string, string[]> = {
  "volume":            ["🥂", "📦", "🎯", "💯", "🏛️", "🏰", "🌟"],
  "countries-breadth": ["🛫", "🌍", "🌏", "✈️", "🌐", "🕊️", "👑"],
  "countries-depth":   ["🏠", "🏡", "🎓", "📖", "🏛️", "👑", "🏆"],
  "price":             ["💴", "💵", "💰", "💎", "🏆", "👑", "🌟"],
  "vintage":           ["🌱", "🌿", "⏳", "🏺", "📜", "🕰️", "🏛️"],
  "streak":            ["🔥", "⚡", "💪", "🎯", "🏅", "🏆", "👑"],
  "grape":             ["🌱", "🍇", "🌿", "🧬", "🎖️", "📖", "📚"],
};

/**
 * Generate BADGES array from stat tiers for backward compatibility.
 * Each stat tier becomes a Badge entry.
 */
function generateBadges(): Badge[] {
  const badges: Badge[] = [];

  for (const category of STAT_CATEGORIES) {
    const icons = STAT_ICONS[category.id] ?? [];

    for (const tier of category.tiers) {
      const badgeId = `${category.id}-tier-${tier.tier}`;
      const catId = category.id;

      badges.push({
        id: badgeId,
        name: tier.name,
        nameJa: tier.nameJa,
        description: `${category.nameJa}: ${tier.nameJa} (${tier.threshold})`,
        category: badgeCategoryFor(catId),
        rarity: tier.rarity,
        icon: icons[tier.tier - 1] ?? "🏅",
        condition: (profile: UserProfile, wines: WineLog[]) => {
          const value = getStatValue(catId, profile, wines);
          return value >= tier.threshold;
        },
      });
    }
  }

  return badges;
}

export const BADGES: Badge[] = generateBadges();

// ============================================================
// RANK FUNCTIONS (backward compatible signatures)
// ============================================================

/**
 * Get total badge points based on which stat tiers are achieved.
 * Each achieved tier contributes its tier-specific points (from TIER_POINTS).
 */
export function getTotalBadgePoints(profile: UserProfile, wines: WineLog[]): number {
  let total = 0;
  for (const category of STAT_CATEGORIES) {
    const value = getStatValue(category.id, profile, wines);
    for (const tier of category.tiers) {
      if (value >= tier.threshold) {
        total += tier.points;
      } else {
        break;
      }
    }
  }
  return total;
}

/**
 * Get all earned badges (achieved stat tiers) for backward compatibility.
 */
export function getEarnedBadges(profile: UserProfile, wines: WineLog[]): Badge[] {
  return BADGES.filter((b) => b.condition(profile, wines));
}

/**
 * Get the current rank based on total badge points.
 */
export function getCurrentRank(xp: number): Rank {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) rank = r;
  }
  return rank;
}

/**
 * Get the next rank after the current one, or null if at max rank.
 */
export function getNextRank(xp: number): Rank | null {
  for (const r of RANKS) {
    if (xp < r.minXp) return r;
  }
  return null;
}

/**
 * Get progress percentage toward the next rank (0-100).
 */
export function getRankProgress(xp: number): number {
  const current = getCurrentRank(xp);
  const next = getNextRank(xp);
  if (!next) return 100;
  const range = next.minXp - current.minXp;
  const progress = xp - current.minXp;
  return Math.round((progress / range) * 100);
}

// ============================================================
// XP CALCULATION (kept for result screen animation)
// ============================================================

export function calculateXpForLog(wine: WineLog): number {
  let xp = 10;
  if (wine.notes.length > 0) xp += 5;
  if (wine.aromas.length >= 3) xp += 5;
  return xp;
}

export function calculateBonusXp(
  wine: WineLog,
  profile: UserProfile,
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

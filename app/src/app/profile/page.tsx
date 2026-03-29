"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfile, WineLog } from "@/lib/types";
import { getProfile, getWines } from "@/lib/store";
import {
  getCurrentRank,
  getNextRank,
  getRankProgress,
  getTotalBadgePoints,
  RANKS,
  RANK_IMAGES,
  STAT_CATEGORIES,
  getProfileStats,
  StatCategory,
  StatTier,
} from "@/lib/gamification";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";

// Categories that use continuous progress bars (not "highest ever" achievements)
const CONTINUOUS_CATEGORIES = new Set([
  "volume",
  "countries-breadth",
  "countries-depth",
  "streak",
  "grape",
]);

// Format the condition text for locked badges
function formatCondition(category: StatCategory, tier: StatTier): string {
  switch (category.id) {
    case "volume":
      return `ワインを${tier.threshold}本記録`;
    case "countries-breadth":
      return `${tier.threshold}カ国のワインを記録`;
    case "countries-depth":
      return `1つの国で${tier.threshold}本記録`;
    case "price":
      return `¥${tier.threshold.toLocaleString()}以上のワインを記録`;
    case "vintage":
      return `${tier.threshold}年以上熟成のワインを記録`;
    case "streak":
      return `${tier.threshold}週連続で記録`;
    case "grape":
      return `${tier.threshold}品種のワインを記録`;
    default:
      return `${tier.threshold}に到達`;
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wines, setWines] = useState<WineLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    setProfile(getProfile());
    setWines(getWines());
  }, [loading, user, router]);

  if (loading || !user || !profile) return null;

  // Rank is now XP-driven (not badge-point-driven)
  const xp = profile.xp;
  const rank = getCurrentRank(xp);
  const nextRank = getNextRank(xp);
  const progress = getRankProgress(xp);
  // Badge points still used for badge display
  const totalPoints = getTotalBadgePoints(profile, wines);
  const profileStats = getProfileStats(profile, wines);

  // Determine the rank tier number (1-based index into RANKS)
  const rankTierNumber = RANKS.findIndex((r) => r.name === rank.name) + 1;

  // Find selected category detail data
  const selectedStat = selectedCategory
    ? profileStats.find((s) => s.category.id === selectedCategory)
    : null;

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* ===== Hero Rank Card ===== */}
      <div className="bg-gradient-to-b from-primary to-stone-950 px-5 pt-10 pb-8 rounded-b-3xl">
        {/* User info + sign out */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-white/50 font-label truncate max-w-[200px]">
            {user.email}
          </span>
          <button
            onClick={async () => { await signOut(); router.push("/login"); }}
            className="text-[10px] text-white/40 hover:text-white/70 transition-colors font-label uppercase tracking-widest flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-xs">logout</span>
            ログアウト
          </button>
        </div>
        {/* Rank badge image + name */}
        <div className="flex flex-col items-center text-center mb-5">
          <img
            src={RANK_IMAGES[rankTierNumber - 1] || `/badges/rank-tier${rankTierNumber}.png`}
            alt={rank.nameJa}
            className="w-20 h-20 mb-2"
          />
          <h1 className="font-headline text-2xl text-white font-bold tracking-wide">
            {rank.nameJa}
          </h1>
          <p className="text-white/50 text-xs font-body mt-0.5">{rank.name}</p>
        </div>

        {/* XP total */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-secondary text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            bolt
          </span>
          <span className="text-white font-headline text-lg font-semibold">
            {xp}
          </span>
          <span className="text-white/50 text-sm font-body">XP</span>
        </div>

        {/* XP bar */}
        <div className="mx-2 mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/70 font-body">
              {xp} XP
            </span>
            {nextRank && (
              <span className="text-white/40 font-body">
                {nextRank.nameJa}まで {nextRank.minXp} XP
              </span>
            )}
          </div>
          <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-secondary h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span
            className="material-symbols-outlined text-orange-400 text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <span className="text-white/80 font-body">
            {profile.streakWeeks > 0
              ? `${profile.streakWeeks}週連続ログ中`
              : "ストリークなし"}
          </span>
        </div>
      </div>

      {/* ===== Stats Grid (1x3) ===== */}
      <div className="px-5 -mt-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: "wine_bar",
              value: profile.wineCount,
              label: "ワイン数",
              href: "/wines",
            },
            {
              icon: "public",
              value: profile.countriesExplored.length,
              label: "カ国",
              href: "/map",
            },
            {
              icon: "eco",
              value: profile.grapesExplored.length,
              label: "品種",
              href: "/grapes",
            },
          ].map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-surface-container-low rounded-2xl px-4 py-5 flex flex-col items-center hover:bg-surface-container-lowest transition-colors"
            >
              <span
                className="material-symbols-outlined text-primary text-2xl mb-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
              <span className="font-headline text-2xl font-bold text-on-surface">
                {stat.value}
              </span>
              <span className="text-xs text-on-surface-variant font-body mt-0.5">
                {stat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== Achievement Badges - Card Grid ===== */}
      <div className="px-5 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
          <h2 className="font-headline text-lg font-bold text-on-surface">
            実績バッジ
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {profileStats.map(({ category, value, currentTier, nextTier }) => {
            const earnedCount = category.tiers.filter((t) => value >= t.threshold).length;
            const isContinuous = CONTINUOUS_CATEGORIES.has(category.id);

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center text-center hover:bg-surface-container-lowest transition-all active:scale-[0.97] relative overflow-hidden"
              >
                {/* Badge image */}
                <div className="w-14 h-14 mb-2 flex-shrink-0">
                  {currentTier ? (
                    <img src={currentTier.image} alt={currentTier.nameJa} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#d8c1c2]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-[#d8c1c2]">lock</span>
                    </div>
                  )}
                </div>

                {/* Category name */}
                <span className="text-xs font-headline font-bold text-on-surface mb-0.5">
                  {category.nameJa}
                </span>

                {/* Current tier name */}
                {currentTier ? (
                  <span className="text-[10px] text-secondary font-label mb-2">
                    {currentTier.nameJa}
                  </span>
                ) : (
                  <span className="text-[10px] text-on-surface-variant font-label mb-2">
                    未獲得
                  </span>
                )}

                {/* Tier progress dots */}
                <div className="flex gap-1 mb-2">
                  {category.tiers.map((t) => (
                    <div
                      key={t.tier}
                      className={`w-2 h-2 rounded-full ${
                        value >= t.threshold
                          ? "bg-secondary"
                          : "bg-outline-variant/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Mini progress bar for continuous categories */}
                {isContinuous && nextTier && (
                  <div className="w-full">
                    <div className="w-full bg-surface-container-high rounded-full h-1 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                        style={{ width: `${Math.min(100, (value / nextTier.threshold) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-on-surface-variant mt-0.5 block">
                      {value} / {nextTier.threshold}
                    </span>
                  </div>
                )}

                {/* Earned count badge */}
                <div className="absolute top-2 right-2">
                  <span className="text-[9px] font-label text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded-full">
                    {earnedCount}/7
                  </span>
                </div>

                {/* Tap hint */}
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant/40 absolute bottom-1.5 right-1.5">
                  chevron_right
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== Rank Roadmap ===== */}
      <div className="px-5 mt-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            route
          </span>
          <h2 className="font-headline text-lg font-bold text-on-surface">
            ランクロードマップ
          </h2>
        </div>

        <div className="relative ml-4">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-outline-variant" />

          <div className="space-y-1">
            {RANKS.map((r, i) => {
              const isCompleted = xp >= r.minXp && r.name !== rank.name;
              const isCurrent = r.name === rank.name;
              const isFuture = xp < r.minXp;

              return (
                <div key={r.name} className="relative flex items-center gap-4 py-2">
                  {/* Node on vertical line */}
                  <div
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? "bg-secondary shadow-[0_0_12px_rgba(117,91,0,0.5)]"
                        : isCompleted
                        ? "bg-primary"
                        : "bg-outline-variant"
                    }`}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-white text-sm"
                        style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}
                      >
                        check
                      </span>
                    ) : isCurrent ? (
                      <span className="text-xs">{r.icon}</span>
                    ) : (
                      <span className="text-[10px] opacity-50">{r.icon}</span>
                    )}
                  </div>

                  {/* Rank info */}
                  <div
                    className={`flex-1 ${
                      isFuture ? "opacity-35" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-headline text-sm font-bold ${
                          isCurrent
                            ? "text-secondary"
                            : isCompleted
                            ? "text-on-surface"
                            : "text-on-surface-variant"
                        }`}
                      >
                        {r.nameJa}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] bg-secondary/15 text-secondary font-body font-semibold px-1.5 py-0.5 rounded-full">
                          現在
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-body">
                      {r.minXp} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== Badge Detail Modal ===== */}
      {selectedCategory && selectedStat && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          onClick={() => setSelectedCategory(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Bottom sheet */}
          <div
            className="relative w-full max-h-[85vh] bg-surface rounded-t-3xl overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="sticky top-0 z-10 bg-surface pt-3 pb-2 flex justify-center">
              <div className="w-10 h-1 bg-outline-variant rounded-full" />
            </div>

            <div className="px-5 pb-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {selectedStat.category.icon}
                  </span>
                  <div>
                    <h3 className="font-headline text-lg font-bold text-on-surface">
                      {selectedStat.category.nameJa}
                    </h3>
                    <p className="text-xs text-on-surface-variant font-body">
                      {selectedStat.currentTier
                        ? `現在: ${selectedStat.currentTier.nameJa}`
                        : "まだ獲得していません"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">close</span>
                </button>
              </div>

              {/* Progress bar for continuous categories */}
              {CONTINUOUS_CATEGORIES.has(selectedStat.category.id) && selectedStat.nextTier && (
                <div className="mb-6 bg-surface-container-low rounded-2xl p-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-on-surface font-label font-bold">
                      進捗
                    </span>
                    <span className="text-on-surface-variant font-body">
                      {selectedStat.value} / {selectedStat.nextTier.threshold}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (selectedStat.value / selectedStat.nextTier.threshold) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1.5 font-body">
                    次のバッジ「{selectedStat.nextTier.nameJa}」まであと{" "}
                    {selectedStat.nextTier.threshold - selectedStat.value}
                  </p>
                </div>
              )}

              {/* All 7 tier badges */}
              <div className="space-y-3">
                {selectedStat.category.tiers.map((tier) => {
                  const isEarned = selectedStat.value >= tier.threshold;

                  return (
                    <div
                      key={tier.tier}
                      className={`rounded-2xl p-4 flex items-center gap-4 transition-all ${
                        isEarned
                          ? "bg-surface-container-low"
                          : "bg-surface-container-low/50"
                      }`}
                    >
                      {/* Badge image with lock overlay */}
                      <div className="w-14 h-14 flex-shrink-0 relative">
                        <img
                          src={tier.image}
                          alt={tier.nameJa}
                          className={`w-full h-full object-contain transition-all ${
                            isEarned ? "" : "grayscale opacity-40"
                          }`}
                        />
                        {!isEarned && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center">
                              <span className="material-symbols-outlined text-white text-sm" style={{ fontSize: "14px" }}>
                                lock
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Tier info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className={`text-sm font-headline font-bold ${
                              isEarned ? "text-on-surface" : "text-on-surface-variant/50"
                            }`}
                          >
                            {tier.nameJa}
                          </span>
                          <span
                            className={`text-[10px] font-label ${
                              isEarned ? "text-secondary" : "text-on-surface-variant/30"
                            }`}
                          >
                            Tier {tier.tier}
                          </span>
                          {isEarned && (
                            <span
                              className="material-symbols-outlined text-secondary text-sm"
                              style={{ fontVariationSettings: "'FILL' 1", fontSize: "14px" }}
                            >
                              check_circle
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-body ${
                            isEarned ? "text-on-surface-variant" : "text-on-surface-variant/40"
                          }`}
                        >
                          {tier.name}
                        </span>
                        {/* Condition text for locked badges */}
                        {!isEarned && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-on-surface-variant/40 text-xs" style={{ fontSize: "12px" }}>
                              info
                            </span>
                            <span className="text-[10px] text-on-surface-variant/50 font-body">
                              {formatCondition(selectedStat.category, tier)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Points */}
                      <div className="flex-shrink-0 text-right">
                        <span
                          className={`text-xs font-headline font-bold ${
                            isEarned ? "text-secondary" : "text-on-surface-variant/30"
                          }`}
                        >
                          +{tier.points}pt
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-up animation style */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

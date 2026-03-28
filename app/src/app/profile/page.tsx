"use client";

import { useEffect, useState } from "react";
import { UserProfile, WineLog } from "@/lib/types";
import { getProfile, getWines } from "@/lib/store";
import {
  getCurrentRank,
  getNextRank,
  getRankProgress,
  getTotalBadgePoints,
  getEarnedBadges,
  RANKS,
  BADGES,
  RARITY_POINTS,
  RARITY_LABELS,
} from "@/lib/gamification";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wines, setWines] = useState<WineLog[]>([]);

  useEffect(() => {
    setProfile(getProfile());
    setWines(getWines());
  }, []);

  if (!profile) return null;

  const totalPoints = getTotalBadgePoints(profile, wines);
  const rank = getCurrentRank(totalPoints);
  const nextRank = getNextRank(totalPoints);
  const progress = getRankProgress(totalPoints);
  const earnedBadges = getEarnedBadges(profile, wines);
  const earnedBadgeIds = new Set(earnedBadges.map((b) => b.id));
  const lockedBadges = BADGES.filter((b) => !earnedBadgeIds.has(b.id));

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* ===== Hero Rank Card ===== */}
      <div className="bg-gradient-to-b from-primary to-stone-950 px-5 pt-10 pb-8 rounded-b-3xl">
        {/* Rank icon + name */}
        <div className="flex flex-col items-center text-center mb-5">
          <span className="text-5xl mb-2">{rank.icon}</span>
          <h1 className="font-headline text-2xl text-white font-bold tracking-wide">
            {rank.nameJa}
          </h1>
          <p className="text-white/50 text-sm font-body mt-0.5">{rank.name}</p>
        </div>

        {/* Badge point total */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-secondary text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            military_tech
          </span>
          <span className="text-white font-headline text-lg font-semibold">
            {totalPoints}
          </span>
          <span className="text-white/50 text-sm font-body">Badge Pts</span>
        </div>

        {/* XP bar */}
        <div className="mx-2 mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-white/70 font-body">
              {totalPoints} pts
            </span>
            {nextRank && (
              <span className="text-white/40 font-body">
                {nextRank.icon} {nextRank.nameJa} ({nextRank.minXp} pts)
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

      {/* ===== Stats Grid (2x2) ===== */}
      <div className="px-5 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: "wine_bar",
              value: profile.wineCount,
              label: "ワイン数",
            },
            {
              icon: "public",
              value: profile.countriesExplored.length,
              label: "カ国",
            },
            {
              icon: "map",
              value: profile.regionsExplored.length,
              label: "地域",
            },
            {
              icon: "eco",
              value: profile.grapesExplored.length,
              label: "品種",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-low rounded-2xl px-4 py-5 flex flex-col items-center"
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
            </div>
          ))}
        </div>
      </div>

      {/* ===== Badge Collection ===== */}
      <div className="px-5 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="material-symbols-outlined text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            emoji_events
          </span>
          <h2 className="font-headline text-lg font-bold text-on-surface">
            バッジコレクション
          </h2>
          <span className="text-sm text-on-surface-variant font-body ml-auto">
            {earnedBadges.length}/{BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {/* Earned badges */}
          {earnedBadges.map((b) => (
            <div
              key={b.id}
              className="bg-surface-container-low rounded-xl p-2.5 flex flex-col items-center text-center relative"
            >
              <span className="text-2xl mb-1">{b.icon}</span>
              <span className="text-[10px] font-body font-medium text-on-surface leading-tight line-clamp-2">
                {b.nameJa}
              </span>
              <span
                className="text-[8px] font-body mt-0.5"
                style={{ color: rarityColor(b.rarity) }}
              >
                {RARITY_LABELS[b.rarity].stars}
              </span>
            </div>
          ))}

          {/* Locked badges */}
          {lockedBadges.map((b) => (
            <div
              key={b.id}
              className="bg-surface-container-low/60 rounded-xl p-2.5 flex flex-col items-center text-center opacity-40"
            >
              <span className="material-symbols-outlined text-2xl text-on-surface-variant/40 mb-1">
                lock
              </span>
              <span className="text-[10px] font-body text-on-surface-variant/50 leading-tight line-clamp-2">
                {b.nameJa}
              </span>
              <span className="text-[8px] font-body text-on-surface-variant/30 mt-0.5">
                {RARITY_LABELS[b.rarity].stars}
              </span>
            </div>
          ))}
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
              const isCompleted = totalPoints >= r.minXp && r.name !== rank.name;
              const isCurrent = r.name === rank.name;
              const isFuture = totalPoints < r.minXp;

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
                          NOW
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-body">
                      {r.minXp} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Return a color string for badge rarity */
function rarityColor(rarity: string): string {
  switch (rarity) {
    case "common":
      return "#8b8b8b";
    case "uncommon":
      return "#4a9e4a";
    case "rare":
      return "#4a7fb5";
    case "epic":
      return "#9b59b6";
    case "legendary":
      return "#c9a84c";
    default:
      return "#8b8b8b";
  }
}

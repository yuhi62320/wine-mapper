"use client";

import { useEffect, useState } from "react";
import { Trophy, Flame, Wine, MapPin, Grape } from "lucide-react";
import { UserProfile } from "@/lib/types";
import { getProfile, getWines } from "@/lib/store";
import {
  getCurrentRank,
  getNextRank,
  getRankProgress,
  RANKS,
  BADGES,
} from "@/lib/gamification";
import { WineLog } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wines, setWines] = useState<WineLog[]>([]);

  useEffect(() => {
    setProfile(getProfile());
    setWines(getWines());
  }, []);

  if (!profile) return null;

  const rank = getCurrentRank(profile.xp);
  const nextRank = getNextRank(profile.xp);
  const progress = getRankProgress(profile.xp);

  const earnedBadges = BADGES.filter((b) =>
    profile.earnedBadgeIds.includes(b.id)
  );
  const lockedBadges = BADGES.filter(
    (b) => !profile.earnedBadgeIds.includes(b.id)
  );

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">プロフィール</h1>

      {/* Rank Card */}
      <div className="bg-gradient-to-br from-[#722f37] to-[#4a1f24] rounded-2xl p-5 text-white mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{rank.icon}</div>
          <div>
            <div className="text-xl font-bold">{rank.nameJa}</div>
            <div className="text-white/60 text-sm">{rank.name}</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/80">{profile.xp} XP</span>
            {nextRank && (
              <span className="text-white/60">
                次: {nextRank.icon} {nextRank.nameJa} ({nextRank.minXp} XP)
              </span>
            )}
          </div>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div
              className="bg-[#c9a84c] h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-2 mt-3 text-sm">
          <Flame size={16} className="text-orange-300" />
          <span>
            {profile.streakWeeks > 0
              ? `${profile.streakWeeks}週連続ログ中`
              : "ストリークなし"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <Wine size={20} className="text-[#722f37]" />
          <div>
            <div className="text-xl font-bold text-gray-900">
              {profile.wineCount}
            </div>
            <div className="text-xs text-gray-500">ワイン数</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <MapPin size={20} className="text-[#722f37]" />
          <div>
            <div className="text-xl font-bold text-gray-900">
              {profile.countriesExplored.length}
            </div>
            <div className="text-xs text-gray-500">カ国</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <MapPin size={20} className="text-[#722f37]" />
          <div>
            <div className="text-xl font-bold text-gray-900">
              {profile.regionsExplored.length}
            </div>
            <div className="text-xs text-gray-500">地域</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
          <Grape size={20} className="text-[#722f37]" />
          <div>
            <div className="text-xl font-bold text-gray-900">
              {profile.grapesExplored.length}
            </div>
            <div className="text-xs text-gray-500">品種</div>
          </div>
        </div>
      </div>

      {/* Rank Roadmap */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <h2 className="font-medium text-gray-800 mb-3 flex items-center gap-1.5">
          ランクロードマップ
        </h2>
        <div className="space-y-2">
          {RANKS.map((r) => {
            const isCurrentOrPast = profile.xp >= r.minXp;
            const isCurrent = r.name === rank.name;
            return (
              <div
                key={r.name}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  isCurrent
                    ? "bg-[#722f37]/10 border border-[#722f37]/20"
                    : isCurrentOrPast
                    ? "bg-gray-50"
                    : "opacity-40"
                }`}
              >
                <span className="text-lg">{r.icon}</span>
                <span
                  className={
                    isCurrent ? "font-bold text-[#722f37]" : "text-gray-600"
                  }
                >
                  {r.nameJa}
                </span>
                <span className="ml-auto text-xs text-gray-400">
                  {r.minXp} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <h2 className="font-medium text-gray-800 mb-3 flex items-center gap-1.5">
          <Trophy size={16} className="text-[#c9a84c]" />
          バッジ ({earnedBadges.length}/{BADGES.length})
        </h2>

        {earnedBadges.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {earnedBadges.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl p-3 shadow-sm border border-[#c9a84c]/20"
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-medium text-gray-800">
                  {b.nameJa}
                </div>
                <div className="text-[10px] text-gray-400">
                  {b.description}
                </div>
              </div>
            ))}
          </div>
        )}

        {lockedBadges.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {lockedBadges.map((b) => (
              <div
                key={b.id}
                className="bg-gray-50 rounded-xl p-3 border border-gray-100 opacity-40"
              >
                <div className="text-2xl mb-1 grayscale">🔒</div>
                <div className="text-xs font-medium text-gray-500">
                  {b.nameJa}
                </div>
                <div className="text-[10px] text-gray-400">
                  {b.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

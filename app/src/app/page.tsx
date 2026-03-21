"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Wine, MapPin, Star } from "lucide-react";
import { WineLog, WINE_TYPE_LABELS, WINE_TYPE_COLORS } from "@/lib/types";
import { getWines, getProfile } from "@/lib/store";
import { getCurrentRank, getNextRank, getRankProgress } from "@/lib/gamification";
import { UserProfile } from "@/lib/types";

export default function HomePage() {
  const [wines, setWines] = useState<WineLog[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setWines(getWines());
    setProfile(getProfile());
  }, []);

  const rank = profile ? getCurrentRank(profile.xp) : null;
  const nextRank = profile ? getNextRank(profile.xp) : null;
  const progress = profile ? getRankProgress(profile.xp) : 0;

  return (
    <div className="px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wine Mapper</h1>
          <p className="text-sm text-gray-500">ワインで世界を旅しよう</p>
        </div>
        {rank && (
          <div className="text-right">
            <div className="text-lg">{rank.icon}</div>
            <div className="text-xs text-gray-500">{rank.nameJa}</div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {profile && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#722f37]">
              {profile.wineCount}
            </div>
            <div className="text-xs text-gray-500">ワイン</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#722f37]">
              {profile.countriesExplored.length}
            </div>
            <div className="text-xs text-gray-500">カ国</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#722f37]">
              {profile.grapesExplored.length}
            </div>
            <div className="text-xs text-gray-500">品種</div>
          </div>
        </div>
      )}

      {/* XP Progress */}
      {profile && rank && (
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {rank.icon} {rank.nameJa}
            </span>
            <span className="text-xs text-gray-500">
              {profile.xp} XP
              {nextRank && ` / ${nextRank.minXp} XP`}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[#722f37] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {nextRank && (
            <div className="text-xs text-gray-400 mt-1 text-right">
              次: {nextRank.icon} {nextRank.nameJa}
            </div>
          )}
        </div>
      )}

      {/* Recent Wines */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">最近のワイン</h2>
        <Link
          href="/wines/new"
          className="flex items-center gap-1 text-sm text-[#722f37] font-medium"
        >
          <PlusCircle size={16} />
          記録する
        </Link>
      </div>

      {wines.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
          <Wine size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-4">
            まだワインが記録されていません
          </p>
          <Link
            href="/wines/new"
            className="inline-flex items-center gap-2 bg-[#722f37] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#5a252c] transition-colors"
          >
            <PlusCircle size={18} />
            最初のワインを記録
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {wines.slice(0, 10).map((wine) => (
            <Link
              key={wine.id}
              href={`/wines/${wine.id}`}
              className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-3 h-12 rounded-full flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: WINE_TYPE_COLORS[wine.type],
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">
                      {wine.name}
                    </h3>
                    {wine.vintage && (
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {wine.vintage}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="px-1.5 py-0.5 rounded bg-gray-100">
                      {WINE_TYPE_LABELS[wine.type].ja}
                    </span>
                    {wine.country && (
                      <span className="flex items-center gap-0.5">
                        <MapPin size={10} />
                        {wine.country}
                        {wine.region && ` · ${wine.region}`}
                      </span>
                    )}
                  </div>
                  {wine.rating > 0 && (
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < wine.rating
                              ? "fill-[#c9a84c] text-[#c9a84c]"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(wine.date).toLocaleDateString("ja-JP", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WineLog, WINE_TYPE_LABELS, WINE_TYPE_COLORS } from "@/lib/types";
import { getWines, getProfile } from "@/lib/store";
import { getWinePhoto } from "@/lib/photo-store";
import {
  getCurrentRank,
  getNextRank,
  getRankProgress,
  getTotalBadgePoints,
  getEarnedBadges,
} from "@/lib/gamification";
import { UserProfile } from "@/lib/types";

export default function HomePage() {
  const [wines, setWines] = useState<WineLog[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [photos, setPhotos] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadedWines = getWines();
    setWines(loadedWines);
    setProfile(getProfile());

    // Load photos for each wine
    const photoMap: Record<string, string> = {};
    loadedWines.forEach((wine) => {
      const photo = getWinePhoto(wine.id);
      if (photo) {
        photoMap[wine.id] = photo;
      }
    });
    setPhotos(photoMap);
  }, []);

  const totalPoints = profile ? getTotalBadgePoints(profile, wines) : 0;
  const rank = getCurrentRank(totalPoints);
  const nextRank = getNextRank(totalPoints);
  const progress = getRankProgress(totalPoints);
  const earnedBadges = profile ? getEarnedBadges(profile, wines) : [];

  return (
    <div className="px-6 pt-8 space-y-12">
      {/* TopAppBar */}
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-headline font-bold tracking-tight text-2xl text-primary-container italic">
            Wine Mapper
          </h1>
          <p className="text-[10px] font-label tracking-widest text-primary opacity-60 uppercase">
            ワインで世界を旅しよう
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] font-label text-secondary tracking-tighter">
              現在のランク
            </span>
            <span className="text-sm font-headline font-bold text-primary">
              {rank.nameJa}
            </span>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center bg-surface-container-lowest rounded-full shadow-sm">
            <span
              className="material-symbols-outlined text-secondary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            {earnedBadges.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">
                  {earnedBadges.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Experience Section */}
      {profile && (
        <section className="space-y-4">
          <div className="flex justify-between items-end mb-2">
            <div className="space-y-1">
              <h2 className="text-xs font-label tracking-[0.2em] text-on-surface-variant">
                ソムリエへの道
              </h2>
              <p className="text-xl font-headline font-bold text-primary">
                熟成の旅路
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-headline font-bold text-secondary">
                {totalPoints}
              </span>
              <span className="text-xs font-label text-on-surface-variant">
                {nextRank ? ` / ${nextRank.minXp} pt` : " pt"}
              </span>
            </div>
          </div>
          <div className="relative h-1 w-full bg-surface-container-high overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_8px_rgba(201,168,76,0.4)] transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>
      )}

      {/* Stats Bento Grid */}
      {profile && (
        <section className="grid grid-cols-3 gap-4">
          <Link href="/wines" className="bg-surface-container-low p-6 rounded-xl flex flex-col items-center justify-center space-y-2 border border-secondary/10 hover:bg-surface-container-lowest transition-colors group">
            <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">
              wine_bar
            </span>
            <span className="text-2xl font-headline font-black text-primary">
              {profile.wineCount}
            </span>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest text-center">
              ワイン数
            </span>
          </Link>
          <Link href="/map" className="bg-surface-container-low p-6 rounded-xl flex flex-col items-center justify-center space-y-2 border border-secondary/10 hover:bg-surface-container-lowest transition-colors group">
            <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">
              public
            </span>
            <span className="text-2xl font-headline font-black text-primary">
              {profile.countriesExplored.length}
            </span>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest text-center">
              探索国数
            </span>
          </Link>
          <Link href="/wines" className="bg-surface-container-low p-6 rounded-xl flex flex-col items-center justify-center space-y-2 border border-secondary/10 hover:bg-surface-container-lowest transition-colors group">
            <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">
              temp_preferences_custom
            </span>
            <span className="text-2xl font-headline font-black text-primary">
              {profile.grapesExplored.length}
            </span>
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest text-center">
              品種数
            </span>
          </Link>
        </section>
      )}

      {/* Recent Discovery Header */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="relative">
            <h3 className="text-3xl font-headline font-black text-primary leading-tight">
              最近の発見
            </h3>
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary opacity-30" />
          </div>
          <Link
            href="/wines/new"
            className="text-xs font-label text-secondary uppercase tracking-widest flex items-center gap-1 hover:opacity-70"
          >
            記録する{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Wine Cards */}
        {wines.length === 0 ? (
          <div className="bg-surface-container-low p-12 rounded-xl text-center">
            <span className="material-symbols-outlined text-primary/20 text-6xl mb-4 block">
              wine_bar
            </span>
            <p className="text-on-surface-variant mb-6 font-headline italic">
              まだワインが記録されていません
            </p>
            <Link
              href="/wines/new"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-sm font-bold tracking-widest hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              最初のワインを記録
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {wines.slice(0, 6).map((wine, idx) => {
              const isFlipped = idx % 2 === 1;
              return (
                <Link
                  key={wine.id}
                  href={`/wines/${wine.id}`}
                  className="group relative grid grid-cols-12 gap-6 items-center"
                >
                  {/* Wine photo or fallback color indicator */}
                  <div
                    className={`${
                      isFlipped ? "col-span-7 order-1" : "col-span-5"
                    } aspect-[3/4] overflow-hidden rounded-xl shadow-2xl bg-surface-container-low flex items-center justify-center`}
                  >
                    {photos[wine.id] ? (
                      <img
                        src={photos[wine.id]}
                        alt={wine.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div
                          className="w-16 h-24 rounded-lg"
                          style={{
                            backgroundColor:
                              WINE_TYPE_COLORS[wine.type] + "30",
                            border: `2px solid ${WINE_TYPE_COLORS[wine.type]}`,
                          }}
                        />
                        <span
                          className="material-symbols-outlined text-4xl"
                          style={{ color: WINE_TYPE_COLORS[wine.type] }}
                        >
                          wine_bar
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Wine info */}
                  <div
                    className={`${
                      isFlipped
                        ? "col-span-5 text-right order-first"
                        : "col-span-7"
                    } space-y-3`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        isFlipped ? "justify-end" : ""
                      }`}
                    >
                      {!isFlipped && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: WINE_TYPE_COLORS[wine.type],
                          }}
                        />
                      )}
                      <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
                        {WINE_TYPE_LABELS[wine.type].en}
                      </span>
                      {isFlipped && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: WINE_TYPE_COLORS[wine.type],
                          }}
                        />
                      )}
                    </div>
                    <h4 className="text-2xl font-headline font-black text-primary leading-none">
                      {wine.name}{" "}
                      {wine.vintage && (
                        <span className="text-lg">{wine.vintage}</span>
                      )}
                    </h4>
                    <div className="space-y-1">
                      {wine.producer && (
                        <p className="text-sm font-body text-on-surface-variant">
                          {wine.producer}
                        </p>
                      )}
                      {wine.country && (
                        <p
                          className={`text-sm font-body flex items-center gap-1 italic ${
                            isFlipped ? "justify-end" : ""
                          }`}
                        >
                          <span className="material-symbols-outlined text-xs">
                            location_on
                          </span>{" "}
                          {wine.region && `${wine.region}, `}
                          {wine.country}
                        </p>
                      )}
                    </div>
                    {wine.rating > 0 && (
                      <div
                        className={`flex gap-1 text-secondary ${
                          isFlipped ? "justify-end" : ""
                        }`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-sm"
                            style={
                              i < wine.rating
                                ? {
                                    fontVariationSettings: "'FILL' 1",
                                  }
                                : { opacity: 0.2 }
                            }
                          >
                            star
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Quote / Mood section */}
      <section className="py-12 text-center space-y-4">
        <span className="material-symbols-outlined text-primary opacity-20 text-4xl">
          format_quote
        </span>
        <p className="text-xl font-headline italic text-on-surface-variant/80 max-w-sm mx-auto leading-relaxed">
          「ワインは瓶に詰められた詩である」
        </p>
        <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-[0.3em]">
          Robert Louis Stevenson
        </p>
      </section>
    </div>
  );
}

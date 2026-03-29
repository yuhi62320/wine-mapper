"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getWines, getWinesByCountry, getWineries, getProfile } from "@/lib/store";
import { WINE_COUNTRIES } from "@/lib/countries";
import { WineLog, Winery } from "@/lib/types";
import WineMap, { CountryStats } from "@/components/wine-map";
import StylizedMap from "@/components/stylized-map";
import WineListMini from "@/components/wine-list-mini";
import {
  getCurrentRank,
  getNextRank,
  getRankProgress,
  getTotalBadgePoints,
  RANKS,
} from "@/lib/gamification";

type MapMode = "real" | "stylized";

/**
 * Return an adventure-flavored message based on exploration progress.
 */
function getAdventureMessage(
  exploredCount: number,
  wineCount: number
): string {
  if (wineCount === 0) return "まだ見ぬ産地があなたを待っている。";
  if (exploredCount <= 1) return "冒険は始まったばかり。";
  if (exploredCount <= 3) return "旧世界のテロワールを探る旅路。";
  if (exploredCount <= 6) return "新大陸のテロワールが呼んでいる。";
  if (exploredCount <= 10) return "世界の味覚地図が広がっていく。";
  return "あなたはまさにワインの冒険家だ。";
}

export default function MapPage() {
  const [stats, setStats] = useState<Map<string, CountryStats>>(new Map());
  const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(
    null
  );
  const [wines, setWines] = useState<WineLog[]>([]);
  const [wineries, setWineries] = useState<Winery[]>([]);
  const [selectedWinery, setSelectedWinery] = useState<Winery | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>("real");

  useEffect(() => {
    const allWines = getWines();
    setWines(allWines);
    setWineries(getWineries());

    const countryMap = new Map<string, CountryStats>();

    for (const c of WINE_COUNTRIES) {
      countryMap.set(c.name, {
        country: c,
        count: 0,
        regions: new Set(),
        explored: false,
      });
    }

    for (const wine of allWines) {
      if (wine.country && countryMap.has(wine.country)) {
        const s = countryMap.get(wine.country)!;
        s.count += 1;
        s.explored = true;
        if (wine.region) s.regions.add(wine.region);
      }
    }

    setStats(countryMap);
  }, []);

  // Gamification data
  const profile = useMemo(() => {
    if (typeof window === "undefined") return null;
    return getProfile();
  }, [wines]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalBadgePoints = useMemo(() => {
    if (!profile) return 0;
    return getTotalBadgePoints(profile, wines);
  }, [profile, wines]);

  const currentRank = useMemo(
    () => getCurrentRank(totalBadgePoints),
    [totalBadgePoints]
  );
  const nextRank = useMemo(
    () => getNextRank(totalBadgePoints),
    [totalBadgePoints]
  );
  const rankProgress = useMemo(
    () => getRankProgress(totalBadgePoints),
    [totalBadgePoints]
  );

  const explored = Array.from(stats.values()).filter((s) => s.explored);
  const totalCountries = WINE_COUNTRIES.length;
  const exploredCount = explored.length;

  const countryWines = selectedCountry
    ? getWinesByCountry(selectedCountry.country.name)
    : [];

  const adventureMessage = getAdventureMessage(exploredCount, wines.length);

  return (
    <div className="relative flex flex-col" style={{ height: "calc(100vh - 5.5rem)" }}>
      {/* ===== IMMERSIVE MAP MODE (default) ===== */}
      {mapMode === "real" ? (
        <>
          {/* Full-screen map */}
          <div className="absolute inset-0 z-0">
            <WineMap
              stats={stats}
              wines={wines}
              wineries={wineries}
              onSelectCountry={(s) => { setSelectedCountry(s); setSelectedWinery(null); }}
              onSelectWinery={(w) => { setSelectedWinery(w); setSelectedCountry(null); }}
            />
          </div>

          {/* Floating toggle button — top right */}
          <button
            onClick={() => {
              setMapMode("stylized");
              setSelectedCountry(null);
            }}
            className="absolute top-4 right-4 z-[500] w-11 h-11 rounded-full bg-surface-container-low/80 backdrop-blur-xl border border-white/50 shadow-lg flex items-center justify-center hover:bg-surface-container transition-colors"
            aria-label="Switch to list view"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">
              list_alt
            </span>
          </button>

          {/* ===== FLOATING EXPEDITION CARD ===== */}
          {!selectedCountry && !selectedWinery && (
            <div className="absolute bottom-2 left-3 right-3 z-[500] transition-all duration-500">
              <div className="relative overflow-hidden bg-surface-container-low/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/40 px-6 py-5">
                {/* Wine bar watermark */}
                <span
                  className="material-symbols-outlined absolute -right-2 -bottom-2 text-[120px] text-primary/[0.04] pointer-events-none select-none"
                  aria-hidden="true"
                >
                  wine_bar
                </span>

                {/* Top row: title + rank badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline text-lg font-bold text-primary tracking-wide">
                      World Expedition
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-xs font-label text-secondary">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/badges/rank-tier${RANKS.findIndex((r) => r.name === currentRank.name) + 1}.png`} alt={currentRank.nameJa} className="w-5 h-5 object-contain" />
                      {currentRank.name}
                    </span>
                  </div>
                </div>

                {/* Country count */}
                <p className="text-sm text-on-surface-variant mb-1">
                  <span className="font-headline font-bold text-primary text-base">
                    {exploredCount}
                  </span>{" "}
                  <span className="text-on-surface-variant/70">
                    カ国発見{" "}
                    <span className="text-xs text-on-surface-variant/40">
                      / {totalCountries}
                    </span>
                  </span>
                </p>

                {/* Adventure message */}
                <p className="text-xs italic text-on-surface-variant/60 mb-3 leading-relaxed">
                  {adventureMessage}
                </p>

                {/* Winery count link */}
                {wineries.length > 0 && (
                  <Link
                    href="/wineries"
                    className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#755b00]" style={{ fontVariationSettings: "'FILL' 1" }}>castle</span>
                    <span className="text-xs font-label font-medium text-primary">
                      {wineries.length}件のワイナリー
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-primary/40 ml-auto">arrow_forward_ios</span>
                  </Link>
                )}

                {/* Mastery XP progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-label tracking-[0.15em] uppercase text-on-surface-variant/50">
                      Mastery XP
                    </span>
                    <span className="text-[10px] font-label text-[#c9a84c] font-semibold">
                      {rankProgress}%
                      {nextRank && (
                        <span className="text-on-surface-variant/40 ml-1">
                          → {nextRank.name}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${rankProgress}%`,
                        background:
                          "linear-gradient(90deg, #c9a84c 0%, #e8d48b 50%, #c9a84c 100%)",
                        boxShadow: "0 0 8px rgba(201,168,76,0.4)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== COUNTRY DETAIL OVERLAY (slides up, hides expedition card) ===== */}
          {selectedCountry && (
            <div className="absolute bottom-4 left-0 right-0 z-[1000] px-3 animate-slide-up">
              <div className="bg-surface-container-low/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-white/40 max-h-[55vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-headline font-bold text-primary text-xl">
                      {selectedCountry.country.nameJa}
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      {selectedCountry.country.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">
                      close
                    </span>
                  </button>
                </div>

                <div className="flex gap-6 mb-6">
                  <div>
                    <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
                      Wines
                    </p>
                    <p className="font-headline text-lg text-primary">
                      {selectedCountry.count}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
                      Regions
                    </p>
                    <p className="font-headline text-lg text-primary">
                      {selectedCountry.regions.size} /{" "}
                      {selectedCountry.country.regions.length}
                    </p>
                  </div>
                </div>

                {/* Region list */}
                <div className="space-y-2 mb-4">
                  {selectedCountry.country.regions.map((r) => {
                    const isExplored = selectedCountry.regions.has(r.name);
                    const regionWineCount = isExplored
                      ? wines.filter(
                          (w) =>
                            w.country === selectedCountry.country.name &&
                            w.region === r.name
                        ).length
                      : 0;

                    return (
                      <Link
                        key={r.name}
                        href={`/map/region/${selectedCountry.country.code}/${encodeURIComponent(r.name)}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isExplored
                            ? "bg-primary/5 text-primary hover:bg-primary/10"
                            : "bg-surface-container text-on-surface-variant/60 hover:bg-surface-container/80"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <span className={`text-sm flex-1 ${isExplored ? "font-medium" : ""}`}>
                          {r.nameJa}
                          <span className={`text-xs ml-2 ${isExplored ? "text-primary/50" : ""}`}>
                            {r.name}
                          </span>
                        </span>
                        {isExplored && (
                          <span className="text-xs text-primary/60">
                            {regionWineCount}本
                          </span>
                        )}
                        <span className={`material-symbols-outlined text-xs ${isExplored ? "" : "opacity-40"}`}>
                          arrow_forward_ios
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Wines from this country */}
                {countryWines.length > 0 && (
                  <div className="pt-4 border-t border-outline-variant/20">
                    <h3 className="text-xs font-label text-secondary uppercase tracking-widest mb-3">
                      Wines from this country
                    </h3>
                    <WineListMini wines={countryWines} maxItems={3} />
                  </div>
                )}
              </div>
            </div>
          )}
          {/* ===== WINERY DETAIL OVERLAY ===== */}
          {selectedWinery && (
            <div className="absolute bottom-4 left-0 right-0 z-[1000] px-3 animate-slide-up">
              <div className="bg-surface-container-low/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-white/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#561922] to-[#722f37] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px] text-white/80">castle</span>
                    </div>
                    <div>
                      <h2 className="font-headline font-bold text-primary text-lg">
                        {selectedWinery.nameJa || selectedWinery.name}
                      </h2>
                      <p className="text-xs text-on-surface-variant">
                        {[selectedWinery.region, selectedWinery.country].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedWinery(null)}
                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">close</span>
                  </button>
                </div>

                {selectedWinery.description && (
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-3">
                    {selectedWinery.description}
                  </p>
                )}

                <div className="flex gap-3">
                  <Link
                    href={`/wineries/${selectedWinery.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-on-primary rounded-full text-sm font-label font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    詳細を見る
                  </Link>
                  {selectedWinery.website && (
                    <a
                      href={selectedWinery.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-4 py-2.5 bg-surface-container text-primary rounded-full text-sm font-label font-medium"
                    >
                      <span className="material-symbols-outlined text-[16px]">language</span>
                      公式
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* ===== STYLIZED LIST MODE ===== */
        <>
          {/* Back-to-map floating button */}
          <button
            onClick={() => {
              setMapMode("real");
              setSelectedCountry(null);
            }}
            className="absolute top-4 right-4 z-[500] w-11 h-11 rounded-full bg-surface-container-low/80 backdrop-blur-xl border border-white/50 shadow-lg flex items-center justify-center hover:bg-surface-container transition-colors"
            aria-label="Switch to map view"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">
              map
            </span>
          </button>

          {/* Header */}
          <section className="flex flex-col items-center pt-8 mb-4 px-4">
            <h2 className="font-headline text-3xl font-black text-primary mb-2">
              産地一覧
            </h2>
            <p className="text-sm tracking-[0.3em] uppercase text-secondary font-medium">
              Wine Regions
            </p>
          </section>

          {/* Stylized drill-down map */}
          <div className="flex-1 px-4 min-h-0 overflow-hidden">
            <StylizedMap stats={stats} wines={wines} />
          </div>

          {/* Poetic footer */}
          <div className="py-12 flex flex-col items-center px-4">
            <div className="w-16 h-[1px] bg-secondary mb-8" />
            <p className="font-headline italic text-primary/60 text-center max-w-sm leading-relaxed text-sm">
              一本のワインは、その土地の風と土の記憶。地図を埋めるたび、物語は深まっていく。
            </p>
          </div>
        </>
      )}

      {/* Slide-up animation keyframe (injected once) */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

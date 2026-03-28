"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWines, getWinesByCountry } from "@/lib/store";
import { WINE_COUNTRIES } from "@/lib/countries";
import { WineLog } from "@/lib/types";
import WineMap, { CountryStats } from "@/components/wine-map";
import StylizedMap from "@/components/stylized-map";
import WineListMini from "@/components/wine-list-mini";

type MapMode = "real" | "stylized";

export default function MapPage() {
  const [stats, setStats] = useState<Map<string, CountryStats>>(new Map());
  const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(
    null
  );
  const [wines, setWines] = useState<WineLog[]>([]);
  const [mapMode, setMapMode] = useState<MapMode>("stylized");

  useEffect(() => {
    const allWines = getWines();
    setWines(allWines);

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

  const explored = Array.from(stats.values()).filter((s) => s.explored);
  const totalCountries = WINE_COUNTRIES.length;
  const exploredCount = explored.length;

  const countryWines = selectedCountry
    ? getWinesByCountry(selectedCountry.country.name)
    : [];

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)]">
      {/* Toggle Switch */}
      <section className="flex flex-col items-center pt-8 mb-8 px-4">
        <div className="inline-flex p-1 bg-surface-container-low rounded-full">
          <button
            onClick={() => {
              setMapMode("real");
              setSelectedCountry(null);
            }}
            className={`px-8 py-2.5 rounded-full font-label text-sm transition-all duration-500 ${
              mapMode === "real"
                ? "bg-primary-container text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            地図モード
          </button>
          <button
            onClick={() => {
              setMapMode("stylized");
              setSelectedCountry(null);
            }}
            className={`px-8 py-2.5 rounded-full font-label text-sm transition-all duration-500 ${
              mapMode === "stylized"
                ? "bg-primary-container text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            産地一覧
          </button>
        </div>
        <div className="mt-8 text-center">
          <h2 className="font-headline text-3xl font-black text-primary mb-2">
            世界の軌跡
          </h2>
          <p className="text-sm tracking-[0.3em] uppercase text-secondary font-medium">
            Global Collection Journey
          </p>
        </div>
      </section>

      {/* Map Content */}
      {mapMode === "real" ? (
        <>
          {/* Real Geographic Map */}
          <div className="flex-1 px-4 min-h-0">
            <div className="relative aspect-[16/10] w-full bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/5 mb-8">
              <WineMap
                stats={stats}
                wines={wines}
                onSelectCountry={setSelectedCountry}
              />
              {/* Stats Overlay */}
              <div className="absolute bottom-4 left-4 z-[400]">
                <div className="backdrop-blur-xl bg-white/40 p-4 rounded-2xl border border-white/40">
                  <p className="text-[10px] tracking-widest text-primary/60 uppercase mb-1">
                    Discovered
                  </p>
                  <p className="font-headline text-3xl font-black text-primary">
                    {exploredCount}
                    <span className="text-sm font-normal text-on-surface-variant ml-1">
                      / {totalCountries}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Country Detail Overlay */}
          {selectedCountry && (
            <div className="absolute bottom-28 left-0 right-0 z-[1000] px-4">
              <div className="bg-surface-container-low/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-white/40 max-h-[50vh] overflow-y-auto">
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

                    return isExplored ? (
                      <Link
                        key={r.name}
                        href={`/map/region/${selectedCountry.country.code}/${encodeURIComponent(r.name)}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <span className="text-sm font-medium flex-1">
                          {r.nameJa}
                          <span className="text-xs text-primary/50 ml-2">
                            {r.name}
                          </span>
                        </span>
                        <span className="text-xs text-primary/60">
                          {regionWineCount}本
                        </span>
                        <span className="material-symbols-outlined text-xs">
                          arrow_forward_ios
                        </span>
                      </Link>
                    ) : (
                      <div
                        key={r.name}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container text-on-surface-variant/30"
                      >
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <span className="text-sm">
                          {r.nameJa}
                          <span className="text-xs ml-2">{r.name}</span>
                        </span>
                      </div>
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
        </>
      ) : (
        /* Stylized Drill-down Map */
        <div className="flex-1 px-4 min-h-0 overflow-hidden">
          <StylizedMap stats={stats} wines={wines} />
        </div>
      )}

      {/* Poetic footer */}
      {mapMode === "stylized" && (
        <div className="py-12 flex flex-col items-center px-4">
          <div className="w-16 h-[1px] bg-secondary mb-8" />
          <p className="font-headline italic text-primary/60 text-center max-w-sm leading-relaxed text-sm">
            一本のワインは、その土地の風と土の記憶。地図を埋めるたび、物語は深まっていく。
          </p>
        </div>
      )}
    </div>
  );
}

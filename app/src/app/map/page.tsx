"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, X, ChevronRight, Globe, List } from "lucide-react";
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
  const unexplored = Array.from(stats.values()).filter((s) => !s.explored);
  const totalCountries = WINE_COUNTRIES.length;
  const exploredCount = explored.length;

  const countryWines = selectedCountry
    ? getWinesByCountry(selectedCountry.country.name)
    : [];

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">ワインマップ</h1>

          {/* Map mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => {
                setMapMode("real");
                setSelectedCountry(null);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                mapMode === "real"
                  ? "bg-white text-[#722f37] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Globe size={12} />
              地図
            </button>
            <button
              onClick={() => {
                setMapMode("stylized");
                setSelectedCountry(null);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                mapMode === "stylized"
                  ? "bg-white text-[#722f37] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List size={12} />
              産地一覧
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          {exploredCount} / {totalCountries} カ国を探索済み
        </p>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-[#722f37] h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${(exploredCount / totalCountries) * 100}%` }}
          />
        </div>
      </div>

      {/* Map Content */}
      {mapMode === "real" ? (
        <>
          {/* Real Geographic Map */}
          <div className="flex-1 px-4 py-2 min-h-0">
            <div className="h-full rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <WineMap
                stats={stats}
                wines={wines}
                onSelectCountry={setSelectedCountry}
              />
            </div>
          </div>

          {/* Country Detail Overlay */}
          {selectedCountry && (
            <div className="absolute bottom-20 left-0 right-0 z-[1000] px-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-h-[50vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-gray-900 text-lg">
                    {selectedCountry.country.nameJa}
                    <span className="text-sm font-normal text-gray-400 ml-2">
                      {selectedCountry.country.name}
                    </span>
                  </h2>
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  {selectedCountry.count}本記録 · {selectedCountry.regions.size}{" "}
                  / {selectedCountry.country.regions.length} 地域を探索
                </div>

                {/* Region list */}
                <div className="space-y-1.5 mb-4">
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
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-[#722f37]/10 text-[#722f37] hover:bg-[#722f37]/15 transition-colors"
                      >
                        <MapPin size={10} />
                        <span className="text-xs font-medium">
                          {r.nameJa}
                        </span>
                        <span className="text-[10px] text-[#722f37]/60 ml-0.5">
                          {r.name}
                        </span>
                        <span className="ml-auto text-[10px] flex items-center gap-1">
                          {regionWineCount}本
                          <ChevronRight size={10} />
                        </span>
                      </Link>
                    ) : (
                      <div
                        key={r.name}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-gray-50 text-gray-300"
                      >
                        <MapPin size={10} />
                        <span className="text-xs">{r.nameJa}</span>
                        <span className="text-[10px] ml-0.5">{r.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Wines from this country */}
                {countryWines.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-600 mb-2">
                      この国のワイン
                    </h3>
                    <WineListMini wines={countryWines} maxItems={3} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Unexplored hint */}
          {unexplored.length > 0 && !selectedCountry && (
            <div className="px-4 pb-2">
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 mb-1.5">
                  未探索の国
                </h3>
                <div className="flex flex-wrap gap-1">
                  {unexplored.slice(0, 10).map((s) => (
                    <span
                      key={s.country.code}
                      className="px-2 py-0.5 text-[10px] bg-gray-200/60 text-gray-400 rounded-full"
                    >
                      {s.country.nameJa}
                    </span>
                  ))}
                  {unexplored.length > 10 && (
                    <span className="px-2 py-0.5 text-[10px] text-gray-400">
                      +{unexplored.length - 10}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Stylized Drill-down Map */
        <div className="flex-1 px-4 py-2 min-h-0 overflow-hidden">
          <StylizedMap stats={stats} wines={wines} />
        </div>
      )}
    </div>
  );
}

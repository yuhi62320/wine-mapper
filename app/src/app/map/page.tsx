"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { getWines, getProfile } from "@/lib/store";
import { WINE_COUNTRIES, WineCountry } from "@/lib/countries";
import { WineLog } from "@/lib/types";

interface CountryStats {
  country: WineCountry;
  count: number;
  regions: Set<string>;
  explored: boolean;
}

export default function MapPage() {
  const [stats, setStats] = useState<Map<string, CountryStats>>(new Map());
  const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(null);
  const [wines, setWines] = useState<WineLog[]>([]);

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

  function getOpacity(count: number): number {
    if (count === 0) return 0.08;
    if (count <= 2) return 0.3;
    if (count <= 5) return 0.5;
    if (count <= 10) return 0.7;
    return 0.9;
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">ワインマップ</h1>
      <p className="text-sm text-gray-500 mb-4">
        {exploredCount} / {totalCountries} カ国を探索済み
      </p>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
        <div
          className="bg-[#722f37] h-3 rounded-full transition-all duration-700"
          style={{ width: `${(exploredCount / totalCountries) * 100}%` }}
        />
      </div>

      {/* World Grid Map */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {Array.from(stats.values()).map((s) => (
          <button
            key={s.country.code}
            onClick={() => setSelectedCountry(s.explored ? s : null)}
            className={`relative rounded-xl p-3 text-center transition-all border ${
              s.explored
                ? "border-[#722f37]/20 hover:shadow-md cursor-pointer"
                : "border-gray-100 cursor-default"
            }`}
            style={{
              backgroundColor: s.explored
                ? `rgba(114, 47, 55, ${getOpacity(s.count)})`
                : "#f5f5f4",
            }}
          >
            <div
              className={`text-xs font-bold ${
                s.explored && s.count > 2 ? "text-white" : "text-gray-400"
              }`}
            >
              {s.country.code}
            </div>
            <div
              className={`text-[10px] mt-0.5 ${
                s.explored && s.count > 2
                  ? "text-white/80"
                  : s.explored
                  ? "text-[#722f37]"
                  : "text-gray-300"
              }`}
            >
              {s.explored ? `${s.count}本` : "—"}
            </div>
            {!s.explored && (
              <div className="absolute inset-0 bg-gray-200/40 rounded-xl backdrop-blur-[1px]" />
            )}
          </button>
        ))}
      </div>

      {/* Selected Country Detail */}
      {selectedCountry && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900 text-lg">
              {selectedCountry.country.nameJa}
            </h2>
            <span className="text-sm text-[#722f37] font-medium">
              {selectedCountry.count}本
            </span>
          </div>
          <div className="text-xs text-gray-500 mb-3">
            探索済み地域: {selectedCountry.regions.size} /{" "}
            {selectedCountry.country.regions.length}
          </div>

          {/* Region progress */}
          <div className="space-y-1.5">
            {selectedCountry.country.regions.map((r) => {
              const isExplored = selectedCountry.regions.has(r);
              return (
                <div
                  key={r}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${
                    isExplored
                      ? "bg-[#722f37]/10 text-[#722f37]"
                      : "bg-gray-50 text-gray-300"
                  }`}
                >
                  <MapPin size={10} />
                  <span>{r}</span>
                  {isExplored && (
                    <span className="ml-auto text-[10px]">
                      {wines.filter(
                        (w) =>
                          w.country === selectedCountry.country.name &&
                          w.region === r
                      ).length}
                      本
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setSelectedCountry(null)}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600"
          >
            閉じる
          </button>
        </div>
      )}

      {/* Unexplored hint */}
      {unexplored.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            まだ探索していない国
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {unexplored.slice(0, 12).map((s) => (
              <span
                key={s.country.code}
                className="px-2 py-0.5 text-[10px] bg-gray-200/60 text-gray-400 rounded-full"
              >
                {s.country.nameJa}
              </span>
            ))}
            {unexplored.length > 12 && (
              <span className="px-2 py-0.5 text-[10px] text-gray-400">
                +{unexplored.length - 12}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

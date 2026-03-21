"use client";

import { useState } from "react";
import { ChevronRight, ArrowLeft, MapPin, Wine } from "lucide-react";
import { WineCountry, WINE_COUNTRIES } from "@/lib/countries";
import { WineLog } from "@/lib/types";
import Link from "next/link";
import WineListMini from "./wine-list-mini";

// World wine region groupings (standard wine study classifications)
interface WorldRegion {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  countries: string[]; // country codes
}

const WORLD_REGIONS: WorldRegion[] = [
  {
    id: "western-europe",
    name: "西ヨーロッパ",
    nameEn: "Western Europe",
    icon: "🏰",
    countries: ["FR", "IT", "ES", "PT", "DE", "AT", "CH"],
  },
  {
    id: "eastern-europe",
    name: "東ヨーロッパ",
    nameEn: "Eastern Europe",
    icon: "⛪",
    countries: ["HU", "GR", "GE", "RO", "HR", "SI"],
  },
  {
    id: "british-isles",
    name: "イギリス",
    nameEn: "British Isles",
    icon: "🇬🇧",
    countries: ["GB"],
  },
  {
    id: "north-america",
    name: "北アメリカ",
    nameEn: "North America",
    icon: "🗽",
    countries: ["US", "CA", "MX"],
  },
  {
    id: "south-america",
    name: "南アメリカ",
    nameEn: "South America",
    icon: "🌎",
    countries: ["AR", "CL", "BR", "UY"],
  },
  {
    id: "oceania",
    name: "オセアニア",
    nameEn: "Oceania",
    icon: "🦘",
    countries: ["AU", "NZ"],
  },
  {
    id: "asia",
    name: "アジア",
    nameEn: "Asia",
    icon: "🏯",
    countries: ["JP", "CN"],
  },
  {
    id: "middle-east-africa",
    name: "中東・アフリカ",
    nameEn: "Middle East & Africa",
    icon: "🌍",
    countries: ["IL", "LB", "ZA"],
  },
];

interface CountryStats {
  country: WineCountry;
  count: number;
  regions: Set<string>;
  explored: boolean;
}

interface StylizedMapProps {
  stats: Map<string, CountryStats>;
  wines: WineLog[];
}

type DrillLevel = "world" | "country" | "region";

export default function StylizedMap({ stats, wines }: StylizedMapProps) {
  const [level, setLevel] = useState<DrillLevel>("world");
  const [selectedWorldRegion, setSelectedWorldRegion] =
    useState<WorldRegion | null>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryStats | null>(null);

  function getWorldRegionStats(wr: WorldRegion) {
    let totalWines = 0;
    let exploredCountries = 0;
    for (const code of wr.countries) {
      const c = WINE_COUNTRIES.find((wc) => wc.code === code);
      if (c) {
        const s = stats.get(c.name);
        if (s) {
          totalWines += s.count;
          if (s.explored) exploredCountries++;
        }
      }
    }
    return { totalWines, exploredCountries, totalCountries: wr.countries.length };
  }

  function goBack() {
    if (level === "region") {
      setLevel("country");
      setSelectedCountry(null);
    } else if (level === "country") {
      setLevel("world");
      setSelectedWorldRegion(null);
    }
  }

  // === REGION LEVEL (wine regions within a country) ===
  if (level === "region" && selectedCountry) {
    const countryWines = wines.filter(
      (w) => w.country === selectedCountry.country.name
    );

    return (
      <div className="h-full flex flex-col">
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-sm text-gray-500 mb-3 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          {selectedWorldRegion?.name}に戻る
        </button>

        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            {selectedCountry.country.nameJa}
          </h2>
          <span className="text-sm text-gray-400">
            {selectedCountry.country.name}
          </span>
          <span className="ml-auto text-sm text-[#722f37] font-medium">
            {selectedCountry.count}本
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {selectedCountry.country.regions.map((r) => {
            const isExplored = selectedCountry.regions.has(r.name);
            const regionWineCount = countryWines.filter(
              (w) => w.region === r.name
            ).length;
            const subExplored = r.subRegions.filter((sr) =>
              countryWines.some((w) => w.subRegion === sr.name)
            );

            return (
              <div
                key={r.name}
                className={`rounded-xl border p-3 ${
                  isExplored
                    ? "border-[#722f37]/20 bg-[#722f37]/5"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin
                    size={14}
                    className={
                      isExplored ? "text-[#722f37]" : "text-gray-300"
                    }
                  />
                  <div className="flex-1">
                    {isExplored ? (
                      <Link
                        href={`/map/region/${selectedCountry.country.code}/${encodeURIComponent(r.name)}`}
                        className="text-sm font-medium text-[#722f37] hover:underline"
                      >
                        {r.nameJa}
                        <span className="text-xs text-[#722f37]/60 ml-1">
                          {r.name}
                        </span>
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-300">
                        {r.nameJa}
                        <span className="text-xs text-gray-200 ml-1">
                          {r.name}
                        </span>
                      </span>
                    )}
                  </div>
                  {isExplored && (
                    <span className="text-xs text-[#722f37]/70">
                      {regionWineCount}本
                    </span>
                  )}
                </div>

                {/* Sub-regions */}
                {isExplored && r.subRegions.length > 0 && (
                  <div className="ml-5 mt-2 space-y-1">
                    {r.subRegions.map((sr) => {
                      const srExplored = countryWines.some(
                        (w) => w.subRegion === sr.name
                      );
                      return (
                        <div
                          key={sr.name}
                          className={`text-xs px-2 py-1 rounded ${
                            srExplored
                              ? "text-[#722f37]/80 bg-[#722f37]/5"
                              : "text-gray-300"
                          }`}
                        >
                          {sr.nameJa}
                          <span className="text-[10px] ml-1 opacity-60">
                            {sr.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Wines from this country */}
        {countryWines.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <h3 className="text-xs font-medium text-gray-600 mb-2">
              この国のワイン
            </h3>
            <WineListMini wines={countryWines} maxItems={3} />
          </div>
        )}
      </div>
    );
  }

  // === COUNTRY LEVEL (countries within a world region) ===
  if (level === "country" && selectedWorldRegion) {
    const countriesInRegion = selectedWorldRegion.countries
      .map((code) => {
        const c = WINE_COUNTRIES.find((wc) => wc.code === code);
        return c ? stats.get(c.name) : undefined;
      })
      .filter((s): s is CountryStats => !!s);

    return (
      <div className="h-full flex flex-col">
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-sm text-gray-500 mb-3 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          世界の産地に戻る
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{selectedWorldRegion.icon}</span>
          <h2 className="text-lg font-bold text-gray-900">
            {selectedWorldRegion.name}
          </h2>
          <span className="text-sm text-gray-400">
            {selectedWorldRegion.nameEn}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {countriesInRegion.map((s) => {
            const exploredRegions = s.regions.size;
            const totalRegions = s.country.regions.length;

            return (
              <button
                key={s.country.code}
                onClick={() => {
                  setSelectedCountry(s);
                  setLevel("region");
                }}
                className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                  s.explored
                    ? "border-[#722f37]/20 bg-white hover:shadow-md"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`font-medium ${
                        s.explored ? "text-gray-900" : "text-gray-300"
                      }`}
                    >
                      {s.country.nameJa}
                      <span
                        className={`text-xs ml-1.5 ${
                          s.explored ? "text-gray-400" : "text-gray-200"
                        }`}
                      >
                        {s.country.name}
                      </span>
                    </div>
                    {s.explored && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        {exploredRegions}/{totalRegions} 地域探索 ·{" "}
                        {s.count}本
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {s.explored && (
                      <div className="flex items-center gap-1">
                        <Wine size={14} className="text-[#722f37]" />
                        <span className="text-sm font-medium text-[#722f37]">
                          {s.count}
                        </span>
                      </div>
                    )}
                    <ChevronRight
                      size={16}
                      className={
                        s.explored ? "text-gray-400" : "text-gray-200"
                      }
                    />
                  </div>
                </div>

                {/* Region progress bar */}
                {s.explored && (
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#722f37] h-1.5 rounded-full transition-all"
                      style={{
                        width: `${(exploredRegions / totalRegions) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // === WORLD LEVEL ===
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-1">
        世界のワイン産地
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        地域をタップしてドリルダウン
      </p>

      <div className="flex-1 overflow-y-auto space-y-2">
        {WORLD_REGIONS.map((wr) => {
          const { totalWines, exploredCountries, totalCountries } =
            getWorldRegionStats(wr);
          const hasExplored = exploredCountries > 0;

          return (
            <button
              key={wr.id}
              onClick={() => {
                setSelectedWorldRegion(wr);
                setLevel("country");
              }}
              className={`w-full text-left rounded-xl border p-4 transition-all ${
                hasExplored
                  ? "border-[#722f37]/20 bg-white hover:shadow-md"
                  : "border-gray-100 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wr.icon}</span>
                  <div>
                    <div
                      className={`font-medium ${
                        hasExplored ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {wr.name}
                    </div>
                    <div
                      className={`text-xs ${
                        hasExplored ? "text-gray-500" : "text-gray-300"
                      }`}
                    >
                      {wr.nameEn} · {totalCountries}カ国
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {hasExplored && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-[#722f37]">
                        {totalWines}本
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {exploredCountries}/{totalCountries}カ国
                      </div>
                    </div>
                  )}
                  <ChevronRight
                    size={16}
                    className={hasExplored ? "text-gray-400" : "text-gray-200"}
                  />
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-[#722f37] h-1.5 rounded-full transition-all"
                  style={{
                    width: `${(exploredCountries / totalCountries) * 100}%`,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

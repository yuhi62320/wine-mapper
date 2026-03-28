"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PalateLevel, WineLog, WINE_TYPE_LABELS, WINE_TYPE_COLORS } from "@/lib/types";
import { getWines } from "@/lib/store";
import RadarChart from "@/components/radar-chart";

// Grape variety type matching the API response
interface GrapeDetail {
  id: string;
  name_en: string;
  name_ja: string;
  is_red: boolean;
  origin_country: string | null;
  origin_region: string | null;
  description_ja: string | null;
  characteristics: string | null;
  typical_aromas: string[];
  typical_palate: {
    sweetness: number;
    acidity: number;
    tannin: number | null;
    body: number;
    finish: number;
  } | null;
  food_pairings: string[];
  notable_regions: string[];
}

export default function GrapeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [grape, setGrape] = useState<GrapeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userWines, setUserWines] = useState<WineLog[]>([]);

  // Fetch grape detail and user wines
  useEffect(() => {
    async function fetchGrape() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/grapes/${id}`);
        if (!res.ok) throw new Error("Grape not found");
        const data = await res.json();
        setGrape(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    }
    fetchGrape();
    setUserWines(getWines());
  }, [id]);

  // Filter wines that contain this grape variety
  const matchingWines = grape
    ? userWines.filter((w) =>
        w.grapeVarieties.some(
          (v) => v.toLowerCase() === grape.name_en.toLowerCase()
        )
      )
    : [];

  // Build radar chart data from typical_palate
  const radarData = grape?.typical_palate
    ? [
        { label: "甘さ", value: grape.typical_palate.sweetness as PalateLevel },
        { label: "酸味", value: grape.typical_palate.acidity as PalateLevel },
        // Skip tannin for white grapes (null value)
        ...(grape.typical_palate.tannin != null
          ? [{ label: "タンニン", value: grape.typical_palate.tannin as PalateLevel }]
          : []),
        { label: "ボディ", value: grape.typical_palate.body as PalateLevel },
        { label: "余韻", value: grape.typical_palate.finish as PalateLevel },
      ]
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-surface pb-28">
        <div className="px-5 pt-10">
          <div className="animate-pulse">
            <div className="h-4 bg-stone-200 rounded w-16 mb-8" />
            <div className="h-8 bg-stone-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-stone-200 rounded w-1/2 mb-4" />
            <div className="h-6 bg-stone-200 rounded w-24 mb-8" />
            <div className="h-40 bg-stone-200 rounded mb-6" />
            <div className="h-4 bg-stone-200 rounded w-full mb-2" />
            <div className="h-4 bg-stone-200 rounded w-full mb-2" />
            <div className="h-4 bg-stone-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !grape) {
    return (
      <div className="min-h-screen bg-surface pb-28">
        <div className="px-5 pt-10 text-center">
          <Link
            href="/grapes"
            className="inline-flex items-center gap-1 text-sm text-[#722f37] mb-8"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            品種一覧
          </Link>
          <span className="material-symbols-outlined text-4xl text-stone-300 mb-3 block">
            error_outline
          </span>
          <p className="text-sm text-stone-500 font-body">
            {error || "品種が見つかりませんでした"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-28">
      <div className="px-5 pt-10">
        {/* Back button */}
        <Link
          href="/grapes"
          className="inline-flex items-center gap-1 text-sm text-[#722f37] mb-6"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          品種一覧
        </Link>

        {/* === Header === */}
        <div className="mb-6">
          <h1 className="font-headline text-3xl font-bold text-[#561922] mb-1">
            {grape.name_ja}
          </h1>
          <p className="text-sm text-stone-400 italic font-body mb-3">
            {grape.name_en}
          </p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              grape.is_red
                ? "bg-[#722f37]/10 text-[#722f37]"
                : "bg-[#c9a84c]/15 text-[#8a7530]"
            }`}
          >
            {grape.is_red ? "赤ワイン用" : "白ワイン用"}
          </span>
        </div>

        {/* === Origin === */}
        {(grape.origin_country || grape.origin_region) && (
          <div className="mb-6">
            <h2 className="font-headline text-sm font-semibold text-[#561922] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#722f37]">
                public
              </span>
              原産地
            </h2>
            <p className="text-sm text-stone-600 font-body">
              {[grape.origin_country, grape.origin_region]
                .filter(Boolean)
                .join(" / ")}
            </p>
          </div>
        )}

        {/* === Description === */}
        {grape.description_ja && (
          <div className="mb-6">
            <h2 className="font-headline text-sm font-semibold text-[#561922] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#722f37]">
                description
              </span>
              説明
            </h2>
            <div className="text-sm text-stone-600 font-body leading-relaxed space-y-3">
              {grape.description_ja.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* === Taste Profile (Radar Chart) === */}
        {radarData && radarData.length > 0 && (
          <div className="mb-6">
            <h2 className="font-headline text-sm font-semibold text-[#561922] mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#722f37]">
                donut_small
              </span>
              味わいプロフィール
            </h2>
            <div className="flex justify-center bg-surface-container-low rounded-xl p-4">
              <RadarChart data={radarData} interactive={false} />
            </div>
          </div>
        )}

        {/* === Typical Aromas === */}
        {grape.typical_aromas && grape.typical_aromas.length > 0 && (
          <div className="mb-6">
            <h2 className="font-headline text-sm font-semibold text-[#561922] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#722f37]">
                spa
              </span>
              代表的なアロマ
            </h2>
            <div className="flex flex-wrap gap-2">
              {grape.typical_aromas.map((aroma, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#722f37]/8 text-[#722f37] text-xs rounded-full font-body"
                >
                  {aroma}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* === Food Pairings === */}
        {grape.food_pairings && grape.food_pairings.length > 0 && (
          <div className="mb-6">
            <h2 className="font-headline text-sm font-semibold text-[#561922] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#722f37]">
                restaurant
              </span>
              食事の相性
            </h2>
            <div className="flex flex-wrap gap-2">
              {grape.food_pairings.map((food, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#c9a84c]/12 text-[#8a7530] text-xs rounded-full font-body"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* === Notable Regions === */}
        {grape.notable_regions && grape.notable_regions.length > 0 && (
          <div className="mb-6">
            <h2 className="font-headline text-sm font-semibold text-[#561922] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#722f37]">
                location_on
              </span>
              主要産地
            </h2>
            <ul className="space-y-1.5">
              {grape.notable_regions.map((region, i) => (
                <li
                  key={i}
                  className="text-sm text-stone-600 font-body flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#722f37]/30 flex-shrink-0" />
                  {region}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* === Divider === */}
        <hr className="border-[#722f37]/10 my-8" />

        {/* === User's wines with this grape === */}
        <div className="mb-8">
          <h2 className="font-headline text-sm font-semibold text-[#561922] mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-[#722f37]">
              wine_bar
            </span>
            この品種のワイン
          </h2>

          {matchingWines.length > 0 ? (
            <div className="space-y-3">
              {matchingWines.map((wine) => (
                <Link
                  key={wine.id}
                  href={`/wines/${wine.id}`}
                  className="block bg-surface-container-low rounded-xl p-4 hover:shadow-md transition-shadow active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3">
                    {/* Wine type color dot */}
                    <div
                      className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                      style={{
                        backgroundColor:
                          WINE_TYPE_COLORS[wine.type] || "#722f37",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-headline text-sm font-bold text-[#561922] truncate">
                        {wine.name || "無名のワイン"}
                      </p>
                      <p className="text-[11px] text-stone-400 font-body truncate">
                        {wine.producer}
                        {wine.vintage ? ` / ${wine.vintage}` : ""}
                      </p>
                      <span
                        className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor: `${WINE_TYPE_COLORS[wine.type]}15`,
                          color: WINE_TYPE_COLORS[wine.type],
                        }}
                      >
                        {WINE_TYPE_LABELS[wine.type]?.ja || wine.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-surface-container-low rounded-xl">
              <span className="material-symbols-outlined text-3xl text-stone-300 mb-2 block">
                wine_bar
              </span>
              <p className="text-sm text-stone-400 font-body mb-3">
                まだこの品種のワインを記録していません
              </p>
              <Link
                href="/wines/new"
                className="inline-flex items-center gap-1 px-4 py-2 bg-[#722f37] text-white text-xs rounded-full font-medium hover:bg-[#561922] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                ワインを記録する
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

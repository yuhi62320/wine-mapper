"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getWines } from "@/lib/store";

// Grape variety type matching the API response
interface GrapeVariety {
  id: string;
  name_en: string;
  name_ja: string;
  is_red: boolean;
  characteristics: string | null;
}

type ColorFilter = "all" | "red" | "white";

export default function GrapesPage() {
  const [grapes, setGrapes] = useState<GrapeVariety[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [colorFilter, setColorFilter] = useState<ColorFilter>("all");

  // Count how many wines per grape from user's collection
  const grapeCounts = useMemo(() => {
    const wines = getWines();
    const counts: Record<string, number> = {};
    for (const wine of wines) {
      for (const grape of wine.grapeVarieties || []) {
        const normalized = grape.trim().toLowerCase();
        counts[normalized] = (counts[normalized] || 0) + 1;
      }
    }
    return counts;
  }, []);

  // Helper to get count for a grape
  function getGrapeCount(grape: GrapeVariety): number {
    // Match by English name (case-insensitive)
    const byEn = grapeCounts[grape.name_en.toLowerCase()] || 0;
    // Also try Japanese name
    const byJa = grapeCounts[grape.name_ja.toLowerCase()] || 0;
    return Math.max(byEn, byJa);
  }

  // Fetch grapes on mount and when color filter changes
  useEffect(() => {
    async function fetchGrapes() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (colorFilter !== "all") {
          params.set("color", colorFilter);
        }
        const res = await fetch(`/api/grapes?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch grapes");
        const data = await res.json();
        setGrapes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      } finally {
        setLoading(false);
      }
    }
    fetchGrapes();
  }, [colorFilter]);

  // Filter by search, then sort: tasted grapes first (by count desc), then untasted
  const filtered = useMemo(() => {
    let result = grapes.filter((g) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        g.name_ja.toLowerCase().includes(q) ||
        g.name_en.toLowerCase().includes(q)
      );
    });

    // Sort: tasted (by count desc) → untasted (alphabetical)
    result = [...result].sort((a, b) => {
      const countA = getGrapeCount(a);
      const countB = getGrapeCount(b);
      // Both tasted: higher count first
      if (countA > 0 && countB > 0) return countB - countA;
      // Only one tasted: tasted first
      if (countA > 0) return -1;
      if (countB > 0) return 1;
      // Both untasted: alphabetical
      return a.name_en.localeCompare(b.name_en);
    });

    return result;
  }, [grapes, search, grapeCounts]);

  const tastedCount = grapes.filter((g) => getGrapeCount(g) > 0).length;

  return (
    <div className="min-h-screen bg-surface pb-28">
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-headline text-2xl font-bold text-[#561922]">
            品種図鑑
          </h1>
          {!loading && (
            <span className="text-xs bg-[#722f37]/10 text-[#722f37] px-2.5 py-0.5 rounded-full font-medium">
              {tastedCount} / {grapes.length} 品種
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="品種名で検索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-[#722f37]/10 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Color filter toggle */}
      <div className="px-5 mb-5 flex gap-2">
        {(
          [
            { key: "all", label: "すべて" },
            { key: "red", label: "赤" },
            { key: "white", label: "白" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setColorFilter(key)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              colorFilter === key
                ? "bg-[#722f37] text-white shadow-sm"
                : "bg-surface-container-low text-stone-500 hover:bg-[#722f37]/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-5">
        {loading ? (
          // Loading state
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface-container-low rounded-xl p-4 animate-pulse"
              >
                <div className="w-3 h-3 rounded-full bg-stone-200 mb-3" />
                <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-1/2 mb-3" />
                <div className="h-3 bg-stone-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-4xl text-stone-300 mb-3 block">
              error_outline
            </span>
            <p className="text-sm text-stone-500 font-body">{error}</p>
            <button
              onClick={() => setColorFilter(colorFilter)}
              className="mt-3 text-xs text-[#722f37] underline"
            >
              再試行
            </button>
          </div>
        ) : filtered.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-4xl text-stone-300 mb-3 block">
              eco
            </span>
            <p className="text-sm text-stone-500 font-body">
              {search
                ? "該当する品種が見つかりませんでした"
                : "品種データがありません"}
            </p>
          </div>
        ) : (
          // Grape cards grid
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((grape) => {
              const count = getGrapeCount(grape);
              const tasted = count > 0;
              return (
                <Link
                  key={grape.id}
                  href={`/grapes/${grape.id}`}
                  className={`rounded-xl p-4 transition-shadow active:scale-[0.98] ${
                    tasted
                      ? "bg-surface-container-low hover:shadow-md"
                      : "bg-stone-100/60 opacity-50"
                  }`}
                >
                  {/* Top row: color dot + count badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        tasted
                          ? grape.is_red
                            ? "bg-[#722f37]"
                            : "bg-[#c9a84c]"
                          : "bg-stone-300"
                      }`}
                    />
                    {tasted ? (
                      <span className="text-[10px] font-label font-bold text-[#722f37] bg-[#722f37]/10 px-1.5 py-0.5 rounded-full">
                        {count}本
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-stone-300 text-[14px]">lock</span>
                    )}
                  </div>
                  {/* Name (Japanese) */}
                  <p className={`font-headline text-sm font-bold leading-tight mb-0.5 ${
                    tasted ? "text-[#561922]" : "text-stone-400"
                  }`}>
                    {grape.name_ja}
                  </p>
                  {/* Name (English) */}
                  <p className={`text-[11px] italic font-body mb-2 ${
                    tasted ? "text-stone-400" : "text-stone-300"
                  }`}>
                    {grape.name_en}
                  </p>
                  {/* Characteristics (truncated) - only for tasted */}
                  {tasted && grape.characteristics && (
                    <p className="text-[11px] text-stone-500 font-body line-clamp-1">
                      {grape.characteristics}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

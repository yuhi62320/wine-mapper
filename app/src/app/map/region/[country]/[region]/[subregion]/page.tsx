"use client";

import { use, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WINE_COUNTRIES, findRegion } from "@/lib/countries";

interface Props {
  params: Promise<{ country: string; region: string; subregion: string }>;
}

// Guide sections matching the API response keys
const GUIDE_SECTIONS = [
  { key: "terroir", icon: "terrain", label: "テロワール" },
  { key: "climate", icon: "air", label: "気候" },
  { key: "history", icon: "history_edu", label: "歴史" },
  { key: "keyStyles", icon: "wine_bar", label: "ワインスタイル" },
  { key: "topProducers", icon: "stars", label: "トップ生産者" },
  { key: "foodPairing", icon: "restaurant", label: "フードペアリング" },
  { key: "visitTips", icon: "map", label: "訪問ガイド" },
  { key: "regulations", icon: "gavel", label: "規制・格付け" },
  { key: "sommNotes", icon: "edit_note", label: "ソムリエノート" },
  { key: "vintageGuide", icon: "calendar_today", label: "ヴィンテージ" },
] as const;

// Type for a guide section value from the API
interface GuideSection {
  text: string;
  imageKeyword: string;
}

// Type for the full API response
interface GuideData {
  regionName: string;
  heroImage: string;
  terroir: GuideSection;
  climate: GuideSection;
  history: GuideSection;
  keyStyles: GuideSection;
  topProducers: GuideSection;
  foodPairing: GuideSection;
  visitTips: GuideSection;
  regulations: GuideSection;
  sommNotes: GuideSection;
  funFact: GuideSection;
  vintageGuide: GuideSection;
  [key: string]: unknown;
}

export default function SubRegionPage({ params }: Props) {
  const {
    country: countryCode,
    region: regionEncoded,
    subregion: subRegionEncoded,
  } = use(params);
  const regionName = decodeURIComponent(regionEncoded);
  const subRegionName = decodeURIComponent(subRegionEncoded);
  const router = useRouter();

  const [guideData, setGuideData] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const wineCountry = WINE_COUNTRIES.find((c) => c.code === countryCode);
  const wineRegion = wineCountry
    ? findRegion(wineCountry, regionName)
    : undefined;
  const subRegion = wineRegion?.subRegions.find(
    (sr) => sr.name === subRegionName
  );

  const fetchGuideData = useCallback(async () => {
    if (!wineCountry || !subRegionName) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/region-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: wineCountry.name,
          region: regionName,
          subRegion: subRegionName,
          grapes: [],
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      const data = await res.json();
      setGuideData(data);
    } catch (err) {
      console.error("Failed to fetch sub-region guide:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load guide data"
      );
    } finally {
      setLoading(false);
    }
  }, [wineCountry, regionName, subRegionName]);

  useEffect(() => {
    fetchGuideData();
  }, [fetchGuideData]);

  // Not found state
  if (!wineCountry || !wineRegion || !subRegion) {
    return (
      <div className="px-6 pt-12 text-center">
        <span className="material-symbols-outlined text-primary/20 text-6xl block mb-4">
          error_outline
        </span>
        <p className="text-on-surface-variant font-headline italic">
          サブ地域が見つかりません
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 text-sm text-secondary uppercase tracking-widest"
        >
          戻る
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 bg-surface/90 backdrop-blur-xl">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={() => router.back()}
            className="hover:opacity-70 transition-opacity text-primary-container shrink-0"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-base sm:text-xl tracking-tight text-primary-container truncate">
            {subRegion.nameJa}
          </h1>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="px-5 sm:px-6 py-2 sm:py-3 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-on-surface-variant overflow-x-auto whitespace-nowrap">
        <Link
          href="/map"
          className="hover:text-primary transition-colors shrink-0"
        >
          地域一覧
        </Link>
        <span className="material-symbols-outlined text-xs shrink-0">chevron_right</span>
        <Link
          href={`/map/region/${countryCode}/${encodeURIComponent(regionName)}`}
          className="hover:text-primary transition-colors shrink-0"
        >
          {wineRegion.nameJa}
        </Link>
        <span className="material-symbols-outlined text-xs shrink-0">chevron_right</span>
        <span className="text-primary font-medium shrink-0">{subRegion.nameJa}</span>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[260px] sm:h-[400px] w-full overflow-hidden bg-gradient-to-b from-primary-container to-primary flex items-end">
        <div className="relative z-10 px-5 sm:px-6 pb-8 sm:pb-12 w-full">
          <p className="text-secondary font-bold tracking-[0.25em] uppercase text-[10px] sm:text-xs mb-2 sm:mb-4">
            {wineCountry.nameJa} · {wineRegion.nameJa}
          </p>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-primary leading-tight tracking-tight">
            {subRegion.nameJa}
          </h2>
          <p className="font-headline text-sm sm:text-2xl font-light italic text-primary/70 mt-1">
            {subRegionName}, {regionName}
          </p>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading && (
        <section className="px-5 sm:px-6 py-10 sm:py-12">
          <div className="animate-pulse space-y-5 sm:space-y-6">
            <div className="h-6 bg-surface-container-low rounded w-1/3" />
            <div className="h-4 bg-surface-container-low rounded w-full" />
            <div className="h-4 bg-surface-container-low rounded w-5/6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 sm:h-24 bg-surface-container-low rounded-2xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="px-5 sm:px-6 py-10 sm:py-12 text-center">
          <span className="material-symbols-outlined text-error/40 text-5xl block mb-4">
            cloud_off
          </span>
          <p className="text-on-surface-variant mb-4 text-sm">{error}</p>
          <button
            onClick={fetchGuideData}
            className="px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-medium"
          >
            再読み込み
          </button>
        </section>
      )}

      {/* Guide Content */}
      {guideData && !loading && (
        <>
          {/* Description / Introduction */}
          {(guideData.description || guideData.regionName) && (
            <section className="px-5 sm:px-6 py-8 sm:py-12">
              {guideData.description ? (
                <p className="font-headline text-base sm:text-xl text-on-surface leading-[1.9] tracking-[0.02em]">
                  {typeof guideData.description === "object" &&
                  "text" in (guideData.description as Record<string, unknown>)
                    ? (guideData.description as GuideSection).text
                    : typeof guideData.description === "string"
                      ? guideData.description
                      : guideData.regionName}
                </p>
              ) : guideData.regionName ? (
                <p className="font-headline text-base sm:text-xl text-on-surface leading-[1.9] tracking-[0.02em]">
                  {guideData.regionName}
                </p>
              ) : null}
            </section>
          )}

          {/* Guide Grid */}
          <section className="px-5 sm:px-6 py-6 sm:py-8">
            <div className="flex items-baseline justify-between mb-5 sm:mb-8">
              <h3 className="font-headline text-lg sm:text-2xl text-primary tracking-tight">
                Sub-Region Guide
              </h3>
              <span className="h-[1px] flex-grow ml-4 sm:ml-6 bg-outline-variant/30" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
              {GUIDE_SECTIONS.map(({ key, icon, label }) => {
                const section = guideData[key];
                const text =
                  section && typeof section === "object" && "text" in (section as GuideSection)
                    ? (section as GuideSection).text
                    : typeof section === "string"
                      ? section
                      : null;
                if (!text) return null;

                const isExpanded = expandedSection === key;

                return (
                  <div
                    key={key}
                    className={`${
                      isExpanded ? "sm:col-span-2" : ""
                    } bg-surface-container-low/60 border border-outline-variant/20 p-4 sm:p-5 group cursor-pointer transition-all duration-300 hover:bg-surface-container hover:border-primary/30 rounded-2xl`}
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : key)
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="material-symbols-outlined text-primary text-xl sm:text-2xl shrink-0">
                          {icon}
                        </span>
                        <h4 className="font-headline text-sm sm:text-base group-hover:text-primary transition-colors truncate">
                          {label}
                        </h4>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant/60 text-base shrink-0">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </div>
                    {isExpanded && (
                      <p className="mt-4 pt-4 border-t border-outline-variant/30 text-[13px] sm:text-sm text-on-surface-variant leading-[1.8] tracking-[0.02em] whitespace-pre-line">
                        {text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Fun Fact Quote */}
          {guideData.funFact && (
            <section className="px-5 sm:px-6 py-10 sm:py-16 flex flex-col items-center text-center">
              <span
                className="material-symbols-outlined text-secondary text-3xl sm:text-4xl mb-4 sm:mb-6"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <p className="font-headline text-base sm:text-xl text-primary max-w-md leading-[1.8] italic">
                {typeof guideData.funFact === "object" &&
                "text" in guideData.funFact
                  ? (guideData.funFact as GuideSection).text
                  : typeof guideData.funFact === "string"
                    ? guideData.funFact
                    : null}
              </p>
              <div className="mt-6 sm:mt-8 h-[2px] w-12 sm:w-16 bg-secondary" />
            </section>
          )}
        </>
      )}
    </div>
  );
}

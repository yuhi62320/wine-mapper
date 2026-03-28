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
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-surface/90 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="hover:opacity-70 transition-opacity text-primary-container"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold text-xl tracking-tight text-primary-container">
            {subRegionName}
          </h1>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="px-6 py-3 flex items-center gap-2 text-xs text-on-surface-variant">
        <Link
          href="/map"
          className="hover:text-primary transition-colors"
        >
          地域一覧
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link
          href={`/map/region/${countryCode}/${encodeURIComponent(regionName)}`}
          className="hover:text-primary transition-colors"
        >
          {wineRegion.nameJa}
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-primary font-medium">{subRegion.nameJa}</span>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-b from-primary-container to-primary flex items-end">
        <div className="relative z-10 px-6 pb-12 w-full">
          <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {wineCountry.nameJa} · {wineRegion.nameJa}
          </p>
          <h2 className="font-headline font-black text-5xl text-primary leading-tight tracking-tighter">
            {subRegion.nameJa}
          </h2>
          <p className="font-headline text-2xl font-light italic text-primary/70 mt-1">
            {subRegionName}, {regionName}
          </p>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading && (
        <section className="px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-surface-container-low rounded w-1/3" />
            <div className="h-4 bg-surface-container-low rounded w-full" />
            <div className="h-4 bg-surface-container-low rounded w-5/6" />
            <div className="grid grid-cols-2 gap-4 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-surface-container-low rounded-xl"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && !loading && (
        <section className="px-6 py-12 text-center">
          <span className="material-symbols-outlined text-error/40 text-5xl block mb-4">
            cloud_off
          </span>
          <p className="text-on-surface-variant mb-4">{error}</p>
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
          {/* Region Name from API */}
          {guideData.regionName && (
            <section className="px-6 py-12">
              <p className="font-headline text-xl text-on-surface leading-relaxed">
                {guideData.regionName}
              </p>
            </section>
          )}

          {/* Guide Grid */}
          <section className="px-6 py-8">
            <div className="flex items-baseline justify-between mb-8">
              <h3 className="font-headline text-2xl text-primary">
                Sub-Region Guide
              </h3>
              <span className="h-[1px] flex-grow mx-6 bg-outline-variant/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {GUIDE_SECTIONS.map(({ key, icon, label }) => {
                const section = guideData[key];
                // Handle both { text, imageKeyword } objects and plain strings
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
                      isExpanded ? "col-span-2" : ""
                    } bg-surface-container-low p-4 flex flex-col justify-between group cursor-pointer transition-all duration-500 hover:bg-surface-container-highest rounded-xl`}
                    onClick={() =>
                      setExpandedSection(isExpanded ? null : key)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        {icon}
                      </span>
                      <h4 className="font-headline text-base group-hover:text-primary transition-colors">
                        {label}
                      </h4>
                    </div>
                    {isExpanded && (
                      <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
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
            <section className="px-6 py-16 flex flex-col items-center text-center">
              <span
                className="material-symbols-outlined text-secondary text-4xl mb-6"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <p className="font-headline text-xl text-primary max-w-md leading-relaxed italic">
                {typeof guideData.funFact === "object" &&
                "text" in guideData.funFact
                  ? (guideData.funFact as GuideSection).text
                  : typeof guideData.funFact === "string"
                    ? guideData.funFact
                    : null}
              </p>
              <div className="mt-8 h-1 w-16 bg-secondary" />
            </section>
          )}
        </>
      )}
    </div>
  );
}

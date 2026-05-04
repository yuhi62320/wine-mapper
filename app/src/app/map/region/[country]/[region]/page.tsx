"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WINE_COUNTRIES, findRegion } from "@/lib/countries";
import { getRegionContent, RegionContent } from "@/lib/region-content";
import { getWinesByRegion } from "@/lib/store";
import { WineLog } from "@/lib/types";
import WineListMini from "@/components/wine-list-mini";

interface Props {
  params: Promise<{ country: string; region: string }>;
}

const GUIDE_SECTIONS = [
  { key: "terroir", icon: "terrain", label: "テロワール" },
  { key: "climate", icon: "air", label: "気候" },
  { key: "history", icon: "history_edu", label: "歴史" },
  { key: "wineStyles", icon: "wine_bar", label: "ワインスタイル" },
  { key: "topProducers", icon: "stars", label: "トップ生産者" },
  { key: "foodPairing", icon: "restaurant", label: "フードペアリング" },
  { key: "tourism", icon: "map", label: "観光・訪問" },
  { key: "nature", icon: "eco", label: "自然" },
  { key: "culture", icon: "museum", label: "文化" },
  { key: "regulations", icon: "gavel", label: "規制" },
  { key: "sommNotes", icon: "edit_note", label: "ソムリエノート" },
  { key: "vintageGuide", icon: "calendar_today", label: "ヴィンテージ" },
] as const;

const TOUR_TYPE_ICONS: Record<string, string> = {
  winery_visit: "castle",
  wine_tour: "directions_bus",
  food_pairing: "restaurant",
  harvest_experience: "agriculture",
  city_tour: "location_city",
  accommodation: "hotel",
};

interface TourItem {
  title: string;
  description: string;
  type: string;
  location?: string;
  duration?: string;
  bestSeason?: string;
  priceRange?: string;
  highlights?: string[];
  bookingTip?: string;
}

interface TourData {
  tours?: TourItem[];
  travelTips?: string;
  nearbyAttractions?: Array<string | { name: string; description: string; distanceFromRegion?: string }>;
  winalistSearchQuery?: string;
  airbnbSearchQuery?: string;
}

export default function RegionPage({ params }: Props) {
  const { country: countryCode, region: regionEncoded } = use(params);
  const regionName = decodeURIComponent(regionEncoded);
  const router = useRouter();
  const [wines, setWines] = useState<WineLog[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [remoteContent, setRemoteContent] = useState<RegionContent | null>(null);
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const wineCountry = WINE_COUNTRIES.find((c) => c.code === countryCode);
  const wineRegion = wineCountry
    ? findRegion(wineCountry, regionName)
    : undefined;
  const localContent = getRegionContent(countryCode, regionName);

  // Use local content if available, otherwise use Supabase-fetched content
  const content = localContent ?? remoteContent;

  useEffect(() => {
    if (wineCountry) {
      setWines(getWinesByRegion(wineCountry.name, regionName));
    }
  }, [wineCountry, regionName]);

  // Fetch from Supabase cache when local content is not available
  useEffect(() => {
    if (localContent || !wineCountry) return;

    setLoading(true);
    const url = `/api/region-cache?country=${encodeURIComponent(wineCountry.name)}&region=${encodeURIComponent(regionName)}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data) {
          setRemoteContent({
            countryCode,
            regionName,
            nameJa: wineRegion?.nameJa ?? regionName,
            heroImage: data.heroImage ?? "",
            description: data.description ?? "",
            terroir: data.terroir ?? "",
            climate: data.climate ?? "",
            history: data.history ?? "",
            wineStyles: data.wineStyles ?? "",
            keyGrapes: data.keyGrapes ?? [],
            topProducers: data.topProducers ?? "",
            foodPairing: data.foodPairing ?? "",
            tourism: data.tourism ?? "",
            nature: data.nature ?? "",
            culture: data.culture ?? "",
            regulations: data.regulations ?? "",
            sommNotes: data.sommNotes ?? "",
            vintageGuide: data.vintageGuide ?? "",
            bestSeason: data.bestSeason ?? "",
            funFact: data.funFact ?? "",
          });
          if (data.tourData) {
            setTourData(data.tourData as TourData);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch region cache:", err))
      .finally(() => setLoading(false));
  }, [localContent, wineCountry, countryCode, regionName, wineRegion]);

  // Generate guide via AI when no content exists
  async function handleGenerateGuide() {
    if (!wineCountry) return;
    setGenerating(true);
    try {
      const res = await fetch("/api/region-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: wineCountry.name,
          region: regionName,
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();

      // Separate tourData
      const { tourData: td, ...guideFields } = data;
      setRemoteContent({
        countryCode,
        regionName,
        nameJa: wineRegion?.nameJa ?? regionName,
        heroImage: guideFields.heroImage ?? "",
        description: guideFields.description ?? "",
        terroir: typeof guideFields.terroir === "object" ? guideFields.terroir.text : (guideFields.terroir ?? ""),
        climate: typeof guideFields.climate === "object" ? guideFields.climate.text : (guideFields.climate ?? ""),
        history: typeof guideFields.history === "object" ? guideFields.history.text : (guideFields.history ?? ""),
        wineStyles: typeof guideFields.keyStyles === "object" ? guideFields.keyStyles.text : (guideFields.keyStyles ?? ""),
        keyGrapes: guideFields.keyGrapes ?? [],
        topProducers: typeof guideFields.topProducers === "object" ? guideFields.topProducers.text : (guideFields.topProducers ?? ""),
        foodPairing: typeof guideFields.foodPairing === "object" ? guideFields.foodPairing.text : (guideFields.foodPairing ?? ""),
        tourism: typeof guideFields.visitTips === "object" ? guideFields.visitTips.text : (guideFields.visitTips ?? ""),
        nature: typeof guideFields.nature === "object" ? guideFields.nature.text : (guideFields.nature ?? ""),
        culture: typeof guideFields.culture === "object" ? guideFields.culture.text : (guideFields.culture ?? ""),
        regulations: typeof guideFields.regulations === "object" ? guideFields.regulations.text : (guideFields.regulations ?? ""),
        sommNotes: typeof guideFields.sommNotes === "object" ? guideFields.sommNotes.text : (guideFields.sommNotes ?? ""),
        vintageGuide: typeof guideFields.vintageGuide === "object" ? guideFields.vintageGuide.text : (guideFields.vintageGuide ?? ""),
        bestSeason: guideFields.bestSeason ?? "",
        funFact: typeof guideFields.funFact === "object" ? guideFields.funFact.text : (guideFields.funFact ?? ""),
      });
      if (td) setTourData(td as TourData);
    } catch (err) {
      console.error("Failed to generate guide:", err);
    } finally {
      setGenerating(false);
    }
  }

  if (!wineCountry || !wineRegion) {
    return (
      <div className="px-6 pt-12 text-center">
        <span className="material-symbols-outlined text-primary/20 text-6xl block mb-4">
          error_outline
        </span>
        <p className="text-on-surface-variant font-headline italic">
          地域が見つかりません
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

  const tours = tourData?.tours || [];
  const travelTips = tourData?.travelTips;
  const nearbyAttractions = tourData?.nearbyAttractions || [];

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
            {wineRegion.nameJa}
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[280px] sm:h-[400px] w-full overflow-hidden bg-gradient-to-b from-primary-container to-primary flex items-end">
        {content?.heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={regionName}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              src={content.heroImage}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </>
        )}
        <div className="relative z-10 px-5 sm:px-6 pb-8 sm:pb-12 w-full">
          <p className="text-secondary font-bold tracking-[0.25em] uppercase text-[10px] sm:text-xs mb-2 sm:mb-4">
            {wineCountry.nameJa}
          </p>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-primary leading-tight tracking-tight">
            {wineRegion.nameJa}
          </h2>
          <p className="font-headline text-sm sm:text-2xl font-light italic text-primary/70 mt-1">
            {regionName}, {wineCountry.name}
          </p>
        </div>
      </section>

      {/* Loading indicator for remote content */}
      {loading && !content && (
        <section className="px-6 py-16 flex flex-col items-center">
          <span className="material-symbols-outlined text-primary/30 text-4xl animate-pulse">
            hourglass_top
          </span>
          <p className="text-on-surface-variant text-sm mt-4 font-headline italic">
            地域ガイドを読み込み中...
          </p>
        </section>
      )}

      {/* Generate Guide Button (when no content exists) */}
      {!loading && !content && (
        <section className="px-6 py-16 flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-primary/20 text-5xl mb-4">auto_awesome</span>
          <p className="text-on-surface-variant font-headline italic mb-6">
            この地域のガイドはまだ生成されていません
          </p>
          <button
            onClick={handleGenerateGuide}
            disabled={generating}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-full font-label text-sm tracking-wider hover:bg-primary-container transition-colors disabled:opacity-50"
          >
            {generating ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                AIガイドを生成中...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">travel_explore</span>
                AIで地域ガイドを生成
              </>
            )}
          </button>
        </section>
      )}

      {/* Editorial Intro */}
      {content && (
        <section className="px-5 sm:px-6 py-8 sm:py-12">
          <p className="font-headline text-base sm:text-xl text-on-surface leading-[1.9] tracking-[0.02em]">
            {content.description}
          </p>
          {content.keyGrapes.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-outline-variant/30 flex items-baseline gap-3">
              <span className="text-secondary font-bold text-2xl sm:text-3xl">
                {content.keyGrapes.length}
              </span>
              <span className="text-on-surface-variant text-[10px] sm:text-xs tracking-[0.2em] uppercase">
                Key Grapes
              </span>
            </div>
          )}
        </section>
      )}

      {/* Key Grapes */}
      {content && content.keyGrapes.length > 0 && (
        <section className="px-5 sm:px-6 mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {content.keyGrapes.map((g) => (
              <Link
                key={g}
                href={`/grapes?q=${encodeURIComponent(g)}`}
                className="px-3 sm:px-4 py-1.5 bg-surface-container-lowest rounded-full text-[11px] sm:text-xs font-medium text-primary shadow-sm hover:bg-primary/10 transition-colors flex items-center gap-1"
              >
                {g}
                <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-primary/40">arrow_forward</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Region Guide Grid */}
      {content && (
        <section className="px-5 sm:px-6 py-6 sm:py-8">
          <div className="flex items-baseline justify-between mb-5 sm:mb-8">
            <h3 className="font-headline text-lg sm:text-2xl text-primary tracking-tight">
              Region Guide
            </h3>
            <span className="h-[1px] flex-grow ml-4 sm:ml-6 bg-outline-variant/30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
            {GUIDE_SECTIONS.map(({ key, icon, label }) => {
              const text = content[key as keyof typeof content];
              if (!text || typeof text !== "string") return null;
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
      )}

      {/* Tour & Travel Section */}
      {tours.length > 0 && (
        <section className="px-5 sm:px-6 py-6 sm:py-8">
          <div className="flex items-baseline justify-between mb-5 sm:mb-6">
            <h3 className="font-headline text-lg sm:text-2xl text-primary tracking-tight">
              ツアー・体験
            </h3>
            <span className="h-[1px] flex-grow ml-4 sm:ml-6 bg-outline-variant/30" />
          </div>
          <div className="space-y-3">
            {tours.map((tour, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-5 shadow-sm"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="material-symbols-outlined text-[22px] text-secondary">
                      {TOUR_TYPE_ICONS[tour.type] || "travel_explore"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-headline text-base font-bold text-on-primary leading-snug">
                        {tour.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {tour.location && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-label bg-white/10 text-white/80">
                            <span className="material-symbols-outlined text-[12px]">location_on</span>
                            {tour.location}
                          </span>
                        )}
                        {tour.duration && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-label bg-white/10 text-white/80">
                            <span className="material-symbols-outlined text-[12px]">schedule</span>
                            {tour.duration}
                          </span>
                        )}
                        {tour.priceRange && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-label bg-white/10 text-white/80">
                            <span className="material-symbols-outlined text-[12px]">payments</span>
                            {tour.priceRange}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="font-body text-xs text-white/70 leading-relaxed mb-3">
                    {tour.description}
                  </p>

                  {tour.highlights && tour.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tour.highlights.map((h, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 text-[10px] font-label font-medium bg-secondary/20 text-secondary rounded-full"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    {tour.bestSeason && (
                      <span className="flex items-center gap-1 text-[10px] font-label text-white/50">
                        <span className="material-symbols-outlined text-[13px]">calendar_month</span>
                        {tour.bestSeason}
                      </span>
                    )}
                    {tour.bookingTip && (
                      <span className="flex items-center gap-1 text-[10px] font-label text-secondary/70">
                        <span className="material-symbols-outlined text-[13px]">lightbulb</span>
                        {tour.bookingTip}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Travel Tips */}
      {travelTips && (
        <section className="px-5 sm:px-6 py-3 sm:py-4">
          <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl">flight</span>
              <h4 className="font-headline text-sm font-bold text-on-surface">旅行アドバイス</h4>
            </div>
            <p className="font-body text-xs sm:text-[13px] text-on-surface-variant leading-[1.8]">
              {travelTips}
            </p>
          </div>
        </section>
      )}

      {/* Nearby Attractions */}
      {nearbyAttractions.length > 0 && (
        <section className="px-5 sm:px-6 py-3 sm:py-4">
          <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-lg sm:text-xl">explore</span>
              <h4 className="font-headline text-sm font-bold text-on-surface">周辺の観光スポット</h4>
            </div>
            <div className="space-y-2">
              {nearbyAttractions.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[14px] text-secondary mt-0.5">place</span>
                  <span className="font-body text-xs sm:text-[13px] text-on-surface-variant leading-[1.7]">
                    {typeof a === "string" ? a : `${a.name}${a.description ? ` — ${a.description}` : ""}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sub-regions */}
      {wineRegion.subRegions.length > 0 && (
        <section className="px-5 sm:px-6 py-6 sm:py-8">
          <div className="flex items-baseline justify-between mb-4 sm:mb-5">
            <h3 className="font-headline text-lg sm:text-xl text-primary tracking-tight">
              サブ地域
            </h3>
            <span className="h-[1px] flex-grow ml-4 sm:ml-6 bg-outline-variant/30" />
          </div>
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
            {wineRegion.subRegions.map((sr) => (
              <Link
                key={sr.name}
                href={`/map/region/${countryCode}/${encodeURIComponent(regionName)}/${encodeURIComponent(sr.name)}`}
                className="px-4 py-3 sm:py-2 text-xs bg-surface-container-low/60 border border-outline-variant/20 text-on-surface-variant rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors flex items-center gap-2"
              >
                <span className="font-medium">{sr.nameJa}</span>
                <span className="text-on-surface-variant/40 truncate">{sr.name}</span>
                <span className="material-symbols-outlined text-sm ml-auto text-on-surface-variant/40">chevron_right</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Local Wines Section */}
      <section className="py-10 sm:py-12 mt-4 bg-surface-container-low/40">
        <div className="px-5 sm:px-6 mb-6 sm:mb-8">
          <h3 className="font-headline text-lg sm:text-2xl text-primary tracking-tight">
            Recorded in {regionName}
          </h3>
          <p className="text-on-surface-variant mt-1 sm:mt-2 text-xs sm:text-sm">
            この地域で記録された{wines.length}本のワイン
          </p>
        </div>
        <div className="px-5 sm:px-6">
          <WineListMini
            wines={wines}
            emptyMessage="この地域のワインはまだ記録されていません"
          />
        </div>
      </section>

      {/* Fun fact quote */}
      {content?.funFact && (
        <section className="px-5 sm:px-6 py-10 sm:py-16 flex flex-col items-center text-center">
          <span
            className="material-symbols-outlined text-secondary text-3xl sm:text-4xl mb-4 sm:mb-6"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>
          <p className="font-headline text-base sm:text-xl text-primary max-w-md leading-[1.8] italic">
            {content.funFact}
          </p>
          <div className="mt-6 sm:mt-8 h-[2px] w-12 sm:w-16 bg-secondary" />
        </section>
      )}
    </div>
  );
}

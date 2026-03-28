"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WINE_COUNTRIES, findRegion } from "@/lib/countries";
import { getRegionContent } from "@/lib/region-content";
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
  { key: "tourism", icon: "map", label: "観光" },
  { key: "nature", icon: "eco", label: "自然" },
  { key: "culture", icon: "museum", label: "文化" },
  { key: "regulations", icon: "gavel", label: "規制" },
  { key: "sommNotes", icon: "edit_note", label: "ソムリエノート" },
  { key: "vintageGuide", icon: "calendar_today", label: "ヴィンテージ" },
] as const;

export default function RegionPage({ params }: Props) {
  const { country: countryCode, region: regionEncoded } = use(params);
  const regionName = decodeURIComponent(regionEncoded);
  const router = useRouter();
  const [wines, setWines] = useState<WineLog[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const wineCountry = WINE_COUNTRIES.find((c) => c.code === countryCode);
  const wineRegion = wineCountry
    ? findRegion(wineCountry, regionName)
    : undefined;
  const content = getRegionContent(countryCode, regionName);

  useEffect(() => {
    if (wineCountry) {
      setWines(getWinesByRegion(wineCountry.name, regionName));
    }
  }, [wineCountry, regionName]);

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
            {regionName}
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-b from-primary-container to-primary flex items-end">
        {content?.heroImage && (
          <>
            <img
              alt={regionName}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              src={content.heroImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </>
        )}
        <div className="relative z-10 px-6 pb-12 w-full">
          <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {wineCountry.nameJa}
          </p>
          <h2 className="font-headline font-black text-5xl text-primary leading-tight tracking-tighter">
            {wineRegion.nameJa}
          </h2>
          <p className="font-headline text-2xl font-light italic text-primary/70 mt-1">
            {regionName}, {wineCountry.name}
          </p>
        </div>
      </section>

      {/* Editorial Intro */}
      {content && (
        <section className="px-6 py-12 grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <p className="font-headline text-xl text-on-surface leading-relaxed">
              {content.description}
            </p>
          </div>
          <div className="col-span-4 border-l border-outline-variant/30 pl-6 flex flex-col justify-end">
            {content.keyGrapes.length > 0 && (
              <>
                <div className="text-secondary font-bold text-2xl mb-1">
                  {content.keyGrapes.length}
                </div>
                <div className="text-on-surface-variant text-xs tracking-widest uppercase">
                  Key Grapes
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Key Grapes */}
      {content && content.keyGrapes.length > 0 && (
        <section className="px-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {content.keyGrapes.map((g) => (
              <span
                key={g}
                className="px-4 py-1.5 bg-surface-container-lowest rounded-full text-xs font-medium text-primary shadow-sm"
              >
                {g}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Region Guide Grid */}
      {content && (
        <section className="px-6 py-8">
          <div className="flex items-baseline justify-between mb-8">
            <h3 className="font-headline text-2xl text-primary">
              Region Guide
            </h3>
            <span className="h-[1px] flex-grow mx-6 bg-outline-variant/30" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {GUIDE_SECTIONS.map(({ key, icon, label }) => {
              const text = content[key as keyof typeof content];
              if (!text || typeof text !== "string") return null;
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
      )}

      {/* Sub-regions */}
      {wineRegion.subRegions.length > 0 && (
        <section className="px-6 py-8">
          <h3 className="font-headline text-xl text-primary mb-4">
            サブ地域
          </h3>
          <div className="flex flex-wrap gap-2">
            {wineRegion.subRegions.map((sr) => (
              <span
                key={sr.name}
                className="px-4 py-2 text-xs bg-surface-container-low text-on-surface-variant rounded-xl"
              >
                {sr.nameJa}
                <span className="text-on-surface-variant/40 ml-2">
                  {sr.name}
                </span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Local Wines Section */}
      <section className="py-12 bg-surface-container-low">
        <div className="px-6 mb-8">
          <h3 className="font-headline text-2xl text-primary">
            Recorded in {regionName}
          </h3>
          <p className="text-on-surface-variant mt-2 text-sm">
            この地域で記録された{wines.length}本のワイン
          </p>
        </div>
        <div className="px-6">
          <WineListMini
            wines={wines}
            emptyMessage="この地域のワインはまだ記録されていません"
          />
        </div>
      </section>

      {/* Fun fact quote */}
      {content?.funFact && (
        <section className="px-6 py-16 flex flex-col items-center text-center">
          <span
            className="material-symbols-outlined text-secondary text-4xl mb-6"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            format_quote
          </span>
          <p className="font-headline text-xl text-primary max-w-md leading-relaxed italic">
            {content.funFact}
          </p>
          <div className="mt-8 h-1 w-16 bg-secondary" />
        </section>
      )}
    </div>
  );
}

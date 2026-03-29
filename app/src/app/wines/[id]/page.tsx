"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { WineLog, Winery, WINE_TYPE_LABELS, WINE_TYPE_COLORS, PalateLevel } from "@/lib/types";
import { getWines, getWineries, getWineryByName, addWinery, linkWineToWinery } from "@/lib/store";
import { WINE_COUNTRIES } from "@/lib/countries";
import { getWinePhoto } from "@/lib/photo-store";
import { getDefaultPalate } from "@/lib/wine-defaults";
import RadarChart from "@/components/radar-chart";
import { getAromaVisual, AROMA_IMAGE_COPYRIGHT } from "@/lib/aroma-images";

const WINE_TYPE_GRADIENTS: Record<string, string> = {
  red: "from-[#561922] to-[#722f37]",
  white: "from-[#a89540] to-[#c9b84c]",
  rose: "from-[#9e4a5a] to-[#c46a7e]",
  sparkling: "from-[#8a7a5a] to-[#b5a47a]",
  fortified: "from-[#5a2e10] to-[#8b4513]",
  dessert: "from-[#8a6e10] to-[#b8941a]",
  orange: "from-[#8e5a1a] to-[#c07830]",
};

export default function WineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [wine, setWine] = useState<WineLog | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [wineryLoading, setWineryLoading] = useState(false);
  const [linkedWinery, setLinkedWinery] = useState<Winery | null>(null);

  useEffect(() => {
    const wines = getWines();
    const found = wines.find((w) => w.id === params.id);
    setWine(found || null);
  }, [params.id]);

  // Load stored photo after wine is loaded
  useEffect(() => {
    if (wine) {
      setPhoto(getWinePhoto(wine.id));
      // Check if winery is already linked
      if (wine.wineryId) {
        const winery = getWineries().find((w) => w.id === wine.wineryId);
        if (winery) setLinkedWinery(winery);
      }
    }
  }, [wine]);

  async function handleRegisterWinery() {
    if (!wine?.producer) return;

    // Check if winery already exists locally
    const existing = getWineryByName(wine.producer);
    if (existing) {
      linkWineToWinery(wine.id, existing.id);
      setLinkedWinery(existing);
      setWine({ ...wine, wineryId: existing.id });
      return;
    }

    setWineryLoading(true);
    try {
      const res = await fetch("/api/winery-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producer: wine.producer,
          country: wine.country,
          region: wine.region,
          subRegion: wine.subRegion,
          village: wine.village,
          grapeVarieties: wine.grapeVarieties,
        }),
      });

      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();

      const winery: Winery = {
        id: crypto.randomUUID(),
        name: data.name || wine.producer,
        nameJa: data.nameJa || "",
        country: data.country || wine.country,
        region: data.region || wine.region,
        subRegion: data.subRegion || wine.subRegion,
        village: data.village || wine.village,
        lat: data.lat ?? null,
        lng: data.lng ?? null,
        website: data.website || "",
        description: data.description || "",
        guideData: data.guideData || null,
        wineIds: [wine.id],
        createdAt: new Date().toISOString(),
      };

      addWinery(winery);
      linkWineToWinery(wine.id, winery.id);
      setLinkedWinery(winery);
      setWine({ ...wine, wineryId: winery.id });
    } catch (err) {
      console.error("Failed to register winery:", err);
    } finally {
      setWineryLoading(false);
    }
  }

  if (!wine) {
    return (
      <div className="min-h-screen bg-[#fcf9f3] flex items-center justify-center">
        <p className="font-body text-[#534343]">ワインが見つかりません</p>
      </div>
    );
  }

  const gradient = WINE_TYPE_GRADIENTS[wine.type] || WINE_TYPE_GRADIENTS.red;
  // Radar chart data
  const isRed = wine.type === "red";
  const showTannin = wine.palate.tannin !== null;
  const wineData = [
    { label: "甘さ", value: wine.palate.sweetness },
    { label: "酸味", value: wine.palate.acidity },
    ...(showTannin
      ? [{ label: "タンニン", value: wine.palate.tannin as PalateLevel }]
      : []),
    { label: "ボディ", value: wine.palate.body },
    { label: "余韻", value: wine.palate.finish },
  ];
  let baseData: { label: string; value: PalateLevel }[] | undefined;
  if (wine.grapeVarieties.length > 0) {
    const grapePalate = getDefaultPalate(wine.grapeVarieties, isRed);
    baseData = [
      { label: "甘さ", value: grapePalate.sweetness },
      { label: "酸味", value: grapePalate.acidity },
      ...(showTannin && grapePalate.tannin !== null
        ? [{ label: "タンニン", value: grapePalate.tannin }]
        : []),
      { label: "ボディ", value: grapePalate.body },
      { label: "余韻", value: grapePalate.finish },
    ];
  }

  const tourTypeIcons: Record<string, string> = {
    winery_visit: "castle",
    wine_tour: "directions_bus",
    food_pairing: "restaurant",
    harvest_experience: "agriculture",
    city_tour: "location_city",
    accommodation: "hotel",
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] pb-36">
      {/* ===== Hero Section ===== */}
      {photo ? (
        <div className="relative">
          {/* Wine photo hero image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={wine.name || wine.producer || "Wine photo"}
            className="w-full max-h-[300px] object-cover rounded-b-2xl"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-b-2xl" />

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 text-white/90 hover:bg-white/25 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          {/* Wine type pill */}
          <div className="absolute top-4 right-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-medium tracking-wide"
              style={{
                backgroundColor: WINE_TYPE_COLORS[wine.type] + "33",
                color: "white",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: WINE_TYPE_COLORS[wine.type] }}
              />
              {WINE_TYPE_LABELS[wine.type].ja}
            </span>
          </div>

          {/* Overlaid wine info at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight mb-1 drop-shadow-lg">
              {wine.producer || wine.name}
            </h1>
            {wine.name && wine.name !== wine.producer && (
              <p className="font-body text-white/80 text-lg mb-2 drop-shadow">{wine.name}{wine.vintage ? ` ${wine.vintage}` : ""}</p>
            )}
            {wine.rating > 0 && (
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[22px]"
                    style={{
                      color: i < wine.rating ? "#fed977" : "rgba(255,255,255,0.2)",
                      fontVariationSettings: i < wine.rating
                        ? "'FILL' 1, 'wght' 400"
                        : "'FILL' 0, 'wght' 400",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={`relative bg-gradient-to-br ${gradient} px-5 pt-12 pb-8`}>
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 text-white/90 hover:bg-white/25 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          {/* Wine type pill */}
          <div className="flex justify-end mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-medium tracking-wide"
              style={{
                backgroundColor: WINE_TYPE_COLORS[wine.type] + "33",
                color: "white",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: WINE_TYPE_COLORS[wine.type] }}
              />
              {WINE_TYPE_LABELS[wine.type].ja}
            </span>
          </div>

          {/* Producer (highlight) */}
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight mb-1">
            {wine.producer || wine.name}
          </h1>

          {/* Wine name (sub) */}
          {wine.name && wine.name !== wine.producer && (
            <p className="font-body text-white/70 text-lg mb-2">{wine.name}{wine.vintage ? ` ${wine.vintage}` : ""}</p>
          )}

          {/* Star rating */}
          {wine.rating > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[22px]"
                  style={{
                    color: i < wine.rating ? "#fed977" : "rgba(255,255,255,0.2)",
                    fontVariationSettings: i < wine.rating
                      ? "'FILL' 1, 'wght' 400"
                      : "'FILL' 0, 'wght' 400",
                  }}
                >
                  star
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===== Content ===== */}
      <div className="px-4 -mt-4 space-y-4">
        {/* ===== Info Bento Card ===== */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
          <div className="grid grid-cols-3 gap-4">
            {/* Region */}
            {(wine.region || wine.country) && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">産地</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">
                  {wine.region || wine.country}
                </p>
                {wine.region && wine.country && (
                  <p className="font-body text-[11px] text-[#534343]">{wine.country}</p>
                )}
              </div>
            )}

            {/* Grape */}
            {wine.grapeVarieties.length > 0 && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">品種</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">
                  {wine.grapeVarieties[0]}
                </p>
                {wine.grapeVarieties.length > 1 && (
                  <p className="font-body text-[11px] text-[#534343]">
                    他{wine.grapeVarieties.length - 1}種
                  </p>
                )}
              </div>
            )}

            {/* Vintage */}
            {wine.vintage && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">ヴィンテージ</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{wine.vintage}</p>
              </div>
            )}

            {/* Alcohol */}
            {wine.abv != null && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">アルコール度数</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{wine.abv}%</p>
              </div>
            )}

            {/* Service / Taste type */}
            {wine.tasteType && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">味わいタイプ</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{wine.tasteType}</p>
              </div>
            )}

            {/* Price */}
            {wine.price != null && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">価格</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">¥{wine.price.toLocaleString()}</p>
              </div>
            )}

            {/* Volume */}
            {wine.volume != null && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">容量</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{wine.volume}ml</p>
              </div>
            )}

            {/* Appellation */}
            {wine.appellation && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">格付け</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{wine.appellation}</p>
              </div>
            )}

            {/* Classification */}
            {wine.classification && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">品質分類</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{wine.classification}</p>
              </div>
            )}
          </div>

          {/* Certifications */}
          {wine.certifications && wine.certifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#d8c1c2]/30">
              <div className="flex flex-wrap gap-1.5">
                {wine.certifications.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-label font-medium bg-[#fed977]/30 text-[#755b00] rounded-full"
                  >
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Rakuten Affiliate Link */}
          {wine.rakutenUrl && (
            <div className="mt-4 pt-4 border-t border-[#d8c1c2]/30">
              <a
                href={wine.rakutenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#bf0000] hover:bg-[#a00000] text-white rounded-full text-[11px] font-label font-bold tracking-wider shadow-sm hover:shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                楽天市場で探す
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            </div>
          )}
        </div>

        {/* ===== Tasting Notes Section ===== */}
        {wine.notes && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
            <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-3">
              テイスティングメモ
            </h2>
            <div className="border-l-2 border-[#755b00] pl-4">
              <p className="font-headline text-base italic text-[#1c1c18] leading-relaxed whitespace-pre-wrap">
                {wine.notes}
              </p>
            </div>
          </div>
        )}

        {/* ===== Aroma Tags ===== */}
        {wine.aromas.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
            <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-3">
              香り
            </h2>
            <div className="flex flex-wrap gap-2">
              {wine.aromas.map((a) => {
                const visual = getAromaVisual(a);
                return (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 pl-1 pr-3 py-1.5 text-xs font-label font-medium bg-[#561922]/8 text-[#561922] rounded-full border border-[#d8c1c2]/50"
                  >
                    <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-[#f6f3ed] flex items-center justify-center">
                      {visual.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={visual.imageUrl}
                          alt={a}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            (e.target as HTMLImageElement).parentElement!.textContent = visual.emoji;
                          }}
                        />
                      ) : (
                        <span className="text-xs">{visual.emoji}</span>
                      )}
                    </span>
                    {a}
                  </span>
                );
              })}
            </div>
            <p className="text-[9px] text-[#534343]/40 mt-3 font-label">{AROMA_IMAGE_COPYRIGHT}</p>
          </div>
        )}

        {/* ===== Radar Chart Section ===== */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
          <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-4">
            味わいチャート
          </h2>
          <div className="flex justify-center">
            <RadarChart data={wineData} baseData={baseData} size={220} />
          </div>
          {baseData && (
            <div className="flex items-center justify-center gap-5 mt-3 text-[11px] font-label text-[#534343]/60">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-5 h-[2px] bg-[#d4a574] border-dashed border-t border-[#d4a574]" />
                品種の特徴
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-5 h-[2px] bg-[#722f37]" />
                あなたの評価
              </span>
            </div>
          )}
        </div>

        {/* ===== Region Guide Section ===== */}
        {wine.region && (() => {
          const countryObj = WINE_COUNTRIES.find((c) => c.name === wine.country);
          const regionLink = countryObj
            ? `/map/region/${countryObj.code}/${encodeURIComponent(wine.region)}`
            : null;
          const inner = (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#f6f3ed] to-[#d8c1c2]/30 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[28px] text-[#722f37]/50">map</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline text-base font-bold text-[#1c1c18] truncate">
                  {wine.region}
                </p>
                <p className="font-body text-xs text-[#534343] mt-0.5">
                  {[wine.subRegion, wine.country].filter(Boolean).join(" · ")}
                </p>
                {wine.village && (
                  <p className="font-body text-[11px] text-[#534343]/60 mt-0.5">{wine.village}</p>
                )}
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#534343]/40">chevron_right</span>
            </div>
          );
          return (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
              <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-3">
                産地ガイド
              </h2>
              {regionLink ? (
                <Link href={regionLink} className="block hover:opacity-80 transition-opacity">
                  {inner}
                </Link>
              ) : inner}
            </div>
          );
        })()}

        {/* ===== Winery Section ===== */}
        {wine.producer && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
            <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-3">
              ワイナリー
            </h2>
            {linkedWinery ? (
              <Link
                href={`/wineries/${linkedWinery.id}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#561922] to-[#722f37] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px] text-white/80">castle</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline text-base font-bold text-[#1c1c18] truncate group-hover:text-[#722f37] transition-colors">
                    {linkedWinery.nameJa || linkedWinery.name}
                  </p>
                  <p className="font-body text-xs text-[#534343] mt-0.5">
                    {[linkedWinery.region, linkedWinery.country].filter(Boolean).join(" · ")}
                  </p>
                  {linkedWinery.description && (
                    <p className="font-body text-[11px] text-[#534343]/60 mt-1 line-clamp-2">
                      {linkedWinery.description}
                    </p>
                  )}
                </div>
                <span className="material-symbols-outlined text-[20px] text-[#534343]/40 group-hover:text-[#722f37] transition-colors">chevron_right</span>
              </Link>
            ) : (
              <button
                onClick={handleRegisterWinery}
                disabled={wineryLoading}
                className="w-full flex items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-xl bg-[#561922]/5 border-2 border-dashed border-[#561922]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#561922]/40 transition-colors">
                  {wineryLoading ? (
                    <span className="material-symbols-outlined text-[28px] text-[#722f37]/50 animate-spin">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-[28px] text-[#722f37]/50">add_business</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-headline text-base font-bold text-[#1c1c18] truncate">
                    {wine.producer}
                  </p>
                  <p className="font-body text-xs text-[#722f37] mt-0.5">
                    {wineryLoading ? "ワイナリー情報を検索中..." : "タップしてワイナリー情報を登録"}
                  </p>
                </div>
              </button>
            )}
          </div>
        )}

        {/* ===== Winery Tours Section ===== */}
        {wine.tours && wine.tours.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 px-1">
              ワイナリーツアー
            </h2>
            {wine.tours.map((tour, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#561922] to-[#722f37] p-5 shadow-sm"
              >
                {/* Decorative overlay circles */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="material-symbols-outlined text-[22px] text-[#fed977]">
                      {tourTypeIcons[tour.type] || "travel_explore"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline text-base font-bold text-white leading-snug">
                        {tour.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-label bg-white/10 text-white/80">
                          <span className="material-symbols-outlined text-[12px]">location_on</span>
                          {tour.location}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-label bg-white/10 text-white/80">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {tour.duration}
                        </span>
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
                          className="px-2 py-0.5 text-[10px] font-label font-medium bg-[#fed977]/20 text-[#fed977] rounded-full"
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
                      <span className="flex items-center gap-1 text-[10px] font-label text-[#fed977]/70">
                        <span className="material-symbols-outlined text-[13px]">lightbulb</span>
                        {tour.bookingTip}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== Date Recorded ===== */}
        <div className="text-center py-4">
          <p className="font-label text-[11px] text-[#534343]/40 tracking-wide">
            {new Date(wine.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            に記録
          </p>
        </div>
      </div>

      {/* ===== Edit FAB ===== */}
      <Link
        href={`/wines/${wine.id}/edit`}
        className="fixed bottom-28 right-8 w-14 h-14 flex items-center justify-center rounded-full bg-[#561922] text-white shadow-lg shadow-[#561922]/30 hover:bg-[#722f37] transition-colors z-50"
      >
        <span className="material-symbols-outlined text-[24px]">edit</span>
      </Link>
    </div>
  );
}

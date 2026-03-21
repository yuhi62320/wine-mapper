"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Globe, ExternalLink, Wine, Award, Tag, Pencil, ShoppingCart } from "lucide-react";
import { WineLog, WINE_TYPE_LABELS, WINE_TYPE_COLORS, PalateLevel } from "@/lib/types";
import { getWines } from "@/lib/store";
import { getDefaultPalate } from "@/lib/wine-defaults";
import RadarChart from "@/components/radar-chart";

const PALATE_NAMES: Record<string, string> = {
  sweetness: "甘さ",
  acidity: "酸味",
  tannin: "タンニン",
  body: "ボディ",
  finish: "余韻",
};

export default function WineDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [wine, setWine] = useState<WineLog | null>(null);

  useEffect(() => {
    const wines = getWines();
    const found = wines.find((w) => w.id === params.id);
    setWine(found || null);
  }, [params.id]);

  if (!wine) {
    return (
      <div className="px-4 pt-6 text-center text-gray-500">
        ワインが見つかりません
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          戻る
        </button>
        <Link
          href={`/wines/${wine.id}/edit`}
          className="flex items-center gap-1 text-sm text-[#722f37] hover:text-[#5a252c] transition-colors"
        >
          <Pencil size={16} />
          編集
        </Link>
      </div>

      {/* Wine Header */}
      <div className="flex items-start gap-3 mb-6">
        <div
          className="w-4 h-16 rounded-full flex-shrink-0"
          style={{ backgroundColor: WINE_TYPE_COLORS[wine.type] }}
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {wine.producer || wine.name}
          </h1>
          {wine.name && wine.producer && wine.name !== wine.producer && (
            <p className="text-sm text-gray-600">{wine.name}</p>
          )}
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <span className="px-2 py-0.5 rounded bg-gray-100 text-xs">
              {WINE_TYPE_LABELS[wine.type].ja}
            </span>
            {wine.vintage && <span>{wine.vintage}年</span>}
          </div>
          {wine.rating > 0 && (
            <div className="flex items-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < wine.rating
                      ? "fill-[#c9a84c] text-[#c9a84c]"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="space-y-4">
        {/* Origin & Producer */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-800 mb-2 flex items-center gap-1.5">
            <MapPin size={16} className="text-[#722f37]" />
            産地・生産者
          </h2>
          <div className="space-y-1.5 text-sm">
            {wine.producer && (
              <div className="flex justify-between">
                <span className="text-gray-500">生産者</span>
                <span className="text-gray-800">{wine.producer}</span>
              </div>
            )}
            {wine.country && (
              <div className="flex justify-between">
                <span className="text-gray-500">国</span>
                <span className="text-gray-800">{wine.country}</span>
              </div>
            )}
            {wine.region && (
              <div className="flex justify-between">
                <span className="text-gray-500">地域</span>
                <span className="text-gray-800">{wine.region}</span>
              </div>
            )}
            {wine.subRegion && (
              <div className="flex justify-between">
                <span className="text-gray-500">サブ地域</span>
                <span className="text-gray-800">{wine.subRegion}</span>
              </div>
            )}
            {wine.village && (
              <div className="flex justify-between">
                <span className="text-gray-500">村名</span>
                <span className="text-gray-800">{wine.village}</span>
              </div>
            )}
            {wine.appellation && (
              <div className="flex justify-between">
                <span className="text-gray-500">格付け</span>
                <span className="text-gray-800">{wine.appellation}</span>
              </div>
            )}
            {wine.classification && (
              <div className="flex justify-between">
                <span className="text-gray-500">品質分類</span>
                <span className="text-gray-800">{wine.classification}</span>
              </div>
            )}
            {wine.producerUrl && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500">HP</span>
                <a
                  href={wine.producerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#722f37] flex items-center gap-1 text-xs"
                >
                  <Globe size={12} />
                  公式サイト
                  <ExternalLink size={10} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Wine Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-800 mb-2 flex items-center gap-1.5">
            <Wine size={16} className="text-[#722f37]" />
            ワイン詳細
          </h2>
          <div className="space-y-1.5 text-sm">
            {wine.grapeVarieties.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">品種</span>
                <span className="text-gray-800 text-right max-w-[60%]">
                  {wine.grapeVarieties.join(", ")}
                </span>
              </div>
            )}
            {wine.abv != null && (
              <div className="flex justify-between">
                <span className="text-gray-500">ABV</span>
                <span className="text-gray-800">{wine.abv}%</span>
              </div>
            )}
            {wine.volume != null && (
              <div className="flex justify-between">
                <span className="text-gray-500">容量</span>
                <span className="text-gray-800">{wine.volume}ml</span>
              </div>
            )}
            {wine.aging && (
              <div className="flex justify-between">
                <span className="text-gray-500">熟成</span>
                <span className="text-gray-800">{wine.aging}</span>
              </div>
            )}
            {wine.tasteType && (
              <div className="flex justify-between">
                <span className="text-gray-500">味わいタイプ</span>
                <span className="text-gray-800">{wine.tasteType}</span>
              </div>
            )}
            {wine.bottler && (
              <div className="flex justify-between">
                <span className="text-gray-500">瓶詰め元</span>
                <span className="text-gray-800 text-right max-w-[60%]">
                  {wine.bottler}
                </span>
              </div>
            )}
            {wine.price != null && (
              <div className="flex justify-between">
                <span className="text-gray-500">価格</span>
                <span className="text-gray-800">¥{wine.price.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Certifications */}
        {wine.certifications && wine.certifications.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-medium text-gray-800 mb-2 flex items-center gap-1.5">
              <Award size={16} className="text-[#722f37]" />
              認証・受賞
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {wine.certifications.map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-1 text-xs bg-amber-50 text-amber-700 rounded-full border border-amber-200"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Aromas */}
        {wine.aromas.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-medium text-gray-800 mb-2">香り</h2>
            <div className="flex flex-wrap gap-1.5">
              {wine.aromas.map((a) => (
                <span
                  key={a}
                  className="px-2.5 py-1 text-xs bg-[#722f37]/10 text-[#722f37] rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Palate - Radar Chart with grape base overlay */}
        {(() => {
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

          // Compute grape base overlay if grapes are available
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

          return (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h2 className="font-medium text-gray-800 mb-3">味わい</h2>
              <div className="flex justify-center">
                <RadarChart data={wineData} baseData={baseData} size={200} />
              </div>
              {baseData && (
                <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-4 h-0.5 bg-[#d4a574] border-dashed border-t border-[#d4a574]" />
                    品種の特徴
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-4 h-0.5 bg-[#722f37]" />
                    あなたの評価
                  </span>
                </div>
              )}
            </div>
          );
        })()}

        {/* Notes */}
        {wine.notes && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-medium text-gray-800 mb-2">ノート</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {wine.notes}
            </p>
          </div>
        )}

        {/* Purchase Links */}
        {(() => {
          const query = encodeURIComponent(
            [wine.producer, wine.name, wine.vintage].filter(Boolean).join(" ")
          );
          const shops = [
            { name: "Enoteca", url: `https://www.enoteca.co.jp/search?keyword=${query}` },
            { name: "Rakuten", url: `https://search.rakuten.co.jp/search/mall/${query}/?l-id=s_search&l2-id=shop_header_search` },
            { name: "Amazon.co.jp", url: `https://www.amazon.co.jp/s?k=${query}` },
            { name: "Vivino", url: `https://www.vivino.com/search/wines?q=${query}` },
          ];
          return (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h2 className="font-medium text-gray-800 mb-2 flex items-center gap-1.5">
                <ShoppingCart size={16} className="text-[#722f37]" />
                購入する
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {shops.map((shop) => (
                  <a
                    key={shop.name}
                    href={shop.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#722f37] bg-[#722f37]/5 rounded-lg hover:bg-[#722f37]/10 transition-colors"
                  >
                    {shop.name}
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Date */}
        <div className="text-center text-xs text-gray-400 mt-4">
          {new Date(wine.date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          に記録
        </div>
      </div>
    </div>
  );
}

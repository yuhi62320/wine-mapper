"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Star, Globe, ExternalLink } from "lucide-react";
import { WineLog, WINE_TYPE_LABELS, WINE_TYPE_COLORS } from "@/lib/types";
import { getWines } from "@/lib/store";

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
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 mb-4 hover:text-gray-700"
      >
        <ArrowLeft size={16} />
        戻る
      </button>

      {/* Wine Header */}
      <div className="flex items-start gap-3 mb-6">
        <div
          className="w-4 h-16 rounded-full flex-shrink-0"
          style={{ backgroundColor: WINE_TYPE_COLORS[wine.type] }}
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">{wine.name}</h1>
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
        {/* Origin */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-800 mb-2 flex items-center gap-1.5">
            <MapPin size={16} className="text-[#722f37]" />
            産地・生産者
          </h2>
          <div className="space-y-1.5 text-sm">
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
            {wine.producer && (
              <div className="flex justify-between">
                <span className="text-gray-500">生産者</span>
                <span className="text-gray-800">{wine.producer}</span>
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
            {wine.grapeVarieties.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">品種</span>
                <span className="text-gray-800">
                  {wine.grapeVarieties.join(", ")}
                </span>
              </div>
            )}
            {wine.abv && (
              <div className="flex justify-between">
                <span className="text-gray-500">ABV</span>
                <span className="text-gray-800">{wine.abv}%</span>
              </div>
            )}
            {wine.price && (
              <div className="flex justify-between">
                <span className="text-gray-500">価格</span>
                <span className="text-gray-800">¥{wine.price.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

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

        {/* Palate */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-800 mb-3">味わい</h2>
          <div className="space-y-2.5">
            {Object.entries(wine.palate).map(([key, val]) => {
              if (val === null) return null;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">
                      {PALATE_NAMES[key] || key}
                    </span>
                    <span className="text-gray-700">{val}/5</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-[#722f37] h-1.5 rounded-full"
                      style={{ width: `${((val as number) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        {wine.notes && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-medium text-gray-800 mb-2">ノート</h2>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {wine.notes}
            </p>
          </div>
        )}

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

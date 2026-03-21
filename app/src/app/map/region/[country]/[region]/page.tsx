"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Grape, Mountain, MapPin, Landmark, Leaf, Sun, Lightbulb } from "lucide-react";
import { WINE_COUNTRIES, findRegion } from "@/lib/countries";
import { getRegionContent } from "@/lib/region-content";
import { getWinesByRegion } from "@/lib/store";
import { WineLog } from "@/lib/types";
import WineListMini from "@/components/wine-list-mini";

interface Props {
  params: Promise<{ country: string; region: string }>;
}

export default function RegionPage({ params }: Props) {
  const { country: countryCode, region: regionEncoded } = use(params);
  const regionName = decodeURIComponent(regionEncoded);
  const router = useRouter();
  const [wines, setWines] = useState<WineLog[]>([]);

  const wineCountry = WINE_COUNTRIES.find((c) => c.code === countryCode);
  const wineRegion = wineCountry ? findRegion(wineCountry, regionName) : undefined;
  const content = getRegionContent(countryCode, regionName);

  useEffect(() => {
    if (wineCountry) {
      setWines(getWinesByRegion(wineCountry.name, regionName));
    }
  }, [wineCountry, regionName]);

  if (!wineCountry || !wineRegion) {
    return (
      <div className="px-4 pt-6 text-center">
        <p className="text-gray-500">地域が見つかりません</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-[#722f37]"
        >
          戻る
        </button>
      </div>
    );
  }

  const sections = content
    ? [
        { icon: Mountain, label: "テロワール", text: content.terroir },
        { icon: Grape, label: "ワインスタイル", text: content.wineStyles },
        { icon: Landmark, label: "観光", text: content.tourism },
        { icon: Leaf, label: "自然", text: content.nature },
        { icon: MapPin, label: "文化", text: content.culture },
        { icon: Sun, label: "ベストシーズン", text: content.bestSeason },
        { icon: Lightbulb, label: "豆知識", text: content.funFact },
      ]
    : [];

  return (
    <div className="px-4 pt-4 pb-24">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 mb-3 hover:text-gray-700"
      >
        <ArrowLeft size={16} />
        マップに戻る
      </button>

      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900">
          {wineRegion.nameJa}
        </h1>
        <p className="text-sm text-gray-400">
          {regionName} · {wineCountry.nameJa}
        </p>
      </div>

      {/* Description */}
      {content ? (
        <>
          <div className="bg-[#722f37]/5 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Key Grapes */}
          {content.keyGrapes.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-medium text-gray-500 mb-2">
                主要品種
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {content.keyGrapes.map((g) => (
                  <span
                    key={g}
                    className="px-2.5 py-1 text-xs bg-[#722f37]/10 text-[#722f37] rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-3 mb-6">
            {sections.map(({ icon: Icon, label, text }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-[#722f37]" />
                  <h3 className="text-sm font-medium text-gray-800">{label}</h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center mb-6">
          <p className="text-sm text-gray-400">
            この地域の詳細情報は準備中です
          </p>
        </div>
      )}

      {/* Sub-regions */}
      {wineRegion.subRegions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            サブ地域
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {wineRegion.subRegions.map((sr) => (
              <span
                key={sr.name}
                className="px-2.5 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg"
              >
                {sr.nameJa}
                <span className="text-gray-400 ml-1">{sr.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Wines from this region */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          この地域のワイン ({wines.length}本)
        </h3>
        <WineListMini
          wines={wines}
          emptyMessage="この地域のワインはまだ記録されていません"
        />
      </div>
    </div>
  );
}

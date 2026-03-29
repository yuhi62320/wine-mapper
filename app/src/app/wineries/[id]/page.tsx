"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Winery, WineLog } from "@/lib/types";
import { getWineries, getWines } from "@/lib/store";

const WineryMiniMap = dynamic(() => import("@/components/winery-mini-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[200px] rounded-2xl bg-[#f6f3ed] flex items-center justify-center">
      <span className="text-[#534343]/40 text-xs">マップを読み込み中...</span>
    </div>
  ),
});

const GUIDE_SECTIONS = [
  { key: "history", icon: "history_edu", label: "歴史" },
  { key: "philosophy", icon: "spa", label: "醸造哲学" },
  { key: "signatureWines", icon: "wine_bar", label: "代表ワイン" },
  { key: "terroir", icon: "terrain", label: "テロワール" },
  { key: "visitInfo", icon: "map", label: "訪問情報" },
  { key: "funFact", icon: "lightbulb", label: "豆知識" },
] as const;

export default function WineryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [winery, setWinery] = useState<Winery | null>(null);
  const [wines, setWines] = useState<WineLog[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const found = getWineries().find((w) => w.id === params.id);
    setWinery(found || null);

    if (found) {
      const allWines = getWines();
      setWines(allWines.filter((w) => found.wineIds.includes(w.id)));
    }
  }, [params.id]);

  if (!winery) {
    return (
      <div className="min-h-screen bg-[#fcf9f3] flex items-center justify-center">
        <p className="font-body text-[#534343]">ワイナリーが見つかりません</p>
      </div>
    );
  }

  const guide = winery.guideData as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-[#fcf9f3] pb-36">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#561922] to-[#722f37] px-5 pt-12 pb-10">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 text-white/90 hover:bg-white/25 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#fed977] text-[20px]">castle</span>
          <span className="text-[#fed977] font-label text-xs tracking-widest uppercase">Winery</span>
        </div>

        <h1 className="font-headline text-4xl text-white leading-tight tracking-tight mb-2">
          {winery.nameJa || winery.name}
        </h1>
        {winery.nameJa && winery.name !== winery.nameJa && (
          <p className="font-body text-white/70 text-sm">{winery.name}</p>
        )}
        <p className="font-body text-white/60 text-xs mt-2">
          {[winery.village, winery.subRegion, winery.region, winery.country]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Description */}
        {winery.description && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
            <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-3">
              概要
            </h2>
            <p className="font-body text-sm text-[#1c1c18] leading-relaxed">
              {winery.description}
            </p>
          </div>
        )}

        {/* Info card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
          <div className="grid grid-cols-2 gap-4">
            {winery.region && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">産地</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{winery.region}</p>
                {winery.subRegion && (
                  <p className="font-body text-[11px] text-[#534343]">{winery.subRegion}</p>
                )}
              </div>
            )}
            {winery.country && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">国</p>
                <p className="font-body text-sm font-bold text-[#1c1c18]">{winery.country}</p>
              </div>
            )}
            {winery.website && (
              <div>
                <p className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-1">公式サイト</p>
                <a
                  href={winery.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-body text-sm font-bold text-[#561922] hover:text-[#722f37] transition-colors"
                >
                  訪問
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mini map */}
        {winery.lat != null && winery.lng != null && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d8c1c2]/40">
            <WineryMiniMap lat={winery.lat} lng={winery.lng} name={winery.nameJa || winery.name} />
          </div>
        )}

        {/* Guide sections */}
        {guide && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
            <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-4">
              ワイナリーガイド
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {GUIDE_SECTIONS.map(({ key, icon, label }) => {
                const text = guide[key];
                if (!text) return null;
                const isExpanded = expandedSection === key;

                return (
                  <div
                    key={key}
                    className={`${
                      isExpanded ? "col-span-2" : ""
                    } bg-[#f6f3ed] p-4 flex flex-col group cursor-pointer transition-all duration-300 hover:bg-[#f0ece4] rounded-xl`}
                    onClick={() => setExpandedSection(isExpanded ? null : key)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#722f37] text-xl">{icon}</span>
                      <h4 className="font-label text-sm font-medium group-hover:text-[#722f37] transition-colors">
                        {label}
                      </h4>
                    </div>
                    {isExpanded && (
                      <p className="mt-3 text-xs text-[#534343] leading-relaxed">
                        {text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Linked wines */}
        {wines.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40">
            <h2 className="font-label text-[10px] tracking-widest text-[#534343]/60 mb-3">
              記録されたワイン ({wines.length}本)
            </h2>
            <div className="space-y-3">
              {wines.map((w) => (
                <Link
                  key={w.id}
                  href={`/wines/${w.id}`}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${w.type === "red" ? "#722f37" : w.type === "white" ? "#c9b84c" : "#c46a7e"}20` }}
                  >
                    <span className="material-symbols-outlined text-[18px]" style={{ color: w.type === "red" ? "#722f37" : w.type === "white" ? "#c9b84c" : "#c46a7e" }}>
                      wine_bar
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-[#1c1c18] truncate group-hover:text-[#722f37] transition-colors">
                      {w.name || w.producer}
                    </p>
                    <p className="font-body text-[11px] text-[#534343]/60">
                      {[w.vintage, w.region].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  {w.rating > 0 && (
                    <div className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px] text-[#fed977]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label text-xs text-[#534343]">{w.rating}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

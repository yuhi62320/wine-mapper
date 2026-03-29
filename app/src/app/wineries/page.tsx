"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Winery } from "@/lib/types";
import { getWineries } from "@/lib/store";

export default function WineriesPage() {
  const [wineries, setWineries] = useState<Winery[]>([]);

  useEffect(() => {
    setWineries(getWineries());
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf9f3] pb-36">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 h-16 bg-[#fcf9f3]/90 backdrop-blur-xl border-b border-[#d8c1c2]/20">
        <h1 className="font-headline font-bold text-xl tracking-tight text-[#561922]">
          Wineries
        </h1>
        <span className="font-label text-xs text-[#534343]/60">
          {wineries.length}件登録済み
        </span>
      </header>

      {wineries.length === 0 ? (
        <div className="px-6 pt-24 text-center">
          <span className="material-symbols-outlined text-6xl text-[#722f37]/15 block mb-4">castle</span>
          <p className="font-headline text-lg text-[#534343]/60 italic mb-2">
            ワイナリーはまだ登録されていません
          </p>
          <p className="font-body text-xs text-[#534343]/40">
            ワインの詳細ページからワイナリーを登録できます
          </p>
        </div>
      ) : (
        <div className="px-4 py-4 space-y-3">
          {wineries.map((winery) => (
            <Link
              key={winery.id}
              href={`/wineries/${winery.id}`}
              className="block bg-white rounded-2xl p-5 shadow-sm border border-[#d8c1c2]/40 group hover:border-[#722f37]/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#561922] to-[#722f37] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px] text-white/80">castle</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline text-base font-bold text-[#1c1c18] truncate group-hover:text-[#722f37] transition-colors">
                    {winery.nameJa || winery.name}
                  </p>
                  {winery.nameJa && winery.name !== winery.nameJa && (
                    <p className="font-body text-[11px] text-[#534343]/60 truncate">{winery.name}</p>
                  )}
                  <p className="font-body text-xs text-[#534343] mt-0.5">
                    {[winery.region, winery.country].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-label bg-[#561922]/5 text-[#561922]">
                    <span className="material-symbols-outlined text-[12px]">wine_bar</span>
                    {winery.wineIds.length}本
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#534343]/30 group-hover:text-[#722f37] transition-colors">chevron_right</span>
                </div>
              </div>
              {winery.description && (
                <p className="font-body text-[11px] text-[#534343]/60 mt-3 line-clamp-2 leading-relaxed">
                  {winery.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

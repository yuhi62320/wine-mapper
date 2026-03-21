"use client";

import Link from "next/link";
import { WineLog, WINE_TYPE_COLORS, WINE_TYPE_LABELS } from "@/lib/types";
import { Star } from "lucide-react";

interface WineListMiniProps {
  wines: WineLog[];
  maxItems?: number;
  emptyMessage?: string;
}

export default function WineListMini({
  wines,
  maxItems = 5,
  emptyMessage = "ワインがまだ記録されていません",
}: WineListMiniProps) {
  if (wines.length === 0) {
    return <p className="text-xs text-gray-400 py-2">{emptyMessage}</p>;
  }

  const shown = wines.slice(0, maxItems);

  return (
    <div className="space-y-2">
      {shown.map((w) => (
        <Link
          key={w.id}
          href={`/wines/${w.id}`}
          className="flex items-center gap-2.5 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: WINE_TYPE_COLORS[w.type] }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-gray-900 truncate">
              {w.name}
            </div>
            <div className="text-[10px] text-gray-400">
              {w.vintage && `${w.vintage} · `}
              {WINE_TYPE_LABELS[w.type].ja}
              {w.region && ` · ${w.region}`}
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-[10px] text-gray-500">{w.rating}</span>
          </div>
        </Link>
      ))}
      {wines.length > maxItems && (
        <p className="text-[10px] text-gray-400 text-center">
          +{wines.length - maxItems}本
        </p>
      )}
    </div>
  );
}

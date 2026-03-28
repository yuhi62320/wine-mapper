"use client";

import Link from "next/link";
import { WineLog, WINE_TYPE_COLORS, WINE_TYPE_LABELS } from "@/lib/types";

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
    return (
      <p className="text-xs text-on-surface-variant/50 py-4 text-center italic font-headline">
        {emptyMessage}
      </p>
    );
  }

  const shown = wines.slice(0, maxItems);

  return (
    <div className="space-y-3">
      {shown.map((w) => (
        <Link
          key={w.id}
          href={`/wines/${w.id}`}
          className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group"
        >
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: WINE_TYPE_COLORS[w.type] }}
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-headline font-bold text-primary truncate">
              {w.name}
            </div>
            <div className="text-[10px] text-on-surface-variant mt-0.5">
              {w.vintage && `${w.vintage} · `}
              {WINE_TYPE_LABELS[w.type].ja}
              {w.region && ` · ${w.region}`}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span
              className="material-symbols-outlined text-secondary text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-xs text-on-surface-variant font-medium">
              {w.rating}
            </span>
          </div>
        </Link>
      ))}
      {wines.length > maxItems && (
        <p className="text-[10px] text-on-surface-variant/40 text-center uppercase tracking-widest">
          +{wines.length - maxItems} more
        </p>
      )}
    </div>
  );
}

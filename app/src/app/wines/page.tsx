"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WineLog, WINE_TYPE_LABELS, WINE_TYPE_COLORS } from "@/lib/types";
import { getWines } from "@/lib/store";
import { getWinePhoto } from "@/lib/photo-store";

export default function WineListPage() {
  const [wines, setWines] = useState<WineLog[]>([]);
  const [photos, setPhotos] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const allWines = getWines();
    // Sort by createdAt descending (newest first)
    allWines.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setWines(allWines);

    // Load photos for all wines
    const photoMap: Record<string, string | null> = {};
    for (const wine of allWines) {
      photoMap[wine.id] = getWinePhoto(wine.id);
    }
    setPhotos(photoMap);
  }, []);

  return (
    <div className="px-6 pt-8 pb-12 space-y-8">
      {/* Header with back button */}
      <header className="flex items-center gap-4">
        <Link
          href="/"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-lowest transition-colors"
        >
          <span className="material-symbols-outlined text-primary">
            arrow_back
          </span>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-headline font-bold text-primary">
            ワインコレクション
          </h1>
          <p className="text-xs font-label text-on-surface-variant">
            全 {wines.length} 本のワイン
          </p>
        </div>
        <Link
          href="/wines/new"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-on-primary">add</span>
        </Link>
      </header>

      {/* Empty state */}
      {wines.length === 0 ? (
        <div className="bg-surface-container-low p-12 rounded-xl text-center">
          <span className="material-symbols-outlined text-primary/20 text-6xl mb-4 block">
            wine_bar
          </span>
          <p className="text-on-surface-variant mb-6 font-headline italic">
            まだワインが記録されていません
          </p>
          <Link
            href="/wines/new"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label text-sm font-bold tracking-widest hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            最初のワインを記録
          </Link>
        </div>
      ) : (
        /* Wine card grid */
        <div className="grid grid-cols-1 gap-4">
          {wines.map((wine) => {
            const photo = photos[wine.id];
            return (
              <Link
                key={wine.id}
                href={`/wines/${wine.id}`}
                className="group flex gap-4 bg-surface-container-low rounded-xl p-4 border border-secondary/10 hover:bg-surface-container-lowest transition-colors"
              >
                {/* Photo thumbnail or wine glass icon */}
                <div
                  className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundColor: photo
                      ? undefined
                      : WINE_TYPE_COLORS[wine.type] + "20",
                    border: photo
                      ? undefined
                      : `1px solid ${WINE_TYPE_COLORS[wine.type]}40`,
                  }}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={wine.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className="material-symbols-outlined text-3xl"
                      style={{ color: WINE_TYPE_COLORS[wine.type] }}
                    >
                      wine_bar
                    </span>
                  )}
                </div>

                {/* Wine info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  {/* Producer */}
                  {wine.producer && (
                    <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider truncate">
                      {wine.producer}
                    </p>
                  )}

                  {/* Name and vintage */}
                  <h3 className="text-base font-headline font-bold text-primary leading-tight truncate">
                    {wine.name}
                    {wine.vintage && (
                      <span className="text-sm ml-1">{wine.vintage}</span>
                    )}
                  </h3>

                  {/* Country / Region */}
                  {wine.country && (
                    <p className="text-xs font-body text-on-surface-variant flex items-center gap-1 italic">
                      <span className="material-symbols-outlined text-xs">
                        location_on
                      </span>
                      {wine.region && `${wine.region}, `}
                      {wine.country}
                    </p>
                  )}

                  {/* Type badge and rating */}
                  <div className="flex items-center gap-3">
                    {/* Type badge */}
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: WINE_TYPE_COLORS[wine.type],
                        }}
                      />
                      <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
                        {WINE_TYPE_LABELS[wine.type].en}
                      </span>
                    </span>

                    {/* Rating stars */}
                    {wine.rating > 0 && (
                      <span className="flex gap-0.5 text-secondary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-xs"
                            style={
                              i < wine.rating
                                ? { fontVariationSettings: "'FILL' 1" }
                                : { opacity: 0.2 }
                            }
                          >
                            star
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-primary/30 group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

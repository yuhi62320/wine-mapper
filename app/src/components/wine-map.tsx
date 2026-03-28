"use client";

import dynamic from "next/dynamic";
import { WineCountry } from "@/lib/countries";
import { WineLog } from "@/lib/types";

export interface CountryStats {
  country: WineCountry;
  count: number;
  regions: Set<string>;
  explored: boolean;
}

const WineMapInner = dynamic(() => import("./wine-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center">
      <div className="text-gray-400 text-sm">マップを読み込み中...</div>
    </div>
  ),
});

interface WineMapProps {
  stats: Map<string, CountryStats>;
  wines: WineLog[];
  onSelectCountry: (stats: CountryStats | null) => void;
}

export default function WineMap({ stats, wines, onSelectCountry }: WineMapProps) {
  return <WineMapInner stats={stats} wines={wines} onSelectCountry={onSelectCountry} />;
}

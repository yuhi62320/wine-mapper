"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { WineCountry } from "@/lib/countries";
import { WineLog } from "@/lib/types";

interface CountryStats {
  country: WineCountry;
  count: number;
  regions: Set<string>;
  explored: boolean;
}

interface WineMapInnerProps {
  stats: Map<string, CountryStats>;
  wines: WineLog[];
  onSelectCountry: (stats: CountryStats | null) => void;
}

function getRadius(count: number): number {
  if (count === 0) return 5;
  if (count <= 2) return 8;
  if (count <= 5) return 11;
  if (count <= 10) return 14;
  return 18;
}

function getOpacity(count: number): number {
  if (count === 0) return 0.15;
  if (count <= 2) return 0.5;
  if (count <= 5) return 0.65;
  if (count <= 10) return 0.8;
  return 0.9;
}

function FitBounds({ stats }: { stats: Map<string, CountryStats> }) {
  const map = useMap();

  useEffect(() => {
    const explored = Array.from(stats.values()).filter((s) => s.explored);
    if (explored.length > 0) {
      const bounds = explored.map(
        (s) => [s.country.lat, s.country.lng] as [number, number]
      );
      // Add some padding
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default function WineMapInner({
  stats,
  wines,
  onSelectCountry,
}: WineMapInnerProps) {
  const entries = Array.from(stats.values());

  return (
    <MapContainer
      center={[30, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={8}
      style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <FitBounds stats={stats} />

      {entries.map((s) => (
        <CircleMarker
          key={s.country.code}
          center={[s.country.lat, s.country.lng]}
          radius={getRadius(s.count)}
          pathOptions={{
            fillColor: s.explored ? "#722f37" : "#9ca3af",
            color: s.explored ? "#722f37" : "#d1d5db",
            weight: s.explored ? 2 : 1,
            fillOpacity: getOpacity(s.count),
            opacity: s.explored ? 0.8 : 0.3,
          }}
          eventHandlers={{
            click: () => {
              if (s.explored) {
                onSelectCountry(s);
              }
            },
          }}
        >
          <Popup>
            <div className="text-center min-w-[100px]">
              <div className="font-bold text-sm">{s.country.nameJa}</div>
              <div className="text-xs text-gray-500">{s.country.name}</div>
              {s.explored ? (
                <>
                  <div className="text-[#722f37] font-medium mt-1">
                    {s.count}本記録
                  </div>
                  <div className="text-xs text-gray-400">
                    {s.regions.size}地域を探索
                  </div>
                </>
              ) : (
                <div className="text-gray-400 text-xs mt-1">未探索</div>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

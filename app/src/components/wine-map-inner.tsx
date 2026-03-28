"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
} from "react-leaflet";
import type { Layer, PathOptions } from "leaflet";
import type { Feature, GeoJsonObject } from "geojson";
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

// Map ISO country names to 2-letter codes used in our data
const NAME_TO_CODE: Record<string, string> = {
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Portugal: "PT",
  Germany: "DE",
  Austria: "AT",
  Switzerland: "CH",
  "United States of America": "US",
  "United States": "US",
  Argentina: "AR",
  Chile: "CL",
  Australia: "AU",
  "New Zealand": "NZ",
  "South Africa": "ZA",
  Japan: "JP",
  Georgia: "GE",
  Greece: "GR",
  Hungary: "HU",
  Lebanon: "LB",
  Croatia: "HR",
  Romania: "RO",
  Slovenia: "SI",
  Israel: "IL",
  Canada: "CA",
  Brazil: "BR",
  Uruguay: "UY",
  "United Kingdom": "GB",
  China: "CN",
  India: "IN",
  Mexico: "MX",
  Morocco: "MA",
  Turkey: "TR",
  Moldova: "MD",
  Bulgaria: "BG",
  Serbia: "RS",
  "Czech Republic": "CZ",
  Czechia: "CZ",
};

// Wine color gradient (light to dark)
function getCountryColor(count: number): string {
  if (count === 0) return "#f3f4f6"; // gray-100
  if (count === 1) return "#fde8e8";
  if (count <= 3) return "#f5b7b1";
  if (count <= 5) return "#e57373";
  if (count <= 10) return "#c62828";
  if (count <= 20) return "#8b1a1a";
  return "#4a0e0e";
}

function getCountryOpacity(count: number): number {
  if (count === 0) return 0.3;
  return 0.7;
}

// GeoJSON URL - natural earth low-res countries
const GEOJSON_URL =
  "https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson";

function FitBounds({ stats }: { stats: Map<string, CountryStats> }) {
  const map = useMap();

  useEffect(() => {
    const explored = Array.from(stats.values()).filter((s) => s.explored);
    if (explored.length > 0) {
      const bounds = explored.map(
        (s) => [s.country.lat, s.country.lng] as [number, number]
      );
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
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);

  useEffect(() => {
    fetch(GEOJSON_URL)
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Failed to load GeoJSON:", err));
  }, []);

  // Build code-to-stats lookup
  const codeToStats = new Map<string, CountryStats>();
  for (const [, s] of stats) {
    codeToStats.set(s.country.code, s);
  }

  function getCountryCode(feature: Feature): string | null {
    const props = feature.properties || {};
    // Try various property names used in GeoJSON datasets
    const name =
      props.ADMIN || props.name || props.NAME || props.sovereignt || "";
    const iso2 = props.ISO_A2 || props.iso_a2 || "";
    const iso3 = props.ISO_A3 || props.iso_a3 || "";

    // Direct ISO-2 match
    if (iso2 && iso2 !== "-99") {
      const s = codeToStats.get(iso2);
      if (s) return iso2;
      // Check all stats
      for (const [, st] of stats) {
        if (st.country.code === iso2) return iso2;
      }
    }

    // Name lookup
    if (name && NAME_TO_CODE[name]) {
      return NAME_TO_CODE[name];
    }

    // ISO-3 to code fallback
    const iso3Map: Record<string, string> = {
      FRA: "FR", ITA: "IT", ESP: "ES", PRT: "PT", DEU: "DE",
      AUT: "AT", CHE: "CH", USA: "US", ARG: "AR", CHL: "CL",
      AUS: "AU", NZL: "NZ", ZAF: "ZA", JPN: "JP", GEO: "GE",
      GRC: "GR", HUN: "HU", LBN: "LB", HRV: "HR", ROU: "RO",
      SVN: "SI", ISR: "IL", CAN: "CA", BRA: "BR", URY: "UY",
      GBR: "GB", CHN: "CN", IND: "IN", MEX: "MX", MAR: "MA",
      TUR: "TR", MDA: "MD", BGR: "BG", SRB: "RS", CZE: "CZ",
    };
    if (iso3 && iso3Map[iso3]) return iso3Map[iso3];

    return null;
  }

  function style(feature: Feature | undefined): PathOptions {
    if (!feature) return {};
    const code = getCountryCode(feature);
    const s = code ? codeToStats.get(code) : null;
    const count = s?.count || 0;

    return {
      fillColor: getCountryColor(count),
      weight: count > 0 ? 1.5 : 0.5,
      opacity: 1,
      color: count > 0 ? "#722f37" : "#d1d5db",
      fillOpacity: getCountryOpacity(count),
    };
  }

  function onEachFeature(feature: Feature, layer: Layer) {
    const code = getCountryCode(feature);
    const s = code ? codeToStats.get(code) : null;

    if (s) {
      const name = s.country.nameJa;
      const count = s.count;
      layer.bindTooltip(
        `<div style="text-align:center;font-size:12px;">
          <b>${name}</b><br/>
          ${count > 0 ? `${count}本記録 / ${s.regions.size}地域` : "未探索"}
        </div>`,
        { sticky: true }
      );

      layer.on("click", () => {
        if (s.explored) {
          onSelectCountry(s);
        }
      });
    }
  }

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
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      <FitBounds stats={stats} />

      {geoData && (
        <GeoJSON
          key="choropleth"
          data={geoData}
          style={style}
          onEachFeature={onEachFeature}
        />
      )}

      {/* Labels on top of choropleth */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
        pane="overlayPane"
      />
    </MapContainer>
  );
}

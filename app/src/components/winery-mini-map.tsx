"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface WineryMiniMapProps {
  lat: number;
  lng: number;
  name: string;
}

function createPinIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
      ">
        <span class="material-symbols-outlined" style="
          font-size: 28px;
          color: #722f37;
          filter: drop-shadow(0 2px 4px rgba(114,47,55,0.5));
          font-variation-settings: 'FILL' 1;
        ">location_on</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 28],
  });
}

function InjectStyles() {
  useEffect(() => {
    const id = "winery-mini-map-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      .winery-mini-map .leaflet-tile-pane {
        filter: grayscale(0.8) contrast(0.8) brightness(1.05) sepia(0.3);
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return null;
}

function FitView({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13, { animate: false });
  }, [map, lat, lng]);
  return null;
}

export default function WineryMiniMap({ lat, lng, name }: WineryMiniMapProps) {
  return (
    <div className="winery-mini-map" style={{ height: 200, width: "100%" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        dragging={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        attributionControl={false}
      >
        <InjectStyles />
        <FitView lat={lat} lng={lng} />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />

        {/* Wine-red tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 399,
            backgroundColor: "#722f37",
            opacity: 0.08,
            mixBlendMode: "color",
            pointerEvents: "none",
          }}
        />

        <Marker
          position={[lat, lng]}
          icon={createPinIcon()}
        />

        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          pane="overlayPane"
        />
      </MapContainer>

      {/* Label overlay */}
      <div className="relative -mt-10 z-[500] px-4 pb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-[#d8c1c2]/30">
          <span className="material-symbols-outlined text-[14px] text-[#722f37]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          <span className="font-label text-[11px] font-medium text-[#1c1c18]">{name}</span>
        </div>
      </div>
    </div>
  );
}

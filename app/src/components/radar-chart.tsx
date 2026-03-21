"use client";

import { PalateLevel } from "@/lib/types";

interface RadarChartProps {
  data: { label: string; value: PalateLevel }[];
  baseData?: { label: string; value: PalateLevel }[]; // grape variety base layer
  size?: number;
  color?: string;
  baseColor?: string;
  interactive?: boolean;
  onChange?: (index: number, value: PalateLevel) => void;
}

export default function RadarChart({
  data,
  baseData,
  size = 240,
  color = "#722f37",
  baseColor = "#d4a574",
  interactive = false,
  onChange,
}: RadarChartProps) {
  const center = size / 2;
  const maxR = size / 2 - 30;
  const levels = 5;
  const angleStep = (2 * Math.PI) / data.length;
  const startAngle = -Math.PI / 2;

  function getPoint(index: number, value: number): [number, number] {
    const angle = startAngle + index * angleStep;
    const r = (value / levels) * maxR;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  // Grid lines
  const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
    const r = ((lvl + 1) / levels) * maxR;
    const points = data
      .map((_, i) => {
        const angle = startAngle + i * angleStep;
        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
      })
      .join(" ");
    return points;
  });

  // Base data polygon (grape variety defaults)
  const basePoints = baseData
    ?.map((d, i) => getPoint(i, d.value))
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  // Data polygon (wine-specific / user values)
  const dataPoints = data
    .map((d, i) => getPoint(i, d.value))
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  // Label positions
  const labelPositions = data.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR + 18;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  function handleClick(index: number) {
    if (!interactive || !onChange) return;
    const current = data[index].value;
    const next = current >= 5 ? 1 : ((current + 1) as PalateLevel);
    onChange(index, next);
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Grid */}
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={i === levels - 1 ? 1 : 0.5}
        />
      ))}

      {/* Axis lines */}
      {data.map((_, i) => {
        const [x, y] = getPoint(i, levels);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#e5e7eb"
            strokeWidth={0.5}
          />
        );
      })}

      {/* Base layer (grape variety defaults) */}
      {baseData && basePoints && (
        <>
          <polygon
            points={basePoints}
            fill={baseColor}
            fillOpacity={0.1}
            stroke={baseColor}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          {baseData.map((d, i) => {
            const [x, y] = getPoint(i, d.value);
            return (
              <circle
                key={`base-${i}`}
                cx={x}
                cy={y}
                r={3}
                fill={baseColor}
                stroke="white"
                strokeWidth={1}
              />
            );
          })}
        </>
      )}

      {/* Data area (wine-specific / user values) */}
      <polygon
        points={dataPoints}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2}
      />

      {/* Data points */}
      {data.map((d, i) => {
        const [x, y] = getPoint(i, d.value);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={interactive ? 8 : 4}
            fill={color}
            stroke="white"
            strokeWidth={2}
            className={interactive ? "cursor-pointer" : ""}
            onClick={() => handleClick(i)}
          />
        );
      })}

      {/* Labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={labelPositions[i].x}
          y={labelPositions[i].y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fill="#6b7280"
          fontWeight={500}
        >
          {d.label}
        </text>
      ))}

      {/* Value labels on points */}
      {data.map((d, i) => {
        const [x, y] = getPoint(i, d.value);
        return (
          <text
            key={`v${i}`}
            x={x}
            y={y - 12}
            textAnchor="middle"
            fontSize={9}
            fill={color}
            fontWeight={600}
          >
            {d.value}
          </text>
        );
      })}
    </svg>
  );
}

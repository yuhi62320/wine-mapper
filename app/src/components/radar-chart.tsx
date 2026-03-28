"use client";

import { PalateLevel } from "@/lib/types";

interface RadarChartProps {
  data: { label: string; value: PalateLevel }[];
  baseData?: { label: string; value: PalateLevel }[];
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
  color = "#561922",
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

  // Base data polygon
  const basePoints = baseData
    ?.map((d, i) => getPoint(i, d.value))
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  // Data polygon
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
      {/* Grid - delicate hairline strokes */}
      {gridPolygons.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="#d8c1c2"
          strokeWidth={0.5}
          strokeDasharray={i < levels - 1 ? "2 2" : undefined}
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
            stroke="#d8c1c2"
            strokeWidth={0.3}
          />
        );
      })}

      {/* Base layer (grape variety defaults) */}
      {baseData && basePoints && (
        <>
          <polygon
            points={basePoints}
            fill={baseColor}
            fillOpacity={0.08}
            stroke={baseColor}
            strokeWidth={1}
            strokeDasharray="4 3"
          />
          {baseData.map((d, i) => {
            const [x, y] = getPoint(i, d.value);
            return (
              <circle
                key={`base-${i}`}
                cx={x}
                cy={y}
                r={2.5}
                fill={baseColor}
                stroke="white"
                strokeWidth={1}
              />
            );
          })}
        </>
      )}

      {/* Data area - transparent wine tint */}
      <polygon
        points={dataPoints}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.5}
      />

      {/* Data points - refined like map pins */}
      {data.map((d, i) => {
        const [x, y] = getPoint(i, d.value);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={interactive ? 6 : 3}
            fill={color}
            stroke="white"
            strokeWidth={1.5}
            className={interactive ? "cursor-pointer" : ""}
            onClick={() => handleClick(i)}
          />
        );
      })}

      {/* Labels - serif & elegant */}
      {data.map((d, i) => (
        <text
          key={i}
          x={labelPositions[i].x}
          y={labelPositions[i].y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
          fill="#534343"
          fontWeight={500}
          fontStyle="italic"
          fontFamily="'Noto Serif JP', serif"
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { PalateLevel } from "@/lib/types";

interface RadarChartProps {
  data: { label: string; value: PalateLevel }[];
  baseData?: { label: string; value: PalateLevel }[];
  size?: number;
  color?: string;
  baseColor?: string;
  interactive?: boolean;
  onChange?: (index: number, value: PalateLevel) => void;
  /** Map from label name to array of 5 level descriptions (index 0 = level 1) */
  levelLabels?: Record<string, string[]>;
}

export default function RadarChart({
  data,
  baseData,
  size = 260,
  color = "#561922",
  baseColor = "#d4a574",
  interactive = false,
  onChange,
  levelLabels,
}: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragValue, setDragValue] = useState<PalateLevel | null>(null);

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

  // Calculate palate level from pointer position projected onto an axis
  const calcValueFromPointer = useCallback(
    (index: number, clientX: number, clientY: number): PalateLevel => {
      const svg = svgRef.current;
      if (!svg) return 1;

      // Convert client coordinates to SVG coordinates
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());

      // Vector from center to pointer
      const dx = svgPt.x - center;
      const dy = svgPt.y - center;

      // Axis unit vector for this index
      const angle = startAngle + index * angleStep;
      const ax = Math.cos(angle);
      const ay = Math.sin(angle);

      // Project pointer vector onto axis (dot product)
      const projection = dx * ax + dy * ay;

      // Map projection distance to value 1-5
      const stepSize = maxR / levels;
      const raw = Math.round(projection / stepSize);
      const clamped = Math.max(1, Math.min(5, raw)) as PalateLevel;
      return clamped;
    },
    [center, maxR, levels, angleStep, startAngle]
  );

  const handlePointerDown = useCallback(
    (index: number, e: React.PointerEvent) => {
      if (!interactive || !onChange) return;
      e.preventDefault();
      (e.target as Element).setPointerCapture(e.pointerId);
      setDraggingIndex(index);
      const val = calcValueFromPointer(index, e.clientX, e.clientY);
      setDragValue(val);
      onChange(index, val);
    },
    [interactive, onChange, calcValueFromPointer]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (draggingIndex === null || !onChange) return;
      e.preventDefault();
      const val = calcValueFromPointer(draggingIndex, e.clientX, e.clientY);
      if (val !== dragValue) {
        setDragValue(val);
        onChange(draggingIndex, val);
      }
    },
    [draggingIndex, dragValue, onChange, calcValueFromPointer]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingIndex(null);
    setDragValue(null);
  }, []);

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

  // Build tooltip content for the currently dragged point
  const tooltipInfo =
    draggingIndex !== null && dragValue !== null
      ? (() => {
          const label = data[draggingIndex].label;
          const [tx, ty] = getPoint(draggingIndex, dragValue);
          const hasLevelLabel =
            levelLabels && levelLabels[label] && levelLabels[label].length >= dragValue;
          const text = hasLevelLabel
            ? levelLabels![label][dragValue - 1]
            : `${dragValue}`;
          return { x: tx, y: ty, text };
        })()
      : null;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerUp={interactive ? handlePointerUp : undefined}
      onPointerLeave={interactive ? handlePointerUp : undefined}
      style={{ touchAction: "none" }}
    >
      {/* CSS transition for smooth polygon animation */}
      <style>{`
        .radar-polygon {
          transition: points 0.2s ease-out;
        }
      `}</style>

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

      {/* Data area - transparent wine tint with CSS transition */}
      <polygon
        className="radar-polygon"
        points={dataPoints}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.5}
      />

      {/* Data points with invisible hit areas for touch targets */}
      {data.map((d, i) => {
        const [x, y] = getPoint(i, d.value);
        const isDragging = draggingIndex === i;
        return (
          <g key={i}>
            {/* Invisible larger hit area for easier touch targeting */}
            {interactive && (
              <circle
                cx={x}
                cy={y}
                r={16}
                fill="transparent"
                className="cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => handlePointerDown(i, e)}
              />
            )}
            {/* Visible data point */}
            <circle
              cx={x}
              cy={y}
              r={interactive ? (isDragging ? 7 : 5) : 3}
              fill={color}
              stroke="white"
              strokeWidth={1.5}
              className={interactive ? "cursor-grab active:cursor-grabbing pointer-events-none" : ""}
              style={{
                transition: "r 0.15s ease-out",
              }}
            />
          </g>
        );
      })}

      {/* Tooltip shown near the dragged point */}
      {tooltipInfo && (
        <g>
          {/* Tooltip background */}
          <rect
            x={tooltipInfo.x - 24}
            y={tooltipInfo.y - 28}
            width={48}
            height={18}
            rx={4}
            fill="rgba(30, 10, 10, 0.85)"
          />
          {/* Tooltip text */}
          <text
            x={tooltipInfo.x}
            y={tooltipInfo.y - 16}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fill="white"
            fontFamily="Arial, 'Hiragino Sans', sans-serif"
            fontWeight={500}
          >
            {tooltipInfo.text}
          </text>
        </g>
      )}

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
          fontFamily="Arial, 'Hiragino Sans', sans-serif"
        >
          {d.label}
        </text>
      ))}
    </svg>
  );
}

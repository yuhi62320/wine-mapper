import { NextRequest, NextResponse } from "next/server";
import {
  getRegionPolygonsByCountry,
  getRegionPolygonsByBbox,
} from "@/lib/supabase-polygons";

/**
 * GET /api/region-polygons
 *
 * Mode 1: ?country=France
 *   Returns all region-level polygons for a country as a GeoJSON FeatureCollection.
 *
 * Mode 2: ?bbox=west,south,east,north&zoom=8
 *   Returns polygons within a bounding box.
 *   Uses simplified geometry for zoom < 8, full geometry for zoom >= 8.
 */
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const country = params.get("country");
  const bboxParam = params.get("bbox");
  const zoomParam = params.get("zoom");

  // Mode 1: Query by country
  if (country) {
    try {
      const collection = await getRegionPolygonsByCountry(country);
      return NextResponse.json(collection, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    } catch (err) {
      console.error("[region-polygons] Country query error:", err);
      return NextResponse.json(
        { error: "Failed to fetch region polygons" },
        { status: 500 }
      );
    }
  }

  // Mode 2: Query by bounding box
  if (bboxParam) {
    const parts = bboxParam.split(",").map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) {
      return NextResponse.json(
        { error: "bbox must be 4 comma-separated numbers: west,south,east,north" },
        { status: 400 }
      );
    }

    const [west, south, east, north] = parts;

    // Validate coordinate ranges
    if (west < -180 || east > 180 || south < -90 || north > 90) {
      return NextResponse.json(
        { error: "bbox coordinates out of range" },
        { status: 400 }
      );
    }

    const zoom = zoomParam ? parseInt(zoomParam, 10) : 5;
    if (isNaN(zoom) || zoom < 0 || zoom > 22) {
      return NextResponse.json(
        { error: "zoom must be an integer between 0 and 22" },
        { status: 400 }
      );
    }

    try {
      const collection = await getRegionPolygonsByBbox(
        [west, south, east, north],
        zoom
      );
      return NextResponse.json(collection, {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
        },
      });
    } catch (err) {
      console.error("[region-polygons] Bbox query error:", err);
      return NextResponse.json(
        { error: "Failed to fetch region polygons" },
        { status: 500 }
      );
    }
  }

  // No valid query parameters provided
  return NextResponse.json(
    { error: "Provide either ?country=<name> or ?bbox=west,south,east,north&zoom=<level>" },
    { status: 400 }
  );
}

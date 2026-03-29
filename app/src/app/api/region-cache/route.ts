import { NextRequest, NextResponse } from "next/server";
import { buildRegionLookupKey, getCachedRegion } from "@/lib/supabase-cache";

/**
 * GET /api/region-cache?country=Turkey&region=Thrace%20%26%20Marmara
 * Returns cached guide_data from Supabase region_cache, mapped to RegionContent shape.
 */
export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country");
  const region = req.nextUrl.searchParams.get("region");

  if (!country || !region) {
    return NextResponse.json(
      { error: "country and region are required" },
      { status: 400 }
    );
  }

  const lookupKey = buildRegionLookupKey({ country, region });

  try {
    const cached = await getCachedRegion(lookupKey);
    if (!cached) {
      return NextResponse.json(null, { status: 404 });
    }

    const gd = cached.guide_data as Record<string, unknown>;

    // Extract text from guide_data fields (each is either { text, imageKeyword } or a plain string)
    function extractText(field: unknown): string {
      if (!field) return "";
      if (typeof field === "string") return field;
      if (typeof field === "object" && field !== null && "text" in field) {
        return (field as { text: string }).text ?? "";
      }
      return "";
    }

    // Map guide_data JSONB to RegionContent interface
    const content = {
      regionName: typeof gd.regionName === "string" ? gd.regionName : "",
      heroImage: typeof gd.heroImage === "string" ? gd.heroImage : "",
      description: extractText(gd.description) || extractText(gd.terroir).split("。").slice(0, 2).join("。") + "。",
      terroir: extractText(gd.terroir),
      climate: extractText(gd.climate),
      history: extractText(gd.history),
      wineStyles: extractText(gd.keyStyles),
      keyGrapes: Array.isArray(gd.keyGrapes) ? gd.keyGrapes : [],
      topProducers: extractText(gd.topProducers),
      foodPairing: extractText(gd.foodPairing),
      tourism: extractText(gd.visitTips),
      nature: extractText(gd.nature),
      culture: extractText(gd.culture),
      regulations: extractText(gd.regulations),
      sommNotes: extractText(gd.sommNotes),
      vintageGuide: extractText(gd.vintageGuide),
      bestSeason: extractText(gd.bestSeason),
      funFact: extractText(gd.funFact),
    };

    return NextResponse.json(content);
  } catch (err) {
    console.error("[region-cache] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch region data" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAllGrapes, searchGrapes } from "@/lib/supabase-grape";
import { GRAPE_MASTER } from "@/lib/grape-master";

// Convert local GRAPE_MASTER to the API response shape (matches grape_varieties row).
function masterToRow(g: (typeof GRAPE_MASTER)[number]) {
  return {
    id: g.id,
    name_en: g.nameEn,
    name_ja: g.nameJa,
    aliases: g.aliases,
    is_red: g.isRed,
    origin_country: null,
    origin_region: null,
    description_ja: null,
    characteristics: null,
    typical_aromas: [],
    typical_palate: null,
    food_pairings: [],
    notable_regions: [],
    image_url: null,
    created_at: "",
    updated_at: "",
  };
}

function fallbackList(opts: { isRed?: boolean; q?: string }) {
  let list = GRAPE_MASTER;
  if (opts.isRed !== undefined) {
    list = list.filter((g) => g.isRed === opts.isRed);
  }
  if (opts.q) {
    const q = opts.q.toLowerCase();
    list = list.filter(
      (g) =>
        g.nameEn.toLowerCase().includes(q) ||
        g.nameJa.toLowerCase().includes(q) ||
        g.aliases.some((a) => a.toLowerCase().includes(q))
    );
  }
  return list
    .slice()
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn))
    .map(masterToRow);
}

// GET /api/grapes
// Query params:
//   ?color=red|white  - filter by grape color (maps to isRed boolean)
//   ?q=searchTerm     - search grapes by name
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const color = searchParams.get("color");
  const q = searchParams.get("q");
  const isRed =
    color === "red" ? true : color === "white" ? false : undefined;

  // Try Supabase first; fall back to local GRAPE_MASTER on any failure.
  try {
    const grapes = q
      ? await searchGrapes(q)
      : await getAllGrapes(isRed !== undefined ? { isRed } : undefined);

    // If Supabase returned an empty result, fall back so the UI is never empty.
    if (!grapes || grapes.length === 0) {
      return NextResponse.json(
        fallbackList({ isRed, q: q ?? undefined })
      );
    }
    return NextResponse.json(grapes);
  } catch (err) {
    console.error(
      "[grapes] Supabase fetch failed, using local master fallback:",
      err
    );
    return NextResponse.json(
      fallbackList({ isRed, q: q ?? undefined })
    );
  }
}

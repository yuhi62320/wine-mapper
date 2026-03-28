import { NextRequest, NextResponse } from "next/server";
import { getAllGrapes, searchGrapes } from "@/lib/supabase-grape";

// GET /api/grapes
// Query params:
//   ?color=red|white  - filter by grape color (maps to isRed boolean)
//   ?q=searchTerm     - search grapes by name
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const color = searchParams.get("color");
    const q = searchParams.get("q");

    // If search term is provided, use searchGrapes
    if (q) {
      const grapes = await searchGrapes(q);
      return NextResponse.json(grapes);
    }

    // Map color param to isRed filter
    const isRed =
      color === "red" ? true : color === "white" ? false : undefined;

    const grapes = await getAllGrapes(isRed !== undefined ? { isRed } : undefined);
    return NextResponse.json(grapes);
  } catch (err) {
    console.error("Failed to fetch grapes:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch grapes" },
      { status: 500 }
    );
  }
}

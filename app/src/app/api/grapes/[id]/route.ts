import { NextRequest, NextResponse } from "next/server";
import { getGrapeById } from "@/lib/supabase-grape";

// GET /api/grapes/[id]
// Returns a single grape variety by UUID
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const grape = await getGrapeById(id);

    if (!grape) {
      return NextResponse.json(
        { error: "Grape not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(grape);
  } catch (err) {
    console.error("Failed to fetch grape:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch grape" },
      { status: 500 }
    );
  }
}

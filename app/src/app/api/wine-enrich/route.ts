import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { AROMA_LIST_FOR_PROMPT } from "@/lib/aroma-list";

function getAnthropicKey(): string | undefined {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  try {
    const envPath = join(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    const match = content.match(/^ANTHROPIC_API_KEY=(.+)$/m);
    if (match) {
      process.env.ANTHROPIC_API_KEY = match[1].trim();
      return match[1].trim();
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

/**
 * POST /api/wine-enrich
 *
 * Uses Claude + web_search to fetch real-world tasting notes,
 * reviews, and pricing for a specific wine. Called on user demand
 * ("世界のレビューを参考にする" button).
 */
export async function POST(req: NextRequest) {
  const apiKey = getAnthropicKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { producer, name, vintage, country, region, type, grapeVarieties } = body;

  const wineName = [producer, name, vintage].filter(Boolean).join(" ");
  if (!wineName.trim()) {
    return NextResponse.json(
      { error: "Wine info required (producer or name)" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",
            max_uses: 2,
          },
        ],
        messages: [
          {
            role: "user",
            content: `You are an expert sommelier. Search the web for real tasting notes, professional reviews, and pricing for this wine:

Wine: ${wineName}
Country: ${country || "unknown"}
Region: ${region || "unknown"}
Type: ${type || "red"}
Grapes: ${grapeVarieties || "unknown"}

Search Vivino, Wine-Searcher, Winalist, JancisRobinson, or major wine review sites to find REAL data about this specific wine.

IMPORTANT - For aromas, select ONLY from this predefined list:
${AROMA_LIST_FOR_PROMPT}

Return ONLY a valid JSON object (no markdown, no backticks):
{
  "priceRange": { "min": <JPY number>, "max": <JPY number> },
  "aromas": ["<select 5-10 from the predefined aroma list, in Japanese>"],
  "palate": {
    "sweetness": <1-5>,
    "acidity": <1-5>,
    "tannin": <1-5 or null if white/sparkling>,
    "body": <1-5>,
    "finish": <1-5>
  },
  "description": "<2-3 sentence Japanese description based on real reviews found>",
  "reviewSource": "<name of the review source found, e.g. 'Vivino 4.2/5', 'Wine-Searcher', etc.>",
  "confidence": "high" | "medium" | "low"
}

RULES:
- priceRange: Japanese retail prices in JPY from wine-searcher.com or rakuten.
- aromas: ONLY items from the predefined list. Do NOT invent new descriptors.
- palate: Based on actual reviews found, not generic assumptions.
- description: Summarize real reviewer impressions in Japanese.
- reviewSource: Cite where you found the data.
- confidence: "high" if specific reviews found, "medium" if partial, "low" if mostly inferred.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[wine-enrich] API error:", res.status, errBody);
      return NextResponse.json(
        { error: `API error: ${res.status}` },
        { status: 502 }
      );
    }

    const apiResult = await res.json();

    // Extract text from all content blocks
    let fullText = "";
    for (const block of apiResult.content || []) {
      if (block.type === "text") {
        fullText += block.text;
      }
    }

    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("[wine-enrich] Failed to parse:", fullText);
      return NextResponse.json(
        { error: "Failed to parse enrichment response" },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonMatch[0]);

    // Clean up cite tags from web search results
    if (data.description) {
      data.description = data.description.replace(/<\/?cite[^>]*>/g, "");
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("[wine-enrich] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Enrichment failed" },
      { status: 500 }
    );
  }
}

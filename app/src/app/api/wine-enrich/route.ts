import { NextRequest, NextResponse } from "next/server";
import { AROMA_LIST_FOR_PROMPT } from "@/lib/aroma-list";

const JSON_SCHEMA = `{
  "priceRange": { "min": <JPY number>, "max": <JPY number> },
  "aromas": ["<select 5-10 from the predefined aroma list, in Japanese>"],
  "palate": {
    "sweetness": <1-5>,
    "acidity": <1-5>,
    "tannin": <1-5 or null if white/sparkling>,
    "body": <1-5>,
    "finish": <1-5>
  },
  "description": "<2-3 sentence Japanese description>",
  "reviewSource": "<source name or empty string>",
  "confidence": "high" | "medium" | "low"
}`;

function buildWineContext(params: Record<string, string>) {
  return `Wine: ${[params.producer, params.name, params.vintage].filter(Boolean).join(" ")}
Country: ${params.country || "unknown"}
Region: ${params.region || "unknown"}
Type: ${params.type || "red"}
Grapes: ${params.grapeVarieties || "unknown"}`;
}

/**
 * Try web search enrichment first, then fallback to knowledge-only.
 */
async function enrichWithWebSearch(
  apiKey: string,
  wineContext: string
): Promise<Record<string, unknown> | null> {
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

${wineContext}

Search Vivino, Wine-Searcher, Winalist, JancisRobinson, or major wine review sites.

IMPORTANT - For aromas, select ONLY from this predefined list:
${AROMA_LIST_FOR_PROMPT}

You MUST return a valid JSON object even if web search finds limited information. Use your wine expertise to fill gaps.

Return ONLY a valid JSON object (no markdown, no backticks, no explanation before or after):
${JSON_SCHEMA}

RULES:
- You MUST always return the JSON, even if no reviews are found. Use "confidence": "low" in that case.
- priceRange: Japanese retail prices in JPY.
- aromas: ONLY items from the predefined list.
- palate: Based on reviews if found, otherwise your expert estimation.
- description: In Japanese. If no reviews found, describe expected character based on grape/region.
- reviewSource: Cite source if found, otherwise empty string "".`,
        },
      ],
    }),
  });

  if (!res.ok) {
    console.error("[wine-enrich] Web search API error:", res.status);
    return null;
  }

  const apiResult = await res.json();

  let fullText = "";
  for (const block of apiResult.content || []) {
    if (block.type === "text") {
      fullText += block.text;
    }
  }

  const jsonMatch = fullText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("[wine-enrich] Web search: no JSON in response, will fallback");
    return null;
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    console.error("[wine-enrich] Web search: JSON parse error, will fallback");
    return null;
  }
}

/**
 * Fallback: knowledge-based enrichment without web search.
 */
async function enrichFromKnowledge(
  apiKey: string,
  wineContext: string
): Promise<Record<string, unknown> | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: `You are an expert sommelier. Based on your wine knowledge, estimate tasting profile for:

${wineContext}

For aromas, select ONLY from this predefined list:
${AROMA_LIST_FOR_PROMPT}

Return ONLY a valid JSON object (no markdown, no backticks):
${JSON_SCHEMA}

Set confidence to "low" and reviewSource to "". Base your estimates on the grape variety, region, and wine style.
Aromas MUST come from the predefined list only. Description in Japanese.`,
        },
      ],
    }),
  });

  if (!res.ok) return null;

  const apiResult = await res.json();
  const text = apiResult.content?.[0]?.type === "text" ? apiResult.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return null;
  }
}

/**
 * POST /api/wine-enrich
 *
 * Uses Claude + web_search to fetch real-world tasting notes,
 * with fallback to knowledge-based estimation.
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
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

  const wineContext = buildWineContext({ producer, name, vintage, country, region, type, grapeVarieties });

  try {
    // Step 1: Try web search enrichment
    let data = await enrichWithWebSearch(apiKey, wineContext);

    // Step 2: If web search failed, fallback to knowledge-based
    if (!data) {
      console.log("[wine-enrich] Falling back to knowledge-based enrichment");
      data = await enrichFromKnowledge(apiKey, wineContext);
    }

    // If both failed, return error
    if (!data) {
      return NextResponse.json(
        { error: "Could not generate enrichment data" },
        { status: 500 }
      );
    }

    // Clean up cite tags from web search results
    if (typeof data.description === "string") {
      data.description = (data.description as string).replace(/<\/?cite[^>]*>/g, "");
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

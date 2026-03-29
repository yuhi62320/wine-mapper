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
 * Step 1: Read label from photo using Vision API (fast, no web search)
 */
async function readLabel(apiKey: string, imageBase64: string, mediaType: string) {
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
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType || "image/jpeg",
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: `You are an expert sommelier analyzing a wine label photo. Extract ALL information visible on the label.

Return ONLY a valid JSON object (no markdown, no backticks, no explanation):

{
  "producer": "<producer/domaine/château name as printed>",
  "name": "<wine name / cuvée name, empty string if same as producer>",
  "country": "<country of origin in English>",
  "region": "<wine region>",
  "subRegion": "<sub-region if visible>",
  "village": "<village/commune if visible>",
  "vintage": <year as number or null>,
  "appellation": "<appellation: AOC, AOP, DOCG, DOC, DO, etc.>",
  "classification": "<quality tier: Grand Cru, Premier Cru, Reserva, etc.>",
  "abv": <alcohol % as number or null>,
  "volume": <volume in ml as number or null>,
  "bottler": "<bottling info if visible>",
  "grapeVarieties": ["<grape variety 1>", "<grape variety 2>"],
  "aging": "<aging notation if visible>",
  "tasteType": "<taste type if visible: Brut, Sec, Doux, etc.>",
  "certifications": ["<any certifications>"],
  "type": "<red|white|rose|sparkling|fortified|dessert|orange>"
}

RULES:
- For grapeVarieties: If not on label, infer from appellation/region
- Infer region hierarchy from appellation (e.g. "Margaux" → region: "Bordeaux", subRegion: "Médoc", village: "Margaux")
- Return producer name EXACTLY as printed on the label
- country must be in English`,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Vision API error: ${res.status} ${errBody}`);
  }

  const apiResult = await res.json();
  const text = apiResult.content?.[0]?.type === "text" ? apiResult.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse label response");
  return JSON.parse(jsonMatch[0]);
}

/**
 * Step 2: Enrich wine knowledge using web search for real tasting notes & pricing
 */
async function enrichWithWebSearch(
  apiKey: string,
  label: Record<string, unknown>
) {
  const wineName = [label.producer, label.name, label.vintage]
    .filter(Boolean)
    .join(" ");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2025-01-01",
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
          content: `You are an expert sommelier. Search the web for real tasting notes, reviews, and pricing for this wine:

Wine: ${wineName}
Country: ${label.country || "unknown"}
Region: ${label.region || "unknown"}
Type: ${label.type || "red"}
Grapes: ${Array.isArray(label.grapeVarieties) ? (label.grapeVarieties as string[]).join(", ") : "unknown"}

Search for this wine on Vivino, Wine-Searcher, Winalist, or major wine review sites to get REAL tasting notes and price data.

IMPORTANT - For aromas, you MUST select ONLY from this predefined list:
${AROMA_LIST_FOR_PROMPT}

Return ONLY a valid JSON object (no markdown, no backticks):
{
  "priceRange": { "min": <JPY number>, "max": <JPY number> },
  "aromas": ["<select 5-10 from the predefined aroma list above, in Japanese>"],
  "palate": {
    "sweetness": <1-5>,
    "acidity": <1-5>,
    "tannin": <1-5 or null if white/sparkling>,
    "body": <1-5>,
    "finish": <1-5>
  },
  "grapeBaseAromas": ["<typical aromas of this grape variety from the predefined list, in Japanese>"],
  "grapeBasePalate": {
    "sweetness": <1-5>,
    "acidity": <1-5>,
    "tannin": <1-5 or null>,
    "body": <1-5>,
    "finish": <1-5>
  },
  "description": "<2-3 sentence Japanese description based on real reviews found>",
  "producerUrl": "<producer website URL if found>",
  "confidence": "high" | "medium" | "low"
}

RULES:
- priceRange: Use Japanese retail prices in JPY. Search wine-searcher.com or rakuten for Japanese pricing.
- aromas: ONLY use items from the predefined list. Do NOT invent new descriptors.
- palate/grapeBasePalate: Based on real reviews, not generic assumptions.
- description: Summarize real reviewer impressions in Japanese.
- confidence: "high" if you found specific reviews, "medium" if partial info, "low" if mostly inferred.`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("[wine-vision] Web search enrichment error:", res.status, errBody);
    return null;
  }

  const apiResult = await res.json();

  // Extract final text from tool_use response (may have multiple content blocks)
  let finalText = "";
  for (const block of apiResult.content || []) {
    if (block.type === "text") {
      finalText += block.text;
    }
  }

  const jsonMatch = finalText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("[wine-vision] Failed to parse enrichment response:", finalText);
    return null;
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Fallback: Generate knowledge without web search (if web search fails)
 */
async function fallbackKnowledge(
  apiKey: string,
  label: Record<string, unknown>
) {
  const wineName = [label.producer, label.name, label.vintage]
    .filter(Boolean)
    .join(" ");

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
          content: `You are an expert sommelier. For this wine, provide tasting knowledge.

Wine: ${wineName}
Country: ${label.country || "unknown"}
Region: ${label.region || "unknown"}
Type: ${label.type || "red"}
Grapes: ${Array.isArray(label.grapeVarieties) ? (label.grapeVarieties as string[]).join(", ") : "unknown"}

IMPORTANT - For aromas, you MUST select ONLY from this predefined list:
${AROMA_LIST_FOR_PROMPT}

Return ONLY a valid JSON object:
{
  "priceRange": { "min": <JPY>, "max": <JPY> },
  "aromas": ["<5-10 from predefined list, Japanese>"],
  "palate": { "sweetness": <1-5>, "acidity": <1-5>, "tannin": <1-5 or null>, "body": <1-5>, "finish": <1-5> },
  "grapeBaseAromas": ["<typical grape aromas from predefined list, Japanese>"],
  "grapeBasePalate": { "sweetness": <1-5>, "acidity": <1-5>, "tannin": <1-5 or null>, "body": <1-5>, "finish": <1-5> },
  "description": "<1-2 sentence Japanese description>",
  "producerUrl": "",
  "confidence": "low"
}

Aromas MUST come from the predefined list only.`,
        },
      ],
    }),
  });

  if (!res.ok) return null;

  const apiResult = await res.json();
  const text = apiResult.content?.[0]?.type === "text" ? apiResult.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;
  return JSON.parse(jsonMatch[0]);
}

export async function POST(req: NextRequest) {
  const apiKey = getAnthropicKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { imageBase64, mediaType } = body;

  if (!imageBase64) {
    return NextResponse.json(
      { error: "imageBase64 is required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Read label from photo
    const label = await readLabel(apiKey, imageBase64, mediaType);

    // Step 2: Enrich with web search (with timeout + fallback)
    let knowledge = null;
    try {
      // Race web search against a 8s timeout to stay within 10s total
      knowledge = await Promise.race([
        enrichWithWebSearch(apiKey, label),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000)),
      ]);
    } catch (err) {
      console.error("[wine-vision] Web search failed, using fallback:", err);
    }

    // If web search failed or timed out, use fallback
    if (!knowledge) {
      try {
        knowledge = await fallbackKnowledge(apiKey, label);
      } catch (err) {
        console.error("[wine-vision] Fallback also failed:", err);
      }
    }

    return NextResponse.json({
      label,
      knowledge: knowledge || {
        priceRange: null,
        aromas: [],
        palate: null,
        grapeBaseAromas: [],
        grapeBasePalate: null,
        description: "",
        producerUrl: "",
        confidence: "low",
      },
    });
  } catch (err) {
    console.error("Wine vision error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Vision analysis failed" },
      { status: 500 }
    );
  }
}

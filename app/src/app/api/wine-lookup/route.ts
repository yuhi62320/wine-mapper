import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import {
  buildWineLookupKey,
  getCachedWine,
  searchWineCandidates,
  setCachedWine,
  WineCacheRow,
} from "@/lib/supabase-cache";
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

export async function POST(req: NextRequest) {
  const apiKey = getAnthropicKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { producer, name, vintage, country, region, grapeVarieties, type } =
    body;

  // Build lookup key and check cache in parallel
  const lookupKey = buildWineLookupKey({
    producer,
    name,
    vintage,
    country,
    region,
    type,
  });

  const [exactMatch, similarCandidates] = await Promise.all([
    getCachedWine(lookupKey),
    searchWineCandidates({ producer, name, country, region, type }),
  ]);

  // Filter out the exact match from similar candidates to avoid duplicates
  const filteredCandidates = similarCandidates.filter(
    (c) => c.lookup_key !== lookupKey
  );

  // If exact cache hit, return immediately without calling Claude API
  if (exactMatch) {
    return NextResponse.json({
      candidates: [exactMatch, ...filteredCandidates],
      exactMatch: true,
    });
  }

  // Cache miss: call Claude API for enrichment
  const wineDescription = [
    producer && `Producer: ${producer}`,
    name && `Wine name: ${name}`,
    vintage && `Vintage: ${vintage}`,
    country && `Country: ${country}`,
    region && `Region: ${region}`,
    grapeVarieties?.length && `Grapes: ${grapeVarieties.join(", ")}`,
    type && `Type: ${type}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
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
            content: `You are a sommelier. Search the web for real information about this wine, then return structured data.

Wine:
${wineDescription}

Search Vivino, Wine-Searcher, Winalist, or wine review sites for REAL tasting notes, reviews, and pricing for this specific wine.

IMPORTANT - For aromas, you MUST select ONLY from this predefined list:
${AROMA_LIST_FOR_PROMPT}

Return ONLY a valid JSON object (no markdown, no explanation):
{
  "producer": "<producer/domaine/chateau name>",
  "name": "<wine name / cuvee name>",
  "country": "<country of origin>",
  "region": "<wine region>",
  "subRegion": "<sub-region if applicable, otherwise empty string>",
  "village": "<village/commune if applicable, otherwise empty string>",
  "appellation": "<appellation / AOC / DOCG etc., otherwise empty string>",
  "classification": "<quality classification>",
  "grapeVarieties": [<grape variety names>],
  "abv": <typical ABV as number or null>,
  "aging": "<aging info>",
  "tasteType": "<taste type>",
  "bottler": "<bottler info>",
  "certifications": [<certifications>],
  "producerUrl": "<producer website URL if found>",
  "priceRange": { "min": <JPY number>, "max": <JPY number> },
  "aromas": [<5-10 from predefined list above, in Japanese>],
  "palate": {
    "sweetness": <1-5>,
    "acidity": <1-5>,
    "tannin": <1-5 or null if white/sparkling>,
    "body": <1-5>,
    "finish": <1-5>
  },
  "description": "<2-3 sentence Japanese description based on real reviews>",
  "suggestedGrapes": [<grape variety names if not in input>],
  "suggestedAbv": <typical ABV as number or null>,
  "confidence": "high" | "medium" | "low"
}

RULES:
- Aromas MUST come from the predefined list only. Do NOT invent new descriptors.
- Price should reflect Japanese retail market (search wine-searcher or rakuten).
- Be specific to this wine, not generic. Base on real reviews found.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Anthropic API error:", res.status, errBody);
      return NextResponse.json(
        { error: `API error: ${res.status}` },
        { status: 500 }
      );
    }

    const apiResult = await res.json();

    // Extract text from all content blocks (web_search responses have multiple blocks)
    let fullText = "";
    for (const block of apiResult.content || []) {
      if (block.type === "text") {
        fullText += block.text;
      }
    }

    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse response" },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonMatch[0]);

    // Map Claude response + original request params into a WineCacheRow
    const cacheRow: WineCacheRow = {
      lookup_key: lookupKey,
      producer: data.producer || producer || "",
      name: data.name || name || "",
      vintage: vintage ? Number(vintage) : undefined,
      country: data.country || country || "",
      region: data.region || region || "",
      sub_region: data.subRegion || "",
      village: data.village || "",
      appellation: data.appellation || "",
      classification: data.classification || "",
      type: type || "",
      grape_varieties: data.grapeVarieties || grapeVarieties || [],
      abv: data.abv ?? data.suggestedAbv ?? null,
      aging: data.aging || "",
      taste_type: data.tasteType || "",
      bottler: data.bottler || "",
      certifications: data.certifications || [],
      producer_url: data.producerUrl || "",
      price_range: data.priceRange || null,
      aromas: data.aromas || [],
      palate: data.palate || null,
      description: data.description || "",
      confidence: data.confidence || "low",
    };

    // Save to cache (fire-and-forget, don't block the response)
    setCachedWine(cacheRow).catch((err) =>
      console.error("Failed to cache wine:", err)
    );

    return NextResponse.json({
      candidates: [cacheRow, ...filteredCandidates],
      exactMatch: false,
    });
  } catch (err) {
    console.error("Wine lookup error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lookup failed" },
      { status: 500 }
    );
  }
}

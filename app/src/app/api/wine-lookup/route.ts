import { NextRequest, NextResponse } from "next/server";
import {
  buildWineLookupKey,
  getCachedWine,
  searchWineCandidates,
  setCachedWine,
  WineCacheRow,
} from "@/lib/supabase-cache";
import { AROMA_LIST_FOR_PROMPT } from "@/lib/aroma-list";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
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
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        messages: [
          {
            role: "user",
            content: `You are a sommelier with encyclopedic wine knowledge. Given the following wine, return ONLY a valid JSON object (no markdown, no explanation) with specific information about THIS wine (not generic grape/region info).

Wine:
${wineDescription}

IMPORTANT - For aromas, you MUST select ONLY from this predefined list:
${AROMA_LIST_FOR_PROMPT}

Return this exact JSON structure:
{
  "producer": "<producer/domaine/chateau name>",
  "name": "<wine name / cuvee name>",
  "country": "<country of origin>",
  "region": "<wine region>",
  "subRegion": "<sub-region if applicable, otherwise empty string>",
  "village": "<village/commune if applicable, otherwise empty string>",
  "appellation": "<appellation / AOC / DOCG etc., otherwise empty string>",
  "classification": "<quality classification e.g. Premier Cru, Reserva, otherwise empty string>",
  "grapeVarieties": [<grape variety names>],
  "abv": <typical ABV as number or null>,
  "aging": "<aging info e.g. Barrique 12 months, otherwise empty string>",
  "tasteType": "<taste type e.g. Sec, Brut, Doux, otherwise empty string>",
  "bottler": "<bottler info if known, otherwise empty string>",
  "certifications": [<certifications like Bio, Organic, or empty array>],
  "producerUrl": "<producer website URL if known, otherwise empty string>",
  "priceRange": { "min": <number in JPY>, "max": <number in JPY> },
  "aromas": [<up to 8 from predefined list above, in Japanese>],
  "palate": {
    "sweetness": <1-5>,
    "acidity": <1-5>,
    "tannin": <1-5 or null if white/sparkling>,
    "body": <1-5>,
    "finish": <1-5>
  },
  "description": "<1-2 sentence Japanese description of this specific wine's character>",
  "suggestedGrapes": [<grape variety names if not provided in input, otherwise empty array>],
  "suggestedAbv": <typical ABV as number or null>,
  "confidence": "high" | "medium" | "low"
}

RULES:
- Aromas MUST come from the predefined list only. Do NOT invent new descriptors.
- Price should reflect Japanese retail market (search wine-searcher or rakuten).
- Aromas MUST come from the predefined list only. Do NOT invent new descriptors.
- Be specific to the actual wine, not generic. If the producer is famous, reflect its unique style.
- Price should reflect Japanese retail market.`,
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
    const text =
      apiResult.content?.[0]?.type === "text"
        ? apiResult.content[0].text
        : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
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

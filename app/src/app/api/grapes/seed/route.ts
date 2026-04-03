import { NextRequest, NextResponse } from "next/server";
import { upsertGrape } from "@/lib/supabase-grape";
import { GRAPE_MASTER, GrapeMaster } from "@/lib/grape-master";

// ---------------------------------------------------------------------------
// Auth & API key helpers
// ---------------------------------------------------------------------------

function getServiceRoleKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

// ---------------------------------------------------------------------------
// Claude API caller
// ---------------------------------------------------------------------------

async function callClaude(
  apiKey: string,
  prompt: string,
  maxTokens = 1500
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${errBody}`);
  }

  const result = await res.json();
  const text =
    result.content?.[0]?.type === "text" ? result.content[0].text : "";
  return text;
}

// ---------------------------------------------------------------------------
// Agent 1 - Data Generator
// ---------------------------------------------------------------------------

interface GeneratedGrapeData {
  origin_country: string;
  origin_region: string;
  description_ja: string;
  characteristics: string;
  typical_aromas: string[];
  typical_palate: {
    sweetness: number;
    acidity: number;
    tannin: number | null;
    body: number;
    finish: number;
  };
  food_pairings: string[];
  notable_regions: string[];
}

async function generateGrapeData(
  apiKey: string,
  grape: GrapeMaster
): Promise<GeneratedGrapeData> {
  const prompt = `You are a master sommelier and wine educator. For the grape variety "${grape.nameEn}" (${grape.nameJa}):

Return ONLY valid JSON:
{
  "origin_country": "country of origin",
  "origin_region": "specific region of origin",
  "description_ja": "2-3 paragraph detailed description in Japanese about this grape variety, its history, characteristics, and significance",
  "characteristics": "1 sentence summary of flavor/style in Japanese",
  "typical_aromas": ["5-8 typical aroma descriptors in Japanese"],
  "typical_palate": {
    "sweetness": 1-5,
    "acidity": 1-5,
    "tannin": 1-5 or null (null for white grapes),
    "body": 1-5,
    "finish": 1-5
  },
  "food_pairings": ["4-6 food pairing suggestions in Japanese"],
  "notable_regions": ["3-5 notable wine regions for this grape"]
}`;

  const text = await callClaude(apiKey, prompt);
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`Failed to parse generated data for ${grape.nameEn}`);
  }
  return JSON.parse(jsonMatch[0]) as GeneratedGrapeData;
}

// ---------------------------------------------------------------------------
// Agent 2 - Fact Checker
// ---------------------------------------------------------------------------

interface FactCheckResult {
  approved: boolean;
  corrections: Partial<GeneratedGrapeData>;
  notes: string;
}

async function factCheckGrapeData(
  apiKey: string,
  grape: GrapeMaster,
  data: GeneratedGrapeData
): Promise<FactCheckResult> {
  const prompt = `You are a wine expert fact-checker. Review this data about the grape variety "${grape.nameEn}" (${grape.nameJa}):

${JSON.stringify(data, null, 2)}

Check for:
1. Is the origin country/region correct?
2. Are the typical aromas accurate for this grape?
3. Is the palate profile reasonable? (e.g., Riesling should have high acidity, Cabernet Sauvignon should have high tannin)
4. Are the notable regions correct?
5. Are the food pairings appropriate?

Return ONLY valid JSON:
{
  "approved": true/false,
  "corrections": {
    // only include fields that need correction, same structure as input
  },
  "notes": "brief explanation of any corrections"
}`;

  const text = await callClaude(apiKey, prompt);
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`Failed to parse fact-check for ${grape.nameEn}`);
  }
  return JSON.parse(jsonMatch[0]) as FactCheckResult;
}

// ---------------------------------------------------------------------------
// Agent 3 - Final Merger & DB writer
// ---------------------------------------------------------------------------

async function mergeAndUpsert(
  grape: GrapeMaster,
  generated: GeneratedGrapeData,
  factCheck: FactCheckResult
): Promise<void> {
  // Merge corrections into generated data if fact checker provided any
  const final: GeneratedGrapeData = { ...generated };

  if (!factCheck.approved && factCheck.corrections) {
    const corrections = factCheck.corrections;
    if (corrections.origin_country) final.origin_country = corrections.origin_country;
    if (corrections.origin_region) final.origin_region = corrections.origin_region;
    if (corrections.description_ja) final.description_ja = corrections.description_ja;
    if (corrections.characteristics) final.characteristics = corrections.characteristics;
    if (corrections.typical_aromas) final.typical_aromas = corrections.typical_aromas;
    if (corrections.typical_palate) final.typical_palate = corrections.typical_palate;
    if (corrections.food_pairings) final.food_pairings = corrections.food_pairings;
    if (corrections.notable_regions) final.notable_regions = corrections.notable_regions;
  }

  // Upsert into grape_varieties table
  await upsertGrape({
    name_en: grape.nameEn,
    name_ja: grape.nameJa,
    aliases: grape.aliases,
    is_red: grape.isRed,
    origin_country: final.origin_country,
    origin_region: final.origin_region,
    description_ja: final.description_ja,
    characteristics: final.characteristics,
    typical_aromas: final.typical_aromas,
    typical_palate: final.typical_palate,
    food_pairings: final.food_pairings,
    notable_regions: final.notable_regions,
  });
}

// ---------------------------------------------------------------------------
// Utility: delay helper
// ---------------------------------------------------------------------------

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Utility: deduplicate GRAPE_MASTER by name_en
// ---------------------------------------------------------------------------

function deduplicateGrapes(grapes: GrapeMaster[]): GrapeMaster[] {
  const seen = new Set<string>();
  return grapes.filter((g) => {
    const key = g.nameEn.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // Auth check: require Bearer token matching SUPABASE_SERVICE_ROLE_KEY
  const serviceKey = getServiceRoleKey();
  if (!serviceKey) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY not configured on server" },
      { status: 500 }
    );
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${serviceKey}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Ensure Anthropic API key is available
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 }
    );
  }

  // Deduplicate grapes (known duplicate: "Cinsault")
  const grapes = deduplicateGrapes(GRAPE_MASTER);

  const summary = {
    total: grapes.length,
    seeded: 0,
    errors: 0,
    factCheckCorrections: 0,
  };
  const errorDetails: { grape: string; error: string }[] = [];

  // Process in batches of 5
  const BATCH_SIZE = 5;

  for (let i = 0; i < grapes.length; i += BATCH_SIZE) {
    const batch = grapes.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map(async (grape) => {
        // Agent 1: Generate data
        const generated = await generateGrapeData(apiKey, grape);

        // Agent 2: Fact-check generated data
        const factCheck = await factCheckGrapeData(apiKey, grape, generated);

        if (!factCheck.approved) {
          summary.factCheckCorrections++;
        }

        // Agent 3: Merge corrections and upsert into DB
        await mergeAndUpsert(grape, generated, factCheck);

        console.log(`[seed] Seeded grape: ${grape.nameEn}`);
      })
    );

    // Tally successes and failures
    for (let j = 0; j < results.length; j++) {
      const result = results[j];
      if (result.status === "fulfilled") {
        summary.seeded++;
      } else {
        summary.errors++;
        const grapeName = batch[j].nameEn;
        const errMsg =
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason);
        errorDetails.push({ grape: grapeName, error: errMsg });
        console.error(`[seed] Failed to seed grape ${grapeName}:`, errMsg);
      }
    }

    // Rate-limit pause between batches (skip after the last batch)
    if (i + BATCH_SIZE < grapes.length) {
      await delay(1000);
    }
  }

  return NextResponse.json({
    ...summary,
    ...(errorDetails.length > 0 ? { errorDetails } : {}),
  });
}

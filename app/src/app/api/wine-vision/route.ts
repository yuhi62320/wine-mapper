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
                text: `You are an expert sommelier analyzing a wine label photo. Extract ALL information visible on the label AND supplement with your wine knowledge.

Return ONLY a valid JSON object (no markdown, no backticks, no explanation) with this exact structure:

{
  "label": {
    "producer": "<producer/domaine/château name as printed>",
    "name": "<wine name / cuvée name, empty string if same as producer>",
    "country": "<country of origin in English, e.g. France, Italy>",
    "region": "<wine region, e.g. Bordeaux, Tuscany>",
    "subRegion": "<sub-region if visible, e.g. Médoc, Côte de Nuits>",
    "village": "<village/commune if visible, e.g. Pauillac, Chambolle-Musigny, Barolo>",
    "vintage": <year as number or null>,
    "appellation": "<appellation system: AOC, AOP, DOCG, DOC, DO, etc.>",
    "classification": "<quality tier: Grand Cru, Premier Cru, Reserva, etc.>",
    "abv": <alcohol % as number or null>,
    "volume": <volume in ml as number or null>,
    "bottler": "<bottling info if visible>",
    "grapeVarieties": ["<grape variety 1>", "<grape variety 2>"],
    "aging": "<aging notation if visible: Reserva, Barrique, etc.>",
    "tasteType": "<taste type if visible: Brut, Sec, Doux, etc.>",
    "certifications": ["<any certifications, medals, organic, etc.>"],
    "type": "<red|white|rose|sparkling|fortified|dessert|orange>"
  },
  "knowledge": {
    "priceRange": { "min": <JPY number>, "max": <JPY number> },
    "aromas": ["<select up to 10 from the ALLOWED AROMAS list below, in Japanese>"],
    "palate": {
      "sweetness": <1-5>,
      "acidity": <1-5>,
      "tannin": <1-5 or null if white/sparkling>,
      "body": <1-5>,
      "finish": <1-5>
    },
    "grapeBaseAromas": ["<typical aromas of this grape variety from the ALLOWED AROMAS list, in Japanese>"],
    "grapeBasePalate": {
      "sweetness": <1-5>,
      "acidity": <1-5>,
      "tannin": <1-5 or null>,
      "body": <1-5>,
      "finish": <1-5>
    },
    "description": "<1-2 sentence Japanese description of this wine's character>",
    "producerUrl": "<producer's website URL if known, empty string if unknown>",
    "confidence": "high" | "medium" | "low"
  }
}

ALLOWED AROMAS (select ONLY from this list):
${AROMA_LIST_FOR_PROMPT}

IMPORTANT RULES:
- For aromas and grapeBaseAromas: ONLY use items from the ALLOWED AROMAS list above. Do NOT invent new descriptors.
- For grapeVarieties: If not on label, use your knowledge to fill in the likely varieties
- For region/subRegion/village: Infer from appellation. Example: "Pauillac" → region: "Bordeaux", subRegion: "Médoc", village: "Pauillac". "Chambolle-Musigny" → region: "Burgundy", subRegion: "Côte de Nuits", village: "Chambolle-Musigny"
- For price: Use Japanese retail market prices in JPY
- grapeBaseAromas/grapeBasePalate: These represent the TYPICAL profile of the grape variety (not this specific wine)
- For type: Infer from the label, color clues, grape variety, or region
- Always return the producer name EXACTLY as it appears on the label (preserve French/Italian/etc. spelling)
- country must be in English (France, Italy, Spain, etc.)`,
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Anthropic Vision API error:", res.status, errBody);
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
        { error: "Failed to parse response", raw: text },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Wine vision error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Vision analysis failed" },
      { status: 500 }
    );
  }
}

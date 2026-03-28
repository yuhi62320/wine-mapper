import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

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
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: `You are a sommelier with encyclopedic wine knowledge. Given the following wine, return ONLY a valid JSON object (no markdown, no explanation) with specific information about THIS wine (not generic grape/region info).

Wine:
${wineDescription}

Return this exact JSON structure:
{
  "priceRange": { "min": <number in JPY>, "max": <number in JPY> },
  "aromas": [<up to 8 Japanese aroma descriptors specific to this wine, e.g. "カシス", "ヴァニラ", "黒胡椒">],
  "palate": {
    "sweetness": <1-5>,
    "acidity": <1-5>,
    "tannin": <1-5 or null if white/sparkling>,
    "body": <1-5>,
    "finish": <1-5>
  },
  "description": "<1-2 sentence Japanese description of this specific wine's character>",
  "suggestedGrapes": [<grape variety names if not provided, otherwise empty array>],
  "suggestedAbv": <typical ABV as number or null>,
  "confidence": "high" | "medium" | "low"
}

Be specific to the actual wine, not generic. If the producer is famous (e.g., Château Margaux), reflect its unique style. Price should reflect Japanese retail market.`,
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
    return NextResponse.json(data);
  } catch (err) {
    console.error("Wine lookup error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lookup failed" },
      { status: 500 }
    );
  }
}

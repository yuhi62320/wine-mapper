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
  const { producer, wineName, country, region, subRegion, village, grapeVarieties } = body;

  const location = [village, subRegion, region, country].filter(Boolean).join(", ");
  const wineContext = [producer, wineName].filter(Boolean).join(" - ");
  const grapeContext = grapeVarieties?.length ? `品種: ${grapeVarieties.join(", ")}` : "";

  if (!location && !wineContext) {
    return NextResponse.json({ error: "Wine or location info required" }, { status: 400 });
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
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `あなたはワイン旅行の専門家です。以下のワイン/産地に関連する旅行プランやツアー情報を教えてください。

ワイン: ${wineContext}
産地: ${location}
${grapeContext}

以下のJSON形式で返してください（markdownやバッククォートなし、JSONのみ）:

{
  "tours": [
    {
      "title": "<ツアー/プラン名（日本語）>",
      "description": "<詳しい内容説明。何が体験できるか。2-3文>",
      "type": "<'winery_visit' | 'wine_tour' | 'food_pairing' | 'harvest_experience' | 'city_tour' | 'accommodation'>",
      "location": "<具体的な場所>",
      "duration": "<所要時間や日数>",
      "bestSeason": "<おすすめ時期>",
      "priceRange": "<目安の価格帯>",
      "highlights": ["<見どころ1>", "<見どころ2>", "<見どころ3>"],
      "bookingTip": "<予約のコツや注意点>",
      "imageKeyword": "<e.g. 'wine tasting chateau Bordeaux'>"
    }
  ],
  "travelTips": "<この産地を訪れる際の総合的なアドバイス。アクセス方法、ベストシーズン、マナーなど。3-4文>",
  "nearbyAttractions": ["<周辺の観光名所1>", "<周辺の観光名所2>", "<周辺の観光名所3>"]
}

5-8件のツアー/プランを提案してください。実際に体験できそうな具体的な内容にしてください。
ワイナリー見学、テイスティングツアー、収穫体験、フードペアリングディナー、宿泊付きプランなど多様に含めてください。`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Tour search API error:", res.status, errBody);
      return NextResponse.json({ error: `API error: ${res.status}` }, { status: 500 });
    }

    const apiResult = await res.json();
    const text =
      apiResult.content?.[0]?.type === "text" ? apiResult.content[0].text : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse response" }, { status: 500 });
    }

    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Tour search error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}

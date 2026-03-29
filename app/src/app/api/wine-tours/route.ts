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
    // Use Claude with web_search tool for real tour info
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 3000,
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",
            max_uses: 3,
          },
        ],
        messages: [
          {
            role: "user",
            content: `あなたはワイン旅行の専門家です。以下のワイン/産地に関連する実際のツアー情報を調べてください。

ワイン: ${wineContext}
産地: ${location}
${grapeContext}

以下の手順で情報を集めてください:
1. まずWinalist.comでこの地域/ワイナリーのツアーを検索してください
2. 次にAirbnb体験でこの地域のワイン体験を検索してください
3. ワイナリーの公式サイトで見学情報を確認してください

取得した情報を元に、以下のJSON形式で返してください（markdownやバッククォートなし、JSONのみ）:

{
  "tours": [
    {
      "title": "<ツアー/プラン名（日本語）>",
      "description": "<詳しい内容説明。何が体験できるか。実際のツアー内容を反映。3-4文>",
      "type": "<'winery_visit' | 'wine_tour' | 'food_pairing' | 'harvest_experience' | 'city_tour' | 'accommodation'>",
      "location": "<具体的な場所>",
      "duration": "<所要時間>",
      "bestSeason": "<おすすめ時期>",
      "priceRange": "<目安の価格帯（現地通貨と円換算）>",
      "highlights": ["<見どころ1>", "<見どころ2>", "<見どころ3>"],
      "bookingTip": "<予約のコツや注意点>",
      "sourceUrl": "<情報元のURL（Winalist, Airbnb, 公式サイト等）>",
      "source": "<'winalist' | 'airbnb' | 'official' | 'knowledge'>"
    }
  ],
  "travelTips": "<この産地を訪れる際の総合的なアドバイス。アクセス、ベストシーズン、持ち物、マナー、モデルコース。5-6文>",
  "nearbyAttractions": [
    {
      "name": "<観光名所名>",
      "description": "<簡単な説明>",
      "distanceFromRegion": "<産地からの距離/所要時間>"
    }
  ],
  "externalLinks": {
    "winalistUrl": "<Winalistの検索結果URL>",
    "airbnbUrl": "<Airbnb体験の検索結果URL>",
    "officialTourUrl": "<ワイナリー公式ツアーページURL>"
  }
}

5-8件のツアー/プランを提案してください。Web検索で見つかった実際のツアーを優先し、見つからない場合は知識ベースで補完してください。
価格情報は実際の情報を反映してください。`,
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

    // Extract text from potentially multi-block response (web_search returns multiple content blocks)
    let fullText = "";
    for (const block of apiResult.content || []) {
      if (block.type === "text") {
        fullText += block.text;
      }
    }

    // Clean cite tags from web search
    fullText = fullText.replace(/<\/?cite[^>]*>/g, "");

    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
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

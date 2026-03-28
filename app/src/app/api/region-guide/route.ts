import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import {
  buildRegionLookupKey,
  getCachedRegion,
  setCachedRegion,
} from "@/lib/supabase-cache";

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
  const { country, region, subRegion, village, grapeVarieties } = body;

  const location = [village, subRegion, region, country]
    .filter(Boolean)
    .join(", ");

  if (!location) {
    return NextResponse.json(
      { error: "At least country is required" },
      { status: 400 }
    );
  }

  // Build cache lookup key from region hierarchy
  const lookupKey = buildRegionLookupKey({
    country: country ?? "",
    region: region ?? "",
    subRegion,
    village,
  });

  // Check for force refresh flag
  const forceRefresh = req.nextUrl.searchParams.get("force") === "true";

  // Cache-first: return cached data if available
  if (!forceRefresh) {
    try {
      const cached = await getCachedRegion(lookupKey);
      if (cached) {
        return NextResponse.json(cached.guide_data);
      }
    } catch (err) {
      console.error("[region-guide] Cache read error:", err);
    }
  }

  const grapeContext = grapeVarieties?.length
    ? `このワインの品種: ${grapeVarieties.join(", ")}`
    : "";

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
        max_tokens: 2500,
        messages: [
          {
            role: "user",
            content: `あなたはソムリエであり、ワイン産地の旅行ガイドでもあります。
以下のワイン産地について、ワイン愛好家・ソムリエ試験学習者・旅行愛好家が興味を持つ、詳細で具体的な情報を日本語で教えてください。

産地: ${location}
${grapeContext}

以下のJSON形式で返してください（markdownやバッククォートなし、JSONのみ）:

{
  "regionName": "<地域名（日本語）>",
  "heroImage": "<single English keyword phrase for hero landscape, e.g. 'Bordeaux vineyard sunset'>",
  "terroir": {
    "text": "<テロワール解説: 気候・土壌・標高・地形の特徴。なぜこの地で良いワインが生まれるのか。具体的な土壌成分や標高数値を含めて。4-5文>",
    "imageKeyword": "<e.g. 'limestone soil vineyard'>"
  },
  "climate": {
    "text": "<気候の詳細: 大陸性/海洋性/地中海性の区分、年間降水量、日照時間、気温差、ヴィンテージへの影響。具体的な数値を含めて。4-5文>",
    "imageKeyword": "<e.g. 'vineyard morning mist'>"
  },
  "history": {
    "text": "<歴史: この産地のワイン造りの歴史的背景。ローマ時代、修道院、近代化、重要な出来事と年号を含めて。4-5文>",
    "imageKeyword": "<e.g. 'medieval monastery winery'>"
  },
  "keyStyles": {
    "text": "<主要スタイル: この地域で最も有名なワインのスタイル、使用品種、特徴的な醸造法。具体的なワイン名を含めて。4-5文>",
    "imageKeyword": "<e.g. 'red wine barrel cellar'>"
  },
  "topProducers": {
    "text": "<著名な生産者5-10名とその特徴。各生産者の代表的なワインやスタイルの違いを含めて。4-5文>",
    "imageKeyword": "<e.g. 'famous winery estate'>"
  },
  "foodPairing": {
    "text": "<地元の料理とのペアリング: 郷土料理との具体的な組み合わせ、なぜ合うのかの理由も含めて。4-5文>",
    "imageKeyword": "<e.g. 'french cuisine wine pairing'>"
  },
  "visitTips": {
    "text": "<旅行情報: ワイナリー訪問のベストシーズン、予約の要否、見どころ、周辺の観光地、アクセス方法。4-5文>",
    "imageKeyword": "<e.g. 'wine tourism chateau'>"
  },
  "regulations": {
    "text": "<AOC/DOCG規定、許可品種、最低熟成期間、収量制限、品質階層など法規の詳細。3-4文>",
    "imageKeyword": "<e.g. 'wine label appellation'>"
  },
  "sommNotes": {
    "text": "<ソムリエ試験ポイント: この産地で押さえるべき格付け、主要AOC/DOCG、覚えるべき品種や法規、試験頻出のトピック。4-5文>",
    "imageKeyword": "<e.g. 'sommelier wine tasting'>"
  },
  "funFact": {
    "text": "<豆知識: ソムリエ試験に出そうなトリビアや、話のネタになる面白い事実。歴史的エピソードや数字を含めて。3-4文>",
    "imageKeyword": "<e.g. 'ancient wine cellar'>"
  },
  "vintageGuide": {
    "text": "<近年の優良ヴィンテージとその特徴。過去20年程度のグレートヴィンテージと、各年の気候条件やワインの特徴。3-4文>",
    "imageKeyword": "<e.g. 'wine vintage bottles'>"
  }
}

具体的で実用的な情報を。一般的すぎる記述は避けて。数字、固有名詞、具体的なワイン名を積極的に含めてください。`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Region guide API error:", res.status, errBody);
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

    // Fire-and-forget: save result to cache
    setCachedRegion({
      lookupKey,
      country: country ?? "",
      region: region ?? "",
      subRegion,
      village,
      guideData: data,
    }).catch((err) =>
      console.error("[region-guide] Cache write error:", err)
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error("Region guide error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}

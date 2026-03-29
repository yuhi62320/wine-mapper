import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import {
  buildRegionLookupKey,
  getCachedRegion,
  setCachedRegion,
  updateCachedRegion,
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

const REQUIRED_GUIDE_FIELDS = [
  "terroir", "climate", "history", "keyStyles", "topProducers",
  "foodPairing", "visitTips", "regulations", "sommNotes", "funFact", "vintageGuide",
];

function hasGaps(cached: Record<string, unknown>): string[] {
  const gaps: string[] = [];
  const guide = cached.guide_data as Record<string, unknown> | null;
  if (!guide) {
    gaps.push("guideData");
    return gaps;
  }
  for (const f of REQUIRED_GUIDE_FIELDS) {
    const val = guide[f];
    if (!val) {
      gaps.push(f);
    } else if (typeof val === "object" && val !== null && "text" in (val as Record<string, unknown>)) {
      if (!(val as Record<string, unknown>).text) gaps.push(f);
    }
  }
  if (!cached.tour_data) gaps.push("tourData");
  return gaps;
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

  const lookupKey = buildRegionLookupKey({
    country: country ?? "",
    region: region ?? "",
    subRegion,
    village,
  });

  const forceRefresh = req.nextUrl.searchParams.get("force") === "true";

  // Cache-first: check Supabase
  let cached: Record<string, unknown> | null = null;
  if (!forceRefresh) {
    try {
      cached = await getCachedRegion(lookupKey) as Record<string, unknown> | null;
    } catch (err) {
      console.error("[region-guide] Cache read error:", err);
    }

    // If cached and complete, return immediately
    if (cached) {
      const gaps = hasGaps(cached);
      if (gaps.length === 0) {
        // Merge guide_data and tour_data at top level for client
        const guide = cached.guide_data as Record<string, unknown>;
        const tour = cached.tour_data as Record<string, unknown> | null;
        return NextResponse.json({ ...guide, tourData: tour });
      }
      console.log(`[region-guide] Cache hit for "${location}" but has gaps:`, gaps);
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
        max_tokens: 3500,
        messages: [
          {
            role: "user",
            content: `あなたはソムリエであり、ワイン産地の旅行ガイドでもあります。
以下のワイン産地について、ワイン愛好家が「行ってみたい！」と思うような、詳細で魅力的な情報を日本語で教えてください。

産地: ${location}
${grapeContext}

以下のJSON形式で返してください（markdownやバッククォートなし、JSONのみ）:

{
  "regionName": "<地域名（日本語）>",
  "heroImage": "<single English keyword phrase for hero landscape, e.g. 'Bordeaux vineyard sunset'>",
  "description": "<この産地の魅力を伝える導入文。ワイン好きの心をつかむ表現で。5-6文>",
  "terroir": {
    "text": "<テロワール解説: 気候・土壌・標高・地形。具体的数値と「だからこのワインが生まれる」理由を。5-6文>",
    "imageKeyword": "<e.g. 'limestone soil vineyard'>"
  },
  "climate": {
    "text": "<気候の詳細: 大陸性/海洋性/地中海性、降水量、日照時間、気温差。4-5文>",
    "imageKeyword": "<e.g. 'vineyard morning mist'>"
  },
  "history": {
    "text": "<歴史: ワイン造りの歴史的背景。ローマ時代からの年表的要素と、ドラマティックなエピソード。5-6文>",
    "imageKeyword": "<e.g. 'medieval monastery winery'>"
  },
  "keyStyles": {
    "text": "<主要スタイル: 最も有名なワインスタイル、品種、醸造法。具体的ワイン名を含めて。4-5文>",
    "imageKeyword": "<e.g. 'red wine barrel cellar'>"
  },
  "topProducers": {
    "text": "<著名な生産者5-10名とその特徴。代表ワイン、スタイル、価格帯の違いを含めて。5-6文>",
    "imageKeyword": "<e.g. 'famous winery estate'>"
  },
  "foodPairing": {
    "text": "<地元の料理とのペアリング: 郷土料理との具体的な組み合わせとその理由。地元レストランの情報も。5-6文>",
    "imageKeyword": "<e.g. 'french cuisine wine pairing'>"
  },
  "visitTips": {
    "text": "<旅行情報: ベストシーズン、アクセス方法、予約の要否、モデルコース、宿泊エリア。ワイン旅行者目線で具体的に。5-6文>",
    "imageKeyword": "<e.g. 'wine tourism chateau'>"
  },
  "regulations": {
    "text": "<AOC/DOCG規定、許可品種、熟成期間、品質階層の詳細。3-4文>",
    "imageKeyword": "<e.g. 'wine label appellation'>"
  },
  "sommNotes": {
    "text": "<ソムリエ試験ポイント: 格付け、主要AOC/DOCG、覚えるべき品種や法規。4-5文>",
    "imageKeyword": "<e.g. 'sommelier wine tasting'>"
  },
  "funFact": {
    "text": "<豆知識: 意外な事実やトリビア。数字やエピソードを含めて。3-4文>",
    "imageKeyword": "<e.g. 'ancient wine cellar'>"
  },
  "vintageGuide": {
    "text": "<近年の優良ヴィンテージと特徴。過去20年のグレートヴィンテージ。3-4文>",
    "imageKeyword": "<e.g. 'wine vintage bottles'>"
  },
  "tourData": {
    "tours": [
      {
        "title": "<ツアー/体験名>",
        "description": "<内容詳細。2-3文>",
        "type": "<'winery_visit' | 'wine_tour' | 'food_pairing' | 'harvest_experience' | 'city_tour' | 'accommodation'>",
        "location": "<具体的な場所>",
        "duration": "<所要時間>",
        "bestSeason": "<おすすめ時期>",
        "priceRange": "<価格帯の目安>",
        "highlights": ["<見どころ1>", "<見どころ2>"],
        "bookingTip": "<予約のコツ>"
      }
    ],
    "travelTips": "<旅行総合アドバイス。アクセス、ベストシーズン、マナー、周遊ルート。4-5文>",
    "nearbyAttractions": ["<周辺観光名所1>", "<周辺観光名所2>", "<周辺観光名所3>"],
    "winalistSearchQuery": "<Winalist.comでの検索キーワード（英語）>",
    "airbnbSearchQuery": "<Airbnb体験での検索キーワード（英語）>"
  }
}

重要：
- 3-5件のツアー/体験を含めてください（多様なタイプで）
- ユーザーが「行ってみたい！」と思うような、具体的で魅力的な情報を
- 数字、固有名詞、具体的なワイン名を積極的に含めてください`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Region guide API error:", res.status, errBody);
      if (cached) {
        const guide = cached.guide_data as Record<string, unknown>;
        return NextResponse.json({ ...guide, tourData: cached.tour_data });
      }
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
      if (cached) {
        const guide = cached.guide_data as Record<string, unknown>;
        return NextResponse.json({ ...guide, tourData: cached.tour_data });
      }
      return NextResponse.json(
        { error: "Failed to parse response" },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonMatch[0]);

    // Separate tourData from guideData
    const { tourData, ...guideData } = data;

    if (cached) {
      // Merge: keep existing non-empty fields, fill gaps
      const existingGuide = (cached.guide_data as Record<string, unknown>) || {};
      const existingTour = (cached.tour_data as Record<string, unknown>) || {};
      const mergedGuide = { ...guideData };
      for (const [k, v] of Object.entries(existingGuide)) {
        if (v) mergedGuide[k] = v;
      }
      const mergedTour = { ...tourData, ...Object.fromEntries(
        Object.entries(existingTour).filter(([, v]) => v)
      )};

      updateCachedRegion(lookupKey, {
        guide_data: mergedGuide,
        tour_data: mergedTour,
      }).catch((err) =>
        console.error("[region-guide] Cache update error:", err)
      );

      return NextResponse.json({ ...mergedGuide, tourData: mergedTour });
    }

    // New entry: cache full result
    setCachedRegion({
      lookupKey,
      country: country ?? "",
      region: region ?? "",
      subRegion,
      village,
      guideData,
      tourData,
    }).catch((err) =>
      console.error("[region-guide] Cache write error:", err)
    );

    return NextResponse.json({ ...guideData, tourData });
  } catch (err) {
    console.error("Region guide error:", err);
    if (cached) {
      const guide = cached.guide_data as Record<string, unknown>;
      return NextResponse.json({ ...guide, tourData: cached.tour_data });
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}

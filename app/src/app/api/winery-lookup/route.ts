import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import {
  buildWineryLookupKey,
  getCachedWinery,
  setCachedWinery,
  updateCachedWinery,
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

// Fields that should be present in a complete winery record
const REQUIRED_GUIDE_FIELDS = ["history", "philosophy", "signatureWines", "terroir", "visitInfo", "funFact"];
const REQUIRED_TOUR_FIELDS = ["tours", "travelTips"];

function hasGaps(cached: Record<string, unknown>): string[] {
  const gaps: string[] = [];
  if (!cached.description) gaps.push("description");
  if (!cached.website) gaps.push("website");
  if (!cached.lat || !cached.lng) gaps.push("coordinates");
  const guide = cached.guide_data as Record<string, unknown> | null;
  if (!guide) {
    gaps.push("guideData");
  } else {
    for (const f of REQUIRED_GUIDE_FIELDS) {
      if (!guide[f]) gaps.push(`guideData.${f}`);
    }
  }
  const tour = cached.tour_data as Record<string, unknown> | null;
  if (!tour) {
    gaps.push("tourData");
  } else {
    for (const f of REQUIRED_TOUR_FIELDS) {
      if (!tour[f]) gaps.push(`tourData.${f}`);
    }
  }
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
  const { producer, country, region, subRegion, village, grapeVarieties } = body;

  if (!producer) {
    return NextResponse.json(
      { error: "producer is required" },
      { status: 400 }
    );
  }

  const lookupKey = buildWineryLookupKey(producer);

  // Cache-first: check Supabase
  let cached: Record<string, unknown> | null = null;
  try {
    cached = await getCachedWinery(lookupKey) as Record<string, unknown> | null;
  } catch (err) {
    console.error("[winery-lookup] Cache read error:", err);
  }

  // If cached and complete, return immediately
  if (cached) {
    const gaps = hasGaps(cached);
    if (gaps.length === 0) {
      return NextResponse.json(cached);
    }
    // Has gaps - will fill them below but return cached data merged with AI result
    console.log(`[winery-lookup] Cache hit for "${producer}" but has gaps:`, gaps);
  }

  // Build location context
  const locationParts = [village, subRegion, region, country].filter(Boolean);
  const locationStr = locationParts.length > 0 ? locationParts.join(", ") : "";
  const grapeStr = grapeVarieties?.length > 0 ? grapeVarieties.join(", ") : "";

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
        max_tokens: 3000,
        messages: [
          {
            role: "user",
            content: `あなたはワインのソムリエであり、世界中のワイナリーに精通した旅行ガイドの専門家です。
以下のワイン生産者（ワイナリー）について、詳細な情報を調べて日本語で教えてください。
ユーザーが「実際に行ってみたい」と思うような魅力的で具体的な情報をお願いします。

生産者名: ${producer}
${locationStr ? `所在地ヒント: ${locationStr}` : ""}
${grapeStr ? `主要品種: ${grapeStr}` : ""}

以下のJSON形式で返してください（markdownやバッククォートなし、JSONのみ）:

{
  "name": "<正式な生産者名（原語）>",
  "nameJa": "<日本語名>",
  "country": "<国名（英語）>",
  "region": "<ワイン産地名（英語）>",
  "subRegion": "<サブ地域（英語、該当なければ空文字）>",
  "village": "<村名（英語、該当なければ空文字）>",
  "lat": <ワイナリー建物の正確な緯度（数値、小数点以下4桁）。不明ならnull>,
  "lng": <ワイナリー建物の正確な経度（数値、小数点以下4桁）。不明ならnull>,
  "website": "<公式サイトURL（不明なら空文字）>",
  "description": "<ワイナリーの概要。歴史と特徴、代表ワイン、訪問の魅力を含めて5-6文で。「行ってみたい」と思わせる文体で>",
  "guideData": {
    "history": "<創業の歴史、重要な出来事、何世代にわたるか等。創業者の情熱やストーリーを含めて。5-6文>",
    "philosophy": "<醸造哲学、ビオ/ビオディナミ/自然派等のアプローチ、テロワール重視の姿勢等。具体的な取り組み内容を含めて。3-4文>",
    "signatureWines": "<代表的なワイン3-5本の名前と簡単な特徴。価格帯や受賞歴も含めて>",
    "terroir": "<ワイナリーの畑の土壌、標高、向き、気候条件等。具体的な数値を含めて。3-4文>",
    "visitInfo": "<見学情報：予約方法、テイスティング料金、営業時間、所要時間、言語対応、駐車場、アクセス方法。できるだけ具体的に。不明なら「公式サイトで要確認」>",
    "funFact": "<豆知識やトリビア。ワイン好きが「へぇ！」と思う意外な事実。2-3文>",
    "atmosphere": "<ワイナリーの雰囲気。建築スタイル、周辺の景色、テイスティングルームの様子など。訪問者目線で。3-4文>",
    "bestTimeToVisit": "<訪問のベストシーズンとその理由。収穫期、イベント時期なども含めて。2-3文>",
    "nearbyAttractions": "<周辺の観光スポット、レストラン、宿泊施設等。ワイナリー訪問と組み合わせられるもの。3-4文>"
  },
  "tourData": {
    "tours": [
      {
        "title": "<ツアー/体験名>",
        "description": "<内容の詳細。2-3文>",
        "type": "<'winery_visit' | 'wine_tour' | 'food_pairing' | 'harvest_experience'>",
        "duration": "<所要時間>",
        "priceRange": "<価格帯の目安>",
        "highlights": ["<見どころ1>", "<見どころ2>"],
        "bookingTip": "<予約のコツ>"
      }
    ],
    "travelTips": "<この地域への旅行アドバイス。空港からのアクセス、レンタカーの要否、周遊ルートなど。3-4文>",
    "officialTourUrl": "<公式サイトの見学/ツアーページURL。不明なら空文字>",
    "winalistUrl": "<WinalistでのページURL（存在する場合）。不明なら空文字>",
    "airbnbExperienceUrl": "<Airbnb体験でのURL（存在する場合）。不明なら空文字>"
  }
}

重要：
- 緯度・経度はワイナリーの建物・敷地の正確な座標を。確信できない場合はnull
- 2-3件のツアー/体験を含めてください
- ユーザーが「行ってみたい！」と思うような、具体的で魅力的な情報を心がけてください`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Winery lookup API error:", res.status, errBody);
      // If we have cached data (even incomplete), return it
      if (cached) return NextResponse.json(cached);
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
      if (cached) return NextResponse.json(cached);
      return NextResponse.json(
        { error: "Failed to parse response" },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonMatch[0]);

    // Verify website URL is reachable
    if (data.website) {
      try {
        const urlCheck = await fetch(data.website, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(5000),
        });
        if (!urlCheck.ok) {
          data.website = "";
        }
      } catch {
        data.website = "";
      }
    }

    // If we had cached data, merge (keep cached non-empty fields, fill gaps from AI)
    if (cached) {
      const mergedGuide = {
        ...(data.guideData || {}),
        ...Object.fromEntries(
          Object.entries((cached.guide_data as Record<string, unknown>) || {}).filter(([, v]) => v)
        ),
      };
      const mergedTour = {
        ...(data.tourData || {}),
        ...Object.fromEntries(
          Object.entries((cached.tour_data as Record<string, unknown>) || {}).filter(([, v]) => v)
        ),
      };

      // Update cache with filled gaps
      updateCachedWinery(lookupKey, {
        guide_data: mergedGuide,
        tour_data: mergedTour,
        ...(data.website && !cached.website ? { website: data.website } : {}),
        ...(data.description && !cached.description ? { description: data.description } : {}),
      }).catch((err) =>
        console.error("[winery-lookup] Cache update error:", err)
      );

      // Return merged data
      const merged = {
        ...cached,
        guide_data: mergedGuide,
        tour_data: mergedTour,
        description: cached.description || data.description,
        website: cached.website || data.website,
      };
      return NextResponse.json(merged);
    }

    // New entry: cache the full result
    setCachedWinery({
      lookupKey,
      name: data.name || producer,
      nameJa: data.nameJa,
      country: data.country || country || "",
      region: data.region || region,
      subRegion: data.subRegion || subRegion,
      village: data.village || village,
      lat: data.lat,
      lng: data.lng,
      website: data.website,
      description: data.description,
      guideData: data.guideData,
      tourData: data.tourData,
    }).catch((err) =>
      console.error("[winery-lookup] Cache write error:", err)
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error("Winery lookup error:", err);
    if (cached) return NextResponse.json(cached);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}

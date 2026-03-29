import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import {
  buildWineryLookupKey,
  getCachedWinery,
  setCachedWinery,
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
  const { producer, country, region, subRegion, village, grapeVarieties } =
    body;

  if (!producer) {
    return NextResponse.json(
      { error: "producer is required" },
      { status: 400 }
    );
  }

  const lookupKey = buildWineryLookupKey(producer);

  // Cache-first
  try {
    const cached = await getCachedWinery(lookupKey);
    if (cached) {
      return NextResponse.json(cached);
    }
  } catch (err) {
    console.error("[winery-lookup] Cache read error:", err);
  }

  // Build location context for the prompt
  const locationParts = [village, subRegion, region, country].filter(Boolean);
  const locationStr = locationParts.length > 0 ? locationParts.join(", ") : "";
  const grapeStr =
    grapeVarieties?.length > 0 ? grapeVarieties.join(", ") : "";

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
            content: `あなたはワインのソムリエであり、世界中のワイナリーに精通した専門家です。
以下のワイン生産者（ワイナリー）について、詳細な情報を調べて日本語で教えてください。

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
  "description": "<ワイナリーの概要。歴史、特徴、代表的なワインなどを3-4文で日本語で>",
  "guideData": {
    "history": "<創業の歴史、重要な出来事、何世代にわたるか等。3-4文>",
    "philosophy": "<醸造哲学、ビオ/ビオディナミ/自然派等のアプローチ、テロワール重視の姿勢等。2-3文>",
    "signatureWines": "<代表的なワイン3-5本の名前と簡単な特徴>",
    "terroir": "<ワイナリーの畑の土壌、標高、向き、気候条件等。2-3文>",
    "visitInfo": "<見学情報：予約要否、テイスティング料、営業時間等。不明なら「要確認」>",
    "funFact": "<豆知識やトリビア。1-2文>"
  }
}

重要：緯度・経度はワイナリーの建物・敷地の正確な座標を返してください。地区やコミューンの中心座標は使用しないでください。正確な位置が確信できない場合は、latとlngをnullにしてください。`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("Winery lookup API error:", res.status, errBody);
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

    // Fire-and-forget: cache the result
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
    }).catch((err) =>
      console.error("[winery-lookup] Cache write error:", err)
    );

    return NextResponse.json(data);
  } catch (err) {
    console.error("Winery lookup error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}

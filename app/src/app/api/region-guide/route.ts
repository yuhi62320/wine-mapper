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
        max_tokens: 1200,
        messages: [
          {
            role: "user",
            content: `あなたはソムリエであり、ワイン産地の旅行ガイドでもあります。
以下のワイン産地について、ワイン愛好家・ソムリエ試験学習者・旅行愛好家が興味を持つ情報を日本語で教えてください。

産地: ${location}
${grapeContext}

以下のJSON形式で返してください（markdownやバッククォートなし、JSONのみ）:

{
  "regionName": "<地域名（日本語）>",
  "terroir": "<テロワール解説: 気候・土壌・標高・地形の特徴。なぜこの地で良いワインが生まれるのか。2-3文>",
  "history": "<歴史: この産地のワイン造りの歴史的背景。ローマ時代、修道院、近代化など。2-3文>",
  "keyStyles": "<主要スタイル: この地域で最も有名なワインのスタイルと特徴。2-3文>",
  "foodPairing": "<地元の料理とのペアリング: 郷土料理との組み合わせ。2-3文>",
  "visitTips": "<旅行情報: ワイナリー訪問のベストシーズン、見どころ、周辺の観光地。2-3文>",
  "funFact": "<豆知識: ソムリエ試験に出そうなトリビアや、話のネタになる面白い事実。1-2文>",
  "sommNotes": "<ソムリエ試験ポイント: この産地で押さえるべき格付け、主要AOC/DOCG、覚えるべき品種や法規。2-3文>"
}

具体的で実用的な情報を。一般的すぎる記述は避けて。`,
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
    return NextResponse.json(data);
  } catch (err) {
    console.error("Region guide error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}

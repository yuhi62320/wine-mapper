import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/rakuten-search?keyword=Opus+One+2018
 *
 * Server-side proxy for Rakuten Ichiba Item Search API.
 * Uses the new openapi endpoint with Referer header for auth.
 */

const RAKUTEN_API_URL =
  "https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20220601";

// Genre ID 510915 = ビール・洋酒 > ワイン
const WINE_GENRE_ID = "510915";

export interface RakutenItem {
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  shopName: string;
  imageUrl: string;
  reviewAverage: number;
  reviewCount: number;
}

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword");
  if (!keyword) {
    return NextResponse.json(
      { error: "keyword is required" },
      { status: 400 }
    );
  }

  const appId = process.env.NEXT_PUBLIC_RAKUTEN_APP_ID;
  const accessKey = process.env.NEXT_PUBLIC_RAKUTEN_ACCESS_KEY;
  if (!appId || !accessKey) {
    return NextResponse.json(
      { error: "Rakuten credentials not configured" },
      { status: 500 }
    );
  }

  const affiliateId = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID || "";

  // Use a domain registered in Allowed websites
  const refererUrl = "https://rakuten.co.jp/";

  const params = new URLSearchParams({
    applicationId: appId,
    accessKey: accessKey,
    keyword: keyword,
    genreId: WINE_GENRE_ID,
    hits: "5",
    sort: "standard",
    formatVersion: "2",
  });

  if (affiliateId) {
    params.set("affiliateId", affiliateId);
  }

  try {
    const res = await fetch(`${RAKUTEN_API_URL}?${params.toString()}`, {
      headers: {
        "Referer": refererUrl,
        "Origin": refererUrl.replace(/\/$/, ""),
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[rakuten-search] API error:", res.status, errText);
      return NextResponse.json(
        { error: `Rakuten API error: ${res.status}`, detail: errText },
        { status: 502 }
      );
    }

    const data = await res.json();
    const rawItems = data.Items || [];

    const items: RakutenItem[] = rawItems.map((item: any) => ({
      itemName: item.itemName || "",
      itemPrice: item.itemPrice || 0,
      itemUrl: item.affiliateUrl || item.itemUrl || "",
      shopName: item.shopName || "",
      imageUrl: (item.mediumImageUrls?.[0] || item.smallImageUrls?.[0] || "")
        .replace("?_ex=128x128", "?_ex=200x200"),
      reviewAverage: item.reviewAverage || 0,
      reviewCount: item.reviewCount || 0,
    }));

    return NextResponse.json({
      items,
      count: data.count || 0,
    });
  } catch (err) {
    console.error("[rakuten-search] Error:", err);
    return NextResponse.json(
      { error: "Failed to search Rakuten" },
      { status: 500 }
    );
  }
}

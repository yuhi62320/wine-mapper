"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { ChevronDown, ChevronUp, Star, Check, Sparkles, Camera, Loader2, Search } from "lucide-react";
import { WineType, WineLog, PalateLevel, WINE_TYPE_LABELS, WINE_TYPE_COLORS } from "@/lib/types";
import { AROMA_DATA } from "@/lib/aroma-data";
import { WINE_COUNTRIES } from "@/lib/countries";
import { addWine, LogResult } from "@/lib/store";
import { BADGES } from "@/lib/gamification";
import { ocrWineLabel, parseOcrText, searchOpenFoodFacts } from "@/lib/ocr";

const PALATE_LABELS: Record<string, { label: string; levels: string[] }> = {
  sweetness: {
    label: "甘さ",
    levels: ["辛口", "やや辛口", "中程度", "やや甘口", "甘口"],
  },
  acidity: {
    label: "酸味",
    levels: ["低い", "やや低い", "中程度", "やや高い", "高い"],
  },
  tannin: {
    label: "タンニン",
    levels: ["低い", "やや低い", "中程度", "やや高い", "高い"],
  },
  body: {
    label: "ボディ",
    levels: ["ライト", "やや軽め", "ミディアム", "やや重め", "フル"],
  },
  finish: {
    label: "余韻",
    levels: ["短い", "やや短い", "中程度", "やや長い", "長い"],
  },
};

export default function NewWinePage() {
  const router = useRouter();
  const [step, setStep] = useState<"basic" | "aroma" | "palate" | "result">("basic");

  // Basic info
  const [name, setName] = useState("");
  const [vintage, setVintage] = useState("");
  const [type, setType] = useState<WineType>("red");
  const [grapes, setGrapes] = useState("");
  const [producer, setProducer] = useState("");
  const [producerUrl, setProducerUrl] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [abv, setAbv] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  // Aroma
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Palate
  const [sweetness, setSweetness] = useState<PalateLevel>(3);
  const [acidity, setAcidity] = useState<PalateLevel>(3);
  const [tannin, setTannin] = useState<PalateLevel>(3);
  const [body, setBody] = useState<PalateLevel>(3);
  const [finish, setFinish] = useState<PalateLevel>(3);

  // Result
  const [logResult, setLogResult] = useState<LogResult | null>(null);

  // OCR / Auto-fill
  const [scanning, setScanning] = useState(false);
  const [searching, setSearching] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = WINE_COUNTRIES.find(
    (c) => c.name === country || c.nameJa === country
  );
  const regions = selectedCountry?.regions || [];

  function applyOcrData(data: { name?: string; vintage?: number | null; grapeVarieties?: string[]; producer?: string; country?: string; region?: string; abv?: number | null }) {
    if (data.name && !name) setName(data.name);
    if (data.vintage) setVintage(String(data.vintage));
    if (data.grapeVarieties?.length && !grapes) setGrapes(data.grapeVarieties.join(", "));
    if (data.producer && !producer) setProducer(data.producer);
    if (data.country) {
      const match = WINE_COUNTRIES.find(
        (c) => c.name.toLowerCase() === data.country!.toLowerCase()
      );
      if (match) setCountry(match.name);
    }
    if (data.region && !region) setRegion(data.region);
    if (data.abv) setAbv(String(data.abv));
  }

  async function handleScan(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setScanMessage("ラベルを読み取り中...");

    try {
      // Convert to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]); // Remove data:image/...;base64, prefix
        };
        reader.readAsDataURL(file);
      });

      // OCR
      const rawText = await ocrWineLabel(base64);
      if (!rawText) {
        setScanMessage("テキストを検出できませんでした");
        setScanning(false);
        return;
      }

      // Parse
      const parsed = parseOcrText(rawText);
      applyOcrData(parsed);
      setScanMessage(`読み取り完了！（${parsed.grapeVarieties.length > 0 ? parsed.grapeVarieties.join(", ") + " を検出" : "テキストを解析済み"}）`);
    } catch (err) {
      setScanMessage(`エラー: ${err instanceof Error ? err.message : "読み取りに失敗しました"}`);
    } finally {
      setScanning(false);
    }
  }

  async function handleAutoFill() {
    if (!name) return;
    setSearching(true);
    setScanMessage("ワイン情報を検索中...");

    try {
      const data = await searchOpenFoodFacts(name);
      if (data) {
        applyOcrData(data);
        setScanMessage("情報を補完しました！");
      } else {
        setScanMessage("該当するワインが見つかりませんでした");
      }
    } catch {
      setScanMessage("検索に失敗しました");
    } finally {
      setSearching(false);
    }
  }

  function toggleAroma(aroma: string) {
    setSelectedAromas((prev) =>
      prev.includes(aroma)
        ? prev.filter((a) => a !== aroma)
        : [...prev, aroma]
    );
  }

  function handleSubmit() {
    const wine: WineLog = {
      id: uuidv4(),
      name,
      vintage: vintage ? parseInt(vintage) : null,
      type,
      grapeVarieties: grapes
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      producer,
      producerUrl,
      country: selectedCountry?.name || country,
      region,
      subRegion: "",
      appellation: "",
      abv: abv ? parseFloat(abv) : null,
      price: price ? parseFloat(price) : null,
      aromas: selectedAromas,
      palate: {
        sweetness,
        acidity,
        tannin: type === "red" ? tannin : null,
        body,
        finish,
      },
      rating,
      notes,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    const result = addWine(wine);
    setLogResult(result);
    setStep("result");
  }

  // === RESULT SCREEN ===
  if (step === "result" && logResult) {
    return (
      <div className="px-4 pt-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🍷</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">記録完了！</h1>
          <p className="text-gray-500">{logResult.wine.name}</p>
        </div>

        {/* XP Gained */}
        <div className="bg-gradient-to-r from-[#722f37] to-[#9b4d55] rounded-xl p-5 mb-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} />
            <span className="font-bold text-lg">+{logResult.xpGained} XP</span>
          </div>
          {logResult.bonusReasons.map((r, i) => (
            <div key={i} className="text-sm text-white/80 ml-7">
              {r}
            </div>
          ))}
        </div>

        {/* Rank Up */}
        {logResult.rankUp && (
          <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl p-4 mb-4 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <div className="font-bold text-[#c9a84c]">ランクアップ！</div>
          </div>
        )}

        {/* New Badges */}
        {logResult.newBadges.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <div className="font-medium text-gray-700 mb-2">
              新しいバッジ獲得！
            </div>
            {logResult.newBadges.map((id) => {
              const badge = BADGES.find((b) => b.id === id);
              return badge ? (
                <div key={id} className="flex items-center gap-2 py-1">
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{badge.nameJa}</div>
                    <div className="text-xs text-gray-500">
                      {badge.description}
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full bg-[#722f37] text-white py-3 rounded-xl font-medium hover:bg-[#5a252c] transition-colors"
        >
          ホームに戻る
        </button>
      </div>
    );
  }

  // === AROMA STEP ===
  if (step === "aroma") {
    return (
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">香り（アロマ）</h1>
        <p className="text-sm text-gray-500 mb-4">
          感じた香りを選択してください（{selectedAromas.length}個選択中）
        </p>

        {/* Selected aromas */}
        {selectedAromas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedAromas.map((a) => (
              <button
                key={a}
                onClick={() => toggleAroma(a)}
                className="px-2.5 py-1 text-xs bg-[#722f37] text-white rounded-full"
              >
                {a} ✕
              </button>
            ))}
          </div>
        )}

        {/* Aroma categories */}
        <div className="space-y-2">
          {AROMA_DATA.map((cat) => (
            <div
              key={cat.name.en}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === cat.name.en ? null : cat.name.en
                  )
                }
                className="w-full flex items-center justify-between p-3 text-left"
              >
                <span className="font-medium text-gray-800">
                  {cat.name.ja}{" "}
                  <span className="text-xs text-gray-400">{cat.name.en}</span>
                </span>
                {expandedCategory === cat.name.en ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>
              {expandedCategory === cat.name.en && (
                <div className="px-3 pb-3 space-y-3">
                  {cat.subcategories.map((sub) => (
                    <div key={sub.name.en}>
                      <div className="text-xs font-medium text-gray-500 mb-1.5">
                        {sub.name.ja}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {sub.descriptors.map((d) => {
                          const isSelected = selectedAromas.includes(d.ja);
                          return (
                            <button
                              key={d.en}
                              onClick={() => toggleAroma(d.ja)}
                              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                                isSelected
                                  ? "bg-[#722f37] text-white border-[#722f37]"
                                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#722f37]/50"
                              }`}
                            >
                              {d.ja}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setStep("basic")}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium"
          >
            戻る
          </button>
          <button
            onClick={() => setStep("palate")}
            className="flex-1 py-3 rounded-xl bg-[#722f37] text-white font-medium hover:bg-[#5a252c] transition-colors"
          >
            次へ：味わい
          </button>
        </div>
      </div>
    );
  }

  // === PALATE STEP ===
  if (step === "palate") {
    const palateState: Record<string, { value: PalateLevel; set: (v: PalateLevel) => void }> = {
      sweetness: { value: sweetness, set: setSweetness },
      acidity: { value: acidity, set: setAcidity },
      tannin: { value: tannin, set: setTannin },
      body: { value: body, set: setBody },
      finish: { value: finish, set: setFinish },
    };

    const showTannin = type === "red";

    return (
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">味わい（パレット）</h1>
        <p className="text-sm text-gray-500 mb-6">スライダーで評価してください</p>

        <div className="space-y-6">
          {Object.entries(PALATE_LABELS).map(([key, meta]) => {
            if (key === "tannin" && !showTannin) return null;
            const state = palateState[key];
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {meta.label}
                  </span>
                  <span className="text-xs text-[#722f37] font-medium">
                    {meta.levels[state.value - 1]}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={state.value}
                  onChange={(e) =>
                    state.set(parseInt(e.target.value) as PalateLevel)
                  }
                  className="w-full accent-[#722f37]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>{meta.levels[0]}</span>
                  <span>{meta.levels[4]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            テイスティングノート
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="自由にメモを記入..."
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setStep("aroma")}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium"
          >
            戻る
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-[#722f37] text-white font-medium hover:bg-[#5a252c] transition-colors flex items-center justify-center gap-2"
          >
            <Check size={18} />
            記録する
          </button>
        </div>
      </div>
    );
  }

  // === BASIC INFO STEP ===
  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">ワインを記録</h1>

      {/* Label Scan */}
      <div className="mb-5">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleScan}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={scanning}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#722f37]/30 text-[#722f37] font-medium hover:bg-[#722f37]/5 transition-colors disabled:opacity-50"
        >
          {scanning ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Camera size={20} />
          )}
          {scanning ? "読み取り中..." : "ラベルを撮影して自動入力"}
        </button>
        {scanMessage && (
          <p className="text-xs text-center mt-2 text-gray-500">{scanMessage}</p>
        )}
      </div>

      <div className="space-y-4">
        {/* Wine name + auto-fill */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            ワイン名 <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: Château Margaux"
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
            />
            <button
              onClick={handleAutoFill}
              disabled={!name || searching}
              className="px-3 py-2.5 rounded-xl bg-[#722f37] text-white text-sm hover:bg-[#5a252c] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
              title="ワイン名から情報を自動検索"
            >
              {searching ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">ワイン名を入力後、虫眼鏡ボタンで自動補完</p>
        </div>

        {/* Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            タイプ <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(WINE_TYPE_LABELS) as WineType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
                  type === t
                    ? "border-[#722f37] bg-[#722f37]/5 text-[#722f37] font-medium"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: WINE_TYPE_COLORS[t] }}
                />
                {WINE_TYPE_LABELS[t].ja}
              </button>
            ))}
          </div>
        </div>

        {/* Vintage */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            ヴィンテージ
          </label>
          <input
            type="number"
            value={vintage}
            onChange={(e) => setVintage(e.target.value)}
            placeholder="例: 2020"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
          />
        </div>

        {/* Grapes */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            ブドウ品種
          </label>
          <input
            type="text"
            value={grapes}
            onChange={(e) => setGrapes(e.target.value)}
            placeholder="例: Cabernet Sauvignon, Merlot"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
          />
          <p className="text-xs text-gray-400 mt-0.5">カンマ区切りで複数入力</p>
        </div>

        {/* Producer */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            生産者
          </label>
          <input
            type="text"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            placeholder="例: Domaine de la Romanée-Conti"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
          />
        </div>

        {/* Producer URL */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            生産者ホームページ
          </label>
          <input
            type="url"
            value={producerUrl}
            onChange={(e) => setProducerUrl(e.target.value)}
            placeholder="https://..."
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            国 <span className="text-red-400">*</span>
          </label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setRegion("");
            }}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37] bg-white"
          >
            <option value="">選択してください</option>
            {WINE_COUNTRIES.map((c) => (
              <option key={c.code} value={c.name}>
                {c.nameJa} ({c.name})
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        {regions.length > 0 && (
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              地域
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37] bg-white"
            >
              <option value="">選択してください</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ABV & Price */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              アルコール度数
            </label>
            <input
              type="number"
              step="0.1"
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
              placeholder="13.5"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              価格（円）
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="3000"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            評価
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((v) => (
              <button key={v} onClick={() => setRating(v)}>
                <Star
                  size={28}
                  className={
                    v <= rating
                      ? "fill-[#c9a84c] text-[#c9a84c]"
                      : "text-gray-200"
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setStep("aroma")}
        disabled={!name || !country}
        className="w-full mt-6 py-3 rounded-xl bg-[#722f37] text-white font-medium hover:bg-[#5a252c] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        次へ：香り
      </button>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  Sparkles,
  Camera,
  Loader2,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  WineType,
  WineLog,
  PalateLevel,
  WINE_TYPE_LABELS,
  WINE_TYPE_COLORS,
} from "@/lib/types";
import { AROMA_DATA } from "@/lib/aroma-data";
import { WINE_COUNTRIES, getSubRegionNames } from "@/lib/countries";
import { addWine, LogResult } from "@/lib/store";
import { BADGES } from "@/lib/gamification";
import {
  analyzeWineLabel,
  WineVisionResult,
} from "@/lib/wine-vision";
import {
  getDefaultAromas,
  getDefaultPalate,
  getDefaultAbv,
  getRegionDefaults,
  formatPriceRange,
} from "@/lib/wine-defaults";
import { normalizeGrapes, getGrapeSuggestions, findGrape } from "@/lib/grape-master";
import RadarChart from "@/components/radar-chart";

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

  // === Label fields ===
  const [producer, setProducer] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [village, setVillage] = useState("");
  const [vintage, setVintage] = useState("");
  const [appellation, setAppellation] = useState("");
  const [classification, setClassification] = useState("");
  const [abv, setAbv] = useState("");
  const [volume, setVolume] = useState("750");
  const [bottler, setBottler] = useState("");

  // === Detail fields ===
  const [name, setName] = useState("");
  const [grapes, setGrapes] = useState("");
  const [aging, setAging] = useState("");
  const [tasteType, setTasteType] = useState("");
  const [certifications, setCertifications] = useState("");
  const [producerUrl, setProducerUrl] = useState("");
  const [type, setType] = useState<WineType>("red");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  // === Aroma ===
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [aromasInitialized, setAromasInitialized] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // === Palate ===
  const [sweetness, setSweetness] = useState<PalateLevel>(3);
  const [acidity, setAcidity] = useState<PalateLevel>(3);
  const [tannin, setTannin] = useState<PalateLevel>(3);
  const [body, setBody] = useState<PalateLevel>(3);
  const [finish, setFinish] = useState<PalateLevel>(3);
  const [palateInitialized, setPalateInitialized] = useState(false);

  // === UI state ===
  const [logResult, setLogResult] = useState<LogResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [priceHint, setPriceHint] = useState("");
  const [visionResult, setVisionResult] = useState<WineVisionResult | null>(null);

  // Section collapse
  const [showAroma, setShowAroma] = useState(false);
  const [showPalate, setShowPalate] = useState(false);

  // Grape suggestions
  const [showGrapeSuggestions, setShowGrapeSuggestions] = useState(false);
  const [grapeFilter, setGrapeFilter] = useState("");

  // Text search (when no image)
  const [textSearching, setTextSearching] = useState(false);

  // Grape base data for overlay
  const [grapeBaseAromas, setGrapeBaseAromas] = useState<string[]>([]);
  const [grapeBasePalate, setGrapeBasePalate] = useState<{
    sweetness: PalateLevel;
    acidity: PalateLevel;
    tannin: PalateLevel | null;
    body: PalateLevel;
    finish: PalateLevel;
  } | null>(null);

  const selectedCountry = WINE_COUNTRIES.find(
    (c) => c.name === country || c.nameJa === country
  );
  const regions = selectedCountry?.regions || [];
  const subRegions =
    selectedCountry && region
      ? getSubRegionNames(selectedCountry, region)
      : [];

  const grapeList = grapes
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

  // Normalize grapes through master
  const normalizedGrapes = normalizeGrapes(grapeList);

  // Auto-fill from region defaults
  const applyRegionDefaults = useCallback(
    (countryCode: string, regionName: string) => {
      const rd = getRegionDefaults(countryCode, regionName);
      if (!rd) return;
      if (!grapes) setGrapes(rd.typicalGrapes.join(", "));
      if (!abv) {
        const avg = Math.round(((rd.typicalAbv[0] + rd.typicalAbv[1]) / 2) * 10) / 10;
        setAbv(String(avg));
      }
      setPriceHint(formatPriceRange(rd.priceRange));
      if (!price) {
        const mid = Math.round((rd.priceRange[0] + rd.priceRange[1]) / 2);
        setPrice(String(mid));
      }
    },
    [grapes, abv, price]
  );

  useEffect(() => {
    if (selectedCountry && region) {
      applyRegionDefaults(selectedCountry.code, region);
    }
  }, [region]); // eslint-disable-line react-hooks/exhaustive-deps

  // Apply grape defaults for aroma/palate
  function applyGrapeDefaults() {
    const gl = normalizedGrapes;
    const isRed = type === "red";

    if (gl.length > 0) {
      const baseAromas = getDefaultAromas(gl);
      setGrapeBaseAromas(baseAromas);
      const basePalate = getDefaultPalate(gl, isRed);
      setGrapeBasePalate(basePalate);
    }

    if (visionResult?.knowledge) {
      const k = visionResult.knowledge;
      if (k.aromas.length > 0) {
        setSelectedAromas(k.aromas);
      } else if (gl.length > 0) {
        setSelectedAromas(getDefaultAromas(gl));
      }
      setSweetness(k.palate.sweetness);
      setAcidity(k.palate.acidity);
      if (k.palate.tannin !== null && isRed) setTannin(k.palate.tannin);
      setBody(k.palate.body);
      setFinish(k.palate.finish);
    } else if (gl.length > 0) {
      const defaultAromas = getDefaultAromas(gl);
      if (defaultAromas.length > 0) setSelectedAromas(defaultAromas);
      const dp = getDefaultPalate(gl, isRed);
      setSweetness(dp.sweetness);
      setAcidity(dp.acidity);
      if (dp.tannin !== null) setTannin(dp.tannin);
      setBody(dp.body);
      setFinish(dp.finish);
    }

    setAromasInitialized(true);
    setPalateInitialized(true);

    if (!abv) {
      const defaultAbv = getDefaultAbv(gl);
      if (defaultAbv) setAbv(String(defaultAbv));
    }
  }

  // Initialize aroma/palate when sections are opened
  useEffect(() => {
    if ((showAroma || showPalate) && !aromasInitialized) {
      applyGrapeDefaults();
    }
  }, [showAroma, showPalate]); // eslint-disable-line react-hooks/exhaustive-deps

  // === Scan label with Claude Vision ===
  async function handleScan(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanning(true);
    setScanMessage("AIがラベルを分析中...");

    try {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type || "image/jpeg";
      const result = await analyzeWineLabel(base64, mediaType);

      if (!result) {
        setScanMessage("ラベルの分析に失敗しました");
        setScanning(false);
        return;
      }

      applyVisionResult(result);
    } catch (err) {
      setScanMessage(`エラー: ${err instanceof Error ? err.message : "分析に失敗しました"}`);
    } finally {
      setScanning(false);
    }
  }

  // === Text search with Claude API ===
  async function handleTextSearch() {
    const query = [producer, name, vintage, country, region].filter(Boolean).join(" ");
    if (!query.trim()) return;
    setTextSearching(true);
    setScanMessage("AIでワイン情報を検索中...");

    try {
      const res = await fetch("/api/wine-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producer, name, vintage, country: selectedCountry?.name || country,
          region, grapeVarieties: grapeList, type,
        }),
      });

      if (!res.ok) {
        setScanMessage("検索に失敗しました");
        setTextSearching(false);
        return;
      }

      const data = await res.json();
      if (data.error) {
        setScanMessage("ワイン情報を取得できませんでした");
        setTextSearching(false);
        return;
      }

      // Apply lookup results
      if (!grapes && data.suggestedGrapes?.length > 0) {
        setGrapes(data.suggestedGrapes.join(", "));
      }
      if (!abv && data.suggestedAbv) setAbv(String(data.suggestedAbv));
      if (!price && data.priceRange?.min > 0) {
        const mid = Math.round((data.priceRange.min + data.priceRange.max) / 2);
        setPrice(String(mid));
        setPriceHint(`¥${data.priceRange.min.toLocaleString()}〜¥${data.priceRange.max.toLocaleString()}`);
      }

      // Build a partial vision result for aroma/palate
      if (data.aromas || data.palate) {
        const clamp = (v: number): PalateLevel => Math.max(1, Math.min(5, Math.round(v))) as PalateLevel;
        setVisionResult({
          label: { producer: "", name: "", country: "", region: "", subRegion: "", village: "", vintage: null, appellation: "", classification: "", abv: null, volume: null, bottler: "", grapeVarieties: [], aging: "", tasteType: "", certifications: [], type: "red" },
          knowledge: {
            priceRange: data.priceRange || { min: 0, max: 0 },
            aromas: data.aromas || [],
            palate: {
              sweetness: clamp(data.palate?.sweetness ?? 3),
              acidity: clamp(data.palate?.acidity ?? 3),
              tannin: data.palate?.tannin != null ? clamp(data.palate.tannin) : null,
              body: clamp(data.palate?.body ?? 3),
              finish: clamp(data.palate?.finish ?? 3),
            },
            grapeBaseAromas: [],
            grapeBasePalate: { sweetness: 3 as PalateLevel, acidity: 3 as PalateLevel, tannin: null, body: 3 as PalateLevel, finish: 3 as PalateLevel },
            description: data.description || "",
            producerUrl: "",
            confidence: data.confidence || "low",
          },
        });
        setAromasInitialized(false);
        setPalateInitialized(false);
      }

      const conf = data.confidence === "high" ? "高" : data.confidence === "medium" ? "中" : "低";
      setScanMessage(`検索完了（確度: ${conf}）${data.description ? ` - ${data.description}` : ""}`);
    } catch {
      setScanMessage("検索に失敗しました");
    } finally {
      setTextSearching(false);
    }
  }

  function applyVisionResult(result: WineVisionResult) {
    setVisionResult(result);
    const l = result.label;
    const k = result.knowledge;

    if (l.producer) setProducer(l.producer);
    if (l.country) {
      const match = WINE_COUNTRIES.find((c) => c.name.toLowerCase() === l.country.toLowerCase());
      if (match) setCountry(match.name);
    }
    if (l.region) setRegion(l.region);
    if (l.subRegion) setSubRegion(l.subRegion);
    if (l.village) setVillage(l.village);
    if (l.vintage) setVintage(String(l.vintage));
    if (l.appellation) setAppellation(l.appellation);
    if (l.classification) setClassification(l.classification);
    if (l.abv) setAbv(String(l.abv));
    if (l.volume) setVolume(String(l.volume));
    if (l.bottler) setBottler(l.bottler);
    if (l.name) setName(l.name);
    if (l.grapeVarieties.length > 0) setGrapes(l.grapeVarieties.join(", "));
    if (l.aging) setAging(l.aging);
    if (l.tasteType) setTasteType(l.tasteType);
    if (l.certifications.length > 0) setCertifications(l.certifications.join(", "));
    if (l.type) setType(l.type);

    if (k.producerUrl) setProducerUrl(k.producerUrl);
    if (k.priceRange.min > 0) {
      const mid = Math.round((k.priceRange.min + k.priceRange.max) / 2);
      setPrice(String(mid));
      setPriceHint(`¥${k.priceRange.min.toLocaleString()}〜¥${k.priceRange.max.toLocaleString()}`);
    }
    if (k.grapeBaseAromas.length > 0) setGrapeBaseAromas(k.grapeBaseAromas);
    if (k.grapeBasePalate) setGrapeBasePalate(k.grapeBasePalate);

    setAromasInitialized(false);
    setPalateInitialized(false);

    const detected: string[] = [];
    if (l.producer) detected.push("生産者");
    if (l.country) detected.push("国");
    if (l.region) detected.push("産地");
    if (l.vintage) detected.push("ヴィンテージ");
    if (l.grapeVarieties.length > 0) detected.push("品種");

    const conf = k.confidence === "high" ? "高" : k.confidence === "medium" ? "中" : "低";
    setScanMessage(
      `AI分析完了（確度: ${conf}）${detected.length > 0 ? ` - ${detected.join("・")}を検出` : ""}${k.description ? `\n${k.description}` : ""}`
    );
  }

  function toggleAroma(aroma: string) {
    setSelectedAromas((prev) =>
      prev.includes(aroma) ? prev.filter((a) => a !== aroma) : [...prev, aroma]
    );
  }

  function resetAromaDefaults() {
    setSelectedAromas(getDefaultAromas(normalizedGrapes));
  }

  function resetPalateDefaults() {
    const isRed = type === "red";
    const dp = getDefaultPalate(normalizedGrapes, isRed);
    setSweetness(dp.sweetness);
    setAcidity(dp.acidity);
    if (dp.tannin !== null) setTannin(dp.tannin);
    setBody(dp.body);
    setFinish(dp.finish);
  }

  function handleSubmit() {
    const wine: WineLog = {
      id: uuidv4(),
      producer,
      country: selectedCountry?.name || country,
      region,
      subRegion,
      village,
      appellation,
      vintage: vintage ? parseInt(vintage) : null,
      classification,
      abv: abv ? parseFloat(abv) : null,
      volume: volume ? parseInt(volume) : 750,
      bottler,
      name,
      grapeVarieties: normalizedGrapes,
      aging,
      tasteType,
      certifications: certifications.split(",").map((c) => c.trim()).filter(Boolean),
      producerUrl,
      type,
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
  }

  const showTannin = type === "red";
  const radarData = [
    { label: "甘さ", value: sweetness },
    { label: "酸味", value: acidity },
    ...(showTannin ? [{ label: "タンニン", value: tannin }] : []),
    { label: "ボディ", value: body },
    { label: "余韻", value: finish },
  ];

  const radarBaseData = grapeBasePalate
    ? [
        { label: "甘さ", value: grapeBasePalate.sweetness },
        { label: "酸味", value: grapeBasePalate.acidity },
        ...(showTannin && grapeBasePalate.tannin !== null
          ? [{ label: "タンニン", value: grapeBasePalate.tannin }]
          : []),
        { label: "ボディ", value: grapeBasePalate.body },
        { label: "余韻", value: grapeBasePalate.finish },
      ]
    : undefined;

  const palateSetters = [
    setSweetness, setAcidity, ...(showTannin ? [setTannin] : []), setBody, setFinish,
  ];

  const canSubmit = (producer || name) && country && rating > 0;

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]";
  const selectCls = `${inputCls} bg-white`;

  // Grape suggestions filtered
  const allGrapeSuggestions = getGrapeSuggestions();
  const filteredSuggestions = grapeFilter
    ? allGrapeSuggestions.filter(
        (s) =>
          s.label.toLowerCase().includes(grapeFilter.toLowerCase()) ||
          s.id.toLowerCase().includes(grapeFilter.toLowerCase())
      )
    : allGrapeSuggestions;

  function addGrapeFromSuggestion(id: string) {
    const current = grapes.split(",").map((g) => g.trim()).filter(Boolean);
    if (!current.includes(id)) {
      setGrapes([...current, id].join(", "));
    }
    setShowGrapeSuggestions(false);
    setGrapeFilter("");
    setAromasInitialized(false);
    setPalateInitialized(false);
  }

  // === RESULT SCREEN ===
  if (logResult) {
    return (
      <div className="px-4 pt-8 pb-24">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🍷</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">記録完了！</h1>
          <p className="text-gray-500">
            {logResult.wine.producer}
            {logResult.wine.name && ` - ${logResult.wine.name}`}
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#722f37] to-[#9b4d55] rounded-xl p-5 mb-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={20} />
            <span className="font-bold text-lg">+{logResult.xpGained} XP</span>
          </div>
          {logResult.bonusReasons.map((r, i) => (
            <div key={i} className="text-sm text-white/80 ml-7">{r}</div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex justify-center">
            <RadarChart data={radarData} baseData={radarBaseData} size={200} />
          </div>
          {radarBaseData && (
            <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <span className="inline-block w-4 h-0.5 bg-[#d4a574] border-dashed border-t border-[#d4a574]" />
                品種の特徴
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-4 h-0.5 bg-[#722f37]" />
                あなたの評価
              </span>
            </div>
          )}
        </div>

        {logResult.rankUp && (
          <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl p-4 mb-4 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <div className="font-bold text-[#c9a84c]">ランクアップ！</div>
          </div>
        )}

        {logResult.newBadges.length > 0 && (
          <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
            <div className="font-medium text-gray-700 mb-2">新しいバッジ獲得！</div>
            {logResult.newBadges.map((id) => {
              const badge = BADGES.find((b) => b.id === id);
              return badge ? (
                <div key={id} className="flex items-center gap-2 py-1">
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{badge.nameJa}</div>
                    <div className="text-xs text-gray-500">{badge.description}</div>
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

  // === SINGLE-PAGE FORM ===
  return (
    <div className="px-4 pt-6 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-1">ワインを記録</h1>
      <p className="text-sm text-gray-500 mb-4">
        ラベル撮影で自動入力、または手入力で検索
      </p>

      {/* === SCAN / SEARCH SECTION === */}
      <div className="mb-5 space-y-2">
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
          disabled={scanning || textSearching}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#722f37]/30 text-[#722f37] font-medium hover:bg-[#722f37]/5 transition-colors disabled:opacity-50"
        >
          {scanning ? <Loader2 size={20} className="animate-spin" /> : <Camera size={20} />}
          {scanning ? "AIが分析中..." : "ラベルを撮影してAI自動入力"}
        </button>

        <button
          onClick={handleTextSearch}
          disabled={textSearching || scanning || (!producer && !name)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#722f37] to-[#9b4d55] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {textSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          入力内容からAI検索
        </button>

        {scanMessage && (
          <p className="text-xs text-center text-gray-500 whitespace-pre-line">
            {scanMessage}
          </p>
        )}
      </div>

      {/* AI description banner */}
      {visionResult?.knowledge.description && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
          <p className="text-xs text-amber-800">
            <Sparkles size={12} className="inline mr-1" />
            {visionResult.knowledge.description}
          </p>
          {priceHint && <p className="text-xs text-amber-600 mt-1">価格目安: {priceHint}</p>}
        </div>
      )}

      {/* === LABEL SECTION === */}
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
        ラベル情報
      </div>

      <div className="space-y-3 mb-6">
        {/* Producer */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            生産者名 <span className="text-red-400">*</span>
          </label>
          <input type="text" value={producer} onChange={(e) => setProducer(e.target.value)}
            placeholder="例: Château Margaux" className={inputCls} />
        </div>

        {/* Wine Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">ワイン名 / キュヴェ名</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="例: Les Forts de Latour" className={inputCls} />
        </div>

        {/* Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            タイプ <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(WINE_TYPE_LABELS) as WineType[]).map((t) => (
              <button key={t} onClick={() => setType(t)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
                  type === t ? "border-[#722f37] bg-[#722f37]/5 text-[#722f37] font-medium" : "border-gray-200 text-gray-500"
                }`}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: WINE_TYPE_COLORS[t] }} />
                {WINE_TYPE_LABELS[t].ja}
              </button>
            ))}
          </div>
        </div>

        {/* Country + Region */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              原産国 <span className="text-red-400">*</span>
            </label>
            <select value={country} onChange={(e) => { setCountry(e.target.value); setRegion(""); setSubRegion(""); setVillage(""); }} className={selectCls}>
              <option value="">選択</option>
              {WINE_COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>{c.nameJa}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">ヴィンテージ</label>
            <input type="number" value={vintage} onChange={(e) => setVintage(e.target.value)}
              placeholder="2020" className={inputCls} />
          </div>
        </div>

        {/* Region + Sub-Region + Village */}
        {regions.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">地域</label>
              <select value={region} onChange={(e) => { setRegion(e.target.value); setSubRegion(""); setVillage(""); setAromasInitialized(false); setPalateInitialized(false); }} className={selectCls}>
                <option value="">選択</option>
                {regions.map((r) => <option key={r.name} value={r.name}>{r.nameJa}</option>)}
              </select>
            </div>
            {subRegions.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">サブ地域</label>
                <select value={subRegion} onChange={(e) => setSubRegion(e.target.value)} className={selectCls}>
                  <option value="">選択</option>
                  {subRegions.map((sr) => <option key={sr} value={sr}>{sr}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Village */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">村名 / コミューン</label>
          <input type="text" value={village} onChange={(e) => setVillage(e.target.value)}
            placeholder="例: Pauillac, Chambolle-Musigny" className={inputCls} />
        </div>

        {/* Grapes with master suggestions */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 block mb-1">ブドウ品種</label>
          <div className="flex gap-2">
            <input type="text" value={grapes}
              onChange={(e) => { setGrapes(e.target.value); setAromasInitialized(false); setPalateInitialized(false); }}
              placeholder="例: Cabernet Sauvignon, Merlot" className={`${inputCls} flex-1`} />
            <button onClick={() => setShowGrapeSuggestions(!showGrapeSuggestions)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-gray-500 text-xs hover:bg-gray-50">
              一覧
            </button>
          </div>
          {/* Normalized display */}
          {grapeList.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {grapeList.map((g, i) => {
                const grape = findGrape(g);
                return (
                  <span key={i} className={`px-2 py-0.5 text-[10px] rounded-full ${grape ? "bg-[#722f37]/10 text-[#722f37]" : "bg-gray-100 text-gray-500"}`}>
                    {grape ? `${grape.nameJa}` : g}
                  </span>
                );
              })}
            </div>
          )}
          {/* Suggestion dropdown */}
          {showGrapeSuggestions && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              <div className="sticky top-0 bg-white p-2 border-b">
                <input type="text" value={grapeFilter} onChange={(e) => setGrapeFilter(e.target.value)}
                  placeholder="品種名で絞り込み..." className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs" autoFocus />
              </div>
              {filteredSuggestions.slice(0, 30).map((s) => (
                <button key={s.id} onClick={() => addGrapeFromSuggestion(s.id)}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 border-b border-gray-50">
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Appellation + Classification */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">格付け</label>
            <input type="text" value={appellation} onChange={(e) => setAppellation(e.target.value)}
              placeholder="AOC, DOCG" className={inputCls} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">品質分類</label>
            <input type="text" value={classification} onChange={(e) => setClassification(e.target.value)}
              placeholder="Grand Cru" className={inputCls} />
          </div>
        </div>

        {/* ABV + Volume + Price */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">ABV%</label>
            <input type="number" step="0.1" value={abv} onChange={(e) => setAbv(e.target.value)}
              placeholder="13.5" className={inputCls} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">容量ml</label>
            <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)}
              placeholder="750" className={inputCls} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">価格¥</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              placeholder="3000" className={inputCls} />
          </div>
        </div>
        {priceHint && !visionResult?.knowledge.description && (
          <p className="text-[10px] text-gray-400">相場: {priceHint}</p>
        )}

        {/* Aging + Taste Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">熟成表記</label>
            <input type="text" value={aging} onChange={(e) => setAging(e.target.value)}
              placeholder="Reserva" className={inputCls} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">味わいタイプ</label>
            <input type="text" value={tasteType} onChange={(e) => setTasteType(e.target.value)}
              placeholder="辛口, Brut" className={inputCls} />
          </div>
        </div>

        {/* Bottler + Certifications + Producer URL */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">瓶詰め元</label>
          <input type="text" value={bottler} onChange={(e) => setBottler(e.target.value)}
            placeholder="Mis en bouteille au château" className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">認証・受賞</label>
          <input type="text" value={certifications} onChange={(e) => setCertifications(e.target.value)}
            placeholder="Bio, 金賞（カンマ区切り）" className={inputCls} />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">生産者HP</label>
          <input type="url" value={producerUrl} onChange={(e) => setProducerUrl(e.target.value)}
            placeholder="https://..." className={inputCls} />
        </div>
      </div>

      {/* === RATING === */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          評価 <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((v) => (
            <button key={v} onClick={() => setRating(v)}>
              <Star size={28} className={v <= rating ? "fill-[#c9a84c] text-[#c9a84c]" : "text-gray-200"} />
            </button>
          ))}
        </div>
      </div>

      {/* === AROMA SECTION (collapsible) === */}
      <div className="mb-4">
        <button onClick={() => setShowAroma(!showAroma)}
          className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <span className="font-medium text-gray-800">
            香り（アロマ）
            {selectedAromas.length > 0 && (
              <span className="ml-2 text-xs text-[#722f37]">{selectedAromas.length}個選択</span>
            )}
          </span>
          {showAroma ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>

        {showAroma && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {visionResult ? "AI分析" : "品種"}から推定済み
              </p>
              <button onClick={resetAromaDefaults}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#722f37]">
                <RotateCcw size={12} /> リセット
              </button>
            </div>

            {selectedAromas.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {selectedAromas.map((a) => (
                  <button key={a} onClick={() => toggleAroma(a)}
                    className="px-2.5 py-1 text-xs rounded-full bg-[#722f37] text-white">
                    {a} ✕
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {AROMA_DATA.map((cat) => (
                <div key={cat.name.en} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button onClick={() => setExpandedCategory(expandedCategory === cat.name.en ? null : cat.name.en)}
                    className="w-full flex items-center justify-between p-3 text-left">
                    <span className="font-medium text-gray-800">
                      {cat.name.ja} <span className="text-xs text-gray-400">{cat.name.en}</span>
                    </span>
                    {expandedCategory === cat.name.en ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  {expandedCategory === cat.name.en && (
                    <div className="px-3 pb-3 space-y-3">
                      {cat.subcategories.map((sub) => (
                        <div key={sub.name.en}>
                          <div className="text-xs font-medium text-gray-500 mb-1.5">{sub.name.ja}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.descriptors.map((d) => {
                              const isSelected = selectedAromas.includes(d.ja);
                              const isGrapeBase = grapeBaseAromas.includes(d.ja);
                              return (
                                <button key={d.en} onClick={() => toggleAroma(d.ja)}
                                  className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                                    isSelected ? "bg-[#722f37] text-white border-[#722f37]"
                                      : isGrapeBase ? "bg-[#d4a574]/10 text-[#d4a574] border-[#d4a574]/40"
                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#722f37]/50"
                                  }`}>
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
          </div>
        )}
      </div>

      {/* === PALATE SECTION (collapsible) === */}
      <div className="mb-6">
        <button onClick={() => setShowPalate(!showPalate)}
          className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
          <span className="font-medium text-gray-800">味わい（パレット）</span>
          {showPalate ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>

        {showPalate && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">品種から推定済み。調整してください</p>
              <button onClick={resetPalateDefaults}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#722f37]">
                <RotateCcw size={12} /> リセット
              </button>
            </div>

            <div className="flex justify-center mb-2">
              <RadarChart data={radarData} baseData={radarBaseData} size={220} interactive={true}
                onChange={(index, value) => palateSetters[index](value)} />
            </div>
            {radarBaseData && (
              <div className="flex items-center justify-center gap-4 mb-3 text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-4 h-0.5 bg-[#d4a574] border-dashed border-t border-[#d4a574]" />
                  品種の特徴
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-4 h-0.5 bg-[#722f37]" />
                  このワイン
                </span>
              </div>
            )}

            <div className="space-y-4">
              {Object.entries(PALATE_LABELS).map(([key, meta]) => {
                if (key === "tannin" && !showTannin) return null;
                const palateState: Record<string, { value: PalateLevel; set: (v: PalateLevel) => void }> = {
                  sweetness: { value: sweetness, set: setSweetness },
                  acidity: { value: acidity, set: setAcidity },
                  tannin: { value: tannin, set: setTannin },
                  body: { value: body, set: setBody },
                  finish: { value: finish, set: setFinish },
                };
                const state = palateState[key];
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">{meta.label}</span>
                      <span className="text-[10px] text-[#722f37] font-medium">{meta.levels[state.value - 1]}</span>
                    </div>
                    <input type="range" min={1} max={5} value={state.value}
                      onChange={(e) => state.set(parseInt(e.target.value) as PalateLevel)}
                      className="w-full accent-[#722f37]" />
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700 block mb-1">テイスティングノート</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="自由にメモを記入..." className={`${inputCls} h-20 resize-none`} />
            </div>
          </div>
        )}
      </div>

      {/* === SUBMIT === */}
      <button onClick={handleSubmit} disabled={!canSubmit}
        className="w-full py-3 rounded-xl bg-[#722f37] text-white font-medium hover:bg-[#5a252c] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed">
        <Check size={18} />
        記録する
      </button>
    </div>
  );
}

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
  const [step, setStep] = useState<
    "label" | "detail" | "aroma" | "palate" | "result"
  >("label");

  // === Mandatory label fields ===
  const [producer, setProducer] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [vintage, setVintage] = useState("");
  const [appellation, setAppellation] = useState("");
  const [classification, setClassification] = useState("");
  const [abv, setAbv] = useState("");
  const [volume, setVolume] = useState("750");
  const [bottler, setBottler] = useState("");

  // === Optional label fields ===
  const [name, setName] = useState("");
  const [grapes, setGrapes] = useState("");
  const [aging, setAging] = useState("");
  const [tasteType, setTasteType] = useState("");
  const [certifications, setCertifications] = useState("");
  const [producerUrl, setProducerUrl] = useState("");

  // === User input fields ===
  const [type, setType] = useState<WineType>("red");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");

  // Aroma
  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);
  const [aromasInitialized, setAromasInitialized] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    null
  );

  // Palate
  const [sweetness, setSweetness] = useState<PalateLevel>(3);
  const [acidity, setAcidity] = useState<PalateLevel>(3);
  const [tannin, setTannin] = useState<PalateLevel>(3);
  const [body, setBody] = useState<PalateLevel>(3);
  const [finish, setFinish] = useState<PalateLevel>(3);
  const [palateInitialized, setPalateInitialized] = useState(false);

  // Result
  const [logResult, setLogResult] = useState<LogResult | null>(null);

  // OCR / Auto-fill
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [priceHint, setPriceHint] = useState("");

  // Claude Vision result (replaces both OCR + wine lookup)
  const [visionResult, setVisionResult] = useState<WineVisionResult | null>(null);

  // Grape variety base data (for overlay)
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

  // Auto-fill from region defaults
  const applyRegionDefaults = useCallback(
    (countryCode: string, regionName: string) => {
      const rd = getRegionDefaults(countryCode, regionName);
      if (!rd) return;
      if (!grapes) setGrapes(rd.typicalGrapes.join(", "));
      if (!abv) {
        const avg =
          Math.round(((rd.typicalAbv[0] + rd.typicalAbv[1]) / 2) * 10) / 10;
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

  async function handleScan(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanning(true);
    setScanMessage("AIがラベルを分析中...");

    try {
      // Read file as base64
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const base64 = dataUrl.split(",")[1];
      const mediaType = file.type || "image/jpeg";

      // Single Claude Vision call: label reading + wine knowledge
      const result = await analyzeWineLabel(base64, mediaType);

      if (!result) {
        setScanMessage("ラベルの分析に失敗しました");
        setScanning(false);
        return;
      }

      setVisionResult(result);
      const l = result.label;
      const k = result.knowledge;

      // === Apply label fields ===
      if (l.producer) setProducer(l.producer);
      if (l.country) {
        const match = WINE_COUNTRIES.find(
          (c) => c.name.toLowerCase() === l.country.toLowerCase()
        );
        if (match) setCountry(match.name);
      }
      if (l.region) setRegion(l.region);
      if (l.subRegion) setSubRegion(l.subRegion);
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

      // === Apply knowledge fields ===
      if (k.producerUrl) setProducerUrl(k.producerUrl);
      if (k.priceRange.min > 0) {
        const mid = Math.round((k.priceRange.min + k.priceRange.max) / 2);
        setPrice(String(mid));
        setPriceHint(
          `¥${k.priceRange.min.toLocaleString()}〜¥${k.priceRange.max.toLocaleString()}`
        );
      }

      // Set grape base data for overlay chart
      if (k.grapeBaseAromas.length > 0) setGrapeBaseAromas(k.grapeBaseAromas);
      if (k.grapeBasePalate) setGrapeBasePalate(k.grapeBasePalate);

      // Wine-specific aroma & palate will be applied when entering those steps
      setAromasInitialized(false);
      setPalateInitialized(false);

      // Build scan message
      const detected: string[] = [];
      if (l.producer) detected.push("生産者");
      if (l.country) detected.push("国");
      if (l.region) detected.push("産地");
      if (l.vintage) detected.push("ヴィンテージ");
      if (l.appellation) detected.push("格付け");
      if (l.grapeVarieties.length > 0) detected.push("品種");
      if (l.abv) detected.push("ABV");

      const conf = k.confidence === "high" ? "高" : k.confidence === "medium" ? "中" : "低";
      setScanMessage(
        `AI分析完了（確度: ${conf}）${detected.length > 0 ? ` - ${detected.join("・")}を検出` : ""}`
      );
      if (k.description) {
        setScanMessage((prev) => `${prev}\n${k.description}`);
      }
    } catch (err) {
      setScanMessage(
        `エラー: ${err instanceof Error ? err.message : "分析に失敗しました"}`
      );
    } finally {
      setScanning(false);
    }
  }

  function applyGrapeDefaults() {
    const gl = grapes
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    const isRed = type === "red";

    // Always compute grape base for overlay
    if (gl.length > 0) {
      const baseAromas = getDefaultAromas(gl);
      setGrapeBaseAromas(baseAromas);

      const basePalate = getDefaultPalate(gl, isRed);
      setGrapeBasePalate(basePalate);
    }

    // If we have Claude Vision knowledge, use it as the primary values
    if (visionResult?.knowledge) {
      const k = visionResult.knowledge;
      // Aromas: wine-specific from vision
      if (k.aromas.length > 0) {
        setSelectedAromas(k.aromas);
      } else if (gl.length > 0) {
        setSelectedAromas(getDefaultAromas(gl));
      }

      // Palate: wine-specific from vision
      setSweetness(k.palate.sweetness);
      setAcidity(k.palate.acidity);
      if (k.palate.tannin !== null && isRed)
        setTannin(k.palate.tannin);
      setBody(k.palate.body);
      setFinish(k.palate.finish);
    } else if (gl.length > 0) {
      // Fallback to grape defaults
      const defaultAromas = getDefaultAromas(gl);
      if (defaultAromas.length > 0) setSelectedAromas(defaultAromas);

      const defaultPalate = getDefaultPalate(gl, isRed);
      setSweetness(defaultPalate.sweetness);
      setAcidity(defaultPalate.acidity);
      if (defaultPalate.tannin !== null) setTannin(defaultPalate.tannin);
      setBody(defaultPalate.body);
      setFinish(defaultPalate.finish);
    }

    setAromasInitialized(true);
    setPalateInitialized(true);

    if (!abv) {
      const defaultAbv = getDefaultAbv(gl);
      if (defaultAbv) setAbv(String(defaultAbv));
    }
  }

  function goToAromaStep() {
    if (!aromasInitialized) applyGrapeDefaults();
    setStep("aroma");
  }

  function goToPalateStep() {
    if (!palateInitialized) applyGrapeDefaults();
    setStep("palate");
  }

  function toggleAroma(aroma: string) {
    setSelectedAromas((prev) =>
      prev.includes(aroma)
        ? prev.filter((a) => a !== aroma)
        : [...prev, aroma]
    );
  }

  function resetAromaDefaults() {
    const gl = grapes.split(",").map((g) => g.trim()).filter(Boolean);
    setSelectedAromas(getDefaultAromas(gl));
  }

  function resetPalateDefaults() {
    const gl = grapes.split(",").map((g) => g.trim()).filter(Boolean);
    const isRed = type === "red";
    const dp = getDefaultPalate(gl, isRed);
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
      appellation,
      vintage: vintage ? parseInt(vintage) : null,
      classification,
      abv: abv ? parseFloat(abv) : null,
      volume: volume ? parseInt(volume) : 750,
      bottler,
      name,
      grapeVarieties: grapeList,
      aging,
      tasteType,
      certifications: certifications
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
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
    setStep("result");
  }

  const showTannin = type === "red";
  const radarData = [
    { label: "甘さ", value: sweetness },
    { label: "酸味", value: acidity },
    ...(showTannin ? [{ label: "タンニン", value: tannin }] : []),
    { label: "ボディ", value: body },
    { label: "余韻", value: finish },
  ];

  // Grape variety base data for overlay
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
    setSweetness,
    setAcidity,
    ...(showTannin ? [setTannin] : []),
    setBody,
    setFinish,
  ];

  // Can proceed from label step when at least producer or name + country are set
  const canProceedFromLabel =
    (producer || name) && country;

  // Helper for input styling
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#722f37]/20 focus:border-[#722f37]";
  const selectCls = `${inputCls} bg-white`;

  // === RESULT SCREEN ===
  if (step === "result" && logResult) {
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
            <RadarChart
              data={[
                { label: "甘さ", value: logResult.wine.palate.sweetness },
                { label: "酸味", value: logResult.wine.palate.acidity },
                ...(logResult.wine.palate.tannin !== null
                  ? [{ label: "タンニン", value: logResult.wine.palate.tannin }]
                  : []),
                { label: "ボディ", value: logResult.wine.palate.body },
                { label: "余韻", value: logResult.wine.palate.finish },
              ]}
              baseData={radarBaseData}
              size={200}
            />
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

  // === AROMA STEP ===
  if (step === "aroma") {
    return (
      <div className="px-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">香り（アロマ）</h1>
          <button
            onClick={resetAromaDefaults}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#722f37]"
          >
            <RotateCcw size={12} />
            デフォルトに戻す
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          {visionResult ? "AI分析" : "品種"}から推定された香りが選択済みです（{selectedAromas.length}個）
        </p>

        {selectedAromas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedAromas.map((a) => {
              const isGrapeBase = grapeBaseAromas.includes(a);
              const isWineSpecific = !isGrapeBase;
              return (
                <button
                  key={a}
                  onClick={() => toggleAroma(a)}
                  className={`px-2.5 py-1 text-xs rounded-full ${
                    isWineSpecific
                      ? "bg-[#722f37] text-white"
                      : "bg-[#722f37] text-white"
                  }`}
                >
                  {a} ✕
                </button>
              );
            })}
          </div>
        )}

        {grapeBaseAromas.length > 0 && visionResult && (
          <div className="flex items-center gap-2 mb-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#d4a574]" />
              品種由来
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#722f37]" />
              ワイン固有
            </span>
          </div>
        )}

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
                          const isGrapeBase = grapeBaseAromas.includes(d.ja);
                          return (
                            <button
                              key={d.en}
                              onClick={() => toggleAroma(d.ja)}
                              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                                isSelected
                                  ? "bg-[#722f37] text-white border-[#722f37]"
                                  : isGrapeBase
                                    ? "bg-[#d4a574]/10 text-[#d4a574] border-[#d4a574]/40"
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
            onClick={() => setStep("detail")}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium"
          >
            戻る
          </button>
          <button
            onClick={goToPalateStep}
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
    const palateState: Record<
      string,
      { value: PalateLevel; set: (v: PalateLevel) => void }
    > = {
      sweetness: { value: sweetness, set: setSweetness },
      acidity: { value: acidity, set: setAcidity },
      tannin: { value: tannin, set: setTannin },
      body: { value: body, set: setBody },
      finish: { value: finish, set: setFinish },
    };

    return (
      <div className="px-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">味わい（パレット）</h1>
          <button
            onClick={resetPalateDefaults}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#722f37]"
          >
            <RotateCcw size={12} />
            デフォルトに戻す
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          品種から推定された味わいです。調整してください
        </p>

        <div className="flex justify-center mb-2">
          <RadarChart
            data={radarData}
            baseData={radarBaseData}
            size={220}
            interactive={true}
            onChange={(index, value) => palateSetters[index](value)}
          />
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

        <div className="space-y-5">
          {Object.entries(PALATE_LABELS).map(([key, meta]) => {
            if (key === "tannin" && !showTannin) return null;
            const state = palateState[key];
            return (
              <div key={key}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{meta.label}</span>
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

        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700 block mb-1.5">
            テイスティングノート
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="自由にメモを記入..."
            className={`${inputCls} h-24 resize-none`}
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

  // === STEP 2: DETAIL (optional fields, type, price, rating) ===
  if (step === "detail") {
    return (
      <div className="px-4 pt-6 pb-24">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          詳細情報
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          任意項目と評価を入力してください
        </p>

        {visionResult?.knowledge.description && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-3">
            <p className="text-xs text-amber-800">
              <Sparkles size={12} className="inline mr-1" />
              {visionResult.knowledge.description}
            </p>
            {priceHint && (
              <p className="text-xs text-amber-600 mt-1">価格目安: {priceHint}</p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {/* Wine Type */}
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

          {/* Grapes */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              ブドウ品種
            </label>
            <input
              type="text"
              value={grapes}
              onChange={(e) => {
                setGrapes(e.target.value);
                setAromasInitialized(false);
                setPalateInitialized(false);
              }}
              placeholder="例: Cabernet Sauvignon, Merlot"
              className={inputCls}
            />
            <p className="text-xs text-gray-400 mt-0.5">地域選択で自動入力</p>
          </div>

          {/* Wine Name / Cuvée */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              ワイン名 / キュヴェ名
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: Les Forts de Latour"
              className={inputCls}
            />
          </div>

          {/* Aging */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              熟成表記
            </label>
            <input
              type="text"
              value={aging}
              onChange={(e) => setAging(e.target.value)}
              placeholder="例: Reserva, Élevé en fûts de chêne"
              className={inputCls}
            />
          </div>

          {/* Taste Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              味わいタイプ
            </label>
            <input
              type="text"
              value={tasteType}
              onChange={(e) => setTasteType(e.target.value)}
              placeholder="例: 辛口, Brut, Demi-Sec"
              className={inputCls}
            />
          </div>

          {/* Certifications */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              認証・受賞
            </label>
            <input
              type="text"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              placeholder="例: Bio, 金賞"
              className={inputCls}
            />
            <p className="text-xs text-gray-400 mt-0.5">カンマ区切りで複数</p>
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
              className={inputCls}
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              価格（円）
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="3000"
              className={inputCls}
            />
            {priceHint && (
              <p className="text-[10px] text-gray-400 mt-0.5">
                この地域の相場: {priceHint}
              </p>
            )}
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

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setStep("label")}
            className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium"
          >
            戻る
          </button>
          <button
            onClick={goToAromaStep}
            className="flex-1 py-3 rounded-xl bg-[#722f37] text-white font-medium hover:bg-[#5a252c] transition-colors"
          >
            次へ：香り
          </button>
        </div>
      </div>
    );
  }

  // === STEP 1: LABEL (mandatory fields) ===
  return (
    <div className="px-4 pt-6 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-1">ラベル情報</h1>
      <p className="text-sm text-gray-500 mb-4">
        ラベルを撮影するか、必須項目を入力してください
      </p>

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
          {scanning ? "AIが分析中..." : "ラベルを撮影してAI自動入力"}
        </button>
        {scanMessage && step === "label" && (
          <p className="text-xs text-center mt-2 text-gray-500">
            {scanMessage}
          </p>
        )}
      </div>

      {/* Section header */}
      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
        必須項目
      </div>

      <div className="space-y-4">
        {/* Producer */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            生産者名 <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            placeholder="例: Château Margaux, Domaine Leflaive"
            className={inputCls}
          />
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            原産国 <span className="text-red-400">*</span>
          </label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setRegion("");
              setSubRegion("");
              setPriceHint("");
            }}
            className={selectCls}
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
              原産地（産地名）
            </label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setSubRegion("");
                setAromasInitialized(false);
                setPalateInitialized(false);
              }}
              className={selectCls}
            >
              <option value="">選択してください</option>
              {regions.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.nameJa} ({r.name})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sub-Region */}
        {subRegions.length > 0 && (
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              サブ地域
            </label>
            <select
              value={subRegion}
              onChange={(e) => setSubRegion(e.target.value)}
              className={selectCls}
            >
              <option value="">選択してください</option>
              {subRegions.map((sr) => (
                <option key={sr} value={sr}>{sr}</option>
              ))}
            </select>
          </div>
        )}

        {/* Vintage */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            収穫年（ヴィンテージ）
          </label>
          <input
            type="number"
            value={vintage}
            onChange={(e) => setVintage(e.target.value)}
            placeholder="例: 2020"
            className={inputCls}
          />
        </div>

        {/* Appellation / Classification */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              格付け
            </label>
            <input
              type="text"
              value={appellation}
              onChange={(e) => setAppellation(e.target.value)}
              placeholder="AOC, DOCG"
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              品質分類
            </label>
            <input
              type="text"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              placeholder="Grand Cru"
              className={inputCls}
            />
          </div>
        </div>

        {/* ABV & Volume */}
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
              className={inputCls}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              内容量 (ml)
            </label>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="750"
              className={inputCls}
            />
          </div>
        </div>

        {/* Bottler */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            瓶詰め元
          </label>
          <input
            type="text"
            value={bottler}
            onChange={(e) => setBottler(e.target.value)}
            placeholder="例: Mis en bouteille au château"
            className={inputCls}
          />
        </div>
      </div>

      <button
        onClick={() => setStep("detail")}
        disabled={!canProceedFromLabel}
        className="w-full mt-6 py-3 rounded-xl bg-[#722f37] text-white font-medium hover:bg-[#5a252c] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        次へ：詳細情報
      </button>
    </div>
  );
}

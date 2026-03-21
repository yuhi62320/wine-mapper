"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Star } from "lucide-react";
import {
  WineType,
  WineLog,
  PalateLevel,
  WINE_TYPE_LABELS,
  WINE_TYPE_COLORS,
} from "@/lib/types";
import { WINE_COUNTRIES, getSubRegionNames } from "@/lib/countries";
import { getWines, updateWine } from "@/lib/store";
import { AROMA_DATA } from "@/lib/aroma-data";
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

export default function EditWinePage() {
  const params = useParams();
  const router = useRouter();
  const [wine, setWine] = useState<WineLog | null>(null);

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
  const [volume, setVolume] = useState("");
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
  const [showAromaPicker, setShowAromaPicker] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // === Palate ===
  const [sweetness, setSweetness] = useState<PalateLevel>(3);
  const [acidity, setAcidity] = useState<PalateLevel>(3);
  const [tannin, setTannin] = useState<PalateLevel>(3);
  const [body, setBody] = useState<PalateLevel>(3);
  const [finish, setFinish] = useState<PalateLevel>(3);

  const selectedCountry = WINE_COUNTRIES.find(
    (c) => c.name === country || c.nameJa === country
  );
  const regions = selectedCountry?.regions || [];
  const subRegions =
    selectedCountry && region
      ? getSubRegionNames(selectedCountry, region)
      : [];

  // Load existing wine data
  useEffect(() => {
    const wines = getWines();
    const found = wines.find((w) => w.id === params.id);
    if (!found) return;
    setWine(found);

    // Populate all fields
    setProducer(found.producer);
    setCountry(found.country);
    setRegion(found.region);
    setSubRegion(found.subRegion);
    setVillage(found.village);
    setVintage(found.vintage ? String(found.vintage) : "");
    setAppellation(found.appellation);
    setClassification(found.classification);
    setAbv(found.abv != null ? String(found.abv) : "");
    setVolume(found.volume != null ? String(found.volume) : "");
    setBottler(found.bottler);
    setName(found.name);
    setGrapes(found.grapeVarieties.join(", "));
    setAging(found.aging);
    setTasteType(found.tasteType);
    setCertifications(found.certifications.join(", "));
    setProducerUrl(found.producerUrl);
    setType(found.type);
    setPrice(found.price != null ? String(found.price) : "");
    setRating(found.rating);
    setNotes(found.notes);
    setSelectedAromas(found.aromas);
    setSweetness(found.palate.sweetness);
    setAcidity(found.palate.acidity);
    if (found.palate.tannin !== null) setTannin(found.palate.tannin);
    setBody(found.palate.body);
    setFinish(found.palate.finish);
  }, [params.id]);

  function handleSubmit() {
    if (!wine) return;
    const isRed = type === "red";

    const updated: WineLog = {
      ...wine,
      producer,
      country: selectedCountry?.name || country,
      region,
      subRegion,
      village,
      appellation,
      classification,
      vintage: vintage ? parseInt(vintage) : null,
      abv: abv ? parseFloat(abv) : null,
      volume: volume ? parseInt(volume) : null,
      bottler,
      name,
      grapeVarieties: grapes
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      aging,
      tasteType,
      certifications: certifications
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
      producerUrl,
      type,
      price: price ? parseInt(price) : null,
      aromas: selectedAromas,
      palate: {
        sweetness,
        acidity,
        tannin: isRed ? tannin : null,
        body,
        finish,
      },
      rating,
      notes,
    };

    updateWine(updated);
    router.push(`/wines/${wine.id}`);
  }

  if (!wine) {
    return (
      <div className="px-4 pt-6 text-center text-gray-500">
        ワインが見つかりません
      </div>
    );
  }

  const inputCls =
    "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#722f37] focus:ring-1 focus:ring-[#722f37]/30 bg-white";
  const labelCls = "block text-xs font-medium text-gray-600 mb-1";

  const isRed = type === "red";
  const showTannin = isRed;
  const palateSetters: Record<string, (v: PalateLevel) => void> = {
    sweetness: setSweetness,
    acidity: setAcidity,
    tannin: setTannin,
    body: setBody,
    finish: setFinish,
  };
  const palateValues: Record<string, PalateLevel> = {
    sweetness,
    acidity,
    tannin,
    body,
    finish,
  };
  const palateKeys = showTannin
    ? ["sweetness", "acidity", "tannin", "body", "finish"]
    : ["sweetness", "acidity", "body", "finish"];

  const canSubmit = producer || name;

  return (
    <div className="px-4 pt-6 pb-24">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 mb-4 hover:text-gray-700"
      >
        <ArrowLeft size={16} />
        戻る
      </button>

      <h1 className="text-xl font-bold text-gray-900 mb-6">ワインを編集</h1>

      {/* === WINE TYPE === */}
      <div className="mb-6">
        <label className={labelCls}>タイプ</label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(WINE_TYPE_LABELS) as WineType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                type === t
                  ? "ring-2 ring-offset-1 ring-[#722f37] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={
                type === t ? { backgroundColor: WINE_TYPE_COLORS[t] } : {}
              }
            >
              {WINE_TYPE_LABELS[t].ja}
            </button>
          ))}
        </div>
      </div>

      {/* === BASIC INFO === */}
      <div className="mb-6 space-y-3">
        <h2 className="text-sm font-bold text-gray-800">基本情報</h2>

        <div>
          <label className={labelCls}>生産者 *</label>
          <input
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
            className={inputCls}
            placeholder="Domaine, Château, Winery..."
          />
        </div>

        <div>
          <label className={labelCls}>ワイン名 / キュヴェ</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            placeholder="ワイン名"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>ヴィンテージ</label>
            <input
              value={vintage}
              onChange={(e) => setVintage(e.target.value)}
              className={inputCls}
              placeholder="2020"
              type="number"
            />
          </div>
          <div>
            <label className={labelCls}>価格 (¥)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputCls}
              placeholder="3000"
              type="number"
            />
          </div>
        </div>
      </div>

      {/* === ORIGIN === */}
      <div className="mb-6 space-y-3">
        <h2 className="text-sm font-bold text-gray-800">産地</h2>

        <div>
          <label className={labelCls}>国</label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setRegion("");
              setSubRegion("");
            }}
            className={inputCls}
          >
            <option value="">選択してください</option>
            {WINE_COUNTRIES.map((c) => (
              <option key={c.code} value={c.name}>
                {c.nameJa} ({c.name})
              </option>
            ))}
          </select>
        </div>

        {regions.length > 0 && (
          <div>
            <label className={labelCls}>地域</label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setSubRegion("");
              }}
              className={inputCls}
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

        {subRegions.length > 0 && (
          <div>
            <label className={labelCls}>サブ地域</label>
            <select
              value={subRegion}
              onChange={(e) => setSubRegion(e.target.value)}
              className={inputCls}
            >
              <option value="">選択してください</option>
              {subRegions.map((sr) => (
                <option key={sr} value={sr}>
                  {sr}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>村名</label>
            <input
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className={inputCls}
              placeholder="村名"
            />
          </div>
          <div>
            <label className={labelCls}>格付け</label>
            <input
              value={appellation}
              onChange={(e) => setAppellation(e.target.value)}
              className={inputCls}
              placeholder="AOC, DOCG..."
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>品質分類</label>
          <input
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            className={inputCls}
            placeholder="Premier Cru, Reserva..."
          />
        </div>
      </div>

      {/* === DETAILS === */}
      <div className="mb-6 space-y-3">
        <h2 className="text-sm font-bold text-gray-800">詳細</h2>

        <div>
          <label className={labelCls}>品種 (カンマ区切り)</label>
          <input
            value={grapes}
            onChange={(e) => setGrapes(e.target.value)}
            className={inputCls}
            placeholder="Pinot Noir, Chardonnay..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>ABV (%)</label>
            <input
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
              className={inputCls}
              placeholder="13.5"
              type="number"
              step="0.1"
            />
          </div>
          <div>
            <label className={labelCls}>容量 (ml)</label>
            <input
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className={inputCls}
              placeholder="750"
              type="number"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>熟成</label>
          <input
            value={aging}
            onChange={(e) => setAging(e.target.value)}
            className={inputCls}
            placeholder="Barrique, Elevé en fûts de chêne..."
          />
        </div>

        <div>
          <label className={labelCls}>味わいタイプ</label>
          <input
            value={tasteType}
            onChange={(e) => setTasteType(e.target.value)}
            className={inputCls}
            placeholder="Sec, Brut, Doux..."
          />
        </div>

        <div>
          <label className={labelCls}>瓶詰め元</label>
          <input
            value={bottler}
            onChange={(e) => setBottler(e.target.value)}
            className={inputCls}
            placeholder="Mis en bouteille au château"
          />
        </div>

        <div>
          <label className={labelCls}>認証・受賞 (カンマ区切り)</label>
          <input
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            className={inputCls}
            placeholder="Bio, Organic..."
          />
        </div>

        <div>
          <label className={labelCls}>生産者HP</label>
          <input
            value={producerUrl}
            onChange={(e) => setProducerUrl(e.target.value)}
            className={inputCls}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* === RATING === */}
      <div className="mb-6">
        <label className={labelCls}>評価</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s} onClick={() => setRating(s)}>
              <Star
                size={28}
                className={
                  s <= rating
                    ? "fill-[#c9a84c] text-[#c9a84c]"
                    : "text-gray-200"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* === AROMAS === */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className={labelCls}>香り</label>
          <button
            onClick={() => setShowAromaPicker(!showAromaPicker)}
            className="text-xs text-[#722f37]"
          >
            {showAromaPicker ? "閉じる" : "選択"}
          </button>
        </div>

        {selectedAromas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selectedAromas.map((a) => (
              <span
                key={a}
                className="px-2 py-0.5 text-xs bg-[#722f37]/10 text-[#722f37] rounded-full cursor-pointer hover:bg-[#722f37]/20"
                onClick={() =>
                  setSelectedAromas(selectedAromas.filter((x) => x !== a))
                }
              >
                {a} ×
              </span>
            ))}
          </div>
        )}

        {showAromaPicker && (
          <div className="border border-gray-200 rounded-lg p-2 max-h-60 overflow-y-auto space-y-2">
            {AROMA_DATA.map((cat) => (
              <div key={cat.name.en}>
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === cat.name.en ? null : cat.name.en
                    )
                  }
                  className="text-xs font-medium text-gray-700 w-full text-left py-1"
                >
                  {cat.name.ja}
                </button>
                {expandedCategory === cat.name.en &&
                  cat.subcategories.map((sub) => (
                    <div key={sub.name.en} className="ml-2 mb-1">
                      <div className="text-[10px] text-gray-400 mb-0.5">
                        {sub.name.ja}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {sub.descriptors.map((d) => {
                          const selected = selectedAromas.includes(d.ja);
                          return (
                            <button
                              key={d.en}
                              onClick={() =>
                                selected
                                  ? setSelectedAromas(
                                      selectedAromas.filter((x) => x !== d.ja)
                                    )
                                  : setSelectedAromas([
                                      ...selectedAromas,
                                      d.ja,
                                    ])
                              }
                              className={`px-2 py-0.5 text-[10px] rounded-full transition-colors ${
                                selected
                                  ? "bg-[#722f37] text-white"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            ))}
          </div>
        )}
      </div>

      {/* === PALATE === */}
      <div className="mb-6">
        <label className={labelCls}>味わい</label>
        <div className="flex justify-center mb-3">
          <RadarChart
            data={palateKeys.map((k) => ({
              label: PALATE_LABELS[k].label,
              value: palateValues[k],
            }))}
            size={180}
          />
        </div>
        <div className="space-y-3">
          {palateKeys.map((key) => (
            <div key={key}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">
                  {PALATE_LABELS[key].label}
                </span>
                <span className="text-gray-400">
                  {PALATE_LABELS[key].levels[palateValues[key] - 1]}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={palateValues[key]}
                onChange={(e) =>
                  palateSetters[key](parseInt(e.target.value) as PalateLevel)
                }
                className="w-full accent-[#722f37]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* === NOTES === */}
      <div className="mb-6">
        <label className={labelCls}>ノート</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="自由にメモを記入..."
          className={`${inputCls} h-20 resize-none`}
        />
      </div>

      {/* === SUBMIT === */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full py-3 rounded-xl bg-[#722f37] text-white font-medium hover:bg-[#5a252c] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <Check size={18} />
        保存する
      </button>
    </div>
  );
}

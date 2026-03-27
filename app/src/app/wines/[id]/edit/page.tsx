"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
      <div className="min-h-screen bg-[#fcf9f3] flex items-center justify-center">
        <p className="text-[#534343] font-headline text-sm">ワインが見つかりません</p>
      </div>
    );
  }

  const inputCls =
    "w-full bg-transparent border-0 border-b border-[#d8c1c2]/30 px-0 py-3 text-sm font-headline text-[#1c1c18] placeholder:text-[#534343]/40 focus:outline-none focus:border-[#561922] transition-colors";
  const selectCls =
    "w-full bg-transparent border-0 border-b border-[#d8c1c2]/30 px-0 py-3 text-sm font-headline text-[#1c1c18] focus:outline-none focus:border-[#561922] transition-colors appearance-none";
  const labelCls = "block text-[10px] tracking-wider uppercase text-[#534343] mb-1";

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

  /* Section divider component */
  const SectionDivider = ({ label }: { label: string }) => (
    <div className="flex items-center gap-3 pt-6 pb-2">
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#755b00] whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[#d8c1c2]/40" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcf9f3]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#fcf9f3]/80 backdrop-blur-xl border-b border-[#d8c1c2]/20">
        <div className="flex items-center gap-3 px-5 py-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#d8c1c2]/15 transition-colors"
          >
            <span className="material-symbols-outlined text-[#1c1c18]">arrow_back</span>
          </button>
          <h1 className="text-lg font-headline text-[#1c1c18]">Edit Wine</h1>
        </div>
      </header>

      {/* Form Card */}
      <div className="px-4 pt-4 pb-32">
        <div className="bg-[#f6f3ed]/90 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-8">

          {/* === WINE TYPE === */}
          <SectionDivider label="Type" />
          <div className="flex flex-wrap gap-2 mt-3">
            {(Object.keys(WINE_TYPE_LABELS) as WineType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  type === t
                    ? "bg-[#561922] text-white shadow-md"
                    : "bg-transparent border border-[#d8c1c2]/40 text-[#534343] hover:border-[#d8c1c2]"
                }`}
                style={
                  type === t ? { backgroundColor: WINE_TYPE_COLORS[t] } : {}
                }
              >
                {WINE_TYPE_LABELS[t].ja}
              </button>
            ))}
          </div>

          {/* === REGISTRY === */}
          <SectionDivider label="Registry" />
          <div className="space-y-1 mt-2">
            <div>
              <label className={labelCls}>生産者 *</label>
              <input
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                className={inputCls}
                placeholder="Domaine, Chateau, Winery..."
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

            <div className="grid grid-cols-2 gap-6">
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
          <SectionDivider label="Origin" />
          <div className="space-y-1 mt-2">
            <div>
              <label className={labelCls}>国</label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setRegion("");
                  setSubRegion("");
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

            {regions.length > 0 && (
              <div>
                <label className={labelCls}>地域</label>
                <select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setSubRegion("");
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

            {subRegions.length > 0 && (
              <div>
                <label className={labelCls}>サブ地域</label>
                <select
                  value={subRegion}
                  onChange={(e) => setSubRegion(e.target.value)}
                  className={selectCls}
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

            <div className="grid grid-cols-2 gap-6">
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
          <SectionDivider label="Details" />
          <div className="space-y-1 mt-2">
            <div>
              <label className={labelCls}>品種 (カンマ区切り)</label>
              <input
                value={grapes}
                onChange={(e) => setGrapes(e.target.value)}
                className={inputCls}
                placeholder="Pinot Noir, Chardonnay..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
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
                placeholder="Barrique, Eleve en futs de chene..."
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
                placeholder="Mis en bouteille au chateau"
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
          <SectionDivider label="Rating" />
          <div className="flex gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className="transition-transform hover:scale-110"
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{
                    color: s <= rating ? "#755b00" : "#d8c1c2",
                    fontVariationSettings: s <= rating
                      ? "'FILL' 1, 'wght' 400"
                      : "'FILL' 0, 'wght' 300",
                  }}
                >
                  star
                </span>
              </button>
            ))}
          </div>

          {/* === AROMAS === */}
          <SectionDivider label="Aroma" />
          <div className="mt-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#534343]">
                {selectedAromas.length > 0
                  ? `${selectedAromas.length} selected`
                  : "No aromas selected"}
              </span>
              <button
                onClick={() => setShowAromaPicker(!showAromaPicker)}
                className="flex items-center gap-1 text-xs font-medium text-[#561922] hover:text-[#722f37] transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  {showAromaPicker ? "close" : "add_circle"}
                </span>
                {showAromaPicker ? "閉じる" : "選択"}
              </button>
            </div>

            {selectedAromas.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedAromas.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#561922]/10 text-[#561922] rounded-full cursor-pointer hover:bg-[#561922]/20 transition-colors"
                    onClick={() =>
                      setSelectedAromas(selectedAromas.filter((x) => x !== a))
                    }
                  >
                    {a}
                    <span className="material-symbols-outlined text-xs">close</span>
                  </span>
                ))}
              </div>
            )}

            {showAromaPicker && (
              <div className="border border-[#d8c1c2]/30 rounded-2xl p-4 max-h-60 overflow-y-auto space-y-2 bg-[#fcf9f3]/50">
                {AROMA_DATA.map((cat) => (
                  <div key={cat.name.en}>
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === cat.name.en ? null : cat.name.en
                        )
                      }
                      className="flex items-center gap-2 text-xs font-semibold text-[#1c1c18] w-full text-left py-1.5 hover:text-[#561922] transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm text-[#755b00]">
                        {expandedCategory === cat.name.en ? "expand_less" : "expand_more"}
                      </span>
                      {cat.name.ja}
                    </button>
                    {expandedCategory === cat.name.en &&
                      cat.subcategories.map((sub) => (
                        <div key={sub.name.en} className="ml-6 mb-2">
                          <div className="text-[10px] tracking-wider uppercase text-[#534343]/60 mb-1">
                            {sub.name.ja}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
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
                                  className={`px-2.5 py-1 text-[10px] rounded-full transition-all ${
                                    selected
                                      ? "bg-[#561922] text-white shadow-sm"
                                      : "bg-[#d8c1c2]/20 text-[#534343] hover:bg-[#d8c1c2]/40"
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

          {/* === TASTE PROFILE === */}
          <SectionDivider label="Taste Profile" />
          <div className="mt-3">
            <div className="flex justify-center mb-4">
              <RadarChart
                data={palateKeys.map((k) => ({
                  label: PALATE_LABELS[k].label,
                  value: palateValues[k],
                }))}
                size={180}
              />
            </div>
            <div className="space-y-4">
              {palateKeys.map((key) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#1c1c18] font-medium">
                      {PALATE_LABELS[key].label}
                    </span>
                    <span className="text-[#755b00] font-headline text-[11px]">
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
                    className="w-full accent-[#561922]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* === TASTING NOTE === */}
          <SectionDivider label="Tasting Note" />
          <div className="mt-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="自由にメモを記入..."
              className="w-full bg-transparent border-0 border-b border-[#d8c1c2]/30 px-0 py-3 text-sm font-headline text-[#1c1c18] placeholder:text-[#534343]/40 focus:outline-none focus:border-[#561922] transition-colors h-24 resize-none"
            />
          </div>

          {/* === SUBMIT === */}
          <div className="mt-10 space-y-3">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full py-5 rounded-xl bg-[#561922] text-white font-medium text-sm tracking-wide hover:bg-[#722f37] transition-colors flex items-center justify-center gap-2 disabled:bg-[#d8c1c2] disabled:cursor-not-allowed shadow-lg"
            >
              <span className="material-symbols-outlined text-lg">check</span>
              変更を保存
            </button>

            <button
              onClick={() => router.back()}
              className="w-full py-3 text-sm text-[#ba1a1a] hover:text-[#ba1a1a]/70 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

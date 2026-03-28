"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import {
  WineType,
  WineLog,
  WineTour,
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
import { getRegionImage, getSectionImage, getGuideText } from "@/lib/region-images";
import { getAromaVisual, AROMA_IMAGE_COPYRIGHT } from "@/lib/aroma-images";
import { saveWinePhoto } from "@/lib/photo-store";

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

// Reusable section header component
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-[#d8c1c2]/30" />
      <span className="text-[10px] font-label tracking-[0.2em] uppercase text-[#c9a84c]">
        {label}
      </span>
      <div className="h-px flex-1 bg-[#d8c1c2]/30" />
    </div>
  );
}

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
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

  // Section collapse
  const [showAromaPicker, setShowAromaPicker] = useState(false);

  // Grape suggestions
  const [showGrapeSuggestions, setShowGrapeSuggestions] = useState(false);
  const [grapeFilter, setGrapeFilter] = useState("");

  // Text search (when no image)
  const [textSearching, setTextSearching] = useState(false);

  // Candidate picker for multi-result search
  const [candidates, setCandidates] = useState<any[]>([]);
  const [showCandidates, setShowCandidates] = useState(false);

  // Region guide (supports both old string format and new object format)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [regionGuide, setRegionGuide] = useState<Record<string, any> | null>(null);
  const [loadingGuide, setLoadingGuide] = useState(false);

  // Tour search
  const [tours, setTours] = useState<WineTour[]>([]);
  const [tourTravelTips, setTourTravelTips] = useState("");
  const [tourNearby, setTourNearby] = useState<string[]>([]);
  const [searchingTours, setSearchingTours] = useState(false);
  const [savedTours, setSavedTours] = useState<WineTour[]>([]);

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

  // Initialize aroma/palate defaults once grapes or vision result change
  useEffect(() => {
    if (!aromasInitialized && (normalizedGrapes.length > 0 || visionResult)) {
      applyGrapeDefaults();
    }
  }, [normalizedGrapes.length, visionResult]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch region guide when region changes (with localStorage caching)
  useEffect(() => {
    if (!country || !region) { setRegionGuide(null); return; }
    const cacheKey = `region-guide:${country}:${region}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        setRegionGuide(parsed);
        return;
      }
    } catch { /* ignore parse errors */ }
    setLoadingGuide(true);
    fetch("/api/region-guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, region, subRegion, village, grapeVarieties: normalizedGrapes }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setRegionGuide(data);
          try { localStorage.setItem(cacheKey, JSON.stringify(data)); } catch { /* quota exceeded */ }
        }
      })
      .catch(() => {})
      .finally(() => setLoadingGuide(false));
  }, [country, region]); // eslint-disable-line react-hooks/exhaustive-deps

  // Force refresh region guide (clear cache and re-fetch)
  function handleRefreshGuide() {
    if (!country || !region) return;
    const cacheKey = `region-guide:${country}:${region}`;
    try { localStorage.removeItem(cacheKey); } catch { /* ignore */ }
    setRegionGuide(null);
    setLoadingGuide(true);
    fetch("/api/region-guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, region, subRegion, village, grapeVarieties: normalizedGrapes }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) {
          setRegionGuide(data);
          try { localStorage.setItem(cacheKey, JSON.stringify(data)); } catch { /* quota exceeded */ }
        }
      })
      .catch(() => {})
      .finally(() => setLoadingGuide(false));
  }

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

      // Store photo for later saving
      setPhotoDataUrl(dataUrl);

      applyVisionResult(result);
    } catch (err) {
      setScanMessage(`エラー: ${err instanceof Error ? err.message : "分析に失敗しました"}`);
    } finally {
      setScanning(false);
    }
  }

  // === Apply a single candidate result to form fields ===
  function applyCandidateResult(candidate: any) {
    // Registry fields
    if (candidate.producer) setProducer(candidate.producer);
    if (candidate.name) setName(candidate.name);
    if (candidate.country) {
      const match = WINE_COUNTRIES.find(
        (c) => c.name.toLowerCase() === candidate.country.toLowerCase() || c.nameJa === candidate.country
      );
      if (match) setCountry(match.name);
    }
    if (candidate.region) setRegion(candidate.region);
    if (candidate.sub_region) setSubRegion(candidate.sub_region);
    if (candidate.village) setVillage(candidate.village);
    if (candidate.vintage) setVintage(String(candidate.vintage));
    if (candidate.appellation) setAppellation(candidate.appellation);
    if (candidate.classification) setClassification(candidate.classification);
    if (candidate.grape_varieties?.length > 0) setGrapes(candidate.grape_varieties.join(", "));
    if (candidate.abv) setAbv(String(candidate.abv));
    if (candidate.aging) setAging(candidate.aging);
    if (candidate.taste_type) setTasteType(candidate.taste_type);
    if (candidate.bottler) setBottler(candidate.bottler);
    if (candidate.certifications?.length > 0) setCertifications(candidate.certifications.join(", "));
    if (candidate.producer_url) setProducerUrl(candidate.producer_url);
    if (candidate.type) setType(candidate.type);

    // Aroma, palate, price, description
    if (candidate.aromas || candidate.palate) {
      const clamp = (v: number): PalateLevel => Math.max(1, Math.min(5, Math.round(v))) as PalateLevel;
      setVisionResult({
        label: { producer: "", name: "", country: "", region: "", subRegion: "", village: "", vintage: null, appellation: "", classification: "", abv: null, volume: null, bottler: "", grapeVarieties: [], aging: "", tasteType: "", certifications: [], type: "red" },
        knowledge: {
          priceRange: candidate.priceRange || { min: 0, max: 0 },
          aromas: candidate.aromas || [],
          palate: {
            sweetness: clamp(candidate.palate?.sweetness ?? 3),
            acidity: clamp(candidate.palate?.acidity ?? 3),
            tannin: candidate.palate?.tannin != null ? clamp(candidate.palate.tannin) : null,
            body: clamp(candidate.palate?.body ?? 3),
            finish: clamp(candidate.palate?.finish ?? 3),
          },
          grapeBaseAromas: [],
          grapeBasePalate: { sweetness: 3 as PalateLevel, acidity: 3 as PalateLevel, tannin: null, body: 3 as PalateLevel, finish: 3 as PalateLevel },
          description: candidate.description || "",
          producerUrl: candidate.producer_url || "",
          confidence: candidate.confidence || "low",
        },
      });
      setAromasInitialized(false);
      setPalateInitialized(false);
    }

    if (candidate.priceRange?.min > 0) {
      const mid = Math.round((candidate.priceRange.min + candidate.priceRange.max) / 2);
      setPrice(String(mid));
      setPriceHint(`¥${candidate.priceRange.min.toLocaleString()}〜¥${candidate.priceRange.max.toLocaleString()}`);
    } else if (candidate.price) {
      setPrice(String(candidate.price));
    }

    const conf = candidate.confidence === "high" ? "高" : candidate.confidence === "medium" ? "中" : "低";
    setScanMessage(`検索完了（確度: ${conf}）${candidate.description ? ` - ${candidate.description}` : ""}`);

    // Close the picker
    setShowCandidates(false);
    setCandidates([]);
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

      // Handle new multi-candidate response format
      if (data.candidates && Array.isArray(data.candidates)) {
        if (data.exactMatch && data.candidates.length === 1) {
          // Exact match with single candidate - auto-apply
          applyCandidateResult(data.candidates[0]);
        } else if (data.candidates.length > 1) {
          // Multiple candidates - show picker
          setCandidates(data.candidates);
          setShowCandidates(true);
          setScanMessage(`${data.candidates.length}件の候補が見つかりました。選択してください。`);
        } else if (data.candidates.length === 1) {
          // Single candidate but not exact match - still auto-apply
          applyCandidateResult(data.candidates[0]);
        } else {
          setScanMessage("候補が見つかりませんでした");
        }
      } else {
        // Legacy response format (single result, no candidates array)
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
      }
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

  // === Tour Search ===
  async function handleTourSearch() {
    setSearchingTours(true);
    setTours([]);
    setTourTravelTips("");
    setTourNearby([]);
    try {
      const res = await fetch("/api/wine-tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producer,
          wineName: name,
          country: selectedCountry?.name || country,
          region,
          subRegion,
          village,
          grapeVarieties: normalizedGrapes,
        }),
      });
      if (!res.ok) {
        setSearchingTours(false);
        return;
      }
      const data = await res.json();
      if (data.tours) setTours(data.tours);
      if (data.travelTips) setTourTravelTips(data.travelTips);
      if (data.nearbyAttractions) setTourNearby(data.nearbyAttractions);
    } catch {
      // ignore
    } finally {
      setSearchingTours(false);
    }
  }

  function toggleSaveTour(tour: WineTour) {
    setSavedTours((prev) => {
      const exists = prev.some((t) => t.title === tour.title);
      if (exists) return prev.filter((t) => t.title !== tour.title);
      return [...prev, tour];
    });
  }

  async function handleSubmit() {
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
      tours: savedTours.length > 0 ? savedTours : undefined,
    };

    const result = addWine(wine);

    // Save photo if one was captured
    if (photoDataUrl) {
      await saveWinePhoto(wine.id, photoDataUrl);
    }

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

  // Underline input style
  const underlineInput =
    "w-full bg-transparent border-0 border-b border-[#d8c1c2]/30 px-1 py-2.5 text-sm text-[#1c1c18] placeholder:text-[#534343]/40 focus:outline-none focus:border-[#561922] transition-colors";
  const underlineSelect =
    "w-full bg-transparent border-0 border-b border-[#d8c1c2]/30 px-1 py-2.5 text-sm text-[#1c1c18] focus:outline-none focus:border-[#561922] transition-colors appearance-none";

  // === RESULT SCREEN ===
  if (logResult) {
    return (
      <div className="min-h-screen bg-[#fcf9f3]">
        <div className="px-5 pt-10 pb-28">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="material-symbols-outlined text-[#c9a84c] text-4xl mb-3 block">local_bar</span>
            <h1 className="font-headline text-2xl text-[#1c1c18] mb-2">記録完了</h1>
            <p className="text-sm text-[#534343]">
              {logResult.wine.producer}
              {logResult.wine.name && ` - ${logResult.wine.name}`}
            </p>
          </div>

          {/* XP Card */}
          <div className="bg-gradient-to-br from-[#561922] to-[#722f37] rounded-2xl p-5 mb-5 text-white shadow-lg">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="material-symbols-outlined text-[#c9a84c]">auto_awesome</span>
              <span className="font-headline text-xl">+{logResult.xpGained} XP</span>
            </div>
            {logResult.bonusReasons.map((r, i) => (
              <div key={i} className="text-sm text-white/70 ml-9">{r}</div>
            ))}
          </div>

          {/* Radar Chart Card */}
          <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-[#d8c1c2]/20">
            <div className="flex justify-center">
              <RadarChart data={radarData} baseData={radarBaseData} size={200} />
            </div>
            {radarBaseData && (
              <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-[#534343]">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-4 h-0.5 bg-[#d4a574] border-dashed border-t border-[#d4a574]" />
                  品種の特徴
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-4 h-0.5 bg-[#722f37]" />
                  あなたの評価
                </span>
              </div>
            )}
          </div>

          {/* Rank Up */}
          {logResult.rankUp && (
            <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl p-5 mb-5 text-center">
              <span className="material-symbols-outlined text-[#c9a84c] text-4xl mb-2 block">military_tech</span>
              <div className="font-headline text-[#c9a84c] text-lg">ランクアップ!</div>
            </div>
          )}

          {/* New Badges */}
          {logResult.newBadges.length > 0 && (
            <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-[#d8c1c2]/20">
              <div className="font-headline text-[#1c1c18] mb-3">新しいバッジ獲得!</div>
              {logResult.newBadges.map((id) => {
                const badge = BADGES.find((b) => b.id === id);
                return badge ? (
                  <div key={id} className="flex items-center gap-3 py-2">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <div className="font-medium text-sm text-[#1c1c18]">{badge.nameJa}</div>
                      <div className="text-xs text-[#534343]">{badge.description}</div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* Home Button */}
          <button
            onClick={() => router.push("/")}
            className="w-full py-3.5 rounded-full bg-[#561922] text-white font-headline text-sm tracking-wide hover:bg-[#722f37] transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  // === SINGLE-PAGE FORM (Wine Journal) ===
  return (
    <div className="min-h-screen bg-[#fcf9f3]">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleScan}
        className="hidden"
      />

      {/* ===== HEADER ===== */}
      <header className="px-5 pt-5 pb-2 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-[#534343] p-1">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 text-[#1c1c18]">
          <span className="material-symbols-outlined text-lg text-[#c9a84c]">edit_note</span>
          <span className="font-headline text-base tracking-wide">Wine Journal</span>
        </div>
        <div className="w-8" /> {/* Spacer for centering */}
      </header>

      {/* ===== HERO TITLE ===== */}
      <div className="text-center px-5 pt-6 pb-5">
        <h1 className="font-headline text-[26px] text-[#1c1c18] leading-tight mb-1.5">
          新しくワインを記す
        </h1>
        <p className="text-[11px] tracking-[0.25em] uppercase text-[#534343]/60 font-label">
          The Sommelier&apos;s Ledger
        </p>
      </div>

      {/* ===== QUICK SCAN / SEARCH BUTTONS ===== */}
      <div className="px-5 mb-5">
        <div className="flex gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={scanning || textSearching}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-[#561922] text-[#561922] text-sm font-medium hover:bg-[#561922]/5 transition-colors disabled:opacity-50"
          >
            {scanning ? (
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-lg">photo_camera</span>
            )}
            {scanning ? "分析中..." : "ラベル撮影"}
          </button>
          <button
            onClick={handleTextSearch}
            disabled={textSearching || scanning || (!producer && !name)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#561922] text-white text-sm font-medium hover:bg-[#722f37] transition-colors disabled:opacity-40"
          >
            {textSearching ? (
              <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-lg">search</span>
            )}
            {textSearching ? "検索中..." : "検索して引用"}
          </button>
        </div>

        {/* Scan message */}
        {scanMessage && (
          <p className="text-xs text-center text-[#534343]/70 mt-3 whitespace-pre-line leading-relaxed">
            {scanMessage}
          </p>
        )}

        {/* Photo thumbnail preview */}
        {photoDataUrl && (
          <div className="flex items-start gap-2 mt-3">
            <img
              src={photoDataUrl}
              alt="Wine label photo"
              className="rounded-lg object-cover"
              style={{ maxHeight: 120 }}
            />
            <button
              type="button"
              onClick={() => setPhotoDataUrl(null)}
              className="p-0.5 rounded-full bg-[#534343]/20 hover:bg-[#534343]/40 transition-colors"
              aria-label="Remove photo"
            >
              <span className="material-symbols-outlined text-sm text-[#534343]">close</span>
            </button>
          </div>
        )}
      </div>

      {/* ===== CANDIDATE PICKER OVERLAY ===== */}
      {showCandidates && candidates.length > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => { setShowCandidates(false); setCandidates([]); }}
          />
          {/* Bottom sheet panel */}
          <div className="relative bg-[#fcf9f3] rounded-t-3xl max-h-[75vh] flex flex-col shadow-2xl border-t border-[#d8c1c2]/30">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[#d8c1c2]/50" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3">
              <h2 className="font-headline text-lg text-[#1c1c18]">候補を選択</h2>
              <button
                onClick={() => { setShowCandidates(false); setCandidates([]); }}
                className="p-1.5 rounded-full hover:bg-[#d8c1c2]/20 transition-colors"
              >
                <span className="material-symbols-outlined text-xl text-[#534343]">close</span>
              </button>
            </div>
            {/* Candidate list */}
            <div className="overflow-y-auto px-5 pb-6 space-y-3">
              {candidates.map((c, idx) => {
                const typeColor = c.type === "red" ? "#722f37"
                  : c.type === "white" ? "#c9a84c"
                  : c.type === "rose" ? "#d4768c"
                  : c.type === "sparkling" ? "#8fa8b8"
                  : c.type === "dessert" ? "#d4a574"
                  : c.type === "fortified" ? "#8b5c2a"
                  : c.type === "orange" ? "#d4884c"
                  : "#534343";
                const typeLabel = c.type ? (WINE_TYPE_LABELS[c.type as WineType]?.ja || c.type) : "";
                const confLevel = c.confidence === "high" ? "高" : c.confidence === "medium" ? "中" : "低";
                const confColor = c.confidence === "high" ? "#2d7a3a" : c.confidence === "medium" ? "#c9a84c" : "#534343";
                return (
                  <button
                    key={idx}
                    onClick={() => applyCandidateResult(c)}
                    className="w-full text-left bg-white rounded-2xl p-4 shadow-sm border border-[#d8c1c2]/20 hover:border-[#561922]/40 hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    {/* Top row: type badge + confidence */}
                    <div className="flex items-center justify-between mb-2">
                      {typeLabel && (
                        <span className="flex items-center gap-1.5 text-[10px] font-label tracking-wider uppercase" style={{ color: typeColor }}>
                          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: typeColor }} />
                          {typeLabel}
                        </span>
                      )}
                      <span className="text-[10px] font-label tracking-wider" style={{ color: confColor }}>
                        確度: {confLevel}
                      </span>
                    </div>
                    {/* Producer */}
                    {c.producer && (
                      <div className="text-[11px] text-[#534343]/70 font-label tracking-wide mb-0.5">
                        {c.producer}
                      </div>
                    )}
                    {/* Wine name */}
                    <div className="font-headline text-sm text-[#1c1c18] leading-snug">
                      {c.name || c.producer || "Unknown Wine"}
                      {c.vintage ? ` ${c.vintage}` : ""}
                    </div>
                    {/* Region / Country */}
                    {(c.region || c.country) && (
                      <div className="text-[11px] text-[#534343]/60 mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        {[c.region, c.country].filter(Boolean).join(", ")}
                      </div>
                    )}
                    {/* Description */}
                    {c.description && (
                      <p className="text-[11px] text-[#534343]/50 mt-1.5 line-clamp-2 leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* AI description banner */}
      {visionResult?.knowledge.description && (
        <div className="mx-5 mb-5 bg-[#c9a84c]/10 border border-[#c9a84c]/25 rounded-2xl p-4">
          <p className="text-xs text-[#755b00] leading-relaxed">
            <span className="material-symbols-outlined text-xs align-middle mr-1">auto_awesome</span>
            {visionResult.knowledge.description}
          </p>
          {priceHint && (
            <p className="text-xs text-[#755b00]/70 mt-1.5">
              <span className="material-symbols-outlined text-xs align-middle mr-0.5">payments</span>
              価格目安: {priceHint}
            </p>
          )}
        </div>
      )}

      {/* ===== LEDGER CARD ===== */}
      <div className="mx-4 mb-6 bg-white rounded-3xl shadow-[0_2px_20px_rgba(86,25,34,0.06)] border border-[#d8c1c2]/15 overflow-hidden">
        <div className="px-5 pt-6 pb-5">

          {/* ---- REGISTRY SECTION ---- */}
          <SectionDivider label="Registry" />

          {/* Producer */}
          <div className="mb-5">
            <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
              生産者名 <span className="text-[#561922]">*</span>
            </label>
            <input
              type="text"
              value={producer}
              onChange={(e) => setProducer(e.target.value)}
              placeholder="Chateau Margaux"
              className={`${underlineInput} font-headline italic`}
            />
          </div>

          {/* Wine Name + Vintage */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="col-span-2">
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                ワイン名 / キュヴェ
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Les Forts de Latour"
                className={`${underlineInput} font-headline`}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                ヴィンテージ
              </label>
              <input
                type="number"
                value={vintage}
                onChange={(e) => setVintage(e.target.value)}
                placeholder="2020"
                className={`${underlineInput} font-headline text-center`}
              />
            </div>
          </div>

          {/* Type selector - pills */}
          <div className="mb-5">
            <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-2.5">
              タイプ <span className="text-[#561922]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(WINE_TYPE_LABELS) as WineType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 text-xs rounded-full border transition-all flex items-center gap-2 ${
                    type === t
                      ? "border-[#561922] bg-[#561922] text-white shadow-sm"
                      : "border-[#d8c1c2]/40 text-[#534343] hover:border-[#561922]/40"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${type === t ? "ring-1 ring-white/50" : ""}`}
                    style={{ backgroundColor: WINE_TYPE_COLORS[t] }}
                  />
                  {WINE_TYPE_LABELS[t].ja}
                </button>
              ))}
            </div>
          </div>

          {/* Country + Region */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                原産国 <span className="text-[#561922]">*</span>
              </label>
              <select
                value={country}
                onChange={(e) => { setCountry(e.target.value); setRegion(""); setSubRegion(""); setVillage(""); }}
                className={underlineSelect}
              >
                <option value="">選択</option>
                {WINE_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>{c.nameJa}</option>
                ))}
              </select>
            </div>
            {regions.length > 0 ? (
              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                  地域
                </label>
                <select
                  value={region}
                  onChange={(e) => { setRegion(e.target.value); setSubRegion(""); setVillage(""); setAromasInitialized(false); setPalateInitialized(false); }}
                  className={underlineSelect}
                >
                  <option value="">選択</option>
                  {regions.map((r) => <option key={r.name} value={r.name}>{r.nameJa}</option>)}
                </select>
              </div>
            ) : (
              <div>
                <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                  地域
                </label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="地域名"
                  className={underlineInput}
                />
              </div>
            )}
          </div>

          {/* Sub-Region */}
          {subRegions.length > 0 && (
            <div className="mb-5">
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                サブ地域
              </label>
              <select
                value={subRegion}
                onChange={(e) => setSubRegion(e.target.value)}
                className={underlineSelect}
              >
                <option value="">選択</option>
                {subRegions.map((sr) => <option key={sr} value={sr}>{sr}</option>)}
              </select>
            </div>
          )}

          {/* Village */}
          <div className="mb-5">
            <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
              村名 / コミューン
            </label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              placeholder="Pauillac, Chambolle-Musigny"
              className={underlineInput}
            />
          </div>

          {/* Grapes with master suggestions */}
          <div className="relative mb-5">
            <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
              ブドウ品種
            </label>
            <div className="flex gap-2 items-end">
              <input
                type="text"
                value={grapes}
                onChange={(e) => { setGrapes(e.target.value); setAromasInitialized(false); setPalateInitialized(false); }}
                placeholder="Cabernet Sauvignon, Merlot"
                className={`${underlineInput} flex-1`}
              />
              <button
                onClick={() => setShowGrapeSuggestions(!showGrapeSuggestions)}
                className="pb-2.5 text-[#534343]/50 hover:text-[#561922] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">format_list_bulleted</span>
              </button>
            </div>
            {/* Normalized display */}
            {grapeList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {grapeList.map((g, i) => {
                  const grape = findGrape(g);
                  return (
                    <span
                      key={i}
                      className={`px-2.5 py-0.5 text-[10px] rounded-full ${
                        grape
                          ? "bg-[#561922]/8 text-[#561922] border border-[#561922]/15"
                          : "bg-[#f6f3ed] text-[#534343] border border-[#d8c1c2]/20"
                      }`}
                    >
                      {grape ? grape.nameJa : g}
                    </span>
                  );
                })}
              </div>
            )}
            {/* Suggestion dropdown */}
            {showGrapeSuggestions && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#d8c1c2]/30 rounded-2xl shadow-xl max-h-60 overflow-y-auto">
                <div className="sticky top-0 bg-white p-3 border-b border-[#d8c1c2]/20">
                  <input
                    type="text"
                    value={grapeFilter}
                    onChange={(e) => setGrapeFilter(e.target.value)}
                    placeholder="品種名で絞り込み..."
                    className="w-full border border-[#d8c1c2]/30 rounded-xl px-3 py-2 text-xs bg-[#fcf9f3] focus:outline-none focus:border-[#561922]"
                    autoFocus
                  />
                </div>
                {filteredSuggestions.slice(0, 30).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => addGrapeFromSuggestion(s.id)}
                    className="w-full text-left px-4 py-2.5 text-xs hover:bg-[#fcf9f3] border-b border-[#d8c1c2]/10 text-[#1c1c18]"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Appellation + Classification */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                格付け
              </label>
              <input
                type="text"
                value={appellation}
                onChange={(e) => setAppellation(e.target.value)}
                placeholder="AOC, DOCG"
                className={underlineInput}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                品質分類
              </label>
              <input
                type="text"
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                placeholder="Grand Cru"
                className={underlineInput}
              />
            </div>
          </div>

          {/* ABV + Volume + Price */}
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                ABV%
              </label>
              <input
                type="number"
                step="0.1"
                value={abv}
                onChange={(e) => setAbv(e.target.value)}
                placeholder="13.5"
                className={`${underlineInput} text-center`}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                容量ml
              </label>
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="750"
                className={`${underlineInput} text-center`}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                価格
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3,000"
                className={`${underlineInput} text-center`}
              />
            </div>
          </div>
          {priceHint && !visionResult?.knowledge.description && (
            <p className="text-[10px] text-[#534343]/50 mb-4">
              <span className="material-symbols-outlined text-[10px] align-middle mr-0.5">info</span>
              相場: {priceHint}
            </p>
          )}

          {/* Aging + Taste Type */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                熟成表記
              </label>
              <input
                type="text"
                value={aging}
                onChange={(e) => setAging(e.target.value)}
                placeholder="Reserva"
                className={underlineInput}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
                味わいタイプ
              </label>
              <input
                type="text"
                value={tasteType}
                onChange={(e) => setTasteType(e.target.value)}
                placeholder="辛口, Brut"
                className={underlineInput}
              />
            </div>
          </div>

          {/* Bottler + Certifications + Producer URL */}
          <div className="mb-5">
            <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
              瓶詰め元
            </label>
            <input
              type="text"
              value={bottler}
              onChange={(e) => setBottler(e.target.value)}
              placeholder="Mis en bouteille au chateau"
              className={underlineInput}
            />
          </div>
          <div className="mb-5">
            <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
              認証・受賞
            </label>
            <input
              type="text"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              placeholder="Bio, 金賞（カンマ区切り）"
              className={underlineInput}
            />
          </div>
          <div className="mb-2">
            <label className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label block mb-1">
              生産者HP
            </label>
            <input
              type="url"
              value={producerUrl}
              onChange={(e) => setProducerUrl(e.target.value)}
              placeholder="https://..."
              className={underlineInput}
            />
          </div>

          {/* ---- TASTE PROFILE SECTION ---- */}
          <SectionDivider label="Taste Profile" />

          {/* Radar Chart */}
          <div className="flex justify-center mb-3">
            <RadarChart
              data={radarData}
              baseData={radarBaseData}
              size={260}
              levelLabels={Object.fromEntries(
                Object.entries(PALATE_LABELS).map(([, meta]) => [meta.label, meta.levels])
              )}
              interactive={true}
              onChange={(index, value) => palateSetters[index](value)}
            />
          </div>
          {radarBaseData && (
            <div className="flex items-center justify-center gap-4 mb-2 text-[10px] text-[#534343]/60">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-0.5 bg-[#d4a574] border-dashed border-t border-[#d4a574]" />
                品種の特徴
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-0.5 bg-[#722f37]" />
                このワイン
              </span>
            </div>
          )}

          {/* Reset button and drag instruction */}
          <div className="flex flex-col items-center gap-1 mb-4">
            <button
              onClick={resetPalateDefaults}
              className="flex items-center gap-1 text-[10px] text-[#534343]/50 hover:text-[#561922] transition-colors"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              リセット
            </button>
            <p className="text-[10px] text-[#534343]/40 text-center">ドラッグして味わいを調整</p>
          </div>

          {/* ---- AROMA SECTION ---- */}
          <SectionDivider label="Aroma" />

          {/* Selected aromas with images */}
          {selectedAromas.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedAromas.map((a) => {
                const visual = getAromaVisual(a);
                return (
                  <button
                    key={a}
                    onClick={() => toggleAroma(a)}
                    className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 text-xs rounded-full bg-[#561922] text-white"
                  >
                    <span className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 bg-white/20 flex items-center justify-center">
                      {visual.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={visual.imageUrl}
                          alt={a}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.textContent = visual.emoji; }}
                        />
                      ) : (
                        <span className="text-sm">{visual.emoji}</span>
                      )}
                    </span>
                    {a}
                    <span className="material-symbols-outlined text-[14px] ml-0.5 opacity-70">close</span>
                  </button>
                );
              })}
            </div>
          )}
          {selectedAromas.length > 0 && (
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] text-[#534343]/40">{AROMA_IMAGE_COPYRIGHT}</p>
              <button
                onClick={resetAromaDefaults}
                className="flex items-center gap-1 text-[10px] text-[#534343]/50 hover:text-[#561922] transition-colors"
              >
                <span className="material-symbols-outlined text-xs">restart_alt</span>
                リセット
              </button>
            </div>
          )}

          {/* Toggle aroma picker */}
          <button
            onClick={() => setShowAromaPicker(!showAromaPicker)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#d8c1c2]/30 text-xs text-[#534343] hover:bg-[#f6f3ed] transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              {showAromaPicker ? "expand_less" : "expand_more"}
            </span>
            {showAromaPicker ? "アロマホイールを閉じる" : "アロマホイールから追加"}
          </button>

          {showAromaPicker && (
            <div className="mt-3 space-y-2">
              {AROMA_DATA.map((cat) => (
                <div key={cat.name.en} className="bg-[#fcf9f3] rounded-2xl border border-[#d8c1c2]/15 overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === cat.name.en ? null : cat.name.en)}
                    className="w-full flex items-center justify-between p-3.5 text-left"
                  >
                    <span className="text-sm text-[#1c1c18]">
                      {cat.name.ja} <span className="text-[10px] text-[#534343]/40 ml-1">{cat.name.en}</span>
                    </span>
                    <span className="material-symbols-outlined text-base text-[#534343]/40">
                      {expandedCategory === cat.name.en ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {expandedCategory === cat.name.en && (
                    <div className="px-3.5 pb-3.5 space-y-3">
                      {cat.subcategories.map((sub) => (
                        <div key={sub.name.en}>
                          <div className="text-[10px] tracking-[0.1em] uppercase text-[#c9a84c] mb-2">{sub.name.ja}</div>
                          <div className="flex flex-wrap gap-1.5">
                            {sub.descriptors.map((d) => {
                              const isSelected = selectedAromas.includes(d.ja);
                              const isGrapeBase = grapeBaseAromas.includes(d.ja);
                              const vis = getAromaVisual(d.ja);
                              return (
                                <button
                                  key={d.en}
                                  onClick={() => toggleAroma(d.ja)}
                                  className={`flex items-center gap-1 pl-1 pr-2.5 py-1 text-xs rounded-full border transition-colors ${
                                    isSelected
                                      ? "bg-[#561922] text-white border-[#561922]"
                                      : isGrapeBase
                                        ? "bg-[#c9a84c]/10 text-[#755b00] border-[#c9a84c]/30"
                                        : "bg-white text-[#534343] border-[#d8c1c2]/30 hover:border-[#561922]/40"
                                  }`}
                                >
                                  <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 bg-white/20 flex items-center justify-center text-[10px]">
                                    {vis.imageUrl ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={vis.imageUrl}
                                        alt={d.ja}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.textContent = vis.emoji; }}
                                      />
                                    ) : (
                                      vis.emoji
                                    )}
                                  </span>
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
          )}

          {/* ---- TASTING NOTE SECTION ---- */}
          <SectionDivider label="Tasting Note" />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="自由にメモを記入..."
            className="notebook-line w-full bg-transparent border-0 px-1 py-2 text-sm text-[#1c1c18] placeholder:text-[#534343]/30 focus:outline-none resize-none min-h-[100px] font-headline"
          />

          {/* ---- STAR RATING ---- */}
          <div className="flex items-center justify-between mt-4 mb-2">
            <span className="text-[10px] tracking-[0.15em] uppercase text-[#534343]/60 font-label">
              評価 <span className="text-[#561922]">*</span>
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <button key={v} onClick={() => setRating(v)} className="p-0.5">
                  <span
                    className={`material-symbols-outlined text-[28px] transition-colors ${
                      v <= rating ? "text-[#c9a84c]" : "text-[#d8c1c2]/40"
                    }`}
                    style={v <= rating ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ===== REGION GUIDE (outside ledger card) ===== */}
      {(regionGuide || loadingGuide) && (
        <div className="mx-4 mb-6">
          {/* Header with refresh button */}
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-headline text-sm text-[#1c1c18] flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#c9a84c]">pin_drop</span>
              {regionGuide?.regionName || region}の産地ガイド
            </h3>
            <button
              onClick={handleRefreshGuide}
              disabled={loadingGuide}
              className="flex items-center gap-1 text-[10px] text-[#534343]/50 hover:text-[#561922] disabled:opacity-50 transition-colors"
            >
              <span className={`material-symbols-outlined text-xs ${loadingGuide ? "animate-spin" : ""}`}>refresh</span>
              AIで再検索
            </button>
          </div>

          {loadingGuide ? (
            <div className="flex items-center justify-center gap-2 text-xs text-[#755b00] py-12 bg-[#c9a84c]/5 border border-[#c9a84c]/15 rounded-2xl">
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
              産地情報を取得中...
            </div>
          ) : regionGuide && (
            <div className="space-y-3">
              {/* Hero image */}
              <div className="w-full h-44 rounded-2xl overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getRegionImage(region)}
                  alt={`${region} wine region`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="text-lg font-headline">{regionGuide.regionName || region}</div>
                  <div className="text-xs text-white/80">{region}</div>
                </div>
              </div>

              {/* Guide section cards */}
              {[
                { key: "terroir", icon: "public", title: "テロワール" },
                { key: "climate", icon: "wb_sunny", title: "気候" },
                { key: "history", icon: "history_edu", title: "歴史" },
                { key: "keyStyles", icon: "wine_bar", title: "主要スタイル" },
                { key: "topProducers", icon: "emoji_events", title: "著名な生産者" },
                { key: "foodPairing", icon: "restaurant", title: "フードペアリング" },
                { key: "visitTips", icon: "flight", title: "旅行ガイド" },
                { key: "regulations", icon: "gavel", title: "法規・規定" },
                { key: "sommNotes", icon: "school", title: "ソムリエ試験ポイント" },
                { key: "vintageGuide", icon: "calendar_month", title: "ヴィンテージガイド" },
                { key: "funFact", icon: "lightbulb", title: "豆知識" },
              ].map(({ key, icon, title }) => {
                const text = getGuideText(regionGuide[key]);
                if (!text) return null;
                return (
                  <div key={key} className="bg-white rounded-2xl border border-[#d8c1c2]/15 shadow-sm overflow-hidden">
                    <div className="flex">
                      {/* Section image */}
                      <div className="w-24 min-h-[80px] flex-shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getSectionImage(key, region)}
                          alt={title}
                          className="w-full h-full object-cover absolute inset-0"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                      {/* Text content */}
                      <div className="flex-1 p-3.5">
                        <div className="text-xs text-[#1c1c18] mb-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-[#c9a84c]">{icon}</span>
                          <span className="font-medium">{title}</span>
                        </div>
                        <p className="text-xs text-[#534343] leading-relaxed">{text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Copyright notice */}
              <p className="text-[10px] text-[#534343]/40 text-center pt-1">
                Photos: Unsplash / CC0
              </p>
            </div>
          )}
        </div>
      )}

      {/* ===== TOUR SEARCH SECTION ===== */}
      {(country || region) && (
        <div className="mx-4 mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-headline text-sm text-[#1c1c18] flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#c9a84c]">flight</span>
              関連する旅行プラン
            </h3>
            <button
              onClick={handleTourSearch}
              disabled={searchingTours}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-medium text-white bg-[#561922] rounded-full hover:bg-[#722f37] transition-colors disabled:opacity-50"
            >
              {searchingTours ? (
                <span className="material-symbols-outlined text-xs animate-spin">progress_activity</span>
              ) : (
                <span className="material-symbols-outlined text-xs">search</span>
              )}
              {searchingTours ? "検索中..." : "ツアーを検索"}
            </button>
          </div>

          {tours.length > 0 && (
            <div className="space-y-3">
              {/* Travel tips */}
              {tourTravelTips && (
                <div className="bg-[#c9a84c]/8 border border-[#c9a84c]/20 rounded-2xl p-4">
                  <p className="text-xs text-[#755b00] leading-relaxed">
                    <span className="material-symbols-outlined text-xs align-middle mr-1">lightbulb</span>
                    {tourTravelTips}
                  </p>
                </div>
              )}

              {/* Tour cards */}
              {tours.map((tour, i) => {
                const isSaved = savedTours.some((t) => t.title === tour.title);
                const typeIcon: Record<string, string> = {
                  winery_visit: "castle",
                  wine_tour: "directions_bus",
                  food_pairing: "restaurant",
                  harvest_experience: "agriculture",
                  city_tour: "location_city",
                  accommodation: "hotel",
                };
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                      isSaved ? "border-[#561922]/40 ring-1 ring-[#561922]/10" : "border-[#d8c1c2]/15"
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-[#1c1c18] text-sm flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-[#c9a84c]">
                              {typeIcon[tour.type] || "map"}
                            </span>
                            {tour.title}
                          </h4>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            <span className="text-[10px] text-[#534343] bg-[#f6f3ed] px-2 py-0.5 rounded-full">{tour.location}</span>
                            <span className="text-[10px] text-[#534343] bg-[#f6f3ed] px-2 py-0.5 rounded-full">{tour.duration}</span>
                            {tour.priceRange && (
                              <span className="text-[10px] text-[#534343] bg-[#f6f3ed] px-2 py-0.5 rounded-full">{tour.priceRange}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSaveTour(tour)}
                          className={`flex-shrink-0 px-3 py-1.5 text-[10px] rounded-full font-medium transition-colors ${
                            isSaved
                              ? "bg-[#561922] text-white"
                              : "bg-[#f6f3ed] text-[#534343] hover:bg-[#561922]/10 hover:text-[#561922]"
                          }`}
                        >
                          {isSaved ? (
                            <><span className="material-symbols-outlined text-[10px] align-middle mr-0.5">check</span> 保存済み</>
                          ) : "保存"}
                        </button>
                      </div>
                      <p className="text-xs text-[#534343] leading-relaxed mb-2">{tour.description}</p>
                      {tour.highlights && tour.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {tour.highlights.map((h, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 bg-[#c9a84c]/10 text-[#755b00] rounded-full">{h}</span>
                          ))}
                        </div>
                      )}
                      {tour.bestSeason && (
                        <p className="text-[10px] text-[#534343]/60">
                          <span className="material-symbols-outlined text-[10px] align-middle mr-0.5">calendar_month</span>
                          ベストシーズン: {tour.bestSeason}
                        </p>
                      )}
                      {tour.bookingTip && (
                        <p className="text-[10px] text-[#755b00] mt-1">
                          <span className="material-symbols-outlined text-[10px] align-middle mr-0.5">lightbulb</span>
                          {tour.bookingTip}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Nearby attractions */}
              {tourNearby.length > 0 && (
                <div className="bg-[#f6f3ed] rounded-2xl p-4">
                  <h4 className="text-xs font-medium text-[#1c1c18] mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#c9a84c]">account_balance</span>
                    周辺の観光名所
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tourNearby.map((a, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 bg-white text-[#534343] rounded-full border border-[#d8c1c2]/20">{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {savedTours.length > 0 && (
                <p className="text-[10px] text-[#561922] text-center">
                  <span className="material-symbols-outlined text-[10px] align-middle mr-0.5">check_circle</span>
                  {savedTours.length}件のツアーが保存されます
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===== SUBMIT BUTTON ===== */}
      <div className="px-5 pb-28">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full py-4 rounded-full bg-[#561922] text-white font-headline text-sm tracking-wider hover:bg-[#722f37] transition-colors flex items-center justify-center gap-2.5 disabled:bg-[#d8c1c2]/40 disabled:text-[#534343]/40 disabled:cursor-not-allowed shadow-lg"
        >
          <span className="material-symbols-outlined text-lg">auto_stories</span>
          この経験を綴る
        </button>
      </div>
    </div>
  );
}

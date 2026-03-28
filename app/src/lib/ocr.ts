import { WINE_COUNTRIES } from "./countries";

const KNOWN_GRAPES = [
  "Cabernet Sauvignon", "Merlot", "Pinot Noir", "Syrah", "Shiraz",
  "Grenache", "Tempranillo", "Sangiovese", "Nebbiolo", "Malbec",
  "Zinfandel", "Mourvèdre", "Barbera", "Gamay", "Carménère",
  "Petit Verdot", "Cabernet Franc", "Tannat", "Pinotage", "Touriga Nacional",
  "Chardonnay", "Sauvignon Blanc", "Riesling", "Pinot Grigio", "Pinot Gris",
  "Gewürztraminer", "Viognier", "Chenin Blanc", "Sémillon", "Muscat",
  "Moscato", "Albariño", "Grüner Veltliner", "Torrontés", "Verdejo",
  "Vermentino", "Trebbiano", "Garganega", "Cortese", "Fiano",
  "Marsanne", "Roussanne", "Melon de Bourgogne", "Assyrtiko",
  "Koshu", "Müller-Thurgau", "Silvaner", "Nero d'Avola",
  "Primitivo", "Montepulciano", "Aglianico", "Corvina",
  "Bonarda", "Dolcetto", "Carignan", "Cinsault",
  "Muscat Bailey A", "Furmint", "Saperavi", "Rkatsiteli",
  "Glera", "Nerello Mascalese", "Tinta Roriz",
];

const KNOWN_APPELLATIONS = [
  "Bordeaux", "Bourgogne", "Burgundy", "Champagne", "Alsace",
  "Côtes du Rhône", "Rhône", "Loire", "Provence", "Languedoc",
  "Beaujolais", "Saint-Émilion", "Pauillac", "Margaux", "Médoc",
  "Haut-Médoc", "Pessac-Léognan", "Sauternes", "Graves",
  "Pomerol", "Chablis", "Meursault", "Puligny-Montrachet",
  "Gevrey-Chambertin", "Nuits-Saint-Georges", "Vosne-Romanée",
  "Côte de Nuits", "Côte de Beaune", "Côte Chalonnaise",
  "Barolo", "Barbaresco", "Chianti", "Brunello di Montalcino",
  "Valpolicella", "Amarone", "Prosecco", "Soave", "Barossa",
  "Rioja", "Ribera del Duero", "Priorat", "Napa Valley", "Sonoma",
  "Willamette Valley", "Marlborough", "Central Otago", "Mendoza",
  "Stellenbosch", "Tokaj", "Douro", "Mosel", "Rheingau", "Pfalz",
  "Valle de Uco", "Luján de Cuyo", "Maipú", "Cafayate",
  "Colchagua", "Maipo Valley", "Casablanca",
  "McLaren Vale", "Hunter Valley", "Margaret River", "Yarra Valley",
  "Hawke's Bay", "Martinborough", "Waipara",
  "Franschhoek", "Swartland", "Walker Bay",
  "Wachau", "Kamptal", "Burgenland",
  "Kakheti", "Bekaa Valley",
];

// === Classification / quality tier patterns ===

const APPELLATION_SYSTEMS = [
  // France
  { pattern: /appellation\s+(.+?)\s+contr[oô]l[ée]e/i, type: "AOC" },
  { pattern: /\bA\.?O\.?C\.?\b/i, type: "AOC" },
  { pattern: /\bA\.?O\.?P\.?\b/i, type: "AOP" },
  { pattern: /\bI\.?G\.?P\.?\b/i, type: "IGP" },
  { pattern: /\bvin\s+de\s+france\b/i, type: "Vin de France" },
  { pattern: /\bgrand\s+cru\s+class[ée]/i, type: "Grand Cru Classé" },
  { pattern: /\bgrand\s+cru\b/i, type: "Grand Cru" },
  { pattern: /\bpremier\s+cru\b/i, type: "Premier Cru" },
  { pattern: /\b1er\s+cru\b/i, type: "Premier Cru" },
  { pattern: /\bcru\s+bourgeois/i, type: "Cru Bourgeois" },

  // Italy
  { pattern: /\bD\.?O\.?C\.?G\.?\b/i, type: "DOCG" },
  { pattern: /\bD\.?O\.?C\.?\b(?!G)/i, type: "DOC" },
  { pattern: /\bI\.?G\.?T\.?\b/i, type: "IGT" },
  { pattern: /\briserva\b/i, type: "Riserva" },
  { pattern: /\bsuperiore\b/i, type: "Superiore" },
  { pattern: /\bclassico\b/i, type: "Classico" },

  // Spain
  { pattern: /\bD\.?O\.?Ca?\.?\b/i, type: "DOCa" },
  { pattern: /\bD\.?O\.?\b/i, type: "DO" },
  { pattern: /\bgran\s+reserva\b/i, type: "Gran Reserva" },
  { pattern: /\breserva\b/i, type: "Reserva" },
  { pattern: /\bcrianza\b/i, type: "Crianza" },
  { pattern: /\bjoven\b/i, type: "Joven" },

  // Germany / Austria
  { pattern: /\bpr[äa]dikatswein\b/i, type: "Prädikatswein" },
  { pattern: /\bqualit[äa]tswein\b/i, type: "Qualitätswein" },
  { pattern: /\bkabinett\b/i, type: "Kabinett" },
  { pattern: /\bsp[äa]tlese\b/i, type: "Spätlese" },
  { pattern: /\bauslese\b/i, type: "Auslese" },
  { pattern: /\btrockenbeerenauslese\b/i, type: "Trockenbeerenauslese" },
  { pattern: /\bbeerenauslese\b/i, type: "Beerenauslese" },
  { pattern: /\beisw[ei]in\b/i, type: "Eiswein" },
  { pattern: /\bDAC\b/, type: "DAC" },

  // Portugal
  { pattern: /\bD\.?O\.?C\.?\b/i, type: "DOC" },
  { pattern: /\breserva\b/i, type: "Reserva" },
  { pattern: /\bgarrafeira\b/i, type: "Garrafeira" },
];

// === Taste type patterns ===
const TASTE_TYPES: { pattern: RegExp; type: string }[] = [
  // Sparkling
  { pattern: /\bbrut\s+nature\b/i, type: "Brut Nature" },
  { pattern: /\bextra\s+brut\b/i, type: "Extra Brut" },
  { pattern: /\bbrut\b/i, type: "Brut" },
  { pattern: /\bextra\s+dry\b/i, type: "Extra Dry" },
  { pattern: /\bdemi[\s-]sec\b/i, type: "Demi-Sec" },
  // Still
  { pattern: /\b(sec|dry|trocken|secco|seco)\b/i, type: "辛口" },
  { pattern: /\b(doux|sweet|dolce|dulce|süss|s[üu]ß)\b/i, type: "甘口" },
  { pattern: /\b(moelleux|off[\s-]dry|amabile|halbtrocken|abboccato)\b/i, type: "やや甘口" },
  { pattern: /\b(liquoreux)\b/i, type: "極甘口" },
];

// === Aging patterns ===
const AGING_PATTERNS: { pattern: RegExp; type: string }[] = [
  { pattern: /\bgran\s+reserva\b/i, type: "Gran Reserva" },
  { pattern: /\breserva\b/i, type: "Reserva" },
  { pattern: /\briserva\b/i, type: "Riserva" },
  { pattern: /\bgarrafeira\b/i, type: "Garrafeira" },
  { pattern: /\bcrianza\b/i, type: "Crianza" },
  { pattern: /\bvecchio\b/i, type: "Vecchio" },
  { pattern: /\bbarrique\b/i, type: "Barrique" },
  { pattern: /\b[ée]lev[ée]\s+en\s+f[ûu]ts?\s+de\s+ch[êe]ne\b/i, type: "Élevé en fûts de chêne" },
  { pattern: /\baged\s+in\s+oak\b/i, type: "Oak Aged" },
  { pattern: /\boak\s+aged\b/i, type: "Oak Aged" },
  { pattern: /\b(\d+)\s+months?\s+(in\s+)?oak\b/i, type: "Oak Aged" },
  { pattern: /\bvieilles\s+vignes\b/i, type: "Vieilles Vignes" },
  { pattern: /\bold\s+vine[s]?\b/i, type: "Old Vines" },
  { pattern: /\bsur\s+lie\b/i, type: "Sur Lie" },
];

// === Bottling patterns ===
const BOTTLING_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /mis\s+en\s+bouteille\s+au\s+ch[âa]teau/i, label: "Mis en bouteille au château" },
  { pattern: /mis\s+en\s+bouteille\s+au\s+domaine/i, label: "Mis en bouteille au domaine" },
  { pattern: /mis\s+en\s+bouteille\s+[àa]\s+la\s+propri[ée]t[ée]/i, label: "Mis en bouteille à la propriété" },
  { pattern: /mis\s+en\s+bouteille\s+par/i, label: "Mis en bouteille par (négociant)" },
  { pattern: /imbottigliato\s+all['']?origine/i, label: "Imbottigliato all'origine" },
  { pattern: /imbottigliato\s+da/i, label: "Imbottigliato da" },
  { pattern: /embotellado\s+en\s+(origen|la\s+propiedad)/i, label: "Embotellado en origen" },
  { pattern: /estate\s+bottled/i, label: "Estate Bottled" },
  { pattern: /erzeugerabf[üu]llung/i, label: "Erzeugerabfüllung" },
  { pattern: /engarrafado\s+na\s+origem/i, label: "Engarrafado na origem" },
  { pattern: /gutsabf[üu]llung/i, label: "Gutsabfüllung" },
];

// === Certification patterns ===
const CERTIFICATION_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /\b(bio|biologique|biologico|ecol[oó]gico)\b/i, label: "Bio / Organic" },
  { pattern: /\borganic\b/i, label: "Organic" },
  { pattern: /\bbiodynami[cq]\w*\b/i, label: "Biodynamic" },
  { pattern: /\bdemeter\b/i, label: "Demeter (Biodynamic)" },
  { pattern: /\bsans\s+sulfites?\s+ajout[ée]s?\b/i, label: "Sans sulfites ajoutés" },
  { pattern: /\bno\s+added\s+sulfites?\b/i, label: "No Added Sulfites" },
  { pattern: /\bnatural\s+wine\b/i, label: "Natural Wine" },
  { pattern: /\bvin\s+naturel\b/i, label: "Vin Naturel" },
  { pattern: /\bvegan\b/i, label: "Vegan" },
  { pattern: /\bm[ée]daille\s+d['']?or\b/i, label: "Médaille d'Or (金賞)" },
  { pattern: /\bgold\s+medal\b/i, label: "Gold Medal (金賞)" },
  { pattern: /\bsilver\s+medal\b/i, label: "Silver Medal (銀賞)" },
  { pattern: /\bm[ée]daille\s+d['']?argent\b/i, label: "Médaille d'Argent (銀賞)" },
];

// === Main interface ===

export interface OcrWineData {
  // Mandatory
  producer: string;
  country: string;
  region: string;
  vintage: number | null;
  appellation: string;       // AOC, DOCG, etc.
  classification: string;    // Grand Cru, Reserva, etc.
  abv: number | null;
  volume: number | null;
  bottler: string;

  // Optional
  name: string;              // Wine name / Cuvée
  grapeVarieties: string[];
  aging: string;
  tasteType: string;
  certifications: string[];

  rawText: string;
}

export async function ocrWineLabel(imageBase64: string): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY;
  if (!apiKey) throw new Error("Google Vision API key not configured");

  const body = {
    requests: [
      {
        image: { content: imageBase64 },
        features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
      },
    ],
  };

  const res = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Vision API error: ${err}`);
  }

  const data = await res.json();
  const text =
    data.responses?.[0]?.fullTextAnnotation?.text ||
    data.responses?.[0]?.textAnnotations?.[0]?.description ||
    "";
  return text;
}

export function parseOcrText(rawText: string): OcrWineData {
  const text = rawText.trim();
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const textLower = text.toLowerCase();

  const result: OcrWineData = {
    producer: "",
    country: "",
    region: "",
    vintage: null,
    appellation: "",
    classification: "",
    abv: null,
    volume: null,
    bottler: "",
    name: "",
    grapeVarieties: [],
    aging: "",
    tasteType: "",
    certifications: [],
    rawText: text,
  };

  // === 1. MANDATORY FIELDS ===

  // 1a. Producer - line starting with known producer prefixes
  const producerPrefixes =
    /^(château|chateau|domaine|maison|cave|clos|bodega|bodegas|weingut|tenuta|cantina|azienda|fattoria|poderi|marchesi|estate|winery|vignoble|vignerons?|quinta|herdade|kellerei)/i;
  const producerLine = lines.find((line) => producerPrefixes.test(line));
  if (producerLine) {
    result.producer = producerLine;
  }

  // 1b. Country
  for (const c of WINE_COUNTRIES) {
    const patterns = [
      c.name.toLowerCase(),
      c.nameJa,
      ...(c.code === "FR"
        ? ["france", "produit de france", "produce of france"]
        : []),
      ...(c.code === "IT"
        ? ["italia", "italy", "prodotto in italia", "prodotto d'italia"]
        : []),
      ...(c.code === "ES"
        ? ["españa", "spain", "producto de españa"]
        : []),
      ...(c.code === "DE"
        ? ["deutschland", "germany", "produkt von deutschland"]
        : []),
      ...(c.code === "PT" ? ["portugal"] : []),
      ...(c.code === "AU"
        ? ["australia", "product of australia"]
        : []),
      ...(c.code === "NZ" ? ["new zealand"] : []),
      ...(c.code === "US"
        ? ["united states", "california", "oregon", "washington state"]
        : []),
      ...(c.code === "AR" ? ["argentina", "producto de argentina"] : []),
      ...(c.code === "CL" ? ["chile", "producto de chile"] : []),
      ...(c.code === "ZA" ? ["south africa", "product of south africa"] : []),
      ...(c.code === "JP" ? ["japan", "日本"] : []),
      ...(c.code === "GE" ? ["georgia", "საქართველო"] : []),
      ...(c.code === "GR" ? ["greece", "ελλάδα"] : []),
      ...(c.code === "HU" ? ["hungary", "magyarország"] : []),
      ...(c.code === "AT" ? ["austria", "österreich"] : []),
      ...(c.code === "CH" ? ["switzerland", "suisse", "schweiz"] : []),
    ];
    if (patterns.some((p) => textLower.includes(p))) {
      result.country = c.name;
      break;
    }
  }

  // 1c. Region / Appellation (place name)
  for (const appellation of KNOWN_APPELLATIONS) {
    if (textLower.includes(appellation.toLowerCase())) {
      result.region = appellation;

      // Infer country from region if not found
      if (!result.country) {
        const countryForRegion = WINE_COUNTRIES.find((c) =>
          c.regions.some(
            (r) => r.name.toLowerCase() === appellation.toLowerCase()
          )
        );
        if (countryForRegion) result.country = countryForRegion.name;
      }
      break;
    }
  }

  // 1d. Vintage
  const vintageMatch = text.match(/\b(19[5-9]\d|20[0-2]\d)\b/);
  if (vintageMatch) {
    result.vintage = parseInt(vintageMatch[1]);
  }

  // 1e. Appellation system & Classification
  const foundAppellations: string[] = [];
  const foundClassifications: string[] = [];

  for (const sys of APPELLATION_SYSTEMS) {
    const m = text.match(sys.pattern);
    if (m) {
      // Separate appellation systems from quality tiers
      if (
        [
          "AOC", "AOP", "IGP", "Vin de France",
          "DOCG", "DOC", "IGT",
          "DOCa", "DO",
          "Prädikatswein", "Qualitätswein", "DAC",
        ].includes(sys.type)
      ) {
        if (!foundAppellations.includes(sys.type)) {
          foundAppellations.push(sys.type);
        }
      } else {
        if (!foundClassifications.includes(sys.type)) {
          foundClassifications.push(sys.type);
        }
      }
    }
  }

  result.appellation = foundAppellations.join(", ");
  result.classification = foundClassifications.join(", ");

  // 1f. ABV
  const abvMatch = text.match(/(\d{1,2}[.,]\d)\s*%\s*(vol|alc)?/i);
  if (abvMatch) {
    result.abv = parseFloat(abvMatch[1].replace(",", "."));
  }

  // 1g. Volume
  const volumeMatch = text.match(/(\d{3,4})\s*ml\b/i);
  if (volumeMatch) {
    result.volume = parseInt(volumeMatch[1]);
  } else {
    // Try common formats
    const litreMatch = text.match(/(0[.,][37]5|1[.,]5)\s*[lL]\b/);
    if (litreMatch) {
      const litres = parseFloat(litreMatch[1].replace(",", "."));
      result.volume = Math.round(litres * 1000);
    }
  }

  // 1h. Bottler
  for (const bp of BOTTLING_PATTERNS) {
    if (bp.pattern.test(text)) {
      result.bottler = bp.label;
      break;
    }
  }

  // === 2. OPTIONAL FIELDS ===

  // 2a. Grape varieties
  for (const grape of KNOWN_GRAPES) {
    if (textLower.includes(grape.toLowerCase())) {
      result.grapeVarieties.push(grape);
    }
  }

  // 2b. Wine name / Cuvée
  // Try to find the most prominent line that isn't producer/appellation/year/abv
  const nameCandidates = lines.filter((line) => {
    if (line.length < 3) return false;
    if (/^\d{4}$/.test(line)) return false;
    if (/^\d{1,2}[.,]\d\s*%/.test(line)) return false;
    if (/^\d{3,4}\s*ml$/i.test(line)) return false;
    if (
      /^(appellation|produit|product|mis en|imbottigliato|contains|sulfites|contient|allergen)/i.test(
        line
      )
    )
      return false;
    if (line === result.producer) return false;
    return true;
  });

  if (nameCandidates.length > 0) {
    // If producer was found, the name is likely the next prominent line
    if (result.producer) {
      const afterProducer = nameCandidates.find(
        (l) => l !== result.producer
      );
      result.name = afterProducer || nameCandidates[0];
    } else {
      result.name = nameCandidates[0];
    }
  }

  // 2c. Aging
  for (const ap of AGING_PATTERNS) {
    const m = text.match(ap.pattern);
    if (m) {
      result.aging = ap.type;
      break;
    }
  }

  // 2d. Taste type
  for (const tt of TASTE_TYPES) {
    if (tt.pattern.test(text)) {
      result.tasteType = tt.type;
      break;
    }
  }

  // 2e. Certifications
  for (const cp of CERTIFICATION_PATTERNS) {
    if (cp.pattern.test(text)) {
      if (!result.certifications.includes(cp.label)) {
        result.certifications.push(cp.label);
      }
    }
  }

  return result;
}

export async function searchOpenFoodFacts(
  query: string
): Promise<Partial<OcrWineData> | null> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=3&tagtype_0=categories&tag_contains_0=contains&tag_0=wines`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const product = data.products?.[0];
    if (!product) return null;

    const result: Partial<OcrWineData> = {
      name: product.product_name || "",
      producer: product.brands || "",
      country: "",
      abv: null,
      vintage: null,
    };

    // Country
    if (product.countries_tags?.length > 0) {
      const countryTag = product.countries_tags[0].replace("en:", "");
      const matched = WINE_COUNTRIES.find(
        (c) => c.name.toLowerCase() === countryTag.toLowerCase()
      );
      if (matched) result.country = matched.name;
    }

    // ABV
    if (product.nutriments?.alcohol_100g) {
      result.abv = product.nutriments.alcohol_100g;
    }

    // Volume
    if (product.quantity) {
      const volMatch = (product.quantity as string).match(/(\d{3,4})\s*ml/i);
      if (volMatch) result.volume = parseInt(volMatch[1]);
    }

    // Vintage from name
    const vintageMatch = (product.product_name || "").match(
      /\b(19[5-9]\d|20[0-2]\d)\b/
    );
    if (vintageMatch) result.vintage = parseInt(vintageMatch[1]);

    // Labels / certifications
    if (product.labels_tags?.length > 0) {
      result.certifications = product.labels_tags
        .map((t: string) => t.replace("en:", "").replace(/-/g, " "))
        .slice(0, 5);
    }

    return result;
  } catch {
    return null;
  }
}

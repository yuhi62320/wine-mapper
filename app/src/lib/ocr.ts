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
];

const KNOWN_APPELLATIONS = [
  "Bordeaux", "Bourgogne", "Burgundy", "Champagne", "Alsace",
  "Côtes du Rhône", "Rhône", "Loire", "Provence", "Languedoc",
  "Beaujolais", "Saint-Émilion", "Pauillac", "Margaux", "Médoc",
  "Haut-Médoc", "Pessac-Léognan", "Sauternes", "Graves",
  "Pomerol", "Chablis", "Meursault", "Puligny-Montrachet",
  "Gevrey-Chambertin", "Nuits-Saint-Georges", "Vosne-Romanée",
  "Barolo", "Barbaresco", "Chianti", "Brunello di Montalcino",
  "Valpolicella", "Amarone", "Prosecco", "Soave", "Barossa",
  "Rioja", "Ribera del Duero", "Priorat", "Napa Valley", "Sonoma",
  "Willamette Valley", "Marlborough", "Central Otago", "Mendoza",
  "Stellenbosch", "Tokaj", "Douro", "Mosel", "Rheingau", "Pfalz",
];

export interface OcrWineData {
  name: string;
  vintage: number | null;
  grapeVarieties: string[];
  producer: string;
  country: string;
  region: string;
  abv: number | null;
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

  const result: OcrWineData = {
    name: "",
    vintage: null,
    grapeVarieties: [],
    producer: "",
    country: "",
    region: "",
    abv: null,
    rawText: text,
  };

  // 1. Extract vintage (4-digit year between 1900-2030)
  const vintageMatch = text.match(/\b(19[5-9]\d|20[0-2]\d)\b/);
  if (vintageMatch) {
    result.vintage = parseInt(vintageMatch[1]);
  }

  // 2. Extract ABV
  const abvMatch = text.match(/(\d{1,2}[.,]\d)\s*%\s*(vol|alc)?/i);
  if (abvMatch) {
    result.abv = parseFloat(abvMatch[1].replace(",", "."));
  }

  // 3. Find grape varieties (case-insensitive)
  const textLower = text.toLowerCase();
  for (const grape of KNOWN_GRAPES) {
    if (textLower.includes(grape.toLowerCase())) {
      result.grapeVarieties.push(grape);
    }
  }

  // 4. Find country
  for (const c of WINE_COUNTRIES) {
    const patterns = [
      c.name.toLowerCase(),
      c.nameJa,
      // Common label terms
      ...(c.code === "FR" ? ["france", "produit de france", "mis en bouteille"] : []),
      ...(c.code === "IT" ? ["italia", "italy", "prodotto in italia", "imbottigliato"] : []),
      ...(c.code === "ES" ? ["españa", "spain", "embotellado"] : []),
      ...(c.code === "DE" ? ["deutschland", "germany", "erzeugerabfüllung"] : []),
      ...(c.code === "PT" ? ["portugal", "engarrafado"] : []),
      ...(c.code === "AU" ? ["australia", "product of australia"] : []),
      ...(c.code === "NZ" ? ["new zealand"] : []),
      ...(c.code === "US" ? ["united states", "california", "oregon", "washington"] : []),
      ...(c.code === "AR" ? ["argentina"] : []),
      ...(c.code === "CL" ? ["chile"] : []),
      ...(c.code === "ZA" ? ["south africa"] : []),
      ...(c.code === "JP" ? ["japan", "日本"] : []),
    ];
    if (patterns.some((p) => textLower.includes(p))) {
      result.country = c.name;
      break;
    }
  }

  // 5. Find region/appellation
  for (const appellation of KNOWN_APPELLATIONS) {
    if (textLower.includes(appellation.toLowerCase())) {
      result.region = appellation;

      // Infer country from region if not found
      if (!result.country) {
        const countryForRegion = WINE_COUNTRIES.find((c) =>
          c.regions.some((r) => r.toLowerCase() === appellation.toLowerCase())
        );
        if (countryForRegion) result.country = countryForRegion.name;
      }
      break;
    }
  }

  // 6. Guess wine name - typically the most prominent text (first lines)
  // Skip lines that are just vintage, abv, or very short
  const nameCandidate = lines.find((line) => {
    if (line.length < 3) return false;
    if (/^\d{4}$/.test(line)) return false; // just a year
    if (/^\d{1,2}[.,]\d\s*%/.test(line)) return false; // just ABV
    if (/^(appellation|produit|product|mis en|imbottigliato|contains|sulfites)/i.test(line)) return false;
    return true;
  });
  if (nameCandidate) {
    result.name = nameCandidate;
  }

  // 7. Producer - often line with "Château", "Domaine", "Bodega", "Weingut", etc.
  const producerLine = lines.find((line) =>
    /^(château|chateau|domaine|maison|cave|bodega|weingut|tenuta|cantina|azienda|estate|winery|vignoble)/i.test(line)
  );
  if (producerLine) {
    result.producer = producerLine;
    // If producer is found and name is the same, try next line for name
    if (result.name === producerLine && lines.length > 1) {
      const altName = lines.find(
        (l) => l !== producerLine && l.length > 3 && !/^\d{4}$/.test(l)
      );
      if (altName) result.name = `${producerLine} ${altName}`;
    }
  }

  return result;
}

export async function searchOpenFoodFacts(
  query: string
): Promise<OcrWineData | null> {
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

    // Extract data from Open Food Facts product
    const result: OcrWineData = {
      name: product.product_name || "",
      vintage: null,
      grapeVarieties: [],
      producer: product.brands || "",
      country: "",
      region: "",
      abv: null,
      rawText: "",
    };

    // Country
    if (product.countries_tags?.length > 0) {
      const countryTag = product.countries_tags[0].replace("en:", "");
      const matched = WINE_COUNTRIES.find(
        (c) => c.name.toLowerCase() === countryTag.toLowerCase()
      );
      if (matched) result.country = matched.name;
    }

    // ABV from nutrition
    if (product.nutriments?.alcohol_100g) {
      result.abv = product.nutriments.alcohol_100g;
    }

    // Vintage from product name
    const vintageMatch = (product.product_name || "").match(
      /\b(19[5-9]\d|20[0-2]\d)\b/
    );
    if (vintageMatch) result.vintage = parseInt(vintageMatch[1]);

    return result;
  } catch {
    return null;
  }
}

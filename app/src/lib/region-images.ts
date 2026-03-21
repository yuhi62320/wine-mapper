// Comprehensive mapping of wine regions to verified Unsplash photo IDs
// Used across region guide, stylized map, and other components

export const REGION_IMAGES: Record<string, string> = {
  // France
  "Bordeaux": "https://images.unsplash.com/photo-1566903451935-7f4509b81580?w=600&h=300&fit=crop",
  "Burgundy": "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=600&h=300&fit=crop",
  "Champagne": "https://images.unsplash.com/photo-1568213214202-ecad2c06aeb0?w=600&h=300&fit=crop",
  "Loire Valley": "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600&h=300&fit=crop",
  "Rhône Valley": "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=300&fit=crop",
  "Rhône": "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=300&fit=crop",
  "Northern Rhône": "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=300&fit=crop",
  "Southern Rhône": "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=300&fit=crop",
  "Alsace": "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=600&h=300&fit=crop",
  "Provence": "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=300&fit=crop",
  "Languedoc-Roussillon": "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=600&h=300&fit=crop",
  "Languedoc": "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=600&h=300&fit=crop",
  "Roussillon": "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=600&h=300&fit=crop",
  "Jura": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop",
  "Savoie": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop",
  "Sud-Ouest": "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=600&h=300&fit=crop",
  "Beaujolais": "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=600&h=300&fit=crop",
  "Corsica": "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=600&h=300&fit=crop",

  // Italy
  "Tuscany": "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=600&h=300&fit=crop",
  "Piedmont": "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=600&h=300&fit=crop",
  "Veneto": "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=600&h=300&fit=crop",
  "Sicily": "https://images.unsplash.com/photo-1523531294919-4bcd7c65ef8a?w=600&h=300&fit=crop",
  "Lombardy": "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=600&h=300&fit=crop",
  "Trentino-Alto Adige": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop",
  "Friuli-Venezia Giulia": "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=600&h=300&fit=crop",
  "Campania": "https://images.unsplash.com/photo-1523531294919-4bcd7c65ef8a?w=600&h=300&fit=crop",
  "Sardinia": "https://images.unsplash.com/photo-1523531294919-4bcd7c65ef8a?w=600&h=300&fit=crop",
  "Abruzzo": "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=600&h=300&fit=crop",
  "Puglia": "https://images.unsplash.com/photo-1523531294919-4bcd7c65ef8a?w=600&h=300&fit=crop",

  // Spain
  "Rioja": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Ribera del Duero": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Priorat": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Rias Baixas": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Penedès": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Jerez": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",

  // Portugal
  "Douro": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Alentejo": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Vinho Verde": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",

  // Germany
  "Mosel": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&h=300&fit=crop",
  "Rheingau": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&h=300&fit=crop",
  "Pfalz": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&h=300&fit=crop",
  "Baden": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&h=300&fit=crop",

  // USA
  "Napa Valley": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=300&fit=crop",
  "Sonoma": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=300&fit=crop",
  "Oregon": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop",
  "Willamette Valley": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop",
  "Washington": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=300&fit=crop",
  "Central Coast": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=300&fit=crop",

  // Australia
  "Barossa Valley": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",
  "McLaren Vale": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",
  "Hunter Valley": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",
  "Margaret River": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",
  "Yarra Valley": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",

  // New Zealand
  "Marlborough": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",
  "Central Otago": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",
  "Hawke's Bay": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=300&fit=crop",

  // South America
  "Mendoza": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Maipo Valley": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Colchagua": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",
  "Casablanca Valley": "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=300&fit=crop",

  // South Africa
  "Stellenbosch": "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&h=300&fit=crop",
  "Franschhoek": "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&h=300&fit=crop",
  "Swartland": "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&h=300&fit=crop",

  // Other
  "Tokaj": "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=600&h=300&fit=crop",
  "Wachau": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&h=300&fit=crop",

  // Default fallback
  "_default": "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=300&fit=crop",
};

// Section-level images for region guide cards
// Each section type has multiple options for visual variety
export const SECTION_IMAGES: Record<string, string[]> = {
  terroir: [
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=200&fit=crop", // vineyard rows
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=200&fit=crop", // soil close-up
    "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=400&h=200&fit=crop", // vineyard landscape
  ],
  climate: [
    "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=400&h=200&fit=crop", // vineyard sunrise
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=200&fit=crop", // mountain landscape
    "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&h=200&fit=crop", // chateau landscape
  ],
  history: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop", // old cellar
    "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=400&h=200&fit=crop", // wine barrels
    "https://images.unsplash.com/photo-1566903451935-7f4509b81580?w=400&h=200&fit=crop", // chateau
  ],
  keyStyles: [
    "https://images.unsplash.com/photo-1568213214202-ecad2c06aeb0?w=400&h=200&fit=crop", // champagne bottles
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=200&fit=crop", // wine glass
    "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=400&h=200&fit=crop", // wine pouring
  ],
  topProducers: [
    "https://images.unsplash.com/photo-1566903451935-7f4509b81580?w=400&h=200&fit=crop", // chateau
    "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&h=200&fit=crop", // winery
    "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=400&h=200&fit=crop", // estate
  ],
  foodPairing: [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=200&fit=crop", // food and wine
    "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=400&h=200&fit=crop", // dining
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=200&fit=crop", // wine with food
  ],
  visitTips: [
    "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&h=200&fit=crop", // chateau visit
    "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=400&h=200&fit=crop", // vineyard tour
    "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=400&h=200&fit=crop", // wine tourism
  ],
  regulations: [
    "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=400&h=200&fit=crop", // wine barrels aging
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop", // cellar
    "https://images.unsplash.com/photo-1568213214202-ecad2c06aeb0?w=400&h=200&fit=crop", // bottles
  ],
  sommNotes: [
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=200&fit=crop", // wine tasting
    "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=400&h=200&fit=crop", // wine glass detail
    "https://images.unsplash.com/photo-1568213214202-ecad2c06aeb0?w=400&h=200&fit=crop", // bottles
  ],
  funFact: [
    "https://images.unsplash.com/photo-1523531294919-4bcd7c65ef8a?w=400&h=200&fit=crop", // scenic vineyard
    "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&h=200&fit=crop", // vineyard detail
    "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400&h=200&fit=crop", // river vineyard
  ],
  vintageGuide: [
    "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=400&h=200&fit=crop", // barrel aging
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop", // cellar
    "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&h=200&fit=crop", // winery
  ],
};

// Deterministic hash to select image index based on region name
export function getRegionImage(region: string): string {
  return REGION_IMAGES[region] || REGION_IMAGES._default;
}

// Get a section image deterministically based on region name
export function getSectionImage(section: string, regionName: string): string {
  const images = SECTION_IMAGES[section];
  if (!images || images.length === 0) {
    return REGION_IMAGES._default;
  }
  // Simple hash from region name for deterministic selection
  let hash = 0;
  for (let i = 0; i < regionName.length; i++) {
    hash = ((hash << 5) - hash + regionName.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % images.length;
  return images[index];
}

// Helper to extract text from guide field (handles both old string format and new object format)
export function getGuideText(field: string | { text: string; imageKeyword?: string } | undefined): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field.text || "";
}

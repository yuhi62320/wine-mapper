export interface WineCountry {
  code: string;
  name: string;
  nameJa: string;
  lat: number;
  lng: number;
  regions: string[];
}

export const WINE_COUNTRIES: WineCountry[] = [
  { code: "FR", name: "France", nameJa: "フランス", lat: 46.6, lng: 2.3, regions: ["Bordeaux", "Burgundy", "Champagne", "Rhône", "Loire", "Alsace", "Provence", "Languedoc-Roussillon", "Jura", "Savoie"] },
  { code: "IT", name: "Italy", nameJa: "イタリア", lat: 42.5, lng: 12.5, regions: ["Tuscany", "Piedmont", "Veneto", "Sicily", "Puglia", "Lombardy", "Trentino-Alto Adige", "Friuli-Venezia Giulia", "Campania", "Sardinia"] },
  { code: "ES", name: "Spain", nameJa: "スペイン", lat: 40.0, lng: -3.7, regions: ["Rioja", "Ribera del Duero", "Priorat", "Penedès", "Rías Baixas", "Jerez", "La Mancha", "Navarra", "Galicia", "Catalonia"] },
  { code: "PT", name: "Portugal", nameJa: "ポルトガル", lat: 39.4, lng: -8.2, regions: ["Douro", "Alentejo", "Vinho Verde", "Dão", "Bairrada", "Madeira", "Setúbal"] },
  { code: "DE", name: "Germany", nameJa: "ドイツ", lat: 51.2, lng: 10.4, regions: ["Mosel", "Rheingau", "Pfalz", "Baden", "Franken", "Nahe", "Rheinhessen"] },
  { code: "AT", name: "Austria", nameJa: "オーストリア", lat: 47.5, lng: 14.6, regions: ["Wachau", "Kamptal", "Burgenland", "Steiermark", "Wien"] },
  { code: "US", name: "United States", nameJa: "アメリカ", lat: 37.1, lng: -95.7, regions: ["Napa Valley", "Sonoma", "Willamette Valley", "Paso Robles", "Finger Lakes", "Walla Walla", "Santa Barbara"] },
  { code: "AR", name: "Argentina", nameJa: "アルゼンチン", lat: -38.4, lng: -63.6, regions: ["Mendoza", "Salta", "Patagonia", "San Juan"] },
  { code: "CL", name: "Chile", nameJa: "チリ", lat: -35.7, lng: -71.5, regions: ["Maipo Valley", "Colchagua", "Casablanca", "Maule", "Bio-Bio"] },
  { code: "AU", name: "Australia", nameJa: "オーストラリア", lat: -25.3, lng: 133.8, regions: ["Barossa Valley", "McLaren Vale", "Hunter Valley", "Margaret River", "Yarra Valley", "Coonawarra", "Eden Valley"] },
  { code: "NZ", name: "New Zealand", nameJa: "ニュージーランド", lat: -40.9, lng: 174.9, regions: ["Marlborough", "Central Otago", "Hawke's Bay", "Martinborough", "Waipara"] },
  { code: "ZA", name: "South Africa", nameJa: "南アフリカ", lat: -30.6, lng: 22.9, regions: ["Stellenbosch", "Franschhoek", "Swartland", "Paarl", "Constantia", "Walker Bay"] },
  { code: "JP", name: "Japan", nameJa: "日本", lat: 36.2, lng: 138.3, regions: ["Yamanashi", "Nagano", "Hokkaido", "Yamagata", "Niigata"] },
  { code: "GR", name: "Greece", nameJa: "ギリシャ", lat: 39.1, lng: 21.8, regions: ["Santorini", "Nemea", "Naoussa", "Crete", "Macedonia"] },
  { code: "HU", name: "Hungary", nameJa: "ハンガリー", lat: 47.2, lng: 19.5, regions: ["Tokaj", "Eger", "Villány", "Somló"] },
  { code: "GE", name: "Georgia", nameJa: "ジョージア", lat: 42.3, lng: 43.4, regions: ["Kakheti", "Kartli", "Imereti"] },
  { code: "IL", name: "Israel", nameJa: "イスラエル", lat: 31.0, lng: 34.9, regions: ["Galilee", "Golan Heights", "Judean Hills"] },
  { code: "LB", name: "Lebanon", nameJa: "レバノン", lat: 33.9, lng: 35.9, regions: ["Bekaa Valley", "Batroun"] },
  { code: "CN", name: "China", nameJa: "中国", lat: 35.9, lng: 104.2, regions: ["Ningxia", "Shandong", "Yunnan"] },
  { code: "BR", name: "Brazil", nameJa: "ブラジル", lat: -14.2, lng: -51.9, regions: ["Serra Gaúcha", "Vale do São Francisco"] },
  { code: "UY", name: "Uruguay", nameJa: "ウルグアイ", lat: -32.5, lng: -55.8, regions: ["Canelones", "Maldonado", "Montevideo"] },
  { code: "CA", name: "Canada", nameJa: "カナダ", lat: 56.1, lng: -106.3, regions: ["Niagara Peninsula", "Okanagan Valley", "Prince Edward County"] },
  { code: "CH", name: "Switzerland", nameJa: "スイス", lat: 46.8, lng: 8.2, regions: ["Valais", "Vaud", "Geneva", "Ticino"] },
  { code: "RO", name: "Romania", nameJa: "ルーマニア", lat: 45.9, lng: 24.9, regions: ["Dealu Mare", "Murfatlar", "Transylvania"] },
  { code: "HR", name: "Croatia", nameJa: "クロアチア", lat: 45.1, lng: 15.2, regions: ["Istria", "Slavonia", "Dalmatia"] },
  { code: "SI", name: "Slovenia", nameJa: "スロベニア", lat: 46.2, lng: 14.8, regions: ["Goriška Brda", "Vipava Valley", "Štajerska"] },
  { code: "GB", name: "United Kingdom", nameJa: "イギリス", lat: 55.4, lng: -3.4, regions: ["Sussex", "Hampshire", "Kent", "Surrey"] },
  { code: "MX", name: "Mexico", nameJa: "メキシコ", lat: 23.6, lng: -102.6, regions: ["Valle de Guadalupe", "Querétaro"] },
];

export function getCountryByName(name: string): WineCountry | undefined {
  return WINE_COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === name.toLowerCase() ||
      c.nameJa === name ||
      c.code.toLowerCase() === name.toLowerCase()
  );
}

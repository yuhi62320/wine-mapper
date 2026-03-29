import { WineRegion, SubRegion } from "./types";

export interface WineCountry {
  code: string;
  name: string;
  nameJa: string;
  lat: number;
  lng: number;
  regions: WineRegion[];
}

export const WINE_COUNTRIES: WineCountry[] = [
  {
    code: "FR", name: "France", nameJa: "フランス", lat: 46.6, lng: 2.3,
    regions: [
      { name: "Bordeaux", nameJa: "ボルドー", lat: 44.84, lng: -0.58, subRegions: [
        { name: "Médoc", nameJa: "メドック", lat: 45.2, lng: -0.9 },
        { name: "Saint-Émilion", nameJa: "サンテミリオン", lat: 44.89, lng: -0.15 },
        { name: "Pauillac", nameJa: "ポイヤック", lat: 45.2, lng: -0.75 },
        { name: "Margaux", nameJa: "マルゴー", lat: 45.04, lng: -0.67 },
        { name: "Pessac-Léognan", nameJa: "ペサック・レオニャン", lat: 44.73, lng: -0.68 },
        { name: "Sauternes", nameJa: "ソーテルヌ", lat: 44.53, lng: -0.35 },
        { name: "Pomerol", nameJa: "ポムロール", lat: 44.93, lng: -0.2 },
        { name: "Graves", nameJa: "グラーヴ", lat: 44.65, lng: -0.5 },
      ]},
      { name: "Burgundy", nameJa: "ブルゴーニュ", lat: 47.05, lng: 4.38, subRegions: [
        { name: "Chablis", nameJa: "シャブリ", lat: 47.81, lng: 3.8 },
        { name: "Côte de Nuits", nameJa: "コート・ド・ニュイ", lat: 47.15, lng: 4.97 },
        { name: "Côte de Beaune", nameJa: "コート・ド・ボーヌ", lat: 47.0, lng: 4.83 },
        { name: "Côte Chalonnaise", nameJa: "コート・シャロネーズ", lat: 46.78, lng: 4.73 },
        { name: "Mâconnais", nameJa: "マコネ", lat: 46.43, lng: 4.83 },
        { name: "Beaujolais", nameJa: "ボジョレー", lat: 46.15, lng: 4.6 },
      ]},
      { name: "Champagne", nameJa: "シャンパーニュ", lat: 49.05, lng: 3.95, subRegions: [
        { name: "Montagne de Reims", nameJa: "モンターニュ・ド・ランス", lat: 49.15, lng: 3.95 },
        { name: "Vallée de la Marne", nameJa: "ヴァレ・ド・ラ・マルヌ", lat: 49.05, lng: 3.65 },
        { name: "Côte des Blancs", nameJa: "コート・デ・ブラン", lat: 48.95, lng: 3.95 },
      ]},
      { name: "Rhône", nameJa: "ローヌ", lat: 44.5, lng: 4.8, subRegions: [
        { name: "Northern Rhône", nameJa: "北ローヌ", lat: 45.2, lng: 4.8 },
        { name: "Southern Rhône", nameJa: "南ローヌ", lat: 44.1, lng: 4.8 },
        { name: "Châteauneuf-du-Pape", nameJa: "シャトーヌフ・デュ・パプ", lat: 44.06, lng: 4.83 },
      ]},
      { name: "Loire", nameJa: "ロワール", lat: 47.4, lng: 0.7, subRegions: [
        { name: "Sancerre", nameJa: "サンセール", lat: 47.33, lng: 2.83 },
        { name: "Vouvray", nameJa: "ヴーヴレ", lat: 47.42, lng: 0.8 },
        { name: "Muscadet", nameJa: "ミュスカデ", lat: 47.1, lng: -1.6 },
      ]},
      { name: "Alsace", nameJa: "アルザス", lat: 48.3, lng: 7.4, subRegions: [] },
      { name: "Provence", nameJa: "プロヴァンス", lat: 43.5, lng: 6.0, subRegions: [] },
      { name: "Languedoc-Roussillon", nameJa: "ラングドック・ルシヨン", lat: 43.3, lng: 3.0, subRegions: [] },
      { name: "Jura", nameJa: "ジュラ", lat: 46.7, lng: 5.9, subRegions: [] },
      { name: "Savoie", nameJa: "サヴォワ", lat: 45.6, lng: 6.1, subRegions: [] },
    ],
  },
  {
    code: "IT", name: "Italy", nameJa: "イタリア", lat: 42.5, lng: 12.5,
    regions: [
      { name: "Tuscany", nameJa: "トスカーナ", lat: 43.35, lng: 11.35, subRegions: [
        { name: "Chianti Classico", nameJa: "キアンティ・クラシコ", lat: 43.45, lng: 11.25 },
        { name: "Brunello di Montalcino", nameJa: "ブルネッロ・ディ・モンタルチーノ", lat: 43.06, lng: 11.49 },
        { name: "Bolgheri", nameJa: "ボルゲリ", lat: 43.23, lng: 10.62 },
        { name: "Vino Nobile di Montepulciano", nameJa: "ヴィーノ・ノビレ・ディ・モンテプルチアーノ", lat: 43.1, lng: 11.78 },
      ]},
      { name: "Piedmont", nameJa: "ピエモンテ", lat: 44.7, lng: 8.0, subRegions: [
        { name: "Barolo", nameJa: "バローロ", lat: 44.6, lng: 7.94 },
        { name: "Barbaresco", nameJa: "バルバレスコ", lat: 44.72, lng: 8.08 },
        { name: "Asti", nameJa: "アスティ", lat: 44.9, lng: 8.2 },
        { name: "Langhe", nameJa: "ランゲ", lat: 44.6, lng: 8.0 },
      ]},
      { name: "Veneto", nameJa: "ヴェネト", lat: 45.4, lng: 11.9, subRegions: [
        { name: "Valpolicella", nameJa: "ヴァルポリチェッラ", lat: 45.52, lng: 10.88 },
        { name: "Soave", nameJa: "ソアーヴェ", lat: 45.42, lng: 11.25 },
        { name: "Prosecco", nameJa: "プロセッコ", lat: 45.9, lng: 12.0 },
      ]},
      { name: "Sicily", nameJa: "シチリア", lat: 37.6, lng: 14.0, subRegions: [
        { name: "Etna", nameJa: "エトナ", lat: 37.75, lng: 15.0 },
      ]},
      { name: "Puglia", nameJa: "プーリア", lat: 41.1, lng: 16.9, subRegions: [] },
      { name: "Lombardy", nameJa: "ロンバルディア", lat: 45.5, lng: 9.9, subRegions: [
        { name: "Franciacorta", nameJa: "フランチャコルタ", lat: 45.6, lng: 10.0 },
      ]},
      { name: "Trentino-Alto Adige", nameJa: "トレンティーノ＝アルト・アディジェ", lat: 46.4, lng: 11.3, subRegions: [] },
      { name: "Friuli-Venezia Giulia", nameJa: "フリウリ＝ヴェネツィア・ジュリア", lat: 46.1, lng: 13.2, subRegions: [] },
      { name: "Campania", nameJa: "カンパニア", lat: 40.8, lng: 14.3, subRegions: [] },
      { name: "Sardinia", nameJa: "サルデーニャ", lat: 40.1, lng: 9.0, subRegions: [] },
    ],
  },
  {
    code: "ES", name: "Spain", nameJa: "スペイン", lat: 40.0, lng: -3.7,
    regions: [
      { name: "Rioja", nameJa: "リオハ", lat: 42.3, lng: -2.5, subRegions: [
        { name: "Rioja Alta", nameJa: "リオハ・アルタ", lat: 42.45, lng: -2.7 },
        { name: "Rioja Alavesa", nameJa: "リオハ・アラベサ", lat: 42.55, lng: -2.6 },
        { name: "Rioja Oriental", nameJa: "リオハ・オリエンタル", lat: 42.15, lng: -2.0 },
      ]},
      { name: "Ribera del Duero", nameJa: "リベラ・デル・ドゥエロ", lat: 41.7, lng: -3.7, subRegions: [] },
      { name: "Priorat", nameJa: "プリオラート", lat: 41.2, lng: 0.8, subRegions: [] },
      { name: "Penedès", nameJa: "ペネデス", lat: 41.35, lng: 1.7, subRegions: [] },
      { name: "Rías Baixas", nameJa: "リアス・バイシャス", lat: 42.3, lng: -8.7, subRegions: [] },
      { name: "Jerez", nameJa: "ヘレス", lat: 36.7, lng: -6.1, subRegions: [] },
      { name: "La Mancha", nameJa: "ラ・マンチャ", lat: 39.3, lng: -3.0, subRegions: [] },
      { name: "Navarra", nameJa: "ナバーラ", lat: 42.7, lng: -1.7, subRegions: [] },
      { name: "Galicia", nameJa: "ガリシア", lat: 42.6, lng: -7.9, subRegions: [] },
      { name: "Catalonia", nameJa: "カタルーニャ", lat: 41.6, lng: 1.5, subRegions: [] },
    ],
  },
  {
    code: "PT", name: "Portugal", nameJa: "ポルトガル", lat: 39.4, lng: -8.2,
    regions: [
      { name: "Douro", nameJa: "ドウロ", lat: 41.2, lng: -7.8, subRegions: [
        { name: "Cima Corgo", nameJa: "シマ・コルゴ", lat: 41.15, lng: -7.55 },
        { name: "Baixo Corgo", nameJa: "バイショ・コルゴ", lat: 41.2, lng: -7.9 },
      ]},
      { name: "Alentejo", nameJa: "アレンテージョ", lat: 38.6, lng: -7.9, subRegions: [] },
      { name: "Vinho Verde", nameJa: "ヴィーニョ・ヴェルデ", lat: 41.7, lng: -8.3, subRegions: [] },
      { name: "Dão", nameJa: "ダン", lat: 40.5, lng: -7.9, subRegions: [] },
      { name: "Bairrada", nameJa: "バイラーダ", lat: 40.4, lng: -8.5, subRegions: [] },
      { name: "Madeira", nameJa: "マデイラ", lat: 32.7, lng: -17.0, subRegions: [] },
      { name: "Setúbal", nameJa: "セトゥーバル", lat: 38.5, lng: -8.9, subRegions: [] },
    ],
  },
  {
    code: "DE", name: "Germany", nameJa: "ドイツ", lat: 51.2, lng: 10.4,
    regions: [
      { name: "Mosel", nameJa: "モーゼル", lat: 49.9, lng: 6.9, subRegions: [] },
      { name: "Rheingau", nameJa: "ラインガウ", lat: 50.0, lng: 8.0, subRegions: [] },
      { name: "Pfalz", nameJa: "ファルツ", lat: 49.3, lng: 8.1, subRegions: [] },
      { name: "Baden", nameJa: "バーデン", lat: 48.0, lng: 7.8, subRegions: [] },
      { name: "Franken", nameJa: "フランケン", lat: 49.8, lng: 10.0, subRegions: [] },
      { name: "Nahe", nameJa: "ナーエ", lat: 49.8, lng: 7.7, subRegions: [] },
      { name: "Rheinhessen", nameJa: "ラインヘッセン", lat: 49.8, lng: 8.2, subRegions: [] },
    ],
  },
  {
    code: "AT", name: "Austria", nameJa: "オーストリア", lat: 47.5, lng: 14.6,
    regions: [
      { name: "Wachau", nameJa: "ヴァッハウ", lat: 48.37, lng: 15.42, subRegions: [] },
      { name: "Kamptal", nameJa: "カンプタール", lat: 48.5, lng: 15.7, subRegions: [] },
      { name: "Burgenland", nameJa: "ブルゲンラント", lat: 47.5, lng: 16.4, subRegions: [] },
      { name: "Steiermark", nameJa: "シュタイアーマルク", lat: 46.9, lng: 15.5, subRegions: [] },
      { name: "Wien", nameJa: "ウィーン", lat: 48.2, lng: 16.4, subRegions: [] },
    ],
  },
  {
    code: "US", name: "United States", nameJa: "アメリカ", lat: 37.1, lng: -95.7,
    regions: [
      { name: "Napa Valley", nameJa: "ナパ・ヴァレー", lat: 38.5, lng: -122.3, subRegions: [
        { name: "Oakville", nameJa: "オークヴィル", lat: 38.43, lng: -122.41 },
        { name: "Rutherford", nameJa: "ラザフォード", lat: 38.46, lng: -122.42 },
        { name: "Stags Leap District", nameJa: "スタッグス・リープ・ディストリクト", lat: 38.4, lng: -122.34 },
        { name: "Howell Mountain", nameJa: "ハウエル・マウンテン", lat: 38.55, lng: -122.4 },
      ]},
      { name: "Sonoma", nameJa: "ソノマ", lat: 38.3, lng: -122.5, subRegions: [
        { name: "Russian River Valley", nameJa: "ロシアン・リヴァー・ヴァレー", lat: 38.5, lng: -122.9 },
        { name: "Dry Creek Valley", nameJa: "ドライ・クリーク・ヴァレー", lat: 38.65, lng: -122.95 },
        { name: "Alexander Valley", nameJa: "アレキサンダー・ヴァレー", lat: 38.7, lng: -122.85 },
      ]},
      { name: "Willamette Valley", nameJa: "ウィラメット・ヴァレー", lat: 45.0, lng: -123.1, subRegions: [
        { name: "Dundee Hills", nameJa: "ダンディー・ヒルズ", lat: 45.28, lng: -123.05 },
        { name: "Eola-Amity Hills", nameJa: "エオラ・アミティ・ヒルズ", lat: 45.0, lng: -123.15 },
      ]},
      { name: "Paso Robles", nameJa: "パソ・ロブレス", lat: 35.6, lng: -120.7, subRegions: [] },
      { name: "Finger Lakes", nameJa: "フィンガー・レイクス", lat: 42.7, lng: -76.8, subRegions: [] },
      { name: "Walla Walla", nameJa: "ワラワラ", lat: 46.1, lng: -118.3, subRegions: [] },
      { name: "Santa Barbara", nameJa: "サンタ・バーバラ", lat: 34.7, lng: -120.0, subRegions: [
        { name: "Sta. Rita Hills", nameJa: "サンタ・リタ・ヒルズ", lat: 34.6, lng: -120.5 },
        { name: "Happy Canyon", nameJa: "ハッピー・キャニオン", lat: 34.65, lng: -119.8 },
      ]},
    ],
  },
  {
    code: "AR", name: "Argentina", nameJa: "アルゼンチン", lat: -38.4, lng: -63.6,
    regions: [
      { name: "Mendoza", nameJa: "メンドーサ", lat: -32.9, lng: -68.8, subRegions: [
        { name: "Valle de Uco", nameJa: "ウコ・ヴァレー", lat: -33.8, lng: -69.3 },
        { name: "Luján de Cuyo", nameJa: "ルハン・デ・クヨ", lat: -33.0, lng: -68.9 },
        { name: "Maipú", nameJa: "マイプ", lat: -32.9, lng: -68.5 },
        { name: "San Rafael", nameJa: "サン・ラファエル", lat: -34.6, lng: -67.5 },
      ]},
      { name: "Salta", nameJa: "サルタ", lat: -24.8, lng: -65.4, subRegions: [
        { name: "Cafayate", nameJa: "カファヤテ", lat: -26.1, lng: -66.0 },
      ]},
      { name: "Patagonia", nameJa: "パタゴニア", lat: -39.0, lng: -68.0, subRegions: [
        { name: "Neuquén", nameJa: "ネウケン", lat: -38.9, lng: -68.1 },
        { name: "Río Negro", nameJa: "リオ・ネグロ", lat: -39.0, lng: -67.1 },
      ]},
      { name: "San Juan", nameJa: "サン・フアン", lat: -31.5, lng: -68.5, subRegions: [] },
    ],
  },
  {
    code: "CL", name: "Chile", nameJa: "チリ", lat: -35.7, lng: -71.5,
    regions: [
      { name: "Maipo Valley", nameJa: "マイポ・ヴァレー", lat: -33.7, lng: -70.7, subRegions: [
        { name: "Alto Maipo", nameJa: "アルト・マイポ", lat: -33.6, lng: -70.4 },
      ]},
      { name: "Colchagua", nameJa: "コルチャグア", lat: -34.5, lng: -71.2, subRegions: [] },
      { name: "Casablanca", nameJa: "カサブランカ", lat: -33.3, lng: -71.4, subRegions: [] },
      { name: "Maule", nameJa: "マウレ", lat: -35.5, lng: -71.7, subRegions: [] },
      { name: "Bio-Bio", nameJa: "ビオビオ", lat: -37.5, lng: -72.0, subRegions: [] },
    ],
  },
  {
    code: "AU", name: "Australia", nameJa: "オーストラリア", lat: -25.3, lng: 133.8,
    regions: [
      { name: "Barossa Valley", nameJa: "バロッサ・ヴァレー", lat: -34.6, lng: 138.9, subRegions: [] },
      { name: "McLaren Vale", nameJa: "マクラーレン・ヴェイル", lat: -35.2, lng: 138.5, subRegions: [] },
      { name: "Hunter Valley", nameJa: "ハンター・ヴァレー", lat: -32.8, lng: 151.3, subRegions: [] },
      { name: "Margaret River", nameJa: "マーガレット・リヴァー", lat: -33.9, lng: 115.1, subRegions: [] },
      { name: "Yarra Valley", nameJa: "ヤラ・ヴァレー", lat: -37.7, lng: 145.5, subRegions: [] },
      { name: "Coonawarra", nameJa: "クナワラ", lat: -37.3, lng: 140.8, subRegions: [] },
      { name: "Eden Valley", nameJa: "エデン・ヴァレー", lat: -34.6, lng: 139.1, subRegions: [] },
    ],
  },
  {
    code: "NZ", name: "New Zealand", nameJa: "ニュージーランド", lat: -40.9, lng: 174.9,
    regions: [
      { name: "Marlborough", nameJa: "マールボロ", lat: -41.5, lng: 173.9, subRegions: [] },
      { name: "Central Otago", nameJa: "セントラル・オタゴ", lat: -45.0, lng: 169.3, subRegions: [
        { name: "Bannockburn", nameJa: "バノックバーン", lat: -45.05, lng: 169.15 },
        { name: "Gibbston", nameJa: "ギブストン", lat: -45.02, lng: 168.95 },
      ]},
      { name: "Hawke's Bay", nameJa: "ホークス・ベイ", lat: -39.5, lng: 176.9, subRegions: [] },
      { name: "Martinborough", nameJa: "マーティンボロ", lat: -41.2, lng: 175.5, subRegions: [] },
      { name: "Waipara", nameJa: "ワイパラ", lat: -43.1, lng: 172.7, subRegions: [] },
    ],
  },
  {
    code: "ZA", name: "South Africa", nameJa: "南アフリカ", lat: -30.6, lng: 22.9,
    regions: [
      { name: "Stellenbosch", nameJa: "ステレンボッシュ", lat: -33.9, lng: 18.9, subRegions: [] },
      { name: "Franschhoek", nameJa: "フランシュック", lat: -33.9, lng: 19.1, subRegions: [] },
      { name: "Swartland", nameJa: "スワートランド", lat: -33.4, lng: 18.7, subRegions: [] },
      { name: "Paarl", nameJa: "パール", lat: -33.7, lng: 19.0, subRegions: [] },
      { name: "Constantia", nameJa: "コンスタンシア", lat: -34.0, lng: 18.4, subRegions: [] },
      { name: "Walker Bay", nameJa: "ウォーカー・ベイ", lat: -34.4, lng: 19.5, subRegions: [] },
    ],
  },
  {
    code: "JP", name: "Japan", nameJa: "日本", lat: 36.2, lng: 138.3,
    regions: [
      { name: "Yamanashi", nameJa: "山梨", lat: 35.7, lng: 138.6, subRegions: [
        { name: "Katsunuma", nameJa: "勝沼", lat: 35.68, lng: 138.73 },
      ]},
      { name: "Nagano", nameJa: "長野", lat: 36.2, lng: 138.2, subRegions: [
        { name: "Kikyōgahara", nameJa: "桔梗ヶ原", lat: 36.1, lng: 138.0 },
      ]},
      { name: "Hokkaido", nameJa: "北海道", lat: 43.1, lng: 141.3, subRegions: [
        { name: "Yoichi", nameJa: "余市", lat: 43.2, lng: 140.8 },
      ]},
      { name: "Yamagata", nameJa: "山形", lat: 38.2, lng: 140.3, subRegions: [] },
      { name: "Niigata", nameJa: "新潟", lat: 37.9, lng: 139.0, subRegions: [] },
    ],
  },
  {
    code: "GR", name: "Greece", nameJa: "ギリシャ", lat: 39.1, lng: 21.8,
    regions: [
      { name: "Santorini", nameJa: "サントリーニ", lat: 36.4, lng: 25.4, subRegions: [] },
      { name: "Nemea", nameJa: "ネメア", lat: 37.8, lng: 22.7, subRegions: [] },
      { name: "Naoussa", nameJa: "ナウサ", lat: 40.6, lng: 22.1, subRegions: [] },
      { name: "Crete", nameJa: "クレタ", lat: 35.2, lng: 24.9, subRegions: [] },
      { name: "Macedonia", nameJa: "マケドニア", lat: 40.6, lng: 22.9, subRegions: [] },
    ],
  },
  {
    code: "HU", name: "Hungary", nameJa: "ハンガリー", lat: 47.2, lng: 19.5,
    regions: [
      { name: "Tokaj", nameJa: "トカイ", lat: 48.1, lng: 21.4, subRegions: [] },
      { name: "Eger", nameJa: "エゲル", lat: 47.9, lng: 20.4, subRegions: [] },
      { name: "Villány", nameJa: "ヴィラーニ", lat: 45.9, lng: 18.5, subRegions: [] },
      { name: "Somló", nameJa: "ショムロー", lat: 47.2, lng: 17.4, subRegions: [] },
    ],
  },
  {
    code: "GE", name: "Georgia", nameJa: "ジョージア", lat: 42.3, lng: 43.4,
    regions: [
      { name: "Kakheti", nameJa: "カヘティ", lat: 41.6, lng: 45.7, subRegions: [] },
      { name: "Kartli", nameJa: "カルトリ", lat: 41.7, lng: 44.0, subRegions: [] },
      { name: "Imereti", nameJa: "イメレティ", lat: 42.2, lng: 43.0, subRegions: [] },
    ],
  },
  {
    code: "IL", name: "Israel", nameJa: "イスラエル", lat: 31.0, lng: 34.9,
    regions: [
      { name: "Galilee", nameJa: "ガリラヤ", lat: 32.8, lng: 35.5, subRegions: [] },
      { name: "Golan Heights", nameJa: "ゴラン高原", lat: 33.1, lng: 35.8, subRegions: [] },
      { name: "Judean Hills", nameJa: "ユダヤ丘陵", lat: 31.7, lng: 35.0, subRegions: [] },
    ],
  },
  {
    code: "LB", name: "Lebanon", nameJa: "レバノン", lat: 33.9, lng: 35.9,
    regions: [
      { name: "Bekaa Valley", nameJa: "ベカー高原", lat: 33.8, lng: 35.9, subRegions: [] },
      { name: "Batroun", nameJa: "バトルーン", lat: 34.3, lng: 35.7, subRegions: [] },
    ],
  },
  {
    code: "CN", name: "China", nameJa: "中国", lat: 35.9, lng: 104.2,
    regions: [
      { name: "Ningxia", nameJa: "寧夏", lat: 38.5, lng: 106.3, subRegions: [] },
      { name: "Shandong", nameJa: "山東", lat: 36.3, lng: 118.0, subRegions: [] },
      { name: "Yunnan", nameJa: "雲南", lat: 25.0, lng: 102.7, subRegions: [] },
    ],
  },
  {
    code: "BR", name: "Brazil", nameJa: "ブラジル", lat: -14.2, lng: -51.9,
    regions: [
      { name: "Serra Gaúcha", nameJa: "セラ・ガウーシャ", lat: -29.2, lng: -51.1, subRegions: [] },
      { name: "Vale do São Francisco", nameJa: "サンフランシスコ渓谷", lat: -9.4, lng: -40.5, subRegions: [] },
    ],
  },
  {
    code: "UY", name: "Uruguay", nameJa: "ウルグアイ", lat: -32.5, lng: -55.8,
    regions: [
      { name: "Canelones", nameJa: "カネロネス", lat: -34.5, lng: -56.3, subRegions: [] },
      { name: "Maldonado", nameJa: "マルドナド", lat: -34.9, lng: -55.0, subRegions: [] },
      { name: "Montevideo", nameJa: "モンテビデオ", lat: -34.9, lng: -56.2, subRegions: [] },
    ],
  },
  {
    code: "CA", name: "Canada", nameJa: "カナダ", lat: 56.1, lng: -106.3,
    regions: [
      { name: "Niagara Peninsula", nameJa: "ナイアガラ半島", lat: 43.1, lng: -79.2, subRegions: [] },
      { name: "Okanagan Valley", nameJa: "オカナガン・ヴァレー", lat: 49.5, lng: -119.6, subRegions: [] },
      { name: "Prince Edward County", nameJa: "プリンス・エドワード・カウンティ", lat: 44.0, lng: -77.1, subRegions: [] },
    ],
  },
  {
    code: "CH", name: "Switzerland", nameJa: "スイス", lat: 46.8, lng: 8.2,
    regions: [
      { name: "Valais", nameJa: "ヴァレー", lat: 46.2, lng: 7.6, subRegions: [] },
      { name: "Vaud", nameJa: "ヴォー", lat: 46.6, lng: 6.5, subRegions: [] },
      { name: "Geneva", nameJa: "ジュネーヴ", lat: 46.2, lng: 6.1, subRegions: [] },
      { name: "Ticino", nameJa: "ティチーノ", lat: 46.3, lng: 8.8, subRegions: [] },
    ],
  },
  {
    code: "RO", name: "Romania", nameJa: "ルーマニア", lat: 45.9, lng: 24.9,
    regions: [
      { name: "Dealu Mare", nameJa: "デアル・マーレ", lat: 45.0, lng: 26.2, subRegions: [] },
      { name: "Murfatlar", nameJa: "ムルファトラル", lat: 44.2, lng: 28.4, subRegions: [] },
      { name: "Transylvania", nameJa: "トランシルヴァニア", lat: 46.5, lng: 25.0, subRegions: [] },
    ],
  },
  {
    code: "HR", name: "Croatia", nameJa: "クロアチア", lat: 45.1, lng: 15.2,
    regions: [
      { name: "Istria", nameJa: "イストリア", lat: 45.2, lng: 14.0, subRegions: [] },
      { name: "Slavonia", nameJa: "スラヴォニア", lat: 45.5, lng: 18.0, subRegions: [] },
      { name: "Dalmatia", nameJa: "ダルマチア", lat: 43.5, lng: 16.4, subRegions: [] },
    ],
  },
  {
    code: "SI", name: "Slovenia", nameJa: "スロベニア", lat: 46.2, lng: 14.8,
    regions: [
      { name: "Goriška Brda", nameJa: "ゴリシュカ・ブルダ", lat: 45.97, lng: 13.53, subRegions: [] },
      { name: "Vipava Valley", nameJa: "ヴィパヴァ渓谷", lat: 45.85, lng: 13.95, subRegions: [] },
      { name: "Štajerska", nameJa: "シュタイエルスカ", lat: 46.5, lng: 15.6, subRegions: [] },
    ],
  },
  {
    code: "GB", name: "United Kingdom", nameJa: "イギリス", lat: 55.4, lng: -3.4,
    regions: [
      { name: "Sussex", nameJa: "サセックス", lat: 50.9, lng: -0.1, subRegions: [] },
      { name: "Hampshire", nameJa: "ハンプシャー", lat: 51.1, lng: -1.3, subRegions: [] },
      { name: "Kent", nameJa: "ケント", lat: 51.2, lng: 0.7, subRegions: [] },
      { name: "Surrey", nameJa: "サリー", lat: 51.3, lng: -0.4, subRegions: [] },
    ],
  },
  {
    code: "MX", name: "Mexico", nameJa: "メキシコ", lat: 23.6, lng: -102.6,
    regions: [
      { name: "Valle de Guadalupe", nameJa: "グアダルーペ渓谷", lat: 32.1, lng: -116.6, subRegions: [] },
      { name: "Querétaro", nameJa: "ケレタロ", lat: 20.6, lng: -100.4, subRegions: [] },
    ],
  },
  // ===== 22 new countries (batch 2) =====
  {
    code: "TR", name: "Turkey", nameJa: "トルコ", lat: 39.0, lng: 35.0,
    regions: [
      { name: "Thrace & Marmara", nameJa: "トラキア＆マルマラ", lat: 41.2, lng: 27.5, subRegions: [
        { name: "Tekirdağ", nameJa: "テキルダー", lat: 40.98, lng: 27.51 },
        { name: "Şarköy", nameJa: "シャルキョイ", lat: 40.61, lng: 27.11 },
        { name: "Mürefte", nameJa: "ミュレフテ", lat: 40.68, lng: 27.25 },
        { name: "Bozcaada Island", nameJa: "ボズジャアダ島", lat: 39.83, lng: 26.07 },
      ]},
      { name: "Aegean", nameJa: "エーゲ海", lat: 38.2, lng: 27.5, subRegions: [
        { name: "İzmir", nameJa: "イズミル", lat: 38.42, lng: 27.14 },
        { name: "Urla", nameJa: "ウルラ", lat: 38.32, lng: 26.77 },
        { name: "Denizli", nameJa: "デニズリ", lat: 37.77, lng: 29.09 },
        { name: "Manisa", nameJa: "マニサ", lat: 38.62, lng: 27.43 },
      ]},
      { name: "Central Anatolia", nameJa: "中央アナトリア", lat: 38.9, lng: 34.5, subRegions: [
        { name: "Cappadocia (Nevşehir)", nameJa: "カッパドキア（ネヴシェヒル）", lat: 38.63, lng: 34.72 },
        { name: "Kalecik (Ankara)", nameJa: "カレジク（アンカラ）", lat: 40.09, lng: 33.43 },
        { name: "Tokat", nameJa: "トカト", lat: 40.31, lng: 36.55 },
      ]},
      { name: "Eastern Anatolia", nameJa: "東アナトリア", lat: 38.7, lng: 39.5, subRegions: [
        { name: "Elazığ", nameJa: "エラズー", lat: 38.67, lng: 39.22 },
        { name: "Malatya", nameJa: "マラティヤ", lat: 38.35, lng: 38.31 },
        { name: "Diyarbakır", nameJa: "ディヤルバクル", lat: 37.91, lng: 40.23 },
      ]},
      { name: "Southeastern Anatolia", nameJa: "南東アナトリア", lat: 37.2, lng: 37.8, subRegions: [
        { name: "Gaziantep", nameJa: "ガズィアンテプ", lat: 37.07, lng: 37.38 },
        { name: "Şanlıurfa", nameJa: "シャンルウルファ", lat: 37.16, lng: 38.79 },
      ]},
      { name: "Mediterranean", nameJa: "地中海", lat: 36.9, lng: 30.7, subRegions: [
        { name: "Antalya", nameJa: "アンタルヤ", lat: 36.89, lng: 30.71 },
      ]},
      { name: "Black Sea", nameJa: "黒海", lat: 41.3, lng: 36.5, subRegions: [] },
    ],
  },
  {
    code: "AM", name: "Armenia", nameJa: "アルメニア", lat: 40.1, lng: 45.0,
    regions: [
      { name: "Ararat Valley", nameJa: "アララト渓谷", lat: 39.95, lng: 44.5, subRegions: [
        { name: "Yerevan", nameJa: "エレバン", lat: 40.18, lng: 44.51 },
        { name: "Armavir", nameJa: "アルマヴィル", lat: 40.15, lng: 44.04 },
      ]},
      { name: "Vayots Dzor", nameJa: "ヴァヨツ・ゾル", lat: 39.75, lng: 45.3, subRegions: [
        { name: "Areni", nameJa: "アレニ", lat: 39.72, lng: 45.18 },
        { name: "Rind", nameJa: "リンド", lat: 39.77, lng: 45.27 },
      ]},
      { name: "Aragatsotn", nameJa: "アラガツォトン", lat: 40.4, lng: 44.2, subRegions: [
        { name: "Aparan", nameJa: "アパラン", lat: 40.59, lng: 44.36 },
      ]},
      { name: "Gegharkunik", nameJa: "ゲガルクニク", lat: 40.3, lng: 45.3, subRegions: [
        { name: "Lake Sevan", nameJa: "セヴァン湖", lat: 40.31, lng: 45.35 },
      ]},
      { name: "Tavush", nameJa: "タヴシュ", lat: 40.9, lng: 45.4, subRegions: [
        { name: "Ijevan", nameJa: "イジェヴァン", lat: 40.87, lng: 45.15 },
      ]},
    ],
  },
  {
    code: "AZ", name: "Azerbaijan", nameJa: "アゼルバイジャン", lat: 40.7, lng: 47.5,
    regions: [
      { name: "Ganja-Gazakh", nameJa: "ギャンジャ＝ガザフ", lat: 40.68, lng: 46.36, subRegions: [
        { name: "Ganja", nameJa: "ギャンジャ", lat: 40.68, lng: 46.36 },
        { name: "Gazakh", nameJa: "ガザフ", lat: 41.09, lng: 45.35 },
      ]},
      { name: "Shamkir", nameJa: "シャムキル", lat: 40.83, lng: 46.02, subRegions: [
        { name: "Shamkir Valley", nameJa: "シャムキル渓谷", lat: 40.83, lng: 46.02 },
      ]},
      { name: "Tovuz", nameJa: "トヴズ", lat: 40.99, lng: 45.62, subRegions: [
        { name: "Tovuz District", nameJa: "トヴズ郡", lat: 40.99, lng: 45.62 },
      ]},
      { name: "Ismailli", nameJa: "イスマイッリ", lat: 40.79, lng: 48.15, subRegions: [
        { name: "Ismailli District", nameJa: "イスマイッリ郡", lat: 40.79, lng: 48.15 },
      ]},
      { name: "Sheki", nameJa: "シェキ", lat: 41.19, lng: 47.17, subRegions: [
        { name: "Sheki District", nameJa: "シェキ郡", lat: 41.19, lng: 47.17 },
      ]},
      { name: "Absheron Peninsula", nameJa: "アブシェロン半島", lat: 40.4, lng: 49.85, subRegions: [
        { name: "Madrasa", nameJa: "マドラサ", lat: 40.57, lng: 49.98 },
        { name: "Novkhani", nameJa: "ノヴハニ", lat: 40.53, lng: 49.81 },
      ]},
    ],
  },
  {
    code: "CY", name: "Cyprus", nameJa: "キプロス", lat: 34.9, lng: 33.0,
    regions: [
      { name: "Commandaria", nameJa: "コマンダリア", lat: 34.87, lng: 33.02, subRegions: [
        { name: "Kalo Chorio", nameJa: "カロ・ホリオ", lat: 34.85, lng: 33.08 },
        { name: "Zoopigi", nameJa: "ゾオピイ", lat: 34.83, lng: 32.98 },
        { name: "Agios Konstantinos", nameJa: "アギオス・コンスタンティノス", lat: 34.84, lng: 33.01 },
      ]},
      { name: "Limassol", nameJa: "リマソール", lat: 34.8, lng: 32.95, subRegions: [
        { name: "Krasochoria (Wine Villages)", nameJa: "クラソホリア（ワイン村）", lat: 34.85, lng: 32.88 },
        { name: "Troodos Mountains", nameJa: "トロードス山地", lat: 34.92, lng: 32.88 },
        { name: "Omodos", nameJa: "オモドス", lat: 34.84, lng: 32.81 },
        { name: "Vouni", nameJa: "ヴーニ", lat: 34.88, lng: 32.83 },
      ]},
      { name: "Paphos", nameJa: "パフォス", lat: 34.76, lng: 32.42, subRegions: [
        { name: "Stroumpi", nameJa: "ストルンピ", lat: 34.83, lng: 32.48 },
        { name: "Chrysorrogiatissa", nameJa: "クリソロギアティッサ", lat: 34.87, lng: 32.54 },
      ]},
      { name: "Larnaka", nameJa: "ラルナカ", lat: 34.9, lng: 33.62, subRegions: [
        { name: "Lefkara", nameJa: "レフカラ", lat: 34.87, lng: 33.32 },
      ]},
      { name: "Pitsilia", nameJa: "ピツィリア", lat: 34.93, lng: 33.05, subRegions: [
        { name: "Agros", nameJa: "アグロス", lat: 34.92, lng: 33.05 },
        { name: "Pelendri", nameJa: "ペレンドリ", lat: 34.9, lng: 32.95 },
        { name: "Alona", nameJa: "アロナ", lat: 34.95, lng: 33.02 },
      ]},
      { name: "Laona-Akamas", nameJa: "ラオナ＝アカマス", lat: 35.04, lng: 32.33, subRegions: [
        { name: "Akamas Peninsula", nameJa: "アカマス半島", lat: 35.06, lng: 32.31 },
        { name: "Kathikas", nameJa: "カティカス", lat: 34.96, lng: 32.4 },
      ]},
    ],
  },
  {
    code: "SK", name: "Slovakia", nameJa: "スロバキア", lat: 48.5, lng: 19.5,
    regions: [
      { name: "Tokaj", nameJa: "トカイ", lat: 48.39, lng: 21.72, subRegions: [
        { name: "Bara", nameJa: "バーラ", lat: 48.37, lng: 21.68 },
        { name: "Černochov", nameJa: "チェルノホフ", lat: 48.41, lng: 21.74 },
        { name: "Malá Tŕňa", nameJa: "マラー・トルニャ", lat: 48.42, lng: 21.75 },
        { name: "Slovenské Nové Mesto", nameJa: "スロヴェンスケー・ノヴェー・メスト", lat: 48.4, lng: 21.69 },
        { name: "Veľká Tŕňa", nameJa: "ヴェルカー・トルニャ", lat: 48.43, lng: 21.76 },
        { name: "Viničky", nameJa: "ヴィニチキー", lat: 48.38, lng: 21.71 },
      ]},
      { name: "Small Carpathian", nameJa: "小カルパチア", lat: 48.38, lng: 17.28, subRegions: [
        { name: "Pezinok", nameJa: "ペジノク", lat: 48.29, lng: 17.27 },
        { name: "Modra", nameJa: "モドラ", lat: 48.34, lng: 17.31 },
        { name: "Svätý Jur", nameJa: "スヴェティ・ユル", lat: 48.25, lng: 17.22 },
        { name: "Rača", nameJa: "ラチャ", lat: 48.21, lng: 17.17 },
      ]},
      { name: "Southern Slovakia", nameJa: "南スロバキア", lat: 47.95, lng: 18.35, subRegions: [
        { name: "Štúrovo", nameJa: "シュトゥーロヴォ", lat: 47.8, lng: 18.72 },
        { name: "Nové Zámky", nameJa: "ノヴェー・ザームキ", lat: 47.99, lng: 18.16 },
      ]},
      { name: "Nitra", nameJa: "ニトラ", lat: 48.2, lng: 18.25, subRegions: [
        { name: "Vráble", nameJa: "ヴラーブレ", lat: 48.24, lng: 18.31 },
        { name: "Šintava", nameJa: "シンタヴァ", lat: 48.4, lng: 17.91 },
      ]},
      { name: "Central Slovakia", nameJa: "中央スロバキア", lat: 48.5, lng: 19.1, subRegions: [] },
      { name: "Eastern Slovakia", nameJa: "東スロバキア", lat: 48.72, lng: 21.25, subRegions: [] },
    ],
  },
  {
    code: "CZ", name: "Czech Republic", nameJa: "チェコ", lat: 49.8, lng: 15.5,
    regions: [
      { name: "Moravia", nameJa: "モラヴィア", lat: 48.9, lng: 16.6, subRegions: [
        { name: "Znojmo", nameJa: "ズノイモ", lat: 48.86, lng: 16.05 },
        { name: "Mikulov", nameJa: "ミクロフ", lat: 48.81, lng: 16.64 },
        { name: "Velké Pavlovice", nameJa: "ヴェルケー・パヴロヴィツェ", lat: 48.9, lng: 16.82 },
        { name: "Slovácko", nameJa: "スロヴァーツコ", lat: 48.97, lng: 17.27 },
        { name: "Uherské Hradiště", nameJa: "ウヘルスケー・フラジシュチェ", lat: 49.07, lng: 17.46 },
        { name: "Bzenec", nameJa: "ブゼネツ", lat: 48.97, lng: 17.27 },
        { name: "Strážnice", nameJa: "ストラージュニツェ", lat: 48.9, lng: 17.32 },
      ]},
      { name: "Bohemia", nameJa: "ボヘミア", lat: 50.35, lng: 14.45, subRegions: [
        { name: "Mělník", nameJa: "ムニェルニーク", lat: 50.35, lng: 14.47 },
        { name: "Litoměřice", nameJa: "リトムニェジツェ", lat: 50.54, lng: 14.13 },
        { name: "Praha", nameJa: "プラハ", lat: 50.08, lng: 14.42 },
        { name: "Žernoseky", nameJa: "ジェルノセキ", lat: 50.53, lng: 14.05 },
        { name: "Roudnice nad Labem", nameJa: "ロウドニツェ・ナド・ラベム", lat: 50.43, lng: 14.26 },
      ]},
    ],
  },
  {
    code: "BG", name: "Bulgaria", nameJa: "ブルガリア", lat: 42.7, lng: 25.5,
    regions: [
      { name: "Danube Plain", nameJa: "ドナウ平原", lat: 43.5, lng: 25.0, subRegions: [
        { name: "Pleven", nameJa: "プレヴェン", lat: 43.42, lng: 24.62 },
        { name: "Svishtov", nameJa: "スヴィシュトフ", lat: 43.62, lng: 25.35 },
        { name: "Vidin", nameJa: "ヴィディン", lat: 43.99, lng: 22.88 },
        { name: "Russe", nameJa: "ルセ", lat: 43.84, lng: 25.95 },
        { name: "Lovech", nameJa: "ロヴェチ", lat: 43.13, lng: 24.72 },
        { name: "Vratsa", nameJa: "ヴラツァ", lat: 43.21, lng: 23.55 },
      ]},
      { name: "Thracian Valley", nameJa: "トラキア渓谷", lat: 42.15, lng: 25.6, subRegions: [
        { name: "Plovdiv", nameJa: "プロヴディフ", lat: 42.15, lng: 24.75 },
        { name: "Stara Zagora", nameJa: "スタラ・ザゴラ", lat: 42.43, lng: 25.64 },
        { name: "Haskovo", nameJa: "ハスコヴォ", lat: 41.93, lng: 25.56 },
        { name: "Pazardzhik", nameJa: "パザルジク", lat: 42.19, lng: 24.33 },
        { name: "Chirpan", nameJa: "チルパン", lat: 42.2, lng: 25.32 },
        { name: "Brestnik", nameJa: "ブレストニク", lat: 42.08, lng: 24.82 },
        { name: "Asenovgrad", nameJa: "アセノヴグラド", lat: 41.99, lng: 24.87 },
      ]},
      { name: "Black Sea", nameJa: "黒海", lat: 43.1, lng: 27.6, subRegions: [
        { name: "Varna", nameJa: "ヴァルナ", lat: 43.21, lng: 27.91 },
        { name: "Shumen", nameJa: "シューメン", lat: 43.27, lng: 26.92 },
        { name: "Burgas", nameJa: "ブルガス", lat: 42.51, lng: 27.47 },
        { name: "Pomorie", nameJa: "ポモリエ", lat: 42.56, lng: 27.64 },
        { name: "Preslav", nameJa: "プレスラフ", lat: 43.16, lng: 26.82 },
      ]},
      { name: "Rose Valley", nameJa: "バラの谷", lat: 42.62, lng: 25.39, subRegions: [
        { name: "Kazanlak", nameJa: "カザンラク", lat: 42.62, lng: 25.39 },
        { name: "Karlovo", nameJa: "カルロヴォ", lat: 42.64, lng: 24.81 },
      ]},
      { name: "Struma River Valley", nameJa: "ストルマ川渓谷", lat: 41.7, lng: 23.3, subRegions: [
        { name: "Sandanski", nameJa: "サンダンスキ", lat: 41.57, lng: 23.27 },
        { name: "Melnik", nameJa: "メルニク", lat: 41.52, lng: 23.4 },
        { name: "Petrich", nameJa: "ペトリチ", lat: 41.4, lng: 23.21 },
        { name: "Blagoevgrad", nameJa: "ブラゴエフグラド", lat: 42.01, lng: 23.1 },
        { name: "Kresna", nameJa: "クレスナ", lat: 41.7, lng: 23.17 },
      ]},
      { name: "Sub-Balkan", nameJa: "サブ・バルカン", lat: 42.72, lng: 24.7, subRegions: [
        { name: "Sungurlare", nameJa: "スングルラレ", lat: 42.77, lng: 26.78 },
        { name: "Sopot", nameJa: "ソポト", lat: 42.66, lng: 24.75 },
      ]},
    ],
  },
  {
    code: "UA", name: "Ukraine", nameJa: "ウクライナ", lat: 48.4, lng: 31.2,
    regions: [
      { name: "Odessa", nameJa: "オデーサ", lat: 46.48, lng: 30.73, subRegions: [
        { name: "Shabo", nameJa: "シャボ", lat: 46.12, lng: 30.53 },
        { name: "Bessarabia", nameJa: "ベッサラビア", lat: 45.9, lng: 29.9 },
        { name: "Koblevo", nameJa: "コブレヴォ", lat: 46.67, lng: 31.18 },
      ]},
      { name: "Kherson", nameJa: "ヘルソン", lat: 46.64, lng: 32.61, subRegions: [
        { name: "Kakhovka", nameJa: "カホフカ", lat: 46.82, lng: 33.49 },
        { name: "Kherson City", nameJa: "ヘルソン市", lat: 46.64, lng: 32.61 },
      ]},
      { name: "Mykolaiv", nameJa: "ムィコライウ", lat: 46.97, lng: 31.99, subRegions: [
        { name: "Pervomaisk", nameJa: "ペルヴォマイスク", lat: 48.04, lng: 30.85 },
      ]},
      { name: "Zakarpattia", nameJa: "ザカルパッチャ", lat: 48.26, lng: 22.9, subRegions: [
        { name: "Berehove", nameJa: "ベレホヴェ", lat: 48.21, lng: 22.65 },
        { name: "Mukachevo", nameJa: "ムカチェヴォ", lat: 48.44, lng: 22.71 },
        { name: "Uzhhorod", nameJa: "ウージュホロド", lat: 48.62, lng: 22.3 },
      ]},
      { name: "Crimea", nameJa: "クリミア", lat: 44.95, lng: 34.1, subRegions: [
        { name: "Massandra", nameJa: "マッサンドラ", lat: 44.5, lng: 34.17 },
        { name: "Koktebel", nameJa: "コクテベル", lat: 44.95, lng: 35.25 },
        { name: "Sevastopol", nameJa: "セヴァストポリ", lat: 44.6, lng: 33.52 },
        { name: "Inkerman", nameJa: "インケルマン", lat: 44.6, lng: 33.6 },
        { name: "Novy Svet", nameJa: "ノヴィ・スヴェト", lat: 44.8, lng: 34.96 },
        { name: "Bakhchysarai", nameJa: "バフチサライ", lat: 44.75, lng: 33.87 },
        { name: "Yalta", nameJa: "ヤルタ", lat: 44.5, lng: 34.16 },
      ]},
    ],
  },
  {
    code: "MD", name: "Moldova", nameJa: "モルドバ", lat: 47.0, lng: 28.5,
    regions: [
      { name: "Codru", nameJa: "コドル", lat: 47.0, lng: 28.5, subRegions: [
        { name: "Cricova", nameJa: "クリコヴァ", lat: 47.13, lng: 28.87 },
        { name: "Mileștii Mici", nameJa: "ミレシュティ・ミチ", lat: 46.93, lng: 28.93 },
        { name: "Chișinău", nameJa: "キシナウ", lat: 47.01, lng: 28.86 },
        { name: "Ialoveni", nameJa: "イアロヴェニ", lat: 46.87, lng: 28.78 },
        { name: "Strășeni", nameJa: "ストラシェニ", lat: 47.14, lng: 28.61 },
        { name: "Nisporeni", nameJa: "ニスポレニ", lat: 47.08, lng: 28.17 },
      ]},
      { name: "Valul lui Traian", nameJa: "ヴァルル・ルイ・トライアン", lat: 45.95, lng: 28.35, subRegions: [
        { name: "Cahul", nameJa: "カフル", lat: 45.9, lng: 28.19 },
        { name: "Comrat", nameJa: "コムラト", lat: 46.3, lng: 28.66 },
        { name: "Leova", nameJa: "レオヴァ", lat: 46.48, lng: 28.27 },
        { name: "Cimișlia", nameJa: "チミシュリア", lat: 46.52, lng: 28.77 },
      ]},
      { name: "Ștefan Vodă", nameJa: "シュテファン・ヴォダ", lat: 46.52, lng: 29.66, subRegions: [
        { name: "Purcari", nameJa: "プルカリ", lat: 46.43, lng: 29.88 },
        { name: "Căușeni", nameJa: "コーシェニ", lat: 46.64, lng: 29.41 },
        { name: "Crocmaz", nameJa: "クロクマズ", lat: 46.37, lng: 29.92 },
      ]},
      { name: "Divin", nameJa: "ディヴィン", lat: 47.33, lng: 28.13, subRegions: [
        { name: "Bălți", nameJa: "バルツィ", lat: 47.76, lng: 27.93 },
        { name: "Tiraspol", nameJa: "ティラスポル", lat: 46.84, lng: 29.63 },
      ]},
    ],
  },
  {
    code: "RS", name: "Serbia", nameJa: "セルビア", lat: 44.0, lng: 21.0,
    regions: [
      { name: "Šumadija & Western Serbia", nameJa: "シュマディヤ＆西セルビア", lat: 43.9, lng: 20.8, subRegions: [
        { name: "Župa", nameJa: "ジュパ", lat: 43.57, lng: 21.48 },
        { name: "Oplenac", nameJa: "オプレナツ", lat: 44.12, lng: 20.58 },
        { name: "Trstenik", nameJa: "トルステニク", lat: 43.62, lng: 21.0 },
        { name: "Kruševac", nameJa: "クルシェヴァツ", lat: 43.58, lng: 21.33 },
      ]},
      { name: "Southern & Eastern Serbia", nameJa: "南東セルビア", lat: 43.35, lng: 22.1, subRegions: [
        { name: "Niš", nameJa: "ニシュ", lat: 43.32, lng: 21.9 },
        { name: "Negotin (Timok)", nameJa: "ネゴティン（ティモク）", lat: 44.23, lng: 22.52 },
        { name: "Knjaževac", nameJa: "クニャジェヴァツ", lat: 43.57, lng: 22.26 },
        { name: "Vranje", nameJa: "ヴランイェ", lat: 42.55, lng: 21.9 },
      ]},
      { name: "Vojvodina", nameJa: "ヴォイヴォディナ", lat: 45.25, lng: 19.85, subRegions: [
        { name: "Fruška Gora", nameJa: "フルシュカ・ゴーラ", lat: 45.15, lng: 19.75 },
        { name: "Subotica-Horgoš", nameJa: "スボティツァ＝ホルゴシュ", lat: 46.08, lng: 19.67 },
        { name: "Sremski Karlovci", nameJa: "スレムスキ・カルロヴツィ", lat: 45.2, lng: 19.93 },
        { name: "Palić", nameJa: "パリチ", lat: 46.1, lng: 19.77 },
      ]},
      { name: "Belgrade Wine Region", nameJa: "ベオグラード", lat: 44.82, lng: 20.46, subRegions: [] },
    ],
  },
  {
    code: "MK", name: "North Macedonia", nameJa: "北マケドニア", lat: 41.6, lng: 21.7,
    regions: [
      { name: "Tikveš", nameJa: "ティクヴェシュ", lat: 41.65, lng: 21.9, subRegions: [
        { name: "Negotino", nameJa: "ネゴティノ", lat: 41.48, lng: 22.09 },
        { name: "Kavadarci", nameJa: "カヴァダルツィ", lat: 41.43, lng: 22.01 },
      ]},
      { name: "Povardarie", nameJa: "ポヴァルダリエ", lat: 41.4, lng: 22.3, subRegions: [
        { name: "Demir Kapija", nameJa: "デミル・カピヤ", lat: 41.41, lng: 22.24 },
        { name: "Gevgelija", nameJa: "ゲヴゲリヤ", lat: 41.14, lng: 22.5 },
        { name: "Valandovo", nameJa: "ヴァランドヴォ", lat: 41.32, lng: 22.56 },
      ]},
      { name: "Pelagonija-Pollog", nameJa: "ペラゴニヤ＝ポログ", lat: 41.15, lng: 21.35, subRegions: [
        { name: "Bitola", nameJa: "ビトラ", lat: 41.03, lng: 21.33 },
        { name: "Prilep", nameJa: "プリレプ", lat: 41.34, lng: 21.55 },
      ]},
      { name: "Pcinja-Osogovo", nameJa: "プチニャ＝オソゴヴォ", lat: 41.45, lng: 22.65, subRegions: [
        { name: "Strumica", nameJa: "ストルミツァ", lat: 41.44, lng: 22.64 },
        { name: "Radoviš", nameJa: "ラドヴィシュ", lat: 41.64, lng: 22.47 },
      ]},
      { name: "Skopje", nameJa: "スコピエ", lat: 42.0, lng: 21.43, subRegions: [] },
    ],
  },
  {
    code: "AL", name: "Albania", nameJa: "アルバニア", lat: 41.1, lng: 20.2,
    regions: [
      { name: "Shkodër (Northern Highlands)", nameJa: "シュコダル（北部高地）", lat: 42.07, lng: 19.51, subRegions: [] },
      { name: "Durrës (Central Coast)", nameJa: "ドゥラス（中央海岸）", lat: 41.32, lng: 19.45, subRegions: [
        { name: "Mamaj", nameJa: "ママイ", lat: 41.27, lng: 19.55 },
      ]},
      { name: "Berat", nameJa: "ベラト", lat: 40.7, lng: 19.95, subRegions: [
        { name: "Rënjë", nameJa: "レニェ", lat: 40.63, lng: 19.98 },
        { name: "Ura Vajgurore", nameJa: "ウラ・ヴァイグロレ", lat: 40.77, lng: 19.87 },
      ]},
      { name: "Elbasan", nameJa: "エルバサン", lat: 41.11, lng: 20.08, subRegions: [] },
      { name: "Vlorë (Southern Coast)", nameJa: "ヴロラ（南部海岸）", lat: 40.47, lng: 19.49, subRegions: [] },
      { name: "Korçë (Eastern Highlands)", nameJa: "コルチャ（東部高地）", lat: 40.62, lng: 20.78, subRegions: [
        { name: "Leskovik", nameJa: "レスコヴィク", lat: 40.15, lng: 20.6 },
      ]},
      { name: "Përmet", nameJa: "ペルメト", lat: 40.23, lng: 20.35, subRegions: [] },
    ],
  },
  {
    code: "MT", name: "Malta", nameJa: "マルタ", lat: 35.94, lng: 14.37,
    regions: [
      { name: "DOK Malta", nameJa: "DOKマルタ", lat: 35.9, lng: 14.43, subRegions: [] },
      { name: "DOK Gozo", nameJa: "DOKゴゾ", lat: 36.04, lng: 14.25, subRegions: [] },
      { name: "IĠT Maltese Islands", nameJa: "IĠTマルタ諸島", lat: 35.95, lng: 14.37, subRegions: [] },
      { name: "Malta Island", nameJa: "マルタ島", lat: 35.88, lng: 14.44, subRegions: [
        { name: "Siġġiewi", nameJa: "スィッジェーウィ", lat: 35.85, lng: 14.43 },
        { name: "Rabat", nameJa: "ラバト", lat: 35.88, lng: 14.39 },
        { name: "Mġarr", nameJa: "ムジャール", lat: 35.92, lng: 14.37 },
      ]},
      { name: "Gozo Island", nameJa: "ゴゾ島", lat: 36.04, lng: 14.25, subRegions: [
        { name: "Victoria (Rabat, Gozo)", nameJa: "ヴィクトリア（ラバト、ゴゾ）", lat: 36.04, lng: 14.24 },
        { name: "Marsalforn", nameJa: "マルサルフォルン", lat: 36.07, lng: 14.26 },
        { name: "Għarb", nameJa: "ガーブ", lat: 36.07, lng: 14.21 },
      ]},
    ],
  },
  {
    code: "LU", name: "Luxembourg", nameJa: "ルクセンブルク", lat: 49.6, lng: 6.38,
    regions: [
      { name: "Moselle Luxembourgeoise", nameJa: "モーゼル・ルクセンブルジョワーズ", lat: 49.55, lng: 6.37, subRegions: [
        { name: "Remich", nameJa: "レーミヒ", lat: 49.54, lng: 6.37 },
        { name: "Grevenmacher", nameJa: "グレーヴェンマッハー", lat: 49.68, lng: 6.44 },
        { name: "Wormeldange", nameJa: "ヴォルメルダンジュ", lat: 49.61, lng: 6.4 },
        { name: "Ehnen", nameJa: "エーネン", lat: 49.58, lng: 6.38 },
        { name: "Ahn", nameJa: "アン", lat: 49.6, lng: 6.39 },
        { name: "Stadtbredimus", nameJa: "シュタットブレディムス", lat: 49.52, lng: 6.35 },
        { name: "Koeppchen (Wormeldange)", nameJa: "ケッペヘン（ヴォルメルダンジュ）", lat: 49.62, lng: 6.41 },
        { name: "Fels (Wintrange)", nameJa: "フェルス（ヴィントランジュ）", lat: 49.49, lng: 6.32 },
        { name: "Palmberg (Ehnen)", nameJa: "パルムベルク（エーネン）", lat: 49.58, lng: 6.385 },
      ]},
      { name: "Crémant de Luxembourg", nameJa: "クレマン・ド・ルクセンブルク", lat: 49.6, lng: 6.38, subRegions: [] },
    ],
  },
  {
    code: "MA", name: "Morocco", nameJa: "モロッコ", lat: 32.0, lng: -5.0,
    regions: [
      { name: "Meknès-Fès", nameJa: "メクネス＝フェス", lat: 33.9, lng: -5.5, subRegions: [
        { name: "Beni M'Tir", nameJa: "ベニ・ムティル", lat: 33.7, lng: -5.1 },
        { name: "Beni Sadden", nameJa: "ベニ・サッデン", lat: 33.65, lng: -5.05 },
        { name: "Guerrouane", nameJa: "ゲルーアン", lat: 33.85, lng: -5.35 },
        { name: "Zerhoune", nameJa: "ゼルフーン", lat: 34.05, lng: -5.6 },
        { name: "Volubilis", nameJa: "ヴォルビリス", lat: 34.07, lng: -5.55 },
      ]},
      { name: "Casablanca / Doukkala", nameJa: "カサブランカ／ドゥッカラ", lat: 33.5, lng: -7.6, subRegions: [
        { name: "Zenata", nameJa: "ゼナタ", lat: 33.65, lng: -7.4 },
        { name: "Boulaouane", nameJa: "ブラウアン", lat: 33.18, lng: -8.0 },
      ]},
      { name: "Rabat / Gharb", nameJa: "ラバト／ガルブ", lat: 34.0, lng: -6.8, subRegions: [
        { name: "Zaër", nameJa: "ザエル", lat: 33.85, lng: -6.7 },
        { name: "Chellah", nameJa: "シェラ", lat: 34.02, lng: -6.82 },
      ]},
      { name: "Eastern Morocco", nameJa: "東モロッコ", lat: 34.68, lng: -1.9, subRegions: [
        { name: "Angad", nameJa: "アンガド", lat: 34.7, lng: -1.95 },
        { name: "Berkane", nameJa: "ベルカネ", lat: 34.92, lng: -2.32 },
        { name: "Beni Snassen", nameJa: "ベニ・スナッセン", lat: 34.85, lng: -2.45 },
        { name: "Oujda", nameJa: "ウジダ", lat: 34.68, lng: -1.9 },
      ]},
      { name: "Atlas Mountains Foothills", nameJa: "アトラス山麓", lat: 32.5, lng: -5.5, subRegions: [] },
      { name: "Northern Morocco / Rif", nameJa: "北モロッコ／リフ", lat: 35.57, lng: -5.37, subRegions: [
        { name: "Tetouan", nameJa: "テトゥアン", lat: 35.57, lng: -5.37 },
      ]},
    ],
  },
  {
    code: "TN", name: "Tunisia", nameJa: "チュニジア", lat: 36.8, lng: 10.2,
    regions: [
      { name: "Grombalia / Cap Bon", nameJa: "グロンバリア／カップ・ボン", lat: 36.6, lng: 10.5, subRegions: [
        { name: "Grombalia", nameJa: "グロンバリア", lat: 36.61, lng: 10.5 },
        { name: "Kelibia", nameJa: "ケリビア", lat: 36.85, lng: 11.1 },
        { name: "Nabeul", nameJa: "ナブール", lat: 36.45, lng: 10.73 },
      ]},
      { name: "Mornag", nameJa: "モルナグ", lat: 36.68, lng: 10.27, subRegions: [
        { name: "Mornag AOC", nameJa: "モルナグAOC", lat: 36.68, lng: 10.27 },
      ]},
      { name: "Coteaux d'Utique", nameJa: "コトー・ドゥティック", lat: 37.07, lng: 10.05, subRegions: [
        { name: "Bizerte", nameJa: "ビゼルト", lat: 37.27, lng: 9.87 },
        { name: "Utique", nameJa: "ウティカ", lat: 37.07, lng: 10.05 },
      ]},
      { name: "Thibar", nameJa: "ティバール", lat: 36.72, lng: 9.08, subRegions: [
        { name: "Thibar AOC", nameJa: "ティバールAOC", lat: 36.72, lng: 9.08 },
      ]},
      { name: "Tébourba", nameJa: "テブルバ", lat: 36.83, lng: 9.83, subRegions: [
        { name: "Tébourba AOC", nameJa: "テブルバAOC", lat: 36.83, lng: 9.83 },
      ]},
      { name: "Sidi Salem", nameJa: "シディ・サレム", lat: 37.05, lng: 9.55, subRegions: [
        { name: "Sidi Salem AOC", nameJa: "シディ・サレムAOC", lat: 37.05, lng: 9.55 },
      ]},
    ],
  },
  {
    code: "DZ", name: "Algeria", nameJa: "アルジェリア", lat: 35.5, lng: 1.5,
    regions: [
      { name: "Coteaux de Mascara", nameJa: "コトー・ド・マスカラ", lat: 35.4, lng: 0.14, subRegions: [
        { name: "Mascara AOC", nameJa: "マスカラAOC", lat: 35.4, lng: 0.14 },
        { name: "Beni Chougrane", nameJa: "ベニ・シュグラン", lat: 35.45, lng: 0.22 },
        { name: "Hachem", nameJa: "ハシェム", lat: 35.3, lng: 0.1 },
      ]},
      { name: "Coteaux de Tlemcen", nameJa: "コトー・ド・トレムセン", lat: 34.88, lng: -1.32, subRegions: [
        { name: "Tlemcen AOC", nameJa: "トレムセンAOC", lat: 34.88, lng: -1.32 },
        { name: "Aïn Fezza", nameJa: "アイン・フェッザ", lat: 34.95, lng: -1.42 },
        { name: "Rénan", nameJa: "レナン", lat: 34.85, lng: -1.28 },
      ]},
      { name: "Monts du Tessalah", nameJa: "モン・デュ・テッサラ", lat: 35.2, lng: -0.63, subRegions: [
        { name: "Sidi Bel Abbès", nameJa: "シディ・ベル・アッベス", lat: 35.19, lng: -0.63 },
      ]},
      { name: "Mostaganem-Dahra", nameJa: "モスタガネム＝ダフラ", lat: 35.93, lng: 0.09, subRegions: [
        { name: "Mostaganem AOC", nameJa: "モスタガネムAOC", lat: 35.93, lng: 0.09 },
        { name: "Dahra Hills", nameJa: "ダフラ丘陵", lat: 36.05, lng: 0.3 },
        { name: "Rivière du Rhélif", nameJa: "リヴィエール・デュ・レリフ", lat: 36.1, lng: 0.2 },
      ]},
      { name: "Médéa", nameJa: "メデア", lat: 36.27, lng: 2.75, subRegions: [
        { name: "Médéa AOC", nameJa: "メデアAOC", lat: 36.27, lng: 2.75 },
        { name: "Hauts Plateaux", nameJa: "オー・プラトー", lat: 36.1, lng: 2.9 },
      ]},
      { name: "Aïn-Bessem-Bouïra", nameJa: "アイン＝ベッセム＝ブイラ", lat: 36.3, lng: 3.67, subRegions: [
        { name: "Aïn-Bessem AOC", nameJa: "アイン＝ベッセムAOC", lat: 36.3, lng: 3.67 },
        { name: "Bouïra", nameJa: "ブイラ", lat: 36.38, lng: 3.9 },
      ]},
      { name: "Zaccar / Miliana", nameJa: "ザッカル／ミリアナ", lat: 36.3, lng: 2.23, subRegions: [
        { name: "Zaccar AOC", nameJa: "ザッカルAOC", lat: 36.3, lng: 2.23 },
        { name: "Miliana", nameJa: "ミリアナ", lat: 36.3, lng: 2.23 },
        { name: "Aïn Defla", nameJa: "アイン・デフラ", lat: 36.26, lng: 1.97 },
      ]},
      { name: "Sahel d'Alger", nameJa: "サヘル・ダルジェ", lat: 36.73, lng: 3.08, subRegions: [
        { name: "Aïn-Témouchent", nameJa: "アイン＝テムシェント", lat: 35.3, lng: -1.13 },
        { name: "Côtes du Zaccar", nameJa: "コート・デュ・ザッカル", lat: 36.35, lng: 2.3 },
        { name: "Mitidja", nameJa: "ミティジャ", lat: 36.62, lng: 2.95 },
      ]},
    ],
  },
  {
    code: "IN", name: "India", nameJa: "インド", lat: 20.6, lng: 78.9,
    regions: [
      { name: "Maharashtra", nameJa: "マハーラーシュトラ", lat: 19.9, lng: 75.7, subRegions: [
        { name: "Nashik", nameJa: "ナーシク", lat: 20.0, lng: 73.8 },
        { name: "Dindori", nameJa: "ディンドリ", lat: 20.2, lng: 73.85 },
        { name: "Igatpuri", nameJa: "イガトプリ", lat: 19.7, lng: 73.55 },
        { name: "Niphad", nameJa: "ニファド", lat: 20.1, lng: 74.1 },
        { name: "Baramati", nameJa: "バラマティ", lat: 18.15, lng: 74.6 },
        { name: "Sangli", nameJa: "サングリ", lat: 16.85, lng: 74.57 },
        { name: "Solapur", nameJa: "ソラープル", lat: 17.7, lng: 75.9 },
      ]},
      { name: "Karnataka", nameJa: "カルナータカ", lat: 14.5, lng: 75.7, subRegions: [
        { name: "Nandi Hills", nameJa: "ナンディ・ヒルズ", lat: 13.37, lng: 77.68 },
        { name: "Bijapur", nameJa: "ビジャープル", lat: 16.83, lng: 75.72 },
        { name: "Hampi Hills", nameJa: "ハンピ・ヒルズ", lat: 15.34, lng: 76.46 },
      ]},
      { name: "Himachal Pradesh", nameJa: "ヒマーチャル・プラデーシュ", lat: 32.1, lng: 77.2, subRegions: [
        { name: "Kullu Valley", nameJa: "クル渓谷", lat: 32.1, lng: 77.1 },
        { name: "Solang", nameJa: "ソラング", lat: 32.32, lng: 77.15 },
      ]},
      { name: "Goa", nameJa: "ゴア", lat: 15.3, lng: 74.0, subRegions: [] },
      { name: "Arunachal Pradesh", nameJa: "アルナーチャル・プラデーシュ", lat: 28.2, lng: 94.7, subRegions: [] },
      { name: "Meghalaya", nameJa: "メガラヤ", lat: 25.5, lng: 91.4, subRegions: [] },
    ],
  },
  {
    code: "TH", name: "Thailand", nameJa: "タイ", lat: 15.9, lng: 100.9,
    regions: [
      { name: "Khao Yai", nameJa: "カオヤイ", lat: 14.44, lng: 101.37, subRegions: [
        { name: "PB Valley", nameJa: "PBヴァレー", lat: 14.5, lng: 101.4 },
        { name: "GranMonte", nameJa: "グランモンテ", lat: 14.42, lng: 101.35 },
      ]},
      { name: "Wang Nam Khiao", nameJa: "ワンナムキアオ", lat: 14.38, lng: 101.82, subRegions: [] },
      { name: "Loei", nameJa: "ルーイ", lat: 17.49, lng: 101.72, subRegions: [
        { name: "Asoke Valley", nameJa: "アソケ渓谷", lat: 17.3, lng: 101.6 },
      ]},
      { name: "Hua Hin Hills", nameJa: "フアヒン・ヒルズ", lat: 12.57, lng: 99.96, subRegions: [
        { name: "Monsoon Valley", nameJa: "モンスーン・ヴァレー", lat: 12.6, lng: 99.98 },
      ]},
      { name: "Sam Roi Yot", nameJa: "サムロイヨート", lat: 12.17, lng: 99.98, subRegions: [] },
      { name: "Chiang Mai", nameJa: "チェンマイ", lat: 18.79, lng: 98.98, subRegions: [
        { name: "Doi Inthanon", nameJa: "ドーイ・インタノン", lat: 18.59, lng: 98.49 },
      ]},
    ],
  },
  {
    code: "PE", name: "Peru", nameJa: "ペルー", lat: -9.2, lng: -75.0,
    regions: [
      { name: "Ica", nameJa: "イカ", lat: -14.1, lng: -75.7, subRegions: [
        { name: "Ica Valley", nameJa: "イカ渓谷", lat: -14.07, lng: -75.73 },
        { name: "Chincha", nameJa: "チンチャ", lat: -13.4, lng: -76.13 },
        { name: "Pisco", nameJa: "ピスコ", lat: -13.71, lng: -76.21 },
      ]},
      { name: "Lima", nameJa: "リマ", lat: -12.0, lng: -76.9, subRegions: [
        { name: "Lunahuaná", nameJa: "ルナワナ", lat: -12.98, lng: -76.08 },
        { name: "Pachacámac", nameJa: "パチャカマク", lat: -12.24, lng: -76.87 },
      ]},
      { name: "Tacna", nameJa: "タクナ", lat: -18.0, lng: -70.25, subRegions: [] },
      { name: "Arequipa", nameJa: "アレキパ", lat: -16.4, lng: -71.5, subRegions: [
        { name: "Vítor Valley", nameJa: "ヴィトル渓谷", lat: -16.42, lng: -71.86 },
      ]},
      { name: "Moquegua", nameJa: "モケグア", lat: -17.19, lng: -70.93, subRegions: [] },
    ],
  },
  {
    code: "BO", name: "Bolivia", nameJa: "ボリビア", lat: -16.3, lng: -64.0,
    regions: [
      { name: "Tarija", nameJa: "タリハ", lat: -21.53, lng: -64.73, subRegions: [
        { name: "Valle Central", nameJa: "バジェ・セントラル", lat: -21.55, lng: -64.7 },
        { name: "Concepción", nameJa: "コンセプシオン", lat: -21.45, lng: -64.65 },
        { name: "El Portillo", nameJa: "エル・ポルティージョ", lat: -21.6, lng: -64.72 },
        { name: "Calamuchita", nameJa: "カラムチタ", lat: -21.5, lng: -64.78 },
      ]},
      { name: "Cinti Valley", nameJa: "シンティ渓谷", lat: -20.65, lng: -65.25, subRegions: [
        { name: "Camargo", nameJa: "カマルゴ", lat: -20.64, lng: -65.22 },
        { name: "Villa Abecia", nameJa: "ビジャ・アベシア", lat: -21.0, lng: -65.28 },
      ]},
      { name: "Samaipata", nameJa: "サマイパタ", lat: -18.18, lng: -63.87, subRegions: [] },
      { name: "Luribay Valley", nameJa: "ルリバイ渓谷", lat: -17.1, lng: -67.6, subRegions: [] },
      { name: "Sucre", nameJa: "スクレ", lat: -19.05, lng: -65.26, subRegions: [] },
    ],
  },
  {
    code: "PY", name: "Paraguay", nameJa: "パラグアイ", lat: -23.4, lng: -58.4,
    regions: [
      { name: "Itapúa", nameJa: "イタプア", lat: -27.1, lng: -55.9, subRegions: [
        { name: "Encarnación", nameJa: "エンカルナシオン", lat: -27.33, lng: -55.87 },
        { name: "Capitán Miranda", nameJa: "カピタン・ミランダ", lat: -27.43, lng: -55.83 },
      ]},
      { name: "Alto Paraná", nameJa: "アルト・パラナ", lat: -25.5, lng: -54.6, subRegions: [
        { name: "Ciudad del Este", nameJa: "シウダー・デル・エステ", lat: -25.51, lng: -54.62 },
      ]},
      { name: "Caaguazú", nameJa: "カアグアス", lat: -25.45, lng: -56.02, subRegions: [] },
    ],
  },
];

/** Get flat list of region names for a country (backward compatible) */
export function getRegionNames(country: WineCountry): string[] {
  return country.regions.map((r) => r.name);
}

/** Get sub-region names for a specific region */
export function getSubRegionNames(country: WineCountry, regionName: string): string[] {
  const region = country.regions.find((r) => r.name === regionName);
  return region?.subRegions.map((sr) => sr.name) ?? [];
}

/** Find a region object by name */
export function findRegion(country: WineCountry, regionName: string): WineRegion | undefined {
  return country.regions.find((r) => r.name === regionName);
}

export function getCountryByName(name: string): WineCountry | undefined {
  return WINE_COUNTRIES.find(
    (c) =>
      c.name.toLowerCase() === name.toLowerCase() ||
      c.nameJa === name ||
      c.code.toLowerCase() === name.toLowerCase()
  );
}

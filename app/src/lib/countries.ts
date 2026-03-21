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

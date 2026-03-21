/**
 * Grape variety master data - comprehensive list based on sommelier exam curricula.
 * Covers JSA (Japan Sommelier Association), WSET, CMS, and Master of Wine syllabi.
 * Canonical ID is the English name. Matching is case-insensitive
 * and checks all aliases (Japanese, common synonyms, regional names).
 */

export interface GrapeMaster {
  id: string;       // canonical English name (key)
  nameEn: string;
  nameJa: string;
  aliases: string[]; // all alternative spellings / languages
  isRed: boolean;
}

export const GRAPE_MASTER: GrapeMaster[] = [
  // ================================================================
  // RED VARIETIES
  // ================================================================

  // --- International / Major ---
  { id: "Cabernet Sauvignon", nameEn: "Cabernet Sauvignon", nameJa: "カベルネ・ソーヴィニヨン",
    aliases: ["カベルネソーヴィニヨン", "カベルネ ソーヴィニヨン", "Cab Sauv", "CS"], isRed: true },
  { id: "Merlot", nameEn: "Merlot", nameJa: "メルロー",
    aliases: ["メルロ", "Merlot Noir"], isRed: true },
  { id: "Pinot Noir", nameEn: "Pinot Noir", nameJa: "ピノ・ノワール",
    aliases: ["ピノノワール", "ピノ ノワール", "Spätburgunder", "Pinot Nero", "シュペートブルグンダー", "Blauburgunder"], isRed: true },
  { id: "Syrah", nameEn: "Syrah", nameJa: "シラー",
    aliases: ["Shiraz", "シラーズ", "Serine"], isRed: true },
  { id: "Grenache", nameEn: "Grenache", nameJa: "グルナッシュ",
    aliases: ["Garnacha", "ガルナッチャ", "Grenache Noir", "Cannonau", "カンノナウ", "Garnacha Tinta"], isRed: true },
  { id: "Cabernet Franc", nameEn: "Cabernet Franc", nameJa: "カベルネ・フラン",
    aliases: ["カベルネフラン", "カベルネ フラン", "Bouchet", "Breton"], isRed: true },
  { id: "Malbec", nameEn: "Malbec", nameJa: "マルベック",
    aliases: ["Côt", "Auxerrois", "コット", "コー"], isRed: true },
  { id: "Petit Verdot", nameEn: "Petit Verdot", nameJa: "プティ・ヴェルド",
    aliases: ["プティヴェルド", "Petite Verdot"], isRed: true },

  // --- France ---
  { id: "Gamay", nameEn: "Gamay", nameJa: "ガメイ",
    aliases: ["ガメ", "Gamay Noir", "Gamay Noir à Jus Blanc"], isRed: true },
  { id: "Mourvèdre", nameEn: "Mourvèdre", nameJa: "ムールヴェードル",
    aliases: ["Monastrell", "モナストレル", "Mataro", "マタロ"], isRed: true },
  { id: "Cinsault", nameEn: "Cinsault", nameJa: "サンソー",
    aliases: ["Cinsaut"], isRed: true },
  { id: "Carignan", nameEn: "Carignan", nameJa: "カリニャン",
    aliases: ["Cariñena", "Mazuelo", "カリニャーノ", "Carignano"], isRed: true },
  { id: "Poulsard", nameEn: "Poulsard", nameJa: "プルサール",
    aliases: ["Ploussard"], isRed: true },
  { id: "Trousseau", nameEn: "Trousseau", nameJa: "トゥルソー",
    aliases: ["Bastardo"], isRed: true },
  { id: "Mondeuse", nameEn: "Mondeuse", nameJa: "モンドゥーズ",
    aliases: ["Mondeuse Noire"], isRed: true },
  { id: "Négrette", nameEn: "Négrette", nameJa: "ネグレット",
    aliases: ["Negrette"], isRed: true },
  { id: "Fer Servadou", nameEn: "Fer Servadou", nameJa: "フェール・セルヴァドゥ",
    aliases: ["Fer", "Braucol", "Mansois"], isRed: true },
  { id: "Duras", nameEn: "Duras", nameJa: "デュラス",
    aliases: [], isRed: true },
  { id: "Tannat", nameEn: "Tannat", nameJa: "タナ",
    aliases: ["タナット"], isRed: true },
  { id: "Counoise", nameEn: "Counoise", nameJa: "クノワーズ",
    aliases: [], isRed: true },
  { id: "Vaccarèse", nameEn: "Vaccarèse", nameJa: "ヴァッカレーゼ",
    aliases: ["Vaccarese"], isRed: true },
  { id: "Muscardin", nameEn: "Muscardin", nameJa: "ミュスカルダン",
    aliases: [], isRed: true },
  { id: "Piquepoul Noir", nameEn: "Piquepoul Noir", nameJa: "ピクプール・ノワール",
    aliases: ["Picpoul Noir"], isRed: true },

  // --- Italy ---
  { id: "Sangiovese", nameEn: "Sangiovese", nameJa: "サンジョヴェーゼ",
    aliases: ["サンジョベーゼ", "Brunello", "Morellino", "Prugnolo Gentile", "Nielluccio"], isRed: true },
  { id: "Nebbiolo", nameEn: "Nebbiolo", nameJa: "ネッビオーロ",
    aliases: ["ネビオーロ", "Spanna", "Chiavennasca", "Picotener"], isRed: true },
  { id: "Barbera", nameEn: "Barbera", nameJa: "バルベーラ",
    aliases: ["バルベラ"], isRed: true },
  { id: "Dolcetto", nameEn: "Dolcetto", nameJa: "ドルチェット",
    aliases: [], isRed: true },
  { id: "Corvina", nameEn: "Corvina", nameJa: "コルヴィーナ",
    aliases: ["コルビーナ", "Corvina Veronese"], isRed: true },
  { id: "Rondinella", nameEn: "Rondinella", nameJa: "ロンディネッラ",
    aliases: [], isRed: true },
  { id: "Molinara", nameEn: "Molinara", nameJa: "モリナーラ",
    aliases: [], isRed: true },
  { id: "Nero d'Avola", nameEn: "Nero d'Avola", nameJa: "ネロ・ダーヴォラ",
    aliases: ["ネロダーヴォラ", "Calabrese"], isRed: true },
  { id: "Nerello Mascalese", nameEn: "Nerello Mascalese", nameJa: "ネレッロ・マスカレーゼ",
    aliases: ["ネレッロマスカレーゼ"], isRed: true },
  { id: "Nerello Cappuccio", nameEn: "Nerello Cappuccio", nameJa: "ネレッロ・カプッチョ",
    aliases: [], isRed: true },
  { id: "Aglianico", nameEn: "Aglianico", nameJa: "アリアニコ",
    aliases: ["アリアーニコ"], isRed: true },
  { id: "Montepulciano", nameEn: "Montepulciano", nameJa: "モンテプルチアーノ",
    aliases: [], isRed: true },
  { id: "Primitivo", nameEn: "Primitivo", nameJa: "プリミティーヴォ",
    aliases: ["プリミティーボ"], isRed: true },
  { id: "Zinfandel", nameEn: "Zinfandel", nameJa: "ジンファンデル",
    aliases: ["Tribidrag", "Crljenak Kaštelanski"], isRed: true },
  { id: "Sagrantino", nameEn: "Sagrantino", nameJa: "サグランティーノ",
    aliases: [], isRed: true },
  { id: "Lagrein", nameEn: "Lagrein", nameJa: "ラグレイン",
    aliases: [], isRed: true },
  { id: "Teroldego", nameEn: "Teroldego", nameJa: "テロルデゴ",
    aliases: ["Teroldego Rotaliano"], isRed: true },
  { id: "Schioppettino", nameEn: "Schioppettino", nameJa: "スキオペッティーノ",
    aliases: ["Ribolla Nera"], isRed: true },
  { id: "Refosco", nameEn: "Refosco", nameJa: "レフォスコ",
    aliases: ["Refosco dal Peduncolo Rosso"], isRed: true },
  { id: "Canaiolo", nameEn: "Canaiolo", nameJa: "カナイオーロ",
    aliases: ["Canaiolo Nero"], isRed: true },
  { id: "Colorino", nameEn: "Colorino", nameJa: "コロリーノ",
    aliases: [], isRed: true },
  { id: "Cesanese", nameEn: "Cesanese", nameJa: "チェザネーゼ",
    aliases: [], isRed: true },
  { id: "Gaglioppo", nameEn: "Gaglioppo", nameJa: "ガリオッポ",
    aliases: [], isRed: true },
  { id: "Negroamaro", nameEn: "Negroamaro", nameJa: "ネグロアマーロ",
    aliases: ["Negro Amaro"], isRed: true },
  { id: "Uva di Troia", nameEn: "Uva di Troia", nameJa: "ウーヴァ・ディ・トロイア",
    aliases: ["Nero di Troia"], isRed: true },
  { id: "Frappato", nameEn: "Frappato", nameJa: "フラッパート",
    aliases: [], isRed: true },
  { id: "Grignolino", nameEn: "Grignolino", nameJa: "グリニョリーノ",
    aliases: [], isRed: true },
  { id: "Freisa", nameEn: "Freisa", nameJa: "フレイザ",
    aliases: [], isRed: true },
  { id: "Ruché", nameEn: "Ruché", nameJa: "ルケ",
    aliases: ["Ruchè", "Ruche"], isRed: true },
  { id: "Bonarda", nameEn: "Bonarda", nameJa: "ボナルダ",
    aliases: ["Croatina"], isRed: true },

  // --- Spain ---
  { id: "Tempranillo", nameEn: "Tempranillo", nameJa: "テンプラニーリョ",
    aliases: ["Tinta Roriz", "Tinta de Toro", "Aragonez", "Cencibel", "ティンタ・ロリス", "Tinto Fino", "Ull de Llebre"], isRed: true },
  { id: "Graciano", nameEn: "Graciano", nameJa: "グラシアーノ",
    aliases: ["Morrastel"], isRed: true },
  { id: "Mazuelo", nameEn: "Mazuelo", nameJa: "マスエロ",
    aliases: [], isRed: true },
  { id: "Mencía", nameEn: "Mencía", nameJa: "メンシア",
    aliases: ["Mencia", "Jaen"], isRed: true },
  { id: "Bobal", nameEn: "Bobal", nameJa: "ボバル",
    aliases: [], isRed: true },
  { id: "Garnacha Tintorera", nameEn: "Garnacha Tintorera", nameJa: "ガルナッチャ・ティントレラ",
    aliases: ["Alicante Bouschet", "アリカンテ・ブーシェ"], isRed: true },

  // --- Portugal ---
  { id: "Touriga Nacional", nameEn: "Touriga Nacional", nameJa: "トゥリガ・ナシオナル",
    aliases: ["トゥーリガ・ナショナル", "Touriga"], isRed: true },
  { id: "Touriga Franca", nameEn: "Touriga Franca", nameJa: "トゥリガ・フランカ",
    aliases: ["Touriga Francesa"], isRed: true },
  { id: "Tinta Barroca", nameEn: "Tinta Barroca", nameJa: "ティンタ・バロッカ",
    aliases: [], isRed: true },
  { id: "Tinto Cão", nameEn: "Tinto Cão", nameJa: "ティント・カン",
    aliases: ["Tinto Cao"], isRed: true },
  { id: "Baga", nameEn: "Baga", nameJa: "バガ",
    aliases: [], isRed: true },
  { id: "Castelão", nameEn: "Castelão", nameJa: "カステラン",
    aliases: ["Castelao", "Periquita", "João de Santarém"], isRed: true },
  { id: "Trincadeira", nameEn: "Trincadeira", nameJa: "トリンカデイラ",
    aliases: ["Tinta Amarela"], isRed: true },
  { id: "Alfrocheiro", nameEn: "Alfrocheiro", nameJa: "アルフロシェイロ",
    aliases: [], isRed: true },

  // --- Germany / Austria ---
  { id: "Blaufränkisch", nameEn: "Blaufränkisch", nameJa: "ブラウフレンキッシュ",
    aliases: ["Blaufrankisch", "Lemberger", "Kékfrankos", "Frankovka"], isRed: true },
  { id: "Zweigelt", nameEn: "Zweigelt", nameJa: "ツヴァイゲルト",
    aliases: ["Rotburger"], isRed: true },
  { id: "St. Laurent", nameEn: "St. Laurent", nameJa: "ザンクト・ラウレント",
    aliases: ["Saint Laurent"], isRed: true },
  { id: "Dornfelder", nameEn: "Dornfelder", nameJa: "ドルンフェルダー",
    aliases: [], isRed: true },
  { id: "Trollinger", nameEn: "Trollinger", nameJa: "トロリンガー",
    aliases: ["Schiava", "Vernatsch", "スキアーヴァ"], isRed: true },

  // --- Greece ---
  { id: "Xinomavro", nameEn: "Xinomavro", nameJa: "クシノマヴロ",
    aliases: ["Xynomavro"], isRed: true },
  { id: "Agiorgitiko", nameEn: "Agiorgitiko", nameJa: "アギオルギティコ",
    aliases: ["St. George"], isRed: true },
  { id: "Mavrodaphne", nameEn: "Mavrodaphne", nameJa: "マヴロダフネ",
    aliases: ["Mavrodafni"], isRed: true },
  { id: "Limnio", nameEn: "Limnio", nameJa: "リムニオ",
    aliases: [], isRed: true },

  // --- Georgia ---
  { id: "Saperavi", nameEn: "Saperavi", nameJa: "サペラヴィ",
    aliases: [], isRed: true },

  // --- South Africa ---
  { id: "Pinotage", nameEn: "Pinotage", nameJa: "ピノタージュ",
    aliases: [], isRed: true },

  // --- Chile ---
  { id: "Carménère", nameEn: "Carménère", nameJa: "カルメネール",
    aliases: ["Carmenere", "カルメネーレ", "Grande Vidure"], isRed: true },
  { id: "País", nameEn: "País", nameJa: "パイス",
    aliases: ["Pais", "Listán Prieto", "Mission"], isRed: true },

  // --- Argentina ---
  { id: "Criolla Grande", nameEn: "Criolla Grande", nameJa: "クリオジャ・グランデ",
    aliases: [], isRed: true },

  // --- Croatia / Eastern Europe ---
  { id: "Plavac Mali", nameEn: "Plavac Mali", nameJa: "プラヴァツ・マリ",
    aliases: [], isRed: true },
  { id: "Kadarka", nameEn: "Kadarka", nameJa: "カダルカ",
    aliases: ["Gamza"], isRed: true },
  { id: "Feteasca Neagra", nameEn: "Feteasca Neagra", nameJa: "フェテアスカ・ネアグラ",
    aliases: [], isRed: true },
  { id: "Mavrud", nameEn: "Mavrud", nameJa: "マヴルッド",
    aliases: [], isRed: true },
  { id: "Prokupac", nameEn: "Prokupac", nameJa: "プロクパツ",
    aliases: [], isRed: true },

  // --- Lebanon ---
  { id: "Cinsault", nameEn: "Cinsault", nameJa: "サンソー",
    aliases: ["Cinsaut"], isRed: true },

  // --- Japan ---
  { id: "Muscat Bailey A", nameEn: "Muscat Bailey A", nameJa: "マスカット・ベーリーA",
    aliases: ["マスカットベーリーA", "MBA", "マスカット・ベイリーA"], isRed: true },
  { id: "Black Queen", nameEn: "Black Queen", nameJa: "ブラック・クイーン",
    aliases: ["ブラッククイーン"], isRed: true },
  { id: "Yama Sauvignon", nameEn: "Yama Sauvignon", nameJa: "ヤマ・ソーヴィニヨン",
    aliases: ["ヤマソーヴィニヨン"], isRed: true },

  // --- Other notable reds ---
  { id: "Petite Sirah", nameEn: "Petite Sirah", nameJa: "プティ・シラー",
    aliases: ["Durif", "Petite Syrah", "デュリフ"], isRed: true },
  { id: "Norton", nameEn: "Norton", nameJa: "ノートン",
    aliases: ["Cynthiana"], isRed: true },
  { id: "Chambourcin", nameEn: "Chambourcin", nameJa: "シャンブルサン",
    aliases: [], isRed: true },

  // ================================================================
  // WHITE VARIETIES
  // ================================================================

  // --- International / Major ---
  { id: "Chardonnay", nameEn: "Chardonnay", nameJa: "シャルドネ",
    aliases: ["Morillon"], isRed: false },
  { id: "Sauvignon Blanc", nameEn: "Sauvignon Blanc", nameJa: "ソーヴィニヨン・ブラン",
    aliases: ["ソーヴィニヨンブラン", "ソービニョンブラン", "Fumé Blanc", "フュメブラン"], isRed: false },
  { id: "Riesling", nameEn: "Riesling", nameJa: "リースリング",
    aliases: ["Rheinriesling", "Johannisberg Riesling"], isRed: false },
  { id: "Pinot Grigio", nameEn: "Pinot Grigio", nameJa: "ピノ・グリージョ",
    aliases: ["ピノグリージョ", "Pinot Gris", "ピノ・グリ", "ピノグリ", "Grauburgunder", "グラウブルグンダー", "Ruländer", "Tokay Pinot Gris"], isRed: false },
  { id: "Gewürztraminer", nameEn: "Gewürztraminer", nameJa: "ゲヴュルツトラミネール",
    aliases: ["Gewurztraminer", "ゲヴェルツトラミネール", "Traminer", "Traminer Aromatico"], isRed: false },
  { id: "Viognier", nameEn: "Viognier", nameJa: "ヴィオニエ",
    aliases: ["ビオニエ"], isRed: false },
  { id: "Sémillon", nameEn: "Sémillon", nameJa: "セミヨン",
    aliases: ["Semillon"], isRed: false },
  { id: "Muscat", nameEn: "Muscat", nameJa: "ミュスカ",
    aliases: ["Moscato", "モスカート", "Muscat Blanc", "Muscat Blanc à Petits Grains", "Moscatel", "マスカット", "Muskateller"], isRed: false },
  { id: "Pinot Blanc", nameEn: "Pinot Blanc", nameJa: "ピノ・ブラン",
    aliases: ["ピノブラン", "Weißburgunder", "Weissburgunder", "Pinot Bianco"], isRed: false },

  // --- France ---
  { id: "Chenin Blanc", nameEn: "Chenin Blanc", nameJa: "シュナン・ブラン",
    aliases: ["シュナンブラン", "Steen", "Pineau de la Loire"], isRed: false },
  { id: "Melon de Bourgogne", nameEn: "Melon de Bourgogne", nameJa: "ムロン・ド・ブルゴーニュ",
    aliases: ["Muscadet"], isRed: false },
  { id: "Marsanne", nameEn: "Marsanne", nameJa: "マルサンヌ",
    aliases: [], isRed: false },
  { id: "Roussanne", nameEn: "Roussanne", nameJa: "ルーサンヌ",
    aliases: [], isRed: false },
  { id: "Savagnin", nameEn: "Savagnin", nameJa: "サヴァニャン",
    aliases: ["Naturé"], isRed: false },
  { id: "Aligoté", nameEn: "Aligoté", nameJa: "アリゴテ",
    aliases: ["Aligote"], isRed: false },
  { id: "Clairette", nameEn: "Clairette", nameJa: "クレレット",
    aliases: ["Clairette Blanche"], isRed: false },
  { id: "Mauzac", nameEn: "Mauzac", nameJa: "モーザック",
    aliases: [], isRed: false },
  { id: "Ugni Blanc", nameEn: "Ugni Blanc", nameJa: "ユニ・ブラン",
    aliases: ["ユニブラン", "Saint-Émilion"], isRed: false },
  { id: "Colombard", nameEn: "Colombard", nameJa: "コロンバール",
    aliases: [], isRed: false },
  { id: "Picpoul", nameEn: "Picpoul", nameJa: "ピクプール",
    aliases: ["Piquepoul Blanc", "Picpoul de Pinet"], isRed: false },
  { id: "Gros Manseng", nameEn: "Gros Manseng", nameJa: "グロ・マンサン",
    aliases: ["グロマンサン"], isRed: false },
  { id: "Petit Manseng", nameEn: "Petit Manseng", nameJa: "プティ・マンサン",
    aliases: ["プティマンサン"], isRed: false },
  { id: "Len de l'El", nameEn: "Len de l'El", nameJa: "ラン・ド・レル",
    aliases: ["Loin de l'Oeil"], isRed: false },
  { id: "Petit Courbu", nameEn: "Petit Courbu", nameJa: "プティ・クルビュ",
    aliases: ["Courbu"], isRed: false },
  { id: "Jacquère", nameEn: "Jacquère", nameJa: "ジャケール",
    aliases: ["Jacquere"], isRed: false },
  { id: "Altesse", nameEn: "Altesse", nameJa: "アルテス",
    aliases: ["Roussette"], isRed: false },
  { id: "Muscadelle", nameEn: "Muscadelle", nameJa: "ミュスカデル",
    aliases: [], isRed: false },
  { id: "Rolle", nameEn: "Rolle", nameJa: "ロール",
    aliases: [], isRed: false },
  { id: "Bourboulenc", nameEn: "Bourboulenc", nameJa: "ブールブーラン",
    aliases: [], isRed: false },
  { id: "Grenache Blanc", nameEn: "Grenache Blanc", nameJa: "グルナッシュ・ブラン",
    aliases: ["Garnacha Blanca"], isRed: false },
  { id: "Pinot Meunier", nameEn: "Pinot Meunier", nameJa: "ピノ・ムニエ",
    aliases: ["ピノムニエ", "Meunier", "Schwarzriesling"], isRed: false },

  // --- Italy ---
  { id: "Trebbiano", nameEn: "Trebbiano", nameJa: "トレッビアーノ",
    aliases: ["Trebbiano Toscano", "Procanico"], isRed: false },
  { id: "Garganega", nameEn: "Garganega", nameJa: "ガルガネーガ",
    aliases: [], isRed: false },
  { id: "Glera", nameEn: "Glera", nameJa: "グレーラ",
    aliases: ["Prosecco"], isRed: false },
  { id: "Vermentino", nameEn: "Vermentino", nameJa: "ヴェルメンティーノ",
    aliases: [], isRed: false },
  { id: "Cortese", nameEn: "Cortese", nameJa: "コルテーゼ",
    aliases: [], isRed: false },
  { id: "Arneis", nameEn: "Arneis", nameJa: "アルネイス",
    aliases: [], isRed: false },
  { id: "Fiano", nameEn: "Fiano", nameJa: "フィアーノ",
    aliases: ["Fiano di Avellino"], isRed: false },
  { id: "Greco", nameEn: "Greco", nameJa: "グレーコ",
    aliases: ["Greco di Tufo"], isRed: false },
  { id: "Falanghina", nameEn: "Falanghina", nameJa: "ファランギーナ",
    aliases: [], isRed: false },
  { id: "Verdicchio", nameEn: "Verdicchio", nameJa: "ヴェルディッキオ",
    aliases: [], isRed: false },
  { id: "Pecorino", nameEn: "Pecorino", nameJa: "ペコリーノ",
    aliases: [], isRed: false },
  { id: "Grillo", nameEn: "Grillo", nameJa: "グリッロ",
    aliases: [], isRed: false },
  { id: "Catarratto", nameEn: "Catarratto", nameJa: "カタラット",
    aliases: [], isRed: false },
  { id: "Carricante", nameEn: "Carricante", nameJa: "カッリカンテ",
    aliases: [], isRed: false },
  { id: "Ribolla Gialla", nameEn: "Ribolla Gialla", nameJa: "リボッラ・ジャッラ",
    aliases: ["リボッラジャッラ", "Rebula"], isRed: false },
  { id: "Friulano", nameEn: "Friulano", nameJa: "フリウラーノ",
    aliases: ["Tocai Friulano", "Sauvignonasse"], isRed: false },
  { id: "Picolit", nameEn: "Picolit", nameJa: "ピコリット",
    aliases: [], isRed: false },
  { id: "Nascetta", nameEn: "Nascetta", nameJa: "ナシェッタ",
    aliases: [], isRed: false },
  { id: "Timorasso", nameEn: "Timorasso", nameJa: "ティモラッソ",
    aliases: [], isRed: false },
  { id: "Nosiola", nameEn: "Nosiola", nameJa: "ノジオラ",
    aliases: [], isRed: false },
  { id: "Coda di Volpe", nameEn: "Coda di Volpe", nameJa: "コーダ・ディ・ヴォルペ",
    aliases: [], isRed: false },
  { id: "Inzolia", nameEn: "Inzolia", nameJa: "インツォリア",
    aliases: ["Ansonica"], isRed: false },
  { id: "Muscat of Alexandria", nameEn: "Muscat of Alexandria", nameJa: "マスカット・オブ・アレキサンドリア",
    aliases: ["Zibibbo", "ジビッボ", "Muscat d'Alexandrie"], isRed: false },

  // --- Spain ---
  { id: "Albariño", nameEn: "Albariño", nameJa: "アルバリーニョ",
    aliases: ["Alvarinho", "Albarino"], isRed: false },
  { id: "Verdejo", nameEn: "Verdejo", nameJa: "ベルデホ",
    aliases: [], isRed: false },
  { id: "Viura", nameEn: "Viura", nameJa: "ビウラ",
    aliases: ["Macabeo", "Macabeu", "マカベオ"], isRed: false },
  { id: "Xarel·lo", nameEn: "Xarel·lo", nameJa: "チャレッロ",
    aliases: ["Xarello", "Xarel-lo"], isRed: false },
  { id: "Parellada", nameEn: "Parellada", nameJa: "パレリャーダ",
    aliases: [], isRed: false },
  { id: "Godello", nameEn: "Godello", nameJa: "ゴデーリョ",
    aliases: ["Gouveio"], isRed: false },
  { id: "Treixadura", nameEn: "Treixadura", nameJa: "トレイシャドゥーラ",
    aliases: [], isRed: false },
  { id: "Pedro Ximénez", nameEn: "Pedro Ximénez", nameJa: "ペドロ・ヒメネス",
    aliases: ["PX", "Pedro Ximenez", "ペドロヒメネス"], isRed: false },
  { id: "Palomino", nameEn: "Palomino", nameJa: "パロミノ",
    aliases: ["Palomino Fino", "Listán Blanco"], isRed: false },

  // --- Portugal ---
  { id: "Encruzado", nameEn: "Encruzado", nameJa: "エンクルザード",
    aliases: [], isRed: false },
  { id: "Arinto", nameEn: "Arinto", nameJa: "アリント",
    aliases: ["Pedernã"], isRed: false },
  { id: "Fernão Pires", nameEn: "Fernão Pires", nameJa: "フェルナン・ピレス",
    aliases: ["Fernao Pires", "Maria Gomes"], isRed: false },
  { id: "Loureiro", nameEn: "Loureiro", nameJa: "ロウレイロ",
    aliases: [], isRed: false },
  { id: "Avesso", nameEn: "Avesso", nameJa: "アヴェッソ",
    aliases: [], isRed: false },

  // --- Germany / Austria ---
  { id: "Müller-Thurgau", nameEn: "Müller-Thurgau", nameJa: "ミュラー・トゥルガウ",
    aliases: ["Muller-Thurgau", "Rivaner", "ミュラートゥルガウ"], isRed: false },
  { id: "Silvaner", nameEn: "Silvaner", nameJa: "シルヴァーナー",
    aliases: ["Sylvaner", "Grüner Silvaner"], isRed: false },
  { id: "Grüner Veltliner", nameEn: "Grüner Veltliner", nameJa: "グリューナー・フェルトリーナー",
    aliases: ["Gruner Veltliner", "グリューナーフェルトリーナー"], isRed: false },
  { id: "Scheurebe", nameEn: "Scheurebe", nameJa: "ショイレーベ",
    aliases: [], isRed: false },
  { id: "Kerner", nameEn: "Kerner", nameJa: "ケルナー",
    aliases: [], isRed: false },
  { id: "Bacchus", nameEn: "Bacchus", nameJa: "バッカス",
    aliases: [], isRed: false },
  { id: "Huxelrebe", nameEn: "Huxelrebe", nameJa: "フクセルレーベ",
    aliases: [], isRed: false },

  // --- Greece ---
  { id: "Assyrtiko", nameEn: "Assyrtiko", nameJa: "アシルティコ",
    aliases: ["Assyrtico"], isRed: false },
  { id: "Moschofilero", nameEn: "Moschofilero", nameJa: "モスコフィレロ",
    aliases: [], isRed: false },
  { id: "Malagousia", nameEn: "Malagousia", nameJa: "マラグジア",
    aliases: [], isRed: false },
  { id: "Roditis", nameEn: "Roditis", nameJa: "ロディティス",
    aliases: [], isRed: false },
  { id: "Vidiano", nameEn: "Vidiano", nameJa: "ヴィディアノ",
    aliases: [], isRed: false },

  // --- Georgia ---
  { id: "Rkatsiteli", nameEn: "Rkatsiteli", nameJa: "ルカツィテリ",
    aliases: [], isRed: false },
  { id: "Mtsvane", nameEn: "Mtsvane", nameJa: "ムツヴァネ",
    aliases: ["Mtsvane Kakhuri"], isRed: false },
  { id: "Kisi", nameEn: "Kisi", nameJa: "キシ",
    aliases: [], isRed: false },

  // --- Argentina ---
  { id: "Torrontés", nameEn: "Torrontés", nameJa: "トロンテス",
    aliases: ["Torrontes", "Torrontés Riojano"], isRed: false },

  // --- Hungary ---
  { id: "Furmint", nameEn: "Furmint", nameJa: "フルミント",
    aliases: [], isRed: false },
  { id: "Hárslevelű", nameEn: "Hárslevelű", nameJa: "ハールシュレヴェリュー",
    aliases: ["Harslevelu", "Lipovina"], isRed: false },
  { id: "Juhfark", nameEn: "Juhfark", nameJa: "ユフファルク",
    aliases: [], isRed: false },

  // --- Eastern Europe ---
  { id: "Feteasca Alba", nameEn: "Feteasca Alba", nameJa: "フェテアスカ・アルバ",
    aliases: [], isRed: false },
  { id: "Feteasca Regala", nameEn: "Feteasca Regala", nameJa: "フェテアスカ・レガーラ",
    aliases: [], isRed: false },
  { id: "Welschriesling", nameEn: "Welschriesling", nameJa: "ヴェルシュリースリング",
    aliases: ["Olaszrizling", "Riesling Italico", "Laški Rizling"], isRed: false },

  // --- Japan ---
  { id: "Koshu", nameEn: "Koshu", nameJa: "甲州",
    aliases: ["コシュウ", "コシュー"], isRed: false },
  { id: "Delaware", nameEn: "Delaware", nameJa: "デラウェア",
    aliases: ["デラウエア"], isRed: false },
  { id: "Niagara", nameEn: "Niagara", nameJa: "ナイアガラ",
    aliases: [], isRed: false },

  // --- Other notable whites ---
  { id: "Muscat of Hamburg", nameEn: "Muscat of Hamburg", nameJa: "マスカット・ハンブルグ",
    aliases: ["Black Muscat"], isRed: false },
  { id: "Seyval Blanc", nameEn: "Seyval Blanc", nameJa: "セイヴァル・ブラン",
    aliases: [], isRed: false },
];

// Build lookup index (case-insensitive)
const lookupIndex = new Map<string, string>();

for (const g of GRAPE_MASTER) {
  const addKey = (key: string) => lookupIndex.set(key.toLowerCase(), g.id);
  addKey(g.id);
  addKey(g.nameEn);
  addKey(g.nameJa);
  for (const alias of g.aliases) {
    addKey(alias);
  }
}

/**
 * Normalize a grape name to canonical ID.
 * Matches English name, Japanese name, and all aliases (case-insensitive).
 * Returns the canonical ID or null if not found.
 */
export function normalizeGrape(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Exact match (case-insensitive)
  const exact = lookupIndex.get(trimmed.toLowerCase());
  if (exact) return exact;

  // Try removing common separator differences (・, space, hyphen, dot)
  const normalized = trimmed
    .replace(/[・\s\-\.]+/g, "")
    .toLowerCase();
  for (const [key, id] of lookupIndex) {
    if (key.replace(/[・\s\-\.]+/g, "") === normalized) {
      return id;
    }
  }

  return null;
}

/**
 * Normalize a list of grape names, dedup by canonical ID.
 * Returns array of canonical IDs (or original string if not found in master).
 */
export function normalizeGrapes(inputs: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const input of inputs) {
    const id = normalizeGrape(input);
    const key = id || input.trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      result.push(key);
    }
  }
  return result;
}

/**
 * Get grape master entry by any name/alias.
 */
export function findGrape(input: string): GrapeMaster | undefined {
  const id = normalizeGrape(input);
  if (!id) return undefined;
  return GRAPE_MASTER.find((g) => g.id === id);
}

/**
 * Get display name for a grape (Japanese + English).
 */
export function getGrapeDisplayName(input: string): string {
  const grape = findGrape(input);
  if (!grape) return input;
  return `${grape.nameJa}（${grape.nameEn}）`;
}

/**
 * Get all grape names for autocomplete suggestions.
 * Returns array of { id, label } where label is "日本語名 (English Name)"
 */
export function getGrapeSuggestions(): { id: string; label: string }[] {
  return GRAPE_MASTER.map((g) => ({
    id: g.id,
    label: `${g.nameJa}（${g.nameEn}）`,
  }));
}

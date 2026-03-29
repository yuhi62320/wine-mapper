const fs = require("fs");
const path = require("path");

// ============================================================
// 1. Predefined aroma list (all valid Japanese aroma names)
// ============================================================
const VALID_AROMAS = [
  "レモン", "ライム", "グレープフルーツ", "オレンジ", "柚子",
  "青りんご", "赤りんご", "洋梨", "マルメロ",
  "桃", "杏", "ネクタリン", "プラム",
  "パイナップル", "マンゴー", "パッションフルーツ", "ライチ", "バナナ", "メロン",
  "イチゴ", "ラズベリー", "さくらんぼ", "クランベリー", "ザクロ",
  "ブラックベリー", "カシス", "ブルーベリー", "ブラックプラム",
  "レーズン", "イチジク", "デーツ", "プルーン",
  "ジャスミン", "オレンジの花", "スイカズラ", "アカシア", "エルダーフラワー",
  "バラ", "スミレ", "シャクヤク", "ラベンダー", "ハイビスカス",
  "ミント", "バジル", "タイム", "ローズマリー", "紫蘇",
  "刈りたての草", "ピーマン", "ユーカリ", "グリーンオリーブ",
  "干し草", "紅茶", "タバコ",
  "バニラ", "シナモン", "クローブ", "ナツメグ", "アニス", "リコリス",
  "黒胡椒", "白胡椒", "ショウガ", "山椒",
  "濡れた石", "火打ち石", "スレート", "チョーク", "海塩",
  "森の土", "キノコ", "トリュフ", "濡れた土",
  "オーク", "シダー", "白檀",
  "スモーク", "トースト", "コーヒー", "炭",
  "アーモンド", "ヘーゼルナッツ", "クルミ",
  "蜂蜜", "キャラメル", "チョコレート", "バター", "バタースコッチ",
  "ブリオッシュ", "ビスケット", "パン生地",
  "クリーム", "ヨーグルト",
  "なめし革", "ジビエ",
  "醤油", "出汁", "海苔", "シャルキュトリ",
];

const validSet = new Set(VALID_AROMAS);

// ============================================================
// 2. Explicit mapping table: variation -> canonical aroma
// ============================================================
const EXPLICIT_MAP = {
  // Previously dropped items
  "ジンジャー": "ショウガ",
  "ラズベリージャム": "ラズベリー",
  "エルダーベリー": "ブラックベリー",
  "オレガノ": "タイム",
  "イチゴキャンディ": "イチゴ",
  "インク": "ブラックベリー",
  "レンズ豆": "濡れた土",
  "カシスの芽": "カシス",
  // Cherry variants
  "チェリー": "さくらんぼ",
  "ダークチェリー": "さくらんぼ",
  "レッドチェリー": "さくらんぼ",
  "サワーチェリー": "さくらんぼ",
  "ブラックチェリー": "さくらんぼ",

  // Currant / berry variants
  "赤すぐり": "クランベリー",
  "赤スグリ": "クランベリー",
  "レッドカラント": "クランベリー",
  "黒すぐり": "カシス",
  "黒すぐりの実": "カシス",

  // Pepper variants
  "黒コショウ": "黒胡椒",
  "黒こしょう": "黒胡椒",
  "白コショウ": "白胡椒",
  "ペッパー": "白胡椒",
  "胡椒": "黒胡椒",

  // Stone fruit
  "アプリコット": "杏",
  "ドライアプリコット": "杏",
  "ピーチ": "桃",
  "白桃": "桃",

  // Flower variants
  "バイオレット": "スミレ",
  "花": "ジャスミン",
  "フローラル": "ジャスミン",
  "白い花": "ジャスミン",
  "赤い花": "バラ",
  "花の香り": "ジャスミン",

  // Herb variants
  "ハーブ": "タイム",
  "地中海ハーブ": "タイム",
  "野生的なハーブ": "タイム",

  // Spice generic
  "スパイス": "シナモン",

  // Leather variants
  "革": "なめし革",
  "レザー": "なめし革",
  "皮革": "なめし革",

  // Strawberry / Raspberry
  "ストロベリー": "イチゴ",
  "フランボワーズ": "ラズベリー",

  // Nut generic
  "ナッツ": "アーモンド",

  // Citrus generic
  "柑橘": "レモン",
  "柑橘類": "レモン",
  "シトラス": "レモン",

  // Tropical generic
  "トロピカルフルーツ": "パッションフルーツ",
  "エキゾチックフルーツ": "パッションフルーツ",

  // Red / black fruit generic
  "赤い果実": "ラズベリー",
  "赤いベリー": "ラズベリー",
  "黒い果実": "ブラックベリー",
  "黒いベリー": "ブラックベリー",
  "黒ベリー": "ブラックベリー",

  // Earth
  "土": "濡れた土",
  "湿った土": "濡れた土",

  // Mineral
  "火打石": "火打ち石",
  "ミネラル": "濡れた石",

  // Tea
  "ハーブティー": "紅茶",

  // Chocolate / cocoa
  "ココア": "チョコレート",
  "モカ": "チョコレート",
  "ダークチョコレート": "チョコレート",

  // Candy / sweet
  "コットンキャンディ": "キャラメル",
  "綿あめ": "キャラメル",
  "キャンディ": "キャラメル",

  // Honey variants
  "蜜蝋": "蜂蜜",
  "糖蜜": "蜂蜜",
  "ハチミツ": "蜂蜜",

  // Dried fruit
  "ドライフルーツ": "プルーン",
  "ドライプラム": "プルーン",

  // Carbon / graphite
  "タール": "炭",
  "グラファイト": "炭",
  "鉛筆の芯": "炭",

  // Wood
  "杉": "シダー",
  "杉木": "シダー",

  // Orange peel
  "オレンジの皮": "オレンジ",
  "オレンジピール": "オレンジ",
  "マーマレード": "オレンジ",

  // Herb specifics
  "月桂樹": "ローズマリー",
  "ローリエ": "ローズマリー",
  "セージ": "タイム",
  "サジュ": "タイム",

  // Rose variants
  "ローズ": "バラ",
  "野バラ": "バラ",

  // Lavender variants
  "ライラック": "ラベンダー",
  "菩提樹の花": "ラベンダー",
  "ドライフラワー": "ラベンダー",

  // Plum
  "梅": "プラム",

  // Grass
  "青草": "刈りたての草",
  "新緑": "刈りたての草",

  // Apple variants
  "グリーンアップル": "青りんご",
  "青いリンゴ": "青りんご",
  "青リンゴ": "青りんご",
  "リンゴ": "赤りんご",
  "りんご": "赤りんご",

  // Petrol
  "ペトロール": "火打ち石",

  // Yeast / bread
  "イースト": "パン生地",

  // Grape / muscat
  "マスカット": "ライチ",
  "ブドウ": "ライチ",

  // Blood orange
  "血のオレンジ": "オレンジ",

  // Sea / salt
  "潮風": "海塩",
  "塩味": "海塩",
  "塩辛さ": "海塩",

  // Iron / mineral
  "鉄": "濡れた石",
  "鉱物質": "濡れた石",

  // Volcanic
  "火山灰": "スレート",
  "岩バラ": "スレート",

  // Juniper
  "ジュニパー": "ローズマリー",

  // Saffron / curry
  "サフラン": "ナツメグ",
  "カレースパイス": "ナツメグ",

  // Fennel
  "フェンネル": "アニス",

  // Marzipan
  "マジパン": "アーモンド",
  "アマレッティ": "アーモンド",

  // Balsamic
  "バルサミコ": "プルーン",

  // Musk / lanolin
  "ムスク": "なめし革",
  "ラノリン": "なめし革",

  // Olive
  "黒オリーブ": "グリーンオリーブ",
  "オリーブ": "グリーンオリーブ",

  // Bell pepper / green pepper / tomato
  "赤ピーマン": "ピーマン",
  "グリーンペッパー": "ピーマン",
  "トマト": "ピーマン",
  "トマトリーフ": "ピーマン",

  // Sour / wild fruit
  "酸味のある果実": "クランベリー",
  "野生の果実": "クランベリー",

  // Licorice
  "甘草": "リコリス",

  // Flour
  "小麦粉": "パン生地",

  // Chamomile
  "カモミール": "ジャスミン",

  // Quince
  "カリン": "マルメロ",

  // Geranium
  "ゲラニウム": "バラ",

  // Lemon peel
  "レモンの皮": "レモン",
};

// ============================================================
// 3. Fuzzy matching: patterns to catch compound/descriptive aromas
// ============================================================
const FUZZY_PATTERNS = [
  // Patterns with parenthetical content: extract individual items
  // e.g. "赤いベリー（イチゴ、ラズベリー）" -> try each part
  // e.g. "スパイス（白コショウ、シナモン）" -> try each part

  // Salt-related
  { regex: /塩辛/, result: "海塩" },
  { regex: /海塩/, result: "海塩" },
  { regex: /海風/, result: "海塩" },
  { regex: /塩味/, result: "海塩" },

  // Mineral-related
  { regex: /ミネラル/, result: "濡れた石" },
  { regex: /鉱物/, result: "濡れた石" },
  { regex: /石灰/, result: "チョーク" },

  // Leather-related
  { regex: /革/, result: "なめし革" },

  // Herb-related
  { regex: /ガリ[グーク]/, result: "タイム" },  // garrigue
  { regex: /ハーブ/, result: "タイム" },

  // Flower-related
  { regex: /花/, result: "ジャスミン" },
  { regex: /フローラル/, result: "ジャスミン" },

  // Spice-related
  { regex: /スパイス/, result: "シナモン" },
  { regex: /コショウ/, result: "黒胡椒" },
  { regex: /こしょう/, result: "黒胡椒" },
  { regex: /胡椒/, result: "黒胡椒" },
  { regex: /ペッパー/, result: "黒胡椒" },

  // Fruit categories
  { regex: /赤い果実/, result: "ラズベリー" },
  { regex: /赤いベリー/, result: "ラズベリー" },
  { regex: /黒い果実/, result: "ブラックベリー" },
  { regex: /黒いベリー/, result: "ブラックベリー" },
  { regex: /黒ベリー/, result: "ブラックベリー" },

  // Cherry-related
  { regex: /チェリー/, result: "さくらんぼ" },
  { regex: /キルシュ/, result: "さくらんぼ" },

  // Chocolate-related
  { regex: /チョコ/, result: "チョコレート" },
  { regex: /ココア/, result: "チョコレート" },
  { regex: /モカ/, result: "チョコレート" },

  // Earth-related
  { regex: /土/, result: "濡れた土" },
  { regex: /森林/, result: "森の土" },

  // Smoke-related
  { regex: /スモーク/, result: "スモーク" },
  { regex: /燻/, result: "スモーク" },

  // Tar
  { regex: /タール/, result: "炭" },

  // Cedar
  { regex: /杉/, result: "シダー" },

  // Olive
  { regex: /オリーブ/, result: "グリーンオリーブ" },

  // Meat / wild
  { regex: /肉/, result: "ジビエ" },
  { regex: /野生的/, result: "ジビエ" },
  { regex: /ジビエ/, result: "ジビエ" },

  // Honey
  { regex: /蜜/, result: "蜂蜜" },
  { regex: /ハチミツ/, result: "蜂蜜" },

  // Dried fruit
  { regex: /ドライ/, result: "プルーン" },

  // Orange
  { regex: /オレンジ/, result: "オレンジ" },

  // Lemon
  { regex: /レモン/, result: "レモン" },

  // Nut
  { regex: /ナッツ/, result: "アーモンド" },
  { regex: /アーモンド/, result: "アーモンド" },

  // Tobacco / barrel
  { regex: /タバコ/, result: "タバコ" },
  { regex: /樽/, result: "オーク" },

  // Caramel
  { regex: /キャラメル/, result: "キャラメル" },

  // Iron
  { regex: /鉄/, result: "濡れた石" },

  // Fireflint
  { regex: /火打/, result: "火打ち石" },

  // Grilled / roast
  { regex: /焦/, result: "トースト" },
  { regex: /トースト/, result: "トースト" },

  // Vanilla
  { regex: /バニラ/, result: "バニラ" },
];

// ============================================================
// 4. Map a single aroma string to a valid aroma (or null)
// ============================================================
function mapSingleAroma(aromaStr) {
  const trimmed = aromaStr.trim();

  // Direct match in valid set
  if (validSet.has(trimmed)) {
    return [trimmed];
  }

  // Explicit mapping
  if (EXPLICIT_MAP[trimmed]) {
    return [EXPLICIT_MAP[trimmed]];
  }

  // Handle parenthetical content: "赤いベリー（イチゴ、ラズベリー）"
  const parenMatch = trimmed.match(/(.+?)[（(](.+?)[）)]/);
  if (parenMatch) {
    const results = [];
    const outer = parenMatch[1].trim();
    const inner = parenMatch[2];

    // Try to map items inside parentheses
    const innerItems = inner.split(/[、,]/);
    for (const item of innerItems) {
      const mapped = mapSingleAroma(item.trim());
      if (mapped) results.push(...mapped);
    }

    // If inner items yielded results, use them; otherwise try the outer part
    if (results.length > 0) return results;

    const outerMapped = mapSingleAroma(outer);
    if (outerMapped) return outerMapped;
  }

  // Handle comma-separated: "ミネラル、火打ち石"
  if (/[、,]/.test(trimmed) && !parenMatch) {
    const parts = trimmed.split(/[、,]/);
    const results = [];
    for (const part of parts) {
      const mapped = mapSingleAroma(part.trim());
      if (mapped) results.push(...mapped);
    }
    if (results.length > 0) return results;
  }

  // Fuzzy pattern matching
  for (const { regex, result } of FUZZY_PATTERNS) {
    if (regex.test(trimmed)) {
      return [result];
    }
  }

  // No match found
  return null;
}

// ============================================================
// 5. Main processing
// ============================================================
function main() {
  const inputPath = path.join(__dirname, "grape_aromas.json");
  const outputPath = path.join(__dirname, "grape_aromas_fixed.json");

  const grapes = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  const results = [];
  let totalOriginal = 0;
  let totalMapped = 0;
  let totalDropped = 0;
  const allDropped = [];

  for (const grape of grapes) {
    const { id, name_en, typical_aromas } = grape;
    const mapped = [];
    const dropped = [];

    for (const aroma of typical_aromas) {
      const result = mapSingleAroma(aroma);
      if (result) {
        mapped.push(...result);
      } else {
        dropped.push(aroma);
      }
    }

    // Deduplicate and limit to 8
    const unique = [...new Set(mapped)];
    const limited = unique.slice(0, 8);

    totalOriginal += typical_aromas.length;
    totalMapped += limited.length;
    totalDropped += dropped.length;
    if (dropped.length > 0) {
      allDropped.push({ name_en, dropped });
    }

    // Console output for each grape
    console.log(`\n--- ${name_en} ---`);
    console.log(`  Original (${typical_aromas.length}): ${typical_aromas.join(", ")}`);
    console.log(`  Mapped   (${limited.length}): ${limited.join(", ")}`);
    if (dropped.length > 0) {
      console.log(`  Dropped  (${dropped.length}): ${dropped.join(", ")}`);
    }

    results.push({
      id,
      typical_aromas_new: limited,
    });
  }

  // Summary
  console.log("\n========================================");
  console.log("SUMMARY");
  console.log("========================================");
  console.log(`Total grapes: ${grapes.length}`);
  console.log(`Total original aromas: ${totalOriginal}`);
  console.log(`Total mapped aromas: ${totalMapped}`);
  console.log(`Total dropped aromas: ${totalDropped}`);

  if (allDropped.length > 0) {
    console.log("\nDropped aromas by grape:");
    for (const { name_en, dropped } of allDropped) {
      console.log(`  ${name_en}: ${dropped.join(", ")}`);
    }
  }

  // Write output
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nOutput written to: ${outputPath}`);
}

main();

// Aroma descriptor to image mapping
// Uses local images in /aromas/ directory (80x80 PNG)
// Mapping: Japanese aroma name -> { emoji, imageUrl }

export interface AromaVisual {
  emoji: string;
  imageUrl: string;
}

// Per-descriptor image and emoji mapping
const AROMA_VISUALS: Record<string, AromaVisual> = {
  // === Fruit - Citrus ===
  "レモン": { emoji: "🍋", imageUrl: "/aromas/lemon.png" },
  "ライム": { emoji: "🍈", imageUrl: "/aromas/lime.png" },
  "グレープフルーツ": { emoji: "🍊", imageUrl: "/aromas/grapefruit.png" },
  "オレンジ": { emoji: "🍊", imageUrl: "/aromas/orange.png" },
  "柚子": { emoji: "🟡", imageUrl: "/aromas/yuzu.png" },

  // === Fruit - Tree Fruit ===
  "青りんご": { emoji: "🍏", imageUrl: "/aromas/green_apple.png" },
  "赤りんご": { emoji: "🍎", imageUrl: "/aromas/red_apple.png" },
  "洋梨": { emoji: "🍐", imageUrl: "/aromas/pear.png" },
  "マルメロ": { emoji: "🍐", imageUrl: "/aromas/quince.png" },

  // === Fruit - Stone Fruit ===
  "桃": { emoji: "🍑", imageUrl: "/aromas/peach.png" },
  "杏": { emoji: "🍑", imageUrl: "/aromas/apricot.png" },
  "ネクタリン": { emoji: "🍑", imageUrl: "/aromas/nectarine.png" },
  "プラム": { emoji: "🫐", imageUrl: "/aromas/plum.png" },

  // === Fruit - Tropical ===
  "パイナップル": { emoji: "🍍", imageUrl: "/aromas/pineapple.png" },
  "マンゴー": { emoji: "🥭", imageUrl: "/aromas/mango.png" },
  "パッションフルーツ": { emoji: "🥝", imageUrl: "/aromas/passion_fruit.png" },
  "ライチ": { emoji: "🔴", imageUrl: "/aromas/lychee.png" },
  "バナナ": { emoji: "🍌", imageUrl: "/aromas/banana.png" },
  "メロン": { emoji: "🍈", imageUrl: "/aromas/melon.png" },

  // === Fruit - Red ===
  "イチゴ": { emoji: "🍓", imageUrl: "/aromas/strawberry.png" },
  "ラズベリー": { emoji: "🫐", imageUrl: "/aromas/raspberry.png" },
  "さくらんぼ": { emoji: "🍒", imageUrl: "/aromas/cherry.png" },
  "ダークチェリー": { emoji: "🍒", imageUrl: "" },
  "クランベリー": { emoji: "🔴", imageUrl: "/aromas/cranberry.png" },
  "ザクロ": { emoji: "🔴", imageUrl: "/aromas/pomegranate.png" },

  // === Fruit - Black ===
  "ブラックベリー": { emoji: "🫐", imageUrl: "/aromas/blackberry.png" },
  "ブラックチェリー": { emoji: "🍒", imageUrl: "" },
  "カシス": { emoji: "🫐", imageUrl: "/aromas/blackcurrant.png" },
  "ブルーベリー": { emoji: "🫐", imageUrl: "/aromas/blueberry.png" },
  "ブラックプラム": { emoji: "🟣", imageUrl: "/aromas/black_plum.png" },

  // === Fruit - Dried ===
  "レーズン": { emoji: "🍇", imageUrl: "/aromas/raisin.png" },
  "イチジク": { emoji: "🟤", imageUrl: "/aromas/fig.png" },
  "デーツ": { emoji: "🟤", imageUrl: "/aromas/date.png" },
  "プルーン": { emoji: "🟣", imageUrl: "/aromas/prune.png" },

  // === Floral - White ===
  "ジャスミン": { emoji: "🤍", imageUrl: "/aromas/jasmine.png" },
  "オレンジの花": { emoji: "🌸", imageUrl: "/aromas/orange_blossom.png" },
  "スイカズラ": { emoji: "🌼", imageUrl: "/aromas/honeysuckle.png" },
  "アカシア": { emoji: "🌼", imageUrl: "/aromas/acacia.png" },
  "エルダーフラワー": { emoji: "🌿", imageUrl: "/aromas/elderflower.png" },

  // === Floral - Red ===
  "バラ": { emoji: "🌹", imageUrl: "/aromas/rose.png" },
  "スミレ": { emoji: "🟣", imageUrl: "/aromas/violet.png" },
  "シャクヤク": { emoji: "🌺", imageUrl: "/aromas/peony.png" },
  "ラベンダー": { emoji: "💜", imageUrl: "/aromas/lavender.png" },
  "ハイビスカス": { emoji: "🌺", imageUrl: "/aromas/hibiscus.png" },

  // === Herbal - Fresh ===
  "ミント": { emoji: "🌿", imageUrl: "/aromas/mint.png" },
  "バジル": { emoji: "🌿", imageUrl: "/aromas/basil.png" },
  "タイム": { emoji: "🌿", imageUrl: "/aromas/thyme.png" },
  "ローズマリー": { emoji: "🌿", imageUrl: "/aromas/rosemary.png" },
  "紫蘇": { emoji: "🌿", imageUrl: "/aromas/shiso.png" },

  // === Herbal - Green ===
  "刈りたての草": { emoji: "🌱", imageUrl: "/aromas/fresh_cut_grass.png" },
  "ピーマン": { emoji: "🫑", imageUrl: "/aromas/green_bell_pepper.png" },
  "ユーカリ": { emoji: "🌿", imageUrl: "/aromas/eucalyptus.png" },
  "グリーンオリーブ": { emoji: "🫒", imageUrl: "/aromas/green_olive.png" },

  // === Herbal - Dried ===
  "干し草": { emoji: "🌾", imageUrl: "/aromas/hay.png" },
  "紅茶": { emoji: "🍵", imageUrl: "/aromas/black_tea.png" },
  "タバコ": { emoji: "🍂", imageUrl: "/aromas/tobacco.png" },
  "腐葉土": { emoji: "🍂", imageUrl: "" },
  "ドライハーブ": { emoji: "🌿", imageUrl: "" },
  "セージ": { emoji: "🌿", imageUrl: "" },
  "ローリエ": { emoji: "🌿", imageUrl: "" },
  "フェンネル": { emoji: "🌿", imageUrl: "" },

  // === Spice - Sweet ===
  "バニラ": { emoji: "🍦", imageUrl: "/aromas/vanilla.png" },
  "シナモン": { emoji: "🟤", imageUrl: "/aromas/cinnamon.png" },
  "クローブ": { emoji: "🟤", imageUrl: "/aromas/clove.png" },
  "ナツメグ": { emoji: "🟤", imageUrl: "/aromas/nutmeg.png" },
  "アニス": { emoji: "⭐", imageUrl: "/aromas/anise.png" },
  "リコリス": { emoji: "🖤", imageUrl: "/aromas/licorice.png" },

  // === Spice - Pungent ===
  "黒胡椒": { emoji: "🌶️", imageUrl: "/aromas/black_pepper.png" },
  "白胡椒": { emoji: "⚪", imageUrl: "/aromas/white_pepper.png" },
  "ショウガ": { emoji: "🫚", imageUrl: "/aromas/ginger.png" },
  "山椒": { emoji: "🌿", imageUrl: "/aromas/sansho_pepper.png" },

  // === Earth / Mineral ===
  "グラファイト": { emoji: "✏️", imageUrl: "" },
  "濡れた石": { emoji: "🪨", imageUrl: "/aromas/wet_stone.png" },
  "火打ち石": { emoji: "🪨", imageUrl: "/aromas/flint.png" },
  "スレート": { emoji: "🪨", imageUrl: "/aromas/slate.png" },
  "チョーク": { emoji: "⬜", imageUrl: "/aromas/chalk.png" },
  "海塩": { emoji: "🧂", imageUrl: "/aromas/sea_salt.png" },
  "森の土": { emoji: "🌲", imageUrl: "/aromas/forest_soil.png" },
  "キノコ": { emoji: "🍄", imageUrl: "/aromas/mushroom.png" },
  "トリュフ": { emoji: "🟤", imageUrl: "/aromas/truffle.png" },
  "濡れた土": { emoji: "🟫", imageUrl: "/aromas/wet_earth.png" },

  // === Wood / Oak ===
  "オーク": { emoji: "🪵", imageUrl: "/aromas/oak.png" },
  "シダー": { emoji: "🌲", imageUrl: "/aromas/cedar.png" },
  "杉": { emoji: "🌲", imageUrl: "" },
  "白檀": { emoji: "🪵", imageUrl: "/aromas/sandalwood.png" },
  "スモーク": { emoji: "💨", imageUrl: "/aromas/smoke.png" },
  "トースト": { emoji: "🍞", imageUrl: "/aromas/toast.png" },
  "コーヒー": { emoji: "☕", imageUrl: "/aromas/coffee.png" },
  "モカ": { emoji: "☕", imageUrl: "" },
  "炭": { emoji: "🖤", imageUrl: "/aromas/charcoal.png" },
  "タール": { emoji: "🖤", imageUrl: "" },

  // === Nutty / Sweet ===
  "アーモンド": { emoji: "🥜", imageUrl: "/aromas/almond.png" },
  "ヘーゼルナッツ": { emoji: "🌰", imageUrl: "/aromas/hazelnut.png" },
  "クルミ": { emoji: "🥜", imageUrl: "/aromas/walnut.png" },
  "蜂蜜": { emoji: "🍯", imageUrl: "/aromas/honey.png" },
  "キャラメル": { emoji: "🍬", imageUrl: "/aromas/caramel.png" },
  "チョコレート": { emoji: "🍫", imageUrl: "/aromas/chocolate.png" },
  "ダークチョコレート": { emoji: "🍫", imageUrl: "" },
  "ビターチョコレート": { emoji: "🍫", imageUrl: "" },
  "カカオ": { emoji: "🍫", imageUrl: "" },
  "バター": { emoji: "🧈", imageUrl: "/aromas/butter.png" },
  "バタースコッチ": { emoji: "🍬", imageUrl: "/aromas/butterscotch.png" },

  // === Dairy / Yeast ===
  "ブリオッシュ": { emoji: "🥐", imageUrl: "/aromas/brioche.png" },
  "ビスケット": { emoji: "🍪", imageUrl: "/aromas/biscuit.png" },
  "パン生地": { emoji: "🍞", imageUrl: "/aromas/bread_dough.png" },
  "クリーム": { emoji: "🥛", imageUrl: "/aromas/cream.png" },
  "ヨーグルト": { emoji: "🥛", imageUrl: "/aromas/yogurt.png" },

  // === Savory ===
  "なめし革": { emoji: "🟤", imageUrl: "/aromas/leather.png" },
  "ジビエ": { emoji: "🥩", imageUrl: "/aromas/game_meat.png" },
  "醤油": { emoji: "🫘", imageUrl: "/aromas/soy_sauce.png" },
  "出汁": { emoji: "🍲", imageUrl: "/aromas/dashi.png" },
  "海苔": { emoji: "🟢", imageUrl: "/aromas/nori.png" },
  "シャルキュトリ": { emoji: "🥩", imageUrl: "/aromas/charcuterie.png" },

  // === Additional common descriptors (AI-generated aromas fallback) ===
  "鉄": { emoji: "⚙️", imageUrl: "" },
  "血": { emoji: "🔴", imageUrl: "" },
  "すみれ": { emoji: "🟣", imageUrl: "" },
  "白い花": { emoji: "🤍", imageUrl: "" },
  "赤い花": { emoji: "🌹", imageUrl: "" },
  "柑橘": { emoji: "🍊", imageUrl: "" },
  "ドライフルーツ": { emoji: "🍇", imageUrl: "" },
  "スパイス": { emoji: "🌶️", imageUrl: "" },
  "ミネラル": { emoji: "🪨", imageUrl: "" },
  "黒系果実": { emoji: "🫐", imageUrl: "" },
  "赤系果実": { emoji: "🍓", imageUrl: "" },
  "ナッツ": { emoji: "🥜", imageUrl: "" },
  "ハーブ": { emoji: "🌿", imageUrl: "" },
  "鉛筆の芯": { emoji: "✏️", imageUrl: "" },
};

export function getAromaVisual(aromaJa: string): AromaVisual {
  return AROMA_VISUALS[aromaJa] || { emoji: "🍷", imageUrl: "" };
}

// Copyright notice (images are custom-generated, no external attribution needed)
export const AROMA_IMAGE_COPYRIGHT = "";

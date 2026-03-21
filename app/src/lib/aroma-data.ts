import { AromaCategory } from "./types";

export const AROMA_DATA: AromaCategory[] = [
  {
    name: { en: "Fruit", ja: "果実" },
    subcategories: [
      {
        name: { en: "Citrus", ja: "柑橘系" },
        descriptors: [
          { en: "Lemon", ja: "レモン" },
          { en: "Lime", ja: "ライム" },
          { en: "Grapefruit", ja: "グレープフルーツ" },
          { en: "Orange", ja: "オレンジ" },
          { en: "Yuzu", ja: "柚子" },
        ],
      },
      {
        name: { en: "Tree Fruit", ja: "木の果実" },
        descriptors: [
          { en: "Green Apple", ja: "青りんご" },
          { en: "Red Apple", ja: "赤りんご" },
          { en: "Pear", ja: "洋梨" },
          { en: "Quince", ja: "マルメロ" },
        ],
      },
      {
        name: { en: "Stone Fruit", ja: "核果" },
        descriptors: [
          { en: "Peach", ja: "桃" },
          { en: "Apricot", ja: "杏" },
          { en: "Nectarine", ja: "ネクタリン" },
          { en: "Plum", ja: "プラム" },
        ],
      },
      {
        name: { en: "Tropical", ja: "トロピカル" },
        descriptors: [
          { en: "Pineapple", ja: "パイナップル" },
          { en: "Mango", ja: "マンゴー" },
          { en: "Passion Fruit", ja: "パッションフルーツ" },
          { en: "Lychee", ja: "ライチ" },
          { en: "Banana", ja: "バナナ" },
          { en: "Melon", ja: "メロン" },
        ],
      },
      {
        name: { en: "Red Fruit", ja: "赤い果実" },
        descriptors: [
          { en: "Strawberry", ja: "イチゴ" },
          { en: "Raspberry", ja: "ラズベリー" },
          { en: "Cherry", ja: "さくらんぼ" },
          { en: "Cranberry", ja: "クランベリー" },
          { en: "Pomegranate", ja: "ザクロ" },
        ],
      },
      {
        name: { en: "Black Fruit", ja: "黒い果実" },
        descriptors: [
          { en: "Blackberry", ja: "ブラックベリー" },
          { en: "Cassis", ja: "カシス" },
          { en: "Blueberry", ja: "ブルーベリー" },
          { en: "Black Plum", ja: "ブラックプラム" },
        ],
      },
      {
        name: { en: "Dried Fruit", ja: "ドライフルーツ" },
        descriptors: [
          { en: "Raisin", ja: "レーズン" },
          { en: "Fig", ja: "イチジク" },
          { en: "Date", ja: "デーツ" },
          { en: "Prune", ja: "プルーン" },
        ],
      },
    ],
  },
  {
    name: { en: "Floral", ja: "花" },
    subcategories: [
      {
        name: { en: "White Flowers", ja: "白い花" },
        descriptors: [
          { en: "Jasmine", ja: "ジャスミン" },
          { en: "Orange Blossom", ja: "オレンジの花" },
          { en: "Honeysuckle", ja: "スイカズラ" },
          { en: "Acacia", ja: "アカシア" },
          { en: "Elderflower", ja: "エルダーフラワー" },
        ],
      },
      {
        name: { en: "Red Flowers", ja: "赤い花" },
        descriptors: [
          { en: "Rose", ja: "バラ" },
          { en: "Violet", ja: "スミレ" },
          { en: "Peony", ja: "シャクヤク" },
          { en: "Lavender", ja: "ラベンダー" },
          { en: "Hibiscus", ja: "ハイビスカス" },
        ],
      },
    ],
  },
  {
    name: { en: "Herbal", ja: "ハーブ・植物" },
    subcategories: [
      {
        name: { en: "Fresh Herbs", ja: "フレッシュハーブ" },
        descriptors: [
          { en: "Mint", ja: "ミント" },
          { en: "Basil", ja: "バジル" },
          { en: "Thyme", ja: "タイム" },
          { en: "Rosemary", ja: "ローズマリー" },
          { en: "Shiso", ja: "紫蘇" },
        ],
      },
      {
        name: { en: "Green / Vegetal", ja: "グリーン・青野菜" },
        descriptors: [
          { en: "Cut Grass", ja: "刈りたての草" },
          { en: "Bell Pepper", ja: "ピーマン" },
          { en: "Eucalyptus", ja: "ユーカリ" },
          { en: "Green Olive", ja: "グリーンオリーブ" },
        ],
      },
      {
        name: { en: "Dried Herbs", ja: "ドライハーブ" },
        descriptors: [
          { en: "Hay", ja: "干し草" },
          { en: "Tea", ja: "紅茶" },
          { en: "Tobacco", ja: "タバコ" },
        ],
      },
    ],
  },
  {
    name: { en: "Spice", ja: "スパイス" },
    subcategories: [
      {
        name: { en: "Sweet Spice", ja: "甘いスパイス" },
        descriptors: [
          { en: "Vanilla", ja: "バニラ" },
          { en: "Cinnamon", ja: "シナモン" },
          { en: "Clove", ja: "クローブ" },
          { en: "Nutmeg", ja: "ナツメグ" },
          { en: "Anise", ja: "アニス" },
          { en: "Licorice", ja: "リコリス" },
        ],
      },
      {
        name: { en: "Pungent Spice", ja: "辛いスパイス" },
        descriptors: [
          { en: "Black Pepper", ja: "黒胡椒" },
          { en: "White Pepper", ja: "白胡椒" },
          { en: "Ginger", ja: "ショウガ" },
          { en: "Sansho", ja: "山椒" },
        ],
      },
    ],
  },
  {
    name: { en: "Earth / Mineral", ja: "土・ミネラル" },
    subcategories: [
      {
        name: { en: "Mineral", ja: "ミネラル" },
        descriptors: [
          { en: "Wet Stone", ja: "濡れた石" },
          { en: "Flint", ja: "火打ち石" },
          { en: "Slate", ja: "スレート" },
          { en: "Chalk", ja: "チョーク" },
          { en: "Sea Salt", ja: "海塩" },
        ],
      },
      {
        name: { en: "Earth", ja: "土" },
        descriptors: [
          { en: "Forest Floor", ja: "森の土" },
          { en: "Mushroom", ja: "キノコ" },
          { en: "Truffle", ja: "トリュフ" },
          { en: "Wet Earth", ja: "濡れた土" },
        ],
      },
    ],
  },
  {
    name: { en: "Wood / Oak", ja: "木・樽" },
    subcategories: [
      {
        name: { en: "Wood", ja: "木" },
        descriptors: [
          { en: "Oak", ja: "オーク" },
          { en: "Cedar", ja: "シダー" },
          { en: "Sandalwood", ja: "白檀" },
        ],
      },
      {
        name: { en: "Roast / Smoke", ja: "ロースト・燻製" },
        descriptors: [
          { en: "Smoke", ja: "スモーク" },
          { en: "Toast", ja: "トースト" },
          { en: "Coffee", ja: "コーヒー" },
          { en: "Charcoal", ja: "炭" },
        ],
      },
    ],
  },
  {
    name: { en: "Nutty / Sweet", ja: "ナッツ・甘味" },
    subcategories: [
      {
        name: { en: "Nuts", ja: "ナッツ" },
        descriptors: [
          { en: "Almond", ja: "アーモンド" },
          { en: "Hazelnut", ja: "ヘーゼルナッツ" },
          { en: "Walnut", ja: "クルミ" },
        ],
      },
      {
        name: { en: "Caramel / Sweet", ja: "キャラメル・甘味" },
        descriptors: [
          { en: "Honey", ja: "蜂蜜" },
          { en: "Caramel", ja: "キャラメル" },
          { en: "Chocolate", ja: "チョコレート" },
          { en: "Butter", ja: "バター" },
          { en: "Butterscotch", ja: "バタースコッチ" },
        ],
      },
    ],
  },
  {
    name: { en: "Dairy / Yeast", ja: "乳製品・酵母" },
    subcategories: [
      {
        name: { en: "Bread / Yeast", ja: "パン・酵母" },
        descriptors: [
          { en: "Brioche", ja: "ブリオッシュ" },
          { en: "Biscuit", ja: "ビスケット" },
          { en: "Bread Dough", ja: "パン生地" },
        ],
      },
      {
        name: { en: "Dairy", ja: "乳製品" },
        descriptors: [
          { en: "Cream", ja: "クリーム" },
          { en: "Yogurt", ja: "ヨーグルト" },
        ],
      },
    ],
  },
  {
    name: { en: "Savory", ja: "セイボリー" },
    subcategories: [
      {
        name: { en: "Animal", ja: "動物系" },
        descriptors: [
          { en: "Leather", ja: "なめし革" },
          { en: "Game", ja: "ジビエ" },
        ],
      },
      {
        name: { en: "Umami", ja: "旨味" },
        descriptors: [
          { en: "Soy Sauce", ja: "醤油" },
          { en: "Dashi", ja: "出汁" },
          { en: "Nori", ja: "海苔" },
          { en: "Cured Meat", ja: "シャルキュトリ" },
        ],
      },
    ],
  },
];

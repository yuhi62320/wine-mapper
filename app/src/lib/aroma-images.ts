// Aroma descriptor to image mapping
// Uses Unsplash photos for each aroma category with copyright attribution
// Mapping: Japanese aroma name -> { emoji, imageUrl }

export interface AromaVisual {
  emoji: string;
  imageUrl: string;
}

// Per-descriptor image and emoji mapping
const AROMA_VISUALS: Record<string, AromaVisual> = {
  // === Fruit - Citrus ===
  "レモン": { emoji: "🍋", imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=80&h=80&fit=crop" },
  "ライム": { emoji: "🍈", imageUrl: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=80&h=80&fit=crop" },
  "グレープフルーツ": { emoji: "🍊", imageUrl: "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=80&h=80&fit=crop" },
  "オレンジ": { emoji: "🍊", imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=80&h=80&fit=crop" },
  "柚子": { emoji: "🟡", imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?w=80&h=80&fit=crop" },

  // === Fruit - Tree Fruit ===
  "青りんご": { emoji: "🍏", imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80&h=80&fit=crop" },
  "赤りんご": { emoji: "🍎", imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80&h=80&fit=crop" },
  "洋梨": { emoji: "🍐", imageUrl: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=80&h=80&fit=crop" },
  "マルメロ": { emoji: "🍐", imageUrl: "https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=80&h=80&fit=crop" },

  // === Fruit - Stone Fruit ===
  "桃": { emoji: "🍑", imageUrl: "https://images.unsplash.com/photo-1629828874514-c1e5103f2100?w=80&h=80&fit=crop" },
  "杏": { emoji: "🍑", imageUrl: "https://images.unsplash.com/photo-1629828874514-c1e5103f2100?w=80&h=80&fit=crop" },
  "ネクタリン": { emoji: "🍑", imageUrl: "https://images.unsplash.com/photo-1629828874514-c1e5103f2100?w=80&h=80&fit=crop" },
  "プラム": { emoji: "🫐", imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=80&h=80&fit=crop" },

  // === Fruit - Tropical ===
  "パイナップル": { emoji: "🍍", imageUrl: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=80&h=80&fit=crop" },
  "マンゴー": { emoji: "🥭", imageUrl: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=80&h=80&fit=crop" },
  "パッションフルーツ": { emoji: "🥝", imageUrl: "https://images.unsplash.com/photo-1604495772376-9657f0035eb5?w=80&h=80&fit=crop" },
  "ライチ": { emoji: "🔴", imageUrl: "https://images.unsplash.com/photo-1604495772376-9657f0035eb5?w=80&h=80&fit=crop" },
  "バナナ": { emoji: "🍌", imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=80&h=80&fit=crop" },
  "メロン": { emoji: "🍈", imageUrl: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=80&h=80&fit=crop" },

  // === Fruit - Red ===
  "イチゴ": { emoji: "🍓", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=80&h=80&fit=crop" },
  "ラズベリー": { emoji: "🫐", imageUrl: "https://images.unsplash.com/photo-1577003811926-53b099a67ea4?w=80&h=80&fit=crop" },
  "さくらんぼ": { emoji: "🍒", imageUrl: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=80&h=80&fit=crop" },
  "クランベリー": { emoji: "🔴", imageUrl: "https://images.unsplash.com/photo-1577003811926-53b099a67ea4?w=80&h=80&fit=crop" },
  "ザクロ": { emoji: "🔴", imageUrl: "https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?w=80&h=80&fit=crop" },

  // === Fruit - Black ===
  "ブラックベリー": { emoji: "🫐", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=80&h=80&fit=crop" },
  "カシス": { emoji: "🫐", imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=80&h=80&fit=crop" },
  "ブルーベリー": { emoji: "🫐", imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=80&h=80&fit=crop" },
  "ブラックプラム": { emoji: "🟣", imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=80&h=80&fit=crop" },

  // === Fruit - Dried ===
  "レーズン": { emoji: "🍇", imageUrl: "https://images.unsplash.com/photo-1596363505729-4190a9506133?w=80&h=80&fit=crop" },
  "イチジク": { emoji: "🟤", imageUrl: "https://images.unsplash.com/photo-1601379327928-bedfaf3da21a?w=80&h=80&fit=crop" },
  "デーツ": { emoji: "🟤", imageUrl: "https://images.unsplash.com/photo-1601379327928-bedfaf3da21a?w=80&h=80&fit=crop" },
  "プルーン": { emoji: "🟣", imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=80&h=80&fit=crop" },

  // === Floral - White ===
  "ジャスミン": { emoji: "🤍", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },
  "オレンジの花": { emoji: "🌸", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },
  "スイカズラ": { emoji: "🌼", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },
  "アカシア": { emoji: "🌼", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },
  "エルダーフラワー": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },

  // === Floral - Red ===
  "バラ": { emoji: "🌹", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },
  "スミレ": { emoji: "🟣", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },
  "シャクヤク": { emoji: "🌺", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },
  "ラベンダー": { emoji: "💜", imageUrl: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=80&h=80&fit=crop" },
  "ハイビスカス": { emoji: "🌺", imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=80&h=80&fit=crop" },

  // === Herbal - Fresh ===
  "ミント": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "バジル": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "タイム": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "ローズマリー": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "紫蘇": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },

  // === Herbal - Green ===
  "刈りたての草": { emoji: "🌱", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "ピーマン": { emoji: "🫑", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "ユーカリ": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "グリーンオリーブ": { emoji: "🫒", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },

  // === Herbal - Dried ===
  "干し草": { emoji: "🌾", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },
  "紅茶": { emoji: "🍵", imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=80&h=80&fit=crop" },
  "タバコ": { emoji: "🍂", imageUrl: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=80&h=80&fit=crop" },

  // === Spice - Sweet ===
  "バニラ": { emoji: "🍦", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "シナモン": { emoji: "🟤", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "クローブ": { emoji: "🟤", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "ナツメグ": { emoji: "🟤", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "アニス": { emoji: "⭐", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "リコリス": { emoji: "🖤", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },

  // === Spice - Pungent ===
  "黒胡椒": { emoji: "🌶️", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "白胡椒": { emoji: "⚪", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "ショウガ": { emoji: "🫚", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },
  "山椒": { emoji: "🌿", imageUrl: "https://images.unsplash.com/photo-1602524206684-fdf1ff293830?w=80&h=80&fit=crop" },

  // === Earth / Mineral ===
  "濡れた石": { emoji: "🪨", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "火打ち石": { emoji: "🪨", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "スレート": { emoji: "🪨", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "チョーク": { emoji: "⬜", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "海塩": { emoji: "🧂", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "森の土": { emoji: "🌲", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "キノコ": { emoji: "🍄", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "トリュフ": { emoji: "🟤", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },
  "濡れた土": { emoji: "🟫", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop" },

  // === Wood / Oak ===
  "オーク": { emoji: "🪵", imageUrl: "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=80&h=80&fit=crop" },
  "シダー": { emoji: "🌲", imageUrl: "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=80&h=80&fit=crop" },
  "白檀": { emoji: "🪵", imageUrl: "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=80&h=80&fit=crop" },
  "スモーク": { emoji: "💨", imageUrl: "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=80&h=80&fit=crop" },
  "トースト": { emoji: "🍞", imageUrl: "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=80&h=80&fit=crop" },
  "コーヒー": { emoji: "☕", imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=80&h=80&fit=crop" },
  "炭": { emoji: "🖤", imageUrl: "https://images.unsplash.com/photo-1597580352457-3a5ae3aa6e84?w=80&h=80&fit=crop" },

  // === Nutty / Sweet ===
  "アーモンド": { emoji: "🥜", imageUrl: "https://images.unsplash.com/photo-1574570068235-d5dff17be426?w=80&h=80&fit=crop" },
  "ヘーゼルナッツ": { emoji: "🌰", imageUrl: "https://images.unsplash.com/photo-1574570068235-d5dff17be426?w=80&h=80&fit=crop" },
  "クルミ": { emoji: "🥜", imageUrl: "https://images.unsplash.com/photo-1574570068235-d5dff17be426?w=80&h=80&fit=crop" },
  "蜂蜜": { emoji: "🍯", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop" },
  "キャラメル": { emoji: "🍬", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop" },
  "チョコレート": { emoji: "🍫", imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=80&h=80&fit=crop" },
  "バター": { emoji: "🧈", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop" },
  "バタースコッチ": { emoji: "🍬", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop" },

  // === Dairy / Yeast ===
  "ブリオッシュ": { emoji: "🥐", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop" },
  "ビスケット": { emoji: "🍪", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop" },
  "パン生地": { emoji: "🍞", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop" },
  "クリーム": { emoji: "🥛", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop" },
  "ヨーグルト": { emoji: "🥛", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&h=80&fit=crop" },

  // === Savory ===
  "なめし革": { emoji: "🟤", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop" },
  "ジビエ": { emoji: "🥩", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop" },
  "醤油": { emoji: "🫘", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop" },
  "出汁": { emoji: "🍲", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop" },
  "海苔": { emoji: "🟢", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop" },
  "シャルキュトリ": { emoji: "🥩", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop" },
};

export function getAromaVisual(aromaJa: string): AromaVisual {
  return AROMA_VISUALS[aromaJa] || { emoji: "🍷", imageUrl: "" };
}

// Copyright notice
export const AROMA_IMAGE_COPYRIGHT = "Photos: Unsplash / CC0";

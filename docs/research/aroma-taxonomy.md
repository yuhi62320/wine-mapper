# Wine Aroma / Nose Expression Systems - Complete Research

## Table of Contents
1. UC Davis Wine Aroma Wheel
2. Primary / Secondary / Tertiary Aroma Framework
3. Wine App UX for Aroma Input
4. Complete Hierarchical Aroma Taxonomy (Database Seed Data)
5. Palate / Mouthfeel Descriptors & Scales
6. Japanese Wine Terminology (日本語ワイン用語)

---

## 1. UC Davis Wine Aroma Wheel

Created by Dr. Ann C. Noble at UC Davis in 1984 (revised 1987). The industry standard for systematic aroma identification.

### Structure
- **3 concentric tiers**: Center (general) → Middle (subcategory) → Outer (specific)
- **12 Tier-1 categories** at the center
- **29 Tier-2 subcategories** in the middle ring
- **~83-94 Tier-3 specific descriptors** on the outer ring

### How to use
Start from the center: detect a general category (e.g., "Fruity"), narrow to subcategory (e.g., "Citrus"), then identify the specific descriptor (e.g., "Grapefruit").

### Complete UC Davis Wheel Hierarchy

#### 1. FRUITY
- **Citrus**: Grapefruit, Lemon
- **Berry**: Blackberry, Raspberry, Strawberry, Black Currant (Cassis)
- **Tree Fruit**: Cherry (Red/Black), Apricot, Peach, Apple
- **Tropical Fruit**: Pineapple, Melon, Banana
- **Dried Fruit**: Strawberry Jam, Raisin, Prune, Fig
- **Other Fruit**: Artificial Fruit, Methyl Anthranilate

#### 2. FLORAL
- **Floral**: Orange Blossom, Rose, Violet, Geranium

#### 3. SPICY
- **Spicy**: Cloves, Black Pepper, Licorice/Anise

#### 4. VEGETATIVE / HERBACEOUS
- **Fresh**: Cut Green Grass, Bell Pepper, Eucalyptus, Mint
- **Canned/Cooked**: Green Beans, Asparagus, Green Olive, Black Olive, Artichoke
- **Dried**: Hay/Straw, Tea, Tobacco

#### 5. NUTTY
- **Nutty**: Walnut, Hazelnut, Almond

#### 6. CARAMELIZED
- **Caramelized**: Honey, Butterscotch, Diacetyl (Butter), Soy Sauce, Chocolate, Molasses

#### 7. WOODY
- **Burned/Smoky**: Smoky, Burnt Toast, Coffee
- **Phenolic**: Phenolic, Medicinal, Bacon
- **Resinous**: Oak, Cedar, Vanilla

#### 8. EARTHY
- **Earthy**: Dusty, Mushroom
- **Moldy**: Moldy Cork

#### 9. CHEMICAL
- **Petroleum**: Diesel, Kerosene, Plastic
- **Sulfur**: Wet Wool, Cabbage, Skunk, Garlic, Natural Gas, Hydrogen Sulfide
- **Papery**: Filter Pad, Wet Cardboard
- **Pungent**: Ethyl Acetate, Acetic Acid, Ethanol, Sulfur Dioxide

#### 10. PUNGENT
- **Cool**: Menthol
- **Hot**: Alcohol

#### 11. OXIDIZED
- **Oxidized**: Sherry-like notes (acetaldehyde)

#### 12. MICROBIOLOGICAL
- **Yeasty**: Baker's Yeast
- **Lactic**: Yogurt, Sweaty, Sauerkraut
- **Other**: Mousy, Horsey

---

## 2. Primary / Secondary / Tertiary Aroma Framework

This is the standard sommelier classification system, also used by WSET.

### Primary Aromas (第1アロマ / ブドウ由来)
Origin: Grape variety and terroir. Dominant in young wines.

| Category | Descriptors |
|----------|------------|
| Citrus Fruits | Lemon, Lime, Grapefruit, Orange, Orange Zest, Yuzu |
| Tree/Pome Fruits | Green Apple, Red Apple, Pear, Quince |
| Stone Fruits | Peach, Apricot, Nectarine, Plum |
| Tropical Fruits | Pineapple, Mango, Passion Fruit, Lychee, Guava, Papaya, Banana, Melon |
| Red Fruits | Strawberry, Raspberry, Cherry, Cranberry, Red Currant, Pomegranate |
| Black/Dark Fruits | Blackberry, Black Cherry, Black Currant (Cassis), Blueberry, Boysenberry, Black Plum |
| Dried Fruits | Raisin, Fig, Date, Prune, Dried Apricot |
| Flowers | Rose, Violet, Jasmine, Orange Blossom, Honeysuckle, Acacia, Lilac, Peony, Lavender, Elderflower, Iris, Hibiscus |
| Herbs (Fresh) | Mint, Basil, Thyme, Rosemary, Dill, Fennel, Eucalyptus |
| Herbs (Dried) | Herbes de Provence, Sage, Oregano, Bay Leaf, Tea |
| Green / Vegetal | Cut Grass, Bell Pepper, Tomato Leaf, Gooseberry, Asparagus, Jalapeno |
| Spices | Black Pepper, White Pepper, Red Pepper, Cinnamon, Clove, Anise/Star Anise, Licorice, Ginger, Nutmeg, Cardamom |
| Earth / Mineral | Wet Stone, Slate, Flint, Chalk, Volcanic Rock, Clay, Gravel, Petroleum/Petrol |

### Secondary Aromas (第2アロマ / 醸造・発酵由来)
Origin: Fermentation and winemaking processes.

| Category | Descriptors |
|----------|------------|
| Yeast / Autolysis | Bread Dough, Brioche, Biscuit, Toast, Baker's Yeast, Sourdough, Lager/Beer |
| Malolactic Fermentation | Butter, Cream, Yogurt, Cheese Rind |
| Oak Contact | Vanilla, Coconut, Cedar, Baking Spices, Smoke, Dill, Caramel, Toffee |
| Microbial | Truffle, Mushroom |

### Tertiary Aromas / Bouquet (第3アロマ / ブーケ / 熟成由来)
Origin: Aging in bottle or barrel. Found in mature wines.

| Category | Descriptors |
|----------|------------|
| Fruit Evolution | Stewed Fruit, Cooked Plum, Dried Fig, Raisin, Marmalade, Fruit Compote, Prune |
| Oxidative | Almond, Marzipan, Hazelnut, Walnut, Toffee, Caramel, Coffee, Cocoa, Chocolate |
| Animal / Savory | Leather, Suede, Game, Cured Meat, Beef Jerky |
| Earth / Forest | Forest Floor, Wet Leaves, Mushroom, Truffle, Damp Earth, Potting Soil, Compost |
| Tobacco / Wood | Tobacco, Cigar Box, Cedar, Sandalwood, Pencil Shavings |
| Tertiary Spice | Nutmeg, Clove, Ginger, Cinnamon (more integrated/subtle than primary spice) |
| Developed | Honey, Beeswax, Petrol, Kerosene, Dried Herbs, Tea, Soy Sauce |

---

## 3. How Existing Wine Apps Handle Aroma/Nose Input

### Current Approaches

| App | Method | Details |
|-----|--------|---------|
| **Vivino** | Community-aggregated tags | Shows "What people talk about" with mention counts (e.g., "1478 mentions of blackberry, plum, dark fruit"). Tags are grouped by flavor family. |
| **CellarTracker** | Free-text tasting notes | Users write private or public notes. Community reviews are aggregated. Flexible but hard to search/analyze. |
| **WSET Tasting App** | Structured SAT form + descriptor lexicon | Follows the Systematic Approach to Tasting. Categorizes aromas as primary/secondary/tertiary with a comprehensive lexicon. |
| **Delectable** | Photo + free text | Scan label, add free text notes. Minimal structured aroma input. |
| **Wine Folly** | Educational wheel charts | Reference tool, not an input mechanism. Separate wheels for red, white, rose, sparkling. |

### UX Best Practices for Aroma Input

**Recommended approach: Hybrid (Tags + Free Text + Optional Wheel)**

1. **Pre-defined tag selection** (primary input)
   - Display tags organized by category (Fruit > Citrus > Lemon)
   - Allow multi-select with tap/click
   - Show most common descriptors first, with "more" expansion
   - Allow intensity rating per tag (optional: subtle / moderate / pronounced)

2. **Free-text field** (supplementary)
   - For custom descriptors not in the predefined list
   - Auto-suggest from existing vocabulary as user types
   - Let users add new tags that persist to their personal vocabulary

3. **Visual aroma wheel** (optional discovery mode)
   - Interactive wheel for exploration/learning
   - Tap a wedge to select that descriptor
   - Good for beginners who don't know the vocabulary yet

4. **Key UX insights from user feedback:**
   - Don't make the predefined list too restrictive -- allow custom entries
   - Don't force users into categories they disagree with
   - Search/filter within the tag list is essential
   - Show recently used and favorite descriptors at the top
   - 3-tier progressive disclosure: Category → Subcategory → Specific (don't overwhelm)

---

## 4. Complete Hierarchical Aroma Taxonomy (Database Seed Data)

This is a comprehensive, deduplicated taxonomy combining UC Davis, Wine Folly, and WSET frameworks. Suitable for use as database seed data.

Format: **Category → Subcategory → Specific Descriptors**

### FRUIT

#### Citrus
- Lemon (レモン)
- Lime (ライム)
- Grapefruit (グレープフルーツ)
- Orange (オレンジ)
- Orange Zest (オレンジの皮)
- Yuzu (柚子)
- Marmalade (マーマレード)
- Tangerine (みかん)

#### Tree Fruit / Pome Fruit
- Green Apple (青りんご)
- Red Apple (赤りんご)
- Pear (洋梨)
- Quince (マルメロ)

#### Stone Fruit
- Peach (桃)
- Apricot (杏)
- Nectarine (ネクタリン)
- Plum (プラム)
- Cherry - Red (赤いさくらんぼ)
- Cherry - Black (ブラックチェリー)

#### Tropical Fruit
- Pineapple (パイナップル)
- Mango (マンゴー)
- Passion Fruit (パッションフルーツ)
- Lychee (ライチ)
- Guava (グアバ)
- Papaya (パパイヤ)
- Banana (バナナ)
- Melon (メロン)
- Kiwi (キウイ)
- Coconut (ココナッツ)

#### Red Fruit
- Strawberry (イチゴ)
- Raspberry (ラズベリー / 木苺)
- Cranberry (クランベリー)
- Red Currant (赤スグリ)
- Pomegranate (ザクロ)
- Sour Cherry (サワーチェリー)

#### Black / Dark Fruit
- Blackberry (ブラックベリー)
- Black Currant / Cassis (カシス)
- Blueberry (ブルーベリー)
- Boysenberry (ボイセンベリー)
- Black Plum (ブラックプラム)
- Black Olive (ブラックオリーブ)

#### Dried / Cooked Fruit
- Raisin (レーズン)
- Fig (イチジク)
- Date (デーツ / ナツメヤシ)
- Prune (プルーン)
- Dried Apricot (干し杏)
- Strawberry Jam (イチゴジャム)
- Stewed Fruit (コンポート)
- Fruit Cake (フルーツケーキ)
- Marmalade (マーマレード)

### FLORAL

#### White Flowers
- Orange Blossom (オレンジの花)
- Jasmine (ジャスミン)
- Honeysuckle (スイカズラ)
- Acacia (アカシア)
- Elderflower (エルダーフラワー)
- Gardenia (クチナシ)

#### Red/Purple Flowers
- Rose (バラ)
- Violet (スミレ)
- Peony (シャクヤク / 牡丹)
- Iris (アイリス / 菖蒲)
- Hibiscus (ハイビスカス)
- Lilac (ライラック)

#### Other Floral
- Lavender (ラベンダー)
- Potpourri (ポプリ)
- Geranium (ゼラニウム)
- Chamomile (カモミール)
- Beeswax (蜜蝋)

### HERBAL / VEGETATIVE

#### Fresh Herbs
- Mint (ミント)
- Basil (バジル)
- Thyme (タイム)
- Rosemary (ローズマリー)
- Dill (ディル)
- Fennel (フェンネル)
- Lemongrass (レモングラス)
- Sage (セージ)

#### Dried Herbs
- Herbes de Provence (エルブ・ド・プロヴァンス)
- Oregano (オレガノ)
- Bay Leaf (ローリエ)
- Dried Thyme (乾燥タイム)

#### Green / Vegetal
- Cut Grass (刈りたての草)
- Bell Pepper (ピーマン)
- Green Bean (インゲン)
- Asparagus (アスパラガス)
- Tomato Leaf (トマトの葉)
- Gooseberry (グーズベリー)
- Jalapeno (ハラペーニョ)
- Artichoke (アーティチョーク)
- Green Olive (グリーンオリーブ)

#### Dried Vegetal
- Hay / Straw (干し草)
- Tea (紅茶)
- Tobacco (タバコ)
- Dried Leaves (枯れ葉)

### SPICE

#### Sweet Spice
- Vanilla (バニラ)
- Cinnamon (シナモン)
- Nutmeg (ナツメグ)
- Clove (クローブ)
- Anise / Star Anise (アニス / 八角)
- Licorice (甘草 / リコリス)
- Allspice (オールスパイス)
- Cardamom (カルダモン)
- Five-Spice (五香粉)

#### Pungent Spice
- Black Pepper (黒胡椒)
- White Pepper (白胡椒)
- Red Pepper / Chili (赤胡椒)
- Ginger (ショウガ)
- Sichuan Pepper (山椒) *[Japanese/Asian wines context]*
- Wasabi (わさび) *[subtle, rare descriptor]*

### EARTH / MINERAL

#### Mineral
- Wet Stone (濡れた石)
- Flint (火打ち石)
- Slate (スレート)
- Chalk (チョーク / 石灰)
- Volcanic Rock (火山岩)
- Gravel (砂利)
- Saline / Sea Salt (塩味 / 海塩)

#### Earth
- Forest Floor (森の土)
- Wet Earth / Petrichor (濡れた土)
- Mushroom (キノコ)
- Truffle (トリュフ)
- Potting Soil (腐葉土)
- Clay (粘土)
- Dust (埃)

### WOOD / OAK

#### Toasted Wood
- Oak (オーク)
- Cedar (杉 / シダー)
- Sandalwood (白檀)
- Pine (松)
- Pencil Shavings (鉛筆の削りかす)

#### Smoke / Roast
- Smoke (スモーク / 燻製)
- Burnt Toast (焦がしたトースト)
- Charcoal (炭)
- Bacon (ベーコン)

#### Barrel Influence
- Vanilla (バニラ) *[also in Spice]*
- Coconut (ココナッツ)
- Caramel (キャラメル)
- Toffee (トフィー)
- Dill (ディル) *[American oak marker]*

### NUTTY

#### Tree Nuts
- Almond (アーモンド)
- Hazelnut (ヘーゼルナッツ)
- Walnut (クルミ)
- Chestnut (栗)
- Marzipan (マジパン)
- Pistachio (ピスタチオ)

### CARAMEL / SWEET

#### Caramelized
- Honey (蜂蜜)
- Butterscotch (バタースコッチ)
- Caramel (キャラメル)
- Toffee (トフィー)
- Molasses (糖蜜)
- Brown Sugar (黒糖)
- Maple Syrup (メープルシロップ)

#### Chocolate / Coffee
- Dark Chocolate (ダークチョコレート)
- Milk Chocolate (ミルクチョコレート)
- Cocoa (ココア)
- Coffee (コーヒー)
- Espresso (エスプレッソ)
- Mocha (モカ)

### DAIRY / FERMENTATION

#### Yeast / Bread
- Bread Dough (パン生地)
- Brioche (ブリオッシュ)
- Biscuit (ビスケット)
- Toast (トースト)
- Baker's Yeast (イースト)
- Sourdough (サワードウ)

#### Dairy
- Butter (バター)
- Cream (クリーム)
- Yogurt (ヨーグルト)
- Cheese Rind (チーズの皮)
- Custard Cream (カスタードクリーム)

### SAVORY / ANIMAL

#### Animal
- Leather (なめし革)
- Suede (スエード)
- Game / Gibier (ジビエ / 獣肉)
- Wet Wool (濡れた羊毛)
- Musk (ムスク)

#### Umami / Savory
- Soy Sauce (醤油)
- Cured Meat / Charcuterie (シャルキュトリ)
- Beef Jerky (ジャーキー)
- Dried Seaweed (海苔) *[Japanese context - certain Koshu wines]*
- Dashi (出汁) *[Japanese context - umami note]*

### CHEMICAL / FAULT

#### Sulfur Compounds
- Struck Match (マッチ)
- Rubber (ゴム)
- Boiled Egg (ゆで卵)
- Garlic (ニンニク)
- Onion (タマネギ)

#### Volatile Acidity
- Vinegar (酢)
- Nail Polish Remover (除光液)

#### Brettanomyces
- Band-Aid (絆創膏)
- Barnyard (馬小屋)
- Sweaty Saddle (汗の染みた革)

#### Cork Taint (TCA)
- Wet Cardboard (濡れた段ボール)
- Musty Basement (カビ臭い地下室)
- Wet Dog (濡れた犬)

#### Oxidation / Maderized
- Sherry-like (シェリー様)
- Bruised Apple (傷んだリンゴ)
- Stewed / Cooked (加熱した果実)

#### Other
- Petroleum / Petrol (石油 / ペトロール)
- Kerosene (灯油)
- Plastic (プラスチック)
- Menthol (メンソール)
- Eucalyptus (ユーカリ)
- Camphor (樟脳)

---

## 5. Palate / Mouthfeel Descriptors & Scales

Based on the WSET Systematic Approach to Tasting (SAT) and sommelier standards.

### Sweetness (甘さ / 残糖)
| Level | English | Japanese | Description |
|-------|---------|----------|-------------|
| 1 | Bone Dry | 極辛口 | No perceptible sugar |
| 2 | Dry | 辛口 | Barely perceptible sugar |
| 3 | Off-Dry | やや辛口 | Slightly sweet, just noticeable |
| 4 | Medium-Dry | 中辛口 | Noticeably sweet but not dominant |
| 5 | Medium-Sweet | 中甘口 | Obvious sweetness |
| 6 | Sweet | 甘口 | Pronounced sweetness |
| 7 | Luscious | 極甘口 | Very rich, dessert-level sweetness |

### Acidity (酸味)
| Level | English | Japanese | Descriptors |
|-------|---------|----------|-------------|
| 1 | Low | 低い | Flat, flabby, soft |
| 2 | Medium- | やや低い | |
| 3 | Medium | 中程度 | Balanced, smooth |
| 4 | Medium+ | やや高い | |
| 5 | High | 高い | Crisp, tart, racy, bright, zippy, sharp |

**Acidity quality descriptors:** Bright (輝く), Crisp (きりっとした), Tart (酸っぱい), Racy (生き生きとした), Soft (柔らかい), Flabby (だらけた), Refreshing (爽やかな), Searing (刺すような), Zesty (ピリッとした)

### Tannin (タンニン) - Red wines only
| Level | English | Japanese |
|-------|---------|----------|
| 1 | Low | 低い |
| 2 | Medium- | やや低い |
| 3 | Medium | 中程度 |
| 4 | Medium+ | やや高い |
| 5 | High | 高い |

**Tannin quality descriptors:**
- **Texture:** Silky (シルキー), Velvety (ベルベットのような), Smooth (滑らか), Plush (ふくよか), Supple (しなやか), Fine-grained (きめ細かい)
- **Firm/Structured:** Firm (しっかり), Grippy (グリップのある), Structured (骨格のある), Chewy (噛み応えのある), Robust (力強い)
- **Rough:** Coarse (粗い), Dusty (ざらつく), Sandy (砂のような), Grainy (粒感のある), Harsh (荒い), Astringent (渋い), Drying (乾燥させる)
- **Ripeness:** Ripe (熟した), Green/Unripe (未熟な), Powdery (パウダリー)

### Body (ボディ / 厚み)
| Level | English | Japanese | Description |
|-------|---------|----------|-------------|
| 1 | Light | ライトボディ | Thin, delicate, watery |
| 2 | Medium- | やや軽め | |
| 3 | Medium | ミディアムボディ | Moderate weight and texture |
| 4 | Medium+ | やや重め | |
| 5 | Full | フルボディ | Rich, heavy, thick, viscous |

### Alcohol (アルコール)
| Level | English | Japanese | ABV Range |
|-------|---------|----------|-----------|
| 1 | Low | 低アルコール | Below 11% |
| 2 | Medium | 中アルコール | 11-13.9% |
| 3 | High | 高アルコール | 14% and above |

**Alcohol sensation descriptors:** Warming (温かみ), Hot (アルコール感が強い), Smooth (滑らか), Burning (焼けるような)

### Flavor Intensity (フレーバーの強さ)
| Level | English | Japanese |
|-------|---------|----------|
| 1 | Light | 軽い |
| 2 | Medium- | やや軽い |
| 3 | Medium | 中程度 |
| 4 | Medium+ | やや強い |
| 5 | Pronounced | 顕著 / はっきりした |

### Finish / Aftertaste (余韻 / アフター)
| Level | English | Japanese | Duration |
|-------|---------|----------|----------|
| 1 | Short | 短い | 2-3 seconds |
| 2 | Medium- | やや短い | 3-5 seconds |
| 3 | Medium | 中程度 | 5-8 seconds |
| 4 | Medium+ | やや長い | 8-12 seconds |
| 5 | Long | 長い | 12-15+ seconds |

**Finish quality descriptors:** Clean (クリーン), Lingering (余韻が残る), Persistent (持続する), Bitter (苦い), Dry (辛口の), Warming (温かい), Mouth-coating (口中に広がる)

### Overall Balance & Quality (バランスと品質)
| Level | English | Japanese |
|-------|---------|----------|
| 1 | Poor / Faulty | 欠陥あり |
| 2 | Acceptable | 許容範囲 |
| 3 | Good | 良い |
| 4 | Very Good | とても良い |
| 5 | Outstanding | 卓越 |

**Quality criteria (BLIC):**
- **Balance** (バランス): Harmony between sweetness, acidity, tannin, alcohol, body
- **Length** (余韻の長さ): How long the finish lasts
- **Intensity** (強度): Depth and concentration of flavors
- **Complexity** (複雑さ): Number and interplay of distinct aromas/flavors

### Attack / First Impression (アタック)
| Level | Japanese | English |
|-------|----------|---------|
| Soft | 柔らかい | Gentle first impression |
| Moderate | 中程度 | Balanced entry |
| Strong | 力強い | Intense first impression |

---

## 6. Japanese Wine Terminology Notes (日本語ワイン用語の補足)

### Aroma Classification in Japanese
| English | Japanese | Notes |
|---------|----------|-------|
| Primary Aroma | 第1アロマ (だいいちアロマ) | Grape-derived |
| Secondary Aroma | 第2アロマ (だいにアロマ) | Fermentation-derived |
| Tertiary Aroma / Bouquet | 第3アロマ / ブーケ | Aging-derived |
| Varietal Aroma | 品種香 (ひんしゅこう) | Technical term for grape variety character |
| Processing Aroma | 加工香 (かこうこう) | Pre-fermentation handling aromas |
| Fermentation Aroma | 発酵香 (はっこうこう) | Yeast/bacteria activity aromas |
| Aging Aroma | 熟成香 (じゅくせいこう) | Maturation aromas |
| Nose | ノーズ | Overall aroma impression |
| Oak Character | 樽香 (たるこう) | Oak barrel influence |

### Japanese-Specific Descriptors
These descriptors are used in Japanese wine culture and may not have direct Western equivalents:

| Japanese | Romaji | Meaning | Context |
|----------|--------|---------|---------|
| 杏仁豆腐 | Annin-doufu | Almond tofu/pudding | MLF-derived secondary aroma |
| 吟醸香 | Ginjou-kou | Ginjo fragrance | Fruity ester notes (borrowed from sake) |
| 山椒 | Sanshou | Sichuan/Japanese pepper | Spice descriptor for certain reds |
| 柚子 | Yuzu | Yuzu citrus | Citrus descriptor, esp. aromatic whites |
| 梅 | Ume | Japanese plum | Sour/acidic fruit note |
| 海苔 | Nori | Dried seaweed | Mineral/saline note (Koshu wines) |
| 出汁 | Dashi | Soup stock (umami) | Umami-rich aged wines |
| 紫蘇 | Shiso | Perilla/shiso leaf | Herbal descriptor |
| わさび | Wasabi | Wasabi | Pungent/spicy note |
| 抹茶 | Matcha | Matcha green tea | Green, vegetal, slightly sweet |
| 黒糖 | Kokutou | Brown/raw sugar | Caramelized sweetness |
| 醤油 | Shouyu | Soy sauce | Umami/aged descriptor |
| 味噌 | Miso | Miso | Fermented/umami note |
| 干し柿 | Hoshigaki | Dried persimmon | Dried fruit descriptor |
| 枯れ葉 | Kareha | Dried/fallen leaves | Aged wine, autumnal note |
| 線香 | Senkou | Incense stick | Smoky/aromatic descriptor |

### Common Sommelier Japanese Expressions
| Japanese | English Equivalent |
|----------|-------------------|
| 華やかな (はなやかな) | Gorgeous/flamboyant (for aromatic wines) |
| 上品な (じょうひんな) | Elegant/refined |
| 力強い (ちからづよい) | Powerful/robust |
| 複雑な (ふくざつな) | Complex |
| エレガントな | Elegant |
| フレッシュな | Fresh |
| ミネラル感 | Mineral sensation |
| 骨格のある | Structured / having backbone |
| まろやかな | Mellow/smooth |
| 濃厚な (のうこうな) | Rich/concentrated |
| 繊細な (せんさいな) | Delicate |
| 重厚な (じゅうこうな) | Weighty/substantial |
| しなやかな | Supple/lithe |
| こなれた | Well-integrated/evolved |
| 若々しい (わかわかしい) | Youthful |
| 枯れた (かれた) | Faded/past its peak |

---

## Summary: Recommended Database Schema

For the wine logging app, the aroma taxonomy should be stored as a 3-level hierarchy:

```
aroma_categories (id, name_en, name_ja, aroma_origin)
  → aroma_subcategories (id, category_id, name_en, name_ja)
    → aroma_descriptors (id, subcategory_id, name_en, name_ja, is_common)
```

The `aroma_origin` field on categories maps to:
- `primary` - grape-derived
- `secondary` - fermentation-derived
- `tertiary` - aging-derived
- `fault` - wine defect

The `is_common` boolean on descriptors helps the UI show the most frequently used terms first.

Palate scales should be stored separately:

```
palate_dimensions (id, name_en, name_ja, min_label_en, max_label_en, scale_points)
  → palate_levels (id, dimension_id, level_number, label_en, label_ja)
```

Dimensions: Sweetness (7 levels), Acidity (5), Tannin (5), Body (5), Alcohol (3), Flavor Intensity (5), Finish (5), Quality (5).

---

## Sources

- [UC Davis Wine Aroma Wheel - Wine Cellar Insider](https://www.thewinecellarinsider.com/wine-topics/wine-educational-questions/davis-aroma-wheel/)
- [The Wine Aroma Wheel Official Website](https://www.winearomawheel.com/)
- [Wine Folly - Updated Wine Flavor Wheel with 100+ Flavors](https://winefolly.com/tips/wine-aroma-wheel-100-flavors/)
- [Wine Folly - Wine Characteristics](https://winefolly.com/deep-dive/wine-characteristics/)
- [Wine Enthusiast - Primary Wine Aromas Guide](https://www.wineenthusiast.com/basics/primary-wine-aromas-guide/)
- [Decanter - Understanding Wine Aromas](https://www.decanter.com/learn/understanding-wine-aromas-329940/)
- [WSET Systematic Approach to Tasting](https://www.wsetglobal.com/knowledge-centre/wset-systematic-approach-to-tasting-sat/)
- [WSET SAT Explained - Mystery Tasting](https://www.mysterytasting.com/wset-sat-explained)
- [Usual Wines - Wine Aroma Wheel](https://usualwines.com/blogs/knowledge-base/wine-aroma-wheel)
- [Wine Link - テイスティング香り用語](https://wine-link.net/dictionary/scene/detail/2130)
- [Nagi's Wine World - 香りの種類と区分](https://nagiswine.com/aroma-01/)
- [エノテカ - アロマとブーケ](https://www.enoteca.co.jp/article/archives/6750/)
- [SommWine - Best Wine Apps for Tasting Notes](https://www.sommwine.com/4-free-wine-apps-tasting-notes/)
- [Ann C. Noble - Wikipedia](https://en.wikipedia.org/wiki/Ann_C._Noble)

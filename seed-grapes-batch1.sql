-- Seed grape varieties batch 1: Red grapes (37 varieties)
-- Generated for Wine Mapper project

-- 1. Négrette
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Négrette', 'ネグレット', ARRAY['Negrette','Petit Noir'], true,
  'France', 'Fronton',
  'フランス南西部フロントンを代表する黒ブドウ品種。スミレの香りが特徴的で、柔らかなタンニンと果実味豊かなワインを生む。フロントンAOCではブレンドの主要品種として使用される。',
  'スミレの香りが際立つフロントン特有の柔らかな赤ワイン品種',
  ARRAY['スミレ','ブラックベリー','甘草','黒胡椒','プラム','ラズベリー'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['カスレ','鴨のコンフィ','トゥールーズソーセージ','グリル野菜','羊肉のロースト'],
  ARRAY['Fronton','Côtes du Frontonnais','South-West France']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 2. Fer Servadou
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Fer Servadou', 'フェール・セルヴァドゥ', ARRAY['Fer','Braucol','Mansois','Pinenc'], true,
  'France', 'South-West France',
  'フランス南西部の古代品種で、マルシヤックやガイヤックで栽培される。鉄分を思わせるミネラル感と野性的な果実味が特徴。名前の「Fer」は鉄を意味し、硬質なタンニンを持つワインを生む。',
  '鉄のようなミネラル感と野性的な果実味を持つ南西部の古代品種',
  ARRAY['ブラックベリー','鉄','ピーマン','カシス','黒胡椒','スミレ','ハーブ'],
  '{"sweetness":1,"acidity":4,"tannin":4,"body":4,"finish":3}'::jsonb,
  ARRAY['鴨のコンフィ','アリゴ','仔羊の煮込み','ロックフォールチーズ','猪肉'],
  ARRAY['Marcillac','Gaillac','Madiran','Aveyron']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 3. Duras
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Duras', 'デュラス', ARRAY['Durasié'], true,
  'France', 'Gaillac',
  'ガイヤック地方固有の黒ブドウ品種で、ブレンドに使用されることが多い。スパイシーな胡椒の風味と程よいタンニンが特徴。単一品種でのワインは稀だが、ガイヤックの赤ワインに不可欠な存在。',
  'ガイヤック固有のスパイシーな胡椒風味を持つブレンド向き品種',
  ARRAY['黒胡椒','プラム','スパイス','ブラックチェリー','ハーブ','甘草'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['ソーセージ','カスレ','鴨料理','トマト煮込み','グリルチキン'],
  ARRAY['Gaillac','Tarn','South-West France']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 4. Tannat
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Tannat', 'タナ', ARRAY['Harriague','Moustrou'], true,
  'France', 'Madiran',
  'フランス南西部マディラン原産で、ウルグアイの国民的品種でもある。非常に強いタンニンが特徴で、長期熟成に適した力強いワインを生む。ウルグアイでは柔らかなスタイルに仕上げられることが多い。',
  '極めて強いタンニンと濃厚な色調を持つ力強い長期熟成型品種',
  ARRAY['ブラックベリー','プラム','ダークチョコレート','スパイス','なめし革','タバコ','黒胡椒','カシス'],
  '{"sweetness":1,"acidity":3,"tannin":5,"body":5,"finish":5}'::jsonb,
  ARRAY['仔羊のロースト','鴨のコンフィ','牛肉のステーキ','カスレ','熟成チーズ'],
  ARRAY['Madiran','Irouléguy','Uruguay','Cahors','Argentina']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 5. Counoise
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Counoise', 'クノワーズ', ARRAY[]::text[], true,
  'France', 'Rhône Valley',
  'シャトーヌフ・デュ・パプの認定13品種の一つ。軽やかな果実味とスパイシーなニュアンスが特徴で、ブレンドに新鮮さと複雑さを加える。単独で醸造されることは稀。',
  'シャトーヌフ・デュ・パプのブレンドに新鮮さを与える軽やかな品種',
  ARRAY['ラズベリー','プラム','白胡椒','ハーブ','スパイス','アニス'],
  '{"sweetness":2,"acidity":4,"tannin":2,"body":2,"finish":2}'::jsonb,
  ARRAY['プロヴァンス料理','ラタトゥイユ','グリル野菜','鶏肉のハーブ焼き','ピッツァ'],
  ARRAY['Châteauneuf-du-Pape','Southern Rhône','Languedoc']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 6. Vaccarèse
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Vaccarèse', 'ヴァッカレーゼ', ARRAY['Vaccarese','Brun Argenté'], true,
  'France', 'Rhône Valley',
  'シャトーヌフ・デュ・パプの認定13品種の一つで、非常に希少な品種。繊細な果実味と程よい酸味が特徴。栽培面積は極めて少なく、ブレンドに少量加えられる補助品種。',
  'シャトーヌフ・デュ・パプの希少な補助品種で繊細な果実味が特徴',
  ARRAY['レッドチェリー','ラズベリー','ハーブ','スパイス','花','胡椒'],
  '{"sweetness":2,"acidity":3,"tannin":2,"body":2,"finish":2}'::jsonb,
  ARRAY['プロヴァンス料理','グリルチキン','トマトベースのパスタ','オリーブ料理'],
  ARRAY['Châteauneuf-du-Pape','Southern Rhône']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 7. Muscardin
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Muscardin', 'ミュスカルダン', ARRAY[]::text[], true,
  'France', 'Rhône Valley',
  'シャトーヌフ・デュ・パプの認定13品種の一つで、最も希少な品種の一つ。フローラルなアロマと軽やかなボディが特徴。ブレンドに華やかさと香りの複雑さを加える役割を持つ。',
  'シャトーヌフ・デュ・パプの極めて希少な品種でフローラルな香りが特徴',
  ARRAY['バラ','スミレ','ラズベリー','ムスク','ハーブ','白胡椒'],
  '{"sweetness":2,"acidity":3,"tannin":2,"body":2,"finish":2}'::jsonb,
  ARRAY['プロヴァンス料理','サラダ・ニソワーズ','軽い肉料理','ハーブチキン'],
  ARRAY['Châteauneuf-du-Pape','Southern Rhône']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 8. Piquepoul Noir
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Piquepoul Noir', 'ピクプール・ノワール', ARRAY['Picpoul Noir'], true,
  'France', 'Languedoc',
  'ラングドック地方の古代品種で、白ブドウのピクプール・ブランの黒ブドウ版。シャトーヌフ・デュ・パプの認定品種の一つでもある。高い酸味と軽やかなボディが特徴で、現在は栽培面積が非常に少ない。',
  '高い酸味と軽やかさを持つラングドックの希少な古代黒ブドウ品種',
  ARRAY['レッドチェリー','クランベリー','ハーブ','柑橘','スパイス','花'],
  '{"sweetness":1,"acidity":4,"tannin":2,"body":2,"finish":2}'::jsonb,
  ARRAY['魚介のグリル','地中海料理','シャルキュトリー','オリーブ料理'],
  ARRAY['Languedoc','Châteauneuf-du-Pape','Southern Rhône']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 9. Sangiovese
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Sangiovese', 'サンジョヴェーゼ', ARRAY['Brunello','Prugnolo Gentile','Morellino','Nielluccio'], true,
  'Italy', 'Tuscany',
  'イタリアで最も広く栽培される黒ブドウ品種で、キャンティやブルネッロ・ディ・モンタルチーノの主要品種。高い酸味としっかりしたタンニン、チェリーやトマトリーフの香りが特徴。テロワールによって多様な表現を見せる。',
  'イタリアを代表する高酸・チェリー風味の赤ワイン品種',
  ARRAY['サワーチェリー','プラム','トマトリーフ','タイム','なめし革','タバコ','スミレ','紅茶'],
  '{"sweetness":2,"acidity":5,"tannin":4,"body":3,"finish":4}'::jsonb,
  ARRAY['ビステッカ・アッラ・フィオレンティーナ','トマトソースパスタ','ラザニア','ペコリーノチーズ','ピッツァ・マルゲリータ'],
  ARRAY['Chianti Classico','Brunello di Montalcino','Vino Nobile di Montepulciano','Morellino di Scansano','Corsica']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 10. Nebbiolo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Nebbiolo', 'ネッビオーロ', ARRAY['Spanna','Chiavennasca','Picoutener'], true,
  'Italy', 'Piedmont',
  'ピエモンテの偉大な品種で、バローロとバルバレスコを生む。淡い色調に反して強いタンニンと高い酸味を持ち、バラやタール、チェリーの複雑なアロマが特徴。長期熟成により真価を発揮する。',
  'バラとタールの香りを持つピエモンテの偉大な長期熟成型品種',
  ARRAY['バラ','タール','チェリー','トリュフ','なめし革','スパイス','紅茶','リコリス'],
  '{"sweetness":1,"acidity":5,"tannin":5,"body":4,"finish":5}'::jsonb,
  ARRAY['白トリュフのタヤリン','ブラザート','アニョロッティ','熟成チーズ','仔牛のロースト'],
  ARRAY['Barolo','Barbaresco','Roero','Gattinara','Valtellina']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 11. Barbera
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Barbera', 'バルベーラ', ARRAY['Barbera d''Asti','Barbera d''Alba'], true,
  'Italy', 'Piedmont',
  'ピエモンテで最も広く栽培される黒ブドウ品種。高い酸味と低いタンニン、豊かな果実味が特徴。ネッビオーロとは対照的に親しみやすいスタイルで、日常的な食事に合わせやすい。',
  '高い酸味と豊かな果実味を持つピエモンテの親しみやすい日常ワイン品種',
  ARRAY['チェリー','プラム','ブラックベリー','スパイス','アーモンド','バニラ'],
  '{"sweetness":2,"acidity":5,"tannin":2,"body":3,"finish":3}'::jsonb,
  ARRAY['ピッツァ','トマトソースパスタ','リゾット','サラミ','ポルケッタ'],
  ARRAY['Barbera d''Asti','Barbera d''Alba','Monferrato','Oltrepò Pavese','Argentina']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 12. Dolcetto
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Dolcetto', 'ドルチェット', ARRAY['Ormeasco'], true,
  'Italy', 'Piedmont',
  'ピエモンテの早飲みタイプの黒ブドウ品種。名前は「小さな甘いもの」に由来するが、ワインは辛口。深い紫色と低い酸味、程よいタンニンが特徴で、若いうちに楽しむフルーティーなワインを生む。',
  '深い色調と低い酸味を持つピエモンテの早飲みフルーティーな品種',
  ARRAY['ブラックチェリー','プラム','アーモンド','リコリス','ブラックベリー','スミレ'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":2}'::jsonb,
  ARRAY['バーニャカウダ','生パスタ','サラミ','フォカッチャ','軽い肉料理'],
  ARRAY['Dolcetto d''Alba','Dolcetto di Dogliani','Dolcetto d''Asti','Dolcetto di Ovada']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 13. Corvina
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Corvina', 'コルヴィーナ', ARRAY['Corvina Veronese','Cruina'], true,
  'Italy', 'Veneto',
  'ヴェネト州を代表する黒ブドウ品種で、ヴァルポリチェッラとアマローネの主要品種。サワーチェリーとアーモンドの香りが特徴的。アパッシメント（陰干し）製法でレーズンのような凝縮感を生み出す。',
  'ヴァルポリチェッラとアマローネの主要品種でサワーチェリーの風味が特徴',
  ARRAY['サワーチェリー','アーモンド','シナモン','プラム','バラ','ハーブ','チョコレート'],
  '{"sweetness":2,"acidity":4,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['リゾット・アッラマローネ','ブラザート','熟成チーズ','パスタ・エ・ファジョーリ','赤身肉のグリル'],
  ARRAY['Valpolicella','Amarone della Valpolicella','Bardolino','Recioto della Valpolicella']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 14. Rondinella
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Rondinella', 'ロンディネッラ', ARRAY[]::text[], true,
  'Italy', 'Veneto',
  'ヴェネト州の黒ブドウ品種で、コルヴィーナと共にヴァルポリチェッラやアマローネのブレンドに使用される。色調の濃さと安定した収量が特徴で、ブレンドに構造と色を与える補助品種として重要。',
  'ヴァルポリチェッラのブレンドに色と構造を与える重要な補助品種',
  ARRAY['チェリー','プラム','ドライフルーツ','スパイス','アーモンド'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":2}'::jsonb,
  ARRAY['パスタ料理','リゾット','グリル肉','トマトベースの料理'],
  ARRAY['Valpolicella','Amarone della Valpolicella','Bardolino']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 15. Molinara
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Molinara', 'モリナーラ', ARRAY[]::text[], true,
  'Italy', 'Veneto',
  'ヴェネト州の伝統的な黒ブドウ品種で、かつてはヴァルポリチェッラのブレンドに必須だった。淡い色調と高い酸味が特徴。近年は使用が減少傾向にあるが、軽やかなスタイルのワインに貢献する。',
  '淡い色調と高い酸味を持つヴァルポリチェッラの伝統的補助品種',
  ARRAY['チェリー','アーモンド','ハーブ','レッドカラント','花'],
  '{"sweetness":2,"acidity":4,"tannin":2,"body":2,"finish":2}'::jsonb,
  ARRAY['軽いパスタ料理','魚介料理','前菜','サラミ'],
  ARRAY['Valpolicella','Bardolino','Veneto']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 16. Nero d'Avola
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Nero d''Avola', 'ネロ・ダーヴォラ', ARRAY['Calabrese'], true,
  'Italy', 'Sicily',
  'シチリア島を代表する黒ブドウ品種で、島全域で広く栽培される。濃厚な果実味とスパイシーなニュアンスが特徴。温暖な気候で豊かなボディを持つワインを生み、シチリアワインのルネサンスを牽引した品種。',
  'シチリアを代表する濃厚な果実味とスパイスを持つ力強い品種',
  ARRAY['ブラックチェリー','プラム','黒胡椒','チョコレート','地中海ハーブ','甘草','タバコ'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":4,"finish":4}'::jsonb,
  ARRAY['仔羊のグリル','カポナータ','アランチーニ','マグロのグリル','ペコリーノ・シチリアーノ'],
  ARRAY['Sicily','Cerasuolo di Vittoria','Noto','Eloro','Menfi']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 17. Nerello Mascalese
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Nerello Mascalese', 'ネレッロ・マスカレーゼ', ARRAY[]::text[], true,
  'Italy', 'Sicily',
  'エトナ山の火山性土壌で栽培されるシチリアの高貴な品種。ピノ・ノワールやネッビオーロに例えられる繊細さとエレガンスを持つ。淡い色調ながら複雑なアロマと長い余韻が特徴で、エトナワインの注目を集めている。',
  'エトナ火山のテロワールを映すエレガントで繊細なシチリアの高貴品種',
  ARRAY['レッドチェリー','バラ','血のオレンジ','火山灰','ハーブ','スパイス','紅茶','鉄'],
  '{"sweetness":1,"acidity":5,"tannin":4,"body":3,"finish":4}'::jsonb,
  ARRAY['マグロのタルタル','パスタ・アッラ・ノルマ','仔羊','エトナ産キノコ料理','カチョカヴァッロチーズ'],
  ARRAY['Etna DOC','Faro DOC','Sicily']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 18. Nerello Cappuccio
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Nerello Cappuccio', 'ネレッロ・カプッチョ', ARRAY['Nerello Mantellato'], true,
  'Italy', 'Sicily',
  'エトナ地域でネレッロ・マスカレーゼと共にブレンドされる黒ブドウ品種。マスカレーゼよりも濃い色調と柔らかなタンニンを持ち、ブレンドに色と果実味の豊かさを加える。単独での醸造は稀。',
  'エトナのブレンドに色と果実味の豊かさを加える補助品種',
  ARRAY['ブラックベリー','プラム','スパイス','ダークチェリー','甘草'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['パスタ料理','肉の煮込み','グリル野菜','シチリア料理'],
  ARRAY['Etna DOC','Faro DOC','Sicily']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 19. Aglianico
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Aglianico', 'アリアニコ', ARRAY['Aglianico del Vulture','Aglianico di Taurasi'], true,
  'Italy', 'Campania',
  '南イタリアを代表する偉大な黒ブドウ品種で、「南のバローロ」とも呼ばれる。非常に強いタンニンと高い酸味を持ち、長期熟成に適している。タウラージとヴルトゥレが二大産地として知られる。',
  '「南のバローロ」と称される強いタンニンと酸味を持つ南イタリアの偉大な品種',
  ARRAY['ブラックチェリー','プラム','チョコレート','タバコ','なめし革','スパイス','火山灰','バラ'],
  '{"sweetness":1,"acidity":5,"tannin":5,"body":5,"finish":5}'::jsonb,
  ARRAY['仔羊のラグー','ラザニア','熟成プロヴォローネ','ブラチオーラ','猪肉のラグー'],
  ARRAY['Taurasi','Aglianico del Vulture','Irpinia','Basilicata','Campania']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 20. Montepulciano
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Montepulciano', 'モンテプルチアーノ', ARRAY['Cordisco'], true,
  'Italy', 'Abruzzo',
  'アブルッツォ州を中心にイタリア中南部で広く栽培される黒ブドウ品種。濃い色調と豊かな果実味、柔らかなタンニンが特徴。コストパフォーマンスの高い日常ワインから高品質なリゼルヴァまで幅広い。同名の町ヴィーノ・ノービレ・ディ・モンテプルチアーノはサンジョヴェーゼ主体。',
  '濃い色調と豊かな果実味を持つイタリア中部の親しみやすい品種',
  ARRAY['ブラックチェリー','プラム','スパイス','黒胡椒','ハーブ','チョコレート'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":4,"finish":3}'::jsonb,
  ARRAY['アロスティチーニ','パスタ・アッラ・キタッラ','ラグーソース','ペコリーノチーズ','ポルケッタ'],
  ARRAY['Montepulciano d''Abruzzo','Rosso Conero','Rosso Piceno','Molise','Puglia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 21. Primitivo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Primitivo', 'プリミティーヴォ', ARRAY['Tribidrag','Crljenak Kaštelanski'], true,
  'Italy', 'Puglia',
  'プーリア州を代表する黒ブドウ品種で、アメリカのジンファンデルと遺伝的に同一。名前は「早熟」に由来し、高い糖度と濃厚な果実味が特徴。温暖な気候でアルコール度数の高い力強いワインを生む。',
  '高い糖度と濃厚な果実味を持つプーリアの力強い品種',
  ARRAY['プラム','ブラックベリー','ドライフルーツ','チョコレート','スパイス','黒胡椒','シナモン'],
  '{"sweetness":3,"acidity":3,"tannin":3,"body":5,"finish":4}'::jsonb,
  ARRAY['オレッキエッテ','仔羊のグリル','ボンボローニ','カポコッロ','ブッラータとトマト'],
  ARRAY['Primitivo di Manduria','Gioia del Colle','Salento','Puglia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 22. Zinfandel
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Zinfandel', 'ジンファンデル', ARRAY['Zin','Primitivo','Tribidrag'], true,
  'USA', 'California',
  'カリフォルニアを代表する品種で、イタリアのプリミティーヴォと遺伝的に同一。ジャミーな果実味と高いアルコール度数が特徴。オールドヴァインから造られるものは特に凝縮感があり、ホワイト・ジンファンデルというロゼスタイルも有名。',
  'カリフォルニアを代表するジャミーで果実味豊かな高アルコール品種',
  ARRAY['ブラックベリー','ラズベリージャム','黒胡椒','プラム','チョコレート','シナモン','バニラ','クローブ'],
  '{"sweetness":3,"acidity":3,"tannin":3,"body":5,"finish":4}'::jsonb,
  ARRAY['BBQリブ','ハンバーガー','スパイシーソーセージ','トライチップ','スモークブリスケット'],
  ARRAY['Sonoma County','Paso Robles','Lodi','Dry Creek Valley','Amador County']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 23. Sagrantino
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Sagrantino', 'サグランティーノ', ARRAY[]::text[], true,
  'Italy', 'Umbria',
  'ウンブリア州モンテファルコ周辺でのみ栽培される希少な品種。世界で最もタンニンが豊富なブドウ品種の一つとされる。非常に濃い色調と強靭な構造を持ち、長期熟成によりブラックベリーやスパイスの複雑な風味を発揮する。',
  '世界屈指のタンニン量を持つウンブリアの希少で力強い品種',
  ARRAY['ブラックベリー','プラム','チョコレート','なめし革','スパイス','コーヒー','鉄','バルサミコ'],
  '{"sweetness":1,"acidity":4,"tannin":5,"body":5,"finish":5}'::jsonb,
  ARRAY['猪肉のラグー','仔羊のグリル','ポルケッタ','熟成ペコリーノ','黒トリュフ料理'],
  ARRAY['Montefalco Sagrantino','Montefalco','Umbria']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 24. Lagrein
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Lagrein', 'ラグレイン', ARRAY[]::text[], true,
  'Italy', 'Alto Adige',
  'アルト・アディジェ州（南チロル）原産の黒ブドウ品種。濃い色調と豊かなベリーの果実味、チョコレートのニュアンスが特徴。ロゼ（クレッツァー）と赤（ドゥンケル）の両スタイルで造られる。',
  '濃い色調と豊かなベリー風味を持つアルト・アディジェの個性的品種',
  ARRAY['ブラックベリー','チョコレート','プラム','スミレ','スパイス','コーヒー'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":4,"finish":3}'::jsonb,
  ARRAY['スペック','シュニッツェル','カネーデルリ','鹿肉のロースト','熟成チーズ'],
  ARRAY['Alto Adige','Bolzano','Trentino','South Tyrol']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 25. Teroldego
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Teroldego', 'テロルデゴ', ARRAY['Teroldego Rotaliano'], true,
  'Italy', 'Trentino',
  'トレンティーノ州ロタリアーノ平野原産の黒ブドウ品種。深いルビー色と豊かなベリーの果実味、スパイシーなニュアンスが特徴。ラグレインの近縁種とされ、しっかりした構造を持つワインを生む。',
  '深い色調とベリーの果実味を持つトレンティーノのスパイシーな品種',
  ARRAY['ブラックベリー','ブルーベリー','チョコレート','スパイス','スミレ','アーモンド'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":4,"finish":3}'::jsonb,
  ARRAY['ポレンタと肉料理','カネーデルリ','鹿肉','スペック','キノコのリゾット'],
  ARRAY['Teroldego Rotaliano','Trentino','Campo Rotaliano']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 26. Schioppettino
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Schioppettino', 'スキオペッティーノ', ARRAY['Ribolla Nera','Pocalza'], true,
  'Italy', 'Friuli-Venezia Giulia',
  'フリウリ州の希少な土着品種で、一時は絶滅の危機にあった。独特のスパイシーさと黒胡椒の風味が特徴的。繊細でありながら複雑な味わいを持ち、ナチュラルワインの生産者にも注目されている。',
  '黒胡椒とスパイスの個性的な風味を持つフリウリの希少な復活品種',
  ARRAY['黒胡椒','ブラックベリー','スパイス','スミレ','ハーブ','ジュニパー','プラム'],
  '{"sweetness":1,"acidity":4,"tannin":3,"body":3,"finish":4}'::jsonb,
  ARRAY['フリコ','サラミ','ジビエ料理','ポレンタ','モンターズィオチーズ'],
  ARRAY['Friuli Colli Orientali','Prepotto','Friuli-Venezia Giulia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 27. Refosco
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Refosco', 'レフォスコ', ARRAY['Refosco dal Peduncolo Rosso','Terrano'], true,
  'Italy', 'Friuli-Venezia Giulia',
  'フリウリ州を中心に北東イタリアで栽培される黒ブドウ品種群の総称。中でもレフォスコ・ダル・ペドゥンコロ・ロッソが最も知られる。濃い色調と高い酸味、しっかりしたタンニンが特徴で、プラムやスパイスの風味を持つ。',
  '濃い色調と高い酸味を持つフリウリの力強い土着品種',
  ARRAY['プラム','ブラックベリー','スパイス','黒胡椒','スミレ','ハーブ','チョコレート'],
  '{"sweetness":1,"acidity":4,"tannin":4,"body":4,"finish":3}'::jsonb,
  ARRAY['グーラッシュ','ポレンタと肉料理','サン・ダニエーレの生ハム','グリル肉','チーズ'],
  ARRAY['Friuli Colli Orientali','Carso','Friuli-Venezia Giulia','Slovenia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 28. Canaiolo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Canaiolo', 'カナイオーロ', ARRAY['Canaiolo Nero','Canagiolo'], true,
  'Italy', 'Tuscany',
  'トスカーナの伝統的な黒ブドウ品種で、歴史的にキャンティのブレンドでサンジョヴェーゼと共に使用されてきた。柔らかなタンニンと果実味を持ち、ブレンドに柔軟さとフルーティーさを加える。',
  'キャンティの伝統的ブレンド品種で柔らかさとフルーティーさを加える',
  ARRAY['チェリー','プラム','スミレ','ハーブ','アーモンド','ラズベリー'],
  '{"sweetness":2,"acidity":3,"tannin":2,"body":3,"finish":2}'::jsonb,
  ARRAY['リボッリータ','パッパルデッレ','ペコリーノ・トスカーノ','クロスティーニ','サルシッチャ'],
  ARRAY['Chianti','Chianti Classico','Tuscany','Umbria']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 29. Colorino
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Colorino', 'コロリーノ', ARRAY['Colorino del Valdarno'], true,
  'Italy', 'Tuscany',
  'トスカーナの補助品種で、その名の通り色素が非常に豊富。キャンティやブルネッロのブレンドに少量加えられ、色調の濃さと柔らかなタンニンを与える。単独で醸造されることは稀だが、一部の生産者が注目している。',
  '色素が極めて豊富でブレンドに色の深さと柔らかさを与えるトスカーナの補助品種',
  ARRAY['ブラックベリー','プラム','スパイス','スミレ','チョコレート'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":2}'::jsonb,
  ARRAY['トスカーナ料理全般','パスタ','グリル肉','チーズ'],
  ARRAY['Chianti','Chianti Classico','Tuscany']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 30. Cesanese
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Cesanese', 'チェザネーゼ', ARRAY['Cesanese d''Affile','Cesanese Comune'], true,
  'Italy', 'Lazio',
  'ラツィオ州を代表する数少ない高品質な黒ブドウ品種。チェリーやスパイスの風味と適度なタンニンが特徴。近年品質向上が著しく、ローマ近郊のワイン産地として注目を集めている。',
  'ラツィオ州を代表するチェリーとスパイスの風味を持つ注目の品種',
  ARRAY['サワーチェリー','スパイス','ハーブ','黒胡椒','プラム','花'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['アマトリチャーナ','カルボナーラ','アバッキオ','ポルケッタ','ペコリーノ・ロマーノ'],
  ARRAY['Cesanese del Piglio','Cesanese di Olevano Romano','Cesanese di Affile','Lazio']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 31. Gaglioppo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Gaglioppo', 'ガリオッポ', ARRAY['Magliocco'], true,
  'Italy', 'Calabria',
  'カラブリア州を代表する黒ブドウ品種で、チロDOCの主要品種。淡い色調ながら高い酸味とタンニンを持ち、ネッビオーロに似た特徴を見せる。地中海性気候の中で独特の個性を発揮する品種。',
  '淡い色調ながら高い酸味とタンニンを持つカラブリアの主要品種',
  ARRAY['チェリー','ドライフルーツ','スパイス','なめし革','ハーブ','オレンジピール','タバコ'],
  '{"sweetness":2,"acidity":4,"tannin":4,"body":3,"finish":3}'::jsonb,
  ARRAY['ンドゥーヤ','ソップレッサータ','カラブリアのパスタ料理','仔羊','ペコリーノ・クロトネーゼ'],
  ARRAY['Cirò','Melissa','Calabria','Savuto']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 32. Negroamaro
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Negroamaro', 'ネグロアマーロ', ARRAY['Negro Amaro'], true,
  'Italy', 'Puglia',
  'プーリア州サレント半島を代表する黒ブドウ品種。名前は「黒くて苦い」を意味する。濃厚な果実味とほろ苦いフィニッシュが特徴。赤ワインの他、優れたロゼワインの原料としても知られる。',
  '「黒くて苦い」を意味する濃厚な果実味とほろ苦さを持つサレントの品種',
  ARRAY['ブラックチェリー','プラム','タバコ','ハーブ','チョコレート','黒オリーブ','スパイス'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":4,"finish":4}'::jsonb,
  ARRAY['オレッキエッテとチーマ・ディ・ラーパ','仔羊のグリル','フリセッデ','ブッラータ','カポコッロ'],
  ARRAY['Salice Salentino','Salento','Puglia','Copertino','Leverano']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 33. Frappato
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Frappato', 'フラッパート', ARRAY['Frappato di Vittoria'], true,
  'Italy', 'Sicily',
  'シチリア島南東部ヴィットーリア地区を代表する黒ブドウ品種。軽やかでフルーティーな味わいが特徴で、イチゴやバラの華やかな香りを持つ。ネロ・ダーヴォラとブレンドしてチェラスオーロ・ディ・ヴィットーリアを構成する。',
  'イチゴとバラの華やかな香りを持つシチリアの軽やかでエレガントな品種',
  ARRAY['イチゴ','ラズベリー','バラ','ハーブ','スパイス','チェリー'],
  '{"sweetness":2,"acidity":4,"tannin":2,"body":2,"finish":3}'::jsonb,
  ARRAY['マグロのタルタル','カポナータ','ピッツァ','シチリアのシーフード','軽いパスタ料理'],
  ARRAY['Cerasuolo di Vittoria','Vittoria','Sicily','Ragusa']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 34. Grignolino
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Grignolino', 'グリニョリーノ', ARRAY[]::text[], true,
  'Italy', 'Piedmont',
  'ピエモンテ州アスティとモンフェッラート周辺で栽培される黒ブドウ品種。淡い色調とオレンジがかった色味が特徴。高い酸味と独特のタンニン、ほろ苦いアーモンドのニュアンスを持つ個性的なワインを生む。',
  '淡い色調とアーモンドのほろ苦さを持つピエモンテの個性的品種',
  ARRAY['チェリー','アーモンド','バラ','白胡椒','オレンジピール','ハーブ'],
  '{"sweetness":1,"acidity":4,"tannin":3,"body":2,"finish":3}'::jsonb,
  ARRAY['ヴィテッロ・トンナート','前菜','サラミ','バーニャカウダ','軽い肉料理'],
  ARRAY['Grignolino d''Asti','Grignolino del Monferrato Casalese','Piedmont']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 35. Freisa
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Freisa', 'フレイザ', ARRAY['Freisa d''Asti','Freisa di Chieri'], true,
  'Italy', 'Piedmont',
  'ピエモンテの古い品種で、ネッビオーロの親品種の一つとされる。ラズベリーやイチゴの香りと高い酸味が特徴。辛口からやや甘口、微発泡まで多様なスタイルで造られる。近年再評価が進んでいる。',
  'ラズベリーの華やかな香りと高い酸味を持つネッビオーロの祖先品種',
  ARRAY['ラズベリー','イチゴ','バラ','スパイス','ハーブ','スミレ'],
  '{"sweetness":2,"acidity":4,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['サラミ','前菜','アニョロッティ','フリット・ミスト','軽い肉料理'],
  ARRAY['Freisa d''Asti','Freisa di Chieri','Langhe','Piedmont']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 36. Ruché
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Ruché', 'ルケ', ARRAY['Rouchet','Ruché di Castagnole Monferrato'], true,
  'Italy', 'Piedmont',
  'ピエモンテ州カスタニョーレ・モンフェッラート周辺でのみ栽培される非常に希少な品種。極めてアロマティックで、バラやスミレ、スパイスの華やかな香りが特徴。「ピエモンテのゲヴュルツトラミネール」とも呼ばれる。',
  '極めてアロマティックでバラとスパイスの華やかな香りを持つピエモンテの希少品種',
  ARRAY['バラ','スミレ','ラズベリー','スパイス','白胡椒','ムスク','シナモン','クローブ'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['前菜','サラミ','アジア料理','スパイシーな料理','チーズ','グリッシーニ'],
  ARRAY['Ruché di Castagnole Monferrato','Monferrato','Piedmont']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 37. Bonarda
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Bonarda', 'ボナルダ', ARRAY['Bonarda Piemontese','Croatina'], true,
  'Italy', 'Piedmont',
  'イタリアとアルゼンチンで栽培される黒ブドウ品種。イタリアではピエモンテのボナルダ・ピエモンテーゼとロンバルディアのクロアティーナ（ボナルダ名義）が異なる品種。アルゼンチンではマルベックに次ぐ栽培面積で、フルーティーで親しみやすいワインを生む。',
  'イタリアとアルゼンチンで親しまれるフルーティーで柔らかな赤ワイン品種',
  ARRAY['チェリー','プラム','ブラックベリー','スパイス','スミレ','アーモンド'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":2}'::jsonb,
  ARRAY['エンパナーダ','アサード','サラミ','パスタ料理','ポレンタ'],
  ARRAY['Oltrepò Pavese','Mendoza','Piedmont','Colli Piacentini','Argentina']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- Seed data for white grape varieties (Batch 3)
-- 78 white grape varieties from around the world

-- 1. Chardonnay
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Chardonnay', 'シャルドネ', ARRAY['Morillon'], false,
  'France', 'Burgundy',
  '世界で最も広く栽培されている白ブドウ品種。テロワールや醸造方法によって多彩な表情を見せ、冷涼な気候ではシャープな酸味とミネラル感、温暖な気候ではトロピカルフルーツのような豊かな果実味を持つ。樽発酵・樽熟成によりバターやバニラのニュアンスが加わる。',
  'テロワールを映す万能品種で、樽熟成からステンレス発酵まで多様なスタイルを生む',
  ARRAY['青りんご','洋梨','レモン','バター','バニラ','白桃','ヘーゼルナッツ','白い花'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['ロブスター','鶏肉のクリームソース','白身魚のムニエル','グラタン','ブリーチーズ'],
  ARRAY['Burgundy','Champagne','Napa Valley','Margaret River','Adelaide Hills']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 2. Sauvignon Blanc
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Sauvignon Blanc', 'ソーヴィニヨン・ブラン', ARRAY['Fumé Blanc'], false,
  'France', 'Loire Valley',
  'フランス・ロワール地方原産の芳香性白ブドウ品種。鮮烈なハーブ香と爽快な酸味が特徴で、グレープフルーツやパッションフルーツなどの柑橘・トロピカル系アロマを持つ。ニュージーランド・マールボロ産は特に華やかな果実味で世界的人気を博している。',
  '鮮烈なハーブ香と爽やかな酸味が際立つ芳香性品種',
  ARRAY['グレープフルーツ','パッションフルーツ','ハーブ','青草','ライム','白桃','火打石','エルダーフラワー'],
  '{"sweetness":1,"acidity":5,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['シェーヴルチーズ','生牡蠣','アスパラガスのグリル','白身魚のカルパッチョ','エビのサラダ'],
  ARRAY['Loire Valley','Marlborough','Bordeaux','Sancerre','Casablanca Valley']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 3. Riesling
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Riesling', 'リースリング', ARRAY['Rheinriesling'], false,
  'Germany', 'Rhine',
  'ドイツ原産の高貴白ブドウ品種で、世界最高の白ワイン用品種の一つ。辛口から極甘口まで幅広いスタイルに対応し、卓越した酸味と華やかなアロマが特徴。長期熟成が可能で、熟成とともにペトロール香と呼ばれる独特の石油香を発展させる。',
  '高い酸味と華やかなアロマを持ち、辛口から極甘口まで多様なスタイルを生む高貴品種',
  ARRAY['ライム','白桃','アプリコット','ペトロール','蜂蜜','ジャスミン','スレート','りんご'],
  '{"sweetness":3,"acidity":5,"tannin":null,"body":2,"finish":4}'::jsonb,
  ARRAY['スパイシーなアジア料理','豚肉のロースト','フォアグラ','ウォッシュチーズ','天ぷら','寿司'],
  ARRAY['Mosel','Alsace','Rheingau','Clare Valley','Wachau']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 4. Pinot Grigio
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Pinot Grigio', 'ピノ・グリージョ', ARRAY['Pinot Gris','Grauburgunder'], false,
  'France', 'Alsace',
  'ピノ・ノワールの突然変異種で、灰色がかったピンクの果皮を持つ。イタリアではピノ・グリージョとして軽快でクリスプなスタイル、アルザスではピノ・グリとしてリッチでコクのあるスタイルが主流。幅広い料理との相性が良く、世界中で人気が高い。',
  '産地によって軽快からリッチまで幅広いスタイルを持つ万能白品種',
  ARRAY['洋梨','りんご','レモン','アーモンド','蜂蜜','白い花','ジンジャー'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['魚介のフリット','パスタプリマヴェーラ','鶏肉のグリル','サラダ','軽めの前菜'],
  ARRAY['Alsace','Alto Adige','Friuli','Oregon','Baden']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 5. Gewürztraminer
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Gewürztraminer', 'ゲヴュルツトラミネール', ARRAY['Traminer'], false,
  'France', 'Alsace',
  '極めて芳香性の高い白ブドウ品種で、ライチやバラの花の華やかなアロマが特徴的。「Gewürz」はドイツ語で「スパイス」を意味する。低い酸味とリッチなボディを持ち、辛口から貴腐ワインまで幅広いスタイルで醸造される。',
  'ライチやバラの圧倒的な芳香と豊かなボディが特徴のアロマティック品種',
  ARRAY['ライチ','バラ','ジンジャー','マンゴー','パッションフルーツ','シナモン','クローブ','グレープフルーツ'],
  '{"sweetness":3,"acidity":2,"tannin":null,"body":4,"finish":4}'::jsonb,
  ARRAY['フォアグラ','中華料理','タイ料理','ウォッシュチーズ','スパイシーカレー'],
  ARRAY['Alsace','Alto Adige','Pfalz','New Zealand','Chile']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 6. Viognier
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Viognier', 'ヴィオニエ', ARRAY[]::text[], false,
  'France', 'Rhône Valley',
  'フランス・ローヌ地方コンドリュー原産の芳香性白品種。アプリコットやピーチ、スミレの花の豊かなアロマと、ふくよかなボディが特徴。一時は絶滅寸前まで栽培面積が減少したが、1990年代以降世界的に復興を遂げた。',
  'アプリコットやスミレの花の華やかな香りとふくよかなボディが魅力のローヌ原産品種',
  ARRAY['アプリコット','白桃','スミレ','蜂蜜','ジンジャー','オレンジの花'],
  '{"sweetness":2,"acidity":2,"tannin":null,"body":4,"finish":3}'::jsonb,
  ARRAY['鶏肉のクリーム煮','ロブスター','スパイシーな魚料理','アプリコットタルト','クリーミーなリゾット'],
  ARRAY['Condrieu','Languedoc','Central Coast California','Virginia','Eden Valley']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 7. Sémillon
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Sémillon', 'セミヨン', ARRAY['Semillon'], false,
  'France', 'Bordeaux',
  'ボルドー原産で、ソーテルヌの貴腐ワインの主要品種として名高い。薄い果皮が貴腐菌の付着に適しており、世界最高峰の甘口ワインを生む。辛口ではハンター・ヴァレーが有名で、熟成とともにトーストやナッツの複雑な風味を発展させる。',
  '貴腐ワインの主要品種であり、辛口でも熟成により複雑さを増す万能なブドウ',
  ARRAY['レモン','蜂蜜','ラノリン','セージ','アプリコット','トースト','ナッツ'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['フォアグラ','ロックフォールチーズ','クレームブリュレ','白身魚のバターソース','鶏レバーのパテ'],
  ARRAY['Sauternes','Hunter Valley','Barossa Valley','Bordeaux','Franschhoek']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 8. Muscat
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Muscat', 'ミュスカ', ARRAY['Moscato','Muscat Blanc'], false,
  'Greece', 'Mediterranean',
  '最も古いブドウ品種の一つで、200以上の変種が存在する広大なファミリー。マスカット・ブラン・ア・プティ・グランが最も高貴とされ、ブドウそのものの香りを忠実に反映する稀有な品種。辛口から甘口、スパークリングまで多彩なスタイルで醸造される。',
  'ブドウの香りをそのまま表現する最古の品種群で、甘口からスパークリングまで多彩',
  ARRAY['マスカット','オレンジの花','バラ','ライチ','蜂蜜','ピーチ','レモンの皮'],
  '{"sweetness":3,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['フルーツタルト','スパイシーなエスニック料理','ブルーチーズ','アペリティフ','フレッシュフルーツ'],
  ARRAY['Asti','Alsace','Beaumes-de-Venise','Rutherglen','Samos']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 9. Pinot Blanc
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Pinot Blanc', 'ピノ・ブラン', ARRAY['Weißburgunder','Pinot Bianco'], false,
  'France', 'Alsace',
  'ピノ・ノワールの突然変異種で、穏やかな香りとバランスの取れた味わいが特徴。アルザスではクレマン・ダルザスの主要品種として使われ、イタリアではピノ・ビアンコとして北部で高品質なワインを生む。ドイツではヴァイスブルグンダーとして人気が高い。',
  '穏やかなアロマとバランスの良い味わいで、食事に寄り添う万能な白品種',
  ARRAY['りんご','洋梨','アーモンド','白い花','レモン','ミネラル'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['白身魚のソテー','キッシュ','タルトフランベ','サラダ','軽めのパスタ'],
  ARRAY['Alsace','Alto Adige','Baden','Pfalz','Willamette Valley']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 10. Chenin Blanc
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Chenin Blanc', 'シュナン・ブラン', ARRAY['Steen'], false,
  'France', 'Loire Valley',
  'ロワール地方原産の万能品種で、辛口から甘口、スパークリングまで幅広いスタイルに対応する。高い酸味が特徴で、長期熟成が可能。南アフリカでは「スティーン」と呼ばれ最も栽培面積の大きい白品種として重要な役割を果たしている。',
  '高い酸味と多様なスタイルへの適応力を持つロワールの万能品種',
  ARRAY['青りんご','洋梨','蜂蜜','カリン','アカシアの花','ジンジャー','ラノリン'],
  '{"sweetness":3,"acidity":5,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['豚肉のリエット','アップルタルト','タイ料理','フレッシュチーズ','鶏肉のロースト'],
  ARRAY['Vouvray','Savennières','Saumur','Stellenbosch','Swartland']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 11. Melon de Bourgogne
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Melon de Bourgogne', 'ムロン・ド・ブルゴーニュ', ARRAY['Muscadet'], false,
  'France', 'Loire Valley',
  'ブルゴーニュ原産だが現在はロワール河口のナント地域で主に栽培される品種。ミュスカデワインの唯一の品種で、シュール・リー製法により旨味と複雑さが加わる。潮風の影響を受けた畑からはミネラル豊かな海を思わせるワインが生まれる。',
  'ミュスカデの唯一の品種で、シュール・リーにより旨味とミネラル感が際立つ',
  ARRAY['レモン','青りんご','潮風','小麦粉','ミネラル','白い花'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['生牡蠣','ムール貝','白身魚のグリル','シーフードプラッター','エビのフリット'],
  ARRAY['Muscadet Sèvre-et-Maine','Muscadet Côtes de Grandlieu','Nantais','Loire Valley']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 12. Marsanne
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Marsanne', 'マルサンヌ', ARRAY[]::text[], false,
  'France', 'Rhône Valley',
  'フランス北ローヌ原産の白品種で、ルーサンヌとブレンドされることが多い。低めの酸味とふくよかなボディが特徴で、アーモンドやマジパンの風味を持つ。エルミタージュでは長期熟成可能な偉大な白ワインを生み出す。',
  'ふくよかなボディとアーモンド風味が特徴の北ローヌ原産品種',
  ARRAY['アーモンド','マジパン','洋梨','白桃','アカシアの花','スパイス'],
  '{"sweetness":2,"acidity":2,"tannin":null,"body":4,"finish":3}'::jsonb,
  ARRAY['鶏肉のクリームソース','ロブスターのグリル','リゾット','白身魚のバターソース','前菜の盛り合わせ'],
  ARRAY['Hermitage','Saint-Joseph','Crozes-Hermitage','Languedoc','Victoria']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 13. Roussanne
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Roussanne', 'ルーサンヌ', ARRAY[]::text[], false,
  'France', 'Rhône Valley',
  'フランス北ローヌ原産で、マルサンヌとブレンドされることが多いが、より繊細で複雑な香りを持つ。果皮が赤茶色に色づくことから「ルーサンヌ（赤みがかった）」の名がついた。ハーブティーやドライフラワーの繊細なアロマが魅力。',
  '繊細なハーブ香と優れた酸味を持つ北ローヌの高貴な白品種',
  ARRAY['ハーブティー','洋梨','アプリコット','蜂蜜','ドライフラワー','ナッツ'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['仔牛のクリーム煮','白トリュフのパスタ','ラタトゥイユ','チキンのハーブロースト','シェーヴルチーズ'],
  ARRAY['Hermitage','Châteauneuf-du-Pape','Saint-Joseph','Languedoc','Paso Robles']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 14. Savagnin
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Savagnin', 'サヴァニャン', ARRAY[]::text[], false,
  'France', 'Jura',
  'フランス・ジュラ地方固有の品種で、ヴァン・ジョーヌ（黄ワイン）の唯一の品種として知られる。産膜酵母の下で6年3ヶ月以上熟成させることで、クルミやカレースパイスの独特の風味を発展させる。ゲヴュルツトラミネールの親品種とされている。',
  'ヴァン・ジョーヌの唯一の品種で、酸化熟成によりクルミやスパイスの独特な風味を持つ',
  ARRAY['クルミ','カレースパイス','りんご','蜂蜜','サフラン','ドライフルーツ'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":4,"finish":5}'::jsonb,
  ARRAY['コンテチーズ','鶏肉のヴァン・ジョーヌソース','モリーユ茸','フォアグラ','クルミのサラダ'],
  ARRAY['Jura','Château-Chalon','Arbois','L''Étoile']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 15. Aligoté
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Aligoté', 'アリゴテ', ARRAY[]::text[], false,
  'France', 'Burgundy',
  'ブルゴーニュ原産の白品種で、シャルドネに次ぐ第二の白品種として位置づけられる。鮮やかな酸味とレモンのようなシトラスの風味が特徴。ブーズロンでは唯一のAOCアリゴテが認められており、キール（白ワインとカシスリキュール）の伝統的なベースワインとしても知られる。',
  '鮮やかな酸味とシトラスの風味を持つブルゴーニュの第二の白品種',
  ARRAY['レモン','青りんご','ミネラル','白い花','グレープフルーツ'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['エスカルゴ','シェーヴルチーズ','生ハム','魚介のマリネ','グジェール'],
  ARRAY['Bouzeron','Burgundy','Eastern Europe','Moldova']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 16. Clairette
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Clairette', 'クレレット', ARRAY[]::text[], false,
  'France', 'Rhône Valley',
  'フランス南部原産の古代品種で、ローヌ地方とラングドック地方で広く栽培される。クレレット・ド・ディーのスパークリングワインの主要品種として知られる。低めの酸味とフローラルな香りが特徴で、シャトーヌフ・デュ・パプの白ワインにもブレンドされる。',
  'フローラルな香りと穏やかな酸味を持つ南仏の古代品種',
  ARRAY['白い花','りんご','洋梨','アーモンド','アニス','蜂蜜'],
  '{"sweetness":2,"acidity":2,"tannin":null,"body":3,"finish":2}'::jsonb,
  ARRAY['プロヴァンス料理','魚介のブイヤベース','ラタトゥイユ','チーズのグラタン','オリーブ料理'],
  ARRAY['Clairette de Die','Châteauneuf-du-Pape','Languedoc','Bellet']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 17. Ugni Blanc
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Ugni Blanc', 'ユニ・ブラン', ARRAY['Trebbiano','Saint-Émilion'], false,
  'Italy', 'Tuscany',
  'イタリア原産（トレッビアーノ）で、フランスではユニ・ブランと呼ばれる世界で最も栽培面積の大きい白品種の一つ。フランスではコニャックやアルマニャックの蒸留用ベースワインとして最重要品種。高い酸味と中性的な風味が蒸留に適している。',
  '世界最大規模の栽培面積を持ち、コニャックの蒸留用ベースとして最も重要な品種',
  ARRAY['レモン','青りんご','ハーブ','アーモンド','白い花'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['軽い前菜','白身魚のカルパッチョ','サラダ','シーフードパスタ','ブルスケッタ'],
  ARRAY['Cognac','Armagnac','Tuscany','Emilia-Romagna','Provence']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 18. Colombard
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Colombard', 'コロンバール', ARRAY[]::text[], false,
  'France', 'Gascony',
  'フランス南西部原産で、かつてはコニャックやアルマニャックの蒸留用として主に使われていた。近年はコート・ド・ガスコーニュで爽やかなテーブルワインとして人気を集めている。トロピカルフルーツのアロマと鮮やかな酸味が特徴で、コストパフォーマンスに優れる。',
  'トロピカルな果実味と鮮やかな酸味を持つ南西フランスの実用的品種',
  ARRAY['グレープフルーツ','パイナップル','ライム','パッションフルーツ','白い花'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['シーフードサラダ','生春巻き','白身魚のグリル','アペリティフ','軽いパスタ'],
  ARRAY['Côtes de Gascogne','Armagnac','California','South Africa','Gers']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 19. Picpoul
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Picpoul', 'ピクプール', ARRAY[]::text[], false,
  'France', 'Languedoc',
  'フランス・ラングドック地方原産の古代品種で、名前は「唇を刺す」という意味で鮮烈な酸味に由来する。ピクプール・ド・ピネのAOCで知られ、地中海沿いのトー湖周辺で栽培される。牡蠣との相性が抜群で「ラングドックのミュスカデ」とも呼ばれる。',
  '鮮烈な酸味と塩味のミネラル感が特徴の地中海沿岸の古代品種',
  ARRAY['レモン','グレープフルーツ','白い花','ハーブ','塩味のミネラル','青りんご'],
  '{"sweetness":1,"acidity":5,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['生牡蠣','ムール貝のマリニエール','地中海風魚料理','シーフードプラッター','ブイヤベース'],
  ARRAY['Picpoul de Pinet','Languedoc','Thau Basin']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 20. Gros Manseng
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Gros Manseng', 'グロ・マンサン', ARRAY[]::text[], false,
  'France', 'South-West France',
  'フランス南西部バスク地方原産の品種で、ジュランソンの辛口・甘口ワインの主要品種。厚い果皮を持ち、高い酸味とトロピカルフルーツのアロマが特徴。プティ・マンサンより粒が大きく収量が多いため、主に辛口ワインに使われる。',
  '高い酸味とトロピカルな果実味を持つ南西フランスの土着品種',
  ARRAY['グレープフルーツ','パイナップル','マンゴー','アプリコット','白い花','スパイス'],
  '{"sweetness":2,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['フォアグラのテリーヌ','バスク風鶏肉','ピペラード','チーズ','スパイシーな魚料理'],
  ARRAY['Jurançon','Pacherenc du Vic-Bilh','Côtes de Gascogne','Béarn']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 21. Petit Manseng
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Petit Manseng', 'プティ・マンサン', ARRAY[]::text[], false,
  'France', 'South-West France',
  'フランス南西部原産で、ジュランソンの甘口ワインの最高品種として知られる。小さな粒と厚い果皮を持ち、樹上で遅摘みすることで糖度が凝縮される。極めて高い酸味がバランスを保ち、トロピカルフルーツとスパイスの複雑な風味を持つ。',
  '小粒で凝縮感が高く、遅摘みにより極上の甘口ワインを生む南西フランスの宝',
  ARRAY['パイナップル','マンゴー','カリン','アプリコット','蜂蜜','シナモン','ジンジャー'],
  '{"sweetness":4,"acidity":5,"tannin":null,"body":4,"finish":5}'::jsonb,
  ARRAY['フォアグラ','ロックフォールチーズ','スパイシーなアジア料理','アプリコットタルト','ブルーチーズ'],
  ARRAY['Jurançon','Pacherenc du Vic-Bilh','Virginia','Uruguay']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 22. Len de l'El
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Len de l''El', 'ラン・ド・レル', ARRAY[]::text[], false,
  'France', 'Gaillac',
  'フランス南西部ガイヤック原産の古代品種で、名前はオック語で「目の届かないところ」を意味し、果房が長い茎でぶら下がる特徴に由来する。穏やかな酸味とリンゴや洋梨のフレッシュなアロマが特徴。甘口から辛口まで幅広いスタイルで醸造される。',
  'ガイヤック固有の古代品種で、穏やかな酸味とフレッシュな果実味が魅力',
  ARRAY['りんご','洋梨','蜂蜜','白い花','柑橘類'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['南西フランスの郷土料理','鴨のコンフィ','白身魚のグリル','チーズ'],
  ARRAY['Gaillac','Tarn','South-West France']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 23. Petit Courbu
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Petit Courbu', 'プティ・クルビュ', ARRAY[]::text[], false,
  'France', 'South-West France',
  'フランス南西部ピレネー山麓原産の希少品種。ジュランソンやパシュラン・デュ・ヴィック・ビルのブレンドに補助品種として使われる。名前は「短く曲がった」を意味し、小さな果房の形状に由来する。花のアロマとフレッシュな酸味が特徴。',
  'ピレネー山麓の希少品種で、ブレンドに花のアロマとフレッシュさを加える補助品種',
  ARRAY['白い花','りんご','洋梨','柑橘類','蜂蜜'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['バスク風魚料理','山羊チーズ','ピペラード','白身魚'],
  ARRAY['Jurançon','Pacherenc du Vic-Bilh','Béarn']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 24. Jacquère
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Jacquère', 'ジャケール', ARRAY[]::text[], false,
  'France', 'Savoie',
  'フランス・サヴォワ地方で最も栽培面積の大きい白品種。アルプスの山麓で育ち、軽やかなボディと爽快な酸味、繊細なミネラル感が特徴。ヴァン・ド・サヴォワのアビマンやアプルモンなどのクリュで高品質なワインを生む。',
  'サヴォワ地方の主要白品種で、軽やかなボディとアルプスのミネラル感が魅力',
  ARRAY['レモン','白い花','ミネラル','青りんご','ハーブ'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":1,"finish":2}'::jsonb,
  ARRAY['サヴォワ風フォンデュ','ラクレット','淡水魚のムニエル','タルティフレット','生ハム'],
  ARRAY['Apremont','Abymes','Savoie','Chignin']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 25. Altesse
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Altesse', 'アルテス', ARRAY['Roussette'], false,
  'France', 'Savoie',
  'フランス・サヴォワ地方原産の高貴な白品種で、ルーセット・ド・サヴォワの唯一の品種。15世紀にキプロスから持ち込まれたとも伝えられる。蜂蜜やドライフルーツの豊かなアロマと、しっかりとした酸味・ミネラル感を併せ持ち、熟成ポテンシャルも高い。',
  'サヴォワの高貴品種で、蜂蜜やドライフルーツの豊かなアロマと優れた熟成力を持つ',
  ARRAY['蜂蜜','ドライフルーツ','アプリコット','ナッツ','白い花','ミネラル'],
  '{"sweetness":2,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['フォンデュ・サヴォワヤルド','淡水魚','クレフィッシュ','コンテチーズ','鶏肉のクリーム煮'],
  ARRAY['Roussette de Savoie','Frangy','Marestel','Monthoux','Bugey']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 26. Muscadelle
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Muscadelle', 'ミュスカデル', ARRAY[]::text[], false,
  'France', 'Bordeaux',
  'ボルドー原産でマスカット系とは無関係の品種だが、マスカットに似たフローラルなアロマを持つ。ボルドーの白ワインブレンドに少量加えられ、花の香りと芳醇さを補う。ソーテルヌの貴腐ワインにもセミヨン、ソーヴィニヨン・ブランとともにブレンドされる。',
  'マスカットに似た花の香りを持ち、ボルドーの白ワインブレンドに華やかさを加える品種',
  ARRAY['マスカット','スイカズラ','白い花','洋梨','蜂蜜','ライチ'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['白身魚のムニエル','シーフードサラダ','フルーツサラダ','軽い前菜'],
  ARRAY['Bordeaux','Sauternes','Bergerac','Rutherglen']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 27. Rolle
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Rolle', 'ロール', ARRAY[]::text[], false,
  'France', 'Provence',
  'イタリアのヴェルメンティーノと同一品種で、プロヴァンスではロールと呼ばれる。プロヴァンスの白ワインとロゼワインの主要品種で、地中海性気候の下で柑橘類やハーブの爽やかなアロマと、しっかりとしたボディを発展させる。近年評価が急上昇している。',
  'プロヴァンスの主要白品種で、地中海のハーブと柑橘の爽やかな風味が特徴',
  ARRAY['レモン','グレープフルーツ','白桃','ローズマリー','アーモンド','洋梨'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['ブイヤベース','ニース風サラダ','グリル魚','ラタトゥイユ','オリーブオイル料理'],
  ARRAY['Provence','Bellet','Côtes de Provence','Bandol','Corsica']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 28. Grenache Blanc
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Grenache Blanc', 'グルナッシュ・ブラン', ARRAY[]::text[], false,
  'France', 'Rhône Valley',
  'グルナッシュ・ノワールの突然変異種で、フランス南部とスペイン北東部で広く栽培される。ふくよかなボディと低めの酸味が特徴で、シャトーヌフ・デュ・パプの白ワインの主要品種。ルーサンヌやマルサンヌとブレンドされることが多い。',
  'ふくよかなボディと穏やかな酸味を持つ南仏の白ブレンドの主要品種',
  ARRAY['洋梨','りんご','アニス','白い花','ハーブ','蜂蜜'],
  '{"sweetness":2,"acidity":2,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['地中海風魚料理','鶏肉のハーブロースト','アイオリ','ブイヤベース','パエリア'],
  ARRAY['Châteauneuf-du-Pape','Roussillon','Languedoc','Catalonia','Priorat']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 29. Pinot Meunier
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Pinot Meunier', 'ピノ・ムニエ', ARRAY[]::text[], false,
  'France', 'Champagne',
  'シャンパーニュの三大品種の一つで、黒ブドウだが白ワイン（ブラン・ド・ノワール）やスパークリングワインに使用される。ピノ・ノワールより早熟で霜に強く、果実味豊かで親しみやすいスタイルのワインを生む。名前は葉裏の白い毛が粉をまぶしたように見えることに由来。',
  'シャンパーニュの三大品種の一つで、果実味とまろやかさをブレンドに加える',
  ARRAY['りんご','洋梨','ブリオッシュ','白い花','レモン','イースト'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['フライドチキン','寿司','白身魚の天ぷら','ブリーチーズ','アペリティフ'],
  ARRAY['Champagne','Vallée de la Marne','Württemberg','England']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 30. Trebbiano
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Trebbiano', 'トレッビアーノ', ARRAY[]::text[], false,
  'Italy', 'Central Italy',
  'イタリア全土で最も広く栽培される白品種で、多くのサブバラエティが存在する。トレッビアーノ・トスカーノ（＝ユニ・ブラン）が最も一般的だが、トレッビアーノ・ダブルッツォやトレッビアーノ・ディ・ソアーヴェなど優良なクローンも存在する。基本的にニュートラルな味わいで、軽やかで飲みやすいワインを生む。',
  'イタリア最大の白品種ファミリーで、軽快でニュートラルな味わいが特徴',
  ARRAY['レモン','青りんご','アーモンド','白い花','ハーブ'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['ピッツァ','パスタ・アル・オリオ','カプレーゼ','白身魚のフリット','ブルスケッタ'],
  ARRAY['Abruzzo','Tuscany','Emilia-Romagna','Lazio','Umbria']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 31. Garganega
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Garganega', 'ガルガネーガ', ARRAY[]::text[], false,
  'Italy', 'Veneto',
  'イタリア・ヴェネト州原産で、ソアーヴェワインの主要品種。アーモンドやレモンのデリケートな風味と中程度のボディが特徴。レチョートやアマローネに似た陰干し製法で凝縮した甘口ワインも造られる。品質志向の生産者により近年再評価が進んでいる。',
  'ソアーヴェの主要品種で、アーモンドと柑橘のデリケートな風味が特徴',
  ARRAY['アーモンド','レモン','白桃','洋梨','白い花','ミネラル'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['リゾット','白身魚のグリル','シーフードパスタ','ミネストローネ','チキンのソテー'],
  ARRAY['Soave','Soave Classico','Gambellara','Colli Euganei']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 32. Nascetta
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Nascetta', 'ナシェッタ', ARRAY[]::text[], false,
  'Italy', 'Piedmont',
  'イタリア・ピエモンテ州ランゲ地区原産の希少な白品種。20世紀後半に一度絶滅しかけたが、数人の情熱的な生産者により復活した。エレガントなフローラルアロマと、はっきりとしたミネラル感が特徴。バローロ地区でも白ワインとして注目を集めている。',
  '絶滅の危機から復活したピエモンテの希少品種で、エレガントなフローラル感とミネラルが魅力',
  ARRAY['白い花','ハーブ','りんご','レモン','蜂蜜','ミネラル'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['ヴィテッロ・トンナート','ピエモンテの前菜','白トリュフのタリオリーニ','チーズ','魚のグリル'],
  ARRAY['Langhe','Novello','Alba','Piedmont']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 33. Timorasso
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Timorasso', 'ティモラッソ', ARRAY[]::text[], false,
  'Italy', 'Piedmont',
  'イタリア・ピエモンテ州コッリ・トルトネージ原産の希少品種。ワルター・マッサ氏の尽力により1990年代に復興し、「デルトーナ」の名で知られる。豊かなミネラル感と複雑なアロマ、しっかりした骨格を持ち、「白のバローロ」とも称される熟成ポテンシャルの高い品種。',
  '「白のバローロ」と称される骨格のしっかりした品種で、優れた熟成力を持つ',
  ARRAY['白桃','火打石','蜂蜜','ハーブ','ミネラル','アプリコット','ナッツ'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":4,"finish":4}'::jsonb,
  ARRAY['白トリュフ','熟成チーズ','鶏肉のロースト','魚の煮込み','リゾット'],
  ARRAY['Colli Tortonesi','Derthona','Tortona','Piedmont']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 34. Nosiola
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Nosiola', 'ノジオラ', ARRAY[]::text[], false,
  'Italy', 'Trentino',
  'イタリア・トレンティーノ地方固有の白品種で、名前はイタリア語の「ヘーゼルナッツ（ノッチョーラ）」に由来する。軽やかでデリケートな味わいが特徴で、ヘーゼルナッツのニュアンスが風味に表れる。ヴァッレ・デイ・ラーギでは遅摘みの甘口ワイン「ヴィーノ・サント」にも使われる。',
  'トレンティーノ固有の品種で、ヘーゼルナッツの風味と軽やかな味わいが特徴',
  ARRAY['ヘーゼルナッツ','りんご','白い花','レモン','アーモンド'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['淡水魚のグリル','ポレンタ','軽い前菜','山のチーズ','ハーブサラダ'],
  ARRAY['Trentino','Valle dei Laghi','Sorni']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 35. Coda di Volpe
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Coda di Volpe', 'コーダ・ディ・ヴォルペ', ARRAY[]::text[], false,
  'Italy', 'Campania',
  'イタリア・カンパニア州原産の古代品種で、名前は「キツネの尻尾」を意味し、果房の形状に由来する。古代ローマ時代から栽培されていたとされる。穏やかなアロマと中程度の酸味を持ち、フィアーノやグレーコとブレンドされることが多い。単一品種ワインも増えている。',
  '古代ローマ時代からの歴史を持つカンパニアの品種で、穏やかな味わいが特徴',
  ARRAY['洋梨','レモン','白い花','ハーブ','アーモンド','蜂蜜'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['ピッツァ・マルゲリータ','魚介のフリット','モッツァレラチーズ','パスタ','野菜のグリル'],
  ARRAY['Campania','Vesuvio','Irpinia','Sannio']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 36. Inzolia
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Inzolia', 'インツォリア', ARRAY['Ansonica'], false,
  'Italy', 'Sicily',
  'シチリア島原産の白品種で、トスカーナではアンソニカと呼ばれる。マルサラワインの伝統的なブレンド品種の一つとして歴史的に重要。穏やかな柑橘のアロマとナッツの風味を持ち、地中海料理との相性が良い。近年はモダンなスタイルの辛口ワインも増えている。',
  'マルサラの伝統的品種で、穏やかな柑橘とナッツの風味が地中海料理に合う',
  ARRAY['レモン','アーモンド','洋梨','ハーブ','蜂蜜','白い花'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['シチリア風魚料理','カポナータ','シーフードクスクス','アランチーニ','イワシのパスタ'],
  ARRAY['Sicily','Marsala','Tuscany Coast','Giglio Island']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 37. Muscat of Alexandria
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Muscat of Alexandria', 'マスカット・オブ・アレキサンドリア', ARRAY['Zibibbo'], false,
  'Egypt', 'North Africa',
  '古代エジプト原産とされる最古級のブドウ品種の一つ。シチリアのパンテレリア島ではズィビッボと呼ばれ、パッシートの甘口ワインで有名。食用ブドウとしても広く栽培され、日本ではマスカット・オブ・アレキサンドリアとして高級食用ブドウの代名詞。',
  '古代からの歴史を持つマスカット系品種で、甘口ワインと食用の両方で重要',
  ARRAY['マスカット','オレンジの花','蜂蜜','ライチ','バラ','アプリコット','ジンジャー'],
  '{"sweetness":4,"acidity":2,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['フルーツタルト','アーモンド菓子','ブルーチーズ','デザート','カンノーリ'],
  ARRAY['Pantelleria','Southern Spain','South Africa','Australia','Chile']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 38. Albariño
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Albariño', 'アルバリーニョ', ARRAY['Alvarinho'], false,
  'Spain', 'Galicia',
  'スペイン北西部ガリシア地方リアス・バイシャス原産の白品種。厚い果皮を持ち、大西洋からの湿気に耐える。鮮烈な酸味とアプリコットや桃の華やかなアロマ、塩味を含むミネラル感が特徴。ポルトガルではアルヴァリーニョとしてヴィーニョ・ヴェルデの高級品種。',
  '鮮烈な酸味と海のミネラル感が特徴のガリシアを代表する白品種',
  ARRAY['アプリコット','白桃','レモン','ライム','塩味のミネラル','白い花','ジンジャー'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['タコのガリシア風','エビのアヒージョ','生牡蠣','白身魚のグリル','シーフードパエリア'],
  ARRAY['Rías Baixas','Vinho Verde','Galicia','Salnés Valley','Monção e Melgaço']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 39. Verdejo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Verdejo', 'ベルデホ', ARRAY[]::text[], false,
  'Spain', 'Rueda',
  'スペイン・カスティーリャ・イ・レオン州ルエダDO原産の白品種。11世紀にモサラベ人によって持ち込まれたとされる。ハーブやフェンネルの独特なアロマと、ほのかな苦みを伴う余韻が特徴。ソーヴィニヨン・ブランに似た爽快感を持ちながら、より厚みのあるボディを持つ。',
  'ハーブの香りとほのかな苦みが特徴のルエダを代表するスペインの白品種',
  ARRAY['フェンネル','ハーブ','レモン','グレープフルーツ','白桃','アーモンド'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['エビのアヒージョ','イベリコ生ハム','白身魚のフリット','パドロンペッパー','マンチェゴチーズ'],
  ARRAY['Rueda','Castilla y León','La Seca','Serrada']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 40. Viura
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Viura', 'ビウラ', ARRAY['Macabeo'], false,
  'Spain', 'Rioja',
  'スペインで最も広く栽培される白品種の一つ。リオハではビウラ、カタルーニャではマカベオと呼ばれる。カバの三大品種の一つとしても重要。穏やかなアロマとフレッシュな酸味を持ち、伝統的な樽熟成スタイルではナッツやバターのリッチな風味を発展させる。',
  'リオハの白ワインとカバの主要品種で、フレッシュから樽熟成まで多彩なスタイルを持つ',
  ARRAY['りんご','レモン','白い花','アーモンド','バター','蜂蜜'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['パエリア','エビのガーリックソテー','イベリコ豚','タパス','魚介のグリル'],
  ARRAY['Rioja','Penedès','Navarra','Costers del Segre','Somontano']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 41. Xarel·lo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Xarel·lo', 'チャレッロ', ARRAY[]::text[], false,
  'Spain', 'Penedès',
  'カタルーニャ・ペネデス地方原産で、カバの三大品種の一つ。三品種の中で最もボディと個性を持ち、スティルワインとしても高い評価を得ている。りんごや洋梨のアロマにハーブのニュアンスが加わり、しっかりとした酸味と苦みのある余韻が特徴。',
  'カバに骨格と個性を与える品種で、スティルワインとしても近年高く評価されている',
  ARRAY['りんご','洋梨','ハーブ','アーモンド','白い花','柑橘類'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['カルソッツ','魚介のフィデウア','パン・コン・トマテ','鶏肉のグリル','タパス'],
  ARRAY['Penedès','Alella','Catalonia','Pla de Bages']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 42. Parellada
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Parellada', 'パレリャーダ', ARRAY[]::text[], false,
  'Spain', 'Penedès',
  'カタルーニャ・ペネデス地方原産で、カバの三大品種の一つ。標高の高い畑で栽培され、三品種の中で最も繊細でフローラルなアロマを持つ。軽やかなボディと爽やかな酸味が特徴で、カバにエレガンスと花の香りを加える役割を担う。',
  'カバに繊細なフローラル感とエレガンスを加える高地栽培の品種',
  ARRAY['白い花','りんご','レモン','洋梨','ハーブ'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":1,"finish":2}'::jsonb,
  ARRAY['軽い前菜','サラダ','白身魚のカルパッチョ','アペリティフ','オリーブ'],
  ARRAY['Penedès','Conca de Barberà','Costers del Segre','Catalonia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 43. Godello
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Godello', 'ゴデーリョ', ARRAY['Gouveio'], false,
  'Spain', 'Galicia',
  'スペイン北西部ガリシア地方原産で、バルデオラスDOの主要品種。一時は絶滅寸前だったが1970年代以降に復興を遂げた。豊かなミネラル感としっかりとしたボディ、複雑なアロマが特徴で、「スペインのシャルドネ」とも称される。ポルトガルではゴウヴェイオとして知られる。',
  '豊かなミネラルと複雑さを持つガリシアの復興品種で、スペインのシャルドネとも称される',
  ARRAY['白桃','洋梨','ハーブ','レモン','ミネラル','アーモンド','蜂蜜'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['タコのガリシア風','帆立のグリル','鶏肉のロースト','白身魚のオーブン焼き','テティーリャチーズ'],
  ARRAY['Valdeorras','Bierzo','Monterrei','Douro','Dão']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 44. Treixadura
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Treixadura', 'トレイシャドゥーラ', ARRAY[]::text[], false,
  'Spain', 'Galicia',
  'スペイン・ガリシア地方リベイロDO原産の白品種。アルバリーニョと並ぶガリシアの高品質白品種で、フローラルなアロマと豊かな果実味が特徴。単一品種ワインとブレンドの両方で使われ、リベイロの伝統的なブレンドでは中心的な役割を果たす。',
  'リベイロの中心品種で、フローラルな香りと豊かな果実味がガリシアの食文化と調和する',
  ARRAY['白い花','洋梨','りんご','アプリコット','柑橘類','蜂蜜'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['魚介のエンパナーダ','タコ料理','帆立のグリル','ガリシアの前菜','シーフード'],
  ARRAY['Ribeiro','Galicia','Ourense']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 45. Pedro Ximénez
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Pedro Ximénez', 'ペドロ・ヒメネス', ARRAY['PX'], false,
  'Spain', 'Andalusia',
  'スペイン・アンダルシア地方で栽培される白品種で、世界で最も甘いワインの一つであるPXシェリーの原料。収穫後に天日干し（ソレオ）することで糖度を極限まで凝縮させる。レーズンやチョコレート、糖蜜の濃厚な風味を持つ極甘口ワインは唯一無二の存在。',
  '天日干しで凝縮された世界最甘級のシェリーを生む、アンダルシアの伝統品種',
  ARRAY['レーズン','チョコレート','糖蜜','コーヒー','イチジク','キャラメル','デーツ'],
  '{"sweetness":5,"acidity":2,"tannin":null,"body":5,"finish":5}'::jsonb,
  ARRAY['バニラアイスクリーム','チョコレートケーキ','ブルーチーズ','フォアグラ','デザート全般'],
  ARRAY['Montilla-Moriles','Jerez','Málaga','Andalusia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 46. Palomino
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Palomino', 'パロミノ', ARRAY[]::text[], false,
  'Spain', 'Jerez',
  'スペイン・ヘレス地方で辛口シェリーの主要品種として最も重要な白品種。フィノ、マンサニーリャ、アモンティリャード、オロロソなど多彩なシェリースタイルの基盤となる。単体ではニュートラルな味わいだが、フロール（産膜酵母）の下での熟成やソレラシステムにより複雑な風味を獲得する。',
  'シェリーの主要品種で、フロールやソレラシステムにより唯一無二の複雑さを発展させる',
  ARRAY['アーモンド','パン生地','塩味','オリーブ','カモミール','リンゴ'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":2,"finish":4}'::jsonb,
  ARRAY['生ハム','オリーブ','アーモンド','白身魚のフリット','タパス','エビのフリット'],
  ARRAY['Jerez','Sanlúcar de Barrameda','El Puerto de Santa María','Andalusia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 47. Encruzado
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Encruzado', 'エンクルザード', ARRAY[]::text[], false,
  'Portugal', 'Dão',
  'ポルトガル・ダン地方原産の高品質白品種で、ポルトガル最高の白ブドウの一つとされる。しっかりとしたミネラル感と複雑なアロマ、樽熟成への適性が特徴。シトラスの果実味にフローラルなニュアンスが加わり、ブルゴーニュのシャルドネに匹敵するポテンシャルを持つと評価されている。',
  'ダン地方の最高品質白品種で、ミネラル感と樽熟成への高い適性を持つ',
  ARRAY['レモン','白い花','ミネラル','白桃','ハーブ','ナッツ','蜂蜜'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['バカリャウ（干し鱈）','シーフードリゾット','鶏肉のロースト','チーズ','魚のグリル'],
  ARRAY['Dão','Beiras','Central Portugal']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 48. Arinto
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Arinto', 'アリント', ARRAY[]::text[], false,
  'Portugal', 'Various',
  'ポルトガル全土で栽培される重要な白品種で、特にブセラスDOCでは主要品種として知られる。高い酸味を維持する能力が特徴で、温暖なポルトガルの気候でもフレッシュさを保つ。レモンや青りんごの爽やかなアロマと、ミネラル豊かな味わいが魅力。',
  '高い酸味を維持する能力に優れ、ポルトガル全土でフレッシュな白ワインを生む重要品種',
  ARRAY['レモン','青りんご','ミネラル','白い花','ライム'],
  '{"sweetness":1,"acidity":5,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['バカリャウのコロッケ','イワシの塩焼き','シーフード','グリル野菜','フレッシュチーズ'],
  ARRAY['Bucelas','Vinho Verde','Alentejo','Lisboa','Tejo']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 49. Fernão Pires
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Fernão Pires', 'フェルナン・ピレス', ARRAY[]::text[], false,
  'Portugal', 'Various',
  'ポルトガルで最も広く栽培されている白品種。芳香性が高く、花やシトラスの華やかなアロマが特徴。テージョ地方やバイラーダ地方で特に重要な品種。早飲みタイプのフレッシュなワインが主流だが、品質志向の生産者は複雑なスタイルも手がけている。',
  'ポルトガル最大の栽培面積を持つ芳香性白品種で、華やかなフローラルアロマが特徴',
  ARRAY['白い花','レモン','オレンジの花','洋梨','ハーブ','ローズ'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['シーフードライス','アサリの蒸し物','白身魚のグリル','軽い前菜','イワシ'],
  ARRAY['Tejo','Bairrada','Lisboa','Setúbal','Ribatejo']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 50. Loureiro
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Loureiro', 'ロウレイロ', ARRAY[]::text[], false,
  'Portugal', 'Vinho Verde',
  'ポルトガル北部ミーニョ地方原産で、ヴィーニョ・ヴェルデの主要品種の一つ。名前は「月桂樹」に由来し、月桂樹やアカシアの花の強いフローラルアロマが特徴。軽やかなボディとフレッシュな酸味を持ち、微発泡の爽やかなスタイルが人気。',
  '月桂樹の名を持つヴィーニョ・ヴェルデの芳香品種で、強いフローラルアロマが魅力',
  ARRAY['月桂樹','アカシアの花','レモン','ライム','オレンジの花','白桃'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":1,"finish":2}'::jsonb,
  ARRAY['グリルしたイワシ','アサリのワイン蒸し','シーフードサラダ','コシード','軽いタパス'],
  ARRAY['Vinho Verde','Lima','Minho','Galicia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 51. Avesso
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Avesso', 'アヴェッソ', ARRAY[]::text[], false,
  'Portugal', 'Vinho Verde',
  'ポルトガル・ヴィーニョ・ヴェルデ地方の内陸部で栽培される白品種。他のヴィーニョ・ヴェルデ品種より温暖な地域で育ち、より豊かなボディと複雑さを持つ。柑橘系の果実味にミネラルとナッツのニュアンスが加わり、熟成ポテンシャルも備える。',
  'ヴィーニョ・ヴェルデの内陸部で育つ品種で、より豊かなボディと複雑さを持つ',
  ARRAY['レモン','洋梨','アーモンド','ミネラル','白い花','蜂蜜'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['バカリャウ','鶏肉のロースト','シーフードリゾット','チーズ','野菜のグラタン'],
  ARRAY['Vinho Verde','Baião','Amarante','Douro']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 52. Müller-Thurgau
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Müller-Thurgau', 'ミュラー・トゥルガウ', ARRAY['Rivaner'], false,
  'Switzerland', 'Thurgau',
  '1882年にスイスのヘルマン・ミュラー博士がリースリングとマドレーヌ・ロワイヤルの交配で作出した品種。ドイツで最も栽培面積の大きい白品種の一つ。フローラルで親しみやすい香りと穏やかな酸味、軽やかなボディが特徴で、日常的に楽しめるワインを生む。',
  '交配品種として成功した代表例で、フローラルで親しみやすい軽やかなワインを生む',
  ARRAY['マスカット','白い花','りんご','洋梨','ハーブ','レモン'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['アスパラガス料理','シュニッツェル','白身魚','サラダ','軽い前菜'],
  ARRAY['Rheinhessen','Pfalz','Franken','Baden','Alto Adige']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 53. Silvaner
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Silvaner', 'シルヴァーナー', ARRAY['Sylvaner'], false,
  'Germany', 'Franken',
  'オーストリア原産とされる白品種で、ドイツ・フランケン地方で最も重要な品種。土壌の個性を忠実に反映するテロワール感応性の高い品種で、ミネラル豊かで落ち着いた味わいのワインを生む。アルザスでもグランクリュに認定されている畑がある。',
  'フランケンの主要品種で、テロワールを忠実に映し出すミネラル感と落ち着きのある味わい',
  ARRAY['青りんご','ハーブ','ミネラル','白い花','洋梨','干し草'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['フランケン風ソーセージ','アスパラガス','白身魚のムニエル','シュパーゲル','ジャガイモ料理'],
  ARRAY['Franken','Rheinhessen','Alsace','Pfalz','Valais']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 54. Grüner Veltliner
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Grüner Veltliner', 'グリューナー・フェルトリーナー', ARRAY[]::text[], false,
  'Austria', 'Lower Austria',
  'オーストリアを代表する白品種で、全栽培面積の約3分の1を占める。白胡椒のスパイシーなアロマが最大の特徴で、レンズ豆やハーブのニュアンスも持つ。軽快な日常ワインから長期熟成可能なグランクリュ級まで幅広い品質レベルのワインを生む。',
  '白胡椒の独特なスパイス感とミネラルが特徴のオーストリアを代表する白品種',
  ARRAY['白胡椒','レンズ豆','青りんご','レモン','ハーブ','ミネラル','グレープフルーツ'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['ウィーナー・シュニッツェル','アスパラガス','寿司','ホワイトアスパラガス','豚肉のロースト'],
  ARRAY['Wachau','Kamptal','Kremstal','Weinviertel','Vienna']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 55. Scheurebe
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Scheurebe', 'ショイレーベ', ARRAY[]::text[], false,
  'Germany', 'Pfalz',
  '1916年にゲオルク・ショイ博士がリースリングとブーケットトラウベの交配で作出した品種。カシスの芽やグレープフルーツの強烈なアロマが特徴で、辛口から甘口まで幅広いスタイルで醸造される。特にシュペートレーゼやアウスレーゼの甘口が高く評価されている。',
  'カシスの芽の強烈なアロマが特徴の交配品種で、甘口ワインで特に高い評価を得る',
  ARRAY['カシスの芽','グレープフルーツ','パッションフルーツ','ピーチ','ハーブ','ライチ'],
  '{"sweetness":3,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['フォアグラ','スパイシーなアジア料理','フルーツデザート','ブルーチーズ','鶏レバーのムース'],
  ARRAY['Pfalz','Rheinhessen','Franken','Austria']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 56. Kerner
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Kerner', 'ケルナー', ARRAY[]::text[], false,
  'Germany', 'Württemberg',
  '1929年にアウグスト・ヘロルドがトロリンガー（赤品種）とリースリングの交配で作出した品種。リースリングに似た華やかなアロマと高い酸味を持ちながら、より早熟で栽培しやすい。日本でも北海道で栽培されており、日本ワインとしても注目を集めている。',
  'リースリングに似た華やかさを持ちながらより栽培しやすい交配品種',
  ARRAY['りんご','洋梨','レモン','ナツメグ','白い花','ミネラル'],
  '{"sweetness":2,"acidity":4,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['白身魚','鶏肉のグリル','アスパラガス','軽い前菜','和食'],
  ARRAY['Württemberg','Pfalz','Rheinhessen','Alto Adige','Hokkaido']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 57. Bacchus
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Bacchus', 'バッカス', ARRAY[]::text[], false,
  'Germany', 'Franconia',
  '1933年にミュラー・トゥルガウとリースリング×シルヴァーナーの交配で作出されたドイツの白品種。マスカットに似た華やかなアロマと適度な酸味が特徴。ドイツではフランケンやラインヘッセンで栽培され、イギリスでは冷涼な気候でも育つため主要品種の一つとなっている。',
  'マスカット様のアロマを持つドイツの交配品種で、イギリスでも成功を収めている',
  ARRAY['マスカット','エルダーフラワー','りんご','洋梨','柑橘類','ハーブ'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['サラダ','軽い魚料理','アスパラガス','鶏肉のサラダ','アペリティフ'],
  ARRAY['Franken','Rheinhessen','England','Pfalz']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 58. Huxelrebe
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Huxelrebe', 'フクセルレーベ', ARRAY[]::text[], false,
  'Germany', 'Rheinhessen',
  '1927年にゲオルク・ショイ博士がシャスラとミュスカ・プレコース・ド・ソーミュールの交配で作出した品種。極めて高い糖度を達成できるため、甘口ワインの生産に適する。マスカット様の華やかなアロマとトロピカルフルーツの風味が特徴。イギリスでも栽培されている。',
  '極めて高い糖度を達成できる交配品種で、甘口ワインやイギリスでの栽培でも知られる',
  ARRAY['マスカット','トロピカルフルーツ','蜂蜜','洋梨','アプリコット','白い花'],
  '{"sweetness":3,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['フルーツデザート','フォアグラ','スパイシー料理','ブルーチーズ','アペリティフ'],
  ARRAY['Rheinhessen','Pfalz','England','Nahe']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 59. Assyrtiko
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Assyrtiko', 'アシルティコ', ARRAY[]::text[], false,
  'Greece', 'Santorini',
  'ギリシャ・サントリーニ島原産で、ギリシャ最高の白品種として世界的に評価されている。火山性土壌で育ち、極めて高い酸味とミネラル感が特徴。暑い気候でも酸味を失わない稀有な品種で、塩味を含むミネラルと柑橘のフレッシュさが際立つ。フィロキセラ被害を受けていない古木が多く残る。',
  '火山性土壌で育つギリシャ最高の白品種で、圧倒的な酸味と塩味のミネラルが特徴',
  ARRAY['レモン','ライム','火打石','塩味のミネラル','白桃','蜜蝋','ハーブ'],
  '{"sweetness":1,"acidity":5,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['タコのグリル','ギリシャ風魚料理','フェタチーズサラダ','イカのグリル','地中海風シーフード'],
  ARRAY['Santorini','Attica','Halkidiki','Drama','Mykonos']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 60. Moschofilero
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Moschofilero', 'モスコフィレロ', ARRAY[]::text[], false,
  'Greece', 'Mantinia',
  'ギリシャ・ペロポネソス半島マンティニア高原原産の芳香性品種。ピンクがかった果皮を持つが白ワインとして醸造される。バラやゲラニウムの華やかなフローラルアロマが特徴で、ゲヴュルツトラミネールに似た芳香性を持ちながら、よりライトなボディを持つ。',
  'バラの華やかなアロマが特徴のマンティニア原産の芳香性品種',
  ARRAY['バラ','ゲラニウム','レモン','ライチ','白い花','ジンジャー'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['スパナコピタ','ギリシャ風サラダ','シーフード','ドルマデス','フェタチーズ'],
  ARRAY['Mantinia','Peloponnese','Arcadia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 61. Malagousia
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Malagousia', 'マラグジア', ARRAY[]::text[], false,
  'Greece', 'Northern Greece',
  'ギリシャの古代品種で、絶滅寸前だったところを1970年代にヴァンジェリス・ゲロヴァシリウ教授が再発見・復興させた。ジャスミンやピーチの華やかなアロマと、ふくよかなボディが特徴。ヴィオニエに比較されることが多く、ギリシャワインのルネサンスを象徴する品種。',
  '絶滅の危機から復活したギリシャの芳香性品種で、ジャスミンやピーチの華やかなアロマが魅力',
  ARRAY['ジャスミン','白桃','アプリコット','レモン','オレンジの花','ハーブ','蜂蜜'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['エビのサガナキ','ギリシャ風魚料理','鶏肉のレモンソース','ムサカ','地中海野菜'],
  ARRAY['Thessaloniki','Halkidiki','Drama','Attica']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 62. Roditis
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Roditis', 'ロディティス', ARRAY[]::text[], false,
  'Greece', 'Peloponnese',
  'ギリシャで二番目に広く栽培される白品種で、ピンク色の果皮を持つ。パトラス周辺が主産地で、レッチーナ（松脂入りワイン）の原料としても歴史的に重要。近年は高品質な辛口スティルワインも増えており、爽やかな酸味と繊細な果実味が再評価されている。',
  'ギリシャ第二の白品種で、レッチーナの伝統品種としても知られる爽やかな味わいの品種',
  ARRAY['レモン','りんご','白い花','ハーブ','柑橘類'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['ギリシャ風サラダ','グリル野菜','シーフード','タラモサラダ','ピタパン'],
  ARRAY['Patras','Peloponnese','Attica','Central Greece']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 63. Vidiano
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Vidiano', 'ヴィディアノ', ARRAY[]::text[], false,
  'Greece', 'Crete',
  'ギリシャ・クレタ島原産の希少白品種で、近年急速に注目を集めている。一時は忘れ去られていたが、1990年代以降に復興が進んだ。トロピカルフルーツと蜂蜜の豊かなアロマ、ふくよかなボディと適度な酸味のバランスが良い。樽熟成にも適している。',
  'クレタ島から復活した希少品種で、トロピカルな豊かさとふくよかなボディが魅力',
  ARRAY['トロピカルフルーツ','蜂蜜','白桃','アプリコット','バニラ','白い花'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['シーフードのグリル','クレタ料理','鶏肉のレモンロースト','チーズパイ','地中海野菜'],
  ARRAY['Crete','Rethymno','Heraklion']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 64. Rkatsiteli
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Rkatsiteli', 'ルカツィテリ', ARRAY[]::text[], false,
  'Georgia', 'Kakheti',
  'ジョージア原産で世界最古のブドウ品種の一つとされ、8000年以上の栽培歴を持つ。ジョージアの伝統的なクヴェヴリ（陶器壺）醸造では、果皮との接触によりオレンジワイン（アンバーワイン）が造られる。高い酸味と果実味のバランスが良く、多様な醸造スタイルに対応する。',
  '8000年の歴史を持つジョージアの古代品種で、クヴェヴリ醸造のオレンジワインで世界的に注目',
  ARRAY['りんご','洋梨','カリン','蜂蜜','ドライフルーツ','ハーブ','スパイス'],
  '{"sweetness":2,"acidity":4,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['ジョージア料理','ヒンカリ','ハチャプリ','グリル肉','チーズ','スパイシー料理'],
  ARRAY['Kakheti','Kartli','Georgia','Moldova','Ukraine']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 65. Mtsvane
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Mtsvane', 'ムツヴァネ', ARRAY[]::text[], false,
  'Georgia', 'Kakheti',
  'ジョージア・カヘティ地方原産の白品種で、名前はジョージア語で「緑」を意味する。ルカツィテリとブレンドされることが多く、花のアロマと柔らかなボディを加える。クヴェヴリ醸造のオレンジワインにもよく使われ、単一品種ワインではよりフローラルで繊細なスタイルとなる。',
  'ジョージアの「緑のブドウ」で、フローラルなアロマとルカツィテリとのブレンドで知られる',
  ARRAY['白い花','洋梨','メロン','ハーブ','蜂蜜','柑橘類'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['ジョージア料理','ハチャプリ','野菜のグリル','チーズ','鶏肉の煮込み'],
  ARRAY['Kakheti','Manavi','Tsinandali','Georgia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 66. Kisi
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Kisi', 'キシ', ARRAY[]::text[], false,
  'Georgia', 'Kakheti',
  'ジョージア・カヘティ地方原産の希少白品種。クヴェヴリ醸造で素晴らしいアンバーワインを生み出し、近年国際的に注目が高まっている。厚い果皮を持ち、クヴェヴリでの長期果皮接触により琥珀色のワインとなる。ドライフルーツやナッツの複雑な風味が特徴。',
  'クヴェヴリ醸造で琥珀色の複雑なワインを生むジョージアの希少品種',
  ARRAY['ドライフルーツ','蜂蜜','ナッツ','アプリコット','スパイス','オレンジの皮'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['ジョージア料理','クルミのペースト料理','グリル肉','熟成チーズ','スパイシー料理'],
  ARRAY['Kakheti','Kindzmarauli','Georgia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 67. Torrontés
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Torrontés', 'トロンテス', ARRAY[]::text[], false,
  'Argentina', 'Salta',
  'アルゼンチンを代表する白品種で、クリオーリャとマスカット・オブ・アレキサンドリアの自然交配種。サルタ州カファヤテの標高1700m以上の高地で最高品質のワインが生まれる。ゲヴュルツトラミネールに似た華やかなバラやライチのアロマと、辛口の味わいのコントラストが魅力。',
  'アルゼンチン固有の芳香性品種で、高地栽培によるバラやライチの華やかなアロマが特徴',
  ARRAY['バラ','ライチ','ゲラニウム','白桃','レモン','ジャスミン','マスカット'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['エンパナーダ','セビーチェ','スパイシーな料理','寿司','タイ料理','鶏肉のグリル'],
  ARRAY['Cafayate','Salta','La Rioja','Mendoza','San Juan']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 68. Furmint
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Furmint', 'フルミント', ARRAY[]::text[], false,
  'Hungary', 'Tokaj',
  'ハンガリー・トカイ地方の主要品種で、世界三大貴腐ワインの一つであるトカイ・アスーの主要原料。薄い果皮が貴腐菌の付着に適しており、極上の甘口ワインを生む。近年は辛口ワインも高く評価されており、火打石のようなミネラルと鮮烈な酸味が特徴。',
  'トカイ・アスーの主要品種で、辛口でも鮮烈な酸味と火打石のミネラルが際立つ',
  ARRAY['火打石','レモン','りんご','蜂蜜','アーモンド','ライム','スモーク'],
  '{"sweetness":3,"acidity":5,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['フォアグラ','ブルーチーズ','寿司','スパイシー料理','フルーツタルト','白身魚'],
  ARRAY['Tokaj','Somló','Burgenland','Slovenia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 69. Hárslevelű
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Hárslevelű', 'ハールシュレヴェリュー', ARRAY[]::text[], false,
  'Hungary', 'Tokaj',
  'ハンガリー原産の白品種で、名前は「菩提樹の葉」を意味する。トカイ・アスーではフルミントに次ぐ第二の品種として重要。菩提樹の花やスパイスの繊細なアロマと、まろやかな味わいが特徴。辛口のスタイルでも花の香りが豊かで、デーケンブルグ（ソムロー）でも栽培されている。',
  '菩提樹の花の繊細なアロマを持つハンガリーの白品種で、トカイの重要な補助品種',
  ARRAY['菩提樹の花','蜂蜜','洋梨','スパイス','白い花','アプリコット'],
  '{"sweetness":3,"acidity":3,"tannin":null,"body":3,"finish":3}'::jsonb,
  ARRAY['フォアグラ','スパイシーなハンガリー料理','チーズ','デザート','白身魚'],
  ARRAY['Tokaj','Somló','Eger','Badacsony']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 70. Juhfark
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Juhfark', 'ユフファルク', ARRAY[]::text[], false,
  'Hungary', 'Somló',
  'ハンガリー・ソムロー火山原産の希少白品種。名前は「羊の尻尾」を意味し、細長い果房の形状に由来する。火山性土壌で育ち、鮮烈なミネラル感と高い酸味が特徴。ハンガリーでは伝統的に「初夜のワイン」として結婚の夜に飲む習慣があった。',
  'ソムロー火山の希少品種で、鮮烈なミネラルと高い酸味が特徴の個性的な白品種',
  ARRAY['火打石','レモン','ミネラル','青りんご','ハーブ','スモーク'],
  '{"sweetness":1,"acidity":5,"tannin":null,"body":3,"finish":4}'::jsonb,
  ARRAY['ハンガリー料理','魚のスープ','チーズ','鶏肉のパプリカ煮','白身魚'],
  ARRAY['Somló','Balaton','Hungary']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 71. Feteasca Alba
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Feteasca Alba', 'フェテアスカ・アルバ', ARRAY[]::text[], false,
  'Romania', 'Moldavia',
  'ルーマニアおよびモルドバで最も広く栽培される白品種の一つ。名前は「白い乙女」を意味する。穏やかなフローラルアロマと優しい果実味、中程度の酸味が特徴で、軽やかで親しみやすいスタイルのワインを生む。甘口から辛口まで多様なスタイルで醸造される。',
  '「白い乙女」の名を持つルーマニアの主要白品種で、穏やかで親しみやすい味わい',
  ARRAY['白い花','りんご','洋梨','蜂蜜','レモン'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['ルーマニア料理','魚のグリル','鶏肉','サラダ','チーズ'],
  ARRAY['Moldavia','Transylvania','Dealu Mare','Moldova']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 72. Feteasca Regala
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Feteasca Regala', 'フェテアスカ・レガーラ', ARRAY[]::text[], false,
  'Romania', 'Transylvania',
  'ルーマニア・トランシルヴァニア地方で1920年代に発見されたフェテアスカ・アルバとグラサ・デ・コトナリの自然交配種。名前は「王家の乙女」を意味する。フェテアスカ・アルバよりもアロマが豊かで、花やハーブの華やかな香りとしっかりとした酸味を持つ。',
  '「王家の乙女」の名を持つルーマニアの交配品種で、より豊かなアロマと酸味が特徴',
  ARRAY['白い花','ハーブ','洋梨','りんご','蜂蜜','スパイス'],
  '{"sweetness":2,"acidity":4,"tannin":null,"body":2,"finish":3}'::jsonb,
  ARRAY['ルーマニア料理','鶏肉のグリル','魚の煮込み','チーズ','サルマーレ'],
  ARRAY['Transylvania','Dealu Mare','Moldavia','Murfatlar']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 73. Welschriesling
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Welschriesling', 'ヴェルシュリースリング', ARRAY[]::text[], false,
  'Austria', 'Burgenland',
  'リースリングとは無関係の品種で、中央ヨーロッパで広く栽培されている。オーストリアではブルゲンランドのノイジードル湖周辺で貴腐ワインの原料としても重要。軽やかなボディとフレッシュな酸味、柑橘とリンゴの穏やかなアロマが特徴で、日常的な白ワインとして親しまれている。',
  'リースリングとは無関係の中欧品種で、軽やかなスタイルから貴腐ワインまで多彩',
  ARRAY['青りんご','レモン','白い花','ハーブ','ミネラル'],
  '{"sweetness":2,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['ウィーナー・シュニッツェル','白身魚','サラダ','軽い前菜','チーズ'],
  ARRAY['Burgenland','Steiermark','Slovenia','Hungary','Croatia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 74. Koshu
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Koshu', '甲州', ARRAY[]::text[], false,
  'Japan', 'Yamanashi',
  '日本固有の白ブドウ品種で、奈良時代にシルクロードを経て中国から伝来したとされる。薄紫色の果皮を持つヴィティス・ヴィニフェラ種。繊細で控えめなアロマと柔らかな酸味、ほのかな苦みが特徴。2010年にOIV（国際ブドウ・ワイン機構）に登録され、国際的な認知度が向上した。',
  '日本固有の品種で、繊細なアロマと和食に寄り添う穏やかな味わいが魅力',
  ARRAY['白桃','柑橘類','白い花','ミネラル','グレープフルーツ','梅'],
  '{"sweetness":1,"acidity":3,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['刺身','寿司','天ぷら','焼き魚','和食全般','おでん'],
  ARRAY['Yamanashi','Katsunuma','Koshu Valley','Japan']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 75. Delaware
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Delaware', 'デラウェア', ARRAY[]::text[], false,
  'United States', 'Ohio',
  'アメリカ・オハイオ州デラウェア市で1849年に発見されたラブルスカ種とヴィニフェラ種の自然交配種。日本では明治時代に導入され、食用ブドウとしても広く親しまれている。山形県が主産地で、スパークリングワインや甘口ワインの原料としても使用される。フォクシーフレーバーと呼ばれる独特の芳香を持つ。',
  '日本で食用・醸造用として広く栽培されるアメリカ原産の交配品種',
  ARRAY['ブドウ','イチゴ','キャンディ','フローラル','蜂蜜'],
  '{"sweetness":3,"acidity":3,"tannin":null,"body":1,"finish":2}'::jsonb,
  ARRAY['和食','軽い前菜','フルーツ','アペリティフ','デザート'],
  ARRAY['Yamagata','Hokkaido','Osaka','Nagano','Japan']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 76. Niagara
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Niagara', 'ナイアガラ', ARRAY[]::text[], false,
  'United States', 'New York',
  'アメリカ・ニューヨーク州で1868年にコンコードとキャサディの交配で作出された品種。日本では北海道で多く栽培され、フォクシーフレーバーと呼ばれる独特のマスカット様の甘い香りが特徴。甘口の白ワインやスパークリングワインに適し、親しみやすい味わいで人気がある。',
  '北海道で親しまれるアメリカ原産の交配品種で、甘い独特の芳香が特徴',
  ARRAY['マスカット','ブドウ','蜂蜜','洋梨','キャンディ'],
  '{"sweetness":3,"acidity":2,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['フルーツサラダ','軽いデザート','アペリティフ','鶏肉の照り焼き','和食'],
  ARRAY['Hokkaido','Nagano','New York','余市','Japan']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 77. Muscat of Hamburg
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Muscat of Hamburg', 'マスカット・ハンブルグ', ARRAY['Black Muscat'], false,
  'United Kingdom', 'England',
  '19世紀にイギリスで交配された品種で、マスカット・オブ・アレキサンドリアとスキアヴァの交配種。黒い果皮を持つが白ワインの醸造にも用いられる。マスカットの華やかな香りと独特のフローラルなアロマが特徴。食用ブドウとしても世界中で栽培されている。',
  'マスカットの華やかなアロマを持つ黒皮品種で、食用としても世界的に重要',
  ARRAY['マスカット','バラ','ライチ','ブドウ','オレンジの花','蜂蜜'],
  '{"sweetness":3,"acidity":2,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['フルーツデザート','チョコレート','チーズ','アペリティフ','ナッツ'],
  ARRAY['China','Mediterranean','South America','Japan','Eastern Europe']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 78. Seyval Blanc
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Seyval Blanc', 'セイヴァル・ブラン', ARRAY[]::text[], false,
  'France', 'Loire Valley',
  'フランスのブドウ育種家ベルティーユ・セーヴが作出したフレンチ・ハイブリッド品種。耐寒性と耐病性に優れ、冷涼な気候のイギリスやアメリカ東海岸、カナダで広く栽培されている。シャルドネに似たニュートラルな味わいで、樽熟成にも適応する。イギリスワイン産業の発展に大きく貢献した品種。',
  '耐寒性に優れたハイブリッド品種で、イギリスやカナダなど冷涼産地で成功を収めている',
  ARRAY['青りんご','レモン','ミネラル','白い花','ハーブ'],
  '{"sweetness":1,"acidity":4,"tannin":null,"body":2,"finish":2}'::jsonb,
  ARRAY['白身魚','サラダ','鶏肉のグリル','シーフード','軽い前菜'],
  ARRAY['England','New York','Ontario','Michigan','Quebec']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

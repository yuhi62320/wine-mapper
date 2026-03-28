-- Seed: Red Grape Varieties Batch 2
-- Spanish, Portuguese, Austrian, German, Greek, Georgian, South African,
-- South American, Croatian, Hungarian, Romanian, Bulgarian, Serbian,
-- Japanese, and other international varieties

-- 1. Tempranillo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Tempranillo', 'テンプラニーリョ', ARRAY['Tinta Roriz','Tinta de Toro','Aragonez','Cencibel'], true,
  'Spain', 'Rioja',
  'スペインを代表する高貴な黒ブドウ品種で、リオハやリベラ・デル・ドゥエロの偉大なワインを生み出す。名前は「早熟」を意味するスペイン語に由来し、比較的早く成熟する。樽熟成との相性が非常に良く、バニラやスパイスの風味が加わることで複雑さを増す。',
  'チェリーやプラムの果実味に革やタバコのニュアンスが加わる、エレガントで熟成向きの品種',
  ARRAY['チェリー','プラム','バニラ','なめし革','タバコ','イチジク','甘草'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":4,"finish":4}'::jsonb,
  ARRAY['子羊のロースト','イベリコ豚の生ハム','マンチェゴチーズ','パエリア','チョリソー'],
  ARRAY['Rioja','Ribera del Duero','Toro','Douro','La Mancha']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 2. Graciano
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Graciano', 'グラシアーノ', ARRAY['Morrastel'], true,
  'Spain', 'Rioja',
  'リオハのブレンドにおいて色調と酸味を補う重要な補助品種。栽培が難しく収量が低いため一時は衰退したが、近年その品質が再評価され復興が進んでいる。単一品種ワインとしても注目を集めており、濃い色合いと豊かなアロマが特徴。',
  '濃い色調と高い酸味を持ち、ブレンドに複雑さと長期熟成能力を与える品種',
  ARRAY['ブラックベリー','スミレ','ローリエ','黒コショウ','プラム','ハーブ'],
  '{"sweetness":1,"acidity":4,"tannin":4,"body":4,"finish":4}'::jsonb,
  ARRAY['ラム肉のグリル','熟成チーズ','ビーフシチュー','チョリソー'],
  ARRAY['Rioja','Navarra','Languedoc']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 3. Mazuelo
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Mazuelo', 'マスエロ', ARRAY['Carignan','Cariñena','Carignane'], true,
  'Spain', 'Rioja',
  'フランスではカリニャンとして知られ、スペインのリオハではマスエロと呼ばれるブレンド用品種。高い酸味とタンニン、濃い色合いをワインに与える。古木からは凝縮感のある素晴らしいワインが生まれ、南フランスやスペインの古樹が再評価されている。',
  '高い酸とタンニン、濃い色調でブレンドに骨格と深みを加える品種',
  ARRAY['ブラックチェリー','プラム','スパイス','ガリーグ','黒コショウ','鉄'],
  '{"sweetness":1,"acidity":4,"tannin":5,"body":4,"finish":3}'::jsonb,
  ARRAY['カスレ','ラム肉の煮込み','ソーセージのグリル','ハードチーズ'],
  ARRAY['Rioja','Priorat','Languedoc-Roussillon','Sardinia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 4. Mencía
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Mencía', 'メンシア', ARRAY['Mencia','Jaen'], true,
  'Spain', 'Bierzo',
  'スペイン北西部ビエルソを代表する品種で、近年国際的に高い評価を受けている。花崗岩やスレート土壌で育つと、ミネラル感に富んだエレガントなワインを生む。軽やかさと深みを兼ね備え、「スペインのピノ・ノワール」とも称される。',
  '赤い果実とフローラルなアロマにミネラル感が際立つ、エレガントで繊細な品種',
  ARRAY['ラズベリー','チェリー','スミレ','ミネラル','ハーブ','ザクロ'],
  '{"sweetness":2,"acidity":4,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['タコのガリシア風','子豚のロースト','山羊のチーズ','キノコ料理'],
  ARRAY['Bierzo','Ribeira Sacra','Valdeorras','Monterrei']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 5. Bobal
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Bobal', 'ボバル', ARRAY[]::text[], true,
  'Spain', 'Utiel-Requena',
  'スペインで3番目に多く栽培される黒ブドウ品種で、主にバレンシア州ウティエル・レケーナに集中している。長年バルクワイン用とみなされてきたが、近年古木からの高品質ワインが注目を集めている。濃い色調と豊かな果実味を持ち、暑い気候でも酸味を保つ能力がある。',
  '濃い色合いと豊かな果実味に加え、暑い産地でも高い酸味を保つスペイン固有品種',
  ARRAY['ブラックベリー','ブルーベリー','スミレ','地中海ハーブ','土','チェリー'],
  '{"sweetness":2,"acidity":4,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['パエリア','ラム肉のグリル','地中海風野菜料理','マンチェゴチーズ'],
  ARRAY['Utiel-Requena','Manchuela','Ribera del Júcar']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 6. Garnacha Tintorera
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Garnacha Tintorera', 'ガルナッチャ・ティントレラ', ARRAY['Alicante Bouschet'], true,
  'Spain', 'Almansa',
  'フランスの育種家アンリ・ブーシェが交配により生み出した、果肉まで赤いテンチュリエ品種。プティ・ブーシェとグルナッシュの交配種で、非常に濃い色合いのワインを造る。ポルトガルのアレンテージョでも広く栽培され、力強いワインの主要品種となっている。',
  '果肉まで赤く染まる珍しいテンチュリエ品種で、非常に濃い色調と力強い果実味が特徴',
  ARRAY['ブラックベリー','ブルーベリー','スミレ','黒コショウ','チョコレート','スモーク'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":5,"finish":3}'::jsonb,
  ARRAY['牛肉の赤ワイン煮込み','ジビエ','熟成チーズ','バーベキュー'],
  ARRAY['Almansa','Alentejo','Languedoc','Ribatejo']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 7. Touriga Nacional
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Touriga Nacional', 'トゥリガ・ナシオナル', ARRAY[]::text[], true,
  'Portugal', 'Douro/Dão',
  'ポルトガルで最も高貴とされる黒ブドウ品種で、ポートワインおよびドウロのスティルワインの核となる。小粒で果皮が厚く、非常に濃い色合いと凝縮した果実味を持つ。フローラルなアロマが特徴的で、スミレの香りがこの品種のシグネチャーとなっている。',
  'スミレの華やかな香りと凝縮した黒い果実、力強いタンニンを持つポルトガル最高の黒ブドウ品種',
  ARRAY['スミレ','ブラックベリー','カシス','ローズマリー','甘草','ダークチョコレート','岩バラ'],
  '{"sweetness":2,"acidity":3,"tannin":5,"body":5,"finish":5}'::jsonb,
  ARRAY['子豚のロースト','フェイジョアーダ','サン・ジョルジェチーズ','牛テールの煮込み','バカリャウ'],
  ARRAY['Douro','Dão','Alentejo','Bairrada','Lisboa']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 8. Touriga Franca
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Touriga Franca', 'トゥリガ・フランカ', ARRAY['Touriga Francesa'], true,
  'Portugal', 'Douro',
  'ドウロ渓谷で最も広く栽培される黒ブドウ品種で、ポートワインのブレンドに不可欠な存在。トゥリガ・ナシオナルほど力強くはないが、華やかなアロマと洗練された果実味で優雅さをブレンドに加える。暑く乾燥したドウロの気候に適応し、安定した品質のワインを生む。',
  'フローラルで優雅なアロマを持ち、ポートワインのブレンドに華やかさと柔らかさを与える品種',
  ARRAY['野バラ','ラズベリー','ストロベリー','スミレ','シナモン','甘草'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":4,"finish":3}'::jsonb,
  ARRAY['鴨のコンフィ','ポルトガル風シチュー','セラチーズ','仔羊のグリル'],
  ARRAY['Douro','Trás-os-Montes','Alentejo']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 9. Tinta Barroca
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Tinta Barroca', 'ティンタ・バロッカ', ARRAY[]::text[], true,
  'Portugal', 'Douro',
  'ドウロ渓谷のポートワイン造りに広く使われる品種で、比較的早熟で豊かな糖度を持つ。柔らかいタンニンとまろやかな果実味が特徴で、ブレンドに丸みとボリュームを加える。標高の高い畑で栽培されると、より繊細でバランスの取れたワインを生む。',
  '柔らかいタンニンとまろやかな果実味で、ブレンドに丸みとボリューム感を加える品種',
  ARRAY['プラム','ブラックベリー','チョコレート','レーズン','スパイス','イチジク'],
  '{"sweetness":3,"acidity":2,"tannin":3,"body":4,"finish":3}'::jsonb,
  ARRAY['豚肉のロースト','シチュー','熟成チーズ','ダークチョコレート'],
  ARRAY['Douro','South Africa']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 10. Tinto Cão
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Tinto Cão', 'ティント・カン', ARRAY[]::text[], true,
  'Portugal', 'Douro',
  'ドウロ渓谷の伝統的な品種で、収量が非常に低いため一時は絶滅の危機にあった。近年その高い品質が再評価され、栽培面積が徐々に回復している。繊細なアロマと引き締まった酸味を持ち、長期熟成に優れたエレガントなワインを生む。',
  '低収量ながら繊細なアロマと優れた酸味を持つ、長期熟成向きの希少なドウロ品種',
  ARRAY['チェリー','スミレ','ハーブ','ミネラル','スパイス','紅茶'],
  '{"sweetness":1,"acidity":4,"tannin":3,"body":3,"finish":4}'::jsonb,
  ARRAY['鴨肉のロースト','キノコのリゾット','セミハードチーズ','仔羊'],
  ARRAY['Douro','Dão']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 11. Baga
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Baga', 'バガ', ARRAY[]::text[], true,
  'Portugal', 'Bairrada',
  'ポルトガル中部バイラーダ地方を代表する黒ブドウ品種で、小粒で果皮が厚く非常に高いタンニンと酸味を持つ。若いうちは硬く近寄りがたいが、長期熟成により素晴らしい複雑さを発揮する。粘土質土壌との相性が良く、バイラーダの石灰質粘土で最高の表現を見せる。',
  '高いタンニンと酸味を持つ長期熟成型品種で、熟成によりネッビオーロにも匹敵する複雑さを見せる',
  ARRAY['ブラックベリー','プラム','タバコ','なめし革','杉','スパイス','土'],
  '{"sweetness":1,"acidity":5,"tannin":5,"body":4,"finish":5}'::jsonb,
  ARRAY['子豚のロースト','カブのシチュー','熟成ハードチーズ','ジビエ'],
  ARRAY['Bairrada','Dão','Lisboa']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 12. Castelão
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Castelão', 'カステラン', ARRAY['Periquita'], true,
  'Portugal', 'Península de Setúbal',
  'ポルトガル南部で広く栽培される品種で、かつてはペリキータの名で親しまれていた。温暖な気候に適し、砂質土壌で特に良い結果を出す。中程度のボディと穏やかなタンニンを持ち、親しみやすいスタイルのワインを生み出す。',
  '温暖な気候に適した親しみやすい品種で、柔らかい果実味と穏やかなタンニンが特徴',
  ARRAY['ストロベリー','チェリー','スパイス','ハーブ','土','赤ピーマン'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":2}'::jsonb,
  ARRAY['グリルチキン','イワシの炭火焼き','リゾット','軽めのチーズ'],
  ARRAY['Península de Setúbal','Tejo','Alentejo','Palmela']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 13. Trincadeira
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Trincadeira', 'トリンカデイラ', ARRAY['Tinta Amarela'], true,
  'Portugal', 'Alentejo',
  'ポルトガル全土で広く栽培される品種で、ドウロではティンタ・アマレラの名で知られる。暑い気候に強く、アレンテージョの過酷な夏でも良質なワインを生む。香り高くスパイシーな性格で、ブレンドに複雑さとアロマの華やかさを加える。',
  '香り高くスパイシーな性格で、暑い気候に強いポルトガルの重要な栽培品種',
  ARRAY['ブラックベリー','プラム','スパイス','黒コショウ','ハーブ','花'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['アレンテージョ風豚肉','グリル肉','アサリのポルトガル風','羊のチーズ'],
  ARRAY['Alentejo','Douro','Tejo','Dão']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 14. Alfrocheiro
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Alfrocheiro', 'アルフロシェイロ', ARRAY[]::text[], true,
  'Portugal', 'Dão',
  'ダン地方を代表する黒ブドウ品種の一つで、華やかなアロマと豊かな果実味を持つ。比較的柔らかいタンニンと鮮やかな色合いが特徴で、ブレンドにフルーティーさと色調を加える。近年単一品種ワインとしても注目されており、ダンの花崗岩土壌で特に良い結果を示す。',
  '華やかなアロマと柔らかいタンニンを持ち、ダン地方のブレンドに果実味と色調を与える品種',
  ARRAY['ラズベリー','チェリー','スミレ','スパイス','プラム','花'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['ローストチキン','軽めの煮込み料理','セラチーズ','グリル野菜'],
  ARRAY['Dão','Alentejo','Bairrada']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 15. Blaufränkisch
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Blaufränkisch', 'ブラウフレンキッシュ', ARRAY['Lemberger','Kékfrankos'], true,
  'Austria', 'Burgenland',
  'オーストリアを代表する赤ワイン用品種で、ブルゲンラント州ミッテルブルゲンラントを中心に栽培される。深い色調と高い酸味、しっかりしたタンニンを持ち、スパイシーでダークフルーツの風味が特徴。冷涼な気候でも十分に成熟し、エレガントで長期熟成可能なワインを生む。',
  'ダークチェリーとスパイスの風味に高い酸味としっかりしたタンニンを持つ、オーストリア最良の赤ワイン用品種',
  ARRAY['ダークチェリー','ブラックベリー','黒コショウ','スパイス','ミネラル','スモーク','チョコレート'],
  '{"sweetness":1,"acidity":4,"tannin":4,"body":4,"finish":4}'::jsonb,
  ARRAY['ウィーナー・シュニッツェル','グーラッシュ','鹿肉のロースト','ハードチーズ','ソーセージ'],
  ARRAY['Mittelburgenland','Neusiedlersee','Sopron','Szekszárd','Württemberg']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 16. Zweigelt
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Zweigelt', 'ツヴァイゲルト', ARRAY['Rotburger'], true,
  'Austria', 'Niederösterreich',
  '1922年にフリッツ・ツヴァイゲルト博士がブラウフレンキッシュとザンクト・ラウレントを交配して生み出した品種。オーストリアで最も広く栽培される赤ワイン用品種で、チェリーの豊かな果実味と穏やかなタンニンが特徴。親しみやすいスタイルから本格的な樽熟成ワインまで幅広く造られる。',
  'チェリーの豊かな果実味と柔らかいタンニンが特徴の、オーストリアで最も人気のある赤ワイン品種',
  ARRAY['チェリー','ラズベリー','プラム','スパイス','バニラ','スミレ'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['シュニッツェル','豚肉のロースト','パスタ','チキンのグリル','チーズ'],
  ARRAY['Neusiedlersee','Weinviertel','Burgenland','Kamptal']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 17. St. Laurent
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'St. Laurent', 'ザンクト・ラウレント', ARRAY['Sankt Laurent','Saint Laurent'], true,
  'Austria', 'Thermenregion',
  'ピノ・ノワールに近縁とされる品種で、オーストリアとチェコで主に栽培される。ピノ・ノワールに似た繊細さとエレガンスを持ちながら、より深い色調と豊かな果実味を備える。栽培が難しく気まぐれな品種だが、成功すると非常に魅力的なワインを生む。',
  'ピノ・ノワールに似た繊細さに加え、より深い色調と豊かなダークフルーツの風味を持つ品種',
  ARRAY['ブラックチェリー','ブラックベリー','スミレ','スパイス','チョコレート','土'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['鴨肉のロースト','キノコ料理','仔牛のステーキ','チーズ'],
  ARRAY['Thermenregion','Neusiedlersee','Burgenland','Czech Republic']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 18. Dornfelder
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Dornfelder', 'ドルンフェルダー', ARRAY[]::text[], true,
  'Germany', 'Rheinhessen',
  '1955年にヘルフェンシュタイナーとヘロルドレーベの交配により生まれたドイツの赤ワイン用品種。ドイツで2番目に多く栽培される黒ブドウで、深い色調と豊かな果実味を持つ。辛口から甘口まで幅広いスタイルで造られ、親しみやすい味わいで人気がある。',
  '深い色合いと豊かなベリーの果実味を持つ、ドイツで人気の親しみやすい赤ワイン品種',
  ARRAY['ブラックベリー','チェリー','プラム','エルダーベリー','スミレ','スパイス'],
  '{"sweetness":2,"acidity":3,"tannin":2,"body":3,"finish":2}'::jsonb,
  ARRAY['ソーセージ','シュニッツェル','ピザ','軽めの肉料理','パスタ'],
  ARRAY['Rheinhessen','Pfalz','Württemberg','Nahe']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 19. Trollinger
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Trollinger', 'トロリンガー', ARRAY['Schiava','Vernatsch'], true,
  'Germany', 'Württemberg',
  'ドイツのヴュルテンベルク州で広く栽培され、イタリア北部では「スキアーヴァ」として知られる品種。軽やかで親しみやすいスタイルのワインを生み、日常的に楽しまれている。薄い色合いと柔らかいタンニン、フレッシュな酸味が特徴で、チルドでも美味しく飲める。',
  '軽やかでフレッシュな果実味を持つ日常ワイン向きの品種で、少し冷やして飲むのに最適',
  ARRAY['ストロベリー','チェリー','アーモンド','コットンキャンディ','赤スグリ'],
  '{"sweetness":2,"acidity":3,"tannin":1,"body":2,"finish":2}'::jsonb,
  ARRAY['ソーセージ','シュペッツレ','軽い前菜','ハム','サラダ'],
  ARRAY['Württemberg','Alto Adige','Trentino']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 20. Xinomavro
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Xinomavro', 'クシノマヴロ', ARRAY[]::text[], true,
  'Greece', 'Naoussa',
  'ギリシャ北部を代表する高貴な黒ブドウ品種で、名前は「酸っぱい黒」を意味する。ネッビオーロに例えられることが多く、高い酸味と強いタンニン、淡い色調が特徴。長期熟成により複雑なアロマを発揮し、トマト、オリーブ、ドライフルーツのニュアンスが現れる。',
  '高い酸味と強いタンニンを持つギリシャ最高の黒ブドウ品種で、「ギリシャのネッビオーロ」と称される',
  ARRAY['トマト','チェリー','オリーブ','スパイス','ドライプラム','タバコ','ハーブ'],
  '{"sweetness":1,"acidity":5,"tannin":5,"body":4,"finish":4}'::jsonb,
  ARRAY['ムサカ','ラム肉のグリル','フェタチーズ','グリル野菜','スブラキ'],
  ARRAY['Naoussa','Amynteo','Goumenissa','Rapsani']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 21. Agiorgitiko
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Agiorgitiko', 'アギオルギティコ', ARRAY['St. George'], true,
  'Greece', 'Nemea',
  'ペロポネソス半島ネメアを代表する品種で、ギリシャで最も広く栽培される黒ブドウの一つ。「聖ゲオルギオスのブドウ」を意味し、柔らかいタンニンと豊かな果実味が特徴。ロゼから力強い赤ワインまで幅広いスタイルで造られ、標高による味わいの違いが顕著に現れる。',
  '柔らかいタンニンと豊かなレッドフルーツの果実味を持つ、ギリシャで最も人気のある赤ワイン品種',
  ARRAY['チェリー','プラム','ラズベリー','スパイス','ミント','チョコレート'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":4,"finish":3}'::jsonb,
  ARRAY['ムサカ','パスティツィオ','ケバブ','グリルラム','フェタチーズ'],
  ARRAY['Nemea','Peloponnese']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 22. Mavrodaphne
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Mavrodaphne', 'マヴロダフネ', ARRAY[]::text[], true,
  'Greece', 'Patras',
  'ギリシャ西部パトラスを中心に栽培される品種で、名前は「黒い月桂樹」を意味する。甘口の酒精強化ワイン「マヴロダフネ・オブ・パトラス」で最もよく知られている。深い色調とドライフルーツ、チョコレートの風味が特徴で、デザートワインとして高い評価を受けている。',
  '甘口酒精強化ワインで有名なギリシャ品種で、ドライフルーツやチョコレートの豊かな風味を持つ',
  ARRAY['レーズン','イチジク','チョコレート','プラム','コーヒー','スパイス','キャラメル'],
  '{"sweetness":4,"acidity":3,"tannin":3,"body":4,"finish":4}'::jsonb,
  ARRAY['ダークチョコレート','ドライフルーツ','ブルーチーズ','ナッツのタルト'],
  ARRAY['Patras','Cephalonia','Peloponnese']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 23. Limnio
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Limnio', 'リムニオ', ARRAY['Kalambaki'], true,
  'Greece', 'Lemnos',
  'レムノス島原産とされるギリシャ最古級のブドウ品種で、アリストテレスの著作にも言及がある。ハーブやローリエの独特なアロマが特徴で、ギリシャの風土を強く反映したワインを生む。近年北ギリシャの生産者により再評価が進み、単一品種ワインも造られている。',
  'ローリエやハーブの独特なアロマを持つギリシャ最古級の品種で、古代からの栽培の歴史を持つ',
  ARRAY['ローリエ','ハーブ','赤い果実','スパイス','トマト','オレガノ'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['ギリシャ風サラダ','グリルラム','オリーブ料理','地中海風魚料理'],
  ARRAY['Lemnos','Halkidiki','Northern Greece']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 24. Saperavi
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Saperavi', 'サペラヴィ', ARRAY[]::text[], true,
  'Georgia', 'Kakheti',
  'ジョージア（グルジア）を代表する黒ブドウ品種で、果肉まで赤く染まるテンチュリエ品種の一つ。8000年の歴史を持つジョージアワイン文化の象徴であり、クヴェヴリ（陶器の壺）で醸造される伝統的な製法でも知られる。非常に濃い色調と豊かなタンニン、高い酸味を持ち、長期熟成に向く。',
  '果肉まで赤いテンチュリエ品種で、深い色調と高い酸味・タンニンを持つジョージアの象徴的品種',
  ARRAY['ブラックチェリー','プラム','ブラックベリー','スパイス','ダークチョコレート','スモーク','スミレ'],
  '{"sweetness":2,"acidity":4,"tannin":4,"body":5,"finish":4}'::jsonb,
  ARRAY['シュクメルリ','ハチャプリ','ジョージア風串焼き','熟成チーズ','ラム肉の煮込み'],
  ARRAY['Kakheti','Kartli','Mukuzani','Kindzmarauli']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 25. Pinotage
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Pinotage', 'ピノタージュ', ARRAY[]::text[], true,
  'South Africa', 'Stellenbosch',
  '1925年に南アフリカでピノ・ノワールとサンソーを交配して生まれた品種。南アフリカのシグネチャー品種として国際的に知られ、独特のスモーキーな風味が特徴。軽やかなフルーティーなスタイルから、濃厚で力強い樽熟成タイプまで幅広く造られる。',
  'ピノ・ノワールとサンソーの交配種で、スモーキーな風味とベリーの果実味が特徴的な南アフリカ固有品種',
  ARRAY['プラム','ブラックベリー','バナナ','スモーク','コーヒー','チョコレート','タバコ'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":4,"finish":3}'::jsonb,
  ARRAY['ボボティ','ブライ','バーベキュー','スパイシーソーセージ','グリルステーキ'],
  ARRAY['Stellenbosch','Swartland','Paarl','Western Cape']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 26. Carménère
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Carménère', 'カルメネール', ARRAY['Carmenere','Grande Vidure'], true,
  'Chile', 'Colchagua Valley',
  'ボルドー原産だがフィロキセラで壊滅し、チリで再発見された品種。長年メルローと混同されていたが、1994年にDNA鑑定で正式に同定された。チリのシグネチャー品種として確立され、グリーンペッパーのような独特のハーバルなアロマと柔らかいタンニンが特徴。',
  'チリで復活を遂げたボルドー原産品種で、グリーンペッパーのアロマと柔らかいタンニンが特徴',
  ARRAY['グリーンペッパー','チェリー','プラム','スパイス','コーヒー','タバコ','ダークチョコレート'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":4,"finish":3}'::jsonb,
  ARRAY['エンパナーダ','グリルステーキ','チリ風煮込み','スパイシー料理','豆料理'],
  ARRAY['Colchagua Valley','Rapel Valley','Maipo Valley','Cachapoal Valley']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 27. País
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'País', 'パイス', ARRAY['Listán Prieto','Mission'], true,
  'Chile', 'Maule Valley',
  '16世紀にスペインの征服者によって南米にもたらされた最も古い品種の一つ。チリでは長年バルクワイン用として軽視されてきたが、近年マウレやイタタの古木から造られるワインが高く評価されている。軽やかで酸味が高く、素朴な果実味と親しみやすさが魅力。',
  '南米最古のブドウ品種の一つで、軽やかな果実味と高い酸味を持つ素朴で親しみやすいワインを生む',
  ARRAY['ストロベリー','チェリー','ハーブ','花','土','ザクロ'],
  '{"sweetness":2,"acidity":4,"tannin":2,"body":2,"finish":2}'::jsonb,
  ARRAY['エンパナーダ','グリルチキン','軽い前菜','田舎風サラダ'],
  ARRAY['Maule Valley','Itata Valley','Biobío Valley']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 28. Criolla Grande
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Criolla Grande', 'クリオジャ・グランデ', ARRAY[]::text[], true,
  'Argentina', 'Mendoza',
  'アルゼンチンで長年最も広く栽培されてきた品種で、スペインからもたらされたミッション種系統の一つ。主にテーブルワインやぶどうジュースに使用されてきたが、栽培面積は近年減少傾向にある。薄い色合いと軽いボディ、穏やかな風味が特徴の素朴なワインを生む。',
  'アルゼンチンの伝統的な大量栽培品種で、軽やかで素朴な日常ワインを生む',
  ARRAY['ストロベリー','赤い果実','花','ハーブ','軽いスパイス'],
  '{"sweetness":2,"acidity":3,"tannin":1,"body":2,"finish":1}'::jsonb,
  ARRAY['エンパナーダ','ピザ','軽い前菜','サラダ'],
  ARRAY['Mendoza','San Juan']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 29. Plavac Mali
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Plavac Mali', 'プラヴァツ・マリ', ARRAY[]::text[], true,
  'Croatia', 'Dalmatia',
  'クロアチア・ダルマチア沿岸を代表する黒ブドウ品種で、ジンファンデルの子孫であることがDNA分析で判明している。急斜面の畑で栽培され、アドリア海の強い日差しを受けて高いアルコール度と濃厚な果実味を持つワインを生む。クロアチアで最も高く評価される赤ワイン品種。',
  'ジンファンデルの子孫であるクロアチアの代表品種で、濃厚な果実味と高いアルコール度を持つ',
  ARRAY['ブラックベリー','プラム','ドライフルーツ','スパイス','甘草','地中海ハーブ','イチジク'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":5,"finish":4}'::jsonb,
  ARRAY['ダルマチア風ラム','グリル魚介','パシュティツァーダ','ペカ料理','パグチーズ'],
  ARRAY['Dingač','Postup','Pelješac','Hvar','Vis']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 30. Kadarka
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Kadarka', 'カダルカ', ARRAY['Gamza'], true,
  'Hungary', 'Szekszárd',
  'ハンガリーの伝統的な赤ワイン用品種で、有名な「エグリ・ビカヴェール（雄牛の血）」の伝統的なブレンド成分。バルカン半島起源とされ、ブルガリアではガムザの名で知られる。繊細でスパイシーな風味とシルキーなテクスチャーが特徴だが、栽培が難しく気まぐれな品種。',
  '繊細なスパイス感とシルキーなテクスチャーを持つハンガリーの伝統品種で、エグリ・ビカヴェールの要',
  ARRAY['チェリー','スパイス','赤コショウ','ストロベリー','ハーブ','スモーク'],
  '{"sweetness":2,"acidity":4,"tannin":2,"body":3,"finish":3}'::jsonb,
  ARRAY['グーラッシュ','パプリカチキン','ソーセージ','ハンガリー風シチュー'],
  ARRAY['Szekszárd','Eger','Villány','Bulgaria']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 31. Feteasca Neagra
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Feteasca Neagra', 'フェテアスカ・ネアグラ', ARRAY[]::text[], true,
  'Romania', 'Dealu Mare',
  'ルーマニアを代表する固有の黒ブドウ品種で、「黒い乙女」を意味する。豊かな果実味とスパイシーなアロマ、しっかりしたタンニンを持ち、ルーマニアで最も品質の高い赤ワインを生む品種として評価されている。温暖な気候で最良の結果を出し、樽熟成との相性も良い。',
  '「黒い乙女」の名を持つルーマニア最高の黒ブドウ品種で、豊かな果実味とスパイシーさが特徴',
  ARRAY['ブラックチェリー','プラム','ブラックベリー','スパイス','チョコレート','バニラ','スモーク'],
  '{"sweetness":2,"acidity":3,"tannin":4,"body":4,"finish":4}'::jsonb,
  ARRAY['ミティティ','サルマーレ','グリル肉','熟成チーズ','シチュー'],
  ARRAY['Dealu Mare','Murfatlar','Moldova','Drăgășani']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 32. Mavrud
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Mavrud', 'マヴルッド', ARRAY[]::text[], true,
  'Bulgaria', 'Plovdiv',
  'ブルガリア最古の土着品種の一つで、プロヴディフ周辺のトラキア平原で主に栽培される。非常に濃い色調と力強いタンニン、豊かなダークフルーツの風味が特徴。ブルガリアで最も高品質な赤ワインを生む品種として知られ、長期熟成に優れたポテンシャルを持つ。',
  'ブルガリア最古級の品種で、非常に濃い色調と力強いタンニン、豊かな果実味を持つ',
  ARRAY['ブラックベリー','プラム','スパイス','なめし革','タバコ','ダークチョコレート'],
  '{"sweetness":2,"acidity":4,"tannin":5,"body":5,"finish":4}'::jsonb,
  ARRAY['グリルラム','バニッツァ','カヴァルマ','熟成チーズ'],
  ARRAY['Plovdiv','Asenovgrad','Thracian Valley']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 33. Prokupac
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Prokupac', 'プロクパツ', ARRAY[]::text[], true,
  'Serbia', 'Župa',
  'セルビアを代表する固有の黒ブドウ品種で、バルカン半島で古くから栽培されてきた。社会主義時代には大量生産用として軽視されたが、近年若い生産者たちにより再評価が進んでいる。中程度のボディと穏やかなタンニン、フレッシュな果実味が特徴で、飲みやすいスタイルのワインを生む。',
  'セルビアの代表品種で、中程度のボディとフレッシュな果実味を持つ親しみやすいワインを生む',
  ARRAY['ラズベリー','チェリー','ザクロ','ハーブ','スパイス','赤い花'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['チェヴァプチチ','プレスカヴィツァ','グリル肉','セルビアンサラダ'],
  ARRAY['Župa','Toplica','Šumadija']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 34. Muscat Bailey A
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Muscat Bailey A', 'マスカット・ベーリーA', ARRAY[]::text[], true,
  'Japan', 'Niigata',
  '1927年に川上善兵衛がベーリー種とマスカット・ハンブルグを交配して新潟県で生み出した日本固有の品種。2013年にOIV（国際ブドウ・ワイン機構）に品種登録された。イチゴキャンディのような甘い香りと軽やかなボディが特徴で、日本で最も広く栽培される赤ワイン用品種。',
  '日本で最も広く栽培される赤ワイン用品種で、イチゴキャンディのような甘い香りと軽やかな飲み口が特徴',
  ARRAY['イチゴキャンディ','ストロベリー','綿あめ','チェリー','フランボワーズ','スパイス'],
  '{"sweetness":3,"acidity":2,"tannin":2,"body":2,"finish":2}'::jsonb,
  ARRAY['焼き鳥','すき焼き','照り焼きチキン','煮物','和風ハンバーグ','肉じゃが'],
  ARRAY['山梨県','新潟県','山形県','長野県']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 35. Black Queen
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Black Queen', 'ブラック・クイーン', ARRAY[]::text[], true,
  'Japan', 'Niigata',
  '川上善兵衛がベーリー種とゴールデン・クイーンを交配して生み出した日本固有の品種。マスカット・ベーリーAよりも濃い色調としっかりした酸味を持ち、より本格的な赤ワインを造ることができる。日本の湿潤な気候に適応しており、病害にも比較的強い。',
  'マスカット・ベーリーAより濃厚で酸味が高く、しっかりとした赤ワインを生む日本固有品種',
  ARRAY['ブラックベリー','カシス','プラム','スパイス','ハーブ','酸味のある果実'],
  '{"sweetness":2,"acidity":4,"tannin":3,"body":3,"finish":3}'::jsonb,
  ARRAY['ビーフシチュー','焼肉','デミグラスソースのハンバーグ','赤味噌料理'],
  ARRAY['山梨県','長野県','新潟県']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 36. Yama Sauvignon
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Yama Sauvignon', 'ヤマ・ソーヴィニヨン', ARRAY[]::text[], true,
  'Japan', 'Yamanashi',
  '日本の野生ブドウ「ヤマブドウ」とカベルネ・ソーヴィニヨンを交配して生まれた品種。ヤマブドウ由来の高い酸味と濃い色調に、カベルネ・ソーヴィニヨンの構造感が加わる。日本の冷涼で湿潤な気候に適応しており、野性的で力強いワインを生む。',
  'ヤマブドウとカベルネ・ソーヴィニヨンの交配種で、高い酸味と野性的な力強さが特徴',
  ARRAY['カシス','ブラックベリー','野生の果実','スパイス','ハーブ','山椒','土'],
  '{"sweetness":1,"acidity":5,"tannin":4,"body":4,"finish":3}'::jsonb,
  ARRAY['ジビエ','鹿肉のロースト','山菜料理','味噌ベースの肉料理'],
  ARRAY['山梨県','長野県','岩手県']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 37. Petite Sirah
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Petite Sirah', 'プティ・シラー', ARRAY['Durif'], true,
  'France', 'Isère',
  '1868年にフランスのフランソワ・デュリフ博士がシラーとプルサンの交配で生み出した品種。フランスでは衰退したが、カリフォルニアで大きな成功を収めている。非常に濃い色調と強烈なタンニン、力強いボディが特徴で、長期熟成に向く骨太なワインを生む。',
  'シラーとプルサンの交配種で、極めて濃い色調と強烈なタンニン、フルボディの力強いワインを生む',
  ARRAY['ブラックベリー','ブルーベリー','プラム','黒コショウ','ダークチョコレート','スモーク','インク'],
  '{"sweetness":2,"acidity":3,"tannin":5,"body":5,"finish":4}'::jsonb,
  ARRAY['BBQリブ','ブリスケット','ブルーチーズ','スパイシーなシチュー','グリルステーキ'],
  ARRAY['California','Lodi','Paso Robles','Napa Valley','Australia']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 38. Norton
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Norton', 'ノートン', ARRAY['Cynthiana'], true,
  'USA', 'Virginia',
  '北米原産のブドウ種（ヴィティス・アエスティヴァリス）に分類されるアメリカ固有の品種。ミズーリ州の公式ブドウ品種に指定されており、フィロキセラに強い耐性を持つ。濃い色調と力強いタンニン、独特の風味を持ち、アメリカの風土を反映したワインを生む。',
  '北米原産のブドウ種で、フィロキセラに耐性を持ちアメリカ中部・東部で栽培される力強い品種',
  ARRAY['ブラックベリー','プラム','スパイス','ハーブ','チョコレート','バイオレット'],
  '{"sweetness":2,"acidity":4,"tannin":4,"body":4,"finish":3}'::jsonb,
  ARRAY['BBQ','スモークミート','グリルステーキ','ハードチーズ'],
  ARRAY['Missouri','Virginia','Arkansas','Ozarks']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

-- 39. Chambourcin
INSERT INTO grape_varieties (name_en, name_ja, aliases, is_red, origin_country, origin_region, description_ja, characteristics, typical_aromas, typical_palate, food_pairings, notable_regions)
VALUES (
  'Chambourcin', 'シャンブルサン', ARRAY[]::text[], true,
  'France', 'Loire Valley',
  'フランスの育種家ジョアネス・セーヴが開発したフレンチ・アメリカン・ハイブリッド品種。病害に強く冷涼な気候にも適応するため、アメリカ東部やオーストラリアで広く栽培されている。濃い色調としっかりしたボディを持ち、ハイブリッド品種としては高品質なワインを生むことで評価されている。',
  '病害に強いフレンチ・ハイブリッド品種で、濃い色調としっかりしたボディを持つ高品質なワインを生む',
  ARRAY['ブラックチェリー','プラム','スパイス','チョコレート','ハーブ','スモーク'],
  '{"sweetness":2,"acidity":3,"tannin":3,"body":4,"finish":3}'::jsonb,
  ARRAY['BBQチキン','パスタ','グリル肉','チーズ','トマト料理'],
  ARRAY['New South Wales','Pennsylvania','New Jersey','Virginia','Maryland']
) ON CONFLICT (name_en) DO UPDATE SET
  name_ja = EXCLUDED.name_ja, aliases = EXCLUDED.aliases, is_red = EXCLUDED.is_red,
  origin_country = EXCLUDED.origin_country, origin_region = EXCLUDED.origin_region,
  description_ja = EXCLUDED.description_ja, characteristics = EXCLUDED.characteristics,
  typical_aromas = EXCLUDED.typical_aromas, typical_palate = EXCLUDED.typical_palate,
  food_pairings = EXCLUDED.food_pairings, notable_regions = EXCLUDED.notable_regions,
  updated_at = now();

# ワインAPI・データソース調査

> **調査日**: 2026-03-20

---

## 1. ワインデータAPI

### Wine-Searcher API（推奨: メイン情報源）
- **URL**: https://www.wine-searcher.com/trade/api
- **提供データ**: ワイン名、品種、生産者、地域、アルコール度数、集約評論家スコア、価格帯（最安/最高/平均）
- **形式**: REST (XML/JSON)
- **料金**: 有料（トライアル: 100回/日無料）
- **特徴**: Robert Parker、Wine Spectator等の複数評論家スコアを100点満点に正規化して集約

### Global Wine Score API（推奨: スコアデータ）
- **URL**: https://www.globalwinescore.com/api/
- **提供データ**: ワイン名、ヴィンテージ、アペラシオン、色、集約スコア、信頼度指数
- **形式**: REST (JSON/XML)、トークン認証
- **料金**: 無料枠あり（10リクエスト/分）
- **特徴**: 複数評論家スコアを正規化・集約。時系列分析にも対応

### Open Food Facts（推奨: バーコード補完）
- **URL**: https://world.openfoodfacts.org/data
- **提供データ**: 商品名、バーコード、原材料、栄養情報、原産国、カテゴリ
- **形式**: REST JSON、CSV/MongoDBバルクダウンロード
- **料金**: 完全無料（Open Database License）
- **制限**: ワイン専用フィールド（ヴィンテージ、品種等）は不完全

### WineVybe API
- **URL**: https://winevybe.com/wine-api/
- **提供データ**: ワイン・ビール・リカーデータ（地域、品種、テイスティングノート、ペアリング、受賞歴）
- **料金**: 有料（RapidAPI経由）

### Wine Folly / db.wine
- **URL**: https://www.db.wine/
- **提供データ**: 生産者管理のワイン情報、品種、地域、テイスティングプロファイル
- **料金**: 無料/Pro tier

### Vivino（公式APIなし）
- 公式APIは存在しない
- スクレイピングツールあり（ToS違反リスク）: Apify、viviner (Python)、vivino-api (Node.js)
- データ品質は高い（7000万+ユーザーの集合知）が、利用は非推奨

---

## 2. ラベル認識API

### Google Cloud Vision API（推奨: OCR）
- **用途**: ラベルのテキスト抽出（OCR）
- **料金**: 1,000回/月無料、以降 $1.50/1,000回
- **注意**: 生テキスト抽出のみ。ワイン固有フィールドへの構造化パースは自前で実装が必要

### API4AI Wine Recognition（推奨: ワイン認識）
- **URL**: https://api4.ai/apis/wine-rec
- **用途**: 40万+ラベルからワインブランド・品種を特定
- **入力**: 画像URL or アップロード (jpg/png)
- **料金**: 無料プランあり（RapidAPI経由）
- **特徴**: 汎用OCRではなくワインラベル専用の認識エンジン

### 推奨パイプライン
1. Google Cloud Vision → ラベルからテキスト抽出
2. API4AI → ワインブランド・品種を識別
3. 抽出データをWine-Searcher/Global Wine Scoreと照合
4. Open Food Facts → バーコードで補完
5. マッチ結果をユーザーに提示 → 確認・編集して保存

---

## 3. 地理データ

### UC Davis AVA Boundary Dataset（推奨: 米国）
- **URL**: https://github.com/UCDavisLibrary/ava
- **形式**: GeoJSON / Shapefile
- **カバレッジ**: 270+ 米国AVA（正確な境界ポリゴン付き）
- **ライセンス**: オープン、無料

### Wikidata SPARQL（推奨: 世界）
- **URL**: https://query.wikidata.org/
- **カバレッジ**: ワイン産地、品種、ワイナリー等（地理座標付き）
- **料金**: 無料
- **注意**: カバレッジにムラあり（主要産地は充実、小規模産地は不十分）

### その他
- **UC Davis Wine Ontology**: RDFオントロジー、DBpediaクロスリファレンス付き
- **X-Wines Dataset**: 世界のワインデータ + ユーザー評価（レコメンドシステム向け）
- **Kaggle Wine Reviews**: ~130,000件のWineEnthusiastレビュー

---

## 4. ワイン分類システム

### アペラシオン制度
| 国 | 制度 | 数 |
|---|---|---|
| フランス | AOC/AOP | 360+ |
| イタリア | DOC/DOCG | 329 DOC + 73 DOCG |
| アメリカ | AVA | 270+ |
| スペイン | DO/DOCa/DOP | 79 DOP + 2 DOCa |
| ドイツ | Prädikatswein | 熟度ベース |

### 評価システム
| ソース | スケール | API利用 |
|---|---|---|
| Robert Parker / Wine Advocate | 100点 | Wine-Searcher経由で集約 |
| Wine Spectator | 100点 | Wine-Searcher経由で集約 |
| James Suckling | 100点 | Wine-Searcher経由で集約 |
| Global Wine Score | 100点（集約） | 直接API利用可能 |

---

## 5. 推奨データソースまとめ

| 用途 | 推奨ソース | バックアップ |
|---|---|---|
| ワイン検索・基本情報 | Wine-Searcher API | WineVybe API |
| 集約スコア | Global Wine Score API | Wine-Searcher API |
| ラベルスキャン | Google Cloud Vision + API4AI | — |
| 価格データ | Wine-Searcher API | — |
| 地理データ（米国） | UC Davis AVA Dataset | Wikidata |
| 地理データ（世界） | Wikidata SPARQL | db.wine |
| 品種リファレンス | Wikidata + db.wine | — |
| バーコード検索 | Open Food Facts | Wine-Searcher |

# Wine App Competitive Research Report
**Date: March 2026**

---

## Table of Contents
1. [Individual App Analysis](#individual-app-analysis)
2. [Cross-App Comparison Matrix](#cross-app-comparison-matrix)
3. [Essential Data Fields (Shown Across All Major Apps)](#essential-data-fields)
4. [Gamification & Collection Features](#gamification--collection-features)
5. [Geographic/Map Feature Implementation](#geographicmap-feature-implementation)
6. [Market Gaps & User Wishes](#market-gaps--user-wishes)

---

## Individual App Analysis

### 1. VIVINO
**Category:** All-in-one wine discovery, scanning, rating, and purchasing
**Users:** 70M+ community members | **Database:** 10M+ wines
**App Store Rating:** 4.8/5 (127K ratings, Apple Editors' Choice)

#### Wine Information Displayed (Wine Detail Page)
- Wine name, producer/winery, vintage year
- Region and country of origin
- Grape variety/varieties
- Wine style/type (red, white, rosé, sparkling, dessert, fortified)
- Average community rating (out of 5 stars, shown to one decimal)
- Number of ratings
- Price (average and range across retailers)
- "Match Score" — personalized percentage predicting how much you'll like it
- Taste profile chart (light-bold, smooth-tannic, dry-sweet, soft-acidic)
- Community tasting notes (flavor tags voted on by users)
- Food pairing suggestions
- Top reviews from community
- Professional critic scores (when available)
- "Where to buy" with retailer links and prices
- Drinking window / peak maturity
- Alcohol percentage

#### Scanning/Recognition
- Camera-based label scanning using image recognition AI
- Users photograph the wine label; AI matches to database
- Also supports restaurant wine list/menu scanning
- Barcode scanning as secondary identification method
- Users report scanning accuracy has degraded over time, especially in free tier

#### Rating System
- 5-star scale with half-star increments for user ratings
- Users can add written reviews alongside star ratings
- Community average displayed prominently
- Professional scores aggregated when available
- "Match Score" (percentage) based on user's taste profile and rating history

#### Social Features
- Follow friends and other users
- Activity feed showing friends' ratings and reviews
- Share wine ratings to Facebook, Twitter, email
- Community tasting notes (crowdsourced flavor descriptors)
- User profiles showing wine history and preferences

#### Collection/Cellar Management
- "My Cellar" feature to track owned wines
- Track by vintage and quantity
- Wishlist for wines to try
- Personal wine journal with ratings and notes
- **Limitation:** No granular physical location tracking (e.g., rack position, bin number)

#### Map/Geographic Features
- Limited — primarily shows nearby retailers
- Region information on wine pages (country, region, sub-region)
- No dedicated wine region exploration map

#### Gamification Elements
- "Wine Adventures" — themed educational challenges (e.g., explore Italian wines)
- Quizzes tied to wine adventures
- Taste profile development (evolves as you rate more wines)
- Annual summary statistics
- No formal badge/achievement system
- No streaks or levels

#### Unique Features
- Netflix-style personalized recommendations powered by 70M users' data
- Match Score algorithm (unique selling point)
- In-app purchasing from 500+ merchants
- Wine club subscription service (US only)
- Decanting/breathing time recommendations

#### User Complaints (from App Store Reviews)
- Aggressive advertising (full-screen timed ads for non-wine products)
- Premium paywall — features previously free now cost $4.99-$5.99/month
- Label scanning reliability has declined significantly
- Cellar management lacks physical location tracking
- Missing filters: price range, drink-by date, vintage year, purchase date
- Algorithm accuracy reportedly decreased after recent updates

---

### 2. WINE-SEARCHER
**Category:** Price comparison engine and wine reference database
**Database:** 17M+ wines, beers, spirits across 90,000+ retail stores

#### Wine Information Displayed
- Wine name, producer, vintage
- Region hierarchy (country > region > sub-region > appellation)
- Grape variety/blend composition
- Wine style and type
- Average retail price (with price range across merchants)
- Price history graph (1-year free, 5-year for Pro members)
- Professional critic scores aggregated (Wine Spectator, Robert Parker, Jancis Robinson, etc.)
- Wine-Searcher's own aggregated "Critics Score"
- Tasting notes from professional critics
- Alcohol percentage
- Bottle size options
- Where to buy (retailer list with prices, sorted by price)
- Producer/winery profile information
- Food pairing suggestions
- "Value" indicator relative to comparable wines

#### Scanning/Recognition
- Photo-based label scanning
- Text-based search (more relied upon)
- Barcode scanning

#### Rating System
- Aggregated professional critic scores (100-point scale)
- Compiles scores from: Wine Spectator, Robert Parker/Wine Advocate, Jancis Robinson, Wine Enthusiast, Decanter, James Suckling, and many others
- Wine-Searcher aggregate score
- User ratings also available
- No proprietary scoring algorithm

#### Social Features
- Minimal social features — primarily a reference/shopping tool
- User reviews and ratings
- No follower system or activity feed
- No social sharing integration

#### Collection/Cellar Management
- Basic wishlist/favorites
- No robust cellar tracking
- Pro members get more advanced features

#### Map/Geographic Features
- **Strong geographic features** — core competency
- Retailer map showing nearby stores with specific wine in stock
- Wine region information and mapping
- "Find nearby" functionality
- Geographic price comparison (prices by market/region)

#### Gamification Elements
- None

#### Unique Features
- **Best-in-class price comparison** across global retailers
- Price history charts showing market trends over time
- Comprehensive professional critic score aggregation
- Restaurant wine list price analysis
- Auction price tracking
- "Fair price" indicator
- Pro tier with advanced analytics, longer price histories

#### User Complaints
- Interface feels utilitarian/dated
- Limited free features push toward Pro subscription
- Mobile app less polished than competitors
- Not discovery-oriented — better for researching known wines
- Overwhelming amount of data for casual users

---

### 3. DELECTABLE
**Category:** Social wine discovery with expert curation
**Scope:** Covers wines, beers, and spirits

#### Wine Information Displayed
- Wine name, producer, vintage
- Region and country
- Grape variety
- Wine style
- User ratings
- Expert ratings and reviews (from verified wine professionals)
- Tasting notes (from experts and community)
- Price range
- Trending status
- Style categorization

#### Scanning/Recognition
- Label photo scanning with AI recognition
- If label not recognized automatically, experts manually identify wines
- Covers wines, beers, and spirits (broader than most wine-only apps)

#### Rating System
- 5-star rating scale for users
- Expert ratings prominently featured
- Expert reviews carry special verification badges

#### Social Features
- **Strong social focus** — designed as a "wine social network"
- Follow friends, wine experts, sommeliers, and winemakers
- News feed showing expert recommendations and trending wines
- Trending posts filtered by wine style and price range
- Comment and like functionality on reviews
- Direct connection to verified wine professionals

#### Collection/Cellar Management
- Personal wine log/journal
- Basic collection tracking
- Less robust than CellarTracker for inventory management

#### Map/Geographic Features
- Limited geographic features
- Some location-based discovery

#### Gamification Elements
- Minimal — focused on expert content discovery rather than gamification
- No badges, levels, or achievement systems

#### Unique Features
- **Expert-first content model** — sommeliers and winemakers actively post
- Expert verification system for wine identification
- Cross-beverage support (wine, beer, spirits)
- Curated trending content by style and price

#### User Complaints
- App reportedly discontinued/acquired by Vinous (limited recent updates)
- Smaller community than Vivino
- Less comprehensive database
- Limited cellar management features

---

### 4. CELLARTRACKER
**Category:** Cellar management and wine inventory database
**Database:** 3M+ wines | **Community:** 600K+ users | **Tasting Notes:** 8.5M+

#### Wine Information Displayed
- Wine name, producer/winery, vintage
- Region hierarchy (country, region, sub-region, vineyard)
- Grape variety/blend with percentages
- Wine type and style
- Community average score
- Professional critic scores (aggregated)
- Community tasting notes (extensive — 8.5M+)
- Drinking window (community consensus)
- Alcohol percentage
- Production method notes
- Bottle size
- Auction/market value estimate
- Personal purchase information (price paid, date, store)

#### Scanning/Recognition
- Barcode scanning
- Label photo scanning
- Manual search and entry

#### Rating System
- 100-point scale (traditional wine scoring)
- Community average scores
- Professional critic scores imported
- Users write detailed tasting notes alongside scores
- Structured tasting note format available (appearance, nose, palate, finish)

#### Social Features
- Community tasting notes (the largest repository of user-generated wine reviews)
- Follow other collectors
- Compare cellars
- Wine forums and discussion
- Less "social media" focused, more "reference community"

#### Collection/Cellar Management
- **Industry-leading cellar management** — this is the primary purpose
- Track every bottle: purchase date, purchase price, store/source
- Storage location tracking (bin, rack, row, column positions)
- Cellar valuation (total collection worth)
- Drinking window tracking with maturity alerts
- Consumption logging (when you drank it)
- Inventory reports and analytics
- Sort/filter by: region, vintage, grape, value, maturity, color
- Bulk import/export capabilities
- Barcode-based inventory management
- "Ready to drink" notifications
- Cellar statistics and dashboards

#### Map/Geographic Features
- Regional wine exploration
- Less focused on geographic mapping than Wine-Searcher

#### Gamification Elements
- Cellar statistics (total bottles, value, etc.) serve as implicit "score"
- No formal badges, achievements, or levels
- Collection milestones not formally tracked

#### Unique Features
- **Most comprehensive cellar inventory management** in any wine app
- 8.5M+ community tasting notes (largest user-generated wine review database)
- Detailed storage location tracking (bin/rack mapping)
- Drinking window consensus from community
- Cellar valuation tools
- Professional-grade inventory management
- Free tier is very functional
- Import/export wine data (CSV)

#### User Complaints
- User interface is dated/not visually appealing
- Learning curve for new users
- Mobile app historically less polished than web version
- Scanning less reliable than Vivino
- Onboarding process could be smoother
- Lacks modern social features
- No recommendation engine

---

### 5. HELLO VINO
**Category:** Wine recommendation and education assistant
**Focus:** Helping beginners choose wine

#### Wine Information Displayed
- Wine type and style
- Grape variety
- Region recommendations
- Food pairing suggestions (primary focus)
- Occasion-based recommendations
- Price range categories
- Flavor profile descriptions

#### Scanning/Recognition
- Limited/no scanning — recommendation-focused rather than identification-focused
- Works more as a "what should I buy?" assistant

#### Rating System
- Not rating-focused
- Recommendation-based rather than review-based

#### Social Features
- Minimal social features
- Share recommendations with friends

#### Collection/Cellar Management
- Minimal — not designed for collection tracking

#### Map/Geographic Features
- Limited

#### Gamification Elements
- Wine education quizzes
- Learning progression through wine categories
- No formal badge or achievement system

#### Unique Features
- **Occasion-based recommendations** ("wine for a date," "wine for a BBQ," "gift wine")
- Food pairing engine as primary feature
- Beginner-friendly approach
- "What wine should I bring?" scenarios
- Wine education content

#### User Complaints
- Limited database compared to Vivino/CellarTracker
- Not useful for advanced wine enthusiasts
- Recommendation algorithm not highly personalized
- App updates have been infrequent

---

### 6. WINE SPECTATOR APP
**Category:** Professional wine ratings and editorial content
**Parent:** Wine Spectator magazine (founded 1976)

#### Wine Information Displayed
- Wine name, producer, vintage
- Wine Spectator score (100-point scale)
- Expert tasting notes from WS reviewers
- Region and appellation
- Grape variety
- Price (suggested retail)
- Drinking window
- Vintage chart ratings by region/year
- Editorial articles and features

#### Scanning/Recognition
- Search-based (text search of their database)
- Limited scanning capabilities
- Focus on their curated/reviewed wines only

#### Rating System
- **100-point scale** (the Wine Spectator standard):
  - 95-100: Classic
  - 90-94: Outstanding
  - 85-89: Very Good
  - 80-84: Good
  - 75-79: Mediocre
  - Below 75: Not Recommended
- Only professional reviewer scores (no community ratings)

#### Social Features
- Minimal — content consumption focused
- No community reviews or social network features

#### Collection/Cellar Management
- Wine tracking features tied to WS database
- "My Wines" list
- Basic collection organization

#### Map/Geographic Features
- Vintage charts organized by region
- Region-based wine exploration
- Restaurant award program (linked to geographic discovery)

#### Gamification Elements
- None

#### Unique Features
- **Vintage charts** — comprehensive region-by-year quality matrices
- World-class professional tasting notes
- Restaurant wine list awards database
- Editorial content and wine news
- WS Top 100 annual list
- Requires subscription (tied to magazine)

#### User Complaints
- Expensive (requires Wine Spectator subscription)
- Limited to wines WS has reviewed (not comprehensive)
- No community/social features
- Feels like a companion to the magazine, not a standalone app
- Interface can feel dated

---

### 7. PLONK WINE
**Category:** Wine subscription and discovery service
**Focus:** Natural and artisanal wines

#### Wine Information Displayed
- Wine name and producer
- Region and country
- Grape variety
- Winemaker story/philosophy
- Tasting notes (curated by Plonk team)
- Food pairing suggestions
- Wine style (natural, organic, biodynamic focus)
- Subscription pricing

#### Scanning/Recognition
- Not a scanning app — subscription/discovery model

#### Rating System
- Curated selections rather than ratings
- No community scoring system

#### Social Features
- Wine club community
- Limited social networking features

#### Collection/Cellar Management
- Subscription management
- Track past shipments

#### Gamification Elements
- None

#### Unique Features
- **Focus on natural/artisanal/small-producer wines**
- Subscription wine club model
- Winemaker stories and philosophy content
- Curated discovery (editorial picks, not algorithm)
- Appeals to natural wine movement

---

### 8. OTHER NOTABLE WINE APPS

#### Wine Ring
- **AI/ML-driven recommendations** trained by simple feedback (Love/Like/So-So)
- Photo label scanning
- Cellar tracking
- Style, price, and food pairing filters
- Unique: Machine learning taste model that improves with use

#### Tipple
- **Structured tasting education**
- Interactive aroma wheels (color-coded by fruit type)
- Systematic tasting framework: appearance, aroma, palate
- Tracks: acidity, tannins, body, alcohol, finish length
- Context metadata: setting, time, mood during tasting
- Producer, grape variety, region fields

#### Wine Events
- Local wine/food event discovery
- Virtual tasting participation
- Wine vacation planning
- Online classes and podcasts

#### Corkage Fee
- **Map-based restaurant BYOB policy lookup**
- User-submitted corkage fee database
- Service ratings and wine list quality scores
- Restaurant favoriting and user following

#### My Wine Society
- Social networking for wine lovers
- Private chat rooms
- News feeds (all users or friends-only)
- Media channels and group communities
- Location-based event discovery

---

## Cross-App Comparison Matrix

| Feature | Vivino | Wine-Searcher | Delectable | CellarTracker | Hello Vino | Wine Spectator | Plonk |
|---------|--------|---------------|------------|---------------|------------|-----------------|-------|
| Label Scanning | YES | YES | YES | YES | No | No | No |
| Community Ratings | YES | Limited | YES | YES | No | No | No |
| Expert/Critic Scores | Aggregated | Extensive | Featured | Aggregated | No | Primary | Curated |
| Cellar Management | Basic | No | Basic | Advanced | No | Basic | No |
| Price Comparison | YES | Best | No | No | No | Retail only | Subscription |
| Food Pairings | YES | Limited | No | No | Primary | No | YES |
| Social Network | YES | No | YES | Community | No | No | Club |
| Purchase In-App | YES | Links | No | No | No | No | YES |
| Recommendations | Algorithm | No | Expert | No | Rule-based | No | Curated |
| Education Content | Some | No | No | No | YES | Editorial | Some |
| Map/Location | Retailers | Retailers | No | No | No | Restaurants | No |
| Free Tier | Yes (ads) | Limited | Yes | Yes | Yes | No (subscription) | No |

---

## Essential Data Fields
*Fields consistently shown across ALL major wine apps — these are the baseline expected by users:*

### Tier 1: Universal (shown in every app)
1. **Wine name** (producer + wine name)
2. **Vintage year**
3. **Wine type** (red, white, rosé, sparkling, dessert, fortified)
4. **Region/Country of origin**
5. **Grape variety/varieties**
6. **Rating/Score** (format varies: 5-star, 100-point, or percentage)

### Tier 2: Expected (shown in most apps)
7. **Tasting notes** (flavor descriptors)
8. **Price** (retail price or range)
9. **Producer/Winery name**
10. **Food pairing suggestions**
11. **Wine style descriptors** (light-full bodied, dry-sweet, etc.)
12. **Alcohol percentage**

### Tier 3: Valuable (shown in serious/advanced apps)
13. **Drinking window** (when to drink for optimal enjoyment)
14. **Professional critic scores** (aggregated from multiple sources)
15. **Taste profile visualization** (chart or graph of characteristics)
16. **Blend composition** (percentages if multi-grape)
17. **Appellation/Sub-region** (detailed geographic classification)
18. **Bottle size**
19. **Production method** (oak aging, fermentation style, etc.)
20. **Purchase history** (personal: date, price, source)

### Tier 4: Premium/Niche
21. **Cellar location** (bin, rack, row)
22. **Market value/auction prices**
23. **Vintage quality rating** (for the year, by region)
24. **Winemaker information**
25. **Organic/biodynamic/natural certification**
26. **Sulfite information**
27. **Decanting recommendations**

---

## Gamification & Collection Features

### Current Gamification in Wine Apps

**The wine app space is notably under-gamified.** Most major apps have minimal or no gamification:

| App | Gamification Present? | Details |
|-----|----------------------|---------|
| Vivino | Minimal | Wine Adventures (themed challenges + quizzes), taste profile development, annual stats |
| Wine-Searcher | None | Pure utility tool |
| Delectable | None | Social engagement only |
| CellarTracker | Implicit only | Collection statistics serve as passive "score" |
| Hello Vino | Minimal | Wine education quizzes |
| Wine Spectator | None | Content consumption only |
| Wine Ring | Minimal | ML model improvement as implicit progression |

### Gamification Opportunities (Not Yet Implemented in Major Apps)
Based on analysis of what exists and what's missing:

1. **Badges/Achievements** — No major wine app has a robust badge system. Potential badges:
   - Variety explorer (try X different grape varieties)
   - Region collector (try wines from X different regions/countries)
   - Vintage vertical (try multiple vintages of the same wine)
   - Tasting note writer (write X detailed reviews)
   - Rare find (scan a wine with <100 reviews)
   - Budget hunter (find highly rated wines under $X)

2. **Streaks** — No wine app currently implements streaks:
   - Daily/weekly wine logging streaks
   - Consecutive days of wine education
   - Regular cellar updates

3. **Levels/Progression** — Absent from all major apps:
   - Novice > Enthusiast > Connoisseur > Sommelier progression
   - XP system based on scanning, rating, reviewing, exploring
   - Level-gated features or recognition

4. **Challenges** — Only Vivino has something similar (Wine Adventures):
   - Monthly themed challenges (e.g., "Italian Month")
   - Seasonal challenges
   - Community competitions
   - Blind tasting challenges

5. **Collection Milestones** — Not formalized in any app:
   - "First 100 wines scanned"
   - "Wines from all 50 states"
   - "Complete a country's major regions"
   - "Try all noble grape varieties"

6. **Leaderboards** — No major app implements this:
   - Regional leaderboards (top reviewers in your area)
   - Category leaderboards (most diverse palate, most reviews)

### Collection Features Across Apps

| Feature | Best Implementation |
|---------|-------------------|
| Bottle inventory | CellarTracker |
| Storage location (bin/rack) | CellarTracker |
| Purchase tracking (price/date/store) | CellarTracker |
| Drinking window alerts | CellarTracker |
| Collection valuation | CellarTracker |
| Wishlist | Vivino |
| Consumption history | CellarTracker |
| Import/export data | CellarTracker |
| Visual cellar layout | **NONE** (gap in market) |

---

## Geographic/Map Feature Implementation

### How Wine Apps Currently Use Maps/Geography

**Wine-Searcher (Best geographic implementation):**
- Retailer location map showing stores with specific wines in stock
- Geographic price comparison (see how prices vary by market)
- Region-based wine exploration

**Vivino:**
- Nearby retailer map
- Region information on wine pages (text-based, not map-based)
- No interactive wine region maps

**Corkage Fee (Niche but notable):**
- Map-based restaurant BYOB lookup
- Geographic restaurant discovery

**Wine Events:**
- Location-based event discovery
- Virtual and in-person tasting locations

### Geographic Features NOT Implemented (Opportunities)
1. **Interactive wine region explorer map** — Browse wine regions on a world map, zoom into appellations, see region characteristics
2. **Personal wine map** — "Countries/regions I've explored" visualization
3. **Wine trail/route planning** — For winery visits and wine tourism
4. **Terroir visualization** — Overlay soil types, climate data, elevation on wine region maps
5. **Heat map of personal preferences by region** — Show which regions produce wines you consistently rate highly
6. **Nearby winery discovery** — GPS-based winery finder with reviews
7. **Wine migration tracking** — Where a wine was produced vs. where you purchased/drank it
8. **AR wine region overlay** — Point camera at a wine and see its region on a map

---

## Market Gaps & User Wishes

### Consistent User Complaints Across All Wine Apps

1. **Aggressive monetization** — Ads, paywalls, premium upsells frustrate users across Vivino and others
2. **Scanning reliability** — Label scanning works inconsistently; users want near-100% accuracy
3. **Dated UI/UX** — CellarTracker and Wine-Searcher especially criticized for visual design
4. **Lack of personalization depth** — Recommendations feel generic after initial novelty
5. **No cross-app data portability** — Users locked into one ecosystem

### Features Users Wish Existed (Gaps in the Market)

1. **Visual cellar layout** — Physical representation of your wine storage (grid/rack view showing what's where)
2. **Better filtering** — Filter by drink-by date, price paid, purchase date, occasion suitability
3. **Smart drinking recommendations** — "What should I open tonight?" based on what's in cellar, what's at peak, food being served
4. **Wine journey/progression tracking** — See how your palate has evolved over time
5. **Robust offline mode** — Access cellar and notes without internet
6. **Better natural/organic wine data** — Certification info, sulfite levels, farming practices
7. **Meal planning integration** — Connect wine collection with recipe apps
8. **Group tasting features** — Organize blind tastings with friends, real-time group scoring
9. **Wine investment tracking** — Portfolio value over time, ROI on bottles
10. **Better education integration** — Structured wine courses within the app, not just trivia
11. **Restaurant integration** — Scan a restaurant wine list, see which wines you've had and rated
12. **Subscription management** — Track multiple wine club subscriptions in one place
13. **Photo journal** — Better photo management for wines (label, bottle, setting, meal paired with)
14. **Shared cellar management** — Multiple users managing the same physical cellar
15. **Price alerts** — Notify when a wishlisted wine drops below a target price

### The Biggest Overall Gap
**No single app combines excellent cellar management (CellarTracker's strength) with excellent discovery/social features (Vivino's strength) and excellent price comparison (Wine-Searcher's strength) with modern gamification and geographic exploration.**

Users are forced to use multiple apps:
- Vivino for scanning and discovery
- CellarTracker for inventory management
- Wine-Searcher for price comparison

An app that could consolidate these three use cases with modern UX, meaningful gamification (especially around exploration and collecting), and interactive geographic features would fill a significant gap.

---

## Summary: Key Takeaways for Wine Mapper

1. **Essential data fields** are well-established — any wine app must show the Tier 1 and Tier 2 fields listed above
2. **Gamification is a massive untapped opportunity** — no major wine app does it well
3. **Geographic/map features are underexplored** — only used for retail location, not for wine region exploration or personal journey tracking
4. **Collection features are split** — CellarTracker owns serious cellar management, Vivino owns casual tracking. No app bridges both well
5. **The "wine journey" narrative is unmapped** — tracking your exploration of regions, grapes, styles over time with visual progression is not done by anyone
6. **Social features need modernizing** — existing social features feel 2015-era; modern social patterns (stories, challenges, shared experiences) are absent
7. **Scanning is table stakes** — every modern wine app needs label scanning, but reliability remains a pain point
8. **Price comparison is valued but siloed** — Wine-Searcher excels but lacks everything else

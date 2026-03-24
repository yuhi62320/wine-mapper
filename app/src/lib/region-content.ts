export interface RegionContent {
  countryCode: string;
  regionName: string;
  nameJa: string;
  heroImage: string; // Unsplash URL for hero/top image
  description: string; // 3-4 sentences overview
  terroir: string; // soil, elevation, geography - 4-5 sentences
  climate: string; // climate type, rainfall, temperature - 3-4 sentences
  history: string; // historical background - 4-5 sentences
  wineStyles: string; // key wine styles and methods - 4-5 sentences
  keyGrapes: string[];
  topProducers: string; // 5-10 notable producers with descriptions - 4-5 sentences
  foodPairing: string; // local cuisine pairings - 3-4 sentences
  tourism: string; // travel tips, best time to visit - 4-5 sentences
  nature: string; // landscape, scenery - 3-4 sentences
  culture: string; // cultural significance - 3-4 sentences
  regulations: string; // AOC/DOC rules, classifications - 3-4 sentences
  sommNotes: string; // sommelier exam key points - 3-4 sentences
  vintageGuide: string; // recent great vintages - 3-4 sentences
  bestSeason: string;
  funFact: string; // interesting trivia - 2-3 sentences
}

// Import region data from country-group files
import { FRANCE_REGIONS } from "./regions/france";
import { ITALY_REGIONS } from "./regions/italy";
import { SPAIN_REGIONS } from "./regions/spain";
import { PORTUGAL_GERMANY_REGIONS } from "./regions/portugal-germany";
import { AUSTRIA_SWISS_UK_REGIONS } from "./regions/austria-swiss-uk";
import { US_REGIONS } from "./regions/us";
import { ARGENTINA_CHILE_REGIONS } from "./regions/argentina-chile";
import { CANADA_MEXICO_BRAZIL_URUGUAY_REGIONS } from "./regions/canada-mexico-brazil-uruguay";
import { AUSTRALIA_NZ_REGIONS } from "./regions/australia-nz";
import { SOUTH_AFRICA_JAPAN_REGIONS } from "./regions/south-africa-japan";
import { GREECE_HUNGARY_REGIONS } from "./regions/greece-hungary";
import { EAST_EUROPE_REGIONS } from "./regions/east-europe";
import { MIDDLE_EAST_CHINA_REGIONS } from "./regions/middle-east-china";

export const REGION_CONTENT: RegionContent[] = [
  ...FRANCE_REGIONS,
  ...ITALY_REGIONS,
  ...SPAIN_REGIONS,
  ...PORTUGAL_GERMANY_REGIONS,
  ...AUSTRIA_SWISS_UK_REGIONS,
  ...US_REGIONS,
  ...ARGENTINA_CHILE_REGIONS,
  ...CANADA_MEXICO_BRAZIL_URUGUAY_REGIONS,
  ...AUSTRALIA_NZ_REGIONS,
  ...SOUTH_AFRICA_JAPAN_REGIONS,
  ...GREECE_HUNGARY_REGIONS,
  ...EAST_EUROPE_REGIONS,
  ...MIDDLE_EAST_CHINA_REGIONS,
];

export function getRegionContent(
  countryCode: string,
  regionName: string
): RegionContent | undefined {
  return REGION_CONTENT.find(
    (r) =>
      r.countryCode === countryCode &&
      r.regionName === regionName
  );
}

/**
 * Flat list of all aroma descriptors available in the app.
 * Used to constrain AI-generated aromas to app-defined options.
 */
import { AROMA_DATA } from "./aroma-data";

export interface AromaEntry {
  en: string;
  ja: string;
}

/** Flat array of all aroma descriptors */
export const ALL_AROMAS: AromaEntry[] = AROMA_DATA.flatMap((cat) =>
  cat.subcategories.flatMap((sub) => sub.descriptors)
);

/** Japanese aroma names only (for prompt injection) */
export const ALL_AROMA_NAMES_JA: string[] = ALL_AROMAS.map((a) => a.ja);

/** English aroma names only */
export const ALL_AROMA_NAMES_EN: string[] = ALL_AROMAS.map((a) => a.en);

/** Comma-separated Japanese aroma list for prompts */
export const AROMA_LIST_FOR_PROMPT: string = ALL_AROMAS
  .map((a) => `${a.ja}(${a.en})`)
  .join(", ");

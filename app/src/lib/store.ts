"use client";

import { UserProfile, WineLog, Winery } from "./types";
import { deleteWinePhoto } from "@/lib/photo-store";
import {
  calculateXpForLog,
  calculateBonusXp,
  getCurrentRank,
  BADGES,
} from "./gamification";

const WINES_KEY = "wine-mapper-wines";
const PROFILE_KEY = "wine-mapper-profile";

function getISOWeek(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum =
    1 +
    Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

const defaultProfile: UserProfile = {
  xp: 0,
  wineCount: 0,
  countriesExplored: [],
  regionsExplored: [],
  grapesExplored: [],
  earnedBadgeIds: [],
  streakWeeks: 0,
  lastLogWeek: "",
};

export function getWines(): WineLog[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(WINES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : { ...defaultProfile };
}

function saveWines(wines: WineLog[]) {
  localStorage.setItem(WINES_KEY, JSON.stringify(wines));
}

function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export interface LogResult {
  wine: WineLog;
  xpGained: number;
  bonusReasons: string[];
  newBadges: string[];
  rankUp: boolean;
}

export function addWine(wine: WineLog): LogResult {
  const wines = getWines();
  wines.unshift(wine);
  saveWines(wines);

  const profile = getProfile();
  const prevRankXp = profile.xp;

  // Calculate XP
  const baseXp = calculateXpForLog(wine);
  const bonus = calculateBonusXp(wine, profile);
  const totalXp = baseXp + bonus.xp;

  // Update profile
  profile.xp += totalXp;
  profile.wineCount = wines.length;

  if (wine.country && !profile.countriesExplored.includes(wine.country)) {
    profile.countriesExplored.push(wine.country);
  }
  if (wine.region && !profile.regionsExplored.includes(wine.region)) {
    profile.regionsExplored.push(wine.region);
  }
  for (const grape of wine.grapeVarieties) {
    if (grape && !profile.grapesExplored.includes(grape)) {
      profile.grapesExplored.push(grape);
    }
  }

  // Streak
  const currentWeek = getISOWeek(new Date());
  if (profile.lastLogWeek !== currentWeek) {
    // Check if consecutive
    const lastWeekDate = profile.lastLogWeek
      ? parseISOWeek(profile.lastLogWeek)
      : null;
    const thisWeekDate = parseISOWeek(currentWeek);
    if (
      lastWeekDate &&
      thisWeekDate.getTime() - lastWeekDate.getTime() <= 7 * 24 * 60 * 60 * 1000 + 1
    ) {
      profile.streakWeeks += 1;
    } else if (!lastWeekDate) {
      profile.streakWeeks = 1;
    } else {
      profile.streakWeeks = 1; // reset
    }
    profile.lastLogWeek = currentWeek;
  }

  // Check new badges
  const newBadges: string[] = [];
  for (const badge of BADGES) {
    if (
      !profile.earnedBadgeIds.includes(badge.id) &&
      badge.condition(profile, wines)
    ) {
      profile.earnedBadgeIds.push(badge.id);
      newBadges.push(badge.id);
    }
  }

  // Check rank up
  const prevRank = getCurrentRank(prevRankXp);
  const newRank = getCurrentRank(profile.xp);
  const rankUp = newRank.minXp > prevRank.minXp;

  saveProfile(profile);

  return {
    wine,
    xpGained: totalXp,
    bonusReasons: bonus.reasons,
    newBadges,
    rankUp,
  };
}

function parseISOWeek(weekStr: string): Date {
  const [yearStr, weekPart] = weekStr.split("-W");
  const year = parseInt(yearStr);
  const week = parseInt(weekPart);
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  jan4.setDate(jan4.getDate() - dayOfWeek + 1);
  jan4.setDate(jan4.getDate() + (week - 1) * 7);
  return jan4;
}

export function updateWine(wine: WineLog) {
  const wines = getWines();
  const idx = wines.findIndex((w) => w.id === wine.id);
  if (idx !== -1) {
    wines[idx] = wine;
    saveWines(wines);
  }
}

export function deleteWine(id: string) {
  // Clean up stored photo before removing the wine
  deleteWinePhoto(id);
  const wines = getWines().filter((w) => w.id !== id);
  saveWines(wines);
}

export function getWinesByCountry(country: string): WineLog[] {
  return getWines().filter((w) => w.country === country);
}

export function getWinesByRegion(country: string, region: string): WineLog[] {
  return getWines().filter((w) => w.country === country && w.region === region);
}

export function getWinesBySubRegion(country: string, region: string, subRegion: string): WineLog[] {
  return getWines().filter(
    (w) => w.country === country && w.region === region && w.subRegion === subRegion
  );
}

// ─── Winery Operations ─────────────────────────────────────────────────────

const WINERIES_KEY = "wine-mapper-wineries";

export function getWineries(): Winery[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(WINERIES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveWineries(wineries: Winery[]) {
  localStorage.setItem(WINERIES_KEY, JSON.stringify(wineries));
}

export function addWinery(winery: Winery): Winery {
  const wineries = getWineries();
  wineries.unshift(winery);
  saveWineries(wineries);
  return winery;
}

export function updateWinery(winery: Winery) {
  const wineries = getWineries();
  const idx = wineries.findIndex((w) => w.id === winery.id);
  if (idx !== -1) {
    wineries[idx] = winery;
    saveWineries(wineries);
  }
}

export function deleteWinery(id: string) {
  const wineries = getWineries().filter((w) => w.id !== id);
  saveWineries(wineries);
}

export function getWineryByName(name: string): Winery | undefined {
  return getWineries().find(
    (w) => w.name.toLowerCase() === name.toLowerCase()
  );
}

export function linkWineToWinery(wineId: string, wineryId: string) {
  // Update wine
  const wines = getWines();
  const wine = wines.find((w) => w.id === wineId);
  if (wine) {
    wine.wineryId = wineryId;
    saveWines(wines);
  }
  // Update winery
  const wineries = getWineries();
  const winery = wineries.find((w) => w.id === wineryId);
  if (winery && !winery.wineIds.includes(wineId)) {
    winery.wineIds.push(wineId);
    saveWineries(wineries);
  }
}

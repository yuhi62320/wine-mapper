/**
 * Import Bordeaux AOC/AOP GeoJSON data into Supabase wine_region_polygons table.
 *
 * Usage:
 *   node scripts/import-bordeaux.mjs
 *
 * Strategy:
 *   1. Downloads individual sub-appellation GeoJSON files from the
 *      ouwxmaniac/BordeauxWineRegions GitHub repo.
 *   2. Also processes the local overall Bordeaux AOP file as fallback.
 *   3. Calls insert_region_polygon RPC via Supabase REST API.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Config ────────────────────────────────────────────────────────────────────

const LOCAL_BORDEAUX_GEOJSON = resolve(
  __dirname,
  '../research/polygons/france_bordeaux_aop.geojson'
);

const SUPABASE_URL = 'https://enkrmsbwtxfjkqrkygjh.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVua3Jtc2J3dHhmamtxcmt5Z2poIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDY3ODg1MiwiZXhwIjoyMDkwMjU0ODUyfQ.oKR-Ya6o-ekICcOgNRC7uBNDJRsTwaQB8t_kJ8m0P20';
const SIMPLIFY_TOLERANCE = 0.005;

// Base URL for the ouwxmaniac/BordeauxWineRegions repo (raw content)
const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/ouwxmaniac/BordeauxWineRegions/master';

// Each entry: [filename (without .geojson), display name]
const REPO_FILES = [
  ['Barsac-AOP_Bordeaux_France', 'Barsac'],
  ['Blaye-AOP_Bordeaux_France', 'Blaye'],
  ['Canon-Fronsac-AOP_Bordeaux_France', 'Canon-Fronsac'],
  ['Cerons-AOP_Bordeaux_France', 'Cérons'],
  ['Cotes-de-Blaye-AOP_Bordeaux_France', 'Côtes de Blaye'],
  ['Cotes-de-Bordeaux-PDO_Bordeaux_France', 'Côtes de Bordeaux'],
  ['Cotes-de-Bordeaux-St-Macaire-PDO_Bordeaux_France', 'Côtes de Bordeaux-St-Macaire'],
  ['Cotes-de-Bourg-AOP_Bordeaux_France', 'Côtes de Bourg'],
  ['Cremant-de-Bordeaux-AOP_Bordeaux_France', 'Crémant de Bordeaux'],
  ['Entre-Deux-Mers-AOP_Bordeaux_France', 'Entre-Deux-Mers'],
  ['Fronsac-AOP_Bordeaux_France', 'Fronsac'],
  ['Graves-AOP_Bordeaux_France', 'Graves'],
  ['Graves-Superieures-AOP_Bordeaux_France', 'Graves Supérieures'],
  ['Graves-of-Vayres-AOP_Bordeaux_France', 'Graves de Vayres'],
  ['Haut-Medoc-AOP_Bordeaux_France', 'Haut-Médoc'],
  ['Lalande-de-Pomerol-AOP_Bordeaux_France', 'Lalande de Pomerol'],
  ['Listrac-Medoc-AOP_Bordeaux_France', 'Listrac-Médoc'],
  ['Loupiac-AOP_Bordeaux_France', 'Loupiac'],
  ['Lussac-St-Emilion-AOP_Bordeaux_France', 'Lussac-Saint-Émilion'],
  ['Margaux-AOP_Bordeaux_France', 'Margaux'],
  ['Medoc-AOP_Bordeaux_France', 'Médoc'],
  ['Moulis-en-Medoc-AOP_Bordeaux_France', 'Moulis-en-Médoc'],
  ['Pauillac-AOP_Bordeaux_France', 'Pauillac'],
  ['Pessac-Leognan-AOP_Bordeaux_France', 'Pessac-Léognan'],
  ['Pomerol-AOP_Bordeaux_France', 'Pomerol'],
  ['Puisseguin-St-Emilion-AOP_Bordeaux_France', 'Puisseguin-Saint-Émilion'],
  ['Sauternes-PDO_Bordeaux_France', 'Sauternes'],
  ['St-Croix-du-Mont-AOP_Bordeaux_France', 'Sainte-Croix-du-Mont'],
  ['St-Emilion-AOP_Bordeaux_France', 'Saint-Émilion'],
  ['St-Emilion-Grand-Cru-AOP_Bordeaux_France', 'Saint-Émilion Grand Cru'],
  ['St-Estephe-AOP_Bordeaux_France', 'Saint-Estèphe'],
  ['St-Foy-Bordeaux-AOP_Bordeaux_France', 'Sainte-Foy-Bordeaux'],
  ['St-Georges-St-Emilion-AOP_Bordeaux_France', 'Saint-Georges-Saint-Émilion'],
  ['St-Julien-AOP_Bordeaux_France', 'Saint-Julien'],
  ['Bordeaux-AOP_Bordeaux_France', 'Bordeaux'],
  ['Bordeaux-Superior-AOP_Bordeaux_France', 'Bordeaux Supérieur'],
];

// ── Name formatting ────────────────────────────────────────────────────────────

const FRENCH_LOWERCASE = new Set(['de', 'du', 'des', 'en', 'le', 'la', 'les']);

function formatAppellationName(stem) {
  const words = stem.split('_');
  return words
    .map((word, idx) => {
      const lower = word.toLowerCase();
      if (idx > 0 && FRENCH_LOWERCASE.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function insertPolygon(geometry, properties, appellationName, level) {
  const body = {
    p_name: appellationName,
    p_country: 'France',
    p_region: 'Bordeaux',
    p_sub_region: appellationName,
    p_type: 'AOC',
    p_level: level,
    p_geojson: JSON.stringify(geometry),
    p_simplify_tolerance: SIMPLIFY_TOLERANCE,
    p_properties: properties,
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/insert_region_polygon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return await res.json();
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Bordeaux AOC Import ===\n');

  const records = [];

  // Step 1: Download sub-appellation files from GitHub
  console.log(`Downloading ${REPO_FILES.length} GeoJSON files from GitHub...\n`);

  for (const [filename, appellationName] of REPO_FILES) {
    const url = `${GITHUB_RAW_BASE}/${filename}.geojson`;
    process.stdout.write(`  Fetching ${filename}.geojson ... `);

    let geojson;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      geojson = await res.json();
    } catch (err) {
      console.error(`FAILED (${err.message})`);
      continue;
    }

    const level = appellationName === 'Bordeaux' || appellationName === 'Bordeaux Supérieur' ? 'region' : 'sub_region';

    let geometry, properties;
    if (geojson.type === 'FeatureCollection' && geojson.features?.length > 0) {
      geometry = geojson.features[0].geometry;
      properties = geojson.features[0].properties ?? {};
    } else if (geojson.type === 'Feature') {
      geometry = geojson.geometry;
      properties = geojson.properties ?? {};
    } else {
      geometry = geojson;
      properties = {};
    }

    console.log(`OK (${geometry.type})`);
    records.push({ filename, appellationName, geometry, properties, level });
  }

  // Step 2: Fallback local file for overall Bordeaux
  const alreadyHasOverall = records.some(r => r.appellationName === 'Bordeaux');
  if (!alreadyHasOverall) {
    console.log(`\nLoading local file: ${LOCAL_BORDEAUX_GEOJSON}`);
    try {
      const raw = readFileSync(LOCAL_BORDEAUX_GEOJSON, 'utf8');
      const geojson = JSON.parse(raw);
      const feature = geojson.features[0];
      records.push({
        filename: 'Bordeaux-local',
        appellationName: 'Bordeaux',
        geometry: feature.geometry,
        properties: feature.properties ?? {},
        level: 'region',
      });
      console.log('OK');
    } catch (err) {
      console.error(`WARNING: Could not load local Bordeaux file: ${err.message}`);
    }
  }

  console.log(`\nTotal records to insert: ${records.length}\n`);

  // Step 3: Insert into Supabase via RPC
  let insertedTotal = 0;
  let errorCount = 0;

  for (let i = 0; i < records.length; i++) {
    const { appellationName, geometry, properties, level } = records[i];
    const idx = String(i + 1).padStart(String(records.length).length);
    process.stdout.write(`[${idx}/${records.length}] ${appellationName} ... `);

    try {
      await insertPolygon(geometry, properties, appellationName, level);
      insertedTotal++;
      console.log('OK');
    } catch (err) {
      const firstLine = err.message.split('\n').find(l => l.trim()) ?? err.message;
      console.error(`FAILED\n    ${firstLine}`);
      errorCount++;
    }
  }

  console.log('\n══════════════════════════════════');
  console.log(`Done.  Inserted: ${insertedTotal}  Errors: ${errorCount}`);
  if (errorCount > 0) {
    console.log('Some records failed. Check the output above for details.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

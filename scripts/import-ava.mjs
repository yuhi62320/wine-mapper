/**
 * Import US AVA GeoJSON data into Supabase wine_region_polygons table.
 *
 * Usage:
 *   node scripts/import-ava.mjs
 *
 * Strategy:
 *   - Reads the GeoJSON file
 *   - Calls the insert_region_polygon RPC function via Supabase REST API
 *   - Processes one at a time to handle large geometries
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Config ────────────────────────────────────────────────────────────────────

const GEOJSON_PATH = resolve(__dirname, '../research/polygons/us_ava.geojson');
const SUPABASE_URL = 'https://enkrmsbwtxfjkqrkygjh.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVua3Jtc2J3dHhmamtxcmt5Z2poIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDY3ODg1MiwiZXhwIjoyMDkwMjU0ODUyfQ.oKR-Ya6o-ekICcOgNRC7uBNDJRsTwaQB8t_kJ8m0P20';
const SIMPLIFY_TOLERANCE = 0.01;
const CONCURRENCY = 3; // parallel requests

// ── Helpers ───────────────────────────────────────────────────────────────────

function deriveRegion(stateProp) {
  if (!stateProp) return null;
  const states = stateProp.split('|').map(s => s.trim()).filter(Boolean);
  if (states.length === 0) return null;
  if (states.length === 1) return states[0];
  return `${states[0]} (multi-state)`;
}

function deriveLevel(withinProp) {
  return withinProp ? 'sub_region' : 'region';
}

async function insertPolygon(feature) {
  const p = feature.properties;
  const body = {
    p_name: p.name,
    p_country: 'United States',
    p_region: deriveRegion(p.state),
    p_sub_region: p.name,
    p_type: 'AVA',
    p_level: deriveLevel(p.within),
    p_geojson: JSON.stringify(feature.geometry),
    p_simplify_tolerance: SIMPLIFY_TOLERANCE,
    p_properties: p,
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

async function processChunk(features, startIndex) {
  const results = [];
  for (const feature of features) {
    const name = feature.properties?.name ?? '(unknown)';
    const idx = startIndex + results.length + 1;
    try {
      await insertPolygon(feature);
      results.push({ name, success: true });
      process.stdout.write(`  [${idx}] ✓ ${name}\n`);
    } catch (err) {
      results.push({ name, success: false, error: err.message });
      process.stdout.write(`  [${idx}] ✗ ${name}: ${err.message.slice(0, 100)}\n`);
    }
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Reading GeoJSON file...');
  let geojson;
  try {
    const raw = readFileSync(GEOJSON_PATH, 'utf8');
    geojson = JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to read/parse GeoJSON: ${err.message}`);
    process.exit(1);
  }

  const features = geojson.features;
  console.log(`Loaded ${features.length} AVA features.`);
  console.log(`Using RPC insert via Supabase REST API (concurrency: ${CONCURRENCY})\n`);

  let insertedTotal = 0;
  let errorCount = 0;

  // Process in chunks for limited concurrency
  for (let i = 0; i < features.length; i += CONCURRENCY) {
    const chunk = features.slice(i, i + CONCURRENCY);
    const promises = chunk.map((feature, idx) => {
      const name = feature.properties?.name ?? '(unknown)';
      const num = i + idx + 1;
      return insertPolygon(feature)
        .then(() => {
          process.stdout.write(`  [${num}/${features.length}] ✓ ${name}\n`);
          return { success: true };
        })
        .catch((err) => {
          process.stdout.write(`  [${num}/${features.length}] ✗ ${name}: ${err.message.slice(0, 120)}\n`);
          return { success: false };
        });
    });

    const results = await Promise.all(promises);
    for (const r of results) {
      if (r.success) insertedTotal++;
      else errorCount++;
    }
  }

  console.log('\n──────────────────────────────────');
  console.log(`Done. Inserted: ${insertedTotal}  Errors: ${errorCount}`);
  if (errorCount > 0) {
    console.log('Some records failed. Check the output above for details.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

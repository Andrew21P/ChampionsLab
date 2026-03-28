/**
 * Sync static tier values in pokemon-data.ts with ML-computed tiers.
 * This reads the simulation data + tournament data, computes the hybrid tier
 * for every Pokemon, then overwrites the static "tier" field in pokemon-data.ts.
 */
import { POKEMON_SEED } from '../src/lib/pokemon-data';
import { SIM_POKEMON } from '../src/lib/simulation-data';
import { TOURNAMENT_USAGE } from '../src/lib/engine';
import * as fs from 'fs';
import * as path from 'path';

// ── Replicate the exact same tier logic from meta/page.tsx ──
const tournamentMap = new Map(TOURNAMENT_USAGE.map((u: any) => [u.pokemonId, u]));

function getCompositeWR(simEntry: any): number {
  const t = tournamentMap.get(simEntry.id);
  if (!t) return simEntry.winRate;
  return simEntry.winRate * 0.6 + t.winRate * 0.4 + (t.topCutRate ?? 0) * 0.15;
}

const qualified = Object.values(SIM_POKEMON).filter((p: any) => p.appearances >= 500);
const cwrs = qualified.map((p: any) => getCompositeWR(p)).sort((a: number, b: number) => b - a);
const len = cwrs.length;
const TIER_S = cwrs[Math.max(0, Math.floor(len * 0.05))] ?? 55;
const TIER_A = cwrs[Math.max(0, Math.floor(len * 0.25))] ?? 51;
const TIER_B = cwrs[Math.max(0, Math.floor(len * 0.65))] ?? 46;
const TIER_C = cwrs[Math.max(0, Math.floor(len * 0.88))] ?? 40;

const TIER_ORDER: Record<string, number> = { S: 0, A: 1, B: 2, C: 3, D: 4 };

function getMLTier(compositeWR: number, games: number, pokemonId?: number): string {
  let baseTier = 'D';
  if (games >= 500) {
    if (compositeWR >= TIER_S) baseTier = 'S';
    else if (compositeWR >= TIER_A) baseTier = 'A';
    else if (compositeWR >= TIER_B) baseTier = 'B';
    else if (compositeWR >= TIER_C) baseTier = 'C';
  }
  if (pokemonId != null) {
    const t = tournamentMap.get(pokemonId);
    if (t) {
      let floor = 'D';
      if (t.winRate >= 54 && t.topCutRate >= 10) floor = 'S';
      else if (t.winRate >= 51 && t.topCutRate >= 5) floor = 'A';
      else if (t.winRate >= 49 && t.topCutRate >= 2) floor = 'B';
      if (TIER_ORDER[floor] < TIER_ORDER[baseTier]) baseTier = floor;
    }
  }
  return baseTier;
}

// Build id → tier mapping from simulation data
const idToTier = new Map<number, string>();
for (const p of Object.values(SIM_POKEMON) as any[]) {
  const cwr = getCompositeWR(p);
  const tier = getMLTier(cwr, p.appearances, p.id);
  idToTier.set(p.id, tier);
}

// Now update the static file
const filePath = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

let updated = 0;
let unchanged = 0;
const changes: string[] = [];

for (const pokemon of POKEMON_SEED) {
  const newTier = idToTier.get(pokemon.id);
  if (!newTier) continue; // Not in simulation data
  
  const oldTier = pokemon.tier;
  if (oldTier === newTier) {
    unchanged++;
    continue;
  }
  
  // Find and replace this specific pokemon's tier
  // We look for the pattern: "name": "PokemonName" ... "tier": "X"
  // Use a regex that matches the tier field within this pokemon's object
  const nameEscaped = pokemon.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `("name":\\s*"${nameEscaped}"[\\s\\S]*?"tier":\\s*)"([A-Z])"`,
  );
  
  const match = content.match(regex);
  if (match) {
    content = content.replace(regex, `$1"${newTier}"`);
    changes.push(pokemon.name + ': ' + oldTier + ' -> ' + newTier);
    updated++;
  }
}

fs.writeFileSync(filePath, content);

console.log('Updated:', updated);
console.log('Unchanged:', unchanged);
console.log('');
if (changes.length > 0) {
  console.log('Changes:');
  for (const c of changes) {
    console.log('  ' + c);
  }
}

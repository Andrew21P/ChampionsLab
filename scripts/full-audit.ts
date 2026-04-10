// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE DATA AUDIT — Champions Lab
// Validates all Pokemon references, moves, items across every data source
// ═══════════════════════════════════════════════════════════════════════════════

import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { USAGE_DATA } from "../src/lib/usage-data";
import { WINNING_TEAMS } from "../src/lib/winning-teams";
import { MOVE_DATA } from "../src/lib/engine/move-data";
import { ITEMS } from "../src/lib/engine/items";
import { PREBUILT_TEAMS } from "../src/lib/engine/generated-teams";
import { TOURNAMENT_TEAMS } from "../src/lib/engine/vgc-data";

// ── Build valid sets ──────────────────────────────────────────────────────────
const rosterIds = new Set(POKEMON_SEED.filter(p => !(p as any).hidden).map(p => p.id));
const allIds = new Set(POKEMON_SEED.map(p => p.id));
const hiddenIds = new Set(POKEMON_SEED.filter(p => (p as any).hidden).map(p => p.id));
const validMoves = new Set(Object.keys(MOVE_DATA));
const validItems = new Set(Object.keys(ITEMS));

// Also build movepool map: id -> set of move names from pokemon-data.ts
const movepoolMap = new Map<number, Set<string>>();
for (const p of POKEMON_SEED) {
  const moves = new Set((p as any).moves?.map((m: any) => m.name) ?? []);
  movepoolMap.set(p.id, moves);
}

console.log("═══════════════════════════════════════════════════════════════");
console.log("  CHAMPIONS LAB — COMPREHENSIVE DATA AUDIT");
console.log("═══════════════════════════════════════════════════════════════\n");
console.log(`Roster: ${rosterIds.size} active | ${hiddenIds.size} hidden | ${allIds.size} total`);
console.log(`Engine moves: ${validMoves.size}`);
console.log(`Engine items: ${validItems.size}\n`);

let totalIssues = 0;

// ── 1. WINNING TEAMS ─────────────────────────────────────────────────────────
console.log("── WINNING TEAMS ──────────────────────────────────────────────");
const wtIssues: string[] = [];
const badWinningTeamIds: string[] = [];
for (const team of WINNING_TEAMS) {
  for (const mem of team.pokemon) {
    if (!allIds.has(mem.pokemonId)) {
      wtIssues.push(`  [${team.id}] "${team.name}" by ${team.player}: ${mem.name} (${mem.pokemonId}) NOT IN ROSTER`);
      if (!badWinningTeamIds.includes(team.id)) badWinningTeamIds.push(team.id);
    } else if (hiddenIds.has(mem.pokemonId)) {
      wtIssues.push(`  [${team.id}] "${team.name}" by ${team.player}: ${mem.name} (${mem.pokemonId}) IS HIDDEN`);
      if (!badWinningTeamIds.includes(team.id)) badWinningTeamIds.push(team.id);
    }
  }
}
console.log(`Issues: ${wtIssues.length}`);
wtIssues.forEach(i => console.log(i));
console.log(`Teams to remove: ${badWinningTeamIds.length} → [${badWinningTeamIds.join(", ")}]`);
totalIssues += wtIssues.length;

// ── 2. USAGE DATA ────────────────────────────────────────────────────────────
console.log("\n── USAGE DATA ─────────────────────────────────────────────────");
const usageIssues: string[] = [];
const badUsageIds: number[] = [];
for (const [idStr, sets] of Object.entries(USAGE_DATA)) {
  const id = Number(idStr);
  const pokemon = POKEMON_SEED.find(p => p.id === id);
  const pokeName = pokemon?.name ?? `ID ${id}`;

  if (!rosterIds.has(id)) {
    usageIssues.push(`  ${pokeName} (${id}): ${hiddenIds.has(id) ? "HIDDEN" : "NOT IN ROSTER"}`);
    badUsageIds.push(id);
  }

  // Check moves in sets
  for (const set of sets) {
    for (const move of set.moves) {
      if (!validMoves.has(move)) {
        usageIssues.push(`  ${pokeName} set "${set.name}": move "${move}" NOT IN ENGINE`);
      }
      // Check if move is in Pokemon's movepool
      const pool = movepoolMap.get(id);
      if (pool && !pool.has(move)) {
        usageIssues.push(`  ${pokeName} set "${set.name}": move "${move}" NOT IN MOVEPOOL`);
      }
    }
    // Check item
    if (set.item && !validItems.has(set.item)) {
      usageIssues.push(`  ${pokeName} set "${set.name}": item "${set.item}" NOT IN ENGINE`);
    }
  }
}
console.log(`Issues: ${usageIssues.length}`);
usageIssues.forEach(i => console.log(i));
console.log(`Pokemon to remove from usage: ${badUsageIds.length} → [${badUsageIds.join(", ")}]`);
totalIssues += usageIssues.length;

// ── 3. PREBUILT TEAMS ────────────────────────────────────────────────────────
console.log("\n── PREBUILT TEAMS ─────────────────────────────────────────────");
const prebuiltIssues: string[] = [];
for (const team of PREBUILT_TEAMS) {
  for (const mem of team.pokemon) {
    const id = mem.pokemonId;
    const pokemon = POKEMON_SEED.find(p => p.id === id);
    const pokeName = pokemon?.name ?? `ID ${id}`;
    
    if (!rosterIds.has(id)) {
      prebuiltIssues.push(`  "${team.name}": ${pokeName} (${id}) ${hiddenIds.has(id) ? "HIDDEN" : "NOT IN ROSTER"}`);
    }
    // Check moves
    if (mem.moves) {
      for (const move of mem.moves) {
        if (!validMoves.has(move)) {
          prebuiltIssues.push(`  "${team.name}" ${pokeName}: move "${move}" NOT IN ENGINE`);
        }
      }
    }
    // Check item
    if (mem.item && !validItems.has(mem.item)) {
      prebuiltIssues.push(`  "${team.name}" ${pokeName}: item "${mem.item}" NOT IN ENGINE`);
    }
  }
}
console.log(`Issues: ${prebuiltIssues.length}`);
prebuiltIssues.forEach(i => console.log(i));
totalIssues += prebuiltIssues.length;

// ── 4. TOURNAMENT TEAMS ──────────────────────────────────────────────────────
console.log("\n── TOURNAMENT (VGC) TEAMS ──────────────────────────────────────");
const vgcIssues: string[] = [];
for (const team of TOURNAMENT_TEAMS) {
  for (const id of team.pokemonIds) {
    if (!rosterIds.has(id)) {
      const pokemon = POKEMON_SEED.find(p => p.id === id);
      const pokeName = pokemon?.name ?? `ID ${id}`;
      vgcIssues.push(`  "${team.name}" (${team.event}): ${pokeName} (${id}) ${hiddenIds.has(id) ? "HIDDEN" : "NOT IN ROSTER"}`);
    }
  }
}
console.log(`Issues: ${vgcIssues.length}`);
vgcIssues.forEach(i => console.log(i));
totalIssues += vgcIssues.length;

// ── 5. ITEMS AUDIT ───────────────────────────────────────────────────────────
console.log("\n── ITEMS IN GAME ──────────────────────────────────────────────");
// Check which mega stones are in items but their Pokemon isn't in roster
const megaStoneIssues: string[] = [];
for (const [name, item] of Object.entries(ITEMS)) {
  if ((item as any).isMegaStone) {
    const forPokemon = (item as any).forPokemon;
    if (forPokemon && !rosterIds.has(forPokemon)) {
      megaStoneIssues.push(`  "${name}": for Pokemon ${forPokemon} which is ${hiddenIds.has(forPokemon) ? "HIDDEN" : "NOT IN ROSTER"}`);
    }
  }
}
console.log(`Mega stone issues: ${megaStoneIssues.length}`);
megaStoneIssues.forEach(i => console.log(i));
totalIssues += megaStoneIssues.length;

// ── SUMMARY ──────────────────────────────────────────────────────────────────
console.log("\n═══════════════════════════════════════════════════════════════");
console.log(`  TOTAL ISSUES: ${totalIssues}`);
console.log("═══════════════════════════════════════════════════════════════");

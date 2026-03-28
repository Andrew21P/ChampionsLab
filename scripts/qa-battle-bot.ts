// ═══════════════════════════════════════════════════════════════════════
// DEEP QA: Battle Engine v2 — Battle Length, AI Quality, Protect, Switching
// Run: npx tsx scripts/qa-battle-bot.ts
// ═══════════════════════════════════════════════════════════════════════

import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { USAGE_DATA } from "../src/lib/usage-data";
import {
  calculateDamage,
  calculateStats,
  formatDamageResult,
  getMove,
  runSimulation,
  PREBUILT_TEAMS,
  type DamageCalcPokemon,
  type DamageCalcTarget,
  type DamageCalcOptions,
  type NatureName,
} from "../src/lib/engine";
import {
  simulateBattleWithLog,
  simulateBattle,
} from "../src/lib/engine/battle-sim";
import type { ChampionsPokemon, CommonSet } from "../src/lib/types";

let passed = 0;
let failed = 0;
let warned = 0;

function assert(condition: boolean, label: string) {
  if (condition) { passed++; console.log(`  ✅ ${label}`); }
  else { failed++; console.error(`  ❌ ${label}`); }
}
function warn(condition: boolean, label: string) {
  if (condition) { passed++; console.log(`  ✅ ${label}`); }
  else { warned++; console.log(`  ⚠️  ${label}`); }
}

function getPokemon(name: string): ChampionsPokemon {
  const p = POKEMON_SEED.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!p) throw new Error(`Pokemon not found: ${name}`);
  return p;
}
function getSet(p: ChampionsPokemon): CommonSet {
  const usage = USAGE_DATA[p.id];
  if (usage && usage.length > 0) return usage[0];
  return {
    name: p.name,
    nature: "Adamant",
    ability: p.abilities[0]?.name ?? "",
    item: "Life Orb",
    moves: p.moves.filter(m => m.category !== "status").slice(0, 4).map(m => m.name),
    sp: { hp: 2, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 32 },
  };
}

// Resolve PrebuiltTeam pokemonIds to actual ChampionsPokemon objects
function resolveTeam(team: typeof PREBUILT_TEAMS[0]): { pokemon: ChampionsPokemon[]; sets: CommonSet[] } {
  const pokemon: ChampionsPokemon[] = [];
  const sets: CommonSet[] = [];
  for (let i = 0; i < team.pokemonIds.length; i++) {
    const p = POKEMON_SEED.find(p => p.id === team.pokemonIds[i]);
    if (p) { pokemon.push(p); sets.push(team.sets[i]); }
  }
  return { pokemon, sets };
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 1: Battle Length Analysis
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 1: Battle Length Analysis ═══");
{
  const turnCounts: number[] = [];
  const teams = PREBUILT_TEAMS;

  for (let i = 0; i < 200; i++) {
    const t1 = teams[i % teams.length];
    const t2 = teams[(i + 7) % teams.length];
    if (t1 === t2) continue;
    const result = simulateBattle(resolveTeam(t1).pokemon, resolveTeam(t1).sets, resolveTeam(t2).pokemon, resolveTeam(t2).sets);
    turnCounts.push(result.turnsPlayed);
  }

  const avgTurns = turnCounts.reduce((a, b) => a + b, 0) / turnCounts.length;
  const minTurns = Math.min(...turnCounts);
  const maxTurns = Math.max(...turnCounts);
  const under6 = turnCounts.filter(t => t < 6).length;
  const under8 = turnCounts.filter(t => t < 8).length;
  const over12 = turnCounts.filter(t => t >= 12).length;

  console.log(`  📊 200 battles: avg=${avgTurns.toFixed(1)}, min=${minTurns}, max=${maxTurns}`);
  console.log(`  📊 Under 6: ${under6} (${(under6/turnCounts.length*100).toFixed(1)}%), Under 8: ${under8} (${(under8/turnCounts.length*100).toFixed(1)}%), Over 12: ${over12} (${(over12/turnCounts.length*100).toFixed(1)}%)`);

  assert(avgTurns >= 8, `Average turns ${avgTurns.toFixed(1)} >= 8 (VGC realistic)`);
  warn(avgTurns >= 10, `Average turns ${avgTurns.toFixed(1)} >= 10 (VGC ideal)`);
  assert(under6 / turnCounts.length < 0.15, `Under-6-turn battles < 15% (got ${(under6/turnCounts.length*100).toFixed(1)}%)`);
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 2: Protect Usage Rate
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 2: Protect Usage Analysis ═══");
{
  let totalMoves = 0;
  let protectMoves = 0;
  const teams = PREBUILT_TEAMS;
  for (let i = 0; i < 100; i++) {
    const t1 = teams[i % teams.length];
    const t2 = teams[(i + 5) % teams.length];
    if (t1 === t2) continue;
    const result = simulateBattleWithLog(resolveTeam(t1).pokemon, resolveTeam(t1).sets, resolveTeam(t2).pokemon, resolveTeam(t2).sets);
    for (const entry of result.log) {
      for (const event of entry.events) {
        if (event.includes(" used ")) totalMoves++;
        if (event.includes("used Protect")) protectMoves++;
      }
    }
  }
  const protectRate = totalMoves > 0 ? (protectMoves / totalMoves * 100) : 0;
  console.log(`  📊 Protect usage: ${protectMoves}/${totalMoves} moves (${protectRate.toFixed(1)}%)`);
  assert(protectRate >= 5, `Protect rate ${protectRate.toFixed(1)}% >= 5%`);
  warn(protectRate >= 10, `Protect rate ${protectRate.toFixed(1)}% >= 10% (VGC realistic)`);
  assert(protectRate < 50, `Protect rate ${protectRate.toFixed(1)}% < 50% (not spam)`);
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 3: Switching Analysis
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 3: Switching Analysis ═══");
{
  let totalActions = 0;
  let switchActions = 0;
  const teams = PREBUILT_TEAMS;
  for (let i = 0; i < 100; i++) {
    const t1 = teams[i % teams.length];
    const t2 = teams[(i + 3) % teams.length];
    if (t1 === t2) continue;
    const result = simulateBattleWithLog(resolveTeam(t1).pokemon, resolveTeam(t1).sets, resolveTeam(t2).pokemon, resolveTeam(t2).sets);
    for (const entry of result.log) {
      for (const event of entry.events) {
        if (event.includes(" used ") || event.includes("switched out")) totalActions++;
        if (event.includes("switched out")) switchActions++;
      }
    }
  }
  const switchRate = totalActions > 0 ? (switchActions / totalActions * 100) : 0;
  console.log(`  📊 Switch rate: ${switchActions}/${totalActions} actions (${switchRate.toFixed(1)}%)`);
  assert(switchRate >= 2, `Switch rate ${switchRate.toFixed(1)}% >= 2%`);
  warn(switchRate >= 5, `Switch rate ${switchRate.toFixed(1)}% >= 5% (VGC realistic)`);
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 4: Matchup Balance
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 4: Matchup Balance ═══");
{
  const teams = PREBUILT_TEAMS.slice(0, 12);
  let extremeMatchups = 0;
  let totalMatchups = 0;
  let bestMU = { wr: 50, t1: "", t2: "" };
  let worstMU = { wr: 50, t1: "", t2: "" };
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const ri = resolveTeam(teams[i]), rj = resolveTeam(teams[j]);
      const result = runSimulation(ri.pokemon, ri.sets, rj.pokemon, rj.sets, 40);
      totalMatchups++;
      if (result.winRate > bestMU.wr) bestMU = { wr: result.winRate, t1: teams[i].name, t2: teams[j].name };
      if (result.winRate < worstMU.wr) worstMU = { wr: result.winRate, t1: teams[i].name, t2: teams[j].name };
      if (result.winRate > 95 || result.winRate < 5) extremeMatchups++;
    }
  }
  console.log(`  📊 Best: ${bestMU.t1} vs ${bestMU.t2} = ${bestMU.wr}%`);
  console.log(`  📊 Worst: ${worstMU.t1} vs ${worstMU.t2} = ${worstMU.wr}%`);
  assert(extremeMatchups / totalMatchups < 0.3, `Extreme matchups < 30% (got ${(extremeMatchups/totalMatchups*100).toFixed(1)}%)`);
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 5: Sample Battle Quality
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 5: Battle Replay Quality ═══");
{
  const teams = PREBUILT_TEAMS;
  for (let b = 0; b < 5; b++) {
    const t1 = teams[b * 3 % teams.length];
    const t2 = teams[(b * 3 + 2) % teams.length];
    if (t1 === t2) continue;
    const result = simulateBattleWithLog(resolveTeam(t1).pokemon, resolveTeam(t1).sets, resolveTeam(t2).pokemon, resolveTeam(t2).sets);
    let protects = 0, attacks = 0, switches = 0, kos = 0;
    for (const entry of result.log) {
      for (const ev of entry.events) {
        if (ev.includes("used Protect")) protects++;
        else if (ev.includes(" used ")) attacks++;
        if (ev.includes("switched out")) switches++;
        if (ev.includes("KO")) kos++;
      }
    }
    console.log(`  📊 ${t1.name} vs ${t2.name} → ${result.turnsPlayed}T, W:T${result.winner}, Atk:${attacks} Prot:${protects} Sw:${switches} KOs:${kos}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 6: Palafin Zero-to-Hero
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 6: Palafin Zero-to-Hero ═══");
{
  const palafin = getPokemon("Palafin");
  const palafinSet = getSet(palafin);
  assert(palafin.moves.some(m => m.name === "Flip Turn"), `Palafin has Flip Turn in movepool`);
  const sets = USAGE_DATA[palafin.id] ?? [];
  const hasFlipTurnSet = sets.some(s => s.moves.includes("Flip Turn"));
  warn(hasFlipTurnSet, `Palafin has a set with Flip Turn`);
  const heroStats = calculateStats(
    { hp: 100, attack: 160, defense: 97, spAtk: 106, spDef: 87, speed: 100 },
    palafinSet.sp, palafinSet.nature as NatureName
  );
  const zeroStats = calculateStats(
    { hp: 100, attack: 70, defense: 72, spAtk: 53, spDef: 62, speed: 100 },
    palafinSet.sp, palafinSet.nature as NatureName
  );
  assert(heroStats.attack > zeroStats.attack * 1.5, `Hero Atk ${heroStats.attack} >> Zero Atk ${zeroStats.attack}`);
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 7: Key Move Coverage
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 7: Move Database Coverage ═══");
{
  const essentialMoves = [
    "Protect", "Fake Out", "Earthquake", "Rock Slide", "Flare Blitz",
    "Close Combat", "Sucker Punch", "Shadow Ball", "Sludge Bomb",
    "Leaf Storm", "Ice Beam", "Thunderbolt", "Surf", "Iron Head",
    "Dragon Claw", "U-turn", "Flip Turn", "Body Slam", "Liquidation",
    "Jet Punch", "Wave Crash", "Draco Meteor", "Heat Wave", "Icy Wind",
    "Tailwind", "Trick Room", "Will-O-Wisp", "Thunder Wave",
    "Helping Hand", "Follow Me", "Rage Powder", "Swords Dance",
    "Calm Mind", "Dragon Dance", "Nasty Plot",
  ];
  let missing = 0;
  for (const move of essentialMoves) {
    const m = getMove(move);
    if (!m) { console.log(`  ❌ Missing: ${move}`); missing++; }
  }
  assert(missing === 0, `All ${essentialMoves.length} essential VGC moves exist (missing: ${missing})`);
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 8: USAGE_DATA Move Availability
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 8: USAGE_DATA Move Availability in Engine ═══");
{
  const missingMoves = new Map<string, string[]>();
  let totalMoves = 0;
  let missingCount = 0;
  for (const [id, sets] of Object.entries(USAGE_DATA)) {
    if (!sets) continue;
    const pokemon = POKEMON_SEED.find(p => p.id === Number(id));
    const pokeName = pokemon?.name ?? id;
    for (const set of sets) {
      for (const moveName of set.moves) {
        totalMoves++;
        if (!getMove(moveName)) {
          missingCount++;
          if (!missingMoves.has(moveName)) missingMoves.set(moveName, []);
          missingMoves.get(moveName)!.push(pokeName);
        }
      }
    }
  }
  if (missingMoves.size > 0) {
    console.log(`  📊 Missing moves from engine:`);
    for (const [move, mons] of [...missingMoves.entries()].slice(0, 10)) {
      console.log(`    ${move}: ${mons.slice(0, 3).join(", ")}${mons.length > 3 ? ` +${mons.length-3}` : ""}`);
    }
  }
  const coverageRate = ((totalMoves - missingCount) / totalMoves * 100);
  console.log(`  📊 Coverage: ${totalMoves - missingCount}/${totalMoves} (${coverageRate.toFixed(1)}%)`);
  assert(coverageRate >= 80, `Move coverage >= 80% (got ${coverageRate.toFixed(1)}%)`);
}

// ═══════════════════════════════════════════════════════════════════════
// TEST 9: Protect Success Rate
// ═══════════════════════════════════════════════════════════════════════
console.log("\n═══ TEST 9: Protect Mechanics ═══");
{
  let protectSuccess = 0;
  let protectFail = 0;
  const teams = PREBUILT_TEAMS;
  for (let i = 0; i < 100; i++) {
    const t1 = teams[i % teams.length];
    const t2 = teams[(i + 4) % teams.length];
    if (t1 === t2) continue;
    const result = simulateBattleWithLog(resolveTeam(t1).pokemon, resolveTeam(t1).sets, resolveTeam(t2).pokemon, resolveTeam(t2).sets);
    for (const entry of result.log) {
      for (const ev of entry.events) {
        if (ev.includes("used Protect!")) protectSuccess++;
        if (ev.includes("Protect failed")) protectFail++;
      }
    }
  }
  const total = protectSuccess + protectFail;
  const successRate = total > 0 ? (protectSuccess / total * 100) : 0;
  console.log(`  📊 Protect: ${protectSuccess} success, ${protectFail} fail (${successRate.toFixed(1)}% success)`);
  assert(successRate >= 60, `Protect success rate ${successRate.toFixed(1)}% >= 60%`);
}

// ═══════════════════════════════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════════════════════════════
console.log("\n════════════════════════════════════════════════════════════");
console.log(`RESULTS: ${passed} passed, ${failed} failed, ${warned} warnings out of ${passed + failed + warned} checks`);
if (failed === 0) console.log("✅ ALL TESTS PASSED!");
else console.log("⚠️  SOME TESTS FAILED — review above");
process.exit(failed > 0 ? 1 : 0);

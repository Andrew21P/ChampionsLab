// Validate known engine behavior with deterministic checks.
// Run: npx tsx scripts/validate-engine-issues.ts

import { POKEMON_SEED } from "../src/lib/pokemon-data";
import type { ChampionsPokemon, CommonSet } from "../src/lib/types";
import { calculateStats } from "../src/lib/engine/stat-calc";
import { calculateDamage, type DamageCalcPokemon, type DamageCalcTarget } from "../src/lib/engine/damage-calc";
import { simulateBattleWithLog } from "../src/lib/engine/battle-sim";
import { getMove } from "../src/lib/engine/move-data";

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor((p / 100) * sorted.length)));
  return sorted[idx];
}

function requireCheck(condition: boolean, label: string, detail?: string) {
  if (condition) {
    console.log(`  CHECK PASSED ${label}${detail ? `: ${detail}` : ""}`);
    return;
  }
  console.log(`  CHECK FAILED ${label}${detail ? `: ${detail}` : ""}`);
}

function expectIssue(condition: boolean, label: string, detail?: string) {
  if (condition) {
    console.log(`  PROBLEM BEHAVIOR ${label}${detail ? `: ${detail}` : ""}`);
    return;
  }
  console.log(`  EXPECTED BEHAVIOR ${label}${detail ? `: ${detail}` : ""}`);
}

function getPokemonByName(name: string): ChampionsPokemon {
  const p = POKEMON_SEED.find(x => x.name.toLowerCase() === name.toLowerCase());
  if (!p) throw new Error(`Pokemon not found: ${name}`);
  return p;
}

function toRoundedPct(rawDamage: number, hp: number): number {
  return Math.round((rawDamage / hp) * 100);
}

function executeStatusMaxRaw(baseMaxRaw: number): number {
  // Execute path applies status Guts as a late post-multiplier.
  return Math.floor(baseMaxRaw * 1.5);
}

interface Turn2ScenarioConfig {
  title: string;
  attempts: number;
  turn1SignalMove: string;
  sampleLabel: string;
  sampleLogLabel: string;
  ceilingLabel: string;
  ceilingPct: number;
  includeSample: (hpAfterTurn1: number) => boolean;
}

interface Turn2ScenarioResult {
  acceptedSamples: number;
  observedTurn2Percents: number[];
  aboveCeiling: number;
  aboveCeilingRate: number;
}

function runTurn2Scenario(
  attackerMon: ChampionsPokemon,
  attackerSet: CommonSet,
  defenderMon: ChampionsPokemon,
  defenderSet: CommonSet,
  move: string,
  config: Turn2ScenarioConfig
): Turn2ScenarioResult {
  console.log(`\n=== ${config.title} ===`);

  const observedTurn2Percents: number[] = [];
  let acceptedSamples = 0;
  const sampleLogs: string[] = [];

  for (let i = 0; i < config.attempts; i++) {
    const battle = simulateBattleWithLog([attackerMon], [attackerSet], [defenderMon], [defenderSet]);
    const turn1 = battle.log.find(x => x.turn === 1);
    const turn2 = battle.log.find(x => x.turn === 2);
    if (!turn1 || !turn2) continue;

    const hpAfterTurn1 = turn1.team1HP[0] ?? 100;
    if (!config.includeSample(hpAfterTurn1)) continue;
    acceptedSamples++;

    const turn1KeyEvents = turn1.events.filter(ev =>
      ev.includes(`${defenderMon.name} used ${config.turn1SignalMove}`) ||
      ev.includes("recoil") ||
      ev.includes("fainted") ||
      ev.includes(`used ${move}`)
    );

    for (const ev of turn2.events) {
      if (!ev.includes(`${attackerMon.name} used ${move} on ${defenderMon.name}`)) continue;
      const m = ev.match(/\((\d+)% damage\)/);
      if (!m) continue;

      observedTurn2Percents.push(Number(m[1]));
      if (sampleLogs.length < 3) {
        sampleLogs.push([
          `Turn1: ${turn1KeyEvents.join(" | ") || "(no key event captured)"}`,
          `Turn2: ${ev}`,
        ].join("\n    "));
      }
    }
  }

  const observedMaxPct = observedTurn2Percents.length > 0 ? Math.max(...observedTurn2Percents) : 0;
  const sortedPcts = [...observedTurn2Percents].sort((a, b) => a - b);
  const p50 = percentile(sortedPcts, 50);
  const aboveCeiling = observedTurn2Percents.filter(v => v > config.ceilingPct).length;
  const aboveCeilingRate = observedTurn2Percents.length > 0
    ? aboveCeiling / observedTurn2Percents.length
    : 0;

  console.log(`  ${config.sampleLabel}: ${acceptedSamples}/${config.attempts}`);
  console.log(`  Observed turn-2 ${move} comparable entries: ${observedTurn2Percents.length}`);
  console.log(`  Observed turn-2 ${move} rounded % -> median=${p50} max=${observedMaxPct}`);
  console.log(
    `  Observed > ${config.ceilingLabel} (${config.ceilingPct}%): ${aboveCeiling}/${observedTurn2Percents.length} (${(aboveCeilingRate * 100).toFixed(1)}%)`
  );

  if (sampleLogs.length > 0) {
    console.log(`  Sample ${config.sampleLogLabel} logs:`);
    for (const [idx, entry] of sampleLogs.entries()) {
      console.log(`    [${idx + 1}] ${entry}`);
    }
  }

  return {
    acceptedSamples,
    observedTurn2Percents,
    aboveCeiling,
    aboveCeilingRate,
  };
}

function runGutsExecutePathValidation() {

  const attackerMon = getPokemonByName("Heracross");
  const defenderMon = getPokemonByName("Torkoal");
  
  const attackerSet: CommonSet = {
    name: "Heracross Guts Probe",
    nature: "Brave",
    ability: "Guts",
    item: "",
    moves: ["Night Slash"],
    sp: { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 },
  };

  const defenderSet: CommonSet = {
    name: "Torkoal Burn Probe",
    nature: "Bold",
    ability: "Shell Armor",
    item: "",
    moves: ["Will-O-Wisp"],
    sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 0, speed: 0 },
  };

  const attackerBase: DamageCalcPokemon = {
    baseStats: attackerMon.baseStats,
    sp: attackerSet.sp,
    nature: attackerSet.nature as never,
    types: attackerMon.types,
    ability: attackerSet.ability,
    item: attackerSet.item,
    atkStages: 0,
    spAtkStages: 0,
    currentHPPercent: 100,
  };

  const defender: DamageCalcTarget = {
    baseStats: defenderMon.baseStats,
    sp: defenderSet.sp,
    nature: defenderSet.nature as never,
    types: defenderMon.types,
    ability: defenderSet.ability,
    item: defenderSet.item,
    defStages: 0,
    spDefStages: 0,
  };

  const move = "Night Slash";
  const probeMove = getMove(move);
  if (!probeMove || probeMove.category === "status") {
    throw new Error(`Move not found or does not cause damage: ${move}`);
  }

  const noStatus = calculateDamage(
    { ...attackerBase, isBurned: false },
    defender,
    move,
    { isDoubles: true, weather: "none", isCrit: false }
  );

  const burnStatus = calculateDamage(
    { ...attackerBase, isBurned: true },
    defender,
    move,
    { isDoubles: true, weather: "none", isCrit: false }
  );

  const attackerHP = calculateStats(attackerMon.baseStats, attackerSet.sp, attackerSet.nature as never).hp;
  const burnChip = Math.floor(attackerHP / 16);
  const burnedHpPctRounded = Math.round(((attackerHP - burnChip) / attackerHP) * 100);

  const defenderHP = calculateStats(defenderMon.baseStats, defenderSet.sp, defenderSet.nature as never).hp;
  const noStatusMinPctRounded = toRoundedPct(noStatus.damage[0], defenderHP);
  const noStatusMaxPctRounded = toRoundedPct(noStatus.damage[1], defenderHP);
  const burnCalcMinPctRounded = toRoundedPct(burnStatus.damage[0], defenderHP);
  const burnCalcMaxPctRounded = toRoundedPct(burnStatus.damage[1], defenderHP);
  const burnStatusExpectedMaxPctRounded = toRoundedPct(executeStatusMaxRaw(burnStatus.damage[1]), defenderHP);
  const nonBurnStatusExpectedMaxPctRounded = toRoundedPct(executeStatusMaxRaw(noStatus.damage[1]), defenderHP);

  console.log(`  ${move} no-status calc % range: ${noStatusMinPctRounded}-${noStatusMaxPctRounded}%`);
  console.log(`  ${move} burn calc % range: ${burnCalcMinPctRounded}-${burnCalcMaxPctRounded}%`);
  console.log(`  ${move} burn status expected max: ${burnStatusExpectedMaxPctRounded}%`);
  console.log(`  ${move} non-burn status expected max: ${nonBurnStatusExpectedMaxPctRounded}%`);

  const attempts = 100;
  const burnResult = runTurn2Scenario(attackerMon, attackerSet, defenderMon, defenderSet, move, {
    title: "Guts Execute Path Validation",
    attempts,
    turn1SignalMove: "Will-O-Wisp",
    sampleLabel: "Burn-landed samples",
    sampleLogLabel: "burn-landed",
    ceilingLabel: "burn status expected max",
    ceilingPct: burnStatusExpectedMaxPctRounded,
    includeSample: hpAfterTurn1 => hpAfterTurn1 <= burnedHpPctRounded,
  });

  const aboveBurnCalcMax = burnResult.observedTurn2Percents.filter(v => v > burnCalcMaxPctRounded).length;
  const aboveBurnCalcRate = burnResult.observedTurn2Percents.length > 0
    ? aboveBurnCalcMax / burnResult.observedTurn2Percents.length
    : 0;
  console.log(
    `  Observed > burn calc max (${burnCalcMaxPctRounded}%): ${aboveBurnCalcMax}/${burnResult.observedTurn2Percents.length} (${(aboveBurnCalcRate * 100).toFixed(1)}%)`
  );

  requireCheck(burnResult.observedTurn2Percents.length >= 40, "Collected enough burn-filtered turn-2 damage samples");
  expectIssue(
    aboveBurnCalcRate > 0.2,
    "Damage frequently exceeds burn-boosted calc ceiling",
    `rate=${(aboveBurnCalcRate * 100).toFixed(1)}%, calc-burn-max=${burnCalcMaxPctRounded}%`
  );

  const sunnyDaySet: CommonSet = {
    ...defenderSet,
    name: "Torkoal Sunny Day Control",
    moves: ["Sunny Day"],
  };

  const sunnyResult = runTurn2Scenario(attackerMon, attackerSet, defenderMon, sunnyDaySet, move, {
    title: "Sunny Day No-Burn Control Validation",
    attempts,
    turn1SignalMove: "Sunny Day",
    sampleLabel: "No-burn samples",
    sampleLogLabel: "no-burn",
    ceilingLabel: "no-status max",
    ceilingPct: noStatusMaxPctRounded,
    includeSample: hpAfterTurn1 => hpAfterTurn1 >= 100,
  });

  requireCheck(sunnyResult.observedTurn2Percents.length >= 40, "Collected enough no-burn turn-2 damage samples");
  requireCheck(
    sunnyResult.aboveCeilingRate <= 0.05,
    "No-burn control stays under no-status calc ceiling",
    `rate=${(sunnyResult.aboveCeilingRate * 100).toFixed(1)}%, calc-no-status-max=${noStatusMaxPctRounded}%`
  );

  const nuzzleSet: CommonSet = {
    ...defenderSet,
    name: "Torkoal Nuzzle Control",
    moves: ["Nuzzle"],
  };

  const nuzzleResult = runTurn2Scenario(attackerMon, attackerSet, defenderMon, nuzzleSet, move, {
    title: "Nuzzle Status Control Validation",
    attempts,
    turn1SignalMove: "Nuzzle",
    sampleLabel: "Paralysis-landed samples",
    sampleLogLabel: "paralysis-landed",
    ceilingLabel: "non-burn status expected max",
    ceilingPct: nonBurnStatusExpectedMaxPctRounded,
    // In this setup, turn-1 HP drop on Heracross is the Nuzzle landing signal.
    includeSample: hpAfterTurn1 => hpAfterTurn1 < 100,
  });

  requireCheck(nuzzleResult.observedTurn2Percents.length >= 30, "Collected enough paralysis-filtered turn-2 damage samples");
  requireCheck(
    nuzzleResult.aboveCeilingRate <= 0.05,
    "Paralysis status stays under expected status ceiling",
    `rate=${(nuzzleResult.aboveCeilingRate * 100).toFixed(1)}%, expected-status-max=${nonBurnStatusExpectedMaxPctRounded}%`
  );
}

function main() {
  console.log("Starting validation...");

  runGutsExecutePathValidation();

}

main();

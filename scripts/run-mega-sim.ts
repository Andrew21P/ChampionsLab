// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — MEGA-AWARE MILLION BATTLE SIMULATION
// Full-scale ML training with mega vs base form differentiation
// Each mega Pokémon gets separate ELO, win rates, partners, and matchup data
// ═══════════════════════════════════════════════════════════════════════════════

import { runMLSimulation, formatReport, type FinalReport } from "../src/lib/engine/ml-runner";
import fs from "fs";
import path from "path";

const TARGET_BATTLES = 2_000_000;

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  CHAMPIONS LAB — MEGA-AWARE 2,000,000 BATTLE SIMULATION");
  console.log("  Tournament + Generated + Prebuilt + Mega/Base Variant Teams");
  console.log("  50 Mega Pokémon tracked separately from base forms");
  console.log("═══════════════════════════════════════════════════════════\n");

  const startTime = Date.now();
  let lastProgressBattles = 0;

  const report = await runMLSimulation({
    durationMs: 86400000,          // 24h ceiling
    maxBattles: TARGET_BATTLES,
    batchSize: 100,
    iterationsPerBattle: 7,
    onProgress: (progress) => {
      if (progress.battlesCompleted - lastProgressBattles >= 10000) {
        lastProgressBattles = progress.battlesCompleted;
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const pct = Math.round((progress.battlesCompleted / TARGET_BATTLES) * 100);
        const eta = progress.battlesPerSecond > 0
          ? Math.round((TARGET_BATTLES - progress.battlesCompleted) / progress.battlesPerSecond)
          : 0;
        const etaMins = Math.floor(eta / 60);
        const etaSecs = eta % 60;

        process.stdout.write(
          `\r  [${mins}:${secs.toString().padStart(2, "0")}] ` +
          `${progress.battlesCompleted.toLocaleString()}/${TARGET_BATTLES.toLocaleString()} battles (${pct}%) | ` +
          `${progress.battlesPerSecond.toFixed(1)}/s | ` +
          `ETA ${etaMins}:${etaSecs.toString().padStart(2, "0")} | ` +
          `Top: ${progress.topPokemon.slice(0, 3).map(p => p.name).join(", ")}   `
        );
      }
    },
    onInsight: (insight) => {
      if (insight) {
        console.log(`\n  ⚡ [INSIGHT] ${insight.description}`);
      }
    },
  });

  console.log("\n");
  console.log(formatReport(report));

  // ── EXPORT SIMULATION DATA ──────────────────────────────────────────────
  const simData = buildSimulationData(report);
  const outPath = path.join(__dirname, "..", "src", "lib", "simulation-data.ts");
  
  const tsContent = `// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from ${report.totalBattles.toLocaleString()} mega-aware battle simulations
// Date: ${new Date().toISOString()}
// ═══════════════════════════════════════════════════════════════════════════════

export interface SimPokemonData {
  id: number;
  name: string;
  isMega: boolean;
  elo: number;
  winRate: number;
  appearances: number;
  wins: number;
  losses: number;
  bestPartners: { name: string; winRate: number; games: number }[];
  bestSets: { set: string; winRate: number; games: number }[];
}

export interface SimPairData {
  pokemon1: string;
  pokemon2: string;
  winRate: number;
  games: number;
}

export interface SimArchetypeData {
  name: string;
  elo: number;
  winRate: number;
  wins: number;
  losses: number;
}

export interface SimMoveData {
  name: string;
  winRate: number;
  appearances: number;
}

export interface SimMetaSnapshot {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  dominantArchetypes: string[];
  underratedPokemon: string[];
  overratedPokemon: string[];
  bestCores: string[];
}

/** Pokemon simulation data keyed by "id" or "id-mega" */
export const SIM_POKEMON: Record<string, SimPokemonData> = ${JSON.stringify(simData.pokemon, null, 2)};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = ${JSON.stringify(simData.pairs, null, 2)};

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = ${JSON.stringify(simData.archetypes, null, 2)};

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = ${JSON.stringify(simData.moves, null, 2)};

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = ${JSON.stringify(simData.meta, null, 2)};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = ${report.totalBattles};

/** Simulation date */
export const SIM_DATE = "${new Date().toISOString()}";
`;

  fs.writeFileSync(outPath, tsContent, "utf-8");
  console.log(`\n  ✅ Simulation data exported to: ${outPath}`);

  // Log mega-specific stats
  const megaEntries = report.pokemonRankings.filter(p => {
    // Mega entries have names that include "Mega"
    return p.name.includes("Mega ");
  });
  
  console.log(`\n  ── MEGA POKEMON STATS (${megaEntries.length} tracked) ──`);
  for (const m of megaEntries.sort((a, b) => b.elo - a.elo).slice(0, 20)) {
    console.log(`    ${m.name} — ELO: ${m.elo} | WR: ${m.winRate}% | ${m.appearances} games`);
  }

  const totalTime = Math.round((Date.now() - startTime) / 1000);
  const totalMins = Math.floor(totalTime / 60);
  const totalSecs = totalTime % 60;

  console.log(`\n════════════════════════════════════════════════════`);
  console.log(`  COMPLETED: ${report.totalBattles.toLocaleString()} battles in ${totalMins}m ${totalSecs}s`);
  console.log(`  Teams in pool: ${report.teamRankings.length}`);
  console.log(`  Pokémon tracked: ${report.pokemonRankings.length} (${megaEntries.length} mega forms)`);
  console.log(`  Moves analyzed: ${report.moveRankings.length}`);
  console.log(`  Archetypes ranked: ${report.archetypeRankings.length}`);
  console.log(`════════════════════════════════════════════════════\n`);
}

function buildSimulationData(report: FinalReport) {
  const pokemon: Record<string, {
    id: number; name: string; isMega: boolean;
    elo: number; winRate: number; appearances: number;
    wins: number; losses: number;
    bestPartners: { name: string; winRate: number; games: number }[];
    bestSets: { set: string; winRate: number; games: number }[];
  }> = {};

  for (const p of report.pokemonRankings) {
    const isMega = p.name.includes("Mega ");
    // Build key that distinguishes X/Y/Z mega forms
    let key: string;
    if (!isMega) {
      key = `${p.id}`;
    } else {
      const suffix = p.name.match(/ ([XYZ])$/)?.[1];
      key = suffix ? `${p.id}-mega-${suffix.toLowerCase()}` : `${p.id}-mega`;
    }
    pokemon[key] = {
      id: p.id,
      name: p.name,
      isMega,
      elo: p.elo,
      winRate: p.winRate,
      appearances: p.appearances,
      wins: p.wins,
      losses: p.losses,
      bestPartners: p.bestPartners.slice(0, 5).map(bp => ({
        name: bp.name, winRate: bp.winRate, games: bp.games,
      })),
      bestSets: p.bestSets.slice(0, 3).map(bs => ({
        set: bs.set, winRate: bs.winRate, games: bs.games,
      })),
    };
  }

  const pairs = report.bestPairs.slice(0, 50).map(p => ({
    pokemon1: p.pokemon1,
    pokemon2: p.pokemon2,
    winRate: p.winRate,
    games: p.games,
  }));

  const archetypes = report.archetypeRankings.slice(0, 50).map(a => ({
    name: a.name,
    elo: a.elo,
    winRate: a.winRate,
    wins: a.wins,
    losses: a.losses,
  }));

  const moves = report.moveRankings.slice(0, 50).map(m => ({
    name: m.name,
    winRate: m.winRate,
    appearances: m.appearances,
  }));

  return { pokemon, pairs, archetypes, meta: report.metaSnapshot, moves };
}

main().catch(console.error);

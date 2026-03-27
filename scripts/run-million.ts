// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — 1 MILLION BATTLE SIMULATION
// Full-scale ML training with all tournament teams, generated teams, and prebuilts
// ═══════════════════════════════════════════════════════════════════════════════

import { runMLSimulation, formatReport } from "../src/lib/engine/ml-runner";

const TARGET_BATTLES = 1_000_000;

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  CHAMPIONS LAB — 1,000,000 BATTLE ML SIMULATION");
  console.log("  250 Tournament Teams (2005–2025) + 200 Generated + 15 Prebuilt");
  console.log("  137 Pokémon | All Archetypes | Full ELO + Meta Analysis");
  console.log("═══════════════════════════════════════════════════════════\n");

  const startTime = Date.now();
  let lastProgressBattles = 0;

  const report = await runMLSimulation({
    durationMs: 86400000,          // 24h ceiling (battle count will stop us first)
    maxBattles: TARGET_BATTLES,
    batchSize: 100,                // Large batches for throughput
    iterationsPerBattle: 7,        // 7 MC samples per matchup (balanced accuracy + speed)
    onProgress: (progress) => {
      // Print every 10,000 battles
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
          `Insights: ${progress.recentInsights.length}   `
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

  const totalTime = Math.round((Date.now() - startTime) / 1000);
  const totalMins = Math.floor(totalTime / 60);
  const totalSecs = totalTime % 60;

  console.log(`\n════════════════════════════════════════════════════`);
  console.log(`  COMPLETED: ${report.totalBattles.toLocaleString()} battles in ${totalMins}m ${totalSecs}s`);
  console.log(`  Teams in pool: ${report.teamRankings.length}`);
  console.log(`  Pokémon tracked: ${report.pokemonRankings.length}`);
  console.log(`  Moves analyzed: ${report.moveRankings.length}`);
  console.log(`  Archetypes ranked: ${report.archetypeRankings.length}`);
  console.log(`════════════════════════════════════════════════════\n`);
}

main().catch(console.error);

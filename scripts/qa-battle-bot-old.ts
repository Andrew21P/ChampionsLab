/**
 * QA Battle Bot — Run detailed battle simulations and analyze AI decision quality
 * Tests for: correct ability usage, human-like play, VGC-level strategy
 */
import { simulateBattleWithLog, type DetailedBattleResult } from "../src/lib/engine/battle-sim";
import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { USAGE_DATA } from "../src/lib/usage-data";
import type { ChampionsPokemon, CommonSet } from "../src/lib/types";

// ── Utility ──────────────────────────────────────────────────────────────────
function findPokemon(name: string): ChampionsPokemon {
  const p = POKEMON_SEED.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!p) throw new Error(`Pokemon not found: ${name}`);
  return p;
}

function getSet(id: number, index: number = 0): CommonSet {
  const sets = USAGE_DATA[id];
  if (!sets || !sets[index]) throw new Error(`No set for id ${id}, index ${index}`);
  return sets[index];
}

function findMegaSet(id: number): CommonSet | null {
  const sets = USAGE_DATA[id];
  if (!sets) return null;
  return sets.find(s => s.name.toLowerCase().includes("mega")) ?? null;
}

function printBattle(result: DetailedBattleResult, label: string) {
  console.log(`\n${"═".repeat(70)}`);
  console.log(`  ${label}`);
  console.log(`${"═".repeat(70)}`);
  console.log(`Team 1: ${result.team1Names.join(" / ")}`);
  console.log(`Team 2: ${result.team2Names.join(" / ")}`);
  console.log(`Winner: Team ${result.winner} | Turns: ${result.turnsPlayed}`);
  console.log(`Remaining: T1=${result.team1Remaining}, T2=${result.team2Remaining}`);
  console.log(`${"─".repeat(70)}`);

  for (const entry of result.log) {
    if (entry.events.length === 0) continue;
    console.log(`\n  Turn ${entry.turn}:`);
    for (const ev of entry.events) {
      console.log(`    ${ev}`);
    }
    const fp: string[] = [];
    if (entry.field.weather) fp.push(`Weather: ${entry.field.weather}`);
    if (entry.field.trickRoom) fp.push("Trick Room");
    if (entry.field.tailwind1) fp.push("TW-T1");
    if (entry.field.tailwind2) fp.push("TW-T2");
    if (fp.length > 0) console.log(`    [${fp.join(" | ")}]`);
    console.log(`    T1 HP: ${entry.team1HP.map(h => h + "%").join(", ")} | T2 HP: ${entry.team2HP.map(h => h + "%").join(", ")}`);
  }
  console.log();
}

// ── Test 1: Palafin Zero to Hero ─────────────────────────────────────────────
function testPalafinZeroToHero() {
  console.log("\n🔬 TEST: Palafin Zero to Hero switching");
  const palafin = findPokemon("Palafin");
  const incineroar = findPokemon("Incineroar");
  const garchomp = findPokemon("Garchomp");
  const milotic = findPokemon("Milotic");

  const torkoal = findPokemon("Torkoal");
  const venusaur = findPokemon("Venusaur");
  const arcanine = findPokemon("Arcanine");
  const tyranitar = findPokemon("Tyranitar");

  const result = simulateBattleWithLog(
    [palafin, incineroar, garchomp, milotic],
    [getSet(palafin.id, 0), getSet(incineroar.id, 0), getSet(garchomp.id, 0), getSet(milotic.id, 0)],
    [torkoal, venusaur, arcanine, tyranitar],
    [getSet(torkoal.id, 0), getSet(venusaur.id, 0), getSet(arcanine.id, 0), getSet(tyranitar.id, 0)],
  );

  printBattle(result, "PALAFIN ZERO TO HERO TEST");

  const switchEvents = result.log.flatMap(l => l.events).filter(e =>
    e.includes("Palafin") && (e.includes("switched out") || e.includes("Hero Form"))
  );
  if (switchEvents.length > 0) {
    console.log("  ✅ Palafin switch/transform detected:");
    switchEvents.forEach(e => console.log(`    ${e}`));
  } else {
    console.log("  ❌ Palafin NEVER switched out — Zero to Hero NOT activated!");
  }
  return result;
}

// ── Test 2: Weather War (Sun vs Rain) ────────────────────────────────────────
function testWeatherWar() {
  console.log("\n🔬 TEST: Weather War (Sun vs Rain)");
  const torkoal = findPokemon("Torkoal");
  const venusaur = findPokemon("Venusaur");
  const incineroar = findPokemon("Incineroar");
  const garchomp = findPokemon("Garchomp");

  const pelipper = findPokemon("Pelipper");
  const politoed = findPokemon("Politoed");
  const milotic = findPokemon("Milotic");
  const excadrill = findPokemon("Excadrill");

  const result = simulateBattleWithLog(
    [torkoal, venusaur, incineroar, garchomp],
    [getSet(torkoal.id, 0), getSet(venusaur.id, 0), getSet(incineroar.id, 0), getSet(garchomp.id, 0)],
    [pelipper, politoed, milotic, excadrill],
    [getSet(pelipper.id, 0), getSet(politoed.id, 0), getSet(milotic.id, 0), getSet(excadrill.id, 0)],
  );

  printBattle(result, "WEATHER WAR: SUN vs RAIN");

  const weatherEvents = result.log.flatMap(l => l.events).filter(e =>
    /sun|rain|drought|drizzle/i.test(e)
  );
  console.log(`  Weather events: ${weatherEvents.length}`);
  weatherEvents.forEach(e => console.log(`    ${e}`));
  if (weatherEvents.length === 0) console.log("  ❌ No weather events logged!");
  return result;
}

// ── Test 3: Trick Room ──────────────────────────────────────────────────────
function testTrickRoom() {
  console.log("\n🔬 TEST: Trick Room team vs Fast Offense");
  const hatterene = findPokemon("Hatterene");
  const torkoal = findPokemon("Torkoal");
  const incineroar = findPokemon("Incineroar");
  const oranguru = findPokemon("Oranguru");

  const garchomp = findPokemon("Garchomp");
  const dragapult = findPokemon("Dragapult");
  const weavile = findPokemon("Weavile");
  const gengar = findPokemon("Gengar");

  const result = simulateBattleWithLog(
    [hatterene, incineroar, torkoal, oranguru],
    [getSet(hatterene.id, 0), getSet(incineroar.id, 0), getSet(torkoal.id, 0), getSet(oranguru.id, 0)],
    [garchomp, dragapult, weavile, gengar],
    [getSet(garchomp.id, 0), getSet(dragapult.id, 0), getSet(weavile.id, 0), getSet(gengar.id, 0)],
  );

  printBattle(result, "TRICK ROOM vs FAST OFFENSE");

  const trEvents = result.log.flatMap(l => l.events).filter(e => /trick room/i.test(e));
  console.log(`  Trick Room events: ${trEvents.length}`);
  trEvents.forEach(e => console.log(`    ${e}`));
  if (trEvents.length === 0) console.log("  ❌ Trick Room was NEVER set!");

  const trOnTurns = result.log.filter(l => l.field.trickRoom);
  console.log(`  Turns under TR: ${trOnTurns.length}`);
  return result;
}

// ── Test 4: Mega Evolution ──────────────────────────────────────────────────
function testMegaEvolution() {
  console.log("\n🔬 TEST: Mega Evolution Battle");
  const kangaskhan = findPokemon("Kangaskhan");
  const raichu = findPokemon("Raichu");
  const incineroar = findPokemon("Incineroar");
  const clefable = findPokemon("Clefable");

  const megaKangSet = findMegaSet(kangaskhan.id);
  const megaRaichuSet = findMegaSet(raichu.id);

  if (!megaKangSet || !megaRaichuSet) {
    console.log("  ⚠️  Missing mega sets for Kangaskhan or Raichu");
    return null;
  }

  const garchomp = findPokemon("Garchomp");
  const gengar = findPokemon("Gengar");

  const result = simulateBattleWithLog(
    [kangaskhan, raichu, incineroar, clefable],
    [megaKangSet, megaRaichuSet, getSet(incineroar.id, 0), getSet(clefable.id, 0)],
    [garchomp, gengar, findPokemon("Torkoal"), findPokemon("Milotic")],
    [megaGarchSet(), megaGengarSet(), getSet(findPokemon("Torkoal").id, 0), getSet(findPokemon("Milotic").id, 0)],
  );

  printBattle(result, "MEGA EVOLUTION BATTLE");

  const megaEvents = result.log.flatMap(l => l.events).filter(e => /mega/i.test(e));
  if (megaEvents.length > 0) {
    console.log("  ✅ Mega evolution events:");
    megaEvents.forEach(e => console.log(`    ${e}`));
  } else {
    console.log("  ⚠️  No mega evolution events logged (may happen silently)");
  }
  return result;

  function megaGarchSet() { return findMegaSet(garchomp.id) ?? getSet(garchomp.id, 0); }
  function megaGengarSet() { return findMegaSet(gengar.id) ?? getSet(gengar.id, 0); }
}

// ── Test 5: Protect / Focus Fire / Switching stats ──────────────────────────
function testProtectReads() {
  console.log("\n🔬 TEST: Protect / Double-target / Focus Fire patterns (10 battles)");

  let protectCount = 0;
  let totalTurns = 0;
  let doubleTargets = 0;
  let switchOuts = 0;

  const t1 = [findPokemon("Incineroar"), findPokemon("Garchomp"), findPokemon("Sylveon"), findPokemon("Dragapult")];
  const t2 = [findPokemon("Pelipper"), findPokemon("Milotic"), findPokemon("Torkoal"), findPokemon("Clefable")];
  const s1 = t1.map(p => getSet(p.id, 0));
  const s2 = t2.map(p => getSet(p.id, 0));

  for (let i = 0; i < 10; i++) {
    const result = simulateBattleWithLog(t1, s1, t2, s2);
    totalTurns += result.turnsPlayed;

    for (const entry of result.log) {
      for (const ev of entry.events) {
        if (/used protect/i.test(ev)) protectCount++;
        if (/switched out/i.test(ev)) switchOuts++;
      }
      const attacks = entry.events.filter(e => /used .+ on /i.test(e) && !/protect/i.test(e));
      const targets = attacks.map(a => {
        const m = a.match(/on (.+?)[\s—]/);
        return m?.[1];
      }).filter(Boolean);
      if (targets.length >= 2 && targets[0] === targets[1]) doubleTargets++;
    }
  }

  console.log(`  Over 10 battles (${totalTurns} total turns):`);
  console.log(`    Protect uses: ${protectCount} (${(protectCount / totalTurns * 100).toFixed(1)}% of turns)`);
  console.log(`    Double-target turns: ${doubleTargets}`);
  console.log(`    Switch-outs: ${switchOuts}`);

  const protectRate = protectCount / totalTurns;
  if (protectRate < 0.05) console.log("  ⚠️  Protect usage too LOW — VGC players Protect more");
  else if (protectRate > 0.40) console.log("  ⚠️  Protect usage too HIGH — over-protecting");
  else console.log("  ✅ Protect rate looks reasonable for VGC");

  if (switchOuts === 0) console.log("  ⚠️  NO switch-outs — VGC players switch!");
  else console.log(`  ✅ ${switchOuts} switch-outs (good, human-like)`);
}

// ── Test 6: Battle Length Distribution ──────────────────────────────────────
function testBattleLength() {
  console.log("\n🔬 TEST: Battle Length Distribution (50 battles)");
  const lengths: number[] = [];
  let t1Wins = 0;

  const availableMons = POKEMON_SEED.filter(p => USAGE_DATA[p.id]?.length > 0);

  for (let i = 0; i < 50; i++) {
    const shuffle = [...availableMons].sort(() => Math.random() - 0.5);
    const team1 = shuffle.slice(0, 4);
    const team2 = shuffle.slice(4, 8);

    const sets1 = team1.map(p => {
      const s = USAGE_DATA[p.id];
      return s[Math.floor(Math.random() * s.length)];
    });
    const sets2 = team2.map(p => {
      const s = USAGE_DATA[p.id];
      return s[Math.floor(Math.random() * s.length)];
    });

    const result = simulateBattleWithLog(team1, sets1, team2, sets2);
    lengths.push(result.turnsPlayed);
    if (result.winner === 1) t1Wins++;
  }

  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const max = Math.max(...lengths);
  const min = Math.min(...lengths);
  const timeouts = lengths.filter(l => l >= 50).length;
  const shortGames = lengths.filter(l => l <= 3).length;

  console.log(`  Avg turns: ${avg.toFixed(1)} | Min: ${min} | Max: ${max}`);
  console.log(`  Timeouts (50 turns): ${timeouts}`);
  console.log(`  Very short (≤3 turns): ${shortGames}`);
  console.log(`  Win balance: T1=${t1Wins}, T2=${lengths.length - t1Wins}`);

  const buckets = [0, 0, 0, 0, 0, 0];
  for (const l of lengths) {
    if (l <= 5) buckets[0]++;
    else if (l <= 10) buckets[1]++;
    else if (l <= 15) buckets[2]++;
    else if (l <= 20) buckets[3]++;
    else if (l <= 30) buckets[4]++;
    else buckets[5]++;
  }
  console.log(`  Distribution: 1-5:${buckets[0]} | 6-10:${buckets[1]} | 11-15:${buckets[2]} | 16-20:${buckets[3]} | 21-30:${buckets[4]} | 31+:${buckets[5]}`);

  if (avg < 5) console.log("  ⚠️  Games WAY too short — instant KOs, no strategy");
  else if (avg > 25) console.log("  ⚠️  Games too long — stalling or not aggressive enough");
  else console.log("  ✅ Battle length looks realistic for VGC");

  if (timeouts > 5) console.log("  ⚠️  Too many timeouts — bot can't close games");
  if (shortGames > 10) console.log("  ⚠️  Too many 1-3 turn blowouts");
}

// ── Test 7: Sample battle ───────────────────────────────────────────────────
function testSampleBattle() {
  console.log("\n🔬 TEST: Sample battle with full log");
  const team1 = [findPokemon("Incineroar"), findPokemon("Garchomp"), findPokemon("Sylveon"), findPokemon("Excadrill")];
  const team2 = [findPokemon("Torkoal"), findPokemon("Venusaur"), findPokemon("Milotic"), findPokemon("Tyranitar")];
  const sets1 = team1.map(p => getSet(p.id, 0));
  const sets2 = team2.map(p => getSet(p.id, 0));

  const result = simulateBattleWithLog(team1, sets1, team2, sets2);
  printBattle(result, "SAMPLE: Competitive Matchup");
  return result;
}

// ── Test 8: Intimidate interaction ──────────────────────────────────────────
function testIntimidateInteraction() {
  console.log("\n🔬 TEST: Intimidate interactions");
  const incineroar = findPokemon("Incineroar");
  const gyarados = findPokemon("Gyarados");
  const milotic = findPokemon("Milotic");
  const arcanine = findPokemon("Arcanine");

  const garchomp = findPokemon("Garchomp");
  const dragapult = findPokemon("Dragapult");
  const clefable = findPokemon("Clefable");
  const excadrill = findPokemon("Excadrill");

  console.log(`  Milotic abilities: ${milotic.abilities.map(a => a.name).join(", ")}`);

  const result = simulateBattleWithLog(
    [incineroar, gyarados, milotic, arcanine],
    [getSet(incineroar.id, 0), getSet(gyarados.id, 0), getSet(milotic.id, 0), getSet(arcanine.id, 0)],
    [garchomp, dragapult, clefable, excadrill],
    [getSet(garchomp.id, 0), getSet(dragapult.id, 0), getSet(clefable.id, 0), getSet(excadrill.id, 0)],
  );

  printBattle(result, "INTIMIDATE INTERACTIONS");

  const intimEvents = result.log.flatMap(l => l.events).filter(e => /intimidate|competitive|defiant/i.test(e));
  console.log(`  Intimidate-related events: ${intimEvents.length}`);
  intimEvents.forEach(e => console.log(`    ${e}`));
  return result;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("╔══════════════════════════════════════════════════════════════════╗");
  console.log("║          CHAMPIONS LAB — BATTLE BOT QA SESSION                 ║");
  console.log("╚══════════════════════════════════════════════════════════════════╝");

  testSampleBattle();
  testPalafinZeroToHero();
  testWeatherWar();
  testTrickRoom();
  testMegaEvolution();
  testIntimidateInteraction();
  testProtectReads();
  testBattleLength();

  console.log("\n" + "═".repeat(70));
  console.log("  QA SESSION COMPLETE");
  console.log("═".repeat(70));
}

main().catch(console.error);

// ═══════════════════════════════════════════════════════════════════════
// QA: Team Composition Rules — single-mega battle restriction
// TODO: Add tests that check team composition for duplicate items and species (including X/Y and regional forms)
// ═══════════════════════════════════════════════════════════════════════

import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { simulateBattleWithLog } from "../src/lib/engine/battle-sim";
import type { ChampionsPokemon, CommonSet } from "../src/lib/types";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    console.error(`  ❌ ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function getPokemon(name: string): ChampionsPokemon {
  const pokemon = POKEMON_SEED.find((entry) => entry.name.toLowerCase() === name.toLowerCase().trim());
  if (!pokemon) throw new Error(`Pokemon not found: ${name}`);
  return pokemon;
}

function findMegaSet(pokemon: ChampionsPokemon): CommonSet | null {
  const megaEntries = pokemon.forms?.filter(form => form.isMega) ?? [];
  if (!pokemon.hasMega || megaEntries.length === 0) return null;

  const maybeItem = pokemon.forms?.find(form => form.isMega)?.name;
  return {
    name: `${pokemon.name} Mega QA Set`,
    nature: "Adamant",
    ability: megaEntries[0]?.abilities?.[0]?.name ?? pokemon.abilities[0]?.name ?? "",
    item: maybeItem && maybeItem.includes("Y")
      ? `${pokemon.name}ite Y`
      : maybeItem && maybeItem.includes("X")
        ? `${pokemon.name}ite X`
        : `${pokemon.name}ite`,
    moves: pokemon.moves.filter(move => move.category !== "status").slice(0, 4).map(move => move.name),
    sp: { hp: 2, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 32 },
  };
}

function extractBattleMegaEvolvers(log: { events: string[] }[]): Set<string> {
  const evolvers = new Set<string>();
  for (const turn of log) {
    for (const event of turn.events) {
      if (!event.includes("Mega Evolved")) continue;
      const monName = event.split(" Mega Evolved")[0];
      evolvers.add(monName);
    }
  }
  return evolvers;
}

console.log("\n═══ TEST 1: Only One Mega May Activate Per Battle ═══");
{
  const charizardMega = findMegaSet(getPokemon("Charizard"));
  const venusaurMega = findMegaSet(getPokemon("Venusaur"));

  assert(charizardMega !== null, `Charizard has a mega set (${charizardMega?.item})`);
  assert(venusaurMega !== null, `Venusaur has a mega set (${venusaurMega?.item})`);

  if (charizardMega && venusaurMega) {
    const team1 = {
      pokemon: [
        getPokemon("Charizard"),
        getPokemon("Venusaur"),
        getPokemon("Incineroar"),
        getPokemon("Clefable"),
        getPokemon("Snorlax"),
        getPokemon("Milotic"),
      ],
      sets: [
        { ...charizardMega },
        { ...venusaurMega },
        { name: "Assault Vest Support", nature: "Careful", ability: "Intimidate", item: "Assault Vest", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
        { name: "Leftovers Support", nature: "Bold", ability: "Magic Guard", item: "Leftovers", moves: ["Moonblast", "Heal Pulse", "Protect", "Follow Me"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
        { name: "Sitrus Bulwark", nature: "Careful", ability: "Immunity", item: "Sitrus Berry", moves: ["Body Slam", "Protect", "Yawn", "Heavy Slam"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
        { name: "Safety Pivot", nature: "Calm", ability: "Marvel Scale", item: "Safety Goggles", moves: ["Scald", "Recover", "Ice Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 14, spDef: 0, speed: 0 } },
      ],
    };

    const team2 = {
      pokemon: [getPokemon("Incineroar"), getPokemon("Sylveon"), getPokemon("Clefable"), getPokemon("Snorlax"), getPokemon("Milotic"), getPokemon("Slowbro")],
      sets: [
        { name: "Pivot", nature: "Careful", ability: "Intimidate", item: "Assault Vest", moves: ["Flare Blitz", "Fake Out", "Parting Shot", "Darkest Lariat"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
        { name: "Fairy", nature: "Modest", ability: "Pixilate", item: "Choice Specs", moves: ["Hyper Voice", "Moonblast", "Protect", "Psyshock"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
        { name: "Support", nature: "Bold", ability: "Magic Guard", item: "Leftovers", moves: ["Moonblast", "Follow Me", "Protect", "Helping Hand"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
        { name: "Bulky", nature: "Careful", ability: "Immunity", item: "Sitrus Berry", moves: ["Body Slam", "Protect", "Yawn", "Heavy Slam"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
        { name: "Wall", nature: "Calm", ability: "Marvel Scale", item: "Safety Goggles", moves: ["Scald", "Recover", "Ice Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 14, spDef: 0, speed: 0 } },
        { name: "Slow Pivot", nature: "Bold", ability: "Regenerator", item: "Focus Sash", moves: ["Slack Off", "Scald", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
      ],
    };

    const battleRuns = 20;
    let successfulRuns = 0;
    let zeroMegaRuns = 0;
    let multiMegaRuns = 0;
    const megaEvolvers = new Set<string>();

    for (let attempt = 0; attempt < battleRuns; attempt++) {
      const result = simulateBattleWithLog(team1.pokemon, team1.sets, team2.pokemon, team2.sets);
      const evolvers = extractBattleMegaEvolvers(result.log);

      if (evolvers.size === 0) {
        zeroMegaRuns++;
        continue;
      }

      successfulRuns++;
      if (evolvers.size > 1) {
        multiMegaRuns++;
      }

      for (const evolver of evolvers) {
        megaEvolvers.add(evolver);
      }
    }

    assert(successfulRuns > 0, `Battle log shows at least one Mega Evolution across ${battleRuns} runs`);
    assert(multiMegaRuns === 0, `Only one Pokémon Mega Evolves per battle across ${battleRuns} runs`);
  }
}

console.log("\n════════════════════════════════════════════════════════════");
console.log(`RESULTS: ${passed} passed, ${failed} failed out of ${passed + failed} checks`);
if (failed > 0) {
  console.error("⚠️  SOME TEAM COMPOSITION TESTS FAILED — these are real rule violations to fix");
  process.exit(1);
} else {
  console.log("✅ ALL TEAM COMPOSITION TESTS PASSED!");
}
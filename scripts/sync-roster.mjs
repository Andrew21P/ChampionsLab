#!/usr/bin/env node
// Sync roster to match Serebii Pokémon Champions list.
// Usage: node scripts/sync-roster.mjs

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, "..", "src", "lib", "pokemon-data.ts");

// Pokémon NOT on Serebii → remove
const TO_REMOVE_IDS = new Set([18, 308, 310, 319, 323, 354, 362, 473, 670, 706, 709, 713, 861]);

// Official Serebii roster dex numbers
const SEREBII_DEX = new Set([
  3,6,9,15,25,26,36,38,59,65,71,80,94,115,121,127,130,132,
  134,135,136,142,143,149,154,157,160,181,184,186,196,197,199,
  208,212,214,227,229,248,279,282,302,306,324,334,350,359,376,
  389,392,395,428,442,445,448,450,460,461,464,470,471,472,475,
  478,479,497,500,503,530,531,534,547,553,569,571,584,587,618,
  623,635,637,652,655,658,660,663,666,676,678,681,693,697,699,
  700,701,707,711,715,724,727,730,733,740,745,748,750,752,763,
  765,778,780,784,823,844,855,858,866,867,869,877,887,900,901,
  902,903,908,914,923,925,934,936,937,952,959,964,968,970,977,
  978,981,983,1013,1018,1019,
]);

function formatMoveName(rawName) {
  const special = {
    "hi-jump-kick": "High Jump Kick",
    "power-up-punch": "Power-Up Punch",
    "double-edge": "Double-Edge",
    "self-destruct": "Self-Destruct",
    "u-turn": "U-turn",
    "x-scissor": "X-Scissor",
    "will-o-wisp": "Will-O-Wisp",
    "freeze-dry": "Freeze-Dry",
    "wake-up-slap": "Wake-Up Slap",
    "lock-on": "Lock-On",
    "mud-slap": "Mud-Slap",
    "v-create": "V-create",
    "baby-doll-eyes": "Baby-Doll Eyes",
    "kings-shield": "King's Shield",
    "lands-wrath": "Land's Wrath",
    "multi-attack": "Multi-Attack",
    "spirit-shackle": "Spirit Shackle",
    "first-impression": "First Impression",
    "darkest-lariat": "Darkest Lariat",
    "throat-chop": "Throat Chop",
    "stomping-tantrum": "Stomping Tantrum",
    "knock-off": "Knock Off",
  };
  if (special[rawName]) return special[rawName];
  return rawName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getGeneration(dex) {
  if (dex <= 151) return 1;
  if (dex <= 251) return 2;
  if (dex <= 386) return 3;
  if (dex <= 493) return 4;
  if (dex <= 649) return 5;
  if (dex <= 721) return 6;
  if (dex <= 809) return 7;
  if (dex <= 905) return 8;
  return 9;
}

const STATUS_WHITELIST = new Set([
  "protect","detect","follow-me","rage-powder","trick-room","tailwind",
  "helping-hand","fake-out","ally-switch","wide-guard","quick-guard",
  "will-o-wisp","thunder-wave","spore","sleep-powder","yawn",
  "stealth-rock","spikes","toxic-spikes","sticky-web",
  "swords-dance","dragon-dance","nasty-plot","calm-mind","bulk-up",
  "shell-smash","quiver-dance","coil","curse","iron-defense",
  "wish","roost","recover","slack-off","synthesis","moonlight","morning-sun",
  "toxic","encore","taunt","disable","leech-seed",
  "light-screen","reflect","aurora-veil",
  "rain-dance","sunny-day","sandstorm","hail","snowscape",
  "substitute","baton-pass","whirlwind","roar",
  "belly-drum","parting-shot","u-turn","volt-switch","flip-turn",
  "defog","haze","knock-off","rapid-spin","court-change",
  "trick","switcheroo","heal-bell","aromatherapy","pollen-puff",
  "decorate","coaching",
  "grassy-terrain","electric-terrain","psychic-terrain","misty-terrain",
  "kings-shield","baneful-bunker","obstruct","silk-trap","spiky-shield",
  "howl","agility","autotomize","rock-polish","cotton-guard",
  "heal-pulse","life-dew","safeguard",
  "growth","work-up","charge","stockpile",
  "scary-face","confuse-ray","sweet-kiss","attract",
  "destiny-bond","memento","explosion","self-destruct",
  "perish-song","mean-look","block",
  "feather-dance","charm","fake-tears","metal-sound","screech",
  "imprison","after-you","quash",
  "shore-up","strength-sap",
  "no-retreat","stuff-cheeks",
  "thunder-cage",
]);

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`);
  return r.json();
}

async function buildEntry(dexNumber, formName, apiId) {
  console.log(`  Fetching ${formName || `#${dexNumber}`}...`);
  const poke = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${apiId}`);

  const types = poke.types.sort((a,b) => a.slot - b.slot).map(t => t.type.name);
  const stats = {
    hp: poke.stats[0].base_stat,
    attack: poke.stats[1].base_stat,
    defense: poke.stats[2].base_stat,
    spAtk: poke.stats[3].base_stat,
    spDef: poke.stats[4].base_stat,
    speed: poke.stats[5].base_stat,
  };

  // Abilities
  const abilities = [];
  for (const a of poke.abilities) {
    let desc = "";
    try {
      const ab = await fetchJson(a.ability.url);
      const entry = ab.flavor_text_entries?.find(e => e.language.name === "en");
      desc = entry?.flavor_text?.replace(/[\n\f]/g, " ") || "";
    } catch {}
    abilities.push({
      name: formatMoveName(a.ability.name),
      description: desc,
      isHidden: a.is_hidden,
    });
  }

  // Moves - recent game moves only
  const validMoves = poke.moves.filter(m =>
    m.version_group_details.some(v =>
      ["scarlet-violet","sword-shield","brilliant-diamond-and-shining-pearl","legends-arceus","ultra-sun-ultra-moon"].includes(v.version_group.name)
    )
  );

  const moveObjs = [];
  for (let i = 0; i < validMoves.length; i += 15) {
    const batch = validMoves.slice(i, i + 15);
    const results = await Promise.all(
      batch.map(async m => {
        try { return await fetchJson(m.move.url); } catch { return null; }
      })
    );
    moveObjs.push(...results.filter(Boolean));
  }

  const moves = moveObjs
    .filter(m => {
      if (m.name === "tera-blast") return false;
      if (m.power && m.power > 0) return true;
      if (STATUS_WHITELIST.has(m.name)) return true;
      return false;
    })
    .map(m => {
      const flavorText = m.flavor_text_entries?.find(e => e.language.name === "en")?.flavor_text?.replace(/[\n\f]/g, " ") || "";
      return {
        name: formatMoveName(m.name),
        type: m.type.name,
        category: m.damage_class.name,
        power: m.power || 0,
        accuracy: m.accuracy,
        pp: m.pp,
        description: flavorText,
      };
    })
    .sort((a, b) => (b.power || 0) - (a.power || 0));

  const spriteId = poke.id;
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${spriteId}.png`;

  const name = formName || formatPokemonName(poke.name);

  let id = dexNumber;
  if (formName?.includes("Hisuian")) id = dexNumber + 5000;
  else if (formName?.includes("Galarian")) id = dexNumber + 6000;
  else if (formName?.includes("Alolan")) id = dexNumber + 7000;

  return {
    id,
    name,
    dexNumber,
    types,
    baseStats: stats,
    abilities,
    moves,
    sprite,
    officialArt: sprite,
    generation: getGeneration(dexNumber),
    forms: [],
    hasMega: false,
    recruitmentCost: null,
    homeCompatible: true,
    homeSource: ["Pokémon Champions"],
    season: 1,
    tier: "C",
    usageRate: null,
  };
}

function formatPokemonName(apiName) {
  const special = {
    "mr-rime": "Mr. Rime",
    "kommo-o": "Kommo-o",
    "mr-mime": "Mr. Mime",
    "type-null": "Type: Null",
  };
  if (special[apiName]) return special[apiName];
  return apiName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// Mega data for newly added Pokémon  
const MEGA_DATA = {
  142: {
    name: "Mega Aerodactyl", types: ["rock","flying"],
    stats: {hp:80,attack:135,defense:85,spAtk:70,spDef:95,speed:150},
    ability: "Tough Claws", spriteId: 10042,
  },
  302: {
    name: "Mega Sableye", types: ["dark","ghost"],
    stats: {hp:50,attack:85,defense:125,spAtk:85,spDef:115,speed:20},
    ability: "Magic Bounce", spriteId: 10066,
  },
};

async function main() {
  console.log("Reading pokemon-data.ts...");
  const raw = readFileSync(DATA_FILE, "utf-8");

  const startMarker = "export const POKEMON_SEED: ChampionsPokemon[] = ";
  const startIdx = raw.indexOf(startMarker);
  const arrayStart = startIdx + startMarker.length;

  let depth = 0, arrayEnd = -1;
  for (let i = arrayStart; i < raw.length; i++) {
    if (raw[i] === "[") depth++;
    else if (raw[i] === "]") { depth--; if (depth === 0) { arrayEnd = i + 1; break; } }
  }

  const preamble = raw.substring(0, arrayStart);
  const arrayStr = raw.substring(arrayStart, arrayEnd);
  const afterArray = raw.substring(arrayEnd);

  const seed = (new Function("return " + arrayStr))();
  console.log(`Current entries: ${seed.length}`);

  // Step 1: Remove non-Serebii Pokémon
  const filtered = seed.filter(p => !TO_REMOVE_IDS.has(p.dexNumber));
  console.log(`After removal: ${filtered.length} (removed ${seed.length - filtered.length})`);

  // Step 2: Remove Tera Blast from ALL movesets
  let teraCount = 0;
  for (const p of filtered) {
    const len = p.moves.length;
    p.moves = p.moves.filter(m => m.name !== "Tera Blast");
    if (p.moves.length < len) teraCount++;
  }
  console.log(`Removed Tera Blast from ${teraCount} Pokémon`);

  // Step 3: Find missing
  const hasDex = new Set(filtered.map(p => p.dexNumber));
  const hasName = new Set(filtered.map(p => p.name));
  const missingBase = [...SEREBII_DEX].filter(d => !hasDex.has(d));
  console.log(`\nMissing base Pokémon (${missingBase.length}): ${missingBase.join(", ")}`);

  const regionalNeeded = [
    { dex: 59, name: "Hisuian Arcanine", api: "arcanine-hisui" },
    { dex: 80, name: "Galarian Slowbro", api: "slowbro-galar" },
    { dex: 157, name: "Typhlosion", api: "typhlosion" },
    { dex: 157, name: "Hisuian Typhlosion", api: "typhlosion-hisui" },
    { dex: 199, name: "Slowking", api: "slowking" },
    { dex: 199, name: "Galarian Slowking", api: "slowking-galar" },
    { dex: 618, name: "Stunfisk", api: "stunfisk" },
    { dex: 618, name: "Galarian Stunfisk", api: "stunfisk-galar" },
  ].filter(r => !hasName.has(r.name));
  console.log(`Missing regional forms: ${regionalNeeded.map(r => r.name).join(", ")}`);

  // Step 4: Fetch missing
  const newEntries = [];

  for (const dex of missingBase) {
    if ([157, 199, 618].includes(dex)) continue; // handled as regional forms
    try {
      const entry = await buildEntry(dex, null, dex);
      if (MEGA_DATA[dex]) {
        const m = MEGA_DATA[dex];
        entry.forms = [{
          name: m.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${m.spriteId}.png`,
          types: m.types,
          baseStats: m.stats,
          abilities: [{ name: m.ability, description: "", isChampions: false }],
          isMega: true,
        }];
        entry.hasMega = true;
      }
      newEntries.push(entry);
      console.log(`  ✓ ${entry.name} — ${entry.moves.length} moves`);
    } catch (e) {
      console.error(`  ✗ #${dex}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 100));
  }

  for (const r of regionalNeeded) {
    try {
      const entry = await buildEntry(r.dex, r.name, r.api);
      newEntries.push(entry);
      console.log(`  ✓ ${entry.name} — ${entry.moves.length} moves`);
    } catch (e) {
      console.error(`  ✗ ${r.name}: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 100));
  }

  const combined = [...filtered, ...newEntries].sort((a, b) => a.dexNumber - b.dexNumber || a.id - b.id);
  console.log(`\nFinal roster: ${combined.length} entries`);
  console.log(`Unique dex numbers: ${new Set(combined.map(p => p.dexNumber)).size}`);

  const output = preamble + JSON.stringify(combined, null, 2) + afterArray;
  writeFileSync(DATA_FILE, output, "utf-8");
  console.log("✓ Written to pokemon-data.ts");
}

main().catch(e => { console.error(e); process.exit(1); });

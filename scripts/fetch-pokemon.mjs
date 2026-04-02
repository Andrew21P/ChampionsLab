// PokeAPI Scraper — generates real Pokémon data for Champions Lab
// Roster source: https://www.serebii.net/pokemonchampions/pokemon.shtml
// Run: node scripts/fetch-pokemon.mjs

const BASE = "https://pokeapi.co/api/v2";

// Official Serebii Champions roster — 93 Pokémon
const ROSTER_IDS = [
  // Gen 1
  3,    // Venusaur
  6,    // Charizard
  9,    // Blastoise
  25,   // Pikachu
  26,   // Raichu
  36,   // Clefable
  38,   // Ninetales
  80,   // Slowbro
  94,   // Gengar
  115,  // Kangaskhan
  121,  // Starmie
  127,  // Pinsir
  130,  // Gyarados
  136,  // Flareon
  143,  // Snorlax
  149,  // Dragonite

  // Gen 2
  154,  // Meganium
  160,  // Feraligatr
  181,  // Ampharos
  186,  // Politoed
  197,  // Umbreon
  212,  // Scizor
  214,  // Heracross
  227,  // Skarmory
  229,  // Houndoom
  248,  // Tyranitar

  // Gen 3
  279,  // Pelipper
  282,  // Gardevoir
  324,  // Torkoal
  334,  // Altaria
  350,  // Milotic
  359,  // Absol
  376,  // Metagross

  // Gen 4
  395,  // Empoleon
  445,  // Garchomp
  448,  // Lucario
  450,  // Hippowdon
  464,  // Rhyperior
  470,  // Leafeon
  471,  // Glaceon
  472,  // Gliscor
  478,  // Froslass
  479,  // Rotom

  // Gen 5
  497,  // Serperior
  500,  // Emboar
  503,  // Samurott
  530,  // Excadrill
  531,  // Audino
  547,  // Whimsicott
  553,  // Krookodile
  571,  // Zoroark
  587,  // Emolga
  635,  // Hydreigon

  // Gen 6
  652,  // Chesnaught
  655,  // Delphox
  658,  // Greninja
  660,  // Diggersby
  663,  // Talonflame
  678,  // Meowstic
  681,  // Aegislash
  700,  // Sylveon
  701,  // Hawlucha
  715,  // Noivern

  // Gen 7
  724,  // Decidueye
  727,  // Incineroar
  740,  // Crabominable
  745,  // Lycanroc
  748,  // Toxapex
  763,  // Tsareena
  765,  // Oranguru
  778,  // Mimikyu
  780,  // Drampa
  784,  // Kommo-o

  // Gen 8
  858,  // Hatterene
  887,  // Dragapult

  // Legends: Arceus
  900,  // Kleavor
  901,  // Ursaluna
  902,  // Basculegion
  903,  // Sneasler

  // Gen 9
  908,  // Meowscarada
  923,  // Pawmot
  925,  // Maushold
  936,  // Armarouge
  952,  // Scovillain
  959,  // Tinkaton
  964,  // Palafin
  970,  // Glimmora
  977,  // Dondozo
  978,  // Tatsugiri
  983,  // Kingambit
  1013, // Sinistcha
  1018, // Archaludon
  1019, // Hydrapple
];

// Remove duplicates and sort
const UNIQUE_IDS = [...new Set(ROSTER_IDS)].sort((a, b) => a - b);

// Mega evolution data (Champions-specific)
// formId = PokeAPI form ID used for HOME sprites (https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{formId}.png)
const MEGA_DATA = {
  3: { name: "Mega Venusaur", formId: 10033, types: ["grass", "poison"], ability: "Thick Fat", stats: { hp: 80, attack: 100, defense: 123, spAtk: 122, spDef: 120, speed: 80 } },
  6: [
    { name: "Mega Charizard X", formId: 10034, types: ["fire", "dragon"], ability: "Tough Claws", stats: { hp: 78, attack: 130, defense: 111, spAtk: 130, spDef: 85, speed: 100 } },
    { name: "Mega Charizard Y", formId: 10035, types: ["fire", "flying"], ability: "Drought", stats: { hp: 78, attack: 104, defense: 78, spAtk: 159, spDef: 115, speed: 100 } },
  ],
  9: { name: "Mega Blastoise", formId: 10036, types: ["water"], ability: "Mega Launcher", stats: { hp: 79, attack: 103, defense: 120, spAtk: 135, spDef: 115, speed: 78 } },
  94: { name: "Mega Gengar", formId: 10038, types: ["ghost", "poison"], ability: "Shadow Tag", stats: { hp: 60, attack: 65, defense: 80, spAtk: 170, spDef: 95, speed: 130 } },
  115: { name: "Mega Kangaskhan", formId: 10039, types: ["normal"], ability: "Parental Bond", stats: { hp: 105, attack: 125, defense: 100, spAtk: 60, spDef: 100, speed: 100 } },
  127: { name: "Mega Pinsir", formId: 10040, types: ["bug", "flying"], ability: "Aerilate", stats: { hp: 65, attack: 155, defense: 120, spAtk: 65, spDef: 90, speed: 105 } },
  130: { name: "Mega Gyarados", formId: 10041, types: ["water", "dark"], ability: "Mold Breaker", stats: { hp: 95, attack: 155, defense: 109, spAtk: 70, spDef: 130, speed: 81 } },
  154: { name: "Mega Meganium", types: ["grass", "fairy"], ability: "Mega Sol", stats: { hp: 80, attack: 92, defense: 115, spAtk: 143, spDef: 115, speed: 80 }, isChampions: false },
  160: { name: "Mega Feraligatr", types: ["water", "dragon"], ability: "Dragonize", stats: { hp: 85, attack: 160, defense: 125, spAtk: 89, spDef: 93, speed: 78 }, isChampions: false },
  181: { name: "Mega Ampharos", formId: 10045, types: ["electric", "dragon"], ability: "Mold Breaker", stats: { hp: 90, attack: 95, defense: 105, spAtk: 165, spDef: 110, speed: 45 } },
  212: { name: "Mega Scizor", formId: 10046, types: ["bug", "steel"], ability: "Technician", stats: { hp: 70, attack: 150, defense: 140, spAtk: 65, spDef: 100, speed: 75 } },
  214: { name: "Mega Heracross", formId: 10047, types: ["bug", "fighting"], ability: "Skill Link", stats: { hp: 80, attack: 185, defense: 115, spAtk: 40, spDef: 105, speed: 75 } },
  229: { name: "Mega Houndoom", formId: 10048, types: ["dark", "fire"], ability: "Solar Power", stats: { hp: 75, attack: 90, defense: 90, spAtk: 140, spDef: 90, speed: 115 } },
  248: { name: "Mega Tyranitar", formId: 10049, types: ["rock", "dark"], ability: "Sand Stream", stats: { hp: 100, attack: 164, defense: 150, spAtk: 95, spDef: 120, speed: 71 } },
  282: { name: "Mega Gardevoir", formId: 10051, types: ["psychic", "fairy"], ability: "Pixilate", stats: { hp: 68, attack: 85, defense: 65, spAtk: 165, spDef: 135, speed: 100 } },
  334: { name: "Mega Altaria", formId: 10067, types: ["dragon", "fairy"], ability: "Pixilate", stats: { hp: 75, attack: 110, defense: 110, spAtk: 110, spDef: 105, speed: 80 } },
  359: { name: "Mega Absol", formId: 10057, types: ["dark"], ability: "Magic Bounce", stats: { hp: 65, attack: 150, defense: 60, spAtk: 115, spDef: 60, speed: 115 } },
  376: { name: "Mega Metagross", formId: 10076, types: ["steel", "psychic"], ability: "Tough Claws", stats: { hp: 80, attack: 145, defense: 150, spAtk: 105, spDef: 110, speed: 110 } },
  445: { name: "Mega Garchomp", formId: 10058, types: ["dragon", "ground"], ability: "Sand Force", stats: { hp: 108, attack: 170, defense: 115, spAtk: 120, spDef: 95, speed: 92 } },
  448: { name: "Mega Lucario", formId: 10059, types: ["fighting", "steel"], ability: "Adaptability", stats: { hp: 70, attack: 145, defense: 88, spAtk: 140, spDef: 70, speed: 112 } },
  531: { name: "Mega Audino", formId: 10069, types: ["normal", "fairy"], ability: "Healer", stats: { hp: 103, attack: 60, defense: 126, spAtk: 80, spDef: 126, speed: 50 } },
};

// Champions-specific ability overrides
const CHAMPIONS_ABILITIES = {
  154: [{ name: "Mega Sol", description: "Even when the sunlight has not turned harsh, the Pokémon can use its moves as if the weather were harsh sunlight.", isChampions: false }],
  160: [{ name: "Dragonize", description: "The Pokémon's Normal-type moves become Dragon-type moves and their power is boosted by 20%.", isChampions: false }],
};

// Tier assignments based on competitive viability (Serebii Champions roster)
const TIER_MAP = {
  // S tier — meta-defining
  445: "S", 727: "S", 248: "S", 94: "S", 376: "S", 658: "S",
  887: "S", 983: "S", 681: "S", 530: "S", 149: "S",
  // A tier — very strong
  6: "A", 130: "A", 160: "A", 154: "A", 448: "A", 282: "A",
  858: "A", 212: "A", 472: "A", 700: "A", 778: "A",
  784: "A", 635: "A", 748: "A", 547: "A", 186: "A", 908: "A",
  115: "A", 479: "A", 964: "A", 1018: "A",
  // B tier — solid picks
  3: "B", 9: "B", 181: "B", 324: "B", 350: "B", 279: "B",
  227: "B", 214: "B", 553: "B", 571: "B", 663: "B",
  724: "B", 763: "B", 334: "B", 395: "B", 450: "B",
  464: "B", 478: "B", 497: "B", 715: "B", 936: "B",
  970: "B", 901: "B", 903: "B", 1019: "B", 229: "B",
  80: "B", 36: "B", 959: "B", 977: "B", 978: "B",
  // C tier
  25: "C", 26: "C", 38: "C", 121: "C", 127: "C", 136: "C",
  143: "C", 197: "C", 359: "C", 470: "C", 471: "C",
  500: "C", 503: "C", 531: "C", 587: "C", 652: "C", 655: "C",
  660: "C", 678: "C", 701: "C", 740: "C", 745: "C",
  765: "C", 780: "C", 900: "C", 902: "C", 923: "C",
  925: "C", 952: "C", 1013: "C",
};

// Usage rate approximations
const USAGE_MAP = {
  445: 24.0, 727: 22.5, 887: 21.0, 983: 20.0, 248: 19.5,
  94: 18.0, 376: 17.0, 658: 16.5, 681: 16.0, 530: 15.5,
  149: 15.0, 6: 14.0, 130: 13.5, 448: 13.0, 282: 12.5,
  858: 12.0, 212: 11.5, 472: 11.0, 700: 10.5, 778: 10.0,
  784: 9.5, 635: 9.0, 748: 8.5, 547: 8.0, 186: 7.5,
  908: 7.0, 115: 6.8, 479: 6.5, 964: 6.2, 1018: 6.0,
  160: 5.8, 154: 5.5, 324: 5.2, 350: 5.0, 279: 4.8,
  227: 4.5, 214: 4.2, 553: 4.0, 571: 3.8, 663: 3.5,
  724: 3.2, 763: 3.0, 334: 2.8,
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function mapType(t) {
  return t.name;
}

function mapStat(stats) {
  const m = {};
  for (const s of stats) {
    switch (s.stat.name) {
      case "hp": m.hp = s.base_stat; break;
      case "attack": m.attack = s.base_stat; break;
      case "defense": m.defense = s.base_stat; break;
      case "special-attack": m.spAtk = s.base_stat; break;
      case "special-defense": m.spDef = s.base_stat; break;
      case "speed": m.speed = s.base_stat; break;
    }
  }
  return m;
}

function mapCategory(dc) {
  if (dc === "physical") return "physical";
  if (dc === "special") return "special";
  return "status";
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${url} → ${res.status}`);
  return res.json();
}

async function fetchPokemon(id) {
  const data = await fetchJSON(`${BASE}/pokemon/${id}`);
  const speciesData = await fetchJSON(data.species.url);

  const types = data.types
    .sort((a, b) => a.slot - b.slot)
    .map((t) => mapType(t.type));

  const stats = mapStat(data.stats);

  const abilities = data.abilities.map((a) => ({
    name: a.ability.name
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: "", // filled from ability endpoint if needed
    isHidden: a.is_hidden,
  }));

  // Fetch the first 8 moves that are level-up or TM (most relevant for competitive)
  const movesToFetch = data.moves
    .filter((m) => {
      const details = m.version_group_details;
      return details.some(
        (d) =>
          d.move_learn_method.name === "level-up" ||
          d.move_learn_method.name === "machine" ||
          d.move_learn_method.name === "tutor"
      );
    })
    .slice(0, 16); // Get more, we'll fetch details for the best ones

  const moves = [];
  for (const m of movesToFetch.slice(0, 12)) {
    try {
      const moveData = await fetchJSON(m.move.url);
      const enEntry = moveData.flavor_text_entries.find(
        (e) => e.language.name === "en"
      );
      moves.push({
        name: moveData.name
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        type: moveData.type.name,
        category: mapCategory(moveData.damage_class.name),
        power: moveData.power,
        accuracy: moveData.accuracy,
        pp: moveData.pp,
        description: enEntry
          ? enEntry.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ")
          : "",
      });
      await sleep(80); // rate limit
    } catch {
      // skip failed moves
    }
  }

  const gen = speciesData.generation.url.split("/").filter(Boolean).pop();
  const genNum = parseInt(gen.replace("generation-", "").replace(/i/g, (_, i, s) => {
    // Convert roman to number
    return "";
  }), 10) || romanToInt(gen.replace("generation-", ""));

  const name = data.name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");

  // Build forms
  const forms = [];
  const megaInfo = MEGA_DATA[id];
  if (megaInfo) {
    const megas = Array.isArray(megaInfo) ? megaInfo : [megaInfo];
    for (const mega of megas) {
      forms.push({
        name: mega.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${mega.formId || id}.png`,
        types: mega.types,
        baseStats: mega.stats,
        abilities: [
          {
            name: mega.ability,
            description: "",
            isChampions: mega.isChampions || false,
          },
        ],
        isMega: true,
      });
    }
  }

  // Champions ability overrides
  const champAbilities = CHAMPIONS_ABILITIES[id];

  return {
    id,
    name: prettifyName(name),
    dexNumber: id,
    types,
    baseStats: stats,
    abilities: champAbilities
      ? [...abilities, ...champAbilities]
      : abilities,
    moves,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
    officialArt: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
    generation: genNum,
    forms: forms.length > 0 ? forms : undefined,
    hasMega: forms.some((f) => f.isMega) || false,
    recruitmentCost: getRecruitCost(TIER_MAP[id]),
    homeCompatible: true,
    homeSource: ["Scarlet/Violet", "Pokémon GO", "Legends Z-A"],
    season: 1,
    tier: TIER_MAP[id] || "C",
    usageRate: USAGE_MAP[id] || Math.round(Math.random() * 3 + 1 * 10) / 10,
  };
}

function prettifyName(name) {
  const special = {
    "Mr-Mime": "Mr. Mime",
    "Mr-Rime": "Mr. Rime",
    "Tapu-Koko": "Tapu Koko",
    "Tapu-Lele": "Tapu Lele",
    "Tapu-Bulu": "Tapu Bulu",
    "Tapu-Fini": "Tapu Fini",
    "Ho-Oh": "Ho-Oh",
    "Wo-Chien": "Wo-Chien",
    "Chi-Yu": "Chi-Yu",
    "Kommo-O": "Kommo-o",
    "Hakamo-O": "Hakamo-o",
    "Jangmo-O": "Jangmo-o",
  };
  if (special[name]) return special[name];
  return name.replace(/-/g, " ");
}

function romanToInt(s) {
  const map = { i: 1, v: 5, x: 10 };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]] || 0;
    const next = map[s[i + 1]] || 0;
    result += curr < next ? -curr : curr;
  }
  return result;
}

function getRecruitCost(tier) {
  switch (tier) {
    case "S": return 250;
    case "A": return 180;
    case "B": return 120;
    case "C": return 80;
    case "D": return 60;
    default: return 80;
  }
}

async function main() {
  console.log(`Fetching ${UNIQUE_IDS.length} Pokémon from PokeAPI...`);
  const results = [];
  let count = 0;

  for (const id of UNIQUE_IDS) {
    try {
      process.stdout.write(`  [${++count}/${UNIQUE_IDS.length}] #${id}...`);
      const mon = await fetchPokemon(id);
      results.push(mon);
      console.log(` ✓ ${mon.name}`);
      await sleep(150); // respect rate limits
    } catch (err) {
      console.log(` ✗ Error: ${err.message}`);
    }
  }

  // Sort by dex number
  results.sort((a, b) => a.dexNumber - b.dexNumber);

  // Generate the TypeScript file
  const tsContent = `import { ChampionsPokemon, Season } from "./types";

// ============================================================
// Auto-generated from PokeAPI on ${new Date().toISOString().split("T")[0]}
// ${results.length} Pokémon in the Champions Season 1 roster
// ============================================================

export const SEASONS: Season[] = [
  {
    id: 1,
    name: "Season 1 — Launch",
    startDate: "2026-04-08",
    rosterAdditions: [],
    rules: [
      "Doubles format",
      "Level 50 (fixed)",
      "No IVs",
      "64 Stat Points total (max 32 per stat)",
      "Mega Evolution allowed (1 per team)",
      "Omni Ring Tera allowed (1 per team)",
      "No duplicate Pokémon",
      "No duplicate held items",
    ],
    isActive: true,
  },
  {
    id: 2,
    name: "Season 2 — Expansion",
    startDate: "2026-07-01",
    rosterAdditions: [],
    rules: [
      "Doubles format",
      "Level 50 (fixed)",
      "Additional Pokémon from DLC",
    ],
    isActive: false,
  },
];

export const POKEMON_SEED: ChampionsPokemon[] = ${JSON.stringify(results, null, 2)};

export function getPokemonBySeason(season: number): ChampionsPokemon[] {
  return POKEMON_SEED.filter((p) => p.season <= season);
}

export function getPokemonByType(type: string): ChampionsPokemon[] {
  return POKEMON_SEED.filter((p) =>
    p.types.includes(type as ChampionsPokemon["types"][0])
  );
}

export function getPokemonByGen(gen: number): ChampionsPokemon[] {
  return POKEMON_SEED.filter((p) => p.generation === gen);
}

export const STAT_PRESETS = {
  "Balanced Attacker": { hp: 12, attack: 20, defense: 4, spAtk: 20, spDef: 4, speed: 4 },
  "Bulky Support": { hp: 20, attack: 0, defense: 16, spAtk: 0, spDef: 16, speed: 12 },
  "Fast Sweeper": { hp: 0, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 32 },
  "Special Sweeper": { hp: 0, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 32 },
  "Trick Room Tank": { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 0 },
  "Mixed Attacker": { hp: 0, attack: 16, defense: 0, spAtk: 16, spDef: 0, speed: 32 },
} as const;
`;

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(
    process.cwd(),
    "src",
    "lib",
    "pokemon-data.ts"
  );
  fs.writeFileSync(outPath, tsContent, "utf-8");
  console.log(`\n✅ Wrote ${results.length} Pokémon to ${outPath}`);
}

main().catch(console.error);

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC TEAM GENERATOR ENGINE
// Generates competitive teams using synergy analysis, usage data, and archetype templates
// ═══════════════════════════════════════════════════════════════════════════════

import type { ChampionsPokemon, CommonSet, PokemonType } from "@/lib/types";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import { USAGE_DATA } from "@/lib/usage-data";
import { analyzeTeamSynergy, scorePokemonFit, identifyRoles, type TeamSynergy } from "./synergy";
import { getWeaknesses, getResistances, getImmunities } from "./type-chart";

// ── ARCHETYPE TEMPLATES ──────────────────────────────────────────────────────

interface ArchetypeTemplate {
  name: string;
  description: string;
  coreIds: number[];           // Must-have Pokémon IDs
  flexPool: number[];          // Optional additions from this pool
  preferredRoles: string[];    // Roles to fill with remaining slots
  weatherNeeded?: string;
  hasTrickRoom?: boolean;
  hasTailwind?: boolean;
}

const ARCHETYPE_TEMPLATES: ArchetypeTemplate[] = [
  // ── WEATHER TEAMS ──────────────────────────────────────
  {
    name: "Rain Offense",
    description: "Rain setter + Swift Swim sweepers with fast support",
    coreIds: [186], // Politoed
    flexPool: [9, 130, 658, 503, 160], // Blastoise, Gyarados, Greninja, Samurott, Feraligatr
    preferredRoles: ["speed-control", "support", "intimidate-user"],
    weatherNeeded: "rain",
  },
  {
    name: "Sun Hyper Offense",
    description: "Sun setter + Chlorophyll/Solar Power sweepers",
    coreIds: [324], // Torkoal
    flexPool: [3, 6, 38, 470, 952], // Venusaur, Charizard, Ninetales, Leafeon, Scovillain
    preferredRoles: ["speed-control", "support", "intimidate-user"],
    weatherNeeded: "sun",
  },
  {
    name: "Sun with Ninetales",
    description: "Ninetales-led sun with sweepers",
    coreIds: [38], // Ninetales
    flexPool: [3, 6, 470, 952, 136], // Venusaur, Charizard, Leafeon, Scovillain, Flareon
    preferredRoles: ["speed-control", "support", "physical-sweeper"],
    weatherNeeded: "sun",
  },
  {
    name: "Sand Rush",
    description: "Tyranitar + Excadrill sand core with coverage",
    coreIds: [248, 530], // Tyranitar, Excadrill
    flexPool: [445, 464, 553, 450], // Garchomp, Rhyperior, Krookodile, Hippowdon
    preferredRoles: ["speed-control", "support", "special-sweeper"],
    weatherNeeded: "sand",
  },
  {
    name: "Snow Team",
    description: "Hail-based team with Aurora Veil",
    coreIds: [471], // Glaceon (or other snow setter)
    flexPool: [376, 227, 478], // Metagross, Skarmory, Froslass
    preferredRoles: ["speed-control", "support", "physical-sweeper"],
    weatherNeeded: "snow",
  },

  // ── TRICK ROOM TEAMS ──────────────────────────────────
  {
    name: "Hard Trick Room",
    description: "Dedicated Trick Room with slow powerful attackers",
    coreIds: [858], // Hatterene
    flexPool: [464, 780, 143, 983, 248, 324, 80], // Rhyperior, Drampa, Snorlax, Kingambit, Tyranitar, Torkoal, Slowbro
    preferredRoles: ["support", "redirector"],
    hasTrickRoom: true,
  },
  {
    name: "Semi Trick Room",
    description: "Flexible team with Trick Room as option",
    coreIds: [36], // Clefable (TR setter + Follow Me)
    flexPool: [983, 727, 681, 149, 376, 858, 248, 780],
    preferredRoles: ["physical-sweeper", "special-sweeper", "support"],
    hasTrickRoom: true,
  },
  {
    name: "Slowbro Trick Room",
    description: "Slowbro-led Trick Room with bulky attackers",
    coreIds: [80], // Slowbro
    flexPool: [464, 143, 983, 248, 727, 780, 858, 324],
    preferredRoles: ["redirector", "support", "physical-sweeper"],
    hasTrickRoom: true,
  },

  // ── SPEED CONTROL TEAMS ────────────────────────────────
  {
    name: "Tailwind Offense",
    description: "Whimsicott Tailwind + fast attackers",
    coreIds: [547], // Whimsicott
    flexPool: [887, 149, 445, 658, 376, 681, 635, 282],
    preferredRoles: ["physical-sweeper", "special-sweeper", "intimidate-user"],
    hasTailwind: true,
  },
  {
    name: "Dragapult Tailwind",
    description: "Dragapult speed control + offensive core",
    coreIds: [887], // Dragapult
    flexPool: [727, 445, 983, 282, 376, 658, 681, 547],
    preferredRoles: ["intimidate-user", "support", "special-sweeper"],
    hasTailwind: true,
  },

  // ── GOODSTUFFS / BALANCE ───────────────────────────────
  {
    name: "Incineroar Balance",
    description: "Incineroar pivot + balanced attackers",
    coreIds: [727], // Incineroar
    flexPool: [149, 445, 376, 681, 350, 282, 887, 983, 658, 547, 635],
    preferredRoles: ["special-sweeper", "physical-sweeper", "speed-control", "support"],
  },
  {
    name: "Metagross Core",
    description: "Mega Metagross as anchor with flexible support",
    coreIds: [376], // Metagross
    flexPool: [727, 547, 149, 350, 681, 445, 282, 887],
    preferredRoles: ["intimidate-user", "speed-control", "support", "special-sweeper"],
  },
  {
    name: "Garchomp Offense",
    description: "Garchomp-led offensive team",
    coreIds: [445], // Garchomp
    flexPool: [727, 547, 282, 887, 681, 376, 149, 658, 350],
    preferredRoles: ["speed-control", "intimidate-user", "support", "special-sweeper"],
  },
  {
    name: "Dragonite Pivot",
    description: "Multiscale Dragonite + versatile core",
    coreIds: [149], // Dragonite
    flexPool: [727, 547, 681, 376, 350, 282, 445, 658, 983],
    preferredRoles: ["speed-control", "intimidate-user", "support"],
  },
  {
    name: "Kingambit Hyper Offense",
    description: "Supreme Overlord Kingambit + aggressive core",
    coreIds: [983], // Kingambit
    flexPool: [727, 547, 887, 445, 658, 149, 376, 282],
    preferredRoles: ["speed-control", "intimidate-user", "support"],
  },

  // ── SPECIALIZED ARCHETYPES ─────────────────────────────
  {
    name: "Intimidate Cycle",
    description: "Double Intimidate with pivoting",
    coreIds: [727, 553], // Incineroar, Krookodile
    flexPool: [130, 149, 445, 376, 547, 282, 681],
    preferredRoles: ["speed-control", "special-sweeper", "support"],
  },
  {
    name: "Follow Me + Setup",
    description: "Redirector + setup sweeper",
    coreIds: [36, 376], // Clefable + Metagross
    flexPool: [727, 149, 445, 547, 681, 887, 350],
    preferredRoles: ["speed-control", "physical-sweeper", "support"],
  },
  {
    name: "Hyper Offense",
    description: "All-out attacking with minimal support",
    coreIds: [887], // Dragapult
    flexPool: [445, 983, 658, 635, 376, 149, 500, 448],
    preferredRoles: ["physical-sweeper", "special-sweeper", "speed-control"],
  },
  {
    name: "Bulky Balance",
    description: "Defensive core with win conditions",
    coreIds: [350, 727], // Milotic, Incineroar
    flexPool: [681, 376, 149, 36, 445, 547, 983, 282],
    preferredRoles: ["speed-control", "physical-sweeper", "special-sweeper"],
  },
];

// ── POKEMON LOOKUP ───────────────────────────────────────────────────────────

const pokemonById = new Map<number, ChampionsPokemon>();
for (const p of POKEMON_SEED) {
  pokemonById.set(p.id, p);
}

function getPokemon(id: number): ChampionsPokemon | undefined {
  return pokemonById.get(id);
}

function isMegaStoneItem(item: string): boolean {
  return item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
}

function getBestSet(pokemonId: number, teamContext?: ChampionsPokemon[], existingSets?: CommonSet[]): CommonSet | null {
  const sets = USAGE_DATA[pokemonId];
  if (!sets || sets.length === 0) return null;

  const availableSets = sets; // Artifact of when only one mega stone was allowed per team
  if (availableSets.length === 0) return sets[0].item && isMegaStoneItem(sets[0].item) ? { ...sets[0], item: "Life Orb" } : sets[0];
  
  // If no team context, return the first (most common) set
  if (!teamContext || teamContext.length === 0) return availableSets[0];
  
  // Choose the best set based on team context
  const hasWeatherSetter = teamContext.some(p =>
    p.abilities.some(a => ["Drought", "Drizzle", "Sand Stream", "Snow Warning"].includes(a.name))
  );
  const hasTR = teamContext.some(p =>
    p.moves.some(m => m.name === "Trick Room")
  );
  
  // Score each set
  let bestSet = availableSets[0];
  let bestScore = 0;
  
  for (const set of availableSets) {
    let score = 0;
    
    // Prefer sets that synergize with weather
    if (hasWeatherSetter) {
      if (set.ability === "Chlorophyll" || set.ability === "Swift Swim" ||
          set.ability === "Sand Rush" || set.ability === "Solar Power") {
        score += 20;
      }
    }
    
    // Prefer slow sets in Trick Room teams
    if (hasTR && set.sp.speed === 0) {
      score += 15;
    }
    
    // Prefer protect on most mons (VGC staple)
    if (set.moves.includes("Protect")) score += 5;
    
    // Prefer Fake Out if team lacks it
    if (set.moves.includes("Fake Out") &&
        !teamContext.some(p => p.moves.some(m => m.name === "Fake Out"))) {
      score += 10;
    }
    
    // Prefer Intimidate if team lacks it
    if (set.ability === "Intimidate" &&
        !teamContext.some(p => p.abilities.some(a => a.name === "Intimidate"))) {
      score += 10;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestSet = set;
    }
  }
  
  return bestSet;
}

// ── TEAM GENERATION ──────────────────────────────────────────────────────────

export interface GeneratedTeam {
  name: string;
  archetype: string;
  pokemon: ChampionsPokemon[];
  sets: CommonSet[];
  synergy: TeamSynergy;
  score: number;
}

/** Generate a team from an archetype template */
function generateFromTemplate(template: ArchetypeTemplate): GeneratedTeam | null {
  const team: ChampionsPokemon[] = [];
  const sets: CommonSet[] = [];
  
  // Add core Pokémon
  for (const id of template.coreIds) {
    const p = getPokemon(id);
    if (!p) return null;
    team.push(p);
    const set = getBestSet(id, team, sets);
    if (!set) return null;
    sets.push(set);
  }
  
  // Add flex Pokémon based on synergy
  const shuffledFlex = [...template.flexPool].sort(() => Math.random() - 0.5);
  
  for (const id of shuffledFlex) {
    if (team.length >= 6) break;
    if (team.some(p => p.id === id)) continue;
    
    const p = getPokemon(id);
    if (!p) continue;
    
    const fit = scorePokemonFit(p, team);
    if (fit.score >= 30) { // Only add if reasonable fit
      team.push(p);
      const set = getBestSet(id, team, sets);
      if (set) sets.push(set);
      else team.pop(); // Remove if no set available
    }
  }
  
  // Fill remaining slots with best-fitting Pokémon from entire roster
  if (team.length < 6) {
    const usedIds = new Set(team.map(p => p.id));
    const candidates = POKEMON_SEED
      .filter(p => !usedIds.has(p.id) && USAGE_DATA[p.id]?.length)
      .map(p => ({ pokemon: p, fit: scorePokemonFit(p, team) }))
      .sort((a, b) => b.fit.score - a.fit.score);
    
    for (const c of candidates) {
      if (team.length >= 6) break;
      team.push(c.pokemon);
      const set = getBestSet(c.pokemon.id, team, sets);
      if (set) sets.push(set);
      else team.pop();
    }
  }
  
  if (team.length < 4) return null; // Need at least 4
  
  // Analyze final synergy
  const synergy = analyzeTeamSynergy(team);
  
  return {
    name: template.name,
    archetype: template.name,
    pokemon: team,
    sets,
    synergy,
    score: synergy.overallScore,
  };
}

/** Generate a team by picking best Pokémon around a starter */
function generateAroundStarter(starterId: number): GeneratedTeam | null {
  const starter = getPokemon(starterId);
  if (!starter) return null;
  
  const team: ChampionsPokemon[] = [starter];
  const sets: CommonSet[] = [];
  const starterSet = getBestSet(starterId);
  if (!starterSet) return null;
  sets.push(starterSet);
  
  const usedIds = new Set([starterId]);
  
  // Greedily add best-fitting Pokémon
  for (let i = 0; i < 5; i++) {
    let bestFit: { pokemon: ChampionsPokemon; score: number } | null = null;
    
    for (const candidate of POKEMON_SEED) {
      if (usedIds.has(candidate.id)) continue;
      if (!USAGE_DATA[candidate.id]?.length) continue;
      
      const fit = scorePokemonFit(candidate, team);
      if (!bestFit || fit.score > bestFit.score) {
        bestFit = { pokemon: candidate, score: fit.score };
      }
    }
    
    if (bestFit) {
      team.push(bestFit.pokemon);
      usedIds.add(bestFit.pokemon.id);
      const set = getBestSet(bestFit.pokemon.id, team, sets);
      if (set) sets.push(set);
      else {
        team.pop();
        usedIds.delete(bestFit.pokemon.id);
      }
    }
  }
  
  const synergy = analyzeTeamSynergy(team);
  const starterName = starter.name;
  
  return {
    name: `${starterName} Build`,
    archetype: "custom",
    pokemon: team,
    sets,
    synergy,
    score: synergy.overallScore,
  };
}

/** Generate multiple teams from all archetypes and pick the best */
export function generateTeams(count: number = 50): GeneratedTeam[] {
  const allTeams: GeneratedTeam[] = [];
  
  // Generate from each archetype template (with randomness for variety)
  for (const template of ARCHETYPE_TEMPLATES) {
    for (let variant = 0; variant < 3; variant++) {
      const team = generateFromTemplate(template);
      if (team && team.pokemon.length >= 6) {
        allTeams.push(team);
      }
    }
  }
  
  // Generate teams around top-tier starters
  const topTierIds = POKEMON_SEED
    .filter(p => (p.tier === "S" || p.tier === "A") && USAGE_DATA[p.id]?.length)
    .map(p => p.id);
  
  for (const id of topTierIds) {
    const team = generateAroundStarter(id);
    if (team && team.pokemon.length >= 6) {
      allTeams.push(team);
    }
  }
  
  // Deduplicate (same 6 Pokémon in any order)
  const seen = new Set<string>();
  const unique = allTeams.filter(t => {
    const key = t.pokemon.map(p => p.id).sort((a, b) => a - b).join(",");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  
  // Sort by score and return top N
  unique.sort((a, b) => b.score - a.score);
  return unique.slice(0, count);
}

/** Generate suggested teams that include a specific Pokémon */
export function generateTeamsWithPokemon(
  pokemonId: number,
  count: number = 10
): GeneratedTeam[] {
  const allTeams: GeneratedTeam[] = [];
  
  // Use archetype templates that include this Pokémon
  for (const template of ARCHETYPE_TEMPLATES) {
    if (template.coreIds.includes(pokemonId) || template.flexPool.includes(pokemonId)) {
      // Force this Pokémon into the core
      const modified = {
        ...template,
        coreIds: template.coreIds.includes(pokemonId)
          ? template.coreIds
          : [pokemonId, ...template.coreIds],
      };
      for (let v = 0; v < 2; v++) {
        const team = generateFromTemplate(modified);
        if (team && team.pokemon.length >= 6) {
          allTeams.push(team);
        }
      }
    }
  }
  
  // Also generate a custom build around this starter
  for (let v = 0; v < 3; v++) {
    const team = generateAroundStarter(pokemonId);
    if (team && team.pokemon.length >= 6) {
      allTeams.push(team);
    }
  }
  
  // Deduplicate
  const seen = new Set<string>();
  const unique = allTeams.filter(t => {
    const key = t.pokemon.map(p => p.id).sort((a, b) => a - b).join(",");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  
  unique.sort((a, b) => b.score - a.score);
  return unique.slice(0, count);
}

/** Get all archetype template names for UI display */
export function getArchetypeNames(): string[] {
  return ARCHETYPE_TEMPLATES.map(t => t.name);
}

/** Generate a team from a specific archetype by name */
export function generateFromArchetype(archetypeName: string): GeneratedTeam | null {
  const template = ARCHETYPE_TEMPLATES.find(t => t.name === archetypeName);
  if (!template) return null;
  return generateFromTemplate(template);
}

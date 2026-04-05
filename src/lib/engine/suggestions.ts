// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - REAL-TIME SUGGESTION ENGINE
// Provides contextual suggestions for team building:
//   - Recommended teammates
//   - Best moves, ability, nature, SP distribution for each slot
//   - Team analysis with strengths/weaknesses
// ═══════════════════════════════════════════════════════════════════════════════

import type { ChampionsPokemon, CommonSet, PokemonType, StatPoints } from "@/lib/types";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import { USAGE_DATA } from "@/lib/usage-data";
import {
  analyzeTeamSynergy, scorePokemonFit, identifyRoles,
  type TeamSynergy, type PokemonRole
} from "./synergy";
import { getWeaknesses, getResistances, getImmunities, offensiveCoverage } from "./type-chart";
import { calculateStats } from "./stat-calc";
import type { NatureName } from "./natures";
import { suggestNature } from "./natures";

// ── TEAMMATE SUGGESTIONS ────────────────────────────────────────────────────

export interface TeammateSuggestion {
  pokemon: ChampionsPokemon;
  score: number;
  reasons: string[];
  fills: string[];
  overlaps: string[];
}

/** Get recommended teammates ranked by synergy fit score */
export function suggestTeammates(
  existingTeam: ChampionsPokemon[],
  count: number = 12
): TeammateSuggestion[] {
  const usedIds = new Set(existingTeam.map(p => p.id));
  
  const suggestions = POKEMON_SEED
    .filter(p => !usedIds.has(p.id) && USAGE_DATA[p.id]?.length)
    .map(p => {
      const fit = scorePokemonFit(p, existingTeam);
      return {
        pokemon: p,
        score: fit.score,
        reasons: fit.reasons,
        fills: fit.fills,
        overlaps: fit.overlaps,
      };
    })
    .sort((a, b) => b.score - a.score);
  
  return suggestions.slice(0, count);
}

// ── SET SUGGESTIONS ──────────────────────────────────────────────────────────

export interface SetSuggestion {
  set: CommonSet;
  reason: string;
  matchScore: number; // 0-100 how well this set fits the team context
}

/** Suggest the best competitive sets for a Pokémon given team context */
export function suggestSets(
  pokemon: ChampionsPokemon,
  teamContext: ChampionsPokemon[]
): SetSuggestion[] {
  const sets = USAGE_DATA[pokemon.id];
  if (!sets || sets.length === 0) return [];
  
  // Analyze team context
  const teamHasWeather = teamContext.some(p =>
    p.abilities.some(a =>
      ["Drought", "Drizzle", "Sand Stream", "Snow Warning"].includes(a.name)
    )
  );
  const teamHasTrickRoom = teamContext.some(p =>
    p.moves.some(m => m.name === "Trick Room")
  );
  const teamHasTailwind = teamContext.some(p =>
    p.moves.some(m => m.name === "Tailwind")
  );
  const teamHasFakeOut = teamContext.some(p =>
    p.moves.some(m => m.name === "Fake Out")
  );
  const teamHasIntimidate = teamContext.some(p =>
    p.abilities.some(a => a.name === "Intimidate")
  );
  const weatherType = teamContext.find(p =>
    p.abilities.some(a => a.name === "Drought")
  ) ? "sun" : teamContext.find(p =>
    p.abilities.some(a => a.name === "Drizzle")
  ) ? "rain" : teamContext.find(p =>
    p.abilities.some(a => a.name === "Sand Stream")
  ) ? "sand" : null;
  
  return sets.map(set => {
    let score = 50;
    const reasons: string[] = [];
    
    // Weather synergy
    if (weatherType === "sun" && (set.ability === "Chlorophyll" || set.ability === "Solar Power")) {
      score += 25;
      reasons.push("Synergizes with team's sun");
    }
    if (weatherType === "rain" && (set.ability === "Swift Swim" || set.ability === "Rain Dish")) {
      score += 25;
      reasons.push("Synergizes with team's rain");
    }
    if (weatherType === "sand" && (set.ability === "Sand Rush" || set.ability === "Sand Force")) {
      score += 25;
      reasons.push("Synergizes with team's sand");
    }
    
    // Trick Room synergy
    if (teamHasTrickRoom && set.sp.speed === 0) {
      score += 15;
      reasons.push("Slow for Trick Room");
    }
    if (teamHasTrickRoom && set.sp.speed >= 30) {
      score -= 10;
      reasons.push("Too fast for Trick Room");
    }
    
    // Fake Out value
    if (!teamHasFakeOut && set.moves.includes("Fake Out")) {
      score += 10;
      reasons.push("Adds Fake Out support");
    }
    
    // Intimidate value
    if (!teamHasIntimidate && set.ability === "Intimidate") {
      score += 10;
      reasons.push("Adds Intimidate");
    }
    
    // Protect is almost always good in VGC
    if (set.moves.includes("Protect")) score += 3;
    
    // Coverage diversity
    if (set.moves.length >= 4) score += 2;
    
    return {
      set,
      reason: reasons.join(". ") || set.name,
      matchScore: Math.max(0, Math.min(100, score)),
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// ── MOVE SUGGESTIONS ─────────────────────────────────────────────────────────

export interface MoveSuggestion {
  name: string;
  score: number;
  reason: string;
}

/** Suggest the best moves for a Pokémon on this team */
export function suggestMoves(
  pokemon: ChampionsPokemon,
  teamContext: ChampionsPokemon[]
): MoveSuggestion[] {
  // Get all moves used across competitive sets
  const moveScores = new Map<string, { count: number; reasons: string[] }>();
  
  const sets = USAGE_DATA[pokemon.id] || [];
  
  // Count move frequency across sets
  for (const set of sets) {
    for (const move of set.moves) {
      const existing = moveScores.get(move) || { count: 0, reasons: [] };
      existing.count++;
      moveScores.set(move, existing);
    }
  }
  
  // Also include moves from pokemon's move pool
  for (const move of pokemon.moves) {
    if (!moveScores.has(move.name)) {
      moveScores.set(move.name, { count: 0, reasons: [] });
    }
  }
  
  // Score each move
  const suggestions: MoveSuggestion[] = [];
  
  // Check what the team needs
  const teamWeaknesses = new Set<PokemonType>();
  for (const p of teamContext) {
    for (const w of getWeaknesses(p.types)) teamWeaknesses.add(w);
  }
  
  const teamMoveTypes = new Set<PokemonType>();
  for (const p of teamContext) {
    for (const m of p.moves) teamMoveTypes.add(m.type);
  }
  
  for (const [moveName, data] of moveScores) {
    let score = data.count * 15; // Base from usage frequency
    const reasons: string[] = [];
    
    // STAB bonus
    const moveData = pokemon.moves.find(m => m.name === moveName);
    if (moveData && pokemon.types.includes(moveData.type)) {
      score += 10;
      reasons.push("STAB");
    }
    
    // Coverage bonus (hits team weaknesses super-effectively)
    if (moveData) {
      const moveType = moveData.type;
      if (!teamMoveTypes.has(moveType)) {
        score += 5;
        reasons.push("New type coverage");
      }
    }
    
    // Protect is crucial in VGC
    if (moveName === "Protect") {
      score += 25;
      reasons.push("Essential VGC move");
    }
    
    // Speed control moves
    if (["Tailwind", "Trick Room", "Icy Wind", "Electroweb"].includes(moveName)) {
      const hasSpeedControl = teamContext.some(p =>
        p.moves.some(m => ["Tailwind", "Trick Room", "Icy Wind", "Electroweb"].includes(m.name))
      );
      if (!hasSpeedControl) {
        score += 15;
        reasons.push("Team needs speed control");
      }
    }
    
    // Fake Out
    if (moveName === "Fake Out") {
      score += 12;
      reasons.push("Disruption");
    }
    
    // Priority moves bonus
    if (["Extreme Speed", "Quick Attack", "Aqua Jet", "Bullet Punch", "Mach Punch", "Shadow Sneak", "Sucker Punch", "Grassy Glide"].includes(moveName)) {
      score += 8;
      reasons.push("Priority");
    }
    
    suggestions.push({
      name: moveName,
      score: Math.min(100, score),
      reason: reasons.join(", ") || "Viable option",
    });
  }
  
  suggestions.sort((a, b) => b.score - a.score);
  return suggestions.slice(0, 12);
}

// ── ABILITY SUGGESTIONS ──────────────────────────────────────────────────────

export interface AbilitySuggestion {
  name: string;
  score: number;
  reason: string;
}

/** Suggest the best ability for a Pokémon on this team */
export function suggestAbilities(
  pokemon: ChampionsPokemon,
  teamContext: ChampionsPokemon[]
): AbilitySuggestion[] {
  const abilityScores: AbilitySuggestion[] = [];
  
  // Count ability frequency across competitive sets
  const abilityUsage = new Map<string, number>();
  const sets = USAGE_DATA[pokemon.id] || [];
  for (const set of sets) {
    abilityUsage.set(set.ability, (abilityUsage.get(set.ability) || 0) + 1);
  }
  
  const teamHasIntim = teamContext.some(p =>
    p.abilities.some(a => a.name === "Intimidate")
  );
  const hasWeather = teamContext.some(p =>
    p.abilities.some(a =>
      ["Drought", "Drizzle", "Sand Stream", "Snow Warning"].includes(a.name)
    )
  );
  
  for (const ability of pokemon.abilities) {
    let score = (abilityUsage.get(ability.name) || 0) * 20;
    const reasons: string[] = [];
    
    // Intimidate is king in VGC
    if (ability.name === "Intimidate") {
      score += teamHasIntim ? 10 : 30;
      reasons.push(teamHasIntim ? "Intimidate cycle" : "Key VGC ability");
    }
    
    // Weather abilities
    if (["Drought", "Drizzle", "Sand Stream", "Snow Warning"].includes(ability.name)) {
      score += 20;
      reasons.push("Weather setter");
    }
    
    // Weather sweeper abilities
    if (["Chlorophyll", "Swift Swim", "Sand Rush", "Solar Power"].includes(ability.name) && hasWeather) {
      score += 25;
      reasons.push("Weather synergy");
    }
    
    // Competitive/Defiant (anti-Intimidate)
    if (["Competitive", "Defiant"].includes(ability.name)) {
      score += 15;
      reasons.push("Anti-Intimidate");
    }
    
    // Prankster
    if (ability.name === "Prankster") {
      score += 15;
      reasons.push("Priority status");
    }
    
    // Intimidate immunity
    if (["Inner Focus", "Clear Body", "Oblivious"].includes(ability.name)) {
      score += 5;
      reasons.push("Intimidate immune");
    }
    
    abilityScores.push({
      name: ability.name,
      score: Math.min(100, score),
      reason: reasons.join(", ") || ability.name,
    });
  }
  
  abilityScores.sort((a, b) => b.score - a.score);
  return abilityScores;
}

// ── NATURE & SP SUGGESTIONS ─────────────────────────────────────────────────

export interface NatureSuggestion {
  nature: string;
  reason: string;
}

export interface SPSuggestion {
  sp: StatPoints;
  focus: string;
  reason: string;
}

/** Suggest the best nature for a Pokémon */
export function suggestBestNature(
  pokemon: ChampionsPokemon,
  teamContext: ChampionsPokemon[]
): NatureSuggestion {
  // Most common nature from usage data
  const sets = USAGE_DATA[pokemon.id] || [];
  if (sets.length > 0) {
    const natureCounts = new Map<string, number>();
    for (const set of sets) {
      natureCounts.set(set.nature, (natureCounts.get(set.nature) || 0) + 1);
    }
    let bestNature = sets[0].nature;
    let bestCount = 0;
    for (const [nature, count] of natureCounts) {
      if (count > bestCount) {
        bestCount = count;
        bestNature = nature;
      }
    }
    
    return {
      nature: bestNature,
      reason: `Most used competitively (${Math.round(bestCount / sets.length * 100)}%)`,
    };
  }
  
  // Fallback: use stat-based suggestion
  const category = pokemon.baseStats.attack >= pokemon.baseStats.spAtk ? "physical" : "special";
  const spRecord: Record<string, number> = { ...pokemon.baseStats };
  const suggested = suggestNature(spRecord, category);
  return { nature: suggested, reason: "Based on base stats" };
}

/** Suggest the best SP distribution */
export function suggestSPDistribution(
  pokemon: ChampionsPokemon,
  teamContext: ChampionsPokemon[]
): SPSuggestion {
  // Most common SP from usage data
  const sets = USAGE_DATA[pokemon.id] || [];
  if (sets.length > 0) {
    // Return the first (most common) set's SP
    const best = sets[0];
    const focus = best.sp.speed >= 30
      ? "Speed + Offense"
      : best.sp.hp >= 30
        ? "Bulk"
        : "Balanced";
    return {
      sp: best.sp,
      focus,
      reason: `From ${best.name} build`,
    };
  }
  
  // Fallback: simple stat-based distribution
  const stats = pokemon.baseStats;
  const sp: StatPoints = { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };
  
  if (stats.attack >= stats.spAtk) {
    sp.attack = 32;
    sp.speed = 32;
    sp.defense = 2;
  } else {
    sp.spAtk = 32;
    sp.speed = 32;
    sp.defense = 2;
  }
  
  return {
    sp,
    focus: "Offensive",
    reason: "Default offensive spread",
  };
}

// ── FULL SLOT SUGGESTION ─────────────────────────────────────────────────────

export interface SlotSuggestion {
  bestSet: CommonSet | null;
  altSets: SetSuggestion[];
  suggestedMoves: MoveSuggestion[];
  suggestedAbilities: AbilitySuggestion[];
  suggestedNature: NatureSuggestion;
  suggestedSP: SPSuggestion;
  role: PokemonRole;
}

/** Get full suggestions for a Pokémon slot in the context of a team */
export function getSlotSuggestions(
  pokemon: ChampionsPokemon,
  teamContext: ChampionsPokemon[]
): SlotSuggestion {
  const altSets = suggestSets(pokemon, teamContext);
  
  return {
    bestSet: altSets[0]?.set ?? null,
    altSets,
    suggestedMoves: suggestMoves(pokemon, teamContext),
    suggestedAbilities: suggestAbilities(pokemon, teamContext),
    suggestedNature: suggestBestNature(pokemon, teamContext),
    suggestedSP: suggestSPDistribution(pokemon, teamContext),
    role: identifyRoles(pokemon),
  };
}

// ── TEAM ANALYSIS ────────────────────────────────────────────────────────────

export interface TeamAnalysis {
  synergy: TeamSynergy;
  suggestions: TeammateSuggestion[];
  missingRoles: string[];
  criticalWeaknesses: PokemonType[];
  threatAnalysis: string[];
  overallRating: string;
}

/** Analyze an in-progress team and provide actionable feedback */
export function analyzePartialTeam(
  teamPokemon: ChampionsPokemon[]
): TeamAnalysis {
  if (teamPokemon.length === 0) {
    return {
      synergy: {
        overallScore: 0, typeScore: 0, speedScore: 0, roleScore: 0, archetypeScore: 0,
        weaknessProfile: [], resistanceProfile: [], uncoveredTypes: [],
        speedTiers: [], detectedArchetypes: [], roles: [],
        strengths: [], weaknesses: [], suggestions: ["Add your first Pokémon to get started!"],
      },
      suggestions: suggestTeammates([], 8),
      missingRoles: [],
      criticalWeaknesses: [],
      threatAnalysis: [],
      overallRating: "Empty",
    };
  }
  
  const synergy = analyzeTeamSynergy(teamPokemon);
  const suggestions = suggestTeammates(teamPokemon, 8);
  
  // Missing roles
  const existingRoles = new Set(synergy.roles.flatMap(r => r.roles));
  const criticalRoles = ["speed-control", "support", "physical-sweeper", "special-sweeper"];
  const existingRoleStrings = new Set([...existingRoles].map(String));
  const missingRoles = criticalRoles.filter(r => !existingRoleStrings.has(r));
  
  // Critical weaknesses (3+ team members weak to same type, accounting for resists/immunities)
  const resistMap = new Map(synergy.resistanceProfile.map(r => [r.type, r.count]));
  const criticalWeaknesses = synergy.weaknessProfile
    .filter(w => {
      const resists = resistMap.get(w.type) ?? 0;
      // Only critical if net weakness (weak count minus resist count) is 3+
      return (w.count - resists) >= 3;
    })
    .map(w => w.type);
  
  // Threat analysis
  const threatAnalysis: string[] = [];
  if (criticalWeaknesses.length > 0) {
    threatAnalysis.push(`Critical weakness to ${criticalWeaknesses.join(", ")} - consider adding resistances`);
  }
  if (!existingRoles.has("speed-control")) {
    threatAnalysis.push("No speed control - add Tailwind or Trick Room user");
  }
  if (!existingRoles.has("intimidate-user") && teamPokemon.length >= 3) {
    threatAnalysis.push("No Intimidate - consider adding an Intimidate user");
  }
  if (synergy.uncoveredTypes.length > 3) {
    threatAnalysis.push(`Poor coverage - no super effective hits vs ${synergy.uncoveredTypes.slice(0, 3).join(", ")}`);
  }
  
  // Overall rating
  let rating: string;
  if (teamPokemon.length < 4) {
    rating = "In Progress";
  } else if (synergy.overallScore >= 80) {
    rating = "Excellent";
  } else if (synergy.overallScore >= 65) {
    rating = "Strong";
  } else if (synergy.overallScore >= 50) {
    rating = "Decent";
  } else if (synergy.overallScore >= 35) {
    rating = "Needs Work";
  } else {
    rating = "Weak";
  }
  
  return {
    synergy,
    suggestions,
    missingRoles,
    criticalWeaknesses,
    threatAnalysis,
    overallRating: rating,
  };
}

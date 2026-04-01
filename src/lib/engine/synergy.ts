// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC SYNERGY & ARCHETYPE ANALYSIS ENGINE
// Team composition intelligence: synergy scoring, archetype detection,
// role classification, speed tier analysis, threat coverage
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType, ChampionsPokemon, BaseStats } from "@/lib/types";
import {
  getWeaknesses, getResistances, getImmunities,
  defensiveSynergy, offensiveCoverage, getMatchup, getAllTypes,
} from "./type-chart";
import { getBST, classifyStatProfile, calculateStats, getEffectiveSpeed } from "./stat-calc";
import { getAbilityEffect, isWeatherSetter, isIntimidateImmune, getTypeImmunity } from "./ability-data";
import { MOVE_DATA, getMoveRole } from "./move-data";
import type { NatureName } from "./natures";

// ── TEAM ARCHETYPES ──────────────────────────────────────────────────────────

export type TeamArchetype =
  | "rain"           // Drizzle + Swift Swim sweepers
  | "sun"            // Drought + Chlorophyll sweepers
  | "sand"           // Sand Stream + Sand Rush/Force sweepers
  | "snow"           // Snow Warning + Slush Rush  
  | "trick-room"     // Trick Room setter + slow powerhouses
  | "tailwind"       // Tailwind setter + moderate speed attackers
  | "hyper-offense"  // Max offense, Fake Out + setup
  | "bulky-offense"  // Tanky attackers with recovery
  | "balance"        // Well-rounded composition
  | "hard-trick-room"// Full Trick Room with multiple setters
  | "goodstuffs"     // Top-tier individual Pokémon with general synergy
  | "semi-trick-room"// Flexible mode with TR option
  | "beat-up"        // Beat Up + Justified/Weakness Policy combo
  | "perish-trap";   // Perish Song + Shadow Tag/trapping

export interface ArchetypeProfile {
  archetype: TeamArchetype;
  confidence: number;    // 0-1 how strongly this matches
  description: string;
  keyPokemon: string[];  // Pokémon that define this archetype
}

// ── TEAM ROLES ───────────────────────────────────────────────────────────────

export type TeamRole =
  | "weather-setter"
  | "weather-sweeper"
  | "speed-control"     // Tailwind/Icy Wind/Electroweb user
  | "trick-room-setter"
  | "trick-room-abuser"
  | "physical-sweeper"
  | "special-sweeper"
  | "mixed-attacker"
  | "physical-wall"
  | "special-wall"
  | "support"           // Fake Out, redirect, screens
  | "pivot"             // U-turn/Volt Switch
  | "redirector"        // Follow Me / Rage Powder
  | "intimidate-user"
  | "setup-sweeper"
  | "lead"
  | "restricted";       // Mega / Legendary

export interface PokemonRole {
  pokemonName: string;
  pokemonId: number;
  roles: TeamRole[];
  primaryRole: TeamRole;
  vgcViability: number; // 0-10
}

// ── SYNERGY ANALYSIS ────────────────────────────────────────────────────────

export interface TeamSynergy {
  overallScore: number;            // 0-100
  typeScore: number;               // 0-100 (offensive + defensive coverage)
  speedScore: number;              // 0-100 (speed control options)
  roleScore: number;               // 0-100 (role diversity)
  archetypeScore: number;          // 0-100 (archetype coherence)
  weaknessProfile: { type: PokemonType; count: number }[];
  resistanceProfile: { type: PokemonType; count: number }[];
  uncoveredTypes: PokemonType[];   // Types not hit super-effectively
  speedTiers: { name: string; speed: number; tier: string }[];
  detectedArchetypes: ArchetypeProfile[];
  roles: PokemonRole[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

/** Identify VGC roles for a Pokémon based on its stats, abilities, and moves */
export function identifyRoles(pokemon: ChampionsPokemon): PokemonRole {
  const roles: TeamRole[] = [];
  const profile = classifyStatProfile(pokemon.baseStats);
  const abilities = pokemon.abilities.map(a => a.name);
  const moveNames = pokemon.moves.map(m => m.name);

  // Weather setter
  if (abilities.some(a => isWeatherSetter(a))) {
    roles.push("weather-setter");
  }

  // Intimidate user
  if (abilities.includes("Intimidate")) {
    roles.push("intimidate-user");
  }

  // Speed control
  const hasSpeedControl = moveNames.some(m =>
    m === "Tailwind" || m === "Icy Wind" || m === "Electroweb" || m === "Thunder Wave"
  );
  if (hasSpeedControl) roles.push("speed-control");

  // Trick Room setter
  if (moveNames.includes("Trick Room")) {
    roles.push("trick-room-setter");
  }

  // Trick Room abuser (slow + powerful)
  if (pokemon.baseStats.speed <= 55 && Math.max(pokemon.baseStats.attack, pokemon.baseStats.spAtk) >= 90) {
    roles.push("trick-room-abuser");
  }

  // Redirector
  if (moveNames.some(m => m === "Follow Me" || m === "Rage Powder")) {
    roles.push("redirector");
  }

  // Support (Fake Out, screens, etc.)
  if (moveNames.includes("Fake Out") || moveNames.includes("Helping Hand")) {
    roles.push("support");
  }

  // Pivot
  if (moveNames.some(m => m === "U-turn" || m === "Volt Switch")) {
    roles.push("pivot");
  }

  // Setup sweeper
  const hasSetup = moveNames.some(m =>
    ["Swords Dance", "Dragon Dance", "Nasty Plot", "Calm Mind",
     "Shell Smash", "Belly Drum", "Quiver Dance", "Bulk Up"].includes(m)
  );
  if (hasSetup) roles.push("setup-sweeper");

  // Weather sweeper
  if (abilities.some(a => ["Swift Swim", "Chlorophyll", "Sand Rush", "Slush Rush"].includes(a))) {
    roles.push("weather-sweeper");
  }

  // Mega / form restricted
  if (pokemon.hasMega) roles.push("restricted");

  // Sweepers based on stats
  if (profile.role === "physical-attacker" || profile.role === "fast-attacker") {
    if (pokemon.baseStats.attack >= pokemon.baseStats.spAtk) {
      roles.push("physical-sweeper");
    } else {
      roles.push("special-sweeper");
    }
  } else if (profile.role === "special-attacker") {
    roles.push("special-sweeper");
  } else if (profile.role === "mixed-attacker") {
    roles.push("mixed-attacker");
  } else if (profile.role === "physical-wall") {
    roles.push("physical-wall");
  } else if (profile.role === "special-wall") {
    roles.push("special-wall");
  }

  // Lead consideration
  if (moveNames.includes("Fake Out") || hasSpeedControl || pokemon.baseStats.speed >= 100) {
    roles.push("lead");
  }

  // Determine primary role
  const rolePriority: TeamRole[] = [
    "weather-setter", "trick-room-setter", "redirector", "intimidate-user",
    "speed-control", "support", "weather-sweeper", "setup-sweeper",
    "physical-sweeper", "special-sweeper", "mixed-attacker",
    "physical-wall", "special-wall", "pivot", "lead", "trick-room-abuser", "restricted",
  ];
  const primaryRole = rolePriority.find(r => roles.includes(r)) ?? "support";

  // VGC viability scoring
  let viability = 5;
  const bst = getBST(pokemon.baseStats);
  if (bst >= 600) viability += 2;
  else if (bst >= 530) viability += 1;
  if (pokemon.tier === "S") viability += 2;
  else if (pokemon.tier === "A") viability += 1;
  if (abilities.includes("Intimidate")) viability += 1;
  if (abilities.some(a => isWeatherSetter(a))) viability += 1;
  if (moveNames.includes("Fake Out")) viability += 0.5;
  if (moveNames.includes("Protect")) viability += 0.5;
  viability = Math.min(10, viability);

  return {
    pokemonName: pokemon.name,
    pokemonId: pokemon.id,
    roles: [...new Set(roles)],
    primaryRole,
    vgcViability: viability,
  };
}

/** Detect team archetype from a set of Pokémon */
export function detectArchetypes(pokemon: ChampionsPokemon[]): ArchetypeProfile[] {
  const archetypes: ArchetypeProfile[] = [];
  const allAbilities = pokemon.flatMap(p => p.abilities.map(a => a.name));
  const allMoves = pokemon.flatMap(p => p.moves.map(m => m.name));
  const avgSpeed = pokemon.reduce((s, p) => s + p.baseStats.speed, 0) / pokemon.length;
  const slowCount = pokemon.filter(p => p.baseStats.speed <= 55).length;

  // Rain
  if (allAbilities.includes("Drizzle") && allAbilities.includes("Swift Swim")) {
    const keyMon = pokemon.filter(p =>
      p.abilities.some(a => a.name === "Drizzle" || a.name === "Swift Swim")
    ).map(p => p.name);
    archetypes.push({
      archetype: "rain",
      confidence: 0.9,
      description: "Rain team with Drizzle setter and Swift Swim sweepers for speed dominance.",
      keyPokemon: keyMon,
    });
  }

  // Sun
  if (allAbilities.includes("Drought") && allAbilities.includes("Chlorophyll")) {
    const keyMon = pokemon.filter(p =>
      p.abilities.some(a => a.name === "Drought" || a.name === "Chlorophyll")
    ).map(p => p.name);
    archetypes.push({
      archetype: "sun",
      confidence: 0.9,
      description: "Sun team with Drought setter and Chlorophyll sweepers for offensive pressure.",
      keyPokemon: keyMon,
    });
  }

  // Sand
  if (allAbilities.includes("Sand Stream") && (allAbilities.includes("Sand Rush") || allAbilities.includes("Sand Force"))) {
    const keyMon = pokemon.filter(p =>
      p.abilities.some(a => ["Sand Stream", "Sand Rush", "Sand Force"].includes(a.name))
    ).map(p => p.name);
    archetypes.push({
      archetype: "sand",
      confidence: 0.85,
      description: "Sand team with Sand Stream and physical attackers boosted by sandstorm.",
      keyPokemon: keyMon,
    });
  }

  // Trick Room
  const trSetters = pokemon.filter(p => p.moves.some(m => m.name === "Trick Room"));
  if (trSetters.length >= 1 && slowCount >= 3) {
    archetypes.push({
      archetype: trSetters.length >= 2 ? "hard-trick-room" : "trick-room",
      confidence: trSetters.length >= 2 ? 0.95 : 0.7,
      description: trSetters.length >= 2
        ? "Dedicated Trick Room with multiple setters and slow powerhouses."
        : "Trick Room mode available with slow attackers to abuse reversed speed.",
      keyPokemon: [...trSetters.map(p => p.name), ...pokemon.filter(p => p.baseStats.speed <= 55).map(p => p.name)],
    });
  }

  // Semi Trick Room
  if (trSetters.length === 1 && slowCount >= 1 && slowCount <= 2) {
    archetypes.push({
      archetype: "semi-trick-room",
      confidence: 0.6,
      description: "Flexible team with Trick Room as an option for specific matchups.",
      keyPokemon: trSetters.map(p => p.name),
    });
  }

  // Tailwind
  const twUsers = pokemon.filter(p => p.moves.some(m => m.name === "Tailwind"));
  if (twUsers.length >= 1 && avgSpeed >= 75) {
    archetypes.push({
      archetype: "tailwind",
      confidence: twUsers.length >= 2 ? 0.85 : 0.65,
      description: "Tailwind-based speed control to let moderate-speed attackers outpace threats.",
      keyPokemon: twUsers.map(p => p.name),
    });
  }

  // Hyper Offense
  const offensiveMon = pokemon.filter(p =>
    Math.max(p.baseStats.attack, p.baseStats.spAtk) >= 100 && p.baseStats.speed >= 80
  );
  if (offensiveMon.length >= 4) {
    archetypes.push({
      archetype: "hyper-offense",
      confidence: 0.75,
      description: "All-out offense with fast, powerful attackers and minimal defensive play.",
      keyPokemon: offensiveMon.map(p => p.name),
    });
  }

  // Balance
  const hasWall = pokemon.some(p => p.baseStats.hp >= 90 && (p.baseStats.defense >= 90 || p.baseStats.spDef >= 90));
  const hasAttacker = pokemon.some(p => Math.max(p.baseStats.attack, p.baseStats.spAtk) >= 100);
  const hasSupport = pokemon.some(p => p.abilities.some(a => a.name === "Intimidate") || p.moves.some(m => m.name === "Fake Out"));
  if (hasWall && hasAttacker && hasSupport && archetypes.length === 0) {
    archetypes.push({
      archetype: "balance",
      confidence: 0.6,
      description: "Balanced team with offensive, defensive, and support options.",
      keyPokemon: pokemon.map(p => p.name),
    });
  }

  // Good Stuffs (fallback)
  if (archetypes.length === 0) {
    archetypes.push({
      archetype: "goodstuffs",
      confidence: 0.5,
      description: "Collection of individually strong Pokémon with general type synergy.",
      keyPokemon: pokemon.map(p => p.name),
    });
  }

  return archetypes.sort((a, b) => b.confidence - a.confidence);
}

/** Calculate comprehensive team synergy */
export function analyzeTeamSynergy(pokemon: ChampionsPokemon[]): TeamSynergy {
  if (pokemon.length === 0) {
    return {
      overallScore: 0, typeScore: 0, speedScore: 0, roleScore: 0, archetypeScore: 0,
      weaknessProfile: [], resistanceProfile: [], uncoveredTypes: getAllTypes(),
      speedTiers: [], detectedArchetypes: [], roles: [],
      strengths: [], weaknesses: ["No Pokémon selected"], suggestions: ["Add Pokémon to begin analysis"],
    };
  }

  // ── Type Analysis (ability-aware) ────────────────────────────────────
  const ABILITY_RESISTS: Record<string, string[]> = {
    "Thick Fat": ["fire", "ice"],
    "Heatproof": ["fire"],
    "Water Bubble": ["fire"],
    "Purifying Salt": ["ghost"],
  };
  const ABILITY_EXTRA_WEAK: Record<string, string[]> = {
    "Dry Skin": ["fire"],
    "Fluffy": ["fire"],
  };
  const weaknessCount: Record<string, number> = {};
  const resistCount: Record<string, number> = {};
  const allTypes = getAllTypes();

  for (const mon of pokemon) {
    const ability = mon.abilities[0]?.name || "";
    const abilityImmune = getTypeImmunity(ability);

    for (const w of getWeaknesses(mon.types)) {
      // Skip weakness if ability gives immunity to this type
      if (abilityImmune === w) continue;
      // Skip weakness if ability gives resistance that cancels it
      if (ABILITY_RESISTS[ability]?.includes(w)) continue;
      weaknessCount[w] = (weaknessCount[w] || 0) + 1;
    }
    // Add extra weaknesses from abilities (Dry Skin → Fire, Fluffy → Fire)
    if (ABILITY_EXTRA_WEAK[ability]) {
      for (const t of ABILITY_EXTRA_WEAK[ability]) {
        // Only add if not already counted as a type weakness
        if (!getWeaknesses(mon.types).includes(t as PokemonType)) {
          weaknessCount[t] = (weaknessCount[t] || 0) + 1;
        }
      }
    }
    for (const r of getResistances(mon.types)) {
      resistCount[r] = (resistCount[r] || 0) + 1;
    }
    for (const i of getImmunities(mon.types)) {
      resistCount[i] = (resistCount[i] || 0) + 2; // Immunities count extra
    }
    // Add ability-based immunities to resistance profile
    if (abilityImmune && !getImmunities(mon.types).includes(abilityImmune)) {
      resistCount[abilityImmune] = (resistCount[abilityImmune] || 0) + 2;
    }
    // Add ability-based resistances
    if (ABILITY_RESISTS[ability]) {
      for (const t of ABILITY_RESISTS[ability]) {
        if (!getResistances(mon.types).includes(t as PokemonType) && !getImmunities(mon.types).includes(t as PokemonType)) {
          resistCount[t] = (resistCount[t] || 0) + 1;
        }
      }
    }
  }

  const weaknessProfile = Object.entries(weaknessCount)
    .map(([type, count]) => ({ type: type as PokemonType, count }))
    .sort((a, b) => b.count - a.count);

  const resistanceProfile = Object.entries(resistCount)
    .map(([type, count]) => ({ type: type as PokemonType, count }))
    .sort((a, b) => b.count - a.count);

  // Offensive coverage (what types can we hit SE?)
  const moveTypes = new Set<PokemonType>();
  for (const mon of pokemon) {
    for (const move of mon.moves) {
      if (move.category !== "status") {
        moveTypes.add(move.type as PokemonType);
      }
    }
  }
  const coverage = offensiveCoverage([...moveTypes]);
  const uncoveredTypes = allTypes.filter(t => {
    return ![...moveTypes].some(mt => getMatchup(mt, [t]) >= 2);
  });

  // Defensive synergy between pairs
  let defensivePairScore = 0;
  let pairs = 0;
  for (let i = 0; i < pokemon.length; i++) {
    for (let j = i + 1; j < pokemon.length; j++) {
      defensivePairScore += defensiveSynergy(pokemon[i].types, pokemon[j].types);
      pairs++;
    }
  }
  const avgDefSynergy = pairs > 0 ? defensivePairScore / pairs : 0;

  // Weakness concentration penalty
  const maxWeakness = weaknessProfile.length > 0 ? weaknessProfile[0].count : 0;
  const weakConcentration = maxWeakness / Math.max(pokemon.length, 1);
  const typeScore = Math.round(
    (coverage * 40 + avgDefSynergy * 40 + (1 - weakConcentration * 0.5) * 20)
  );

  // ── Speed Analysis ─────────────────────────────────────────────────────
  const speedTiers = pokemon.map(p => ({
    name: p.name,
    speed: p.baseStats.speed,
    tier: p.baseStats.speed >= 100 ? "fast" : p.baseStats.speed >= 70 ? "medium" : "slow",
  })).sort((a, b) => b.speed - a.speed);

  const hasSpeedControl = pokemon.some(p =>
    p.moves.some(m => ["Tailwind", "Trick Room", "Icy Wind", "Thunder Wave", "Electroweb"].includes(m.name))
  );
  const hasFastMon = pokemon.some(p => p.baseStats.speed >= 100);
  const hasSlowMon = pokemon.some(p => p.baseStats.speed <= 55);
  const hasPriority = pokemon.some(p =>
    p.moves.some(m => {
      const md = MOVE_DATA[m.name];
      return md && md.priority > 0 && md.category !== "status";
    })
  );

  let speedScore = 30; // Base
  if (hasSpeedControl) speedScore += 30;
  if (hasFastMon) speedScore += 15;
  if (hasPriority) speedScore += 15;
  if (hasSlowMon && hasSpeedControl) speedScore += 10; // Modal flexibility
  speedScore = Math.min(100, speedScore);

  // ── Role Analysis ──────────────────────────────────────────────────────
  const roles = pokemon.map(p => identifyRoles(p));
  const allRoles = new Set(roles.flatMap(r => r.roles));

  let roleScore = 30;
  const essentialRoles: TeamRole[] = ["speed-control", "support", "physical-sweeper", "special-sweeper"];
  for (const er of essentialRoles) {
    if (allRoles.has(er)) roleScore += 12;
  }
  if (allRoles.has("intimidate-user")) roleScore += 8;
  if (allRoles.has("redirector")) roleScore += 5;
  if (allRoles.has("weather-setter")) roleScore += 5;
  roleScore = Math.min(100, roleScore);

  // ── Archetype Analysis ─────────────────────────────────────────────────
  const detectedArchetypes = detectArchetypes(pokemon);
  const archetypeScore = Math.round(
    detectedArchetypes.length > 0 ? detectedArchetypes[0].confidence * 100 : 40
  );

  // ── Overall Score ──────────────────────────────────────────────────────
  const overallScore = Math.round(
    typeScore * 0.35 + speedScore * 0.25 + roleScore * 0.25 + archetypeScore * 0.15
  );

  // ── Generate Insights ──────────────────────────────────────────────────
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  // Strengths
  if (coverage >= 0.7) strengths.push("Excellent offensive type coverage");
  if (avgDefSynergy >= 0.5) strengths.push("Strong defensive type synergy");
  if (hasSpeedControl) strengths.push("Has speed control options");
  if (allRoles.has("intimidate-user")) strengths.push("Intimidate support available");
  if (allRoles.has("redirector")) strengths.push("Has redirection support");
  if (hasPriority) strengths.push("Priority moves for endgame");
  if (detectedArchetypes[0]?.confidence >= 0.8) {
    strengths.push(`Clear ${detectedArchetypes[0].archetype} game plan`);
  }

  // Weaknesses
  if (weaknessProfile.length > 0 && weaknessProfile[0].count >= 3) {
    weaknesses.push(`${weaknessProfile[0].count} Pokémon weak to ${weaknessProfile[0].type}`);
  }
  if (!hasSpeedControl) weaknesses.push("No speed control - vulnerable to faster teams");
  if (!hasFastMon && !hasSpeedControl) weaknesses.push("Lacks fast options to pressure opponents");
  if (uncoveredTypes.length >= 4) {
    weaknesses.push(`Can't hit ${uncoveredTypes.slice(0, 3).join("/")} types super effectively`);
  }
  if (!allRoles.has("support")) weaknesses.push("No dedicated support Pokémon");
  if (!allRoles.has("intimidate-user")) weaknesses.push("No Intimidate to weaken physical attackers");

  // Suggestions
  if (!hasSpeedControl) suggestions.push("Add a Tailwind or Trick Room user for speed control");
  if (!allRoles.has("intimidate-user")) suggestions.push("Consider adding an Intimidate user (Incineroar, Gyarados)");
  if (uncoveredTypes.length > 3) {
    suggestions.push(`Add coverage for ${uncoveredTypes.slice(0, 2).join(" and ")} types`);
  }
  if (!hasPriority) suggestions.push("Add a priority move user for endgame situations");
  if (weaknessProfile.length > 0 && weaknessProfile[0].count >= 3) {
    suggestions.push(`Reduce ${weaknessProfile[0].type} weakness - consider a resist or immunity`);
  }
  if (pokemon.length < 6) suggestions.push(`Team needs ${6 - pokemon.length} more Pokémon`);

  return {
    overallScore, typeScore, speedScore, roleScore, archetypeScore,
    weaknessProfile, resistanceProfile, uncoveredTypes,
    speedTiers, detectedArchetypes, roles,
    strengths, weaknesses, suggestions,
  };
}

/** Score how well a potential addition synergizes with existing team */
export function scorePokemonFit(
  candidate: ChampionsPokemon,
  existingTeam: ChampionsPokemon[]
): {
  score: number;
  reasons: string[];
  fills: string[];     // What gaps this mon fills
  overlaps: string[];  // What it overlaps with
} {
  const reasons: string[] = [];
  const fills: string[] = [];
  const overlaps: string[] = [];
  let score = 50; // Neutral start

  if (existingTeam.length === 0) {
    return { score: 70, reasons: ["Strong starting pick"], fills: [], overlaps: [] };
  }

  // Type synergy with existing team
  const existingTypes = existingTeam.map(p => p.types);
  let synScore = 0;
  for (const et of existingTypes) {
    synScore += defensiveSynergy(candidate.types, et);
  }
  synScore /= existingTypes.length;
  score += Math.round(synScore * 20);
  if (synScore >= 0.5) {
    reasons.push("Great defensive type synergy");
    fills.push("Type balance");
  }

  // Does it cover team weaknesses?
  const teamWeaknesses = new Set<PokemonType>();
  for (const mon of existingTeam) {
    for (const w of getWeaknesses(mon.types)) teamWeaknesses.add(w);
  }
  const candidateResists = new Set([
    ...getResistances(candidate.types),
    ...getImmunities(candidate.types),
  ]);
  const covered = [...teamWeaknesses].filter(w => candidateResists.has(w));
  if (covered.length >= 2) {
    score += 10;
    reasons.push(`Covers ${covered.slice(0, 3).join("/")} weaknesses`);
    fills.push("Weakness coverage");
  }

  // Does it overlap weaknesses?
  const candidateWeaknesses = getWeaknesses(candidate.types);
  const sharedWeaknesses = candidateWeaknesses.filter(w =>
    existingTeam.some(p => getWeaknesses(p.types).includes(w))
  );
  if (sharedWeaknesses.length >= 2) {
    score -= 10;
    overlaps.push(`Shares ${sharedWeaknesses.slice(0, 2).join("/")} weaknesses`);
  }

  // Role analysis
  const existingRoles = new Set(existingTeam.flatMap(p => identifyRoles(p).roles));
  const candidateRoles = identifyRoles(candidate);

  // Fill missing roles
  const criticalMissing: TeamRole[] = ["speed-control", "intimidate-user", "support"];
  for (const cr of criticalMissing) {
    if (!existingRoles.has(cr) && candidateRoles.roles.includes(cr)) {
      score += 15;
      fills.push(cr.replace("-", " "));
      reasons.push(`Fills missing ${cr.replace("-", " ")} role`);
    }
  }

  // Role overlap penalty  
  if (candidateRoles.primaryRole === "physical-sweeper" &&
      existingTeam.filter(p => identifyRoles(p).primaryRole === "physical-sweeper").length >= 2) {
    score -= 10;
    overlaps.push("Too many physical sweepers");
  }

  // Speed diversity
  const speeds = existingTeam.map(p => p.baseStats.speed);
  const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
  if (candidate.baseStats.speed >= 100 && avgSpeed < 80) {
    score += 5;
    fills.push("Fast option");
  }
  if (candidate.baseStats.speed <= 50 && existingTeam.some(p => p.moves.some(m => m.name === "Trick Room"))) {
    score += 10;
    fills.push("Trick Room abuser");
  }

  // Tier bonus
  if (candidate.tier === "S") score += 5;
  else if (candidate.tier === "A") score += 3;

  return {
    score: Math.max(0, Math.min(100, score)),
    reasons,
    fills,
    overlaps,
  };
}

/** Get speed comparison for a team, showing who outspeeds whom on the roster */
export function getSpeedTierReport(
  pokemon: ChampionsPokemon[],
  nature: NatureName = "Jolly",
  maxSP: number = 32
): {
  name: string;
  baseSpeed: number;
  minSpeed: number;     // 0 SP, -Speed nature
  neutralSpeed: number; // 0 SP, neutral nature
  maxSpeed: number;     // Max SP, +Speed nature
  scarfSpeed: number;   // Max + Scarf
  tailwindSpeed: number;
}[] {
  return pokemon.map(p => {
    const base = p.baseStats.speed;
    return {
      name: p.name,
      baseSpeed: base,
      minSpeed: Math.floor(((2 * base + 31) * 50 / 100 + 5) * 0.9),
      neutralSpeed: Math.floor((2 * base + 31) * 50 / 100 + 5),
      maxSpeed: Math.floor(((2 * base + 31) * 50 / 100 + 5) * 1.1) + maxSP,
      scarfSpeed: Math.floor((Math.floor(((2 * base + 31) * 50 / 100 + 5) * 1.1) + maxSP) * 1.5),
      tailwindSpeed: (Math.floor(((2 * base + 31) * 50 / 100 + 5) * 1.1) + maxSP) * 2,
    };
  }).sort((a, b) => b.maxSpeed - a.maxSpeed);
}

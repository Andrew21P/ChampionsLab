// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC DAMAGE CALCULATOR
// Full Gen 9 damage formula adapted for Champions SP system
// Supports abilities, items, weather, terrain, crits, spread reduction
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType, BaseStats, StatPoints } from "@/lib/types";
import { getMatchup } from "./type-chart";
import { calculateStats, applyStatStage, type CalculatedStats } from "./stat-calc";
import { getItemDamageMultiplier } from "./items";
import { getMove, isSpreadMove, type EngineMove } from "./move-data";
import { getAbilityEffect } from "./ability-data";
import type { NatureName } from "./natures";

export interface DamageCalcPokemon {
  baseStats: BaseStats;
  sp: StatPoints;
  nature: NatureName;
  types: PokemonType[];
  ability: string;
  item: string;
  atkStages?: number;
  spAtkStages?: number;
  isBurned?: boolean;
  currentHPPercent?: number; // 0-100
}

export interface DamageCalcTarget {
  baseStats: BaseStats;
  sp: StatPoints;
  nature: NatureName;
  types: PokemonType[];
  ability: string;
  item: string;
  defStages?: number;
  spDefStages?: number;
}

export interface DamageCalcOptions {
  weather?: "sun" | "rain" | "sand" | "snow" | "none";
  terrain?: "electric" | "grassy" | "misty" | "psychic" | "none";
  isDoubles?: boolean;
  isCrit?: boolean;
  helpingHand?: boolean;
  lightScreen?: boolean;
  reflect?: boolean;
  auroraVeil?: boolean;
  friendGuard?: boolean;
}

export interface DamageResult {
  damage: [number, number];     // [min, max] damage values
  percentHP: [number, number];  // [min%, max%] of target's HP
  numHits: number;              // hits to KO (fractional for ranges)
  isOHKO: boolean;
  is2HKO: boolean;
  effectiveness: number;        // type effectiveness multiplier
  moveName: string;
}

/** Full Gen 9 damage formula */
export function calculateDamage(
  attacker: DamageCalcPokemon,
  defender: DamageCalcTarget,
  moveName: string,
  options: DamageCalcOptions = {}
): DamageResult {
  const move = getMove(moveName);
  if (!move || move.category === "status") {
    return {
      damage: [0, 0], percentHP: [0, 0], numHits: Infinity,
      isOHKO: false, is2HKO: false, effectiveness: 1, moveName,
    };
  }

  const atkStats = calculateStats(attacker.baseStats, attacker.sp, attacker.nature);
  const defStats = calculateStats(defender.baseStats, defender.sp, defender.nature);

  // Determine attacking and defending stats
  const isPhysical = move.category === "physical";
  const useDefense = isPhysical && move.name !== "Psyshock"; // Psyshock targets Def with SpA

  let atkStat: number;
  let defStat: number;

  if (move.name === "Body Press") {
    // Body Press uses Defense for attack
    atkStat = atkStats.defense;
  } else if (move.name === "Foul Play") {
    // Foul Play uses target's Attack
    atkStat = defStats.attack;
  } else {
    atkStat = isPhysical ? atkStats.attack : atkStats.spAtk;
  }

  defStat = useDefense ? defStats.defense : defStats.spDef;

  // Apply stat stages
  const atkStages = isPhysical ? (attacker.atkStages ?? 0) : (attacker.spAtkStages ?? 0);
  const defStages = useDefense ? (defender.defStages ?? 0) : (defender.spDefStages ?? 0);

  if (!options.isCrit || atkStages < 0) {
    atkStat = applyStatStage(atkStat, options.isCrit ? 0 : atkStages);
  } else {
    atkStat = applyStatStage(atkStat, atkStages);
  }

  if (!options.isCrit || defStages > 0) {
    defStat = applyStatStage(defStat, options.isCrit ? 0 : defStages);
  } else {
    defStat = applyStatStage(defStat, defStages);
  }

  // Base power
  let bp = move.basePower;
  if (bp === 0) {
    // Weight-based moves default to 80 BP (no weight data available)
    if (move.name === "Grass Knot" || move.name === "Low Kick") {
      bp = 80;
    } else {
      // Fixed damage moves like Super Fang, Counter, etc.
      return {
        damage: [Math.floor(defStats.hp / 2), Math.floor(defStats.hp / 2)],
        percentHP: [50, 50], numHits: 2,
        isOHKO: false, is2HKO: true, effectiveness: 1, moveName,
      };
    }
  }

  // Eruption/Water Spout scaling
  if (move.name === "Eruption" || move.name === "Water Spout") {
    const hpPct = (attacker.currentHPPercent ?? 100) / 100;
    bp = Math.max(1, Math.floor(150 * hpPct));
  }

  // Knock Off boost
  if (move.name === "Knock Off" && defender.item) {
    bp = Math.floor(bp * 1.5);
  }

  // Acrobatics boost (no item)
  if (move.name === "Acrobatics" && !attacker.item) {
    bp *= 2;
  }

  // Ability power boosts
  const atkAbility = getAbilityEffect(attacker.ability);
  if (atkAbility) {
    // Technician
    if (attacker.ability === "Technician" && bp <= 60) {
      bp = Math.floor(bp * 1.5);
    }
    // Sheer Force (moves with secondary effects)
    if (attacker.ability === "Sheer Force" && move.secondary) {
      bp = Math.floor(bp * 1.3);
    }
    // Iron Fist
    if (attacker.ability === "Iron Fist" && move.flags.punch) {
      bp = Math.floor(bp * 1.2);
    }
    // Reckless
    if (attacker.ability === "Reckless" && move.flags.recoil) {
      bp = Math.floor(bp * 1.2);
    }
    // Tough Claws
    if (attacker.ability === "Tough Claws" && move.flags.contact) {
      atkStat = Math.floor(atkStat * 1.33);
    }
    // Sharpness
    if (attacker.ability === "Sharpness" && move.flags.slicing) {
      bp = Math.floor(bp * 1.5);
    }
    // Sand Force in sand
    if (attacker.ability === "Sand Force" && options.weather === "sand" &&
        (move.type === "rock" || move.type === "ground" || move.type === "steel")) {
      bp = Math.floor(bp * 1.3);
    }
    // Solar Power in sun
    if (attacker.ability === "Solar Power" && options.weather === "sun" && !isPhysical) {
      atkStat = Math.floor(atkStat * 1.5);
    }
    // Guts when statused
    if (attacker.ability === "Guts" && attacker.isBurned) {
      atkStat = Math.floor(atkStat * 1.5);
    }
  }

  // STAB (Same Type Attack Bonus)
  const isStab = attacker.types.includes(move.type);
  let stabMult = 1;
  if (isStab) {
    stabMult = attacker.ability === "Adaptability" ? 2 : 1.5;
  }
  // Protean/Libero gives STAB on everything (once per switch)
  if (attacker.ability === "Protean") {
    stabMult = 1.5;
  }

  // Type effectiveness
  let effectiveness = getMatchup(move.type, defender.types);

  // Ability-based immunities
  const defAbility = getAbilityEffect(defender.ability);
  if (defAbility?.typeImmunity === move.type) {
    effectiveness = 0;
  }

  // Thick Fat halves Fire/Ice
  if (defender.ability === "Thick Fat" && (move.type === "fire" || move.type === "ice")) {
    effectiveness *= 0.5;
  }

  // Freeze-Dry is super effective against Water
  if (move.name === "Freeze-Dry" && defender.types.includes("water")) {
    effectiveness = defender.types.length === 1 ? 2 : effectiveness * 2;
  }

  if (effectiveness === 0) {
    return {
      damage: [0, 0], percentHP: [0, 0], numHits: Infinity,
      isOHKO: false, is2HKO: false, effectiveness: 0, moveName,
    };
  }

  // Weather modifiers
  // Mega Sol: all moves behave as if under harsh sunlight
  const effectiveWeather = attacker.ability === "Mega Sol" ? "sun" : options.weather;
  let weatherMult = 1;
  if (effectiveWeather === "sun" && move.type === "fire") weatherMult = 1.5;
  if (effectiveWeather === "sun" && move.type === "water") weatherMult = 0.5;
  if (effectiveWeather === "rain" && move.type === "water") weatherMult = 1.5;
  if (effectiveWeather === "rain" && move.type === "fire") weatherMult = 0.5;

  // Screen multipliers
  let screenMult = 1;
  if (options.auroraVeil || (options.reflect && isPhysical) || (options.lightScreen && !isPhysical)) {
    screenMult = options.isDoubles ? 2732 / 4096 : 0.5; // ~0.667 in doubles, 0.5 in singles
  }

  // Spread reduction in doubles
  let spreadMult = 1;
  if (options.isDoubles === true && isSpreadMove(move)) {
    spreadMult = 0.75;
  }

  // Critical hit
  const critMult = options.isCrit ? 1.5 : 1;

  // Burn (halves physical damage unless Guts)
  let burnMult = 1;
  if (attacker.isBurned && isPhysical && attacker.ability !== "Guts") {
    burnMult = 0.5;
  }

  // Item damage multiplier
  const isSE = effectiveness >= 2;
  const itemMult = getItemDamageMultiplier(attacker.item, move.type, move.category, isSE);

  // Helping Hand
  const helpingHandMult = options.helpingHand ? 1.5 : 1;

  // Friend Guard
  const friendGuardMult = options.friendGuard ? 0.75 : 1;

  // Assault Vest SpDef boost handled via stat modifiers
  if (defender.item === "Assault Vest" && !isPhysical) {
    defStat = Math.floor(defStat * 1.5);
  }

  // === THE DAMAGE FORMULA ===
  // Damage = ((2*Level/5 + 2) * Power * Atk/Def) / 50 + 2) * modifiers * roll
  const baseDamage = Math.floor(
    (Math.floor((2 * 50 / 5 + 2) * bp * atkStat / defStat) / 50 + 2)
  );

  // Apply all multipliers
  const modifiers = stabMult * effectiveness * weatherMult * screenMult *
    spreadMult * critMult * burnMult * itemMult * helpingHandMult * friendGuardMult;

  // Random roll is 0.85 to 1.00 (16 possible values)
  const minDamage = Math.max(1, Math.floor(baseDamage * modifiers * 0.85));
  const maxDamage = Math.max(1, Math.floor(baseDamage * modifiers));

  const targetHP = defStats.hp;
  const minPct = Math.round((minDamage / targetHP) * 1000) / 10;
  const maxPct = Math.round((maxDamage / targetHP) * 1000) / 10;

  // Calculate hits to KO
  const avgDamage = (minDamage + maxDamage) / 2;
  const numHits = Math.ceil(targetHP / avgDamage);

  return {
    damage: [minDamage, maxDamage],
    percentHP: [minPct, maxPct],
    numHits,
    isOHKO: minDamage >= targetHP,
    is2HKO: minDamage * 2 >= targetHP,
    effectiveness,
    moveName,
  };
}

/** Calculate the best move for attacker against defender */
export function getBestMove(
  attacker: DamageCalcPokemon,
  defender: DamageCalcTarget,
  moveNames: string[],
  options: DamageCalcOptions = {}
): DamageResult {
  let best: DamageResult | null = null;
  for (const mn of moveNames) {
    const result = calculateDamage(attacker, defender, mn, options);
    if (!best || result.damage[1] > best.damage[1]) {
      best = result;
    }
  }
  return best!;
}

/** Quick damage estimate without full calc (for team gen speed) */
export function estimateDamage(
  atkBase: number,
  defBase: number,
  bp: number,
  stab: boolean,
  effectiveness: number
): number {
  const stabMult = stab ? 1.5 : 1;
  return Math.floor(
    (Math.floor((22 * bp * (atkBase + 36) / (defBase + 36)) / 50 + 2)) * stabMult * effectiveness
  );
}

/** Formatted damage string for display */
export function formatDamageResult(result: DamageResult): string {
  if (result.effectiveness === 0) return "Immune";
  const pct = `${result.percentHP[0]}% - ${result.percentHP[1]}%`;
  const hits = result.isOHKO ? "OHKO" : result.is2HKO ? "2HKO" : `${result.numHits}HKO`;
  return `${result.damage[0]}-${result.damage[1]} (${pct}) - ${hits}`;
}

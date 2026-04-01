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
  const moveOriginal = getMove(moveName);
  if (!moveOriginal || moveOriginal.category === "status") {
    return {
      damage: [0, 0], percentHP: [0, 0], numHits: Infinity,
      isOHKO: false, is2HKO: false, effectiveness: 1, moveName,
    };
  }

  // Liquid Voice: sound-based moves become Water-type
  const move = attacker.ability === "Liquid Voice" && moveOriginal.flags.sound
    ? { ...moveOriginal, type: "water" as PokemonType }
    : moveOriginal;

  // Permafrost Fist: punching moves become Ice-type
  const moveEffective = attacker.ability === "Permafrost Fist" && move.flags.punch
    ? { ...move, type: "ice" as PokemonType }
    : move;

  // -ate abilities: Normal-type moves become the specified type and gain 20% power
  const ATE_ABILITIES: Record<string, PokemonType> = {
    Aerilate: "flying", Pixilate: "fairy", Refrigerate: "ice",
    Galvanize: "electric", Dragonize: "dragon",
  };
  const ateType = ATE_ABILITIES[attacker.ability];
  const moveCalc = ateType && moveEffective.type === "normal" && moveEffective.category !== "status"
    ? { ...moveEffective, type: ateType }
    : moveEffective;
  const ateBpBoost = ateType && moveEffective.type === "normal" && moveEffective.category !== "status";

  // Use the type-overridden move for all subsequent calculations

  const atkStats = calculateStats(attacker.baseStats, attacker.sp, attacker.nature);
  const defStats = calculateStats(defender.baseStats, defender.sp, defender.nature);

  // Determine attacking and defending stats
  const isPhysical = moveCalc.category === "physical";
  const useDefense = isPhysical && moveCalc.name !== "Psyshock"; // Psyshock targets Def with SpA

  let atkStat: number;
  let defStat: number;

  if (moveCalc.name === "Body Press") {
    // Body Press uses Defense for attack
    atkStat = atkStats.defense;
  } else if (moveCalc.name === "Foul Play") {
    // Foul Play uses target's Attack
    atkStat = defStats.attack;
  } else {
    atkStat = isPhysical ? atkStats.attack : atkStats.spAtk;
  }

  defStat = useDefense ? defStats.defense : defStats.spDef;

  // Snow: +50% Defense for Ice types
  if (options.weather === "snow" && defender.types.includes("ice") && useDefense) {
    defStat = Math.floor(defStat * 1.5);
  }
  // Sand: +50% SpDef for Rock types
  if (options.weather === "sand" && defender.types.includes("rock") && !useDefense) {
    defStat = Math.floor(defStat * 1.5);
  }

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

  // Bulletproof: immune to ball/bomb moves
  if (defender.ability === "Bulletproof" && moveCalc.flags.bullet) {
    return {
      damage: [0, 0], percentHP: [0, 0], numHits: Infinity,
      isOHKO: false, is2HKO: false, effectiveness: 0, moveName,
    };
  }

  // Base power
  let bp = moveCalc.basePower;
  if (bp === 0) {
    // Weight-based moves default to 80 BP (no weight data available)
    if (moveCalc.name === "Grass Knot" || moveCalc.name === "Low Kick") {
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
  if (moveCalc.name === "Eruption" || moveCalc.name === "Water Spout") {
    const hpPct = (attacker.currentHPPercent ?? 100) / 100;
    bp = Math.max(1, Math.floor(150 * hpPct));
  }

  // -ate ability BP boost (1.2x for Normal->type conversion)
  if (ateBpBoost) {
    bp = Math.floor(bp * 1.2);
  }

  // Knock Off boost
  if (moveCalc.name === "Knock Off" && defender.item) {
    bp = Math.floor(bp * 1.5);
  }

  // Acrobatics boost (no item)
  if (moveCalc.name === "Acrobatics" && !attacker.item) {
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
    if (attacker.ability === "Sheer Force" && moveCalc.secondary) {
      bp = Math.floor(bp * 1.3);
    }
    // Iron Fist
    if (attacker.ability === "Iron Fist" && moveCalc.flags.punch) {
      bp = Math.floor(bp * 1.2);
    }
    // Reckless
    if (attacker.ability === "Reckless" && moveCalc.flags.recoil) {
      bp = Math.floor(bp * 1.2);
    }
    // Tough Claws
    if (attacker.ability === "Tough Claws" && moveCalc.flags.contact) {
      atkStat = Math.floor(atkStat * 1.33);
    }
    // Sharpness
    if (attacker.ability === "Sharpness" && moveCalc.flags.slicing) {
      bp = Math.floor(bp * 1.5);
    }
    // Mega Launcher: pulse/aura moves get 50% boost
    if (attacker.ability === "Mega Launcher" && moveCalc.flags.pulse) {
      bp = Math.floor(bp * 1.5);
    }
    // Strong Jaw: biting moves get 50% boost
    if (attacker.ability === "Strong Jaw" && moveCalc.flags.bite) {
      bp = Math.floor(bp * 1.5);
    }
    // Permafrost Fist: punch moves get 30% boost (type already changed above)
    if (attacker.ability === "Permafrost Fist" && moveCalc.flags.punch) {
      bp = Math.floor(bp * 1.3);
    }
    // Sand Force in sand
    if (attacker.ability === "Sand Force" && options.weather === "sand" &&
        (moveCalc.type === "rock" || moveCalc.type === "ground" || moveCalc.type === "steel")) {
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
    // Blaze/Overgrow/Torrent/Swarm: 50% boost at ≤1/3 HP
    const hpPct = attacker.currentHPPercent ?? 100;
    if (attacker.ability === "Blaze" && moveCalc.type === "fire" && hpPct <= 33.3) {
      bp = Math.floor(bp * 1.5);
    }
    if (attacker.ability === "Overgrow" && moveCalc.type === "grass" && hpPct <= 33.3) {
      bp = Math.floor(bp * 1.5);
    }
    if (attacker.ability === "Torrent" && moveCalc.type === "water" && hpPct <= 33.3) {
      bp = Math.floor(bp * 1.5);
    }
    if (attacker.ability === "Swarm" && moveCalc.type === "bug" && hpPct <= 33.3) {
      bp = Math.floor(bp * 1.5);
    }
    // Analytic: 30% boost if moving last (simplified: always assume moving last)
    // In practice this is applied in battle-sim where turn order is known
  }

  // STAB (Same Type Attack Bonus)
  const isStab = attacker.types.includes(moveCalc.type);
  let stabMult = 1;
  if (isStab) {
    stabMult = attacker.ability === "Adaptability" ? 2 : 1.5;
  }
  // Protean/Libero gives STAB on everything (once per switch)
  if (attacker.ability === "Protean" || attacker.ability === "Libero") {
    stabMult = 1.5;
  }

  // Type effectiveness
  let effectiveness = getMatchup(moveCalc.type, defender.types);

  // Scrappy: Normal/Fighting moves hit Ghost types
  if (attacker.ability === "Scrappy" && effectiveness === 0 &&
      (moveCalc.type === "normal" || moveCalc.type === "fighting") &&
      defender.types.includes("ghost")) {
    effectiveness = 1;
    // Recalculate without Ghost immunity
    const nonGhostTypes = defender.types.filter(t => t !== "ghost");
    if (nonGhostTypes.length > 0) {
      effectiveness = getMatchup(moveCalc.type, nonGhostTypes);
    }
  }

  // Ability-based immunities
  const defAbility = getAbilityEffect(defender.ability);
  if (defAbility?.typeImmunity === moveCalc.type) {
    effectiveness = 0;
  }

  // Thick Fat halves Fire/Ice
  if (defender.ability === "Thick Fat" && (moveCalc.type === "fire" || moveCalc.type === "ice")) {
    effectiveness *= 0.5;
  }

  // Freeze-Dry is super effective against Water
  if (moveCalc.name === "Freeze-Dry" && defender.types.includes("water")) {
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
  if (effectiveWeather === "sun" && moveCalc.type === "fire") weatherMult = 1.5;
  if (effectiveWeather === "sun" && moveCalc.type === "water") weatherMult = 0.5;
  if (effectiveWeather === "rain" && moveCalc.type === "water") weatherMult = 1.5;
  if (effectiveWeather === "rain" && moveCalc.type === "fire") weatherMult = 0.5;

  // Screen multipliers
  let screenMult = 1;
  if (options.auroraVeil || (options.reflect && isPhysical) || (options.lightScreen && !isPhysical)) {
    screenMult = options.isDoubles ? 2732 / 4096 : 0.5; // ~0.667 in doubles, 0.5 in singles
  }

  // Spread reduction in doubles
  let spreadMult = 1;
  if (options.isDoubles === true && isSpreadMove(moveCalc)) {
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
  const itemMult = getItemDamageMultiplier(attacker.item, moveCalc.type, moveCalc.category, isSE);

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

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC DAMAGE CALCULATOR
// Full Gen 9 damage formula adapted for Champions SP system
// Supports abilities, items, weather, terrain, crits, spread reduction
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType, BaseStats, StatPoints } from "@/lib/types";
import { getMatchup } from "./type-chart";
import { calculateStats, applyStatStage } from "./stat-calc";
import { getItemDamageMultiplier } from "./items";
import { getMove, isSpreadMove, type EngineMove } from "./move-data";
import { getAbilityEffect } from "./ability-data";
import type { NatureName } from "./natures";

const CALC_LEVEL = 50;

const ATE_ABILITIES: Record<string, PokemonType> = {
  Aerilate: "flying",
  Pixilate: "fairy",
  Refrigerate: "ice",
  Galvanize: "electric",
  Dragonize: "dragon",
};

const WEATHER_BALL_TYPES: Record<"sun" | "rain" | "sand" | "snow", PokemonType> = {
  sun: "fire",
  rain: "water",
  sand: "rock",
  snow: "ice",
};

const LEVEL_BASED_FIXED_DAMAGE = new Set(["Seismic Toss", "Night Shade"]);
const HALF_HP_FIXED_DAMAGE = new Set(["Super Fang", "Nature's Madness", "Ruination"]);

export interface DamageCalcPokemon {
  baseStats: BaseStats;
  sp: StatPoints;
  nature: NatureName;
  types: PokemonType[];
  ability: string;
  item: string;
  atkStages?: number;
  spAtkStages?: number;
  hasStatus?: boolean;
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
  currentHPPercent?: number; // 0-100
}

export interface DamageCalcOptions {
  weather?: "sun" | "rain" | "sand" | "snow" | "none";
  terrain?: "electric" | "grassy" | "misty" | "psychic" | "none";
  isDoubles?: boolean;
  isCrit?: boolean;
  ignoreAttackerStatStages?: boolean;
  ignoreDefenderStatStages?: boolean;
  multiHitCount?: number;
  helpingHand?: boolean;
  lightScreen?: boolean;
  reflect?: boolean;
  auroraVeil?: boolean;
  friendGuard?: boolean;
}

export interface DamageRollModifierContext {
  attackerAbility: string;
  defenderAbility: string;
  effectiveness: number;
  defenderAtFullHP: boolean;
  isSpreadMove: boolean;
  piercedProtect?: boolean;
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

interface PreparedMove {
  move: EngineMove;
  ateBpBoost: boolean;
  effectiveWeather: DamageCalcOptions["weather"];
}

interface ResolvedCombatStats {
  atkStat: number;
  defStat: number;
  isPhysical: boolean;
}

interface TypeEffectivenessResult {
  typeEffectiveness: number;
  damageTypeMultiplier: number;
}

export function applyDamageRollModifiers(
  damage: number,
  context: DamageRollModifierContext
): number {
  let nextDamage = Math.max(1, damage);

  if (context.defenderAbility === "Prism Armor" && context.effectiveness >= 2) {
    nextDamage = Math.floor(nextDamage * 0.75);
  }

  if (
    (context.defenderAbility === "Multiscale" || context.defenderAbility === "Shadow Shield") &&
    context.defenderAtFullHP
  ) {
    nextDamage = Math.floor(nextDamage * 0.5);
  }

  if (context.piercedProtect) {
    nextDamage = Math.floor(nextDamage * 0.25);
  }

  if (context.attackerAbility === "Parental Bond" && !context.isSpreadMove) {
    const secondHit = Math.max(1, Math.floor(nextDamage * 0.25));
    nextDamage += secondHit;
  }

  return Math.max(1, nextDamage);
}

function emptyDamage(moveName: string, effectiveness: number = 1): DamageResult {
  return {
    damage: [0, 0],
    percentHP: [0, 0],
    numHits: Infinity,
    isOHKO: false,
    is2HKO: false,
    effectiveness,
    moveName,
  };
}

function toDamageResult(
  minDamage: number,
  maxDamage: number,
  targetHP: number,
  effectiveness: number,
  moveName: string
): DamageResult {
  const minPct = Math.round((minDamage / targetHP) * 1000) / 10;
  const maxPct = Math.round((maxDamage / targetHP) * 1000) / 10;
  const avgDamage = (minDamage + maxDamage) / 2;
  const numHits = avgDamage > 0 ? Math.ceil(targetHP / avgDamage) : Infinity;

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

function prepareMove(
  attacker: DamageCalcPokemon,
  moveOriginal: EngineMove,
  options: DamageCalcOptions
): PreparedMove {
  const effectiveWeather = attacker.ability === "Mega Sol" ? "sun" : options.weather;

  const moveWithAbilityType = attacker.ability === "Liquid Voice" && moveOriginal.flags.sound
    ? { ...moveOriginal, type: "water" as PokemonType }
    : attacker.ability === "Permafrost Fist" && moveOriginal.flags.punch
      ? { ...moveOriginal, type: "ice" as PokemonType }
      : moveOriginal;

  const moveWithWeatherBall = moveWithAbilityType.name === "Weather Ball"
    ? effectiveWeather && effectiveWeather !== "none"
      ? {
          ...moveWithAbilityType,
          type: WEATHER_BALL_TYPES[effectiveWeather as "sun" | "rain" | "sand" | "snow"],
          basePower: 100,
        }
      : { ...moveWithAbilityType, type: "normal" as PokemonType, basePower: 50 }
    : moveWithAbilityType;

  const ateType = ATE_ABILITIES[attacker.ability];
  const shouldApplyAte =
    !!ateType &&
    moveWithWeatherBall.type === "normal" &&
    moveWithWeatherBall.category !== "status";

  return {
    move: shouldApplyAte
      ? { ...moveWithWeatherBall, type: ateType }
      : moveWithWeatherBall,
    ateBpBoost: shouldApplyAte,
    effectiveWeather,
  };
}

function resolveCombatStats(
  attacker: DamageCalcPokemon,
  defender: DamageCalcTarget,
  move: EngineMove,
  options: DamageCalcOptions,
  atkStats: ReturnType<typeof calculateStats>,
  defStats: ReturnType<typeof calculateStats>
): ResolvedCombatStats {
  const isPhysical = move.category === "physical";
  const useDefense = isPhysical && move.name !== "Psyshock";

  let atkStat: number;
  if (move.name === "Body Press") {
    atkStat = atkStats.defense;
  } else if (move.name === "Foul Play") {
    atkStat = defStats.attack;
  } else {
    atkStat = isPhysical ? atkStats.attack : atkStats.spAtk;
  }

  let defStat = useDefense ? defStats.defense : defStats.spDef;

  if (options.weather === "snow" && defender.types.includes("ice") && useDefense) {
    defStat = Math.floor(defStat * 1.5);
  }
  if (options.weather === "sand" && defender.types.includes("rock") && !useDefense) {
    defStat = Math.floor(defStat * 1.5);
  }

  const rawAtkStages = isPhysical ? (attacker.atkStages ?? 0) : (attacker.spAtkStages ?? 0);
  const rawDefStages = useDefense ? (defender.defStages ?? 0) : (defender.spDefStages ?? 0);

  const atkStages = options.ignoreAttackerStatStages ? 0 : rawAtkStages;
  const defStages = options.ignoreDefenderStatStages ? 0 : rawDefStages;

  const appliedAtkStages = options.isCrit && atkStages < 0 ? 0 : atkStages;
  const appliedDefStages = options.isCrit && defStages > 0 ? 0 : defStages;

  atkStat = applyStatStage(atkStat, appliedAtkStages);
  defStat = applyStatStage(defStat, appliedDefStages);

  if (defender.item === "Assault Vest" && !isPhysical) {
    defStat = Math.floor(defStat * 1.5);
  }

  return { atkStat, defStat, isPhysical };
}

function getCurrentTargetHP(targetMaxHP: number, target: DamageCalcTarget): number {
  if (target.currentHPPercent === undefined) {
    return targetMaxHP;
  }
  return Math.max(0, Math.floor((targetMaxHP * target.currentHPPercent) / 100));
}

function getFixedDamage(moveName: string, targetMaxHP: number, targetCurrentHP: number): number | null {
  if (HALF_HP_FIXED_DAMAGE.has(moveName)) {
    return Math.max(1, Math.floor(targetCurrentHP / 2));
  }
  if (LEVEL_BASED_FIXED_DAMAGE.has(moveName)) {
    return CALC_LEVEL;
  }
  if (moveName === "Dragon Rage") {
    return 40;
  }
  if (moveName === "Sonic Boom") {
    return 20;
  }
  return null;
}

function applyAttackerAbilityDamageMods(
  attacker: DamageCalcPokemon,
  move: EngineMove,
  bp: number,
  atkStat: number,
  isPhysical: boolean,
  weather: DamageCalcOptions["weather"]
): { bp: number; atkStat: number } {
  if (!getAbilityEffect(attacker.ability)) {
    return { bp, atkStat };
  }

  let nextBp = bp;
  let nextAtk = atkStat;

  if (attacker.ability === "Technician" && nextBp <= 60) {
    nextBp = Math.floor(nextBp * 1.5);
  }
  if (attacker.ability === "Sheer Force" && move.secondary) {
    nextBp = Math.floor(nextBp * 1.3);
  }
  if (attacker.ability === "Iron Fist" && move.flags.punch) {
    nextBp = Math.floor(nextBp * 1.2);
  }
  if (attacker.ability === "Reckless" && move.flags.recoil) {
    nextBp = Math.floor(nextBp * 1.2);
  }
  if (attacker.ability === "Tough Claws" && move.flags.contact) {
    nextAtk = Math.floor(nextAtk * 1.33);
  }
  if (attacker.ability === "Sharpness" && move.flags.slicing) {
    nextBp = Math.floor(nextBp * 1.5);
  }
  if (attacker.ability === "Mega Launcher" && move.flags.pulse) {
    nextBp = Math.floor(nextBp * 1.5);
  }
  if (attacker.ability === "Strong Jaw" && move.flags.bite) {
    nextBp = Math.floor(nextBp * 1.5);
  }
  if (attacker.ability === "Permafrost Fist" && move.flags.punch) {
    nextBp = Math.floor(nextBp * 1.3);
  }
  if (
    attacker.ability === "Sand Force" &&
    weather === "sand" &&
    (move.type === "rock" || move.type === "ground" || move.type === "steel")
  ) {
    nextBp = Math.floor(nextBp * 1.3);
  }
  if (attacker.ability === "Solar Power" && weather === "sun" && !isPhysical) {
    nextAtk = Math.floor(nextAtk * 1.5);
  }
  if (attacker.ability === "Guts" && (attacker.hasStatus ?? !!attacker.isBurned)) {
    nextAtk = Math.floor(nextAtk * 1.5);
  }

  const hpPct = attacker.currentHPPercent ?? 100;
  if (attacker.ability === "Blaze" && move.type === "fire" && hpPct <= 33.3) {
    nextBp = Math.floor(nextBp * 1.5);
  }
  if (attacker.ability === "Overgrow" && move.type === "grass" && hpPct <= 33.3) {
    nextBp = Math.floor(nextBp * 1.5);
  }
  if (attacker.ability === "Torrent" && move.type === "water" && hpPct <= 33.3) {
    nextBp = Math.floor(nextBp * 1.5);
  }
  if (attacker.ability === "Swarm" && move.type === "bug" && hpPct <= 33.3) {
    nextBp = Math.floor(nextBp * 1.5);
  }

  return { bp: nextBp, atkStat: nextAtk };
}

function resolveTypeEffectiveness(
  attacker: DamageCalcPokemon,
  defender: DamageCalcTarget,
  move: EngineMove
): TypeEffectivenessResult {
  let typeEffectiveness = getMatchup(move.type, defender.types);

  if (
    attacker.ability === "Scrappy" &&
    typeEffectiveness === 0 &&
    (move.type === "normal" || move.type === "fighting") &&
    defender.types.includes("ghost")
  ) {
    const nonGhostTypes = defender.types.filter((t) => t !== "ghost");
    typeEffectiveness = nonGhostTypes.length > 0 ? getMatchup(move.type, nonGhostTypes) : 1;
  }

  if (move.name === "Freeze-Dry" && defender.types.includes("water")) {
    typeEffectiveness = defender.types.length === 1 ? 2 : typeEffectiveness * 2;
  }

  const defAbility = getAbilityEffect(defender.ability);
  if (defAbility?.typeImmunity === move.type) {
    typeEffectiveness = 0;
  }

  let damageTypeMultiplier = typeEffectiveness;
  if (defender.ability === "Thick Fat" && (move.type === "fire" || move.type === "ice")) {
    damageTypeMultiplier *= 0.5;
  }

  return { typeEffectiveness, damageTypeMultiplier };
}

function resolveHitRange(move: EngineMove, options: DamageCalcOptions): [number, number] {
  if (options.multiHitCount && options.multiHitCount > 0) {
    return [options.multiHitCount, options.multiHitCount];
  }
  if (!move.multiHit) {
    return [1, 1];
  }
  return move.multiHit;
}

function resolveBasePower(
  attacker: DamageCalcPokemon,
  defender: DamageCalcTarget,
  move: EngineMove,
  preparedMove: PreparedMove,
  atkStats: ReturnType<typeof calculateStats>,
  defStats: ReturnType<typeof calculateStats>
): number {
  let bp = move.basePower;

  if (bp === 0) {
    // Weight-based moves default to 80 BP (no weight data available).
    if (move.name === "Grass Knot" || move.name === "Low Kick") {
      return 80;
    }
    return 0;
  }

  if (move.name === "Eruption" || move.name === "Water Spout") {
    const hpPct = (attacker.currentHPPercent ?? 100) / 100;
    bp = Math.max(1, Math.floor(150 * hpPct));
  }

  if (move.name === "Facade" && (attacker.hasStatus ?? !!attacker.isBurned)) {
    bp *= 2;
  }

  // Approximation based on computed speed stats; field-specific speed effects are handled in battle order logic.
  if (move.name === "Gyro Ball") {
    bp = Math.min(150, Math.max(1, Math.floor((25 * defStats.speed) / Math.max(1, atkStats.speed))));
  }

  if (preparedMove.ateBpBoost) {
    bp = Math.floor(bp * 1.2);
  }

  if (move.name === "Knock Off" && defender.item) {
    bp = Math.floor(bp * 1.5);
  }

  if (move.name === "Acrobatics" && !attacker.item) {
    bp *= 2;
  }

  return bp;
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
    return emptyDamage(moveName);
  }

  const preparedMove = prepareMove(attacker, moveOriginal, options);
  const moveCalc = preparedMove.move;

  const atkStats = calculateStats(attacker.baseStats, attacker.sp, attacker.nature);
  const defStats = calculateStats(defender.baseStats, defender.sp, defender.nature);

  const resolvedCombatStats = resolveCombatStats(
    attacker,
    defender,
    moveCalc,
    options,
    atkStats,
    defStats
  );
  let atkStat = resolvedCombatStats.atkStat;
  const defStat = resolvedCombatStats.defStat;
  const isPhysical = resolvedCombatStats.isPhysical;

  // Bulletproof: immune to ball/bomb moves
  if (defender.ability === "Bulletproof" && moveCalc.flags.bullet) {
    return emptyDamage(moveName, 0);
  }

  const { typeEffectiveness, damageTypeMultiplier } = resolveTypeEffectiveness(attacker, defender, moveCalc);
  if (typeEffectiveness === 0) {
    return emptyDamage(moveName, 0);
  }

  const currentTargetHP = getCurrentTargetHP(defStats.hp, defender);
  const fixedDamage = getFixedDamage(moveCalc.name, defStats.hp, currentTargetHP);
  if (fixedDamage !== null) {
    return toDamageResult(fixedDamage, fixedDamage, defStats.hp, typeEffectiveness, moveName);
  }

  let bp = resolveBasePower(attacker, defender, moveCalc, preparedMove, atkStats, defStats);
  if (bp === 0) {
    return emptyDamage(moveName, typeEffectiveness);
  }

  ({ bp, atkStat } = applyAttackerAbilityDamageMods(
    attacker,
    moveCalc,
    bp,
    atkStat,
    isPhysical,
    preparedMove.effectiveWeather
  ));

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

  // Weather modifiers
  let weatherMult = 1;
  if (preparedMove.effectiveWeather === "sun" && moveCalc.type === "fire") weatherMult = 1.5;
  if (preparedMove.effectiveWeather === "sun" && moveCalc.type === "water") weatherMult = 0.5;
  if (preparedMove.effectiveWeather === "rain" && moveCalc.type === "water") weatherMult = 1.5;
  if (preparedMove.effectiveWeather === "rain" && moveCalc.type === "fire") weatherMult = 0.5;

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
  const isSE = typeEffectiveness >= 2;
  const itemMult = getItemDamageMultiplier(attacker.item, moveCalc.type, moveCalc.category, isSE);

  // Helping Hand
  const helpingHandMult = options.helpingHand ? 1.5 : 1;

  // Friend Guard
  const friendGuardMult = options.friendGuard ? 0.75 : 1;

  // === THE DAMAGE FORMULA ===
  // Damage = ((2*Level/5 + 2) * Power * Atk/Def) / 50 + 2) * modifiers * roll
  const baseDamage = Math.floor(
    (Math.floor((2 * CALC_LEVEL / 5 + 2) * bp * atkStat / defStat) / 50 + 2)
  );

  // Match the documented order: other non-random mods -> random -> STAB -> type.
  const otherMult = weatherMult * screenMult * spreadMult * critMult * burnMult *
    itemMult * helpingHandMult * friendGuardMult * (damageTypeMultiplier / typeEffectiveness);
  const baseAfterOther = Math.floor(baseDamage * otherMult);

  // Random roll is 0.85 to 1.00 (16 possible values)
  const minPerHit = Math.max(1, Math.floor(Math.floor(baseAfterOther * 0.85) * stabMult * typeEffectiveness));
  const maxPerHit = Math.max(1, Math.floor(baseAfterOther * stabMult * typeEffectiveness));

  const [minHits, maxHits] = resolveHitRange(moveCalc, options);
  const minDamage = minPerHit * minHits;
  const maxDamage = maxPerHit * maxHits;

  return toDamageResult(minDamage, maxDamage, defStats.hp, typeEffectiveness, moveName);
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

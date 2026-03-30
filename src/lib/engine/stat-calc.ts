// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - STAT CALCULATOR
// Level 50 stat calculation with SP system and natures
// ═══════════════════════════════════════════════════════════════════════════════

import type { BaseStats, StatPoints } from "@/lib/types";
import { getNatureModifier, type NatureName, type StatKey } from "./natures";

const LEVEL = 50;
const IV = 31; // Always max IVs in Champions format

export interface CalculatedStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

/** Calculate a single non-HP stat at Level 50 */
function calcStat(base: number, sp: number, nature: NatureName, stat: StatKey): number {
  // Champions formula: floor((floor(((2*Base + IV) * Level) / 100) + 5 + SP) * NatureMod)
  // Correct order: floor the base calculation first, add 5+SP, then apply nature multiplier, then floor again
  // Formula reference: https://www.pokeos.com/p/champions/stats
  const baseValue = Math.floor(((2 * base + IV) * LEVEL) / 100) + 5 + sp;
  const withNature = Math.floor(baseValue * getNatureModifier(nature, stat));
  return withNature;
}

/** Calculate HP stat at Level 50 */
function calcHP(base: number, sp: number): number {
  // HP formula: floor((2*Base + IV + floor(EV/4)) * Level/100) + Level + 10
  // Shedinja-like HP 1 check not needed for this roster
  return Math.floor((2 * base + IV) * LEVEL / 100) + LEVEL + 10 + sp;
}

/** Calculate all stats for a Pokémon at Level 50 */
export function calculateStats(
  baseStats: BaseStats,
  sp: StatPoints,
  nature: NatureName
): CalculatedStats {
  return {
    hp: calcHP(baseStats.hp, sp.hp),
    attack: calcStat(baseStats.attack, sp.attack, nature, "attack"),
    defense: calcStat(baseStats.defense, sp.defense, nature, "defense"),
    spAtk: calcStat(baseStats.spAtk, sp.spAtk, nature, "spAtk"),
    spDef: calcStat(baseStats.spDef, sp.spDef, nature, "spDef"),
    speed: calcStat(baseStats.speed, sp.speed, nature, "speed"),
  };
}

/** Get effective speed including modifiers (Tailwind, Choice Scarf, weather abilities, paralysis) */
export function getEffectiveSpeed(
  baseSpeed: number,
  options: {
    tailwind?: boolean;
    choiceScarf?: boolean;
    paralysis?: boolean;
    weatherSpeedDoubled?: boolean;
    boostStages?: number; // -6 to +6
    trickRoom?: boolean;
  } = {}
): number {
  let speed = baseSpeed;

  // Stat stage multipliers
  if (options.boostStages) {
    const stages = Math.max(-6, Math.min(6, options.boostStages));
    if (stages >= 0) {
      speed = Math.floor(speed * (2 + stages) / 2);
    } else {
      speed = Math.floor(speed * 2 / (2 - stages));
    }
  }

  // Item speed boost (Choice Scarf)
  if (options.choiceScarf) speed = Math.floor(speed * 1.5);

  // Weather speed abilities (Swift Swim, Chlorophyll, Sand Rush)
  if (options.weatherSpeedDoubled) speed = Math.floor(speed * 2);

  // Tailwind (applied last in chain before paralysis)
  if (options.tailwind) speed = Math.floor(speed * 2);

  // Paralysis (0.5x speed)
  if (options.paralysis) speed = Math.floor(speed * 0.5);

  return speed;
}

/** Apply stat stage modifiers (-6 to +6) */
export function applyStatStage(stat: number, stages: number): number {
  const s = Math.max(-6, Math.min(6, stages));
  if (s >= 0) return Math.floor(stat * (2 + s) / 2);
  return Math.floor(stat * 2 / (2 - s));
}

/** Calculate BST (Base Stat Total) */
export function getBST(baseStats: BaseStats): number {
  return baseStats.hp + baseStats.attack + baseStats.defense +
         baseStats.spAtk + baseStats.spDef + baseStats.speed;
}

/** Get the speed tier bracket name */
export function getSpeedTier(speed: number): string {
  if (speed >= 150) return "Ultra Fast";
  if (speed >= 120) return "Very Fast";
  if (speed >= 100) return "Fast";
  if (speed >= 80) return "Medium";
  if (speed >= 60) return "Slow";
  if (speed >= 40) return "Very Slow";
  return "Trick Room";
}

/** Compare two speeds, accounting for Trick Room */
export function isFaster(speed1: number, speed2: number, trickRoom: boolean = false): boolean {
  if (trickRoom) return speed1 < speed2;
  return speed1 > speed2;
}

/** Classify a Pokémon's stat distribution for role analysis */
export function classifyStatProfile(stats: BaseStats): {
  role: "physical-attacker" | "special-attacker" | "mixed-attacker" | "physical-wall" | "special-wall" | "mixed-wall" | "fast-attacker" | "tank" | "support";
  primaryStat: StatKey;
  dumpStat: StatKey;
} {
  const entries: [StatKey, number][] = [
    ["hp", stats.hp], ["attack", stats.attack], ["defense", stats.defense],
    ["spAtk", stats.spAtk], ["spDef", stats.spDef], ["speed", stats.speed],
  ];
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const primaryStat = sorted[0][0];
  const dumpStat = sorted[sorted.length - 1][0];

  const atkBias = stats.attack - stats.spAtk;
  const bulkScore = (stats.hp + stats.defense + stats.spDef) / 3;
  const offenseScore = Math.max(stats.attack, stats.spAtk);

  let role: ReturnType<typeof classifyStatProfile>["role"];

  if (bulkScore > offenseScore && stats.speed < 70) {
    if (stats.defense > stats.spDef + 20) role = "physical-wall";
    else if (stats.spDef > stats.defense + 20) role = "special-wall";
    else role = "mixed-wall";
  } else if (offenseScore > bulkScore && stats.speed >= 90) {
    role = "fast-attacker";
  } else if (offenseScore > bulkScore) {
    if (Math.abs(atkBias) < 15) role = "mixed-attacker";
    else if (atkBias > 0) role = "physical-attacker";
    else role = "special-attacker";
  } else if (bulkScore > 80 && offenseScore > 80) {
    role = "tank";
  } else {
    role = "support";
  }

  return { role, primaryStat, dumpStat };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC TYPE EFFECTIVENESS ENGINE
// Complete 18×18 type chart with dual-type calculations
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType } from "@/lib/types";

// Ordered type index for matrix lookup
const TYPE_INDEX: PokemonType[] = [
  "normal","fire","water","electric","grass","ice",
  "fighting","poison","ground","flying","psychic","bug",
  "rock","ghost","dragon","dark","steel","fairy"
];

// 18×18 effectiveness matrix - rows = attacking type, cols = defending type
// 0 = immune, 0.5 = not very effective, 1 = neutral, 2 = super effective
const CHART: number[][] = [
// NOR FIR WAT ELE GRA ICE FIG POI GRO FLY PSY BUG ROC GHO DRA DAR STE FAI
  [1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, .5,  0,  1,  1, .5,  1], // Normal
  [1, .5, .5,  1,  2,  2,  1,  1,  1,  1,  1,  2, .5,  1, .5,  1,  2,  1], // Fire
  [1,  2, .5,  1, .5,  1,  1,  1,  2,  1,  1,  1,  2,  1, .5,  1,  1,  1], // Water
  [1,  1,  2, .5, .5,  1,  1,  1,  0,  2,  1,  1,  1,  1, .5,  1,  1,  1], // Electric
  [1, .5,  2,  1, .5,  1,  1, .5,  2, .5,  1, .5,  2,  1, .5,  1, .5,  1], // Grass
  [1, .5, .5,  1,  2, .5,  1,  1,  2,  2,  1,  1,  1,  1,  2,  1, .5,  1], // Ice
  [2,  1,  1,  1,  1,  2,  1, .5,  1, .5, .5, .5,  2,  0,  1,  2,  2, .5], // Fighting
  [1,  1,  1,  1,  2,  1,  1, .5, .5,  1,  1,  1, .5, .5,  1,  1,  0,  2], // Poison
  [1,  2,  1,  2, .5,  1,  1,  2,  1,  0,  1, .5,  2,  1,  1,  1,  2,  1], // Ground
  [1,  1,  1, .5,  2,  1,  2,  1,  1,  1,  1,  2, .5,  1,  1,  1, .5,  1], // Flying
  [1,  1,  1,  1,  1,  1,  2,  2,  1,  1, .5,  1,  1,  1,  1,  0, .5,  1], // Psychic
  [1, .5,  1,  1,  2,  1, .5, .5,  1, .5,  2,  1,  1, .5,  1,  2, .5, .5], // Bug
  [1,  2,  1,  1,  1,  2, .5,  1, .5,  2,  1,  2,  1,  1,  1,  1, .5,  1], // Rock
  [0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1,  1,  2,  1, .5,  1,  1], // Ghost
  [1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  1, .5,  0], // Dragon
  [1,  1,  1,  1,  1,  1, .5,  1,  1,  1,  2,  1,  1,  2,  1, .5,  1, .5], // Dark
  [1, .5, .5, .5,  1,  2,  1,  1,  1,  1,  1,  1,  2,  1,  1,  1, .5,  2], // Steel
  [1, .5,  1,  1,  1,  1,  2, .5,  1,  1,  1,  1,  1,  1,  2,  2, .5,  1], // Fairy
];

/** Get type effectiveness multiplier (attacking → single defending type) */
export function getTypeEffectiveness(atkType: PokemonType, defType: PokemonType): number {
  return CHART[TYPE_INDEX.indexOf(atkType)][TYPE_INDEX.indexOf(defType)];
}

/** Get combined effectiveness against a dual-typed Pokémon */
export function getMatchup(atkType: PokemonType, defTypes: PokemonType[]): number {
  return defTypes.reduce((acc, t) => acc * getTypeEffectiveness(atkType, t), 1);
}

/** All types that are super effective against the given types */
export function getWeaknesses(types: PokemonType[]): PokemonType[] {
  return TYPE_INDEX.filter(atk => getMatchup(atk, types) >= 2);
}

/** All types that are resisted by the given types */
export function getResistances(types: PokemonType[]): PokemonType[] {
  return TYPE_INDEX.filter(atk => getMatchup(atk, types) > 0 && getMatchup(atk, types) < 1);
}

/** All types that the given types are immune to */
export function getImmunities(types: PokemonType[]): PokemonType[] {
  return TYPE_INDEX.filter(atk => getMatchup(atk, types) === 0);
}

/** Offensive coverage: which types does this attacking type hit super effectively? */
export function getSuperEffectiveTargets(atkType: PokemonType): PokemonType[] {
  return TYPE_INDEX.filter(def => getTypeEffectiveness(atkType, def) >= 2);
}

/** Full defensive profile for a typing */
export function getDefensiveProfile(types: PokemonType[]) {
  const weaknesses: { type: PokemonType; multiplier: number }[] = [];
  const resistances: { type: PokemonType; multiplier: number }[] = [];
  const immunities: PokemonType[] = [];

  for (const atk of TYPE_INDEX) {
    const mult = getMatchup(atk, types);
    if (mult === 0) immunities.push(atk);
    else if (mult >= 2) weaknesses.push({ type: atk, multiplier: mult });
    else if (mult < 1) resistances.push({ type: atk, multiplier: mult });
  }

  return { weaknesses, resistances, immunities };
}

/** Score how well two Pokémon types complement each other defensively (0-1) */
export function defensiveSynergy(types1: PokemonType[], types2: PokemonType[]): number {
  const weak1 = getWeaknesses(types1);
  const weak2 = getWeaknesses(types2);
  const resist1 = [...getResistances(types1), ...getImmunities(types1)];
  const resist2 = [...getResistances(types2), ...getImmunities(types2)];

  // How many of mon1's weaknesses does mon2 resist?
  const covered1 = weak1.filter(w => resist2.includes(w)).length;
  const covered2 = weak2.filter(w => resist1.includes(w)).length;

  const total = weak1.length + weak2.length;
  if (total === 0) return 1;
  return (covered1 + covered2) / total;
}

/** Score offensive coverage of a set of move types (how many of 18 types hit for SE) */
export function offensiveCoverage(moveTypes: PokemonType[]): number {
  const hitSE = new Set<PokemonType>();
  for (const mt of moveTypes) {
    for (const target of getSuperEffectiveTargets(mt)) {
      hitSE.add(target);
    }
  }
  return hitSE.size / TYPE_INDEX.length;
}

/** Get all 18 types */
export function getAllTypes(): PokemonType[] {
  return [...TYPE_INDEX];
}

/** Calculate type coverage matrix for an entire team */
export function teamTypeCoverage(teamTypes: PokemonType[][]): Record<PokemonType, number> {
  const coverage: Record<string, number> = {};
  for (const def of TYPE_INDEX) {
    let best = 1;
    for (const atkTypes of teamTypes) {
      for (const atk of atkTypes) {
        const eff = getTypeEffectiveness(atk, def);
        if (eff > best) best = eff;
      }
    }
    coverage[def] = best;
  }
  return coverage as Record<PokemonType, number>;
}

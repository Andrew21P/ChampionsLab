// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - NATURE ENGINE
// All 25 natures with stat modifiers (+10% / -10%)
// ═══════════════════════════════════════════════════════════════════════════════

export type StatKey = "hp" | "attack" | "defense" | "spAtk" | "spDef" | "speed";
export type NatureName =
  | "Hardy" | "Lonely" | "Brave" | "Adamant" | "Naughty"
  | "Bold" | "Docile" | "Relaxed" | "Impish" | "Lax"
  | "Timid" | "Hasty" | "Serious" | "Jolly" | "Naive"
  | "Modest" | "Mild" | "Quiet" | "Bashful" | "Rash"
  | "Calm" | "Gentle" | "Sassy" | "Careful" | "Quirky";

export interface Nature {
  name: NatureName;
  plus: StatKey | null;  // stat boosted (+10%)
  minus: StatKey | null; // stat lowered (-10%)
}

export const NATURES: Record<NatureName, Nature> = {
  // Neutral natures (no change)
  Hardy:   { name: "Hardy",   plus: null,      minus: null },
  Docile:  { name: "Docile",  plus: null,      minus: null },
  Serious: { name: "Serious", plus: null,      minus: null },
  Bashful: { name: "Bashful", plus: null,      minus: null },
  Quirky:  { name: "Quirky",  plus: null,      minus: null },
  // +Attack
  Lonely:  { name: "Lonely",  plus: "attack",  minus: "defense" },
  Brave:   { name: "Brave",   plus: "attack",  minus: "speed" },
  Adamant: { name: "Adamant", plus: "attack",  minus: "spAtk" },
  Naughty: { name: "Naughty", plus: "attack",  minus: "spDef" },
  // +Defense
  Bold:    { name: "Bold",    plus: "defense", minus: "attack" },
  Relaxed: { name: "Relaxed", plus: "defense", minus: "speed" },
  Impish:  { name: "Impish",  plus: "defense", minus: "spAtk" },
  Lax:     { name: "Lax",     plus: "defense", minus: "spDef" },
  // +Speed
  Timid:   { name: "Timid",   plus: "speed",   minus: "attack" },
  Hasty:   { name: "Hasty",   plus: "speed",   minus: "defense" },
  Jolly:   { name: "Jolly",   plus: "speed",   minus: "spAtk" },
  Naive:   { name: "Naive",   plus: "speed",   minus: "spDef" },
  // +Sp.Atk
  Modest:  { name: "Modest",  plus: "spAtk",   minus: "attack" },
  Mild:    { name: "Mild",    plus: "spAtk",   minus: "defense" },
  Quiet:   { name: "Quiet",   plus: "spAtk",   minus: "speed" },
  Rash:    { name: "Rash",    plus: "spAtk",   minus: "spDef" },
  // +Sp.Def
  Calm:    { name: "Calm",    plus: "spDef",   minus: "attack" },
  Gentle:  { name: "Gentle",  plus: "spDef",   minus: "defense" },
  Sassy:   { name: "Sassy",   plus: "spDef",   minus: "speed" },
  Careful: { name: "Careful", plus: "spDef",   minus: "spAtk" },
};

/** Get the stat multiplier for a given nature and stat */
export function getNatureModifier(nature: NatureName, stat: StatKey): number {
  if (stat === "hp") return 1; // HP is never affected by nature
  const n = NATURES[nature];
  if (n.plus === stat) return 1.1;
  if (n.minus === stat) return 0.9;
  return 1;
}

/** Get best nature for a physical attacker */
export function bestPhysicalNature(needsSpeed: boolean): NatureName {
  return needsSpeed ? "Jolly" : "Adamant";
}

/** Get best nature for a special attacker */
export function bestSpecialNature(needsSpeed: boolean): NatureName {
  return needsSpeed ? "Timid" : "Modest";
}

/** Get best nature for a mixed attacker */
export function bestMixedNature(preferPhysical: boolean): NatureName {
  return preferPhysical ? "Naive" : "Rash";
}

/** Suggest the best nature based on stat point allocation and role */
export function suggestNature(
  sp: Record<StatKey, number>,
  category: "physical" | "special" | "mixed" | "support"
): NatureName {
  if (category === "support") {
    if (sp.speed >= 20) return "Timid";
    if (sp.spDef >= 20) return "Calm";
    if (sp.defense >= 20) return "Bold";
    return "Bold";
  }
  if (category === "physical") {
    if (sp.speed >= 20) return "Jolly";
    if (sp.speed === 0) return "Brave"; // Trick Room
    return "Adamant";
  }
  if (category === "special") {
    if (sp.speed >= 20) return "Timid";
    if (sp.speed === 0) return "Quiet"; // Trick Room
    return "Modest";
  }
  // Mixed
  if (sp.attack >= sp.spAtk) return "Naive";
  return "Rash";
}

/** All nature names */
export function getAllNatures(): NatureName[] {
  return Object.keys(NATURES) as NatureName[];
}

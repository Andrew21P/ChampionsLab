// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - ABILITY EFFECTS ENGINE
// Battle-relevant ability effects for simulation and team building
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType } from "@/lib/types";

export type AbilityCategory =
  | "weather"       // Sets weather on switch-in
  | "terrain"       // Sets terrain on switch-in
  | "intimidate"    // Lowers opponent's stats on switch-in
  | "immunity"      // Immune to a type or status
  | "redirect"      // Redirects moves (Lightning Rod, Storm Drain)
  | "stat-boost"    // Boosts own stats conditionally
  | "type-boost"    // Boosts damage of a type
  | "contact-punish"// Punishes contact moves
  | "speed-control" // Affects speed (Swift Swim, Chlorophyll, Sand Rush)
  | "defensive"     // Defensive ability (Thick Fat, Filter, etc.)
  | "offensive"     // Offensive ability (Adaptability, Sheer Force, etc.)
  | "disruption"    // Disrupts opponent (Pressure, Unnerve, etc.)
  | "form-change"   // Form change triggers
  | "utility"       // Other utility effects
  | "champions";    // Champions-exclusive ability

export interface AbilityEffect {
  name: string;
  category: AbilityCategory;
  description: string;
  // Weather/Terrain on entry
  setsWeather?: "sun" | "rain" | "sand" | "snow" | "hail";
  setsTerrain?: "electric" | "grassy" | "misty" | "psychic";
  // Stat modification on entry
  onEntry?: { target: "foes" | "allies" | "self"; stat: string; stages: number };
  // Type immunity
  typeImmunity?: PokemonType;
  // Type damage boost
  typeBoost?: { type: PokemonType; multiplier: number };
  // Category damage boost
  damageMultiplier?: number;
  // Weather-based speed doubling
  weatherSpeed?: "sun" | "rain" | "sand" | "snow";
  // Stat multipliers
  statMultiplier?: Partial<Record<"attack" | "defense" | "spAtk" | "spDef" | "speed", number>>;
  // Contact punishment
  contactDamage?: number; // % max HP
  // Priority control
  priorityBoost?: { type: PokemonType; priority: number };
  // STAB boost
  stabMultiplier?: number; // Adaptability: 2 instead of 1.5
  // Personal weather (moves behave as if this weather is active)
  personalWeather?: "sun" | "rain" | "sand" | "snow";
  // VGC relevance score (0-10)
  vgcRelevance: number;
}

export const ABILITY_DATA: Record<string, AbilityEffect> = {
  // ── WEATHER SETTERS ────────────────────────────────────────────────────────
  "Drizzle": {
    name: "Drizzle", category: "weather",
    description: "Summons rain on switch-in.",
    setsWeather: "rain", vgcRelevance: 10,
  },
  "Drought": {
    name: "Drought", category: "weather",
    description: "Summons sun on switch-in.",
    setsWeather: "sun", vgcRelevance: 10,
  },
  "Sand Stream": {
    name: "Sand Stream", category: "weather",
    description: "Summons sandstorm on switch-in.",
    setsWeather: "sand", vgcRelevance: 9,
  },
  "Snow Warning": {
    name: "Snow Warning", category: "weather",
    description: "Summons snow/hail on switch-in.",
    setsWeather: "snow", vgcRelevance: 7,
  },

  // ── INTIMIDATE ─────────────────────────────────────────────────────────────
  "Intimidate": {
    name: "Intimidate", category: "intimidate",
    description: "Lowers opponents' Attack one stage on switch-in.",
    onEntry: { target: "foes", stat: "attack", stages: -1 },
    vgcRelevance: 10,
  },

  // ── SPEED CONTROL ──────────────────────────────────────────────────────────
  "Swift Swim": {
    name: "Swift Swim", category: "speed-control",
    description: "Doubles Speed in rain.",
    weatherSpeed: "rain", vgcRelevance: 9,
  },
  "Chlorophyll": {
    name: "Chlorophyll", category: "speed-control",
    description: "Doubles Speed in sun.",
    weatherSpeed: "sun", vgcRelevance: 9,
  },
  "Sand Rush": {
    name: "Sand Rush", category: "speed-control",
    description: "Doubles Speed in sandstorm.",
    weatherSpeed: "sand", vgcRelevance: 8,
  },
  "Slush Rush": {
    name: "Slush Rush", category: "speed-control",
    description: "Doubles Speed in snow/hail.",
    weatherSpeed: "snow", vgcRelevance: 7,
  },
  "Unburden": {
    name: "Unburden", category: "speed-control",
    description: "Doubles Speed when held item is lost.",
    vgcRelevance: 7,
  },

  // ── TYPE IMMUNITIES ────────────────────────────────────────────────────────
  "Lightning Rod": {
    name: "Lightning Rod", category: "redirect",
    description: "Draws Electric moves to self and raises Sp.Atk by 1 stage.",
    typeImmunity: "electric", vgcRelevance: 9,
  },
  "Storm Drain": {
    name: "Storm Drain", category: "redirect",
    description: "Draws Water moves to self and raises Sp.Atk by 1 stage.",
    typeImmunity: "water", vgcRelevance: 8,
  },
  "Flash Fire": {
    name: "Flash Fire", category: "immunity",
    description: "Immune to Fire moves. Boosts own Fire moves by 50% when activated.",
    typeImmunity: "fire", vgcRelevance: 8,
  },
  "Water Absorb": {
    name: "Water Absorb", category: "immunity",
    description: "Heals 25% max HP when hit by Water moves.",
    typeImmunity: "water", vgcRelevance: 8,
  },
  "Volt Absorb": {
    name: "Volt Absorb", category: "immunity",
    description: "Heals 25% max HP when hit by Electric moves.",
    typeImmunity: "electric", vgcRelevance: 7,
  },
  "Levitate": {
    name: "Levitate", category: "immunity",
    description: "Immune to Ground-type moves.",
    typeImmunity: "ground", vgcRelevance: 8,
  },
  "Sap Sipper": {
    name: "Sap Sipper", category: "immunity",
    description: "Immune to Grass moves. Raises Attack by 1 when hit.",
    typeImmunity: "grass", vgcRelevance: 6,
  },
  "Motor Drive": {
    name: "Motor Drive", category: "immunity",
    description: "Immune to Electric moves. Raises Speed by 1 when hit.",
    typeImmunity: "electric", vgcRelevance: 7,
  },

  // ── OFFENSIVE ABILITIES ────────────────────────────────────────────────────
  "Adaptability": {
    name: "Adaptability", category: "offensive",
    description: "STAB bonus is 2× instead of 1.5×.",
    stabMultiplier: 2, vgcRelevance: 8,
  },
  "Sheer Force": {
    name: "Sheer Force", category: "offensive",
    description: "Moves with secondary effects gain 30% power but lose those effects.",
    damageMultiplier: 1.3, vgcRelevance: 8,
  },
  "Tough Claws": {
    name: "Tough Claws", category: "offensive",
    description: "Contact moves deal 33% more damage.",
    damageMultiplier: 1.33, vgcRelevance: 8,
  },
  "Technician": {
    name: "Technician", category: "offensive",
    description: "Moves with 60 or less base power deal 50% more damage.",
    damageMultiplier: 1.5, vgcRelevance: 7,
  },
  "Iron Fist": {
    name: "Iron Fist", category: "offensive",
    description: "Punching moves deal 20% more damage.",
    damageMultiplier: 1.2, vgcRelevance: 6,
  },
  "Reckless": {
    name: "Reckless", category: "offensive",
    description: "Recoil moves deal 20% more damage.",
    damageMultiplier: 1.2, vgcRelevance: 6,
  },
  "Moxie": {
    name: "Moxie", category: "offensive",
    description: "Raises Attack by 1 stage upon KOing a target.",
    vgcRelevance: 7,
  },
  "Beast Boost": {
    name: "Beast Boost", category: "offensive",
    description: "Raises the user's highest stat by 1 stage upon KOing a target.",
    vgcRelevance: 8,
  },
  "Protean": {
    name: "Protean", category: "offensive",
    description: "Changes type to match the move being used (once per switch-in).",
    vgcRelevance: 8,
  },
  "Sand Force": {
    name: "Sand Force", category: "offensive",
    description: "Boosts Rock/Ground/Steel moves by 30% in sandstorm.",
    damageMultiplier: 1.3, vgcRelevance: 7,
  },
  "Mega Launcher": {
    name: "Mega Launcher", category: "offensive",
    description: "Pulse/Aura moves deal 50% more damage.",
    damageMultiplier: 1.5, vgcRelevance: 6,
  },
  "Sharpness": {
    name: "Sharpness", category: "offensive",
    description: "Slicing moves deal 50% more damage.",
    damageMultiplier: 1.5, vgcRelevance: 7,
  },
  "Parental Bond": {
    name: "Parental Bond", category: "offensive",
    description: "Moves hit twice. Second hit deals 25% damage.",
    vgcRelevance: 10,
  },
  "Scrappy": {
    name: "Scrappy", category: "offensive",
    description: "Normal and Fighting moves can hit Ghost types.",
    vgcRelevance: 6,
  },

  // ── DEFENSIVE ABILITIES ────────────────────────────────────────────────────
  "Thick Fat": {
    name: "Thick Fat", category: "defensive",
    description: "Halves damage from Fire and Ice moves.",
    vgcRelevance: 7,
  },
  "Magic Guard": {
    name: "Magic Guard", category: "defensive",
    description: "Only takes damage from direct attacks.",
    vgcRelevance: 8,
  },
  "Unaware": {
    name: "Unaware", category: "defensive",
    description: "Ignores opponent's stat changes when taking or dealing damage.",
    vgcRelevance: 7,
  },
  "Regenerator": {
    name: "Regenerator", category: "defensive",
    description: "Heals 33% max HP upon switching out.",
    vgcRelevance: 9,
  },
  "Sturdy": {
    name: "Sturdy", category: "defensive",
    description: "Survives any hit at 1 HP when at full HP.",
    vgcRelevance: 6,
  },
  "Clear Body": {
    name: "Clear Body", category: "defensive",
    description: "Prevents stat reduction from other Pokémon.",
    vgcRelevance: 7,
  },
  "Competitive": {
    name: "Competitive", category: "defensive",
    description: "Raises Sp.Atk by 2 stages when any stat is lowered.",
    vgcRelevance: 8,
  },
  "Defiant": {
    name: "Defiant", category: "defensive",
    description: "Raises Attack by 2 stages when any stat is lowered.",
    vgcRelevance: 8,
  },
  "Inner Focus": {
    name: "Inner Focus", category: "defensive",
    description: "Cannot flinch. Also blocks Intimidate.",
    vgcRelevance: 7,
  },
  "Oblivious": {
    name: "Oblivious", category: "defensive",
    description: "Cannot be infatuated or taunted. Blocks Intimidate.",
    vgcRelevance: 5,
  },
  "Own Tempo": {
    name: "Own Tempo", category: "defensive",
    description: "Cannot be confused. Blocks Intimidate.",
    vgcRelevance: 5,
  },
  "Shell Armor": {
    name: "Shell Armor", category: "defensive",
    description: "Cannot be hit by critical hits.",
    vgcRelevance: 3,
  },
  "Weak Armor": {
    name: "Weak Armor", category: "defensive",
    description: "Physical hits lower Defense by 1 but raise Speed by 2.",
    vgcRelevance: 5,
  },
  "Rough Skin": {
    name: "Rough Skin", category: "contact-punish",
    description: "Damages contact attackers for 1/8 max HP.",
    contactDamage: 12.5, vgcRelevance: 7,
  },
  "Iron Barbs": {
    name: "Iron Barbs", category: "contact-punish",
    description: "Damages contact attackers for 1/8 max HP.",
    contactDamage: 12.5, vgcRelevance: 6,
  },
  "Cursed Body": {
    name: "Cursed Body", category: "disruption",
    description: "30% chance to disable the move that hit this Pokémon.",
    vgcRelevance: 5,
  },
  "Pressure": {
    name: "Pressure", category: "disruption",
    description: "Opposing moves use 2 PP instead of 1.",
    vgcRelevance: 4,
  },
  "Unnerve": {
    name: "Unnerve", category: "disruption",
    description: "Prevents opponents from eating berries.",
    vgcRelevance: 5,
  },

  // ── STARTER ABILITIES ──────────────────────────────────────────────────────
  "Blaze": {
    name: "Blaze", category: "stat-boost",
    description: "Fire moves deal 1.5× at 1/3 HP or less.",
    typeBoost: { type: "fire", multiplier: 1.5 }, vgcRelevance: 4,
  },
  "Overgrow": {
    name: "Overgrow", category: "stat-boost",
    description: "Grass moves deal 1.5× at 1/3 HP or less.",
    typeBoost: { type: "grass", multiplier: 1.5 }, vgcRelevance: 4,
  },
  "Torrent": {
    name: "Torrent", category: "stat-boost",
    description: "Water moves deal 1.5× at 1/3 HP or less.",
    typeBoost: { type: "water", multiplier: 1.5 }, vgcRelevance: 4,
  },
  "Swarm": {
    name: "Swarm", category: "stat-boost",
    description: "Bug moves deal 1.5× at 1/3 HP or less.",
    typeBoost: { type: "bug", multiplier: 1.5 }, vgcRelevance: 3,
  },

  // ── UTILITY ────────────────────────────────────────────────────────────────
  "Natural Cure": {
    name: "Natural Cure", category: "utility",
    description: "Cures status when switching out.",
    vgcRelevance: 6,
  },
  "Frisk": {
    name: "Frisk", category: "utility",
    description: "Reveals opponent's held items on switch-in.",
    vgcRelevance: 4,
  },
  "Prankster": {
    name: "Prankster", category: "utility",
    description: "Status moves gain +1 priority. Fails against Dark types.",
    vgcRelevance: 10,
  },
  "Friend Guard": {
    name: "Friend Guard", category: "defensive",
    description: "Reduces damage allies take by 25%.",
    vgcRelevance: 7,
  },
  "Telepathy": {
    name: "Telepathy", category: "defensive",
    description: "Immune to ally's damaging moves.",
    vgcRelevance: 5,
  },
  "Guts": {
    name: "Guts", category: "offensive",
    description: "Attack is 1.5×  when afflicted with a status condition.",
    statMultiplier: { attack: 1.5 }, vgcRelevance: 6,
  },
  "Solar Power": {
    name: "Solar Power", category: "offensive",
    description: "Sp.Atk is 1.5× in sun but loses 1/8 HP per turn.",
    statMultiplier: { spAtk: 1.5 }, vgcRelevance: 7,
  },
  "Analytic": {
    name: "Analytic", category: "offensive",
    description: "Moves deal 30% more damage if user moves last.",
    damageMultiplier: 1.3, vgcRelevance: 5,
  },
  "Contrary": {
    name: "Contrary", category: "utility",
    description: "Stat changes are reversed. Boosts become drops and vice versa.",
    vgcRelevance: 8,
  },
  "Mold Breaker": {
    name: "Mold Breaker", category: "offensive",
    description: "Ignores target's ability when attacking.",
    vgcRelevance: 7,
  },
  "Bulletproof": {
    name: "Bulletproof", category: "defensive",
    description: "Immune to ball and bomb moves (Shadow Ball, Sludge Bomb, etc.).",
    vgcRelevance: 6,
  },
  "Corrosion": {
    name: "Corrosion", category: "utility",
    description: "Can poison Steel and Poison types.",
    vgcRelevance: 5,
  },
  "Long Reach": {
    name: "Long Reach", category: "utility",
    description: "Moves don't make contact.",
    vgcRelevance: 4,
  },
  "Gale Wings": {
    name: "Gale Wings", category: "offensive",
    description: "Flying moves have +1 priority at full HP.",
    priorityBoost: { type: "flying", priority: 1 }, vgcRelevance: 7,
  },

  // ── CHAMPIONS-EXCLUSIVE ABILITIES ──────────────────────────────────────────
  "Aura Maximizer": {
    name: "Aura Maximizer", category: "champions",
    description: "Aura and Pulse moves deal 50% more damage and gain +1 priority.",
    damageMultiplier: 1.5, vgcRelevance: 9,
  },
  "Commander Surge": {
    name: "Commander Surge", category: "champions",
    description: "Dragon moves gain 30% power. On entry, boosts Sp.Atk by 1 stage.",
    damageMultiplier: 1.3, vgcRelevance: 8,
  },
  "Dragonize": {
    name: "Dragonize", category: "champions",
    description: "Normal-type moves become Dragon-type and gain 20% power.",
    vgcRelevance: 8,
  },
  "Drill Force": {
    name: "Drill Force", category: "champions",
    description: "Ground and Steel moves pierce through Protect for 25% damage.",
    vgcRelevance: 8,
  },
  "Earth Sovereign": {
    name: "Earth Sovereign", category: "champions",
    description: "Ground/Dragon moves ignore immunities. Summons sandstorm on Mega Evolution.",
    setsWeather: "sand", vgcRelevance: 9,
  },
  "Elder Wisdom": {
    name: "Elder Wisdom", category: "champions",
    description: "Grass moves restore 25% HP dealt. Status moves gain +1 priority.",
    vgcRelevance: 8,
  },
  "Frozen Veil": {
    name: "Frozen Veil", category: "champions",
    description: "Ice-type moves gain STAB even without being Ice type. Takes 50% less Ice damage.",
    vgcRelevance: 7,
  },
  "Mind Over Matter": {
    name: "Mind Over Matter", category: "champions",
    description: "Psychic moves use Sp.Def instead of Sp.Atk for damage calculation.",
    vgcRelevance: 7,
  },
  "Permafrost Fist": {
    name: "Permafrost Fist", category: "champions",
    description: "Punching moves become Ice-type and gain 30% power.",
    vgcRelevance: 8,
  },
  "Pixie Veil": {
    name: "Pixie Veil", category: "champions",
    description: "Fairy-type moves heal ally for 25% of damage dealt. Immune to Dragon.",
    typeImmunity: "dragon", vgcRelevance: 8,
  },
  "Prism Armor": {
    name: "Prism Armor", category: "champions",
    description: "Super-effective damage is reduced by 25%.",
    vgcRelevance: 8,
  },
  "Reckless Flame": {
    name: "Reckless Flame", category: "champions",
    description: "Fire moves deal 30% more damage but cost 5% max HP.",
    damageMultiplier: 1.3, vgcRelevance: 7,
  },
  "Razor Plating": {
    name: "Razor Plating", category: "champions",
    description: "Steel and Bug moves deal 30% more damage. +1 Defense on entry.",
    damageMultiplier: 1.3, vgcRelevance: 7,
  },
  "Sky High": {
    name: "Sky High", category: "champions",
    description: "Flying moves gain 30% power. Immune to Ground. Ignores weather damage.",
    damageMultiplier: 1.3, typeImmunity: "ground", vgcRelevance: 8,
  },
  "Spectral Doom": {
    name: "Spectral Doom", category: "champions",
    description: "Ghost moves bypass immunities and have 20% chance to disable the target's move.",
    damageMultiplier: 1.2, vgcRelevance: 9,
  },
  "Spice Rush": {
    name: "Spice Rush", category: "champions",
    description: "Speed doubles in sun. Fire moves gain 20% power.",
    weatherSpeed: "sun", vgcRelevance: 8,
  },
  "Supreme Commander": {
    name: "Supreme Commander", category: "champions",
    description: "Ally's moves deal 20% more damage. Boosts ally's highest stat by 1 on entry.",
    vgcRelevance: 9,
  },
  "Mega Sol": {
    name: "Mega Sol", category: "champions",
    description: "All moves used by this Pokémon behave as if under harsh sunlight.",
    personalWeather: "sun",
    vgcRelevance: 9,
  },
  "Mind Surge": {
    name: "Mind Surge", category: "champions",
    description: "Psychic moves gain 30% power. Sets Psychic Terrain on entry.",
    damageMultiplier: 1.3, vgcRelevance: 8,
  },
  "Toxic Crystallize": {
    name: "Toxic Crystallize", category: "champions",
    description: "Poison/Rock moves gain 30% power. Poison moves have 50% poison chance.",
    damageMultiplier: 1.3, vgcRelevance: 7,
  },
  "Volt Rush": {
    name: "Volt Rush", category: "champions",
    description: "Electric and Fighting moves gain 20% power. Speed increases by 1 stage after KO.",
    damageMultiplier: 1.2, vgcRelevance: 8,
  },
  "Zero To Hero": {
    name: "Zero To Hero", category: "form-change",
    description: "Transforms from Zero Form to Hero Form upon switching out and back in.",
    vgcRelevance: 8,
  },
};

/** Lookup ability effect */
export function getAbilityEffect(name: string): AbilityEffect | undefined {
  return ABILITY_DATA[name];
}

/** Does this ability set weather? */
export function isWeatherSetter(abilityName: string): boolean {
  return !!ABILITY_DATA[abilityName]?.setsWeather;
}

/** Does this ability provide type immunity? */
export function getTypeImmunity(abilityName: string): PokemonType | undefined {
  return ABILITY_DATA[abilityName]?.typeImmunity;
}

/** Get VGC relevance score */
export function getAbilityVGCScore(abilityName: string): number {
  return ABILITY_DATA[abilityName]?.vgcRelevance ?? 3;
}

/** Is this ability an Intimidate counter? */
export function isIntimidateImmune(abilityName: string): boolean {
  return ["Inner Focus", "Oblivious", "Own Tempo", "Clear Body", "Competitive", "Defiant", "Scrappy"].includes(abilityName);
}

/** Does this ability benefit from Intimidate being lowered? (Competitive, Defiant) */
export function benefitsFromIntimidate(abilityName: string): boolean {
  return abilityName === "Competitive" || abilityName === "Defiant";
}

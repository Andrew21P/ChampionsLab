// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - COMPETITIVE ITEMS ENGINE
// VGC-relevant held items with battle effects
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType } from "@/lib/types";

export interface ItemEffect {
  name: string;
  description: string;
  // Damage modifiers
  damageMultiplier?: number;        // Global damage boost (e.g., Life Orb 1.3)
  typeDamageBoost?: { type: PokemonType; multiplier: number }; // Type-specific boost
  categoryBoost?: { category: "physical" | "special"; multiplier: number };
  // Stat modifiers
  statBoost?: Partial<Record<"attack" | "defense" | "spAtk" | "spDef" | "speed", number>>;
  speedMultiplier?: number;
  // Defensive
  surviveAt1HP?: boolean;           // Focus Sash
  berryHealThreshold?: number;      // HP% threshold to activate
  berryHealAmount?: number;         // HP% restored
  statusImmunity?: string[];        // Lum Berry etc.
  // Mega Stone
  isMegaStone?: boolean;
  forPokemon?: string;
  // Other
  recoilPercent?: number;           // Life Orb recoil (10%)
  choiceLock?: boolean;             // Choice items
  resistBerry?: PokemonType;        // Halves damage from a type once
  priority?: string;                // Item priority effects
}

export const ITEMS: Record<string, ItemEffect> = {
  // ── Offensive Items ──────────────────────────────────────────────────────
  "Life Orb": {
    name: "Life Orb",
    description: "Boosts damage by 30% but costs 10% max HP per attacking move.",
    damageMultiplier: 1.3,
    recoilPercent: 10,
  },
  "Choice Band": {
    name: "Choice Band",
    description: "Boosts Attack by 50% but locks into one move.",
    categoryBoost: { category: "physical", multiplier: 1.5 },
    choiceLock: true,
  },
  "Choice Specs": {
    name: "Choice Specs",
    description: "Boosts Special Attack by 50% but locks into one move.",
    categoryBoost: { category: "special", multiplier: 1.5 },
    choiceLock: true,
  },
  "Choice Scarf": {
    name: "Choice Scarf",
    description: "Boosts Speed by 50% but locks into one move.",
    speedMultiplier: 1.5,
    choiceLock: true,
  },
  "Mystic Water": {
    name: "Mystic Water",
    description: "Boosts Water-type moves by 20%.",
    typeDamageBoost: { type: "water", multiplier: 1.2 },
  },
  "Charcoal": {
    name: "Charcoal",
    description: "Boosts Fire-type moves by 20%.",
    typeDamageBoost: { type: "fire", multiplier: 1.2 },
  },
  "Miracle Seed": {
    name: "Miracle Seed",
    description: "Boosts Grass-type moves by 20%.",
    typeDamageBoost: { type: "grass", multiplier: 1.2 },
  },
  "Magnet": {
    name: "Magnet",
    description: "Boosts Electric-type moves by 20%.",
    typeDamageBoost: { type: "electric", multiplier: 1.2 },
  },
  "Never-Melt Ice": {
    name: "Never-Melt Ice",
    description: "Boosts Ice-type moves by 20%.",
    typeDamageBoost: { type: "ice", multiplier: 1.2 },
  },
  "Black Belt": {
    name: "Black Belt",
    description: "Boosts Fighting-type moves by 20%.",
    typeDamageBoost: { type: "fighting", multiplier: 1.2 },
  },
  "Poison Barb": {
    name: "Poison Barb",
    description: "Boosts Poison-type moves by 20%.",
    typeDamageBoost: { type: "poison", multiplier: 1.2 },
  },
  "Soft Sand": {
    name: "Soft Sand",
    description: "Boosts Ground-type moves by 20%.",
    typeDamageBoost: { type: "ground", multiplier: 1.2 },
  },
  "Sharp Beak": {
    name: "Sharp Beak",
    description: "Boosts Flying-type moves by 20%.",
    typeDamageBoost: { type: "flying", multiplier: 1.2 },
  },
  "Twisted Spoon": {
    name: "Twisted Spoon",
    description: "Boosts Psychic-type moves by 20%.",
    typeDamageBoost: { type: "psychic", multiplier: 1.2 },
  },
  "Silver Powder": {
    name: "Silver Powder",
    description: "Boosts Bug-type moves by 20%.",
    typeDamageBoost: { type: "bug", multiplier: 1.2 },
  },
  "Hard Stone": {
    name: "Hard Stone",
    description: "Boosts Rock-type moves by 20%.",
    typeDamageBoost: { type: "rock", multiplier: 1.2 },
  },
  "Spell Tag": {
    name: "Spell Tag",
    description: "Boosts Ghost-type moves by 20%.",
    typeDamageBoost: { type: "ghost", multiplier: 1.2 },
  },
  "Dragon Fang": {
    name: "Dragon Fang",
    description: "Boosts Dragon-type moves by 20%.",
    typeDamageBoost: { type: "dragon", multiplier: 1.2 },
  },
  "Black Glasses": {
    name: "Black Glasses",
    description: "Boosts Dark-type moves by 20%.",
    typeDamageBoost: { type: "dark", multiplier: 1.2 },
  },
  "Metal Coat": {
    name: "Metal Coat",
    description: "Boosts Steel-type moves by 20%.",
    typeDamageBoost: { type: "steel", multiplier: 1.2 },
  },
  "Expert Belt": {
    name: "Expert Belt",
    description: "Boosts super-effective moves by 20%.",
    damageMultiplier: 1.2, // applied only when SE
  },

  // ── Defensive Items ──────────────────────────────────────────────────────
  "Focus Sash": {
    name: "Focus Sash",
    description: "Survives any single hit at 1 HP when at full HP. Single use.",
    surviveAt1HP: true,
  },
  "Assault Vest": {
    name: "Assault Vest",
    description: "Boosts Special Defense by 50% but prevents status moves.",
    statBoost: { spDef: 1.5 },
  },
  "Eviolite": {
    name: "Eviolite",
    description: "Boosts Defense and Sp.Def by 50% for unevolved Pokémon.",
    statBoost: { defense: 1.5, spDef: 1.5 },
  },
  "Leftovers": {
    name: "Leftovers",
    description: "Restores 1/16 max HP each turn.",
  },
  "Sitrus Berry": {
    name: "Sitrus Berry",
    description: "Restores 25% max HP when HP falls below 50%.",
    berryHealThreshold: 50,
    berryHealAmount: 25,
  },
  "Lum Berry": {
    name: "Lum Berry",
    description: "Cures any status condition once.",
    statusImmunity: ["burn", "freeze", "paralysis", "poison", "sleep", "confusion"],
  },

  // ── Resist Berries ───────────────────────────────────────────────────────
  "Occa Berry":   { name: "Occa Berry",   description: "Halves super-effective Fire damage once.", resistBerry: "fire" },
  "Passho Berry": { name: "Passho Berry", description: "Halves super-effective Water damage once.", resistBerry: "water" },
  "Wacan Berry":  { name: "Wacan Berry",  description: "Halves super-effective Electric damage once.", resistBerry: "electric" },
  "Rindo Berry":  { name: "Rindo Berry",  description: "Halves super-effective Grass damage once.", resistBerry: "grass" },
  "Yache Berry":  { name: "Yache Berry",  description: "Halves super-effective Ice damage once.", resistBerry: "ice" },
  "Chople Berry": { name: "Chople Berry", description: "Halves super-effective Fighting damage once.", resistBerry: "fighting" },
  "Shuca Berry":  { name: "Shuca Berry",  description: "Halves super-effective Ground damage once.", resistBerry: "ground" },
  "Coba Berry":   { name: "Coba Berry",   description: "Halves super-effective Flying damage once.", resistBerry: "flying" },
  "Kasib Berry":  { name: "Kasib Berry",  description: "Halves super-effective Ghost damage once.", resistBerry: "ghost" },
  "Haban Berry":  { name: "Haban Berry",  description: "Halves super-effective Dragon damage once.", resistBerry: "dragon" },
  "Roseli Berry": { name: "Roseli Berry",  description: "Halves super-effective Fairy damage once.", resistBerry: "fairy" },

  // ── Utility Items ────────────────────────────────────────────────────────
  "Safety Goggles": {
    name: "Safety Goggles",
    description: "Protects from weather damage and powder moves.",
  },
  "Covert Cloak": {
    name: "Covert Cloak",
    description: "Protects from secondary effects of moves.",
  },
  "Clear Amulet": {
    name: "Clear Amulet",
    description: "Prevents stat reduction from other Pokémon's moves or abilities.",
  },
  "Wide Lens": {
    name: "Wide Lens",
    description: "Boosts move accuracy by 10%.",
  },
  "Scope Lens": {
    name: "Scope Lens",
    description: "Boosts critical hit ratio by one stage.",
  },
  "Rocky Helmet": {
    name: "Rocky Helmet",
    description: "Damages attacker for 1/6 max HP on contact.",
  },
  "Light Clay": {
    name: "Light Clay",
    description: "Extends Light Screen and Reflect from 5 to 8 turns.",
  },
  "Terrain Extender": {
    name: "Terrain Extender",
    description: "Extends terrain from 5 to 8 turns.",
  },
  "Loaded Dice": {
    name: "Loaded Dice",
    description: "Multi-hit moves always hit 4-5 times.",
  },
  "Throat Spray": {
    name: "Throat Spray",
    description: "Raises Sp.Atk by one stage after using a sound move.",
  },
  "White Herb": {
    name: "White Herb",
    description: "Restores lowered stats once.",
  },
  "Mental Herb": {
    name: "Mental Herb",
    description: "Cures infatuation, Taunt, Encore, Torment, Disable, and Heal Block once.",
  },
  "Weakness Policy": {
    name: "Weakness Policy",
    description: "Raises Attack and Sp.Atk by 2 stages when hit by a super-effective move.",
    statBoost: { attack: 2, spAtk: 2 },
  },
  "Booster Energy": {
    name: "Booster Energy",
    description: "Activates Protosynthesis or Quark Drive ability effect.",
  },
  "Adrenaline Orb": {
    name: "Adrenaline Orb",
    description: "Raises Speed by one stage when Intimidated.",
  },
};

/** Get item damage multiplier for a move */
export function getItemDamageMultiplier(
  itemName: string,
  moveType: PokemonType,
  moveCat: "physical" | "special" | "status",
  isSuperEffective: boolean
): number {
  const item = ITEMS[itemName];
  if (!item) return 1;

  let mult = 1;

  if (item.damageMultiplier) {
    if (itemName === "Expert Belt") {
      if (isSuperEffective) mult *= item.damageMultiplier;
    } else {
      mult *= item.damageMultiplier;
    }
  }

  if (item.typeDamageBoost && item.typeDamageBoost.type === moveType) {
    mult *= item.typeDamageBoost.multiplier;
  }

  if (item.categoryBoost && item.categoryBoost.category === moveCat) {
    mult *= item.categoryBoost.multiplier;
  }

  return mult;
}

/** Get speed multiplier from item */
export function getItemSpeedMultiplier(itemName: string): number {
  return ITEMS[itemName]?.speedMultiplier ?? 1;
}

/** All available item names */
export function getAllItems(): string[] {
  return Object.keys(ITEMS);
}

/** Suggest best items for a given role */
export function suggestItems(role: "physical-attacker" | "special-attacker" | "support" | "tank" | "sweeper"): string[] {
  switch (role) {
    case "physical-attacker":
      return ["Choice Band", "Life Orb", "Assault Vest", "Lum Berry"];
    case "special-attacker":
      return ["Choice Specs", "Life Orb", "Assault Vest", "Focus Sash"];
    case "support":
      return ["Sitrus Berry", "Mental Herb", "Safety Goggles", "Light Clay", "Focus Sash"];
    case "tank":
      return ["Assault Vest", "Sitrus Berry", "Leftovers", "Rocky Helmet"];
    case "sweeper":
      return ["Life Orb", "Focus Sash", "Choice Scarf", "Weakness Policy"];
  }
}

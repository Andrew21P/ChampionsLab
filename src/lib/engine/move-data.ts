// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - COMPREHENSIVE VGC MOVE DATABASE
// Every competitive move with priority, targeting, flags, and effects
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType } from "@/lib/types";

export type MoveCategory = "physical" | "special" | "status";
export type MoveTarget =
  | "normal"           // single adjacent target
  | "allAdjacentFoes"  // both opponents in doubles (spread)
  | "allAdjacent"      // all adjacent including ally (spread)
  | "self"             // user only
  | "adjacentAlly"     // single ally
  | "allySide"         // user's side of the field
  | "foeSide"          // opponent's side
  | "all"              // entire field;

export interface MoveFlags {
  contact?: boolean;    // makes contact (Rough Skin, Rocky Helmet)
  sound?: boolean;      // sound-based (bypasses Substitute)
  bullet?: boolean;     // ball/bomb move (Bulletproof)
  punch?: boolean;      // punching move (Iron Fist)
  bite?: boolean;       // biting move (Strong Jaw)
  slicing?: boolean;    // cutting move (Sharpness)
  wind?: boolean;       // wind move (Wind Rider)
  powder?: boolean;     // powder move (Safety Goggles, Grass immune)
  pulse?: boolean;      // aura/pulse move (Mega Launcher)
  recoil?: number;      // recoil % of damage dealt
  drain?: number;       // drain % of damage dealt (heal)
  protect?: boolean;    // is a Protect variant
  priority?: boolean;   // is a priority move
}

export interface SecondaryEffect {
  chance: number;       // % chance (100 = guaranteed)
  status?: "burn" | "freeze" | "paralysis" | "poison" | "badPoison" | "sleep";
  volatileStatus?: "flinch" | "confusion" | "attract";
  boosts?: Partial<Record<"attack" | "defense" | "spAtk" | "spDef" | "speed" | "accuracy" | "evasion", number>>;
  self?: boolean;       // applies to user instead of target
}

export interface EngineMove {
  name: string;
  type: PokemonType;
  category: MoveCategory;
  basePower: number;    // 0 for status moves
  accuracy: number;     // 0 for always-hit moves (like Aerial Ace, Aura Sphere)
  pp: number;
  priority: number;     // -7 to +5 (Trick Room -7, Protect +4, ExtremeSpeed +2, etc.)
  target: MoveTarget;
  flags: MoveFlags;
  secondary?: SecondaryEffect;
  /** Special behavior description for simulation */
  effect?: string;
  /** Does this move set weather/terrain? */
  fieldEffect?: string;
  /** Stat changes to self */
  selfBoost?: Partial<Record<"attack" | "defense" | "spAtk" | "spDef" | "speed" | "accuracy" | "evasion", number>>;
  /** Number of multi-hits (Population Bomb, Pin Missile, etc.) */
  multiHit?: [number, number]; // [min, max]
  /** Ignores abilities? */
  ignoresAbility?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOVE DATABASE - Comprehensive VGC move data
// ═══════════════════════════════════════════════════════════════════════════════
export const MOVE_DATA: Record<string, EngineMove> = {
  // ── NORMAL ─────────────────────────────────────────────────────────────────
  "Body Slam": {
    name: "Body Slam", type: "normal", category: "physical", basePower: 85,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 30, status: "paralysis" },
  },
  "Double-Edge": {
    name: "Double-Edge", type: "normal", category: "physical", basePower: 120,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, recoil: 33 },
  },
  "Extreme Speed": {
    name: "Extreme Speed", type: "normal", category: "physical", basePower: 80,
    accuracy: 100, pp: 5, priority: 2, target: "normal",
    flags: { contact: true, priority: true },
  },
  "Facade": {
    name: "Facade", type: "normal", category: "physical", basePower: 70,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Doubles power when burned, poisoned, or paralyzed.",
  },
  "Fake Out": {
    name: "Fake Out", type: "normal", category: "physical", basePower: 40,
    accuracy: 100, pp: 10, priority: 3, target: "normal",
    flags: { contact: true, priority: true },
    secondary: { chance: 100, volatileStatus: "flinch" },
    effect: "Only works on the first turn after switching in.",
  },
  "Headbutt": {
    name: "Headbutt", type: "normal", category: "physical", basePower: 70,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 30, volatileStatus: "flinch" },
  },
  "Hyper Beam": {
    name: "Hyper Beam", type: "normal", category: "special", basePower: 150,
    accuracy: 90, pp: 5, priority: 0, target: "normal",
    flags: {},
    effect: "Must recharge next turn.",
  },
  "Hyper Voice": {
    name: "Hyper Voice", type: "normal", category: "special", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "allAdjacentFoes",
    flags: { sound: true },
  },
  "Population Bomb": {
    name: "Population Bomb", type: "normal", category: "physical", basePower: 20,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    multiHit: [1, 10],
  },
  "Quick Attack": {
    name: "Quick Attack", type: "normal", category: "physical", basePower: 40,
    accuracy: 100, pp: 30, priority: 1, target: "normal",
    flags: { contact: true, priority: true },
  },
  "Rapid Spin": {
    name: "Rapid Spin", type: "normal", category: "physical", basePower: 50,
    accuracy: 100, pp: 40, priority: 0, target: "normal",
    flags: { contact: true },
    selfBoost: { speed: 1 },
    effect: "Removes hazards and trapping effects.",
  },
  "Return": {
    name: "Return", type: "normal", category: "physical", basePower: 102,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
  },
  "Super Fang": {
    name: "Super Fang", type: "normal", category: "physical", basePower: 0,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Deals damage equal to 50% of target's current HP.",
  },
  "Thrash": {
    name: "Thrash", type: "normal", category: "physical", basePower: 120,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Attacks for 2-3 turns, then confused.",
  },

  // ── FIRE ───────────────────────────────────────────────────────────────────
  "Eruption": {
    name: "Eruption", type: "fire", category: "special", basePower: 150,
    accuracy: 100, pp: 5, priority: 0, target: "allAdjacentFoes",
    flags: {},
    effect: "Power scales with user's remaining HP (150 × current/max).",
  },
  "Fire Blast": {
    name: "Fire Blast", type: "fire", category: "special", basePower: 110,
    accuracy: 85, pp: 5, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, status: "burn" },
  },
  "Fire Punch": {
    name: "Fire Punch", type: "fire", category: "physical", basePower: 75,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, punch: true },
    secondary: { chance: 10, status: "burn" },
  },
  "Flamethrower": {
    name: "Flamethrower", type: "fire", category: "special", basePower: 90,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, status: "burn" },
  },
  "Flare Blitz": {
    name: "Flare Blitz", type: "fire", category: "physical", basePower: 120,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, recoil: 33 },
    secondary: { chance: 10, status: "burn" },
  },
  "Heat Wave": {
    name: "Heat Wave", type: "fire", category: "special", basePower: 95,
    accuracy: 90, pp: 10, priority: 0, target: "allAdjacentFoes",
    flags: {},
    secondary: { chance: 10, status: "burn" },
  },
  "Overheat": {
    name: "Overheat", type: "fire", category: "special", basePower: 130,
    accuracy: 90, pp: 5, priority: 0, target: "normal",
    flags: {},
    selfBoost: { spAtk: -2 },
  },
  "Will-O-Wisp": {
    name: "Will-O-Wisp", type: "fire", category: "status", basePower: 0,
    accuracy: 85, pp: 15, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 100, status: "burn" },
  },
  "Armor Cannon": {
    name: "Armor Cannon", type: "fire", category: "special", basePower: 120,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: {},
    selfBoost: { defense: -1, spDef: -1 },
  },
  "Sunny Day": {
    name: "Sunny Day", type: "fire", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "all",
    flags: {},
    fieldEffect: "sun",
  },
  "Matcha Gotcha": {
    name: "Matcha Gotcha", type: "grass", category: "special", basePower: 80,
    accuracy: 90, pp: 15, priority: 0, target: "allAdjacentFoes",
    flags: { drain: 50 },
    secondary: { chance: 20, status: "burn" },
  },

  // ── WATER ──────────────────────────────────────────────────────────────────
  "Aqua Jet": {
    name: "Aqua Jet", type: "water", category: "physical", basePower: 40,
    accuracy: 100, pp: 20, priority: 1, target: "normal",
    flags: { contact: true, priority: true },
  },
  "Hydro Pump": {
    name: "Hydro Pump", type: "water", category: "special", basePower: 110,
    accuracy: 80, pp: 5, priority: 0, target: "normal",
    flags: {},
  },
  "Liquidation": {
    name: "Liquidation", type: "water", category: "physical", basePower: 85,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 20, boosts: { defense: -1 } },
  },
  "Muddy Water": {
    name: "Muddy Water", type: "water", category: "special", basePower: 90,
    accuracy: 85, pp: 10, priority: 0, target: "allAdjacentFoes",
    flags: {},
    secondary: { chance: 30, boosts: { accuracy: -1 } },
  },
  "Scald": {
    name: "Scald", type: "water", category: "special", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 30, status: "burn" },
  },
  "Surf": {
    name: "Surf", type: "water", category: "special", basePower: 90,
    accuracy: 100, pp: 15, priority: 0, target: "allAdjacent",
    flags: {},
  },
  "Waterfall": {
    name: "Waterfall", type: "water", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 20, volatileStatus: "flinch" },
  },
  "Flip Turn": {
    name: "Flip Turn", type: "water", category: "physical", basePower: 60,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Switches out after attacking.",
  },
  "Water Pulse": {
    name: "Water Pulse", type: "water", category: "special", basePower: 60,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { pulse: true },
    secondary: { chance: 20, volatileStatus: "confusion" },
  },
  "Wave Crash": {
    name: "Wave Crash", type: "water", category: "physical", basePower: 120,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, recoil: 33 },
  },
  "Jet Punch": {
    name: "Jet Punch", type: "water", category: "physical", basePower: 60,
    accuracy: 100, pp: 15, priority: 1, target: "normal",
    flags: { contact: true, punch: true, priority: true },
  },
  "Razor Shell": {
    name: "Razor Shell", type: "water", category: "physical", basePower: 75,
    accuracy: 95, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    secondary: { chance: 50, boosts: { defense: -1 } },
  },
  "Weather Ball": {
    name: "Weather Ball", type: "normal", category: "special", basePower: 50,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { bullet: true },
    effect: "Type and power change in weather (100 BP, weather type).",
  },

  // ── ELECTRIC ───────────────────────────────────────────────────────────────
  "Thunderbolt": {
    name: "Thunderbolt", type: "electric", category: "special", basePower: 90,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, status: "paralysis" },
  },
  "Thunder": {
    name: "Thunder", type: "electric", category: "special", basePower: 110,
    accuracy: 70, pp: 10, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 30, status: "paralysis" },
    effect: "Never misses in rain.",
  },
  "Thunder Wave": {
    name: "Thunder Wave", type: "electric", category: "status", basePower: 0,
    accuracy: 90, pp: 20, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 100, status: "paralysis" },
  },
  "Thunder Punch": {
    name: "Thunder Punch", type: "electric", category: "physical", basePower: 75,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, punch: true },
    secondary: { chance: 10, status: "paralysis" },
  },
  "Volt Switch": {
    name: "Volt Switch", type: "electric", category: "special", basePower: 70,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: {},
    effect: "User switches out after attacking.",
  },
  "Wild Charge": {
    name: "Wild Charge", type: "electric", category: "physical", basePower: 90,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, recoil: 25 },
  },
  "Volt Tackle": {
    name: "Volt Tackle", type: "electric", category: "physical", basePower: 120,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, recoil: 33 },
    secondary: { chance: 10, status: "paralysis" },
  },
  "Nuzzle": {
    name: "Nuzzle", type: "electric", category: "physical", basePower: 20,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 100, status: "paralysis" },
  },
  "Electro Shot": {
    name: "Electro Shot", type: "electric", category: "special", basePower: 130,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    selfBoost: { spAtk: 1 },
    effect: "Charges turn 1 (boost SpA), fires turn 2. Instant in rain.",
  },
  "Double Shock": {
    name: "Double Shock", type: "electric", category: "physical", basePower: 120,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "User loses Electric type after use.",
  },

  // ── GRASS ──────────────────────────────────────────────────────────────────
  "Energy Ball": {
    name: "Energy Ball", type: "grass", category: "special", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { bullet: true },
    secondary: { chance: 10, boosts: { spDef: -1 } },
  },
  "Giga Drain": {
    name: "Giga Drain", type: "grass", category: "special", basePower: 75,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { drain: 50 },
  },
  "Grass Knot": {
    name: "Grass Knot", type: "grass", category: "special", basePower: 80,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Power based on target's weight (20-120 BP). Defaults to 80.",
  },
  "Leaf Blade": {
    name: "Leaf Blade", type: "grass", category: "physical", basePower: 90,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    effect: "High critical hit ratio.",
  },
  "Leaf Storm": {
    name: "Leaf Storm", type: "grass", category: "special", basePower: 130,
    accuracy: 90, pp: 5, priority: 0, target: "normal",
    flags: {},
    selfBoost: { spAtk: -2 },
  },
  "Power Whip": {
    name: "Power Whip", type: "grass", category: "physical", basePower: 120,
    accuracy: 85, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
  },
  "Sleep Powder": {
    name: "Sleep Powder", type: "grass", category: "status", basePower: 0,
    accuracy: 75, pp: 15, priority: 0, target: "normal",
    flags: { powder: true },
    secondary: { chance: 100, status: "sleep" },
  },
  "Solar Beam": {
    name: "Solar Beam", type: "grass", category: "special", basePower: 120,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Charges turn 1, fires turn 2. Instant in sun.",
  },
  "Leech Seed": {
    name: "Leech Seed", type: "grass", category: "status", basePower: 0,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Drains 1/8 max HP per turn. Fails on Grass types.",
  },
  "Spiky Shield": {
    name: "Spiky Shield", type: "grass", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 4, target: "self",
    flags: { protect: true, priority: true },
    effect: "Protects and damages contact attackers for 1/8 HP.",
  },
  "Wood Hammer": {
    name: "Wood Hammer", type: "grass", category: "physical", basePower: 120,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, recoil: 33 },
  },
  "Flower Trick": {
    name: "Flower Trick", type: "grass", category: "physical", basePower: 70,
    accuracy: 0, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Never misses, always crits.",
  },
  "Seed Bomb": {
    name: "Seed Bomb", type: "grass", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { bullet: true },
  },

  // ── ICE ────────────────────────────────────────────────────────────────────
  "Blizzard": {
    name: "Blizzard", type: "ice", category: "special", basePower: 110,
    accuracy: 70, pp: 5, priority: 0, target: "allAdjacentFoes",
    flags: {},
    secondary: { chance: 10, status: "freeze" },
    effect: "Never misses in hail.",
  },
  "Freeze-Dry": {
    name: "Freeze-Dry", type: "ice", category: "special", basePower: 70,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: {},
    effect: "Super effective against Water types regardless of type chart.",
    secondary: { chance: 10, status: "freeze" },
  },
  "Ice Beam": {
    name: "Ice Beam", type: "ice", category: "special", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, status: "freeze" },
  },
  "Ice Fang": {
    name: "Ice Fang", type: "ice", category: "physical", basePower: 65,
    accuracy: 95, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, bite: true },
    secondary: { chance: 10, status: "freeze" },
  },
  "Ice Hammer": {
    name: "Ice Hammer", type: "ice", category: "physical", basePower: 100,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, punch: true },
    selfBoost: { speed: -1 },
  },
  "Ice Punch": {
    name: "Ice Punch", type: "ice", category: "physical", basePower: 75,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, punch: true },
    secondary: { chance: 10, status: "freeze" },
  },
  "Icy Wind": {
    name: "Icy Wind", type: "ice", category: "special", basePower: 55,
    accuracy: 95, pp: 15, priority: 0, target: "allAdjacentFoes",
    flags: { wind: true },
    secondary: { chance: 100, boosts: { speed: -1 } },
  },
  "Triple Axel": {
    name: "Triple Axel", type: "ice", category: "physical", basePower: 20,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    multiHit: [3, 3],
    effect: "Hits 3 times with increasing power (20, 40, 60).",
  },
  "Aurora Veil": {
    name: "Aurora Veil", type: "ice", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "allySide",
    flags: {},
    effect: "Halves damage from both physical and special attacks for 5 turns. Only works in hail/snow.",
  },

  // ── FIGHTING ───────────────────────────────────────────────────────────────
  "Aura Sphere": {
    name: "Aura Sphere", type: "fighting", category: "special", basePower: 80,
    accuracy: 0, pp: 20, priority: 0, target: "normal",
    flags: { pulse: true, bullet: true },
  },
  "Bullet Punch": {
    name: "Bullet Punch", type: "steel", category: "physical", basePower: 40,
    accuracy: 100, pp: 30, priority: 1, target: "normal",
    flags: { contact: true, punch: true, priority: true },
  },
  "Close Combat": {
    name: "Close Combat", type: "fighting", category: "physical", basePower: 120,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: { contact: true },
    selfBoost: { defense: -1, spDef: -1 },
  },
  "Coaching": {
    name: "Coaching", type: "fighting", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "adjacentAlly",
    flags: {},
    effect: "Raises ally's Attack and Defense by 1 stage each.",
  },
  "Counter": {
    name: "Counter", type: "fighting", category: "physical", basePower: 0,
    accuracy: 100, pp: 20, priority: -5, target: "self",
    flags: { contact: true },
    effect: "Returns 2× physical damage received this turn.",
  },
  "Drain Punch": {
    name: "Drain Punch", type: "fighting", category: "physical", basePower: 75,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, punch: true, drain: 50 },
  },
  "Focus Blast": {
    name: "Focus Blast", type: "fighting", category: "special", basePower: 120,
    accuracy: 70, pp: 5, priority: 0, target: "normal",
    flags: { bullet: true },
    secondary: { chance: 10, boosts: { spDef: -1 } },
  },
  "High Jump Kick": {
    name: "High Jump Kick", type: "fighting", category: "physical", basePower: 130,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "User takes 50% max HP crash damage on miss.",
  },
  "Low Kick": {
    name: "Low Kick", type: "fighting", category: "physical", basePower: 80,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Power based on target's weight (20-120 BP). Defaults to 80.",
  },
  "Mach Punch": {
    name: "Mach Punch", type: "fighting", category: "physical", basePower: 40,
    accuracy: 100, pp: 30, priority: 1, target: "normal",
    flags: { contact: true, punch: true, priority: true },
  },
  "Sacred Sword": {
    name: "Sacred Sword", type: "fighting", category: "physical", basePower: 90,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    effect: "Ignores target's stat changes.",
  },
  "Superpower": {
    name: "Superpower", type: "fighting", category: "physical", basePower: 120,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: { contact: true },
    selfBoost: { attack: -1, defense: -1 },
  },
  "Vacuum Wave": {
    name: "Vacuum Wave", type: "fighting", category: "special", basePower: 40,
    accuracy: 100, pp: 30, priority: 1, target: "normal",
    flags: { priority: true },
  },
  "Power-Up Punch": {
    name: "Power-Up Punch", type: "fighting", category: "physical", basePower: 40,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true, punch: true },
    selfBoost: { attack: 1 },
  },
  "Arm Thrust": {
    name: "Arm Thrust", type: "fighting", category: "physical", basePower: 15,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    multiHit: [2, 5],
  },
  "Mat Block": {
    name: "Mat Block", type: "fighting", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "allySide",
    flags: {},
    effect: "Protects the user's side from damaging moves. Only works on first turn after switch-in.",
  },
  "Megahorn": {
    name: "Megahorn", type: "bug", category: "physical", basePower: 120,
    accuracy: 85, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
  },

  // ── POISON ─────────────────────────────────────────────────────────────────
  "Poison Jab": {
    name: "Poison Jab", type: "poison", category: "physical", basePower: 80,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 30, status: "poison" },
  },
  "Sludge Bomb": {
    name: "Sludge Bomb", type: "poison", category: "special", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { bullet: true },
    secondary: { chance: 30, status: "poison" },
  },
  "Sludge Wave": {
    name: "Sludge Wave", type: "poison", category: "special", basePower: 95,
    accuracy: 100, pp: 10, priority: 0, target: "allAdjacent",
    flags: {},
    secondary: { chance: 10, status: "poison" },
  },
  "Toxic": {
    name: "Toxic", type: "poison", category: "status", basePower: 0,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 100, status: "badPoison" },
  },
  "Baneful Bunker": {
    name: "Baneful Bunker", type: "poison", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 4, target: "self",
    flags: { protect: true, priority: true },
    effect: "Protects and poisons contact attackers.",
  },

  // ── GROUND ─────────────────────────────────────────────────────────────────
  "Earthquake": {
    name: "Earthquake", type: "ground", category: "physical", basePower: 100,
    accuracy: 100, pp: 10, priority: 0, target: "allAdjacent",
    flags: {},
  },
  "High Horsepower": {
    name: "High Horsepower", type: "ground", category: "physical", basePower: 95,
    accuracy: 95, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
  },
  "Headlong Rush": {
    name: "Headlong Rush", type: "ground", category: "physical", basePower: 120,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: { contact: true, punch: true },
    selfBoost: { defense: -1, spDef: -1 },
  },
  "Earth Power": {
    name: "Earth Power", type: "ground", category: "special", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, boosts: { spDef: -1 } },
  },
  "Stomping Tantrum": {
    name: "Stomping Tantrum", type: "ground", category: "physical", basePower: 75,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Doubles power if user's last move failed.",
  },

  // ── FLYING ─────────────────────────────────────────────────────────────────
  "Acrobatics": {
    name: "Acrobatics", type: "flying", category: "physical", basePower: 55,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Doubles power if user has no held item.",
  },
  "Air Slash": {
    name: "Air Slash", type: "flying", category: "special", basePower: 75,
    accuracy: 95, pp: 15, priority: 0, target: "normal",
    flags: { slicing: true },
    secondary: { chance: 30, volatileStatus: "flinch" },
  },
  "Brave Bird": {
    name: "Brave Bird", type: "flying", category: "physical", basePower: 120,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, recoil: 33 },
  },
  "Hurricane": {
    name: "Hurricane", type: "flying", category: "special", basePower: 110,
    accuracy: 70, pp: 10, priority: 0, target: "normal",
    flags: { wind: true },
    secondary: { chance: 30, volatileStatus: "confusion" },
    effect: "Never misses in rain.",
  },
  "Tailwind": {
    name: "Tailwind", type: "flying", category: "status", basePower: 0,
    accuracy: 0, pp: 15, priority: 0, target: "allySide",
    flags: { wind: true },
    effect: "Doubles Speed for user's side for 4 turns.",
  },

  // ── PSYCHIC ────────────────────────────────────────────────────────────────
  "Psychic": {
    name: "Psychic", type: "psychic", category: "special", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, boosts: { spDef: -1 } },
  },
  "Psyshock": {
    name: "Psyshock", type: "psychic", category: "special", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Targets Defense instead of Sp.Def.",
  },
  "Trick Room": {
    name: "Trick Room", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: -7, target: "all",
    flags: {},
    fieldEffect: "trickroom",
    effect: "Reverses move order (slower Pokémon move first) for 5 turns.",
  },
  "Ally Switch": {
    name: "Ally Switch", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 15, priority: 1, target: "self",
    flags: { priority: true },
    effect: "Swaps position with ally.",
  },
  "Heal Pulse": {
    name: "Heal Pulse", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "normal",
    flags: { pulse: true },
    effect: "Heals target for 50% max HP.",
  },
  "Instruct": {
    name: "Instruct", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 15, priority: 0, target: "normal",
    flags: {},
    effect: "Target uses its last move again.",
  },
  "Expanding Force": {
    name: "Expanding Force", type: "psychic", category: "special", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "In Psychic Terrain, hits all foes and power increases to 120.",
  },

  // ── BUG ────────────────────────────────────────────────────────────────────
  "Bug Bite": {
    name: "Bug Bite", type: "bug", category: "physical", basePower: 60,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Eats target's held berry.",
  },
  "U-turn": {
    name: "U-turn", type: "bug", category: "physical", basePower: 70,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Switches out after attacking.",
  },
  "X-Scissor": {
    name: "X-Scissor", type: "bug", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
  },
  "Pin Missile": {
    name: "Pin Missile", type: "bug", category: "physical", basePower: 25,
    accuracy: 95, pp: 20, priority: 0, target: "normal",
    flags: {},
    multiHit: [2, 5],
  },
  "First Impression": {
    name: "First Impression", type: "bug", category: "physical", basePower: 90,
    accuracy: 100, pp: 10, priority: 2, target: "normal",
    flags: { contact: true, priority: true },
    effect: "Only works on the first turn after switching in.",
  },
  "Pollen Puff": {
    name: "Pollen Puff", type: "bug", category: "special", basePower: 90,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { bullet: true },
    effect: "Heals ally for 50% max HP instead of dealing damage.",
  },

  // ── ROCK ───────────────────────────────────────────────────────────────────
  "Rock Slide": {
    name: "Rock Slide", type: "rock", category: "physical", basePower: 75,
    accuracy: 90, pp: 10, priority: 0, target: "allAdjacentFoes",
    flags: {},
    secondary: { chance: 30, volatileStatus: "flinch" },
  },
  "Stone Edge": {
    name: "Stone Edge", type: "rock", category: "physical", basePower: 100,
    accuracy: 80, pp: 5, priority: 0, target: "normal",
    flags: {},
    effect: "High critical hit ratio.",
  },
  "Stealth Rock": {
    name: "Stealth Rock", type: "rock", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "foeSide",
    flags: {},
    effect: "Damages Pokémon switching in based on type effectiveness to Rock.",
  },
  "Rock Blast": {
    name: "Rock Blast", type: "rock", category: "physical", basePower: 25,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: {},
    multiHit: [2, 5],
  },
  "Power Gem": {
    name: "Power Gem", type: "rock", category: "special", basePower: 80,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: {},
  },
  "Stone Axe": {
    name: "Stone Axe", type: "rock", category: "physical", basePower: 65,
    accuracy: 90, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    effect: "Sets Stealth Rock on the opponent's side.",
  },
  "Ancient Power": {
    name: "Ancient Power", type: "rock", category: "special", basePower: 60,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, boosts: { attack: 1, defense: 1, spAtk: 1, spDef: 1, speed: 1 }, self: true },
  },

  // ── GHOST ──────────────────────────────────────────────────────────────────
  "Shadow Ball": {
    name: "Shadow Ball", type: "ghost", category: "special", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { bullet: true },
    secondary: { chance: 20, boosts: { spDef: -1 } },
  },
  "Shadow Claw": {
    name: "Shadow Claw", type: "ghost", category: "physical", basePower: 70,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "High critical hit ratio.",
  },
  "Shadow Sneak": {
    name: "Shadow Sneak", type: "ghost", category: "physical", basePower: 40,
    accuracy: 100, pp: 30, priority: 1, target: "normal",
    flags: { contact: true, priority: true },
  },
  "Phantom Force": {
    name: "Phantom Force", type: "ghost", category: "physical", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Disappears turn 1, attacks turn 2. Bypasses Protect.",
  },
  "Destiny Bond": {
    name: "Destiny Bond", type: "ghost", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "If user faints next turn, attacker also faints.",
  },
  "Spirit Shackle": {
    name: "Spirit Shackle", type: "ghost", category: "physical", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Prevents target from switching out.",
  },

  // ── DRAGON ─────────────────────────────────────────────────────────────────
  "Draco Meteor": {
    name: "Draco Meteor", type: "dragon", category: "special", basePower: 130,
    accuracy: 90, pp: 5, priority: 0, target: "normal",
    flags: {},
    selfBoost: { spAtk: -2 },
  },
  "Dragon Claw": {
    name: "Dragon Claw", type: "dragon", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
  },
  "Dragon Dance": {
    name: "Dragon Dance", type: "dragon", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 1, speed: 1 },
  },
  "Dragon Darts": {
    name: "Dragon Darts", type: "dragon", category: "physical", basePower: 50,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    multiHit: [2, 2],
    effect: "In doubles, hits each opponent once.",
  },
  "Dragon Pulse": {
    name: "Dragon Pulse", type: "dragon", category: "special", basePower: 85,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { pulse: true },
  },
  "Clanging Scales": {
    name: "Clanging Scales", type: "dragon", category: "special", basePower: 110,
    accuracy: 100, pp: 5, priority: 0, target: "allAdjacentFoes",
    flags: { sound: true },
    selfBoost: { defense: -1 },
  },
  "Dire Claw": {
    name: "Dire Claw", type: "poison", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "50% chance to poison, paralyze, or sleep target.",
  },

  // ── DARK ───────────────────────────────────────────────────────────────────
  "Crunch": {
    name: "Crunch", type: "dark", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, bite: true },
    secondary: { chance: 20, boosts: { defense: -1 } },
  },
  "Dark Pulse": {
    name: "Dark Pulse", type: "dark", category: "special", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { pulse: true },
    secondary: { chance: 20, volatileStatus: "flinch" },
  },
  "Foul Play": {
    name: "Foul Play", type: "dark", category: "physical", basePower: 95,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Uses target's Attack stat instead of user's.",
  },
  "Knock Off": {
    name: "Knock Off", type: "dark", category: "physical", basePower: 65,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Removes target's held item. 50% power boost if target has an item (97.5 BP).",
  },
  "Night Slash": {
    name: "Night Slash", type: "dark", category: "physical", basePower: 70,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    effect: "High critical hit ratio.",
  },
  "Snarl": {
    name: "Snarl", type: "dark", category: "special", basePower: 55,
    accuracy: 95, pp: 15, priority: 0, target: "allAdjacentFoes",
    flags: { sound: true },
    secondary: { chance: 100, boosts: { spAtk: -1 } },
  },
  "Sucker Punch": {
    name: "Sucker Punch", type: "dark", category: "physical", basePower: 70,
    accuracy: 100, pp: 5, priority: 1, target: "normal",
    flags: { contact: true, priority: true },
    effect: "Fails if target is not attacking.",
  },
  "Taunt": {
    name: "Taunt", type: "dark", category: "status", basePower: 0,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: {},
    effect: "Prevents target from using status moves for 3 turns.",
  },
  "Beat Up": {
    name: "Beat Up", type: "dark", category: "physical", basePower: 0,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Hits once for each party Pokémon. Base power = (Party member's base Atk / 10) + 5.",
  },
  "Kowtow Cleave": {
    name: "Kowtow Cleave", type: "dark", category: "physical", basePower: 85,
    accuracy: 0, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    effect: "Never misses.",
  },

  // ── STEEL ──────────────────────────────────────────────────────────────────
  "Flash Cannon": {
    name: "Flash Cannon", type: "steel", category: "special", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, boosts: { spDef: -1 } },
  },
  "Iron Head": {
    name: "Iron Head", type: "steel", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 30, volatileStatus: "flinch" },
  },
  "Iron Tail": {
    name: "Iron Tail", type: "steel", category: "physical", basePower: 100,
    accuracy: 75, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 30, boosts: { defense: -1 } },
  },
  "King's Shield": {
    name: "King's Shield", type: "steel", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 4, target: "self",
    flags: { protect: true, priority: true },
    effect: "Protects and lowers contact attacker's Attack by 1 stage.",
  },
  "Meteor Mash": {
    name: "Meteor Mash", type: "steel", category: "physical", basePower: 90,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, punch: true },
    secondary: { chance: 20, boosts: { attack: 1 }, self: true },
  },
  "Gigaton Hammer": {
    name: "Gigaton Hammer", type: "steel", category: "physical", basePower: 160,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: {},
    effect: "Cannot be used consecutively.",
  },

  // ── FAIRY ──────────────────────────────────────────────────────────────────
  "Dazzling Gleam": {
    name: "Dazzling Gleam", type: "fairy", category: "special", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "allAdjacentFoes",
    flags: {},
  },
  "Moonblast": {
    name: "Moonblast", type: "fairy", category: "special", basePower: 95,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 30, boosts: { spAtk: -1 } },
  },
  "Play Rough": {
    name: "Play Rough", type: "fairy", category: "physical", basePower: 90,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 10, boosts: { attack: -1 } },
  },

  // ── STATUS / SUPPORT ──────────────────────────────────────────────────────
  "Protect": {
    name: "Protect", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 4, target: "self",
    flags: { protect: true, priority: true },
    effect: "Blocks most moves for one turn. Successive uses halve success rate.",
  },
  "Detect": {
    name: "Detect", type: "fighting", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 4, target: "self",
    flags: { protect: true, priority: true },
    effect: "Blocks most moves for one turn. Cannot be blocked by Imprison.",
  },
  "Wide Guard": {
    name: "Wide Guard", type: "rock", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 3, target: "allySide",
    flags: { priority: true },
    effect: "Protects user's side from spread moves for one turn.",
  },
  "Quick Guard": {
    name: "Quick Guard", type: "fighting", category: "status", basePower: 0,
    accuracy: 0, pp: 15, priority: 3, target: "allySide",
    flags: { priority: true },
    effect: "Protects user's side from priority moves for one turn.",
  },
  "Follow Me": {
    name: "Follow Me", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 2, target: "self",
    flags: { priority: true },
    effect: "Redirects all single-target moves to user.",
  },
  "Rage Powder": {
    name: "Rage Powder", type: "bug", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 2, target: "self",
    flags: { powder: true, priority: true },
    effect: "Redirects all single-target moves to user. Fails on Grass types and Safety Goggles.",
  },
  "Helping Hand": {
    name: "Helping Hand", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 5, target: "adjacentAlly",
    flags: { priority: true },
    effect: "Boosts ally's move damage by 50% this turn.",
  },
  "After You": {
    name: "After You", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 15, priority: 0, target: "normal",
    flags: {},
    effect: "Makes target move immediately after user.",
  },
  "Light Screen": {
    name: "Light Screen", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 30, priority: 0, target: "allySide",
    flags: {},
    effect: "Halves special damage to user's side for 5 turns.",
  },
  "Reflect": {
    name: "Reflect", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "allySide",
    flags: {},
    effect: "Halves physical damage to user's side for 5 turns.",
  },
  "Haze": {
    name: "Haze", type: "ice", category: "status", basePower: 0,
    accuracy: 0, pp: 30, priority: 0, target: "all",
    flags: {},
    effect: "Resets all stat changes for all Pokémon on the field.",
  },
  "Encore": {
    name: "Encore", type: "normal", category: "status", basePower: 0,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: {},
    effect: "Forces target to repeat its last move for 3 turns.",
  },
  "Disable": {
    name: "Disable", type: "normal", category: "status", basePower: 0,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: {},
    effect: "Prevents target from using its last move for 4 turns.",
  },
  "Glare": {
    name: "Glare", type: "normal", category: "status", basePower: 0,
    accuracy: 100, pp: 30, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 100, status: "paralysis" },
  },
  "Yawn": {
    name: "Yawn", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Target falls asleep at end of next turn.",
  },
  "Roar": {
    name: "Roar", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: -6, target: "normal",
    flags: { sound: true },
    effect: "Forces target to switch out.",
  },
  "Whirlwind": {
    name: "Whirlwind", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: -6, target: "normal",
    flags: { wind: true },
    effect: "Forces target to switch out.",
  },
  "Trick": {
    name: "Trick", type: "psychic", category: "status", basePower: 0,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Swaps held items with target.",
  },
  "Substitute": {
    name: "Substitute", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "self",
    flags: {},
    effect: "Sacrifices 25% max HP to create a decoy that absorbs damage.",
  },
  "Shed Tail": {
    name: "Shed Tail", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "self",
    flags: {},
    effect: "Creates a substitute using 50% of max HP, then switches out.",
  },
  "Endure": {
    name: "Endure", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 4, target: "self",
    flags: { priority: true },
    effect: "Survives any attack with at least 1 HP.",
  },
  "Rest": {
    name: "Rest", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "Fully heals HP and status but sleeps for 2 turns.",
  },
  "Roost": {
    name: "Roost", type: "flying", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "Heals 50% max HP. Loses Flying type for the turn.",
  },
  "Soft-Boiled": {
    name: "Soft-Boiled", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "Heals 50% max HP.",
  },
  "Slack Off": {
    name: "Slack Off", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "Heals 50% max HP.",
  },
  "Wish": {
    name: "Wish", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "self",
    flags: {},
    effect: "Heals user or incoming Pokémon for 50% max HP at end of next turn.",
  },
  "Aromatherapy": {
    name: "Aromatherapy", type: "grass", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "allySide",
    flags: {},
    effect: "Cures status conditions for the entire party.",
  },
  "Heal Bell": {
    name: "Heal Bell", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "allySide",
    flags: { sound: true },
    effect: "Cures status conditions for the entire party.",
  },
  "Revival Blessing": {
    name: "Revival Blessing", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 1, priority: 0, target: "self",
    flags: {},
    effect: "Revives a fainted party Pokémon with 50% HP.",
  },

  // ── STAT BOOSTING ──────────────────────────────────────────────────────────
  "Swords Dance": {
    name: "Swords Dance", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 2 },
  },
  "Nasty Plot": {
    name: "Nasty Plot", type: "dark", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "self",
    flags: {},
    selfBoost: { spAtk: 2 },
  },
  "Calm Mind": {
    name: "Calm Mind", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "self",
    flags: {},
    selfBoost: { spAtk: 1, spDef: 1 },
  },
  "Bulk Up": {
    name: "Bulk Up", type: "fighting", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 1, defense: 1 },
  },
  "Belly Drum": {
    name: "Belly Drum", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 6 },
    effect: "Maximizes Attack but costs 50% max HP.",
  },
  "Shell Smash": {
    name: "Shell Smash", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 15, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 2, spAtk: 2, speed: 2, defense: -1, spDef: -1 },
  },
  "Cotton Guard": {
    name: "Cotton Guard", type: "grass", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "self",
    flags: {},
    selfBoost: { defense: 3 },
  },
  "Agility": {
    name: "Agility", type: "psychic", category: "status", basePower: 0,
    accuracy: 0, pp: 30, priority: 0, target: "self",
    flags: {},
    selfBoost: { speed: 2 },
  },
  "Coil": {
    name: "Coil", type: "poison", category: "status", basePower: 0,
    accuracy: 0, pp: 20, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 1, defense: 1, accuracy: 1 },
  },
  "Curse": {
    name: "Curse", type: "ghost", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 1, defense: 1, speed: -1 },
    effect: "If user is Ghost type, costs 50% HP to curse target instead.",
  },
  "Tidy Up": {
    name: "Tidy Up", type: "normal", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "self",
    flags: {},
    selfBoost: { attack: 1, speed: 1 },
    effect: "Also removes hazards and substitutes.",
  },
  "Order Up": {
    name: "Order Up", type: "dragon", category: "physical", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Boost depends on Tatsugiri form in mouth (Atk/Def/Spe +1).",
  },

  // ── WEATHER SETTERS ────────────────────────────────────────────────────────
  "Rain Dance": {
    name: "Rain Dance", type: "water", category: "status", basePower: 0,
    accuracy: 0, pp: 5, priority: 0, target: "all",
    flags: {},
    fieldEffect: "rain",
  },
  "Sandstorm": {
    name: "Sandstorm", type: "rock", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "all",
    flags: {},
    fieldEffect: "sand",
  },
  "Snowscape": {
    name: "Snowscape", type: "ice", category: "status", basePower: 0,
    accuracy: 0, pp: 10, priority: 0, target: "all",
    flags: {},
    fieldEffect: "snow",
  },

  // ── ADDITIONAL COMPETITIVE MOVES ──────────────────────────────────────────
  "Fickle Beam": {
    name: "Fickle Beam", type: "dragon", category: "special", basePower: 80,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: {},
    effect: "30% chance to double power to 160.",
  },
  "Body Press": {
    name: "Body Press", type: "fighting", category: "physical", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Uses Defense stat instead of Attack for damage calculation.",
  },
  "Bite": {
    name: "Bite", type: "dark", category: "physical", basePower: 60,
    accuracy: 100, pp: 25, priority: 0, target: "normal",
    flags: { contact: true, bite: true },
    secondary: { chance: 30, volatileStatus: "flinch" },
  },
  "Hidden Power Fire": {
    name: "Hidden Power Fire", type: "fire", category: "special", basePower: 60,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
  },

  // ── MISSING COMPETITIVE MOVES ──────────────────────────────────────
  "Darkest Lariat": {
    name: "Darkest Lariat", type: "dark", category: "physical", basePower: 85,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Ignores target's stat changes.",
  },
  "Drill Run": {
    name: "Drill Run", type: "ground", category: "physical", basePower: 80,
    accuracy: 95, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
  },
  "Fell Stinger": {
    name: "Fell Stinger", type: "bug", category: "physical", basePower: 50,
    accuracy: 100, pp: 25, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Sharply raises Attack if this KOs the target.",
  },
  "Morning Sun": {
    name: "Morning Sun", type: "normal", category: "status", basePower: 0,
    accuracy: 100, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "Heals 50% HP (more in sun).",
  },
  "Perish Song": {
    name: "Perish Song", type: "normal", category: "status", basePower: 0,
    accuracy: 100, pp: 5, priority: 0, target: "all",
    flags: {},
    effect: "All Pokemon faint in 3 turns unless they switch.",
  },
  "Feint": {
    name: "Feint", type: "normal", category: "physical", basePower: 30,
    accuracy: 100, pp: 10, priority: 2, target: "normal",
    flags: {},
    effect: "Hits through Protect.",
  },
  "Flame Charge": {
    name: "Flame Charge", type: "fire", category: "physical", basePower: 50,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    selfBoost: { speed: 1 },
  },
  "Dual Wingbeat": {
    name: "Dual Wingbeat", type: "flying", category: "physical", basePower: 40,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    multiHit: [2, 2],
  },
  "Extrasensory": {
    name: "Extrasensory", type: "psychic", category: "special", basePower: 80,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 10, volatileStatus: "flinch" },
  },
  "Transform": {
    name: "Transform", type: "normal", category: "status", basePower: 0,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Transforms into the target.",
  },
  "Stored Power": {
    name: "Stored Power", type: "psychic", category: "special", basePower: 20,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Power increases with stat boosts.",
  },
  "Gyro Ball": {
    name: "Gyro Ball", type: "steel", category: "physical", basePower: 1,
    accuracy: 100, pp: 5, priority: 0, target: "normal",
    flags: { contact: true, bullet: true },
    effect: "More power the slower the user is vs the target (max 150).",
  },
  "Drill Peck": {
    name: "Drill Peck", type: "flying", category: "physical", basePower: 80,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
  },
  "Quash": {
    name: "Quash", type: "dark", category: "status", basePower: 0,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
    effect: "Forces target to move last this turn.",
  },
  "Recover": {
    name: "Recover", type: "normal", category: "status", basePower: 0,
    accuracy: 100, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "Heals 50% HP.",
  },
  "Heavy Slam": {
    name: "Heavy Slam", type: "steel", category: "physical", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "More damage if user is much heavier than target.",
  },
  "Iron Defense": {
    name: "Iron Defense", type: "steel", category: "status", basePower: 0,
    accuracy: 100, pp: 15, priority: 0, target: "self",
    flags: {},
    selfBoost: { defense: 2 },
  },
  "Head Smash": {
    name: "Head Smash", type: "rock", category: "physical", basePower: 150,
    accuracy: 80, pp: 5, priority: 0, target: "normal",
    flags: { contact: true, recoil: 50 },
    effect: "User takes 50% recoil damage.",
  },
  "Zen Headbutt": {
    name: "Zen Headbutt", type: "psychic", category: "physical", basePower: 80,
    accuracy: 90, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    secondary: { chance: 20, volatileStatus: "flinch" },
  },
  "Fire Fang": {
    name: "Fire Fang", type: "fire", category: "physical", basePower: 65,
    accuracy: 95, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, bite: true },
    secondary: { chance: 10, status: "burn" },
  },
  "Ice Shard": {
    name: "Ice Shard", type: "ice", category: "physical", basePower: 40,
    accuracy: 100, pp: 30, priority: 1, target: "normal",
    flags: {},
  },
  "Psycho Cut": {
    name: "Psycho Cut", type: "psychic", category: "physical", basePower: 70,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { slicing: true },
  },
  "Charm": {
    name: "Charm", type: "fairy", category: "status", basePower: 0,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: {},
    effect: "Lowers target's Attack by 2.",
  },
  "Gunk Shot": {
    name: "Gunk Shot", type: "poison", category: "physical", basePower: 120,
    accuracy: 80, pp: 5, priority: 0, target: "normal",
    flags: {},
    secondary: { chance: 30, status: "poison" },
  },
  "Discharge": {
    name: "Discharge", type: "electric", category: "special", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "allAdjacent",
    flags: {},
    secondary: { chance: 30, status: "paralysis" },
  },
  "Poltergeist": {
    name: "Poltergeist", type: "ghost", category: "physical", basePower: 110,
    accuracy: 90, pp: 5, priority: 0, target: "normal",
    flags: {},
    effect: "Fails if the target has no held item.",
  },
  "Quiver Dance": {
    name: "Quiver Dance", type: "bug", category: "status", basePower: 0,
    accuracy: 100, pp: 20, priority: 0, target: "self",
    flags: {},
    selfBoost: { spAtk: 1, spDef: 1, speed: 1 },
  },
  "Bug Buzz": {
    name: "Bug Buzz", type: "bug", category: "special", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { sound: true },
    effect: "10% chance to lower target's Sp. Def.",
  },
  "Mystical Fire": {
    name: "Mystical Fire", type: "fire", category: "special", basePower: 75,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Lowers target's Sp. Atk by 1.",
  },
  "Synthesis": {
    name: "Synthesis", type: "grass", category: "status", basePower: 0,
    accuracy: 100, pp: 5, priority: 0, target: "self",
    flags: {},
    effect: "Heals 50% HP.",
  },
  "Toxic Spikes": {
    name: "Toxic Spikes", type: "poison", category: "status", basePower: 0,
    accuracy: 100, pp: 20, priority: 0, target: "foeSide",
    flags: {},
    effect: "Poisons grounded foes switching in.",
  },
  "Parting Shot": {
    name: "Parting Shot", type: "dark", category: "status", basePower: 0,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { sound: true },
    effect: "Lowers target's Attack and Sp. Atk by 1, then switches out.",
  },
  "Water Shuriken": {
    name: "Water Shuriken", type: "water", category: "special", basePower: 15,
    accuracy: 100, pp: 20, priority: 1, target: "normal",
    flags: {},
    multiHit: [2, 5],
  },
  "Accelerock": {
    name: "Accelerock", type: "rock", category: "physical", basePower: 40,
    accuracy: 100, pp: 20, priority: 1, target: "normal",
    flags: { contact: true },
  },
  "Lunge": {
    name: "Lunge", type: "bug", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Lowers target's Attack by 1.",
  },
  "Outrage": {
    name: "Outrage", type: "dragon", category: "physical", basePower: 120,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Attacks for 2-3 turns, then confuses the user.",
  },
  "Bullet Seed": {
    name: "Bullet Seed", type: "grass", category: "physical", basePower: 25,
    accuracy: 100, pp: 30, priority: 0, target: "normal",
    flags: { bullet: true },
    multiHit: [2, 5],
  },
  "Beak Blast": {
    name: "Beak Blast", type: "flying", category: "physical", basePower: 100,
    accuracy: 100, pp: 15, priority: -3, target: "normal",
    flags: { bullet: true },
    effect: "Burns attacker on contact while charging.",
  },
  "Leech Life": {
    name: "Leech Life", type: "bug", category: "physical", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, drain: 50 },
  },
  "Infestation": {
    name: "Infestation", type: "bug", category: "special", basePower: 20,
    accuracy: 100, pp: 20, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Traps target for 4-5 turns, dealing 1/8 HP per turn.",
  },
  "Healing Wish": {
    name: "Healing Wish", type: "psychic", category: "status", basePower: 0,
    accuracy: 100, pp: 10, priority: 0, target: "self",
    flags: {},
    effect: "User faints. Next switch-in is fully healed.",
  },
  // ── Competitive set moves (added 01/04/2026) ──────────────────────────
  "Apple Acid": {
    name: "Apple Acid", type: "grass", category: "special", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Lowers the target's Sp. Def by one stage.",
    secondary: { chance: 100, boosts: { spDef: -1 } },
  },
  "Aqua Step": {
    name: "Aqua Step", type: "water", category: "physical", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Raises the user's Speed by one stage.",
    selfBoost: { speed: 1 },
  },
  "Aura Wheel": {
    name: "Aura Wheel", type: "electric", category: "physical", basePower: 110,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Type changes based on Morpeko's form. Raises user's Speed.",
    selfBoost: { speed: 1 },
  },
  "Avalanche": {
    name: "Avalanche", type: "ice", category: "physical", basePower: 60,
    accuracy: 100, pp: 10, priority: -4, target: "normal",
    flags: { contact: true },
    effect: "Doubles in power if the user was hit first this turn.",
  },
  "Bitter Blade": {
    name: "Bitter Blade", type: "fire", category: "physical", basePower: 90,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    effect: "Heals 50% of damage dealt.",
  },
  "Breaking Swipe": {
    name: "Breaking Swipe", type: "dragon", category: "physical", basePower: 60,
    accuracy: 100, pp: 15, priority: 0, target: "allAdjacentFoes",
    flags: { contact: true },
    effect: "Lowers the target's Attack by one stage.",
    secondary: { chance: 100, boosts: { attack: -1 } },
  },
  "Ceaseless Edge": {
    name: "Ceaseless Edge", type: "dark", category: "physical", basePower: 65,
    accuracy: 90, pp: 15, priority: 0, target: "normal",
    flags: { contact: true, slicing: true },
    effect: "Sets Spikes on the target's side. High crit ratio.",
  },
  "Decorate": {
    name: "Decorate", type: "fairy", category: "status", basePower: 0,
    accuracy: 0, pp: 15, priority: 0, target: "normal",
    flags: {},
    effect: "Raises the target's Attack and Sp. Atk by 2 stages.",
  },
  "Horn Leech": {
    name: "Horn Leech", type: "grass", category: "physical", basePower: 75,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Heals 50% of damage dealt.",
  },
  "Ice Spinner": {
    name: "Ice Spinner", type: "ice", category: "physical", basePower: 80,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Removes terrain from the field.",
  },
  "Icicle Crash": {
    name: "Icicle Crash", type: "ice", category: "physical", basePower: 85,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "30% chance to flinch the target.",
    secondary: { chance: 30, volatileStatus: "flinch" },
  },
  "Infernal Parade": {
    name: "Infernal Parade", type: "ghost", category: "special", basePower: 60,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
    effect: "Doubles power if target has a status condition. 30% burn chance.",
    secondary: { chance: 30, status: "burn" },
  },
  "Last Respects": {
    name: "Last Respects", type: "ghost", category: "physical", basePower: 50,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Power increases by 50 for each fainted party member.",
  },
  "Meteor Beam": {
    name: "Meteor Beam", type: "rock", category: "special", basePower: 120,
    accuracy: 90, pp: 10, priority: 0, target: "normal",
    flags: {},
    effect: "Charges on turn 1 (raises Sp. Atk), fires on turn 2. Power Herb skips charge.",
  },
  "Mortal Spin": {
    name: "Mortal Spin", type: "poison", category: "physical", basePower: 30,
    accuracy: 100, pp: 15, priority: 0, target: "allAdjacentFoes",
    flags: { contact: true },
    effect: "Removes hazards and poisons all targets.",
  },
  "Salt Cure": {
    name: "Salt Cure", type: "rock", category: "physical", basePower: 40,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: {},
    effect: "Deals 1/8 HP per turn (1/4 for Water/Steel types).",
  },
  "Snap Trap": {
    name: "Snap Trap", type: "grass", category: "physical", basePower: 35,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Traps target for 4-5 turns, dealing 1/8 HP per turn.",
  },
  "Spirit Break": {
    name: "Spirit Break", type: "fairy", category: "physical", basePower: 75,
    accuracy: 100, pp: 15, priority: 0, target: "normal",
    flags: { contact: true },
    effect: "Lowers the target's Sp. Atk by one stage.",
    secondary: { chance: 100, boosts: { spAtk: -1 } },
  },
  "Torch Song": {
    name: "Torch Song", type: "fire", category: "special", basePower: 80,
    accuracy: 100, pp: 10, priority: 0, target: "normal",
    flags: { sound: true },
    effect: "Raises the user's Sp. Atk by one stage.",
    selfBoost: { spAtk: 1 },
  },
};

/** Look up a move by name */
export function getMove(name: string): EngineMove | undefined {
  return MOVE_DATA[name];
}

/** Is this a spread move? (hits multiple targets in doubles) */
export function isSpreadMove(move: EngineMove): boolean {
  return move.target === "allAdjacentFoes" || move.target === "allAdjacent";
}

/** Is this a priority move? */
export function isPriorityMove(move: EngineMove): boolean {
  return move.priority !== 0;
}

/** Is this a protect variant? */
export function isProtectMove(move: EngineMove): boolean {
  return !!move.flags.protect;
}

/** Get effective base power considering spread reduction in doubles */
export function getEffectiveBP(move: EngineMove, isDoubles: boolean = true): number {
  let bp = move.basePower;
  if (isDoubles && isSpreadMove(move)) {
    bp = Math.floor(bp * 0.75); // Spread moves do 75% damage in doubles
  }
  return bp;
}

/** Categorize a move for team building analysis */
export function getMoveRole(move: EngineMove): string {
  if (move.flags.protect) return "protection";
  if (move.effect?.includes("switch") || move.name === "U-turn" || move.name === "Volt Switch") return "pivot";
  if (move.selfBoost) return "setup";
  if (move.fieldEffect) return "field-control";
  if (move.name === "Tailwind" || move.name === "Trick Room" || move.name === "Icy Wind") return "speed-control";
  if (move.name === "Helping Hand" || move.name === "Coaching") return "support";
  if (move.name === "Fake Out" || move.name === "First Impression") return "disruption";
  if (move.name === "Follow Me" || move.name === "Rage Powder") return "redirection";
  if (move.name === "Taunt" || move.name === "Encore" || move.name === "Disable") return "disruption";
  if (move.category !== "status" && move.basePower >= 100) return "nuke";
  if (move.category !== "status" && isSpreadMove(move)) return "spread-damage";
  if (move.priority > 0 && move.category !== "status") return "priority-damage";
  if (move.category !== "status") return "damage";
  return "utility";
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — PRE-GENERATED WINNING TEAMS DATABASE
// Hand-curated + engine-verified competitive teams covering all major archetypes
// Used for "Suggested Teams" section when Team Builder opens
// ═══════════════════════════════════════════════════════════════════════════════

import type { CommonSet } from "@/lib/types";

export interface PrebuiltTeam {
  id: string;
  name: string;
  archetype: string;
  description: string;
  pokemonIds: number[];        // National Dex IDs (6 pokemon)
  sets: CommonSet[];           // Matching competitive sets
  tags: string[];              // Quick filter tags
  tier: "S" | "A" | "B";      // Overall team strength rating
}

export const PREBUILT_TEAMS: PrebuiltTeam[] = [
  // ── S-TIER TEAMS ──────────────────────────────────────

  {
    id: "pre-1",
    name: "Sand Offense",
    archetype: "Sand",
    description: "Tyranitar + Excadrill sand core with Intimidate support and fast coverage",
    pokemonIds: [248, 530, 445, 727, 658, 282],
    sets: [
      { name: "Sand Setter", nature: "Adamant", ability: "Sand Stream", item: "Assault Vest", moves: ["Rock Slide", "Crunch", "Low Kick", "Ice Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "ghost" },
      { name: "Sand Rush Sweeper", nature: "Jolly", ability: "Sand Rush", item: "Life Orb", moves: ["Iron Head", "Earthquake", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Offensive Pivot", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Special", nature: "Timid", ability: "Protean", item: "Focus Sash", moves: ["Ice Beam", "Dark Pulse", "Grass Knot", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "ghost" },
      { name: "Mega Support", nature: "Timid", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psychic", "Trick Room", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
    ],
    tags: ["sand", "weather", "offense", "intimidate"],
    tier: "S",
  },

  {
    id: "pre-2",
    name: "Rain Rush",
    archetype: "Rain",
    description: "Politoed rain with Swift Swim sweepers and Tailwind backup",
    pokemonIds: [186, 9, 130, 547, 887, 727],
    sets: [
      { name: "Rain Setter", nature: "Bold", ability: "Drizzle", item: "Sitrus Berry", moves: ["Scald", "Ice Beam", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "grass" },
      { name: "Mega Launcher", nature: "Modest", ability: "Mega Launcher", item: "Blastoisinite", moves: ["Water Pulse", "Dark Pulse", "Aura Sphere", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
      { name: "Physical Sweeper", nature: "Adamant", ability: "Intimidate", item: "Wacan Berry", moves: ["Waterfall", "Power Whip", "Earthquake", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "flying" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Attacker", nature: "Timid", ability: "Clear Body", item: "Life Orb", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Safety Goggles", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
    ],
    tags: ["rain", "weather", "offense", "tailwind"],
    tier: "S",
  },

  {
    id: "pre-3",
    name: "Hard Trick Room",
    archetype: "Trick Room",
    description: "Hatterene sets TR for devastating slow attackers under Follow Me support",
    pokemonIds: [858, 36, 983, 464, 727, 780],
    sets: [
      { name: "TR Setter", nature: "Quiet", ability: "Magic Bounce", item: "Mental Herb", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "steel" },
      { name: "Follow Me Support", nature: "Bold", ability: "Friend Guard", item: "Sitrus Berry", moves: ["Follow Me", "Moonblast", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "steel" },
      { name: "Supreme Overlord", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Close Combat"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "dark" },
      { name: "TR Sweeper", nature: "Brave", ability: "Solid Rock", item: "Life Orb", moves: ["Rock Slide", "Earthquake", "Ice Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "rock" },
      { name: "Intimidate Pivot", nature: "Careful", ability: "Intimidate", item: "Figy Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "TR Special", nature: "Quiet", ability: "Berserk", item: "Choice Specs", moves: ["Draco Meteor", "Hyper Voice", "Flamethrower", "Thunderbolt"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "normal" },
    ],
    tags: ["trick-room", "bulky", "slow", "follow-me"],
    tier: "S",
  },

  {
    id: "pre-4",
    name: "Sun Hyper Offense",
    archetype: "Sun",
    description: "Torkoal sun with Chlorophyll Venusaur and Solar Power Charizard",
    pokemonIds: [324, 3, 6, 727, 547, 681],
    sets: [
      { name: "Sun Setter TR", nature: "Quiet", ability: "Drought", item: "Charcoal", moves: ["Heat Wave", "Earth Power", "Solar Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "grass" },
      { name: "Sun Sweeper", nature: "Modest", ability: "Chlorophyll", item: "Life Orb", moves: ["Leaf Storm", "Sludge Bomb", "Earth Power", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "fire" },
      { name: "Mega Y Sweeper", nature: "Modest", ability: "Drought", item: "Charizardite Y", moves: ["Heat Wave", "Solar Beam", "Overheat", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "grass" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Stance Change", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 16, defense: 2, spAtk: 16, spDef: 0, speed: 0 }, teraType: "fairy" },
    ],
    tags: ["sun", "weather", "hyper-offense", "tailwind"],
    tier: "S",
  },

  {
    id: "pre-5",
    name: "Metagross Balance",
    archetype: "Balance",
    description: "Mega Metagross pivot with Incineroar + Tailwind support",
    pokemonIds: [376, 727, 547, 149, 350, 681],
    sets: [
      { name: "Mega Physical", nature: "Jolly", ability: "Tough Claws", item: "Metagrossite", moves: ["Iron Head", "Zen Headbutt", "Ice Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "water" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Multiscale Pivot", nature: "Adamant", ability: "Multiscale", item: "Lum Berry", moves: ["Extreme Speed", "Dragon Claw", "Fire Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "normal" },
      { name: "Competitive Tank", nature: "Bold", ability: "Competitive", item: "Leftovers", moves: ["Scald", "Ice Beam", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 }, teraType: "fairy" },
      { name: "Stance Change", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 16, defense: 2, spAtk: 16, spDef: 0, speed: 0 }, teraType: "fairy" },
    ],
    tags: ["balance", "mega", "intimidate", "tailwind"],
    tier: "S",
  },

  // ── A-TIER TEAMS ──────────────────────────────────────

  {
    id: "pre-6",
    name: "Garchomp Rush",
    archetype: "Offense",
    description: "Mega Garchomp with speed control and coverage",
    pokemonIds: [445, 727, 547, 887, 282, 983],
    sets: [
      { name: "Mega Sweeper", nature: "Jolly", ability: "Sand Force", item: "Garchompite", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Attacker", nature: "Timid", ability: "Clear Body", item: "Life Orb", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fairy Coverage", nature: "Timid", ability: "Trace", item: "Choice Scarf", moves: ["Moonblast", "Psychic", "Dazzling Gleam", "Trick"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Supreme Overlord", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Close Combat"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "dark" },
    ],
    tags: ["offense", "mega", "tailwind", "intimidate"],
    tier: "A",
  },

  {
    id: "pre-7",
    name: "Double Intimidate",
    archetype: "Pivoting",
    description: "Incineroar + Krookodile intimidate cycle with setup sweepers",
    pokemonIds: [727, 553, 149, 681, 547, 376],
    sets: [
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Intimidate Offense", nature: "Jolly", ability: "Intimidate", item: "Choice Scarf", moves: ["Earthquake", "Crunch", "Close Combat", "Rock Slide"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "dark" },
      { name: "Dragon Dance", nature: "Adamant", ability: "Multiscale", item: "Lum Berry", moves: ["Dragon Dance", "Dragon Claw", "Extreme Speed", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "normal" },
      { name: "Stance Change", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 16, defense: 2, spAtk: 16, spDef: 0, speed: 0 }, teraType: "fairy" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Mega Physical", nature: "Jolly", ability: "Tough Claws", item: "Metagrossite", moves: ["Iron Head", "Zen Headbutt", "Ice Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "water" },
    ],
    tags: ["intimidate", "pivoting", "balance", "dragon-dance"],
    tier: "A",
  },

  {
    id: "pre-8",
    name: "Kingambit Hyper Offense",
    archetype: "Hyper Offense",
    description: "Aggressive Kingambit with Supreme Overlord snowball potential",
    pokemonIds: [983, 887, 445, 727, 547, 658],
    sets: [
      { name: "Supreme Overlord", nature: "Adamant", ability: "Supreme Overlord", item: "Black Glasses", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "dark" },
      { name: "Fast Attacker", nature: "Timid", ability: "Clear Body", item: "Life Orb", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Offensive Pivot", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Special", nature: "Timid", ability: "Protean", item: "Focus Sash", moves: ["Ice Beam", "Dark Pulse", "Grass Knot", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "ghost" },
    ],
    tags: ["hyper-offense", "sucker-punch", "tailwind", "intimidate"],
    tier: "A",
  },

  {
    id: "pre-9",
    name: "Dragonite Setup",
    archetype: "Setup",
    description: "Dragon Dance Dragonite with Follow Me + Intimidate support",
    pokemonIds: [149, 36, 727, 681, 445, 547],
    sets: [
      { name: "Dragon Dance", nature: "Adamant", ability: "Multiscale", item: "Lum Berry", moves: ["Dragon Dance", "Dragon Claw", "Extreme Speed", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "normal" },
      { name: "Follow Me Support", nature: "Bold", ability: "Friend Guard", item: "Sitrus Berry", moves: ["Follow Me", "Moonblast", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Figy Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Stance Change", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 16, defense: 2, spAtk: 16, spDef: 0, speed: 0 }, teraType: "fairy" },
      { name: "Offensive Pivot", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["setup", "dragon-dance", "follow-me", "intimidate"],
    tier: "A",
  },

  {
    id: "pre-10",
    name: "Lucario + Dragapult",
    archetype: "Offense",
    description: "Mega Lucario with Dragapult speed control and priority",
    pokemonIds: [448, 887, 727, 282, 547, 681],
    sets: [
      { name: "Mega Sweeper", nature: "Jolly", ability: "Adaptability", item: "Lucarionite", moves: ["Close Combat", "Bullet Punch", "Meteor Mash", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Attacker", nature: "Timid", ability: "Clear Body", item: "Life Orb", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fairy Coverage", nature: "Timid", ability: "Trace", item: "Choice Scarf", moves: ["Moonblast", "Psychic", "Dazzling Gleam", "Trick"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Stance Change", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 16, defense: 2, spAtk: 16, spDef: 0, speed: 0 }, teraType: "fairy" },
    ],
    tags: ["offense", "mega", "priority", "tailwind"],
    tier: "A",
  },

  {
    id: "pre-11",
    name: "Bulky Waters",
    archetype: "Balance",
    description: "Milotic and Slowbro form a defensive backbone with Trick Room option",
    pokemonIds: [350, 80, 727, 983, 547, 445],
    sets: [
      { name: "Competitive Tank", nature: "Bold", ability: "Competitive", item: "Leftovers", moves: ["Scald", "Ice Beam", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 }, teraType: "fairy" },
      { name: "TR Setter", nature: "Relaxed", ability: "Regenerator", item: "Sitrus Berry", moves: ["Trick Room", "Scald", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 }, teraType: "dark" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Figy Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Supreme Overlord", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Close Combat"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "dark" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Offensive Pivot", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["balance", "bulky", "trick-room", "competitive"],
    tier: "A",
  },

  {
    id: "pre-12",
    name: "Hydreigon Offense",
    archetype: "Offense",
    description: "Hydreigon special wallbreaker with Intimidate + Tailwind support",
    pokemonIds: [635, 727, 547, 376, 149, 658],
    sets: [
      { name: "Special Wallbreaker", nature: "Modest", ability: "Levitate", item: "Choice Specs", moves: ["Draco Meteor", "Dark Pulse", "Flamethrower", "Flash Cannon"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Mega Physical", nature: "Jolly", ability: "Tough Claws", item: "Metagrossite", moves: ["Iron Head", "Zen Headbutt", "Ice Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "water" },
      { name: "Multiscale Pivot", nature: "Adamant", ability: "Multiscale", item: "Lum Berry", moves: ["Extreme Speed", "Dragon Claw", "Fire Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "normal" },
      { name: "Fast Special", nature: "Timid", ability: "Protean", item: "Focus Sash", moves: ["Ice Beam", "Dark Pulse", "Grass Knot", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "ghost" },
    ],
    tags: ["offense", "special-attacker", "tailwind", "intimidate"],
    tier: "A",
  },

  // ── B-TIER TEAMS ──────────────────────────────────────

  {
    id: "pre-13",
    name: "Perish Trap",
    archetype: "Perish Trap",
    description: "Mega Gengar Shadow Tag + Perish Song for guaranteed KOs",
    pokemonIds: [94, 727, 282, 547, 149, 681],
    sets: [
      { name: "Perish Trap", nature: "Timid", ability: "Shadow Tag", item: "Gengarite", moves: ["Perish Song", "Shadow Ball", "Disable", "Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 0, spDef: 0, speed: 32 }, teraType: "normal" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fairy Support", nature: "Timid", ability: "Trace", item: "Choice Scarf", moves: ["Hyper Voice", "Psychic", "Trick Room", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Dragon Dance", nature: "Adamant", ability: "Multiscale", item: "Lum Berry", moves: ["Dragon Dance", "Dragon Claw", "Extreme Speed", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "normal" },
      { name: "Stance Change", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 16, defense: 2, spAtk: 16, spDef: 0, speed: 0 }, teraType: "fairy" },
    ],
    tags: ["perish-trap", "trapping", "shadow-tag", "stall"],
    tier: "B",
  },

  {
    id: "pre-14",
    name: "Hail Offense",
    archetype: "Snow",
    description: "Snow-based team with Aurora Veil support",
    pokemonIds: [471, 478, 376, 727, 547, 445],
    sets: [
      { name: "AV Snow Sweeper", nature: "Modest", ability: "Ice Body", item: "Choice Specs", moves: ["Blizzard", "Shadow Ball", "Freeze-Dry", "Hidden Power Ground"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "ground" },
      { name: "Aurora Veil Lead", nature: "Timid", ability: "Snow Cloak", item: "Focus Sash", moves: ["Aurora Veil", "Blizzard", "Icy Wind", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "ghost" },
      { name: "Mega Physical", nature: "Jolly", ability: "Tough Claws", item: "Metagrossite", moves: ["Iron Head", "Zen Headbutt", "Ice Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "water" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Ground Coverage", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["snow", "aurora-veil", "weather", "offense"],
    tier: "B",
  },

  {
    id: "pre-15",
    name: "Mixed Beat Up",
    archetype: "Beat Up",
    description: "Beat Up Whimsicott + Justified Lucario for massive Attack boost",
    pokemonIds: [547, 448, 727, 445, 887, 681],
    sets: [
      { name: "Beat Up Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Beat Up", "Tailwind", "Moonblast", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Justified Sweeper", nature: "Jolly", ability: "Justified", item: "Life Orb", moves: ["Close Combat", "Bullet Punch", "Meteor Mash", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Offensive Pivot", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Attacker", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Stance Change", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 16, defense: 2, spAtk: 16, spDef: 0, speed: 0 }, teraType: "fairy" },
    ],
    tags: ["beat-up", "justified", "combo", "tailwind"],
    tier: "B",
  },

  // ── EXPANDED OPPONENT POOL (Engine-verified meta teams) ──

  {
    id: "pre-16", name: "Sun Room", archetype: "Sun TR",
    description: "Torkoal Drought + Trick Room with slow heavy hitters",
    pokemonIds: [324, 858, 464, 727, 3, 983],
    sets: [
      { name: "Sun Setter", nature: "Quiet", ability: "Drought", item: "Charcoal", moves: ["Heat Wave", "Earth Power", "Solar Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "grass" },
      { name: "TR Setter", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
      { name: "TR Sweeper", nature: "Brave", ability: "Solid Rock", item: "Life Orb", moves: ["Rock Slide", "Earthquake", "Ice Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "fire" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Chlorophyll", nature: "Modest", ability: "Chlorophyll", item: "Coba Berry", moves: ["Solar Beam", "Sludge Bomb", "Earth Power", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "fire" },
      { name: "Dark Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
    ],
    tags: ["sun", "trick-room", "weather", "slow"],
    tier: "A",
  },

  {
    id: "pre-17", name: "Grimmsnarl Screens HO", archetype: "Screens",
    description: "Prankster dual screens into fast sweepers",
    pokemonIds: [861, 887, 983, 445, 908, 727],
    sets: [
      { name: "Screen Setter", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Fake Out", "Thunder Wave"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Dark Sweeper", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Flower Trick", nature: "Jolly", ability: "Protean", item: "Focus Sash", moves: ["Flower Trick", "Knock Off", "Play Rough", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "ghost" },
      { name: "Intimidate Pivot", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
    ],
    tags: ["screens", "hyper-offense", "prankster", "fast"],
    tier: "S",
  },

  {
    id: "pre-18", name: "Commander", archetype: "Commander",
    description: "Dondozo + Tatsugiri Commander combo with backup sweepers",
    pokemonIds: [977, 978, 858, 727, 445, 212],
    sets: [
      { name: "Commander Host", nature: "Impish", ability: "Unaware", item: "Leftovers", moves: ["Wave Crash", "Earthquake", "Protect", "Yawn"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "grass" },
      { name: "Commander", nature: "Modest", ability: "Commander", item: "Choice Specs", moves: ["Muddy Water", "Draco Meteor", "Ice Beam", "Surf"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "steel" },
      { name: "TR Backup", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
      { name: "Fake Out", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Ground", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Priority Steel", nature: "Adamant", ability: "Technician", item: "Choice Band", moves: ["Bullet Punch", "Bug Bite", "Superpower", "Dual Wingbeat"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "steel" },
    ],
    tags: ["commander", "combo", "trick-room", "bulk"],
    tier: "A",
  },

  {
    id: "pre-19", name: "Pelipper Rain", archetype: "Modern Rain",
    description: "Pelipper Drizzle + Palafin Zero to Hero rain devastation",
    pokemonIds: [279, 964, 887, 727, 547, 445],
    sets: [
      { name: "Rain Setter", nature: "Bold", ability: "Drizzle", item: "Damp Rock", moves: ["Hurricane", "Scald", "Tailwind", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 }, teraType: "steel" },
      { name: "Hero Mode", nature: "Adamant", ability: "Zero to Hero", item: "Mystic Water", moves: ["Wave Crash", "Jet Punch", "Close Combat", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "water" },
      { name: "Fast Special", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Ground Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["rain", "weather", "tailwind", "fast"],
    tier: "S",
  },

  {
    id: "pre-20", name: "Ursaluna TR", archetype: "Trick Room",
    description: "Ursaluna Guts nuke under Trick Room with Fake Out support",
    pokemonIds: [901, 858, 727, 934, 282, 983],
    sets: [
      { name: "TR Nuke", nature: "Brave", ability: "Guts", item: "Flame Orb", moves: ["Headlong Rush", "Facade", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "normal" },
      { name: "TR Setter", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
      { name: "Fake Out", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Salt Wall", nature: "Careful", ability: "Purifying Salt", item: "Leftovers", moves: ["Rock Slide", "Body Press", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
      { name: "Follow Me", nature: "Bold", ability: "Trace", item: "Safety Goggles", moves: ["Psychic", "Dazzling Gleam", "Follow Me", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 12, spDef: 2, speed: 0 }, teraType: "steel" },
      { name: "Dark Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
    ],
    tags: ["trick-room", "guts", "slow", "offense"],
    tier: "A",
  },

  {
    id: "pre-21", name: "Corviknight + Kingambit", archetype: "Steel Stall",
    description: "Dual Steel defensive core with Supreme Overlord endgame",
    pokemonIds: [823, 983, 727, 887, 547, 934],
    sets: [
      { name: "Iron Wall", nature: "Impish", ability: "Mirror Armor", item: "Rocky Helmet", moves: ["Body Press", "Brave Bird", "Iron Defense", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
      { name: "Dark Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Salt Wall", nature: "Careful", ability: "Purifying Salt", item: "Leftovers", moves: ["Rock Slide", "Body Press", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
    ],
    tags: ["steel", "stall", "supreme-overlord", "defense"],
    tier: "A",
  },

  {
    id: "pre-22", name: "Archaludon Stamina", archetype: "Body Press",
    description: "Archaludon Stamina + Screens for infinite Body Press scaling",
    pokemonIds: [1018, 861, 445, 727, 887, 547],
    sets: [
      { name: "Stamina Wall", nature: "Bold", ability: "Stamina", item: "Leftovers", moves: ["Body Press", "Flash Cannon", "Electro Shot", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 }, teraType: "water" },
      { name: "Screen Setter", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Fake Out", "Thunder Wave"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "steel" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["stamina", "body-press", "screens", "defense"],
    tier: "A",
  },

  {
    id: "pre-23", name: "Alolan Ninetales Veil", archetype: "Aurora Veil",
    description: "Alolan Ninetales Aurora Veil + fast sweepers",
    pokemonIds: [10103, 445, 887, 727, 983, 212],
    sets: [
      { name: "Veil Lead", nature: "Timid", ability: "Snow Warning", item: "Light Clay", moves: ["Aurora Veil", "Blizzard", "Freeze-Dry", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Dark Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "Priority Steel", nature: "Adamant", ability: "Technician", item: "Choice Band", moves: ["Bullet Punch", "Bug Bite", "Superpower", "Dual Wingbeat"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "steel" },
    ],
    tags: ["aurora-veil", "snow", "fast", "offense"],
    tier: "A",
  },

  {
    id: "pre-24", name: "Talonflame Tailwind Rush", archetype: "Tailwind HO",
    description: "Gale Wings Tailwind into hyper aggressive sweeping",
    pokemonIds: [663, 445, 983, 727, 282, 130],
    sets: [
      { name: "Gale Wings Lead", nature: "Jolly", ability: "Gale Wings", item: "Sharp Beak", moves: ["Brave Bird", "Flare Blitz", "Tailwind", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "flying" },
      { name: "EQ Sweeper", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Dark Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Follow Me", nature: "Timid", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psychic", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
      { name: "DD Sweeper", nature: "Jolly", ability: "Intimidate", item: "Wacan Berry", moves: ["Waterfall", "Power Whip", "Dragon Dance", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "flying" },
    ],
    tags: ["tailwind", "hyper-offense", "fast", "gale-wings"],
    tier: "A",
  },

  {
    id: "pre-25", name: "Follow Me Gardevoir", archetype: "Redirection",
    description: "Mega Gardevoir Follow Me + safe setup sweepers",
    pokemonIds: [282, 445, 727, 887, 130, 858],
    sets: [
      { name: "Mega Follow Me", nature: "Timid", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psychic", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
      { name: "SD Sweeper", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Swords Dance", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fake Out", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "DD Mega", nature: "Jolly", ability: "Intimidate", item: "Gyaradosite", moves: ["Waterfall", "Crunch", "Dragon Dance", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "flying" },
      { name: "TR Backup", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
    ],
    tags: ["follow-me", "redirection", "mega", "setup"],
    tier: "A",
  },

  {
    id: "pre-26", name: "Palafin Hero", archetype: "Palafin",
    description: "Zero to Hero Palafin with Fake Out switching support",
    pokemonIds: [964, 727, 547, 445, 887, 282],
    sets: [
      { name: "Hero Nuke", nature: "Adamant", ability: "Zero to Hero", item: "Mystic Water", moves: ["Wave Crash", "Jet Punch", "Close Combat", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "water" },
      { name: "Switch Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "EQ", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Follow Me", nature: "Timid", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psychic", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
    ],
    tags: ["palafin", "zero-to-hero", "tailwind", "pivot"],
    tier: "S",
  },

  {
    id: "pre-27", name: "Meowscarada HO", archetype: "Fast Offense",
    description: "Flower Trick guaranteed crits with full speed offense",
    pokemonIds: [908, 887, 445, 727, 983, 547],
    sets: [
      { name: "Crit Lead", nature: "Jolly", ability: "Protean", item: "Focus Sash", moves: ["Flower Trick", "Knock Off", "Play Rough", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "ghost" },
      { name: "Fast Special", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Covert Cloak", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["fast", "hyper-offense", "protean", "crits"],
    tier: "A",
  },

  {
    id: "pre-28", name: "Azumarill Belly Drum", archetype: "Belly Drum",
    description: "Azumarill Belly Drum + Fake Out support for free setup",
    pokemonIds: [184, 727, 858, 445, 934, 887],
    sets: [
      { name: "Drum Sweeper", nature: "Adamant", ability: "Huge Power", item: "Sitrus Berry", moves: ["Play Rough", "Aqua Jet", "Belly Drum", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "water" },
      { name: "Fake Out", nature: "Careful", ability: "Intimidate", item: "Safety Goggles", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "TR Mode", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Salt Wall", nature: "Careful", ability: "Purifying Salt", item: "Leftovers", moves: ["Rock Slide", "Body Press", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["belly-drum", "huge-power", "trick-room", "setup"],
    tier: "B",
  },

  {
    id: "pre-29", name: "Clefable Redirect", archetype: "Follow Me",
    description: "Friend Guard Clefable Follow Me + Garchomp setup",
    pokemonIds: [36, 445, 727, 887, 983, 858],
    sets: [
      { name: "Follow Me", nature: "Bold", ability: "Friend Guard", item: "Rocky Helmet", moves: ["Follow Me", "Moonblast", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 }, teraType: "steel" },
      { name: "SD Sweeper", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Swords Dance", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fake Out", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "TR Backup", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
    ],
    tags: ["follow-me", "redirection", "setup", "friend-guard"],
    tier: "A",
  },

  {
    id: "pre-30", name: "Sylveon Spread", archetype: "Fairy Spam",
    description: "Pixilate Hyper Voice spread damage + speed control",
    pokemonIds: [700, 445, 727, 547, 983, 130],
    sets: [
      { name: "Pixilate Spread", nature: "Modest", ability: "Pixilate", item: "Choice Specs", moves: ["Hyper Voice", "Shadow Ball", "Mystical Fire", "Quick Attack"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "steel" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fake Out", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "DD Mega", nature: "Jolly", ability: "Intimidate", item: "Gyaradosite", moves: ["Waterfall", "Crunch", "Dragon Dance", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "flying" },
    ],
    tags: ["fairy", "spread", "hyper-voice", "tailwind"],
    tier: "B",
  },

  {
    id: "pre-31", name: "Mimikyu Disguise TR", archetype: "Disguise TR",
    description: "Mimikyu's Disguise guarantees Trick Room setup",
    pokemonIds: [778, 464, 901, 727, 983, 445],
    sets: [
      { name: "TR Setter", nature: "Brave", ability: "Disguise", item: "Mental Herb", moves: ["Trick Room", "Shadow Sneak", "Play Rough", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "ghost" },
      { name: "TR Sweeper", nature: "Brave", ability: "Solid Rock", item: "Life Orb", moves: ["Rock Slide", "Earthquake", "Ice Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "fire" },
      { name: "Guts Nuke", nature: "Brave", ability: "Guts", item: "Flame Orb", moves: ["Headlong Rush", "Facade", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "normal" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
      { name: "Fast Pivot", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["trick-room", "disguise", "slow", "physical"],
    tier: "A",
  },

  {
    id: "pre-32", name: "Mega Kangaskhan Offense", archetype: "Parental Bond",
    description: "Mega Kangaskhan Parental Bond for double-hit domination",
    pokemonIds: [115, 445, 282, 727, 547, 130],
    sets: [
      { name: "Mega Lead", nature: "Jolly", ability: "Scrappy", item: "Kangaskhanite", moves: ["Return", "Sucker Punch", "Fake Out", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "normal" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Follow Me", nature: "Timid", ability: "Trace", item: "Safety Goggles", moves: ["Psychic", "Dazzling Gleam", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "DD Sweeper", nature: "Adamant", ability: "Intimidate", item: "Wacan Berry", moves: ["Waterfall", "Power Whip", "Dragon Dance", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "flying" },
    ],
    tags: ["mega", "parental-bond", "fake-out", "physical"],
    tier: "S",
  },

  {
    id: "pre-33", name: "Hydreigon Special", archetype: "Dragon Spam",
    description: "Hydreigon + Dragapult double dragon with Tailwind",
    pokemonIds: [635, 887, 547, 727, 445, 700],
    sets: [
      { name: "Special Dragon", nature: "Modest", ability: "Levitate", item: "Life Orb", moves: ["Dark Pulse", "Draco Meteor", "Heat Wave", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fairy Cover", nature: "Modest", ability: "Pixilate", item: "Choice Specs", moves: ["Hyper Voice", "Shadow Ball", "Mystical Fire", "Quick Attack"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "steel" },
    ],
    tags: ["dragon", "special", "tailwind", "fast"],
    tier: "B",
  },

  {
    id: "pre-34", name: "Toxapex Stall", archetype: "Stall",
    description: "Toxapex + Garganacl stall duo with chip damage",
    pokemonIds: [748, 934, 727, 823, 887, 445],
    sets: [
      { name: "Regen Wall", nature: "Bold", ability: "Regenerator", item: "Rocky Helmet", moves: ["Scald", "Toxic", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 }, teraType: "steel" },
      { name: "Salt Wall", nature: "Careful", ability: "Purifying Salt", item: "Leftovers", moves: ["Rock Slide", "Body Press", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Steel Bird", nature: "Impish", ability: "Mirror Armor", item: "Safety Goggles", moves: ["Body Press", "Brave Bird", "Iron Defense", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Scarfer", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Poison Jab"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
    ],
    tags: ["stall", "regenerator", "wall", "defense"],
    tier: "B",
  },

  {
    id: "pre-35", name: "Mega Metagross Rush", archetype: "Steel Offense",
    description: "Mega Metagross Tough Claws + Intimidate support",
    pokemonIds: [376, 727, 445, 547, 887, 282],
    sets: [
      { name: "Mega Steel", nature: "Jolly", ability: "Tough Claws", item: "Metagrossite", moves: ["Iron Head", "Zen Headbutt", "Ice Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "water" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Follow Me", nature: "Timid", ability: "Trace", item: "Safety Goggles", moves: ["Psychic", "Dazzling Gleam", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
    ],
    tags: ["mega", "steel", "tough-claws", "physical"],
    tier: "S",
  },

  {
    id: "pre-36", name: "Mega Gyarados DD", archetype: "Dragon Dance",
    description: "Mega Gyarados Dragon Dance sweeper with setup support",
    pokemonIds: [130, 282, 727, 445, 887, 858],
    sets: [
      { name: "DD Mega", nature: "Jolly", ability: "Mold Breaker", item: "Gyaradosite", moves: ["Waterfall", "Crunch", "Dragon Dance", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "flying" },
      { name: "Follow Me", nature: "Timid", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psychic", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "TR Backup", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
    ],
    tags: ["mega", "dragon-dance", "setup", "sweeper"],
    tier: "A",
  },

  {
    id: "pre-37", name: "Kommo-o Clangorous", archetype: "Z-Move",
    description: "Kommo-o Clangorous Soulblaze with Tailwind backup",
    pokemonIds: [784, 547, 727, 445, 887, 983],
    sets: [
      { name: "Clangorous", nature: "Timid", ability: "Bulletproof", item: "Throat Spray", moves: ["Clanging Scales", "Aura Sphere", "Flash Cannon", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 }, teraType: "steel" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
    ],
    tags: ["dragon", "special", "tailwind", "z-move"],
    tier: "B",
  },

  {
    id: "pre-38", name: "Maushold Population", archetype: "Multi-Hit",
    description: "Population Bomb with Tailwind for speed sweeping",
    pokemonIds: [925, 547, 727, 445, 887, 983],
    sets: [
      { name: "Pop Bomb", nature: "Jolly", ability: "Technician", item: "Wide Lens", moves: ["Population Bomb", "Tidy Up", "Protect", "Follow Me"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 }, teraType: "normal" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Finisher", nature: "Adamant", ability: "Supreme Overlord", item: "Assault Vest", moves: ["Sucker Punch", "Iron Head", "Kowtow Cleave", "Brick Break"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "flying" },
    ],
    tags: ["multi-hit", "technician", "tailwind", "normal"],
    tier: "B",
  },

  {
    id: "pre-39", name: "Mega Scizor Pivot", archetype: "Pivot Chain",
    description: "Mega Scizor Bug/Steel Technician with U-turn pivoting",
    pokemonIds: [212, 445, 727, 887, 282, 858],
    sets: [
      { name: "Mega Technician", nature: "Adamant", ability: "Technician", item: "Scizorite", moves: ["Bullet Punch", "Bug Bite", "Swords Dance", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 }, teraType: "steel" },
      { name: "EQ Pivot", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Follow Me", nature: "Timid", ability: "Trace", item: "Safety Goggles", moves: ["Psychic", "Dazzling Gleam", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
      { name: "TR Backup", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }, teraType: "water" },
    ],
    tags: ["mega", "pivot", "technician", "steel"],
    tier: "A",
  },

  {
    id: "pre-40", name: "Anti-Meta Goodstuff", archetype: "Goodstuff",
    description: "The classic VGC goodstuff — no gimmicks, just solid picks",
    pokemonIds: [445, 727, 887, 547, 934, 282],
    sets: [
      { name: "Offensive Lead", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Intimidate", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 }, teraType: "water" },
      { name: "Fast Ghost", nature: "Timid", ability: "Clear Body", item: "Choice Specs", moves: ["Shadow Ball", "Draco Meteor", "Thunderbolt", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Tailwind", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 }, teraType: "steel" },
      { name: "Salt Wall", nature: "Careful", ability: "Purifying Salt", item: "Leftovers", moves: ["Rock Slide", "Body Press", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 }, teraType: "water" },
      { name: "Mega Support", nature: "Timid", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psychic", "Trick Room", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 }, teraType: "steel" },
    ],
    tags: ["goodstuff", "balanced", "no-gimmick", "consistent"],
    tier: "S",
  },
];

/** Get prebuilt teams filtered by tag */
export function getPrebuiltTeamsByTag(tag: string): PrebuiltTeam[] {
  return PREBUILT_TEAMS.filter(t => t.tags.includes(tag));
}

/** Get prebuilt teams that include a specific Pokémon */
export function getPrebuiltTeamsWithPokemon(pokemonId: number): PrebuiltTeam[] {
  return PREBUILT_TEAMS.filter(t => t.pokemonIds.includes(pokemonId));
}

/** Get all unique archetype tags */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const t of PREBUILT_TEAMS) {
    for (const tag of t.tags) tags.add(tag);
  }
  return [...tags].sort();
}

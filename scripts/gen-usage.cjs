// Generate usage data for Pokémon missing from usage-data.ts
// Uses each Pokémon's actual moveset from pokemon-data.ts to build competitive sets

const fs = require('fs');
const { loadRoster } = require('./load-roster.cjs');

// Load roster
const roster = loadRoster();

// Load existing usage IDs
const usageSrc = fs.readFileSync('src/lib/usage-data.ts', 'utf8');
const usageIds = new Set([...usageSrc.matchAll(/^\s*(\d+):\s*\[/gm)].map(m => parseInt(m[1])));

// All competitive sets for the 36 missing Pokémon
// SP rules: 66 total, 32 max per stat
const SETS = {
  // Hisuian Arcanine (fire/rock) - Intimidate, Rock Head
  5059: [
    { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Head Smash", "Extreme Speed", "Protect"], sp: { hp: 32, attack: 20, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Rock Head Attacker", nature: "Jolly", ability: "Rock Head", item: "Life Orb", moves: ["Head Smash", "Flare Blitz", "Close Combat", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Pivot", nature: "Impish", ability: "Intimidate", item: "Leftovers", moves: ["Flare Blitz", "Rock Slide", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Galarian Slowbro (poison/psychic) - Quick Draw, Own Tempo
  6080: [
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Quick Draw", item: "Life Orb", moves: ["Psychic", "Sludge Bomb", "Flamethrower", "Trick Room"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Pivot", nature: "Bold", ability: "Own Tempo", item: "Sitrus Berry", moves: ["Psychic", "Sludge Bomb", "Slack Off", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Modest", ability: "Quick Draw", item: "Assault Vest", moves: ["Psychic", "Sludge Bomb", "Ice Beam", "Flamethrower"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Vaporeon (water) - Water Absorb
  134: [
    { name: "Bulky Support", nature: "Bold", ability: "Water Absorb", item: "Leftovers", moves: ["Scald", "Ice Beam", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room Tank", nature: "Quiet", ability: "Water Absorb", item: "Sitrus Berry", moves: ["Muddy Water", "Ice Beam", "Hyper Voice", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Wish Support", nature: "Calm", ability: "Water Absorb", item: "Leftovers", moves: ["Scald", "Ice Beam", "Wish", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Jolteon (electric) - Volt Absorb
  135: [
    { name: "Fast Attacker", nature: "Timid", ability: "Volt Absorb", item: "Life Orb", moves: ["Thunderbolt", "Volt Switch", "Shadow Ball", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Sweeper", nature: "Timid", ability: "Volt Absorb", item: "Choice Specs", moves: ["Thunderbolt", "Volt Switch", "Shadow Ball", "Hyper Voice"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Support Lead", nature: "Timid", ability: "Volt Absorb", item: "Focus Sash", moves: ["Thunderbolt", "Volt Switch", "Helping Hand", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Aerodactyl (rock/flying) - Unnerve, Tough Claws (Mega)
  142: [
    { name: "Mega Sweeper", nature: "Jolly", ability: "Tough Claws", item: "Aerodactylite", moves: ["Rock Slide", "Dual Wingbeat", "Earthquake", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Tailwind Lead", nature: "Jolly", ability: "Unnerve", item: "Focus Sash", moves: ["Rock Slide", "Tailwind", "Taunt", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Unnerve", item: "Choice Band", moves: ["Rock Slide", "Dual Wingbeat", "Earthquake", "Iron Head"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Typhlosion (fire) - Flash Fire, Blaze
  157: [
    { name: "Eruption Lead", nature: "Timid", ability: "Flash Fire", item: "Choice Scarf", moves: ["Eruption", "Heat Wave", "Focus Blast", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Attacker", nature: "Modest", ability: "Flash Fire", item: "Choice Specs", moves: ["Eruption", "Heat Wave", "Focus Blast", "Solar Beam"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Bulky Attacker", nature: "Modest", ability: "Flash Fire", item: "Assault Vest", moves: ["Heat Wave", "Flamethrower", "Focus Blast", "Extrasensory"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Hisuian Typhlosion (fire/ghost) - Frisk, Blaze
  5157: [
    { name: "Scarf Eruption", nature: "Timid", ability: "Frisk", item: "Choice Scarf", moves: ["Eruption", "Shadow Ball", "Heat Wave", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Attacker", nature: "Modest", ability: "Frisk", item: "Choice Specs", moves: ["Eruption", "Shadow Ball", "Heat Wave", "Infernal Parade"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Frisk", item: "Life Orb", moves: ["Shadow Ball", "Heat Wave", "Focus Blast", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Slowking (water/psychic) - Regenerator, Own Tempo
  199: [
    { name: "Trick Room Setter", nature: "Quiet", ability: "Regenerator", item: "Sitrus Berry", moves: ["Psychic", "Scald", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Assault Vest Tank", nature: "Quiet", ability: "Regenerator", item: "Assault Vest", moves: ["Psychic", "Scald", "Ice Beam", "Flamethrower"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Support", nature: "Bold", ability: "Regenerator", item: "Leftovers", moves: ["Scald", "Psychic", "Thunder Wave", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
  ],

  // Galarian Slowking (poison/psychic) - Curious Medicine, Regenerator
  6199: [
    { name: "Trick Room Setter", nature: "Quiet", ability: "Regenerator", item: "Sitrus Berry", moves: ["Psychic", "Sludge Bomb", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Curious Medicine", nature: "Quiet", ability: "Curious Medicine", item: "Assault Vest", moves: ["Psychic", "Sludge Bomb", "Ice Beam", "Flamethrower"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Nasty Plot", nature: "Modest", ability: "Regenerator", item: "Life Orb", moves: ["Nasty Plot", "Psychic", "Sludge Bomb", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Sableye (dark/ghost) - Prankster
  302: [
    { name: "Prankster Support", nature: "Careful", ability: "Prankster", item: "Sitrus Berry", moves: ["Fake Out", "Will-O-Wisp", "Quash", "Recover"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Mega Sableye", nature: "Bold", ability: "Magic Bounce", item: "Sablenite", moves: ["Will-O-Wisp", "Foul Play", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Screen Setter", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Will-O-Wisp", "Recover"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Torterra (grass/ground) - Shell Armor, Overgrow
  389: [
    { name: "Trick Room Attacker", nature: "Brave", ability: "Shell Armor", item: "Assault Vest", moves: ["Wood Hammer", "Earthquake", "Rock Slide", "Heavy Slam"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Overgrow", item: "Sitrus Berry", moves: ["Wood Hammer", "Earthquake", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Wide Guard Support", nature: "Impish", ability: "Shell Armor", item: "Leftovers", moves: ["Earthquake", "Wood Hammer", "Wide Guard", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Infernape (fire/fighting) - Iron Fist, Blaze
  392: [
    { name: "Mixed Attacker", nature: "Naive", ability: "Iron Fist", item: "Life Orb", moves: ["Close Combat", "Flare Blitz", "Mach Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 0, spAtk: 2, spDef: 0, speed: 32 } },
    { name: "Fake Out Lead", nature: "Jolly", ability: "Iron Fist", item: "Focus Sash", moves: ["Fake Out", "Close Combat", "Flare Blitz", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Special Attacker", nature: "Timid", ability: "Blaze", item: "Choice Specs", moves: ["Heat Wave", "Focus Blast", "Vacuum Wave", "Overheat"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Weavile (dark/ice) - Pressure, Pickpocket
  461: [
    { name: "Fast Physical", nature: "Jolly", ability: "Pressure", item: "Focus Sash", moves: ["Fake Out", "Triple Axel", "Knock Off", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Pressure", item: "Choice Band", moves: ["Triple Axel", "Knock Off", "Ice Shard", "Low Kick"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Pressure", item: "Life Orb", moves: ["Swords Dance", "Triple Axel", "Knock Off", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Conkeldurr (fighting) - Guts, Iron Fist
  534: [
    { name: "Guts Attacker", nature: "Brave", ability: "Guts", item: "Flame Orb", moves: ["Close Combat", "Mach Punch", "Drain Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Iron Fist TR", nature: "Brave", ability: "Iron Fist", item: "Assault Vest", moves: ["Drain Punch", "Mach Punch", "Ice Punch", "Thunder Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Fighter", nature: "Adamant", ability: "Guts", item: "Flame Orb", moves: ["Close Combat", "Knock Off", "Mach Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Garbodor (poison) - Aftermath, Stench
  569: [
    { name: "Toxic Spikes Lead", nature: "Impish", ability: "Aftermath", item: "Rocky Helmet", moves: ["Gunk Shot", "Stomping Tantrum", "Toxic Spikes", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Brave", ability: "Aftermath", item: "Assault Vest", moves: ["Gunk Shot", "Stomping Tantrum", "Seed Bomb", "Drain Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Stench", item: "Sitrus Berry", moves: ["Gunk Shot", "Stomping Tantrum", "Drain Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Vanilluxe (ice) - Snow Warning
  584: [
    { name: "Snow Sweeper", nature: "Modest", ability: "Snow Warning", item: "Choice Specs", moves: ["Blizzard", "Freeze-Dry", "Flash Cannon", "Ice Beam"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Aurora Veil Lead", nature: "Timid", ability: "Snow Warning", item: "Light Clay", moves: ["Blizzard", "Aurora Veil", "Freeze-Dry", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Modest", ability: "Snow Warning", item: "Assault Vest", moves: ["Blizzard", "Freeze-Dry", "Flash Cannon", "Ice Beam"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Stunfisk (ground/electric) - Static, Limber
  618: [
    { name: "Trick Room Tank", nature: "Relaxed", ability: "Static", item: "Leftovers", moves: ["Earth Power", "Discharge", "Muddy Water", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 } },
    { name: "Bulky Attacker", nature: "Modest", ability: "Static", item: "Sitrus Berry", moves: ["Earth Power", "Thunderbolt", "Muddy Water", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Support", nature: "Bold", ability: "Limber", item: "Sitrus Berry", moves: ["Discharge", "Earth Power", "Thunder Wave", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Galarian Stunfisk (ground/steel) - Mimicry
  6618: [
    { name: "Trick Room Tank", nature: "Brave", ability: "Mimicry", item: "Leftovers", moves: ["Iron Head", "Earthquake", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Trapper", nature: "Impish", ability: "Mimicry", item: "Sitrus Berry", moves: ["Iron Head", "Earthquake", "Snap Trap", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Mimicry", item: "Assault Vest", moves: ["Iron Head", "Earthquake", "Rock Slide", "Stomping Tantrum"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Volcarona (bug/fire) - Flame Body, Swarm
  637: [
    { name: "Quiver Dance", nature: "Timid", ability: "Flame Body", item: "Life Orb", moves: ["Quiver Dance", "Heat Wave", "Bug Buzz", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Rage Powder Support", nature: "Bold", ability: "Flame Body", item: "Rocky Helmet", moves: ["Heat Wave", "Bug Buzz", "Rage Powder", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Specs Sweeper", nature: "Modest", ability: "Flame Body", item: "Choice Specs", moves: ["Heat Wave", "Bug Buzz", "Psychic", "Overheat"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Vivillon (bug/flying) - Compound Eyes
  666: [
    { name: "Sleep Lead", nature: "Timid", ability: "Compound Eyes", item: "Focus Sash", moves: ["Sleep Powder", "Hurricane", "Bug Buzz", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Rage Powder", nature: "Bold", ability: "Compound Eyes", item: "Sitrus Berry", moves: ["Sleep Powder", "Hurricane", "Rage Powder", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Tailwind Support", nature: "Timid", ability: "Compound Eyes", item: "Focus Sash", moves: ["Sleep Powder", "Tailwind", "Hurricane", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Tyrantrum (rock/dragon) - Strong Jaw, Rock Head
  697: [
    { name: "Strong Jaw Attacker", nature: "Adamant", ability: "Strong Jaw", item: "Life Orb", moves: ["Dragon Claw", "Rock Slide", "Fire Fang", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Rock Head Recoil", nature: "Jolly", ability: "Rock Head", item: "Choice Band", moves: ["Head Smash", "Outrage", "Earthquake", "Dragon Claw"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Dragon Dance", nature: "Jolly", ability: "Strong Jaw", item: "Lum Berry", moves: ["Dragon Dance", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Aurorus (rock/ice) - Refrigerate, Snow Warning
  699: [
    { name: "Refrigerate Attacker", nature: "Modest", ability: "Refrigerate", item: "Choice Specs", moves: ["Hyper Voice", "Ancient Power", "Thunderbolt", "Earth Power"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Aurora Veil Lead", nature: "Modest", ability: "Snow Warning", item: "Light Clay", moves: ["Aurora Veil", "Hyper Voice", "Ancient Power", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Trick Room Special", nature: "Quiet", ability: "Refrigerate", item: "Life Orb", moves: ["Hyper Voice", "Ancient Power", "Thunderbolt", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Klefki (steel/fairy) - Prankster
  707: [
    { name: "Prankster Support", nature: "Bold", ability: "Prankster", item: "Sitrus Berry", moves: ["Thunder Wave", "Reflect", "Light Screen", "Foul Play"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Swagger Foul Play", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Foul Play", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Dual Screen Lead", nature: "Bold", ability: "Prankster", item: "Light Clay", moves: ["Reflect", "Light Screen", "Thunder Wave", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Gourgeist (ghost/grass) - Frisk, Insomnia
  711: [
    { name: "Trick Room Setter", nature: "Relaxed", ability: "Frisk", item: "Sitrus Berry", moves: ["Trick Room", "Will-O-Wisp", "Seed Bomb", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Bulky Attacker", nature: "Brave", ability: "Frisk", item: "Life Orb", moves: ["Seed Bomb", "Phantom Force", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Status Spreader", nature: "Impish", ability: "Insomnia", item: "Leftovers", moves: ["Will-O-Wisp", "Leech Seed", "Seed Bomb", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Primarina (water/fairy) - Liquid Voice, Torrent
  730: [
    { name: "Specs Attacker", nature: "Modest", ability: "Liquid Voice", item: "Choice Specs", moves: ["Hyper Voice", "Moonblast", "Ice Beam", "Energy Ball"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Trick Room Sweeper", nature: "Quiet", ability: "Liquid Voice", item: "Life Orb", moves: ["Hyper Voice", "Moonblast", "Ice Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Support", nature: "Calm", ability: "Torrent", item: "Sitrus Berry", moves: ["Scald", "Moonblast", "Icy Wind", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Toucannon (normal/flying) - Skill Link
  733: [
    { name: "Skill Link Attacker", nature: "Adamant", ability: "Skill Link", item: "Choice Band", moves: ["Bullet Seed", "Rock Blast", "Brave Bird", "Beak Blast"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Beak Blast", nature: "Adamant", ability: "Skill Link", item: "Sitrus Berry", moves: ["Beak Blast", "Brave Bird", "Bullet Seed", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Tailwind Lead", nature: "Jolly", ability: "Skill Link", item: "Focus Sash", moves: ["Brave Bird", "Bullet Seed", "Tailwind", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Araquanid (water/bug) - Water Bubble
  752: [
    { name: "Water Bubble Attacker", nature: "Brave", ability: "Water Bubble", item: "Assault Vest", moves: ["Liquidation", "Lunge", "Poison Jab", "Wide Guard"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Wide Guard Support", nature: "Brave", ability: "Water Bubble", item: "Sitrus Berry", moves: ["Liquidation", "Lunge", "Wide Guard", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Water Bubble", item: "Choice Band", moves: ["Liquidation", "Lunge", "Poison Jab", "Leech Life"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Sandaconda (ground) - Sand Spit, Shed Skin
  844: [
    { name: "Sand Setter", nature: "Impish", ability: "Sand Spit", item: "Sitrus Berry", moves: ["Earthquake", "Rock Slide", "Coil", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Physical Attacker", nature: "Adamant", ability: "Sand Spit", item: "Life Orb", moves: ["Earthquake", "Rock Slide", "Iron Head", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Trick Room Tank", nature: "Brave", ability: "Shed Skin", item: "Assault Vest", moves: ["Earthquake", "Rock Slide", "Iron Head", "Body Press"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Polteageist (ghost) - Cursed Body, Weak Armor
  855: [
    { name: "Shell Smash Sweeper", nature: "Modest", ability: "Cursed Body", item: "Focus Sash", moves: ["Shell Smash", "Shadow Ball", "Stored Power", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Attacker", nature: "Timid", ability: "Weak Armor", item: "Choice Specs", moves: ["Shadow Ball", "Psychic", "Giga Drain", "Dark Pulse"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Cursed Body", item: "Life Orb", moves: ["Shadow Ball", "Psychic", "Giga Drain", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Mr. Rime (ice/psychic) - Screen Cleaner, Tangled Feet
  866: [
    { name: "Screen Cleaner Lead", nature: "Timid", ability: "Screen Cleaner", item: "Focus Sash", moves: ["Freeze-Dry", "Psychic", "Fake Out", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Trick Room Setter", nature: "Quiet", ability: "Screen Cleaner", item: "Sitrus Berry", moves: ["Trick Room", "Freeze-Dry", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Specs Attacker", nature: "Modest", ability: "Screen Cleaner", item: "Choice Specs", moves: ["Freeze-Dry", "Psychic", "Shadow Ball", "Focus Blast"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Alcremie (fairy) - Sweet Veil, Aroma Veil
  869: [
    { name: "Decorate Support", nature: "Bold", ability: "Sweet Veil", item: "Sitrus Berry", moves: ["Decorate", "Dazzling Gleam", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Aroma Veil Support", nature: "Calm", ability: "Aroma Veil", item: "Leftovers", moves: ["Decorate", "Dazzling Gleam", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Aroma Veil", item: "Life Orb", moves: ["Dazzling Gleam", "Psychic", "Mystical Fire", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Morpeko (electric/dark) - Hunger Switch
  877: [
    { name: "Fast Attacker", nature: "Jolly", ability: "Hunger Switch", item: "Life Orb", moves: ["Aura Wheel", "Crunch", "Seed Bomb", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Fake Out Lead", nature: "Jolly", ability: "Hunger Switch", item: "Focus Sash", moves: ["Fake Out", "Aura Wheel", "Crunch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Hunger Switch", item: "Choice Band", moves: ["Aura Wheel", "Crunch", "Seed Bomb", "Rapid Spin"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Quaquaval (water/fighting) - Moxie
  914: [
    { name: "Moxie Sweeper", nature: "Jolly", ability: "Moxie", item: "Life Orb", moves: ["Aqua Step", "Close Combat", "Brave Bird", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Moxie", item: "Lum Berry", moves: ["Swords Dance", "Aqua Step", "Close Combat", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Moxie", item: "Choice Band", moves: ["Aqua Step", "Close Combat", "Brave Bird", "Ice Spinner"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Ceruledge (fire/ghost) - Flash Fire, Weak Armor
  937: [
    { name: "Swords Dance Sweeper", nature: "Adamant", ability: "Flash Fire", item: "Life Orb", moves: ["Swords Dance", "Bitter Blade", "Shadow Claw", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Weak Armor Sweeper", nature: "Jolly", ability: "Weak Armor", item: "Focus Sash", moves: ["Bitter Blade", "Shadow Claw", "Close Combat", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Flash Fire", item: "Sitrus Berry", moves: ["Bitter Blade", "Shadow Claw", "Psycho Cut", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Orthworm (steel) - Earth Eater
  968: [
    { name: "Body Press Tank", nature: "Impish", ability: "Earth Eater", item: "Leftovers", moves: ["Iron Head", "Body Press", "Coil", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Iron Defense", nature: "Impish", ability: "Earth Eater", item: "Sitrus Berry", moves: ["Iron Defense", "Body Press", "Iron Head", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Shed Tail Support", nature: "Jolly", ability: "Earth Eater", item: "Sitrus Berry", moves: ["Shed Tail", "Iron Head", "Earthquake", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Tatsugiri (dragon/water) - Commander
  978: [
    { name: "Commander Support", nature: "Modest", ability: "Commander", item: "Choice Specs", moves: ["Draco Meteor", "Muddy Water", "Ice Beam", "Dragon Pulse"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Dondozo Partner", nature: "Modest", ability: "Commander", item: "Sitrus Berry", moves: ["Draco Meteor", "Muddy Water", "Ice Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Scarf Attacker", nature: "Timid", ability: "Commander", item: "Choice Scarf", moves: ["Draco Meteor", "Muddy Water", "Ice Beam", "Dragon Pulse"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],
};

// Validate SP totals
let valid = true;
for (const [id, sets] of Object.entries(SETS)) {
  sets.forEach(s => {
    const total = s.sp.hp + s.sp.attack + s.sp.defense + s.sp.spAtk + s.sp.spDef + s.sp.speed;
    const maxCheck = Object.values(s.sp).some(v => v > 32);
    if (total !== 66) { console.log(`SP ERROR ${id} "${s.name}": total=${total} (should be 66)`); valid = false; }
    if (maxCheck) { console.log(`SP ERROR ${id} "${s.name}": stat exceeds 32`); valid = false; }
  });
}
if (valid) console.log('All SP totals valid (66 each, max 32)');

// Read existing file first to prevent duplicate keys
const usageSrc2 = fs.readFileSync('src/lib/usage-data.ts', 'utf8');
const existingUsageIds = new Set(
  [...usageSrc2.matchAll(/^\s+(\d+):\s*\[/gm)].map(m => parseInt(m[1]))
);

// Generate the text to append to usage-data.ts
const lines = [];
let skipped = 0;
for (const [id, sets] of Object.entries(SETS)) {
  if (existingUsageIds.has(parseInt(id))) { skipped++; continue; }
  const pokemon = roster.find(p => p.id === parseInt(id));
  const name = pokemon ? pokemon.name : 'Unknown';
  lines.push('');
  lines.push(`  // ${name} (id: ${id})`);
  lines.push(`  ${id}: [`);
  sets.forEach(s => {
    const sp = `{ hp: ${s.sp.hp}, attack: ${s.sp.attack}, defense: ${s.sp.defense}, spAtk: ${s.sp.spAtk}, spDef: ${s.sp.spDef}, speed: ${s.sp.speed} }`;
    lines.push(`    { name: "${s.name}", nature: "${s.nature}", ability: "${s.ability}", item: "${s.item}", moves: ${JSON.stringify(s.moves)}, sp: ${sp} },`);
  });
  lines.push('  ],');
}

if (skipped > 0) console.log(`Skipped ${skipped} Pokémon already in usage-data.ts`);

if (lines.length === 0) {
  console.log('No new usage data to add (all already exist)');
} else {
  const insertPoint = usageSrc2.lastIndexOf('};');
  const newSrc = usageSrc2.slice(0, insertPoint) + lines.join('\n') + '\n' + usageSrc2.slice(insertPoint);
  fs.writeFileSync('src/lib/usage-data.ts', newSrc);
  console.log(`Added usage data for ${Object.keys(SETS).length - skipped} Pokémon`);
}

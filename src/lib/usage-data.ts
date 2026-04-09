import { CommonSet } from "./types";

// Stat Points (SP) System: 66 total, 32 max per stat, 1 SP = 1 stat point
// Converted from traditional VGC EV spreads to the Champions SP format

export const USAGE_DATA: Record<number, CommonSet[]> = {
  // Venusaur (id: 3)
  3: [
    { name: "Sun Sweeper", nature: "Modest", ability: "Chlorophyll", item: "Life Orb", moves: ["Leaf Storm", "Sludge Bomb", "Earth Power", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Bulky Support", nature: "Calm", ability: "Overgrow", item: "Sitrus Berry", moves: ["Giga Drain", "Sludge Bomb", "Sleep Powder", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 16, spDef: 16, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Overgrow", item: "Assault Vest", moves: ["Leaf Storm", "Sludge Bomb", "Earth Power", "Weather Ball"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Sleep Lead", nature: "Timid", ability: "Chlorophyll", item: "Focus Sash", moves: ["Sleep Powder", "Leaf Storm", "Sludge Bomb", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mega Thick Fat", nature: "Modest", ability: "Thick Fat", item: "Venusaurite", moves: ["Giga Drain", "Sludge Bomb", "Earth Power", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 12, speed: 0 } },
    { name: "Mega Sun Tank", nature: "Bold", ability: "Thick Fat", item: "Venusaurite", moves: ["Giga Drain", "Sludge Bomb", "Sleep Powder", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 12, spDef: 2, speed: 0 } },
  ],

  // Charizard (id: 6)
  6: [
    { name: "Sun Attacker", nature: "Timid", ability: "Solar Power", item: "Choice Specs", moves: ["Heat Wave", "Air Slash", "Solar Beam", "Overheat"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mega Y Sweeper", nature: "Modest", ability: "Drought", item: "Charizardite Y", moves: ["Heat Wave", "Solar Beam", "Overheat", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Mega X Physical", nature: "Adamant", ability: "Tough Claws", item: "Charizardite X", moves: ["Flare Blitz", "Dragon Claw", "Thunder Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Mega Y", nature: "Modest", ability: "Drought", item: "Charizardite Y", moves: ["Heat Wave", "Solar Beam", "Roost", "Protect"], sp: { hp: 20, attack: 0, defense: 4, spAtk: 32, spDef: 2, speed: 8 } },
    { name: "Life Orb Attacker", nature: "Timid", ability: "Blaze", item: "Life Orb", moves: ["Heat Wave", "Air Slash", "Focus Blast", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Blastoise (id: 9)
  9: [
    { name: "Mega Launcher", nature: "Modest", ability: "Mega Launcher", item: "Blastoisinite", moves: ["Water Pulse", "Dark Pulse", "Aura Sphere", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
    { name: "Follow Me Support", nature: "Bold", ability: "Rain Dish", item: "Sitrus Berry", moves: ["Surf", "Ice Beam", "Endure", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Assault Vest Tank", nature: "Modest", ability: "Torrent", item: "Assault Vest", moves: ["Surf", "Ice Beam", "Dark Pulse", "Aura Sphere"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Shell Smash", nature: "Modest", ability: "Torrent", item: "White Herb", moves: ["Shell Smash", "Hydro Pump", "Ice Beam", "Protect"], sp: { hp: 2, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Pikachu (id: 25)
  25: [
    { name: "Light Ball Attacker", nature: "Timid", ability: "Lightning Rod", item: "Light Ball", moves: ["Thunderbolt", "Volt Switch", "Surf", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Fake Out Lead", nature: "Jolly", ability: "Lightning Rod", item: "Focus Sash", moves: ["Fake Out", "Volt Tackle", "Iron Tail", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Support Pivot", nature: "Timid", ability: "Lightning Rod", item: "Focus Sash", moves: ["Thunderbolt", "Encore", "Nuzzle", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Tera Lightning Rod", nature: "Bold", ability: "Lightning Rod", item: "Sitrus Berry", moves: ["Nuzzle", "Encore", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
  ],

  // Raichu (id: 26)
  26: [
    { name: "Fast Attacker", nature: "Timid", ability: "Lightning Rod", item: "Life Orb", moves: ["Thunderbolt", "Agility", "Surf", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Fake Out Support", nature: "Jolly", ability: "Lightning Rod", item: "Focus Sash", moves: ["Fake Out", "Volt Switch", "Nuzzle", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Mega X Physical", nature: "Jolly", ability: "Volt Rush", item: "Raichunite X", moves: ["Volt Tackle", "Focus Punch", "Fake Out", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mega Y Special", nature: "Timid", ability: "Mind Surge", item: "Raichunite Y", moves: ["Thunderbolt", "Agility", "Focus Blast", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Clefable (id: 36)
  36: [
    { name: "Follow Me Support", nature: "Bold", ability: "Magic Guard", item: "Sitrus Berry", moves: ["Follow Me", "Moonblast", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room Setter", nature: "Relaxed", ability: "Magic Guard", item: "Mental Herb", moves: ["Amnesia", "Follow Me", "Moonblast", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Offensive Follow Me", nature: "Modest", ability: "Magic Guard", item: "Life Orb", moves: ["Moonblast", "Flamethrower", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
    { name: "Calm Mind Tank", nature: "Bold", ability: "Unaware", item: "Leftovers", moves: ["Calm Mind", "Moonblast", "Moonlight", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Mega Pixie Veil", nature: "Modest", ability: "Pixie Veil", item: "Clefablite", moves: ["Moonblast", "Dazzling Gleam", "Follow Me", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 12, speed: 0 } },
  ],

  // Ninetales (id: 38)
  38: [
    { name: "Sun Setter", nature: "Timid", ability: "Drought", item: "Heat Rock", moves: ["Heat Wave", "Solar Beam", "Will-O-Wisp", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Offensive Sun", nature: "Timid", ability: "Drought", item: "Choice Specs", moves: ["Heat Wave", "Solar Beam", "Overheat", "Extrasensory"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Bulky Sun", nature: "Calm", ability: "Drought", item: "Sitrus Berry", moves: ["Heat Wave", "Will-O-Wisp", "Sunny Day", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Encore Lead", nature: "Timid", ability: "Drought", item: "Focus Sash", moves: ["Heat Wave", "Encore", "Will-O-Wisp", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Slowbro (id: 80)
  80: [
    { name: "Trick Room Tank", nature: "Relaxed", ability: "Regenerator", item: "Sitrus Berry", moves: ["Trick Room", "Scald", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 } },
    { name: "Mega Bulk", nature: "Bold", ability: "Shell Armor", item: "Slowbronite", moves: ["Scald", "Psychic", "Ice Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Quiet", ability: "Regenerator", item: "Assault Vest", moves: ["Scald", "Psychic", "Ice Beam", "Flamethrower"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Calm Mind", nature: "Bold", ability: "Oblivious", item: "Leftovers", moves: ["Calm Mind", "Scald", "Psyshock", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Gengar (id: 94)
  94: [
    { name: "Mega Shadow Tag", nature: "Timid", ability: "Shadow Tag", item: "Gengarite", moves: ["Shadow Ball", "Sludge Bomb", "Focus Blast", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Life Orb Attacker", nature: "Timid", ability: "Cursed Body", item: "Life Orb", moves: ["Shadow Ball", "Sludge Bomb", "Dazzling Gleam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Focus Sash Lead", nature: "Timid", ability: "Cursed Body", item: "Focus Sash", moves: ["Shadow Ball", "Sludge Bomb", "Will-O-Wisp", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Trick Room Counter", nature: "Timid", ability: "Levitate", item: "Focus Sash", moves: ["Shadow Ball", "Icy Wind", "Trick Room", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Perish Trap", nature: "Timid", ability: "Shadow Tag", item: "Gengarite", moves: ["Perish Song", "Shadow Ball", "Disable", "Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Kangaskhan (id: 115)
  115: [
    { name: "Mega Parental Bond", nature: "Adamant", ability: "Parental Bond", item: "Kangaskhanite", moves: ["Body Slam", "Sucker Punch", "Drain Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Bulky Mega", nature: "Adamant", ability: "Parental Bond", item: "Kangaskhanite", moves: ["Body Slam", "Sucker Punch", "Fake Out", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 12 } },
    { name: "Fake Out Lead", nature: "Jolly", ability: "Inner Focus", item: "Silk Scarf", moves: ["Fake Out", "Double-Edge", "Sucker Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Speed Control", nature: "Jolly", ability: "Parental Bond", item: "Kangaskhanite", moves: ["Fake Out", "Body Slam", "Icy Wind", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Starmie (id: 121)
  121: [
    { name: "Fast Attacker", nature: "Timid", ability: "Analytic", item: "Life Orb", moves: ["Hydro Pump", "Psychic", "Ice Beam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Offensive Pivot", nature: "Timid", ability: "Natural Cure", item: "Choice Specs", moves: ["Hydro Pump", "Psychic", "Ice Beam", "Thunderbolt"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Speed Control", nature: "Timid", ability: "Natural Cure", item: "Focus Sash", moves: ["Scald", "Icy Wind", "Trick Room", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Bulky Attacker", nature: "Modest", ability: "Natural Cure", item: "Sitrus Berry", moves: ["Scald", "Psychic", "Ice Beam", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
    { name: "Mega Prism", nature: "Timid", ability: "Prism Armor", item: "Starmieite", moves: ["Hydro Pump", "Psychic", "Ice Beam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Pinsir (id: 127)
  127: [
    { name: "Mega Aerilate", nature: "Jolly", ability: "Aerilate", item: "Pinsirite", moves: ["Body Slam", "Close Combat", "Quick Attack", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance Mega", nature: "Adamant", ability: "Aerilate", item: "Pinsirite", moves: ["Swords Dance", "Body Slam", "Quick Attack", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Moxie", item: "Choice Scarf", moves: ["Close Combat", "X-Scissor", "Earthquake", "Rock Slide"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Mega", nature: "Adamant", ability: "Aerilate", item: "Pinsirite", moves: ["Body Slam", "Close Combat", "Feint", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 12 } },
  ],

  // Tauros (id: 128)
  128: [
    { name: "Intimidate Physical", nature: "Jolly", ability: "Intimidate", item: "Life Orb", moves: ["Body Slam", "Close Combat", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Sheer Force Attacker", nature: "Jolly", ability: "Sheer Force", item: "Life Orb", moves: ["Body Slam", "Iron Head", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Intimidate", item: "Choice Scarf", moves: ["Close Combat", "Rock Slide", "Wild Charge", "Earthquake"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Intimidate", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Body Slam", "Close Combat", "Helping Hand", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Paldean Tauros Combat (id: 10250)
  10250: [
    {"name":"Intimidate Physical","nature":"Jolly","ability":"Intimidate","item":"Life Orb","moves":["Close Combat","Raging Bull","Rock Slide","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Bulk Up Sweeper","nature":"Jolly","ability":"Intimidate","item":"Sitrus Berry","moves":["Bulk Up","Close Combat","Raging Bull","Protect"],"sp":{"hp":4,"attack":30,"defense":0,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Choice Scarf","nature":"Jolly","ability":"Intimidate","item":"Choice Scarf","moves":["Close Combat","Rock Slide","Wild Charge","Earthquake"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Bulky Intimidate","nature":"Adamant","ability":"Intimidate","item":"Sitrus Berry","moves":["Close Combat","Body Slam","Rock Slide","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
  ],

  // Paldean Tauros Blaze (id: 10251)
  10251: [
    {"name":"Intimidate Attacker","nature":"Jolly","ability":"Intimidate","item":"Life Orb","moves":["Flare Blitz","Close Combat","Rock Slide","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Flame Charge Sweeper","nature":"Jolly","ability":"Intimidate","item":"Sitrus Berry","moves":["Flame Charge","Flare Blitz","Close Combat","Protect"],"sp":{"hp":4,"attack":30,"defense":0,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Choice Band","nature":"Adamant","ability":"Intimidate","item":"Choice Band","moves":["Flare Blitz","Close Combat","Wild Charge","Zen Headbutt"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Will-O-Wisp Support","nature":"Impish","ability":"Intimidate","item":"Sitrus Berry","moves":["Will-O-Wisp","Flare Blitz","Close Combat","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
  ],

  // Paldean Tauros Aqua (id: 10252)
  10252: [
    {"name":"Intimidate Attacker","nature":"Jolly","ability":"Intimidate","item":"Life Orb","moves":["Wave Crash","Close Combat","Rock Slide","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Aqua Jet Priority","nature":"Adamant","ability":"Intimidate","item":"Life Orb","moves":["Aqua Jet","Close Combat","Rock Slide","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Choice Band","nature":"Adamant","ability":"Intimidate","item":"Choice Band","moves":["Wave Crash","Close Combat","Wild Charge","Earthquake"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Bulk Up","nature":"Jolly","ability":"Intimidate","item":"Sitrus Berry","moves":["Bulk Up","Liquidation","Close Combat","Protect"],"sp":{"hp":4,"attack":30,"defense":0,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Gyarados (id: 130)
  130: [
    { name: "Mega Intimidate", nature: "Adamant", ability: "Mold Breaker", item: "Gyaradosite", moves: ["Waterfall", "Crunch", "Ice Fang", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Dragon Dance Mega", nature: "Jolly", ability: "Mold Breaker", item: "Gyaradosite", moves: ["Dragon Dance", "Waterfall", "Crunch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Waterfall", "Ice Fang", "Thunder Wave", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Choice Band", nature: "Jolly", ability: "Intimidate", item: "Choice Band", moves: ["Waterfall", "Crunch", "Ice Fang", "Earthquake"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Flareon (id: 136)
  136: [
    { name: "Trick Room Attacker", nature: "Brave", ability: "Flash Fire", item: "Choice Band", moves: ["Flare Blitz", "Superpower", "Quick Attack", "Double-Edge"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Flame Charge Sweeper", nature: "Adamant", ability: "Flash Fire", item: "Life Orb", moves: ["Flare Blitz", "Flame Charge", "Superpower", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Flash Fire", item: "Assault Vest", moves: ["Flare Blitz", "Superpower", "Double-Edge", "Quick Attack"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Sun Sweeper", nature: "Adamant", ability: "Flash Fire", item: "Life Orb", moves: ["Flare Blitz", "Superpower", "Will-O-Wisp", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  ],

  // Snorlax (id: 143)
  143: [
    { name: "Trick Room Tank", nature: "Brave", ability: "Thick Fat", item: "Sitrus Berry", moves: ["Body Slam", "High Horsepower", "Curse", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Brave", ability: "Thick Fat", item: "Assault Vest", moves: ["Body Slam", "Crunch", "High Horsepower", "Fire Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Belly Drum", nature: "Adamant", ability: "Gluttony", item: "Aguav Berry", moves: ["Belly Drum", "Double-Edge", "High Horsepower", "Protect"], sp: { hp: 32, attack: 2, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Curse Wall", nature: "Careful", ability: "Thick Fat", item: "Leftovers", moves: ["Curse", "Body Slam", "Rest", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Dragonite (id: 149)
  149: [
    { name: "Mega Physical", nature: "Adamant", ability: "Multiscale", item: "Dragonitite", moves: ["Dragon Claw", "Extreme Speed", "Ice Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Tailwind Support", nature: "Adamant", ability: "Inner Focus", item: "Lum Berry", moves: ["Dragon Claw", "Extreme Speed", "Tailwind", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 12 } },
    { name: "Dragon Dance", nature: "Jolly", ability: "Multiscale", item: "Weakness Policy", moves: ["Dragon Dance", "Dragon Claw", "Earthquake", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Band", nature: "Adamant", ability: "Multiscale", item: "Choice Band", moves: ["Extreme Speed", "Dragon Claw", "Fire Punch", "Earthquake"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Meganium (id: 154)
  154: [
    { name: "Mega Support", nature: "Bold", ability: "Mega Sol", item: "Meganiumite", moves: ["Giga Drain", "Leech Seed", "Light Screen", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Trick Room Support", nature: "Relaxed", ability: "Overgrow", item: "Sitrus Berry", moves: ["Giga Drain", "Body Slam", "Heal Pulse", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 } },
    { name: "Sun Bulk", nature: "Bold", ability: "Leaf Guard", item: "Leftovers", moves: ["Giga Drain", "Leech Seed", "Grassy Terrain", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Offensive", nature: "Modest", ability: "Overgrow", item: "Life Orb", moves: ["Energy Ball", "Ancient Power", "Outrage", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Feraligatr (id: 160)
  160: [
    { name: "Mega Physical", nature: "Adamant", ability: "Dragonize", item: "Feraligatrite", moves: ["Liquidation", "Dragon Claw", "Ice Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Dragon Dance", nature: "Jolly", ability: "Sheer Force", item: "Life Orb", moves: ["Dragon Dance", "Liquidation", "Ice Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Band", nature: "Adamant", ability: "Sheer Force", item: "Choice Band", moves: ["Liquidation", "Ice Punch", "Crunch", "Aqua Jet"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Trick Room Sweeper", nature: "Brave", ability: "Torrent", item: "Assault Vest", moves: ["Liquidation", "Ice Punch", "Crunch", "Dragon Claw"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Ampharos (id: 181)
  181: [
    { name: "Mega Tank", nature: "Modest", ability: "Mold Breaker", item: "Ampharosite", moves: ["Thunderbolt", "Dragon Pulse", "Focus Blast", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Mold Breaker", item: "Ampharosite", moves: ["Thunderbolt", "Dragon Pulse", "Power Gem", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Modest", ability: "Static", item: "Assault Vest", moves: ["Thunderbolt", "Dragon Pulse", "Focus Blast", "Volt Switch"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Support", nature: "Calm", ability: "Static", item: "Sitrus Berry", moves: ["Thunderbolt", "Volt Switch", "Thunder Wave", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Politoed (id: 186)
  186: [
    { name: "Rain Setter", nature: "Bold", ability: "Drizzle", item: "Sitrus Berry", moves: ["Surf", "Icy Wind", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Offensive Rain", nature: "Modest", ability: "Drizzle", item: "Choice Specs", moves: ["Hydro Pump", "Ice Beam", "Focus Blast", "Surf"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Encore Support", nature: "Bold", ability: "Drizzle", item: "Damp Rock", moves: ["Surf", "Encore", "Perish Song", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Bulky Pivot", nature: "Calm", ability: "Drizzle", item: "Sitrus Berry", moves: ["Surf", "Ice Beam", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Umbreon (id: 197)
  197: [
    { name: "Bulky Support", nature: "Calm", ability: "Synchronize", item: "Leftovers", moves: ["Foul Play", "Helping Hand", "Snarl", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Yawn Disruptor", nature: "Bold", ability: "Synchronize", item: "Sitrus Berry", moves: ["Foul Play", "Yawn", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Snarl Tank", nature: "Calm", ability: "Inner Focus", item: "Assault Vest", moves: ["Foul Play", "Snarl", "Quick Attack", "Helping Hand"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Wish Support", nature: "Bold", ability: "Synchronize", item: "Leftovers", moves: ["Wish", "Foul Play", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Scizor (id: 212)
  212: [
    { name: "Mega Technician", nature: "Adamant", ability: "Technician", item: "Scizorite", moves: ["Bullet Punch", "Bug Bite", "Swords Dance", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Band Technician", nature: "Adamant", ability: "Technician", item: "Choice Band", moves: ["Bullet Punch", "Bug Bite", "U-turn", "Superpower"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Bulky Pivot", nature: "Careful", ability: "Technician", item: "Assault Vest", moves: ["Bullet Punch", "Bug Bite", "U-turn", "Knock Off"], sp: { hp: 32, attack: 20, defense: 0, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Tailwind Support", nature: "Adamant", ability: "Technician", item: "Occa Berry", moves: ["Bullet Punch", "Bug Bite", "Tailwind", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Heracross (id: 214)
  214: [
    { name: "Mega Skill Link", nature: "Adamant", ability: "Skill Link", item: "Heracronite", moves: ["Pin Missile", "Rock Blast", "Close Combat", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Moxie", item: "Choice Scarf", moves: ["Close Combat", "Megahorn", "Rock Slide", "Earthquake"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Guts Sweeper", nature: "Adamant", ability: "Guts", item: "Flame Orb", moves: ["Close Combat", "Megahorn", "Facade", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Bulky Mega", nature: "Adamant", ability: "Skill Link", item: "Heracronite", moves: ["Pin Missile", "Rock Blast", "Close Combat", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Skarmory (id: 227)
  227: [
    { name: "Mega Wall", nature: "Impish", ability: "Razor Plating", item: "Skarmoryite", moves: ["Iron Head", "Brave Bird", "Tailwind", "Protect"], sp: { hp: 32, attack: 2, defense: 32, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Tailwind Support", nature: "Impish", ability: "Sturdy", item: "Rocky Helmet", moves: ["Iron Head", "Brave Bird", "Tailwind", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Hazard Lead", nature: "Impish", ability: "Sturdy", item: "Mental Herb", moves: ["Stealth Rock", "Brave Bird", "Whirlwind", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Offensive", nature: "Adamant", ability: "Keen Eye", item: "Choice Band", moves: ["Brave Bird", "Iron Head", "Drill Peck", "Body Press"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  ],

  // Houndoom (id: 229)
  229: [
    { name: "Mega Sweeper", nature: "Timid", ability: "Solar Power", item: "Houndoominite", moves: ["Heat Wave", "Dark Pulse", "Solar Beam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Nasty Plot", nature: "Timid", ability: "Flash Fire", item: "Life Orb", moves: ["Nasty Plot", "Heat Wave", "Dark Pulse", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Timid", ability: "Flash Fire", item: "Choice Specs", moves: ["Overheat", "Dark Pulse", "Sludge Bomb", "Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Sun Support", nature: "Timid", ability: "Flash Fire", item: "Focus Sash", moves: ["Heat Wave", "Dark Pulse", "Will-O-Wisp", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Tyranitar (id: 248)
  248: [
    { name: "Mega Dragon Dance", nature: "Jolly", ability: "Sand Stream", item: "Tyranitarite", moves: ["Dragon Dance", "Rock Slide", "Crunch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Sand Stream", item: "Assault Vest", moves: ["Rock Slide", "Crunch", "Ice Punch", "Low Kick"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Choice Band", nature: "Adamant", ability: "Sand Stream", item: "Choice Band", moves: ["Rock Slide", "Crunch", "Earthquake", "Fire Punch"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Weakness Policy", nature: "Adamant", ability: "Sand Stream", item: "Weakness Policy", moves: ["Rock Slide", "Crunch", "Ice Punch", "Protect"], sp: { hp: 20, attack: 32, defense: 14, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Pelipper (id: 279)
  279: [
    { name: "Rain Setter", nature: "Bold", ability: "Drizzle", item: "Damp Rock", moves: ["Surf", "Hurricane", "Tailwind", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Offensive Rain", nature: "Modest", ability: "Drizzle", item: "Choice Specs", moves: ["Weather Ball", "Hurricane", "Surf", "U-turn"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Bulky Pivot", nature: "Bold", ability: "Drizzle", item: "Sitrus Berry", moves: ["Surf", "Hurricane", "U-turn", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 } },
    { name: "Wide Guard", nature: "Calm", ability: "Drizzle", item: "Sitrus Berry", moves: ["Surf", "Wide Guard", "Tailwind", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Gardevoir (id: 282)
  282: [
    { name: "Mega Pixilate", nature: "Modest", ability: "Pixilate", item: "Gardevoirite", moves: ["Hyper Voice", "Psyshock", "Focus Blast", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Trick Room Mega", nature: "Quiet", ability: "Pixilate", item: "Gardevoirite", moves: ["Trick Room", "Hyper Voice", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Choice Specs", nature: "Timid", ability: "Trace", item: "Choice Specs", moves: ["Moonblast", "Psychic", "Focus Blast", "Shadow Ball"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Supportive", nature: "Calm", ability: "Trace", item: "Sitrus Berry", moves: ["Moonblast", "Psychic", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Torkoal (id: 324)
  324: [
    { name: "Sun Setter TR", nature: "Quiet", ability: "Drought", item: "Charcoal", moves: ["Eruption", "Heat Wave", "Earth Power", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Trick Room Lead", nature: "Quiet", ability: "Drought", item: "Sitrus Berry", moves: ["Eruption", "Heat Wave", "Yawn", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Sun", nature: "Bold", ability: "Drought", item: "Sitrus Berry", moves: ["Heat Wave", "Yawn", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Choice Specs", nature: "Quiet", ability: "Drought", item: "Choice Specs", moves: ["Eruption", "Heat Wave", "Earth Power", "Solar Beam"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Altaria (id: 334)
  334: [
    { name: "Mega Pixilate", nature: "Modest", ability: "Pixilate", item: "Altarianite", moves: ["Hyper Voice", "Fire Blast", "Tailwind", "Protect"], sp: { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 14 } },
    { name: "Dragon Dance Mega", nature: "Adamant", ability: "Pixilate", item: "Altarianite", moves: ["Dragon Dance", "Body Slam", "Earthquake", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Cotton Guard", nature: "Bold", ability: "Natural Cure", item: "Sitrus Berry", moves: ["Hyper Voice", "Cotton Guard", "Roost", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Bulky Mega", nature: "Calm", ability: "Pixilate", item: "Altarianite", moves: ["Hyper Voice", "Fire Blast", "Acrobatics", "Protect"], sp: { hp: 32, attack: 0, defense: 0, spAtk: 20, spDef: 14, speed: 0 } },
  ],

  // Milotic (id: 350)
  350: [
    { name: "Competitive Tank", nature: "Bold", ability: "Competitive", item: "Sitrus Berry", moves: ["Scald", "Ice Beam", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Icy Wind Support", nature: "Calm", ability: "Competitive", item: "Sitrus Berry", moves: ["Scald", "Icy Wind", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Coil Attacker", nature: "Bold", ability: "Marvel Scale", item: "Flame Orb", moves: ["Coil", "Waterfall", "Ice Beam", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Choice Specs", nature: "Modest", ability: "Competitive", item: "Choice Specs", moves: ["Hydro Pump", "Ice Beam", "Dragon Pulse", "Scald"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Castform (id: 351)
  351: [
    { name: "Rain Attacker", nature: "Modest", ability: "Forecast", item: "Mystic Water", moves: ["Weather Ball", "Rain Dance", "Thunder", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Sun Attacker", nature: "Modest", ability: "Forecast", item: "Charcoal", moves: ["Weather Ball", "Sunny Day", "Solar Beam", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Weather Support", nature: "Timid", ability: "Forecast", item: "Focus Sash", moves: ["Weather Ball", "Rain Dance", "Thunder Wave", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Hail Sweeper", nature: "Modest", ability: "Forecast", item: "Never-Melt Ice", moves: ["Weather Ball", "Snowscape", "Thunderbolt", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Absol (id: 359)
  359: [
    { name: "Mega Magic Bounce", nature: "Jolly", ability: "Magic Bounce", item: "Absolite", moves: ["Knock Off", "Sucker Punch", "Play Rough", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance Mega", nature: "Adamant", ability: "Magic Bounce", item: "Absolite", moves: ["Swords Dance", "Knock Off", "Sucker Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Band", nature: "Jolly", ability: "Super Luck", item: "Choice Band", moves: ["Knock Off", "Sucker Punch", "Play Rough", "Close Combat"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Focus Sash Lead", nature: "Jolly", ability: "Pressure", item: "Focus Sash", moves: ["Knock Off", "Sucker Punch", "Taunt", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mega Spectral", nature: "Jolly", ability: "Spectral Doom", item: "Absolite Z", moves: ["Knock Off", "Shadow Claw", "Play Rough", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Empoleon (id: 395)
  395: [
    { name: "Competitive Lead", nature: "Modest", ability: "Competitive", item: "Sitrus Berry", moves: ["Surf", "Flash Cannon", "Icy Wind", "Protect"], sp: { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 14, speed: 0 } },
    { name: "Assault Vest", nature: "Modest", ability: "Defiant", item: "Assault Vest", moves: ["Surf", "Flash Cannon", "Ice Beam", "Grass Knot"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Support", nature: "Calm", ability: "Competitive", item: "Leftovers", moves: ["Surf", "Flash Cannon", "Roar", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Offensive", nature: "Timid", ability: "Competitive", item: "Choice Specs", moves: ["Hydro Pump", "Flash Cannon", "Ice Beam", "Surf"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Garchomp (id: 445)
  445: [
    { name: "Fast Physical", nature: "Jolly", ability: "Rough Skin", item: "Life Orb", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Rough Skin", item: "Choice Scarf", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Fire Fang"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Rough Skin", item: "Lum Berry", moves: ["Swords Dance", "Earthquake", "Dragon Claw", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mega Chomp", nature: "Jolly", ability: "Sand Force", item: "Garchompite", moves: ["Earthquake", "Dragon Claw", "Iron Head", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Rough Skin", item: "Assault Vest", moves: ["Earthquake", "Dragon Claw", "Rock Slide", "Fire Fang"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Mega Sovereign", nature: "Jolly", ability: "Earth Sovereign", item: "Garchompite Z", moves: ["Earthquake", "Dragon Claw", "Iron Head", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Lucario (id: 448)
  448: [
    { name: "Mega Special", nature: "Timid", ability: "Adaptability", item: "Lucarionite", moves: ["Aura Sphere", "Flash Cannon", "Vacuum Wave", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mega Physical", nature: "Jolly", ability: "Adaptability", item: "Lucarionite", moves: ["Close Combat", "Meteor Mash", "Bullet Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Inner Focus Sash", nature: "Timid", ability: "Inner Focus", item: "Focus Sash", moves: ["Aura Sphere", "Flash Cannon", "Vacuum Wave", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Justified", item: "Life Orb", moves: ["Swords Dance", "Close Combat", "Iron Tail", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mega Aura Max", nature: "Jolly", ability: "Aura Maximizer", item: "Lucarionite Z", moves: ["Close Combat", "Meteor Mash", "Bullet Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Hippowdon (id: 450)
  450: [
    { name: "Sand Wall", nature: "Impish", ability: "Sand Stream", item: "Sitrus Berry", moves: ["Earthquake", "Rock Slide", "Yawn", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Offensive Sand", nature: "Adamant", ability: "Sand Stream", item: "Assault Vest", moves: ["Earthquake", "Rock Slide", "Ice Fang", "Body Press"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Whirlwind Phaser", nature: "Impish", ability: "Sand Stream", item: "Leftovers", moves: ["Earthquake", "Whirlwind", "Slack Off", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Brave", ability: "Sand Force", item: "Life Orb", moves: ["Earthquake", "Rock Slide", "Ice Fang", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Rhyperior (id: 464)
  464: [
    { name: "Trick Room Sweeper", nature: "Brave", ability: "Solid Rock", item: "Life Orb", moves: ["Earthquake", "Rock Slide", "Ice Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Weakness Policy", nature: "Brave", ability: "Solid Rock", item: "Weakness Policy", moves: ["Earthquake", "Rock Slide", "Ice Punch", "Protect"], sp: { hp: 32, attack: 20, defense: 0, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Solid Rock", item: "Assault Vest", moves: ["Earthquake", "Rock Slide", "Ice Punch", "Megahorn"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Choice Band", nature: "Brave", ability: "Solid Rock", item: "Choice Band", moves: ["Earthquake", "Rock Slide", "Ice Punch", "Megahorn"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Leafeon (id: 470)
  470: [
    { name: "Swords Dance", nature: "Jolly", ability: "Chlorophyll", item: "Life Orb", moves: ["Swords Dance", "Leaf Blade", "X-Scissor", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Sun Sweeper", nature: "Adamant", ability: "Chlorophyll", item: "Life Orb", moves: ["Leaf Blade", "X-Scissor", "Knock Off", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Bulky Support", nature: "Impish", ability: "Leaf Guard", item: "Sitrus Berry", moves: ["Leaf Blade", "Helping Hand", "Synthesis", "Protect"], sp: { hp: 32, attack: 2, defense: 32, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Choice Band", nature: "Jolly", ability: "Chlorophyll", item: "Choice Band", moves: ["Leaf Blade", "X-Scissor", "Double-Edge", "Knock Off"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Glaceon (id: 471)
  471: [
    { name: "Trick Room Special", nature: "Quiet", ability: "Snow Cloak", item: "Choice Specs", moves: ["Blizzard", "Ice Beam", "Shadow Ball", "Water Pulse"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Modest", ability: "Ice Body", item: "Assault Vest", moves: ["Ice Beam", "Shadow Ball", "Water Pulse", "Freeze-Dry"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Offensive", nature: "Modest", ability: "Snow Cloak", item: "Life Orb", moves: ["Blizzard", "Shadow Ball", "Water Pulse", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Calm Mind", nature: "Modest", ability: "Ice Body", item: "Leftovers", moves: ["Calm Mind", "Ice Beam", "Shadow Ball", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
  ],

  // Gliscor (id: 472)
  472: [
    { name: "Poison Heal", nature: "Impish", ability: "Poison Heal", item: "Toxic Orb", moves: ["Earthquake", "Knock Off", "Tailwind", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Poison Heal", item: "Toxic Orb", moves: ["Swords Dance", "Earthquake", "Acrobatics", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Tailwind", nature: "Jolly", ability: "Hyper Cutter", item: "Focus Sash", moves: ["Earthquake", "Rock Slide", "Tailwind", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Offensive", nature: "Adamant", ability: "Poison Heal", item: "Toxic Orb", moves: ["Earthquake", "Knock Off", "Facade", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Froslass (id: 478)
  478: [
    { name: "Focus Sash Lead", nature: "Timid", ability: "Cursed Body", item: "Focus Sash", moves: ["Icy Wind", "Shadow Ball", "Will-O-Wisp", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Mega Sweeper", nature: "Timid", ability: "Snow Warning", item: "Froslassite", moves: ["Shadow Ball", "Ice Beam", "Thunderbolt", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Destiny Bond", nature: "Timid", ability: "Cursed Body", item: "Focus Sash", moves: ["Icy Wind", "Shadow Ball", "Destiny Bond", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Aurora Veil", nature: "Timid", ability: "Snow Cloak", item: "Light Clay", moves: ["Aurora Veil", "Icy Wind", "Shadow Ball", "Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Rotom (id: 479)
  479: [
    { name: "Wash Bulky", nature: "Calm", ability: "Levitate", item: "Sitrus Berry", moves: ["Charge", "Thunderbolt", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Heat Offensive", nature: "Modest", ability: "Levitate", item: "Choice Specs", moves: ["Charge", "Thunderbolt", "Volt Switch", "Trick"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Wash Offensive", nature: "Timid", ability: "Levitate", item: "Life Orb", moves: ["Charge", "Thunderbolt", "Nasty Plot", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Will-O-Wisp Pivot", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Thunderbolt", "Will-O-Wisp", "Thunder Wave", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Serperior (id: 497)
  497: [
    { name: "Contrary Sweeper", nature: "Timid", ability: "Contrary", item: "Life Orb", moves: ["Leaf Storm", "Dragon Pulse", "Glare", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Timid", ability: "Contrary", item: "Choice Specs", moves: ["Leaf Storm", "Dragon Pulse", "Energy Ball", "Giga Drain"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Glare Support", nature: "Timid", ability: "Contrary", item: "Focus Sash", moves: ["Leaf Storm", "Glare", "Taunt", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Substitute", nature: "Timid", ability: "Contrary", item: "Leftovers", moves: ["Leaf Storm", "Substitute", "Dragon Pulse", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Emboar (id: 500)
  500: [
    { name: "Trick Room Attacker", nature: "Brave", ability: "Reckless", item: "Life Orb", moves: ["Flare Blitz", "Close Combat", "Wild Charge", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Mega Sweeper", nature: "Adamant", ability: "Mold Breaker", item: "Emboarite", moves: ["Flare Blitz", "Close Combat", "Wild Charge", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Band", nature: "Brave", ability: "Reckless", item: "Choice Band", moves: ["Flare Blitz", "Close Combat", "Wild Charge", "Earthquake"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Brave", ability: "Thick Fat", item: "Assault Vest", moves: ["Flare Blitz", "Close Combat", "Rock Slide", "Earthquake"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Samurott (id: 503)
  503: [
    { name: "Swords Dance", nature: "Adamant", ability: "Shell Armor", item: "Life Orb", moves: ["Swords Dance", "Liquidation", "Sacred Sword", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Special Attacker", nature: "Modest", ability: "Torrent", item: "Choice Specs", moves: ["Hydro Pump", "Ice Beam", "Air Slash", "Grass Knot"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Mixed Attacker", nature: "Naive", ability: "Shell Armor", item: "Life Orb", moves: ["Razor Shell", "Sacred Sword", "Ice Beam", "Protect"], sp: { hp: 0, attack: 20, defense: 0, spAtk: 14, spDef: 0, speed: 32 } },
    { name: "Bulky Support", nature: "Bold", ability: "Torrent", item: "Sitrus Berry", moves: ["Surf", "Ice Beam", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
  ],

  // Excadrill (id: 530)
  530: [
    { name: "Sand Rush", nature: "Jolly", ability: "Sand Rush", item: "Life Orb", moves: ["Earthquake", "Iron Head", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mold Breaker", nature: "Jolly", ability: "Mold Breaker", item: "Focus Sash", moves: ["Earthquake", "Iron Head", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mega Piercing", nature: "Jolly", ability: "Piercing Drill", item: "Excadrite", moves: ["Earthquake", "Iron Head", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Mold Breaker", item: "Choice Scarf", moves: ["Earthquake", "Iron Head", "Rock Slide", "Rapid Spin"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Sand Rush", item: "Assault Vest", moves: ["Earthquake", "Iron Head", "Rock Slide", "Rapid Spin"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Audino (id: 531)
  531: [
    { name: "Mega Healer", nature: "Bold", ability: "Healer", item: "Audinite", moves: ["Dazzling Gleam", "Heal Pulse", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Follow Me Support", nature: "Calm", ability: "Regenerator", item: "Sitrus Berry", moves: ["Helping Hand", "Heal Pulse", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Offensive Mega", nature: "Modest", ability: "Healer", item: "Audinite", moves: ["Dazzling Gleam", "Hyper Voice", "Flamethrower", "Protect"], sp: { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 14, speed: 0 } },
    { name: "Ally Switch", nature: "Bold", ability: "Regenerator", item: "Sitrus Berry", moves: ["Dazzling Gleam", "Ally Switch", "Heal Pulse", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Whimsicott (id: 547)
  547: [
    { name: "Tailwind Lead", nature: "Timid", ability: "Prankster", item: "Focus Sash", moves: ["Tailwind", "Moonblast", "Encore", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Offensive Prankster", nature: "Timid", ability: "Prankster", item: "Life Orb", moves: ["Moonblast", "Energy Ball", "Tailwind", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Charm Support", nature: "Bold", ability: "Prankster", item: "Sitrus Berry", moves: ["Tailwind", "Charm", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Beat Up", nature: "Jolly", ability: "Prankster", item: "Focus Sash", moves: ["Beat Up", "Tailwind", "Encore", "Protect"], sp: { hp: 20, attack: 0, defense: 12, spAtk: 0, spDef: 2, speed: 32 } },
  ],

  // Krookodile (id: 553)
  553: [
    { name: "Intimidate Lead", nature: "Jolly", ability: "Intimidate", item: "Life Orb", moves: ["Earthquake", "Crunch", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Intimidate", item: "Choice Scarf", moves: ["Earthquake", "Crunch", "Rock Slide", "Close Combat"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Moxie Sweeper", nature: "Jolly", ability: "Moxie", item: "Focus Sash", moves: ["Earthquake", "Crunch", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Intimidate", item: "Assault Vest", moves: ["Earthquake", "Crunch", "Rock Slide", "Close Combat"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Zoroark (id: 571)
  571: [
    { name: "Illusion Sweeper", nature: "Timid", ability: "Illusion", item: "Life Orb", moves: ["Dark Pulse", "Flamethrower", "Focus Blast", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Nasty Plot", nature: "Timid", ability: "Illusion", item: "Focus Sash", moves: ["Nasty Plot", "Dark Pulse", "Flamethrower", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Timid", ability: "Illusion", item: "Choice Specs", moves: ["Dark Pulse", "Flamethrower", "Focus Blast", "Sludge Bomb"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Trick Room Counter", nature: "Timid", ability: "Illusion", item: "Focus Sash", moves: ["Dark Pulse", "Taunt", "Snarl", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Emolga (id: 587)
  587: [
    { name: "Speed Control", nature: "Timid", ability: "Motor Drive", item: "Focus Sash", moves: ["Nuzzle", "Encore", "Defog", "Protect"], sp: { hp: 20, attack: 0, defense: 12, spAtk: 0, spDef: 2, speed: 32 } },
    { name: "Offensive", nature: "Timid", ability: "Motor Drive", item: "Life Orb", moves: ["Thunderbolt", "Air Slash", "Encore", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "U-turn Pivot", nature: "Timid", ability: "Motor Drive", item: "Focus Sash", moves: ["Thunderbolt", "U-turn", "Nuzzle", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Tailwind Lead", nature: "Timid", ability: "Static", item: "Focus Sash", moves: ["Defog", "Nuzzle", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Hydreigon (id: 635)
  635: [
    { name: "Choice Specs", nature: "Timid", ability: "Levitate", item: "Choice Specs", moves: ["Draco Meteor", "Dark Pulse", "Flamethrower", "Flash Cannon"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Life Orb", nature: "Timid", ability: "Levitate", item: "Life Orb", moves: ["Draco Meteor", "Dark Pulse", "Flamethrower", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Modest", ability: "Levitate", item: "Assault Vest", moves: ["Dark Pulse", "Draco Meteor", "Flamethrower", "Flash Cannon"], sp: { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 14, speed: 0 } },
    { name: "Tailwind", nature: "Timid", ability: "Levitate", item: "Focus Sash", moves: ["Tailwind", "Draco Meteor", "Dark Pulse", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Chesnaught (id: 652)
  652: [
    { name: "Bulky Support", nature: "Impish", ability: "Bulletproof", item: "Sitrus Berry", moves: ["Wood Hammer", "Drain Punch", "Spiky Shield", "Wide Guard"], sp: { hp: 32, attack: 2, defense: 32, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Mega Tank", nature: "Adamant", ability: "Bulletproof", item: "Chesnaughtite", moves: ["Wood Hammer", "Close Combat", "Spiky Shield", "Rock Slide"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Bulletproof", item: "Assault Vest", moves: ["Wood Hammer", "Drain Punch", "Rock Slide", "Earthquake"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Brave", ability: "Overgrow", item: "Life Orb", moves: ["Wood Hammer", "Close Combat", "Rock Slide", "Spiky Shield"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Delphox (id: 655)
  655: [
    { name: "Trick Room Setter", nature: "Quiet", ability: "Magician", item: "Mental Herb", moves: ["Trick Room", "Heat Wave", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Mega Sweeper", nature: "Timid", ability: "Levitate", item: "Delphoxite", moves: ["Heat Wave", "Psychic", "Dazzling Gleam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Timid", ability: "Blaze", item: "Choice Specs", moves: ["Overheat", "Psychic", "Dazzling Gleam", "Shadow Ball"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Calm Mind", nature: "Timid", ability: "Magician", item: "Sitrus Berry", moves: ["Calm Mind", "Mystical Fire", "Psychic", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Greninja (id: 658)
  658: [
    { name: "Protean Attacker", nature: "Timid", ability: "Protean", item: "Life Orb", moves: ["Hydro Pump", "Dark Pulse", "Ice Beam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Timid", ability: "Protean", item: "Choice Specs", moves: ["Hydro Pump", "Dark Pulse", "Ice Beam", "Water Shuriken"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mega Ninja", nature: "Timid", ability: "Protean", item: "Greninjite", moves: ["Hydro Pump", "Dark Pulse", "Ice Beam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mat Block Lead", nature: "Jolly", ability: "Protean", item: "Focus Sash", moves: ["Brick Break", "Rock Slide", "Low Kick", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Physical Attacker", nature: "Jolly", ability: "Protean", item: "Life Orb", moves: ["Waterfall", "Night Slash", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Diggersby (id: 660)
  660: [
    { name: "Huge Power Attacker", nature: "Adamant", ability: "Huge Power", item: "Life Orb", moves: ["Earthquake", "Body Slam", "Quick Attack", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Band", nature: "Adamant", ability: "Huge Power", item: "Choice Band", moves: ["Earthquake", "Body Slam", "Fire Punch", "Quick Attack"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Trick Room", nature: "Brave", ability: "Huge Power", item: "Assault Vest", moves: ["Earthquake", "Body Slam", "Fire Punch", "Quick Attack"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Huge Power", item: "Focus Sash", moves: ["Swords Dance", "Earthquake", "Quick Attack", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Talonflame (id: 663)
  663: [
    { name: "Gale Wings", nature: "Adamant", ability: "Gale Wings", item: "Sharp Beak", moves: ["Brave Bird", "Flare Blitz", "Tailwind", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Band", nature: "Jolly", ability: "Gale Wings", item: "Choice Band", moves: ["Brave Bird", "Flare Blitz", "U-turn", "Quick Attack"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Tailwind Lead", nature: "Jolly", ability: "Gale Wings", item: "Focus Sash", moves: ["Tailwind", "Brave Bird", "Flare Blitz", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Will-O-Wisp", nature: "Jolly", ability: "Gale Wings", item: "Sitrus Berry", moves: ["Brave Bird", "Will-O-Wisp", "Tailwind", "Protect"], sp: { hp: 20, attack: 14, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Meowstic (id: 678)
  678: [
    { name: "Prankster Support", nature: "Bold", ability: "Prankster", item: "Light Clay", moves: ["Light Screen", "Reflect", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Thunder Wave", nature: "Calm", ability: "Prankster", item: "Sitrus Berry", moves: ["Psychic", "Thunder Wave", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Offensive", nature: "Timid", ability: "Competitive", item: "Life Orb", moves: ["Psychic", "Shadow Ball", "Thunderbolt", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Yawn Disruptor", nature: "Bold", ability: "Prankster", item: "Mental Herb", moves: ["Yawn", "Psychic", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Mega Mind", nature: "Timid", ability: "Mind Over Matter", item: "Meowsticite", moves: ["Psychic", "Shadow Ball", "Thunder Wave", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Aegislash (id: 681)
  681: [
    { name: "Weakness Policy", nature: "Quiet", ability: "Stance Change", item: "Weakness Policy", moves: ["Shadow Ball", "Flash Cannon", "King's Shield", "Shadow Sneak"], sp: { hp: 32, attack: 2, defense: 0, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Physical Attacker", nature: "Brave", ability: "Stance Change", item: "Life Orb", moves: ["Shadow Claw", "Sacred Sword", "Iron Head", "King's Shield"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Mixed Attacker", nature: "Quiet", ability: "Stance Change", item: "Life Orb", moves: ["Shadow Ball", "Flash Cannon", "Shadow Sneak", "King's Shield"], sp: { hp: 32, attack: 2, defense: 0, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Shield", nature: "Sassy", ability: "Stance Change", item: "Leftovers", moves: ["Shadow Ball", "King's Shield", "Substitute", "Flash Cannon"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Sylveon (id: 700)
  700: [
    { name: "Pixilate Hyper Voice", nature: "Modest", ability: "Pixilate", item: "Choice Specs", moves: ["Hyper Voice", "Shadow Ball", "Psyshock", "Mystical Fire"], sp: { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 14, speed: 0 } },
    { name: "Bulky Attacker", nature: "Modest", ability: "Pixilate", item: "Throat Spray", moves: ["Hyper Voice", "Shadow Ball", "Quick Attack", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Calm Mind", nature: "Bold", ability: "Pixilate", item: "Leftovers", moves: ["Calm Mind", "Hyper Voice", "Mystical Fire", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Support", nature: "Calm", ability: "Pixilate", item: "Sitrus Berry", moves: ["Hyper Voice", "Helping Hand", "Yawn", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Hawlucha (id: 701)
  701: [
    { name: "Unburden Sweeper", nature: "Adamant", ability: "Unburden", item: "Electric Seed", moves: ["Close Combat", "Acrobatics", "Swords Dance", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mega Wrestler", nature: "Jolly", ability: "Sky High", item: "Hawluchite", moves: ["Close Combat", "Brave Bird", "Stone Edge", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Mold Breaker", item: "Choice Scarf", moves: ["Close Combat", "Brave Bird", "U-turn", "Rock Slide"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Terrain Lead", nature: "Adamant", ability: "Unburden", item: "Psychic Seed", moves: ["Close Combat", "Acrobatics", "Feint", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  ],

  // Noivern (id: 715)
  715: [
    { name: "Tailwind Lead", nature: "Timid", ability: "Infiltrator", item: "Focus Sash", moves: ["Draco Meteor", "Hurricane", "Tailwind", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Timid", ability: "Infiltrator", item: "Choice Specs", moves: ["Draco Meteor", "Hurricane", "Flamethrower", "U-turn"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Life Orb", nature: "Timid", ability: "Frisk", item: "Life Orb", moves: ["Draco Meteor", "Hurricane", "Flamethrower", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Super Fang", nature: "Timid", ability: "Infiltrator", item: "Focus Sash", moves: ["Super Fang", "Tailwind", "Draco Meteor", "Protect"], sp: { hp: 20, attack: 0, defense: 12, spAtk: 0, spDef: 2, speed: 32 } },
  ],

  // Decidueye (id: 724)
  724: [
    { name: "Swords Dance", nature: "Adamant", ability: "Long Reach", item: "Focus Sash", moves: ["Swords Dance", "Spirit Shackle", "Leaf Blade", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Overgrow", item: "Assault Vest", moves: ["Spirit Shackle", "Leaf Blade", "Brave Bird", "Sucker Punch"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room", nature: "Brave", ability: "Overgrow", item: "Life Orb", moves: ["Spirit Shackle", "Leaf Blade", "Sucker Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Choice Band", nature: "Jolly", ability: "Long Reach", item: "Choice Band", moves: ["Spirit Shackle", "Leaf Blade", "Brave Bird", "U-turn"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Incineroar (id: 727)
  727: [
    { name: "Intimidate Support", nature: "Careful", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Intimidate", item: "Assault Vest", moves: ["Flare Blitz", "Darkest Lariat", "Fake Out", "Leech Life"], sp: { hp: 32, attack: 20, defense: 0, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Offensive", nature: "Adamant", ability: "Intimidate", item: "Choice Band", moves: ["Flare Blitz", "Darkest Lariat", "Leech Life", "Close Combat"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Parting Shot Pivot", nature: "Careful", ability: "Intimidate", item: "Safety Goggles", moves: ["Fake Out", "Darkest Lariat", "Parting Shot", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Fast Fake Out", nature: "Jolly", ability: "Intimidate", item: "Focus Sash", moves: ["Fake Out", "Flare Blitz", "Darkest Lariat", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Crabominable (id: 740)
  740: [
    { name: "Trick Room Sweeper", nature: "Brave", ability: "Iron Fist", item: "Life Orb", moves: ["Close Combat", "Ice Hammer", "Thunder Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Brave", ability: "Iron Fist", item: "Assault Vest", moves: ["Close Combat", "Ice Hammer", "Thunder Punch", "Earthquake"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Choice Band", nature: "Brave", ability: "Iron Fist", item: "Choice Band", moves: ["Close Combat", "Ice Hammer", "Thunder Punch", "Earthquake"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulk Up", nature: "Brave", ability: "Iron Fist", item: "Sitrus Berry", moves: ["Bulk Up", "Drain Punch", "Ice Hammer", "Protect"], sp: { hp: 32, attack: 20, defense: 14, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Mega Permafrost", nature: "Brave", ability: "Permafrost Fist", item: "Crabominite", moves: ["Ice Hammer", "Drain Punch", "Thunder Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Lycanroc (id: 745)
  745: [
    { name: "Sand Rush", nature: "Jolly", ability: "Sand Rush", item: "Life Orb", moves: ["Accelerock", "Stone Edge", "Close Combat", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Focus Sash Lead", nature: "Jolly", ability: "Steadfast", item: "Focus Sash", moves: ["Accelerock", "Stone Edge", "Close Combat", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Band", nature: "Jolly", ability: "Sand Rush", item: "Choice Band", moves: ["Stone Edge", "Close Combat", "Crunch", "Rock Slide"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Counter Sash", nature: "Jolly", ability: "Steadfast", item: "Focus Sash", moves: ["Close Combat", "Accelerock", "Stone Edge", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Toxapex (id: 748)
  748: [
    { name: "Defensive Wall", nature: "Bold", ability: "Regenerator", item: "Rocky Helmet", moves: ["Surf", "Toxic", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Specially Defensive", nature: "Calm", ability: "Regenerator", item: "Black Sludge", moves: ["Surf", "Haze", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Baneful Bunker", nature: "Bold", ability: "Merciless", item: "Black Sludge", moves: ["Surf", "Toxic", "Baneful Bunker", "Recover"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Offensive", nature: "Bold", ability: "Regenerator", item: "Assault Vest", moves: ["Surf", "Sludge Bomb", "Ice Beam", "Infestation"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
  ],

  // Tsareena (id: 763)
  763: [
    { name: "Offensive Lead", nature: "Jolly", ability: "Queenly Majesty", item: "Life Orb", moves: ["Power Whip", "High Jump Kick", "U-turn", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Scarf", nature: "Jolly", ability: "Queenly Majesty", item: "Choice Scarf", moves: ["Power Whip", "High Jump Kick", "U-turn", "Triple Axel"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Queenly Majesty", item: "Assault Vest", moves: ["Power Whip", "High Jump Kick", "U-turn", "Knock Off"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Bulky Support", nature: "Impish", ability: "Queenly Majesty", item: "Sitrus Berry", moves: ["Power Whip", "Helping Hand", "U-turn", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
  ],

  // Oranguru (id: 765)
  765: [
    { name: "Trick Room Setter", nature: "Relaxed", ability: "Inner Focus", item: "Mental Herb", moves: ["Trick Room", "Psychic", "Instruct", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 } },
    { name: "Instruct Support", nature: "Sassy", ability: "Inner Focus", item: "Sitrus Berry", moves: ["Instruct", "Psychic", "Calm Mind", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Offensive TR", nature: "Quiet", ability: "Inner Focus", item: "Life Orb", moves: ["Trick Room", "Psychic", "Focus Blast", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Telepathy", nature: "Relaxed", ability: "Telepathy", item: "Safety Goggles", moves: ["Trick Room", "Psychic", "Instruct", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Mimikyu (id: 778)
  778: [
    { name: "Trick Room Setter", nature: "Brave", ability: "Disguise", item: "Mental Herb", moves: ["Trick Room", "Shadow Claw", "Play Rough", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Swords Dance", nature: "Adamant", ability: "Disguise", item: "Life Orb", moves: ["Swords Dance", "Shadow Claw", "Play Rough", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Focus Sash Lead", nature: "Jolly", ability: "Disguise", item: "Focus Sash", moves: ["Shadow Sneak", "Play Rough", "Trick Room", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Will-O-Wisp", nature: "Adamant", ability: "Disguise", item: "Sitrus Berry", moves: ["Shadow Claw", "Play Rough", "Will-O-Wisp", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  ],

  // Drampa (id: 780)
  780: [
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Berserk", item: "Life Orb", moves: ["Draco Meteor", "Hyper Voice", "Flamethrower", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Mega Elder", nature: "Modest", ability: "Elder Wisdom", item: "Drampite", moves: ["Draco Meteor", "Hyper Voice", "Flamethrower", "Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Choice Specs", nature: "Quiet", ability: "Berserk", item: "Choice Specs", moves: ["Draco Meteor", "Hyper Voice", "Flamethrower", "Thunderbolt"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Quiet", ability: "Sap Sipper", item: "Assault Vest", moves: ["Draco Meteor", "Hyper Voice", "Flamethrower", "Ice Beam"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Kommo-o (id: 784)
  784: [
    { name: "Clangorous Soulblaze", nature: "Timid", ability: "Soundproof", item: "Kommonium Z", moves: ["Clanging Scales", "Focus Blast", "Flamethrower", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Body Press", nature: "Impish", ability: "Bulletproof", item: "Sitrus Berry", moves: ["Body Press", "Dragon Claw", "Coaching", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Choice Specs", nature: "Timid", ability: "Soundproof", item: "Choice Specs", moves: ["Clanging Scales", "Focus Blast", "Flamethrower", "Flash Cannon"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Offensive Mixed", nature: "Naive", ability: "Overcoat", item: "Life Orb", moves: ["Close Combat", "Clanging Scales", "Flamethrower", "Protect"], sp: { hp: 0, attack: 14, defense: 0, spAtk: 20, spDef: 0, speed: 32 } },
  ],

  // Hatterene (id: 858)
  858: [
    { name: "Trick Room Setter", nature: "Quiet", ability: "Magic Bounce", item: "Focus Sash", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Life Orb TR", nature: "Quiet", ability: "Magic Bounce", item: "Life Orb", moves: ["Trick Room", "Dazzling Gleam", "Mystical Fire", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Mental Herb", nature: "Quiet", ability: "Magic Bounce", item: "Mental Herb", moves: ["Trick Room", "Dazzling Gleam", "Psychic", "Healing Wish"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Calm Mind", nature: "Quiet", ability: "Magic Bounce", item: "Sitrus Berry", moves: ["Calm Mind", "Dazzling Gleam", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
  ],

  // Dragapult (id: 887)
  887: [
    { name: "Physical Attacker", nature: "Jolly", ability: "Clear Body", item: "Life Orb", moves: ["Dragon Darts", "Phantom Force", "Sucker Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Timid", ability: "Infiltrator", item: "Choice Specs", moves: ["Draco Meteor", "Shadow Ball", "Flamethrower", "Thunderbolt"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Will-O-Wisp Support", nature: "Timid", ability: "Clear Body", item: "Focus Sash", moves: ["Draco Meteor", "Shadow Ball", "Will-O-Wisp", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Dragon Dance", nature: "Jolly", ability: "Clear Body", item: "Lum Berry", moves: ["Dragon Dance", "Dragon Darts", "Phantom Force", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Kleavor (id: 900)
  900: [
    { name: "Offensive Lead", nature: "Adamant", ability: "Sharpness", item: "Life Orb", moves: ["Stone Axe", "X-Scissor", "Close Combat", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Band", nature: "Jolly", ability: "Sharpness", item: "Choice Band", moves: ["Stone Axe", "X-Scissor", "Close Combat", "U-turn"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Focus Sash", nature: "Jolly", ability: "Sharpness", item: "Focus Sash", moves: ["Stone Axe", "X-Scissor", "Quick Attack", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Swarm", item: "Focus Sash", moves: ["Swords Dance", "Stone Axe", "X-Scissor", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Basculegion (id: 902)
  902: [
    { name: "Last Respects Sweeper", nature: "Adamant", ability: "Swift Swim", item: "Choice Band", moves: ["Last Respects", "Wave Crash", "Aqua Jet", "Shadow Ball"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Physical Attacker", nature: "Adamant", ability: "Swift Swim", item: "Life Orb", moves: ["Wave Crash", "Last Respects", "Aqua Jet", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Special Swift Swim", nature: "Modest", ability: "Swift Swim", item: "Choice Specs", moves: ["Hydro Pump", "Shadow Ball", "Ice Beam", "Surf"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Adaptability Wallbreaker", nature: "Adamant", ability: "Adaptability", item: "Life Orb", moves: ["Wave Crash", "Last Respects", "Shadow Ball", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Focus Sash Lead", nature: "Jolly", ability: "Swift Swim", item: "Focus Sash", moves: ["Last Respects", "Wave Crash", "Shadow Ball", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Sneasler (id: 903)
  903: [
    { name: "Fast Attacker", nature: "Jolly", ability: "Poison Touch", item: "Life Orb", moves: ["Close Combat", "Dire Claw", "Fake Out", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Band", nature: "Jolly", ability: "Poison Touch", item: "Choice Band", moves: ["Close Combat", "Dire Claw", "U-turn", "Shadow Claw"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Focus Sash Lead", nature: "Jolly", ability: "Pressure", item: "Focus Sash", moves: ["Close Combat", "Dire Claw", "Fake Out", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Poison Touch", item: "Focus Sash", moves: ["Swords Dance", "Close Combat", "Dire Claw", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Meowscarada (id: 908)
  908: [
    { name: "Flower Trick", nature: "Jolly", ability: "Protean", item: "Life Orb", moves: ["Flower Trick", "Knock Off", "Sucker Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Band", nature: "Jolly", ability: "Protean", item: "Choice Band", moves: ["Flower Trick", "Knock Off", "U-turn", "Play Rough"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Focus Sash", nature: "Jolly", ability: "Overgrow", item: "Focus Sash", moves: ["Flower Trick", "Knock Off", "Thunder Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Support", nature: "Jolly", ability: "Protean", item: "Focus Sash", moves: ["Flower Trick", "Knock Off", "Taunt", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Maushold (id: 925)
  925: [
    { name: "Technician", nature: "Jolly", ability: "Technician", item: "Wide Lens", moves: ["Population Bomb", "Follow Me", "Tidy Up", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Friend Guard", nature: "Jolly", ability: "Friend Guard", item: "Safety Goggles", moves: ["Follow Me", "Helping Hand", "Super Fang", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
    { name: "Choice Band", nature: "Jolly", ability: "Technician", item: "Choice Band", moves: ["Population Bomb", "Bite", "U-turn", "Tidy Up"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Follow Me Support", nature: "Jolly", ability: "Friend Guard", item: "Focus Sash", moves: ["Follow Me", "Helping Hand", "Encore", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Armarouge (id: 936)
  936: [
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Flash Fire", item: "Life Orb", moves: ["Armor Cannon", "Expanding Force", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Weakness Policy", nature: "Quiet", ability: "Flash Fire", item: "Weakness Policy", moves: ["Armor Cannon", "Psychic", "Energy Ball", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Choice Specs", nature: "Modest", ability: "Flash Fire", item: "Choice Specs", moves: ["Armor Cannon", "Psychic", "Energy Ball", "Shadow Ball"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Assault Vest", nature: "Modest", ability: "Flash Fire", item: "Assault Vest", moves: ["Armor Cannon", "Psychic", "Energy Ball", "Shadow Ball"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Scovillain (id: 952)
  952: [
    { name: "Sun Attacker", nature: "Timid", ability: "Chlorophyll", item: "Life Orb", moves: ["Flamethrower", "Energy Ball", "Stomping Tantrum", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Modest", ability: "Chlorophyll", item: "Choice Specs", moves: ["Overheat", "Energy Ball", "Fire Blast", "Solar Beam"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Physical Attacker", nature: "Jolly", ability: "Chlorophyll", item: "Life Orb", moves: ["Flare Blitz", "Seed Bomb", "Crunch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Focus Sash", nature: "Timid", ability: "Moody", item: "Focus Sash", moves: ["Flamethrower", "Energy Ball", "Endure", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mega Spicy", nature: "Bold", ability: "Spicy Spray", item: "Scovillainite", moves: ["Flamethrower", "Energy Ball", "Leech Seed", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 } },
  ],

  // Tinkaton (id: 959)
  959: [
    { name: "Fake Out Lead", nature: "Jolly", ability: "Mold Breaker", item: "Sitrus Berry", moves: ["Gigaton Hammer", "Play Rough", "Fake Out", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 12 } },
    { name: "Encore Support", nature: "Jolly", ability: "Own Tempo", item: "Sitrus Berry", moves: ["Gigaton Hammer", "Encore", "Fake Out", "Protect"], sp: { hp: 20, attack: 14, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Choice Band", nature: "Adamant", ability: "Mold Breaker", item: "Choice Band", moves: ["Gigaton Hammer", "Play Rough", "Knock Off", "Skitter Smack"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Stealth Rock", nature: "Jolly", ability: "Mold Breaker", item: "Focus Sash", moves: ["Stealth Rock", "Gigaton Hammer", "Encore", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Palafin (id: 964)
  964: [
    { name: "Hero Attacker", nature: "Adamant", ability: "Zero to Hero", item: "Mystic Water", moves: ["Jet Punch", "Wave Crash", "Close Combat", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Choice Band Hero", nature: "Adamant", ability: "Zero to Hero", item: "Choice Band", moves: ["Jet Punch", "Wave Crash", "Close Combat", "Ice Punch"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Bulk Up", nature: "Adamant", ability: "Zero to Hero", item: "Sitrus Berry", moves: ["Bulk Up", "Jet Punch", "Drain Punch", "Protect"], sp: { hp: 32, attack: 20, defense: 14, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Fast Hero", nature: "Jolly", ability: "Zero to Hero", item: "Life Orb", moves: ["Jet Punch", "Close Combat", "Wave Crash", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Pivot Hero", nature: "Adamant", ability: "Zero to Hero", item: "Mystic Water", moves: ["Flip Turn", "Jet Punch", "Close Combat", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  ],

  // Glimmora (id: 970)
  970: [
    { name: "Hazard Lead", nature: "Timid", ability: "Toxic Debris", item: "Focus Sash", moves: ["Mortal Spin", "Power Gem", "Sludge Wave", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Offensive", nature: "Timid", ability: "Toxic Debris", item: "Life Orb", moves: ["Power Gem", "Sludge Wave", "Earth Power", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Choice Specs", nature: "Modest", ability: "Toxic Debris", item: "Choice Specs", moves: ["Power Gem", "Sludge Wave", "Earth Power", "Energy Ball"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Endure", nature: "Timid", ability: "Toxic Debris", item: "Power Herb", moves: ["Meteor Beam", "Sludge Wave", "Endure", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mega Toxic Crystal", nature: "Timid", ability: "Toxic Crystallize", item: "Glimmorite", moves: ["Power Gem", "Sludge Wave", "Earth Power", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Kingambit (id: 983)
  983: [
    { name: "Supreme Overlord", nature: "Adamant", ability: "Supreme Overlord", item: "Black Glasses", moves: ["Kowtow Cleave", "Sucker Punch", "Iron Head", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Defiant", item: "Assault Vest", moves: ["Kowtow Cleave", "Sucker Punch", "Iron Head", "Low Kick"], sp: { hp: 32, attack: 32, defense: 0, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Defiant Lead", nature: "Adamant", ability: "Defiant", item: "Lum Berry", moves: ["Kowtow Cleave", "Iron Head", "Sucker Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Swords Dance", nature: "Adamant", ability: "Supreme Overlord", item: "Sitrus Berry", moves: ["Swords Dance", "Kowtow Cleave", "Sucker Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Sinistcha (id: 1013)
  1013: [
    { name: "Trick Room Tank", nature: "Quiet", ability: "Hospitality", item: "Sitrus Berry", moves: ["Matcha Gotcha", "Shadow Ball", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Calm Mind", nature: "Bold", ability: "Hospitality", item: "Leftovers", moves: ["Calm Mind", "Matcha Gotcha", "Shadow Ball", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Choice Specs", nature: "Modest", ability: "Hospitality", item: "Choice Specs", moves: ["Matcha Gotcha", "Shadow Ball", "Energy Ball", "Calm Mind"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Support", nature: "Calm", ability: "Hospitality", item: "Sitrus Berry", moves: ["Matcha Gotcha", "Endure", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Archaludon (id: 1018)
  1018: [
    { name: "Stamina Tank", nature: "Bold", ability: "Stamina", item: "Leftovers", moves: ["Brick Break", "Flash Cannon", "Electro Shot", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Offensive", nature: "Modest", ability: "Stalwart", item: "Life Orb", moves: ["Flash Cannon", "Electro Shot", "Dragon Pulse", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Assault Vest", nature: "Modest", ability: "Stamina", item: "Assault Vest", moves: ["Flash Cannon", "Electro Shot", "Dragon Pulse", "Brick Break"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Rain Sweeper", nature: "Modest", ability: "Stalwart", item: "Life Orb", moves: ["Electro Shot", "Flash Cannon", "Dragon Pulse", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Hydrapple (id: 1019)
  1019: [
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Regenerator", item: "Assault Vest", moves: ["Fickle Beam", "Dragon Pulse", "Giga Drain", "Earth Power"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Supersweet Syrup", nature: "Quiet", ability: "Supersweet Syrup", item: "Life Orb", moves: ["Fickle Beam", "Giga Drain", "Earth Power", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Offensive", nature: "Modest", ability: "Regenerator", item: "Choice Specs", moves: ["Fickle Beam", "Dragon Pulse", "Giga Drain", "Earth Power"], sp: { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 14, speed: 0 } },
    { name: "Bulky Regen", nature: "Calm", ability: "Regenerator", item: "Sitrus Berry", moves: ["Fickle Beam", "Giga Drain", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Beedrill (id: 15)
  15: [
    { name: "Mega Lead", nature: "Jolly", ability: "Adaptability", item: "Beedrillite", moves: ["U-turn","Poison Jab","X-Scissor","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Adaptability", item: "Beedrillite", moves: ["Swords Dance","Poison Jab","Drill Run","Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Non-Mega Pivot", nature: "Jolly", ability: "Swarm", item: "Focus Sash", moves: ["U-turn","Poison Jab","Fell Stinger","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],


  // Arcanine (id: 59)
  59: [
    { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz","Extreme Speed","Will-O-Wisp","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "AV Attacker", nature: "Adamant", ability: "Intimidate", item: "Assault Vest", moves: ["Flare Blitz","Extreme Speed","Close Combat","Crunch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Wisp", nature: "Impish", ability: "Intimidate", item: "Leftovers", moves: ["Will-O-Wisp","Flare Blitz","Morning Sun","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Scarf", nature: "Jolly", ability: "Intimidate", item: "Choice Scarf", moves: ["Flare Blitz","Close Combat","Wild Charge","Extreme Speed"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Alakazam (id: 65)
  65: [
    { name: "Mega Attacker", nature: "Timid", ability: "Trace", item: "Alakazite", moves: ["Psychic","Shadow Ball","Focus Blast","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Sash Lead", nature: "Timid", ability: "Magic Guard", item: "Focus Sash", moves: ["Psychic","Dazzling Gleam","Shadow Ball","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Calm Mind", nature: "Timid", ability: "Magic Guard", item: "Life Orb", moves: ["Psyshock","Shadow Ball","Calm Mind","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Victreebel (id: 71)
  71: [
    { name: "Sun Sweeper", nature: "Modest", ability: "Chlorophyll", item: "Life Orb", moves: ["Leaf Storm","Sludge Bomb","Sleep Powder","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Physical Sun", nature: "Adamant", ability: "Chlorophyll", item: "Life Orb", moves: ["Power Whip","Sucker Punch","Knock Off","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Mega Corrosive", nature: "Modest", ability: "Corrosive Maw", item: "Victreebelite", moves: ["Leaf Storm","Sludge Bomb","Weather Ball","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Mega Mixed", nature: "Rash", ability: "Corrosive Maw", item: "Victreebelite", moves: ["Power Whip","Sludge Bomb","Sucker Punch","Protect"], sp: { hp: 0, attack: 20, defense: 2, spAtk: 12, spDef: 0, speed: 32 } },
  ],

  // Ditto (id: 132)
  132: [
    { name: "Imposter Scarf", nature: "Jolly", ability: "Imposter", item: "Choice Scarf", moves: ["Transform"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Azumarill (id: 184)
  184: [
    { name: "Belly Drum", nature: "Adamant", ability: "Huge Power", item: "Sitrus Berry", moves: ["Belly Drum","Aqua Jet","Play Rough","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "AV Attacker", nature: "Adamant", ability: "Huge Power", item: "Assault Vest", moves: ["Play Rough","Aqua Jet","Liquidation","Superpower"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Choice Band", nature: "Adamant", ability: "Huge Power", item: "Choice Band", moves: ["Play Rough","Aqua Jet","Liquidation","Knock Off"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Espeon (id: 196)
  196: [
    { name: "Magic Bounce Support", nature: "Timid", ability: "Magic Bounce", item: "Focus Sash", moves: ["Psychic","Dazzling Gleam","Helping Hand","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Calm Mind", nature: "Timid", ability: "Magic Bounce", item: "Leftovers", moves: ["Psyshock","Shadow Ball","Calm Mind","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Steelix (id: 208)
  208: [
    { name: "Trick Room Tank", nature: "Brave", ability: "Sturdy", item: "Leftovers", moves: ["Earthquake","Iron Head","Body Press","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Hazard Setter", nature: "Relaxed", ability: "Sturdy", item: "Leftovers", moves: ["Stealth Rock","Gyro Ball","Earthquake","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Mega Sand Force", nature: "Brave", ability: "Sand Force", item: "Steelixite", moves: ["Earthquake","Iron Head","Rock Slide","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Mega Body Press", nature: "Relaxed", ability: "Sand Force", item: "Steelixite", moves: ["Body Press","Gyro Ball","Earthquake","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Aggron (id: 306)
  306: [
    { name: "Mega Tank", nature: "Adamant", ability: "Filter", item: "Aggronite", moves: ["Iron Head","Earthquake","Heavy Slam","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Body Press", nature: "Impish", ability: "Filter", item: "Aggronite", moves: ["Body Press","Iron Head","Iron Defense","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "AV Non-Mega", nature: "Adamant", ability: "Sturdy", item: "Assault Vest", moves: ["Iron Head","Earthquake","Head Smash","Rock Slide"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],







  // Lopunny (id: 428)
  428: [
    { name: "Mega Fake Out", nature: "Jolly", ability: "Scrappy", item: "Lopunnite", moves: ["Fake Out","High Jump Kick","Facade","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Encore Support", nature: "Jolly", ability: "Scrappy", item: "Lopunnite", moves: ["Fake Out","High Jump Kick","Encore","Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  ],

  // Spiritomb (id: 442)
  442: [
    { name: "Bulky WoW", nature: "Bold", ability: "Pressure", item: "Leftovers", moves: ["Will-O-Wisp","Foul Play","Snarl","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "TR Attacker", nature: "Quiet", ability: "Pressure", item: "Choice Specs", moves: ["Shadow Ball","Dark Pulse","Psychic","Trick Room"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Abomasnow (id: 460)
  460: [
    { name: "Mega Snow", nature: "Brave", ability: "Snow Warning", item: "Abomasite", moves: ["Blizzard","Wood Hammer","Ice Shard","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Aurora Veil", nature: "Calm", ability: "Snow Warning", item: "Light Clay", moves: ["Blizzard","Aurora Veil","Energy Ball","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Mixed Mega", nature: "Quiet", ability: "Snow Warning", item: "Abomasite", moves: ["Blizzard","Giga Drain","Ice Shard","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],


  // Gallade (id: 475)
  475: [
    { name: "Mega Swords", nature: "Jolly", ability: "Inner Focus", item: "Galladite", moves: ["Close Combat","Psycho Cut","Knock Off","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "SD Sweeper", nature: "Jolly", ability: "Sharpness", item: "Life Orb", moves: ["Close Combat","Leaf Blade","Psycho Cut","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Golurk (id: 623)
  623: [
    { name: "TR Attacker", nature: "Brave", ability: "Iron Fist", item: "Assault Vest", moves: ["Earthquake","Poltergeist","Drain Punch","Ice Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "No Guard", nature: "Brave", ability: "No Guard", item: "Life Orb", moves: ["Earthquake","Poltergeist","Rock Slide","Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  ],


  // Furfrou (id: 676)
  676: [
    { name: "Fur Coat Physical", nature: "Jolly", ability: "Fur Coat", item: "Leftovers", moves: ["Double-Edge","Sucker Punch","Thunder Wave","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Support", nature: "Jolly", ability: "Fur Coat", item: "Sitrus Berry", moves: ["Double-Edge","Charm","Thunder Wave","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Clawitzer (id: 693)
  693: [
    { name: "Launcher Specs", nature: "Quiet", ability: "Mega Launcher", item: "Choice Specs", moves: ["Water Pulse","Dark Pulse","Aura Sphere","Dragon Pulse"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "TR Attacker", nature: "Quiet", ability: "Mega Launcher", item: "Life Orb", moves: ["Water Pulse","Dark Pulse","Aura Sphere","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],




  // Mudsdale (id: 750)
  750: [
    { name: "Stamina Tank", nature: "Adamant", ability: "Stamina", item: "Leftovers", moves: ["High Horsepower","Heavy Slam","Body Press","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "AV Attacker", nature: "Brave", ability: "Stamina", item: "Assault Vest", moves: ["High Horsepower","Close Combat","Rock Slide","Heavy Slam"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Corviknight (id: 823)
  823: [
    { name: "Bulky Tailwind", nature: "Impish", ability: "Mirror Armor", item: "Sitrus Berry", moves: ["Brave Bird","Tailwind","Iron Head","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Body Press", nature: "Impish", ability: "Mirror Armor", item: "Leftovers", moves: ["Body Press","Iron Defense","Roost","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Offensive", nature: "Adamant", ability: "Pressure", item: "Life Orb", moves: ["Brave Bird","Iron Head","U-turn","Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  ],


  // Runerigus (id: 867)
  867: [
    { name: "TR Wall", nature: "Relaxed", ability: "Wandering Spirit", item: "Leftovers", moves: ["Earthquake","Body Press","Trick Room","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Hazard Setter", nature: "Relaxed", ability: "Wandering Spirit", item: "Mental Herb", moves: ["Stealth Rock","Will-O-Wisp","Shadow Claw","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Garganacl (id: 934)
  934: [
    { name: "Salt Cure Wall", nature: "Careful", ability: "Purifying Salt", item: "Leftovers", moves: ["Salt Cure","Recover","Body Press","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Iron Defense Press", nature: "Impish", ability: "Purifying Salt", item: "Leftovers", moves: ["Iron Defense","Body Press","Salt Cure","Recover"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "AV Attacker", nature: "Adamant", ability: "Purifying Salt", item: "Assault Vest", moves: ["Salt Cure","Rock Slide","Body Press","Heavy Slam"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Farigiraf (id: 981)
  981: [
    { name: "TR Support", nature: "Quiet", ability: "Armor Tail", item: "Sitrus Berry", moves: ["Hyper Voice","Psychic","Trick Room","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Nasty Plot", nature: "Modest", ability: "Armor Tail", item: "Throat Spray", moves: ["Hyper Voice","Psyshock","Nasty Plot","Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
    { name: "Support", nature: "Bold", ability: "Armor Tail", item: "Sitrus Berry", moves: ["Psychic","Helping Hand","Trick Room","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Heat Rotom (id: 10008)
  10008: [
    { name: "Choice Specs", nature: "Modest", ability: "Levitate", item: "Choice Specs", moves: ["Overheat","Thunderbolt","Volt Switch","Helping Hand"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky WoW", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Thunderbolt","Overheat","Will-O-Wisp","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Nasty Plot", nature: "Timid", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot","Thunderbolt","Overheat","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Wash Rotom (id: 10009)
  10009: [
    { name: "Bulky Pivot", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Hydro Pump","Volt Switch","Will-O-Wisp","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Offensive", nature: "Modest", ability: "Levitate", item: "Choice Specs", moves: ["Hydro Pump","Thunderbolt","Volt Switch","Nasty Plot"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Nasty Plot", nature: "Modest", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot","Thunderbolt","Hydro Pump","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Frost Rotom (id: 10010)
  10010: [
    { name: "AV Attacker", nature: "Modest", ability: "Levitate", item: "Assault Vest", moves: ["Blizzard","Thunderbolt","Volt Switch","Helping Hand"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky WoW", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Thunderbolt","Blizzard","Will-O-Wisp","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Fan Rotom (id: 10011)
  10011: [
    { name: "Speed Control", nature: "Timid", ability: "Levitate", item: "Sitrus Berry", moves: ["Air Slash","Thunderbolt","Thunder Wave","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Nasty Plot", nature: "Timid", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot","Air Slash","Thunderbolt","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Mow Rotom (id: 10012)
  10012: [
    { name: "Bulky Pivot", nature: "Modest", ability: "Levitate", item: "Sitrus Berry", moves: ["Leaf Storm","Thunderbolt","Volt Switch","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Nasty Plot", nature: "Modest", ability: "Levitate", item: "Sitrus Berry", moves: ["Nasty Plot","Leaf Storm","Thunderbolt","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Alolan Raichu (id: 10100)
  10100: [
    { name: "Terrain Surfer", nature: "Timid", ability: "Surge Surfer", item: "Life Orb", moves: ["Thunderbolt","Psychic","Volt Switch","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Fake Out Lead", nature: "Timid", ability: "Surge Surfer", item: "Focus Sash", moves: ["Fake Out","Thunderbolt","Psychic","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Encore Support", nature: "Timid", ability: "Surge Surfer", item: "Focus Sash", moves: ["Thunderbolt","Encore","Nuzzle","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Alolan Ninetales (id: 10103)
  10103: [
    { name: "Aurora Veil Lead", nature: "Timid", ability: "Snow Warning", item: "Light Clay", moves: ["Aurora Veil","Blizzard","Moonblast","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Offensive", nature: "Timid", ability: "Snow Warning", item: "Focus Sash", moves: ["Blizzard","Moonblast","Freeze-Dry","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Icy Wind Support", nature: "Timid", ability: "Snow Warning", item: "Focus Sash", moves: ["Icy Wind","Moonblast","Aurora Veil","Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
  ],

  // Hisuian Samurott (id: 10336)
  10336: [
    { name: "Sharpness SD", nature: "Adamant", ability: "Sharpness", item: "Focus Sash", moves: ["Ceaseless Edge","Razor Shell","Sacred Sword","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "AV Attacker", nature: "Adamant", ability: "Sharpness", item: "Assault Vest", moves: ["Ceaseless Edge","Razor Shell","Aqua Jet","Knock Off"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Band", nature: "Jolly", ability: "Sharpness", item: "Choice Band", moves: ["Ceaseless Edge","Razor Shell","Sacred Sword","Aqua Jet"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Hisuian Zoroark (id: 10340)
  10340: [
    { name: "Nasty Plot", nature: "Timid", ability: "Illusion", item: "Focus Sash", moves: ["Shadow Ball","Hyper Voice","Nasty Plot","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Attacker", nature: "Timid", ability: "Illusion", item: "Choice Specs", moves: ["Shadow Ball","Hyper Voice","Flamethrower","Focus Blast"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "U-turn Pivot", nature: "Timid", ability: "Illusion", item: "Focus Sash", moves: ["Shadow Ball","Hyper Voice","U-turn","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Hisuian Decidueye (id: 10341)
  10341: [
    { name: "SD Sweeper", nature: "Adamant", ability: "Scrappy", item: "Life Orb", moves: ["Close Combat","Leaf Blade","Swords Dance","Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Scrappy", item: "Assault Vest", moves: ["Close Combat","Leaf Blade","Knock Off","Shadow Sneak"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Band", nature: "Jolly", ability: "Scrappy", item: "Choice Band", moves: ["Close Combat","Leaf Blade","Brave Bird","U-turn"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Vaporeon (id: 134)
  134: [
    { name: "Bulky Support", nature: "Bold", ability: "Water Absorb", item: "Leftovers", moves: ["Scald","Ice Beam","Helping Hand","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room Tank", nature: "Quiet", ability: "Water Absorb", item: "Sitrus Berry", moves: ["Muddy Water","Ice Beam","Hyper Voice","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Wish Support", nature: "Calm", ability: "Water Absorb", item: "Leftovers", moves: ["Scald","Ice Beam","Baton Pass","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Jolteon (id: 135)
  135: [
    { name: "Fast Attacker", nature: "Timid", ability: "Volt Absorb", item: "Life Orb", moves: ["Thunderbolt","Volt Switch","Shadow Ball","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Sweeper", nature: "Timid", ability: "Volt Absorb", item: "Choice Specs", moves: ["Thunderbolt","Volt Switch","Shadow Ball","Hyper Voice"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Support Lead", nature: "Timid", ability: "Volt Absorb", item: "Focus Sash", moves: ["Thunderbolt","Volt Switch","Helping Hand","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
  ],

  // Aerodactyl (id: 142)
  142: [
    { name: "Mega Sweeper", nature: "Jolly", ability: "Tough Claws", item: "Aerodactylite", moves: ["Rock Slide","Dual Wingbeat","Earthquake","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Tailwind Lead", nature: "Jolly", ability: "Unnerve", item: "Focus Sash", moves: ["Rock Slide","Tailwind","Taunt","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Unnerve", item: "Choice Band", moves: ["Rock Slide","Dual Wingbeat","Earthquake","Iron Head"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Typhlosion (id: 157)
  157: [
    { name: "Eruption Lead", nature: "Timid", ability: "Flash Fire", item: "Choice Scarf", moves: ["Eruption","Heat Wave","Focus Blast","Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Attacker", nature: "Modest", ability: "Flash Fire", item: "Choice Specs", moves: ["Eruption","Heat Wave","Focus Blast","Solar Beam"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Bulky Attacker", nature: "Modest", ability: "Flash Fire", item: "Assault Vest", moves: ["Heat Wave","Flamethrower","Focus Blast","Extrasensory"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Slowking (id: 199)
  199: [
    { name: "Trick Room Setter", nature: "Quiet", ability: "Regenerator", item: "Sitrus Berry", moves: ["Psychic","Scald","Trick Room","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Assault Vest Tank", nature: "Quiet", ability: "Regenerator", item: "Assault Vest", moves: ["Psychic","Scald","Ice Beam","Flamethrower"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Support", nature: "Bold", ability: "Regenerator", item: "Leftovers", moves: ["Scald","Psychic","Thunder Wave","Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
  ],

  // Sableye (id: 302)
  302: [
    { name: "Prankster Support", nature: "Careful", ability: "Prankster", item: "Sitrus Berry", moves: ["Fake Out","Will-O-Wisp","Quash","Recover"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Mega Sableye", nature: "Bold", ability: "Magic Bounce", item: "Sablenite", moves: ["Will-O-Wisp","Foul Play","Recover","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Screen Setter", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect","Light Screen","Will-O-Wisp","Recover"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Torterra (id: 389)
  389: [
    { name: "Trick Room Attacker", nature: "Brave", ability: "Shell Armor", item: "Assault Vest", moves: ["Wood Hammer","Earthquake","Rock Slide","Heavy Slam"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Overgrow", item: "Sitrus Berry", moves: ["Wood Hammer","Earthquake","Rock Slide","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Wide Guard Support", nature: "Impish", ability: "Shell Armor", item: "Leftovers", moves: ["Earthquake","Wood Hammer","Wide Guard","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Infernape (id: 392)
  392: [
    { name: "Mixed Attacker", nature: "Naive", ability: "Iron Fist", item: "Life Orb", moves: ["Close Combat","Flare Blitz","Mach Punch","Protect"], sp: { hp: 0, attack: 32, defense: 0, spAtk: 2, spDef: 0, speed: 32 } },
    { name: "Fake Out Lead", nature: "Jolly", ability: "Iron Fist", item: "Focus Sash", moves: ["Fake Out","Close Combat","Flare Blitz","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Special Attacker", nature: "Timid", ability: "Blaze", item: "Choice Specs", moves: ["Heat Wave","Focus Blast","Vacuum Wave","Overheat"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Weavile (id: 461)
  461: [
    { name: "Fast Physical", nature: "Jolly", ability: "Pressure", item: "Focus Sash", moves: ["Fake Out","Triple Axel","Knock Off","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Pressure", item: "Choice Band", moves: ["Triple Axel","Knock Off","Ice Shard","Low Kick"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Pressure", item: "Life Orb", moves: ["Swords Dance","Triple Axel","Knock Off","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Conkeldurr (id: 534)
  534: [
    { name: "Guts Attacker", nature: "Brave", ability: "Guts", item: "Flame Orb", moves: ["Close Combat","Mach Punch","Drain Punch","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Iron Fist TR", nature: "Brave", ability: "Iron Fist", item: "Assault Vest", moves: ["Drain Punch","Mach Punch","Ice Punch","Thunder Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Fighter", nature: "Adamant", ability: "Guts", item: "Flame Orb", moves: ["Close Combat","Knock Off","Mach Punch","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Garbodor (id: 569)
  569: [
    { name: "Toxic Spikes Lead", nature: "Impish", ability: "Aftermath", item: "Rocky Helmet", moves: ["Gunk Shot","Stomping Tantrum","Toxic Spikes","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Brave", ability: "Aftermath", item: "Assault Vest", moves: ["Gunk Shot","Stomping Tantrum","Seed Bomb","Drain Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Stench", item: "Sitrus Berry", moves: ["Gunk Shot","Stomping Tantrum","Drain Punch","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Vanilluxe (id: 584)
  584: [
    { name: "Snow Sweeper", nature: "Modest", ability: "Snow Warning", item: "Choice Specs", moves: ["Blizzard","Freeze-Dry","Flash Cannon","Ice Beam"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Aurora Veil Lead", nature: "Timid", ability: "Snow Warning", item: "Light Clay", moves: ["Blizzard","Aurora Veil","Freeze-Dry","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
    { name: "Assault Vest", nature: "Modest", ability: "Snow Warning", item: "Assault Vest", moves: ["Blizzard","Freeze-Dry","Flash Cannon","Ice Beam"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Stunfisk (id: 618)
  618: [
    { name: "Trick Room Tank", nature: "Relaxed", ability: "Static", item: "Leftovers", moves: ["Earth Power","Discharge","Muddy Water","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 2, spDef: 0, speed: 0 } },
    { name: "Bulky Attacker", nature: "Modest", ability: "Static", item: "Sitrus Berry", moves: ["Earth Power","Thunderbolt","Muddy Water","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Support", nature: "Bold", ability: "Limber", item: "Sitrus Berry", moves: ["Discharge","Earth Power","Thunder Wave","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Volcarona (id: 637)
  637: [
    { name: "Quiver Dance", nature: "Timid", ability: "Flame Body", item: "Life Orb", moves: ["Quiver Dance","Heat Wave","Bug Buzz","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Rage Powder Support", nature: "Bold", ability: "Flame Body", item: "Rocky Helmet", moves: ["Heat Wave","Bug Buzz","Rage Powder","Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Specs Sweeper", nature: "Modest", ability: "Flame Body", item: "Choice Specs", moves: ["Heat Wave","Bug Buzz","Psychic","Overheat"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Vivillon (id: 666)
  666: [
    { name: "Sleep Lead", nature: "Timid", ability: "Compound Eyes", item: "Focus Sash", moves: ["Sleep Powder","Hurricane","Bug Buzz","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Rage Powder", nature: "Bold", ability: "Compound Eyes", item: "Sitrus Berry", moves: ["Sleep Powder","Hurricane","Rage Powder","Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Tailwind Support", nature: "Timid", ability: "Compound Eyes", item: "Focus Sash", moves: ["Sleep Powder","Tailwind","Hurricane","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  ],

  // Tyrantrum (id: 697)
  697: [
    { name: "Strong Jaw Attacker", nature: "Adamant", ability: "Strong Jaw", item: "Life Orb", moves: ["Dragon Claw","Rock Slide","Fire Fang","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Rock Head Recoil", nature: "Jolly", ability: "Rock Head", item: "Choice Band", moves: ["Head Smash","Outrage","Earthquake","Dragon Claw"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Dragon Dance", nature: "Jolly", ability: "Strong Jaw", item: "Lum Berry", moves: ["Dragon Dance","Dragon Claw","Rock Slide","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Aurorus (id: 699)
  699: [
    { name: "Refrigerate Attacker", nature: "Modest", ability: "Refrigerate", item: "Choice Specs", moves: ["Hyper Voice","Ancient Power","Thunderbolt","Earth Power"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Aurora Veil Lead", nature: "Modest", ability: "Snow Warning", item: "Light Clay", moves: ["Aurora Veil","Hyper Voice","Ancient Power","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Trick Room Special", nature: "Quiet", ability: "Refrigerate", item: "Life Orb", moves: ["Hyper Voice","Ancient Power","Thunderbolt","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Klefki (id: 707)
  707: [
    { name: "Prankster Support", nature: "Bold", ability: "Prankster", item: "Sitrus Berry", moves: ["Thunder Wave","Reflect","Light Screen","Foul Play"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Swagger Foul Play", nature: "Careful", ability: "Prankster", item: "Light Clay", moves: ["Reflect","Light Screen","Foul Play","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Dual Screen Lead", nature: "Bold", ability: "Prankster", item: "Light Clay", moves: ["Reflect","Light Screen","Thunder Wave","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Gourgeist (id: 711)
  711: [
    { name: "Trick Room Setter", nature: "Relaxed", ability: "Frisk", item: "Sitrus Berry", moves: ["Trick Room","Will-O-Wisp","Seed Bomb","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Bulky Attacker", nature: "Brave", ability: "Frisk", item: "Life Orb", moves: ["Seed Bomb","Phantom Force","Rock Slide","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Status Spreader", nature: "Impish", ability: "Insomnia", item: "Leftovers", moves: ["Will-O-Wisp","Leech Seed","Seed Bomb","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Primarina (id: 730)
  730: [
    { name: "Specs Attacker", nature: "Modest", ability: "Liquid Voice", item: "Choice Specs", moves: ["Hyper Voice","Moonblast","Ice Beam","Energy Ball"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Trick Room Sweeper", nature: "Quiet", ability: "Liquid Voice", item: "Life Orb", moves: ["Hyper Voice","Moonblast","Ice Beam","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Support", nature: "Calm", ability: "Torrent", item: "Sitrus Berry", moves: ["Surf","Moonblast","Icy Wind","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  ],

  // Toucannon (id: 733)
  733: [
    { name: "Skill Link Attacker", nature: "Adamant", ability: "Skill Link", item: "Choice Band", moves: ["Bullet Seed","Rock Blast","Brave Bird","Beak Blast"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Beak Blast", nature: "Adamant", ability: "Skill Link", item: "Sitrus Berry", moves: ["Beak Blast","Brave Bird","Bullet Seed","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Tailwind Lead", nature: "Jolly", ability: "Skill Link", item: "Focus Sash", moves: ["Brave Bird","Bullet Seed","Tailwind","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Araquanid (id: 752)
  752: [
    { name: "Water Bubble Attacker", nature: "Brave", ability: "Water Bubble", item: "Assault Vest", moves: ["Liquidation","Lunge","Poison Jab","Wide Guard"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Wide Guard Support", nature: "Brave", ability: "Water Bubble", item: "Sitrus Berry", moves: ["Liquidation","Lunge","Wide Guard","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Water Bubble", item: "Choice Band", moves: ["Liquidation","Lunge","Poison Jab","Leech Life"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Sandaconda (id: 844)
  844: [
    { name: "Sand Setter", nature: "Impish", ability: "Sand Spit", item: "Sitrus Berry", moves: ["Earthquake","Rock Slide","Coil","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Physical Attacker", nature: "Adamant", ability: "Sand Spit", item: "Life Orb", moves: ["Earthquake","Rock Slide","Iron Head","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Trick Room Tank", nature: "Brave", ability: "Shed Skin", item: "Assault Vest", moves: ["Earthquake","Rock Slide","Iron Head","Body Press"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Polteageist (id: 855)
  855: [
    { name: "Shell Smash Sweeper", nature: "Modest", ability: "Cursed Body", item: "Focus Sash", moves: ["Shell Smash","Shadow Ball","Stored Power","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Attacker", nature: "Timid", ability: "Weak Armor", item: "Choice Specs", moves: ["Shadow Ball","Psychic","Giga Drain","Dark Pulse"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Cursed Body", item: "Life Orb", moves: ["Shadow Ball","Psychic","Giga Drain","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Mr. Rime (id: 866)
  866: [
    { name: "Screen Cleaner Lead", nature: "Timid", ability: "Screen Cleaner", item: "Focus Sash", moves: ["Freeze-Dry","Psychic","Fake Out","Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Trick Room Setter", nature: "Quiet", ability: "Screen Cleaner", item: "Sitrus Berry", moves: ["Trick Room","Freeze-Dry","Psychic","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Specs Attacker", nature: "Modest", ability: "Screen Cleaner", item: "Choice Specs", moves: ["Freeze-Dry","Psychic","Shadow Ball","Focus Blast"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Alcremie (id: 869)
  869: [
    { name: "Decorate Support", nature: "Bold", ability: "Sweet Veil", item: "Sitrus Berry", moves: ["Decorate","Dazzling Gleam","Recover","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Aroma Veil Support", nature: "Calm", ability: "Aroma Veil", item: "Leftovers", moves: ["Decorate","Dazzling Gleam","Helping Hand","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Aroma Veil", item: "Life Orb", moves: ["Dazzling Gleam","Psychic","Mystical Fire","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Morpeko (id: 877)
  877: [
    { name: "Fast Attacker", nature: "Jolly", ability: "Hunger Switch", item: "Life Orb", moves: ["Aura Wheel","Crunch","Seed Bomb","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Fake Out Lead", nature: "Jolly", ability: "Hunger Switch", item: "Focus Sash", moves: ["Fake Out","Aura Wheel","Crunch","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Hunger Switch", item: "Choice Band", moves: ["Aura Wheel","Crunch","Seed Bomb","Rapid Spin"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Quaquaval (id: 914)
  914: [
    { name: "Moxie Sweeper", nature: "Jolly", ability: "Moxie", item: "Life Orb", moves: ["Aqua Step","Close Combat","Brave Bird","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Swords Dance", nature: "Jolly", ability: "Moxie", item: "Lum Berry", moves: ["Swords Dance","Aqua Step","Close Combat","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Band Attacker", nature: "Adamant", ability: "Moxie", item: "Choice Band", moves: ["Aqua Step","Close Combat","Brave Bird","Ice Spinner"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Ceruledge (id: 937)
  937: [
    { name: "Swords Dance Sweeper", nature: "Adamant", ability: "Flash Fire", item: "Life Orb", moves: ["Swords Dance","Bitter Blade","Shadow Claw","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Weak Armor Sweeper", nature: "Jolly", ability: "Weak Armor", item: "Focus Sash", moves: ["Bitter Blade","Shadow Claw","Close Combat","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Attacker", nature: "Adamant", ability: "Flash Fire", item: "Sitrus Berry", moves: ["Bitter Blade","Shadow Claw","Psycho Cut","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],

  // Orthworm (id: 968)
  968: [
    { name: "Body Press Tank", nature: "Impish", ability: "Earth Eater", item: "Leftovers", moves: ["Iron Head","Body Press","Coil","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Iron Defense", nature: "Impish", ability: "Earth Eater", item: "Sitrus Berry", moves: ["Iron Defense","Body Press","Iron Head","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Shed Tail Support", nature: "Jolly", ability: "Earth Eater", item: "Sitrus Berry", moves: ["Shed Tail","Iron Head","Earthquake","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  ],

  // Hisuian Arcanine (id: 5059)
  5059: [
    { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Flare Blitz","Head Smash","Extreme Speed","Protect"], sp: { hp: 32, attack: 20, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
    { name: "Rock Head Attacker", nature: "Jolly", ability: "Rock Head", item: "Life Orb", moves: ["Head Smash","Flare Blitz","Close Combat","Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
    { name: "Bulky Pivot", nature: "Impish", ability: "Intimidate", item: "Leftovers", moves: ["Flare Blitz","Rock Slide","Will-O-Wisp","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  ],

  // Hisuian Typhlosion (id: 5157)
  5157: [
    { name: "Scarf Eruption", nature: "Timid", ability: "Frisk", item: "Choice Scarf", moves: ["Eruption","Shadow Ball","Heat Wave","Flamethrower"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
    { name: "Specs Attacker", nature: "Modest", ability: "Frisk", item: "Choice Specs", moves: ["Eruption","Shadow Ball","Heat Wave","Infernal Parade"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Frisk", item: "Life Orb", moves: ["Shadow Ball","Heat Wave","Focus Blast","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Galarian Slowbro (id: 6080)
  6080: [
    { name: "Trick Room Attacker", nature: "Quiet", ability: "Quick Draw", item: "Life Orb", moves: ["Psychic","Sludge Bomb","Flamethrower","Trick Room"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Bulky Pivot", nature: "Bold", ability: "Own Tempo", item: "Sitrus Berry", moves: ["Psychic","Sludge Bomb","Slack Off","Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
    { name: "Assault Vest", nature: "Modest", ability: "Quick Draw", item: "Assault Vest", moves: ["Psychic","Sludge Bomb","Ice Beam","Flamethrower"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  ],

  // Galarian Slowking (id: 6199)
  6199: [
    { name: "Trick Room Setter", nature: "Quiet", ability: "Regenerator", item: "Sitrus Berry", moves: ["Psychic","Sludge Bomb","Trick Room","Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Curious Medicine", nature: "Quiet", ability: "Curious Medicine", item: "Assault Vest", moves: ["Psychic","Sludge Bomb","Ice Beam","Flamethrower"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
    { name: "Nasty Plot", nature: "Modest", ability: "Regenerator", item: "Life Orb", moves: ["Nasty Plot","Psychic","Sludge Bomb","Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  ],

  // Galarian Stunfisk (id: 6618)
  6618: [
    { name: "Trick Room Tank", nature: "Brave", ability: "Mimicry", item: "Leftovers", moves: ["Steel Beam","Earthquake","Rock Slide","Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
    { name: "Bulky Trapper", nature: "Impish", ability: "Mimicry", item: "Sitrus Berry", moves: ["Steel Beam","Earthquake","Snap Trap","Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
    { name: "Assault Vest", nature: "Adamant", ability: "Mimicry", item: "Assault Vest", moves: ["Steel Beam","Earthquake","Rock Slide","Stomping Tantrum"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  ],
  // Mamoswine (id: 473)
  473: [
    {"name":"Physical Attacker","nature":"Adamant","ability":"Thick Fat","item":"Life Orb","moves":["Icicle Crash","Earthquake","Ice Shard","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Assault Vest","nature":"Adamant","ability":"Thick Fat","item":"Assault Vest","moves":["Icicle Crash","Earthquake","Rock Slide","Ice Shard"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Focus Sash Lead","nature":"Jolly","ability":"Thick Fat","item":"Focus Sash","moves":["Icicle Crash","Earthquake","Ice Shard","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Choice Scarf","nature":"Jolly","ability":"Thick Fat","item":"Choice Scarf","moves":["Icicle Crash","Earthquake","Rock Slide","Knock Off"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Chandelure (id: 609)
  609: [
    {"name":"Mega Soul Furnace","nature":"Timid","ability":"Soul Furnace","item":"Chandelurite","moves":["Heat Wave","Shadow Ball","Energy Ball","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Trick Room Setter","nature":"Quiet","ability":"Flash Fire","item":"Focus Sash","moves":["Heat Wave","Shadow Ball","Trick Room","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Choice Specs","nature":"Modest","ability":"Flash Fire","item":"Choice Specs","moves":["Heat Wave","Shadow Ball","Overheat","Energy Ball"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"WoW Support","nature":"Timid","ability":"Flash Fire","item":"Sitrus Berry","moves":["Shadow Ball","Will-O-Wisp","Heat Wave","Protect"],"sp":{"hp":20,"attack":0,"defense":14,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Floette (id: 670)
  670: [
    {"name":"Mega Eternal Bloom","nature":"Timid","ability":"Eternal Bloom","item":"Floettite","moves":["Moonblast","Dazzling Gleam","Psychic","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Calm Mind","nature":"Timid","ability":"Flower Veil","item":"Sitrus Berry","moves":["Moonblast","Calm Mind","Psychic","Protect"],"sp":{"hp":20,"attack":0,"defense":14,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Support","nature":"Bold","ability":"Flower Veil","item":"Light Clay","moves":["Moonblast","Light Screen","Helping Hand","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":0,"spDef":32,"speed":0}},
  ],

  // Goodra (id: 706)
  706: [
    {"name":"Special Tank","nature":"Modest","ability":"Sap Sipper","item":"Assault Vest","moves":["Draco Meteor","Flamethrower","Thunderbolt","Sludge Bomb"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Life Orb Attacker","nature":"Modest","ability":"Sap Sipper","item":"Life Orb","moves":["Draco Meteor","Flamethrower","Muddy Water","Protect"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":32,"spDef":0,"speed":30}},
    {"name":"Choice Specs","nature":"Modest","ability":"Sap Sipper","item":"Choice Specs","moves":["Draco Meteor","Flamethrower","Ice Beam","Thunderbolt"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":32,"spDef":0,"speed":30}},
    {"name":"Bulky Dragon","nature":"Calm","ability":"Gooey","item":"Sitrus Berry","moves":["Dragon Pulse","Flamethrower","Breaking Swipe","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":0,"spDef":32,"speed":0}},
  ],

  // Hisuian Goodra (id: 5706)
  5706: [
    {"name":"Steel Dragon Tank","nature":"Modest","ability":"Sap Sipper","item":"Assault Vest","moves":["Flash Cannon","Dragon Pulse","Flamethrower","Thunderbolt"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Trick Room Attacker","nature":"Quiet","ability":"Sap Sipper","item":"Life Orb","moves":["Draco Meteor","Flash Cannon","Flamethrower","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Iron Defense Wall","nature":"Bold","ability":"Shell Armor","item":"Leftovers","moves":["Iron Defense","Acid Spray","Dragon Pulse","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Choice Specs","nature":"Modest","ability":"Sap Sipper","item":"Choice Specs","moves":["Draco Meteor","Flash Cannon","Hydro Pump","Thunderbolt"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":32,"spDef":0,"speed":30}},
    {"name":"Physical Mixed","nature":"Brave","ability":"Sap Sipper","item":"Life Orb","moves":["Iron Head","Outrage","Earthquake","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
  ],

  // Trevenant (id: 709)
  709: [
    {"name":"Harvest TR","nature":"Brave","ability":"Harvest","item":"Sitrus Berry","moves":["Wood Hammer","Shadow Claw","Horn Leech","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Will-O-Wisp Tank","nature":"Impish","ability":"Natural Cure","item":"Sitrus Berry","moves":["Will-O-Wisp","Shadow Claw","Horn Leech","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Physical Attacker","nature":"Adamant","ability":"Frisk","item":"Life Orb","moves":["Wood Hammer","Shadow Claw","Drain Punch","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Appletun (id: 842)
  842: [
    {"name":"Trick Room Tank","nature":"Quiet","ability":"Thick Fat","item":"Sitrus Berry","moves":["Apple Acid","Dragon Pulse","Recover","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Body Press Wall","nature":"Bold","ability":"Thick Fat","item":"Leftovers","moves":["Apple Acid","Body Press","Iron Defense","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Assault Vest","nature":"Quiet","ability":"Thick Fat","item":"Assault Vest","moves":["Apple Acid","Dragon Pulse","Energy Ball","Draco Meteor"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
  ],

  // Skeledirge (id: 911)
  911: [
    {"name":"Unaware Wall","nature":"Bold","ability":"Unaware","item":"Sitrus Berry","moves":["Torch Song","Shadow Ball","Will-O-Wisp","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Special Attacker","nature":"Modest","ability":"Blaze","item":"Life Orb","moves":["Torch Song","Shadow Ball","Heat Wave","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"TR Tank","nature":"Quiet","ability":"Unaware","item":"Sitrus Berry","moves":["Torch Song","Shadow Ball","Earth Power","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Snarl Support","nature":"Calm","ability":"Unaware","item":"Leftovers","moves":["Torch Song","Snarl","Will-O-Wisp","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":0,"spDef":32,"speed":0}},
  ],


  // Pidgeot (id: 18)
  18: [
    {"name":"Mega No Guard","nature":"Timid","ability":"No Guard","item":"Pidgeotite","moves":["Hurricane","Heat Wave","U-turn","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Mega Tailwind","nature":"Modest","ability":"No Guard","item":"Pidgeotite","moves":["Hurricane","Heat Wave","Tailwind","Protect"],"sp":{"hp":20,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":12}},
    {"name":"Fast Support","nature":"Timid","ability":"Keen Eye","item":"Focus Sash","moves":["Air Slash","Tailwind","U-turn","Protect"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":30,"spDef":0,"speed":32}},
  ],

  // Arbok (id: 24)
  24: [
    {"name":"Physical Attacker","nature":"Jolly","ability":"Intimidate","item":"Life Orb","moves":["Gunk Shot","Sucker Punch","Earthquake","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Intimidate Support","nature":"Adamant","ability":"Intimidate","item":"Sitrus Berry","moves":["Poison Jab","Sucker Punch","Glare","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
    {"name":"Coil Sweeper","nature":"Jolly","ability":"Shed Skin","item":"Sitrus Berry","moves":["Coil","Gunk Shot","Earthquake","Protect"],"sp":{"hp":4,"attack":30,"defense":0,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Machamp (id: 68)
  68: [
    {"name":"Guts Attacker","nature":"Brave","ability":"Guts","item":"Flame Orb","moves":["Close Combat","Knock Off","Rock Slide","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"No Guard","nature":"Brave","ability":"No Guard","item":"Assault Vest","moves":["Dynamic Punch","Stone Edge","Knock Off","Bullet Punch"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Trick Room Sweeper","nature":"Brave","ability":"No Guard","item":"Life Orb","moves":["Dynamic Punch","Knock Off","Rock Slide","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Bulky Attacker","nature":"Adamant","ability":"Guts","item":"Sitrus Berry","moves":["Close Combat","Knock Off","Bullet Punch","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
  ],

  // Ariados (id: 168)
  168: [
    {"name":"Sticky Web Lead","nature":"Brave","ability":"Insomnia","item":"Focus Sash","moves":["Sticky Web","Poison Jab","Sucker Punch","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"TR Attacker","nature":"Brave","ability":"Sniper","item":"Life Orb","moves":["Poison Jab","Megahorn","Sucker Punch","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Toxic Thread Support","nature":"Brave","ability":"Insomnia","item":"Sitrus Berry","moves":["Toxic Thread","Poison Jab","Sticky Web","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":0,"spDef":32,"speed":0}},
  ],

  // Forretress (id: 205)
  205: [
    {"name":"Hazard Setter","nature":"Relaxed","ability":"Sturdy","item":"Mental Herb","moves":["Stealth Rock","Gyro Ball","Rapid Spin","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"TR Physical","nature":"Brave","ability":"Sturdy","item":"Assault Vest","moves":["Gyro Ball","Earthquake","Volt Switch","Rapid Spin"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Body Press Wall","nature":"Relaxed","ability":"Sturdy","item":"Sitrus Berry","moves":["Body Press","Iron Defense","Stealth Rock","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
  ],

  // Medicham (id: 308)
  308: [
    {"name":"Mega Pure Power","nature":"Jolly","ability":"Pure Power","item":"Medichamite","moves":["High Jump Kick","Zen Headbutt","Ice Punch","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Mega Fake Out","nature":"Jolly","ability":"Pure Power","item":"Medichamite","moves":["Fake Out","High Jump Kick","Ice Punch","Protect"],"sp":{"hp":4,"attack":30,"defense":0,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Choice Scarf","nature":"Jolly","ability":"Pure Power","item":"Choice Scarf","moves":["High Jump Kick","Zen Headbutt","Ice Punch","Bullet Punch"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Bulky Mega","nature":"Adamant","ability":"Pure Power","item":"Medichamite","moves":["Drain Punch","Zen Headbutt","Fake Out","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
  ],

  // Manectric (id: 310)
  310: [
    {"name":"Mega Intimidate","nature":"Timid","ability":"Intimidate","item":"Manectite","moves":["Thunderbolt","Overheat","Volt Switch","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Mega Snarl Support","nature":"Timid","ability":"Intimidate","item":"Manectite","moves":["Thunderbolt","Snarl","Overheat","Protect"],"sp":{"hp":20,"attack":0,"defense":14,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Life Orb Attacker","nature":"Timid","ability":"Lightning Rod","item":"Life Orb","moves":["Thunderbolt","Overheat","Volt Switch","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Choice Specs","nature":"Timid","ability":"Lightning Rod","item":"Choice Specs","moves":["Thunderbolt","Overheat","Volt Switch","Hyper Voice"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
  ],

  // Sharpedo (id: 319)
  319: [
    {"name":"Mega Speed Boost","nature":"Adamant","ability":"Strong Jaw","item":"Sharpedonite","moves":["Crunch","Waterfall","Ice Fang","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Speed Boost Attacker","nature":"Adamant","ability":"Speed Boost","item":"Life Orb","moves":["Waterfall","Crunch","Ice Fang","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Mega Bulky","nature":"Adamant","ability":"Strong Jaw","item":"Sharpedonite","moves":["Crunch","Waterfall","Psychic Fangs","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
  ],

  // Camerupt (id: 323)
  323: [
    {"name":"Mega Sheer Force","nature":"Quiet","ability":"Sheer Force","item":"Cameruptite","moves":["Heat Wave","Earth Power","Flash Cannon","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"TR Mega Attacker","nature":"Quiet","ability":"Sheer Force","item":"Cameruptite","moves":["Eruption","Earth Power","Heat Wave","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Trick Room Special","nature":"Quiet","ability":"Solid Rock","item":"Life Orb","moves":["Heat Wave","Earth Power","Ancient Power","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Physical TR","nature":"Brave","ability":"Solid Rock","item":"Assault Vest","moves":["Flare Blitz","Earthquake","Rock Slide","Yawn"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
  ],

  // Banette (id: 354)
  354: [
    {"name":"Mega Prankster","nature":"Adamant","ability":"Prankster","item":"Banettite","moves":["Shadow Claw","Shadow Sneak","Will-O-Wisp","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Mega Destiny Bond","nature":"Jolly","ability":"Prankster","item":"Banettite","moves":["Shadow Claw","Destiny Bond","Will-O-Wisp","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Mega Taunt Support","nature":"Jolly","ability":"Prankster","item":"Banettite","moves":["Taunt","Shadow Claw","Will-O-Wisp","Protect"],"sp":{"hp":20,"attack":12,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Choice Band","nature":"Adamant","ability":"Insomnia","item":"Choice Band","moves":["Shadow Claw","Sucker Punch","Knock Off","Shadow Sneak"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
  ],

  // Chimecho (id: 358)
  358: [
    {"name":"Mega TR Support","nature":"Quiet","ability":"Levitate","item":"Chimechite","moves":["Psychic","Dazzling Gleam","Trick Room","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Mega Attacker","nature":"Modest","ability":"Levitate","item":"Chimechite","moves":["Psychic","Shadow Ball","Energy Ball","Protect"],"sp":{"hp":20,"attack":0,"defense":2,"spAtk":32,"spDef":12,"speed":0}},
    {"name":"Support","nature":"Bold","ability":"Levitate","item":"Sitrus Berry","moves":["Psychic","Trick Room","Heal Pulse","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":0,"spDef":14,"speed":0}},
  ],

  // Glalie (id: 362)
  362: [
    {"name":"Mega Refrigerate","nature":"Jolly","ability":"Refrigerate","item":"Glalitite","moves":["Body Slam","Earthquake","Explosion","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Mega Special","nature":"Timid","ability":"Refrigerate","item":"Glalitite","moves":["Blizzard","Freeze-Dry","Dark Pulse","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Focus Sash Lead","nature":"Timid","ability":"Inner Focus","item":"Focus Sash","moves":["Ice Beam","Freeze-Dry","Dark Pulse","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
  ],

  // Luxray (id: 405)
  405: [
    {"name":"Physical Attacker","nature":"Adamant","ability":"Intimidate","item":"Life Orb","moves":["Wild Charge","Crunch","Ice Fang","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Intimidate Support","nature":"Adamant","ability":"Intimidate","item":"Sitrus Berry","moves":["Wild Charge","Crunch","Volt Switch","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
    {"name":"Guts Attacker","nature":"Adamant","ability":"Guts","item":"Flame Orb","moves":["Facade","Wild Charge","Crunch","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Choice Band","nature":"Jolly","ability":"Intimidate","item":"Choice Band","moves":["Wild Charge","Crunch","Ice Fang","Volt Switch"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Roserade (id: 407)
  407: [
    {"name":"Special Attacker","nature":"Timid","ability":"Technician","item":"Life Orb","moves":["Leaf Storm","Sludge Bomb","Shadow Ball","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Focus Sash Lead","nature":"Timid","ability":"Natural Cure","item":"Focus Sash","moves":["Leaf Storm","Sludge Bomb","Sleep Powder","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Choice Specs","nature":"Modest","ability":"Technician","item":"Choice Specs","moves":["Leaf Storm","Sludge Bomb","Shadow Ball","Dazzling Gleam"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Bulky Support","nature":"Calm","ability":"Natural Cure","item":"Sitrus Berry","moves":["Giga Drain","Sludge Bomb","Sleep Powder","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":0,"spDef":32,"speed":0}},
  ],

  // Rampardos (id: 409)
  409: [
    {"name":"TR Attacker","nature":"Brave","ability":"Mold Breaker","item":"Life Orb","moves":["Head Smash","Earthquake","Rock Slide","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Choice Band","nature":"Brave","ability":"Mold Breaker","item":"Choice Band","moves":["Head Smash","Earthquake","Rock Slide","Zen Headbutt"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Focus Sash","nature":"Adamant","ability":"Mold Breaker","item":"Focus Sash","moves":["Head Smash","Earthquake","Rock Slide","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Bastiodon (id: 411)
  411: [
    {"name":"TR Wall","nature":"Relaxed","ability":"Sturdy","item":"Sitrus Berry","moves":["Wide Guard","Body Press","Metal Burst","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Stealth Rock Support","nature":"Relaxed","ability":"Sturdy","item":"Mental Herb","moves":["Stealth Rock","Body Press","Taunt","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Iron Defense","nature":"Relaxed","ability":"Sturdy","item":"Leftovers","moves":["Iron Defense","Body Press","Stealth Rock","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":0,"spDef":14,"speed":0}},
  ],

  // Toxicroak (id: 454)
  454: [
    {"name":"Rain Attacker","nature":"Adamant","ability":"Dry Skin","item":"Life Orb","moves":["Drain Punch","Poison Jab","Sucker Punch","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Swords Dance","nature":"Jolly","ability":"Dry Skin","item":"Focus Sash","moves":["Swords Dance","Drain Punch","Poison Jab","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Fake Out Lead","nature":"Jolly","ability":"Dry Skin","item":"Sitrus Berry","moves":["Fake Out","Drain Punch","Poison Jab","Protect"],"sp":{"hp":4,"attack":30,"defense":0,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Assault Vest","nature":"Adamant","ability":"Dry Skin","item":"Assault Vest","moves":["Drain Punch","Poison Jab","Sucker Punch","Ice Punch"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
  ],

  // Watchog (id: 505)
  505: [
    {"name":"Swords Dance","nature":"Jolly","ability":"Analytic","item":"Life Orb","moves":["Swords Dance","Crunch","Zen Headbutt","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Nasty Plot Special","nature":"Timid","ability":"Analytic","item":"Life Orb","moves":["Nasty Plot","Thunderbolt","Flamethrower","Shadow Ball"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Hypnosis Lead","nature":"Jolly","ability":"Keen Eye","item":"Focus Sash","moves":["Hypnosis","Super Fang","Crunch","Protect"],"sp":{"hp":4,"attack":30,"defense":0,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Mixed Attacker","nature":"Naive","ability":"Analytic","item":"Life Orb","moves":["Crunch","Thunderbolt","Fire Punch","Protect"],"sp":{"hp":0,"attack":16,"defense":2,"spAtk":16,"spDef":0,"speed":32}},
  ],

  // Liepard (id: 510)
  510: [
    {"name":"Prankster Support","nature":"Jolly","ability":"Prankster","item":"Focus Sash","moves":["Fake Out","Encore","Thunder Wave","Protect"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":0,"spDef":30,"speed":32}},
    {"name":"Prankster Taunt","nature":"Jolly","ability":"Prankster","item":"Focus Sash","moves":["Fake Out","Taunt","Foul Play","Protect"],"sp":{"hp":4,"attack":0,"defense":30,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Nasty Plot","nature":"Timid","ability":"Prankster","item":"Life Orb","moves":["Nasty Plot","Dark Pulse","Encore","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
  ],

  // Simisage (id: 512)
  512: [
    {"name":"Physical Attacker","nature":"Jolly","ability":"Overgrow","item":"Life Orb","moves":["Seed Bomb","Throat Chop","Superpower","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Nasty Plot","nature":"Timid","ability":"Overgrow","item":"Focus Sash","moves":["Nasty Plot","Leaf Storm","Focus Blast","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Choice Scarf","nature":"Jolly","ability":"Overgrow","item":"Choice Scarf","moves":["Seed Bomb","Throat Chop","Superpower","Rock Slide"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Simisear (id: 514)
  514: [
    {"name":"Physical Attacker","nature":"Jolly","ability":"Blaze","item":"Life Orb","moves":["Flare Blitz","Throat Chop","Superpower","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Nasty Plot","nature":"Timid","ability":"Blaze","item":"Focus Sash","moves":["Nasty Plot","Fire Blast","Focus Blast","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Choice Scarf","nature":"Jolly","ability":"Blaze","item":"Choice Scarf","moves":["Flare Blitz","Throat Chop","Superpower","Crunch"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Simipour (id: 516)
  516: [
    {"name":"Physical Attacker","nature":"Jolly","ability":"Torrent","item":"Life Orb","moves":["Waterfall","Throat Chop","Superpower","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Nasty Plot","nature":"Timid","ability":"Torrent","item":"Focus Sash","moves":["Nasty Plot","Hydro Pump","Ice Beam","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Choice Specs","nature":"Timid","ability":"Torrent","item":"Choice Specs","moves":["Hydro Pump","Ice Beam","Focus Blast","Surf"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
  ],

  // Cofagrigus (id: 563)
  563: [
    {"name":"TR Setter","nature":"Quiet","ability":"Mummy","item":"Sitrus Berry","moves":["Trick Room","Shadow Ball","Will-O-Wisp","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Nasty Plot TR","nature":"Quiet","ability":"Mummy","item":"Life Orb","moves":["Nasty Plot","Shadow Ball","Dark Pulse","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Defensive Wall","nature":"Bold","ability":"Mummy","item":"Leftovers","moves":["Will-O-Wisp","Shadow Ball","Body Press","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Ally Switch","nature":"Quiet","ability":"Mummy","item":"Mental Herb","moves":["Trick Room","Shadow Ball","Ally Switch","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":14,"spDef":0,"speed":0}},
  ],

  // Reuniclus (id: 579)
  579: [
    {"name":"TR Attacker","nature":"Quiet","ability":"Magic Guard","item":"Life Orb","moves":["Trick Room","Psychic","Focus Blast","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Calm Mind TR","nature":"Quiet","ability":"Magic Guard","item":"Sitrus Berry","moves":["Calm Mind","Psychic","Focus Blast","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Assault Vest","nature":"Quiet","ability":"Overcoat","item":"Assault Vest","moves":["Psychic","Focus Blast","Shadow Ball","Energy Ball"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Recovery Tank","nature":"Quiet","ability":"Magic Guard","item":"Life Orb","moves":["Psychic","Focus Blast","Recover","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":14,"spDef":0,"speed":0}},
  ],

  // Beartic (id: 614)
  614: [
    {"name":"TR Attacker","nature":"Brave","ability":"Swift Swim","item":"Life Orb","moves":["Icicle Crash","Close Combat","Rock Slide","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Rain Sweeper","nature":"Adamant","ability":"Swift Swim","item":"Life Orb","moves":["Icicle Crash","Liquidation","Close Combat","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Choice Band","nature":"Brave","ability":"Swift Swim","item":"Choice Band","moves":["Icicle Crash","Close Combat","Rock Slide","Superpower"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
  ],

  // Florges (id: 671)
  671: [
    {"name":"Special Tank","nature":"Calm","ability":"Flower Veil","item":"Sitrus Berry","moves":["Moonblast","Calm Mind","Synthesis","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":0,"spDef":32,"speed":0}},
    {"name":"Calm Mind","nature":"Quiet","ability":"Flower Veil","item":"Life Orb","moves":["Calm Mind","Moonblast","Psychic","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Offensive","nature":"Modest","ability":"Flower Veil","item":"Choice Specs","moves":["Moonblast","Psychic","Dazzling Gleam","Energy Ball"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":32,"spDef":0,"speed":30}},
    {"name":"Support","nature":"Bold","ability":"Flower Veil","item":"Sitrus Berry","moves":["Moonblast","Helping Hand","Wish","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":0,"spDef":14,"speed":0}},
  ],

  // Pangoro (id: 675)
  675: [
    {"name":"TR Attacker","nature":"Brave","ability":"Iron Fist","item":"Life Orb","moves":["Drain Punch","Knock Off","Ice Punch","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Assault Vest","nature":"Brave","ability":"Scrappy","item":"Assault Vest","moves":["Close Combat","Knock Off","Ice Punch","Bullet Punch"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Choice Band","nature":"Brave","ability":"Iron Fist","item":"Choice Band","moves":["Close Combat","Knock Off","Ice Punch","Drain Punch"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
  ],

  // Aromatisse (id: 683)
  683: [
    {"name":"TR Setter","nature":"Quiet","ability":"Aroma Veil","item":"Sitrus Berry","moves":["Trick Room","Moonblast","Helping Hand","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Bulky Support","nature":"Relaxed","ability":"Aroma Veil","item":"Sitrus Berry","moves":["Trick Room","Moonblast","Heal Pulse","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":0,"spDef":14,"speed":0}},
    {"name":"Calm Mind","nature":"Quiet","ability":"Aroma Veil","item":"Leftovers","moves":["Calm Mind","Moonblast","Psychic","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
  ],

  // Slurpuff (id: 685)
  685: [
    {"name":"Unburden Yawn","nature":"Adamant","ability":"Unburden","item":"Sitrus Berry","moves":["Yawn","Play Rough","Drain Punch","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":12}},
    {"name":"Support","nature":"Bold","ability":"Sweet Veil","item":"Sitrus Berry","moves":["Dazzling Gleam","Fake Tears","Helping Hand","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":0,"spDef":14,"speed":0}},
    {"name":"Unburden Attacker","nature":"Jolly","ability":"Unburden","item":"Sitrus Berry","moves":["Play Rough","Drain Punch","Charm","Protect"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
  ],

  // Heliolisk (id: 695)
  695: [
    {"name":"Sun Attacker","nature":"Timid","ability":"Solar Power","item":"Life Orb","moves":["Thunderbolt","Hyper Voice","Dark Pulse","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Choice Specs","nature":"Timid","ability":"Dry Skin","item":"Choice Specs","moves":["Thunderbolt","Hyper Voice","Surf","Volt Switch"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Focus Sash","nature":"Timid","ability":"Dry Skin","item":"Focus Sash","moves":["Thunderbolt","Hyper Voice","Electroweb","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Rain Attacker","nature":"Modest","ability":"Dry Skin","item":"Life Orb","moves":["Thunder","Hyper Voice","Surf","Protect"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":32,"spDef":0,"speed":30}},
  ],

  // Dedenne (id: 702)
  702: [
    {"name":"Support","nature":"Timid","ability":"Cheek Pouch","item":"Sitrus Berry","moves":["Nuzzle","Dazzling Gleam","Helping Hand","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Electroweb Lead","nature":"Timid","ability":"Plus","item":"Focus Sash","moves":["Thunderbolt","Dazzling Gleam","Electroweb","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Charge Beam","nature":"Timid","ability":"Plus","item":"Life Orb","moves":["Charge Beam","Thunderbolt","Dazzling Gleam","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
  ],

  // Avalugg (id: 713)
  713: [
    {"name":"TR Wall","nature":"Brave","ability":"Sturdy","item":"Assault Vest","moves":["Avalanche","Body Press","Heavy Slam","Earthquake"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
    {"name":"Body Press Tank","nature":"Relaxed","ability":"Sturdy","item":"Sitrus Berry","moves":["Iron Defense","Body Press","Avalanche","Protect"],"sp":{"hp":32,"attack":0,"defense":32,"spAtk":0,"spDef":2,"speed":0}},
    {"name":"Physical TR","nature":"Brave","ability":"Ice Body","item":"Life Orb","moves":["Avalanche","Earthquake","Rock Slide","Protect"],"sp":{"hp":32,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":0}},
  ],

  // Salazzle (id: 758)
  758: [
    {"name":"Fast Attacker","nature":"Timid","ability":"Corrosion","item":"Life Orb","moves":["Sludge Bomb","Flamethrower","Dragon Pulse","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Focus Sash","nature":"Timid","ability":"Corrosion","item":"Focus Sash","moves":["Fake Out","Sludge Bomb","Flamethrower","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Nasty Plot","nature":"Timid","ability":"Corrosion","item":"Focus Sash","moves":["Nasty Plot","Sludge Bomb","Flamethrower","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Choice Specs","nature":"Modest","ability":"Corrosion","item":"Choice Specs","moves":["Sludge Bomb","Heat Wave","Dragon Pulse","Overheat"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
  ],

  // Passimian (id: 766)
  766: [
    {"name":"Physical Attacker","nature":"Adamant","ability":"Defiant","item":"Life Orb","moves":["Close Combat","Knock Off","Rock Slide","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Choice Scarf","nature":"Jolly","ability":"Defiant","item":"Choice Scarf","moves":["Close Combat","Knock Off","Rock Slide","U-turn"],"sp":{"hp":0,"attack":32,"defense":2,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Bulky Attacker","nature":"Adamant","ability":"Defiant","item":"Sitrus Berry","moves":["Close Combat","Knock Off","Coaching","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
  ],

  // Flapple (id: 841)
  841: [
    {"name":"Physical Attacker","nature":"Adamant","ability":"Hustle","item":"Life Orb","moves":["Grav Apple","Dragon Rush","Sucker Punch","Protect"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Choice Band","nature":"Adamant","ability":"Hustle","item":"Choice Band","moves":["Grav Apple","Outrage","Sucker Punch","U-turn"],"sp":{"hp":4,"attack":32,"defense":0,"spAtk":0,"spDef":0,"speed":30}},
    {"name":"Special Attacker","nature":"Modest","ability":"Ripen","item":"Sitrus Berry","moves":["Draco Meteor","Leaf Storm","Dragon Pulse","Protect"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":32,"spDef":0,"speed":30}},
  ],

  // Wyrdeer (id: 899)
  899: [
    {"name":"TR Attacker","nature":"Quiet","ability":"Intimidate","item":"Life Orb","moves":["Psyshock","Expanding Force","Shadow Ball","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Intimidate Support","nature":"Adamant","ability":"Intimidate","item":"Sitrus Berry","moves":["Zen Headbutt","Double-Edge","Megahorn","Protect"],"sp":{"hp":20,"attack":32,"defense":2,"spAtk":0,"spDef":12,"speed":0}},
    {"name":"Calm Mind","nature":"Modest","ability":"Frisk","item":"Sitrus Berry","moves":["Calm Mind","Psychic","Shadow Ball","Protect"],"sp":{"hp":20,"attack":0,"defense":14,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Choice Specs","nature":"Modest","ability":"Intimidate","item":"Choice Specs","moves":["Psychic","Expanding Force","Shadow Ball","Energy Ball"],"sp":{"hp":4,"attack":0,"defense":0,"spAtk":32,"spDef":0,"speed":30}},
  ],

  // Bellibolt (id: 939)
  939: [
    {"name":"TR Attacker","nature":"Quiet","ability":"Electromorphosis","item":"Life Orb","moves":["Thunderbolt","Muddy Water","Volt Switch","Protect"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
    {"name":"Bulky Support","nature":"Modest","ability":"Static","item":"Sitrus Berry","moves":["Thunderbolt","Muddy Water","Electroweb","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":14,"spDef":0,"speed":0}},
    {"name":"Assault Vest","nature":"Quiet","ability":"Electromorphosis","item":"Assault Vest","moves":["Thunderbolt","Muddy Water","Weather Ball","Volt Switch"],"sp":{"hp":32,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":0}},
  ],

  // Espathra (id: 956)
  956: [
    {"name":"Speed Boost Sweeper","nature":"Timid","ability":"Speed Boost","item":"Life Orb","moves":["Lumina Crash","Dazzling Gleam","Shadow Ball","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Calm Mind","nature":"Timid","ability":"Speed Boost","item":"Focus Sash","moves":["Calm Mind","Lumina Crash","Dazzling Gleam","Protect"],"sp":{"hp":0,"attack":0,"defense":2,"spAtk":32,"spDef":0,"speed":32}},
    {"name":"Stored Power","nature":"Timid","ability":"Speed Boost","item":"Sitrus Berry","moves":["Calm Mind","Stored Power","Dazzling Gleam","Protect"],"sp":{"hp":20,"attack":0,"defense":14,"spAtk":0,"spDef":0,"speed":32}},
    {"name":"Bulky Pivot","nature":"Bold","ability":"Opportunist","item":"Sitrus Berry","moves":["Lumina Crash","Helping Hand","Trick Room","Protect"],"sp":{"hp":32,"attack":0,"defense":20,"spAtk":0,"spDef":14,"speed":0}},
  ],
};

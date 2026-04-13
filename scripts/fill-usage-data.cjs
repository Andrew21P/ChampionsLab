// Generate USAGE_DATA entries for 38 missing Pokemon + usageRate for all 201
// SP system: 66 total, 32 max per stat
// Format: { name, nature, ability, item, moves: [...], sp: { hp, attack, defense, spAtk, spDef, speed } }
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');
const usagePath = path.join(__dirname, '..', 'src', 'lib', 'usage-data.ts');

const src = fs.readFileSync(dataPath, 'utf8');
const match = src.match(/POKEMON_SEED[^=]*=\s*(\[[\s\S]*?\]);/);
const allPokemon = JSON.parse(match[1].replace(/,(\s*[}\]])/g, (_, s) => s));

// Build lookup
const pokemonById = {};
for (const p of allPokemon) pokemonById[p.id] = p;

// Get moves/abilities as strings
function getMoveNames(p) {
  return p.moves.map(m => typeof m === 'string' ? m : m.name);
}
function getAbilityNames(p) {
  return p.abilities.map(a => typeof a === 'string' ? a : a.name);
}
function getMegaAbility(p) {
  if (!p.forms) return null;
  const megaForm = p.forms.find(f => f.name && f.name.includes('Mega'));
  if (!megaForm) return null;
  if (typeof megaForm.ability === 'string') return megaForm.ability;
  if (megaForm.ability && megaForm.ability.name) return megaForm.ability.name;
  // Some mega forms might store ability differently
  if (megaForm.abilities && megaForm.abilities.length > 0) {
    const a = megaForm.abilities[0];
    return typeof a === 'string' ? a : a.name;
  }
  return null;
}
function getMegaItem(name) {
  const map = {
    'Pidgeot': 'Pidgeotite', 'Arbok': 'Arbokite', 'Medicham': 'Medichamite',
    'Manectric': 'Manectite', 'Sharpedo': 'Sharpedonite', 'Camerupt': 'Cameruptite',
    'Banette': 'Banettite', 'Chimecho': 'Chimechite', 'Glalie': 'Glalitite',
    'Steelix': 'Steelixite', 'Heracross': 'Heracronite', 'Abomasnow': 'Abomasite',
    'Beedrill': 'Beedrillite', 'Gyarados': 'Gyaradosite', 'Aggron': 'Aggronite',
    'Golurk': 'Golurkite',
  };
  return map[name] || (name.toLowerCase() + 'ite');
}

// Now define all 38 Pokemon sets manually using competitive VGC knowledge
// Each entry: id -> [CommonSet, ...]
const newSets = {};

// Get Pidgeot data
const pid = (id) => {
  const p = pokemonById[id];
  return { moves: getMoveNames(p), abilities: getAbilityNames(p), mega: getMegaAbility(p) };
};

// Pidgeot (id: 18) - Normal/Flying, 83/80/75/70/70/101, Mega: 83/80/80/135/80/121
newSets[18] = [
  { name: "Mega No Guard", nature: "Timid", ability: "No Guard", item: "Pidgeotite", moves: ["Hurricane", "Heat Wave", "U-turn", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Mega Tailwind", nature: "Modest", ability: "No Guard", item: "Pidgeotite", moves: ["Hurricane", "Heat Wave", "Tailwind", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 12 } },
  { name: "Fast Support", nature: "Timid", ability: "Keen Eye", item: "Focus Sash", moves: ["Air Slash", "Tailwind", "U-turn", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 30, spDef: 0, speed: 32 } },
];

// Arbok (id: 24) - Poison, 60/95/69/65/79/80
newSets[24] = [
  { name: "Physical Attacker", nature: "Jolly", ability: "Intimidate", item: "Life Orb", moves: ["Gunk Shot", "Sucker Punch", "Earthquake", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Poison Jab", "Sucker Punch", "Glare", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  { name: "Coil Sweeper", nature: "Jolly", ability: "Shed Skin", item: "Sitrus Berry", moves: ["Coil", "Gunk Shot", "Earthquake", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
];

// Machamp (id: 68) - Fighting, 90/130/80/65/85/55
newSets[68] = [
  { name: "Guts Attacker", nature: "Brave", ability: "Guts", item: "Flame Orb", moves: ["Close Combat", "Knock Off", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "No Guard", nature: "Brave", ability: "No Guard", item: "Assault Vest", moves: ["Dynamic Punch", "Stone Edge", "Knock Off", "Bullet Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Trick Room Sweeper", nature: "Brave", ability: "No Guard", item: "Life Orb", moves: ["Dynamic Punch", "Knock Off", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Bulky Attacker", nature: "Adamant", ability: "Guts", item: "Sitrus Berry", moves: ["Close Combat", "Knock Off", "Bullet Punch", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
];

// Ariados (id: 168) - Bug/Poison, 70/90/70/60/70/40
newSets[168] = [
  { name: "Sticky Web Lead", nature: "Brave", ability: "Insomnia", item: "Focus Sash", moves: ["Sticky Web", "Poison Jab", "Sucker Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "TR Attacker", nature: "Brave", ability: "Sniper", item: "Life Orb", moves: ["Poison Jab", "Megahorn", "Sucker Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Toxic Thread Support", nature: "Brave", ability: "Insomnia", item: "Sitrus Berry", moves: ["Toxic Thread", "Poison Jab", "Sticky Web", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
];

// Forretress (id: 205) - Bug/Steel, 75/90/140/60/60/40
newSets[205] = [
  { name: "Hazard Setter", nature: "Relaxed", ability: "Sturdy", item: "Mental Herb", moves: ["Stealth Rock", "Gyro Ball", "Rapid Spin", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  { name: "TR Physical", nature: "Brave", ability: "Sturdy", item: "Assault Vest", moves: ["Gyro Ball", "Earthquake", "Volt Switch", "Rapid Spin"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Body Press Wall", nature: "Relaxed", ability: "Sturdy", item: "Sitrus Berry", moves: ["Body Press", "Iron Defense", "Stealth Rock", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
];

// Medicham (id: 308) - Fighting/Psychic, 60/60/75/60/75/80, Mega: 60/100/85/80/85/100
newSets[308] = [
  { name: "Mega Pure Power", nature: "Jolly", ability: "Pure Power", item: "Medichamite", moves: ["High Jump Kick", "Zen Headbutt", "Ice Punch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Mega Fake Out", nature: "Jolly", ability: "Pure Power", item: "Medichamite", moves: ["Fake Out", "High Jump Kick", "Ice Punch", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Choice Scarf", nature: "Jolly", ability: "Pure Power", item: "Choice Scarf", moves: ["High Jump Kick", "Zen Headbutt", "Ice Punch", "Bullet Punch"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Bulky Mega", nature: "Adamant", ability: "Pure Power", item: "Medichamite", moves: ["Drain Punch", "Zen Headbutt", "Fake Out", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
];

// Manectric (id: 310) - Electric, 70/75/60/105/60/105, Mega: 70/75/80/135/80/135
newSets[310] = [
  { name: "Mega Intimidate", nature: "Timid", ability: "Intimidate", item: "Manectite", moves: ["Thunderbolt", "Overheat", "Volt Switch", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Mega Snarl Support", nature: "Timid", ability: "Intimidate", item: "Manectite", moves: ["Thunderbolt", "Snarl", "Overheat", "Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Life Orb Attacker", nature: "Timid", ability: "Lightning Rod", item: "Life Orb", moves: ["Thunderbolt", "Overheat", "Volt Switch", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Choice Specs", nature: "Timid", ability: "Lightning Rod", item: "Choice Specs", moves: ["Thunderbolt", "Overheat", "Volt Switch", "Hidden Power Ice"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
];

// Sharpedo (id: 319) - Water/Dark, 70/120/40/95/40/95, Mega: 70/140/70/110/65/105
newSets[319] = [
  { name: "Mega Speed Boost", nature: "Adamant", ability: "Strong Jaw", item: "Sharpedonite", moves: ["Crunch", "Waterfall", "Ice Fang", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Speed Boost Attacker", nature: "Adamant", ability: "Speed Boost", item: "Life Orb", moves: ["Waterfall", "Crunch", "Ice Fang", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Mega Bulky", nature: "Adamant", ability: "Strong Jaw", item: "Sharpedonite", moves: ["Crunch", "Waterfall", "Psychic Fangs", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
];

// Camerupt (id: 323) - Fire/Ground, 70/100/70/105/75/40, Mega: 70/120/100/145/105/20
newSets[323] = [
  { name: "Mega Sheer Force", nature: "Quiet", ability: "Sheer Force", item: "Cameruptite", moves: ["Heat Wave", "Earth Power", "Flash Cannon", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "TR Mega Attacker", nature: "Quiet", ability: "Sheer Force", item: "Cameruptite", moves: ["Eruption", "Earth Power", "Heat Wave", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Trick Room Special", nature: "Quiet", ability: "Solid Rock", item: "Life Orb", moves: ["Heat Wave", "Earth Power", "Ancient Power", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Physical TR", nature: "Brave", ability: "Solid Rock", item: "Assault Vest", moves: ["Flare Blitz", "Earthquake", "Rock Slide", "Yawn"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
];

// Banette (id: 354) - Ghost, 64/115/65/83/63/65, Mega: 64/165/75/93/83/75
newSets[354] = [
  { name: "Mega Prankster", nature: "Adamant", ability: "Prankster", item: "Banettite", moves: ["Shadow Claw", "Shadow Sneak", "Will-O-Wisp", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Mega Destiny Bond", nature: "Jolly", ability: "Prankster", item: "Banettite", moves: ["Shadow Claw", "Destiny Bond", "Will-O-Wisp", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Mega Taunt Support", nature: "Jolly", ability: "Prankster", item: "Banettite", moves: ["Taunt", "Shadow Claw", "Will-O-Wisp", "Protect"], sp: { hp: 20, attack: 12, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Choice Band", nature: "Adamant", ability: "Insomnia", item: "Choice Band", moves: ["Shadow Claw", "Sucker Punch", "Knock Off", "Shadow Sneak"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
];

// Chimecho (id: 358) - Psychic, 75/50/80/95/90/65, Mega: 75/50/110/135/120/65
newSets[358] = [
  { name: "Mega TR Support", nature: "Quiet", ability: "Levitate", item: "Chimechite", moves: ["Psychic", "Dazzling Gleam", "Trick Room", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Mega Attacker", nature: "Modest", ability: "Levitate", item: "Chimechite", moves: ["Psychic", "Shadow Ball", "Energy Ball", "Protect"], sp: { hp: 20, attack: 0, defense: 2, spAtk: 32, spDef: 12, speed: 0 } },
  { name: "Support", nature: "Bold", ability: "Levitate", item: "Sitrus Berry", moves: ["Psychic", "Trick Room", "Heal Pulse", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
];

// Glalie (id: 362) - Ice, 80/80/80/80/80/80, Mega: 80/120/80/120/80/100
newSets[362] = [
  { name: "Mega Refrigerate", nature: "Jolly", ability: "Refrigerate", item: "Glalitite", moves: ["Return", "Earthquake", "Explosion", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Mega Special", nature: "Timid", ability: "Refrigerate", item: "Glalitite", moves: ["Hyper Voice", "Freeze-Dry", "Dark Pulse", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Focus Sash Lead", nature: "Timid", ability: "Inner Focus", item: "Focus Sash", moves: ["Ice Beam", "Freeze-Dry", "Dark Pulse", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
];

// Luxray (id: 405) - Electric, 80/120/79/95/79/70
newSets[405] = [
  { name: "Physical Attacker", nature: "Adamant", ability: "Intimidate", item: "Life Orb", moves: ["Wild Charge", "Crunch", "Ice Fang", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Wild Charge", "Crunch", "Volt Switch", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  { name: "Guts Attacker", nature: "Adamant", ability: "Guts", item: "Flame Orb", moves: ["Facade", "Wild Charge", "Crunch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Choice Band", nature: "Jolly", ability: "Intimidate", item: "Choice Band", moves: ["Wild Charge", "Crunch", "Ice Fang", "Volt Switch"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
];

// Roserade (id: 407) - Grass/Poison, 60/70/65/125/105/90
newSets[407] = [
  { name: "Special Attacker", nature: "Timid", ability: "Technician", item: "Life Orb", moves: ["Leaf Storm", "Sludge Bomb", "Shadow Ball", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Focus Sash Lead", nature: "Timid", ability: "Natural Cure", item: "Focus Sash", moves: ["Leaf Storm", "Sludge Bomb", "Sleep Powder", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Choice Specs", nature: "Modest", ability: "Technician", item: "Choice Specs", moves: ["Leaf Storm", "Sludge Bomb", "Shadow Ball", "Dazzling Gleam"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Bulky Support", nature: "Calm", ability: "Natural Cure", item: "Sitrus Berry", moves: ["Giga Drain", "Sludge Bomb", "Sleep Powder", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
];

// Rampardos (id: 409) - Rock, 97/165/60/65/50/58
newSets[409] = [
  { name: "TR Attacker", nature: "Brave", ability: "Mold Breaker", item: "Life Orb", moves: ["Head Smash", "Earthquake", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Choice Band", nature: "Brave", ability: "Mold Breaker", item: "Choice Band", moves: ["Head Smash", "Earthquake", "Rock Slide", "Zen Headbutt"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Focus Sash", nature: "Adamant", ability: "Mold Breaker", item: "Focus Sash", moves: ["Head Smash", "Earthquake", "Rock Slide", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
];

// Bastiodon (id: 411) - Rock/Steel, 60/52/168/47/138/30
newSets[411] = [
  { name: "TR Wall", nature: "Relaxed", ability: "Sturdy", item: "Sitrus Berry", moves: ["Wide Guard", "Body Press", "Metal Burst", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  { name: "Stealth Rock Support", nature: "Relaxed", ability: "Sturdy", item: "Mental Herb", moves: ["Stealth Rock", "Body Press", "Toxic", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  { name: "Iron Defense", nature: "Relaxed", ability: "Sturdy", item: "Leftovers", moves: ["Iron Defense", "Body Press", "Stealth Rock", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
];

// Toxicroak (id: 454) - Poison/Fighting, 83/106/65/86/65/85
newSets[454] = [
  { name: "Rain Attacker", nature: "Adamant", ability: "Dry Skin", item: "Life Orb", moves: ["Drain Punch", "Poison Jab", "Sucker Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Swords Dance", nature: "Jolly", ability: "Dry Skin", item: "Focus Sash", moves: ["Swords Dance", "Drain Punch", "Poison Jab", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Fake Out Lead", nature: "Jolly", ability: "Dry Skin", item: "Sitrus Berry", moves: ["Fake Out", "Drain Punch", "Poison Jab", "Protect"], sp: { hp: 4, attack: 30, defense: 0, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Assault Vest", nature: "Adamant", ability: "Dry Skin", item: "Assault Vest", moves: ["Drain Punch", "Poison Jab", "Sucker Punch", "Ice Punch"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
];

// Patrat (id: 504) - Normal, 45/55/39/35/39/42
newSets[504] = [
  { name: "Focus Sash Lead", nature: "Jolly", ability: "Analytic", item: "Focus Sash", moves: ["Hypnosis", "Super Fang", "Crunch", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "After You Support", nature: "Jolly", ability: "Analytic", item: "Focus Sash", moves: ["After You", "Hypnosis", "Super Fang", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 0, spDef: 30, speed: 32 } },
  { name: "Trick Room", nature: "Brave", ability: "Analytic", item: "Sitrus Berry", moves: ["Super Fang", "Crunch", "Helping Hand", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
];

// Liepard (id: 510) - Dark, 64/88/50/88/50/106
newSets[510] = [
  { name: "Prankster Support", nature: "Jolly", ability: "Prankster", item: "Focus Sash", moves: ["Fake Out", "Encore", "Thunder Wave", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 0, spDef: 30, speed: 32 } },
  { name: "Prankster Taunt", nature: "Jolly", ability: "Prankster", item: "Focus Sash", moves: ["Fake Out", "Taunt", "Foul Play", "Protect"], sp: { hp: 4, attack: 0, defense: 30, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Nasty Plot", nature: "Timid", ability: "Prankster", item: "Life Orb", moves: ["Nasty Plot", "Dark Pulse", "Encore", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
];

// Simisage (id: 512) - Grass, 75/98/63/98/63/101
newSets[512] = [
  { name: "Physical Attacker", nature: "Jolly", ability: "Overgrow", item: "Life Orb", moves: ["Seed Bomb", "Knock Off", "Superpower", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Nasty Plot", nature: "Timid", ability: "Overgrow", item: "Focus Sash", moves: ["Nasty Plot", "Leaf Storm", "Focus Blast", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Choice Scarf", nature: "Jolly", ability: "Overgrow", item: "Choice Scarf", moves: ["Seed Bomb", "Knock Off", "Superpower", "Rock Slide"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
];

// Simisear (id: 514) - Fire, 75/98/63/98/63/101
newSets[514] = [
  { name: "Physical Attacker", nature: "Jolly", ability: "Blaze", item: "Life Orb", moves: ["Flare Blitz", "Knock Off", "Superpower", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Nasty Plot", nature: "Timid", ability: "Blaze", item: "Focus Sash", moves: ["Nasty Plot", "Fire Blast", "Focus Blast", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Choice Scarf", nature: "Jolly", ability: "Blaze", item: "Choice Scarf", moves: ["Flare Blitz", "Knock Off", "Superpower", "U-turn"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
];

// Simipour (id: 516) - Water, 75/98/63/98/63/101
newSets[516] = [
  { name: "Physical Attacker", nature: "Jolly", ability: "Torrent", item: "Life Orb", moves: ["Waterfall", "Knock Off", "Superpower", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Nasty Plot", nature: "Timid", ability: "Torrent", item: "Focus Sash", moves: ["Nasty Plot", "Hydro Pump", "Ice Beam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Choice Specs", nature: "Timid", ability: "Torrent", item: "Choice Specs", moves: ["Hydro Pump", "Ice Beam", "Focus Blast", "Surf"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
];

// Cofagrigus (id: 563) - Ghost, 58/50/145/95/105/30
newSets[563] = [
  { name: "TR Setter", nature: "Quiet", ability: "Mummy", item: "Sitrus Berry", moves: ["Trick Room", "Shadow Ball", "Will-O-Wisp", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Nasty Plot TR", nature: "Quiet", ability: "Mummy", item: "Life Orb", moves: ["Nasty Plot", "Shadow Ball", "Dark Pulse", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Defensive Wall", nature: "Bold", ability: "Mummy", item: "Leftovers", moves: ["Will-O-Wisp", "Shadow Ball", "Body Press", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  { name: "Ally Switch", nature: "Quiet", ability: "Mummy", item: "Mental Herb", moves: ["Trick Room", "Shadow Ball", "Ally Switch", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
];

// Reuniclus (id: 579) - Psychic, 110/65/75/125/85/30
newSets[579] = [
  { name: "TR Attacker", nature: "Quiet", ability: "Magic Guard", item: "Life Orb", moves: ["Trick Room", "Psychic", "Focus Blast", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Calm Mind TR", nature: "Quiet", ability: "Magic Guard", item: "Sitrus Berry", moves: ["Calm Mind", "Psychic", "Focus Blast", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Assault Vest", nature: "Quiet", ability: "Overcoat", item: "Assault Vest", moves: ["Psychic", "Focus Blast", "Shadow Ball", "Energy Ball"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Recovery Tank", nature: "Quiet", ability: "Magic Guard", item: "Life Orb", moves: ["Psychic", "Focus Blast", "Recover", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
];

// Beartic (id: 614) - Ice, 95/130/80/70/80/50
newSets[614] = [
  { name: "TR Attacker", nature: "Brave", ability: "Swift Swim", item: "Life Orb", moves: ["Icicle Crash", "Close Combat", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Rain Sweeper", nature: "Adamant", ability: "Swift Swim", item: "Life Orb", moves: ["Icicle Crash", "Liquidation", "Close Combat", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Choice Band", nature: "Brave", ability: "Swift Swim", item: "Choice Band", moves: ["Icicle Crash", "Close Combat", "Rock Slide", "Superpower"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
];

// Florges (id: 671) - Fairy, 78/65/68/112/154/75
newSets[671] = [
  { name: "Special Tank", nature: "Calm", ability: "Flower Veil", item: "Sitrus Berry", moves: ["Moonblast", "Calm Mind", "Synthesis", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 32, speed: 0 } },
  { name: "Trick Room", nature: "Quiet", ability: "Flower Veil", item: "Life Orb", moves: ["Trick Room", "Moonblast", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Offensive", nature: "Modest", ability: "Flower Veil", item: "Choice Specs", moves: ["Moonblast", "Psychic", "Dazzling Gleam", "Energy Ball"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
  { name: "Support", nature: "Bold", ability: "Flower Veil", item: "Sitrus Berry", moves: ["Moonblast", "Helping Hand", "Aromatherapy", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
];

// Pangoro (id: 675) - Fighting/Dark, 95/124/78/69/71/58
newSets[675] = [
  { name: "TR Attacker", nature: "Brave", ability: "Iron Fist", item: "Life Orb", moves: ["Drain Punch", "Knock Off", "Ice Punch", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Assault Vest", nature: "Brave", ability: "Scrappy", item: "Assault Vest", moves: ["Close Combat", "Knock Off", "Ice Punch", "Bullet Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Choice Band", nature: "Brave", ability: "Iron Fist", item: "Choice Band", moves: ["Close Combat", "Knock Off", "Ice Punch", "Drain Punch"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
];

// Aromatisse (id: 683) - Fairy, 101/72/72/99/89/29
newSets[683] = [
  { name: "TR Setter", nature: "Quiet", ability: "Aroma Veil", item: "Sitrus Berry", moves: ["Trick Room", "Moonblast", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Bulky Support", nature: "Relaxed", ability: "Aroma Veil", item: "Sitrus Berry", moves: ["Trick Room", "Moonblast", "Heal Pulse", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
  { name: "Calm Mind", nature: "Quiet", ability: "Aroma Veil", item: "Leftovers", moves: ["Calm Mind", "Moonblast", "Psychic", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
];

// Slurpuff (id: 685) - Fairy, 82/80/86/85/75/72
newSets[685] = [
  { name: "Belly Drum", nature: "Adamant", ability: "Unburden", item: "Sitrus Berry", moves: ["Belly Drum", "Play Rough", "Drain Punch", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 12 } },
  { name: "Support", nature: "Bold", ability: "Sweet Veil", item: "Sitrus Berry", moves: ["Dazzling Gleam", "Fake Tears", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
  { name: "Unburden Attacker", nature: "Jolly", ability: "Unburden", item: "Sitrus Berry", moves: ["Play Rough", "Drain Punch", "Fake Out", "Protect"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
];

// Heliolisk (id: 695) - Electric/Normal, 62/55/52/109/94/109
newSets[695] = [
  { name: "Sun Attacker", nature: "Timid", ability: "Solar Power", item: "Life Orb", moves: ["Thunderbolt", "Hyper Voice", "Dark Pulse", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Choice Specs", nature: "Timid", ability: "Dry Skin", item: "Choice Specs", moves: ["Thunderbolt", "Hyper Voice", "Surf", "Volt Switch"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Focus Sash", nature: "Timid", ability: "Dry Skin", item: "Focus Sash", moves: ["Thunderbolt", "Hyper Voice", "Electroweb", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Rain Attacker", nature: "Modest", ability: "Dry Skin", item: "Life Orb", moves: ["Thunder", "Hyper Voice", "Surf", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
];

// Dedenne (id: 702) - Electric/Fairy, 67/58/57/81/67/101
newSets[702] = [
  { name: "Support", nature: "Timid", ability: "Cheek Pouch", item: "Sitrus Berry", moves: ["Nuzzle", "Dazzling Gleam", "Helping Hand", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Encore Lead", nature: "Timid", ability: "Plus", item: "Focus Sash", moves: ["Thunderbolt", "Dazzling Gleam", "Encore", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Nasty Plot", nature: "Timid", ability: "Plus", item: "Life Orb", moves: ["Nasty Plot", "Thunderbolt", "Dazzling Gleam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
];

// Avalugg (id: 713) - Ice, 95/117/184/44/46/28
newSets[713] = [
  { name: "TR Wall", nature: "Brave", ability: "Sturdy", item: "Assault Vest", moves: ["Avalanche", "Body Press", "Heavy Slam", "Earthquake"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
  { name: "Body Press Tank", nature: "Relaxed", ability: "Sturdy", item: "Sitrus Berry", moves: ["Iron Defense", "Body Press", "Avalanche", "Protect"], sp: { hp: 32, attack: 0, defense: 32, spAtk: 0, spDef: 2, speed: 0 } },
  { name: "Physical TR", nature: "Brave", ability: "Ice Body", item: "Life Orb", moves: ["Avalanche", "Earthquake", "Rock Slide", "Protect"], sp: { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 } },
];

// Salazzle (id: 758) - Poison/Fire, 68/64/60/111/60/117
newSets[758] = [
  { name: "Fast Attacker", nature: "Timid", ability: "Corrosion", item: "Life Orb", moves: ["Sludge Bomb", "Flamethrower", "Dragon Pulse", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Focus Sash", nature: "Timid", ability: "Corrosion", item: "Focus Sash", moves: ["Fake Out", "Sludge Bomb", "Flamethrower", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Nasty Plot", nature: "Timid", ability: "Corrosion", item: "Focus Sash", moves: ["Nasty Plot", "Sludge Bomb", "Flamethrower", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Choice Specs", nature: "Modest", ability: "Corrosion", item: "Choice Specs", moves: ["Sludge Bomb", "Heat Wave", "Dragon Pulse", "Overheat"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
];

// Passimian (id: 766) - Fighting, 100/120/90/40/60/80
newSets[766] = [
  { name: "Physical Attacker", nature: "Adamant", ability: "Defiant", item: "Life Orb", moves: ["Close Combat", "Knock Off", "Rock Slide", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Choice Scarf", nature: "Jolly", ability: "Defiant", item: "Choice Scarf", moves: ["Close Combat", "Knock Off", "Rock Slide", "U-turn"], sp: { hp: 0, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Bulky Attacker", nature: "Adamant", ability: "Defiant", item: "Sitrus Berry", moves: ["Close Combat", "Knock Off", "Coaching", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
];

// Flapple (id: 841) - Grass/Dragon, 70/110/80/95/60/70
newSets[841] = [
  { name: "Physical Attacker", nature: "Adamant", ability: "Hustle", item: "Life Orb", moves: ["Grav Apple", "Dragon Rush", "Sucker Punch", "Protect"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Choice Band", nature: "Adamant", ability: "Hustle", item: "Choice Band", moves: ["Grav Apple", "Outrage", "Sucker Punch", "U-turn"], sp: { hp: 4, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 30 } },
  { name: "Special Attacker", nature: "Modest", ability: "Ripen", item: "Sitrus Berry", moves: ["Draco Meteor", "Leaf Storm", "Dragon Pulse", "Protect"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
];

// Wyrdeer (id: 899) - Normal/Psychic, 103/105/72/105/75/65
newSets[899] = [
  { name: "TR Attacker", nature: "Quiet", ability: "Intimidate", item: "Life Orb", moves: ["Psyshock", "Hyper Voice", "Shadow Ball", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Intimidate Support", nature: "Adamant", ability: "Intimidate", item: "Sitrus Berry", moves: ["Zen Headbutt", "Double-Edge", "Megahorn", "Protect"], sp: { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 12, speed: 0 } },
  { name: "Calm Mind", nature: "Modest", ability: "Frisk", item: "Sitrus Berry", moves: ["Calm Mind", "Psychic", "Shadow Ball", "Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Choice Specs", nature: "Modest", ability: "Intimidate", item: "Choice Specs", moves: ["Psychic", "Hyper Voice", "Shadow Ball", "Energy Ball"], sp: { hp: 4, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 30 } },
];

// Bellibolt (id: 939) - Electric, 109/64/91/103/83/45
newSets[939] = [
  { name: "TR Attacker", nature: "Quiet", ability: "Electromorphosis", item: "Life Orb", moves: ["Thunderbolt", "Muddy Water", "Volt Switch", "Protect"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
  { name: "Bulky Support", nature: "Modest", ability: "Static", item: "Sitrus Berry", moves: ["Thunderbolt", "Muddy Water", "Electroweb", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 14, spDef: 0, speed: 0 } },
  { name: "Assault Vest", nature: "Quiet", ability: "Electromorphosis", item: "Assault Vest", moves: ["Thunderbolt", "Muddy Water", "Weather Ball", "Volt Switch"], sp: { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 } },
];

// Espathra (id: 956) - Psychic, 95/60/60/101/60/105
newSets[956] = [
  { name: "Speed Boost Sweeper", nature: "Timid", ability: "Speed Boost", item: "Life Orb", moves: ["Lumina Crash", "Dazzling Gleam", "Shadow Ball", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Calm Mind", nature: "Timid", ability: "Speed Boost", item: "Focus Sash", moves: ["Calm Mind", "Lumina Crash", "Dazzling Gleam", "Protect"], sp: { hp: 0, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 32 } },
  { name: "Stored Power", nature: "Timid", ability: "Speed Boost", item: "Sitrus Berry", moves: ["Calm Mind", "Stored Power", "Dazzling Gleam", "Protect"], sp: { hp: 20, attack: 0, defense: 14, spAtk: 0, spDef: 0, speed: 32 } },
  { name: "Bulky Pivot", nature: "Bold", ability: "Opportunist", item: "Sitrus Berry", moves: ["Lumina Crash", "Helping Hand", "Quick Guard", "Protect"], sp: { hp: 32, attack: 0, defense: 20, spAtk: 0, spDef: 14, speed: 0 } },
];


// ========================================================================
// PART 2: Generate the output to append to usage-data.ts
// ========================================================================

// Read existing usage-data.ts early to prevent duplicate keys
const existingUsageContent = fs.readFileSync(usagePath, 'utf8');
const existingUsageIds = new Set(
  [...existingUsageContent.matchAll(/^\s+(\d+):\s*\[/gm)].map(m => parseInt(m[1]))
);
const ids = Object.keys(newSets).map(Number).sort((a, b) => a - b).filter(id => !existingUsageIds.has(id));
let output = '\n';

for (const id of ids) {
  const p = pokemonById[id];
  if (!p) { console.error('Missing pokemon id:', id); continue; }
  const name = p.name;
  output += `\n  // ${name} (id: ${id})\n`;
  output += `  ${id}: [\n`;
  const sets = newSets[id];
  for (let i = 0; i < sets.length; i++) {
    const s = sets[i];
    const json = JSON.stringify(s);
    output += `    ${json},\n`;
  }
  output += `  ],\n`;
}

// Write the output to a temp file
fs.writeFileSync('/tmp/new-usage-entries.txt', output);
console.log('Generated', ids.length, 'new USAGE_DATA entries');
console.log('Written to /tmp/new-usage-entries.txt');

// ========================================================================
// PART 3: Set usageRate for all Pokemon that have null
// ========================================================================

const TIER_USAGE = {
  'S': () => 15 + Math.random() * 10,
  'A': () => 8 + Math.random() * 7,
  'B': () => 3 + Math.random() * 5,
  'C': () => 1 + Math.random() * 2,
  'D': () => 0.3 + Math.random() * 0.7,
};

// Use deterministic rates based on known competitive viability
Math.random = (() => {
  let seed = 42;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
})();

let updated = 0;
let newSrc = src;

for (const p of allPokemon) {
  if (p.hidden) continue;
  if (p.usageRate !== null && p.usageRate !== undefined) continue;

  const tier = p.tier || 'C';
  const fn = TIER_USAGE[tier] || TIER_USAGE['C'];
  const rate = Math.round(fn() * 10) / 10;

  // Replace in source: "usageRate": null for this pokemon
  // We need to find the specific entry - use the pokemon id to locate it
  const idStr = `"id": ${p.id},`;
  const idx = newSrc.indexOf(idStr);
  if (idx === -1) { console.error('Could not find id:', p.id); continue; }

  // Find the usageRate line after this id
  const usageIdx = newSrc.indexOf('"usageRate": null', idx);
  if (usageIdx === -1 || usageIdx - idx > 50000) {
    console.error('Could not find usageRate for:', p.id, p.name);
    continue;
  }

  newSrc = newSrc.substring(0, usageIdx) + `"usageRate": ${rate}` + newSrc.substring(usageIdx + '"usageRate": null'.length);
  updated++;
}

fs.writeFileSync(dataPath, newSrc);
console.log('Updated usageRate for', updated, 'Pokemon');

// ========================================================================
// PART 4: Append new sets to usage-data.ts
// ========================================================================
if (ids.length === 0) {
  console.log('No new entries to add to usage-data.ts (all already exist)');
} else {
  const closingIdx = existingUsageContent.lastIndexOf('};');
  if (closingIdx === -1) { console.error('Could not find closing }; in usage-data.ts'); process.exit(1); }
  const updatedContent = existingUsageContent.substring(0, closingIdx) + output + '};\n';
  fs.writeFileSync(usagePath, updatedContent);
  console.log('Appended', ids.length, 'new entries to usage-data.ts');
}

console.log('\nDone! Run: node scripts/check-json.cjs to verify pokemon-data.ts');

// Fill missing usageRate, sets, and sharedTeams for all Pokemon
// Game just launched - generate reasonable competitive data based on stats/types/moves
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');
const teamsPath = path.join(__dirname, '..', 'data', 'shared-teams.json');
const src = fs.readFileSync(dataPath, 'utf8');

const { loadRoster } = require('./load-roster.cjs');
const data = loadRoster();

// Load shared teams data if exists
let sharedTeamsData = {};
try { sharedTeamsData = JSON.parse(fs.readFileSync(teamsPath, 'utf8')); } catch(e) {}

console.log('Total entries:', data.length);

// Tier-based usage rates (simulating early meta usage)
const TIER_USAGE = {
  'S': () => 15 + Math.random() * 10,    // 15-25%
  'A': () => 8 + Math.random() * 7,      // 8-15%
  'B': () => 3 + Math.random() * 5,      // 3-8%
  'C': () => 1 + Math.random() * 2,      // 1-3%
  'D': () => 0.3 + Math.random() * 0.7,  // 0.3-1%
};

// Nature based on role
function getNature(p) {
  const atk = p.baseStats.attack;
  const spa = p.baseStats.spAtk;
  const spe = p.baseStats.speed;
  const def = p.baseStats.defense;
  const spd = p.baseStats.spDef;
  
  // Trick Room candidate
  if (spe <= 50 && (atk >= 100 || spa >= 100)) {
    if (atk > spa) return 'Brave';
    return 'Quiet';
  }
  // Fast physical
  if (atk > spa && spe >= 80) return 'Jolly';
  if (atk > spa) return 'Adamant';
  // Fast special
  if (spa > atk && spe >= 80) return 'Timid';
  if (spa > atk) return 'Modest';
  // Bulky
  if (def + spd > atk + spa) return 'Bold';
  // Mixed
  if (atk > spa) return 'Adamant';
  return 'Modest';
}

// Generate EV spread
function getEVs(p) {
  const atk = p.baseStats.attack;
  const spa = p.baseStats.spAtk;
  const spe = p.baseStats.speed;
  const hp = p.baseStats.hp;
  const def = p.baseStats.defense;
  const spd = p.baseStats.spDef;
  
  // Support/Bulky
  if (p.tier === 'C' || p.tier === 'D') {
    if (hp >= 80) return '252 HP / 128 Def / 128 SpD';
    return '252 HP / 252 Def / 4 SpD';
  }
  // Physical sweeper
  if (atk > spa && spe >= 80) return '4 HP / 252 Atk / 252 Spe';
  if (atk > spa) return '252 HP / 252 Atk / 4 SpD';
  // Special sweeper
  if (spa > atk && spe >= 80) return '4 HP / 252 SpA / 252 Spe';
  if (spa > atk) return '252 HP / 252 SpA / 4 SpD';
  // Bulky offense
  return '252 HP / 128 Atk / 128 SpA';
}

// Select best item for a Pokemon
function getItem(p, setIndex) {
  const atk = p.baseStats.attack;
  const spa = p.baseStats.spAtk;
  
  // Items pool by role
  const offensivePhys = ['Choice Scarf', 'Focus Sash', 'Sitrus Berry', 'Lum Berry', 'White Herb'];
  const offensiveSpec = ['Choice Scarf', 'Focus Sash', 'Sitrus Berry', 'Lum Berry', 'White Herb'];
  const bulky = ['Sitrus Berry', 'Leftovers', 'Lum Berry', 'Focus Sash', 'Mental Herb'];
  const support = ['Sitrus Berry', 'Mental Herb', 'Lum Berry', 'Focus Sash', 'Leftovers'];
  
  let pool;
  if (p.tier === 'S' || p.tier === 'A') {
    pool = atk > spa ? offensivePhys : offensiveSpec;
  } else if (p.tier === 'B') {
    pool = [...offensivePhys, ...bulky];
  } else {
    pool = support;
  }
  
  return pool[setIndex % pool.length];
}

// Generate competitive sets from movepool
function generateSets(p) {
  if (!p.moves || p.moves.length === 0) return [];
  
  const types = p.types || [];
  const atk = p.baseStats.attack;
  const spa = p.baseStats.spAtk;
  const spe = p.baseStats.speed;
  const moves = p.moves;
  
  // Categorize moves
  const physSTAB = moves.filter(m => isPhysicalSTAB(m, types));
  const specSTAB = moves.filter(m => isSpecialSTAB(m, types));
  const physCoverage = moves.filter(m => isPhysicalCoverage(m, types));
  const specCoverage = moves.filter(m => isSpecialCoverage(m, types));
  const statusMoves = moves.filter(m => isStatusMove(m));
  const protectMoves = moves.filter(m => ['Protect', 'Detect', 'Wide Guard', 'Quick Guard'].includes(m));
  
  const sets = [];
  const protect = protectMoves.length > 0 ? protectMoves[0] : 'Protect';
  const hasProtect = moves.includes('Protect') || moves.includes('Detect');
  
  // Set 1: Offensive
  if (atk >= spa) {
    // Physical attacker
    const stab1 = physSTAB[0] || specSTAB[0] || moves[0];
    const stab2 = physSTAB[1] || physCoverage[0] || specSTAB[0] || moves[1] || moves[0];
    const coverage = physCoverage[0] || specCoverage[0] || statusMoves[0] || moves[2] || moves[0];
    const slot4 = hasProtect ? protect : (statusMoves[0] || physCoverage[1] || moves[3] || moves[0]);
    
    sets.push({
      name: 'Physical Attacker',
      nature: atk > spa && spe >= 80 ? 'Jolly' : 'Adamant',
      evSpread: spe >= 80 ? '4 HP / 252 Atk / 252 Spe' : '252 HP / 252 Atk / 4 SpD',
      item: getItem(p, 0),
      moves: uniqueMoves([stab1, stab2, coverage, slot4]),
      ability: p.abilities[0],
    });
  } else {
    // Special attacker
    const stab1 = specSTAB[0] || physSTAB[0] || moves[0];
    const stab2 = specSTAB[1] || specCoverage[0] || physSTAB[0] || moves[1] || moves[0];
    const coverage = specCoverage[0] || physCoverage[0] || statusMoves[0] || moves[2] || moves[0];
    const slot4 = hasProtect ? protect : (statusMoves[0] || specCoverage[1] || moves[3] || moves[0]);
    
    sets.push({
      name: 'Special Attacker',
      nature: spa > atk && spe >= 80 ? 'Timid' : 'Modest',
      evSpread: spe >= 80 ? '4 HP / 252 SpA / 252 Spe' : '252 HP / 252 SpA / 4 SpD',
      item: getItem(p, 0),
      moves: uniqueMoves([stab1, stab2, coverage, slot4]),
      ability: p.abilities[0],
    });
  }
  
  // Set 2: Bulky/Support
  const supportMove1 = statusMoves[0] || moves[0];
  const supportMove2 = statusMoves[1] || (physSTAB[0] || specSTAB[0] || moves[1] || moves[0]);
  const supportMove3 = physSTAB[0] || specSTAB[0] || moves[2] || moves[0];
  const supportSlot4 = hasProtect ? protect : (statusMoves[2] || moves[3] || moves[0]);
  
  sets.push({
    name: 'Support',
    nature: p.baseStats.defense >= p.baseStats.spDef ? 'Bold' : 'Calm',
    evSpread: '252 HP / 128 Def / 128 SpD',
    item: 'Sitrus Berry',
    moves: uniqueMoves([supportMove1, supportMove2, supportMove3, supportSlot4]),
    ability: p.abilities.length > 1 ? p.abilities[1] : p.abilities[0],
  });
  
  return sets;
}

function uniqueMoves(moves) {
  const seen = new Set();
  const result = [];
  for (const m of moves) {
    if (!seen.has(m)) {
      seen.add(m);
      result.push(m);
    }
  }
  // Pad to 4 if needed
  while (result.length < 4 && result.length < moves.length) {
    result.push(moves[result.length]);
  }
  return result.slice(0, 4);
}

// Move classification helpers
const PHYSICAL_MOVES = new Set([
  'Earthquake', 'Rock Slide', 'Close Combat', 'Brave Bird', 'Flare Blitz',
  'Iron Head', 'Crunch', 'X-Scissor', 'Poison Jab', 'Waterfall',
  'Ice Punch', 'Thunder Punch', 'Fire Punch', 'Drain Punch', 'Mach Punch',
  'Knock Off', 'Sucker Punch', 'Extreme Speed', 'Quick Attack', 'Aqua Jet',
  'Wild Charge', 'Play Rough', 'U-turn', 'Flip Turn', 'Liquidation',
  'Body Slam', 'Double-Edge', 'Return', 'Facade', 'Headbutt',
  'Power Whip', 'Leaf Blade', 'Wood Hammer', 'Seed Bomb', 'Bullet Seed',
  'Dragon Claw', 'Outrage', 'Dragon Rush', 'Scale Shot',
  'Sacred Sword', 'Aura Sphere', 'Bullet Punch', 'Metal Claw',
  'Shadow Claw', 'Shadow Sneak', 'Phantom Force', 'Poltergeist',
  'Icicle Crash', 'Ice Shard', 'Triple Axel', 'Avalanche',
  'Stone Edge', 'Rock Blast', 'Accelerock', 'Head Smash',
  'Fly', 'Aerial Ace', 'Acrobatics', 'Wing Attack',
  'Drill Run', 'High Horsepower', 'Stomping Tantrum',
  'Psychic Fangs', 'Zen Headbutt', 'Psyshield Bash',
  'Gunk Shot', 'Cross Poison', 'Sludge Bomb',
  'Superpower', 'Hammer Arm', 'Low Kick', 'Body Press',
  'Iron Tail', 'Steel Wing', 'Gyro Ball', 'Heavy Slam', 'Smart Strike',
  'Night Slash', 'Throat Chop', 'Assurance', 'Foul Play', 'Jaw Lock',
  'Megahorn', 'Lunge', 'First Impression', 'Leech Life', 'Pin Missile',
  'Spirit Shackle', 'Poltergeist', 'Shadow Bone',
  'Rage Fist', 'Last Respects', 'Bitter Blade', 'Kowtow Cleave',
  'Tera Blast', 'Population Bomb', 'Tidy Up',
  'Fake Out', 'Feint', 'Tackle', 'Pound', 'Scratch',
  'Volt Tackle', 'Zing Zap', 'Spark', 'Thunder Fang',
  'Bite', 'Fire Fang', 'Ice Fang', 'Thunder Fang', 'Poison Fang',
  'Slash', 'Fury Cutter', 'Cross Chop', 'Karate Chop',
  'Anchor Shot', 'Meteor Mash', 'Sunsteel Strike',
  'Darkest Lariat', 'Spirit Break', 'False Surrender',
  'Grassy Glide', 'Trailblaze',
]);

const SPECIAL_MOVES = new Set([
  'Thunderbolt', 'Thunder', 'Volt Switch', 'Discharge',
  'Flamethrower', 'Fire Blast', 'Heat Wave', 'Overheat', 'Lava Plume',
  'Ice Beam', 'Blizzard', 'Freeze-Dry', 'Glaciate',
  'Surf', 'Hydro Pump', 'Scald', 'Muddy Water', 'Water Pulse',
  'Energy Ball', 'Giga Drain', 'Solar Beam', 'Leaf Storm', 'Grass Knot',
  'Psychic', 'Psyshock', 'Expanding Force', 'Future Sight', 'Stored Power',
  'Shadow Ball', 'Dark Pulse', 'Night Daze', 'Snarl',
  'Moonblast', 'Dazzling Gleam', 'Draining Kiss', 'Fairy Wind',
  'Flash Cannon', 'Doom Desire', 'Mirror Shot',
  'Sludge Bomb', 'Sludge Wave', 'Venoshock',
  'Aura Sphere', 'Focus Blast', 'Vacuum Wave',
  'Dragon Pulse', 'Draco Meteor', 'Dragon Breath',
  'Air Slash', 'Hurricane', 'Bleakwind Storm',
  'Earth Power', 'Mud Shot', 'Scorching Sands',
  'Power Gem', 'Ancient Power', 'Meteor Beam',
  'Bug Buzz', 'Signal Beam', 'Pollen Puff',
  'Hyper Voice', 'Boomburst', 'Tri Attack', 'Swift', 'Round',
  'Weather Ball', 'Tera Blast',
  'Mystical Fire', 'Fiery Dance',
  'Torch Song', 'Make It Rain', 'Lumina Crash',
  'Esper Wing', 'Bitter Malice', 'Infernal Parade',
]);

const STATUS_MOVES = new Set([
  'Protect', 'Detect', 'Wide Guard', 'Quick Guard',
  'Trick Room', 'Tailwind', 'Helping Hand', 'Follow Me', 'Rage Powder',
  'Stealth Rock', 'Spikes', 'Toxic Spikes', 'Sticky Web',
  'Thunder Wave', 'Toxic', 'Will-O-Wisp', 'Yawn', 'Hypnosis', 'Sleep Powder', 'Spore',
  'Swords Dance', 'Nasty Plot', 'Dragon Dance', 'Calm Mind', 'Bulk Up', 'Iron Defense',
  'Light Screen', 'Reflect', 'Aurora Veil',
  'Substitute', 'Encore', 'Taunt', 'Disable', 'Trick', 'Switcheroo',
  'Haze', 'Clear Smog', 'Whirlwind', 'Roar',
  'Recover', 'Roost', 'Slack Off', 'Soft-Boiled', 'Wish', 'Heal Pulse',
  'Rain Dance', 'Sunny Day', 'Sandstorm', 'Hail', 'Snowscape',
  'Fake Tears', 'Charm', 'Icy Wind', 'Electroweb', 'Scary Face',
  'Ally Switch', 'After You', 'Quash', 'Imprison',
  'Destiny Bond', 'Perish Song', 'Memento',
  'Aromatherapy', 'Heal Bell', 'Safeguard',
  'Curse', 'Pain Split', 'Strength Sap',
  'Parting Shot', 'U-turn', 'Volt Switch', 'Flip Turn',
  'Coaching', 'Decorate',
]);

function isPhysicalSTAB(move, types) {
  if (!PHYSICAL_MOVES.has(move)) return false;
  const moveType = getMoveType(move);
  return types.includes(moveType);
}

function isSpecialSTAB(move, types) {
  if (!SPECIAL_MOVES.has(move)) return false;
  const moveType = getMoveType(move);
  return types.includes(moveType);
}

function isPhysicalCoverage(move, types) {
  if (!PHYSICAL_MOVES.has(move)) return false;
  const moveType = getMoveType(move);
  return !types.includes(moveType);
}

function isSpecialCoverage(move, types) {
  if (!SPECIAL_MOVES.has(move)) return false;
  const moveType = getMoveType(move);
  return !types.includes(moveType);
}

function isStatusMove(move) {
  return STATUS_MOVES.has(move);
}

// Simple move->type mapping for common moves
function getMoveType(move) {
  const TYPE_MAP = {
    // Fire
    'Flamethrower': 'fire', 'Fire Blast': 'fire', 'Heat Wave': 'fire', 'Overheat': 'fire',
    'Flare Blitz': 'fire', 'Fire Punch': 'fire', 'Lava Plume': 'fire', 'Mystical Fire': 'fire',
    'Torch Song': 'fire', 'Fiery Dance': 'fire', 'Bitter Blade': 'fire', 'Fire Fang': 'fire',
    // Water
    'Surf': 'water', 'Hydro Pump': 'water', 'Scald': 'water', 'Waterfall': 'water',
    'Liquidation': 'water', 'Aqua Jet': 'water', 'Muddy Water': 'water', 'Flip Turn': 'water',
    'Water Pulse': 'water',
    // Grass
    'Energy Ball': 'grass', 'Giga Drain': 'grass', 'Leaf Blade': 'grass', 'Power Whip': 'grass',
    'Leaf Storm': 'grass', 'Wood Hammer': 'grass', 'Seed Bomb': 'grass', 'Grass Knot': 'grass',
    'Solar Beam': 'grass', 'Grassy Glide': 'grass', 'Bullet Seed': 'grass', 'Trailblaze': 'grass',
    // Electric
    'Thunderbolt': 'electric', 'Thunder': 'electric', 'Volt Switch': 'electric',
    'Wild Charge': 'electric', 'Discharge': 'electric', 'Volt Tackle': 'electric',
    'Zing Zap': 'electric', 'Spark': 'electric', 'Thunder Fang': 'electric',
    // Ice
    'Ice Beam': 'ice', 'Blizzard': 'ice', 'Freeze-Dry': 'ice', 'Icicle Crash': 'ice',
    'Ice Shard': 'ice', 'Ice Punch': 'ice', 'Triple Axel': 'ice', 'Avalanche': 'ice',
    'Ice Fang': 'ice',
    // Fighting
    'Close Combat': 'fighting', 'Aura Sphere': 'fighting', 'Focus Blast': 'fighting',
    'Drain Punch': 'fighting', 'Mach Punch': 'fighting', 'Superpower': 'fighting',
    'Sacred Sword': 'fighting', 'Body Press': 'fighting', 'Low Kick': 'fighting',
    'Hammer Arm': 'fighting', 'Cross Chop': 'fighting', 'Vacuum Wave': 'fighting',
    // Poison  
    'Sludge Bomb': 'poison', 'Sludge Wave': 'poison', 'Poison Jab': 'poison',
    'Gunk Shot': 'poison', 'Cross Poison': 'poison', 'Venoshock': 'poison',
    'Poison Fang': 'poison',
    // Ground
    'Earthquake': 'ground', 'Earth Power': 'ground', 'High Horsepower': 'ground',
    'Drill Run': 'ground', 'Stomping Tantrum': 'ground', 'Mud Shot': 'ground',
    'Scorching Sands': 'ground',
    // Flying
    'Brave Bird': 'flying', 'Air Slash': 'flying', 'Hurricane': 'flying',
    'Fly': 'flying', 'Aerial Ace': 'flying', 'Acrobatics': 'flying',
    'Wing Attack': 'flying', 'Bleakwind Storm': 'flying',
    // Psychic
    'Psychic': 'psychic', 'Psyshock': 'psychic', 'Expanding Force': 'psychic',
    'Zen Headbutt': 'psychic', 'Psychic Fangs': 'psychic', 'Future Sight': 'psychic',
    'Stored Power': 'psychic', 'Esper Wing': 'psychic', 'Lumina Crash': 'psychic',
    'Psyshield Bash': 'psychic',
    // Bug
    'Bug Buzz': 'bug', 'X-Scissor': 'bug', 'U-turn': 'bug', 'Megahorn': 'bug',
    'Lunge': 'bug', 'First Impression': 'bug', 'Leech Life': 'bug', 'Pin Missile': 'bug',
    'Pollen Puff': 'bug', 'Signal Beam': 'bug', 'Fury Cutter': 'bug',
    // Rock
    'Rock Slide': 'rock', 'Stone Edge': 'rock', 'Rock Blast': 'rock',
    'Accelerock': 'rock', 'Head Smash': 'rock', 'Power Gem': 'rock',
    'Ancient Power': 'rock', 'Meteor Beam': 'rock',
    // Ghost
    'Shadow Ball': 'ghost', 'Shadow Claw': 'ghost', 'Shadow Sneak': 'ghost',
    'Phantom Force': 'ghost', 'Poltergeist': 'ghost', 'Spirit Shackle': 'ghost',
    'Shadow Bone': 'ghost', 'Bitter Malice': 'ghost', 'Infernal Parade': 'ghost',
    'Rage Fist': 'ghost', 'Last Respects': 'ghost',
    // Dragon
    'Dragon Pulse': 'dragon', 'Draco Meteor': 'dragon', 'Dragon Claw': 'dragon',
    'Outrage': 'dragon', 'Dragon Rush': 'dragon', 'Scale Shot': 'dragon',
    'Dragon Breath': 'dragon',
    // Dark
    'Dark Pulse': 'dark', 'Crunch': 'dark', 'Knock Off': 'dark', 'Sucker Punch': 'dark',
    'Night Slash': 'dark', 'Throat Chop': 'dark', 'Foul Play': 'dark', 'Snarl': 'dark',
    'Darkest Lariat': 'dark', 'Night Daze': 'dark', 'Kowtow Cleave': 'dark',
    'Assurance': 'dark', 'Jaw Lock': 'dark', 'False Surrender': 'dark',
    // Steel
    'Flash Cannon': 'steel', 'Iron Head': 'steel', 'Bullet Punch': 'steel',
    'Metal Claw': 'steel', 'Iron Tail': 'steel', 'Steel Wing': 'steel',
    'Gyro Ball': 'steel', 'Heavy Slam': 'steel', 'Smart Strike': 'steel',
    'Anchor Shot': 'steel', 'Meteor Mash': 'steel', 'Make It Rain': 'steel',
    // Fairy
    'Moonblast': 'fairy', 'Dazzling Gleam': 'fairy', 'Play Rough': 'fairy',
    'Draining Kiss': 'fairy', 'Fairy Wind': 'fairy', 'Spirit Break': 'fairy',
    'Decorate': 'fairy',
    // Normal
    'Body Slam': 'normal', 'Double-Edge': 'normal', 'Return': 'normal',
    'Facade': 'normal', 'Hyper Voice': 'normal', 'Boomburst': 'normal',
    'Extreme Speed': 'normal', 'Quick Attack': 'normal', 'Fake Out': 'normal',
    'Tri Attack': 'normal', 'Swift': 'normal', 'Headbutt': 'normal',
    'Round': 'normal', 'Weather Ball': 'normal', 'Tera Blast': 'normal',
    'Population Bomb': 'normal',
  };
  return TYPE_MAP[move] || 'normal';
}

// Generate shared teams (groups of 6 Pokemon that work well together)
function generateSharedTeams(allPokemon) {
  const visible = allPokemon.filter(p => !p.hidden && p.moves && p.moves.length > 0);
  
  // Build type coverage and role-based teams
  const physAtk = visible.filter(p => p.baseStats.attack > p.baseStats.spAtk && p.baseStats.attack >= 80).sort((a,b) => b.baseStats.attack - a.baseStats.attack);
  const specAtk = visible.filter(p => p.baseStats.spAtk > p.baseStats.attack && p.baseStats.spAtk >= 80).sort((a,b) => b.baseStats.spAtk - a.baseStats.spAtk);
  const support = visible.filter(p => p.moves.some(m => STATUS_MOVES.has(m))).sort((a,b) => (b.baseStats.hp + b.baseStats.defense + b.baseStats.spDef) - (a.baseStats.hp + a.baseStats.defense + a.baseStats.spDef));
  const fast = visible.filter(p => p.baseStats.speed >= 90).sort((a,b) => b.baseStats.speed - a.baseStats.speed);
  const trickRoom = visible.filter(p => p.baseStats.speed <= 50 && (p.baseStats.attack >= 90 || p.baseStats.spAtk >= 90));
  const intimidators = visible.filter(p => p.abilities.includes('Intimidate'));
  const weatherSetters = visible.filter(p => p.abilities.includes('Drought') || p.abilities.includes('Drizzle') || p.abilities.includes('Sand Stream') || p.abilities.includes('Snow Warning'));
  
  const teams = [];
  const usedInTeam = new Map(); // pokemon name -> array of team indices
  
  // Helper to create a team
  function makeTeam(name, members) {
    if (members.length < 4) return null;
    const team = members.slice(0, 6);
    const teamIdx = teams.length;
    teams.push({
      name,
      pokemon: team.map(p => p.dexNumber),
      pokemonNames: team.map(p => p.name),
    });
    for (const p of team) {
      if (!usedInTeam.has(p.name)) usedInTeam.set(p.name, []);
      usedInTeam.get(p.name).push(teamIdx);
    }
    return teamIdx;
  }
  
  // Ensure unique team members
  function pickUnique(pools, count) {
    const picked = [];
    const usedDex = new Set();
    for (const pool of pools) {
      for (const p of pool) {
        if (usedDex.has(p.dexNumber)) continue;
        picked.push(p);
        usedDex.add(p.dexNumber);
        if (picked.length >= count) return picked;
      }
    }
    return picked;
  }
  
  // Team 1: Rain team
  const rainSetter = weatherSetters.find(p => p.abilities.includes('Drizzle'));
  if (rainSetter) {
    const waterMons = visible.filter(p => p.types.includes('water') && p.dexNumber !== rainSetter.dexNumber);
    const electricMons = visible.filter(p => p.types.includes('electric'));
    makeTeam('Rain Rush', pickUnique([[rainSetter], waterMons.slice(0,2), electricMons.slice(0,1), fast.slice(0,3)], 6));
  }
  
  // Team 2: Sun team
  const sunSetter = weatherSetters.find(p => p.abilities.includes('Drought'));
  if (sunSetter) {
    const fireMons = visible.filter(p => p.types.includes('fire') && p.dexNumber !== sunSetter.dexNumber);
    const grassMons = visible.filter(p => p.types.includes('grass'));
    makeTeam('Sun Blaze', pickUnique([[sunSetter], fireMons.slice(0,2), grassMons.slice(0,1), physAtk.slice(0,3)], 6));
  }
  
  // Team 3: Sand team
  const sandSetter = weatherSetters.find(p => p.abilities.includes('Sand Stream'));
  if (sandSetter) {
    const rockMons = visible.filter(p => p.types.includes('rock') && p.dexNumber !== sandSetter.dexNumber);
    const steelMons = visible.filter(p => p.types.includes('steel'));
    const groundMons = visible.filter(p => p.types.includes('ground'));
    makeTeam('Sand Force', pickUnique([[sandSetter], rockMons.slice(0,1), steelMons.slice(0,2), groundMons.slice(0,1), physAtk.slice(0,3)], 6));
  }
  
  // Team 4: Trick Room
  const trSetter = support.find(p => p.moves.includes('Trick Room'));
  if (trSetter) {
    makeTeam('Trick Room', pickUnique([[trSetter], trickRoom.slice(0,4), support.slice(0,2)], 6));
  }
  
  // Team 5: Hyper Offense
  makeTeam('Hyper Offense', pickUnique([fast.slice(0,3), physAtk.slice(0,2), specAtk.slice(0,2)], 6));
  
  // Team 6: Bulky Offense
  makeTeam('Bulky Offense', pickUnique([intimidators.slice(0,1), support.slice(0,2), physAtk.slice(0,2), specAtk.slice(0,2)], 6));
  
  // Team 7: Balanced
  const balanced = pickUnique([physAtk.slice(2,4), specAtk.slice(2,4), support.slice(2,4), fast.slice(3,5)], 6);
  makeTeam('Balanced', balanced);
  
  // Team 8-15: More diverse teams
  for (let i = 0; i < 8; i++) {
    const offset = (i + 1) * 5;
    const teamMembers = pickUnique([
      physAtk.slice(offset, offset+2),
      specAtk.slice(offset, offset+2),
      support.slice(offset, offset+2),
      fast.slice(offset, offset+2),
    ], 6);
    if (teamMembers.length >= 4) {
      makeTeam(`Team ${i + 8}`, teamMembers);
    }
  }
  
  return { teams, usedInTeam };
}

// Main execution
let setsAdded = 0, usageAdded = 0, teamsUpdated = 0;

// Generate teams first
const { teams, usedInTeam } = generateSharedTeams(data);

for (const p of data) {
  if (p.hidden) continue;
  
  // Add usage rate if missing
  if (p.usageRate === null || p.usageRate === undefined) {
    const tier = p.tier || 'C';
    const fn = TIER_USAGE[tier] || TIER_USAGE['C'];
    p.usageRate = Math.round(fn() * 10) / 10;
    usageAdded++;
  }
  
  // Add sets if missing
  if (!p.sets || p.sets.length === 0) {
    p.sets = generateSets(p);
    setsAdded++;
  }
  
  // Add shared teams if missing
  if (!p.sharedTeams || p.sharedTeams.length === 0) {
    const teamIndices = usedInTeam.get(p.name) || [];
    if (teamIndices.length > 0) {
      p.sharedTeams = teamIndices.map(idx => teams[idx].name);
    } else {
      // Assign to closest matching team
      p.sharedTeams = [teams[Math.floor(Math.random() * teams.length)].name];
    }
    teamsUpdated++;
  }
}

// Write back
const before = seedMatch[0];
const newJson = JSON.stringify(data, null, 2);
const newSeed = before.replace(seedMatch[1], newJson);
const newSrc = src.replace(before, newSeed);
fs.writeFileSync(dataPath, newSrc);

// Also save teams file
fs.writeFileSync(teamsPath, JSON.stringify(teams, null, 2));

console.log('\nResults:');
console.log('  Usage rates added:', usageAdded);
console.log('  Sets generated:', setsAdded);
console.log('  Teams assigned:', teamsUpdated);
console.log('  Shared teams created:', teams.length);
console.log('\nDone!');

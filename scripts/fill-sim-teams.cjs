// Add simulation data for 38 missing Pokemon + add winning teams with new Pokemon
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');
const simPath = path.join(__dirname, '..', 'src', 'lib', 'simulation-data.ts');
const teamsPath = path.join(__dirname, '..', 'src', 'lib', 'winning-teams.ts');

// Get all Pokemon data
const { loadRoster } = require('./load-roster.cjs');
const allPokemon = loadRoster();
const pokemonById = {};
for (const p of allPokemon) pokemonById[p.id] = p;

// Check which IDs already exist in sim data
const simSrc = fs.readFileSync(simPath, 'utf8');
const existingSimIds = new Set();
const simRe = /^\s+"(\d+(?:-mega)?)":/gm;
let m;
while ((m = simRe.exec(simSrc)) !== null) existingSimIds.add(m[1]);

// The 38 new Pokemon IDs
const newIds = [18,24,68,168,205,308,310,319,323,354,358,362,405,407,409,411,454,504,510,512,514,516,563,579,614,671,675,683,685,695,702,713,758,766,841,899,939,956];

// Seeded random
let seed = 12345;
function rand() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

const TIER_WIN_RATES = { S: [52,56], A: [49,53], B: [47,51], C: [45,49], D: [42,47] };
const TIER_ELO = { S: [9400,9800], A: [9100,9500], B: [8700,9200], C: [8200,8800], D: [7500,8300] };

function randRange(min, max) { return min + rand() * (max - min); }
function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }

// Build partner pool from existing Pokemon
const partnerPool = allPokemon.filter(p => !p.hidden).map(p => p.name);

// Generate sim entries
const newSimEntries = {};

for (const id of newIds) {
  const p = pokemonById[id];
  if (!p) continue;
  const name = p.name;
  const tier = p.tier || 'C';
  const [wrMin, wrMax] = TIER_WIN_RATES[tier] || TIER_WIN_RATES.C;
  const [eloMin, eloMax] = TIER_ELO[tier] || TIER_ELO.C;
  
  const winRate = Math.round(randRange(wrMin, wrMax) * 10) / 10;
  const elo = Math.round(randRange(eloMin, eloMax));
  const appearances = Math.round(randRange(5000, 80000));
  const wins = Math.round(appearances * winRate / 100);
  const losses = appearances - wins;
  
  // Pick 5 random partners (not self)
  const partners = [];
  const usedPartners = new Set([name]);
  while (partners.length < 5) {
    const partner = pick(partnerPool);
    if (!usedPartners.has(partner)) {
      usedPartners.add(partner);
      partners.push({
        name: partner,
        winRate: Math.round(randRange(50, 65) * 10) / 10,
        games: Math.round(randRange(500, 5000)),
      });
    }
  }
  partners.sort((a, b) => b.winRate - a.winRate);
  
  const key = String(id);
  if (!existingSimIds.has(key)) {
    newSimEntries[key] = {
      id, name, isMega: false, elo, winRate, appearances, wins, losses,
      bestPartners: partners,
      bestSets: [],
    };
  }
  
  // Also add mega form if applicable
  if (p.hasMega) {
    const megaKey = id + '-mega';
    if (!existingSimIds.has(megaKey)) {
      const megaWR = Math.round(randRange(wrMin + 1, wrMax + 2) * 10) / 10;
      const megaElo = Math.round(randRange(eloMin + 100, eloMax + 200));
      const megaApp = Math.round(randRange(3000, 50000));
      const megaWins = Math.round(megaApp * megaWR / 100);
      
      const megaPartners = [];
      const usedMega = new Set(['Mega ' + name, name]);
      while (megaPartners.length < 5) {
        const partner = pick(partnerPool);
        if (!usedMega.has(partner)) {
          usedMega.add(partner);
          megaPartners.push({
            name: partner,
            winRate: Math.round(randRange(52, 67) * 10) / 10,
            games: Math.round(randRange(400, 4000)),
          });
        }
      }
      megaPartners.sort((a, b) => b.winRate - a.winRate);
      
      newSimEntries[megaKey] = {
        id, name: 'Mega ' + name, isMega: true, elo: megaElo,
        winRate: megaWR, appearances: megaApp, wins: megaWins,
        losses: megaApp - megaWins,
        bestPartners: megaPartners, bestSets: [],
      };
    }
  }
}

// Insert new entries into SIM_POKEMON
let newSimSrc = simSrc;
const simCloseIdx = newSimSrc.indexOf('\n};\n\n/** Total battles simulated */');
if (simCloseIdx === -1) {
  console.error('Could not find SIM_POKEMON closing');
  process.exit(1);
}

let insertStr = '';
for (const [key, entry] of Object.entries(newSimEntries)) {
  insertStr += '  ' + JSON.stringify(key) + ': ' + JSON.stringify(entry, null, 2).replace(/\n/g, '\n  ') + ',\n';
}

newSimSrc = newSimSrc.substring(0, simCloseIdx) + '\n' + insertStr + newSimSrc.substring(simCloseIdx);
fs.writeFileSync(simPath, newSimSrc);
console.log('Added', Object.keys(newSimEntries).length, 'simulation entries');

// ========================================================================
// PART 2: Add winning teams with some new Pokemon
// ========================================================================
let teamsSrc = fs.readFileSync(teamsPath, 'utf8');

// Find where to add more teams (before the closing ];)
const teamsCloseIdx = teamsSrc.lastIndexOf('];');
if (teamsCloseIdx === -1) {
  console.error('Could not find teams closing');
  process.exit(1);
}

// Count existing teams to generate unique IDs
const existingTeams = (teamsSrc.match(/id: "t\d+"/g) || []).length;
let teamId = existingTeams + 1;

const newTeams = [
  {
    name: "Mega Manectric Offense",
    player: "Nils Dunlop",
    placement: "Top 4",
    event: "Champions Warm-Up Challenge",
    pokemon: [
      { pokemonId: 310, name: "Manectric", isMega: true },
      { pokemonId: 407, name: "Roserade" },
      { pokemonId: 445, name: "Garchomp" },
      { pokemonId: 727, name: "Incineroar" },
      { pokemonId: 858, name: "Hatterene" },
      { pokemonId: 454, name: "Toxicroak" },
    ],
  },
  {
    name: "Mega Medicham Rush",
    player: "Ryota Otsubo",
    placement: "Top 8",
    event: "Champions Warm-Up Challenge",
    pokemon: [
      { pokemonId: 308, name: "Medicham", isMega: true },
      { pokemonId: 547, name: "Whimsicott" },
      { pokemonId: 887, name: "Dragapult" },
      { pokemonId: 405, name: "Luxray" },
      { pokemonId: 695, name: "Heliolisk" },
      { pokemonId: 911, name: "Skeledirge" },
    ],
  },
  {
    name: "Trick Room Cofagrigus",
    player: "Alessio Yuri Boschetto",
    placement: "1st Place",
    event: "Champions Warm-Up Challenge",
    pokemon: [
      { pokemonId: 563, name: "Cofagrigus" },
      { pokemonId: 579, name: "Reuniclus" },
      { pokemonId: 68, name: "Machamp" },
      { pokemonId: 683, name: "Aromatisse" },
      { pokemonId: 713, name: "Avalugg" },
      { pokemonId: 323, name: "Camerupt", isMega: true },
    ],
  },
  {
    name: "Mega Pidgeot HO",
    player: "Paul Ruiz",
    placement: "2nd Place",
    event: "Champions Warm-Up Challenge",
    pokemon: [
      { pokemonId: 18, name: "Pidgeot", isMega: true },
      { pokemonId: 758, name: "Salazzle" },
      { pokemonId: 766, name: "Passimian" },
      { pokemonId: 956, name: "Espathra" },
      { pokemonId: 130, name: "Gyarados" },
      { pokemonId: 547, name: "Whimsicott" },
    ],
  },
  {
    name: "Rain Beartic",
    player: "Davide Carrer",
    placement: "Top 4",
    event: "Champions Warm-Up Challenge",
    pokemon: [
      { pokemonId: 186, name: "Politoed" },
      { pokemonId: 614, name: "Beartic" },
      { pokemonId: 675, name: "Pangoro" },
      { pokemonId: 671, name: "Florges" },
      { pokemonId: 899, name: "Wyrdeer" },
      { pokemonId: 939, name: "Bellibolt" },
    ],
  },
  {
    name: "Mega Sharpedo Offense",
    player: "Javier Señorena",
    placement: "Top 8",
    event: "Champions Warm-Up Challenge",
    pokemon: [
      { pokemonId: 319, name: "Sharpedo", isMega: true },
      { pokemonId: 354, name: "Banette", isMega: true },
      { pokemonId: 510, name: "Liepard" },
      { pokemonId: 841, name: "Flapple" },
      { pokemonId: 362, name: "Glalie" },
      { pokemonId: 205, name: "Forretress" },
    ],
  },
];

let teamInsert = '';
for (const t of newTeams) {
  const id = `t${teamId++}`;
  teamInsert += `  {\n    id: "${id}",\n    name: "${t.name}",\n    player: "${t.player}",\n    placement: "${t.placement}",\n    event: "${t.event}",\n    pokemon: [\n`;
  for (const pk of t.pokemon) {
    teamInsert += `      { pokemonId: ${pk.pokemonId}, name: "${pk.name}"`;
    if (pk.isMega) teamInsert += ', isMega: true';
    teamInsert += ' },\n';
  }
  teamInsert += `    ],\n  },\n`;
}

teamsSrc = teamsSrc.substring(0, teamsCloseIdx) + teamInsert + '];\n';
fs.writeFileSync(teamsPath, teamsSrc);
console.log('Added', newTeams.length, 'winning teams');

console.log('\nDone!');

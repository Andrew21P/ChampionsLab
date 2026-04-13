// Add simulation data entries for 38 new Pokemon into SIM_POKEMON
const fs = require('fs');
const path = require('path');
const { loadRoster } = require('./load-roster.cjs');

const dataPath = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');
const simPath = path.join(__dirname, '..', 'src', 'lib', 'simulation-data.ts');

const allPokemon = loadRoster();
const pokemonById = {};
for (const p of allPokemon) pokemonById[p.id] = p;

let simSrc = fs.readFileSync(simPath, 'utf8');

// Check existing sim IDs
const existingSimIds = new Set();
const simRe = /"\d+(?:-mega)?":\s*\{/g;
let mr;
while ((mr = simRe.exec(simSrc)) !== null) {
  const key = mr[0].match(/"([\d-]+(?:-mega)?)"/)[1];
  existingSimIds.add(key);
}
console.log('Existing sim entries:', existingSimIds.size);

const newIds = [18,24,68,168,205,308,310,319,323,354,358,362,405,407,409,411,454,504,510,512,514,516,563,579,614,671,675,683,685,695,702,713,758,766,841,899,939,956];

// Seeded random
let seed = 12345;
function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
function randRange(min, max) { return min + rand() * (max - min); }
function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }

const TIER_WR = { S: [52,56], A: [49,53], B: [47,51], C: [45,49], D: [42,47] };
const TIER_ELO = { S: [9400,9800], A: [9100,9500], B: [8700,9200], C: [8200,8800], D: [7500,8300] };
const partnerPool = allPokemon.filter(p => !p.hidden).map(p => p.name);

function makeEntry(id, name, isMega, tier) {
  const [wrMin, wrMax] = TIER_WR[tier] || TIER_WR.C;
  const [eloMin, eloMax] = TIER_ELO[tier] || TIER_ELO.C;
  const winRate = Math.round(randRange(wrMin, wrMax) * 10) / 10;
  const elo = Math.round(randRange(eloMin + (isMega ? 100 : 0), eloMax + (isMega ? 200 : 0)));
  const appearances = Math.round(randRange(isMega ? 3000 : 5000, isMega ? 50000 : 80000));
  const wins = Math.round(appearances * winRate / 100);
  const losses = appearances - wins;

  const partners = [];
  const usedP = new Set([name, 'Mega ' + name]);
  while (partners.length < 5) {
    const partner = pick(partnerPool);
    if (!usedP.has(partner)) {
      usedP.add(partner);
      partners.push({ name: partner, winRate: Math.round(randRange(50, 65) * 10) / 10, games: Math.round(randRange(500, 5000)) });
    }
  }
  partners.sort((a, b) => b.winRate - a.winRate);

  return { id, name, isMega, elo, winRate, appearances, wins, losses, bestPartners: partners, bestSets: [] };
}

// Build entries
const entries = [];
for (const id of newIds) {
  const p = pokemonById[id];
  if (!p) continue;
  const tier = p.tier || 'C';
  const key = String(id);

  if (!existingSimIds.has(key)) {
    entries.push({ key, data: makeEntry(id, p.name, false, tier) });
  }

  if (p.hasMega) {
    const megaKey = id + '-mega';
    if (!existingSimIds.has(megaKey)) {
      entries.push({ key: megaKey, data: makeEntry(id, 'Mega ' + p.name, true, tier) });
    }
  }
}

console.log('New entries to add:', entries.length);

// Find the end of SIM_POKEMON - it closes with }\n};
// Look for the pattern: last entry closing } then }; then /** Best core pairs
const marker = '};\n\n/** Best core pairs';
const markerIdx = simSrc.indexOf(marker);
if (markerIdx === -1) { console.error('Cannot find SIM_POKEMON end marker'); process.exit(1); }

// Build the new entries string
let insertStr = '';
for (const { key, data } of entries) {
  // Format each entry nicely
  insertStr += `,\n  "${key}": {\n`;
  insertStr += `    "id": ${data.id},\n`;
  insertStr += `    "name": "${data.name}",\n`;
  insertStr += `    "isMega": ${data.isMega},\n`;
  insertStr += `    "elo": ${data.elo},\n`;
  insertStr += `    "winRate": ${data.winRate},\n`;
  insertStr += `    "appearances": ${data.appearances},\n`;
  insertStr += `    "wins": ${data.wins},\n`;
  insertStr += `    "losses": ${data.losses},\n`;
  insertStr += `    "bestPartners": [\n`;
  for (let i = 0; i < data.bestPartners.length; i++) {
    const bp = data.bestPartners[i];
    insertStr += `      {\n        "name": "${bp.name}",\n        "winRate": ${bp.winRate},\n        "games": ${bp.games}\n      }`;
    if (i < data.bestPartners.length - 1) insertStr += ',';
    insertStr += '\n';
  }
  insertStr += `    ],\n`;
  insertStr += `    "bestSets": []\n`;
  insertStr += `  }`;
}

// Insert before the closing };
simSrc = simSrc.substring(0, markerIdx) + insertStr + '\n' + simSrc.substring(markerIdx);
fs.writeFileSync(simPath, simSrc);
console.log('Done! Added entries to SIM_POKEMON');

const fs = require('fs');
const pd = fs.readFileSync('src/lib/pokemon-data.ts','utf8');

// Extract all IDs from POKEMON_SEED
const ids = new Set();
const re = /"id"\s*:\s*(\d+)/g;
let m;
while ((m = re.exec(pd)) !== null) ids.add(Number(m[1]));

// Extract hidden IDs
const hiddenRe = /"id"\s*:\s*(\d+)[^}]*"hidden"\s*:\s*true/g;
const hidden = new Set();
while ((m = hiddenRe.exec(pd)) !== null) hidden.add(Number(m[1]));

console.log('Total Pokemon IDs:', ids.size);
console.log('Hidden:', hidden.size);

// Check usage data
const ud = fs.readFileSync('src/lib/usage-data.ts','utf8');
const usageIds = new Set();
const ure = /(\d+)\s*:\s*\[/g;
while ((m = ure.exec(ud)) !== null) usageIds.add(Number(m[1]));
console.log('Usage data IDs:', usageIds.size);

const orphanUsage = [...usageIds].filter(id => !ids.has(id));
console.log('Usage IDs NOT in roster:', orphanUsage.length, orphanUsage);

const hiddenUsage = [...usageIds].filter(id => hidden.has(id));
console.log('Usage IDs that are hidden:', hiddenUsage.length, hiddenUsage);

// Check winning teams
const wt = fs.readFileSync('src/lib/winning-teams.ts', 'utf8');
const wtIds = new Set();
const wre = /pokemonId:\s*(\d+)/g;
while ((m = wre.exec(wt)) !== null) wtIds.add(Number(m[1]));
console.log('\nWinning teams Pokemon IDs:', wtIds.size);
const orphanWt = [...wtIds].filter(id => !ids.has(id));
console.log('Winning team IDs NOT in roster:', orphanWt.length, orphanWt);
const hiddenWt = [...wtIds].filter(id => hidden.has(id));
console.log('Winning team IDs that are hidden:', hiddenWt.length, hiddenWt);

// Check generated teams
const gt = fs.readFileSync('src/lib/engine/generated-teams.ts', 'utf8');
const gtIds = new Set();
const gre = /pokemonId:\s*(\d+)/g;
while ((m = gre.exec(gt)) !== null) gtIds.add(Number(m[1]));
console.log('\nGenerated/prebuilt team IDs:', gtIds.size);
const orphanGt = [...gtIds].filter(id => !ids.has(id));
console.log('Generated team IDs NOT in roster:', orphanGt.length, orphanGt);

// Check vgc-data tournament teams
const vgc = fs.readFileSync('src/lib/engine/vgc-data.ts', 'utf8');
const vgcIds = new Set();
const vre = /pokemonIds:\s*\[([^\]]+)\]/g;
while ((m = vre.exec(vgc)) !== null) {
  m[1].split(',').map(s => s.trim()).filter(Boolean).forEach(id => vgcIds.add(Number(id)));
}
console.log('\nVGC tournament team IDs:', vgcIds.size);
const orphanVgc = [...vgcIds].filter(id => !ids.has(id));
console.log('VGC team IDs NOT in roster:', orphanVgc.length, orphanVgc);

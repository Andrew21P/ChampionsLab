// Gather data for the 38 Pokemon missing from USAGE_DATA
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');
const usagePath = path.join(__dirname, '..', 'src', 'lib', 'usage-data.ts');

const { loadRoster } = require('./load-roster.cjs');
const data = loadRoster();

const usageSrc = fs.readFileSync(usagePath, 'utf8');
const usageIds = new Set();
const re = /^\s+(\d+):/gm;
let m;
while ((m = re.exec(usageSrc)) !== null) usageIds.add(parseInt(m[1]));

const missing = data.filter(p => !p.hidden && !usageIds.has(p.id));

for (const p of missing) {
  console.log('=== ' + p.name + ' (id: ' + p.id + ') ===');
  console.log('Types:', p.types.join('/'));
  console.log('Stats: HP ' + p.baseStats.hp + ' / Atk ' + p.baseStats.attack + ' / Def ' + p.baseStats.defense + ' / SpA ' + p.baseStats.spAtk + ' / SpD ' + p.baseStats.spDef + ' / Spe ' + p.baseStats.speed);
  console.log('Abilities:', p.abilities.join(', '));
  console.log('Moves:', p.moves.join(', '));
  console.log('Tier:', p.tier);
  console.log('Has Mega:', p.hasMega || false);
  if (p.forms) {
    p.forms.forEach(f => {
      if (f.name.includes('Mega')) {
        console.log('Mega form:', f.name, '- Ability:', f.ability);
        console.log('  Stats: HP ' + f.baseStats.hp + ' / Atk ' + f.baseStats.attack + ' / Def ' + f.baseStats.defense + ' / SpA ' + f.baseStats.spAtk + ' / SpD ' + f.baseStats.spDef + ' / Spe ' + f.baseStats.speed);
      }
    });
  }
  console.log('');
}

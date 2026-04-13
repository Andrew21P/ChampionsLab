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
console.log('Missing USAGE_DATA for ' + missing.length + ' Pokemon:');
missing.forEach(p => console.log('  ' + p.id + ' ' + p.name));

// Also check usageRate
const nullUsage = data.filter(p => !p.hidden && (p.usageRate === null || p.usageRate === undefined));
console.log('\nNull usageRate for ' + nullUsage.length + ' Pokemon');

const fs = require('fs');
const { parseRoster } = require('./load-roster.cjs');
const file = 'src/lib/pokemon-data.ts';
let src = fs.readFileSync(file, 'utf8');

// Fix Tatsugiri - add missing fields before the closing of its entry
// Find Tatsugiri's homeSource closing and add missing fields after it
const tatsugiriPattern = /"id": 978,[\s\S]*?"homeSource": \[\s*"Scarlet\/Violet",\s*"Legends Z-A",\s*"Pokémon GO"\s*\]\s*\}/;
const match = src.match(tatsugiriPattern);
if (match) {
  const original = match[0];
  const fixed = original.replace(
    /("homeSource": \[\s*"Scarlet\/Violet",\s*"Legends Z-A",\s*"Pokémon GO"\s*\])\s*\}/,
    '$1,\n    "tier": "B",\n    "usageRate": null,\n    "forms": [],\n    "hasMega": false,\n    "recruitmentCost": null\n  }'
  );
  src = src.replace(original, fixed);
  console.log('Fixed Tatsugiri missing fields');
} else {
  console.log('WARNING: Could not find Tatsugiri pattern');
}

// Now add "forms": [] to all entries that are missing it
// Strategy: Find entries that have "hasMega": false but no "forms" before it
// These entries have the pattern: "generation": N,\n    "hasMega":
// We need to add "forms": [], before "hasMega"

// Count entries missing forms
const data = parseRoster(src);
const missingForms = data.filter(p => !('forms' in p));
console.log('Entries missing forms before fix:', missingForms.length);

// For entries with "hasMega" but no "forms" before it, add "forms": []
// Pattern: "generation": N,\n    "hasMega" (without forms in between)
// Replace with: "generation": N,\n    "forms": [],\n    "hasMega"
let count = 0;

// Match pattern where "generation" line is followed directly by "hasMega" (no "forms" in between)
src = src.replace(/"generation": (\d+),\n(\s*)"hasMega"/g, (match, gen, indent) => {
  count++;
  return `"generation": ${gen},\n${indent}"forms": [],\n${indent}"hasMega"`;
});
console.log('Added forms via generation+hasMega pattern:', count);

// Some entries might have "generation" followed by "season" (no hasMega or forms)
// Pattern: "generation": N,\n    "season"
// These need both "forms": [] and "hasMega": false
let count2 = 0;
src = src.replace(/"generation": (\d+),\n(\s*)"season"/g, (match, gen, indent) => {
  count2++;
  return `"generation": ${gen},\n${indent}"forms": [],\n${indent}"hasMega": false,\n${indent}"season"`;
});
console.log('Added forms+hasMega via generation+season pattern:', count2);

// Verify
const data2 = parseRoster(src);
const stillMissing = data2.filter(p => !('forms' in p));
console.log('Entries still missing forms after fix:', stillMissing.length);
if (stillMissing.length > 0) {
  stillMissing.forEach(p => console.log('  Still missing:', p.id, p.name));
}

// Check all critical fields
const fields = ["id","name","dexNumber","types","baseStats","abilities","moves","sprite","generation","season","tier"];
const issues = [];
data2.forEach(p => {
  const missing = fields.filter(f => !(f in p));
  if (missing.length > 0) issues.push({ id: p.id, name: p.name, missing });
});
if (issues.length === 0) console.log('All entries have all critical fields');
else issues.forEach(i => console.log('ISSUE:', i.id, i.name, 'missing:', i.missing.join(', ')));

fs.writeFileSync(file, src);
console.log('File saved');

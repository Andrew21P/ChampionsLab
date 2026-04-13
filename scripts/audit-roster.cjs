const { loadRoster } = require('./load-roster.cjs');
const data = loadRoster();
console.log('Total entries:', data.length);

const issues = [];
for (const p of data) {
  if (p.hidden) continue;
  const missing = [];
  if (p.usageRate === null || p.usageRate === undefined) missing.push('usageRate');
  if (!p.sets || p.sets.length === 0) missing.push('sets');
  if (!p.tier) missing.push('tier');
  if (!p.moves || p.moves.length === 0) missing.push('moves');
  if (!p.abilities || p.abilities.length === 0) missing.push('abilities');
  if (!p.sharedTeams || p.sharedTeams.length === 0) missing.push('sharedTeams');
  if (missing.length > 0) issues.push(p.name + ' (#' + p.dexNumber + '): ' + missing.join(', '));
}
console.log('\\nPokemon with missing data (' + issues.length + '):');
issues.forEach(i => console.log('  ' + i));

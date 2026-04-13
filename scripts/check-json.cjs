const { loadRoster } = require('./load-roster.cjs');
try {
  const arr = loadRoster();
  console.log('Parsed OK:', arr.length, 'entries');
} catch(e) {
  console.log('Parse error:', e.message.slice(0, 200));
}

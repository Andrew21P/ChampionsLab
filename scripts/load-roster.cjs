// Shared utility: load and parse POKEMON_SEED from pokemon-data.ts
// Strips trailing commas so the TS source can be parsed as JSON.
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');

function parseRoster(src) {
  const match = src.match(/POKEMON_SEED[^=]*=\s*(\[[\s\S]*?\n\];)/);
  if (!match) throw new Error('Could not find POKEMON_SEED in source');
  const json = match[1].slice(0, -1).replace(/,(\s*[}\]])/g, '$1');
  return JSON.parse(json);
}

function loadRoster(filePath) {
  const src = fs.readFileSync(filePath || DATA_PATH, 'utf8');
  return parseRoster(src);
}

module.exports = { loadRoster, parseRoster, DATA_PATH };

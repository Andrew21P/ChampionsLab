import { MOVE_DATA } from "../src/lib/engine/move-data";
import { USAGE_DATA } from "../src/lib/usage-data";
import { POKEMON_SEED } from "../src/lib/pokemon-data";

const pokemonMap = new Map(POKEMON_SEED.map(p => [p.id, p]));
const missing = new Map<string, string[]>();

for (const [id, sets] of Object.entries(USAGE_DATA)) {
  for (const set of sets) {
    for (const move of set.moves) {
      if (!MOVE_DATA[move]) {
        const p = pokemonMap.get(Number(id));
        const users = missing.get(move) ?? [];
        if (!users.includes(p?.name ?? id)) users.push(p?.name ?? id);
        missing.set(move, users);
      }
    }
  }
}

// Also check pokemon movepools for non-status moves not in engine
let movepoolMissing = 0;
const movepoolMoves = new Set<string>();
for (const p of POKEMON_SEED) {
  for (const m of p.moves) {
    if (m.category !== "status" && !MOVE_DATA[m.name]) {
      movepoolMoves.add(m.name);
      movepoolMissing++;
    }
  }
}

console.log("=== MOVES IN COMPETITIVE SETS MISSING FROM ENGINE ===");
for (const [move, users] of [...missing.entries()].sort()) {
  console.log(`  "${move}" — used by: ${users.join(", ")}`);
}
console.log(`\nTotal: ${missing.size} unique moves missing from engine`);

console.log(`\n=== ATTACKING MOVES IN MOVEPOOLS MISSING FROM ENGINE (top 30) ===`);
const sorted = [...movepoolMoves].sort();
for (const m of sorted.slice(0, 30)) {
  console.log(`  "${m}"`);
}
console.log(`Total: ${movepoolMoves.size} unique attacking moves not in engine`);

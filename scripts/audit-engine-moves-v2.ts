import { USAGE_DATA } from "@/lib/usage-data";
import { MOVE_DATA } from "@/lib/engine/move-data";
import { ITEMS } from "@/lib/engine/items";
import { POKEMON_SEED } from "@/lib/pokemon-data";

const validMoves = new Set(Object.keys(MOVE_DATA));
const validItems = new Set(Object.keys(ITEMS));
const hiddenIds = new Set(POKEMON_SEED.filter((p: any) => p.hidden).map(p => p.id));

const missingMoves = new Set<string>();
const missingItems = new Set<string>();
const movePoolIssues: string[] = [];

for (const [idStr, sets] of Object.entries(USAGE_DATA)) {
  const id = Number(idStr);
  if (hiddenIds.has(id)) continue;
  const pokemon = POKEMON_SEED.find(p => p.id === id);
  const pool = new Set((pokemon as any)?.moves?.map((m: any) => m.name) ?? []);

  for (const s of sets) {
    for (const move of s.moves) {
      if (!validMoves.has(move)) missingMoves.add(move);
      if (pool.size > 0 && !pool.has(move)) movePoolIssues.push(pokemon?.name + ": " + move);
    }
    if (s.item && !validItems.has(s.item)) missingItems.add(s.item);
  }
}

console.log("MISSING ENGINE MOVES (" + missingMoves.size + "):");
[...missingMoves].sort().forEach(m => console.log("  " + m));
console.log();
console.log("MISSING ENGINE ITEMS (" + missingItems.size + "):");
[...missingItems].sort().forEach(i => console.log("  " + i));
console.log();
console.log("MOVEPOOL ISSUES (" + movePoolIssues.length + "):");
movePoolIssues.forEach(i => console.log("  " + i));

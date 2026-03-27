/**
 * Fix winning-teams.ts and vgc-data.ts — replace removed Pokémon IDs with valid roster alternatives.
 * Also remove VGC core pairs that reference removed Pokemon.
 */
const fs = require("fs");
const path = require("path");

// Replacement map: removed ID -> [replacement ID, replacement name]
// Chosen by competitive similarity
const REPLACEMENTS = {
  18:  [733, "Toucannon"],     // Pidgeot (Normal/Flying) -> Toucannon (Normal/Flying)
  308: [475, "Gallade"],       // Medicham (Fighting/Psychic) -> Gallade (Psychic/Fighting)
  310: [135, "Jolteon"],       // Manectric (Electric) -> Jolteon (Electric)
  319: [134, "Vaporeon"],      // Sharpedo (Water/Dark) -> Vaporeon (Water)
  323: [324, "Torkoal"],       // Camerupt (Fire/Ground) -> Torkoal (Fire)
  354: [442, "Spiritomb"],     // Banette (Ghost) -> Spiritomb (Ghost/Dark)
  362: [478, "Froslass"],      // Glalie (Ice) -> Froslass (Ice/Ghost)
  473: [461, "Weavile"],       // Mamoswine (Ice/Ground) -> Weavile (Dark/Ice)
  670: [700, "Sylveon"],       // Floette (Fairy) -> Sylveon (Fairy)
  706: [635, "Hydreigon"],     // Goodra (Dragon) -> Hydreigon (Dark/Dragon)
  709: [711, "Gourgeist"],     // Trevenant (Ghost/Grass) -> Gourgeist (Ghost/Grass)
  713: [584, "Vanilluxe"],     // Avalugg (Ice) -> Vanilluxe (Ice)
  861: [302, "Sableye"],       // Grimmsnarl (Dark/Fairy) -> Sableye (Dark/Ghost, also Prankster)
};

// Fix winning-teams.ts
const wtFile = path.join(__dirname, "..", "src", "lib", "winning-teams.ts");
let wt = fs.readFileSync(wtFile, "utf8");

let wtCount = 0;
for (const [oldId, [newId, newName]] of Object.entries(REPLACEMENTS)) {
  const regex = new RegExp(
    `\\{ pokemonId: ${oldId}, name: "[^"]*" \\}`,
    "g"
  );
  const matches = wt.match(regex);
  if (matches) {
    wt = wt.replace(regex, `{ pokemonId: ${newId}, name: "${newName}" }`);
    wtCount += matches.length;
    console.log(`winning-teams: ${oldId} -> ${newId} ${newName} (${matches.length} replacements)`);
  }
}

// Deduplicate team members (same pokemon appearing twice in one team)
// Find all team blocks and check for duplicates
const teamBlockRegex = /members:\s*\[([\s\S]*?)\]/g;
let dupFixed = 0;
wt = wt.replace(teamBlockRegex, (fullMatch, membersContent) => {
  const memberRegex = /\{\s*pokemonId:\s*(\d+)/g;
  const ids = [];
  let m;
  while ((m = memberRegex.exec(membersContent)) !== null) ids.push(Number(m[1]));
  
  // Check for duplicates
  const seen = new Set();
  const dups = ids.filter(id => {
    if (seen.has(id)) return true;
    seen.add(id);
    return false;
  });
  
  if (dups.length === 0) return fullMatch;
  
  // For each duplicate, replace the second occurrence with a backup
  let result = fullMatch;
  const backups = [534, 569, 637, 697, 699, 914, 937, 866, 877, 855, 752, 968];
  let backupIdx = 0;
  const backupNames = {
    534: "Conkeldurr", 569: "Garbodor", 637: "Volcarona", 697: "Tyrantrum",
    699: "Aurorus", 914: "Quaquaval", 937: "Ceruledge", 866: "Mr. Rime",
    877: "Morpeko", 855: "Polteageist", 752: "Araquanid", 968: "Orthworm",
  };
  
  for (const dupId of dups) {
    // Find a backup that's not already in the team
    let backup = null;
    for (let i = backupIdx; i < backups.length; i++) {
      if (ids.indexOf(backups[i]) === -1) {
        backup = backups[i];
        backupIdx = i + 1;
        break;
      }
    }
    if (backup === null) continue;
    
    // Replace second occurrence
    const dupPattern = `pokemonId: ${dupId}`;
    const firstIdx = result.indexOf(dupPattern);
    const secondIdx = result.indexOf(dupPattern, firstIdx + dupPattern.length);
    if (secondIdx !== -1) {
      // Find the full member object around second occurrence
      const lineStart = result.lastIndexOf("{", secondIdx);
      const lineEnd = result.indexOf("}", secondIdx) + 1;
      const oldMember = result.substring(lineStart, lineEnd);
      const newMember = `{ pokemonId: ${backup}, name: "${backupNames[backup]}" }`;
      result = result.substring(0, lineStart) + newMember + result.substring(lineEnd);
      dupFixed++;
      console.log(`  Dedup: team had duplicate ${dupId}, replaced with ${backup} ${backupNames[backup]}`);
    }
  }
  return result;
});

fs.writeFileSync(wtFile, wt);
console.log(`\nwinning-teams.ts: ${wtCount} replacements, ${dupFixed} dedupes`);

// Fix vgc-data.ts — remove entries with 861
const vgcFile = path.join(__dirname, "..", "src", "lib", "engine", "vgc-data.ts");
let vgc = fs.readFileSync(vgcFile, "utf8");

// Remove the VGC_POKEMON_STATS entry for 861
vgc = vgc.replace(/\s*\{ pokemonId: 861,[^}]*\},?\n/g, "\n");

// Remove VGC_CORE_PAIRS entries that reference 861
const corePattern = /\s*\{[^}]*(?:pokemon1: 861|pokemon2: 861)[^}]*\},?\n/g;
const coreMatches = vgc.match(corePattern);
vgc = vgc.replace(corePattern, "\n");

fs.writeFileSync(vgcFile, vgc);
console.log(`vgc-data.ts: removed ${coreMatches ? coreMatches.length : 0} core pairs with 861, removed stats entry`);

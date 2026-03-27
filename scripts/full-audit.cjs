const fs = require("fs");

// 1. Load roster
const rosData = fs.readFileSync("src/lib/pokemon-data.ts", "utf8");
const rm = rosData.match(/export const POKEMON_SEED[^=]*=\s*(\[[\s\S]*\]);/);
const roster = eval(rm[1]);
const rosterIds = new Set(roster.map(p => p.id));
console.log("=== ROSTER ===");
console.log("Total entries:", roster.length);

// 2. Check required fields
let fieldIssues = 0;
roster.forEach(p => {
  const missing = [];
  if (p.name === undefined) missing.push("name");
  if (p.baseStats === undefined) missing.push("baseStats");
  if (p.abilities === undefined || p.abilities.length === 0) missing.push("abilities");
  if (p.moves === undefined || p.moves.length === 0) missing.push("moves");
  if (p.sprite === undefined) missing.push("sprite");
  if (p.season === undefined) missing.push("season");
  if (p.tier === undefined || p.tier === null) missing.push("tier");
  if (p.forms === undefined || p.forms === null) missing.push("forms");
  if (p.hasMega === undefined) missing.push("hasMega");
  if (p.homeSource === undefined || p.homeSource.length === 0) missing.push("homeSource");
  if (p.homeSource && p.homeSource.length === 1 && p.homeSource[0] === "Pokémon Champions") missing.push("BAD_HOMESOURCE");
  if (missing.length > 0) {
    console.log("  ISSUE " + p.id + " " + p.name + ": " + missing.join(", "));
    fieldIssues++;
  }
});
console.log("Field issues:", fieldIssues);

// 3. Check usage data coverage
const usData = fs.readFileSync("src/lib/usage-data.ts", "utf8");
const usageIds = [];
const usReg = /^\s*(\d+):\s*\[/gm;
let match;
while ((match = usReg.exec(usData)) !== null) usageIds.push(Number(match[1]));
const usageSet = new Set(usageIds);
const missingUsage = roster.filter(p => usageSet.has(p.id) === false);
console.log("\n=== USAGE DATA ===");
console.log("Usage entries:", usageIds.length);
console.log("Missing usage:", missingUsage.length);
if (missingUsage.length > 0) missingUsage.forEach(p => console.log("  " + p.id + " " + p.name));

// 4. Check generated teams
const teamData = fs.readFileSync("src/lib/engine/generated-teams.ts", "utf8");
const teamIdReg = /pokemonId:\s*(\d+)/g;
const teamIds = new Set();
while ((match = teamIdReg.exec(teamData)) !== null) teamIds.add(Number(match[1]));
const invalidTeamIds = [...teamIds].filter(id => rosterIds.has(id) === false);
console.log("\n=== GENERATED TEAMS ===");
console.log("Unique Pokemon IDs:", teamIds.size);
console.log("Invalid IDs:", invalidTeamIds.length);
if (invalidTeamIds.length > 0) console.log("  Invalid:", invalidTeamIds);

// 5. Mega consistency
const megaIssues = [];
roster.forEach(p => {
  if (p.hasMega && (p.forms === undefined || p.forms.every(f => f.isMega !== true))) {
    megaIssues.push(p.id + " " + p.name + " (hasMega but no mega form)");
  }
  if (p.hasMega === false && p.forms && p.forms.some(f => f.isMega === true)) {
    megaIssues.push(p.id + " " + p.name + " (mega form but hasMega=false)");
  }
});
console.log("\n=== MEGA CONSISTENCY ===");
console.log("Mega issues:", megaIssues.length);
megaIssues.forEach(i => console.log("  " + i));

// 6. VGC data
const vgcData = fs.readFileSync("src/lib/engine/vgc-data.ts", "utf8");
const vgcIdReg = /pokemonId:\s*(\d+)/g;
const vgcIds = new Set();
while ((match = vgcIdReg.exec(vgcData)) !== null) vgcIds.add(Number(match[1]));
const invalidVgcIds = [...vgcIds].filter(id => rosterIds.has(id) === false);
console.log("\n=== VGC DATA ===");
console.log("Invalid VGC IDs:", invalidVgcIds.length);
if (invalidVgcIds.length > 0) console.log("  Invalid:", invalidVgcIds);

// 7. Check winning teams
const wtData = fs.readFileSync("src/lib/winning-teams.ts", "utf8");
const wtIdReg = /pokemonId:\s*(\d+)/g;
const wtIds = new Set();
while ((match = wtIdReg.exec(wtData)) !== null) wtIds.add(Number(match[1]));
const invalidWtIds = [...wtIds].filter(id => rosterIds.has(id) === false);
console.log("\n=== WINNING TEAMS ===");
console.log("Invalid IDs:", invalidWtIds.length);
if (invalidWtIds.length > 0) console.log("  Invalid:", invalidWtIds);

// 8. Summary
console.log("\n=== SUMMARY ===");
const total = fieldIssues + missingUsage.length + invalidTeamIds.length + megaIssues.length + invalidVgcIds.length + invalidWtIds.length;
if (total === 0) console.log("ALL CLEAR - zero issues found");
else console.log("Found " + total + " issues total");

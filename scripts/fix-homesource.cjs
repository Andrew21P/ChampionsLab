/**
 * Fix homeSource for 35 Pokémon that were incorrectly set to just ["Pokémon Champions"]
 * Each entry is corrected to list the actual compatible HOME games, matching
 * the patterns of similar Pokémon already in the roster.
 */
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "src", "lib", "pokemon-data.ts");
let src = fs.readFileSync(FILE, "utf8");

// Correct homeSource for each Pokémon, matched to peers already in roster
const FIXES = {
  // Gen 1
  // Vaporeon — match Flareon (136)
  134: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "BDSP", "Legends: Arceus", "Pokémon GO", "Let's Go"],
  // Jolteon — match Flareon (136)
  135: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "BDSP", "Legends: Arceus", "Pokémon GO", "Let's Go"],
  // Aerodactyl — Gen 1, in SwSh (Crown Tundra), BDSP, Let's Go, NOT in LA
  142: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "BDSP", "Pokémon GO", "Let's Go"],

  // Gen 2
  // Typhlosion — match Meganium (154) & Feraligatr (160)
  157: ["Scarlet/Violet", "Legends Z-A", "BDSP", "Pokémon GO"],
  // Slowking — match Politoed (186), Gen 2 evo, in SwSh & BDSP
  199: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "BDSP", "Pokémon GO"],

  // Gen 3
  // Sableye — in SwSh (Crown Tundra) & BDSP (Underground)
  302: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "BDSP", "Pokémon GO"],

  // Gen 4
  // Torterra — match Empoleon (395)
  389: ["Scarlet/Violet", "Legends Z-A", "BDSP", "Legends: Arceus", "Pokémon GO"],
  // Infernape — match Empoleon (395)
  392: ["Scarlet/Violet", "Legends Z-A", "BDSP", "Legends: Arceus", "Pokémon GO"],
  // Weavile — in SwSh (Crown Tundra), BDSP, LA
  461: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "BDSP", "Legends: Arceus", "Pokémon GO"],

  // Gen 5
  // Conkeldurr — in SwSh (Galar dex)
  534: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Garbodor — in SwSh (Galar dex, has Gigantamax)
  569: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Vanilluxe — in SwSh (Galar dex)
  584: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Stunfisk (Unova) — NOT in SwSh (only Galarian), in SV (Paldea dex)
  618: ["Scarlet/Violet", "Legends Z-A", "Pokémon GO"],
  // Volcarona — in SV (Teal Mask DLC), NOT in SwSh
  637: ["Scarlet/Violet", "Legends Z-A", "Pokémon GO"],

  // Gen 6
  // Vivillon — match Kalos starters pattern
  666: ["Scarlet/Violet", "Legends Z-A", "Pokémon GO"],
  // Tyrantrum — in SwSh (Crown Tundra)
  697: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Aurorus — in SwSh (Crown Tundra)
  699: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Klefki — in SwSh (Galar dex)
  707: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Gourgeist — in SwSh (Galar dex)
  711: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],

  // Gen 7
  // Primarina — match Incineroar (727), in SwSh
  730: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Toucannon — NOT in SwSh, match Crabominable (740)
  733: ["Scarlet/Violet", "Legends Z-A", "Pokémon GO"],
  // Araquanid — in SwSh (Galar dex)
  752: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],

  // Gen 8
  // Sandaconda — in SwSh (Galar dex)
  844: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Polteageist — in SwSh (Galar dex)
  855: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Mr. Rime — in SwSh (Galar dex)
  866: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Alcremie — in SwSh (Galar dex, has Gigantamax)
  869: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Morpeko — in SwSh (Galar dex)
  877: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],

  // Gen 9
  // Quaquaval — match Meowscarada (908)
  914: ["Scarlet/Violet", "Legends Z-A", "Pokémon GO"],
  // Ceruledge — match Armarouge (936)
  937: ["Scarlet/Violet", "Legends Z-A", "Pokémon GO"],
  // Orthworm — match Pawmot (923)
  968: ["Scarlet/Violet", "Legends Z-A", "Pokémon GO"],

  // Regional forms
  // Hisuian Arcanine — match Hisuian Samurott (10336)
  5059: ["Scarlet/Violet", "Legends Z-A", "Legends: Arceus", "Pokémon GO"],
  // Hisuian Typhlosion — match Hisuian Samurott (10336)
  5157: ["Scarlet/Violet", "Legends Z-A", "Legends: Arceus", "Pokémon GO"],
  // Galarian Slowbro — in SwSh (Isle of Armor)
  6080: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Galarian Slowking — in SwSh (Crown Tundra)
  6199: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
  // Galarian Stunfisk — in SwSh (Galar dex)
  6618: ["Scarlet/Violet", "Legends Z-A", "Sword/Shield", "Pokémon GO"],
};

let fixed = 0;
for (const [idStr, newSource] of Object.entries(FIXES)) {
  const id = Number(idStr);
  // Find the homeSource array for this pokemon ID
  // Pattern: "id": <id>, ... "homeSource": [ ... ]
  const pattern = new RegExp(
    `("id": ${id},[\\s\\S]*?"homeSource": \\[)[^\\]]*?(\\])`,
  );
  const match = src.match(pattern);
  if (!match) {
    console.log(`WARNING: Could not find homeSource for id ${id}`);
    continue;
  }

  const newArr = "\n      " + newSource.map(s => `"${s}"`).join(",\n      ") + "\n    ";
  const oldFull = match[0];
  const newFull = match[1] + newArr + match[2];
  src = src.replace(oldFull, newFull);
  fixed++;
  console.log(`✓ Fixed ${id} → ${newSource.join(", ")}`);
}

fs.writeFileSync(FILE, src);
console.log(`\nDone: fixed ${fixed}/${Object.keys(FIXES).length} entries`);

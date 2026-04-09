// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - COMPETITIVE ITEMS ENGINE
// VGC-relevant held items with battle effects
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType } from "@/lib/types";

export interface ItemEffect {
  name: string;
  description: string;
  // Damage modifiers
  damageMultiplier?: number;        // Global damage boost (e.g., Life Orb 1.3)
  typeDamageBoost?: { type: PokemonType; multiplier: number }; // Type-specific boost
  categoryBoost?: { category: "physical" | "special"; multiplier: number };
  // Stat modifiers
  statBoost?: Partial<Record<"attack" | "defense" | "spAtk" | "spDef" | "speed", number>>;
  speedMultiplier?: number;
  // Defensive
  surviveAt1HP?: boolean;           // Focus Sash
  berryHealThreshold?: number;      // HP% threshold to activate
  berryHealAmount?: number;         // HP% restored
  statusImmunity?: string[];        // Lum Berry etc.
  // Mega Stone
  isMegaStone?: boolean;
  forPokemon?: string;
  // Other
  recoilPercent?: number;           // Life Orb recoil (10%)
  choiceLock?: boolean;             // Choice items
  resistBerry?: PokemonType;        // Halves damage from a type once
  priority?: string;                // Item priority effects
}

export const ITEMS: Record<string, ItemEffect> = {
  // ── Offensive Items ──────────────────────────────────────────────────────
  "Life Orb": {
    name: "Life Orb",
    description: "Boosts damage by 30% but costs 10% max HP per attacking move.",
    damageMultiplier: 1.3,
    recoilPercent: 10,
  },
  "Choice Band": {
    name: "Choice Band",
    description: "Boosts Attack by 50% but locks into one move.",
    categoryBoost: { category: "physical", multiplier: 1.5 },
    choiceLock: true,
  },
  "Choice Specs": {
    name: "Choice Specs",
    description: "Boosts Special Attack by 50% but locks into one move.",
    categoryBoost: { category: "special", multiplier: 1.5 },
    choiceLock: true,
  },
  "Choice Scarf": {
    name: "Choice Scarf",
    description: "Boosts Speed by 50% but locks into one move.",
    speedMultiplier: 1.5,
    choiceLock: true,
  },
  "Mystic Water": {
    name: "Mystic Water",
    description: "Boosts Water-type moves by 20%.",
    typeDamageBoost: { type: "water", multiplier: 1.2 },
  },
  "Charcoal": {
    name: "Charcoal",
    description: "Boosts Fire-type moves by 20%.",
    typeDamageBoost: { type: "fire", multiplier: 1.2 },
  },
  "Miracle Seed": {
    name: "Miracle Seed",
    description: "Boosts Grass-type moves by 20%.",
    typeDamageBoost: { type: "grass", multiplier: 1.2 },
  },
  "Magnet": {
    name: "Magnet",
    description: "Boosts Electric-type moves by 20%.",
    typeDamageBoost: { type: "electric", multiplier: 1.2 },
  },
  "Never-Melt Ice": {
    name: "Never-Melt Ice",
    description: "Boosts Ice-type moves by 20%.",
    typeDamageBoost: { type: "ice", multiplier: 1.2 },
  },
  "Black Belt": {
    name: "Black Belt",
    description: "Boosts Fighting-type moves by 20%.",
    typeDamageBoost: { type: "fighting", multiplier: 1.2 },
  },
  "Poison Barb": {
    name: "Poison Barb",
    description: "Boosts Poison-type moves by 20%.",
    typeDamageBoost: { type: "poison", multiplier: 1.2 },
  },
  "Soft Sand": {
    name: "Soft Sand",
    description: "Boosts Ground-type moves by 20%.",
    typeDamageBoost: { type: "ground", multiplier: 1.2 },
  },
  "Sharp Beak": {
    name: "Sharp Beak",
    description: "Boosts Flying-type moves by 20%.",
    typeDamageBoost: { type: "flying", multiplier: 1.2 },
  },
  "Twisted Spoon": {
    name: "Twisted Spoon",
    description: "Boosts Psychic-type moves by 20%.",
    typeDamageBoost: { type: "psychic", multiplier: 1.2 },
  },
  "Silver Powder": {
    name: "Silver Powder",
    description: "Boosts Bug-type moves by 20%.",
    typeDamageBoost: { type: "bug", multiplier: 1.2 },
  },
  "Hard Stone": {
    name: "Hard Stone",
    description: "Boosts Rock-type moves by 20%.",
    typeDamageBoost: { type: "rock", multiplier: 1.2 },
  },
  "Spell Tag": {
    name: "Spell Tag",
    description: "Boosts Ghost-type moves by 20%.",
    typeDamageBoost: { type: "ghost", multiplier: 1.2 },
  },
  "Dragon Fang": {
    name: "Dragon Fang",
    description: "Boosts Dragon-type moves by 20%.",
    typeDamageBoost: { type: "dragon", multiplier: 1.2 },
  },
  "Black Glasses": {
    name: "Black Glasses",
    description: "Boosts Dark-type moves by 20%.",
    typeDamageBoost: { type: "dark", multiplier: 1.2 },
  },
  "Metal Coat": {
    name: "Metal Coat",
    description: "Boosts Steel-type moves by 20%.",
    typeDamageBoost: { type: "steel", multiplier: 1.2 },
  },
  "Expert Belt": {
    name: "Expert Belt",
    description: "Boosts super-effective moves by 20%.",
    damageMultiplier: 1.2, // applied only when SE
  },

  // ── Defensive Items ──────────────────────────────────────────────────────
  "Focus Sash": {
    name: "Focus Sash",
    description: "Survives any single hit at 1 HP when at full HP. Single use.",
    surviveAt1HP: true,
  },
  "Assault Vest": {
    name: "Assault Vest",
    description: "Boosts Special Defense by 50% but prevents status moves.",
    statBoost: { spDef: 1.5 },
  },
  "Eviolite": {
    name: "Eviolite",
    description: "Boosts Defense and Sp.Def by 50% for unevolved Pokémon.",
    statBoost: { defense: 1.5, spDef: 1.5 },
  },
  "Leftovers": {
    name: "Leftovers",
    description: "Restores 1/16 max HP each turn.",
  },
  "Sitrus Berry": {
    name: "Sitrus Berry",
    description: "Restores 25% max HP when HP falls below 50%.",
    berryHealThreshold: 50,
    berryHealAmount: 25,
  },
  "Lum Berry": {
    name: "Lum Berry",
    description: "Cures any status condition once.",
    statusImmunity: ["burn", "freeze", "paralysis", "poison", "sleep", "confusion"],
  },

  // ── Resist Berries ───────────────────────────────────────────────────────
  "Occa Berry":   { name: "Occa Berry",   description: "Halves super-effective Fire damage once.", resistBerry: "fire" },
  "Passho Berry": { name: "Passho Berry", description: "Halves super-effective Water damage once.", resistBerry: "water" },
  "Wacan Berry":  { name: "Wacan Berry",  description: "Halves super-effective Electric damage once.", resistBerry: "electric" },
  "Rindo Berry":  { name: "Rindo Berry",  description: "Halves super-effective Grass damage once.", resistBerry: "grass" },
  "Yache Berry":  { name: "Yache Berry",  description: "Halves super-effective Ice damage once.", resistBerry: "ice" },
  "Chople Berry": { name: "Chople Berry", description: "Halves super-effective Fighting damage once.", resistBerry: "fighting" },
  "Shuca Berry":  { name: "Shuca Berry",  description: "Halves super-effective Ground damage once.", resistBerry: "ground" },
  "Coba Berry":   { name: "Coba Berry",   description: "Halves super-effective Flying damage once.", resistBerry: "flying" },
  "Kasib Berry":  { name: "Kasib Berry",  description: "Halves super-effective Ghost damage once.", resistBerry: "ghost" },
  "Haban Berry":  { name: "Haban Berry",  description: "Halves super-effective Dragon damage once.", resistBerry: "dragon" },
  "Roseli Berry": { name: "Roseli Berry",  description: "Halves super-effective Fairy damage once.", resistBerry: "fairy" },

  // ── Utility Items ────────────────────────────────────────────────────────
  "Safety Goggles": {
    name: "Safety Goggles",
    description: "Protects from weather damage and powder moves.",
  },
  "Covert Cloak": {
    name: "Covert Cloak",
    description: "Protects from secondary effects of moves.",
  },
  "Clear Amulet": {
    name: "Clear Amulet",
    description: "Prevents stat reduction from other Pokémon's moves or abilities.",
  },
  "Wide Lens": {
    name: "Wide Lens",
    description: "Boosts move accuracy by 10%.",
  },
  "Scope Lens": {
    name: "Scope Lens",
    description: "Boosts critical hit ratio by one stage.",
  },
  "Rocky Helmet": {
    name: "Rocky Helmet",
    description: "Damages attacker for 1/6 max HP on contact.",
  },
  "Light Clay": {
    name: "Light Clay",
    description: "Extends Light Screen and Reflect from 5 to 8 turns.",
  },
  "Damp Rock": {
    name: "Damp Rock",
    description: "Extends rain from 5 to 8 turns.",
  },
  "Heat Rock": {
    name: "Heat Rock",
    description: "Extends sun from 5 to 8 turns.",
  },
  "Smooth Rock": {
    name: "Smooth Rock",
    description: "Extends sandstorm from 5 to 8 turns.",
  },
  "Icy Rock": {
    name: "Icy Rock",
    description: "Extends snow from 5 to 8 turns.",
  },
  "Terrain Extender": {
    name: "Terrain Extender",
    description: "Extends terrain from 5 to 8 turns.",
  },
  "Loaded Dice": {
    name: "Loaded Dice",
    description: "Multi-hit moves always hit 4-5 times.",
  },
  "Throat Spray": {
    name: "Throat Spray",
    description: "Raises Sp.Atk by one stage after using a sound move.",
  },
  "White Herb": {
    name: "White Herb",
    description: "Restores lowered stats once.",
  },
  "Mental Herb": {
    name: "Mental Herb",
    description: "Cures infatuation, Taunt, Encore, Torment, Disable, and Heal Block once.",
  },
  "Weakness Policy": {
    name: "Weakness Policy",
    description: "Raises Attack and Sp.Atk by 2 stages when hit by a super-effective move.",
    statBoost: { attack: 2, spAtk: 2 },
  },
  "Booster Energy": {
    name: "Booster Energy",
    description: "Activates Protosynthesis or Quark Drive ability effect.",
  },
  "Adrenaline Orb": {
    name: "Adrenaline Orb",
    description: "Raises Speed by one stage when Intimidated.",
  },

  // ── Seeds ────────────────────────────────────────────────────────────────
  "Electric Seed": {
    name: "Electric Seed",
    description: "Boosts Defense by one stage on Electric Terrain. Single use.",
    statBoost: { defense: 1 },
  },
  "Grassy Seed": {
    name: "Grassy Seed",
    description: "Boosts Defense by one stage on Grassy Terrain. Single use.",
    statBoost: { defense: 1 },
  },
  "Misty Seed": {
    name: "Misty Seed",
    description: "Boosts Sp.Def by one stage on Misty Terrain. Single use.",
    statBoost: { spDef: 1 },
  },
  "Psychic Seed": {
    name: "Psychic Seed",
    description: "Boosts Sp.Def by one stage on Psychic Terrain. Single use.",
    statBoost: { spDef: 1 },
  },

  // ── Gems ─────────────────────────────────────────────────────────────────
  "Normal Gem": {
    name: "Normal Gem",
    description: "Boosts the first Normal-type move by 30%. Single use.",
    typeDamageBoost: { type: "normal", multiplier: 1.3 },
  },

  // ── Additional Utility Items ─────────────────────────────────────────────
  "Power Herb": {
    name: "Power Herb",
    description: "Allows immediate use of charge moves (Meteor Beam, Solar Beam, etc.). Single use.",
  },
  "Ability Shield": {
    name: "Ability Shield",
    description: "Prevents the holder's ability from being changed or suppressed.",
  },
  "Silk Scarf": {
    name: "Silk Scarf",
    description: "Boosts Normal-type moves by 20%.",
    typeDamageBoost: { type: "normal", multiplier: 1.2 },
  },
  "Black Sludge": {
    name: "Black Sludge",
    description: "Restores 1/16 HP per turn for Poison types; damages non-Poison types.",
  },
  "Flame Orb": {
    name: "Flame Orb",
    description: "Burns the holder at end of turn. Activates Guts, Flare Boost, etc.",
  },
  "Toxic Orb": {
    name: "Toxic Orb",
    description: "Badly poisons the holder at end of turn. Activates Poison Heal, etc.",
  },
  "Light Ball": {
    name: "Light Ball",
    description: "Doubles Pikachu's Attack and Sp.Atk.",
    statBoost: { attack: 2, spAtk: 2 },
  },
  "Aguav Berry": {
    name: "Aguav Berry",
    description: "Restores 33% max HP when HP falls below 25%.",
    berryHealThreshold: 25,
    berryHealAmount: 33,
  },
  "Fairy Feather": {
    name: "Fairy Feather",
    description: "Boosts Fairy-type moves by 20%.",
    typeDamageBoost: { type: "fairy", multiplier: 1.2 },
  },
  "Eject Pack": {
    name: "Eject Pack",
    description: "Forces the holder to switch out when any of its stats are lowered. Single use.",
  },
  "Eject Button": {
    name: "Eject Button",
    description: "Forces the holder to switch out when hit by an attack. Single use.",
  },
  "Room Service": {
    name: "Room Service",
    description: "Lowers Speed by one stage when Trick Room is set. Single use.",
    statBoost: { speed: -1 },
  },
  "Lagging Tail": {
    name: "Lagging Tail",
    description: "Forces the holder to move last in its priority bracket.",
  },
  "Iron Ball": {
    name: "Iron Ball",
    description: "Halves Speed and grounds Flying-type holders. Removes Ground immunity.",
    speedMultiplier: 0.5,
  },

  // ── Items added for Champions launch ─────────────────────────────────────
  "BrightPowder": {
    name: "BrightPowder",
    description: "Lowers opponents' accuracy by casting a tricky glare.",
  },
  "Focus Band": {
    name: "Focus Band",
    description: "May let the holder endure a knockout hit at 1 HP (10% chance).",
  },
  "King's Rock": {
    name: "King's Rock",
    description: "May cause the target to flinch when the holder lands a hit.",
  },
  "Quick Claw": {
    name: "Quick Claw",
    description: "Occasionally lets the holder move first in its priority bracket.",
  },
  "Shell Bell": {
    name: "Shell Bell",
    description: "Restores 1/8 of the damage dealt to the opponent as HP.",
  },
  "Aspear Berry": {
    name: "Aspear Berry",
    description: "Cures the holder's freeze status once.",
    statusImmunity: ["freeze"],
  },
  "Babiri Berry": {
    name: "Babiri Berry",
    description: "Halves super-effective Steel damage once.",
    resistBerry: "steel",
  },
  "Charti Berry": {
    name: "Charti Berry",
    description: "Halves super-effective Rock damage once.",
    resistBerry: "rock",
  },
  "Cheri Berry": {
    name: "Cheri Berry",
    description: "Cures the holder's paralysis once.",
    statusImmunity: ["paralysis"],
  },
  "Chesto Berry": {
    name: "Chesto Berry",
    description: "Cures the holder's sleep once.",
    statusImmunity: ["sleep"],
  },
  "Chilan Berry": {
    name: "Chilan Berry",
    description: "Halves Normal-type damage once.",
    resistBerry: "normal",
  },
  "Colbur Berry": {
    name: "Colbur Berry",
    description: "Halves super-effective Dark damage once.",
    resistBerry: "dark",
  },
  "Kebia Berry": {
    name: "Kebia Berry",
    description: "Halves super-effective Poison damage once.",
    resistBerry: "poison",
  },
  "Leppa Berry": {
    name: "Leppa Berry",
    description: "Restores 10 PP to a depleted move once.",
  },
  "Oran Berry": {
    name: "Oran Berry",
    description: "Restores 10 HP when HP is low.",
    berryHealThreshold: 50,
    berryHealAmount: 5,
  },
  "Payapa Berry": {
    name: "Payapa Berry",
    description: "Halves super-effective Psychic damage once.",
    resistBerry: "psychic",
  },
  "Pecha Berry": {
    name: "Pecha Berry",
    description: "Cures the holder's poison once.",
    statusImmunity: ["poison"],
  },
  "Persim Berry": {
    name: "Persim Berry",
    description: "Cures the holder's confusion once.",
    statusImmunity: ["confusion"],
  },
  "Rawst Berry": {
    name: "Rawst Berry",
    description: "Cures the holder's burn once.",
    statusImmunity: ["burn"],
  },
  "Tanga Berry": {
    name: "Tanga Berry",
    description: "Halves super-effective Bug damage once.",
    resistBerry: "bug",
  },
  "Passho Berry": {
    name: "Passho Berry",
    description: "Halves super-effective Water damage once.",
    resistBerry: "water",
  },

  // ── Mega Stones ──────────────────────────────────────────────────────────
  "Venusaurite": { name: "Venusaurite", description: "Mega Evolves Venusaur.", isMegaStone: true, forPokemon: "Venusaur" },
  "Charizardite X": { name: "Charizardite X", description: "Mega Evolves Charizard into Mega Charizard X.", isMegaStone: true, forPokemon: "Charizard" },
  "Charizardite Y": { name: "Charizardite Y", description: "Mega Evolves Charizard into Mega Charizard Y.", isMegaStone: true, forPokemon: "Charizard" },
  "Blastoisinite": { name: "Blastoisinite", description: "Mega Evolves Blastoise.", isMegaStone: true, forPokemon: "Blastoise" },
  "Beedrillite": { name: "Beedrillite", description: "Mega Evolves Beedrill.", isMegaStone: true, forPokemon: "Beedrill" },
  "Pidgeotite": { name: "Pidgeotite", description: "Mega Evolves Pidgeot.", isMegaStone: true, forPokemon: "Pidgeot" },
  "Clefablite": { name: "Clefablite", description: "Mega Evolves Clefable.", isMegaStone: true, forPokemon: "Clefable" },
  "Alakazite": { name: "Alakazite", description: "Mega Evolves Alakazam.", isMegaStone: true, forPokemon: "Alakazam" },
  "Victreebelite": { name: "Victreebelite", description: "Mega Evolves Victreebel.", isMegaStone: true, forPokemon: "Victreebel" },
  "Slowbronite": { name: "Slowbronite", description: "Mega Evolves Slowbro.", isMegaStone: true, forPokemon: "Slowbro" },
  "Gengarite": { name: "Gengarite", description: "Mega Evolves Gengar.", isMegaStone: true, forPokemon: "Gengar" },
  "Kangaskhanite": { name: "Kangaskhanite", description: "Mega Evolves Kangaskhan.", isMegaStone: true, forPokemon: "Kangaskhan" },
  "Starmieite": { name: "Starmieite", description: "Mega Evolves Starmie.", isMegaStone: true, forPokemon: "Starmie" },
  "Pinsirite": { name: "Pinsirite", description: "Mega Evolves Pinsir.", isMegaStone: true, forPokemon: "Pinsir" },
  "Gyaradosite": { name: "Gyaradosite", description: "Mega Evolves Gyarados.", isMegaStone: true, forPokemon: "Gyarados" },
  "Aerodactylite": { name: "Aerodactylite", description: "Mega Evolves Aerodactyl.", isMegaStone: true, forPokemon: "Aerodactyl" },
  "Dragonitite": { name: "Dragonitite", description: "Mega Evolves Dragonite.", isMegaStone: true, forPokemon: "Dragonite" },
  "Meganiumite": { name: "Meganiumite", description: "Mega Evolves Meganium.", isMegaStone: true, forPokemon: "Meganium" },
  "Feraligatrite": { name: "Feraligatrite", description: "Mega Evolves Feraligatr.", isMegaStone: true, forPokemon: "Feraligatr" },
  "Ampharosite": { name: "Ampharosite", description: "Mega Evolves Ampharos.", isMegaStone: true, forPokemon: "Ampharos" },
  "Steelixite": { name: "Steelixite", description: "Mega Evolves Steelix.", isMegaStone: true, forPokemon: "Steelix" },
  "Scizorite": { name: "Scizorite", description: "Mega Evolves Scizor.", isMegaStone: true, forPokemon: "Scizor" },
  "Heracronite": { name: "Heracronite", description: "Mega Evolves Heracross.", isMegaStone: true, forPokemon: "Heracross" },
  "Skarmoryite": { name: "Skarmoryite", description: "Mega Evolves Skarmory.", isMegaStone: true, forPokemon: "Skarmory" },
  "Houndoominite": { name: "Houndoominite", description: "Mega Evolves Houndoom.", isMegaStone: true, forPokemon: "Houndoom" },
  "Tyranitarite": { name: "Tyranitarite", description: "Mega Evolves Tyranitar.", isMegaStone: true, forPokemon: "Tyranitar" },
  "Gardevoirite": { name: "Gardevoirite", description: "Mega Evolves Gardevoir.", isMegaStone: true, forPokemon: "Gardevoir" },
  "Sablenite": { name: "Sablenite", description: "Mega Evolves Sableye.", isMegaStone: true, forPokemon: "Sableye" },
  "Aggronite": { name: "Aggronite", description: "Mega Evolves Aggron.", isMegaStone: true, forPokemon: "Aggron" },
  "Medichamite": { name: "Medichamite", description: "Mega Evolves Medicham.", isMegaStone: true, forPokemon: "Medicham" },
  "Manectite": { name: "Manectite", description: "Mega Evolves Manectric.", isMegaStone: true, forPokemon: "Manectric" },
  "Sharpedonite": { name: "Sharpedonite", description: "Mega Evolves Sharpedo.", isMegaStone: true, forPokemon: "Sharpedo" },
  "Cameruptite": { name: "Cameruptite", description: "Mega Evolves Camerupt.", isMegaStone: true, forPokemon: "Camerupt" },
  "Altarianite": { name: "Altarianite", description: "Mega Evolves Altaria.", isMegaStone: true, forPokemon: "Altaria" },
  "Banettite": { name: "Banettite", description: "Mega Evolves Banette.", isMegaStone: true, forPokemon: "Banette" },
  "Chimechite": { name: "Chimechite", description: "Mega Evolves Chimecho.", isMegaStone: true, forPokemon: "Chimecho" },
  "Absolite": { name: "Absolite", description: "Mega Evolves Absol.", isMegaStone: true, forPokemon: "Absol" },
  "Absolite Z": { name: "Absolite Z", description: "Mega Evolves Absol into Mega Absol Z.", isMegaStone: true, forPokemon: "Absol" },
  "Glalitite": { name: "Glalitite", description: "Mega Evolves Glalie.", isMegaStone: true, forPokemon: "Glalie" },
  "Metagrossite": { name: "Metagrossite", description: "Mega Evolves Metagross.", isMegaStone: true, forPokemon: "Metagross" },
  "Lopunnite": { name: "Lopunnite", description: "Mega Evolves Lopunny.", isMegaStone: true, forPokemon: "Lopunny" },
  "Garchompite": { name: "Garchompite", description: "Mega Evolves Garchomp.", isMegaStone: true, forPokemon: "Garchomp" },
  "Garchompite Z": { name: "Garchompite Z", description: "Mega Evolves Garchomp into Mega Garchomp Z.", isMegaStone: true, forPokemon: "Garchomp" },
  "Lucarionite": { name: "Lucarionite", description: "Mega Evolves Lucario.", isMegaStone: true, forPokemon: "Lucario" },
  "Lucarionite Z": { name: "Lucarionite Z", description: "Mega Evolves Lucario into Mega Lucario Z.", isMegaStone: true, forPokemon: "Lucario" },
  "Abomasite": { name: "Abomasite", description: "Mega Evolves Abomasnow.", isMegaStone: true, forPokemon: "Abomasnow" },
  "Galladite": { name: "Galladite", description: "Mega Evolves Gallade.", isMegaStone: true, forPokemon: "Gallade" },
  "Froslassite": { name: "Froslassite", description: "Mega Evolves Froslass.", isMegaStone: true, forPokemon: "Froslass" },
  "Emboarite": { name: "Emboarite", description: "Mega Evolves Emboar.", isMegaStone: true, forPokemon: "Emboar" },
  "Excadrite": { name: "Excadrite", description: "Mega Evolves Excadrill.", isMegaStone: true, forPokemon: "Excadrill" },
  "Audinite": { name: "Audinite", description: "Mega Evolves Audino.", isMegaStone: true, forPokemon: "Audino" },
  "Chandelurite": { name: "Chandelurite", description: "Mega Evolves Chandelure.", isMegaStone: true, forPokemon: "Chandelure" },
  "Chesnaughtite": { name: "Chesnaughtite", description: "Mega Evolves Chesnaught.", isMegaStone: true, forPokemon: "Chesnaught" },
  "Delphoxite": { name: "Delphoxite", description: "Mega Evolves Delphox.", isMegaStone: true, forPokemon: "Delphox" },
  "Greninjite": { name: "Greninjite", description: "Mega Evolves Greninja.", isMegaStone: true, forPokemon: "Greninja" },
  "Floettite": { name: "Floettite", description: "Mega Evolves Floette.", isMegaStone: true, forPokemon: "Floette" },
  "Meowsticite": { name: "Meowsticite", description: "Mega Evolves Meowstic.", isMegaStone: true, forPokemon: "Meowstic" },
  "Hawluchite": { name: "Hawluchite", description: "Mega Evolves Hawlucha.", isMegaStone: true, forPokemon: "Hawlucha" },
  "Crabominite": { name: "Crabominite", description: "Mega Evolves Crabominable.", isMegaStone: true, forPokemon: "Crabominable" },
  "Drampite": { name: "Drampite", description: "Mega Evolves Drampa.", isMegaStone: true, forPokemon: "Drampa" },
  "Scovillainite": { name: "Scovillainite", description: "Mega Evolves Scovillain.", isMegaStone: true, forPokemon: "Scovillain" },
  "Glimmorite": { name: "Glimmorite", description: "Mega Evolves Glimmora.", isMegaStone: true, forPokemon: "Glimmora" },
  "Tatsugirite": { name: "Tatsugirite", description: "Mega Evolves Tatsugiri.", isMegaStone: true, forPokemon: "Tatsugiri" },
  "Raichunite X": { name: "Raichunite X", description: "Mega Evolves Raichu into Mega Raichu X.", isMegaStone: true, forPokemon: "Raichu" },
  "Raichunite Y": { name: "Raichunite Y", description: "Mega Evolves Raichu into Mega Raichu Y.", isMegaStone: true, forPokemon: "Raichu" },
  "Kommonium Z": { name: "Kommonium Z", description: "Allows Kommo-o to use Clangorous Soulblaze.", isMegaStone: true, forPokemon: "Kommo-o" },
  "Golurkite": { name: "Golurkite", description: "Mega Evolves Golurk.", isMegaStone: true, forPokemon: "Golurk" },
};

// ── Champions-available items (Serebii confirmed) ─────────────────────────────
// Only these items appear in UI dropdowns. All mega stones are added dynamically.
const CHAMPIONS_ITEMS = new Set([
  // Hold Items
  "Black Belt", "Black Glasses", "BrightPowder", "Charcoal", "Choice Scarf",
  "Dragon Fang", "Fairy Feather", "Focus Band", "Focus Sash", "Hard Stone",
  "King's Rock", "Leftovers", "Light Ball", "Magnet", "Mental Herb",
  "Metal Coat", "Miracle Seed", "Mystic Water", "Never-Melt Ice", "Poison Barb",
  "Quick Claw", "Scope Lens", "Sharp Beak", "Shell Bell", "Silk Scarf",
  "Silver Powder", "Soft Sand", "Spell Tag", "Twisted Spoon", "White Herb",
  // Berries
  "Aspear Berry", "Babiri Berry", "Charti Berry", "Cheri Berry", "Chesto Berry",
  "Chilan Berry", "Chople Berry", "Coba Berry", "Colbur Berry", "Haban Berry",
  "Kasib Berry", "Kebia Berry", "Leppa Berry", "Lum Berry", "Occa Berry",
  "Oran Berry", "Passho Berry", "Payapa Berry", "Pecha Berry", "Persim Berry",
  "Rawst Berry", "Rindo Berry", "Roseli Berry", "Shuca Berry", "Sitrus Berry",
  "Tanga Berry", "Wacan Berry", "Yache Berry",
]);

/** Get item damage multiplier for a move */
export function getItemDamageMultiplier(
  itemName: string,
  moveType: PokemonType,
  moveCat: "physical" | "special" | "status",
  isSuperEffective: boolean
): number {
  const item = ITEMS[itemName];
  if (!item) return 1;

  let mult = 1;

  if (item.damageMultiplier) {
    if (itemName === "Expert Belt") {
      if (isSuperEffective) mult *= item.damageMultiplier;
    } else {
      mult *= item.damageMultiplier;
    }
  }

  if (item.typeDamageBoost && item.typeDamageBoost.type === moveType) {
    mult *= item.typeDamageBoost.multiplier;
  }

  if (item.categoryBoost && item.categoryBoost.category === moveCat) {
    mult *= item.categoryBoost.multiplier;
  }

  return mult;
}

/** Get speed multiplier from item */
export function getItemSpeedMultiplier(itemName: string): number {
  return ITEMS[itemName]?.speedMultiplier ?? 1;
}

/** All available item names (Champions-confirmed + mega stones) */
export function getAllItems(): string[] {
  return Object.keys(ITEMS).filter(name =>
    CHAMPIONS_ITEMS.has(name) || ITEMS[name].isMegaStone
  );
}

/** Check if an item is available in Champions */
export function isItemAvailable(itemName: string): boolean {
  return CHAMPIONS_ITEMS.has(itemName) || !!ITEMS[itemName]?.isMegaStone;
}

/** Suggest best items for a given role */
export function suggestItems(role: "physical-attacker" | "special-attacker" | "support" | "tank" | "sweeper"): string[] {
  switch (role) {
    case "physical-attacker":
      return ["Choice Scarf", "Focus Sash", "Sitrus Berry", "Lum Berry"];
    case "special-attacker":
      return ["Choice Scarf", "Focus Sash", "Sitrus Berry", "Charcoal"];
    case "support":
      return ["Sitrus Berry", "Mental Herb", "Focus Sash", "Lum Berry"];
    case "tank":
      return ["Sitrus Berry", "Leftovers", "Lum Berry", "Focus Sash"];
    case "sweeper":
      return ["Focus Sash", "Choice Scarf", "White Herb", "Sitrus Berry"];
  }
}

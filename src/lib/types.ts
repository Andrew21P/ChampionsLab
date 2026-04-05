// ========== Core Pokémon Types ==========

export type PokemonType =
  | "normal" | "fire" | "water" | "electric" | "grass" | "ice"
  | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug"
  | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface StatPoints {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface Move {
  name: string;
  type: PokemonType;
  category: "physical" | "special" | "status";
  power: number | null;
  accuracy: number | null;
  pp: number;
  description: string;
}

export interface Ability {
  name: string;
  description: string;
  isHidden?: boolean;
  isChampions?: boolean; // Champions-exclusive ability
}

export interface PokemonForm {
  name: string;
  sprite: string;
  types: PokemonType[];
  baseStats: BaseStats;
  abilities: Ability[];
  isMega?: boolean;
}

export interface ChampionsPokemon {
  id: number;
  name: string;
  dexNumber: number;
  types: PokemonType[];
  baseStats: BaseStats;
  abilities: Ability[];
  moves: Move[];
  sprite: string;
  officialArt: string;
  generation: number;
  forms?: PokemonForm[];
  hasMega?: boolean;
  recruitmentCost?: number | null; // VP cost
  homeCompatible?: boolean;
  homeSource?: string[];
  season: number; // Season when first available
  tier?: "S" | "A" | "B" | "C" | "D";
  usageRate?: number | null; // Meta usage percentage
}

export interface TeamSlot {
  pokemon: ChampionsPokemon | null;
  ability?: string;
  nature?: string;
  moves: string[];
  statPoints: StatPoints;
  teraType?: PokemonType;
  item?: string;
  isMega?: boolean;
  megaFormIndex?: number;
  preMegaAbility?: string;
}

export interface CommonSet {
  name: string;
  nature: string;
  ability: string;
  item: string;
  moves: string[];
  sp: StatPoints;
  teraType?: PokemonType;
  preMegaAbility?: string;
}

export interface WinningTeamMember {
  pokemonId: number;
  name: string;
  isMega?: boolean;
  megaFormIndex?: number;
}

export interface WinningTeam {
  id: string;
  name: string;
  player: string;
  placement: string;
  event: string;
  pokemon: WinningTeamMember[];
}

export interface Team {
  id: string;
  name: string;
  slots: TeamSlot[];
  format: string;
  season: number;
  createdAt: string;
  updatedAt: string;
}

export interface Season {
  id: number;
  name: string;
  startDate: string;
  endDate?: string;
  rosterAdditions: number[];
  rules: string[];
  isActive: boolean;
}

export interface MetaSnapshot {
  season: number;
  topPokemon: { pokemonId: number; usageRate: number; winRate: number }[];
  topTeams: Team[];
  lastUpdated: string;
}

// Battle Bot types
export interface BattleResult {
  wins: number;
  losses: number;
  totalGames: number;
  winRate: number;
  commonWeaknesses: string[];
  bestLeads: [string, string][];
  strategyTips: string[];
  matchupBreakdown: { opponent: string; winRate: number }[];
}

export interface SimulationConfig {
  iterations: number;
  opponentPool: "meta" | "tournament" | "random" | "all";
  format: "doubles" | "singles";
}

// Type color mapping
export const TYPE_COLORS: Record<PokemonType, string> = {
  normal: "#a8a878",
  fire: "#f08030",
  water: "#6890f0",
  electric: "#f8d030",
  grass: "#78c850",
  ice: "#98d8d8",
  fighting: "#c03028",
  poison: "#a040a0",
  ground: "#e0c068",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  rock: "#b8a038",
  ghost: "#705898",
  dragon: "#7038f8",
  dark: "#705848",
  steel: "#b8b8d0",
  fairy: "#ee99ac",
};

export const TYPE_GRADIENTS: Record<PokemonType, string> = {
  normal: "from-[#a8a878] to-[#8a8a5c]",
  fire: "from-[#f08030] to-[#dd6610]",
  water: "from-[#6890f0] to-[#4a72d2]",
  electric: "from-[#f8d030] to-[#e0b818]",
  grass: "from-[#78c850] to-[#5aaa32]",
  ice: "from-[#98d8d8] to-[#7ababa]",
  fighting: "from-[#c03028] to-[#a01810]",
  poison: "from-[#a040a0] to-[#822882]",
  ground: "from-[#e0c068] to-[#c2a24a]",
  flying: "from-[#a890f0] to-[#8a72d2]",
  psychic: "from-[#f85888] to-[#da3a6a]",
  bug: "from-[#a8b820] to-[#8a9a02]",
  rock: "from-[#b8a038] to-[#9a821a]",
  ghost: "from-[#705898] to-[#523a7a]",
  dragon: "from-[#7038f8] to-[#521ada]",
  dark: "from-[#705848] to-[#523a2a]",
  steel: "from-[#b8b8d0] to-[#9a9ab2]",
  fairy: "from-[#ee99ac] to-[#d07b8e]",
};

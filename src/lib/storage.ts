// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - LOCAL STORAGE PERSISTENCE
// Save/load teams, simulation results, and settings - no accounts needed
// ═══════════════════════════════════════════════════════════════════════════════

import type { TeamSlot, StatPoints, PokemonType } from "@/lib/types";
import { POKEMON_SEED } from "@/lib/pokemon-data";

// ── Storage Keys ────────────────────────────────────────────────────────

const KEYS = {
  SAVED_TEAMS: "champions-lab:teams",
  SIM_RESULTS: "champions-lab:sim-results",
  SETTINGS: "champions-lab:settings",
  LAST_TEAM: "champions-lab:last-team",
} as const;

// ── Types ───────────────────────────────────────────────────────────────

export interface SavedTeamSlot {
  pokemonId: number;
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

export interface SavedTeam {
  id: string;
  name: string;
  slots: SavedTeamSlot[];
  createdAt: number;
  updatedAt: number;
}

export interface SavedSimResult {
  id: string;
  teamId: string;
  teamName: string;
  winRate: number;
  totalGames: number;
  wins: number;
  losses: number;
  timestamp: number;
  matchups: { opponent: string; winRate: number }[];
}

export interface UserSettings {
  defaultIterations: number;
  defaultOpponentPool: string;
  theme: "light" | "dark" | "system";
}

// ── Helpers ─────────────────────────────────────────────────────────────

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full - silently fail
  }
}

// ── Team Persistence ────────────────────────────────────────────────────

/** Convert live TeamSlot[] to serializable SavedTeamSlot[] */
export function serializeTeam(slots: TeamSlot[]): SavedTeamSlot[] {
  return slots
    .filter((s) => s.pokemon !== null)
    .map((s) => ({
      pokemonId: s.pokemon!.id,
      ability: s.ability,
      nature: s.nature,
      moves: s.moves,
      statPoints: { ...s.statPoints },
      teraType: s.teraType,
      item: s.item,
      isMega: s.isMega,
      megaFormIndex: s.megaFormIndex,
      preMegaAbility: s.preMegaAbility,
    }));
}

/** Convert saved data back to live TeamSlot[] (rehydrate Pokémon objects) */
export function deserializeTeam(saved: SavedTeamSlot[]): TeamSlot[] {
  const slots: TeamSlot[] = saved.map((s) => {
    const pokemon = POKEMON_SEED.find((p) => p.id === s.pokemonId) ?? null;
    // Auto-detect megaFormIndex from item/ability if not stored
    let megaFormIndex = s.megaFormIndex;
    if (s.isMega && megaFormIndex === undefined && pokemon) {
      const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
      if (s.ability) {
        const idx = megaForms.findIndex(f => f.abilities.some(a => a.name === s.ability));
        megaFormIndex = idx >= 0 ? idx : 0;
      } else {
        megaFormIndex = 0;
      }
    }
    return {
      pokemon,
      ability: s.ability,
      nature: s.nature,
      moves: s.moves,
      statPoints: { ...s.statPoints },
      teraType: s.teraType,
      item: s.item,
      isMega: s.isMega,
      megaFormIndex,
      preMegaAbility: s.preMegaAbility,
    };
  });
  // Pad to 6 slots
  while (slots.length < 6) {
    slots.push({
      pokemon: null,
      moves: [],
      statPoints: { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 },
    });
  }
  return slots;
}

/** Get all saved teams */
export function getSavedTeams(): SavedTeam[] {
  return readJSON<SavedTeam[]>(KEYS.SAVED_TEAMS, []);
}

/** Save a team (create or update) */
export function saveTeam(name: string, slots: TeamSlot[], existingId?: string): SavedTeam {
  const teams = getSavedTeams();
  const now = Date.now();
  const serialized = serializeTeam(slots);

  if (existingId) {
    const idx = teams.findIndex((t) => t.id === existingId);
    if (idx >= 0) {
      teams[idx] = { ...teams[idx], name, slots: serialized, updatedAt: now };
      writeJSON(KEYS.SAVED_TEAMS, teams);
      return teams[idx];
    }
  }

  const team: SavedTeam = {
    id: `team-${now}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    slots: serialized,
    createdAt: now,
    updatedAt: now,
  };
  teams.push(team);
  writeJSON(KEYS.SAVED_TEAMS, teams);
  return team;
}

/** Delete a saved team */
export function deleteTeam(id: string): void {
  const teams = getSavedTeams().filter((t) => t.id !== id);
  writeJSON(KEYS.SAVED_TEAMS, teams);
}

/** Save "last worked on" team for auto-restore */
export function saveLastTeam(name: string, slots: TeamSlot[], teamId?: string): void {
  writeJSON(KEYS.LAST_TEAM, { name, slots: serializeTeam(slots), teamId });
}

/** Get last worked on team */
export function getLastTeam(): { name: string; slots: SavedTeamSlot[]; teamId?: string } | null {
  return readJSON<{ name: string; slots: SavedTeamSlot[]; teamId?: string } | null>(KEYS.LAST_TEAM, null);
}

// ── Simulation Results ──────────────────────────────────────────────────

export function getSavedSimResults(): SavedSimResult[] {
  return readJSON<SavedSimResult[]>(KEYS.SIM_RESULTS, []);
}

export function saveSimResult(result: Omit<SavedSimResult, "id" | "timestamp">): SavedSimResult {
  const results = getSavedSimResults();
  const saved: SavedSimResult = {
    ...result,
    id: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
  };
  results.push(saved);
  // Keep last 50 results
  if (results.length > 50) results.splice(0, results.length - 50);
  writeJSON(KEYS.SIM_RESULTS, results);
  return saved;
}

export function clearSimResults(): void {
  writeJSON(KEYS.SIM_RESULTS, []);
}

// ── Settings ────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: UserSettings = {
  defaultIterations: 1000,
  defaultOpponentPool: "meta",
  theme: "system",
};

export function getSettings(): UserSettings {
  return readJSON(KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function updateSettings(partial: Partial<UserSettings>): UserSettings {
  const current = getSettings();
  const updated = { ...current, ...partial };
  writeJSON(KEYS.SETTINGS, updated);
  return updated;
}

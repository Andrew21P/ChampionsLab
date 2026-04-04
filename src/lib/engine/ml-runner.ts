// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - ML SIMULATION RUNNER
// Continuous battle simulation with ELO rankings, data collection,
// and machine learning inspired analysis - runs like a trading bot
// ═══════════════════════════════════════════════════════════════════════════════

import type { ChampionsPokemon, CommonSet } from "@/lib/types";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import { USAGE_DATA } from "@/lib/usage-data";
import { simulateBattle } from "./battle-sim";
import { analyzeTeamSynergy, scorePokemonFit } from "./synergy";
import { PREBUILT_TEAMS } from "./generated-teams";
import { generateTeams, type GeneratedTeam } from "./team-generator";
import { TOURNAMENT_TEAMS } from "./vgc-data";

// ── ELO RATING SYSTEM ───────────────────────────────────────────────────────

const DEFAULT_ELO = 1500;
const K_FACTOR = 32;

export interface ELOEntry {
  id: string;
  elo: number;
  wins: number;
  losses: number;
  totalGames: number;
  winRate: number;
  avgTurns: number;
  avgRemaining: number;
  peakElo: number;
  lastUpdated: number;
}

export interface PokemonStats {
  id: number;
  name: string;
  appearances: number;
  wins: number;
  losses: number;
  winRate: number;
  avgTeammateCount: number;
  bestPartners: { id: number; name: string; winRate: number; games: number }[];
  worstMatchups: { id: number; name: string; winRate: number; games: number }[];
  bestSets: { set: string; winRate: number; games: number }[];
  elo: number;
}

export interface MoveStats {
  name: string;
  appearances: number;
  winContributions: number;
  winRate: number;
}

export interface ArchetypeStats {
  name: string;
  elo: number;
  wins: number;
  losses: number;
  winRate: number;
  bestMatchups: { archetype: string; winRate: number; games: number }[];
  worstMatchups: { archetype: string; winRate: number; games: number }[];
}

export interface SimulationResult {
  batchId: number;
  team1Id: string;
  team2Id: string;
  winner: 1 | 2;
  turnsPlayed: number;
  team1Remaining: number;
  team2Remaining: number;
  timestamp: number;
}

export interface MLInsight {
  type: "meta" | "pokemon" | "synergy" | "counter" | "trend";
  confidence: number;
  description: string;
  data: Record<string, unknown>;
}

// ── DATA STORE ───────────────────────────────────────────────────────────────

export class SimulationDatabase {
  teamELO: Map<string, ELOEntry> = new Map();
  pokemonStats: Map<string, PokemonStats> = new Map(); // key: "id" or "id-mega"
  moveStats: Map<string, MoveStats> = new Map();
  archetypeStats: Map<string, ArchetypeStats> = new Map();
  pairWinRates: Map<string, { wins: number; games: number }> = new Map();
  matchupMatrix: Map<string, { wins: number; games: number }> = new Map();
  results: SimulationResult[] = [];
  insights: MLInsight[] = [];
  totalBattles = 0;
  startTime = 0;
  elapsedMs = 0;

  getTeamELO(teamId: string): ELOEntry {
    if (!this.teamELO.has(teamId)) {
      this.teamELO.set(teamId, {
        id: teamId, elo: DEFAULT_ELO, wins: 0, losses: 0,
        totalGames: 0, winRate: 0, avgTurns: 0, avgRemaining: 0,
        peakElo: DEFAULT_ELO, lastUpdated: Date.now(),
      });
    }
    return this.teamELO.get(teamId)!;
  }

  updateELO(winnerId: string, loserId: string, turns: number, remaining: number): void {
    const winner = this.getTeamELO(winnerId);
    const loser = this.getTeamELO(loserId);

    const expectedW = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400));
    const expectedL = 1 - expectedW;

    winner.elo = Math.round(winner.elo + K_FACTOR * (1 - expectedW));
    loser.elo = Math.round(loser.elo + K_FACTOR * (0 - expectedL));

    winner.wins++;
    winner.totalGames++;
    winner.winRate = Math.round((winner.wins / winner.totalGames) * 1000) / 10;
    winner.avgTurns = (winner.avgTurns * (winner.totalGames - 1) + turns) / winner.totalGames;
    winner.avgRemaining = (winner.avgRemaining * (winner.wins - 1) + remaining) / winner.wins;
    winner.peakElo = Math.max(winner.peakElo, winner.elo);
    winner.lastUpdated = Date.now();

    loser.losses++;
    loser.totalGames++;
    loser.winRate = Math.round((loser.wins / loser.totalGames) * 1000) / 10;
    loser.avgTurns = (loser.avgTurns * (loser.totalGames - 1) + turns) / loser.totalGames;
    loser.lastUpdated = Date.now();
  }

  recordPokemonResult(pokemonIds: number[], megaFormNames: (string | null)[], won: boolean, setKeys: string[], opponentIds: number[], opponentMegaFormNames: (string | null)[]): void {
    // Calculate average ELO of opponent team's Pokémon for real ELO formula
    let opponentAvgElo = DEFAULT_ELO;
    if (opponentIds.length > 0) {
      let totalOppElo = 0;
      let count = 0;
      for (let j = 0; j < opponentIds.length; j++) {
        const oppFn = opponentMegaFormNames[j];
        const oppKey = oppFn ? megaKey(opponentIds[j], oppFn) : `${opponentIds[j]}`;
        const oppStats = this.pokemonStats.get(oppKey);
        totalOppElo += oppStats?.elo ?? DEFAULT_ELO;
        count++;
      }
      opponentAvgElo = totalOppElo / count;
    }

    for (let i = 0; i < pokemonIds.length; i++) {
      const id = pokemonIds[i];
      const formName = megaFormNames[i];
      const key = formName ? megaKey(id, formName) : `${id}`;
      if (!this.pokemonStats.has(key)) {
        const pokemon = POKEMON_SEED.find(p => p.id === id);
        this.pokemonStats.set(key, {
          id, name: formName ?? (pokemon?.name ?? `#${id}`),
          appearances: 0, wins: 0, losses: 0, winRate: 0,
          avgTeammateCount: 0, bestPartners: [], worstMatchups: [],
          bestSets: [], elo: DEFAULT_ELO,
        });
      }
      const stats = this.pokemonStats.get(key)!;
      stats.appearances++;
      if (won) stats.wins++;
      else stats.losses++;
      stats.winRate = Math.round((stats.wins / stats.appearances) * 1000) / 10;

      // Real ELO formula: expected win based on rating difference
      const expectedW = 1 / (1 + Math.pow(10, (opponentAvgElo - stats.elo) / 400));
      stats.elo = Math.round(stats.elo + (K_FACTOR / 2) * ((won ? 1 : 0) - expectedW));
    }

    // Record pair win rates (using mega-aware keys)
    const keys = pokemonIds.map((id, i) => {
      const fn = megaFormNames[i];
      return fn ? megaKey(id, fn) : `${id}`;
    });
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const pairKey = [keys[i], keys[j]].sort().join("|");
        if (!this.pairWinRates.has(pairKey)) this.pairWinRates.set(pairKey, { wins: 0, games: 0 });
        const pair = this.pairWinRates.get(pairKey)!;
        pair.games++;
        if (won) pair.wins++;
      }
    }
  }

  recordMoveResult(moves: string[], won: boolean): void {
    for (const move of moves) {
      if (!this.moveStats.has(move)) {
        this.moveStats.set(move, { name: move, appearances: 0, winContributions: 0, winRate: 0 });
      }
      const ms = this.moveStats.get(move)!;
      ms.appearances++;
      if (won) ms.winContributions++;
      ms.winRate = Math.round((ms.winContributions / ms.appearances) * 1000) / 10;
    }
  }

  recordArchetypeResult(archetype: string, opponentArchetype: string, won: boolean): void {
    for (const arch of [archetype, opponentArchetype]) {
      if (!this.archetypeStats.has(arch)) {
        this.archetypeStats.set(arch, {
          name: arch, elo: DEFAULT_ELO, wins: 0, losses: 0, winRate: 0,
          bestMatchups: [], worstMatchups: [],
        });
      }
    }
    const stats = this.archetypeStats.get(archetype)!;
    if (won) stats.wins++;
    else stats.losses++;
    stats.winRate = Math.round((stats.wins / (stats.wins + stats.losses)) * 1000) / 10;

    const expectedW = 0.5;
    stats.elo = Math.round(stats.elo + (K_FACTOR / 2) * ((won ? 1 : 0) - expectedW));

    // Record matchup
    const matchupKey = `${archetype}:${opponentArchetype}`;
    if (!this.matchupMatrix.has(matchupKey)) this.matchupMatrix.set(matchupKey, { wins: 0, games: 0 });
    const mu = this.matchupMatrix.get(matchupKey)!;
    mu.games++;
    if (won) mu.wins++;
  }
}

// ── TEAM POOL ────────────────────────────────────────────────────────────────

interface TeamEntry {
  id: string;
  name: string;
  archetype: string;
  pokemon: ChampionsPokemon[];
  sets: CommonSet[];
  pokemonIds: number[];
  megaFormNames: (string | null)[];
}

const isMegaItem = (item: string) =>
  item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");

/** Detect which specific mega form each team member uses (null = not mega) */
function detectMegaForms(pokemon: ChampionsPokemon[], sets: CommonSet[]): (string | null)[] {
  return sets.map((s, i) => {
    const p = pokemon[i];
    if (!p || !p.hasMega || !p.forms) return null;
    if (!isMegaItem(s.item)) return null;
    const megaForms = p.forms.filter(f => f.isMega);
    if (megaForms.length <= 1) return megaForms[0]?.name ?? null;
    // Multi-form: match by item suffix (X, Y, Z)
    if (s.item.endsWith(" X")) return megaForms.find(f => f.name.endsWith(" X"))?.name ?? megaForms[0].name;
    if (s.item.endsWith(" Y")) return megaForms.find(f => f.name.endsWith(" Y"))?.name ?? megaForms[0].name;
    if (s.item.endsWith(" Z")) return megaForms.find(f => f.name.endsWith(" Z"))?.name ?? megaForms[0].name;
    return megaForms[0].name; // Base "ite" → first form
  });
}

/** Create a stable key for a mega form to track in stats */
function megaKey(id: number, formName: string): string {
  // For multi-form megas, include the suffix to keep them separate
  const suffix = formName.match(/ ([XYZ])$/)?.[1];
  return suffix ? `${id}-mega-${suffix.toLowerCase()}` : `${id}-mega`;
}

/** Build a competitive set for a Pokémon using USAGE_DATA */
function autoSet(pokemon: ChampionsPokemon, existingSets: CommonSet[]): CommonSet | null {
  const sets = USAGE_DATA[pokemon.id];
  if (!sets || sets.length === 0) return null;
  return sets[0];
}

/** Get a non-mega set for a Pokémon, avoiding mega stones if team already has one */
function getNonMegaSet(pokemonId: number, existingSets: CommonSet[]): CommonSet | null {
  const sets = USAGE_DATA[pokemonId];
  if (!sets || sets.length === 0) return null;
  const nonMega = sets.filter(s => !isMegaItem(s.item));
  if (nonMega.length > 0) return nonMega[0];
  // Fallback: swap mega stone for Life Orb
  return { ...sets[0], item: "Life Orb" };
}

/** Shuffle the top N candidates for team diversity */
function shuffleTop<T>(arr: T[], topN: number): T[] {
  const top = arr.slice(0, topN);
  for (let i = top.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [top[i], top[j]] = [top[j], top[i]];
  }
  return [...top, ...arr.slice(topN)];
}

function buildTeamPool(): TeamEntry[] {
  const pool: TeamEntry[] = [];

  // 1. Add prebuilt teams (hand-crafted with full sets)
  for (const pre of PREBUILT_TEAMS) {
    const pokemon: ChampionsPokemon[] = [];
    for (const pid of pre.pokemonIds) {
      const p = POKEMON_SEED.find(pk => pk.id === pid);
      if (p) pokemon.push(p);
    }
    if (pokemon.length >= 4 && pre.sets.length >= 4) {
      const sliced = pokemon.slice(0, pre.sets.length);
      pool.push({
        id: pre.id,
        name: pre.name,
        archetype: pre.archetype,
        pokemon: sliced,
        sets: pre.sets,
        pokemonIds: sliced.map(p => p.id),
        megaFormNames: detectMegaForms(sliced, pre.sets),
      });
    }
  }

  // 2. Add ALL tournament teams (250 real teams from 2005-2025)
  for (const tt of TOURNAMENT_TEAMS) {
    const pokemon: ChampionsPokemon[] = [];
    const sets: CommonSet[] = [];
    for (const pid of tt.pokemonIds) {
      const p = POKEMON_SEED.find(pk => pk.id === pid);
      if (!p) continue;
      const set = autoSet(p, sets);
      if (!set) continue;
      pokemon.push(p);
      sets.push(set);
    }
    if (pokemon.length >= 4 && sets.length >= 4) {
      const sliced = pokemon.slice(0, sets.length);
      pool.push({
        id: tt.id,
        name: `${tt.tournament} ${tt.year} - ${tt.player}`,
        archetype: tt.archetype,
        pokemon: sliced,
        sets,
        pokemonIds: sliced.map(p => p.id),
        megaFormNames: detectMegaForms(sliced, sets),
      });
    }
  }

  // 3. Generate additional teams (400 for diversity)
  const generated = generateTeams(400);
  for (let i = 0; i < generated.length; i++) {
    const g = generated[i];
    if (g.pokemon.length >= 4 && g.sets.length >= 4) {
      const sliced = g.pokemon.slice(0, g.sets.length);
      pool.push({
        id: `gen-${i}`,
        name: g.name,
        archetype: g.archetype,
        pokemon: sliced,
        sets: g.sets,
        pokemonIds: sliced.map(p => p.id),
        megaFormNames: detectMegaForms(sliced, g.sets),
      });
    }
  }

  // 4. Generate MEGA VARIANT teams - for every mega-capable Pokémon, 
  //    create teams per mega form (X, Y, Z variants get separate teams)
  const megaPokemon = POKEMON_SEED.filter(p => p.hasMega && p.forms?.some(f => f.isMega));
  for (const mp of megaPokemon) {
    const allMegaSets = USAGE_DATA[mp.id]?.filter(s => isMegaItem(s.item));
    if (!allMegaSets || allMegaSets.length === 0) continue;

    // Group mega sets by form (X, Y, Z, or default)
    const megaForms = mp.forms!.filter(f => f.isMega);
    for (const form of megaForms) {
      // Match sets to this form by item suffix
      let formSets = allMegaSets;
      if (megaForms.length > 1) {
        const suffix = form.name.match(/ ([XYZ])$/)?.[1];
        if (suffix) {
          formSets = allMegaSets.filter(s => s.item.endsWith(` ${suffix}`));
        } else {
          // Default form = base "ite" items (no X/Y/Z suffix)
          formSets = allMegaSets.filter(s => !s.item.match(/ [XYZ]$/));
        }
        if (formSets.length === 0) formSets = allMegaSets; // fallback
      }

      // Create 3 teams per mega form for diversity
      for (let v = 0; v < 3; v++) {
        const megaSet = formSets[v % formSets.length];
        const team: ChampionsPokemon[] = [mp];
        const teamSets: CommonSet[] = [megaSet];
        const usedIds = new Set([mp.id]);

        const candidates = POKEMON_SEED
          .filter(p => !usedIds.has(p.id) && USAGE_DATA[p.id]?.length)
          .map(p => ({ pokemon: p, fit: scorePokemonFit(p, team) }))
          .sort((a, b) => b.fit.score - a.fit.score);

        // Add some randomization for diversity beyond top synergy picks
        const shuffled = v > 0 ? shuffleTop(candidates, 15) : candidates;

        for (const c of shuffled) {
          if (team.length >= 6) break;
          const set = getNonMegaSet(c.pokemon.id, teamSets);
          if (set) {
            team.push(c.pokemon);
            teamSets.push(set);
            usedIds.add(c.pokemon.id);
          }
        }

        if (team.length >= 4) {
          const formSlug = form.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
          pool.push({
            id: `mega-${mp.id}-${formSlug}-v${v}`,
            name: `${form.name} Build v${v + 1}`,
            archetype: `Mega ${mp.name}`,
            pokemon: team,
            sets: teamSets,
            pokemonIds: team.map(p => p.id),
            megaFormNames: detectMegaForms(team, teamSets),
          });
        }
      }
    }

    // Also generate base-form only teams (non-mega sets)
    const baseSets = USAGE_DATA[mp.id]?.filter(s => !isMegaItem(s.item));
    if (baseSets && baseSets.length > 0) {
      for (let v = 0; v < 2; v++) {
        const baseSet = baseSets[v % baseSets.length];
        const team: ChampionsPokemon[] = [mp];
        const teamSets: CommonSet[] = [baseSet];
        const usedIds = new Set([mp.id]);

        const candidates = POKEMON_SEED
          .filter(p => !usedIds.has(p.id) && USAGE_DATA[p.id]?.length)
          .map(p => ({ pokemon: p, fit: scorePokemonFit(p, team) }))
          .sort((a, b) => b.fit.score - a.fit.score);

        for (const c of candidates) {
          if (team.length >= 6) break;
          const set = getNonMegaSet(c.pokemon.id, teamSets);
          if (set) {
            team.push(c.pokemon);
            teamSets.push(set);
            usedIds.add(c.pokemon.id);
          }
        }

        if (team.length >= 4) {
          pool.push({
            id: `base-${mp.id}-v${v}`,
            name: `${mp.name} (Base) Build v${v + 1}`,
            archetype: `${mp.name} Base`,
            pokemon: team,
            sets: teamSets,
            pokemonIds: team.map(p => p.id),
            megaFormNames: detectMegaForms(team, teamSets),
          });
        }
      }
    }
  }

  // 5. Generate ROSTER COVERAGE teams - build a team around every Pokémon
  //    with usage data that doesn't appear enough in the pool yet
  const pokemonAppearances = new Map<number, number>();
  for (const entry of pool) {
    for (const pid of entry.pokemonIds) {
      pokemonAppearances.set(pid, (pokemonAppearances.get(pid) ?? 0) + 1);
    }
  }
  const MIN_TEAM_APPEARANCES = 3;
  const underrepresented = POKEMON_SEED
    .filter(p => USAGE_DATA[p.id]?.length && (pokemonAppearances.get(p.id) ?? 0) < MIN_TEAM_APPEARANCES)
    .sort(() => Math.random() - 0.5);

  for (const starter of underrepresented) {
    const neededTeams = MIN_TEAM_APPEARANCES - (pokemonAppearances.get(starter.id) ?? 0);
    for (let v = 0; v < neededTeams; v++) {
      const starterSet = autoSet(starter, []);
      if (!starterSet) break;
      const team: ChampionsPokemon[] = [starter];
      const teamSets: CommonSet[] = [starterSet];
      const usedIds = new Set([starter.id]);

      const candidates = POKEMON_SEED
        .filter(p => !usedIds.has(p.id) && USAGE_DATA[p.id]?.length)
        .map(p => ({ pokemon: p, fit: scorePokemonFit(p, team) }))
        .sort((a, b) => b.fit.score - a.fit.score);

      const shuffled = v > 0 ? shuffleTop(candidates, 20) : candidates;

      for (const c of shuffled) {
        if (team.length >= 6) break;
        const set = getNonMegaSet(c.pokemon.id, teamSets);
        if (set) {
          team.push(c.pokemon);
          teamSets.push(set);
          usedIds.add(c.pokemon.id);
        }
      }

      if (team.length >= 4) {
        pool.push({
          id: `roster-${starter.id}-v${v}`,
          name: `${starter.name} Build v${v + 1}`,
          archetype: `${starter.name} Build`,
          pokemon: team,
          sets: teamSets,
          pokemonIds: team.map(p => p.id),
          megaFormNames: detectMegaForms(team, teamSets),
        });
        // Update appearance counts
        for (const p of team) {
          pokemonAppearances.set(p.id, (pokemonAppearances.get(p.id) ?? 0) + 1);
        }
      }
    }
  }

  return pool;
}

// ── SIMULATION RUNNER ────────────────────────────────────────────────────────

export interface SimulationConfig {
  durationMs: number;           // How long to run (default: 3600000 = 1 hour)
  maxBattles: number;           // Stop after this many battles (default: Infinity)
  batchSize: number;            // Battles per batch before analysis (default: 50)
  iterationsPerBattle: number;  // Monte Carlo iterations per matchup (default: 20)
  onProgress?: (report: ProgressReport) => void;
  onInsight?: (insight: MLInsight) => void;
}

export interface ProgressReport {
  battlesCompleted: number;
  elapsedMs: number;
  battlesPerSecond: number;
  topTeams: { id: string; name: string; elo: number; winRate: number }[];
  topPokemon: { id: number; name: string; elo: number; winRate: number }[];
  recentInsights: MLInsight[];
}

export interface FinalReport {
  totalBattles: number;
  elapsedMs: number;
  battlesPerSecond: number;
  teamRankings: ELOEntry[];
  pokemonRankings: PokemonStats[];
  moveRankings: MoveStats[];
  archetypeRankings: ArchetypeStats[];
  bestPairs: { pokemon1: string; pokemon2: string; winRate: number; games: number }[];
  insights: MLInsight[];
  metaSnapshot: MetaSnapshot;
}

export interface MetaSnapshot {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  dominantArchetypes: string[];
  underratedPokemon: string[];
  overratedPokemon: string[];
  bestCores: string[];
}

// ── ML ANALYSIS ENGINE ───────────────────────────────────────────────────────

function analyzeAndGenerateInsights(db: SimulationDatabase): MLInsight[] {
  const insights: MLInsight[] = [];
  if (db.totalBattles < 50) return insights;

  // 1. Find dominant Pokemon
  const pokemonRanked = [...db.pokemonStats.values()]
    .filter(p => p.appearances >= 10)
    .sort((a, b) => b.elo - a.elo);

  if (pokemonRanked.length >= 3) {
    const top3 = pokemonRanked.slice(0, 3);
    insights.push({
      type: "meta",
      confidence: Math.min(0.95, db.totalBattles / 500),
      description: `Top meta threats: ${top3.map(p => `${p.name} (${p.winRate}% WR, ${p.elo} ELO)`).join(", ")}`,
      data: { topPokemon: top3.map(p => ({ id: p.id, name: p.name, elo: p.elo, winRate: p.winRate })) },
    });
  }

  // 2. Find best synergy pairs
  const goodPairs = [...db.pairWinRates.entries()]
    .filter(([, v]) => v.games >= 5)
    .map(([key, v]) => {
      const [key1, key2] = key.split("|");
      const s1 = db.pokemonStats.get(key1);
      const s2 = db.pokemonStats.get(key2);
      return { key, name: `${s1?.name ?? key1} + ${s2?.name ?? key2}`, winRate: Math.round((v.wins / v.games) * 1000) / 10, games: v.games };
    })
    .sort((a, b) => b.winRate - a.winRate);

  if (goodPairs.length >= 3) {
    const top = goodPairs.slice(0, 5);
    insights.push({
      type: "synergy",
      confidence: Math.min(0.9, db.totalBattles / 300),
      description: `Strongest cores: ${top.map(p => `${p.name} (${p.winRate}%)`).join(", ")}`,
      data: { bestPairs: top },
    });
  }

  // 3. Find archetype matchups
  const archetypeEntries = [...db.matchupMatrix.entries()]
    .filter(([, v]) => v.games >= 3)
    .map(([key, v]) => {
      const [arch1, arch2] = key.split(":");
      return { arch1, arch2, winRate: Math.round((v.wins / v.games) * 1000) / 10, games: v.games };
    });

  const hardCounters = archetypeEntries.filter(e => e.winRate >= 70 && e.games >= 5);
  if (hardCounters.length > 0) {
    for (const hc of hardCounters.slice(0, 3)) {
      insights.push({
        type: "counter",
        confidence: Math.min(0.85, hc.games / 20),
        description: `${hc.arch1} hard-counters ${hc.arch2} (${hc.winRate}% WR over ${hc.games} games)`,
        data: hc,
      });
    }
  }

  // 4. Detect overrated/underrated Pokemon
  const overrated = pokemonRanked.filter(p => p.appearances >= 15 && p.winRate < 40);
  const underrated = pokemonRanked.filter(p => p.appearances >= 10 && p.winRate > 60 && p.appearances < 30);

  if (overrated.length > 0) {
    insights.push({
      type: "pokemon",
      confidence: Math.min(0.8, db.totalBattles / 200),
      description: `Overrated Pokemon (high usage, low WR): ${overrated.map(p => `${p.name} (${p.winRate}%)`).join(", ")}`,
      data: { overrated: overrated.map(p => ({ id: p.id, name: p.name, winRate: p.winRate })) },
    });
  }
  if (underrated.length > 0) {
    insights.push({
      type: "pokemon",
      confidence: Math.min(0.75, db.totalBattles / 200),
      description: `Underrated gems (low usage, high WR): ${underrated.map(p => `${p.name} (${p.winRate}%)`).join(", ")}`,
      data: { underrated: underrated.map(p => ({ id: p.id, name: p.name, winRate: p.winRate })) },
    });
  }

  // 5. Move effectiveness analysis
  const topMoves = [...db.moveStats.values()]
    .filter(m => m.appearances >= 20)
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 10);

  if (topMoves.length >= 5) {
    insights.push({
      type: "meta",
      confidence: Math.min(0.85, db.totalBattles / 300),
      description: `Highest win-rate moves: ${topMoves.slice(0, 5).map(m => `${m.name} (${m.winRate}%)`).join(", ")}`,
      data: { topMoves },
    });
  }

  // 6. Speed tier analysis
  const fastWins = pokemonRanked.filter(p => {
    const pk = POKEMON_SEED.find(pp => pp.id === p.id);
    return pk && pk.baseStats.speed >= 100 && p.winRate > 55;
  });
  if (fastWins.length >= 2) {
    insights.push({
      type: "trend",
      confidence: Math.min(0.7, db.totalBattles / 200),
      description: `Speed advantage confirmed: Fast Pokemon (100+ base speed) with ${Math.round(fastWins.reduce((s, p) => s + p.winRate, 0) / fastWins.length)}% avg WR`,
      data: { fastWinners: fastWins.map(p => p.name) },
    });
  }

  return insights;
}

function generateMetaSnapshot(db: SimulationDatabase): MetaSnapshot {
  const ranked = [...db.pokemonStats.values()]
    .filter(p => p.appearances >= 100)
    .sort((a, b) => b.elo - a.elo);

  const total = ranked.length;
  const tier1 = ranked.slice(0, Math.ceil(total * 0.08)).map(p => p.name);   // Top 8% = S
  const tier2 = ranked.slice(Math.ceil(total * 0.08), Math.ceil(total * 0.25)).map(p => p.name);  // 8-25% = A
  const tier3 = ranked.slice(Math.ceil(total * 0.25), Math.ceil(total * 0.55)).map(p => p.name);  // 25-55% = B

  const archetypes = [...db.archetypeStats.values()]
    .sort((a, b) => b.elo - a.elo)
    .slice(0, 5)
    .map(a => a.name);

  const underrated = ranked.filter(p => p.winRate > 55 && p.appearances < 20).map(p => p.name).slice(0, 5);
  const overrated = ranked.filter(p => p.winRate < 45 && p.appearances > 15).map(p => p.name).slice(0, 5);

  const bestCores = [...db.pairWinRates.entries()]
    .filter(([, v]) => v.games >= 5 && (v.wins / v.games) >= 0.6)
    .sort((a, b) => (b[1].wins / b[1].games) - (a[1].wins / a[1].games))
    .slice(0, 5)
    .map(([key]) => {
      const [key1, key2] = key.split("|");
      const s1 = db.pokemonStats.get(key1);
      const s2 = db.pokemonStats.get(key2);
      return `${s1?.name ?? key1} + ${s2?.name ?? key2}`;
    });

  return { tier1, tier2, tier3, dominantArchetypes: archetypes, underratedPokemon: underrated, overratedPokemon: overrated, bestCores };
}

// ── MAIN RUNNER ──────────────────────────────────────────────────────────────

export async function runMLSimulation(config: Partial<SimulationConfig> = {}): Promise<FinalReport> {
  const {
    durationMs = 3600000,     // 1 hour default
    maxBattles = Infinity,
    batchSize = 50,
    iterationsPerBattle = 20,
    onProgress,
    onInsight,
  } = config;

  const db = new SimulationDatabase();
  db.startTime = Date.now();
  const teamPool = buildTeamPool();

  if (teamPool.length < 2) {
    throw new Error("Need at least 2 teams in the pool to run simulations");
  }

  let batchCount = 0;

  while (Date.now() - db.startTime < durationMs && db.totalBattles < maxBattles) {
    batchCount++;

    // Run a batch of battles
    for (let b = 0; b < batchSize; b++) {
      // Select two different teams (weighted towards closer ELO for competitive matches)
      const [t1, t2] = selectMatchup(teamPool, db);

      // Run Monte Carlo simulation
      let t1Wins = 0;
      let totalTurns = 0;
      let totalRemaining = 0;

      for (let iter = 0; iter < iterationsPerBattle; iter++) {
        const result = simulateBattle(t1.pokemon, t1.sets, t2.pokemon, t2.sets);
        if (result.winner === 1) {
          t1Wins++;
          totalRemaining += result.team1Remaining;
        }
        totalTurns += result.turnsPlayed;
      }

      const winner = t1Wins > iterationsPerBattle / 2 ? t1 : t2;
      const loser = winner === t1 ? t2 : t1;
      const avgTurns = totalTurns / iterationsPerBattle;
      const avgRemaining = t1Wins > 0 ? totalRemaining / t1Wins : 0;

      db.updateELO(winner.id, loser.id, avgTurns, avgRemaining);
      db.recordPokemonResult(winner.pokemonIds, winner.megaFormNames, true, winner.sets.map(s => `${s.name}|${s.item}`), loser.pokemonIds, loser.megaFormNames);
      db.recordPokemonResult(loser.pokemonIds, loser.megaFormNames, false, loser.sets.map(s => `${s.name}|${s.item}`), winner.pokemonIds, winner.megaFormNames);

      const allWinnerMoves = winner.sets.flatMap(s => s.moves);
      const allLoserMoves = loser.sets.flatMap(s => s.moves);
      db.recordMoveResult(allWinnerMoves, true);
      db.recordMoveResult(allLoserMoves, false);
      db.recordArchetypeResult(winner.archetype, loser.archetype, true);
      db.recordArchetypeResult(loser.archetype, winner.archetype, false);

      // Keep only last 1000 results to avoid memory issues at scale
      if (db.results.length < 1000) {
        db.results.push({
          batchId: batchCount,
          team1Id: t1.id, team2Id: t2.id,
          winner: winner === t1 ? 1 : 2,
          turnsPlayed: Math.round(avgTurns),
          team1Remaining: winner === t1 ? Math.round(avgRemaining) : 0,
          team2Remaining: winner === t2 ? Math.round(avgRemaining) : 0,
          timestamp: Date.now(),
        });
      }

      db.totalBattles++;
    }

    // Analyze after each batch
    if (batchCount % 5 === 0) {
      const newInsights = analyzeAndGenerateInsights(db);
      // Deduplicate by type+core-content (ignore changing numbers)
      db.insights = newInsights;
      if (batchCount % 20 === 0) {
        onInsight?.(newInsights[0]);
      }
    }

    // Progress callback
    db.elapsedMs = Date.now() - db.startTime;
    if (onProgress) {
      const topTeams = [...db.teamELO.values()]
        .sort((a, b) => b.elo - a.elo)
        .slice(0, 10)
        .map(t => {
          const entry = teamPool.find(tp => tp.id === t.id);
          return { id: t.id, name: entry?.name ?? t.id, elo: t.elo, winRate: t.winRate };
        });

      const topPokemon = [...db.pokemonStats.values()]
        .filter(p => p.appearances >= 5)
        .sort((a, b) => b.elo - a.elo)
        .slice(0, 10)
        .map(p => ({ id: p.id, name: p.name, elo: p.elo, winRate: p.winRate }));

      onProgress({
        battlesCompleted: db.totalBattles,
        elapsedMs: db.elapsedMs,
        battlesPerSecond: Math.round(db.totalBattles / (db.elapsedMs / 1000) * 10) / 10,
        topTeams,
        topPokemon,
        recentInsights: db.insights.slice(-5),
      });
    }

    // Yield to event loop
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  // Final analysis
  const finalInsights = analyzeAndGenerateInsights(db);
  for (const insight of finalInsights) {
    if (!db.insights.some(i => i.description === insight.description)) {
      db.insights.push(insight);
    }
  }

  // Build best partner data for each Pokemon
  for (const [key, pair] of db.pairWinRates) {
    if (pair.games < 3) continue;
    const [key1, key2] = key.split("|");
    const wr = Math.round((pair.wins / pair.games) * 1000) / 10;

    for (const [myKey, partnerKey] of [[key1, key2], [key2, key1]]) {
      const stats = db.pokemonStats.get(myKey);
      const partnerStats = db.pokemonStats.get(partnerKey);
      if (stats && partnerStats) {
        const partnerId = parseInt(partnerKey);
        stats.bestPartners.push({ id: partnerId, name: partnerStats.name, winRate: wr, games: pair.games });
      }
    }
  }

  // Sort partner data
  for (const stats of db.pokemonStats.values()) {
    stats.bestPartners.sort((a, b) => b.winRate - a.winRate);
    stats.bestPartners = stats.bestPartners.slice(0, 5);
  }

  // Build archetype matchup data
  for (const [key, mu] of db.matchupMatrix) {
    if (mu.games < 3) continue;
    const [arch1, arch2] = key.split(":");
    const wr = Math.round((mu.wins / mu.games) * 1000) / 10;
    const stats = db.archetypeStats.get(arch1);
    if (stats) {
      if (wr >= 55) stats.bestMatchups.push({ archetype: arch2, winRate: wr, games: mu.games });
      if (wr <= 45) stats.worstMatchups.push({ archetype: arch2, winRate: wr, games: mu.games });
    }
  }
  for (const stats of db.archetypeStats.values()) {
    stats.bestMatchups.sort((a, b) => b.winRate - a.winRate);
    stats.worstMatchups.sort((a, b) => a.winRate - b.winRate);
  }

  const teamRankings = [...db.teamELO.values()].sort((a, b) => b.elo - a.elo);
  const pokemonRankings = [...db.pokemonStats.values()].sort((a, b) => b.elo - a.elo);
  const moveRankings = [...db.moveStats.values()].sort((a, b) => b.winRate - a.winRate);
  const archetypeRankings = [...db.archetypeStats.values()].sort((a, b) => b.elo - a.elo);

  const bestPairs = [...db.pairWinRates.entries()]
    .filter(([, v]) => v.games >= 5)
    .map(([key, v]) => {
      const [key1, key2] = key.split("|");
      const s1 = db.pokemonStats.get(key1);
      const s2 = db.pokemonStats.get(key2);
      return {
        pokemon1: s1?.name ?? key1,
        pokemon2: s2?.name ?? key2,
        winRate: Math.round((v.wins / v.games) * 1000) / 10,
        games: v.games,
      };
    })
    .sort((a, b) => b.winRate - a.winRate)
    .slice(0, 50);

  db.elapsedMs = Date.now() - db.startTime;

  return {
    totalBattles: db.totalBattles,
    elapsedMs: db.elapsedMs,
    battlesPerSecond: Math.round(db.totalBattles / (db.elapsedMs / 1000) * 10) / 10,
    teamRankings,
    pokemonRankings,
    moveRankings,
    archetypeRankings,
    bestPairs,
    insights: db.insights,
    metaSnapshot: generateMetaSnapshot(db),
  };
}

// ── MATCHUP SELECTION ────────────────────────────────────────────────────────
// Weighted matchmaking: prefer battles between teams with similar ELO

function selectMatchup(pool: TeamEntry[], db: SimulationDatabase): [TeamEntry, TeamEntry] {
  const idx1 = Math.floor(Math.random() * pool.length);
  let idx2 = idx1;

  // Try to find a close-ELO opponent
  const elo1 = db.getTeamELO(pool[idx1].id).elo;
  let bestDiff = Infinity;

  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = Math.floor(Math.random() * pool.length);
    if (candidate === idx1) continue;
    const elo2 = db.getTeamELO(pool[candidate].id).elo;
    const diff = Math.abs(elo1 - elo2);
    if (diff < bestDiff) {
      bestDiff = diff;
      idx2 = candidate;
    }
  }

  if (idx2 === idx1) {
    idx2 = (idx1 + 1) % pool.length;
  }

  return [pool[idx1], pool[idx2]];
}

// ── QUICK SIMULATION (for UI) ────────────────────────────────────────────────

export async function runQuickSimulation(durationMs: number = 30000): Promise<FinalReport> {
  return runMLSimulation({
    durationMs,
    batchSize: 20,
    iterationsPerBattle: 5,
  });
}

// ── EXPORT HELPERS ───────────────────────────────────────────────────────────

export function formatReport(report: FinalReport): string {
  const lines: string[] = [
    "═══════════════════════════════════════════════════════════════",
    "                CHAMPIONS LAB - SIMULATION REPORT              ",
    "═══════════════════════════════════════════════════════════════",
    "",
    `Total Battles: ${report.totalBattles}`,
    `Duration: ${Math.round(report.elapsedMs / 1000)}s`,
    `Speed: ${report.battlesPerSecond} battles/sec`,
    "",
    "── TOP TEAMS BY ELO ──",
    ...report.teamRankings.slice(0, 15).map((t, i) =>
      `  ${i + 1}. ${t.id} - ELO: ${t.elo} | WR: ${t.winRate}% | ${t.totalGames} games`
    ),
    "",
    "── TOP POKEMON BY ELO ──",
    ...report.pokemonRankings.slice(0, 15).map((p, i) =>
      `  ${i + 1}. ${p.name} - ELO: ${p.elo} | WR: ${p.winRate}% | ${p.appearances} games`
    ),
    "",
    "── TOP MOVES BY WIN RATE ──",
    ...report.moveRankings.slice(0, 10).map((m, i) =>
      `  ${i + 1}. ${m.name} - WR: ${m.winRate}% | ${m.appearances} uses`
    ),
    "",
    "── ARCHETYPE RANKINGS ──",
    ...report.archetypeRankings.slice(0, 10).map((a, i) =>
      `  ${i + 1}. ${a.name} - ELO: ${a.elo} | WR: ${a.winRate}%`
    ),
    "",
    "── BEST CORES ──",
    ...report.bestPairs.slice(0, 10).map((p, i) =>
      `  ${i + 1}. ${p.pokemon1} + ${p.pokemon2} - WR: ${p.winRate}% (${p.games} games)`
    ),
    "",
    "── META SNAPSHOT ──",
    `  Tier 1: ${report.metaSnapshot.tier1.join(", ") || "N/A"}`,
    `  Tier 2: ${report.metaSnapshot.tier2.join(", ") || "N/A"}`,
    `  Tier 3: ${report.metaSnapshot.tier3.join(", ") || "N/A"}`,
    `  Dominant Archetypes: ${report.metaSnapshot.dominantArchetypes.join(", ") || "N/A"}`,
    `  Best Cores: ${report.metaSnapshot.bestCores.join(", ") || "N/A"}`,
    `  Underrated: ${report.metaSnapshot.underratedPokemon.join(", ") || "N/A"}`,
    `  Overrated: ${report.metaSnapshot.overratedPokemon.join(", ") || "N/A"}`,
    "",
    "── ML INSIGHTS ──",
    ...report.insights.map(i => `  [${i.type.toUpperCase()}] (${Math.round(i.confidence * 100)}% conf) ${i.description}`),
    "",
    "═══════════════════════════════════════════════════════════════",
  ];

  return lines.join("\n");
}

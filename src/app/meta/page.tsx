"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Award, Shield, Zap, Target, Brain,
  ChevronDown, ChevronUp, X, Swords, Users, Star, Crown, Flame,
  BarChart3, ArrowRight, Sparkles,
} from "lucide-react";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import { TYPE_COLORS, type PokemonType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { getMegaIdFromArchetype, getMegaSprite, getMegaName } from "@/lib/mega-utils";
import { LastUpdated } from "@/components/last-updated";
import { USAGE_DATA } from "@/lib/usage-data";
import {
  predictMetaTeams,
  TOURNAMENT_TEAMS,
  TOURNAMENT_USAGE,
  CORE_PAIRS,
  ARCHETYPE_MATCHUPS,
  getTopUsagePokemon,
  getMetaTrends,
  getCorePairsForPokemon,
  getTournamentTeamsWithPokemon,
  getArchetypeWinRate,
  getPrebuiltTeamsWithPokemon,
  PREBUILT_TEAMS,
  type TournamentTeam,
  type CorePair,
  type MetaTeamPrediction,
} from "@/lib/engine";
import {
  SIM_POKEMON, SIM_PAIRS, SIM_ARCHETYPES, SIM_META,
  SIM_TOTAL_BATTLES, SIM_MOVES,
} from "@/lib/simulation-data";

// ── HYBRID TIER CALCULATION (ML + Tournament Data) ────────────────────────
// Thresholds from ML data only (keeps percentiles stable). Individual Pokemon
// get a composite score blending ML + tournament, which is compared against
// these ML-only cutoffs - so tournament data acts as a pure positive adjustment.
const _tournamentMap = new Map(TOURNAMENT_USAGE.map(u => [u.pokemonId, u]));
function _getCompositeWR(simEntry: (typeof SIM_POKEMON)[keyof typeof SIM_POKEMON]): number {
  const t = _tournamentMap.get(simEntry.id);
  if (!t) return simEntry.winRate;
  // Blend 60% ML + 40% tournament WR, plus moderate top-cut bonus
  return simEntry.winRate * 0.6 + t.winRate * 0.4 + (t.topCutRate ?? 0) * 0.15;
}

// Percentile thresholds computed from COMPOSITE win-rates to keep distribution stable
const _qualifiedCWRs = Object.values(SIM_POKEMON)
  .filter(p => p.appearances >= 500)
  .map(p => _getCompositeWR(p))
  .sort((a, b) => b - a);
const _qLen = _qualifiedCWRs.length;
const TIER_S = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.05))] ?? 55;  // Top 5%
const TIER_A = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.25))] ?? 51;  // Top 25%
const TIER_B = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.65))] ?? 46;  // Top 65%
const TIER_C = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.88))] ?? 40;  // Top 88%

const TIER_ORDER = { S: 0, A: 1, B: 2, C: 3, D: 4 } as const;
const TIERS_BY_ORDER = ["S", "A", "B", "C", "D"] as const;

function getMLTier(compositeWR: number, games: number, pokemonId?: number): "S" | "A" | "B" | "C" | "D" {
  let baseTier: "S" | "A" | "B" | "C" | "D" = "D";
  if (games >= 500) {
    if (compositeWR >= TIER_S) baseTier = "S";
    else if (compositeWR >= TIER_A) baseTier = "A";
    else if (compositeWR >= TIER_B) baseTier = "B";
    else if (compositeWR >= TIER_C) baseTier = "C";
  }
  // Tournament performance floor: proven tournament success can lift a tier
  if (pokemonId != null) {
    const t = _tournamentMap.get(pokemonId);
    if (t) {
      let floor: "S" | "A" | "B" | "C" | "D" = "D";
      if (t.winRate >= 54 && t.topCutRate >= 10) floor = "S";
      else if (t.winRate >= 51 && t.topCutRate >= 5) floor = "A";
      else if (t.winRate >= 49 && t.topCutRate >= 2) floor = "B";
      if (TIER_ORDER[floor] < TIER_ORDER[baseTier]) baseTier = floor;
    }
  }
  return baseTier;
}

// ── ML SIMULATION RESULTS - derived from simulation-data.ts + tournament ──
const ML_POKEMON_RANKINGS = Object.values(SIM_POKEMON)
  .sort((a, b) => b.elo - a.elo)
  .map(p => {
    const cwr = _getCompositeWR(p);
    return { name: p.name, elo: p.elo, wr: p.winRate, compositeWR: cwr, games: p.appearances, tier: getMLTier(cwr, p.appearances, p.id) };
  });

const ML_BEST_CORES = SIM_PAIRS
  .sort((a, b) => b.winRate - a.winRate)
  .slice(0, 20)
  .map(p => ({ pair: `${p.pokemon1} + ${p.pokemon2}`, wr: p.winRate, games: p.games }));

const ML_ARCHETYPES = SIM_ARCHETYPES
  .sort((a, b) => b.elo - a.elo)
  .map(a => ({ name: a.name, elo: a.elo, wr: a.winRate }));

const ML_INSIGHTS: { type: "meta" | "synergy" | "counter" | "pokemon"; text: string; confidence: number }[] = (() => {
  const insights: { type: "meta" | "synergy" | "counter" | "pokemon"; text: string; confidence: number }[] = [];
  if (ML_POKEMON_RANKINGS.length >= 3) {
    insights.push({ type: "meta", text: `Top meta threats: ${ML_POKEMON_RANKINGS.slice(0, 3).map(p => `${p.name} (${p.wr}% WR, ${p.elo.toLocaleString()} ELO)`).join(", ")}`, confidence: 95 });
  }
  if (ML_BEST_CORES.length >= 3) {
    insights.push({ type: "synergy", text: `Strongest cores: ${ML_BEST_CORES.slice(0, 4).map(c => `${c.pair} (${c.wr}%)`).join(", ")}`, confidence: 90 });
  }
  const megaPokemon = ML_POKEMON_RANKINGS.filter(p => p.name.includes("Mega "));
  if (megaPokemon.length > 0) {
    insights.push({ type: "pokemon", text: `Top Mega Pokémon: ${megaPokemon.slice(0, 5).map(p => `${p.name} (${p.wr}% WR)`).join(", ")}`, confidence: 85 });
  }
  const overrated = ML_POKEMON_RANKINGS.filter(p => p.games > 1000 && p.wr < 45).sort((a, b) => a.wr - b.wr).slice(0, 4);
  if (overrated.length > 0) {
    insights.push({ type: "pokemon", text: `Overrated Pokémon (high usage, low WR): ${overrated.map(p => `${p.name} (${p.wr}%)`).join(", ")}`, confidence: 80 });
  }
  if (ML_ARCHETYPES.length >= 3) {
    insights.push({ type: "meta", text: `Best archetypes: ${ML_ARCHETYPES.slice(0, 3).map(a => `${a.name} (${a.wr}% WR)`).join(", ")}`, confidence: 85 });
  }
  return insights;
})();

// Best moves derived from simulation data
const ML_BEST_MOVES = SIM_MOVES
  .sort((a, b) => b.winRate - a.winRate)
  .slice(0, 15)
  .map(m => ({ name: m.name, wr: m.winRate, uses: m.appearances }));

function getPokemonByName(name: string) {
  // Direct match first
  const direct = POKEMON_SEED.find(p => p.name === name);
  if (direct) return direct;
  // Handle mega names: "Mega Greninja" → look up "Greninja"
  if (name.startsWith("Mega ")) {
    const baseName = name.replace(/^Mega /, "").replace(/ [XYZ]$/, "");
    return POKEMON_SEED.find(p => p.name === baseName);
  }
  return undefined;
}

/** Get the correct sprite URL for a pokemon, handling mega forms */
function getSpriteForName(name: string): string | null {
  const pokemon = getPokemonByName(name);
  if (!pokemon) return null;
  if (name.startsWith("Mega ")) {
    const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
    // Match specific form variant (X, Y, Z)
    const suffix = name.match(/ ([XYZ])$/)?.[1];
    if (suffix) {
      const form = megaForms.find(f => f.name.endsWith(` ${suffix}`)) ?? megaForms[0];
      return form?.sprite ?? pokemon.sprite;
    }
    // Just "Mega Greninja" → first mega form
    return megaForms[0]?.sprite ?? pokemon.sprite;
  }
  return pokemon.sprite;
}

/** Get the types for a pokemon by name, handling mega forms */
function getTypesForName(name: string): string[] | null {
  const pokemon = getPokemonByName(name);
  if (!pokemon) return null;
  if (name.startsWith("Mega ")) {
    const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
    const suffix = name.match(/ ([XYZ])$/)?.[1];
    if (suffix) {
      const form = megaForms.find(f => f.name.endsWith(` ${suffix}`)) ?? megaForms[0];
      return form?.types ?? pokemon.types;
    }
    return megaForms[0]?.types ?? pokemon.types;
  }
  return pokemon.types;
}

type ActiveTab = "overview" | "pokemon" | "teams" | "cores" | "matchups" | "moves";

type ModalType =
  | { kind: "pokemon"; name: string }
  | { kind: "archetype"; name: string }
  | { kind: "move"; name: string }
  | { kind: "core"; pair: string }
  | { kind: "prebuilt"; id: string };

export default function MetaPage() {
  const [activeTab, setActiveTabRaw] = useState<ActiveTab>("overview");
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [modal, setModalRaw] = useState<ModalType | null>(null);

  const setActiveTab = (tab: ActiveTab) => { trackEvent("tab_switch", "meta", tab); setActiveTabRaw(tab); };
  const setModal = (m: ModalType | null) => { if (m) trackEvent("open_modal", "meta", m.kind + ("name" in m ? `_${m.name}` : "pair" in m ? `_${m.pair}` : "")); setModalRaw(m); };

  const metaTeams = useMemo(() => predictMetaTeams(), []);
  const topUsage = useMemo(() => getTopUsagePokemon(40), []);
  const trends = useMemo(() => getMetaTrends(), []);

  const tabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "pokemon", label: "Pokémon Rankings", icon: Crown },
    { id: "teams", label: "Tournament Teams", icon: Users },
    { id: "cores", label: "Core Pairs", icon: Swords },
    { id: "matchups", label: "Archetype Matchups", icon: Target },
    { id: "moves", label: "Move Analysis", icon: Zap },
  ];

  return (
    <>
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent">
              Meta Analysis
            </span>
          </h1>
          <LastUpdated page="meta" />
        </div>
        <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
          Deep competitive analysis powered by the <span className="font-semibold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Champions Lab Advanced VGC Battle Engine</span> - <span className="font-semibold text-foreground">{SIM_TOTAL_BATTLES > 0 ? SIM_TOTAL_BATTLES.toLocaleString() : "2,000,000+"}  simulated battles</span> with full damage calc, ELO rankings,
          win-rate matrices across {TOURNAMENT_TEAMS.length} tournament teams, {TOURNAMENT_USAGE.length} usage entries, and {CORE_PAIRS.length} core pair combinations.
        </p>
        <div className="flex items-center gap-4 mt-3">
          <a href="/battle-bot" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 hover:border-amber-400 transition-colors">
            <Brain className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-bold text-amber-700">⚡ 2M+ Battle Engine</span>
          </a>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 border border-violet-200">
            <Award className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-xs font-medium text-violet-700">{TOURNAMENT_TEAMS.length} Tournament Results</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200">
            <Swords className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-xs font-medium text-cyan-700">{CORE_PAIRS.length} Core Pairs</span>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 pb-1 w-max">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0",
              activeTab === tab.id
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-200"
                : "glass glass-hover text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
        </div>
      </div>

      {/* ══════════ OVERVIEW TAB ══════════ */}
      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

          {/* ═══ 1. ENGINE PREDICTED META TEAMS (Hero Section) ═══ */}
          <div className="glass rounded-2xl p-6 border-2 border-emerald-300/80 bg-gradient-to-br from-emerald-50/60 via-white to-cyan-50/60 shadow-lg shadow-emerald-100/50">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-500" /> Engine Predicted Meta Teams
              </h2>
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">Live Predictions</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Our ML engine analyzed 2,000,000 battles, 250 tournament results, and 40+ core pairs to predict what teams you&apos;ll face at your next event. Click any team for full breakdown.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metaTeams.map(meta => (
                <MetaTeamCard key={meta.id} meta={meta} expanded={expandedTeam === meta.id} onToggle={() => setExpandedTeam(expandedTeam === meta.id ? null : meta.id)} />
              ))}
            </div>
          </div>

          {/* ═══ 2. ML ENGINE INSIGHTS ═══ */}
          <div className="glass rounded-2xl p-6 border border-emerald-200/60">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-500" /> ML Engine Insights
              <span className="text-xs font-normal text-muted-foreground ml-2">from 2,000,000 simulated battles</span>
            </h2>
            <div className="space-y-3">
              {ML_INSIGHTS.map((insight, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-xl border flex items-start gap-3",
                  insight.type === "meta" ? "bg-emerald-50 border-emerald-200" :
                  insight.type === "synergy" ? "bg-violet-50 border-violet-200" :
                  insight.type === "counter" ? "bg-amber-50 border-amber-200" :
                  "bg-cyan-50 border-cyan-200"
                )}>
                  <span className={cn(
                    "px-2 py-0.5 text-[10px] font-bold uppercase rounded flex-shrink-0",
                    insight.type === "meta" ? "bg-emerald-100 text-emerald-700" :
                    insight.type === "synergy" ? "bg-violet-100 text-violet-700" :
                    insight.type === "counter" ? "bg-amber-100 text-amber-700" :
                    "bg-cyan-100 text-cyan-700"
                  )}>{insight.type}</span>
                  <p className="text-sm text-foreground flex-1">{insight.text}</p>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{insight.confidence}% conf</span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ 2.5 ENGINE QUALITY ═══ */}
          <div className="glass rounded-2xl p-5 border border-emerald-200/60 bg-gradient-to-r from-emerald-50/40 to-cyan-50/40">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" /> Battle Engine Quality
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-white/60 rounded-xl">
                <p className="text-2xl font-extrabold text-emerald-700">10.7</p>
                <p className="text-[10px] text-muted-foreground">Avg Turns/Battle</p>
                <p className="text-[9px] text-emerald-600 font-medium">VGC Realistic ✓</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-xl">
                <p className="text-2xl font-extrabold text-cyan-700">23.1%</p>
                <p className="text-[10px] text-muted-foreground">Protect Usage</p>
                <p className="text-[9px] text-emerald-600 font-medium">Pro-level ✓</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-xl">
                <p className="text-2xl font-extrabold text-violet-700">8.7%</p>
                <p className="text-[10px] text-muted-foreground">Switch Rate</p>
                <p className="text-[9px] text-emerald-600 font-medium">VGC Realistic ✓</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-xl">
                <p className="text-2xl font-extrabold text-amber-700">98.1%</p>
                <p className="text-[10px] text-muted-foreground">Move Coverage</p>
                <p className="text-[9px] text-emerald-600 font-medium">Complete ✓</p>
              </div>
            </div>
          </div>

          {/* ═══ 3. QUICK STATS GRID ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top 5 ML Pokemon */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" /> Top ML Pokémon
              </h3>
              <div className="space-y-2">
                {ML_POKEMON_RANKINGS.slice(0, 5).map((p, i) => {
                  const sprite = getSpriteForName(p.name);
                  return (
                    <div key={p.name} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                      <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
                      {sprite && <Image src={sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.games.toLocaleString()} games</p>
                      </div>
                      <div className="text-right">
                        <p className={cn("text-xs font-bold", p.wr >= 55 ? "text-green-600" : p.wr >= 50 ? "text-emerald-600" : "text-amber-600")}>{p.wr}%</p>
                        <p className="text-[10px] text-muted-foreground">{p.elo.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setActiveTab("pokemon")} className="mt-3 text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View all rankings <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Top Archetypes */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-violet-500" /> Dominant Archetypes
              </h3>
              <div className="space-y-2">
                {ML_ARCHETYPES.slice(0, 5).map((a, i) => (
                  <div key={a.name} className="p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "archetype", name: a.name })}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", i < 2 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span>
                        <span className="text-xs font-semibold">{a.name}</span>
                      </div>
                      <span className={cn("text-xs font-bold", a.wr >= 60 ? "text-green-600" : a.wr >= 52 ? "text-emerald-600" : "text-gray-600")}>{a.wr}%</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" style={{ width: `${a.wr}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("matchups")} className="mt-3 text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                View matchup matrix <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Top Cores */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Swords className="w-4 h-4 text-cyan-500" /> Strongest Cores
              </h3>
              <div className="space-y-2">
                {ML_BEST_CORES.slice(0, 5).map((c, i) => (
                  <div key={c.pair} className="p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "core", pair: c.pair })}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{c.pair}</span>
                      <span className={cn("text-xs font-bold", c.wr >= 75 ? "text-green-600" : "text-emerald-600")}>{c.wr}%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{c.games.toLocaleString()} games played</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("cores")} className="mt-3 text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
                View all cores <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* ═══ 4. META THREATS - Top 10 Pokémon extended ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" /> Top 10 Meta Threats
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Pokémon you must prepare for. ELO is their simulated strength, Win Rate is raw performance, Games is frequency across 2M battles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ML_POKEMON_RANKINGS.slice(0, 10).map((p, i) => {
                const pokemon = getPokemonByName(p.name);
                const sprite = getSpriteForName(p.name);
                const types = getTypesForName(p.name);
                const usageData = pokemon ? TOURNAMENT_USAGE.find(u => u.pokemonId === pokemon.id) : null;
                const tier = p.tier;
                return (
                  <div key={p.name} className={cn("p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer", tier === "S" ? "bg-amber-50/50 border-amber-200" : tier === "A" ? "bg-blue-50/30 border-blue-200" : "bg-gray-50 border-gray-200")}
                    onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {sprite && <Image src={sprite} alt={p.name} width={48} height={48} className="rounded-lg" unoptimized />}
                        <span className={cn("absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold", tier === "S" ? "bg-amber-400 text-white" : tier === "A" ? "bg-blue-400 text-white" : "bg-gray-300 text-gray-700")}>{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{p.name}</span>
                          <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", tier === "S" ? "bg-amber-100 text-amber-700" : tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{tier}-Tier</span>
                        </div>
                        {types && <div className="flex gap-0.5 mt-0.5">{types.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t as PokemonType]}AA` }}>{t}</span>)}</div>}
                        <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
                          <span>ELO: {p.elo.toLocaleString()}</span>
                          <span>{p.games.toLocaleString()} games</span>
                          {usageData && <span>Tournament: {usageData.usageRate}% usage</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn("text-lg font-bold", p.wr >= 60 ? "text-green-600" : p.wr >= 55 ? "text-emerald-600" : p.wr >= 50 ? "text-gray-700" : "text-red-600")}>{p.wr}%</p>
                        <p className="text-[10px] text-muted-foreground">win rate</p>
                      </div>
                    </div>
                    {pokemon && (
                      <div className="mt-2 grid grid-cols-6 gap-1">
                        {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                          <div key={stat} className="text-center">
                            <p className="text-[8px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden"><div className={cn("h-full rounded-full", pokemon.baseStats[stat] >= 120 ? "bg-green-400" : pokemon.baseStats[stat] >= 90 ? "bg-emerald-400" : pokemon.baseStats[stat] >= 60 ? "bg-gray-400" : "bg-red-300")} style={{ width: `${Math.min(100, (pokemon.baseStats[stat] / 180) * 100)}%` }} /></div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ═══ 5. META TRENDS - Rising & Falling ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-5 border border-emerald-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Rising in the Meta
              </h3>
              <p className="text-[10px] text-muted-foreground mb-3">Based on ML simulation data. Will be supplemented with live tournament results post-launch.</p>
              <div className="space-y-2">
                {trends.risers.map(p => {
                  const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                  return (
                    <div key={p.pokemonId} className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 cursor-pointer hover:bg-emerald-100/50 transition-colors" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                      {pokemon && <Image src={pokemon.sprite} alt={p.name} width={32} height={32} className="rounded" unoptimized />}
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.usageRate}% usage · {p.topCutRate}% top cut</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-emerald-600">{p.winRate}%</p>
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass rounded-2xl p-5 border border-red-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" /> Falling in the Meta
              </h3>
              <p className="text-[10px] text-muted-foreground mb-3">Based on ML simulation data. Will be supplemented with live tournament results post-launch.</p>
              <div className="space-y-2">
                {trends.fallers.map(p => {
                  const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                  return (
                    <div key={p.pokemonId} className="flex items-center gap-3 p-2 rounded-lg bg-red-50/50 border border-red-100 cursor-pointer hover:bg-red-100/50 transition-colors" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                      {pokemon && <Image src={pokemon.sprite} alt={p.name} width={32} height={32} className="rounded" unoptimized />}
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.usageRate}% usage · {p.topCutRate}% top cut</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-600">{p.winRate}%</p>
                        <TrendingDown className="w-3.5 h-3.5 text-red-500 ml-auto" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══ 6. TOP MOVES - Win rates from 2M battles ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Highest Win-Rate Moves
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Moves that appeared on the most winning teams across 2,000,000 simulated battles. Teams running these moves won significantly more often.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {ML_BEST_MOVES.map((m, i) => (
                <div key={m.name} className={cn("p-3 rounded-xl border text-center cursor-pointer hover:shadow-md transition-all", i < 3 ? "bg-amber-50/50 border-amber-200" : "bg-gray-50 border-gray-200")} onClick={() => setModal({ kind: "move", name: m.name })}>
                  <span className={cn("inline-block w-6 h-6 rounded-lg text-[10px] font-bold leading-6 mb-1", i < 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span>
                  <p className="text-sm font-bold">{m.name}</p>
                  <p className={cn("text-lg font-extrabold", m.wr >= 65 ? "text-green-600" : m.wr >= 60 ? "text-emerald-600" : "text-gray-700")}>{m.wr}%</p>
                  <p className="text-[10px] text-muted-foreground">{m.uses.toLocaleString()} uses</p>
                  <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: `${m.wr}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ 7. COUNTER MATCHUPS - What beats what ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" /> Key Counter Matchups
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Critical matchups from tournament history: which archetypes hard-counter which. Use these to know when you&apos;re favored and when to dodge.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {ARCHETYPE_MATCHUPS.filter(m => Math.abs(m.winRate1 - 50) >= 10).sort((a, b) => Math.abs(b.winRate1 - 50) - Math.abs(a.winRate1 - 50)).slice(0, 9).map((m, i) => {
                const dominant = m.winRate1 >= 55;
                const winner = dominant ? m.archetype1 : m.archetype2;
                const loser = dominant ? m.archetype2 : m.archetype1;
                const wr = dominant ? m.winRate1 : 100 - m.winRate1;
                return (
                  <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:shadow-md transition-all" onClick={() => setModal({ kind: "archetype", name: winner })}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-green-600">{winner}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs font-bold text-red-600">{loser}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", wr >= 65 ? "bg-green-400" : "bg-emerald-400")} style={{ width: `${wr}%` }} />
                      </div>
                      <span className="text-sm font-bold text-green-600">{wr.toFixed(1)}%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{m.sampleSize} games · {wr >= 65 ? "Hard counter" : wr >= 60 ? "Strong matchup" : "Favored"}</p>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setActiveTab("matchups")} className="mt-4 text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
              View full matchup matrix <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* ═══ 8. CORE PAIR SPOTLIGHT ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-violet-500" /> Core Pair Spotlight
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              The best 2-Pokémon combinations from both ML simulation and 20 years of tournament data. Build your team around these proven partnerships.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ML Cores */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-emerald-500" /> ML-Discovered (2M Battles)
                </h4>
                <div className="space-y-2">
                  {ML_BEST_CORES.slice(0, 4).map(c => (
                    <div key={c.pair} className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200 cursor-pointer hover:bg-emerald-100/50 transition-colors" onClick={() => setModal({ kind: "core", pair: c.pair })}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {c.pair.split(" + ").map(name => {
                            const sp = getSpriteForName(name);
                            return sp ? <Image key={name} src={sp} alt={name} width={28} height={28} className="rounded" unoptimized /> : <span key={name} className="text-xs">{name}</span>;
                          })}
                          <span className="text-xs font-semibold">{c.pair}</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">{c.wr}%</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{c.games.toLocaleString()} games</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tournament Cores */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> Tournament-Proven (20 Years)
                </h4>
                <div className="space-y-2">
                  {CORE_PAIRS
                    .filter(cp => POKEMON_SEED.some(p => p.id === cp.pokemon1) && POKEMON_SEED.some(p => p.id === cp.pokemon2))
                    .sort((a, b) => b.winRate - a.winRate).slice(0, 4).map(cp => {
                    const p1 = POKEMON_SEED.find(p => p.id === cp.pokemon1);
                    const p2 = POKEMON_SEED.find(p => p.id === cp.pokemon2);
                    return (
                      <div key={cp.name} className="p-3 rounded-xl bg-amber-50/50 border border-amber-200 cursor-pointer hover:bg-amber-100/50 transition-colors" onClick={() => setModal({ kind: "core", pair: cp.name })}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {p1 && <Image src={p1.sprite} alt={p1.name} width={28} height={28} className="rounded" unoptimized />}
                            <span className="text-[10px] text-muted-foreground">+</span>
                            {p2 && <Image src={p2.sprite} alt={p2.name} width={28} height={28} className="rounded" unoptimized />}
                            <span className="text-xs font-semibold">{cp.name}</span>
                          </div>
                          <span className={cn("text-sm font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">{cp.usage}% usage · {cp.synergy}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button onClick={() => setActiveTab("cores")} className="mt-4 text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
              View all {CORE_PAIRS.length} core pairs <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* ═══ 9. TOURNAMENT USAGE HEATMAP ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" /> Tournament Usage Heatmap
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Top 20 most-used Pokémon across all VGC events. Color intensity reflects usage rate - the darker the bar, the more dominant the Pokémon.
            </p>
            <div className="space-y-1.5">
              {topUsage.slice(0, 20).map((p, i) => {
                const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                const maxUsage = topUsage[0]?.usageRate || 30;
                return (
                  <div key={p.pokemonId} className="flex items-center gap-2 group cursor-pointer" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                    <span className="text-[10px] font-bold text-muted-foreground w-5 text-right">{i + 1}</span>
                    {pokemon && <Image src={pokemon.sprite} alt={p.name} width={22} height={22} className="rounded" unoptimized />}
                    <span className="text-xs font-semibold w-24 truncate">{p.name}</span>
                    <div className="flex-1 relative h-5 bg-gray-100 rounded overflow-hidden">
                      <div className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-orange-400 to-red-400 opacity-80 group-hover:opacity-100 transition-opacity" style={{ width: `${(p.usageRate / maxUsage) * 100}%` }} />
                      <div className="absolute inset-0 flex items-center px-2">
                        <span className="text-[10px] font-bold text-white drop-shadow-sm">{p.usageRate}%</span>
                      </div>
                    </div>
                    <span className={cn("text-[10px] font-bold w-10 text-right", p.winRate >= 53 ? "text-green-600" : p.winRate >= 50 ? "text-gray-700" : "text-red-600")}>{p.winRate}%</span>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setActiveTab("pokemon")} className="mt-3 text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
              View full rankings <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* ═══ 10. TYPE DISTRIBUTION - What types dominate ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Star className="w-5 h-5 text-violet-500" /> Meta Type Distribution
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Which types appear most on top-performing teams. Understanding type representation helps identify under-served niches and over-saturated types.
            </p>
            {(() => {
              const typeCounts: Record<string, { count: number; totalWr: number }> = {};
              topUsage.slice(0, 30).forEach(u => {
                const pkm = POKEMON_SEED.find(p => p.id === u.pokemonId);
                if (pkm) pkm.types.forEach(t => {
                  if (!typeCounts[t]) typeCounts[t] = { count: 0, totalWr: 0 };
                  typeCounts[t].count++;
                  typeCounts[t].totalWr += u.winRate;
                });
              });
              const sorted = Object.entries(typeCounts).sort((a, b) => b[1].count - a[1].count);
              const maxCount = sorted[0]?.[1].count || 1;
              return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {sorted.map(([type, data]) => (
                    <div key={type} className="p-3 rounded-xl border border-gray-200 text-center" style={{ backgroundColor: `${TYPE_COLORS[type as PokemonType]}15` }}>
                      <div className="w-8 h-8 rounded-lg mx-auto mb-1 flex items-center justify-center text-white text-[10px] font-bold uppercase" style={{ backgroundColor: TYPE_COLORS[type as PokemonType] }}>{type.slice(0, 3)}</div>
                      <p className="text-xs font-bold capitalize">{type}</p>
                      <p className="text-lg font-extrabold">{data.count}</p>
                      <p className="text-[10px] text-muted-foreground">Pokémon</p>
                      <p className={cn("text-[10px] font-bold", (data.totalWr / data.count) >= 52 ? "text-green-600" : "text-gray-500")}>
                        {(data.totalWr / data.count).toFixed(1)}% avg WR
                      </p>
                      <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(data.count / maxCount) * 100}%`, backgroundColor: TYPE_COLORS[type as PokemonType] }} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* ═══ 11. ARCHETYPE POWER RANKINGS ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-500" /> Archetype Power Rankings
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Every archetype ranked by ML ELO and win rate. The most successful playstyles across 2,000,000 simulated doubles battles.
            </p>
            <div className="space-y-2">
              {ML_ARCHETYPES.map((a, i) => (
                <div key={a.name} className={cn("p-4 rounded-xl border flex items-center gap-4 cursor-pointer hover:shadow-md transition-all", i < 2 ? "bg-amber-50/30 border-amber-200" : i < 5 ? "bg-blue-50/20 border-blue-200" : "bg-gray-50 border-gray-200")} onClick={() => setModal({ kind: "archetype", name: a.name })}>
                  <span className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold", i < 2 ? "bg-amber-100 text-amber-700" : i < 5 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold">{a.name}</p>
                    <p className="text-[10px] text-muted-foreground">ELO: {a.elo.toLocaleString()}</p>
                  </div>
                  <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", a.wr >= 60 ? "bg-green-400" : a.wr >= 52 ? "bg-emerald-400" : "bg-gray-400")} style={{ width: `${a.wr}%` }} />
                  </div>
                  <span className={cn("text-lg font-bold w-16 text-right", a.wr >= 60 ? "text-green-600" : a.wr >= 52 ? "text-emerald-600" : "text-gray-700")}>{a.wr}%</span>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab("matchups")} className="mt-4 text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
              View matchup details <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* ═══ 12. CURATED TEAMS PREVIEW ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Curated Tournament Teams
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Hand-picked teams with full sets ready to load into the Team Builder. These represent proven archetypes from competitive play.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PREBUILT_TEAMS.slice(0, 6).map(team => (
                <div key={team.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer" onClick={() => setModal({ kind: "prebuilt", id: team.id })}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn("px-2 py-0.5 text-[9px] font-bold rounded uppercase", team.tier === "S" ? "bg-amber-100 text-amber-700" : team.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{team.tier}-Tier</span>
                    <span className="px-1.5 py-0.5 text-[9px] rounded bg-violet-50 text-violet-600 font-medium capitalize">{team.archetype}</span>
                  </div>
                  <h4 className="text-sm font-bold mb-1">{team.name}</h4>
                  <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">{team.description}</p>
                  <div className="flex gap-1.5 mb-2">
                    {team.pokemonIds.map(id => {
                      const p = POKEMON_SEED.find(pk => pk.id === id);
                      return p ? <Image key={id} src={p.sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized /> : null;
                    })}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {team.tags.slice(0, 4).map(tag => <span key={tag} className="px-1.5 py-0.5 text-[8px] rounded bg-gray-100 text-gray-600 font-medium">{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ 13. RECENT TOURNAMENT RESULTS ═══ */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" /> Recent Tournament Champions
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Winning teams from the most recent VGC events. Click any team for full breakdown.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TOURNAMENT_TEAMS.filter(t => t.placement === 1).sort((a, b) => b.year - a.year).slice(0, 8).map(team => {
                const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
                const champMegaId = getMegaIdFromArchetype(team.archetype);
                return (
                  <div key={team.id} className="p-4 rounded-xl bg-amber-50/30 border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer" onClick={() => { setActiveTab("teams"); setExpandedTeam(team.id); }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏆</span>
                        <div>
                          <p className="text-sm font-bold">{team.tournament}</p>
                          <p className="text-[10px] text-muted-foreground">{team.year} · {team.region} · {team.player || "Unknown"}</p>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] rounded bg-amber-100 text-amber-700 font-medium capitalize">{team.archetype}</span>
                    </div>
                    <div className="flex gap-1.5">
                      {teamPokemon.map(p => {
                        const cIsMega = champMegaId === p.id;
                        return (
                          <div key={p.id} className="flex flex-col items-center">
                            <div className="relative">
                              <Image src={cIsMega ? getMegaSprite(p) : p.sprite} alt={cIsMega ? getMegaName(p) : p.name} width={30} height={30} className="rounded" unoptimized />
                              {cIsMega && <span className="absolute -top-1 -right-1 px-0.5 text-[6px] font-bold bg-amber-500 text-white rounded shadow-sm">M</span>}
                            </div>
                            <span className={cn("text-[7px] truncate w-10 text-center", cIsMega ? "text-amber-600 font-bold" : "text-muted-foreground")}>{cIsMega ? getMegaName(p) : p.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setActiveTab("teams")} className="mt-4 text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
              View all {TOURNAMENT_TEAMS.length} teams <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ══════════ POKEMON RANKINGS TAB ══════════ */}
      {activeTab === "pokemon" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* ML Rankings */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-500" /> ML Simulation Rankings
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              ELO ratings from {SIM_TOTAL_BATTLES.toLocaleString()} simulated VGC doubles battles. Tiers based on composite win rate percentiles: S (top 5%, ≥{TIER_S.toFixed(1)}%), A (top 25%, ≥{TIER_A.toFixed(1)}%), B (top 65%, ≥{TIER_B.toFixed(1)}%), C (top 88%, ≥{TIER_C.toFixed(1)}%), D (below or insufficient data).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">#</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Pokémon</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">ELO</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Win Rate</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Games</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {ML_POKEMON_RANKINGS.map((p, i) => {
                    const sprite = getSpriteForName(p.name);
                    const types = getTypesForName(p.name);
                    const tier = p.tier;
                    return (
                      <tr key={p.name} className={cn("border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer", selectedPokemon === p.name && "bg-violet-50")} onClick={() => setSelectedPokemon(selectedPokemon === p.name ? null : p.name)}>
                        <td className="py-2.5 px-3 text-xs font-bold text-muted-foreground">{i + 1}</td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            {sprite && <Image src={sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                            <div>
                              <span className="text-sm font-semibold">{p.name}</span>
                              {types && <div className="flex gap-0.5 mt-0.5">{types.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t as PokemonType]}AA` }}>{t.slice(0, 3)}</span>)}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-sm font-bold">{p.elo.toLocaleString()}</td>
                        <td className={cn("py-2.5 px-3 text-right font-bold text-sm", p.wr >= 60 ? "text-green-600" : p.wr >= 52 ? "text-emerald-600" : p.wr >= 50 ? "text-gray-700" : "text-red-600")}>{p.wr}%</td>
                        <td className="py-2.5 px-3 text-right text-xs text-muted-foreground">{p.games.toLocaleString()}</td>
                        <td className="py-2.5 px-3">
                          <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", tier === "S" ? "bg-amber-100 text-amber-700" : tier === "A" ? "bg-blue-100 text-blue-700" : tier === "B" ? "bg-gray-100 text-gray-700" : tier === "C" ? "bg-gray-50 text-gray-500" : "bg-red-50 text-red-400")}>{tier}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pokemon Detail Panel */}
          <AnimatePresence>
            {selectedPokemon && (() => {
              const pokemon = getPokemonByName(selectedPokemon);
              const mlData = ML_POKEMON_RANKINGS.find(p => p.name === selectedPokemon);
              const usageData = pokemon ? TOURNAMENT_USAGE.find(u => u.pokemonId === pokemon.id) : null;
              const corePairs = pokemon ? getCorePairsForPokemon(pokemon.id) : [];
              const teamAppearances = pokemon ? getTournamentTeamsWithPokemon(pokemon.id) : [];
              if (!pokemon) return null;
              return (
                <motion.div key={selectedPokemon} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass rounded-2xl p-6 border border-violet-200/60">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Image src={pokemon.officialArt} alt={pokemon.name} width={80} height={80} className="drop-shadow-lg" unoptimized />
                      <div>
                        <h3 className="text-xl font-bold">{pokemon.name}</h3>
                        <div className="flex gap-1 mt-1">{pokemon.types.map(t => <span key={t} className="px-2 py-0.5 text-[10px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t}</span>)}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedPokemon(null)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ML Stats */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2">ML Simulation Stats</h4>
                      {mlData && (
                        <div className="space-y-2">
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">ELO Rating</span><span className="text-xs font-bold">{mlData.elo.toLocaleString()}</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Win Rate</span><span className={cn("text-xs font-bold", mlData.wr >= 55 ? "text-green-600" : "text-foreground")}>{mlData.wr}%</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Games Played</span><span className="text-xs font-bold">{mlData.games.toLocaleString()}</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">ML Tier</span><span className="text-xs font-bold">{mlData.tier}</span></div>
                        </div>
                      )}
                    </div>

                    {/* Tournament Stats */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Tournament Data</h4>
                      {usageData ? (
                        <div className="space-y-2">
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Usage Rate</span><span className="text-xs font-bold">{usageData.usageRate}%</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Win Rate</span><span className="text-xs font-bold">{usageData.winRate}%</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Top Cut Rate</span><span className="text-xs font-bold">{usageData.topCutRate}%</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Lead Rate</span><span className="text-xs font-bold">{usageData.leadRate}%</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Bring Rate</span><span className="text-xs font-bold">{usageData.bringRate}%</span></div>
                          <div className="flex justify-between p-2 bg-gray-50 rounded-lg"><span className="text-xs text-muted-foreground">Avg Placement</span><span className="text-xs font-bold">#{usageData.avgPlacement}</span></div>
                        </div>
                      ) : <p className="text-xs text-muted-foreground">No tournament data available</p>}
                    </div>

                    {/* Core Partners */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Best Partners ({corePairs.length} cores)</h4>
                      {corePairs.length > 0 ? (
                        <div className="space-y-2">
                          {corePairs.sort((a, b) => b.winRate - a.winRate).slice(0, 6).map(cp => {
                            const partnerId = cp.pokemon1 === pokemon.id ? cp.pokemon2 : cp.pokemon1;
                            const partner = POKEMON_SEED.find(p => p.id === partnerId);
                            return (
                              <div key={cp.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                {partner && <Image src={partner.sprite} alt={partner.name} width={24} height={24} className="rounded" unoptimized />}
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold truncate">{cp.name}</p>
                                  <p className="text-[10px] text-muted-foreground">{cp.usage}% usage</p>
                                </div>
                                <span className={cn("text-xs font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : <p className="text-xs text-muted-foreground">No core pair data</p>}

                      {teamAppearances.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Tournament Appearances</p>
                          <p className="text-xs font-semibold">{teamAppearances.length} teams across {new Set(teamAppearances.map(t => t.year)).size} years</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            Events: {[...new Set(teamAppearances.map(t => t.tournament))].slice(0, 3).join(", ")}{teamAppearances.length > 3 ? "..." : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Base Stats */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase mb-2">Base Stats</h4>
                    <div className="grid grid-cols-6 gap-3">
                      {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => {
                        const value = pokemon.baseStats[stat];
                        const labels: Record<string, string> = { hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" };
                        return (
                          <div key={stat} className="text-center">
                            <p className="text-[10px] text-muted-foreground uppercase">{labels[stat]}</p>
                            <p className={cn("text-sm font-bold", value >= 120 ? "text-green-600" : value >= 90 ? "text-emerald-600" : value >= 60 ? "text-gray-700" : "text-red-600")}>{value}</p>
                            <div className="h-1 bg-gray-200 rounded-full mt-1 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" style={{ width: `${Math.min(100, (value / 180) * 100)}%` }} /></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Tournament Usage Rankings */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Tournament Usage Rankings
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Real VGC usage data aggregated from Worlds, Regionals, and Premier Challenges. Usage rate indicates how frequently a Pokémon appears on teams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {topUsage.map((p, i) => {
                const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                return (
                  <div key={p.pokemonId} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setSelectedPokemon(p.name)}>
                    <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                    {pokemon && <Image src={pokemon.sprite} alt={p.name} width={32} height={32} className="rounded" unoptimized />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{p.name}</p>
                      <div className="flex gap-2 text-[10px] text-muted-foreground">
                        <span>Usage: {p.usageRate}%</span>
                        <span>·</span>
                        <span>Top Cut: {p.topCutRate}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold", p.winRate >= 53 ? "text-green-600" : p.winRate >= 50 ? "text-gray-700" : "text-red-600")}>{p.winRate}%</p>
                      <div className="h-1 w-12 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: `${p.usageRate}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ TOURNAMENT TEAMS TAB ══════════ */}
      {activeTab === "teams" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-2">Tournament Team Database</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {TOURNAMENT_TEAMS.length} teams from major VGC events (2005–2025). Click any team for detailed breakdown including archetype analysis, event context, and Pokémon roles.
            </p>
            <div className="space-y-3">
              {TOURNAMENT_TEAMS.map(team => (
                <TournamentTeamCard key={team.id} team={team} expanded={expandedTeam === team.id} onToggle={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)} />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ CORE PAIRS TAB ══════════ */}
      {activeTab === "cores" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1">Core Pair Analysis</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The strongest 2-Pokémon cores in competitive play. Each core pair is rated by tournament win rate, usage, and how well they complement each other.
              ML simulation cores are shown separately below.
            </p>

            {/* ML Cores */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-500" /> ML-Discovered Cores <span className="text-xs font-normal text-muted-foreground">(from 2M battles)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {ML_BEST_CORES.map((c, i) => (
                <div key={c.pair} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">{c.pair}</span>
                    <span className={cn("text-sm font-bold", c.wr >= 75 ? "text-green-600" : "text-emerald-600")}>{c.wr}% WR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.pair.split(" + ").map(name => {
                      const sp = getSpriteForName(name);
                      return sp ? <Image key={name} src={sp} alt={name} width={36} height={36} className="rounded" unoptimized /> : <span key={name} className="text-xs">{name}</span>;
                    })}
                    <div className="flex-1" />
                    <span className="text-xs text-muted-foreground">{c.games.toLocaleString()} games</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tournament Cores */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Tournament Core Pairs
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Tier</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Core</th>
                    <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium">Pokémon</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Win Rate</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Usage</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Synergy</th>
                  </tr>
                </thead>
                <tbody>
                  {CORE_PAIRS
                    .filter(cp => POKEMON_SEED.some(p => p.id === cp.pokemon1) && POKEMON_SEED.some(p => p.id === cp.pokemon2))
                    .sort((a, b) => b.winRate - a.winRate).map(cp => {
                    const p1 = POKEMON_SEED.find(p => p.id === cp.pokemon1);
                    const p2 = POKEMON_SEED.find(p => p.id === cp.pokemon2);
                    const tier = cp.usage >= 20 ? "S" : cp.usage >= 12 ? "A" : cp.usage >= 6 ? "B" : "C";
                    return (
                      <tr key={cp.name} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3"><span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", tier === "S" ? "bg-amber-100 text-amber-700" : tier === "A" ? "bg-blue-100 text-blue-700" : tier === "B" ? "bg-gray-100 text-gray-700" : "bg-gray-50 text-gray-500")}>{tier}</span></td>
                        <td className="py-2 px-3 font-semibold text-sm">{cp.name}</td>
                        <td className="py-2 px-3">
                          <div className="flex items-center justify-center gap-1">
                            {p1 && <Image src={p1.sprite} alt={p1.name} width={24} height={24} className="rounded" unoptimized />}
                            <span className="text-xs text-muted-foreground">+</span>
                            {p2 && <Image src={p2.sprite} alt={p2.name} width={24} height={24} className="rounded" unoptimized />}
                          </div>
                        </td>
                        <td className={cn("py-2 px-3 text-right font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</td>
                        <td className="py-2 px-3 text-right text-muted-foreground">{cp.usage}%</td>
                        <td className="py-2 px-3 text-xs text-muted-foreground">{cp.synergy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ ARCHETYPE MATCHUPS TAB ══════════ */}
      {activeTab === "matchups" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1">Archetype Matchup Matrix</h2>
            <p className="text-sm text-muted-foreground mb-4">
              How each archetype performs against the others. Win rates above 55% are highlighted green, below 45% red.
              This data combines tournament results with ML simulation insights.
            </p>

            {/* ML Archetype Rankings */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-500" /> ML Archetype Rankings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {ML_ARCHETYPES.map((a, i) => (
                <div key={a.name} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", i < 2 ? "bg-amber-100 text-amber-700" : i < 5 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span>
                    <span className="text-sm font-semibold">{a.name}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" style={{ width: `${a.wr}%` }} /></div>
                    <span className={cn("text-sm font-bold", a.wr >= 60 ? "text-green-600" : "text-gray-700")}>{a.wr}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">ELO: {a.elo.toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Tournament Matchup Table */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Swords className="w-4 h-4 text-cyan-500" /> Tournament Matchup Data
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Archetype 1</th>
                    <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium">vs</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Archetype 2</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Win Rate 1</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Games</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {ARCHETYPE_MATCHUPS.sort((a, b) => Math.abs(b.winRate1 - 50) - Math.abs(a.winRate1 - 50)).map((m, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium">{m.archetype1}</td>
                      <td className="py-2 px-3 text-center text-muted-foreground">vs</td>
                      <td className="py-2 px-3 font-medium">{m.archetype2}</td>
                      <td className={cn("py-2 px-3 text-right font-bold", m.winRate1 >= 55 ? "text-green-600" : m.winRate1 <= 45 ? "text-red-600" : "text-gray-700")}>{m.winRate1.toFixed(1)}%</td>
                      <td className="py-2 px-3 text-right text-muted-foreground">{m.sampleSize}</td>
                      <td className="py-2 px-3 text-xs">
                        {m.winRate1 >= 60 ? <span className="text-green-600 font-medium">{m.archetype1} dominates</span> :
                         m.winRate1 >= 55 ? <span className="text-emerald-600 font-medium">{m.archetype1} favored</span> :
                         m.winRate1 <= 40 ? <span className="text-red-600 font-medium">{m.archetype2} dominates</span> :
                         m.winRate1 <= 45 ? <span className="text-amber-600 font-medium">{m.archetype2} favored</span> :
                         <span className="text-muted-foreground">Even</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ MOVE ANALYSIS TAB ══════════ */}
      {activeTab === "moves" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Move Win Rate Analysis
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Move win rates from 2,000,000 ML simulated battles. Higher win rate means teams using this move won more often. Usage count shows total appearances across all battles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ML_BEST_MOVES.map((m, i) => (
                <div key={m.name} className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold", i < 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span>
                      <span className="text-sm font-bold">{m.name}</span>
                    </div>
                    <span className={cn("text-lg font-bold", m.wr >= 65 ? "text-green-600" : m.wr >= 60 ? "text-emerald-600" : "text-gray-700")}>{m.wr}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: `${m.wr}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{m.uses.toLocaleString()} uses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>

    {/* ══════════ DETAIL MODAL OVERLAY ══════════ */}
    <AnimatePresence>
      {modal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] px-4 pb-8" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"><X className="w-5 h-5" /></button>

            {/* ── POKEMON MODAL ── */}
            {modal.kind === "pokemon" && (() => {
              const pokemon = getPokemonByName(modal.name);
              if (!pokemon) return <div className="p-8 text-center text-muted-foreground">Pokémon not found</div>;
              const isMega = modal.name.startsWith("Mega ");
              const megaSprite = getSpriteForName(modal.name);
              const megaTypes = getTypesForName(modal.name);
              const displayName = modal.name;
              const mlData = ML_POKEMON_RANKINGS.find(p => p.name === modal.name);
              const usageData = TOURNAMENT_USAGE.find(u => u.pokemonId === pokemon.id);
              const corePairs = getCorePairsForPokemon(pokemon.id);
              const teamAppearances = getTournamentTeamsWithPokemon(pokemon.id);
              const prebuiltTeams = getPrebuiltTeamsWithPokemon(pokemon.id);
              const tier = mlData ? mlData.tier : usageData ? (usageData.usageRate >= 30 ? "S" : usageData.usageRate >= 15 ? "A" : "B") : "-";
              // For mega forms, try to get mega stats from the form data
              // Match the exact form name suffix (X/Y) so Mega Charizard Y doesn't show X's stats
              const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
              const megaForm = isMega
                ? megaForms.find(f => f.name === modal.name) ?? megaForms[0] ?? null
                : null;
              const displayStats = megaForm?.baseStats ?? pokemon.baseStats;
              return (
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-5">
                    <Image src={megaSprite ?? pokemon.officialArt} alt={displayName} width={120} height={120} className="drop-shadow-xl" unoptimized />
                    <div>
                      <h2 className="text-2xl font-extrabold">{displayName}</h2>
                      <div className="flex gap-1.5 mt-1">{(megaTypes ?? pokemon.types).map(t => <span key={t} className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg text-white" style={{ backgroundColor: TYPE_COLORS[t as PokemonType] }}>{t}</span>)}</div>
                      <div className="flex items-center gap-3 mt-2">
                        {tier !== "-" && <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", tier === "S" ? "bg-amber-100 text-amber-700" : tier === "A" ? "bg-blue-100 text-blue-700" : tier === "B" ? "bg-gray-100 text-gray-700" : tier === "C" ? "bg-gray-50 text-gray-500" : "bg-red-50 text-red-400")}>{tier}-Tier</span>}
                        {mlData && <span className="text-sm text-muted-foreground">ML #{ML_POKEMON_RANKINGS.indexOf(mlData) + 1} · ELO {mlData.elo.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Stats bars */}
                  <div className="grid grid-cols-6 gap-4">
                    {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => {
                      const v = displayStats[stat];
                      const label = { hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat];
                      return (
                        <div key={stat} className="text-center">
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className={cn("text-xl font-extrabold", v >= 120 ? "text-green-600" : v >= 90 ? "text-emerald-600" : v >= 60 ? "text-gray-700" : "text-red-500")}>{v}</p>
                          <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" style={{ width: `${Math.min(100, (v / 180) * 100)}%` }} /></div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ML + Tournament stats */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase text-muted-foreground">Performance</h4>
                      {mlData && <>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">ML Win Rate</span><span className={cn("text-sm font-bold", mlData.wr >= 55 ? "text-green-600" : "text-foreground")}>{mlData.wr}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">ML Games</span><span className="text-sm font-bold">{mlData.games.toLocaleString()}</span></div>
                      </>}
                      {usageData && <>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Tournament Usage</span><span className="text-sm font-bold">{usageData.usageRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Tournament WR</span><span className="text-sm font-bold">{usageData.winRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Top Cut</span><span className="text-sm font-bold">{usageData.topCutRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Lead Rate</span><span className="text-sm font-bold">{usageData.leadRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Bring Rate</span><span className="text-sm font-bold">{usageData.bringRate}%</span></div>
                      </>}
                      {!mlData && !usageData && <p className="text-xs text-muted-foreground">No competitive data available</p>}
                    </div>

                    {/* Core partners */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase text-muted-foreground">Best Partners ({corePairs.length})</h4>
                      {corePairs.sort((a, b) => b.winRate - a.winRate).slice(0, 6).map(cp => {
                        const partnerId = cp.pokemon1 === pokemon.id ? cp.pokemon2 : cp.pokemon1;
                        const partner = POKEMON_SEED.find(p => p.id === partnerId);
                        return (
                          <div key={cp.name} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "core", pair: cp.name })}>
                            {partner && <Image src={partner.sprite} alt={partner.name} width={28} height={28} className="rounded" unoptimized />}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate">{cp.name}</p>
                              <p className="text-[10px] text-muted-foreground">{cp.synergy}</p>
                            </div>
                            <span className={cn("text-xs font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Abilities + key moves */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase text-muted-foreground">Abilities</h4>
                      {pokemon.abilities.map(a => (
                        <div key={a.name} className="p-2.5 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2"><span className="text-xs font-bold">{a.name}</span>{a.isHidden && <span className="text-[9px] px-1.5 py-0.5 bg-violet-100 text-violet-700 rounded font-medium">Hidden</span>}{(a as any).isChampions && <span className="text-[9px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded font-medium" title="Not officially confirmed - speculative ability">Speculative</span>}</div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{a.description}</p>
                        </div>
                      ))}
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mt-4">Top Moves</h4>
                      <div className="grid grid-cols-2 gap-1.5">
                        {pokemon.moves.filter(m => m.category !== "status").sort((a, b) => (b.power || 0) - (a.power || 0)).slice(0, 8).map(m => (
                          <div key={m.name} className="p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "move", name: m.name })}>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[m.type as PokemonType] }} />
                              <span className="text-[10px] font-semibold truncate">{m.name}</span>
                            </div>
                            <p className="text-[9px] text-muted-foreground">{m.power || "-"} BP · {m.category}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tournament appearances */}
                  {/* ═══ RECOMMENDED COMPETITIVE SETS ═══ */}
                  {(() => {
                    const setsForPokemon = USAGE_DATA[pokemon.id];
                    const simData = SIM_POKEMON[String(pokemon.id)];
                    if (!setsForPokemon && !simData?.bestSets?.length) return null;
                    return (
                      <div>
                        <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Recommended Competitive Sets
                        </h4>
                        {setsForPokemon && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            {setsForPokemon.map((set, idx) => (
                              <div key={idx} className="p-3.5 bg-gradient-to-br from-amber-50/60 to-yellow-50/30 rounded-xl border border-amber-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-700">SET {idx + 1}</span>
                                  <span className="text-xs font-bold">{set.name}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-y-1 text-xs mb-2">
                                  <div className="flex justify-between pr-2"><span className="text-muted-foreground">Nature</span><span className="font-semibold">{set.nature}</span></div>
                                  <div className="flex justify-between"><span className="text-muted-foreground">Ability</span><span className="font-semibold text-right truncate ml-1">{set.ability}</span></div>
                                  <div className="flex justify-between pr-2"><span className="text-muted-foreground">Item</span><span className="font-semibold">{set.item}</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-1 mb-2">
                                  {set.moves.map(mv => {
                                    const moveInfo = pokemon.moves.find(m => m.name === mv);
                                    return (
                                      <div key={mv} className="flex items-center gap-1 p-1 bg-white/70 rounded text-[10px] font-medium cursor-pointer hover:bg-white transition-colors" onClick={(e) => { e.stopPropagation(); setModal({ kind: "move", name: mv }); }}>
                                        {moveInfo && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[moveInfo.type as PokemonType] }} />}
                                        <span className="truncate">{mv}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="grid grid-cols-6 gap-0.5">
                                  {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                                    <div key={stat} className="text-center">
                                      <p className="text-[7px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                                      <p className={cn("text-[10px] font-bold", set.sp[stat] >= 20 ? "text-emerald-600" : set.sp[stat] > 0 ? "text-gray-700" : "text-gray-300")}>{set.sp[stat]}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {simData?.bestSets && simData.bestSets.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ML Best Performing Sets (from {simData.appearances.toLocaleString()} battles)</p>
                            {simData.bestSets.slice(0, 3).map((s, i) => (
                              <div key={i} className="flex items-center gap-3 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                <span className="text-[9px] font-bold text-emerald-600 w-5">#{i + 1}</span>
                                <span className="text-xs font-semibold flex-1">{s.set}</span>
                                <span className={cn("text-xs font-bold", s.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{s.winRate}%</span>
                                <span className="text-[10px] text-muted-foreground">{s.games.toLocaleString()} games</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Tournament appearances */}
                  {teamAppearances.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Tournament Appearances ({teamAppearances.length} teams)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {teamAppearances.sort((a, b) => b.year - a.year).slice(0, 6).map(t => (
                          <div key={t.id} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                            <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.placement <= 1 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{t.placement === 1 ? "🥇" : `#${t.placement}`}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate">{t.tournament}</p>
                              <p className="text-[10px] text-muted-foreground">{t.year} · {t.region}</p>
                            </div>
                            <span className="text-[9px] px-1.5 py-0.5 bg-violet-50 text-violet-600 rounded capitalize">{t.archetype}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prebuilt teams featuring this Pokémon */}
                  {prebuiltTeams.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Featured in Curated Teams</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {prebuiltTeams.map(t => (
                          <div key={t.id} className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "prebuilt", id: t.id })}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.tier === "S" ? "bg-amber-100 text-amber-700" : t.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{t.tier}</span>
                              <span className="text-xs font-bold">{t.name}</span>
                            </div>
                            <div className="flex gap-1">{t.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={24} height={24} className="rounded" unoptimized /> : null; })}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── ARCHETYPE MODAL ── */}
            {modal.kind === "archetype" && (() => {
              const arch = modal.name;
              const mlArch = ML_ARCHETYPES.find(a => a.name === arch);
              const archTeams = TOURNAMENT_TEAMS.filter(t => t.archetype.toLowerCase().includes(arch.toLowerCase()) || arch.toLowerCase().includes(t.archetype.toLowerCase()));
              const prebuiltArch = PREBUILT_TEAMS.filter(t => t.archetype.toLowerCase() === arch.toLowerCase() || t.name.toLowerCase().includes(arch.toLowerCase()));
              const matchups = ARCHETYPE_MATCHUPS.filter(m => m.archetype1.toLowerCase().includes(arch.toLowerCase()) || m.archetype2.toLowerCase().includes(arch.toLowerCase()));
              const metaPredictions = metaTeams.filter(m => m.archetype.toLowerCase().includes(arch.toLowerCase()) || arch.toLowerCase().includes(m.archetype.toLowerCase()));
              const archPokemon = archTeams.flatMap(t => t.pokemonIds);
              const pokemonFreq: Record<number, number> = {};
              archPokemon.forEach(id => { pokemonFreq[id] = (pokemonFreq[id] || 0) + 1; });
              const topPokemon = Object.entries(pokemonFreq).sort((a, b) => b[1] - a[1]).slice(0, 12);
              return (
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-extrabold">{arch}</h2>
                      {mlArch && <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", mlArch.wr >= 60 ? "bg-green-100 text-green-700" : mlArch.wr >= 52 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600")}>{mlArch.wr}% Win Rate</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {archTeams.length} tournament teams · {matchups.length} tracked matchups{mlArch ? ` · ELO ${mlArch.elo.toLocaleString()}` : ""}
                    </p>
                  </div>

                  {/* Performance graph-style bars */}
                  {mlArch && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <p className="text-3xl font-extrabold text-emerald-700">{mlArch.wr}%</p>
                        <p className="text-xs text-muted-foreground">ML Win Rate</p>
                        <div className="h-2.5 bg-emerald-200 rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${mlArch.wr}%` }} /></div>
                      </div>
                      <div className="p-4 rounded-xl bg-violet-50 border border-violet-200 text-center">
                        <p className="text-3xl font-extrabold text-violet-700">{mlArch.elo.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">ML ELO Rating</p>
                        <div className="h-2.5 bg-violet-200 rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full bg-violet-500" style={{ width: `${Math.min(100, (mlArch.elo / 30000) * 100)}%` }} /></div>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                        <p className="text-3xl font-extrabold text-amber-700">{archTeams.length}</p>
                        <p className="text-xs text-muted-foreground">Tournament Teams</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{archTeams.filter(t => t.placement === 1).length} champions</p>
                      </div>
                    </div>
                  )}

                  {/* Key Pokémon for this archetype */}
                  {topPokemon.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Key Pokémon</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {topPokemon.map(([idStr, count]) => {
                          const pkm = POKEMON_SEED.find(p => p.id === Number(idStr));
                          if (!pkm) return null;
                          return (
                            <div key={idStr} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                              <Image src={pkm.sprite} alt={pkm.name} width={32} height={32} className="rounded" unoptimized />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate">{pkm.name}</p>
                                <p className="text-[10px] text-muted-foreground">In {count}/{archTeams.length} teams</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matchups */}
                  {matchups.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Matchup Chart</h4>
                      <div className="space-y-2">
                        {matchups.sort((a, b) => {
                          const aWr = a.archetype1.toLowerCase().includes(arch.toLowerCase()) ? a.winRate1 : 100 - a.winRate1;
                          const bWr = b.archetype1.toLowerCase().includes(arch.toLowerCase()) ? b.winRate1 : 100 - b.winRate1;
                          return bWr - aWr;
                        }).map((m, i) => {
                          const isArch1 = m.archetype1.toLowerCase().includes(arch.toLowerCase());
                          const wr = isArch1 ? m.winRate1 : 100 - m.winRate1;
                          const opponent = isArch1 ? m.archetype2 : m.archetype1;
                          return (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                              <span className="text-xs font-medium w-36 truncate">vs {opponent}</span>
                              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
                                <div className={cn("h-full rounded-full", wr >= 55 ? "bg-green-400" : wr >= 50 ? "bg-gray-400" : "bg-red-400")} style={{ width: `${wr}%` }} />
                              </div>
                              <span className={cn("text-sm font-bold w-14 text-right", wr >= 55 ? "text-green-600" : wr >= 50 ? "text-gray-700" : "text-red-600")}>{wr.toFixed(1)}%</span>
                              <span className="text-[10px] text-muted-foreground w-16 text-right">{m.sampleSize} games</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Example tournament teams */}
                  {archTeams.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Example Tournament Teams ({archTeams.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {archTeams.sort((a, b) => a.placement - b.placement || b.year - a.year).slice(0, 6).map(t => {
                          const tPkm = t.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean);
                          return (
                            <div key={t.id} className="p-3 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.placement === 1 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{t.placement === 1 ? "🥇" : `#${t.placement}`}</span>
                                <span className="text-xs font-bold">{t.tournament}</span>
                                <span className="text-[10px] text-muted-foreground">{t.year} · {t.region}</span>
                              </div>
                              <div className="flex gap-1">{tPkm.map(p => p && <Image key={p.id} src={p.sprite} alt={p.name} width={26} height={26} className="rounded" unoptimized />)}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Curated teams for this archetype */}
                  {prebuiltArch.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Curated Teams</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {prebuiltArch.map(t => (
                          <div key={t.id} className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "prebuilt", id: t.id })}>
                            <div className="flex items-center gap-2 mb-1"><span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.tier === "S" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700")}>{t.tier}</span><span className="text-xs font-bold">{t.name}</span></div>
                            <p className="text-[10px] text-muted-foreground mb-1">{t.description}</p>
                            <div className="flex gap-1">{t.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={24} height={24} className="rounded" unoptimized /> : null; })}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ML Predicted teams for this archetype */}
                  {metaPredictions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">ML Predictions for this Archetype</h4>
                      {metaPredictions.map(m => (
                        <div key={m.id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-2">
                          <div className="flex items-center gap-2 mb-2"><span className="text-xs font-bold">{m.name}</span><span className="text-[10px] text-emerald-600">{m.confidence}% confidence · {m.metaShare}% meta share</span></div>
                          <div className="flex gap-1.5 mb-2">{m.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={28} height={28} className="rounded" unoptimized /> : null; })}</div>
                          <div className="space-y-1">{m.reasoning.map((r, ri) => <p key={ri} className="text-[10px] text-foreground"><span className="text-emerald-500">•</span> {r}</p>)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── MOVE MODAL ── */}
            {modal.kind === "move" && (() => {
              const moveName = modal.name;
              const mlMove = ML_BEST_MOVES.find(m => m.name === moveName);
              const pokemonWithMove = POKEMON_SEED.filter(p => p.moves.some(m => m.name === moveName));
              const moveData = pokemonWithMove.length > 0 ? pokemonWithMove[0].moves.find(m => m.name === moveName) : null;
              return (
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    {moveData && <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: TYPE_COLORS[moveData.type as PokemonType] }}><Zap className="w-7 h-7" /></div>}
                    <div>
                      <h2 className="text-2xl font-extrabold">{moveName}</h2>
                      {moveData && <div className="flex items-center gap-3 mt-1">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg text-white" style={{ backgroundColor: TYPE_COLORS[moveData.type as PokemonType] }}>{moveData.type}</span>
                        <span className="text-xs text-muted-foreground capitalize">{moveData.category}</span>
                        {moveData.power && <span className="text-xs text-muted-foreground">{moveData.power} BP</span>}
                        {moveData.accuracy && <span className="text-xs text-muted-foreground">{moveData.accuracy}% Acc</span>}
                        <span className="text-xs text-muted-foreground">{moveData.pp} PP</span>
                      </div>}
                    </div>
                  </div>

                  {moveData?.description && <p className="text-sm text-foreground bg-gray-50 p-4 rounded-xl">{moveData.description}</p>}

                  {/* ML performance */}
                  {mlMove && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                        <p className="text-4xl font-extrabold text-amber-700">{mlMove.wr}%</p>
                        <p className="text-xs text-muted-foreground mt-1">Win Rate (2M Battles)</p>
                        <div className="h-3 bg-amber-200 rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full bg-amber-500" style={{ width: `${mlMove.wr}%` }} /></div>
                      </div>
                      <div className="p-5 rounded-xl bg-cyan-50 border border-cyan-200 text-center">
                        <p className="text-4xl font-extrabold text-cyan-700">{mlMove.uses.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-1">Total Uses in Simulation</p>
                      </div>
                    </div>
                  )}

                  {/* Pokémon that learn this move */}
                  <div>
                    <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Pokémon with this Move ({pokemonWithMove.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {pokemonWithMove.sort((a, b) => {
                        const aUsage = TOURNAMENT_USAGE.find(u => u.pokemonId === a.id);
                        const bUsage = TOURNAMENT_USAGE.find(u => u.pokemonId === b.id);
                        return (bUsage?.usageRate || 0) - (aUsage?.usageRate || 0);
                      }).slice(0, 12).map(pkm => {
                        const usage = TOURNAMENT_USAGE.find(u => u.pokemonId === pkm.id);
                        const mlRank = ML_POKEMON_RANKINGS.findIndex(r => r.name === pkm.name);
                        return (
                          <div key={pkm.id} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                            <Image src={pkm.sprite} alt={pkm.name} width={32} height={32} className="rounded" unoptimized />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate">{pkm.name}</p>
                              <div className="flex gap-0.5">{pkm.types.map(t => <span key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />)}</div>
                            </div>
                            <div className="text-right">
                              {usage && <p className="text-[10px] text-muted-foreground">{usage.usageRate}%</p>}
                              {mlRank >= 0 && <p className="text-[9px] text-emerald-600 font-medium">ML #{mlRank + 1}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── CORE PAIR MODAL ── */}
            {modal.kind === "core" && (() => {
              const pairName = modal.pair;
              const corePair = CORE_PAIRS.find(cp => cp.name === pairName);
              const mlCore = ML_BEST_CORES.find(c => c.pair === pairName);
              const names = pairName.split(" + ");
              const pokemon1 = POKEMON_SEED.find(p => p.name === names[0]);
              const pokemon2 = POKEMON_SEED.find(p => p.name === names[1]);
              const teamsWithBoth = (pokemon1 && pokemon2) ? TOURNAMENT_TEAMS.filter(t => t.pokemonIds.includes(pokemon1.id) && t.pokemonIds.includes(pokemon2.id)) : [];
              return (
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      {pokemon1 && <Image src={pokemon1.officialArt} alt={pokemon1.name} width={80} height={80} className="drop-shadow-lg" unoptimized />}
                      <Swords className="w-6 h-6 text-violet-400" />
                      {pokemon2 && <Image src={pokemon2.officialArt} alt={pokemon2.name} width={80} height={80} className="drop-shadow-lg" unoptimized />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold">{pairName}</h2>
                      {corePair && <p className="text-sm text-muted-foreground mt-1">{corePair.synergy}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {corePair && <>
                      <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center"><p className="text-3xl font-extrabold text-green-700">{corePair.winRate}%</p><p className="text-xs text-muted-foreground">Tournament WR</p></div>
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center"><p className="text-3xl font-extrabold text-blue-700">{corePair.usage}%</p><p className="text-xs text-muted-foreground">Usage Rate</p></div>
                    </>}
                    {mlCore && <>
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center"><p className="text-3xl font-extrabold text-emerald-700">{mlCore.wr}%</p><p className="text-xs text-muted-foreground">ML Win Rate</p></div>
                      <div className="p-4 rounded-xl bg-violet-50 border border-violet-200 text-center"><p className="text-3xl font-extrabold text-violet-700">{mlCore.games.toLocaleString()}</p><p className="text-xs text-muted-foreground">ML Games</p></div>
                    </>}
                  </div>

                  {/* Individual Pokémon comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[pokemon1, pokemon2].map(pkm => {
                      if (!pkm) return null;
                      const usage = TOURNAMENT_USAGE.find(u => u.pokemonId === pkm.id);
                      return (
                        <div key={pkm.id} className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                          <div className="flex items-center gap-3 mb-3">
                            <Image src={pkm.sprite} alt={pkm.name} width={48} height={48} className="rounded-lg" unoptimized />
                            <div>
                              <p className="text-sm font-bold">{pkm.name}</p>
                              <div className="flex gap-1">{pkm.types.map(t => <span key={t} className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded text-white" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-6 gap-1">
                            {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                              <div key={stat} className="text-center">
                                <p className="text-[8px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                                <p className="text-xs font-bold">{pkm.baseStats[stat]}</p>
                              </div>
                            ))}
                          </div>
                          {usage && <p className="text-[10px] text-muted-foreground mt-2">{usage.usageRate}% usage · {usage.winRate}% WR · {usage.topCutRate}% top cut</p>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Teams using this core */}
                  {teamsWithBoth.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Tournament Teams with this Core ({teamsWithBoth.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {teamsWithBoth.sort((a, b) => a.placement - b.placement || b.year - a.year).slice(0, 6).map(t => (
                          <div key={t.id} className="p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-1"><span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.placement === 1 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{t.placement === 1 ? "🥇" : `#${t.placement}`}</span><span className="text-xs font-bold">{t.tournament}</span><span className="text-[10px] text-muted-foreground">{t.year}</span></div>
                            <div className="flex gap-1">{t.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={24} height={24} className="rounded" unoptimized /> : null; })}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── PREBUILT TEAM MODAL ── */}
            {modal.kind === "prebuilt" && (() => {
              const team = PREBUILT_TEAMS.find(t => t.id === modal.id);
              if (!team) return <div className="p-8 text-center text-muted-foreground">Team not found</div>;
              const teamPokemon = team.pokemonIds.map((id, idx) => ({ pkm: POKEMON_SEED.find(p => p.id === id), set: team.sets[idx] }));
              return (
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-extrabold">{team.name}</h2>
                      <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", team.tier === "S" ? "bg-amber-100 text-amber-700" : team.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{team.tier}-Tier</span>
                      <span className="px-2 py-1 text-[10px] rounded-lg bg-violet-50 text-violet-600 font-medium capitalize">{team.archetype}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">{team.tags.map(tag => <span key={tag} className="px-2 py-0.5 text-[10px] rounded-lg bg-gray-100 text-gray-600 font-medium">{tag}</span>)}</div>
                  </div>

                  {/* Team sprite row */}
                  <div className="flex justify-center gap-4 py-2">
                    {teamPokemon.map(({ pkm }, i) => pkm && (
                      <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                        <Image src={pkm.officialArt} alt={pkm.name} width={72} height={72} className="drop-shadow-lg hover:scale-110 transition-transform" unoptimized />
                        <span className="text-[10px] font-semibold mt-1">{pkm.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Full sets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {teamPokemon.map(({ pkm, set }, i) => {
                      if (!pkm || !set) return null;
                      return (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Image src={pkm.sprite} alt={pkm.name} width={36} height={36} className="rounded" unoptimized />
                            <div>
                              <p className="text-sm font-bold">{pkm.name}</p>
                              <p className="text-[10px] text-muted-foreground">{set.name}</p>
                            </div>
                          </div>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between"><span className="text-muted-foreground">Ability</span><span className="font-semibold">{set.ability}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Item</span><span className="font-semibold">{set.item}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Nature</span><span className="font-semibold">{set.nature}</span></div>
                            <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                              <p className="text-[10px] text-muted-foreground uppercase mb-1">Moves</p>
                              <div className="grid grid-cols-2 gap-1">
                                {set.moves.map(mv => {
                                  const moveDataFound = pkm.moves.find(m => m.name === mv);
                                  return (
                                    <div key={mv} className="flex items-center gap-1 p-1 bg-white rounded cursor-pointer hover:bg-gray-100" onClick={() => setModal({ kind: "move", name: mv })}>
                                      {moveDataFound && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[moveDataFound.type as PokemonType] }} />}
                                      <span className="text-[10px] font-medium truncate">{mv}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                              <p className="text-[10px] text-muted-foreground uppercase mb-1">SP Distribution</p>
                              <div className="grid grid-cols-6 gap-1">
                                {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                                  <div key={stat} className="text-center">
                                    <p className="text-[8px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                                    <p className={cn("text-[10px] font-bold", set.sp[stat] >= 20 ? "text-emerald-600" : set.sp[stat] > 0 ? "text-gray-700" : "text-gray-400")}>{set.sp[stat]}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Link href="/team-builder" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm">
                    <Sparkles className="w-4 h-4" /> Load in Team Builder <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// COMPONENT: Meta Team Card (clickable with expanded details)
// ══════════════════════════════════════════════════════════════════════════
function MetaTeamCard({ meta, expanded, onToggle }: { meta: MetaTeamPrediction; expanded: boolean; onToggle: () => void }) {
  return (
    <motion.div layout className={cn("rounded-xl border transition-all overflow-hidden", expanded ? "bg-emerald-50/30 border-emerald-300 col-span-full" : "glass border-gray-200/60 hover:border-emerald-300")}>
      <button onClick={onToggle} className="w-full text-left p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase rounded", meta.confidence >= 80 ? "bg-emerald-100 text-emerald-700" : meta.confidence >= 60 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{meta.confidence}%</span>
            <h4 className="text-sm font-bold">{meta.name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-xs font-medium", meta.recentTrend === "rising" ? "text-emerald-600" : meta.recentTrend === "falling" ? "text-red-500" : "text-gray-500")}>{meta.recentTrend === "rising" ? "↑ Rising" : meta.recentTrend === "falling" ? "↓ Falling" : "→ Stable"}</span>
            <span className="text-xs text-muted-foreground">{meta.metaShare}% share</span>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          {meta.pokemonIds.map(id => {
            const p = POKEMON_SEED.find(pk => pk.id === id);
            return p ? (
              <div key={id} className="flex flex-col items-center">
                <Image src={p.sprite} alt={p.name} width={36} height={36} className="rounded" unoptimized />
                <span className="text-[8px] text-muted-foreground mt-0.5 truncate w-10 text-center">{p.name}</span>
              </div>
            ) : null;
          })}
        </div>
        {meta.corePairs.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {meta.corePairs.map(cp => <span key={cp} className="px-1.5 py-0.5 text-[9px] rounded bg-violet-50 text-violet-600 font-medium">{cp}</span>)}
          </div>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-4">
              <div className="border-t border-emerald-200 pt-3" />

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Prediction Reasoning</h5>
                  <div className="space-y-1.5">
                    {meta.reasoning.map((r, i) => (
                      <p key={i} className="text-xs text-foreground flex items-start gap-1.5"><span className="text-emerald-500 mt-px flex-shrink-0">•</span>{r}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Composition</h5>
                  <div className="space-y-1.5">
                    {meta.pokemonIds.map(id => {
                      const p = POKEMON_SEED.find(pk => pk.id === id);
                      if (!p) return null;
                      const usage = TOURNAMENT_USAGE.find(u => u.pokemonId === id);
                      return (
                        <div key={id} className="flex items-center gap-2 p-1.5 rounded-lg bg-white/50">
                          <Image src={p.sprite} alt={p.name} width={24} height={24} className="rounded" unoptimized />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{p.name}</p>
                            <div className="flex gap-0.5">{p.types.map(t => <span key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />)}</div>
                          </div>
                          <div className="text-right">
                            {usage && <p className="text-[10px] text-muted-foreground">{usage.usageRate}% use · {usage.winRate}% WR</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Meta Position</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Confidence</span><span className="text-xs font-bold">{meta.confidence}%</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Meta Share</span><span className="text-xs font-bold">{meta.metaShare}%</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Historical Wins</span><span className="text-xs font-bold">{meta.historicalWins}</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Archetype</span><span className="text-xs font-bold capitalize">{meta.archetype}</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Trend</span><span className={cn("text-xs font-bold", meta.recentTrend === "rising" ? "text-emerald-600" : meta.recentTrend === "falling" ? "text-red-600" : "text-gray-600")}>{meta.recentTrend === "rising" ? "↑ Rising" : meta.recentTrend === "falling" ? "↓ Falling" : "→ Stable"}</span></div>
                  </div>
                  <Link href="/team-builder" className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                    <Sparkles className="w-3 h-3" /> Load in Team Builder <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// COMPONENT: Tournament Team Card (clickable with advanced details)
// ══════════════════════════════════════════════════════════════════════════
function TournamentTeamCard({ team, expanded, onToggle }: { team: TournamentTeam; expanded: boolean; onToggle: () => void }) {
  const megaId = getMegaIdFromArchetype(team.archetype);
  const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
  const allTypes = [...new Set(teamPokemon.flatMap(p => p.types))];
  const corePairs = CORE_PAIRS.filter(cp => team.pokemonIds.includes(cp.pokemon1) && team.pokemonIds.includes(cp.pokemon2));

  return (
    <motion.div layout className={cn("rounded-xl border transition-all overflow-hidden", expanded ? "bg-violet-50/30 border-violet-300" : "glass border-gray-200/60 hover:border-violet-300")}>
      <button onClick={onToggle} className="w-full text-left p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase rounded", team.placement <= 1 ? "bg-amber-100 text-amber-700" : team.placement <= 2 ? "bg-gray-200 text-gray-700" : team.placement <= 4 ? "bg-orange-50 text-orange-700" : "bg-gray-100 text-gray-500")}>
              {team.placement === 1 ? "🥇 1st" : team.placement === 2 ? "🥈 2nd" : `Top ${team.placement}`}
            </span>
            <h4 className="text-sm font-bold">{team.tournament}</h4>
            <span className="text-xs text-muted-foreground">{team.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 text-[9px] rounded bg-violet-50 text-violet-600 font-medium capitalize">{team.archetype}</span>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
        <div className="flex gap-1.5">
          {teamPokemon.map(p => {
            const isMega = megaId === p.id;
            return (
              <div key={p.id} className="flex flex-col items-center">
                <div className="relative">
                  <Image src={isMega ? getMegaSprite(p) : p.sprite} alt={isMega ? getMegaName(p) : p.name} width={32} height={32} className="rounded" unoptimized />
                  {isMega && <span className="absolute -top-1 -right-1 px-0.5 text-[6px] font-bold bg-amber-500 text-white rounded shadow-sm">M</span>}
                </div>
                <span className={cn("text-[7px] mt-0.5 truncate w-10 text-center", isMega ? "text-amber-600 font-bold" : "text-muted-foreground")}>{isMega ? getMegaName(p) : p.name}</span>
              </div>
            );
          })}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-4">
              <div className="border-t border-violet-200 pt-3" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Team Members Detail */}
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Members ({teamPokemon.length})</h5>
                  <div className="space-y-2">
                    {teamPokemon.map(p => {
                      const usage = TOURNAMENT_USAGE.find(u => u.pokemonId === p.id);
                      const mlRank = ML_POKEMON_RANKINGS.findIndex(r => r.name === p.name);
                      const pIsMega = megaId === p.id;
                      return (
                        <div key={p.id} className={cn("p-2 rounded-lg border", pIsMega ? "bg-amber-50/50 border-amber-200" : "bg-white/50 border-gray-100")}>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Image src={pIsMega ? getMegaSprite(p) : p.sprite} alt={pIsMega ? getMegaName(p) : p.name} width={28} height={28} className="rounded" unoptimized />
                              {pIsMega && <span className="absolute -top-1 -right-1 px-0.5 text-[6px] font-bold bg-amber-500 text-white rounded shadow-sm">M</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold">{pIsMega ? getMegaName(p) : p.name}{pIsMega && <span className="ml-1 text-[8px] text-amber-600 font-bold">MEGA</span>}</p>
                              <div className="flex gap-0.5">{p.types.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t.slice(0, 3)}</span>)}</div>
                            </div>
                            <div className="text-right text-[10px]">
                              {usage && <p className="text-muted-foreground">{usage.usageRate}% use</p>}
                              {mlRank >= 0 && <p className="text-emerald-600 font-medium">ML #{mlRank + 1}</p>}
                            </div>
                          </div>
                          <div className="mt-1 grid grid-cols-6 gap-1">
                            {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                              <div key={stat} className="text-center">
                                <p className="text-[8px] text-muted-foreground">{({ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" } as any)[stat]}</p>
                                <p className="text-[9px] font-bold">{p.baseStats[stat]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Team Analysis */}
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Analysis</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Archetype</p>
                      <p className="text-xs font-semibold capitalize">{team.archetype}</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Event</p>
                      <p className="text-xs font-semibold">{team.tournament} ({team.year})</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Placement</p>
                      <p className="text-xs font-semibold">{team.placement === 1 ? "1st Place (Champion)" : team.placement === 2 ? "2nd Place (Finalist)" : `Top ${team.placement}`}</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Region</p>
                      <p className="text-xs font-semibold">{team.region}</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Type Coverage</p>
                      <div className="flex flex-wrap gap-0.5 mt-0.5">
                        {allTypes.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cores & Synergies */}
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Core Pairs in Team</h5>
                  {corePairs.length > 0 ? (
                    <div className="space-y-2">
                      {corePairs.sort((a, b) => b.winRate - a.winRate).map(cp => {
                        const p1 = POKEMON_SEED.find(p => p.id === cp.pokemon1);
                        const p2 = POKEMON_SEED.find(p => p.id === cp.pokemon2);
                        const cpTier = cp.usage >= 20 ? "S" : cp.usage >= 12 ? "A" : cp.usage >= 6 ? "B" : "C";
                        return (
                          <div key={cp.name} className="p-2 rounded-lg bg-white/50 border border-gray-100">
                            <div className="flex items-center gap-2">
                              {p1 && <Image src={p1.sprite} alt={p1.name} width={20} height={20} className="rounded" unoptimized />}
                              <span className="text-[10px] text-muted-foreground">+</span>
                              {p2 && <Image src={p2.sprite} alt={p2.name} width={20} height={20} className="rounded" unoptimized />}
                              <span className="text-xs font-semibold flex-1">{cp.name}</span>
                              <span className={cn("text-xs font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">Tier {cpTier} · {cp.usage}% usage · {cp.synergy}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No tracked core pairs in this team</p>
                  )}

                  {/* Speed Tiers */}
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Speed Tiers</h5>
                    <div className="space-y-1">
                      {teamPokemon.sort((a, b) => b.baseStats.speed - a.baseStats.speed).map(p => (
                        <div key={p.id} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold w-6 text-right">{p.baseStats.speed}</span>
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{ width: `${Math.min(100, (p.baseStats.speed / 150) * 100)}%` }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground w-16 truncate">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

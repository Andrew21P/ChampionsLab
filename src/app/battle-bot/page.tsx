"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { LastUpdated } from "@/components/last-updated";
import {
  Swords, Play, BarChart3, Target, AlertTriangle,
  Zap, Loader2, Trophy, Shield, ChevronRight, Save, FolderOpen, Trash2,
  Eye, Crosshair, TrendingUp, Clock, Users, Flame, ChevronDown,
  SkipForward, Pause, RotateCcw, Award, Skull, Heart, Wind,
  Calculator, FlaskConical,
} from "lucide-react";
import DamageCalculator from "@/components/damage-calculator";
import TeamTester from "@/components/team-tester";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import type { ChampionsPokemon, CommonSet, StatPoints, PokemonType } from "@/lib/types";
import { TYPE_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  runSimulation as engineRunSimulation,
  PREBUILT_TEAMS,
  analyzeTeamSynergy,
  getWeaknesses,
  type PrebuiltTeam,
} from "@/lib/engine";
import {
  simulateBattleWithLog,
  generateRandomPool,
  type BattleLogEntry,
  type DetailedBattleResult,
  type RandomTeam,
} from "@/lib/engine/battle-sim";
import {
  getSavedTeams, deserializeTeam, saveSimResult, getSavedSimResults,
  type SavedTeam,
} from "@/lib/storage";
import { USAGE_DATA } from "@/lib/usage-data";

// ── Build best available set for a pokemon ──────────────────────────────

function bestAvailableSet(p: ChampionsPokemon): CommonSet {
  // Use USAGE_DATA competitive set if available
  const usageSet = USAGE_DATA[p.id];
  if (usageSet && usageSet.length > 0) return usageSet[0];
  // Fallback to generated defaults
  return defaultSet(p);
}

// ── Build default set for a pokemon ─────────────────────────────────────

function defaultSet(p: ChampionsPokemon): CommonSet {
  const isSpecial = p.baseStats.spAtk > p.baseStats.attack;
  const isFast = p.baseStats.speed > 80;
  const isBulky = p.baseStats.hp > 90 && p.baseStats.speed < 60;
  let nature = "Hardy";
  if (isBulky) nature = isSpecial ? "Quiet" : "Brave";
  else if (isSpecial) nature = isFast ? "Timid" : "Modest";
  else nature = isFast ? "Jolly" : "Adamant";

  let sp: StatPoints;
  if (isBulky) {
    sp = isSpecial
      ? { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }
      : { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 };
  } else if (isSpecial) {
    sp = isFast
      ? { hp: 2, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 32 }
      : { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 14 };
  } else {
    sp = isFast
      ? { hp: 2, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 32 }
      : { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 10, speed: 2 };
  }

  const stab = p.moves.filter(m => p.types.includes(m.type) && m.category !== "status");
  const coverage = p.moves.filter(m => !p.types.includes(m.type) && m.category !== "status");
  const status = p.moves.filter(m => m.category === "status");
  const moves: string[] = [];
  for (const m of stab.slice(0, 2)) if (moves.length < 4) moves.push(m.name);
  for (const m of coverage.slice(0, 1)) if (moves.length < 4) moves.push(m.name);
  const protect = status.find(m => m.name === "Protect");
  if (protect && moves.length < 4) moves.push(protect.name);
  for (const m of [...coverage, ...status, ...stab]) {
    if (moves.length >= 4) break;
    if (!moves.includes(m.name)) moves.push(m.name);
  }
  while (moves.length < 4 && p.moves.length > moves.length) {
    const m = p.moves.find(mv => !moves.includes(mv.name));
    if (m) moves.push(m.name); else break;
  }

  const items = ["Life Orb", "Focus Sash", "Sitrus Berry", "Choice Scarf", "Assault Vest", "Leftovers"];
  const item = items[Math.floor(Math.random() * items.length)];

  return {
    name: p.name,
    nature,
    ability: p.abilities[0]?.name ?? "",
    item,
    moves: moves.slice(0, 4),
    sp,
  };
}

// ── Result types ────────────────────────────────────────────────────────

type ResultTab = "overview" | "matchups" | "threats" | "leads" | "replay";

interface ThreatEntry {
  pokemonId: number;
  name: string;
  appearances: number;
  winsAgainst: number;
  threatScore: number;
}

interface LeadCombo {
  lead1: string;
  lead2: string;
  winRate: number;
  games: number;
}

interface FullSimResult {
  wins: number;
  losses: number;
  totalGames: number;
  winRate: number;
  avgTurns: number;
  matchupBreakdown: { opponent: string; winRate: number; wins: number; losses: number; archetype: string }[];
  threats: ThreatEntry[];
  bestLeads: LeadCombo[];
  commonWeaknesses: string[];
  strategyTips: string[];
  sampleBattle: DetailedBattleResult | null;
  archetypeBreakdown: { archetype: string; winRate: number; count: number }[];
  tier: string;
  totalBattles: number;
}

// ── Sim Runner ──────────────────────────────────────────────────────────

function runFullSimulation(
  team: ChampionsPokemon[],
  sets: CommonSet[],
  iterations: number,
  opponentPool: string,
  onProgress: (pct: number, label: string) => void,
): FullSimResult {
  // Build opponent pool
  const oppTeams: { name: string; pokemon: ChampionsPokemon[]; sets: CommonSet[]; archetype: string }[] = [];

  const prebuiltFilter =
    opponentPool === "s-tier" ? PREBUILT_TEAMS.filter(t => t.tier === "S") :
    opponentPool === "a-tier" ? PREBUILT_TEAMS.filter(t => t.tier === "S" || t.tier === "A") :
    [...PREBUILT_TEAMS];

  for (const t of prebuiltFilter) {
    const pokemon = t.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean) as ChampionsPokemon[];
    if (pokemon.length >= 4) {
      oppTeams.push({ name: t.name, pokemon, sets: t.sets.slice(0, pokemon.length), archetype: t.archetype });
    }
  }

  // Random teams for bigger pools
  if (opponentPool === "random-100" || opponentPool === "gauntlet") {
    const randomCount = opponentPool === "gauntlet" ? 200 : 100;
    onProgress(2, `Generating ${randomCount} random teams...`);
    const randoms = generateRandomPool(randomCount);
    for (const r of randoms) {
      if (r.pokemon.length >= 4) {
        oppTeams.push({ name: r.name, pokemon: r.pokemon, sets: r.sets, archetype: r.archetype });
      }
    }
  }

  if (oppTeams.length === 0) {
    for (const t of PREBUILT_TEAMS) {
      const pokemon = t.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean) as ChampionsPokemon[];
      if (pokemon.length >= 4) oppTeams.push({ name: t.name, pokemon, sets: t.sets.slice(0, pokemon.length), archetype: t.archetype });
    }
  }

  const perOpp = Math.max(1, Math.floor(iterations / oppTeams.length));
  let totalWins = 0;
  let totalGames = 0;
  let totalTurns = 0;
  const matchups: FullSimResult["matchupBreakdown"] = [];
  const threatMap = new Map<number, { name: string; appearances: number; winsAgainst: number }>();
  let sampleBattle: DetailedBattleResult | null = null;
  let sampleCloseness = 100;

  for (let oppIdx = 0; oppIdx < oppTeams.length; oppIdx++) {
    const opp = oppTeams[oppIdx];
    const pct = Math.round(((oppIdx + 1) / oppTeams.length) * 95) + 3;
    onProgress(pct, `Testing vs ${opp.name} (${oppIdx + 1}/${oppTeams.length})`);

    const res = engineRunSimulation(team, sets, opp.pokemon, opp.sets, perOpp);
    totalWins += res.wins;
    totalGames += perOpp;
    totalTurns += res.avgTurns * perOpp;
    matchups.push({
      opponent: opp.name,
      winRate: res.winRate,
      wins: res.wins,
      losses: res.losses,
      archetype: opp.archetype,
    });

    // Track threats
    for (const p of opp.pokemon) {
      const existing = threatMap.get(p.id);
      if (existing) {
        existing.appearances += perOpp;
        existing.winsAgainst += res.wins;
      } else {
        threatMap.set(p.id, { name: p.name, appearances: perOpp, winsAgainst: res.wins });
      }
    }

    // Capture one sample battle (pick a close matchup)
    const closeness = Math.abs(res.winRate - 50);
    if (closeness < sampleCloseness) {
      const detail = simulateBattleWithLog(team, sets, opp.pokemon, opp.sets);
      sampleBattle = detail;
      sampleCloseness = closeness;
    }
  }

  const overallWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 1000) / 10 : 0;

  // Threat analysis
  const threats: ThreatEntry[] = [...threatMap.entries()]
    .map(([id, data]) => ({
      pokemonId: id,
      name: data.name,
      appearances: data.appearances,
      winsAgainst: data.winsAgainst,
      threatScore: Math.round((1 - data.winsAgainst / data.appearances) * 100),
    }))
    .sort((a, b) => b.threatScore - a.threatScore)
    .slice(0, 15);

  // Lead analysis
  const leadCombos: LeadCombo[] = [];
  if (team.length >= 4) {
    const topOpp = oppTeams.slice(0, Math.min(5, oppTeams.length));
    for (let i = 0; i < Math.min(team.length, 6); i++) {
      for (let j = i + 1; j < Math.min(team.length, 6); j++) {
        const reorderedTeam = [team[i], team[j], ...team.filter((_, idx) => idx !== i && idx !== j)];
        const reorderedSets = reorderedTeam.map(p => sets[team.indexOf(p)]);
        let wins = 0;
        let games = 0;
        for (const opp of topOpp) {
          const res = engineRunSimulation(reorderedTeam, reorderedSets, opp.pokemon, opp.sets, 5);
          wins += res.wins;
          games += 5;
        }
        leadCombos.push({
          lead1: team[i].name,
          lead2: team[j].name,
          winRate: games > 0 ? Math.round((wins / games) * 1000) / 10 : overallWinRate,
          games,
        });
      }
    }
    leadCombos.sort((a, b) => b.winRate - a.winRate);
  }

  // Archetype breakdown
  const archetypeMap = new Map<string, { totalWR: number; count: number }>();
  for (const m of matchups) {
    const arch = m.archetype || "Unknown";
    const existing = archetypeMap.get(arch);
    if (existing) { existing.totalWR += m.winRate; existing.count++; }
    else archetypeMap.set(arch, { totalWR: m.winRate, count: 1 });
  }
  const archetypeBreakdown = [...archetypeMap.entries()]
    .map(([archetype, data]) => ({
      archetype,
      winRate: Math.round((data.totalWR / data.count) * 10) / 10,
      count: data.count,
    }))
    .sort((a, b) => b.winRate - a.winRate);

  // Weaknesses
  const weakTypes = new Set<string>();
  for (const p of team) {
    const weaks = getWeaknesses(p.types as [PokemonType, ...PokemonType[]]);
    weaks.forEach(w => weakTypes.add(w));
  }
  const commonWeaknesses: string[] = [];
  const weakArr = [...weakTypes];
  if (weakArr.length > 0) commonWeaknesses.push(`Shared weakness to ${weakArr.slice(0, 3).join(", ")} types`);
  const worstMatchups = [...matchups].sort((a, b) => a.winRate - b.winRate);
  if (worstMatchups[0]?.winRate < 40) commonWeaknesses.push(`Hard counter: ${worstMatchups[0].opponent} (${worstMatchups[0].winRate}%)`);
  if (worstMatchups[1]?.winRate < 45) commonWeaknesses.push(`Struggles vs ${worstMatchups[1].opponent} (${worstMatchups[1].winRate}%)`);
  const hasSpeedControl = team.some(p => p.moves.some(m => ["Tailwind", "Trick Room", "Icy Wind", "Electroweb"].includes(m.name)));
  if (!hasSpeedControl) commonWeaknesses.push("No speed control - consider Tailwind or Trick Room");
  const hasFakeOut = team.some(p => p.moves.some(m => m.name === "Fake Out"));
  if (!hasFakeOut) commonWeaknesses.push("No Fake Out pressure");
  const hasProtect = team.filter(p => p.moves.some(m => m.name === "Protect")).length;
  if (hasProtect < 3) commonWeaknesses.push(`Only ${hasProtect}/6 have Protect - risky in doubles`);
  const topThreat = threats[0];
  if (topThreat && topThreat.threatScore > 65) commonWeaknesses.push(`${topThreat.name} is a severe threat (${topThreat.threatScore}% loss rate when faced)`);

  // Tips
  const tips: string[] = [];
  if (hasFakeOut) tips.push("Lead with Fake Out + attacker for turn 1 pressure and free damage");
  if (hasSpeedControl) tips.push("Set speed control early - your team benefits heavily from Tailwind/TR");
  tips.push("Use Protect to scout and stall - predict the opponent's targeting");
  if (overallWinRate < 45) {
    tips.push("Consider swapping your worst matchup slot for a hard counter");
    tips.push("Your team may need a different speed mode (add Trick Room or Tailwind)");
  }
  if (overallWinRate > 55) {
    tips.push("Strong team! Focus on preserving your win condition in best-of-3");
    tips.push("Your top leads give the best matchup spread - stick to them");
  }
  if (leadCombos.length > 0) tips.push(`Best lead: ${leadCombos[0].lead1} + ${leadCombos[0].lead2} (${leadCombos[0].winRate}% WR)`);
  const bestArch = archetypeBreakdown[0];
  const worstArch = archetypeBreakdown[archetypeBreakdown.length - 1];
  if (bestArch) tips.push(`Strongest vs ${bestArch.archetype} (${bestArch.winRate}%)`);
  if (worstArch && worstArch.winRate < 50) tips.push(`Weakest vs ${worstArch.archetype} (${worstArch.winRate}%) - tech against it`);

  // Tier
  let tier = "C";
  if (overallWinRate >= 65) tier = "S";
  else if (overallWinRate >= 57) tier = "A";
  else if (overallWinRate >= 50) tier = "B";
  else if (overallWinRate >= 43) tier = "C";
  else tier = "D";

  return {
    wins: totalWins,
    losses: totalGames - totalWins,
    totalGames,
    winRate: overallWinRate,
    avgTurns: totalGames > 0 ? Math.round(totalTurns / totalGames * 10) / 10 : 0,
    matchupBreakdown: matchups.sort((a, b) => b.winRate - a.winRate),
    threats,
    bestLeads: leadCombos.slice(0, 10),
    commonWeaknesses,
    strategyTips: tips.slice(0, 8),
    sampleBattle,
    archetypeBreakdown,
    tier,
    totalBattles: totalGames,
  };
}

type MainTab = "battle-engine" | "damage-calc" | "team-tester";

export default function BattleBotPage() {
  const [mainTab, setMainTab] = useState<MainTab>("battle-engine");
  const [selectedPokemon, setSelectedPokemon] = useState<ChampionsPokemon[]>([]);
  const [selectedSets, setSelectedSets] = useState<CommonSet[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<FullSimResult | null>(null);
  const [iterations, setIterations] = useState(100);
  const [opponentPool, setOpponentPool] = useState("prebuilt");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [showSavedTeams, setShowSavedTeams] = useState(false);
  const [simHistory, setSimHistory] = useState<ReturnType<typeof getSavedSimResults>>([]);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [resultTab, setResultTab] = useState<ResultTab>("overview");
  const [replayTurn, setReplayTurn] = useState(0);
  const [replayPlaying, setReplayPlaying] = useState(false);
  const replayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSavedTeams(getSavedTeams());
    setSimHistory(getSavedSimResults());
  }, []);

  // Replay auto-play
  useEffect(() => {
    if (replayPlaying && result?.sampleBattle) {
      replayTimerRef.current = setInterval(() => {
        setReplayTurn(prev => {
          if (prev >= (result.sampleBattle?.log.length ?? 1) - 1) {
            setReplayPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => { if (replayTimerRef.current) clearInterval(replayTimerRef.current); };
  }, [replayPlaying, result?.sampleBattle]);

  const addPokemon = (pokemon: ChampionsPokemon) => {
    trackEvent("add_pokemon", "battle_bot", pokemon.name);
    if (selectedPokemon.length < 6 && !selectedPokemon.find((p) => p.id === pokemon.id)) {
      setSelectedPokemon([...selectedPokemon, pokemon]);
      setSelectedSets([...selectedSets, bestAvailableSet(pokemon)]);
    }
  };

  const removePokemon = (id: number) => {
    trackEvent("remove_pokemon", "battle_bot");
    const idx = selectedPokemon.findIndex(p => p.id === id);
    if (idx >= 0) {
      setSelectedPokemon(selectedPokemon.filter((_, i) => i !== idx));
      setSelectedSets(selectedSets.filter((_, i) => i !== idx));
    }
  };

  const loadSavedTeam = (team: SavedTeam) => {
    trackEvent("load_saved_team", "battle_bot", team.name);
    const slots = deserializeTeam(team.slots);
    const pokemon = slots.filter(s => s.pokemon).map(s => s.pokemon!);
    const sets = slots.filter(s => s.pokemon).map(s => {
      const p = s.pokemon!;
      // Build CommonSet from TeamSlot data
      if (s.ability && s.moves.length > 0) {
        return {
          name: p.name,
          nature: s.nature ?? "Hardy",
          ability: s.ability,
          item: s.item ?? "Life Orb",
          moves: s.moves.slice(0, 4),
          sp: s.statPoints,
          teraType: s.teraType,
        } as CommonSet;
      }
      return bestAvailableSet(p);
    });
    setSelectedPokemon(pokemon);
    setSelectedSets(sets);
    setShowSavedTeams(false);
  };

  const loadPrebuiltTeam = (team: PrebuiltTeam) => {
    trackEvent("load_prebuilt_team", "battle_bot", team.name);
    const pokemon = team.pokemonIds
      .map(id => POKEMON_SEED.find(p => p.id === id))
      .filter(Boolean) as ChampionsPokemon[];
    setSelectedPokemon(pokemon);
    setSelectedSets(team.sets.slice(0, pokemon.length));
    setShowSavedTeams(false);
  };

  const handleRunSimulation = useCallback(async () => {
    trackEvent("run_simulation", "battle_bot", `${selectedPokemon.length}_pokemon`, iterations);
    if (selectedPokemon.length < 4) return;
    setIsSimulating(true);
    setResult(null);
    setProgress(0);
    setProgressLabel("Preparing simulation...");
    setResultTab("overview");
    setReplayTurn(0);
    setReplayPlaying(false);

    await new Promise(r => setTimeout(r, 50));

    const sets = selectedSets.length === selectedPokemon.length
      ? selectedSets
      : selectedPokemon.map(p => bestAvailableSet(p));
    const res = runFullSimulation(selectedPokemon, sets, iterations, opponentPool, (pct, label) => {
      setProgress(pct);
      setProgressLabel(label);
    });

    setResult(res);
    setIsSimulating(false);
    setProgress(100);
    setProgressLabel("Complete!");

    saveSimResult({
      teamId: "manual",
      teamName: selectedPokemon.map(p => p.name).join(" / "),
      winRate: res.winRate,
      totalGames: res.totalGames,
      wins: res.wins,
      losses: res.losses,
      matchups: res.matchupBreakdown.map(m => ({ opponent: m.opponent, winRate: m.winRate })),
    });
    setSimHistory(getSavedSimResults());
  }, [selectedPokemon, iterations, opponentPool]);

  const filtered = POKEMON_SEED.filter(
    (p) =>
      !selectedPokemon.find((s) => s.id === p.id) &&
      (searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalBattleEstimate = iterations;

  // ── RENDER ──────────────────────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        {/* Gold Crown Icon */}
        <div className="flex items-center justify-center mb-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-xl shadow-amber-500/30">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold">
          <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Advanced VGC Battle Engine
          </span>
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600/70 mt-1">
          Champions Lab Powered · Gold Tier
        </p>
        <div className="flex justify-center mt-2">
          <LastUpdated page="battle-engine" />
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
          The most advanced VGC battle simulator available - fed with <span className="font-semibold text-amber-700">2,000,000+ simulated battles</span>, full
          damage calculation engine, intelligent AI decision-making, abilities, items, weather, terrain, Trick Room,
          Tailwind, status conditions, and real-time battle replay. Test your team against {PREBUILT_TEAMS.length}+ meta teams
          and hundreds of randomized opponents.
        </p>
        <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
          {[
            { label: "⚡ 2M+ BATTLES", color: "gold" },
            { label: "FULL DAMAGE CALC", color: "gold" },
            { label: "VGC DOUBLES", color: "gold" },
            { label: "INTELLIGENT AI", color: "gold" },
            { label: "LIVE REPLAY", color: "gold" },
            { label: "40+ META TEAMS", color: "gold" },
          ].map(badge => (
            <span key={badge.label} className="px-3 py-1 text-[10px] font-bold rounded-lg border bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-300 shadow-sm shadow-amber-200/50">{badge.label}</span>
          ))}
        </div>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-300/40">
          <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span></span>
          <span className="text-[11px] font-medium text-amber-700">Engine continuously trained on 2M+ battle outcomes · ELO rankings · Win-rate matrices · Archetype matchups</span>
        </div>
      </motion.div>

      {/* ── MAIN TAB NAVIGATION ──────────────────────────────────────── */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-200/5 rounded-xl mb-8">
        {([
          { id: "battle-engine" as MainTab, icon: Swords, label: "Battle Engine" },
          { id: "damage-calc" as MainTab, icon: Calculator, label: "Damage Calculator" },
          { id: "team-tester" as MainTab, icon: FlaskConical, label: "Team Tester" },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => { trackEvent("tab_switch", "battle_bot", tab.label); setMainTab(tab.id); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all",
              mainTab === tab.id
                ? "bg-white dark:bg-gray-200/10 shadow-sm dark:shadow-none text-foreground dark:ring-1 dark:ring-gray-200/10"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── DAMAGE CALCULATOR TAB ────────────────────────────────────── */}
      {mainTab === "damage-calc" && <DamageCalculator />}

      {/* ── TEAM TESTER TAB ──────────────────────────────────────────── */}
      {mainTab === "team-tester" && <TeamTester />}

      {/* ── BATTLE ENGINE TAB ────────────────────────────────────────── */}
      {mainTab === "battle-engine" && (
      <>
      <div className="grid lg:grid-cols-[380px_1fr] gap-8">
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* LEFT: TEAM INPUT + SETTINGS                                    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          {/* Load from saved */}
          {(savedTeams.length > 0 || PREBUILT_TEAMS.length > 0) && (
            <div className="glass rounded-2xl p-4 border border-gray-200/60 dark:border-gray-200/10">
              <button
                onClick={() => setShowSavedTeams(!showSavedTeams)}
                className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Load a Team
                </span>
                <ChevronRight className={cn("w-4 h-4 transition-transform", showSavedTeams && "rotate-90")} />
              </button>
              <AnimatePresence>
                {showSavedTeams && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                      {savedTeams.length > 0 && (
                        <>
                          <p className="text-[10px] text-muted-foreground uppercase font-medium">Your Saved Teams</p>
                          {[...savedTeams].sort((a, b) => b.updatedAt - a.updatedAt).map(t => (
                            <button
                              key={t.id}
                              onClick={() => loadSavedTeam(t)}
                              className="w-full text-left p-3 rounded-xl glass glass-hover flex items-center gap-3"
                            >
                              <Save className="w-4 h-4 text-violet-500 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-medium truncate">{t.name}</p>
                                <p className="text-[10px] text-muted-foreground">{t.slots.length} Pokémon · {new Date(t.updatedAt).toLocaleDateString()} {new Date(t.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                              </div>
                            </button>
                          ))}
                        </>
                      )}
                      <p className="text-[10px] text-muted-foreground uppercase font-medium mt-2">Prebuilt Teams</p>
                      {PREBUILT_TEAMS.slice(0, 12).map(t => (
                        <button
                          key={t.id}
                          onClick={() => loadPrebuiltTeam(t)}
                          className="w-full text-left p-3 rounded-xl glass glass-hover flex items-center gap-3"
                        >
                          <span className={cn(
                            "px-1.5 py-0.5 text-[9px] font-bold rounded flex-shrink-0",
                            t.tier === "S" ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400" :
                            t.tier === "A" ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400" :
                            "bg-gray-100 dark:bg-gray-200/10 text-gray-600 dark:text-gray-400"
                          )}>{t.tier}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{t.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{t.archetype}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Selected Team */}
          <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <Swords className="w-4 h-4" />
              Your Team ({selectedPokemon.length}/6)
            </h3>
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {Array.from({ length: 6 }, (_, i) => {
                const mon = selectedPokemon[i];
                return (
                  <motion.div
                    key={i}
                    layout
                    className={cn(
                      "rounded-xl p-2.5 aspect-square flex flex-col items-center justify-center transition-all",
                      mon ? "glass border border-gray-200 dark:border-gray-200/10" : "border border-dashed border-gray-300 dark:border-gray-200/10 cursor-pointer hover:border-violet-400"
                    )}
                    onClick={() => !mon && setPickerOpen(true)}
                  >
                    {mon ? (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); removePokemon(mon.id); }}
                          className="self-end -mt-1 -mr-1 p-0.5 rounded hover:bg-red-100 dark:hover:bg-red-500/20"
                        >
                          <span className="text-xs text-muted-foreground hover:text-red-600">✕</span>
                        </button>
                        <Image src={mon.sprite} alt={mon.name} width={44} height={44} unoptimized />
                        <span className="text-[10px] font-medium mt-0.5 truncate w-full text-center">{mon.name}</span>
                      </>
                    ) : (
                      <span className="text-xl text-gray-300">+</span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {selectedPokemon.length < 6 && (
              <button
                onClick={() => setPickerOpen(true)}
                className="w-full py-2 rounded-xl glass glass-hover text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-colors"
              >
                Add Pokémon <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {selectedPokemon.length > 0 && (
              <button
                onClick={() => { setSelectedPokemon([]); setResult(null); }}
                className="w-full mt-2 py-1.5 rounded-xl text-xs text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Clear Team
              </button>
            )}
          </div>

          {/* Simulation Settings */}
          <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Simulation Config
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Battles per matchup</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[20, 50, 100, 200, 500].map(n => (
                    <button
                      key={n}
                      onClick={() => setIterations(n)}
                      className={cn(
                        "py-2 rounded-lg text-[11px] font-medium transition-all",
                        iterations === n
                          ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm"
                          : "glass glass-hover text-muted-foreground"
                      )}
                    >{n}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Opponent Pool</label>
                <select
                  value={opponentPool}
                  onChange={(e) => setOpponentPool(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass border border-gray-200 dark:border-gray-200/10 text-sm bg-transparent focus:outline-none focus:border-violet-500/50"
                >
                  <option value="s-tier">S-Tier Only ({PREBUILT_TEAMS.filter(t => t.tier === "S").length} teams)</option>
                  <option value="a-tier">S + A Tier ({PREBUILT_TEAMS.filter(t => t.tier === "S" || t.tier === "A").length} teams)</option>
                  <option value="prebuilt">All Meta Teams ({PREBUILT_TEAMS.length} teams)</option>
                  <option value="random-100">Meta + 100 Random ({PREBUILT_TEAMS.length + 100})</option>
                  <option value="gauntlet">GAUNTLET - Meta + 200 Random ({PREBUILT_TEAMS.length + 200})</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-200/5 text-center">
                <p className="text-[11px] text-muted-foreground">
                  Total: ~<span className="font-bold text-foreground">{totalBattleEstimate.toLocaleString()}</span> simulated battles
                </p>
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={selectedPokemon.length < 4 || isSimulating}
              className={cn(
                "w-full mt-5 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all",
                selectedPokemon.length >= 4 && !isSimulating
                  ? "bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white hover:from-red-600 hover:via-orange-600 hover:to-amber-600 shadow-lg shadow-red-500/20"
                  : "bg-gray-100 dark:bg-gray-200/10 text-muted-foreground cursor-not-allowed"
              )}
            >
              {isSimulating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Simulating battles...</>
              ) : (
                <><Swords className="w-4 h-4" /> Run Battle Simulation</>
              )}
            </button>

            {selectedPokemon.length < 4 && (
              <p className="text-[11px] text-muted-foreground text-center mt-2">Select at least 4 Pokémon</p>
            )}
          </div>

          {/* Sim History */}
          {simHistory.length > 0 && (
            <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                History
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {simHistory.slice(-5).reverse().map(s => (
                  <div key={s.id} className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-200/5 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium truncate">{s.teamName}</p>
                      <p className="text-[9px] text-muted-foreground">{s.totalGames} games</p>
                    </div>
                    <span className={cn("text-sm font-bold ml-2", s.winRate >= 50 ? "text-green-600" : "text-red-500")}>
                      {s.winRate}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* RIGHT: RESULTS                                                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          {/* Progress */}
          {isSimulating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6 border border-gray-200/60 dark:border-gray-200/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-red-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-1.5 rounded-full border-2 border-orange-300"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                    <Swords className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{progressLabel}</p>
                  <div className="h-2 bg-gray-100 dark:bg-gray-200/10 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{progress}% - Full damage/speed/item/ability calculations</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {result && !isSimulating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                {/* Hero Stats */}
                <div className="glass rounded-2xl p-6 border border-gray-200/60 dark:border-gray-200/10">
                  <div className="flex items-center gap-6">
                    {/* Win Rate */}
                    <div className="text-center flex-shrink-0">
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className={cn(
                          "text-5xl font-bold bg-clip-text text-transparent",
                          result.winRate >= 50
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-red-500 to-orange-500"
                        )}
                      >
                        {result.winRate}%
                      </motion.p>
                      <p className="text-[10px] text-muted-foreground mt-1">WIN RATE</p>
                    </div>

                    {/* Tier Badge */}
                    <div className="text-center flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                        className={cn(
                          "w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black text-white shadow-lg",
                          result.tier === "S" ? "bg-gradient-to-br from-amber-400 to-yellow-600 shadow-amber-500/30" :
                          result.tier === "A" ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30" :
                          result.tier === "B" ? "bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/30" :
                          result.tier === "C" ? "bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/30" :
                          "bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30"
                        )}
                      >
                        {result.tier}
                      </motion.div>
                      <p className="text-[10px] text-muted-foreground mt-1">TIER</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { value: result.wins, label: "Wins", color: "text-green-600" },
                        { value: result.losses, label: "Losses", color: "text-red-500" },
                        { value: result.totalBattles.toLocaleString(), label: "Battles", color: "text-foreground" },
                        { value: result.avgTurns, label: "Avg Turns", color: "text-foreground" },
                      ].map(stat => (
                        <div key={stat.label} className="text-center">
                          <p className={cn("text-lg font-bold", stat.color)}>{stat.value}</p>
                          <p className="text-[9px] text-muted-foreground uppercase">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Win bar */}
                  <div className="mt-4 h-3 bg-gray-100 dark:bg-gray-200/10 rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        result.winRate >= 50 ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gradient-to-r from-red-500 to-orange-500"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.winRate}%` }}
                      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-200/10 rounded-xl overflow-x-auto">
                  {([
                    { id: "overview" as ResultTab, icon: Eye, label: "Overview" },
                    { id: "matchups" as ResultTab, icon: Target, label: "Matchups" },
                    { id: "threats" as ResultTab, icon: Skull, label: "Threats" },
                    { id: "leads" as ResultTab, icon: Award, label: "Leads" },
                    { id: "replay" as ResultTab, icon: Play, label: "Replay" },
                  ]).map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => { trackEvent("result_tab_switch", "battle_bot", tab.label); setResultTab(tab.id); }}
                      className={cn(
                        "flex-1 min-w-0 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                        resultTab === tab.id
                          ? "bg-white dark:bg-gray-200/10 shadow-sm dark:shadow-none text-foreground dark:ring-1 dark:ring-gray-200/10"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <tab.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* ── OVERVIEW TAB ────────────────────────────────────── */}
                {resultTab === "overview" && (
                  <div className="space-y-5">
                    {result.archetypeBreakdown.length > 0 && (
                      <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Flame className="w-4 h-4" />
                          Win Rate by Archetype
                        </h3>
                        <div className="space-y-2.5">
                          {result.archetypeBreakdown.map((a, i) => (
                            <div key={a.archetype} className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground w-28 truncate">{a.archetype}</span>
                              <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-200/10 rounded-full overflow-hidden">
                                <motion.div
                                  className={cn("h-full rounded-full", a.winRate >= 50 ? "bg-green-500" : "bg-red-500")}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${a.winRate}%` }}
                                  transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                                />
                              </div>
                              <span className={cn("text-xs font-mono w-12 text-right", a.winRate >= 50 ? "text-green-600" : "text-red-500")}>
                                {a.winRate}%
                              </span>
                              <span className="text-[9px] text-muted-foreground w-8">({a.count})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.commonWeaknesses.length > 0 && (
                        <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            Weaknesses
                          </h3>
                          <ul className="space-y-2">
                            {result.commonWeaknesses.map((w, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span> {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.strategyTips.length > 0 && (
                        <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
                          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-cyan-600" />
                            Strategy Tips
                          </h3>
                          <ul className="space-y-2">
                            {result.strategyTips.map((t, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-cyan-600 mt-0.5 flex-shrink-0">•</span> {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── MATCHUPS TAB ────────────────────────────────────── */}
                {resultTab === "matchups" && (
                  <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      All Matchups ({result.matchupBreakdown.length})
                    </h3>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                      {result.matchupBreakdown.map((m, i) => (
                        <motion.div
                          key={m.opponent}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.min(i * 0.03, 1) }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-200/5 transition-colors"
                        >
                          <span className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0",
                            m.winRate >= 60 ? "bg-green-500" :
                            m.winRate >= 50 ? "bg-blue-500" :
                            m.winRate >= 40 ? "bg-orange-500" :
                            "bg-red-500"
                          )}>
                            {m.winRate >= 60 ? "W" : m.winRate >= 50 ? "=" : "L"}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium truncate">{m.opponent}</span>
                              <span className="text-[9px] text-muted-foreground">({m.archetype})</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 dark:bg-gray-200/10 rounded-full overflow-hidden mt-1">
                              <div
                                className={cn("h-full rounded-full transition-all", m.winRate >= 50 ? "bg-green-500" : "bg-red-500")}
                                style={{ width: `${m.winRate}%` }}
                              />
                            </div>
                          </div>
                          <span className={cn("text-xs font-mono w-12 text-right font-bold", m.winRate >= 50 ? "text-green-600" : "text-red-500")}>
                            {m.winRate}%
                          </span>
                          <span className="text-[9px] text-muted-foreground w-12 text-right">{m.wins}W {m.losses}L</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── THREATS TAB ─────────────────────────────────────── */}
                {resultTab === "threats" && (
                  <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Skull className="w-4 h-4" />
                      Top Threats - Pokémon that beat you most
                    </h3>
                    <div className="space-y-3">
                      {result.threats.map((t, i) => {
                        const mon = POKEMON_SEED.find(p => p.id === t.pokemonId);
                        return (
                          <motion.div
                            key={t.pokemonId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-200/5 transition-colors"
                          >
                            <span className="text-[10px] font-bold text-muted-foreground w-5">#{i + 1}</span>
                            {mon && (
                              <Image src={mon.sprite} alt={t.name} width={36} height={36} unoptimized className="flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium">{t.name}</p>
                              <div className="flex gap-1 mt-0.5">
                                {mon?.types.map(type => (
                                  <span key={type} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[type] }} />
                                ))}
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className={cn(
                                "text-sm font-bold",
                                t.threatScore >= 60 ? "text-red-600" :
                                t.threatScore >= 50 ? "text-orange-500" :
                                "text-yellow-500"
                              )}>
                                {t.threatScore}%
                              </p>
                              <p className="text-[9px] text-muted-foreground">loss rate</p>
                            </div>
                            <div className="w-20 h-2 bg-gray-100 dark:bg-gray-200/10 rounded-full overflow-hidden flex-shrink-0">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  t.threatScore >= 60 ? "bg-red-500" :
                                  t.threatScore >= 50 ? "bg-orange-500" :
                                  "bg-yellow-500"
                                )}
                                style={{ width: `${t.threatScore}%` }}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── LEADS TAB ──────────────────────────────────────── */}
                {resultTab === "leads" && (
                  <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Best Lead Combinations
                    </h3>
                    <div className="space-y-2">
                      {result.bestLeads.map((lead, i) => {
                        const mon1 = POKEMON_SEED.find(p => p.name === lead.lead1);
                        const mon2 = POKEMON_SEED.find(p => p.name === lead.lead2);
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-xl transition-colors",
                              i === 0 ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-500/10 dark:to-yellow-500/10 border border-amber-200 dark:border-amber-500/20" : "bg-gray-50 dark:bg-gray-200/5"
                            )}
                          >
                            <span className={cn(
                              "text-xs font-bold w-6 text-center",
                              i === 0 ? "text-amber-600" : "text-muted-foreground"
                            )}>#{i + 1}</span>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {mon1 && <Image src={mon1.sprite} alt={lead.lead1} width={32} height={32} unoptimized />}
                              <span className="text-xs font-medium">{lead.lead1}</span>
                              <span className="text-xs text-muted-foreground">+</span>
                              {mon2 && <Image src={mon2.sprite} alt={lead.lead2} width={32} height={32} unoptimized />}
                              <span className="text-xs font-medium">{lead.lead2}</span>
                            </div>
                            <span className={cn(
                              "text-sm font-bold",
                              lead.winRate >= 55 ? "text-green-600" :
                              lead.winRate >= 50 ? "text-blue-600" :
                              "text-red-500"
                            )}>
                              {lead.winRate}%
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                    {result.bestLeads.length > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-3 text-center">
                        Tested {result.bestLeads[0]?.games ?? 0}+ battles per lead combination
                      </p>
                    )}
                  </div>
                )}

                {/* ── REPLAY TAB ─────────────────────────────────────── */}
                {resultTab === "replay" && result.sampleBattle && (
                  <div className="glass rounded-2xl p-5 border border-gray-200/60 dark:border-gray-200/10">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Sample Battle Replay
                    </h3>

                    {/* Team headers */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                        <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Your Team</p>
                        <div className="flex gap-1 flex-wrap">
                          {result.sampleBattle.team1Names.map(name => {
                            const mon = POKEMON_SEED.find(p => p.name === name);
                            return mon ? (
                              <Image key={name} src={mon.sprite} alt={name} width={28} height={28} unoptimized title={name} />
                            ) : <span key={name} className="text-[10px]">{name}</span>;
                          })}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                        <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Opponent</p>
                        <div className="flex gap-1 flex-wrap">
                          {result.sampleBattle.team2Names.map(name => {
                            const mon = POKEMON_SEED.find(p => p.name === name);
                            return mon ? (
                              <Image key={name} src={mon.sprite} alt={name} width={28} height={28} unoptimized title={name} />
                            ) : <span key={name} className="text-[10px]">{name}</span>;
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Replay controls */}
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={() => { setReplayTurn(0); setReplayPlaying(false); }}
                        className="p-2 rounded-lg glass glass-hover"
                        title="Reset"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setReplayPlaying(!replayPlaying)}
                        className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white"
                      >
                        {replayPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setReplayTurn(prev => Math.min(prev + 1, result.sampleBattle!.log.length - 1))}
                        className="p-2 rounded-lg glass glass-hover"
                        title="Next turn"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                      <div className="flex-1 mx-2">
                        <input
                          type="range"
                          min={0}
                          max={result.sampleBattle.log.length - 1}
                          value={replayTurn}
                          onChange={(e) => { setReplayTurn(Number(e.target.value)); setReplayPlaying(false); }}
                          className="w-full accent-orange-500"
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">
                        Turn {result.sampleBattle.log[replayTurn]?.turn ?? 0}/{result.sampleBattle.turnsPlayed}
                      </span>
                    </div>

                    {/* HP bars */}
                    {result.sampleBattle.log[replayTurn] && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5">
                          {result.sampleBattle.team1Names.map((name, idx) => {
                            const hp = result.sampleBattle!.log[replayTurn]?.team1HP[idx] ?? 0;
                            return (
                              <div key={name} className="flex items-center gap-2">
                                <span className="text-[10px] w-20 truncate text-right">{name}</span>
                                <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-200/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className={cn(
                                      "h-full rounded-full transition-all duration-500",
                                      hp > 50 ? "bg-green-500" : hp > 25 ? "bg-yellow-500" : hp > 0 ? "bg-red-500" : "bg-gray-300"
                                    )}
                                    style={{ width: `${hp}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-mono w-8 text-right">{hp}%</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="space-y-1.5">
                          {result.sampleBattle.team2Names.map((name, idx) => {
                            const hp = result.sampleBattle!.log[replayTurn]?.team2HP[idx] ?? 0;
                            return (
                              <div key={name} className="flex items-center gap-2">
                                <span className="text-[10px] w-20 truncate text-right">{name}</span>
                                <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-200/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className={cn(
                                      "h-full rounded-full transition-all duration-500",
                                      hp > 50 ? "bg-green-500" : hp > 25 ? "bg-yellow-500" : hp > 0 ? "bg-red-500" : "bg-gray-300"
                                    )}
                                    style={{ width: `${hp}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-mono w-8 text-right">{hp}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Field state */}
                    {result.sampleBattle.log[replayTurn] && (
                      <div className="flex gap-2 flex-wrap mb-3">
                        {result.sampleBattle.log[replayTurn].field.weather && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-blue-100 text-blue-700">
                            {result.sampleBattle.log[replayTurn].field.weather}
                          </span>
                        )}
                        {result.sampleBattle.log[replayTurn].field.trickRoom && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-violet-100 text-violet-700">
                            Trick Room
                          </span>
                        )}
                        {result.sampleBattle.log[replayTurn].field.tailwind1 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-cyan-100 text-cyan-700">
                            Your Tailwind
                          </span>
                        )}
                        {result.sampleBattle.log[replayTurn].field.tailwind2 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-orange-100 text-orange-700">
                            Opp Tailwind
                          </span>
                        )}
                      </div>
                    )}

                    {/* Turn events */}
                    <div className="space-y-1 max-h-72 overflow-y-auto">
                      {result.sampleBattle.log.slice(0, replayTurn + 1).reverse().map((entry) => (
                        <div key={entry.turn} className={cn("p-2 rounded-lg", entry.turn === result.sampleBattle!.log[replayTurn]?.turn ? "bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20" : "bg-gray-50 dark:bg-gray-200/5")}>
                          <p className="text-[10px] font-bold text-muted-foreground mb-1">
                            {entry.turn === 0 ? "Battle Start" : `Turn ${entry.turn}`}
                          </p>
                          {entry.events.map((ev, eidx) => (
                            <p key={eidx} className="text-[11px] text-muted-foreground">{ev}</p>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Result */}
                    <div className={cn(
                      "mt-3 p-3 rounded-xl text-center text-sm font-bold",
                      result.sampleBattle.winner === 1
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : "bg-red-100 text-red-700 border border-red-300"
                    )}>
                      {result.sampleBattle.winner === 1 ? "VICTORY" : "DEFEAT"} in {result.sampleBattle.turnsPlayed} turns
                      ({result.sampleBattle.team1Remaining} remaining vs {result.sampleBattle.team2Remaining})
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!result && !isSimulating && (
            <div className="glass rounded-2xl p-12 border border-gray-200/60 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-200/5 dark:to-gray-200/10 flex items-center justify-center mx-auto mb-4">
                <Swords className="w-10 h-10 text-muted-foreground/20" />
              </div>
              <p className="text-muted-foreground text-sm mb-1 font-medium">Ready to Simulate</p>
              <p className="text-xs text-muted-foreground/60 max-w-sm mx-auto">
                Build or load a team, configure your opponent pool, then run the Monte Carlo
                battle simulation. Every battle is computed with full damage calcs, AI decisions,
                item/ability interactions, weather, and speed control.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 max-w-xs mx-auto">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-200/5">
                  <p className="text-lg font-bold text-foreground">{PREBUILT_TEAMS.length}</p>
                  <p className="text-[9px] text-muted-foreground">Meta Teams</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-200/5">
                  <p className="text-lg font-bold text-foreground">137</p>
                  <p className="text-[9px] text-muted-foreground">Pokémon</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-200/5">
                  <p className="text-lg font-bold text-foreground">2M+</p>
                  <p className="text-[9px] text-muted-foreground">Battle Data</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* POKEMON PICKER MODAL (Battle Engine)                           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {pickerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setPickerOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-lg sm:max-h-[70vh] glass rounded-2xl border border-gray-200/60 flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200/60">
                <input
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass border border-gray-200 dark:border-gray-200/10 focus:border-violet-500/50 focus:outline-none text-sm"
                  autoFocus
                />
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <div className="grid grid-cols-2 gap-2">
                  {filtered.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { addPokemon(p); if (selectedPokemon.length >= 5) setPickerOpen(false); }}
                      className="flex items-center gap-2 p-3 rounded-xl glass glass-hover text-left"
                    >
                      <Image src={p.sprite} alt={p.name} width={36} height={36} unoptimized />
                      <div>
                        <p className="text-xs font-medium">{p.name}</p>
                        <div className="flex gap-1 mt-0.5">
                          {p.types.map((t) => (
                            <span key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  Swords, Play, Search, X, Trophy, BarChart3, Loader2,
  SkipForward, Pause, RotateCcw, ChevronRight, Trash2,
  ArrowRightLeft, FolderOpen, Save,
} from "lucide-react";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import type { ChampionsPokemon, CommonSet, PokemonType } from "@/lib/types";
import { TYPE_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  runSimulation,
  PREBUILT_TEAMS,
  type PrebuiltTeam,
} from "@/lib/engine";
import {
  simulateBattleWithLog,
  type DetailedBattleResult,
} from "@/lib/engine/battle-sim";
import { USAGE_DATA } from "@/lib/usage-data";
import {
  getSavedTeams, deserializeTeam,
  type SavedTeam,
} from "@/lib/storage";

// ── Helpers ──────────────────────────────────────────────────────────────

function bestAvailableSet(p: ChampionsPokemon): CommonSet {
  const usageSet = USAGE_DATA[p.id];
  if (usageSet && usageSet.length > 0) return usageSet[0];
  const isSpecial = p.baseStats.spAtk > p.baseStats.attack;
  return {
    name: p.name,
    nature: isSpecial ? "Modest" : "Adamant",
    ability: p.abilities[0]?.name ?? "",
    item: "Life Orb",
    moves: p.moves.filter(m => m.category !== "status").slice(0, 4).map(m => m.name),
    sp: { hp: 2, attack: isSpecial ? 0 : 32, defense: 0, spAtk: isSpecial ? 32 : 0, spDef: 0, speed: 32 },
  };
}

interface TeamTestResult {
  wins: number;
  losses: number;
  winRate: number;
  avgTurns: number;
  totalGames: number;
  sampleBattle: DetailedBattleResult | null;
}

// ── Component ────────────────────────────────────────────────────────────

export default function TeamTester() {
  // Team 1
  const [team1Pokemon, setTeam1Pokemon] = useState<ChampionsPokemon[]>([]);
  const [team1Sets, setTeam1Sets] = useState<CommonSet[]>([]);
  // Team 2
  const [team2Pokemon, setTeam2Pokemon] = useState<ChampionsPokemon[]>([]);
  const [team2Sets, setTeam2Sets] = useState<CommonSet[]>([]);

  const [iterations, setIterations] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<TeamTestResult | null>(null);
  const [progress, setProgress] = useState(0);

  // Picker
  const [pickerTarget, setPickerTarget] = useState<{ team: 1 | 2 } | null>(null);
  const [pickerSearch, setPickerSearch] = useState("");

  // Team loader
  const [showLoader, setShowLoader] = useState<1 | 2 | null>(null);
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);

  // Replay
  const [replayTurn, setReplayTurn] = useState(0);
  const [replayPlaying, setReplayPlaying] = useState(false);
  const replayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setSavedTeams(getSavedTeams()); }, []);

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

  const addPokemon = useCallback((pokemon: ChampionsPokemon) => {
    if (!pickerTarget) return;
    const set = bestAvailableSet(pokemon);
    if (pickerTarget.team === 1) {
      if (team1Pokemon.length < 6 && !team1Pokemon.find(p => p.id === pokemon.id)) {
        setTeam1Pokemon(prev => [...prev, pokemon]);
        setTeam1Sets(prev => [...prev, set]);
      }
    } else {
      if (team2Pokemon.length < 6 && !team2Pokemon.find(p => p.id === pokemon.id)) {
        setTeam2Pokemon(prev => [...prev, pokemon]);
        setTeam2Sets(prev => [...prev, set]);
      }
    }
  }, [pickerTarget, team1Pokemon, team2Pokemon]);

  const removePokemon = (team: 1 | 2, id: number) => {
    if (team === 1) {
      const idx = team1Pokemon.findIndex(p => p.id === id);
      if (idx >= 0) {
        setTeam1Pokemon(prev => prev.filter((_, i) => i !== idx));
        setTeam1Sets(prev => prev.filter((_, i) => i !== idx));
      }
    } else {
      const idx = team2Pokemon.findIndex(p => p.id === id);
      if (idx >= 0) {
        setTeam2Pokemon(prev => prev.filter((_, i) => i !== idx));
        setTeam2Sets(prev => prev.filter((_, i) => i !== idx));
      }
    }
  };

  const loadSavedTeam = (team: SavedTeam, target: 1 | 2) => {
    const slots = deserializeTeam(team.slots);
    const pokemon = slots.filter(s => s.pokemon).map(s => s.pokemon!);
    const sets = slots.filter(s => s.pokemon).map(s => {
      const p = s.pokemon!;
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
    if (target === 1) { setTeam1Pokemon(pokemon); setTeam1Sets(sets); }
    else { setTeam2Pokemon(pokemon); setTeam2Sets(sets); }
    setShowLoader(null);
  };

  const loadPrebuiltTeam = (team: PrebuiltTeam, target: 1 | 2) => {
    const pokemon = team.pokemonIds
      .map(id => POKEMON_SEED.find(p => p.id === id))
      .filter(Boolean) as ChampionsPokemon[];
    if (target === 1) { setTeam1Pokemon(pokemon); setTeam1Sets(team.sets.slice(0, pokemon.length)); }
    else { setTeam2Pokemon(pokemon); setTeam2Sets(team.sets.slice(0, pokemon.length)); }
    setShowLoader(null);
  };

  const swapTeams = () => {
    const tmpPoke = [...team1Pokemon];
    const tmpSets = [...team1Sets];
    setTeam1Pokemon([...team2Pokemon]);
    setTeam1Sets([...team2Sets]);
    setTeam2Pokemon(tmpPoke);
    setTeam2Sets(tmpSets);
    setResult(null);
  };

  const canRun = team1Pokemon.length >= 4 && team2Pokemon.length >= 4 && !isRunning;

  const handleRun = useCallback(async () => {
    trackEvent("run_test", "team_tester", `${team1Pokemon.length}v${team2Pokemon.length}`, iterations);
    if (!canRun) return;
    setIsRunning(true);
    setResult(null);
    setProgress(0);
    setReplayTurn(0);
    setReplayPlaying(false);

    await new Promise(r => setTimeout(r, 50));

    const simResult = runSimulation(team1Pokemon, team1Sets, team2Pokemon, team2Sets, iterations);
    setProgress(80);

    // Get a sample battle for replay
    const sampleBattle = simulateBattleWithLog(team1Pokemon, team1Sets, team2Pokemon, team2Sets);
    setProgress(100);

    setResult({
      wins: simResult.wins,
      losses: simResult.losses,
      winRate: simResult.winRate,
      avgTurns: simResult.avgTurns,
      totalGames: iterations,
      sampleBattle,
    });
    setIsRunning(false);
  }, [canRun, team1Pokemon, team1Sets, team2Pokemon, team2Sets, iterations]);

  const filteredPokemon = useMemo(() => {
    if (!pickerTarget) return [];
    const existingIds = pickerTarget.team === 1
      ? team1Pokemon.map(p => p.id)
      : team2Pokemon.map(p => p.id);
    return POKEMON_SEED.filter(p =>
      !existingIds.includes(p.id) &&
      (pickerSearch === "" || p.name.toLowerCase().includes(pickerSearch.toLowerCase()))
    );
  }, [pickerTarget, pickerSearch, team1Pokemon, team2Pokemon]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Two teams side by side */}
      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Team 1 */}
        <TeamPanel
          label="Team 1"
          color="blue"
          pokemon={team1Pokemon}
          sets={team1Sets}
          onPickerOpen={() => setPickerTarget({ team: 1 })}
          onRemove={(id) => removePokemon(1, id)}
          onClear={() => { setTeam1Pokemon([]); setTeam1Sets([]); setResult(null); }}
          onLoadTeam={() => setShowLoader(1)}
        />

        {/* Center controls */}
        <div className="flex flex-col items-center gap-4 lg:pt-20">
          <button
            onClick={swapTeams}
            className="p-3 rounded-xl glass glass-hover border border-gray-200/60 hover:border-violet-300 transition-all"
            title="Swap teams"
          >
            <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="text-center text-3xl font-black text-muted-foreground/30">VS</div>
        </div>

        {/* Team 2 */}
        <TeamPanel
          label="Team 2"
          color="red"
          pokemon={team2Pokemon}
          sets={team2Sets}
          onPickerOpen={() => setPickerTarget({ team: 2 })}
          onRemove={(id) => removePokemon(2, id)}
          onClear={() => { setTeam2Pokemon([]); setTeam2Sets([]); setResult(null); }}
          onLoadTeam={() => setShowLoader(2)}
        />
      </div>

      {/* Simulation Controls */}
      <div className="glass rounded-2xl p-5 border border-gray-200/60">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Battles:</span>
            <div className="flex gap-1.5">
              {[10, 50, 100, 200, 500, 1000].map(n => (
                <button
                  key={n}
                  onClick={() => setIterations(n)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all",
                    iterations === n
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-sm"
                      : "glass glass-hover text-muted-foreground"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1" />

          <button
            onClick={handleRun}
            disabled={!canRun}
            className={cn(
              "px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all",
              canRun
                ? "bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white hover:from-red-600 hover:via-orange-600 hover:to-amber-600 shadow-lg shadow-red-500/20"
                : "bg-gray-100 text-muted-foreground cursor-not-allowed"
            )}
          >
            {isRunning ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Battling...</>
            ) : (
              <><Swords className="w-4 h-4" /> Run {iterations} Battles</>
            )}
          </button>
        </div>

        {!canRun && !isRunning && (team1Pokemon.length < 4 || team2Pokemon.length < 4) && (
          <p className="text-[11px] text-muted-foreground text-center mt-2">
            Both teams need at least 4 Pokémon
          </p>
        )}
      </div>

      {/* Progress */}
      {isRunning && (
        <div className="glass rounded-2xl p-6 border border-gray-200/60">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                <Swords className="w-5 h-5 text-orange-500" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Running {iterations} battle simulations...</p>
              <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && !isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Hero Stats */}
            <div className="glass rounded-2xl p-6 border border-gray-200/60">
              <div className="flex items-center gap-8 justify-center">
                {/* Team 1 side */}
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase text-blue-600 mb-1">Team 1</p>
                  <div className="flex gap-1 justify-center mb-2">
                    {team1Pokemon.slice(0, 4).map(p => (
                      <Image key={p.id} src={p.sprite} alt={p.name} width={28} height={28} unoptimized />
                    ))}
                  </div>
                  <p className={cn(
                    "text-4xl font-black",
                    result.winRate >= 50
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                  )}>
                    {result.winRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">{result.wins}W / {result.losses}L</p>
                </div>

                {/* VS */}
                <div className="text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg",
                    result.winRate >= 55 ? "bg-gradient-to-br from-green-400 to-emerald-600 text-white" :
                    result.winRate <= 45 ? "bg-gradient-to-br from-red-400 to-red-600 text-white" :
                    "bg-gradient-to-br from-yellow-400 to-amber-500 text-white"
                  )}>
                    VS
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{result.totalGames} games</p>
                  <p className="text-[10px] text-muted-foreground">~{result.avgTurns} turns avg</p>
                </div>

                {/* Team 2 side */}
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase text-red-600 mb-1">Team 2</p>
                  <div className="flex gap-1 justify-center mb-2">
                    {team2Pokemon.slice(0, 4).map(p => (
                      <Image key={p.id} src={p.sprite} alt={p.name} width={28} height={28} unoptimized />
                    ))}
                  </div>
                  <p className={cn(
                    "text-4xl font-black",
                    result.winRate <= 50
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"
                  )}>
                    {(100 - result.winRate).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">{result.losses}W / {result.wins}L</p>
                </div>
              </div>

              {/* Win bar */}
              <div className="mt-5 relative">
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.winRate}%` }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  />
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-400 to-red-500 flex-1"
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - result.winRate}%` }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white drop-shadow-sm">
                    {result.winRate}% - {(100 - result.winRate).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Verdict */}
              <div className={cn(
                "mt-4 p-3 rounded-xl text-center text-sm font-bold",
                result.winRate > 55 ? "bg-blue-50 text-blue-700 border border-blue-200" :
                result.winRate < 45 ? "bg-red-50 text-red-700 border border-red-200" :
                "bg-yellow-50 text-yellow-700 border border-yellow-200"
              )}>
                {result.winRate > 60 ? "Team 1 dominates this matchup!" :
                 result.winRate > 55 ? "Team 1 has a clear advantage" :
                 result.winRate > 52 ? "Team 1 has a slight edge" :
                 result.winRate > 48 ? "Very even matchup - could go either way" :
                 result.winRate > 45 ? "Team 2 has a slight edge" :
                 result.winRate > 40 ? "Team 2 has a clear advantage" :
                 "Team 2 dominates this matchup!"}
              </div>
            </div>

            {/* Sample Battle Replay */}
            {result.sampleBattle && (
              <div className="glass rounded-2xl p-5 border border-gray-200/60">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Sample Battle Replay
                </h3>

                {/* Team headers */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                    <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Team 1</p>
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
                    <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Team 2</p>
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

                {/* Controls */}
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

                {/* HP Bars */}
                {result.sampleBattle.log[replayTurn] && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1.5">
                      {result.sampleBattle.team1Names.map((name, idx) => {
                        const hp = result.sampleBattle!.log[replayTurn]?.team1HP[idx] ?? 0;
                        return (
                          <div key={name} className="flex items-center gap-2">
                            <span className="text-[10px] w-20 truncate text-right">{name}</span>
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
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
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
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
                        Team 1 Tailwind
                      </span>
                    )}
                    {result.sampleBattle.log[replayTurn].field.tailwind2 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-orange-100 text-orange-700">
                        Team 2 Tailwind
                      </span>
                    )}
                  </div>
                )}

                {/* Turn events */}
                <div className="space-y-1 max-h-72 overflow-y-auto">
                  {result.sampleBattle.log.slice(0, replayTurn + 1).reverse().map((entry) => (
                    <div key={entry.turn} className={cn(
                      "p-2 rounded-lg",
                      entry.turn === result.sampleBattle!.log[replayTurn]?.turn ? "bg-orange-50 border border-orange-200" : "bg-gray-50"
                    )}>
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
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                )}>
                  {result.sampleBattle.winner === 1 ? "TEAM 1 WINS" : "TEAM 2 WINS"} in {result.sampleBattle.turnsPlayed} turns
                  ({result.sampleBattle.team1Remaining} vs {result.sampleBattle.team2Remaining} remaining)
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!result && !isRunning && (
        <div className="glass rounded-2xl p-12 border border-gray-200/60 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-muted-foreground/20" />
          </div>
          <p className="text-muted-foreground text-sm mb-1 font-medium">Head-to-Head Team Matchup Testing</p>
          <p className="text-xs text-muted-foreground/60 max-w-sm mx-auto">
            Set up two teams, choose the number of battles, and see which team comes out on top.
            Full battle simulation with AI decision-making, damage calcs, abilities, items, and field effects.
          </p>
        </div>
      )}

      {/* ── POKEMON PICKER MODAL ────────────────────────────────── */}
      {pickerTarget && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => { setPickerTarget(null); setPickerSearch(""); }}
          />
          <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-lg sm:max-h-[70vh] glass rounded-2xl border border-gray-200/60 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200/60 flex items-center gap-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Search for Team ${pickerTarget.team}...`}
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none text-sm"
                autoFocus
              />
              <button onClick={() => { setPickerTarget(null); setPickerSearch(""); }}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <div className="grid grid-cols-2 gap-2">
                {filteredPokemon.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      addPokemon(p);
                      const teamLen = pickerTarget.team === 1 ? team1Pokemon.length : team2Pokemon.length;
                      if (teamLen >= 5) { setPickerTarget(null); setPickerSearch(""); }
                    }}
                    className="flex items-center gap-2 p-3 rounded-xl glass glass-hover text-left"
                  >
                    <Image src={p.sprite} alt={p.name} width={36} height={36} unoptimized />
                    <div>
                      <p className="text-xs font-medium">{p.name}</p>
                      <div className="flex gap-1 mt-0.5">
                        {p.types.map(t => (
                          <span key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── TEAM LOADER MODAL ────────────────────────────────── */}
      {showLoader && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowLoader(null)}
          />
          <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-md sm:max-h-[70vh] glass rounded-2xl border border-gray-200/60 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200/60 flex items-center justify-between">
              <p className="text-sm font-semibold">Load Team {showLoader}</p>
              <button onClick={() => setShowLoader(null)}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {savedTeams.length > 0 && (
                <>
                  <p className="text-[10px] text-muted-foreground uppercase font-medium">Your Saved Teams</p>
                  {savedTeams.map(t => (
                    <button
                      key={t.id}
                      onClick={() => loadSavedTeam(t, showLoader)}
                      className="w-full text-left p-3 rounded-xl glass glass-hover flex items-center gap-3"
                    >
                      <Save className="w-4 h-4 text-violet-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.slots.length} Pokémon</p>
                      </div>
                    </button>
                  ))}
                </>
              )}
              <p className="text-[10px] text-muted-foreground uppercase font-medium mt-2">Prebuilt Teams</p>
              {PREBUILT_TEAMS.map(t => (
                <button
                  key={t.id}
                  onClick={() => loadPrebuiltTeam(t, showLoader)}
                  className="w-full text-left p-3 rounded-xl glass glass-hover flex items-center gap-3"
                >
                  <span className={cn(
                    "px-1.5 py-0.5 text-[9px] font-bold rounded flex-shrink-0",
                    t.tier === "S" ? "bg-amber-100 text-amber-700" :
                    t.tier === "A" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-600"
                  )}>{t.tier}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{t.archetype}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// TEAM PANEL - One side of the matchup
// ══════════════════════════════════════════════════════════════════════════

function TeamPanel({
  label, color, pokemon, sets, onPickerOpen, onRemove, onClear, onLoadTeam,
}: {
  label: string;
  color: "blue" | "red";
  pokemon: ChampionsPokemon[];
  sets: CommonSet[];
  onPickerOpen: () => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  onLoadTeam: () => void;
}) {
  const borderColor = color === "blue" ? "border-blue-200" : "border-red-200";
  const headerBg = color === "blue" ? "from-blue-50 to-indigo-50" : "from-red-50 to-orange-50";
  const headerText = color === "blue" ? "text-blue-600" : "text-red-600";

  return (
    <div className={cn("glass rounded-2xl border overflow-hidden", borderColor)}>
      <div className={cn("p-4 bg-gradient-to-r flex items-center justify-between", headerBg)}>
        <h3 className={cn("text-sm font-semibold uppercase tracking-wider flex items-center gap-2", headerText)}>
          <Swords className="w-4 h-4" />
          {label} ({pokemon.length}/6)
        </h3>
        <button
          onClick={onLoadTeam}
          className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <FolderOpen className="w-3 h-3" /> Load
        </button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {Array.from({ length: 6 }, (_, i) => {
            const mon = pokemon[i];
            return (
              <div
                key={i}
                className={cn(
                  "rounded-xl p-2 aspect-square flex flex-col items-center justify-center transition-all",
                  mon ? "glass border border-gray-200" : "border border-dashed border-gray-300 cursor-pointer hover:border-violet-400"
                )}
                onClick={() => !mon && onPickerOpen()}
              >
                {mon ? (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); onRemove(mon.id); }}
                      className="self-end -mt-1 -mr-1 p-0.5 rounded hover:bg-red-100"
                    >
                      <span className="text-xs text-muted-foreground hover:text-red-600">✕</span>
                    </button>
                    <Image src={mon.sprite} alt={mon.name} width={40} height={40} unoptimized />
                    <span className="text-[9px] font-medium mt-0.5 truncate w-full text-center">{mon.name}</span>
                  </>
                ) : (
                  <span className="text-lg text-gray-300">+</span>
                )}
              </div>
            );
          })}
        </div>

        {pokemon.length < 6 && (
          <button
            onClick={onPickerOpen}
            className="w-full py-2 rounded-xl glass glass-hover text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 transition-colors"
          >
            Add Pokémon <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {pokemon.length > 0 && (
          <button
            onClick={onClear}
            className="w-full mt-2 py-1.5 rounded-xl text-xs text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

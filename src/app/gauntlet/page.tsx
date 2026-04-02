"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGauntletStore } from "@/lib/gauntlet-store";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import { PREBUILT_TEAMS, getMove } from "@/lib/engine";
import { generateRandomTeam } from "@/lib/engine/battle-sim";
import { TYPE_COLORS, type ChampionsPokemon, type CommonSet, type StatPoints } from "@/lib/types";
import { InteractiveBattleEngine, type InteractiveBattleLogEntry } from "@/lib/engine/interactive-sim";
import type { TurnAction, BattlePokemon } from "@/lib/engine/battle-sim";
import { cn } from "@/lib/utils";
import {
  Swords, Shield, Heart, Zap, Crosshair, ArrowRight, Save, Coins, ShoppingBag,
  Dumbbell, Skull, Trophy, Play, Settings2, Plus, Minus, Users
} from "lucide-react";

type GauntletScreen = "lobby" | "shop" | "training" | "team-select" | "battle" | "game-over";

// Generate a daily seed based on the current date
function getDailySeed() {
  const date = new Date();
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function randomPseudo(seed: number) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Default sets for shop
function buildDefaultSet(p: ChampionsPokemon): CommonSet {
  const isSpecial = p.baseStats.spAtk > p.baseStats.attack;
  const isFast = p.baseStats.speed > 80;
  return {
    name: p.name,
    nature: isSpecial ? (isFast ? "Timid" : "Modest") : (isFast ? "Jolly" : "Adamant"),
    ability: p.abilities[0]?.name ?? "",
    item: "Life Orb",
    moves: p.moves.slice(0, 4).map(m => m.name),
    sp: { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 }
  };
}

export default function GauntletPage() {
  const [screen, setScreen] = useState<GauntletScreen>("lobby");
  const [mounted, setMounted] = useState(false);
  const store = useGauntletStore();
  const [selectedForBattle, setSelectedForBattle] = useState<number[]>([]);

  // Battle state
  const [engine, setEngine] = useState<InteractiveBattleEngine | null>(null);
  const [battleLogs, setBattleLogs] = useState<InteractiveBattleLogEntry[]>([]);
  const [turnActions, setTurnActions] = useState<Record<number, Partial<TurnAction>>>({});
  const [showMoveSelectFor, setShowMoveSelectFor] = useState<number | null>(null);
  const [showTargetSelectFor, setShowTargetSelectFor] = useState<{ slot: number, move: string } | null>(null);
  const [showSwitchSelectFor, setShowSwitchSelectFor] = useState<number | null>(null);

  // Training state
  const [trainingIndex, setTrainingIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute daily shop
  const dailyShop = useMemo(() => {
    const seed = getDailySeed();
    const shuffled = [...POKEMON_SEED].sort((a, b) => randomPseudo(seed + a.id) - randomPseudo(seed + b.id));
    return shuffled.slice(0, 5).map(p => ({
      pokemon: p,
      cost: p.tier === "S" ? 800 : p.tier === "A" ? 500 : p.tier === "B" ? 300 : 150
    }));
  }, []);

  if (!mounted) return null;

  const handleBuy = (pokemon: ChampionsPokemon, cost: number) => {
    if (store.credits >= cost) {
      store.removeCredits(cost);
      store.addPokemonToRoster(pokemon, buildDefaultSet(pokemon));
    }
  };

  const handleStartBattle = () => {
    if (selectedForBattle.length !== 4) return;

    const team1Pokemon = selectedForBattle.map(idx => store.roster[idx].pokemon);
    const team1Sets = selectedForBattle.map(idx => store.roster[idx].set);

    let team2Pokemon: ChampionsPokemon[];
    let team2Sets: CommonSet[];

    // Boss battle every 5 waves
    if (store.currentWave % 5 === 0) {
      const bossTeams = PREBUILT_TEAMS.filter(t => t.tier === "S");
      const boss = bossTeams[Math.floor(Math.random() * bossTeams.length)];
      team2Pokemon = boss.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean) as ChampionsPokemon[];
      team2Sets = boss.sets.slice(0, team2Pokemon.length);
    } else {
      const opp = generateRandomTeam();
      team2Pokemon = opp.pokemon;
      team2Sets = opp.sets;
    }

    const newEngine = new InteractiveBattleEngine(team1Pokemon, team1Sets, team2Pokemon, team2Sets);

    // Apply HP% from roster
    for (let i = 0; i < 4; i++) {
      const rosterIdx = selectedForBattle[i];
      const hpPct = store.roster[rosterIdx].currentHP;
      const bp = newEngine.state.team1[i];
      if (bp) {
        bp.currentHP = Math.max(0, Math.floor(bp.maxHP * (hpPct / 100)));
        if (bp.currentHP === 0) {
          bp.isAlive = false;
          bp.isFainted = true;
        }
      }
    }

    setEngine(newEngine);
    setBattleLogs(newEngine.log);
    setTurnActions({});
    setScreen("battle");
  };

  const handleCommitTurn = () => {
    if (!engine) return;

    const actions: TurnAction[] = [];
    for (const [slotStr, act] of Object.entries(turnActions)) {
      const slot = parseInt(slotStr);
      const mon = engine.state.active1[slot];
      if (mon && !mon.isFainted && act.moveName) {
        actions.push({
          mon,
          moveName: act.moveName,
          targetSlot: act.targetSlot ?? 0,
          priority: getMove(act.moveName)?.priority ?? 0,
          speed: engine.state.active1[slot]?.stats.speed ?? 0,
          sideIndex: 1,
          switchOut: act.switchOut
        });
      }
    }

    const logEntry = engine.submitTurn(actions);
    setBattleLogs([...engine.log]);
    setTurnActions({});

    if (engine.state.winner) {
      // Update roster HP
      const updatedRoster = [...store.roster];
      engine.state.team1.forEach((bp, i) => {
        const rosterIdx = selectedForBattle[i];
        updatedRoster[rosterIdx].currentHP = bp.isFainted ? 0 : Math.round((bp.currentHP / bp.maxHP) * 100);
      });
      updatedRoster.forEach((r, i) => { store.updateRosterPokemon(i, { currentHP: r.currentHP }); });

      if (engine.state.winner === 1) {
        // Win
        store.addCredits(store.currentWave % 5 === 0 ? 500 : 200);
        store.advanceWave();
        setScreen("lobby"); // Maybe a victory screen
      } else {
        // Lose
        setScreen("game-over");
      }
    }
  };

  const active1 = engine?.state.active1 ?? [null, null];
  const active2 = engine?.state.active2 ?? [null, null];

  const renderLobby = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass rounded-2xl p-8 text-center border border-gray-200/60 dark:border-gray-200/10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          The Endless Gauntlet
        </h1>
        <p className="text-muted-foreground">Wave {store.currentWave} {store.currentWave % 5 === 0 ? " - BOSS ENCOUNTER" : ""}</p>

        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">
            <Coins className="w-5 h-5" />
            {store.credits} Credits
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 font-bold">
            <Dumbbell className="w-5 h-5" />
            SP Cap: {store.bossCap}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <button onClick={() => setScreen("shop")} className="glass glass-hover p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border border-gray-200/60 transition-all">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600"><ShoppingBag className="w-6 h-6" /></div>
          <h3 className="font-bold">Champion Shop</h3>
          <p className="text-xs text-muted-foreground text-center">Draft new Pokémon. Rotates daily.</p>
        </button>
        <button onClick={() => setScreen("training")} className="glass glass-hover p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border border-gray-200/60 transition-all">
          <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center text-violet-600"><Dumbbell className="w-6 h-6" /></div>
          <h3 className="font-bold">Training Room</h3>
          <p className="text-xs text-muted-foreground text-center">Allocate Stat Points (SP) to power up.</p>
        </button>
        <button onClick={() => { setSelectedForBattle([]); setScreen("team-select"); }} className="glass glass-hover p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border border-amber-200 dark:border-amber-500/20 shadow-lg shadow-amber-500/10 transition-all">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600"><Swords className="w-6 h-6" /></div>
          <h3 className="font-bold">Enter Gauntlet</h3>
          <p className="text-xs text-muted-foreground text-center">Select 4 Pokémon and battle.</p>
        </button>
      </div>

      <div className="glass rounded-2xl p-6 border border-gray-200/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold flex items-center gap-2"><Users className="w-5 h-5" /> Your Roster ({store.roster.length})</h3>
          <button onClick={() => { if(store.credits >= 100) { store.removeCredits(100); store.healRoster(); } }} className="text-xs px-3 py-1.5 rounded-lg bg-green-50 text-green-600 font-bold flex items-center gap-1 hover:bg-green-100">
            <Heart className="w-3.5 h-3.5" /> Heal All (100c)
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {store.roster.map((r: any, i: number) => (
            <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-200/5 border border-gray-200/60 relative">
              <Image src={r.pokemon.sprite} alt={r.pokemon.name} width={48} height={48} unoptimized className="mx-auto" />
              <p className="text-xs font-bold text-center mt-2 truncate">{r.pokemon.name}</p>
              <div className="h-1.5 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div className={cn("h-full", r.currentHP > 50 ? "bg-green-500" : r.currentHP > 20 ? "bg-yellow-500" : "bg-red-500")} style={{ width: `${r.currentHP}%` }} />
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-1">{r.currentHP}% HP</p>
            </div>
          ))}
          {store.roster.length === 0 && (
            <div className="col-span-full py-8 text-center text-muted-foreground text-sm">
              Your roster is empty. Visit the Shop to draft your first Pokémon!
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderShop = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={() => setScreen("lobby")} className="text-sm font-medium flex items-center gap-1 hover:text-violet-600"><ArrowRight className="w-4 h-4 rotate-180" /> Back to Lobby</button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-bold text-sm">
          <Coins className="w-4 h-4" /> {store.credits}
        </div>
      </div>

      <h2 className="text-2xl font-bold flex items-center gap-2"><ShoppingBag className="w-6 h-6" /> Champion Shop (Daily Rotation)</h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {dailyShop.map((item, i) => {
          const owned = store.roster.some((r: any) => r.pokemon.id === item.pokemon.id);
          const canAfford = store.credits >= item.cost;
          return (
            <div key={i} className="glass rounded-2xl p-5 flex flex-col items-center border border-gray-200/60">
              <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold self-start", item.pokemon.tier === "S" ? "bg-amber-100 text-amber-700" : "bg-gray-100")}>{item.pokemon.tier} Tier</span>
              <Image src={item.pokemon.sprite} alt={item.pokemon.name} width={80} height={80} unoptimized className="my-2" />
              <h3 className="font-bold text-lg">{item.pokemon.name}</h3>
              <div className="flex gap-1 mb-4 mt-1">
                {item.pokemon.types.map(t => <span key={t} className="w-3 h-3 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />)}
              </div>
              <button
                disabled={owned || !canAfford}
                onClick={() => handleBuy(item.pokemon, item.cost)}
                className={cn(
                  "w-full py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all",
                  owned ? "bg-gray-100 text-gray-400 cursor-not-allowed" :
                  canAfford ? "bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-500/20" :
                  "bg-red-50 text-red-400 cursor-not-allowed"
                )}
              >
                {owned ? "Owned" : <><Coins className="w-4 h-4" /> {item.cost}</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={() => { setScreen("lobby"); setTrainingIndex(null); }} className="text-sm font-medium flex items-center gap-1 hover:text-violet-600"><ArrowRight className="w-4 h-4 rotate-180" /> Back to Lobby</button>
        <div className="px-3 py-1.5 rounded-lg bg-violet-50 text-violet-700 font-bold text-sm">SP Cap: {store.bossCap}</div>
      </div>

      <h2 className="text-2xl font-bold flex items-center gap-2"><Dumbbell className="w-6 h-6" /> Training Room</h2>

      {trainingIndex === null ? (
        <div className="grid sm:grid-cols-4 gap-4">
          {store.roster.map((r: any, i: number) => {
            const usedSP = Object.values(r.set.sp).reduce((a: any,b: any)=>a+b,0) as number;
            return (
              <button key={i} onClick={() => setTrainingIndex(i)} className="glass glass-hover p-4 rounded-xl flex flex-col items-center border border-gray-200/60">
                <Image src={r.pokemon.sprite} alt={r.pokemon.name} width={56} height={56} unoptimized />
                <p className="font-bold text-sm mt-2">{r.pokemon.name}</p>
                <p className={cn("text-[10px] mt-1 font-mono", usedSP >= store.bossCap ? "text-amber-600 font-bold" : "text-muted-foreground")}>SP: {usedSP}/{store.bossCap}</p>
              </button>
            );
          })}
        </div>
      ) : (() => {
        const r = store.roster[trainingIndex];
        const usedSP = Object.values(r.set.sp).reduce((a: any,b: any)=>a+b,0) as number;
        const setSp = (stat: keyof StatPoints, val: number) => {
          const current = r.set.sp[stat];
          const diff = val - current;
          if (val < 0 || val > 32) return;
          if (usedSP + diff > store.bossCap) return;
          const newSet = { ...r.set, sp: { ...r.set.sp, [stat]: val } };
          store.updateRosterPokemon(trainingIndex, { set: newSet });
        };
        return (
          <div className="glass p-6 rounded-2xl border border-gray-200/60 flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <Image src={r.pokemon.sprite} alt={r.pokemon.name} width={120} height={120} unoptimized />
              <h3 className="font-bold text-xl mt-2">{r.pokemon.name}</h3>
              <div className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 font-bold mt-2">SP: {usedSP}/{store.bossCap}</div>
            </div>
            <div className="flex-1 space-y-3">
              {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as (keyof StatPoints)[]).map(stat => (
                <div key={stat} className="flex items-center gap-3">
                  <span className="w-12 text-xs font-bold uppercase">{stat}</span>
                  <button onClick={() => setSp(stat, r.set.sp[stat] - 2)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"><Minus className="w-4 h-4" /></button>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 transition-all" style={{ width: `${(r.set.sp[stat]/32)*100}%` }} />
                  </div>
                  <button onClick={() => setSp(stat, r.set.sp[stat] + 2)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
                  <span className="w-6 text-right text-xs font-mono">{r.set.sp[stat]}</span>
                </div>
              ))}
              <div className="pt-4 flex justify-end">
                <button onClick={() => setTrainingIndex(null)} className="px-6 py-2 bg-violet-600 text-white rounded-xl font-bold">Done</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );

  const renderTeamSelect = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={() => setScreen("lobby")} className="text-sm font-medium flex items-center gap-1 hover:text-violet-600"><ArrowRight className="w-4 h-4 rotate-180" /> Back to Lobby</button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Select 4 Pokémon for Battle</h2>
        <p className="text-muted-foreground mt-2">Only Pokémon with HP &gt; 0 can battle.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {[0, 1, 2, 3].map(i => {
          const idx = selectedForBattle[i];
          const mon = idx !== undefined ? store.roster[idx] : null;
          return (
            <div key={i} className="w-24 h-24 rounded-2xl glass border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
              {mon ? (
                <>
                  <Image src={mon.pokemon.sprite} alt={mon.pokemon.name} width={64} height={64} unoptimized />
                  <button onClick={() => setSelectedForBattle(selectedForBattle.filter(x => x !== idx))} className="absolute top-1 right-1 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">✕</button>
                </>
              ) : <span className="text-2xl text-gray-300">+</span>}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {store.roster.map((r: any, i: number) => {
          const isSelected = selectedForBattle.includes(i);
          const isDead = r.currentHP <= 0;
          return (
            <button
              key={i}
              disabled={isDead || (isSelected === false && selectedForBattle.length >= 4)}
              onClick={() => {
                if (isSelected) setSelectedForBattle(selectedForBattle.filter(x => x !== i));
                else if (selectedForBattle.length < 4) setSelectedForBattle([...selectedForBattle, i]);
              }}
              className={cn(
                "p-3 rounded-xl border transition-all flex flex-col items-center",
                isSelected ? "border-violet-500 bg-violet-50" : "glass border-gray-200/60",
                isDead && "opacity-50 grayscale cursor-not-allowed"
              )}
            >
              <Image src={r.pokemon.sprite} alt={r.pokemon.name} width={48} height={48} unoptimized />
              <p className="text-[10px] font-bold mt-1 truncate w-full text-center">{r.pokemon.name}</p>
              <p className={cn("text-[9px]", isDead ? "text-red-500 font-bold" : "text-muted-foreground")}>{r.currentHP}% HP</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button
          disabled={selectedForBattle.length !== 4}
          onClick={handleStartBattle}
          className="px-8 py-3 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 transition-colors flex items-center gap-2 text-lg"
        >
          <Swords className="w-5 h-5" /> Start Battle
        </button>
      </div>
    </div>
  );

  const renderBattle = () => {
    if (!engine) return null;

    const renderMon = (mon: BattlePokemon | null, side: 1 | 2, slot: number) => {
      if (!mon) return <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl opacity-30" />;

      const needsAction = side === 1 && !mon.isFainted && !turnActions[slot]?.moveName && !turnActions[slot]?.switchOut;
      const isSelected = showMoveSelectFor === slot;

      return (
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs font-bold w-24 truncate">{mon.pokemon.name}</span>
          </div>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className={cn("h-full", mon.currentHP/mon.maxHP > 0.5 ? "bg-green-500" : mon.currentHP/mon.maxHP > 0.2 ? "bg-yellow-500" : "bg-red-500")} style={{ width: `${(mon.currentHP/mon.maxHP)*100}%` }} />
          </div>

          <div className={cn("relative w-28 h-28 flex items-center justify-center transition-all", needsAction && "ring-4 ring-amber-400 rounded-full animate-pulse", isSelected && "ring-4 ring-violet-500 rounded-full", mon.isFainted && "opacity-30 grayscale")}>
            <Image src={mon.pokemon.sprite} alt={mon.pokemon.name} width={96} height={96} unoptimized className={side === 1 ? "scale-x-[-1]" : ""} />
            {mon.status && <span className="absolute top-0 right-0 px-1 py-0.5 bg-gray-800 text-white text-[8px] font-bold rounded uppercase">{mon.status}</span>}
          </div>

          {side === 1 && !mon.isFainted && (
            <div className="flex gap-1 mt-2">
              <button
                onClick={() => { setShowMoveSelectFor(slot); setShowTargetSelectFor(null); setShowSwitchSelectFor(null); }}
                className="px-3 py-1 text-[10px] font-bold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                {turnActions[slot]?.moveName && !turnActions[slot]?.switchOut ? `Move: ${turnActions[slot].moveName}` : "Fight"}
              </button>
              <button
                onClick={() => { setShowSwitchSelectFor(slot); setShowMoveSelectFor(null); setShowTargetSelectFor(null); }}
                className="px-3 py-1 text-[10px] font-bold rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700"
              >
                {turnActions[slot]?.switchOut ? `Switch: ${turnActions[slot].moveName}` : "Switch"}
              </button>
            </div>
          )}
        </div>
      );
    };

    const needsAnyAction = active1.some((m, i) => m && !m.isFainted && !turnActions[i]?.moveName && !turnActions[i]?.switchOut);

    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between glass p-4 rounded-2xl border border-gray-200/60">
          <h2 className="text-xl font-bold flex items-center gap-2"><Swords className="w-5 h-5 text-amber-500" /> Wave {store.currentWave}</h2>
          <div className="px-4 py-1.5 rounded-full bg-gray-100 text-sm font-mono font-bold">Turn {engine.state.turn + 1}</div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="glass p-6 rounded-2xl border border-blue-200 bg-blue-50/30">
            <h3 className="text-sm font-bold text-blue-600 mb-6 text-center uppercase">Your Team</h3>
            <div className="flex justify-around">
              {renderMon(active1[0], 1, 0)}
              {renderMon(active1[1], 1, 1)}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-red-200 bg-red-50/30">
            <h3 className="text-sm font-bold text-red-600 mb-6 text-center uppercase">Opponent</h3>
            <div className="flex justify-around">
              {renderMon(active2[0], 2, 0)}
              {renderMon(active2[1], 2, 1)}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="glass p-6 rounded-2xl border border-gray-200/60 min-h-[200px]">
          <AnimatePresence mode="wait">
            {showSwitchSelectFor !== null ? (() => {
              const bench = engine.state.team1.filter(p => p.isAlive && !p.isFainted && p !== active1[0] && p !== active1[1]);
              return (
                <motion.div key="switch" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h4 className="text-center font-bold mb-4">Switch {active1[showSwitchSelectFor]?.pokemon.name} with...</h4>
                  <div className="flex justify-center gap-4 max-w-lg mx-auto">
                    {bench.length > 0 ? bench.map(m => (
                      <button
                        key={m.pokemon.id}
                        onClick={() => {
                          setTurnActions({ ...turnActions, [showSwitchSelectFor]: { moveName: m.pokemon.name, targetSlot: -1, switchOut: true } });
                          setShowSwitchSelectFor(null);
                        }}
                        className="p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 flex flex-col items-center min-w-[100px]"
                      >
                        <Image src={m.pokemon.sprite} alt={m.pokemon.name} width={48} height={48} unoptimized />
                        <span className="font-bold text-xs mt-2">{m.pokemon.name}</span>
                        <span className="text-[10px] text-muted-foreground mt-1">{Math.round((m.currentHP/m.maxHP)*100)}% HP</span>
                      </button>
                    )) : (
                      <p className="text-muted-foreground text-sm">No Pokémon available to switch.</p>
                    )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button onClick={() => setShowSwitchSelectFor(null)} className="text-xs font-medium text-muted-foreground hover:text-foreground">Cancel</button>
                  </div>
                </motion.div>
              );
            })() : showMoveSelectFor !== null && showTargetSelectFor === null ? (
              <motion.div key="moves" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h4 className="text-center font-bold mb-4">What will {active1[showMoveSelectFor]?.pokemon.name} do?</h4>
                <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                  {active1[showMoveSelectFor]?.set.moves.map(m => {
                    const moveData = getMove(m);
                    return (
                      <button
                        key={m}
                        onClick={() => {
                          if (moveData?.target === "normal") {
                            setShowTargetSelectFor({ slot: showMoveSelectFor, move: m });
                          } else {
                            setTurnActions({ ...turnActions, [showMoveSelectFor]: { moveName: m, targetSlot: -1 } });
                            setShowMoveSelectFor(null);
                          }
                        }}
                        className="p-3 rounded-xl border text-left hover:bg-gray-50 flex flex-col items-center"
                        style={{ borderColor: TYPE_COLORS[moveData?.type ?? "normal"] }}
                      >
                        <span className="font-bold text-sm">{m}</span>
                        <span className="text-[10px] uppercase mt-1 px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: TYPE_COLORS[moveData?.type ?? "normal"] }}>{moveData?.type}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="flex justify-center mt-4">
                  <button onClick={() => setShowMoveSelectFor(null)} className="text-xs font-medium text-muted-foreground hover:text-foreground">Cancel</button>
                </div>
              </motion.div>
            ) : showTargetSelectFor !== null ? (
              <motion.div key="targets" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h4 className="text-center font-bold mb-4">Select Target for {showTargetSelectFor.move}</h4>
                <div className="flex justify-center gap-4">
                  {active2.map((m, i) => m && !m.isFainted && (
                    <button
                      key={i}
                      onClick={() => {
                        setTurnActions({ ...turnActions, [showTargetSelectFor.slot]: { moveName: showTargetSelectFor.move, targetSlot: i } });
                        setShowTargetSelectFor(null);
                        setShowMoveSelectFor(null);
                      }}
                      className="p-4 rounded-xl glass glass-hover flex flex-col items-center"
                    >
                      <Image src={m.pokemon.sprite} alt={m.pokemon.name} width={48} height={48} unoptimized />
                      <span className="text-xs font-bold mt-2">{m.pokemon.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <button onClick={() => setShowTargetSelectFor(null)} className="text-xs font-medium text-muted-foreground hover:text-foreground">Back to Moves</button>
                </div>
              </motion.div>
            ) : engine.state.winner ? (
              <motion.div key="winner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full">
                <h2 className="text-3xl font-bold mb-4">{engine.state.winner === 1 ? "Battle Won!" : "Defeated..."}</h2>
                <button onClick={handleCommitTurn} className="px-6 py-2 bg-amber-500 text-white rounded-xl font-bold">Continue</button>
              </motion.div>
            ) : (
              <motion.div key="execute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full">
                {needsAnyAction ? (
                  <p className="text-muted-foreground">Select actions for your Pokémon above.</p>
                ) : (
                  <button
                    onClick={handleCommitTurn}
                    className="px-8 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all flex items-center gap-2 shadow-lg shadow-violet-500/20"
                  >
                    Execute Turn <Play className="w-4 h-4 fill-current" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Battle Log */}
        {battleLogs.length > 0 && (
          <div className="glass p-4 rounded-2xl border border-gray-200/60 max-h-48 overflow-y-auto space-y-2 text-xs">
            {battleLogs[battleLogs.length - 1].events.map((ev, i) => (
              <p key={i} className="text-muted-foreground">{ev}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderGameOver = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
        <Skull className="w-12 h-12" />
      </div>
      <h1 className="text-5xl font-black">GAME OVER</h1>
      <p className="text-xl text-muted-foreground">You reached Wave {store.currentWave}</p>
      <button
        onClick={() => { store.resetGauntlet(); setScreen("lobby"); }}
        className="mt-8 px-8 py-3 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 shadow-lg shadow-red-500/20"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {screen === "lobby" && renderLobby()}
          {screen === "shop" && renderShop()}
          {screen === "training" && renderTraining()}
          {screen === "team-select" && renderTeamSelect()}
          {screen === "battle" && renderBattle()}
          {screen === "game-over" && renderGameOver()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

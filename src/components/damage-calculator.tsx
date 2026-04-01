"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Swords, Search, Sun, CloudRain, Snowflake, Wind,
  Zap, Shield, ChevronDown, Flame, Droplets, ArrowRightLeft,
  HelpCircle, Sparkles, X, ChevronRight,
} from "lucide-react";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import type { ChampionsPokemon, CommonSet, StatPoints, PokemonType } from "@/lib/types";
import { TYPE_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  calculateDamage,
  calculateStats,
  type DamageCalcPokemon,
  type DamageCalcTarget,
  type DamageCalcOptions,
  type DamageResult,
  type NatureName,
  getNatureModifier,
  getMove,
  NATURES,
} from "@/lib/engine";
import { USAGE_DATA } from "@/lib/usage-data";
import { SearchSelect, type SearchSelectOption } from "@/components/search-select";

// ── Types ────────────────────────────────────────────────────────────────

interface PokemonSlot {
  pokemon: ChampionsPokemon | null;
  set: CommonSet | null;
  stages: { atk: number; def: number; spAtk: number; spDef: number; speed: number };
  isBurned: boolean;
  currentHP: number; // 0-100
}

const ALL_NATURES: NatureName[] = [
  "Hardy","Lonely","Brave","Adamant","Naughty","Bold","Docile","Relaxed",
  "Impish","Lax","Timid","Hasty","Serious","Jolly","Naive","Modest",
  "Mild","Quiet","Bashful","Rash","Calm","Gentle","Sassy","Careful","Quirky",
];

const WEATHER_OPTIONS = [
  { value: "none", label: "None", icon: null },
  { value: "sun", label: "Sun", icon: Sun },
  { value: "rain", label: "Rain", icon: CloudRain },
  { value: "sand", label: "Sand", icon: Wind },
  { value: "snow", label: "Snow", icon: Snowflake },
] as const;

const TERRAIN_OPTIONS = [
  { value: "none", label: "None" },
  { value: "electric", label: "Electric" },
  { value: "grassy", label: "Grassy" },
  { value: "misty", label: "Misty" },
  { value: "psychic", label: "Psychic" },
] as const;

const STAT_KEYS = ["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const;
const STAT_LABELS: Record<string, string> = {
  hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe",
};

const TERRAIN_COLORS: Record<string, string> = {
  electric: "bg-yellow-100 text-yellow-700 border-yellow-300",
  grassy: "bg-green-100 text-green-700 border-green-300",
  misty: "bg-pink-100 text-pink-700 border-pink-300",
  psychic: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300",
};

// ── Helpers ──────────────────────────────────────────────────────────────

function isMegaStoneItem(item: string): boolean {
  return item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
}

/** Resolve mega form base stats, types, and ability for damage calc display */
function resolveMegaForCalc(p: ChampionsPokemon, set: CommonSet): {
  baseStats: ChampionsPokemon["baseStats"];
  types: PokemonType[];
  ability: string;
} {
  if (p.hasMega && p.forms && isMegaStoneItem(set.item)) {
    const megaForm = p.forms.find(f => f.isMega);
    if (megaForm) {
      return {
        baseStats: megaForm.baseStats,
        types: [...megaForm.types] as PokemonType[],
        ability: megaForm.abilities[0]?.name ?? set.ability,
      };
    }
  }
  return { baseStats: p.baseStats, types: [...p.types] as PokemonType[], ability: set.ability };
}

function getDefaultSet(p: ChampionsPokemon): CommonSet {
  const usage = USAGE_DATA[p.id];
  if (usage && usage.length > 0) return usage[0];
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

function emptySlot(): PokemonSlot {
  return { pokemon: null, set: null, stages: { atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0 }, isBurned: false, currentHP: 100 };
}

function getKOChanceText(result: DamageResult): string {
  if (result.isOHKO && result.percentHP[0] >= 100) return "Guaranteed OHKO";
  if (result.isOHKO) return "OHKO (87.5% - 100%)";
  if (result.is2HKO && result.percentHP[0] >= 50) return "Guaranteed 2HKO";
  if (result.is2HKO) return "2HKO possible";
  const hitsNeeded = Math.ceil(100 / ((result.percentHP[0] + result.percentHP[1]) / 2));
  return `${hitsNeeded}HKO`;
}

function getNatureDisplay(nature: string): { plus: string | null; minus: string | null } {
  const n = NATURES[nature as NatureName];
  if (!n || !n.plus || !n.minus) return { plus: null, minus: null };
  return { plus: STAT_LABELS[n.plus] ?? n.plus, minus: STAT_LABELS[n.minus] ?? n.minus };
}

// ── Component ────────────────────────────────────────────────────────────

export default function DamageCalculator() {
  const [attacker, setAttacker] = useState<PokemonSlot>(emptySlot());
  const [defender, setDefender] = useState<PokemonSlot>(emptySlot());
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [weather, setWeather] = useState<DamageCalcOptions["weather"]>("none");
  const [terrain, setTerrain] = useState<DamageCalcOptions["terrain"]>("none");
  const [isDoubles, setIsDoubles] = useState(true);
  const [isCrit, setIsCrit] = useState(false);
  const [helpingHand, setHelpingHand] = useState(false);
  const [lightScreen, setLightScreen] = useState(false);
  const [reflect, setReflect] = useState(false);
  const [auroraVeil, setAuroraVeil] = useState(false);
  const [friendGuard, setFriendGuard] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<"attacker" | "defender" | null>(null);
  const [pickerSearch, setPickerSearch] = useState("");

  // Calculate stats for display (resolving mega forms)
  const attackerStats = useMemo(() => {
    if (!attacker.pokemon || !attacker.set) return null;
    const resolved = resolveMegaForCalc(attacker.pokemon, attacker.set);
    return calculateStats(resolved.baseStats, attacker.set.sp, attacker.set.nature as NatureName);
  }, [attacker.pokemon, attacker.set]);

  const defenderStats = useMemo(() => {
    if (!defender.pokemon || !defender.set) return null;
    const resolved = resolveMegaForCalc(defender.pokemon, defender.set);
    return calculateStats(resolved.baseStats, defender.set.sp, defender.set.nature as NatureName);
  }, [defender.pokemon, defender.set]);

  // Calculate damage for all moves
  const allMoveResults = useMemo(() => {
    if (!attacker.pokemon || !attacker.set || !defender.pokemon || !defender.set) return [];
    const options: DamageCalcOptions = {
      weather, terrain, isDoubles, isCrit, helpingHand,
      lightScreen, reflect, auroraVeil, friendGuard,
    };
    const atkResolved = resolveMegaForCalc(attacker.pokemon, attacker.set);
    const defResolved = resolveMegaForCalc(defender.pokemon, defender.set);
    const atkData: DamageCalcPokemon = {
      baseStats: atkResolved.baseStats,
      sp: attacker.set.sp,
      nature: attacker.set.nature as NatureName,
      types: atkResolved.types,
      ability: atkResolved.ability,
      item: attacker.set.item,
      atkStages: attacker.stages.atk,
      spAtkStages: attacker.stages.spAtk,
      isBurned: attacker.isBurned,
      currentHPPercent: attacker.currentHP,
    };
    const defData: DamageCalcTarget = {
      baseStats: defResolved.baseStats,
      sp: defender.set.sp,
      nature: defender.set.nature as NatureName,
      types: defResolved.types,
      ability: defResolved.ability,
      item: defender.set.item,
      defStages: defender.stages.def,
      spDefStages: defender.stages.spDef,
    };

    return attacker.set.moves.map(moveName => {
      try {
        return calculateDamage(atkData, defData, moveName, options);
      } catch {
        return null;
      }
    }).filter(Boolean) as DamageResult[];
  }, [attacker, defender, weather, terrain, isDoubles, isCrit, helpingHand, lightScreen, reflect, auroraVeil, friendGuard]);

  // Selected move result (for detailed view)
  const selectedResult = useMemo(() => {
    if (!selectedMove) return allMoveResults[0] ?? null;
    return allMoveResults.find(r => r.moveName === selectedMove) ?? allMoveResults[0] ?? null;
  }, [allMoveResults, selectedMove]);

  // Pokemon picker
  const filteredPokemon = useMemo(() => {
    return POKEMON_SEED.filter(p =>
      pickerSearch === "" || p.name.toLowerCase().includes(pickerSearch.toLowerCase())
    );
  }, [pickerSearch]);

  const selectPokemon = useCallback((p: ChampionsPokemon) => {
    const set = getDefaultSet(p);
    const slot: PokemonSlot = { pokemon: p, set, stages: { atk: 0, def: 0, spAtk: 0, spDef: 0, speed: 0 }, isBurned: false, currentHP: 100 };
    if (pickerTarget === "attacker") {
      setAttacker(slot);
      setSelectedMove(null);
    } else {
      setDefender(slot);
    }
    setPickerTarget(null);
    setPickerSearch("");
  }, [pickerTarget]);

  const swapPokemon = () => {
    trackEvent("swap_pokemon", "damage_calc");
    const tmp = { ...attacker };
    setAttacker({ ...defender });
    setDefender(tmp);
    setSelectedMove(null);
  };

  const updateAttackerSet = (updates: Partial<CommonSet>) => {
    if (!attacker.set) return;
    setAttacker(prev => ({ ...prev, set: { ...prev.set!, ...updates } }));
  };

  const updateDefenderSet = (updates: Partial<CommonSet>) => {
    if (!defender.set) return;
    setDefender(prev => ({ ...prev, set: { ...prev.set!, ...updates } }));
  };

  const updateAttackerSP = (stat: string, value: number) => {
    if (!attacker.set) return;
    const sp = { ...attacker.set.sp, [stat]: Math.max(0, Math.min(32, value)) };
    const total = Object.values(sp).reduce((a, b) => a + b, 0);
    if (total <= 66) updateAttackerSet({ sp });
  };

  const updateDefenderSP = (stat: string, value: number) => {
    if (!defender.set) return;
    const sp = { ...defender.set.sp, [stat]: Math.max(0, Math.min(32, value)) };
    const total = Object.values(sp).reduce((a, b) => a + b, 0);
    if (total <= 66) updateDefenderSet({ sp });
  };

  // Generate 16 damage rolls
  const damageRolls = useMemo(() => {
    if (!selectedResult) return [];
    const min = selectedResult.damage[0];
    const max = selectedResult.damage[1];
    if (min === max) return [min];
    const rolls: number[] = [];
    for (let i = 0; i < 16; i++) {
      rolls.push(Math.floor(min + (max - min) * (i / 15)));
    }
    return rolls;
  }, [selectedResult]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Field Conditions Bar */}
      <div className="glass rounded-2xl p-4 border border-gray-200/60">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Weather */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground">Weather</span>
            <div className="flex gap-1">
              {WEATHER_OPTIONS.map(w => (
                <button
                  key={w.value}
                  onClick={() => setWeather(w.value as DamageCalcOptions["weather"])}
                  className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-medium transition-all",
                    weather === w.value
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                      : "glass glass-hover text-muted-foreground"
                  )}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Terrain */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground">Terrain</span>
            <div className="flex gap-1">
              {TERRAIN_OPTIONS.map(t => (
                <button
                  key={t.value}
                  onClick={() => setTerrain(t.value as DamageCalcOptions["terrain"])}
                  className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-medium transition-all",
                    terrain === t.value
                      ? t.value !== "none"
                        ? `${TERRAIN_COLORS[t.value]} border`
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                      : "glass glass-hover text-muted-foreground"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* Toggles */}
          <div className="flex gap-1.5 flex-wrap">
            {[
              { label: "Doubles", active: isDoubles, toggle: () => setIsDoubles(!isDoubles) },
              { label: "Crit", active: isCrit, toggle: () => setIsCrit(!isCrit) },
              { label: "Helping Hand", active: helpingHand, toggle: () => setHelpingHand(!helpingHand) },
              { label: "Light Screen", active: lightScreen, toggle: () => setLightScreen(!lightScreen) },
              { label: "Reflect", active: reflect, toggle: () => setReflect(!reflect) },
              { label: "Aurora Veil", active: auroraVeil, toggle: () => setAuroraVeil(!auroraVeil) },
              { label: "Friend Guard", active: friendGuard, toggle: () => setFriendGuard(!friendGuard) },
            ].map(t => (
              <button
                key={t.label}
                onClick={t.toggle}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-medium transition-all border",
                  t.active
                    ? "bg-violet-100 text-violet-700 border-violet-300"
                    : "glass glass-hover text-muted-foreground border-transparent"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Attacker | Results | Defender */}
      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* ── ATTACKER PANEL ────────────────────────────────────────── */}
        <PokemonPanel
          label="Attacker"
          slot={attacker}
          stats={attackerStats}
          color="blue"
          onPickerOpen={() => setPickerTarget("attacker")}
          onSetUpdate={updateAttackerSet}
          onSPUpdate={updateAttackerSP}
          onStageChange={(stat, val) => setAttacker(prev => ({ ...prev, stages: { ...prev.stages, [stat]: val } }))}
          showAtkStages
          onBurnToggle={() => setAttacker(prev => ({ ...prev, isBurned: !prev.isBurned }))}
          isBurned={attacker.isBurned}
          currentHP={attacker.currentHP}
          onHPChange={(hp) => setAttacker(prev => ({ ...prev, currentHP: hp }))}
        />

        {/* ── CENTER: SWAP + RESULTS ────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 lg:pt-20">
          <button
            onClick={swapPokemon}
            className="p-3 rounded-xl glass glass-hover border border-gray-200/60 hover:border-violet-300 transition-all"
            title="Swap attacker and defender"
          >
            <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Compact result card */}
          {selectedResult && (
            <div className="glass rounded-2xl p-4 border border-gray-200/60 w-56 text-center">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">
                {selectedResult.moveName}
              </p>
              <p className={cn(
                "text-3xl font-black",
                selectedResult.percentHP[1] >= 100 ? "text-red-600" :
                selectedResult.percentHP[1] >= 50 ? "text-orange-500" :
                "text-green-600"
              )}>
                {selectedResult.percentHP[0].toFixed(1)}–{selectedResult.percentHP[1].toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedResult.damage[0]}–{selectedResult.damage[1]} HP
              </p>
              <div className={cn(
                "mt-2 px-3 py-1 rounded-lg text-[11px] font-bold inline-block",
                selectedResult.isOHKO ? "bg-red-100 text-red-700" :
                selectedResult.is2HKO ? "bg-orange-100 text-orange-700" :
                "bg-green-100 text-green-700"
              )}>
                {getKOChanceText(selectedResult)}
              </div>
              <div className="mt-2 text-[10px] text-muted-foreground">
                {selectedResult.effectiveness === 0 ? "Immune" :
                 selectedResult.effectiveness < 1 ? `Not very effective (×${selectedResult.effectiveness})` :
                 selectedResult.effectiveness > 1 ? `Super effective (×${selectedResult.effectiveness})` :
                 "Neutral"}
              </div>
            </div>
          )}
        </div>

        {/* ── DEFENDER PANEL ────────────────────────────────────────── */}
        <PokemonPanel
          label="Defender"
          slot={defender}
          stats={defenderStats}
          color="red"
          onPickerOpen={() => setPickerTarget("defender")}
          onSetUpdate={updateDefenderSet}
          onSPUpdate={updateDefenderSP}
          onStageChange={(stat, val) => setDefender(prev => ({ ...prev, stages: { ...prev.stages, [stat]: val } }))}
          showDefStages
        />
      </div>

      {/* ── MOVE COMPARISON TABLE ────────────────────────────────────── */}
      {allMoveResults.length > 0 && attacker.set && (
        <div className="glass rounded-2xl p-5 border border-gray-200/60">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Swords className="w-4 h-4" />
            All Moves vs {defender.pokemon?.name ?? "Defender"}
          </h3>
          <div className="space-y-2">
            {allMoveResults.map((r, i) => {
              const move = getMove(r.moveName);
              const isSelected = (selectedMove ?? attacker.set!.moves[0]) === r.moveName;
              return (
                <button
                  key={r.moveName}
                  onClick={() => setSelectedMove(r.moveName)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                    isSelected ? "bg-violet-50 border border-violet-200 shadow-sm" : "hover:bg-gray-50"
                  )}
                >
                  {/* Move type badge */}
                  {move && (
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: TYPE_COLORS[move.type] }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">{r.moveName}</span>
                      {move && (
                        <>
                          <span className="text-[9px] text-muted-foreground uppercase">{move.category}</span>
                          <span className="text-[9px] text-muted-foreground">BP {move.basePower || "-"}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Damage range */}
                  <div className="text-right flex-shrink-0 w-36">
                    <span className={cn(
                      "text-sm font-bold",
                      r.percentHP[1] >= 100 ? "text-red-600" :
                      r.percentHP[1] >= 50 ? "text-orange-500" :
                      "text-green-600"
                    )}>
                      {r.percentHP[0].toFixed(1)}–{r.percentHP[1].toFixed(1)}%
                    </span>
                  </div>

                  {/* KO badge */}
                  <span className={cn(
                    "text-[9px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 w-16 text-center",
                    r.isOHKO ? "bg-red-100 text-red-700" :
                    r.is2HKO ? "bg-orange-100 text-orange-700" :
                    "bg-gray-100 text-gray-600"
                  )}>
                    {r.isOHKO ? "OHKO" : r.is2HKO ? "2HKO" : `${Math.ceil(100 / ((r.percentHP[0] + r.percentHP[1]) / 2))}HKO`}
                  </span>

                  {/* Effectiveness */}
                  <span className={cn(
                    "text-[9px] font-medium w-8 text-center flex-shrink-0",
                    r.effectiveness > 1 ? "text-green-600" :
                    r.effectiveness < 1 && r.effectiveness > 0 ? "text-red-500" :
                    r.effectiveness === 0 ? "text-gray-400" :
                    "text-gray-500"
                  )}>
                    ×{r.effectiveness}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Damage Rolls */}
          {selectedResult && damageRolls.length > 1 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-2">
                Damage Rolls ({selectedResult.moveName})
              </p>
              <div className="flex gap-1 flex-wrap">
                {damageRolls.map((roll, i) => {
                  const hpTotal = defenderStats?.hp ?? 1;
                  const pct = (roll / hpTotal) * 100;
                  return (
                    <span
                      key={i}
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[10px] font-mono",
                        pct >= 100 ? "bg-red-100 text-red-700" :
                        pct >= 50 ? "bg-orange-50 text-orange-600" :
                        "bg-gray-50 text-gray-600"
                      )}
                    >
                      {roll}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!attacker.pokemon && !defender.pokemon && (
        <div className="glass rounded-2xl p-12 border border-gray-200/60 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mx-auto mb-4">
            <Swords className="w-10 h-10 text-muted-foreground/20" />
          </div>
          <p className="text-muted-foreground text-sm mb-1 font-medium">Select Pokémon to Calculate Damage</p>
          <p className="text-xs text-muted-foreground/60 max-w-sm mx-auto">
            Pick an attacker and defender from the Champions Lab roster. Fully accurate VGC doubles damage calc
            using the 66 SP system, abilities, items, weather, terrain, screens, and all Gen 9 mechanics.
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
                placeholder={`Search ${pickerTarget}...`}
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
                    onClick={() => selectPokemon(p)}
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
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// POKEMON PANEL - Attacker or Defender side
// ══════════════════════════════════════════════════════════════════════════

function PokemonPanel({
  label, slot, stats, color, onPickerOpen, onSetUpdate, onSPUpdate,
  onStageChange, showAtkStages, showDefStages, onBurnToggle, isBurned,
  currentHP, onHPChange,
}: {
  label: string;
  slot: PokemonSlot;
  stats: ReturnType<typeof calculateStats> | null;
  color: "blue" | "red";
  onPickerOpen: () => void;
  onSetUpdate: (u: Partial<CommonSet>) => void;
  onSPUpdate: (stat: string, value: number) => void;
  onStageChange: (stat: string, val: number) => void;
  showAtkStages?: boolean;
  showDefStages?: boolean;
  onBurnToggle?: () => void;
  isBurned?: boolean;
  currentHP?: number;
  onHPChange?: (hp: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const p = slot.pokemon;
  const set = slot.set;
  const borderColor = color === "blue" ? "border-blue-200" : "border-red-200";
  const headerBg = color === "blue" ? "from-blue-50 to-indigo-50" : "from-red-50 to-orange-50";
  const headerText = color === "blue" ? "text-blue-600" : "text-red-600";

  const usageSets = p ? (USAGE_DATA[p.id] ?? []) : [];
  const totalSP = set ? Object.values(set.sp).reduce((a, b) => a + b, 0) : 0;
  const natureDisplay = set ? getNatureDisplay(set.nature) : { plus: null, minus: null };
  // Resolve mega form stats for display
  const resolvedStats = p && set ? resolveMegaForCalc(p, set) : null;

  return (
    <div className={cn("glass rounded-2xl border overflow-hidden", borderColor)}>
      {/* Header */}
      <div className={cn("p-4 bg-gradient-to-r", headerBg)}>
        <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-2", headerText)}>{label}</p>
        {p ? (
          <div className="flex items-center gap-3">
            <Image src={p.sprite} alt={p.name} width={56} height={56} unoptimized />
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold truncate">{p.name}</p>
              <div className="flex gap-1 mt-1">
                {(resolvedStats?.types ?? p.types).map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[9px] font-bold text-white capitalize"
                    style={{ backgroundColor: TYPE_COLORS[t] }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={onPickerOpen} className="p-2 rounded-lg glass glass-hover flex-shrink-0">
              <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <button
            onClick={onPickerOpen}
            className="w-full py-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-violet-400 text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-2"
          >
            <Search className="w-6 h-6" />
            <span className="text-sm font-medium">Select {label}</span>
          </button>
        )}
      </div>

      {/* Body */}
      {p && set && (
        <div className="p-4 space-y-4">
          {/* Set selector */}
          {usageSets.length > 1 && (
            <div>
              <label className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">Set</label>
              <select
                value={set.nature + "|" + set.ability + "|" + set.item}
                onChange={(e) => {
                  const selected = usageSets.find(s => (s.nature + "|" + s.ability + "|" + s.item) === e.target.value);
                  if (selected) onSetUpdate(selected);
                }}
                className="w-full px-3 py-2 rounded-lg glass border border-gray-200 text-xs bg-transparent focus:outline-none"
              >
                {usageSets.map((s, i) => (
                  <option key={i} value={s.nature + "|" + s.ability + "|" + s.item}>
                    {s.nature} / {s.ability} / {s.item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Nature / Ability / Item row */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">Nature</label>
              <select
                value={set.nature}
                onChange={(e) => onSetUpdate({ nature: e.target.value })}
                className="w-full px-2 py-1.5 rounded-lg glass border border-gray-200 text-[11px] bg-transparent focus:outline-none"
              >
                {ALL_NATURES.map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              {natureDisplay.plus && (
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  <span className="text-green-600">+{natureDisplay.plus}</span>
                  {" / "}
                  <span className="text-red-500">−{natureDisplay.minus}</span>
                </p>
              )}
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">Ability</label>
              <SearchSelect
                value={set.ability}
                onChange={(v) => onSetUpdate({ ability: v })}
                placeholder="Ability…"
                options={p.abilities.map(a => ({ value: a.name, label: a.name, sub: a.description }))}
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">Item</label>
              <SearchSelect
                value={set.item}
                onChange={(v) => onSetUpdate({ item: v })}
                placeholder="Item…"
                options={[
                  set.item,
                  "Life Orb","Choice Band","Choice Specs","Choice Scarf","Focus Sash",
                  "Assault Vest","Sitrus Berry","Leftovers","Rocky Helmet","Eviolite",
                  "Clear Amulet","Covert Cloak","Safety Goggles","Lum Berry","Wide Lens",
                  "Expert Belt","Muscle Band","Wise Glasses","Scope Lens","Weakness Policy",
                  "Booster Energy","Loaded Dice","Protective Pads",
                ].filter((v, i, a) => a.indexOf(v) === i).map(item => ({ value: item, label: item }))}
              />
            </div>
          </div>

          {/* Moves */}
          <div>
            <label className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">Moves</label>
            <div className="grid grid-cols-2 gap-1.5">
              {set.moves.map((moveName, idx) => {
                const move = getMove(moveName);
                return (
                  <SearchSelect
                    key={idx}
                    value={moveName}
                    onChange={(v) => {
                      const newMoves = [...set.moves];
                      newMoves[idx] = v;
                      onSetUpdate({ moves: newMoves });
                    }}
                    placeholder="Move…"
                    triggerBadge={move ? { text: move.type.slice(0, 3).toUpperCase(), color: TYPE_COLORS[move.type] } : null}
                    options={p.moves.map(m => ({
                      value: m.name,
                      label: m.name,
                      sub: m.category !== "status" ? `${m.type} · ${m.category} · ${m.power} BP` : `${m.type} · status`,
                      badge: m.type.slice(0, 3).toUpperCase(),
                      badgeColor: TYPE_COLORS[m.type as PokemonType],
                    }))}
                  />
                );
              })}
            </div>
          </div>

          {/* Stats + SP */}
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] font-semibold uppercase text-muted-foreground flex items-center gap-1 mb-2 hover:text-foreground transition-colors"
            >
              Stats & SP ({totalSP}/66)
              <ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} />
            </button>

            {/* Stat bars (always shown) */}
            <div className="space-y-1.5">
              {STAT_KEYS.map(stat => {
                const base = resolvedStats ? resolvedStats.baseStats[stat] : p.baseStats[stat];
                const calc = stats?.[stat] ?? 0;
                const sp = set.sp[stat];
                const natMod = stat !== "hp" ? getNatureModifier(set.nature as NatureName, stat as "attack" | "defense" | "spAtk" | "spDef" | "speed") : 1;
                return (
                  <div key={stat} className="flex items-center gap-2">
                    <span className={cn(
                      "text-[10px] w-8 font-bold text-right",
                      natMod > 1 ? "text-green-600" : natMod < 1 ? "text-red-500" : "text-muted-foreground"
                    )}>
                      {STAT_LABELS[stat]}
                    </span>
                    <span className="text-[10px] text-muted-foreground w-7 text-right font-mono">{base}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          sp > 0 ? "bg-gradient-to-r from-violet-400 to-violet-600" : "bg-gray-300"
                        )}
                        style={{ width: `${Math.min(100, calc / 2.5)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono w-8 text-right font-bold">{calc}</span>
                    {expanded && (
                      <input
                        type="number"
                        value={sp}
                        onChange={(e) => onSPUpdate(stat, Number(e.target.value))}
                        min={0}
                        max={32}
                        className="w-10 px-1 py-0.5 rounded text-[10px] font-mono border border-gray-200 text-center bg-transparent focus:outline-none focus:border-violet-400"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stat stages */}
          {expanded && (showAtkStages || showDefStages) && (
            <div>
              <label className="text-[10px] font-semibold uppercase text-muted-foreground block mb-1">Stat Stages</label>
              <div className="grid grid-cols-3 gap-2">
                {showAtkStages && (
                  <>
                    <StageSelector label="Atk" value={slot.stages.atk} onChange={(v) => onStageChange("atk", v)} />
                    <StageSelector label="SpA" value={slot.stages.spAtk} onChange={(v) => onStageChange("spAtk", v)} />
                  </>
                )}
                {showDefStages && (
                  <>
                    <StageSelector label="Def" value={slot.stages.def} onChange={(v) => onStageChange("def", v)} />
                    <StageSelector label="SpD" value={slot.stages.spDef} onChange={(v) => onStageChange("spDef", v)} />
                  </>
                )}
              </div>
            </div>
          )}

          {/* Status / HP (attacker only) */}
          {expanded && onBurnToggle && (
            <div className="flex items-center gap-4">
              <button
                onClick={onBurnToggle}
                className={cn(
                  "px-2 py-1 rounded-lg text-[10px] font-medium border transition-all",
                  isBurned ? "bg-red-100 text-red-700 border-red-300" : "glass glass-hover text-muted-foreground border-transparent"
                )}
              >
                🔥 Burned
              </button>
              {onHPChange && (
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-[10px] font-semibold text-muted-foreground">HP%</span>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={currentHP ?? 100}
                    onChange={(e) => onHPChange(Number(e.target.value))}
                    className="flex-1 accent-violet-500"
                  />
                  <span className="text-[10px] font-mono w-8 text-right">{currentHP}%</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Stat Stage Selector ──────────────────────────────────────────────────

function StageSelector({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] font-bold text-muted-foreground w-7">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 px-1 py-0.5 rounded text-[10px] font-mono border border-gray-200 bg-transparent focus:outline-none"
      >
        {[-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6].map(s => (
          <option key={s} value={s}>{s >= 0 ? `+${s}` : s}</option>
        ))}
      </select>
    </div>
  );
}

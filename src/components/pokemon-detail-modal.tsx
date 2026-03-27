"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChampionsPokemon, TYPE_COLORS, CommonSet } from "@/lib/types";
import { USAGE_DATA } from "@/lib/usage-data";
import { getTeamsForPokemon } from "@/lib/winning-teams";
import { cn } from "@/lib/utils";
import { X, Sparkles, Zap, Trophy, Coins, Star, Shield, Sword, Target, Gauge, Timer, TrendingUp, Users } from "lucide-react";
import { useState, useMemo } from "react";

interface PokemonDetailModalProps {
  pokemon: ChampionsPokemon | null;
  onClose: () => void;
}

const STAT_NAMES = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
const STAT_KEYS = ["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const;
const STAT_COLORS = ["#ef4444", "#f97316", "#eab308", "#3b82f6", "#22c55e", "#e879f9"];
const MAX_STAT = 255;

const PILL_STYLES = [
  { color: "text-orange-600", bg: "bg-orange-50", ring: "ring-orange-200" },
  { color: "text-sky-600", bg: "bg-sky-50", ring: "ring-sky-200" },
  { color: "text-red-600", bg: "bg-red-50", ring: "ring-red-200" },
  { color: "text-violet-600", bg: "bg-violet-50", ring: "ring-violet-200" },
  { color: "text-pink-600", bg: "bg-pink-50", ring: "ring-pink-200" },
  { color: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-200" },
  { color: "text-amber-600", bg: "bg-amber-50", ring: "ring-amber-200" },
  { color: "text-teal-600", bg: "bg-teal-50", ring: "ring-teal-200" },
];

const PILL_ICONS = [Target, Shield, Zap, Star, Timer, Gauge, Sword, TrendingUp];

const GAME_LOGOS: Record<string, { abbr: string; gradient: string; textColor: string }> = {
  "Scarlet/Violet": { abbr: "SV", gradient: "from-red-500 to-violet-600", textColor: "text-white" },
  "Pokémon GO": { abbr: "GO", gradient: "from-blue-500 to-cyan-400", textColor: "text-white" },
  "Legends Z-A": { abbr: "ZA", gradient: "from-teal-500 to-emerald-400", textColor: "text-white" },
  "Sword/Shield": { abbr: "SS", gradient: "from-blue-600 to-red-500", textColor: "text-white" },
  "BDSP": { abbr: "BD", gradient: "from-blue-400 to-pink-400", textColor: "text-white" },
  "Legends: Arceus": { abbr: "LA", gradient: "from-amber-500 to-yellow-400", textColor: "text-white" },
  "Let's Go": { abbr: "LG", gradient: "from-yellow-400 to-amber-500", textColor: "text-white" },
};

function PresetPill({ set, index }: { set: CommonSet; index: number }) {
  const [hovered, setHovered] = useState(false);
  const style = PILL_STYLES[index % PILL_STYLES.length];
  const Icon = PILL_ICONS[index % PILL_ICONS.length];

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-default transition-all duration-200 ring-1",
          style.bg,
          style.ring,
          hovered && "shadow-md ring-2"
        )}
      >
        <Icon className={cn("w-3 h-3 flex-shrink-0", style.color)} />
        <span className={cn("text-[11px] font-semibold tracking-tight", style.color)}>{set.name}</span>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 top-full mt-2 w-72 p-4 bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", style.bg)}>
                <Icon className={cn("w-3.5 h-3.5", style.color)} />
              </div>
              <span className="text-sm font-bold text-gray-900">{set.name}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{set.nature} · {set.ability} · {set.item}</p>
            <div className="grid grid-cols-3 gap-1.5">
              {STAT_KEYS.map((key, i) => (
                <div key={key} className="flex items-center justify-between px-2 py-1 rounded-md bg-gray-50">
                  <span className="text-[10px] text-gray-400">{STAT_NAMES[i].replace("Sp. ", "Sp")}</span>
                  <span className={cn("text-[10px] font-bold", set.sp[key] > 0 ? "text-gray-800" : "text-gray-300")}>
                    {set.sp[key]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PokemonDetailModal({ pokemon, onClose }: PokemonDetailModalProps) {
  const [activeForm, setActiveForm] = useState(0);
  const [activeTab, setActiveTab] = useState<"stats" | "moves" | "abilities" | "usage" | "teams">("stats");
  const [formKey, setFormKey] = useState(0);
  const [lastPokemonId, setLastPokemonId] = useState<number | null>(null);
  const [spriteError, setSpriteError] = useState(false);

  // Reset to base form synchronously when a different Pokémon is opened
  if (pokemon && pokemon.id !== lastPokemonId) {
    setLastPokemonId(pokemon.id);
    setActiveForm(0);
    setActiveTab("stats");
    setSpriteError(false);
  }

  const handleFormChange = (form: number) => {
    if (form === activeForm) return;
    setFormKey((k) => k + 1);
    setActiveForm(form);
    setSpriteError(false);
  };

  if (!pokemon) return null;

  const currentForm = activeForm > 0 && pokemon.forms ? pokemon.forms[activeForm - 1] : null;
  const displayTypes = currentForm ? currentForm.types : pokemon.types;
  const displayStats = currentForm ? currentForm.baseStats : pokemon.baseStats;
  const displayAbilities = currentForm ? currentForm.abilities : pokemon.abilities;
  const primaryColor = TYPE_COLORS[displayTypes[0]];
  const bst = Object.values(displayStats).reduce((a, b) => a + b, 0);

  return (
    <AnimatePresence>
      {pokemon && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-[72px] bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 sm:w-full sm:max-w-2xl sm:h-[85vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-white border border-gray-200/60 shadow-2xl shadow-black/10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-white/90 hover:bg-white shadow-sm hover:shadow border border-gray-200/80 transition-all"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header with sprite */}
            <div
              className="relative overflow-hidden rounded-t-3xl p-4 sm:p-8 pb-3 sm:pb-4 shrink-0"
              style={{
                background: `linear-gradient(180deg, ${primaryColor}12 0%, ${primaryColor}06 50%, transparent 100%)`,
              }}
            >
              <div className="flex flex-row items-center gap-4 sm:gap-6">
                {/* Sprite */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-30"
                    style={{ background: primaryColor }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${pokemon.id}-${formKey}`}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <Image
                        src={spriteError ? pokemon.officialArt : (currentForm?.sprite || pokemon.officialArt)}
                        alt={currentForm?.name || pokemon.name}
                        width={200}
                        height={200}
                        className="relative z-10 drop-shadow-2xl w-[120px] h-[120px] sm:w-[200px] sm:h-[200px]"
                        unoptimized
                        onError={() => setSpriteError(true)}
                      />
                      {spriteError && currentForm && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm">
                          <p className="text-[10px] font-semibold text-white whitespace-nowrap">Sprite not available yet</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Name & types */}
                <div className="text-left space-y-2 sm:space-y-3 min-w-0">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono mb-1">
                      #{pokemon.dexNumber.toString().padStart(3, "0")} · Gen {pokemon.generation}
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={`name-${pokemon.id}-${formKey}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="text-xl sm:text-3xl font-bold tracking-tight"
                      >
                        {currentForm?.name || pokemon.name}
                      </motion.h2>
                    </AnimatePresence>
                  </div>

                    <div className="flex gap-2 justify-start">
                    {displayTypes.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 text-xs font-bold uppercase rounded-lg text-white/90 tracking-wider"
                        style={{ backgroundColor: `${TYPE_COLORS[type]}CC` }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Form selector */}
                  {pokemon.forms && pokemon.forms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleFormChange(0)}
                        className={cn(
                          "px-4 py-1.5 text-sm font-medium rounded-xl transition-all shadow-sm",
                          activeForm === 0
                              ? "bg-gray-100 text-foreground border border-gray-300 shadow-gray-200/60"
                              : "text-muted-foreground hover:text-foreground hover:bg-gray-50 border border-transparent"
                        )}
                      >
                        Base
                      </button>
                      {pokemon.forms.map((form, i) => (
                        <button
                          key={form.name}
                          onClick={() => handleFormChange(i + 1)}
                          className={cn(
                            "px-4 py-1.5 text-sm font-medium rounded-xl transition-all flex items-center gap-1.5 shadow-sm",
                            activeForm === i + 1
                              ? "bg-gradient-to-r from-pink-100 to-violet-100 text-foreground border border-pink-300 shadow-pink-200/60"
                              : "text-muted-foreground hover:text-foreground hover:bg-pink-50/50 border border-transparent"
                          )}
                        >
                          {form.isMega && <Sparkles className="w-4 h-4 text-pink-500" />}
                          {form.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="flex gap-1 px-3 sm:px-6 py-2 sm:py-2.5 border-b border-gray-100 overflow-x-auto shrink-0 scrollbar-hide">
              {(["stats", "moves", "abilities", "usage", "teams"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg capitalize transition-colors tracking-tight whitespace-nowrap",
                    activeTab === tab
                      ? "text-gray-900"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="detail-tab"
                      className="absolute inset-0 rounded-lg bg-gray-50 ring-1 ring-gray-200/60"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto min-h-0">
              <AnimatePresence mode="wait">
                {activeTab === "stats" && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    {/* Tier, Recruitment & Usage quick stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/80">
                        <div className="flex items-center gap-2 mb-1">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Tier</span>
                        </div>
                        <p className="text-2xl font-bold tracking-tight" style={{ color: primaryColor }}>{pokemon.tier ?? "—"}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/80">
                        <div className="flex items-center gap-2 mb-1">
                          <Coins className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Recruit</span>
                        </div>
                        <p className="text-2xl font-bold tracking-tight text-gray-800">{pokemon.recruitmentCost != null ? pokemon.recruitmentCost : "—"} <span className="text-xs font-medium text-gray-400">VP</span></p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/80">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Usage</span>
                        </div>
                        <p className="text-2xl font-bold tracking-tight text-gray-800">{pokemon.usageRate != null ? pokemon.usageRate : "—"} <span className="text-xs font-medium text-gray-400">%</span></p>
                      </div>
                    </div>

                    {/* Base stats */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Base Stats</h3>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">BST <span className="text-gray-700 ml-1">{bst}</span></span>
                      </div>

                      <div className="space-y-3">
                        {STAT_KEYS.map((key, i) => (
                          <div key={key} className="flex items-center gap-3">
                            <span className="text-[11px] text-gray-400 w-14 text-right font-semibold tracking-tight">{STAT_NAMES[i]}</span>
                            <span className="text-sm w-8 text-right text-gray-800 font-bold tabular-nums">{displayStats[key]}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: STAT_COLORS[i] }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(displayStats[key] / MAX_STAT) * 100}%` }}
                                transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stat Point System */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50/80 to-indigo-50/50 border border-violet-200/60">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                          <Zap className="w-3.5 h-3.5 text-violet-600" />
                        </div>
                        <h4 className="text-xs font-bold text-violet-700 uppercase tracking-widest">Stat Points</h4>
                      </div>
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
                        Champions replaces IVs and EVs with a simple <span className="font-bold text-gray-800">Stat Point</span> system. 
                        Distribute <span className="font-bold text-violet-700">66 total points</span> across any stats, 
                        up to <span className="font-bold text-violet-700">32 per stat</span>. 
                        Each point adds ~1 stat at Level 50.
                      </p>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Suggested Builds — hover for details</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(USAGE_DATA[pokemon.id] || []).map((set, i) => (
                          <PresetPill key={set.name} set={set} index={i} />
                        ))}
                      </div>
                    </div>

                    {/* HOME compatibility */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50/80 to-sky-50/50 border border-cyan-200/60">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-cyan-100 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        </div>
                        <h4 className="text-xs font-bold text-cyan-700 uppercase tracking-widest">Pokémon HOME</h4>
                      </div>
                      {pokemon.homeCompatible ? (
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Compatible Games</p>
                          <div className="flex flex-wrap gap-2">
                            {pokemon.homeSource?.map((src) => {
                              const logo = GAME_LOGOS[src];
                              return (
                                <div key={src} className="relative group">
                                  <div
                                    className={cn(
                                      "px-3 py-1.5 rounded-lg bg-gradient-to-r text-[11px] font-bold tracking-wider shadow-sm cursor-default",
                                      logo ? `${logo.gradient} ${logo.textColor}` : "from-gray-400 to-gray-500 text-white"
                                    )}
                                  >
                                    {logo?.abbr || src}
                                  </div>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                                    {src}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[13px] text-amber-600 font-semibold">Champions exclusive — not importable</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "moves" && (
                  <motion.div
                    key="moves"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-2"
                  >
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Learnable Moves · {pokemon.moves.length}
                    </h3>
                    {pokemon.moves.map((move) => (
                      <div
                        key={move.name}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-200/60 group/move transition-colors"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: TYPE_COLORS[move.type] }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold tracking-tight">{move.name}</span>
                            <span
                              className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded text-white/90"
                              style={{ backgroundColor: `${TYPE_COLORS[move.type]}AA` }}
                            >
                              {move.type}
                            </span>
                            <span className={cn(
                              "px-1.5 py-0.5 text-[9px] font-bold uppercase rounded",
                              move.category === "physical" && "bg-red-100 text-red-700",
                              move.category === "special" && "bg-blue-100 text-blue-700",
                              move.category === "status" && "bg-gray-100 text-gray-600"
                            )}>
                              {move.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 truncate group-hover/move:whitespace-normal leading-relaxed">
                            {move.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0 space-y-0.5">
                          <div className="text-xs tabular-nums font-semibold text-gray-700">
                            {move.power ?? "—"} <span className="text-gray-400 font-medium">PWR</span>
                          </div>
                          <div className="text-[10px] text-gray-400 tabular-nums font-medium">
                            {move.accuracy ?? "—"}% · {move.pp}PP
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "abilities" && (
                  <motion.div
                    key="abilities"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Abilities</h3>
                    {displayAbilities.map((ability) => (
                      <div
                        key={ability.name}
                        className={cn(
                          "p-4 rounded-2xl border transition-colors",
                          ability.isChampions
                            ? "bg-gradient-to-br from-violet-50/80 to-pink-50/50 border-violet-200/80"
                            : ability.isHidden
                              ? "bg-gradient-to-br from-amber-50/80 to-orange-50/50 border-amber-200/80"
                              : "bg-gradient-to-br from-gray-50 to-gray-100/30 border-gray-200/80"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center",
                            ability.isChampions ? "bg-violet-100" : ability.isHidden ? "bg-amber-100" : "bg-gray-100"
                          )}>
                            <Sparkles className={cn(
                              "w-3.5 h-3.5",
                              ability.isChampions ? "text-violet-600" : ability.isHidden ? "text-amber-600" : "text-gray-500"
                            )} />
                          </div>
                          <span className="text-sm font-bold tracking-tight text-gray-900">{ability.name}</span>
                          {ability.isChampions && (
                            <span className="px-2 py-0.5 text-[9px] font-bold bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700 rounded-lg border border-violet-200">
                              EXCLUSIVE
                            </span>
                          )}
                          {ability.isHidden && (
                            <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-100 text-amber-700 rounded-lg border border-amber-200">
                              HIDDEN
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-gray-500 leading-relaxed pl-9">{ability.description || "No description available."}</p>
                      </div>
                    ))}

                    {/* Show base abilities when viewing a form */}
                    {currentForm && (
                      <>
                        <div className="pt-2">
                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Base Form Abilities</h4>
                        </div>
                        {pokemon.abilities.map((ability) => (
                          <div key={ability.name} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-200/60 opacity-70">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Sparkles className="w-3.5 h-3.5 text-gray-400" />
                              </div>
                              <span className="text-sm font-bold tracking-tight text-gray-600">{ability.name}</span>
                              {ability.isHidden && (
                                <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-100 text-amber-600 rounded-lg border border-amber-200">
                                  HIDDEN
                                </span>
                              )}
                            </div>
                            <p className="text-[13px] text-gray-400 leading-relaxed pl-9">{ability.description || "No description available."}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </motion.div>
                )}

                {activeTab === "usage" && (
                  <motion.div
                    key="usage"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Common Sets</h3>
                    {(USAGE_DATA[pokemon.id] || []).length === 0 ? (
                      <p className="text-sm text-gray-400 italic">No usage data available.</p>
                    ) : (
                      (USAGE_DATA[pokemon.id] || []).map((set, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50 to-white space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <Trophy className="w-3.5 h-3.5 text-indigo-600" />
                              </div>
                              <span className="text-sm font-bold tracking-tight text-gray-900">{set.name}</span>
                            </div>
                            {set.teraType && (
                              <span
                                className="px-2 py-0.5 text-[9px] font-bold rounded-lg border"
                                style={{
                                  backgroundColor: (TYPE_COLORS[set.teraType] || "#888") + "18",
                                  color: TYPE_COLORS[set.teraType] || "#888",
                                  borderColor: (TYPE_COLORS[set.teraType] || "#888") + "40",
                                }}
                              >
                                TERA {set.teraType.toUpperCase()}
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-[12px]">
                            <div className="bg-gray-100/70 rounded-lg px-2.5 py-1.5">
                              <span className="text-gray-400 font-medium">Nature</span>
                              <p className="font-bold text-gray-800">{set.nature}</p>
                            </div>
                            <div className="bg-gray-100/70 rounded-lg px-2.5 py-1.5">
                              <span className="text-gray-400 font-medium">Ability</span>
                              <p className="font-bold text-gray-800">{set.ability}</p>
                            </div>
                            <div className="bg-gray-100/70 rounded-lg px-2.5 py-1.5">
                              <span className="text-gray-400 font-medium">Item</span>
                              <p className="font-bold text-gray-800">{set.item}</p>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Moves</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {set.moves.map((move) => (
                                <span
                                  key={move}
                                  className="px-2.5 py-1 text-[11px] font-semibold bg-white rounded-lg border border-gray-200 text-gray-700"
                                >
                                  {move}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stat Points (66 total)</span>
                            <div className="grid grid-cols-6 gap-1 mt-1.5">
                              {STAT_KEYS.map((key, i) => {
                                const val = set.sp[key];
                                return (
                                  <div key={key} className="text-center">
                                    <div className="text-[9px] font-bold text-gray-400 mb-0.5">{STAT_NAMES[i].replace("Sp. ", "")}</div>
                                    <div
                                      className="text-[13px] font-extrabold rounded-md py-0.5"
                                      style={{
                                        color: val > 0 ? STAT_COLORS[i] : "#cbd5e1",
                                        backgroundColor: val > 0 ? STAT_COLORS[i] + "14" : "transparent",
                                      }}
                                    >
                                      {val}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}

                {activeTab === "teams" && (
                  <motion.div
                    key="teams"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Winning Teams</h3>
                    {(() => {
                      const teams = getTeamsForPokemon(pokemon.id);
                      if (teams.length === 0) {
                        return <p className="text-sm text-gray-400 italic">No winning team data available yet.</p>;
                      }
                      return teams.map((team) => (
                        <div
                          key={team.id}
                          className="p-4 rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50 to-white space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                              </div>
                              <div>
                                <span className="text-sm font-bold tracking-tight text-gray-900">{team.name}</span>
                                <p className="text-[11px] text-gray-400">{team.player}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[11px] font-bold text-amber-600">{team.placement}</span>
                              <p className="text-[10px] text-gray-400">{team.event}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-1">
                            {team.pokemon.map((member) => (
                              <div key={member.pokemonId} className="flex flex-col items-center gap-1">
                                <div
                                  className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center border",
                                    member.pokemonId === pokemon.id
                                      ? "bg-violet-50 border-violet-300 ring-2 ring-violet-200"
                                      : "bg-gray-50 border-gray-200"
                                  )}
                                >
                                  <Image
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${member.pokemonId}.png`}
                                    alt={member.name}
                                    width={36}
                                    height={36}
                                    className="drop-shadow-sm"
                                    unoptimized
                                  />
                                </div>
                                <span className={cn(
                                  "text-[9px] font-semibold tracking-tight",
                                  member.pokemonId === pokemon.id ? "text-violet-600" : "text-gray-400"
                                )}>
                                  {member.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

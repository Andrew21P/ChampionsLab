"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { SEASONS } from "@/lib/pokemon-data";
import { cn } from "@/lib/utils";
import { Shield, Swords, Users, Timer, Sparkles, Ban, Gauge, ListChecks } from "lucide-react";

interface SeasonTabsProps {
  activeSeason: number;
  onSeasonChange: (season: number) => void;
}

export function SeasonTabs({ activeSeason, onSeasonChange }: SeasonTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SEASONS.map((season) => {
        const isActive = activeSeason === season.id;
        return (
          <button
            key={season.id}
            onClick={() => onSeasonChange(season.id)}
            className={cn(
              "relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground glass glass-hover"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="season-active"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-100 to-blue-100 border border-violet-300"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Shield className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{season.name}</span>
            {season.isActive && (
              <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-700 border border-emerald-300">
                LIVE
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface RuleConfig {
  icon: typeof Swords;
  label: string;
  color: string;
  bg: string;
  ring: string;
  description: string;
}

const RULES_CONFIG: Record<string, RuleConfig> = {
  "Doubles format": {
    icon: Swords,
    label: "Doubles",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-500/15",
    ring: "ring-red-100 dark:ring-red-500/25",
    description: "All battles are played in Double Battle format - 2v2 on the field at all times. The standard competitive Pokémon format used in official VGC tournaments worldwide.",
  },
  "Bring 6, Pick 4": {
    icon: ListChecks,
    label: "Bring 6, Pick 4",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/15",
    ring: "ring-blue-100 dark:ring-blue-500/25",
    description: "Build a team of 6 Pokémon, then select 4 to bring into each battle after seeing your opponent's team during Team Preview. Strategy starts before the first move.",
  },
  "Level 50 auto-level": {
    icon: Gauge,
    label: "Level 50",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/15",
    ring: "ring-amber-100 dark:ring-amber-500/25",
    description: "All Pokémon are automatically set to Level 50 for battles, ensuring a fair playing field regardless of your Pokémon's actual level.",
  },
  "Stat Points (no IVs/EVs)": {
    icon: Sparkles,
    label: "Stat Points",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/15",
    ring: "ring-violet-100 dark:ring-violet-500/25",
    description: "Champions replaces IVs and EVs with a streamlined Stat Point system. You get 64 total points to distribute (max 32 per stat). Each point adds ~1 stat at Level 50. No RNG, pure strategy.",
  },
  "Mega Evolution": {
    icon: Sparkles,
    label: "Mega Evolution",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-500/15",
    ring: "ring-pink-100 dark:ring-pink-500/25",
    description: "Mega Evolution returns! One Pokémon per team can Mega Evolve during battle, gaining boosted stats and sometimes a new typing or ability. A game-changing mechanic from Gen 6 & 7.",
  },
  "No duplicate Pokémon": {
    icon: Ban,
    label: "No duplicate Pokémon",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/15",
    ring: "ring-emerald-100 dark:ring-emerald-500/25",
    description: "Each Pokémon species can only appear once on your team. Known as the Species Clause - a core rule in all official competitive formats.",
  },
  "No duplicate held items": {
    icon: Ban,
    label: "No duplicate items",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-500/15",
    ring: "ring-cyan-100 dark:ring-cyan-500/25",
    description: "Each held item can only be used once per team. Known as the Item Clause - forces diverse item choices and prevents stacking powerful items like Leftovers or Choice Scarf.",
  },
  "20-minute game timer": {
    icon: Timer,
    label: "20-min timer",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-500/15",
    ring: "ring-orange-100 dark:ring-orange-500/25",
    description: "Each game has a 20-minute time limit. If time runs out, the player with more remaining Pokémon wins. Prevents stalling and keeps games fast-paced.",
  },
};

function RuleCard({ rule }: { rule: string }) {
  const [hovered, setHovered] = useState(false);
  const config = RULES_CONFIG[rule];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-default transition-all duration-200 ring-1",
          config.bg,
          config.ring,
          hovered && "shadow-md ring-2"
        )}
      >
        <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", config.color)} />
        <span className={cn("text-xs font-medium", config.color)}>{config.label}</span>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-0 top-full mt-2 w-72 p-4 bg-white dark:bg-[#131c2e] rounded-xl shadow-xl shadow-black/10 dark:shadow-black/40 border border-gray-100 dark:border-gray-200/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", config.bg)}>
                <Icon className={cn("w-3.5 h-3.5", config.color)} />
              </div>
              <span className="text-sm font-semibold text-gray-900">{config.label}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{config.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SeasonInfo({ seasonId }: { seasonId: number }) {
  const season = SEASONS.find((s) => s.id === seasonId);
  if (!season) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{season.name}</h3>
            <p className="text-xs text-gray-400">
              {new Date(season.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
        {season.isActive && (
          <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 uppercase tracking-wider">
            Active Season
          </span>
        )}
      </div>

      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Rules - hover for details</p>

      <div className="flex flex-wrap gap-2">
        {season.rules.map((rule) => (
          <RuleCard key={rule} rule={rule} />
        ))}
      </div>
    </motion.div>
  );
}

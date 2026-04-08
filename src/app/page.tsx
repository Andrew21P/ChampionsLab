"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "@/lib/motion";
import Image from "next/image";
import { LastUpdated } from "@/components/last-updated";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { getPokemonBySeason } from "@/lib/pokemon-data";
import { PokemonType, ChampionsPokemon } from "@/lib/types";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonDetailModal } from "@/components/pokemon-detail-modal";
import { SeasonInfo } from "@/components/season-tabs";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const ALL_TYPES: PokemonType[] = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy",
];

const ALL_GENS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const TYPE_COLORS_MAP: Record<PokemonType, string> = {
  normal: "#a8a878", fire: "#f08030", water: "#6890f0", electric: "#f8d030",
  grass: "#78c850", ice: "#98d8d8", fighting: "#c03028", poison: "#a040a0",
  ground: "#e0c068", flying: "#a890f0", psychic: "#f85888", bug: "#a8b820",
  rock: "#b8a038", ghost: "#705898", dragon: "#7038f8", dark: "#705848",
  steel: "#b8b8d0", fairy: "#ee99ac",
};

type SortOption = "name" | "dex" | "tier";

export default function HomePage() {
  const [activeSeason, setActiveSeason] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [selectedGens, setSelectedGens] = useState<number[]>([]);
  const [showMegaOnly, setShowMegaOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("dex");
  const [selectedPokemon, setSelectedPokemon] = useState<ChampionsPokemon | null>(null);

  // Pokémon Champions release countdown — April 8, 2026 12:00 JST (03:00 UTC)
  const RELEASE_DATE = new Date("2026-04-08T03:00:00Z");
  const [countdown, setCountdown] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = RELEASE_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setReleased(true);
        setCountdown(null);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const filteredPokemon = useMemo(() => {
    let results = getPokemonBySeason(activeSeason);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.dexNumber.toString().includes(q) ||
          p.types.some((t) => t.includes(q))
      );
    }

    if (selectedTypes.length > 0) {
      results = results.filter((p) =>
        selectedTypes.some((t) => p.types.includes(t))
      );
    }

    if (selectedGens.length > 0) {
      results = results.filter((p) => selectedGens.includes(p.generation));
    }

    if (showMegaOnly) {
      results = results.filter((p) => p.hasMega);
    }

    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "dex": return a.dexNumber - b.dexNumber;
        case "tier": {
          const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
          return (tierOrder[a.tier ?? "D"] ?? 5) - (tierOrder[b.tier ?? "D"] ?? 5);
        }
        default: return 0;
      }
    });

    return results;
  }, [activeSeason, searchQuery, selectedTypes, selectedGens, showMegaOnly, sortBy]);

  const toggleType = (type: PokemonType) => {
    trackEvent("filter_type", "pokedex", type);
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleGen = (gen: number) => {
    trackEvent("filter_gen", "pokedex", `gen_${gen}`);
    setSelectedGens((prev) =>
      prev.includes(gen) ? prev.filter((g) => g !== gen) : [...prev, gen]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 200, damping: 20 }}
          className="flex justify-center mb-2"
        >
          <Image
            src="/logo.png"
            alt="Champions Lab"
            width={200}
            height={200}
            className="drop-shadow-xl"
            priority
            unoptimized
          />
        </motion.div>
        <motion.h1
          className="text-3xl sm:text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Pokédex
          </span>
        </motion.h1>
        <div className="flex justify-center mt-2">
          <LastUpdated page="pokedex" />
        </div>
        <motion.p
          className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore the full roster, base stats, abilities, and competitive sets for all {getPokemonBySeason(1).length} eligible Pokémon.
        </motion.p>

        {/* Engine Promotion Banner */}
        <motion.a
          href="/battle-bot"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-3 mt-4 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-400/30 hover:border-amber-400/60 hover:from-amber-500/20 hover:to-amber-500/20 transition-all group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/25">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </span>
          <div className="text-left">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Advanced VGC Battle Engine</p>
            <p className="text-[10px] text-muted-foreground">2,000,000+ battles simulated · Full AI · Live Replay · Try it now →</p>
          </div>
        </motion.a>

        {/* Pokémon Champions Release Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5"
        >
          {!released && countdown ? (
            <div className="relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-5 py-4 max-w-lg mx-auto">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_70%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.1),transparent_70%)]" />
              <div className="relative space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <p className="text-lg sm:text-xl font-extrabold uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-heading">
                    Pokémon Champions Release
                  </p>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                </div>
                <div className="flex justify-center gap-3 py-1">
                  {[
                    { val: countdown.d, label: "Days" },
                    { val: countdown.h, label: "Hours" },
                    { val: countdown.m, label: "Min" },
                    { val: countdown.s, label: "Sec" },
                  ].map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center min-w-[3.5rem] py-2 px-1 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-200/50 dark:border-white/10">
                      <span className="text-2xl sm:text-3xl font-black tabular-nums bg-gradient-to-b from-emerald-400 to-cyan-500 bg-clip-text text-transparent leading-none">
                        {String(unit.val).padStart(2, "0")}
                      </span>
                      <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">{unit.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground text-center italic">
                  Expected April 8, 2026 · Noon Japan Time (JST)
                </p>
                <p className="text-[11px] text-center text-muted-foreground">
                  Hype is real! Come wait with us 👇
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://discord.gg/kpwE7u3M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 border border-[#5865F2]/30 hover:border-[#5865F2]/50 transition-all text-xs font-bold text-[#5865F2] hover:scale-105"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                    Wait with us on Discord!
                  </a>
                </div>
              </div>
            </div>
          ) : released ? (
            <div className="relative overflow-hidden rounded-2xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500/15 via-green-500/15 to-teal-500/15 px-5 py-6 max-w-lg mx-auto">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.2),transparent_70%)]" />
              <div className="relative space-y-3 text-center">
                <p className="text-3xl">🎉🎮🏆</p>
                <p className="text-lg font-extrabold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                  Pokémon Champions is HERE!
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  The wait is over! Go have a blast on Nintendo Switch — and when you&apos;re ready to dominate the competitive scene, we&apos;ve got your back. Let&apos;s become Champions together!
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://discord.gg/kpwE7u3M"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 border border-[#5865F2]/30 hover:border-[#5865F2]/50 transition-all text-xs font-bold text-[#5865F2] hover:scale-105"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                    Join our Discord community!
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </motion.div>

      {/* Season Rules */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <SeasonInfo seasonId={activeSeason} />
      </motion.div>

      {/* Search & Filters bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 space-y-4"
      >
        <div className="flex gap-3 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Pokémon by name, type, or dex number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 text-sm placeholder:text-gray-400 transition-all shadow-sm"
            />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-3 rounded-xl transition-all flex items-center gap-2",
              showFilters
                ? "bg-violet-100 text-violet-700 border border-violet-300"
                : "glass glass-hover text-muted-foreground"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Filters</span>
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-3 rounded-xl glass border border-gray-200 text-sm bg-transparent cursor-pointer focus:outline-none focus:border-violet-500/50"
          >
            <option value="tier">Tier</option>
            <option value="name">Name</option>
            <option value="dex">Dex #</option>
          </select>
        </div>

        {/* Expandable filters */}
        <motion.div
          initial={false}
          animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="glass rounded-2xl p-5 border border-gray-200/60 space-y-4">
            {/* Type filters */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Type</h4>
              <div className="flex flex-wrap gap-1.5">
                {ALL_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={cn(
                      "px-3 py-1.5 text-[11px] font-bold uppercase rounded-lg transition-all tracking-wider",
                      selectedTypes.includes(type)
                        ? "text-white shadow-lg"
                        : "text-white/60 hover:text-white"
                    )}
                    style={{
                      backgroundColor: selectedTypes.includes(type)
                        ? `${TYPE_COLORS_MAP[type]}CC`
                        : `${TYPE_COLORS_MAP[type]}33`,
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Generation filters */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Generation</h4>
              <div className="flex flex-wrap gap-1.5">
                {ALL_GENS.map((gen) => (
                  <button
                    key={gen}
                    onClick={() => toggleGen(gen)}
                    className={cn(
                      "px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all",
                      selectedGens.includes(gen)
                        ? "bg-violet-100 text-violet-700 border border-violet-300"
                        : "glass glass-hover text-muted-foreground"
                    )}
                  >
                    Gen {gen}
                  </button>
                ))}
              </div>
            </div>

            {/* Special filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowMegaOnly(!showMegaOnly)}
                className={cn(
                  "px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5",
                  showMegaOnly
                    ? "bg-gradient-to-r from-pink-100 to-violet-100 text-pink-700 border border-pink-300"
                    : "glass glass-hover text-muted-foreground"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Mega Only
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-400">
          Showing <span className="text-gray-700 font-semibold">{filteredPokemon.length}</span> Pokémon
        </p>
      </div>

      {/* Pokémon Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
      >
        {filteredPokemon.map((pokemon, i) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={(p) => { trackEvent("pokemon_click", "pokedex", p.name); setSelectedPokemon(p); }}
            index={i}
          />
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredPokemon.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground text-lg mb-2">No Pokémon found</p>
          <p className="text-sm text-muted-foreground/60">Try adjusting your filters or search query</p>
        </motion.div>
      )}

      {/* Detail Modal */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}

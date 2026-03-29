"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LastUpdated } from "@/components/last-updated";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { getPokemonBySeason } from "@/lib/pokemon-data";
import { PokemonType, ChampionsPokemon } from "@/lib/types";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonDetailModal } from "@/components/pokemon-detail-modal";
import { SeasonInfo } from "@/components/season-tabs";
import { cn } from "@/lib/utils";

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
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleGen = (gen: number) => {
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
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
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
            onClick={setSelectedPokemon}
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

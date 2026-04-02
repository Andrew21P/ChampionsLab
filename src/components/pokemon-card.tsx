"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChampionsPokemon, TYPE_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface PokemonCardProps {
  pokemon: ChampionsPokemon;
  onClick: (pokemon: ChampionsPokemon) => void;
  index: number;
}

export function PokemonCard({ pokemon, onClick, index }: PokemonCardProps) {
  const primaryColor = TYPE_COLORS[pokemon.types[0]];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(pokemon)}
      className="group relative cursor-pointer"
    >
      {/* Glow effect behind card */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: `${primaryColor}30` }}
      />

      {/* Card */}
      <div className="relative bg-white dark:bg-[#111a2e] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-200/10 group-hover:border-gray-200/80 dark:group-hover:border-gray-200/20 group-hover:shadow-xl group-hover:shadow-black/[0.06] dark:group-hover:shadow-black/40 transition-all duration-500">
        {/* Tier badge */}
        {pokemon.tier && (
          <div className="absolute top-2.5 right-2.5 z-20">
            <span
              className={cn(
                "px-2 py-0.5 text-[10px] font-bold rounded-md backdrop-blur-sm",
                pokemon.tier === "S" && "bg-amber-50/90 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 ring-1 ring-amber-200 dark:ring-amber-500/30",
                pokemon.tier === "A" && "bg-violet-50/90 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 ring-1 ring-violet-200 dark:ring-violet-500/30",
                pokemon.tier === "B" && "bg-blue-50/90 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-500/30",
                pokemon.tier === "C" && "bg-emerald-50/90 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-500/30",
                pokemon.tier === "D" && "bg-gray-50/90 dark:bg-gray-500/20 text-gray-500 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-gray-500/30"
              )}
            >
              {pokemon.tier}
            </span>
          </div>
        )}

        {/* Mega badge */}
        {pokemon.hasMega && (
          <div className="absolute top-2.5 left-2.5 z-20">
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-gradient-to-r from-pink-50 to-violet-50 dark:from-pink-500/20 dark:to-violet-500/20 text-pink-600 dark:text-pink-400 ring-1 ring-pink-200 dark:ring-pink-500/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              MEGA
            </span>
          </div>
        )}

        {/* Sprite area with gradient background */}
        <div
          className="relative h-40 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${primaryColor}08 0%, ${primaryColor}04 50%, transparent 100%)`,
          }}
        >
          {/* Subtle circle behind sprite */}
          <div
            className="absolute w-28 h-28 rounded-full opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500"
            style={{ background: primaryColor }}
          />

          {/* Sprite */}
          <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
            <Image
              src={pokemon.officialArt}
              alt={pokemon.name}
              width={130}
              height={130}
              className="drop-shadow-xl object-contain"
              loading="lazy"
              unoptimized
            />
          </div>
        </div>

        {/* Info section */}
        <div className="px-4 pb-4 pt-2 space-y-2">
          {/* Name & Dex number */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[13px] tracking-tight text-gray-900">{pokemon.name}</h3>
            <span className="text-[10px] text-gray-400 tabular-nums">
              #{pokemon.dexNumber.toString().padStart(3, "0")}
            </span>
          </div>

          {/* Types */}
          <div className="flex gap-1.5">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-md text-white tracking-wider"
                style={{ backgroundColor: `${TYPE_COLORS[type]}D0` }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

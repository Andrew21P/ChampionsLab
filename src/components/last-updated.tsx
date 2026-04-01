"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";

interface ChangelogEntry {
  date: string;
  items: string[];
}

const CHANGELOGS: Record<string, { description: string; entries: ChangelogEntry[] }> = {
  pokedex: {
    description: "Thanks for the support - we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "01/04/2026",
        items: [
          "Fixed 46 missing moves across Pokémon movepools",
          "Added Shed Tail to Orthworm",
        ],
      },
      {
        date: "31/03/2026",
        items: [
          "Added 8 missing Pokémon: Mamoswine, Chandelure, Floette, Goodra, Trevenant, Appletun, Grimmsnarl, Skeledirge",
          "Mega Chandelure with Soul Furnace ability (Ghost/Fire 30% boost)",
          "Mega Floette with Eternal Bloom ability (Fairy 30% boost + regen)",
          "Fixed Mega Chandelure and Mega Floette sprites from PokeAPI",
          "Full movesets, competitive sets, and simulation data for all 8",
          "Roster expanded to 155+ Pokémon",
        ],
      },
      {
        date: "30/03/2026",
        items: [
          "Fixed Clefable ability: now uses Magic Guard instead of Friend Guard (Clefairy-only)",
          "Corrected stat calculation formula: SP points now applied before nature modifier",
          "Snow weather: +50% Defense for Ice types",
          "Sand weather: +50% Special Defense for Rock types",
          "Added Multiscale and Shadow Shield abilities",
        ],
      },
      {
        date: "29/03/2026",
        items: [
          "Dark mode support across all pages and modals",
          "Fixed Pokémon name readability in dark mode",
          "Custom Champions Lab favicon replacing default icon",
          "147 Pokémon roster with 11 regional forms",
          "Full Mega Evolution support with dynamic stats",
          "Tier rankings powered by 2M+ battle simulations",
          "Recommended competitive sets for every Pokémon",
          "SP System (66 Stat Points) replacing traditional EVs/IVs",
        ],
      },
    ],
  },
  meta: {
    description: "Thanks for the support - we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "31/03/2026",
        items: [
          "8 new Pokémon added to tier rankings from 2M battle simulation",
          "Mega Chandelure (A-tier) and Mega Floette (B-tier) join the meta",
          "Trevenant rises to A-tier as Ghost/Grass pivot",
          "10 new engine-generated winning teams featuring new Pokémon",
          "56 tier updates synced from fresh simulation results",
        ],
      },
      {
        date: "30/03/2026",
        items: [
          "Corrected stat calculation formula: SP points now applied before nature modifier",
          "Updated tier rankings reflect improved battle engine accuracy",
        ],
      },
      {
        date: "29/03/2026",
        items: [
          "Dark mode support with smooth theme toggle",
          "2,000,000 battle simulations with ML-powered insights",
          "Dynamic tier thresholds based on percentile rankings",
          "Engine Quality metrics: 10.7 avg turns, 23.1% Protect, 8.7% switch rate, 98.8% move coverage",
          "10 new competitive moves added (Parting Shot, Accelerock, Water Shuriken, and more)",
          "Fixed Mega Charizard X/Y stat display in modal",
          "Tournament data with 250+ real competitive results",
          "Core pair analysis from both ML simulation and tournament history",
        ],
      },
    ],
  },
  "battle-engine": {
    description: "Thanks for the support - we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "01/04/2026",
        items: [
          "Added Shed Tail move to battle engine (creates substitute + switches out)",
        ],
      },
      {
        date: "31/03/2026",
        items: [
          "Soul Furnace ability: Ghost/Fire 30% boost + Sp.Def drop on entry",
          "Eternal Bloom ability: Fairy 30% boost + 1/16 HP regen per turn",
          "Chandelure and Floette Mega Evolutions fully integrated in engine",
          "Full 2M battle simulation re-run with all 8 new Pokémon",
          "15/15 QA tests passing with new Pokémon",
        ],
      },
      {
        date: "30/03/2026",
        items: [
          "Mega Evolution now happens at start of turn, before any attacks",
          "Mirror Armor reflects Intimidate stat drops back at the user",
          "Imposter (Ditto) now triggers Intimidate after transforming",
          "Choice Scarf/Band/Specs now lock into the first move used",
          "Ability immunities (Levitate, Water Absorb, etc.) no longer deal minimum 1 damage",
          "Battle logs show 'no effect!' for immune targets instead of 'no target'",
          "AI spreads Fake Out targets across opponents instead of double-targeting",
          "Inner Focus, Shield Dust, and Own Tempo now block Fake Out flinch",
          "Battle logs correctly show 'missed!' instead of 'no target' on accuracy fails",
          "Corrected stat calculation formula: SP points applied before nature modifier (thanks jth1011!)",
          "Mega Evolution now triggers in-battle (no longer pre-resolved)",
          "Battle logs show 'X Mega Evolved!' with stat/type/ability changes",
          "One Mega Evolution per team per battle (VGC rule enforced)",
          "Aegislash Stance Change: Blade Forme on attack, Shield Forme on King's Shield",
          "King's Shield lowers attacker's Attack on contact moves",
          "Disguise (Mimikyu): blocks first hit, takes 1/8 HP chip",
          "Illusion (Zoroark): disguises as last team member, breaks on damage",
          "Imposter (Ditto): transforms into opponent on entry",
          "Protean/Libero: changes type to match move (once per switch-in)",
          "Damage Calculator now uses Mega form stats when holding Mega Stone",
          "Wind Rider + Tailwind interaction: Attack boost for allies",
          "Snow weather: +50% Defense for Ice types (Mega Froslass synergy)",
          "Sand weather: +50% SpDef for Rock types",
          "Blizzard 100% accuracy in snow, Thunder/Hurricane 100% in rain",
          "Multiscale (Mega Dragonite): halves damage at full HP",
        ],
      },
      {
        date: "29/03/2026",
        items: [
          "15+ ability fixes: Liquid Voice, Armor Tail, Mega Launcher, Strong Jaw, Bulletproof, Scrappy, Contrary, Weak Armor, Unaware, Wind Rider, and more",
          "Blaze/Overgrow/Torrent/Swarm low-HP boost implemented",
          "Permafrost Fist and Libero abilities added",
          "Dark mode support for battle interface and tabs",
          "VGC world-class AI with intelligent Protect, switching, and move selection",
          "2M+ battle engine with full damage calc, abilities, items, weather, terrain",
          "Battle replay with turn-by-turn logs",
          "242+ moves fully implemented in the engine",
          "Mega Evolution ability fixes (Tough Claws, Aerilate, Pixilate, etc.)",
          "Palafin Zero-to-Hero transformation support",
          "40+ curated meta teams for testing",
        ],
      },
    ],
  },
  "team-builder": {
    description: "Thanks for the support - we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "01/04/2026",
        items: [
          "Fixed 46 missing moves across Pokémon movepools (Sucker Punch, Fake Out, Iron Head, King's Shield, and more)",
          "Added Shed Tail to Orthworm's movepool and battle engine",
          "All competitive set moves now correctly available in team builder",
        ],
      },
      {
        date: "31/03/2026",
        items: [
          "Competitive sets added for all 8 new Pokémon",
          "Mega Chandelure and Mega Floette sets with mega stones",
          "Grimmsnarl screens, Skeledirge Unaware, Mamoswine Thick Fat builds",
          "10 new engine-generated winning teams from 2M simulation",
        ],
      },
      {
        date: "30/03/2026",
        items: [
          "Corrected stat calculation formula: SP points applied before nature modifier (thanks jth1011!)",
          "Damage Calculator: Mega form stats, types, and abilities now resolve automatically",
          "Battle replays now show Mirror Armor, Intimidate, immunity, and Imposter interactions",
          "Choice item move locking reflected in battle replays",
          "Improved battle accuracy with 28/28 QA tests passing",
          "Fixed Clefable sets: uses Magic Guard instead of Friend Guard (Clefairy-only)",
        ],
      },
      {
        date: "29/03/2026",
        items: [
          "Dark mode support for team builder interface",
          "SP cap fixed to 66 total points with +/- 2 buttons",
          "AI-powered teammate suggestions based on synergy analysis",
          "Recommended competitive sets from usage data",
          "Share teams via compressed URLs",
          "Import/Export in Pokémon Showdown format",
          "Drag-and-drop team reordering",
          "Synergy analysis: role coverage, type overlaps, core pair detection",
        ],
      },
    ],
  },
  learn: {
    description: "Thanks for the support - we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "29/03/2026",
        items: [
          "Dark mode support",
          "Complete VGC ruleset guide for beginners",
          "Role guides: sweeper, wall, pivot, support",
          "Strategy fundamentals for the Champions format",
          "Champions-specific mechanics (SP System, Mega Evolution, Tera Type)",
        ],
      },
    ],
  },
};

export function LastUpdated({ page }: { page: keyof typeof CHANGELOGS }) {
  const [open, setOpen] = useState(false);
  const data = CHANGELOGS[page];
  if (!data) return null;
  const latestDate = data.entries[0]?.date ?? "29/03/2026";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:border-emerald-300 dark:hover:border-emerald-500/30 transition-all group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Last updated {latestDate}
        <ArrowUpRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-white dark:bg-[#111a2e] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-200/10 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 dark:border-gray-200/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-bold">What&apos;s New</h3>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
                <p className="text-sm text-muted-foreground">{data.description}</p>
                {data.entries.map((entry) => (
                  <div key={entry.date}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">{entry.date}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {entry.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

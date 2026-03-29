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
    description: "Thanks for the support — we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "29/03/2026",
        items: [
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
    description: "Thanks for the support — we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "29/03/2026",
        items: [
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
    description: "Thanks for the support — we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "29/03/2026",
        items: [
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
    description: "Thanks for the support — we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "29/03/2026",
        items: [
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
    description: "Thanks for the support — we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
    entries: [
      {
        date: "29/03/2026",
        items: [
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Last updated 29/03/2026
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
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-bold">What&apos;s New</h3>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
                <p className="text-sm text-muted-foreground">{data.description}</p>
                {data.entries.map((entry) => (
                  <div key={entry.date}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-700">{entry.date}</span>
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

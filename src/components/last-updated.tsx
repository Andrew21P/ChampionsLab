"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";

interface ChangelogEntry {
  date: string;
  items: string[];
}

const SHARED_ENTRIES: ChangelogEntry[] = [
  {
    date: "06/04/2026",
    items: [
      "Fixed Team Builder layout at medium screen sizes (1280-1730px) — right column now stacks below instead of squeezing stat sliders",
      "Fixed Mega Absol Z, Mega Garchomp Z, and Mega Lucario Z having identical stats to their regular mega forms — restored unique Z-mega stat distributions",
      "Added 6 more missing held items: Fairy Feather, Eject Pack, Eject Button, Room Service, Lagging Tail, Iron Ball",
      "Fixed mobile search dropdown closing when keyboard appears",
    ],
  },
  {
    date: "05/04/2026",
    items: [
      "Added 13 missing held items: Power Herb, Ability Shield, terrain Seeds, Normal Gem, Silk Scarf, and more",
      "Added Tauros (#128) — Normal-type physical attacker with Intimidate, full movepool and competitive sets",
      "Added Castform (#351) — Weather Pokémon with Forecast ability, weather-based sets for rain, sun, and hail",
      "Mega Pokémon now have a Pre-Mega Ability selector (e.g. Intimidate before Mega Gyarados)",
      "Share image now shows both pre-mega and mega abilities",
      "Stat Points now show Base Stats and Final Stats (Total) for each stat",
      "Stat bars are now draggable sliders with grab handles",
      "Nature-boosted stats highlighted in red, lowered in blue",
      "Mega Evolution base stats automatically reflected in stat display",
      "Fixed stat presets using only 64/66 SP instead of 66/66",
      "Fixed empty move bullet points appearing after clearing moves in Team Builder",
    ],
  },
  {
    date: "03/04/2026",
    items: [
      "New Champions Lab logo! (Thanks to Noct 🎨)",
      "Logo updated across all pages: Pokédex, Navbar, Favicon, Team Builder share image, and Open Graph",
      "Share image now shows Mega sprites when a Pokémon is Mega Evolved",
      "Share image text enlarged and improved readability",
      "Instant hamburger menu: pure HTML button, zero React hydration delay",
      "Team Builder buttons centered and no longer overlap team name",
      "Fixed navbar title/subtitle wrapping at mid-range resolutions",
      "Battle AI now considers ability immunities when switching (Lightning Rod, Storm Drain, Flash Fire, Water Absorb, etc.)",
      "Damp Rock, Heat Rock, Smooth Rock, Icy Rock now extend weather from 5 to 8 turns",
      "Lum Berry now cures status conditions in battle",
      "Type Coverage in Team Builder now accounts for -ate abilities (Dragonize, Pixilate, etc.)",
      "Type Coverage now uses Mega form types for defensive matchups",
    ],
  },
  {
    date: "02/04/2026",
    items: [
      "Mega Excadrill ability updated: Piercing Drill — contact moves pierce Protect for 1/4 damage",
      "Mega Scovillain ability updated: Spicy Spray — burns the attacker when hit",
      "Fixed stat bar display (bars were filling 100% due to motion replacement)",
    ],
  },
  {
    date: "01/04/2026",
    items: [
      "Performance: removed framer-motion from critical bundle — ~100KB less JavaScript on page load",
      "Instant hamburger menu: native browser toggle, zero JS delay on mobile",
      "Fixed 46 missing moves across Pokémon movepools",
      "Added Shed Tail to Orthworm",
      "Ability-aware Type Coverage in Team Builder",
      "Damage calculator dropdowns upgraded with search/filter",
      "19 new competitive moves added to Battle Engine",
      "Battle Bot edit modal: mobile-optimized layout",
    ],
  },
  {
    date: "31/03/2026",
    items: [
      "Added 8 missing Pokémon: Mamoswine, Chandelure, Floette, Goodra, Trevenant, Appletun, Grimmsnarl, Skeledirge",
      "Mega Chandelure with Soul Furnace ability (Ghost/Fire 30% boost)",
      "Mega Floette with Eternal Bloom ability (Fairy 30% boost + regen)",
      "Full movesets, competitive sets, and simulation data for all 8",
      "Roster expanded to 155+ Pokémon",
      "10 new engine-generated winning teams from 2M simulation",
    ],
  },
  {
    date: "30/03/2026",
    items: [
      "Corrected stat calculation formula: SP points applied before nature modifier",
      "Mega Evolution now triggers in-battle with stat/type/ability changes",
      "Aegislash Stance Change, Disguise, Illusion, Imposter abilities added",
      "Snow weather: +50% Defense for Ice types",
      "Sand weather: +50% Special Defense for Rock types",
      "Fixed Clefable ability: Magic Guard instead of Friend Guard",
    ],
  },
  {
    date: "29/03/2026",
    items: [
      "Dark mode support across all pages and modals",
      "147 Pokémon roster with 11 regional forms",
      "Full Mega Evolution support with dynamic stats",
      "Tier rankings powered by 2M+ battle simulations",
      "SP System (66 Stat Points) replacing traditional EVs/IVs",
      "VGC AI with intelligent Protect, switching, and move selection",
      "242+ moves fully implemented in the Battle Engine",
      "Team Builder with AI-powered suggestions and synergy analysis",
    ],
  },
];

const SHARED_CHANGELOG = {
  description: "Thanks for the support — we're updating the website as fast as possible to adapt to everything new from Pokémon Champions!",
  entries: SHARED_ENTRIES,
};

const CHANGELOGS: Record<string, { description: string; entries: ChangelogEntry[] }> = {
  pokedex: SHARED_CHANGELOG,
  meta: SHARED_CHANGELOG,
  "battle-engine": SHARED_CHANGELOG,
  "team-builder": SHARED_CHANGELOG,
  learn: SHARED_CHANGELOG,
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

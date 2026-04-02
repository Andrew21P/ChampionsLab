import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChampionsPokemon, CommonSet } from "@/lib/types";

export interface GauntletRosterPokemon {
  pokemon: ChampionsPokemon;
  set: CommonSet;
  currentHP: number; // For keeping track of HP between battles
}

interface GauntletState {
  credits: number;
  roster: GauntletRosterPokemon[];
  currentWave: number;
  bossCap: number; // Current SP max limit

  // Actions
  addCredits: (amount: number) => void;
  removeCredits: (amount: number) => void;
  addPokemonToRoster: (pokemon: ChampionsPokemon, set: CommonSet) => void;
  updateRosterPokemon: (index: number, data: Partial<GauntletRosterPokemon>) => void;
  updateRosterPokemonBatch: (updates: {index: number, data: Partial<GauntletRosterPokemon>}[]) => void;
  healRoster: () => void; // Restores all HP (maybe purchased from shop)
  advanceWave: () => void;
  resetGauntlet: () => void;
}

const INITIAL_CREDITS = 1000;
const INITIAL_BOSS_CAP = 30;

export const useGauntletStore = create<GauntletState>()(
  persist(
    (set) => ({
      credits: INITIAL_CREDITS,
      roster: [],
      currentWave: 1,
      bossCap: INITIAL_BOSS_CAP,

      addCredits: (amount) => set((state) => ({ credits: state.credits + amount })),
      removeCredits: (amount) => set((state) => ({ credits: Math.max(0, state.credits - amount) })),

      addPokemonToRoster: (pokemon, pset) => set((state) => ({
        roster: [...state.roster, { pokemon, set: pset, currentHP: 100 }] // currentHP is percentage or we can calculate actual max HP later, let's use percentage 100
      })),

      updateRosterPokemon: (index, data) => set((state) => {
        const newRoster = [...state.roster];
        newRoster[index] = { ...newRoster[index], ...data };
        return { roster: newRoster };
      }),

      updateRosterPokemonBatch: (updates) => set((state) => {
        const newRoster = [...state.roster];
        for (const update of updates) {
          if (newRoster[update.index]) {
            newRoster[update.index] = { ...newRoster[update.index], ...update.data };
          }
        }
        return { roster: newRoster };
      }),

      healRoster: () => set((state) => ({
        roster: state.roster.map(p => ({ ...p, currentHP: 100 }))
      })),

      advanceWave: () => set((state) => {
        const nextWave = state.currentWave + 1;
        // Every 5th wave cleared means we just beat a boss (e.g. wave 5 cleared -> wave 6 starts, cap increases)
        // Actually, if we advance from wave 5 to 6, we defeated boss 5.
        // Or if currentWave % 5 === 0
        const newBossCap = (state.currentWave % 5 === 0) ? Math.min(66, state.bossCap + 10) : state.bossCap;
        return {
          currentWave: nextWave,
          bossCap: newBossCap,
        };
      }),

      resetGauntlet: () => set({
        credits: INITIAL_CREDITS,
        roster: [],
        currentWave: 1,
        bossCap: INITIAL_BOSS_CAP,
      }),
    }),
    {
      name: "champions-lab:gauntlet",
    }
  )
);

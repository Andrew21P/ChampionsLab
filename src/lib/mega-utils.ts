import { POKEMON_SEED } from "./pokemon-data";
import type { ChampionsPokemon } from "./types";

/**
 * Returns the mega form sprite URL for a given pokemon.
 * Falls back to the base sprite if no mega form exists.
 */
export function getMegaSprite(pokemon: ChampionsPokemon, formIndex?: number): string {
  const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
  const megaForm = megaForms[formIndex ?? 0];
  return megaForm?.sprite ?? pokemon.sprite;
}

/**
 * Returns the mega form name for a given pokemon.
 * Falls back to the base name if no mega form exists.
 */
export function getMegaName(pokemon: ChampionsPokemon, formIndex?: number): string {
  const megaForms = pokemon.forms?.filter(f => f.isMega) ?? [];
  const megaForm = megaForms[formIndex ?? 0];
  return megaForm?.name ?? pokemon.name;
}

/**
 * Given a tournament team's archetype string (e.g. "Mega Metagross"),
 * extract the base pokemon name that mega-evolves.
 * Returns the pokemonId of the mega member, or null if archetype isn't mega.
 */
export function getMegaIdFromArchetype(archetype: string): number | null {
  if (!archetype.startsWith("Mega ")) return null;
  const megaName = archetype.slice(5); // Remove "Mega " prefix
  const pokemon = POKEMON_SEED.find(p => p.name === megaName && p.hasMega);
  return pokemon?.id ?? null;
}

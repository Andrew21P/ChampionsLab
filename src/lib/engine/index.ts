// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC BATTLE ENGINE
// Public API - import everything from "@/lib/engine"
// ═══════════════════════════════════════════════════════════════════════════════

// Type Chart
export {
  getTypeEffectiveness,
  getMatchup,
  getWeaknesses,
  getResistances,
  getImmunities,
  defensiveSynergy,
  offensiveCoverage,
  teamTypeCoverage,
} from "./type-chart";

// Natures
export {
  NATURES,
  getNatureModifier,
  suggestNature,
  getAllNatures,
  type NatureName,
  type StatKey,
} from "./natures";

// Items
export {
  ITEMS,
  getItemDamageMultiplier,
  getItemSpeedMultiplier,
  suggestItems,
  getAllItems,
} from "./items";

// Move Data
export {
  getMove,
  isSpreadMove,
  isPriorityMove,
  getEffectiveBP,
  getMoveRole,
  type EngineMove,
} from "./move-data";

// Ability Data
export {
  getAbilityEffect,
  isWeatherSetter,
  getTypeImmunity,
  isIntimidateImmune,
  benefitsFromIntimidate,
} from "./ability-data";

// Stat Calculator
export {
  calculateStats,
  getEffectiveSpeed,
  applyStatStage,
  getBST,
  getSpeedTier,
  classifyStatProfile,
} from "./stat-calc";

// Damage Calculator
export {
  calculateDamage,
  getBestMove,
  estimateDamage,
  formatDamageResult,
  type DamageCalcPokemon,
  type DamageCalcTarget,
  type DamageCalcOptions,
  type DamageResult,
} from "./damage-calc";

// Synergy Analysis
export {
  analyzeTeamSynergy,
  scorePokemonFit,
  identifyRoles,
  detectArchetypes,
  getSpeedTierReport,
  type TeamSynergy,
  type PokemonRole,
  type ArchetypeProfile,
  type TeamArchetype,
  type TeamRole,
} from "./synergy";

// Team Generator
export {
  generateTeams,
  generateTeamsWithPokemon,
  generateFromArchetype,
  getArchetypeNames,
  type GeneratedTeam,
} from "./team-generator";

// Battle Simulator
export {
  simulateBattle,
  runSimulation,
} from "./battle-sim";

// Suggestion Engine
export {
  suggestTeammates,
  suggestSets,
  suggestMoves,
  suggestAbilities,
  suggestBestNature,
  suggestSPDistribution,
  getSlotSuggestions,
  analyzePartialTeam,
  type TeammateSuggestion,
  type SetSuggestion,
  type MoveSuggestion,
  type AbilitySuggestion,
  type NatureSuggestion,
  type SPSuggestion,
  type SlotSuggestion,
  type TeamAnalysis,
} from "./suggestions";

// Pre-built Teams
export {
  PREBUILT_TEAMS,
  getPrebuiltTeamsByTag,
  getPrebuiltTeamsWithPokemon,
  getAllTags,
  type PrebuiltTeam,
} from "./generated-teams";

// ML Simulation Runner
export {
  runMLSimulation,
  runQuickSimulation,
  formatReport,
  SimulationDatabase,
  type SimulationConfig,
  type FinalReport,
  type ProgressReport,
  type MetaSnapshot,
  type MLInsight,
  type ELOEntry,
  type PokemonStats,
  type MoveStats,
  type ArchetypeStats,
  type SimulationResult,
} from "./ml-runner";

// VGC Tournament Data
export {
  TOURNAMENT_USAGE,
  TOURNAMENT_TEAMS,
  CORE_PAIRS,
  ARCHETYPE_MATCHUPS,
  getUsageForPokemon,
  getTopUsagePokemon,
  getCorePairsForPokemon,
  getTournamentTeamsWithPokemon,
  getArchetypeWinRate,
  getMetaTrends,
  predictMetaTeams,
  type TournamentUsage,
  type TournamentTeam,
  type CorePair,
  type ArchetypeMatchup,
  type MetaTeamPrediction,
} from "./vgc-data";

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC BATTLE SIMULATOR
// Monte Carlo doubles battle simulation engine
// Simulates turn-by-turn VGC matches with AI decision-making
// ═══════════════════════════════════════════════════════════════════════════════

import type { ChampionsPokemon, CommonSet, BaseStats, StatPoints, PokemonType } from "@/lib/types";
import { calculateStats, getEffectiveSpeed, applyStatStage } from "./stat-calc";
import { calculateDamage, type DamageCalcPokemon, type DamageCalcTarget, type DamageCalcOptions } from "./damage-calc";
import { getMatchup } from "./type-chart";
import { getMove, isSpreadMove, type EngineMove, MOVE_DATA } from "./move-data";
import { getAbilityEffect, isWeatherSetter, getTypeImmunity } from "./ability-data";
import type { NatureName } from "./natures";

// ── PALAFIN HERO FORM STATS ─────────────────────────────────────────────────
const PALAFIN_HERO_STATS: BaseStats = {
  hp: 100, attack: 160, defense: 97, spAtk: 106, spDef: 87, speed: 100
};
const PALAFIN_ZERO_STATS: BaseStats = {
  hp: 100, attack: 70, defense: 72, spAtk: 53, spDef: 62, speed: 100
};

// ── AEGISLASH BLADE/SHIELD FORM STATS ────────────────────────────────────────
const AEGISLASH_SHIELD_STATS: BaseStats = {
  hp: 60, attack: 50, defense: 140, spAtk: 50, spDef: 140, speed: 60
};
const AEGISLASH_BLADE_STATS: BaseStats = {
  hp: 60, attack: 140, defense: 50, spAtk: 140, spDef: 50, speed: 60
};

// ── MEGA DETECTION ───────────────────────────────────────────────────────────

function isMegaStoneItem(item: string): boolean {
  return item.endsWith("ite") || item.endsWith("ite X") || item.endsWith("ite Y") || item.endsWith("ite Z");
}

/** Resolve mega form data for a Pokémon holding its mega stone (used for pre-resolution only) */
function resolveMegaForm(pokemon: ChampionsPokemon, set: CommonSet): {
  baseStats: BaseStats;
  types: PokemonType[];
  ability: string;
  isMega: boolean;
  megaBaseStats?: BaseStats;
  megaTypes?: PokemonType[];
  megaAbility?: string;
} {
  if (!pokemon.hasMega || !pokemon.forms || !isMegaStoneItem(set.item)) {
    return { baseStats: pokemon.baseStats, types: [...pokemon.types], ability: set.ability, isMega: false };
  }
  const megaForm = pokemon.forms.find(f => f.isMega);
  if (!megaForm) {
    return { baseStats: pokemon.baseStats, types: [...pokemon.types], ability: set.ability, isMega: false };
  }
  // The team builder stores the mega ability in set.ability (e.g. "Mold Breaker"
  // for Mega Gyarados). Before Mega Evolution, the base form ability should be
  // active (e.g. "Intimidate").  Detect whether set.ability is actually a mega
  // ability and fall back to the base Pokémon's first ability.
  const megaAbilityName = megaForm.abilities[0]?.name;
  const isMegaAbility = megaForm.abilities.some(a => a.name === set.ability);
  const baseAbility = isMegaAbility
    ? (pokemon.abilities[0]?.name ?? set.ability)
    : set.ability;
  // Return base form stats but store mega data for in-battle evolution
  return {
    baseStats: pokemon.baseStats,
    types: [...pokemon.types] as PokemonType[],
    ability: baseAbility,
    isMega: false, // Start in base form
    megaBaseStats: megaForm.baseStats,
    megaTypes: [...megaForm.types] as PokemonType[],
    megaAbility: megaAbilityName ?? set.ability,
  };
}

// ── BATTLE STATE ─────────────────────────────────────────────────────────────

interface BattlePokemon {
  pokemon: ChampionsPokemon;
  set: CommonSet;
  currentHP: number;
  maxHP: number;
  stats: ReturnType<typeof calculateStats>;
  boosts: Record<string, number>;
  status: string | null;
  isAlive: boolean;
  isFainted: boolean;
  hasMoved: boolean;
  canFakeOut: boolean;
  isProtected: boolean;
  protectCount: number;
  protectMoveName?: string;
  item: string;
  itemConsumed: boolean;
  ability: string;
  types: PokemonType[];
  isMega: boolean;
  effectiveBaseStats: BaseStats;
  hasTransformed: boolean;  // Zero to Hero tracking
  hasSwitchedOut: boolean;  // Palafin: switched out at least once
  // Mega Evolution support (in-battle transformation)
  canMegaEvolve: boolean;
  hasMegaEvolved: boolean;
  megaBaseStats?: BaseStats;
  megaTypes?: PokemonType[];
  megaAbility?: string;
  // Aegislash Stance Change
  stanceForm?: "shield" | "blade";
  // Disguise (Mimikyu)
  disguiseIntact: boolean;
  // Illusion (Zoroark)
  illusionActive: boolean;
  illusionDisguise?: { name: string; types: PokemonType[]; sprite: string };
  // Imposter / Transform
  isTransformed: boolean;
  originalStats?: ReturnType<typeof calculateStats>;
  originalTypes?: PokemonType[];
  originalAbility?: string;
  originalBaseStats?: BaseStats;
  // Protean/Libero type change (once per switch-in)
  hasChangedType: boolean;
  // Choice item move lock
  choiceLockedMove: string | null;
  // Tracking for log: last move missed
  lastMoveMissed: boolean;
  // Tracking for log: last move was immune
  lastMoveImmune: boolean;
}

interface FieldState {
  weather: string | null;
  weatherTurns: number;
  terrain: string | null;
  terrainTurns: number;
  trickRoom: boolean;
  trickRoomTurns: number;
  side1: { tailwind: number; reflect: number; lightScreen: number; auroraVeil: number };
  side2: { tailwind: number; reflect: number; lightScreen: number; auroraVeil: number };
}

interface BattleState {
  team1: BattlePokemon[];           // Full team of 6 (or 4 selected)
  team2: BattlePokemon[];
  active1: [BattlePokemon | null, BattlePokemon | null]; // Doubles: 2 active slots
  active2: [BattlePokemon | null, BattlePokemon | null];
  field: FieldState;
  turn: number;
  winner: 1 | 2 | null;
}

// ── BATTLE POKEMON FACTORY ───────────────────────────────────────────────────

function createBattlePokemon(pokemon: ChampionsPokemon, set: CommonSet, teamForIllusion?: { pokemon: ChampionsPokemon; set: CommonSet }[]): BattlePokemon {
  const mega = resolveMegaForm(pokemon, set);
  const stats = calculateStats(mega.baseStats, set.sp, set.nature as NatureName);
  
  // Illusion: disguise as the last Pokémon in team
  let illusionDisguise: BattlePokemon["illusionDisguise"] = undefined;
  if (set.ability === "Illusion" && teamForIllusion && teamForIllusion.length > 1) {
    const lastMon = teamForIllusion[teamForIllusion.length - 1];
    if (lastMon.pokemon.id !== pokemon.id) {
      illusionDisguise = {
        name: lastMon.pokemon.name,
        types: [...lastMon.pokemon.types] as PokemonType[],
        sprite: lastMon.pokemon.sprite,
      };
    }
  }

  return {
    pokemon,
    set,
    currentHP: stats.hp,
    maxHP: stats.hp,
    stats,
    boosts: { attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 },
    status: null,
    isAlive: true,
    isFainted: false,
    hasMoved: false,
    canFakeOut: true,
    isProtected: false,
    protectCount: 0,
    item: set.item,
    itemConsumed: false,
    ability: mega.ability,
    types: mega.types,
    isMega: false, // Always start in base form
    effectiveBaseStats: mega.baseStats,
    hasTransformed: false,
    hasSwitchedOut: false,
    // Mega Evolution: store mega data for in-battle trigger
    canMegaEvolve: !!mega.megaBaseStats,
    hasMegaEvolved: false,
    megaBaseStats: mega.megaBaseStats,
    megaTypes: mega.megaTypes,
    megaAbility: mega.megaAbility,
    // Aegislash Stance Change
    stanceForm: set.ability === "Stance Change" ? "shield" : undefined,
    // Disguise (Mimikyu)
    disguiseIntact: set.ability === "Disguise",
    // Illusion (Zoroark)
    illusionActive: !!illusionDisguise,
    illusionDisguise,
    // Transform/Imposter
    isTransformed: false,
    // Protean/Libero
    hasChangedType: false,
    // Choice item lock
    choiceLockedMove: null,
    // Log tracking
    lastMoveMissed: false,
    lastMoveImmune: false,
  };
}

/** Apply Zero to Hero transformation - recalculate stats with Hero Form base stats */
function applyHeroTransform(mon: BattlePokemon): void {
  if (mon.hasTransformed) return;
  mon.hasTransformed = true;
  mon.effectiveBaseStats = PALAFIN_HERO_STATS;
  const newStats = calculateStats(PALAFIN_HERO_STATS, mon.set.sp, mon.set.nature as NatureName);
  // Keep current HP ratio
  const hpRatio = mon.currentHP / mon.maxHP;
  mon.stats = newStats;
  mon.maxHP = newStats.hp;
  mon.currentHP = Math.max(1, Math.floor(hpRatio * newStats.hp));
}

/** Apply Mega Evolution in-battle - transforms stats, types, and ability */
function applyMegaEvolution(mon: BattlePokemon): void {
  if (mon.hasMegaEvolved || !mon.canMegaEvolve || !mon.megaBaseStats) return;
  mon.hasMegaEvolved = true;
  mon.isMega = true;
  mon.effectiveBaseStats = mon.megaBaseStats;
  if (mon.megaTypes) mon.types = mon.megaTypes;
  if (mon.megaAbility) mon.ability = mon.megaAbility;
  // Recalculate stats with mega base stats, keeping HP ratio  
  const hpRatio = mon.currentHP / mon.maxHP;
  const newStats = calculateStats(mon.megaBaseStats, mon.set.sp, mon.set.nature as NatureName);
  mon.stats = newStats;
  mon.maxHP = newStats.hp;
  mon.currentHP = Math.max(1, Math.floor(hpRatio * newStats.hp));
  // Process on-entry effects for the new mega ability
  const abilityEffect = getAbilityEffect(mon.ability);
  if (abilityEffect?.setsWeather) {
    // Weather is set by mega evolution (e.g., Mega Charizard Y's Drought)
    // Will be handled by the caller via returned flag
  }
}

/** Apply Aegislash Stance Change to Blade Forme */
function applyStanceChange(mon: BattlePokemon, form: "blade" | "shield"): void {
  if (mon.stanceForm === form) return;
  mon.stanceForm = form;
  const newBase = form === "blade" ? AEGISLASH_BLADE_STATS : AEGISLASH_SHIELD_STATS;
  mon.effectiveBaseStats = newBase;
  const hpRatio = mon.currentHP / mon.maxHP;
  const newStats = calculateStats(newBase, mon.set.sp, mon.set.nature as NatureName);
  mon.stats = newStats;
  mon.maxHP = newStats.hp;
  mon.currentHP = Math.max(1, Math.floor(hpRatio * newStats.hp));
}

/** Apply Imposter transformation - copy target's stats, types, ability, and moves */
function applyImposterTransform(mon: BattlePokemon, target: BattlePokemon): void {
  if (mon.isTransformed) return;
  mon.isTransformed = true;
  // Save original data for reference
  mon.originalStats = { ...mon.stats };
  mon.originalTypes = [...mon.types];
  mon.originalAbility = mon.ability;
  mon.originalBaseStats = { ...mon.effectiveBaseStats };
  // Copy target's data
  mon.types = [...target.types];
  mon.ability = target.ability;
  mon.effectiveBaseStats = { ...target.effectiveBaseStats };
  // Recalculate stats using target's base stats but keep own HP
  const newStats = calculateStats(target.effectiveBaseStats, mon.set.sp, mon.set.nature as NatureName);
  mon.stats = newStats;
  // HP stays the same (Ditto keeps its own HP)
  // Copy target moves (replace moveset with target's current 4 moves)
  mon.set = {
    ...mon.set,
    moves: [...target.set.moves],
    ability: target.ability,
  };
  // Copy boosts
  mon.boosts = { ...target.boosts };
}

/** Break Illusion disguise */
function breakIllusion(mon: BattlePokemon): void {
  if (!mon.illusionActive) return;
  mon.illusionActive = false;
  mon.illusionDisguise = undefined;
}

/** Break Disguise (Mimikyu) - takes 1/8 HP recoil */
function breakDisguise(mon: BattlePokemon): void {
  if (!mon.disguiseIntact) return;
  mon.disguiseIntact = false;
  // Takes 1/8 max HP as recoil when disguise breaks
  mon.currentHP -= Math.floor(mon.maxHP / 8);
  if (mon.currentHP <= 0) {
    mon.currentHP = 0;
    mon.isAlive = false;
    mon.isFainted = true;
  }
}

// ── SPEED CALCULATION ────────────────────────────────────────────────────────

function getActualSpeed(mon: BattlePokemon, field: FieldState, sideIndex: 1 | 2): number {
  let speed = mon.stats.speed;
  speed = applyStatStage(speed, mon.boosts.speed);
  
  // Paralysis
  if (mon.status === "paralysis") speed = Math.floor(speed * 0.5);
  
  // Choice Scarf
  if (mon.item === "Choice Scarf" && !mon.itemConsumed) speed = Math.floor(speed * 1.5);
  
  // Weather speed abilities
  const abilityEffect = getAbilityEffect(mon.ability);
  if (abilityEffect?.weatherSpeed) {
    if ((abilityEffect.weatherSpeed === "rain" && field.weather === "rain") ||
        (abilityEffect.weatherSpeed === "sun" && field.weather === "sun") ||
        (abilityEffect.weatherSpeed === "sand" && field.weather === "sand") ||
        (abilityEffect.weatherSpeed === "snow" && field.weather === "snow")) {
      speed *= 2;
    }
  }
  
  // Unburden
  if (mon.ability === "Unburden" && mon.itemConsumed) speed *= 2;
  
  // Tailwind
  const side = sideIndex === 1 ? field.side1 : field.side2;
  if (side.tailwind > 0) speed *= 2;
  
  return Math.floor(speed);
}

// ── AI DECISION ENGINE (VGC WORLD-CLASS) ─────────────────────────────────────
// Human-like AI that models top VGC play: threat assessment, focus fire,
// protect reads, position awareness, endgame logic, intelligent switching

interface MoveChoice {
  moveIndex: number;
  moveName: string;
  targetSlot: number; // 0 or 1 for opponent slots, -1 for self/field
  score: number;
}

/** Estimate how much damage an opponent can deal to a mon this turn */
function estimateThreatLevel(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  field: FieldState,
  attackerSide: 1 | 2
): number {
  let maxPercent = 0;
  const options: DamageCalcOptions = {
    weather: field.weather as DamageCalcOptions["weather"],
    isDoubles: true,
    reflect: (attackerSide === 1 ? field.side2 : field.side1).reflect > 0,
    lightScreen: (attackerSide === 1 ? field.side2 : field.side1).lightScreen > 0,
  };
  for (const moveName of attacker.set.moves) {
    const move = getMove(moveName);
    if (!move || move.category === "status") continue;
    const atk: DamageCalcPokemon = {
      baseStats: attacker.effectiveBaseStats, sp: attacker.set.sp,
      nature: attacker.set.nature as NatureName, types: attacker.types,
      ability: attacker.ability, item: attacker.item,
      atkStages: attacker.boosts.attack, spAtkStages: attacker.boosts.spAtk,
      isBurned: attacker.status === "burn",
      currentHPPercent: (attacker.currentHP / attacker.maxHP) * 100,
    };
    const def: DamageCalcTarget = {
      baseStats: defender.effectiveBaseStats, sp: defender.set.sp,
      nature: defender.set.nature as NatureName, types: defender.types,
      ability: defender.ability, item: defender.item,
      defStages: defender.boosts.defense, spDefStages: defender.boosts.spDef,
    };
    const result = calculateDamage(atk, def, moveName, options);
    if (result.percentHP[0] > maxPercent) maxPercent = result.percentHP[0];
  }
  return maxPercent;
}

/** Check if ally can KO the same target (for focus fire coordination) */
function allyCanKO(
  ally: BattlePokemon | null,
  target: BattlePokemon,
  field: FieldState,
  allySide: 1 | 2
): boolean {
  if (!ally || ally.isFainted) return false;
  const options: DamageCalcOptions = {
    weather: field.weather as DamageCalcOptions["weather"],
    isDoubles: true,
    reflect: (allySide === 1 ? field.side2 : field.side1).reflect > 0,
    lightScreen: (allySide === 1 ? field.side2 : field.side1).lightScreen > 0,
  };
  for (const moveName of ally.set.moves) {
    const move = getMove(moveName);
    if (!move || move.category === "status") continue;
    const atk: DamageCalcPokemon = {
      baseStats: ally.effectiveBaseStats, sp: ally.set.sp,
      nature: ally.set.nature as NatureName, types: ally.types,
      ability: ally.ability, item: ally.item,
      atkStages: ally.boosts.attack, spAtkStages: ally.boosts.spAtk,
      isBurned: ally.status === "burn",
      currentHPPercent: (ally.currentHP / ally.maxHP) * 100,
    };
    const def: DamageCalcTarget = {
      baseStats: target.effectiveBaseStats, sp: target.set.sp,
      nature: target.set.nature as NatureName, types: target.types,
      ability: target.ability, item: target.item,
      defStages: target.boosts.defense, spDefStages: target.boosts.spDef,
    };
    const result = calculateDamage(atk, def, moveName, options);
    if (result.isOHKO) return true;
  }
  return false;
}

/** Estimate if user is being doubled (both opponents can threaten it significantly) */
function isBeingDoubled(
  user: BattlePokemon,
  opponents: (BattlePokemon | null)[],
  field: FieldState,
  oppSide: 1 | 2
): boolean {
  let threatsAbove50 = 0;
  for (const opp of opponents) {
    if (!opp || opp.isFainted) continue;
    const threat = estimateThreatLevel(opp, user, field, oppSide);
    if (threat >= 50) threatsAbove50++;
  }
  return threatsAbove50 >= 2;
}

function evaluateMoveOption(
  user: BattlePokemon,
  userSide: 1 | 2,
  targets: (BattlePokemon | null)[],
  allies: (BattlePokemon | null)[],
  moveName: string,
  field: FieldState,
  state: BattleState
): MoveChoice[] {
  const move = getMove(moveName);
  if (!move) return [];
  
  const choices: MoveChoice[] = [];
  const oppSide: 1 | 2 = userSide === 1 ? 2 : 1;
  const options: DamageCalcOptions = {
    weather: field.weather as DamageCalcOptions["weather"],
    isDoubles: true,
    lightScreen: (userSide === 1 ? field.side2 : field.side1).lightScreen > 0,
    reflect: (userSide === 1 ? field.side2 : field.side1).reflect > 0,
    auroraVeil: (userSide === 1 ? field.side2 : field.side1).auroraVeil > 0,
  };
  
  // Context: our alive counts and theirs for position awareness
  const myTeam = userSide === 1 ? state.team1 : state.team2;
  const oppTeam = userSide === 1 ? state.team2 : state.team1;
  const myAlive = myTeam.filter(p => p.isAlive).length;
  const oppAlive = oppTeam.filter(p => p.isAlive).length;
  const isAhead = myAlive > oppAlive;
  const isBehind = myAlive < oppAlive;
  const isEndgame = myAlive <= 2 && oppAlive <= 2;
  
  // Check incoming threats
  const beingDoubled = isBeingDoubled(user, targets, field, oppSide);
  let maxIncomingThreat = 0;
  for (const opp of targets) {
    if (!opp || opp.isFainted) continue;
    const threat = estimateThreatLevel(opp, user, field, oppSide);
    if (threat > maxIncomingThreat) maxIncomingThreat = threat;
  }
  
  // Fake Out - intelligent targeting (physical move, must be checked BEFORE status block)
  if (moveName === "Fake Out" && user.canFakeOut) {
    let score = 0;
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      if (!t || t.isFainted) continue;
      score = 55;
      
      // Target the biggest threat
      const threatToUs = estimateThreatLevel(t, user, field, oppSide);
      const ally = allies.find(a => a && !a.isFainted);
      const threatToAlly = ally ? estimateThreatLevel(t, ally, field, oppSide) : 0;
      const maxThreat = Math.max(threatToUs, threatToAlly);
      score += maxThreat * 0.3;
      
      // Fake Out the TR/Tailwind setter to prevent THEIR setup
      if (t.set.moves.includes("Trick Room") || t.set.moves.includes("Tailwind")) score += 20;
      
      // Fake Out to PROTECT our ally setter (Fake Out their fastest threat)
      if (ally && ally.set.moves.some(m => ["Trick Room", "Tailwind"].includes(m))) {
        score += 25; // Huge bonus - protect the setter
        // Prefer flinching the fastest opponent (biggest threat to slow setter)
        if (t.stats.speed >= 80) score += 10;
      }
      
      // Fake Out support mons (Follow Me users, etc.)
      if (t.set.moves.includes("Follow Me") || t.set.moves.includes("Rage Powder")) score += 15;
      
      // Don't Fake Out mons with Inner Focus/Clear Body
      if (["Inner Focus", "Shield Dust", "Own Tempo"].includes(t.ability)) score -= 40;
      
      // Less valuable on weakened mons
      if (t.currentHP < t.maxHP * 0.3) score -= 20;
      
      choices.push({ moveIndex: 0, moveName, targetSlot: i, score });
    }
    return choices;
  }
  
  // Status moves evaluation
  if (move.category === "status") {
    let score = 0;
    
    // Protect: essential VGC move - used 15-20% of turns by top players
    if (move.flags.protect) {
      // Consecutive Protect penalty (only punish double-protecting)
      const protectPenalty = user.protectCount * 60;
      score = 30 - protectPenalty;
      
      // Protect is good when being doubled into by heavy threats
      if (beingDoubled) score += 20;
      
      // Protect when threatened with >50% HP damage
      if (maxIncomingThreat >= 50) score += 12;
      if (maxIncomingThreat >= 80) score += 8;
      
      // Protect when low HP and threatened
      if (user.currentHP < user.maxHP * 0.4 && maxIncomingThreat >= 40) score += 15;
      
      // Protect when ally can KO a threat this turn (coordinate)
      const ally = allies.find(a => a && !a.isFainted);
      if (ally) {
        for (const opp of targets) {
          if (opp && !opp.isFainted && allyCanKO(ally, opp, field, userSide)) score += 10;
        }
      }
      
      // Protect to stall when ahead
      if (isAhead) score += 6;
      if (isAhead && isEndgame) score += 10;
      
      // Protect to stall out field effects
      const mySide = userSide === 1 ? field.side1 : field.side2;
      if (mySide.tailwind > 0 && isAhead) score += 6;
      if (field.trickRoom && isAhead) score += 6;
      
      // Protect when opponent has weather/terrain advantage
      const oppSideRef = userSide === 1 ? field.side2 : field.side1;
      if (oppSideRef.tailwind > 0) score += 6;
      
      // Penalty when we can OHKO something - attacking is usually better
      let canKO = false;
      for (const opp of targets) {
        if (!opp || opp.isFainted) continue;
        for (const m of user.set.moves) {
          const mv = getMove(m);
          if (mv && mv.category !== "status") {
            const atk: DamageCalcPokemon = {
              baseStats: user.effectiveBaseStats, sp: user.set.sp,
              nature: user.set.nature as NatureName, types: user.types,
              ability: user.ability, item: user.item,
              atkStages: user.boosts.attack, spAtkStages: user.boosts.spAtk,
              isBurned: user.status === "burn",
              currentHPPercent: (user.currentHP / user.maxHP) * 100,
            };
            const def: DamageCalcTarget = {
              baseStats: opp.effectiveBaseStats, sp: opp.set.sp,
              nature: opp.set.nature as NatureName, types: opp.types,
              ability: opp.ability, item: opp.item,
              defStages: opp.boosts.defense, spDefStages: opp.boosts.spDef,
            };
            const res = calculateDamage(atk, def, m, { weather: field.weather as DamageCalcOptions["weather"], isDoubles: true });
            if (res.isOHKO || (res.damage[0] / opp.currentHP) >= 1.0) {
              canKO = true;
              break;
            }
          }
        }
        if (canKO) break;
      }
      if (canKO) score -= 35; // Don't Protect when you can KO!
      
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score: Math.max(score, -10) });
      return choices;
    }
    
    // Trick Room - crucial VGC speed control
    if (moveName === "Trick Room") {
      const myActive = userSide === 1 ? state.active1 : state.active2;
      const allySpeeds = myActive.filter(Boolean).map(m => m!.stats.speed);
      const avgMySpeed = allySpeeds.reduce((a, b) => a + b, 0) / allySpeeds.length;
      const oppSpeeds = targets.filter(Boolean).map(t => t!.stats.speed);
      const avgOppSpeed = oppSpeeds.reduce((a, b) => a + b, 0) / Math.max(oppSpeeds.length, 1);
      
      if (!field.trickRoom) {
        // Set TR if our side is slower - this is top priority for TR teams
        if (avgMySpeed < avgOppSpeed) {
          score = 120; // TR setup is the #1 priority - the entire team depends on it
          // Even higher on turn 1 - must set TR before getting overwhelmed
          if (state.turn <= 1) score += 15;
          // Ally has Fake Out support - perfect TR setup turn
          const ally = allies.find(a => a && !a.isFainted);
          if (ally && ally.set.moves.includes("Fake Out") && ally.canFakeOut) score += 20;
        } else {
          score = 15;
        }
        // Much more valuable if team has slow mons overall
        const teamSlow = myTeam.filter(p => p.isAlive && p.stats.speed < 70);
        if (teamSlow.length >= 2) score += 15;
      } else {
        // Reverse TR if we're actually faster
        score = avgMySpeed > avgOppSpeed ? 75 : 8;
      }
      
      // Don't set TR if already winning speed control
      const mySide = userSide === 1 ? field.side1 : field.side2;
      if (mySide.tailwind > 0 && !field.trickRoom) score -= 30;
      
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Tailwind - premier speed control
    if (moveName === "Tailwind") {
      const side = userSide === 1 ? field.side1 : field.side2;
      if (side.tailwind > 0) {
        score = 3; // Already have it
      } else {
        score = 72;
        // Less valuable if we already outspeed or have TR
        if (field.trickRoom) score = 10;
        // More valuable early
        if (state.turn <= 1) score += 10;
        // Less valuable if only 1 mon left
        if (allies.filter(a => a && !a.isFainted).length === 0 && myAlive <= 1) score -= 20;
      }
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Follow Me / Rage Powder - redirect support
    if (moveName === "Follow Me" || moveName === "Rage Powder") {
      const ally = allies.find(a => a && !a.isFainted);
      if (ally) {
        score = 40;
        // High value if ally is setting up (TR, Tailwind, boosts)
        if (ally.set.moves.some(m => ["Trick Room", "Tailwind", "Swords Dance", "Calm Mind", "Dragon Dance", "Nasty Plot", "Shell Smash"].includes(m))) score += 30;
        // High value if ally is threatened
        const allyThreat = Math.max(...targets.filter(Boolean).map(t => estimateThreatLevel(t!, ally, field, oppSide)));
        if (allyThreat >= 80) score += 20;
      } else {
        score = 5;
      }
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Helping Hand - boost ally's attack
    if (moveName === "Helping Hand") {
      const ally = allies.find(a => a && !a.isFainted);
      if (ally) {
        score = 35;
        // Check if Helping Hand pushes ally to a KO
        for (const opp of targets) {
          if (!opp || opp.isFainted) continue;
          // Rough check: if ally deals 60-99% without help, helping hand makes it a KO
          for (const allyMove of ally.set.moves) {
            const am = getMove(allyMove);
            if (!am || am.category === "status") continue;
            const atk: DamageCalcPokemon = {
              baseStats: ally.effectiveBaseStats, sp: ally.set.sp,
              nature: ally.set.nature as NatureName, types: ally.types,
              ability: ally.ability, item: ally.item,
              atkStages: ally.boosts.attack, spAtkStages: ally.boosts.spAtk,
              isBurned: ally.status === "burn",
              currentHPPercent: (ally.currentHP / ally.maxHP) * 100,
            };
            const def: DamageCalcTarget = {
              baseStats: opp.effectiveBaseStats, sp: opp.set.sp,
              nature: opp.set.nature as NatureName, types: opp.types,
              ability: opp.ability, item: opp.item,
              defStages: opp.boosts.defense, spDefStages: opp.boosts.spDef,
            };
            const res = calculateDamage(atk, def, allyMove, options);
            const percentVsCurrentHP = (res.damage[0] / opp.currentHP) * 100;
            // Helping Hand is 1.5x - if base damage is 60-99% of remaining HP, it secures the KO
            if (percentVsCurrentHP >= 55 && percentVsCurrentHP < 100) {
              score += 35;
              break;
            }
          }
        }
      } else {
        score = 3;
      }
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Will-O-Wisp - weaken physical attackers
    if (moveName === "Will-O-Wisp" || moveName === "Thunder Wave" || moveName === "Nuzzle") {
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        if (!t || t.isFainted || t.status) continue;
        score = 35;
        if (moveName === "Will-O-Wisp") {
          // Very valuable vs physical attackers
          if (t.effectiveBaseStats.attack > t.effectiveBaseStats.spAtk) score += 25;
          // Don't burn Fire types
          if (t.types.includes("fire")) { score = 0; choices.push({ moveIndex: 0, moveName, targetSlot: i, score }); continue; }
        }
        if (moveName === "Thunder Wave" || moveName === "Nuzzle") {
          // Valuable vs fast threats
          if (t.stats.speed > user.stats.speed) score += 20;
          // Don't paralyze Electric or Ground types
          if (t.types.includes("electric") || t.types.includes("ground")) { score = 0; choices.push({ moveIndex: 0, moveName, targetSlot: i, score }); continue; }
        }
        choices.push({ moveIndex: 0, moveName, targetSlot: i, score });
      }
      return choices;
    }
    
    // Self-boosting moves (Swords Dance, Calm Mind, Dragon Dance, etc.)
    if (move.selfBoost) {
      score = 40;
      // More valuable with redirect support
      const redirectAlly = allies.find(a => a && !a.isFainted && a.set.moves.some(m => ["Follow Me", "Rage Powder"].includes(m)));
      if (redirectAlly) score += 20;
      // Less valuable when low HP
      if (user.currentHP < user.maxHP * 0.5) score -= 25;
      // Less valuable if already boosted
      const currentBoost = Math.max(user.boosts.attack, user.boosts.spAtk);
      if (currentBoost >= 2) score -= 20;
      // More valuable early in battle
      if (state.turn <= 2) score += 10;
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Screens (Light Screen, Reflect)
    if (moveName === "Light Screen" || moveName === "Reflect") {
      const mySide = userSide === 1 ? field.side1 : field.side2;
      const alreadyUp = moveName === "Light Screen" ? mySide.lightScreen > 0 : mySide.reflect > 0;
      score = alreadyUp ? 3 : 45;
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Encore - lock opponent into a move
    if (moveName === "Encore") {
      score = 30;
      choices.push({ moveIndex: 0, moveName, targetSlot: 0, score });
      return choices;
    }
    
    // Generic status moves
    if (move.secondary?.status) {
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        if (!t || t.isFainted || t.status) continue;
        score = 30;
        choices.push({ moveIndex: 0, moveName, targetSlot: i, score });
      }
      if (choices.length === 0) choices.push({ moveIndex: 0, moveName, targetSlot: 0, score: 5 });
      return choices;
    }
    
    // Other status moves fallback
    score = 20;
    choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
    return choices;
  }
  
  // ── DAMAGING MOVES ─────────────────────────────────────────────
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (!target || target.isFainted) continue;
    
    const attacker: DamageCalcPokemon = {
      baseStats: user.effectiveBaseStats,
      sp: user.set.sp,
      nature: user.set.nature as NatureName,
      types: user.types,
      ability: user.ability,
      item: user.item,
      atkStages: user.boosts.attack,
      spAtkStages: user.boosts.spAtk,
      isBurned: user.status === "burn",
      currentHPPercent: (user.currentHP / user.maxHP) * 100,
    };
    
    const defender: DamageCalcTarget = {
      baseStats: target.effectiveBaseStats,
      sp: target.set.sp,
      nature: target.set.nature as NatureName,
      types: target.types,
      ability: target.ability,
      item: target.item,
      defStages: target.boosts.defense,
      spDefStages: target.boosts.spDef,
    };
    
    const result = calculateDamage(attacker, defender, moveName, options);
    
    let score = 0;
    
    // Damage-based scoring with current HP awareness
    const percentOfCurrent = target.currentHP > 0 ? (result.damage[0] / target.currentHP) * 100 : 0;
    
    if (result.isOHKO || percentOfCurrent >= 100) {
      score = 110; // Securing a KO is top priority
    } else if (percentOfCurrent >= 80) {
      score = 85 + percentOfCurrent * 0.1; // Near-KO
    } else if (result.is2HKO) {
      score = 65 + result.percentHP[0] * 0.2;
    } else {
      score = result.percentHP[0] * 0.55;
    }
    
    // Priority move bonus: securing KOs on weakened mons
    if (move.priority > 0) {
      if (percentOfCurrent >= 100) score += 25; // Priority KO is extremely safe
      else if (target.currentHP < target.maxHP * 0.4) score += 15;
    }
    
    // Spread move bonus (hits both opponents in doubles)
    if (isSpreadMove(move)) {
      const otherTarget = targets[1 - i];
      if (otherTarget && !otherTarget.isFainted) {
        // Estimate combined damage value
        const otherDef: DamageCalcTarget = {
          baseStats: otherTarget.effectiveBaseStats, sp: otherTarget.set.sp,
          nature: otherTarget.set.nature as NatureName, types: otherTarget.types,
          ability: otherTarget.ability, item: otherTarget.item,
          defStages: otherTarget.boosts.defense, spDefStages: otherTarget.boosts.spDef,
        };
        const otherResult = calculateDamage(attacker, otherDef, moveName, options);
        score += otherResult.percentHP[0] * 0.35; // Add value from hitting second target
      }
      score += 8; // Small inherent bonus for spread pressure
      
      // PENALTY for allAdjacent moves (Earthquake, Surf) that hit ally
      if (move.target === "allAdjacent") {
        const allyMon = allies.find(a => a && !a.isFainted);
        if (allyMon) {
          const allyDef: DamageCalcTarget = {
            baseStats: allyMon.effectiveBaseStats, sp: allyMon.set.sp,
            nature: allyMon.set.nature as NatureName, types: allyMon.types,
            ability: allyMon.ability, item: allyMon.item,
            defStages: allyMon.boosts.defense, spDefStages: allyMon.boosts.spDef,
          };
          const allyDmg = calculateDamage(attacker, allyDef, moveName, options);
          const allyDmgPercent = allyDmg.percentHP[0];
          // Heavy penalty if it would KO the ally
          if (allyDmg.isOHKO || (allyDmg.damage[1] / allyMon.currentHP) >= 1.0) {
            score -= 80; // Don't KO your own ally!
          } else if (allyDmgPercent >= 40) {
            score -= 35; // Significant ally damage
          } else if (allyDmgPercent >= 20) {
            score -= 15; // Moderate ally damage
          }
          // Less penalty if ally is Protected
          if (allyMon.isProtected) score += 25;
        }
      }
    }
    
    // Super effective bonus (shows good attack selection)
    if (result.effectiveness >= 2) score += 12;
    if (result.effectiveness >= 4) score += 8; // 4x SE extra bonus
    
    // Immune = never use
    if (result.effectiveness === 0) score = -10;
    
    // Focus fire: bonus for targeting a weakened mon (can KO with combined attacks)
    if (target.currentHP < target.maxHP * 0.6) {
      score += 8; // Prefer to finish off weakened targets
    }
    
    // Coordinate with ally: if ally can KO this target, prefer the other target
    const ally = allies.find(a => a && !a.isFainted);
    if (ally && allyCanKO(ally, target, field, userSide) && !result.isOHKO) {
      // Ally handles this one - look at the other target (small penalty)
      score -= 10;
    }
    
    // Don't waste big moves on nearly dead mons (overkill penalty)
    if (result.isOHKO && target.currentHP < target.maxHP * 0.2 && move.basePower >= 100) {
      score -= 8; // Slight preference for efficient damage use
    }
    
    // Endgame: when behind, prioritize highest immediate damage
    if (isBehind && isEndgame) score += percentOfCurrent * 0.15;
    
    // Target selection: prefer KO-ing the bigger threat
    const targetThreat = estimateThreatLevel(target, user, field, oppSide);
    score += targetThreat * 0.08; // Small bias toward threatening targets
    
    // Accuracy penalty for low-accuracy moves
    if (move.accuracy > 0 && move.accuracy < 90) score -= (100 - move.accuracy) * 0.3;
    
    choices.push({ moveIndex: 0, moveName, targetSlot: i, score });
  }
  
  return choices;
}

function aiChooseAction(
  mon: BattlePokemon,
  sideIndex: 1 | 2,
  opponents: (BattlePokemon | null)[],
  allies: (BattlePokemon | null)[],
  field: FieldState,
  state: BattleState
): { moveName: string; targetSlot: number; switchOut?: boolean } {
  const allChoices: MoveChoice[] = [];
  
  // Evaluate each move
  for (const moveName of mon.set.moves) {
    // Can't use Fake Out after turn 1
    if (moveName === "Fake Out" && !mon.canFakeOut) continue;
    // Choice lock: can only use the locked move
    if (mon.choiceLockedMove && moveName !== mon.choiceLockedMove) continue;
    
    const moveChoices = evaluateMoveOption(mon, sideIndex, opponents, allies, moveName, field, state);
    allChoices.push(...moveChoices);
  }
  
  if (allChoices.length === 0) {
    // Struggle fallback
    return { moveName: mon.set.moves[0], targetSlot: 0 };
  }
  
  // Human-like variance: ±12 for score randomness (humans aren't perfect calculators)
  for (const c of allChoices) {
    c.score += (Math.random() - 0.5) * 24;
  }
  
  allChoices.sort((a, b) => b.score - a.score);
  const bestMoveScore = allChoices[0].score;
  
  // ── SWITCH EVALUATION ──────────────────────────────────────────────────
  // Like real VGC players, consider switching when:
  // 1. Palafin (Zero to Hero) needs to switch out to activate Hero Form
  // 2. Current mon has a terrible matchup and bench has better options
  const myTeam = sideIndex === 1 ? state.team1 : state.team2;
  const myActive = sideIndex === 1 ? state.active1 : state.active2;
  const bench = myTeam.filter(p =>
    p.isAlive && !p.isFainted && p !== myActive[0] && p !== myActive[1]
  );
  
  if (bench.length > 0) {
    let switchScore = -100; // Default: don't switch
    
    // Palafin Zero to Hero: MUST switch out to activate Hero Form
    if (mon.ability === "Zero to Hero" && !mon.hasSwitchedOut && !mon.hasTransformed) {
      // Palafin in Zero Form is USELESS (70 Atk). Switch out immediately.
      switchScore = 150; // Higher than any move score - this is mandatory VGC play
    }
    
    // Tactical switching: evaluate matchup quality
    if (switchScore < 0) {
      const oppSide: 1 | 2 = sideIndex === 1 ? 2 : 1;
      let maxIncomingDmg = 0;
      for (const opp of opponents) {
        if (!opp || opp.isFainted) continue;
        maxIncomingDmg = Math.max(maxIncomingDmg, estimateThreatLevel(opp, mon, field, oppSide));
      }
      // If threatened with >50% and our best move is mediocre, consider switching
      if (maxIncomingDmg >= 50 && bestMoveScore < 45) {
        switchScore = 40;
      }
      // If threatened with OHKO, strongly consider switching
      if (maxIncomingDmg >= 95 && bestMoveScore < 90) {
        switchScore = 55;
      }
      // If we can't do meaningful damage, consider repositioning
      if (bestMoveScore < 25) {
        switchScore = Math.max(switchScore, 28);
      }
      // Pivot for better type matchup if we have good bench options
      if (maxIncomingDmg >= 35 && bestMoveScore < 55) {
        // Check if bench has a significantly better matchup
        for (const candidate of bench) {
          let typeScore = 0;
          for (const opp of opponents) {
            if (!opp || opp.isFainted) continue;
            for (const type of candidate.types) {
              const eff = getMatchup(type, opp.types);
              if (eff < 1) typeScore += 8; // Resists their attacks
            }
            for (const oppType of opp.types) {
              const eff = getMatchup(oppType, candidate.types);
              if (eff > 1) typeScore -= 5;
            }
          }
          if (typeScore >= 8) { switchScore = Math.max(switchScore, 35); break; }
        }
      }
    }
    
    if (switchScore > bestMoveScore) {
      return { moveName: "", targetSlot: -1, switchOut: true };
    }
  }
  
  // Occasional suboptimal play (5% chance to pick 2nd-best option - humans misread sometimes)
  if (allChoices.length >= 2 && Math.random() < 0.05) {
    if (allChoices[0].score - allChoices[1].score < 20) {
      return { moveName: allChoices[1].moveName, targetSlot: allChoices[1].targetSlot };
    }
  }
  
  return { moveName: allChoices[0].moveName, targetSlot: allChoices[0].targetSlot };
}

// ── BATTLE SIMULATION ────────────────────────────────────────────────────────

function createInitialField(): FieldState {
  return {
    weather: null, weatherTurns: 0,
    terrain: null, terrainTurns: 0,
    trickRoom: false, trickRoomTurns: 0,
    side1: { tailwind: 0, reflect: 0, lightScreen: 0, auroraVeil: 0 },
    side2: { tailwind: 0, reflect: 0, lightScreen: 0, auroraVeil: 0 },
  };
}

function applySwitch(state: BattleState, sideIndex: 1 | 2, slot: 0 | 1): void {
  const team = sideIndex === 1 ? state.team1 : state.team2;
  const active = sideIndex === 1 ? state.active1 : state.active2;
  const opponents = sideIndex === 1 ? state.active2 : state.active1;
  const oppSide: 1 | 2 = sideIndex === 1 ? 2 : 1;
  
  // Handle Regenerator on switch-out (heal the mon leaving)
  const leaving = active[slot];
  if (leaving && leaving.isAlive && !leaving.isFainted && leaving.ability === "Regenerator") {
    leaving.currentHP = Math.min(leaving.maxHP, leaving.currentHP + Math.floor(leaving.maxHP / 3));
  }
  // Mark Palafin as having switched out (for Zero to Hero)
  if (leaving && leaving.isAlive && !leaving.isFainted && leaving.ability === "Zero to Hero") {
    leaving.hasSwitchedOut = true;
  }

  // Find benched alive Pokémon
  const bench = team.filter(p =>
    p.isAlive && !p.isFainted &&
    p !== active[0] && p !== active[1]
  );
  
  if (bench.length > 0) {
    // Intelligent bench selection: score each option
    let bestMon = bench[0];
    let bestScore = -Infinity;
    
    for (const candidate of bench) {
      let score = 0;
      
      // Type advantage over current opponents
      for (const opp of opponents) {
        if (!opp || opp.isFainted) continue;
        for (const type of candidate.types) {
          const eff = getMatchup(type, opp.types);
          if (eff > 1) score += 15;
          if (eff < 1) score -= 5;
        }
        for (const oppType of opp.types) {
          const eff = getMatchup(oppType, candidate.types);
          if (eff < 1) score += 10;
          if (eff > 1) score -= 8;
        }
      }
      
      // Intimidate is very valuable on switch-in
      if (candidate.ability === "Intimidate") score += 20;
      
      // Fake Out available = immediate pressure
      if (candidate.set.moves.includes("Fake Out")) score += 12;
      
      // Weather setter synergy
      const abilityEffect = getAbilityEffect(candidate.ability);
      if (abilityEffect?.setsWeather) score += 8;
      
      // Prefer mons with more HP remaining
      score += (candidate.currentHP / candidate.maxHP) * 15;
      
      // Prefer mons that match current speed control
      if (state.field.trickRoom && candidate.stats.speed < 70) score += 10;
      if (!state.field.trickRoom && candidate.stats.speed > 100) score += 5;
      
      // HUGE bonus for Palafin that has switched out and can now come back as Hero
      if (candidate.ability === "Zero to Hero" && candidate.hasSwitchedOut && !candidate.hasTransformed) {
        score += 50; // Top priority: bring back the Hero nuke
      }
      
      if (score > bestScore) {
        bestScore = score;
        bestMon = candidate;
      }
    }
    
    const next = bestMon;
    active[slot] = next;
    next.canFakeOut = true;
    next.protectCount = 0;
    next.boosts = { attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };
    // Reset Choice lock on switch-in
    next.choiceLockedMove = null;
    // Reset Protean/Libero type change on switch-in
    next.hasChangedType = false;
    // Reset Stance Change to shield form on switch-in
    if (next.ability === "Stance Change") {
      applyStanceChange(next, "shield");
    }
    
    // Zero to Hero: transform to Hero Form on re-entry after switching out
    if (next.ability === "Zero to Hero" && next.hasSwitchedOut && !next.hasTransformed) {
      applyHeroTransform(next);
    }
    
    // On-entry abilities
    const entryAbility = getAbilityEffect(next.ability);
    if (entryAbility?.setsWeather) {
      state.field.weather = entryAbility.setsWeather;
      state.field.weatherTurns = 5;
    }
    if (entryAbility?.setsTerrain) {
      state.field.terrain = entryAbility.setsTerrain;
      state.field.terrainTurns = 5;
    }
    // Commander Surge: boost SpAtk on entry
    if (next.ability === "Commander Surge") {
      next.boosts.spAtk = Math.min(6, next.boosts.spAtk + 1);
    }
    // Razor Plating: +1 Defense on entry
    if (next.ability === "Razor Plating") {
      next.boosts.defense = Math.min(6, next.boosts.defense + 1);
    }
    if (next.ability === "Intimidate") {
      for (const opp of opponents) {
        if (opp && opp.isAlive) {
          if (opp.ability === "Mirror Armor") {
            // Mirror Armor bounces the Attack drop back to the Intimidator
            next.boosts.attack = Math.max(-6, next.boosts.attack - 1);
          } else if (!isIntimidateBlocked(opp)) {
            opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
            // Competitive/Defiant trigger on ANY stat drop
            if (opp.ability === "Competitive") {
              opp.boosts.spAtk = Math.min(6, opp.boosts.spAtk + 2);
            }
            if (opp.ability === "Defiant") {
              opp.boosts.attack = Math.min(6, opp.boosts.attack + 2);
            }
          }
        }
      }
    }
    // Supreme Commander: boost ally's highest stat
    if (next.ability === "Supreme Commander") {
      const ally = active[slot === 0 ? 1 : 0];
      if (ally && ally.isAlive && !ally.isFainted) {
        const highest = Object.entries(ally.stats)
          .filter(([k]) => k !== "hp")
          .sort(([,a], [,b]) => (b as number) - (a as number))[0];
        if (highest) {
          const statName = highest[0] === "spAtk" ? "spAtk" : highest[0] === "spDef" ? "spDef" : highest[0];
          if (statName in ally.boosts) {
            (ally.boosts as Record<string, number>)[statName] = Math.min(6, (ally.boosts as Record<string, number>)[statName] + 1);
          }
        }
      }
    }
    // Imposter (Ditto): transform into opponent on switch-in
    if (next.ability === "Imposter") {
      const oppTarget = opponents.find(o => o && !o.isFainted);
      if (oppTarget) applyImposterTransform(next, oppTarget);
    }
  } else {
    active[slot] = null;
  }
}

function isIntimidateBlocked(mon: BattlePokemon): boolean {
  return ["Inner Focus", "Clear Body", "Oblivious", "Own Tempo", "Scrappy", "Mirror Armor"].includes(mon.ability);
}

function applyEndOfTurn(state: BattleState): void {
  // Decrement field effects
  if (state.field.weatherTurns > 0) {
    state.field.weatherTurns--;
    if (state.field.weatherTurns === 0) state.field.weather = null;
  }
  if (state.field.trickRoomTurns > 0) {
    state.field.trickRoomTurns--;
    if (state.field.trickRoomTurns === 0) state.field.trickRoom = false;
  }
  if (state.field.terrainTurns > 0) {
    state.field.terrainTurns--;
    if (state.field.terrainTurns === 0) state.field.terrain = null;
  }
  
  const sides = [
    { side: state.field.side1, active: state.active1 },
    { side: state.field.side2, active: state.active2 },
  ];
  
  for (const { side, active } of sides) {
    if (side.tailwind > 0) side.tailwind--;
    if (side.reflect > 0) side.reflect--;
    if (side.lightScreen > 0) side.lightScreen--;
    if (side.auroraVeil > 0) side.auroraVeil--;
    
    // Status damage (Magic Guard immune to indirect damage)
    for (const mon of active) {
      if (!mon || mon.isFainted) continue;
      
      if (mon.status === "burn" && mon.ability !== "Magic Guard") {
        mon.currentHP -= Math.floor(mon.maxHP / 16);
      }
      if (mon.status === "poison" && mon.ability !== "Magic Guard") {
        mon.currentHP -= Math.floor(mon.maxHP / 8);
      }
      
      // Leftovers
      if (mon.item === "Leftovers") {
        mon.currentHP = Math.min(mon.maxHP, mon.currentHP + Math.floor(mon.maxHP / 16));
      }
      
      // Sand damage
      if (state.field.weather === "sand") {
        if (!mon.types.includes("rock") && !mon.types.includes("ground") &&
            !mon.types.includes("steel") && mon.ability !== "Sand Force" &&
            mon.ability !== "Sand Rush" && mon.ability !== "Sand Veil" &&
            mon.ability !== "Magic Guard" && mon.ability !== "Overcoat" &&
            mon.ability !== "Sky High") {
          mon.currentHP -= Math.floor(mon.maxHP / 16);
        }
      }
      
      // Grassy Terrain healing (grounded mons heal 1/16 per turn)
      if (state.field.terrain === "grassy" && mon.ability !== "Levitate" &&
          !mon.types.includes("flying") && mon.ability !== "Sky High") {
        mon.currentHP = Math.min(mon.maxHP, mon.currentHP + Math.floor(mon.maxHP / 16));
      }
      
      // Check faint
      if (mon.currentHP <= 0) {
        mon.currentHP = 0;
        mon.isAlive = false;
        mon.isFainted = true;
      }
    }
  }
}

function executeMove(
  user: BattlePokemon,
  moveName: string,
  target: BattlePokemon | null,
  allies: (BattlePokemon | null)[],
  opponents: (BattlePokemon | null)[],
  state: BattleState,
  userSide: 1 | 2
): void {
  if (user.isFainted || !user.isAlive) return;
  
  const move = getMove(moveName);
  if (!move) return;

  // ── CHOICE LOCK: lock into first move used with Choice item ────────────
  if (!user.itemConsumed && (user.item === "Choice Scarf" || user.item === "Choice Band" || user.item === "Choice Specs")) {
    if (!user.choiceLockedMove) {
      user.choiceLockedMove = moveName;
    }
  }
  
  // ── MEGA EVOLUTION: triggers before first attacking move ────────────────
  // (Moved to start-of-turn in simulateBattle/simulateBattleWithLog)

  // ── STANCE CHANGE (Aegislash): Blade before attacking, Shield before King's Shield ──
  if (user.ability === "Stance Change") {
    if (move.category !== "status") {
      applyStanceChange(user, "blade");
    } else if (moveName === "King's Shield") {
      applyStanceChange(user, "shield");
    }
  }

  // ── PROTEAN / LIBERO: change type to match move (once per switch-in) ──
  if ((user.ability === "Protean" || user.ability === "Libero") && !user.hasChangedType) {
    user.hasChangedType = true;
    user.types = [move.type as PokemonType];
  }

  // Paralysis check
  if (user.status === "paralysis" && Math.random() < 0.25) return;
  
  // Sleep check
  if (user.status === "sleep") {
    if (Math.random() < 0.33) {
      user.status = null; // Wake up
    }
    return;
  }
  
  // Protect check (King's Shield: also lowers Attack of contact attackers)
  if (move.flags.protect) {
    const successRate = Math.pow(1 / 3, user.protectCount);
    if (Math.random() < successRate) {
      user.protectCount++;
      user.isProtected = true;
      user.protectMoveName = moveName;
      return;
    }
    user.protectCount = 0;
    return;
  }
  
  user.protectCount = 0;
  
  // Status moves
  if (move.category === "status") {
    // Tailwind
    if (moveName === "Tailwind") {
      const side = userSide === 1 ? state.field.side1 : state.field.side2;
      side.tailwind = 4;
      // Wind Rider: Attack +1 for allies with Wind Rider when Tailwind is set
      const myActive = userSide === 1 ? state.active1 : state.active2;
      for (const ally of myActive) {
        if (ally && !ally.isFainted && ally.ability === "Wind Rider") {
          ally.boosts.attack = Math.min(6, ally.boosts.attack + 1);
        }
      }
      return;
    }
    // Trick Room
    if (moveName === "Trick Room") {
      state.field.trickRoom = !state.field.trickRoom;
      state.field.trickRoomTurns = state.field.trickRoom ? 5 : 0;
      return;
    }
    // Self-boosting
    if (move.selfBoost) {
      for (const [stat, stages] of Object.entries(move.selfBoost)) {
        if (stat in user.boosts) {
          (user.boosts as Record<string, number>)[stat] = Math.max(-6, Math.min(6,
            (user.boosts as Record<string, number>)[stat] + (stages as number)
          ));
        }
      }
      return;
    }
    // Status application
    if (move.secondary?.status && target && !target.isFainted && !target.status) {
      // Check accuracy
      if (move.accuracy > 0 && Math.random() * 100 > move.accuracy) return;
      target.status = move.secondary.status;
      return;
    }
    // Light Screen / Reflect
    if (moveName === "Light Screen") {
      (userSide === 1 ? state.field.side1 : state.field.side2).lightScreen = 5;
    }
    if (moveName === "Reflect") {
      (userSide === 1 ? state.field.side1 : state.field.side2).reflect = 5;
    }
    return;
  }
  
  // Damaging moves
  const targets: BattlePokemon[] = [];
  
  if (isSpreadMove(move)) {
    // Hit all opponents
    for (const opp of opponents) {
      if (opp && !opp.isFainted) targets.push(opp);
    }
    // allAdjacent also hits ally
    if (move.target === "allAdjacent") {
      for (const ally of allies) {
        if (ally && !ally.isFainted && ally !== user) targets.push(ally);
      }
    }
  } else if (target && !target.isFainted) {
    targets.push(target);
  } else {
    // Retarget: original target fainted mid-turn - redirect to remaining opponent (VGC rule)
    for (const opp of opponents) {
      if (opp && !opp.isFainted && opp !== target) {
        targets.push(opp);
        break;
      }
    }
  }
  
  user.lastMoveMissed = false;
  user.lastMoveImmune = false;
  for (const t of targets) {
    // Protected targets block all damage (except Drill Force pierce)
    if (t.isProtected) {
      // King's Shield: lower attacker's Attack by 1 on contact
      if (t.protectMoveName === "King's Shield" && move.flags.contact) {
        user.boosts.attack = Math.max(-6, user.boosts.attack - 1);
      }
      if (user.ability === "Drill Force" && (move.type === "ground" || move.type === "steel")) {
        // Drill Force pierces Protect for 25% damage - continue but reduce damage later
      } else {
        continue;
      }
    }
    
    // Bulletproof: immune to bullet/bomb moves
    if (t.ability === "Bulletproof" && move.flags?.bullet && user.ability !== "Mold Breaker") {
      user.lastMoveImmune = true;
      continue;
    }

    // Wind Rider: immune to wind moves, boosts Attack
    if (t.ability === "Wind Rider" && move.flags?.wind && user.ability !== "Mold Breaker") {
      t.boosts.attack = Math.min(6, t.boosts.attack + 1);
      user.lastMoveImmune = true;
      continue;
    }

    // Type immunity from abilities (Water Absorb, Volt Absorb, Lightning Rod, etc.)
    const targetImmunity = getTypeImmunity(t.ability);
    if (targetImmunity && move.type === targetImmunity && user.ability !== "Mold Breaker") {
      // Absorb abilities heal instead of dealing damage
      if (t.ability === "Water Absorb" || t.ability === "Volt Absorb") {
        t.currentHP = Math.min(t.maxHP, t.currentHP + Math.floor(t.maxHP * 0.25));
      }
      if (t.ability === "Flash Fire") {
        // Flash Fire activated - boost tracked via flag (simplified: +50% fire damage boost)
      }
      // Motor Drive: speed boost
      if (t.ability === "Motor Drive") {
        t.boosts.speed = Math.min(6, t.boosts.speed + 1);
      }
      // Lightning Rod / Storm Drain: SpAtk boost
      if (t.ability === "Lightning Rod" || t.ability === "Storm Drain") {
        t.boosts.spAtk = Math.min(6, t.boosts.spAtk + 1);
      }
      // Sap Sipper: Atk boost
      if (t.ability === "Sap Sipper") {
        t.boosts.attack = Math.min(6, t.boosts.attack + 1);
      }
      user.lastMoveImmune = true;
      continue; // Move is fully absorbed
    }
    
    // Accuracy check (weather bypass: Blizzard in snow, Thunder/Hurricane in rain)
    const weatherBypass = (move.name === "Blizzard" && state.field.weather === "snow")
      || ((move.name === "Thunder" || move.name === "Hurricane") && state.field.weather === "rain");
    if (!weatherBypass && move.accuracy > 0 && Math.random() * 100 > move.accuracy) {
      user.lastMoveMissed = true;
      continue;
    }
    
    // Focus Sash precheck
    const hadFocusSash = t.item === "Focus Sash" && !t.itemConsumed && t.currentHP === t.maxHP;
    // Sturdy precheck (works like Focus Sash at full HP)
    const hadSturdy = t.ability === "Sturdy" && t.currentHP === t.maxHP;
    
    // Calculate damage
    const options: DamageCalcOptions = {
      weather: state.field.weather as DamageCalcOptions["weather"],
      isDoubles: true,
      reflect: (userSide === 1 ? state.field.side2 : state.field.side1).reflect > 0,
      lightScreen: (userSide === 1 ? state.field.side2 : state.field.side1).lightScreen > 0,
      isCrit: Math.random() < 0.0625,
    };
    
    // Unaware: ignore opponent's stat boosts
    const atkStages = t.ability === "Unaware" ? 0 : user.boosts.attack;
    const spAtkStages = t.ability === "Unaware" ? 0 : user.boosts.spAtk;
    const defStages = user.ability === "Unaware" ? 0 : t.boosts.defense;
    const spDefStages = user.ability === "Unaware" ? 0 : t.boosts.spDef;

    const attacker: DamageCalcPokemon = {
      baseStats: user.effectiveBaseStats,
      sp: user.set.sp,
      nature: user.set.nature as NatureName,
      types: user.types,
      ability: user.ability,
      item: user.item,
      atkStages,
      spAtkStages,
      isBurned: user.status === "burn",
      currentHPPercent: (user.currentHP / user.maxHP) * 100,
    };
    
    const defender: DamageCalcTarget = {
      baseStats: t.effectiveBaseStats,
      sp: t.set.sp,
      nature: t.set.nature as NatureName,
      types: t.types,
      ability: t.ability,
      item: t.item,
      defStages,
      spDefStages,
    };
    
    const result = calculateDamage(attacker, defender, moveName, options);

    // Type/ability immunity: skip this target entirely (0 damage)
    if (result.effectiveness === 0) {
      user.lastMoveImmune = true;
      continue;
    }
    
    // Apply damage with random roll between min and max
    let damage = result.damage[0] + Math.floor(Math.random() * (result.damage[1] - result.damage[0] + 1));
    damage = Math.max(1, damage);
    
    // ── DISGUISE (Mimikyu): block first hit, take 1/8 max HP chip ──
    if (t.disguiseIntact) {
      breakDisguise(t);
      continue; // Hit was fully blocked by Disguise
    }
    
    // ── ILLUSION (Zoroark): reveal true form when taking damage ──
    if (t.illusionActive) {
      breakIllusion(t);
    }
    
    // Friend Guard: reduce damage by 25% if ally has Friend Guard
    const defenderSide = state.active1.includes(t) ? state.active1 : state.active2;
    const friendGuardAlly = defenderSide.find(a => a && a !== t && !a.isFainted && a.ability === "Friend Guard");
    if (friendGuardAlly) {
      damage = Math.floor(damage * 0.75);
    }
    
    // Thick Fat: halve Fire/Ice damage
    if (t.ability === "Thick Fat" && (move.type === "fire" || move.type === "ice")) {
      damage = Math.floor(damage * 0.5);
    }
    
    // Prism Armor: reduce super-effective damage by 25%
    if (t.ability === "Prism Armor" && result.effectiveness >= 2) {
      damage = Math.floor(damage * 0.75);
    }
    
    // Multiscale / Shadow Shield: halve damage at full HP
    if ((t.ability === "Multiscale" || t.ability === "Shadow Shield") && t.currentHP === t.maxHP) {
      damage = Math.floor(damage * 0.5);
    }
    
    // Drill Force through Protect: only 25% damage
    if (t.isProtected && user.ability === "Drill Force") {
      damage = Math.floor(damage * 0.25);
    }
    
    // Parental Bond: hit twice (second hit at 25% power)
    if (user.ability === "Parental Bond" && !isSpreadMove(move)) {
      const secondHit = Math.max(1, Math.floor(damage * 0.25));
      damage += secondHit;
    }
    
    // Guts: 1.5x damage when user has status (applied as post-multiplier)
    if (user.ability === "Guts" && user.status && move.category === "physical") {
      damage = Math.floor(damage * 1.5);
    }
    
    t.currentHP -= damage;
    
    // Focus Sash
    if (hadFocusSash && t.currentHP <= 0) {
      t.currentHP = 1;
      t.itemConsumed = true;
    }
    
    // Sturdy (like Focus Sash at full HP)
    if (hadSturdy && t.currentHP <= 0) {
      t.currentHP = 1;
    }
    
    // Sitrus Berry
    if (t.item === "Sitrus Berry" && !t.itemConsumed && t.currentHP <= t.maxHP * 0.5 && t.currentHP > 0) {
      t.currentHP += Math.floor(t.maxHP * 0.25);
      t.itemConsumed = true;
    }
    
    // Weakness Policy
    if (t.item === "Weakness Policy" && !t.itemConsumed && result.effectiveness >= 2 && t.currentHP > 0) {
      t.boosts.attack = Math.min(6, t.boosts.attack + 2);
      t.boosts.spAtk = Math.min(6, t.boosts.spAtk + 2);
      t.itemConsumed = true;
    }
    
    // Life Orb recoil - applied once per attack, NOT per target
    // (moved below after targets loop)
    
    // Recoil
    if (move.flags.recoil) {
      user.currentHP -= Math.floor(damage * (move.flags.recoil / 100));
    }
    
    // Drain
    if (move.flags.drain) {
      user.currentHP = Math.min(user.maxHP, user.currentHP + Math.floor(damage * (move.flags.drain / 100)));
    }
    
    // Weak Armor: when hit by physical move, -1 Def, +2 Speed
    if (t.ability === "Weak Armor" && move.category === "physical" && t.currentHP > 0) {
      t.boosts.defense = Math.max(-6, t.boosts.defense - 1);
      t.boosts.speed = Math.min(6, t.boosts.speed + 2);
    }

    // Secondary effects
    if (move.secondary && Math.random() * 100 < move.secondary.chance) {
      if (move.secondary.status && !t.status && t.currentHP > 0) {
        t.status = move.secondary.status;
      }
      if (move.secondary.volatileStatus === "flinch") {
        if (!["Inner Focus", "Shield Dust", "Own Tempo"].includes(t.ability)) {
          t.hasMoved = true; // Simplified: prevent action
        }
      }
      if (move.secondary.boosts && t.currentHP > 0) {
        const boostTarget = move.secondary.self ? user : t;
        for (const [stat, stages] of Object.entries(move.secondary.boosts)) {
          if (stat in boostTarget.boosts) {
            // Contrary: reverse stat changes on the target
            const contraryMult = boostTarget.ability === "Contrary" ? -1 : 1;
            (boostTarget.boosts as Record<string, number>)[stat] = Math.max(-6, Math.min(6,
              (boostTarget.boosts as Record<string, number>)[stat] + (stages as number) * contraryMult
            ));
          }
        }
      }
    }
    
    // Self boosts from move
    if (move.selfBoost) {
      // Contrary: reverse self-boosts
      const contraryMult = user.ability === "Contrary" ? -1 : 1;
      for (const [stat, stages] of Object.entries(move.selfBoost)) {
        if (stat in user.boosts) {
          (user.boosts as Record<string, number>)[stat] = Math.max(-6, Math.min(6,
            (user.boosts as Record<string, number>)[stat] + (stages as number) * contraryMult
          ));
        }
      }
    }
    
    // Rough Skin / Iron Barbs
    if (move.flags.contact && (t.ability === "Rough Skin" || t.ability === "Iron Barbs") && t.currentHP > 0) {
      user.currentHP -= Math.floor(user.maxHP / 8);
    }
    
    // Rocky Helmet
    if (move.flags.contact && t.item === "Rocky Helmet" && t.currentHP > 0) {
      user.currentHP -= Math.floor(user.maxHP / 6);
    }
    
    // Check faints
    if (t.currentHP <= 0) {
      t.currentHP = 0;
      t.isAlive = false;
      t.isFainted = true;
      
      // Moxie
      if (user.ability === "Moxie") {
        user.boosts.attack = Math.min(6, user.boosts.attack + 1);
      }
      // Volt Rush: speed +1 after KO
      if (user.ability === "Volt Rush") {
        user.boosts.speed = Math.min(6, user.boosts.speed + 1);
      }
      // Beast Boost (simplified: boost highest stat)
      if (user.ability === "Beast Boost") {
        const highest = Object.entries(user.stats)
          .filter(([k]) => k !== "hp")
          .sort(([,a], [,b]) => (b as number) - (a as number))[0];
        if (highest) {
          const statName = highest[0];
          if (statName in user.boosts) {
            (user.boosts as Record<string, number>)[statName] = Math.min(6, (user.boosts as Record<string, number>)[statName] + 1);
          }
        }
      }
    }
    if (user.currentHP <= 0) {
      user.currentHP = 0;
      user.isAlive = false;
      user.isFainted = true;
    }
  }
  
  // Life Orb recoil - once per attack (after all targets processed)
  if (user.item === "Life Orb" && user.ability !== "Sheer Force" && targets.length > 0) {
    user.currentHP -= Math.floor(user.maxHP / 10);
  }
  
  // Check user faint from recoil/Life Orb
  if (user.currentHP <= 0) {
    user.currentHP = 0;
    user.isAlive = false;
    user.isFainted = true;
  }
  
  // Fake Out can only be used once
  if (moveName === "Fake Out") user.canFakeOut = false;
}

/** Randomly pick 4 indices from a team of up to 6 */
function pick4(teamLen: number): number[] {
  const indices = Array.from({ length: teamLen }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, Math.min(4, teamLen));
}

/** Intelligently pick 4 Pokémon and order leads smartly (VGC team preview) */
function smartPick4(
  pokemon: ChampionsPokemon[],
  sets: CommonSet[],
  oppPokemon: ChampionsPokemon[]
): number[] {
  if (pokemon.length <= 4) return Array.from({ length: pokemon.length }, (_, i) => i);
  
  // Score each pokemon's value against the opposing team
  const scores: { idx: number; score: number; isLead: boolean; hasFakeOut: boolean; hasSpeedControl: boolean }[] = [];
  
  for (let i = 0; i < pokemon.length; i++) {
    const p = pokemon[i];
    const s = sets[i];
    let score = 50; // Base value
    
    // Type coverage vs opponent team
    for (const opp of oppPokemon) {
      // Offensive coverage
      for (const pType of p.types) {
        const eff = getMatchup(pType, opp.types);
        if (eff > 1) score += 6;
      }
      // Defensive resilience
      for (const oType of opp.types) {
        const eff = getMatchup(oType, p.types);
        if (eff < 1) score += 3;
      }
    }
    
    const hasFakeOut = s.moves.includes("Fake Out");
    const hasSpeedControl = s.moves.includes("Tailwind") || s.moves.includes("Trick Room");
    const isWeather = ["Drought", "Drizzle", "Sand Stream", "Snow Warning"].includes(s.ability);
    const isIntimidate = s.ability === "Intimidate";
    
    // VGC lead qualities
    if (hasFakeOut) score += 15;
    if (hasSpeedControl) score += 12;
    if (isWeather) score += 18;
    if (isIntimidate) score += 10;
    
    // Mega stones are often brought
    if (isMegaStoneItem(s.item)) score += 10;
    
    scores.push({ idx: i, score, isLead: hasFakeOut || hasSpeedControl || isWeather, hasFakeOut, hasSpeedControl });
  }
  
  // Sort by score and take top 4
  scores.sort((a, b) => b.score - a.score);
  const selected = scores.slice(0, 4);
  
  // Order: leads first (Fake Out > Speed Control > Weather > others)
  selected.sort((a, b) => {
    const aLead = (a.hasFakeOut ? 4 : 0) + (a.hasSpeedControl ? 3 : 0) + (a.isLead ? 2 : 0);
    const bLead = (b.hasFakeOut ? 4 : 0) + (b.hasSpeedControl ? 3 : 0) + (b.isLead ? 2 : 0);
    return bLead - aLead; // Leads first
  });
  
  return selected.map(s => s.idx);
}

/** Run a single simulated battle between two teams */
export function simulateBattle(
  team1Pokemon: ChampionsPokemon[],
  team1Sets: CommonSet[],
  team2Pokemon: ChampionsPokemon[],
  team2Sets: CommonSet[]
): { winner: 1 | 2; turnsPlayed: number; team1Remaining: number; team2Remaining: number } {
  // Smart pick 4 from 6 (VGC team preview - intelligent selection)
  const idx1 = smartPick4(team1Pokemon, team1Sets, team2Pokemon);
  const idx2 = smartPick4(team2Pokemon, team2Sets, team1Pokemon);
  const team1Picked = idx1.map(j => ({ pokemon: team1Pokemon[j], set: team1Sets[j] }));
  const team2Picked = idx2.map(j => ({ pokemon: team2Pokemon[j], set: team2Sets[j] }));
  const bt1 = idx1.map((i, k) => createBattlePokemon(team1Pokemon[i], team1Sets[i], team1Picked));
  const bt2 = idx2.map((i, k) => createBattlePokemon(team2Pokemon[i], team2Sets[i], team2Picked));
  
  const state: BattleState = {
    team1: bt1,
    team2: bt2,
    active1: [bt1[0] || null, bt1[1] || null],
    active2: [bt2[0] || null, bt2[1] || null],
    field: createInitialField(),
    turn: 0,
    winner: null,
  };
  
  // Apply entry abilities - slower weather setter wins (triggers last, like real VGC)
  const entryMons = [...state.active1, ...state.active2].filter(Boolean) as BattlePokemon[];
  const weatherSetters = entryMons
    .filter(m => { const e = getAbilityEffect(m.ability); return e?.setsWeather; })
    .sort((a, b) => b.stats.speed - a.stats.speed); // Fastest first, slowest last (wins)
  for (const mon of weatherSetters) {
    const abilityEffect = getAbilityEffect(mon.ability);
    if (abilityEffect?.setsWeather) {
      state.field.weather = abilityEffect.setsWeather;
      state.field.weatherTurns = 5;
    }
  }
  // Terrain setters on entry
  const terrainSetters = entryMons
    .filter(m => { const e = getAbilityEffect(m.ability); return e?.setsTerrain; })
    .sort((a, b) => b.stats.speed - a.stats.speed);
  for (const mon of terrainSetters) {
    const abilityEffect = getAbilityEffect(mon.ability);
    if (abilityEffect?.setsTerrain) {
      state.field.terrain = abilityEffect.setsTerrain;
      state.field.terrainTurns = 5;
    }
  }
  // Imposter on entry (must happen BEFORE Intimidate so copied Intimidate can trigger)
  for (let s = 0; s < 2; s++) {
    const active = s === 0 ? state.active1 : state.active2;
    const opponents = s === 0 ? state.active2 : state.active1;
    for (const mon of active) {
      if (mon?.ability === "Imposter") {
        const oppTarget = opponents.find(o => o && !o.isFainted);
        if (oppTarget) applyImposterTransform(mon, oppTarget);
      }
    }
  }
  // Intimidate on entry
  for (let s = 0; s < 2; s++) {
    const active = s === 0 ? state.active1 : state.active2;
    const opponents = s === 0 ? state.active2 : state.active1;
    for (const mon of active) {
      if (mon?.ability === "Intimidate") {
        for (const opp of opponents) {
          if (!opp) continue;
          if (opp.ability === "Mirror Armor") {
            mon.boosts.attack = Math.max(-6, mon.boosts.attack - 1);
          } else if (!isIntimidateBlocked(opp)) {
            opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
            if (opp.ability === "Competitive") opp.boosts.spAtk = Math.min(6, opp.boosts.spAtk + 2);
            if (opp.ability === "Defiant") opp.boosts.attack = Math.min(6, opp.boosts.attack + 2);
          }
        }
      }
      // Commander Surge: +1 SpAtk on entry
      if (mon?.ability === "Commander Surge") {
        mon.boosts.spAtk = Math.min(6, mon.boosts.spAtk + 1);
      }
      // Razor Plating: +1 Defense on entry
      if (mon?.ability === "Razor Plating") {
        mon.boosts.defense = Math.min(6, mon.boosts.defense + 1);
      }
    }
  }
  
  const MAX_TURNS = 50;
  
  while (state.turn < MAX_TURNS && !state.winner) {
    state.turn++;
    
    // Collect actions
    interface TurnAction {
      mon: BattlePokemon;
      moveName: string;
      targetSlot: number;
      priority: number;
      speed: number;
      sideIndex: 1 | 2;
      switchOut?: boolean;
    }
    
    const actions: TurnAction[] = [];
    
    for (const [mon, sideIndex, opponents, allies] of [
      [state.active1[0], 1, state.active2, [state.active1[1]]],
      [state.active1[1], 1, state.active2, [state.active1[0]]],
      [state.active2[0], 2, state.active1, [state.active2[1]]],
      [state.active2[1], 2, state.active1, [state.active2[0]]],
    ] as [BattlePokemon | null, 1 | 2, (BattlePokemon | null)[], (BattlePokemon | null)[]][]) {
      if (!mon || mon.isFainted) continue;
      
      const choice = aiChooseAction(mon, sideIndex, opponents, allies, state.field, state);
      
      if (choice.switchOut) {
        // Switches happen at max priority (like in VGC - switches go before moves)
        actions.push({
          mon, moveName: "", targetSlot: -1,
          priority: 100, speed: getActualSpeed(mon, state.field, sideIndex),
          sideIndex, switchOut: true,
        });
        continue;
      }
      
      const move = getMove(choice.moveName);
      const priority = move?.priority ?? 0;
      
      // Prankster +1 priority for status
      let effectivePriority = priority;
      if (mon.ability === "Prankster" && move?.category === "status") {
        effectivePriority += 1;
      }
      // Gale Wings
      if (mon.ability === "Gale Wings" && move?.type === "flying" && mon.currentHP === mon.maxHP) {
        effectivePriority += 1;
      }
      
      actions.push({
        mon,
        moveName: choice.moveName,
        targetSlot: choice.targetSlot,
        priority: effectivePriority,
        speed: getActualSpeed(mon, state.field, sideIndex),
        sideIndex,
      });
    }

    // ── FAKE OUT DEDUPLICATION: prevent allies from double-targeting ──────
    for (const side of [1, 2] as const) {
      const sideActions = actions.filter(a => a.sideIndex === side && a.moveName === "Fake Out");
      if (sideActions.length === 2 && sideActions[0].targetSlot === sideActions[1].targetSlot) {
        const opps = side === 1 ? state.active2 : state.active1;
        const otherSlot = sideActions[1].targetSlot === 0 ? 1 : 0;
        if (opps[otherSlot] && !opps[otherSlot]!.isFainted) {
          sideActions[1].targetSlot = otherSlot;
        }
      }
    }
    
    // Sort by priority (desc), then speed (desc, or asc in Trick Room)
    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });
    
    // ── MEGA EVOLUTION PHASE: before any moves execute ──────────────────
    for (const action of actions) {
      if (action.mon.isFainted || action.switchOut) continue;
      if (action.mon.canMegaEvolve && !action.mon.hasMegaEvolved) {
        const myTeam = action.sideIndex === 1 ? state.team1 : state.team2;
        const teamAlreadyMega = myTeam.some(p => p !== action.mon && p.hasMegaEvolved);
        if (!teamAlreadyMega) {
          applyMegaEvolution(action.mon);
          const opponents = action.sideIndex === 1 ? state.active2 : state.active1;
          const newAbilityEffect = getAbilityEffect(action.mon.ability);
          if (newAbilityEffect?.setsWeather) {
            state.field.weather = newAbilityEffect.setsWeather;
            state.field.weatherTurns = 5;
          }
          if (newAbilityEffect?.setsTerrain) {
            state.field.terrain = newAbilityEffect.setsTerrain;
            state.field.terrainTurns = 5;
          }
          if (action.mon.ability === "Intimidate") {
            for (const opp of opponents) {
              if (opp && opp.isAlive && !opp.isFainted && !isIntimidateBlocked(opp)) {
                opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
                if (opp.ability === "Competitive") opp.boosts.spAtk = Math.min(6, opp.boosts.spAtk + 2);
                if (opp.ability === "Defiant") opp.boosts.attack = Math.min(6, opp.boosts.attack + 2);
              }
            }
          }
        }
      }
    }
    
    // Re-sort after mega evolutions (speed may have changed)
    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });
    
    // Execute actions
    for (const action of actions) {
      if (action.mon.isFainted) continue;
      // Flinch check: Fake Out's flinch sets hasMoved = true, preventing action
      if (action.mon.hasMoved && !action.switchOut) continue;
      
      // Armor Tail: block priority moves targeting the side with Armor Tail
      if (!action.switchOut && action.priority > 0) {
        const targetSide = action.sideIndex === 1 ? state.active2 : state.active1;
        const hasArmorTail = targetSide.some(p => p && !p.isFainted && p.ability === "Armor Tail");
        if (hasArmorTail) continue; // Priority move blocked
      }
      
      // Handle switch-out actions
      if (action.switchOut) {
        const active = action.sideIndex === 1 ? state.active1 : state.active2;
        const slot = active.indexOf(action.mon) as 0 | 1;
        if (slot >= 0) {
          applySwitch(state, action.sideIndex, slot);
        }
        continue;
      }
      
      const opponents = action.sideIndex === 1 ? state.active2 : state.active1;
      const allies = action.sideIndex === 1 ? state.active1 : state.active2;
      const target = opponents[action.targetSlot] ?? null;
      
      executeMove(
        action.mon, action.moveName, target,
        allies.filter((a): a is BattlePokemon => a !== null && a !== action.mon),
        opponents.filter((a): a is BattlePokemon => a !== null),
        state, action.sideIndex
      );
    }
    
    // Replace fainted Pokémon
    for (const [sideIndex, active] of [[1, state.active1], [2, state.active2]] as [1 | 2, (BattlePokemon | null)[] & { length: 2 }][]) {
      for (let slot = 0; slot < 2; slot++) {
        if (!active[slot] || active[slot]!.isFainted) {
          applySwitch(state, sideIndex, slot as 0 | 1);
        }
      }
    }
    
    // End of turn effects
    applyEndOfTurn(state);
    
    // After end-of-turn faints, replace again
    for (const [sideIndex, active] of [[1, state.active1], [2, state.active2]] as [1 | 2, (BattlePokemon | null)[] & { length: 2 }][]) {
      for (let slot = 0; slot < 2; slot++) {
        if (active[slot]?.isFainted) {
          applySwitch(state, sideIndex, slot as 0 | 1);
        }
      }
    }
    
    // Check win condition
    const team1Alive = state.team1.filter(p => p.isAlive).length;
    const team2Alive = state.team2.filter(p => p.isAlive).length;
    
    if (team1Alive === 0 && team2Alive === 0) {
      state.winner = Math.random() < 0.5 ? 1 : 2; // True coin flip on mutual KO
    } else if (team1Alive === 0) {
      state.winner = 2;
    } else if (team2Alive === 0) {
      state.winner = 1;
    }
    
    // Reset turn flags
    for (const mon of [...state.team1, ...state.team2]) {
      mon.hasMoved = false;
      mon.isProtected = false;
      if (!mon.isFainted) mon.canFakeOut = false; // Only first turn
    }
  }
  
  // Timeout: team with more alive wins, tie-break by total HP%
  if (!state.winner) {
    const t1Alive = state.team1.filter(p => p.isAlive).length;
    const t2Alive = state.team2.filter(p => p.isAlive).length;
    if (t1Alive !== t2Alive) {
      state.winner = t1Alive > t2Alive ? 1 : 2;
    } else {
      const t1HP = state.team1.reduce((s, p) => s + (p.isAlive ? p.currentHP / p.maxHP : 0), 0);
      const t2HP = state.team2.reduce((s, p) => s + (p.isAlive ? p.currentHP / p.maxHP : 0), 0);
      state.winner = t1HP >= t2HP ? 1 : 2;
    }
  }
  
  return {
    winner: state.winner,
    turnsPlayed: state.turn,
    team1Remaining: state.team1.filter(p => p.isAlive).length,
    team2Remaining: state.team2.filter(p => p.isAlive).length,
  };
}

// ── BATTLE LOG CAPTURE ───────────────────────────────────────────────────────

export interface BattleLogEntry {
  turn: number;
  events: string[];
  field: { weather: string | null; trickRoom: boolean; tailwind1: boolean; tailwind2: boolean };
  team1HP: number[];
  team2HP: number[];
}

export interface DetailedBattleResult {
  winner: 1 | 2;
  turnsPlayed: number;
  team1Remaining: number;
  team2Remaining: number;
  log: BattleLogEntry[];
  team1Names: string[];
  team2Names: string[];
}

/** Run a battle with full turn-by-turn log */
export function simulateBattleWithLog(
  team1Pokemon: ChampionsPokemon[],
  team1Sets: CommonSet[],
  team2Pokemon: ChampionsPokemon[],
  team2Sets: CommonSet[]
): DetailedBattleResult {
  const idx1 = smartPick4(team1Pokemon, team1Sets, team2Pokemon);
  const idx2 = smartPick4(team2Pokemon, team2Sets, team1Pokemon);
  const team1Picked = idx1.map(j => ({ pokemon: team1Pokemon[j], set: team1Sets[j] }));
  const team2Picked = idx2.map(j => ({ pokemon: team2Pokemon[j], set: team2Sets[j] }));
  const bt1 = idx1.map((i, k) => createBattlePokemon(team1Pokemon[i], team1Sets[i], team1Picked));
  const bt2 = idx2.map((i, k) => createBattlePokemon(team2Pokemon[i], team2Sets[i], team2Picked));

  const state: BattleState = {
    team1: bt1, team2: bt2,
    active1: [bt1[0] || null, bt1[1] || null],
    active2: [bt2[0] || null, bt2[1] || null],
    field: createInitialField(),
    turn: 0, winner: null,
  };

  const log: BattleLogEntry[] = [];
  const entryEvents: string[] = [];

  // Entry abilities - slower weather setter wins (triggers last)
  const logEntryMons = [...state.active1, ...state.active2].filter(Boolean) as BattlePokemon[];
  const logWeatherSetters = logEntryMons
    .filter(m => { const e = getAbilityEffect(m.ability); return e?.setsWeather; })
    .sort((a, b) => b.stats.speed - a.stats.speed);
  for (const mon of logWeatherSetters) {
    const abilityEffect = getAbilityEffect(mon.ability);
    if (abilityEffect?.setsWeather) {
      state.field.weather = abilityEffect.setsWeather;
      state.field.weatherTurns = 5;
      entryEvents.push(`${mon.pokemon.name}'s ${mon.ability} set the ${abilityEffect.setsWeather}!`);
    }
  }
  // Terrain setters on entry
  const logTerrainSetters = logEntryMons
    .filter(m => { const e = getAbilityEffect(m.ability); return e?.setsTerrain; })
    .sort((a, b) => b.stats.speed - a.stats.speed);
  for (const mon of logTerrainSetters) {
    const abilityEffect = getAbilityEffect(mon.ability);
    if (abilityEffect?.setsTerrain) {
      state.field.terrain = abilityEffect.setsTerrain;
      state.field.terrainTurns = 5;
      entryEvents.push(`${mon.pokemon.name}'s ${mon.ability} set ${abilityEffect.setsTerrain} terrain!`);
    }
  }
  // Imposter on entry (must happen BEFORE Intimidate so copied Intimidate can trigger)
  for (let s = 0; s < 2; s++) {
    const active = s === 0 ? state.active1 : state.active2;
    const opponents = s === 0 ? state.active2 : state.active1;
    for (const mon of active) {
      if (mon?.ability === "Imposter") {
        const oppTarget = opponents.find(o => o && !o.isFainted);
        if (oppTarget) {
          applyImposterTransform(mon, oppTarget);
          entryEvents.push(`${mon.pokemon.name} transformed into ${oppTarget.pokemon.name} using Imposter!`);
        }
      }
    }
  }
  // Intimidate on entry (after Imposter, so Ditto can Intimidate with copied ability)
  for (let s = 0; s < 2; s++) {
    const active = s === 0 ? state.active1 : state.active2;
    const opponents = s === 0 ? state.active2 : state.active1;
    for (const mon of active) {
      if (mon?.ability === "Intimidate") {
        for (const opp of opponents) {
          if (opp && opp.ability === "Mirror Armor") {
            mon.boosts.attack = Math.max(-6, mon.boosts.attack - 1);
            entryEvents.push(`${opp.pokemon.name}'s Mirror Armor reflected ${mon.pokemon.name}'s Intimidate!`);
          } else if (opp && !isIntimidateBlocked(opp)) {
            opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
            entryEvents.push(`${mon.pokemon.name}'s Intimidate lowered ${opp.pokemon.name}'s Attack!`);
            if (opp.ability === "Competitive") {
              opp.boosts.spAtk = Math.min(6, opp.boosts.spAtk + 2);
              entryEvents.push(`${opp.pokemon.name}'s Competitive raised its Sp.Atk!`);
            }
            if (opp.ability === "Defiant") {
              opp.boosts.attack = Math.min(6, opp.boosts.attack + 2);
              entryEvents.push(`${opp.pokemon.name}'s Defiant raised its Attack!`);
            }
          }
        }
      }
      if (mon?.ability === "Commander Surge") {
        mon.boosts.spAtk = Math.min(6, mon.boosts.spAtk + 1);
        entryEvents.push(`${mon.pokemon.name}'s Commander Surge raised its Sp.Atk!`);
      }
      if (mon?.ability === "Razor Plating") {
        mon.boosts.defense = Math.min(6, mon.boosts.defense + 1);
        entryEvents.push(`${mon.pokemon.name}'s Razor Plating raised its Defense!`);
      }
    }
  }

  if (entryEvents.length > 0) {
    log.push({
      turn: 0, events: entryEvents,
      field: { weather: state.field.weather, trickRoom: state.field.trickRoom, tailwind1: state.field.side1.tailwind > 0, tailwind2: state.field.side2.tailwind > 0 },
      team1HP: bt1.map(p => Math.round((p.currentHP / p.maxHP) * 100)),
      team2HP: bt2.map(p => Math.round((p.currentHP / p.maxHP) * 100)),
    });
  }

  const MAX_TURNS = 50;
  while (state.turn < MAX_TURNS && !state.winner) {
    state.turn++;
    const turnEvents: string[] = [];

    interface TurnAction { mon: BattlePokemon; moveName: string; targetSlot: number; priority: number; speed: number; sideIndex: 1 | 2; switchOut?: boolean }
    const actions: TurnAction[] = [];
    for (const [mon, sideIndex, opponents, allies] of [
      [state.active1[0], 1, state.active2, [state.active1[1]]],
      [state.active1[1], 1, state.active2, [state.active1[0]]],
      [state.active2[0], 2, state.active1, [state.active2[1]]],
      [state.active2[1], 2, state.active1, [state.active2[0]]],
    ] as [BattlePokemon | null, 1 | 2, (BattlePokemon | null)[], (BattlePokemon | null)[]][]) {
      if (!mon || mon.isFainted) continue;
      const choice = aiChooseAction(mon, sideIndex, opponents, allies, state.field, state);
      if (choice.switchOut) {
        actions.push({ mon, moveName: "", targetSlot: -1, priority: 100, speed: getActualSpeed(mon, state.field, sideIndex), sideIndex, switchOut: true });
        continue;
      }
      const move = getMove(choice.moveName);
      let effectivePriority = move?.priority ?? 0;
      if (mon.ability === "Prankster" && move?.category === "status") effectivePriority += 1;
      if (mon.ability === "Gale Wings" && move?.type === "flying" && mon.currentHP === mon.maxHP) effectivePriority += 1;
      actions.push({ mon, moveName: choice.moveName, targetSlot: choice.targetSlot, priority: effectivePriority, speed: getActualSpeed(mon, state.field, sideIndex), sideIndex });
    }

    // ── FAKE OUT DEDUPLICATION: prevent allies from double-targeting ──────
    for (const side of [1, 2] as const) {
      const sideActions = actions.filter(a => a.sideIndex === side && a.moveName === "Fake Out");
      if (sideActions.length === 2 && sideActions[0].targetSlot === sideActions[1].targetSlot) {
        const opps = side === 1 ? state.active2 : state.active1;
        const otherSlot = sideActions[1].targetSlot === 0 ? 1 : 0;
        if (opps[otherSlot] && !opps[otherSlot]!.isFainted) {
          sideActions[1].targetSlot = otherSlot;
        }
      }
    }

    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });

    // ── MEGA EVOLUTION PHASE: before any moves execute ──────────────────
    for (const action of actions) {
      if (action.mon.isFainted || action.switchOut) continue;
      if (action.mon.canMegaEvolve && !action.mon.hasMegaEvolved) {
        const myTeam = action.sideIndex === 1 ? state.team1 : state.team2;
        const teamAlreadyMega = myTeam.some(p => p !== action.mon && p.hasMegaEvolved);
        if (!teamAlreadyMega) {
          applyMegaEvolution(action.mon);
          const megaOpponents = action.sideIndex === 1 ? state.active2 : state.active1;
          const newAbilityEffect = getAbilityEffect(action.mon.ability);
          if (newAbilityEffect?.setsWeather) {
            state.field.weather = newAbilityEffect.setsWeather;
            state.field.weatherTurns = 5;
          }
          if (newAbilityEffect?.setsTerrain) {
            state.field.terrain = newAbilityEffect.setsTerrain;
            state.field.terrainTurns = 5;
          }
          if (action.mon.ability === "Intimidate") {
            for (const opp of megaOpponents) {
              if (opp && opp.isAlive && !opp.isFainted && !isIntimidateBlocked(opp)) {
                opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
                if (opp.ability === "Competitive") opp.boosts.spAtk = Math.min(6, opp.boosts.spAtk + 2);
                if (opp.ability === "Defiant") opp.boosts.attack = Math.min(6, opp.boosts.attack + 2);
              }
            }
          }
          turnEvents.push(`${action.mon.pokemon.name} Mega Evolved!`);
        }
      }
    }

    // Re-sort after mega evolutions (speed may have changed)
    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });

    for (const action of actions) {
      if (action.mon.isFainted) continue;
      // Flinch check: Fake Out's flinch sets hasMoved = true, preventing action
      if (action.mon.hasMoved && !action.switchOut) {
        turnEvents.push(`${action.mon.pokemon.name} flinched!`);
        continue;
      }
      // Handle switch-out actions
      if (action.switchOut) {
        const active = action.sideIndex === 1 ? state.active1 : state.active2;
        const slot = active.indexOf(action.mon) as 0 | 1;
        if (slot >= 0) {
          const prevName = action.mon.pokemon.name;
          applySwitch(state, action.sideIndex, slot);
          const newMon = active[slot];
          if (newMon) {
            turnEvents.push(`${prevName} switched out! ${newMon.pokemon.name} was sent in!${newMon.hasTransformed ? " Palafin transformed into Hero Form!" : ""}`);
          }
        }
        continue;
      }
      const opponents = action.sideIndex === 1 ? state.active2 : state.active1;
      const allies = action.sideIndex === 1 ? state.active1 : state.active2;
      const target = opponents[action.targetSlot] ?? null;
      const move = getMove(action.moveName);

      // Track transformation states before the move
      const allDisguiseBefore = new Map([...opponents, ...allies].filter((m): m is BattlePokemon => m !== null).map(m => [m, m.disguiseIntact]));
      const allIllusionBefore = new Map([...opponents, ...allies].filter((m): m is BattlePokemon => m !== null).map(m => [m, m.illusionActive]));
      const stanceBefore = action.mon.stanceForm;

      // Track HP of targets (excluding user) before the move for proper logging
      const logTargets = [...opponents, ...allies].filter((m): m is BattlePokemon => m !== null && !m.isFainted && m !== action.mon);
      const hpBefore = new Map(logTargets.map(m => [m, m.currentHP]));
      const protectedBefore = new Map(logTargets.map(m => [m, m.isProtected]));
      const userHPBefore = action.mon.currentHP;

      executeMove(action.mon, action.moveName, target, allies.filter((a): a is BattlePokemon => a !== null && a !== action.mon), opponents.filter((a): a is BattlePokemon => a !== null), state, action.sideIndex);

      // Log transformation events
      if (stanceBefore !== action.mon.stanceForm && action.mon.ability === "Stance Change") {
        turnEvents.push(`${action.mon.pokemon.name} changed to ${action.mon.stanceForm === "blade" ? "Blade" : "Shield"} Forme!`);
      }
      for (const [mon, hadDisguise] of allDisguiseBefore) {
        if (hadDisguise && !mon.disguiseIntact) {
          turnEvents.push(`${mon.pokemon.name}'s Disguise was busted!`);
        }
      }
      for (const [mon, hadIllusion] of allIllusionBefore) {
        if (hadIllusion && !mon.illusionActive) {
          turnEvents.push(`${mon.pokemon.name}'s Illusion broke!`);
        }
      }

      if (move?.category === "status") {
        if (move.flags.protect) {
          if (action.mon.isProtected) {
            turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName}!`);
          } else {
            turnEvents.push(`${action.mon.pokemon.name}'s ${action.moveName} failed!`);
          }
        } else {
          turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName}!`);
        }
      } else {
        // Log damage to all affected targets (spread moves hit multiple)
        let hitAnything = false;
        for (const mon of logTargets) {
          const prev = hpBefore.get(mon) ?? mon.currentHP;
          const dmg = prev - mon.currentHP;
          const wasProtected = protectedBefore.get(mon);
          if (wasProtected && dmg <= 0 && opponents.includes(mon)) {
            if (mon === target || (move && isSpreadMove(move))) {
              turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} on ${mon.pokemon.name} - blocked by Protect!`);
              hitAnything = true;
            }
          } else if (mon.isFainted && dmg > 0) {
            turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} on ${mon.pokemon.name} - KO!`);
            hitAnything = true;
          } else if (dmg > 0) {
            turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} on ${mon.pokemon.name} (${Math.round((dmg / mon.maxHP) * 100)}% damage)`);
            hitAnything = true;
          }
        }
        // Log recoil/Life Orb self-damage separately
        const selfDmg = userHPBefore - action.mon.currentHP;
        const hasRecoilMove = move && move.flags.recoil;
        const hasLifeOrb = action.mon.item === "Life Orb";
        const label = hasRecoilMove ? "recoil" : hasLifeOrb ? "Life Orb damage" : "recoil";
        if (selfDmg > 0 && action.mon.isFainted) {
          turnEvents.push(`${action.mon.pokemon.name} fainted from ${label}!`);
        } else if (selfDmg > 0) {
          turnEvents.push(`${action.mon.pokemon.name} took ${Math.round((selfDmg / action.mon.maxHP) * 100)}% ${label}!`);
        }
        if (!hitAnything && selfDmg <= 0) {
          if (action.mon.lastMoveMissed) {
            turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} - missed!`);
          } else if (action.mon.lastMoveImmune) {
            const immuneTarget = target ?? opponents.find(o => o && !o.isFainted);
            turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} on ${immuneTarget?.pokemon.name ?? "target"} - no effect!`);
          } else {
            turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} - no target`);
          }
        }
      }
    }

    for (const [sideIndex, active] of [[1, state.active1], [2, state.active2]] as [1 | 2, (BattlePokemon | null)[] & { length: 2 }][]) {
      for (let slot = 0; slot < 2; slot++) {
        if (!active[slot] || active[slot]!.isFainted) {
          const prev = active[slot];
          const opponents = sideIndex === 1 ? state.active2 : state.active1;
          // Capture opponent attack boosts before switch (to detect Intimidate effect)
          const oppBoostsBefore = opponents.map(o => o ? o.boosts.attack : 0);
          applySwitch(state, sideIndex, slot as 0 | 1);
          const switched = active[slot];
          if (switched && switched !== prev) {
            turnEvents.push(`${sideIndex === 1 ? "Your" : "Opponent's"} ${switched.pokemon.name} was sent in!`);
            // Log Intimidate effects from the new mon
            if (switched.ability === "Intimidate") {
              for (let oi = 0; oi < opponents.length; oi++) {
                const opp = opponents[oi];
                if (!opp || opp.isFainted) continue;
                if (opp.ability === "Mirror Armor") {
                  turnEvents.push(`${opp.pokemon.name}'s Mirror Armor reflected ${switched.pokemon.name}'s Intimidate!`);
                } else if (!isIntimidateBlocked(opp) && opp.boosts.attack < oppBoostsBefore[oi]) {
                  turnEvents.push(`${switched.pokemon.name}'s Intimidate lowered ${opp.pokemon.name}'s Attack!`);
                  if (opp.ability === "Competitive") {
                    turnEvents.push(`${opp.pokemon.name}'s Competitive raised its Sp.Atk!`);
                  }
                  if (opp.ability === "Defiant") {
                    turnEvents.push(`${opp.pokemon.name}'s Defiant raised its Attack!`);
                  }
                }
              }
            }
            // Log Imposter transform from switch-in
            if (switched.isTransformed && switched.originalAbility === "Imposter") {
              const transformedInto = opponents.find(o => o && !o.isFainted);
              if (transformedInto) {
                turnEvents.push(`${switched.pokemon.name} transformed into ${transformedInto.pokemon.name} using Imposter!`);
              }
            }
          }
        }
      }
    }

    applyEndOfTurn(state);

    for (const [sideIndex, active] of [[1, state.active1], [2, state.active2]] as [1 | 2, (BattlePokemon | null)[] & { length: 2 }][]) {
      for (let slot = 0; slot < 2; slot++) {
        if (active[slot]?.isFainted) applySwitch(state, sideIndex, slot as 0 | 1);
      }
    }

    log.push({
      turn: state.turn, events: turnEvents,
      field: { weather: state.field.weather, trickRoom: state.field.trickRoom, tailwind1: state.field.side1.tailwind > 0, tailwind2: state.field.side2.tailwind > 0 },
      team1HP: bt1.map(p => p.isFainted ? 0 : Math.round((p.currentHP / p.maxHP) * 100)),
      team2HP: bt2.map(p => p.isFainted ? 0 : Math.round((p.currentHP / p.maxHP) * 100)),
    });

    const team1Alive = state.team1.filter(p => p.isAlive).length;
    const team2Alive = state.team2.filter(p => p.isAlive).length;
    if (team1Alive === 0 && team2Alive === 0) state.winner = Math.random() < 0.5 ? 1 : 2;
    else if (team1Alive === 0) state.winner = 2;
    else if (team2Alive === 0) state.winner = 1;

    for (const mon of [...state.team1, ...state.team2]) { mon.hasMoved = false; mon.isProtected = false; if (!mon.isFainted) mon.canFakeOut = false; }
  }

  if (!state.winner) {
    const t1Alive = state.team1.filter(p => p.isAlive).length;
    const t2Alive = state.team2.filter(p => p.isAlive).length;
    if (t1Alive !== t2Alive) {
      state.winner = t1Alive > t2Alive ? 1 : 2;
    } else {
      const t1HP = state.team1.reduce((s, p) => s + (p.isAlive ? p.currentHP / p.maxHP : 0), 0);
      const t2HP = state.team2.reduce((s, p) => s + (p.isAlive ? p.currentHP / p.maxHP : 0), 0);
      state.winner = t1HP >= t2HP ? 1 : 2;
    }
  }

  return {
    winner: state.winner,
    turnsPlayed: state.turn,
    team1Remaining: state.team1.filter(p => p.isAlive).length,
    team2Remaining: state.team2.filter(p => p.isAlive).length,
    log,
    team1Names: bt1.map(p => p.pokemon.name),
    team2Names: bt2.map(p => p.pokemon.name),
  };
}

/** Run Monte Carlo simulation: many battles between two teams */
export function runSimulation(
  team1Pokemon: ChampionsPokemon[],
  team1Sets: CommonSet[],
  team2Pokemon: ChampionsPokemon[],
  team2Sets: CommonSet[],
  iterations: number = 100
): {
  wins: number;
  losses: number;
  winRate: number;
  avgTurns: number;
  avgRemaining: number;
} {
  let wins = 0;
  let totalTurns = 0;
  let totalRemaining = 0;
  
  for (let i = 0; i < iterations; i++) {
    const result = simulateBattle(team1Pokemon, team1Sets, team2Pokemon, team2Sets);
    if (result.winner === 1) {
      wins++;
      totalRemaining += result.team1Remaining;
    }
    totalTurns += result.turnsPlayed;
  }
  
  return {
    wins,
    losses: iterations - wins,
    winRate: Math.round((wins / iterations) * 1000) / 10,
    avgTurns: Math.round(totalTurns / iterations * 10) / 10,
    avgRemaining: wins > 0 ? Math.round(totalRemaining / wins * 10) / 10 : 0,
  };
}

// ── RANDOM TEAM GENERATOR ────────────────────────────────────────────────────

const COMPETITIVE_ITEMS = [
  "Life Orb", "Choice Scarf", "Choice Band", "Choice Specs",
  "Focus Sash", "Weakness Policy", "Assault Vest", "Leftovers",
  "Sitrus Berry", "Lum Berry", "Rocky Helmet", "Safety Goggles",
  "Covert Cloak", "Clear Amulet",
];

function pickNatureForMon(p: ChampionsPokemon): string {
  const { baseStats } = p;
  const isSpecial = baseStats.spAtk > baseStats.attack;
  const isFast = baseStats.speed > 80;
  const isBulky = baseStats.hp > 90 && baseStats.speed < 60;
  if (isBulky) return isSpecial ? "Quiet" : "Brave";
  if (isSpecial) return isFast ? "Timid" : "Modest";
  return isFast ? "Jolly" : "Adamant";
}

function pickSP(p: ChampionsPokemon): StatPoints {
  const { baseStats } = p;
  const isSpecial = baseStats.spAtk > baseStats.attack;
  const isFast = baseStats.speed > 80;
  const isBulky = baseStats.hp > 90 && baseStats.speed < 60;
  if (isBulky) {
    return isSpecial
      ? { hp: 32, attack: 0, defense: 2, spAtk: 32, spDef: 0, speed: 0 }
      : { hp: 32, attack: 32, defense: 2, spAtk: 0, spDef: 0, speed: 0 };
  }
  if (isSpecial) {
    return isFast
      ? { hp: 2, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 32 }
      : { hp: 20, attack: 0, defense: 0, spAtk: 32, spDef: 0, speed: 14 };
  }
  return isFast
    ? { hp: 2, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 32 }
    : { hp: 20, attack: 32, defense: 2, spAtk: 0, spDef: 10, speed: 2 };
}

function pickMoves(p: ChampionsPokemon): string[] {
  const stab = p.moves.filter(m => p.types.includes(m.type) && m.category !== "status");
  const coverage = p.moves.filter(m => !p.types.includes(m.type) && m.category !== "status");
  const status = p.moves.filter(m => m.category === "status");
  const picked: string[] = [];

  // 1-2 STAB moves
  for (const m of stab.slice(0, 2)) { if (picked.length < 4) picked.push(m.name); }
  // 1 coverage
  for (const m of coverage.slice(0, 1)) { if (picked.length < 4) picked.push(m.name); }
  // Protect if available
  const protect = status.find(m => m.name === "Protect");
  if (protect && picked.length < 4) picked.push(protect.name);
  // Fill remaining
  for (const m of [...coverage, ...status, ...stab]) {
    if (picked.length >= 4) break;
    if (!picked.includes(m.name)) picked.push(m.name);
  }
  // Fallback
  while (picked.length < 4 && p.moves.length > picked.length) {
    const m = p.moves.find(mv => !picked.includes(mv.name));
    if (m) picked.push(m.name); else break;
  }
  return picked.slice(0, 4);
}

import { POKEMON_SEED } from "@/lib/pokemon-data";

export interface RandomTeam {
  id: string;
  name: string;
  pokemon: ChampionsPokemon[];
  sets: CommonSet[];
  archetype: string;
}

/** Generate a random but viable VGC team from the full roster */
export function generateRandomTeam(usedItems?: Set<string>): RandomTeam {
  const weighted = POKEMON_SEED.map(p => ({
    pokemon: p,
    weight: (p.usageRate ?? 1) + Math.random() * 5,
  })).sort((a, b) => b.weight - a.weight);

  const team: ChampionsPokemon[] = [];
  const types = new Set<string>();
  const teamItems = new Set(usedItems ?? []);

  for (const { pokemon } of weighted) {
    if (team.length >= 6) break;
    // Skip if already have this type combo covered
    if (team.length >= 3 && pokemon.types.every(t => types.has(t))) continue;
    team.push(pokemon);
    pokemon.types.forEach(t => types.add(t));
  }

  // Shuffle last 4 slots for variety
  for (let i = team.length - 1; i > 1; i--) {
    const j = 2 + Math.floor(Math.random() * (i - 1));
    [team[i], team[j]] = [team[j], team[i]];
  }

  const sets: CommonSet[] = team.map(p => {
    let item = COMPETITIVE_ITEMS[Math.floor(Math.random() * COMPETITIVE_ITEMS.length)];
    let attempts = 0;
    while (teamItems.has(item) && attempts < 20) {
      item = COMPETITIVE_ITEMS[Math.floor(Math.random() * COMPETITIVE_ITEMS.length)];
      attempts++;
    }
    teamItems.add(item);
    return {
      name: p.name,
      nature: pickNatureForMon(p),
      ability: p.abilities[Math.floor(Math.random() * p.abilities.length)]?.name ?? p.abilities[0]?.name ?? "",
      item,
      moves: pickMoves(p),
      sp: pickSP(p),
    };
  });

  const hasWeather = team.some(p => p.abilities.some(a => ["Drought", "Drizzle", "Sand Stream", "Snow Warning"].includes(a.name)));
  const hasTR = sets.some(s => s.moves.includes("Trick Room"));
  const hasTailwind = sets.some(s => s.moves.includes("Tailwind"));
  let archetype = "Balanced";
  if (hasWeather) archetype = "Weather";
  else if (hasTR) archetype = "Trick Room";
  else if (hasTailwind) archetype = "Speed Control";

  return {
    id: `rand-${Math.random().toString(36).slice(2, 8)}`,
    name: team.slice(0, 3).map(p => p.name).join(" / ") + " +3",
    pokemon: team,
    sets,
    archetype,
  };
}

/** Generate a pool of random opponent teams */
export function generateRandomPool(count: number): RandomTeam[] {
  const pool: RandomTeam[] = [];
  for (let i = 0; i < count; i++) {
    pool.push(generateRandomTeam());
  }
  return pool;
}

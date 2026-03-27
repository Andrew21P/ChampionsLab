// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — VGC BATTLE SIMULATOR
// Monte Carlo doubles battle simulation engine
// Simulates turn-by-turn VGC matches with AI decision-making
// ═══════════════════════════════════════════════════════════════════════════════

import type { ChampionsPokemon, CommonSet, BaseStats, StatPoints, PokemonType } from "@/lib/types";
import { calculateStats, getEffectiveSpeed, applyStatStage } from "./stat-calc";
import { calculateDamage, type DamageCalcPokemon, type DamageCalcTarget, type DamageCalcOptions } from "./damage-calc";
import { getMatchup } from "./type-chart";
import { getMove, isSpreadMove, type EngineMove, MOVE_DATA } from "./move-data";
import { getAbilityEffect, isWeatherSetter } from "./ability-data";
import type { NatureName } from "./natures";

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
  item: string;
  itemConsumed: boolean;
  ability: string;
  types: PokemonType[];
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

function createBattlePokemon(pokemon: ChampionsPokemon, set: CommonSet): BattlePokemon {
  const stats = calculateStats(pokemon.baseStats, set.sp, set.nature as NatureName);
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
    ability: set.ability,
    types: [...pokemon.types] as PokemonType[],
  };
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

// ── AI DECISION ENGINE ───────────────────────────────────────────────────────

interface MoveChoice {
  moveIndex: number;
  moveName: string;
  targetSlot: number; // 0 or 1 for opponent slots
  score: number;
}

function evaluateMoveOption(
  user: BattlePokemon,
  userSide: 1 | 2,
  targets: (BattlePokemon | null)[],
  allies: (BattlePokemon | null)[],
  moveName: string,
  field: FieldState
): MoveChoice[] {
  const move = getMove(moveName);
  if (!move) return [];
  
  const choices: MoveChoice[] = [];
  const options: DamageCalcOptions = {
    weather: field.weather as DamageCalcOptions["weather"],
    isDoubles: true,
    lightScreen: (userSide === 1 ? field.side2 : field.side1).lightScreen > 0,
    reflect: (userSide === 1 ? field.side2 : field.side1).reflect > 0,
    auroraVeil: (userSide === 1 ? field.side2 : field.side1).auroraVeil > 0,
  };
  
  // Status moves evaluation
  if (move.category === "status") {
    let score = 0;
    
    // Protect: good when threatened or stalling
    if (move.flags.protect) {
      score = 35 - user.protectCount * 25;
      if (user.currentHP < user.maxHP * 0.5) score += 15;
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Trick Room
    if (moveName === "Trick Room") {
      const avgSpeed = (user.stats.speed + (allies[0]?.stats.speed ?? 0)) / 2;
      score = avgSpeed < 70 ? 80 : 20;
      if (field.trickRoom) score = avgSpeed < 70 ? 10 : 70; // Re-reverse if fast
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Tailwind
    if (moveName === "Tailwind") {
      const side = userSide === 1 ? field.side1 : field.side2;
      score = side.tailwind > 0 ? 5 : 65;
      choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
      return choices;
    }
    
    // Fake Out
    if (moveName === "Fake Out" && user.canFakeOut) {
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        if (!t || t.isFainted) continue;
        score = 70; // Fake Out is almost always good
        choices.push({ moveIndex: 0, moveName, targetSlot: i, score });
      }
      return choices;
    }
    
    // Support moves (Helping Hand, etc.)
    score = 30;
    choices.push({ moveIndex: 0, moveName, targetSlot: -1, score });
    return choices;
  }
  
  // Damaging moves
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    if (!target || target.isFainted) continue;
    
    const attacker: DamageCalcPokemon = {
      baseStats: user.pokemon.baseStats,
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
      baseStats: target.pokemon.baseStats,
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
    
    // OHKO is highest priority
    if (result.isOHKO) {
      score = 100;
    } else if (result.is2HKO) {
      score = 70 + result.percentHP[0] / 2;
    } else {
      score = result.percentHP[0] * 0.6;
    }
    
    // Priority bonus when both sides are low
    if (move.priority > 0 && target.currentHP < target.maxHP * 0.4) {
      score += 20;
    }
    
    // Spread move bonus (hits both in doubles)
    if (isSpreadMove(move)) {
      score += 15;
    }
    
    // Type effectiveness bonus
    if (result.effectiveness >= 2) score += 10;
    if (result.effectiveness === 0) score = 0;
    
    choices.push({ moveIndex: 0, moveName, targetSlot: i, score });
  }
  
  return choices;
}

function aiChooseAction(
  mon: BattlePokemon,
  sideIndex: 1 | 2,
  opponents: (BattlePokemon | null)[],
  allies: (BattlePokemon | null)[],
  field: FieldState
): { moveName: string; targetSlot: number } {
  const allChoices: MoveChoice[] = [];
  
  // Evaluate each move
  for (const moveName of mon.set.moves) {
    // Can't use Fake Out after turn 1
    if (moveName === "Fake Out" && !mon.canFakeOut) continue;
    
    const moveChoices = evaluateMoveOption(mon, sideIndex, opponents, allies, moveName, field);
    allChoices.push(...moveChoices);
  }
  
  if (allChoices.length === 0) {
    // Struggle fallback
    return { moveName: mon.set.moves[0], targetSlot: 0 };
  }
  
  // Add small randomness (±4 to score) for variety
  for (const c of allChoices) {
    c.score += (Math.random() - 0.5) * 8;
  }
  
  // Pick best option
  allChoices.sort((a, b) => b.score - a.score);
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
  
  // Find a benched alive Pokémon
  const bench = team.filter(p =>
    p.isAlive && !p.isFainted &&
    p !== active[0] && p !== active[1]
  );
  
  if (bench.length > 0) {
    const next = bench[0];
    active[slot] = next;
    next.canFakeOut = true;
    next.protectCount = 0;
    next.boosts = { attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };
    
    // On-entry abilities
    const abilityEffect = getAbilityEffect(next.ability);
    if (abilityEffect?.setsWeather) {
      state.field.weather = abilityEffect.setsWeather;
      state.field.weatherTurns = 5;
    }
    if (next.ability === "Intimidate") {
      const opponents = sideIndex === 1 ? state.active2 : state.active1;
      for (const opp of opponents) {
        if (opp && opp.isAlive) {
          if (!isIntimidateBlocked(opp)) {
            opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
          }
          if (opp.ability === "Competitive") {
            opp.boosts.spAtk = Math.min(6, opp.boosts.spAtk + 2);
          }
          if (opp.ability === "Defiant") {
            opp.boosts.attack = Math.min(6, opp.boosts.attack + 2);
          }
        }
      }
    }
  } else {
    active[slot] = null;
  }
}

function isIntimidateBlocked(mon: BattlePokemon): boolean {
  return ["Inner Focus", "Clear Body", "Oblivious", "Own Tempo", "Scrappy"].includes(mon.ability);
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
  
  const sides = [
    { side: state.field.side1, active: state.active1 },
    { side: state.field.side2, active: state.active2 },
  ];
  
  for (const { side, active } of sides) {
    if (side.tailwind > 0) side.tailwind--;
    if (side.reflect > 0) side.reflect--;
    if (side.lightScreen > 0) side.lightScreen--;
    if (side.auroraVeil > 0) side.auroraVeil--;
    
    // Status damage
    for (const mon of active) {
      if (!mon || mon.isFainted) continue;
      
      if (mon.status === "burn") {
        mon.currentHP -= Math.floor(mon.maxHP / 16);
      }
      if (mon.status === "poison") {
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
            mon.ability !== "Sand Rush" && mon.ability !== "Sand Veil") {
          mon.currentHP -= Math.floor(mon.maxHP / 16);
        }
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
  
  // Paralysis check
  if (user.status === "paralysis" && Math.random() < 0.25) return;
  
  // Sleep check
  if (user.status === "sleep") {
    if (Math.random() < 0.33) {
      user.status = null; // Wake up
    }
    return;
  }
  
  // Protect check
  if (move.flags.protect) {
    const successRate = Math.pow(1 / 3, user.protectCount);
    if (Math.random() < successRate) {
      user.protectCount++;
      user.isProtected = true;
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
  }
  
  for (const t of targets) {
    // Protected targets block all damage
    if (t.isProtected) continue;
    
    // Accuracy check
    if (move.accuracy > 0 && Math.random() * 100 > move.accuracy) continue;
    
    // Focus Sash precheck
    const hadFocusSash = t.item === "Focus Sash" && !t.itemConsumed && t.currentHP === t.maxHP;
    
    // Calculate damage
    const options: DamageCalcOptions = {
      weather: state.field.weather as DamageCalcOptions["weather"],
      isDoubles: true,
      reflect: (userSide === 1 ? state.field.side2 : state.field.side1).reflect > 0,
      lightScreen: (userSide === 1 ? state.field.side2 : state.field.side1).lightScreen > 0,
      isCrit: Math.random() < 0.0625,
    };
    
    const attacker: DamageCalcPokemon = {
      baseStats: user.pokemon.baseStats,
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
      baseStats: t.pokemon.baseStats,
      sp: t.set.sp,
      nature: t.set.nature as NatureName,
      types: t.types,
      ability: t.ability,
      item: t.item,
      defStages: t.boosts.defense,
      spDefStages: t.boosts.spDef,
    };
    
    const result = calculateDamage(attacker, defender, moveName, options);
    
    // Apply damage with random roll between min and max
    let damage = result.damage[0] + Math.floor(Math.random() * (result.damage[1] - result.damage[0] + 1));
    damage = Math.max(1, damage);
    
    t.currentHP -= damage;
    
    // Focus Sash
    if (hadFocusSash && t.currentHP <= 0) {
      t.currentHP = 1;
      t.itemConsumed = true;
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
    
    // Life Orb recoil
    if (user.item === "Life Orb" && user.ability !== "Sheer Force") {
      user.currentHP -= Math.floor(user.maxHP / 10);
    }
    
    // Recoil
    if (move.flags.recoil) {
      user.currentHP -= Math.floor(damage * (move.flags.recoil / 100));
    }
    
    // Drain
    if (move.flags.drain) {
      user.currentHP = Math.min(user.maxHP, user.currentHP + Math.floor(damage * (move.flags.drain / 100)));
    }
    
    // Secondary effects
    if (move.secondary && Math.random() * 100 < move.secondary.chance) {
      if (move.secondary.status && !t.status && t.currentHP > 0) {
        t.status = move.secondary.status;
      }
      if (move.secondary.volatileStatus === "flinch") {
        t.hasMoved = true; // Simplified: prevent action
      }
      if (move.secondary.boosts && t.currentHP > 0) {
        const boostTarget = move.secondary.self ? user : t;
        for (const [stat, stages] of Object.entries(move.secondary.boosts)) {
          if (stat in boostTarget.boosts) {
            (boostTarget.boosts as Record<string, number>)[stat] = Math.max(-6, Math.min(6,
              (boostTarget.boosts as Record<string, number>)[stat] + (stages as number)
            ));
          }
        }
      }
    }
    
    // Self boosts from move
    if (move.selfBoost) {
      for (const [stat, stages] of Object.entries(move.selfBoost)) {
        if (stat in user.boosts) {
          (user.boosts as Record<string, number>)[stat] = Math.max(-6, Math.min(6,
            (user.boosts as Record<string, number>)[stat] + (stages as number)
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
    }
    if (user.currentHP <= 0) {
      user.currentHP = 0;
      user.isAlive = false;
      user.isFainted = true;
    }
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

/** Run a single simulated battle between two teams */
export function simulateBattle(
  team1Pokemon: ChampionsPokemon[],
  team1Sets: CommonSet[],
  team2Pokemon: ChampionsPokemon[],
  team2Sets: CommonSet[]
): { winner: 1 | 2; turnsPlayed: number; team1Remaining: number; team2Remaining: number } {
  // Randomly pick 4 from 6 (VGC team preview)
  const idx1 = pick4(team1Pokemon.length);
  const idx2 = pick4(team2Pokemon.length);
  const bt1 = idx1.map(i => createBattlePokemon(team1Pokemon[i], team1Sets[i]));
  const bt2 = idx2.map(i => createBattlePokemon(team2Pokemon[i], team2Sets[i]));
  
  const state: BattleState = {
    team1: bt1,
    team2: bt2,
    active1: [bt1[0] || null, bt1[1] || null],
    active2: [bt2[0] || null, bt2[1] || null],
    field: createInitialField(),
    turn: 0,
    winner: null,
  };
  
  // Apply entry abilities — slower weather setter wins (triggers last, like real VGC)
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
  // Intimidate on entry
  for (let s = 0; s < 2; s++) {
    const active = s === 0 ? state.active1 : state.active2;
    const opponents = s === 0 ? state.active2 : state.active1;
    for (const mon of active) {
      if (mon?.ability === "Intimidate") {
        for (const opp of opponents) {
          if (opp && !isIntimidateBlocked(opp)) {
            opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
          }
        }
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
    }
    
    const actions: TurnAction[] = [];
    
    for (const [mon, sideIndex, opponents, allies] of [
      [state.active1[0], 1, state.active2, [state.active1[1]]],
      [state.active1[1], 1, state.active2, [state.active1[0]]],
      [state.active2[0], 2, state.active1, [state.active2[1]]],
      [state.active2[1], 2, state.active1, [state.active2[0]]],
    ] as [BattlePokemon | null, 1 | 2, (BattlePokemon | null)[], (BattlePokemon | null)[]][]) {
      if (!mon || mon.isFainted) continue;
      
      const choice = aiChooseAction(mon, sideIndex, opponents, allies, state.field);
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
    
    // Sort by priority (desc), then speed (desc, or asc in Trick Room)
    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });
    
    // Execute actions
    for (const action of actions) {
      if (action.mon.isFainted) continue;
      
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
  const idx1 = pick4(team1Pokemon.length);
  const idx2 = pick4(team2Pokemon.length);
  const bt1 = idx1.map(i => createBattlePokemon(team1Pokemon[i], team1Sets[i]));
  const bt2 = idx2.map(i => createBattlePokemon(team2Pokemon[i], team2Sets[i]));

  const state: BattleState = {
    team1: bt1, team2: bt2,
    active1: [bt1[0] || null, bt1[1] || null],
    active2: [bt2[0] || null, bt2[1] || null],
    field: createInitialField(),
    turn: 0, winner: null,
  };

  const log: BattleLogEntry[] = [];
  const entryEvents: string[] = [];

  // Entry abilities — slower weather setter wins (triggers last)
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
  for (let s = 0; s < 2; s++) {
    const active = s === 0 ? state.active1 : state.active2;
    const opponents = s === 0 ? state.active2 : state.active1;
    for (const mon of active) {
      if (mon?.ability === "Intimidate") {
        for (const opp of opponents) {
          if (opp && !isIntimidateBlocked(opp)) {
            opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
            entryEvents.push(`${mon.pokemon.name}'s Intimidate lowered ${opp.pokemon.name}'s Attack!`);
          }
        }
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

    interface TurnAction { mon: BattlePokemon; moveName: string; targetSlot: number; priority: number; speed: number; sideIndex: 1 | 2 }
    const actions: TurnAction[] = [];
    for (const [mon, sideIndex, opponents, allies] of [
      [state.active1[0], 1, state.active2, [state.active1[1]]],
      [state.active1[1], 1, state.active2, [state.active1[0]]],
      [state.active2[0], 2, state.active1, [state.active2[1]]],
      [state.active2[1], 2, state.active1, [state.active2[0]]],
    ] as [BattlePokemon | null, 1 | 2, (BattlePokemon | null)[], (BattlePokemon | null)[]][]) {
      if (!mon || mon.isFainted) continue;
      const choice = aiChooseAction(mon, sideIndex, opponents, allies, state.field);
      const move = getMove(choice.moveName);
      let effectivePriority = move?.priority ?? 0;
      if (mon.ability === "Prankster" && move?.category === "status") effectivePriority += 1;
      if (mon.ability === "Gale Wings" && move?.type === "flying" && mon.currentHP === mon.maxHP) effectivePriority += 1;
      actions.push({ mon, moveName: choice.moveName, targetSlot: choice.targetSlot, priority: effectivePriority, speed: getActualSpeed(mon, state.field, sideIndex), sideIndex });
    }

    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });

    for (const action of actions) {
      if (action.mon.isFainted) continue;
      const opponents = action.sideIndex === 1 ? state.active2 : state.active1;
      const allies = action.sideIndex === 1 ? state.active1 : state.active2;
      const target = opponents[action.targetSlot] ?? null;
      const targetName = target?.pokemon.name ?? "the foe";
      const prevHP = target ? target.currentHP : 0;
      executeMove(action.mon, action.moveName, target, allies.filter((a): a is BattlePokemon => a !== null && a !== action.mon), opponents.filter((a): a is BattlePokemon => a !== null), state, action.sideIndex);
      const move = getMove(action.moveName);
      if (move?.category === "status") {
        turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName}!`);
      } else if (target) {
        const dmg = prevHP - target.currentHP;
        if (target.isFainted) {
          turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} on ${targetName} — KO!`);
        } else if (dmg > 0) {
          turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} on ${targetName} (${Math.round((dmg / target.maxHP) * 100)}% damage)`);
        } else {
          turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName} — missed or no effect`);
        }
      }
    }

    for (const [sideIndex, active] of [[1, state.active1], [2, state.active2]] as [1 | 2, (BattlePokemon | null)[] & { length: 2 }][]) {
      for (let slot = 0; slot < 2; slot++) {
        if (!active[slot] || active[slot]!.isFainted) {
          const prev = active[slot];
          applySwitch(state, sideIndex, slot as 0 | 1);
          if (active[slot] && active[slot] !== prev) {
            turnEvents.push(`${sideIndex === 1 ? "Your" : "Opponent's"} ${active[slot]!.pokemon.name} was sent in!`);
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

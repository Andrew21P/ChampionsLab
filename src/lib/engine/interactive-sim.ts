import type { ChampionsPokemon, CommonSet } from "@/lib/types";
import {
  BattleState,
  BattlePokemon,
  createInitialField,
  createBattlePokemon,
  TurnAction,
  aiChooseActionExported as aiChooseAction,
  getActualSpeedExported as getActualSpeed,
  applyMegaEvolutionExported as applyMegaEvolution,
  executeMove,
  applySwitch,
  applyEndOfTurn,
  isIntimidateBlocked,
  applyImposterTransformExported as applyImposterTransform,
} from "./battle-sim";
import { getMove } from "./move-data";
import { getAbilityEffect } from "./ability-data";

export interface InteractiveBattleLogEntry {
  turn: number;
  events: string[];
}

export class InteractiveBattleEngine {
  state: BattleState;
  log: InteractiveBattleLogEntry[];
  turnEvents: string[];

  constructor(
    team1Pokemon: ChampionsPokemon[],
    team1Sets: CommonSet[],
    team2Pokemon: ChampionsPokemon[],
    team2Sets: CommonSet[]
  ) {
    // Player is side 1
    const team1Picked = team1Pokemon.slice(0, 4).map((p, i) => ({ pokemon: p, set: team1Sets[i] }));
    // AI is side 2
    const team2Picked = team2Pokemon.slice(0, 4).map((p, i) => ({ pokemon: p, set: team2Sets[i] }));

    const bt1 = team1Picked.map(({ pokemon, set }) => createBattlePokemon(pokemon, set, team1Picked));
    const bt2 = team2Picked.map(({ pokemon, set }) => createBattlePokemon(pokemon, set, team2Picked));

    this.state = {
      team1: bt1,
      team2: bt2,
      active1: [bt1[0] || null, bt1[1] || null],
      active2: [bt2[0] || null, bt2[1] || null],
      field: createInitialField(),
      turn: 0,
      winner: null,
    };

    this.log = [];
    this.turnEvents = [];

    this.initializeBattle();
  }

  private addEvent(event: string) {
    this.turnEvents.push(event);
  }

  private initializeBattle() {
    // Initial triggers on switch in
    const entryMons = [...this.state.active1, ...this.state.active2].filter(Boolean) as BattlePokemon[];
    const weatherSetters = entryMons
      .filter((m) => {
        const e = getAbilityEffect(m.ability);
        return e?.setsWeather;
      })
      .sort((a, b) => b.stats.speed - a.stats.speed); // Fastest first, slowest last (wins)
    for (const mon of weatherSetters) {
      const abilityEffect = getAbilityEffect(mon.ability);
      if (abilityEffect?.setsWeather) {
        this.state.field.weather = abilityEffect.setsWeather;
        this.state.field.weatherTurns = 5;
        this.addEvent(`${mon.pokemon.name}'s ${mon.ability} set the ${abilityEffect.setsWeather}!`);
      }
    }

    const terrainSetters = entryMons
      .filter((m) => {
        const e = getAbilityEffect(m.ability);
        return e?.setsTerrain;
      })
      .sort((a, b) => b.stats.speed - a.stats.speed);
    for (const mon of terrainSetters) {
      const abilityEffect = getAbilityEffect(mon.ability);
      if (abilityEffect?.setsTerrain) {
        this.state.field.terrain = abilityEffect.setsTerrain;
        this.state.field.terrainTurns = 5;
        this.addEvent(`${mon.pokemon.name}'s ${mon.ability} set ${abilityEffect.setsTerrain} terrain!`);
      }
    }

    for (let s = 0; s < 2; s++) {
      const active = s === 0 ? this.state.active1 : this.state.active2;
      const opponents = s === 0 ? this.state.active2 : this.state.active1;
      for (const mon of active) {
        if (mon?.ability === "Imposter") {
          const oppTarget = opponents.find((o) => o && !o.isFainted);
          if (oppTarget) {
            applyImposterTransform(mon, oppTarget);
            this.addEvent(`${mon.pokemon.name} transformed into ${oppTarget.pokemon.name} using Imposter!`);
          }
        }
      }
    }

    for (let s = 0; s < 2; s++) {
      const active = s === 0 ? this.state.active1 : this.state.active2;
      const opponents = s === 0 ? this.state.active2 : this.state.active1;
      for (const mon of active) {
        if (mon?.ability === "Intimidate") {
          for (const opp of opponents) {
            if (opp && opp.ability === "Mirror Armor") {
              mon.boosts.attack = Math.max(-6, mon.boosts.attack - 1);
              this.addEvent(`${opp.pokemon.name}'s Mirror Armor reflected ${mon.pokemon.name}'s Intimidate!`);
            } else if (opp && !isIntimidateBlocked(opp)) {
              opp.boosts.attack = Math.max(-6, opp.boosts.attack - 1);
              this.addEvent(`${mon.pokemon.name}'s Intimidate lowered ${opp.pokemon.name}'s Attack!`);
              if (opp.ability === "Competitive") {
                opp.boosts.spAtk = Math.min(6, opp.boosts.spAtk + 2);
                this.addEvent(`${opp.pokemon.name}'s Competitive raised its Sp.Atk!`);
              }
              if (opp.ability === "Defiant") {
                opp.boosts.attack = Math.min(6, opp.boosts.attack + 2);
                this.addEvent(`${opp.pokemon.name}'s Defiant raised its Attack!`);
              }
            }
          }
        }
        if (mon?.ability === "Commander Surge") {
          mon.boosts.spAtk = Math.min(6, mon.boosts.spAtk + 1);
          this.addEvent(`${mon.pokemon.name}'s Commander Surge raised its Sp.Atk!`);
        }
        if (mon?.ability === "Razor Plating") {
          mon.boosts.defense = Math.min(6, mon.boosts.defense + 1);
          this.addEvent(`${mon.pokemon.name}'s Razor Plating raised its Defense!`);
        }
      }
    }

    if (this.turnEvents.length > 0) {
      this.log.push({ turn: 0, events: [...this.turnEvents] });
      this.turnEvents = [];
    }
  }

  submitTurn(playerActions: TurnAction[]): InteractiveBattleLogEntry {
    this.state.turn++;
    this.turnEvents = [];

    const actions: TurnAction[] = [...playerActions];

    // Gather AI actions
    for (const [mon, sideIndex, opponents, allies] of [
      [this.state.active2[0], 2, this.state.active1, [this.state.active2[1]]],
      [this.state.active2[1], 2, this.state.active1, [this.state.active2[0]]],
    ] as [BattlePokemon | null, 1 | 2, (BattlePokemon | null)[], (BattlePokemon | null)[]][]) {
      if (!mon || mon.isFainted) continue;
      const choice = aiChooseAction(mon, sideIndex, opponents, allies, this.state.field, this.state);
      if (choice.switchOut) {
        actions.push({ mon, moveName: "", targetSlot: -1, priority: 100, speed: getActualSpeed(mon, this.state.field, sideIndex), sideIndex, switchOut: true });
        continue;
      }
      const move = getMove(choice.moveName);
      let effectivePriority = move?.priority ?? 0;
      if (mon.ability === "Prankster" && move?.category === "status") effectivePriority += 1;
      if (mon.ability === "Gale Wings" && move?.type === "flying" && mon.currentHP === mon.maxHP) effectivePriority += 1;
      actions.push({ mon, moveName: choice.moveName, targetSlot: choice.targetSlot, priority: effectivePriority, speed: getActualSpeed(mon, this.state.field, sideIndex), sideIndex });
    }

    // Sort and execute actions
    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (this.state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });

    for (const action of actions) {
      if (action.mon.isFainted || action.switchOut) continue;
      if (action.mon.canMegaEvolve && !action.mon.hasMegaEvolved) {
        const myTeam = action.sideIndex === 1 ? this.state.team1 : this.state.team2;
        const teamAlreadyMega = myTeam.some((p) => p !== action.mon && p.hasMegaEvolved);
        if (!teamAlreadyMega) {
          applyMegaEvolution(action.mon);
          this.turnEvents.push(`${action.mon.pokemon.name} Mega Evolved!`);
        }
      }
    }

    actions.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      if (this.state.field.trickRoom) return a.speed - b.speed;
      return b.speed - a.speed;
    });

    for (const action of actions) {
      if (action.mon.isFainted) continue;
      if (action.mon.hasMoved && !action.switchOut) {
        this.turnEvents.push(`${action.mon.pokemon.name} flinched!`);
        continue;
      }
      if (action.switchOut) {
        const active = action.sideIndex === 1 ? this.state.active1 : this.state.active2;
        const slot = active.indexOf(action.mon) as 0 | 1;
        if (slot >= 0) {
          const prevName = action.mon.pokemon.name;
          // Player switches might specify which mon to switch to
          const chosenNext = action.sideIndex === 1 ? this.state.team1.find(p => p.pokemon.name === action.moveName) : undefined;
          applySwitch(this.state, action.sideIndex, slot, chosenNext);
          const newMon = active[slot];
          if (newMon) {
            this.turnEvents.push(`${prevName} switched out! ${newMon.pokemon.name} was sent in!${newMon.hasTransformed ? " Palafin transformed into Hero Form!" : ""}`);
          }
        }
        continue;
      }

      const opponents = action.sideIndex === 1 ? this.state.active2 : this.state.active1;
      const allies = action.sideIndex === 1 ? this.state.active1 : this.state.active2;

      // Let's resolve the target slot correctly. The targetSlot points to an index in opponents array for normal moves.
      // -1 means it targets self/field.
      let target: BattlePokemon | null = null;
      if (action.targetSlot >= 0 && action.targetSlot < opponents.length) {
        target = opponents[action.targetSlot] ?? null;
      } else if (action.targetSlot === -1) {
        // Targets self or field (e.g. Protect, Swords Dance, Trick Room, etc.)
        target = action.mon;
      }

      // If the target is an opponent but they fainted, retarget to the other opponent if alive.
      // This is generally handled in executeMove, but let's pass the intended target.
      // Wait, executeMove handles retargeting. We just pass the originally targeted slot.

      const userHPBefore = action.mon.currentHP;
      executeMove(action.mon, action.moveName, target, allies.filter((a): a is BattlePokemon => a !== null && a !== action.mon), opponents.filter((a): a is BattlePokemon => a !== null), this.state, action.sideIndex);

      const move = getMove(action.moveName);
      if (move?.category === "status") {
        if (move.flags.protect) {
          if (action.mon.isProtected) this.turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName}!`);
          else this.turnEvents.push(`${action.mon.pokemon.name}'s ${action.moveName} failed!`);
        } else {
          this.turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName}!`);
        }
      } else {
        this.turnEvents.push(`${action.mon.pokemon.name} used ${action.moveName}!`);
      }

      const selfDmg = userHPBefore - action.mon.currentHP;
      if (selfDmg > 0 && action.mon.isFainted) {
        this.turnEvents.push(`${action.mon.pokemon.name} fainted from recoil!`);
      }
    }

    // Process end of turn
    applyEndOfTurn(this.state);

    // Prompt for replacements if any fainted (simplified here to just use AI for both, or let player choose next turn)
    for (const [sideIndex, active] of [[1, this.state.active1], [2, this.state.active2]] as [1 | 2, (BattlePokemon | null)[] & { length: 2 }][]) {
      for (let slot = 0; slot < 2; slot++) {
        if (active[slot]?.isFainted) applySwitch(this.state, sideIndex, slot as 0 | 1);
      }
    }

    const team1Alive = this.state.team1.filter((p) => p.isAlive).length;
    const team2Alive = this.state.team2.filter((p) => p.isAlive).length;
    if (team1Alive === 0 && team2Alive === 0) this.state.winner = Math.random() < 0.5 ? 1 : 2;
    else if (team1Alive === 0) this.state.winner = 2;
    else if (team2Alive === 0) this.state.winner = 1;

    for (const mon of [...this.state.team1, ...this.state.team2]) { mon.hasMoved = false; mon.isProtected = false; if (!mon.isFainted) mon.canFakeOut = false; }

    const entry = { turn: this.state.turn, events: [...this.turnEvents] };
    this.log.push(entry);
    return entry;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from 2,000,000 mega-aware battle simulations
// Date: 2026-03-31T12:12:29.112Z
// ═══════════════════════════════════════════════════════════════════════════════

export interface SimPokemonData {
  id: number;
  name: string;
  isMega: boolean;
  elo: number;
  winRate: number;
  appearances: number;
  wins: number;
  losses: number;
  bestPartners: { name: string; winRate: number; games: number }[];
  bestSets: { set: string; winRate: number; games: number }[];
}

export interface SimPairData {
  pokemon1: string;
  pokemon2: string;
  winRate: number;
  games: number;
}

export interface SimArchetypeData {
  name: string;
  elo: number;
  winRate: number;
  wins: number;
  losses: number;
}

export interface SimMoveData {
  name: string;
  winRate: number;
  appearances: number;
}

export interface SimMetaSnapshot {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  dominantArchetypes: string[];
  underratedPokemon: string[];
  overratedPokemon: string[];
  bestCores: string[];
}

/** Pokemon simulation data keyed by "id" or "id-mega" */
export const SIM_POKEMON: Record<string, SimPokemonData> = {
  "3": {
    "id": 3,
    "name": "Venusaur",
    "isMega": false,
    "elo": 9345,
    "winRate": 51.5,
    "appearances": 259088,
    "wins": 133320,
    "losses": 125768,
    "bestPartners": [
      {
        "name": "Sinistcha",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Heat Rotom",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Decidueye",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Mega Blastoise",
        "winRate": 63,
        "games": 8469
      },
      {
        "name": "Archaludon",
        "winRate": 59.7,
        "games": 4450
      }
    ],
    "bestSets": []
  },
  "6": {
    "id": 6,
    "name": "Charizard",
    "isMega": false,
    "elo": 9185,
    "winRate": 49.7,
    "appearances": 327276,
    "wins": 162588,
    "losses": 164688,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Fan Rotom",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Mega Lucario",
        "winRate": 54.2,
        "games": 10062
      },
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 14824
      },
      {
        "name": "Sneasler",
        "winRate": 53.3,
        "games": 20125
      }
    ],
    "bestSets": []
  },
  "9": {
    "id": 9,
    "name": "Blastoise",
    "isMega": false,
    "elo": 9276,
    "winRate": 50.7,
    "appearances": 188504,
    "wins": 95544,
    "losses": 92960,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 61.1,
        "games": 12948
      },
      {
        "name": "Sinistcha",
        "winRate": 59.1,
        "games": 4533
      },
      {
        "name": "Hatterene",
        "winRate": 59.1,
        "games": 4533
      },
      {
        "name": "Mega Venusaur",
        "winRate": 56.6,
        "games": 13953
      },
      {
        "name": "Kleavor",
        "winRate": 54.6,
        "games": 4867
      }
    ],
    "bestSets": []
  },
  "15": {
    "id": 15,
    "name": "Beedrill",
    "isMega": false,
    "elo": 9223,
    "winRate": 46.3,
    "appearances": 10238,
    "wins": 4742,
    "losses": 5496,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 46.3,
        "games": 10238
      },
      {
        "name": "Incineroar",
        "winRate": 46.3,
        "games": 10238
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 46.3,
        "games": 10238
      },
      {
        "name": "Greninja",
        "winRate": 46.3,
        "games": 10238
      },
      {
        "name": "Garchomp",
        "winRate": 46.3,
        "games": 10238
      }
    ],
    "bestSets": []
  },
  "25": {
    "id": 25,
    "name": "Pikachu",
    "isMega": false,
    "elo": 9184,
    "winRate": 50.1,
    "appearances": 16582,
    "wins": 8306,
    "losses": 8276,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 50.2,
        "games": 5649
      },
      {
        "name": "Blastoise",
        "winRate": 50.2,
        "games": 5649
      },
      {
        "name": "Alcremie",
        "winRate": 50.2,
        "games": 11140
      },
      {
        "name": "Araquanid",
        "winRate": 50.2,
        "games": 5491
      },
      {
        "name": "Charizard",
        "winRate": 50.2,
        "games": 5491
      }
    ],
    "bestSets": []
  },
  "26": {
    "id": 26,
    "name": "Raichu",
    "isMega": false,
    "elo": 9261,
    "winRate": 49.9,
    "appearances": 21475,
    "wins": 10714,
    "losses": 10761,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.3,
        "games": 10790
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 10790
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.3,
        "games": 10790
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 21475
      },
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 21475
      }
    ],
    "bestSets": []
  },
  "36": {
    "id": 36,
    "name": "Clefable",
    "isMega": false,
    "elo": 9249,
    "winRate": 50.5,
    "appearances": 220206,
    "wins": 111101,
    "losses": 109105,
    "bestPartners": [
      {
        "name": "Hydrapple",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Archaludon",
        "winRate": 57.6,
        "games": 37527
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 57.5,
        "games": 9185
      },
      {
        "name": "Tinkaton",
        "winRate": 57.4,
        "games": 9324
      },
      {
        "name": "Mega Pinsir",
        "winRate": 56.9,
        "games": 4739
      }
    ],
    "bestSets": []
  },
  "38": {
    "id": 38,
    "name": "Ninetales",
    "isMega": false,
    "elo": 9244,
    "winRate": 50.5,
    "appearances": 84037,
    "wins": 42397,
    "losses": 41640,
    "bestPartners": [
      {
        "name": "Decidueye",
        "winRate": 56,
        "games": 4799
      },
      {
        "name": "Mega Scizor",
        "winRate": 56,
        "games": 4799
      },
      {
        "name": "Tatsugiri",
        "winRate": 56,
        "games": 4799
      },
      {
        "name": "Palafin",
        "winRate": 53.1,
        "games": 10166
      },
      {
        "name": "Incineroar",
        "winRate": 52.9,
        "games": 10044
      }
    ],
    "bestSets": []
  },
  "59": {
    "id": 59,
    "name": "Arcanine",
    "isMega": false,
    "elo": 9247,
    "winRate": 49.3,
    "appearances": 494148,
    "wins": 243746,
    "losses": 250402,
    "bestPartners": [
      {
        "name": "Conkeldurr",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Mega Garchomp",
        "winRate": 58.6,
        "games": 8978
      },
      {
        "name": "Mega Froslass",
        "winRate": 57.9,
        "games": 9143
      },
      {
        "name": "Mega Slowbro",
        "winRate": 57.3,
        "games": 9538
      },
      {
        "name": "Hydreigon",
        "winRate": 56.2,
        "games": 4774
      }
    ],
    "bestSets": []
  },
  "65": {
    "id": 65,
    "name": "Alakazam",
    "isMega": false,
    "elo": 9268,
    "winRate": 40.6,
    "appearances": 27169,
    "wins": 11022,
    "losses": 16147,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 49,
        "games": 10838
      },
      {
        "name": "Incineroar",
        "winRate": 49,
        "games": 10838
      },
      {
        "name": "Conkeldurr",
        "winRate": 49,
        "games": 10838
      },
      {
        "name": "Crabominable",
        "winRate": 49,
        "games": 10838
      },
      {
        "name": "Azumarill",
        "winRate": 49,
        "games": 10838
      }
    ],
    "bestSets": []
  },
  "71": {
    "id": 71,
    "name": "Victreebel",
    "isMega": false,
    "elo": 9245,
    "winRate": 50.4,
    "appearances": 21235,
    "wins": 10693,
    "losses": 10542,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.5,
        "games": 10548
      },
      {
        "name": "Alolan Raichu",
        "winRate": 50.5,
        "games": 10548
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.5,
        "games": 10548
      },
      {
        "name": "Slowbro",
        "winRate": 50.5,
        "games": 10548
      },
      {
        "name": "Mega Feraligatr",
        "winRate": 50.4,
        "games": 5374
      }
    ],
    "bestSets": []
  },
  "80": {
    "id": 80,
    "name": "Slowbro",
    "isMega": false,
    "elo": 9234,
    "winRate": 50.9,
    "appearances": 315245,
    "wins": 160432,
    "losses": 154813,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 66,
        "games": 12269
      },
      {
        "name": "Chesnaught",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Azumarill",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Clawitzer",
        "winRate": 57.1,
        "games": 4636
      }
    ],
    "bestSets": []
  },
  "94": {
    "id": 94,
    "name": "Gengar",
    "isMega": false,
    "elo": 9271,
    "winRate": 49.6,
    "appearances": 314730,
    "wins": 155997,
    "losses": 158733,
    "bestPartners": [
      {
        "name": "Mega Sableye",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Lopunny",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5230
      },
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 26413
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 21129
      }
    ],
    "bestSets": []
  },
  "115": {
    "id": 115,
    "name": "Kangaskhan",
    "isMega": false,
    "elo": 9237,
    "winRate": 49.4,
    "appearances": 26422,
    "wins": 13054,
    "losses": 13368,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 10551
      },
      {
        "name": "Mimikyu",
        "winRate": 49.7,
        "games": 10551
      },
      {
        "name": "Arcanine",
        "winRate": 49.7,
        "games": 10551
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 26422
      },
      {
        "name": "Incineroar",
        "winRate": 49.4,
        "games": 26422
      }
    ],
    "bestSets": []
  },
  "121": {
    "id": 121,
    "name": "Starmie",
    "isMega": false,
    "elo": 9238,
    "winRate": 50.8,
    "appearances": 63867,
    "wins": 32430,
    "losses": 31437,
    "bestPartners": [
      {
        "name": "Tinkaton",
        "winRate": 53.1,
        "games": 5104
      },
      {
        "name": "Kingambit",
        "winRate": 53.1,
        "games": 5104
      },
      {
        "name": "Empoleon",
        "winRate": 53.1,
        "games": 5104
      },
      {
        "name": "Mega Chesnaught",
        "winRate": 51.6,
        "games": 10452
      },
      {
        "name": "Heat Rotom",
        "winRate": 51.6,
        "games": 10452
      }
    ],
    "bestSets": []
  },
  "127": {
    "id": 127,
    "name": "Pinsir",
    "isMega": false,
    "elo": 9298,
    "winRate": 49.4,
    "appearances": 41223,
    "wins": 20349,
    "losses": 20874,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 10219
      },
      {
        "name": "Kingambit",
        "winRate": 54.1,
        "games": 10219
      },
      {
        "name": "Rhyperior",
        "winRate": 54.1,
        "games": 10219
      },
      {
        "name": "Wash Rotom",
        "winRate": 54.1,
        "games": 10219
      },
      {
        "name": "Tinkaton",
        "winRate": 54.1,
        "games": 10219
      }
    ],
    "bestSets": []
  },
  "130": {
    "id": 130,
    "name": "Gyarados",
    "isMega": false,
    "elo": 9274,
    "winRate": 50.2,
    "appearances": 1371273,
    "wins": 687948,
    "losses": 683325,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 72.5,
        "games": 3548
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 65.2,
        "games": 8138
      },
      {
        "name": "Mega Froslass",
        "winRate": 59.6,
        "games": 4369
      },
      {
        "name": "Mega Pinsir",
        "winRate": 58.8,
        "games": 9147
      },
      {
        "name": "Chesnaught",
        "winRate": 56.5,
        "games": 9657
      }
    ],
    "bestSets": []
  },
  "132": {
    "id": 132,
    "name": "Ditto",
    "isMega": false,
    "elo": 9190,
    "winRate": 44.6,
    "appearances": 14408,
    "wins": 6430,
    "losses": 7978,
    "bestPartners": [
      {
        "name": "Spiritomb",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Torkoal",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Garganacl",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Aggron",
        "winRate": 47.3,
        "games": 10105
      },
      {
        "name": "Gyarados",
        "winRate": 44.9,
        "games": 9460
      }
    ],
    "bestSets": []
  },
  "134": {
    "id": 134,
    "name": "Vaporeon",
    "isMega": false,
    "elo": 9252,
    "winRate": 49.9,
    "appearances": 58588,
    "wins": 29209,
    "losses": 29379,
    "bestPartners": [
      {
        "name": "Gourgeist",
        "winRate": 51,
        "games": 5405
      },
      {
        "name": "Azumarill",
        "winRate": 51,
        "games": 5405
      },
      {
        "name": "Wash Rotom",
        "winRate": 51,
        "games": 5405
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 51,
        "games": 5405
      },
      {
        "name": "Diggersby",
        "winRate": 50.2,
        "games": 5219
      }
    ],
    "bestSets": []
  },
  "135": {
    "id": 135,
    "name": "Jolteon",
    "isMega": false,
    "elo": 9246,
    "winRate": 50.3,
    "appearances": 16169,
    "wins": 8136,
    "losses": 8033,
    "bestPartners": [
      {
        "name": "Skarmory",
        "winRate": 50.5,
        "games": 5311
      },
      {
        "name": "Pinsir",
        "winRate": 50.5,
        "games": 5311
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5311
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.4,
        "games": 10779
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 16169
      }
    ],
    "bestSets": []
  },
  "136": {
    "id": 136,
    "name": "Flareon",
    "isMega": false,
    "elo": 9216,
    "winRate": 46.5,
    "appearances": 14995,
    "wins": 6971,
    "losses": 8024,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Quaquaval",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Weavile",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Starmie",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Palafin",
        "winRate": 50.7,
        "games": 5424
      }
    ],
    "bestSets": []
  },
  "142": {
    "id": 142,
    "name": "Aerodactyl",
    "isMega": false,
    "elo": 9221,
    "winRate": 49.7,
    "appearances": 38024,
    "wins": 18883,
    "losses": 19141,
    "bestPartners": [
      {
        "name": "Skarmory",
        "winRate": 50.5,
        "games": 5311
      },
      {
        "name": "Pinsir",
        "winRate": 50.5,
        "games": 5311
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5311
      },
      {
        "name": "Jolteon",
        "winRate": 50.4,
        "games": 10779
      },
      {
        "name": "Blastoise",
        "winRate": 50.3,
        "games": 5468
      }
    ],
    "bestSets": []
  },
  "143": {
    "id": 143,
    "name": "Snorlax",
    "isMega": false,
    "elo": 9270,
    "winRate": 50.9,
    "appearances": 69053,
    "wins": 35178,
    "losses": 33875,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 66,
        "games": 12269
      },
      {
        "name": "Kingambit",
        "winRate": 59.1,
        "games": 13740
      },
      {
        "name": "Hatterene",
        "winRate": 58.2,
        "games": 23154
      },
      {
        "name": "Tyranitar",
        "winRate": 57.8,
        "games": 9257
      },
      {
        "name": "Slowbro",
        "winRate": 56.6,
        "games": 28547
      }
    ],
    "bestSets": []
  },
  "149": {
    "id": 149,
    "name": "Dragonite",
    "isMega": false,
    "elo": 9237,
    "winRate": 48.8,
    "appearances": 475410,
    "wins": 231872,
    "losses": 243538,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Samurott",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Heat Rotom",
        "winRate": 51.7,
        "games": 10572
      },
      {
        "name": "Lucario",
        "winRate": 50.8,
        "games": 15866
      },
      {
        "name": "Mega Lucario Z",
        "winRate": 50.8,
        "games": 5312
      }
    ],
    "bestSets": []
  },
  "154": {
    "id": 154,
    "name": "Meganium",
    "isMega": false,
    "elo": 9244,
    "winRate": 51.6,
    "appearances": 14556,
    "wins": 7507,
    "losses": 7049,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 55.5,
        "games": 9758
      },
      {
        "name": "Tinkaton",
        "winRate": 55.5,
        "games": 9758
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 55.5,
        "games": 9758
      },
      {
        "name": "Primarina",
        "winRate": 55.5,
        "games": 9758
      },
      {
        "name": "Gyarados",
        "winRate": 51.6,
        "games": 14556
      }
    ],
    "bestSets": []
  },
  "157": {
    "id": 157,
    "name": "Typhlosion",
    "isMega": false,
    "elo": 9215,
    "winRate": 48.5,
    "appearances": 20845,
    "wins": 10109,
    "losses": 10736,
    "bestPartners": [
      {
        "name": "Vanilluxe",
        "winRate": 50.2,
        "games": 5357
      },
      {
        "name": "Krookodile",
        "winRate": 50.2,
        "games": 5357
      },
      {
        "name": "Delphox",
        "winRate": 50.2,
        "games": 5357
      },
      {
        "name": "Palafin",
        "winRate": 50.2,
        "games": 5357
      },
      {
        "name": "Ninetales",
        "winRate": 50,
        "games": 10592
      }
    ],
    "bestSets": []
  },
  "160": {
    "id": 160,
    "name": "Feraligatr",
    "isMega": false,
    "elo": 9283,
    "winRate": 50.7,
    "appearances": 88725,
    "wins": 45024,
    "losses": 43701,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 60.9,
        "games": 8719
      },
      {
        "name": "Mega Venusaur",
        "winRate": 59.2,
        "games": 8727
      },
      {
        "name": "Incineroar",
        "winRate": 53,
        "games": 30455
      },
      {
        "name": "Kleavor",
        "winRate": 52.8,
        "games": 5171
      },
      {
        "name": "Metagross",
        "winRate": 52.8,
        "games": 5171
      }
    ],
    "bestSets": []
  },
  "181": {
    "id": 181,
    "name": "Ampharos",
    "isMega": false,
    "elo": 9274,
    "winRate": 49.6,
    "appearances": 10496,
    "wins": 5205,
    "losses": 5291,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 10496
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 10496
      },
      {
        "name": "Charizard",
        "winRate": 49.6,
        "games": 10496
      },
      {
        "name": "Whimsicott",
        "winRate": 49.6,
        "games": 10496
      },
      {
        "name": "Krookodile",
        "winRate": 49.6,
        "games": 10496
      }
    ],
    "bestSets": []
  },
  "184": {
    "id": 184,
    "name": "Azumarill",
    "isMega": false,
    "elo": 9282,
    "winRate": 51.8,
    "appearances": 109145,
    "wins": 56526,
    "losses": 52619,
    "bestPartners": [
      {
        "name": "Mega Garchomp Z",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Primarina",
        "winRate": 62.4,
        "games": 8318
      },
      {
        "name": "Heat Rotom",
        "winRate": 58.2,
        "games": 13696
      },
      {
        "name": "Clawitzer",
        "winRate": 57.1,
        "games": 4636
      }
    ],
    "bestSets": []
  },
  "186": {
    "id": 186,
    "name": "Politoed",
    "isMega": false,
    "elo": 9280,
    "winRate": 50,
    "appearances": 189783,
    "wins": 94985,
    "losses": 94798,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 52.8,
        "games": 5171
      },
      {
        "name": "Metagross",
        "winRate": 52.8,
        "games": 5171
      },
      {
        "name": "Archaludon",
        "winRate": 52.8,
        "games": 5171
      },
      {
        "name": "Kingambit",
        "winRate": 51.4,
        "games": 10438
      },
      {
        "name": "Vivillon",
        "winRate": 50.6,
        "games": 5615
      }
    ],
    "bestSets": []
  },
  "196": {
    "id": 196,
    "name": "Espeon",
    "isMega": false,
    "elo": 9184,
    "winRate": 43.6,
    "appearances": 23579,
    "wins": 10277,
    "losses": 13302,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 50.7,
        "games": 5393
      },
      {
        "name": "Kommo-o",
        "winRate": 50.7,
        "games": 5393
      },
      {
        "name": "Sylveon",
        "winRate": 50.7,
        "games": 5393
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 10821
      },
      {
        "name": "Garbodor",
        "winRate": 50,
        "games": 5238
      }
    ],
    "bestSets": []
  },
  "197": {
    "id": 197,
    "name": "Umbreon",
    "isMega": false,
    "elo": 9234,
    "winRate": 49.4,
    "appearances": 48456,
    "wins": 23958,
    "losses": 24498,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 5568
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.8,
        "games": 5568
      },
      {
        "name": "Abomasnow",
        "winRate": 50.8,
        "games": 5568
      },
      {
        "name": "Garbodor",
        "winRate": 50.7,
        "games": 5503
      },
      {
        "name": "Weavile",
        "winRate": 50.7,
        "games": 5503
      }
    ],
    "bestSets": []
  },
  "199": {
    "id": 199,
    "name": "Slowking",
    "isMega": false,
    "elo": 9264,
    "winRate": 50,
    "appearances": 16023,
    "wins": 8012,
    "losses": 8011,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.1,
        "games": 5406
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.1,
        "games": 5406
      },
      {
        "name": "Ninetales",
        "winRate": 50.1,
        "games": 5406
      },
      {
        "name": "Drampa",
        "winRate": 50.1,
        "games": 5406
      },
      {
        "name": "Crabominable",
        "winRate": 50.1,
        "games": 10562
      }
    ],
    "bestSets": []
  },
  "208": {
    "id": 208,
    "name": "Steelix",
    "isMega": false,
    "elo": 9246,
    "winRate": 48.3,
    "appearances": 103566,
    "wins": 49998,
    "losses": 53568,
    "bestPartners": [
      {
        "name": "Mega Slowbro",
        "winRate": 52,
        "games": 10428
      },
      {
        "name": "Incineroar",
        "winRate": 51.5,
        "games": 15887
      },
      {
        "name": "Arcanine",
        "winRate": 51.5,
        "games": 15887
      },
      {
        "name": "Ursaluna",
        "winRate": 50.7,
        "games": 31967
      },
      {
        "name": "Tinkaton",
        "winRate": 50.7,
        "games": 5415
      }
    ],
    "bestSets": []
  },
  "212": {
    "id": 212,
    "name": "Scizor",
    "isMega": false,
    "elo": 9279,
    "winRate": 49.9,
    "appearances": 359913,
    "wins": 179487,
    "losses": 180426,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 55.3,
        "games": 4765
      },
      {
        "name": "Mega Floette",
        "winRate": 53.1,
        "games": 5136
      },
      {
        "name": "Archaludon",
        "winRate": 52.7,
        "games": 31344
      },
      {
        "name": "Kingambit",
        "winRate": 52.1,
        "games": 41829
      },
      {
        "name": "Floette",
        "winRate": 51.9,
        "games": 10649
      }
    ],
    "bestSets": []
  },
  "214": {
    "id": 214,
    "name": "Heracross",
    "isMega": false,
    "elo": 9271,
    "winRate": 52.1,
    "appearances": 30780,
    "wins": 16038,
    "losses": 14742,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Tyranitar",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Metagross",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Greninja",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Tinkaton",
        "winRate": 58.2,
        "games": 9110
      }
    ],
    "bestSets": []
  },
  "227": {
    "id": 227,
    "name": "Skarmory",
    "isMega": false,
    "elo": 9263,
    "winRate": 48.8,
    "appearances": 99370,
    "wins": 48466,
    "losses": 50904,
    "bestPartners": [
      {
        "name": "Mega Scovillain",
        "winRate": 50.7,
        "games": 5448
      },
      {
        "name": "Empoleon",
        "winRate": 50.7,
        "games": 5448
      },
      {
        "name": "Mega Tatsugiri",
        "winRate": 50.6,
        "games": 16061
      },
      {
        "name": "Steelix",
        "winRate": 50.5,
        "games": 10584
      },
      {
        "name": "Aggron",
        "winRate": 50.5,
        "games": 10617
      }
    ],
    "bestSets": []
  },
  "229": {
    "id": 229,
    "name": "Houndoom",
    "isMega": false,
    "elo": 9218,
    "winRate": 50.5,
    "appearances": 10629,
    "wins": 5368,
    "losses": 5261,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 10629
      },
      {
        "name": "Decidueye",
        "winRate": 50.5,
        "games": 10629
      },
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 10629
      },
      {
        "name": "Basculegion",
        "winRate": 50.5,
        "games": 10629
      },
      {
        "name": "Slowbro",
        "winRate": 50.5,
        "games": 10629
      }
    ],
    "bestSets": []
  },
  "248": {
    "id": 248,
    "name": "Tyranitar",
    "isMega": false,
    "elo": 9277,
    "winRate": 49.8,
    "appearances": 541933,
    "wins": 270015,
    "losses": 271918,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 69.4,
        "games": 3888
      },
      {
        "name": "Heracross",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Kingambit",
        "winRate": 58.1,
        "games": 9162
      },
      {
        "name": "Snorlax",
        "winRate": 57.8,
        "games": 9257
      },
      {
        "name": "Tinkaton",
        "winRate": 55.9,
        "games": 14321
      }
    ],
    "bestSets": []
  },
  "279": {
    "id": 279,
    "name": "Pelipper",
    "isMega": false,
    "elo": 9261,
    "winRate": 50.3,
    "appearances": 58439,
    "wins": 29382,
    "losses": 29057,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Greninja",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Primarina",
        "winRate": 52.1,
        "games": 10440
      },
      {
        "name": "Tatsugiri",
        "winRate": 51.5,
        "games": 10425
      },
      {
        "name": "Mega Excadrill",
        "winRate": 51,
        "games": 15729
      }
    ],
    "bestSets": []
  },
  "282": {
    "id": 282,
    "name": "Gardevoir",
    "isMega": false,
    "elo": 9310,
    "winRate": 49.5,
    "appearances": 419365,
    "wins": 207566,
    "losses": 211799,
    "bestPartners": [
      {
        "name": "Mamoswine",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Archaludon",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Gliscor",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Sneasler",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Mega Scizor",
        "winRate": 52.4,
        "games": 5229
      }
    ],
    "bestSets": []
  },
  "302": {
    "id": 302,
    "name": "Sableye",
    "isMega": false,
    "elo": 9282,
    "winRate": 49,
    "appearances": 45653,
    "wins": 22387,
    "losses": 23266,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 54.6,
        "games": 9921
      },
      {
        "name": "Garchomp",
        "winRate": 53,
        "games": 9988
      },
      {
        "name": "Dragapult",
        "winRate": 53,
        "games": 9988
      },
      {
        "name": "Whimsicott",
        "winRate": 52.9,
        "games": 15165
      },
      {
        "name": "Ursaluna",
        "winRate": 52.7,
        "games": 5107
      }
    ],
    "bestSets": []
  },
  "306": {
    "id": 306,
    "name": "Aggron",
    "isMega": false,
    "elo": 9201,
    "winRate": 48.2,
    "appearances": 101785,
    "wins": 49013,
    "losses": 52772,
    "bestPartners": [
      {
        "name": "Mega Garchomp Z",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Primarina",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Empoleon",
        "winRate": 54.2,
        "games": 10041
      },
      {
        "name": "Corviknight",
        "winRate": 54.2,
        "games": 10041
      },
      {
        "name": "Mega Scovillain",
        "winRate": 50.7,
        "games": 5448
      }
    ],
    "bestSets": []
  },
  "324": {
    "id": 324,
    "name": "Torkoal",
    "isMega": false,
    "elo": 9272,
    "winRate": 52.1,
    "appearances": 209391,
    "wins": 109085,
    "losses": 100306,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 69.4,
        "games": 3888
      },
      {
        "name": "Slowbro",
        "winRate": 66,
        "games": 12269
      },
      {
        "name": "Snorlax",
        "winRate": 66,
        "games": 12269
      },
      {
        "name": "Drampa",
        "winRate": 58.8,
        "games": 18254
      },
      {
        "name": "Mega Starmie",
        "winRate": 53.9,
        "games": 9769
      }
    ],
    "bestSets": []
  },
  "334": {
    "id": 334,
    "name": "Altaria",
    "isMega": false,
    "elo": 9233,
    "winRate": 47.5,
    "appearances": 120753,
    "wins": 57366,
    "losses": 63387,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Fan Rotom",
        "winRate": 53.9,
        "games": 10052
      },
      {
        "name": "Mega Lucario",
        "winRate": 52.9,
        "games": 15566
      },
      {
        "name": "Mega Delphox",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Greninja",
        "winRate": 51,
        "games": 5356
      }
    ],
    "bestSets": []
  },
  "350": {
    "id": 350,
    "name": "Milotic",
    "isMega": false,
    "elo": 9280,
    "winRate": 50.3,
    "appearances": 128500,
    "wins": 64637,
    "losses": 63863,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Azumarill",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Mega Venusaur",
        "winRate": 52.2,
        "games": 5226
      },
      {
        "name": "Empoleon",
        "winRate": 52.2,
        "games": 5226
      },
      {
        "name": "Tyranitar",
        "winRate": 52.2,
        "games": 5226
      }
    ],
    "bestSets": []
  },
  "359": {
    "id": 359,
    "name": "Absol",
    "isMega": false,
    "elo": 9202,
    "winRate": 49.3,
    "appearances": 10667,
    "wins": 5256,
    "losses": 5411,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.3,
        "games": 10667
      },
      {
        "name": "Arcanine",
        "winRate": 49.3,
        "games": 10667
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.3,
        "games": 10667
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 49.3,
        "games": 10667
      },
      {
        "name": "Charizard",
        "winRate": 49.3,
        "games": 10667
      }
    ],
    "bestSets": []
  },
  "376": {
    "id": 376,
    "name": "Metagross",
    "isMega": false,
    "elo": 9304,
    "winRate": 49.6,
    "appearances": 259625,
    "wins": 128849,
    "losses": 130776,
    "bestPartners": [
      {
        "name": "Heracross",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Tinkaton",
        "winRate": 54.4,
        "games": 19744
      },
      {
        "name": "Archaludon",
        "winRate": 52.9,
        "games": 35230
      },
      {
        "name": "Kleavor",
        "winRate": 52.8,
        "games": 5171
      },
      {
        "name": "Feraligatr",
        "winRate": 52.8,
        "games": 5171
      }
    ],
    "bestSets": []
  },
  "389": {
    "id": 389,
    "name": "Torterra",
    "isMega": false,
    "elo": 9250,
    "winRate": 47.3,
    "appearances": 15583,
    "wins": 7375,
    "losses": 8208,
    "bestPartners": [
      {
        "name": "Dragonite",
        "winRate": 49.8,
        "games": 5538
      },
      {
        "name": "Slowbro",
        "winRate": 49.8,
        "games": 5538
      },
      {
        "name": "Heat Rotom",
        "winRate": 49.8,
        "games": 5538
      },
      {
        "name": "Politoed",
        "winRate": 49.8,
        "games": 5538
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 48.6,
        "games": 10658
      }
    ],
    "bestSets": []
  },
  "392": {
    "id": 392,
    "name": "Infernape",
    "isMega": false,
    "elo": 9196,
    "winRate": 47.3,
    "appearances": 15269,
    "wins": 7224,
    "losses": 8045,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5407
      },
      {
        "name": "Archaludon",
        "winRate": 50.4,
        "games": 5407
      },
      {
        "name": "Greninja",
        "winRate": 50.4,
        "games": 5407
      },
      {
        "name": "Tinkaton",
        "winRate": 49.9,
        "games": 5461
      },
      {
        "name": "Fan Rotom",
        "winRate": 49.9,
        "games": 5461
      }
    ],
    "bestSets": []
  },
  "395": {
    "id": 395,
    "name": "Empoleon",
    "isMega": false,
    "elo": 9271,
    "winRate": 52.9,
    "appearances": 45944,
    "wins": 24291,
    "losses": 21653,
    "bestPartners": [
      {
        "name": "Mega Charizard X",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Tsareena",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Archaludon",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Primarina",
        "winRate": 58.4,
        "games": 4593
      }
    ],
    "bestSets": []
  },
  "428": {
    "id": 428,
    "name": "Lopunny",
    "isMega": false,
    "elo": 9279,
    "winRate": 50.4,
    "appearances": 10502,
    "wins": 5297,
    "losses": 5205,
    "bestPartners": [
      {
        "name": "Gengar",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Excadrill",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Mega Sableye",
        "winRate": 50.4,
        "games": 10502
      },
      {
        "name": "Snorlax",
        "winRate": 50.4,
        "games": 5218
      }
    ],
    "bestSets": []
  },
  "442": {
    "id": 442,
    "name": "Spiritomb",
    "isMega": false,
    "elo": 9195,
    "winRate": 47.8,
    "appearances": 15207,
    "wins": 7274,
    "losses": 7933,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Torkoal",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Garganacl",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Ditto",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Aggron",
        "winRate": 50.5,
        "games": 5157
      }
    ],
    "bestSets": []
  },
  "445": {
    "id": 445,
    "name": "Garchomp",
    "isMega": false,
    "elo": 9292,
    "winRate": 50.1,
    "appearances": 1743824,
    "wins": 872906,
    "losses": 870918,
    "bestPartners": [
      {
        "name": "Sinistcha",
        "winRate": 59.1,
        "games": 4533
      },
      {
        "name": "Mega Pinsir",
        "winRate": 56.9,
        "games": 4739
      },
      {
        "name": "Archaludon",
        "winRate": 56.6,
        "games": 38233
      },
      {
        "name": "Empoleon",
        "winRate": 56.6,
        "games": 9510
      },
      {
        "name": "Tsareena",
        "winRate": 56.4,
        "games": 9531
      }
    ],
    "bestSets": []
  },
  "448": {
    "id": 448,
    "name": "Lucario",
    "isMega": false,
    "elo": 9283,
    "winRate": 50.2,
    "appearances": 79424,
    "wins": 39908,
    "losses": 39516,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Hydreigon",
        "winRate": 54.2,
        "games": 9991
      },
      {
        "name": "Mega Metagross",
        "winRate": 53,
        "games": 5039
      },
      {
        "name": "Garchomp",
        "winRate": 51.8,
        "games": 10546
      }
    ],
    "bestSets": []
  },
  "450": {
    "id": 450,
    "name": "Hippowdon",
    "isMega": false,
    "elo": 9217,
    "winRate": 48.6,
    "appearances": 21110,
    "wins": 10253,
    "losses": 10857,
    "bestPartners": [
      {
        "name": "Mega Heracross",
        "winRate": 50.3,
        "games": 5415
      },
      {
        "name": "Archaludon",
        "winRate": 50.3,
        "games": 5415
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5415
      },
      {
        "name": "Slowbro",
        "winRate": 50.3,
        "games": 5415
      },
      {
        "name": "Hatterene",
        "winRate": 50.3,
        "games": 5415
      }
    ],
    "bestSets": []
  },
  "460": {
    "id": 460,
    "name": "Abomasnow",
    "isMega": false,
    "elo": 9217,
    "winRate": 47,
    "appearances": 45711,
    "wins": 21483,
    "losses": 24228,
    "bestPartners": [
      {
        "name": "Umbreon",
        "winRate": 50.8,
        "games": 5568
      },
      {
        "name": "Mega Chandelure",
        "winRate": 50.7,
        "games": 10989
      },
      {
        "name": "Milotic",
        "winRate": 50.6,
        "games": 5473
      },
      {
        "name": "Blastoise",
        "winRate": 50.6,
        "games": 5473
      },
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 5473
      }
    ],
    "bestSets": []
  },
  "461": {
    "id": 461,
    "name": "Weavile",
    "isMega": false,
    "elo": 9219,
    "winRate": 47.4,
    "appearances": 20305,
    "wins": 9632,
    "losses": 10673,
    "bestPartners": [
      {
        "name": "Flareon",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Quaquaval",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Starmie",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Palafin",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Garbodor",
        "winRate": 50.7,
        "games": 5503
      }
    ],
    "bestSets": []
  },
  "464": {
    "id": 464,
    "name": "Rhyperior",
    "isMega": false,
    "elo": 9214,
    "winRate": 50.4,
    "appearances": 275319,
    "wins": 138668,
    "losses": 136651,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 54.1,
        "games": 10219
      },
      {
        "name": "Slowbro",
        "winRate": 54,
        "games": 15011
      },
      {
        "name": "Snorlax",
        "winRate": 54,
        "games": 15011
      },
      {
        "name": "Wash Rotom",
        "winRate": 53.5,
        "games": 15470
      },
      {
        "name": "Drampa",
        "winRate": 52.8,
        "games": 20300
      }
    ],
    "bestSets": []
  },
  "470": {
    "id": 470,
    "name": "Leafeon",
    "isMega": false,
    "elo": 9286,
    "winRate": 50.5,
    "appearances": 15227,
    "wins": 7692,
    "losses": 7535,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 56,
        "games": 4821
      },
      {
        "name": "Heat Rotom",
        "winRate": 56,
        "games": 4821
      },
      {
        "name": "Tinkaton",
        "winRate": 56,
        "games": 4821
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 56,
        "games": 4821
      },
      {
        "name": "Primarina",
        "winRate": 56,
        "games": 4821
      }
    ],
    "bestSets": []
  },
  "471": {
    "id": 471,
    "name": "Glaceon",
    "isMega": false,
    "elo": 9296,
    "winRate": 50.4,
    "appearances": 16404,
    "wins": 8269,
    "losses": 8135,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 51,
        "games": 5497
      },
      {
        "name": "Whimsicott",
        "winRate": 51,
        "games": 5497
      },
      {
        "name": "Mega Metagross",
        "winRate": 50.6,
        "games": 10983
      },
      {
        "name": "Froslass",
        "winRate": 50.6,
        "games": 10983
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 16404
      }
    ],
    "bestSets": []
  },
  "472": {
    "id": 472,
    "name": "Gliscor",
    "isMega": false,
    "elo": 9332,
    "winRate": 53.5,
    "appearances": 59427,
    "wins": 31776,
    "losses": 27651,
    "bestPartners": [
      {
        "name": "Mega Lucario",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Fan Rotom",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Charizard",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Mamoswine",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Gardevoir",
        "winRate": 58.6,
        "games": 4512
      }
    ],
    "bestSets": []
  },
  "473": {
    "id": 473,
    "name": "Mamoswine",
    "isMega": false,
    "elo": 9251,
    "winRate": 47.4,
    "appearances": 23913,
    "wins": 11339,
    "losses": 12574,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Archaludon",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Gliscor",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Sneasler",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Gardevoir",
        "winRate": 58.6,
        "games": 4512
      }
    ],
    "bestSets": []
  },
  "475": {
    "id": 475,
    "name": "Gallade",
    "isMega": false,
    "elo": 9110,
    "winRate": 40.6,
    "appearances": 9145,
    "wins": 3712,
    "losses": 5433,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 40.6,
        "games": 9145
      },
      {
        "name": "Kingambit",
        "winRate": 40.6,
        "games": 9145
      },
      {
        "name": "Aggron",
        "winRate": 40.6,
        "games": 9145
      },
      {
        "name": "Steelix",
        "winRate": 40.6,
        "games": 9145
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 40.6,
        "games": 9145
      }
    ],
    "bestSets": []
  },
  "478": {
    "id": 478,
    "name": "Froslass",
    "isMega": false,
    "elo": 9312,
    "winRate": 48.6,
    "appearances": 31565,
    "wins": 15352,
    "losses": 16213,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 51,
        "games": 5497
      },
      {
        "name": "Glaceon",
        "winRate": 50.6,
        "games": 10983
      },
      {
        "name": "Mega Metagross",
        "winRate": 50.6,
        "games": 10983
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 10983
      },
      {
        "name": "Skarmory",
        "winRate": 50.3,
        "games": 5486
      }
    ],
    "bestSets": []
  },
  "479": {
    "id": 479,
    "name": "Rotom",
    "isMega": false,
    "elo": 9256,
    "winRate": 50.2,
    "appearances": 57484,
    "wins": 28841,
    "losses": 28643,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Archaludon",
        "winRate": 52.6,
        "games": 20789
      },
      {
        "name": "Floette",
        "winRate": 51.9,
        "games": 10649
      },
      {
        "name": "Incineroar",
        "winRate": 51.9,
        "games": 10296
      },
      {
        "name": "Scizor",
        "winRate": 51.8,
        "games": 21245
      }
    ],
    "bestSets": []
  },
  "497": {
    "id": 497,
    "name": "Serperior",
    "isMega": false,
    "elo": 9252,
    "winRate": 50.6,
    "appearances": 56476,
    "wins": 28551,
    "losses": 27925,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 59.7,
        "games": 4450
      },
      {
        "name": "Tsareena",
        "winRate": 59.7,
        "games": 4450
      },
      {
        "name": "Krookodile",
        "winRate": 59.7,
        "games": 4450
      },
      {
        "name": "Mega Blastoise",
        "winRate": 58.9,
        "games": 4502
      },
      {
        "name": "Mega Feraligatr",
        "winRate": 54.7,
        "games": 9933
      }
    ],
    "bestSets": []
  },
  "500": {
    "id": 500,
    "name": "Emboar",
    "isMega": false,
    "elo": 9254,
    "winRate": 50.5,
    "appearances": 16233,
    "wins": 8202,
    "losses": 8031,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 10794
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 10794
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 10794
      },
      {
        "name": "Starmie",
        "winRate": 50.7,
        "games": 10794
      },
      {
        "name": "Alolan Raichu",
        "winRate": 50.7,
        "games": 10794
      }
    ],
    "bestSets": []
  },
  "503": {
    "id": 503,
    "name": "Samurott",
    "isMega": false,
    "elo": 9265,
    "winRate": 51,
    "appearances": 15802,
    "wins": 8053,
    "losses": 7749,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Heat Rotom",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Azumarill",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Dragonite",
        "winRate": 53.9,
        "games": 5034
      },
      {
        "name": "Milotic",
        "winRate": 51.8,
        "games": 10481
      }
    ],
    "bestSets": []
  },
  "530": {
    "id": 530,
    "name": "Excadrill",
    "isMega": false,
    "elo": 9318,
    "winRate": 49.3,
    "appearances": 502874,
    "wins": 247728,
    "losses": 255146,
    "bestPartners": [
      {
        "name": "Mega Starmie",
        "winRate": 58.2,
        "games": 4582
      },
      {
        "name": "Drampa",
        "winRate": 58.2,
        "games": 4582
      },
      {
        "name": "Ursaluna",
        "winRate": 52.3,
        "games": 15220
      },
      {
        "name": "Chesnaught",
        "winRate": 51.8,
        "games": 5419
      },
      {
        "name": "Torkoal",
        "winRate": 51.3,
        "games": 30711
      }
    ],
    "bestSets": []
  },
  "531": {
    "id": 531,
    "name": "Audino",
    "isMega": false,
    "elo": 9212,
    "winRate": 50.4,
    "appearances": 16258,
    "wins": 8187,
    "losses": 8071,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 10799
      },
      {
        "name": "Slowbro",
        "winRate": 50.6,
        "games": 10799
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.6,
        "games": 10799
      },
      {
        "name": "Galarian Slowking",
        "winRate": 50.6,
        "games": 10799
      },
      {
        "name": "Hatterene",
        "winRate": 50.4,
        "games": 16258
      }
    ],
    "bestSets": []
  },
  "534": {
    "id": 534,
    "name": "Conkeldurr",
    "isMega": false,
    "elo": 9294,
    "winRate": 51.1,
    "appearances": 73405,
    "wins": 37511,
    "losses": 35894,
    "bestPartners": [
      {
        "name": "Mega Slowbro",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Arcanine",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Sneasler",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Farigiraf",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Hatterene",
        "winRate": 55.9,
        "games": 4924
      }
    ],
    "bestSets": []
  },
  "547": {
    "id": 547,
    "name": "Whimsicott",
    "isMega": false,
    "elo": 9301,
    "winRate": 49.7,
    "appearances": 1031253,
    "wins": 512126,
    "losses": 519127,
    "bestPartners": [
      {
        "name": "Sinistcha",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Glimmora",
        "winRate": 62.1,
        "games": 4220
      },
      {
        "name": "Heat Rotom",
        "winRate": 55.5,
        "games": 14583
      },
      {
        "name": "Mega Blastoise",
        "winRate": 54.2,
        "games": 39298
      },
      {
        "name": "Archaludon",
        "winRate": 53.2,
        "games": 35697
      }
    ],
    "bestSets": []
  },
  "553": {
    "id": 553,
    "name": "Krookodile",
    "isMega": false,
    "elo": 9246,
    "winRate": 50,
    "appearances": 499190,
    "wins": 249818,
    "losses": 249372,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Goodra",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Sinistcha",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Decidueye",
        "winRate": 61.2,
        "games": 8682
      },
      {
        "name": "Mega Feraligatr",
        "winRate": 59.7,
        "games": 4450
      }
    ],
    "bestSets": []
  },
  "569": {
    "id": 569,
    "name": "Garbodor",
    "isMega": false,
    "elo": 9220,
    "winRate": 49.8,
    "appearances": 15997,
    "wins": 7964,
    "losses": 8033,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5503
      },
      {
        "name": "Umbreon",
        "winRate": 50.7,
        "games": 5503
      },
      {
        "name": "Weavile",
        "winRate": 50.7,
        "games": 5503
      },
      {
        "name": "Greninja",
        "winRate": 50.4,
        "games": 10741
      },
      {
        "name": "Farigiraf",
        "winRate": 50,
        "games": 5238
      }
    ],
    "bestSets": []
  },
  "571": {
    "id": 571,
    "name": "Zoroark",
    "isMega": false,
    "elo": 9226,
    "winRate": 48.7,
    "appearances": 21019,
    "wins": 10235,
    "losses": 10784,
    "bestPartners": [
      {
        "name": "Farigiraf",
        "winRate": 50.6,
        "games": 5155
      },
      {
        "name": "Mega Gengar",
        "winRate": 50.1,
        "games": 10574
      },
      {
        "name": "Incineroar",
        "winRate": 48.7,
        "games": 21019
      },
      {
        "name": "Greninja",
        "winRate": 48.7,
        "games": 21019
      },
      {
        "name": "Umbreon",
        "winRate": 48.7,
        "games": 21019
      }
    ],
    "bestSets": []
  },
  "584": {
    "id": 584,
    "name": "Vanilluxe",
    "isMega": false,
    "elo": 9232,
    "winRate": 50.1,
    "appearances": 16199,
    "wins": 8112,
    "losses": 8087,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5465
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 5465
      },
      {
        "name": "Emolga",
        "winRate": 50.5,
        "games": 5465
      },
      {
        "name": "Ninetales",
        "winRate": 50.2,
        "games": 5357
      },
      {
        "name": "Krookodile",
        "winRate": 50.2,
        "games": 5357
      }
    ],
    "bestSets": []
  },
  "587": {
    "id": 587,
    "name": "Emolga",
    "isMega": false,
    "elo": 9249,
    "winRate": 44.7,
    "appearances": 43407,
    "wins": 19390,
    "losses": 24017,
    "bestPartners": [
      {
        "name": "Mega Emboar",
        "winRate": 51.4,
        "games": 5252
      },
      {
        "name": "Starmie",
        "winRate": 51.4,
        "games": 5252
      },
      {
        "name": "Archaludon",
        "winRate": 51.4,
        "games": 5252
      },
      {
        "name": "Vanilluxe",
        "winRate": 50.5,
        "games": 5465
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 10886
      }
    ],
    "bestSets": []
  },
  "609": {
    "id": 609,
    "name": "Chandelure",
    "isMega": false,
    "elo": 9247,
    "winRate": 47.2,
    "appearances": 30900,
    "wins": 14583,
    "losses": 16317,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 50.3,
        "games": 5583
      },
      {
        "name": "Gyarados",
        "winRate": 49.3,
        "games": 10753
      },
      {
        "name": "Snorlax",
        "winRate": 49.3,
        "games": 10753
      },
      {
        "name": "Dragonite",
        "winRate": 49.3,
        "games": 10753
      },
      {
        "name": "Azumarill",
        "winRate": 49.3,
        "games": 10753
      }
    ],
    "bestSets": []
  },
  "618": {
    "id": 618,
    "name": "Stunfisk",
    "isMega": false,
    "elo": 9242,
    "winRate": 48.1,
    "appearances": 20873,
    "wins": 10047,
    "losses": 10826,
    "bestPartners": [
      {
        "name": "Mega Scovillain",
        "winRate": 49.8,
        "games": 5275
      },
      {
        "name": "Klefki",
        "winRate": 49.8,
        "games": 5275
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 5275
      },
      {
        "name": "Tyranitar",
        "winRate": 49.8,
        "games": 5275
      },
      {
        "name": "Mega Gyarados",
        "winRate": 49.3,
        "games": 5339
      }
    ],
    "bestSets": []
  },
  "623": {
    "id": 623,
    "name": "Golurk",
    "isMega": false,
    "elo": 9239,
    "winRate": 47.7,
    "appearances": 15000,
    "wins": 7150,
    "losses": 7850,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 10317
      },
      {
        "name": "Greninja",
        "winRate": 49.8,
        "games": 5082
      },
      {
        "name": "Arcanine",
        "winRate": 49.8,
        "games": 5082
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 5082
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 10317
      }
    ],
    "bestSets": []
  },
  "635": {
    "id": 635,
    "name": "Hydreigon",
    "isMega": false,
    "elo": 9280,
    "winRate": 49.6,
    "appearances": 144075,
    "wins": 71395,
    "losses": 72680,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 57.7,
        "games": 9261
      },
      {
        "name": "Ursaluna",
        "winRate": 57.7,
        "games": 9261
      },
      {
        "name": "Arcanine",
        "winRate": 56.2,
        "games": 4774
      },
      {
        "name": "Conkeldurr",
        "winRate": 55.8,
        "games": 4834
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54.4,
        "games": 9556
      }
    ],
    "bestSets": []
  },
  "637": {
    "id": 637,
    "name": "Volcarona",
    "isMega": false,
    "elo": 9244,
    "winRate": 47.4,
    "appearances": 15660,
    "wins": 7418,
    "losses": 8242,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 49.7,
        "games": 5491
      },
      {
        "name": "Chesnaught",
        "winRate": 49.7,
        "games": 5491
      },
      {
        "name": "Greninja",
        "winRate": 49.7,
        "games": 5491
      },
      {
        "name": "Quaquaval",
        "winRate": 49.7,
        "games": 5491
      },
      {
        "name": "Rhyperior",
        "winRate": 48.8,
        "games": 10819
      }
    ],
    "bestSets": []
  },
  "652": {
    "id": 652,
    "name": "Chesnaught",
    "isMega": false,
    "elo": 9298,
    "winRate": 50.2,
    "appearances": 56780,
    "wins": 28531,
    "losses": 28249,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Slowbro",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Kingambit",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Gyarados",
        "winRate": 56.5,
        "games": 9657
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 54.3,
        "games": 9498
      }
    ],
    "bestSets": []
  },
  "655": {
    "id": 655,
    "name": "Delphox",
    "isMega": false,
    "elo": 9279,
    "winRate": 50.5,
    "appearances": 26770,
    "wins": 13514,
    "losses": 13256,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 51.1,
        "games": 10652
      },
      {
        "name": "Drampa",
        "winRate": 51.1,
        "games": 10652
      },
      {
        "name": "Azumarill",
        "winRate": 51.1,
        "games": 10652
      },
      {
        "name": "Greninja",
        "winRate": 51.1,
        "games": 10652
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 16036
      }
    ],
    "bestSets": []
  },
  "658": {
    "id": 658,
    "name": "Greninja",
    "isMega": false,
    "elo": 9317,
    "winRate": 50.1,
    "appearances": 363834,
    "wins": 182285,
    "losses": 181549,
    "bestPartners": [
      {
        "name": "Heracross",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Archaludon",
        "winRate": 55.2,
        "games": 24362
      },
      {
        "name": "Mega Delphox",
        "winRate": 54,
        "games": 15272
      },
      {
        "name": "Mega Excadrill",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Pelipper",
        "winRate": 53.4,
        "games": 5109
      }
    ],
    "bestSets": []
  },
  "660": {
    "id": 660,
    "name": "Diggersby",
    "isMega": false,
    "elo": 9244,
    "winRate": 48.3,
    "appearances": 15593,
    "wins": 7529,
    "losses": 8064,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.2,
        "games": 5219
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 5219
      },
      {
        "name": "Vaporeon",
        "winRate": 50.2,
        "games": 5219
      },
      {
        "name": "Charizard",
        "winRate": 50,
        "games": 10668
      },
      {
        "name": "Slowbro",
        "winRate": 50,
        "games": 10668
      }
    ],
    "bestSets": []
  },
  "663": {
    "id": 663,
    "name": "Talonflame",
    "isMega": false,
    "elo": 9268,
    "winRate": 47.3,
    "appearances": 15156,
    "wins": 7162,
    "losses": 7994,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 50.9,
        "games": 5371
      },
      {
        "name": "Incineroar",
        "winRate": 50.9,
        "games": 5371
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 50.9,
        "games": 5371
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 5371
      },
      {
        "name": "Garchomp",
        "winRate": 47.4,
        "games": 10157
      }
    ],
    "bestSets": []
  },
  "666": {
    "id": 666,
    "name": "Vivillon",
    "isMega": false,
    "elo": 9227,
    "winRate": 47.5,
    "appearances": 15521,
    "wins": 7365,
    "losses": 8156,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Orthworm",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Politoed",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Garganacl",
        "winRate": 49.6,
        "games": 5498
      }
    ],
    "bestSets": []
  },
  "670": {
    "id": 670,
    "name": "Floette",
    "isMega": false,
    "elo": 9237,
    "winRate": 51.9,
    "appearances": 10649,
    "wins": 5524,
    "losses": 5125,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 51.9,
        "games": 10649
      },
      {
        "name": "Kingambit",
        "winRate": 51.9,
        "games": 10649
      },
      {
        "name": "Scizor",
        "winRate": 51.9,
        "games": 10649
      },
      {
        "name": "Rotom",
        "winRate": 51.9,
        "games": 10649
      },
      {
        "name": "Gyarados",
        "winRate": 51.9,
        "games": 10649
      }
    ],
    "bestSets": []
  },
  "676": {
    "id": 676,
    "name": "Furfrou",
    "isMega": false,
    "elo": 9208,
    "winRate": 49.4,
    "appearances": 15979,
    "wins": 7887,
    "losses": 8092,
    "bestPartners": [
      {
        "name": "Rotom",
        "winRate": 50.7,
        "games": 5418
      },
      {
        "name": "Slowbro",
        "winRate": 50.7,
        "games": 5418
      },
      {
        "name": "Arcanine",
        "winRate": 50.1,
        "games": 10742
      },
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 5324
      },
      {
        "name": "Krookodile",
        "winRate": 49.5,
        "games": 5324
      }
    ],
    "bestSets": []
  },
  "678": {
    "id": 678,
    "name": "Meowstic",
    "isMega": false,
    "elo": 9146,
    "winRate": 45.7,
    "appearances": 15006,
    "wins": 6851,
    "losses": 8155,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 48.6,
        "games": 10703
      },
      {
        "name": "Krookodile",
        "winRate": 48.6,
        "games": 10703
      },
      {
        "name": "Kingambit",
        "winRate": 48.6,
        "games": 10703
      },
      {
        "name": "Conkeldurr",
        "winRate": 48.6,
        "games": 10703
      },
      {
        "name": "Crabominable",
        "winRate": 48.6,
        "games": 10703
      }
    ],
    "bestSets": []
  },
  "681": {
    "id": 681,
    "name": "Aegislash",
    "isMega": false,
    "elo": 9272,
    "winRate": 49.6,
    "appearances": 410245,
    "wins": 203672,
    "losses": 206573,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 56.2,
        "games": 9362
      },
      {
        "name": "Archaludon",
        "winRate": 55.5,
        "games": 14250
      },
      {
        "name": "Mega Clefable",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Basculegion",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Krookodile",
        "winRate": 51.8,
        "games": 25050
      }
    ],
    "bestSets": []
  },
  "693": {
    "id": 693,
    "name": "Clawitzer",
    "isMega": false,
    "elo": 9285,
    "winRate": 52.6,
    "appearances": 15042,
    "wins": 7907,
    "losses": 7135,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Azumarill",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Slowbro",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Primarina",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Incineroar",
        "winRate": 52.6,
        "games": 15042
      }
    ],
    "bestSets": []
  },
  "697": {
    "id": 697,
    "name": "Tyrantrum",
    "isMega": false,
    "elo": 9173,
    "winRate": 49.9,
    "appearances": 15891,
    "wins": 7934,
    "losses": 7957,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.6,
        "games": 5361
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.6,
        "games": 5361
      },
      {
        "name": "Slowbro",
        "winRate": 50.6,
        "games": 5361
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 10632
      },
      {
        "name": "Decidueye",
        "winRate": 50,
        "games": 5271
      }
    ],
    "bestSets": []
  },
  "699": {
    "id": 699,
    "name": "Aurorus",
    "isMega": false,
    "elo": 9181,
    "winRate": 38.7,
    "appearances": 12996,
    "wins": 5026,
    "losses": 7970,
    "bestPartners": [
      {
        "name": "Meganium",
        "winRate": 43.7,
        "games": 4798
      },
      {
        "name": "Venusaur",
        "winRate": 43.7,
        "games": 4798
      },
      {
        "name": "Gyarados",
        "winRate": 42.3,
        "games": 9373
      },
      {
        "name": "Serperior",
        "winRate": 42.3,
        "games": 9373
      },
      {
        "name": "Emolga",
        "winRate": 40.8,
        "games": 4575
      }
    ],
    "bestSets": []
  },
  "700": {
    "id": 700,
    "name": "Sylveon",
    "isMega": false,
    "elo": 9296,
    "winRate": 51.1,
    "appearances": 41488,
    "wins": 21213,
    "losses": 20275,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 56.5,
        "games": 4831
      },
      {
        "name": "Sneasler",
        "winRate": 56.5,
        "games": 4831
      },
      {
        "name": "Gliscor",
        "winRate": 56.5,
        "games": 4831
      },
      {
        "name": "Slowbro",
        "winRate": 56.5,
        "games": 4831
      },
      {
        "name": "Mega Gyarados",
        "winRate": 53.1,
        "games": 10093
      }
    ],
    "bestSets": []
  },
  "701": {
    "id": 701,
    "name": "Hawlucha",
    "isMega": false,
    "elo": 9235,
    "winRate": 48,
    "appearances": 106339,
    "wins": 51001,
    "losses": 55338,
    "bestPartners": [
      {
        "name": "Mega Delphox",
        "winRate": 58.6,
        "games": 4634
      },
      {
        "name": "Kingambit",
        "winRate": 58.6,
        "games": 4634
      },
      {
        "name": "Mega Excadrill",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Tatsugiri",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Pelipper",
        "winRate": 53.4,
        "games": 5109
      }
    ],
    "bestSets": []
  },
  "706": {
    "id": 706,
    "name": "Goodra",
    "isMega": false,
    "elo": 9212,
    "winRate": 48.9,
    "appearances": 28638,
    "wins": 14017,
    "losses": 14621,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Decidueye",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Sinistcha",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Tsareena",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Krookodile",
        "winRate": 67.6,
        "games": 3883
      }
    ],
    "bestSets": []
  },
  "707": {
    "id": 707,
    "name": "Klefki",
    "isMega": false,
    "elo": 9226,
    "winRate": 50.2,
    "appearances": 52108,
    "wins": 26137,
    "losses": 25971,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Corviknight",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Primarina",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 53.5,
        "games": 9951
      },
      {
        "name": "Mega Tatsugiri",
        "winRate": 50.9,
        "games": 5477
      }
    ],
    "bestSets": []
  },
  "709": {
    "id": 709,
    "name": "Trevenant",
    "isMega": false,
    "elo": 9282,
    "winRate": 49.8,
    "appearances": 15968,
    "wins": 7960,
    "losses": 8008,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.4,
        "games": 5198
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 5198
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 5198
      },
      {
        "name": "Slowbro",
        "winRate": 50.4,
        "games": 5198
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5198
      }
    ],
    "bestSets": []
  },
  "711": {
    "id": 711,
    "name": "Gourgeist",
    "isMega": false,
    "elo": 9215,
    "winRate": 51.8,
    "appearances": 15648,
    "wins": 8106,
    "losses": 7542,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 54.4,
        "games": 4980
      },
      {
        "name": "Azumarill",
        "winRate": 52.6,
        "games": 10385
      },
      {
        "name": "Blastoise",
        "winRate": 52.2,
        "games": 10243
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 52.2,
        "games": 10243
      },
      {
        "name": "Arcanine",
        "winRate": 52.2,
        "games": 10243
      }
    ],
    "bestSets": []
  },
  "715": {
    "id": 715,
    "name": "Noivern",
    "isMega": false,
    "elo": 9260,
    "winRate": 49.6,
    "appearances": 52798,
    "wins": 26173,
    "losses": 26625,
    "bestPartners": [
      {
        "name": "Mega Lucario Z",
        "winRate": 50.8,
        "games": 5312
      },
      {
        "name": "Mega Emboar",
        "winRate": 50.7,
        "games": 5452
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 5452
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5452
      },
      {
        "name": "Alolan Raichu",
        "winRate": 50.7,
        "games": 5452
      }
    ],
    "bestSets": []
  },
  "724": {
    "id": 724,
    "name": "Decidueye",
    "isMega": false,
    "elo": 9185,
    "winRate": 51.7,
    "appearances": 69949,
    "wins": 36148,
    "losses": 33801,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Venusaur",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Mega Blastoise",
        "winRate": 67.7,
        "games": 7850
      },
      {
        "name": "Goodra",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Tsareena",
        "winRate": 67.6,
        "games": 3883
      }
    ],
    "bestSets": []
  },
  "727": {
    "id": 727,
    "name": "Incineroar",
    "isMega": false,
    "elo": 9288,
    "winRate": 50.1,
    "appearances": 2036292,
    "wins": 1019984,
    "losses": 1016308,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 59.2,
        "games": 8727
      },
      {
        "name": "Mega Froslass",
        "winRate": 57.9,
        "games": 9143
      },
      {
        "name": "Mega Slowbro",
        "winRate": 57.3,
        "games": 9538
      },
      {
        "name": "Sandaconda",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Mega Abomasnow",
        "winRate": 56.3,
        "games": 4809
      }
    ],
    "bestSets": []
  },
  "730": {
    "id": 730,
    "name": "Primarina",
    "isMega": false,
    "elo": 9330,
    "winRate": 54.5,
    "appearances": 108827,
    "wins": 59336,
    "losses": 49491,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 70.8,
        "games": 7338
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 63.2,
        "games": 8275
      },
      {
        "name": "Azumarill",
        "winRate": 62.4,
        "games": 8318
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 61.7,
        "games": 12660
      },
      {
        "name": "Archaludon",
        "winRate": 60.4,
        "games": 4522
      }
    ],
    "bestSets": []
  },
  "733": {
    "id": 733,
    "name": "Toucannon",
    "isMega": false,
    "elo": 9224,
    "winRate": 50,
    "appearances": 15569,
    "wins": 7777,
    "losses": 7792,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 5024
      },
      {
        "name": "Incineroar",
        "winRate": 53.8,
        "games": 5024
      },
      {
        "name": "Pawmot",
        "winRate": 51.4,
        "games": 10424
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 10169
      },
      {
        "name": "Krookodile",
        "winRate": 50.4,
        "games": 10169
      }
    ],
    "bestSets": []
  },
  "740": {
    "id": 740,
    "name": "Crabominable",
    "isMega": false,
    "elo": 9257,
    "winRate": 48.6,
    "appearances": 83915,
    "wins": 40800,
    "losses": 43115,
    "bestPartners": [
      {
        "name": "Starmie",
        "winRate": 50.5,
        "games": 10823
      },
      {
        "name": "Ursaluna",
        "winRate": 50.3,
        "games": 21166
      },
      {
        "name": "Torkoal",
        "winRate": 50.3,
        "games": 21166
      },
      {
        "name": "Mega Starmie",
        "winRate": 50.1,
        "games": 5187
      },
      {
        "name": "Slowking",
        "winRate": 50.1,
        "games": 10562
      }
    ],
    "bestSets": []
  },
  "745": {
    "id": 745,
    "name": "Lycanroc",
    "isMega": false,
    "elo": 9286,
    "winRate": 46.3,
    "appearances": 14912,
    "wins": 6900,
    "losses": 8012,
    "bestPartners": [
      {
        "name": "Araquanid",
        "winRate": 49.7,
        "games": 5376
      },
      {
        "name": "Pelipper",
        "winRate": 49.7,
        "games": 5376
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 10674
      },
      {
        "name": "Whimsicott",
        "winRate": 49.1,
        "games": 5298
      },
      {
        "name": "Decidueye",
        "winRate": 49.1,
        "games": 5298
      }
    ],
    "bestSets": []
  },
  "748": {
    "id": 748,
    "name": "Toxapex",
    "isMega": false,
    "elo": 9238,
    "winRate": 49.4,
    "appearances": 43004,
    "wins": 21223,
    "losses": 21781,
    "bestPartners": [
      {
        "name": "Oranguru",
        "winRate": 50.8,
        "games": 5381
      },
      {
        "name": "Clefable",
        "winRate": 50.8,
        "games": 5381
      },
      {
        "name": "Dondozo",
        "winRate": 50.8,
        "games": 5381
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 10804
      },
      {
        "name": "Garganacl",
        "winRate": 49.8,
        "games": 5423
      }
    ],
    "bestSets": []
  },
  "750": {
    "id": 750,
    "name": "Mudsdale",
    "isMega": false,
    "elo": 9221,
    "winRate": 49.7,
    "appearances": 15785,
    "wins": 7841,
    "losses": 7944,
    "bestPartners": [
      {
        "name": "Politoed",
        "winRate": 50.2,
        "games": 5255
      },
      {
        "name": "Vaporeon",
        "winRate": 49.7,
        "games": 15785
      },
      {
        "name": "Blastoise",
        "winRate": 49.7,
        "games": 15785
      },
      {
        "name": "Milotic",
        "winRate": 49.7,
        "games": 10505
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 10505
      }
    ],
    "bestSets": []
  },
  "752": {
    "id": 752,
    "name": "Araquanid",
    "isMega": false,
    "elo": 9187,
    "winRate": 46.8,
    "appearances": 30191,
    "wins": 14116,
    "losses": 16075,
    "bestPartners": [
      {
        "name": "Mega Delphox",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Altaria",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Azumarill",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Pikachu",
        "winRate": 50.2,
        "games": 5491
      }
    ],
    "bestSets": []
  },
  "763": {
    "id": 763,
    "name": "Tsareena",
    "isMega": false,
    "elo": 9302,
    "winRate": 53.3,
    "appearances": 50224,
    "wins": 26783,
    "losses": 23441,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Decidueye",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Goodra",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Sinistcha",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Mega Charizard X",
        "winRate": 64.4,
        "games": 4171
      }
    ],
    "bestSets": []
  },
  "765": {
    "id": 765,
    "name": "Oranguru",
    "isMega": false,
    "elo": 9210,
    "winRate": 51.5,
    "appearances": 31350,
    "wins": 16146,
    "losses": 15204,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 51.7,
        "games": 25969
      },
      {
        "name": "Venusaur",
        "winRate": 51.7,
        "games": 25969
      },
      {
        "name": "Hatterene",
        "winRate": 51.7,
        "games": 25969
      },
      {
        "name": "Rhyperior",
        "winRate": 51.7,
        "games": 20916
      },
      {
        "name": "Incineroar",
        "winRate": 51.5,
        "games": 31350
      }
    ],
    "bestSets": []
  },
  "778": {
    "id": 778,
    "name": "Mimikyu",
    "isMega": false,
    "elo": 9287,
    "winRate": 47.8,
    "appearances": 66641,
    "wins": 31847,
    "losses": 34794,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 51,
        "games": 5281
      },
      {
        "name": "Conkeldurr",
        "winRate": 51,
        "games": 5281
      },
      {
        "name": "Aegislash",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Hatterene",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Gardevoir",
        "winRate": 50.4,
        "games": 5350
      }
    ],
    "bestSets": []
  },
  "780": {
    "id": 780,
    "name": "Drampa",
    "isMega": false,
    "elo": 9288,
    "winRate": 50.4,
    "appearances": 112164,
    "wins": 56524,
    "losses": 55640,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 58.8,
        "games": 18254
      },
      {
        "name": "Excadrill",
        "winRate": 58.2,
        "games": 4582
      },
      {
        "name": "Snorlax",
        "winRate": 55.9,
        "games": 19266
      },
      {
        "name": "Ursaluna",
        "winRate": 54.1,
        "games": 9873
      },
      {
        "name": "Mega Starmie",
        "winRate": 53.9,
        "games": 9930
      }
    ],
    "bestSets": []
  },
  "784": {
    "id": 784,
    "name": "Kommo-o",
    "isMega": false,
    "elo": 9232,
    "winRate": 47.3,
    "appearances": 55657,
    "wins": 26337,
    "losses": 29320,
    "bestPartners": [
      {
        "name": "Espeon",
        "winRate": 50.7,
        "games": 5393
      },
      {
        "name": "Azumarill",
        "winRate": 50.7,
        "games": 5393
      },
      {
        "name": "Sylveon",
        "winRate": 50.7,
        "games": 5393
      },
      {
        "name": "Mega Scizor",
        "winRate": 50.6,
        "games": 5537
      },
      {
        "name": "Palafin",
        "winRate": 50.6,
        "games": 5537
      }
    ],
    "bestSets": []
  },
  "823": {
    "id": 823,
    "name": "Corviknight",
    "isMega": false,
    "elo": 9244,
    "winRate": 47.1,
    "appearances": 49369,
    "wins": 23256,
    "losses": 26113,
    "bestPartners": [
      {
        "name": "Mega Garchomp Z",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Primarina",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Klefki",
        "winRate": 58.4,
        "games": 4593
      },
      {
        "name": "Empoleon",
        "winRate": 54.2,
        "games": 10041
      },
      {
        "name": "Aggron",
        "winRate": 54.2,
        "games": 10041
      }
    ],
    "bestSets": []
  },
  "842": {
    "id": 842,
    "name": "Appletun",
    "isMega": false,
    "elo": 9223,
    "winRate": 46.5,
    "appearances": 15098,
    "wins": 7028,
    "losses": 8070,
    "bestPartners": [
      {
        "name": "Mega Chandelure",
        "winRate": 50.3,
        "games": 5380
      },
      {
        "name": "Hatterene",
        "winRate": 50.3,
        "games": 5380
      },
      {
        "name": "Grimmsnarl",
        "winRate": 50.3,
        "games": 5380
      },
      {
        "name": "Trevenant",
        "winRate": 49.6,
        "games": 10770
      },
      {
        "name": "Mamoswine",
        "winRate": 49.6,
        "games": 10770
      }
    ],
    "bestSets": []
  },
  "844": {
    "id": 844,
    "name": "Sandaconda",
    "isMega": false,
    "elo": 9262,
    "winRate": 53.6,
    "appearances": 14829,
    "wins": 7943,
    "losses": 6886,
    "bestPartners": [
      {
        "name": "Clawitzer",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Incineroar",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Primarina",
        "winRate": 57.1,
        "games": 4636
      },
      {
        "name": "Azumarill",
        "winRate": 55.4,
        "games": 9670
      },
      {
        "name": "Heat Rotom",
        "winRate": 53.9,
        "games": 5034
      }
    ],
    "bestSets": []
  },
  "855": {
    "id": 855,
    "name": "Polteageist",
    "isMega": false,
    "elo": 9279,
    "winRate": 47,
    "appearances": 20405,
    "wins": 9597,
    "losses": 10808,
    "bestPartners": [
      {
        "name": "Mega Lopunny",
        "winRate": 49.9,
        "games": 5461
      },
      {
        "name": "Mimikyu",
        "winRate": 49.9,
        "games": 5461
      },
      {
        "name": "Alcremie",
        "winRate": 49.9,
        "games": 5461
      },
      {
        "name": "Krookodile",
        "winRate": 49.9,
        "games": 5461
      },
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 10858
      }
    ],
    "bestSets": []
  },
  "858": {
    "id": 858,
    "name": "Hatterene",
    "isMega": false,
    "elo": 9258,
    "winRate": 50.9,
    "appearances": 533191,
    "wins": 271391,
    "losses": 261800,
    "bestPartners": [
      {
        "name": "Sinistcha",
        "winRate": 59.1,
        "games": 4533
      },
      {
        "name": "Blastoise",
        "winRate": 59.1,
        "games": 4533
      },
      {
        "name": "Snorlax",
        "winRate": 58.2,
        "games": 23154
      },
      {
        "name": "Farigiraf",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Conkeldurr",
        "winRate": 55.9,
        "games": 4924
      }
    ],
    "bestSets": []
  },
  "861": {
    "id": 861,
    "name": "Grimmsnarl",
    "isMega": false,
    "elo": 9280,
    "winRate": 45.9,
    "appearances": 29866,
    "wins": 13717,
    "losses": 16149,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 5463
      },
      {
        "name": "Mega Scizor",
        "winRate": 50.3,
        "games": 5463
      },
      {
        "name": "Greninja",
        "winRate": 50.3,
        "games": 11046
      },
      {
        "name": "Mimikyu",
        "winRate": 50.3,
        "games": 5463
      },
      {
        "name": "Hatterene",
        "winRate": 50.3,
        "games": 5380
      }
    ],
    "bestSets": []
  },
  "866": {
    "id": 866,
    "name": "Mr. Rime",
    "isMega": false,
    "elo": 9272,
    "winRate": 49.5,
    "appearances": 16056,
    "wins": 7955,
    "losses": 8101,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 5253
      },
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 5253
      },
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 5253
      },
      {
        "name": "Kingambit",
        "winRate": 49.7,
        "games": 5253
      },
      {
        "name": "Arcanine",
        "winRate": 49.7,
        "games": 5253
      }
    ],
    "bestSets": []
  },
  "867": {
    "id": 867,
    "name": "Runerigus",
    "isMega": false,
    "elo": 9233,
    "winRate": 44.2,
    "appearances": 14430,
    "wins": 6375,
    "losses": 8055,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 49.6,
        "games": 5393
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 49.6,
        "games": 5393
      },
      {
        "name": "Snorlax",
        "winRate": 49.6,
        "games": 5393
      },
      {
        "name": "Slowbro",
        "winRate": 48.9,
        "games": 10695
      },
      {
        "name": "Gyarados",
        "winRate": 48.9,
        "games": 10695
      }
    ],
    "bestSets": []
  },
  "869": {
    "id": 869,
    "name": "Alcremie",
    "isMega": false,
    "elo": 9252,
    "winRate": 49.3,
    "appearances": 36338,
    "wins": 17921,
    "losses": 18417,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 55.9,
        "games": 4791
      },
      {
        "name": "Mega Gyarados",
        "winRate": 55.9,
        "games": 4791
      },
      {
        "name": "Sneasler",
        "winRate": 55.9,
        "games": 4791
      },
      {
        "name": "Gliscor",
        "winRate": 55.9,
        "games": 4791
      },
      {
        "name": "Mega Raichu Y",
        "winRate": 51,
        "games": 5519
      }
    ],
    "bestSets": []
  },
  "877": {
    "id": 877,
    "name": "Morpeko",
    "isMega": false,
    "elo": 9236,
    "winRate": 49.7,
    "appearances": 15794,
    "wins": 7844,
    "losses": 7950,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 5470
      },
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 5470
      },
      {
        "name": "Charizard",
        "winRate": 50.6,
        "games": 5470
      },
      {
        "name": "Heracross",
        "winRate": 50.6,
        "games": 5470
      },
      {
        "name": "Aegislash",
        "winRate": 50.6,
        "games": 5470
      }
    ],
    "bestSets": []
  },
  "887": {
    "id": 887,
    "name": "Dragapult",
    "isMega": false,
    "elo": 9285,
    "winRate": 50.2,
    "appearances": 785520,
    "wins": 393973,
    "losses": 391547,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 56.6,
        "games": 4814
      },
      {
        "name": "Sneasler",
        "winRate": 54.7,
        "games": 4850
      },
      {
        "name": "Sableye",
        "winRate": 53,
        "games": 9988
      },
      {
        "name": "Primarina",
        "winRate": 52.7,
        "games": 10181
      },
      {
        "name": "Mega Scizor",
        "winRate": 52.5,
        "games": 15498
      }
    ],
    "bestSets": []
  },
  "900": {
    "id": 900,
    "name": "Kleavor",
    "isMega": false,
    "elo": 9254,
    "winRate": 52.6,
    "appearances": 15400,
    "wins": 8107,
    "losses": 7293,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 54.6,
        "games": 4867
      },
      {
        "name": "Tatsugiri",
        "winRate": 54.6,
        "games": 4867
      },
      {
        "name": "Blastoise",
        "winRate": 54.6,
        "games": 4867
      },
      {
        "name": "Kingambit",
        "winRate": 53.7,
        "games": 10038
      },
      {
        "name": "Metagross",
        "winRate": 52.8,
        "games": 5171
      }
    ],
    "bestSets": []
  },
  "901": {
    "id": 901,
    "name": "Ursaluna",
    "isMega": false,
    "elo": 9336,
    "winRate": 51.8,
    "appearances": 118171,
    "wins": 61197,
    "losses": 56974,
    "bestPartners": [
      {
        "name": "Mega Charizard X",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Tsareena",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Venusaur",
        "winRate": 58.2,
        "games": 4582
      },
      {
        "name": "Mega Froslass",
        "winRate": 57.7,
        "games": 9261
      }
    ],
    "bestSets": []
  },
  "902": {
    "id": 902,
    "name": "Basculegion",
    "isMega": false,
    "elo": 9268,
    "winRate": 49.8,
    "appearances": 67552,
    "wins": 33651,
    "losses": 33901,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 54.7,
        "games": 4942
      },
      {
        "name": "Clefable",
        "winRate": 54.7,
        "games": 4942
      },
      {
        "name": "Sneasler",
        "winRate": 54.7,
        "games": 4942
      },
      {
        "name": "Mega Gyarados",
        "winRate": 54.7,
        "games": 4942
      },
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 9946
      }
    ],
    "bestSets": []
  },
  "903": {
    "id": 903,
    "name": "Sneasler",
    "isMega": false,
    "elo": 9316,
    "winRate": 52.1,
    "appearances": 131051,
    "wins": 68255,
    "losses": 62796,
    "bestPartners": [
      {
        "name": "Mega Slowbro",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Conkeldurr",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Mega Metagross",
        "winRate": 61.3,
        "games": 4266
      },
      {
        "name": "Mamoswine",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Gardevoir",
        "winRate": 58.6,
        "games": 4512
      }
    ],
    "bestSets": []
  },
  "908": {
    "id": 908,
    "name": "Meowscarada",
    "isMega": false,
    "elo": 9295,
    "winRate": 49.7,
    "appearances": 21371,
    "wins": 10619,
    "losses": 10752,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.3,
        "games": 5583
      },
      {
        "name": "Grimmsnarl",
        "winRate": 50.3,
        "games": 5583
      },
      {
        "name": "Chesnaught",
        "winRate": 50.3,
        "games": 5583
      },
      {
        "name": "Greninja",
        "winRate": 50.3,
        "games": 5583
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 16115
      }
    ],
    "bestSets": []
  },
  "911": {
    "id": 911,
    "name": "Skeledirge",
    "isMega": false,
    "elo": 9210,
    "winRate": 44.5,
    "appearances": 23847,
    "wins": 10605,
    "losses": 13242,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 50.7,
        "games": 5249
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5249
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 5249
      },
      {
        "name": "Rhyperior",
        "winRate": 50.7,
        "games": 5249
      },
      {
        "name": "Mega Absol Z",
        "winRate": 48.3,
        "games": 5158
      }
    ],
    "bestSets": []
  },
  "914": {
    "id": 914,
    "name": "Quaquaval",
    "isMega": false,
    "elo": 9242,
    "winRate": 48.5,
    "appearances": 15809,
    "wins": 7671,
    "losses": 8138,
    "bestPartners": [
      {
        "name": "Flareon",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Weavile",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Starmie",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Palafin",
        "winRate": 50.7,
        "games": 5424
      },
      {
        "name": "Greninja",
        "winRate": 50.2,
        "games": 10915
      }
    ],
    "bestSets": []
  },
  "923": {
    "id": 923,
    "name": "Pawmot",
    "isMega": false,
    "elo": 9229,
    "winRate": 49.7,
    "appearances": 31923,
    "wins": 15881,
    "losses": 16042,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 5024
      },
      {
        "name": "Incineroar",
        "winRate": 53.8,
        "games": 5024
      },
      {
        "name": "Krookodile",
        "winRate": 51.5,
        "games": 10363
      },
      {
        "name": "Garchomp",
        "winRate": 51.4,
        "games": 10547
      },
      {
        "name": "Toucannon",
        "winRate": 51.4,
        "games": 10424
      }
    ],
    "bestSets": []
  },
  "925": {
    "id": 925,
    "name": "Maushold",
    "isMega": false,
    "elo": 9166,
    "winRate": 45.7,
    "appearances": 14842,
    "wins": 6776,
    "losses": 8066,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.4,
        "games": 5325
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 5325
      },
      {
        "name": "Dragapult",
        "winRate": 50.4,
        "games": 5325
      },
      {
        "name": "Kingambit",
        "winRate": 50.4,
        "games": 5325
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 10765
      }
    ],
    "bestSets": []
  },
  "934": {
    "id": 934,
    "name": "Garganacl",
    "isMega": false,
    "elo": 9274,
    "winRate": 49.8,
    "appearances": 43105,
    "wins": 21467,
    "losses": 21638,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 50.6,
        "games": 5427
      },
      {
        "name": "Spiritomb",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Torkoal",
        "winRate": 50.5,
        "games": 5157
      },
      {
        "name": "Ditto",
        "winRate": 50.5,
        "games": 5157
      }
    ],
    "bestSets": []
  },
  "936": {
    "id": 936,
    "name": "Armarouge",
    "isMega": false,
    "elo": 9285,
    "winRate": 48.1,
    "appearances": 15641,
    "wins": 7522,
    "losses": 8119,
    "bestPartners": [
      {
        "name": "Hydrapple",
        "winRate": 49.8,
        "games": 5405
      },
      {
        "name": "Dondozo",
        "winRate": 49.8,
        "games": 5405
      },
      {
        "name": "Rhyperior",
        "winRate": 49.8,
        "games": 5405
      },
      {
        "name": "Kingambit",
        "winRate": 49.6,
        "games": 10747
      },
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 10747
      }
    ],
    "bestSets": []
  },
  "937": {
    "id": 937,
    "name": "Ceruledge",
    "isMega": false,
    "elo": 9137,
    "winRate": 41.1,
    "appearances": 13323,
    "wins": 5474,
    "losses": 7849,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5396
      },
      {
        "name": "Krookodile",
        "winRate": 50.7,
        "games": 5396
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 5396
      },
      {
        "name": "Greninja",
        "winRate": 44.6,
        "games": 9545
      },
      {
        "name": "Whimsicott",
        "winRate": 43.1,
        "games": 9174
      }
    ],
    "bestSets": []
  },
  "952": {
    "id": 952,
    "name": "Scovillain",
    "isMega": false,
    "elo": 9198,
    "winRate": 48.7,
    "appearances": 21299,
    "wins": 10369,
    "losses": 10930,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 49.9,
        "games": 5355
      },
      {
        "name": "Archaludon",
        "winRate": 49.4,
        "games": 10893
      },
      {
        "name": "Aerodactyl",
        "winRate": 49.4,
        "games": 10893
      },
      {
        "name": "Tinkaton",
        "winRate": 49.4,
        "games": 10893
      },
      {
        "name": "Kingambit",
        "winRate": 49.4,
        "games": 10893
      }
    ],
    "bestSets": []
  },
  "959": {
    "id": 959,
    "name": "Tinkaton",
    "isMega": false,
    "elo": 9291,
    "winRate": 50.7,
    "appearances": 240049,
    "wins": 121679,
    "losses": 118370,
    "bestPartners": [
      {
        "name": "Hydrapple",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Heracross",
        "winRate": 58.2,
        "games": 9110
      },
      {
        "name": "Clefable",
        "winRate": 57.4,
        "games": 9324
      },
      {
        "name": "Leafeon",
        "winRate": 56,
        "games": 4821
      }
    ],
    "bestSets": []
  },
  "964": {
    "id": 964,
    "name": "Palafin",
    "isMega": false,
    "elo": 9252,
    "winRate": 50.6,
    "appearances": 214503,
    "wins": 108592,
    "losses": 105911,
    "bestPartners": [
      {
        "name": "Mega Abomasnow",
        "winRate": 56.3,
        "games": 4809
      },
      {
        "name": "Archaludon",
        "winRate": 56.3,
        "games": 4809
      },
      {
        "name": "Arcanine",
        "winRate": 53.2,
        "games": 10228
      },
      {
        "name": "Ninetales",
        "winRate": 53.1,
        "games": 10166
      },
      {
        "name": "Chesnaught",
        "winRate": 51.2,
        "games": 10705
      }
    ],
    "bestSets": []
  },
  "968": {
    "id": 968,
    "name": "Orthworm",
    "isMega": false,
    "elo": 9221,
    "winRate": 45.6,
    "appearances": 19790,
    "wins": 9030,
    "losses": 10760,
    "bestPartners": [
      {
        "name": "Vivillon",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Politoed",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.6,
        "games": 5615
      },
      {
        "name": "Arcanine",
        "winRate": 48.6,
        "games": 10664
      }
    ],
    "bestSets": []
  },
  "970": {
    "id": 970,
    "name": "Glimmora",
    "isMega": false,
    "elo": 9278,
    "winRate": 52,
    "appearances": 14626,
    "wins": 7603,
    "losses": 7023,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 62.1,
        "games": 4220
      },
      {
        "name": "Archaludon",
        "winRate": 62.1,
        "games": 4220
      },
      {
        "name": "Whimsicott",
        "winRate": 62.1,
        "games": 4220
      },
      {
        "name": "Kingambit",
        "winRate": 62.1,
        "games": 4220
      },
      {
        "name": "Gyarados",
        "winRate": 52,
        "games": 14626
      }
    ],
    "bestSets": []
  },
  "977": {
    "id": 977,
    "name": "Dondozo",
    "isMega": false,
    "elo": 9300,
    "winRate": 50.2,
    "appearances": 100542,
    "wins": 50505,
    "losses": 50037,
    "bestPartners": [
      {
        "name": "Farigiraf",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Conkeldurr",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Oranguru",
        "winRate": 50.8,
        "games": 5381
      },
      {
        "name": "Clefable",
        "winRate": 50.8,
        "games": 5381
      },
      {
        "name": "Toxapex",
        "winRate": 50.8,
        "games": 5381
      }
    ],
    "bestSets": []
  },
  "978": {
    "id": 978,
    "name": "Tatsugiri",
    "isMega": false,
    "elo": 9238,
    "winRate": 50.1,
    "appearances": 125479,
    "wins": 62855,
    "losses": 62624,
    "bestPartners": [
      {
        "name": "Ninetales",
        "winRate": 56,
        "games": 4799
      },
      {
        "name": "Decidueye",
        "winRate": 56,
        "games": 4799
      },
      {
        "name": "Primarina",
        "winRate": 54.7,
        "games": 9908
      },
      {
        "name": "Kleavor",
        "winRate": 54.6,
        "games": 4867
      },
      {
        "name": "Archaludon",
        "winRate": 54.6,
        "games": 4867
      }
    ],
    "bestSets": []
  },
  "981": {
    "id": 981,
    "name": "Farigiraf",
    "isMega": false,
    "elo": 9275,
    "winRate": 52.1,
    "appearances": 15317,
    "wins": 7980,
    "losses": 7337,
    "bestPartners": [
      {
        "name": "Conkeldurr",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Hatterene",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Dondozo",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Garchomp",
        "winRate": 55.9,
        "games": 4924
      },
      {
        "name": "Incineroar",
        "winRate": 53.2,
        "games": 10079
      }
    ],
    "bestSets": []
  },
  "983": {
    "id": 983,
    "name": "Kingambit",
    "isMega": false,
    "elo": 9260,
    "winRate": 50.8,
    "appearances": 780859,
    "wins": 396364,
    "losses": 384495,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 72.5,
        "games": 3548
      },
      {
        "name": "Primarina",
        "winRate": 70.8,
        "games": 7338
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Chesnaught",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 62.4,
        "games": 4238
      }
    ],
    "bestSets": []
  },
  "1013": {
    "id": 1013,
    "name": "Sinistcha",
    "isMega": false,
    "elo": 9289,
    "winRate": 58,
    "appearances": 22837,
    "wins": 13255,
    "losses": 9582,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Venusaur",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Mega Blastoise",
        "winRate": 67.7,
        "games": 7850
      },
      {
        "name": "Goodra",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Tsareena",
        "winRate": 67.6,
        "games": 3883
      }
    ],
    "bestSets": []
  },
  "1018": {
    "id": 1018,
    "name": "Archaludon",
    "isMega": false,
    "elo": 9322,
    "winRate": 53.5,
    "appearances": 295042,
    "wins": 157852,
    "losses": 137190,
    "bestPartners": [
      {
        "name": "Hydrapple",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Empoleon",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Chesnaught",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Glimmora",
        "winRate": 62.1,
        "games": 4220
      },
      {
        "name": "Mega Blastoise",
        "winRate": 62.1,
        "games": 4220
      }
    ],
    "bestSets": []
  },
  "1019": {
    "id": 1019,
    "name": "Hydrapple",
    "isMega": false,
    "elo": 9329,
    "winRate": 53.3,
    "appearances": 20184,
    "wins": 10755,
    "losses": 9429,
    "bestPartners": [
      {
        "name": "Mega Charizard Y",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Archaludon",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Tinkaton",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Clefable",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Gyarados",
        "winRate": 54.5,
        "games": 14725
      }
    ],
    "bestSets": []
  },
  "5059": {
    "id": 5059,
    "name": "Hisuian Arcanine",
    "isMega": false,
    "elo": 9225,
    "winRate": 48.2,
    "appearances": 369695,
    "wins": 178221,
    "losses": 191474,
    "bestPartners": [
      {
        "name": "Leafeon",
        "winRate": 56,
        "games": 4821
      },
      {
        "name": "Meganium",
        "winRate": 55.5,
        "games": 9758
      },
      {
        "name": "Heat Rotom",
        "winRate": 54.2,
        "games": 30065
      },
      {
        "name": "Azumarill",
        "winRate": 53.7,
        "games": 10125
      },
      {
        "name": "Mega Alakazam",
        "winRate": 53.1,
        "games": 5145
      }
    ],
    "bestSets": []
  },
  "5157": {
    "id": 5157,
    "name": "Hisuian Typhlosion",
    "isMega": false,
    "elo": 9232,
    "winRate": 48.5,
    "appearances": 26364,
    "wins": 12799,
    "losses": 13565,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 5458
      },
      {
        "name": "Gliscor",
        "winRate": 50.6,
        "games": 5458
      },
      {
        "name": "Sinistcha",
        "winRate": 50.6,
        "games": 5458
      },
      {
        "name": "Mega Greninja",
        "winRate": 50.3,
        "games": 10771
      },
      {
        "name": "Decidueye",
        "winRate": 50.3,
        "games": 10771
      }
    ],
    "bestSets": []
  },
  "6080": {
    "id": 6080,
    "name": "Galarian Slowbro",
    "isMega": false,
    "elo": 9299,
    "winRate": 48.5,
    "appearances": 76727,
    "wins": 37225,
    "losses": 39502,
    "bestPartners": [
      {
        "name": "Ursaluna",
        "winRate": 52.7,
        "games": 5107
      },
      {
        "name": "Archaludon",
        "winRate": 52.7,
        "games": 5107
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.9,
        "games": 10496
      },
      {
        "name": "Audino",
        "winRate": 50.6,
        "games": 10799
      },
      {
        "name": "Hatterene",
        "winRate": 50.6,
        "games": 16162
      }
    ],
    "bestSets": []
  },
  "6199": {
    "id": 6199,
    "name": "Galarian Slowking",
    "isMega": false,
    "elo": 9257,
    "winRate": 50.6,
    "appearances": 16162,
    "wins": 8176,
    "losses": 7986,
    "bestPartners": [
      {
        "name": "Audino",
        "winRate": 50.6,
        "games": 10799
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 16162
      },
      {
        "name": "Hatterene",
        "winRate": 50.6,
        "games": 16162
      },
      {
        "name": "Slowbro",
        "winRate": 50.6,
        "games": 16162
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.6,
        "games": 16162
      }
    ],
    "bestSets": []
  },
  "6618": {
    "id": 6618,
    "name": "Galarian Stunfisk",
    "isMega": false,
    "elo": 9270,
    "winRate": 47.2,
    "appearances": 76830,
    "wins": 36289,
    "losses": 40541,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.7,
        "games": 5415
      },
      {
        "name": "Tinkaton",
        "winRate": 50.6,
        "games": 10838
      },
      {
        "name": "Mega Pinsir",
        "winRate": 50.5,
        "games": 5423
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.5,
        "games": 5423
      },
      {
        "name": "Mega Tatsugiri",
        "winRate": 50.5,
        "games": 10584
      }
    ],
    "bestSets": []
  },
  "10008": {
    "id": 10008,
    "name": "Heat Rotom",
    "isMega": false,
    "elo": 9283,
    "winRate": 53.9,
    "appearances": 120337,
    "wins": 64834,
    "losses": 55503,
    "bestPartners": [
      {
        "name": "Mega Garchomp",
        "winRate": 72.5,
        "games": 3656
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 70.8,
        "games": 7338
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Mega Blastoise",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Decidueye",
        "winRate": 67.8,
        "games": 3967
      }
    ],
    "bestSets": []
  },
  "10009": {
    "id": 10009,
    "name": "Wash Rotom",
    "isMega": false,
    "elo": 9277,
    "winRate": 51.9,
    "appearances": 31796,
    "wins": 16498,
    "losses": 15298,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 54.1,
        "games": 10219
      },
      {
        "name": "Archaludon",
        "winRate": 53.5,
        "games": 15470
      },
      {
        "name": "Kingambit",
        "winRate": 53.5,
        "games": 15470
      },
      {
        "name": "Rhyperior",
        "winRate": 53.5,
        "games": 15470
      },
      {
        "name": "Tinkaton",
        "winRate": 52.7,
        "games": 20893
      }
    ],
    "bestSets": []
  },
  "10010": {
    "id": 10010,
    "name": "Frost Rotom",
    "isMega": false,
    "elo": 9248,
    "winRate": 50.2,
    "appearances": 16084,
    "wins": 8067,
    "losses": 8017,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 51.4,
        "games": 5361
      },
      {
        "name": "Primarina",
        "winRate": 51.4,
        "games": 5361
      },
      {
        "name": "Basculegion",
        "winRate": 51.4,
        "games": 5361
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 10801
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 16084
      }
    ],
    "bestSets": []
  },
  "10011": {
    "id": 10011,
    "name": "Fan Rotom",
    "isMega": false,
    "elo": 9292,
    "winRate": 52.9,
    "appearances": 15599,
    "wins": 8250,
    "losses": 7349,
    "bestPartners": [
      {
        "name": "Mega Lucario",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Gliscor",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Charizard",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Primarina",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Altaria",
        "winRate": 53.9,
        "games": 10052
      }
    ],
    "bestSets": []
  },
  "10012": {
    "id": 10012,
    "name": "Mow Rotom",
    "isMega": false,
    "elo": 9250,
    "winRate": 49.8,
    "appearances": 16186,
    "wins": 8057,
    "losses": 8129,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 5427
      },
      {
        "name": "Basculegion",
        "winRate": 50.6,
        "games": 5427
      },
      {
        "name": "Arcanine",
        "winRate": 50,
        "games": 10818
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50,
        "games": 10818
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 10818
      }
    ],
    "bestSets": []
  },
  "10100": {
    "id": 10100,
    "name": "Alolan Raichu",
    "isMega": false,
    "elo": 9223,
    "winRate": 48.9,
    "appearances": 83363,
    "wins": 40803,
    "losses": 42560,
    "bestPartners": [
      {
        "name": "Mega Emboar",
        "winRate": 50.9,
        "games": 15940
      },
      {
        "name": "Starmie",
        "winRate": 50.7,
        "games": 26666
      },
      {
        "name": "Emboar",
        "winRate": 50.7,
        "games": 10794
      },
      {
        "name": "Noivern",
        "winRate": 50.7,
        "games": 5452
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 5452
      }
    ],
    "bestSets": []
  },
  "10103": {
    "id": 10103,
    "name": "Alolan Ninetales",
    "isMega": false,
    "elo": 9294,
    "winRate": 54,
    "appearances": 33814,
    "wins": 18268,
    "losses": 15546,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 70.8,
        "games": 7338
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Azumarill",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Kingambit",
        "winRate": 62.2,
        "games": 12618
      },
      {
        "name": "Primarina",
        "winRate": 61.7,
        "games": 12660
      }
    ],
    "bestSets": []
  },
  "10336": {
    "id": 10336,
    "name": "Hisuian Samurott",
    "isMega": false,
    "elo": 9253,
    "winRate": 50.4,
    "appearances": 41172,
    "wins": 20753,
    "losses": 20419,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Lucario",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Ursaluna",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Hydreigon",
        "winRate": 54.4,
        "games": 9556
      },
      {
        "name": "Krookodile",
        "winRate": 52.6,
        "games": 15137
      }
    ],
    "bestSets": []
  },
  "10340": {
    "id": 10340,
    "name": "Hisuian Zoroark",
    "isMega": false,
    "elo": 9158,
    "winRate": 47.8,
    "appearances": 31185,
    "wins": 14903,
    "losses": 16282,
    "bestPartners": [
      {
        "name": "Decidueye",
        "winRate": 50.5,
        "games": 5425
      },
      {
        "name": "Incineroar",
        "winRate": 50.5,
        "games": 5425
      },
      {
        "name": "Greninja",
        "winRate": 50.5,
        "games": 5425
      },
      {
        "name": "Clefable",
        "winRate": 50.5,
        "games": 5425
      },
      {
        "name": "Mega Scizor",
        "winRate": 50.5,
        "games": 5425
      }
    ],
    "bestSets": []
  },
  "10341": {
    "id": 10341,
    "name": "Hisuian Decidueye",
    "isMega": false,
    "elo": 9182,
    "winRate": 46.3,
    "appearances": 24556,
    "wins": 11368,
    "losses": 13188,
    "bestPartners": [
      {
        "name": "Mega Delphox",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Greninja",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Azumarill",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Araquanid",
        "winRate": 51,
        "games": 5356
      },
      {
        "name": "Mega Chandelure",
        "winRate": 50.8,
        "games": 5568
      }
    ],
    "bestSets": []
  },
  "127-mega": {
    "id": 127,
    "name": "Mega Pinsir",
    "isMega": true,
    "elo": 9355,
    "winRate": 54.8,
    "appearances": 19821,
    "wins": 10863,
    "losses": 8958,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 60.8,
        "games": 4408
      },
      {
        "name": "Gyarados",
        "winRate": 58.8,
        "games": 9147
      },
      {
        "name": "Ursaluna",
        "winRate": 56.9,
        "games": 4739
      },
      {
        "name": "Garchomp",
        "winRate": 56.9,
        "games": 4739
      },
      {
        "name": "Clefable",
        "winRate": 56.9,
        "games": 4739
      }
    ],
    "bestSets": []
  },
  "115-mega": {
    "id": 115,
    "name": "Mega Kangaskhan",
    "isMega": true,
    "elo": 9349,
    "winRate": 49.1,
    "appearances": 154937,
    "wins": 76074,
    "losses": 78863,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 50.5,
        "games": 5265
      },
      {
        "name": "Clefable",
        "winRate": 50.5,
        "games": 5265
      },
      {
        "name": "Whimsicott",
        "winRate": 49.8,
        "games": 26351
      },
      {
        "name": "Scizor",
        "winRate": 49.6,
        "games": 16021
      },
      {
        "name": "Garchomp",
        "winRate": 49.4,
        "games": 139864
      }
    ],
    "bestSets": []
  },
  "376-mega": {
    "id": 376,
    "name": "Mega Metagross",
    "isMega": true,
    "elo": 9322,
    "winRate": 50.1,
    "appearances": 285080,
    "wins": 142718,
    "losses": 142362,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 61.3,
        "games": 4266
      },
      {
        "name": "Sneasler",
        "winRate": 61.3,
        "games": 4266
      },
      {
        "name": "Lucario",
        "winRate": 53,
        "games": 5039
      },
      {
        "name": "Kingambit",
        "winRate": 51,
        "games": 26363
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 32164
      }
    ],
    "bestSets": []
  },
  "282-mega": {
    "id": 282,
    "name": "Mega Gardevoir",
    "isMega": true,
    "elo": 9315,
    "winRate": 49.7,
    "appearances": 408028,
    "wins": 202695,
    "losses": 205333,
    "bestPartners": [
      {
        "name": "Talonflame",
        "winRate": 50.9,
        "games": 5371
      },
      {
        "name": "Garganacl",
        "winRate": 50.6,
        "games": 5427
      },
      {
        "name": "Palafin",
        "winRate": 50.5,
        "games": 37799
      },
      {
        "name": "Aegislash",
        "winRate": 50.2,
        "games": 42900
      },
      {
        "name": "Slowbro",
        "winRate": 50.1,
        "games": 5546
      }
    ],
    "bestSets": []
  },
  "6-mega-y": {
    "id": 6,
    "name": "Mega Charizard Y",
    "isMega": true,
    "elo": 9306,
    "winRate": 53.1,
    "appearances": 34762,
    "wins": 18470,
    "losses": 16292,
    "bestPartners": [
      {
        "name": "Hydrapple",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Tinkaton",
        "winRate": 68.3,
        "games": 3900
      },
      {
        "name": "Gyarados",
        "winRate": 65.2,
        "games": 8138
      },
      {
        "name": "Slowbro",
        "winRate": 62.4,
        "games": 4238
      },
      {
        "name": "Kingambit",
        "winRate": 62.4,
        "games": 4238
      }
    ],
    "bestSets": []
  },
  "428-mega": {
    "id": 428,
    "name": "Mega Lopunny",
    "isMega": true,
    "elo": 9302,
    "winRate": 49.7,
    "appearances": 16141,
    "wins": 8030,
    "losses": 8111,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Hatterene",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Gardevoir",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Alcremie",
        "winRate": 50.1,
        "games": 10811
      },
      {
        "name": "Polteageist",
        "winRate": 49.9,
        "games": 5461
      }
    ],
    "bestSets": []
  },
  "121-mega": {
    "id": 121,
    "name": "Mega Starmie",
    "isMega": true,
    "elo": 9297,
    "winRate": 52.6,
    "appearances": 15117,
    "wins": 7951,
    "losses": 7166,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 58.2,
        "games": 4582
      },
      {
        "name": "Ursaluna",
        "winRate": 53.9,
        "games": 9769
      },
      {
        "name": "Torkoal",
        "winRate": 53.9,
        "games": 9769
      },
      {
        "name": "Venusaur",
        "winRate": 53.9,
        "games": 9930
      },
      {
        "name": "Drampa",
        "winRate": 53.9,
        "games": 9930
      }
    ],
    "bestSets": []
  },
  "302-mega": {
    "id": 302,
    "name": "Mega Sableye",
    "isMega": true,
    "elo": 9293,
    "winRate": 50.2,
    "appearances": 16006,
    "wins": 8036,
    "losses": 7970,
    "bestPartners": [
      {
        "name": "Gengar",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Excadrill",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5284
      },
      {
        "name": "Snorlax",
        "winRate": 50.4,
        "games": 5218
      },
      {
        "name": "Lopunny",
        "winRate": 50.4,
        "games": 10502
      }
    ],
    "bestSets": []
  },
  "130-mega": {
    "id": 130,
    "name": "Mega Gyarados",
    "isMega": true,
    "elo": 9291,
    "winRate": 50.5,
    "appearances": 307171,
    "wins": 155267,
    "losses": 151904,
    "bestPartners": [
      {
        "name": "Mamoswine",
        "winRate": 58.6,
        "games": 4512
      },
      {
        "name": "Venusaur",
        "winRate": 58.6,
        "games": 4584
      },
      {
        "name": "Alcremie",
        "winRate": 55.9,
        "games": 4791
      },
      {
        "name": "Gliscor",
        "winRate": 54.9,
        "games": 34248
      },
      {
        "name": "Basculegion",
        "winRate": 54.7,
        "games": 4942
      }
    ],
    "bestSets": []
  },
  "609-mega": {
    "id": 609,
    "name": "Mega Chandelure",
    "isMega": true,
    "elo": 9291,
    "winRate": 49.2,
    "appearances": 32211,
    "wins": 15851,
    "losses": 16360,
    "bestPartners": [
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.8,
        "games": 5568
      },
      {
        "name": "Abomasnow",
        "winRate": 50.7,
        "games": 10989
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 10989
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.6,
        "games": 5421
      },
      {
        "name": "Greninja",
        "winRate": 50.6,
        "games": 5421
      }
    ],
    "bestSets": []
  },
  "448-mega": {
    "id": 448,
    "name": "Mega Lucario",
    "isMega": true,
    "elo": 9287,
    "winRate": 51.5,
    "appearances": 31844,
    "wins": 16408,
    "losses": 15436,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Fan Rotom",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Primarina",
        "winRate": 58.7,
        "games": 4591
      },
      {
        "name": "Charizard",
        "winRate": 54.2,
        "games": 10062
      },
      {
        "name": "Altaria",
        "winRate": 52.9,
        "games": 15566
      }
    ],
    "bestSets": []
  },
  "208-mega": {
    "id": 208,
    "name": "Mega Steelix",
    "isMega": true,
    "elo": 9284,
    "winRate": 49.7,
    "appearances": 16272,
    "wins": 8086,
    "losses": 8186,
    "bestPartners": [
      {
        "name": "Samurott",
        "winRate": 49.9,
        "games": 5447
      },
      {
        "name": "Milotic",
        "winRate": 49.9,
        "games": 5447
      },
      {
        "name": "Vaporeon",
        "winRate": 49.9,
        "games": 10843
      },
      {
        "name": "Slowbro",
        "winRate": 49.9,
        "games": 10843
      },
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 16272
      }
    ],
    "bestSets": []
  },
  "655-mega": {
    "id": 655,
    "name": "Mega Delphox",
    "isMega": true,
    "elo": 9284,
    "winRate": 54,
    "appearances": 15272,
    "wins": 8242,
    "losses": 7030,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 58.6,
        "games": 4634
      },
      {
        "name": "Archaludon",
        "winRate": 58.6,
        "games": 4634
      },
      {
        "name": "Kingambit",
        "winRate": 55.6,
        "games": 9916
      },
      {
        "name": "Gyarados",
        "winRate": 55.6,
        "games": 9916
      },
      {
        "name": "Greninja",
        "winRate": 54,
        "games": 15272
      }
    ],
    "bestSets": []
  },
  "248-mega": {
    "id": 248,
    "name": "Mega Tyranitar",
    "isMega": true,
    "elo": 9276,
    "winRate": 49.9,
    "appearances": 312408,
    "wins": 155741,
    "losses": 156667,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 50.5,
        "games": 5424
      },
      {
        "name": "Aegislash",
        "winRate": 50.3,
        "games": 58671
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 58626
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 148362
      },
      {
        "name": "Dragapult",
        "winRate": 50.2,
        "games": 121461
      }
    ],
    "bestSets": []
  },
  "970-mega": {
    "id": 970,
    "name": "Mega Glimmora",
    "isMega": true,
    "elo": 9276,
    "winRate": 49.7,
    "appearances": 16164,
    "wins": 8040,
    "losses": 8124,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 50.6,
        "games": 5473
      },
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 5473
      },
      {
        "name": "Hydreigon",
        "winRate": 50.6,
        "games": 5473
      },
      {
        "name": "Abomasnow",
        "winRate": 50,
        "games": 10841
      },
      {
        "name": "Blastoise",
        "winRate": 49.9,
        "games": 10796
      }
    ],
    "bestSets": []
  },
  "3-mega": {
    "id": 3,
    "name": "Mega Venusaur",
    "isMega": true,
    "elo": 9276,
    "winRate": 56.6,
    "appearances": 13953,
    "wins": 7895,
    "losses": 6058,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 72.5,
        "games": 3548
      },
      {
        "name": "Kingambit",
        "winRate": 72.5,
        "games": 3548
      },
      {
        "name": "Incineroar",
        "winRate": 59.2,
        "games": 8727
      },
      {
        "name": "Feraligatr",
        "winRate": 59.2,
        "games": 8727
      },
      {
        "name": "Blastoise",
        "winRate": 56.6,
        "games": 13953
      }
    ],
    "bestSets": []
  },
  "445-mega": {
    "id": 445,
    "name": "Mega Garchomp",
    "isMega": true,
    "elo": 9274,
    "winRate": 53.6,
    "appearances": 19702,
    "wins": 10570,
    "losses": 9132,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 72.5,
        "games": 3656
      },
      {
        "name": "Arcanine",
        "winRate": 58.6,
        "games": 8978
      },
      {
        "name": "Primarina",
        "winRate": 58.6,
        "games": 8978
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 58.6,
        "games": 8978
      },
      {
        "name": "Kingambit",
        "winRate": 58.4,
        "games": 9143
      }
    ],
    "bestSets": []
  },
  "36-mega": {
    "id": 36,
    "name": "Mega Clefable",
    "isMega": true,
    "elo": 9273,
    "winRate": 50.4,
    "appearances": 14493,
    "wins": 7309,
    "losses": 7184,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 55.3,
        "games": 4765
      },
      {
        "name": "Scizor",
        "winRate": 55.3,
        "games": 4765
      },
      {
        "name": "Krookodile",
        "winRate": 55.3,
        "games": 4765
      },
      {
        "name": "Archaludon",
        "winRate": 54.4,
        "games": 9769
      },
      {
        "name": "Aegislash",
        "winRate": 53.4,
        "games": 5004
      }
    ],
    "bestSets": []
  },
  "448-mega-z": {
    "id": 448,
    "name": "Mega Lucario Z",
    "isMega": true,
    "elo": 9273,
    "winRate": 50.4,
    "appearances": 16013,
    "wins": 8070,
    "losses": 7943,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.8,
        "games": 5331
      },
      {
        "name": "Pelipper",
        "winRate": 50.8,
        "games": 5331
      },
      {
        "name": "Starmie",
        "winRate": 50.8,
        "games": 5331
      },
      {
        "name": "Dragonite",
        "winRate": 50.8,
        "games": 5312
      },
      {
        "name": "Altaria",
        "winRate": 50.8,
        "games": 5312
      }
    ],
    "bestSets": []
  },
  "359-mega-z": {
    "id": 359,
    "name": "Mega Absol Z",
    "isMega": true,
    "elo": 9271,
    "winRate": 49,
    "appearances": 16040,
    "wins": 7862,
    "losses": 8178,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 49.9,
        "games": 5454
      },
      {
        "name": "Arcanine",
        "winRate": 49.4,
        "games": 10882
      },
      {
        "name": "Clefable",
        "winRate": 49.1,
        "games": 10612
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49,
        "games": 16040
      },
      {
        "name": "Gyarados",
        "winRate": 49,
        "games": 16040
      }
    ],
    "bestSets": []
  },
  "9-mega": {
    "id": 9,
    "name": "Mega Blastoise",
    "isMega": true,
    "elo": 9271,
    "winRate": 55.4,
    "appearances": 43181,
    "wins": 23926,
    "losses": 19255,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 67.8,
        "games": 3967
      },
      {
        "name": "Sinistcha",
        "winRate": 67.7,
        "games": 7850
      },
      {
        "name": "Decidueye",
        "winRate": 67.7,
        "games": 7850
      },
      {
        "name": "Goodra",
        "winRate": 67.6,
        "games": 3883
      },
      {
        "name": "Tsareena",
        "winRate": 67.6,
        "games": 3883
      }
    ],
    "bestSets": []
  },
  "445-mega-z": {
    "id": 445,
    "name": "Mega Garchomp Z",
    "isMega": true,
    "elo": 9271,
    "winRate": 57.7,
    "appearances": 13633,
    "wins": 7873,
    "losses": 5760,
    "bestPartners": [
      {
        "name": "Alolan Ninetales",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Azumarill",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Kingambit",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Heat Rotom",
        "winRate": 69.2,
        "games": 3682
      },
      {
        "name": "Primarina",
        "winRate": 63.2,
        "games": 8275
      }
    ],
    "bestSets": []
  },
  "478-mega": {
    "id": 478,
    "name": "Mega Froslass",
    "isMega": true,
    "elo": 9271,
    "winRate": 58.3,
    "appearances": 13630,
    "wins": 7947,
    "losses": 5683,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 59.6,
        "games": 4369
      },
      {
        "name": "Krookodile",
        "winRate": 59.4,
        "games": 8856
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Lucario",
        "winRate": 59.2,
        "games": 4487
      },
      {
        "name": "Incineroar",
        "winRate": 57.9,
        "games": 9143
      }
    ],
    "bestSets": []
  },
  "154-mega": {
    "id": 154,
    "name": "Mega Meganium",
    "isMega": true,
    "elo": 9270,
    "winRate": 51.5,
    "appearances": 15679,
    "wins": 8069,
    "losses": 7610,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 54.8,
        "games": 4968
      },
      {
        "name": "Heat Rotom",
        "winRate": 52.6,
        "games": 10325
      },
      {
        "name": "Tinkaton",
        "winRate": 52.6,
        "games": 10325
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 52,
        "games": 10322
      },
      {
        "name": "Primarina",
        "winRate": 52,
        "games": 10322
      }
    ],
    "bestSets": []
  },
  "780-mega": {
    "id": 780,
    "name": "Mega Drampa",
    "isMega": true,
    "elo": 9269,
    "winRate": 47.7,
    "appearances": 15737,
    "wins": 7503,
    "losses": 8234,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 50.3,
        "games": 5583
      },
      {
        "name": "Ninetales",
        "winRate": 50.3,
        "games": 5583
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 48.2,
        "games": 5313
      },
      {
        "name": "Charizard",
        "winRate": 48.2,
        "games": 5313
      },
      {
        "name": "Scizor",
        "winRate": 48.2,
        "games": 5313
      }
    ],
    "bestSets": []
  },
  "978-mega": {
    "id": 978,
    "name": "Mega Tatsugiri",
    "isMega": true,
    "elo": 9263,
    "winRate": 50.6,
    "appearances": 16061,
    "wins": 8129,
    "losses": 7932,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 50.9,
        "games": 5477
      },
      {
        "name": "Klefki",
        "winRate": 50.9,
        "games": 5477
      },
      {
        "name": "Tinkaton",
        "winRate": 50.8,
        "games": 10892
      },
      {
        "name": "Scizor",
        "winRate": 50.8,
        "games": 10892
      },
      {
        "name": "Skarmory",
        "winRate": 50.6,
        "games": 16061
      }
    ],
    "bestSets": []
  },
  "149-mega": {
    "id": 149,
    "name": "Mega Dragonite",
    "isMega": true,
    "elo": 9261,
    "winRate": 48.6,
    "appearances": 78343,
    "wins": 38042,
    "losses": 40301,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 50.6,
        "games": 5513
      },
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 5513
      },
      {
        "name": "Sneasler",
        "winRate": 50.6,
        "games": 5513
      },
      {
        "name": "Lucario",
        "winRate": 50.1,
        "games": 5504
      },
      {
        "name": "Milotic",
        "winRate": 50,
        "games": 26833
      }
    ],
    "bestSets": []
  },
  "160-mega": {
    "id": 160,
    "name": "Mega Feraligatr",
    "isMega": true,
    "elo": 9261,
    "winRate": 52.3,
    "appearances": 20469,
    "wins": 10708,
    "losses": 9761,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 59.7,
        "games": 4450
      },
      {
        "name": "Krookodile",
        "winRate": 59.7,
        "games": 4450
      },
      {
        "name": "Serperior",
        "winRate": 54.7,
        "games": 9933
      },
      {
        "name": "Tsareena",
        "winRate": 54.6,
        "games": 9824
      },
      {
        "name": "Venusaur",
        "winRate": 53.2,
        "games": 15307
      }
    ],
    "bestSets": []
  },
  "80-mega": {
    "id": 80,
    "name": "Mega Slowbro",
    "isMega": true,
    "elo": 9258,
    "winRate": 54.8,
    "appearances": 14829,
    "wins": 8131,
    "losses": 6698,
    "bestPartners": [
      {
        "name": "Conkeldurr",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Sneasler",
        "winRate": 61.5,
        "games": 4401
      },
      {
        "name": "Incineroar",
        "winRate": 57.3,
        "games": 9538
      },
      {
        "name": "Kingambit",
        "winRate": 57.3,
        "games": 9538
      },
      {
        "name": "Arcanine",
        "winRate": 57.3,
        "games": 9538
      }
    ],
    "bestSets": []
  },
  "500-mega": {
    "id": 500,
    "name": "Mega Emboar",
    "isMega": true,
    "elo": 9256,
    "winRate": 50.9,
    "appearances": 15940,
    "wins": 8108,
    "losses": 7832,
    "bestPartners": [
      {
        "name": "Emolga",
        "winRate": 51.4,
        "games": 5252
      },
      {
        "name": "Metagross",
        "winRate": 51.4,
        "games": 5252
      },
      {
        "name": "Archaludon",
        "winRate": 51.4,
        "games": 5252
      },
      {
        "name": "Starmie",
        "winRate": 51,
        "games": 10488
      },
      {
        "name": "Alolan Raichu",
        "winRate": 50.9,
        "games": 15940
      }
    ],
    "bestSets": []
  },
  "670-mega": {
    "id": 670,
    "name": "Mega Floette",
    "isMega": true,
    "elo": 9254,
    "winRate": 47.7,
    "appearances": 24566,
    "wins": 11710,
    "losses": 12856,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 54,
        "games": 5086
      },
      {
        "name": "Gliscor",
        "winRate": 54,
        "games": 5086
      },
      {
        "name": "Slowbro",
        "winRate": 54,
        "games": 5086
      },
      {
        "name": "Archaludon",
        "winRate": 53.6,
        "games": 10222
      },
      {
        "name": "Scizor",
        "winRate": 53.1,
        "games": 5136
      }
    ],
    "bestSets": []
  },
  "94-mega": {
    "id": 94,
    "name": "Mega Gengar",
    "isMega": true,
    "elo": 9254,
    "winRate": 46.2,
    "appearances": 19573,
    "wins": 9051,
    "losses": 10522,
    "bestPartners": [
      {
        "name": "Farigiraf",
        "winRate": 50.6,
        "games": 5155
      },
      {
        "name": "Umbreon",
        "winRate": 50.1,
        "games": 10574
      },
      {
        "name": "Zoroark",
        "winRate": 50.1,
        "games": 10574
      },
      {
        "name": "Greninja",
        "winRate": 49.8,
        "games": 15803
      },
      {
        "name": "Krookodile",
        "winRate": 49.4,
        "games": 10648
      }
    ],
    "bestSets": []
  },
  "181-mega": {
    "id": 181,
    "name": "Mega Ampharos",
    "isMega": true,
    "elo": 9249,
    "winRate": 49.7,
    "appearances": 16110,
    "wins": 8000,
    "losses": 8110,
    "bestPartners": [
      {
        "name": "Skarmory",
        "winRate": 50.2,
        "games": 5316
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 10524
      },
      {
        "name": "Pelipper",
        "winRate": 49.7,
        "games": 10902
      },
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 16110
      },
      {
        "name": "Pinsir",
        "winRate": 49.7,
        "games": 10902
      }
    ],
    "bestSets": []
  },
  "214-mega": {
    "id": 214,
    "name": "Mega Heracross",
    "isMega": true,
    "elo": 9247,
    "winRate": 50,
    "appearances": 21248,
    "wins": 10628,
    "losses": 10620,
    "bestPartners": [
      {
        "name": "Tinkaton",
        "winRate": 51.9,
        "games": 5211
      },
      {
        "name": "Greninja",
        "winRate": 50.5,
        "games": 10516
      },
      {
        "name": "Archaludon",
        "winRate": 50.3,
        "games": 15943
      },
      {
        "name": "Tyranitar",
        "winRate": 50.3,
        "games": 10528
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5415
      }
    ],
    "bestSets": []
  },
  "531-mega": {
    "id": 531,
    "name": "Mega Audino",
    "isMega": true,
    "elo": 9245,
    "winRate": 44.5,
    "appearances": 14400,
    "wins": 6414,
    "losses": 7986,
    "bestPartners": [
      {
        "name": "Hatterene",
        "winRate": 50.6,
        "games": 5363
      },
      {
        "name": "Galarian Slowking",
        "winRate": 50.6,
        "games": 5363
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 10665
      },
      {
        "name": "Slowbro",
        "winRate": 49.4,
        "games": 10665
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 42.4,
        "games": 9098
      }
    ],
    "bestSets": []
  },
  "26-mega-x": {
    "id": 26,
    "name": "Mega Raichu X",
    "isMega": true,
    "elo": 9241,
    "winRate": 48.9,
    "appearances": 16163,
    "wins": 7896,
    "losses": 8267,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5615
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 5615
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 5615
      },
      {
        "name": "Krookodile",
        "winRate": 49.8,
        "games": 11092
      },
      {
        "name": "Araquanid",
        "winRate": 48.9,
        "games": 5477
      }
    ],
    "bestSets": []
  },
  "306-mega": {
    "id": 306,
    "name": "Mega Aggron",
    "isMega": true,
    "elo": 9240,
    "winRate": 46.8,
    "appearances": 15156,
    "wins": 7094,
    "losses": 8062,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 5422
      },
      {
        "name": "Altaria",
        "winRate": 50.1,
        "games": 5422
      },
      {
        "name": "Dragonite",
        "winRate": 49.9,
        "games": 10828
      },
      {
        "name": "Tsareena",
        "winRate": 49.7,
        "games": 5406
      },
      {
        "name": "Whimsicott",
        "winRate": 46.8,
        "games": 15156
      }
    ],
    "bestSets": []
  },
  "212-mega": {
    "id": 212,
    "name": "Mega Scizor",
    "isMega": true,
    "elo": 9238,
    "winRate": 51.1,
    "appearances": 85098,
    "wins": 43472,
    "losses": 41626,
    "bestPartners": [
      {
        "name": "Ninetales",
        "winRate": 56,
        "games": 4799
      },
      {
        "name": "Primarina",
        "winRate": 55.4,
        "games": 9649
      },
      {
        "name": "Decidueye",
        "winRate": 53.1,
        "games": 10224
      },
      {
        "name": "Sneasler",
        "winRate": 52.8,
        "games": 10134
      },
      {
        "name": "Dragapult",
        "winRate": 52.5,
        "games": 15498
      }
    ],
    "bestSets": []
  },
  "530-mega": {
    "id": 530,
    "name": "Mega Excadrill",
    "isMega": true,
    "elo": 9235,
    "winRate": 51,
    "appearances": 15729,
    "wins": 8014,
    "losses": 7715,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Hawlucha",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Greninja",
        "winRate": 53.4,
        "games": 5109
      },
      {
        "name": "Tatsugiri",
        "winRate": 51.5,
        "games": 10425
      },
      {
        "name": "Pelipper",
        "winRate": 51,
        "games": 15729
      }
    ],
    "bestSets": []
  },
  "740-mega": {
    "id": 740,
    "name": "Mega Crabominable",
    "isMega": true,
    "elo": 9234,
    "winRate": 42.9,
    "appearances": 14102,
    "wins": 6050,
    "losses": 8052,
    "bestPartners": [
      {
        "name": "Delphox",
        "winRate": 50.4,
        "games": 5384
      },
      {
        "name": "Starmie",
        "winRate": 50.4,
        "games": 5384
      },
      {
        "name": "Ninetales",
        "winRate": 50.4,
        "games": 5384
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 10885
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 5501
      }
    ],
    "bestSets": []
  },
  "26-mega-y": {
    "id": 26,
    "name": "Mega Raichu Y",
    "isMega": true,
    "elo": 9229,
    "winRate": 45.1,
    "appearances": 14545,
    "wins": 6562,
    "losses": 7983,
    "bestPartners": [
      {
        "name": "Alcremie",
        "winRate": 51,
        "games": 5519
      },
      {
        "name": "Charizard",
        "winRate": 51,
        "games": 5519
      },
      {
        "name": "Pinsir",
        "winRate": 51,
        "games": 5519
      },
      {
        "name": "Krookodile",
        "winRate": 50.8,
        "games": 11143
      },
      {
        "name": "Arcanine",
        "winRate": 50.8,
        "games": 11143
      }
    ],
    "bestSets": []
  },
  "952-mega": {
    "id": 952,
    "name": "Mega Scovillain",
    "isMega": true,
    "elo": 9229,
    "winRate": 49.9,
    "appearances": 16227,
    "wins": 8096,
    "losses": 8131,
    "bestPartners": [
      {
        "name": "Aggron",
        "winRate": 50.7,
        "games": 5448
      },
      {
        "name": "Krookodile",
        "winRate": 50.7,
        "games": 5448
      },
      {
        "name": "Skarmory",
        "winRate": 50.7,
        "games": 5448
      },
      {
        "name": "Empoleon",
        "winRate": 50.7,
        "games": 5448
      },
      {
        "name": "Corviknight",
        "winRate": 50.7,
        "games": 5448
      }
    ],
    "bestSets": []
  },
  "142-mega": {
    "id": 142,
    "name": "Mega Aerodactyl",
    "isMega": true,
    "elo": 9228,
    "winRate": 50.6,
    "appearances": 16151,
    "wins": 8170,
    "losses": 7981,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 51.8,
        "games": 5419
      },
      {
        "name": "Chesnaught",
        "winRate": 51.8,
        "games": 5419
      },
      {
        "name": "Empoleon",
        "winRate": 51.8,
        "games": 5419
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 10745
      },
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 16151
      }
    ],
    "bestSets": []
  },
  "334-mega": {
    "id": 334,
    "name": "Mega Altaria",
    "isMega": true,
    "elo": 9225,
    "winRate": 45.7,
    "appearances": 19684,
    "wins": 8987,
    "losses": 10697,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 50.6,
        "games": 5564
      },
      {
        "name": "Sneasler",
        "winRate": 50.6,
        "games": 5564
      },
      {
        "name": "Tinkaton",
        "winRate": 47,
        "games": 10137
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 46.8,
        "games": 15186
      },
      {
        "name": "Scizor",
        "winRate": 46.7,
        "games": 10062
      }
    ],
    "bestSets": []
  },
  "359-mega": {
    "id": 359,
    "name": "Mega Absol",
    "isMega": true,
    "elo": 9219,
    "winRate": 49.4,
    "appearances": 16186,
    "wins": 7993,
    "losses": 8193,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 50.2,
        "games": 5341
      },
      {
        "name": "Ninetales",
        "winRate": 50.2,
        "games": 5341
      },
      {
        "name": "Scizor",
        "winRate": 49.7,
        "games": 10824
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 16186
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.4,
        "games": 16186
      }
    ],
    "bestSets": []
  },
  "6-mega-x": {
    "id": 6,
    "name": "Mega Charizard X",
    "isMega": true,
    "elo": 9215,
    "winRate": 49,
    "appearances": 13168,
    "wins": 6455,
    "losses": 6713,
    "bestPartners": [
      {
        "name": "Tsareena",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Empoleon",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Ursaluna",
        "winRate": 64.4,
        "games": 4171
      },
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 8959
      },
      {
        "name": "Garchomp",
        "winRate": 51.5,
        "games": 8380
      }
    ],
    "bestSets": []
  },
  "678-mega": {
    "id": 678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 9211,
    "winRate": 44.3,
    "appearances": 14351,
    "wins": 6363,
    "losses": 7988,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 5498
      },
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 5498
      },
      {
        "name": "Kingambit",
        "winRate": 49.7,
        "games": 5498
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.7,
        "games": 5498
      },
      {
        "name": "Heracross",
        "winRate": 49.1,
        "games": 5298
      }
    ],
    "bestSets": []
  },
  "65-mega": {
    "id": 65,
    "name": "Mega Alakazam",
    "isMega": true,
    "elo": 9210,
    "winRate": 52.5,
    "appearances": 15271,
    "wins": 8013,
    "losses": 7258,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 55.8,
        "games": 4834
      },
      {
        "name": "Hydreigon",
        "winRate": 54.4,
        "games": 9979
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 53.1,
        "games": 5145
      },
      {
        "name": "Greninja",
        "winRate": 53.1,
        "games": 5145
      },
      {
        "name": "Sylveon",
        "winRate": 53.1,
        "games": 5145
      }
    ],
    "bestSets": []
  },
  "15-mega": {
    "id": 15,
    "name": "Mega Beedrill",
    "isMega": true,
    "elo": 9208,
    "winRate": 48.3,
    "appearances": 15481,
    "wins": 7478,
    "losses": 8003,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 50.2,
        "games": 5069
      },
      {
        "name": "Hydreigon",
        "winRate": 49.1,
        "games": 10324
      },
      {
        "name": "Slowbro",
        "winRate": 49.1,
        "games": 10324
      },
      {
        "name": "Morpeko",
        "winRate": 49.1,
        "games": 10324
      },
      {
        "name": "Incineroar",
        "winRate": 48.4,
        "games": 10226
      }
    ],
    "bestSets": []
  },
  "71-mega": {
    "id": 71,
    "name": "Mega Victreebel",
    "isMega": true,
    "elo": 9206,
    "winRate": 49.8,
    "appearances": 15610,
    "wins": 7775,
    "losses": 7835,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.3,
        "games": 5143
      },
      {
        "name": "Alolan Raichu",
        "winRate": 49.8,
        "games": 10520
      },
      {
        "name": "Blastoise",
        "winRate": 49.8,
        "games": 10520
      },
      {
        "name": "Slowbro",
        "winRate": 49.8,
        "games": 10520
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 15610
      }
    ],
    "bestSets": []
  },
  "227-mega": {
    "id": 227,
    "name": "Mega Skarmory",
    "isMega": true,
    "elo": 9206,
    "winRate": 49.8,
    "appearances": 16453,
    "wins": 8187,
    "losses": 8266,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.6,
        "games": 5463
      },
      {
        "name": "Hydreigon",
        "winRate": 50.6,
        "games": 5463
      },
      {
        "name": "Kommo-o",
        "winRate": 50.1,
        "games": 10930
      },
      {
        "name": "Dragapult",
        "winRate": 50.1,
        "games": 10930
      },
      {
        "name": "Garchomp",
        "winRate": 49.9,
        "games": 10986
      }
    ],
    "bestSets": []
  },
  "460-mega": {
    "id": 460,
    "name": "Mega Abomasnow",
    "isMega": true,
    "elo": 9199,
    "winRate": 49.5,
    "appearances": 19640,
    "wins": 9722,
    "losses": 9918,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 56.3,
        "games": 4809
      },
      {
        "name": "Incineroar",
        "winRate": 56.3,
        "games": 4809
      },
      {
        "name": "Arcanine",
        "winRate": 54.1,
        "games": 9992
      },
      {
        "name": "Gyarados",
        "winRate": 52,
        "games": 5183
      },
      {
        "name": "Charizard",
        "winRate": 52,
        "games": 5183
      }
    ],
    "bestSets": []
  },
  "701-mega": {
    "id": 701,
    "name": "Mega Hawlucha",
    "isMega": true,
    "elo": 9196,
    "winRate": 50.2,
    "appearances": 15997,
    "wins": 8032,
    "losses": 7965,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 50.5,
        "games": 5349
      },
      {
        "name": "Krookodile",
        "winRate": 50.5,
        "games": 5349
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.3,
        "games": 10828
      },
      {
        "name": "Aggron",
        "winRate": 50.3,
        "games": 10518
      },
      {
        "name": "Archaludon",
        "winRate": 50.2,
        "games": 15997
      }
    ],
    "bestSets": []
  },
  "229-mega": {
    "id": 229,
    "name": "Mega Houndoom",
    "isMega": true,
    "elo": 9194,
    "winRate": 47.9,
    "appearances": 15024,
    "wins": 7192,
    "losses": 7832,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 5170
      },
      {
        "name": "Slowbro",
        "winRate": 50.3,
        "games": 5170
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 10341
      },
      {
        "name": "Decidueye",
        "winRate": 50.1,
        "games": 10341
      },
      {
        "name": "Hawlucha",
        "winRate": 49.9,
        "games": 5171
      }
    ],
    "bestSets": []
  },
  "652-mega": {
    "id": 652,
    "name": "Mega Chesnaught",
    "isMega": true,
    "elo": 9187,
    "winRate": 51.4,
    "appearances": 15960,
    "wins": 8202,
    "losses": 7758,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 53.1,
        "games": 5104
      },
      {
        "name": "Empoleon",
        "winRate": 53.1,
        "games": 5104
      },
      {
        "name": "Tinkaton",
        "winRate": 52,
        "games": 10612
      },
      {
        "name": "Starmie",
        "winRate": 51.6,
        "games": 10452
      },
      {
        "name": "Heat Rotom",
        "winRate": 51.4,
        "games": 15960
      }
    ],
    "bestSets": []
  },
  "658-mega": {
    "id": 658,
    "name": "Mega Greninja",
    "isMega": true,
    "elo": 9181,
    "winRate": 50.4,
    "appearances": 16275,
    "wins": 8202,
    "losses": 8073,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 5458
      },
      {
        "name": "Gliscor",
        "winRate": 50.6,
        "games": 5458
      },
      {
        "name": "Sinistcha",
        "winRate": 50.6,
        "games": 5458
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.5,
        "games": 5504
      },
      {
        "name": "Venusaur",
        "winRate": 50.5,
        "games": 5504
      }
    ],
    "bestSets": []
  },
  "475-mega": {
    "id": 475,
    "name": "Mega Gallade",
    "isMega": true,
    "elo": 9168,
    "winRate": 46.7,
    "appearances": 15312,
    "wins": 7157,
    "losses": 8155,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 50.5,
        "games": 5360
      },
      {
        "name": "Kingambit",
        "winRate": 48,
        "games": 10364
      },
      {
        "name": "Excadrill",
        "winRate": 47.4,
        "games": 10308
      },
      {
        "name": "Arcanine",
        "winRate": 47.4,
        "games": 10308
      },
      {
        "name": "Aggron",
        "winRate": 46.7,
        "games": 15312
      }
    ],
    "bestSets": []
  }
};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = [
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Garchomp",
    "winRate": 72.5,
    "games": 3656
  },
  {
    "pokemon1": "Gyarados",
    "pokemon2": "Mega Venusaur",
    "winRate": 72.5,
    "games": 3548
  },
  {
    "pokemon1": "Mega Venusaur",
    "pokemon2": "Kingambit",
    "winRate": 72.5,
    "games": 3548
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Alolan Ninetales",
    "winRate": 70.8,
    "games": 7338
  },
  {
    "pokemon1": "Primarina",
    "pokemon2": "Kingambit",
    "winRate": 70.8,
    "games": 7338
  },
  {
    "pokemon1": "Tyranitar",
    "pokemon2": "Torkoal",
    "winRate": 69.4,
    "games": 3888
  },
  {
    "pokemon1": "Alolan Ninetales",
    "pokemon2": "Mega Garchomp Z",
    "winRate": 69.2,
    "games": 3682
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Mega Garchomp Z",
    "winRate": 69.2,
    "games": 3682
  },
  {
    "pokemon1": "Mega Garchomp Z",
    "pokemon2": "Kingambit",
    "winRate": 69.2,
    "games": 3682
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Garchomp Z",
    "winRate": 69.2,
    "games": 3682
  },
  {
    "pokemon1": "Alolan Ninetales",
    "pokemon2": "Azumarill",
    "winRate": 69.2,
    "games": 3682
  },
  {
    "pokemon1": "Hydrapple",
    "pokemon2": "Mega Charizard Y",
    "winRate": 68.3,
    "games": 3900
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Hydrapple",
    "winRate": 68.3,
    "games": 3900
  },
  {
    "pokemon1": "Hydrapple",
    "pokemon2": "Tinkaton",
    "winRate": 68.3,
    "games": 3900
  },
  {
    "pokemon1": "Hydrapple",
    "pokemon2": "Clefable",
    "winRate": 68.3,
    "games": 3900
  },
  {
    "pokemon1": "Mega Charizard Y",
    "pokemon2": "Tinkaton",
    "winRate": 68.3,
    "games": 3900
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Blastoise",
    "winRate": 67.8,
    "games": 3967
  },
  {
    "pokemon1": "Sinistcha",
    "pokemon2": "Whimsicott",
    "winRate": 67.8,
    "games": 3967
  },
  {
    "pokemon1": "Sinistcha",
    "pokemon2": "Venusaur",
    "winRate": 67.8,
    "games": 3967
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Decidueye",
    "winRate": 67.8,
    "games": 3967
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Venusaur",
    "winRate": 67.8,
    "games": 3967
  },
  {
    "pokemon1": "Venusaur",
    "pokemon2": "Decidueye",
    "winRate": 67.8,
    "games": 3967
  },
  {
    "pokemon1": "Sinistcha",
    "pokemon2": "Mega Blastoise",
    "winRate": 67.7,
    "games": 7850
  },
  {
    "pokemon1": "Decidueye",
    "pokemon2": "Mega Blastoise",
    "winRate": 67.7,
    "games": 7850
  },
  {
    "pokemon1": "Goodra",
    "pokemon2": "Mega Blastoise",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Tsareena",
    "pokemon2": "Mega Blastoise",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Krookodile",
    "pokemon2": "Mega Blastoise",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Goodra",
    "pokemon2": "Decidueye",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Decidueye",
    "pokemon2": "Tsareena",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Sinistcha",
    "pokemon2": "Goodra",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Goodra",
    "pokemon2": "Tsareena",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Krookodile",
    "pokemon2": "Goodra",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Sinistcha",
    "pokemon2": "Tsareena",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Sinistcha",
    "pokemon2": "Krookodile",
    "winRate": 67.6,
    "games": 3883
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Slowbro",
    "winRate": 66,
    "games": 12269
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Torkoal",
    "winRate": 66,
    "games": 12269
  },
  {
    "pokemon1": "Gyarados",
    "pokemon2": "Mega Charizard Y",
    "winRate": 65.2,
    "games": 8138
  },
  {
    "pokemon1": "Mega Charizard X",
    "pokemon2": "Tsareena",
    "winRate": 64.4,
    "games": 4171
  },
  {
    "pokemon1": "Empoleon",
    "pokemon2": "Mega Charizard X",
    "winRate": 64.4,
    "games": 4171
  },
  {
    "pokemon1": "Mega Charizard X",
    "pokemon2": "Ursaluna",
    "winRate": 64.4,
    "games": 4171
  },
  {
    "pokemon1": "Empoleon",
    "pokemon2": "Tsareena",
    "winRate": 64.4,
    "games": 4171
  },
  {
    "pokemon1": "Tsareena",
    "pokemon2": "Ursaluna",
    "winRate": 64.4,
    "games": 4171
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Empoleon",
    "winRate": 64.4,
    "games": 4171
  },
  {
    "pokemon1": "Mega Garchomp Z",
    "pokemon2": "Primarina",
    "winRate": 63.2,
    "games": 8275
  },
  {
    "pokemon1": "Venusaur",
    "pokemon2": "Mega Blastoise",
    "winRate": 63,
    "games": 8469
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Chesnaught",
    "winRate": 62.4,
    "games": 4238
  },
  {
    "pokemon1": "Chesnaught",
    "pokemon2": "Slowbro",
    "winRate": 62.4,
    "games": 4238
  },
  {
    "pokemon1": "Chesnaught",
    "pokemon2": "Kingambit",
    "winRate": 62.4,
    "games": 4238
  },
  {
    "pokemon1": "Mega Charizard Y",
    "pokemon2": "Slowbro",
    "winRate": 62.4,
    "games": 4238
  },
  {
    "pokemon1": "Mega Charizard Y",
    "pokemon2": "Kingambit",
    "winRate": 62.4,
    "games": 4238
  }
];

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = [
  {
    "name": "custom",
    "elo": 116948,
    "winRate": 52.2,
    "wins": 171990,
    "losses": 157559
  },
  {
    "name": "Mega Garchomp",
    "elo": 30716,
    "winRate": 56.6,
    "wins": 15750,
    "losses": 12098
  },
  {
    "name": "Mega Blastoise",
    "elo": 30076,
    "winRate": 64.5,
    "wins": 7962,
    "losses": 4390
  },
  {
    "name": "Sun Trick Room",
    "elo": 24332,
    "winRate": 51.6,
    "wins": 45166,
    "losses": 42312
  },
  {
    "name": "Hard Trick Room",
    "elo": 22212,
    "winRate": 65.9,
    "wins": 5366,
    "losses": 2777
  },
  {
    "name": "Mega Froslass",
    "elo": 19612,
    "winRate": 58.3,
    "wins": 7947,
    "losses": 5683
  },
  {
    "name": "Mega Venusaur",
    "elo": 16196,
    "winRate": 56.6,
    "wins": 7895,
    "losses": 6058
  },
  {
    "name": "Heracross Base",
    "elo": 13468,
    "winRate": 58.2,
    "wins": 5303,
    "losses": 3807
  },
  {
    "name": "Mega Slowbro",
    "elo": 12964,
    "winRate": 54.8,
    "wins": 8131,
    "losses": 6698
  },
  {
    "name": "Mega Pinsir",
    "elo": 11532,
    "winRate": 54.2,
    "wins": 8168,
    "losses": 6914
  },
  {
    "name": "Mega Delphox",
    "elo": 11196,
    "winRate": 54,
    "wins": 8242,
    "losses": 7030
  },
  {
    "name": "Slowbro Trick Room",
    "elo": 11124,
    "winRate": 54,
    "wins": 8107,
    "losses": 6904
  },
  {
    "name": "Meganium Base",
    "elo": 10028,
    "winRate": 55.5,
    "wins": 5412,
    "losses": 4346
  },
  {
    "name": "Sandaconda Build",
    "elo": 9956,
    "winRate": 53.6,
    "wins": 7943,
    "losses": 6886
  },
  {
    "name": "Mega Lucario",
    "elo": 9828,
    "winRate": 51.6,
    "wins": 16310,
    "losses": 15269
  },
  {
    "name": "Mega Feraligatr",
    "elo": 9364,
    "winRate": 53.2,
    "wins": 8145,
    "losses": 7162
  },
  {
    "name": "Pinsir Base",
    "elo": 8180,
    "winRate": 54.1,
    "wins": 5527,
    "losses": 4692
  },
  {
    "name": "Mega Starmie",
    "elo": 7780,
    "winRate": 52.6,
    "wins": 7951,
    "losses": 7166
  },
  {
    "name": "Mega Alakazam",
    "elo": 7540,
    "winRate": 52.5,
    "wins": 8013,
    "losses": 7258
  },
  {
    "name": "Kleavor Build",
    "elo": 7420,
    "winRate": 53.7,
    "wins": 5389,
    "losses": 4649
  },
  {
    "name": "Sun",
    "elo": 7324,
    "winRate": 50.9,
    "wins": 21174,
    "losses": 20446
  },
  {
    "name": "Tailwind",
    "elo": 7116,
    "winRate": 50.2,
    "wins": 72354,
    "losses": 71652
  },
  {
    "name": "Body Press",
    "elo": 6556,
    "winRate": 56.6,
    "wins": 2723,
    "losses": 2091
  },
  {
    "name": "Leafeon Build",
    "elo": 6116,
    "winRate": 56,
    "wins": 2699,
    "losses": 2122
  },
  {
    "name": "Gourgeist Build",
    "elo": 6012,
    "winRate": 51.8,
    "wins": 8106,
    "losses": 7542
  },
  {
    "name": "Mega Abomasnow",
    "elo": 5508,
    "winRate": 51.7,
    "wins": 7746,
    "losses": 7245
  },
  {
    "name": "Mega Meganium",
    "elo": 5172,
    "winRate": 51.5,
    "wins": 8069,
    "losses": 7610
  },
  {
    "name": "Clefable Base",
    "elo": 5164,
    "winRate": 52.1,
    "wins": 5626,
    "losses": 5168
  },
  {
    "name": "Mega Chesnaught",
    "elo": 5052,
    "winRate": 51.4,
    "wins": 8202,
    "losses": 7758
  },
  {
    "name": "Trick Room Sun",
    "elo": 4972,
    "winRate": 52.1,
    "wins": 5480,
    "losses": 5046
  },
  {
    "name": "Floette Base",
    "elo": 4692,
    "winRate": 51.9,
    "wins": 5524,
    "losses": 5125
  },
  {
    "name": "Mega Excadrill",
    "elo": 3892,
    "winRate": 51,
    "wins": 8014,
    "losses": 7715
  },
  {
    "name": "Mega Emboar",
    "elo": 3708,
    "winRate": 50.9,
    "wins": 8108,
    "losses": 7832
  },
  {
    "name": "Pivot Chain",
    "elo": 3540,
    "winRate": 52.4,
    "wins": 2742,
    "losses": 2487
  },
  {
    "name": "Bulky Offense",
    "elo": 3492,
    "winRate": 50.5,
    "wins": 13565,
    "losses": 13316
  },
  {
    "name": "Chesnaught Base",
    "elo": 3492,
    "winRate": 51.2,
    "wins": 5477,
    "losses": 5228
  },
  {
    "name": "Delphox Base",
    "elo": 3452,
    "winRate": 51.1,
    "wins": 5448,
    "losses": 5204
  },
  {
    "name": "Feraligatr Base",
    "elo": 3260,
    "winRate": 51,
    "wins": 5531,
    "losses": 5311
  },
  {
    "name": "Mega Tatsugiri",
    "elo": 3076,
    "winRate": 50.6,
    "wins": 8129,
    "losses": 7932
  },
  {
    "name": "Mega Aerodactyl",
    "elo": 3012,
    "winRate": 50.6,
    "wins": 8170,
    "losses": 7981
  },
  {
    "name": "Mega Chandelure",
    "elo": 2700,
    "winRate": 50.5,
    "wins": 8376,
    "losses": 8226
  },
  {
    "name": "Emboar Base",
    "elo": 2652,
    "winRate": 50.7,
    "wins": 5469,
    "losses": 5325
  },
  {
    "name": "Greninja Base",
    "elo": 2572,
    "winRate": 50.6,
    "wins": 5566,
    "losses": 5432
  },
  {
    "name": "Mega Greninja",
    "elo": 2532,
    "winRate": 50.4,
    "wins": 8202,
    "losses": 8073
  },
  {
    "name": "Audino Base",
    "elo": 2516,
    "winRate": 50.6,
    "wins": 5463,
    "losses": 5336
  },
  {
    "name": "Mega Clefable",
    "elo": 2500,
    "winRate": 50.4,
    "wins": 7309,
    "losses": 7184
  },
  {
    "name": "Clawitzer Build",
    "elo": 2412,
    "winRate": 50.5,
    "wins": 5260,
    "losses": 5146
  },
  {
    "name": "Starmie Base",
    "elo": 2404,
    "winRate": 50.5,
    "wins": 5468,
    "losses": 5355
  },
  {
    "name": "Fan Rotom Build",
    "elo": 2372,
    "winRate": 51,
    "wins": 2828,
    "losses": 2719
  },
  {
    "name": "Houndoom Base",
    "elo": 2356,
    "winRate": 50.5,
    "wins": 5368,
    "losses": 5261
  }
];

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = [
  {
    "name": "Feint",
    "winRate": 60.8,
    "appearances": 4408
  },
  {
    "name": "Matcha Gotcha",
    "winRate": 58,
    "appearances": 22837
  },
  {
    "name": "Aromatherapy",
    "winRate": 55.7,
    "appearances": 4870
  },
  {
    "name": "Mortal Spin",
    "winRate": 54.2,
    "appearances": 9404
  },
  {
    "name": "Water Pulse",
    "winRate": 54,
    "appearances": 69130
  },
  {
    "name": "Electro Shot",
    "winRate": 53.5,
    "appearances": 295042
  },
  {
    "name": "Fickle Beam",
    "winRate": 53.3,
    "appearances": 20184
  },
  {
    "name": "Giga Drain",
    "winRate": 53.2,
    "appearances": 74663
  },
  {
    "name": "Stone Axe",
    "winRate": 52.6,
    "appearances": 15400
  },
  {
    "name": "Leech Seed",
    "winRate": 52.5,
    "appearances": 20549
  },
  {
    "name": "High Jump Kick",
    "winRate": 52.2,
    "appearances": 76867
  },
  {
    "name": "Power Whip",
    "winRate": 52.2,
    "appearances": 76560
  },
  {
    "name": "Aura Sphere",
    "winRate": 52.1,
    "appearances": 158344
  },
  {
    "name": "Dire Claw",
    "winRate": 52.1,
    "appearances": 131051
  },
  {
    "name": "Megahorn",
    "winRate": 52.1,
    "appearances": 30780
  },
  {
    "name": "Facade",
    "winRate": 52,
    "appearances": 122809
  },
  {
    "name": "Belly Drum",
    "winRate": 51.8,
    "appearances": 109145
  },
  {
    "name": "Spirit Shackle",
    "winRate": 51.7,
    "appearances": 69949
  },
  {
    "name": "Eruption",
    "winRate": 51.5,
    "appearances": 245807
  },
  {
    "name": "Instruct",
    "winRate": 51.5,
    "appearances": 31350
  },
  {
    "name": "Volt Switch",
    "winRate": 51.4,
    "appearances": 311136
  },
  {
    "name": "Earth Power",
    "winRate": 51.4,
    "appearances": 547163
  },
  {
    "name": "Leaf Storm",
    "winRate": 51.2,
    "appearances": 347510
  },
  {
    "name": "Body Press",
    "winRate": 51.2,
    "appearances": 506972
  },
  {
    "name": "Energy Ball",
    "winRate": 51.1,
    "appearances": 203872
  },
  {
    "name": "Mystical Fire",
    "winRate": 51.1,
    "appearances": 41488
  },
  {
    "name": "Flash Cannon",
    "winRate": 51,
    "appearances": 990033
  },
  {
    "name": "Aqua Jet",
    "winRate": 51,
    "appearances": 182095
  },
  {
    "name": "Hidden Power Ground",
    "winRate": 51,
    "appearances": 5497
  },
  {
    "name": "Ice Beam",
    "winRate": 50.9,
    "appearances": 1129729
  },
  {
    "name": "Overheat",
    "winRate": 50.9,
    "appearances": 509615
  },
  {
    "name": "Curse",
    "winRate": 50.9,
    "appearances": 69053
  },
  {
    "name": "Kowtow Cleave",
    "winRate": 50.8,
    "appearances": 780859
  },
  {
    "name": "Sludge Wave",
    "winRate": 50.8,
    "appearances": 30790
  },
  {
    "name": "Body Slam",
    "winRate": 50.8,
    "appearances": 78739
  },
  {
    "name": "Fire Fang",
    "winRate": 50.7,
    "appearances": 142695
  },
  {
    "name": "Gigaton Hammer",
    "winRate": 50.7,
    "appearances": 240049
  },
  {
    "name": "Vacuum Wave",
    "winRate": 50.7,
    "appearances": 89424
  },
  {
    "name": "Beat Up",
    "winRate": 50.7,
    "appearances": 5507
  },
  {
    "name": "High Horsepower",
    "winRate": 50.7,
    "appearances": 84838
  },
  {
    "name": "Seed Bomb",
    "winRate": 50.7,
    "appearances": 31442
  },
  {
    "name": "Scald",
    "winRate": 50.6,
    "appearances": 1058859
  },
  {
    "name": "Jet Punch",
    "winRate": 50.6,
    "appearances": 214503
  },
  {
    "name": "Power Gem",
    "winRate": 50.6,
    "appearances": 36376
  },
  {
    "name": "Sacred Sword",
    "winRate": 50.6,
    "appearances": 56974
  },
  {
    "name": "Calm Mind",
    "winRate": 50.6,
    "appearances": 10766
  },
  {
    "name": "Glare",
    "winRate": 50.6,
    "appearances": 56476
  },
  {
    "name": "Thunderbolt",
    "winRate": 50.5,
    "appearances": 592656
  },
  {
    "name": "Meteor Mash",
    "winRate": 50.5,
    "appearances": 32441
  },
  {
    "name": "Water Shuriken",
    "winRate": 50.5,
    "appearances": 5560
  }
];

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = {
  "tier1": [
    "Mega Pinsir",
    "Mega Kangaskhan",
    "Venusaur",
    "Ursaluna",
    "Gliscor",
    "Primarina",
    "Hydrapple",
    "Mega Metagross",
    "Archaludon",
    "Excadrill",
    "Greninja",
    "Sneasler",
    "Mega Gardevoir",
    "Froslass",
    "Gardevoir",
    "Mega Charizard Y",
    "Metagross",
    "Mega Lopunny"
  ],
  "tier2": [
    "Tsareena",
    "Whimsicott",
    "Dondozo",
    "Galarian Slowbro",
    "Pinsir",
    "Chesnaught",
    "Mega Starmie",
    "Sylveon",
    "Glaceon",
    "Meowscarada",
    "Alolan Ninetales",
    "Conkeldurr",
    "Mega Sableye",
    "Garchomp",
    "Fan Rotom",
    "Tinkaton",
    "Mega Gyarados",
    "Mega Chandelure",
    "Sinistcha",
    "Incineroar",
    "Drampa",
    "Mega Lucario",
    "Mimikyu",
    "Leafeon",
    "Lycanroc",
    "Dragapult",
    "Clawitzer",
    "Armarouge",
    "Mega Steelix",
    "Mega Delphox",
    "Feraligatr",
    "Heat Rotom",
    "Lucario",
    "Azumarill",
    "Trevenant",
    "Sableye",
    "Politoed",
    "Milotic"
  ],
  "tier3": [
    "Hydreigon",
    "Grimmsnarl",
    "Scizor",
    "Polteageist",
    "Lopunny",
    "Delphox",
    "Glimmora",
    "Tyranitar",
    "Wash Rotom",
    "Blastoise",
    "Mega Tyranitar",
    "Mega Glimmora",
    "Mega Venusaur",
    "Farigiraf",
    "Gyarados",
    "Garganacl",
    "Ampharos",
    "Mega Garchomp",
    "Mega Clefable",
    "Mega Lucario Z",
    "Aegislash",
    "Torkoal",
    "Mr. Rime",
    "Gengar",
    "Mega Absol Z",
    "Heracross",
    "Empoleon",
    "Mega Blastoise",
    "Mega Garchomp Z",
    "Mega Froslass",
    "Mega Meganium",
    "Galarian Stunfisk",
    "Snorlax",
    "Mega Drampa",
    "Basculegion",
    "Talonflame",
    "Alakazam",
    "Samurott",
    "Slowking",
    "Skarmory",
    "Mega Tatsugiri",
    "Sandaconda",
    "Mega Dragonite",
    "Mega Feraligatr",
    "Raichu",
    "Pelipper",
    "Kingambit",
    "Noivern",
    "Hatterene",
    "Mega Slowbro",
    "Crabominable",
    "Galarian Slowking",
    "Rotom",
    "Mega Emboar",
    "Mega Floette",
    "Mega Gengar",
    "Emboar",
    "Kleavor",
    "Hisuian Samurott",
    "Vaporeon",
    "Palafin",
    "Serperior",
    "Alcremie",
    "Mamoswine",
    "Mow Rotom",
    "Torterra",
    "Clefable",
    "Emolga"
  ],
  "dominantArchetypes": [
    "custom",
    "Mega Garchomp",
    "Mega Blastoise",
    "Sun Trick Room",
    "Hard Trick Room"
  ],
  "underratedPokemon": [],
  "overratedPokemon": [
    "Alakazam",
    "Emolga",
    "Mega Audino",
    "Mega Crabominable",
    "Runerigus"
  ],
  "bestCores": [
    "Gyarados + Mega Venusaur",
    "Mega Venusaur + Kingambit",
    "Heat Rotom + Mega Garchomp",
    "Heat Rotom + Alolan Ninetales",
    "Primarina + Kingambit"
  ]
};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = 2000000;

/** Simulation date */
export const SIM_DATE = "2026-03-31T12:12:29.124Z";

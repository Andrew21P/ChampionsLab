// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from 83,493,000 mega-aware battle simulations
// Date: 2026-04-03T10:33:33.694Z
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
    "elo": 15027,
    "winRate": 51.1,
    "appearances": 15426321,
    "wins": 7890534,
    "losses": 7535787,
    "bestPartners": [
      {
        "name": "Mow Rotom",
        "winRate": 74.7,
        "games": 6087
      },
      {
        "name": "Victreebel",
        "winRate": 71.3,
        "games": 6425
      },
      {
        "name": "Kommo-o",
        "winRate": 65.7,
        "games": 20665
      },
      {
        "name": "Mega Starmie",
        "winRate": 65.2,
        "games": 13722
      },
      {
        "name": "Conkeldurr",
        "winRate": 65.2,
        "games": 13722
      }
    ],
    "bestSets": []
  },
  "6": {
    "id": 6,
    "name": "Charizard",
    "isMega": false,
    "elo": 15023,
    "winRate": 50.1,
    "appearances": 10231671,
    "wins": 5121171,
    "losses": 5110500,
    "bestPartners": [
      {
        "name": "Mow Rotom",
        "winRate": 63,
        "games": 7195
      },
      {
        "name": "Mega Sableye",
        "winRate": 61.4,
        "games": 126545
      },
      {
        "name": "Mega Metagross",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Kommo-o",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Meowscarada",
        "winRate": 61.1,
        "games": 7417
      }
    ],
    "bestSets": []
  },
  "9": {
    "id": 9,
    "name": "Blastoise",
    "isMega": false,
    "elo": 15031,
    "winRate": 51.3,
    "appearances": 10228646,
    "wins": 5244938,
    "losses": 4983708,
    "bestPartners": [
      {
        "name": "Fan Rotom",
        "winRate": 65.3,
        "games": 83186
      },
      {
        "name": "Sneasler",
        "winRate": 64,
        "games": 348715
      },
      {
        "name": "Kingambit",
        "winRate": 63.9,
        "games": 128588
      },
      {
        "name": "Sylveon",
        "winRate": 62.9,
        "games": 174087
      },
      {
        "name": "Mega Froslass",
        "winRate": 62.9,
        "games": 21453
      }
    ],
    "bestSets": []
  },
  "15": {
    "id": 15,
    "name": "Beedrill",
    "isMega": false,
    "elo": 14944,
    "winRate": 44.4,
    "appearances": 452875,
    "wins": 201258,
    "losses": 251617,
    "bestPartners": [
      {
        "name": "Morpeko",
        "winRate": 50.1,
        "games": 9488
      },
      {
        "name": "Sinistcha",
        "winRate": 50.1,
        "games": 9488
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 9488
      },
      {
        "name": "Heracross",
        "winRate": 50.1,
        "games": 9488
      },
      {
        "name": "Arcanine",
        "winRate": 50.1,
        "games": 9488
      }
    ],
    "bestSets": []
  },
  "25": {
    "id": 25,
    "name": "Pikachu",
    "isMega": false,
    "elo": 14984,
    "winRate": 47.3,
    "appearances": 636997,
    "wins": 301239,
    "losses": 335758,
    "bestPartners": [
      {
        "name": "Sinistcha",
        "winRate": 50.3,
        "games": 55080
      },
      {
        "name": "Skarmory",
        "winRate": 50.3,
        "games": 18613
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.3,
        "games": 27407
      },
      {
        "name": "Pinsir",
        "winRate": 50.1,
        "games": 36278
      },
      {
        "name": "Heracross",
        "winRate": 50,
        "games": 65273
      }
    ],
    "bestSets": []
  },
  "26": {
    "id": 26,
    "name": "Raichu",
    "isMega": false,
    "elo": 15001,
    "winRate": 49.1,
    "appearances": 941130,
    "wins": 462245,
    "losses": 478885,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 359477
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.7,
        "games": 434923
      },
      {
        "name": "Arcanine",
        "winRate": 49.6,
        "games": 453648
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 899620
      },
      {
        "name": "Incineroar",
        "winRate": 49.4,
        "games": 899620
      }
    ],
    "bestSets": []
  },
  "36": {
    "id": 36,
    "name": "Clefable",
    "isMega": false,
    "elo": 15027,
    "winRate": 50.9,
    "appearances": 6784987,
    "wins": 3451396,
    "losses": 3333591,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 64.8,
        "games": 168172
      },
      {
        "name": "Froslass",
        "winRate": 64.5,
        "games": 140766
      },
      {
        "name": "Mega Sableye",
        "winRate": 64.2,
        "games": 170998
      },
      {
        "name": "Krookodile",
        "winRate": 64.1,
        "games": 92155
      },
      {
        "name": "Mega Pinsir",
        "winRate": 61.6,
        "games": 156548
      }
    ],
    "bestSets": []
  },
  "38": {
    "id": 38,
    "name": "Ninetales",
    "isMega": false,
    "elo": 14990,
    "winRate": 48.8,
    "appearances": 2604746,
    "wins": 1270477,
    "losses": 1334269,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 59.5,
        "games": 7851
      },
      {
        "name": "Mega Absol Z",
        "winRate": 56.2,
        "games": 16599
      },
      {
        "name": "Hawlucha",
        "winRate": 56.2,
        "games": 24080
      },
      {
        "name": "Primarina",
        "winRate": 55.8,
        "games": 16441
      },
      {
        "name": "Blastoise",
        "winRate": 55.8,
        "games": 8265
      }
    ],
    "bestSets": []
  },
  "59": {
    "id": 59,
    "name": "Arcanine",
    "isMega": false,
    "elo": 15005,
    "winRate": 49.2,
    "appearances": 19639566,
    "wins": 9668766,
    "losses": 9970800,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 68.8,
        "games": 99130
      },
      {
        "name": "Serperior",
        "winRate": 68.7,
        "games": 26678
      },
      {
        "name": "Archaludon",
        "winRate": 66.7,
        "games": 109753
      },
      {
        "name": "Tyranitar",
        "winRate": 66.1,
        "games": 6966
      },
      {
        "name": "Meowscarada",
        "winRate": 64.2,
        "games": 42355
      }
    ],
    "bestSets": []
  },
  "65": {
    "id": 65,
    "name": "Alakazam",
    "isMega": false,
    "elo": 14980,
    "winRate": 47,
    "appearances": 666962,
    "wins": 313196,
    "losses": 353766,
    "bestPartners": [
      {
        "name": "Alolan Raichu",
        "winRate": 50.6,
        "games": 9535
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.6,
        "games": 9535
      },
      {
        "name": "Maushold",
        "winRate": 50.6,
        "games": 9293
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 27948
      },
      {
        "name": "Furfrou",
        "winRate": 50.3,
        "games": 9323
      }
    ],
    "bestSets": []
  },
  "71": {
    "id": 71,
    "name": "Victreebel",
    "isMega": false,
    "elo": 15043,
    "winRate": 52.5,
    "appearances": 994435,
    "wins": 522140,
    "losses": 472295,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 65.1,
        "games": 91569
      },
      {
        "name": "Whimsicott",
        "winRate": 62.6,
        "games": 36818
      },
      {
        "name": "Mega Blastoise",
        "winRate": 61.4,
        "games": 127032
      },
      {
        "name": "Incineroar",
        "winRate": 60.8,
        "games": 60454
      },
      {
        "name": "Sinistcha",
        "winRate": 60.6,
        "games": 68483
      }
    ],
    "bestSets": []
  },
  "80": {
    "id": 80,
    "name": "Slowbro",
    "isMega": false,
    "elo": 15040,
    "winRate": 50.3,
    "appearances": 10524412,
    "wins": 5293523,
    "losses": 5230889,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 60.5,
        "games": 511111
      },
      {
        "name": "Primarina",
        "winRate": 59.3,
        "games": 23136
      },
      {
        "name": "Metagross",
        "winRate": 57.7,
        "games": 7935
      },
      {
        "name": "Palafin",
        "winRate": 57.6,
        "games": 31999
      },
      {
        "name": "Kleavor",
        "winRate": 57.1,
        "games": 16230
      }
    ],
    "bestSets": []
  },
  "94": {
    "id": 94,
    "name": "Gengar",
    "isMega": false,
    "elo": 15010,
    "winRate": 49.5,
    "appearances": 12409982,
    "wins": 6143883,
    "losses": 6266099,
    "bestPartners": [
      {
        "name": "Heracross",
        "winRate": 57.1,
        "games": 8231
      },
      {
        "name": "Volcarona",
        "winRate": 53.4,
        "games": 17305
      },
      {
        "name": "Decidueye",
        "winRate": 51.5,
        "games": 18442
      },
      {
        "name": "Arcanine",
        "winRate": 51.2,
        "games": 27756
      },
      {
        "name": "Venusaur",
        "winRate": 50.9,
        "games": 53829
      }
    ],
    "bestSets": []
  },
  "115": {
    "id": 115,
    "name": "Kangaskhan",
    "isMega": false,
    "elo": 14997,
    "winRate": 49,
    "appearances": 1183868,
    "wins": 580187,
    "losses": 603681,
    "bestPartners": [
      {
        "name": "Maushold",
        "winRate": 50.6,
        "games": 9368
      },
      {
        "name": "Charizard",
        "winRate": 50.6,
        "games": 9368
      },
      {
        "name": "Venusaur",
        "winRate": 50,
        "games": 18785
      },
      {
        "name": "Mega Sableye",
        "winRate": 49.8,
        "games": 37133
      },
      {
        "name": "Krookodile",
        "winRate": 49.6,
        "games": 394527
      }
    ],
    "bestSets": []
  },
  "121": {
    "id": 121,
    "name": "Starmie",
    "isMega": false,
    "elo": 15011,
    "winRate": 49.3,
    "appearances": 2261608,
    "wins": 1114077,
    "losses": 1147531,
    "bestPartners": [
      {
        "name": "Volcarona",
        "winRate": 56.1,
        "games": 8362
      },
      {
        "name": "Archaludon",
        "winRate": 55.8,
        "games": 8530
      },
      {
        "name": "Scizor",
        "winRate": 54.8,
        "games": 34366
      },
      {
        "name": "Mega Drampa",
        "winRate": 54.5,
        "games": 25836
      },
      {
        "name": "Primarina",
        "winRate": 54.3,
        "games": 43401
      }
    ],
    "bestSets": []
  },
  "127": {
    "id": 127,
    "name": "Pinsir",
    "isMega": false,
    "elo": 15000,
    "winRate": 50,
    "appearances": 1058859,
    "wins": 529082,
    "losses": 529777,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 54.5,
        "games": 412470
      },
      {
        "name": "Kingambit",
        "winRate": 54.5,
        "games": 412470
      },
      {
        "name": "Empoleon",
        "winRate": 54.5,
        "games": 412470
      },
      {
        "name": "Rhyperior",
        "winRate": 54.5,
        "games": 412470
      },
      {
        "name": "Wash Rotom",
        "winRate": 54.5,
        "games": 412470
      }
    ],
    "bestSets": []
  },
  "130": {
    "id": 130,
    "name": "Gyarados",
    "isMega": false,
    "elo": 15017,
    "winRate": 50,
    "appearances": 53922357,
    "wins": 26952375,
    "losses": 26969982,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 69.2,
        "games": 6436
      },
      {
        "name": "Mega Scovillain",
        "winRate": 63.5,
        "games": 7078
      },
      {
        "name": "Mega Venusaur",
        "winRate": 63.3,
        "games": 36034
      },
      {
        "name": "Espeon",
        "winRate": 61.4,
        "games": 7504
      },
      {
        "name": "Mega Pinsir",
        "winRate": 60.7,
        "games": 90467
      }
    ],
    "bestSets": []
  },
  "132": {
    "id": 132,
    "name": "Ditto",
    "isMega": false,
    "elo": 14951,
    "winRate": 44.9,
    "appearances": 648719,
    "wins": 291517,
    "losses": 357202,
    "bestPartners": [
      {
        "name": "Ursaluna",
        "winRate": 50.8,
        "games": 17829
      },
      {
        "name": "Tinkaton",
        "winRate": 50.6,
        "games": 38304
      },
      {
        "name": "Meowstic",
        "winRate": 50.6,
        "games": 9349
      },
      {
        "name": "Charizard",
        "winRate": 50.6,
        "games": 9349
      },
      {
        "name": "Torkoal",
        "winRate": 50.4,
        "games": 17231
      }
    ],
    "bestSets": []
  },
  "134": {
    "id": 134,
    "name": "Vaporeon",
    "isMega": false,
    "elo": 15013,
    "winRate": 49.9,
    "appearances": 1895484,
    "wins": 946472,
    "losses": 949012,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 66.1,
        "games": 6760
      },
      {
        "name": "Heat Rotom",
        "winRate": 58,
        "games": 23912
      },
      {
        "name": "Tatsugiri",
        "winRate": 55.7,
        "games": 8501
      },
      {
        "name": "Archaludon",
        "winRate": 55.7,
        "games": 8501
      },
      {
        "name": "Gourgeist",
        "winRate": 54,
        "games": 43346
      }
    ],
    "bestSets": []
  },
  "135": {
    "id": 135,
    "name": "Jolteon",
    "isMega": false,
    "elo": 14985,
    "winRate": 48.7,
    "appearances": 676989,
    "wins": 329874,
    "losses": 347115,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 50.6,
        "games": 19064
      },
      {
        "name": "Skarmory",
        "winRate": 50.4,
        "games": 28286
      },
      {
        "name": "Politoed",
        "winRate": 50.3,
        "games": 84455
      },
      {
        "name": "Blastoise",
        "winRate": 50.3,
        "games": 55553
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 19184
      }
    ],
    "bestSets": []
  },
  "136": {
    "id": 136,
    "name": "Flareon",
    "isMega": false,
    "elo": 14951,
    "winRate": 45.8,
    "appearances": 608676,
    "wins": 278886,
    "losses": 329790,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 56,
        "games": 33521
      },
      {
        "name": "Dragapult",
        "winRate": 55.2,
        "games": 16981
      },
      {
        "name": "Archaludon",
        "winRate": 54,
        "games": 69755
      },
      {
        "name": "Decidueye",
        "winRate": 53.7,
        "games": 34785
      },
      {
        "name": "Palafin",
        "winRate": 52.7,
        "games": 34741
      }
    ],
    "bestSets": []
  },
  "142": {
    "id": 142,
    "name": "Aerodactyl",
    "isMega": false,
    "elo": 15025,
    "winRate": 49.8,
    "appearances": 1972126,
    "wins": 981572,
    "losses": 990554,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 59.6,
        "games": 7674
      },
      {
        "name": "Froslass",
        "winRate": 59.6,
        "games": 7674
      },
      {
        "name": "Greninja",
        "winRate": 56.9,
        "games": 8172
      },
      {
        "name": "Talonflame",
        "winRate": 56.9,
        "games": 8172
      },
      {
        "name": "Metagross",
        "winRate": 54.6,
        "games": 42937
      }
    ],
    "bestSets": []
  },
  "143": {
    "id": 143,
    "name": "Snorlax",
    "isMega": false,
    "elo": 15020,
    "winRate": 50.1,
    "appearances": 3738651,
    "wins": 1873083,
    "losses": 1865568,
    "bestPartners": [
      {
        "name": "Espeon",
        "winRate": 61.4,
        "games": 7504
      },
      {
        "name": "Greninja",
        "winRate": 61.4,
        "games": 7504
      },
      {
        "name": "Scizor",
        "winRate": 60.4,
        "games": 7648
      },
      {
        "name": "Archaludon",
        "winRate": 60.4,
        "games": 7648
      },
      {
        "name": "Torkoal",
        "winRate": 60.2,
        "games": 397136
      }
    ],
    "bestSets": []
  },
  "149": {
    "id": 149,
    "name": "Dragonite",
    "isMega": false,
    "elo": 15014,
    "winRate": 48.9,
    "appearances": 18846249,
    "wins": 9213987,
    "losses": 9632262,
    "bestPartners": [
      {
        "name": "Mega Chandelure",
        "winRate": 54,
        "games": 17042
      },
      {
        "name": "Ceruledge",
        "winRate": 53.3,
        "games": 17922
      },
      {
        "name": "Lucario",
        "winRate": 52.5,
        "games": 25660
      },
      {
        "name": "Primarina",
        "winRate": 52.3,
        "games": 43965
      },
      {
        "name": "Quaquaval",
        "winRate": 51.8,
        "games": 36447
      }
    ],
    "bestSets": []
  },
  "154": {
    "id": 154,
    "name": "Meganium",
    "isMega": false,
    "elo": 15053,
    "winRate": 56.7,
    "appearances": 522490,
    "wins": 296178,
    "losses": 226312,
    "bestPartners": [
      {
        "name": "Meowscarada",
        "winRate": 63.8,
        "games": 6980
      },
      {
        "name": "Venusaur",
        "winRate": 63.8,
        "games": 6980
      },
      {
        "name": "Kommo-o",
        "winRate": 62.6,
        "games": 14527
      },
      {
        "name": "Hydreigon",
        "winRate": 61.5,
        "games": 7547
      },
      {
        "name": "Archaludon",
        "winRate": 61.1,
        "games": 22476
      }
    ],
    "bestSets": []
  },
  "157": {
    "id": 157,
    "name": "Typhlosion",
    "isMega": false,
    "elo": 14996,
    "winRate": 49.2,
    "appearances": 739552,
    "wins": 363690,
    "losses": 375862,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 73.7,
        "games": 12417
      },
      {
        "name": "Garchomp",
        "winRate": 64,
        "games": 21598
      },
      {
        "name": "Pawmot",
        "winRate": 64,
        "games": 21730
      },
      {
        "name": "Fan Rotom",
        "winRate": 58.1,
        "games": 15989
      },
      {
        "name": "Araquanid",
        "winRate": 57.3,
        "games": 16337
      }
    ],
    "bestSets": []
  },
  "160": {
    "id": 160,
    "name": "Feraligatr",
    "isMega": false,
    "elo": 15031,
    "winRate": 50.3,
    "appearances": 1306046,
    "wins": 656827,
    "losses": 649219,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 57.7,
        "games": 15995
      },
      {
        "name": "Primarina",
        "winRate": 56.8,
        "games": 8340
      },
      {
        "name": "Gourgeist",
        "winRate": 55.3,
        "games": 25153
      },
      {
        "name": "Heat Rotom",
        "winRate": 55.1,
        "games": 25275
      },
      {
        "name": "Fan Rotom",
        "winRate": 54.6,
        "games": 8660
      }
    ],
    "bestSets": []
  },
  "181": {
    "id": 181,
    "name": "Ampharos",
    "isMega": false,
    "elo": 14996,
    "winRate": 49.9,
    "appearances": 443075,
    "wins": 221097,
    "losses": 221978,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 435198
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 435198
      },
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 435198
      },
      {
        "name": "Whimsicott",
        "winRate": 50.1,
        "games": 435198
      },
      {
        "name": "Krookodile",
        "winRate": 50.1,
        "games": 435198
      }
    ],
    "bestSets": []
  },
  "184": {
    "id": 184,
    "name": "Azumarill",
    "isMega": false,
    "elo": 15033,
    "winRate": 51.1,
    "appearances": 5144484,
    "wins": 2629273,
    "losses": 2515211,
    "bestPartners": [
      {
        "name": "Metagross",
        "winRate": 72.1,
        "games": 6479
      },
      {
        "name": "Skarmory",
        "winRate": 72.1,
        "games": 6479
      },
      {
        "name": "Morpeko",
        "winRate": 68.8,
        "games": 13188
      },
      {
        "name": "Greninja",
        "winRate": 67,
        "games": 20085
      },
      {
        "name": "Empoleon",
        "winRate": 66.1,
        "games": 13411
      }
    ],
    "bestSets": []
  },
  "186": {
    "id": 186,
    "name": "Politoed",
    "isMega": false,
    "elo": 15014,
    "winRate": 49.7,
    "appearances": 8595532,
    "wins": 4275687,
    "losses": 4319845,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 51.8,
        "games": 18014
      },
      {
        "name": "Krookodile",
        "winRate": 51.7,
        "games": 18018
      },
      {
        "name": "Primarina",
        "winRate": 51.5,
        "games": 18073
      },
      {
        "name": "Mow Rotom",
        "winRate": 51.4,
        "games": 27750
      },
      {
        "name": "Kleavor",
        "winRate": 51.3,
        "games": 27088
      }
    ],
    "bestSets": []
  },
  "196": {
    "id": 196,
    "name": "Espeon",
    "isMega": false,
    "elo": 14968,
    "winRate": 45.2,
    "appearances": 820714,
    "wins": 371116,
    "losses": 449598,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 61.4,
        "games": 7504
      },
      {
        "name": "Sneasler",
        "winRate": 55.5,
        "games": 17028
      },
      {
        "name": "Greninja",
        "winRate": 54.9,
        "games": 16555
      },
      {
        "name": "Hydreigon",
        "winRate": 50.9,
        "games": 18787
      },
      {
        "name": "Hawlucha",
        "winRate": 50.9,
        "games": 9524
      }
    ],
    "bestSets": []
  },
  "197": {
    "id": 197,
    "name": "Umbreon",
    "isMega": false,
    "elo": 14993,
    "winRate": 48.3,
    "appearances": 2546918,
    "wins": 1230493,
    "losses": 1316425,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 60.1,
        "games": 23002
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 55.8,
        "games": 22557
      },
      {
        "name": "Hydreigon",
        "winRate": 55.5,
        "games": 67071
      },
      {
        "name": "Empoleon",
        "winRate": 55.1,
        "games": 67691
      },
      {
        "name": "Archaludon",
        "winRate": 54.8,
        "games": 8642
      }
    ],
    "bestSets": []
  },
  "199": {
    "id": 199,
    "name": "Slowking",
    "isMega": false,
    "elo": 14985,
    "winRate": 48.2,
    "appearances": 660173,
    "wins": 318226,
    "losses": 341947,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 52.1,
        "games": 36525
      },
      {
        "name": "Infernape",
        "winRate": 51.9,
        "games": 36341
      },
      {
        "name": "Sneasler",
        "winRate": 51.6,
        "games": 45733
      },
      {
        "name": "Meowscarada",
        "winRate": 51.4,
        "games": 54494
      },
      {
        "name": "Venusaur",
        "winRate": 51,
        "games": 18905
      }
    ],
    "bestSets": []
  },
  "208": {
    "id": 208,
    "name": "Steelix",
    "isMega": false,
    "elo": 14995,
    "winRate": 48,
    "appearances": 4549436,
    "wins": 2185500,
    "losses": 2363936,
    "bestPartners": [
      {
        "name": "Tsareena",
        "winRate": 57.9,
        "games": 23886
      },
      {
        "name": "Whimsicott",
        "winRate": 57.3,
        "games": 57205
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 57.3,
        "games": 56333
      },
      {
        "name": "Kommo-o",
        "winRate": 56.8,
        "games": 33245
      },
      {
        "name": "Sneasler",
        "winRate": 54.6,
        "games": 60195
      }
    ],
    "bestSets": []
  },
  "212": {
    "id": 212,
    "name": "Scizor",
    "isMega": false,
    "elo": 15011,
    "winRate": 50.4,
    "appearances": 16350523,
    "wins": 8242297,
    "losses": 8108226,
    "bestPartners": [
      {
        "name": "Mudsdale",
        "winRate": 69.9,
        "games": 6435
      },
      {
        "name": "Greninja",
        "winRate": 69.9,
        "games": 6435
      },
      {
        "name": "Azumarill",
        "winRate": 62.2,
        "games": 22150
      },
      {
        "name": "Mega Greninja",
        "winRate": 61,
        "games": 15021
      },
      {
        "name": "Decidueye",
        "winRate": 61,
        "games": 15021
      }
    ],
    "bestSets": []
  },
  "214": {
    "id": 214,
    "name": "Heracross",
    "isMega": false,
    "elo": 15007,
    "winRate": 50.1,
    "appearances": 1706157,
    "wins": 854225,
    "losses": 851932,
    "bestPartners": [
      {
        "name": "Fan Rotom",
        "winRate": 60.4,
        "games": 7624
      },
      {
        "name": "Dragapult",
        "winRate": 60.4,
        "games": 7624
      },
      {
        "name": "Drampa",
        "winRate": 60.3,
        "games": 22331
      },
      {
        "name": "Torkoal",
        "winRate": 59.6,
        "games": 45401
      },
      {
        "name": "Venusaur",
        "winRate": 58.7,
        "games": 46695
      }
    ],
    "bestSets": []
  },
  "227": {
    "id": 227,
    "name": "Skarmory",
    "isMega": false,
    "elo": 15002,
    "winRate": 48.8,
    "appearances": 3863892,
    "wins": 1887287,
    "losses": 1976605,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 72.1,
        "games": 6479
      },
      {
        "name": "Azumarill",
        "winRate": 57.4,
        "games": 24500
      },
      {
        "name": "Metagross",
        "winRate": 56.7,
        "games": 25279
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 53.7,
        "games": 51576
      },
      {
        "name": "Primarina",
        "winRate": 53.6,
        "games": 52029
      }
    ],
    "bestSets": []
  },
  "229": {
    "id": 229,
    "name": "Houndoom",
    "isMega": false,
    "elo": 15011,
    "winRate": 51.9,
    "appearances": 593879,
    "wins": 308294,
    "losses": 285585,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 61.6,
        "games": 29320
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 60,
        "games": 30506
      },
      {
        "name": "Incineroar",
        "winRate": 60,
        "games": 15259
      },
      {
        "name": "Arcanine",
        "winRate": 59.8,
        "games": 7843
      },
      {
        "name": "Krookodile",
        "winRate": 58.6,
        "games": 23699
      }
    ],
    "bestSets": []
  },
  "248": {
    "id": 248,
    "name": "Tyranitar",
    "isMega": false,
    "elo": 15017,
    "winRate": 49.7,
    "appearances": 23481927,
    "wins": 11663277,
    "losses": 11818650,
    "bestPartners": [
      {
        "name": "Vivillon",
        "winRate": 63.1,
        "games": 7189
      },
      {
        "name": "Torkoal",
        "winRate": 59.4,
        "games": 364280
      },
      {
        "name": "Ursaluna",
        "winRate": 59.4,
        "games": 31524
      },
      {
        "name": "Orthworm",
        "winRate": 59.1,
        "games": 15702
      },
      {
        "name": "Mega Scovillain",
        "winRate": 58.8,
        "games": 7789
      }
    ],
    "bestSets": []
  },
  "279": {
    "id": 279,
    "name": "Pelipper",
    "isMega": false,
    "elo": 15002,
    "winRate": 49.5,
    "appearances": 2613375,
    "wins": 1294782,
    "losses": 1318593,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 56.4,
        "games": 25114
      },
      {
        "name": "Mega Lucario",
        "winRate": 56.2,
        "games": 16332
      },
      {
        "name": "Archaludon",
        "winRate": 55.7,
        "games": 8566
      },
      {
        "name": "Basculegion",
        "winRate": 54.1,
        "games": 25572
      },
      {
        "name": "Fan Rotom",
        "winRate": 53.4,
        "games": 35119
      }
    ],
    "bestSets": []
  },
  "282": {
    "id": 282,
    "name": "Gardevoir",
    "isMega": false,
    "elo": 15014,
    "winRate": 49.4,
    "appearances": 17239700,
    "wins": 8516167,
    "losses": 8723533,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 59.2,
        "games": 187340
      },
      {
        "name": "Snorlax",
        "winRate": 53.8,
        "games": 408638
      },
      {
        "name": "Froslass",
        "winRate": 53.6,
        "games": 17781
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 53.5,
        "games": 8941
      },
      {
        "name": "Hydreigon",
        "winRate": 53.1,
        "games": 8691
      }
    ],
    "bestSets": []
  },
  "302": {
    "id": 302,
    "name": "Sableye",
    "isMega": false,
    "elo": 15011,
    "winRate": 49.8,
    "appearances": 1443642,
    "wins": 718878,
    "losses": 724764,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 63.7,
        "games": 171564
      },
      {
        "name": "Garchomp",
        "winRate": 56,
        "games": 388307
      },
      {
        "name": "Whimsicott",
        "winRate": 54,
        "games": 539423
      },
      {
        "name": "Dragapult",
        "winRate": 53.4,
        "games": 546811
      },
      {
        "name": "Incineroar",
        "winRate": 52,
        "games": 804376
      }
    ],
    "bestSets": []
  },
  "306": {
    "id": 306,
    "name": "Aggron",
    "isMega": false,
    "elo": 14992,
    "winRate": 48,
    "appearances": 3107696,
    "wins": 1491526,
    "losses": 1616170,
    "bestPartners": [
      {
        "name": "Alolan Raichu",
        "winRate": 65.6,
        "games": 6981
      },
      {
        "name": "Mega Meganium",
        "winRate": 64,
        "games": 7317
      },
      {
        "name": "Tinkaton",
        "winRate": 61.2,
        "games": 7501
      },
      {
        "name": "Krookodile",
        "winRate": 61,
        "games": 14867
      },
      {
        "name": "Mega Venusaur",
        "winRate": 59.6,
        "games": 15306
      }
    ],
    "bestSets": []
  },
  "324": {
    "id": 324,
    "name": "Torkoal",
    "isMega": false,
    "elo": 15024,
    "winRate": 51,
    "appearances": 8711644,
    "wins": 4446242,
    "losses": 4265402,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 65.4,
        "games": 7143
      },
      {
        "name": "Mow Rotom",
        "winRate": 63,
        "games": 7195
      },
      {
        "name": "Primarina",
        "winRate": 63,
        "games": 7195
      },
      {
        "name": "Azumarill",
        "winRate": 62.6,
        "games": 14095
      },
      {
        "name": "Conkeldurr",
        "winRate": 62.1,
        "games": 35933
      }
    ],
    "bestSets": []
  },
  "334": {
    "id": 334,
    "name": "Altaria",
    "isMega": false,
    "elo": 15012,
    "winRate": 47.5,
    "appearances": 5793898,
    "wins": 2752459,
    "losses": 3041439,
    "bestPartners": [
      {
        "name": "Mega Houndoom",
        "winRate": 60.1,
        "games": 7688
      },
      {
        "name": "Blastoise",
        "winRate": 56.8,
        "games": 7924
      },
      {
        "name": "Quaquaval",
        "winRate": 55.7,
        "games": 33571
      },
      {
        "name": "Ceruledge",
        "winRate": 54.8,
        "games": 8642
      },
      {
        "name": "Sneasler",
        "winRate": 54.4,
        "games": 8623
      }
    ],
    "bestSets": []
  },
  "350": {
    "id": 350,
    "name": "Milotic",
    "isMega": false,
    "elo": 15024,
    "winRate": 50.5,
    "appearances": 4427695,
    "wins": 2233808,
    "losses": 2193887,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 69.2,
        "games": 6436
      },
      {
        "name": "Vivillon",
        "winRate": 63.1,
        "games": 7189
      },
      {
        "name": "Orthworm",
        "winRate": 63.1,
        "games": 7189
      },
      {
        "name": "Mega Venusaur",
        "winRate": 61.8,
        "games": 58960
      },
      {
        "name": "Palafin",
        "winRate": 59.2,
        "games": 30975
      }
    ],
    "bestSets": []
  },
  "359": {
    "id": 359,
    "name": "Absol",
    "isMega": false,
    "elo": 14989,
    "winRate": 48.9,
    "appearances": 557359,
    "wins": 272475,
    "losses": 284884,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 57.7,
        "games": 8272
      },
      {
        "name": "Weavile",
        "winRate": 55.4,
        "games": 33828
      },
      {
        "name": "Krookodile",
        "winRate": 55.4,
        "games": 16974
      },
      {
        "name": "Archaludon",
        "winRate": 54.8,
        "games": 42662
      },
      {
        "name": "Abomasnow",
        "winRate": 54,
        "games": 17689
      }
    ],
    "bestSets": []
  },
  "376": {
    "id": 376,
    "name": "Metagross",
    "isMega": false,
    "elo": 15012,
    "winRate": 49.6,
    "appearances": 10842524,
    "wins": 5377164,
    "losses": 5465360,
    "bestPartners": [
      {
        "name": "Skarmory",
        "winRate": 72.1,
        "games": 6479
      },
      {
        "name": "Alolan Raichu",
        "winRate": 65.6,
        "games": 6981
      },
      {
        "name": "Corviknight",
        "winRate": 60.5,
        "games": 15124
      },
      {
        "name": "Azumarill",
        "winRate": 60.3,
        "games": 38061
      },
      {
        "name": "Charizard",
        "winRate": 59.6,
        "games": 7674
      }
    ],
    "bestSets": []
  },
  "389": {
    "id": 389,
    "name": "Torterra",
    "isMega": false,
    "elo": 14989,
    "winRate": 48.8,
    "appearances": 649290,
    "wins": 316753,
    "losses": 332537,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 58.2,
        "games": 7982
      },
      {
        "name": "Pawmot",
        "winRate": 57.5,
        "games": 8063
      },
      {
        "name": "Archaludon",
        "winRate": 54.8,
        "games": 25465
      },
      {
        "name": "Excadrill",
        "winRate": 53.5,
        "games": 17211
      },
      {
        "name": "Ursaluna",
        "winRate": 53.4,
        "games": 17330
      }
    ],
    "bestSets": []
  },
  "392": {
    "id": 392,
    "name": "Infernape",
    "isMega": false,
    "elo": 15012,
    "winRate": 49.8,
    "appearances": 693309,
    "wins": 345149,
    "losses": 348160,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 56.5,
        "games": 8168
      },
      {
        "name": "Sneasler",
        "winRate": 56.5,
        "games": 8168
      },
      {
        "name": "Hawlucha",
        "winRate": 55,
        "games": 16893
      },
      {
        "name": "Meowscarada",
        "winRate": 52.8,
        "games": 35759
      },
      {
        "name": "Incineroar",
        "winRate": 51.6,
        "games": 64415
      }
    ],
    "bestSets": []
  },
  "395": {
    "id": 395,
    "name": "Empoleon",
    "isMega": false,
    "elo": 15037,
    "winRate": 52.1,
    "appearances": 13146689,
    "wins": 6849701,
    "losses": 6296988,
    "bestPartners": [
      {
        "name": "Gourgeist",
        "winRate": 66.1,
        "games": 6760
      },
      {
        "name": "Feraligatr",
        "winRate": 66.1,
        "games": 6760
      },
      {
        "name": "Typhlosion",
        "winRate": 65.8,
        "games": 7022
      },
      {
        "name": "Araquanid",
        "winRate": 65.8,
        "games": 7022
      },
      {
        "name": "Mudsdale",
        "winRate": 64.3,
        "games": 14207
      }
    ],
    "bestSets": []
  },
  "428": {
    "id": 428,
    "name": "Lopunny",
    "isMega": false,
    "elo": 14995,
    "winRate": 48.7,
    "appearances": 210352,
    "wins": 102369,
    "losses": 107983,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.1,
        "games": 18712
      },
      {
        "name": "Scizor",
        "winRate": 50,
        "games": 56432
      },
      {
        "name": "Gengar",
        "winRate": 49.8,
        "games": 56062
      },
      {
        "name": "Morpeko",
        "winRate": 49.8,
        "games": 9057
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 9057
      }
    ],
    "bestSets": []
  },
  "442": {
    "id": 442,
    "name": "Spiritomb",
    "isMega": false,
    "elo": 14944,
    "winRate": 44.5,
    "appearances": 607194,
    "wins": 270271,
    "losses": 336923,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 50.7,
        "games": 19197
      },
      {
        "name": "Espeon",
        "winRate": 50.7,
        "games": 9642
      },
      {
        "name": "Garbodor",
        "winRate": 50.5,
        "games": 28114
      },
      {
        "name": "Sableye",
        "winRate": 50.4,
        "games": 9249
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.4,
        "games": 18472
      }
    ],
    "bestSets": []
  },
  "445": {
    "id": 445,
    "name": "Garchomp",
    "isMega": false,
    "elo": 15025,
    "winRate": 50.1,
    "appearances": 71342166,
    "wins": 35761299,
    "losses": 35580867,
    "bestPartners": [
      {
        "name": "Mega Charizard Y",
        "winRate": 79.8,
        "games": 11274
      },
      {
        "name": "Typhlosion",
        "winRate": 73.7,
        "games": 12417
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 68.3,
        "games": 13487
      },
      {
        "name": "Mega Froslass",
        "winRate": 66,
        "games": 41679
      },
      {
        "name": "Fan Rotom",
        "winRate": 65.4,
        "games": 179570
      }
    ],
    "bestSets": []
  },
  "448": {
    "id": 448,
    "name": "Lucario",
    "isMega": false,
    "elo": 15027,
    "winRate": 50.5,
    "appearances": 3381768,
    "wins": 1708596,
    "losses": 1673172,
    "bestPartners": [
      {
        "name": "Conkeldurr",
        "winRate": 66,
        "games": 6786
      },
      {
        "name": "Heracross",
        "winRate": 62.1,
        "games": 14715
      },
      {
        "name": "Heat Rotom",
        "winRate": 61.5,
        "games": 7350
      },
      {
        "name": "Arcanine",
        "winRate": 61.2,
        "games": 7321
      },
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 52813
      }
    ],
    "bestSets": []
  },
  "450": {
    "id": 450,
    "name": "Hippowdon",
    "isMega": false,
    "elo": 14990,
    "winRate": 49.4,
    "appearances": 666929,
    "wins": 329170,
    "losses": 337759,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 59.2,
        "games": 7461
      },
      {
        "name": "Ursaluna",
        "winRate": 53.3,
        "games": 17882
      },
      {
        "name": "Archaludon",
        "winRate": 53,
        "games": 43700
      },
      {
        "name": "Diggersby",
        "winRate": 52.4,
        "games": 27027
      },
      {
        "name": "Mega Gyarados",
        "winRate": 51.6,
        "games": 81833
      }
    ],
    "bestSets": []
  },
  "460": {
    "id": 460,
    "name": "Abomasnow",
    "isMega": false,
    "elo": 14990,
    "winRate": 48.6,
    "appearances": 1040380,
    "wins": 505170,
    "losses": 535210,
    "bestPartners": [
      {
        "name": "Weavile",
        "winRate": 54,
        "games": 17890
      },
      {
        "name": "Absol",
        "winRate": 54,
        "games": 17689
      },
      {
        "name": "Primarina",
        "winRate": 53.9,
        "games": 17574
      },
      {
        "name": "Decidueye",
        "winRate": 53,
        "games": 8761
      },
      {
        "name": "Archaludon",
        "winRate": 52.8,
        "games": 44622
      }
    ],
    "bestSets": []
  },
  "461": {
    "id": 461,
    "name": "Weavile",
    "isMega": false,
    "elo": 14998,
    "winRate": 48.9,
    "appearances": 1510229,
    "wins": 738065,
    "losses": 772164,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Kommo-o",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Meowscarada",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Charizard",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Drampa",
        "winRate": 58.2,
        "games": 15440
      }
    ],
    "bestSets": []
  },
  "464": {
    "id": 464,
    "name": "Rhyperior",
    "isMega": false,
    "elo": 15022,
    "winRate": 50.5,
    "appearances": 10927910,
    "wins": 5520260,
    "losses": 5407650,
    "bestPartners": [
      {
        "name": "Tsareena",
        "winRate": 67.8,
        "games": 6701
      },
      {
        "name": "Whimsicott",
        "winRate": 61.3,
        "games": 34351
      },
      {
        "name": "Sandaconda",
        "winRate": 61.2,
        "games": 45288
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 58.7,
        "games": 71936
      },
      {
        "name": "Ursaluna",
        "winRate": 57.6,
        "games": 15664
      }
    ],
    "bestSets": []
  },
  "470": {
    "id": 470,
    "name": "Leafeon",
    "isMega": false,
    "elo": 15016,
    "winRate": 51.4,
    "appearances": 662714,
    "wins": 340453,
    "losses": 322261,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 58.1,
        "games": 143165
      },
      {
        "name": "Empoleon",
        "winRate": 58.1,
        "games": 143165
      },
      {
        "name": "Tinkaton",
        "winRate": 58.1,
        "games": 143165
      },
      {
        "name": "Blastoise",
        "winRate": 58.1,
        "games": 143165
      },
      {
        "name": "Heat Rotom",
        "winRate": 57.6,
        "games": 152173
      }
    ],
    "bestSets": []
  },
  "471": {
    "id": 471,
    "name": "Glaceon",
    "isMega": false,
    "elo": 15006,
    "winRate": 50.7,
    "appearances": 670803,
    "wins": 340102,
    "losses": 330701,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 51.1,
        "games": 110969
      },
      {
        "name": "Dragapult",
        "winRate": 51.1,
        "games": 110969
      },
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 148394
      },
      {
        "name": "Arcanine",
        "winRate": 51,
        "games": 148394
      },
      {
        "name": "Krookodile",
        "winRate": 51,
        "games": 9774
      }
    ],
    "bestSets": []
  },
  "472": {
    "id": 472,
    "name": "Gliscor",
    "isMega": false,
    "elo": 15032,
    "winRate": 52.9,
    "appearances": 1735376,
    "wins": 917847,
    "losses": 817529,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 63.8,
        "games": 63552
      },
      {
        "name": "Sylveon",
        "winRate": 62.9,
        "games": 174087
      },
      {
        "name": "Venusaur",
        "winRate": 61.6,
        "games": 200680
      },
      {
        "name": "Archaludon",
        "winRate": 60.7,
        "games": 544121
      },
      {
        "name": "Sneasler",
        "winRate": 59,
        "games": 367178
      }
    ],
    "bestSets": []
  },
  "473": {
    "id": 473,
    "name": "Mamoswine",
    "isMega": false,
    "elo": 14972,
    "winRate": 47.5,
    "appearances": 849284,
    "wins": 403583,
    "losses": 445701,
    "bestPartners": [
      {
        "name": "Mega Chandelure",
        "winRate": 50,
        "games": 216872
      },
      {
        "name": "Hatterene",
        "winRate": 50,
        "games": 216872
      },
      {
        "name": "Trevenant",
        "winRate": 49,
        "games": 416705
      },
      {
        "name": "Appletun",
        "winRate": 49,
        "games": 416705
      },
      {
        "name": "Incineroar",
        "winRate": 48.7,
        "games": 110891
      }
    ],
    "bestSets": []
  },
  "475": {
    "id": 475,
    "name": "Gallade",
    "isMega": false,
    "elo": 14892,
    "winRate": 38.7,
    "appearances": 379390,
    "wins": 146689,
    "losses": 232701,
    "bestPartners": [
      {
        "name": "Ditto",
        "winRate": 45.9,
        "games": 8896
      },
      {
        "name": "Dragapult",
        "winRate": 45.9,
        "games": 8896
      },
      {
        "name": "Espeon",
        "winRate": 45.9,
        "games": 8896
      },
      {
        "name": "Hawlucha",
        "winRate": 45.9,
        "games": 8896
      },
      {
        "name": "Charizard",
        "winRate": 45.9,
        "games": 8896
      }
    ],
    "bestSets": []
  },
  "478": {
    "id": 478,
    "name": "Froslass",
    "isMega": false,
    "elo": 15010,
    "winRate": 49.7,
    "appearances": 5514066,
    "wins": 2742299,
    "losses": 2771767,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 68.7,
        "games": 132565
      },
      {
        "name": "Mega Scizor",
        "winRate": 68.5,
        "games": 152929
      },
      {
        "name": "Sneasler",
        "winRate": 68.1,
        "games": 113900
      },
      {
        "name": "Archaludon",
        "winRate": 66.3,
        "games": 295094
      },
      {
        "name": "Clefable",
        "winRate": 65.9,
        "games": 20413
      }
    ],
    "bestSets": []
  },
  "479": {
    "id": 479,
    "name": "Rotom",
    "isMega": false,
    "elo": 15014,
    "winRate": 50.9,
    "appearances": 2323189,
    "wins": 1183625,
    "losses": 1139564,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 58.6,
        "games": 7695
      },
      {
        "name": "Polteageist",
        "winRate": 57.3,
        "games": 8239
      },
      {
        "name": "Mega Lopunny",
        "winRate": 56.5,
        "games": 16817
      },
      {
        "name": "Aegislash",
        "winRate": 55.8,
        "games": 8578
      },
      {
        "name": "Alcremie",
        "winRate": 54.9,
        "games": 128365
      }
    ],
    "bestSets": []
  },
  "497": {
    "id": 497,
    "name": "Serperior",
    "isMega": false,
    "elo": 15025,
    "winRate": 51.8,
    "appearances": 2540950,
    "wins": 1315691,
    "losses": 1225259,
    "bestPartners": [
      {
        "name": "Decidueye",
        "winRate": 69.7,
        "games": 19428
      },
      {
        "name": "Archaludon",
        "winRate": 68,
        "games": 80726
      },
      {
        "name": "Arcanine",
        "winRate": 65.8,
        "games": 27868
      },
      {
        "name": "Mow Rotom",
        "winRate": 65.6,
        "games": 21437
      },
      {
        "name": "Mega Blastoise",
        "winRate": 64.7,
        "games": 275515
      }
    ],
    "bestSets": []
  },
  "500": {
    "id": 500,
    "name": "Emboar",
    "isMega": false,
    "elo": 14999,
    "winRate": 50.9,
    "appearances": 888455,
    "wins": 451925,
    "losses": 436530,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 52.8,
        "games": 89439
      },
      {
        "name": "Kingambit",
        "winRate": 52.6,
        "games": 126035
      },
      {
        "name": "Lucario",
        "winRate": 52.4,
        "games": 62491
      },
      {
        "name": "Mega Lucario",
        "winRate": 52.4,
        "games": 63492
      },
      {
        "name": "Metagross",
        "winRate": 52.2,
        "games": 17732
      }
    ],
    "bestSets": []
  },
  "503": {
    "id": 503,
    "name": "Samurott",
    "isMega": false,
    "elo": 14987,
    "winRate": 49.9,
    "appearances": 832680,
    "wins": 415664,
    "losses": 417016,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 60.8,
        "games": 15166
      },
      {
        "name": "Goodra",
        "winRate": 60.8,
        "games": 15166
      },
      {
        "name": "Mow Rotom",
        "winRate": 55.9,
        "games": 16876
      },
      {
        "name": "Meowscarada",
        "winRate": 54.3,
        "games": 17375
      },
      {
        "name": "Tsareena",
        "winRate": 53,
        "games": 8973
      }
    ],
    "bestSets": []
  },
  "530": {
    "id": 530,
    "name": "Excadrill",
    "isMega": false,
    "elo": 15015,
    "winRate": 49.5,
    "appearances": 18401883,
    "wins": 9107613,
    "losses": 9294270,
    "bestPartners": [
      {
        "name": "Garganacl",
        "winRate": 59.8,
        "games": 7785
      },
      {
        "name": "Torterra",
        "winRate": 58.2,
        "games": 7982
      },
      {
        "name": "Ursaluna",
        "winRate": 56.5,
        "games": 24420
      },
      {
        "name": "Sandaconda",
        "winRate": 56.4,
        "games": 40813
      },
      {
        "name": "Heat Rotom",
        "winRate": 55.8,
        "games": 25304
      }
    ],
    "bestSets": []
  },
  "531": {
    "id": 531,
    "name": "Audino",
    "isMega": false,
    "elo": 14980,
    "winRate": 49.1,
    "appearances": 544380,
    "wins": 267294,
    "losses": 277086,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 445862
      },
      {
        "name": "Slowbro",
        "winRate": 50.3,
        "games": 408085
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.3,
        "games": 408085
      },
      {
        "name": "Galarian Slowking",
        "winRate": 50.3,
        "games": 408085
      },
      {
        "name": "Polteageist",
        "winRate": 50.3,
        "games": 9654
      }
    ],
    "bestSets": []
  },
  "534": {
    "id": 534,
    "name": "Conkeldurr",
    "isMega": false,
    "elo": 15028,
    "winRate": 50.2,
    "appearances": 3257151,
    "wins": 1633823,
    "losses": 1623328,
    "bestPartners": [
      {
        "name": "Venusaur",
        "winRate": 65.2,
        "games": 13722
      },
      {
        "name": "Mr. Rime",
        "winRate": 62.2,
        "games": 6900
      },
      {
        "name": "Mega Starmie",
        "winRate": 62.1,
        "games": 29033
      },
      {
        "name": "Torkoal",
        "winRate": 59.9,
        "games": 53045
      },
      {
        "name": "Greninja",
        "winRate": 57.3,
        "games": 32313
      }
    ],
    "bestSets": []
  },
  "547": {
    "id": 547,
    "name": "Whimsicott",
    "isMega": false,
    "elo": 15016,
    "winRate": 49.9,
    "appearances": 42230695,
    "wins": 21074344,
    "losses": 21156351,
    "bestPartners": [
      {
        "name": "Steelix",
        "winRate": 65.8,
        "games": 21126
      },
      {
        "name": "Mega Starmie",
        "winRate": 65.4,
        "games": 7143
      },
      {
        "name": "Victreebel",
        "winRate": 64.2,
        "games": 42550
      },
      {
        "name": "Ursaluna",
        "winRate": 63.8,
        "games": 28472
      },
      {
        "name": "Tsareena",
        "winRate": 63,
        "games": 94645
      }
    ],
    "bestSets": []
  },
  "553": {
    "id": 553,
    "name": "Krookodile",
    "isMega": false,
    "elo": 15016,
    "winRate": 49.9,
    "appearances": 21861216,
    "wins": 10898913,
    "losses": 10962303,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 66.4,
        "games": 185347
      },
      {
        "name": "Mega Starmie",
        "winRate": 65.4,
        "games": 7143
      },
      {
        "name": "Torkoal",
        "winRate": 65.4,
        "games": 7143
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 64.6,
        "games": 14092
      },
      {
        "name": "Victreebel",
        "winRate": 63.6,
        "games": 36151
      }
    ],
    "bestSets": []
  },
  "569": {
    "id": 569,
    "name": "Garbodor",
    "isMega": false,
    "elo": 14998,
    "winRate": 49.7,
    "appearances": 661604,
    "wins": 328493,
    "losses": 333111,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 150581
      },
      {
        "name": "Greninja",
        "winRate": 50.9,
        "games": 121299
      },
      {
        "name": "Umbreon",
        "winRate": 50.9,
        "games": 121456
      },
      {
        "name": "Weavile",
        "winRate": 50.9,
        "games": 130610
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.9,
        "games": 132551
      }
    ],
    "bestSets": []
  },
  "571": {
    "id": 571,
    "name": "Zoroark",
    "isMega": false,
    "elo": 14973,
    "winRate": 47,
    "appearances": 850342,
    "wins": 399918,
    "losses": 450424,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 50.6,
        "games": 64376
      },
      {
        "name": "Hydreigon",
        "winRate": 50.5,
        "games": 64858
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 9086
      },
      {
        "name": "Ninetales",
        "winRate": 50.5,
        "games": 9086
      },
      {
        "name": "Azumarill",
        "winRate": 50.4,
        "games": 18432
      }
    ],
    "bestSets": []
  },
  "584": {
    "id": 584,
    "name": "Vanilluxe",
    "isMega": false,
    "elo": 15011,
    "winRate": 50.7,
    "appearances": 653943,
    "wins": 331801,
    "losses": 322142,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 56.9,
        "games": 65347
      },
      {
        "name": "Typhlosion",
        "winRate": 56.5,
        "games": 49898
      },
      {
        "name": "Pawmot",
        "winRate": 55.6,
        "games": 67276
      },
      {
        "name": "Garchomp",
        "winRate": 53.3,
        "games": 110835
      },
      {
        "name": "Blastoise",
        "winRate": 53.1,
        "games": 17863
      }
    ],
    "bestSets": []
  },
  "587": {
    "id": 587,
    "name": "Emolga",
    "isMega": false,
    "elo": 14949,
    "winRate": 43.1,
    "appearances": 1368055,
    "wins": 589440,
    "losses": 778615,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 50.7,
        "games": 36999
      },
      {
        "name": "Tinkaton",
        "winRate": 50.6,
        "games": 9395
      },
      {
        "name": "Blastoise",
        "winRate": 50.6,
        "games": 18417
      },
      {
        "name": "Metagross",
        "winRate": 50.6,
        "games": 9704
      },
      {
        "name": "Basculegion",
        "winRate": 50.5,
        "games": 9436
      }
    ],
    "bestSets": []
  },
  "609": {
    "id": 609,
    "name": "Chandelure",
    "isMega": false,
    "elo": 14972,
    "winRate": 49.2,
    "appearances": 449238,
    "wins": 221154,
    "losses": 228084,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 442277
      },
      {
        "name": "Snorlax",
        "winRate": 49.4,
        "games": 442277
      },
      {
        "name": "Dragonite",
        "winRate": 49.4,
        "games": 442277
      },
      {
        "name": "Azumarill",
        "winRate": 49.4,
        "games": 442277
      },
      {
        "name": "Umbreon",
        "winRate": 49.4,
        "games": 442277
      }
    ],
    "bestSets": []
  },
  "618": {
    "id": 618,
    "name": "Stunfisk",
    "isMega": false,
    "elo": 15000,
    "winRate": 49.6,
    "appearances": 1132827,
    "wins": 561332,
    "losses": 571495,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 58.9,
        "games": 7942
      },
      {
        "name": "Tatsugiri",
        "winRate": 58.9,
        "games": 7942
      },
      {
        "name": "Alcremie",
        "winRate": 56.9,
        "games": 24434
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 56,
        "games": 8337
      },
      {
        "name": "Froslass",
        "winRate": 56,
        "games": 8337
      }
    ],
    "bestSets": []
  },
  "623": {
    "id": 623,
    "name": "Golurk",
    "isMega": false,
    "elo": 15004,
    "winRate": 50.4,
    "appearances": 657753,
    "wins": 331340,
    "losses": 326413,
    "bestPartners": [
      {
        "name": "Hisuian Decidueye",
        "winRate": 58.3,
        "games": 7971
      },
      {
        "name": "Azumarill",
        "winRate": 57,
        "games": 32413
      },
      {
        "name": "Ninetales",
        "winRate": 55.8,
        "games": 16441
      },
      {
        "name": "Primarina",
        "winRate": 54.9,
        "games": 50879
      },
      {
        "name": "Palafin",
        "winRate": 53.7,
        "games": 17355
      }
    ],
    "bestSets": []
  },
  "635": {
    "id": 635,
    "name": "Hydreigon",
    "isMega": false,
    "elo": 15013,
    "winRate": 50.4,
    "appearances": 5434114,
    "wins": 2740252,
    "losses": 2693862,
    "bestPartners": [
      {
        "name": "Mega Alakazam",
        "winRate": 66.3,
        "games": 6838
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 64.6,
        "games": 21021
      },
      {
        "name": "Armarouge",
        "winRate": 64,
        "games": 7060
      },
      {
        "name": "Mega Starmie",
        "winRate": 62.2,
        "games": 14722
      },
      {
        "name": "Meganium",
        "winRate": 61.5,
        "games": 7547
      }
    ],
    "bestSets": []
  },
  "637": {
    "id": 637,
    "name": "Volcarona",
    "isMega": false,
    "elo": 14997,
    "winRate": 50,
    "appearances": 646060,
    "wins": 323338,
    "losses": 322722,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 58,
        "games": 23883
      },
      {
        "name": "Archaludon",
        "winRate": 57.8,
        "games": 24119
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 56.8,
        "games": 24850
      },
      {
        "name": "Heracross",
        "winRate": 56.2,
        "games": 16913
      },
      {
        "name": "Primarina",
        "winRate": 56.1,
        "games": 8362
      }
    ],
    "bestSets": []
  },
  "652": {
    "id": 652,
    "name": "Chesnaught",
    "isMega": false,
    "elo": 15013,
    "winRate": 53.9,
    "appearances": 554673,
    "wins": 298728,
    "losses": 255945,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 62.1,
        "games": 7501
      },
      {
        "name": "Orthworm",
        "winRate": 62.1,
        "games": 7501
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 62.1,
        "games": 7501
      },
      {
        "name": "Charizard",
        "winRate": 57.4,
        "games": 387252
      },
      {
        "name": "Heat Rotom",
        "winRate": 57.4,
        "games": 370849
      }
    ],
    "bestSets": []
  },
  "655": {
    "id": 655,
    "name": "Delphox",
    "isMega": false,
    "elo": 14983,
    "winRate": 46.4,
    "appearances": 2248792,
    "wins": 1043032,
    "losses": 1205760,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 51.2,
        "games": 443684
      },
      {
        "name": "Azumarill",
        "winRate": 51.2,
        "games": 443684
      },
      {
        "name": "Krookodile",
        "winRate": 51.1,
        "games": 471628
      },
      {
        "name": "Aggron",
        "winRate": 51,
        "games": 9383
      },
      {
        "name": "Charizard",
        "winRate": 50.8,
        "games": 9556
      }
    ],
    "bestSets": []
  },
  "658": {
    "id": 658,
    "name": "Greninja",
    "isMega": false,
    "elo": 15028,
    "winRate": 49.9,
    "appearances": 11710686,
    "wins": 5847872,
    "losses": 5862814,
    "bestPartners": [
      {
        "name": "Morpeko",
        "winRate": 72.3,
        "games": 6214
      },
      {
        "name": "Mudsdale",
        "winRate": 69.9,
        "games": 6435
      },
      {
        "name": "Scizor",
        "winRate": 69.9,
        "games": 6435
      },
      {
        "name": "Conkeldurr",
        "winRate": 66.3,
        "games": 6838
      },
      {
        "name": "Ursaluna",
        "winRate": 64.6,
        "games": 34853
      }
    ],
    "bestSets": []
  },
  "660": {
    "id": 660,
    "name": "Diggersby",
    "isMega": false,
    "elo": 14984,
    "winRate": 49.4,
    "appearances": 648731,
    "wins": 320714,
    "losses": 328017,
    "bestPartners": [
      {
        "name": "Mudsdale",
        "winRate": 56.5,
        "games": 8338
      },
      {
        "name": "Ursaluna",
        "winRate": 56.1,
        "games": 33251
      },
      {
        "name": "Garchomp",
        "winRate": 54.7,
        "games": 25524
      },
      {
        "name": "Azumarill",
        "winRate": 54.6,
        "games": 8660
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 54.5,
        "games": 25504
      }
    ],
    "bestSets": []
  },
  "663": {
    "id": 663,
    "name": "Talonflame",
    "isMega": false,
    "elo": 15007,
    "winRate": 48.2,
    "appearances": 1022654,
    "wins": 493022,
    "losses": 529632,
    "bestPartners": [
      {
        "name": "Metagross",
        "winRate": 55,
        "games": 17016
      },
      {
        "name": "Empoleon",
        "winRate": 53.1,
        "games": 45292
      },
      {
        "name": "Krookodile",
        "winRate": 53,
        "games": 8539
      },
      {
        "name": "Greninja",
        "winRate": 52.5,
        "games": 27205
      },
      {
        "name": "Sneasler",
        "winRate": 52,
        "games": 17578
      }
    ],
    "bestSets": []
  },
  "666": {
    "id": 666,
    "name": "Vivillon",
    "isMega": false,
    "elo": 14988,
    "winRate": 49.1,
    "appearances": 641510,
    "wins": 314664,
    "losses": 326846,
    "bestPartners": [
      {
        "name": "Garganacl",
        "winRate": 54.9,
        "games": 51367
      },
      {
        "name": "Wash Rotom",
        "winRate": 53.9,
        "games": 145982
      },
      {
        "name": "Garchomp",
        "winRate": 53.5,
        "games": 96037
      },
      {
        "name": "Milotic",
        "winRate": 53.3,
        "games": 52420
      },
      {
        "name": "Orthworm",
        "winRate": 52.1,
        "games": 97753
      }
    ],
    "bestSets": []
  },
  "670": {
    "id": 670,
    "name": "Floette",
    "isMega": false,
    "elo": 15011,
    "winRate": 53.9,
    "appearances": 417466,
    "wins": 225124,
    "losses": 192342,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 53.9,
        "games": 417466
      },
      {
        "name": "Kingambit",
        "winRate": 53.9,
        "games": 417466
      },
      {
        "name": "Scizor",
        "winRate": 53.9,
        "games": 417466
      },
      {
        "name": "Empoleon",
        "winRate": 53.9,
        "games": 417466
      },
      {
        "name": "Rotom",
        "winRate": 53.9,
        "games": 417466
      }
    ],
    "bestSets": []
  },
  "676": {
    "id": 676,
    "name": "Furfrou",
    "isMega": false,
    "elo": 14974,
    "winRate": 46.4,
    "appearances": 618753,
    "wins": 286988,
    "losses": 331765,
    "bestPartners": [
      {
        "name": "Ninetales",
        "winRate": 50.7,
        "games": 27386
      },
      {
        "name": "Espeon",
        "winRate": 50.6,
        "games": 9429
      },
      {
        "name": "Gengar",
        "winRate": 50.5,
        "games": 18736
      },
      {
        "name": "Charizard",
        "winRate": 50.4,
        "games": 27059
      },
      {
        "name": "Lopunny",
        "winRate": 50.4,
        "games": 27935
      }
    ],
    "bestSets": []
  },
  "678": {
    "id": 678,
    "name": "Meowstic",
    "isMega": false,
    "elo": 14967,
    "winRate": 46.4,
    "appearances": 552167,
    "wins": 256164,
    "losses": 296003,
    "bestPartners": [
      {
        "name": "Ditto",
        "winRate": 50.6,
        "games": 9349
      },
      {
        "name": "Slowbro",
        "winRate": 50.6,
        "games": 9349
      },
      {
        "name": "Clefable",
        "winRate": 50.6,
        "games": 9349
      },
      {
        "name": "Charizard",
        "winRate": 50.2,
        "games": 18300
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 27682
      }
    ],
    "bestSets": []
  },
  "681": {
    "id": 681,
    "name": "Aegislash",
    "isMega": false,
    "elo": 15024,
    "winRate": 49.6,
    "appearances": 14884392,
    "wins": 7378560,
    "losses": 7505832,
    "bestPartners": [
      {
        "name": "Volcarona",
        "winRate": 58.1,
        "games": 24152
      },
      {
        "name": "Toucannon",
        "winRate": 57.7,
        "games": 7773
      },
      {
        "name": "Archaludon",
        "winRate": 57.7,
        "games": 7773
      },
      {
        "name": "Starmie",
        "winRate": 54.6,
        "games": 25974
      },
      {
        "name": "Heracross",
        "winRate": 53.9,
        "games": 17547
      }
    ],
    "bestSets": []
  },
  "693": {
    "id": 693,
    "name": "Clawitzer",
    "isMega": false,
    "elo": 15009,
    "winRate": 51.9,
    "appearances": 695042,
    "wins": 360629,
    "losses": 334413,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 75347
      },
      {
        "name": "Kommo-o",
        "winRate": 59.4,
        "games": 62190
      },
      {
        "name": "Sinistcha",
        "winRate": 57.1,
        "games": 98590
      },
      {
        "name": "Leafeon",
        "winRate": 55.3,
        "games": 8474
      },
      {
        "name": "Meganium",
        "winRate": 55.1,
        "games": 50604
      }
    ],
    "bestSets": []
  },
  "697": {
    "id": 697,
    "name": "Tyrantrum",
    "isMega": false,
    "elo": 14995,
    "winRate": 49.4,
    "appearances": 667035,
    "wins": 329605,
    "losses": 337430,
    "bestPartners": [
      {
        "name": "Hatterene",
        "winRate": 50.5,
        "games": 18976
      },
      {
        "name": "Milotic",
        "winRate": 50.5,
        "games": 28471
      },
      {
        "name": "Tinkaton",
        "winRate": 50.5,
        "games": 18890
      },
      {
        "name": "Fan Rotom",
        "winRate": 50.5,
        "games": 18209
      },
      {
        "name": "Froslass",
        "winRate": 50.5,
        "games": 18344
      }
    ],
    "bestSets": []
  },
  "699": {
    "id": 699,
    "name": "Aurorus",
    "isMega": false,
    "elo": 14935,
    "winRate": 41.5,
    "appearances": 564157,
    "wins": 234117,
    "losses": 330040,
    "bestPartners": [
      {
        "name": "Sinistcha",
        "winRate": 50.3,
        "games": 55819
      },
      {
        "name": "Fan Rotom",
        "winRate": 49.9,
        "games": 36919
      },
      {
        "name": "Meowscarada",
        "winRate": 49.5,
        "games": 37093
      },
      {
        "name": "Chesnaught",
        "winRate": 49.2,
        "games": 55439
      },
      {
        "name": "Palafin",
        "winRate": 48.7,
        "games": 144993
      }
    ],
    "bestSets": []
  },
  "700": {
    "id": 700,
    "name": "Sylveon",
    "isMega": false,
    "elo": 15015,
    "winRate": 51.3,
    "appearances": 1498827,
    "wins": 768659,
    "losses": 730168,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 62.9,
        "games": 174087
      },
      {
        "name": "Gliscor",
        "winRate": 62.9,
        "games": 174087
      },
      {
        "name": "Blastoise",
        "winRate": 62.9,
        "games": 174087
      },
      {
        "name": "Sneasler",
        "winRate": 59.7,
        "games": 229814
      },
      {
        "name": "Mega Gyarados",
        "winRate": 55.6,
        "games": 392239
      }
    ],
    "bestSets": []
  },
  "701": {
    "id": 701,
    "name": "Hawlucha",
    "isMega": false,
    "elo": 15024,
    "winRate": 48.7,
    "appearances": 5598336,
    "wins": 2727759,
    "losses": 2870577,
    "bestPartners": [
      {
        "name": "Morpeko",
        "winRate": 65.7,
        "games": 6974
      },
      {
        "name": "Mega Absol Z",
        "winRate": 63.3,
        "games": 7086
      },
      {
        "name": "Ninetales",
        "winRate": 63.3,
        "games": 7086
      },
      {
        "name": "Hisuian Typhlosion",
        "winRate": 59.6,
        "games": 15509
      },
      {
        "name": "Mega Chandelure",
        "winRate": 59.6,
        "games": 22987
      }
    ],
    "bestSets": []
  },
  "706": {
    "id": 706,
    "name": "Goodra",
    "isMega": false,
    "elo": 14964,
    "winRate": 48.1,
    "appearances": 948752,
    "wins": 456797,
    "losses": 491955,
    "bestPartners": [
      {
        "name": "Mow Rotom",
        "winRate": 62.5,
        "games": 7371
      },
      {
        "name": "Archaludon",
        "winRate": 61.2,
        "games": 30046
      },
      {
        "name": "Samurott",
        "winRate": 60.8,
        "games": 15166
      },
      {
        "name": "Meowscarada",
        "winRate": 59.2,
        "games": 7795
      },
      {
        "name": "Sinistcha",
        "winRate": 57.3,
        "games": 16436
      }
    ],
    "bestSets": []
  },
  "707": {
    "id": 707,
    "name": "Klefki",
    "isMega": false,
    "elo": 15020,
    "winRate": 49.9,
    "appearances": 2016865,
    "wins": 1006151,
    "losses": 1010714,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 56.8,
        "games": 32451
      },
      {
        "name": "Gyarados",
        "winRate": 56,
        "games": 107302
      },
      {
        "name": "Heat Rotom",
        "winRate": 55.3,
        "games": 124660
      },
      {
        "name": "Krookodile",
        "winRate": 55.2,
        "games": 25431
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 54.8,
        "games": 92633
      }
    ],
    "bestSets": []
  },
  "709": {
    "id": 709,
    "name": "Trevenant",
    "isMega": false,
    "elo": 14994,
    "winRate": 49.5,
    "appearances": 661983,
    "wins": 327605,
    "losses": 334378,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 200561
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.5,
        "games": 200561
      },
      {
        "name": "Slowbro",
        "winRate": 50.5,
        "games": 200561
      },
      {
        "name": "Blastoise",
        "winRate": 50.4,
        "games": 228320
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.4,
        "games": 228320
      }
    ],
    "bestSets": []
  },
  "711": {
    "id": 711,
    "name": "Gourgeist",
    "isMega": false,
    "elo": 14996,
    "winRate": 50.1,
    "appearances": 656501,
    "wins": 329185,
    "losses": 327316,
    "bestPartners": [
      {
        "name": "Vaporeon",
        "winRate": 54,
        "games": 43346
      },
      {
        "name": "Empoleon",
        "winRate": 53.6,
        "games": 68958
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.7,
        "games": 52641
      },
      {
        "name": "Heat Rotom",
        "winRate": 52.3,
        "games": 62453
      },
      {
        "name": "Azumarill",
        "winRate": 52.2,
        "games": 45162
      }
    ],
    "bestSets": []
  },
  "715": {
    "id": 715,
    "name": "Noivern",
    "isMega": false,
    "elo": 14995,
    "winRate": 48.4,
    "appearances": 1950103,
    "wins": 944504,
    "losses": 1005599,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 62.2,
        "games": 7613
      },
      {
        "name": "Hawlucha",
        "winRate": 56.6,
        "games": 16962
      },
      {
        "name": "Blastoise",
        "winRate": 55.5,
        "games": 33846
      },
      {
        "name": "Primarina",
        "winRate": 54.7,
        "games": 59549
      },
      {
        "name": "Azumarill",
        "winRate": 54.5,
        "games": 52051
      }
    ],
    "bestSets": []
  },
  "724": {
    "id": 724,
    "name": "Decidueye",
    "isMega": false,
    "elo": 15019,
    "winRate": 50,
    "appearances": 2957076,
    "wins": 1477348,
    "losses": 1479728,
    "bestPartners": [
      {
        "name": "Araquanid",
        "winRate": 65.8,
        "games": 7022
      },
      {
        "name": "Scizor",
        "winRate": 63.6,
        "games": 7326
      },
      {
        "name": "Mega Blastoise",
        "winRate": 62.3,
        "games": 109784
      },
      {
        "name": "Tsareena",
        "winRate": 62.2,
        "games": 29327
      },
      {
        "name": "Mow Rotom",
        "winRate": 62,
        "games": 22158
      }
    ],
    "bestSets": []
  },
  "727": {
    "id": 727,
    "name": "Incineroar",
    "isMega": false,
    "elo": 15014,
    "winRate": 49.9,
    "appearances": 85188934,
    "wins": 42501449,
    "losses": 42687485,
    "bestPartners": [
      {
        "name": "Victreebel",
        "winRate": 63.8,
        "games": 49712
      },
      {
        "name": "Mega Heracross",
        "winRate": 62.5,
        "games": 7246
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 61.2,
        "games": 22806
      },
      {
        "name": "Houndoom",
        "winRate": 60,
        "games": 15259
      },
      {
        "name": "Archaludon",
        "winRate": 59.6,
        "games": 452644
      }
    ],
    "bestSets": []
  },
  "730": {
    "id": 730,
    "name": "Primarina",
    "isMega": false,
    "elo": 15037,
    "winRate": 54.1,
    "appearances": 3063497,
    "wins": 1658555,
    "losses": 1404942,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 72.3,
        "games": 6214
      },
      {
        "name": "Morpeko",
        "winRate": 72.3,
        "games": 6214
      },
      {
        "name": "Palafin",
        "winRate": 70.7,
        "games": 12639
      },
      {
        "name": "Greninja",
        "winRate": 70.4,
        "games": 12836
      },
      {
        "name": "Mudsdale",
        "winRate": 69.9,
        "games": 6435
      }
    ],
    "bestSets": []
  },
  "733": {
    "id": 733,
    "name": "Toucannon",
    "isMega": false,
    "elo": 14987,
    "winRate": 50,
    "appearances": 657162,
    "wins": 328420,
    "losses": 328742,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 54.4,
        "games": 17052
      },
      {
        "name": "Ursaluna",
        "winRate": 54.2,
        "games": 17357
      },
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 111387
      },
      {
        "name": "Lucario",
        "winRate": 53.6,
        "games": 43690
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 53.5,
        "games": 34428
      }
    ],
    "bestSets": []
  },
  "740": {
    "id": 740,
    "name": "Crabominable",
    "isMega": false,
    "elo": 15033,
    "winRate": 49,
    "appearances": 3719074,
    "wins": 1822578,
    "losses": 1896496,
    "bestPartners": [
      {
        "name": "Venusaur",
        "winRate": 54.6,
        "games": 16952
      },
      {
        "name": "Hydreigon",
        "winRate": 52,
        "games": 53931
      },
      {
        "name": "Heracross",
        "winRate": 51.8,
        "games": 54860
      },
      {
        "name": "Mega Slowbro",
        "winRate": 51.5,
        "games": 83429
      },
      {
        "name": "Drampa",
        "winRate": 51.5,
        "games": 46169
      }
    ],
    "bestSets": []
  },
  "745": {
    "id": 745,
    "name": "Lycanroc",
    "isMega": false,
    "elo": 14977,
    "winRate": 48,
    "appearances": 635211,
    "wins": 304835,
    "losses": 330376,
    "bestPartners": [
      {
        "name": "Skarmory",
        "winRate": 52.7,
        "games": 8995
      },
      {
        "name": "Scizor",
        "winRate": 51.7,
        "games": 18617
      },
      {
        "name": "Dragapult",
        "winRate": 51.4,
        "games": 9152
      },
      {
        "name": "Corviknight",
        "winRate": 51.4,
        "games": 9152
      },
      {
        "name": "Tatsugiri",
        "winRate": 51.2,
        "games": 28102
      }
    ],
    "bestSets": []
  },
  "748": {
    "id": 748,
    "name": "Toxapex",
    "isMega": false,
    "elo": 14995,
    "winRate": 48.3,
    "appearances": 2619983,
    "wins": 1266415,
    "losses": 1353568,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 51.7,
        "games": 9070
      },
      {
        "name": "Tinkaton",
        "winRate": 51.6,
        "games": 18335
      },
      {
        "name": "Lucario",
        "winRate": 51.5,
        "games": 27713
      },
      {
        "name": "Azumarill",
        "winRate": 51.1,
        "games": 18507
      },
      {
        "name": "Drampa",
        "winRate": 51.1,
        "games": 18507
      }
    ],
    "bestSets": []
  },
  "750": {
    "id": 750,
    "name": "Mudsdale",
    "isMega": false,
    "elo": 14992,
    "winRate": 50.4,
    "appearances": 647879,
    "wins": 326646,
    "losses": 321233,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 59.9,
        "games": 15279
      },
      {
        "name": "Sandaconda",
        "winRate": 59.2,
        "games": 7461
      },
      {
        "name": "Greninja",
        "winRate": 58.4,
        "games": 15544
      },
      {
        "name": "Diggersby",
        "winRate": 56.5,
        "games": 8338
      },
      {
        "name": "Primarina",
        "winRate": 56.4,
        "games": 33072
      }
    ],
    "bestSets": []
  },
  "752": {
    "id": 752,
    "name": "Araquanid",
    "isMega": false,
    "elo": 14971,
    "winRate": 48.3,
    "appearances": 1281772,
    "wins": 619655,
    "losses": 662117,
    "bestPartners": [
      {
        "name": "Typhlosion",
        "winRate": 65.8,
        "games": 7022
      },
      {
        "name": "Decidueye",
        "winRate": 58.7,
        "games": 15783
      },
      {
        "name": "Empoleon",
        "winRate": 56.8,
        "games": 16141
      },
      {
        "name": "Archaludon",
        "winRate": 56.4,
        "games": 24799
      },
      {
        "name": "Greninja",
        "winRate": 55.8,
        "games": 25379
      }
    ],
    "bestSets": []
  },
  "763": {
    "id": 763,
    "name": "Tsareena",
    "isMega": false,
    "elo": 15027,
    "winRate": 52,
    "appearances": 1757974,
    "wins": 914292,
    "losses": 843682,
    "bestPartners": [
      {
        "name": "Mega Charizard Y",
        "winRate": 76.2,
        "games": 5919
      },
      {
        "name": "Kommo-o",
        "winRate": 68,
        "games": 13466
      },
      {
        "name": "Rhyperior",
        "winRate": 67.8,
        "games": 6701
      },
      {
        "name": "Meowscarada",
        "winRate": 67.4,
        "games": 40353
      },
      {
        "name": "Decidueye",
        "winRate": 66.2,
        "games": 20470
      }
    ],
    "bestSets": []
  },
  "765": {
    "id": 765,
    "name": "Oranguru",
    "isMega": false,
    "elo": 15006,
    "winRate": 49.6,
    "appearances": 1344637,
    "wins": 667172,
    "losses": 677465,
    "bestPartners": [
      {
        "name": "Dondozo",
        "winRate": 50.1,
        "games": 123008
      },
      {
        "name": "Clefable",
        "winRate": 50,
        "games": 132472
      },
      {
        "name": "Toxapex",
        "winRate": 50,
        "games": 132472
      },
      {
        "name": "Dragapult",
        "winRate": 50,
        "games": 132472
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 671769
      }
    ],
    "bestSets": []
  },
  "778": {
    "id": 778,
    "name": "Mimikyu",
    "isMega": false,
    "elo": 14986,
    "winRate": 48.9,
    "appearances": 2212929,
    "wins": 1081825,
    "losses": 1131104,
    "bestPartners": [
      {
        "name": "Rotom",
        "winRate": 51.6,
        "games": 18633
      },
      {
        "name": "Froslass",
        "winRate": 51.5,
        "games": 27795
      },
      {
        "name": "Drampa",
        "winRate": 51.1,
        "games": 223087
      },
      {
        "name": "Conkeldurr",
        "winRate": 51.1,
        "games": 213896
      },
      {
        "name": "Slowbro",
        "winRate": 51,
        "games": 204306
      }
    ],
    "bestSets": []
  },
  "780": {
    "id": 780,
    "name": "Drampa",
    "isMega": false,
    "elo": 15023,
    "winRate": 51.1,
    "appearances": 4502466,
    "wins": 2300476,
    "losses": 2201990,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 65.7,
        "games": 13981
      },
      {
        "name": "Umbreon",
        "winRate": 65.7,
        "games": 7007
      },
      {
        "name": "Morpeko",
        "winRate": 65.7,
        "games": 6974
      },
      {
        "name": "Hisuian Typhlosion",
        "winRate": 64.7,
        "games": 21140
      },
      {
        "name": "Weavile",
        "winRate": 62.8,
        "games": 7159
      }
    ],
    "bestSets": []
  },
  "784": {
    "id": 784,
    "name": "Kommo-o",
    "isMega": false,
    "elo": 15019,
    "winRate": 50.5,
    "appearances": 2552347,
    "wins": 1289674,
    "losses": 1262673,
    "bestPartners": [
      {
        "name": "Goodra",
        "winRate": 67.6,
        "games": 6750
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 65.3,
        "games": 49158
      },
      {
        "name": "Steelix",
        "winRate": 64.9,
        "games": 14425
      },
      {
        "name": "Archaludon",
        "winRate": 64.8,
        "games": 77241
      },
      {
        "name": "Meganium",
        "winRate": 62.6,
        "games": 14527
      }
    ],
    "bestSets": []
  },
  "823": {
    "id": 823,
    "name": "Corviknight",
    "isMega": false,
    "elo": 14999,
    "winRate": 49.6,
    "appearances": 2155959,
    "wins": 1069431,
    "losses": 1086528,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 61.2,
        "games": 52113
      },
      {
        "name": "Empoleon",
        "winRate": 61,
        "games": 37892
      },
      {
        "name": "Primarina",
        "winRate": 59.6,
        "games": 85856
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 58.3,
        "games": 103302
      },
      {
        "name": "Scizor",
        "winRate": 57.8,
        "games": 16251
      }
    ],
    "bestSets": []
  },
  "842": {
    "id": 842,
    "name": "Appletun",
    "isMega": false,
    "elo": 14983,
    "winRate": 49,
    "appearances": 768683,
    "wins": 376662,
    "losses": 392021,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 52.9,
        "games": 26786
      },
      {
        "name": "Torkoal",
        "winRate": 52.5,
        "games": 26371
      },
      {
        "name": "Conkeldurr",
        "winRate": 51.8,
        "games": 27954
      },
      {
        "name": "Heracross",
        "winRate": 51.7,
        "games": 26986
      },
      {
        "name": "Lucario",
        "winRate": 51.6,
        "games": 27301
      }
    ],
    "bestSets": []
  },
  "844": {
    "id": 844,
    "name": "Sandaconda",
    "isMega": false,
    "elo": 15010,
    "winRate": 50.9,
    "appearances": 743407,
    "wins": 378340,
    "losses": 365067,
    "bestPartners": [
      {
        "name": "Venusaur",
        "winRate": 60.2,
        "games": 38599
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 59.8,
        "games": 61204
      },
      {
        "name": "Hippowdon",
        "winRate": 59.2,
        "games": 7461
      },
      {
        "name": "Torterra",
        "winRate": 58.2,
        "games": 7982
      },
      {
        "name": "Hydreigon",
        "winRate": 57,
        "games": 48622
      }
    ],
    "bestSets": []
  },
  "855": {
    "id": 855,
    "name": "Polteageist",
    "isMega": false,
    "elo": 14959,
    "winRate": 47,
    "appearances": 656939,
    "wins": 308905,
    "losses": 348034,
    "bestPartners": [
      {
        "name": "Froslass",
        "winRate": 52.2,
        "games": 35868
      },
      {
        "name": "Gardevoir",
        "winRate": 51.9,
        "games": 27500
      },
      {
        "name": "Mega Lopunny",
        "winRate": 51.9,
        "games": 90957
      },
      {
        "name": "Sinistcha",
        "winRate": 51.8,
        "games": 45452
      },
      {
        "name": "Rotom",
        "winRate": 51.6,
        "games": 45626
      }
    ],
    "bestSets": []
  },
  "858": {
    "id": 858,
    "name": "Hatterene",
    "isMega": false,
    "elo": 15015,
    "winRate": 50.1,
    "appearances": 21850995,
    "wins": 10944902,
    "losses": 10906093,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 54.9,
        "games": 506241
      },
      {
        "name": "Conkeldurr",
        "winRate": 54,
        "games": 199973
      },
      {
        "name": "Farigiraf",
        "winRate": 53.9,
        "games": 208611
      },
      {
        "name": "Slowbro",
        "winRate": 52.5,
        "games": 1142121
      },
      {
        "name": "Drampa",
        "winRate": 52.4,
        "games": 1075911
      }
    ],
    "bestSets": []
  },
  "861": {
    "id": 861,
    "name": "Grimmsnarl",
    "isMega": false,
    "elo": 14976,
    "winRate": 47.7,
    "appearances": 1100846,
    "wins": 525534,
    "losses": 575312,
    "bestPartners": [
      {
        "name": "Meowscarada",
        "winRate": 50.8,
        "games": 9382
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 9426
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 45820
      },
      {
        "name": "Farigiraf",
        "winRate": 50.5,
        "games": 18229
      },
      {
        "name": "Greninja",
        "winRate": 50.5,
        "games": 27921
      }
    ],
    "bestSets": []
  },
  "866": {
    "id": 866,
    "name": "Mr. Rime",
    "isMega": false,
    "elo": 14996,
    "winRate": 49.7,
    "appearances": 654773,
    "wins": 325240,
    "losses": 329533,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 54.1,
        "games": 25407
      },
      {
        "name": "Pawmot",
        "winRate": 53.3,
        "games": 27052
      },
      {
        "name": "Torkoal",
        "winRate": 53,
        "games": 78627
      },
      {
        "name": "Drampa",
        "winRate": 52.4,
        "games": 72257
      },
      {
        "name": "Dondozo",
        "winRate": 52.3,
        "games": 44295
      }
    ],
    "bestSets": []
  },
  "867": {
    "id": 867,
    "name": "Runerigus",
    "isMega": false,
    "elo": 14967,
    "winRate": 46,
    "appearances": 620619,
    "wins": 285383,
    "losses": 335236,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 51,
        "games": 9602
      },
      {
        "name": "Hydreigon",
        "winRate": 50.7,
        "games": 9576
      },
      {
        "name": "Scizor",
        "winRate": 50.7,
        "games": 9576
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.6,
        "games": 37098
      },
      {
        "name": "Altaria",
        "winRate": 50.3,
        "games": 47160
      }
    ],
    "bestSets": []
  },
  "869": {
    "id": 869,
    "name": "Alcremie",
    "isMega": false,
    "elo": 15007,
    "winRate": 51.1,
    "appearances": 628238,
    "wins": 320763,
    "losses": 307475,
    "bestPartners": [
      {
        "name": "Tatsugiri",
        "winRate": 58.9,
        "games": 7942
      },
      {
        "name": "Metagross",
        "winRate": 58.9,
        "games": 7942
      },
      {
        "name": "Greninja",
        "winRate": 57.6,
        "games": 16233
      },
      {
        "name": "Stunfisk",
        "winRate": 56.9,
        "games": 24434
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 56.9,
        "games": 16407
      }
    ],
    "bestSets": []
  },
  "877": {
    "id": 877,
    "name": "Morpeko",
    "isMega": false,
    "elo": 14985,
    "winRate": 47.2,
    "appearances": 765778,
    "wins": 361370,
    "losses": 404408,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 65.7,
        "games": 6974
      },
      {
        "name": "Primarina",
        "winRate": 62.1,
        "games": 22138
      },
      {
        "name": "Greninja",
        "winRate": 59.3,
        "games": 15471
      },
      {
        "name": "Azumarill",
        "winRate": 57.9,
        "games": 31713
      },
      {
        "name": "Hawlucha",
        "winRate": 57,
        "games": 16231
      }
    ],
    "bestSets": []
  },
  "887": {
    "id": 887,
    "name": "Dragapult",
    "isMega": false,
    "elo": 15026,
    "winRate": 50.3,
    "appearances": 39712982,
    "wins": 19970563,
    "losses": 19742419,
    "bestPartners": [
      {
        "name": "Typhlosion",
        "winRate": 80.3,
        "games": 5738
      },
      {
        "name": "Mow Rotom",
        "winRate": 68.8,
        "games": 20034
      },
      {
        "name": "Pawmot",
        "winRate": 66.9,
        "games": 13958
      },
      {
        "name": "Tsareena",
        "winRate": 66.1,
        "games": 41022
      },
      {
        "name": "Mega Absol Z",
        "winRate": 63.3,
        "games": 7086
      }
    ],
    "bestSets": []
  },
  "900": {
    "id": 900,
    "name": "Kleavor",
    "isMega": false,
    "elo": 15030,
    "winRate": 55.6,
    "appearances": 600196,
    "wins": 333837,
    "losses": 266359,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 61.9,
        "games": 7425
      },
      {
        "name": "Lucario",
        "winRate": 61.9,
        "games": 7425
      },
      {
        "name": "Metagross",
        "winRate": 61.9,
        "games": 7425
      },
      {
        "name": "Scizor",
        "winRate": 58.6,
        "games": 118531
      },
      {
        "name": "Venusaur",
        "winRate": 58.2,
        "games": 151158
      }
    ],
    "bestSets": []
  },
  "901": {
    "id": 901,
    "name": "Ursaluna",
    "isMega": false,
    "elo": 15013,
    "winRate": 51.6,
    "appearances": 4658839,
    "wins": 2403462,
    "losses": 2255377,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 76.1,
        "games": 5986
      },
      {
        "name": "Whimsicott",
        "winRate": 71,
        "games": 12898
      },
      {
        "name": "Hydreigon",
        "winRate": 70.6,
        "games": 12345
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 68.7,
        "games": 26785
      },
      {
        "name": "Tsareena",
        "winRate": 67.8,
        "games": 6701
      }
    ],
    "bestSets": []
  },
  "902": {
    "id": 902,
    "name": "Basculegion",
    "isMega": false,
    "elo": 15009,
    "winRate": 49.5,
    "appearances": 2550669,
    "wins": 1262371,
    "losses": 1288298,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 63.4,
        "games": 7463
      },
      {
        "name": "Mega Meganium",
        "winRate": 60.7,
        "games": 7846
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 60.4,
        "games": 7311
      },
      {
        "name": "Primarina",
        "winRate": 59.6,
        "games": 39197
      },
      {
        "name": "Kleavor",
        "winRate": 59.1,
        "games": 7910
      }
    ],
    "bestSets": []
  },
  "903": {
    "id": 903,
    "name": "Sneasler",
    "isMega": false,
    "elo": 15040,
    "winRate": 52.6,
    "appearances": 5268205,
    "wins": 2769171,
    "losses": 2499034,
    "bestPartners": [
      {
        "name": "Pawmot",
        "winRate": 80.3,
        "games": 5738
      },
      {
        "name": "Vanilluxe",
        "winRate": 73.7,
        "games": 12417
      },
      {
        "name": "Typhlosion",
        "winRate": 73.7,
        "games": 12417
      },
      {
        "name": "Mega Scizor",
        "winRate": 68.7,
        "games": 145751
      },
      {
        "name": "Garchomp",
        "winRate": 68.4,
        "games": 105906
      }
    ],
    "bestSets": []
  },
  "908": {
    "id": 908,
    "name": "Meowscarada",
    "isMega": false,
    "elo": 15018,
    "winRate": 50.5,
    "appearances": 1456746,
    "wins": 736241,
    "losses": 720505,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 66.1,
        "games": 103675
      },
      {
        "name": "Archaludon",
        "winRate": 65.9,
        "games": 68508
      },
      {
        "name": "Mow Rotom",
        "winRate": 65.5,
        "games": 35058
      },
      {
        "name": "Sinistcha",
        "winRate": 64.6,
        "games": 7243
      },
      {
        "name": "Tsareena",
        "winRate": 64.1,
        "games": 50031
      }
    ],
    "bestSets": []
  },
  "911": {
    "id": 911,
    "name": "Skeledirge",
    "isMega": false,
    "elo": 14961,
    "winRate": 46.9,
    "appearances": 636998,
    "wins": 298864,
    "losses": 338134,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 48.8,
        "games": 194309
      },
      {
        "name": "Froslass",
        "winRate": 48.8,
        "games": 27396
      },
      {
        "name": "Garchomp",
        "winRate": 48.7,
        "games": 221377
      },
      {
        "name": "Mega Chandelure",
        "winRate": 48.7,
        "games": 221377
      },
      {
        "name": "Excadrill",
        "winRate": 48.7,
        "games": 221377
      }
    ],
    "bestSets": []
  },
  "914": {
    "id": 914,
    "name": "Quaquaval",
    "isMega": false,
    "elo": 14991,
    "winRate": 50.3,
    "appearances": 811217,
    "wins": 408210,
    "losses": 403007,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 55.8,
        "games": 8513
      },
      {
        "name": "Azumarill",
        "winRate": 55.7,
        "games": 41266
      },
      {
        "name": "Pelipper",
        "winRate": 55.7,
        "games": 8566
      },
      {
        "name": "Orthworm",
        "winRate": 55.6,
        "games": 17132
      },
      {
        "name": "Garchomp",
        "winRate": 55.4,
        "games": 8619
      }
    ],
    "bestSets": []
  },
  "923": {
    "id": 923,
    "name": "Pawmot",
    "isMega": false,
    "elo": 14990,
    "winRate": 50.1,
    "appearances": 1029911,
    "wins": 516200,
    "losses": 513711,
    "bestPartners": [
      {
        "name": "Typhlosion",
        "winRate": 64,
        "games": 21730
      },
      {
        "name": "Kingambit",
        "winRate": 60.6,
        "games": 7773
      },
      {
        "name": "Torkoal",
        "winRate": 60.6,
        "games": 7773
      },
      {
        "name": "Metagross",
        "winRate": 57.7,
        "games": 7981
      },
      {
        "name": "Lucario",
        "winRate": 57.7,
        "games": 7981
      }
    ],
    "bestSets": []
  },
  "925": {
    "id": 925,
    "name": "Maushold",
    "isMega": false,
    "elo": 14984,
    "winRate": 48.8,
    "appearances": 663821,
    "wins": 323783,
    "losses": 340038,
    "bestPartners": [
      {
        "name": "Alakazam",
        "winRate": 50.6,
        "games": 9293
      },
      {
        "name": "Aegislash",
        "winRate": 50.6,
        "games": 9293
      },
      {
        "name": "Venusaur",
        "winRate": 50.6,
        "games": 9368
      },
      {
        "name": "Kangaskhan",
        "winRate": 50.6,
        "games": 9368
      },
      {
        "name": "Hatterene",
        "winRate": 50.5,
        "games": 9427
      }
    ],
    "bestSets": []
  },
  "934": {
    "id": 934,
    "name": "Garganacl",
    "isMega": false,
    "elo": 15002,
    "winRate": 49.6,
    "appearances": 1515482,
    "wins": 752074,
    "losses": 763408,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 60.4,
        "games": 30678
      },
      {
        "name": "Excadrill",
        "winRate": 59.8,
        "games": 7785
      },
      {
        "name": "Orthworm",
        "winRate": 56.7,
        "games": 16648
      },
      {
        "name": "Vivillon",
        "winRate": 56.5,
        "games": 49631
      },
      {
        "name": "Empoleon",
        "winRate": 56.1,
        "games": 41776
      }
    ],
    "bestSets": []
  },
  "936": {
    "id": 936,
    "name": "Armarouge",
    "isMega": false,
    "elo": 14979,
    "winRate": 49.4,
    "appearances": 655731,
    "wins": 324227,
    "losses": 331504,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 56.6,
        "games": 16671
      },
      {
        "name": "Azumarill",
        "winRate": 54.2,
        "games": 25459
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 54.2,
        "games": 26053
      },
      {
        "name": "Archaludon",
        "winRate": 52.1,
        "games": 27641
      },
      {
        "name": "Krookodile",
        "winRate": 51.5,
        "games": 26692
      }
    ],
    "bestSets": []
  },
  "937": {
    "id": 937,
    "name": "Ceruledge",
    "isMega": false,
    "elo": 15004,
    "winRate": 50.2,
    "appearances": 646228,
    "wins": 324175,
    "losses": 322053,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 54.9,
        "games": 50892
      },
      {
        "name": "Altaria",
        "winRate": 54.8,
        "games": 8642
      },
      {
        "name": "Absol",
        "winRate": 54.6,
        "games": 52148
      },
      {
        "name": "Archaludon",
        "winRate": 54,
        "games": 87142
      },
      {
        "name": "Umbreon",
        "winRate": 54,
        "games": 43537
      }
    ],
    "bestSets": []
  },
  "952": {
    "id": 952,
    "name": "Scovillain",
    "isMega": false,
    "elo": 15000,
    "winRate": 50.1,
    "appearances": 893682,
    "wins": 447471,
    "losses": 446211,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 50.9,
        "games": 56948
      },
      {
        "name": "Empoleon",
        "winRate": 50.8,
        "games": 448440
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.8,
        "games": 448440
      },
      {
        "name": "Tinkaton",
        "winRate": 50.8,
        "games": 448440
      },
      {
        "name": "Kingambit",
        "winRate": 50.8,
        "games": 448440
      }
    ],
    "bestSets": []
  },
  "959": {
    "id": 959,
    "name": "Tinkaton",
    "isMega": false,
    "elo": 15022,
    "winRate": 50.1,
    "appearances": 9376194,
    "wins": 4701418,
    "losses": 4674776,
    "bestPartners": [
      {
        "name": "Aggron",
        "winRate": 61.2,
        "games": 7501
      },
      {
        "name": "Mega Chesnaught",
        "winRate": 59.1,
        "games": 70222
      },
      {
        "name": "Corviknight",
        "winRate": 58.8,
        "games": 7958
      },
      {
        "name": "Meganium",
        "winRate": 58.6,
        "games": 361929
      },
      {
        "name": "Leafeon",
        "winRate": 58.1,
        "games": 143165
      }
    ],
    "bestSets": []
  },
  "964": {
    "id": 964,
    "name": "Palafin",
    "isMega": false,
    "elo": 15026,
    "winRate": 51,
    "appearances": 9316422,
    "wins": 4746832,
    "losses": 4569590,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 70.7,
        "games": 12639
      },
      {
        "name": "Mega Venusaur",
        "winRate": 65.3,
        "games": 48232
      },
      {
        "name": "Milotic",
        "winRate": 65.1,
        "games": 13631
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 62.9,
        "games": 21488
      },
      {
        "name": "Flareon",
        "winRate": 62.2,
        "games": 7613
      }
    ],
    "bestSets": []
  },
  "968": {
    "id": 968,
    "name": "Orthworm",
    "isMega": false,
    "elo": 14999,
    "winRate": 49.5,
    "appearances": 1013828,
    "wins": 501801,
    "losses": 512027,
    "bestPartners": [
      {
        "name": "Chesnaught",
        "winRate": 62.1,
        "games": 7501
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 62.1,
        "games": 7501
      },
      {
        "name": "Heat Rotom",
        "winRate": 58.9,
        "games": 8050
      },
      {
        "name": "Garchomp",
        "winRate": 58.6,
        "games": 39957
      },
      {
        "name": "Archaludon",
        "winRate": 58.5,
        "games": 23847
      }
    ],
    "bestSets": []
  },
  "970": {
    "id": 970,
    "name": "Glimmora",
    "isMega": false,
    "elo": 15006,
    "winRate": 51.5,
    "appearances": 663923,
    "wins": 342063,
    "losses": 321860,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 56.7,
        "games": 195926
      },
      {
        "name": "Kingambit",
        "winRate": 56.7,
        "games": 195926
      },
      {
        "name": "Dragapult",
        "winRate": 56.7,
        "games": 195926
      },
      {
        "name": "Scizor",
        "winRate": 56.5,
        "games": 204684
      },
      {
        "name": "Mow Rotom",
        "winRate": 52.1,
        "games": 17738
      }
    ],
    "bestSets": []
  },
  "977": {
    "id": 977,
    "name": "Dondozo",
    "isMega": false,
    "elo": 15022,
    "winRate": 49.9,
    "appearances": 3881846,
    "wins": 1938968,
    "losses": 1942878,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 62.2,
        "games": 6900
      },
      {
        "name": "Azumarill",
        "winRate": 62.2,
        "games": 6900
      },
      {
        "name": "Archaludon",
        "winRate": 59.1,
        "games": 7910
      },
      {
        "name": "Metagross",
        "winRate": 59.1,
        "games": 7910
      },
      {
        "name": "Torkoal",
        "winRate": 55.1,
        "games": 15626
      }
    ],
    "bestSets": []
  },
  "978": {
    "id": 978,
    "name": "Tatsugiri",
    "isMega": false,
    "elo": 15027,
    "winRate": 50.3,
    "appearances": 6267111,
    "wins": 3149523,
    "losses": 3117588,
    "bestPartners": [
      {
        "name": "Metagross",
        "winRate": 59,
        "games": 15852
      },
      {
        "name": "Alcremie",
        "winRate": 58.9,
        "games": 7942
      },
      {
        "name": "Stunfisk",
        "winRate": 58.9,
        "games": 7942
      },
      {
        "name": "Pawmot",
        "winRate": 57.3,
        "games": 8023
      },
      {
        "name": "Mega Excadrill",
        "winRate": 56.8,
        "games": 7924
      }
    ],
    "bestSets": []
  },
  "981": {
    "id": 981,
    "name": "Farigiraf",
    "isMega": false,
    "elo": 15012,
    "winRate": 50.3,
    "appearances": 700018,
    "wins": 351793,
    "losses": 348225,
    "bestPartners": [
      {
        "name": "Hatterene",
        "winRate": 53.9,
        "games": 208611
      },
      {
        "name": "Dondozo",
        "winRate": 53.9,
        "games": 208611
      },
      {
        "name": "Garchomp",
        "winRate": 53.9,
        "games": 208611
      },
      {
        "name": "Incineroar",
        "winRate": 52.5,
        "games": 291092
      },
      {
        "name": "Lucario",
        "winRate": 52.5,
        "games": 8911
      }
    ],
    "bestSets": []
  },
  "983": {
    "id": 983,
    "name": "Kingambit",
    "isMega": false,
    "elo": 15029,
    "winRate": 50.3,
    "appearances": 33678194,
    "wins": 16948142,
    "losses": 16730052,
    "bestPartners": [
      {
        "name": "Fan Rotom",
        "winRate": 66,
        "games": 164587
      },
      {
        "name": "Mega Venusaur",
        "winRate": 63.6,
        "games": 35456
      },
      {
        "name": "Quaquaval",
        "winRate": 63.5,
        "games": 6980
      },
      {
        "name": "Heat Rotom",
        "winRate": 62.2,
        "games": 44194
      },
      {
        "name": "Klefki",
        "winRate": 61.8,
        "games": 14802
      }
    ],
    "bestSets": []
  },
  "1013": {
    "id": 1013,
    "name": "Sinistcha",
    "isMega": false,
    "elo": 15019,
    "winRate": 51.3,
    "appearances": 2674862,
    "wins": 1371090,
    "losses": 1303772,
    "bestPartners": [
      {
        "name": "Goodra",
        "winRate": 67.6,
        "games": 6750
      },
      {
        "name": "Archaludon",
        "winRate": 66.2,
        "games": 117263
      },
      {
        "name": "Kommo-o",
        "winRate": 65.4,
        "games": 20793
      },
      {
        "name": "Meowscarada",
        "winRate": 64.6,
        "games": 7243
      },
      {
        "name": "Incineroar",
        "winRate": 64.5,
        "games": 28709
      }
    ],
    "bestSets": []
  },
  "1018": {
    "id": 1018,
    "name": "Archaludon",
    "isMega": false,
    "elo": 15049,
    "winRate": 54.4,
    "appearances": 8990867,
    "wins": 4894127,
    "losses": 4096740,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 83.8,
        "games": 5355
      },
      {
        "name": "Tsareena",
        "winRate": 76.4,
        "games": 11634
      },
      {
        "name": "Decidueye",
        "winRate": 73.6,
        "games": 12234
      },
      {
        "name": "Mega Blastoise",
        "winRate": 72.5,
        "games": 100069
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 71.9,
        "games": 12475
      }
    ],
    "bestSets": []
  },
  "1019": {
    "id": 1019,
    "name": "Hydrapple",
    "isMega": false,
    "elo": 15004,
    "winRate": 49.5,
    "appearances": 833825,
    "wins": 412972,
    "losses": 420853,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 59.1,
        "games": 7711
      },
      {
        "name": "Arcanine",
        "winRate": 59.1,
        "games": 7711
      },
      {
        "name": "Steelix",
        "winRate": 59.1,
        "games": 7711
      },
      {
        "name": "Sneasler",
        "winRate": 54.1,
        "games": 16944
      },
      {
        "name": "Mega Slowbro",
        "winRate": 51.4,
        "games": 54224
      }
    ],
    "bestSets": []
  },
  "5059": {
    "id": 5059,
    "name": "Hisuian Arcanine",
    "isMega": false,
    "elo": 14994,
    "winRate": 47.7,
    "appearances": 15414619,
    "wins": 7356536,
    "losses": 8058083,
    "bestPartners": [
      {
        "name": "Toucannon",
        "winRate": 57.2,
        "games": 15743
      },
      {
        "name": "Hydreigon",
        "winRate": 54.6,
        "games": 8554
      },
      {
        "name": "Dragapult",
        "winRate": 53.5,
        "games": 8941
      },
      {
        "name": "Gardevoir",
        "winRate": 53.5,
        "games": 8941
      },
      {
        "name": "Azumarill",
        "winRate": 53,
        "games": 26353
      }
    ],
    "bestSets": []
  },
  "5157": {
    "id": 5157,
    "name": "Hisuian Typhlosion",
    "isMega": false,
    "elo": 15010,
    "winRate": 51,
    "appearances": 648646,
    "wins": 330940,
    "losses": 317706,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 57.1,
        "games": 72949
      },
      {
        "name": "Morpeko",
        "winRate": 55.6,
        "games": 50486
      },
      {
        "name": "Greninja",
        "winRate": 55.6,
        "games": 49613
      },
      {
        "name": "Hawlucha",
        "winRate": 55.2,
        "games": 42024
      },
      {
        "name": "Weavile",
        "winRate": 54.5,
        "games": 59305
      }
    ],
    "bestSets": []
  },
  "6080": {
    "id": 6080,
    "name": "Galarian Slowbro",
    "isMega": false,
    "elo": 15008,
    "winRate": 48.7,
    "appearances": 2486289,
    "wins": 1210255,
    "losses": 1276034,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 50.8,
        "games": 223328
      },
      {
        "name": "Palafin",
        "winRate": 50.8,
        "games": 205148
      },
      {
        "name": "Clefable",
        "winRate": 50.8,
        "games": 186230
      },
      {
        "name": "Dragapult",
        "winRate": 50.8,
        "games": 9586
      },
      {
        "name": "Arcanine",
        "winRate": 50.8,
        "games": 9586
      }
    ],
    "bestSets": []
  },
  "6199": {
    "id": 6199,
    "name": "Galarian Slowking",
    "isMega": false,
    "elo": 14989,
    "winRate": 48.9,
    "appearances": 774589,
    "wins": 378651,
    "losses": 395938,
    "bestPartners": [
      {
        "name": "Mega Audino",
        "winRate": 50.5,
        "games": 92740
      },
      {
        "name": "Audino",
        "winRate": 50.3,
        "games": 297339
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 658328
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 9056
      },
      {
        "name": "Mimikyu",
        "winRate": 50.3,
        "games": 9056
      }
    ],
    "bestSets": []
  },
  "6618": {
    "id": 6618,
    "name": "Galarian Stunfisk",
    "isMega": false,
    "elo": 14988,
    "winRate": 47,
    "appearances": 3713444,
    "wins": 1743481,
    "losses": 1969963,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 60.7,
        "games": 7616
      },
      {
        "name": "Kommo-o",
        "winRate": 56.9,
        "games": 7947
      },
      {
        "name": "Greninja",
        "winRate": 56.4,
        "games": 8291
      },
      {
        "name": "Diggersby",
        "winRate": 55.6,
        "games": 16594
      },
      {
        "name": "Mega Pinsir",
        "winRate": 54.9,
        "games": 25502
      }
    ],
    "bestSets": []
  },
  "10008": {
    "id": 10008,
    "name": "Heat Rotom",
    "isMega": false,
    "elo": 15037,
    "winRate": 53.8,
    "appearances": 4755176,
    "wins": 2560319,
    "losses": 2194857,
    "bestPartners": [
      {
        "name": "Serperior",
        "winRate": 72.5,
        "games": 12778
      },
      {
        "name": "Skarmory",
        "winRate": 72.1,
        "games": 6479
      },
      {
        "name": "Mega Blastoise",
        "winRate": 68.4,
        "games": 59587
      },
      {
        "name": "Tsareena",
        "winRate": 67.8,
        "games": 13212
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 66.7,
        "games": 6963
      }
    ],
    "bestSets": []
  },
  "10009": {
    "id": 10009,
    "name": "Wash Rotom",
    "isMega": false,
    "elo": 15032,
    "winRate": 53.5,
    "appearances": 1439415,
    "wins": 769717,
    "losses": 669698,
    "bestPartners": [
      {
        "name": "Gourgeist",
        "winRate": 66.1,
        "games": 6760
      },
      {
        "name": "Feraligatr",
        "winRate": 66.1,
        "games": 6760
      },
      {
        "name": "Vaporeon",
        "winRate": 66.1,
        "games": 6760
      },
      {
        "name": "Primarina",
        "winRate": 64,
        "games": 7317
      },
      {
        "name": "Mega Meganium",
        "winRate": 63.8,
        "games": 14516
      }
    ],
    "bestSets": []
  },
  "10010": {
    "id": 10010,
    "name": "Frost Rotom",
    "isMega": false,
    "elo": 14998,
    "winRate": 50.1,
    "appearances": 654944,
    "wins": 328369,
    "losses": 326575,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 53.6,
        "games": 51915
      },
      {
        "name": "Sneasler",
        "winRate": 53.4,
        "games": 69780
      },
      {
        "name": "Heracross",
        "winRate": 52.4,
        "games": 79666
      },
      {
        "name": "Krookodile",
        "winRate": 52.4,
        "games": 53126
      },
      {
        "name": "Fan Rotom",
        "winRate": 52.4,
        "games": 79801
      }
    ],
    "bestSets": []
  },
  "10011": {
    "id": 10011,
    "name": "Fan Rotom",
    "isMega": false,
    "elo": 15023,
    "winRate": 50,
    "appearances": 2885371,
    "wins": 1442006,
    "losses": 1443365,
    "bestPartners": [
      {
        "name": "Vanilluxe",
        "winRate": 68.1,
        "games": 6679
      },
      {
        "name": "Pawmot",
        "winRate": 68.1,
        "games": 6679
      },
      {
        "name": "Typhlosion",
        "winRate": 68.1,
        "games": 6679
      },
      {
        "name": "Mega Gyarados",
        "winRate": 67.1,
        "games": 161944
      },
      {
        "name": "Kingambit",
        "winRate": 66,
        "games": 163614
      }
    ],
    "bestSets": []
  },
  "10012": {
    "id": 10012,
    "name": "Mow Rotom",
    "isMega": false,
    "elo": 15028,
    "winRate": 52.9,
    "appearances": 898419,
    "wins": 475665,
    "losses": 422754,
    "bestPartners": [
      {
        "name": "Serperior",
        "winRate": 80.9,
        "games": 5740
      },
      {
        "name": "Decidueye",
        "winRate": 67,
        "games": 13386
      },
      {
        "name": "Mega Blastoise",
        "winRate": 65.7,
        "games": 70086
      },
      {
        "name": "Heat Rotom",
        "winRate": 63.8,
        "games": 43030
      },
      {
        "name": "Primarina",
        "winRate": 63,
        "games": 7195
      }
    ],
    "bestSets": []
  },
  "10100": {
    "id": 10100,
    "name": "Alolan Raichu",
    "isMega": false,
    "elo": 15008,
    "winRate": 49.4,
    "appearances": 2302868,
    "wins": 1137967,
    "losses": 1164901,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 60.1,
        "games": 23219
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 57.8,
        "games": 8070
      },
      {
        "name": "Wash Rotom",
        "winRate": 56.2,
        "games": 33071
      },
      {
        "name": "Aggron",
        "winRate": 55.2,
        "games": 25526
      },
      {
        "name": "Mega Heracross",
        "winRate": 54.2,
        "games": 51858
      }
    ],
    "bestSets": []
  },
  "10103": {
    "id": 10103,
    "name": "Alolan Ninetales",
    "isMega": false,
    "elo": 15021,
    "winRate": 49.9,
    "appearances": 3308284,
    "wins": 1650231,
    "losses": 1658053,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 58.1,
        "games": 32491
      },
      {
        "name": "Heat Rotom",
        "winRate": 56.3,
        "games": 57580
      },
      {
        "name": "Azumarill",
        "winRate": 56,
        "games": 32872
      },
      {
        "name": "Aggron",
        "winRate": 55.5,
        "games": 50565
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 54.1,
        "games": 50830
      }
    ],
    "bestSets": []
  },
  "10336": {
    "id": 10336,
    "name": "Hisuian Samurott",
    "isMega": false,
    "elo": 15015,
    "winRate": 50.7,
    "appearances": 1974056,
    "wins": 1001700,
    "losses": 972356,
    "bestPartners": [
      {
        "name": "Ursaluna",
        "winRate": 76.1,
        "games": 5986
      },
      {
        "name": "Garchomp",
        "winRate": 68.3,
        "games": 13487
      },
      {
        "name": "Houndoom",
        "winRate": 68.1,
        "games": 6489
      },
      {
        "name": "Palafin",
        "winRate": 66.2,
        "games": 13558
      },
      {
        "name": "Milotic",
        "winRate": 64.2,
        "games": 14200
      }
    ],
    "bestSets": []
  },
  "10340": {
    "id": 10340,
    "name": "Hisuian Zoroark",
    "isMega": false,
    "elo": 14995,
    "winRate": 47.4,
    "appearances": 1625011,
    "wins": 769987,
    "losses": 855024,
    "bestPartners": [
      {
        "name": "Alolan Raichu",
        "winRate": 57.8,
        "games": 8070
      },
      {
        "name": "Stunfisk",
        "winRate": 56,
        "games": 8337
      },
      {
        "name": "Archaludon",
        "winRate": 54.3,
        "games": 52194
      },
      {
        "name": "Alcremie",
        "winRate": 53.8,
        "games": 43465
      },
      {
        "name": "Empoleon",
        "winRate": 51.9,
        "games": 44666
      }
    ],
    "bestSets": []
  },
  "10341": {
    "id": 10341,
    "name": "Hisuian Decidueye",
    "isMega": false,
    "elo": 14992,
    "winRate": 48.5,
    "appearances": 1035549,
    "wins": 501765,
    "losses": 533784,
    "bestPartners": [
      {
        "name": "Armarouge",
        "winRate": 64,
        "games": 7060
      },
      {
        "name": "Basculegion",
        "winRate": 60.4,
        "games": 7311
      },
      {
        "name": "Decidueye",
        "winRate": 60.4,
        "games": 7311
      },
      {
        "name": "Fan Rotom",
        "winRate": 60.1,
        "games": 7688
      },
      {
        "name": "Mega Houndoom",
        "winRate": 59.6,
        "games": 22970
      }
    ],
    "bestSets": []
  },
  "478-mega": {
    "id": 478,
    "name": "Mega Froslass",
    "isMega": true,
    "elo": 15066,
    "winRate": 56.3,
    "appearances": 594934,
    "wins": 335162,
    "losses": 259772,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 63.8,
        "games": 49528
      },
      {
        "name": "Garchomp",
        "winRate": 63.4,
        "games": 57898
      },
      {
        "name": "Archaludon",
        "winRate": 63.2,
        "games": 129341
      },
      {
        "name": "Ursaluna",
        "winRate": 62.3,
        "games": 66485
      },
      {
        "name": "Greninja",
        "winRate": 61.4,
        "games": 111046
      }
    ],
    "bestSets": []
  },
  "9-mega": {
    "id": 9,
    "name": "Mega Blastoise",
    "isMega": true,
    "elo": 15049,
    "winRate": 54.4,
    "appearances": 2308311,
    "wins": 1255142,
    "losses": 1053169,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 72.5,
        "games": 100069
      },
      {
        "name": "Arcanine",
        "winRate": 69.8,
        "games": 78192
      },
      {
        "name": "Meowscarada",
        "winRate": 68.6,
        "games": 86261
      },
      {
        "name": "Heat Rotom",
        "winRate": 68.3,
        "games": 52997
      },
      {
        "name": "Decidueye",
        "winRate": 67.3,
        "games": 60473
      }
    ],
    "bestSets": []
  },
  "212-mega": {
    "id": 212,
    "name": "Mega Scizor",
    "isMega": true,
    "elo": 15041,
    "winRate": 51.9,
    "appearances": 3912535,
    "wins": 2031705,
    "losses": 1880830,
    "bestPartners": [
      {
        "name": "Froslass",
        "winRate": 68.4,
        "games": 159666
      },
      {
        "name": "Archaludon",
        "winRate": 68.4,
        "games": 159666
      },
      {
        "name": "Sneasler",
        "winRate": 68.4,
        "games": 159666
      },
      {
        "name": "Primarina",
        "winRate": 60.5,
        "games": 320077
      },
      {
        "name": "Azumarill",
        "winRate": 60.3,
        "games": 23348
      }
    ],
    "bestSets": []
  },
  "127-mega": {
    "id": 127,
    "name": "Mega Pinsir",
    "isMega": true,
    "elo": 15034,
    "winRate": 53.9,
    "appearances": 809371,
    "wins": 436603,
    "losses": 372768,
    "bestPartners": [
      {
        "name": "Ursaluna",
        "winRate": 61.2,
        "games": 179820
      },
      {
        "name": "Garchomp",
        "winRate": 61.2,
        "games": 179820
      },
      {
        "name": "Clefable",
        "winRate": 61.2,
        "games": 179820
      },
      {
        "name": "Metagross",
        "winRate": 60.8,
        "games": 7550
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.7,
        "games": 7616
      }
    ],
    "bestSets": []
  },
  "376-mega": {
    "id": 376,
    "name": "Mega Metagross",
    "isMega": true,
    "elo": 15034,
    "winRate": 50,
    "appearances": 12461997,
    "wins": 6233002,
    "losses": 6228995,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Weavile",
        "winRate": 61.1,
        "games": 7417
      },
      {
        "name": "Lucario",
        "winRate": 56.3,
        "games": 57702
      },
      {
        "name": "Meowscarada",
        "winRate": 54.5,
        "games": 33994
      },
      {
        "name": "Charizard",
        "winRate": 53.1,
        "games": 35579
      }
    ],
    "bestSets": []
  },
  "445-mega-z": {
    "id": 445,
    "name": "Mega Garchomp Z",
    "isMega": true,
    "elo": 15032,
    "winRate": 53.2,
    "appearances": 621791,
    "wins": 330652,
    "losses": 291139,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 60.9,
        "games": 98575
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.1,
        "games": 107353
      },
      {
        "name": "Empoleon",
        "winRate": 58.7,
        "games": 47156
      },
      {
        "name": "Azumarill",
        "winRate": 58.1,
        "games": 104261
      },
      {
        "name": "Metagross",
        "winRate": 57.9,
        "games": 111381
      }
    ],
    "bestSets": []
  },
  "6-mega-y": {
    "id": 6,
    "name": "Mega Charizard Y",
    "isMega": true,
    "elo": 15031,
    "winRate": 51,
    "appearances": 1304810,
    "wins": 665004,
    "losses": 639806,
    "bestPartners": [
      {
        "name": "Ursaluna",
        "winRate": 61.2,
        "games": 45347
      },
      {
        "name": "Kommo-o",
        "winRate": 59.7,
        "games": 84626
      },
      {
        "name": "Sandaconda",
        "winRate": 58.8,
        "games": 62878
      },
      {
        "name": "Steelix",
        "winRate": 58.7,
        "games": 47375
      },
      {
        "name": "Garchomp",
        "winRate": 57.5,
        "games": 72596
      }
    ],
    "bestSets": []
  },
  "3-mega": {
    "id": 3,
    "name": "Mega Venusaur",
    "isMega": true,
    "elo": 15027,
    "winRate": 52.9,
    "appearances": 625844,
    "wins": 330858,
    "losses": 294986,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 58.3,
        "games": 102866
      },
      {
        "name": "Primarina",
        "winRate": 58.2,
        "games": 70431
      },
      {
        "name": "Milotic",
        "winRate": 57.8,
        "games": 79674
      },
      {
        "name": "Heat Rotom",
        "winRate": 57.6,
        "games": 87798
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 56.9,
        "games": 114216
      }
    ],
    "bestSets": []
  },
  "130-mega": {
    "id": 130,
    "name": "Mega Gyarados",
    "isMega": true,
    "elo": 15025,
    "winRate": 51.3,
    "appearances": 11547825,
    "wins": 5926715,
    "losses": 5621110,
    "bestPartners": [
      {
        "name": "Fan Rotom",
        "winRate": 67.1,
        "games": 161944
      },
      {
        "name": "Froslass",
        "winRate": 64.8,
        "games": 168172
      },
      {
        "name": "Clefable",
        "winRate": 64.8,
        "games": 168172
      },
      {
        "name": "Ursaluna",
        "winRate": 62.6,
        "games": 138532
      },
      {
        "name": "Snorlax",
        "winRate": 59.4,
        "games": 148125
      }
    ],
    "bestSets": []
  },
  "214-mega": {
    "id": 214,
    "name": "Mega Heracross",
    "isMega": true,
    "elo": 15021,
    "winRate": 52,
    "appearances": 852523,
    "wins": 443308,
    "losses": 409215,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 62.5,
        "games": 7246
      },
      {
        "name": "Alolan Raichu",
        "winRate": 61.3,
        "games": 15149
      },
      {
        "name": "Aggron",
        "winRate": 60.6,
        "games": 15118
      },
      {
        "name": "Wash Rotom",
        "winRate": 59.3,
        "games": 39122
      },
      {
        "name": "Archaludon",
        "winRate": 58.5,
        "games": 55622
      }
    ],
    "bestSets": []
  },
  "248-mega": {
    "id": 248,
    "name": "Mega Tyranitar",
    "isMega": true,
    "elo": 15020,
    "winRate": 49.9,
    "appearances": 12922571,
    "wins": 6448799,
    "losses": 6473772,
    "bestPartners": [
      {
        "name": "Volcarona",
        "winRate": 56.5,
        "games": 49484
      },
      {
        "name": "Sneasler",
        "winRate": 55,
        "games": 109707
      },
      {
        "name": "Heracross",
        "winRate": 53.2,
        "games": 62145
      },
      {
        "name": "Sinistcha",
        "winRate": 53.2,
        "games": 148023
      },
      {
        "name": "Venusaur",
        "winRate": 52.8,
        "games": 86993
      }
    ],
    "bestSets": []
  },
  "160-mega": {
    "id": 160,
    "name": "Mega Feraligatr",
    "isMega": true,
    "elo": 15020,
    "winRate": 53.8,
    "appearances": 710363,
    "wins": 382002,
    "losses": 328361,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 63.7,
        "games": 128929
      },
      {
        "name": "Meowscarada",
        "winRate": 62.5,
        "games": 36197
      },
      {
        "name": "Tsareena",
        "winRate": 60.7,
        "games": 45627
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.1,
        "games": 169785
      },
      {
        "name": "Mow Rotom",
        "winRate": 59.8,
        "games": 54406
      }
    ],
    "bestSets": []
  },
  "609-mega": {
    "id": 609,
    "name": "Mega Chandelure",
    "isMega": true,
    "elo": 15019,
    "winRate": 50,
    "appearances": 1086132,
    "wins": 542640,
    "losses": 543492,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 57,
        "games": 81626
      },
      {
        "name": "Empoleon",
        "winRate": 54.3,
        "games": 78199
      },
      {
        "name": "Hydreigon",
        "winRate": 54.2,
        "games": 103760
      },
      {
        "name": "Hawlucha",
        "winRate": 54,
        "games": 60227
      },
      {
        "name": "Whimsicott",
        "winRate": 53.2,
        "games": 87597
      }
    ],
    "bestSets": []
  },
  "701-mega": {
    "id": 701,
    "name": "Mega Hawlucha",
    "isMega": true,
    "elo": 15018,
    "winRate": 50.5,
    "appearances": 671188,
    "wins": 339127,
    "losses": 332061,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 53,
        "games": 79866
      },
      {
        "name": "Archaludon",
        "winRate": 52.7,
        "games": 98594
      },
      {
        "name": "Metagross",
        "winRate": 52.6,
        "games": 108028
      },
      {
        "name": "Excadrill",
        "winRate": 52.5,
        "games": 64001
      },
      {
        "name": "Aggron",
        "winRate": 51.9,
        "games": 18216
      }
    ],
    "bestSets": []
  },
  "154-mega": {
    "id": 154,
    "name": "Mega Meganium",
    "isMega": true,
    "elo": 15016,
    "winRate": 52.9,
    "appearances": 630288,
    "wins": 333466,
    "losses": 296822,
    "bestPartners": [
      {
        "name": "Aggron",
        "winRate": 64,
        "games": 7317
      },
      {
        "name": "Wash Rotom",
        "winRate": 63.8,
        "games": 14516
      },
      {
        "name": "Milotic",
        "winRate": 63.6,
        "games": 7199
      },
      {
        "name": "Kingambit",
        "winRate": 60.7,
        "games": 7846
      },
      {
        "name": "Primarina",
        "winRate": 60.7,
        "games": 7846
      }
    ],
    "bestSets": []
  },
  "282-mega": {
    "id": 282,
    "name": "Mega Gardevoir",
    "isMega": true,
    "elo": 15015,
    "winRate": 49.8,
    "appearances": 17486862,
    "wins": 8710818,
    "losses": 8776044,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 56.7,
        "games": 49462
      },
      {
        "name": "Snorlax",
        "winRate": 54.2,
        "games": 32970
      },
      {
        "name": "Empoleon",
        "winRate": 53.1,
        "games": 45092
      },
      {
        "name": "Lucario",
        "winRate": 52,
        "games": 45421
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 51.4,
        "games": 45702
      }
    ],
    "bestSets": []
  },
  "655-mega": {
    "id": 655,
    "name": "Mega Delphox",
    "isMega": true,
    "elo": 15015,
    "winRate": 51.5,
    "appearances": 651491,
    "wins": 335300,
    "losses": 316191,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 55.4,
        "games": 57954
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 55.2,
        "games": 92599
      },
      {
        "name": "Dragonite",
        "winRate": 55.2,
        "games": 8385
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 55.1,
        "games": 68015
      },
      {
        "name": "Hawlucha",
        "winRate": 54.9,
        "games": 77302
      }
    ],
    "bestSets": []
  },
  "80-mega": {
    "id": 80,
    "name": "Mega Slowbro",
    "isMega": true,
    "elo": 15012,
    "winRate": 51.5,
    "appearances": 654630,
    "wins": 337051,
    "losses": 317579,
    "bestPartners": [
      {
        "name": "Hydrapple",
        "winRate": 59.1,
        "games": 7711
      },
      {
        "name": "Crabominable",
        "winRate": 54.8,
        "games": 8593
      },
      {
        "name": "Conkeldurr",
        "winRate": 54.7,
        "games": 34459
      },
      {
        "name": "Whimsicott",
        "winRate": 54.7,
        "games": 8450
      },
      {
        "name": "Krookodile",
        "winRate": 54.6,
        "games": 17519
      }
    ],
    "bestSets": []
  },
  "142-mega": {
    "id": 142,
    "name": "Mega Aerodactyl",
    "isMega": true,
    "elo": 15011,
    "winRate": 51.6,
    "appearances": 654527,
    "wins": 337527,
    "losses": 317000,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 56.2,
        "games": 7995
      },
      {
        "name": "Krookodile",
        "winRate": 54.7,
        "games": 25705
      },
      {
        "name": "Blastoise",
        "winRate": 54.4,
        "games": 8691
      },
      {
        "name": "Orthworm",
        "winRate": 54.2,
        "games": 42994
      },
      {
        "name": "Arcanine",
        "winRate": 54,
        "games": 34228
      }
    ],
    "bestSets": []
  },
  "652-mega": {
    "id": 652,
    "name": "Mega Chesnaught",
    "isMega": true,
    "elo": 15011,
    "winRate": 53.1,
    "appearances": 630902,
    "wins": 334758,
    "losses": 296144,
    "bestPartners": [
      {
        "name": "Froslass",
        "winRate": 59.3,
        "games": 15368
      },
      {
        "name": "Starmie",
        "winRate": 58.2,
        "games": 8141
      },
      {
        "name": "Aerodactyl",
        "winRate": 55.8,
        "games": 16680
      },
      {
        "name": "Metagross",
        "winRate": 55.6,
        "games": 33419
      },
      {
        "name": "Empoleon",
        "winRate": 55.2,
        "games": 311654
      }
    ],
    "bestSets": []
  },
  "208-mega": {
    "id": 208,
    "name": "Mega Steelix",
    "isMega": true,
    "elo": 15010,
    "winRate": 49.8,
    "appearances": 671058,
    "wins": 334012,
    "losses": 337046,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 51,
        "games": 45449
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.8,
        "games": 110846
      },
      {
        "name": "Feraligatr",
        "winRate": 50.5,
        "games": 92355
      },
      {
        "name": "Altaria",
        "winRate": 50.4,
        "games": 75361
      },
      {
        "name": "Milotic",
        "winRate": 50.4,
        "games": 56183
      }
    ],
    "bestSets": []
  },
  "121-mega": {
    "id": 121,
    "name": "Mega Starmie",
    "isMega": true,
    "elo": 15008,
    "winRate": 51.3,
    "appearances": 649669,
    "wins": 333344,
    "losses": 316325,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 55.6,
        "games": 74965
      },
      {
        "name": "Venusaur",
        "winRate": 54.2,
        "games": 94312
      },
      {
        "name": "Whimsicott",
        "winRate": 53.9,
        "games": 53076
      },
      {
        "name": "Conkeldurr",
        "winRate": 53.8,
        "games": 113685
      },
      {
        "name": "Heracross",
        "winRate": 53.6,
        "games": 137765
      }
    ],
    "bestSets": []
  },
  "115-mega": {
    "id": 115,
    "name": "Mega Kangaskhan",
    "isMega": true,
    "elo": 15007,
    "winRate": 49.2,
    "appearances": 6476744,
    "wins": 3188890,
    "losses": 3287854,
    "bestPartners": [
      {
        "name": "Sinistcha",
        "winRate": 52.6,
        "games": 8897
      },
      {
        "name": "Arcanine",
        "winRate": 51.2,
        "games": 18004
      },
      {
        "name": "Polteageist",
        "winRate": 50.9,
        "games": 18682
      },
      {
        "name": "Excadrill",
        "winRate": 50.8,
        "games": 226740
      },
      {
        "name": "Venusaur",
        "winRate": 50.8,
        "games": 217248
      }
    ],
    "bestSets": []
  },
  "448-mega": {
    "id": 448,
    "name": "Mega Lucario",
    "isMega": true,
    "elo": 15006,
    "winRate": 49.8,
    "appearances": 1291533,
    "wins": 642671,
    "losses": 648862,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 63.4,
        "games": 7463
      },
      {
        "name": "Primarina",
        "winRate": 59.2,
        "games": 16108
      },
      {
        "name": "Basculegion",
        "winRate": 54.7,
        "games": 34922
      },
      {
        "name": "Metagross",
        "winRate": 53.7,
        "games": 8760
      },
      {
        "name": "Gliscor",
        "winRate": 53,
        "games": 17800
      }
    ],
    "bestSets": []
  },
  "952-mega": {
    "id": 952,
    "name": "Mega Scovillain",
    "isMega": true,
    "elo": 15006,
    "winRate": 50.3,
    "appearances": 658215,
    "wins": 330882,
    "losses": 327333,
    "bestPartners": [
      {
        "name": "Aggron",
        "winRate": 53.5,
        "games": 93971
      },
      {
        "name": "Gyarados",
        "winRate": 53.4,
        "games": 61319
      },
      {
        "name": "Klefki",
        "winRate": 52.9,
        "games": 96446
      },
      {
        "name": "Krookodile",
        "winRate": 52.9,
        "games": 96239
      },
      {
        "name": "Archaludon",
        "winRate": 51.5,
        "games": 213866
      }
    ],
    "bestSets": []
  },
  "302-mega": {
    "id": 302,
    "name": "Mega Sableye",
    "isMega": true,
    "elo": 15006,
    "winRate": 51,
    "appearances": 812607,
    "wins": 414797,
    "losses": 397810,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 64.2,
        "games": 170998
      },
      {
        "name": "Clefable",
        "winRate": 64.2,
        "games": 170998
      },
      {
        "name": "Charizard",
        "winRate": 57,
        "games": 314229
      },
      {
        "name": "Venusaur",
        "winRate": 56,
        "games": 291474
      },
      {
        "name": "Krookodile",
        "winRate": 53.4,
        "games": 526011
      }
    ],
    "bestSets": []
  },
  "530-mega": {
    "id": 530,
    "name": "Mega Excadrill",
    "isMega": true,
    "elo": 15003,
    "winRate": 50.6,
    "appearances": 654413,
    "wins": 331002,
    "losses": 323411,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 53.7,
        "games": 104604
      },
      {
        "name": "Azumarill",
        "winRate": 52.4,
        "games": 134899
      },
      {
        "name": "Blastoise",
        "winRate": 52,
        "games": 115095
      },
      {
        "name": "Dragapult",
        "winRate": 52,
        "games": 90701
      },
      {
        "name": "Tatsugiri",
        "winRate": 51.6,
        "games": 45207
      }
    ],
    "bestSets": []
  },
  "658-mega": {
    "id": 658,
    "name": "Mega Greninja",
    "isMega": true,
    "elo": 15003,
    "winRate": 50.9,
    "appearances": 667680,
    "wins": 339614,
    "losses": 328066,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 57.8,
        "games": 24102
      },
      {
        "name": "Decidueye",
        "winRate": 55.6,
        "games": 32991
      },
      {
        "name": "Dragapult",
        "winRate": 54.4,
        "games": 26026
      },
      {
        "name": "Rotom",
        "winRate": 51.9,
        "games": 44845
      },
      {
        "name": "Froslass",
        "winRate": 51.9,
        "games": 44663
      }
    ],
    "bestSets": []
  },
  "71-mega": {
    "id": 71,
    "name": "Mega Victreebel",
    "isMega": true,
    "elo": 15002,
    "winRate": 49.8,
    "appearances": 658983,
    "wins": 328395,
    "losses": 330588,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 51.3,
        "games": 73119
      },
      {
        "name": "Scizor",
        "winRate": 51,
        "games": 90700
      },
      {
        "name": "Milotic",
        "winRate": 51,
        "games": 45409
      },
      {
        "name": "Feraligatr",
        "winRate": 51,
        "games": 36893
      },
      {
        "name": "Rhyperior",
        "winRate": 51,
        "games": 45771
      }
    ],
    "bestSets": []
  },
  "970-mega": {
    "id": 970,
    "name": "Mega Glimmora",
    "isMega": true,
    "elo": 14999,
    "winRate": 49.2,
    "appearances": 663222,
    "wins": 326599,
    "losses": 336623,
    "bestPartners": [
      {
        "name": "Mow Rotom",
        "winRate": 50.7,
        "games": 93495
      },
      {
        "name": "Abomasnow",
        "winRate": 50.6,
        "games": 37720
      },
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 130435
      },
      {
        "name": "Empoleon",
        "winRate": 50.5,
        "games": 139622
      },
      {
        "name": "Pelipper",
        "winRate": 50.5,
        "games": 46971
      }
    ],
    "bestSets": []
  },
  "65-mega": {
    "id": 65,
    "name": "Mega Alakazam",
    "isMega": true,
    "elo": 14998,
    "winRate": 50,
    "appearances": 662050,
    "wins": 330745,
    "losses": 331305,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 57.2,
        "games": 16502
      },
      {
        "name": "Greninja",
        "winRate": 52.2,
        "games": 99617
      },
      {
        "name": "Azumarill",
        "winRate": 51.4,
        "games": 153096
      },
      {
        "name": "Sneasler",
        "winRate": 51.2,
        "games": 118271
      },
      {
        "name": "Heracross",
        "winRate": 51,
        "games": 119967
      }
    ],
    "bestSets": []
  },
  "26-mega-x": {
    "id": 26,
    "name": "Mega Raichu X",
    "isMega": true,
    "elo": 14998,
    "winRate": 49.9,
    "appearances": 670508,
    "wins": 334689,
    "losses": 335819,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.7,
        "games": 75545
      },
      {
        "name": "Sinistcha",
        "winRate": 50.6,
        "games": 65579
      },
      {
        "name": "Skarmory",
        "winRate": 50.6,
        "games": 9442
      },
      {
        "name": "Hawlucha",
        "winRate": 50.5,
        "games": 56058
      },
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 64986
      }
    ],
    "bestSets": []
  },
  "678-mega": {
    "id": 678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 14998,
    "winRate": 50.1,
    "appearances": 656009,
    "wins": 328800,
    "losses": 327209,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 55.4,
        "games": 40751
      },
      {
        "name": "Hydreigon",
        "winRate": 53.7,
        "games": 67911
      },
      {
        "name": "Lucario",
        "winRate": 53.3,
        "games": 95147
      },
      {
        "name": "Azumarill",
        "winRate": 53,
        "games": 123977
      },
      {
        "name": "Greninja",
        "winRate": 52.4,
        "games": 133941
      }
    ],
    "bestSets": []
  },
  "670-mega": {
    "id": 670,
    "name": "Mega Floette",
    "isMega": true,
    "elo": 14997,
    "winRate": 50.1,
    "appearances": 839494,
    "wins": 420804,
    "losses": 418690,
    "bestPartners": [
      {
        "name": "Metagross",
        "winRate": 55.2,
        "games": 34297
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 54.7,
        "games": 8402
      },
      {
        "name": "Gyarados",
        "winRate": 54.6,
        "games": 25707
      },
      {
        "name": "Basculegion",
        "winRate": 54.6,
        "games": 25521
      },
      {
        "name": "Archaludon",
        "winRate": 54.5,
        "games": 282153
      }
    ],
    "bestSets": []
  },
  "448-mega-z": {
    "id": 448,
    "name": "Mega Lucario Z",
    "isMega": true,
    "elo": 14997,
    "winRate": 49.8,
    "appearances": 655823,
    "wins": 326565,
    "losses": 329258,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 52.1,
        "games": 71937
      },
      {
        "name": "Slowbro",
        "winRate": 51.9,
        "games": 27156
      },
      {
        "name": "Gliscor",
        "winRate": 51.8,
        "games": 72323
      },
      {
        "name": "Starmie",
        "winRate": 51.3,
        "games": 55506
      },
      {
        "name": "Charizard",
        "winRate": 51.1,
        "games": 55180
      }
    ],
    "bestSets": []
  },
  "428-mega": {
    "id": 428,
    "name": "Mega Lopunny",
    "isMega": true,
    "elo": 14997,
    "winRate": 50.3,
    "appearances": 661017,
    "wins": 332446,
    "losses": 328571,
    "bestPartners": [
      {
        "name": "Rotom",
        "winRate": 52.9,
        "games": 44789
      },
      {
        "name": "Polteageist",
        "winRate": 52.2,
        "games": 81013
      },
      {
        "name": "Froslass",
        "winRate": 51.9,
        "games": 117771
      },
      {
        "name": "Gardevoir",
        "winRate": 51.4,
        "games": 110005
      },
      {
        "name": "Dragapult",
        "winRate": 51.2,
        "games": 82674
      }
    ],
    "bestSets": []
  },
  "36-mega": {
    "id": 36,
    "name": "Mega Clefable",
    "isMega": true,
    "elo": 14996,
    "winRate": 48.6,
    "appearances": 648211,
    "wins": 314812,
    "losses": 333399,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 51,
        "games": 89572
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 146746
      },
      {
        "name": "Krookodile",
        "winRate": 50.5,
        "games": 91769
      },
      {
        "name": "Metagross",
        "winRate": 50.3,
        "games": 109498
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 100159
      }
    ],
    "bestSets": []
  },
  "227-mega": {
    "id": 227,
    "name": "Mega Skarmory",
    "isMega": true,
    "elo": 14996,
    "winRate": 50.7,
    "appearances": 787254,
    "wins": 398817,
    "losses": 388437,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 57.2,
        "games": 40408
      },
      {
        "name": "Heat Rotom",
        "winRate": 54.4,
        "games": 59633
      },
      {
        "name": "Pawmot",
        "winRate": 53.2,
        "games": 61839
      },
      {
        "name": "Tatsugiri",
        "winRate": 52.9,
        "games": 62695
      },
      {
        "name": "Arcanine",
        "winRate": 52,
        "games": 18013
      }
    ],
    "bestSets": []
  },
  "978-mega": {
    "id": 978,
    "name": "Mega Tatsugiri",
    "isMega": true,
    "elo": 14996,
    "winRate": 49.7,
    "appearances": 674731,
    "wins": 335180,
    "losses": 339551,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 47503
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.6,
        "games": 19247
      },
      {
        "name": "Metagross",
        "winRate": 50.4,
        "games": 85100
      },
      {
        "name": "Klefki",
        "winRate": 50.4,
        "games": 141968
      },
      {
        "name": "Aegislash",
        "winRate": 50.4,
        "games": 65426
      }
    ],
    "bestSets": []
  },
  "445-mega": {
    "id": 445,
    "name": "Mega Garchomp",
    "isMega": true,
    "elo": 14995,
    "winRate": 51.3,
    "appearances": 865851,
    "wins": 443977,
    "losses": 421874,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 57.8,
        "games": 103716
      },
      {
        "name": "Primarina",
        "winRate": 57,
        "games": 98376
      },
      {
        "name": "Corviknight",
        "winRate": 55.7,
        "games": 75612
      },
      {
        "name": "Aggron",
        "winRate": 55.4,
        "games": 66836
      },
      {
        "name": "Klefki",
        "winRate": 54.8,
        "games": 59760
      }
    ],
    "bestSets": []
  },
  "6-mega-x": {
    "id": 6,
    "name": "Mega Charizard X",
    "isMega": true,
    "elo": 14991,
    "winRate": 49.7,
    "appearances": 640827,
    "wins": 318245,
    "losses": 322582,
    "bestPartners": [
      {
        "name": "Venusaur",
        "winRate": 55.3,
        "games": 75539
      },
      {
        "name": "Ursaluna",
        "winRate": 55,
        "games": 108735
      },
      {
        "name": "Sandaconda",
        "winRate": 53.8,
        "games": 87168
      },
      {
        "name": "Whimsicott",
        "winRate": 53.4,
        "games": 43324
      },
      {
        "name": "Hydreigon",
        "winRate": 53.1,
        "games": 96793
      }
    ],
    "bestSets": []
  },
  "149-mega": {
    "id": 149,
    "name": "Mega Dragonite",
    "isMega": true,
    "elo": 14990,
    "winRate": 48.8,
    "appearances": 2449158,
    "wins": 1195261,
    "losses": 1253897,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 51.9,
        "games": 135965
      },
      {
        "name": "Lucario",
        "winRate": 51.4,
        "games": 181110
      },
      {
        "name": "Dragapult",
        "winRate": 51.4,
        "games": 223924
      },
      {
        "name": "Emboar",
        "winRate": 50.8,
        "games": 92572
      },
      {
        "name": "Orthworm",
        "winRate": 50.8,
        "games": 18569
      }
    ],
    "bestSets": []
  },
  "26-mega-y": {
    "id": 26,
    "name": "Mega Raichu Y",
    "isMega": true,
    "elo": 14989,
    "winRate": 49.4,
    "appearances": 666981,
    "wins": 329608,
    "losses": 337373,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 50.8,
        "games": 56633
      },
      {
        "name": "Pinsir",
        "winRate": 50.5,
        "games": 9442
      },
      {
        "name": "Araquanid",
        "winRate": 50.4,
        "games": 28292
      },
      {
        "name": "Sinistcha",
        "winRate": 50.4,
        "games": 65840
      },
      {
        "name": "Blastoise",
        "winRate": 50.4,
        "games": 47753
      }
    ],
    "bestSets": []
  },
  "359-mega": {
    "id": 359,
    "name": "Mega Absol",
    "isMega": true,
    "elo": 14989,
    "winRate": 47.2,
    "appearances": 638631,
    "wins": 301574,
    "losses": 337057,
    "bestPartners": [
      {
        "name": "Rotom",
        "winRate": 50.4,
        "games": 47048
      },
      {
        "name": "Dragapult",
        "winRate": 50.2,
        "games": 74931
      },
      {
        "name": "Ninetales",
        "winRate": 50,
        "games": 84209
      },
      {
        "name": "Charizard",
        "winRate": 49.9,
        "games": 74207
      },
      {
        "name": "Sneasler",
        "winRate": 49.9,
        "games": 55070
      }
    ],
    "bestSets": []
  },
  "229-mega": {
    "id": 229,
    "name": "Mega Houndoom",
    "isMega": true,
    "elo": 14989,
    "winRate": 49.5,
    "appearances": 640256,
    "wins": 316861,
    "losses": 323395,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 54.5,
        "games": 67967
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 53.3,
        "games": 68975
      },
      {
        "name": "Fan Rotom",
        "winRate": 52.4,
        "games": 60886
      },
      {
        "name": "Altaria",
        "winRate": 52.1,
        "games": 34782
      },
      {
        "name": "Hawlucha",
        "winRate": 51.9,
        "games": 53801
      }
    ],
    "bestSets": []
  },
  "460-mega": {
    "id": 460,
    "name": "Mega Abomasnow",
    "isMega": true,
    "elo": 14986,
    "winRate": 49.4,
    "appearances": 875703,
    "wins": 432281,
    "losses": 443422,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 52.7,
        "games": 17976
      },
      {
        "name": "Dragapult",
        "winRate": 51.7,
        "games": 55535
      },
      {
        "name": "Palafin",
        "winRate": 51.4,
        "games": 37325
      },
      {
        "name": "Garchomp",
        "winRate": 51.2,
        "games": 74095
      },
      {
        "name": "Basculegion",
        "winRate": 51.2,
        "games": 74398
      }
    ],
    "bestSets": []
  },
  "334-mega": {
    "id": 334,
    "name": "Mega Altaria",
    "isMega": true,
    "elo": 14986,
    "winRate": 49.5,
    "appearances": 881354,
    "wins": 435990,
    "losses": 445364,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 53.2,
        "games": 8788
      },
      {
        "name": "Lucario",
        "winRate": 52.9,
        "games": 17677
      },
      {
        "name": "Metagross",
        "winRate": 52.6,
        "games": 26912
      },
      {
        "name": "Orthworm",
        "winRate": 52.3,
        "games": 26996
      },
      {
        "name": "Empoleon",
        "winRate": 51.8,
        "games": 54695
      }
    ],
    "bestSets": []
  },
  "500-mega": {
    "id": 500,
    "name": "Mega Emboar",
    "isMega": true,
    "elo": 14981,
    "winRate": 47.4,
    "appearances": 628249,
    "wins": 297749,
    "losses": 330500,
    "bestPartners": [
      {
        "name": "Decidueye",
        "winRate": 52,
        "games": 45282
      },
      {
        "name": "Kingambit",
        "winRate": 51.7,
        "games": 55030
      },
      {
        "name": "Metagross",
        "winRate": 51.4,
        "games": 73391
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 296473
      },
      {
        "name": "Noivern",
        "winRate": 50.8,
        "games": 38003
      }
    ],
    "bestSets": []
  },
  "181-mega": {
    "id": 181,
    "name": "Mega Ampharos",
    "isMega": true,
    "elo": 14978,
    "winRate": 49.2,
    "appearances": 656236,
    "wins": 323152,
    "losses": 333084,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 102015
      },
      {
        "name": "Palafin",
        "winRate": 50.4,
        "games": 56215
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.4,
        "games": 74065
      },
      {
        "name": "Pelipper",
        "winRate": 50.2,
        "games": 55758
      },
      {
        "name": "Araquanid",
        "winRate": 50.2,
        "games": 74792
      }
    ],
    "bestSets": []
  },
  "359-mega-z": {
    "id": 359,
    "name": "Mega Absol Z",
    "isMega": true,
    "elo": 14972,
    "winRate": 46.3,
    "appearances": 621584,
    "wins": 288079,
    "losses": 333505,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.4,
        "games": 118526
      },
      {
        "name": "Hawlucha",
        "winRate": 50.4,
        "games": 52153
      },
      {
        "name": "Ninetales",
        "winRate": 50.4,
        "games": 88535
      },
      {
        "name": "Rotom",
        "winRate": 50.3,
        "games": 66446
      },
      {
        "name": "Scizor",
        "winRate": 50,
        "games": 93742
      }
    ],
    "bestSets": []
  },
  "306-mega": {
    "id": 306,
    "name": "Mega Aggron",
    "isMega": true,
    "elo": 14970,
    "winRate": 47.7,
    "appearances": 642871,
    "wins": 306689,
    "losses": 336182,
    "bestPartners": [
      {
        "name": "Serperior",
        "winRate": 50.3,
        "games": 18327
      },
      {
        "name": "Emolga",
        "winRate": 50.2,
        "games": 27854
      },
      {
        "name": "Charizard",
        "winRate": 50.2,
        "games": 17944
      },
      {
        "name": "Appletun",
        "winRate": 50,
        "games": 37438
      },
      {
        "name": "Fan Rotom",
        "winRate": 49.8,
        "games": 55409
      }
    ],
    "bestSets": []
  },
  "780-mega": {
    "id": 780,
    "name": "Mega Drampa",
    "isMega": true,
    "elo": 14968,
    "winRate": 47,
    "appearances": 632833,
    "wins": 297735,
    "losses": 335098,
    "bestPartners": [
      {
        "name": "Starmie",
        "winRate": 51.2,
        "games": 90800
      },
      {
        "name": "Volcarona",
        "winRate": 51.1,
        "games": 45861
      },
      {
        "name": "Primarina",
        "winRate": 50.9,
        "games": 99779
      },
      {
        "name": "Aegislash",
        "winRate": 50.1,
        "games": 70114
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 49.9,
        "games": 73952
      }
    ],
    "bestSets": []
  },
  "94-mega": {
    "id": 94,
    "name": "Mega Gengar",
    "isMega": true,
    "elo": 14961,
    "winRate": 44.4,
    "appearances": 793330,
    "wins": 352320,
    "losses": 441010,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 50.3,
        "games": 129692
      },
      {
        "name": "Weavile",
        "winRate": 50.3,
        "games": 166367
      },
      {
        "name": "Hydreigon",
        "winRate": 50.2,
        "games": 118930
      },
      {
        "name": "Morpeko",
        "winRate": 50.2,
        "games": 27803
      },
      {
        "name": "Farigiraf",
        "winRate": 50,
        "games": 92511
      }
    ],
    "bestSets": []
  },
  "475-mega": {
    "id": 475,
    "name": "Mega Gallade",
    "isMega": true,
    "elo": 14960,
    "winRate": 46.7,
    "appearances": 627833,
    "wins": 293241,
    "losses": 334592,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 56203
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 64853
      },
      {
        "name": "Empoleon",
        "winRate": 50.3,
        "games": 122416
      },
      {
        "name": "Tinkaton",
        "winRate": 50.1,
        "games": 84481
      },
      {
        "name": "Excadrill",
        "winRate": 49.9,
        "games": 109703
      }
    ],
    "bestSets": []
  },
  "531-mega": {
    "id": 531,
    "name": "Mega Audino",
    "isMega": true,
    "elo": 14958,
    "winRate": 46.1,
    "appearances": 612713,
    "wins": 282209,
    "losses": 330504,
    "bestPartners": [
      {
        "name": "Slowking",
        "winRate": 50.4,
        "games": 17842
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 28420
      },
      {
        "name": "Mimikyu",
        "winRate": 50.3,
        "games": 27184
      },
      {
        "name": "Spiritomb",
        "winRate": 50.3,
        "games": 19081
      },
      {
        "name": "Sableye",
        "winRate": 50,
        "games": 36909
      }
    ],
    "bestSets": []
  },
  "740-mega": {
    "id": 740,
    "name": "Mega Crabominable",
    "isMega": true,
    "elo": 14955,
    "winRate": 45.6,
    "appearances": 616497,
    "wins": 281019,
    "losses": 335478,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 55912
      },
      {
        "name": "Dragapult",
        "winRate": 50.1,
        "games": 27394
      },
      {
        "name": "Espeon",
        "winRate": 49.7,
        "games": 73173
      },
      {
        "name": "Emolga",
        "winRate": 49.7,
        "games": 9507
      },
      {
        "name": "Alolan Raichu",
        "winRate": 49.6,
        "games": 64178
      }
    ],
    "bestSets": []
  },
  "15-mega": {
    "id": 15,
    "name": "Mega Beedrill",
    "isMega": true,
    "elo": 14952,
    "winRate": 46.3,
    "appearances": 626866,
    "wins": 290009,
    "losses": 336857,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 49.5,
        "games": 158493
      },
      {
        "name": "Lycanroc",
        "winRate": 49.3,
        "games": 47370
      },
      {
        "name": "Morpeko",
        "winRate": 49.1,
        "games": 46640
      },
      {
        "name": "Excadrill",
        "winRate": 48.9,
        "games": 92237
      },
      {
        "name": "Tyranitar",
        "winRate": 48.9,
        "games": 110856
      }
    ],
    "bestSets": []
  }
};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = [
  {
    "pokemon1": "Rhyperior",
    "pokemon2": "Sandaconda",
    "winRate": 83.8,
    "games": 5355
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Sandaconda",
    "winRate": 83.8,
    "games": 5355
  },
  {
    "pokemon1": "Typhlosion",
    "pokemon2": "Vanilluxe",
    "winRate": 80.3,
    "games": 5738
  },
  {
    "pokemon1": "Pawmot",
    "pokemon2": "Sneasler",
    "winRate": 80.3,
    "games": 5738
  },
  {
    "pokemon1": "Dragapult",
    "pokemon2": "Pawmot",
    "winRate": 80.3,
    "games": 5738
  },
  {
    "pokemon1": "Dragapult",
    "pokemon2": "Typhlosion",
    "winRate": 80.3,
    "games": 5738
  },
  {
    "pokemon1": "Garchomp",
    "pokemon2": "Mega Charizard Y",
    "winRate": 79.8,
    "games": 11274
  },
  {
    "pokemon1": "Mega Charizard Y",
    "pokemon2": "Tsareena",
    "winRate": 76.2,
    "games": 5919
  },
  {
    "pokemon1": "Kommo-o",
    "pokemon2": "Tsareena",
    "winRate": 76.2,
    "games": 5919
  },
  {
    "pokemon1": "Hisuian Samurott",
    "pokemon2": "Ursaluna",
    "winRate": 76.1,
    "games": 5986
  },
  {
    "pokemon1": "Garchomp",
    "pokemon2": "Hisuian Samurott",
    "winRate": 76.1,
    "games": 5986
  },
  {
    "pokemon1": "Hisuian Samurott",
    "pokemon2": "Incineroar",
    "winRate": 76.1,
    "games": 5986
  },
  {
    "pokemon1": "Mow Rotom",
    "pokemon2": "Serperior",
    "winRate": 75.2,
    "games": 12457
  },
  {
    "pokemon1": "Mega Garchomp Z",
    "pokemon2": "Metagross",
    "winRate": 74.7,
    "games": 5999
  },
  {
    "pokemon1": "Mow Rotom",
    "pokemon2": "Venusaur",
    "winRate": 74.7,
    "games": 6087
  },
  {
    "pokemon1": "Arcanine",
    "pokemon2": "Whimsicott",
    "winRate": 74.4,
    "games": 6015
  },
  {
    "pokemon1": "Pawmot",
    "pokemon2": "Vanilluxe",
    "winRate": 73.7,
    "games": 12417
  },
  {
    "pokemon1": "Sneasler",
    "pokemon2": "Vanilluxe",
    "winRate": 73.7,
    "games": 12417
  },
  {
    "pokemon1": "Pawmot",
    "pokemon2": "Typhlosion",
    "winRate": 73.7,
    "games": 12417
  },
  {
    "pokemon1": "Sneasler",
    "pokemon2": "Typhlosion",
    "winRate": 73.7,
    "games": 12417
  },
  {
    "pokemon1": "Garchomp",
    "pokemon2": "Typhlosion",
    "winRate": 73.7,
    "games": 12417
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Mega Blastoise",
    "winRate": 72.5,
    "games": 100069
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Serperior",
    "winRate": 72.5,
    "games": 12778
  },
  {
    "pokemon1": "Meowscarada",
    "pokemon2": "Victreebel",
    "winRate": 72.4,
    "games": 12438
  },
  {
    "pokemon1": "Hisuian Samurott",
    "pokemon2": "Hisuian Typhlosion",
    "winRate": 72.3,
    "games": 6214
  },
  {
    "pokemon1": "Greninja",
    "pokemon2": "Hisuian Typhlosion",
    "winRate": 72.3,
    "games": 6214
  },
  {
    "pokemon1": "Greninja",
    "pokemon2": "Morpeko",
    "winRate": 72.3,
    "games": 6214
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Metagross",
    "winRate": 72.1,
    "games": 6479
  },
  {
    "pokemon1": "Metagross",
    "pokemon2": "Skarmory",
    "winRate": 72.1,
    "games": 6479
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Heat Rotom",
    "winRate": 72.1,
    "games": 6479
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Skarmory",
    "winRate": 72.1,
    "games": 6479
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Skarmory",
    "winRate": 72.1,
    "games": 6479
  },
  {
    "pokemon1": "Hisuian Samurott",
    "pokemon2": "Mega Froslass",
    "winRate": 71.9,
    "games": 12703
  },
  {
    "pokemon1": "Venusaur",
    "pokemon2": "Victreebel",
    "winRate": 71.3,
    "games": 6425
  },
  {
    "pokemon1": "Ursaluna",
    "pokemon2": "Whimsicott",
    "winRate": 71,
    "games": 12898
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Blastoise",
    "winRate": 70.9,
    "games": 44503
  },
  {
    "pokemon1": "Palafin",
    "pokemon2": "Primarina",
    "winRate": 70.7,
    "games": 12639
  },
  {
    "pokemon1": "Mega Froslass",
    "pokemon2": "Ursaluna",
    "winRate": 70.7,
    "games": 25064
  },
  {
    "pokemon1": "Arcanine",
    "pokemon2": "Meowscarada",
    "winRate": 70.7,
    "games": 12865
  },
  {
    "pokemon1": "Arcanine",
    "pokemon2": "Serperior",
    "winRate": 70.7,
    "games": 19538
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Serperior",
    "winRate": 70.6,
    "games": 64700
  },
  {
    "pokemon1": "Hydreigon",
    "pokemon2": "Ursaluna",
    "winRate": 70.6,
    "games": 12345
  },
  {
    "pokemon1": "Mega Blastoise",
    "pokemon2": "Meowscarada",
    "winRate": 70.5,
    "games": 64333
  },
  {
    "pokemon1": "Greninja",
    "pokemon2": "Primarina",
    "winRate": 70.4,
    "games": 12836
  },
  {
    "pokemon1": "Decidueye",
    "pokemon2": "Mega Blastoise",
    "winRate": 70.3,
    "games": 44786
  },
  {
    "pokemon1": "Decidueye",
    "pokemon2": "Heat Rotom",
    "winRate": 70.3,
    "games": 19070
  },
  {
    "pokemon1": "Tsareena",
    "pokemon2": "Victreebel",
    "winRate": 70.3,
    "games": 6379
  },
  {
    "pokemon1": "Greninja",
    "pokemon2": "Hisuian Samurott",
    "winRate": 70.2,
    "games": 12703
  },
  {
    "pokemon1": "Meowscarada",
    "pokemon2": "Tsareena",
    "winRate": 70.1,
    "games": 25565
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Mega Garchomp Z",
    "winRate": 70,
    "games": 13260
  }
];

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = [
  {
    "name": "custom",
    "elo": 228071,
    "winRate": 52.7,
    "wins": 6700902,
    "losses": 6021278
  },
  {
    "name": "Mega Blastoise",
    "elo": 47874,
    "winRate": 63.7,
    "wins": 329379,
    "losses": 188072
  },
  {
    "name": "Mega Froslass",
    "elo": 26225,
    "winRate": 56.3,
    "wins": 335162,
    "losses": 259772
  },
  {
    "name": "Slowbro Trick Room",
    "elo": 24636,
    "winRate": 56.2,
    "wins": 320716,
    "losses": 249956
  },
  {
    "name": "Meganium Base",
    "elo": 23099,
    "winRate": 58.6,
    "wins": 221594,
    "losses": 156473
  },
  {
    "name": "Mega Garchomp",
    "elo": 21976,
    "winRate": 52.4,
    "wins": 665713,
    "losses": 603604
  },
  {
    "name": "Chesnaught Base",
    "elo": 20563,
    "winRate": 57.4,
    "wins": 222392,
    "losses": 164860
  },
  {
    "name": "Hard Trick Room",
    "elo": 19710,
    "winRate": 54.8,
    "wins": 324566,
    "losses": 267861
  },
  {
    "name": "Mega Feraligatr",
    "elo": 19007,
    "winRate": 54.4,
    "wins": 335132,
    "losses": 281096
  },
  {
    "name": "Body Press",
    "elo": 17089,
    "winRate": 63.7,
    "wins": 109246,
    "losses": 62318
  },
  {
    "name": "Mega Chesnaught",
    "elo": 14218,
    "winRate": 53.1,
    "wins": 334758,
    "losses": 296144
  },
  {
    "name": "Tailwind",
    "elo": 13862,
    "winRate": 50.3,
    "wins": 2964998,
    "losses": 2927930
  },
  {
    "name": "Kleavor Build",
    "elo": 13714,
    "winRate": 54.5,
    "wins": 222786,
    "losses": 185655
  },
  {
    "name": "Pinsir Base",
    "elo": 13686,
    "winRate": 54.5,
    "wins": 224685,
    "losses": 187785
  },
  {
    "name": "Mega Meganium",
    "elo": 13623,
    "winRate": 52.9,
    "wins": 333466,
    "losses": 296822
  },
  {
    "name": "Mega Venusaur",
    "elo": 12677,
    "winRate": 52.9,
    "wins": 330858,
    "losses": 294986
  },
  {
    "name": "Floette Base",
    "elo": 12394,
    "winRate": 53.9,
    "wins": 225124,
    "losses": 192342
  },
  {
    "name": "Leafeon Build",
    "elo": 11720,
    "winRate": 58.1,
    "wins": 83143,
    "losses": 60022
  },
  {
    "name": "Mega Floette",
    "elo": 9944,
    "winRate": 52,
    "wins": 332413,
    "losses": 306953
  },
  {
    "name": "Clawitzer Build",
    "elo": 9580,
    "winRate": 52,
    "wins": 337129,
    "losses": 311650
  },
  {
    "name": "Mega Charizard",
    "elo": 9472,
    "winRate": 51,
    "wins": 651984,
    "losses": 626942
  },
  {
    "name": "Mega Pinsir",
    "elo": 9332,
    "winRate": 51.9,
    "wins": 326630,
    "losses": 302921
  },
  {
    "name": "Hyper Offense",
    "elo": 8676,
    "winRate": 50.5,
    "wins": 1097676,
    "losses": 1076088
  },
  {
    "name": "Mega Aerodactyl",
    "elo": 8263,
    "winRate": 51.6,
    "wins": 337527,
    "losses": 317000
  },
  {
    "name": "Mega Slowbro",
    "elo": 7885,
    "winRate": 51.5,
    "wins": 337051,
    "losses": 317579
  },
  {
    "name": "Mega Delphox",
    "elo": 7708,
    "winRate": 51.5,
    "wins": 335300,
    "losses": 316191
  },
  {
    "name": "Mega Starmie",
    "elo": 6959,
    "winRate": 51.3,
    "wins": 333344,
    "losses": 316325
  },
  {
    "name": "Aerodactyl Base",
    "elo": 6383,
    "winRate": 51.7,
    "wins": 227430,
    "losses": 212770
  },
  {
    "name": "Alcremie Build",
    "elo": 6034,
    "winRate": 51.1,
    "wins": 320763,
    "losses": 307475
  },
  {
    "name": "Mega Tyranitar",
    "elo": 5740,
    "winRate": 51,
    "wins": 331094,
    "losses": 317971
  },
  {
    "name": "Sun Trick Room",
    "elo": 5686,
    "winRate": 50.2,
    "wins": 1876845,
    "losses": 1864220
  },
  {
    "name": "Hisuian Typhlosion Build",
    "elo": 5643,
    "winRate": 51,
    "wins": 330940,
    "losses": 317706
  },
  {
    "name": "Mega Heracross",
    "elo": 5603,
    "winRate": 51,
    "wins": 331401,
    "losses": 318570
  },
  {
    "name": "Standard",
    "elo": 5464,
    "winRate": 50.1,
    "wins": 3893562,
    "losses": 3881534
  },
  {
    "name": "Mega Greninja",
    "elo": 5284,
    "winRate": 50.9,
    "wins": 339614,
    "losses": 328066
  },
  {
    "name": "Delphox Base",
    "elo": 4933,
    "winRate": 51.2,
    "wins": 227005,
    "losses": 216679
  },
  {
    "name": "Samurott Build",
    "elo": 4809,
    "winRate": 51.3,
    "wins": 127792,
    "losses": 121274
  },
  {
    "name": "Mow Rotom Build",
    "elo": 4586,
    "winRate": 51.2,
    "wins": 88080,
    "losses": 83968
  },
  {
    "name": "Mega Skarmory",
    "elo": 4546,
    "winRate": 50.7,
    "wins": 338045,
    "losses": 328629
  },
  {
    "name": "Vanilluxe Build",
    "elo": 4513,
    "winRate": 50.7,
    "wins": 331801,
    "losses": 322142
  },
  {
    "name": "Sun",
    "elo": 4466,
    "winRate": 50.3,
    "wins": 879613,
    "losses": 870709
  },
  {
    "name": "Mudsdale Build",
    "elo": 4029,
    "winRate": 50.8,
    "wins": 251147,
    "losses": 243681
  },
  {
    "name": "Bulky Offense",
    "elo": 3990,
    "winRate": 50.3,
    "wins": 552524,
    "losses": 545063
  },
  {
    "name": "Mega Excadrill",
    "elo": 3935,
    "winRate": 50.6,
    "wins": 331002,
    "losses": 323411
  },
  {
    "name": "Golurk Build",
    "elo": 3880,
    "winRate": 50.7,
    "wins": 261263,
    "losses": 253999
  },
  {
    "name": "Scovillain Base",
    "elo": 3859,
    "winRate": 50.8,
    "wins": 227755,
    "losses": 220685
  },
  {
    "name": "Mega Hawlucha",
    "elo": 3812,
    "winRate": 50.5,
    "wins": 339127,
    "losses": 332061
  },
  {
    "name": "Greninja Base",
    "elo": 3797,
    "winRate": 50.8,
    "wins": 231776,
    "losses": 224882
  },
  {
    "name": "Feraligatr Base",
    "elo": 3768,
    "winRate": 50.8,
    "wins": 225058,
    "losses": 218257
  },
  {
    "name": "Hawlucha Base",
    "elo": 3735,
    "winRate": 50.7,
    "wins": 230377,
    "losses": 223669
  }
];

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = [
  {
    "name": "Aromatherapy",
    "winRate": 58.5,
    "appearances": 189602
  },
  {
    "name": "Stone Axe",
    "winRate": 55.6,
    "appearances": 600196
  },
  {
    "name": "Electro Shot",
    "winRate": 54.4,
    "appearances": 8990867
  },
  {
    "name": "Water Pulse",
    "winRate": 53.4,
    "appearances": 3450861
  },
  {
    "name": "Mortal Spin",
    "winRate": 52.7,
    "appearances": 438772
  },
  {
    "name": "Dire Claw",
    "winRate": 52.6,
    "appearances": 5268205
  },
  {
    "name": "Leech Seed",
    "winRate": 52.5,
    "appearances": 1478105
  },
  {
    "name": "Spiky Shield",
    "winRate": 52.5,
    "appearances": 996451
  },
  {
    "name": "Giga Drain",
    "winRate": 52.3,
    "appearances": 3057936
  },
  {
    "name": "Pin Missile",
    "winRate": 52,
    "appearances": 852523
  },
  {
    "name": "Aura Sphere",
    "winRate": 52,
    "appearances": 7247061
  },
  {
    "name": "Volt Switch",
    "winRate": 51.9,
    "appearances": 11590726
  },
  {
    "name": "Calm Mind",
    "winRate": 51.8,
    "appearances": 426962
  },
  {
    "name": "Glare",
    "winRate": 51.8,
    "appearances": 2540950
  },
  {
    "name": "Body Press",
    "winRate": 51.5,
    "appearances": 18008278
  },
  {
    "name": "Sleep Powder",
    "winRate": 51.5,
    "appearances": 1847931
  },
  {
    "name": "Facade",
    "winRate": 51.5,
    "appearances": 4878214
  },
  {
    "name": "Flash Cannon",
    "winRate": 51.4,
    "appearances": 46260197
  },
  {
    "name": "Leaf Storm",
    "winRate": 51.4,
    "appearances": 19642347
  },
  {
    "name": "High Jump Kick",
    "winRate": 51.3,
    "appearances": 2629343
  },
  {
    "name": "Power Whip",
    "winRate": 51.3,
    "appearances": 2856153
  },
  {
    "name": "Matcha Gotcha",
    "winRate": 51.3,
    "appearances": 2674862
  },
  {
    "name": "Mystical Fire",
    "winRate": 51.3,
    "appearances": 1498827
  },
  {
    "name": "Overheat",
    "winRate": 51.2,
    "appearances": 16746997
  },
  {
    "name": "Dual Wingbeat",
    "winRate": 51.2,
    "appearances": 1308548
  },
  {
    "name": "Arm Thrust",
    "winRate": 51.1,
    "appearances": 217559
  },
  {
    "name": "Decorate",
    "winRate": 51.1,
    "appearances": 628238
  },
  {
    "name": "Rock Blast",
    "winRate": 51.1,
    "appearances": 1509685
  },
  {
    "name": "Energy Ball",
    "winRate": 51.1,
    "appearances": 5710692
  },
  {
    "name": "Belly Drum",
    "winRate": 51.1,
    "appearances": 5144484
  },
  {
    "name": "Jet Punch",
    "winRate": 51,
    "appearances": 9316422
  },
  {
    "name": "Fire Fang",
    "winRate": 51,
    "appearances": 5620178
  },
  {
    "name": "Eruption",
    "winRate": 50.9,
    "appearances": 9656244
  },
  {
    "name": "Follow Me",
    "winRate": 50.9,
    "appearances": 19867299
  },
  {
    "name": "X-Scissor",
    "winRate": 50.9,
    "appearances": 2735795
  },
  {
    "name": "Icy Wind",
    "winRate": 50.8,
    "appearances": 27241723
  },
  {
    "name": "Hidden Power Ground",
    "winRate": 50.8,
    "appearances": 223295
  },
  {
    "name": "Earth Power",
    "winRate": 50.8,
    "appearances": 27753736
  },
  {
    "name": "Ice Beam",
    "winRate": 50.8,
    "appearances": 43741026
  },
  {
    "name": "Water Shuriken",
    "winRate": 50.8,
    "appearances": 227855
  },
  {
    "name": "Ceaseless Edge",
    "winRate": 50.7,
    "appearances": 1974056
  },
  {
    "name": "Razor Shell",
    "winRate": 50.7,
    "appearances": 1974056
  },
  {
    "name": "Scald",
    "winRate": 50.7,
    "appearances": 55366619
  },
  {
    "name": "Bug Bite",
    "winRate": 50.7,
    "appearances": 20263058
  },
  {
    "name": "Vacuum Wave",
    "winRate": 50.7,
    "appearances": 3805050
  },
  {
    "name": "Thunderbolt",
    "winRate": 50.7,
    "appearances": 25412190
  },
  {
    "name": "Beat Up",
    "winRate": 50.7,
    "appearances": 226299
  },
  {
    "name": "Wood Hammer",
    "winRate": 50.7,
    "appearances": 3149539
  },
  {
    "name": "Dragon Pulse",
    "winRate": 50.6,
    "appearances": 9535535
  },
  {
    "name": "Aqua Jet",
    "winRate": 50.6,
    "appearances": 7916907
  }
];

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = {
  "tier1": [
    "Mega Froslass",
    "Meganium",
    "Archaludon",
    "Mega Blastoise",
    "Victreebel",
    "Mega Scizor",
    "Sneasler",
    "Slowbro",
    "Empoleon",
    "Primarina",
    "Heat Rotom",
    "Mega Pinsir",
    "Mega Metagross",
    "Azumarill",
    "Crabominable",
    "Wash Rotom",
    "Mega Garchomp Z",
    "Gliscor"
  ],
  "tier2": [
    "Mega Charizard Y",
    "Blastoise",
    "Feraligatr",
    "Kleavor",
    "Kingambit",
    "Conkeldurr",
    "Mow Rotom",
    "Greninja",
    "Tsareena",
    "Mega Venusaur",
    "Lucario",
    "Venusaur",
    "Clefable",
    "Tatsugiri",
    "Palafin",
    "Dragapult",
    "Aerodactyl",
    "Mega Gyarados",
    "Garchomp",
    "Serperior",
    "Torkoal",
    "Hawlucha",
    "Milotic",
    "Aegislash",
    "Charizard",
    "Fan Rotom",
    "Drampa",
    "Rhyperior",
    "Tinkaton",
    "Dondozo",
    "Mega Heracross",
    "Alolan Ninetales",
    "Klefki",
    "Mega Tyranitar",
    "Mega Feraligatr",
    "Snorlax",
    "Kommo-o",
    "Mega Chandelure"
  ],
  "tier3": [
    "Decidueye",
    "Sinistcha",
    "Meowscarada",
    "Mega Hawlucha",
    "Tyranitar",
    "Gyarados",
    "Krookodile",
    "Whimsicott",
    "Mega Meganium",
    "Leafeon",
    "Excadrill",
    "Hatterene",
    "Mega Gardevoir",
    "Sylveon",
    "Mega Delphox",
    "Hisuian Samurott",
    "Rotom",
    "Dragonite",
    "Incineroar",
    "Politoed",
    "Gardevoir",
    "Hydreigon",
    "Ursaluna",
    "Vaporeon",
    "Chesnaught",
    "Mega Slowbro",
    "Metagross",
    "Farigiraf",
    "Altaria",
    "Infernape",
    "Floette",
    "Houndoom",
    "Sableye",
    "Mega Aerodactyl",
    "Vanilluxe",
    "Starmie",
    "Scizor",
    "Mega Chesnaught",
    "Sandaconda",
    "Gengar",
    "Mega Steelix",
    "Hisuian Typhlosion",
    "Froslass",
    "Clawitzer",
    "Basculegion",
    "Galarian Slowbro",
    "Alolan Raichu",
    "Mega Starmie",
    "Alcremie",
    "Talonflame",
    "Heracross",
    "Mega Kangaskhan",
    "Oranguru",
    "Mega Lucario",
    "Mega Scovillain",
    "Glaceon",
    "Glimmora",
    "Mega Sableye",
    "Arcanine",
    "Ceruledge",
    "Golurk",
    "Hydrapple",
    "Mega Excadrill",
    "Mega Greninja",
    "Garganacl",
    "Skarmory",
    "Pelipper",
    "Mega Victreebel"
  ],
  "dominantArchetypes": [
    "custom",
    "Mega Blastoise",
    "Mega Froslass",
    "Slowbro Trick Room",
    "Meganium Base"
  ],
  "underratedPokemon": [],
  "overratedPokemon": [
    "Mega Gengar",
    "Ditto",
    "Emolga",
    "Spiritomb",
    "Beedrill"
  ],
  "bestCores": [
    "Rhyperior + Sandaconda",
    "Archaludon + Sandaconda",
    "Typhlosion + Vanilluxe",
    "Pawmot + Sneasler",
    "Dragapult + Pawmot"
  ]
};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = 83493000;

/** Simulation date */
export const SIM_DATE = "2026-04-03T10:33:33.695Z";

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - AUTO-GENERATED SIMULATION DATA
// Generated from 2,000,000 mega-aware battle simulations
// Date: 2026-03-28T00:01:53.032Z
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
    "elo": 9715,
    "winRate": 50.9,
    "appearances": 191672,
    "wins": 97629,
    "losses": 94043,
    "bestPartners": [
      {
        "name": "Mega Greninja",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Scizor",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Heat Rotom",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Metagross",
        "winRate": 59.1,
        "games": 9433
      },
      {
        "name": "Dragapult",
        "winRate": 54.4,
        "games": 20439
      }
    ],
    "bestSets": []
  },
  "6": {
    "id": 6,
    "name": "Charizard",
    "isMega": false,
    "elo": 9694,
    "winRate": 51.4,
    "appearances": 271651,
    "wins": 139534,
    "losses": 132117,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 65.2,
        "games": 4003
      },
      {
        "name": "Excadrill",
        "winRate": 63.2,
        "games": 8562
      },
      {
        "name": "Hydreigon",
        "winRate": 63.2,
        "games": 8562
      },
      {
        "name": "Chesnaught",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Weavile",
        "winRate": 61.6,
        "games": 4376
      }
    ],
    "bestSets": []
  },
  "9": {
    "id": 9,
    "name": "Blastoise",
    "isMega": false,
    "elo": 9694,
    "winRate": 50.2,
    "appearances": 114239,
    "wins": 57335,
    "losses": 56904,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Excadrill",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Milotic",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Archaludon",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Whimsicott",
        "winRate": 51,
        "games": 10866
      }
    ],
    "bestSets": []
  },
  "15": {
    "id": 15,
    "name": "Beedrill",
    "isMega": false,
    "elo": 9639,
    "winRate": 47.4,
    "appearances": 15560,
    "wins": 7374,
    "losses": 8186,
    "bestPartners": [
      {
        "name": "Zoroark",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Scizor",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Froslass",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Dragapult",
        "winRate": 51.1,
        "games": 5626
      }
    ],
    "bestSets": []
  },
  "25": {
    "id": 25,
    "name": "Pikachu",
    "isMega": false,
    "elo": 9581,
    "winRate": 39,
    "appearances": 13294,
    "wins": 5185,
    "losses": 8109,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 46,
        "games": 5075
      },
      {
        "name": "Arcanine",
        "winRate": 46,
        "games": 5075
      },
      {
        "name": "Corviknight",
        "winRate": 46,
        "games": 5075
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 46,
        "games": 5075
      },
      {
        "name": "Incineroar",
        "winRate": 39,
        "games": 13294
      }
    ],
    "bestSets": []
  },
  "26": {
    "id": 26,
    "name": "Raichu",
    "isMega": false,
    "elo": 9662,
    "winRate": 50.1,
    "appearances": 21465,
    "wins": 10752,
    "losses": 10713,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 10816
      },
      {
        "name": "Corviknight",
        "winRate": 50.2,
        "games": 10816
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.2,
        "games": 10816
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 21465
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 21465
      }
    ],
    "bestSets": []
  },
  "36": {
    "id": 36,
    "name": "Clefable",
    "isMega": false,
    "elo": 9708,
    "winRate": 51.5,
    "appearances": 64068,
    "wins": 32983,
    "losses": 31085,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 59,
        "games": 9240
      },
      {
        "name": "Scizor",
        "winRate": 59,
        "games": 9240
      },
      {
        "name": "Metagross",
        "winRate": 59,
        "games": 9240
      },
      {
        "name": "Kingambit",
        "winRate": 52.4,
        "games": 36871
      },
      {
        "name": "Incineroar",
        "winRate": 51.9,
        "games": 47700
      }
    ],
    "bestSets": []
  },
  "38": {
    "id": 38,
    "name": "Ninetales",
    "isMega": false,
    "elo": 9685,
    "winRate": 50.7,
    "appearances": 20820,
    "wins": 10562,
    "losses": 10258,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 58.3,
        "games": 4568
      },
      {
        "name": "Leafeon",
        "winRate": 53.7,
        "games": 10058
      },
      {
        "name": "Venusaur",
        "winRate": 53.7,
        "games": 10058
      },
      {
        "name": "Charizard",
        "winRate": 53.7,
        "games": 10058
      },
      {
        "name": "Scovillain",
        "winRate": 53.7,
        "games": 10058
      }
    ],
    "bestSets": []
  },
  "59": {
    "id": 59,
    "name": "Arcanine",
    "isMega": false,
    "elo": 9643,
    "winRate": 49.1,
    "appearances": 739824,
    "wins": 363589,
    "losses": 376235,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Mega Garchomp",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Primarina",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Mega Feraligatr",
        "winRate": 60.3,
        "games": 8941
      },
      {
        "name": "Archaludon",
        "winRate": 59,
        "games": 13924
      }
    ],
    "bestSets": []
  },
  "65": {
    "id": 65,
    "name": "Alakazam",
    "isMega": false,
    "elo": 9622,
    "winRate": 49.3,
    "appearances": 26074,
    "wins": 12845,
    "losses": 13229,
    "bestPartners": [
      {
        "name": "Mega Lopunny",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Gardevoir",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Polteageist",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Incineroar",
        "winRate": 51.8,
        "games": 16132
      }
    ],
    "bestSets": []
  },
  "71": {
    "id": 71,
    "name": "Victreebel",
    "isMega": false,
    "elo": 9724,
    "winRate": 49.6,
    "appearances": 22249,
    "wins": 11038,
    "losses": 11211,
    "bestPartners": [
      {
        "name": "Meganium",
        "winRate": 50,
        "games": 5501
      },
      {
        "name": "Krookodile",
        "winRate": 50,
        "games": 5501
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 5501
      },
      {
        "name": "Kommo-o",
        "winRate": 50,
        "games": 5501
      },
      {
        "name": "Mega Blastoise",
        "winRate": 49.9,
        "games": 11220
      }
    ],
    "bestSets": []
  },
  "80": {
    "id": 80,
    "name": "Slowbro",
    "isMega": false,
    "elo": 9733,
    "winRate": 51,
    "appearances": 134023,
    "wins": 68333,
    "losses": 65690,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 68.9,
        "games": 3909
      },
      {
        "name": "Torkoal",
        "winRate": 60.8,
        "games": 4418
      },
      {
        "name": "Heat Rotom",
        "winRate": 58.1,
        "games": 9524
      },
      {
        "name": "Mega Gyarados",
        "winRate": 57.8,
        "games": 9362
      },
      {
        "name": "Garchomp",
        "winRate": 54.6,
        "games": 19989
      }
    ],
    "bestSets": []
  },
  "94": {
    "id": 94,
    "name": "Gengar",
    "isMega": false,
    "elo": 9724,
    "winRate": 49.8,
    "appearances": 460597,
    "wins": 229569,
    "losses": 231028,
    "bestPartners": [
      {
        "name": "Chesnaught",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Heat Rotom",
        "winRate": 59.3,
        "games": 18198
      },
      {
        "name": "Greninja",
        "winRate": 54.2,
        "games": 39994
      },
      {
        "name": "Mega Chesnaught",
        "winRate": 53.9,
        "games": 15102
      },
      {
        "name": "Charizard",
        "winRate": 53,
        "games": 56803
      }
    ],
    "bestSets": []
  },
  "115": {
    "id": 115,
    "name": "Kangaskhan",
    "isMega": false,
    "elo": 9705,
    "winRate": 47.7,
    "appearances": 31256,
    "wins": 14920,
    "losses": 16336,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 50,
        "games": 16290
      },
      {
        "name": "Garchomp",
        "winRate": 50,
        "games": 16290
      },
      {
        "name": "Tyranitar",
        "winRate": 50,
        "games": 16290
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 27148
      },
      {
        "name": "Arcanine",
        "winRate": 48.6,
        "games": 10858
      }
    ],
    "bestSets": []
  },
  "121": {
    "id": 121,
    "name": "Starmie",
    "isMega": false,
    "elo": 9649,
    "winRate": 50.5,
    "appearances": 54059,
    "wins": 27291,
    "losses": 26768,
    "bestPartners": [
      {
        "name": "Mega Drampa",
        "winRate": 56,
        "games": 4841
      },
      {
        "name": "Scizor",
        "winRate": 56,
        "games": 4841
      },
      {
        "name": "Aegislash",
        "winRate": 56,
        "games": 4841
      },
      {
        "name": "Charizard",
        "winRate": 56,
        "games": 4841
      },
      {
        "name": "Arcanine",
        "winRate": 51.4,
        "games": 21525
      }
    ],
    "bestSets": []
  },
  "127": {
    "id": 127,
    "name": "Pinsir",
    "isMega": false,
    "elo": 9594,
    "winRate": 49,
    "appearances": 18578,
    "wins": 9104,
    "losses": 9474,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 57.4,
        "games": 9499
      },
      {
        "name": "Archaludon",
        "winRate": 57.4,
        "games": 9499
      },
      {
        "name": "Kingambit",
        "winRate": 57.4,
        "games": 9499
      },
      {
        "name": "Tyranitar",
        "winRate": 57.4,
        "games": 9499
      },
      {
        "name": "Metagross",
        "winRate": 57.4,
        "games": 9499
      }
    ],
    "bestSets": []
  },
  "130": {
    "id": 130,
    "name": "Gyarados",
    "isMega": false,
    "elo": 9679,
    "winRate": 49.6,
    "appearances": 1263259,
    "wins": 626984,
    "losses": 636275,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 54.5,
        "games": 10089
      },
      {
        "name": "Mega Delphox",
        "winRate": 54.4,
        "games": 5033
      },
      {
        "name": "Tinkaton",
        "winRate": 53.6,
        "games": 10368
      },
      {
        "name": "Tsareena",
        "winRate": 52.9,
        "games": 5186
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 52.9,
        "games": 15732
      }
    ],
    "bestSets": []
  },
  "132": {
    "id": 132,
    "name": "Ditto",
    "isMega": false,
    "elo": 9554,
    "winRate": 36.7,
    "appearances": 12802,
    "wins": 4695,
    "losses": 8107,
    "bestPartners": [
      {
        "name": "Mega Gallade",
        "winRate": 50,
        "games": 5341
      },
      {
        "name": "Kingambit",
        "winRate": 50,
        "games": 5341
      },
      {
        "name": "Tyranitar",
        "winRate": 50,
        "games": 5341
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 50,
        "games": 5341
      },
      {
        "name": "Gyarados",
        "winRate": 42.5,
        "games": 9316
      }
    ],
    "bestSets": []
  },
  "134": {
    "id": 134,
    "name": "Vaporeon",
    "isMega": false,
    "elo": 9697,
    "winRate": 49.9,
    "appearances": 59691,
    "wins": 29758,
    "losses": 29933,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 21528
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.2,
        "games": 5373
      },
      {
        "name": "Pelipper",
        "winRate": 50.2,
        "games": 5348
      },
      {
        "name": "Altaria",
        "winRate": 50.2,
        "games": 5348
      },
      {
        "name": "Mudsdale",
        "winRate": 50.2,
        "games": 5364
      }
    ],
    "bestSets": []
  },
  "135": {
    "id": 135,
    "name": "Jolteon",
    "isMega": false,
    "elo": 9599,
    "winRate": 50.1,
    "appearances": 16303,
    "wins": 8160,
    "losses": 8143,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.5,
        "games": 5324
      },
      {
        "name": "Corviknight",
        "winRate": 50.5,
        "games": 5324
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.5,
        "games": 5324
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 10785
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 10785
      }
    ],
    "bestSets": []
  },
  "136": {
    "id": 136,
    "name": "Flareon",
    "isMega": false,
    "elo": 9629,
    "winRate": 48.6,
    "appearances": 16153,
    "wins": 7845,
    "losses": 8308,
    "bestPartners": [
      {
        "name": "Quaquaval",
        "winRate": 50.1,
        "games": 5647
      },
      {
        "name": "Dragapult",
        "winRate": 50.1,
        "games": 5647
      },
      {
        "name": "Palafin",
        "winRate": 50.1,
        "games": 5647
      },
      {
        "name": "Pelipper",
        "winRate": 50.1,
        "games": 5647
      },
      {
        "name": "Ninetales",
        "winRate": 49.8,
        "games": 5490
      }
    ],
    "bestSets": []
  },
  "142": {
    "id": 142,
    "name": "Aerodactyl",
    "isMega": false,
    "elo": 9614,
    "winRate": 47.1,
    "appearances": 55615,
    "wins": 26183,
    "losses": 29432,
    "bestPartners": [
      {
        "name": "Scovillain",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Tyranitar",
        "winRate": 61.4,
        "games": 12918
      },
      {
        "name": "Kingambit",
        "winRate": 61.4,
        "games": 12918
      },
      {
        "name": "Archaludon",
        "winRate": 61.4,
        "games": 12918
      },
      {
        "name": "Corviknight",
        "winRate": 52.1,
        "games": 27465
      }
    ],
    "bestSets": []
  },
  "143": {
    "id": 143,
    "name": "Snorlax",
    "isMega": false,
    "elo": 9717,
    "winRate": 51.7,
    "appearances": 37511,
    "wins": 19382,
    "losses": 18129,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 55.5,
        "games": 9815
      },
      {
        "name": "Hatterene",
        "winRate": 53.5,
        "games": 15473
      },
      {
        "name": "Slowbro",
        "winRate": 52.7,
        "games": 21007
      },
      {
        "name": "Kingambit",
        "winRate": 52.4,
        "games": 26404
      },
      {
        "name": "Tyranitar",
        "winRate": 52,
        "games": 31853
      }
    ],
    "bestSets": []
  },
  "149": {
    "id": 149,
    "name": "Dragonite",
    "isMega": false,
    "elo": 9728,
    "winRate": 49.4,
    "appearances": 494456,
    "wins": 244074,
    "losses": 250382,
    "bestPartners": [
      {
        "name": "Mega Delphox",
        "winRate": 54.1,
        "games": 5104
      },
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 5104
      },
      {
        "name": "Araquanid",
        "winRate": 54.1,
        "games": 5104
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 51.3,
        "games": 10462
      },
      {
        "name": "Zoroark",
        "winRate": 51,
        "games": 5455
      }
    ],
    "bestSets": []
  },
  "154": {
    "id": 154,
    "name": "Meganium",
    "isMega": false,
    "elo": 9596,
    "winRate": 46.3,
    "appearances": 82203,
    "wins": 38056,
    "losses": 44147,
    "bestPartners": [
      {
        "name": "Mega Feraligatr",
        "winRate": 51.2,
        "games": 5644
      },
      {
        "name": "Dragapult",
        "winRate": 51.2,
        "games": 5644
      },
      {
        "name": "Venusaur",
        "winRate": 51.2,
        "games": 5644
      },
      {
        "name": "Mow Rotom",
        "winRate": 51,
        "games": 11244
      },
      {
        "name": "Meowscarada",
        "winRate": 51,
        "games": 5780
      }
    ],
    "bestSets": []
  },
  "157": {
    "id": 157,
    "name": "Typhlosion",
    "isMega": false,
    "elo": 9613,
    "winRate": 49.1,
    "appearances": 14737,
    "wins": 7243,
    "losses": 7494,
    "bestPartners": [
      {
        "name": "Noivern",
        "winRate": 57.5,
        "games": 4756
      },
      {
        "name": "Kingambit",
        "winRate": 57.5,
        "games": 4756
      },
      {
        "name": "Hydreigon",
        "winRate": 57.5,
        "games": 4756
      },
      {
        "name": "Gyarados",
        "winRate": 51.4,
        "games": 9849
      },
      {
        "name": "Empoleon",
        "winRate": 51,
        "games": 9644
      }
    ],
    "bestSets": []
  },
  "160": {
    "id": 160,
    "name": "Feraligatr",
    "isMega": false,
    "elo": 9710,
    "winRate": 50.1,
    "appearances": 109069,
    "wins": 54660,
    "losses": 54409,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 55.3,
        "games": 4994
      },
      {
        "name": "Archaludon",
        "winRate": 55.3,
        "games": 4994
      },
      {
        "name": "Kingambit",
        "winRate": 52.1,
        "games": 10582
      },
      {
        "name": "Mega Venusaur",
        "winRate": 51.8,
        "games": 15945
      },
      {
        "name": "Greninja",
        "winRate": 51.7,
        "games": 16059
      }
    ],
    "bestSets": []
  },
  "181": {
    "id": 181,
    "name": "Ampharos",
    "isMega": false,
    "elo": 9654,
    "winRate": 52,
    "appearances": 10777,
    "wins": 5599,
    "losses": 5178,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 52,
        "games": 10777
      },
      {
        "name": "Incineroar",
        "winRate": 52,
        "games": 10777
      },
      {
        "name": "Charizard",
        "winRate": 52,
        "games": 10777
      },
      {
        "name": "Arcanine",
        "winRate": 52,
        "games": 10777
      },
      {
        "name": "Whimsicott",
        "winRate": 52,
        "games": 10777
      }
    ],
    "bestSets": []
  },
  "184": {
    "id": 184,
    "name": "Azumarill",
    "isMega": false,
    "elo": 9662,
    "winRate": 50.5,
    "appearances": 314349,
    "wins": 158714,
    "losses": 155635,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Aegislash",
        "winRate": 57,
        "games": 4755
      },
      {
        "name": "Archaludon",
        "winRate": 56.4,
        "games": 9652
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 56.2,
        "games": 4861
      },
      {
        "name": "Mega Garchomp",
        "winRate": 55.8,
        "games": 9839
      }
    ],
    "bestSets": []
  },
  "186": {
    "id": 186,
    "name": "Politoed",
    "isMega": false,
    "elo": 9673,
    "winRate": 50.2,
    "appearances": 244497,
    "wins": 122616,
    "losses": 121881,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 55.3,
        "games": 4994
      },
      {
        "name": "Mega Venusaur",
        "winRate": 52.9,
        "games": 10400
      },
      {
        "name": "Kleavor",
        "winRate": 52.3,
        "games": 10462
      },
      {
        "name": "Kingambit",
        "winRate": 51.6,
        "games": 16190
      },
      {
        "name": "Feraligatr",
        "winRate": 51,
        "games": 42961
      }
    ],
    "bestSets": []
  },
  "196": {
    "id": 196,
    "name": "Espeon",
    "isMega": false,
    "elo": 9618,
    "winRate": 41.5,
    "appearances": 14027,
    "wins": 5821,
    "losses": 8206,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 5603
      },
      {
        "name": "Kingambit",
        "winRate": 49.6,
        "games": 5603
      },
      {
        "name": "Krookodile",
        "winRate": 49.6,
        "games": 5603
      },
      {
        "name": "Azumarill",
        "winRate": 49.6,
        "games": 5603
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.6,
        "games": 5603
      }
    ],
    "bestSets": []
  },
  "197": {
    "id": 197,
    "name": "Umbreon",
    "isMega": false,
    "elo": 9659,
    "winRate": 49.9,
    "appearances": 27420,
    "wins": 13675,
    "losses": 13745,
    "bestPartners": [
      {
        "name": "Rotom",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Volcarona",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Sneasler",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Hisuian Typhlosion",
        "winRate": 50.1,
        "games": 5306
      }
    ],
    "bestSets": []
  },
  "199": {
    "id": 199,
    "name": "Slowking",
    "isMega": false,
    "elo": 9684,
    "winRate": 50.2,
    "appearances": 16410,
    "wins": 8243,
    "losses": 8167,
    "bestPartners": [
      {
        "name": "Mega Audino",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Gliscor",
        "winRate": 50.5,
        "games": 5436
      }
    ],
    "bestSets": []
  },
  "208": {
    "id": 208,
    "name": "Steelix",
    "isMega": false,
    "elo": 9681,
    "winRate": 48.7,
    "appearances": 112489,
    "wins": 54833,
    "losses": 57656,
    "bestPartners": [
      {
        "name": "Mr. Rime",
        "winRate": 50.4,
        "games": 5659
      },
      {
        "name": "Drampa",
        "winRate": 50.4,
        "games": 5659
      },
      {
        "name": "Stunfisk",
        "winRate": 50.4,
        "games": 5659
      },
      {
        "name": "Ursaluna",
        "winRate": 50.2,
        "games": 11000
      },
      {
        "name": "Archaludon",
        "winRate": 50.1,
        "games": 16531
      }
    ],
    "bestSets": []
  },
  "212": {
    "id": 212,
    "name": "Scizor",
    "isMega": false,
    "elo": 9744,
    "winRate": 51.1,
    "appearances": 408724,
    "wins": 208700,
    "losses": 200024,
    "bestPartners": [
      {
        "name": "Venusaur",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Heat Rotom",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Archaludon",
        "winRate": 61.3,
        "games": 17583
      },
      {
        "name": "Alcremie",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Mega Greninja",
        "winRate": 60.3,
        "games": 9028
      }
    ],
    "bestSets": []
  },
  "214": {
    "id": 214,
    "name": "Heracross",
    "isMega": false,
    "elo": 9666,
    "winRate": 51.8,
    "appearances": 16428,
    "wins": 8509,
    "losses": 7919,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 52.5,
        "games": 10801
      },
      {
        "name": "Metagross",
        "winRate": 52.5,
        "games": 10801
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.5,
        "games": 10801
      },
      {
        "name": "Greninja",
        "winRate": 52.5,
        "games": 10801
      },
      {
        "name": "Kingambit",
        "winRate": 52.5,
        "games": 10801
      }
    ],
    "bestSets": []
  },
  "227": {
    "id": 227,
    "name": "Skarmory",
    "isMega": false,
    "elo": 9615,
    "winRate": 47.9,
    "appearances": 84691,
    "wins": 40594,
    "losses": 44097,
    "bestPartners": [
      {
        "name": "Lycanroc",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Decidueye",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Pelipper",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Palafin",
        "winRate": 50.8,
        "games": 5628
      }
    ],
    "bestSets": []
  },
  "229": {
    "id": 229,
    "name": "Houndoom",
    "isMega": false,
    "elo": 9674,
    "winRate": 50.3,
    "appearances": 22427,
    "wins": 11271,
    "losses": 11156,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 11229
      },
      {
        "name": "Whimsicott",
        "winRate": 50.9,
        "games": 11229
      },
      {
        "name": "Decidueye",
        "winRate": 50.9,
        "games": 11229
      },
      {
        "name": "Dragapult",
        "winRate": 50.9,
        "games": 11229
      },
      {
        "name": "Dragonite",
        "winRate": 50.9,
        "games": 11229
      }
    ],
    "bestSets": []
  },
  "248": {
    "id": 248,
    "name": "Tyranitar",
    "isMega": false,
    "elo": 9674,
    "winRate": 50.4,
    "appearances": 684498,
    "wins": 344728,
    "losses": 339770,
    "bestPartners": [
      {
        "name": "Scovillain",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Aerodactyl",
        "winRate": 61.4,
        "games": 12918
      },
      {
        "name": "Corviknight",
        "winRate": 61.4,
        "games": 12918
      },
      {
        "name": "Mega Scovillain",
        "winRate": 61.3,
        "games": 4312
      },
      {
        "name": "Archaludon",
        "winRate": 59.2,
        "games": 27208
      }
    ],
    "bestSets": []
  },
  "279": {
    "id": 279,
    "name": "Pelipper",
    "isMega": false,
    "elo": 9666,
    "winRate": 50.4,
    "appearances": 92591,
    "wins": 46624,
    "losses": 45967,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 60.1,
        "games": 4444
      },
      {
        "name": "Mega Excadrill",
        "winRate": 54.9,
        "games": 9902
      },
      {
        "name": "Talonflame",
        "winRate": 54.4,
        "games": 10063
      },
      {
        "name": "Charizard",
        "winRate": 52.8,
        "games": 15485
      },
      {
        "name": "Noivern",
        "winRate": 51,
        "games": 26157
      }
    ],
    "bestSets": []
  },
  "282": {
    "id": 282,
    "name": "Gardevoir",
    "isMega": false,
    "elo": 9650,
    "winRate": 49.8,
    "appearances": 433718,
    "wins": 215835,
    "losses": 217883,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 57.3,
        "games": 4536
      },
      {
        "name": "Alakazam",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Polteageist",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.6,
        "games": 5241
      }
    ],
    "bestSets": []
  },
  "302": {
    "id": 302,
    "name": "Sableye",
    "isMega": false,
    "elo": 9619,
    "winRate": 46.3,
    "appearances": 75581,
    "wins": 34973,
    "losses": 40608,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 53.4,
        "games": 5021
      },
      {
        "name": "Dragapult",
        "winRate": 52,
        "games": 10507
      },
      {
        "name": "Archaludon",
        "winRate": 51.1,
        "games": 10641
      },
      {
        "name": "Garchomp",
        "winRate": 50.8,
        "games": 27082
      },
      {
        "name": "Kingambit",
        "winRate": 50.6,
        "games": 10812
      }
    ],
    "bestSets": []
  },
  "306": {
    "id": 306,
    "name": "Aggron",
    "isMega": false,
    "elo": 9643,
    "winRate": 48.8,
    "appearances": 112670,
    "wins": 55001,
    "losses": 57669,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 53.2,
        "games": 5131
      },
      {
        "name": "Fan Rotom",
        "winRate": 51.8,
        "games": 10649
      },
      {
        "name": "Mega Heracross",
        "winRate": 51.7,
        "games": 5426
      },
      {
        "name": "Corviknight",
        "winRate": 51.7,
        "games": 5426
      },
      {
        "name": "Alolan Raichu",
        "winRate": 51.7,
        "games": 5426
      }
    ],
    "bestSets": []
  },
  "324": {
    "id": 324,
    "name": "Torkoal",
    "isMega": false,
    "elo": 9702,
    "winRate": 50.9,
    "appearances": 180364,
    "wins": 91769,
    "losses": 88595,
    "bestPartners": [
      {
        "name": "Slowbro",
        "winRate": 60.8,
        "games": 4418
      },
      {
        "name": "Scovillain",
        "winRate": 58.3,
        "games": 4568
      },
      {
        "name": "Leafeon",
        "winRate": 58.3,
        "games": 4568
      },
      {
        "name": "Charizard",
        "winRate": 58.3,
        "games": 4568
      },
      {
        "name": "Ninetales",
        "winRate": 58.3,
        "games": 4568
      }
    ],
    "bestSets": []
  },
  "334": {
    "id": 334,
    "name": "Altaria",
    "isMega": false,
    "elo": 9650,
    "winRate": 45.9,
    "appearances": 96090,
    "wins": 44068,
    "losses": 52022,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 50.6,
        "games": 5458
      },
      {
        "name": "Mega Metagross",
        "winRate": 50.4,
        "games": 5554
      },
      {
        "name": "Greninja",
        "winRate": 50.4,
        "games": 5554
      },
      {
        "name": "Charizard",
        "winRate": 50.4,
        "games": 5554
      },
      {
        "name": "Starmie",
        "winRate": 50.2,
        "games": 5670
      }
    ],
    "bestSets": []
  },
  "350": {
    "id": 350,
    "name": "Milotic",
    "isMega": false,
    "elo": 9688,
    "winRate": 50.7,
    "appearances": 86595,
    "wins": 43940,
    "losses": 42655,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Excadrill",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Archaludon",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Blastoise",
        "winRate": 53.7,
        "games": 5095
      },
      {
        "name": "Slowbro",
        "winRate": 53.1,
        "games": 5097
      }
    ],
    "bestSets": []
  },
  "359": {
    "id": 359,
    "name": "Absol",
    "isMega": false,
    "elo": 9688,
    "winRate": 50.9,
    "appearances": 11193,
    "wins": 5702,
    "losses": 5491,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.9,
        "games": 11193
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 11193
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.9,
        "games": 11193
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.9,
        "games": 11193
      },
      {
        "name": "Dragapult",
        "winRate": 50.9,
        "games": 11193
      }
    ],
    "bestSets": []
  },
  "376": {
    "id": 376,
    "name": "Metagross",
    "isMega": false,
    "elo": 9725,
    "winRate": 51.6,
    "appearances": 345366,
    "wins": 178314,
    "losses": 167052,
    "bestPartners": [
      {
        "name": "Mega Greninja",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Mega Clefable",
        "winRate": 66.6,
        "games": 3999
      },
      {
        "name": "Mega Chesnaught",
        "winRate": 65.2,
        "games": 4003
      },
      {
        "name": "Chesnaught",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Heat Rotom",
        "winRate": 61.3,
        "games": 22065
      }
    ],
    "bestSets": []
  },
  "389": {
    "id": 389,
    "name": "Torterra",
    "isMega": false,
    "elo": 9665,
    "winRate": 50.4,
    "appearances": 16301,
    "wins": 8218,
    "losses": 8083,
    "bestPartners": [
      {
        "name": "Dragonite",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Rotom",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Froslass",
        "winRate": 50.7,
        "games": 5531
      },
      {
        "name": "Politoed",
        "winRate": 50.7,
        "games": 5531
      }
    ],
    "bestSets": []
  },
  "392": {
    "id": 392,
    "name": "Infernape",
    "isMega": false,
    "elo": 9666,
    "winRate": 50.3,
    "appearances": 16607,
    "wins": 8354,
    "losses": 8253,
    "bestPartners": [
      {
        "name": "Vanilluxe",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Emolga",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Garchomp",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Farigiraf",
        "winRate": 50.5,
        "games": 5627
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.5,
        "games": 5627
      }
    ],
    "bestSets": []
  },
  "395": {
    "id": 395,
    "name": "Empoleon",
    "isMega": false,
    "elo": 9651,
    "winRate": 51.4,
    "appearances": 90146,
    "wins": 46323,
    "losses": 43823,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Primarina",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Alcremie",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Noivern",
        "winRate": 57.5,
        "games": 4756
      }
    ],
    "bestSets": []
  },
  "442": {
    "id": 442,
    "name": "Spiritomb",
    "isMega": false,
    "elo": 9523,
    "winRate": 37.1,
    "appearances": 30302,
    "wins": 11240,
    "losses": 19062,
    "bestPartners": [
      {
        "name": "Mega Gengar",
        "winRate": 49.9,
        "games": 5593
      },
      {
        "name": "Azumarill",
        "winRate": 49.9,
        "games": 5593
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 49.9,
        "games": 5593
      },
      {
        "name": "Meowscarada",
        "winRate": 46.9,
        "games": 5304
      },
      {
        "name": "Gyarados",
        "winRate": 46.9,
        "games": 5304
      }
    ],
    "bestSets": []
  },
  "445": {
    "id": 445,
    "name": "Garchomp",
    "isMega": false,
    "elo": 9655,
    "winRate": 50.4,
    "appearances": 1743362,
    "wins": 878474,
    "losses": 864888,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 58,
        "games": 9617
      },
      {
        "name": "Archaludon",
        "winRate": 58,
        "games": 33062
      },
      {
        "name": "Slowbro",
        "winRate": 54.6,
        "games": 19989
      },
      {
        "name": "Hydreigon",
        "winRate": 54.3,
        "games": 51025
      },
      {
        "name": "Charizard",
        "winRate": 54.2,
        "games": 24860
      }
    ],
    "bestSets": []
  },
  "448": {
    "id": 448,
    "name": "Lucario",
    "isMega": false,
    "elo": 9657,
    "winRate": 48.9,
    "appearances": 84101,
    "wins": 41166,
    "losses": 42935,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 55.5,
        "games": 9769
      },
      {
        "name": "Whimsicott",
        "winRate": 53.4,
        "games": 10301
      },
      {
        "name": "Archaludon",
        "winRate": 53.2,
        "games": 5131
      },
      {
        "name": "Garchomp",
        "winRate": 52.7,
        "games": 15472
      },
      {
        "name": "Fan Rotom",
        "winRate": 51.8,
        "games": 10649
      }
    ],
    "bestSets": []
  },
  "450": {
    "id": 450,
    "name": "Hippowdon",
    "isMega": false,
    "elo": 9627,
    "winRate": 50,
    "appearances": 16297,
    "wins": 8142,
    "losses": 8155,
    "bestPartners": [
      {
        "name": "Mega Tyranitar",
        "winRate": 50.6,
        "games": 5570
      },
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 5570
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 5570
      },
      {
        "name": "Rhyperior",
        "winRate": 50.6,
        "games": 5570
      },
      {
        "name": "Krookodile",
        "winRate": 50.6,
        "games": 5570
      }
    ],
    "bestSets": []
  },
  "460": {
    "id": 460,
    "name": "Abomasnow",
    "isMega": false,
    "elo": 9666,
    "winRate": 50.6,
    "appearances": 35712,
    "wins": 18069,
    "losses": 17643,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Primarina",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Drampa",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 56.9,
        "games": 9643
      },
      {
        "name": "Hisuian Typhlosion",
        "winRate": 56.7,
        "games": 9334
      }
    ],
    "bestSets": []
  },
  "461": {
    "id": 461,
    "name": "Weavile",
    "isMega": false,
    "elo": 9709,
    "winRate": 51.9,
    "appearances": 26792,
    "wins": 13898,
    "losses": 12894,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Greninja",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Kommo-o",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Incineroar",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Charizard",
        "winRate": 61.6,
        "games": 4376
      }
    ],
    "bestSets": []
  },
  "464": {
    "id": 464,
    "name": "Rhyperior",
    "isMega": false,
    "elo": 9709,
    "winRate": 50.2,
    "appearances": 210187,
    "wins": 105520,
    "losses": 104667,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Garchomp",
        "winRate": 50.8,
        "games": 55409
      },
      {
        "name": "Pawmot",
        "winRate": 50.8,
        "games": 11184
      },
      {
        "name": "Snorlax",
        "winRate": 50.7,
        "games": 16500
      },
      {
        "name": "Mega Skarmory",
        "winRate": 50.7,
        "games": 5600
      }
    ],
    "bestSets": []
  },
  "470": {
    "id": 470,
    "name": "Leafeon",
    "isMega": false,
    "elo": 9689,
    "winRate": 50.8,
    "appearances": 26269,
    "wins": 13354,
    "losses": 12915,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 58.3,
        "games": 4568
      },
      {
        "name": "Ninetales",
        "winRate": 53.7,
        "games": 10058
      },
      {
        "name": "Venusaur",
        "winRate": 53.7,
        "games": 10058
      },
      {
        "name": "Charizard",
        "winRate": 53.7,
        "games": 10058
      },
      {
        "name": "Scovillain",
        "winRate": 53.7,
        "games": 10058
      }
    ],
    "bestSets": []
  },
  "471": {
    "id": 471,
    "name": "Glaceon",
    "isMega": false,
    "elo": 9665,
    "winRate": 50,
    "appearances": 16446,
    "wins": 8231,
    "losses": 8215,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.5,
        "games": 5531
      },
      {
        "name": "Incineroar",
        "winRate": 50.5,
        "games": 5531
      },
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 5531
      },
      {
        "name": "Froslass",
        "winRate": 50.3,
        "games": 11019
      },
      {
        "name": "Garchomp",
        "winRate": 50,
        "games": 16446
      }
    ],
    "bestSets": []
  },
  "472": {
    "id": 472,
    "name": "Gliscor",
    "isMega": false,
    "elo": 9655,
    "winRate": 49.4,
    "appearances": 41575,
    "wins": 20541,
    "losses": 21034,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 58.9,
        "games": 4548
      },
      {
        "name": "Dragapult",
        "winRate": 58.9,
        "games": 4548
      },
      {
        "name": "Corviknight",
        "winRate": 58.9,
        "games": 4548
      },
      {
        "name": "Mega Gyarados",
        "winRate": 54,
        "games": 10001
      },
      {
        "name": "Azumarill",
        "winRate": 52.7,
        "games": 15564
      }
    ],
    "bestSets": []
  },
  "475": {
    "id": 475,
    "name": "Gallade",
    "isMega": false,
    "elo": 9622,
    "winRate": 47.5,
    "appearances": 10596,
    "wins": 5035,
    "losses": 5561,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 47.5,
        "games": 10596
      },
      {
        "name": "Kingambit",
        "winRate": 47.5,
        "games": 10596
      },
      {
        "name": "Aggron",
        "winRate": 47.5,
        "games": 10596
      },
      {
        "name": "Steelix",
        "winRate": 47.5,
        "games": 10596
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 47.5,
        "games": 10596
      }
    ],
    "bestSets": []
  },
  "478": {
    "id": 478,
    "name": "Froslass",
    "isMega": false,
    "elo": 9670,
    "winRate": 48.6,
    "appearances": 52980,
    "wins": 25746,
    "losses": 27234,
    "bestPartners": [
      {
        "name": "Beedrill",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Dragapult",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Zoroark",
        "winRate": 51,
        "games": 11081
      },
      {
        "name": "Scizor",
        "winRate": 51,
        "games": 11081
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 51,
        "games": 11081
      }
    ],
    "bestSets": []
  },
  "479": {
    "id": 479,
    "name": "Rotom",
    "isMega": false,
    "elo": 9644,
    "winRate": 50.8,
    "appearances": 64666,
    "wins": 32824,
    "losses": 31842,
    "bestPartners": [
      {
        "name": "Alcremie",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Metagross",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Archaludon",
        "winRate": 57.6,
        "games": 9418
      },
      {
        "name": "Kingambit",
        "winRate": 54.6,
        "games": 14960
      },
      {
        "name": "Scizor",
        "winRate": 53.5,
        "games": 15618
      }
    ],
    "bestSets": []
  },
  "497": {
    "id": 497,
    "name": "Serperior",
    "isMega": false,
    "elo": 9561,
    "winRate": 45.7,
    "appearances": 25566,
    "wins": 11689,
    "losses": 13877,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 50.9,
        "games": 5758
      },
      {
        "name": "Toxapex",
        "winRate": 50.9,
        "games": 5758
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.9,
        "games": 5758
      },
      {
        "name": "Mega Blastoise",
        "winRate": 49.8,
        "games": 5719
      },
      {
        "name": "Victreebel",
        "winRate": 49.8,
        "games": 5719
      }
    ],
    "bestSets": []
  },
  "500": {
    "id": 500,
    "name": "Emboar",
    "isMega": false,
    "elo": 9682,
    "winRate": 47.4,
    "appearances": 20460,
    "wins": 9706,
    "losses": 10754,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 5459
      },
      {
        "name": "Mega Dragonite",
        "winRate": 50.3,
        "games": 5459
      },
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 5459
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 5459
      },
      {
        "name": "Greninja",
        "winRate": 50,
        "games": 16106
      }
    ],
    "bestSets": []
  },
  "503": {
    "id": 503,
    "name": "Samurott",
    "isMega": false,
    "elo": 9660,
    "winRate": 49.6,
    "appearances": 21692,
    "wins": 10763,
    "losses": 10929,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 49.8,
        "games": 5481
      },
      {
        "name": "Dragonite",
        "winRate": 49.8,
        "games": 5481
      },
      {
        "name": "Clawitzer",
        "winRate": 49.8,
        "games": 5481
      },
      {
        "name": "Vaporeon",
        "winRate": 49.8,
        "games": 5481
      },
      {
        "name": "Arcanine",
        "winRate": 49.8,
        "games": 5481
      }
    ],
    "bestSets": []
  },
  "530": {
    "id": 530,
    "name": "Excadrill",
    "isMega": false,
    "elo": 9675,
    "winRate": 49.7,
    "appearances": 506723,
    "wins": 252089,
    "losses": 254634,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 63.2,
        "games": 8562
      },
      {
        "name": "Hydreigon",
        "winRate": 56.1,
        "games": 24668
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 54.7,
        "games": 5032
      },
      {
        "name": "Archaludon",
        "winRate": 54.3,
        "games": 50858
      },
      {
        "name": "Kleavor",
        "winRate": 53.7,
        "games": 5095
      }
    ],
    "bestSets": []
  },
  "531": {
    "id": 531,
    "name": "Audino",
    "isMega": false,
    "elo": 9543,
    "winRate": 41.3,
    "appearances": 9233,
    "wins": 3816,
    "losses": 5417,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 41.3,
        "games": 9233
      },
      {
        "name": "Hatterene",
        "winRate": 41.3,
        "games": 9233
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 41.3,
        "games": 9233
      },
      {
        "name": "Galarian Slowking",
        "winRate": 41.3,
        "games": 9233
      },
      {
        "name": "Sableye",
        "winRate": 41.3,
        "games": 9233
      }
    ],
    "bestSets": []
  },
  "534": {
    "id": 534,
    "name": "Conkeldurr",
    "isMega": false,
    "elo": 9628,
    "winRate": 49.9,
    "appearances": 66360,
    "wins": 33140,
    "losses": 33220,
    "bestPartners": [
      {
        "name": "Mega Alakazam",
        "winRate": 50.7,
        "games": 11306
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5732
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 5732
      },
      {
        "name": "Sylveon",
        "winRate": 50.7,
        "games": 5732
      },
      {
        "name": "Alakazam",
        "winRate": 50.3,
        "games": 11026
      }
    ],
    "bestSets": []
  },
  "547": {
    "id": 547,
    "name": "Whimsicott",
    "isMega": false,
    "elo": 9714,
    "winRate": 50.1,
    "appearances": 1051657,
    "wins": 527059,
    "losses": 524598,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 58.1,
        "games": 9524
      },
      {
        "name": "Archaludon",
        "winRate": 55.9,
        "games": 19264
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.6,
        "games": 5241
      },
      {
        "name": "Slowbro",
        "winRate": 53.7,
        "games": 25604
      },
      {
        "name": "Lucario",
        "winRate": 53.4,
        "games": 10301
      }
    ],
    "bestSets": []
  },
  "553": {
    "id": 553,
    "name": "Krookodile",
    "isMega": false,
    "elo": 9659,
    "winRate": 49.7,
    "appearances": 337490,
    "wins": 167788,
    "losses": 169702,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 55,
        "games": 35042
      },
      {
        "name": "Charizard",
        "winRate": 54.8,
        "games": 25096
      },
      {
        "name": "Hydreigon",
        "winRate": 54.4,
        "games": 35251
      },
      {
        "name": "Excadrill",
        "winRate": 53.3,
        "games": 51768
      },
      {
        "name": "Mega Charizard X",
        "winRate": 53.2,
        "games": 5411
      }
    ],
    "bestSets": []
  },
  "569": {
    "id": 569,
    "name": "Garbodor",
    "isMega": false,
    "elo": 9637,
    "winRate": 48.1,
    "appearances": 15638,
    "wins": 7517,
    "losses": 8121,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 50.8,
        "games": 5493
      },
      {
        "name": "Krookodile",
        "winRate": 50.8,
        "games": 5493
      },
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 5335
      },
      {
        "name": "Umbreon",
        "winRate": 49.6,
        "games": 5335
      },
      {
        "name": "Meowscarada",
        "winRate": 49.6,
        "games": 5335
      }
    ],
    "bestSets": []
  },
  "571": {
    "id": 571,
    "name": "Zoroark",
    "isMega": false,
    "elo": 9649,
    "winRate": 48.8,
    "appearances": 21209,
    "wins": 10360,
    "losses": 10849,
    "bestPartners": [
      {
        "name": "Beedrill",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Dragapult",
        "winRate": 51.1,
        "games": 5626
      },
      {
        "name": "Scizor",
        "winRate": 51,
        "games": 11081
      },
      {
        "name": "Froslass",
        "winRate": 51,
        "games": 11081
      },
      {
        "name": "Dragonite",
        "winRate": 51,
        "games": 5455
      }
    ],
    "bestSets": []
  },
  "584": {
    "id": 584,
    "name": "Vanilluxe",
    "isMega": false,
    "elo": 9675,
    "winRate": 49.7,
    "appearances": 16409,
    "wins": 8163,
    "losses": 8246,
    "bestPartners": [
      {
        "name": "Emolga",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Infernape",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 10843
      },
      {
        "name": "Garchomp",
        "winRate": 49.7,
        "games": 16409
      }
    ],
    "bestSets": []
  },
  "587": {
    "id": 587,
    "name": "Emolga",
    "isMega": false,
    "elo": 9574,
    "winRate": 43.2,
    "appearances": 58013,
    "wins": 25071,
    "losses": 32942,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 51,
        "games": 5752
      },
      {
        "name": "Slowbro",
        "winRate": 51,
        "games": 5752
      },
      {
        "name": "Vanilluxe",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Garchomp",
        "winRate": 50.7,
        "games": 5502
      },
      {
        "name": "Infernape",
        "winRate": 50.7,
        "games": 5502
      }
    ],
    "bestSets": []
  },
  "618": {
    "id": 618,
    "name": "Stunfisk",
    "isMega": false,
    "elo": 9663,
    "winRate": 49.8,
    "appearances": 38503,
    "wins": 19171,
    "losses": 19332,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Sandaconda",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Pawmot",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Garchomp",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 50.8,
        "games": 5634
      }
    ],
    "bestSets": []
  },
  "623": {
    "id": 623,
    "name": "Golurk",
    "isMega": false,
    "elo": 9695,
    "winRate": 49.9,
    "appearances": 16522,
    "wins": 8249,
    "losses": 8273,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 5517
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 5517
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5517
      },
      {
        "name": "Meowscarada",
        "winRate": 50.7,
        "games": 5517
      },
      {
        "name": "Kingambit",
        "winRate": 49.9,
        "games": 16522
      }
    ],
    "bestSets": []
  },
  "635": {
    "id": 635,
    "name": "Hydreigon",
    "isMega": false,
    "elo": 9653,
    "winRate": 52.8,
    "appearances": 167760,
    "wins": 88550,
    "losses": 79210,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Hisuian Typhlosion",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Abomasnow",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Charizard",
        "winRate": 63.2,
        "games": 8562
      }
    ],
    "bestSets": []
  },
  "637": {
    "id": 637,
    "name": "Volcarona",
    "isMega": false,
    "elo": 9648,
    "winRate": 50.1,
    "appearances": 22315,
    "wins": 11172,
    "losses": 11143,
    "bestPartners": [
      {
        "name": "Umbreon",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Rotom",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Sneasler",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Excadrill",
        "winRate": 50.5,
        "games": 5644
      }
    ],
    "bestSets": []
  },
  "652": {
    "id": 652,
    "name": "Chesnaught",
    "isMega": false,
    "elo": 9760,
    "winRate": 62.4,
    "appearances": 8619,
    "wins": 5380,
    "losses": 3239,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Metagross",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Heat Rotom",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Greninja",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Gengar",
        "winRate": 62.4,
        "games": 8619
      }
    ],
    "bestSets": []
  },
  "655": {
    "id": 655,
    "name": "Delphox",
    "isMega": false,
    "elo": 9631,
    "winRate": 50.8,
    "appearances": 16499,
    "wins": 8383,
    "losses": 8116,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 50.9,
        "games": 11033
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 11033
      },
      {
        "name": "Azumarill",
        "winRate": 50.9,
        "games": 11033
      },
      {
        "name": "Drampa",
        "winRate": 50.9,
        "games": 11033
      },
      {
        "name": "Greninja",
        "winRate": 50.9,
        "games": 11033
      }
    ],
    "bestSets": []
  },
  "658": {
    "id": 658,
    "name": "Greninja",
    "isMega": false,
    "elo": 9676,
    "winRate": 50.3,
    "appearances": 392660,
    "wins": 197621,
    "losses": 195039,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 65.2,
        "games": 4003
      },
      {
        "name": "Chesnaught",
        "winRate": 62.4,
        "games": 8619
      },
      {
        "name": "Weavile",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Kommo-o",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.2,
        "games": 17808
      }
    ],
    "bestSets": []
  },
  "660": {
    "id": 660,
    "name": "Diggersby",
    "isMega": false,
    "elo": 9701,
    "winRate": 50.4,
    "appearances": 16542,
    "wins": 8341,
    "losses": 8201,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5615
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.7,
        "games": 5615
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.7,
        "games": 5615
      },
      {
        "name": "Slowbro",
        "winRate": 50.5,
        "games": 11031
      },
      {
        "name": "Froslass",
        "winRate": 50.5,
        "games": 11126
      }
    ],
    "bestSets": []
  },
  "663": {
    "id": 663,
    "name": "Talonflame",
    "isMega": false,
    "elo": 9653,
    "winRate": 47.2,
    "appearances": 44734,
    "wins": 21095,
    "losses": 23639,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 60.1,
        "games": 4444
      },
      {
        "name": "Primarina",
        "winRate": 60.1,
        "games": 4444
      },
      {
        "name": "Pelipper",
        "winRate": 54.4,
        "games": 10063
      },
      {
        "name": "Mega Tyranitar",
        "winRate": 52.1,
        "games": 5435
      },
      {
        "name": "Metagross",
        "winRate": 52.1,
        "games": 5435
      }
    ],
    "bestSets": []
  },
  "666": {
    "id": 666,
    "name": "Vivillon",
    "isMega": false,
    "elo": 9623,
    "winRate": 45.5,
    "appearances": 15197,
    "wins": 6911,
    "losses": 8286,
    "bestPartners": [
      {
        "name": "Jolteon",
        "winRate": 49.8,
        "games": 5518
      },
      {
        "name": "Pelipper",
        "winRate": 49.8,
        "games": 5518
      },
      {
        "name": "Feraligatr",
        "winRate": 49.8,
        "games": 5518
      },
      {
        "name": "Pinsir",
        "winRate": 49.8,
        "games": 5518
      },
      {
        "name": "Gliscor",
        "winRate": 49.8,
        "games": 5518
      }
    ],
    "bestSets": []
  },
  "676": {
    "id": 676,
    "name": "Furfrou",
    "isMega": false,
    "elo": 9544,
    "winRate": 34.9,
    "appearances": 12473,
    "wins": 4347,
    "losses": 8126,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 44.8,
        "games": 4994
      },
      {
        "name": "Mimikyu",
        "winRate": 44.8,
        "games": 4994
      },
      {
        "name": "Incineroar",
        "winRate": 40.2,
        "games": 9190
      },
      {
        "name": "Arcanine",
        "winRate": 34.9,
        "games": 12473
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 34.9,
        "games": 8277
      }
    ],
    "bestSets": []
  },
  "678": {
    "id": 678,
    "name": "Meowstic",
    "isMega": false,
    "elo": 9660,
    "winRate": 44.5,
    "appearances": 19871,
    "wins": 8849,
    "losses": 11022,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.4,
        "games": 11086
      },
      {
        "name": "Kingambit",
        "winRate": 49.4,
        "games": 11086
      },
      {
        "name": "Krookodile",
        "winRate": 49.4,
        "games": 11086
      },
      {
        "name": "Azumarill",
        "winRate": 49.4,
        "games": 11086
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.4,
        "games": 11086
      }
    ],
    "bestSets": []
  },
  "681": {
    "id": 681,
    "name": "Aegislash",
    "isMega": false,
    "elo": 9698,
    "winRate": 50.2,
    "appearances": 457579,
    "wins": 229861,
    "losses": 227718,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 57,
        "games": 4755
      },
      {
        "name": "Mega Scizor",
        "winRate": 57,
        "games": 4755
      },
      {
        "name": "Starmie",
        "winRate": 56,
        "games": 4841
      },
      {
        "name": "Lucario",
        "winRate": 55.5,
        "games": 9769
      },
      {
        "name": "Archaludon",
        "winRate": 53.6,
        "games": 10172
      }
    ],
    "bestSets": []
  },
  "693": {
    "id": 693,
    "name": "Clawitzer",
    "isMega": false,
    "elo": 9644,
    "winRate": 49.7,
    "appearances": 16385,
    "wins": 8139,
    "losses": 8246,
    "bestPartners": [
      {
        "name": "Sandaconda",
        "winRate": 49.8,
        "games": 5481
      },
      {
        "name": "Dragonite",
        "winRate": 49.8,
        "games": 5481
      },
      {
        "name": "Samurott",
        "winRate": 49.8,
        "games": 5481
      },
      {
        "name": "Vaporeon",
        "winRate": 49.7,
        "games": 10891
      },
      {
        "name": "Arcanine",
        "winRate": 49.7,
        "games": 10975
      }
    ],
    "bestSets": []
  },
  "697": {
    "id": 697,
    "name": "Tyrantrum",
    "isMega": false,
    "elo": 9656,
    "winRate": 49.5,
    "appearances": 16536,
    "wins": 8180,
    "losses": 8356,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 49.9,
        "games": 5467
      },
      {
        "name": "Whimsicott",
        "winRate": 49.9,
        "games": 5467
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 49.6,
        "games": 11012
      },
      {
        "name": "Scizor",
        "winRate": 49.5,
        "games": 10991
      },
      {
        "name": "Azumarill",
        "winRate": 49.5,
        "games": 10991
      }
    ],
    "bestSets": []
  },
  "699": {
    "id": 699,
    "name": "Aurorus",
    "isMega": false,
    "elo": 9580,
    "winRate": 45.9,
    "appearances": 15217,
    "wins": 6990,
    "losses": 8227,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 49.4,
        "games": 5496
      },
      {
        "name": "Leafeon",
        "winRate": 49.4,
        "games": 5496
      },
      {
        "name": "Kommo-o",
        "winRate": 49.4,
        "games": 5496
      },
      {
        "name": "Dragapult",
        "winRate": 47.5,
        "games": 10518
      },
      {
        "name": "Serperior",
        "winRate": 46.2,
        "games": 10195
      }
    ],
    "bestSets": []
  },
  "700": {
    "id": 700,
    "name": "Sylveon",
    "isMega": false,
    "elo": 9640,
    "winRate": 49.7,
    "appearances": 53554,
    "wins": 26613,
    "losses": 26941,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 57.8,
        "games": 4581
      },
      {
        "name": "Dragapult",
        "winRate": 53,
        "games": 15358
      },
      {
        "name": "Whimsicott",
        "winRate": 52.3,
        "games": 15466
      },
      {
        "name": "Azumarill",
        "winRate": 51.4,
        "games": 5465
      },
      {
        "name": "Mega Scizor",
        "winRate": 51.4,
        "games": 5465
      }
    ],
    "bestSets": []
  },
  "701": {
    "id": 701,
    "name": "Hawlucha",
    "isMega": false,
    "elo": 9613,
    "winRate": 45.4,
    "appearances": 35058,
    "wins": 15900,
    "losses": 19158,
    "bestPartners": [
      {
        "name": "Mega Absol Z",
        "winRate": 50.2,
        "games": 5459
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.2,
        "games": 5459
      },
      {
        "name": "Armarouge",
        "winRate": 49.5,
        "games": 5542
      },
      {
        "name": "Crabominable",
        "winRate": 49.5,
        "games": 5542
      },
      {
        "name": "Archaludon",
        "winRate": 49.5,
        "games": 5542
      }
    ],
    "bestSets": []
  },
  "707": {
    "id": 707,
    "name": "Klefki",
    "isMega": false,
    "elo": 9723,
    "winRate": 46.6,
    "appearances": 51470,
    "wins": 24005,
    "losses": 27465,
    "bestPartners": [
      {
        "name": "Mega Meganium",
        "winRate": 50.4,
        "games": 5718
      },
      {
        "name": "Politoed",
        "winRate": 50.4,
        "games": 5718
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.4,
        "games": 5718
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 11242
      },
      {
        "name": "Scizor",
        "winRate": 50,
        "games": 5602
      }
    ],
    "bestSets": []
  },
  "711": {
    "id": 711,
    "name": "Gourgeist",
    "isMega": false,
    "elo": 9619,
    "winRate": 49.8,
    "appearances": 16174,
    "wins": 8058,
    "losses": 8116,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 5373
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.2,
        "games": 5373
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 5373
      },
      {
        "name": "Vaporeon",
        "winRate": 49.9,
        "games": 10783
      },
      {
        "name": "Blastoise",
        "winRate": 49.8,
        "games": 16174
      }
    ],
    "bestSets": []
  },
  "715": {
    "id": 715,
    "name": "Noivern",
    "isMega": false,
    "elo": 9616,
    "winRate": 47.4,
    "appearances": 69935,
    "wins": 33134,
    "losses": 36801,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 60.1,
        "games": 4444
      },
      {
        "name": "Charizard",
        "winRate": 60.1,
        "games": 4444
      },
      {
        "name": "Typhlosion",
        "winRate": 57.5,
        "games": 4756
      },
      {
        "name": "Kingambit",
        "winRate": 57.5,
        "games": 4756
      },
      {
        "name": "Hydreigon",
        "winRate": 57.5,
        "games": 4756
      }
    ],
    "bestSets": []
  },
  "724": {
    "id": 724,
    "name": "Decidueye",
    "isMega": false,
    "elo": 9655,
    "winRate": 49.7,
    "appearances": 38101,
    "wins": 18939,
    "losses": 19162,
    "bestPartners": [
      {
        "name": "Houndoom",
        "winRate": 50.9,
        "games": 11229
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Skarmory",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 16554
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 16554
      }
    ],
    "bestSets": []
  },
  "727": {
    "id": 727,
    "name": "Incineroar",
    "isMega": false,
    "elo": 9653,
    "winRate": 49.8,
    "appearances": 2092753,
    "wins": 1043177,
    "losses": 1049576,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 66.6,
        "games": 3999
      },
      {
        "name": "Weavile",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Archaludon",
        "winRate": 58,
        "games": 23301
      },
      {
        "name": "Mega Venusaur",
        "winRate": 57.3,
        "games": 4812
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.6,
        "games": 5241
      }
    ],
    "bestSets": []
  },
  "730": {
    "id": 730,
    "name": "Primarina",
    "isMega": false,
    "elo": 9720,
    "winRate": 53,
    "appearances": 40129,
    "wins": 21255,
    "losses": 18874,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Drampa",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Abomasnow",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Mega Garchomp",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Arcanine",
        "winRate": 61,
        "games": 4436
      }
    ],
    "bestSets": []
  },
  "733": {
    "id": 733,
    "name": "Toucannon",
    "isMega": false,
    "elo": 9616,
    "winRate": 50.9,
    "appearances": 16284,
    "wins": 8286,
    "losses": 7998,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Pawmot",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Metagross",
        "winRate": 51.9,
        "games": 10803
      },
      {
        "name": "Garchomp",
        "winRate": 50.9,
        "games": 16284
      }
    ],
    "bestSets": []
  },
  "740": {
    "id": 740,
    "name": "Crabominable",
    "isMega": false,
    "elo": 9581,
    "winRate": 50.2,
    "appearances": 77576,
    "wins": 38940,
    "losses": 38636,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 50.9,
        "games": 5592
      },
      {
        "name": "Lucario",
        "winRate": 50.9,
        "games": 5592
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.9,
        "games": 5592
      },
      {
        "name": "Mega Alakazam",
        "winRate": 50.8,
        "games": 11166
      },
      {
        "name": "Mega Starmie",
        "winRate": 50.8,
        "games": 5547
      }
    ],
    "bestSets": []
  },
  "745": {
    "id": 745,
    "name": "Lycanroc",
    "isMega": false,
    "elo": 9693,
    "winRate": 50.4,
    "appearances": 16804,
    "wins": 8474,
    "losses": 8330,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Skarmory",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5486
      },
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 5486
      }
    ],
    "bestSets": []
  },
  "748": {
    "id": 748,
    "name": "Toxapex",
    "isMega": false,
    "elo": 9570,
    "winRate": 47.6,
    "appearances": 115088,
    "wins": 54758,
    "losses": 60330,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 51.1,
        "games": 5693
      },
      {
        "name": "Charizard",
        "winRate": 51.1,
        "games": 5693
      },
      {
        "name": "Leafeon",
        "winRate": 51.1,
        "games": 5628
      },
      {
        "name": "Serperior",
        "winRate": 50.9,
        "games": 5758
      },
      {
        "name": "Garganacl",
        "winRate": 50.8,
        "games": 5472
      }
    ],
    "bestSets": []
  },
  "750": {
    "id": 750,
    "name": "Mudsdale",
    "isMega": false,
    "elo": 9640,
    "winRate": 49.8,
    "appearances": 16155,
    "wins": 8046,
    "losses": 8109,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.2,
        "games": 5364
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 5364
      },
      {
        "name": "Vaporeon",
        "winRate": 50.2,
        "games": 5364
      },
      {
        "name": "Dragonite",
        "winRate": 50.2,
        "games": 5364
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50,
        "games": 5341
      }
    ],
    "bestSets": []
  },
  "752": {
    "id": 752,
    "name": "Araquanid",
    "isMega": false,
    "elo": 9575,
    "winRate": 44.6,
    "appearances": 38260,
    "wins": 17047,
    "losses": 21213,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 54.1,
        "games": 5104
      },
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 5104
      },
      {
        "name": "Dragonite",
        "winRate": 54.1,
        "games": 5104
      },
      {
        "name": "Mega Delphox",
        "winRate": 52.1,
        "games": 10350
      },
      {
        "name": "Azumarill",
        "winRate": 52.1,
        "games": 10350
      }
    ],
    "bestSets": []
  },
  "763": {
    "id": 763,
    "name": "Tsareena",
    "isMega": false,
    "elo": 9650,
    "winRate": 51.1,
    "appearances": 16412,
    "wins": 8386,
    "losses": 8026,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 52.9,
        "games": 5186
      },
      {
        "name": "Heat Rotom",
        "winRate": 52.9,
        "games": 5186
      },
      {
        "name": "Greninja",
        "winRate": 52.9,
        "games": 5186
      },
      {
        "name": "Palafin",
        "winRate": 51.9,
        "games": 10879
      },
      {
        "name": "Charizard",
        "winRate": 51.9,
        "games": 10879
      }
    ],
    "bestSets": []
  },
  "765": {
    "id": 765,
    "name": "Oranguru",
    "isMega": false,
    "elo": 9712,
    "winRate": 50.5,
    "appearances": 27880,
    "wins": 14081,
    "losses": 13799,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 50.5,
        "games": 27880
      },
      {
        "name": "Venusaur",
        "winRate": 50.5,
        "games": 27880
      },
      {
        "name": "Incineroar",
        "winRate": 50.5,
        "games": 27880
      },
      {
        "name": "Hatterene",
        "winRate": 50.5,
        "games": 27880
      },
      {
        "name": "Rhyperior",
        "winRate": 50.5,
        "games": 22413
      }
    ],
    "bestSets": []
  },
  "778": {
    "id": 778,
    "name": "Mimikyu",
    "isMega": false,
    "elo": 9612,
    "winRate": 48,
    "appearances": 42225,
    "wins": 20269,
    "losses": 21956,
    "bestPartners": [
      {
        "name": "Mega Lopunny",
        "winRate": 50.6,
        "games": 5516
      },
      {
        "name": "Rhyperior",
        "winRate": 50.5,
        "games": 5460
      },
      {
        "name": "Ursaluna",
        "winRate": 50.5,
        "games": 5460
      },
      {
        "name": "Kingambit",
        "winRate": 50.5,
        "games": 5460
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 5460
      }
    ],
    "bestSets": []
  },
  "780": {
    "id": 780,
    "name": "Drampa",
    "isMega": false,
    "elo": 9672,
    "winRate": 49.8,
    "appearances": 128440,
    "wins": 63918,
    "losses": 64522,
    "bestPartners": [
      {
        "name": "Hisuian Typhlosion",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Primarina",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Abomasnow",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Hydreigon",
        "winRate": 56.4,
        "games": 9702
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 55.8,
        "games": 9386
      }
    ],
    "bestSets": []
  },
  "784": {
    "id": 784,
    "name": "Kommo-o",
    "isMega": false,
    "elo": 9723,
    "winRate": 52.2,
    "appearances": 74738,
    "wins": 38983,
    "losses": 35755,
    "bestPartners": [
      {
        "name": "Mega Feraligatr",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Arcanine",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Archaludon",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Heat Rotom",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Greninja",
        "winRate": 61.6,
        "games": 4376
      }
    ],
    "bestSets": []
  },
  "823": {
    "id": 823,
    "name": "Corviknight",
    "isMega": false,
    "elo": 9686,
    "winRate": 50.9,
    "appearances": 178052,
    "wins": 90553,
    "losses": 87499,
    "bestPartners": [
      {
        "name": "Scovillain",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Tyranitar",
        "winRate": 61.4,
        "games": 12918
      },
      {
        "name": "Mega Gyarados",
        "winRate": 58.9,
        "games": 4548
      },
      {
        "name": "Gliscor",
        "winRate": 58.9,
        "games": 4548
      },
      {
        "name": "Archaludon",
        "winRate": 58.6,
        "games": 22892
      }
    ],
    "bestSets": []
  },
  "844": {
    "id": 844,
    "name": "Sandaconda",
    "isMega": false,
    "elo": 9654,
    "winRate": 50.4,
    "appearances": 16375,
    "wins": 8252,
    "losses": 8123,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Rhyperior",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Stunfisk",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Pawmot",
        "winRate": 51,
        "games": 5584
      },
      {
        "name": "Garchomp",
        "winRate": 51,
        "games": 5584
      }
    ],
    "bestSets": []
  },
  "855": {
    "id": 855,
    "name": "Polteageist",
    "isMega": false,
    "elo": 9689,
    "winRate": 47.2,
    "appearances": 14884,
    "wins": 7023,
    "losses": 7861,
    "bestPartners": [
      {
        "name": "Mega Lopunny",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Gardevoir",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Alakazam",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Snorlax",
        "winRate": 49.3,
        "games": 5582
      }
    ],
    "bestSets": []
  },
  "858": {
    "id": 858,
    "name": "Hatterene",
    "isMega": false,
    "elo": 9724,
    "winRate": 50.1,
    "appearances": 517520,
    "wins": 259081,
    "losses": 258439,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 57.3,
        "games": 4536
      },
      {
        "name": "Snorlax",
        "winRate": 53.5,
        "games": 15473
      },
      {
        "name": "Tyranitar",
        "winRate": 52.2,
        "games": 26095
      },
      {
        "name": "Slowbro",
        "winRate": 51.9,
        "games": 15111
      },
      {
        "name": "Scizor",
        "winRate": 51.5,
        "games": 5525
      }
    ],
    "bestSets": []
  },
  "866": {
    "id": 866,
    "name": "Mr. Rime",
    "isMega": false,
    "elo": 9646,
    "winRate": 49.9,
    "appearances": 16628,
    "wins": 8297,
    "losses": 8331,
    "bestPartners": [
      {
        "name": "Steelix",
        "winRate": 50.4,
        "games": 5659
      },
      {
        "name": "Drampa",
        "winRate": 50.4,
        "games": 5659
      },
      {
        "name": "Ursaluna",
        "winRate": 50.4,
        "games": 5659
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 5398
      },
      {
        "name": "Kingambit",
        "winRate": 50.1,
        "games": 5398
      }
    ],
    "bestSets": []
  },
  "867": {
    "id": 867,
    "name": "Runerigus",
    "isMega": false,
    "elo": 9574,
    "winRate": 50.3,
    "appearances": 16319,
    "wins": 8206,
    "losses": 8113,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 50.6,
        "games": 5552
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.6,
        "games": 5552
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 5552
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 5552
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 5552
      }
    ],
    "bestSets": []
  },
  "869": {
    "id": 869,
    "name": "Alcremie",
    "isMega": false,
    "elo": 9698,
    "winRate": 56.7,
    "appearances": 14209,
    "wins": 8053,
    "losses": 6156,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Scizor",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Metagross",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Rotom",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 8716
      }
    ],
    "bestSets": []
  },
  "877": {
    "id": 877,
    "name": "Morpeko",
    "isMega": false,
    "elo": 9664,
    "winRate": 49.1,
    "appearances": 21678,
    "wins": 10636,
    "losses": 11042,
    "bestPartners": [
      {
        "name": "Mega Glimmora",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Abomasnow",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Pelipper",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Mow Rotom",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.8,
        "games": 5615
      }
    ],
    "bestSets": []
  },
  "887": {
    "id": 887,
    "name": "Dragapult",
    "isMega": false,
    "elo": 9657,
    "winRate": 50.5,
    "appearances": 1005714,
    "wins": 507887,
    "losses": 497827,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Alcremie",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Mega Greninja",
        "winRate": 60.3,
        "games": 9028
      },
      {
        "name": "Gliscor",
        "winRate": 58.9,
        "games": 4548
      },
      {
        "name": "Archaludon",
        "winRate": 57.5,
        "games": 13941
      }
    ],
    "bestSets": []
  },
  "900": {
    "id": 900,
    "name": "Kleavor",
    "isMega": false,
    "elo": 9617,
    "winRate": 52.8,
    "appearances": 15557,
    "wins": 8211,
    "losses": 7346,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 55.3,
        "games": 4994
      },
      {
        "name": "Feraligatr",
        "winRate": 55.3,
        "games": 4994
      },
      {
        "name": "Gyarados",
        "winRate": 54.5,
        "games": 10089
      },
      {
        "name": "Archaludon",
        "winRate": 54.5,
        "games": 10089
      },
      {
        "name": "Excadrill",
        "winRate": 53.7,
        "games": 5095
      }
    ],
    "bestSets": []
  },
  "901": {
    "id": 901,
    "name": "Ursaluna",
    "isMega": false,
    "elo": 9683,
    "winRate": 50,
    "appearances": 49834,
    "wins": 24940,
    "losses": 24894,
    "bestPartners": [
      {
        "name": "Mega Starmie",
        "winRate": 50.7,
        "games": 10911
      },
      {
        "name": "Torkoal",
        "winRate": 50.6,
        "games": 5364
      },
      {
        "name": "Kommo-o",
        "winRate": 50.6,
        "games": 5364
      },
      {
        "name": "Hydreigon",
        "winRate": 50.6,
        "games": 5364
      },
      {
        "name": "Mimikyu",
        "winRate": 50.5,
        "games": 5460
      }
    ],
    "bestSets": []
  },
  "902": {
    "id": 902,
    "name": "Basculegion",
    "isMega": false,
    "elo": 9704,
    "winRate": 49.2,
    "appearances": 16180,
    "wins": 7955,
    "losses": 8225,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.6,
        "games": 5419
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 5419
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 5419
      },
      {
        "name": "Meowscarada",
        "winRate": 50.6,
        "games": 5419
      },
      {
        "name": "Hydreigon",
        "winRate": 50.4,
        "games": 11093
      }
    ],
    "bestSets": []
  },
  "903": {
    "id": 903,
    "name": "Sneasler",
    "isMega": false,
    "elo": 9619,
    "winRate": 50,
    "appearances": 22299,
    "wins": 11155,
    "losses": 11144,
    "bestPartners": [
      {
        "name": "Umbreon",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Rotom",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Volcarona",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5630
      },
      {
        "name": "Farigiraf",
        "winRate": 50.3,
        "games": 5652
      }
    ],
    "bestSets": []
  },
  "908": {
    "id": 908,
    "name": "Meowscarada",
    "isMega": false,
    "elo": 9614,
    "winRate": 49.8,
    "appearances": 141956,
    "wins": 70637,
    "losses": 71319,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 51,
        "games": 10866
      },
      {
        "name": "Mega Froslass",
        "winRate": 51,
        "games": 5423
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 51,
        "games": 5423
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 51,
        "games": 5780
      },
      {
        "name": "Meganium",
        "winRate": 51,
        "games": 5780
      }
    ],
    "bestSets": []
  },
  "914": {
    "id": 914,
    "name": "Quaquaval",
    "isMega": false,
    "elo": 9603,
    "winRate": 48.5,
    "appearances": 21862,
    "wins": 10600,
    "losses": 11262,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 5693
      },
      {
        "name": "Metagross",
        "winRate": 50.2,
        "games": 5693
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.2,
        "games": 5693
      },
      {
        "name": "Flareon",
        "winRate": 50.1,
        "games": 5647
      },
      {
        "name": "Noivern",
        "winRate": 50.1,
        "games": 5647
      }
    ],
    "bestSets": []
  },
  "923": {
    "id": 923,
    "name": "Pawmot",
    "isMega": false,
    "elo": 9633,
    "winRate": 50.9,
    "appearances": 39017,
    "wins": 19856,
    "losses": 19161,
    "bestPartners": [
      {
        "name": "Toucannon",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Metagross",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Garchomp",
        "winRate": 51,
        "games": 27585
      }
    ],
    "bestSets": []
  },
  "925": {
    "id": 925,
    "name": "Maushold",
    "isMega": false,
    "elo": 9613,
    "winRate": 43.9,
    "appearances": 14529,
    "wins": 6380,
    "losses": 8149,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5685
      },
      {
        "name": "Garchomp",
        "winRate": 50.7,
        "games": 5685
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 5685
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 5685
      },
      {
        "name": "Incineroar",
        "winRate": 43.9,
        "games": 14529
      }
    ],
    "bestSets": []
  },
  "934": {
    "id": 934,
    "name": "Garganacl",
    "isMega": false,
    "elo": 9673,
    "winRate": 49.7,
    "appearances": 37527,
    "wins": 18638,
    "losses": 18889,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 52.1,
        "games": 10463
      },
      {
        "name": "Dragapult",
        "winRate": 51.1,
        "games": 27126
      },
      {
        "name": "Azumarill",
        "winRate": 51.1,
        "games": 11159
      },
      {
        "name": "Garchomp",
        "winRate": 50.9,
        "games": 16419
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 16211
      }
    ],
    "bestSets": []
  },
  "936": {
    "id": 936,
    "name": "Armarouge",
    "isMega": false,
    "elo": 9635,
    "winRate": 49.4,
    "appearances": 16543,
    "wins": 8170,
    "losses": 8373,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 50,
        "games": 5643
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 5643
      },
      {
        "name": "Greninja",
        "winRate": 50,
        "games": 5643
      },
      {
        "name": "Azumarill",
        "winRate": 50,
        "games": 5643
      },
      {
        "name": "Archaludon",
        "winRate": 49.5,
        "games": 5542
      }
    ],
    "bestSets": []
  },
  "937": {
    "id": 937,
    "name": "Ceruledge",
    "isMega": false,
    "elo": 9608,
    "winRate": 49.8,
    "appearances": 16480,
    "wins": 8206,
    "losses": 8274,
    "bestPartners": [
      {
        "name": "Mega Absol",
        "winRate": 50.4,
        "games": 5582
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.4,
        "games": 5582
      },
      {
        "name": "Dragapult",
        "winRate": 50.4,
        "games": 5582
      },
      {
        "name": "Rotom",
        "winRate": 50.4,
        "games": 5582
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 10978
      }
    ],
    "bestSets": []
  },
  "952": {
    "id": 952,
    "name": "Scovillain",
    "isMega": false,
    "elo": 9775,
    "winRate": 57.3,
    "appearances": 18664,
    "wins": 10689,
    "losses": 7975,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Tyranitar",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Corviknight",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Kingambit",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Archaludon",
        "winRate": 61.5,
        "games": 8606
      }
    ],
    "bestSets": []
  },
  "959": {
    "id": 959,
    "name": "Tinkaton",
    "isMega": false,
    "elo": 9688,
    "winRate": 50.1,
    "appearances": 59547,
    "wins": 29848,
    "losses": 29699,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 57.9,
        "games": 4844
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 53.6,
        "games": 10368
      },
      {
        "name": "Gyarados",
        "winRate": 53.6,
        "games": 10368
      },
      {
        "name": "Heat Rotom",
        "winRate": 53.6,
        "games": 10368
      },
      {
        "name": "Mega Scovillain",
        "winRate": 50.7,
        "games": 5559
      }
    ],
    "bestSets": []
  },
  "964": {
    "id": 964,
    "name": "Palafin",
    "isMega": false,
    "elo": 9641,
    "winRate": 50.2,
    "appearances": 237714,
    "wins": 119233,
    "losses": 118481,
    "bestPartners": [
      {
        "name": "Tsareena",
        "winRate": 51.9,
        "games": 10879
      },
      {
        "name": "Heat Rotom",
        "winRate": 51.5,
        "games": 10762
      },
      {
        "name": "Toxapex",
        "winRate": 51.1,
        "games": 5693
      },
      {
        "name": "Aegislash",
        "winRate": 51,
        "games": 11223
      },
      {
        "name": "Charizard",
        "winRate": 51,
        "games": 16292
      }
    ],
    "bestSets": []
  },
  "968": {
    "id": 968,
    "name": "Orthworm",
    "isMega": false,
    "elo": 9691,
    "winRate": 50.5,
    "appearances": 26903,
    "wins": 13574,
    "losses": 13329,
    "bestPartners": [
      {
        "name": "Mega Hawlucha",
        "winRate": 53.8,
        "games": 5153
      },
      {
        "name": "Empoleon",
        "winRate": 53.8,
        "games": 5153
      },
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 5153
      },
      {
        "name": "Mega Aerodactyl",
        "winRate": 51.7,
        "games": 5303
      },
      {
        "name": "Greninja",
        "winRate": 51.7,
        "games": 5303
      }
    ],
    "bestSets": []
  },
  "970": {
    "id": 970,
    "name": "Glimmora",
    "isMega": false,
    "elo": 9593,
    "winRate": 49.7,
    "appearances": 10823,
    "wins": 5381,
    "losses": 5442,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 10823
      },
      {
        "name": "Dragonite",
        "winRate": 49.7,
        "games": 10823
      },
      {
        "name": "Feraligatr",
        "winRate": 49.7,
        "games": 10823
      },
      {
        "name": "Politoed",
        "winRate": 49.7,
        "games": 10823
      },
      {
        "name": "Scizor",
        "winRate": 49.7,
        "games": 10823
      }
    ],
    "bestSets": []
  },
  "977": {
    "id": 977,
    "name": "Dondozo",
    "isMega": false,
    "elo": 9678,
    "winRate": 49.7,
    "appearances": 55035,
    "wins": 27362,
    "losses": 27673,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 51.5,
        "games": 5525
      },
      {
        "name": "Garchomp",
        "winRate": 49.8,
        "games": 43957
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 55035
      },
      {
        "name": "Tatsugiri",
        "winRate": 49.7,
        "games": 55035
      },
      {
        "name": "Hatterene",
        "winRate": 49.7,
        "games": 49495
      }
    ],
    "bestSets": []
  },
  "978": {
    "id": 978,
    "name": "Tatsugiri",
    "isMega": false,
    "elo": 9670,
    "winRate": 49.7,
    "appearances": 66323,
    "wins": 32993,
    "losses": 33330,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.4,
        "games": 16813
      },
      {
        "name": "Corviknight",
        "winRate": 49.9,
        "games": 11288
      },
      {
        "name": "Arcanine",
        "winRate": 49.9,
        "games": 11288
      },
      {
        "name": "Skarmory",
        "winRate": 49.9,
        "games": 11288
      },
      {
        "name": "Garchomp",
        "winRate": 49.8,
        "games": 43957
      }
    ],
    "bestSets": []
  },
  "981": {
    "id": 981,
    "name": "Farigiraf",
    "isMega": false,
    "elo": 9626,
    "winRate": 46.9,
    "appearances": 15633,
    "wins": 7334,
    "losses": 8299,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5627
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.5,
        "games": 5627
      },
      {
        "name": "Infernape",
        "winRate": 50.5,
        "games": 5627
      },
      {
        "name": "Heracross",
        "winRate": 50.5,
        "games": 5627
      },
      {
        "name": "Crabominable",
        "winRate": 50.4,
        "games": 11279
      }
    ],
    "bestSets": []
  },
  "983": {
    "id": 983,
    "name": "Kingambit",
    "isMega": false,
    "elo": 9656,
    "winRate": 50.9,
    "appearances": 796978,
    "wins": 405674,
    "losses": 391304,
    "bestPartners": [
      {
        "name": "Scovillain",
        "winRate": 61.5,
        "games": 8606
      },
      {
        "name": "Aerodactyl",
        "winRate": 61.4,
        "games": 12918
      },
      {
        "name": "Mega Scovillain",
        "winRate": 61.3,
        "games": 4312
      },
      {
        "name": "Alcremie",
        "winRate": 61.1,
        "games": 4344
      },
      {
        "name": "Mega Clefable",
        "winRate": 59.9,
        "games": 9073
      }
    ],
    "bestSets": []
  },
  "1013": {
    "id": 1013,
    "name": "Sinistcha",
    "isMega": false,
    "elo": 9691,
    "winRate": 49.9,
    "appearances": 16537,
    "wins": 8254,
    "losses": 8283,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 50.4,
        "games": 5390
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 50.4,
        "games": 5390
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 5390
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 5390
      },
      {
        "name": "Empoleon",
        "winRate": 50,
        "games": 5600
      }
    ],
    "bestSets": []
  },
  "1018": {
    "id": 1018,
    "name": "Archaludon",
    "isMega": false,
    "elo": 9653,
    "winRate": 56.1,
    "appearances": 175035,
    "wins": 98133,
    "losses": 76902,
    "bestPartners": [
      {
        "name": "Mega Feraligatr",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Kommo-o",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Heat Rotom",
        "winRate": 71.6,
        "games": 7549
      },
      {
        "name": "Slowbro",
        "winRate": 68.9,
        "games": 3909
      },
      {
        "name": "Scovillain",
        "winRate": 61.5,
        "games": 8606
      }
    ],
    "bestSets": []
  },
  "1019": {
    "id": 1019,
    "name": "Hydrapple",
    "isMega": false,
    "elo": 9615,
    "winRate": 51.6,
    "appearances": 15830,
    "wins": 8166,
    "losses": 7664,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 56.2,
        "games": 4861
      },
      {
        "name": "Wash Rotom",
        "winRate": 56.2,
        "games": 4861
      },
      {
        "name": "Charizard",
        "winRate": 53.1,
        "games": 10229
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 53.1,
        "games": 10229
      },
      {
        "name": "Azumarill",
        "winRate": 52.3,
        "games": 10462
      }
    ],
    "bestSets": []
  },
  "5059": {
    "id": 5059,
    "name": "Hisuian Arcanine",
    "isMega": false,
    "elo": 9737,
    "winRate": 48.4,
    "appearances": 381682,
    "wins": 184742,
    "losses": 196940,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 56.2,
        "games": 4861
      },
      {
        "name": "Toucannon",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Pawmot",
        "winRate": 53.8,
        "games": 5127
      },
      {
        "name": "Hydrapple",
        "winRate": 53.1,
        "games": 10229
      }
    ],
    "bestSets": []
  },
  "5157": {
    "id": 5157,
    "name": "Hisuian Typhlosion",
    "isMega": false,
    "elo": 9679,
    "winRate": 53,
    "appearances": 14392,
    "wins": 7630,
    "losses": 6762,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Hydreigon",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Drampa",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Abomasnow",
        "winRate": 56.7,
        "games": 9334
      },
      {
        "name": "Primarina",
        "winRate": 54.7,
        "games": 9086
      }
    ],
    "bestSets": []
  },
  "6080": {
    "id": 6080,
    "name": "Galarian Slowbro",
    "isMega": false,
    "elo": 9620,
    "winRate": 45.8,
    "appearances": 60657,
    "wins": 27756,
    "losses": 32901,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 50.7,
        "games": 5708
      },
      {
        "name": "Politoed",
        "winRate": 50.7,
        "games": 5608
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Slowking",
        "winRate": 50.6,
        "games": 5633
      }
    ],
    "bestSets": []
  },
  "6199": {
    "id": 6199,
    "name": "Galarian Slowking",
    "isMega": false,
    "elo": 9642,
    "winRate": 41.3,
    "appearances": 18528,
    "wins": 7657,
    "losses": 10871,
    "bestPartners": [
      {
        "name": "Mega Audino",
        "winRate": 46.7,
        "games": 5099
      },
      {
        "name": "Gyarados",
        "winRate": 43.2,
        "games": 14332
      },
      {
        "name": "Hatterene",
        "winRate": 43.2,
        "games": 14332
      },
      {
        "name": "Sableye",
        "winRate": 43.2,
        "games": 14332
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 41.3,
        "games": 18528
      }
    ],
    "bestSets": []
  },
  "6618": {
    "id": 6618,
    "name": "Galarian Stunfisk",
    "isMega": false,
    "elo": 9663,
    "winRate": 49.7,
    "appearances": 70473,
    "wins": 34998,
    "losses": 35475,
    "bestPartners": [
      {
        "name": "Mega Heracross",
        "winRate": 51.7,
        "games": 5426
      },
      {
        "name": "Corviknight",
        "winRate": 51.7,
        "games": 5426
      },
      {
        "name": "Alolan Raichu",
        "winRate": 51.7,
        "games": 5426
      },
      {
        "name": "Archaludon",
        "winRate": 50.5,
        "games": 21957
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 16391
      }
    ],
    "bestSets": []
  },
  "10008": {
    "id": 10008,
    "name": "Heat Rotom",
    "isMega": false,
    "elo": 9680,
    "winRate": 54.7,
    "appearances": 106796,
    "wins": 58424,
    "losses": 48372,
    "bestPartners": [
      {
        "name": "Mega Feraligatr",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Kommo-o",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Hydreigon",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Archaludon",
        "winRate": 71.6,
        "games": 7549
      },
      {
        "name": "Mega Greninja",
        "winRate": 71.2,
        "games": 3750
      }
    ],
    "bestSets": []
  },
  "10009": {
    "id": 10009,
    "name": "Wash Rotom",
    "isMega": false,
    "elo": 9622,
    "winRate": 51.6,
    "appearances": 134731,
    "wins": 69554,
    "losses": 65177,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 57.4,
        "games": 9499
      },
      {
        "name": "Mega Pinsir",
        "winRate": 56.6,
        "games": 4791
      },
      {
        "name": "Archaludon",
        "winRate": 56.4,
        "games": 19203
      },
      {
        "name": "Hydrapple",
        "winRate": 56.2,
        "games": 4861
      },
      {
        "name": "Charizard",
        "winRate": 56.2,
        "games": 4861
      }
    ],
    "bestSets": []
  },
  "10010": {
    "id": 10010,
    "name": "Frost Rotom",
    "isMega": false,
    "elo": 9607,
    "winRate": 42.3,
    "appearances": 14290,
    "wins": 6049,
    "losses": 8241,
    "bestPartners": [
      {
        "name": "Dragonite",
        "winRate": 49.5,
        "games": 5530
      },
      {
        "name": "Charizard",
        "winRate": 49.5,
        "games": 5530
      },
      {
        "name": "Garchomp",
        "winRate": 49.5,
        "games": 5530
      },
      {
        "name": "Pelipper",
        "winRate": 49.5,
        "games": 5530
      },
      {
        "name": "Gyarados",
        "winRate": 45.5,
        "games": 10104
      }
    ],
    "bestSets": []
  },
  "10011": {
    "id": 10011,
    "name": "Fan Rotom",
    "isMega": false,
    "elo": 9702,
    "winRate": 50.6,
    "appearances": 27231,
    "wins": 13785,
    "losses": 13446,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 53.2,
        "games": 5131
      },
      {
        "name": "Archaludon",
        "winRate": 53.2,
        "games": 5131
      },
      {
        "name": "Arcanine",
        "winRate": 51.8,
        "games": 10649
      },
      {
        "name": "Lucario",
        "winRate": 51.8,
        "games": 10649
      },
      {
        "name": "Aggron",
        "winRate": 51.8,
        "games": 10649
      }
    ],
    "bestSets": []
  },
  "10012": {
    "id": 10012,
    "name": "Mow Rotom",
    "isMega": false,
    "elo": 9760,
    "winRate": 50.3,
    "appearances": 27249,
    "wins": 13698,
    "losses": 13551,
    "bestPartners": [
      {
        "name": "Orthworm",
        "winRate": 51.7,
        "games": 5303
      },
      {
        "name": "Greninja",
        "winRate": 51.7,
        "games": 5303
      },
      {
        "name": "Gyarados",
        "winRate": 51.7,
        "games": 5303
      },
      {
        "name": "Mega Aerodactyl",
        "winRate": 51.3,
        "games": 10903
      },
      {
        "name": "Mega Feraligatr",
        "winRate": 51.2,
        "games": 5644
      }
    ],
    "bestSets": []
  },
  "10100": {
    "id": 10100,
    "name": "Alolan Raichu",
    "isMega": false,
    "elo": 9743,
    "winRate": 50.7,
    "appearances": 58119,
    "wins": 29468,
    "losses": 28651,
    "bestPartners": [
      {
        "name": "Alcremie",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Archaludon",
        "winRate": 55.4,
        "games": 14711
      },
      {
        "name": "Dragapult",
        "winRate": 55.1,
        "games": 9838
      },
      {
        "name": "Mega Emboar",
        "winRate": 54.5,
        "games": 4913
      }
    ],
    "bestSets": []
  },
  "10103": {
    "id": 10103,
    "name": "Alolan Ninetales",
    "isMega": false,
    "elo": 9669,
    "winRate": 50.4,
    "appearances": 103408,
    "wins": 52154,
    "losses": 51254,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 54.6,
        "games": 4981
      },
      {
        "name": "Incineroar",
        "winRate": 52.1,
        "games": 10344
      },
      {
        "name": "Kingambit",
        "winRate": 52,
        "games": 10437
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 51.6,
        "games": 5364
      },
      {
        "name": "Mega Garchomp",
        "winRate": 51.5,
        "games": 5403
      }
    ],
    "bestSets": []
  },
  "10336": {
    "id": 10336,
    "name": "Hisuian Samurott",
    "isMega": false,
    "elo": 9746,
    "winRate": 51.9,
    "appearances": 41967,
    "wins": 21765,
    "losses": 20202,
    "bestPartners": [
      {
        "name": "Hisuian Typhlosion",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Hydreigon",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Primarina",
        "winRate": 65.3,
        "games": 4028
      },
      {
        "name": "Abomasnow",
        "winRate": 56.9,
        "games": 9643
      },
      {
        "name": "Drampa",
        "winRate": 55.8,
        "games": 9386
      }
    ],
    "bestSets": []
  },
  "10340": {
    "id": 10340,
    "name": "Hisuian Zoroark",
    "isMega": false,
    "elo": 9687,
    "winRate": 50.5,
    "appearances": 139116,
    "wins": 70185,
    "losses": 68931,
    "bestPartners": [
      {
        "name": "Alcremie",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Empoleon",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Alolan Raichu",
        "winRate": 60.9,
        "games": 4372
      },
      {
        "name": "Archaludon",
        "winRate": 57.2,
        "games": 9413
      },
      {
        "name": "Hydreigon",
        "winRate": 57,
        "games": 4755
      }
    ],
    "bestSets": []
  },
  "10341": {
    "id": 10341,
    "name": "Hisuian Decidueye",
    "isMega": false,
    "elo": 9651,
    "winRate": 47.4,
    "appearances": 46905,
    "wins": 22241,
    "losses": 24664,
    "bestPartners": [
      {
        "name": "Lycanroc",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Decidueye",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Pelipper",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Skarmory",
        "winRate": 50.9,
        "games": 5699
      },
      {
        "name": "Mega Glimmora",
        "winRate": 49.6,
        "games": 5399
      }
    ],
    "bestSets": []
  },
  "658-mega": {
    "id": 658,
    "name": "Mega Greninja",
    "isMega": true,
    "elo": 9784,
    "winRate": 56.3,
    "appearances": 14563,
    "wins": 8198,
    "losses": 6365,
    "bestPartners": [
      {
        "name": "Venusaur",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Metagross",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Heat Rotom",
        "winRate": 71.2,
        "games": 3750
      },
      {
        "name": "Dragapult",
        "winRate": 60.3,
        "games": 9028
      },
      {
        "name": "Scizor",
        "winRate": 60.3,
        "games": 9028
      }
    ],
    "bestSets": []
  },
  "445-mega": {
    "id": 445,
    "name": "Mega Garchomp",
    "isMega": true,
    "elo": 9782,
    "winRate": 54.1,
    "appearances": 20561,
    "wins": 11114,
    "losses": 9447,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Primarina",
        "winRate": 61,
        "games": 4436
      },
      {
        "name": "Azumarill",
        "winRate": 55.8,
        "games": 9839
      },
      {
        "name": "Empoleon",
        "winRate": 55.2,
        "games": 9917
      },
      {
        "name": "Incineroar",
        "winRate": 54.6,
        "games": 5241
      }
    ],
    "bestSets": []
  },
  "121-mega": {
    "id": 121,
    "name": "Mega Starmie",
    "isMega": true,
    "elo": 9718,
    "winRate": 50.3,
    "appearances": 16574,
    "wins": 8340,
    "losses": 8234,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.8,
        "games": 5547
      },
      {
        "name": "Crabominable",
        "winRate": 50.8,
        "games": 5547
      },
      {
        "name": "Drampa",
        "winRate": 50.8,
        "games": 5547
      },
      {
        "name": "Ursaluna",
        "winRate": 50.7,
        "games": 10911
      },
      {
        "name": "Torkoal",
        "winRate": 50.6,
        "games": 5364
      }
    ],
    "bestSets": []
  },
  "160-mega": {
    "id": 160,
    "name": "Mega Feraligatr",
    "isMega": true,
    "elo": 9715,
    "winRate": 53.8,
    "appearances": 25353,
    "wins": 13632,
    "losses": 11721,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Archaludon",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Heat Rotom",
        "winRate": 74.5,
        "games": 3640
      },
      {
        "name": "Hydreigon",
        "winRate": 60.3,
        "games": 9284
      },
      {
        "name": "Arcanine",
        "winRate": 60.3,
        "games": 8941
      }
    ],
    "bestSets": []
  },
  "282-mega": {
    "id": 282,
    "name": "Mega Gardevoir",
    "isMega": true,
    "elo": 9713,
    "winRate": 50.1,
    "appearances": 456791,
    "wins": 228642,
    "losses": 228149,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 51,
        "games": 16711
      },
      {
        "name": "Venusaur",
        "winRate": 51,
        "games": 16711
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.9,
        "games": 10942
      },
      {
        "name": "Stunfisk",
        "winRate": 50.8,
        "games": 5634
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.7,
        "games": 11296
      }
    ],
    "bestSets": []
  },
  "500-mega": {
    "id": 500,
    "name": "Mega Emboar",
    "isMega": true,
    "elo": 9709,
    "winRate": 51.4,
    "appearances": 15607,
    "wins": 8016,
    "losses": 7591,
    "bestPartners": [
      {
        "name": "Alolan Raichu",
        "winRate": 54.5,
        "games": 4913
      },
      {
        "name": "Archaludon",
        "winRate": 54.5,
        "games": 4913
      },
      {
        "name": "Metagross",
        "winRate": 52.1,
        "games": 10352
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.1,
        "games": 10352
      },
      {
        "name": "Whimsicott",
        "winRate": 52.1,
        "games": 10168
      }
    ],
    "bestSets": []
  },
  "142-mega": {
    "id": 142,
    "name": "Mega Aerodactyl",
    "isMega": true,
    "elo": 9707,
    "winRate": 49.9,
    "appearances": 16184,
    "wins": 8078,
    "losses": 8106,
    "bestPartners": [
      {
        "name": "Orthworm",
        "winRate": 51.7,
        "games": 5303
      },
      {
        "name": "Greninja",
        "winRate": 51.7,
        "games": 5303
      },
      {
        "name": "Gyarados",
        "winRate": 51.7,
        "games": 5303
      },
      {
        "name": "Mow Rotom",
        "winRate": 51.3,
        "games": 10903
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.8,
        "games": 5600
      }
    ],
    "bestSets": []
  },
  "376-mega": {
    "id": 376,
    "name": "Mega Metagross",
    "isMega": true,
    "elo": 9705,
    "winRate": 50.2,
    "appearances": 277574,
    "wins": 139461,
    "losses": 138113,
    "bestPartners": [
      {
        "name": "Weavile",
        "winRate": 61.6,
        "games": 4376
      },
      {
        "name": "Charizard",
        "winRate": 55.3,
        "games": 9930
      },
      {
        "name": "Kommo-o",
        "winRate": 54.8,
        "games": 9892
      },
      {
        "name": "Hydreigon",
        "winRate": 52,
        "games": 5348
      },
      {
        "name": "Greninja",
        "winRate": 51.6,
        "games": 42919
      }
    ],
    "bestSets": []
  },
  "655-mega": {
    "id": 655,
    "name": "Mega Delphox",
    "isMega": true,
    "elo": 9699,
    "winRate": 52.8,
    "appearances": 15383,
    "wins": 8129,
    "losses": 7254,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 54.4,
        "games": 5033
      },
      {
        "name": "Gyarados",
        "winRate": 54.4,
        "games": 5033
      },
      {
        "name": "Drampa",
        "winRate": 54.4,
        "games": 5033
      },
      {
        "name": "Greninja",
        "winRate": 54.4,
        "games": 5033
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54.1,
        "games": 5104
      }
    ],
    "bestSets": []
  },
  "214-mega": {
    "id": 214,
    "name": "Mega Heracross",
    "isMega": true,
    "elo": 9698,
    "winRate": 51.7,
    "appearances": 15909,
    "wins": 8225,
    "losses": 7684,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 54.4,
        "games": 5028
      },
      {
        "name": "Metagross",
        "winRate": 54.4,
        "games": 5028
      },
      {
        "name": "Wash Rotom",
        "winRate": 54.4,
        "games": 5028
      },
      {
        "name": "Kingambit",
        "winRate": 54.4,
        "games": 5028
      },
      {
        "name": "Greninja",
        "winRate": 51.7,
        "games": 10483
      }
    ],
    "bestSets": []
  },
  "208-mega": {
    "id": 208,
    "name": "Mega Steelix",
    "isMega": true,
    "elo": 9695,
    "winRate": 49.8,
    "appearances": 16272,
    "wins": 8109,
    "losses": 8163,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 50.2,
        "games": 5348
      },
      {
        "name": "Dragonite",
        "winRate": 50.2,
        "games": 5348
      },
      {
        "name": "Feraligatr",
        "winRate": 50.2,
        "games": 5348
      },
      {
        "name": "Vaporeon",
        "winRate": 49.9,
        "games": 10715
      },
      {
        "name": "Altaria",
        "winRate": 49.9,
        "games": 10905
      }
    ],
    "bestSets": []
  },
  "530-mega": {
    "id": 530,
    "name": "Mega Excadrill",
    "isMega": true,
    "elo": 9695,
    "winRate": 52.7,
    "appearances": 15495,
    "wins": 8168,
    "losses": 7327,
    "bestPartners": [
      {
        "name": "Talonflame",
        "winRate": 60.1,
        "games": 4444
      },
      {
        "name": "Charizard",
        "winRate": 60.1,
        "games": 4444
      },
      {
        "name": "Pelipper",
        "winRate": 54.9,
        "games": 9902
      },
      {
        "name": "Noivern",
        "winRate": 54.9,
        "games": 9902
      },
      {
        "name": "Primarina",
        "winRate": 53.9,
        "games": 10037
      }
    ],
    "bestSets": []
  },
  "229-mega": {
    "id": 229,
    "name": "Mega Houndoom",
    "isMega": true,
    "elo": 9693,
    "winRate": 50.1,
    "appearances": 16102,
    "wins": 8075,
    "losses": 8027,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 50.5,
        "games": 5436
      },
      {
        "name": "Slowbro",
        "winRate": 50.5,
        "games": 5436
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5325
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 5325
      },
      {
        "name": "Dragonite",
        "winRate": 50.3,
        "games": 5325
      }
    ],
    "bestSets": []
  },
  "9-mega": {
    "id": 9,
    "name": "Mega Blastoise",
    "isMega": true,
    "elo": 9691,
    "winRate": 49.8,
    "appearances": 38715,
    "wins": 19282,
    "losses": 19433,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 5540
      },
      {
        "name": "Meganium",
        "winRate": 50,
        "games": 5501
      },
      {
        "name": "Krookodile",
        "winRate": 50,
        "games": 5501
      },
      {
        "name": "Kommo-o",
        "winRate": 50,
        "games": 5501
      },
      {
        "name": "Politoed",
        "winRate": 49.9,
        "games": 21751
      }
    ],
    "bestSets": []
  },
  "970-mega": {
    "id": 970,
    "name": "Mega Glimmora",
    "isMega": true,
    "elo": 9691,
    "winRate": 50,
    "appearances": 16511,
    "wins": 8254,
    "losses": 8257,
    "bestPartners": [
      {
        "name": "Abomasnow",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Morpeko",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Pelipper",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Mow Rotom",
        "winRate": 50.8,
        "games": 5615
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.2,
        "games": 11014
      }
    ],
    "bestSets": []
  },
  "701-mega": {
    "id": 701,
    "name": "Mega Hawlucha",
    "isMega": true,
    "elo": 9690,
    "winRate": 50.5,
    "appearances": 15887,
    "wins": 8020,
    "losses": 7867,
    "bestPartners": [
      {
        "name": "Orthworm",
        "winRate": 53.8,
        "games": 5153
      },
      {
        "name": "Empoleon",
        "winRate": 53.8,
        "games": 5153
      },
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 5153
      },
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 10240
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 15887
      }
    ],
    "bestSets": []
  },
  "475-mega": {
    "id": 475,
    "name": "Mega Gallade",
    "isMega": true,
    "elo": 9687,
    "winRate": 50.9,
    "appearances": 16089,
    "wins": 8193,
    "losses": 7896,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 52.9,
        "games": 5258
      },
      {
        "name": "Heat Rotom",
        "winRate": 52.9,
        "games": 5258
      },
      {
        "name": "Aegislash",
        "winRate": 52.9,
        "games": 5258
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 51.4,
        "games": 10748
      },
      {
        "name": "Kingambit",
        "winRate": 50.9,
        "games": 16089
      }
    ],
    "bestSets": []
  },
  "248-mega": {
    "id": 248,
    "name": "Mega Tyranitar",
    "isMega": true,
    "elo": 9679,
    "winRate": 50.4,
    "appearances": 319590,
    "wins": 161207,
    "losses": 158383,
    "bestPartners": [
      {
        "name": "Talonflame",
        "winRate": 52.1,
        "games": 5435
      },
      {
        "name": "Charizard",
        "winRate": 50.9,
        "games": 16534
      },
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 127676
      },
      {
        "name": "Aegislash",
        "winRate": 50.6,
        "games": 66732
      },
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 177878
      }
    ],
    "bestSets": []
  },
  "428-mega": {
    "id": 428,
    "name": "Mega Lopunny",
    "isMega": true,
    "elo": 9678,
    "winRate": 51.6,
    "appearances": 16280,
    "wins": 8405,
    "losses": 7875,
    "bestPartners": [
      {
        "name": "Alakazam",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Polteageist",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 55,
        "games": 5106
      },
      {
        "name": "Gardevoir",
        "winRate": 52.1,
        "games": 10764
      },
      {
        "name": "Incineroar",
        "winRate": 51.6,
        "games": 16280
      }
    ],
    "bestSets": []
  },
  "36-mega": {
    "id": 36,
    "name": "Mega Clefable",
    "isMega": true,
    "elo": 9672,
    "winRate": 56.3,
    "appearances": 14653,
    "wins": 8248,
    "losses": 6405,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 66.6,
        "games": 3999
      },
      {
        "name": "Metagross",
        "winRate": 66.6,
        "games": 3999
      },
      {
        "name": "Archaludon",
        "winRate": 59.9,
        "games": 9073
      },
      {
        "name": "Kingambit",
        "winRate": 59.9,
        "games": 9073
      },
      {
        "name": "Scizor",
        "winRate": 57.2,
        "games": 9579
      }
    ],
    "bestSets": []
  },
  "3-mega": {
    "id": 3,
    "name": "Mega Venusaur",
    "isMega": true,
    "elo": 9672,
    "winRate": 51.8,
    "appearances": 15945,
    "wins": 8262,
    "losses": 7683,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 57.3,
        "games": 4812
      },
      {
        "name": "Tyranitar",
        "winRate": 57.3,
        "games": 4812
      },
      {
        "name": "Incineroar",
        "winRate": 57.3,
        "games": 4812
      },
      {
        "name": "Politoed",
        "winRate": 52.9,
        "games": 10400
      },
      {
        "name": "Feraligatr",
        "winRate": 51.8,
        "games": 15945
      }
    ],
    "bestSets": []
  },
  "149-mega": {
    "id": 149,
    "name": "Mega Dragonite",
    "isMega": true,
    "elo": 9666,
    "winRate": 50,
    "appearances": 81388,
    "wins": 40681,
    "losses": 40707,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 51.3,
        "games": 10877
      },
      {
        "name": "Lucario",
        "winRate": 51.3,
        "games": 10877
      },
      {
        "name": "Garchomp",
        "winRate": 51.1,
        "games": 32442
      },
      {
        "name": "Dragapult",
        "winRate": 51,
        "games": 21809
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 27152
      }
    ],
    "bestSets": []
  },
  "115-mega": {
    "id": 115,
    "name": "Mega Kangaskhan",
    "isMega": true,
    "elo": 9665,
    "winRate": 49.5,
    "appearances": 160810,
    "wins": 79578,
    "losses": 81232,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.7,
        "games": 11089
      },
      {
        "name": "Snorlax",
        "winRate": 50.4,
        "games": 5525
      },
      {
        "name": "Mimikyu",
        "winRate": 50.2,
        "games": 5454
      },
      {
        "name": "Whimsicott",
        "winRate": 49.6,
        "games": 27197
      },
      {
        "name": "Garchomp",
        "winRate": 49.5,
        "games": 138924
      }
    ],
    "bestSets": []
  },
  "71-mega": {
    "id": 71,
    "name": "Mega Victreebel",
    "isMega": true,
    "elo": 9663,
    "winRate": 50.1,
    "appearances": 16867,
    "wins": 8451,
    "losses": 8416,
    "bestPartners": [
      {
        "name": "Weavile",
        "winRate": 50.8,
        "games": 5704
      },
      {
        "name": "Politoed",
        "winRate": 50.8,
        "games": 5704
      },
      {
        "name": "Blastoise",
        "winRate": 50.4,
        "games": 11345
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 11345
      },
      {
        "name": "Slowbro",
        "winRate": 50.1,
        "games": 16867
      }
    ],
    "bestSets": []
  },
  "127-mega": {
    "id": 127,
    "name": "Mega Pinsir",
    "isMega": true,
    "elo": 9663,
    "winRate": 50.9,
    "appearances": 15371,
    "wins": 7819,
    "losses": 7552,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 56.6,
        "games": 4791
      },
      {
        "name": "Tyranitar",
        "winRate": 56.6,
        "games": 4791
      },
      {
        "name": "Archaludon",
        "winRate": 53.1,
        "games": 10368
      },
      {
        "name": "Metagross",
        "winRate": 53.1,
        "games": 10368
      },
      {
        "name": "Kingambit",
        "winRate": 51.3,
        "games": 9794
      }
    ],
    "bestSets": []
  },
  "212-mega": {
    "id": 212,
    "name": "Mega Scizor",
    "isMega": true,
    "elo": 9662,
    "winRate": 51.6,
    "appearances": 37178,
    "wins": 19178,
    "losses": 18000,
    "bestPartners": [
      {
        "name": "Gardevoir",
        "winRate": 57.3,
        "games": 4536
      },
      {
        "name": "Hatterene",
        "winRate": 57.3,
        "games": 4536
      },
      {
        "name": "Hydreigon",
        "winRate": 57,
        "games": 4755
      },
      {
        "name": "Aegislash",
        "winRate": 57,
        "games": 4755
      },
      {
        "name": "Dragapult",
        "winRate": 54.1,
        "games": 10001
      }
    ],
    "bestSets": []
  },
  "445-mega-z": {
    "id": 445,
    "name": "Mega Garchomp Z",
    "isMega": true,
    "elo": 9661,
    "winRate": 52.9,
    "appearances": 15732,
    "wins": 8327,
    "losses": 7405,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 57.9,
        "games": 4844
      },
      {
        "name": "Kingambit",
        "winRate": 57.9,
        "games": 4844
      },
      {
        "name": "Heat Rotom",
        "winRate": 53.6,
        "games": 10368
      },
      {
        "name": "Tinkaton",
        "winRate": 53.6,
        "games": 10368
      },
      {
        "name": "Gyarados",
        "winRate": 52.9,
        "games": 15732
      }
    ],
    "bestSets": []
  },
  "6-mega-x": {
    "id": 6,
    "name": "Mega Charizard X",
    "isMega": true,
    "elo": 9660,
    "winRate": 51.3,
    "appearances": 16701,
    "wins": 8571,
    "losses": 8130,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 53.2,
        "games": 5411
      },
      {
        "name": "Archaludon",
        "winRate": 53.2,
        "games": 5411
      },
      {
        "name": "Garchomp",
        "winRate": 53.2,
        "games": 5411
      },
      {
        "name": "Excadrill",
        "winRate": 52.1,
        "games": 11127
      },
      {
        "name": "Hydreigon",
        "winRate": 51.5,
        "games": 10985
      }
    ],
    "bestSets": []
  },
  "130-mega": {
    "id": 130,
    "name": "Mega Gyarados",
    "isMega": true,
    "elo": 9659,
    "winRate": 50.4,
    "appearances": 221929,
    "wins": 111743,
    "losses": 110186,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 68.9,
        "games": 3909
      },
      {
        "name": "Corviknight",
        "winRate": 58.9,
        "games": 4548
      },
      {
        "name": "Slowbro",
        "winRate": 57.8,
        "games": 9362
      },
      {
        "name": "Archaludon",
        "winRate": 55.4,
        "games": 19558
      },
      {
        "name": "Gliscor",
        "winRate": 54,
        "games": 10001
      }
    ],
    "bestSets": []
  },
  "448-mega": {
    "id": 448,
    "name": "Mega Lucario",
    "isMega": true,
    "elo": 9652,
    "winRate": 49,
    "appearances": 27584,
    "wins": 13509,
    "losses": 14075,
    "bestPartners": [
      {
        "name": "Starmie",
        "winRate": 50.2,
        "games": 5670
      },
      {
        "name": "Slowbro",
        "winRate": 50.2,
        "games": 5670
      },
      {
        "name": "Gliscor",
        "winRate": 49.9,
        "games": 5580
      },
      {
        "name": "Charizard",
        "winRate": 49.9,
        "games": 5580
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 5638
      }
    ],
    "bestSets": []
  },
  "652-mega": {
    "id": 652,
    "name": "Mega Chesnaught",
    "isMega": true,
    "elo": 9652,
    "winRate": 53.9,
    "appearances": 15102,
    "wins": 8140,
    "losses": 6962,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 65.2,
        "games": 4003
      },
      {
        "name": "Metagross",
        "winRate": 65.2,
        "games": 4003
      },
      {
        "name": "Greninja",
        "winRate": 65.2,
        "games": 4003
      },
      {
        "name": "Heat Rotom",
        "winRate": 56.5,
        "games": 9579
      },
      {
        "name": "Gengar",
        "winRate": 53.9,
        "games": 15102
      }
    ],
    "bestSets": []
  },
  "334-mega": {
    "id": 334,
    "name": "Mega Altaria",
    "isMega": true,
    "elo": 9649,
    "winRate": 48.4,
    "appearances": 16346,
    "wins": 7919,
    "losses": 8427,
    "bestPartners": [
      {
        "name": "Metagross",
        "winRate": 49.5,
        "games": 5645
      },
      {
        "name": "Lucario",
        "winRate": 49.5,
        "games": 5645
      },
      {
        "name": "Orthworm",
        "winRate": 49.1,
        "games": 11071
      },
      {
        "name": "Aegislash",
        "winRate": 48.6,
        "games": 5426
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 48.4,
        "games": 16346
      }
    ],
    "bestSets": []
  },
  "978-mega": {
    "id": 978,
    "name": "Mega Tatsugiri",
    "isMega": true,
    "elo": 9646,
    "winRate": 49.5,
    "appearances": 16290,
    "wins": 8067,
    "losses": 8223,
    "bestPartners": [
      {
        "name": "Skarmory",
        "winRate": 50.4,
        "games": 5428
      },
      {
        "name": "Scizor",
        "winRate": 50.2,
        "games": 11030
      },
      {
        "name": "Corviknight",
        "winRate": 50.2,
        "games": 11030
      },
      {
        "name": "Tinkaton",
        "winRate": 50,
        "games": 5602
      },
      {
        "name": "Arcanine",
        "winRate": 49.5,
        "games": 16290
      }
    ],
    "bestSets": []
  },
  "154-mega": {
    "id": 154,
    "name": "Mega Meganium",
    "isMega": true,
    "elo": 9645,
    "winRate": 50,
    "appearances": 22329,
    "wins": 11163,
    "losses": 11166,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 50.5,
        "games": 5692
      },
      {
        "name": "Toxapex",
        "winRate": 50.5,
        "games": 5692
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 5692
      },
      {
        "name": "Klefki",
        "winRate": 50.4,
        "games": 5718
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.4,
        "games": 11410
      }
    ],
    "bestSets": []
  },
  "94-mega": {
    "id": 94,
    "name": "Mega Gengar",
    "isMega": true,
    "elo": 9643,
    "winRate": 48.7,
    "appearances": 32591,
    "wins": 15866,
    "losses": 16725,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 50.3,
        "games": 5661
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 5661
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 5661
      },
      {
        "name": "Azumarill",
        "winRate": 50.1,
        "games": 11254
      },
      {
        "name": "Sableye",
        "winRate": 50.1,
        "games": 11254
      }
    ],
    "bestSets": []
  },
  "359-mega-z": {
    "id": 359,
    "name": "Mega Absol Z",
    "isMega": true,
    "elo": 9641,
    "winRate": 50.5,
    "appearances": 16693,
    "wins": 8433,
    "losses": 8260,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 11234
      },
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 5694
      },
      {
        "name": "Rotom",
        "winRate": 50.6,
        "games": 5694
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 10999
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 16693
      }
    ],
    "bestSets": []
  },
  "678-mega": {
    "id": 678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 9641,
    "winRate": 49.6,
    "appearances": 16285,
    "wins": 8070,
    "losses": 8215,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 49.8,
        "games": 5377
      },
      {
        "name": "Kingambit",
        "winRate": 49.7,
        "games": 10753
      },
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 10753
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.7,
        "games": 10753
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 49.6,
        "games": 5376
      }
    ],
    "bestSets": []
  },
  "65-mega": {
    "id": 65,
    "name": "Mega Alakazam",
    "isMega": true,
    "elo": 9640,
    "winRate": 50.5,
    "appearances": 22573,
    "wins": 11406,
    "losses": 11167,
    "bestPartners": [
      {
        "name": "Kommo-o",
        "winRate": 50.9,
        "games": 5592
      },
      {
        "name": "Lucario",
        "winRate": 50.9,
        "games": 5592
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.8,
        "games": 11324
      },
      {
        "name": "Crabominable",
        "winRate": 50.8,
        "games": 11166
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5732
      }
    ],
    "bestSets": []
  },
  "460-mega": {
    "id": 460,
    "name": "Mega Abomasnow",
    "isMega": true,
    "elo": 9640,
    "winRate": 51,
    "appearances": 15895,
    "wins": 8104,
    "losses": 7791,
    "bestPartners": [
      {
        "name": "Hisuian Zoroark",
        "winRate": 54.1,
        "games": 5041
      },
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 5041
      },
      {
        "name": "Aegislash",
        "winRate": 51.9,
        "games": 10482
      },
      {
        "name": "Incineroar",
        "winRate": 51.6,
        "games": 10454
      },
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 15895
      }
    ],
    "bestSets": []
  },
  "227-mega": {
    "id": 227,
    "name": "Mega Skarmory",
    "isMega": true,
    "elo": 9639,
    "winRate": 50.3,
    "appearances": 22426,
    "wins": 11288,
    "losses": 11138,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 50.7,
        "games": 5600
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5600
      },
      {
        "name": "Pawmot",
        "winRate": 50.6,
        "games": 11308
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.5,
        "games": 5708
      },
      {
        "name": "Drampa",
        "winRate": 50.5,
        "games": 5708
      }
    ],
    "bestSets": []
  },
  "531-mega": {
    "id": 531,
    "name": "Mega Audino",
    "isMega": true,
    "elo": 9635,
    "winRate": 47.9,
    "appearances": 15767,
    "wins": 7545,
    "losses": 8222,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Slowking",
        "winRate": 50.6,
        "games": 5633
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 48.7,
        "games": 10732
      },
      {
        "name": "Azumarill",
        "winRate": 48.4,
        "games": 10668
      }
    ],
    "bestSets": []
  },
  "6-mega-y": {
    "id": 6,
    "name": "Mega Charizard Y",
    "isMega": true,
    "elo": 9631,
    "winRate": 51.2,
    "appearances": 27660,
    "wins": 14163,
    "losses": 13497,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 54.7,
        "games": 5032
      },
      {
        "name": "Excadrill",
        "winRate": 54.7,
        "games": 5032
      },
      {
        "name": "Krookodile",
        "winRate": 52.7,
        "games": 10643
      },
      {
        "name": "Hydreigon",
        "winRate": 52.7,
        "games": 10812
      },
      {
        "name": "Garchomp",
        "winRate": 52.5,
        "games": 10615
      }
    ],
    "bestSets": []
  },
  "181-mega": {
    "id": 181,
    "name": "Mega Ampharos",
    "isMega": true,
    "elo": 9622,
    "winRate": 49.1,
    "appearances": 16360,
    "wins": 8038,
    "losses": 8322,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.8,
        "games": 5628
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.8,
        "games": 5628
      },
      {
        "name": "Palafin",
        "winRate": 50.8,
        "games": 5628
      },
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 5536
      },
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 5536
      }
    ],
    "bestSets": []
  },
  "448-mega-z": {
    "id": 448,
    "name": "Mega Lucario Z",
    "isMega": true,
    "elo": 9621,
    "winRate": 47.4,
    "appearances": 15609,
    "wins": 7397,
    "losses": 8212,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 51,
        "games": 5752
      },
      {
        "name": "Pelipper",
        "winRate": 51,
        "games": 5752
      },
      {
        "name": "Slowbro",
        "winRate": 51,
        "games": 5752
      },
      {
        "name": "Emolga",
        "winRate": 48,
        "games": 10544
      },
      {
        "name": "Azumarill",
        "winRate": 48,
        "games": 10544
      }
    ],
    "bestSets": []
  },
  "478-mega": {
    "id": 478,
    "name": "Mega Froslass",
    "isMega": true,
    "elo": 9621,
    "winRate": 50.1,
    "appearances": 16491,
    "wins": 8259,
    "losses": 8232,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 51,
        "games": 5423
      },
      {
        "name": "Meowscarada",
        "winRate": 51,
        "games": 5423
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.3,
        "games": 10986
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 10928
      },
      {
        "name": "Kingambit",
        "winRate": 50.1,
        "games": 16491
      }
    ],
    "bestSets": []
  },
  "740-mega": {
    "id": 740,
    "name": "Mega Crabominable",
    "isMega": true,
    "elo": 9618,
    "winRate": 47.1,
    "appearances": 15376,
    "wins": 7243,
    "losses": 8133,
    "bestPartners": [
      {
        "name": "Alolan Raichu",
        "winRate": 50.5,
        "games": 5466
      },
      {
        "name": "Delphox",
        "winRate": 50.5,
        "games": 5466
      },
      {
        "name": "Gengar",
        "winRate": 50.5,
        "games": 5466
      },
      {
        "name": "Dragapult",
        "winRate": 50.5,
        "games": 5466
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 5461
      }
    ],
    "bestSets": []
  },
  "26-mega-x": {
    "id": 26,
    "name": "Mega Raichu X",
    "isMega": true,
    "elo": 9616,
    "winRate": 48.4,
    "appearances": 15905,
    "wins": 7700,
    "losses": 8205,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.9,
        "games": 5485
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 11088
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 11088
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 5603
      },
      {
        "name": "Arcanine",
        "winRate": 47.4,
        "games": 10302
      }
    ],
    "bestSets": []
  },
  "780-mega": {
    "id": 780,
    "name": "Mega Drampa",
    "isMega": true,
    "elo": 9610,
    "winRate": 51.9,
    "appearances": 16165,
    "wins": 8387,
    "losses": 7778,
    "bestPartners": [
      {
        "name": "Starmie",
        "winRate": 56,
        "games": 4841
      },
      {
        "name": "Aegislash",
        "winRate": 52.7,
        "games": 10557
      },
      {
        "name": "Charizard",
        "winRate": 52.7,
        "games": 10557
      },
      {
        "name": "Arcanine",
        "winRate": 51.9,
        "games": 16165
      },
      {
        "name": "Scizor",
        "winRate": 51.9,
        "games": 16165
      }
    ],
    "bestSets": []
  },
  "952-mega": {
    "id": 952,
    "name": "Mega Scovillain",
    "isMega": true,
    "elo": 9606,
    "winRate": 49.3,
    "appearances": 13973,
    "wins": 6883,
    "losses": 7090,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 61.3,
        "games": 4312
      },
      {
        "name": "Kingambit",
        "winRate": 61.3,
        "games": 4312
      },
      {
        "name": "Archaludon",
        "winRate": 61.3,
        "games": 4312
      },
      {
        "name": "Aggron",
        "winRate": 50.7,
        "games": 5559
      },
      {
        "name": "Stunfisk",
        "winRate": 50.7,
        "games": 5559
      }
    ],
    "bestSets": []
  },
  "80-mega": {
    "id": 80,
    "name": "Mega Slowbro",
    "isMega": true,
    "elo": 9590,
    "winRate": 49.5,
    "appearances": 16420,
    "wins": 8130,
    "losses": 8290,
    "bestPartners": [
      {
        "name": "Alolan Ninetales",
        "winRate": 49.7,
        "games": 5363
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.7,
        "games": 5363
      },
      {
        "name": "Crabominable",
        "winRate": 49.7,
        "games": 5363
      },
      {
        "name": "Torkoal",
        "winRate": 49.7,
        "games": 5363
      },
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 16420
      }
    ],
    "bestSets": []
  },
  "306-mega": {
    "id": 306,
    "name": "Mega Aggron",
    "isMega": true,
    "elo": 9574,
    "winRate": 44.6,
    "appearances": 19615,
    "wins": 8744,
    "losses": 10871,
    "bestPartners": [
      {
        "name": "Dragonite",
        "winRate": 49.8,
        "games": 5294
      },
      {
        "name": "Whimsicott",
        "winRate": 49.8,
        "games": 5294
      },
      {
        "name": "Dragapult",
        "winRate": 48.5,
        "games": 10417
      },
      {
        "name": "Meowscarada",
        "winRate": 47.9,
        "games": 15721
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 47.2,
        "games": 5123
      }
    ],
    "bestSets": []
  },
  "26-mega-y": {
    "id": 26,
    "name": "Mega Raichu Y",
    "isMega": true,
    "elo": 9566,
    "winRate": 44.2,
    "appearances": 14548,
    "wins": 6426,
    "losses": 8122,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 5620
      },
      {
        "name": "Krookodile",
        "winRate": 50.3,
        "games": 5620
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 5367
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 5367
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 5367
      }
    ],
    "bestSets": []
  },
  "302-mega": {
    "id": 302,
    "name": "Mega Sableye",
    "isMega": true,
    "elo": 9560,
    "winRate": 39.2,
    "appearances": 35258,
    "wins": 13832,
    "losses": 21426,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 50.2,
        "games": 5421
      },
      {
        "name": "Archaludon",
        "winRate": 50.2,
        "games": 5421
      },
      {
        "name": "Mimikyu",
        "winRate": 47.7,
        "games": 5207
      },
      {
        "name": "Azumarill",
        "winRate": 47.7,
        "games": 5207
      },
      {
        "name": "Gyarados",
        "winRate": 46.4,
        "games": 5036
      }
    ],
    "bestSets": []
  },
  "359-mega": {
    "id": 359,
    "name": "Mega Absol",
    "isMega": true,
    "elo": 9550,
    "winRate": 49.3,
    "appearances": 16416,
    "wins": 8094,
    "losses": 8322,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.9,
        "games": 5621
      },
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 11203
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 11203
      },
      {
        "name": "Ceruledge",
        "winRate": 50.4,
        "games": 5582
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.4,
        "games": 5582
      }
    ],
    "bestSets": []
  },
  "15-mega": {
    "id": 15,
    "name": "Mega Beedrill",
    "isMega": true,
    "elo": 9548,
    "winRate": 45.3,
    "appearances": 15210,
    "wins": 6889,
    "losses": 8321,
    "bestPartners": [
      {
        "name": "Garchomp",
        "winRate": 47.2,
        "games": 5283
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 46.9,
        "games": 10544
      },
      {
        "name": "Tyranitar",
        "winRate": 46.7,
        "games": 5261
      },
      {
        "name": "Excadrill",
        "winRate": 46.7,
        "games": 5261
      },
      {
        "name": "Krookodile",
        "winRate": 45.3,
        "games": 15210
      }
    ],
    "bestSets": []
  }
};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = [
  {
    "pokemon1": "Mega Feraligatr",
    "pokemon2": "Kommo-o",
    "winRate": 74.5,
    "games": 3640
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Mega Feraligatr",
    "winRate": 74.5,
    "games": 3640
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Feraligatr",
    "winRate": 74.5,
    "games": 3640
  },
  {
    "pokemon1": "Arcanine",
    "pokemon2": "Kommo-o",
    "winRate": 74.5,
    "games": 3640
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Kommo-o",
    "winRate": 74.5,
    "games": 3640
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Kommo-o",
    "winRate": 74.5,
    "games": 3640
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Hydreigon",
    "winRate": 74.5,
    "games": 3640
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Archaludon",
    "winRate": 71.6,
    "games": 7549
  },
  {
    "pokemon1": "Venusaur",
    "pokemon2": "Mega Greninja",
    "winRate": 71.2,
    "games": 3750
  },
  {
    "pokemon1": "Metagross",
    "pokemon2": "Mega Greninja",
    "winRate": 71.2,
    "games": 3750
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Greninja",
    "winRate": 71.2,
    "games": 3750
  },
  {
    "pokemon1": "Scizor",
    "pokemon2": "Venusaur",
    "winRate": 71.2,
    "games": 3750
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Venusaur",
    "winRate": 71.2,
    "games": 3750
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Dragapult",
    "winRate": 71.2,
    "games": 3750
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Scizor",
    "winRate": 71.2,
    "games": 3750
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Gyarados",
    "winRate": 68.9,
    "games": 3909
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Slowbro",
    "winRate": 68.9,
    "games": 3909
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Incineroar",
    "winRate": 66.6,
    "games": 3999
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Metagross",
    "winRate": 66.6,
    "games": 3999
  },
  {
    "pokemon1": "Hisuian Samurott",
    "pokemon2": "Hisuian Typhlosion",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Hisuian Typhlosion",
    "pokemon2": "Hydreigon",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Hisuian Typhlosion",
    "pokemon2": "Drampa",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Hisuian Samurott",
    "pokemon2": "Hydreigon",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Hisuian Samurott",
    "pokemon2": "Primarina",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Abomasnow",
    "pokemon2": "Hydreigon",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Primarina",
    "pokemon2": "Drampa",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Abomasnow",
    "pokemon2": "Primarina",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Abomasnow",
    "pokemon2": "Drampa",
    "winRate": 65.3,
    "games": 4028
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Mega Chesnaught",
    "winRate": 65.2,
    "games": 4003
  },
  {
    "pokemon1": "Metagross",
    "pokemon2": "Mega Chesnaught",
    "winRate": 65.2,
    "games": 4003
  },
  {
    "pokemon1": "Mega Chesnaught",
    "pokemon2": "Greninja",
    "winRate": 65.2,
    "games": 4003
  },
  {
    "pokemon1": "Excadrill",
    "pokemon2": "Charizard",
    "winRate": 63.2,
    "games": 8562
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Hydreigon",
    "winRate": 63.2,
    "games": 8562
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Chesnaught",
    "winRate": 62.4,
    "games": 8619
  },
  {
    "pokemon1": "Metagross",
    "pokemon2": "Chesnaught",
    "winRate": 62.4,
    "games": 8619
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Chesnaught",
    "winRate": 62.4,
    "games": 8619
  },
  {
    "pokemon1": "Chesnaught",
    "pokemon2": "Greninja",
    "winRate": 62.4,
    "games": 8619
  },
  {
    "pokemon1": "Chesnaught",
    "pokemon2": "Gengar",
    "winRate": 62.4,
    "games": 8619
  },
  {
    "pokemon1": "Mega Metagross",
    "pokemon2": "Weavile",
    "winRate": 61.6,
    "games": 4376
  },
  {
    "pokemon1": "Weavile",
    "pokemon2": "Greninja",
    "winRate": 61.6,
    "games": 4376
  },
  {
    "pokemon1": "Greninja",
    "pokemon2": "Kommo-o",
    "winRate": 61.6,
    "games": 4376
  },
  {
    "pokemon1": "Weavile",
    "pokemon2": "Kommo-o",
    "winRate": 61.6,
    "games": 4376
  },
  {
    "pokemon1": "Weavile",
    "pokemon2": "Incineroar",
    "winRate": 61.6,
    "games": 4376
  },
  {
    "pokemon1": "Weavile",
    "pokemon2": "Charizard",
    "winRate": 61.6,
    "games": 4376
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Kommo-o",
    "winRate": 61.6,
    "games": 4376
  },
  {
    "pokemon1": "Aerodactyl",
    "pokemon2": "Scovillain",
    "winRate": 61.5,
    "games": 8606
  },
  {
    "pokemon1": "Tyranitar",
    "pokemon2": "Scovillain",
    "winRate": 61.5,
    "games": 8606
  },
  {
    "pokemon1": "Corviknight",
    "pokemon2": "Scovillain",
    "winRate": 61.5,
    "games": 8606
  },
  {
    "pokemon1": "Scovillain",
    "pokemon2": "Kingambit",
    "winRate": 61.5,
    "games": 8606
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Scovillain",
    "winRate": 61.5,
    "games": 8606
  }
];

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = [
  {
    "name": "Charizard Base",
    "elo": 19580,
    "winRate": 63.2,
    "wins": 5411,
    "losses": 3151
  },
  {
    "name": "Sand",
    "elo": 18708,
    "winRate": 50.5,
    "wins": 111807,
    "losses": 109656
  },
  {
    "name": "Chesnaught Base",
    "elo": 18628,
    "winRate": 62.4,
    "wins": 5380,
    "losses": 3239
  },
  {
    "name": "Mega Garchomp",
    "elo": 18396,
    "winRate": 53.4,
    "wins": 16582,
    "losses": 14470
  },
  {
    "name": "Scovillain Base",
    "elo": 17324,
    "winRate": 61.5,
    "wins": 5292,
    "losses": 3314
  },
  {
    "name": "Mega Feraligatr",
    "elo": 17252,
    "winRate": 56.8,
    "wins": 8277,
    "losses": 6308
  },
  {
    "name": "Alcremie Build",
    "elo": 16676,
    "winRate": 56.7,
    "wins": 8053,
    "losses": 6156
  },
  {
    "name": "Mega Clefable",
    "elo": 16244,
    "winRate": 56.3,
    "wins": 8248,
    "losses": 6405
  },
  {
    "name": "Mega Greninja",
    "elo": 16164,
    "winRate": 56.3,
    "wins": 8198,
    "losses": 6365
  },
  {
    "name": "Clefable Base",
    "elo": 14844,
    "winRate": 59,
    "wins": 5454,
    "losses": 3786
  },
  {
    "name": "Pinsir Base",
    "elo": 12740,
    "winRate": 57.4,
    "wins": 5452,
    "losses": 4047
  },
  {
    "name": "Tailwind",
    "elo": 12604,
    "winRate": 50.5,
    "wins": 75065,
    "losses": 73677
  },
  {
    "name": "Hyper Offense",
    "elo": 11212,
    "winRate": 51.3,
    "wins": 24712,
    "losses": 23498
  },
  {
    "name": "Mega Chesnaught",
    "elo": 10924,
    "winRate": 53.9,
    "wins": 8140,
    "losses": 6962
  },
  {
    "name": "Hard Trick Room",
    "elo": 10276,
    "winRate": 53.5,
    "wins": 8285,
    "losses": 7188
  },
  {
    "name": "Mega Charizard",
    "elo": 10108,
    "winRate": 51.6,
    "wins": 17086,
    "losses": 16010
  },
  {
    "name": "Mega Delphox",
    "elo": 8500,
    "winRate": 52.8,
    "wins": 8129,
    "losses": 7254
  },
  {
    "name": "Hisuian Typhlosion Build",
    "elo": 8444,
    "winRate": 53,
    "wins": 7630,
    "losses": 6762
  },
  {
    "name": "Kleavor Build",
    "elo": 8420,
    "winRate": 52.8,
    "wins": 8211,
    "losses": 7346
  },
  {
    "name": "Mega Excadrill",
    "elo": 8228,
    "winRate": 52.7,
    "wins": 8168,
    "losses": 7327
  },
  {
    "name": "Sun Trick Room",
    "elo": 7740,
    "winRate": 50.4,
    "wins": 47308,
    "losses": 46528
  },
  {
    "name": "Sun Hyper Offense",
    "elo": 7596,
    "winRate": 58.3,
    "wins": 2665,
    "losses": 1903
  },
  {
    "name": "Beat Up",
    "elo": 7484,
    "winRate": 58.1,
    "wins": 2693,
    "losses": 1945
  },
  {
    "name": "Mega Metagross",
    "elo": 7260,
    "winRate": 50.3,
    "wins": 58081,
    "losses": 57361
  },
  {
    "name": "Dragon Spam",
    "elo": 7220,
    "winRate": 57.8,
    "wins": 2648,
    "losses": 1933
  },
  {
    "name": "Offense",
    "elo": 6820,
    "winRate": 52,
    "wins": 8446,
    "losses": 7781
  },
  {
    "name": "Pivot Chain",
    "elo": 6780,
    "winRate": 57.3,
    "wins": 2598,
    "losses": 1938
  },
  {
    "name": "Mega Drampa",
    "elo": 6372,
    "winRate": 51.9,
    "wins": 8387,
    "losses": 7778
  },
  {
    "name": "Mega Venusaur",
    "elo": 6132,
    "winRate": 51.8,
    "wins": 8262,
    "losses": 7683
  },
  {
    "name": "Mega Heracross",
    "elo": 5828,
    "winRate": 51.7,
    "wins": 8225,
    "losses": 7684
  },
  {
    "name": "Heracross Base",
    "elo": 5780,
    "winRate": 52.5,
    "wins": 5668,
    "losses": 5133
  },
  {
    "name": "Mega Lopunny",
    "elo": 5740,
    "winRate": 51.6,
    "wins": 8405,
    "losses": 7875
  },
  {
    "name": "Standard",
    "elo": 5652,
    "winRate": 50.1,
    "wins": 96034,
    "losses": 95515
  },
  {
    "name": "Hydrapple Build",
    "elo": 5516,
    "winRate": 51.6,
    "wins": 8166,
    "losses": 7664
  },
  {
    "name": "Balance",
    "elo": 5300,
    "winRate": 51.1,
    "wins": 11042,
    "losses": 10567
  },
  {
    "name": "Sun",
    "elo": 5188,
    "winRate": 50.5,
    "wins": 22635,
    "losses": 22174
  },
  {
    "name": "Aurora Veil",
    "elo": 5188,
    "winRate": 54.6,
    "wins": 2721,
    "losses": 2260
  },
  {
    "name": "Mega Emboar",
    "elo": 4900,
    "winRate": 51.4,
    "wins": 8016,
    "losses": 7591
  },
  {
    "name": "Ampharos Base",
    "elo": 4868,
    "winRate": 52,
    "wins": 5599,
    "losses": 5178
  },
  {
    "name": "Fan Rotom Build",
    "elo": 4596,
    "winRate": 51.8,
    "wins": 5518,
    "losses": 5131
  },
  {
    "name": "Tsareena Build",
    "elo": 4380,
    "winRate": 51.1,
    "wins": 8386,
    "losses": 8026
  },
  {
    "name": "Metagross Core",
    "elo": 4316,
    "winRate": 51.1,
    "wins": 8275,
    "losses": 7923
  },
  {
    "name": "Steel Stall",
    "elo": 4244,
    "winRate": 53.4,
    "wins": 2667,
    "losses": 2324
  },
  {
    "name": "Body Press",
    "elo": 4196,
    "winRate": 53.4,
    "wins": 2679,
    "losses": 2342
  },
  {
    "name": "Bulky Offense",
    "elo": 4044,
    "winRate": 50.6,
    "wins": 14139,
    "losses": 13821
  },
  {
    "name": "Incineroar Balance",
    "elo": 4020,
    "winRate": 51,
    "wins": 8273,
    "losses": 7958
  },
  {
    "name": "Mega Abomasnow",
    "elo": 4004,
    "winRate": 51,
    "wins": 8104,
    "losses": 7791
  },
  {
    "name": "Mega Tyranitar",
    "elo": 3932,
    "winRate": 50.9,
    "wins": 8419,
    "losses": 8115
  },
  {
    "name": "Mega Gallade",
    "elo": 3876,
    "winRate": 50.9,
    "wins": 8193,
    "losses": 7896
  },
  {
    "name": "Tailwind Offense",
    "elo": 3844,
    "winRate": 50.7,
    "wins": 11228,
    "losses": 10935
  }
];

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = [
  {
    "name": "Beat Up",
    "winRate": 58.1,
    "appearances": 4638
  },
  {
    "name": "Decorate",
    "winRate": 56.7,
    "appearances": 14209
  },
  {
    "name": "Electro Shot",
    "winRate": 56.1,
    "appearances": 175035
  },
  {
    "name": "Spiky Shield",
    "winRate": 55,
    "appearances": 19763
  },
  {
    "name": "Wood Hammer",
    "winRate": 53.8,
    "appearances": 50504
  },
  {
    "name": "Grass Knot",
    "winRate": 53,
    "appearances": 15766
  },
  {
    "name": "Stone Axe",
    "winRate": 52.8,
    "appearances": 15557
  },
  {
    "name": "Fire Blast",
    "winRate": 52.6,
    "appearances": 15076
  },
  {
    "name": "Energy Ball",
    "winRate": 52.4,
    "appearances": 108478
  },
  {
    "name": "Body Press",
    "winRate": 52.3,
    "appearances": 399920
  },
  {
    "name": "Clanging Scales",
    "winRate": 52.2,
    "appearances": 74738
  },
  {
    "name": "Overheat",
    "winRate": 52.2,
    "appearances": 424937
  },
  {
    "name": "Trick",
    "winRate": 52.1,
    "appearances": 10879
  },
  {
    "name": "Ceaseless Edge",
    "winRate": 51.9,
    "appearances": 41967
  },
  {
    "name": "Razor Shell",
    "winRate": 51.9,
    "appearances": 41967
  },
  {
    "name": "Triple Axel",
    "winRate": 51.9,
    "appearances": 26792
  },
  {
    "name": "Megahorn",
    "winRate": 51.8,
    "appearances": 16428
  },
  {
    "name": "Curse",
    "winRate": 51.7,
    "appearances": 37511
  },
  {
    "name": "Pin Missile",
    "winRate": 51.7,
    "appearances": 15909
  },
  {
    "name": "Flash Cannon",
    "winRate": 51.6,
    "appearances": 982908
  },
  {
    "name": "Stomping Tantrum",
    "winRate": 51.6,
    "appearances": 30146
  },
  {
    "name": "Fickle Beam",
    "winRate": 51.6,
    "appearances": 15830
  },
  {
    "name": "Volt Switch",
    "winRate": 51.4,
    "appearances": 386975
  },
  {
    "name": "High Jump Kick",
    "winRate": 51.4,
    "appearances": 32692
  },
  {
    "name": "Bullet Punch",
    "winRate": 51.3,
    "appearances": 778980
  },
  {
    "name": "Air Slash",
    "winRate": 51.3,
    "appearances": 298882
  },
  {
    "name": "Rock Blast",
    "winRate": 51.3,
    "appearances": 32193
  },
  {
    "name": "Flamethrower",
    "winRate": 51.2,
    "appearances": 602385
  },
  {
    "name": "Solar Beam",
    "winRate": 51.2,
    "appearances": 352630
  },
  {
    "name": "Bug Bite",
    "winRate": 51.1,
    "appearances": 445902
  },
  {
    "name": "Heat Wave",
    "winRate": 51.1,
    "appearances": 615925
  },
  {
    "name": "Superpower",
    "winRate": 51.1,
    "appearances": 380843
  },
  {
    "name": "Fire Fang",
    "winRate": 51.1,
    "appearances": 113540
  },
  {
    "name": "Sacred Sword",
    "winRate": 51.1,
    "appearances": 63659
  },
  {
    "name": "High Horsepower",
    "winRate": 51.1,
    "appearances": 53666
  },
  {
    "name": "Dark Pulse",
    "winRate": 51,
    "appearances": 695105
  },
  {
    "name": "Zen Headbutt",
    "winRate": 51,
    "appearances": 622940
  },
  {
    "name": "Eruption",
    "winRate": 51,
    "appearances": 198283
  },
  {
    "name": "Ice Shard",
    "winRate": 51,
    "appearances": 15895
  },
  {
    "name": "Draco Meteor",
    "winRate": 50.9,
    "appearances": 586519
  },
  {
    "name": "Kowtow Cleave",
    "winRate": 50.9,
    "appearances": 796978
  },
  {
    "name": "Thunderbolt",
    "winRate": 50.9,
    "appearances": 555899
  },
  {
    "name": "Bullet Seed",
    "winRate": 50.9,
    "appearances": 16284
  },
  {
    "name": "Beak Blast",
    "winRate": 50.9,
    "appearances": 16284
  },
  {
    "name": "Revival Blessing",
    "winRate": 50.9,
    "appearances": 39017
  },
  {
    "name": "U-turn",
    "winRate": 50.8,
    "appearances": 406976
  },
  {
    "name": "Whirlwind",
    "winRate": 50.7,
    "appearances": 5683
  },
  {
    "name": "Hydro Pump",
    "winRate": 50.7,
    "appearances": 661487
  },
  {
    "name": "Earth Power",
    "winRate": 50.7,
    "appearances": 468241
  },
  {
    "name": "Quick Attack",
    "winRate": 50.7,
    "appearances": 58229
  }
];

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = {
  "tier1": [
    "Mega Greninja",
    "Mega Garchomp",
    "Scovillain",
    "Mow Rotom",
    "Chesnaught",
    "Hisuian Samurott",
    "Scizor",
    "Alolan Raichu",
    "Hisuian Arcanine",
    "Slowbro",
    "Dragonite",
    "Metagross",
    "Gengar",
    "Hatterene",
    "Victreebel",
    "Kommo-o",
    "Klefki",
    "Primarina"
  ],
  "tier2": [
    "Mega Starmie",
    "Snorlax",
    "Venusaur",
    "Mega Feraligatr",
    "Whimsicott",
    "Mega Gardevoir",
    "Oranguru",
    "Feraligatr",
    "Rhyperior",
    "Mega Emboar",
    "Weavile",
    "Clefable",
    "Mega Aerodactyl",
    "Mega Metagross",
    "Kangaskhan",
    "Basculegion",
    "Torkoal",
    "Fan Rotom",
    "Diggersby",
    "Mega Delphox",
    "Aegislash",
    "Alcremie",
    "Mega Heracross",
    "Vaporeon",
    "Mega Steelix",
    "Mega Excadrill",
    "Golurk",
    "Charizard",
    "Blastoise",
    "Mega Houndoom",
    "Lycanroc",
    "Mega Blastoise",
    "Orthworm",
    "Mega Glimmora",
    "Sinistcha",
    "Mega Hawlucha"
  ],
  "tier3": [
    "Polteageist",
    "Leafeon",
    "Milotic",
    "Tinkaton",
    "Absol",
    "Hisuian Zoroark",
    "Mega Gallade",
    "Corviknight",
    "Ninetales",
    "Slowking",
    "Ursaluna",
    "Emboar",
    "Steelix",
    "Heat Rotom",
    "Gyarados",
    "Mega Tyranitar",
    "Hisuian Typhlosion",
    "Dondozo",
    "Mega Lopunny",
    "Greninja",
    "Excadrill",
    "Vanilluxe",
    "Tyranitar",
    "Houndoom",
    "Garganacl",
    "Politoed",
    "Drampa",
    "Mega Clefable",
    "Mega Venusaur",
    "Froslass",
    "Tatsugiri",
    "Alolan Ninetales",
    "Mega Dragonite",
    "Heracross",
    "Pelipper",
    "Infernape",
    "Abomasnow",
    "Mega Kangaskhan",
    "Glaceon",
    "Torterra",
    "Morpeko",
    "Mega Victreebel",
    "Galarian Stunfisk",
    "Mega Pinsir",
    "Stunfisk",
    "Mega Scizor",
    "Azumarill",
    "Raichu",
    "Mega Garchomp Z",
    "Meowstic",
    "Mega Charizard X",
    "Samurott",
    "Mega Gyarados",
    "Krookodile",
    "Umbreon",
    "Dragapult",
    "Lucario",
    "Kingambit",
    "Tyrantrum",
    "Garchomp",
    "Gliscor",
    "Decidueye",
    "Sandaconda",
    "Ampharos"
  ],
  "dominantArchetypes": [
    "Charizard Base",
    "Sand",
    "Chesnaught Base",
    "Mega Garchomp",
    "Scovillain Base"
  ],
  "underratedPokemon": [],
  "overratedPokemon": [
    "Meowstic",
    "Galarian Slowking",
    "Espeon",
    "Maushold",
    "Frost Rotom"
  ],
  "bestCores": [
    "Mega Feraligatr + Kommo-o",
    "Archaludon + Mega Feraligatr",
    "Heat Rotom + Mega Feraligatr",
    "Arcanine + Kommo-o",
    "Archaludon + Kommo-o"
  ]
};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = 2000000;

/** Simulation date */
export const SIM_DATE = "2026-03-28T00:01:53.034Z";

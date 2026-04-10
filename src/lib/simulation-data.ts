// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from 2,000,000 mega-aware battle simulations
// Date: 2026-04-09T13:59:04.021Z
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
    "elo": 7978,
    "winRate": 51.5,
    "appearances": 310150,
    "wins": 159840,
    "losses": 150310,
    "bestPartners": [
      {
        "name": "Mega Kangaskhan",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 57.9,
        "games": 12970
      },
      {
        "name": "Primarina",
        "winRate": 57.6,
        "games": 12941
      },
      {
        "name": "Gliscor",
        "winRate": 55.7,
        "games": 13433
      },
      {
        "name": "Garchomp",
        "winRate": 54.4,
        "games": 55292
      }
    ],
    "bestSets": []
  },
  "6": {
    "id": 6,
    "name": "Charizard",
    "isMega": false,
    "elo": 8001,
    "winRate": 50.2,
    "appearances": 162255,
    "wins": 81438,
    "losses": 80817,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Tatsugiri",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Feraligatr",
        "winRate": 60,
        "games": 8332
      },
      {
        "name": "Vanilluxe",
        "winRate": 56.1,
        "games": 13381
      },
      {
        "name": "Garchomp",
        "winRate": 53,
        "games": 23402
      }
    ],
    "bestSets": []
  },
  "9": {
    "id": 9,
    "name": "Blastoise",
    "isMega": false,
    "elo": 7984,
    "winRate": 55.1,
    "appearances": 13756,
    "wins": 7584,
    "losses": 6172,
    "bestPartners": [
      {
        "name": "Vivillon",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Tinkaton",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Garchomp",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Excadrill",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Wash Rotom",
        "winRate": 58.7,
        "games": 4300
      }
    ],
    "bestSets": []
  },
  "15": {
    "id": 15,
    "name": "Beedrill",
    "isMega": false,
    "elo": 7844,
    "winRate": 47.5,
    "appearances": 9854,
    "wins": 4685,
    "losses": 5169,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 47.5,
        "games": 9854
      },
      {
        "name": "Incineroar",
        "winRate": 47.5,
        "games": 9854
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 47.5,
        "games": 9854
      },
      {
        "name": "Greninja",
        "winRate": 47.5,
        "games": 9854
      },
      {
        "name": "Garchomp",
        "winRate": 47.5,
        "games": 9854
      }
    ],
    "bestSets": []
  },
  "18": {
    "id": 18,
    "name": "Pidgeot",
    "isMega": false,
    "elo": 7974,
    "winRate": 48.7,
    "appearances": 14879,
    "wins": 7246,
    "losses": 7633,
    "bestPartners": [
      {
        "name": "Armarouge",
        "winRate": 49.5,
        "games": 4976
      },
      {
        "name": "Noivern",
        "winRate": 49.5,
        "games": 4976
      },
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 4976
      },
      {
        "name": "Weavile",
        "winRate": 49.5,
        "games": 4976
      },
      {
        "name": "Archaludon",
        "winRate": 49.5,
        "games": 4976
      }
    ],
    "bestSets": []
  },
  "24": {
    "id": 24,
    "name": "Arbok",
    "isMega": false,
    "elo": 8095,
    "winRate": 49.4,
    "appearances": 247137,
    "wins": 122090,
    "losses": 125047,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 53.1,
        "games": 4731
      },
      {
        "name": "Mega Slowbro",
        "winRate": 52,
        "games": 5001
      },
      {
        "name": "Mega Abomasnow",
        "winRate": 51.3,
        "games": 9727
      },
      {
        "name": "Talonflame",
        "winRate": 51.1,
        "games": 4851
      },
      {
        "name": "Aegislash",
        "winRate": 51.1,
        "games": 4851
      }
    ],
    "bestSets": []
  },
  "25": {
    "id": 25,
    "name": "Pikachu",
    "isMega": false,
    "elo": 8005,
    "winRate": 49.7,
    "appearances": 14768,
    "wins": 7336,
    "losses": 7432,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 50.3,
        "games": 4902
      },
      {
        "name": "Pinsir",
        "winRate": 50.3,
        "games": 4902
      },
      {
        "name": "Tauros",
        "winRate": 50.3,
        "games": 4902
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 9737
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.2,
        "games": 4835
      }
    ],
    "bestSets": []
  },
  "26": {
    "id": 26,
    "name": "Raichu",
    "isMega": false,
    "elo": 8022,
    "winRate": 50.3,
    "appearances": 14459,
    "wins": 7279,
    "losses": 7180,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 50.7,
        "games": 9478
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.7,
        "games": 9478
      },
      {
        "name": "Garchomp",
        "winRate": 50.7,
        "games": 9478
      },
      {
        "name": "Mega Tyranitar",
        "winRate": 50.7,
        "games": 9478
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 14459
      }
    ],
    "bestSets": []
  },
  "36": {
    "id": 36,
    "name": "Clefable",
    "isMega": false,
    "elo": 7978,
    "winRate": 50.1,
    "appearances": 114126,
    "wins": 57133,
    "losses": 56993,
    "bestPartners": [
      {
        "name": "Slowbro",
        "winRate": 57.4,
        "games": 4296
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 55.6,
        "games": 4531
      },
      {
        "name": "Primarina",
        "winRate": 55,
        "games": 4578
      },
      {
        "name": "Tauros",
        "winRate": 54,
        "games": 9419
      },
      {
        "name": "Scizor",
        "winRate": 54,
        "games": 9419
      }
    ],
    "bestSets": []
  },
  "38": {
    "id": 38,
    "name": "Ninetales",
    "isMega": false,
    "elo": 8028,
    "winRate": 48.5,
    "appearances": 34108,
    "wins": 16543,
    "losses": 17565,
    "bestPartners": [
      {
        "name": "Flareon",
        "winRate": 50.4,
        "games": 5131
      },
      {
        "name": "Venusaur",
        "winRate": 50.3,
        "games": 10102
      },
      {
        "name": "Scovillain",
        "winRate": 50.3,
        "games": 10102
      },
      {
        "name": "Leafeon",
        "winRate": 50.3,
        "games": 10102
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 10102
      }
    ],
    "bestSets": []
  },
  "59": {
    "id": 59,
    "name": "Arcanine",
    "isMega": false,
    "elo": 7984,
    "winRate": 49.2,
    "appearances": 330858,
    "wins": 162657,
    "losses": 168201,
    "bestPartners": [
      {
        "name": "Mega Garchomp Z",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Azumarill",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Empoleon",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Heat Rotom",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Mega Froslass",
        "winRate": 57.5,
        "games": 4323
      }
    ],
    "bestSets": []
  },
  "65": {
    "id": 65,
    "name": "Alakazam",
    "isMega": false,
    "elo": 8020,
    "winRate": 50.7,
    "appearances": 10265,
    "wins": 5206,
    "losses": 5059,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.7,
        "games": 10265
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 10265
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.7,
        "games": 10265
      },
      {
        "name": "Crabominable",
        "winRate": 50.7,
        "games": 10265
      },
      {
        "name": "Aromatisse",
        "winRate": 50.7,
        "games": 10265
      }
    ],
    "bestSets": []
  },
  "68": {
    "id": 68,
    "name": "Machamp",
    "isMega": false,
    "elo": 7993,
    "winRate": 49.5,
    "appearances": 15021,
    "wins": 7435,
    "losses": 7586,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 49.6,
        "games": 5195
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.6,
        "games": 5195
      },
      {
        "name": "Luxray",
        "winRate": 49.6,
        "games": 10124
      },
      {
        "name": "Corviknight",
        "winRate": 49.6,
        "games": 5195
      },
      {
        "name": "Kingambit",
        "winRate": 49.6,
        "games": 4929
      }
    ],
    "bestSets": []
  },
  "71": {
    "id": 71,
    "name": "Victreebel",
    "isMega": false,
    "elo": 7974,
    "winRate": 47.8,
    "appearances": 9775,
    "wins": 4676,
    "losses": 5099,
    "bestPartners": [
      {
        "name": "Simipour",
        "winRate": 47.8,
        "games": 9775
      },
      {
        "name": "Salazzle",
        "winRate": 47.8,
        "games": 9775
      },
      {
        "name": "Alolan Raichu",
        "winRate": 47.8,
        "games": 9775
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 47.8,
        "games": 9775
      },
      {
        "name": "Slowbro",
        "winRate": 47.8,
        "games": 9775
      }
    ],
    "bestSets": []
  },
  "80": {
    "id": 80,
    "name": "Slowbro",
    "isMega": false,
    "elo": 8049,
    "winRate": 50.7,
    "appearances": 202229,
    "wins": 102530,
    "losses": 99699,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 68.9,
        "games": 7024
      },
      {
        "name": "Snorlax",
        "winRate": 68.4,
        "games": 6991
      },
      {
        "name": "Rhyperior",
        "winRate": 62.3,
        "games": 3847
      },
      {
        "name": "Torkoal",
        "winRate": 61.2,
        "games": 15967
      },
      {
        "name": "Sylveon",
        "winRate": 58,
        "games": 4326
      }
    ],
    "bestSets": []
  },
  "94": {
    "id": 94,
    "name": "Gengar",
    "isMega": false,
    "elo": 7980,
    "winRate": 48.2,
    "appearances": 23869,
    "wins": 11515,
    "losses": 12354,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 50.2,
        "games": 9845
      },
      {
        "name": "Krookodile",
        "winRate": 50.2,
        "games": 9845
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 9845
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.2,
        "games": 9845
      },
      {
        "name": "Greninja",
        "winRate": 50.2,
        "games": 9845
      }
    ],
    "bestSets": []
  },
  "115": {
    "id": 115,
    "name": "Kangaskhan",
    "isMega": false,
    "elo": 7929,
    "winRate": 50,
    "appearances": 9965,
    "wins": 4983,
    "losses": 4982,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 9965
      },
      {
        "name": "Arbok",
        "winRate": 50,
        "games": 9965
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 9965
      },
      {
        "name": "Krookodile",
        "winRate": 50,
        "games": 9965
      },
      {
        "name": "Mimikyu",
        "winRate": 50,
        "games": 9965
      }
    ],
    "bestSets": []
  },
  "121": {
    "id": 121,
    "name": "Starmie",
    "isMega": false,
    "elo": 7989,
    "winRate": 50,
    "appearances": 45598,
    "wins": 22813,
    "losses": 22785,
    "bestPartners": [
      {
        "name": "Emboar",
        "winRate": 50.9,
        "games": 10127
      },
      {
        "name": "Greninja",
        "winRate": 50.6,
        "games": 15156
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.6,
        "games": 15156
      },
      {
        "name": "Decidueye",
        "winRate": 50.5,
        "games": 5078
      },
      {
        "name": "Whimsicott",
        "winRate": 50.4,
        "games": 25272
      }
    ],
    "bestSets": []
  },
  "127": {
    "id": 127,
    "name": "Pinsir",
    "isMega": false,
    "elo": 8037,
    "winRate": 56.1,
    "appearances": 21882,
    "wins": 12274,
    "losses": 9608,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Kingambit",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Rhyperior",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Wash Rotom",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Luxray",
        "winRate": 67.6,
        "games": 7247
      }
    ],
    "bestSets": []
  },
  "128": {
    "id": 128,
    "name": "Tauros",
    "isMega": false,
    "elo": 7899,
    "winRate": 48.4,
    "appearances": 310985,
    "wins": 150591,
    "losses": 160394,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 55.1,
        "games": 4598
      },
      {
        "name": "Clefable",
        "winRate": 54,
        "games": 9419
      },
      {
        "name": "Scizor",
        "winRate": 52.1,
        "games": 43794
      },
      {
        "name": "Archaludon",
        "winRate": 51.9,
        "games": 48821
      },
      {
        "name": "Azumarill",
        "winRate": 51.9,
        "games": 4774
      }
    ],
    "bestSets": []
  },
  "130": {
    "id": 130,
    "name": "Gyarados",
    "isMega": false,
    "elo": 7961,
    "winRate": 50.1,
    "appearances": 819283,
    "wins": 410089,
    "losses": 409194,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Stunfisk",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Mega Venusaur",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Palafin",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Mega Froslass",
        "winRate": 57.4,
        "games": 4342
      }
    ],
    "bestSets": []
  },
  "132": {
    "id": 132,
    "name": "Ditto",
    "isMega": false,
    "elo": 7870,
    "winRate": 41.2,
    "appearances": 12629,
    "wins": 5203,
    "losses": 7426,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 4952
      },
      {
        "name": "Luxray",
        "winRate": 50.6,
        "games": 4952
      },
      {
        "name": "Gyarados",
        "winRate": 46.7,
        "games": 9340
      },
      {
        "name": "Whimsicott",
        "winRate": 42.4,
        "games": 4388
      },
      {
        "name": "Banette",
        "winRate": 42.4,
        "games": 4388
      }
    ],
    "bestSets": []
  },
  "134": {
    "id": 134,
    "name": "Vaporeon",
    "isMega": false,
    "elo": 7930,
    "winRate": 48.7,
    "appearances": 33982,
    "wins": 16533,
    "losses": 17449,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 4973
      },
      {
        "name": "Roserade",
        "winRate": 50.1,
        "games": 9904
      },
      {
        "name": "Simipour",
        "winRate": 49.9,
        "games": 19947
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 19947
      },
      {
        "name": "Mega Steelix",
        "winRate": 49.8,
        "games": 9955
      }
    ],
    "bestSets": []
  },
  "135": {
    "id": 135,
    "name": "Jolteon",
    "isMega": false,
    "elo": 7992,
    "winRate": 49.3,
    "appearances": 15062,
    "wins": 7426,
    "losses": 7636,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.7,
        "games": 4935
      },
      {
        "name": "Paldean Tauros",
        "winRate": 49.7,
        "games": 4935
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 4935
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.7,
        "games": 4935
      },
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 10049
      }
    ],
    "bestSets": []
  },
  "136": {
    "id": 136,
    "name": "Flareon",
    "isMega": false,
    "elo": 7976,
    "winRate": 49.5,
    "appearances": 15310,
    "wins": 7571,
    "losses": 7739,
    "bestPartners": [
      {
        "name": "Ninetales",
        "winRate": 50.4,
        "games": 5131
      },
      {
        "name": "Venusaur",
        "winRate": 50.4,
        "games": 5131
      },
      {
        "name": "Scovillain",
        "winRate": 50.4,
        "games": 5131
      },
      {
        "name": "Charizard",
        "winRate": 50.4,
        "games": 5131
      },
      {
        "name": "Leafeon",
        "winRate": 50.4,
        "games": 5131
      }
    ],
    "bestSets": []
  },
  "142": {
    "id": 142,
    "name": "Aerodactyl",
    "isMega": false,
    "elo": 7993,
    "winRate": 52.5,
    "appearances": 33083,
    "wins": 17378,
    "losses": 15705,
    "bestPartners": [
      {
        "name": "Stunfisk",
        "winRate": 61.1,
        "games": 4100
      },
      {
        "name": "Mega Scovillain",
        "winRate": 57,
        "games": 13009
      },
      {
        "name": "Kingambit",
        "winRate": 54.9,
        "games": 17933
      },
      {
        "name": "Empoleon",
        "winRate": 54.9,
        "games": 9133
      },
      {
        "name": "Archaludon",
        "winRate": 53.8,
        "games": 22966
      }
    ],
    "bestSets": []
  },
  "143": {
    "id": 143,
    "name": "Snorlax",
    "isMega": false,
    "elo": 7930,
    "winRate": 51.8,
    "appearances": 88221,
    "wins": 45736,
    "losses": 42485,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 68.7,
        "games": 3454
      },
      {
        "name": "Sneasler",
        "winRate": 68.7,
        "games": 3454
      },
      {
        "name": "Slowbro",
        "winRate": 68.4,
        "games": 6991
      },
      {
        "name": "Drampa",
        "winRate": 67.7,
        "games": 10840
      },
      {
        "name": "Torkoal",
        "winRate": 66.3,
        "games": 14687
      }
    ],
    "bestSets": []
  },
  "149": {
    "id": 149,
    "name": "Dragonite",
    "isMega": false,
    "elo": 7960,
    "winRate": 49.1,
    "appearances": 216867,
    "wins": 106587,
    "losses": 110280,
    "bestPartners": [
      {
        "name": "Clefable",
        "winRate": 52.6,
        "games": 9854
      },
      {
        "name": "Milotic",
        "winRate": 52.3,
        "games": 14657
      },
      {
        "name": "Kingambit",
        "winRate": 51.6,
        "games": 14670
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 51.3,
        "games": 14059
      },
      {
        "name": "Primarina",
        "winRate": 50.7,
        "games": 9922
      }
    ],
    "bestSets": []
  },
  "154": {
    "id": 154,
    "name": "Meganium",
    "isMega": false,
    "elo": 7924,
    "winRate": 50.6,
    "appearances": 9572,
    "wins": 4840,
    "losses": 4732,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 9572
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.6,
        "games": 9572
      },
      {
        "name": "Tinkaton",
        "winRate": 50.6,
        "games": 9572
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.6,
        "games": 9572
      },
      {
        "name": "Feraligatr",
        "winRate": 50.6,
        "games": 9572
      }
    ],
    "bestSets": []
  },
  "157": {
    "id": 157,
    "name": "Typhlosion",
    "isMega": false,
    "elo": 7972,
    "winRate": 50.9,
    "appearances": 14576,
    "wins": 7425,
    "losses": 7151,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Empoleon",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Noivern",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Gyarados",
        "winRate": 51.3,
        "games": 9885
      }
    ],
    "bestSets": []
  },
  "160": {
    "id": 160,
    "name": "Feraligatr",
    "isMega": false,
    "elo": 7990,
    "winRate": 50.9,
    "appearances": 118524,
    "wins": 60329,
    "losses": 58195,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Garchomp",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Tatsugiri",
        "winRate": 60.1,
        "games": 8364
      },
      {
        "name": "Vanilluxe",
        "winRate": 60,
        "games": 8332
      },
      {
        "name": "Charizard",
        "winRate": 60,
        "games": 8332
      }
    ],
    "bestSets": []
  },
  "168": {
    "id": 168,
    "name": "Ariados",
    "isMega": false,
    "elo": 7944,
    "winRate": 47.8,
    "appearances": 14726,
    "wins": 7034,
    "losses": 7692,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 48.8,
        "games": 5051
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 48.8,
        "games": 5051
      },
      {
        "name": "Krookodile",
        "winRate": 48.3,
        "games": 9906
      },
      {
        "name": "Lycanroc",
        "winRate": 47.8,
        "games": 9871
      },
      {
        "name": "Hydreigon",
        "winRate": 47.8,
        "games": 9871
      }
    ],
    "bestSets": []
  },
  "181": {
    "id": 181,
    "name": "Ampharos",
    "isMega": false,
    "elo": 7943,
    "winRate": 49.6,
    "appearances": 9507,
    "wins": 4719,
    "losses": 4788,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 9507
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.6,
        "games": 9507
      },
      {
        "name": "Paldean Tauros",
        "winRate": 49.6,
        "games": 9507
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.6,
        "games": 9507
      },
      {
        "name": "Tauros",
        "winRate": 49.6,
        "games": 9507
      }
    ],
    "bestSets": []
  },
  "184": {
    "id": 184,
    "name": "Azumarill",
    "isMega": false,
    "elo": 8041,
    "winRate": 52.3,
    "appearances": 85961,
    "wins": 44943,
    "losses": 41018,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Torkoal",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Hatterene",
        "winRate": 61.1,
        "games": 8138
      },
      {
        "name": "Sneasler",
        "winRate": 60.9,
        "games": 8200
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 60,
        "games": 4103
      }
    ],
    "bestSets": []
  },
  "186": {
    "id": 186,
    "name": "Politoed",
    "isMega": false,
    "elo": 8003,
    "winRate": 50.1,
    "appearances": 149240,
    "wins": 74768,
    "losses": 74472,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.9,
        "games": 49813
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 50.8,
        "games": 40052
      },
      {
        "name": "Mega Gengar",
        "winRate": 50.8,
        "games": 30444
      },
      {
        "name": "Mega Tyranitar",
        "winRate": 50.8,
        "games": 30444
      },
      {
        "name": "Mega Dragonite",
        "winRate": 50.8,
        "games": 20293
      }
    ],
    "bestSets": []
  },
  "196": {
    "id": 196,
    "name": "Espeon",
    "isMega": false,
    "elo": 7889,
    "winRate": 48.8,
    "appearances": 24300,
    "wins": 11862,
    "losses": 12438,
    "bestPartners": [
      {
        "name": "Aromatisse",
        "winRate": 49.9,
        "games": 4949
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.9,
        "games": 4949
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 9763
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.8,
        "games": 9763
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 9798
      }
    ],
    "bestSets": []
  },
  "197": {
    "id": 197,
    "name": "Umbreon",
    "isMega": false,
    "elo": 7901,
    "winRate": 47.1,
    "appearances": 28426,
    "wins": 13388,
    "losses": 15038,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 50.3,
        "games": 5052
      },
      {
        "name": "Mega Chandelure",
        "winRate": 49.6,
        "games": 4963
      },
      {
        "name": "Dragonite",
        "winRate": 49.6,
        "games": 4963
      },
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 4963
      },
      {
        "name": "Weavile",
        "winRate": 49.6,
        "games": 4963
      }
    ],
    "bestSets": []
  },
  "199": {
    "id": 199,
    "name": "Slowking",
    "isMega": false,
    "elo": 7995,
    "winRate": 46.8,
    "appearances": 18788,
    "wins": 8796,
    "losses": 9992,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.7,
        "games": 4936
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 4936
      },
      {
        "name": "Paldean Tauros",
        "winRate": 49.7,
        "games": 4936
      },
      {
        "name": "Kingambit",
        "winRate": 49.7,
        "games": 4936
      },
      {
        "name": "Arbok",
        "winRate": 49.7,
        "games": 4936
      }
    ],
    "bestSets": []
  },
  "205": {
    "id": 205,
    "name": "Forretress",
    "isMega": false,
    "elo": 8013,
    "winRate": 46.7,
    "appearances": 252076,
    "wins": 117815,
    "losses": 134261,
    "bestPartners": [
      {
        "name": "Klefki",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Corviknight",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Mega Garchomp",
        "winRate": 51.9,
        "games": 9420
      },
      {
        "name": "Mega Blastoise",
        "winRate": 51.1,
        "games": 4915
      },
      {
        "name": "Mega Camerupt",
        "winRate": 50.7,
        "games": 5035
      }
    ],
    "bestSets": []
  },
  "208": {
    "id": 208,
    "name": "Steelix",
    "isMega": false,
    "elo": 7937,
    "winRate": 48.2,
    "appearances": 57956,
    "wins": 27940,
    "losses": 30016,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 15064
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 50.6,
        "games": 15064
      },
      {
        "name": "Archaludon",
        "winRate": 50.4,
        "games": 20006
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 50.4,
        "games": 20006
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.2,
        "games": 5229
      }
    ],
    "bestSets": []
  },
  "212": {
    "id": 212,
    "name": "Scizor",
    "isMega": false,
    "elo": 7938,
    "winRate": 50,
    "appearances": 176211,
    "wins": 88130,
    "losses": 88081,
    "bestPartners": [
      {
        "name": "Clefable",
        "winRate": 54,
        "games": 9419
      },
      {
        "name": "Mega Floette",
        "winRate": 53.2,
        "games": 4760
      },
      {
        "name": "Mega Clefable",
        "winRate": 52.4,
        "games": 14441
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 52.3,
        "games": 4847
      },
      {
        "name": "Slurpuff",
        "winRate": 52.1,
        "games": 4828
      }
    ],
    "bestSets": []
  },
  "214": {
    "id": 214,
    "name": "Heracross",
    "isMega": false,
    "elo": 7985,
    "winRate": 50.5,
    "appearances": 27203,
    "wins": 13728,
    "losses": 13475,
    "bestPartners": [
      {
        "name": "Frost Rotom",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Talonflame",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Primarina",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Garchomp",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Archaludon",
        "winRate": 54.3,
        "games": 9468
      }
    ],
    "bestSets": []
  },
  "227": {
    "id": 227,
    "name": "Skarmory",
    "isMega": false,
    "elo": 7997,
    "winRate": 48.9,
    "appearances": 82791,
    "wins": 40477,
    "losses": 42314,
    "bestPartners": [
      {
        "name": "Toxapex",
        "winRate": 50.2,
        "games": 4944
      },
      {
        "name": "Slurpuff",
        "winRate": 50,
        "games": 9841
      },
      {
        "name": "Archaludon",
        "winRate": 50,
        "games": 15004
      },
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 4902
      },
      {
        "name": "Mega Scovillain",
        "winRate": 49.9,
        "games": 5033
      }
    ],
    "bestSets": []
  },
  "229": {
    "id": 229,
    "name": "Houndoom",
    "isMega": false,
    "elo": 7890,
    "winRate": 50.4,
    "appearances": 10201,
    "wins": 5142,
    "losses": 5059,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 10201
      },
      {
        "name": "Decidueye",
        "winRate": 50.4,
        "games": 10201
      },
      {
        "name": "Whimsicott",
        "winRate": 50.4,
        "games": 10201
      },
      {
        "name": "Dragapult",
        "winRate": 50.4,
        "games": 10201
      },
      {
        "name": "Basculegion",
        "winRate": 50.4,
        "games": 10201
      }
    ],
    "bestSets": []
  },
  "248": {
    "id": 248,
    "name": "Tyranitar",
    "isMega": false,
    "elo": 7998,
    "winRate": 53.8,
    "appearances": 97684,
    "wins": 52586,
    "losses": 45098,
    "bestPartners": [
      {
        "name": "Slowbro",
        "winRate": 68.9,
        "games": 7024
      },
      {
        "name": "Torkoal",
        "winRate": 66.5,
        "games": 14720
      },
      {
        "name": "Drampa",
        "winRate": 63.5,
        "games": 19495
      },
      {
        "name": "Hatterene",
        "winRate": 61.1,
        "games": 16351
      },
      {
        "name": "Snorlax",
        "winRate": 58.8,
        "games": 25520
      }
    ],
    "bestSets": []
  },
  "279": {
    "id": 279,
    "name": "Pelipper",
    "isMega": false,
    "elo": 7993,
    "winRate": 49.5,
    "appearances": 75554,
    "wins": 37363,
    "losses": 38191,
    "bestPartners": [
      {
        "name": "Heliolisk",
        "winRate": 50.8,
        "games": 4818
      },
      {
        "name": "Charizard",
        "winRate": 50.8,
        "games": 4818
      },
      {
        "name": "Pinsir",
        "winRate": 50.8,
        "games": 4818
      },
      {
        "name": "Abomasnow",
        "winRate": 50.5,
        "games": 5243
      },
      {
        "name": "Araquanid",
        "winRate": 50.5,
        "games": 5243
      }
    ],
    "bestSets": []
  },
  "282": {
    "id": 282,
    "name": "Gardevoir",
    "isMega": false,
    "elo": 8018,
    "winRate": 48.7,
    "appearances": 58115,
    "wins": 28291,
    "losses": 29824,
    "bestPartners": [
      {
        "name": "Garganacl",
        "winRate": 52.5,
        "games": 4749
      },
      {
        "name": "Hatterene",
        "winRate": 52.1,
        "games": 9779
      },
      {
        "name": "Mega Scizor",
        "winRate": 51.7,
        "games": 5030
      },
      {
        "name": "Mega Kangaskhan",
        "winRate": 51.2,
        "games": 4936
      },
      {
        "name": "Gyarados",
        "winRate": 51.2,
        "games": 4936
      }
    ],
    "bestSets": []
  },
  "302": {
    "id": 302,
    "name": "Sableye",
    "isMega": false,
    "elo": 7935,
    "winRate": 48.3,
    "appearances": 19579,
    "wins": 9447,
    "losses": 10132,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 51.1,
        "games": 4991
      },
      {
        "name": "Whimsicott",
        "winRate": 51.1,
        "games": 4991
      },
      {
        "name": "Garchomp",
        "winRate": 50.2,
        "games": 10108
      },
      {
        "name": "Dragapult",
        "winRate": 50.2,
        "games": 10108
      },
      {
        "name": "Kingambit",
        "winRate": 49.4,
        "games": 5117
      }
    ],
    "bestSets": []
  },
  "306": {
    "id": 306,
    "name": "Aggron",
    "isMega": false,
    "elo": 7966,
    "winRate": 47.4,
    "appearances": 84095,
    "wins": 39885,
    "losses": 44210,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Mega Venusaur",
        "winRate": 54.7,
        "games": 9341
      },
      {
        "name": "Incineroar",
        "winRate": 53,
        "games": 9288
      },
      {
        "name": "Gyarados",
        "winRate": 52,
        "games": 14506
      },
      {
        "name": "Feraligatr",
        "winRate": 51.4,
        "games": 13874
      }
    ],
    "bestSets": []
  },
  "308": {
    "id": 308,
    "name": "Medicham",
    "isMega": false,
    "elo": 7865,
    "winRate": 41.1,
    "appearances": 8212,
    "wins": 3379,
    "losses": 4833,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 41.1,
        "games": 8212
      },
      {
        "name": "Aggron",
        "winRate": 41.1,
        "games": 8212
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 41.1,
        "games": 8212
      },
      {
        "name": "Tauros",
        "winRate": 41.1,
        "games": 8212
      },
      {
        "name": "Snorlax",
        "winRate": 41.1,
        "games": 8212
      }
    ],
    "bestSets": []
  },
  "310": {
    "id": 310,
    "name": "Manectric",
    "isMega": false,
    "elo": 7954,
    "winRate": 50.8,
    "appearances": 10021,
    "wins": 5089,
    "losses": 4932,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 10021
      },
      {
        "name": "Incineroar",
        "winRate": 50.8,
        "games": 10021
      },
      {
        "name": "Krookodile",
        "winRate": 50.8,
        "games": 10021
      },
      {
        "name": "Luxray",
        "winRate": 50.8,
        "games": 10021
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.8,
        "games": 10021
      }
    ],
    "bestSets": []
  },
  "319": {
    "id": 319,
    "name": "Sharpedo",
    "isMega": false,
    "elo": 7939,
    "winRate": 49.9,
    "appearances": 39471,
    "wins": 19710,
    "losses": 19761,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 51.4,
        "games": 4921
      },
      {
        "name": "Paldean Tauros",
        "winRate": 51.4,
        "games": 4921
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 51.4,
        "games": 4921
      },
      {
        "name": "Kingambit",
        "winRate": 51.4,
        "games": 4921
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50,
        "games": 19365
      }
    ],
    "bestSets": []
  },
  "323": {
    "id": 323,
    "name": "Camerupt",
    "isMega": false,
    "elo": 7931,
    "winRate": 49.4,
    "appearances": 19972,
    "wins": 9860,
    "losses": 10112,
    "bestPartners": [
      {
        "name": "Mega Skarmory",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Hydreigon",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Krookodile",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Kommo-o",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Luxray",
        "winRate": 49.9,
        "games": 4870
      }
    ],
    "bestSets": []
  },
  "324": {
    "id": 324,
    "name": "Torkoal",
    "isMega": false,
    "elo": 7974,
    "winRate": 54.7,
    "appearances": 192691,
    "wins": 105484,
    "losses": 87207,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Wyrdeer",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Azumarill",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Drampa",
        "winRate": 66.5,
        "games": 14720
      },
      {
        "name": "Tyranitar",
        "winRate": 66.5,
        "games": 14720
      }
    ],
    "bestSets": []
  },
  "334": {
    "id": 334,
    "name": "Altaria",
    "isMega": false,
    "elo": 7943,
    "winRate": 48.1,
    "appearances": 140263,
    "wins": 67440,
    "losses": 72823,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 51,
        "games": 4940
      },
      {
        "name": "Mega Lucario Z",
        "winRate": 50.7,
        "games": 15099
      },
      {
        "name": "Torterra",
        "winRate": 50.6,
        "games": 5029
      },
      {
        "name": "Slowbro",
        "winRate": 50.5,
        "games": 9546
      },
      {
        "name": "Milotic",
        "winRate": 50.3,
        "games": 9635
      }
    ],
    "bestSets": []
  },
  "350": {
    "id": 350,
    "name": "Milotic",
    "isMega": false,
    "elo": 8022,
    "winRate": 51.2,
    "appearances": 64129,
    "wins": 32854,
    "losses": 31275,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 55.7,
        "games": 4658
      },
      {
        "name": "Palafin",
        "winRate": 55.7,
        "games": 4658
      },
      {
        "name": "Archaludon",
        "winRate": 55.7,
        "games": 4658
      },
      {
        "name": "Feraligatr",
        "winRate": 52.7,
        "games": 9649
      },
      {
        "name": "Hydreigon",
        "winRate": 52.7,
        "games": 4916
      }
    ],
    "bestSets": []
  },
  "351": {
    "id": 351,
    "name": "Castform",
    "isMega": false,
    "elo": 7913,
    "winRate": 49.2,
    "appearances": 14977,
    "wins": 7376,
    "losses": 7601,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 4814
      },
      {
        "name": "Tauros",
        "winRate": 49.5,
        "games": 4814
      },
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 4814
      },
      {
        "name": "Krookodile",
        "winRate": 49.5,
        "games": 4814
      },
      {
        "name": "Froslass",
        "winRate": 49.5,
        "games": 4814
      }
    ],
    "bestSets": []
  },
  "354": {
    "id": 354,
    "name": "Banette",
    "isMega": false,
    "elo": 7973,
    "winRate": 44.3,
    "appearances": 40267,
    "wins": 17821,
    "losses": 22446,
    "bestPartners": [
      {
        "name": "Mega Lopunny",
        "winRate": 50.2,
        "games": 4997
      },
      {
        "name": "Cofagrigus",
        "winRate": 50,
        "games": 15043
      },
      {
        "name": "Furfrou",
        "winRate": 50,
        "games": 5171
      },
      {
        "name": "Polteageist",
        "winRate": 50,
        "games": 5171
      },
      {
        "name": "Paldean Tauros",
        "winRate": 50,
        "games": 5171
      }
    ],
    "bestSets": []
  },
  "358": {
    "id": 358,
    "name": "Chimecho",
    "isMega": false,
    "elo": 7931,
    "winRate": 49.4,
    "appearances": 9901,
    "wins": 4889,
    "losses": 5012,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 49.4,
        "games": 9901
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.4,
        "games": 9901
      },
      {
        "name": "Incineroar",
        "winRate": 49.4,
        "games": 9901
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.4,
        "games": 9901
      },
      {
        "name": "Krookodile",
        "winRate": 49.4,
        "games": 9901
      }
    ],
    "bestSets": []
  },
  "359": {
    "id": 359,
    "name": "Absol",
    "isMega": false,
    "elo": 7937,
    "winRate": 49.3,
    "appearances": 10257,
    "wins": 5053,
    "losses": 5204,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.3,
        "games": 10257
      },
      {
        "name": "Arcanine",
        "winRate": 49.3,
        "games": 10257
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.3,
        "games": 10257
      },
      {
        "name": "Froslass",
        "winRate": 49.3,
        "games": 10257
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 49.3,
        "games": 10257
      }
    ],
    "bestSets": []
  },
  "362": {
    "id": 362,
    "name": "Glalie",
    "isMega": false,
    "elo": 7961,
    "winRate": 49.9,
    "appearances": 9904,
    "wins": 4941,
    "losses": 4963,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 9904
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.9,
        "games": 9904
      },
      {
        "name": "Arcanine",
        "winRate": 49.9,
        "games": 9904
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.9,
        "games": 9904
      },
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 9904
      }
    ],
    "bestSets": []
  },
  "376": {
    "id": 376,
    "name": "Metagross",
    "isMega": false,
    "elo": 7991,
    "winRate": 51,
    "appearances": 93752,
    "wins": 47796,
    "losses": 45956,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 55.3,
        "games": 13848
      },
      {
        "name": "Heracross",
        "winRate": 54.3,
        "games": 9468
      },
      {
        "name": "Mega Heracross",
        "winRate": 53.1,
        "games": 9503
      },
      {
        "name": "Archaludon",
        "winRate": 52.4,
        "games": 33784
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 52.3,
        "games": 4847
      }
    ],
    "bestSets": []
  },
  "389": {
    "id": 389,
    "name": "Torterra",
    "isMega": false,
    "elo": 7950,
    "winRate": 48.3,
    "appearances": 14385,
    "wins": 6945,
    "losses": 7440,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.9,
        "games": 5080
      },
      {
        "name": "Milotic",
        "winRate": 50.7,
        "games": 10109
      },
      {
        "name": "Dragonite",
        "winRate": 50.6,
        "games": 5029
      },
      {
        "name": "Altaria",
        "winRate": 50.6,
        "games": 5029
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 5029
      }
    ],
    "bestSets": []
  },
  "392": {
    "id": 392,
    "name": "Infernape",
    "isMega": false,
    "elo": 7973,
    "winRate": 49.2,
    "appearances": 24538,
    "wins": 12066,
    "losses": 12472,
    "bestPartners": [
      {
        "name": "Mr. Rime",
        "winRate": 50.7,
        "games": 4748
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 4748
      },
      {
        "name": "Ursaluna",
        "winRate": 50.7,
        "games": 4748
      },
      {
        "name": "Vanilluxe",
        "winRate": 50.6,
        "games": 4984
      },
      {
        "name": "Charizard",
        "winRate": 50.6,
        "games": 4984
      }
    ],
    "bestSets": []
  },
  "395": {
    "id": 395,
    "name": "Empoleon",
    "isMega": false,
    "elo": 7980,
    "winRate": 52.2,
    "appearances": 65842,
    "wins": 34354,
    "losses": 31488,
    "bestPartners": [
      {
        "name": "Mega Pinsir",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Wash Rotom",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Kingambit",
        "winRate": 61.1,
        "games": 4100
      },
      {
        "name": "Arcanine",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Azumarill",
        "winRate": 56.8,
        "games": 8857
      }
    ],
    "bestSets": []
  },
  "405": {
    "id": 405,
    "name": "Luxray",
    "isMega": false,
    "elo": 8037,
    "winRate": 49.2,
    "appearances": 273616,
    "wins": 134546,
    "losses": 139070,
    "bestPartners": [
      {
        "name": "Mega Pinsir",
        "winRate": 67.9,
        "games": 3591
      },
      {
        "name": "Wash Rotom",
        "winRate": 67.7,
        "games": 10838
      },
      {
        "name": "Pinsir",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Rhyperior",
        "winRate": 59.5,
        "games": 28704
      },
      {
        "name": "Archaludon",
        "winRate": 55.8,
        "games": 48696
      }
    ],
    "bestSets": []
  },
  "407": {
    "id": 407,
    "name": "Roserade",
    "isMega": false,
    "elo": 7934,
    "winRate": 53,
    "appearances": 13844,
    "wins": 7338,
    "losses": 6506,
    "bestPartners": [
      {
        "name": "Clawitzer",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Serperior",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Sinistcha",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Heat Rotom",
        "winRate": 54.3,
        "games": 8871
      }
    ],
    "bestSets": []
  },
  "409": {
    "id": 409,
    "name": "Rampardos",
    "isMega": false,
    "elo": 7947,
    "winRate": 44.3,
    "appearances": 13252,
    "wins": 5870,
    "losses": 7382,
    "bestPartners": [
      {
        "name": "Decidueye",
        "winRate": 49.8,
        "games": 4889
      },
      {
        "name": "Alolan Raichu",
        "winRate": 49.8,
        "games": 4889
      },
      {
        "name": "Whimsicott",
        "winRate": 48.3,
        "games": 9719
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 48.3,
        "games": 9719
      },
      {
        "name": "Pelipper",
        "winRate": 46.7,
        "games": 4830
      }
    ],
    "bestSets": []
  },
  "411": {
    "id": 411,
    "name": "Bastiodon",
    "isMega": false,
    "elo": 7923,
    "winRate": 45.9,
    "appearances": 27691,
    "wins": 12724,
    "losses": 14967,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.5,
        "games": 5076
      },
      {
        "name": "Orthworm",
        "winRate": 50.5,
        "games": 5076
      },
      {
        "name": "Mega Dragonite",
        "winRate": 48.1,
        "games": 4972
      },
      {
        "name": "Incineroar",
        "winRate": 48.1,
        "games": 4972
      },
      {
        "name": "Mega Altaria",
        "winRate": 48,
        "games": 9646
      }
    ],
    "bestSets": []
  },
  "442": {
    "id": 442,
    "name": "Spiritomb",
    "isMega": false,
    "elo": 7993,
    "winRate": 49.6,
    "appearances": 15372,
    "wins": 7630,
    "losses": 7742,
    "bestPartners": [
      {
        "name": "Arbok",
        "winRate": 50.3,
        "games": 5204
      },
      {
        "name": "Paldean Tauros",
        "winRate": 50.3,
        "games": 5204
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 5204
      },
      {
        "name": "Tauros",
        "winRate": 50.1,
        "games": 10252
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 5048
      }
    ],
    "bestSets": []
  },
  "445": {
    "id": 445,
    "name": "Garchomp",
    "isMega": false,
    "elo": 8009,
    "winRate": 50.3,
    "appearances": 1572008,
    "wins": 790514,
    "losses": 781494,
    "bestPartners": [
      {
        "name": "Feraligatr",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Vanilluxe",
        "winRate": 59.4,
        "games": 8397
      },
      {
        "name": "Vivillon",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Wash Rotom",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Blastoise",
        "winRate": 58.7,
        "games": 4300
      }
    ],
    "bestSets": []
  },
  "448": {
    "id": 448,
    "name": "Lucario",
    "isMega": false,
    "elo": 7912,
    "winRate": 49.6,
    "appearances": 60166,
    "wins": 29856,
    "losses": 30310,
    "bestPartners": [
      {
        "name": "Mega Meowstic",
        "winRate": 51.3,
        "games": 4941
      },
      {
        "name": "Sneasler",
        "winRate": 51.3,
        "games": 4941
      },
      {
        "name": "Azumarill",
        "winRate": 51.3,
        "games": 4941
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51.3,
        "games": 4941
      },
      {
        "name": "Mow Rotom",
        "winRate": 50.7,
        "games": 4807
      }
    ],
    "bestSets": []
  },
  "450": {
    "id": 450,
    "name": "Hippowdon",
    "isMega": false,
    "elo": 8034,
    "winRate": 52.6,
    "appearances": 14054,
    "wins": 7386,
    "losses": 6668,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Diggersby",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Sandaconda",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Archaludon",
        "winRate": 58,
        "games": 4336
      }
    ],
    "bestSets": []
  },
  "454": {
    "id": 454,
    "name": "Toxicroak",
    "isMega": false,
    "elo": 7949,
    "winRate": 51.2,
    "appearances": 14497,
    "wins": 7418,
    "losses": 7079,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 54.6,
        "games": 4588
      },
      {
        "name": "Archaludon",
        "winRate": 54.6,
        "games": 4588
      },
      {
        "name": "Incineroar",
        "winRate": 52.2,
        "games": 9545
      },
      {
        "name": "Wyrdeer",
        "winRate": 51.8,
        "games": 9540
      },
      {
        "name": "Gyarados",
        "winRate": 51.8,
        "games": 9540
      }
    ],
    "bestSets": []
  },
  "460": {
    "id": 460,
    "name": "Abomasnow",
    "isMega": false,
    "elo": 7954,
    "winRate": 50.2,
    "appearances": 30616,
    "wins": 15379,
    "losses": 15237,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 50.8,
        "games": 5100
      },
      {
        "name": "Greninja",
        "winRate": 50.8,
        "games": 5100
      },
      {
        "name": "Noivern",
        "winRate": 50.8,
        "games": 5100
      },
      {
        "name": "Mega Camerupt",
        "winRate": 50.7,
        "games": 10343
      },
      {
        "name": "Mega Chandelure",
        "winRate": 50.6,
        "games": 5030
      }
    ],
    "bestSets": []
  },
  "461": {
    "id": 461,
    "name": "Weavile",
    "isMega": false,
    "elo": 8000,
    "winRate": 49.9,
    "appearances": 19920,
    "wins": 9937,
    "losses": 9983,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.6,
        "games": 5030
      },
      {
        "name": "Abomasnow",
        "winRate": 50.6,
        "games": 5030
      },
      {
        "name": "Mega Chandelure",
        "winRate": 50.1,
        "games": 9993
      },
      {
        "name": "Dragonite",
        "winRate": 50.1,
        "games": 9993
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 19920
      }
    ],
    "bestSets": []
  },
  "464": {
    "id": 464,
    "name": "Rhyperior",
    "isMega": false,
    "elo": 8011,
    "winRate": 53.1,
    "appearances": 212359,
    "wins": 112814,
    "losses": 99545,
    "bestPartners": [
      {
        "name": "Mega Pinsir",
        "winRate": 67.9,
        "games": 3591
      },
      {
        "name": "Wash Rotom",
        "winRate": 67.7,
        "games": 10838
      },
      {
        "name": "Pinsir",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Slowbro",
        "winRate": 62.3,
        "games": 3847
      },
      {
        "name": "Mega Scovillain",
        "winRate": 61.8,
        "games": 3876
      }
    ],
    "bestSets": []
  },
  "470": {
    "id": 470,
    "name": "Leafeon",
    "isMega": false,
    "elo": 8031,
    "winRate": 50.5,
    "appearances": 14958,
    "wins": 7547,
    "losses": 7411,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 4856
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.7,
        "games": 4856
      },
      {
        "name": "Tinkaton",
        "winRate": 50.7,
        "games": 4856
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 4856
      },
      {
        "name": "Feraligatr",
        "winRate": 50.7,
        "games": 4856
      }
    ],
    "bestSets": []
  },
  "471": {
    "id": 471,
    "name": "Glaceon",
    "isMega": false,
    "elo": 8004,
    "winRate": 49.9,
    "appearances": 15010,
    "wins": 7490,
    "losses": 7520,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.1,
        "games": 5099
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 5099
      },
      {
        "name": "Whimsicott",
        "winRate": 50.1,
        "games": 5099
      },
      {
        "name": "Froslass",
        "winRate": 50,
        "games": 10081
      },
      {
        "name": "Mega Skarmory",
        "winRate": 49.9,
        "games": 4982
      }
    ],
    "bestSets": []
  },
  "472": {
    "id": 472,
    "name": "Gliscor",
    "isMega": false,
    "elo": 7977,
    "winRate": 51,
    "appearances": 79488,
    "wins": 40525,
    "losses": 38963,
    "bestPartners": [
      {
        "name": "Mega Kangaskhan",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Sylveon",
        "winRate": 58,
        "games": 4326
      },
      {
        "name": "Sneasler",
        "winRate": 57.7,
        "games": 13022
      },
      {
        "name": "Slowbro",
        "winRate": 57.7,
        "games": 13022
      },
      {
        "name": "Alcremie",
        "winRate": 57.7,
        "games": 4400
      }
    ],
    "bestSets": []
  },
  "473": {
    "id": 473,
    "name": "Mamoswine",
    "isMega": false,
    "elo": 7997,
    "winRate": 48.5,
    "appearances": 19975,
    "wins": 9692,
    "losses": 10283,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Trevenant",
        "winRate": 49.7,
        "games": 10226
      },
      {
        "name": "Appletun",
        "winRate": 49.7,
        "games": 10226
      },
      {
        "name": "Mega Chandelure",
        "winRate": 49.2,
        "games": 5099
      },
      {
        "name": "Hatterene",
        "winRate": 49.2,
        "games": 5099
      }
    ],
    "bestSets": []
  },
  "475": {
    "id": 475,
    "name": "Gallade",
    "isMega": false,
    "elo": 7848,
    "winRate": 42,
    "appearances": 8359,
    "wins": 3512,
    "losses": 4847,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 42,
        "games": 8359
      },
      {
        "name": "Kingambit",
        "winRate": 42,
        "games": 8359
      },
      {
        "name": "Bastiodon",
        "winRate": 42,
        "games": 8359
      },
      {
        "name": "Aggron",
        "winRate": 42,
        "games": 8359
      },
      {
        "name": "Steelix",
        "winRate": 42,
        "games": 8359
      }
    ],
    "bestSets": []
  },
  "478": {
    "id": 478,
    "name": "Froslass",
    "isMega": false,
    "elo": 7949,
    "winRate": 49.6,
    "appearances": 111926,
    "wins": 55510,
    "losses": 56416,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 72.3,
        "games": 3305
      },
      {
        "name": "Sneasler",
        "winRate": 72.3,
        "games": 3305
      },
      {
        "name": "Mega Scizor",
        "winRate": 58.8,
        "games": 8338
      },
      {
        "name": "Archaludon",
        "winRate": 56,
        "games": 13210
      },
      {
        "name": "Krookodile",
        "winRate": 52.5,
        "games": 28139
      }
    ],
    "bestSets": []
  },
  "479": {
    "id": 479,
    "name": "Rotom",
    "isMega": false,
    "elo": 7969,
    "winRate": 46.1,
    "appearances": 46483,
    "wins": 21441,
    "losses": 25042,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 4933
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 4933
      },
      {
        "name": "Azumarill",
        "winRate": 50.1,
        "games": 9983
      },
      {
        "name": "Slurpuff",
        "winRate": 49.8,
        "games": 4897
      },
      {
        "name": "Skarmory",
        "winRate": 49.8,
        "games": 4897
      }
    ],
    "bestSets": []
  },
  "497": {
    "id": 497,
    "name": "Serperior",
    "isMega": false,
    "elo": 7923,
    "winRate": 49.1,
    "appearances": 12655,
    "wins": 6219,
    "losses": 6436,
    "bestPartners": [
      {
        "name": "Clawitzer",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Sinistcha",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Roserade",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 60.4,
        "games": 3940
      }
    ],
    "bestSets": []
  },
  "500": {
    "id": 500,
    "name": "Emboar",
    "isMega": false,
    "elo": 7986,
    "winRate": 50.4,
    "appearances": 25095,
    "wins": 12645,
    "losses": 12450,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 10127
      },
      {
        "name": "Whimsicott",
        "winRate": 50.9,
        "games": 10127
      },
      {
        "name": "Starmie",
        "winRate": 50.9,
        "games": 10127
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.9,
        "games": 10127
      },
      {
        "name": "Greninja",
        "winRate": 50.6,
        "games": 15096
      }
    ],
    "bestSets": []
  },
  "503": {
    "id": 503,
    "name": "Samurott",
    "isMega": false,
    "elo": 7969,
    "winRate": 50.3,
    "appearances": 24658,
    "wins": 12396,
    "losses": 12262,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 54.1,
        "games": 4754
      },
      {
        "name": "Empoleon",
        "winRate": 54.1,
        "games": 4754
      },
      {
        "name": "Gourgeist",
        "winRate": 51.7,
        "games": 9807
      },
      {
        "name": "Snorlax",
        "winRate": 51.7,
        "games": 9807
      },
      {
        "name": "Tyranitar",
        "winRate": 51.7,
        "games": 9807
      }
    ],
    "bestSets": []
  },
  "505": {
    "id": 505,
    "name": "Watchog",
    "isMega": false,
    "elo": 7949,
    "winRate": 48.9,
    "appearances": 15092,
    "wins": 7379,
    "losses": 7713,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 5027
      },
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 5027
      },
      {
        "name": "Incineroar",
        "winRate": 49.2,
        "games": 10047
      },
      {
        "name": "Froslass",
        "winRate": 49.2,
        "games": 10047
      },
      {
        "name": "Tauros",
        "winRate": 49,
        "games": 10072
      }
    ],
    "bestSets": []
  },
  "510": {
    "id": 510,
    "name": "Liepard",
    "isMega": false,
    "elo": 7853,
    "winRate": 45,
    "appearances": 81301,
    "wins": 36588,
    "losses": 44713,
    "bestPartners": [
      {
        "name": "Chandelure",
        "winRate": 50.6,
        "games": 9961
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 25152
      },
      {
        "name": "Aegislash",
        "winRate": 50.1,
        "games": 5070
      },
      {
        "name": "Gliscor",
        "winRate": 50.1,
        "games": 5070
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50,
        "games": 10024
      }
    ],
    "bestSets": []
  },
  "512": {
    "id": 512,
    "name": "Simisage",
    "isMega": false,
    "elo": 7941,
    "winRate": 47.9,
    "appearances": 14222,
    "wins": 6807,
    "losses": 7415,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 4811
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.9,
        "games": 4811
      },
      {
        "name": "Tinkaton",
        "winRate": 50.9,
        "games": 4811
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.9,
        "games": 4811
      },
      {
        "name": "Feraligatr",
        "winRate": 50.9,
        "games": 4811
      }
    ],
    "bestSets": []
  },
  "514": {
    "id": 514,
    "name": "Simisear",
    "isMega": false,
    "elo": 7970,
    "winRate": 47.8,
    "appearances": 14815,
    "wins": 7076,
    "losses": 7739,
    "bestPartners": [
      {
        "name": "Quaquaval",
        "winRate": 48.6,
        "games": 4992
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 48.6,
        "games": 4992
      },
      {
        "name": "Krookodile",
        "winRate": 48.2,
        "games": 9966
      },
      {
        "name": "Noivern",
        "winRate": 48.2,
        "games": 9966
      },
      {
        "name": "Araquanid",
        "winRate": 47.9,
        "games": 4974
      }
    ],
    "bestSets": []
  },
  "516": {
    "id": 516,
    "name": "Simipour",
    "isMega": false,
    "elo": 7946,
    "winRate": 44.9,
    "appearances": 85905,
    "wins": 38539,
    "losses": 47366,
    "bestPartners": [
      {
        "name": "Roserade",
        "winRate": 50.7,
        "games": 4973
      },
      {
        "name": "Milotic",
        "winRate": 50.6,
        "games": 5029
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 5029
      },
      {
        "name": "Vaporeon",
        "winRate": 49.9,
        "games": 19947
      },
      {
        "name": "Mega Steelix",
        "winRate": 49.9,
        "games": 5048
      }
    ],
    "bestSets": []
  },
  "530": {
    "id": 530,
    "name": "Excadrill",
    "isMega": false,
    "elo": 8028,
    "winRate": 50.1,
    "appearances": 330293,
    "wins": 165542,
    "losses": 164751,
    "bestPartners": [
      {
        "name": "Tinkaton",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Wash Rotom",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Blastoise",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Hydreigon",
        "winRate": 55.9,
        "games": 4574
      },
      {
        "name": "Primarina",
        "winRate": 55.9,
        "games": 4574
      }
    ],
    "bestSets": []
  },
  "531": {
    "id": 531,
    "name": "Audino",
    "isMega": false,
    "elo": 7935,
    "winRate": 49.9,
    "appearances": 9635,
    "wins": 4808,
    "losses": 4827,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 9635
      },
      {
        "name": "Cofagrigus",
        "winRate": 49.9,
        "games": 9635
      },
      {
        "name": "Hatterene",
        "winRate": 49.9,
        "games": 9635
      },
      {
        "name": "Arbok",
        "winRate": 49.9,
        "games": 9635
      },
      {
        "name": "Reuniclus",
        "winRate": 49.9,
        "games": 9635
      }
    ],
    "bestSets": []
  },
  "534": {
    "id": 534,
    "name": "Conkeldurr",
    "isMega": false,
    "elo": 8044,
    "winRate": 50.6,
    "appearances": 30370,
    "wins": 15367,
    "losses": 15003,
    "bestPartners": [
      {
        "name": "Mega Alakazam",
        "winRate": 51,
        "games": 4995
      },
      {
        "name": "Incineroar",
        "winRate": 50.8,
        "games": 20260
      },
      {
        "name": "Krookodile",
        "winRate": 50.8,
        "games": 15260
      },
      {
        "name": "Crabominable",
        "winRate": 50.7,
        "games": 25293
      },
      {
        "name": "Mega Starmie",
        "winRate": 50.7,
        "games": 5033
      }
    ],
    "bestSets": []
  },
  "547": {
    "id": 547,
    "name": "Whimsicott",
    "isMega": false,
    "elo": 7949,
    "winRate": 49.7,
    "appearances": 938971,
    "wins": 466564,
    "losses": 472407,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 53.5,
        "games": 9456
      },
      {
        "name": "Archaludon",
        "winRate": 53,
        "games": 28427
      },
      {
        "name": "Heat Rotom",
        "winRate": 52.7,
        "games": 23148
      },
      {
        "name": "Mega Blastoise",
        "winRate": 52.2,
        "games": 34258
      },
      {
        "name": "Decidueye",
        "winRate": 51.2,
        "games": 58703
      }
    ],
    "bestSets": []
  },
  "553": {
    "id": 553,
    "name": "Krookodile",
    "isMega": false,
    "elo": 7995,
    "winRate": 49.8,
    "appearances": 463721,
    "wins": 230846,
    "losses": 232875,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 72.3,
        "games": 3305
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 69,
        "games": 3572
      },
      {
        "name": "Sneasler",
        "winRate": 59.7,
        "games": 8246
      },
      {
        "name": "Mega Scizor",
        "winRate": 58.5,
        "games": 8412
      },
      {
        "name": "Mega Froslass",
        "winRate": 57.4,
        "games": 4342
      }
    ],
    "bestSets": []
  },
  "563": {
    "id": 563,
    "name": "Cofagrigus",
    "isMega": false,
    "elo": 8029,
    "winRate": 49.9,
    "appearances": 44580,
    "wins": 22234,
    "losses": 22346,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 10115
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.3,
        "games": 10289
      },
      {
        "name": "Mega Audino",
        "winRate": 50.2,
        "games": 9771
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 29521
      },
      {
        "name": "Hatterene",
        "winRate": 50.1,
        "games": 19406
      }
    ],
    "bestSets": []
  },
  "569": {
    "id": 569,
    "name": "Garbodor",
    "isMega": false,
    "elo": 7887,
    "winRate": 48.8,
    "appearances": 14512,
    "wins": 7088,
    "losses": 7424,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 50.8,
        "games": 5013
      },
      {
        "name": "Tauros",
        "winRate": 50.8,
        "games": 5013
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 9862
      },
      {
        "name": "Dragapult",
        "winRate": 49.6,
        "games": 4849
      },
      {
        "name": "Tyranitar",
        "winRate": 49.6,
        "games": 4849
      }
    ],
    "bestSets": []
  },
  "571": {
    "id": 571,
    "name": "Zoroark",
    "isMega": false,
    "elo": 7965,
    "winRate": 47.9,
    "appearances": 14450,
    "wins": 6925,
    "losses": 7525,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 49.6,
        "games": 4921
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 49.6,
        "games": 4921
      },
      {
        "name": "Krookodile",
        "winRate": 49.6,
        "games": 4921
      },
      {
        "name": "Mega Gengar",
        "winRate": 48.6,
        "games": 9836
      },
      {
        "name": "Liepard",
        "winRate": 48.6,
        "games": 9836
      }
    ],
    "bestSets": []
  },
  "579": {
    "id": 579,
    "name": "Reuniclus",
    "isMega": false,
    "elo": 7979,
    "winRate": 50.1,
    "appearances": 14358,
    "wins": 7200,
    "losses": 7158,
    "bestPartners": [
      {
        "name": "Mega Audino",
        "winRate": 50.6,
        "games": 4723
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 14358
      },
      {
        "name": "Cofagrigus",
        "winRate": 50.1,
        "games": 14358
      },
      {
        "name": "Hatterene",
        "winRate": 50.1,
        "games": 14358
      },
      {
        "name": "Arbok",
        "winRate": 50.1,
        "games": 14358
      }
    ],
    "bestSets": []
  },
  "584": {
    "id": 584,
    "name": "Vanilluxe",
    "isMega": false,
    "elo": 8069,
    "winRate": 56.1,
    "appearances": 13381,
    "wins": 7511,
    "losses": 5870,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Tatsugiri",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Feraligatr",
        "winRate": 60,
        "games": 8332
      },
      {
        "name": "Garchomp",
        "winRate": 59.4,
        "games": 8397
      },
      {
        "name": "Charizard",
        "winRate": 56.1,
        "games": 13381
      }
    ],
    "bestSets": []
  },
  "587": {
    "id": 587,
    "name": "Emolga",
    "isMega": false,
    "elo": 7978,
    "winRate": 47.2,
    "appearances": 80470,
    "wins": 38008,
    "losses": 42462,
    "bestPartners": [
      {
        "name": "Flapple",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Empoleon",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Vanilluxe",
        "winRate": 50.6,
        "games": 4984
      },
      {
        "name": "Feraligatr",
        "winRate": 50.6,
        "games": 4984
      }
    ],
    "bestSets": []
  },
  "609": {
    "id": 609,
    "name": "Chandelure",
    "isMega": false,
    "elo": 7945,
    "winRate": 50.6,
    "appearances": 9961,
    "wins": 5041,
    "losses": 4920,
    "bestPartners": [
      {
        "name": "Liepard",
        "winRate": 50.6,
        "games": 9961
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.6,
        "games": 9961
      },
      {
        "name": "Tauros",
        "winRate": 50.6,
        "games": 9961
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 9961
      },
      {
        "name": "Snorlax",
        "winRate": 50.6,
        "games": 9961
      }
    ],
    "bestSets": []
  },
  "614": {
    "id": 614,
    "name": "Beartic",
    "isMega": false,
    "elo": 7983,
    "winRate": 49.1,
    "appearances": 14793,
    "wins": 7267,
    "losses": 7526,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 49.7,
        "games": 4821
      },
      {
        "name": "Tatsugiri",
        "winRate": 49.7,
        "games": 4821
      },
      {
        "name": "Greninja",
        "winRate": 49.7,
        "games": 4821
      },
      {
        "name": "Garchomp",
        "winRate": 49.4,
        "games": 9861
      },
      {
        "name": "Incineroar",
        "winRate": 49.1,
        "games": 9753
      }
    ],
    "bestSets": []
  },
  "618": {
    "id": 618,
    "name": "Stunfisk",
    "isMega": false,
    "elo": 7968,
    "winRate": 53.2,
    "appearances": 28545,
    "wins": 15178,
    "losses": 13367,
    "bestPartners": [
      {
        "name": "Mega Pinsir",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Wash Rotom",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Gyarados",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Mega Scovillain",
        "winRate": 61.1,
        "games": 4100
      },
      {
        "name": "Kingambit",
        "winRate": 61.1,
        "games": 4100
      }
    ],
    "bestSets": []
  },
  "623": {
    "id": 623,
    "name": "Golurk",
    "isMega": false,
    "elo": 8005,
    "winRate": 48.4,
    "appearances": 14645,
    "wins": 7087,
    "losses": 7558,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.9,
        "games": 5044
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.9,
        "games": 5044
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 50.9,
        "games": 5044
      },
      {
        "name": "Arcanine",
        "winRate": 50.9,
        "games": 5044
      },
      {
        "name": "Greninja",
        "winRate": 50.9,
        "games": 5044
      }
    ],
    "bestSets": []
  },
  "635": {
    "id": 635,
    "name": "Hydreigon",
    "isMega": false,
    "elo": 8020,
    "winRate": 51,
    "appearances": 111037,
    "wins": 56637,
    "losses": 54400,
    "bestPartners": [
      {
        "name": "Mega Charizard Y",
        "winRate": 69,
        "games": 3572
      },
      {
        "name": "Mega Blastoise",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Mow Rotom",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Mega Gyarados",
        "winRate": 55.9,
        "games": 4574
      },
      {
        "name": "Excadrill",
        "winRate": 55.9,
        "games": 4574
      }
    ],
    "bestSets": []
  },
  "637": {
    "id": 637,
    "name": "Volcarona",
    "isMega": false,
    "elo": 7964,
    "winRate": 48.6,
    "appearances": 14662,
    "wins": 7121,
    "losses": 7541,
    "bestPartners": [
      {
        "name": "Mega Drampa",
        "winRate": 49.8,
        "games": 4830
      },
      {
        "name": "Scizor",
        "winRate": 49.8,
        "games": 4830
      },
      {
        "name": "Charizard",
        "winRate": 49.8,
        "games": 4830
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.8,
        "games": 4830
      },
      {
        "name": "Metagross",
        "winRate": 49.8,
        "games": 4830
      }
    ],
    "bestSets": []
  },
  "652": {
    "id": 652,
    "name": "Chesnaught",
    "isMega": false,
    "elo": 7963,
    "winRate": 47.6,
    "appearances": 14368,
    "wins": 6843,
    "losses": 7525,
    "bestPartners": [
      {
        "name": "Salazzle",
        "winRate": 50.1,
        "games": 10199
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.1,
        "games": 10199
      },
      {
        "name": "Tinkaton",
        "winRate": 50.1,
        "games": 10199
      },
      {
        "name": "Metagross",
        "winRate": 50.1,
        "games": 10199
      },
      {
        "name": "Palafin",
        "winRate": 47.6,
        "games": 14368
      }
    ],
    "bestSets": []
  },
  "655": {
    "id": 655,
    "name": "Delphox",
    "isMega": false,
    "elo": 7937,
    "winRate": 49.5,
    "appearances": 29191,
    "wins": 14443,
    "losses": 14748,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 52.1,
        "games": 9683
      },
      {
        "name": "Drampa",
        "winRate": 52.1,
        "games": 9683
      },
      {
        "name": "Azumarill",
        "winRate": 52.1,
        "games": 9683
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 14615
      },
      {
        "name": "Krookodile",
        "winRate": 50.4,
        "games": 14453
      }
    ],
    "bestSets": []
  },
  "658": {
    "id": 658,
    "name": "Greninja",
    "isMega": false,
    "elo": 8010,
    "winRate": 49.8,
    "appearances": 271263,
    "wins": 135152,
    "losses": 136111,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 57.5,
        "games": 4323
      },
      {
        "name": "Archaludon",
        "winRate": 57.5,
        "games": 4323
      },
      {
        "name": "Tyranitar",
        "winRate": 54,
        "games": 4647
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 52,
        "games": 19252
      },
      {
        "name": "Excadrill",
        "winRate": 51.7,
        "games": 9348
      }
    ],
    "bestSets": []
  },
  "660": {
    "id": 660,
    "name": "Diggersby",
    "isMega": false,
    "elo": 7996,
    "winRate": 51.5,
    "appearances": 13926,
    "wins": 7178,
    "losses": 6748,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Sandaconda",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Hippowdon",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Archaludon",
        "winRate": 58,
        "games": 4336
      }
    ],
    "bestSets": []
  },
  "663": {
    "id": 663,
    "name": "Talonflame",
    "isMega": false,
    "elo": 7994,
    "winRate": 50.4,
    "appearances": 24242,
    "wins": 12206,
    "losses": 12036,
    "bestPartners": [
      {
        "name": "Frost Rotom",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Primarina",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Hawlucha",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Heracross",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Garchomp",
        "winRate": 52.4,
        "games": 9408
      }
    ],
    "bestSets": []
  },
  "666": {
    "id": 666,
    "name": "Vivillon",
    "isMega": false,
    "elo": 7943,
    "winRate": 50.8,
    "appearances": 14229,
    "wins": 7222,
    "losses": 7007,
    "bestPartners": [
      {
        "name": "Tinkaton",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Garchomp",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Wash Rotom",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Blastoise",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Excadrill",
        "winRate": 53.6,
        "games": 9561
      }
    ],
    "bestSets": []
  },
  "670": {
    "id": 670,
    "name": "Floette",
    "isMega": false,
    "elo": 7956,
    "winRate": 49.7,
    "appearances": 10112,
    "wins": 5021,
    "losses": 5091,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 49.7,
        "games": 10112
      },
      {
        "name": "Tauros",
        "winRate": 49.7,
        "games": 10112
      },
      {
        "name": "Kingambit",
        "winRate": 49.7,
        "games": 10112
      },
      {
        "name": "Scizor",
        "winRate": 49.7,
        "games": 10112
      },
      {
        "name": "Wyrdeer",
        "winRate": 49.7,
        "games": 10112
      }
    ],
    "bestSets": []
  },
  "671": {
    "id": 671,
    "name": "Florges",
    "isMega": false,
    "elo": 7825,
    "winRate": 45.1,
    "appearances": 13626,
    "wins": 6148,
    "losses": 7478,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 50.3,
        "games": 5117
      },
      {
        "name": "Tauros",
        "winRate": 50.3,
        "games": 5117
      },
      {
        "name": "Scizor",
        "winRate": 50.3,
        "games": 5117
      },
      {
        "name": "Kingambit",
        "winRate": 45.6,
        "games": 9263
      },
      {
        "name": "Wyrdeer",
        "winRate": 45.6,
        "games": 9263
      }
    ],
    "bestSets": []
  },
  "675": {
    "id": 675,
    "name": "Pangoro",
    "isMega": false,
    "elo": 7956,
    "winRate": 46.8,
    "appearances": 14261,
    "wins": 6675,
    "losses": 7586,
    "bestPartners": [
      {
        "name": "Luxray",
        "winRate": 48.8,
        "games": 4835
      },
      {
        "name": "Tauros",
        "winRate": 48.8,
        "games": 4835
      },
      {
        "name": "Gengar",
        "winRate": 47,
        "games": 9410
      },
      {
        "name": "Gyarados",
        "winRate": 47,
        "games": 9410
      },
      {
        "name": "Alolan Raichu",
        "winRate": 46.8,
        "games": 14261
      }
    ],
    "bestSets": []
  },
  "676": {
    "id": 676,
    "name": "Furfrou",
    "isMega": false,
    "elo": 7938,
    "winRate": 48.3,
    "appearances": 14746,
    "wins": 7126,
    "losses": 7620,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 5056
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 5056
      },
      {
        "name": "Krookodile",
        "winRate": 50.1,
        "games": 5056
      },
      {
        "name": "Mimikyu",
        "winRate": 50.1,
        "games": 5056
      },
      {
        "name": "Polteageist",
        "winRate": 50,
        "games": 5171
      }
    ],
    "bestSets": []
  },
  "678": {
    "id": 678,
    "name": "Meowstic",
    "isMega": false,
    "elo": 7914,
    "winRate": 43.8,
    "appearances": 13123,
    "wins": 5747,
    "losses": 7376,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 9834
      },
      {
        "name": "Paldean Tauros",
        "winRate": 49.9,
        "games": 9834
      },
      {
        "name": "Krookodile",
        "winRate": 49.9,
        "games": 9834
      },
      {
        "name": "Kingambit",
        "winRate": 49.9,
        "games": 9834
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.9,
        "games": 9834
      }
    ],
    "bestSets": []
  },
  "681": {
    "id": 681,
    "name": "Aegislash",
    "isMega": false,
    "elo": 7989,
    "winRate": 49.8,
    "appearances": 269384,
    "wins": 134099,
    "losses": 135285,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 52.2,
        "games": 19615
      },
      {
        "name": "Venusaur",
        "winRate": 51.7,
        "games": 24685
      },
      {
        "name": "Milotic",
        "winRate": 51.2,
        "games": 10065
      },
      {
        "name": "Mega Kangaskhan",
        "winRate": 51.1,
        "games": 9544
      },
      {
        "name": "Talonflame",
        "winRate": 51.1,
        "games": 4851
      }
    ],
    "bestSets": []
  },
  "683": {
    "id": 683,
    "name": "Aromatisse",
    "isMega": false,
    "elo": 8000,
    "winRate": 49.7,
    "appearances": 59310,
    "wins": 29479,
    "losses": 29831,
    "bestPartners": [
      {
        "name": "Mega Alakazam",
        "winRate": 51,
        "games": 4995
      },
      {
        "name": "Mega Starmie",
        "winRate": 50.7,
        "games": 5033
      },
      {
        "name": "Torkoal",
        "winRate": 50.7,
        "games": 5033
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5033
      },
      {
        "name": "Alakazam",
        "winRate": 50.7,
        "games": 10265
      }
    ],
    "bestSets": []
  },
  "685": {
    "id": 685,
    "name": "Slurpuff",
    "isMega": false,
    "elo": 8016,
    "winRate": 50.7,
    "appearances": 14669,
    "wins": 7434,
    "losses": 7235,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 52.1,
        "games": 4828
      },
      {
        "name": "Scizor",
        "winRate": 52.1,
        "games": 4828
      },
      {
        "name": "Archaludon",
        "winRate": 51.1,
        "games": 9772
      },
      {
        "name": "Wyrdeer",
        "winRate": 51.1,
        "games": 9772
      },
      {
        "name": "Tauros",
        "winRate": 50.9,
        "games": 9725
      }
    ],
    "bestSets": []
  },
  "693": {
    "id": 693,
    "name": "Clawitzer",
    "isMega": false,
    "elo": 7988,
    "winRate": 53.3,
    "appearances": 13924,
    "wins": 7417,
    "losses": 6507,
    "bestPartners": [
      {
        "name": "Serperior",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Sinistcha",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Roserade",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Heat Rotom",
        "winRate": 55.2,
        "games": 8840
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 54.5,
        "games": 9024
      }
    ],
    "bestSets": []
  },
  "695": {
    "id": 695,
    "name": "Heliolisk",
    "isMega": false,
    "elo": 8033,
    "winRate": 50,
    "appearances": 14994,
    "wins": 7504,
    "losses": 7490,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 4818
      },
      {
        "name": "Charizard",
        "winRate": 50.8,
        "games": 4818
      },
      {
        "name": "Pinsir",
        "winRate": 50.8,
        "games": 4818
      },
      {
        "name": "Pelipper",
        "winRate": 50.8,
        "games": 4818
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 4818
      }
    ],
    "bestSets": []
  },
  "697": {
    "id": 697,
    "name": "Tyrantrum",
    "isMega": false,
    "elo": 7833,
    "winRate": 34.6,
    "appearances": 11270,
    "wins": 3896,
    "losses": 7374,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50,
        "games": 5067
      },
      {
        "name": "Pelipper",
        "winRate": 50,
        "games": 5067
      },
      {
        "name": "Azumarill",
        "winRate": 50,
        "games": 5067
      },
      {
        "name": "Emolga",
        "winRate": 41.2,
        "games": 8448
      },
      {
        "name": "Forretress",
        "winRate": 34.6,
        "games": 11270
      }
    ],
    "bestSets": []
  },
  "699": {
    "id": 699,
    "name": "Aurorus",
    "isMega": false,
    "elo": 7896,
    "winRate": 42.1,
    "appearances": 12780,
    "wins": 5383,
    "losses": 7397,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 5072
      },
      {
        "name": "Hawlucha",
        "winRate": 49.8,
        "games": 5072
      },
      {
        "name": "Dragapult",
        "winRate": 49.8,
        "games": 5072
      },
      {
        "name": "Whimsicott",
        "winRate": 42.4,
        "games": 8611
      },
      {
        "name": "Emolga",
        "winRate": 42.4,
        "games": 8611
      }
    ],
    "bestSets": []
  },
  "700": {
    "id": 700,
    "name": "Sylveon",
    "isMega": false,
    "elo": 8042,
    "winRate": 51.4,
    "appearances": 28977,
    "wins": 14896,
    "losses": 14081,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 58,
        "games": 4326
      },
      {
        "name": "Sneasler",
        "winRate": 58,
        "games": 4326
      },
      {
        "name": "Gliscor",
        "winRate": 58,
        "games": 4326
      },
      {
        "name": "Slowbro",
        "winRate": 58,
        "games": 4326
      },
      {
        "name": "Mega Gyarados",
        "winRate": 53.5,
        "games": 13996
      }
    ],
    "bestSets": []
  },
  "701": {
    "id": 701,
    "name": "Hawlucha",
    "isMega": false,
    "elo": 8006,
    "winRate": 50.2,
    "appearances": 79596,
    "wins": 39919,
    "losses": 39677,
    "bestPartners": [
      {
        "name": "Talonflame",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Primarina",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Heracross",
        "winRate": 52.5,
        "games": 9219
      },
      {
        "name": "Garchomp",
        "winRate": 52.1,
        "games": 9428
      },
      {
        "name": "Frost Rotom",
        "winRate": 51.3,
        "games": 14308
      }
    ],
    "bestSets": []
  },
  "702": {
    "id": 702,
    "name": "Dedenne",
    "isMega": false,
    "elo": 7965,
    "winRate": 40.6,
    "appearances": 41587,
    "wins": 16888,
    "losses": 24699,
    "bestPartners": [
      {
        "name": "Decidueye",
        "winRate": 50.7,
        "games": 5088
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 5088
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 5088
      },
      {
        "name": "Mega Scizor",
        "winRate": 50.3,
        "games": 10092
      },
      {
        "name": "Garchomp",
        "winRate": 50,
        "games": 5004
      }
    ],
    "bestSets": []
  },
  "706": {
    "id": 706,
    "name": "Goodra",
    "isMega": false,
    "elo": 8005,
    "winRate": 48.3,
    "appearances": 14876,
    "wins": 7185,
    "losses": 7691,
    "bestPartners": [
      {
        "name": "Trevenant",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Appletun",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Whimsicott",
        "winRate": 48.5,
        "games": 9915
      },
      {
        "name": "Mamoswine",
        "winRate": 48.3,
        "games": 14876
      }
    ],
    "bestSets": []
  },
  "707": {
    "id": 707,
    "name": "Klefki",
    "isMega": false,
    "elo": 7936,
    "winRate": 51.5,
    "appearances": 14424,
    "wins": 7432,
    "losses": 6992,
    "bestPartners": [
      {
        "name": "Mega Garchomp",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Heat Rotom",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Forretress",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Corviknight",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Gyarados",
        "winRate": 51.9,
        "games": 9403
      }
    ],
    "bestSets": []
  },
  "709": {
    "id": 709,
    "name": "Trevenant",
    "isMega": false,
    "elo": 7939,
    "winRate": 43.8,
    "appearances": 13390,
    "wins": 5868,
    "losses": 7522,
    "bestPartners": [
      {
        "name": "Goodra",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Whimsicott",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Appletun",
        "winRate": 49.7,
        "games": 10226
      },
      {
        "name": "Mamoswine",
        "winRate": 49.7,
        "games": 10226
      }
    ],
    "bestSets": []
  },
  "711": {
    "id": 711,
    "name": "Gourgeist",
    "isMega": false,
    "elo": 7957,
    "winRate": 50.2,
    "appearances": 14666,
    "wins": 7365,
    "losses": 7301,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 54.1,
        "games": 4754
      },
      {
        "name": "Empoleon",
        "winRate": 54.1,
        "games": 4754
      },
      {
        "name": "Samurott",
        "winRate": 51.7,
        "games": 9807
      },
      {
        "name": "Snorlax",
        "winRate": 51.7,
        "games": 9807
      },
      {
        "name": "Tyranitar",
        "winRate": 51.7,
        "games": 9807
      }
    ],
    "bestSets": []
  },
  "713": {
    "id": 713,
    "name": "Avalugg",
    "isMega": false,
    "elo": 7920,
    "winRate": 49.7,
    "appearances": 15065,
    "wins": 7490,
    "losses": 7575,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 5062
      },
      {
        "name": "Charizard",
        "winRate": 49.9,
        "games": 5062
      },
      {
        "name": "Dragapult",
        "winRate": 49.9,
        "games": 5062
      },
      {
        "name": "Salazzle",
        "winRate": 49.7,
        "games": 4937
      },
      {
        "name": "Arcanine",
        "winRate": 49.7,
        "games": 15065
      }
    ],
    "bestSets": []
  },
  "715": {
    "id": 715,
    "name": "Noivern",
    "isMega": false,
    "elo": 7963,
    "winRate": 49.7,
    "appearances": 90658,
    "wins": 45031,
    "losses": 45627,
    "bestPartners": [
      {
        "name": "Typhlosion",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Empoleon",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51.1,
        "games": 9923
      },
      {
        "name": "Tauros",
        "winRate": 50.8,
        "games": 5100
      }
    ],
    "bestSets": []
  },
  "724": {
    "id": 724,
    "name": "Decidueye",
    "isMega": false,
    "elo": 7944,
    "winRate": 50.5,
    "appearances": 101943,
    "wins": 51458,
    "losses": 50485,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 60.6,
        "games": 8251
      },
      {
        "name": "Mow Rotom",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Archaludon",
        "winRate": 55.4,
        "games": 22734
      },
      {
        "name": "Hydreigon",
        "winRate": 54.1,
        "games": 9496
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 53.6,
        "games": 9250
      }
    ],
    "bestSets": []
  },
  "727": {
    "id": 727,
    "name": "Incineroar",
    "isMega": false,
    "elo": 8030,
    "winRate": 50.3,
    "appearances": 1903934,
    "wins": 957227,
    "losses": 946707,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 57.4,
        "games": 4342
      },
      {
        "name": "Primarina",
        "winRate": 55,
        "games": 4578
      },
      {
        "name": "Tyranitar",
        "winRate": 54,
        "games": 23365
      },
      {
        "name": "Torkoal",
        "winRate": 53.9,
        "games": 158744
      },
      {
        "name": "Mega Venusaur",
        "winRate": 53.8,
        "games": 9198
      }
    ],
    "bestSets": []
  },
  "730": {
    "id": 730,
    "name": "Primarina",
    "isMega": false,
    "elo": 8020,
    "winRate": 53.8,
    "appearances": 60342,
    "wins": 32463,
    "losses": 27879,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 72.3,
        "games": 3305
      },
      {
        "name": "Froslass",
        "winRate": 72.3,
        "games": 3305
      },
      {
        "name": "Archaludon",
        "winRate": 62.8,
        "games": 11668
      },
      {
        "name": "Mega Kangaskhan",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Mega Gyarados",
        "winRate": 57.9,
        "games": 12937
      }
    ],
    "bestSets": []
  },
  "733": {
    "id": 733,
    "name": "Toucannon",
    "isMega": false,
    "elo": 7934,
    "winRate": 49.4,
    "appearances": 14785,
    "wins": 7297,
    "losses": 7488,
    "bestPartners": [
      {
        "name": "Metagross",
        "winRate": 50.7,
        "games": 4955
      },
      {
        "name": "Paldean Tauros",
        "winRate": 50.7,
        "games": 4955
      },
      {
        "name": "Archaludon",
        "winRate": 50.3,
        "games": 9871
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 50.3,
        "games": 9871
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.9,
        "games": 4916
      }
    ],
    "bestSets": []
  },
  "740": {
    "id": 740,
    "name": "Crabominable",
    "isMega": false,
    "elo": 8024,
    "winRate": 50.1,
    "appearances": 69740,
    "wins": 34954,
    "losses": 34786,
    "bestPartners": [
      {
        "name": "Mega Slowbro",
        "winRate": 52.1,
        "games": 4818
      },
      {
        "name": "Paldean Tauros",
        "winRate": 52.1,
        "games": 4818
      },
      {
        "name": "Espathra",
        "winRate": 51.9,
        "games": 4774
      },
      {
        "name": "Azumarill",
        "winRate": 51.9,
        "games": 4774
      },
      {
        "name": "Tauros",
        "winRate": 50.8,
        "games": 9766
      }
    ],
    "bestSets": []
  },
  "745": {
    "id": 745,
    "name": "Lycanroc",
    "isMega": false,
    "elo": 7948,
    "winRate": 48.5,
    "appearances": 15002,
    "wins": 7271,
    "losses": 7731,
    "bestPartners": [
      {
        "name": "Mega Beedrill",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Alolan Raichu",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Tauros",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Garchomp",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Krookodile",
        "winRate": 48.8,
        "games": 5051
      }
    ],
    "bestSets": []
  },
  "748": {
    "id": 748,
    "name": "Toxapex",
    "isMega": false,
    "elo": 7992,
    "winRate": 49.9,
    "appearances": 20178,
    "wins": 10069,
    "losses": 10109,
    "bestPartners": [
      {
        "name": "Slurpuff",
        "winRate": 50.2,
        "games": 4944
      },
      {
        "name": "Skarmory",
        "winRate": 50.2,
        "games": 4944
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.2,
        "games": 4944
      },
      {
        "name": "Archaludon",
        "winRate": 50,
        "games": 9980
      },
      {
        "name": "Dragapult",
        "winRate": 50,
        "games": 9925
      }
    ],
    "bestSets": []
  },
  "750": {
    "id": 750,
    "name": "Mudsdale",
    "isMega": false,
    "elo": 8005,
    "winRate": 50.2,
    "appearances": 24644,
    "wins": 12377,
    "losses": 12267,
    "bestPartners": [
      {
        "name": "Farigiraf",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Paldean Tauros",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Kingambit",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Torkoal",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Hatterene",
        "winRate": 50.7,
        "games": 14761
      }
    ],
    "bestSets": []
  },
  "752": {
    "id": 752,
    "name": "Araquanid",
    "isMega": false,
    "elo": 7902,
    "winRate": 48,
    "appearances": 19547,
    "wins": 9380,
    "losses": 10167,
    "bestPartners": [
      {
        "name": "Mega Camerupt",
        "winRate": 50.5,
        "games": 5243
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5243
      },
      {
        "name": "Abomasnow",
        "winRate": 50.5,
        "games": 5243
      },
      {
        "name": "Pelipper",
        "winRate": 50.5,
        "games": 5243
      },
      {
        "name": "Mega Delphox",
        "winRate": 50,
        "games": 5003
      }
    ],
    "bestSets": []
  },
  "758": {
    "id": 758,
    "name": "Salazzle",
    "isMega": false,
    "elo": 7979,
    "winRate": 43.1,
    "appearances": 100795,
    "wins": 43448,
    "losses": 57347,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 50.9,
        "games": 5080
      },
      {
        "name": "Diggersby",
        "winRate": 50.7,
        "games": 4941
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.3,
        "games": 15288
      },
      {
        "name": "Tinkaton",
        "winRate": 50.3,
        "games": 15288
      },
      {
        "name": "Palafin",
        "winRate": 50.3,
        "games": 15288
      }
    ],
    "bestSets": []
  },
  "763": {
    "id": 763,
    "name": "Tsareena",
    "isMega": false,
    "elo": 7911,
    "winRate": 50.7,
    "appearances": 39580,
    "wins": 20059,
    "losses": 19521,
    "bestPartners": [
      {
        "name": "Feraligatr",
        "winRate": 53.5,
        "games": 4803
      },
      {
        "name": "Orthworm",
        "winRate": 53.5,
        "games": 4803
      },
      {
        "name": "Mega Aerodactyl",
        "winRate": 51.9,
        "games": 9691
      },
      {
        "name": "Mega Gyarados",
        "winRate": 51.1,
        "games": 4964
      },
      {
        "name": "Palafin",
        "winRate": 51.1,
        "games": 4964
      }
    ],
    "bestSets": []
  },
  "765": {
    "id": 765,
    "name": "Oranguru",
    "isMega": false,
    "elo": 7929,
    "winRate": 53.5,
    "appearances": 28154,
    "wins": 15065,
    "losses": 13089,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 54.4,
        "games": 18563
      },
      {
        "name": "Torkoal",
        "winRate": 54.3,
        "games": 23197
      },
      {
        "name": "Venusaur",
        "winRate": 54.3,
        "games": 23197
      },
      {
        "name": "Kingambit",
        "winRate": 53.8,
        "games": 4634
      },
      {
        "name": "Hatterene",
        "winRate": 53.5,
        "games": 28154
      }
    ],
    "bestSets": []
  },
  "766": {
    "id": 766,
    "name": "Passimian",
    "isMega": false,
    "elo": 7928,
    "winRate": 48.1,
    "appearances": 14875,
    "wins": 7148,
    "losses": 7727,
    "bestPartners": [
      {
        "name": "Luxray",
        "winRate": 49.1,
        "games": 5119
      },
      {
        "name": "Morpeko",
        "winRate": 49.1,
        "games": 5119
      },
      {
        "name": "Wyrdeer",
        "winRate": 48.5,
        "games": 10038
      },
      {
        "name": "Excadrill",
        "winRate": 48.2,
        "games": 9956
      },
      {
        "name": "Heat Rotom",
        "winRate": 48.2,
        "games": 9956
      }
    ],
    "bestSets": []
  },
  "778": {
    "id": 778,
    "name": "Mimikyu",
    "isMega": false,
    "elo": 7904,
    "winRate": 49.7,
    "appearances": 45062,
    "wins": 22388,
    "losses": 22674,
    "bestPartners": [
      {
        "name": "Furfrou",
        "winRate": 50.1,
        "games": 5056
      },
      {
        "name": "Kangaskhan",
        "winRate": 50,
        "games": 9965
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 30154
      },
      {
        "name": "Arbok",
        "winRate": 49.8,
        "games": 30154
      },
      {
        "name": "Krookodile",
        "winRate": 49.8,
        "games": 35029
      }
    ],
    "bestSets": []
  },
  "780": {
    "id": 780,
    "name": "Drampa",
    "isMega": false,
    "elo": 7977,
    "winRate": 52.4,
    "appearances": 98412,
    "wins": 51581,
    "losses": 46831,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 67.7,
        "games": 10840
      },
      {
        "name": "Torkoal",
        "winRate": 66.5,
        "games": 14720
      },
      {
        "name": "Tyranitar",
        "winRate": 63.5,
        "games": 19495
      },
      {
        "name": "Rhyperior",
        "winRate": 56,
        "games": 8792
      },
      {
        "name": "Hatterene",
        "winRate": 55.6,
        "games": 31274
      }
    ],
    "bestSets": []
  },
  "784": {
    "id": 784,
    "name": "Kommo-o",
    "isMega": false,
    "elo": 7978,
    "winRate": 49.5,
    "appearances": 34462,
    "wins": 17047,
    "losses": 17415,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Camerupt",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Frost Rotom",
        "winRate": 49.8,
        "games": 4880
      },
      {
        "name": "Sinistcha",
        "winRate": 49.8,
        "games": 4880
      },
      {
        "name": "Hawlucha",
        "winRate": 49.8,
        "games": 4880
      }
    ],
    "bestSets": []
  },
  "823": {
    "id": 823,
    "name": "Corviknight",
    "isMega": false,
    "elo": 8009,
    "winRate": 50.3,
    "appearances": 34984,
    "wins": 17593,
    "losses": 17391,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Klefki",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Forretress",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Mega Garchomp",
        "winRate": 52.7,
        "games": 9617
      },
      {
        "name": "Gyarados",
        "winRate": 51.8,
        "games": 9716
      }
    ],
    "bestSets": []
  },
  "841": {
    "id": 841,
    "name": "Flapple",
    "isMega": false,
    "elo": 7836,
    "winRate": 38.3,
    "appearances": 11854,
    "wins": 4539,
    "losses": 7315,
    "bestPartners": [
      {
        "name": "Emolga",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Empoleon",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Gyarados",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 44.4,
        "games": 8665
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 39.9,
        "games": 8233
      }
    ],
    "bestSets": []
  },
  "842": {
    "id": 842,
    "name": "Appletun",
    "isMega": false,
    "elo": 7964,
    "winRate": 45.8,
    "appearances": 13914,
    "wins": 6374,
    "losses": 7540,
    "bestPartners": [
      {
        "name": "Goodra",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Whimsicott",
        "winRate": 50.2,
        "games": 5127
      },
      {
        "name": "Trevenant",
        "winRate": 49.7,
        "games": 10226
      },
      {
        "name": "Mamoswine",
        "winRate": 49.7,
        "games": 10226
      }
    ],
    "bestSets": []
  },
  "844": {
    "id": 844,
    "name": "Sandaconda",
    "isMega": false,
    "elo": 8005,
    "winRate": 51.2,
    "appearances": 14156,
    "wins": 7250,
    "losses": 6906,
    "bestPartners": [
      {
        "name": "Diggersby",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Hippowdon",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Archaludon",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Mega Gyarados",
        "winRate": 53.5,
        "games": 9387
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 53.5,
        "games": 9387
      }
    ],
    "bestSets": []
  },
  "855": {
    "id": 855,
    "name": "Polteageist",
    "isMega": false,
    "elo": 7956,
    "winRate": 48.3,
    "appearances": 19432,
    "wins": 9378,
    "losses": 10054,
    "bestPartners": [
      {
        "name": "Maushold",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Froslass",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Luxray",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.3,
        "games": 15325
      }
    ],
    "bestSets": []
  },
  "858": {
    "id": 858,
    "name": "Hatterene",
    "isMega": false,
    "elo": 7983,
    "winRate": 51.6,
    "appearances": 500475,
    "wins": 258341,
    "losses": 242134,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Wyrdeer",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Snorlax",
        "winRate": 64.4,
        "games": 7696
      },
      {
        "name": "Azumarill",
        "winRate": 61.1,
        "games": 8138
      },
      {
        "name": "Tyranitar",
        "winRate": 61.1,
        "games": 16351
      }
    ],
    "bestSets": []
  },
  "861": {
    "id": 861,
    "name": "Grimmsnarl",
    "isMega": false,
    "elo": 7989,
    "winRate": 48.1,
    "appearances": 19924,
    "wins": 9584,
    "losses": 10340,
    "bestPartners": [
      {
        "name": "Hatterene",
        "winRate": 49.2,
        "games": 5099
      },
      {
        "name": "Trevenant",
        "winRate": 49.2,
        "games": 5099
      },
      {
        "name": "Appletun",
        "winRate": 49.2,
        "games": 5099
      },
      {
        "name": "Mega Chandelure",
        "winRate": 48.9,
        "games": 10175
      },
      {
        "name": "Garchomp",
        "winRate": 48.6,
        "games": 5076
      }
    ],
    "bestSets": []
  },
  "866": {
    "id": 866,
    "name": "Mr. Rime",
    "isMega": false,
    "elo": 7935,
    "winRate": 49.9,
    "appearances": 14747,
    "wins": 7360,
    "losses": 7387,
    "bestPartners": [
      {
        "name": "Infernape",
        "winRate": 50.7,
        "games": 4748
      },
      {
        "name": "Krookodile",
        "winRate": 50.7,
        "games": 4748
      },
      {
        "name": "Ursaluna",
        "winRate": 50.7,
        "games": 4748
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 9715
      },
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 14747
      }
    ],
    "bestSets": []
  },
  "867": {
    "id": 867,
    "name": "Runerigus",
    "isMega": false,
    "elo": 7847,
    "winRate": 38.9,
    "appearances": 11896,
    "wins": 4624,
    "losses": 7272,
    "bestPartners": [
      {
        "name": "Alolan Ninetales",
        "winRate": 50,
        "games": 4606
      },
      {
        "name": "Altaria",
        "winRate": 50,
        "games": 4606
      },
      {
        "name": "Milotic",
        "winRate": 50,
        "games": 4606
      },
      {
        "name": "Azumarill",
        "winRate": 50,
        "games": 4606
      },
      {
        "name": "Slowbro",
        "winRate": 50,
        "games": 4606
      }
    ],
    "bestSets": []
  },
  "869": {
    "id": 869,
    "name": "Alcremie",
    "isMega": false,
    "elo": 7906,
    "winRate": 49.5,
    "appearances": 13303,
    "wins": 6583,
    "losses": 6720,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 57.7,
        "games": 4400
      },
      {
        "name": "Sneasler",
        "winRate": 57.7,
        "games": 4400
      },
      {
        "name": "Gliscor",
        "winRate": 57.7,
        "games": 4400
      },
      {
        "name": "Slowbro",
        "winRate": 57.7,
        "games": 4400
      },
      {
        "name": "Archaludon",
        "winRate": 54.5,
        "games": 9360
      }
    ],
    "bestSets": []
  },
  "877": {
    "id": 877,
    "name": "Morpeko",
    "isMega": false,
    "elo": 7981,
    "winRate": 48,
    "appearances": 28782,
    "wins": 13826,
    "losses": 14956,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.8,
        "games": 4828
      },
      {
        "name": "Charizard",
        "winRate": 50.8,
        "games": 4828
      },
      {
        "name": "Heracross",
        "winRate": 50.8,
        "games": 4828
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 9694
      },
      {
        "name": "Arbok",
        "winRate": 50.3,
        "games": 9694
      }
    ],
    "bestSets": []
  },
  "887": {
    "id": 887,
    "name": "Dragapult",
    "isMega": false,
    "elo": 7985,
    "winRate": 50,
    "appearances": 900617,
    "wins": 450329,
    "losses": 450288,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 68.7,
        "games": 3454
      },
      {
        "name": "Heat Rotom",
        "winRate": 56.5,
        "games": 13346
      },
      {
        "name": "Archaludon",
        "winRate": 54.4,
        "games": 27760
      },
      {
        "name": "Blastoise",
        "winRate": 53.5,
        "games": 9456
      },
      {
        "name": "Primarina",
        "winRate": 52.9,
        "games": 19125
      }
    ],
    "bestSets": []
  },
  "899": {
    "id": 899,
    "name": "Wyrdeer",
    "isMega": false,
    "elo": 7942,
    "winRate": 49.5,
    "appearances": 267276,
    "wins": 132196,
    "losses": 135080,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Hatterene",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Azumarill",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Torkoal",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Mega Floette",
        "winRate": 53.2,
        "games": 4760
      }
    ],
    "bestSets": []
  },
  "900": {
    "id": 900,
    "name": "Kleavor",
    "isMega": false,
    "elo": 7985,
    "winRate": 51.7,
    "appearances": 14758,
    "wins": 7630,
    "losses": 7128,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 55.7,
        "games": 4658
      },
      {
        "name": "Palafin",
        "winRate": 55.7,
        "games": 4658
      },
      {
        "name": "Milotic",
        "winRate": 55.7,
        "games": 4658
      },
      {
        "name": "Feraligatr",
        "winRate": 53.1,
        "games": 9674
      },
      {
        "name": "Archaludon",
        "winRate": 51.7,
        "games": 14758
      }
    ],
    "bestSets": []
  },
  "901": {
    "id": 901,
    "name": "Ursaluna",
    "isMega": false,
    "elo": 8037,
    "winRate": 50.4,
    "appearances": 54930,
    "wins": 27703,
    "losses": 27227,
    "bestPartners": [
      {
        "name": "Hatterene",
        "winRate": 52.5,
        "games": 4749
      },
      {
        "name": "Garganacl",
        "winRate": 52.5,
        "games": 4749
      },
      {
        "name": "Mega Slowbro",
        "winRate": 52.1,
        "games": 4818
      },
      {
        "name": "Paldean Tauros",
        "winRate": 52.1,
        "games": 4818
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 51,
        "games": 5066
      }
    ],
    "bestSets": []
  },
  "902": {
    "id": 902,
    "name": "Basculegion",
    "isMega": false,
    "elo": 7944,
    "winRate": 48.3,
    "appearances": 38686,
    "wins": 18686,
    "losses": 20000,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 51.2,
        "games": 5025
      },
      {
        "name": "Venusaur",
        "winRate": 51.2,
        "games": 5025
      },
      {
        "name": "Archaludon",
        "winRate": 51.2,
        "games": 5025
      },
      {
        "name": "Mega Gyarados",
        "winRate": 51.2,
        "games": 5025
      },
      {
        "name": "Clefable",
        "winRate": 51.2,
        "games": 5025
      }
    ],
    "bestSets": []
  },
  "903": {
    "id": 903,
    "name": "Sneasler",
    "isMega": false,
    "elo": 8045,
    "winRate": 55.6,
    "appearances": 69679,
    "wins": 38741,
    "losses": 30938,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Hatterene",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Torkoal",
        "winRate": 75.4,
        "games": 3259
      },
      {
        "name": "Vanilluxe",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Feraligatr",
        "winRate": 74.1,
        "games": 3348
      }
    ],
    "bestSets": []
  },
  "908": {
    "id": 908,
    "name": "Meowscarada",
    "isMega": false,
    "elo": 7963,
    "winRate": 49.8,
    "appearances": 34689,
    "wins": 17267,
    "losses": 17422,
    "bestPartners": [
      {
        "name": "Clawitzer",
        "winRate": 51,
        "games": 4900
      },
      {
        "name": "Luxray",
        "winRate": 51,
        "games": 4900
      },
      {
        "name": "Heat Rotom",
        "winRate": 51,
        "games": 4900
      },
      {
        "name": "Mega Banette",
        "winRate": 50.7,
        "games": 4831
      },
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 4831
      }
    ],
    "bestSets": []
  },
  "911": {
    "id": 911,
    "name": "Skeledirge",
    "isMega": false,
    "elo": 7996,
    "winRate": 47.7,
    "appearances": 14825,
    "wins": 7077,
    "losses": 7748,
    "bestPartners": [
      {
        "name": "Garchomp",
        "winRate": 48.6,
        "games": 5076
      },
      {
        "name": "Mega Chandelure",
        "winRate": 48.6,
        "games": 5076
      },
      {
        "name": "Excadrill",
        "winRate": 48.6,
        "games": 5076
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 48.6,
        "games": 5076
      },
      {
        "name": "Mega Abomasnow",
        "winRate": 48,
        "games": 4961
      }
    ],
    "bestSets": []
  },
  "914": {
    "id": 914,
    "name": "Quaquaval",
    "isMega": false,
    "elo": 7953,
    "winRate": 48.7,
    "appearances": 19708,
    "wins": 9605,
    "losses": 10103,
    "bestPartners": [
      {
        "name": "Typhlosion",
        "winRate": 50.1,
        "games": 4691
      },
      {
        "name": "Dragonite",
        "winRate": 50.1,
        "games": 4691
      },
      {
        "name": "Tauros",
        "winRate": 50.1,
        "games": 4691
      },
      {
        "name": "Wyrdeer",
        "winRate": 49.3,
        "games": 9725
      },
      {
        "name": "Luxray",
        "winRate": 48.9,
        "games": 9682
      }
    ],
    "bestSets": []
  },
  "923": {
    "id": 923,
    "name": "Pawmot",
    "isMega": false,
    "elo": 7921,
    "winRate": 49.1,
    "appearances": 14955,
    "wins": 7340,
    "losses": 7615,
    "bestPartners": [
      {
        "name": "Mega Charizard X",
        "winRate": 50.1,
        "games": 5283
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.1,
        "games": 5283
      },
      {
        "name": "Abomasnow",
        "winRate": 50.1,
        "games": 5283
      },
      {
        "name": "Hydreigon",
        "winRate": 50.1,
        "games": 5283
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 4902
      }
    ],
    "bestSets": []
  },
  "925": {
    "id": 925,
    "name": "Maushold",
    "isMega": false,
    "elo": 7966,
    "winRate": 50,
    "appearances": 15176,
    "wins": 7593,
    "losses": 7583,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Froslass",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Luxray",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Polteageist",
        "winRate": 50.5,
        "games": 5102
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 10175
      }
    ],
    "bestSets": []
  },
  "934": {
    "id": 934,
    "name": "Garganacl",
    "isMega": false,
    "elo": 8012,
    "winRate": 49.5,
    "appearances": 33997,
    "wins": 16827,
    "losses": 17170,
    "bestPartners": [
      {
        "name": "Ursaluna",
        "winRate": 52.5,
        "games": 4749
      },
      {
        "name": "Gardevoir",
        "winRate": 52.5,
        "games": 4749
      },
      {
        "name": "Hatterene",
        "winRate": 52,
        "games": 9628
      },
      {
        "name": "Azumarill",
        "winRate": 51.5,
        "games": 4879
      },
      {
        "name": "Kingambit",
        "winRate": 50.8,
        "games": 9795
      }
    ],
    "bestSets": []
  },
  "936": {
    "id": 936,
    "name": "Armarouge",
    "isMega": false,
    "elo": 8027,
    "winRate": 49.7,
    "appearances": 14939,
    "wins": 7424,
    "losses": 7515,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.9,
        "games": 5012
      },
      {
        "name": "Hatterene",
        "winRate": 49.9,
        "games": 5012
      },
      {
        "name": "Forretress",
        "winRate": 49.9,
        "games": 5012
      },
      {
        "name": "Garchomp",
        "winRate": 49.9,
        "games": 5012
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 9963
      }
    ],
    "bestSets": []
  },
  "937": {
    "id": 937,
    "name": "Ceruledge",
    "isMega": false,
    "elo": 7919,
    "winRate": 43.5,
    "appearances": 17870,
    "wins": 7781,
    "losses": 10089,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 49.1,
        "games": 5014
      },
      {
        "name": "Kingambit",
        "winRate": 49.1,
        "games": 5014
      },
      {
        "name": "Whimsicott",
        "winRate": 49.1,
        "games": 5014
      },
      {
        "name": "Bellibolt",
        "winRate": 49.1,
        "games": 5014
      },
      {
        "name": "Garchomp",
        "winRate": 49.1,
        "games": 5014
      }
    ],
    "bestSets": []
  },
  "939": {
    "id": 939,
    "name": "Bellibolt",
    "isMega": false,
    "elo": 7968,
    "winRate": 48,
    "appearances": 19612,
    "wins": 9411,
    "losses": 10201,
    "bestPartners": [
      {
        "name": "Forretress",
        "winRate": 49.6,
        "games": 10271
      },
      {
        "name": "Garchomp",
        "winRate": 49.6,
        "games": 10117
      },
      {
        "name": "Mega Gyarados",
        "winRate": 49.4,
        "games": 15285
      },
      {
        "name": "Whimsicott",
        "winRate": 49.4,
        "games": 15285
      },
      {
        "name": "Ceruledge",
        "winRate": 49.1,
        "games": 5014
      }
    ],
    "bestSets": []
  },
  "952": {
    "id": 952,
    "name": "Scovillain",
    "isMega": false,
    "elo": 7987,
    "winRate": 50,
    "appearances": 20059,
    "wins": 10037,
    "losses": 10022,
    "bestPartners": [
      {
        "name": "Flareon",
        "winRate": 50.4,
        "games": 5131
      },
      {
        "name": "Venusaur",
        "winRate": 50.3,
        "games": 10102
      },
      {
        "name": "Ninetales",
        "winRate": 50.3,
        "games": 10102
      },
      {
        "name": "Leafeon",
        "winRate": 50.3,
        "games": 10102
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 10102
      }
    ],
    "bestSets": []
  },
  "956": {
    "id": 956,
    "name": "Espathra",
    "isMega": false,
    "elo": 7961,
    "winRate": 50.3,
    "appearances": 14665,
    "wins": 7379,
    "losses": 7286,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 51.9,
        "games": 4774
      },
      {
        "name": "Crabominable",
        "winRate": 51.9,
        "games": 4774
      },
      {
        "name": "Azumarill",
        "winRate": 51.9,
        "games": 4774
      },
      {
        "name": "Tauros",
        "winRate": 50.8,
        "games": 9739
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 9700
      }
    ],
    "bestSets": []
  },
  "959": {
    "id": 959,
    "name": "Tinkaton",
    "isMega": false,
    "elo": 7964,
    "winRate": 50.2,
    "appearances": 234688,
    "wins": 117771,
    "losses": 116917,
    "bestPartners": [
      {
        "name": "Vivillon",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Excadrill",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Wash Rotom",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Blastoise",
        "winRate": 58.7,
        "games": 4300
      },
      {
        "name": "Mega Scovillain",
        "winRate": 55.1,
        "games": 8909
      }
    ],
    "bestSets": []
  },
  "964": {
    "id": 964,
    "name": "Palafin",
    "isMega": false,
    "elo": 7992,
    "winRate": 50.3,
    "appearances": 192874,
    "wins": 97019,
    "losses": 95855,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Gyarados",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Aggron",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Feraligatr",
        "winRate": 57.1,
        "games": 8974
      },
      {
        "name": "Kleavor",
        "winRate": 55.7,
        "games": 4658
      }
    ],
    "bestSets": []
  },
  "968": {
    "id": 968,
    "name": "Orthworm",
    "isMega": false,
    "elo": 7948,
    "winRate": 51.3,
    "appearances": 14942,
    "wins": 7660,
    "losses": 7282,
    "bestPartners": [
      {
        "name": "Mega Aerodactyl",
        "winRate": 53.5,
        "games": 4803
      },
      {
        "name": "Incineroar",
        "winRate": 53.5,
        "games": 4803
      },
      {
        "name": "Venusaur",
        "winRate": 53.5,
        "games": 4803
      },
      {
        "name": "Feraligatr",
        "winRate": 53.5,
        "games": 4803
      },
      {
        "name": "Tsareena",
        "winRate": 53.5,
        "games": 4803
      }
    ],
    "bestSets": []
  },
  "970": {
    "id": 970,
    "name": "Glimmora",
    "isMega": false,
    "elo": 7960,
    "winRate": 48.5,
    "appearances": 19291,
    "wins": 9355,
    "losses": 9936,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.1,
        "games": 4611
      },
      {
        "name": "Garchomp",
        "winRate": 50.1,
        "games": 4611
      },
      {
        "name": "Mega Scizor",
        "winRate": 50.1,
        "games": 4611
      },
      {
        "name": "Emolga",
        "winRate": 50.1,
        "games": 4611
      },
      {
        "name": "Mega Pinsir",
        "winRate": 50,
        "games": 4970
      }
    ],
    "bestSets": []
  },
  "977": {
    "id": 977,
    "name": "Dondozo",
    "isMega": false,
    "elo": 8032,
    "winRate": 50,
    "appearances": 50484,
    "wins": 25263,
    "losses": 25221,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 51.8,
        "games": 4917
      },
      {
        "name": "Excadrill",
        "winRate": 50.2,
        "games": 20132
      },
      {
        "name": "Hatterene",
        "winRate": 50.1,
        "games": 45337
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 50484
      },
      {
        "name": "Tatsugiri",
        "winRate": 50,
        "games": 50484
      }
    ],
    "bestSets": []
  },
  "978": {
    "id": 978,
    "name": "Tatsugiri",
    "isMega": false,
    "elo": 8041,
    "winRate": 51,
    "appearances": 78860,
    "wins": 40225,
    "losses": 38635,
    "bestPartners": [
      {
        "name": "Vanilluxe",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Charizard",
        "winRate": 74.1,
        "games": 3348
      },
      {
        "name": "Feraligatr",
        "winRate": 60.1,
        "games": 8364
      },
      {
        "name": "Sneasler",
        "winRate": 59.7,
        "games": 8169
      },
      {
        "name": "Scizor",
        "winRate": 51.8,
        "games": 4917
      }
    ],
    "bestSets": []
  },
  "981": {
    "id": 981,
    "name": "Farigiraf",
    "isMega": false,
    "elo": 8076,
    "winRate": 50.8,
    "appearances": 14519,
    "wins": 7378,
    "losses": 7141,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Hatterene",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Torkoal",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Mudsdale",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Paldean Tauros",
        "winRate": 51.2,
        "games": 9825
      }
    ],
    "bestSets": []
  },
  "983": {
    "id": 983,
    "name": "Kingambit",
    "isMega": false,
    "elo": 7987,
    "winRate": 50.8,
    "appearances": 730853,
    "wins": 371330,
    "losses": 359523,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 71.9,
        "games": 6713
      },
      {
        "name": "Wash Rotom",
        "winRate": 67.7,
        "games": 10838
      },
      {
        "name": "Pinsir",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Mega Scovillain",
        "winRate": 61.4,
        "games": 7976
      },
      {
        "name": "Stunfisk",
        "winRate": 61.1,
        "games": 4100
      }
    ],
    "bestSets": []
  },
  "1013": {
    "id": 1013,
    "name": "Sinistcha",
    "isMega": false,
    "elo": 7922,
    "winRate": 50,
    "appearances": 18109,
    "wins": 9060,
    "losses": 9049,
    "bestPartners": [
      {
        "name": "Clawitzer",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Serperior",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Roserade",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 60.4,
        "games": 3940
      }
    ],
    "bestSets": []
  },
  "1018": {
    "id": 1018,
    "name": "Archaludon",
    "isMega": false,
    "elo": 8054,
    "winRate": 53.4,
    "appearances": 318115,
    "wins": 169958,
    "losses": 148157,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Wash Rotom",
        "winRate": 66.2,
        "games": 14849
      },
      {
        "name": "Primarina",
        "winRate": 62.8,
        "games": 11668
      },
      {
        "name": "Mega Kangaskhan",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Sneasler",
        "winRate": 60.6,
        "games": 16327
      }
    ],
    "bestSets": []
  },
  "1019": {
    "id": 1019,
    "name": "Hydrapple",
    "isMega": false,
    "elo": 7908,
    "winRate": 44.5,
    "appearances": 13255,
    "wins": 5897,
    "losses": 7358,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.8,
        "games": 4894
      },
      {
        "name": "Palafin",
        "winRate": 49.8,
        "games": 4894
      },
      {
        "name": "Froslass",
        "winRate": 49.8,
        "games": 4894
      },
      {
        "name": "Archaludon",
        "winRate": 49.8,
        "games": 4894
      },
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 5050
      }
    ],
    "bestSets": []
  },
  "5059": {
    "id": 5059,
    "name": "Hisuian Arcanine",
    "isMega": false,
    "elo": 7927,
    "winRate": 48.6,
    "appearances": 310093,
    "wins": 150731,
    "losses": 159362,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Mega Sharpedo",
        "winRate": 51.2,
        "games": 5072
      },
      {
        "name": "Simisage",
        "winRate": 50.9,
        "games": 4811
      },
      {
        "name": "Mega Meganium",
        "winRate": 50.8,
        "games": 4918
      }
    ],
    "bestSets": []
  },
  "5157": {
    "id": 5157,
    "name": "Hisuian Typhlosion",
    "isMega": false,
    "elo": 7950,
    "winRate": 50,
    "appearances": 15067,
    "wins": 7533,
    "losses": 7534,
    "bestPartners": [
      {
        "name": "Mega Greninja",
        "winRate": 50.7,
        "games": 4970
      },
      {
        "name": "Decidueye",
        "winRate": 50.7,
        "games": 4970
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 4970
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 4970
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50,
        "games": 4954
      }
    ],
    "bestSets": []
  },
  "5706": {
    "id": 5706,
    "name": "Hisuian Goodra",
    "isMega": false,
    "elo": 7999,
    "winRate": 51.8,
    "appearances": 29298,
    "wins": 15183,
    "losses": 14115,
    "bestPartners": [
      {
        "name": "Diggersby",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Hippowdon",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Sandaconda",
        "winRate": 53.5,
        "games": 9387
      },
      {
        "name": "Mega Gyarados",
        "winRate": 52.3,
        "games": 14616
      },
      {
        "name": "Archaludon",
        "winRate": 52.3,
        "games": 19400
      }
    ],
    "bestSets": []
  },
  "6080": {
    "id": 6080,
    "name": "Galarian Slowbro",
    "isMega": false,
    "elo": 7971,
    "winRate": 48.7,
    "appearances": 29908,
    "wins": 14560,
    "losses": 15348,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 51.1,
        "games": 4915
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 14953
      },
      {
        "name": "Garchomp",
        "winRate": 49.6,
        "games": 14953
      },
      {
        "name": "Mega Feraligatr",
        "winRate": 49.6,
        "games": 5096
      },
      {
        "name": "Mega Tyranitar",
        "winRate": 49.1,
        "games": 5168
      }
    ],
    "bestSets": []
  },
  "6199": {
    "id": 6199,
    "name": "Galarian Slowking",
    "isMega": false,
    "elo": 7967,
    "winRate": 49.6,
    "appearances": 15241,
    "wins": 7566,
    "losses": 7675,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.1,
        "games": 5040
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 5040
      },
      {
        "name": "Kingambit",
        "winRate": 50.1,
        "games": 5040
      },
      {
        "name": "Greninja",
        "winRate": 50.1,
        "games": 5040
      },
      {
        "name": "Tauros",
        "winRate": 50.1,
        "games": 10121
      }
    ],
    "bestSets": []
  },
  "6618": {
    "id": 6618,
    "name": "Galarian Stunfisk",
    "isMega": false,
    "elo": 7953,
    "winRate": 46.9,
    "appearances": 60811,
    "wins": 28524,
    "losses": 32287,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 9835
      },
      {
        "name": "Mega Slowbro",
        "winRate": 50.7,
        "games": 4985
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 4985
      },
      {
        "name": "Paldean Tauros",
        "winRate": 50.7,
        "games": 4985
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 4985
      }
    ],
    "bestSets": []
  },
  "10008": {
    "id": 10008,
    "name": "Heat Rotom",
    "isMega": false,
    "elo": 7957,
    "winRate": 50.4,
    "appearances": 147621,
    "wins": 74381,
    "losses": 73240,
    "bestPartners": [
      {
        "name": "Serperior",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Sinistcha",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Mega Garchomp Z",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Arcanine",
        "winRate": 60,
        "games": 4103
      }
    ],
    "bestSets": []
  },
  "10009": {
    "id": 10009,
    "name": "Wash Rotom",
    "isMega": false,
    "elo": 8032,
    "winRate": 61.4,
    "appearances": 24080,
    "wins": 14788,
    "losses": 9292,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 67.7,
        "games": 10838
      },
      {
        "name": "Rhyperior",
        "winRate": 67.7,
        "games": 10838
      },
      {
        "name": "Luxray",
        "winRate": 67.7,
        "games": 10838
      },
      {
        "name": "Pinsir",
        "winRate": 67.6,
        "games": 7247
      },
      {
        "name": "Archaludon",
        "winRate": 66.2,
        "games": 14849
      }
    ],
    "bestSets": []
  },
  "10010": {
    "id": 10010,
    "name": "Frost Rotom",
    "isMega": false,
    "elo": 7949,
    "winRate": 51.3,
    "appearances": 14308,
    "wins": 7344,
    "losses": 6964,
    "bestPartners": [
      {
        "name": "Talonflame",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Primarina",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Heracross",
        "winRate": 55.1,
        "games": 4525
      },
      {
        "name": "Garchomp",
        "winRate": 52.1,
        "games": 9428
      },
      {
        "name": "Hawlucha",
        "winRate": 51.3,
        "games": 14308
      }
    ],
    "bestSets": []
  },
  "10011": {
    "id": 10011,
    "name": "Fan Rotom",
    "isMega": false,
    "elo": 7931,
    "winRate": 49.4,
    "appearances": 24658,
    "wins": 12186,
    "losses": 12472,
    "bestPartners": [
      {
        "name": "Mega Lucario",
        "winRate": 50.8,
        "games": 4904
      },
      {
        "name": "Dragapult",
        "winRate": 50.8,
        "games": 4904
      },
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 9894
      },
      {
        "name": "Gliscor",
        "winRate": 50.8,
        "games": 9894
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.8,
        "games": 4904
      }
    ],
    "bestSets": []
  },
  "10012": {
    "id": 10012,
    "name": "Mow Rotom",
    "isMega": false,
    "elo": 7976,
    "winRate": 52.3,
    "appearances": 14131,
    "wins": 7392,
    "losses": 6739,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Hydreigon",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Decidueye",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Archaludon",
        "winRate": 53.1,
        "games": 9324
      }
    ],
    "bestSets": []
  },
  "10100": {
    "id": 10100,
    "name": "Alolan Raichu",
    "isMega": false,
    "elo": 8024,
    "winRate": 47.3,
    "appearances": 67235,
    "wins": 31818,
    "losses": 35417,
    "bestPartners": [
      {
        "name": "Mega Beedrill",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Lycanroc",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Tyranitar",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Garchomp",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Rampardos",
        "winRate": 49.8,
        "games": 4889
      }
    ],
    "bestSets": []
  },
  "10103": {
    "id": 10103,
    "name": "Alolan Ninetales",
    "isMega": false,
    "elo": 7967,
    "winRate": 45.5,
    "appearances": 40303,
    "wins": 18353,
    "losses": 21950,
    "bestPartners": [
      {
        "name": "Emolga",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 51.4,
        "games": 5044
      },
      {
        "name": "Mega Garchomp",
        "winRate": 51.2,
        "games": 5015
      },
      {
        "name": "Corviknight",
        "winRate": 51.2,
        "games": 5015
      },
      {
        "name": "Primarina",
        "winRate": 51.2,
        "games": 5015
      }
    ],
    "bestSets": []
  },
  "10250": {
    "id": 10250,
    "name": "Paldean Tauros",
    "isMega": false,
    "elo": 7990,
    "winRate": 49.8,
    "appearances": 216485,
    "wins": 107709,
    "losses": 108776,
    "bestPartners": [
      {
        "name": "Mega Abomasnow",
        "winRate": 53.1,
        "games": 4731
      },
      {
        "name": "Hatterene",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Mudsdale",
        "winRate": 52.6,
        "games": 4748
      },
      {
        "name": "Torkoal",
        "winRate": 52.3,
        "games": 9566
      },
      {
        "name": "Ursaluna",
        "winRate": 52.1,
        "games": 4818
      }
    ],
    "bestSets": []
  },
  "10251": {
    "id": 10251,
    "name": "Paldean Tauros (Blaze)",
    "isMega": false,
    "elo": 8043,
    "winRate": 50.1,
    "appearances": 304694,
    "wins": 152568,
    "losses": 152126,
    "bestPartners": [
      {
        "name": "Serperior",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Sinistcha",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Heat Rotom",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Roserade",
        "winRate": 60.4,
        "games": 3940
      },
      {
        "name": "Mega Froslass",
        "winRate": 55.2,
        "games": 13586
      }
    ],
    "bestSets": []
  },
  "10252": {
    "id": 10252,
    "name": "Paldean Tauros (Aqua)",
    "isMega": false,
    "elo": 8023,
    "winRate": 49.7,
    "appearances": 281898,
    "wins": 140241,
    "losses": 141657,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 57.4,
        "games": 4342
      },
      {
        "name": "Typhlosion",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Empoleon",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Mega Meowstic",
        "winRate": 51.3,
        "games": 4941
      }
    ],
    "bestSets": []
  },
  "10336": {
    "id": 10336,
    "name": "Hisuian Samurott",
    "isMega": false,
    "elo": 7994,
    "winRate": 49.6,
    "appearances": 108376,
    "wins": 53776,
    "losses": 54600,
    "bestPartners": [
      {
        "name": "Typhlosion",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Noivern",
        "winRate": 53,
        "games": 4778
      },
      {
        "name": "Empoleon",
        "winRate": 51.6,
        "games": 9613
      },
      {
        "name": "Mega Froslass",
        "winRate": 51.4,
        "games": 4921
      }
    ],
    "bestSets": []
  },
  "10340": {
    "id": 10340,
    "name": "Hisuian Zoroark",
    "isMega": false,
    "elo": 7890,
    "winRate": 46.9,
    "appearances": 53135,
    "wins": 24921,
    "losses": 28214,
    "bestPartners": [
      {
        "name": "Slurpuff",
        "winRate": 49.8,
        "games": 4897
      },
      {
        "name": "Skarmory",
        "winRate": 49.8,
        "games": 4897
      },
      {
        "name": "Luxray",
        "winRate": 49.4,
        "games": 5125
      },
      {
        "name": "Charizard",
        "winRate": 49.4,
        "games": 5125
      },
      {
        "name": "Wyrdeer",
        "winRate": 49.4,
        "games": 5125
      }
    ],
    "bestSets": []
  },
  "10341": {
    "id": 10341,
    "name": "Hisuian Decidueye",
    "isMega": false,
    "elo": 7998,
    "winRate": 50.3,
    "appearances": 29287,
    "wins": 14745,
    "losses": 14542,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Archaludon",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Mow Rotom",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Hydreigon",
        "winRate": 53.6,
        "games": 9644
      },
      {
        "name": "Decidueye",
        "winRate": 53.6,
        "games": 9250
      }
    ],
    "bestSets": []
  },
  "115-mega": {
    "id": 115,
    "name": "Mega Kangaskhan",
    "isMega": true,
    "elo": 8043,
    "winRate": 50.8,
    "appearances": 152390,
    "wins": 77488,
    "losses": 74902,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Gliscor",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Primarina",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Venusaur",
        "winRate": 62.2,
        "games": 3884
      },
      {
        "name": "Sylveon",
        "winRate": 51.6,
        "games": 9732
      }
    ],
    "bestSets": []
  },
  "214-mega": {
    "id": 214,
    "name": "Mega Heracross",
    "isMega": true,
    "elo": 8038,
    "winRate": 51.5,
    "appearances": 19394,
    "wins": 9979,
    "losses": 9415,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 57.5,
        "games": 4380
      },
      {
        "name": "Tyranitar",
        "winRate": 53.7,
        "games": 9215
      },
      {
        "name": "Archaludon",
        "winRate": 53.2,
        "games": 9436
      },
      {
        "name": "Metagross",
        "winRate": 53.1,
        "games": 9503
      },
      {
        "name": "Tinkaton",
        "winRate": 52.1,
        "games": 14338
      }
    ],
    "bestSets": []
  },
  "952-mega": {
    "id": 952,
    "name": "Mega Scovillain",
    "isMega": true,
    "elo": 8037,
    "winRate": 57,
    "appearances": 13009,
    "wins": 7412,
    "losses": 5597,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 61.8,
        "games": 3876
      },
      {
        "name": "Kingambit",
        "winRate": 61.4,
        "games": 7976
      },
      {
        "name": "Stunfisk",
        "winRate": 61.1,
        "games": 4100
      },
      {
        "name": "Archaludon",
        "winRate": 57,
        "games": 13009
      },
      {
        "name": "Aerodactyl",
        "winRate": 57,
        "games": 13009
      }
    ],
    "bestSets": []
  },
  "282-mega": {
    "id": 282,
    "name": "Mega Gardevoir",
    "isMega": true,
    "elo": 8030,
    "winRate": 50.5,
    "appearances": 716382,
    "wins": 361545,
    "losses": 354837,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 68.7,
        "games": 3454
      },
      {
        "name": "Snorlax",
        "winRate": 58,
        "games": 8038
      },
      {
        "name": "Torkoal",
        "winRate": 57.9,
        "games": 12970
      },
      {
        "name": "Venusaur",
        "winRate": 57.9,
        "games": 12970
      },
      {
        "name": "Clefable",
        "winRate": 55.6,
        "games": 4531
      }
    ],
    "bestSets": []
  },
  "9-mega": {
    "id": 9,
    "name": "Mega Blastoise",
    "isMega": true,
    "elo": 8030,
    "winRate": 52.4,
    "appearances": 43557,
    "wins": 22810,
    "losses": 20747,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 60.6,
        "games": 8251
      },
      {
        "name": "Decidueye",
        "winRate": 60.6,
        "games": 8251
      },
      {
        "name": "Mow Rotom",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 57.8,
        "games": 4361
      },
      {
        "name": "Hydreigon",
        "winRate": 57.8,
        "games": 4361
      }
    ],
    "bestSets": []
  },
  "376-mega": {
    "id": 376,
    "name": "Mega Metagross",
    "isMega": true,
    "elo": 8019,
    "winRate": 49.7,
    "appearances": 289243,
    "wins": 143865,
    "losses": 145378,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 51,
        "games": 5097
      },
      {
        "name": "Torkoal",
        "winRate": 51,
        "games": 4920
      },
      {
        "name": "Venusaur",
        "winRate": 51,
        "games": 4920
      },
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 126783
      },
      {
        "name": "Aegislash",
        "winRate": 50.2,
        "games": 24959
      }
    ],
    "bestSets": []
  },
  "531-mega": {
    "id": 531,
    "name": "Mega Audino",
    "isMega": true,
    "elo": 8019,
    "winRate": 49.7,
    "appearances": 14891,
    "wins": 7402,
    "losses": 7489,
    "bestPartners": [
      {
        "name": "Arbok",
        "winRate": 50.6,
        "games": 4723
      },
      {
        "name": "Reuniclus",
        "winRate": 50.6,
        "games": 4723
      },
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 9771
      },
      {
        "name": "Cofagrigus",
        "winRate": 50.2,
        "games": 9771
      },
      {
        "name": "Hatterene",
        "winRate": 50.2,
        "games": 9771
      }
    ],
    "bestSets": []
  },
  "6-mega-y": {
    "id": 6,
    "name": "Mega Charizard Y",
    "isMega": true,
    "elo": 8015,
    "winRate": 52.2,
    "appearances": 34009,
    "wins": 17742,
    "losses": 16267,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 69,
        "games": 3572
      },
      {
        "name": "Hydreigon",
        "winRate": 69,
        "games": 3572
      },
      {
        "name": "Rhyperior",
        "winRate": 57.3,
        "games": 8535
      },
      {
        "name": "Archaludon",
        "winRate": 55.1,
        "games": 13546
      },
      {
        "name": "Luxray",
        "winRate": 55.1,
        "games": 13723
      }
    ],
    "bestSets": []
  },
  "670-mega": {
    "id": 670,
    "name": "Mega Floette",
    "isMega": true,
    "elo": 8011,
    "winRate": 50.1,
    "appearances": 19384,
    "wins": 9704,
    "losses": 9680,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 53.2,
        "games": 4760
      },
      {
        "name": "Scizor",
        "winRate": 53.2,
        "games": 4760
      },
      {
        "name": "Wyrdeer",
        "winRate": 53.2,
        "games": 4760
      },
      {
        "name": "Archaludon",
        "winRate": 51.5,
        "games": 9787
      },
      {
        "name": "Tauros",
        "winRate": 51.2,
        "games": 14596
      }
    ],
    "bestSets": []
  },
  "319-mega": {
    "id": 319,
    "name": "Mega Sharpedo",
    "isMega": true,
    "elo": 8011,
    "winRate": 50.9,
    "appearances": 15114,
    "wins": 7692,
    "losses": 7422,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 51.2,
        "games": 5072
      },
      {
        "name": "Gyarados",
        "winRate": 51.2,
        "games": 5072
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 51.2,
        "games": 5072
      },
      {
        "name": "Dragapult",
        "winRate": 51.2,
        "games": 5072
      },
      {
        "name": "Venusaur",
        "winRate": 50.9,
        "games": 15114
      }
    ],
    "bestSets": []
  },
  "212-mega": {
    "id": 212,
    "name": "Mega Scizor",
    "isMega": true,
    "elo": 8009,
    "winRate": 50.4,
    "appearances": 242470,
    "wins": 122176,
    "losses": 120294,
    "bestPartners": [
      {
        "name": "Froslass",
        "winRate": 58.8,
        "games": 8338
      },
      {
        "name": "Krookodile",
        "winRate": 58.5,
        "games": 8412
      },
      {
        "name": "Archaludon",
        "winRate": 58.2,
        "games": 8389
      },
      {
        "name": "Hydreigon",
        "winRate": 55.9,
        "games": 4574
      },
      {
        "name": "Primarina",
        "winRate": 55.4,
        "games": 22420
      }
    ],
    "bestSets": []
  },
  "478-mega": {
    "id": 478,
    "name": "Mega Froslass",
    "isMega": true,
    "elo": 8003,
    "winRate": 55.2,
    "appearances": 13586,
    "wins": 7506,
    "losses": 6080,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 57.5,
        "games": 4323
      },
      {
        "name": "Garchomp",
        "winRate": 57.5,
        "games": 4323
      },
      {
        "name": "Greninja",
        "winRate": 57.5,
        "games": 4323
      },
      {
        "name": "Arcanine",
        "winRate": 57.5,
        "games": 4323
      },
      {
        "name": "Incineroar",
        "winRate": 57.4,
        "games": 4342
      }
    ],
    "bestSets": []
  },
  "445-mega": {
    "id": 445,
    "name": "Mega Garchomp",
    "isMega": true,
    "elo": 7996,
    "winRate": 51.1,
    "appearances": 19498,
    "wins": 9972,
    "losses": 9526,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Klefki",
        "winRate": 54.4,
        "games": 4602
      },
      {
        "name": "Corviknight",
        "winRate": 52.7,
        "games": 9617
      },
      {
        "name": "Forretress",
        "winRate": 51.9,
        "games": 9420
      },
      {
        "name": "Gyarados",
        "winRate": 51.9,
        "games": 9420
      }
    ],
    "bestSets": []
  },
  "310-mega": {
    "id": 310,
    "name": "Mega Manectric",
    "isMega": true,
    "elo": 7996,
    "winRate": 50,
    "appearances": 14896,
    "wins": 7455,
    "losses": 7441,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.5,
        "games": 5079
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.5,
        "games": 5079
      },
      {
        "name": "Hawlucha",
        "winRate": 50.3,
        "games": 9994
      },
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 4915
      },
      {
        "name": "Pinsir",
        "winRate": 50.1,
        "games": 4915
      }
    ],
    "bestSets": []
  },
  "248-mega": {
    "id": 248,
    "name": "Mega Tyranitar",
    "isMega": true,
    "elo": 7995,
    "winRate": 50.1,
    "appearances": 706382,
    "wins": 353751,
    "losses": 352631,
    "bestPartners": [
      {
        "name": "Talonflame",
        "winRate": 51.1,
        "games": 4851
      },
      {
        "name": "Politoed",
        "winRate": 50.8,
        "games": 30444
      },
      {
        "name": "Sylveon",
        "winRate": 50.8,
        "games": 14715
      },
      {
        "name": "Raichu",
        "winRate": 50.7,
        "games": 9478
      },
      {
        "name": "Drampa",
        "winRate": 50.7,
        "games": 4681
      }
    ],
    "bestSets": []
  },
  "658-mega": {
    "id": 658,
    "name": "Mega Greninja",
    "isMega": true,
    "elo": 7994,
    "winRate": 49.6,
    "appearances": 14788,
    "wins": 7340,
    "losses": 7448,
    "bestPartners": [
      {
        "name": "Hisuian Typhlosion",
        "winRate": 50.7,
        "games": 4970
      },
      {
        "name": "Decidueye",
        "winRate": 50.7,
        "games": 4970
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 4970
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 9826
      },
      {
        "name": "Arbok",
        "winRate": 49.9,
        "games": 4856
      }
    ],
    "bestSets": []
  },
  "475-mega": {
    "id": 475,
    "name": "Mega Gallade",
    "isMega": true,
    "elo": 7992,
    "winRate": 47.9,
    "appearances": 14656,
    "wins": 7018,
    "losses": 7638,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 49.2,
        "games": 5061
      },
      {
        "name": "Heliolisk",
        "winRate": 49.2,
        "games": 5061
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 49.2,
        "games": 5061
      },
      {
        "name": "Tauros",
        "winRate": 48.6,
        "games": 9942
      },
      {
        "name": "Incineroar",
        "winRate": 48.1,
        "games": 4881
      }
    ],
    "bestSets": []
  },
  "530-mega": {
    "id": 530,
    "name": "Mega Excadrill",
    "isMega": true,
    "elo": 7991,
    "winRate": 49.6,
    "appearances": 15229,
    "wins": 7553,
    "losses": 7676,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 50.3,
        "games": 4982
      },
      {
        "name": "Whimsicott",
        "winRate": 49.8,
        "games": 10220
      },
      {
        "name": "Azumarill",
        "winRate": 49.8,
        "games": 10220
      },
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 9991
      },
      {
        "name": "Dragonite",
        "winRate": 49.7,
        "games": 9991
      }
    ],
    "bestSets": []
  },
  "652-mega": {
    "id": 652,
    "name": "Mega Chesnaught",
    "isMega": true,
    "elo": 7988,
    "winRate": 49.9,
    "appearances": 15208,
    "wins": 7591,
    "losses": 7617,
    "bestPartners": [
      {
        "name": "Tinkaton",
        "winRate": 50.7,
        "games": 5089
      },
      {
        "name": "Metagross",
        "winRate": 50.2,
        "games": 10111
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.2,
        "games": 10111
      },
      {
        "name": "Palafin",
        "winRate": 50.2,
        "games": 10111
      },
      {
        "name": "Salazzle",
        "winRate": 50,
        "games": 10186
      }
    ],
    "bestSets": []
  },
  "208-mega": {
    "id": 208,
    "name": "Mega Steelix",
    "isMega": true,
    "elo": 7988,
    "winRate": 49.7,
    "appearances": 14961,
    "wins": 7433,
    "losses": 7528,
    "bestPartners": [
      {
        "name": "Simipour",
        "winRate": 49.9,
        "games": 5048
      },
      {
        "name": "Tauros",
        "winRate": 49.9,
        "games": 5048
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 5048
      },
      {
        "name": "Vaporeon",
        "winRate": 49.8,
        "games": 9955
      },
      {
        "name": "Dragonite",
        "winRate": 49.7,
        "games": 4907
      }
    ],
    "bestSets": []
  },
  "130-mega": {
    "id": 130,
    "name": "Mega Gyarados",
    "isMega": true,
    "elo": 7987,
    "winRate": 50.7,
    "appearances": 668918,
    "wins": 339046,
    "losses": 329872,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 59.1,
        "games": 21050
      },
      {
        "name": "Snorlax",
        "winRate": 58,
        "games": 8038
      },
      {
        "name": "Diggersby",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Hippowdon",
        "winRate": 58,
        "games": 4336
      },
      {
        "name": "Primarina",
        "winRate": 57.9,
        "games": 12937
      }
    ],
    "bestSets": []
  },
  "15-mega": {
    "id": 15,
    "name": "Mega Beedrill",
    "isMega": true,
    "elo": 7987,
    "winRate": 49.1,
    "appearances": 14979,
    "wins": 7362,
    "losses": 7617,
    "bestPartners": [
      {
        "name": "Morpeko",
        "winRate": 49.9,
        "games": 5042
      },
      {
        "name": "Alolan Raichu",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Tauros",
        "winRate": 49.8,
        "games": 10173
      },
      {
        "name": "Lycanroc",
        "winRate": 49.8,
        "games": 5131
      },
      {
        "name": "Tyranitar",
        "winRate": 49.8,
        "games": 10173
      }
    ],
    "bestSets": []
  },
  "970-mega": {
    "id": 970,
    "name": "Mega Glimmora",
    "isMega": true,
    "elo": 7986,
    "winRate": 49.4,
    "appearances": 15086,
    "wins": 7452,
    "losses": 7634,
    "bestPartners": [
      {
        "name": "Feraligatr",
        "winRate": 49.9,
        "games": 4991
      },
      {
        "name": "Milotic",
        "winRate": 49.9,
        "games": 4991
      },
      {
        "name": "Scizor",
        "winRate": 49.9,
        "games": 4991
      },
      {
        "name": "Whimsicott",
        "winRate": 49.9,
        "games": 4991
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 49.7,
        "games": 10034
      }
    ],
    "bestSets": []
  },
  "149-mega": {
    "id": 149,
    "name": "Mega Dragonite",
    "isMega": true,
    "elo": 7983,
    "winRate": 49.4,
    "appearances": 213664,
    "wins": 105609,
    "losses": 108055,
    "bestPartners": [
      {
        "name": "Politoed",
        "winRate": 50.8,
        "games": 20293
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 5242
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.7,
        "games": 5242
      },
      {
        "name": "Hydreigon",
        "winRate": 50.3,
        "games": 4835
      },
      {
        "name": "Emboar",
        "winRate": 50.3,
        "games": 4835
      }
    ],
    "bestSets": []
  },
  "500-mega": {
    "id": 500,
    "name": "Mega Emboar",
    "isMega": true,
    "elo": 7981,
    "winRate": 50.4,
    "appearances": 14981,
    "wins": 7547,
    "losses": 7434,
    "bestPartners": [
      {
        "name": "Slowbro",
        "winRate": 50.6,
        "games": 4874
      },
      {
        "name": "Emolga",
        "winRate": 50.5,
        "games": 5078
      },
      {
        "name": "Decidueye",
        "winRate": 50.5,
        "games": 5078
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 14981
      },
      {
        "name": "Whimsicott",
        "winRate": 50.4,
        "games": 14981
      }
    ],
    "bestSets": []
  },
  "80-mega": {
    "id": 80,
    "name": "Mega Slowbro",
    "isMega": true,
    "elo": 7980,
    "winRate": 51.6,
    "appearances": 14804,
    "wins": 7641,
    "losses": 7163,
    "bestPartners": [
      {
        "name": "Ursaluna",
        "winRate": 52.1,
        "games": 4818
      },
      {
        "name": "Crabominable",
        "winRate": 52.1,
        "games": 4818
      },
      {
        "name": "Torkoal",
        "winRate": 52.1,
        "games": 4818
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 52,
        "games": 5001
      },
      {
        "name": "Kingambit",
        "winRate": 52,
        "games": 5001
      }
    ],
    "bestSets": []
  },
  "358-mega": {
    "id": 358,
    "name": "Mega Chimecho",
    "isMega": true,
    "elo": 7980,
    "winRate": 50.2,
    "appearances": 14961,
    "wins": 7511,
    "losses": 7450,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 50.6,
        "games": 5000
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.6,
        "games": 5000
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 9969
      },
      {
        "name": "Crabominable",
        "winRate": 50.2,
        "games": 9992
      },
      {
        "name": "Aromatisse",
        "winRate": 50.2,
        "games": 9992
      }
    ],
    "bestSets": []
  },
  "334-mega": {
    "id": 334,
    "name": "Mega Altaria",
    "isMega": true,
    "elo": 7979,
    "winRate": 49,
    "appearances": 19475,
    "wins": 9536,
    "losses": 9939,
    "bestPartners": [
      {
        "name": "Orthworm",
        "winRate": 50.5,
        "games": 5076
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.2,
        "games": 10080
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.9,
        "games": 9829
      },
      {
        "name": "Primarina",
        "winRate": 49.9,
        "games": 4825
      },
      {
        "name": "Mega Scizor",
        "winRate": 49.9,
        "games": 4825
      }
    ],
    "bestSets": []
  },
  "445-mega-z": {
    "id": 445,
    "name": "Mega Garchomp Z",
    "isMega": true,
    "elo": 7977,
    "winRate": 52.5,
    "appearances": 13930,
    "wins": 7308,
    "losses": 6622,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Azumarill",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Heat Rotom",
        "winRate": 60,
        "games": 4103
      },
      {
        "name": "Empoleon",
        "winRate": 54.2,
        "games": 9007
      },
      {
        "name": "Gyarados",
        "winRate": 52.5,
        "games": 13930
      }
    ],
    "bestSets": []
  },
  "3-mega": {
    "id": 3,
    "name": "Mega Venusaur",
    "isMega": true,
    "elo": 7975,
    "winRate": 53,
    "appearances": 14223,
    "wins": 7536,
    "losses": 6687,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Palafin",
        "winRate": 58.6,
        "games": 4316
      },
      {
        "name": "Aggron",
        "winRate": 54.7,
        "games": 9341
      },
      {
        "name": "Incineroar",
        "winRate": 53.8,
        "games": 9198
      },
      {
        "name": "Feraligatr",
        "winRate": 53,
        "games": 14223
      }
    ],
    "bestSets": []
  },
  "71-mega": {
    "id": 71,
    "name": "Mega Victreebel",
    "isMega": true,
    "elo": 7974,
    "winRate": 46.6,
    "appearances": 14194,
    "wins": 6613,
    "losses": 7581,
    "bestPartners": [
      {
        "name": "Feraligatr",
        "winRate": 49.5,
        "games": 4864
      },
      {
        "name": "Scizor",
        "winRate": 49.5,
        "games": 4864
      },
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 4864
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.1,
        "games": 9997
      },
      {
        "name": "Simipour",
        "winRate": 48.6,
        "games": 5133
      }
    ],
    "bestSets": []
  },
  "740-mega": {
    "id": 740,
    "name": "Mega Crabominable",
    "isMega": true,
    "elo": 7973,
    "winRate": 47.5,
    "appearances": 14522,
    "wins": 6898,
    "losses": 7624,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 5136
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 5136
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.6,
        "games": 5136
      },
      {
        "name": "Arbok",
        "winRate": 48.7,
        "games": 5068
      },
      {
        "name": "Starmie",
        "winRate": 48.7,
        "games": 5068
      }
    ],
    "bestSets": []
  },
  "36-mega": {
    "id": 36,
    "name": "Mega Clefable",
    "isMega": true,
    "elo": 7973,
    "winRate": 52.4,
    "appearances": 14441,
    "wins": 7568,
    "losses": 6873,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 55.1,
        "games": 4598
      },
      {
        "name": "Tauros",
        "winRate": 55.1,
        "games": 4598
      },
      {
        "name": "Incineroar",
        "winRate": 53.7,
        "games": 9445
      },
      {
        "name": "Kingambit",
        "winRate": 52.4,
        "games": 9594
      },
      {
        "name": "Scizor",
        "winRate": 52.4,
        "games": 14441
      }
    ],
    "bestSets": []
  },
  "18-mega": {
    "id": 18,
    "name": "Mega Pidgeot",
    "isMega": true,
    "elo": 7972,
    "winRate": 49.7,
    "appearances": 15070,
    "wins": 7491,
    "losses": 7579,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 50.4,
        "games": 5005
      },
      {
        "name": "Hippowdon",
        "winRate": 50.4,
        "games": 5005
      },
      {
        "name": "Empoleon",
        "winRate": 50.4,
        "games": 5005
      },
      {
        "name": "Ursaluna",
        "winRate": 50.4,
        "games": 5005
      },
      {
        "name": "Garchomp",
        "winRate": 50.2,
        "games": 10060
      }
    ],
    "bestSets": []
  },
  "94-mega": {
    "id": 94,
    "name": "Mega Gengar",
    "isMega": true,
    "elo": 7971,
    "winRate": 49.5,
    "appearances": 264204,
    "wins": 130675,
    "losses": 133529,
    "bestPartners": [
      {
        "name": "Mega Kangaskhan",
        "winRate": 51.3,
        "games": 4887
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 51,
        "games": 24062
      },
      {
        "name": "Politoed",
        "winRate": 50.8,
        "games": 30444
      },
      {
        "name": "Mega Tyranitar",
        "winRate": 49.7,
        "games": 245744
      },
      {
        "name": "Garchomp",
        "winRate": 49.7,
        "games": 231163
      }
    ],
    "bestSets": []
  },
  "655-mega": {
    "id": 655,
    "name": "Mega Delphox",
    "isMega": true,
    "elo": 7969,
    "winRate": 50.5,
    "appearances": 14817,
    "wins": 7476,
    "losses": 7341,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 51.7,
        "games": 4882
      },
      {
        "name": "Gyarados",
        "winRate": 51.7,
        "games": 4882
      },
      {
        "name": "Azumarill",
        "winRate": 51.7,
        "games": 4882
      },
      {
        "name": "Krookodile",
        "winRate": 51.7,
        "games": 4882
      },
      {
        "name": "Drampa",
        "winRate": 50.7,
        "games": 9814
      }
    ],
    "bestSets": []
  },
  "308-mega": {
    "id": 308,
    "name": "Mega Medicham",
    "isMega": true,
    "elo": 7968,
    "winRate": 48.4,
    "appearances": 14126,
    "wins": 6838,
    "losses": 7288,
    "bestPartners": [
      {
        "name": "Luxray",
        "winRate": 53,
        "games": 4873
      },
      {
        "name": "Gyarados",
        "winRate": 53,
        "games": 4873
      },
      {
        "name": "Tyranitar",
        "winRate": 51.6,
        "games": 9988
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.2,
        "games": 5115
      },
      {
        "name": "Heliolisk",
        "winRate": 50.2,
        "games": 5115
      }
    ],
    "bestSets": []
  },
  "65-mega": {
    "id": 65,
    "name": "Mega Alakazam",
    "isMega": true,
    "elo": 7967,
    "winRate": 48.1,
    "appearances": 14409,
    "wins": 6936,
    "losses": 7473,
    "bestPartners": [
      {
        "name": "Conkeldurr",
        "winRate": 51,
        "games": 4995
      },
      {
        "name": "Aromatisse",
        "winRate": 51,
        "games": 4995
      },
      {
        "name": "Krookodile",
        "winRate": 50.4,
        "games": 10144
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 5149
      },
      {
        "name": "Tauros",
        "winRate": 49.8,
        "games": 5149
      }
    ],
    "bestSets": []
  },
  "302-mega": {
    "id": 302,
    "name": "Mega Sableye",
    "isMega": true,
    "elo": 7967,
    "winRate": 48.9,
    "appearances": 34667,
    "wins": 16944,
    "losses": 17723,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 51.3,
        "games": 5011
      },
      {
        "name": "Slowbro",
        "winRate": 50.6,
        "games": 9967
      },
      {
        "name": "Drampa",
        "winRate": 50.6,
        "games": 9967
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 15164
      },
      {
        "name": "Hatterene",
        "winRate": 49.9,
        "games": 4956
      }
    ],
    "bestSets": []
  },
  "780-mega": {
    "id": 780,
    "name": "Mega Drampa",
    "isMega": true,
    "elo": 7966,
    "winRate": 49.6,
    "appearances": 14819,
    "wins": 7348,
    "losses": 7471,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.8,
        "games": 9799
      },
      {
        "name": "Volcarona",
        "winRate": 49.8,
        "games": 4830
      },
      {
        "name": "Metagross",
        "winRate": 49.8,
        "games": 4830
      },
      {
        "name": "Ninetales",
        "winRate": 49.7,
        "games": 4969
      },
      {
        "name": "Primarina",
        "winRate": 49.7,
        "games": 4969
      }
    ],
    "bestSets": []
  },
  "229-mega": {
    "id": 229,
    "name": "Mega Houndoom",
    "isMega": true,
    "elo": 7965,
    "winRate": 48,
    "appearances": 14798,
    "wins": 7106,
    "losses": 7692,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 49.9,
        "games": 5128
      },
      {
        "name": "Decidueye",
        "winRate": 49.9,
        "games": 10252
      },
      {
        "name": "Primarina",
        "winRate": 49.9,
        "games": 5128
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 5124
      },
      {
        "name": "Whimsicott",
        "winRate": 49.9,
        "games": 5124
      }
    ],
    "bestSets": []
  },
  "678-mega": {
    "id": 678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 7963,
    "winRate": 50.3,
    "appearances": 15068,
    "wins": 7577,
    "losses": 7491,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 51.3,
        "games": 4941
      },
      {
        "name": "Lucario",
        "winRate": 51.3,
        "games": 4941
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51.3,
        "games": 4941
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 10028
      },
      {
        "name": "Krookodile",
        "winRate": 50.5,
        "games": 9981
      }
    ],
    "bestSets": []
  },
  "362-mega": {
    "id": 362,
    "name": "Mega Glalie",
    "isMega": true,
    "elo": 7962,
    "winRate": 49.8,
    "appearances": 14448,
    "wins": 7195,
    "losses": 7253,
    "bestPartners": [
      {
        "name": "Feraligatr",
        "winRate": 50,
        "games": 4696
      },
      {
        "name": "Aegislash",
        "winRate": 50,
        "games": 4696
      },
      {
        "name": "Krookodile",
        "winRate": 50,
        "games": 4696
      },
      {
        "name": "Dragapult",
        "winRate": 50,
        "games": 4696
      },
      {
        "name": "Dragonite",
        "winRate": 49.8,
        "games": 9468
      }
    ],
    "bestSets": []
  },
  "428-mega": {
    "id": 428,
    "name": "Mega Lopunny",
    "isMega": true,
    "elo": 7961,
    "winRate": 49.4,
    "appearances": 15070,
    "wins": 7445,
    "losses": 7625,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 50.2,
        "games": 4997
      },
      {
        "name": "Banette",
        "winRate": 50.2,
        "games": 4997
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 10057
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 10057
      },
      {
        "name": "Arbok",
        "winRate": 49.8,
        "games": 5060
      }
    ],
    "bestSets": []
  },
  "460-mega": {
    "id": 460,
    "name": "Mega Abomasnow",
    "isMega": true,
    "elo": 7958,
    "winRate": 49.3,
    "appearances": 19574,
    "wins": 9654,
    "losses": 9920,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 53.1,
        "games": 4731
      },
      {
        "name": "Archaludon",
        "winRate": 53.1,
        "games": 4731
      },
      {
        "name": "Arbok",
        "winRate": 51.3,
        "games": 9727
      },
      {
        "name": "Gyarados",
        "winRate": 51.3,
        "games": 9727
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 9617
      }
    ],
    "bestSets": []
  },
  "154-mega": {
    "id": 154,
    "name": "Mega Meganium",
    "isMega": true,
    "elo": 7952,
    "winRate": 48.5,
    "appearances": 14487,
    "wins": 7023,
    "losses": 7464,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 4918
      },
      {
        "name": "Tinkaton",
        "winRate": 50.8,
        "games": 4918
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.8,
        "games": 4918
      },
      {
        "name": "Archaludon",
        "winRate": 49.7,
        "games": 5036
      },
      {
        "name": "Toxapex",
        "winRate": 49.7,
        "games": 5036
      }
    ],
    "bestSets": []
  },
  "127-mega": {
    "id": 127,
    "name": "Mega Pinsir",
    "isMega": true,
    "elo": 7951,
    "winRate": 56.3,
    "appearances": 17593,
    "wins": 9911,
    "losses": 7682,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 67.9,
        "games": 3591
      },
      {
        "name": "Luxray",
        "winRate": 67.9,
        "games": 3591
      },
      {
        "name": "Wash Rotom",
        "winRate": 64.8,
        "games": 7602
      },
      {
        "name": "Empoleon",
        "winRate": 62,
        "games": 4011
      },
      {
        "name": "Stunfisk",
        "winRate": 62,
        "games": 4011
      }
    ],
    "bestSets": []
  },
  "160-mega": {
    "id": 160,
    "name": "Mega Feraligatr",
    "isMega": true,
    "elo": 7949,
    "winRate": 48.9,
    "appearances": 68508,
    "wins": 33488,
    "losses": 35020,
    "bestPartners": [
      {
        "name": "Hawlucha",
        "winRate": 51.2,
        "games": 5011
      },
      {
        "name": "Luxray",
        "winRate": 51.2,
        "games": 5011
      },
      {
        "name": "Mega Charizard Y",
        "winRate": 51.2,
        "games": 5011
      },
      {
        "name": "Froslass",
        "winRate": 50.6,
        "games": 10044
      },
      {
        "name": "Decidueye",
        "winRate": 50.6,
        "games": 5027
      }
    ],
    "bestSets": []
  },
  "181-mega": {
    "id": 181,
    "name": "Mega Ampharos",
    "isMega": true,
    "elo": 7944,
    "winRate": 49.6,
    "appearances": 14861,
    "wins": 7373,
    "losses": 7488,
    "bestPartners": [
      {
        "name": "Arbok",
        "winRate": 49.9,
        "games": 5005
      },
      {
        "name": "Charizard",
        "winRate": 49.9,
        "games": 5005
      },
      {
        "name": "Wyrdeer",
        "winRate": 49.8,
        "games": 10018
      },
      {
        "name": "Whimsicott",
        "winRate": 49.8,
        "games": 10018
      },
      {
        "name": "Krookodile",
        "winRate": 49.7,
        "games": 5013
      }
    ],
    "bestSets": []
  },
  "142-mega": {
    "id": 142,
    "name": "Mega Aerodactyl",
    "isMega": true,
    "elo": 7935,
    "winRate": 51.5,
    "appearances": 14498,
    "wins": 7470,
    "losses": 7028,
    "bestPartners": [
      {
        "name": "Orthworm",
        "winRate": 53.5,
        "games": 4803
      },
      {
        "name": "Feraligatr",
        "winRate": 52.1,
        "games": 9610
      },
      {
        "name": "Venusaur",
        "winRate": 51.9,
        "games": 9691
      },
      {
        "name": "Tsareena",
        "winRate": 51.9,
        "games": 9691
      },
      {
        "name": "Incineroar",
        "winRate": 51.5,
        "games": 14498
      }
    ],
    "bestSets": []
  },
  "609-mega": {
    "id": 609,
    "name": "Mega Chandelure",
    "isMega": true,
    "elo": 7935,
    "winRate": 49.6,
    "appearances": 25203,
    "wins": 12493,
    "losses": 12710,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.6,
        "games": 5030
      },
      {
        "name": "Abomasnow",
        "winRate": 50.6,
        "games": 5030
      },
      {
        "name": "Dragonite",
        "winRate": 50.1,
        "games": 9993
      },
      {
        "name": "Weavile",
        "winRate": 50.1,
        "games": 9993
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 15028
      }
    ],
    "bestSets": []
  },
  "121-mega": {
    "id": 121,
    "name": "Mega Starmie",
    "isMega": true,
    "elo": 7935,
    "winRate": 50.1,
    "appearances": 15141,
    "wins": 7593,
    "losses": 7548,
    "bestPartners": [
      {
        "name": "Aromatisse",
        "winRate": 50.7,
        "games": 5033
      },
      {
        "name": "Crabominable",
        "winRate": 50.7,
        "games": 10019
      },
      {
        "name": "Torkoal",
        "winRate": 50.7,
        "games": 10019
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5033
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.7,
        "games": 5033
      }
    ],
    "bestSets": []
  },
  "323-mega": {
    "id": 323,
    "name": "Mega Camerupt",
    "isMega": true,
    "elo": 7933,
    "winRate": 50.5,
    "appearances": 20594,
    "wins": 10405,
    "losses": 10189,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 50.8,
        "games": 5100
      },
      {
        "name": "Greninja",
        "winRate": 50.8,
        "games": 5100
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 5035
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.7,
        "games": 5035
      },
      {
        "name": "Slowbro",
        "winRate": 50.7,
        "games": 5035
      }
    ],
    "bestSets": []
  },
  "701-mega": {
    "id": 701,
    "name": "Mega Hawlucha",
    "isMega": true,
    "elo": 7928,
    "winRate": 50.4,
    "appearances": 14657,
    "wins": 7392,
    "losses": 7265,
    "bestPartners": [
      {
        "name": "Klefki",
        "winRate": 50.9,
        "games": 5021
      },
      {
        "name": "Incineroar",
        "winRate": 50.9,
        "games": 5021
      },
      {
        "name": "Tyranitar",
        "winRate": 50.9,
        "games": 5021
      },
      {
        "name": "Scizor",
        "winRate": 50.7,
        "games": 9737
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.4,
        "games": 4716
      }
    ],
    "bestSets": []
  },
  "306-mega": {
    "id": 306,
    "name": "Mega Aggron",
    "isMega": true,
    "elo": 7928,
    "winRate": 45.7,
    "appearances": 13845,
    "wins": 6331,
    "losses": 7514,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.2,
        "games": 5141
      },
      {
        "name": "Hawlucha",
        "winRate": 50.2,
        "games": 5141
      },
      {
        "name": "Dragonite",
        "winRate": 49.6,
        "games": 10157
      },
      {
        "name": "Whimsicott",
        "winRate": 49.6,
        "games": 10157
      },
      {
        "name": "Charizard",
        "winRate": 49,
        "games": 5016
      }
    ],
    "bestSets": []
  },
  "448-mega": {
    "id": 448,
    "name": "Mega Lucario",
    "isMega": true,
    "elo": 7926,
    "winRate": 50.3,
    "appearances": 34751,
    "wins": 17478,
    "losses": 17273,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 52.5,
        "games": 4910
      },
      {
        "name": "Mega Scizor",
        "winRate": 52.5,
        "games": 4910
      },
      {
        "name": "Clefable",
        "winRate": 52.5,
        "games": 4910
      },
      {
        "name": "Palafin",
        "winRate": 52.5,
        "games": 4910
      },
      {
        "name": "Garchomp",
        "winRate": 50.8,
        "games": 15043
      }
    ],
    "bestSets": []
  },
  "359-mega-z": {
    "id": 359,
    "name": "Mega Absol Z",
    "isMega": true,
    "elo": 7926,
    "winRate": 46,
    "appearances": 14184,
    "wins": 6526,
    "losses": 7658,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.5,
        "games": 5188
      },
      {
        "name": "Froslass",
        "winRate": 49.5,
        "games": 5188
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 48,
        "games": 9946
      },
      {
        "name": "Arcanine",
        "winRate": 48,
        "games": 9946
      },
      {
        "name": "Gyarados",
        "winRate": 48,
        "games": 9946
      }
    ],
    "bestSets": []
  },
  "227-mega": {
    "id": 227,
    "name": "Mega Skarmory",
    "isMega": true,
    "elo": 7925,
    "winRate": 48.6,
    "appearances": 19436,
    "wins": 9454,
    "losses": 9982,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Camerupt",
        "winRate": 49.9,
        "games": 4870
      },
      {
        "name": "Glaceon",
        "winRate": 49.9,
        "games": 4982
      },
      {
        "name": "Froslass",
        "winRate": 49.9,
        "games": 4982
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.9,
        "games": 4982
      }
    ],
    "bestSets": []
  },
  "6-mega-x": {
    "id": 6,
    "name": "Mega Charizard X",
    "isMega": true,
    "elo": 7918,
    "winRate": 50.4,
    "appearances": 15142,
    "wins": 7631,
    "losses": 7511,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.8,
        "games": 5135
      },
      {
        "name": "Decidueye",
        "winRate": 50.8,
        "games": 5135
      },
      {
        "name": "Stunfisk",
        "winRate": 50.8,
        "games": 5135
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 5135
      },
      {
        "name": "Hydreigon",
        "winRate": 50.4,
        "games": 15142
      }
    ],
    "bestSets": []
  },
  "448-mega-z": {
    "id": 448,
    "name": "Mega Lucario Z",
    "isMega": true,
    "elo": 7915,
    "winRate": 50.7,
    "appearances": 15099,
    "wins": 7656,
    "losses": 7443,
    "bestPartners": [
      {
        "name": "Primarina",
        "winRate": 51,
        "games": 4940
      },
      {
        "name": "Slowbro",
        "winRate": 51,
        "games": 4940
      },
      {
        "name": "Dragonite",
        "winRate": 50.7,
        "games": 10109
      },
      {
        "name": "Altaria",
        "winRate": 50.7,
        "games": 15099
      },
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 10109
      }
    ],
    "bestSets": []
  },
  "359-mega": {
    "id": 359,
    "name": "Mega Absol",
    "isMega": true,
    "elo": 7891,
    "winRate": 45.5,
    "appearances": 13831,
    "wins": 6295,
    "losses": 7536,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 49.8,
        "games": 4821
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.5,
        "games": 9971
      },
      {
        "name": "Gyarados",
        "winRate": 49.5,
        "games": 9971
      },
      {
        "name": "Arcanine",
        "winRate": 49.1,
        "games": 5150
      },
      {
        "name": "Froslass",
        "winRate": 49.1,
        "games": 5150
      }
    ],
    "bestSets": []
  },
  "354-mega": {
    "id": 354,
    "name": "Mega Banette",
    "isMega": true,
    "elo": 7886,
    "winRate": 46,
    "appearances": 13472,
    "wins": 6199,
    "losses": 7273,
    "bestPartners": [
      {
        "name": "Greninja",
        "winRate": 50.7,
        "games": 4831
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.7,
        "games": 4831
      },
      {
        "name": "Meowscarada",
        "winRate": 50.7,
        "games": 4831
      },
      {
        "name": "Umbreon",
        "winRate": 47.2,
        "games": 4739
      },
      {
        "name": "Paldean Tauros",
        "winRate": 47.2,
        "games": 4739
      }
    ],
    "bestSets": []
  }
};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = [
  {
    "pokemon1": "Wyrdeer",
    "pokemon2": "Sneasler",
    "winRate": 75.4,
    "games": 3259
  },
  {
    "pokemon1": "Hatterene",
    "pokemon2": "Sneasler",
    "winRate": 75.4,
    "games": 3259
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Sneasler",
    "winRate": 75.4,
    "games": 3259
  },
  {
    "pokemon1": "Hatterene",
    "pokemon2": "Wyrdeer",
    "winRate": 75.4,
    "games": 3259
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Wyrdeer",
    "winRate": 75.4,
    "games": 3259
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Wyrdeer",
    "winRate": 75.4,
    "games": 3259
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Torkoal",
    "winRate": 75.4,
    "games": 3259
  },
  {
    "pokemon1": "Vanilluxe",
    "pokemon2": "Sneasler",
    "winRate": 74.1,
    "games": 3348
  },
  {
    "pokemon1": "Vanilluxe",
    "pokemon2": "Tatsugiri",
    "winRate": 74.1,
    "games": 3348
  },
  {
    "pokemon1": "Feraligatr",
    "pokemon2": "Sneasler",
    "winRate": 74.1,
    "games": 3348
  },
  {
    "pokemon1": "Feraligatr",
    "pokemon2": "Garchomp",
    "winRate": 74.1,
    "games": 3348
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Sneasler",
    "winRate": 74.1,
    "games": 3348
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Tatsugiri",
    "winRate": 74.1,
    "games": 3348
  },
  {
    "pokemon1": "Krookodile",
    "pokemon2": "Primarina",
    "winRate": 72.3,
    "games": 3305
  },
  {
    "pokemon1": "Froslass",
    "pokemon2": "Primarina",
    "winRate": 72.3,
    "games": 3305
  },
  {
    "pokemon1": "Froslass",
    "pokemon2": "Sneasler",
    "winRate": 72.3,
    "games": 3305
  },
  {
    "pokemon1": "Sneasler",
    "pokemon2": "Kingambit",
    "winRate": 71.9,
    "games": 6713
  },
  {
    "pokemon1": "Krookodile",
    "pokemon2": "Mega Charizard Y",
    "winRate": 69,
    "games": 3572
  },
  {
    "pokemon1": "Mega Charizard Y",
    "pokemon2": "Hydreigon",
    "winRate": 69,
    "games": 3572
  },
  {
    "pokemon1": "Tyranitar",
    "pokemon2": "Slowbro",
    "winRate": 68.9,
    "games": 7024
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Dragapult",
    "winRate": 68.7,
    "games": 3454
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Sneasler",
    "winRate": 68.7,
    "games": 3454
  },
  {
    "pokemon1": "Mega Gardevoir",
    "pokemon2": "Sneasler",
    "winRate": 68.7,
    "games": 3454
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Slowbro",
    "winRate": 68.4,
    "games": 6991
  },
  {
    "pokemon1": "Mega Pinsir",
    "pokemon2": "Rhyperior",
    "winRate": 67.9,
    "games": 3591
  },
  {
    "pokemon1": "Mega Pinsir",
    "pokemon2": "Luxray",
    "winRate": 67.9,
    "games": 3591
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Kingambit",
    "winRate": 67.7,
    "games": 10838
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Rhyperior",
    "winRate": 67.7,
    "games": 10838
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Luxray",
    "winRate": 67.7,
    "games": 10838
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Drampa",
    "winRate": 67.7,
    "games": 10840
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Pinsir",
    "winRate": 67.6,
    "games": 7247
  },
  {
    "pokemon1": "Pinsir",
    "pokemon2": "Kingambit",
    "winRate": 67.6,
    "games": 7247
  },
  {
    "pokemon1": "Pinsir",
    "pokemon2": "Rhyperior",
    "winRate": 67.6,
    "games": 7247
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Pinsir",
    "winRate": 67.6,
    "games": 7247
  },
  {
    "pokemon1": "Pinsir",
    "pokemon2": "Luxray",
    "winRate": 67.6,
    "games": 7247
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Drampa",
    "winRate": 66.5,
    "games": 14720
  },
  {
    "pokemon1": "Tyranitar",
    "pokemon2": "Torkoal",
    "winRate": 66.5,
    "games": 14720
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Torkoal",
    "winRate": 66.3,
    "games": 14687
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Archaludon",
    "winRate": 66.2,
    "games": 14849
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Mega Pinsir",
    "winRate": 64.8,
    "games": 7602
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Hatterene",
    "winRate": 64.4,
    "games": 7696
  },
  {
    "pokemon1": "Tyranitar",
    "pokemon2": "Drampa",
    "winRate": 63.5,
    "games": 19495
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Primarina",
    "winRate": 62.8,
    "games": 11668
  },
  {
    "pokemon1": "Rhyperior",
    "pokemon2": "Slowbro",
    "winRate": 62.3,
    "games": 3847
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Mega Kangaskhan",
    "winRate": 62.2,
    "games": 3884
  },
  {
    "pokemon1": "Mega Kangaskhan",
    "pokemon2": "Gliscor",
    "winRate": 62.2,
    "games": 3884
  },
  {
    "pokemon1": "Mega Kangaskhan",
    "pokemon2": "Primarina",
    "winRate": 62.2,
    "games": 3884
  },
  {
    "pokemon1": "Mega Kangaskhan",
    "pokemon2": "Venusaur",
    "winRate": 62.2,
    "games": 3884
  },
  {
    "pokemon1": "Mega Pinsir",
    "pokemon2": "Empoleon",
    "winRate": 62,
    "games": 4011
  },
  {
    "pokemon1": "Mega Pinsir",
    "pokemon2": "Stunfisk",
    "winRate": 62,
    "games": 4011
  }
];

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = [
  {
    "name": "custom",
    "elo": 54916,
    "winRate": 51.2,
    "wins": 147220,
    "losses": 140543
  },
  {
    "name": "Sun Trick Room",
    "elo": 48596,
    "winRate": 53.7,
    "wins": 42965,
    "losses": 37078
  },
  {
    "name": "Slowbro Trick Room",
    "elo": 30324,
    "winRate": 66.6,
    "wins": 7237,
    "losses": 3634
  },
  {
    "name": "Sun",
    "elo": 26292,
    "winRate": 54.2,
    "wins": 20123,
    "losses": 17024
  },
  {
    "name": "Pinsir Base",
    "elo": 21924,
    "winRate": 67.6,
    "wins": 4900,
    "losses": 2347
  },
  {
    "name": "Mega Pinsir",
    "elo": 19348,
    "winRate": 58.8,
    "wins": 7427,
    "losses": 5196
  },
  {
    "name": "Hard Trick Room",
    "elo": 19212,
    "winRate": 64.4,
    "wins": 4955,
    "losses": 2741
  },
  {
    "name": "Rain",
    "elo": 16724,
    "winRate": 50.8,
    "wins": 61207,
    "losses": 59304
  },
  {
    "name": "Mega Scovillain",
    "elo": 16020,
    "winRate": 57,
    "wins": 7412,
    "losses": 5597
  },
  {
    "name": "Mega Blastoise",
    "elo": 15228,
    "winRate": 56.4,
    "wins": 7551,
    "losses": 5835
  },
  {
    "name": "Vanilluxe Build",
    "elo": 14628,
    "winRate": 56.1,
    "wins": 7511,
    "losses": 5870
  },
  {
    "name": "Mega Froslass",
    "elo": 12908,
    "winRate": 55.2,
    "wins": 7506,
    "losses": 6080
  },
  {
    "name": "Mega Kangaskhan",
    "elo": 12572,
    "winRate": 50.5,
    "wins": 67790,
    "losses": 66406
  },
  {
    "name": "Mega Charizard",
    "elo": 11764,
    "winRate": 52.2,
    "wins": 15050,
    "losses": 13767
  },
  {
    "name": "Mega Garchomp",
    "elo": 10820,
    "winRate": 52.1,
    "wins": 14765,
    "losses": 13600
  },
  {
    "name": "Clawitzer Build",
    "elo": 8780,
    "winRate": 53.3,
    "wins": 7417,
    "losses": 6507
  },
  {
    "name": "Mega Venusaur",
    "elo": 8292,
    "winRate": 53,
    "wins": 7536,
    "losses": 6687
  },
  {
    "name": "Heracross Base",
    "elo": 8028,
    "winRate": 54.3,
    "wins": 5142,
    "losses": 4326
  },
  {
    "name": "Trick Room Sun",
    "elo": 8012,
    "winRate": 54.4,
    "wins": 5073,
    "losses": 4259
  },
  {
    "name": "Clefable Base",
    "elo": 7460,
    "winRate": 54,
    "wins": 5082,
    "losses": 4337
  },
  {
    "name": "Mega Clefable",
    "elo": 7060,
    "winRate": 52.4,
    "wins": 7568,
    "losses": 6873
  },
  {
    "name": "Mega Gyarados",
    "elo": 6972,
    "winRate": 52.3,
    "wins": 7650,
    "losses": 6966
  },
  {
    "name": "Blastoise Base",
    "elo": 6796,
    "winRate": 53.5,
    "wins": 5059,
    "losses": 4397
  },
  {
    "name": "Bulky Balance",
    "elo": 6500,
    "winRate": 52.1,
    "wins": 7606,
    "losses": 6981
  },
  {
    "name": "Mega Heracross",
    "elo": 6396,
    "winRate": 52.1,
    "wins": 7475,
    "losses": 6863
  },
  {
    "name": "Kleavor Build",
    "elo": 6332,
    "winRate": 53.1,
    "wins": 5139,
    "losses": 4535
  },
  {
    "name": "Mega Gardevoir",
    "elo": 5740,
    "winRate": 50.6,
    "wins": 22136,
    "losses": 21606
  },
  {
    "name": "Mega Slowbro",
    "elo": 5324,
    "winRate": 51.6,
    "wins": 7641,
    "losses": 7163
  },
  {
    "name": "Mega Aerodactyl",
    "elo": 5036,
    "winRate": 51.5,
    "wins": 7470,
    "losses": 7028
  },
  {
    "name": "Sun TR",
    "elo": 4812,
    "winRate": 54.6,
    "wins": 2472,
    "losses": 2058
  },
  {
    "name": "Delphox Base",
    "elo": 4788,
    "winRate": 52.1,
    "wins": 5047,
    "losses": 4636
  },
  {
    "name": "Semi Trick Room",
    "elo": 4676,
    "winRate": 51.4,
    "wins": 7493,
    "losses": 7096
  },
  {
    "name": "Frost Rotom Build",
    "elo": 4540,
    "winRate": 51.3,
    "wins": 7344,
    "losses": 6964
  },
  {
    "name": "Mega Floette",
    "elo": 4316,
    "winRate": 51.2,
    "wins": 7474,
    "losses": 7122
  },
  {
    "name": "Toxicroak Build",
    "elo": 4268,
    "winRate": 51.8,
    "wins": 4943,
    "losses": 4597
  },
  {
    "name": "Mega Metagross",
    "elo": 4068,
    "winRate": 50.2,
    "wins": 43614,
    "losses": 43293
  },
  {
    "name": "Incineroar Balance",
    "elo": 3812,
    "winRate": 51,
    "wins": 7661,
    "losses": 7372
  },
  {
    "name": "Typhlosion Build",
    "elo": 3692,
    "winRate": 50.9,
    "wins": 7425,
    "losses": 7151
  },
  {
    "name": "Mega Sharpedo",
    "elo": 3660,
    "winRate": 50.9,
    "wins": 7692,
    "losses": 7422
  },
  {
    "name": "Charizard Base",
    "elo": 3276,
    "winRate": 51.2,
    "wins": 4896,
    "losses": 4674
  },
  {
    "name": "Vivillon Build",
    "elo": 3220,
    "winRate": 50.8,
    "wins": 7222,
    "losses": 7007
  },
  {
    "name": "Slurpuff Build",
    "elo": 3092,
    "winRate": 50.7,
    "wins": 7434,
    "losses": 7235
  },
  {
    "name": "Mega Lucario",
    "elo": 2964,
    "winRate": 50.3,
    "wins": 15059,
    "losses": 14876
  },
  {
    "name": "Emboar Base",
    "elo": 2916,
    "winRate": 50.9,
    "wins": 5152,
    "losses": 4975
  },
  {
    "name": "Pivot Chain",
    "elo": 2876,
    "winRate": 51.7,
    "wins": 2601,
    "losses": 2429
  },
  {
    "name": "Bulky Offense",
    "elo": 2868,
    "winRate": 50.3,
    "wins": 12417,
    "losses": 12246
  },
  {
    "name": "Gyarados Base",
    "elo": 2772,
    "winRate": 50.8,
    "wins": 4997,
    "losses": 4838
  },
  {
    "name": "Manectric Base",
    "elo": 2756,
    "winRate": 50.8,
    "wins": 5089,
    "losses": 4932
  },
  {
    "name": "Belly Drum",
    "elo": 2708,
    "winRate": 51.5,
    "wins": 2515,
    "losses": 2364
  },
  {
    "name": "Espathra Build",
    "elo": 2708,
    "winRate": 50.8,
    "wins": 4945,
    "losses": 4794
  }
];

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = [
  {
    "name": "Dire Claw",
    "winRate": 55.6,
    "appearances": 69679
  },
  {
    "name": "Endure",
    "winRate": 55,
    "appearances": 9190
  },
  {
    "name": "Eruption",
    "winRate": 54.2,
    "appearances": 217891
  },
  {
    "name": "Amnesia",
    "winRate": 53.7,
    "appearances": 4708
  },
  {
    "name": "Instruct",
    "winRate": 53.5,
    "appearances": 28154
  },
  {
    "name": "Electro Shot",
    "winRate": 53.4,
    "appearances": 318115
  },
  {
    "name": "Discharge",
    "winRate": 53.2,
    "appearances": 28545
  },
  {
    "name": "Brick Break",
    "winRate": 53,
    "appearances": 372520
  },
  {
    "name": "X-Scissor",
    "winRate": 52.5,
    "appearances": 61446
  },
  {
    "name": "Quick Attack",
    "winRate": 52.5,
    "appearances": 46613
  },
  {
    "name": "Leech Seed",
    "winRate": 52.2,
    "appearances": 32356
  },
  {
    "name": "Water Pulse",
    "winRate": 52.2,
    "appearances": 67392
  },
  {
    "name": "Earth Power",
    "winRate": 52.1,
    "appearances": 618039
  },
  {
    "name": "Belly Drum",
    "winRate": 52,
    "appearances": 100630
  },
  {
    "name": "Curse",
    "winRate": 51.8,
    "appearances": 88221
  },
  {
    "name": "Taunt",
    "winRate": 51.7,
    "appearances": 38125
  },
  {
    "name": "Stone Axe",
    "winRate": 51.7,
    "appearances": 14758
  },
  {
    "name": "Flash Cannon",
    "winRate": 51.6,
    "appearances": 882445
  },
  {
    "name": "Low Kick",
    "winRate": 51.5,
    "appearances": 73070
  },
  {
    "name": "Energy Ball",
    "winRate": 51.5,
    "appearances": 131649
  },
  {
    "name": "High Horsepower",
    "winRate": 51.5,
    "appearances": 112865
  },
  {
    "name": "Pin Missile",
    "winRate": 51.5,
    "appearances": 19394
  },
  {
    "name": "Freeze-Dry",
    "winRate": 51.4,
    "appearances": 52781
  },
  {
    "name": "Heat Wave",
    "winRate": 51.4,
    "appearances": 622442
  },
  {
    "name": "Mystical Fire",
    "winRate": 51.4,
    "appearances": 28977
  },
  {
    "name": "Leaf Storm",
    "winRate": 51.3,
    "appearances": 355741
  },
  {
    "name": "Sleep Powder",
    "winRate": 51.2,
    "appearances": 28180
  },
  {
    "name": "Coil",
    "winRate": 51.2,
    "appearances": 29098
  },
  {
    "name": "Grass Knot",
    "winRate": 51.2,
    "appearances": 14792
  },
  {
    "name": "Aura Sphere",
    "winRate": 51.1,
    "appearances": 141920
  },
  {
    "name": "Aqua Jet",
    "winRate": 51,
    "appearances": 129626
  },
  {
    "name": "Muddy Water",
    "winRate": 51,
    "appearances": 127017
  },
  {
    "name": "Dual Wingbeat",
    "winRate": 51,
    "appearances": 29125
  },
  {
    "name": "Ice Beam",
    "winRate": 50.8,
    "appearances": 664359
  },
  {
    "name": "Kowtow Cleave",
    "winRate": 50.8,
    "appearances": 730853
  },
  {
    "name": "Psychic Fangs",
    "winRate": 50.8,
    "appearances": 5089
  },
  {
    "name": "Grassy Terrain",
    "winRate": 50.8,
    "appearances": 4860
  },
  {
    "name": "Ice Punch",
    "winRate": 50.7,
    "appearances": 1139701
  },
  {
    "name": "Trick Room",
    "winRate": 50.7,
    "appearances": 1172413
  },
  {
    "name": "Draco Meteor",
    "winRate": 50.7,
    "appearances": 524050
  },
  {
    "name": "Fire Punch",
    "winRate": 50.7,
    "appearances": 34375
  },
  {
    "name": "Headlong Rush",
    "winRate": 50.7,
    "appearances": 9891
  },
  {
    "name": "Hydro Pump",
    "winRate": 50.6,
    "appearances": 356078
  },
  {
    "name": "Psychic",
    "winRate": 50.6,
    "appearances": 1318586
  },
  {
    "name": "Surf",
    "winRate": 50.6,
    "appearances": 343678
  },
  {
    "name": "Dazzling Gleam",
    "winRate": 50.6,
    "appearances": 725917
  },
  {
    "name": "Facade",
    "winRate": 50.6,
    "appearances": 69814
  },
  {
    "name": "Overheat",
    "winRate": 50.5,
    "appearances": 378606
  },
  {
    "name": "Spirit Shackle",
    "winRate": 50.5,
    "appearances": 101943
  },
  {
    "name": "Megahorn",
    "winRate": 50.5,
    "appearances": 27203
  }
];

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = {
  "tier1": [
    "Arbok",
    "Farigiraf",
    "Vanilluxe",
    "Archaludon",
    "Slowbro",
    "Sneasler",
    "Conkeldurr",
    "Paldean Tauros (Blaze)",
    "Mega Kangaskhan",
    "Sylveon",
    "Azumarill",
    "Tatsugiri",
    "Mega Heracross",
    "Pinsir",
    "Luxray",
    "Ursaluna",
    "Mega Scovillain",
    "Hippowdon",
    "Heliolisk",
    "Wash Rotom",
    "Dondozo",
    "Leafeon"
  ],
  "tier2": [
    "Mega Gardevoir",
    "Incineroar",
    "Mega Blastoise",
    "Cofagrigus",
    "Excadrill",
    "Ninetales",
    "Armarouge",
    "Alolan Raichu",
    "Crabominable",
    "Paldean Tauros (Aqua)",
    "Milotic",
    "Raichu",
    "Hydreigon",
    "Primarina",
    "Alakazam",
    "Mega Metagross",
    "Mega Audino",
    "Gardevoir",
    "Slurpuff",
    "Mega Charizard Y",
    "Forretress",
    "Garganacl",
    "Rhyperior",
    "Mega Floette",
    "Mega Sharpedo",
    "Greninja",
    "Garchomp",
    "Mega Scizor",
    "Corviknight",
    "Hawlucha",
    "Golurk",
    "Mudsdale",
    "Goodra",
    "Pikachu",
    "Sandaconda",
    "Glaceon",
    "Politoed",
    "Mega Froslass",
    "Charizard",
    "Weavile",
    "Aromatisse",
    "Hisuian Goodra",
    "Tyranitar",
    "Hisuian Decidueye",
    "Skarmory",
    "Mamoswine"
  ],
  "tier3": [
    "Mega Garchomp",
    "Mega Manectric",
    "Skeledirge",
    "Diggersby",
    "Krookodile",
    "Mega Tyranitar",
    "Slowking",
    "Talonflame",
    "Hisuian Samurott",
    "Mega Greninja",
    "Pelipper",
    "Aerodactyl",
    "Machamp",
    "Spiritomb",
    "Jolteon",
    "Toxapex",
    "Palafin",
    "Mega Gallade",
    "Metagross",
    "Mega Excadrill",
    "Feraligatr",
    "Paldean Tauros",
    "Aegislash",
    "Starmie",
    "Grimmsnarl",
    "Mega Chesnaught",
    "Mega Steelix",
    "Clawitzer",
    "Kingambit",
    "Mega Gyarados",
    "Mega Beedrill",
    "Scovillain",
    "Emboar",
    "Mega Glimmora",
    "Dragapult",
    "Heracross",
    "Kleavor",
    "Arcanine",
    "Blastoise",
    "Mega Dragonite",
    "Hatterene",
    "Beartic",
    "Mega Emboar",
    "Morpeko",
    "Empoleon",
    "Mega Slowbro",
    "Mega Chimecho",
    "Gengar",
    "Salazzle",
    "Mega Altaria",
    "Reuniclus",
    "Clefable",
    "Kommo-o",
    "Emolga",
    "Venusaur",
    "Drampa",
    "Gliscor",
    "Mega Garchomp Z",
    "Mow Rotom",
    "Flareon",
    "Mega Venusaur",
    "Torkoal",
    "Mega Victreebel",
    "Victreebel",
    "Pidgeot",
    "Banette",
    "Infernape",
    "Mega Crabominable",
    "Mega Clefable",
    "Typhlosion",
    "Mega Pidgeot",
    "Mega Gengar",
    "Galarian Slowbro",
    "Simisear",
    "Samurott",
    "Rotom",
    "Mega Delphox",
    "Bellibolt",
    "Stunfisk",
    "Mega Medicham",
    "Mega Alakazam",
    "Mega Sableye"
  ],
  "dominantArchetypes": [
    "custom",
    "Sun Trick Room",
    "Slowbro Trick Room",
    "Sun",
    "Pinsir Base"
  ],
  "underratedPokemon": [],
  "overratedPokemon": [
    "Salazzle",
    "Banette",
    "Dedenne",
    "Rampardos",
    "Simipour"
  ],
  "bestCores": [
    "Wyrdeer + Sneasler",
    "Hatterene + Sneasler",
    "Torkoal + Sneasler",
    "Hatterene + Wyrdeer",
    "Azumarill + Wyrdeer"
  ]
};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = 2000000;

/** Simulation date */
export const SIM_DATE = "2026-04-09T13:59:04.043Z";

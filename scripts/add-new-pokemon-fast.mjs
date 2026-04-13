#!/usr/bin/env node
/**
 * Add 37 new Pokémon — fast version with parallel fetching and move reuse.
 * Run: node scripts/add-new-pokemon-fast.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'src', 'lib', 'pokemon-data.ts');
const CACHE_FILE = path.join(__dirname, 'move-data-cache.json');
const BASE = 'https://pokeapi.co/api/v2';

const NEW_IDS = [
  18, 24, 68, 168, 205, 308, 310, 319, 323, 354, 358, 362,
  405, 407, 409, 411, 454, 504, 510, 512, 514, 516, 563,
  579, 614, 671, 675, 683, 685, 695, 702, 713, 758, 766,
  841, 899, 939, 956
];

const TIER_MAP = {
  18:"C",24:"D",68:"B",168:"D",205:"C",308:"B",310:"B",319:"C",323:"C",354:"C",
  358:"C",362:"C",405:"C",407:"B",409:"C",411:"C",454:"C",504:"D",510:"D",
  512:"D",514:"D",516:"D",563:"C",579:"B",614:"D",671:"C",675:"C",683:"C",
  685:"D",695:"C",702:"D",713:"C",758:"C",766:"C",841:"C",899:"B",939:"C",956:"C"
};

const MEGA_DATA = {
  18: { name:"Mega Pidgeot",types:["normal","flying"],stats:{hp:83,attack:80,defense:80,spAtk:135,spDef:80,speed:121},ability:"No Guard",abilityDesc:"All moves used by or against always hit.",isChampions:false },
  308: { name:"Mega Medicham",types:["fighting","psychic"],stats:{hp:60,attack:100,defense:85,spAtk:80,spDef:85,speed:100},ability:"Pure Power",abilityDesc:"Doubles the Pokémon's Attack stat.",isChampions:false },
  310: { name:"Mega Manectric",types:["electric"],stats:{hp:70,attack:75,defense:80,spAtk:135,spDef:80,speed:135},ability:"Intimidate",abilityDesc:"Upon entering battle, lowers the opposing Pokémon's Attack stat.",isChampions:false },
  319: { name:"Mega Sharpedo",types:["water","dark"],stats:{hp:70,attack:140,defense:70,spAtk:110,spDef:65,speed:105},ability:"Strong Jaw",abilityDesc:"The Pokémon's bite moves are powered up by 50%.",isChampions:false },
  323: { name:"Mega Camerupt",types:["fire","ground"],stats:{hp:70,attack:120,defense:100,spAtk:145,spDef:105,speed:20},ability:"Sheer Force",abilityDesc:"Moves with secondary effects have 1.3× power but lose their secondary effects.",isChampions:false },
  354: { name:"Mega Banette",types:["ghost"],stats:{hp:64,attack:165,defense:75,spAtk:93,spDef:83,speed:75},ability:"Prankster",abilityDesc:"Status moves gain +1 priority.",isChampions:false },
  358: { name:"Mega Chimecho",types:["psychic","steel"],stats:{hp:75,attack:50,defense:110,spAtk:135,spDef:120,speed:65},ability:"Levitate",abilityDesc:"Gives immunity to Ground-type moves.",isChampions:false },
  362: { name:"Mega Glalie",types:["ice"],stats:{hp:80,attack:120,defense:80,spAtk:120,spDef:80,speed:100},ability:"Refrigerate",abilityDesc:"Normal-type moves become Ice-type and gain a 20% power boost.",isChampions:false },
};

const HOME_SOURCES = {
  18:["Scarlet/Violet","Legends Z-A","BDSP","Pokémon GO","Let's Go"],
  24:["Legends Z-A","BDSP","Pokémon GO","Let's Go"],
  68:["Scarlet/Violet","Legends Z-A","Sword/Shield","BDSP","Pokémon GO","Let's Go"],
  168:["Scarlet/Violet","Legends Z-A","BDSP","Pokémon GO"],
  205:["Scarlet/Violet","Legends Z-A","Sword/Shield","BDSP","Pokémon GO"],
  308:["Scarlet/Violet","Legends Z-A","BDSP","Pokémon GO"],
  310:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  319:["Scarlet/Violet","Legends Z-A","Pokémon GO"],
  323:["Scarlet/Violet","Legends Z-A","Pokémon GO"],
  354:["Scarlet/Violet","Legends Z-A","Pokémon GO"],
  358:["Scarlet/Violet","Legends Z-A","Pokémon GO"],
  362:["Scarlet/Violet","Legends Z-A","BDSP","Pokémon GO"],
  405:["Scarlet/Violet","Legends Z-A","BDSP","Pokémon GO"],
  407:["Scarlet/Violet","Legends Z-A","Sword/Shield","BDSP","Pokémon GO"],
  409:["Scarlet/Violet","Legends Z-A","BDSP","Pokémon GO"],
  411:["Scarlet/Violet","Legends Z-A","BDSP","Pokémon GO"],
  454:["Scarlet/Violet","Legends Z-A","Sword/Shield","BDSP","Pokémon GO"],
  504:["Legends Z-A","Pokémon GO"],510:["Legends Z-A","Pokémon GO"],
  512:["Legends Z-A","Pokémon GO"],514:["Legends Z-A","Pokémon GO"],516:["Legends Z-A","Pokémon GO"],
  563:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  579:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  614:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  671:["Scarlet/Violet","Legends Z-A","Pokémon GO"],
  675:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  683:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  685:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  695:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  702:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  713:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  758:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  766:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  841:["Scarlet/Violet","Legends Z-A","Sword/Shield","Pokémon GO"],
  899:["Scarlet/Violet","Legends Z-A","Legends: Arceus","Pokémon GO"],
  939:["Scarlet/Violet","Legends Z-A","Pokémon GO"],
  956:["Scarlet/Violet","Legends Z-A","Pokémon GO"],
};

// --- Utility ---
function prettifyName(raw) {
  const special = {"kommo-o":"Kommo-o","mr-mime":"Mr. Mime","ho-oh":"Ho-Oh"};
  if (special[raw]) return special[raw];
  return raw.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}
function romanToInt(s) {
  const m = {i:1,v:5,x:10}; let r=0;
  for(let i=0;i<s.length;i++){const c=m[s[i]]||0,n=m[s[i+1]]||0;r+=c<n?-c:c;}
  return r;
}

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} → ${r.status}`);
  return r.json();
}

// Parallel fetch with concurrency limit
async function fetchParallel(urls, concurrency = 8) {
  const results = new Array(urls.length);
  let idx = 0;
  async function worker() {
    while (idx < urls.length) {
      const i = idx++;
      try { results[i] = await fetchJSON(urls[i]); }
      catch (e) { results[i] = null; }
    }
  }
  await Promise.all(Array.from({length: Math.min(concurrency, urls.length)}, () => worker()));
  return results;
}

async function main() {
  console.log(`\n📋 Adding ${NEW_IDS.length} Pokémon\n`);

  // 1. Load move cache and build global move name → data map
  let moveCache = {};
  try { moveCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); } catch {}
  
  const knownMoves = new Map(); // move name → move data
  for (const [id, moves] of Object.entries(moveCache)) {
    for (const m of moves) {
      knownMoves.set(m.name, m);
    }
  }
  console.log(`📦 ${knownMoves.size} unique moves from cache\n`);

  // 2. Fetch all Pokémon base data in parallel
  console.log('🔍 Fetching Pokémon base data...');
  const pokemonUrls = NEW_IDS.map(id => `${BASE}/pokemon/${id}`);
  const pokemonData = await fetchParallel(pokemonUrls, 10);
  
  const speciesUrls = pokemonData.map(d => d ? d.species.url : null).filter(Boolean);
  const speciesData = await fetchParallel(speciesUrls, 10);
  const speciesMap = {};
  speciesData.forEach(s => { if (s) speciesMap[s.id] = s; });
  
  console.log(`✅ Fetched ${pokemonData.filter(Boolean).length} Pokémon\n`);

  // 3. Collect all unique moves we need but don't have
  const needMoves = new Set(); // move URL → name
  const moveUrlMap = new Map(); // URL → pretty name
  
  for (const pd of pokemonData) {
    if (!pd) continue;
    const id = pd.id;
    if (moveCache[id]) continue; // Already have moves for this Pokémon
    
    for (const m of pd.moves) {
      const hasRelevant = m.version_group_details.some(d =>
        ['level-up','machine','tutor','egg'].includes(d.move_learn_method.name)
      );
      if (!hasRelevant) continue;
      
      const prettyName = m.move.name.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
      if (!knownMoves.has(prettyName)) {
        needMoves.add(m.move.url);
        moveUrlMap.set(m.move.url, prettyName);
      }
    }
  }

  console.log(`🔍 Need to fetch ${needMoves.size} unique move details...`);
  
  // 4. Batch fetch all unknown moves
  const moveUrls = [...needMoves];
  const batchSize = 50;
  let fetched = 0;
  
  for (let i = 0; i < moveUrls.length; i += batchSize) {
    const batch = moveUrls.slice(i, i + batchSize);
    const results = await fetchParallel(batch, 10);
    
    for (let j = 0; j < results.length; j++) {
      const md = results[j];
      if (!md) continue;
      const enEntry = md.flavor_text_entries?.find(e => e.language.name === 'en');
      const detail = {
        name: md.name.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" "),
        type: md.type.name,
        category: md.damage_class?.name === 'physical' ? 'physical' : md.damage_class?.name === 'special' ? 'special' : 'status',
        power: md.power ?? null,
        accuracy: md.accuracy ?? null,
        pp: md.pp,
        description: enEntry ? enEntry.flavor_text.replace(/[\n\f]/g, ' ').replace(/\s+/g, ' ').trim() : '',
      };
      knownMoves.set(detail.name, detail);
      fetched++;
    }
    
    process.stdout.write(`  ${Math.min(i + batchSize, moveUrls.length)}/${moveUrls.length} fetched\r`);
  }
  console.log(`\n✅ Fetched ${fetched} new move details\n`);

  // 5. Fetch ability descriptions in parallel
  console.log('🔍 Fetching ability descriptions...');
  const allAbilities = new Map();
  for (const pd of pokemonData) {
    if (!pd) continue;
    for (const a of pd.abilities) {
      allAbilities.set(a.ability.name, a.ability.url);
    }
  }
  const abilityUrls = [...allAbilities.values()];
  const abilityResults = await fetchParallel(abilityUrls, 10);
  const abilityDescMap = {};
  for (const ad of abilityResults) {
    if (!ad) continue;
    const en = ad.flavor_text_entries?.find(e => e.language.name === 'en');
    if (en) {
      const name = ad.name.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
      abilityDescMap[name] = en.flavor_text.replace(/[\n\f]/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }
  console.log(`✅ Got ${Object.keys(abilityDescMap).length} ability descriptions\n`);

  // 6. Build Pokémon entries
  console.log('🔨 Building entries...');
  const entries = [];
  
  for (let idx = 0; idx < NEW_IDS.length; idx++) {
    const id = NEW_IDS[idx];
    const pd = pokemonData[idx];
    if (!pd) { console.log(`  ⚠️  #${id} — no data`); continue; }
    
    const sp = speciesMap[id];
    const genStr = sp?.generation?.url?.split('/').filter(Boolean).pop() || 'generation-i';
    const gen = romanToInt(genStr.replace('generation-', ''));
    
    const types = pd.types.sort((a,b)=>a.slot-b.slot).map(t=>t.type.name);
    
    const stats = {};
    for (const s of pd.stats) {
      switch(s.stat.name) {
        case 'hp': stats.hp=s.base_stat; break;
        case 'attack': stats.attack=s.base_stat; break;
        case 'defense': stats.defense=s.base_stat; break;
        case 'special-attack': stats.spAtk=s.base_stat; break;
        case 'special-defense': stats.spDef=s.base_stat; break;
        case 'speed': stats.speed=s.base_stat; break;
      }
    }
    
    const abilities = pd.abilities.sort((a,b)=>a.slot-b.slot).map(a => {
      const name = prettifyName(a.ability.name);
      return { name, description: abilityDescMap[name] || '', isHidden: a.is_hidden };
    });
    
    // Get moves — from cache or build from global map
    let moves;
    if (moveCache[id]) {
      moves = moveCache[id].map(m => ({ accuracy: null, ...m }));
    } else {
      moves = [];
      const seen = new Set();
      for (const m of pd.moves) {
        const hasRelevant = m.version_group_details.some(d =>
          ['level-up','machine','tutor','egg'].includes(d.move_learn_method.name)
        );
        if (!hasRelevant) continue;
        const prettyName = m.move.name.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
        if (seen.has(prettyName)) continue;
        seen.add(prettyName);
        const detail = knownMoves.get(prettyName);
        if (detail) moves.push({ accuracy: null, ...detail });
      }
      // Sort: damaging by power desc, then status
      moves.sort((a,b) => {
        const as = a.category==='status'?1:0, bs = b.category==='status'?1:0;
        if (as !== bs) return as - bs;
        if (!as && !bs) return (b.power||0) - (a.power||0);
        return 0;
      });
      // Update cache
      moveCache[id] = moves;
    }
    
    const forms = [];
    const mega = MEGA_DATA[id];
    if (mega) {
      forms.push({
        name: mega.name,
        sprite: `/sprites/oa-10${id}.png`,
        types: mega.types,
        baseStats: mega.stats,
        abilities: [{ name: mega.ability, description: mega.abilityDesc, isChampions: mega.isChampions }],
        isMega: true,
      });
    }
    
    const entry = {
      id, name: prettifyName(pd.name), dexNumber: id, types,
      baseStats: stats, abilities, moves,
      sprite: `/sprites/${id}.png`, officialArt: `/sprites/${id}.png`,
      generation: gen, forms, hasMega: forms.length > 0,
      recruitmentCost: null, homeCompatible: true,
      homeSource: HOME_SOURCES[id] || ["Scarlet/Violet","Legends Z-A","Pokémon GO"],
      season: 1, tier: TIER_MAP[id] || "C", usageRate: null,
    };
    
    entries.push(entry);
    console.log(`  ✅ #${id} ${entry.name} — ${moves.length} moves${entry.hasMega ? ' (mega)' : ''}`);
  }

  // 7. Save move cache
  fs.writeFileSync(CACHE_FILE, JSON.stringify(moveCache, null, 2), 'utf8');
  console.log(`\n💾 Saved move cache\n`);

  // 8. Insert into pokemon-data.ts
  console.log('📝 Inserting into pokemon-data.ts...');
  let src = fs.readFileSync(DATA_FILE, 'utf8');
  
  // Process in reverse dex order so insertion indices stay valid
  const sorted = entries.sort((a,b) => b.dexNumber - a.dexNumber);
  let inserted = 0;
  
  for (const mon of sorted) {
    const dex = mon.dexNumber;
    const entryJSON = JSON.stringify(mon, null, 2)
      .split('\n').map(line => '  ' + line).join('\n');
    
    // Find insertion point: before the first entry with id > dex
    const regex = /\n  \{\n    "id": (\d+),/g;
    let match;
    let insertIdx = -1;
    let lastId = -1;
    
    while ((match = regex.exec(src)) !== null) {
      const eid = parseInt(match[1]);
      if (eid > dex && lastId < dex) {
        insertIdx = match.index;
        break;
      }
      lastId = eid;
    }
    
    if (insertIdx === -1 && lastId < dex) {
      insertIdx = src.lastIndexOf('\n];');
    }
    
    if (insertIdx === -1) {
      console.log(`  ⚠️  No insertion point for #${dex}`);
      continue;
    }
    
    src = src.slice(0, insertIdx) + '\n' + entryJSON + ',' + src.slice(insertIdx);
    inserted++;
  }
  
  fs.writeFileSync(DATA_FILE, src, 'utf8');
  console.log(`\n✅ Done! Inserted ${inserted}/${entries.length} Pokémon`);

  // Fix any move entries missing accuracy (from old script runs)
  let fixCount = 0;
  src = src.replace(
    /\{"name":"([^"]+)","type":"[^"]+","category":"[^"]+","power":(null|\d+),"pp":/g,
    (match, moveName) => {
      const known = knownMoves.get(moveName);
      const acc = known && 'accuracy' in known ? JSON.stringify(known.accuracy) : 'null';
      fixCount++;
      return match.replace(',"pp":', `,"accuracy":${acc},"pp":`);
    }
  );
  if (fixCount > 0) {
    fs.writeFileSync(DATA_FILE, src, 'utf8');
    console.log(`🔧 Fixed ${fixCount} move entries missing accuracy`);
  }
}

main().catch(console.error);

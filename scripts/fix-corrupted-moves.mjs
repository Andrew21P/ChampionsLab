import fs from 'fs';

let src = fs.readFileSync('src/lib/pokemon-data.ts', 'utf8');

// Fix {16,"description"...} corruptions (pp changes)
const ppFixes = [
  {
    desc: `The user slams the target with its steel-hard head. This may also make the target flinch.`,
    name: "Iron Head", type: "steel", cat: "physical", power: 80, acc: 100
  },
  {
    desc: `The foe slams the target with its steel-hard head. It may also make the target flinch.`,
    name: "Iron Head", type: "steel", cat: "physical", power: 80, acc: 100
  },
  {
    desc: `Has a 20% chance of making the target flinch.`,
    name: "Iron Head", type: "steel", cat: "physical", power: 80, acc: 100
  },
  {
    desc: `Borrowing the power of the moon, the user attacks the target. This may also lower the target's Sp. Atk stat.`,
    name: "Moonblast", type: "fairy", cat: "special", power: 95, acc: 100
  },
  {
    desc: `Borrowing the power of the moon, the user attacks the target. This may also lower the target\u2019s Sp. Atk stat.`,
    name: "Moonblast", type: "fairy", cat: "special", power: 95, acc: 100
  },
  {
    desc: `The user snares the target in a snap trap for four to five turns.`,
    name: "Snap Trap", type: "grass", cat: "physical", power: 35, acc: 100
  },
  {
    desc: `The user lashes out at the target with ruinous claws. This may also leave the target poisoned, paralyzed, or asleep.`,
    name: "Dire Claw", type: "poison", cat: "physical", power: 80, acc: 100
  }
];

let total = 0;
for (const f of ppFixes) {
  const broken = `{16,"description":"${f.desc}"}`;
  const fixed = `{"name":"${f.name}","type":"${f.type}","category":"${f.cat}","power":${f.power},"accuracy":${f.acc},"pp":16,"description":"${f.desc}"}`;
  const count = src.split(broken).length - 1;
  if (count > 0) {
    src = src.split(broken).join(fixed);
    console.log(`Fixed pp ${count}x: ${f.name}`);
    total += count;
  }
}

// Fix {power,"accuracy"...} corruptions (power changes that mangled name/type/category/power)
// Use line-by-line approach to handle smart quotes and other encoding differences
const lines = src.split('\n');
let powerFixed = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^(\s+)\{(\d+),"(accuracy|pp|description)"/);
  if (!m) continue;
  
  const indent = m[1];
  const num = m[2];
  const nextKey = m[3];
  
  // Extract remaining JSON after the number
  const brokenStart = line.indexOf('{' + num);
  const rest = line.substring(brokenStart + 1 + num.length); // skip {NUM, get ,"accuracy"...} or ,"pp"... or ,"description"
  
  // Identify the move by description content
  let moveName, moveType, moveCat;
  if (line.includes('steel-hard head') || (line.includes('making the target flinch') && num === '16')) {
    moveName = 'Iron Head'; moveType = 'steel'; moveCat = 'physical';
  } else if (line.includes('power of the moon') || line.includes('Sp. Atk stat')) {
    moveName = 'Moonblast'; moveType = 'fairy'; moveCat = 'special';
  } else if (line.includes('snap trap')) {
    moveName = 'Snap Trap'; moveType = 'grass'; moveCat = 'physical';
  } else if (line.includes('ruinous claws') || line.includes('poisoned, paralyzed, or asleep')) {
    moveName = 'Dire Claw'; moveType = 'poison'; moveCat = 'physical';
  } else if (line.includes('first move used by the user after it enters a battle')) {
    moveName = 'First Impression'; moveType = 'bug'; moveCat = 'physical';
  } else if (line.includes('burning lash') || line.includes('Fire Lash')) {
    moveName = 'Fire Lash'; moveType = 'fire'; moveCat = 'physical';
  } else if (line.includes('dropping an apple')) {
    moveName = 'Grav Apple'; moveType = 'grass'; moveCat = 'physical';
  } else if (line.includes('psychic energy') && line.includes('defensive stats')) {
    moveName = 'Psyshield Bash'; moveType = 'psychic'; moveCat = 'physical';
  } else if (line.includes('myriad fireballs') || line.includes('Infernal')) {
    moveName = 'Infernal Parade'; moveType = 'ghost'; moveCat = 'special';
  } else if (line.includes('hard bone') || line.includes('two to five times')) {
    moveName = 'Bone Rush'; moveType = 'ground'; moveCat = 'physical';
  } else if (line.includes('pitch-black shock wave') || line.includes('Night Daze')) {
    moveName = 'Night Daze'; moveType = 'dark'; moveCat = 'special';
  } else if (line.includes('stitching') && line.includes('shadow')) {
    moveName = 'Spirit Shackle'; moveType = 'ghost'; moveCat = 'physical';
  } else if (line.includes('heats up its beak') || line.includes('Beak Blast')) {
    moveName = 'Beak Blast'; moveType = 'flying'; moveCat = 'physical';
  } else if (line.includes('acidic liquid') || line.includes('tart apples')) {
    moveName = 'Apple Acid'; moveType = 'grass'; moveCat = 'special';
  } else if (line.includes('large pincer') || line.includes('Critical-Hit Ratio')) {
    moveName = 'Crabhammer'; moveType = 'water'; moveCat = 'physical';
  } else {
    console.log(`UNKNOWN corruption at line ${i+1}: ${line.trim().substring(0, 80)}`);
    continue;
  }
  
  // Reconstruct: {"name":"X","type":"Y","category":"Z","power":NUM + rest}
  lines[i] = `${indent}{"name":"${moveName}","type":"${moveType}","category":"${moveCat}","power":${num}${rest}`;
  console.log(`Fixed power line ${i+1}: ${moveName} (power=${num})`);
  powerFixed++;
}

src = lines.join('\n');
total += powerFixed;

// Final check
const remaining1 = (src.match(/\{16,"description"/g) || []).length;
const remaining2 = (src.match(/^\s+\{\d+,"accuracy"/gm) || []).length;
console.log(`\nTotal fixed: ${total}`);
console.log(`Remaining {16,desc}: ${remaining1}`);
console.log(`Remaining {num,acc}: ${remaining2}`);

if (remaining1 === 0 && remaining2 === 0) {
  fs.writeFileSync('src/lib/pokemon-data.ts', src);
  console.log('File saved successfully.');
} else {
  console.log('WARNING: Still has corruptions!');
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    if (/^\s+\{\d+,"/.test(line)) {
      console.log(`  Line ${i+1}: ${line.trim().substring(0, 80)}`);
    }
  });
}

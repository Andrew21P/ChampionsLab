import fs from 'fs';

const FILE = 'src/lib/pokemon-data.ts';
let src = fs.readFileSync(FILE, 'utf8');

// Correct Serebii game text for all mega abilities
const corrections = {
  'Berserk': "Boosts the Pokémon's Sp. Atk stat when it takes a hit that causes its HP to become half or less.",
  'Trace': "When it enters a battle, the Pokémon copies an opposing Pokémon's Ability.",
  'Magic Bounce': 'Reflects most non-damaging moves back at their user.',
  'Innards Out': 'Damages the attacker landing the finishing hit by the amount equal to its last HP.',
  'Huge Power': "Doubles the Pokémon's Attack stat.",
  'Multiscale': 'Reduces damage taken when HP is full.',
  'Mega Sol': "Even when the sunlight has not turned harsh, the Pokémon can use its moves as if the weather were harsh sunlight.",
  'Dragonize': "The Pokémon's Normal-type moves become Dragon-type moves and their power is boosted by 20%.",
  'Stalwart': "Ignores the effects of opposing Pokémon's Abilities and moves that draw in moves.",
  'Levitate': 'By floating in the air, the Pokémon receives full immunity to all Ground-type moves.',
  'Snow Warning': 'The Pokémon makes it snow when it enters a battle.',
  'Mold Breaker': "Moves can be used on the target regardless of its Abilities.",
  'Piercing Drill': "When the Pokémon uses contact moves, it can hit even targets that are protecting themselves, dealing 1/4 of the damage that the move would otherwise deal.",
  'Infiltrator': "Passes through the opposing Pokémon's barrier, substitute, and the like and strikes.",
  'Unseen Fist': "The Pokémon can deal damage with moves that make physical contact, even if the target is protected.",
  'Bulletproof': 'Protects the Pokémon from some ball and bomb moves.',
  'Protean': "Changes the Pokémon's type to the type of the move it's about to use.",
  'Fairy Aura': "Powers up each Pokémon's Fairy-type moves.",
  'No Guard': 'Ensures that all moves used by and against the Pokémon land.',
  'Iron Fist': "Powers up punching moves.",
  'Spicy Spray': 'When the Pokémon takes damage from a move, it burns the attacker.',
  'Adaptability': 'Powers up moves of the same type as the Pokémon.',
  'Thick Fat': 'The Pokémon is protected by a layer of thick fat, which halves the damage taken from Fire- and Ice-type moves.',
  'Tough Claws': 'Powers up moves that make direct contact.',
  'Drought': 'Turns the sunlight harsh when the Pokémon enters a battle.',
  'Mega Launcher': 'Powers up pulse moves.',
  'Pure Power': "Doubles the Pokémon's Attack stat.",
  'Intimidate': "When the Pokémon enters a battle, it intimidates opposing Pokémon and makes them cower, lowering their Attack stats.",
  'Strong Jaw': "The Pokémon's strong jaw boosts the power of its biting moves.",
  'Sheer Force': 'Removes additional effects from moves but increases their power.',
  'Prankster': "Gives priority to the Pokémon's status moves.",
  'Refrigerate': "Normal-type moves become Ice-type moves. The power of those moves is boosted a little.",
  'Shell Armor': "A hard shell protects the Pokémon from critical hits.",
  'Shadow Tag': "The Pokémon steps on the opposing Pokémon's shadow to prevent it from fleeing or switching out.",
  'Parental Bond': 'Parent and child each attack.',
  'Aerilate': "Normal-type moves become Flying-type moves. The power of those moves is boosted a little.",
  'Sand Force': "Boosts the power of Rock-, Ground-, and Steel-type moves in a sandstorm.",
  'Skill Link': 'Maximizes the number of times multistrike moves hit.',
  'Solar Power': "In harsh sunlight, the Pokémon's Sp. Atk stat is boosted, but HP decreases every turn.",
  'Sand Stream': 'The Pokémon summons a sandstorm when it enters a battle.',
  'Pixilate': "Normal-type moves become Fairy-type moves. The power of those moves is boosted a little.",
  'Filter': 'Reduces the power of supereffective attacks that hit the Pokémon.',
  'Technician': 'Powers up weak moves so the Pokémon can deal more damage with them.',
  'Healer': "Sometimes cures the status conditions of the Pokémon's allies.",
  'Scrappy': 'The Pokémon can hit Ghost-type Pokémon with Normal- and Fighting-type moves.',
  'Inner Focus': "The Pokémon's intensely focused, and that prevents it from flinching.",
  // Champions-exclusive Z mega abilities — use their Serebii descriptions
  'Spectral Doom': 'Dark and Ghost-type moves gain 30% power. Moves bypass Screens and Substitute.',
  'Earth Sovereign': 'Ground and Dragon-type moves ignore immunities. On Mega Evolution, summons a sandstorm.',
  'Aura Maximizer': 'Fighting and Steel-type moves gain 30% power. Special Attack is raised by one stage on Mega Evolution.',
  'Commander Surge': "Dragon and Water moves gain 30% power. On Mega Evolution, raises ally's Sp. Atk by 1 stage.",
};

let changes = 0;
for (const [name, desc] of Object.entries(corrections)) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `("name":\\s*"${escaped}",\\n\\s*"description":\\s*")([^"]*)(")`,
    'g'
  );
  src = src.replace(re, (m, before, oldDesc, after) => {
    if (oldDesc !== desc) {
      changes++;
      console.log(`  Fixed: ${name}`);
      console.log(`    Old: ${oldDesc.substring(0, 80)}...`);
      console.log(`    New: ${desc.substring(0, 80)}...`);
      return before + desc + after;
    }
    return m;
  });
}

// Set ALL isChampions to false
const champCount = (src.match(/"isChampions": true/g) || []).length;
src = src.replace(/"isChampions": true/g, '"isChampions": false');

console.log(`\nDescription changes: ${changes}`);
console.log(`isChampions true→false: ${champCount}`);

fs.writeFileSync(FILE, src);
console.log('Done!');

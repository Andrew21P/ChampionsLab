"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  GraduationCap, BookOpen, Swords, Shield, Zap, Target,
  ChevronDown, ChevronRight, Brain, TrendingUp, Users,
  Award, Sparkles, Flame, Droplets, Wind, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { LastUpdated } from "@/components/last-updated";
import { AlertTriangle, Lightbulb, Trophy, Info } from "lucide-react";

/* ─────────────── Rich text helpers ─────────────── */

function renderRichText(text: string) {
  // Split on **bold** and `code` patterns
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="px-1.5 py-0.5 rounded bg-muted text-xs font-mono text-foreground/80">{part.slice(1, -1)}</code>;
    }
    return <span key={i}>{part}</span>;
  });
}

const TIP_STYLES: Record<TipType, { icon: React.ElementType; label: string; border: string; bg: string; iconColor: string; labelColor: string }> = {
  pro:          { icon: Lightbulb,      label: "Pro Tip",       border: "border-amber-400/50",  bg: "bg-amber-50/60 dark:bg-amber-950/20",  iconColor: "text-amber-500",  labelColor: "text-amber-700 dark:text-amber-400" },
  "did-you-know": { icon: Info,         label: "Did You Know?", border: "border-blue-400/50",   bg: "bg-blue-50/60 dark:bg-blue-950/20",    iconColor: "text-blue-500",   labelColor: "text-blue-700 dark:text-blue-400" },
  champions:    { icon: Trophy,         label: "Champions Tip", border: "border-violet-400/50", bg: "bg-violet-50/60 dark:bg-violet-950/20", iconColor: "text-violet-500", labelColor: "text-violet-700 dark:text-violet-400" },
  warning:      { icon: AlertTriangle,  label: "Watch Out!",    border: "border-rose-400/50",   bg: "bg-rose-50/60 dark:bg-rose-950/20",    iconColor: "text-rose-500",   labelColor: "text-rose-700 dark:text-rose-400" },
};

function TipCallout({ type, text }: { type: TipType; text: string }) {
  const style = TIP_STYLES[type];
  const Icon = style.icon;
  return (
    <div className={cn("flex gap-3 rounded-xl border px-4 py-3 mt-2", style.border, style.bg)}>
      <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", style.iconColor)} />
      <div>
        <span className={cn("text-xs font-bold uppercase tracking-wide", style.labelColor)}>{style.label}</span>
        <p className="text-sm text-muted-foreground leading-relaxed mt-0.5">{renderRichText(text)}</p>
      </div>
    </div>
  );
}

/* ─────────────── Section data ─────────────── */

type TipType = "pro" | "did-you-know" | "champions" | "warning";

interface ContentBlock {
  text: string;               // supports **bold** and `code`
  tip?: { type: TipType; text: string };
}

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  subsections: { title: string; content: ContentBlock[] }[];
}

const SECTIONS: Section[] = [
  {
    id: "intro",
    title: "What is VGC?",
    icon: GraduationCap,
    color: "violet",
    subsections: [
      {
        title: "Video Game Championships",
        content: [
          { text: "**VGC (Video Game Championships)** is the official competitive Pokémon format run by **The Pokémon Company International**. It uses **Double Battles** - each player selects 4 of their 6 Pokémon to bring to each game." },
          { text: "Matches are played on the actual Pokémon video games (currently **Pokémon Scarlet & Violet / Champions**). Players build teams of 6, following the current ruleset, and battle in a **best-of-3** format at major tournaments." },
          { text: "VGC has a thriving global competitive scene with **Regional Championships**, **International Championships**, and the **World Championships** held annually. Players earn **Championship Points (CP)** to qualify for Worlds.", tip: { type: "did-you-know", text: "The VGC World Championships have been running since 2009. The prize pool has grown every year, and top players can earn scholarships and cash prizes!" } },
        ],
      },
      {
        title: "Double Battles vs Singles",
        content: [
          { text: "Unlike Smogon Singles (6v6, one Pokémon out at a time), VGC is a **Doubles format** - two Pokémon on each side of the field at all times. This **fundamentally changes strategy**." },
          { text: "In Doubles, you can target **either** opponent's Pokémon, use moves that hit multiple targets (**Spread moves** like Earthquake, Heat Wave), and **support your partner** with moves like Follow Me, Helping Hand, or Tailwind." },
          { text: "**Positioning**, **turn order**, and **reading your opponent's plays** become even more critical when you have 4 Pokémon interacting simultaneously.", tip: { type: "pro", text: "Doubles is fundamentally about interactions between 4 Pokémon on the field. Think of it as a 2v2 chess match - your partner's position matters just as much as your own." } },
        ],
      },
      {
        title: "Team Preview & Bring 4",
        content: [
          { text: "Before each game begins, both players see all 6 Pokémon on each team (**Team Preview**). You then choose which **4 to bring** to the battle." },
          { text: "This **'Bring 4'** mechanic is crucial - you don't always bring the same 4 Pokémon. Depending on your opponent's team, you'll adjust your selection to give yourself the **best matchup**.", tip: { type: "champions", text: "In Champions, Team Preview shows each Pokémon's sprite, types, and tier badge. Use this to quickly identify the opponent's strategy and plan your Bring 4!" } },
          { text: "Building a flexible team that has **multiple 'modes'** or good Pokémon for different matchups is key to success." },
        ],
      },
    ],
  },
  {
    id: "teambuilding",
    title: "Team Building Fundamentals",
    icon: Users,
    color: "cyan",
    subsections: [
      {
        title: "The 6-Pokémon Puzzle",
        content: [
          { text: "A strong VGC team isn't just 6 individually powerful Pokémon - it's a **cohesive unit** where each member serves a purpose and covers the weaknesses of others." },
          { text: "Start by choosing a **'core'** - 2-3 Pokémon that work well together. This might be a weather setter + abuser (`Torkoal + Venusaur`), a Trick Room pair (`Hatterene + Torkoal`), or a speed control combo (`Whimsicott + Kingambit`).", tip: { type: "champions", text: "Check the META page's Best Cores section - our 1M battle simulation shows which pairs have the highest win rates. Gliscor + Archaludon currently dominates at 71%!" } },
          { text: "Then fill the remaining slots with Pokémon that **handle threats** your core is weak to, provide **alternative win conditions**, and give you **flexibility** in Team Preview." },
        ],
      },
      {
        title: "Roles to Cover",
        content: [
          { text: "**Speed Control:** Tailwind setters (`Whimsicott`, `Talonflame`), Trick Room setters (`Hatterene`, `Oranguru`), Icy Wind/Electroweb users. **Controlling who moves first wins games.**" },
          { text: "**Offensive Threats:** You need Pokémon that can deal significant damage. **Mix physical and special attackers** so you can't be walled by a single defensive stat." },
          { text: "**Support & Redirection:** Pokémon like `Amoonguss` (Rage Powder), `Indeedee` (Follow Me), or `Sableye` (Prankster Will-O-Wisp, Quash) protect your key threats.", tip: { type: "pro", text: "Every great team has at least one 'glue' Pokémon - a support that doesn't sweep itself but enables everything else. Incineroar with Fake Out + Intimidate is the GOAT of this role." } },
          { text: "**Defensive Backbone:** At least one bulky Pokémon that can take hits and provide utility - **Intimidate** users, **Will-o-Wisp** spreaders, or tanky redirectors." },
        ],
      },
      {
        title: "Type Synergy & Coverage",
        content: [
          { text: "Ensure your team **isn't overly weak** to any one type. If 3+ Pokémon share a weakness (e.g., all weak to Ground), a single `Earthquake` can devastate you.", tip: { type: "warning", text: "Common trap: loading up on Steel-types because they're individually strong. Your team will crumble to a single Earthquake or Heat Wave from a Fire-type." } },
          { text: "Check that your team can hit **every type** for at least neutral damage. The **Champions Lab team builder** coverage chart helps visualize this." },
          { text: "Consider **immunities** and **resistances**. A **Flying-type** or **Levitate** Pokémon is great alongside an Earthquake user. A **Steel-type** resists 10 types!" },
        ],
      },
      {
        title: "Stat Points (SP) in Champions",
        content: [
          { text: "In Champions, the traditional **EV/IV** system is replaced by **Stat Points (SP)** - a simpler, more strategic allocation system.", tip: { type: "champions", text: "Each Pokémon gets 66 total Stat Points to distribute, with a maximum of 32 in any single stat. This means every point matters - no wasted EVs!" } },
          { text: "**Common spreads:** `32/32/2/0/0/0` (max two stats + a little extra), `32/0/2/32/0/0` (offensive + bulk), `32/0/32/0/0/2` (pure tank). The 2 leftover points are your 'tech' investment." },
          { text: "**Speed tiers** are especially important with SP. Know whether you need `32 Speed` to outrun key threats, or if you can invest those points elsewhere for bulk.", tip: { type: "pro", text: "A common mistake is always maxing Speed. Many Pokémon like Kingambit, Snorlax, and Torkoal don't need Speed at all - invest in HP and Attack/SpA instead for maximum impact." } },
        ],
      },
    ],
  },
  {
    id: "types",
    title: "Type Matchups Mastery",
    icon: Shield,
    color: "emerald",
    subsections: [
      {
        title: "The 18 Types",
        content: [
          { text: "There are **18 types** in Pokémon, each with its own offensive and defensive interactions. **Mastering type matchups** is the foundation of competitive play." },
          { text: "**Key offensive types:** Fairy (hits Dragon, Dark, Fighting), Ground (hits **5 types** SE, only resisted by Bug, Grass), Ice (hits Dragon, Ground, Flying, Grass)." },
          { text: "**Key defensive types:** Steel (**resists 10 types!**), Fairy (immune to Dragon, resists Fighting, Bug, Dark), Water (resists 4 types).", tip: { type: "did-you-know", text: "Steel-type is so defensively dominant that 49 of the 159 Pokémon in the Champions roster can learn a Steel-type move to deal with it. Always have a plan for Steel!" } },
        ],
      },
      {
        title: "Common Offensive Combinations",
        content: [
          { text: "**Ice + Ground:** Only resisted by a handful of Pokémon (Water/Bug types). Incredible neutral coverage - this is why `Garchomp` with Earthquake + Ice move is so dominant." },
          { text: "**Fairy + Fire:** Fairy handles Dragon/Dark/Fighting, Fire handles Steel/Bug/Grass - hitting **almost everything** neutrally.", tip: { type: "pro", text: "Mega Gardevoir (Fairy) + Arcanine (Fire) is a classic example of this offensive pairing. Together they can threaten nearly the entire metagame!" } },
          { text: "**Ghost + Fighting:** Ghost is immune to Normal and Fighting, Fighting is super effective against Normal and Steel. Together they hit everything for at least neutral except Normal/Ghost types." },
          { text: "**Water + Grass:** Water hits Fire/Ground/Rock, Grass handles Water/Ground/Rock from a different angle. Very solid neutral coverage." },
        ],
      },
      {
        title: "Mega Evolution Strategy",
        content: [
          { text: "**Mega Evolution** transforms a Pokémon into a **stronger form** mid-battle, boosting stats and sometimes **changing type or ability**.", tip: { type: "champions", text: "Champions features both classic Megas (Garchomp, Kangaskhan, Metagross) AND exclusive new ones (Mega Meganium, Mega Feraligatr, Mega Tatsugiri). Experiment with them in the Team Builder!" } },
          { text: "Each team can only **Mega Evolve one Pokémon** per battle - choose wisely which Pokémon benefits most from the power boost." },
          { text: "**Mega Stones** take up the held item slot, so Mega Pokémon can't hold other items like Life Orb or Choice Scarf." },
          { text: "Some Mega Evolutions **change abilities** on the turn they Mega Evolve (e.g., `Mega Kangaskhan` gains **Parental Bond**). Plan your first Mega turn carefully.", tip: { type: "warning", text: "If your Mega uses Intimidate in base form (like Gyarados), Mega Evolving removes Intimidate. Sometimes it's better NOT to Mega on turn 1 if you need that Intimidate cycle!" } },
        ],
      },
    ],
  },
  {
    id: "strategies",
    title: "Core Strategies",
    icon: Brain,
    color: "amber",
    subsections: [
      {
        title: "Tailwind Teams",
        content: [
          { text: "**Tailwind** doubles your team's Speed for **4 turns**. It's the most common speed control in VGC, used by Pokémon like `Whimsicott`, `Talonflame`, `Pelipper`, and `Tornadus`." },
          { text: "**Strategy:** Lead with your Tailwind setter + a strong attacker. Set Tailwind **turn 1**, then sweep with your faster Pokémon in the following turns.", tip: { type: "pro", text: "Whimsicott is the best Tailwind setter because of Prankster - it gives Tailwind +1 priority, meaning it almost always goes first. Pair it with Kingambit for devastating double attacks." } },
          { text: "**Counter-play:** Fake Out the Tailwind setter, use your own speed control (opposing Tailwind or Trick Room), or use **priority moves** to bypass the speed boost." },
        ],
      },
      {
        title: "Trick Room Teams",
        content: [
          { text: "**Trick Room** reverses the speed order for **5 turns** - the **slowest Pokémon move first**. This enables extremely powerful but slow Pokémon like `Torkoal`, `Snorlax`, and `Hatterene`.", tip: { type: "champions", text: "Our 1M simulation shows Slowbro Trick Room is the #1 archetype with a 65.6% win rate! Slowbro's incredible bulk makes it nearly impossible to stop from setting up." } },
          { text: "**Strategy:** Protect your Trick Room setter (often by pairing with **Follow Me/Rage Powder** support), set Trick Room, then unleash powerful slow attackers." },
          { text: "**Building:** Your Trick Room sweepers should have **minimum Speed** - in Champions, that means `0 SP in Speed`. Every point of Speed you drop matters under Trick Room." },
          { text: "**Counter-play:** Knock out or `Taunt` the setter, use Imprison with Trick Room on your own Pokémon, or bring fast Pokémon that can threaten the setter before it moves." },
        ],
      },
      {
        title: "Weather Teams",
        content: [
          { text: "**Weather** (Sun, Rain, Sand, Snow) boosts certain types and enables abilities like **Swift Swim**, **Chlorophyll**, **Sand Rush**, and **Slush Rush**." },
          { text: "**☀️ Sun:** Set by `Drought` (`Torkoal`). Powers up Fire moves, weakens Water. Enables Chlorophyll speed. Pairs with powerful Fire-types and **Solar Beam** users." },
          { text: "**🌧️ Rain:** Set by `Drizzle` (`Pelipper`). Powers up Water, weakens Fire. Enables Swift Swim. Rain teams apply pressure with boosted **spread Water moves**.", tip: { type: "did-you-know", text: "Pelipper + Swift Swim Kingdra was one of the most iconic VGC cores of all time. In Champions, Pelipper + Azumarill or Primarina fills a similar role!" } },
          { text: "**🏜️ Sand:** Set by `Sand Stream` (`Tyranitar`, `Hippowdon`). Grants **SpD boost** to Rock-types, deals chip damage. Enables Sand Rush sweepers like `Excadrill`." },
        ],
      },
      {
        title: "Goodstuff / Balance",
        content: [
          { text: "**'Goodstuff'** means building a team of individually strong Pokémon that don't rely on a specific archetype. The goal is **flexibility and consistency**." },
          { text: "These teams excel in **Team Preview** because they have answers to everything - they don't auto-lose to any matchup.", tip: { type: "champions", text: "Balance is the #2 archetype in our simulation at 54.4% WR. It's the most beginner-friendly strategy because it doesn't require perfect execution of a single game plan." } },
          { text: "Include a mix of **speed control options**, **offensive pressure**, and **defensive utility**. `Intimidate`, redirection, and priority moves are staples." },
          { text: "Goodstuff teams reward **strong in-game play** and adaptation. You need to **outplay your opponent** rather than relying on a single setup." },
        ],
      },
      {
        title: "Hyper Offense",
        content: [
          { text: "**Hyper Offense** prioritizes dealing **maximum damage** as quickly as possible. The philosophy: *'If I KO their Pokémon fast enough, they can't fight back.'*" },
          { text: "Typically includes strong **Tailwind** or **Choice Scarf** users, powerful spread moves (`Heat Wave`, `Rock Slide`, `Dazzling Gleam`), and **Helping Hand** support." },
          { text: "**Risk:** If you don't get early KOs, you may lack the defensive tools to recover. HO teams **live and die** by their early momentum.", tip: { type: "warning", text: "Hyper Offense is a double-edged sword. If your opponent reads your turn 1 play and Protects correctly, you can fall behind immediately. Always have a Plan B lead." } },
        ],
      },
    ],
  },
  {
    id: "ingame",
    title: "In-Game Decision Making",
    icon: Target,
    color: "rose",
    subsections: [
      {
        title: "Lead Selection",
        content: [
          { text: "Choosing the right **lead** (your first 2 Pokémon) is critical. You want to **establish an advantage** or set up your win condition early." },
          { text: "Consider: Do I need speed control? Can I **threaten their likely leads**? Do I need to protect a key Pokémon with redirection?" },
          { text: "Have a **default lead** for your team, but be flexible. Adjust based on your opponent's team during **Team Preview**.", tip: { type: "pro", text: "Write down your default leads and your 'anti-Trick Room' leads before a tournament. Having a plan ready means faster, more confident decisions under pressure." } },
        ],
      },
      {
        title: "Protect & Predictions",
        content: [
          { text: "`Protect` is the **most important move in VGC**. It blocks all moves for one turn (with some exceptions like `Feint`). Almost every Pokémon should run Protect." },
          { text: "**Use Protect to:** scout your opponent's moves, stall out Trick Room/Tailwind turns, ensure a safe switch, block a predicted **double-target**.", tip: { type: "did-you-know", text: "At the 2023 World Championships, the winning player used Protect on 5 of their 6 Pokémon. The only one without it was a Choice-locked attacker. Protect really IS that important!" } },
          { text: "**Predicting your opponent's Protect** is key to gaining advantage. If you think they'll Protect, use a **setup move**, switch, or target their partner." },
        ],
      },
      {
        title: "Switching & Positioning",
        content: [
          { text: "Switching in Doubles is **riskier** than Singles - you're still vulnerable on the other slot. But **smart switches win games**." },
          { text: "Switch to bring in a Pokémon with a **type advantage**, to activate **Intimidate**, or to position for a better **endgame**.", tip: { type: "pro", text: "The 'Intimidate cycle' is a powerful technique - switching Incineroar/Arcanine in and out to repeatedly lower the opponent's Attack. Pokémon with Intimidate are always in demand!" } },
          { text: "Think about your **'back 2'** - the Pokémon you didn't lead with. Plan **how and when** they come in. Save them for the right moment." },
        ],
      },
      {
        title: "Endgame & Win Conditions",
        content: [
          { text: "VGC games are often decided in the **last 2-3 turns**. Identify your **win condition** early: which of your Pokémon can close out the game?" },
          { text: "**Common endgame scenarios:** a fast sweeper cleaning up weakened Pokémon, a bulky Pokémon stalling out the timer, Trick Room sweeping with 2-3 slow hitters." },
          { text: "**Preserve your win condition** throughout the game. Don't sacrifice your endgame sweeper for chip damage early on.", tip: { type: "warning", text: "One of the biggest beginner mistakes: trading your best Pokémon early for a KO on something that doesn't matter. Always think 'who closes this game out?' and keep them healthy." } },
        ],
      },
    ],
  },
  {
    id: "moves",
    title: "Essential Moves & Items",
    icon: Zap,
    color: "blue",
    subsections: [
      {
        title: "Must-Know Moves",
        content: [
          { text: "**`Protect`** - Blocks all attacks for 1 turn. The most important move in VGC - run it on **nearly everything**." },
          { text: "**`Fake Out`** - Priority +3 flinch move (first turn only). Disrupts setup, guarantees chip damage. Used by `Incineroar`, `Lopunny`, `Mienshao`." },
          { text: "**`Follow Me` / `Rage Powder`** - Redirects single-target moves to the user. Lets your key Pokémon set up or attack safely." },
          { text: "**`Tailwind`** - Doubles your team's Speed for 4 turns. The primary speed control move in most formats." },
          { text: "**`Trick Room`** - Reverses speed order for 5 turns. Enables slow powerhouses to dominate." },
          { text: "**`Helping Hand`** - Boosts your partner's attack by **50%** that turn. Free damage amplifier with no drawbacks.", tip: { type: "pro", text: "Helping Hand is one of the most underrated moves in VGC. That +50% can turn a 2HKO into an OHKO, completely swinging the game in your favor. It also has +5 priority!" } },
        ],
      },
      {
        title: "Key Held Items",
        content: [
          { text: "**Focus Sash** - Survive any one attack with 1 HP. Essential on frail setup Pokémon and Trick Room setters." },
          { text: "**Choice Scarf** - Boosts Speed by **50%** but locks you into one move. Enables Pokémon to outspeed threats they normally can't." },
          { text: "**Assault Vest** - Boosts SpD by **50%** but prevents status moves. Great on bulky offensive Pokémon like `Kingambit` and `Goodra`.", tip: { type: "did-you-know", text: "Assault Vest Kingambit is one of the most popular sets in the current Champions meta. It lets Kingambit survive special attacks it normally couldn't, turning it into an unstoppable tank." } },
          { text: "**Life Orb** - Boosts damage by **30%** at the cost of 10% HP per attack. For Pokémon that need power without being Choice-locked." },
          { text: "**Sitrus Berry** - Restores **25% HP** when below 50%. Reliable longevity for bulky Pokémon and support." },
          { text: "**Safety Goggles** - Immunity to weather damage and powder moves (`Spore`, `Sleep Powder`). Key counter to Amoonguss." },
        ],
      },
      {
        title: "Spread Moves",
        content: [
          { text: "**Spread moves** hit both opponents (and sometimes your partner). In Doubles, a move hitting 2 Pokémon deals **75% of its normal damage** to each." },
          { text: "**Top spread moves:** `Earthquake` (Ground, physical, hits foes AND partner), `Heat Wave` (Fire, special, foes only), `Rock Slide` (Rock, physical, foes only, **flinch chance**), `Dazzling Gleam` (Fairy, special, foes only).", tip: { type: "champions", text: "Our simulation shows Body Slam (59.3% WR), High Horsepower (59.3% WR), and Beat Up (58.9% WR) as the highest win-rate moves. Check the META page for the full move rankings!" } },
          { text: "Be careful with **ally-hitting moves** like `Earthquake` and `Surf` - make sure your partner resists, is immune, or has a **Wide Guard** user nearby." },
        ],
      },
    ],
  },
  {
    id: "tournament",
    title: "Tournament Preparation",
    icon: Award,
    color: "orange",
    subsections: [
      {
        title: "Reading the Metagame",
        content: [
          { text: "The **'meta'** is the current popular strategies, Pokémon, and team structures being used. It **constantly evolves** as players innovate and counter each other." },
          { text: "Check tournament results on VictoryRoadVGC, **Champions Lab's META page**, and community resources. Know what's popular so you can **prepare for it**.", tip: { type: "champions", text: "Our META page is powered by a 1M battle simulation that ranks every Pokémon, move, core pair, and archetype. Use it to spot trends before your opponents do!" } },
          { text: "Don't just copy top teams - understand **WHY** they work. What matchups do they beat? What's their game plan? What are their weaknesses?" },
        ],
      },
      {
        title: "Practice & Ladder",
        content: [
          { text: "Play on **Pokémon Showdown** (online battle simulator) to test your team before taking it to a tournament. Aim for a high ladder rating to validate your team." },
          { text: "**Track your games:** note what you lose to, which leads feel bad, and which Pokémon you rarely bring. This data helps you **refine** your team.", tip: { type: "pro", text: "Keep a simple spreadsheet: opponent's team, your leads, win/loss, notes. After 20+ games, clear patterns emerge about what your team struggles against." } },
          { text: "Practice **specific matchups** against friends or in tournament practice groups. **Bo3** (Best of 3) practice is essential for tournament readiness." },
        ],
      },
      {
        title: "Mental Game",
        content: [
          { text: "VGC tournaments are long - Regionals can be **7-9 rounds**. **Mental stamina** matters as much as team strength." },
          { text: "Stay **hydrated**, eat well, and take breaks between rounds. A clear mind makes better decisions under pressure." },
          { text: "**Don't tilt** after a loss. Every top player loses games. Focus on the next round and what you can control.", tip: { type: "did-you-know", text: "Wolfe Glick, 2016 World Champion, went 6-3 at multiple Regionals before winning Worlds. Consistency and mental resilience beat any individual result." } },
          { text: "Review your games between rounds if possible. Did you **misplay**, or did you get **unlucky**? Knowing the difference prevents repeat mistakes." },
        ],
      },
      {
        title: "Championship Points & Qualification",
        content: [
          { text: "Earn **Championship Points (CP)** by placing well at sanctioned tournaments: local events, Regionals, Internationals, and Special Events." },
          { text: "You need a certain **CP threshold** to qualify for the **World Championships**. The threshold varies by region and season." },
          { text: "The road to Worlds is a **marathon, not a sprint**. Consistent top placements across multiple events matter more than one lucky win.", tip: { type: "pro", text: "Focus on making Day 2 consistently rather than winning the whole event. A string of Top 16 finishes earns more CP than one lucky Top 4." } },
        ],
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Techniques",
    icon: Sparkles,
    color: "purple",
    subsections: [
      {
        title: "Damage Calculation",
        content: [
          { text: "Knowing **how much damage** your attacks deal is crucial. Use a damage calculator (like the one built into **Champions Lab's engine**) to check benchmarks." },
          { text: "**'Benchmarks'** are key calculations: Can my Pokémon **OHKO** a common threat? Can it **survive** a specific attack? These benchmarks inform your SP spread.", tip: { type: "champions", text: "Use our Battle Bot to test specific matchups. It uses the full damage formula including spread reduction, weather, abilities, and items to give you accurate results." } },
          { text: "SP spreads aren't just `32 Atk / 32 Spe`. The best players **'creep'** - adding just enough bulk to survive key attacks while maintaining offensive power." },
        ],
      },
      {
        title: "Speed Control Stacking",
        content: [
          { text: "Some teams run **multiple forms** of speed control. For example, `Tailwind + Icy Wind`, or `Trick Room + Thunder Wave`." },
          { text: "This flexibility lets you **adapt mid-game**. If your first speed control is blocked, you have a backup." },
          { text: "**Advanced technique:** 'Trick Room toggle' teams can play at **fast or slow speed**, choosing based on the matchup.", tip: { type: "pro", text: "The most flexible teams can win under Tailwind AND under Trick Room. Having Snorlax (slow) and Garchomp (fast) on the same team gives you both modes." } },
        ],
      },
      {
        title: "Slot Conditioning",
        content: [
          { text: "Your opponent makes predictions based on what they **expect you to do**. **'Conditioning'** means setting up patterns, then breaking them." },
          { text: "**Example:** Protect with Pokémon A for two turns, conditioning your opponent to ignore it. On turn 3, **attack** with Pokémon A when they don't expect it." },
          { text: "At the highest level, VGC is a game of **reads and counter-reads**. The best players are **unpredictable** and adapt to their opponent's tendencies.", tip: { type: "did-you-know", text: "Japanese VGC players are famous for 'hard reads' - making bold predictions like double-targeting into an expected switch. It's risky but devastatingly effective when it works." } },
        ],
      },
      {
        title: "Team Report Analysis",
        content: [
          { text: "After major tournaments, top players publish **'team reports'** - detailed explanations of their team, sets, and strategies." },
          { text: "Study these reports to understand **high-level thinking**. Pay attention to SP spreads (what they survived/KO'd), lead choices, and game-plan explanations.", tip: { type: "pro", text: "When reading a team report, focus on the 'matchup chart' section - it tells you what the player thought about each common team archetype and how they planned to beat it." } },
          { text: "Champions Lab's **META page** and **Battle Bot** let you test and analyze these strategies yourself." },
        ],
      },
    ],
  },
];

/* ─────────────── Component ─────────────── */

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; icon: string; pill: string }> = {
  violet:  { bg: "bg-violet-50",  border: "border-violet-200",  text: "text-violet-700",  icon: "text-violet-500",  pill: "bg-violet-100 text-violet-700" },
  cyan:    { bg: "bg-cyan-50",    border: "border-cyan-200",    text: "text-cyan-700",    icon: "text-cyan-500",    pill: "bg-cyan-100 text-cyan-700" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: "text-emerald-500", pill: "bg-emerald-100 text-emerald-700" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   icon: "text-amber-500",   pill: "bg-amber-100 text-amber-700" },
  rose:    { bg: "bg-rose-50",    border: "border-rose-200",    text: "text-rose-700",    icon: "text-rose-500",    pill: "bg-rose-100 text-rose-700" },
  blue:    { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-700",    icon: "text-blue-500",    pill: "bg-blue-100 text-blue-700" },
  orange:  { bg: "bg-orange-50",  border: "border-orange-200",  text: "text-orange-700",  icon: "text-orange-500",  pill: "bg-orange-100 text-orange-700" },
  purple:  { bg: "bg-purple-50",  border: "border-purple-200",  text: "text-purple-700",  icon: "text-purple-500",  pill: "bg-purple-100 text-purple-700" },
};

export default function LearnPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["intro"]));
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    trackEvent("toggle_section", "pokeschool", id);
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSub = (key: string) => {
    trackEvent("toggle_subsection", "pokeschool", key);
    setExpandedSubs(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const expandAll = () => {
    trackEvent("expand_all", "pokeschool");
    setExpandedSections(new Set(SECTIONS.map(s => s.id)));
    const allSubs = new Set<string>();
    SECTIONS.forEach(s => s.subsections.forEach((_, i) => allSubs.add(`${s.id}-${i}`)));
    setExpandedSubs(allSubs);
  };

  const collapseAll = () => {
    trackEvent("collapse_all", "pokeschool");
    setExpandedSections(new Set());
    setExpandedSubs(new Set());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                PokéSchool
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Your complete guide from beginner to VGC Champion
            </p>
            <div className="mt-1.5">
              <LastUpdated page="learn" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs text-muted-foreground">
            {SECTIONS.length} chapters · {SECTIONS.reduce((a, s) => a + s.subsections.length, 0)} lessons
          </span>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 text-xs rounded-lg glass glass-hover text-muted-foreground hover:text-foreground transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 text-xs rounded-lg glass glass-hover text-muted-foreground hover:text-foreground transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </motion.div>

      {/* Table of Contents */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl border border-gray-200/60 p-5 mb-8"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Table of Contents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SECTIONS.map((section, idx) => {
            const colors = COLOR_MAP[section.color];
            return (
              <button
                key={section.id}
                onClick={() => {
                  setExpandedSections(prev => new Set(prev).add(section.id));
                  document.getElementById(`section-${section.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all hover:scale-[1.02]",
                  colors.bg, "border", colors.border
                )}
              >
                <span className={cn("text-lg font-bold", colors.text)}>{idx + 1}</span>
                <section.icon className={cn("w-5 h-5", colors.icon)} />
                <span className="text-sm font-medium">{section.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{section.subsections.length} lessons</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-4">
        {SECTIONS.map((section, sIdx) => {
          const isExpanded = expandedSections.has(section.id);
          const colors = COLOR_MAP[section.color];
          return (
            <motion.div
              key={section.id}
              id={`section-${section.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sIdx * 0.05 }}
              className="scroll-mt-24"
            >
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left",
                  isExpanded
                    ? cn(colors.bg, colors.border, "shadow-sm")
                    : "glass border-gray-200/60 hover:border-gray-300/60"
                )}
              >
                <div className={cn(
                  "p-2.5 rounded-xl transition-colors",
                  isExpanded ? cn(colors.pill) : "bg-gray-100 text-gray-500"
                )}>
                  <section.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-bold uppercase tracking-wider", isExpanded ? colors.text : "text-muted-foreground")}>
                      Chapter {sIdx + 1}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mt-0.5">{section.title}</h2>
                </div>
                <span className="text-xs text-muted-foreground mr-2">{section.subsections.length} lessons</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>

              {/* Section content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 sm:pl-8 pt-2 space-y-2">
                      {section.subsections.map((sub, subIdx) => {
                        const subKey = `${section.id}-${subIdx}`;
                        const isSubExpanded = expandedSubs.has(subKey);
                        return (
                          <div key={subIdx}>
                            <button
                              onClick={() => toggleSub(subKey)}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left glass border border-gray-200/40 hover:border-gray-300/60 transition-all"
                            >
                              <motion.div
                                animate={{ rotate: isSubExpanded ? 90 : 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </motion.div>
                              <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", colors.pill)}>
                                {sIdx + 1}.{subIdx + 1}
                              </span>
                              <span className="text-sm font-medium">{sub.title}</span>
                            </button>

                            <AnimatePresence initial={false}>
                              {isSubExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 py-3 ml-8 space-y-3">
                                    {sub.content.map((block, pi) => (
                                      <div key={pi}>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                          {renderRichText(block.text)}
                                        </p>
                                        {block.tip && (
                                          <TipCallout type={block.tip.type} text={block.tip.text} />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center glass rounded-2xl border border-gray-200/60 p-8"
      >
        <GraduationCap className="w-12 h-12 mx-auto text-violet-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Ready to Put It Into Practice?</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          Use the Team Builder to create your squad, check the META page for what&apos;s winning,
          and put your theories to the test with our advanced battle engine.
        </p>

        {/* Engine Highlight */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-300/40 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/25">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-amber-700">Champions Lab Advanced VGC Battle Engine</p>
            <p className="text-[10px] text-muted-foreground">2,000,000+ battles simulated · Full AI · ELO Rankings · Live Replay</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/team-builder"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all"
          >
            Open Team Builder
          </a>
          <a
            href="/meta"
            className="px-6 py-2.5 rounded-xl glass glass-hover text-sm font-medium border border-gray-200"
          >
            Explore META
          </a>
          <a
            href="/battle-bot"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all"
          >
            ⚡ Battle Engine
          </a>
        </div>
      </motion.div>
    </div>
  );
}

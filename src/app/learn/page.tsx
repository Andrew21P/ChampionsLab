"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, BookOpen, Swords, Shield, Zap, Target,
  ChevronDown, ChevronRight, Brain, TrendingUp, Users,
  Award, Sparkles, Flame, Droplets, Wind, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────── Section data ─────────────── */
interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  subsections: { title: string; content: string[] }[];
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
          "VGC (Video Game Championships) is the official competitive Pokémon format run by The Pokémon Company International. It uses Double Battles — each player selects 4 of their 6 Pokémon to bring to each game.",
          "Matches are played on the actual Pokémon video games (currently Pokémon Scarlet & Violet / Champions). Players build teams of 6, following the current ruleset, and battle in a best-of-3 format at major tournaments.",
          "VGC has a thriving global competitive scene with Regional Championships, International Championships, and the World Championships held annually. Players earn Championship Points (CP) to qualify for Worlds.",
        ],
      },
      {
        title: "Double Battles vs Singles",
        content: [
          "Unlike Smogon Singles (6v6, one Pokémon out at a time), VGC is a Doubles format — two Pokémon on each side of the field at all times. This fundamentally changes strategy.",
          "In Doubles, you can target either opponent's Pokémon, use moves that hit multiple targets (Spread moves like Earthquake, Heat Wave), and support your partner with moves like Follow Me, Helping Hand, or Tailwind.",
          "Positioning, turn order, and reading your opponent's plays become even more critical when you have 4 Pokémon interacting simultaneously.",
        ],
      },
      {
        title: "Team Preview & Bring 4",
        content: [
          "Before each game begins, both players see all 6 Pokémon on each team (Team Preview). You then choose which 4 to bring to the battle.",
          "This 'Bring 4' mechanic is crucial — you don't always bring the same 4 Pokémon. Depending on your opponent's team, you'll adjust your selection to give yourself the best matchup.",
          "Building a flexible team that has multiple 'modes' or good Pokémon for different matchups is key to success.",
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
          "A strong VGC team isn't just 6 individually powerful Pokémon — it's a cohesive unit where each member serves a purpose and covers the weaknesses of others.",
          "Start by choosing a 'core' — 2-3 Pokémon that work well together. This might be a weather setter + abuser (Kyogre + Ludicolo), a Trick Room pair (Dusclops + Torkoal), or a speed control combo (Whimsicott + strong attacker).",
          "Then fill the remaining slots with Pokémon that handle threats your core is weak to, provide alternative win conditions, and give you flexibility in Team Preview.",
        ],
      },
      {
        title: "Roles to Cover",
        content: [
          "Speed Control: Tailwind setters (Tornadus, Whimsicott), Trick Room setters (Dusclops, Porygon2), Icy Wind/Electroweb users. Controlling who moves first wins games.",
          "Offensive Threats: You need Pokémon that can deal significant damage. Mix physical and special attackers so you can't be walled by a single defensive stat.",
          "Support & Redirection: Pokémon like Amoonguss (Rage Powder), Indeedee (Follow Me), or Grimmsnarl (screens, Thunder Wave) protect your key threats.",
          "Defensive Backbone: At least one bulky Pokémon that can take hits and provide utility — Intimidate users, Will-o-Wisp spreaders, or tanky redirectors.",
        ],
      },
      {
        title: "Type Synergy & Coverage",
        content: [
          "Ensure your team isn't overly weak to any one type. If 3+ Pokémon share a weakness (e.g., all weak to Ground), a single Earthquake can devastate you.",
          "Check that your team can hit every type for at least neutral damage. The Champions Lab team builder's coverage chart helps visualize this.",
          "Consider immunities and resistances. A Flying-type or Levitate Pokémon is great alongside an Earthquake user. A Steel-type resists many common attack types.",
        ],
      },
      {
        title: "Speed Tiers",
        content: [
          "Speed determines turn order. Know the key speed benchmarks: common Tailwind setters, max speed threats, and Trick Room slow Pokémon.",
          "EV your Pokémon to outspeed specific threats or survive specific attacks. Don't just dump max Speed/max Attack unless there's a reason.",
          "Consider speed control interactions: under Tailwind, under Trick Room, after an Icy Wind, after a Choice Scarf boost, or with abilities like Swift Swim / Chlorophyll.",
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
          "There are 18 types in Pokémon, each with its own offensive and defensive interactions. Mastering type matchups is the foundation of competitive play.",
          "Key offensive types: Fairy (hits Dragon, Dark, Fighting for SE), Ground (hits 5 types SE, only resisted by Bug, Grass), Ice (hits Dragon, Ground, Flying, Grass SE).",
          "Key defensive types: Steel (resists 10 types!), Fairy (immune to Dragon, resists Fighting, Bug, Dark), Water (resists 4 types).",
        ],
      },
      {
        title: "Common Offensive Combinations",
        content: [
          "Ice + Ground: Only resisted by a handful of Pokémon (Surskit line, Shedinja). Incredible neutral coverage.",
          "Fairy + Fire: Fairy handles Dragon/Dark/Fighting, Fire handles Steel/Bug/Grass — hitting almost everything neutrally.",
          "Ghost + Fighting: Ghost is immune to Normal and Fighting, Fighting is super effective against Normal and Steel. Together they hit everything for at least neutral except Normal/Ghost types.",
          "Water + Grass: Water hits Fire/Ground/Rock, Grass handles Water/Ground/Rock from a different angle. Very solid neutral coverage.",
        ],
      },
      {
        title: "Mega Evolution Strategy",
        content: [
          "Mega Evolution transforms a Pokémon into a stronger form mid-battle, boosting stats and sometimes changing type or ability.",
          "Each team can only Mega Evolve one Pokémon per battle — choose wisely which Pokémon benefits most from the power boost.",
          "Mega Stones take up the held item slot, so Mega Pokémon can't hold other items like Life Orb or Choice Scarf.",
          "Some Mega Evolutions change abilities on the turn they Mega Evolve (e.g., Mega Kangaskhan gains Parental Bond). Plan your first Mega turn carefully.",
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
          "Tailwind doubles your team's Speed for 4 turns. It's the most common speed control in VGC, used by Pokémon like Tornadus, Whimsicott, Suicune, and Talonflame.",
          "Strategy: Lead with your Tailwind setter + a strong attacker. Set Tailwind turn 1, then sweep with your faster Pokémon in the following turns.",
          "Counter-play: Fake Out the Tailwind setter, use your own speed control (opposing Tailwind or Trick Room), or use priority moves to bypass the speed boost.",
        ],
      },
      {
        title: "Trick Room Teams",
        content: [
          "Trick Room reverses the speed order for 5 turns — the slowest Pokémon move first. This enables extremely powerful but slow Pokémon like Torkoal, Dusclops, and Glastrier.",
          "Strategy: Protect your Trick Room setter (often by pairing with Follow Me/Rage Powder support), set Trick Room, then unleash powerful slow attackers.",
          "Building: Your Trick Room sweepers should have very low Speed IVs (0 IV) and no Speed investment. Every point of Speed you can drop matters.",
          "Counter-play: Knock out or Taunt the setter, use Imprison with Trick Room on your own Pokémon, or bring fast Pokémon that can threaten the setter before it moves.",
        ],
      },
      {
        title: "Weather Teams",
        content: [
          "Weather (Sun, Rain, Sand, Snow) boosts certain types and enables abilities like Swift Swim, Chlorophyll, Sand Rush, and Slush Rush.",
          "Sun: Set by Drought (Torkoal, Groudon). Powers up Fire moves, weakens Water. Enables Chlorophyll. Pairs with powerful Fire-types and Solar Beam users.",
          "Rain: Set by Drizzle (Pelipper, Kyogre). Powers up Water, weakens Fire. Enables Swift Swim. Rain teams apply pressure with boosted spread Water moves.",
          "Sand: Set by Sand Stream (Tyranitar, Hippowdon). Grants SpD boost to Rock-types, deals chip damage. Enables Sand Rush sweepers like Excadrill.",
        ],
      },
      {
        title: "Goodstuff / Balance",
        content: [
          "'Goodstuff' means building a team of individually strong Pokémon that don't rely on a specific archetype. The goal is flexibility and consistency.",
          "These teams excel in Team Preview because they have answers to everything — they don't auto-lose to any matchup.",
          "Include a mix of speed control options, offensive pressure, and defensive utility. Intimidate, redirection, and priority moves are staples.",
          "Goodstuff teams reward strong in-game play and adaptation. You need to outplay your opponent rather than relying on a single setup.",
        ],
      },
      {
        title: "Hyper Offense",
        content: [
          "Hyper Offense prioritizes dealing maximum damage as quickly as possible. The philosophy: 'If I KO their Pokémon fast enough, they can't fight back.'",
          "Typically includes strong Tailwind or Choice Scarf users, powerful spread moves (Heat Wave, Rock Slide, Dazzling Gleam), and Helping Hand support.",
          "Risk: If you don't get early KOs, you may lack the defensive tools to recover. HO teams live and die by their early momentum.",
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
          "Choosing the right lead (your first 2 Pokémon) is critical. You want to establish an advantage or set up your win condition early.",
          "Consider: Do I need speed control? Can I threaten their likely leads? Do I need to protect a key Pokémon with redirection?",
          "Have a default lead for your team, but be flexible. Adjust based on your opponent's team during Team Preview.",
        ],
      },
      {
        title: "Protect & Predictions",
        content: [
          "Protect is the most important move in VGC. It blocks all moves for one turn (with some exceptions like Feint). Almost every Pokémon should run Protect.",
          "Use Protect to: scout your opponent's moves, stall out Trick Room/Tailwind turns, ensure a safe switch, block a predicted double-target.",
          "Predicting your opponent's Protect is key to gaining advantage. If you think they'll Protect, use a setup move, switch, or target their partner.",
        ],
      },
      {
        title: "Switching & Positioning",
        content: [
          "Switching in Doubles is riskier than Singles — you're still vulnerable on the other slot. But smart switches win games.",
          "Switch to bring in a Pokémon with a type advantage, to activate Intimidate, or to position for a better endgame.",
          "Think about your 'back 2' — the Pokémon you didn't lead with. Plan how and when they come in. Save them for the right moment.",
        ],
      },
      {
        title: "Endgame & Win Conditions",
        content: [
          "VGC games are often decided in the last 2-3 turns. Identify your win condition early: which of your Pokémon can close out the game?",
          "Common endgame scenarios: a fast sweeper cleaning up weakened Pokémon, a bulky Pokémon stalling out the timer, Trick Room sweeping with 2-3 slow hitters.",
          "Preserve your win condition throughout the game. Don't sacrifice your endgame sweeper for chip damage early on.",
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
          "Protect: Blocks all attacks for 1 turn. The most important move in VGC — run it on nearly everything.",
          "Fake Out: Priority +3 flinch move (first turn only). Disrupts setup, guarantees chip damage. Used by Incineroar, Rillaboom, Mienshao.",
          "Follow Me / Rage Powder: Redirects single-target moves to the user. Lets your key Pokémon set up or attack safely.",
          "Tailwind: Doubles your team's Speed for 4 turns. The primary speed control move in most formats.",
          "Trick Room: Reverses speed order for 5 turns. Enables slow powerhouses to dominate.",
          "Helping Hand: Boosts your partner's attack by 50% that turn. Free damage amplifier with no drawbacks.",
        ],
      },
      {
        title: "Key Held Items",
        content: [
          "Focus Sash: Survive any one attack with 1 HP. Essential on frail setup Pokémon and Trick Room setters.",
          "Choice Scarf: Boosts Speed by 50% but locks you into one move. Enables Pokémon to outspeed threats they normally can't.",
          "Assault Vest: Boosts SpD by 50% but prevents status moves. Great on bulky offensive Pokémon.",
          "Life Orb: Boosts damage by 30% at the cost of 10% HP per attack. For Pokémon that need power without being Choice-locked.",
          "Sitrus Berry: Restores 25% HP when below 50%. Reliable longevity for bulky Pokémon and support.",
          "Safety Goggles: Immunity to weather damage and powder moves (Spore, Sleep Powder). Key counter to Amoonguss.",
        ],
      },
      {
        title: "Spread Moves",
        content: [
          "Spread moves hit both opponents (and sometimes your partner). In Doubles, a move that hits 2 Pokémon deals 75% of its normal damage to each.",
          "Top spread moves: Earthquake (Ground, physical, hits both foes AND your partner), Heat Wave (Fire, special, both foes), Rock Slide (Rock, physical, both foes, flinch chance), Dazzling Gleam (Fairy, special, both foes).",
          "Be careful with ally-hitting spread moves like Earthquake and Surf — make sure your partner resists, is immune, or has a Wide Guard user nearby.",
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
          "The 'meta' is the current popular strategies, Pokémon, and team structures being used. It constantly evolves as players innovate and counter each other.",
          "Check tournament results on VictoryRoadVGC, Champions Lab's META page, and community resources. Know what's popular so you can prepare for it.",
          "Don't just copy top teams — understand WHY they work. What matchups do they beat? What's their game plan? What are their weaknesses?",
        ],
      },
      {
        title: "Practice & Ladder",
        content: [
          "Play on Pokémon Showdown (online battle simulator) to test your team before taking it to a tournament. Aim for a high ladder rating to validate your team.",
          "Track your games: note what you lose to, which leads feel bad, and which Pokémon you rarely bring. This data helps you refine your team.",
          "Practice specific matchups against friends or in tournament practice groups. Bo3 (Best of 3) practice is essential for tournament readiness.",
        ],
      },
      {
        title: "Mental Game",
        content: [
          "VGC tournaments are long — Regionals can be 7-9 rounds. Mental stamina matters as much as team strength.",
          "Stay hydrated, eat well, and take breaks between rounds. A clear mind makes better decisions under pressure.",
          "Don't tilt after a loss. Every top player loses games. Focus on the next round and what you can control.",
          "Review your games between rounds if possible. Did you misplay, or did you get unlucky? Knowing the difference prevents repeat mistakes.",
        ],
      },
      {
        title: "Championship Points & Qualification",
        content: [
          "Earn Championship Points (CP) by placing well at sanctioned tournaments: local events, Regionals, Internationals, and Special Events.",
          "You need a certain CP threshold to qualify for the World Championships. The threshold varies by region and season.",
          "The road to Worlds is a marathon, not a sprint. Consistent top placements across multiple events matter more than one lucky win.",
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
          "Knowing how much damage your attacks deal is crucial. Use a damage calculator (like the one built into Champions Lab's engine) to check benchmarks.",
          "'Benchmarks' are key calculations: Can my Pokémon OHKO (one-hit KO) a common threat? Can it survive a specific attack? These benchmarks inform your EV spread.",
          "EV spreads aren't just max Attack/max Speed. The best players 'creep' — adding just enough bulk to survive key attacks while maintaining offensive power.",
        ],
      },
      {
        title: "Speed Control Stacking",
        content: [
          "Some teams run multiple forms of speed control. For example, Tailwind + Icy Wind, or Trick Room + Thunder Wave.",
          "This flexibility lets you adapt mid-game. If your first speed control is blocked, you have a backup.",
          "Advanced technique: 'Trick Room toggle' teams can play at fast or slow speed, choosing based on the matchup.",
        ],
      },
      {
        title: "Slot Conditioning",
        content: [
          "Your opponent makes predictions based on what they expect you to do. 'Conditioning' means setting up patterns, then breaking them.",
          "Example: Protect with Pokémon A for two turns, conditioning your opponent to ignore it. On turn 3, attack with Pokémon A when they don't expect it.",
          "At the highest level, VGC is a game of reads and counter-reads. The best players are unpredictable and adapt to their opponent's tendencies.",
        ],
      },
      {
        title: "Team Report Analysis",
        content: [
          "After major tournaments, top players publish 'team reports' — detailed explanations of their team, sets, and strategies.",
          "Study these reports to understand high-level thinking. Pay attention to EV spreads (what they lived/KO'd), lead choices, and game-plan explanations.",
          "Champions Lab's META page and Battle Bot let you test and analyze these strategies yourself.",
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
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSub = (key: string) => {
    setExpandedSubs(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(SECTIONS.map(s => s.id)));
    const allSubs = new Set<string>();
    SECTIONS.forEach(s => s.subsections.forEach((_, i) => allSubs.add(`${s.id}-${i}`)));
    setExpandedSubs(allSubs);
  };

  const collapseAll = () => {
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
                                    {sub.content.map((paragraph, pi) => (
                                      <p key={pi} className="text-sm text-muted-foreground leading-relaxed">
                                        {paragraph}
                                      </p>
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
            <p className="text-[10px] text-muted-foreground">1,000,000+ battles simulated · Full AI · ELO Rankings · Live Replay</p>
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

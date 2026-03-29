<p align="center">
  <img src="public/logo.png" alt="Champions Lab" width="280" />
</p>

<h1 align="center">Champions Lab</h1>

<p align="center">
  <strong>A free competitive companion for Pokémon Champions 2026 — built with love by fans, for fans</strong>
</p>

<p align="center">
  <a href="https://championslab.xyz">🌐 Live Site</a> · 
  <a href="https://github.com/Andrew21P/ChampionsLab">📦 GitHub</a> · 
  <a href="#features">✨ Features</a> · 
  <a href="#tech-stack">🛠 Tech Stack</a> · 
  <a href="#contributing">🤝 Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/Price-Free_Forever-brightgreen" alt="Free Forever" />
</p>

---

## ❤️ Why Champions Lab?

This project started the way the best things do — late at night, talking about Pokémon.

We're just fans. We grew up trading cards on the playground, losing to our friends' legendary teams, and eventually falling in love with competitive VGC. When Pokémon Champions 2026 was announced, we knew we wanted to build something for the community — not for profit, not for clout, just because we genuinely love this game and the people who play it.

**Champions Lab is and will always be 100% free.** There are zero ads on the website. No paywalls. No premium tiers. No tracking. No "sign up to unlock." Nothing. Every single feature — the Pokédex, the Team Builder, the 2,000,000-battle simulation engine, the Meta dashboard, PokéSchool — is completely open to everyone.

The code is fully open source. You can read every line, fork it, improve it, break it, fix it, learn from it. If you're a developer, a designer, a data nerd, or just someone who spotted a typo — **come build with us on [GitHub](https://github.com/Andrew21P/ChampionsLab)**. Every contribution matters, and we'll never forget the people who helped make this real.

If you want to support the project financially, you can donate through the website — but honestly, just using Champions Lab, sharing it with a friend, or telling someone "hey, check this out before your next tournament" means the world to us.

Thank you for being here. Thank you for caring about competitive Pokémon. Let's make something great together.

> **Play it now at [championslab.xyz](https://championslab.xyz)**

---

## Features

### 📖 Pokédex
Browse **147 competition-legal Pokémon** (136 base + 11 regional forms) with full stats, abilities, move pools, and tier rankings. Filter by type, generation, tier, or Mega Evolution status. Every Pokémon has a detailed modal with Stats, Moves, Abilities, Usage, and Teams tabs.

### 🧩 Team Builder
Interactive team creation for up to 6 Pokémon with:
- **SP System** — 66 Stat Points per Pokémon (max 32 per stat)
- Move, ability, nature, item, and Tera Type selection
- AI-powered teammate suggestions and set recommendations
- Synergy analysis — role coverage, type overlaps, core pair detection
- Save, load, share (compressed URLs), and Showdown import/export

### ⚔️ Battle Engine
A Monte Carlo doubles battle simulator with VGC-realistic AI:
- 2,000,000+ simulated battles powering the meta rankings
- 242+ moves, 200+ abilities, items, weather, terrain, Trick Room, Tailwind
- Mega Evolution and Tera Type support
- Turn-by-turn battle logs and replays
- 40+ curated meta teams and randomized opponents

### 📊 Meta Analysis
Data-driven competitive dashboard:
- ML-powered Pokémon rankings with ELO and win rates
- Tournament data from 250+ real competitive results
- Core pair analysis from ML simulation and tournament history
- Archetype matchups and move win-rate analysis

### 🎓 PokéSchool
Educational hub covering:
- VGC ruleset (Doubles, Bring 6 Pick 4, Team Preview)
- Role guides — sweeper, wall, pivot, support
- Strategy fundamentals for the Champions format

---

## Tech Stack

| Technology | Purpose |
|:--|:--|
| [Next.js](https://nextjs.org/) | App Router, SSR, static generation |
| [React](https://react.dev/) | UI components |
| [TypeScript](https://www.typescriptlang.org/) | End-to-end type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible component primitives |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/Andrew21P/ChampionsLab.git
cd ChampionsLab/champions-lab

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
champions-lab/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Pokédex
│   │   ├── team-builder/   # Team Builder
│   │   ├── battle-bot/     # Battle Engine
│   │   ├── meta/           # Meta Analysis
│   │   ├── learn/          # PokéSchool
│   │   └── about/          # About & Contact
│   ├── components/         # Reusable UI components
│   └── lib/
│       ├── engine/         # Battle simulation engine
│       ├── pokemon-data.ts # Full roster (147 Pokémon)
│       ├── usage-data.ts   # Competitive set presets
│       └── types.ts        # Shared TypeScript types
├── public/                 # Static assets
└── scripts/                # Data processing utilities
```

---

## Contributing

We'd love to have you. Seriously — Champions Lab is a community project and every bit of help makes it better for everyone.

Whether you're a developer who wants to add a feature, a competitive player who has data to share, a designer with ideas, or someone who just found a bug — **you're welcome here**. No contribution is too small.

1. Fork the [repository](https://github.com/Andrew21P/ChampionsLab)
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a Pull Request

You can also use the **Contact form** on the website to report bugs, suggest features, or just say hi. We read everything.

---

## Support

Champions Lab is free and always will be. If you'd like to support the project, you can donate through the website at [championslab.xyz](https://championslab.xyz). But the best support is using the tools, sharing them with your friends, and helping us improve.

Thank you to everyone who has contributed, reported a bug, shared a team, or just said something nice. This project exists because of you. ❤️

---

## License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ and way too many late nights for the competitive Pokémon community.
  <br />
  100% free. Zero ads. Open source. Forever.
  <br /><br />
  <a href="https://championslab.xyz"><strong>championslab.xyz</strong></a>
</p>

# Math Monsters

A children's math practice game where kids choose a friendly monster companion, answer math questions, earn coins, and evolve their monster through four stages. Built for ages 5-10 with large touch targets, voice narration, and a reward-driven progression system that keeps learning fun.

## Introduction

Math Monsters turns arithmetic drills into an adventure. Each child picks one of four monster characters — Spark, Aqua, Terra, or Zephyr — and takes on 10-question math sessions at their chosen difficulty level. Correct answers earn **Munch Coins** and count toward evolving their monster through four growth stages. Coins can be spent in the **Monster Shop** on hats, accessories, and colour skins that customise the monster's appearance.

The app uses the **Web Speech API** to read every question aloud so pre-readers can play independently. There is no login, no backend, and no data leaves the device — everything is stored in the browser's localStorage.

### Monster Characters

| Monster | Element | Personality |
|---------|---------|-------------|
| **Spark** | Fire | Enthusiastic, loves challenges |
| **Aqua** | Water | Calm, thinks carefully |
| **Terra** | Earth | Strong, never gives up |
| **Zephyr** | Air | Quick, solves problems fast |

### Difficulty Levels

- **Easy (Starter)** — Numbers 1-5, addition and subtraction only
- **Medium (Explorer)** — Numbers 1-10, all four operations (+, −, ×, ÷)
- **Hard (Champion)** — Numbers 1-20, all four operations (+, −, ×, ÷)

On Medium and Hard, players can also choose which operations to practise.

### Progression System

Monsters evolve based on lifetime correct answers:

| Stage | Correct Answers Required |
|-------|--------------------------|
| Stage 1 | 0 – 10 |
| Stage 2 | 11 – 25 |
| Stage 3 | 26 – 50 |
| Stage 4 | 51+ |

Each stage makes the monster visually larger, giving kids a clear sense of growth.

### Munch Coins & Shop

Every correct answer earns **10 Munch Coins**. The shop offers 12 cosmetic items across three categories:

- **Hats** — Crown, Party Hat, Wizard Hat, Pirate Hat
- **Accessories** — Glasses, Bow Tie, Mustache, Scarf
- **Colours** — Rainbow, Golden, Neon, Pastel

Purchased items appear on the monster during gameplay, rewarding consistent practice.

## Tech Stack

- **React** with TypeScript
- **Vite** for development and bundling
- **Tailwind CSS** for styling
- **Web Speech API** for reading questions aloud
- **localStorage** for all persistence (no backend)
- **CSS/SVG only** — no external images

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- npm (included with Node.js)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hayimpapa/week04-mathmonsters.git
   cd week04-mathmonsters
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for Production

```bash
npm run build
```

The output is written to the `dist/` folder and can be served by any static file host.

### Preview the Production Build

```bash
npm run preview
```

## How It Works

### App Flow

```
Monster Selection → Difficulty Selection → [Operation Selection] → Game (10 questions) → Results → Shop → Back to Start
```

1. **Monster Selection** — Pick a companion. The screen shows each monster's current stage and equipped items.
2. **Difficulty Selection** — Choose Easy, Medium, or Hard.
3. **Operation Selection** — (Medium/Hard only) Toggle which operations to practise.
4. **Game Screen** — Answer 10 multiple-choice questions. Each question is read aloud when sound is enabled. Correct and incorrect answers get spoken feedback.
5. **Results Screen** — See the score, a performance message, and earned coins.
6. **Monster Shop** — Spend Munch Coins on cosmetic items.
7. **Session History** — The start screen shows the last 5 session scores.

### Key Logic

- **Question generation** — Random problems are created within the number range for the selected difficulty. Division questions always produce whole-number answers. Four multiple-choice options are generated with plausible distractors.
- **Audio** — The Web Speech API reads each question at a child-friendly pace (0.8× speed, 1.2× pitch). Sound can be toggled on or off from the header.
- **Persistence** — Monster selection, total correct count, coins, owned items, session history, and sound preference are all saved to localStorage so progress survives page reloads.

## Project Structure

```
src/
├── App.tsx                 — Main app, screen routing, header
├── main.tsx                — React entry point
├── types.ts                — TypeScript interfaces
├── data.ts                 — Monster and shop item definitions
├── utils.ts                — localStorage helpers, question generation, speech
├── index.css               — Tailwind CSS imports
└── components/
    ├── MonsterSelector.tsx  — Monster selection screen
    ├── Monster.tsx          — Monster rendering with stages and items
    ├── DifficultySelector.tsx — Difficulty picker
    ├── OperationSelector.tsx  — Operation toggle buttons
    ├── GameScreen.tsx       — 10-question game loop
    ├── ResultsScreen.tsx    — Score display and feedback
    ├── Shop.tsx             — Cosmetic item store
    ├── SessionHistory.tsx   — Recent scores display
    └── AboutBuild.tsx       — App info screen
```

## License

This project is for educational purposes.

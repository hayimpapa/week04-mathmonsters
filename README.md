# Math Monsters

A browser-based maths game for children aged 5–10. Pick a monster, answer 10 questions, earn Munch Coins, and watch your monster grow!

## Getting Started

```bash
npm install
npm run dev
```

## Monster Powers

Each monster plays differently. Choosing a monster is a real strategic decision — not just a cosmetic one.

| Monster | Power | Rule |
|---------|-------|------|
| 🔥 Spark | Streak | Get 3+ correct answers in a row for **double coins**. One wrong answer resets the streak back to zero. |
| 💧 Aqua | Consistency | Score 8 or more out of 10 to earn a **30-coin bonus** at the end of the session. |
| 🪨 Terra | Endurance | Questions 8, 9, and 10 always pay **double coins** — stay strong to the finish! |
| ⚡ Zephyr | Speed | Answer within **5 seconds** for double coins. Quick thinkers win big. |

The current power status is shown in a banner below the progress bar during every game session.

## Features

- 4 monster characters with unique gameplay powers
- Monster evolution across 4 stages based on cumulative correct answers
- 3 difficulty levels: Starter (1–5, + and − only), Explorer (1–10, all ops), Champion (1–20, all ops)
- Selectable operations: + − × ÷
- 10-question sessions with a results screen
- Munch Coins earned per correct answer, stored in localStorage
- Monster Shop with hats, accessories, and colour options (CSS/emoji, no images)
- Session history showing last 5 scores on the start screen
- Questions read aloud via the Web Speech API

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Web Speech API
- localStorage — no login, no backend

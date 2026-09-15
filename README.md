# Family Feud

A party-ready, "Family Feud" style game for a laptop-to-TV setup. Fully
client-side — no backend, no database, no API keys. One host runs the board
from the keyboard while everyone else guesses.

## Features

- Classic Feud board: numbered hidden tiles that flip to reveal an answer and
  its point value
- Two teams with editable names and a running score
- 3-strike system that hands control to the other team for a steal
- Synthesized "ding" (correct) and "buzz" (strike) sound effects — no audio
  files required
- Background music that switches automatically between the menu, gameplay,
  and victory screens, with a mute/volume control always on screen
- Big, high-contrast, TV-readable blue/gold styling
- Two question sets you can mix: a personalized "Custom" set and a generic
  "General" set that works for any crowd

## Getting started

Requires Node.js 18.18+ (or 20+).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a party, open it
fullscreen (F11 in most browsers) on the laptop plugged into the TV.

## Editing the questions

Both question sets live in `data/` as plain typed arrays — no build step:

- `data/customQuestions.ts` — personalized questions. **This ships with
  placeholder content** (a placeholder name and generic situations). Search
  for `EDIT ME` and replace with real details before game night.
- `data/generalQuestions.ts` — ~15 generic questions, ready to play as-is.

See `CLAUDE.md` for the full project structure and the game's state-machine
model if you want to extend the logic.

## Adding music

Drop mp3 files into `public/audio/` named `menu.mp3`, `gameplay.mp3`, and
`victory.mp3` — the game picks them up automatically for the menu, gameplay,
and winner-announcement screens, no code changes needed. See
`public/audio/README.md` for details. A mute button and volume slider sit in
the bottom-right corner on every screen; sound effects briefly duck the music
when they play.

## Hosting the game

Once a question is loaded, the host uses these keyboard shortcuts (also
shown on-screen as buttons):

| Key       | Action                          |
| --------- | -------------------------------- |
| `1`-`6`   | Reveal that ranked answer         |
| `X`       | Register a strike                 |
| `T`       | Switch which team has control (before any reveals/strikes) |
| `A`       | Reveal the whole board            |
| `N` / `Space` | Next question / see results   |
| `R`       | Reset scores                      |

## Deploying to Vercel

### Option A: GitHub + Vercel integration

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the
   repo.
3. Vercel auto-detects Next.js — no configuration or environment variables
   needed. Click **Deploy**.

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel deploy
```

Follow the prompts; run `vercel --prod` (or `vercel deploy --prod`) to push
to production once you're happy with a preview.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # serve the production build locally
npm run lint     # lint
```

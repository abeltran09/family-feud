# CLAUDE.md

Guidance for Claude Code (and future you) when working in this repo.

## What this is

A "Family Feud" style party game, built as a client-only Next.js app. No backend,
no database — designed to be run on a laptop plugged into a TV for a party, with
one person acting as "host" using keyboard shortcuts.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS for styling
- Plain React state (`useReducer` via `hooks/useGame.ts`) — no external state library
- Web Audio API oscillator beeps for sound effects (no audio files/assets)
- Deploy target: Vercel (zero-config, static/SSR hybrid — no env vars needed)

## Structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx           Top-level screen switcher: menu -> game -> end
  globals.css        Tailwind entry + a couple of global keyframes
components/
  MenuScreen.tsx      Team name inputs, question-set picker, Start Game
  GameScreen.tsx      Board + scoreboard + strikes + host controls + keyboard shortcuts
  EndScreen.tsx       Final score, winner, Play Again
  AnswerBoard.tsx     Grid of AnswerCard
  AnswerCard.tsx      Single flip-card (hidden number <-> revealed answer/points)
  ScoreBoard.tsx      Team names/scores + pot + active-team highlight
  StrikeDisplay.tsx   Up to 3 X marks
  MusicControls.tsx   Mute toggle + volume slider, fixed in a corner on every screen
data/
  types.ts             FeudQuestion / QuestionAnswer types
  customQuestions.ts   Personalized question set (has placeholder content — see below)
  generalQuestions.ts  ~15 generic crowd-pleaser questions, always safe to play
hooks/
  useGame.ts          Game state machine (reducer) for one play-through
  useMusic.ts         Background music player (menu/gameplay/victory tracks), mute + volume
lib/
  sounds.ts           playDing() / playBuzz() / playAward() via Web Audio API
  musicTracks.ts      Maps screen -> audio file under public/audio/
  musicBus.ts         Tiny pub/sub so sound effects can "duck" the music briefly
public/audio/         Drop your own mp3 files here (see public/audio/README.md)
```

## Editing questions

Edit `data/customQuestions.ts` and `data/generalQuestions.ts` directly — they're
plain typed arrays of `FeudQuestion`, no build step needed. Keep answers ordered
highest-points-first (that order drives the numbered tiles 1..N on the board).
Points don't have to sum to 100, but keeping them roughly proportional to how
common/obvious an answer is preserves the Feud feel.

**`data/customQuestions.ts` ships with placeholder fiancé details** (name,
hobbies, in-jokes, etc.) since the real specifics weren't provided when this was
scaffolded. Search for `EDIT ME` in that file and swap in real details before
game night.

## Background music

`hooks/useMusic.ts` drives a single shared `<audio>` element; `app/page.tsx`
tells it which track to play whenever the screen changes (menu/gameplay/
victory, see `lib/musicTracks.ts`). No audio files ship with the repo — drop
`menu.mp3`, `gameplay.mp3`, and `victory.mp3` into `public/audio/` (see that
folder's README) and it starts working automatically. Mute state and volume
persist to `localStorage`. The Web Audio sound effects in `lib/sounds.ts`
briefly duck the music volume via `lib/musicBus.ts` when they fire.

## Game logic model

One question = one "round". A round moves through phases:

- `playing` — the active team reveals answers (click a card or press its number
  key). Each reveal adds that answer's points to the pot. 3 wrong guesses
  (strikes) flips to `steal`.
- `steal` — control passes to the *other* team for exactly one guess. A correct
  reveal awards them the whole pot; a strike here awards the pot to the
  original active team instead.
- `done` — round over, pot has been awarded, board can be fully revealed, host
  moves to the next question.

This lives entirely in `hooks/useGame.ts` as a reducer so keyboard shortcuts
(which fire from a `window` keydown listener) can't act on stale state.

## Host keyboard shortcuts (see also the on-screen legend in GameScreen)

- `1`-`6` — reveal that ranked answer
- `X` — register a strike
- `T` — switch which team has control (only before any reveals/strikes)
- `A` — reveal the whole board (skip to done)
- `N` / `Space` — next question
- `R` — reset scores (keeps current question)

## Conventions

- Everything is a client component (`"use client"`) — there's no server data.
- No external fonts/images fetched at runtime; keep it deploy-anywhere and
  offline-friendly for a laptop at a party with spotty wifi.
- Favor big, high-contrast, TV-readable text — this runs fullscreen on a TV via
  HDMI, viewed from across a room.

## Commands

```
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start    # serve the production build locally
```

Deploy: push to GitHub and import the repo in Vercel, or run `vercel deploy`
from this directory. See README.md.

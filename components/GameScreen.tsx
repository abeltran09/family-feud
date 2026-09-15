"use client";

import { useEffect } from "react";
import type { FeudQuestion } from "@/data/types";
import { useGame } from "@/hooks/useGame";
import AnswerBoard from "./AnswerBoard";
import ScoreBoard from "./ScoreBoard";
import StrikeDisplay from "./StrikeDisplay";

interface GameScreenProps {
  teamNames: [string, string];
  questions: FeudQuestion[];
  onExitToMenu: () => void;
  onGameOver: (finalScores: [number, number]) => void;
}

export default function GameScreen({
  teamNames,
  questions,
  onExitToMenu,
  onGameOver,
}: GameScreenProps) {
  const game = useGame(questions);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;

      const numberMatch = e.key.match(/^[1-6]$/);
      if (numberMatch) {
        game.reveal(Number(numberMatch[0]) - 1);
        return;
      }

      switch (e.key.toLowerCase()) {
        case "x":
          game.strike();
          break;
        case "t":
          game.switchTeam();
          break;
        case "a":
          game.revealAll();
          break;
        case "n":
        case " ":
          e.preventDefault();
          if (game.isGameOver) {
            onGameOver(game.scores);
          } else {
            game.nextQuestion();
          }
          break;
        case "r":
          game.resetScores();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [game, onGameOver]);

  if (!game.question) return null;

  return (
    <div className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-4 px-4 py-4 sm:gap-6 sm:py-6">
      <div className="flex items-center justify-between text-white/50">
        <button
          type="button"
          onClick={onExitToMenu}
          className="text-sm underline decoration-white/30 underline-offset-4 hover:text-white/80"
        >
          &larr; Back to menu
        </button>
        <span className="text-sm sm:text-base">
          Question {game.questionIndex + 1} of {game.totalQuestions}
        </span>
      </div>

      <ScoreBoard
        teamNames={teamNames}
        scores={game.scores}
        activeTeam={game.activeTeam}
        phase={game.phase}
        pot={game.pot}
      />

      <h2 className="font-display text-center text-2xl leading-tight text-white sm:text-4xl">
        {game.question.prompt}
      </h2>

      <StrikeDisplay strikes={game.phase === "steal" ? 3 : game.strikes} />

      <AnswerBoard
        question={game.question}
        revealed={game.revealed}
        disabled={game.phase === "done"}
        onReveal={game.reveal}
      />

      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={game.strike}
          disabled={game.phase === "done"}
          className="rounded-full border-2 border-red-500/60 bg-red-600/80 px-5 py-2 font-display text-lg text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Strike (X)
        </button>
        <button
          type="button"
          onClick={game.switchTeam}
          disabled={game.phase !== "playing" || game.strikes > 0}
          className="rounded-full border-2 border-white/30 bg-white/10 px-5 py-2 font-display text-lg text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Switch Team (T)
        </button>
        <button
          type="button"
          onClick={game.revealAll}
          className="rounded-full border-2 border-white/30 bg-white/10 px-5 py-2 font-display text-lg text-white transition hover:bg-white/20"
        >
          Reveal All (A)
        </button>
        {game.isGameOver ? (
          <button
            type="button"
            onClick={() => onGameOver(game.scores)}
            className="rounded-full bg-feud-gold px-6 py-2 font-display text-lg text-feud-blue-dark transition hover:bg-feud-gold-light"
          >
            See Results (N)
          </button>
        ) : (
          <button
            type="button"
            onClick={game.nextQuestion}
            disabled={game.phase !== "done"}
            className="rounded-full bg-feud-gold px-6 py-2 font-display text-lg text-feud-blue-dark transition hover:bg-feud-gold-light disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next Question (N)
          </button>
        )}
        <button
          type="button"
          onClick={game.resetScores}
          className="rounded-full border-2 border-white/30 bg-white/10 px-5 py-2 font-display text-lg text-white transition hover:bg-white/20"
        >
          Reset Scores (R)
        </button>
      </div>

      <p className="mt-auto pt-4 text-center text-xs text-white/40 sm:text-sm">
        Host keys: 1-6 reveal an answer &middot; X strike &middot; T switch team &middot; A reveal
        board &middot; N/Space next question &middot; R reset scores
      </p>
    </div>
  );
}

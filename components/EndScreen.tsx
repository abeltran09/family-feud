"use client";

import Confetti from "./Confetti";
import { useCountUp } from "@/hooks/useCountUp";

interface EndScreenProps {
  teamNames: [string, string];
  finalScores: [number, number];
  onPlayAgain: () => void;
}

function ScoreTally({ target }: { target: number }) {
  const value = useCountUp(target);
  return (
    <span className="font-display text-5xl text-feud-gold sm:text-7xl">
      {value}
    </span>
  );
}

export default function EndScreen({
  teamNames,
  finalScores,
  onPlayAgain,
}: EndScreenProps) {
  const isTie = finalScores[0] === finalScores[1];
  const winnerIndex: 0 | 1 = finalScores[0] > finalScores[1] ? 0 : 1;

  return (
    <div className="relative mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-8 overflow-hidden px-4 py-10 text-center">
      {!isTie && <Confetti />}

      <span className="animate-fade-up text-lg uppercase tracking-widest text-feud-gold/80 sm:text-xl">
        Final Results
      </span>

      {isTie ? (
        <h1 className="font-display animate-pop text-4xl text-white sm:text-6xl">
          It&apos;s a tie!
        </h1>
      ) : (
        <>
          <span
            className="animate-trophy-bounce text-6xl [animation-delay:100ms] sm:text-8xl"
            aria-hidden="true"
          >
            🏆
          </span>
          <h1 className="winner-heading font-display text-4xl text-feud-gold drop-shadow-[0_2px_0_rgba(0,0,0,0.4)] sm:text-6xl">
            {teamNames[winnerIndex]} wins!
          </h1>
        </>
      )}

      <div className="flex w-full items-stretch gap-4 sm:gap-8">
        {teamNames.map((name, i) => (
          <div
            key={i}
            className={`flex flex-1 flex-col items-center rounded-xl border-2 px-4 py-6 transition ${
              !isTie && i === winnerIndex
                ? "border-feud-gold bg-feud-blue-light/60 shadow-[0_0_25px_rgba(244,196,48,0.4)]"
                : "border-white/15 bg-white/5"
            }`}
          >
            <span className="truncate font-display text-xl text-white sm:text-2xl">
              {name}
            </span>
            <ScoreTally target={finalScores[i]} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onPlayAgain}
        className="font-display rounded-full bg-feud-gold px-10 py-4 text-2xl text-feud-blue-dark shadow-lg transition hover:scale-105 hover:bg-feud-gold-light active:scale-95 sm:text-3xl"
      >
        Play Again
      </button>
    </div>
  );
}

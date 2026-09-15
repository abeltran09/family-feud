"use client";

import type { QuestionAnswer } from "@/data/types";

interface AnswerCardProps {
  rank: number;
  answer: QuestionAnswer;
  revealed: boolean;
  disabled: boolean;
  onReveal: () => void;
}

export default function AnswerCard({
  rank,
  answer,
  revealed,
  disabled,
  onReveal,
}: AnswerCardProps) {
  return (
    <button
      type="button"
      onClick={onReveal}
      disabled={revealed || disabled}
      aria-label={
        revealed ? `${answer.text}, ${answer.points} points` : `Answer ${rank}, hidden`
      }
      className="group h-16 w-full [perspective:800px] sm:h-20 md:h-24"
    >
      <div
        className="relative h-full w-full rounded-lg shadow-lg transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front face: hidden tile with rank number */}
        <div className="absolute inset-0 flex items-center justify-between rounded-lg border-2 border-feud-gold/60 bg-gradient-to-b from-feud-blue-light to-feud-blue px-3 [backface-visibility:hidden] sm:px-5">
          <span className="font-display text-2xl text-feud-gold sm:text-4xl">
            {rank}
          </span>
          <span
            className={
              disabled
                ? "text-transparent"
                : "font-display text-2xl text-feud-gold/40 transition group-enabled:group-hover:text-feud-gold sm:text-3xl"
            }
          >
            ?
          </span>
        </div>

        {/* Back face: revealed answer */}
        <div
          className="absolute inset-0 flex items-center justify-between rounded-lg border-2 border-feud-gold bg-gradient-to-b from-feud-gold-light to-feud-gold px-3 sm:px-5"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <span className="font-display truncate text-lg text-feud-blue-dark sm:text-2xl md:text-3xl">
            {answer.text}
          </span>
          <span className="font-display ml-2 shrink-0 text-xl text-feud-blue-dark sm:text-2xl md:text-3xl">
            {answer.points}
          </span>
        </div>
      </div>
    </button>
  );
}

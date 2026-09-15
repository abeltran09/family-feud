"use client";

import type { QuestionSetId } from "@/data/types";

interface MenuScreenProps {
  teamNames: [string, string];
  onTeamNameChange: (team: 0 | 1, name: string) => void;
  questionSetId: QuestionSetId;
  onQuestionSetChange: (id: QuestionSetId) => void;
  questionCounts: Record<QuestionSetId, number>;
  onStart: () => void;
}

const SET_OPTIONS: { id: QuestionSetId; label: string; description: string }[] = [
  {
    id: "custom",
    label: "Brianna's Birthday",
    description: "Personalized birthday questions about the guest of honor",
  },
  {
    id: "general",
    label: "General",
    description: "Classic crowd-pleasers, works for any group",
  },
  {
    id: "mixed",
    label: "Mixed",
    description: "A shuffled combo of both sets",
  },
];

export default function MenuScreen({
  teamNames,
  onTeamNameChange,
  questionSetId,
  onQuestionSetChange,
  questionCounts,
  onStart,
}: MenuScreenProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-8 px-4 py-10 text-center sm:gap-10">
      <div>
        <h1 className="font-display text-5xl tracking-wide text-feud-gold drop-shadow-[0_2px_0_rgba(0,0,0,0.4)] sm:text-7xl">
          Family Feud
        </h1>
        <p className="mt-2 text-white/70 sm:text-lg">
          Set up the teams, pick a question set, and hit start.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {teamNames.map((name, i) => (
          <label key={i} className="flex flex-col gap-2 text-left">
            <span className="text-sm uppercase tracking-wide text-white/60">
              Team {i + 1} name
            </span>
            <input
              value={name}
              onChange={(e) => onTeamNameChange(i as 0 | 1, e.target.value)}
              maxLength={24}
              className="rounded-lg border-2 border-feud-gold/40 bg-feud-blue-dark px-4 py-3 text-lg text-white outline-none focus:border-feud-gold"
              placeholder={`Team ${i + 1}`}
            />
          </label>
        ))}
      </div>

      <div className="w-full">
        <span className="mb-3 block text-sm uppercase tracking-wide text-white/60">
          Question set
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {SET_OPTIONS.map((opt) => {
            const selected = questionSetId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onQuestionSetChange(opt.id)}
                className={`rounded-xl border-2 px-4 py-4 text-left transition ${
                  selected
                    ? "border-feud-gold bg-feud-blue-light/60 shadow-[0_0_20px_rgba(244,196,48,0.3)]"
                    : "border-white/15 bg-white/5 hover:border-white/30"
                }`}
              >
                <div className="font-display text-xl text-white sm:text-2xl">
                  {opt.label}
                </div>
                <div className="mt-1 text-sm text-white/60">
                  {opt.description}
                </div>
                <div className="mt-2 text-xs uppercase tracking-wide text-feud-gold/80">
                  {questionCounts[opt.id]} questions
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="font-display rounded-full bg-feud-gold px-10 py-4 text-2xl text-feud-blue-dark shadow-lg transition hover:scale-105 hover:bg-feud-gold-light active:scale-95 sm:text-3xl"
      >
        Start Game
      </button>
    </div>
  );
}

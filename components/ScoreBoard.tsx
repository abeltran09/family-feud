import type { RoundPhase, TeamIndex } from "@/hooks/useGame";

interface ScoreBoardProps {
  teamNames: [string, string];
  scores: [number, number];
  activeTeam: TeamIndex;
  phase: RoundPhase;
  pot: number;
}

function TeamPanel({
  name,
  score,
  isActive,
  isStealing,
}: {
  name: string;
  score: number;
  isActive: boolean;
  isStealing: boolean;
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center rounded-xl border-2 px-4 py-3 transition sm:py-5 ${
        isActive
          ? "border-feud-gold bg-feud-blue-light/60 shadow-[0_0_20px_rgba(244,196,48,0.35)]"
          : "border-white/10 bg-white/5"
      }`}
    >
      <span className="truncate font-display text-lg text-white sm:text-2xl">
        {name}
      </span>
      <span className="font-display text-4xl text-feud-gold sm:text-6xl">
        {score}
      </span>
      {isStealing && (
        <span className="mt-1 rounded bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
          Steal!
        </span>
      )}
      {isActive && !isStealing && (
        <span className="mt-1 text-xs uppercase tracking-wide text-feud-gold/80 sm:text-sm">
          Playing
        </span>
      )}
    </div>
  );
}

export default function ScoreBoard({
  teamNames,
  scores,
  activeTeam,
  phase,
  pot,
}: ScoreBoardProps) {
  const stealingTeam: TeamIndex = activeTeam === 0 ? 1 : 0;

  return (
    <div className="flex items-stretch gap-3 sm:gap-6">
      <TeamPanel
        name={teamNames[0]}
        score={scores[0]}
        isActive={activeTeam === 0}
        isStealing={phase === "steal" && stealingTeam === 0}
      />

      <div className="flex flex-col items-center justify-center px-2">
        <span className="text-xs uppercase tracking-widest text-white/50 sm:text-sm">
          Pot
        </span>
        <span className="font-display text-3xl text-white sm:text-5xl">
          {pot}
        </span>
      </div>

      <TeamPanel
        name={teamNames[1]}
        score={scores[1]}
        isActive={activeTeam === 1}
        isStealing={phase === "steal" && stealingTeam === 1}
      />
    </div>
  );
}

interface StrikeDisplayProps {
  strikes: number;
  max?: number;
}

export default function StrikeDisplay({ strikes, max = 3 }: StrikeDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length: max }).map((_, i) => {
        const active = i < strikes;
        return (
          <div
            key={i}
            className={`flex h-10 w-10 items-center justify-center rounded-md border-2 font-display text-2xl transition sm:h-14 sm:w-14 sm:text-4xl ${
              active
                ? "animate-shake border-red-400 bg-red-600 text-white"
                : "border-white/20 bg-white/5 text-white/20"
            }`}
          >
            X
          </div>
        );
      })}
    </div>
  );
}

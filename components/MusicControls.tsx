"use client";

interface MusicControlsProps {
  muted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

export default function MusicControls({
  muted,
  volume,
  onToggleMute,
  onVolumeChange,
}: MusicControlsProps) {
  return (
    <div className="fixed bottom-3 right-3 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-feud-blue-dark/80 px-3 py-2 shadow-lg backdrop-blur">
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? "Unmute music" : "Mute music"}
        aria-pressed={muted}
        className="text-lg leading-none text-white/80 transition hover:text-white"
      >
        {muted ? "🔇" : "🔊"}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        aria-label="Music volume"
        className="h-1 w-20 accent-feud-gold sm:w-28"
      />
    </div>
  );
}

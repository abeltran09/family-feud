"use client";

import { useMemo } from "react";

const COLORS = ["#f4c430", "#ffe27a", "#ffffff", "#60a5fa", "#f87171", "#34d399"];

interface ConfettiProps {
  count?: number;
}

export default function Confetti({ count = 60 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.5 + Math.random() * 2,
        color: COLORS[i % COLORS.length],
        width: 6 + Math.random() * 6,
        rotate: Math.random() * 360,
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-confetti-fall rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.width * 0.4,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

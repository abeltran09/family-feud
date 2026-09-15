// Simple synthesized sound effects via the Web Audio API — no audio files to
// host/license. One shared AudioContext, created lazily on first use (browsers
// block autoplay of audio contexts until a user gesture, which host key/click
// presses satisfy).

import { requestDuck } from "./musicBus";

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

function tone(
  frequency: number,
  startTime: number,
  duration: number,
  type: OscillatorType,
  peakGain: number,
) {
  const audioCtx = getContext();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain).connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

/** Pleasant two-note chime for a correct/revealed answer. */
export function playDing() {
  const audioCtx = getContext();
  if (!audioCtx) return;
  requestDuck();
  const now = audioCtx.currentTime;
  tone(880, now, 0.18, "sine", 0.3);
  tone(1318.5, now + 0.1, 0.25, "sine", 0.25);
}

/** Harsh low buzz for a strike/wrong answer. */
export function playBuzz() {
  const audioCtx = getContext();
  if (!audioCtx) return;
  requestDuck();
  const now = audioCtx.currentTime;
  tone(110, now, 0.4, "sawtooth", 0.28);
  tone(98, now, 0.4, "square", 0.12);
}

/** Bright ascending flourish for awarding the pot. */
export function playAward() {
  const audioCtx = getContext();
  if (!audioCtx) return;
  requestDuck();
  const now = audioCtx.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    tone(freq, now + i * 0.09, 0.2, "triangle", 0.22);
  });
}

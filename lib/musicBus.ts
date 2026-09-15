// Tiny pub/sub so the synthesized sound effects (lib/sounds.ts) can ask the
// background music to briefly duck its volume, without either module
// depending on React or on each other directly.

type DuckListener = () => void;

let listeners: DuckListener[] = [];

export function onDuckRequest(listener: DuckListener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function requestDuck() {
  listeners.forEach((listener) => listener());
}

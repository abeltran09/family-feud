import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        feud: {
          blue: {
            DEFAULT: "#0e1f6b",
            dark: "#081341",
            light: "#1e3aa8",
          },
          gold: {
            DEFAULT: "#f4c430",
            light: "#ffe27a",
            dark: "#caa11f",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
      keyframes: {
        "flip-in": {
          "0%": { transform: "rotateY(90deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        "pop": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-6px)" },
          "80%": { transform: "translateX(6px)" },
        },
        "letter-bounce": {
          "0%": { transform: "translateY(-30px) scale(0.6)", opacity: "0" },
          "60%": { transform: "translateY(6px) scale(1.05)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "shine": {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "20%": { transform: "translateX(150%) skewX(-20deg)" },
          "100%": { transform: "translateX(150%) skewX(-20deg)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%": { opacity: "0.9", transform: "scale(1.15)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0.9" },
        },
        "trophy-bounce": {
          "0%": { transform: "scale(0) rotate(-15deg)", opacity: "0" },
          "50%": { transform: "scale(1.3) rotate(8deg)", opacity: "1" },
          "75%": { transform: "scale(0.9) rotate(-4deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        "flip-in": "flip-in 0.35s ease-out",
        "pop": "pop 0.25s ease-out",
        "shake": "shake 0.4s ease-in-out",
        "letter-bounce": "letter-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "fade-up": "fade-up 0.5s ease-out both",
        "shine": "shine 3s ease-in-out infinite",
        "twinkle": "twinkle 2.8s ease-in-out infinite",
        "confetti-fall": "confetti-fall 3s linear forwards",
        "trophy-bounce": "trophy-bounce 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

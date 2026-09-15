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
      },
      animation: {
        "flip-in": "flip-in 0.35s ease-out",
        "pop": "pop 0.25s ease-out",
        "shake": "shake 0.4s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;

import type { FeudQuestion } from "./types";

export const generalQuestions: FeudQuestion[] = [
  {
    id: "general-01",
    prompt: "What are the best movies of 2026 so far?",
    answers: [
      { text: "The ODYSSEY", points: 34 },
      { text: "HAIL MARY", points: 26 },
      { text: "SPIDERMAN BRAND NEW DAY", points: 18 },
      { text: "OBSESSION", points: 14 },
      { text: "The Invite", points: 8 },
    ],
  },
  {
    id: "general-02",
    prompt: "What are the top hobbies that emerged during covid lockdown?",
    answers: [
      { text: "Reading", points: 32 },
      { text: "Cooking and Baking", points: 24 },
      { text: "Exercise", points: 18 },
      { text: "Video games", points: 16 },
      { text: "Home Improvment", points: 10 },
    ],
  },
  {
    id: "general-03",
    prompt: "Name stores that went out of business you never thought would have?",
    answers: [
      { text: "Sears", points: 30 },
      { text: "Toys R Us", points: 26 },
      { text: "Blockbuster", points: 18 },
      { text: "Bed Bath and Beyond", points: 16 },
      { text: "Party City", points: 10 },
    ],
  },
  {
    id: "general-04",
    prompt: "Name a food that is hard to eat neatly?",
    answers: [
      { text: "Seafood boil", points: 38 },
      { text: "BBQ Ribs", points: 24 },
      { text: "Tacos", points: 18 },
      { text: "Chicken wings", points: 12 },
      { text: "Spaghetti", points: 8 },
    ],
  },
  {
    id: "general-05",
    prompt: "Name a classic board game that has ruined friendships?",
    answers: [
      { text: "Monopoly", points: 36 },
      { text: "Uno", points: 26 },
      { text: "Risk", points: 18 },
      { text: "Sorry!", points: 12 },
      { text: "The Game of Life", points: 8 },
    ],
  },
  {
    id: "general-06",
    prompt: "Name a famous animated dog?",
    answers: [
      { text: "Snoopy", points: 30 },
      { text: "Scooby-Doo", points: 24 },
      { text: "Clifford", points: 20 },
      { text: "Pluto", points: 16 },
      { text: "Dug", points: 10 },
    ],
  },
];

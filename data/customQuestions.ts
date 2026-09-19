import type { FeudQuestion } from "./types";

// EDIT ME: This whole file is placeholder content for a birthday-themed
// round about your fiancée. The name "Alex" and every situation/answer below
// is a generic stand-in — swap them for real details about her (personality,
// hobbies, quirks, favorite things) before game night. Keep 4-6 answers per
// question, ranked highest-points-first; points don't need to sum to 100 but
// should roughly reflect how "obvious"/common each answer would be to your
// guests.

const HER_NAME = "Brianna"; // EDIT ME: replace with her real name everywhere below

export const customQuestions: FeudQuestion[] = [
  {
    id: "custom-01",
    prompt: `We Surveyed 1 ${HER_NAME}. What are her top 5 french fries?`,
    answers: [
      { text: `Popeyes`, points: 38 },
      { text: `Wendys`, points: 27 },
      { text: `Chick-fil-a`, points: 18 },
      { text: `Wingstop`, points: 12 },
      { text: `McDonalds`, points: 5 },
    ],
  },
  {
    id: "custom-02",
    prompt: `We Surveyed 1 ${HER_NAME}. What are her top 5 favorite Movies?`,
    answers: [
      { text: `Nightmare Before Christmas`, points: 35 },
      { text: `Coraline`, points: 25 },
      { text: `Crazy Rich Asians`, points: 20 },
      { text: `Corpse Bride`, points: 12 },
      { text: `Lego Movie`, points: 8 },
    ],
  },
  {
    id: "custom-03",
    prompt: `We Surveyed 1 ${HER_NAME}. What are her top 5 favorite foods?`,
    answers: [
      { text: `Carne guisada`, points: 30 },
      { text: `Flautas de Yasmin`, points: 24 },
      { text: `Tamales de grandma`, points: 20 },
      { text: `Chicken alfredo`, points: 16 },
      { text: `Drunken noodles`, points: 10 },
    ],
  },
  {
    id: "custom-04",
    prompt: `We Surveyed 1 ${HER_NAME}. What are her top 5 things in her bucket list?`,
    answers: [
      { text: `Go to Greece`, points: 32 },
      { text: `Publicly sing the national anthem`, points: 26 },
      { text: `See a NY subway rat`, points: 20 },
      { text: `Sue someone`, points: 14 },
      { text: `Be on Survivor`, points: 8 },
    ],
  },
  {
    id: "custom-05",
    prompt: `Name something ${HER_NAME} would love to get as a birthday gift.`,
    answers: [
      { text: `1 year of free gas (for her car)`, points: 30 },
      { text: `A pet octopus`, points: 24 },
      { text: `Tickets to see Hamilton on Broadway`, points: 20 },
      { text: `Curtains`, points: 16 },
      { text: `Something fuzy/cozy`, points: 10 },
    ],
  },
];

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
      { text: `"I'm fine."`, points: 38 },
      { text: `A long sigh, no words`, points: 27 },
      { text: `"One sec, let me think."`, points: 18 },
      { text: `"We'll figure it out."`, points: 12 },
      { text: `Starts cleaning something`, points: 5 },
    ],
  },
  {
    id: "custom-02",
    prompt: `We Surveyed 1 ${HER_NAME}. What are her top 5 favorite Movies?`,
    answers: [
      { text: `Mac and cheese`, points: 35 },
      { text: `Pizza`, points: 25 },
      { text: `Ice cream`, points: 20 },
      { text: `Her mom's cooking`, points: 12 },
      { text: `Chips and salsa`, points: 8 },
    ],
  },
  {
    id: "custom-03",
    prompt: `We Surveyed 1 ${HER_NAME}. What are her top 5 favorite foods?`,
    answers: [
      { text: `Leaves cabinet doors open`, points: 30 },
      { text: `Narrates what she's doing out loud`, points: 24 },
      { text: `Shows up "5 minutes late" (it's never 5 minutes)`, points: 20 },
      { text: `Rewatches the same show for the 10th time`, points: 16 },
      { text: `Falls asleep during every movie`, points: 10 },
    ],
  },
  {
    id: "custom-04",
    prompt: `We Surveyed 1 ${HER_NAME}. What are her top 5 things in her bucket list?`,
    answers: [
      { text: `Cooking/baking`, points: 32 },
      { text: `Hiking / the outdoors`, points: 26 },
      { text: `Video games`, points: 20 },
      { text: `Music (playing or collecting)`, points: 14 },
      { text: `Sports`, points: 8 },
    ],
  },
  {
    id: "custom-05",
    prompt: `Name something ${HER_NAME} would love to get as a birthday gift.`,
    answers: [
      { text: `Something from her wishlist`, points: 30 },
      { text: `A spa day / self-care gift`, points: 24 },
      { text: `Concert or event tickets`, points: 20 },
      { text: `A handwritten card/letter`, points: 16 },
      { text: `A surprise trip`, points: 10 },
    ],
  },
];

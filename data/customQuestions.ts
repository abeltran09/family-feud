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
    prompt: `Name something ${HER_NAME} always says when she's stressed.`,
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
    prompt: `Name ${HER_NAME}'s go-to comfort food.`,
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
    prompt: `Name something ${HER_NAME} does that drives everyone (lovingly) crazy.`,
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
    prompt: `Name a hobby ${HER_NAME} could talk about for hours.`,
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
  {
    id: "custom-06",
    prompt: `Name a place ${HER_NAME} would love to be dropped off right now.`,
    answers: [
      { text: `The beach`, points: 30 },
      { text: `A hiking trail`, points: 24 },
      { text: `A cozy coffee shop`, points: 20 },
      { text: `Somewhere in Europe`, points: 16 },
      { text: `Home, on the couch`, points: 10 },
    ],
  },
  {
    id: "custom-07",
    prompt: `Name a word or phrase ${HER_NAME}'s friends always use to describe her.`,
    answers: [
      { text: `"Hilarious"`, points: 30 },
      { text: `"The mom friend"`, points: 24 },
      { text: `"Always down for anything"`, points: 20 },
      { text: `"Stubborn (in a good way)"`, points: 16 },
      { text: `"The planner"`, points: 10 },
    ],
  },
  {
    id: "custom-08",
    prompt: `Name something ${HER_NAME} would pack first for a weekend trip.`,
    answers: [
      { text: `Phone charger`, points: 32 },
      { text: `Snacks`, points: 24 },
      { text: `A specific pillow`, points: 18 },
      { text: `Way too many outfit options`, points: 16 },
      { text: `Sunglasses`, points: 10 },
    ],
  },
  {
    id: "custom-09",
    prompt: `Name a movie or show ${HER_NAME} has forced everyone to watch.`,
    answers: [
      { text: `Her all-time favorite comfort movie`, points: 30 },
      { text: `A show she finished in one weekend`, points: 25 },
      { text: `Something from her childhood`, points: 20 },
      { text: `A documentary out of nowhere`, points: 15 },
      { text: `A guilty-pleasure reality show`, points: 10 },
    ],
  },
  {
    id: "custom-10",
    prompt: `Name something ${HER_NAME} is weirdly competitive about.`,
    answers: [
      { text: `Board games`, points: 35 },
      { text: `Trivia`, points: 25 },
      { text: `Driving the fastest route`, points: 18 },
      { text: `Who loads the dishwasher "correctly"`, points: 13 },
      { text: `Sports (playing or watching)`, points: 9 },
    ],
  },
];

export interface QuestionAnswer {
  /** Displayed once revealed. Keep it short — this is read from across a room. */
  text: string;
  /** Points awarded for this answer. Order answers highest-to-lowest points. */
  points: number;
}

export interface FeudQuestion {
  id: string;
  /** The survey-style prompt, e.g. "Name something people do at a birthday party." */
  prompt: string;
  /** Ranked highest points first. 4-6 answers is the sweet spot for a board. */
  answers: QuestionAnswer[];
}

export type QuestionSetId = "custom" | "general" | "mixed";

export interface QuestionSet {
  id: QuestionSetId;
  name: string;
  description: string;
  questions: FeudQuestion[];
}

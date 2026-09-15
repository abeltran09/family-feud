"use client";

import { useCallback, useMemo, useReducer } from "react";
import type { FeudQuestion } from "@/data/types";
import { playAward, playBuzz, playDing } from "@/lib/sounds";

export type RoundPhase = "playing" | "steal" | "done";
export type TeamIndex = 0 | 1;

interface GameState {
  questions: FeudQuestion[];
  questionIndex: number;
  revealed: boolean[];
  pot: number;
  strikes: number;
  activeTeam: TeamIndex;
  phase: RoundPhase;
  scores: [number, number];
  /** Which team the pot was most recently awarded to, for a brief UI flash. */
  lastAward: TeamIndex | null;
}

type Action =
  | { type: "REVEAL"; index: number }
  | { type: "STRIKE" }
  | { type: "SWITCH_TEAM" }
  | { type: "REVEAL_ALL" }
  | { type: "NEXT_QUESTION" }
  | { type: "RESET_SCORES" };

function initialState(questions: FeudQuestion[]): GameState {
  return {
    questions,
    questionIndex: 0,
    revealed: questions.length ? questions[0].answers.map(() => false) : [],
    pot: 0,
    strikes: 0,
    activeTeam: 0,
    phase: "playing",
    scores: [0, 0],
    lastAward: null,
  };
}

function reducer(state: GameState, action: Action): GameState {
  const question = state.questions[state.questionIndex];

  switch (action.type) {
    case "REVEAL": {
      if (state.phase === "done") return state;
      if (state.revealed[action.index]) return state;
      if (!question || !question.answers[action.index]) return state;

      const revealed = [...state.revealed];
      revealed[action.index] = true;
      const pot = state.pot + question.answers[action.index].points;

      if (state.phase === "steal") {
        const stealingTeam: TeamIndex = state.activeTeam === 0 ? 1 : 0;
        const scores: [number, number] = [...state.scores];
        scores[stealingTeam] += pot;
        return {
          ...state,
          revealed,
          pot,
          scores,
          phase: "done",
          lastAward: stealingTeam,
        };
      }

      // phase === "playing"
      const allRevealed = revealed.every(Boolean);
      if (allRevealed) {
        const scores: [number, number] = [...state.scores];
        scores[state.activeTeam] += pot;
        return {
          ...state,
          revealed,
          pot,
          scores,
          phase: "done",
          lastAward: state.activeTeam,
        };
      }

      return { ...state, revealed, pot };
    }

    case "STRIKE": {
      if (state.phase === "done") return state;

      if (state.phase === "steal") {
        const scores: [number, number] = [...state.scores];
        scores[state.activeTeam] += state.pot;
        return { ...state, phase: "done", lastAward: state.activeTeam };
      }

      // phase === "playing"
      const strikes = Math.min(state.strikes + 1, 3);
      if (strikes >= 3) {
        return { ...state, strikes, phase: "steal" };
      }
      return { ...state, strikes };
    }

    case "SWITCH_TEAM": {
      if (state.phase !== "playing" || state.strikes > 0) return state;
      return { ...state, activeTeam: state.activeTeam === 0 ? 1 : 0 };
    }

    case "REVEAL_ALL": {
      if (!question) return state;
      return {
        ...state,
        revealed: question.answers.map(() => true),
        phase: "done",
      };
    }

    case "NEXT_QUESTION": {
      if (state.phase !== "done") return state;
      const nextIndex = state.questionIndex + 1;
      const nextQuestion = state.questions[nextIndex];
      if (!nextQuestion) return state;
      return {
        ...state,
        questionIndex: nextIndex,
        revealed: nextQuestion.answers.map(() => false),
        pot: 0,
        strikes: 0,
        phase: "playing",
        activeTeam: state.activeTeam === 0 ? 1 : 0,
        lastAward: null,
      };
    }

    case "RESET_SCORES": {
      return { ...state, scores: [0, 0], lastAward: null };
    }

    default:
      return state;
  }
}

export function useGame(questions: FeudQuestion[]) {
  const [state, dispatch] = useReducer(reducer, questions, initialState);

  const question = state.questions[state.questionIndex] as
    | FeudQuestion
    | undefined;
  const isLastQuestion = state.questionIndex >= state.questions.length - 1;
  const isGameOver = isLastQuestion && state.phase === "done";

  const reveal = useCallback(
    (index: number) => {
      if (state.phase === "done") return;
      if (state.revealed[index]) return;
      const willCompleteRound =
        state.phase === "steal" ||
        state.revealed.filter((r) => !r).length === 1;
      dispatch({ type: "REVEAL", index });
      if (willCompleteRound) {
        playAward();
      } else {
        playDing();
      }
    },
    [state.phase, state.revealed],
  );

  const strike = useCallback(() => {
    if (state.phase === "done") return;
    playBuzz();
    dispatch({ type: "STRIKE" });
  }, [state.phase]);

  const switchTeam = useCallback(() => dispatch({ type: "SWITCH_TEAM" }), []);
  const revealAll = useCallback(() => dispatch({ type: "REVEAL_ALL" }), []);
  const nextQuestion = useCallback(
    () => dispatch({ type: "NEXT_QUESTION" }),
    [],
  );
  const resetScores = useCallback(() => dispatch({ type: "RESET_SCORES" }), []);

  return useMemo(
    () => ({
      question,
      questionIndex: state.questionIndex,
      totalQuestions: state.questions.length,
      revealed: state.revealed,
      pot: state.pot,
      strikes: state.strikes,
      activeTeam: state.activeTeam,
      phase: state.phase,
      scores: state.scores,
      lastAward: state.lastAward,
      isLastQuestion,
      isGameOver,
      reveal,
      strike,
      switchTeam,
      revealAll,
      nextQuestion,
      resetScores,
    }),
    [
      question,
      state.questionIndex,
      state.questions.length,
      state.revealed,
      state.pot,
      state.strikes,
      state.activeTeam,
      state.phase,
      state.scores,
      state.lastAward,
      isLastQuestion,
      isGameOver,
      reveal,
      strike,
      switchTeam,
      revealAll,
      nextQuestion,
      resetScores,
    ],
  );
}

export type UseGameReturn = ReturnType<typeof useGame>;

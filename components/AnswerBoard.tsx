"use client";

import type { FeudQuestion } from "@/data/types";
import AnswerCard from "./AnswerCard";

interface AnswerBoardProps {
  question: FeudQuestion;
  revealed: boolean[];
  disabled: boolean;
  onReveal: (index: number) => void;
}

export default function AnswerBoard({
  question,
  revealed,
  disabled,
  onReveal,
}: AnswerBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {question.answers.map((answer, index) => (
        <AnswerCard
          key={question.id + index}
          rank={index + 1}
          answer={answer}
          revealed={revealed[index]}
          disabled={disabled}
          onReveal={() => onReveal(index)}
        />
      ))}
    </div>
  );
}

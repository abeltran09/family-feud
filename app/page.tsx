"use client";

import { useEffect, useMemo, useState } from "react";
import EndScreen from "@/components/EndScreen";
import GameScreen from "@/components/GameScreen";
import MenuScreen from "@/components/MenuScreen";
import MusicControls from "@/components/MusicControls";
import { customQuestions } from "@/data/customQuestions";
import { generalQuestions } from "@/data/generalQuestions";
import type { FeudQuestion, QuestionSetId } from "@/data/types";
import { useMusic } from "@/hooks/useMusic";

type Screen = "menu" | "game" | "end";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function questionsForSet(id: QuestionSetId): FeudQuestion[] {
  switch (id) {
    case "custom":
      return customQuestions;
    case "general":
      return generalQuestions;
    case "mixed":
      return shuffle([...customQuestions, ...generalQuestions]);
  }
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [teamNames, setTeamNames] = useState<[string, string]>([
    "Team 1",
    "Team 2",
  ]);
  const [questionSetId, setQuestionSetId] = useState<QuestionSetId>("custom");
  const [activeQuestions, setActiveQuestions] = useState<FeudQuestion[]>(
    customQuestions,
  );
  const [gameKey, setGameKey] = useState(0);
  const [finalScores, setFinalScores] = useState<[number, number]>([0, 0]);

  const music = useMusic();

  useEffect(() => {
    if (screen === "menu") music.play("menu");
    else if (screen === "game") music.play("gameplay");
    else if (screen === "end") music.play("victory");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, music.play]);

  const questionCounts = useMemo(
    () => ({
      custom: customQuestions.length,
      general: generalQuestions.length,
      mixed: customQuestions.length + generalQuestions.length,
    }),
    [],
  );

  function handleTeamNameChange(team: 0 | 1, name: string) {
    setTeamNames((prev) => {
      const next: [string, string] = [...prev];
      next[team] = name;
      return next;
    });
  }

  function handleStart() {
    setActiveQuestions(questionsForSet(questionSetId));
    setGameKey((k) => k + 1);
    setScreen("game");
  }

  function handleGameOver(scores: [number, number]) {
    setFinalScores(scores);
    setScreen("end");
  }

  function handlePlayAgain() {
    setScreen("menu");
  }

  const displayTeamNames: [string, string] = [
    teamNames[0].trim() || "Team 1",
    teamNames[1].trim() || "Team 2",
  ];

  let content;
  if (screen === "game") {
    content = (
      <GameScreen
        key={gameKey}
        teamNames={displayTeamNames}
        questions={activeQuestions}
        onExitToMenu={() => setScreen("menu")}
        onGameOver={handleGameOver}
      />
    );
  } else if (screen === "end") {
    content = (
      <EndScreen
        teamNames={displayTeamNames}
        finalScores={finalScores}
        onPlayAgain={handlePlayAgain}
      />
    );
  } else {
    content = (
      <MenuScreen
        teamNames={teamNames}
        onTeamNameChange={handleTeamNameChange}
        questionSetId={questionSetId}
        onQuestionSetChange={setQuestionSetId}
        questionCounts={questionCounts}
        onStart={handleStart}
      />
    );
  }

  return (
    <>
      {content}
      <MusicControls
        muted={music.muted}
        volume={music.volume}
        onToggleMute={music.toggleMute}
        onVolumeChange={music.setVolume}
      />
    </>
  );
}

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { questions } from "../data/questions";

export type Density = "compact" | "comfortable" | "spacious";

export type AnswerValue = string | boolean | undefined;
export type Answers = Record<number, AnswerValue>;

interface AssessmentContextValue {
  answers: Answers;
  setAnswer: (id: number, value: AnswerValue) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  density: Density;
  setDensity: (density: Density) => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  answeredCount: number;
  totalCount: number;
  progressPercent: number;
  isAnswered: (id: number) => boolean;
}

const AssessmentContext = createContext<AssessmentContextValue | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [density, setDensity] = useState<Density>("comfortable");
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (id: number, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isAnswered = (id: number) => {
    const value = answers[id];
    if (typeof value === "boolean") return true;
    return typeof value === "string" && value.trim().length > 0;
  };

  const answeredCount = useMemo(
    () => questions.filter((q) => isAnswered(q.id)).length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers]
  );

  const totalCount = questions.length;
  const progressPercent = Math.round((answeredCount / totalCount) * 100);

  const value: AssessmentContextValue = {
    answers,
    setAnswer,
    currentIndex,
    setCurrentIndex,
    density,
    setDensity,
    submitted,
    setSubmitted,
    answeredCount,
    totalCount,
    progressPercent,
    isAnswered,
  };

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}

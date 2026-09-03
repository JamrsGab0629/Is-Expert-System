import { questions } from "../data/questions";
import type { Answers } from "../context/AssessmentContext";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:5000";

export type Severity = "low" | "moderate" | "high";

export interface RiskFlag {
  category: string;
  severity: Severity;
  message: string;
}

export interface Recommendation {
  for: string;
  text: string;
}

export interface OverallRisk {
  level: Severity;
  high_count: number;
  moderate_count: number;
  low_count: number;
}

export interface AssessmentResult {
  overall_risk: OverallRisk;
  risk_flags: RiskFlag[];
  recommendations: Recommendation[];
  descriptive: Record<string, string>;
}

export class AssessmentSubmitError extends Error {}

export async function submitAssessment(answers: Answers): Promise<AssessmentResult> {
  const payload = {
    answers: questions.map((q) => ({
      questionId: q.id,
      type: q.type,
      answer: answers[q.id] ?? null,
    })),
  };

  let response: Response;
  try {
    response = await fetch(`${API_URL}/assess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new AssessmentSubmitError(
      "Couldn't reach the assessment service. Make sure the backend is running."
    );
  }

  if (!response.ok) {
    throw new AssessmentSubmitError(
      `The assessment service returned an error (${response.status}).`
    );
  }

  return (await response.json()) as AssessmentResult;
}

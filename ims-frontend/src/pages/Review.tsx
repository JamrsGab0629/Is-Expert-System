import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { useAssessment } from "../context/AssessmentContext";
import { getDensityScale } from "../lib/density";

function formatAnswer(value: unknown): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" && value.trim().length > 0) return value;
  return "";
}

export default function Review() {
  const navigate = useNavigate();
  const { answers, answeredCount, totalCount, submitted, setSubmitted, density } =
    useAssessment();
  const scale = getDensityScale(density);

  if (submitted) {
    return (
      <div className="max-w-content animate-fade-in">
        <p className="text-xs font-medium text-ink-faint">Assessment</p>
        <h1 className="font-serif text-2xl sm:text-3xl text-ink mt-2">
          Assessment Completed
        </h1>
        <p className="text-ink-soft mt-3">Your responses have been recorded.</p>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-8 inline-flex items-center bg-accent text-paper text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-accent-hover transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const allAnswered = answeredCount === totalCount;

  return (
    <div className="max-w-wide animate-fade-in">
      <p className="text-xs font-medium text-ink-faint">Assessment</p>
      <h1 className="font-serif text-2xl sm:text-3xl text-ink mt-2">Review Assessment</h1>
      <p className="text-ink-soft mt-2 max-w-content">
        Check your responses below before submitting. You can edit any answer.
      </p>

      {!allAnswered && (
        <p className="text-sm text-rust mt-4">
          {totalCount - answeredCount} question
          {totalCount - answeredCount === 1 ? "" : "s"} still need{" "}
          {totalCount - answeredCount === 1 ? "s" : ""} an answer.
        </p>
      )}

      <div className={`mt-10 divide-y divide-line`}>
        {questions.map((q) => {
          const answer = formatAnswer(answers[q.id]);
          return (
            <div key={q.id} className={`${scale.rowPadding} sm:flex sm:items-start sm:gap-6`}>
              <span className="text-ink-faint text-sm tabular-nums sm:w-8 shrink-0">
                {String(q.id).padStart(2, "0")}
              </span>
              <div className="flex-1 mt-1 sm:mt-0">
                <p className="text-sm text-ink-soft">{q.prompt}</p>
                <p
                  className={`mt-1.5 text-sm ${
                    answer ? "text-ink" : "text-ink-faint italic"
                  }`}
                >
                  {answer || "No answer provided"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/assessment?q=${q.id}`)}
                className="text-sm text-accent hover:text-accent-hover mt-2 sm:mt-0 shrink-0"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-line mt-8 pt-6">
        <button
          type="button"
          onClick={() => navigate("/assessment")}
          className="text-sm font-medium text-ink-soft hover:text-ink px-4 py-2 border border-line rounded-sm transition-colors"
        >
          Back to Assessment
        </button>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="text-sm font-medium text-paper bg-accent hover:bg-accent-hover px-5 py-2 rounded-sm transition-colors"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
}
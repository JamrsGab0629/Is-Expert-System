import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { useAssessment } from "../context/AssessmentContext";
import { getDensityScale } from "../lib/density";

const TYPE_LABEL: Record<string, string> = {
  select: "Select",
  radio: "Single choice",
  boolean: "Yes / No",
  text: "Short answer",
  textarea: "Long answer",
};

export default function QuestionBank() {
  const navigate = useNavigate();
  const { isAnswered, density } = useAssessment();
  const scale = getDensityScale(density);

  const openQuestion = (id: number) => {
    navigate(`/assessment?q=${id}`);
  };

  return (
    <div className="max-w-wide animate-fade-in">
      <p className="text-xs font-medium text-ink-faint">Reference</p>
      <h1 className="font-serif text-2xl sm:text-3xl text-ink mt-2">Question Bank</h1>
      <p className="text-ink-soft mt-2 max-w-content">
        Browse every question in the assessment. Select one to open it directly.
      </p>

      <ul className="mt-10 divide-y divide-line">
        {questions.map((q) => (
          <li key={q.id}>
            <button
              type="button"
              onClick={() => openQuestion(q.id)}
              className={`w-full text-left flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 hover:bg-paper-alt transition-colors px-2 -mx-2 rounded-sm ${scale.rowPadding}`}
            >
              <span className="text-ink-faint text-sm tabular-nums sm:w-8 shrink-0">
                {String(q.id).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{q.title}</p>
                <p className="text-sm text-ink-soft mt-0.5">{q.prompt}</p>
              </div>
              <div className="flex items-center gap-3 sm:w-40 shrink-0 sm:justify-end">
                <span className="text-xs text-ink-faint">{TYPE_LABEL[q.type]}</span>
                <span
                  className={`text-xs ${
                    isAnswered(q.id) ? "text-moss" : "text-ink-faint"
                  }`}
                >
                  {isAnswered(q.id) ? "Answered" : "Unanswered"}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

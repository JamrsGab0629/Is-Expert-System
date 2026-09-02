import { questions } from "../data/questions";
import { useAssessment } from "../context/AssessmentContext";

interface Props {
  onSelect: (index: number) => void;
  className?: string;
}

export default function QuestionStatusList({ onSelect, className = "" }: Props) {
  const { currentIndex, isAnswered } = useAssessment();

  return (
    <ol className={className}>
      {questions.map((q, i) => {
        const answered = isAnswered(q.id);
        const current = i === currentIndex;
        return (
          <li key={q.id}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={current ? "step" : undefined}
              className={`w-full flex items-center gap-3 text-left py-2 border-l-2 pl-3 -ml-px text-sm transition-colors ${
                current
                  ? "border-accent text-ink font-medium"
                  : answered
                  ? "border-line-soft text-ink-soft hover:border-ink-faint"
                  : "border-transparent text-ink-faint hover:border-line"
              }`}
            >
              <span className="tabular-nums w-6 shrink-0">
                {String(q.id).padStart(2, "0")}
              </span>
              <span className="truncate flex-1">{q.title}</span>
              <span className="text-xs shrink-0">
                {current ? "Current" : answered ? "Answered" : ""}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

import type { Question } from "../data/questions";
import type { AnswerValue } from "../context/AssessmentContext";
import { getDensityScale } from "../lib/density";
import type { Density } from "../context/AssessmentContext";

interface Props {
  question: Question;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
  density: Density;
}

export default function QuestionField({ question, value, onChange, density }: Props) {
  const scale = getDensityScale(density);

  if (question.type === "radio") {
    return (
      <fieldset>
        <legend className="sr-only">{question.prompt}</legend>
        <div className={`flex flex-col ${scale.fieldGap}`}>
          {question.options?.map((option) => {
            const checked = value === option;
            return (
              <label
                key={option}
                className={`flex items-center gap-3 border rounded-sm cursor-pointer transition-colors ${scale.optionPadding} ${
                  checked
                    ? "border-accent bg-accent-tint"
                    : "border-line hover:border-ink-faint"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={option}
                  checked={checked}
                  onChange={() => onChange(option)}
                  className="h-4 w-4 accent-[#33524D]"
                />
                <span className="text-sm text-ink">{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }

  if (question.type === "boolean") {
    return (
      <div className={`flex ${scale.fieldGap}`} role="radiogroup" aria-label={question.prompt}>
        {(["Yes", "No"] as const).map((option) => {
          const boolValue = option === "Yes";
          const checked = value === boolValue;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => onChange(boolValue)}
              className={`flex-1 border rounded-sm text-sm font-medium transition-colors ${scale.optionPadding} ${
                checked
                  ? "border-accent bg-accent-tint text-ink"
                  : "border-line text-ink-soft hover:border-ink-faint"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    );
  }

  if (question.type === "select") {
    return (
      <select
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line rounded-sm px-4 py-3 text-sm text-ink bg-paper focus:border-accent"
      >
        <option value="" disabled>
          Select an option
        </option>
        {question.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (question.type === "textarea") {
    return (
      <textarea
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={5}
        className="w-full border border-line rounded-sm px-4 py-3 text-sm text-ink bg-paper focus:border-accent placeholder:text-ink-faint resize-y"
      />
    );
  }

  return (
    <input
      type="text"
      value={(value as string) ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      className="w-full border border-line rounded-sm px-4 py-3 text-sm text-ink bg-paper focus:border-accent placeholder:text-ink-faint"
    />
  );
}

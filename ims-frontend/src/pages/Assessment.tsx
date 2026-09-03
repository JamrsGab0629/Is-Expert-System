import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { questions } from "../data/questions";
import { useAssessment } from "../context/AssessmentContext";
import { getDensityScale } from "../lib/density";
import QuestionField from "../components/QuestionField";
import QuestionStatusList from "../components/QuestionStatusList";

export default function Assessment() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { answers, setAnswer, currentIndex, setCurrentIndex, density, totalCount, submitted, resetAssessment } =
    useAssessment();
  const scale = getDensityScale(density);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (submitted) {
      resetAssessment();
    }
    const qParam = searchParams.get("q");
    if (qParam) {
      const idx = questions.findIndex((q) => q.id === Number(qParam));
      if (idx >= 0) setCurrentIndex(idx);
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const question = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalCount - 1;

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setShowList(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:gap-16">
        <div className="flex-1 max-w-content">
          <p className="text-xs font-medium text-ink-faint tracking-wide">
            Information Management Assessment
          </p>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-ink-soft mb-2">
              <span>
                Question {currentIndex + 1} of {totalCount}
              </span>
              <button
                type="button"
                onClick={() => setShowList((s) => !s)}
                className="lg:hidden text-accent hover:text-accent-hover"
              >
                {showList ? "Hide list" : "Question list"}
              </button>
            </div>
            <div className="h-px bg-line-soft w-full relative">
              <div
                className="h-px bg-accent absolute left-0 top-0 transition-all"
                style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
              />
            </div>
          </div>

          {showList && (
            <div className="lg:hidden mt-4 border border-line rounded-sm px-4 py-2">
              <QuestionStatusList onSelect={goTo} />
            </div>
          )}

          <div className={scale.sectionGap.replace("space-y", "mt")}>
            <h1 className="font-serif text-2xl sm:text-3xl text-ink leading-snug mt-8">
              {question.prompt}
            </h1>

            <div className="mt-6">
              <QuestionField
                question={question}
                value={answers[question.id]}
                onChange={(value) => setAnswer(question.id, value)}
                density={density}
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line mt-10 pt-6">
            <button
              type="button"
              onClick={() => (isFirst ? navigate("/dashboard") : goTo(currentIndex - 1))}
              className="text-sm font-medium text-ink-soft hover:text-ink px-4 py-2 border border-line rounded-sm transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => (isLast ? navigate("/review") : goTo(currentIndex + 1))}
              className="text-sm font-medium text-paper bg-accent hover:bg-accent-hover px-5 py-2 rounded-sm transition-colors"
            >
              {isLast ? "Review Answers" : "Next"}
            </button>
          </div>
        </div>

        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <p className="text-xs font-medium text-ink-faint mb-3">Questions</p>
          <QuestionStatusList onSelect={goTo} />
        </aside>
      </div>
    </div>
  );
}

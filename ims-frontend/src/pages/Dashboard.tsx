import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { answeredCount, totalCount, progressPercent, submitted, resetAssessment } =
    useAssessment();

  const notStarted = answeredCount === 0 && !submitted;

  const handleStart = () => {
    if (submitted) {
      resetAssessment();
    }
    navigate("/assessment");
  };

  return (
    <div className="max-w-content animate-fade-in">
      <p className="text-xs text-ink-faint mb-2">Overview</p>
      <h1 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
        Information Management Expert System
      </h1>
      <p className="text-ink-soft mt-3 max-w-content">
        Information management assessment and expert consultation.
      </p>
      <p className="text-ink-soft mt-4 max-w-[42rem]">
        Answer the questions below to provide information about your organization's
        data management practices.
      </p>

      <div className="grid grid-cols-3 border-t border-b border-line mt-10 divide-x divide-line">
        <div className="py-5 pr-4">
          <p className="text-2xl font-serif text-ink">{totalCount}</p>
          <p className="text-xs text-ink-faint mt-1">Questions</p>
        </div>
        <div className="py-5 px-4">
          <p className="text-2xl font-serif text-ink">{answeredCount}</p>
          <p className="text-xs text-ink-faint mt-1">Completed</p>
        </div>
        <div className="py-5 pl-4">
          <p className="text-2xl font-serif text-ink">{progressPercent}%</p>
          <p className="text-xs text-ink-faint mt-1">Progress</p>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-10 inline-flex items-center bg-accent text-paper text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-accent-hover transition-colors"
      >
        {submitted
          ? "Start New Assessment"
          : answeredCount > 0
          ? "Continue Assessment"
          : "Start Assessment"}
      </button>

      <section className="mt-14">
        <h2 className="text-xs font-medium text-ink-faint mb-3">Assessment Status</h2>
        <div className="border border-line rounded-sm px-5 py-4">
          <p className="font-serif text-lg text-ink">
            {submitted ? "Completed" : notStarted ? "Not Started" : "In Progress"}
          </p>
          <ul className="text-sm text-ink-soft mt-2 space-y-1">
            <li>{totalCount} questions available</li>
            <li>
              {submitted
                ? "All responses recorded"
                : answeredCount === 0
                ? "No responses recorded"
                : `${answeredCount} of ${totalCount} responses recorded`}
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const STEPS = [
  {
    n: "01",
    title: "Answer the questions",
    body: "Work through 15 questions about how your organization handles, stores, and protects data.",
  },
  {
    n: "02",
    title: "Review before you submit",
    body: "Check every response, jump back to any question, and edit an answer at any time.",
  },
  {
    n: "03",
    title: "Submit your responses",
    body: "Once you're satisfied with your answers, submit the assessment for consultation.",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <header className="px-6 sm:px-10 py-6 flex items-center justify-between">
        <p className="text-sm text-ink-soft">Information Management</p>
        <div className="flex items-center gap-4">
          <ThemeToggle variant="icon" />
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-sm text-ink-soft hover:text-ink transition-colors"
          >
            Skip to dashboard
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="w-full max-w-content mx-auto px-6 sm:px-10 py-16">
          <p className="text-xs font-medium text-ink-faint">Expert System</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink leading-tight mt-3">
            Information Management
            <br />
            Expert System
          </h1>
          <p className="text-ink-soft mt-5 max-w-[38rem] text-base leading-relaxed">
            A short consultation on how your organization manages data. Answer a
            series of questions about your current practices, review your
            responses, and submit them for assessment.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-9 inline-flex items-center bg-accent text-paper text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-accent-hover transition-colors"
          >
            Begin Assessment
          </button>

          <div className="mt-16 border-t border-line pt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n}>
                <p className="text-xs text-ink-faint tabular-nums">{step.n}</p>
                <p className="text-sm font-medium text-ink mt-2">{step.title}</p>
                <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-ink-faint mt-14">
            15 questions · about 10–15 minutes
          </p>
        </div>
      </main>
    </div>
  );
}
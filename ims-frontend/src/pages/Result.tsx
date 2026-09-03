import { useNavigate } from "react-router-dom";
import { useAssessment } from "../context/AssessmentContext";
import type { Severity } from "../lib/api";

const SEVERITY_LABEL: Record<Severity, string> = {
  high: "High",
  moderate: "Moderate",
  low: "Low",
};

const LEVEL_DESCRIPTION: Record<Severity, string> = {
  high: "Multiple high-priority gaps were identified in current data management practices.",
  moderate: "Some gaps were identified that are worth addressing, but nothing critical.",
  low: "Current data management practices appear reasonably sound.",
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const color =
    severity === "high" ? "text-rust" : severity === "moderate" ? "text-ink" : "text-ink-faint";
  return (
    <span className={`text-xs font-medium ${color}`}>{SEVERITY_LABEL[severity]}</span>
  );
}

export default function Result() {
  const navigate = useNavigate();
  const { result } = useAssessment();

  if (!result) {
    return (
      <div className="max-w-content animate-fade-in">
        <p className="text-xs font-medium text-ink-faint">Assessment Result</p>
        <h1 className="font-serif text-2xl sm:text-3xl text-ink mt-2">No result yet</h1>
        <p className="text-ink-soft mt-3">
          Submit an assessment first to see the inference result here.
        </p>
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

  const { overall_risk, risk_flags, recommendations, descriptive } = result;

  return (
    <div className="max-w-wide animate-fade-in">
      <p className="text-xs font-medium text-ink-faint">
        Assessment Result &middot; Demonstration view
      </p>
      <h1 className="font-serif text-2xl sm:text-3xl text-ink mt-2">
        Overall Risk: {SEVERITY_LABEL[overall_risk.level]}
      </h1>
      <p className="text-ink-soft mt-2 max-w-content">
        {LEVEL_DESCRIPTION[overall_risk.level]}
      </p>

      <div className="grid grid-cols-3 border-t border-b border-line mt-8 divide-x divide-line">
        <div className="py-4 pr-4">
          <p className="text-2xl font-serif text-ink">{overall_risk.high_count}</p>
          <p className="text-xs text-ink-faint mt-1">High</p>
        </div>
        <div className="py-4 px-4">
          <p className="text-2xl font-serif text-ink">{overall_risk.moderate_count}</p>
          <p className="text-xs text-ink-faint mt-1">Moderate</p>
        </div>
        <div className="py-4 pl-4">
          <p className="text-2xl font-serif text-ink">{overall_risk.low_count}</p>
          <p className="text-xs text-ink-faint mt-1">Low</p>
        </div>
      </div>

      {risk_flags.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xs font-medium text-ink-faint mb-3">Risk Flags</h2>
          <ul className="divide-y divide-line">
            {risk_flags.map((flag) => (
              <li key={flag.category} className="py-3 flex items-start gap-4">
                <div className="w-20 shrink-0 pt-0.5">
                  <SeverityBadge severity={flag.severity} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink capitalize">
                    {flag.category.replace(/-/g, " ")}
                  </p>
                  <p className="text-sm text-ink-soft mt-0.5">{flag.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-sm text-ink-soft mt-10">No risk flags were raised.</p>
      )}

      {recommendations.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xs font-medium text-ink-faint mb-3">Recommendations</h2>
          <ul className="space-y-3">
            {recommendations.map((rec) => (
              <li key={rec.for} className="text-sm text-ink-soft">
                <span className="text-ink font-medium capitalize">
                  {rec.for.replace(/-/g, " ")}:
                </span>{" "}
                {rec.text}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 border-t border-line pt-6">
        <h2 className="text-xs font-medium text-ink-faint mb-3">Descriptive Context</h2>
        <dl className="grid sm:grid-cols-3 gap-4">
          {Object.entries(descriptive).map(([key, value]) => (
            <div key={key}>
              <dt className="text-xs text-ink-faint capitalize">{key.replace(/-/g, " ")}</dt>
              <dd className="text-sm text-ink mt-0.5 capitalize">{value.replace(/-/g, " ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="mt-10 text-sm font-medium text-ink-soft hover:text-ink px-4 py-2 border border-line rounded-sm transition-colors"
      >
        Return to Dashboard
      </button>
    </div>
  );
}

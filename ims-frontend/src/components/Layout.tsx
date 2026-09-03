import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { useAssessment } from "../context/AssessmentContext";
import type { Density } from "../context/AssessmentContext";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/assessment", label: "Assessment" },
  { to: "/questions", label: "Question Bank" },
  { to: "/review", label: "Review" },
];

const DENSITY_OPTIONS: { value: Density; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

function DensityControl({ className = "" }: { className?: string }) {
  const { density, setDensity } = useAssessment();
  return (
    <div className={className}>
      <p className="text-xs font-medium text-ink-faint mb-2">Density</p>
      <div className="inline-flex border border-line rounded-sm overflow-hidden">
        {DENSITY_OPTIONS.map((opt, i) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setDensity(opt.value)}
            className={`px-2.5 py-1.5 text-xs transition-colors ${
              i !== 0 ? "border-l border-line" : ""
            } ${
              density === opt.value
                ? "bg-accent text-paper"
                : "bg-transparent text-ink-soft hover:bg-paper-alt"
            }`}
            aria-pressed={density === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { answeredCount, totalCount } = useAssessment();

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col lg:justify-between lg:border-r lg:border-line lg:px-6 lg:py-8 lg:sticky lg:top-0 lg:h-screen">
        <div>
          <p className="font-serif text-lg leading-tight text-ink">
            Information
            <br />
            Management
          </p>
          <p className="text-xs text-ink-faint mt-1 mb-8">Expert System</p>

          <nav className="flex flex-col" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-sm py-2 border-l-2 pl-3 -ml-px transition-colors ${
                    isActive
                      ? "border-accent text-ink font-medium"
                      : "border-transparent text-ink-soft hover:text-ink hover:border-line"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <div className="text-xs text-ink-faint mb-6">
            {answeredCount} of {totalCount} answered
          </div>
          <ThemeToggle className="mb-6" />
          <DensityControl />
        </div>
      </aside>

      {/* Mobile / tablet top bar */}
      <header className="lg:hidden border-b border-line px-4 sm:px-6 py-4 sticky top-0 bg-paper z-10">
        <div className="flex items-center justify-between">
          <p className="font-serif text-base text-ink">Information Management</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-faint">
              {answeredCount}/{totalCount}
            </span>
            <ThemeToggle variant="icon" />
          </div>
        </div>
        <nav
          className="flex gap-4 mt-4 overflow-x-auto"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `text-sm whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  isActive
                    ? "border-accent text-ink font-medium"
                    : "border-transparent text-ink-soft"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 lg:py-12">
        {children}
      </main>
    </div>
  );
}

import { useTheme } from "../context/ThemeContext";

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1M12.7 3.3l-1.1 1.1M4.4 11.6l-1.1 1.1M12.7 12.7l-1.1-1.1M4.4 4.4 3.3 3.3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.5 9.7A5.8 5.8 0 1 1 6.3 2.5a4.6 4.6 0 0 0 7.2 7.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface Props {
  variant?: "segmented" | "icon";
  className?: string;
}

export default function ThemeToggle({ variant = "segmented", className = "" }: Props) {
  const { theme, setTheme, toggleTheme } = useTheme();

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className={`flex items-center justify-center h-8 w-8 border border-line rounded-sm text-ink-soft hover:text-ink hover:border-ink-faint transition-colors ${className}`}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }

  return (
    <div className={className}>
      <p className="text-xs font-medium text-ink-faint mb-2">Appearance</p>
      <div className="inline-flex border border-line rounded-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-pressed={theme === "light"}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors ${
            theme === "light"
              ? "bg-accent text-paper"
              : "bg-transparent text-ink-soft hover:bg-paper-alt"
          }`}
        >
          <SunIcon />
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-pressed={theme === "dark"}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs border-l border-line transition-colors ${
            theme === "dark"
              ? "bg-accent text-paper"
              : "bg-transparent text-ink-soft hover:bg-paper-alt"
          }`}
        >
          <MoonIcon />
          Dark
        </button>
      </div>
    </div>
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        "paper-alt": "rgb(var(--color-paper-alt) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft) / <alpha-value>)",
        "ink-faint": "rgb(var(--color-ink-faint) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        "line-soft": "rgb(var(--color-line-soft) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",
        "accent-tint": "rgb(var(--color-accent-tint) / <alpha-value>)",
        moss: "rgb(var(--color-moss) / <alpha-value>)",
        rust: "rgb(var(--color-rust) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["\"Source Serif 4\"", "Georgia", "\"Iowan Old Style\"", "serif"],
        sans: [
          "\"IBM Plex Sans\"",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "\"Segoe UI\"",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "48rem",
        wide: "72rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 180ms ease-out",
      },
    },
  },
  plugins: [],
};
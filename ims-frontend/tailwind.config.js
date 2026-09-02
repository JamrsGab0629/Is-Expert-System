/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF8",
        "paper-alt": "#F1EFE9",
        ink: "#1C1D1A",
        "ink-soft": "#57584F",
        "ink-faint": "#8A8B80",
        line: "#DBD8CE",
        "line-soft": "#E9E7DF",
        accent: "#33524D",
        "accent-hover": "#25403C",
        "accent-tint": "#E7EDE9",
        moss: "#6C7A4C",
        rust: "#9C5A3C",
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

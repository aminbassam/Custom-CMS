import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        sand: "#f8f4eb",
        clay: "#c97b63",
        moss: "#4d6b57",
        mist: "#d7e2e9"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        panel: "0 20px 60px -32px rgba(15, 23, 42, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;

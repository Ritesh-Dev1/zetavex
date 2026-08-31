import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5", // Warm Cream / Architectural Pearl White
        foreground: "#0A0A0B", // Obsidian Black
        brand: {
          orange: "#FF5500",
          pink: "#FF3366",
          gradient: "linear-gradient(135deg, #FF5500 0%, #FF3366 100%)",
        },
        obsidian: {
          50: "#78716C",
          100: "#57534E",
          200: "#44403C",
          800: "#292524",
          900: "#1C1917", // Deep Obsidian Black
          950: "#0C0A09",
        },
        cream: {
          50: "#FFFFFF",
          100: "#FAF8F5", // Primary Warm Cream
          200: "#F4F1EA",
          300: "#EBE8E1", // Primary Border
          400: "#DCD8CF", // Secondary Border
          500: "#A8A29E",
        },
        emerald: {
          500: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "rainbow-glow": "rainbow 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        rainbow: {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(180deg)" },
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #FF5500 0%, #FF3366 100%)",
        "rainbow-conic": "conic-gradient(from 180deg at 50% 50%, #FF4500 0deg, #FF8C00 70deg, #38BDF8 160deg, #818CF8 240deg, #EC4899 310deg, #FF4500 360deg)",
        "warm-grid": "radial-gradient(circle, #DCD8CF 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;

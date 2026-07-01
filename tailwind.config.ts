import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F4C81",
          50: "#EAF1F8",
          100: "#D0E1EF",
          200: "#A2C3DF",
          300: "#73A5CF",
          400: "#4587BF",
          500: "#0F4C81",
          600: "#0D3F6B",
          700: "#0A3255",
          800: "#08253F",
          900: "#051829"
        },
        accent: {
          DEFAULT: "#D4AF37",
          50: "#FBF6E8",
          100: "#F5E9C4",
          200: "#EBD389",
          300: "#E0BD4E",
          400: "#D4AF37",
          500: "#B5912A",
          600: "#8C7020"
        },
        ink: "#111827",
        canvas: "#F8FAFC"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 8px 30px rgba(15, 76, 129, 0.08)",
        glow: "0 0 0 1px rgba(212,175,55,0.25), 0 8px 24px rgba(212,175,55,0.18)",
        card: "0 1px 2px rgba(17,24,39,0.04), 0 12px 32px -8px rgba(15,76,129,0.12)"
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        "hero-mesh": "radial-gradient(circle at 20% 20%, rgba(15,76,129,0.10), transparent 40%), radial-gradient(circle at 85% 15%, rgba(212,175,55,0.12), transparent 35%), radial-gradient(circle at 50% 90%, rgba(15,76,129,0.08), transparent 40%)"
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease forwards",
        shimmer: "shimmer 3s linear infinite"
      }
    }
  },
  plugins: []
};
export default config;

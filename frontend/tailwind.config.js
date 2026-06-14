/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body:    ["Inter", "sans-serif"],
        mono:    ["DM Mono", "monospace"],
      },
      colors: {
        primary: {
          DEFAULT: "#667EEA",
          dark:    "#764BA2",
        },
        sky: {
          DEFAULT: "#4FACFE",
          aqua:    "#00F2FE",
        },
        surface: "rgba(255,255,255,0.12)",
        bgLight: "#F8F9FF",
        bgDark:  "#0F0F1A",
        textPrimary:   "#1A1A2E",
        textSecondary: "#6B7280",
        textDark:      "#E8E8F0",
        success: "#10B981",
        warning: "#F59E0B",
        danger:  "#EF4444",
      },
      backgroundImage: {
        "hero-gradient":    "linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #4FACFE 100%)",
        "primary-gradient": "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
        "sky-gradient":     "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)",
        "success-gradient": "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        "danger-gradient":  "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
        "lavender-gradient":"linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)",
      },
      boxShadow: {
        glass:  "0 8px 32px rgba(0,0,0,0.12)",
        glow:   "0 0 0 3px rgba(102,126,234,0.3)",
        card:   "0 4px 24px rgba(0,0,0,0.08)",
        "card-dark": "0 4px 24px rgba(0,0,0,0.4)",
      },
      backdropBlur: {
        glass: "20px",
      },
      borderRadius: {
        xl2: "20px",
        xl3: "24px",
      },
      animation: {
        "gradient-shift":    "gradientShift 8s ease infinite",
        "float":             "float 6s ease-in-out infinite",
        "pulse-slow":        "pulse 3s ease-in-out infinite",
        "shimmer":           "shimmer 2s linear infinite",
        "count-up":          "countUp 1s ease-out forwards",
        "slide-in-right":    "slideInRight 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "fade-in-up":        "fadeInUp 0.6s ease-out forwards",
        "spin-slow":         "spin 3s linear infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideInRight: {
          "0%":   { opacity: 0, transform: "translateX(60px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInUp: {
          "0%":   { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

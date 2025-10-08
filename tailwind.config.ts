import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: "#0f172a",
          800: "#1e293b"
        }
      },
      boxShadow: {
        glow: "0 20px 60px -20px rgba(56, 189, 248, 0.45)"
      }
    }
  },
  plugins: []
} satisfies Config;

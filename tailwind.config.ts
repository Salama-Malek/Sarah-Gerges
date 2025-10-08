import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import tailwindcssLogical from "tailwindcss-logical";

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
      },
      fontFamily: {
        en: ["Inter", "Source Sans 3", "system-ui", "sans-serif"],
        ru: ["Manrope", "PT Sans", "system-ui", "sans-serif"],
        ar: ["Cairo", "Noto Kufi Arabic", "Tajawal", "sans-serif"]
      }
    }
  },
  plugins: [tailwindcssLogical, forms]
} satisfies Config;

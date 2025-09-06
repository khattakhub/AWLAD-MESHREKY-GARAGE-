import type { Config } from "tailwindcss";
// FIX: Import the typography plugin instead of using require for ES module compatibility.
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007BFF',
        'primary-dark': '#0056b3',
        'secondary': '#343a40',
        'accent': '#FDB813',
        'light': '#F9FAFB',
        'dark': '#111827',
        'dark-secondary': '#1F2937',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  // FIX: Use the imported typography variable.
  plugins: [typography],
};
export default config;
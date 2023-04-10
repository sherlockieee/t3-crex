import { type Config } from "tailwindcss";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["DM Sans, sans-serif"],
      heading: ["Marcellus, serif"],
    },
    extend: {
      colors: { primary: "#0B3830", secondary: "#FBB90F" },
    },
  },
  plugins: [],
} satisfies Config;

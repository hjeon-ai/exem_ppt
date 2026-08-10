import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        exem: {
          50: "#eef7ff",
          100: "#d9ecff",
          200: "#bcdeff",
          300: "#8ecaff",
          400: "#59abff",
          500: "#3389fc",
          600: "#1d6af1",
          700: "#1554de",
          800: "#1845b4",
          900: "#193d8d",
          950: "#142756",
        },
      },
    },
  },
  plugins: [],
};

export default config;

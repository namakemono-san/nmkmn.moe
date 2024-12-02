import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Nunito'", "'M PLUS Rounded 1c'", "sans-serif"],
      bold: ["'Nunito'", "'M PLUS Rounded 1c'", "sans-serif"],
      extraBold: ["'Nunito'", "'M PLUS Rounded 1c'", "sans-serif"],
    },
    extend: {
      colors: {
        theme: "#3bd2f8"
      }
    },
  },
  plugins: [],
} satisfies Config;

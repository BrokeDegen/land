import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        red: "var(--red)",
        card: "var(--card)",
        border: "var(--border)",
      },
    },
    screens: {
      xl: { max: "1024px" },
      lg: { max: "991px" },
      md: { max: "767px" },
      sm: { max: "560px" },
      xs: { max: "479px" },
    },
  },
  plugins: [],
} satisfies Config;

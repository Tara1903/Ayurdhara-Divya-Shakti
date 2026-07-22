import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "var(--ivory)",
        cream: "var(--cream)",
        parchment: "var(--parchment)",
        forest: "var(--forest)",
        olive: "var(--olive)",
        earth: "var(--earth)",
        stone: "var(--stone)",
        charcoal: "var(--charcoal)",
        deep: "var(--deep)",
        gold: "var(--gold)",
        sage: "var(--sage)",
        sand: "var(--sand)",
        moss: "var(--moss)",
        danger: "var(--danger)",
      },
    },
  },
  plugins: [],
};
export default config;

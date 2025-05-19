import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gifs: "repeat(auto-fit, minmax(200px, 1fr))",
        gifsMd: "repeat(auto-fit, minmax(250px, 1fr))",
      },
      gridAutoRows: {
        gifs: "200px",
        gifsMd: "250px",
      },
      scale: {
        101: "1.01",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;

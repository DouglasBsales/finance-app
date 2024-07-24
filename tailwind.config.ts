import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        whitePrimary: "#FCFCFD", 
        bluePrimary: "#1877F2",
        blackPrimary: "#202020",
        blackSecondary: "#62636C",
        blackOpacity: "#CDCED7",
        redPrimary: "#E5484D",
      }
    },
  },
  plugins: [],
};
export default config;
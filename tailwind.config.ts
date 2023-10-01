import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/components/**/*.tsx", "./src/app/*.tsx"],
  important: true,
};
export default config;

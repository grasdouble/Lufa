import * as tailwindPlugin from "prettier-plugin-tailwindcss";

/**
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [tailwindPlugin],
  tailwindStylesheet: "./src/tailwind.css",
  tailwindConfig: "./tailwind.config.js",
};

export default config;

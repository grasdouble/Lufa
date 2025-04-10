import basicConfig from "./basic.mjs";

export default [
  ...basicConfig,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
  },
];

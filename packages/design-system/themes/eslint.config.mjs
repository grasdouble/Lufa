import lufaReactConfig from "@grasdouble/lufa_config_eslint/react.mjs";

export default [
  ...lufaReactConfig,
  {
    files: ["scripts/**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        console: "readonly",
      },
    },
  },
];

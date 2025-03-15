module.exports = {
  extends: ["prettier"],
  plugins: ["simple-import-sort", "prettier"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": ["error"],
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-irregular-whitespace": "error",
    "no-trailing-spaces": "error",
    semi: "error",
    "no-empty-function": "error",
    "no-duplicate-imports": "error",
    "newline-after-var": "error",
    camelcase: "warn",
  },
};

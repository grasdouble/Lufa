/**
 * @see https://prettier.io/docs/configuration
 * Prettier configuration compatible with ESLint
 * Uses eslint-config-prettier to avoid conflicts
 * @type {import("prettier").Config}
 */
const config = {
  // Plugins
  plugins: ['prettier-plugin-packagejson'],

  // Code style - industry standards compatible with ESLint
  printWidth: 120, // Standard: 80-120 (120 for modern wide screens)
  tabWidth: 2, // Match common JavaScript/TypeScript convention
  useTabs: false, // Standard: spaces over tabs
  semi: true, // Standard: always use semicolons
  singleQuote: true, // Standard: single quotes for strings
  quoteProps: 'as-needed', // Standard: only quote object properties when needed
  trailingComma: 'es5', // Standard: trailing commas where valid in ES5 (objects, arrays)
  bracketSpacing: true, // Standard: spaces inside object literals { foo: bar }
  bracketSameLine: false, // Standard: put > of multi-line elements on new line
  arrowParens: 'always', // Standard: always include parens around arrow function args
  proseWrap: 'preserve', // Standard: don't wrap markdown text
  htmlWhitespaceSensitivity: 'css', // Standard: respect CSS display property
  endOfLine: 'lf', // Standard: Unix line endings (consistent across platforms)
  embeddedLanguageFormatting: 'auto', // Standard: auto-format embedded code
};

export default config;

/**
 * @see https://prettier.io/docs/configuration
 * Prettier configuration compatible with ESLint
 * Uses eslint-config-prettier to avoid conflicts
 * @type {import("prettier").Config}
 */
const config = {
  // Plugins
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-packagejson'],

  // Code style - industry standards compatible with ESLint
  printWidth: 120, // Standard: 80-120 (120 for modern wide screens)
  tabWidth: 2, // Standard: 2 spaces per tab
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

  // Import sorting configuration
  importOrder: [
    '<TYPES>^(react|react-dom)$', // React types first
    '^react$', // React first
    '^react-dom$', // React DOM second
    '<TYPES>', // Other type imports
    '<THIRD_PARTY_MODULES>', // External dependencies
    '', // Empty line
    '<TYPES>^@grasdouble/(.*)$', // Internal types from monorepo
    '^@grasdouble/(.*)$', // Internal packages from monorepo
    '', // Empty line
    '<TYPES>^[.]', // Relative type imports
    '^[./]', // Relative imports
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  importOrderCaseSensitive: false,
};

export default config;

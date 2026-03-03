import lufaNodeConfig from '@grasdouble/lufa_config_eslint/node.mjs';

export default [
  ...lufaNodeConfig,
  {
    ignores: ['dist/**', 'coverage/**', 'tests/**', '*.config.ts'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.scripts.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Allow console in CLI application
      'no-console': 'off',
    },
  },
];

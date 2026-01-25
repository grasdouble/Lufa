import lufaReactConfig from '@grasdouble/lufa_config_eslint/react.mjs';

export default [
  ...lufaReactConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Additional ignores for Playwright-specific artifacts
    ignores: [
      'playwright/.cache/**',
      'playwright/index.html',
      'playwright/index.tsx',
      'test-results/**',
      '__snapshots__/**',
      '*.config.ts', // Ignore vite config files
    ],
  },
  {
    // Relax rules for test files
    files: ['**/*.spec.{ts,tsx}', '**/*.fixtures.{ts,tsx}'],
    rules: {
      // Playwright's expect API causes false positives with unbound-method
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];

import nodeConfig from '@grasdouble/lufa_config_eslint/node.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nodeConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.mjs', 'vitest.config.ts'],
  },
];

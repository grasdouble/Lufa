import lufaNodeConfig from '@grasdouble/lufa_config_eslint/node.mjs';

export default [
  ...lufaNodeConfig,
  {
    ignores: ['dist/**', 'src/**'],
  },
  {
    files: ['scripts/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './scripts/tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Allow console in build scripts
      'no-console': 'off',
    },
  },
];

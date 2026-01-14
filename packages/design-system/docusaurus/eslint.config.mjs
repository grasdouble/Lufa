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
    files: ['src/dsExamples/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  {
    files: ['docusaurus.config.ts', 'sidebars.ts', 'src/pages/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  {
    files: ['src/dsExamples/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        __dirname: 'readonly',
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'commonjs',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['src/theme/ReactLiveScope/index.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
];

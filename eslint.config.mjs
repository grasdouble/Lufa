import lufaNodeConfig from '@grasdouble/lufa_config_eslint/light.mjs';

export default [
  ...lufaNodeConfig,
  {
    ignores: ['dist/**', 'coverage/**', 'tests/**', '*.config.ts'],
  },
  {
    rules: {
      // Allow console in CLI application
      'no-console': 'off',
    },
  },
  {
    files: ['.github/**/*.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
      },
    },
  },
];

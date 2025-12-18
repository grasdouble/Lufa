import storybook from 'eslint-plugin-storybook';

import lufaReactConfig from '@grasdouble/lufa_config_eslint/react.mjs';

export default [
  ...lufaReactConfig,
  { ignores: ['storybook-static'] },
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-comment-textnodes': 'off',
    },
  },
];

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  features: {
    backgrounds: false,
  },
  addons: [
    '@storybook/addon-themes', // https://github.com/storybookjs/storybook/blob/5cc4825ab10ff4cd22b0d383b8245c13d9481942/code/addons/themes/README.md
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;

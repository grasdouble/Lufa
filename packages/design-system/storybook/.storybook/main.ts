import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  features: {
    backgrounds: false,
  },
  addons: [
    // '@storybook/addon-themes', // Disabled - using custom theme/mode implementation
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

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-themes", // https://github.com/storybookjs/storybook/blob/5cc4825ab10ff4cd22b0d383b8245c13d9481942/code/addons/themes/README.md

    // Other possible addons to use later
    // "@storybook/addon-docs", //https://github.com/storybookjs/storybook/tree/next/code/addons/docs
    // "@storybook/addon-links", // https://github.com/storybookjs/storybook/blob/5cc4825ab10ff4cd22b0d383b8245c13d9481942/code/addons/links/README.md
    // "@storybook/addon-interactions", // https://github.com/storybookjs/storybook/blob/5cc4825ab10ff4cd22b0d383b8245c13d9481942/code/addons/interactions/README.md
    // "@chromatic-com/storybook",
    // "@storybook/experimental-addon-test",
    // "@storybook/addon-mdx-gfm",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;

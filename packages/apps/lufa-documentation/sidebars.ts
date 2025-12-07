import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/installation", "getting-started/theming"],
    },
    "accessibility",
    {
      type: "category",
      label: "Components",
      items: [
        {
          type: "category",
          label: "Layout",
          items: ["components/layout/placeholder", "components/layout/stack"],
        },
        {
          type: "category",
          label: "Display",
          items: ["components/display/card"],
        },
        {
          type: "category",
          label: "Forms",
          items: ["components/forms/button"],
        },
      ],
    },
  ],
};

export default sidebars;

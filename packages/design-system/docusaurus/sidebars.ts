import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

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
    'intro',
    'playground',
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/contributing', 'guides/migration', 'guides/component-documentation-template'],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Primitives',
          collapsed: false,
          items: [
            'components/primitives/box',
            'components/primitives/stack',
            'components/primitives/text',
            'components/primitives/icon',
          ],
        },
      ],
    },
    'changelog',
  ],
};

export default sidebars;

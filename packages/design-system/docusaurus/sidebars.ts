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
        'components/overview',
        {
          type: 'category',
          label: 'Foundation',
          collapsed: false,
          items: [
            'foundation/box',
            'foundation/center',
            'foundation/container',
            'foundation/flex',
            'foundation/grid',
            'foundation/stack',
            'foundation/divider',
            'foundation/aspect-ratio',
            'foundation/cluster',
            'foundation/bleed',
          ],
        },
        {
          type: 'category',
          label: 'Content',
          collapsed: false,
          items: ['content/badge', 'content/icon', 'content/text'],
        },
        {
          type: 'category',
          label: 'Interaction',
          collapsed: false,
          items: ['interaction/button', 'interaction/input', 'interaction/label'],
        },
        {
          type: 'category',
          label: 'Composition',
          collapsed: false,
          items: ['composition/card'],
        },
        {
          type: 'category',
          label: 'Utility',
          collapsed: false,
          items: ['utility/portal', 'utility/visually-hidden'],
        },
      ],
    },
    'changelog',
  ],
};

export default sidebars;

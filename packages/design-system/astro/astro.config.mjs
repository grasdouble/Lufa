// @ts-check
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Lufa Design System',
      customCss: [
        // Path to your Tailwind base styles:
        './src/styles/global.css',
      ],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        { label: 'Welcome to Lufa Design System', slug: 'getting-started/intro' },
        {
          label: 'Getting Started',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Theming', slug: 'getting-started/theming' },
            { label: 'Usage', slug: 'getting-started/usage' },
            { label: 'Accessibility', slug: 'getting-started/accessibility' },
          ],
        },
        {
          label: 'Tokens',
          autogenerate: { directory: 'tokens' },
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' },
        },
      ],
    }),
    react(),
  ],
});

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://lufa-ds.grasdouble.com',
  base: '/',
  integrations: [
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: true, // Need Tailwind base for @layer directives to work
    }),
    sitemap(),
  ],
  output: 'static',
  outDir: './dist',
  build: {
    format: 'directory', // Generate clean URLs like /docs/intro/ instead of /docs/intro.html
  },
  vite: {
    ssr: {
      noExternal: ['@grasdouble/lufa_design-system', '@grasdouble/lufa_design-system-tokens'],
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});

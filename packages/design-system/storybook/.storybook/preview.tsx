/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Decorator, Parameters, Preview } from '@storybook/react-vite';

import { Breakpoints } from './breakpoints';
import { ThemeAndModeWrapper } from './ThemeAndModeWrapper';
// Import design system compiled CSS (includes all component styles)
// Import storybook-specific styles
import '../src/style.css';

const storybookViewports: Parameters['viewport']['options'] = {};
Object.entries(Breakpoints).forEach(([viewport, value]) => {
  const { width } = value;
  storybookViewports[viewport] = {
    name: viewport,
    styles: {
      width,
      height: '100%',
    },
  };
});

const parameters: Parameters = {
  options: {
    // @ts-expect-error TS7006: implicit any is intentional (storybook doesn't accept type here)
    storySort: (a, b) => {
      // First sort by title (category) to maintain numeric order (1. Tokens, 2. Layout, etc.)
      const titleCompare = a.title.localeCompare(b.title, undefined, { numeric: true });
      if (titleCompare !== 0) return titleCompare;

      // Within the same component, put Playground first
      const aIsPlayground = a.name === 'Playground';
      const bIsPlayground = b.name === 'Playground';

      if (aIsPlayground && !bIsPlayground) return -1;
      if (!aIsPlayground && bIsPlayground) return 1;

      // Otherwise sort stories alphabetically
      return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true });
    },
  },
  layout: 'centered',
  viewport: {
    options: { ...storybookViewports },
  },
};

/**
 * Custom decorator to handle theme (default/ocean/forest) and mode (light/dark/high-contrast)
 * Applies data-theme and data-mode attributes to the document root
 */
const withThemeAndMode: Decorator = (Story, context) => {
  const theme: string = context.globals.theme ?? 'default';
  const mode: string = context.globals.mode ?? 'light';

  return (
    <ThemeAndModeWrapper theme={theme} mode={mode}>
      <Story />
    </ThemeAndModeWrapper>
  );
};

const preview: Preview = {
  parameters,
  decorators: [withThemeAndMode],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default', icon: 'circle' },
          { value: 'ocean', title: 'Ocean 🌊', icon: 'circle' },
          { value: 'forest', title: 'Forest 🌲', icon: 'circle' },
          { value: 'matrix', title: 'Matrix 💾', icon: 'circle' },
          { value: 'cyberpunk', title: 'Cyberpunk 🎆', icon: 'circle' },
          { value: 'sunset', title: 'Sunset 🌅', icon: 'circle' },
          { value: 'nordic', title: 'Nordic ❄️', icon: 'circle' },
          { value: 'volcano', title: 'Volcano 🌋', icon: 'circle' },
          { value: 'coffee', title: 'Coffee ☕', icon: 'circle' },
          { value: 'volt', title: 'Volt ⚡', icon: 'circle' },
          { value: 'steampunk', title: 'Steampunk ⚙️', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode (accessibility)',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'contrast',
        items: [
          { value: 'light', title: '☀️ Light', icon: 'sun' },
          { value: 'dark', title: '🌙 Dark', icon: 'moon' },
          { value: 'high-contrast', title: '◐ High Contrast', icon: 'contrast' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

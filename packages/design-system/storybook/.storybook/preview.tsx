import { useEffect } from 'react';
import type { Decorator, Parameters, Preview } from '@storybook/react-vite';

import { Breakpoints } from './breakpoints';
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
 * Component wrapper for theme and mode handling
 */
const ThemeAndModeWrapper = ({ theme, mode, children }: { theme: string; mode: string; children: React.ReactNode }) => {
  useEffect(() => {
    const root = document.documentElement;

    // Apply theme attribute
    if (theme === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }

    // Apply mode attribute
    if (mode === 'auto' || mode === '' || mode == null || mode === undefined) {
      root.removeAttribute('data-mode');
    } else {
      root.setAttribute('data-mode', mode);
    }
  }, [theme, mode]);

  return (
    <div
      style={{
        backgroundColor: 'var(--lufa-token-color-background-primary)',
        color: 'var(--lufa-token-color-text-primary)',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Custom decorator to handle theme (default/ocean/forest) and mode (light/dark/auto)
 * Applies data-theme and data-mode attributes to the document root
 */
const withThemeAndMode: Decorator = (Story, context) => {
  const theme: string = context.globals.theme ?? 'default';
  const mode: string = context.globals.mode ?? 'auto';

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
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode (light/dark/auto)',
      defaultValue: 'auto',
      toolbar: {
        title: 'Mode',
        icon: 'contrast',
        items: [
          { value: 'light', title: '☀️ Light', icon: 'sun' },
          { value: 'dark', title: '🌙 Dark', icon: 'moon' },
          { value: 'auto', title: '🔄 Auto', icon: 'sync' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

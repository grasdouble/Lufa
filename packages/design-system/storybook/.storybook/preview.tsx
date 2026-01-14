import type { Decorator, Parameters, Preview } from '@storybook/react-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

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

// Decorator to automatically sync background color with theme
const withThemeBackground: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'light';

  // Apply background color based on theme
  const backgroundColor = theme === 'dark' ? '#1a1a1a' : '#ffffff';

  return (
    <div
      style={{
        backgroundColor,
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters,
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    withThemeBackground, // Add after theme decorator to auto-sync background
  ],
};

export default preview;

import type { Preview, ReactRenderer, Parameters, Decorator } from '@storybook/react-vite';
import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes';

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
    backgrounds: { disabled: true },
    layout: 'fullscreen',
    viewport: {
        options: { ...storybookViewports },
    },
    themes: {
        default: 'light',
        list: [
            {
                name: 'light',
                class: 'theme-light',
                color: '#ffffff', // Background color for the light theme
            },
            {
                name: 'dark',
                class: 'theme-dark',
                color: '#333', // Background color for the dark theme
                default: true,
            },
        ],
    },
};

interface ThemeItem {
    name: string;
    color?: string;
    class?: string;
    default?: boolean;
}

export const hackDecoratorDarkMode: Decorator = (story, context) => {
    const isDarkMode = context?.globals?.theme === 'dark';
    const darkModeColor = context?.parameters?.themes?.list?.find((v: ThemeItem) => v.name === 'dark')?.color;

    const lightModeColor = context?.parameters?.themes?.list?.find((v: ThemeItem) => v.name === 'light')?.color;

    const styleContentForDocs = `
      .docs-story {
        background-color: ${isDarkMode ? darkModeColor : lightModeColor};
      }`;

    const styleContentForStories = `
      .dark,
      [data-theme="dark"] {
        background-color: #333;
      }`;

    const size = ``;
    return (
        <>
            <style>{styleContentForDocs}</style>
            <style>{styleContentForStories}</style>
            <style>{size}</style>

            <>{story(context)}</>
        </>
    );
};

const decorators = [
    withThemeByDataAttribute({
        themes: {
            light: 'light',
            dark: 'dark',
        },
        defaultTheme: 'light',
        attributeName: 'data-theme',
    }),
    withThemeByClassName<ReactRenderer>({
        themes: {
            light: 'light',
            dark: 'dark',
        },
        defaultTheme: 'light',
    }),
    hackDecoratorDarkMode,
];

const preview: Preview = {
    parameters,
    decorators,
};

export default preview;

# Theme Switching Guide

**Version:** 0.7.1  
**Last Updated:** 2026-01-25  
**Status:** Production Ready

## Overview

Lufa Design System supports three theme modes:

- **Light** (default)
- **Dark**
- **High Contrast** (WCAG AAA compliant)

Theme switching is CSS-based using the `data-mode` attribute on any parent element. No JavaScript is required for themes to work, but JavaScript enables dynamic switching.

**Note:** Use `data-mode` for accessibility modes (light, dark, high-contrast) and `data-theme` for brand color themes (ocean, forest, etc.). This guide covers accessibility modes.

## Quick Start

### HTML Implementation

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="@grasdouble/lufa-tokens/dist/tokens.css" />
  </head>
  <body>
    <!-- Default: Light theme -->
    <div class="card">
      <p>This uses light theme (default)</p>
    </div>

    <!-- Dark theme -->
    <div class="card" data-mode="dark">
      <p>This uses dark theme</p>
    </div>

    <!-- High contrast theme -->
    <div class="card" data-mode="high-contrast">
      <p>This uses high contrast theme</p>
    </div>
  </body>
</html>
```

### CSS Component Example

```css
.card {
  background-color: var(--lufa-core-neutral-surface-default);
  border: 1px solid var(--lufa-core-neutral-border-default);
  color: var(--lufa-core-neutral-text-primary);
  padding: var(--lufa-core-spacing-4);
  border-radius: var(--lufa-core-radius-md);
}

.card:hover {
  background-color: var(--lufa-core-neutral-surface-hover);
}
```

The component automatically adapts to the theme based on the nearest `data-mode` ancestor.

## React Implementation

### Basic Usage

```tsx
import '@grasdouble/lufa-tokens/dist/tokens.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');

  return (
    <div data-mode={theme}>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('high-contrast')}>High Contrast</button>

      <YourComponents />
    </div>
  );
}
```

### Theme Hook (Recommended)

Create a reusable theme hook with persistence:

```tsx
// hooks/useTheme.ts
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage
    const stored = localStorage.getItem('lufa-theme');
    if (stored && ['light', 'dark', 'high-contrast'].includes(stored)) {
      return stored as Theme;
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('lufa-theme', theme);
    document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);

  return { theme, setTheme: setThemeState };
}
```

Usage:

```tsx
function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div data-mode={theme}>
      <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="high-contrast">High Contrast</option>
      </select>

      <YourComponents />
    </div>
  );
}
```

## Scope Control

You can apply themes at **any level** of your DOM tree:

### Global Theme (Entire App)

```tsx
<html data-mode="dark">{/* Entire app uses dark theme */}</html>
```

### Section Theme (Part of App)

```tsx
<main>
  <section data-mode="light">{/* Light theme section */}</section>

  <section data-mode="dark">{/* Dark theme section */}</section>
</main>
```

### Component Theme (Single Component)

```tsx
<Card data-mode="high-contrast">{/* Only this card uses high contrast */}</Card>
```

## Available Theme Tokens

### Tokens That Adapt to Theme (31 tokens)

These tokens change values based on `data-mode`:

**Neutral Colors (9):**

- `--lufa-core-neutral-background`
- `--lufa-core-neutral-surface`
- `--lufa-core-neutral-surface-hover`
- `--lufa-core-neutral-border`
- `--lufa-core-neutral-border-strong`
- `--lufa-core-neutral-text-primary`
- `--lufa-core-neutral-text-secondary`
- `--lufa-core-neutral-text-tertiary`
- `--lufa-core-neutral-text-disabled`

**Brand Colors (6):**

- `--lufa-core-brand-primary`
- `--lufa-core-brand-primary-hover`
- `--lufa-core-brand-primary-active`
- `--lufa-core-brand-secondary`
- `--lufa-core-brand-secondary-hover`
- `--lufa-core-brand-secondary-active`

**Semantic Colors (16):**

- `--lufa-core-semantic-success` (base, subtle, border, hover)
- `--lufa-core-semantic-error` (base, subtle, border, hover)
- `--lufa-core-semantic-warning` (base, subtle, border, hover)
- `--lufa-core-semantic-info` (base, subtle, border, hover)

### Tokens That DON'T Change (153+ tokens)

These remain constant across themes:

- **Primitives:** All color primitives (gray-50 to gray-900, brand colors, etc.)
- **Spacing:** All spacing tokens (xs to 5xl)
- **Typography:** Font sizes, line heights, font weights
- **Radii:** Border radius tokens
- **Shadows:** Shadow tokens
- **Breakpoints:** Responsive breakpoints

## Browser Support

### CSS Custom Properties

- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

### Data Attributes

- All modern browsers
- IE 11+ (with custom properties polyfill)

## Accessibility

### High Contrast Mode

The `high-contrast` theme is designed for users with:

- Low vision
- Color blindness
- Light sensitivity
- Cognitive disabilities

**Features:**

- WCAG AAA contrast ratios (7:1+ for normal text)
- Pure colors (#000000 text, #0000ff links, etc.)
- Strong borders for clear boundaries
- No subtle grays or low-contrast combinations

### System Preference Detection

Respect user's OS-level preference:

```tsx
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('lufa-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);
```

### High Contrast Preference

```tsx
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-contrast: more)');

  if (mediaQuery.matches) {
    setTheme('high-contrast');
  }
}, []);
```

## Testing Themes

### Manual Testing

1. Open browser DevTools
2. Add `data-mode` attribute to `<html>` or any element

```js
// Console commands
document.documentElement.setAttribute('data-mode', 'dark');
document.documentElement.setAttribute('data-mode', 'light');
document.documentElement.setAttribute('data-mode', 'high-contrast');
```

### Automated Testing (Playwright/Cypress)

```ts
// Playwright example
test('should render dark theme correctly', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-mode', 'dark');
  });

  const background = await page.evaluate(() => {
    return getComputedStyle(document.body).backgroundColor;
  });

  expect(background).toBe('rgb(17, 24, 39)'); // gray-900
});
```

### Visual Regression Testing (Chromatic/Percy)

```tsx
// Storybook story with theme variants
export const AllThemes = () => (
  <>
    <div data-mode="light">
      <YourComponent />
    </div>
    <div data-mode="dark">
      <YourComponent />
    </div>
    <div data-mode="high-contrast">
      <YourComponent />
    </div>
  </>
);
```

## Performance

### CSS Size Impact

- **Total CSS file:** ~56 KB
- **Light theme selectors:** 173 tokens (`:root, [data-mode='light']`)
- **Dark theme selectors:** 31 tokens (`[data-mode='dark']`)
- **High contrast selectors:** 31 tokens (`[data-mode='high-contrast']`)

### Runtime Performance

- **Zero JavaScript overhead:** Themes work with pure CSS
- **Instant switching:** No re-render needed, only CSS variable updates
- **No FOUC:** Tokens are defined at parse time

### Best Practices

```tsx
// ✅ Good: Minimal re-renders
function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme('dark')}>Dark</button>;
}

// ❌ Bad: Causes unnecessary re-renders
function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    // Re-querying styles on every render
    const styles = getComputedStyle(document.body);
  }, [theme]);
}
```

## Migration from Legacy Themes

If migrating from a previous theme system:

### From JavaScript Themes

**Before:**

```tsx
const lightTheme = {
  background: '#ffffff',
  text: '#111827',
};

<ThemeProvider theme={lightTheme}>
```

**After:**

```tsx
import '@grasdouble/lufa-tokens/dist/tokens.css';

<div data-mode="light">{/* Use CSS variables in components */}</div>;
```

### From Styled Components Theme

**Before:**

```tsx
const StyledCard = styled.div`
  background: ${(props) => props.theme.background};
`;
```

**After:**

```tsx
const StyledCard = styled.div`
  background: var(--lufa-core-neutral-surface-default);
`;
```

### From Tailwind Dark Mode

**Before:**

```html
<div class="bg-white dark:bg-gray-900"></div>
```

**After:**

```html
<div style="background: var(--lufa-core-neutral-background)"></div>
```

## Troubleshooting

### Theme Not Switching

**Problem:** Colors don't change when setting `data-mode`

**Solutions:**

1. Verify tokens CSS is imported: `import '@grasdouble/lufa-tokens/dist/tokens.css'`
2. Check `data-mode` value is exact: `'light'`, `'dark'`, or `'high-contrast'` (no typos)
3. Inspect computed styles in DevTools to see which theme selector is active
4. Ensure no CSS specificity issues are overriding token values

### Flashing Wrong Theme (FOUC)

**Problem:** Light theme flashes before dark theme applies

**Solution:** Set theme attribute in HTML before React hydrates:

```html
<script>
  // In <head> before any stylesheets
  (function () {
    const theme = localStorage.getItem('lufa-theme') || 'light';
    document.documentElement.setAttribute('data-mode', theme);
  })();
</script>
```

### Theme Not Persisting

**Problem:** Theme resets on page reload

**Solution:** Implement localStorage persistence (see React Hook example above)

### SSR Hydration Mismatch

**Problem:** React hydration error due to server/client theme mismatch

**Solution:**

```tsx
function App() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div data-mode="light">{/* Loading state */}</div>;
  }

  return <div data-mode={theme}>{/* App */}</div>;
}
```

## Examples

### Theme Toggle Button

```tsx
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const nextTheme = {
    light: 'dark',
    dark: 'high-contrast',
    'high-contrast': 'light',
  }[theme];

  return (
    <button onClick={() => setTheme(nextTheme as Theme)}>
      {theme === 'light' && '☀️ Light'}
      {theme === 'dark' && '🌙 Dark'}
      {theme === 'high-contrast' && '◐ High Contrast'}
    </button>
  );
}
```

### Theme Selector Dropdown

```tsx
function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)} aria-label="Select theme">
      <option value="light">☀️ Light</option>
      <option value="dark">🌙 Dark</option>
      <option value="high-contrast">◐ High Contrast</option>
    </select>
  );
}
```

### Auto Theme Based on Time

```tsx
function useAutoTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const hour = new Date().getHours();
    const autoTheme = hour >= 6 && hour < 18 ? 'light' : 'dark';
    setTheme(autoTheme);
  }, []);
}
```

## Resources

- [Token Architecture](../../tokens/_docs/token-architecture.md)
- [Architecture Updates](../../_docs/brainstorming/architecture-updates-2026-01-25.md)
- [Component Development Guide](../../_docs/development-guide.md)

## Future Enhancements

Planned for Phase 2:

- [ ] Official `useTheme()` hook in `@grasdouble/lufa-react`
- [ ] Theme preview component for settings pages
- [ ] Storybook decorator for automatic theme switching
- [ ] Custom theme creation guide
- [ ] Theme validator CLI tool

---

**Questions?** Open an issue on GitHub or check the documentation.

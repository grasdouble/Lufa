# Theming Guide

## Overview

The Lufa Design System provides a comprehensive theming system built with CSS custom properties and the OKLCH color format. This guide covers how to use, customize, and extend the theme system.

## Table of Contents

1. [Theme System Overview](#theme-system-overview)
2. [Available Themes](#available-themes)
3. [Dark Mode Support](#dark-mode-support)
4. [How Theme Switching Works](#how-theme-switching-works)
5. [OKLCH Color Format](#oklch-color-format)
6. [Creating Custom Themes](#creating-custom-themes)
7. [Theme Token Structure](#theme-token-structure)
8. [CSS Implementation Patterns](#css-implementation-patterns)
9. [Theme-Specific Visual Properties](#theme-specific-visual-properties)
10. [Component Styling](#component-styling)
11. [Testing Themes](#testing-themes)
12. [Migration Guide](#migration-guide)
13. [Troubleshooting](#troubleshooting)

---

## Theme System Overview

The Lufa Design System uses a **token-based theming architecture** with three layers:

1. **Primitives** - Raw values (colors, spacing, timing)
2. **Tokens** - Semantic mappings (primary, secondary, success)
3. **Component Styles** - CSS that references tokens via custom properties

### Key Features

- ✅ **CSS Custom Properties** - No JavaScript required for styling
- ✅ **OKLCH Color Format** - Perceptually uniform colors with wide gamut support
- ✅ **Theme Variants** - Multiple visual themes (default, ocean, forest)
- ✅ **Color Modes** - Light, dark, and auto mode support
- ✅ **Scoped Theming** - Apply different themes to different parts of your app
- ✅ **Type Safety** - TypeScript support for theme values

### Architecture Diagram

```
┌─────────────────────────────────────────────┐
│         Component Styles (Layer 3)          │
│    Use: var(--color-primary)               │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Theme Tokens (Layer 2)              │
│    Define: --color-primary                  │
│    Map to: var(--lufa-token-blue-600)      │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Primitives (Layer 1)                │
│    Define: --lufa-token-blue-600            │
│    Value: oklch(0.55 0.15 250)             │
└─────────────────────────────────────────────┘
```

---

## Available Themes

The design system includes three built-in themes:

### Default Theme

**Characteristics:**

- Neutral blue-gray color palette
- Balanced contrast for general use
- Professional, clean aesthetic
- Best for: Business applications, dashboards, admin panels

**Primary Colors:**

- Primary: Blue (oklch(0.55 0.15 250))
- Secondary: Slate gray
- Accent: Indigo

### Ocean Theme

**Characteristics:**

- Vibrant blue and teal palette
- High contrast for readability
- Energetic, modern feel
- Best for: Marketing sites, creative tools, consumer apps

**Primary Colors:**

- Primary: Deep ocean blue (oklch(0.50 0.18 240))
- Secondary: Teal
- Accent: Cyan

### Forest Theme

**Characteristics:**

- Natural green and brown palette
- Calm, earthy tones
- Organic, sustainable aesthetic
- Best for: Environmental apps, wellness products, outdoor brands

**Primary Colors:**

- Primary: Forest green (oklch(0.52 0.12 140))
- Secondary: Moss green
- Accent: Amber

---

## Dark Mode Support

Each theme supports **three color modes**:

- **Light** - Optimized for bright environments
- **Dark** - Optimized for low-light environments
- **Auto** - Follows system preference via `prefers-color-scheme`

For comprehensive dark mode documentation, see [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md).

### Quick Example

```tsx
import { useTheme } from '@grasdouble/lufa_design-system';

function ThemeSwitcher() {
  const { mode, setMode } = useTheme();

  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="auto">Auto</option>
    </select>
  );
}
```

---

## How Theme Switching Works

### HTML Data Attributes

Themes are applied via HTML `data-*` attributes on the root element:

```html
<html data-theme="ocean" data-mode="dark">
  <!-- Your app -->
</html>
```

**Attributes:**

- `data-theme` - Theme variant (`default`, `ocean`, `forest`)
- `data-mode` - Color mode (`light`, `dark`, `auto`)

### The `useTheme` Hook

The `useTheme` hook manages theme state and applies it to the DOM:

```tsx
import { useTheme } from '@grasdouble/lufa_design-system';

function App() {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Current mode: {mode}</p>

      <button onClick={() => setTheme('ocean')}>Ocean Theme</button>
      <button onClick={() => setMode('dark')}>Dark Mode</button>
    </div>
  );
}
```

**Hook API:**

```typescript
interface UseThemeReturn {
  theme: 'default' | 'ocean' | 'forest';
  mode: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'default' | 'ocean' | 'forest') => void;
  setMode: (mode: 'light' | 'dark' | 'auto') => void;
  effectiveMode: 'light' | 'dark'; // Resolved mode (auto → light/dark)
}
```

### Scoped Theming

Apply different themes to different parts of your app:

```tsx
function Dashboard() {
  return (
    <div data-theme="default">
      <header>Default theme header</header>

      <main>
        <section data-theme="ocean">
          <h2>Ocean themed section</h2>
        </section>

        <section data-theme="forest">
          <h2>Forest themed section</h2>
        </section>
      </main>
    </div>
  );
}
```

CSS custom properties cascade, so child elements inherit theme values unless overridden.

---

## OKLCH Color Format

### What is OKLCH?

**OKLCH** (Lightness, Chroma, Hue in the OKLAB color space) is a modern color format designed for:

- **Perceptual uniformity** - Equal numeric changes = equal visual changes
- **Wide color gamut** - Access to more vibrant colors than sRGB
- **Predictable manipulation** - Adjust lightness without changing perceived hue
- **Better interpolation** - Smooth gradients without muddy middle colors

### Syntax

```css
oklch(L C H / A)
```

- **L** (Lightness): 0 (black) to 1 (white)
- **C** (Chroma): 0 (gray) to 0.4+ (vibrant) - no fixed maximum
- **H** (Hue): 0-360 degrees (0=red, 120=green, 240=blue)
- **A** (Alpha): 0 (transparent) to 1 (opaque) - optional

### Why OKLCH?

#### Perceptual Uniformity

```css
/* HSL - Lightness values don't look equally bright */
hsl(240, 100%, 50%) /* Blue - looks dark */
hsl(60, 100%, 50%)  /* Yellow - looks bright */

/* OKLCH - Same lightness = same perceived brightness */
oklch(0.50 0.20 240) /* Blue */
oklch(0.50 0.20 60)  /* Yellow - same visual brightness */
```

#### Predictable Color Manipulation

```css
/* Creating a darker variant */
:root {
  --color-primary: oklch(0.6 0.15 250);
  --color-primary-dark: oklch(0.45 0.15 250); /* Just reduce L */
}

/* Hue and chroma stay consistent! */
```

#### Wide Gamut Support

```css
/* Vibrant colors impossible in sRGB */
.vivid-cyan {
  background: oklch(0.7 0.25 200); /* P3 color space */
}
```

### OKLCH Examples

```css
/* Grays - Zero chroma */
--gray-50: oklch(0.98 0 0);
--gray-500: oklch(0.6 0 0);
--gray-900: oklch(0.2 0 0);

/* Primary colors - Consistent lightness */
--blue-500: oklch(0.55 0.15 250);
--green-500: oklch(0.55 0.12 140);
--red-500: oklch(0.55 0.18 25);

/* Color scales - Same chroma, varying lightness */
--blue-300: oklch(0.7 0.12 250);
--blue-500: oklch(0.55 0.15 250);
--blue-700: oklch(0.4 0.18 250);

/* Semi-transparent */
--overlay: oklch(0.2 0 0 / 0.5);
```

### Browser Support

OKLCH is supported in:

- ✅ Chrome 111+
- ✅ Safari 15.4+
- ✅ Firefox 113+

**Fallback strategy:**

```css
.button {
  /* Fallback for older browsers */
  background: #3b82f6;

  /* OKLCH for modern browsers */
  background: oklch(0.55 0.15 250);
}
```

### Tools and Resources

- [OKLCH Color Picker](https://oklch.com/) - Interactive color picker
- [Color.js](https://colorjs.io/) - JavaScript color manipulation library
- [OKLCH in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) - MDN documentation

---

## Creating Custom Themes

### Step 1: Define Theme Tokens

Create a new CSS file in `packages/design-system/tokens/src/themes/`:

```css
/* my-theme.css */

[data-theme='my-theme'][data-mode='light'] {
  /* Colors */
  --lufa-token-primary-50: oklch(0.97 0.02 280);
  --lufa-token-primary-100: oklch(0.94 0.04 280);
  --lufa-token-primary-200: oklch(0.88 0.08 280);
  --lufa-token-primary-300: oklch(0.76 0.12 280);
  --lufa-token-primary-400: oklch(0.64 0.16 280);
  --lufa-token-primary-500: oklch(0.52 0.2 280);
  --lufa-token-primary-600: oklch(0.45 0.22 280);
  --lufa-token-primary-700: oklch(0.38 0.2 280);
  --lufa-token-primary-800: oklch(0.3 0.16 280);
  --lufa-token-primary-900: oklch(0.22 0.12 280);
  --lufa-token-primary-950: oklch(0.15 0.08 280);

  /* Semantic mappings */
  --color-primary: var(--lufa-token-primary-600);
  --color-primary-hover: var(--lufa-token-primary-700);
  --color-primary-active: var(--lufa-token-primary-800);

  /* Background colors */
  --color-background: oklch(1 0 0);
  --color-background-secondary: oklch(0.98 0.01 280);
  --color-background-tertiary: oklch(0.95 0.02 280);

  /* Text colors */
  --color-text: oklch(0.2 0.02 280);
  --color-text-secondary: oklch(0.45 0.02 280);
  --color-text-tertiary: oklch(0.6 0.01 280);

  /* Border colors */
  --color-border: oklch(0.85 0.02 280);
  --color-border-secondary: oklch(0.9 0.01 280);
}

[data-theme='my-theme'][data-mode='dark'] {
  /* Dark mode variants - invert lightness */
  --lufa-token-primary-50: oklch(0.15 0.08 280);
  --lufa-token-primary-100: oklch(0.22 0.12 280);
  --lufa-token-primary-200: oklch(0.3 0.16 280);
  --lufa-token-primary-300: oklch(0.38 0.2 280);
  --lufa-token-primary-400: oklch(0.45 0.22 280);
  --lufa-token-primary-500: oklch(0.52 0.2 280);
  --lufa-token-primary-600: oklch(0.64 0.16 280);
  --lufa-token-primary-700: oklch(0.76 0.12 280);
  --lufa-token-primary-800: oklch(0.88 0.08 280);
  --lufa-token-primary-900: oklch(0.94 0.04 280);
  --lufa-token-primary-950: oklch(0.97 0.02 280);

  /* Semantic mappings */
  --color-primary: var(--lufa-token-primary-400);
  --color-primary-hover: var(--lufa-token-primary-300);
  --color-primary-active: var(--lufa-token-primary-200);

  /* Background colors */
  --color-background: oklch(0.15 0.02 280);
  --color-background-secondary: oklch(0.18 0.02 280);
  --color-background-tertiary: oklch(0.22 0.02 280);

  /* Text colors */
  --color-text: oklch(0.95 0.01 280);
  --color-text-secondary: oklch(0.7 0.01 280);
  --color-text-tertiary: oklch(0.55 0.01 280);

  /* Border colors */
  --color-border: oklch(0.3 0.02 280);
  --color-border-secondary: oklch(0.25 0.02 280);
}
```

### Step 2: Register the Theme

Update `packages/design-system/tokens/src/index.css`:

```css
/* Import base tokens */
@import './primitives.css';
@import './colors.css';
@import './spacing.css';
@import './typography.css';

/* Import themes */
@import './themes/default.css';
@import './themes/ocean.css';
@import './themes/forest.css';
@import './themes/my-theme.css'; /* Add your theme */
```

### Step 3: Add TypeScript Types

Update `packages/design-system/tokens/src/types.ts`:

```typescript
export type ThemeVariant = 'default' | 'ocean' | 'forest' | 'my-theme';

export type ColorMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  theme: ThemeVariant;
  mode: ColorMode;
}
```

### Step 4: Update Theme Context

Update `packages/design-system/main/src/context/ThemeContext.tsx`:

```typescript
const THEMES = ['default', 'ocean', 'forest', 'my-theme'] as const;
```

### Step 5: Build and Test

```bash
# Build tokens package
pnpm ds:tokens:build

# Build main package
pnpm ds:main:build

# Start Storybook
pnpm ds:storybook:dev
```

### Step 6: Create Storybook Story

Add a story to showcase your theme:

```tsx
// packages/design-system/storybook/src/stories/Themes.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@grasdouble/lufa_design-system';

const meta: Meta = {
  title: 'Themes/My Theme',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const MyThemeLight: StoryObj = {
  render: () => (
    <div data-theme="my-theme" data-mode="light">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  ),
};

export const MyThemeDark: StoryObj = {
  render: () => (
    <div data-theme="my-theme" data-mode="dark">
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  ),
};
```

---

## Theme Token Structure

### Token Naming Convention

```
--lufa-token-{scale}-{value}
```

**Examples:**

- `--lufa-token-blue-600` - Primitive color value
- `--lufa-token-spacing-4` - Primitive spacing value
- `--lufa-token-radius-md` - Primitive border radius value

### Component Variable Convention

```
--{property}-{variant}
```

**Examples:**

- `--color-primary` - Primary color
- `--spacing-default` - Default spacing
- `--radius-button` - Button border radius

### Required Token Categories

Every theme must define tokens for:

#### 1. Colors

```css
/* Brand colors */
--color-primary
--color-primary-hover
--color-primary-active
--color-secondary
--color-secondary-hover
--color-secondary-active

/* Semantic colors */
--color-success
--color-warning
--color-error
--color-info

/* Background colors */
--color-background
--color-background-secondary
--color-background-tertiary
--color-surface
--color-surface-hover

/* Text colors */
--color-text
--color-text-secondary
--color-text-tertiary
--color-text-inverse

/* Border colors */
--color-border
--color-border-secondary
--color-border-focus

/* Interactive states */
--color-hover
--color-active
--color-disabled
```

#### 2. Spacing

```css
--spacing-xs    /* Extra small - 4px */
--spacing-sm    /* Small - 8px */
--spacing-md    /* Medium - 16px */
--spacing-lg    /* Large - 24px */
--spacing-xl    /* Extra large - 32px */
--spacing-2xl   /* 2X large - 48px */
```

#### 3. Typography

```css
/* Font sizes */
--font-size-xs
--font-size-sm
--font-size-base
--font-size-lg
--font-size-xl
--font-size-2xl

/* Font weights */
--font-weight-normal
--font-weight-medium
--font-weight-semibold
--font-weight-bold

/* Line heights */
--line-height-tight
--line-height-normal
--line-height-relaxed
```

#### 4. Borders

```css
/* Border widths */
--border-width-thin
--border-width-default
--border-width-thick

/* Border radius */
--radius-sm
--radius-md
--radius-lg
--radius-full
```

#### 5. Shadows

```css
--shadow-sm
--shadow-md
--shadow-lg
--shadow-xl
```

#### 6. Transitions

```css
--transition-fast     /* 150ms */
--transition-base     /* 200ms */
--transition-slow     /* 300ms */
```

### Token Mapping Example

```css
/* Primitive tokens (Layer 1) */
:root {
  --lufa-token-blue-600: oklch(0.55 0.15 250);
  --lufa-token-spacing-16: 16px;
}

/* Theme tokens (Layer 2) */
[data-theme='default'] {
  --color-primary: var(--lufa-token-blue-600);
  --spacing-md: var(--lufa-token-spacing-16);
}

/* Component usage (Layer 3) */
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}
```

---

## CSS Implementation Patterns

### Pattern 1: Basic Component Styling

```css
/* ✅ GOOD - Use theme tokens */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.card:hover {
  background: var(--color-surface-hover);
  box-shadow: var(--shadow-md);
}

/* ❌ BAD - Hard-coded values */
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Pattern 2: Color Variants

```css
/* Base button styles */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  border: none;
  cursor: pointer;
}

/* Primary variant */
.button--primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.button--primary:hover {
  background: var(--color-primary-hover);
}

.button--primary:active {
  background: var(--color-primary-active);
}

/* Secondary variant */
.button--secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.button--secondary:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
}
```

### Pattern 3: Responsive Spacing

```css
.container {
  /* Base spacing */
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
}

/* Larger screens - use larger spacing */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
    gap: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-xl);
    gap: var(--spacing-lg);
  }
}
```

### Pattern 4: Focus States

```css
.input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-background);
  color: var(--color-text);
  transition: border-color var(--transition-fast);
}

.input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px oklch(from var(--color-primary) l c h / 0.1);
}

.input:disabled {
  background: var(--color-disabled);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
}
```

### Pattern 5: Layered Components

```css
/* Modal backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: oklch(0 0 0 / 0.5);
  backdrop-filter: blur(4px);
}

/* Modal content */
.modal-content {
  position: relative;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-xl);
  max-width: 600px;
  margin: var(--spacing-xl) auto;
}

/* Modal header */
.modal-header {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}
```

### Pattern 6: Custom Properties in Components

```css
/* Component with customizable accent color */
.progress-bar {
  --accent-color: var(--color-primary);

  width: 100%;
  height: 8px;
  background: var(--color-border-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: var(--accent-color);
  transition: width var(--transition-base);
}

/* Usage - override accent color */
.progress-bar--success {
  --accent-color: var(--color-success);
}

.progress-bar--warning {
  --accent-color: var(--color-warning);
}
```

### Pattern 7: Relative Color Syntax

```css
/* Create lighter/darker variants dynamically */
.badge {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

/* Lighter background variant using relative color syntax */
.badge--subtle {
  background: oklch(from var(--color-primary) calc(l + 0.2) calc(c * 0.5) h / 0.2);
  color: var(--color-primary);
}

/* Border using primary color at reduced opacity */
.badge--outlined {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid oklch(from var(--color-primary) l c h / 0.5);
}
```

---

## Theme-Specific Visual Properties

### Spacing Scales

Themes can customize spacing scales for different visual densities:

```css
/* Default theme - balanced spacing */
[data-theme='default'] {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

/* Ocean theme - slightly more spacious */
[data-theme='ocean'] {
  --spacing-xs: 6px;
  --spacing-sm: 10px;
  --spacing-md: 18px;
  --spacing-lg: 28px;
  --spacing-xl: 36px;
}

/* Forest theme - compact, cozy */
[data-theme='forest'] {
  --spacing-xs: 4px;
  --spacing-sm: 6px;
  --spacing-md: 12px;
  --spacing-lg: 20px;
  --spacing-xl: 28px;
}
```

### Border Styles

```css
/* Default - subtle borders */
[data-theme='default'] {
  --border-width-default: 1px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* Ocean - stronger definition */
[data-theme='ocean'] {
  --border-width-default: 2px;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

/* Forest - organic, rounded */
[data-theme='forest'] {
  --border-width-default: 1px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}
```

### Transition Speeds

```css
/* Default - standard animations */
[data-theme='default'] {
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
}

/* Ocean - snappier feel */
[data-theme='ocean'] {
  --transition-fast: 100ms;
  --transition-base: 150ms;
  --transition-slow: 250ms;
}

/* Forest - relaxed, natural */
[data-theme='forest'] {
  --transition-fast: 200ms;
  --transition-base: 300ms;
  --transition-slow: 400ms;
}
```

### Shadow Styles

```css
/* Default - subtle elevation */
[data-theme='default'] {
  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px oklch(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px oklch(0 0 0 / 0.1);
}

/* Ocean - dramatic depth */
[data-theme='ocean'] {
  --shadow-sm: 0 2px 4px oklch(0.5 0.1 240 / 0.1);
  --shadow-md: 0 6px 12px oklch(0.5 0.1 240 / 0.15);
  --shadow-lg: 0 15px 25px oklch(0.5 0.1 240 / 0.2);
}

/* Forest - soft, organic */
[data-theme='forest'] {
  --shadow-sm: 0 1px 3px oklch(0.3 0.05 140 / 0.08);
  --shadow-md: 0 4px 8px oklch(0.3 0.05 140 / 0.12);
  --shadow-lg: 0 8px 16px oklch(0.3 0.05 140 / 0.15);
}
```

---

## Component Styling

### Using Tokens in React Components

```tsx
import { ComponentPropsWithoutRef } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.displayName = 'Button';
```

**CSS Module:**

```css
/* Button.module.css */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

/* Variants */
.button--primary {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.button--primary:hover {
  background: var(--color-primary-hover);
}

.button--secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.button--ghost {
  background: transparent;
  color: var(--color-text);
}

.button--ghost:hover {
  background: var(--color-surface-hover);
}

/* Sizes */
.button--sm {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.button--lg {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}
```

### Inline Styles (Avoid When Possible)

If you must use inline styles, reference CSS custom properties:

```tsx
function CustomCard() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        padding: 'var(--spacing-lg)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      Content
    </div>
  );
}
```

**⚠️ Warning:** Inline styles bypass CSS cascade and make theming harder. Use CSS classes instead.

---

## Testing Themes

### Manual Testing in Storybook

1. **Start Storybook:**

```bash
pnpm ds:storybook:dev
```

2. **Use Storybook Theme Toolbar:**
   - Click the theme icon in the toolbar
   - Select theme: Default, Ocean, Forest
   - Toggle mode: Light, Dark, Auto

3. **Test All Component States:**
   - Default state
   - Hover state (use mouse)
   - Focus state (use Tab key)
   - Active state (click and hold)
   - Disabled state

4. **Test Color Contrast:**
   - Use browser DevTools accessibility checker
   - Verify WCAG 2.1 AA compliance (4.5:1 for text, 3:1 for UI components)

### Automated Visual Testing

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    themes: {
      themeOverride: 'ocean', // Test with specific theme
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const OceanThemeLight: Story = {
  args: {
    children: 'Ocean Theme Button',
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const OceanThemeDark: Story = {
  args: {
    children: 'Ocean Theme Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    themes: {
      themeOverride: 'ocean',
      modeOverride: 'dark',
    },
  },
};
```

### Playwright Component Tests

```typescript
// Button.spec.tsx
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test.describe('Button - Theming', () => {
  test('renders with default theme', async ({ mount }) => {
    const component = await mount(
      <div data-theme="default" data-mode="light">
        <Button variant="primary">Click me</Button>
      </div>
    );

    await expect(component.locator('button')).toBeVisible();

    // Check computed styles use theme tokens
    const button = component.locator('button');
    const bgColor = await button.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );

    expect(bgColor).toBeTruthy();
  });

  test('renders with ocean theme dark mode', async ({ mount }) => {
    const component = await mount(
      <div data-theme="ocean" data-mode="dark">
        <Button variant="primary">Click me</Button>
      </div>
    );

    await expect(component.locator('button')).toBeVisible();
  });

  test('theme switching preserves functionality', async ({ mount }) => {
    let clicked = false;

    const component = await mount(
      <div data-theme="forest" data-mode="light">
        <Button onClick={() => { clicked = true; }}>Click me</Button>
      </div>
    );

    await component.locator('button').click();
    expect(clicked).toBe(true);
  });
});
```

### Testing Checklist

- [ ] All themes render correctly in light mode
- [ ] All themes render correctly in dark mode
- [ ] Auto mode respects system preference
- [ ] Theme switching works without page reload
- [ ] All interactive states work (hover, focus, active, disabled)
- [ ] Text contrast meets WCAG 2.1 AA standards
- [ ] Focus indicators are visible in all themes
- [ ] Components maintain functionality across themes
- [ ] Custom theme tokens are applied correctly
- [ ] No hard-coded color values in components

---

## Troubleshooting

### Issue: Theme Not Applying

**Symptoms:**

- Components render with default browser styles
- CSS custom properties show as literal strings

**Solutions:**

1. **Check HTML attributes:**

   ```tsx
   // Ensure data-theme and data-mode are set
   <html data-theme="ocean" data-mode="dark">
   ```

2. **Verify tokens are built:**

   ```bash
   pnpm ds:tokens:build
   ```

3. **Check CSS imports:**

   ```css
   /* Ensure theme CSS is imported */
   @import '@grasdouble/lufa_design-system-tokens/dist/index.css';
   ```

4. **Inspect computed styles in DevTools:**

   ```javascript
   // Check if custom properties are defined
   getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
   ```

### Issue: Dark Mode Not Working

**Symptoms:**

- Dark mode toggle doesn't change appearance
- `data-mode="dark"` set but still shows light colors

**Solutions:**

1. **Verify theme CSS includes dark mode selectors:**

   ```css
   [data-theme='default'][data-mode='dark'] {
     /* Dark mode tokens */
   }
   ```

2. **Check selector specificity:**

   ```css
   /* ✅ Correct specificity */
   [data-theme='default'][data-mode='dark'] {
     --color-background: oklch(0.15 0 0);
   }

   /* ❌ May be overridden */
   .some-class {
     background: white; /* Hard-coded, ignores theme */
   }
   ```

3. **Use browser DevTools to inspect:**
   - Check `data-mode` attribute in Elements panel
   - Verify dark mode CSS rules are applied in Styles panel

### Issue: Colors Look Wrong

**Symptoms:**

- Colors appear different than expected
- OKLCH colors not rendering

**Solutions:**

1. **Check browser support:**
   - OKLCH requires Chrome 111+, Safari 15.4+, Firefox 113+
   - Add fallback for older browsers:

   ```css
   .element {
     background: #3b82f6; /* Fallback */
     background: oklch(0.55 0.15 250); /* OKLCH */
   }
   ```

2. **Verify OKLCH syntax:**

   ```css
   /* ✅ Correct */
   color: oklch(0.55 0.15 250);

   /* ❌ Incorrect - missing commas */
   color: oklch(0.55, 0.15, 250);
   ```

3. **Check color gamut:**

   ```css
   /* Force P3 color space if needed */
   @media (color-gamut: p3) {
     .vivid {
       color: oklch(0.7 0.25 200);
     }
   }
   ```

### Issue: Theme Switching Causes Flash

**Symptoms:**

- Brief flash of wrong theme when page loads
- Theme appears to "jump" when switching

**Solutions:**

1. **Add inline script in HTML head:**

   ```html
   <script>
     // Read theme preference before page renders
     const theme = localStorage.getItem('lufa-theme') || 'default';
     const mode = localStorage.getItem('lufa-mode') || 'auto';
     document.documentElement.dataset.theme = theme;
     document.documentElement.dataset.mode = mode;
   </script>
   ```

2. **Use CSS transitions sparingly:**

   ```css
   /* Avoid transitioning all properties */
   .element {
     /* ❌ Causes flash */
     transition: all 200ms;

     /* ✅ Transition specific properties */
     transition:
       background-color 200ms,
       color 200ms;
   }
   ```

3. **Disable transitions during theme change:**

   ```typescript
   function changeTheme(newTheme: string) {
     // Disable transitions
     document.body.classList.add('no-transitions');

     // Change theme
     document.documentElement.dataset.theme = newTheme;

     // Re-enable transitions after paint
     requestAnimationFrame(() => {
       requestAnimationFrame(() => {
         document.body.classList.remove('no-transitions');
       });
     });
   }
   ```

   ```css
   .no-transitions * {
     transition: none !important;
   }
   ```

### Issue: Custom Theme Not Working

**Symptoms:**

- Custom theme file imported but tokens not applying
- Components still use default theme

**Solutions:**

1. **Check import order in `index.css`:**

   ```css
   /* Primitives must come first */
   @import './primitives.css';

   /* Then themes */
   @import './themes/default.css';
   @import './themes/my-theme.css'; /* Your theme */
   ```

2. **Verify selector specificity:**

   ```css
   /* ✅ Match the pattern used by other themes */
   [data-theme='my-theme'][data-mode='light'] {
     /* Tokens */
   }

   /* ❌ Missing attribute selectors */
   .my-theme {
     /* Won't work */
   }
   ```

3. **Rebuild tokens package:**

   ```bash
   pnpm ds:tokens:build
   pnpm ds:main:build
   ```

4. **Check TypeScript types:**

   ```typescript
   // types.ts - ensure theme is added
   export type ThemeVariant = 'default' | 'ocean' | 'forest' | 'my-theme';
   ```

### Issue: CSS Custom Properties Not Updating

**Symptoms:**

- Changing token values doesn't affect components
- Old values still visible after rebuild

**Solutions:**

1. **Clear build cache:**

   ```bash
   rm -rf packages/design-system/tokens/dist
   rm -rf packages/design-system/main/dist
   pnpm ds:all:build
   ```

2. **Hard refresh browser:**
   - Chrome/Firefox: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

3. **Check file watchers:**

   ```bash
   # Restart dev server
   pnpm ds:storybook:dev
   ```

4. **Verify CSS is imported:**

   ```typescript
   // main/src/index.ts
   import '@grasdouble/lufa_design-system-tokens/dist/index.css';
   ```

### Issue: Performance Problems

**Symptoms:**

- Slow theme switching
- Janky animations
- High CPU usage

**Solutions:**

1. **Minimize CSS custom property usage in animations:**

   ```css
   /* ❌ Avoid animating custom properties */
   .element {
     transition: var(--color-primary) 300ms;
   }

   /* ✅ Animate specific properties */
   .element {
     background: var(--color-primary);
     transition: background-color 300ms;
   }
   ```

2. **Use `will-change` sparingly:**

   ```css
   .animated-element {
     /* Only on elements that will animate */
     will-change: transform, opacity;
   }
   ```

3. **Reduce selector complexity:**

   ```css
   /* ❌ Overly specific */
   [data-theme='default'][data-mode='dark'] .container .card .button {
     /* Styles */
   }

   /* ✅ Simpler */
   .button {
     /* Use inherited custom properties */
   }
   ```

---

## Resources

### Documentation

- [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md) - Comprehensive dark mode documentation
- [AGENTS.md](../AGENTS.md) - Complete development guide
- [CLAUDE.md](../CLAUDE.md) - Quick reference for design system architecture

### External Resources

- [OKLCH Color Picker](https://oklch.com/) - Interactive OKLCH color tool
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) - CSS variables reference
- [MDN: OKLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) - OKLCH documentation
- [Color.js](https://colorjs.io/) - Color manipulation library
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards

### Related Files

```
packages/design-system/
├── tokens/
│   ├── src/
│   │   ├── primitives.css        # Layer 1: Raw values
│   │   ├── colors.css            # Color primitives
│   │   ├── spacing.css           # Spacing primitives
│   │   ├── themes/
│   │   │   ├── default.css       # Default theme
│   │   │   ├── ocean.css         # Ocean theme
│   │   │   └── forest.css        # Forest theme
│   │   ├── types.ts              # TypeScript types
│   │   └── index.css             # Main entry point
│   └── package.json
├── main/
│   ├── src/
│   │   ├── context/
│   │   │   └── ThemeContext.tsx  # Theme management hook
│   │   └── components/           # Components using tokens
│   └── package.json
└── storybook/
    ├── src/
    │   └── stories/              # Theme examples
    └── .storybook/
        └── preview.ts            # Storybook theme config
```

---

## Conclusion

The Lufa Design System's theming architecture provides:

✅ **Flexibility** - Multiple themes with light/dark modes
✅ **Consistency** - Token-based design ensures visual coherence
✅ **Maintainability** - Change tokens in one place, update everywhere
✅ **Performance** - CSS custom properties, no JavaScript overhead
✅ **Modern** - OKLCH colors, wide gamut support
✅ **Accessible** - WCAG 2.1 AA compliant by default
✅ **Type-Safe** - Full TypeScript support

For questions or issues, refer to the [Troubleshooting](#troubleshooting) section or consult the [AGENTS.md](../AGENTS.md) development guide.

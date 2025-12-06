# CSS Architecture & Usage Guide

This document explains the CSS build outputs and when to use each file.

## Philosophy

**The Design System provides tokens and components, NOT a pre-compiled CSS bundle.**

Apps are responsible for:

- Setting up their own Tailwind (if they want utilities)
- Processing the design system's `tailwind.css` source
- Managing their own CSS architecture

The design system exports:

- Components (JS) - Import directly from the package
- `style.css` - Pre-compiled component CSS modules (70KB)

Separate packages provide:

- `@grasdouble/lufa_design-system-tokens/tokens.css` - CSS variables (11KB)
- `@grasdouble/lufa_design-system-themes` - Theme variants (ocean.css, forest.css)

> **Important:** `style.css` contains ONLY the pre-compiled component styles (from CSS modules), NOT a full Tailwind bundle. It does not include Tailwind's base/reset or utilities - just the component CSS.

### Component Styling Architecture

**Components are built using Tailwind `@apply` directives, which are pre-compiled during the DS build.**

This ensures:

- ✅ Modern DX in the DS: Use Tailwind utilities via `@apply`
- ✅ Components ship with **compiled CSS** - no Tailwind needed in consuming apps
- ✅ CSS modules are automatically imported with components
- ✅ Apps that want Tailwind utilities can separately import and process `tailwind.css`

The CSS modules are processed by Vite + Tailwind during the DS build, converting `@apply` directives into actual CSS that's bundled with each component. Consuming apps just import components and they work.

## Overview

The Lufa Design System provides multiple CSS entry points for different use cases:

```
@grasdouble/lufa_design-system/
└── style.css           # Pre-compiled component CSS modules (70KB)

@grasdouble/lufa_design-system-tokens/
└── tokens.css          # CSS variables only (11KB)

@grasdouble/lufa_design-system-themes/
├── ocean.css           # Ocean theme overrides
└── forest.css          # Forest theme overrides
```

## Use Cases

### 1. I want design tokens CSS variables only

**Import:** `@grasdouble/lufa_design-system-tokens/tokens.css`

**Contains:**

- All CSS custom properties (`--lufa-*`)
- Colors, typography, spacing, radius, shadows, z-index, breakpoints
- **No** Tailwind utilities
- **No** Tailwind reset/base styles
- **No** component styles (those come via CSS modules)

**Use when:**

- Integrating with existing CSS frameworks (Docusaurus, custom CSS, etc.)
- Building custom components with design tokens
- You want maximum control and no conflicts

**Example:**

```css
/* In your CSS file */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';

.my-button {
    background: var(--lufa-color-interactive-default);
    padding: var(--lufa-spacing-md);
    border-radius: var(--lufa-radius-lg);
    box-shadow: var(--lufa-shadow-md);
}
```

---

### 2. I want themability

**Import:** Tokens + theme file from dedicated package

**Available themes:**

- `@grasdouble/lufa_design-system-themes/ocean.css`
- `@grasdouble/lufa_design-system-themes/forest.css`

**Use when:**

- You want to apply a pre-built theme
- You want to see how theme overrides work

**Example:**

```css
/* Import tokens first, then theme */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';
@import '@grasdouble/lufa_design-system-themes/ocean.css';
```

Or create your own theme:

```css
@import '@grasdouble/lufa_design-system-tokens/tokens.css';

/* Override foundation variables */
:root {
    --lufa-color-interactive-default: #ff6b6b;
    --lufa-radius-lg: 16px;
}
```

---

### 3. I want to use components

**Import:** Just import the components

**Contains:**

- Component CSS modules are automatically included
- Each component brings its own scoped styles

**Use when:**

- You only need specific components
- You're handling CSS architecture yourself
- You want minimal CSS footprint

**Example:**

```tsx
import { Button, Card } from '@grasdouble/lufa_design-system';

// Component styles are automatically included via CSS modules
// But you might want tokens.css for the CSS variables:
import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

---

## Decision Tree

```
Do you want themes?
├─ YES → Import tokens.css + theme from @grasdouble/lufa_design-system-themes
└─ NO → Import tokens.css only

Do you just want components?
└─ Import components (styles included) + tokens.css for variables
```

## File Comparison

| Package/File | Size | Contains                                   | Use Case                               |
| ------------ | ---- | ------------------------------------------ | -------------------------------------- |
| `tokens.css` | 11KB | CSS variables (`--lufa-*`) from tokens pkg | Design tokens for custom styling       |
| `style.css`  | 70KB | Pre-compiled component CSS modules         | Automatically included with components |
| `ocean.css`  | 2KB  | Theme overrides from themes package        | Optional theming                       |
| `forest.css` | 2KB  | Theme overrides from themes package        | Optional theming                       |

## Examples by Framework

### Docusaurus

```css
/* src/css/custom.css */
@import '@grasdouble/lufa_design-system-tokens/tokens.css'; /* CSS variables */
/* Component styles are automatically included when you import components */
```

### Next.js (with Tailwind)

```tsx
// app/globals.css
@import '@grasdouble/lufa_design-system-tokens/tokens.css';

// Configure your own Tailwind setup
// The design system no longer exports Tailwind configuration
```

### Next.js (without Tailwind)

```tsx
// app/layout.tsx
import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

### Vanilla React/Vite (with Tailwind)

```css
/* src/index.css */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

```ts
// vite.config.ts
// Configure your own Tailwind setup
```

### Vanilla React/Vite (without Tailwind)

```tsx
// main.tsx
import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

### Storybook (with Tailwind)

```tsx
// .storybook/preview.tsx
import '@grasdouble/lufa_design-system-tokens/tokens.css';
// Configure your own Tailwind setup
```

### Storybook (without Tailwind)

```tsx
// .storybook/preview.tsx
import '@grasdouble/lufa_design-system-tokens/tokens.css';
```

# CSS Architecture & Usage Guide

This document explains the CSS build outputs and when to use each file.

## Philosophy

**The Design System provides tokens and components, NOT a pre-compiled CSS bundle.**

Apps are responsible for:

- Setting up their own Tailwind (if they want utilities)
- Processing the design system's `tailwind.css` source
- Managing their own CSS architecture

The design system exports:

- `foundation.css` - CSS variables only (11KB)
- `style.css` - Pre-compiled component CSS modules (70KB)
- `tailwind.css` - Source config to extend in your Tailwind setup (7KB)
- Components (JS) - Import directly from the package

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
dist/
├── foundation.css       # CSS variables only (11KB)
├── style.css           # Pre-compiled component CSS modules (70KB)
├── tailwind.css        # Source config for Tailwind (7KB)
└── themes/
    ├── ocean.css       # Ocean theme overrides
    └── forest.css      # Forest theme overrides
```

## Use Cases

### 1. I want foundation CSS variables only

**Import:** `@grasdouble/lufa_design-system/foundation.css`

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
@import '@grasdouble/lufa_design-system/foundation.css';

.my-button {
    background: var(--lufa-color-interactive-default);
    padding: var(--lufa-spacing-md);
    border-radius: var(--lufa-radius-lg);
    box-shadow: var(--lufa-shadow-md);
}
```

---

### 3. I want to use Tailwind utilities with design system tokens

**Import:** `@grasdouble/lufa_design-system/tailwind.css`

**Contains:**

- Source Tailwind configuration
- `@theme` mappings from design tokens to Tailwind utilities
- Theme imports
- **Requires** Tailwind to be processed

**Use when:**

- Building a new app with Tailwind CSS
- You want Tailwind utilities configured with design system tokens
- You have a build step that processes Tailwind

**Example:**

```javascript
// vite.config.js or tailwind.config.js
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    // The design system's tailwind.css will be imported in your app
};
```

```tsx
// In your component
import '@grasdouble/lufa_design-system/tailwind.css';

function MyComponent() {
    return <div className="bg-interactive-default p-md rounded-lg text-white shadow-md">Using Tailwind utilities with design tokens!</div>;
}
```

---

### 4. I want themability

**Import:** Foundation + theme file

**Available themes:**

- `@grasdouble/lufa_design-system/themes/ocean.css`
- `@grasdouble/lufa_design-system/themes/forest.css`

**Use when:**

- You want to apply a pre-built theme
- You want to see how theme overrides work

**Example:**

```css
/* Import foundation first, then theme */
@import '@grasdouble/lufa_design-system/foundation.css';
@import '@grasdouble/lufa_design-system/themes/ocean.css';
```

Or create your own theme:

```css
@import '@grasdouble/lufa_design-system/foundation.css';

/* Override foundation variables */
:root {
    --lufa-color-interactive-default: #ff6b6b;
    --lufa-radius-lg: 16px;
}
```

---

### 5. I want to customize component styles

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
// But you might want foundation.css for the CSS variables:
import '@grasdouble/lufa_design-system/foundation.css';
```

---

## Decision Tree

```
Do you need Tailwind utilities?
├─ YES → Use tailwind.css (source) + set up Tailwind in your app
└─ NO → Use foundation.css only

Do you want themes?
└─ Import foundation.css + themes/[theme].css

Do you just want components?
└─ Import components + foundation.css for variables
```

## File Comparison

| File             | Size | Contains                                    | Use Case                          |
| ---------------- | ---- | ------------------------------------------- | --------------------------------- |
| `foundation.css` | 11KB | CSS variables (`--lufa-*`)                  | Always needed for components      |
| `style.css`      | 70KB | Pre-compiled component CSS modules          | Needed to render components       |
| `tailwind.css`   | 7KB  | Tailwind source config with `@theme` tokens | For apps using Tailwind utilities |

## Examples by Framework

### Docusaurus

```css
/* src/css/custom.css */
@import '@grasdouble/lufa_design-system/foundation.css'; /* CSS variables */
@import '@grasdouble/lufa_design-system/style.css'; /* Component styles */
```

### Next.js (with Tailwind)

```tsx
// app/globals.css
@import '@grasdouble/lufa_design-system/tailwind.css';

// tailwind.config.ts
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@grasdouble/lufa_design-system/dist/**/*.mjs'
  ],
  // Your Tailwind config extends the design system
}
```

### Next.js (without Tailwind)

```tsx
// app/layout.tsx
import '@grasdouble/lufa_design-system/foundation.css';
```

### Vanilla React/Vite (with Tailwind)

```css
/* src/index.css */
@import '@grasdouble/lufa_design-system/tailwind.css';
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
});
```

### Vanilla React/Vite (without Tailwind)

```tsx
// main.tsx
import '@grasdouble/lufa_design-system/foundation.css';
```

### Storybook (with Tailwind)

```tsx
// .storybook/preview.tsx
import '@grasdouble/lufa_design-system/tailwind.css';
// Configure Tailwind in your Storybook setup
```

### Storybook (without Tailwind)

```tsx
// .storybook/preview.tsx
import '@grasdouble/lufa_design-system/foundation.css';
```

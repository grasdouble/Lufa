---
id: theming
title: Theming Guide
sidebar_label: Theming
description: Customize themes and tokens for the design system.
sidebar_position: 3
---

# Theming Guide

Customize the Lufa Design System to match your brand identity using design tokens and modes.

## Understanding the Token Architecture

Lufa uses a **three-layer token architecture** (ADR-011) that separates immutable primitives from themeable semantic tokens:

```
┌──────────────────────────────────────────────────────┐
│         Layer 3: Component Tokens                    │
│    Component-specific styling (themeable)            │
│    --lufa-component-button-primary-background        │
│    --lufa-component-badge-padding-md                 │
└─────────────────────┬────────────────────────────────┘
                      │ references
┌─────────────────────▼────────────────────────────────┐
│         Layer 2: Semantic Tokens                     │
│    Meaningful, mode-aware tokens (themeable)         │
│    --lufa-semantic-ui-background-page                │
│    --lufa-semantic-ui-text-primary                   │
│    --lufa-semantic-button-primary-background         │
└─────────────────────┬────────────────────────────────┘
                      │ references
┌─────────────────────▼────────────────────────────────┐
│         Layer 1: Primitive Tokens                    │
│    Immutable constants (never change)                │
│    --lufa-primitive-color-blue-600: #2563eb          │
│    --lufa-primitive-spacing-16: 16px                 │
│    Like Math.PI - always the same value              │
└──────────────────────────────────────────────────────┘
```

### Key Architectural Principles

**1. Primitive Tokens = Immutable Constants**

- Raw values that **never change** regardless of mode or theme
- Think of them like `Math.PI` - always the same value
- Examples: `--lufa-primitive-color-blue-600`, `--lufa-primitive-spacing-16`
- Used as building blocks, not directly in components

**2. Semantic Tokens = Mode-Aware Meanings**

- Provide meaningful names for different contexts
- **Change based on mode** (light/dark/high-contrast)
- Examples: `--lufa-semantic-ui-text-primary`, `--lufa-semantic-ui-background-page`
- Reference primitive tokens, but mapping changes per mode

**3. Component Tokens = Component-Specific Styles**

- Specific styling for individual components
- Also **mode-aware** and can be customized
- Examples: `--lufa-component-button-primary-background`, `--lufa-component-badge-padding-md`
- Reference semantic tokens for consistency

## Using Built-in Modes

Lufa includes three built-in **modes** for accessibility and user preference:

- **`light`** - Standard light mode (default)
- **`dark`** - Dark mode for low-light environments
- **`high-contrast`** - High-contrast mode for accessibility (WCAG AAA)

### Mode Switching Example

```tsx title="src/App.tsx"
import '@grasdouble/lufa_design-system/style.css';

import { useState } from 'react';

function App() {
  const [mode, setMode] = useState<'light' | 'dark' | 'high-contrast'>('light');

  // Apply mode to document root
  document.documentElement.setAttribute('data-mode', mode);

  return (
    <div>
      <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
        <option value="high-contrast">High-Contrast Mode</option>
      </select>
      {/* Your app content */}
    </div>
  );
}
```

### Automatic System Preference Detection

Lufa automatically detects system preferences using CSS media queries:

```css
/* Automatically applies dark mode if user prefers it */
@media (prefers-color-scheme: dark) {
  :root:not([data-mode]) {
    /* Dark mode tokens applied automatically */
  }
}
```

To respect system preferences, simply don't set `data-mode` explicitly.

## Customizing Design Tokens

You can customize the design system by overriding **semantic** and **component** tokens. **Never override primitive tokens directly** - they are immutable constants.

### Override Semantic Tokens

```css title="src/custom-theme.css"
:root {
  /* ✅ CORRECT: Override semantic tokens for light mode */
  --lufa-semantic-ui-background-page: #f0f9ff;
  --lufa-semantic-ui-text-primary: #0c4a6e;
  --lufa-semantic-button-primary-background: #0284c7;
}

[data-mode='dark'] {
  /* ✅ CORRECT: Override semantic tokens for dark mode */
  --lufa-semantic-ui-background-page: #0c4a6e;
  --lufa-semantic-ui-text-primary: #f0f9ff;
  --lufa-semantic-button-primary-background: #0ea5e9;
}

/* ❌ WRONG: Don't override primitives - they are constants */
/* --lufa-primitive-color-blue-600: #custom; */
```

Import your custom theme after the design system CSS:

```tsx title="src/main.tsx"
import '@grasdouble/lufa_design-system/style.css';
import './custom-theme.css'; // Your overrides
```

### Understanding Token Layers

**Primitive Tokens (Immutable)**

```css
/* These NEVER change - like Math.PI */
--lufa-primitive-color-blue-600: #2563eb; /* Always this hex value */
--lufa-primitive-spacing-16: 16px; /* Always 16 pixels */
--lufa-primitive-color-gray-900: #111827; /* Always this shade */
```

**Semantic Tokens (Mode-Aware)**

```css
/* Light mode */
[data-mode='light'] {
  --lufa-semantic-ui-text-primary: var(--lufa-primitive-color-gray-900);
  --lufa-semantic-ui-background-page: var(--lufa-primitive-color-gray-50);
}

/* Dark mode - same token name, different primitive mapping */
[data-mode='dark'] {
  --lufa-semantic-ui-text-primary: var(--lufa-primitive-color-gray-50);
  --lufa-semantic-ui-background-page: var(--lufa-primitive-color-gray-900);
}
```

**Component Tokens (Component-Specific)**

```css
/* Component tokens reference semantic tokens */
--lufa-component-button-primary-background: var(--lufa-semantic-button-primary-background);
--lufa-component-badge-padding-md: 4px 8px;
```

## Available Token Categories

### Semantic UI Tokens

```css
/* Page and Surface Backgrounds */
--lufa-semantic-ui-background-page          /* Main page background */
--lufa-semantic-ui-background-surface       /* Card/panel backgrounds */

/* Text Colors */
--lufa-semantic-ui-text-primary             /* Primary text */
--lufa-semantic-ui-text-secondary           /* Secondary text */
--lufa-semantic-ui-text-tertiary            /* Tertiary/subtle text */

/* Status Colors */
--lufa-semantic-ui-text-success             /* Success messages */
--lufa-semantic-ui-text-error               /* Error messages */
--lufa-semantic-ui-text-warning             /* Warning messages */
--lufa-semantic-ui-text-info                /* Info messages */

/* Borders */
--lufa-semantic-ui-border-default           /* Default borders */
--lufa-semantic-ui-border-strong            /* Emphasized borders */

/* Status Borders */
--lufa-semantic-ui-border-success           /* Success borders */
--lufa-semantic-ui-border-error             /* Error borders */
--lufa-semantic-ui-border-warning           /* Warning borders */
--lufa-semantic-ui-border-info              /* Info borders */
```

### Semantic Button Tokens

```css
/* Primary Button */
--lufa-semantic-button-primary-background
--lufa-semantic-button-primary-background-hover
--lufa-semantic-button-primary-background-active
--lufa-semantic-button-primary-text

/* Secondary Button */
--lufa-semantic-button-secondary-background
--lufa-semantic-button-secondary-background-hover
--lufa-semantic-button-secondary-text

/* Destructive Button */
--lufa-semantic-button-destructive-background
--lufa-semantic-button-destructive-background-hover
--lufa-semantic-button-destructive-text
```

### Semantic Spacing & Layout

```css
--lufa-semantic-ui-spacing-tight            /* 4px - minimal spacing */
--lufa-semantic-ui-spacing-compact          /* 8px - compact layouts */
--lufa-semantic-ui-spacing-default          /* 16px - standard spacing */
--lufa-semantic-ui-spacing-comfortable      /* 24px - comfortable spacing */
--lufa-semantic-ui-spacing-spacious         /* 32px - generous spacing */
```

### Semantic Border Radius

```css
--lufa-semantic-ui-radius-small             /* 4px - subtle rounding */
--lufa-semantic-ui-radius-default           /* 8px - standard (most common) */
--lufa-semantic-ui-radius-medium            /* 12px - emphasized rounding */
--lufa-semantic-ui-radius-large             /* 16px - prominent rounding */
--lufa-semantic-ui-radius-full              /* 9999px - pill shape */
```

### Semantic Shadows

```css
--lufa-semantic-ui-shadow-small             /* Subtle elevation */
--lufa-semantic-ui-shadow-medium            /* Standard elevation */
--lufa-semantic-ui-shadow-large             /* Strong elevation */
--lufa-semantic-ui-shadow-extra-large       /* Maximum elevation */
```

### Primitive Tokens (Reference Only)

Primitives are available for **reference**, but should not be used directly in your app code. Use semantic tokens instead.

```css
/* Color Primitives */
--lufa-primitive-color-blue-600: #2563eb;
--lufa-primitive-color-gray-900: #111827;
--lufa-primitive-color-green-500: #22c55e;

/* Spacing Primitives */
--lufa-primitive-spacing-4: 4px;
--lufa-primitive-spacing-16: 16px;
--lufa-primitive-spacing-32: 32px;
```

:::tip Best Practice
Always use **semantic tokens** (e.g., `--lufa-semantic-ui-text-primary`) instead of primitives (e.g., `--lufa-primitive-color-gray-900`). Semantic tokens adapt to modes automatically.
:::

## Creating a Custom Theme

Create a complete theme by overriding semantic and component tokens:

```css title="src/themes/brand-theme.css"
:root,
[data-mode='light'] {
  /* Brand Colors - Light Mode */
  --lufa-semantic-button-primary-background: #6366f1;
  --lufa-semantic-button-primary-background-hover: #4f46e5;
  --lufa-semantic-button-primary-text: #ffffff;

  /* Surface Colors - Light Mode */
  --lufa-semantic-ui-background-page: #ffffff;
  --lufa-semantic-ui-background-surface: #f9fafb;

  /* Text Colors - Light Mode */
  --lufa-semantic-ui-text-primary: #111827;
  --lufa-semantic-ui-text-secondary: #6b7280;
  --lufa-semantic-ui-text-tertiary: #9ca3af;

  /* Border Colors - Light Mode */
  --lufa-semantic-ui-border-default: #e5e7eb;

  /* Spacing & Layout (mode-independent) */
  --lufa-semantic-ui-spacing-default: 16px;
  --lufa-semantic-ui-spacing-comfortable: 24px;

  /* Border Radius (mode-independent) */
  --lufa-semantic-ui-radius-default: 12px;
  --lufa-semantic-ui-radius-large: 16px;
}

[data-mode='dark'] {
  /* Brand Colors - Dark Mode */
  --lufa-semantic-button-primary-background: #818cf8;
  --lufa-semantic-button-primary-background-hover: #a5b4fc;

  /* Surface Colors - Dark Mode */
  --lufa-semantic-ui-background-page: #111827;
  --lufa-semantic-ui-background-surface: #1f2937;

  /* Text Colors - Dark Mode */
  --lufa-semantic-ui-text-primary: #f9fafb;
  --lufa-semantic-ui-text-secondary: #d1d5db;

  /* Border Colors - Dark Mode */
  --lufa-semantic-ui-border-default: #374151;
}

[data-mode='high-contrast'] {
  /* High-Contrast Mode Overrides */
  --lufa-semantic-ui-text-primary: #000000;
  --lufa-semantic-ui-background-page: #ffffff;
  --lufa-semantic-ui-border-default: #000000;
  --lufa-semantic-button-primary-background: #0000ff;
}
```

Import your custom theme:

```tsx title="src/main.tsx"
import '@grasdouble/lufa_design-system/style.css';
import './themes/brand-theme.css'; // Your custom theme
```

## Using Tokens in JavaScript

Access token values programmatically:

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

function CustomComponent() {
  const styles = {
    // ✅ Use semantic tokens for mode-aware styling
    backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
    padding: 'var(--lufa-semantic-ui-spacing-default)',
    borderRadius: 'var(--lufa-semantic-ui-radius-default)',
    color: 'var(--lufa-semantic-ui-text-primary)',
  };

  return <div style={styles}>Themed content</div>;
}
```

:::warning Don't Use Primitives Directly
Avoid using primitive tokens directly in component code:

```tsx
// ❌ WRONG - primitive tokens don't adapt to modes
backgroundColor: 'var(--lufa-primitive-color-gray-100)';

// ✅ CORRECT - semantic tokens adapt automatically
backgroundColor: 'var(--lufa-semantic-ui-background-surface)';
```

:::

## Mode Validation

Use the Lufa CLI to validate your custom themes:

```bash
# Install the CLI (if not already installed)
pnpm add -D @grasdouble/lufa_design-system-cli

# Validate your theme
pnpm lufa-ds-cli validate-theme ./src/themes/brand-theme.css
```

The validator checks:

- All required semantic tokens are defined
- CSS syntax is valid
- Color contrast meets WCAG 2.1 AA standards (WCAG AAA for high-contrast)
- Token values are properly formatted
- Mode selectors are correctly structured

## Best Practices

### Do ✅

- **Use semantic tokens** for all component styling (they adapt to modes automatically)
- **Test all three modes** (light, dark, high-contrast) for accessibility
- **Maintain WCAG 2.1 AA contrast ratios** (4.5:1 for text, 3:1 for UI)
- **Use WCAG AAA standards** for high-contrast mode (7:1 for text)
- **Document custom tokens** in your project's style guide
- **Use the CLI validator** before deploying theme changes
- **Understand token layers** - primitives are constants, semantics provide meaning
- **Override semantic tokens** to customize, never primitives

### Don't ❌

- **Don't override primitive tokens** - they are immutable constants (like `Math.PI`)
- **Don't hardcode colors** in component styles - use semantic tokens
- **Don't skip high-contrast mode** if your app needs to be accessible
- **Don't use `data-theme`** - use `data-mode` for light/dark/high-contrast switching
- **Don't forget to test accessibility** after customization
- **Don't reference primitives directly** in app code - use semantic tokens

## Token Architecture Deep Dive

### The Math.PI Analogy

Think of primitive tokens like mathematical constants:

```javascript
// Math.PI is always 3.14159... regardless of context
Math.PI === 3.14159...  // Always true

// Similarly, primitives are always the same value
--lufa-primitive-color-blue-600: #2563eb;  // Always this hex
```

You wouldn't try to change `Math.PI`, and you shouldn't change primitive tokens. Instead, use them as building blocks:

```css
/* ✅ Semantic tokens map primitives to meanings */
[data-mode='light'] {
  --lufa-semantic-ui-text-primary: var(--lufa-primitive-color-gray-900);
}

[data-mode='dark'] {
  /* Same semantic name, different primitive mapping */
  --lufa-semantic-ui-text-primary: var(--lufa-primitive-color-gray-50);
}
```

### Mode vs Theme (Future)

**Currently Implemented:**

- **Modes** (`data-mode`) - Light, Dark, High-Contrast (for accessibility)

**Future (Phase 6):**

- **Themes** (`data-color-theme`) - Ocean, Forest, Custom (for brand variants)

Modes and themes will be orthogonal - you'll be able to combine any mode with any theme:

- Ocean theme + Dark mode
- Forest theme + High-contrast mode
- Default theme + Light mode

:::info Theme Variants Coming Soon
Ocean 🌊 and Forest 🌲 theme variants are planned for a future release (Phase 6). Currently, only modes (light/dark/high-contrast) are implemented. Watch the [GitHub repository](https://github.com/grasdouble/Lufa) for updates.
:::

## Next Steps

- [Explore Color Tokens](/docs/tokens/colors) - Complete color system reference
- [Typography Tokens](/docs/tokens/typography) - Font and text styling
- [Spacing Tokens](/docs/tokens/spacing) - Layout and spacing system
- [Component Customization](/docs/components/overview) - Component-specific styling

:::tip Need Help?
Join our community on [GitHub Discussions](https://github.com/grasdouble/Lufa/discussions) for theming questions and examples.
:::

---
sidebar_position: 3
---

# Theming Guide

Customize the Lufa Design System to match your brand identity using design tokens and themes.

## Understanding the Token System

Lufa uses a three-layer architecture for styling:

```
┌─────────────────────────────────────────┐
│         Layer 3: Components             │
│    Use tokens only (semantic values)    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Layer 2: Tokens                 │
│    Semantic names (primary, default)    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Layer 1: Primitives             │
│    Raw values (16px, 150ms, #FF0000)    │
└─────────────────────────────────────────┘
```

## Using Built-in Themes

Lufa includes light and dark themes by default. Enable theme switching:

```tsx title="src/App.tsx"
import '@grasdouble/lufa_design-system/style.css';

import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Apply theme to document root
  document.documentElement.setAttribute('data-theme', theme);

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      {/* Your app content */}
    </div>
  );
}
```

## Customizing Design Tokens

Override design tokens using CSS custom properties:

```css title="src/custom-theme.css"
:root {
  /* Override color tokens */
  --lufa-token-color-background-primary: #0066cc;
  --lufa-token-color-background-primary-hover: #0052a3;

  /* Override spacing tokens */
  --lufa-token-spacing-default: 20px;
  --lufa-token-spacing-comfortable: 28px;

  /* Override typography tokens */
  --lufa-token-font-size-body: 16px;
  --lufa-token-font-weight-semibold: 600;
}

[data-theme='dark'] {
  /* Custom dark theme overrides */
  --lufa-token-color-background-surface: #1a1a1a;
  --lufa-token-color-text-primary: #ffffff;
}
```

Import your custom theme after the design system CSS:

```tsx title="src/main.tsx"
import '@grasdouble/lufa_design-system/style.css';
import './custom-theme.css'; // Your overrides
```

## Available Token Categories

### Color Tokens

```css
/* Background colors */
--lufa-token-color-background-primary
--lufa-token-color-background-surface
--lufa-token-color-background-muted

/* Text colors */
--lufa-token-color-text-primary
--lufa-token-color-text-secondary
--lufa-token-color-text-muted
--lufa-token-color-text-inverse

/* Border colors */
--lufa-token-color-border-default
--lufa-token-color-border-focus
--lufa-token-color-border-error

/* State colors */
--lufa-token-color-status-success
--lufa-token-color-status-warning
--lufa-token-color-status-error
--lufa-token-color-status-info
```

### Spacing Tokens

```css
--lufa-token-spacing-compact       /* 8px */
--lufa-token-spacing-default       /* 16px */
--lufa-token-spacing-comfortable   /* 24px */
--lufa-token-spacing-spacious      /* 32px */
```

### Typography Tokens

```css
/* Font sizes */
--lufa-token-font-size-xs
--lufa-token-font-size-sm
--lufa-token-font-size-body
--lufa-token-font-size-lg
--lufa-token-font-size-xl

/* Font weights */
--lufa-token-font-weight-regular    /* 400 */
--lufa-token-font-weight-medium     /* 500 */
--lufa-token-font-weight-semibold   /* 600 */
--lufa-token-font-weight-bold       /* 700 */

/* Line heights */
--lufa-token-line-height-tight
--lufa-token-line-height-normal
--lufa-token-line-height-relaxed
```

### Border Radius Tokens

```css
--lufa-token-radius-none
--lufa-token-radius-sm
--lufa-token-radius-base
--lufa-token-radius-lg
--lufa-token-radius-full
```

### Shadow Tokens

```css
--lufa-token-shadow-sm
--lufa-token-shadow-base
--lufa-token-shadow-md
--lufa-token-shadow-lg
--lufa-token-shadow-xl
```

## Creating a Custom Theme

Create a complete theme by overriding all relevant tokens:

```css title="src/themes/brand-theme.css"
:root {
  /* Brand Colors */
  --lufa-token-color-background-primary: #6366f1;
  --lufa-token-color-background-primary-hover: #4f46e5;
  --lufa-token-color-text-inverse: #ffffff;

  /* Surface Colors */
  --lufa-token-color-background-surface: #ffffff;
  --lufa-token-color-background-muted: #f9fafb;

  /* Text Colors */
  --lufa-token-color-text-primary: #111827;
  --lufa-token-color-text-secondary: #6b7280;
  --lufa-token-color-text-muted: #9ca3af;

  /* Border Colors */
  --lufa-token-color-border-default: #e5e7eb;
  --lufa-token-color-border-focus: #6366f1;

  /* Border Radius */
  --lufa-token-radius-base: 12px;
  --lufa-token-radius-lg: 16px;

  /* Spacing Scale */
  --lufa-token-spacing-default: 16px;
  --lufa-token-spacing-comfortable: 24px;
}

[data-theme='dark'] {
  /* Dark Theme Overrides */
  --lufa-token-color-background-surface: #1f2937;
  --lufa-token-color-background-muted: #111827;
  --lufa-token-color-text-primary: #f9fafb;
  --lufa-token-color-text-secondary: #d1d5db;
  --lufa-token-color-border-default: #374151;
}
```

## Using Tokens in JavaScript

Access tokens programmatically:

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

function CustomComponent() {
  const styles = {
    backgroundColor: tokens.color.background.surface,
    padding: tokens.spacing.default,
    borderRadius: tokens.radius.base,
    color: tokens.color.text.primary,
  };

  return <div style={styles}>Themed content</div>;
}
```

## Theme Validation

Use the Lufa CLI to validate your custom theme:

```bash
# Install the CLI (if not already installed)
pnpm add -D @grasdouble/lufa_design-system-cli

# Validate your theme
pnpm lufa-ds-cli validate-theme ./src/themes/brand-theme.css
```

The validator checks:

- All required tokens are defined
- CSS syntax is valid
- Color contrast meets WCAG 2.1 AA standards
- Token values are properly formatted

## Best Practices

### Do ✅

- **Use CSS custom properties** for theming (not hardcoded values)
- **Test both light and dark themes** for accessibility
- **Maintain WCAG 2.1 AA contrast ratios** (4.5:1 for text, 3:1 for UI)
- **Document custom tokens** in your project's style guide
- **Use the CLI validator** before deploying theme changes

### Don't ❌

- **Don't hardcode colors** in component styles
- **Don't skip dark mode** if your app supports it
- **Don't override primitive values** (use tokens instead)
- **Don't forget to test accessibility** after theme changes

## Next Steps

- [Explore Color Tokens](/docs/tokens/colors) - Complete color system reference
- [Typography Tokens](/docs/tokens/typography) - Font and text styling
- [Spacing Tokens](/docs/tokens/spacing) - Layout and spacing system
- [Component Customization](/docs/components/overview) - Component-specific styling

:::tip Need Help?
Join our community on [GitHub Discussions](https://github.com/grasdouble/Lufa/discussions) for theming questions and examples.
:::

---
title: Theming
description: A guide in my new Starlight docs site.
---

# Theming

Customize Lufa Design System to match your brand.

## CSS Variables

All design tokens are exposed as CSS custom properties with the `--lufa-token-` prefix. This allows you to override them at runtime for theming.

### Override Colors

```css
:root {
  /* Override brand colors */
  --lufa-token-color-brand-primary: #your-color;
  --lufa-token-color-brand-secondary: #your-color;
}

/* Dark mode overrides */
[data-theme='dark'] {
  --lufa-token-color-background-primary: #1a1a1a;
  --lufa-token-color-text-primary: #ffffff;
}
```

### Override Typography

```css
:root {
  /* Override heading sizes */
  --lufa-token-font-size-6xl: 4rem;
  --lufa-token-line-height-tight: 1.1;

  /* Override font family */
  --lufa-token-font-family-sans: 'Your Font', sans-serif;
}
```

### Override Spacing

```css
:root {
  /* Make spacing more compact */
  --lufa-token-spacing-base: 0.75rem;
  --lufa-token-spacing-lg: 1.25rem;
}
```

## Dark Mode

Lufa supports dark mode out of the box. Apply the `dark` class or `data-theme="dark"` attribute:

```tsx
// Using class
<html className="dark">
  <App />
</html>

// Using data attribute
<html data-theme="dark">
  <App />
</html>
```

## Theme Variants

Lufa ships with built-in theme variants:

```tsx
// Import a theme variant
import '@grasdouble/lufa_design-system/themes/ocean.css';
import '@grasdouble/lufa_design-system/themes/forest.css';
```

## Available Variables

All CSS variables are prefixed with `--lufa-token-` to avoid conflicts:

- `--lufa-token-color-*` - Color tokens
- `--lufa-token-spacing-*` - Spacing tokens
- `--lufa-token-font-family-*` - Font families
- `--lufa-token-font-size-*` - Font sizes
- `--lufa-token-font-weight-*` - Font weights
- `--lufa-token-line-height-*` - Line heights
- `--lufa-token-letter-spacing-*` - Letter spacing
- `--lufa-token-measure-*` - Measure (line length)
- `--lufa-token-radius-*` - Border radius tokens
- `--lufa-token-shadow-*` - Shadow tokens

[View all design tokens →](../tokens/colors)

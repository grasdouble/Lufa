---
sidebar_position: 3
---

# Theming

Customize Lufa Design System to match your brand.

## CSS Variables

All design tokens are exposed as CSS custom properties with the `--lufa-` prefix. This allows you to override them at runtime for theming.

### Override Colors

```css
:root {
  /* Override brand colors */
  --lufa-color-brand-primary: #your-color;
  --lufa-color-brand-secondary: #your-color;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --lufa-color-background-primary: #1a1a1a;
  --lufa-color-text-primary: #ffffff;
}
```

### Override Typography

```css
:root {
  /* Override heading sizes */
  --lufa-typography-h1-font-size: 4rem;
  --lufa-typography-h1-line-height: 1.1;

  /* Override font family */
  --lufa-font-family-base: "Your Font", sans-serif;
}
```

### Override Spacing

```css
:root {
  /* Make spacing more compact */
  --lufa-spacing-base: 0.75rem;
  --lufa-spacing-lg: 1.25rem;
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
import "@grasdouble/lufa_design-system/themes/ocean.css";
import "@grasdouble/lufa_design-system/themes/forest.css";
```

## Available Variables

All CSS variables are prefixed with `--lufa-` to avoid conflicts:

- `--lufa-color-*` - Color tokens
- `--lufa-spacing-*` - Spacing tokens
- `--lufa-typography-*` - Typography tokens
- `--lufa-radius-*` - Border radius tokens
- `--lufa-shadow-*` - Shadow tokens

[View all design tokens →](../foundations/colors)

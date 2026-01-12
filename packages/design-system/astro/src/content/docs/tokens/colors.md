---
title: Colors
description: A guide in my new Starlight docs site.
---

# Colors

Lufa's semantic color system provides a consistent and accessible color palette with built-in dark mode support.

## Color Philosophy

Our color system is built on semantic naming rather than literal colors. This means colors are named by their purpose (e.g., `brand.primary`, `background.primary`) rather than their appearance (e.g., `blue-500`).

## Color Tokens

### Brand Colors

Used for primary actions, links, and emphasis.

```css
--lufa-token-color-brand-primary: /* Brand primary color */
--lufa-token-color-brand-primary-hover: /* Hover state */
--lufa-token-color-brand-primary-active: /* Active/pressed state */
--lufa-token-color-brand-secondary: /* Secondary brand color */
--lufa-token-color-brand-secondary-hover: /* Hover state */
--lufa-token-color-brand-secondary-active: /* Active/pressed state */
--lufa-token-color-brand-accent: /* Accent color */
```

### Interactive Colors

```css
--lufa-token-color-interactive-default: /* Default interactive state */
--lufa-token-color-interactive-hover: /* Hover state */
--lufa-token-color-interactive-active: /* Active/pressed state */
--lufa-token-color-interactive-disabled: /* Disabled state */
--lufa-token-color-interactive-focus: /* Focus state */
```

### Background Colors

```css
--lufa-token-color-background-primary: /* Main background */
--lufa-token-color-background-secondary: /* Secondary surfaces */
--lufa-token-color-background-tertiary: /* Tertiary surfaces */
--lufa-token-color-background-inverse: /* Dark background */
--lufa-token-color-background-overlay: /* Overlay background */
```

### Text Colors

```css
--lufa-token-color-text-primary: /* Primary text */
--lufa-token-color-text-secondary: /* Secondary text */
--lufa-token-color-text-tertiary: /* Tertiary/subtle text */
--lufa-token-color-text-disabled: /* Disabled text */
--lufa-token-color-text-inverse: /* Text on dark backgrounds */
--lufa-token-color-text-link: /* Link text */
--lufa-token-color-text-link-hover: /* Link hover */
```

### Border Colors

```css
--lufa-token-color-border-default: /* Default borders */
--lufa-token-color-border-light: /* Subtle borders */
--lufa-token-color-border-medium: /* Medium borders */
--lufa-token-color-border-strong: /* Strong borders */
--lufa-token-color-border-focus: /* Focus indicators */
```

### Semantic Colors

```css
/* Each status provides: default, hover, active, light, lighter, border, text */
--lufa-token-color-success-default: /* Success state */
--lufa-token-color-success-light: /* Success background */
--lufa-token-color-success-border: /* Success border */
--lufa-token-color-success-text: /* Success text */
```

## Using Colors

### In Components

```tsx
import { Button } from '@grasdouble/lufa_design-system';

// Component variants automatically use semantic colors
<Button variant="primary">Primary</Button>;
```

### In Custom Styles

```css
.my-element {
  color: var(--lufa-token-color-text-primary);
  background-color: var(--lufa-token-color-background-secondary);
  border-color: var(--lufa-token-color-border-default);
}
```

### With Inline Styles

```tsx
<div
  style={{
    color: 'var(--lufa-token-color-text-primary)',
    backgroundColor: 'var(--lufa-token-color-background-primary)',
  }}
>
  Content
</div>
```

## Dark Mode

All color tokens automatically adapt to dark mode when the theme is switched. The design system handles this internally.

```tsx
// Dark mode is handled automatically
<ThemeSwitcher />
```

## Accessibility

Our color system ensures:

- **WCAG AA compliance** for text contrast ratios
- **Consistent contrast** across light and dark modes
- **Color-blind friendly** combinations
- **Semantic meaning** beyond color alone

## Customization

To customize colors in your application, see the [Theming Guide](../getting-started/theming).

## Related

- [Theming →](../getting-started/theming)
- [Typography →](./typography)
- [Components →](../components/overview)

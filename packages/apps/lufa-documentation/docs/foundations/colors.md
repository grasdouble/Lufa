---
sidebar_position: 1
---

# Colors

Lufa's semantic color system provides a consistent and accessible color palette with built-in dark mode support.

## Color Philosophy

Our color system is built on semantic naming rather than literal colors. This means colors are named by their purpose (e.g., `primary`, `background-primary`) rather than their appearance (e.g., `blue-500`).

## Color Tokens

### Primary Colors

Used for primary actions, links, and emphasis.

```css
--lufa-color-primary: /* Brand primary color */
--lufa-color-primary-hover: /* Hover state */
--lufa-color-primary-active: /* Active/pressed state */
```

### Background Colors

```css
--lufa-color-background-primary: /* Main background */
--lufa-color-background-secondary: /* Secondary surfaces */
--lufa-color-background-tertiary: /* Tertiary surfaces */
```

### Text Colors

```css
--lufa-color-text-primary: /* Primary text */
--lufa-color-text-secondary: /* Secondary text */
--lufa-color-text-tertiary: /* Disabled/subtle text */
--lufa-color-text-inverse: /* Text on dark backgrounds */
```

### Border Colors

```css
--lufa-color-border-primary: /* Default borders */
--lufa-color-border-secondary: /* Subtle borders */
--lufa-color-border-focus: /* Focus indicators */
```

### Semantic Colors

```css
--lufa-color-success: /* Success states */
--lufa-color-warning: /* Warning states */
--lufa-color-error: /* Error states */
--lufa-color-info: /* Informational states */
```

## Using Colors

### In Components

```tsx
import { Button } from "@grasdouble/lufa_design-system";

// Component variants automatically use semantic colors
<Button variant="primary">Primary</Button>;
```

### In Custom Styles

```css
.my-element {
  color: var(--lufa-color-text-primary);
  background-color: var(--lufa-color-background-secondary);
  border-color: var(--lufa-color-border-primary);
}
```

### With Inline Styles

```tsx
<div
  style={{
    color: "var(--lufa-color-text-primary)",
    backgroundColor: "var(--lufa-color-background-primary)",
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

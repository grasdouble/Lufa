# Using CSS Variables in Components

This guide explains how to use foundation CSS variables in component styles.

**Note:** For most use cases, prefer **Tailwind utilities with semantic names** (e.g., `p-base`, `rounded-lg`, `bg-interactive-default`). Use direct CSS variables for specific cases like z-index or custom calculations.

See [TAILWIND_WITH_FOUNDATION.md](./TAILWIND_WITH_FOUNDATION.md) for Tailwind utility documentation.

## Available CSS Variables

All foundation tokens are available as CSS variables:

### Spacing

```css
var(--spacing-none)     /* 0 */
var(--spacing-xxs)      /* 2px */
var(--spacing-xs)       /* 4px */
var(--spacing-sm)       /* 8px */
var(--spacing-md)       /* 12px */
var(--spacing-base)     /* 16px */
var(--spacing-lg)       /* 20px */
var(--spacing-xl)       /* 24px */
var(--spacing-2xl)      /* 32px */
var(--spacing-3xl)      /* 40px */
var(--spacing-4xl)      /* 48px */
var(--spacing-5xl)      /* 64px */
var(--spacing-6xl)      /* 80px */
var(--spacing-7xl)      /* 96px */
```

### Border Radius

```css
var(--radius-none)      /* 0 */
var(--radius-xs)        /* 2px */
var(--radius-sm)        /* 4px */
var(--radius-md)        /* 6px */
var(--radius-base)      /* 8px */
var(--radius-lg)        /* 12px */
var(--radius-xl)        /* 16px */
var(--radius-2xl)       /* 24px */
var(--radius-3xl)       /* 32px */
var(--radius-full)      /* 9999px */
```

### Shadows

```css
var(--shadow-none)
var(--shadow-xs)
var(--shadow-sm)
var(--shadow-md)
var(--shadow-lg)
var(--shadow-xl)
var(--shadow-2xl)
var(--shadow-inner)
```

### Z-Index

```css
var(--z-index-behind)   /* -1 */
var(--z-index-base)     /* 0 */
var(--z-index-elevated) /* 10 */
var(--z-index-sticky)   /* 100 */
var(--z-index-fixed)    /* 200 */
var(--z-index-dropdown) /* 300 */
var(--z-index-modal)    /* 400 */
var(--z-index-popover)  /* 500 */
var(--z-index-tooltip)  /* 600 */
var(--z-index-toast)    /* 700 */
```

### Typography

```css
/* Font Sizes */
var(--font-size-xs)     /* 12px */
var(--font-size-sm)     /* 14px */
var(--font-size-base)   /* 16px */
var(--font-size-lg)     /* 18px */
var(--font-size-xl)     /* 20px */
var(--font-size-2xl)    /* 24px */
var(--font-size-3xl)    /* 30px */
var(--font-size-4xl)    /* 36px */
var(--font-size-5xl)    /* 48px */
var(--font-size-6xl)    /* 60px */
var(--font-size-7xl)    /* 72px */

/* Line Heights */
var(--line-height-tight)    /* 1 */
var(--line-height-snug)     /* 1.25 */
var(--line-height-normal)   /* 1.375 */
var(--line-height-relaxed)  /* 1.5 */
var(--line-height-loose)    /* 1.625 */

/* Font Weights */
var(--font-weight-light)    /* 300 */
var(--font-weight-normal)   /* 400 */
var(--font-weight-medium)   /* 500 */
var(--font-weight-semibold) /* 600 */
var(--font-weight-bold)     /* 700 */

/* Letter Spacing */
var(--letter-spacing-tighter)
var(--letter-spacing-tight)
var(--letter-spacing-normal)
var(--letter-spacing-wide)
var(--letter-spacing-wider)

/* Typography Scale Presets */
var(--typography-h1-font-size)
var(--typography-h1-line-height)
var(--typography-h1-font-weight)
var(--typography-h1-letter-spacing)
/* ... and similar for h2-h6, body-large, body, body-small, caption, label */
```

## When to Use CSS Variables vs Tailwind

### ✅ Use Tailwind Utilities (Preferred)

- **Standard spacing/sizing** with semantic names (`p-base`, `m-xl`, `gap-sm`)
- **Responsive variants** (`md:p-lg`, `lg:text-2xl`)
- **State modifiers** (`hover:bg-interactive-hover`, `focus:border-border-focus`)
- **Quick prototyping** with familiar syntax

**Example:**

```css
.button {
    @apply px-base py-sm rounded-lg shadow-md;
    @apply bg-interactive-default hover:bg-interactive-hover;
    @apply transition-all;
}
```

### ✅ Use CSS Variables (Specific Cases)

- **Z-index stacking** (no Tailwind utility for our system)
- **Custom calculations** (`calc()` expressions)
- **Dynamic theming** with JavaScript
- **Complex custom styles** outside Tailwind's utility system
- **Typography presets** (composite values like `--typography-h1-*`)

**Example:**

```css
.modal {
    /* Z-index requires CSS variable */
    z-index: var(--z-index-modal);

    /* Tailwind utilities for the rest */
    @apply p-2xl rounded-lg shadow-xl;
    @apply bg-background-primary;
}
```

## Best Practices

### ✅ DO: Use CSS Variables for Z-Index

```css
.dropdown {
    z-index: var(--z-index-dropdown);
}

.modal {
    z-index: var(--z-index-modal);
}

.tooltip {
    z-index: var(--z-index-tooltip);
}
```

**Why:** Ensures consistent stacking order across the application.

### ✅ DO: Use Typography Presets for Text Styles

```css
.heading {
    font-size: var(--typography-h2-font-size);
    line-height: var(--typography-h2-line-height);
    font-weight: var(--typography-h2-font-weight);
    letter-spacing: var(--typography-h2-letter-spacing);
}

/* Or use individual tokens */
.customText {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
}
```

### ✅ DO: Mix Tailwind and CSS Variables When Appropriate

```css
.card {
    /* Prefer Tailwind utilities with semantic names */
    @apply flex flex-col;
    @apply p-xl rounded-lg shadow-md;
    @apply bg-background-primary;

    /* Use CSS variables only when needed */
    z-index: var(--z-index-elevated);
}
```

### ❌ DON'T: Use Hardcoded Values

```css
/* ❌ Bad - Hardcoded values */
.component {
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 400;
}

/* ✅ Good - Tailwind utilities (preferred) */
.component {
    @apply p-xl rounded-lg shadow-lg;
    z-index: var(--z-index-modal); /* CSS var for z-index */
}

/* ✅ Also Good - Direct CSS variables (when Tailwind doesn't fit) */
.component {
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-index-modal);
}
```

### ❌ DON'T: Use Arbitrary Tailwind Values for Token-Based Values

```css
/* ❌ Bad - Arbitrary value doesn't reference tokens */
.modal {
    @apply z-[400];
}

/* ✅ Good - Uses CSS variable from tokens */
.modal {
    z-index: var(--z-index-modal);
}
```

## Real-World Examples

### Modal Component

```css
.backdrop {
    @apply fixed inset-0;
    z-index: var(--z-index-modal);
    @apply flex items-center justify-center bg-black/50;
}

.modal {
    @apply rounded-lg bg-white;
    padding: var(--spacing-2xl);
    box-shadow: var(--shadow-2xl);
    max-width: 32rem;
}

.modalHeader {
    font-size: var(--typography-h4-font-size);
    font-weight: var(--typography-h4-font-weight);
    margin-bottom: var(--spacing-lg);
}
```

### Dropdown Menu

```css
.dropdown {
    @apply absolute bg-white;
    z-index: var(--z-index-dropdown);
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
}

.dropdownItem {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-sm);
    @apply hover:bg-neutral-100;
}
```

### Toast Notification

```css
.toast {
    @apply fixed;
    z-index: var(--z-index-toast);
    padding: var(--spacing-base) var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    font-size: var(--font-size-sm);
}
```

### Custom Card

```css
.card {
    @apply bg-white;
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    @apply transition-all duration-200;
}

.card:hover {
    box-shadow: var(--shadow-lg);
    @apply -translate-y-0.5;
}

.cardTitle {
    font-size: var(--typography-h5-font-size);
    font-weight: var(--typography-h5-font-weight);
    margin-bottom: var(--spacing-md);
}
```

## TypeScript Integration

When using CSS modules with TypeScript, the variables are type-safe:

```typescript
import styles from './MyComponent.module.css';

// TypeScript knows about all your classes
<div className={styles.modal}>
    <div className={styles.modalHeader}>Title</div>
</div>
```

## Summary

- **Use Tailwind** for standard patterns and utilities
- **Use CSS Variables** for z-index, specific token values, and theming
- **Never hardcode** values that exist in design tokens
- **Always reference** the foundation token system
- **Mix approaches** when it makes sense for maintainability

This ensures consistency, maintainability, and makes the design system easy to theme and evolve.

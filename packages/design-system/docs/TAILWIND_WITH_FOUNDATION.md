# Tailwind Configuration with Foundation Tokens

## Overview

Tailwind CSS v4 is configured to use our foundation design tokens as its source of truth. This means:

✅ **Single Source of Truth** - Foundation tokens control Tailwind utilities
✅ **Automatic Propagation** - Changes to foundation tokens update Tailwind
✅ **Familiar DX** - Keep using `p-4`, `text-primary`, `rounded-lg`
✅ **Themeable** - CSS variables enable runtime theming
✅ **Responsive** - All Tailwind modifiers work (`md:`, `hover:`, etc.)

## How It Works

In `src/tailwind.css`, we use Tailwind v4's `@theme` directive to expose foundation tokens as Tailwind utilities with **semantic names**:

```css
@theme {
    /* Spacing: Use semantic names from foundation */
    --spacing-base: var(--spacing-base); /* p-base, m-base (16px) */
    --spacing-lg: var(--spacing-lg); /* p-lg, m-lg (20px) */
    --spacing-xl: var(--spacing-xl); /* p-xl, m-xl (24px) */

    /* Colors: Semantic color system */
    --color-text-primary: var(--color-text-primary);
    --color-background-primary: var(--color-background-primary);
    --color-interactive-default: var(--color-interactive-default);

    /* Radius: Semantic radius from foundation */
    --radius-lg: var(--radius-lg); /* rounded-lg (12px) */

    /* Shadows: Semantic shadows from foundation */
    --shadow-md: var(--shadow-md); /* shadow-md */
}
```

## Available Utilities

### Spacing (Padding/Margin/Gap)

Foundation tokens use **semantic names** for clarity:

| Tailwind Utility   | Foundation Token | Value |
| ------------------ | ---------------- | ----- |
| `p-none`, `m-none` | `--spacing-none` | 0     |
| `p-xxs`, `m-xxs`   | `--spacing-xxs`  | 2px   |
| `p-xs`, `m-xs`     | `--spacing-xs`   | 4px   |
| `p-sm`, `m-sm`     | `--spacing-sm`   | 8px   |
| `p-md`, `m-md`     | `--spacing-md`   | 12px  |
| `p-base`, `m-base` | `--spacing-base` | 16px  |
| `p-lg`, `m-lg`     | `--spacing-lg`   | 20px  |
| `p-xl`, `m-xl`     | `--spacing-xl`   | 24px  |
| `p-2xl`, `m-2xl`   | `--spacing-2xl`  | 32px  |
| `p-3xl`, `m-3xl`   | `--spacing-3xl`  | 40px  |
| `p-4xl`, `m-4xl`   | `--spacing-4xl`  | 48px  |
| `p-5xl`, `m-5xl`   | `--spacing-5xl`  | 64px  |
| `p-6xl`, `m-6xl`   | `--spacing-6xl`  | 80px  |
| `p-7xl`, `m-7xl`   | `--spacing-7xl`  | 96px  |

**Usage:**

```css
.button {
    @apply px-base py-sm; /* Uses spacing-base (16px) and spacing-sm (8px) */
}

.card {
    @apply p-xl; /* Uses spacing-xl (24px) */
}

.section {
    @apply mb-2xl; /* Uses spacing-2xl (32px) */
}
```

### Colors (Text/Background/Border)

Semantic color system with full intent-based naming:

**Text Colors:**

- `text-text-primary`, `text-text-secondary`, `text-text-tertiary`
- `text-text-disabled`, `text-text-inverse`, `text-text-link`

**Background Colors:**

- `bg-background-primary`, `bg-background-secondary`, `bg-background-tertiary`
- `bg-background-inverse`, `bg-background-overlay`

**Border Colors:**

- `border-border-default`, `border-border-light`, `border-border-medium`
- `border-border-strong`, `border-border-focus`

**Interactive Colors:**

- `bg-interactive-default`, `bg-interactive-hover`, `bg-interactive-active`
- `bg-interactive-disabled`, `border-interactive-focus`

**Status Colors:**

- Success: `bg-success-light`, `bg-success-lighter`, `text-success-text`, `border-success-border`
- Warning: `bg-warning-light`, `bg-warning-lighter`, `text-warning-text`, `border-warning-border`
- Error: `bg-error-light`, `bg-error-lighter`, `text-error-text`, `border-error-border`
- Info: `bg-info-light`, `bg-info-lighter`, `text-info-text`, `border-info-border`

**Convenience Aliases:**

- `text-primary`, `bg-primary` → `--color-interactive-default`
- `text-success`, `bg-success` → `--color-success-default`
- `text-warning`, `bg-warning` → `--color-warning-default`
- `text-error`, `bg-error`, `text-danger`, `bg-danger` → `--color-error-default`

**Usage:**

```css
.alert-success {
    @apply bg-success-light border-success-border text-success-text;
}

.button-primary {
    @apply bg-interactive-default hover:bg-interactive-hover text-white;
}

.card {
    @apply bg-background-primary border-border-default;
}
```

### Border Radius

Semantic radius names from foundation:

| Tailwind Utility | Foundation Token | Value  |
| ---------------- | ---------------- | ------ |
| `rounded-none`   | `--radius-none`  | 0      |
| `rounded-xs`     | `--radius-xs`    | 2px    |
| `rounded-sm`     | `--radius-sm`    | 4px    |
| `rounded-md`     | `--radius-md`    | 6px    |
| `rounded-lg`     | `--radius-lg`    | 12px   |
| `rounded-xl`     | `--radius-xl`    | 16px   |
| `rounded-2xl`    | `--radius-2xl`   | 24px   |
| `rounded-3xl`    | `--radius-3xl`   | 32px   |
| `rounded-full`   | `--radius-full`  | 9999px |

**Usage:**

```css
.card {
    @apply rounded-lg; /* Uses radius-lg (12px) */
}

.button {
    @apply rounded-md; /* Uses radius-md (6px) */
}

.avatar {
    @apply rounded-full; /* Uses radius-full (9999px) */
}
```

### Shadows

| Tailwind       | Foundation Token |
| -------------- | ---------------- |
| `shadow-sm`    | `--shadow-xs`    |
| `shadow`       | `--shadow-sm`    |
| `shadow-md`    | `--shadow-md`    |
| `shadow-lg`    | `--shadow-lg`    |
| `shadow-xl`    | `--shadow-xl`    |
| `shadow-2xl`   | `--shadow-2xl`   |
| `shadow-inner` | `--shadow-inner` |
| `shadow-none`  | `--shadow-none`  |

**Usage:**

```css
.card {
    @apply shadow-md; /* Uses shadow-md */
}

.modal {
    @apply shadow-2xl; /* Uses shadow-2xl */
}
```

### Typography

Font sizes and weights from foundation:

```css
.heading {
    @apply text-4xl font-bold; /* Uses font-size-4xl and font-weight-bold */
}

.body {
    @apply text-base font-normal; /* Uses font-size-base and font-weight-normal */
}
```

## Component Examples

### Button with Foundation Tokens via Tailwind

```css
.button {
    /* Layout - pure Tailwind */
    @apply gap-sm inline-flex items-center justify-center;
    @apply transition-all duration-200;

    /* Design tokens via semantic Tailwind utilities */
    @apply px-base py-sm; /* spacing-base (16px), spacing-sm (8px) */
    @apply rounded-lg; /* radius-lg (12px) */
    @apply text-base; /* font-size-base (16px) */
    @apply font-medium; /* font-weight-medium (500) */
    @apply bg-interactive-default; /* semantic interactive color */
    @apply text-white;
    @apply shadow-md; /* shadow-md from foundation */

    /* Hover/focus states */
    @apply hover:bg-interactive-hover hover:shadow-lg;
    @apply focus:outline-interactive-focus focus:outline-2;
}
```

### Card with Foundation Tokens via Tailwind

```css
.card {
    /* Layout */
    @apply flex flex-col;

    /* Design tokens with semantic names */
    @apply p-xl; /* spacing-xl (24px) */
    @apply rounded-lg; /* radius-lg (12px) */
    @apply bg-background-primary; /* semantic background */
    @apply shadow-md; /* shadow-md from foundation */
    @apply border-border-default border; /* semantic border */

    /* Interactive */
    @apply hover:shadow-lg;
    @apply transition-all duration-200;
}
```

### Input with Foundation Tokens via Tailwind

```css
.input {
    @apply w-full;
    @apply px-base py-sm; /* spacing-base (16px), spacing-sm (8px) */
    @apply rounded-md; /* radius-md (6px) */
    @apply text-base; /* font-size-base (16px) */
    @apply bg-background-primary; /* semantic background */
    @apply border-border-default border; /* semantic border */
    @apply focus:ring-interactive-focus focus:ring-2;
    @apply focus:border-border-focus;
    @apply transition-all;
}
```

## Benefits

### 1. Single Source of Truth

Change foundation tokens, Tailwind updates automatically:

```typescript
// In foundation/spacing.ts
export const spacing = {
    base: '1rem', // Change to '1.25rem'
    // All p-4, m-4, gap-4 utilities automatically update!
};
```

### 2. Theming Works

CSS variables enable runtime theming:

```css
/* Light theme */
:root {
    --color-primary: #3b82f6;
}

/* Dark theme */
[data-theme='dark'] {
    --color-primary: #60a5fa;
}

/* All bg-primary, text-primary utilities automatically adapt! */
```

### 3. Keep Tailwind DX

All Tailwind features work:

```css
.responsive {
    @apply p-4 md:p-6 lg:p-8; /* Responsive spacing */
    @apply bg-primary hover:bg-blue-700; /* State variants */
    @apply dark:bg-neutral-800; /* Dark mode */
}
```

### 4. TypeScript Integration

Foundation tokens have TypeScript types:

```typescript
import { spacing } from '@grasdouble/lufa_design-system';

// Type-safe access
const padding = spacing.base; // '1rem'
```

## Migration from Old Approach

### Before (Arbitrary Tailwind)

```css
.component {
    @apply px-4 py-2; /* What is 4? 16px? */
    @apply bg-blue-600; /* Random blue shade */
    @apply rounded-lg; /* What size? */
}
```

### After (Semantic Foundation-backed Tailwind)

```css
.component {
    @apply px-base py-sm; /* Semantic: spacing-base (16px), spacing-sm (8px) */
    @apply bg-interactive-default; /* Semantic: interactive color from foundation */
    @apply rounded-lg; /* Semantic: radius-lg (12px) from foundation */
}
```

Same syntax, but now:

- ✅ Connected to design system
- ✅ Themeable
- ✅ Centrally managed
- ✅ Semantic meaning

## When to Use Direct CSS Variables

You may still want direct CSS variables for:

1. **Z-index** - Not available via Tailwind utilities

    ```css
    z-index: var(--z-index-modal);
    ```

2. **Complex calculations**

    ```css
    padding: calc(var(--spacing-base) * 1.5);
    ```

3. **Custom properties**
    ```css
    --custom-gap: var(--spacing-lg);
    ```

## Summary

✅ **Use Tailwind utilities** - They now map to foundation tokens
✅ **Keep using `p-4`, `bg-primary`, `rounded-lg`** - Familiar syntax
✅ **Foundation controls everything** - Single source of truth
✅ **Theming works** - CSS variables under the hood
✅ **Best of both worlds** - Tailwind DX + Design System consistency

This approach combines Tailwind's developer experience with a robust design system!

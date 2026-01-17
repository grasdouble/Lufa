# Available CSS Variables

> **IMPORTANT**: This document lists semantic design token variables that components should use.
>
> **Variable Naming Convention**:
>
> - **Tokens package** generates: `--lufa-token-*` (internal implementation)
> - **Themes override** as: `--color-*`, `--spacing-*`, `--border-*`, etc. (public API)
> - **Components use**: The shorter public names (e.g., `var(--color-text-primary)`)
>
> **Example Flow**:
>
> ```
> Tokens:     --lufa-token-color-text-primary: #171717;
>              ↓ (theme override)
> Themes:     --color-text-primary: #0c4a6e;  (ocean theme)
>              ↓ (component usage)
> Component:  color: var(--color-text-primary);
> ```
>
> For theming and dark mode, see [THEMING_GUIDE.md](./THEMING_GUIDE.md) and [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md).

## Colors

> 🌓 **Dark Mode**: All color variables automatically adapt when `data-mode="dark"` is set.
> See [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md) for details.

### Text Colors

- `--color-text-primary` - Main text color
- `--color-text-secondary` - Secondary text color
- `--color-text-tertiary` - Tertiary text color
- `--color-text-disabled` - Disabled text color
- `--color-text-inverse` - Text on dark backgrounds
- `--color-text-link` - Link text color
- `--color-text-link-hover` - Link hover color

### Background Colors

- `--color-background-primary` - Main background
- `--color-background-secondary` - Secondary background
- `--color-background-tertiary` - Tertiary background
- `--color-background-inverse` - Dark background
- `--color-background-overlay` - Modal/overlay background

### Border Colors

- `--color-border-default` - Default borders
- `--color-border-light` - Light borders
- `--color-border-medium` - Medium borders
- `--color-border-strong` - Strong borders
- `--color-border-focus` - Focus state borders

### Interactive Colors

- `--color-interactive-default` - Default interactive
- `--color-interactive-hover` - Hover state
- `--color-interactive-active` - Active/pressed state
- `--color-interactive-disabled` - Disabled state
- `--color-interactive-focus` - Focus state

### Status Colors

#### Success

- `--color-success-default`
- `--color-success-hover`
- `--color-success-active`
- `--color-success-light`
- `--color-success-lighter`
- `--color-success-border`
- `--color-success-text`

#### Warning

- `--color-warning-default`
- `--color-warning-hover`
- `--color-warning-active`
- `--color-warning-light`
- `--color-warning-lighter`
- `--color-warning-border`
- `--color-warning-text`

#### Error

- `--color-error-default`
- `--color-error-hover`
- `--color-error-active`
- `--color-error-light`
- `--color-error-lighter`
- `--color-error-border`
- `--color-error-text`

#### Info

- `--color-info-default`
- `--color-info-hover`
- `--color-info-active`
- `--color-info-light`
- `--color-info-lighter`
- `--color-info-border`
- `--color-info-text`

### Brand Colors

- `--color-brand-primary`
- `--color-brand-primary-hover`
- `--color-brand-primary-active`
- `--color-brand-secondary`
- `--color-brand-secondary-hover`
- `--color-brand-secondary-active`
- `--color-brand-accent`

### Surface Colors

- `--color-surface-default`
- `--color-surface-raised`
- `--color-surface-overlay`
- `--color-surface-inverse`

### Shadow Colors

- `--color-shadow-small` - rgba(0, 0, 0, 0.05)
- `--color-shadow-medium` - rgba(0, 0, 0, 0.1)
- `--color-shadow-large` - rgba(0, 0, 0, 0.15)

## Border

### Border Widths

- `--border-width-none` - 0px
- `--border-width-hairline` - 1px
- `--border-width-thin` - 2px
- `--border-width-focus` - 3px
- `--border-width-thick` - 4px
- `--border-width-extra-thick` - 8px

### Border Styles

- `--border-style-solid`
- `--border-style-dashed`
- `--border-style-dotted`
- `--border-style-double`
- `--border-style-none`

### Border Radius

- `--radius-none` - 0px
- `--radius-xs` - 2px
- `--radius-sm` - 4px
- `--radius-md` - 6px
- `--radius-base` - 8px
- `--radius-lg` - 12px
- `--radius-xl` - 16px
- `--radius-2xl` - 24px
- `--radius-3xl` - 32px
- `--radius-full` - 9999px (circle)

## Spacing

- `--spacing-none` - 0px
- `--spacing-xxs` - 4px
- `--spacing-xs` - 8px
- `--spacing-sm` - 12px
- `--spacing-md` - 16px
- `--spacing-base` - 20px
- `--spacing-lg` - 24px
- `--spacing-xl` - 32px
- `--spacing-2xl` - 40px
- `--spacing-3xl` - 48px
- `--spacing-4xl` - 64px
- `--spacing-5xl` - 80px

## Typography

### Font Families

- `--font-family-sans` - System sans-serif stack
- `--font-family-mono` - Monospace font stack

### Font Sizes

- `--font-size-xs` - 12px
- `--font-size-sm` - 14px
- `--font-size-base` - 16px
- `--font-size-lg` - 18px
- `--font-size-xl` - 20px
- `--font-size-2xl` - 24px
- `--font-size-3xl` - 30px
- `--font-size-4xl` - 36px
- `--font-size-5xl` - 48px

### Font Weights

- `--font-weight-light` - 300
- `--font-weight-normal` - 400
- `--font-weight-medium` - 500
- `--font-weight-semibold` - 600
- `--font-weight-bold` - 700
- `--font-weight-extrabold` - 800

### Line Heights

- `--line-height-tight` - 1.25
- `--line-height-snug` - 1.375
- `--line-height-normal` - 1.5
- `--line-height-relaxed` - 1.625
- `--line-height-loose` - 2

### Letter Spacing

- `--letter-spacing-tighter` - -0.05em
- `--letter-spacing-tight` - -0.025em
- `--letter-spacing-normal` - 0em
- `--letter-spacing-wide` - 0.025em
- `--letter-spacing-wider` - 0.05em

## Effects

### Opacity

- `--opacity-transparent` - 0
- `--opacity-light` - 0.1
- `--opacity-medium` - 0.5
- `--opacity-heavy` - 0.8
- `--opacity-opaque` - 1

### Blur

- `--blur-none` - 0px
- `--blur-sm` - 4px
- `--blur-base` - 8px
- `--blur-md` - 12px
- `--blur-lg` - 16px
- `--blur-xl` - 24px

### Cursors

- `--cursor-auto`
- `--cursor-default`
- `--cursor-pointer`
- `--cursor-not-allowed`
- `--cursor-wait`
- `--cursor-text`
- `--cursor-move`
- `--cursor-grab`
- `--cursor-grabbing`

## Elevation

### Shadows

- `--shadow-none` - none
- `--shadow-xs` - Very subtle
- `--shadow-sm` - Small
- `--shadow-base` - Default
- `--shadow-md` - Medium
- `--shadow-lg` - Large
- `--shadow-xl` - Extra large
- `--shadow-2xl` - Very large

### Z-Index

- `--z-index-base` - 0
- `--z-index-dropdown` - 1000
- `--z-index-sticky` - 1100
- `--z-index-fixed` - 1200
- `--z-index-modal-backdrop` - 1300
- `--z-index-modal` - 1400
- `--z-index-popover` - 1500
- `--z-index-tooltip` - 1600
- `--z-index-toast` - 1700

## Motion

### Timing/Duration

- `--timing-instant` - 0ms
- `--timing-fast` - 100ms
- `--timing-moderate` - 200ms
- `--timing-deliberate` - 300ms
- `--timing-slow` - 500ms
- `--timing-slower` - 700ms

### Easing

- `--easing-linear`
- `--easing-ease-in`
- `--easing-ease-out`
- `--easing-ease-in-out`
- `--easing-sharp`
- `--easing-smooth`
- `--easing-bounce`

### Transitions

- `--transition-fast` - fast duration + smooth easing
- `--transition-base` - moderate duration + smooth easing
- `--transition-slow` - deliberate duration + smooth easing

## Usage Example

```css
.my-component {
  /* Use CSS custom properties for styling */
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-base);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
}

.my-component:hover {
  background: var(--color-background-secondary);
}

.my-component-primary {
  background: var(--color-interactive-default);
  color: var(--color-text-inverse);
}

.my-component-primary:hover {
  background: var(--color-interactive-hover);
}
```

**Note**: Variables automatically adapt to:

- **Themes** (default, ocean, forest) via `data-theme` attribute
- **Dark mode** (light, dark, auto) via `data-mode` attribute

See [THEMING_GUIDE.md](./THEMING_GUIDE.md) and [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md) for complete usage.

## Verifying Available Variables

To see all available CSS custom properties, check the generated files:

**Tokens (internal implementation with `--lufa-token-` prefix)**:

```bash
cat packages/design-system/tokens/dist/style.css
```

**Themes (public API with shorter names)**:

```bash
cat packages/design-system/themes/dist/default.css  # Default theme
cat packages/design-system/themes/dist/ocean.css    # Ocean theme
cat packages/design-system/themes/dist/forest.css   # Forest theme
```

Or inspect the `:root` declaration in your browser DevTools when viewing components in Storybook.

**Browser DevTools**:

1. Open Storybook: `pnpm ds:storybook:dev`
2. Open browser DevTools (F12)
3. Inspect the `<html>` element
4. Look at "Computed" or "Styles" tab to see all `--color-*`, `--spacing-*`, etc. variables

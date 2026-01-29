---
sidebar_position: 1
---

# Color Tokens

Color tokens define the semantic color palette for the Lufa Design System. All colors are designed to meet WCAG 2.1 AA accessibility standards (WCAG AAA for high-contrast mode) and automatically adapt to light, dark, and high-contrast modes.

## Token Architecture

Lufa uses a **three-layer token architecture** for colors (ADR-011):

```
┌──────────────────────────────────────────────┐
│  Component Layer                             │
│  --lufa-component-button-primary-background  │
└────────────┬─────────────────────────────────┘
             │ references
┌────────────▼─────────────────────────────────┐
│  Semantic Layer (Mode-Aware)                 │
│  --lufa-semantic-ui-text-primary             │
│  --lufa-semantic-button-primary-background   │
└────────────┬─────────────────────────────────┘
             │ references
┌────────────▼─────────────────────────────────┐
│  Primitive Layer (Immutable Constants)       │
│  --lufa-primitive-color-blue-600: #2563eb    │
│  --lufa-primitive-color-gray-900: #111827    │
└──────────────────────────────────────────────┘
```

:::tip Use Semantic Tokens
Always use **semantic tokens** (e.g., `--lufa-semantic-ui-text-primary`) instead of primitives. Semantic tokens automatically adapt to light/dark/high-contrast modes.
:::

## Semantic UI Text Colors

Mode-aware text colors with automatic contrast:

| Usage                  | CSS Variable                        | Layer    |
| ---------------------- | ----------------------------------- | -------- |
| Default text           | `--lufa-semantic-ui-text-primary`   | Semantic |
| Secondary text         | `--lufa-semantic-ui-text-secondary` | Semantic |
| Tertiary/subtle text   | `--lufa-semantic-ui-text-tertiary`  | Semantic |
| Success messages       | `--lufa-semantic-ui-text-success`   | Semantic |
| Error messages         | `--lufa-semantic-ui-text-error`     | Semantic |
| Warning messages       | `--lufa-semantic-ui-text-warning`   | Semantic |
| Informational messages | `--lufa-semantic-ui-text-info`      | Semantic |

## Semantic UI Background Colors

Mode-aware background colors:

| Usage                      | CSS Variable                               | Layer    |
| -------------------------- | ------------------------------------------ | -------- |
| Page background            | `--lufa-semantic-ui-background-page`       | Semantic |
| Surface backgrounds        | `--lufa-semantic-ui-background-surface`    | Semantic |
| Success backgrounds        | `--lufa-semantic-ui-background-success`    | Semantic |
| Error backgrounds          | `--lufa-semantic-ui-background-error`      | Semantic |
| Warning backgrounds        | `--lufa-semantic-ui-background-warning`    | Semantic |
| Info backgrounds           | `--lufa-semantic-ui-background-info`       | Semantic |
| Text on success background | `--lufa-semantic-ui-background-on-success` | Semantic |
| Text on error background   | `--lufa-semantic-ui-background-on-error`   | Semantic |
| Text on warning background | `--lufa-semantic-ui-background-on-warning` | Semantic |
| Text on info background    | `--lufa-semantic-ui-background-on-info`    | Semantic |

## Semantic UI Border Colors

Mode-aware border colors:

| Usage              | CSS Variable                        | Layer    |
| ------------------ | ----------------------------------- | -------- |
| Default borders    | `--lufa-semantic-ui-border-default` | Semantic |
| Emphasized borders | `--lufa-semantic-ui-border-strong`  | Semantic |
| Success borders    | `--lufa-semantic-ui-border-success` | Semantic |
| Error borders      | `--lufa-semantic-ui-border-error`   | Semantic |
| Warning borders    | `--lufa-semantic-ui-border-warning` | Semantic |
| Info borders       | `--lufa-semantic-ui-border-info`    | Semantic |

## Opacity and Alpha Tokens (ADR-004)

Use semantic opacity tokens for UI states, and primitive alpha tokens only when you need a specific opacity.

### Semantic Overlays (Preferred)

| Usage               | CSS Variable                                      | Layer    |
| ------------------- | ------------------------------------------------- | -------- |
| Backdrop overlay    | `--lufa-semantic-ui-overlay-backdrop`             | Semantic |
| Hover overlay       | `--lufa-semantic-ui-overlay-hover`                | Semantic |
| Pressed overlay     | `--lufa-semantic-ui-overlay-pressed`              | Semantic |
| Selected overlay    | `--lufa-semantic-ui-overlay-selected`             | Semantic |
| Scrim               | `--lufa-semantic-ui-scrim`                        | Semantic |
| Disabled opacity    | `--lufa-semantic-interactive-disabled-opacity`    | Semantic |
| Loading opacity     | `--lufa-semantic-interactive-loading-opacity`     | Semantic |
| Placeholder opacity | `--lufa-semantic-interactive-placeholder-opacity` | Semantic |

### Primitive Alpha Palette (Advanced)

- **Black:** `--lufa-primitive-color-alpha-black-{4,5,8,12,15,16,38,50,60,80,90,100}`
- **White:** `--lufa-primitive-color-alpha-white-{4,5,8,12,15,16,38,50,60,80,90,100}`

```css
/* ✅ Semantic overlay */
.modal-backdrop {
  background: var(--lufa-semantic-ui-overlay-backdrop);
}

/* ✅ Exact alpha for shadow or utility use */
.elevation-soft {
  box-shadow: 0 1px 2px var(--lufa-primitive-color-alpha-black-5);
}
```

## Usage in Components

### CSS Modules

```css
.card {
  /* ✅ Use semantic tokens - they adapt to modes */
  background: var(--lufa-semantic-ui-background-surface);
  color: var(--lufa-semantic-ui-text-primary);
  border: 1px solid var(--lufa-semantic-ui-border-default);
}

.error-message {
  color: var(--lufa-semantic-ui-text-error);
  background: var(--lufa-semantic-ui-background-error);
  border-color: var(--lufa-semantic-ui-border-error);
}
```

### Avoid Using Primitives Directly

```css
/* ❌ WRONG - primitives don't adapt to modes */
.button {
  background: var(--lufa-primitive-color-blue-600);
  color: var(--lufa-primitive-color-gray-900);
}

/* ✅ CORRECT - semantic tokens adapt automatically */
.button {
  background: var(--lufa-semantic-button-primary-background);
  color: var(--lufa-semantic-button-primary-text);
}
```

## Accessibility

All color combinations in Lufa meet **WCAG 2.1 AA** standards (WCAG AAA for high-contrast mode):

- **Text colors**: Minimum 4.5:1 contrast ratio against backgrounds (7:1 for high-contrast)
- **Large text**: Minimum 3:1 contrast ratio (18pt+ or 14pt+ bold)
- **UI elements**: Minimum 3:1 contrast ratio for interactive elements
- **High-contrast mode**: Enhanced contrast ratios for maximum accessibility

## Mode Adaptation

Color tokens automatically adapt to the user's mode preference:

```css
/* Light Mode */
[data-mode='light'] {
  --lufa-semantic-ui-text-primary: var(--lufa-primitive-color-gray-900);
  --lufa-semantic-ui-background-page: var(--lufa-primitive-color-gray-50);
}

/* Dark Mode */
[data-mode='dark'] {
  --lufa-semantic-ui-text-primary: var(--lufa-primitive-color-gray-50);
  --lufa-semantic-ui-background-page: var(--lufa-primitive-color-gray-900);
}

/* High-Contrast Mode */
[data-mode='high-contrast'] {
  --lufa-semantic-ui-text-primary: #000000;
  --lufa-semantic-ui-background-page: #ffffff;
  --lufa-semantic-ui-border-default: #000000;
}
```

To switch modes:

```tsx
// Set mode via HTML attribute
document.documentElement.setAttribute('data-mode', 'dark');
```

## Primitive Color Scale (Reference)

The underlying primitive color palette. **These are immutable constants** - use semantic tokens instead in your app code.

### Gray Scale

- **Primitives**: `--lufa-primitive-color-gray-{50,100,200,300,400,500,600,700,800,900}`
- **Usage**: Building blocks for neutral colors
- **Layer**: Primitive (immutable)

### Brand Colors

- **Blue**: `--lufa-primitive-color-blue-{50,100,200,300,400,500,600,700,800,900}`
- **Purple**: `--lufa-primitive-color-purple-{50,100,200,300,400,500,600,700,800,900}`
- **Layer**: Primitive (immutable)

### Semantic Status Colors

- **Green**: `--lufa-primitive-color-green-{50,100,200,300,400,500,600,700,800,900}`
- **Red**: `--lufa-primitive-color-red-{50,100,200,300,400,500,600,700,800,900}`
- **Yellow**: `--lufa-primitive-color-yellow-{50,100,200,300,400,500,600,700,800,900}`
- **Layer**: Primitive (immutable)

### High-Contrast Primitives

- **Pure Colors**: `--lufa-primitive-color-hc-{black,white,blue,red,green,yellow}`
- **Usage**: High-contrast mode only
- **Layer**: Primitive (immutable)

:::warning Don't Use Primitives Directly
Primitive tokens are **immutable constants** (like `Math.PI`). They never change regardless of mode or theme. Always use **semantic tokens** (e.g., `--lufa-semantic-ui-text-primary`) for mode-aware styling.
:::

## Next Steps

- [Typography Tokens](/docs/tokens/typography) - Font sizes, weights, and line heights
- [Spacing Tokens](/docs/tokens/spacing) - Padding, margin, and gap values
- [Component Overview](/docs/components/overview) - See color tokens in use

:::note Work in Progress
This documentation is being expanded with more examples and usage patterns.
:::

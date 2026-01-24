---
sidebar_position: 1
---

# Color Tokens

Color tokens define the semantic color palette for the Lufa Design System. All colors are designed to meet WCAG 2.1 AA accessibility standards and automatically adapt to light and dark themes.

## Token Structure

Color tokens are organized in a three-layer hierarchy:

```
Semantic Tokens (Layer 3)
    ↓ References
Core Tokens (Layer 2)
    ↓ References
Primitive Tokens (Layer 1)
```

## Text Colors

Semantic text colors with automatic contrast:

| Token       | CSS Variable                        | Usage                           |
| ----------- | ----------------------------------- | ------------------------------- |
| `primary`   | `--lufa-token-color-text-primary`   | Default text, highest contrast  |
| `secondary` | `--lufa-token-color-text-secondary` | Secondary text, medium emphasis |
| `muted`     | `--lufa-token-color-text-muted`     | Tertiary text, least emphasis   |
| `inverse`   | `--lufa-token-color-text-inverse`   | Text on colored backgrounds     |
| `disabled`  | `--lufa-token-color-text-disabled`  | Disabled state text             |

## State Colors

Colors for UI states and feedback:

| Token     | CSS Variable                      | Usage                               |
| --------- | --------------------------------- | ----------------------------------- |
| `success` | `--lufa-token-color-text-success` | Success messages, positive states   |
| `error`   | `--lufa-token-color-text-error`   | Error messages, destructive actions |
| `warning` | `--lufa-token-color-text-warning` | Warning messages, caution states    |
| `info`    | `--lufa-token-color-text-info`    | Informational messages              |

## Background Colors

Semantic background colors:

| Token     | CSS Variable                            | Usage                       |
| --------- | --------------------------------------- | --------------------------- |
| `base`    | `--lufa-token-color-background-base`    | Default background          |
| `surface` | `--lufa-token-color-background-surface` | Elevated surfaces, cards    |
| `overlay` | `--lufa-token-color-background-overlay` | Modal overlays              |
| `primary` | `--lufa-token-color-background-primary` | Primary buttons, highlights |
| `success` | `--lufa-token-color-background-success` | Success states              |
| `error`   | `--lufa-token-color-background-error`   | Error states                |
| `warning` | `--lufa-token-color-background-warning` | Warning states              |
| `info`    | `--lufa-token-color-background-info`    | Info states                 |

## Border Colors

Semantic border colors:

| Token    | CSS Variable                       | Usage              |
| -------- | ---------------------------------- | ------------------ |
| `base`   | `--lufa-token-color-border-base`   | Default borders    |
| `subtle` | `--lufa-token-color-border-subtle` | Subtle dividers    |
| `strong` | `--lufa-token-color-border-strong` | Emphasized borders |
| `focus`  | `--lufa-token-color-border-focus`  | Focus rings        |

## Usage in Components

### CSS Modules

```css
.button {
  background: var(--lufa-token-color-background-primary);
  color: var(--lufa-token-color-text-inverse);
  border: 1px solid var(--lufa-token-color-border-base);
}
```


## Accessibility

All color combinations in Lufa meet **WCAG 2.1 AA** standards:

- **Text colors**: Minimum 4.5:1 contrast ratio against backgrounds
- **Large text**: Minimum 3:1 contrast ratio (18pt+ or 14pt+ bold)
- **UI elements**: Minimum 3:1 contrast ratio for interactive elements

## Dark Mode

Color tokens automatically adapt to the user's color scheme preference:

```css
/* Automatically switches based on prefers-color-scheme */
:root {
  --lufa-token-color-text-primary: #1a1a1a; /* Light mode */
}

@media (prefers-color-scheme: dark) {
  :root {
    --lufa-token-color-text-primary: #f5f5f5; /* Dark mode */
  }
}
```

## Primitive Color Scale

The underlying primitive color palette (not meant for direct use):

- **Gray**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Blue**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Green**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Red**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Yellow**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- **Orange**: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

:::tip Best Practice
Always use **semantic tokens** (e.g., `color.text.primary`) instead of primitive values (e.g., `gray[900]`). This ensures proper theme adaptation and accessibility.
:::

## Next Steps

- [Typography Tokens](/docs/tokens/typography) - Font sizes, weights, and line heights
- [Spacing Tokens](/docs/tokens/spacing) - Padding, margin, and gap values
- [Component Overview](/docs/components/overview) - See color tokens in use

:::note Work in Progress
This documentation is being expanded with more examples and usage patterns.
:::

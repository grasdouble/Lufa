---
sidebar_position: 2
---

# Typography Tokens

Typography tokens define the font system for the Lufa Design System, including font sizes, weights, line heights, and font families.

## Font Families

| Token  | CSS Variable                    | Value                |
| ------ | ------------------------------- | -------------------- |
| `sans` | `--lufa-token-font-family-sans` | System font stack    |
| `mono` | `--lufa-token-font-family-mono` | Monospace font stack |

### System Font Stack

The design system uses native system fonts for optimal performance and familiarity:

```css
--lufa-token-font-family-sans:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

--lufa-token-font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
```

## Font Sizes

Semantic font size tokens based on usage:

| Token  | CSS Variable                  | Size (Desktop) | Fluid Range | Usage             |
| ------ | ----------------------------- | -------------- | ----------- | ----------------- |
| `xs`   | `--lufa-token-font-size-xs`   | 12px           | Static      | Captions, labels  |
| `sm`   | `--lufa-token-font-size-sm`   | 14px           | Static      | Small body text   |
| `base` | `--lufa-token-font-size-body` | 16px           | Static      | Default body text |
| `lg`   | `--lufa-token-font-size-lg`   | 18px           | Static      | Large body text   |
| `xl`   | `--lufa-token-font-size-xl`   | 20px           | Static      | Small headings    |
| `2xl`  | `--lufa-token-font-size-2xl`  | 24px           | 20px → 24px | Medium headings   |
| `3xl`  | `--lufa-token-font-size-3xl`  | 30px           | 24px → 30px | Large headings    |
| `4xl`  | `--lufa-token-font-size-4xl`  | 36px           | 28px → 36px | XL headings       |
| `5xl`  | `--lufa-token-font-size-5xl`  | 48px           | 32px → 48px | Hero headings     |

:::info Fluid Typography
Heading sizes (2xl-5xl) use CSS `clamp()` for responsive scaling between mobile and desktop viewports. Body text sizes (xs-xl) remain static for optimal readability.
:::

## Font Weights

Semantic font weight tokens:

| Token      | CSS Variable                        | Value | Usage            |
| ---------- | ----------------------------------- | ----- | ---------------- |
| `regular`  | `--lufa-token-font-weight-regular`  | 400   | Body text        |
| `medium`   | `--lufa-token-font-weight-medium`   | 500   | Emphasized text  |
| `semibold` | `--lufa-token-font-weight-semibold` | 600   | Headings, labels |
| `bold`     | `--lufa-token-font-weight-bold`     | 700   | Strong emphasis  |

## Line Heights

Line height tokens for different text contexts:

| Token     | CSS Variable                       | Value | Usage             |
| --------- | ---------------------------------- | ----- | ----------------- |
| `tight`   | `--lufa-token-line-height-tight`   | 1.25  | Headings          |
| `base`    | `--lufa-token-line-height-base`    | 1.5   | Body text         |
| `relaxed` | `--lufa-token-line-height-relaxed` | 1.75  | Long-form content |

## Letter Spacing

Letter-spacing tokens for fine-tuning typography:

| Token     | CSS Variable                          | Value   | Usage                              |
| --------- | ------------------------------------- | ------- | ---------------------------------- |
| `tighter` | `--lufa-token-letter-spacing-tighter` | -0.04em | Display text, extra large headings |
| `tight`   | `--lufa-token-letter-spacing-tight`   | -0.02em | Large headings (H1-H3)             |
| `normal`  | `--lufa-token-letter-spacing-normal`  | 0       | Body text (default)                |
| `wide`    | `--lufa-token-letter-spacing-wide`    | 0.05em  | Small text, uppercase labels       |
| `wider`   | `--lufa-token-letter-spacing-wider`   | 0.1em   | All-caps headings, button text     |

:::tip Usage
Letter-spacing is **not automatically applied** by components. Use it explicitly via CSS when needed:

```css
.hero-title {
  font-size: var(--lufa-token-font-size-5xl);
  letter-spacing: var(--lufa-token-letter-spacing-tight);
}

.uppercase-label {
  font-size: var(--lufa-token-font-size-sm);
  letter-spacing: var(--lufa-token-letter-spacing-wide);
  text-transform: uppercase;
}
```

:::

## Usage in Components

### CSS Modules

```css
.heading {
  font-family: var(--lufa-token-font-family-sans);
  font-size: var(--lufa-token-font-size-2xl);
  font-weight: var(--lufa-token-font-weight-semibold);
  line-height: var(--lufa-token-line-height-tight);
}

.body {
  font-family: var(--lufa-token-font-family-sans);
  font-size: var(--lufa-token-font-size-body);
  font-weight: var(--lufa-token-font-weight-regular);
  line-height: var(--lufa-token-line-height-base);
}
```

### TypeScript/JavaScript

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

const styles = {
  fontSize: tokens.fontSize.body,
  fontWeight: tokens.fontWeight.regular,
  lineHeight: tokens.lineHeight.base,
};
```

## Text Component Variants

The `Text` component provides pre-configured typography variants:

```tsx
import { Text } from '@grasdouble/lufa_design-system';

// Headings
<Text variant="heading-5xl">Hero Heading</Text>
<Text variant="heading-4xl">XL Heading</Text>
<Text variant="heading-3xl">Large Heading</Text>
<Text variant="heading-2xl">Medium Heading</Text>
<Text variant="heading-xl">Small Heading</Text>

// Body text
<Text variant="body-lg">Large body text</Text>
<Text variant="body">Default body text</Text>
<Text variant="body-sm">Small body text</Text>

// Specialized
<Text variant="caption">Caption text</Text>
<Text variant="code">Monospace code</Text>
<Text variant="label">Form label</Text>
```

## Accessibility

Typography tokens ensure readability and accessibility:

- **Minimum size**: 16px for body text (WCAG AAA for low vision)
- **Line height**: 1.5 for body text (WCAG Success Criterion 1.4.8)
- **Color contrast**: Minimum 4.5:1 for body text
- **Responsive**: Font sizes scale appropriately

## Responsive Typography

Typography tokens adapt automatically across screen sizes using CSS `clamp()` for headings:

```css
/* Heading tokens scale fluidly (2xl-5xl) */
.hero-heading {
  /* Automatically scales from 32px (mobile) to 48px (desktop) */
  font-size: var(--lufa-token-font-size-5xl);
}

.section-heading {
  /* Automatically scales from 24px (mobile) to 30px (desktop) */
  font-size: var(--lufa-token-font-size-3xl);
}

/* Body text remains static for readability */
.body-text {
  font-size: var(--lufa-token-font-size-body); /* Always 16px */
}
```

:::info How Fluid Typography Works
The design system uses CSS `clamp()` for headings (2xl-5xl):

```css
/* Example: 5xl token */
--lufa-token-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
/*                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/*                           min    preferred     max
/*                           32px   viewport-based 48px
```

This provides smooth, automatic scaling without media queries. Body text (xs-xl) stays static at optimal reading sizes.
:::

## Best Practices

### Do ✅

- Use semantic tokens (e.g., `font-size-body`) for consistency
- Pair font sizes with appropriate line heights
- Use system fonts for better performance
- Test readability at different sizes

### Don't ❌

- Hardcode font values (e.g., `font-size: 16px`)
- Use decorative fonts for body text
- Set line-height below 1.25 for readability
- Ignore contrast requirements

## Next Steps

- [Text Component](/docs/components/primitives/text) - Typography component with variants
- [Color Tokens](/docs/tokens/colors) - Color palette and usage
- [Spacing Tokens](/docs/tokens/spacing) - Layout spacing system

:::note Work in Progress
This documentation is being expanded with more examples and responsive patterns.
:::

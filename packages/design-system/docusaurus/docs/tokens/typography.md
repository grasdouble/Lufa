---
id: typography
title: Typography
sidebar_label: Typography
description: Typography tokens and usage guidelines.
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

| Token  | CSS Variable                  | Size (Desktop) | Fluid Range | Usage                         |
| ------ | ----------------------------- | -------------- | ----------- | ----------------------------- |
| `xs`   | `--lufa-token-font-size-xs`   | 12px           | Static      | Captions, labels              |
| `sm`   | `--lufa-token-font-size-sm`   | 14px           | Static      | Small body text               |
| `base` | `--lufa-token-font-size-body` | 16px           | Static      | Default body text             |
| `lg`   | `--lufa-token-font-size-lg`   | 18px           | Static      | Large body text               |
| `xl`   | `--lufa-token-font-size-xl`   | 20px           | Static      | Small headings                |
| `2xl`  | `--lufa-token-font-size-2xl`  | 24px           | 20px → 24px | Medium headings               |
| `3xl`  | `--lufa-token-font-size-3xl`  | 30px           | 24px → 30px | Large headings                |
| `4xl`  | `--lufa-token-font-size-4xl`  | 36px           | 28px → 36px | XL headings                   |
| `5xl`  | `--lufa-token-font-size-5xl`  | 48px           | 32px → 48px | Hero headings                 |
| `6xl`  | `--lufa-token-font-size-6xl`  | 60px           | 40px → 60px | Hero headlines, featured      |
| `7xl`  | `--lufa-token-font-size-7xl`  | 72px           | 48px → 72px | Marketing hero, landing       |
| `8xl`  | `--lufa-token-font-size-8xl`  | 96px           | 64px → 96px | Display text, brand impact ⚠️ |

:::info Fluid Typography
Heading sizes (2xl-8xl) use CSS `clamp()` for responsive scaling between mobile and desktop viewports. Body text sizes (xs-xl) remain static for optimal readability.

**Note about 8xl:** The largest size (8xl) has special behavior - it remains at 64px on viewports below 400px, then scales fluidly to 96px on larger screens. This is intentional, as display typography is designed for larger screens and marketing contexts.
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
<Text variant="heading-8xl">Display Heading</Text>
<Text variant="heading-7xl">Marketing Hero</Text>
<Text variant="heading-6xl">Hero Headline</Text>
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
/* Heading tokens scale fluidly (2xl-8xl) */
.hero-heading {
  /* Automatically scales from 32px (mobile) to 48px (desktop) */
  font-size: var(--lufa-token-font-size-5xl);
}

.marketing-hero {
  /* Automatically scales from 48px (mobile) to 72px (desktop) */
  font-size: var(--lufa-token-font-size-7xl);
}

.display-title {
  /* Automatically scales from 64px (mobile) to 96px (desktop) */
  /* Note: Fluid scaling engages at 400px+ viewport */
  font-size: var(--lufa-token-font-size-8xl);
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
The design system uses CSS `clamp()` for headings (2xl-8xl):

```css
/* Example: 5xl token */
--lufa-token-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
/*                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/*                           min    preferred     max
/*                           32px   viewport-based 48px

/* Example: 8xl token (largest display size) */
--lufa-token-font-size-8xl: clamp(4rem, 3rem + 4vw, 6rem);
/*                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^
/*                           min    preferred     max
/*                           64px   viewport-based 96px
```

This provides smooth, automatic scaling without media queries. Body text (xs-xl) stays static at optimal reading sizes.

**Extended Scale (6xl-8xl):** The largest tokens (6xl, 7xl, 8xl) are designed for marketing hero sections, landing pages, and display typography. The 8xl token has special behavior where fluid scaling only engages at viewports 400px and above - this is intentional, as display typography is primarily for larger screens.
:::

## Best Practices

### Extended Type Scale (6xl-8xl)

The extended scale tokens are designed for specific use cases:

**6xl (60px):** Hero headlines, featured content sections

```css
.hero-headline {
  font-size: var(--lufa-token-font-size-6xl);
  letter-spacing: var(--lufa-token-letter-spacing-tight);
}
```

**7xl (72px):** Marketing hero sections, landing page titles

```css
.marketing-hero {
  font-size: var(--lufa-token-font-size-7xl);
  letter-spacing: var(--lufa-token-letter-spacing-tighter);
  line-height: var(--lufa-token-line-height-tight);
}
```

**8xl (96px):** Display text, brand impact moments, large metric displays

```css
.display-title {
  font-size: var(--lufa-token-font-size-8xl);
  letter-spacing: var(--lufa-token-letter-spacing-tighter);
  line-height: 1.1;
}

/* Tip: Pair large display text with tighter letter-spacing */
```

:::tip Extended Scale Usage
The 6xl-8xl tokens are best suited for:

- Marketing and landing pages
- Hero sections with large imagery
- Brand-heavy campaigns
- KPI dashboards with prominent numbers
- Announcement banners

For standard UI and content pages, 2xl-5xl headings are usually sufficient.
:::

:::warning 8xl Special Behavior
The 8xl token (96px maximum) has intentional behavior where fluid scaling only engages at viewports 400px and above. On smaller mobile devices (320px-400px), it remains at 64px. This prevents excessive text size on small screens where display typography is less common.

:::

### General Typography Best Practices

### Do ✅

- Use semantic tokens (e.g., `font-size-body`) for consistency
- Pair font sizes with appropriate line heights
- Use system fonts for better performance
- Test readability at different sizes
- Use extended scale (6xl-8xl) for marketing and hero sections
- Pair large display text with tighter letter-spacing for better aesthetics

### Don't ❌

- Hardcode font values (e.g., `font-size: 16px`)
- Use decorative fonts for body text
- Set line-height below 1.25 for readability
- Ignore contrast requirements
- Use 8xl on small mobile screens (it's designed for larger viewports)
- Overuse extended scale tokens for standard UI content

## Next Steps

- [Text Component](/docs/primitives/text) - Typography component with variants
- [Color Tokens](/docs/tokens/colors) - Color palette and usage
- [Spacing Tokens](/docs/tokens/spacing) - Layout spacing system

:::note Updated Documentation
This documentation has been updated to include the extended type scale (6xl-8xl) tokens. These tokens were added as part of ADR-010 to support marketing, hero sections, and display typography use cases. See the [Extended Type Scale Storybook story](https://storybook.lufa-ds.grasdouble.com/?path=/story/tokens-typography--extended-type-scale) for interactive examples and responsive behavior.
:::

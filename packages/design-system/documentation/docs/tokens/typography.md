---
sidebar_position: 2
---

# Typography

Lufa's typography system provides a consistent and scalable type scale for all text content.

## Type Scale

Our typography system is based on a modular scale that ensures visual hierarchy and readability.

### Headings

```css
--lufa-token-font-size-6xl: /* H1 (60px) */
--lufa-token-font-size-5xl: /* H2 (48px) */
--lufa-token-font-size-4xl: /* H3 (36px) */
--lufa-token-font-size-3xl: /* H4 (30px) */
--lufa-token-font-size-2xl: /* H5 (24px) */
--lufa-token-font-size-xl: /* H6 (20px) */
```

### Body Text

```css
--lufa-token-font-size-base: /* 16px - Primary body text */
--lufa-token-font-size-sm: /* 14px - Secondary body text */
```

### Small Text

```css
--lufa-token-font-size-xs: /* 12px - Captions and labels */
```

## Font Families

```css
--lufa-token-font-family-sans: /* System font stack for body text */
--lufa-token-font-family-serif: /* Serif stack for editorial content */
--lufa-token-font-family-mono: /* Monospace font for code */
```

### Default Font Stack

```css
--lufa-token-font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

## Font Weights

```css
--lufa-token-font-weight-regular: 400;
--lufa-token-font-weight-medium: 500;
--lufa-token-font-weight-semibold: 600;
--lufa-token-font-weight-bold: 700;
```

## Line Heights

```css
--lufa-token-line-height-tight: 1.25; /* For headings */
--lufa-token-line-height-base: 1.5; /* For body text */
--lufa-token-line-height-relaxed: 1.75; /* For long-form content */
```

## Typography Scale Presets (JS)

Use `typographyScale` for pre-configured combinations of font size, weight, line height, and letter spacing:

```ts
import { typographyScale } from '@grasdouble/lufa_design-system-tokens';

const heading = typographyScale.h1;
```

## Usage

### With Typography Component

```tsx
import { Typography } from '@grasdouble/lufa_design-system';

<Typography variant="h1">Main Heading</Typography>
<Typography variant="h2">Subheading</Typography>
<Typography variant="body1">Body text goes here.</Typography>
<Typography variant="caption">Small caption text</Typography>
```

### With CSS Variables

```css
.heading {
  font-size: var(--lufa-token-font-size-5xl);
  font-weight: var(--lufa-token-font-weight-bold);
  line-height: var(--lufa-token-line-height-tight);
}

.body {
  font-size: var(--lufa-token-font-size-base);
  font-family: var(--lufa-token-font-family-sans);
  line-height: var(--lufa-token-line-height-base);
}
```

## Responsive Typography

Typography scales responsively based on viewport size. Consider using relative units:

```css
.responsive-heading {
  font-size: clamp(var(--lufa-token-font-size-4xl), 5vw, var(--lufa-token-font-size-6xl));
}
```

## Best Practices

### Hierarchy

Use the type scale to establish clear visual hierarchy:

1. **H1**: Page title (once per page)
2. **H2**: Major sections
3. **H3**: Subsections
4. **Body1**: Primary content
5. **Body2**: Secondary content
6. **Caption**: Metadata and labels

### Readability

- Keep line length between 45-75 characters
- Use appropriate line-height for text size
- Ensure sufficient contrast with background
- Use sentence case for most UI text

### Accessibility

- Maintain semantic HTML hierarchy (don't skip heading levels)
- Ensure text meets WCAG AA contrast requirements
- Allow text to scale with user preferences
- Provide sufficient spacing between lines

## Related

- [Colors →](./colors)
- [Spacing →](./spacing)
- [Typography Component →](../components/typography)

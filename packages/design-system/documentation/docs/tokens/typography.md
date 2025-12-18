---
sidebar_position: 2
---

# Typography

Lufa's typography system provides a consistent and scalable type scale for all text content.

## Type Scale

Our typography system is based on a modular scale that ensures visual hierarchy and readability.

### Headings

```css
--lufa-text-h1: /* 2.5rem / 40px */ --lufa-text-h2: /* 2rem / 32px */
  --lufa-text-h3: /* 1.75rem / 28px */ --lufa-text-h4: /* 1.5rem / 24px */
  --lufa-text-h5: /* 1.25rem / 20px */ --lufa-text-h6: /* 1rem / 16px */;
```

### Body Text

```css
--lufa-text-body1: /* 1rem / 16px - Primary body text */ --lufa-text-body2:
  /* 0.875rem / 14px - Secondary body text */;
```

### Small Text

```css
--lufa-text-caption: /* 0.75rem / 12px - Captions and labels */ --lufa-text-overline:
  /* 0.75rem / 12px - All caps labels */;
```

## Font Families

```css
--lufa-font-sans: /* System font stack for body text */ --lufa-font-mono:
  /* Monospace font for code */;
```

### Default Font Stack

```css
--lufa-font-sans:
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
  Cantarell, sans-serif;
```

## Font Weights

```css
--lufa-font-weight-regular: 400;
--lufa-font-weight-medium: 500;
--lufa-font-weight-semibold: 600;
--lufa-font-weight-bold: 700;
```

## Line Heights

```css
--lufa-line-height-tight: 1.25; /* For headings */
--lufa-line-height-normal: 1.5; /* For body text */
--lufa-line-height-relaxed: 1.75; /* For long-form content */
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
  font-size: var(--lufa-text-h2);
  font-weight: var(--lufa-font-weight-bold);
  line-height: var(--lufa-line-height-tight);
}

.body {
  font-size: var(--lufa-text-body1);
  font-family: var(--lufa-font-sans);
  line-height: var(--lufa-line-height-normal);
}
```

## Responsive Typography

Typography scales responsively based on viewport size. Consider using relative units:

```css
.responsive-heading {
  font-size: clamp(var(--lufa-text-h3), 5vw, var(--lufa-text-h1));
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

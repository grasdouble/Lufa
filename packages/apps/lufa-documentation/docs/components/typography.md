---
sidebar_position: 3
---

# Typography

A versatile text component for displaying content with consistent styling.

## Overview

The Typography component provides a standardized way to render text with semantic meaning and consistent styling across your application.

## Basic Usage

```tsx
import { Typography } from '@grasdouble/lufa_design-system';

<Typography variant="h1">Heading 1</Typography>
<Typography variant="body1">Body text goes here.</Typography>
```

## Variants

### Headings

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>
```

### Body Text

```tsx
<Typography variant="body1">
  Primary body text with normal weight and size.
</Typography>

<Typography variant="body2">
  Secondary body text, slightly smaller.
</Typography>
```

### Small Text

```tsx
<Typography variant="caption">
  Caption text for labels and metadata
</Typography>

<Typography variant="overline">
  OVERLINE TEXT FOR LABELS
</Typography>
```

## Semantic Elements

The component renders appropriate HTML elements by default:

```tsx
{
  /* Renders <h1> */
}
<Typography variant="h1">Page Title</Typography>;

{
  /* Renders <p> */
}
<Typography variant="body1">Paragraph text</Typography>;

{
  /* Renders <span> */
}
<Typography variant="caption">Caption text</Typography>;
```

### Custom Elements

Override the rendered element:

```tsx
<Typography variant="h1" component="h2">
  Styled as H1, rendered as H2
</Typography>

<Typography variant="body1" component="span">
  Inline text
</Typography>
```

## Props

| Prop        | Type                                                                                            | Default   | Description                     |
| ----------- | ----------------------------------------------------------------------------------------------- | --------- | ------------------------------- |
| `variant`   | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body1' \| 'body2' \| 'caption' \| 'overline'` | `'body1'` | Typography variant              |
| `component` | `string`                                                                                        | Auto      | HTML element to render          |
| `children`  | `React.ReactNode`                                                                               | -         | Text content                    |
| `className` | `string`                                                                                        | -         | Additional CSS classes          |
| `style`     | `React.CSSProperties`                                                                           | -         | Inline styles                   |
| `color`     | `string`                                                                                        | -         | Text color (CSS value or token) |

## Color Variations

```tsx
<Typography variant="body1" color="var(--lufa-color-text-primary)">
  Primary text color
</Typography>

<Typography variant="body1" color="var(--lufa-color-text-secondary)">
  Secondary text color
</Typography>

<Typography variant="body1" color="var(--lufa-color-primary)">
  Brand color
</Typography>

<Typography variant="body1" color="var(--lufa-color-error)">
  Error text
</Typography>
```

## Text Alignment

```tsx
<Typography variant="h2" style={{ textAlign: 'center' }}>
  Centered Text
</Typography>

<Typography variant="body1" style={{ textAlign: 'right' }}>
  Right-aligned text
</Typography>
```

## Text Transforms

```tsx
<Typography variant="body1" style={{ textTransform: 'uppercase' }}>
  Uppercase text
</Typography>

<Typography variant="body1" style={{ textTransform: 'capitalize' }}>
  capitalized text
</Typography>
```

## Font Weight

```tsx
<Typography variant="body1" style={{ fontWeight: 'var(--lufa-font-weight-regular)' }}>
  Regular weight
</Typography>

<Typography variant="body1" style={{ fontWeight: 'var(--lufa-font-weight-medium)' }}>
  Medium weight
</Typography>

<Typography variant="body1" style={{ fontWeight: 'var(--lufa-font-weight-bold)' }}>
  Bold weight
</Typography>
```

## Usage Patterns

### Content Hierarchy

```tsx
<article>
  <Typography variant="h1">Article Title</Typography>
  <Typography variant="body2" color="var(--lufa-color-text-secondary)">
    Published on January 1, 2024
  </Typography>

  <Typography variant="h2">Section Heading</Typography>
  <Typography variant="body1">
    Main content goes here with proper spacing and readability.
  </Typography>

  <Typography variant="caption">
    * Footnote or additional information
  </Typography>
</article>
```

### Labels and Descriptions

```tsx
<div>
  <Typography variant="caption" component="label" htmlFor="email">
    Email Address
  </Typography>
  <input id="email" type="email" />
  <Typography variant="body2" color="var(--lufa-color-text-secondary)">
    We'll never share your email.
  </Typography>
</div>
```

### Cards with Typography

```tsx
<Card>
  <Typography variant="h3">Card Title</Typography>
  <Typography variant="body2" color="var(--lufa-color-text-secondary)">
    Card subtitle or description text.
  </Typography>
  <Typography variant="body1">
    Main card content with proper hierarchy.
  </Typography>
</Card>
```

## Accessibility

- Uses semantic HTML elements by default
- Maintains proper heading hierarchy
- Supports screen readers
- Respects user font size preferences
- Adequate color contrast ratios

## Best Practices

### Do

- Use semantic heading hierarchy (h1, h2, h3...)
- Use body1 for primary content
- Use body2 for secondary content
- Use caption for metadata
- Maintain consistent spacing

### Don't

- Skip heading levels (h1 → h3)
- Use headings for styling only
- Override semantic meaning without purpose
- Use too many different text sizes
- Ignore color contrast requirements

## Responsive Typography

```tsx
<Typography
  variant="h1"
  style={{
    fontSize: "clamp(var(--lufa-text-h3), 5vw, var(--lufa-text-h1))",
  }}
>
  Responsive Heading
</Typography>
```

## Related

- [Typography Foundation →](../foundations/typography)
- [Colors Foundation →](../foundations/colors)
- [Button Component →](./forms/button)
- [Card Component →](./display/card)

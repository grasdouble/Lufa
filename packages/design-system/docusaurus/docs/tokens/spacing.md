---
sidebar_position: 3
---

# Spacing Tokens

Spacing tokens define the spacing scale for the Lufa Design System, used for padding, margin, gaps, and layout consistency.

## Token Layers

Spacing uses both **primitive** and **semantic** tokens:

- **Primitive**: `--lufa-primitive-spacing-{4,8,12,16,24,32,...}` (immutable constants)
- **Semantic**: `--lufa-semantic-ui-spacing-{tight,compact,default,comfortable,spacious}` (meaningful names)

:::tip Use Semantic Tokens
Always use **semantic spacing tokens** (e.g., `--lufa-semantic-ui-spacing-default`) instead of primitives for consistent, maintainable layouts.
:::

## Semantic Spacing Scale

The semantic spacing system provides meaningful names for common layout needs:

| Token         | CSS Variable                             | Value | Usage                             |
| ------------- | ---------------------------------------- | ----- | --------------------------------- |
| `tight`       | `--lufa-semantic-ui-spacing-tight`       | 4px   | Minimal spacing, compact layouts  |
| `compact`     | `--lufa-semantic-ui-spacing-compact`     | 8px   | Compact spacing, button padding   |
| `default`     | `--lufa-semantic-ui-spacing-default`     | 16px  | Default spacing, standard padding |
| `comfortable` | `--lufa-semantic-ui-spacing-comfortable` | 24px  | Comfortable spacing, card padding |
| `spacious`    | `--lufa-semantic-ui-spacing-spacious`    | 32px  | Generous spacing, section gaps    |

## Design Principles

The spacing scale follows these principles:

1. **Base 4px**: All values are multiples of 4 for pixel-perfect alignment
2. **Semantic names**: Names describe usage, not raw values
3. **Consistent hierarchy**: Each step provides noticeable difference
4. **Flexible**: Covers most layout needs from compact to spacious

## Usage in Components

### CSS Modules

```css
.card {
  /* ✅ Use semantic spacing tokens */
  padding: var(--lufa-semantic-ui-spacing-comfortable); /* 24px */
  margin-bottom: var(--lufa-semantic-ui-spacing-default); /* 16px */
  gap: var(--lufa-semantic-ui-spacing-compact); /* 8px */
}

.button {
  /* Combine different spacing values */
  padding: var(--lufa-semantic-ui-spacing-compact) var(--lufa-semantic-ui-spacing-default);
  /* 8px vertical, 16px horizontal */
}
```

### Avoid Using Primitives Directly

```css
/* ❌ WRONG - using primitive tokens directly */
.container {
  padding: var(--lufa-primitive-spacing-24);
}

/* ✅ CORRECT - using semantic tokens */
.container {
  padding: var(--lufa-semantic-ui-spacing-comfortable);
}
```

### TypeScript/JavaScript

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

const styles = {
  padding: tokens.spacing.default,
  marginBottom: tokens.spacing.comfortable,
  gap: tokens.spacing.compact,
};
```

## Component Usage

### Box Component

The `Box` component uses spacing tokens for padding and margin:

```tsx
import { Box } from '@grasdouble/lufa_design-system';

// Padding variants
<Box padding="tight">Tight padding (4px)</Box>
<Box padding="compact">Compact padding (8px)</Box>
<Box padding="default">Default padding (16px)</Box>
<Box padding="comfortable">Comfortable padding (24px)</Box>
<Box padding="spacious">Spacious padding (32px)</Box>

// Margin variants
<Box margin="default">Default margin (16px)</Box>

// Per-side control
<Box paddingTop="compact" paddingBottom="spacious">
  Custom padding per side
</Box>
```

### Stack Component

The `Stack` component uses spacing tokens for gaps:

```tsx
import { Stack } from '@grasdouble/lufa_design-system';

// Gap between children
<Stack spacing="compact">...</Stack>
<Stack spacing="default">...</Stack>
<Stack spacing="comfortable">...</Stack>
```

## Common Spacing Patterns

### Card Layout

```tsx
<Box padding="comfortable" background="surface" borderRadius="medium">
  <Stack spacing="default">
    <Text variant="heading-lg">Card Title</Text>
    <Text>Card content with comfortable padding</Text>
  </Stack>
</Box>
```

### Form Layout

```tsx
<Stack spacing="compact">
  <Text variant="label">Label</Text>
  <Input />
  <Text variant="caption">Helper text</Text>
</Stack>
```

### Section Layout

```tsx
<Stack spacing="spacious">
  <Section>First section</Section>
  <Section>Second section</Section>
  <Section>Third section</Section>
</Stack>
```

## Responsive Spacing

While spacing tokens are fixed values, you can adjust spacing based on screen size:

```css
.container {
  padding: var(--lufa-semantic-ui-spacing-default);
}

@media (min-width: 768px) {
  .container {
    padding: var(--lufa-semantic-ui-spacing-comfortable);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--lufa-semantic-ui-spacing-spacious);
  }
}
```

## Negative Spacing

For overlapping layouts, use negative margins:

```css
.overlap {
  margin-top: calc(var(--lufa-semantic-ui-spacing-default) * -1);
}
```

## Spacing Combinations

Mix spacing tokens for asymmetric layouts:

```tsx
// Vertical compact, horizontal comfortable
<Box paddingTop="compact" paddingBottom="compact" paddingLeft="comfortable" paddingRight="comfortable">
  Asymmetric padding
</Box>
```

## Accessibility

Proper spacing improves accessibility:

- **Touch targets**: Minimum 44x44px (use `comfortable` or `spacious`)
- **Readability**: Adequate spacing between text blocks (`default` or more)
- **Focus indicators**: Visible spacing around focused elements
- **Content density**: Avoid cramped layouts that strain comprehension

## Best Practices

### Do ✅

- Use semantic tokens (e.g., `spacing.default`) for consistency
- Apply spacing consistently across similar components
- Use Stack component for consistent gaps
- Test layouts at different viewport sizes

### Don't ❌

- Hardcode spacing values (e.g., `padding: 16px`)
- Use arbitrary spacing values
- Create spacing inconsistencies
- Ignore responsive spacing needs

## Primitive Spacing Scale (Reference)

For reference, the underlying primitive scale. **These are immutable constants** - use semantic tokens in your app code:

| Primitive                     | Size | Layer     |
| ----------------------------- | ---- | --------- |
| `--lufa-primitive-spacing-0`  | 0px  | Primitive |
| `--lufa-primitive-spacing-4`  | 4px  | Primitive |
| `--lufa-primitive-spacing-8`  | 8px  | Primitive |
| `--lufa-primitive-spacing-12` | 12px | Primitive |
| `--lufa-primitive-spacing-16` | 16px | Primitive |
| `--lufa-primitive-spacing-20` | 20px | Primitive |
| `--lufa-primitive-spacing-24` | 24px | Primitive |
| `--lufa-primitive-spacing-32` | 32px | Primitive |
| `--lufa-primitive-spacing-40` | 40px | Primitive |
| `--lufa-primitive-spacing-48` | 48px | Primitive |
| `--lufa-primitive-spacing-64` | 64px | Primitive |

:::warning Use Semantic Tokens
Primitive tokens are **immutable constants** (like `Math.PI`). Always use **semantic tokens** (e.g., `--lufa-semantic-ui-spacing-default`) instead for consistent, maintainable spacing.
:::

## Next Steps

- [Box Component](/docs/components/primitives/box) - Container with spacing utilities
- [Stack Component](/docs/components/primitives/stack) - Layout with consistent gaps
- [Color Tokens](/docs/tokens/colors) - Color palette system

:::note Work in Progress
This documentation is being expanded with more layout patterns and examples.
:::

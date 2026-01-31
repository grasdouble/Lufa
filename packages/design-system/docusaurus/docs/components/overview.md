---
id: overview
title: Component Overview
sidebar_label: Overview
description: Overview of components in the design system.
sidebar_position: 1
---

# Component Overview

The Lufa Design System provides a comprehensive set of React components built with accessibility and customization in mind.

## Primitive Components

Primitive components are the foundational building blocks of the design system.

### Layout Primitives

- **[Box](/docs/primitives/box)** - Flexible container with padding, margin, background, and border utilities
- **[Stack](/docs/primitives/stack)** - Flexbox layout for vertical/horizontal stacking with consistent spacing

### Content Primitives

- **[Text](/docs/primitives/text)** - Typography component with semantic variants and accessibility features
- **[Icon](/docs/primitives/icon)** - SVG icon wrapper with semantic sizing and colors (Lucide React integration)

### Interactive Primitives

Coming soon:

- **[Button](/docs/components/Button)** - Interactive button with variants, sizes, and states
- **[Badge](/docs/components/badge)** - Status and labeling component
- **[Divider](/docs/primitives/divider)** - Visual separator for content sections

## Component Categories

### Layout Components

Components for structuring page layouts and organizing content.

- Box
- Stack
- Grid (planned)
- Container (planned)

### Content Components

Components for displaying text and media content.

- Text
- Icon
- Heading (uses Text)
- Image (planned)

### Form Components

Interactive form elements (planned).

- Button
- Input
- Checkbox
- Radio
- Select

### Feedback Components

Components for displaying feedback and status (planned).

- Badge
- Alert
- Toast
- Loading

## Design Principles

All Lufa components follow these core principles:

### 1. Accessibility First

- **WCAG 2.1 AA** compliant by default
- Semantic HTML elements
- Keyboard navigation support
- Screen reader optimized
- Focus management

### 2. Token-Based Design

- All design values use semantic tokens
- Automatic light/dark theme support
- Consistent spacing, colors, and typography
- Easy customization

### 3. Polymorphic API

- `as` prop for semantic HTML flexibility
- Type-safe props based on element type
- Maintains accessibility with semantic elements

### 4. Performance Optimized

- CSS Modules for scoped styles
- CSS custom properties for theming
- Tree-shakeable imports
- Minimal runtime overhead

### 5. Developer Experience

- Full TypeScript support
- Clear prop APIs
- Comprehensive documentation
- Interactive examples

## Usage Patterns

### Composing Components

Lufa components are designed to be composed together:

```tsx
import { Box, Icon, Stack, Text } from '@grasdouble/lufa_design-system';

function UserCard({ name, email, role }) {
  return (
    <Box padding="comfortable" background="surface" borderRadius="medium" borderWidth="thin" borderColor="default">
      <Stack direction="vertical" spacing="compact">
        <Stack direction="horizontal" spacing="compact" align="center">
          <Icon name="user" color="primary" />
          <Text variant="heading-sm">{name}</Text>
        </Stack>
        <Text variant="body-sm" color="secondary">
          {email}
        </Text>
        <Text variant="caption" color="muted">
          {role}
        </Text>
      </Stack>
    </Box>
  );
}
```

## Component Status

| Component | Status     | Tests | Docs | Storybook |
| --------- | ---------- | ----- | ---- | --------- |
| Box       | ✅ Stable  | 120   | ✅   | ✅        |
| Stack     | ✅ Stable  | 86    | ✅   | ✅        |
| Text      | ✅ Stable  | 107   | ✅   | ✅        |
| Icon      | ✅ Stable  | 106   | ✅   | ✅        |
| Button    | 🚧 Planned | -     | -    | -         |
| Badge     | 🚧 Planned | -     | -    | -         |
| Divider   | 🚧 Planned | -     | -    | -         |

## Next Steps

- Explore individual [component documentation](/docs/primitives/box)
- Learn about [design tokens](/docs/tokens/colors)
- Check out [Storybook](https://storybook.lufa-ds.grasdouble.com) for interactive examples

:::note Work in Progress
This design system is actively being developed. More components and features will be added regularly.
:::

---
id: overview
title: Component Overview
sidebar_label: Overview
description: Overview of components in the design system.
sidebar_position: 1
---

# Component Overview

The Lufa Design System provides a comprehensive set of React components built with accessibility and customization in mind. Components are organized by their role and purpose for better discoverability.

## Component Categories

### Foundation

Layout and structure components that form the building blocks of your UI.

- **[Box](/docs/foundation/box)** - Flexible container with padding, margin, background, and border utilities
- **[Stack](/docs/foundation/stack)** - Flexbox layout for vertical/horizontal stacking with consistent spacing
- **[Flex](/docs/foundation/flex)** - Advanced flexbox layout primitive
- **[Grid](/docs/foundation/grid)** - Two-dimensional grid layout primitive
- **[Container](/docs/foundation/container)** - Max-width centered container for responsive layouts
- **[Center](/docs/foundation/center)** - Centers content horizontally and vertically

### Content

Display components for text, icons, badges, and visual elements.

- **[Text](/docs/content/text)** - Typography component with semantic variants and accessibility features
- **[Icon](/docs/content/icon)** - SVG icon wrapper with semantic sizing and colors (Lucide React integration)
- **[Badge](/docs/content/badge)** - Status and labeling component
- **[Divider](/docs/content/divider)** - Visual separator for content sections

### Interaction

Interactive elements like buttons, inputs, and form controls.

- **[Button](/docs/interaction/button)** - Interactive button with variants, sizes, and states
- **[Input](/docs/interaction/input)** - Text input field with design system styling
- **[Label](/docs/interaction/label)** - Text label for form controls and UI elements

### Composition

Complex patterns that combine multiple components.

- **[Card](/docs/composition/card)** - Composed container for grouped content and actions

### Utility

Technical helpers and accessibility utilities.

- **[Portal](/docs/utility/portal)** - Renders children into a portal outside of the DOM hierarchy
- **[VisuallyHidden](/docs/utility/visually-hidden)** - Hides content visually but leaves it available to screen readers

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

| Component      | Status    | Category    | Tests | Docs | Storybook |
| -------------- | --------- | ----------- | ----- | ---- | --------- |
| Box            | ✅ Stable | Foundation  | 120   | ✅   | ✅        |
| Stack          | ✅ Stable | Foundation  | 86    | ✅   | ✅        |
| Flex           | ✅ Stable | Foundation  | 42    | ✅   | ✅        |
| Grid           | ✅ Stable | Foundation  | 38    | ✅   | ✅        |
| Container      | ✅ Stable | Foundation  | 28    | ✅   | ✅        |
| Center         | ✅ Stable | Foundation  | 14    | ✅   | ✅        |
| Text           | ✅ Stable | Content     | 107   | ✅   | ✅        |
| Icon           | ✅ Stable | Content     | 106   | ✅   | ✅        |
| Badge          | ✅ Stable | Content     | 88    | ✅   | ✅        |
| Divider        | ✅ Stable | Content     | 74    | ✅   | ✅        |
| Button         | ✅ Stable | Interaction | 94    | ✅   | ✅        |
| Input          | ✅ Stable | Interaction | 12    | ✅   | ✅        |
| Label          | ✅ Stable | Interaction | 8     | ✅   | ✅        |
| Card           | ✅ Stable | Composition | 16    | ✅   | ✅        |
| Portal         | ✅ Stable | Utility     | 4     | ✅   | ✅        |
| VisuallyHidden | ✅ Stable | Utility     | 4     | ✅   | ✅        |

## Next Steps

- Explore individual component documentation in the sidebar
- Learn about [design tokens](/docs/tokens/colors)
- Check out [Storybook](https://storybook.lufa-ds.grasdouble.com) for interactive examples

:::note Work in Progress
This design system is actively being developed. More components and features will be added regularly.
:::

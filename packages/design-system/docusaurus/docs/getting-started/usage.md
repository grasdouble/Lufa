---
id: usage
title: Usage Guide
sidebar_label: Usage
description: How to use the design system in applications.
sidebar_position: 2
---

# Usage Guide

Learn how to use Lufa Design System components in your React applications.

## Basic Component Usage

Import components from the main package:

```tsx title="src/App.tsx"
import { Badge, Box, Button, Icon, Stack, Text } from '@grasdouble/lufa_design-system';

function App() {
  return (
    <Box padding="default" background="surface">
      <Stack direction="vertical" spacing="comfortable">
        <Text as="h1" variant="h1">Welcome to Lufa</Text>
        <Text>Start building with our components.</Text>
        <Button type="solid" variant="primary" size="md">
          Get Started
        </Button>
      </Stack>
    </Box>
  );
}
```

## Component Composition

Lufa components are designed to work together seamlessly:

```tsx
import { Badge, Box, Divider, Stack, Text } from '@grasdouble/lufa_design-system';

function StatusCard() {
  return (
    <Box padding="comfortable" background="surface" borderRadius="base">
      <Stack direction="vertical" spacing="compact">
        <Stack direction="horizontal" spacing="compact" align="center">
          <Text as="h2" variant="h2">Project Status</Text>
          <Badge variant="success">Active</Badge>
        </Stack>
        <Divider />
        <Text>Your project is running smoothly.</Text>
      </Stack>
    </Box>
  );
}
```

## Using Design Tokens

Components use design tokens internally, but you can also use them directly:

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

function CustomComponent() {
  const customStyles = {
    padding: tokens.spacing.default,
    fontSize: tokens.fontSize.body,
    color: tokens.color.text.primary,
  };

  return <div style={customStyles}>Custom styled content</div>;
}
```

## Responsive Layouts

Use the Stack component for flexible, responsive layouts:

```tsx
import { Box, Stack, Text } from '@grasdouble/lufa_design-system';

function ResponsiveGrid() {
  return (
    <Stack direction="horizontal" spacing="comfortable" wrap={true}>
      <Box padding="default" background="surface" style={{ flex: '1 1 300px' }}>
        <Text as="h3" variant="h3">Card 1</Text>
      </Box>
      <Box padding="default" background="surface" style={{ flex: '1 1 300px' }}>
        <Text as="h3" variant="h3">Card 2</Text>
      </Box>
      <Box padding="default" background="surface" style={{ flex: '1 1 300px' }}>
        <Text as="h3" variant="h3">Card 3</Text>
      </Box>
    </Stack>
  );
}
```

## Accessibility Best Practices

All components follow accessibility best practices by default:

```tsx
import { Button, Icon, Text } from '@grasdouble/lufa_design-system';

function AccessibleButton() {
  return (
    <Button variant="primary" aria-label="Delete item">
      <Icon name="trash" decorative />
      <Text>Delete</Text>
    </Button>
  );
}
```

## TypeScript Support

Full TypeScript type definitions are included:

```tsx
import type { BoxProps, StackProps, TextProps } from '@grasdouble/lufa_design-system';
import { Box, Stack, Text } from '@grasdouble/lufa_design-system';

type CardProps = {
  title: string;
  children: React.ReactNode;
} & BoxProps;

function Card({ title, children, ...boxProps }: CardProps) {
  return (
    <Box padding="comfortable" background="surface" {...boxProps}>
      <Stack direction="vertical" spacing="compact">
        <Text as="h3" variant="h3">{title}</Text>
        {children}
      </Stack>
    </Box>
  );
}
```

## Next Steps

- [Explore Components](/docs/components/overview) - Browse all available components
- [Learn About Tokens](/docs/tokens/colors) - Understand the design token system
- [Customize Theming](/docs/getting-started/theming) - Adapt the design system to your brand
- [Test Your Code](/docs/guides/testing) - Ensure accessibility and quality

:::tip Interactive Examples
Try components in the [Playground](/docs/playground) with live code editing!
:::

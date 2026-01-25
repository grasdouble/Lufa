---
sidebar_position: 1
---

# Installation

## Package Installation

Install the Lufa Design System package from npm:

```bash
npm install @grasdouble/lufa_design-system
# or
yarn add @grasdouble/lufa_design-system
# or
pnpm add @grasdouble/lufa_design-system
```

## CSS Import

Import the design system CSS in your application's entry point:

```tsx title="src/main.tsx"
import '@grasdouble/lufa_design-system/style.css';
```

## Basic Usage

Import and use components in your application:

```tsx title="src/App.tsx"
import { Box, Stack, Text } from '@grasdouble/lufa_design-system';

function App() {
  return (
    <Box padding="default" background="surface">
      <Stack direction="vertical" spacing="comfortable">
        <Text variant="heading-lg">Welcome to Lufa Design System</Text>
        <Text>A modern, accessible design system built with React.</Text>
      </Stack>
    </Box>
  );
}
```

## TypeScript Support

The package includes full TypeScript type definitions. No additional `@types` packages are needed.

```tsx
import type { BoxProps, StackProps, TextProps } from '@grasdouble/lufa_design-system';
```

## Next Steps

- [Component Overview](/docs/components/overview) - Explore available components
- [Design Tokens](/docs/tokens/colors) - Learn about the design token system
- [Theming Guide](/docs/getting-started/theming) - Customize the design system

:::note Work in Progress
This documentation is currently being developed. More installation guides and setup instructions will be added soon.
:::

[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system

[![npm version](https://img.shields.io/npm/v/@grasdouble/lufa_design-system?style=flat-square)](https://www.npmjs.com/package/@grasdouble/lufa_design-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://react.dev)

> Production-ready React component library with accessibility, theming, and full TypeScript support

**Part of the [Lufa Design System](../README.md)** - Layer 3: React Components

## Overview

The Lufa Design System provides a comprehensive set of React components for building modern web applications. Built on a foundation of design tokens and primitives, it ensures visual consistency while maintaining flexibility.

### Features

- **Accessible** - WCAG 2.1 AA compliant with comprehensive ARIA support
- **Type-Safe** - Full TypeScript definitions with strict mode
- **Themeable** - Token-based system with dark mode support
- **Composable** - Flexible component composition patterns
- **Tested** - Comprehensive test coverage with Vitest
- **Documented** - Interactive Storybook examples

## Installation

```bash
pnpm add @grasdouble/lufa_design-system
# or
npm install @grasdouble/lufa_design-system
# or
yarn add @grasdouble/lufa_design-system
```

## Quick Start

```tsx
import { Badge, Box, Button, Divider, Icon, Stack, Text } from '@grasdouble/lufa_design-system';

function App() {
  return (
    <Box padding="comfortable">
      <Stack direction="vertical" spacing="default">
        <Text variant="h2">Welcome to Lufa</Text>
        <Text variant="body-md">Build amazing applications with our design system.</Text>
        <Button variant="primary" size="md">
          Get Started
        </Button>
      </Stack>
    </Box>
  );
}
```

## Component Categories

**Layer 1: Primitives (4/4 complete ✅)**

- **Box** - Layout primitive with spacing, background, borders
- **Stack** - Layout primitive for vertical/horizontal arrangements
- **Text** - Typography primitive with semantic variants
- **Icon** - SVG icon wrapper with 29 icons

**Layer 2: Components (3/3 complete ✅)**

- **Button** - Interactive component with 7 variants × 3 types
- **Badge** - Status indicator with 6 semantic variants
- **Divider** - Visual separator with 5 emphasis levels

**Future (v2.1+)**

- Forms, Feedback, Overlay, Navigation components

Explore all components in [Storybook](http://localhost:6006).

## Design System Layers

The design system follows a three-layer architecture:

1. **[Primitives](../primitives/)** - Raw, non-semantic values (pixels, milliseconds)
2. **[Tokens](../tokens/)** - Semantic design decisions mapped from primitives
3. **Components** - React components consuming tokens (this package)

[Learn more about the architecture →](../../../.github/instructions/lufa-design-system.instructions.md)

## Theming

Theming system is token-based and ready for theme swapping:

```css
/* Import token CSS variables */
@import '@grasdouble/lufa_design-system-tokens/tokens.css';

/* Components automatically use CSS custom properties */
.my-component {
  color: var(--lufa-semantic-ui-text-primary);
  background: var(--lufa-semantic-ui-background-default);
}
```

**Theme variants** (Ocean, Forest) are available in `@grasdouble/lufa_design-system-themes`.

See [Token Architecture](../_docs/token-architecture.md) for details.

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm ds:main:dev

# Build package
pnpm ds:main:build

# Run tests
pnpm test

# Lint and format
pnpm ds:main:lint
pnpm ds:main:prettier
```

## Related Packages

| Package                                                     | Description                    |
| ----------------------------------------------------------- | ------------------------------ |
| [@grasdouble/lufa_design-system-primitives](../primitives/) | Non-semantic foundation values |
| [@grasdouble/lufa_design-system-tokens](../tokens/)         | Semantic design tokens         |
| [@grasdouble/lufa_design-system-themes](../themes/)         | Theme variants (Ocean, Forest) |
| [Storybook](../storybook/)                                  | Interactive component explorer |
| [Documentation](../docusaurus/)                             | Comprehensive guides           |

## Resources

- [Component Documentation](../docusaurus/)
- [Design System Instructions](../../../.github/instructions/lufa-design-system.instructions.md)
- [Storybook](https://storybook.example.com)
- [Contributing Guide](../../../CONTRIBUTING.md)

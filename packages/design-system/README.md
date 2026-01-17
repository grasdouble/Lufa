# Lufa Design System

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react)](https://react.dev)

> A comprehensive, three-layer design system built for modern web applications with accessibility, theming, and developer experience at its core.

## Overview

The Lufa Design System provides a complete foundation for building consistent, accessible, and themeable React applications. Built on a clear separation of concerns, it offers everything from raw primitives to production-ready components.

### Architecture

The design system follows a three-layer architecture, each serving a distinct purpose:

```
┌─────────────────────────────────────────────┐
│         React Components                    │
│    (@grasdouble/lufa_design-system)         │
│  Production-ready UI components with        │
│  accessibility, composition patterns        │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Semantic Tokens                     │
│  (@grasdouble/lufa_design-system-tokens)    │
│  Purpose-driven design decisions            │
│  (primary, secondary, compact, spacious)    │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Primitives                          │
│  (@grasdouble/lufa_design-system-primitives)│
│  Raw foundational values                    │
│  (16px, 150ms, blue[600])                   │
└─────────────────────────────────────────────┘
```

**Layer 1: Primitives** - Non-semantic, raw values using actual measurements as keys  
**Layer 2: Tokens** - Semantic design decisions mapped from primitives  
**Layer 3: Components** - Accessible React components using tokens

### Key Features

- **Three-Layer Architecture** - Clear separation between primitives, tokens, and components
- **448 Primitives** - Raw foundational values for all design aspects
- **446 Token Values** - Semantic design decisions in TS (355 CSS custom properties)
- **Type-Safe** - Full TypeScript support with strict mode
- **Accessible** - WCAG 2.1 AA compliant components
- **Themeable** - Token-based theming with dark mode support
- **Interactive Documentation** - Storybook for component exploration
- **Comprehensive Guides** - Docusaurus documentation site

## Packages

### Core Packages

#### [@grasdouble/lufa_design-system](./main)

The main component library with production-ready React components.

```bash
pnpm add @grasdouble/lufa_design-system
```

**What's included:**

- Accessible React components (Button, Card, Input, etc.)
- Compound component patterns
- TypeScript definitions
- CSS-based styling with design tokens

[View Package →](./main)

#### [@grasdouble/lufa_design-system-tokens](./tokens)

Semantic design tokens providing purpose-based design decisions.

```bash
pnpm add @grasdouble/lufa_design-system-tokens
```

**What's included:**

- 446 token values in TypeScript (including motion/focus presets)
- 355 CSS custom properties in `dist/style.css`
- Color, spacing, typography, motion tokens
- CSS custom properties
- TypeScript definitions

[View Package →](./tokens)

#### [@grasdouble/lufa_design-system-primitives](./primitives)

Non-semantic, foundational design values.

```bash
pnpm add @grasdouble/lufa_design-system-primitives
```

**What's included:**

- 448 primitive tokens
- Value-based keys (16px, 150ms, etc.)
- CSS custom properties
- TypeScript definitions

[View Package →](./primitives)

#### [@grasdouble/lufa_design-system-themes](./themes)

Pre-built theme variants for quick customization.

```bash
pnpm add @grasdouble/lufa_design-system-themes
```

**What's included:**

- Ocean theme
- Forest theme
- Additional theme variants

[View Package →](./themes)

### Development Packages

#### [@grasdouble/lufa_design-system-storybook](./storybook)

Interactive component explorer and documentation.

```bash
pnpm ds:storybook:dev    # Start Storybook
pnpm ds:storybook:build  # Build static site
```

**Features:**

- Interactive component playground
- Variant exploration
- Accessibility testing
- Code examples

[View Package →](./storybook)

#### [@grasdouble/lufa_design-system-docusaurus](./docusaurus)

Comprehensive documentation site built with Docusaurus.

```bash
pnpm ds:docusaurus:dev    # Start docs server
pnpm ds:docusaurus:build  # Build static site
```

**Features:**

- Getting started guides
- Design principles
- Component guidelines
- Migration guides

[View Package →](./documentation)

## Quick Start

### Installation

Install the main design system package:

```bash
pnpm add @grasdouble/lufa_design-system
# or
npm install @grasdouble/lufa_design-system
# or
yarn add @grasdouble/lufa_design-system
```

### Basic Usage

```tsx
import { Button, Card } from '@grasdouble/lufa_design-system';

import '@grasdouble/lufa_design-system/style.css';

function App() {
  return (
    <Card>
      <Card.Header>
        <h2>Welcome to Lufa</h2>
      </Card.Header>
      <Card.Body>
        <p>Build amazing applications with our design system.</p>
        <Button variant="primary" size="md">
          Get Started
        </Button>
      </Card.Body>
    </Card>
  );
}
```

### Using Tokens

Access semantic tokens for custom styling:

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

const customStyles = {
  padding: tokens.spacing.lg,
  fontSize: tokens.fontSize.base,
  color: tokens.color.text.primary,
};
```

### Using Primitives

Access raw primitive values for advanced use cases:

```tsx
import primitives from '@grasdouble/lufa_design-system-primitives';

const customStyles = {
  padding: primitives.spacing[24],
  fontSize: primitives.fontSize[16],
  transition: `all ${primitives.timing[150]} ease-in-out`,
};
```

## Development

### Monorepo Structure

```
packages/design-system/
├── main/              # React component library
├── primitives/        # Non-semantic foundational values
├── tokens/            # Semantic design tokens
├── themes/            # Pre-built theme variants
├── storybook/         # Interactive component explorer
└── documentation/     # Docusaurus documentation
```

### Development Commands

```bash
# Install dependencies (from monorepo root)
pnpm install

# Build all design system packages
pnpm ds:all:build

# Start all in development mode
pnpm ds:all:dev

# Run Storybook
pnpm ds:storybook:dev

# Run documentation site
pnpm ds:documentation:dev

# Lint all packages
pnpm ds:all:lint

# Format code
pnpm ds:all:prettier
```

### Building Individual Packages

```bash
# Build main component library
pnpm ds:main:build

# Build primitives
pnpm ds:primitives:build

# Build tokens
pnpm ds:tokens:build

# Build themes
pnpm ds:themes:build
```

## Design Principles

### Value-Based Primitives

Primitives use actual measurement values as keys for numeric scales; rhythm/optical scales use descriptive keys for readability:

```typescript
// ✅ Good: Clear and predictable
spacing[16]; // "16px"
timing[150]; // "150ms"
fontSize[24]; // "1.5rem"

// ❌ Avoid: Semantic names at primitive level
spacing.small;
timing.fast;
fontSize.large;
```

### Purpose-Driven Tokens

Tokens provide semantic meaning for design decisions:

```typescript
// ✅ Good: Purpose-driven names
spacing.lg; // Mapped from primitives.spacing[24]
timing.fast; // Mapped from primitives.timing[150]
fontSize.base; // Mapped from primitives.fontSize[16]

// ❌ Avoid: Hard-coded values in tokens
spacing.lg = '24px'; // Should map from primitives
```

### Component Composition

Components are built using tokens for consistency:

```tsx
// ✅ Good: Uses tokens
const Button = styled.button`
  padding: ${tokens.spacing.sm};
  font-size: ${tokens.fontSize.base};
`;

// ❌ Avoid: Hard-coded values or primitives
const Button = styled.button`
  padding: 8px; // Use tokens instead
  font-size: ${primitives.fontSize[16]}; // Use tokens instead
`;
```

## Accessibility

All components are built with accessibility in mind:

- **WCAG 2.1 AA Compliant** - Meets accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **ARIA Attributes** - Proper semantic markup
- **Focus Management** - Visible focus indicators
- **Screen Reader Support** - Meaningful announcements
- **Color Contrast** - Meets minimum 4.5:1 ratio

## Theming

### Using Built-in Themes

```tsx
// Import a pre-built theme
import '@grasdouble/lufa_design-system-themes/ocean.css';

import { Button } from '@grasdouble/lufa_design-system';

function App() {
  return <Button>Ocean Theme</Button>;
}
```

### Creating Custom Themes

```css
/* custom-theme.css */
:root {
  /* Override token values */
  --lufa-token-color-text-primary: #1a1a1a;
  --lufa-token-color-background-primary: #ffffff;
  --lufa-token-spacing-base: 16px;
}

[data-theme='dark'] {
  --lufa-token-color-text-primary: #ffffff;
  --lufa-token-color-background-primary: #1a1a1a;
}
```

## Resources

### Documentation

- **[Storybook](http://localhost:6006)** - Interactive component explorer
- **[Docusaurus](http://localhost:3000)** - Comprehensive documentation
- **[Contributing Guide](../../CONTRIBUTING.md)** - How to contribute

### Package Links

- [@grasdouble/lufa_design-system](./main) - Main component library
- [@grasdouble/lufa_design-system-tokens](./tokens) - Semantic tokens
- [@grasdouble/lufa_design-system-primitives](./primitives) - Foundational values
- [@grasdouble/lufa_design-system-themes](./themes) - Pre-built themes

### Community

- **Issues**: [GitHub Issues](https://github.com/grasdouble/Lufa/issues)
- **Discussions**: [GitHub Discussions](https://github.com/grasdouble/Lufa/discussions)

## Version Management

We use [Changesets](https://github.com/changesets/changesets) for version management. See the [changeset guide](../../docs/howto/How-to-use-changeset-in-Lufa.md) for details.

---

Built with ❤️ by the Lufa team

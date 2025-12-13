# Design System Tokens Architecture

> **Last Updated**: December 13, 2025  
> **Package**: `@grasdouble/lufa_design-system-tokens`  
> **Location**: `packages/design-system/tokens/`

## Overview

The Tokens package transforms raw primitives into semantic, purpose-driven values. While primitives define "what colors exist", tokens define "what colors mean" in the context of your application.

## Philosophy

**Semantic Abstraction**:

- Primitive: `--lufa-primitive-color-chromatic-blue-500` (raw blue)
- Token: `--lufa-token-color-interactive-primary` (button color)

This allows changing the entire theme by modifying token mappings without touching components.

## Package Architecture

```
packages/design-system/tokens/
├── src/
│   ├── tokens.ts           # Token definitions (JS objects)
│   ├── types.ts            # TypeScript type definitions
│   ├── index.ts            # Main export
│   └── tokens.css          # CSS custom properties (generated)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**Build Outputs**:

```
dist/
├── index.js                # ESM bundle
├── index.d.ts              # TypeScript declarations
└── tokens.css              # CSS variables
```

## Token Structure

### Dual Format

Tokens are exported in **two formats**:

**1. TypeScript/JavaScript**:

```typescript
export const colorTokens = {
  interactive: {
    primary: "var(--lufa-primitive-color-chromatic-blue-500)",
    "primary-hover": "var(--lufa-primitive-color-chromatic-blue-600)",
  },
};
```

**2. CSS Variables**:

```css
:root {
  --lufa-token-color-interactive-primary: var(
    --lufa-primitive-color-chromatic-blue-500
  );
  --lufa-token-color-interactive-primary-hover: var(
    --lufa-primitive-color-chromatic-blue-600
  );
}
```

### Token Categories

#### 1. Color Tokens

**Interactive Colors** (buttons, links, actions):

```typescript
interactive: {
  primary: "var(--lufa-primitive-color-chromatic-blue-500)",
  "primary-hover": "var(--lufa-primitive-color-chromatic-blue-600)",
  "primary-active": "var(--lufa-primitive-color-chromatic-blue-700)",
  "primary-disabled": "var(--lufa-primitive-color-achromatic-300)",
}
```

**Text Colors**:

```typescript
text: {
  primary: "var(--lufa-primitive-color-achromatic-900)",
  secondary: "var(--lufa-primitive-color-achromatic-600)",
  tertiary: "var(--lufa-primitive-color-achromatic-500)",
  inverse: "var(--lufa-primitive-color-achromatic-50)",
}
```

**Background Colors**:

```typescript
background: {
  primary: "var(--lufa-primitive-color-achromatic-50)",
  secondary: "var(--lufa-primitive-color-achromatic-100)",
  elevated: "var(--lufa-primitive-color-achromatic-0)",
}
```

**Status Colors**:

```typescript
status: {
  success: "var(--lufa-primitive-color-chromatic-green-500)",
  warning: "var(--lufa-primitive-color-chromatic-yellow-500)",
  error: "var(--lufa-primitive-color-chromatic-red-500)",
  info: "var(--lufa-primitive-color-chromatic-blue-500)",
}
```

#### 2. Typography Tokens

```typescript
typography: {
  h1: {
    fontSize: "var(--lufa-primitive-font-size-5xl)",
    fontWeight: "var(--lufa-primitive-font-weight-bold)",
    lineHeight: "var(--lufa-primitive-line-height-tight)",
  },
  body: {
    fontSize: "var(--lufa-primitive-font-size-base)",
    fontWeight: "var(--lufa-primitive-font-weight-normal)",
    lineHeight: "var(--lufa-primitive-line-height-normal)",
  },
}
```

#### 3. Spacing Tokens

```typescript
spacing: {
  xs: "var(--lufa-primitive-spacing-4)",
  sm: "var(--lufa-primitive-spacing-8)",
  md: "var(--lufa-primitive-spacing-16)",
  lg: "var(--lufa-primitive-spacing-24)",
  xl: "var(--lufa-primitive-spacing-32)",
}
```

#### 4. Layout Tokens

```typescript
layout: {
  containerWidth: "var(--lufa-primitive-breakpoint-xl)",
  gutter: "var(--lufa-primitive-spacing-16)",
  headerHeight: "var(--lufa-primitive-spacing-64)",
}
```

## Usage

### In TypeScript/React

```typescript
import {
  colorTokens,
  typographyTokens,
} from "@grasdouble/lufa_design-system-tokens";

const buttonStyle = {
  color: colorTokens.interactive.primary,
  fontSize: typographyTokens.body.fontSize,
};
```

### In Tailwind Configuration

Tokens are mapped to Tailwind utilities:

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "interactive-primary": "var(--lufa-token-color-interactive-primary)",
        "text-primary": "var(--lufa-token-color-text-primary)",
      },
    },
  },
};
```

Usage in components:

```tsx
<Button className="bg-interactive-primary text-white" />
```

### In CSS

```css
@import "@grasdouble/lufa_design-system-tokens/tokens.css";

.button {
  background: var(--lufa-token-color-interactive-primary);
  color: var(--lufa-token-color-text-inverse);
}
```

## Relationship with Primitives

```
┌─────────────────────────────────────────────────┐
│             Primitives Package                  │
│  (Raw values: colors, spacing, typography)      │
└────────────────┬────────────────────────────────┘
                 ↓ imports
┌─────────────────────────────────────────────────┐
│               Tokens Package                    │
│  (Semantic mapping: primary, success, etc.)     │
└────────────────┬────────────────────────────────┘
                 ↓ consumed by
┌─────────────────────────────────────────────────┐
│           Tailwind Configuration                │
│        (Utility classes generation)             │
└────────────────┬────────────────────────────────┘
                 ↓ used in
┌─────────────────────────────────────────────────┐
│              Components                         │
│     (className="bg-interactive-primary")        │
└─────────────────────────────────────────────────┘
```

## Type Safety

```typescript
// types.ts
export interface ColorTokens {
  interactive: {
    primary: string;
    "primary-hover": string;
    "primary-active": string;
  };
  text: {
    primary: string;
    secondary: string;
  };
}

export interface TypographyTokens {
  h1: {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };
}
```

Benefits:

- **Autocomplete** in IDEs
- **Type checking** prevents typos
- **Documentation** via types

## Build Process

```bash
cd packages/design-system/tokens
pnpm build
```

Vite bundles:

1. TypeScript → JavaScript (ESM)
2. Type declarations
3. CSS custom properties

## Dependencies

**Imports**:

- `@grasdouble/lufa_design-system-primitives` (required)

**Imported By**:

- `@grasdouble/lufa_design-system` (main package)
- Tailwind configuration
- Component libraries

## Design Decisions

### Why Both JS and CSS?

**JavaScript Export**:

- Type safety in TypeScript
- Dynamic theming logic
- IDE autocomplete

**CSS Export**:

- Direct use in stylesheets
- Framework agnostic
- Standard CSS custom properties

### Token Naming

**Format**: `--lufa-token-{category}-{subcategory}-{variant?}`

**Examples**:

- `--lufa-token-color-interactive-primary`
- `--lufa-token-spacing-md`
- `--lufa-token-typography-h1-fontSize`

**Rules**:

- Semantic, not descriptive (`primary` not `blue`)
- Hierarchical structure
- Consistent casing (kebab-case)

### Theming Strategy

Change theme by remapping tokens:

```css
/* Light theme (default) */
:root {
  --lufa-token-color-text-primary: var(--lufa-primitive-color-achromatic-900);
  --lufa-token-color-background-primary: var(
    --lufa-primitive-color-achromatic-50
  );
}

/* Dark theme */
[data-theme="dark"] {
  --lufa-token-color-text-primary: var(--lufa-primitive-color-achromatic-50);
  --lufa-token-color-background-primary: var(
    --lufa-primitive-color-achromatic-900
  );
}
```

Components automatically adapt without changes.

## Related Documentation

- **Development Rules**: [`rules/design-system/TOKENS.md`](../../rules/design-system/TOKENS.md)
- **Primitives Architecture**: [`PRIMITIVES.md`](./PRIMITIVES.md)
- **Design System Overview**: [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)

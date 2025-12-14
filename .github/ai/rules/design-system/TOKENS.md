# Design System Tokens - Development Rules

> **Package**: `@grasdouble/lufa_design-system-tokens`  
> **Location**: `packages/design-system/tokens/`  
> **Last Updated**: December 13, 2025

## Overview

Tokens provide semantic meaning to primitives. They are TypeScript-based and export both TS objects and CSS variables.

## 📦 Package Structure

```
packages/design-system/tokens/
├── src/
│   ├── tokens.ts           # Main token definitions
│   ├── types.ts           # TypeScript types
│   └── index.ts           # Exports
├── package.json
└── tsconfig.json
```

## 🏷️ Token Categories

### Color Tokens

**Semantic color tokens**: Reference primitives with meaning

```typescript
export const colorTokens = {
  interactive: {
    primary: "var(--lufa-primitive-color-chromatic-blue-500)",
    "primary-hover": "var(--lufa-primitive-color-chromatic-blue-600)",
  },
  text: {
    primary: "var(--lufa-primitive-color-achromatic-900)",
    secondary: "var(--lufa-primitive-color-achromatic-600)",
  },
  error: {
    default: "var(--lufa-primitive-color-chromatic-red-500)",
  },
};
```

### Typography Tokens

```typescript
export const typographyTokens = {
  h1: {
    fontSize: "var(--lufa-primitive-font-size-5xl)",
    fontWeight: "var(--lufa-primitive-font-weight-bold)",
    lineHeight: "var(--lufa-primitive-line-height-tight)",
  },
};
```

### Spacing Tokens

```typescript
export const spacingTokens = {
  sm: "var(--lufa-primitive-spacing-8)",
  md: "var(--lufa-primitive-spacing-16)",
  lg: "var(--lufa-primitive-spacing-24)",
};
```

## ✏️ Adding New Tokens

### 1. Define in tokens.ts

```typescript
export const newTokenCategory = {
  tokenName: "var(--lufa-primitive-{category}-{value})",
};
```

### 2. Export in index.ts

```typescript
export { newTokenCategory } from "./tokens";
```

### 3. Add TypeScript Types

```typescript
export type TokenCategory = typeof newTokenCategory;
```

### 4. Build

```bash
cd packages/design-system/tokens
pnpm build
```

## 🔗 Usage

### In TypeScript

```typescript
import { colorTokens } from "@grasdouble/lufa_design-system-tokens";

const primaryColor = colorTokens.interactive.primary;
```

### In CSS (via Main Package)

```css
.button {
  background-color: var(--lufa-token-interactive-primary);
}
```

## 📚 Related Documentation

- **Primitives**: [`PRIMITIVES.md`](PRIMITIVES.md)
- **Main Package**: [`MAIN.md`](MAIN.md)

---

**Last Updated**: December 13, 2025

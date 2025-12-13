# Design System Primitives Architecture

> **Last Updated**: December 13, 2025  
> **Package**: `@grasdouble/lufa_design-system-primitives`  
> **Location**: `packages/design-system/primitives/`

## Overview

The Primitives package contains foundational CSS variables that form the base layer of the Lufa Design System. These are raw values without semantic meaning - think of them as a color palette or ruler before deciding what each color or measurement represents.

## Philosophy

**Primitives vs Tokens**:

- **Primitives**: Raw values (`--lufa-primitive-color-chromatic-blue-500: #3b82f6`)
- **Tokens**: Semantic meaning (`--lufa-token-color-interactive-primary: var(--lufa-primitive-color-chromatic-blue-500)`)

This separation allows:

1. **Consistency**: All values defined in one place
2. **Flexibility**: Change semantic meaning without touching primitives
3. **Scalability**: Add new primitives without affecting tokens
4. **Maintainability**: Clear separation of concerns

## Package Architecture

```
packages/design-system/primitives/
├── src/
│   └── primitives.css      # Single CSS file with all primitives
├── package.json            # Published to GitHub Packages
├── vite.config.ts          # Build configuration
└── README.md
```

**Build Output**:

```
dist/
├── primitives.css          # Bundled CSS variables
└── primitives.css.map      # Source map
```

## Primitive Categories

### 1. Color Primitives

**Chromatic Colors**: `--lufa-primitive-color-chromatic-{color}-{shade}`

Shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

**Available Colors**:

- blue, red, green, yellow, purple, pink, orange, teal, cyan, indigo

**Example**:

```css
:root {
  --lufa-primitive-color-chromatic-blue-50: #eff6ff;
  --lufa-primitive-color-chromatic-blue-500: #3b82f6;
  --lufa-primitive-color-chromatic-blue-900: #1e3a8a;
}
```

**Achromatic Colors**: `--lufa-primitive-color-achromatic-{shade}`

Grayscale from white (50) to black (950)

### 2. Typography Primitives

**Font Families**:

```css
--lufa-primitive-font-family-sans: system-ui, -apple-system, sans-serif;
--lufa-primitive-font-family-mono: "Courier New", monospace;
```

**Font Sizes** (`--lufa-primitive-font-size-{size}`):

- xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl

**Font Weights** (`--lufa-primitive-font-weight-{weight}`):

- thin, light, normal, medium, semibold, bold, extrabold, black

**Line Heights** (`--lufa-primitive-line-height-{size}`):

- tight, normal, relaxed, loose

### 3. Spacing Primitives

**Format**: `--lufa-primitive-spacing-{value}`

Values: 0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128

**Example**:

```css
--lufa-primitive-spacing-0: 0;
--lufa-primitive-spacing-16: 1rem; /* 16px */
--lufa-primitive-spacing-64: 4rem; /* 64px */
```

### 4. Shadow Primitives

**Format**: `--lufa-primitive-shadow-{size}`

Sizes: sm, md, lg, xl, 2xl

**Example**:

```css
--lufa-primitive-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--lufa-primitive-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

### 5. Breakpoint Primitives

**Format**: `--lufa-primitive-breakpoint-{size}`

```css
--lufa-primitive-breakpoint-sm: 640px;
--lufa-primitive-breakpoint-md: 768px;
--lufa-primitive-breakpoint-lg: 1024px;
--lufa-primitive-breakpoint-xl: 1280px;
--lufa-primitive-breakpoint-2xl: 1536px;
```

## Usage

### In Tokens Package

```typescript
// packages/design-system/tokens/src/tokens.ts
export const colorTokens = {
  interactive: {
    primary: "var(--lufa-primitive-color-chromatic-blue-500)",
  },
};
```

### In Components

Components should **NOT** use primitives directly. Always use tokens:

```tsx
// ❌ DON'T
<Button style={{ color: 'var(--lufa-primitive-color-chromatic-blue-500)' }} />

// ✅ DO
<Button className="text-interactive-primary" />
// Uses token: --lufa-token-color-interactive-primary
```

### In Tailwind Config

Primitives are mapped to Tailwind utilities via tokens.

## Relationship with Tokens

```
Primitives (Raw Values)
         ↓
    Tokens (Semantic)
         ↓
   Tailwind Utilities
         ↓
     Components
```

**Example Flow**:

1. Primitive: `--lufa-primitive-color-chromatic-blue-500: #3b82f6`
2. Token: `--lufa-token-color-interactive-primary: var(--lufa-primitive-color-chromatic-blue-500)`
3. Tailwind: `text-interactive-primary` → `color: var(--lufa-token-color-interactive-primary)`
4. Component: `<Button className="text-interactive-primary">Click</Button>`

## Build Process

```bash
cd packages/design-system/primitives
pnpm build
```

**Output**: Bundled CSS file with all variables published to GitHub Packages

## Dependencies

- **Consumed by**: `@grasdouble/lufa_design-system-tokens`
- **Consumed by**: `@grasdouble/lufa_design-system` (main package)
- **Build tool**: Vite

## Design Decisions

### Why CSS Variables?

1. **Runtime theming**: Can be changed dynamically
2. **Browser support**: Widely supported
3. **Performance**: No JavaScript overhead
4. **Flexibility**: Works with any CSS approach

### Why Separate Package?

1. **Modularity**: Can be updated independently
2. **Reusability**: Can be consumed by non-React projects
3. **Performance**: Import only what you need
4. **Versioning**: Independent semantic versioning

### Naming Convention

**Format**: `--lufa-primitive-{category}-{subcategory?}-{value}`

**Rules**:

- Prefix: Always `--lufa-primitive-`
- Case: lowercase kebab-case
- Descriptive: Full words, no abbreviations
- Hierarchical: Category → Subcategory → Value

**Examples**:

- ✅ `--lufa-primitive-color-chromatic-blue-500`
- ✅ `--lufa-primitive-spacing-16`
- ✅ `--lufa-primitive-font-family-sans`
- ❌ `--blue` (no prefix, not namespaced)
- ❌ `--lufa-prim-col-b-5` (abbreviated)

## Related Documentation

- **Development Rules**: [`rules/design-system/PRIMITIVES.md`](../../rules/design-system/PRIMITIVES.md)
- **Tokens Architecture**: [`TOKENS.md`](./TOKENS.md)
- **CSS Architecture**: [`CSS.md`](./CSS.md)

# Design System Primitives - Development Rules

> **Package**: `@grasdouble/lufa_design-system-primitives`  
> **Location**: `packages/design-system/primitives/`  
> **Last Updated**: December 13, 2025

## Overview

CSS primitives are the foundational CSS variables that serve as the base layer for the design system. They define raw values without semantic meaning.

## 📦 Package Structure

```
packages/design-system/primitives/
├── src/
│   └── primitives.css      # All CSS variables
├── package.json
└── vite.config.ts
```

## 🎨 Primitive Categories

### Color Primitives

**Chromatic Colors**: `--lufa-primitive-color-chromatic-{color}-{shade}`

```css
--lufa-primitive-color-chromatic-blue-50: #eff6ff;
--lufa-primitive-color-chromatic-blue-500: #3b82f6;
--lufa-primitive-color-chromatic-blue-900: #1e3a8a;
```

**Achromatic Colors**: `--lufa-primitive-color-achromatic-{shade}`

```css
--lufa-primitive-color-achromatic-50: #fafafa;
--lufa-primitive-color-achromatic-500: #737373;
--lufa-primitive-color-achromatic-950: #0a0a0a;
```

### Typography Primitives

**Font Family**: `--lufa-primitive-font-family-{type}`
**Font Size**: `--lufa-primitive-font-size-{size}`
**Font Weight**: `--lufa-primitive-font-weight-{weight}`
**Line Height**: `--lufa-primitive-line-height-{size}`

### Spacing Primitives

`--lufa-primitive-spacing-{size}`: Values in px/rem

### Shadow Primitives

`--lufa-primitive-shadow-{size}`: Box shadow definitions

### Breakpoint Primitives

`--lufa-primitive-breakpoint-{size}`: Media query breakpoints

## ✏️ Adding New Primitives

### 1. Define in primitives.css

```css
:root {
  /* Color primitives */
  --lufa-primitive-color-chromatic-purple-500: #a855f7;

  /* Typography primitives */
  --lufa-primitive-font-size-2xl: 1.5rem;

  /* Spacing primitives */
  --lufa-primitive-spacing-48: 3rem;
}
```

### 2. Naming Convention

**Format**: `--lufa-primitive-{category}-{subcategory}-{value}`

**Rules**:

- Always prefix with `--lufa-primitive-`
- Use lowercase kebab-case
- Be specific and descriptive
- Avoid abbreviations

**Examples**:

- ✅ `--lufa-primitive-color-chromatic-blue-500`
- ✅ `--lufa-primitive-spacing-16`
- ❌ `--blue` (too generic)
- ❌ `--lufa-prim-col-blu-5` (abbreviated)

### 3. Build and Test

```bash
cd packages/design-system/primitives
pnpm build
```

**Output**: `dist/primitives.css`

### 4. Consumed by Main Package

Primitives are automatically imported by `main/src/tailwind.css`:

```css
@import '@grasdouble/lufa_design-system-primitives/dist/primitives.css';
```

## 🔗 Usage in Tokens

Primitives are referenced by semantic tokens:

```typescript
// packages/design-system/tokens/src/tokens.ts
export const tokens = {
  color: {
    primary: 'var(--lufa-primitive-color-chromatic-blue-500)',
    text: 'var(--lufa-primitive-color-achromatic-900)',
  },
};
```

## ⚠️ Important Rules

### DO ✅

- Use descriptive, specific names
- Follow naming convention strictly
- Group related primitives together
- Document purpose in comments
- Build and test after changes

### DON'T ❌

- Add semantic meaning (that's for tokens)
- Use abbreviations
- Skip the build step
- Change existing primitive names (breaking change)
- Add application-specific values

## 🔄 Modification Impact

Changing primitives affects:

- Tokens package (references primitives)
- Main package (bundles primitives)
- All components using those primitives

**Always**: Rebuild main package after primitive changes

## 📚 Related Documentation

- **Tokens**: [`TOKENS.md`](TOKENS.md)
- **Main Package**: [`MAIN.md`](MAIN.md)
- **Design System Architecture**: [`../../architecture/DESIGN_SYSTEM.md`](../../architecture/DESIGN_SYSTEM.md)

---

**Last Updated**: December 13, 2025

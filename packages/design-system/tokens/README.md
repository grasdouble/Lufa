[← Back to Design System Overview](../README.md)

# Lufa Design System - Tokens v2.0

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> **Phase 2 Complete** - Core Tokens (Global Design Decisions)

## 📦 Overview

This package contains the **design tokens** of Lufa Design System v2.0 - a 4-level token architecture built with Style Dictionary v4.4.0 and DTCG format.

**Current Status:** 161 tokens across 2 levels (45% complete)

**Token Architecture:**

```
┌─────────────────────────────────────────────┐
│  Level 4: Component Tokens (Phase 4)       │ ⬅️ ~120 tokens (future)
├─────────────────────────────────────────────┤
│  Level 3: Semantic Tokens (Phase 3)        │ ⬅️ ~80 tokens (next)
├─────────────────────────────────────────────┤
│  ✅ Level 2: Core Tokens (Phase 2)         │ ⬅️ 58 tokens (COMPLETE)
├─────────────────────────────────────────────┤
│  ✅ Level 1: Primitive Tokens (Phase 1)    │ ⬅️ 103 tokens (COMPLETE)
└─────────────────────────────────────────────┘
```

## 📊 Package Contents

**161 tokens created** distributed across multiple levels:

### Level 1: Primitive Tokens (103 tokens)

| Category       | Tokens  | Description                                                           |
| -------------- | ------- | --------------------------------------------------------------------- |
| **Colors**     | 60      | 6 color palettes × 10 shades (gray, blue, red, green, yellow, purple) |
| **Spacing**    | 12      | Scale from 0px to 96px (4px base)                                     |
| **Typography** | 18      | Families (2), sizes (9), weights (4), line-heights (3)                |
| **Shadows**    | 6       | Elevations from none to xl                                            |
| **Radius**     | 7       | Rounding from none to full (circle)                                   |
| **Subtotal**   | **103** | Raw, non-semantic foundational values                                 |

### Level 2: Core Tokens (58 tokens)

| Category       | Tokens | Description                                                    |
| -------------- | ------ | -------------------------------------------------------------- |
| **Brand**      | 6      | Primary/secondary colors with hover/active states              |
| **Neutral**    | 9      | Backgrounds, surfaces, borders, text hierarchy                 |
| **Semantic**   | 16     | Success, error, warning, info (base + subtle + border + hover) |
| **Layout**     | 8      | Page padding, section gaps, container widths                   |
| **Component**  | 10     | Button, input, card, modal spacing standards                   |
| **Typography** | 9      | Font families, weights, sizes for common use cases             |
| **Subtotal**   | **58** | Global design decisions, alias to primitives                   |

### Total

| Level          | Tokens  | Status           |
| -------------- | ------- | ---------------- |
| **Primitives** | 103     | ✅ Complete      |
| **Core**       | 58      | ✅ Complete      |
| **TOTAL**      | **161** | **45% Complete** |

## 🚀 Installation

```bash
# In the monorepo
pnpm --filter @grasdouble/lufa_design-system-tokens install

# Build tokens
cd packages/design-system/tokens
pnpm build
```

## 📁 Package Structure

```
packages/design-system/tokens/
├── src/
│   └── primitives/
│       ├── index.json                        # Main entry point
│       ├── color/
│       │   └── palette.json                  # 60 tokens (gray, blue, red, green, yellow, purple)
│       ├── spacing/
│       │   └── scale.json                    # 12 tokens (0-96px)
│       ├── typography/
│       │   ├── font-families.json            # 2 tokens (sans, mono)
│       │   ├── font-sizes.json               # 9 tokens (xs-5xl)
│       │   ├── font-weights.json             # 4 tokens (normal-bold)
│       │   └── line-heights.json             # 3 tokens (tight, normal, relaxed)
│       ├── shadow/
│       │   └── elevation.json                # 6 tokens (none-xl)
│       └── radius/
│           └── scale.json                    # 7 tokens (none-full)
├── dist/
│   ├── tokens.css                            # CSS Custom Properties (103 variables)
│   ├── tokens.ts                             # TypeScript exports
│   └── tokens-docs.json                      # Documentation JSON
├── style-dictionary.config.js                # Style Dictionary configuration
└── README.md                                 # This file
```

## 🎨 Token Categories

### 1. Colors (60 tokens)

**6 color palettes** with 9 shades each (50-900):

- **Gray**: Neutrals (backgrounds, text, borders)
- **Blue**: Information, primary
- **Red**: Errors, alerts
- **Green**: Success, validation
- **Yellow**: Warnings
- **Purple**: Accent, creativity

**CSS Naming:**

```css
--lufa-primitive-color-{color}-{shade}
/* Examples: */
--lufa-primitive-color-gray-500
--lufa-primitive-color-blue-600
--lufa-primitive-color-red-50
```

**TypeScript Usage:**

```typescript
import { LufaPrimitiveColorBlue600, LufaPrimitiveColorGray500 } from '@grasdouble/lufa_design-system-tokens';

LufaPrimitiveColorGray500; // "#6b7280"
LufaPrimitiveColorBlue600; // "#2563eb"
```

### 2. Spacing (12 tokens)

**4px-based scale** for consistent spacing:

```
0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 (px)
```

**CSS Naming:**

```css
--lufa-primitive-spacing-{value}
/* Examples: */
--lufa-primitive-spacing-0    /* 0px */
--lufa-primitive-spacing-16   /* 16px */
--lufa-primitive-spacing-64   /* 64px */
```

### 3. Typography (18 tokens)

#### 3.1 Font Families (2 tokens)

- `sans`: System default (0kb download)
- `mono`: System monospace (0kb download)

#### 3.2 Font Sizes (9 tokens)

```
xs: 12px, sm: 14px, base: 16px, lg: 18px, xl: 20px,
2xl: 24px, 3xl: 30px, 4xl: 36px, 5xl: 48px
```

#### 3.3 Font Weights (4 tokens)

```
normal: 400, medium: 500, semibold: 600, bold: 700
```

#### 3.4 Line Heights (3 tokens)

```
tight: 1.25, normal: 1.5, relaxed: 1.75
```

**CSS Naming:**

```css
--lufa-primitive-typography-font-family-sans
--lufa-primitive-typography-font-size-base     /* 16px */
--lufa-primitive-typography-font-weight-semibold  /* 600 */
--lufa-primitive-typography-line-height-normal /* 1.5 */
```

### 4. Shadows (6 tokens)

**6 elevation levels** (none, sm, base, md, lg, xl):

```css
--lufa-primitive-shadow-elevation-none    /* No shadow */
--lufa-primitive-shadow-elevation-sm      /* Elevation 1 */
--lufa-primitive-shadow-elevation-base    /* Elevation 2 */
--lufa-primitive-shadow-elevation-md      /* Elevation 3 */
--lufa-primitive-shadow-elevation-lg      /* Elevation 4 */
--lufa-primitive-shadow-elevation-xl      /* Elevation 5 */
```

**Usage Examples:**

- `sm`: Light cards, badges
- `base`: Standard cards
- `md`: Dropdowns, popovers
- `lg`: Modals, sidebars
- `xl`: Floating elements, notifications

### 5. Radius (7 tokens)

**7 rounding levels** (none → full):

```css
--lufa-primitive-radius-scale-none    /* 0px - sharp corners */
--lufa-primitive-radius-scale-sm      /* 2px */
--lufa-primitive-radius-scale-base    /* 4px - standard */
--lufa-primitive-radius-scale-md      /* 6px */
--lufa-primitive-radius-scale-lg      /* 8px */
--lufa-primitive-radius-scale-xl      /* 12px */
--lufa-primitive-radius-scale-full    /* 9999px - circle */
```

## 🛠️ Usage

### ⚠️ Important: Do Not Use JS/TS Exports in React Components

**The JS/TS exports are ONLY for documentation purposes** (Storybook stories, design token viewers, tests).

**❌ DO NOT use JS/TS exports in React components:**

```typescript
// ❌ BAD - Not themable, hardcoded value
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';

export const Button = () => (
  <button style={{ color: LufaPrimitiveColorBlue600 }}>Click me</button>
);
```

**✅ ALWAYS use CSS Modules with CSS custom properties:**

```typescript
// ✅ GOOD - Themable via CSS variables
import styles from './Button.module.css';

export const Button = () => <button className={styles.button}>Click me</button>;
```

```css
/* Button.module.css */
.button {
  color: var(--lufa-primitive-color-blue-600); /* Themable! */
}
```

**Why?**

1. 🎨 **Theming** - CSS variables can be overridden by themes
2. 🏗️ **Architecture** - Components should only use their own CSS Modules
3. 🔄 **Runtime flexibility** - CSS variables support dynamic theme switching
4. ⚡ **Performance** - No JS execution needed for styling

**Legitimate use cases for JS/TS exports:**

- ✅ Storybook stories (displaying token values)
- ✅ Design token documentation
- ✅ Tests (verifying token values)
- ✅ Build scripts and tooling

---

### In CSS (Recommended)

```css
/* Import generated file */
@import '@grasdouble/lufa_design-system-tokens/dist/tokens.css';

/* Use CSS Custom Properties */
.my-component {
  color: var(--lufa-primitive-color-blue-600);
  padding: var(--lufa-primitive-spacing-16);
  font-size: var(--lufa-primitive-typography-font-size-base);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  border-radius: var(--lufa-primitive-radius-scale-base);
  box-shadow: var(--lufa-primitive-shadow-elevation-base);
}
```

### In TypeScript/JavaScript (Documentation Only)

> **⚠️ WARNING:** Do not use these exports in React components. See warning above.

```typescript
import {
  LufaPrimitiveColorBlue600,
  LufaPrimitiveRadiusScaleBase,
  LufaPrimitiveShadowElevationBase,
  LufaPrimitiveSpacing16,
  LufaPrimitiveTypographyFontSizeBase,
  LufaPrimitiveTypographyFontWeightSemibold,
} from '@grasdouble/lufa_design-system-tokens';

// Use in styles object (Storybook documentation only)
const styles = {
  color: LufaPrimitiveColorBlue600,
  padding: LufaPrimitiveSpacing16,
  fontSize: LufaPrimitiveTypographyFontSizeBase,
  fontWeight: LufaPrimitiveTypographyFontWeightSemibold,
  borderRadius: LufaPrimitiveRadiusScaleBase,
  boxShadow: LufaPrimitiveShadowElevationBase,
};
```

### In Storybook (Documentation Only)

> **⚠️ WARNING:** Do not use these exports in React components. See warning above.

```typescript
import { LufaPrimitiveColorBlue500 } from '@grasdouble/lufa_design-system-tokens';

export default {
  title: 'Foundations/Colors',
  parameters: {
    design: {
      token: LufaPrimitiveColorBlue500,
    },
  },
};
```

## 🔨 Development

### Build

```bash
# Build tokens
pnpm build

# Build in watch mode
pnpm build:watch
```

### Validation

```bash
# Validate token metadata
pnpm validate
```

### Token Structure

All tokens follow the **DTCG (Design Tokens Community Group)** format:

```json
{
  "token-name": {
    "$value": "...",
    "$type": "color|dimension|fontFamily|fontWeight|number|shadow",
    "$description": "English description",
    "metadata": {
      "level": "primitive",
      "category": "color|spacing|typography|shadow|radius",
      "useCase": "Use case description"
      // ... other specific metadata
    }
  }
}
```

## 📐 Design Principles

### 1. Non-Semantic

Primitive tokens are **intentionally non-semantic**:

- ✅ `color-blue-500` (raw value)
- ❌ `color-primary` (semantic - level 2+)

### 2. Industry Standards

Using industry-standard references:

- **Colors**: Inspired by Tailwind CSS
- **Spacing**: 4px base (Material Design standard)
- **Typography**: Clear modular scale

### 3. Accessibility

Metadata includes:

- WCAG contrast ratios for colors
- Line-height recommendations (WCAG 1.5 minimum)
- Documented use cases

## 🔄 Next Steps

### Phase 2 - Core Tokens (Coming Soon)

Create **Core Tokens** that reference primitives:

```json
{
  "color": {
    "brand": {
      "primary": { "$value": "{primitive.color.blue.600}" }
    }
  }
}
```

### Phase 3 - Semantic Tokens (Coming Soon)

Contextual tokens for components:

```json
{
  "button": {
    "primary": {
      "background": { "$value": "{core.color.brand.primary}" }
    }
  }
}
```

### Phase 4 - Component Tokens (Coming Soon)

Component-specific React tokens.

## 📚 Complete Documentation

- **Execution Plan**: `docs/planning/phase-1-semaine-1-execution-plan.md`
- **AGENTS.md**: Complete guide for developers and AI agents
- **CLAUDE.md**: Quick reference for Claude Code

## 🤝 Contributing

To contribute to tokens:

1. Modify JSON files in `src/primitives/`
2. Follow DTCG format
3. Include complete metadata
4. Test build: `pnpm build`
5. Validate: `pnpm validate`
6. Create changeset: `pnpm changeset`

## 📄 License

Proprietary - Lufa Design System v2.0

---

**Version**: 2.0.0-alpha.1  
**Date**: January 2026  
**Status**: ✅ Phase 1 Complete

# @grasdouble/lufa_design-system-primitives

Non-semantic design primitives for the Lufa Design System (palette, typography, spacing, motion, etc.).

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-primitives
```

## Philosophy

Primitives use **pure numeric scales** (0-9) for consistent token values. They are intentionally non-semantic—use `@grasdouble/lufa_design-system-tokens` for semantic names like `sm`, `md`, `lg`.

## How to consume

### TypeScript / JavaScript

```ts
import {
  primitives,
  colors,
  spacing,
  borders,
  typography,
} from "@grasdouble/lufa_design-system-primitives";
import type {
  PrimitiveColor,
  PrimitiveShade,
} from "@grasdouble/lufa_design-system-primitives";

// Color palettes with numeric shades
const primaryBlue = colors.blue[600]; // '#2563EB'

// Numeric spacing scale
const gapMd = spacing[5]; // '16px'

// Numeric border widths
const focusBorder = borders.width[3]; // '3px'

// Typography with numeric scales
const bodySize = typography.fontSize[2]; // '16px'
const normalWeight = typography.fontWeight[3]; // 400
const baseLineHeight = typography.lineHeight[3]; // 1.5

// Type narrowing
type ColorName = PrimitiveColor; // 'neutral' | 'blue' | 'green' | ...
type Shade = PrimitiveShade; // 0 | 50 | 100 | ... | 950 | 1000
```

### CSS (custom properties)

```css
@import "@grasdouble/lufa_design-system-tokens/styles.css";

.my-element {
  /* Colors: --lufa-primitive-{color}-{shade} */
  color: var(--lufa-primitive-blue-600);
  background: var(--lufa-primitive-neutral-50);

  /* Spacing: --lufa-primitive-spacing-{0-9} */
  padding: var(--lufa-primitive-spacing-5);
  gap: var(--lufa-primitive-spacing-3);

  /* Borders: --lufa-primitive-borders-width-{0-4} */
  border-width: var(--lufa-primitive-borders-width-2);

  /* Typography: --lufa-primitive-typography-font-size-{0-8} */
  font-size: var(--lufa-primitive-typography-font-size-2);
  font-weight: var(--lufa-primitive-typography-font-weight-3);
  line-height: var(--lufa-primitive-typography-line-height-3);
}
```

## Primitive categories

All primitives use **numeric scales** for consistency:

### Colors (0-1000 neutral, 50-950 chromatic)

- **Palettes**: neutral, blue, green, orange, red, purple, teal, yellow, pink, indigo
- **WCAG guidance**: Shades 50-300 (AAA on dark), 400-500 (AA large text), 600+ (AA normal text), 700+ (AAA)
- **Scale**: neutral[0-1000], chromatic[50-950]

### Typography (numeric scales)

- **fontSize**: 0-8 (12px → 64px)
- **fontWeight**: 0-8 (100 → 900)
- **lineHeight**: 0-5 (1.0 → 1.8)
- **letterSpacing**: 0-5 (-0.02em → 0.08em)
- **fontFamily**: sans, serif, mono

### Spacing (0-9)

- **Scale**: 0px, 2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Rhythm**: 4px/8px based
- **Touch targets**: spacing[7-8] for comfortable touch areas

### Sizes (0-9)

- **Scale**: 0-9 (0px → 192px)
- **Touch target**: sizes[4] = 44px (WCAG minimum)

### Borders (numeric width scale)

- **width**: 0-4 (0px → 4px)
- **Focus**: width[2-3] meet WCAG 2.4.7 (2px minimum)
- **style**: solid, dashed

### Radius (0-9)

- **Scale**: 0-9 (0px → 9999px for pills)

### Shadows (0-6)

- **Scale**: 0-6 (none → large elevation)
- **WCAG**: Not sole visual indicator (1.4.1)

### Opacity (0-100)

- **Scale**: 0, 10, 25, 50, 75, 90, 100
- **Warning**: < 90 may violate WCAG contrast on text

### Timing (0-5)

- **Scale**: 0-5 (0ms → 600ms)
- **Range**: 100-600ms for interactions

### Z-Index (0-9)

- **Scale**: 0, 10, 20, 30, 40, 50, 100, 500, 900, 9999
- **Ladder**: Controlled stacking order

### Easing

- **Types**: easeIn, easeOut, easeInOut, gentle
- **Values**: cubic-bezier curves

### Breakpoints

- **Scale**: xs (480px), sm (768px), md (1024px), lg (1280px), xl (1440px), 2xl (1920px)

## Build

```bash
pnpm --filter @grasdouble/lufa_design-system-primitives build
```

Build compiles TypeScript and regenerates `dist/primitives.css` via `scripts/generate-css.js`.

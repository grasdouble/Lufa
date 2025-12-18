# @grasdouble/lufa_design-system-primitives

Non-semantic design primitives for the Lufa Design System. Raw foundational values using pixel/millisecond values as keys for clarity and precision.

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-primitives
```

## Philosophy

Primitives use **actual values as keys** (e.g., `spacing[16]`, `timing[150]`, `fontSize[24]`) for maximum clarity and predictability. They are intentionally non-semantic—use `@grasdouble/lufa_design-system-tokens` for semantic names like `compact`, `default`, `large`.

## Usage

### TypeScript/JavaScript

```typescript
import {
  borderWidth,
  fontSize,
  fontWeight,
  iconSize,
  iconStroke,
  maxWidth,
  radius,
  shadow,
  spacing,
  timing,
} from '@grasdouble/lufa_design-system-primitives';

// Spacing uses pixel values as keys
const padding = spacing[16]; // "16px"
const margin = spacing[24]; // "24px"
const gap = spacing[72]; // "72px"

// Timing uses millisecond values as keys
const transition = timing[150]; // "150ms"
const animation = timing[400]; // "400ms"

// Border widths use pixel values
const border = borderWidth[1]; // "1px"
const focusBorder = borderWidth[3]; // "3px"

// Typography uses pixel/numeric values
const body = fontSize[16]; // "1rem" (16px)
const heading = fontSize[24]; // "1.5rem" (24px)
const bold = fontWeight[700]; // 700

// Icons use pixel sizes
const iconSmall = iconSize[16]; // 16
const iconDefault = iconSize[24]; // 24
const iconStrokeDefault = iconStroke['1-5']; // 1.5

// Layout uses pixel values (in rem)
const containerWidth = maxWidth[768]; // "48rem"
const modalWidth = maxWidth[600]; // "37.5rem"
```

### CSS Custom Properties

```css
@import '@grasdouble/lufa_design-system-primitives/style.css';

.my-element {
  /* Spacing: --lufa-primitive-spacing-{pixels} */
  padding: var(--lufa-primitive-spacing-16);
  margin: var(--lufa-primitive-spacing-24);
  gap: var(--lufa-primitive-spacing-8);

  /* Timing: --lufa-primitive-timing-{milliseconds} */
  transition-duration: var(--lufa-primitive-timing-150);

  /* Border: --lufa-primitive-border-width-{pixels} */
  border-width: var(--lufa-primitive-border-width-1);

  /* Typography: --lufa-primitive-font-size-{pixels} */
  font-size: var(--lufa-primitive-font-size-16);
  font-weight: var(--lufa-primitive-font-weight-700);

  /* Layout: --lufa-primitive-max-width-{pixels} */
  max-width: var(--lufa-primitive-max-width-768);

  /* Radius: --lufa-primitive-radius-{pixels} */
  border-radius: var(--lufa-primitive-radius-8);

  /* Icons: --lufa-primitive-icon-size-{pixels} */
  width: var(--lufa-primitive-icon-size-24);
  height: var(--lufa-primitive-icon-size-24);
}
```

## Primitive Categories

### 🎨 **Border** (17 tokens)

- **borderWidth** (6) - `0`, `1`, `2`, `3`, `4`, `8` (pixels)
- **borderStyle** (5) - `solid`, `dashed`, `dotted`, `double`, `none`
- **radius** (10) - `0`, `2`, `4`, `6`, `8`, `12`, `16`, `24`, `32`, `9999` (pixels)

### 🌈 **Color** (246 tokens)

- **chromatic** (187) - 11 color palettes × 17 shades each
  - Palettes: `blue`, `green`, `orange`, `red`, `purple`, `teal`, `yellow`, `pink`, `indigo`, `cyan`, `lime`
  - Shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950` + variants
- **neutral** (59) - Gray scale from `0` (black) to `1000` (white)
  - Full range: `0`, `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`, `1000` + variants

### ✨ **Effects** (14 tokens)

- **blur** (7) - `4`, `8`, `12`, `16`, `24`, `40`, `64` (pixels)
- **opacity** (7) - `0`, `10`, `25`, `50`, `75`, `90`, `100` (percentage)

### 📐 **Elevation** (20 tokens)

- **shadow** (10) - `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `inner`, `none`, `focus`
- **zIndex** (10) - `0`, `10`, `20`, `30`, `40`, `50`, `100`, `500`, `900`, `9999`

### 🔷 **Icon** (11 tokens)

- **iconSize** (7) - `12`, `16`, `20`, `24`, `32`, `40`, `48` (pixels)
- **iconStroke** (4) - `"1"`, `"1-5"`, `"2"`, `"2-5"` (stroke width for SVG icons)

### 📏 **Layout** (20 tokens)

- **breakpoint** (6) - `480`, `768`, `1024`, `1280`, `1440`, `1920` (pixels)
- **grid.columns** (8) - `1` to `12`
- **grid.gutters** (6) - `0`, `8`, `16`, `24`, `32`, `48` (pixels)
- **aspectRatio** (8) - Common ratios (`square`, `video`, `portrait`, `ultraWide`, etc.)

### 🎬 **Motion** (17 tokens)

- **easing** (4) - `linear`, `ease-in`, `ease-out`, `ease-in-out` (cubic-bezier curves)
- **timing** (13) - `0`, `50`, `75`, `100`, `150`, `200`, `250`, `300`, `400`, `500`, `600`, `800`, `1000` (milliseconds)

### 📦 **Space** (60 tokens)

- **spacing** (21) - `0`, `2`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `28`, `32`, `40`, `48`, `56`, `64`, `72`, `80`, `96`, `120`, `128` (pixels)
- **size** (10) - `0`, `4`, `8`, `16`, `32`, `44`, `64`, `96`, `128`, `192` (pixels for component sizes)
- **maxWidth** (23) - `256`, `288`, `320`, `360`, `384`, `400`, `448`, `512`, `576`, `600`, `640`, `672`, `768`, `800`, `896`, `960`, `1024`, `1152`, `1200`, `1280`, `1440` + `full`, `none` (pixels/rem)

### ✍️ **Typography** (42 tokens)

- **fontFamily** (3) - `sans`, `serif`, `mono`
- **fontSize** (13) - `12`, `14`, `16`, `18`, `20`, `24`, `30`, `36`, `48`, `60`, `72`, `96`, `128` (pixels/rem)
- **fontWeight** (9) - `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`
- **lineHeight** (6) - `1`, `1.2`, `1.35`, `1.5`, `1.65`, `1.8`
- **letterSpacing** (6) - `-0.02em`, `-0.01em`, `0em`, `0.01em`, `0.04em`, `0.08em`
- **fontFamily** (3) - `sans`, `serif`, `mono`

## Total: 448 Primitive Tokens

All primitives use **actual measurement values as keys** for maximum clarity and predictability. They serve as the foundation for semantic tokens in `@grasdouble/lufa_design-system-tokens`.

## Key Principles

### 📏 **Value-as-Key Pattern**

Instead of abstract scales (0-9), primitives use the actual value:

- ✅ `spacing[16]` = "16px"
- ✅ `timing[150]` = "150ms"
- ✅ `fontSize[24]` = "1.5rem"
- ❌ ~~`spacing[3]` = "16px"~~ (old pattern)

### 🎯 **WCAG Compliance Built-in**

- **Touch Targets**: `spacing[32]`, `spacing[48]` for WCAG 2.5.5
- **Focus Indicators**: `borderWidth[2]` minimum, `borderWidth[3]` recommended (WCAG 2.4.7)
- **Font Sizes**: `fontSize[16]` minimum for body text (WCAG 1.4.4)
- **Icons**: `iconSize[24]` minimum for touch targets

### 🔄 **Rhythm & Scale**

- **Spacing**: 4px/8px rhythm (2, 4, 8, 12, 16, 24, 32, 48, 64...)
- **Timing**: 50ms increments for small, 100ms+ for standard (50, 75, 100, 150, 200, 250...)
- **Typography**: Modular scale based on 16px base

## Build

```bash
pnpm --filter @grasdouble/lufa_design-system-primitives build
```

Build compiles TypeScript and generates `dist/style.css` with all primitive CSS custom properties.

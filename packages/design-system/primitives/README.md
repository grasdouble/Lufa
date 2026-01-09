[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system-primitives

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> Non-semantic design primitives for the Lufa Design System. Raw foundational values using pixel/millisecond values as keys for clarity and precision.

**Part of the [Lufa Design System](../README.md)** - Layer 1: Primitives

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-primitives
```

## Philosophy

Primitives use **actual values as keys** for numeric scales (e.g., `spacing[16]`, `timing[150]`, `fontSize[24]`) for maximum clarity and predictability. For rhythm/optical scales, descriptive keys are used (e.g., `lineHeight.body`, `letterSpacing.readable`, `blur.none`). They are intentionally non-semantic—use `@grasdouble/lufa_design-system-tokens` for semantic names like `compact`, `default`, `large`.

## Usage

### TypeScript/JavaScript

```typescript
import primitives from '@grasdouble/lufa_design-system-primitives';

// Spacing uses pixel values as keys
const padding = primitives.spacing[16]; // "16px"
const margin = primitives.spacing[24]; // "24px"
const gap = primitives.spacing[72]; // "72px"

// Timing uses millisecond values as keys
const transition = primitives.timing[150]; // "150ms"
const animation = primitives.timing[400]; // "400ms"

// Border widths use pixel values
const border = primitives.borderWidth[1]; // "1px"
const focusBorder = primitives.borderWidth[3]; // "3px"

// Typography uses pixel/numeric values
const body = primitives.fontSize[16]; // "1rem" (16px)
const heading = primitives.fontSize[24]; // "1.5rem" (24px)
const bold = primitives.fontWeight[700]; // 700

// Icons use pixel sizes
const iconSmall = primitives.iconSize[16]; // 16
const iconDefault = primitives.iconSize[24]; // 24
const iconStrokeDefault = primitives.iconStroke['1-5']; // 1.5

// Layout uses pixel values (in rem)
const containerWidth = primitives.maxWidth[768]; // "48rem"
const modalWidth = primitives.maxWidth[600]; // "37.5rem"
```

### CSS Custom Properties

```css
@import '@grasdouble/lufa_design-system-primitives/style.css';

.my-element {
  /* Spacing: --lufa-primitive-spacing-{value} */
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

  /* Layout: --lufa-primitive-max-width-{value} */
  max-width: var(--lufa-primitive-max-width-768);

  /* Radius: --lufa-primitive-radius-{pixels} */
  border-radius: var(--lufa-primitive-radius-8);

  /* Icons: --lufa-primitive-icon-size-{pixels} */
  width: var(--lufa-primitive-icon-size-24);
  height: var(--lufa-primitive-icon-size-24);
}
```

## Primitive Categories

### 🎨 **Border** (21 tokens)

- **borderWidth** (6) - `0`, `1`, `2`, `3`, `4`, `8` (pixels)
- **borderStyle** (5) - `solid`, `dashed`, `dotted`, `double`, `none`
- **radius** (10) - `0`, `2`, `4`, `6`, `8`, `12`, `16`, `24`, `32`, `9999` (pixels)

### 🌈 **Color** (246 tokens)

- **chromatic** (187) - 17 color palettes × 11 shades each
  - Palettes: `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`
  - Shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`
- **neutral** (59) - Neutral palettes + grayscale
  - Palettes: `slate`, `gray`, `zinc`, `stone` (shades `50-950`)
  - Scale: `neutral` (`0`, `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`, `1000`)
  - Single values: `black`, `white`

### ✨ **Effects** (14 tokens)

- **blur** (7) - `none`, `4`, `8`, `12`, `16`, `24`, `40` (pixels)
- **opacity** (7) - `0`, `10`, `25`, `50`, `75`, `90`, `100` (percentage)

### 📐 **Elevation** (20 tokens)

- **shadow** (10) - `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`
- **zIndex** (10) - `0`, `10`, `20`, `30`, `40`, `50`, `100`, `500`, `900`, `9999`

### 🔷 **Icon** (11 tokens)

- **iconSize** (7) - `12`, `16`, `20`, `24`, `32`, `40`, `48` (pixels)
- **iconStroke** (4) - `"1"`, `"1-5"`, `"2"`, `"2-5"` (stroke width for SVG icons)

### 📏 **Layout** (20 tokens)

- **breakpoint** (6) - `480`, `768`, `1024`, `1280`, `1440`, `1920` (pixels)
- **grid.columns** (8) - `1`, `2`, `3`, `4`, `6`, `8`, `12`, `16`
- **grid.gutters** (6) - `0`, `8`, `16`, `24`, `32`, `48` (pixels)

### 🎬 **Motion** (17 tokens)

- **easing** (4) - `easeIn`, `easeOut`, `easeInOut`, `gentle` (cubic-bezier curves)
- **timing** (13) - `0`, `50`, `75`, `100`, `150`, `200`, `250`, `300`, `400`, `500`, `600`, `800`, `1000` (milliseconds)

### 📦 **Space** (62 tokens)

- **spacing** (21) - `0`, `2`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`, `28`, `32`, `40`, `48`, `56`, `64`, `72`, `80`, `96`, `120`, `128` (pixels)
- **size** (10) - `0`, `16`, `24`, `32`, `44`, `48`, `64`, `96`, `128`, `192` (pixels for component sizes)
- **maxWidth** (23) - `256`, `288`, `320`, `360`, `384`, `400`, `448`, `512`, `576`, `600`, `640`, `672`, `768`, `800`, `896`, `960`, `1024`, `1152`, `1200`, `1280`, `1440` + `full`, `none` (pixels/rem)
- **aspectRatio** (8) - `square`, `traditionalPhotoMonitor`, `classicPhotography`, `widescreenVideo`, `ultrawide`, `vertical`, `portraitPhoto`, `portraitDisplay`

### ✍️ **Typography** (37 tokens)

- **fontSize** (13) - `12`, `14`, `16`, `18`, `20`, `24`, `30`, `36`, `48`, `60`, `72`, `96`, `128` (pixels/rem)
- **fontWeight** (9) - `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`
- **lineHeight** (6) - `tight`, `heading`, `display`, `body`, `reading`, `dyslexia`
- **letterSpacing** (6) - `tight`, `heading`, `normal`, `relaxed`, `readable`, `dyslexia`
- **fontFamily** (3) - `sans`, `serif`, `mono`

## Total: 448 Primitive Tokens

Most primitives use **actual measurement values as keys** for maximum clarity and predictability, with descriptive keys reserved for rhythm/optical scales (line height, letter spacing) and explicit `none` values. They serve as the foundation for semantic tokens in `@grasdouble/lufa_design-system-tokens`.

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

[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system-tokens

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> Semantic design tokens for the Lufa Design System. Provides purpose-based design decisions mapped from primitives for colors, spacing, typography, motion, and more.

**Part of the [Lufa Design System](../README.md)** - Layer 2: Semantic Tokens

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-tokens
```

## Philosophy

Tokens provide **semantic, intent-based naming** on top of primitives. They map primitive values to meaningful contexts like `primary`, `success`, `base`, `lg`, and more.

## Usage

### TypeScript/JavaScript

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens';

// Semantic color tokens
const primaryText = tokens.color.text.primary;
const successBg = tokens.color.success.light;

// Spacing tokens (semantic names)
const compactSpacing = tokens.spacing.sm;
const defaultSpacing = tokens.spacing.base;

// Typography tokens
const headingSize = tokens.fontSize['6xl'];
const boldWeight = tokens.fontWeight.bold;

// Layout tokens
const navbarHeight = tokens.dimension.navbarHeightDefault;
const modalWidth = tokens.dimension.modalWidthDefault;

// Motion tokens
const fastTransition = tokens.transition.fast;
const hoverCursor = tokens.cursor.pointer;
```

### CSS Custom Properties

```css
@import '@grasdouble/lufa_design-system-tokens/style.css';

.my-element {
  /* Colors: --lufa-token-color-{category}-{variant} */
  color: var(--lufa-token-color-text-primary);
  background: var(--lufa-token-color-success-light);
  border-color: var(--lufa-token-color-border-default);

  /* Spacing: --lufa-token-spacing-{size} */
  padding: var(--lufa-token-spacing-base);
  margin: var(--lufa-token-spacing-sm);
  gap: var(--lufa-token-spacing-lg);

  /* Typography: --lufa-token-{property}-{variant} */
  font-size: var(--lufa-token-font-size-6xl);
  font-weight: var(--lufa-token-font-weight-bold);
  line-height: var(--lufa-token-line-height-base);

  /* Layout: --lufa-token-{category}-{variant} */
  border-radius: var(--lufa-token-radius-base);
  box-shadow: var(--lufa-token-shadow-md);

  /* Dimensions: --lufa-token-dimensions-{component}-{size} */
  height: var(--lufa-token-dimensions-navbar-height-default);
  width: var(--lufa-token-dimensions-modal-width-default);

  /* Motion: --lufa-token-{property}-{variant} */
  transition: var(--lufa-token-transition-fast);
  cursor: var(--lufa-token-cursor-pointer);
  transform: var(--lufa-token-transform-hover-lift);
}
```

## Token Categories

### 🎨 **Border** (21 tokens)

- **borderWidth** (6) - `none`, `hairline`, `thin`, `focus`, `thick`, `extraThick`
- **borderStyle** (5) - `solid`, `dashed`, `dotted`, `double`, `none`
- **radius** (10) - `none`, `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `3xl`, `full`

### 🌈 **Color** (65 tokens)

- **text** - `primary`, `secondary`, `tertiary`, `disabled`, `inverse`, `link`, `linkHover`
- **background** - `primary`, `secondary`, `tertiary`, `inverse`, `overlay`
- **border** - `default`, `light`, `medium`, `strong`, `focus`
- **interactive** - `default`, `hover`, `active`, `disabled`, `focus`
- **success** - `default`, `hover`, `active`, `light`, `lighter`, `border`, `text`
- **warning** - `default`, `hover`, `active`, `light`, `lighter`, `border`, `text`
- **error** - `default`, `hover`, `active`, `light`, `lighter`, `border`, `text`
- **info** - `default`, `hover`, `active`, `light`, `lighter`, `border`, `text`
- **brand** - `primary`, `primaryHover`, `primaryActive`, `secondary`, `secondaryHover`, `secondaryActive`, `accent`
- **surface** - `default`, `raised`, `overlay`, `inverse`
- **shadow** - `small`, `medium`, `large`, `extraLarge`

### ✨ **Effects** (55 tokens)

- **blur** (7) - `none`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`
- **opacity** (7) - `invisible`, `subtle`, `light`, `medium`, `disabled`, `faint`, `full`
- **cursor** (17) - `auto`, `pointer`, `grab`, `grabbing`, `move`, `text`, `wait`, `notAllowed`, `help`, `zoomIn`, `zoomOut`, `crosshair`, `resizeVertical`, `resizeHorizontal`, `resizeDiagonal1`, `resizeDiagonal2`
- **transform** (24) - Scale (`none`, `down`, `downMore`, `up`, `upMore`, `upLarge`), Rotate (`none`, `45`, `90`, `180`, `270`, `-45`, `-90`, `-180`), Translate (`none`, `upSmall`, `up`, `upLarge`, `downSmall`, `down`, `downLarge`), Combined (`hoverLift`, `hoverLiftMore`, `pressedDown`)

### 📐 **Elevation** (21 tokens)

- **shadow** (11) - `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `inner`
- **zIndex** (10) - `base`, `dropdown`, `sticky`, `fixed`, `overlay`, `modal`, `popover`, `tooltip`, `notification`, `maximum`

### 🔷 **Icon** (11 tokens)

- **iconSize** (7) - `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`
- **iconStroke** (4) - `thin`, `default`, `bold`, `extraBold`

### 📏 **Layout** (70 tokens)

- **breakpoint** (6) - `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **grid.columns** (8) - `single`, `double`, `triple`, `quad`, `six`, `eight`, `twelve`, `sixteen`
- **grid.gutters** (6) - `none`, `xs`, `sm`, `md`, `lg`, `xl`
- **aspectRatio** (8) - `square`, `traditional`, `photo`, `video`, `ultrawide`, `vertical`, `portrait`, `portraitDisplay`
- **container** (7) - `xs`, `sm`, `md`, `lg`, `xl`, `full`, `fluid`
- **dimension** (21) - Navbar heights (3), Sidebar widths (3), Footer heights (3), Button heights (3), Input heights (3), Card widths (2), Modal widths (4)
- **minWidth** (14) - `buttonMin`, `inputMin`, `cardMin`, `sidebarMin`, `xs`, `sm`, `md`, `lg`, `xl`, `none`, `full`, `fitContent`, `minContent`, `maxContent`

### 🎬 **Motion** (72 tokens)

- **easing** (4) - `easeIn`, `easeOut`, `easeInOut`, `gentle`
- **timing** (6) - `none`, `instant`, `fast`, `base`, `slow`, `deliberate`
- **advancedDuration** (10) - `moderate`, `leisurely`, `extended`, `long`, `veryLong`, `staggerTiny`, `staggerSmall`, `staggerBase`, `staggerLarge`, `staggerExtraLarge`
- **transition** (5) - `fast`, `base`, `slow`, `colors`, `none`
- **motion** (7 presets / 21 values) - `fade`, `scale`, `slide`, `color`, `all`, `collapse`, `scroll`
- **focus** (5 presets / 26 values) - `default`, `thick`, `inset`, `shadow`, `inverse`

### 📦 **Space** (45 tokens)

- **spacing** (19) - `none`, `xxs`, `xs`, `2xs`, `sm`, `sm-md`, `md`, `base`, `md-lg`, `lg`, `lg-xl`, `xl`, `xl-2xl`, `2xl`, `2xl-3xl`, `3xl`, `3xl-4xl`, `4xl`, `5xl`
- **size** (10) - `none`, `xs`, `sm`, `md`, `touchTarget`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
- **maxWidth** (16) - `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl`, `full`, `none`

### ✍️ **Typography** (86 tokens)

- **fontFamily** (3) - `sans`, `serif`, `mono`
- **fontSize** (13) - `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl`, `9xl`
- **fontWeight** (9) - `thin`, `extraLight`, `light`, `regular`, `medium`, `semibold`, `bold`, `extraBold`, `black`
- **lineHeight** (6) - `none`, `tight`, `snug`, `base`, `relaxed`, `loose`
- **letterSpacing** (6) - `tightest`, `tight`, `normal`, `wide`, `wider`, `widest`
- **typographyScale** (11 presets / 44 values) - `h1`-`h6`, `bodyLarge`, `body`, `bodySmall`, `caption`, `label`
- **measure** (5) - `narrow`, `default`, `comfortable`, `wide`, `extraWide` (optimal line lengths in `ch`)

## Total: 446 Semantic Tokens

All tokens map to values from `@grasdouble/lufa_design-system-primitives` for consistency and maintainability.

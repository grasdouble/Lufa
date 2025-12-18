# @grasdouble/lufa_design-system-tokens

Semantic design tokens for the Lufa Design System. Provides purpose-based design decisions mapped from primitives for colors, spacing, typography, motion, and more.

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-tokens
```

## Philosophy

Tokens provide **semantic, intent-based naming** on top of primitives. They map primitive values to meaningful contexts like `primary`, `success`, `compact`, `default`, `large`, etc.

## Usage

### TypeScript/JavaScript

```typescript
import {
  color,
  cursor,
  dimension,
  fontSize,
  fontWeight,
  radius,
  shadow,
  spacing,
  transition,
} from '@grasdouble/lufa_design-system-tokens';

// Semantic color tokens
const primaryText = color.text.primary;
const successBg = color.background.success;

// Spacing tokens (semantic names)
const compactSpacing = spacing.compact;
const defaultSpacing = spacing.default;

// Typography tokens
const headingSize = fontSize.h1;
const boldWeight = fontWeight.bold;

// Layout tokens
const navbarHeight = dimension.navbarHeightDefault;
const modalWidth = dimension.modalWidthDefault;

// Motion tokens
const fastTransition = transition.fast;
const hoverCursor = cursor.pointer;
```

### CSS Custom Properties

```css
@import '@grasdouble/lufa_design-system-tokens/style.css';

.my-element {
  /* Colors: --lufa-color-{category}-{variant} */
  color: var(--lufa-color-text-primary);
  background: var(--lufa-color-background-success);
  border-color: var(--lufa-color-border-default);

  /* Spacing: --lufa-spacing-{size} */
  padding: var(--lufa-spacing-default);
  margin: var(--lufa-spacing-compact);
  gap: var(--lufa-spacing-comfortable);

  /* Typography: --lufa-{property}-{variant} */
  font-size: var(--lufa-font-size-h1);
  font-weight: var(--lufa-font-weight-bold);
  line-height: var(--lufa-line-height-base);

  /* Layout: --lufa-{category}-{variant} */
  border-radius: var(--lufa-radius-base);
  box-shadow: var(--lufa-shadow-md);

  /* Dimensions: --lufa-dimensions-{component}-{size} */
  height: var(--lufa-dimensions-navbar-height-default);
  width: var(--lufa-dimensions-modal-width-default);

  /* Motion: --lufa-{property}-{variant} */
  transition: var(--lufa-transition-fast);
  cursor: var(--lufa-cursor-pointer);
  transform: var(--lufa-transform-hover-lift);
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
- **border** - `default`, `light`, `strong`, `focus`, `disabled`
- **interactive** - `default`, `hover`, `active`, `disabled`, `ghost`
- **feedback** - `success`, `error`, `warning`, `info` (each with `default`, `bg`, `border`)
- **brand** - `primary`, `secondary`, `accent` (each with `default`, `light`, `lighter`)

### ✨ **Effects** (55 tokens)

- **blur** (7) - `none`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`
- **opacity** (7) - `transparent`, `faint`, `light`, `medium`, `strong`, `intense`, `opaque`
- **cursor** (17) - `auto`, `pointer`, `grab`, `grabbing`, `move`, `text`, `wait`, `notAllowed`, `help`, `zoomIn`, `zoomOut`, `crosshair`, `resizeVertical`, `resizeHorizontal`, `resizeDiagonal1`, `resizeDiagonal2`
- **transform** (24) - Scale (`none`, `down`, `downMore`, `up`, `upMore`, `upLarge`), Rotate (`none`, `45`, `90`, `180`, `270`, `-45`, `-90`, `-180`), Translate (`none`, `upSmall`, `up`, `upLarge`, `downSmall`, `down`, `downLarge`), Combined (`hoverLift`, `hoverLiftMore`, `pressedDown`)

### 📐 **Elevation** (21 tokens)

- **shadow** (11) - `none`, `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `inner`, `focus`
- **zIndex** (10) - `base`, `dropdown`, `sticky`, `fixed`, `overlay`, `modal`, `popover`, `tooltip`, `notification`, `maximum`

### 🔷 **Icon** (11 tokens)

- **iconSize** (7) - `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`
- **iconStroke** (4) - `thin`, `default`, `bold`, `extraBold`

### 📏 **Layout** (49 tokens)

- **breakpoint** (6) - `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- **grid.columns** (8) - `1` to `12`
- **grid.gutters** (6) - `none`, `xs`, `sm`, `md`, `lg`, `xl`
- **aspectRatio** (8) - `square`, `video`, `wide`, `ultraWide`, `portrait`, `classic`, `golden`, `standard`
- **container** (7) - `xs`, `sm`, `md`, `lg`, `xl`, `full`, `fluid`
- **dimension** (21) - Navbar heights (3), Sidebar widths (3), Footer heights (3), Button heights (3), Input heights (3), Card widths (2), Modal widths (4)
- **minWidth** (14) - Component minimums (`buttonMin`, `inputMin`, `cardMin`, `sidebarMin`) + sizes (`xs` to `xl`) + special values

### 🎬 **Motion** (30 tokens)

- **easing** (4) - `linear`, `easeIn`, `easeOut`, `easeInOut`
- **timing** (6) - `none`, `instant`, `fast`, `base`, `slow`, `deliberate`
- **advancedDuration** (10) - `moderate`, `leisurely`, `extended`, `long`, `veryLong`, `staggerTiny`, `staggerSmall`, `staggerBase`, `staggerLarge`, `staggerExtraLarge`
- **transition** (5) - `all`, `colors`, `opacity`, `shadow`, `transform`
- **focus** (5) - `default`, `strong`, `subtle`, `inverse`, `error`

### 📦 **Space** (45 tokens)

- **spacing** (19) - `none`, `xxs`, `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl`, `compact`, `default`, `comfortable`, `spacious`
- **size** (10) - `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`
- **maxWidth** (16) - `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `prose`, `container`, `full`, `none`

### ✍️ **Typography** (43 tokens)

- **fontFamily** (3) - `sans`, `serif`, `mono`
- **fontSize** (13) - `xs`, `sm`, `md`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `h1`, `h2`, `h3`
- **fontWeight** (9) - `thin`, `extraLight`, `light`, `regular`, `medium`, `semibold`, `bold`, `extraBold`, `black`
- **lineHeight** (6) - `none`, `tight`, `snug`, `base`, `relaxed`, `loose`
- **letterSpacing** (6) - `tightest`, `tight`, `normal`, `wide`, `wider`, `widest`
- **typographyScale** (1) - Predefined combinations for heading levels
- **measure** (5) - `narrow`, `default`, `comfortable`, `wide`, `extraWide` (optimal line lengths in `ch`)

## Total: 355 Semantic Tokens

All tokens map to values from `@grasdouble/lufa_design-system-primitives` for consistency and maintainability.

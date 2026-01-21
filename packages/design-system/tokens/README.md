[← Back to Design System Overview](../README.md)

# @grasdouble/lufa_design-system-tokens

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> Semantic design tokens for the Lufa Design System. Provides purpose-based design decisions mapped from primitives for colors, spacing, typography, motion, and more.

**Part of the [Lufa Design System](../README.md)** - Layer 2: Semantic Tokens

## ⚡ Key Feature: CSS Variable Integration

**All tokens export CSS variable references by default**, enabling:

- ✅ Runtime theming without recompilation
- ✅ Single source of truth (CSS file defines actual values)
- ✅ Full TypeScript type safety
- ✅ Better DevTools experience (see both semantic names and actual values)

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens';

// TypeScript tokens are CSS variable references
tokens.spacing.base         // 'var(--lufa-token-space-spacing-base)'
tokens.color.text.primary   // 'var(--lufa-token-color-color-text-primary)'
tokens.shadow.md            // 'var(--lufa-token-elevation-shadow-md)'

// Use directly in inline styles - browser resolves automatically
<div style={{ padding: tokens.spacing.base }}>Content</div>
```

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-tokens
```

## Usage

### TypeScript/JavaScript (CSS Variable Refs)

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens';
import '@grasdouble/lufa_design-system-tokens/style.css'; // Import CSS once

// All token values are CSS variable references
const styles = {
  padding: tokens.spacing.base,           // 'var(--lufa-token-space-spacing-base)'
  color: tokens.color.text.primary,       // 'var(--lufa-token-color-color-text-primary)'
  fontSize: tokens.fontSize.lg,           // 'var(--lufa-token-typography-font-size-lg)'
  boxShadow: tokens.shadow.md,            // 'var(--lufa-token-elevation-shadow-md)'
  borderRadius: tokens.radius.md,         // 'var(--lufa-token-border-radius-md)'
};

// React component example
function Button({ children }) {
  return (
    <button style={{
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      fontSize: tokens.fontSize.base,
      borderRadius: tokens.radius.base,
      background: tokens.color.interactive.default,
      color: tokens.color.text.inverse,
    }}>
      {children}
    </button>
  );
}
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

  /* Motion: --lufa-token-{property}-{variant} */
  transition: var(--lufa-token-transition-fast);
  cursor: var(--lufa-token-cursor-pointer);
}
```

### Runtime Theming

Change theme at runtime without recompiling:

```typescript
// Change any token value dynamically
document.documentElement.style.setProperty('--lufa-token-color-color-text-primary', '#FF0000');

// Dark mode example
function enableDarkMode() {
  document.documentElement.style.setProperty('--lufa-token-color-background-primary', '#1a1a1a');
  document.documentElement.style.setProperty('--lufa-token-color-text-primary', '#ffffff');
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

- **blur** (7) - `none`, `subtle`, `base`, `medium`, `strong`, `extraStrong`, `max`
- **opacity** (7) - `invisible`, `subtle`, `light`, `medium`, `disabled`, `faint`, `full`
- **cursor** (17) - `auto`, `default`, `pointer`, `grab`, `grabbing`, `move`, `text`, `wait`, `notAllowed`, `help`, `zoomIn`, `zoomOut`, `crosshair`, `resizeVertical`, `resizeHorizontal`, `resizeDiagonal1`, `resizeDiagonal2`
- **transform** (24) - Scale, Rotate, Translate, Combined (`hoverLift`, `hoverLiftMore`, `pressedDown`)

### 📐 **Elevation** (21 tokens)

- **shadow** (11) - `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `inner`
- **zIndex** (10) - `base`, `dropdown`, `sticky`, `tooltip`, `drawer`, `menu`, `modal`, `notification`, `toast`, `max`

### 🔷 **Icon** (11 tokens)

- **iconSize** (7) - `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
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

## Totals

- **446 token values** in TypeScript (leaf values, including composite presets like `motion` and `typographyScale`)
- **355 CSS custom properties** generated in `dist/style.css`

All tokens map to values from `@grasdouble/lufa_design-system-primitives` for consistency and maintainability. Composite presets (e.g., `typographyScale`, `motion`, `focus`) are JS-only helpers and are not exported as CSS variables.

## How It Works

### Build Process

```
1. TypeScript Compilation (tsc)
   ├─ Compiles src/tokens/**/*.ts → dist/tokens/**/*.js
   └─ Tokens reference primitives (actual values)

2. CSS Generation (generate-css.ts)
   ├─ Reads compiled tokens
   ├─ Generates dist/style.css with CSS custom properties
   └─ Example: --lufa-token-spacing-base: 16px;

3. Transform to CSS Refs (transform-to-css-refs.ts)
   ├─ Imports compiled token values
   ├─ Transforms values to CSS variable references
   ├─ Overwrites dist/tokens/**/*.js files
   └─ Example: spacing.base = 'var(--lufa-token-spacing-base)'

4. Token Map Generation (generate-map.ts)
   └─ Creates dist/tokens.map.json for tooling
```

### Result

After the build:

- **TypeScript tokens** (`dist/tokens/**/*.js`) export CSS variable strings
- **CSS file** (`dist/style.css`) contains the actual design values
- **Single import** for both TypeScript and CSS usage

## Benefits

### ✅ Runtime Theming

CSS variables can be changed at runtime without recompiling JavaScript.

### ✅ Single Source of Truth

- One CSS file (`style.css`) defines all actual values
- TypeScript imports reference the same CSS variables
- No duplication between JS and CSS

### ✅ Type Safety

TypeScript types are preserved with full autocomplete support.

### ✅ Better DevTools Experience

Inspect element shows both the semantic name (`var(--lufa-token-spacing-base)`) and the actual value (`16px`).

### ✅ CSS-in-JS Compatibility

Works seamlessly with inline styles, styled-components, Emotion, and any CSS-in-JS library.

## Token Naming Convention

CSS variables follow this pattern:

```
--lufa-token-{category}-{subcategory}-{name}
```

Examples:

| TypeScript Path             | CSS Variable                            | Value                      |
| --------------------------- | --------------------------------------- | -------------------------- |
| `tokens.spacing.base`       | `--lufa-token-space-spacing-base`       | `16px`                     |
| `tokens.color.text.primary` | `--lufa-token-color-color-text-primary` | `oklch(21% 0 0)`           |
| `tokens.shadow.md`          | `--lufa-token-elevation-shadow-md`      | `0 4px 6px -1px rgba(...)` |
| `tokens.fontSize.lg`        | `--lufa-token-typography-font-size-lg`  | `18px`                     |

## Development

### Building

```bash
pnpm build
```

Runs the full build pipeline: TypeScript compilation → CSS generation → transformation → map generation.

### Adding New Tokens

1. **Create token in source** (`src/tokens/`)
2. **Export from index** (`src/index.ts`)
3. **Add to transformation script** (`scripts/transform-to-css-refs.ts`)
4. **Build** (`pnpm build`)

See [TECHNICAL.md](./TECHNICAL.md) for detailed development documentation.

## Related Documentation

- **Design System Architecture**: See [Design System README](../README.md)
- **Primitives Package**: See `@grasdouble/lufa_design-system-primitives`
- **Technical Details**: See [TECHNICAL.md](./TECHNICAL.md)
- **Storybook Stories**: See `/packages/design-system/storybook/`

---

**Package**: `@grasdouble/lufa_design-system-tokens`  
**Version**: 0.4.0  
**License**: MIT

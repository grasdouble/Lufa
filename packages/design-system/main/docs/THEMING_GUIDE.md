# Component Theming Guide

## 🎨 Theme System Overview

The Lufa Design System uses **semantic tokens** that automatically adapt to themes. Components are fully themable through Tailwind's theme system without manual CSS custom property wiring.

### Available Themes

The design system includes a dedicated themes package (`@grasdouble/lufa_design-system-themes`) with pre-built theme variants:

**Default Theme** (built-in):

- Standard color palette
- Base spacing and border radius (8px, 16px, etc.)
- Default transition speeds (250ms, 400ms)

**Ocean Theme** (`ocean.css`):

- 🌊 Blue/aqua color palette
- More rounded corners (12px, 16px, 24px)
- More spacious layout (+12.5% spacing)
- Slower, smoother transitions (300ms, 500ms)
- **Personality**: Smooth, flowing, modern

**Forest Theme** (`forest.css`):

- 🌲 Green/earth color palette
- Less rounded corners (6px, 8px, 12px)
- More compact layout (-12.5% spacing)
- Faster, snappier transitions (200ms, 300ms)
- Thicker borders for earthy feel
- **Personality**: Organic, grounded, natural

### 🌓 Dark Mode Support

**All themes now support both light and dark modes!** Each theme (default, ocean, forest) includes:

- **Light mode** (default) - Bright backgrounds, dark text
- **Dark mode** - Dark backgrounds, light text
- **Auto mode** - Automatically follows system preference (`prefers-color-scheme`)

Dark mode uses semantic color tokens that automatically invert when switching modes, while preserving each theme's visual personality (spacing, borders, transitions).

**Quick Usage**:

```tsx
import { useTheme } from '@grasdouble/lufa_design-system';

function App() {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <>
      {/* Theme switcher */}
      <button onClick={() => setTheme('ocean')}>Ocean</button>
      <button onClick={() => setTheme('forest')}>Forest</button>

      {/* Mode switcher */}
      <button onClick={() => setMode('light')}>☀️ Light</button>
      <button onClick={() => setMode('dark')}>🌙 Dark</button>
      <button onClick={() => setMode('auto')}>🔄 Auto</button>
    </>
  );
}
```

For complete dark mode documentation, see [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md).

### Using Themes

**Installation**:

```bash
pnpm add @grasdouble/lufa_design-system-themes
```

**Import themes in your app**:

```tsx
// Import themes from the themes package
import '@grasdouble/lufa_design-system-themes/default.css';
import '@grasdouble/lufa_design-system-themes/ocean.css';
import '@grasdouble/lufa_design-system-themes/forest.css';
```

**Apply theme with data attribute**:

```tsx
// Default theme (no attribute needed, but can be explicit)
<div>
  <Alert variant="info">Default theme with light/dark modes</Alert>
</div>

// Ocean theme
<div data-theme="ocean">
  <Alert variant="info">Ocean themed alert</Alert>
</div>

// Forest theme
<div data-theme="forest">
  <Alert variant="success">Forest themed alert</Alert>
</div>
```

**Apply dark mode with data-mode attribute**:

```tsx
// Light mode (default)
<div data-theme="ocean">
  <Alert>Ocean theme in light mode</Alert>
</div>

// Dark mode
<div data-theme="ocean" data-mode="dark">
  <Alert>Ocean theme in dark mode</Alert>
</div>

// Auto mode (follows system preference)
<div data-theme="ocean">
  <Alert>Ocean theme in auto mode</Alert>
</div>
```

**Dynamic theme switching with useTheme hook** (recommended):

```tsx
import { useTheme } from '@grasdouble/lufa_design-system';

import '@grasdouble/lufa_design-system-themes/default.css';
import '@grasdouble/lufa_design-system-themes/ocean.css';
import '@grasdouble/lufa_design-system-themes/forest.css';

function App() {
  const { theme, mode, setTheme, setMode } = useTheme({
    defaultTheme: 'default',
    defaultMode: 'auto',
  });

  return (
    <div>
      {/* Theme switcher */}
      <button onClick={() => setTheme('default')}>Default</button>
      <button onClick={() => setTheme('ocean')}>Ocean</button>
      <button onClick={() => setTheme('forest')}>Forest</button>

      {/* Mode switcher */}
      <button onClick={() => setMode('light')}>☀️ Light</button>
      <button onClick={() => setMode('dark')}>🌙 Dark</button>
      <button onClick={() => setMode('auto')}>🔄 Auto</button>

      {/* All components automatically adapt to theme AND mode */}
      <Alert variant="info">Changes colors, spacing, and brightness</Alert>
      <Button>Adapts to both theme and mode</Button>
      <Card>Dark mode support built-in</Card>
    </div>
  );
}
```

**Manual theme switching** (without hook):

```tsx
import { useState } from 'react';

// Import all theme CSS files (including default for light/dark modes)
import '@grasdouble/lufa_design-system-themes/default.css';
import '@grasdouble/lufa_design-system-themes/ocean.css';
import '@grasdouble/lufa_design-system-themes/forest.css';

function App() {
  const [theme, setTheme] = useState<'default' | 'ocean' | 'forest'>('default');

  return (
    <div data-theme={theme === 'default' ? undefined : theme}>
      <button onClick={() => setTheme('default')}>Default</button>
      <button onClick={() => setTheme('ocean')}>Ocean</button>
      <button onClick={() => setTheme('forest')}>Forest</button>

      {/* All components automatically adapt to the theme */}
      <Alert variant="info">Theme changes color palette</Alert>
      <Button>Theme changes button style</Button>
      <Tabs>Theme changes spacing and borders</Tabs>
    </div>
  );
}
```

**Browser console testing**:

```javascript
// Switch themes
document.documentElement.setAttribute('data-theme', 'ocean');
document.documentElement.setAttribute('data-theme', 'forest');
document.documentElement.removeAttribute('data-theme'); // Back to default

// Switch modes
document.documentElement.setAttribute('data-mode', 'dark'); // Dark mode
document.documentElement.setAttribute('data-mode', 'light'); // Light mode
document.documentElement.removeAttribute('data-mode'); // Auto mode (system preference)

// Combine theme + mode
document.documentElement.setAttribute('data-theme', 'ocean');
document.documentElement.setAttribute('data-mode', 'dark'); // Ocean theme in dark mode
```

### What Themes Override

Themes override CSS custom properties at the `:root` level with `[data-theme="name"]`:

**Color Properties** (all themes):

- `--color-text-*` - Text colors (primary, secondary, tertiary, etc.)
- `--color-background-*` - Background colors
- `--color-border-*` - Border colors
- `--color-interactive-*` - Button/link colors
- `--color-success-*`, `--color-error-*`, `--color-warning-*`, `--color-info-*` - Status colors
- `--color-brand-*` - Brand colors
- `--color-surface-*` - Surface/card colors

**Visual Properties** (Ocean & Forest customize these for unique personality):

- `--border-radius-*` - Border radius values
- `--spacing-*` - Spacing values (padding, margin, gap)
- `--transition-duration-*` - Animation speeds
- `--border-width-*` - Border widths
- `--opacity-*` - Overlay opacity values

**Example from Ocean theme**:

```css
:root[data-theme='ocean'] {
  /* Colors */
  --color-text-primary: #0c4a6e;
  --color-interactive-default: #0284c7;
  --color-background-primary: #ffffff;
  --color-background-secondary: #f0f9ff;

  /* Visual customizations for "smooth, flowing" feel */
  --border-radius-base: 0.75rem; /* 12px - more rounded than default 8px */
  --spacing-base: 1.125rem; /* 18px - more spacious than default 16px */
  --transition-duration-base: 300ms; /* Slower than default 250ms */
  --opacity-light: 0.65; /* More transparent overlays */
}
```

**Example from Forest theme**:

```css
:root[data-theme='forest'] {
  /* Colors */
  --color-text-primary: #14532d;
  --color-interactive-default: #16a34a;
  --color-background-primary: #ffffff;
  --color-background-secondary: #f0fdf4;

  /* Visual customizations for "organic, compact" feel */
  --border-radius-base: 0.375rem; /* 6px - less rounded than default 8px */
  --spacing-base: 0.875rem; /* 14px - more compact than default 16px */
  --transition-duration-base: 200ms; /* Faster than default 250ms */
  --border-width-base: 2px; /* Thicker borders for earthy feel */
}
```

---

## ✅ Recommended Pattern (Use for 90% of Components)

### Pattern 1: `@apply` with Semantic Tokens

**Most components (78%) use this pattern.** It's concise, maintainable, and fully themable.

```css
.component {
  /* Layout (not themable) */
  @apply flex items-center gap-base;

  /* Visual properties (fully themable) */
  @apply bg-background-primary text-text-primary;
  @apply border border-border-default;
  @apply rounded-lg p-base shadow-sm;

  /* States */
  @apply hover:bg-background-secondary;
  @apply focus:ring-2 focus:ring-interactive-focus;
}
```

**How it works:**

```
@apply bg-info-lighter
        ↓ (theme.css mapping)
var(--lufa-token-color-info-lighter)
        ↓ (token value)
OKLCH color value from tokens package
        ↓ (theme switching via data-theme attribute)
Different value per theme (ocean.css / forest.css override)
```

### Variant Example

```css
.alertInfo {
  @apply border-info-border bg-info-lighter text-info-text;
}

.alertSuccess {
  @apply border-success-border bg-success-lighter text-success-text;
}

.alertWarning {
  @apply border-warning-border bg-warning-lighter text-warning-text;
}

.alertError {
  @apply border-error-border bg-error-lighter text-error-text;
}
```

### State Example

```css
.button {
  @apply bg-interactive-default text-text-inverse;
  @apply hover:bg-interactive-hover;
  @apply active:bg-interactive-active;
  @apply disabled:bg-interactive-disabled disabled:cursor-not-allowed;
}
```

---

## ⚙️ Alternative Pattern (Use Sparingly)

### Pattern 2: Explicit CSS Custom Properties

**Some components (22%) use this for complex cases.** Use only when:

- Component needs many variant combinations
- Computational values with `calc()` are required
- Third-party integration requires direct token access

```css
.component {
  /* Define component-level custom properties */
  --component-bg: var(--lufa-token-color-background-primary);
  --component-text: var(--lufa-token-color-text-primary);
  --component-border: var(--lufa-token-color-border-default);

  /* Apply the variables */
  background: var(--component-bg);
  color: var(--component-text);
  border: 1px solid var(--component-border);
}

/* Variant overrides */
.componentPrimary {
  --component-bg: var(--lufa-token-color-interactive-default);
  --component-text: var(--lufa-token-color-text-inverse);
}
```

**Example from codebase** (Link component):

```css
.link {
  --link-color: var(--lufa-token-color-text-link);
  --link-color-hover: var(--lufa-token-color-text-link-hover);

  color: var(--link-color);
}

.colorPrimary {
  --link-color: var(--lufa-token-color-interactive-default);
  --link-color-hover: var(--lufa-token-color-interactive-hover);
}

.colorSuccess {
  --link-color: var(--lufa-token-color-success-default);
  --link-color-hover: var(--lufa-token-color-success-hover);
}
```

---

## 📚 Available Semantic Tokens

### Status Colors

Use these for alerts, notifications, badges, etc.

**Info** (blue):

- `info-lighter`, `info-light`, `info-default`, `info-hover`, `info-active`
- `info-border`, `info-text`

**Success** (green):

- `success-lighter`, `success-light`, `success-default`, `success-hover`, `success-active`
- `success-border`, `success-text`

**Warning** (orange/yellow):

- `warning-lighter`, `warning-light`, `warning-default`, `warning-hover`, `warning-active`
- `warning-border`, `warning-text`

**Error** (red):

- `error-lighter`, `error-light`, `error-default`, `error-hover`, `error-active`
- `error-border`, `error-text`

### UI Colors

**Text**:

- `text-text-primary` - Main text
- `text-text-secondary` - Secondary text
- `text-text-tertiary` - Tertiary/muted text
- `text-text-disabled` - Disabled text
- `text-text-inverse` - Text on dark backgrounds
- `text-text-link` - Link text
- `text-text-link-hover` - Link hover state

**Background**:

- `bg-background-primary` - Main background (usually white)
- `bg-background-secondary` - Secondary background (light gray)
- `bg-background-tertiary` - Tertiary background (lighter gray)
- `bg-background-inverse` - Dark background
- `bg-background-overlay` - Modal/overlay background

**Border**:

- `border-border-default` - Default borders
- `border-border-light` - Light borders
- `border-border-medium` - Medium borders
- `border-border-strong` - Strong/prominent borders
- `border-border-focus` - Focus state borders

**Interactive**:

- `interactive-default` - Default interactive color (buttons, links)
- `interactive-hover` - Hover state
- `interactive-active` - Active/pressed state
- `interactive-disabled` - Disabled state
- `interactive-focus` - Focus ring color

### Spacing

- `p-xxs`, `p-xs`, `p-sm`, `p-md`, `p-base`, `p-lg`, `p-xl`, `p-2xl`, `p-3xl`
- `m-xxs`, `m-xs`, `m-sm`, `m-md`, `m-base`, `m-lg`, `m-xl`, `m-2xl`, `m-3xl`
- `gap-xxs`, `gap-xs`, `gap-sm`, `gap-md`, `gap-base`, `gap-lg`, `gap-xl`

### Other Tokens

- **Border Radius**: `rounded-sm`, `rounded-base`, `rounded-lg`, `rounded-xl`, `rounded-full`
- **Shadows**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- **Transitions**: `duration-fast`, `duration-base`, `duration-slow`

---

## 🚫 Anti-Patterns (Don't Do This)

### ❌ Hard-coded Primitive Colors

```css
/* BAD - Uses Tailwind primitive colors */
.alert {
  @apply bg-blue-50 text-blue-900 border-blue-200;
}

.button {
  @apply bg-gray-100 hover:bg-gray-200;
}
```

**Why bad?** These won't adapt to themes. `blue-50` is always the same blue, regardless of theme.

### ✅ Use Semantic Tokens Instead

```css
/* GOOD - Uses semantic tokens that adapt to themes */
.alert {
  @apply bg-info-lighter text-info-text border-info-border;
}

.button {
  @apply bg-background-secondary hover:bg-background-tertiary;
}
```

### ❌ Hard-coded Values

```css
/* BAD - Hard-coded hex colors and pixel values */
.component {
  background: #f3f4f6;
  color: #111827;
  padding: 16px;
  border-radius: 8px;
}
```

### ✅ Use Tokens

```css
/* GOOD - Uses semantic tokens */
.component {
  @apply bg-background-secondary text-text-primary;
  @apply p-base rounded-lg;
}
```

---

## 🧪 Testing Themability

### 1. Visual Testing in Storybook

```bash
pnpm ds:storybook:dev
```

Navigate to your component and verify it looks correct.

### 2. Theme Switching Test

Open browser console and run:

```javascript
// Switch to ocean theme
document.documentElement.setAttribute('data-theme', 'ocean');

// Switch to forest theme
document.documentElement.setAttribute('data-theme', 'forest');

// Back to default
document.documentElement.removeAttribute('data-theme');
```

### 3. Verification Checklist

- [ ] Component renders correctly in default theme
- [ ] Component adapts to ocean theme (blue colors, more rounded, more spacious)
- [ ] Component adapts to forest theme (green colors, less rounded, more compact)
- [ ] No visual breaks or color mismatches
- [ ] Hover/focus states work in all themes
- [ ] No hard-coded colors remain (`blue-50`, `#FF0000`, etc.)
- [ ] Spacing and borders adapt appropriately
- [ ] Transitions feel different per theme (ocean: smooth, forest: snappy)

### 4. Automated Check

```bash
# Check for primitive colors in your component
grep -E "(blue|green|red|gray|yellow|orange)-[0-9]" Component.module.css

# No output = good! (no primitive colors found)
# Output = fix those primitive colors
```

---

## 🔄 Migration from Primitive Colors

If you find a component using primitive colors, follow this process:

### Step 1: Identify Primitive Colors

```bash
grep -E "(blue|green|red|gray)-[0-9]" Component.module.css
```

### Step 2: Map to Semantic Tokens

Use this mapping table:

| Primitive                  | Context             | Semantic Token                                      |
| -------------------------- | ------------------- | --------------------------------------------------- |
| `blue-50`, `blue-100`      | Info backgrounds    | `bg-info-lighter`                                   |
| `blue-600`, `blue-700`     | Info actions        | `info-default` or `text-text-link`                  |
| `green-50`, `green-100`    | Success backgrounds | `bg-success-lighter`                                |
| `green-600`, `green-700`   | Success actions     | `success-default`                                   |
| `red-50`, `red-100`        | Error backgrounds   | `bg-error-lighter`                                  |
| `red-600`, `red-700`       | Error actions       | `error-default`                                     |
| `yellow-50`, `orange-100`  | Warning backgrounds | `bg-warning-lighter`                                |
| `yellow-600`, `orange-600` | Warning actions     | `warning-default`                                   |
| `gray-100`, `gray-200`     | Backgrounds         | `bg-background-secondary`, `bg-background-tertiary` |
| `gray-300`, `gray-400`     | Borders             | `border-border-light`, `border-border-default`      |
| `gray-600`, `gray-700`     | Text                | `text-text-secondary`, `text-text-primary`          |
| `gray-900`, `black`        | Dark text           | `text-text-primary`                                 |
| `white`                    | Light backgrounds   | `bg-background-primary`                             |

### Step 3: Replace with Semantic Tokens

**Before:**

```css
.tabs {
  @apply bg-gray-100 border-gray-200;
}

.tab {
  @apply text-gray-600 hover:bg-gray-200;
}

.tabActive {
  @apply bg-white text-blue-600;
}
```

**After:**

```css
.tabs {
  @apply bg-background-secondary border-border-light;
}

.tab {
  @apply text-text-secondary hover:bg-background-tertiary;
}

.tabActive {
  @apply bg-background-primary text-interactive-default;
}
```

### Step 4: Create Backup & Test

```bash
# Create backup
cp Component.module.css Component.module.css.backup

# Make changes
# ... edit file ...

# Build and verify
pnpm ds:main:build

# If successful, test in Storybook
pnpm ds:storybook:dev
```

---

## 🎯 Decision Tree: Which Pattern to Use?

```
Creating new component?
│
├─ Simple component with few variants?
│   └─ Use Pattern 1: @apply with semantic tokens ✅
│
├─ Complex component with many variants/states?
│   ├─ Variants can be separated by classes?
│   │   └─ Use Pattern 1: @apply with semantic tokens ✅
│   │
│   └─ Needs dynamic CSS custom properties?
│       └─ Use Pattern 2: Explicit tokens ⚙️
│
└─ Updating existing component?
    ├─ Already uses @apply?
    │   └─ Keep Pattern 1, just fix any primitives ✅
    │
    └─ Already uses explicit tokens?
        └─ Keep Pattern 2 if working well ⚙️
```

---

## 📖 Real Examples from Codebase

### Pattern 1 Examples (Majority Pattern)

**Alert Component**:

```css
.alert {
  @apply flex items-center gap-sm;
  @apply p-base rounded-lg border;
}

.variantInfo {
  @apply border-info-border bg-info-lighter text-info-text;
}
```

**Modal Component**:

```css
.modal {
  @apply bg-background-primary rounded-lg shadow-2xl;
}

.closeButton {
  @apply hover:bg-background-secondary;
  @apply text-text-tertiary hover:text-text-primary;
}
```

**Card Component**:

```css
.card {
  @apply rounded-lg bg-background-primary;
}

.variantElevated {
  @apply shadow-md;
}

.title {
  @apply text-text-primary text-lg font-semibold;
}
```

**Tabs Component** (after fix):

```css
.tabs {
  @apply bg-background-secondary border-border-light;
}

.tab {
  @apply text-text-secondary hover:bg-background-tertiary;
}

.tabActive {
  @apply bg-background-primary text-interactive-default;
}
```

### Pattern 2 Examples (Minority Pattern)

**Link Component** (many color variants):

```css
.link {
  --link-color: var(--lufa-token-color-text-link);
  --link-color-hover: var(--lufa-token-color-text-link-hover);
  color: var(--link-color);
}

.colorPrimary {
  --link-color: var(--lufa-token-color-interactive-default);
}

.colorSuccess {
  --link-color: var(--lufa-token-color-success-default);
}
```

**Badge Component** (computational sizing):

```css
.badge {
  --badge-bg: var(--lufa-token-color-interactive-default);
  --badge-text: var(--lufa-token-color-text-inverse);

  background: var(--badge-bg);
  color: var(--badge-text);
}
```

---

## 🔍 How to Find Theme Files

**Theme variants** (ocean, forest):

```
packages/design-system/themes/src/ocean.css
packages/design-system/themes/src/forest.css
```

These files define theme-specific overrides for colors and visual properties.

**Theme mapping file**:

```
packages/design-system/main/src/css/theme.css
```

This file maps semantic names (e.g., `text-link`) to tokens (e.g., `--lufa-token-color-text-link`).

**Tailwind override file**:

```
packages/design-system/main/src/css/tailwind-override.css
```

This file maps Tailwind utilities to primitives.

**Token source**:

```
packages/design-system/tokens/src/
```

Design tokens are defined here and generate the `--lufa-token-*` CSS custom properties.

---

## ❓ FAQ

### Q: Can I use both patterns in the same component?

**A:** Yes, but prefer consistency. Use `@apply` for most properties and explicit tokens only when necessary.

### Q: What if a semantic token doesn't exist?

**A:** Check `theme.css` first. If truly missing, add it to the tokens package, rebuild tokens (`pnpm ds:tokens:build`), then use it.

### Q: Should I convert existing Pattern 2 components to Pattern 1?

**A:** No, not unless they're using primitive colors. If explicit tokens work well, keep them.

### Q: How do I know which semantic token to use?

**A:** Check existing components with similar purposes. Alert uses `info-lighter`, so notifications should too.

### Q: Can I use Tailwind primitive colors for one-off components?

**A:** No. Always use semantic tokens for themability. Even one-off components benefit from theme switching.

### Q: How do I create a new theme?

**A:**

1. Create a new CSS file in `packages/design-system/themes/src/mytheme.css`
2. Override the same CSS custom properties used in `ocean.css` or `forest.css`
3. Use `[data-theme='mytheme']` selector
4. Update the themes package exports
5. Import in your app: `import '@grasdouble/lufa_design-system-themes/mytheme.css'`

### Q: Do themes work with dark mode?

**A:** Yes! All themes (default, ocean, forest) now include full dark mode support. Each theme defines both light and dark mode variants using the `data-mode` attribute and system preference detection via `prefers-color-scheme`. You can independently choose any theme (default/ocean/forest) and any mode (light/dark/auto), giving you 9 total configurations. See [DARK_MODE_GUIDE.md](./DARK_MODE_GUIDE.md) for complete usage examples.

### Q: Can I mix themes (e.g., Ocean colors with Forest spacing)?

**A:** Not directly, but you can create a custom theme that combines properties from both. Copy one theme as a base and selectively override properties.

---

## 📞 Quick Reference Commands

```bash
# Install themes package
pnpm add @grasdouble/lufa_design-system-themes

# Build design system
pnpm ds:main:build

# Start Storybook
pnpm ds:storybook:dev

# Check for primitive colors
grep -r "blue-[0-9]\|gray-[0-9]" packages/design-system/main/src/components/

# Rebuild tokens (if you added new semantic tokens)
pnpm ds:tokens:build
```

---

**Updated**: January 2026  
**Pattern Usage**: 78% Pattern 1 (`@apply`), 22% Pattern 2 (explicit tokens)  
**Components Verified**: Alert, Tabs, Badge, Input, Button, Link, Modal, Card, Pagination, Steps, Anchor, TestimonialOne  
**Available Themes**: Default, Ocean, Forest (all with dark mode support)  
**Dark Mode Status**: ✅ Complete - Production Ready (9 configurations: 3 themes × 3 modes)  
**Themes Package**: `@grasdouble/lufa_design-system-themes`

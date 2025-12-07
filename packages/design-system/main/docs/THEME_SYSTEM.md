# Theme System Implementation

## Overview

We've successfully implemented a complete theming system using Tailwind v4's semantic utilities. All components now use semantic design tokens that automatically adapt to different themes without code changes.

## What Was Done

### 1. Created Alternative Themes

- **Ocean Theme** (`src/themes/ocean.css`): Blue/teal color scheme for a calm, professional look
- **Forest Theme** (`src/themes/forest.css`): Green/earth color scheme for a natural, organic feel

Both themes use the `data-theme` attribute pattern:

```css
:root[data-theme='ocean'] {
    --color-interactive-default: #0284c7;
    /* ... all semantic color overrides ... */
}
```

### 2. Updated Components to Use Semantic Utilities

All component CSS files were updated to use semantic Tailwind utilities:

#### Updated Components:

- ✅ Typography (`Typography.module.css`)
- ✅ Avatar (`Avatar.module.css`)
- ✅ Button (`Button.module.css`)
- ✅ Input (`Input.module.css`)
- ✅ Card (`Card.module.css`)
- ✅ Badge (`Badge.module.css`)
- ✅ Alert (`Alert.module.css`)
- ✅ Modal (`Modal.module.css`)

#### Example Transformations:

**Before (Primitive):**

```css
.button {
    @apply bg-blue-600 text-white;
    @apply hover:bg-blue-700;
    @apply px-4 py-2;
}
```

**After (Semantic):**

```css
.button {
    @apply bg-interactive-default text-text-inverse;
    @apply hover:bg-interactive-hover;
    @apply px-base py-sm;
}
```

### 3. Created ThemeSwitcher Component

**Location:** `src/components/utility/ThemeSwitcher/`

**Features:**

- Three visual variants: `button`, `select`, `tabs`
- TypeScript support with proper types
- Applies theme by setting `data-theme` attribute on document root
- Callback support for theme change events

**Usage:**

```tsx
import { ThemeSwitcher } from '@grasdouble/lufa_design-system';

<ThemeSwitcher variant="tabs" showLabel={true} onThemeChange={(theme) => console.log('Theme changed to:', theme)} />;
```

### 4. Created ThemeSwitcher Storybook Story

**Location:** `src/stories/foundation/ThemeSwitcher.stories.tsx`

**Features:**

- Interactive theme switching demo
- Live component showcase (Buttons, Badges, Alerts, Cards, Inputs)
- Color swatch visualization
- Comprehensive documentation
- All three theme variants demonstrated

## Architecture

```
TypeScript Tokens (foundation/*.ts)
    ↓ (generation scripts)
CSS Variables (foundation/*.css)
    ↓ (@theme directive)
Tailwind Semantic Utilities (bg-interactive-default, text-text-primary)
    ↓ (used in components)
Component Styles (*.module.css)
    ↓ (theme override)
Theme CSS Files (themes/*.css with data-theme selector)
```

## Semantic Utilities Reference

### Colors

- **Text**: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-text-disabled`, `text-text-inverse`
- **Background**: `bg-background-primary`, `bg-background-secondary`, `bg-background-tertiary`
- **Interactive**: `bg-interactive-default`, `bg-interactive-hover`, `bg-interactive-active`, `bg-interactive-focus`
- **Status**: `bg-success-default`, `bg-warning-default`, `bg-error-default`, `bg-info-default`
- **Borders**: `border-border-default`, `border-border-light`, `border-border-medium`, `border-border-strong`

### Spacing

- **Semantic sizes**: `p-none`, `p-xxs`, `p-xs`, `p-sm`, `p-md`, `p-base`, `p-lg`, `p-xl`, `p-2xl` through `p-7xl`
- Works with: `p-*`, `m-*`, `gap-*`, `px-*`, `py-*`, `mt-*`, etc.

### Radius & Shadows

- **Radius**: `rounded-none`, `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`
- **Shadows**: `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none`

## Build Results

- **CSS Size**: 128.32 kB (17.15 kB gzipped)
- **JS Bundle**: 63.97 kB (15.46 kB gzipped)
- ✅ All builds passing
- ✅ All components using semantic utilities
- ✅ Three themes available (default, ocean, forest)

## How to Create New Themes

1. Create a new CSS file in `src/themes/` (e.g., `purple.css`)
2. Define your color palette:

```css
:root[data-theme='purple'] {
    /* Text colors */
    --color-text-primary: #4c1d95;
    --color-text-secondary: #6b21a8;
    /* ... */

    /* Interactive colors */
    --color-interactive-default: #9333ea;
    --color-interactive-hover: #7e22ce;
    /* ... */

    /* Status colors */
    --color-success-default: #16a34a;
    --color-warning-default: #d97706;
    --color-error-default: #dc2626;
    --color-info-default: #0891b2;
    /* ... */
}
```

3. Import in `tailwind.css`:

```css
@import './themes/purple.css';
```

4. Add to ThemeSwitcher component's Theme type and UI

## Benefits

✅ **Zero Component Changes**: Add new themes without modifying any component code
✅ **Type-Safe**: TypeScript support for theme names and props
✅ **Performance**: CSS-only theme switching, no JavaScript re-renders
✅ **Maintainable**: Single source of truth in foundation tokens
✅ **Scalable**: Easy to add unlimited themes
✅ **Accessible**: Semantic naming improves code readability
✅ **DX**: Autocomplete for semantic utilities in IDEs

## Testing

To test the theming system:

1. Run Storybook: `pnpm storybook`
2. Navigate to "Foundation / Theme Switcher"
3. Use the theme switcher to toggle between Default, Ocean, and Forest
4. Observe all components automatically adapting to the selected theme

## Documentation

See related docs:

- `docs/TAILWIND_WITH_FOUNDATION.md` - Tailwind integration guide
- `docs/USING_CSS_VARIABLES.md` - When to use Tailwind vs CSS variables
- `docs/CSS_VARIABLES_INTEGRATION.md` - Technical architecture overview
- Storybook: "Foundation / Tailwind Integration" - Interactive visual guide
- Storybook: "Foundation / Theme Switcher" - Live theme demo

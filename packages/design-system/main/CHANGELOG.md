# @grasdouble/lufa_design-system

## 0.8.0

### Minor Changes

- 445737d: # Phase 2A: Theme System Integration

  Implement proper separation between accessibility modes and brand themes following BMad architecture decisions.

  ## Breaking Changes

  ### Token CSS Selectors

  **BREAKING:** Token CSS now uses `[data-mode]` instead of `[data-theme]` for accessibility modes.

  **Before:**

  ```css
  [data-theme='dark'] {
    /* dark mode styles */
  }
  [data-theme='high-contrast'] {
    /* high-contrast styles */
  }
  ```

  **After:**

  ```css
  [data-mode='dark'] {
    /* dark mode styles */
  }
  [data-mode='high-contrast'] {
    /* high-contrast styles */
  }
  ```

  **Migration:** Update your HTML attributes from `data-theme` to `data-mode` for light/dark/high-contrast modes.

  ## Features

  ### @grasdouble/lufa_design-system
  - **New Hook:** `useThemeMode` for managing accessibility modes
    - Supports 3 modes: light, dark, high-contrast
    - System preference detection (`prefers-color-scheme`, `prefers-contrast`)
    - localStorage persistence
    - SSR-safe

  ```typescript
  import { useThemeMode } from '@grasdouble/lufa_design-system';

  function App() {
    const { mode, setMode, systemPreference } = useThemeMode();

    return (
      <button onClick={() => setMode('dark')}>
        Switch to Dark Mode
      </button>
    );
  }
  ```

  ### @grasdouble/lufa_design-system-tokens
  - Updated CSS selectors: `[data-theme]` → `[data-mode]`
  - Support for 3 accessibility modes: light, dark, high-contrast
  - 31 mode-aware tokens with proper overrides

  ### @grasdouble/lufa_design-system-storybook
  - Updated ThemeSwitcher component to use `useThemeMode`
  - Added high-contrast mode to toolbar
  - Improved mode selector UI

  ### @grasdouble/lufa_design-system-themes
  - Added Phase 6 placeholders for ocean/forest themes
  - Documented `data-color-theme` attribute usage
  - Prepared architecture for brand theme variants

  ## Architecture Decisions
  - **ADR-001:** Modes vs Themes Separation - Separate accessibility from branding
  - **ADR-002:** HTML Attributes Naming - Use `data-mode` + `data-color-theme`

  ## Documentation

  Full BMad Method documentation available in `_bmad-output/subjects/theme-integration/`:
  - Analysis report (26 pages)
  - Technical specification (1,835 lines)
  - Implementation report (2,800+ lines)
  - 2 Architecture Decision Records

  ## Migration Guide

  ### Updating HTML Attributes

  ```html
  <!-- Before -->
  <html data-theme="dark">
    <!-- After -->
    <html data-mode="dark"></html>
  </html>
  ```

  ### Using the New Hook

  If you were using `useTheme` for mode management:

  ```typescript
  // Before
  const { mode, setMode } = useTheme();

  // After
  const { mode, setMode } = useThemeMode();
  ```

  ### CSS Selectors

  If you have custom CSS using the old selectors:

  ```css
  /* Before */
  [data-theme='dark'] {
    /* ... */
  }

  /* After */
  [data-mode='dark'] {
    /* ... */
  }
  ```

  ## Future Work (Phase 6)
  - Implement ocean/forest brand themes
  - Re-enable theme selector in Storybook
  - Support all 9 combinations (3 modes × 3 themes)

- ea09e6a: ## Summary
  Complete design system rebuild spanning token architecture modernization (Phases 0-4), utilities-based component system (Phase 5A), and CLI tooling (Phase 7A).

  ## Token System (Phases 0-4)

  **DTCG Migration**
  - 440 tokens migrated to Design Tokens Community Group standard with `$extensions.lufa` metadata
  - Added `lufa-` prefix to all CSS variables for namespacing
  - **Breaking**: Removed JS/TS token exports - tokens now CSS-only via variables

  ```css
  /* Before */
  import { spacing } from '@grasdouble/lufa_design-system-tokens';

  /* After */
  .component {
    padding: var(--lufa-spacing-md);
  }
  ```

  **Token Architecture**
  - Phase 1-2: Foundation and semantic layers
  - Phase 3: 78 semantic tokens added
  - Phase 4: Eliminated token collision warnings
  - Added `tokens-metadata.json` for documentation tooling

  ## Component System (Phase 5A)

  **New Utilities Generator**
  - CSS utilities system for consistent component styling
  - Replaces per-component CSS with composable utilities

  **Primitive Components**
  - `Box`: Foundation component with full utilities support
  - `Stack`: Layout component (vertical/horizontal)
  - `Text`: Typography with semantic variants
  - `Icon`: Lucide React integration

  **Display & Form Components**
  - `Badge`: Status indicators with semantic variants
  - `Divider`: Separator with emphasis patterns
  - `Button`: Refactored to two-dimensional architecture (variant × size)

  ## Developer Tools (Phase 7A)

  **CLI Theme Validator**

  ```bash
  pnpm ds:cli validate-theme path/to/theme.css
  ```

  - Format validation (CSS variable syntax)
  - Completeness checking (required tokens present)
  - WCAG contrast validation (AA/AAA)
  - Full Vitest coverage

  ## Documentation & Testing
  - Architecture docs: token architecture, component inventory, development guide
  - Storybook stories for all components with strict pattern compliance
  - Docusaurus API docs with live examples
  - Playwright component tests with visual regression
  - 256 VSCode token snippets

  ## Repository Organization
  - Archived legacy packages (storybook, playwright, docusaurus v1)
  - Consolidated BMAD analysis artifacts
  - Reorganized documentation hierarchy

  ## Breaking Changes
  - Token consumption: CSS variables only, no JS/TS imports
  - Button API: new two-dimensional architecture
  - Package structure: utilities-based approach replaces legacy pattern

  ## Migration

  See `packages/design-system/docusaurus/docs/migration-guide.md`

  ## Stats
  - 174 files added
  - 388 files deleted (legacy archived)
  - 47 files modified

- 445737d: # Spacing & Layout Tokens - Responsive Foundation System

  This release introduces a comprehensive spacing and layout token system with responsive breakpoints, height tokens, grid system, and automatic media query support.

  ## ⚠️ Breaking Changes

  ### 1. Box Component Padding/Margin "none" Bug Fix

  **FIXED:** `padding="none"` and `margin="none"` now correctly apply `0px` instead of the buggy `4px`.

  **Impact:** Components using `padding="none"` or `margin="none"` will change from 4px to 0px.

  **Migration Required:**

  If you need 4px spacing explicitly, use `padding="tight"` instead:

  ```diff
  # Components that need zero spacing (correct behavior)
  - <Box padding="none">  {/* Was incorrectly 4px */}
  + <Box padding="none">  {/* Now correctly 0px */}

  # Components that actually need 4px
  - <Box padding="none">  {/* Was incorrectly 4px */}
  + <Box padding="tight"> {/* Explicitly 4px */}
  ```

  **Root Cause:** `spacing-none` token was incorrectly defined as `4px`. Now fixed to `0px`.

  **Files Changed:**
  - `packages/design-system/main/src/components/Box/box.utilities.config.cjs`
  - CSS utilities regenerated (119 classes updated)

  ***

  ### 2. Storybook Breakpoint Change

  **CHANGED:** Storybook "small" viewport changed from `576px` to `640px` to align with new `breakpoint.sm` token.

  **Impact:** Storybook viewport presets only (no production code impact).

  **Action Required:** Review stories that explicitly target the "small" viewport.

  ***

  ## ✨ Features

  ### Breakpoint Tokens (6 new primitive tokens)

  Mobile-first, Tailwind-aligned breakpoint system:
  - `primitive.breakpoint.xs` - 320px (small mobile)
  - `primitive.breakpoint.sm` - 640px (large mobile)
  - `primitive.breakpoint.md` - 768px (tablet)
  - `primitive.breakpoint.lg` - 1024px (desktop)
  - `primitive.breakpoint.xl` - 1280px (large desktop)
  - `primitive.breakpoint.2xl` - 1536px (extra large)

  **Usage:**

  ```css
  /* CSS custom properties available */
  @media (min-width: 640px) {
    /* breakpoint.sm */
    .container {
      padding: var(--lufa-core-layout-page-padding);
    }
  }
  ```

  ***

  ### Height Tokens (8 new primitive tokens)

  Standardized heights for buttons, inputs, headers, and UI elements:
  - `primitive.height.24` - 24px (small chips, badges)
  - `primitive.height.32` - 32px (small buttons, inputs)
  - `primitive.height.40` - 40px (default buttons, inputs)
  - `primitive.height.48` - 48px (large buttons, headers)
  - `primitive.height.56` - 56px (hero buttons, mobile headers)
  - `primitive.height.64` - 64px (extra large buttons, desktop headers)
  - `primitive.height.80` - 80px (marketing sections)
  - `primitive.height.96` - 96px (hero sections)

  **Button Component Integration:**

  ```json
  {
    "component.button.height.sm": "{primitive.height.32}",
    "component.button.height.md": "{primitive.height.40}",
    "component.button.height.lg": "{primitive.height.48}"
  }
  ```

  ***

  ### Responsive Layout Tokens (18 new core tokens)

  Tokens that automatically adapt to viewport size via media queries:

  #### Page Padding (responsive)
  - `core.layout.page-padding.base` - 16px (mobile)
  - `core.layout.page-padding.md` - 24px (tablet, ≥768px)
  - `core.layout.page-padding.lg` - 32px (desktop, ≥1024px)

  #### Section Gap (responsive)
  - `core.layout.section-gap.base` - 48px (mobile)
  - `core.layout.section-gap.md` - 64px (tablet, ≥768px)
  - `core.layout.section-gap.lg` - 80px (desktop, ≥1024px)

  #### Container Gutter (responsive)
  - `core.layout.container-gutter.base` - 16px (mobile)
  - `core.layout.container-gutter.md` - 24px (tablet, ≥768px)
  - `core.layout.container-gutter.lg` - 32px (desktop, ≥1024px)

  #### Grid Gap (responsive)
  - `core.layout.grid-gap.base` - 16px (mobile)
  - `core.layout.grid-gap.md` - 24px (tablet, ≥768px)
  - `core.layout.grid-gap.lg` - 32px (desktop, ≥1024px)

  #### Header Height (responsive)
  - `core.layout.header-height.base` - 56px (mobile)
  - `core.layout.header-height.md` - 64px (tablet, ≥768px)
  - `core.layout.header-height.lg` - 64px (desktop, ≥1024px)

  #### Modal Padding (responsive)
  - `core.layout.modal-padding.base` - 24px (mobile)
  - `core.layout.modal-padding.md` - 32px (tablet, ≥768px)
  - `core.layout.modal-padding.lg` - 40px (desktop, ≥1024px)

  **Automatic Media Query Generation:**

  ```css
  /* Generated CSS output (mobile-first) */
  :root {
    --lufa-core-layout-page-padding: 16px; /* base (mobile) */
  }

  @media (min-width: 768px) {
    :root {
      --lufa-core-layout-page-padding: 24px; /* tablet */
    }
  }

  @media (min-width: 1024px) {
    :root {
      --lufa-core-layout-page-padding: 32px; /* desktop */
    }
  }
  ```

  ***

  ### Grid System Tokens (6 new core tokens)

  12-column grid system with semantic gap variants:
  - `core.layout.grid.columns` - 12 columns
  - `core.layout.grid.gap.tight` - 8px
  - `core.layout.grid.gap.default` - 16px
  - `core.layout.grid.gap.comfortable` - 24px
  - `core.layout.grid.gap.spacious` - 32px
  - `core.layout.grid.min-column-width` - 280px

  **Usage:**

  ```css
  .grid-container {
    display: grid;
    grid-template-columns: repeat(var(--lufa-core-layout-grid-columns), 1fr);
    gap: var(--lufa-core-layout-grid-gap-default);
  }
  ```

  ***

  ### Container Tokens (5 new core tokens)

  Max-width containers aligned with breakpoints:
  - `core.layout.container.sm` - 640px
  - `core.layout.container.md` - 768px
  - `core.layout.container.lg` - 1024px
  - `core.layout.container.xl` - 1280px
  - `core.layout.container.2xl` - 1536px

  **Usage:**

  ```css
  .container {
    max-width: var(--lufa-core-layout-container-lg);
    margin-inline: auto;
  }
  ```

  ***

  ### Fluid Spacing Tokens (4 new core tokens)

  CSS `clamp()` based tokens for smooth viewport scaling:
  - `core.layout.section-gap-fluid` - `clamp(48px, 8vw, 96px)`
  - `core.layout.hero-padding-fluid` - `clamp(32px, 6vw, 80px)`
  - `core.layout.container-gutter-fluid` - `clamp(16px, 4vw, 48px)`
  - `core.layout.page-margin-fluid` - `clamp(16px, 3vw, 32px)`

  **Usage:**

  ```css
  .hero-section {
    padding-block: var(--lufa-core-layout-hero-padding-fluid);
    /* Smoothly scales between 32px and 80px based on viewport */
  }
  ```

  ***

  ## 🔧 Build System Enhancements

  ### Custom Style Dictionary Transform: `attribute/responsive`

  Automatically detects responsive tokens and adds metadata for media query generation.

  **File:** `packages/design-system/tokens/build/transforms/responsive.js`

  ### Custom Style Dictionary Format: `css/variables-with-media-queries`

  Generates mobile-first CSS with automatic `@media` query overrides for responsive tokens.

  **File:** `packages/design-system/tokens/build/formats/css-with-media-queries.js`

  **Features:**
  - Mobile-first approach (base → md → lg)
  - Maintains theme mode support (light, dark, high-contrast)
  - Automatic breakpoint mapping
  - Clean, optimized CSS output

  ***

  ## 🗑️ Deprecations

  **3 tokens deprecated** (will be removed in v0.9.0):

  | Deprecated Token      | Replacement         | Migration          |
  | --------------------- | ------------------- | ------------------ |
  | `page-padding-mobile` | `page-padding.base` | Direct replacement |
  | `section-gap-mobile`  | `section-gap.base`  | Direct replacement |
  | `container-max-width` | `container.xl`      | Direct replacement |

  **Migration Commands:**

  ```bash
  # Find deprecated token usage
  grep -r "page-padding-mobile\|section-gap-mobile\|container-max-width" . --include="*.{css,json}"

  # Replace in CSS files
  find . -name "*.css" -exec sed -i '' 's/--lufa-core-layout-page-padding-mobile/--lufa-core-layout-page-padding/g' {} +
  find . -name "*.css" -exec sed -i '' 's/--lufa-core-layout-section-gap-mobile/--lufa-core-layout-section-gap/g' {} +
  find . -name "*.css" -exec sed -i '' 's/--lufa-core-layout-container-max-width/--lufa-core-layout-container-xl/g' {} +
  ```

  ***

  ## 📊 Metrics
  - **New tokens added:** 47 (14 primitive + 33 core layout)
  - **Tokens deprecated:** 3
  - **Components updated:** 2 (Box, Button)
  - **CSS file size:** 61.84 KB → 66.71 KB (+4.87 KB, +7.9%)
  - **Build system:** 2 custom transforms/formats added
  - **Responsive token groups:** 6 (18 variants total)

  ***

  ## 🔄 Migration Guide

  ### For Box Component Users

  **If using `padding="none"` or `margin="none"`:**
  1. **Test your components** - Spacing will change from 4px to 0px (correct behavior)
  2. **If you need 4px explicitly**, use `padding="tight"` instead
  3. **This is a bug fix** - 0px is the correct behavior for "none"

  **Example:**

  ```tsx
  // Before (buggy behavior)
  <Box padding="none"> {/* Was incorrectly 4px */}
    Content with unintended padding
  </Box>

  // After (correct behavior)
  <Box padding="none"> {/* Now correctly 0px */}
    Content with no padding
  </Box>

  // If you need 4px
  <Box padding="tight"> {/* Explicitly 4px */}
    Content with 4px padding
  </Box>
  ```

  ### For Custom Component Developers

  **Use new height tokens:**

  ```diff
  # Before
  .my-button {
  -  height: 40px;
  +  height: var(--lufa-primitive-height-40);
  }
  ```

  **Use responsive layout tokens:**

  ```diff
  # Before
  .my-container {
  -  padding: 16px;
  +  padding: var(--lufa-core-layout-page-padding);
    /* Automatically 16px → 24px → 32px */
  }
  ```

  **Use breakpoint tokens:**

  ```diff
  # Before
  -@media (min-width: 768px) {
  +@media (min-width: 768px) { /* breakpoint.md */
    .my-component {
      /* tablet styles */
    }
  }
  ```

  ### For Storybook Story Authors

  **Update viewport references:**

  ```diff
  # Before
  -parameters: {
  -  viewport: { defaultViewport: 'small' } // 576px
  -}

  # After
  +parameters: {
  +  viewport: { defaultViewport: 'small' } // 640px (breakpoint.sm)
  +}
  ```

  ***

  ## 🎯 Best Practices

  ### 1. Use Responsive Tokens for Layout

  ```css
  /* Good: Responsive token adapts automatically */
  .page-wrapper {
    padding: var(--lufa-core-layout-page-padding);
    /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
  }

  /* Avoid: Manual media queries for standard layouts */
  .page-wrapper {
    padding: 16px;
  }
  @media (min-width: 768px) {
    .page-wrapper {
      padding: 24px;
    }
  }
  ```

  ### 2. Use Fluid Tokens for Hero Sections

  ```css
  /* Good: Smooth scaling for marketing content */
  .hero {
    padding-block: var(--lufa-core-layout-hero-padding-fluid);
    /* Smoothly scales 32px → 80px */
  }
  ```

  ### 3. Use Height Tokens for UI Components

  ```css
  /* Good: Standardized heights */
  .custom-button {
    height: var(--lufa-primitive-height-40);
  }

  /* Avoid: Hard-coded heights */
  .custom-button {
    height: 40px;
  }
  ```

  ***

  ## 📚 Documentation

  Comprehensive guides available:
  - **Token Usage Guide:** `_bmad-output/subjects/spacing-layout-tokens/docs/token-usage-guide.md`
  - **Migration Guide:** `_bmad-output/subjects/spacing-layout-tokens/docs/migration-guide.md`
  - **Responsive Design Guide:** `_bmad-output/subjects/spacing-layout-tokens/docs/responsive-design-guide.md`
  - **Implementation Reports:**
    - Sprint 1: `_bmad-output/subjects/spacing-layout-tokens/implementation/sprint-1-report.md`
    - Sprint 2: `_bmad-output/subjects/spacing-layout-tokens/implementation/sprint-2-report.md`
    - Sprint 3: `_bmad-output/subjects/spacing-layout-tokens/implementation/sprint-3-testing-report.md`

  ***

  ## 🔗 Related ADRs
  - [ADR-005: Breakpoint Token Strategy](../../_bmad-output/adrs/ADR-005-IMPLEMENTED-breakpoint-token-strategy.md)
  - [ADR-006: Responsive Spacing Architecture](../../_bmad-output/adrs/ADR-006-IMPLEMENTED-responsive-spacing-architecture.md)
  - [ADR-007: Zero-Value Token Handling](../../_bmad-output/adrs/ADR-007-IMPLEMENTED-zero-value-token-handling.md)

  ***

  ## 🎉 What's Next

  **Phase 2D: Typography Tokens** (Coming next)
  - Responsive typography system
  - Letter-spacing tokens
  - Line-height refinements
  - Extended type scale (6xl-8xl)

  ***

  **Date:** 2026-01-26
  **Status:** Ready for Testing

### Patch Changes

- Updated dependencies [445737d]
- Updated dependencies [445737d]
- Updated dependencies [ea09e6a]
- Updated dependencies [445737d]
- Updated dependencies [445737d]
  - @grasdouble/lufa_design-system-tokens@0.5.0

## 0.7.1

### Patch Changes

- fb79222: Replace TypeScript token imports with CSS custom properties in component stories

  This change refactors 21 component story files to use CSS custom properties (CSS variables) instead of TypeScript token imports. This makes the Storybook more flexible and reduces build-time dependencies on the tokens package.

  **Files updated:**
  - Layout stories (10 files): AspectRatio, Center, Container, Divider, Flex, Grid, Layout, Placeholder, Space, Stack
  - Display stories (6 files): Avatar, AvatarGroup, Badge, Card, Kbd, Paper
  - Feedback stories (1 file): Alert
  - Forms stories (2 files): Button, Input
  - Navigation stories (2 files): Breadcrumb, Steps

  **Changes:**
  - Removed `import tokens from '@grasdouble/lufa_design-system-tokens'` from all story files
  - Replaced all token references (e.g., `tokens.color.text.primary`) with CSS custom properties (e.g., `'var(--lufa-token-color-text-primary)'`)
  - Maintained identical visual appearance and functionality

  **Benefits:**
  - Enables runtime theme switching through CSS custom properties
  - Reduces TypeScript compilation overhead in Storybook
  - Makes stories more aligned with modern CSS practices
  - Simplifies build dependencies

- Updated dependencies [fb79222]
  - @grasdouble/lufa_design-system-primitives@0.4.1
  - @grasdouble/lufa_design-system-tokens@0.4.1

## 0.7.0

### Minor Changes

- fef8ae4: Remove Tailwind CSS and migrate all components to vanilla CSS with design tokens

  BREAKING CHANGE: This package no longer includes Tailwind CSS. All styling now uses vanilla CSS with design token CSS custom properties.

  Migration completed:
  - 30 components migrated from Tailwind @apply to vanilla CSS
  - 570+ @apply directives converted
  - 159 theme() calls converted
  - All styling uses var(--lufa-token-\*) design tokens
  - Zero breaking changes to component APIs
  - Build size reduced, performance improved

  If you were importing Tailwind CSS from this package, you'll need to update your imports to use the new vanilla CSS entry point (style.css), which is automatically handled if you import from the main package export.

## 0.6.0

### Minor Changes

- 509bb8e: tokens and primitives are no more exposed

### Patch Changes

- 8ae7e61: change how css variable for token is generated. now there is the prefix --lufa-token
- 603f643: Button: fix css and split it in multiple file
  Avatar: fix role
- Updated dependencies [8ae7e61]
- Updated dependencies [509bb8e]
  - @grasdouble/lufa_design-system-tokens@0.4.0
  - @grasdouble/lufa_design-system-primitives@0.4.0

## 0.5.1

### Patch Changes

- 6c972e8: fix: prettier config
- 2d37fc0: Update dependencies
- 4d0893b: Update scripts and README files
- 57df928: chore: update lint and tsconfig
- 412c362: fix(chore): add missing prettier and eslint config + add a script prettier in package.json
- b101244: fix(chore): eslint config + fix new issues
- Updated dependencies [6c972e8]
- Updated dependencies [2d37fc0]
- Updated dependencies [4d0893b]
- Updated dependencies [57df928]
- Updated dependencies [0194d3d]
- Updated dependencies [412c362]
- Updated dependencies [b101244]
  - @grasdouble/lufa_design-system-primitives@0.3.0
  - @grasdouble/lufa_design-system-tokens@0.3.0

## 0.5.0

### Minor Changes

- 1f24429: Add navigation components and improve documentation

## 0.4.0

### Minor Changes

- 48c857f: Add missing layout components with documentation

## 0.3.1

### Patch Changes

- 93819d3: fix how to manage color on primitive
- Updated dependencies [93819d3]
  - @grasdouble/lufa_design-system-primitives@0.2.1
  - @grasdouble/lufa_design-system-tokens@0.2.1

## 0.3.0

### Minor Changes

- 501cf5f: Rework how primitive, tokens and ds is working + align storybook and docusaurus

### Patch Changes

- Updated dependencies [501cf5f]
  - @grasdouble/lufa_design-system-primitives@0.2.0
  - @grasdouble/lufa_design-system-tokens@0.2.0

## 0.2.0

### Minor Changes

- 6af7149: reorganize design-system splitting prmitive, tokens and the design system
- dba64f6: Add token, implement tailwind theme, update and add components
  _Note: Tailwind was later replaced with vanilla CSS tokens in January 2026_
- 6c4eb34: Add colors and improve placeholder component
- 1d9de21: Add divider component

### Patch Changes

- d4b9e09: Clean and fix storybook
- Updated dependencies [6af7149]
- Updated dependencies [d4b9e09]
  - @grasdouble/lufa_design-system-primitives@0.1.0
  - @grasdouble/lufa_design-system-tokens@0.1.0

## 0.1.2

### Patch Changes

- dceff77: Upgrade deps

## 0.1.1

### Patch Changes

- d4b3d7e: Add missing type for Spinner
  Fix peer dependencies

## 0.1.0

### Minor Changes

- 078d452: Add the spinner component

## 0.0.5

### Patch Changes

- cddcb85: Restart the DS using as a reference the DS shared by Github (Primer)
  First components added:
  - Placeholder
  - Stack

- 263a062: Add StackItem

## 0.0.4

### Patch Changes

- 10a531a: Storybook: Fix dark mode in Stories and Docs
  Design-System: Fix components following migration guide (v3 to v4)
  Both: Clean code

## 0.0.3

### Patch Changes

- b893e5b: Update publishConfig

## 0.0.2

### Patch Changes

- 7f3f723: Improve shared config (eslint and typescript) and apply change in packages

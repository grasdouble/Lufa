# @grasdouble/lufa_design-system-storybook

## 0.10.0

### Minor Changes

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

### Patch Changes

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

- 445737d: # Typography Tokens

  ## 🎉 New Features

  ### Letter-Spacing Tokens (5 new primitives)
  - `tighter` (-0.04em) - Display text, extra large headings
  - `tight` (-0.02em) - Large headings (H1-H3)
  - `normal` (0) - Body text (default)
  - `wide` (0.05em) - Small text, uppercase labels
  - `wider` (0.1em) - All-caps headings, button text

  **Use case:** Fine-tune typography for better readability, especially for uppercase text and large headings.

  ### Fluid Typography with clamp() (4 tokens updated)
  - `5xl`: `48px` → `clamp(2rem, 1.5rem + 2vw, 3rem)` (32px-48px)
  - `4xl`: `36px` → `clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)` (28px-36px)
  - `3xl`: `30px` → `clamp(1.5rem, 1.25rem + 1vw, 1.875rem)` (24px-30px)
  - `2xl`: `24px` → `clamp(1.25rem, 1rem + 1vw, 1.5rem)` (20px-24px)

  **Benefits:**
  - Automatic responsive scaling (no media queries needed)
  - Improved mobile typography (headings were too large)
  - Desktop sizes unchanged (backward compatible)
  - Browser support: 98% (Chrome 79+, Firefox 75+, Safari 13.1+)

  ### Badge Component Refactoring (3 tokens)
  - `badge-font-size-md`: `12px` → references `xs` primitive (12px)
  - `badge-font-size-lg`: `14px` → references `sm` primitive (14px)
  - `badge-font-size-sm`: `10px` (unchanged, no matching primitive)

  **Benefits:**
  - Better maintainability (uses token references)
  - No visual changes (same pixel values)
  - Cleaner token architecture

  ## 📚 Documentation (138 KB)

  ### New Comprehensive Guides
  1. **[Responsive Typography Guide](../_bmad-output/subjects/typography-tokens/docs/responsive-typography-guide.md)** (52 KB)
     - How CSS `clamp()` works (step-by-step)
     - Viewport calculations and formulas
     - Browser support matrix
     - Testing strategies
     - Accessibility compliance (WCAG 2.1)
     - 15+ code examples
  2. **[Letter-Spacing Usage Guide](../_bmad-output/subjects/typography-tokens/docs/letter-spacing-usage-guide.md)** (58 KB)
     - When to use each token (tighter → wider)
     - Font-size pairing recommendations
     - 20+ real-world component examples
     - Common mistakes with fixes
     - Typography science explained
  3. **[Migration Guide](../_bmad-output/subjects/typography-tokens/docs/migration-guide-v0-8-0.md)** (28 KB)
     - Step-by-step upgrade (~15 minutes)
     - Testing checklist (automated + manual)
     - Rollback plan
     - Before/after code comparisons
     - FAQ (10+ questions)

  ### Updated Documentation
  - **typography.md** - Fixed 4 sections:
    - Added 5xl to font-sizes table
    - Complete letter-spacing table (was only 3 tokens)
    - Updated responsive typography section (clamp examples)
    - Added fluid typography info boxes

  ## 🚨 Breaking Changes

  **None!** This release is **fully backward compatible**.
  - ✅ Desktop heading sizes unchanged (48px, 36px, 30px, 24px)
  - ✅ Mobile heading sizes improved (smaller, more appropriate)
  - ✅ Badge component visually identical
  - ✅ Body text (xs-xl) unchanged
  - ✅ Existing code works without modification

  ## 📊 Metrics
  - **Tokens added:** 5 new letter-spacing primitives
  - **Tokens updated:** 4 fluid font-sizes + 3 Badge tokens
  - **CSS size:** +540 bytes (66.71 KB → 67.25 KB)
  - **Budget used:** 96.1% (2.75 KB remaining)
  - **Documentation:** 227 KB (guides + reports)
  - **Browser support:** 98% (clamp)
  - **Implementation time:** 5 hours (3 sprints)

  ## 🔧 Migration

  ### Step 1: Update Packages

  ```bash
  pnpm update @grasdouble/lufa_design-system-tokens
  pnpm update @grasdouble/lufa_design-system
  ```

  ### Step 2: Rebuild

  ```bash
  pnpm build
  ```

  ### Step 3: Test (Recommended)

  Test headings at these viewports:
  - 320px (mobile) - Headings should be smaller
  - 768px (tablet) - Smooth scaling
  - 1280px (desktop) - Same as v0.7.x

  ### Step 4: Optional Improvements

  #### Add letter-spacing to large headings

  ```css
  .hero-title {
    font-size: var(--lufa-primitive-typography-font-size-5xl);
    letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
    /* Improves large heading appearance */
  }
  ```

  #### Add letter-spacing to uppercase labels

  ```css
  .label {
    text-transform: uppercase;
    letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
    /* Essential for uppercase readability */
  }
  ```

  ## 🎯 Architecture Decisions (ADRs)
  - **ADR-008:** Responsive Typography Strategy (fluid clamp for 4 headings)
  - **ADR-009:** Letter-Spacing Token Architecture (5 primitive tokens)
  - **ADR-010:** Extended Type Scale Strategy (defer 6xl-8xl to v0.9.0+)

  See: `_bmad-output/adrs/ADR-008`, `ADR-009`, `ADR-010`

  ## 🔗 Related Changes

  This changeset is part of a larger token system enhancement which includes:
  - **Phase 2B:** Color Token Refinement (38 tokens) - [color-token-refinement.md](./color-token-refinement.md)
  - **Phase 2C:** Spacing & Layout Tokens (47 tokens) - [spacing-layout-tokens.md](./spacing-layout-tokens.md)
  - **Phase 2D:** Typography Tokens (9 tokens) - This changeset

  **Total:** 94 tokens added/updated, +5.41 KB CSS

  ## 📖 Further Reading
  - [Full Typography Analysis](../_bmad-output/subjects/typography-tokens/analysis/)
  - [Technical Specification](../_bmad-output/subjects/typography-tokens/planning/technical-spec-typography.md)
  - [Implementation Reports](../_bmad-output/subjects/typography-tokens/implementation/)

  ## ⚡ Quick Start

  ```tsx
  import { Text } from '@grasdouble/lufa_design-system';

  // Fluid typography (automatic responsive)
  <Text variant="heading-5xl">Hero Title</Text>

  // With letter-spacing
  <h1 style={{
    fontSize: 'var(--lufa-primitive-typography-font-size-5xl)',
    letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tight)'
  }}>
    Large Heading
  </h1>

  // Uppercase label
  <span style={{
    textTransform: 'uppercase',
    letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-wide)'
  }}>
    Section Label
  </span>
  ```

  ## 🐛 Known Issues

  None - all validation tests passed.

  ## 🙏 Credits

  **Implementation:** BMad Master Agent
  **Architecture Review:** 9.5/10 (approved)
  **Time:** 5 hours (Foundation 2h + Docs 2h + Testing 1h)

- Updated dependencies [445737d]
- Updated dependencies [445737d]
- Updated dependencies [445737d]
- Updated dependencies [ea09e6a]
- Updated dependencies [445737d]
- Updated dependencies [445737d]
  - @grasdouble/lufa_design-system-tokens@0.5.0
  - @grasdouble/lufa_design-system-themes@0.4.0
  - @grasdouble/lufa_design-system@0.8.0

## 0.9.1

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
  - @grasdouble/lufa_design-system@0.7.1
  - @grasdouble/lufa_design-system-primitives@0.4.1
  - @grasdouble/lufa_design-system-tokens@0.4.1

## 0.9.0

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

### Patch Changes

- Updated dependencies [fef8ae4]
  - @grasdouble/lufa_design-system@0.7.0
  - @grasdouble/lufa_design-system-themes@0.3.0

## 0.8.0

### Minor Changes

- 509bb8e: Improve usage of primitives and tokens

### Patch Changes

- cf622f6: improve theme switcher
- Updated dependencies [8ae7e61]
- Updated dependencies [509bb8e]
- Updated dependencies [603f643]
- Updated dependencies [509bb8e]
- Updated dependencies [79857a3]
  - @grasdouble/lufa_design-system-tokens@0.4.0
  - @grasdouble/lufa_design-system@0.6.0
  - @grasdouble/lufa_design-system-primitives@0.4.0
  - @grasdouble/lufa_design-system-themes@0.2.2

## 0.7.0

### Minor Changes

- 0194d3d: Create a vscode extension to display value of primitives and tokens + fix usage of primitive and tokens

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
  - @grasdouble/lufa_design-system@0.5.1

## 0.6.0

### Minor Changes

- 1f24429: Add navigation components and improve documentation

### Patch Changes

- Updated dependencies [1f24429]
  - @grasdouble/lufa_design-system@0.5.0

## 0.5.0

### Minor Changes

- 48c857f: Add missing layout components with documentation

### Patch Changes

- Updated dependencies [48c857f]
  - @grasdouble/lufa_design-system@0.4.0

## 0.4.0

### Minor Changes

- 501cf5f: Rework how primitive, tokens and ds is working + align storybook and docusaurus

### Patch Changes

- Updated dependencies [501cf5f]
  - @grasdouble/lufa_design-system-primitives@0.2.0
  - @grasdouble/lufa_design-system-tokens@0.2.0
  - @grasdouble/lufa_design-system@0.3.0

## 0.3.0

### Minor Changes

- c4e20b6: Add Theme generator
- dba64f6: Add token, implement tailwind theme, update and add components
  _Note: Tailwind was later replaced with vanilla CSS tokens in January 2026_
- 1d9de21: Add divider component
- 6c4eb34: Improve stories + add story for colors

### Patch Changes

- 6af7149: follow changes in design-system
- 7def2ef: Remove tailwind dependency (migrated to vanilla CSS with design tokens)
- d4b9e09: Clean and fix storybook
- Updated dependencies [6af7149]
- Updated dependencies [dba64f6]
- Updated dependencies [6c4eb34]
- Updated dependencies [1d9de21]
- Updated dependencies [d4b9e09]
  - @grasdouble/lufa_design-system-tokens@0.1.0
  - @grasdouble/lufa_design-system@0.2.0

## 0.2.1

### Patch Changes

- dceff77: Upgrade deps
- 7c0d622: Upgrade to storybook 10
- Updated dependencies [dceff77]
  - @grasdouble/lufa_design-system@0.1.2

## 0.2.0

### Minor Changes

- 7363a88: Upgrade storybook to v9

## 0.1.1

### Patch Changes

- Updated dependencies [d4b3d7e]
  - @grasdouble/lufa_design-system@0.1.1

## 0.1.0

### Minor Changes

- 078d452: Add the spinner component

### Patch Changes

- Updated dependencies [078d452]
  - @grasdouble/lufa_design-system@0.1.0

## 0.0.5

### Patch Changes

- cddcb85: Restart the DS using as a reference the DS shared by Github (Primer)
  First components added:
  - Placeholder
  - Stack

- 263a062: Add StackItem
- Updated dependencies [cddcb85]
- Updated dependencies [263a062]
  - @grasdouble/lufa_design-system@0.0.5

## 0.0.4

### Patch Changes

- 10a531a: Storybook: Fix dark mode in Stories and Docs
  Design-System: Fix components following migration guide (v3 to v4)
  Both: Clean code
- Updated dependencies [10a531a]
  - @grasdouble/lufa_design-system@0.0.4

## 0.0.3

### Patch Changes

- b893e5b: Update publishConfig
- Updated dependencies [b893e5b]
  - @grasdouble/lufa_design-system@0.0.3

## 0.0.2

### Patch Changes

- 7f3f723: Improve shared config (eslint and typescript) and apply change in packages
- Updated dependencies [7f3f723]
  - @grasdouble/lufa_design-system@0.0.2

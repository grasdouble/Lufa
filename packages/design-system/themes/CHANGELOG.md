# @grasdouble/lufa_design-system-themes

## 0.5.0

### Minor Changes

- 2b70c8c: # Ocean & Forest Theme Implementation

  Complete implementation of two new brand themes (Ocean 🌊 and Forest 🌲) with full accessibility support across light, dark, and high-contrast modes.

  ## Themes Package (@grasdouble/lufa_design-system-themes)

  ### New Theme Implementations

  **Ocean Theme (🌊 Cyan/Teal Palette)**
  - Light mode primary: `#0891b2` (cyan-600) - Professional, trustworthy
  - Dark mode primary: `#22d3ee` (cyan-400) - Softer, accessible
  - Light mode secondary: `#14b8a6` (teal-500) - Complementary depth
  - Dark mode secondary: `#2dd4bf` (teal-400) - Harmonious pairing
  - Psychology: Calm, fluid, trustworthy
  - Use cases: Healthcare, travel, productivity apps

  **Forest Theme (🌲 Emerald/Green Palette)**
  - Light mode primary: `#059669` (emerald-600) - Growth-oriented, vibrant
  - Dark mode primary: `#34d399` (emerald-400) - Softer, eye-friendly
  - Light mode secondary: `#16a34a` (green-600) - Natural harmony
  - Dark mode secondary: `#4ade80` (green-400) - Balanced pairing
  - Psychology: Growth, natural, healthy
  - Use cases: Eco-brands, wellness, financial growth

  ### Token Architecture

  **Efficient Cascade System:**
  - Only 6 core brand tokens overridden per theme
  - 27+ semantic/component tokens cascade automatically
  - Zero component changes required for theme switching

  **Attribute-Based Theming:**

  ```css
  [data-color-theme='ocean'] {
    /* Ocean overrides */
  }
  [data-color-theme='forest'] {
    /* Forest overrides */
  }
  ```

  **Mode Support:**
  - All themes support 3 modes: `light`, `dark`, `high-contrast`
  - Total configurations: 3 themes × 3 modes = 9 variations
  - WCAG AA/AAA compliant across all combinations

  ### Files Modified
  - `src/ocean.css` - Complete Ocean theme implementation
  - `src/forest.css` - Complete Forest theme implementation
  - Updated CSS custom properties for theme tokens

  ## Storybook (@grasdouble/lufa_design-system-storybook)

  ### Theme Architecture Stories

  **New Educational Stories (6 total):**
  1. **Overview** - Visual hierarchy of token architecture
  2. **Themeable vs Non-Themeable** - Side-by-side comparison
  3. **Mode-Aware Tokens** - Light/Dark/High-Contrast behavior
  4. **Primitive Immutability** - Demonstration of constant values
  5. **Token Reference Chains** - Component → Semantic → Primitive flow
  6. **Component Examples** - Real buttons, badges, cards

  **Helper Components (4 new):**
  - `TokenCard.tsx` - Display individual token properties (260 lines)
  - `TokenComparison.tsx` - Compare themeable vs non-themeable (235 lines)
  - `TokenMatrix.tsx` - Grid view of multiple tokens (332 lines)
  - `TokenReferenceChain.tsx` - Visualize reference chains (255 lines)

  **Theme Comparison Story:**
  - Single comprehensive story for theme testing
  - Interactive toolbar for theme/mode switching
  - Shows which components change with theme (brand colors)
  - Shows which components DON'T change (semantic success/error)

  ### Features
  - Real-time CSS variable value display with MutationObserver
  - Color-coded by token level (primitive/semantic/component)
  - Interactive testing with Storybook toolbar
  - Educational content with best practices
  - Full ESLint compliance (0 errors, 0 warnings)

  ## Docusaurus (@grasdouble/lufa_design-system-docusaurus)

  ### Documentation Updates

  **Updated Files (3):**
  1. **`docs/getting-started/theming.md`**
     - Updated architecture diagram to 3-layer system
     - Added Ocean & Forest theme documentation
     - Replaced ~50 old token references with ADR-011 conventions
     - Added primitive immutability explanation (Math.PI analogy)
     - Documented mode vs theme distinction
     - Added comprehensive best practices
  2. **`docs/tokens/colors.md`**
     - Updated token architecture section
     - Added mode-awareness documentation
     - Replaced 54 token references
     - Added primitive color scale warnings
  3. **`docs/tokens/spacing.md`**
     - Added token layer classification
     - Updated 26 spacing examples
     - Added semantic vs primitive best practices

  **Statistics:**
  - Old token references removed: ~100
  - New ADR-011 token references added: 185
  - Build status: ✅ SUCCESS (0 errors)

  ## Impact

  ✅ **3 Brand Themes Available** - Default (Blue/Purple), Ocean (Cyan/Teal), Forest (Emerald/Green)
  ✅ **9 Total Configurations** - 3 themes × 3 modes (light/dark/high-contrast)
  ✅ **Instant Theme Switching** - No component changes needed
  ✅ **WCAG Compliant** - All modes meet AA/AAA standards
  ✅ **Token Cascade** - 6 overrides → 27+ tokens change automatically
  ✅ **Educational Documentation** - 7 interactive Storybook stories
  ✅ **Updated Official Docs** - 185 token references corrected
  ✅ **Architect Approved** - 9.8/10 quality rating

  ## Usage

  **HTML Attributes:**

  ```html
  <!-- Theme Selection -->
  <html data-color-theme="ocean">
    <!-- or "forest" or "default" -->
    <html data-color-theme="forest">
      <!-- Mode Selection -->
      <html data-mode="light">
        <!-- or "dark" or "high-contrast" -->
        <html data-mode="dark">
          <html data-mode="high-contrast"></html>
        </html>
      </html>
    </html>
  </html>
  ```

  **Example Combinations:**
  - Ocean + Light mode
  - Ocean + Dark mode
  - Forest + High-contrast mode
  - Default + Dark mode
  - etc. (9 total combinations)

  ## Migration Notes

  **No Breaking Changes** - Fully backward compatible:
  - Default theme behavior unchanged
  - Existing token references work as-is
  - Components automatically adapt to new themes
  - CSS custom properties remain stable

  **Opt-in** - Theme selection is optional:
  - Default theme used if no `data-color-theme` attribute
  - Themes can be switched at runtime via JavaScript
  - No rebuild required for theme changes

  ## Testing

  All themes tested across:
  - ✅ Storybook interactive stories
  - ✅ Component library (buttons, badges, cards, links)
  - ✅ All 3 modes (light/dark/high-contrast)
  - ✅ WCAG contrast validation
  - ✅ Build pipeline (tokens → themes → CSS)

  ## Files Modified Summary

  **Themes Package (2 files):**
  - `src/ocean.css` (new implementation)
  - `src/forest.css` (new implementation)

  **Storybook Package (8 new files):**
  - `src/components/helpers/TokenCard.tsx` (260 lines)
  - `src/components/helpers/TokenComparison.tsx` (235 lines)
  - `src/components/helpers/TokenMatrix.tsx` (332 lines)
  - `src/components/helpers/TokenReferenceChain.tsx` (255 lines)
  - `src/components/helpers/index.ts` (6 lines)
  - `src/stories/tokens/ThemeArchitecture.stories.tsx` (1,139 lines)
  - `src/stories/tokens/ThemeComparison.stories.tsx` (409 lines)
  - `.storybook/ThemeAndModeWrapper.tsx` (67 lines - extracted from preview.tsx)
  - Total: 2,703 lines of new code

  **Docusaurus Package (3 files):**
  - `docs/getting-started/theming.md`
  - `docs/tokens/colors.md`
  - `docs/tokens/spacing.md`
  - 558 insertions, 262 deletions

  **Total:** 13 files modified/added across 3 packages

### Patch Changes

- Updated dependencies [3b444f4]
- Updated dependencies [ceeaacc]
- Updated dependencies [058d6d6]
- Updated dependencies [e3380ec]
- Updated dependencies [e3380ec]
  - @grasdouble/lufa_design-system-tokens@0.6.0

## 0.4.0

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

- 445737d: # Dependency Updates & Documentation Improvements

  ## CLI Package

  ### Documentation Enhancements
  - **README.md expanded** (+370 lines)
    - Comprehensive validation checks explanation (completeness, contrast, format)
    - Multi-mode theme validation examples (light, dark, high-contrast)
    - CI/CD integration guides (GitHub Actions, pre-commit hooks, NPM scripts)
    - CLI options reference with examples
    - Token role metadata documentation
    - Customization patterns and best practices
  - **Theme template enhanced** (`src/templates/theme-template.css`)
    - Added 3 customization patterns with code examples
    - Added 5 best practices for theme development
    - Added 3 practical examples (brand colors, warm palette, high-contrast)
    - Improved inline documentation for developers

  ### Dependency Updates
  - `chalk`: 5.4.1 → 5.6.2 (terminal color output)
  - `postcss`: 8.5.1 → 8.5.6 (CSS parsing)
  - `@types/node`: 25.0.9 → 25.0.10
  - `@vitest/coverage-v8`: 4.0.17 → 4.0.18
  - `vitest`: 4.0.17 → 4.0.18 (test framework)
  - `prettier`: 3.8.0 → 3.8.1

  ## Playwright Package

  ### Token Reference Updates
  - Updated Box component spec to use new semantic overlay token:
    - `--lufa-token-color-background-overlay` → `--lufa-semantic-ui-overlay-backdrop`
    - Aligns with Phase 2A semantic token architecture
    - Maintains test compatibility

  ### Dependency Updates
  - `@playwright/experimental-ct-react`: 1.57.0 → 1.58.0 (Playwright component testing)
  - `@types/node`: 25.0.9 → 25.0.10
  - `@types/react`: 19.2.8 → 19.2.9
  - `eslint`: 9.22.0 → 9.39.2

  ## Themes Package

  ### Theme Placeholder Documentation
  - **Forest theme** (`src/forest.css`)
    - Enhanced documentation for Phase 6 implementation
    - Added usage example with data attributes
    - Added example token overrides structure (brand colors)
    - Clarified implementation roadmap
  - **Ocean theme** (`src/ocean.css`)
    - Enhanced documentation for Phase 6 implementation
    - Added usage example with data attributes
    - Added example token overrides structure (brand colors)
    - Clarified implementation roadmap

  ### Dependency Updates
  - `@types/node`: 25.0.9 → 25.0.10
  - `prettier`: 3.8.0 → 3.8.1

  ## Impact

  **CLI**: Significantly improved developer experience with comprehensive documentation and examples
  **Playwright**: Maintained test suite compatibility with Phase 2A token architecture
  **Themes**: Clearer Phase 6 implementation guidance for theme developers

  **Breaking Changes**: None

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

- Updated dependencies [445737d]
- Updated dependencies [445737d]
- Updated dependencies [ea09e6a]
- Updated dependencies [445737d]
- Updated dependencies [445737d]
  - @grasdouble/lufa_design-system-tokens@0.5.0

## 0.3.0

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

## 0.2.2

### Patch Changes

- 79857a3: Improve themes and Readme
- Updated dependencies [8ae7e61]
- Updated dependencies [509bb8e]
  - @grasdouble/lufa_design-system-tokens@0.4.0

## 0.2.1

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
  - @grasdouble/lufa_design-system-tokens@0.3.0

## 0.2.0

### Minor Changes

- 501cf5f: Rework how primitive, tokens and ds is working + align storybook and docusaurus

### Patch Changes

- Updated dependencies [501cf5f]
  - @grasdouble/lufa_design-system-tokens@0.2.0

## 0.1.0

### Minor Changes

- 6af7149: reorganize design-system splitting prmitive, tokens and the design system

### Patch Changes

- Updated dependencies [6af7149]
- Updated dependencies [d4b9e09]
  - @grasdouble/lufa_design-system-tokens@0.1.0

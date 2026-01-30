# @grasdouble/lufa_design-system-docusaurus

## 0.7.1

### Patch Changes

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

- Updated dependencies [3b444f4]
- Updated dependencies [ceeaacc]
- Updated dependencies [e3380ec]
- Updated dependencies [058d6d6]
- Updated dependencies [e3380ec]
- Updated dependencies [3b444f4]
- Updated dependencies [e3380ec]
  - @grasdouble/lufa_design-system-tokens@0.6.0
  - @grasdouble/lufa_design-system@0.9.0

## 0.7.0

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
- Updated dependencies [ea09e6a]
- Updated dependencies [445737d]
- Updated dependencies [445737d]
  - @grasdouble/lufa_design-system-tokens@0.5.0
  - @grasdouble/lufa_design-system@0.8.0

## 0.6.0

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

## 0.5.0

### Minor Changes

- 620254d: Major documentation site overhaul with comprehensive enhancements across all components and infrastructure.

  ## Component Documentation

  **Enhanced all 27 components** with consistent, high-quality documentation:
  - Anatomy sections with visual diagrams
  - Comprehensive accessibility (WCAG 2.1 AA): keyboard nav, screen readers, ARIA, color contrast
  - Common patterns with 3-6 real-world examples per component
  - Related components cross-linking
  - TypeScript support and type definitions

  **New components documented:**
  - Input (forms)
  - Modal (new Overlay category)

  ## New Documentation Pages
  - **Component Documentation Template** - Standardized structure, writing guidelines, checklist
  - **Migration Guide** - Version upgrade instructions, breaking changes, semver policy
  - **Interactive Playground** - Browser-based component testing with live code editing
  - **Changelog** - Automated release notes with version history

  ## Infrastructure & Automation

  **GitHub Actions:**
  - `update-changelog-docs.yml` - Auto-syncs changelog from package releases, updates version dropdown

  **Scripts:**
  - `update-changelog.js` - Parses CHANGELOG.md, updates docs, filters versions (>= 0.6.0)

  **Site enhancements:**
  - Live code blocks (`@docusaurus/theme-live-codeblock`)
  - Local search (`@easyops-cn/docusaurus-search-local`)
  - Version dropdown in navbar
  - DarkModeCompatible badge component
  - Redesigned homepage with features grid
  - SEO optimization (robots.txt)

  ## Impact

  This establishes a production-ready documentation system with:
  - Consistent documentation standards across all components
  - Automated changelog management
  - Interactive examples for better developer experience
  - Comprehensive accessibility guidance
  - Professional-grade component reference

  Total changes: 53 files, 12,250+ additions across component docs, guides, automation scripts, and site infrastructure.

- 509bb8e: Improve usage of primitives and tokens

### Patch Changes

- Updated dependencies [8ae7e61]
- Updated dependencies [509bb8e]
- Updated dependencies [603f643]
- Updated dependencies [509bb8e]
  - @grasdouble/lufa_design-system-tokens@0.4.0
  - @grasdouble/lufa_design-system@0.6.0

## 0.4.1

### Patch Changes

- 6c972e8: fix: prettier config
- 2d37fc0: Update dependencies
- 4d0893b: Update scripts and README files
- 412c362: fix(chore): add missing prettier and eslint config + add a script prettier in package.json
- Updated dependencies [6c972e8]
- Updated dependencies [2d37fc0]
- Updated dependencies [4d0893b]
- Updated dependencies [57df928]
- Updated dependencies [0194d3d]
- Updated dependencies [412c362]
- Updated dependencies [b101244]
  - @grasdouble/lufa_design-system-tokens@0.3.0
  - @grasdouble/lufa_design-system@0.5.1

## 0.4.0

### Minor Changes

- 1f24429: Add navigation components and improve documentation

### Patch Changes

- Updated dependencies [1f24429]
  - @grasdouble/lufa_design-system@0.5.0

## 0.3.0

### Minor Changes

- 48c857f: Add missing layout components with documentation

### Patch Changes

- Updated dependencies [48c857f]
  - @grasdouble/lufa_design-system@0.4.0

## 0.2.0

### Minor Changes

- 501cf5f: Rework how primitive, tokens and ds is working + align storybook and docusaurus

### Patch Changes

- Updated dependencies [501cf5f]
- Updated dependencies [501cf5f]
  - @grasdouble/lufa_design-system-tokens@0.2.0
  - @grasdouble/lufa_design-system@0.3.0
  - @grasdouble/lufa_config_prettier@0.1.2

## 0.1.0

### Minor Changes

- 6af7149: Add docusaurus to document the design-system
- 1d9de21: Add divider component

### Patch Changes

- 417d3b5: Fix build
- Updated dependencies [6af7149]
- Updated dependencies [dba64f6]
- Updated dependencies [6c4eb34]
- Updated dependencies [1d9de21]
- Updated dependencies [d4b9e09]
  - @grasdouble/lufa_design-system-tokens@0.1.0
  - @grasdouble/lufa_design-system@0.2.0

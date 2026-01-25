# @grasdouble/lufa_design-system-docusaurus

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

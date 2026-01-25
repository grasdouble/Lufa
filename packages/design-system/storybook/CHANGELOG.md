# @grasdouble/lufa_design-system-storybook

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

# @grasdouble/lufa_design-system

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

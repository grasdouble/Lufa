# @grasdouble/lufa_design-system-themes

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

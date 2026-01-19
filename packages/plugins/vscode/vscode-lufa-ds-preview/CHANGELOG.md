# @grasdouble/lufa_plugin_vscode_lufa-ds-preview

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

## 0.2.0

### Minor Changes

- 8ae7e61: Add support of completion and improve code

### Patch Changes

- Updated dependencies [8ae7e61]
- Updated dependencies [509bb8e]
  - @grasdouble/lufa_design-system-tokens@0.4.0
  - @grasdouble/lufa_design-system-primitives@0.4.0

## 0.1.0

### Minor Changes

- 0194d3d: Create a vscode extension to display value of primitives and tokens + fix usage of primitive and tokens

### Patch Changes

- Updated dependencies [6c972e8]
- Updated dependencies [2d37fc0]
- Updated dependencies [4d0893b]
- Updated dependencies [57df928]
- Updated dependencies [0194d3d]
- Updated dependencies [412c362]
- Updated dependencies [b101244]
  - @grasdouble/lufa_design-system-primitives@0.3.0
  - @grasdouble/lufa_design-system-tokens@0.3.0

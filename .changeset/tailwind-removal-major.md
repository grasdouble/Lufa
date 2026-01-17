---
"@grasdouble/lufa_design-system": major
---

Remove Tailwind CSS and migrate all components to vanilla CSS with design tokens

BREAKING CHANGE: This package no longer includes Tailwind CSS. All styling now uses vanilla CSS with design token CSS custom properties.

Migration completed:
- 30 components migrated from Tailwind @apply to vanilla CSS
- 570+ @apply directives converted
- 159 theme() calls converted
- All styling uses var(--lufa-token-*) design tokens
- Zero breaking changes to component APIs
- Build size reduced, performance improved

If you were importing Tailwind CSS from this package, you'll need to update your imports to use the new vanilla CSS entry point (style.css), which is automatically handled if you import from the main package export.

---
"@grasdouble/lufa_design-system": minor
"@grasdouble/lufa_design-system-docusaurus": patch
---

Remove global CSS @layer declarations for improved component library compatibility

This change transitions the Lufa Design System from an application framework approach to a component library approach by removing all global CSS @layer declarations.

**What changed:**
- Removed `@layer base, components, utilities` from global CSS
- Removed `@layer` wrappers from all 33 component CSS Module files
- Updated Docusaurus integration to import only tokens and themes (not foundation reset)
- Fixed Docusaurus light mode visibility issues caused by layer cascade conflicts

**Why this matters:**
- ✅ Better compatibility with documentation frameworks (Docusaurus, Nextra, etc.)
- ✅ No CSS cascade conflicts with host application stylesheets
- ✅ Component scoping still guaranteed via CSS Modules
- ✅ Follows patterns used by major design systems (Material UI, Chakra, Radix)

**Migration notes:**
- No breaking changes to component APIs
- CSS Modules already provide necessary scoping
- Foundation reset is still available via `@grasdouble/lufa_design-system/style.css`
- For minimal integration, import only tokens: `@grasdouble/lufa_design-system-tokens/style.css`

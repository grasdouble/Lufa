---
"@grasdouble/lufa_design-system": minor
"@grasdouble/lufa_design-system-docusaurus": patch
---

Remove global CSS @layer declarations and make foundation reset optional

This change transitions the Lufa Design System from an application framework approach to a component library approach by removing all global CSS @layer declarations and making the foundation reset optional.

**What changed:**
- Removed `@layer base, components, utilities` from global CSS
- Removed `@layer` wrappers from all 33 component CSS Module files
- Split CSS into two entry points:
  - `style.css`: Tokens + utilities only (no reset) - **Default**
  - `foundation.css`: Includes global reset + tokens + utilities
- Updated Docusaurus to use `style.css` directly (no separate token imports needed)
- Fixed Docusaurus light mode visibility issues caused by layer cascade conflicts

**New import patterns:**

```css
/* Documentation sites / apps with existing styles (recommended) */
@import '@grasdouble/lufa_design-system/style.css';
@import '@grasdouble/lufa_design-system-themes/default.css';

/* Standalone apps that need a global reset */
@import '@grasdouble/lufa_design-system/foundation.css';
@import '@grasdouble/lufa_design-system-themes/default.css';
```

**Why this matters:**
- ✅ Better compatibility with documentation frameworks (Docusaurus, Nextra, etc.)
- ✅ No CSS cascade conflicts with host application stylesheets
- ✅ Foundation reset is now opt-in, not forced
- ✅ Component scoping still guaranteed via CSS Modules
- ✅ Follows patterns used by major design systems (Material UI, Chakra, Radix)

**Migration notes:**
- No breaking changes to component APIs
- Existing imports of `@grasdouble/lufa_design-system/style.css` will now **exclude** the foundation reset
- If you need the reset, switch to `@grasdouble/lufa_design-system/foundation.css`
- Components continue to work with CSS Modules providing scoping

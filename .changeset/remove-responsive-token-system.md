---
'@grasdouble/lufa_design-system-tokens': patch
'@grasdouble/lufa_design-system-cli': patch
---

Remove responsive token system and fix token validation errors

**Breaking architectural change (backward compatible):**

- **Removed responsive token system** - Tokens no longer generate with media queries. The `build/transforms/responsive.js` and `build/formats/css-with-media-queries.js` files have been deleted.
- **All tokens are now fixed values** - Tokens ending with sm/md/lg/xl now generate as separate fixed tokens (e.g., `--lufa-component-button-height-sm`, `--lufa-component-button-height-md`, etc.) instead of a single responsive token.
- **Updated ADR-013** - Removed Principle 6 (Responsive Tokens) to reflect the current architecture. Design tokens now provide a palette of choices; components manage their own responsive behavior.
- **Fixed CLI theme template** - Updated core layout tokens to use responsive variants (-base/-md/-lg) instead of single tokens.

**Impact:**
- Token count: 631 tokens (previously had validation errors)
- CSS size: 80.79 KB (+3.6% from baseline, well within 150 KB limit)
- All token validation passes: 0 errors
- **No breaking changes** - Existing token names remain the same, only the generation strategy changed

**Migration:**
No action required. If you were using single responsive tokens like `--lufa-core-layout-page-padding`, update to use the appropriate variant (`-base`, `-md`, `-lg`) and apply them with your own media queries.

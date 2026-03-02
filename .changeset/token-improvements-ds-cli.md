---
'@grasdouble/lufa_design-system-cli': minor
---

Add graduated theme templates and update validators for new token architecture

**New theme templates:**

- `theme-template-starter.css` - Minimal template with essential tokens only (~156 variables)
- `theme-template-extended.css` - Intermediate template with common customization tokens (~522 variables)
- `theme-template-advanced.css` - Full template exposing all available tokens (~1521 variables)
- Updated `theme-template.css` to reflect the new token naming conventions

**Validator improvements:**

- `format.ts` - Updated to validate new `core/color/brand`, `core/color/feedback`, `core/color/neutral` token namespaces
- `contrast.ts` - Adjusted contrast checks for new feedback color tokens
- `parse-css.ts` - Minor parsing fix

---
'@grasdouble/lufa_design-system-themes': minor
---

Align all themes to new token architecture with feedback and neutral color tokens

All 10 themes (ocean, forest, matrix, cyberpunk, sunset, nordic, volcano, coffee, steampunk, volt) have been updated to:

- Rename `core/brand` tokens to `core/color/brand` namespace
- Replace `core/semantic` color tokens with `core/color/feedback` (success, error, warning, info) with extended states (`active`, `on-background`)
- Add `core/color/neutral/surface-raised` and `core/color/neutral/surface-active` surface tokens
- Remove deprecated `_token-template.css` internal template file
- Add graduated theme template system (`starter`, `extended`, `advanced`) via CLI

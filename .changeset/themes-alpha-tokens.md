---
'@grasdouble/lufa_design-system-themes': minor
---

Add alpha (transparency) tokens and accessibility validation to all themes

**New Features:**

- **Alpha tokens (54 new tokens per theme)** - Added 9 levels of transparency (3%, 5%, 8%, 10%, 15%, 20%, 30%, 40%, 50%) for each semantic color:
  - `--lufa-color-alpha-primary-{3,5,8,10,15,20,30,40,50}`
  - `--lufa-color-alpha-secondary-{3,5,8,10,15,20,30,40,50}`
  - `--lufa-color-alpha-success-{3,5,8,10,15,20,30,40,50}`
  - `--lufa-color-alpha-error-{3,5,8,10,15,20,30,40,50}`
  - `--lufa-color-alpha-warning-{3,5,8,10,15,20,30,40,50}`
  - `--lufa-color-alpha-info-{3,5,8,10,15,20,30,40,50}`
- **RGB variables** - Added base RGB values for alpha token computation:
  - `--lufa-primary-rgb`, `--lufa-secondary-rgb`, `--lufa-success-rgb`, `--lufa-error-rgb`, `--lufa-warning-rgb`, `--lufa-info-rgb`
- **Visited link token** - Added `--lufa-core-brand-accent-visited` for better link state management

**Improvements:**

- **New validation script** - Replaced `validate-conventions.ts` with `validate-a11y.ts` for comprehensive accessibility checks (WCAG contrast ratios)
- **Updated documentation** - Simplified README, removed verbose architecture docs, added clearer usage examples
- **Removed obsolete docs** - Deleted `TOKENS_CONVENTIONS.md` and `theme-switching-guide.md` (information now in README)

**Impact:**
- All 10 themes updated: ocean, forest, matrix, cyberpunk, sunset, nordic, volcano, coffee, steampunk, volt
- ~1950 lines added (mostly alpha tokens)
- Better support for glassmorphism, overlays, and subtle UI effects
- Improved accessibility validation during build

**Migration:**
No breaking changes. New tokens are additive. Existing code continues to work unchanged.

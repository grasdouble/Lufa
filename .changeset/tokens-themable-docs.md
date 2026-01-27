---
"@grasdouble/lufa_design-system-tokens": minor
---

docs(tokens): add comprehensive themable attribute documentation and validation

Implement all architect recommendations for design token themable attribute governance.

**Documentation:**
- Add `THEMABLE_ATTRIBUTE.md`: Complete guide with rules, examples, and FAQ
  - Rule: color/shadow tokens = `themable: true` (visual appearance changes with theme)
  - Rule: dimension/duration/number tokens = `themable: false` (structural consistency)
  - 6 FAQ items covering edge cases and architectural reasoning
  - Quick reference table for all token types
- Add `NAMING_CONVENTIONS.md`: Token naming structure guide
  - Naming patterns by hierarchy level (primitive/core/semantic/component)
  - CSS variable format conventions
  - Complete Button component example showing all token types
  - Validation checklist for contributors

**Validation Enhancements:**
- Add 9 automatic validation rules to `validate-token-metadata.js`:
  - Colors MUST have `themable: true`
  - Shadows MUST have `themable: true`
  - Dimensions MUST have `themable: false`
  - Durations MUST have `themable: false`
  - Numbers MUST have `themable: false`
  - CubicBezier MUST have `themable: false`
  - FontFamily/FontWeight warnings if `themable: true`
  - Gradients warning if `themable: false`
- Enhanced error messages with visual rule formatting
- All 551 tokens pass validation (100% compliance)

**Regression Tests:**
- Add `__tests__/themable-validation.test.js`: 8 comprehensive test suites
- Automated validation of all themable rules
- Run via: `npm test` (in tokens package)
- All tests passing (8/8)

**Impact:**
- Files changed: 7 (+1,895 lines)
- Result: 551 tokens at 100% themable compliance with automated validation
- No breaking changes - documentation and tooling improvements only

**Architect Review:** Winston (all 4 recommendations implemented)

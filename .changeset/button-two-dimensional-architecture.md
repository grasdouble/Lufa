---
"@grasdouble/lufa_design-system": minor
"@grasdouble/lufa_design-system-storybook": minor
---

feat(design-system): refactor Button component to two-dimensional architecture

**Breaking Changes:**
- Button component now uses two-dimensional variant system: `type` (solid/outline/ghost) + `variant` (primary/secondary/success/danger/warning/info/neutral)
- Old single-dimension `variant` prop replaced with `type` + `variant` combination
- Migration: `variant="primary"` → `type="solid" variant="primary"` (or omit for defaults)

**New Features:**
- 21 button combinations (3 types × 7 variants)
- Button-specific component tokens (--lufa-component-button-*)
- Proper semantic color variants: success, danger, warning, info, neutral
- Loading state with loader icon
- Enhanced hover/active states with token variants
- WCAG 2.1 AA accessibility compliance

**Token Architecture:**
- Component layer: --lufa-component-button-* (highest priority)
- Semantic layer: --lufa-semantic-button-*, --lufa-core-semantic-*
- Core layer: --lufa-core-brand-*, --lufa-core-neutral-*
- Primitive layer: --lufa-primitive-color-* (fallback only)

**Documentation:**
- 12 consolidated Storybook stories with TypeScript token usage
- Colors token visualization story
- Complete API documentation

**Components:**
- Button: Complete two-dimensional implementation
- Icon: Added loader icon for button loading state

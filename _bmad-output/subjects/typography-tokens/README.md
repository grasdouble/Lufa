# Subject: Typography Tokens

**Status:** 📋 Planning Phase Complete (Phase 2 ✅)  
**Priority:** High  
**Design System Version:** Lufa v0.7.1  
**Created:** January 26, 2026

---

## Overview

Comprehensive analysis and enhancement of the **typography token system** in Lufa Design System. This subject focuses on evaluating the current three-tiered typography architecture (primitives → core → semantic → component), identifying gaps, and defining requirements for a robust, responsive, and accessible typography system.

### Subject Goals

1. ✅ **Audit** current typography tokens (font families, sizes, weights, line heights)
2. ✅ **Identify** problems and gaps (responsive typography, letter-spacing, composite tokens)
3. ✅ **Research** industry best practices (Material Design, Tailwind, Radix, Adobe Spectrum)
4. ✅ **Define** requirements for typography system enhancement
5. 🔄 **Plan** implementation strategy (Phase 2)
6. ⏳ **Implement** enhancements (Phase 3)
7. ⏳ **Document** system and migration guide (Phase 4)

---

## Current Status

### Phase 1: Analysis ✅ COMPLETE

**Completion Date:** January 26, 2026

**Key Findings:**

- ✅ **Strong foundation:** Well-structured three-tier token architecture (primitives → semantic → component)
- ✅ **Accessibility:** WCAG 2.1 AA compliant (1.5 line-height, 16px base size)
- ✅ **Performance:** Zero-weight system fonts with excellent cross-platform coverage
- ⚠️ **Critical gaps:** No responsive typography, missing letter-spacing tokens, hardcoded component values
- ⚠️ **Inconsistencies:** Documentation references non-existent tokens, Badge component uses hardcoded sizes

**Overall Assessment:** 70% complete - Enhance existing system rather than rebuild

**See full analysis:** [`analysis/typography-analysis-2026-01-26.md`](./analysis/typography-analysis-2026-01-26.md)

---

### Phase 2: Planning ✅ COMPLETE

**Completion Date:** January 26, 2026

**Key Decisions (ADRs):**

- ✅ **ADR-008:** Responsive typography strategy → Conservative fluid clamp() for 4 heading tokens (2xl-5xl)
- ✅ **ADR-009:** Letter-spacing token architecture → 5 primitive tokens (tighter, tight, normal, wide, wider)
- ✅ **ADR-010:** Extended type scale strategy → DEFER 6xl-8xl to v0.9.0+ (no current demand)

**Planning Artifacts:**

- ✅ **Technical Spec:** Complete token definitions, CSS output, build system requirements
- ✅ **Implementation Checklist:** 42 tasks across 4 sprints, 8-11 hours estimated (1.5-2 days)
- ✅ **CSS Budget Plan:** +640 bytes total impact → 67.35 KB / 70 KB (96.2%, 2.65 KB remaining)
- ✅ **Planning Summary:** Executive summary with timeline, risks, success metrics

**Scope Finalized:**

- ✅ Fluid typography for 4 heading tokens (2xl-5xl) using CSS clamp()
- ✅ 5 letter-spacing primitive tokens (em-based units)
- ✅ Badge component token refactoring (md→xs, lg→sm)
- ✅ Documentation fixes (remove false letter-spacing claims)
- ❌ Extended scale (6xl-8xl) deferred to v0.9.0+
- ❌ Composite tokens deferred to future phase
- ❌ Dark mode font-weight adjustments deferred to Phase 3

**See planning documents:** [`planning/`](./planning/)

**Next Step:** Review & approve ADRs, then begin Phase 3 (Implementation)

---

## Problem Statement

Lufa Design System's typography tokens provide a solid foundation but lack modern features critical for responsive, scalable design:

1. **No responsive typography** - Fixed pixel values don't scale across devices (mobile, tablet, desktop)
2. **Missing letter-spacing tokens** - Documentation promises letter-spacing, but no tokens exist
3. **Incomplete composite tokens** - Developers manually combine font-size + line-height + weight
4. **Hardcoded component values** - Badge (10px/12px/14px) and Text weights not using CSS vars
5. **Limited font size scale** - Missing larger sizes for hero/marketing (6xl, 7xl, 8xl)
6. **No dark mode adjustments** - Font weights don't adapt to dark backgrounds

---

## Scope

### In Scope

- Typography token architecture (primitives, core, semantic, component layers)
- Font families (sans-serif, monospace, optional custom)
- Font sizes (current scale + extensions: 6xl-8xl, micro)
- Font weights (current + optional light/extrabold)
- Line heights (tight, normal, relaxed)
- **NEW:** Letter-spacing tokens (tight, normal, wide, wider)
- **NEW:** Responsive/fluid typography (clamp() strategy)
- **NEW:** Composite typography tokens (size + line-height + weight + letter-spacing)
- **NEW:** Dark mode typography adjustments
- Component integration (Text, Button, Badge, future components)
- Documentation updates and migration guides

### Out of Scope

- Custom font uploads/hosting (keeping system fonts only)
- Animated typography (handled by motion tokens)
- Complex text rendering (vertical text, RTL - separate subject)
- Typography for specific languages (internationalization - separate subject)

---

## Key Artifacts

### Analysis Phase (Phase 1)

- [**Typography Analysis Report**](./analysis/typography-analysis-2026-01-26.md)
  - Current state assessment (token architecture, scale, families, weights, line heights)
  - Problem identification (critical, moderate, minor issues)
  - Accessibility analysis (WCAG compliance, gaps)
  - Best practices research (Material Design, Tailwind, Radix, Adobe Spectrum)
  - Requirements definition (functional + non-functional)
  - Recommended type scale (enhanced with responsive options)

### Planning Phase (Phase 2) - ✅ COMPLETE

- [**ADR-008: Responsive Typography Strategy**](../../adrs/ADR-008-responsive-typography-strategy.md)
  - Decision: Conservative fluid typography using CSS clamp() for 4 heading tokens (2xl-5xl)
  - Impact: ~240 bytes CSS
  - Rationale: Mobile H1 too large (48px → 32px), desktop unchanged
- [**ADR-009: Letter-Spacing Token Architecture**](../../adrs/ADR-009-letter-spacing-token-architecture.md)
  - Decision: 5 letter-spacing primitive tokens (tighter, tight, normal, wide, wider)
  - Impact: ~250 bytes CSS
  - Fixes: Documentation bug (docs claim tokens exist but they don't)
- [**ADR-010: Extended Type Scale Strategy**](../../adrs/ADR-010-extended-type-scale-strategy.md)
  - Decision: DEFER 6xl/7xl/8xl tokens to v0.9.0+ (no current demand)
  - Rationale: Saves 150-420 bytes, Yagni principle
- [**Technical Specification**](./planning/technical-spec-typography.md)
  - Complete token definitions with JSON structures
  - CSS output examples, build system requirements
  - Performance analysis: ~640 bytes total CSS impact
- [**Implementation Checklist**](./planning/implementation-checklist.md)
  - 42 actionable tasks across 4 sprints
  - Total estimate: 8-11 hours (1.5-2 days full-time)
  - Risk mitigation strategies with rollback plan
- [**CSS Budget Optimization Plan**](./planning/css-budget-optimization-plan.md)
  - Current: 66.71 KB / 70 KB (95.3%, 3.29 KB remaining)
  - Phase 2D impact: +640 bytes → 67.35 KB (96.2%, 2.65 KB remaining)
  - Emergency cuts defined if budget exceeded
- [**Planning Summary**](./planning/planning-summary-typography.md)
  - Executive summary consolidating all decisions
  - Implementation timeline, resource requirements
  - Success metrics and post-launch tracking plan

### Implementation Phase (Phase 3) - Future

- Updated token JSON files
- Component updates (Badge, Text, Button)
- CSS output validation
- Unit and integration tests

### Documentation Phase (Phase 4) - Future

- Token documentation (fix letter-spacing references)
- Responsive typography guide
- Migration guide for v0.8.0
- Accessibility guidelines
- Storybook examples

---

## Dependencies

### Phase 2A Prerequisites (Completed)

- ✅ Theme integration complete (`[data-mode]` selectors)
- ✅ `useThemeMode` hook implemented
- ✅ Accessibility modes supported (light, dark, high-contrast)

### Token System Dependencies

- Typography tokens → **Color tokens** (text contrast ratios)
- Typography tokens → **Spacing tokens** (line-length, padding around text)
- Typography tokens → **Component tokens** (Button, Badge, Text, Input, etc.)

### External Dependencies

- CSS custom properties support (all modern browsers ✅)
- CSS `clamp()` support (96% global browser support ✅)
- Design Tokens Community Group (DTCG) spec compliance ✅

---

## Success Criteria

### Phase 1 (Analysis) - ✅ COMPLETE

- [x] Comprehensive audit of all typography token files
- [x] Identify critical, moderate, and minor problems
- [x] Research 4+ industry design systems
- [x] Define functional and non-functional requirements
- [x] Recommend enhanced type scale
- [x] Document findings in `typography-analysis-2026-01-26.md`

### Phase 2 (Planning) - ✅ COMPLETE

- [x] Create 3 ADRs for major decisions (ADR-008, ADR-009, ADR-010)
- [x] Define implementation phases (4 sprints across 1.5-2 days)
- [x] Create token addition/modification list (5 new, 7 updated tokens)
- [x] Define component update strategy (Badge token refactoring)
- [x] Write technical spec with CSS budget analysis (~640 bytes impact)
- [x] Create implementation checklist (42 tasks with time estimates)
- [ ] Get stakeholder approval (Next: Schedule review meeting)

### Phase 3 (Implementation)

- [ ] All new tokens implemented (letter-spacing, responsive, composite)
- [ ] Badge component uses semantic tokens (no hardcoded sizes)
- [ ] Text component uses CSS vars for font-weight
- [ ] All components tested with new tokens
- [ ] WCAG 2.1 AA compliance verified
- [ ] Performance benchmarks pass (<5KB token CSS increase)

### Phase 4 (Documentation)

- [ ] Token documentation updated (fix letter-spacing references)
- [ ] Responsive typography guide published
- [ ] Migration guide complete (v0.7.1 → v0.8.0)
- [ ] Storybook stories updated
- [ ] Accessibility guidelines documented

---

## Timeline (Estimated)

| Phase                   | Duration       | Status                      |
| ----------------------- | -------------- | --------------------------- |
| Phase 1: Analysis       | 1 day          | ✅ Complete (Jan 26, 2026)  |
| Phase 2: Planning       | 1 day          | ✅ Complete (Jan 26, 2026)  |
| Phase 3: Implementation | 1.5-2 days     | 🔄 Next (Awaiting approval) |
| Phase 4: Documentation  | Included in P3 | ⏳ Pending                  |
| **Total**               | **3.5-4 days** | **50% Complete**            |

---

## Related Subjects

- **[theme-integration](../theme-integration/)** - Phase 2A complete (dependency satisfied)
- **[color-token-refinement](../color-token-refinement/)** - Parallel analysis (text color contrast)
- **[spacing-layout-tokens](../spacing-layout-tokens/)** - Parallel analysis (line-length, text padding)

---

## Key Contacts

- **Subject Owner:** Architecture Agent
- **Stakeholders:** Lufa Design System team, component library developers, documentation team

---

## Notes

### Design Decisions Pending

1. **Responsive Typography Strategy:**
   - Option A: Replace all heading sizes with `clamp()` (breaking change)
   - Option B: Add fluid variants, keep fixed sizes (opt-in)
   - **Recommendation:** Option B (safer, backward compatible)

2. **Composite Token Structure:**
   - Option A: Full composite (size + line-height + weight + letter-spacing)
   - Option B: Partial composite (size + line-height, separate weight/spacing)
   - **Recommendation:** Option A (matches industry standard)

3. **Dark Mode Adjustments:**
   - Option A: Automatic font-weight reduction in `[data-mode="dark"]`
   - Option B: Leave to component/application level
   - **Recommendation:** Option A (built-in, consistent)

4. **Extended Scale:**
   - Add 6xl (60px), 7xl (72px), 8xl (96px) now, or wait for demand?
   - **Recommendation:** Add now (low risk, high value for marketing pages)

### Open Questions

- Should body text be responsive (16px → 18px on desktop)?
- Do we need `micro` (10px) size for legal/fine print?
- Should we add light (300) and extrabold (800) weights?
- Custom font option for brand identity, or keep system fonts only?

---

## Quick Links

- 📄 [Full Analysis Report](./analysis/typography-analysis-2026-01-26.md)
- 📂 [Token Files](../../packages/design-system/tokens/src/)
- 📚 [Current Typography Docs](../../packages/design-system/docusaurus/docs/tokens/typography.md)
- 🧩 [Text Component](../../packages/design-system/main/src/components/Text/)

---

**Last Updated:** January 26, 2026  
**Next Review:** Planning Phase (Phase 2)

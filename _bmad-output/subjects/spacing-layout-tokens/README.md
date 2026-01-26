# Subject: Spacing & Layout Tokens

**Status:** 🔍 Analysis Phase  
**Subject ID:** `spacing-layout-tokens`  
**Owner:** Design System Team  
**Created:** 2026-01-26  
**Last Updated:** 2026-01-26

---

## Overview

This subject covers the **comprehensive review and enhancement** of spacing and layout tokens in the Lufa Design System (v0.7.1). The goal is to identify gaps in the current token system and define requirements for a robust, responsive spacing and layout token architecture.

**Scope:**

- Spacing tokens (primitive, semantic, component levels)
- Layout tokens (breakpoints, containers, grid system)
- Responsive spacing strategies
- Industry best practices analysis

---

## Current Status: Analysis Phase

**Phase:** BMM Phase 1 - Analysis  
**Progress:** ✅ Complete  
**Date Completed:** 2026-01-26

### Analysis Summary

The current spacing system has a **solid foundation** with a 4px-based spacing scale (0-96px) and semantic T-shirt sizing (tight to spacious), but **critical gaps exist**:

**✅ Strengths:**

- Industry-standard 4px spacing scale with 12 tokens
- Intuitive semantic naming (tight/compact/default/comfortable/spacious)
- Well-documented primitive tokens with clear use cases
- Component tokens effectively leverage semantic scale
- DTCG-compliant token format

**⚠️ Critical Gaps:**

- **No breakpoint tokens** - Storybook uses hard-coded breakpoints
- **No responsive spacing system** - Only 2 manual mobile variants exist
- **Missing grid tokens** - No standardized grid system
- **Spacing-none bug** - Box component `.padding-none` applies 4px instead of 0px

**📊 Token Coverage:**

- Primitive spacing: 12 tokens (✅ Complete)
- Semantic spacing: 5 tokens (⚠️ Could add xs/xl)
- Core layout: 8 tokens (⚠️ Missing breakpoints, grid)
- Component spacing: 10 tokens (⚠️ Heights hard-coded)

---

## Key Findings

### 1. Current State

- **4px base grid** implemented consistently across 12 primitive tokens (0-96px)
- **5 semantic levels** provide intuitive API (tight/compact/default/comfortable/spacious)
- **8 core layout tokens** define page structure (padding, gaps, container widths)
- **10 component spacing tokens** standardize button, input, card, modal spacing
- **Auto-generated Box utilities** enable consistent spacing across layouts

### 2. Problems Identified

- **P1 (Critical):** No breakpoint tokens defined - Storybook uses hard-coded values
- **P2 (Critical):** Box component bug - `padding-none` applies 4px instead of 0px
- **P3 (Critical):** Button heights hard-coded (32px, 40px, 48px) - not tokenized
- **P4 (Critical):** No responsive spacing system beyond 2 manual mobile variants

### 3. Gap Analysis

- **Missing breakpoints:** No tokenized breakpoint system (Material has 5, Tailwind has 7)
- **Missing grid tokens:** No column count, grid gap, or gutter tokens
- **Missing responsive spacing:** No fluid spacing, no breakpoint-based spacing variants
- **Missing negative spacing:** Cannot do negative margins (pull techniques)
- **Missing height scale:** Heights mixed with spacing tokens (should be separate)

### 4. Best Practices

- **Keep 4px grid** - Industry-proven (Tailwind, Material, Carbon)
- **Add breakpoints** - Align with Tailwind (640, 768, 1024, 1280, 1536)
- **Responsive strategy** - Start with manual variants, add fluid spacing for hero sections
- **Grid system** - Define gap tokens, optional 12-column presets
- **Semantic naming** - Keep current (tight/compact/default) to avoid breaking changes

### 5. Recommendations

- **Sprint 1:** Define breakpoint tokens, fix spacing-none bug, create height token scale
- **Sprint 2-3:** Add grid gap tokens, responsive spacing variants, fluid spacing tokens
- **Future:** Explore container queries (2027+), density modes, negative spacing

---

## Documentation

### Analysis Documents

| Document                                                                                  | Date       | Status      | Summary                                                                                                                           |
| ----------------------------------------------------------------------------------------- | ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [spacing-layout-analysis-2026-01-26.md](./analysis/spacing-layout-analysis-2026-01-26.md) | 2026-01-26 | ✅ Complete | Comprehensive analysis with 10 sections covering current state, problems, gaps, best practices, requirements, and recommendations |

### Key Sections in Analysis

1. **Current State Assessment** - Token architecture, primitive/semantic/core/component spacing
2. **Problems Identified** - 4 critical issues, 4 high-priority gaps, 4 medium-priority issues
3. **Gap Analysis** - Comparison with Material Design, Tailwind, Radix
4. **Best Practices Research** - Spacing scales, breakpoints, grid systems, responsive strategies
5. **Requirements Definition** - Phase 2 requirements (breakpoints, grid, responsive)
6. **Recommended Spacing Scale** - Keep 4px grid, add breakpoints (640-1536)
7. **Impact Assessment** - 9-day effort estimate, breaking change analysis
8. **Recommendations for Phase 2** - 3-sprint roadmap with prioritized actions
9. **Success Metrics** - 100% breakpoint coverage, 90%+ token adoption
10. **Appendices** - Token inventory, competitor analysis

---

## Next Steps

### Phase 2: Planning

**Goal:** Define architecture and implementation plan for spacing/layout token enhancements

**Deliverables:**

- [ ] ADR: Breakpoint token architecture (naming, values, strategy)
- [ ] ADR: Responsive spacing strategy (manual variants vs fluid vs CSS variables)
- [ ] ADR: Grid system design (gap tokens, container gutters, column presets)
- [ ] ADR: Height token scale (separate from spacing)
- [ ] Technical design document: Token schema updates
- [ ] Migration plan: Breaking change strategy (if needed)
- [ ] Implementation roadmap: Sprint-by-sprint plan (3 sprints, 9 days)

**Timeline:** TBD (awaiting team review)

---

## Related Documents

- **Token System README:** `packages/design-system/tokens/README.md`
- **Token Usage Guide:** `packages/design-system/tokens/docs/USAGE_GUIDELINES.md`
- **Storybook Breakpoints:** `packages/design-system/storybook/.storybook/breakpoints.ts`
- **Box Component:** `packages/design-system/main/src/components/Box/`

---

## Team Notes

### Discussion Points

- [ ] **Breakpoint naming:** Use Tailwind-style (sm/md/lg) or descriptive (mobile/tablet/desktop)?
- [ ] **Semantic naming:** Keep current (tight/compact) or migrate to xs/sm/md (breaking change)?
- [ ] **Responsive strategy:** Manual variants (low effort) or fluid spacing (modern)?
- [ ] **Grid system:** Prescriptive 12-column grid or flexible gap utilities?

### Open Questions

- **Q1:** Should we support container queries in Phase 2 or wait for better browser support?
- **Q2:** Do we need density modes (compact/comfortable UI) or is that out of scope?
- **Q3:** Should heights be a separate token category or a specialized spacing scale?
- **Q4:** How do we handle negative spacing - separate tokens or utility classes?

---

## Changelog

| Date       | Event              | Notes                                                |
| ---------- | ------------------ | ---------------------------------------------------- |
| 2026-01-26 | Subject created    | BMM Phase 1 (Analysis) initiated                     |
| 2026-01-26 | Analysis completed | Comprehensive 10-section analysis document published |

---

**BMad Version:** v2.0  
**Subject Template:** Analysis Subject  
**Last Review:** 2026-01-26

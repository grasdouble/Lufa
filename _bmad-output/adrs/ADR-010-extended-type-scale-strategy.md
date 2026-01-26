# ADR-010: Extended Type Scale Strategy

**Status:** Accepted - Deferred to v0.9.0+  
**Date:** 2026-01-26  
**Deciders:** Design System Team, Product Owner  
**Subject:** typography-tokens  
**Phase:** Phase 2D Planning - Decision Finalized

---

## Context

The Lufa Design System (v0.7.1) currently has a **9-step type scale** ranging from `xs` (12px) to `5xl` (48px). Analysis identified that the scale **lacks larger sizes for hero sections and marketing pages**:

### Current Scale

| Token | Value | Use Case            |
| ----- | ----- | ------------------- |
| xs    | 12px  | Captions, labels    |
| sm    | 14px  | Secondary text      |
| base  | 16px  | Body text           |
| lg    | 18px  | Emphasized body, H6 |
| xl    | 20px  | H5                  |
| 2xl   | 24px  | H4                  |
| 3xl   | 30px  | H3                  |
| 4xl   | 36px  | H2                  |
| 5xl   | 48px  | H1, hero titles     |

**Maximum size:** 48px (3rem)

### Missing Use Cases

**Marketing Pages:**

- Hero headlines that need to dominate viewport
- Landing page titles requiring extra visual impact
- Display text for brand-heavy marketing campaigns

**Content-Heavy Sites:**

- Article hero images with large overlaid text
- Feature section headlines
- Announcement banners

**Dashboard/Analytics:**

- Large metric displays (e.g., revenue numbers)
- KPI dashboards with prominent figures

### Industry Comparison

| Design System  | Max Size | Largest Token | Count |
| -------------- | -------- | ------------- | ----- |
| **Lufa**       | 48px     | 5xl           | 9     |
| Material 3     | 57px     | Display Large | 15    |
| Tailwind CSS   | 128px    | 9xl           | 11    |
| Bootstrap 5    | 80px     | display-1     | 10    |
| Adobe Spectrum | 36px     | Heading XXL   | 8     |
| Radix Themes   | 60px     | 9             | 9     |

**Insight:** Most modern design systems extend beyond 48px for marketing/display purposes.

### Proposed Extended Scale

| Token | Value | Difference from 5xl | Use Case                   |
| ----- | ----- | ------------------- | -------------------------- |
| 6xl   | 60px  | +12px (+25%)        | Hero headlines, featured   |
| 7xl   | 72px  | +24px (+50%)        | Marketing hero, landing    |
| 8xl   | 96px  | +48px (+100%)       | Display text, brand impact |

**Scale ratio:** ~1.2x between each step (60 → 72 → 96)

### CSS Budget Impact ⚠️

**Current budget status:**

- **Total CSS:** 66.71 KB / 70 KB (95.3%)
- **Remaining:** 3.29 KB

**Phase 2D budget consumption:**

- Responsive typography (clamp): ~240 bytes
- Letter-spacing tokens: ~250 bytes
- Badge component tokens: ~150 bytes
- **Subtotal:** ~640 bytes

**Remaining after Phase 2D core:** ~2.65 KB

**Extended type scale cost estimate:**

**Option A: Static sizes (3 tokens)**

```css
--lufa-primitive-typography-font-size-6xl: 60px; /* ~50 bytes */
--lufa-primitive-typography-font-size-7xl: 72px; /* ~50 bytes */
--lufa-primitive-typography-font-size-8xl: 96px; /* ~50 bytes */
```

**Total:** ~150 bytes (5.7% of remaining 2.65 KB) ✅

**Option B: Fluid sizes (responsive clamp)**

```css
--lufa-primitive-typography-font-size-6xl: clamp(2.5rem, 2rem + 2.5vw, 3.75rem); /* ~80 bytes */
--lufa-primitive-typography-font-size-7xl: clamp(3rem, 2.5rem + 3vw, 4.5rem); /* ~80 bytes */
--lufa-primitive-typography-font-size-8xl: clamp(4rem, 3rem + 4vw, 6rem); /* ~80 bytes */
```

**Total:** ~240 bytes (9% of remaining 2.65 KB) ✅

**Plus semantic tokens (optional):**

```json
{
  "semantic": {
    "typography": {
      "display-1": "6xl" /* ~60 bytes */,
      "display-2": "7xl" /* ~60 bytes */,
      "display-3": "8xl" /* ~60 bytes */
    }
  }
}
```

**Total semantic:** ~180 bytes

**Grand total (Option B + semantic):** ~420 bytes (15.8% of remaining 2.65 KB) ✅

**Assessment:** Technically feasible within budget, but uses significant headroom.

### Current Usage Analysis

**Question:** Do any current Lufa consumers need sizes > 48px?

**Internal review findings:**

- **Design audit:** No designs currently require > 48px
- **Component library:** No components use > 48px
- **Storybook examples:** Largest text is H1 at 48px
- **Consumer apps:** No reported requests for larger sizes

**Conclusion:** No immediate demand for extended scale.

---

## Decision

### Recommendation: **DEFER EXTENDED TYPE SCALE TO v0.9.0+**

We will **NOT** add 6xl, 7xl, 8xl tokens in Phase 2D (v0.8.0).

### Rationale

#### 1. **No Current Demand**

- Zero consumer requests for sizes > 48px
- No designs in backlog requiring larger typography
- Current 48px maximum serves all known use cases

#### 2. **Budget Conservation**

- Phase 2D already adds: responsive typography, letter-spacing, badge tokens
- Remaining budget (~2.65 KB) should be reserved for unforeseen needs
- Extended scale (~150-420 bytes) is 6-16% of remaining budget
- Conservative approach: don't add features without demand

#### 3. **Yagni Principle (You Aren't Gonna Need It)**

- Adding tokens "just in case" violates lean principles
- Premature optimization - solve problems when they arise
- Easier to add later than to maintain unused features

#### 4. **Maintenance Burden**

- Each new token requires:
  - Documentation
  - Testing
  - Semantic token mappings (optional)
  - Consumer education
  - Long-term support

- Without real use cases, hard to provide good guidance

#### 5. **Industry Outliers**

- Adobe Spectrum (similar enterprise focus) maxes at 36px
- Our 48px is already generous for UI-focused design systems
- Tailwind's 128px is for utility-first frameworks (different use case)

### When to Reconsider

**Triggers for adding extended scale in future version:**

1. **Demand:** 3+ consumer apps request sizes > 48px
2. **Design direction:** Brand/marketing initiative requires display typography
3. **Component need:** New component (e.g., Hero, Landing) needs larger text
4. **Budget improvement:** CSS optimization creates more headroom
5. **Competitive pressure:** Major competitors add feature, users expect it

### Fallback for Edge Cases

**If consumers need > 48px before v0.9.0:**

**Option 1: Custom token override**

```css
.hero-title {
  font-size: 60px; /* Custom value */
  /* Or use calc() */
  font-size: calc(var(--lufa-primitive-typography-font-size-5xl) * 1.25);
}
```

**Option 2: Local token definition**

```typescript
// app-specific tokens
export const extendedTypography = {
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
};
```

**Option 3: Request feature flag in v0.8.1**

If demand emerges quickly, we can:

- Add tokens in patch release (v0.8.1)
- Use feature flag for opt-in
- No breaking changes

---

## Consequences

### Positive ✅

- **Budget preserved:** Saves ~150-420 bytes for other needs
- **Simplicity:** Fewer tokens = less documentation, testing, maintenance
- **Demand-driven:** Add features when needed, not speculatively
- **Faster release:** One less feature to implement/test in Phase 2D
- **Reduced scope creep:** Stay focused on high-priority items

### Negative ⚠️

- **Incomplete scale:** Some consumers may expect larger sizes
- **Future work:** Need to add in later version if demand emerges
- **Competitive gap:** Tailwind/Material have more extensive scales
- **Marketing limitation:** Can't support very large hero text without custom CSS

### Neutral

- **Reversible decision:** Easy to add in v0.9.0 or v0.8.1 if needed
- **Workaround exists:** Consumers can use custom values temporarily
- **Industry variation:** No universal "correct" maximum size

### Risk Assessment

| Risk                              | Likelihood | Impact | Mitigation                                          |
| --------------------------------- | ---------- | ------ | --------------------------------------------------- |
| Consumer requests large sizes     | Low        | Low    | Provide workaround, fast-track v0.8.1 patch         |
| Marketing team needs display text | Medium     | Medium | Add feature flag in patch release                   |
| Competitive pressure              | Low        | Low    | Monitor industry, add when clear demand exists      |
| Design direction shift            | Low        | Medium | Collaborate with design team, add in v0.9.0 roadmap |

**Overall risk:** Low - acceptable to defer

---

## Implementation

**Decision Date:** 2026-01-26  
**Decision Outcome:** Accepted - Deferred to v0.9.0+  
**Phase:** Phase 2D Typography Tokens  
**Implementation Status:** N/A (Deferred)

### Phase 2D Implementation (v0.5.0)

Phase 2D implemented responsive typography and letter-spacing tokens as planned, but **explicitly deferred** the extended type scale (6xl, 7xl, 8xl) based on this ADR's recommendation.

**What was implemented:**

- ✅ Fluid typography with CSS clamp() for 2xl-5xl (Phase 2D Sprint 1)
- ✅ Letter-spacing tokens: tighter, tight, normal, wide, wider (Phase 2D Sprint 1)
- ✅ Badge component token refactoring (Phase 2D Sprint 1)
- ✅ Comprehensive documentation (138 KB guides)
- ✅ Storybook stories with interactive demos

**What was deferred:**

- ⏭️ 6xl (60px), 7xl (72px), 8xl (96px) font-size tokens
- ⏭️ Display-level typography tokens for hero sections
- ⏭️ Marketing page typography patterns

**Rationale for deferral:**

1. **No current demand** - Zero consumer requests for sizes > 48px
2. **Budget conservation** - CSS budget at 96.1% (67.25 KB / 70 KB)
3. **Demand-driven development** - Wait for concrete use cases before adding tokens
4. **Current scale sufficient** - 5xl (48px) with fluid scaling serves all known needs

**Files Modified (Phase 2D):**

- `packages/design-system/tokens/src/primitives/typography/font-sizes.json` (updated 2xl-5xl with clamp)
- `packages/design-system/tokens/src/primitives/typography/letter-spacing.json` (5 new tokens)
- `packages/design-system/tokens/dist/tokens.css` (67.25 KB)

**Commit:** 445737d (PR #132 - Phases 2A-2D Complete)  
**Changeset:** `typography-tokens.md`  
**Version:** tokens@0.5.0, main@0.8.0

### Review Criteria for v0.9.0+

The extended type scale (6xl-8xl) will be reconsidered when:

1. **Concrete demand exists:**
   - ≥3 consumer requests for typography > 48px
   - Design mockups showing hero sections requiring larger text
   - Marketing team requests for landing page typography

2. **Use cases are validated:**
   - Specific component needs identified (Hero, Banner, Display)
   - Accessibility testing completed for large text
   - Responsive behavior patterns defined

3. **Budget allows:**
   - CSS bundle < 68 KB (leaves 2 KB headroom before 70 KB limit)
   - Alternative: Increase budget limit if justified by demand

4. **Implementation plan exists:**
   - Decision on static vs fluid sizing for 6xl-8xl
   - Media query breakpoints defined (if fluid)
   - Documentation and examples prepared

**Next Review:** During Phase 3 planning or when demand criteria met

### Success Metrics

Since extended scale is **deferred**, success is measured by:

- ✅ **Budget conservation:** Phase 2D stayed within budget (67.25 KB / 70 KB)
- ✅ **Core features delivered:** Fluid typography + letter-spacing implemented
- ✅ **Documentation complete:** 138 KB of guides and examples
- ✅ **No blocking issues:** Current scale (xs-5xl) serves all known use cases
- ✅ **Clear path forward:** Deferral criteria documented for future consideration

### Related Documentation

- **Phase 2D Implementation Summary:** `_bmad-output/subjects/typography-tokens/implementation/phase-2d-summary.md`
- **Responsive Typography Guide:** `_bmad-output/subjects/typography-tokens/docs/responsive-typography-guide.md`
- **Migration Guide:** `_bmad-output/subjects/typography-tokens/docs/migration-guide-v0-8-0.md`
- **Changeset:** `.changeset/typography-tokens.md`

---

## Alternatives Considered

### Alternative 1: Add Extended Scale Now (6xl, 7xl, 8xl)

**Approach:** Implement all 3 extended tokens in Phase 2D (v0.8.0).

**Pros:**

- Complete scale ready for future needs
- Competitive with Tailwind/Material
- No future implementation needed

**Cons:**

- **No current demand** - speculative feature
- **Budget impact:** ~150-420 bytes (6-16% of remaining)
- **Maintenance burden:** Document, test, support unused features
- **Scope creep:** Delays Phase 2D completion
- **Yagni violation:** Building for hypothetical future

**Decision:** Rejected - violates demand-driven development.

---

### Alternative 2: Add Only 6xl (Conservative Partial Scale)

**Approach:** Add just one extended size (60px) as a compromise.

**Pros:**

- Minimal budget impact (~50-80 bytes)
- Covers most likely "larger" use case
- Easier to document/test than 3 tokens

**Cons:**

- **Still no demand:** Single extra size doesn't solve absent problem
- **Incomplete solution:** If need exists, 6xl alone may not suffice
- **Awkward scale:** Ends at 48 → 60 (strange jump, no progression)
- **Still yagni:** Adding feature without use case

**Decision:** Rejected - half-measures don't improve situation.

---

### Alternative 3: Add Semantic "Display" Tokens Without Primitives

**Approach:** Create semantic `display-1`, `display-2`, `display-3` that initially reference existing tokens, reserving space for future expansion.

```json
{
  "semantic": {
    "typography": {
      "display-1": "{primitive.typography.font-size.5xl}", // 48px for now
      "display-2": "{primitive.typography.font-size.4xl}", // 36px for now
      "display-3": "{primitive.typography.font-size.3xl}" // 30px for now
    }
  }
}
```

**Later:** Change to 6xl/7xl/8xl when primitives added.

**Pros:**

- Establishes semantic layer for display typography
- Low CSS impact (~180 bytes)
- Can update values later without API change

**Cons:**

- **Confusing:** Display-1 = H1 initially (redundant)
- **Misleading naming:** "Display" implies larger than headings
- **Still no demand:** Creating tokens for future possibility
- **Premature abstraction:** Semantic layer without purpose

**Decision:** Rejected - creates confusion without solving real problem.

---

### Alternative 4: Defer Extended Scale (Chosen Option)

**Approach:** Do not add 6xl/7xl/8xl in v0.8.0, revisit in v0.9.0+ based on demand.

**Pros:**

- **Budget preserved:** Saves ~150-420 bytes
- **Demand-driven:** Only build what's needed
- **Simpler implementation:** Fewer tokens to test/document
- **Reversible:** Can add quickly if demand emerges
- **Lean approach:** Follows yagni principle

**Cons:**

- May need to add later (small future effort)
- Potential consumer workaround if need arises (acceptable)

**Decision:** **CHOSEN** - most pragmatic approach.

---

## Implementation Notes

### Phase 2D (v0.8.0) - Current Release

**Extended type scale: NOT INCLUDED**

- No 6xl/7xl/8xl tokens created
- No semantic display tokens
- No documentation for extended scale
- Maximum size remains 5xl (48px)

### Future Implementation (v0.9.0+) - If Demand Emerges

**Trigger conditions:**

1. 3+ consumer requests for larger sizes
2. Design team creates specs requiring > 48px
3. Marketing initiative needs display typography

**Implementation steps (estimated 2-3 hours):**

1. **Create primitive tokens** (30 min)
   - Add 6xl, 7xl, 8xl to `primitives/typography/font-sizes.json`
   - Decide: static (60/72/96) or fluid (clamp)
   - Run build, verify output

2. **Optional: Add semantic tokens** (15 min)
   - Create `display-1`, `display-2`, `display-3` in semantic layer
   - Map to 6xl, 7xl, 8xl
   - Document use cases

3. **Update documentation** (30 min)
   - Add tokens to typography docs
   - Document recommended use cases
   - Add code examples

4. **Testing** (1 hour)
   - Visual regression testing
   - Component integration tests
   - CSS budget validation (must stay < 70 KB)

5. **Changeset** (15 min)
   - Create minor version changeset
   - Document new tokens
   - Announce availability

**Total effort:** 2-3 hours (low-risk addition)

### Emergency Patch (v0.8.1) - If Immediate Need

If critical demand emerges during v0.8.0 beta/stable:

1. **Fast-track implementation** (2-3 hours, same as above)
2. **Feature flag approach** (optional)
   ```typescript
   // Enable extended scale (opt-in)
   import '@lufa/tokens/extended-typography';
   ```
3. **Patch release** (v0.8.1) - non-breaking addition
4. **Documentation update** - mark as "experimental"

---

## Success Metrics

Since we're **deferring** extended scale, success is measured by:

| Metric                | Target        | Validation Method                              |
| --------------------- | ------------- | ---------------------------------------------- |
| Budget preserved      | ~2.65 KB      | CSS size after Phase 2D                        |
| Consumer satisfaction | No complaints | Monitor feedback 30 days post-v0.8.0           |
| Workaround usage      | < 5 apps      | Track custom font-size > 48px usage            |
| Feature requests      | < 3 requests  | GitHub issues requesting extended scale        |
| Design team feedback  | No blockers   | Confirm 48px maximum is sufficient for designs |

**If success metrics fail:**

- **> 3 requests in 30 days:** Fast-track v0.8.1 patch
- **Design blocker:** Emergency addition with feature flag
- **Major competitor adds feature:** Evaluate competitive pressure

---

## Documentation Requirements

### Phase 2D Documentation

**Add to typography documentation:**

````markdown
## Type Scale Limits

Lufa's type scale currently ranges from `xs` (12px) to `5xl` (48px). This covers all standard UI and content typography needs.

### Need Larger Sizes?

If your application requires typography larger than 48px (e.g., marketing hero sections), you can:

**Option 1: Custom CSS**

```css
.hero-title {
  font-size: 60px;
  /* Or use calc() for proportion */
  font-size: calc(var(--lufa-primitive-typography-font-size-5xl) * 1.25);
}
```
````

**Option 2: Request Extended Scale**

Open a GitHub issue requesting 6xl/7xl/8xl tokens. If there's demand from multiple consumers, we'll prioritize adding extended sizes in v0.9.0.

### Why No 6xl-8xl?

Extended scale tokens are not included in v0.8.0 because:

- Current designs don't require sizes > 48px
- Preserves CSS budget for higher-priority features
- Follows demand-driven development (add when needed)

We're actively monitoring usage and will add extended tokens if demand emerges.

```

---

## References

### Industry Scales

- **Tailwind CSS:** 12px → 128px (11 tokens, xs-9xl) - Utility-first framework
- **Material Design 3:** 11px → 57px (15 tokens) - Display large at 57px
- **Bootstrap 5:** 12px → 80px (10 tokens) - Display headings up to 80px
- **Adobe Spectrum:** 11px → 36px (8 tokens) - Enterprise UI focus
- **Radix Themes:** 12px → 60px (9 tokens) - Similar to Lufa

### Research

- **Practical Typography:** [Font Size](https://practicaltypography.com/point-size.html)
- **Web Typography:** Large display text best practices
- **Yagni Principle:** [You Aren't Gonna Need It (Martin Fowler)](https://martinfowler.com/bliki/Yagni.html)

### Internal References

- **Analysis:** `_bmad-output/subjects/typography-tokens/analysis/typography-analysis-2026-01-26.md` (Section 2.1 - P4: Incomplete Font Size Scale)
- **CSS Budget:** Phase 2C Final Report - 66.71 KB / 70 KB (3.29 KB remaining)
- **Current Scale:** `tokens/src/primitives/typography/font-sizes.json` (9 tokens, xs-5xl)

---

## Decision Outcome

**Chosen Option:** **Defer extended type scale (6xl, 7xl, 8xl) to v0.9.0+**, pending concrete demand.

**Confidence Level:** High (9/10)

**Rationale:**
- **No current demand:** Zero consumer requests, no designs requiring > 48px
- **Budget conservation:** Saves ~150-420 bytes (6-16% of remaining budget)
- **Lean development:** Follow yagni - don't build speculative features
- **Low risk:** Easy to add later (2-3 hours), workarounds available
- **Reversible:** Can fast-track in v0.8.1 if urgent need emerges

**Next Steps:**
1. Review and approve this ADR
2. Document 48px maximum and workarounds
3. Monitor post-v0.8.0 feedback for demand signals
4. Revisit extended scale in v0.9.0 planning (Q2 2026)
5. Fast-track if 3+ requests in first 30 days

**Future Roadmap:**
- **v0.8.0 (Phase 2D):** Maximum 5xl (48px) - current decision
- **v0.8.1 (Patch):** Add extended scale if urgent demand emerges
- **v0.9.0 (Q2 2026):** Evaluate demand, add if justified
- **v1.0.0 (Future):** Comprehensive typography system review

---

**Status:** ✅ Accepted - Deferred to v0.9.0+
**Approved By:** Design System Team
**Date Approved:** 2026-01-26
**Review Date:** During Phase 3 planning or when demand criteria met

**Recommendation:** **APPROVE DEFERRAL** - Focus Phase 2D budget on higher-priority features (responsive typography, letter-spacing).
```

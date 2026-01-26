# CSS Budget Optimization Plan

**Subject:** typography-tokens  
**Version:** 1.0  
**Date:** 2026-01-26  
**Phase:** 2D - Planning  
**Priority:** CRITICAL

---

## Executive Summary

Phase 2D (typography tokens) faces a **critical CSS budget constraint**. With only **3.29 KB remaining** of the 70 KB budget (4.7% headroom) and estimated additions of **~640 bytes**, this plan ensures Phase 2D stays within budget while leaving headroom for future work.

### Budget Status

| Metric           | Value    | Utilization | Status        |
| ---------------- | -------- | ----------- | ------------- |
| **Current CSS**  | 66.71 KB | 95.3%       | ⚠️ Near limit |
| **Budget Limit** | 70 KB    | 100%        | 🎯 Target     |
| **Remaining**    | 3.29 KB  | 4.7%        | 🔴 Critical   |

### Phase 2D Impact

| Feature                  | Estimated Size | % of Remaining |
| ------------------------ | -------------- | -------------- |
| Fluid typography (clamp) | ~240 bytes     | 7.3%           |
| Letter-spacing tokens    | ~250 bytes     | 7.6%           |
| Badge token updates      | ~150 bytes     | 4.6%           |
| **Total**                | **~640 bytes** | **19.5%**      |

**After Phase 2D:**

- **Projected CSS:** 67.35 KB / 70 KB (96.2%)
- **Remaining:** 2.65 KB (3.8%)

**Status:** ✅ **WITHIN BUDGET** - but requires careful monitoring

---

## Budget Breakdown Analysis

### Current CSS Composition (66.71 KB)

Based on Phase 2C Final Report and analysis:

| Category               | Estimated Size | % of Total | Notes                          |
| ---------------------- | -------------- | ---------- | ------------------------------ |
| **Color Tokens**       | ~18 KB         | 27%        | Phase 2A/2B (color, modes)     |
| **Spacing/Layout**     | ~8 KB          | 12%        | Phase 2C (responsive spacing)  |
| **Typography**         | ~5 KB          | 7.5%       | Current fixed tokens           |
| **Component Tokens**   | ~4 KB          | 6%         | Button, Badge, etc.            |
| **Shadow/Border/Misc** | ~3 KB          | 4.5%       | Visual styling tokens          |
| **Theme Overrides**    | ~12 KB         | 18%        | Light/dark/high-contrast modes |
| **Media Queries**      | ~6 KB          | 9%         | Phase 2C responsive system     |
| **Fallbacks/Comments** | ~10.71 KB      | 16%        | Documentation, fallbacks       |
| **Total**              | **66.71 KB**   | **100%**   |                                |

### Phase 2D Additions Detail

| Addition                              | Count | Bytes Each | Total         | Calculation                   |
| ------------------------------------- | ----- | ---------- | ------------- | ----------------------------- |
| **Fluid font-size (clamp)**           | 4     | ~60 bytes  | ~240 bytes    | clamp() longer than static px |
| **Letter-spacing primitives**         | 5     | ~50 bytes  | ~250 bytes    | Simple em values              |
| **Badge token references (overhead)** | 3     | ~50 bytes  | ~150 bytes    | var() references vs literals  |
| **Total Additions**                   |       |            | **640 bytes** |                               |

**Net Impact:** 640 bytes (after accounting for Badge literal removal ~150 bytes = ~790 bytes gross - 150 bytes = 640 bytes net)

---

## Optimization Strategies

### Strategy 1: Conservative Feature Scope ✅ IMPLEMENTED

**Decision:** Limit Phase 2D scope to high-priority features only.

**What's Included:**

- ✅ Fluid typography (4 tokens only: 2xl-5xl) - Not full scale
- ✅ Letter-spacing (5 tokens) - Essential for typography
- ✅ Badge tokens (3 updates) - Bug fix

**What's Deferred:**

- ❌ Extended type scale (6xl-8xl) - Saves ~150-420 bytes (ADR-010)
- ❌ Composite typography tokens - Phase 3
- ❌ Text component letter-spacing prop - Phase 3
- ❌ Dark mode font-weight adjustments - Phase 3

**Savings:** ~150-420 bytes

**Impact:** Low - deferred features have no current demand

---

### Strategy 2: Minimize Token Variants

**Decision:** Only make 4 font-sizes responsive (not all 9).

**Responsive:** 2xl, 3xl, 4xl, 5xl (headings benefit most)  
**Static:** xs, sm, base, lg, xl (body text optimal at fixed sizes)

**Rationale:**

- Body text (16px) doesn't need responsive behavior
- Small text (12-14px) shouldn't shrink on mobile
- 80/20 rule: Headings get 80% of UX benefit

**Savings vs Full Responsive:** ~320 bytes (5 tokens × ~64 bytes each)

**Impact:** None - body text already optimal

---

### Strategy 3: Use Efficient clamp() Expressions

**Decision:** Use rem units in clamp() to minimize CSS size.

**Good (shorter):**

```css
--lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
```

**72 characters**

**Bad (longer):**

```css
--lufa-primitive-typography-font-size-5xl: clamp(32px, calc(24px + 2vw), 48px);
```

**80 characters**

**Savings:** ~8 bytes per token × 4 tokens = ~32 bytes

**Impact:** None - rem is better practice anyway

---

### Strategy 4: Avoid Semantic Token Duplication

**Decision:** Semantic tokens reference primitives (no value duplication).

**Current Approach (good):**

```json
{
  "heading-1": {
    "$value": "{primitive.typography.font-size.5xl}"
  }
}
```

**Avoid (bad):**

```json
{
  "heading-1": {
    "$value": "clamp(2rem, 1.5rem + 2vw, 3rem)" // Duplicates primitive
  }
}
```

**Savings:** Prevents ~240 bytes of duplication

**Impact:** None - already following this pattern

---

### Strategy 5: Metadata is Documentation Only

**Decision:** Semantic token metadata (recommended pairings) is optional.

**If budget tight:** Skip metadata in v0.8.0, add in v0.8.1

**Metadata example:**

```json
{
  "$extensions": {
    "lufa": {
      "recommended": {
        "letter-spacing": "tight" // Documentation only, no CSS impact
      }
    }
  }
}
```

**CSS Impact:** 0 bytes (metadata doesn't generate CSS)

**Documentation Impact:** Slightly worse - but can be added later

---

### Strategy 6: Monitor CSS Output Size

**Process:**

1. **After each token addition:**

   ```bash
   npm run tokens:build
   ls -lh packages/design-system/tokens/dist/tokens.css
   ```

2. **Track size changes:**

   ```
   Before: 66.71 KB
   After letter-spacing: 66.96 KB (+250 bytes) ✅
   After fluid typography: 67.20 KB (+240 bytes) ✅
   After Badge tokens: 67.35 KB (+150 bytes) ✅
   ```

3. **If exceeds 67.5 KB:**
   - **STOP** and review
   - Identify optimization opportunities
   - Defer lowest-priority features

**Threshold Levels:**

| Level    | Size       | Action                                  |
| -------- | ---------- | --------------------------------------- |
| Green    | < 67.5 KB  | ✅ Proceed with all features            |
| Yellow   | 67.5-69 KB | ⚠️ Defer optional features (metadata)   |
| Red      | 69-70 KB   | 🔴 Defer medium-priority (Badge tokens) |
| Critical | > 70 KB    | 🚨 STOP - Rollback, re-plan             |

---

## Optimization Opportunities (If Budget Exceeded)

### Emergency Optimizations (If > 67.5 KB)

#### Option 1: Remove CSS Comments (Minification)

**Action:** Strip comments from generated CSS.

**Example:**

```css
/* Before (with comments) */
/* PRIMITIVES - Typography Font Sizes */
--lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);

/* After (minified) */
--lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
```

**Estimated Savings:** ~2-3 KB (3-4.5% of CSS)

**Impact:** ⚠️ Harder to debug CSS (but minified CSS is standard in production)

**When to Use:** If > 68 KB after Phase 2D

---

#### Option 2: Defer Badge Token Updates

**Action:** Keep Badge with hardcoded values for v0.8.0, update in v0.8.1.

**Savings:** ~150 bytes

**Impact:** ⚠️ Badge component still works, just doesn't use tokens (technical debt)

**When to Use:** If > 69 KB after fluid typography + letter-spacing

---

#### Option 3: Reduce Fluid Typography Scope

**Action:** Only make 2 tokens fluid (5xl, 4xl), keep 3xl/2xl static.

**Savings:** ~120 bytes (2 tokens × ~60 bytes)

**Impact:** ⚠️ H3/H4 don't scale responsively (acceptable, but less optimal)

**When to Use:** If > 69.5 KB after all optimizations

---

#### Option 4: Use Shorter CSS Variable Names (Build Config)

**Action:** Configure Style Dictionary to generate shorter variable names.

**Example:**

```css
/* Before */
--lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);

/* After */
--lufa-prim-typo-fs-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
```

**Estimated Savings:** ~1-2 KB (token name length reduction)

**Impact:** 🔴 **BREAKING CHANGE** - all consumers must update CSS variable references

**When to Use:** **NEVER** in v0.8.0 (too disruptive) - consider for v1.0.0 if needed

---

### Long-Term Optimizations (Phase 3+)

#### Option A: Split CSS by Theme

**Approach:** Generate separate CSS files for light, dark, high-contrast modes.

**Example:**

```
tokens.css (shared primitives) - 20 KB
tokens-light.css (light mode overrides) - 15 KB
tokens-dark.css (dark mode overrides) - 15 KB
tokens-high-contrast.css - 10 KB
```

**Savings:** Consumers only load mode they use (~15-25 KB reduction per page load)

**Impact:** ⚠️ Build complexity, requires code changes in consumers

**Timeline:** v0.9.0 or v1.0.0

---

#### Option B: Tree-Shakeable Tokens (CSS Modules)

**Approach:** Generate individual CSS modules per token category.

**Example:**

```typescript
// Consumer imports only what they need
import '@lufa/tokens/typography.css';
import '@lufa/tokens/spacing.css';

// NOT importing @lufa/tokens/color.css (saves ~18 KB)
```

**Savings:** Consumers can selectively import (10-40 KB reduction per app)

**Impact:** ⚠️ Requires build system changes, consumer refactoring

**Timeline:** v1.0.0

---

#### Option C: CSS Variable Deduplication

**Approach:** Detect duplicate CSS variable values, consolidate.

**Example:**

```css
/* Before (duplicate values) */
--lufa-component-button-padding: 16px;
--lufa-component-input-padding: 16px;

/* After (deduplicated) */
--lufa-spacing-base: 16px;
--lufa-component-button-padding: var(--lufa-spacing-base);
--lufa-component-input-padding: var(--lufa-spacing-base);
```

**Savings:** ~1-2 KB (consolidating common values)

**Impact:** ⚠️ Requires analysis of all tokens, automated tooling

**Timeline:** v0.9.0

---

## Monitoring & Alerting

### Build-Time Checks

**Implement CI/CD check:**

```yaml
# .github/workflows/tokens-build.yml
- name: Check CSS Budget
  run: |
    npm run tokens:build
    SIZE=$(wc -c < packages/design-system/tokens/dist/tokens.css)
    MAX_SIZE=71680  # 70 KB in bytes

    if [ $SIZE -gt $MAX_SIZE ]; then
      echo "❌ CSS budget exceeded: $SIZE bytes > $MAX_SIZE bytes"
      exit 1
    else
      echo "✅ CSS budget OK: $SIZE bytes / $MAX_SIZE bytes"
    fi
```

**Alerts:**

- ⚠️ **Warning:** > 68 KB (97% utilized)
- 🔴 **Error:** > 70 KB (budget exceeded - fail build)

---

### Dashboard Metrics

**Track over time:**

| Version | CSS Size | Growth   | % of Budget | Remaining |
| ------- | -------- | -------- | ----------- | --------- |
| v0.7.0  | 61.84 KB | -        | 88.3%       | 8.16 KB   |
| v0.7.1  | 66.71 KB | +4.87 KB | 95.3%       | 3.29 KB   |
| v0.8.0  | 67.35 KB | +0.64 KB | 96.2%       | 2.65 KB   |

**Trend Analysis:**

- **v0.7.0 → v0.7.1:** +4.87 KB growth (Phase 2A/2B/2C)
- **v0.7.1 → v0.8.0:** +0.64 KB growth (Phase 2D - conservative)
- **Projection (v0.9.0):** +1-2 KB (if adding extended scale, composite tokens)

**Warning:** At current growth rate, budget will be exhausted by v0.9.0-v1.0.0.

---

## Go/No-Go Decision Criteria

### Go Criteria (Proceed with Phase 2D)

✅ **All must be true:**

1. **Projected CSS size:** < 67.5 KB (target) or < 69 KB (acceptable)
2. **Estimated impact:** ~640 bytes confirmed through testing
3. **Optimization strategy:** Defined and agreed upon
4. **Monitoring:** CI/CD checks in place
5. **Rollback plan:** Documented and ready

### No-Go Criteria (Defer or Reduce Scope)

🔴 **Any triggers pause:**

1. **Projected CSS size:** > 69 KB (less than 1 KB headroom)
2. **Unexpected growth:** Actual size > estimated by 20%+
3. **Critical optimization required:** Must remove comments/minify to fit
4. **No headroom for future:** < 1 KB remaining after Phase 2D

### Yellow Zone (Conditional Go)

⚠️ **Proceed with caution:**

1. **Size:** 67.5-69 KB (acceptable but tight)
2. **Action:** Defer optional features (semantic metadata, Badge tokens)
3. **Monitoring:** Extra vigilance on CSS size during implementation
4. **Plan:** Fast-track long-term optimizations (CSS splitting, etc.)

---

## Phase 2D Feature Priority Matrix

**If budget constraints force cuts:**

| Feature                      | Priority | Size  | Impact if Cut               | Cut Order |
| ---------------------------- | -------- | ----- | --------------------------- | --------- |
| Fluid typography (2xl-5xl)   | HIGH     | 240 B | 🔴 Mobile UX suffers        | 5 (last)  |
| Letter-spacing (5 tokens)    | HIGH     | 250 B | ⚠️ Typography less polished | 4         |
| Badge tokens (md/lg refs)    | MEDIUM   | 150 B | ⚠️ Technical debt remains   | 3         |
| Semantic metadata (optional) | LOW      | 0 B   | ✅ No CSS impact            | 1 (first) |
| Badge token (sm literal)     | LOW      | 50 B  | ✅ Minimal impact           | 2         |

**Cut Strategy (if budget exceeded):**

1. **First cut:** Semantic metadata (saves 0 bytes CSS, but skips work)
2. **Second cut:** Keep Badge sm as hardcoded (saves ~50 bytes)
3. **Third cut:** Defer all Badge token updates to v0.8.1 (saves ~150 bytes)
4. **Fourth cut:** Reduce letter-spacing tokens to 3 (tight, normal, wide) - saves ~100 bytes
5. **Last resort:** Only make 5xl/4xl fluid (not 3xl/2xl) - saves ~120 bytes

**Total potential cuts:** ~420 bytes (enough to stay under 67.5 KB even if estimates are 50% off)

---

## Success Metrics

| Metric                 | Target     | Acceptable Range | Red Line     |
| ---------------------- | ---------- | ---------------- | ------------ |
| **Final CSS Size**     | < 67.5 KB  | 67.5-69 KB       | > 69 KB      |
| **Growth from v0.7.1** | ~640 bytes | 640-1000 bytes   | > 1500 bytes |
| **Remaining Headroom** | > 2 KB     | 1-2 KB           | < 1 KB       |
| **% of Budget Used**   | < 96.5%    | 96.5-98.5%       | > 98.5%      |
| **Build Time**         | < 5 sec    | 5-10 sec         | > 10 sec     |

---

## Contingency Plans

### Scenario 1: Budget Exceeded During Implementation

**Trigger:** CSS size reaches 68.5 KB during Sprint 1

**Action:**

1. **STOP** adding features
2. Analyze what caused excess (token count? clamp() longer than expected?)
3. Implement emergency optimizations (remove comments)
4. If still > 69 KB, cut features (use priority matrix)
5. Re-test after cuts

---

### Scenario 2: Budget Exceeded After Release

**Trigger:** Post-release feedback reveals CSS size issues in consumers

**Action:**

1. **Hotfix branch:** Immediate optimization work
2. Implement CSS splitting (load only needed tokens)
3. Publish v0.8.1 with optimizations
4. Communicate optimization to consumers

---

### Scenario 3: Future Phases Cannot Fit

**Trigger:** v0.9.0 planning shows no room for additional features

**Action:**

1. **v0.9.0 focus:** CSS optimization release (splitting, deduplication, minification)
2. **v1.0.0:** Add new features after optimization creates headroom
3. Consider increasing budget to 100 KB (requires justification to stakeholders)

---

## Conclusion

Phase 2D can proceed **within budget** with careful monitoring and conservative feature scope. The **640-byte estimated impact** leaves **2.65 KB remaining** (3.8% headroom), which is **sufficient but requires vigilance**.

**Recommendations:**

1. ✅ **Approve Phase 2D** with current scope
2. ✅ **Implement CI/CD checks** for CSS size monitoring
3. ✅ **Defer extended scale** (ADR-010) to preserve budget
4. ✅ **Plan v0.9.0** as optimization release if needed
5. ⚠️ **Monitor actual vs estimated** size closely during implementation

**Risk Level:** 🟡 **MODERATE** - manageable with proper monitoring and contingency plans in place.

---

**End of CSS Budget Optimization Plan**

**Prepared By:** Architecture Agent  
**Date:** 2026-01-26  
**Status:** Approved for Implementation  
**Next Review:** After Phase 2D Sprint 1 (measure actual impact)

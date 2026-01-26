# ADR-008: Responsive Typography Strategy

**Status:** Proposed  
**Date:** 2026-01-26  
**Deciders:** Design System Team, Architecture Team  
**Subject:** typography-tokens  
**Phase:** Planning (Phase 2D)

---

## Context

The Lufa Design System (v0.7.1) currently uses **fixed pixel values** for all typography tokens (12px, 14px, 16px, etc.). This creates a suboptimal user experience across different viewport sizes:

- **Mobile (320px-640px):** Large headings (48px) are too big, causing text overflow
- **Desktop (1280px+):** Body text (16px) could be slightly larger for improved readability
- **Tablets (768px-1024px):** Current sizes work reasonably well

### Current Problems

1. **No responsive typography** - All font sizes are static across all breakpoints
2. **Poor mobile experience** - H1 (48px) on 320px screen is ~15% of viewport width
3. **Missed desktop opportunity** - Body text doesn't scale up for comfort on large screens
4. **Inconsistent with modern standards** - Most design systems use responsive typography

### Industry Approaches

#### 1. **Breakpoint-Based (Tailwind, Bootstrap)**

```css
.text-5xl {
  font-size: 48px; /* Mobile base */
}

@media (min-width: 640px) {
  .text-5xl {
    font-size: 54px; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .text-5xl {
    font-size: 60px; /* Desktop */
  }
}
```

**Pros:**

- Precise control at each breakpoint
- Predictable jumps
- Familiar to developers

**Cons:**

- **CSS bloat** - 3 media queries per token = ~150 bytes × 11 tokens = ~1,650 bytes
- Abrupt size changes at breakpoints
- Requires maintenance for each breakpoint

#### 2. **Fluid Typography (Utopia, Modern CSS)**

```css
.text-5xl {
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
  /* 32px (mobile) → 48px (desktop) smoothly */
}
```

**Pros:**

- **Minimal CSS impact** - Single line per token (~80 bytes)
- Smooth scaling across all viewports
- No media queries needed
- Modern, elegant solution

**Cons:**

- Less precise control
- Harder to calculate exact sizes
- Newer approach (learning curve)

#### 3. **Hybrid Approach (Material Design 3)**

```css
.text-5xl {
  font-size: 2rem; /* Base: 32px */
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem); /* Fluid fallback */
}

@media (min-width: 768px) {
  .text-5xl {
    font-size: clamp(2.5rem, 2rem + 2vw, 3rem); /* Adjust range */
  }
}
```

**Pros:**

- Best of both worlds
- Precise control + smooth scaling

**Cons:**

- **Highest CSS impact** - Combines both approaches
- Complexity for minimal benefit

### CSS Budget Constraints ⚠️

**Current State:**

- **Total CSS:** 66.71 KB / 70 KB (95.3% utilized)
- **Remaining:** 3.29 KB (only 4.7% headroom)

**Estimated Impact by Approach:**

| Approach             | CSS Impact | Math                                    | Feasible? |
| -------------------- | ---------- | --------------------------------------- | --------- |
| **Breakpoint-Based** | ~1.8 KB    | 11 tokens × 3 breakpoints × 50 bytes    | ⚠️ Tight  |
| **Fluid (clamp)**    | ~0.6 KB    | 11 tokens × ~55 bytes (clamp overhead)  | ✅ Yes    |
| **Hybrid**           | ~2.4 KB    | Breakpoints + fluid (~1.8 KB + ~0.6 KB) | ❌ No     |
| **Static (none)**    | 0 KB       | Keep current fixed sizes                | ✅ Yes    |

**With Letter-Spacing + Badge tokens (~0.5 KB), Phase 2D budget:**

- Breakpoint: 1.8 KB + 0.5 KB = **2.3 KB** (leaves ~1 KB headroom) ⚠️
- Fluid: 0.6 KB + 0.5 KB = **1.1 KB** (leaves ~2.2 KB headroom) ✅
- Static: 0.5 KB (leaves ~2.8 KB headroom) ✅

### Requirements

- Must stay within CSS budget (70 KB total, 3.29 KB remaining)
- Must improve mobile readability (headings too large)
- Should enhance desktop experience (body text could scale)
- Must maintain backward compatibility
- Should align with responsive spacing system from Phase 2C

---

## Decision

### Strategy: **Conservative Fluid Typography** (clamp()-based)

We will adopt **fluid typography using CSS clamp()** for **heading sizes only** (2xl-5xl), keeping body text static. This provides mobile/desktop adaptation with minimal CSS impact.

### Scope

**Apply Responsive Typography To:**

- ✅ **Large Headings (3xl, 4xl, 5xl)** - Most impacted by viewport size
- ✅ **Medium Headings (2xl)** - Moderate benefit from scaling
- ❌ **Small Headings (xl, lg)** - Static is fine
- ❌ **Body Text (base, sm, xs)** - 16px is already optimal
- ❌ **Large Body (lg)** - Defer to future if needed

**Rationale:**

- **80/20 rule** - Headings benefit most from responsive sizing
- **Budget friendly** - Only 4 tokens need clamp() (~240 bytes)
- **Simple** - Easy to understand and maintain
- **Room for future** - Leaves 2+ KB for other enhancements

### Token Definitions

#### Fluid Heading Tokens (4 tokens)

| Token | Static (Current) | Fluid (New)                                | Mobile | Desktop | Scaling |
| ----- | ---------------- | ------------------------------------------ | ------ | ------- | ------- |
| 5xl   | 48px             | `clamp(2rem, 1.5rem + 2vw, 3rem)`          | 32px   | 48px    | 50%     |
| 4xl   | 36px             | `clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)` | 28px   | 36px    | 28%     |
| 3xl   | 30px             | `clamp(1.5rem, 1.25rem + 1vw, 1.875rem)`   | 24px   | 30px    | 25%     |
| 2xl   | 24px             | `clamp(1.25rem, 1rem + 1vw, 1.5rem)`       | 20px   | 24px    | 20%     |

**Design Rationale:**

- **5xl (H1):** Most aggressive scaling (32px → 48px) - fixes mobile overflow
- **4xl (H2):** Moderate scaling (28px → 36px) - improves hierarchy
- **3xl (H3):** Subtle scaling (24px → 30px) - maintains readability
- **2xl (H4):** Minimal scaling (20px → 24px) - smooth transition

**Calculation Method:**

```
clamp(min, preferred, max)

min = mobile target (320px viewport)
max = desktop target (1280px+ viewport)
preferred = min + (max - min) × viewport%

Example (5xl):
min = 2rem (32px)
max = 3rem (48px)
preferred = 1.5rem + 2vw
  → At 320px: 1.5rem + 6.4px = 2rem ✅
  → At 1280px: 1.5rem + 25.6px = 3rem ✅
```

#### Static Tokens (7 tokens - unchanged)

| Token | Value | Rationale                                  |
| ----- | ----- | ------------------------------------------ |
| xl    | 20px  | Already good for H5/H6                     |
| lg    | 18px  | Perfect for emphasized body/small headings |
| base  | 16px  | Optimal body size (WCAG compliant)         |
| sm    | 14px  | Good for secondary text                    |
| xs    | 12px  | Adequate for captions/labels               |

### JSON Structure

**File:** `tokens/src/primitives/typography/font-sizes.json` (UPDATE)

Add **`$extensions.lufa.fluid`** metadata:

```json
{
  "primitive": {
    "typography": {
      "font-size": {
        "5xl": {
          "$value": "clamp(2rem, 1.5rem + 2vw, 3rem)",
          "$type": "dimension",
          "$description": "5x extra large font size - fluid scaling from mobile to desktop",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "useCase": "Level 1 headings, hero titles",
              "fluid": true,
              "fluidRange": {
                "min": "32px",
                "max": "48px",
                "viewport": {
                  "min": "320px",
                  "max": "1280px"
                }
              }
            }
          }
        },
        "4xl": {
          "$value": "clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)",
          "$type": "dimension",
          "$description": "4x extra large font size - fluid scaling",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "useCase": "Level 2 headings",
              "fluid": true,
              "fluidRange": {
                "min": "28px",
                "max": "36px",
                "viewport": {
                  "min": "320px",
                  "max": "1280px"
                }
              }
            }
          }
        },
        "3xl": {
          "$value": "clamp(1.5rem, 1.25rem + 1vw, 1.875rem)",
          "$type": "dimension",
          "$description": "3x extra large font size - fluid scaling",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "useCase": "Level 3 headings",
              "fluid": true,
              "fluidRange": {
                "min": "24px",
                "max": "30px",
                "viewport": {
                  "min": "320px",
                  "max": "1280px"
                }
              }
            }
          }
        },
        "2xl": {
          "$value": "clamp(1.25rem, 1rem + 1vw, 1.5rem)",
          "$type": "dimension",
          "$description": "2x extra large font size - fluid scaling",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "useCase": "Level 4 headings",
              "fluid": true,
              "fluidRange": {
                "min": "20px",
                "max": "24px",
                "viewport": {
                  "min": "320px",
                  "max": "1280px"
                }
              }
            }
          }
        },
        "xl": {
          "$value": "20px",
          "$type": "dimension",
          "$description": "Extra large font size - static (no responsive scaling)",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "useCase": "Subtitles, level 5-6 headings",
              "fluid": false
            }
          }
        }
        // ... (remaining static tokens unchanged)
      }
    }
  }
}
```

### CSS Output

```css
:root {
  /* Fluid heading sizes */
  --lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
  --lufa-primitive-typography-font-size-4xl: clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem);
  --lufa-primitive-typography-font-size-3xl: clamp(1.5rem, 1.25rem + 1vw, 1.875rem);
  --lufa-primitive-typography-font-size-2xl: clamp(1.25rem, 1rem + 1vw, 1.5rem);

  /* Static sizes (unchanged) */
  --lufa-primitive-typography-font-size-xl: 20px;
  --lufa-primitive-typography-font-size-lg: 18px;
  --lufa-primitive-typography-font-size-base: 16px;
  --lufa-primitive-typography-font-size-sm: 14px;
  --lufa-primitive-typography-font-size-xs: 12px;
}
```

**No media queries needed** - clamp() handles all viewport sizes.

### Browser Support

**clamp() support:** 96% global coverage (caniuse.com)

**Unsupported browsers (IE11, older mobile):**

- Fallback to `max` value (desktop size)
- Acceptable degradation - slightly larger text on old mobile browsers
- Can add fallback if needed:
  ```css
  font-size: 48px; /* Fallback */
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem); /* Modern */
  ```

### Naming Convention

**Decision:** Keep current token names (5xl, 4xl, 3xl, 2xl)

**Rationale:**

- No need for `.fluid` suffix - implementation detail hidden
- Developers don't need to know if token uses clamp() or static value
- Semantic tokens (heading-1, heading-2) reference primitives unchanged
- Zero breaking changes to API

### Migration Path

**Backward Compatibility:** ✅ **100% backward compatible**

- Token names unchanged
- Semantic token structure unchanged
- Component API unchanged
- CSS variables unchanged

**Visual Changes:** ⚠️ **Intentional improvements**

- Mobile: Headings will be smaller (better readability)
- Desktop: Headings slightly larger on ultra-wide screens (1536px+)
- Tablet: Minimal change (clamp smooths transitions)

**Migration Required:** None - automatic on upgrade

---

## Consequences

### Positive ✅

- **Budget-friendly:** Only ~240 bytes CSS impact (0.3% of budget)
- **Better mobile UX:** H1 shrinks from 48px → 32px on 320px screens
- **Smooth scaling:** No abrupt jumps at breakpoints
- **Modern approach:** CSS clamp() is industry best practice
- **Zero API changes:** Fully backward compatible
- **Leaves headroom:** 2+ KB remaining for other enhancements
- **Easy to understand:** Developers can inspect clamp() in DevTools
- **Maintenance-free:** No breakpoint media queries to maintain

### Negative ⚠️

- **Limited scope:** Only 4 tokens get responsive behavior (not full scale)
- **Learning curve:** Teams unfamiliar with clamp() need education
- **IE11 unsupported:** Falls back to desktop size (acceptable)
- **Less precise:** Can't target exact sizes at specific breakpoints
- **Calculation complexity:** Harder to calculate exact size at arbitrary viewport

### Neutral

- **Conservative approach:** Not all typography is responsive (by design)
- **Body text static:** 16px is already optimal, no change needed
- **Desktop-first fallback:** Older browsers get larger text (not smaller)

### Trade-offs

**We chose:**

- Budget efficiency over comprehensive responsiveness
- Smooth scaling over precise breakpoint control
- Modern solution over legacy browser perfection
- Implementation simplicity over maximum flexibility

**We rejected:**

- Breakpoint-based (too much CSS)
- Full responsive scale (unnecessary, expensive)
- Hybrid approach (complexity for minimal gain)

---

## Alternatives Considered

### Alternative 1: Breakpoint-Based Responsive Typography

**Approach:** 3 variants per token (base, md, lg) with media queries

```css
--lufa-primitive-typography-font-size-5xl: 32px; /* Mobile */
--lufa-primitive-typography-font-size-5xl-md: 40px; /* Tablet */
--lufa-primitive-typography-font-size-5xl-lg: 48px; /* Desktop */

@media (min-width: 768px) {
  :root {
    --lufa-primitive-typography-font-size-5xl: var(--lufa-primitive-typography-font-size-5xl-md);
  }
}
```

**Rejected Because:**

- **CSS bloat:** 11 tokens × 3 variants × 3 lines = ~990 lines, ~1.8 KB
- **Budget risk:** Only 3.29 KB remaining - this consumes 55%
- **Abrupt jumps:** Size changes sharply at 768px, 1024px
- **Maintenance burden:** Every token needs 3 breakpoint variants
- **Overkill:** Not all tokens need responsive behavior

**When it would make sense:**

- If CSS budget was larger (>20 KB headroom)
- If precise control at breakpoints was critical
- If design required specific sizes at each breakpoint

---

### Alternative 2: Full Responsive Scale (All 11 Tokens)

**Approach:** Apply clamp() to all font sizes (xs-5xl)

**Rejected Because:**

- **Unnecessary:** Body text (16px) is already optimal
- **Small sizes don't benefit:** xs (12px) shouldn't shrink on mobile
- **Added complexity:** More tokens to maintain
- **Minimal UX gain:** Only headings benefit from scaling

**CSS Impact:** ~605 bytes (still within budget, but wasteful)

---

### Alternative 3: Static Typography (No Responsiveness)

**Approach:** Keep all tokens at fixed pixel values

**Pros:**

- Zero CSS impact
- Simple, no learning curve
- Maximum compatibility

**Cons:**

- **Mobile UX suffers:** H1 (48px) too large on 320px screens
- **Missed opportunity:** Modern CSS enables better UX
- **Not competitive:** All major design systems use responsive typography
- **User feedback:** Teams report headings are too large on mobile

**Verdict:** Rejected - mobile experience is too important

---

### Alternative 4: Hybrid (Fluid + Breakpoint)

**Approach:** Use clamp() with media query adjustments

```css
--lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 2.5rem);

@media (min-width: 768px) {
  --lufa-primitive-typography-font-size-5xl: clamp(2.5rem, 2rem + 2vw, 3rem);
}
```

**Rejected Because:**

- **Highest CSS cost:** ~2.4 KB (73% of remaining budget)
- **Diminishing returns:** Minimal UX improvement over pure clamp()
- **Complexity:** Harder to understand and maintain
- **Over-engineering:** Simple clamp() achieves 95% of the benefit

---

## Implementation Notes

### Phase 1: Update Token Definitions (30 minutes)

1. Edit `tokens/src/primitives/typography/font-sizes.json`
2. Replace 5xl, 4xl, 3xl, 2xl `$value` with clamp() expressions
3. Add `$extensions.lufa.fluid: true` metadata
4. Add `fluidRange` documentation
5. Run `npm run tokens:build`
6. Verify CSS output contains clamp()

### Phase 2: Testing (1 hour)

1. **Visual regression testing:**
   - Capture Storybook at 320px, 768px, 1280px
   - Compare heading sizes (should be smaller on mobile)
   - Verify smooth scaling in Chrome DevTools

2. **Browser testing:**
   - Chrome/Edge (clamp support)
   - Firefox (clamp support)
   - Safari (clamp support)
   - IE11 (fallback to max value)

3. **Component testing:**
   - Text component with all heading variants
   - Verify no layout breaks
   - Check line-height still works

### Phase 3: Documentation (30 minutes)

1. Update typography docs with responsive behavior
2. Add clamp() calculator example
3. Document mobile/desktop size ranges
4. Add migration notes (no action required)

### Testing Checklist

- [ ] 5xl scales from 32px (mobile) to 48px (desktop)
- [ ] 4xl scales from 28px to 36px
- [ ] 3xl scales from 24px to 30px
- [ ] 2xl scales from 20px to 24px
- [ ] xl-xs remain static (no change)
- [ ] Semantic tokens (heading-1, etc.) work correctly
- [ ] Text component renders all variants
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] CSS size < 70 KB

---

## Success Metrics

| Metric                   | Target                        | Validation Method                    |
| ------------------------ | ----------------------------- | ------------------------------------ |
| CSS Budget               | < 70 KB                       | Measure `dist/tokens.css` size       |
| CSS Increase             | < 500 bytes                   | Compare before/after build           |
| Mobile H1 Size (320px)   | 32px (down from 48px)         | Chrome DevTools responsive mode      |
| Desktop H1 Size (1280px) | 48px (same)                   | Chrome DevTools                      |
| Smooth Scaling           | No abrupt jumps               | Manual testing across viewports      |
| Browser Support          | Chrome, Firefox, Safari, Edge | Visual testing in each browser       |
| Backward Compatibility   | 100% - no breaking changes    | Build succeeds, no TypeScript errors |
| Developer Satisfaction   | > 8/10 (post-release survey)  | Survey after 30 days                 |

---

## References

### Industry Examples

- **Tailwind CSS:** [Fluid Typography Plugin](https://tailwindcss.com/docs/font-size#fluid-typography)
- **Utopia:** [Fluid Type Scale Calculator](https://utopia.fyi/type/calculator/)
- **Material Design 3:** [Adaptive Typography](https://m3.material.io/styles/typography/overview)
- **Modern CSS:** [Fluid Typography by CSS-Tricks](https://css-tricks.com/snippets/css/fluid-typography/)

### Tools

- **clamp() Calculator:** https://clamp.font-size.app/
- **Fluid Type Scale Generator:** https://www.fluid-type-scale.com/
- **Can I Use clamp():** https://caniuse.com/css-math-functions

### Internal References

- **Analysis:** `_bmad-output/subjects/typography-tokens/analysis/typography-analysis-2026-01-26.md` (Section 2.1 - P1: No Responsive Typography)
- **Phase 2C:** Responsive spacing system using similar clamp() approach
- **Breakpoint Tokens:** ADR-005 (320px, 640px, 768px, 1024px, 1280px, 1536px)

---

## Decision Outcome

**Chosen Option:** Conservative Fluid Typography using CSS clamp() for 4 heading tokens (2xl-5xl)

**Confidence Level:** High (9/10)

**Rationale:**

- **Budget-conscious:** Only ~240 bytes CSS impact (7% of remaining budget)
- **UX improvement:** Fixes mobile heading overflow issue
- **Modern solution:** Industry best practice (clamp())
- **Low risk:** Backward compatible, zero API changes
- **Scalable:** Leaves 2+ KB for other Phase 2D features (letter-spacing, badge tokens)

**Next Steps:**

1. Review and approve this ADR
2. Proceed to ADR-009 (Letter-Spacing Token Architecture)
3. Implement fluid typography (Sprint 1)
4. Test across viewports and browsers
5. Document responsive behavior

---

**Status:** ✅ Proposed (Awaiting Approval)  
**Approved By:** [Pending]  
**Date Approved:** [Pending]  
**Review Date:** [Pending]

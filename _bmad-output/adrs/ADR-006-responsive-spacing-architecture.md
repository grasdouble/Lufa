# ADR-006: Responsive Spacing Architecture

**Status:** Proposed  
**Date:** 2026-01-26  
**Deciders:** Design System Team, Architecture Team  
**Subject:** spacing-layout-tokens  
**Phase:** Planning (Phase 2)  
**Depends On:** ADR-005 (Breakpoint Token Strategy)

---

## Context

The Lufa Design System currently has **minimal responsive spacing support**. Only 2 manual responsive tokens exist (`page-padding-mobile` and `section-gap-mobile`), and there's no systematic approach for responsive spacing across components and layouts. With breakpoint tokens defined (ADR-005), we need to decide how spacing tokens should adapt across different screen sizes.

### Current State

**Existing Responsive Tokens:**

```json
{
  "page-padding": "24px", // Desktop
  "page-padding-mobile": "16px", // Mobile
  "section-gap": "64px", // Desktop
  "section-gap-mobile": "48px" // Mobile
}
```

**Problems:**

1. **No systematic approach** - Only 2 tokens have responsive variants
2. **Binary mobile/desktop** - No intermediate breakpoints (tablet, small desktop)
3. **Token explosion risk** - Adding variants for all 6 breakpoints = 6x token count
4. **Hard to maintain** - Each new spacing token needs 2-6 variants
5. **No fluid spacing** - Spacing jumps at breakpoints instead of scaling smoothly

### Requirements

- Enable responsive spacing without excessive token proliferation
- Support key layout tokens that need responsive behavior
- Maintain developer ergonomics (easy to use and understand)
- Allow both discrete (step-based) and fluid (clamp-based) spacing
- Integrate with breakpoint tokens from ADR-005
- Minimize performance impact (CSS file size)

---

## Decision

### Hybrid Approach: Targeted Manual Variants + Fluid Spacing Tokens

We will use a **3-tier responsive spacing strategy**:

1. **Tier 1: Manual Breakpoint Variants** (for critical layout tokens)
2. **Tier 2: Fluid Spacing Tokens** (for large-scale spacing like hero sections)
3. **Tier 3: Base Tokens** (no responsive behavior - use same value at all sizes)

---

## Tier 1: Manual Breakpoint Variants

### When to Use

- **Layout-critical tokens** where precise control is needed at specific breakpoints
- **Container padding/margins** that define page structure
- **Section spacing** that significantly impacts layout

### Naming Convention

**Pattern:** `{token-name}-{breakpoint}`

**Example:**

```json
{
  "page-padding": "24px", // Default (mobile-first base)
  "page-padding-sm": "24px", // 640px+
  "page-padding-md": "32px", // 768px+
  "page-padding-lg": "40px", // 1024px+
  "page-padding-xl": "48px" // 1280px+
}
```

### Tokens That Get Variants

**High Priority (Must Have):**

- `page-padding` (horizontal page margins)
- `section-gap` (vertical section spacing)
- `container-gutter` (grid container gutters)
- `grid-gap` (grid item spacing)

**Medium Priority (Should Have):**

- `header-height` (navigation bar height)
- `modal-padding` (modal content padding)
- `card-padding` (card internal padding)

**Low Priority (Optional):**

- Component-specific spacing (buttons, inputs, etc.) - typically don't need responsive variants

### Implementation Strategy

**Conservative Approach:** Start with **3 variants** (base, md, lg) instead of 6.

**Rationale:**

- **Reduces token count** by 50% (3 variants vs 6)
- **Covers key breakpoints:** mobile (base), tablet (md), desktop (lg)
- **Easier maintenance** - fewer tokens to update
- **Can expand later** if needed (add sm, xl, 2xl variants)

**Example Structure:**

```json
{
  "core": {
    "layout": {
      "page-padding": {
        "$value": "{primitive.spacing.16}",
        "$type": "dimension",
        "$description": "Horizontal page padding (mobile base)",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "layout",
            "responsive": {
              "base": "{primitive.spacing.16}", // 16px (mobile)
              "md": "{primitive.spacing.24}", // 24px (tablet)
              "lg": "{primitive.spacing.32}" // 32px (desktop)
            }
          }
        }
      },
      "section-gap": {
        "$value": "{primitive.spacing.48}",
        "$type": "dimension",
        "$description": "Vertical section spacing (mobile base)",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "layout",
            "responsive": {
              "base": "{primitive.spacing.48}", // 48px (mobile)
              "md": "{primitive.spacing.64}", // 64px (tablet)
              "lg": "{primitive.spacing.80}" // 80px (desktop)
            }
          }
        }
      }
    }
  }
}
```

### CSS Output

**Option A: Separate CSS Variables (Recommended)**

```css
:root {
  --lufa-core-layout-page-padding: 16px;
  --lufa-core-layout-page-padding-md: 24px;
  --lufa-core-layout-page-padding-lg: 32px;
}

@media (min-width: 768px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-core-layout-page-padding-md);
  }
}

@media (min-width: 1024px) {
  :root {
    --lufa-core-layout-page-padding: var(--lufa-core-layout-page-padding-lg);
  }
}

/* Usage in components */
.page-container {
  padding-inline: var(--lufa-core-layout-page-padding);
}
```

**Benefit:** Components reference a single variable that automatically updates at breakpoints.

**Option B: Explicit Variants (Alternative)**

```css
:root {
  --lufa-core-layout-page-padding: 16px;
  --lufa-core-layout-page-padding-md: 24px;
  --lufa-core-layout-page-padding-lg: 32px;
}

/* Usage in components */
.page-container {
  padding-inline: var(--lufa-core-layout-page-padding);
}

@media (min-width: 768px) {
  .page-container {
    padding-inline: var(--lufa-core-layout-page-padding-md);
  }
}

@media (min-width: 1024px) {
  .page-container {
    padding-inline: var(--lufa-core-layout-page-padding-lg);
  }
}
```

**Benefit:** More explicit, easier to debug, no CSS variable override magic.

**Decision:** Use **Option A** (automatic override) for better DX - components don't need media queries.

---

## Tier 2: Fluid Spacing Tokens

### When to Use

- **Large-scale spacing** (hero sections, page margins)
- **Smooth scaling** desired between breakpoints
- **Visual continuity** more important than precise control

### Implementation

Use CSS `clamp()` function for fluid scaling between min and max values:

**Pattern:** `{token-name}-fluid`

**Example:**

```json
{
  "core": {
    "layout": {
      "section-gap-fluid": {
        "$value": "clamp(48px, 8vw, 96px)",
        "$type": "dimension",
        "$description": "Fluid section spacing - scales from 48px (mobile) to 96px (desktop)",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "layout",
            "fluid": {
              "min": "{primitive.spacing.48}",
              "preferred": "8vw",
              "max": "{primitive.spacing.96}"
            }
          }
        }
      },
      "hero-padding-fluid": {
        "$value": "clamp(32px, 6vw, 80px)",
        "$type": "dimension",
        "$description": "Fluid hero padding - scales smoothly",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "layout",
            "fluid": {
              "min": "{primitive.spacing.32}",
              "preferred": "6vw",
              "max": "{primitive.spacing.80}"
            }
          }
        }
      }
    }
  }
}
```

### CSS Output

```css
:root {
  --lufa-core-layout-section-gap-fluid: clamp(48px, 8vw, 96px);
  --lufa-core-layout-hero-padding-fluid: clamp(32px, 6vw, 80px);
}

/* Usage */
.hero-section {
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
}

.section {
  margin-block: var(--lufa-core-layout-section-gap-fluid);
}
```

### Formula Guide

**Clamp Formula:** `clamp(MIN, PREFERRED, MAX)`

- **MIN:** Smallest value (mobile)
- **PREFERRED:** Viewport-relative value (e.g., `8vw`, `5vi`)
- **MAX:** Largest value (desktop)

**Viewport Units:**

- `vw`: 1% of viewport width (most common)
- `vi`: 1% of inline axis (respects writing mode)
- `calc()`: Can combine units, e.g., `calc(16px + 2vw)`

**Recommended Percentages:**

- **Small spacing (16-32px):** 2-4vw
- **Medium spacing (32-64px):** 4-6vw
- **Large spacing (64-96px):** 6-10vw

### Tokens That Get Fluid Variants

**High Priority:**

- `section-gap-fluid` (vertical section spacing)
- `hero-padding-fluid` (hero section padding)
- `container-gutter-fluid` (grid gutters)

**Medium Priority:**

- `page-margin-fluid` (outer page margins)
- `card-padding-fluid` (large card padding)

**Not Recommended:**

- Small spacing (4-16px) - too subtle to scale
- Component spacing (buttons, inputs) - needs precision

---

## Tier 3: Base Tokens (No Responsive Behavior)

### When to Use

- **Component-level spacing** (button padding, input height)
- **Micro spacing** (4-12px gaps)
- **Consistent across all breakpoints**

### Examples

- `button-padding-x` - Button horizontal padding (always 16px)
- `button-padding-y` - Button vertical padding (always 8px)
- `input-padding` - Input padding (always 12px)
- `card-gap` - Card internal gaps (always 16px)

**Rationale:** These spacing values are designed to work at any screen size. Making them responsive adds complexity without benefit.

---

## Migration Strategy

### Phase 1: Add Responsive Variants to Existing Tokens

**Update existing manual responsive tokens:**

**Before:**

```json
{
  "page-padding": "24px",
  "page-padding-mobile": "16px",
  "section-gap": "64px",
  "section-gap-mobile": "48px"
}
```

**After (with deprecation):**

```json
{
  "page-padding": "16px", // Base (mobile-first)
  "page-padding-md": "24px",
  "page-padding-lg": "32px",
  "page-padding-mobile": "16px", // DEPRECATED - use base

  "section-gap": "48px", // Base (mobile-first)
  "section-gap-md": "64px",
  "section-gap-lg": "80px",
  "section-gap-mobile": "48px" // DEPRECATED - use base
}
```

**Deprecation Notice:** Add `$deprecated: true` to old tokens with replacement guidance.

### Phase 2: Add Fluid Tokens

Add new fluid tokens without affecting existing tokens:

```json
{
  "section-gap-fluid": "clamp(48px, 8vw, 96px)",
  "hero-padding-fluid": "clamp(32px, 6vw, 80px)"
}
```

### Phase 3: Expand Coverage (Future)

Add responsive variants to more tokens as needed:

- `header-height` variants
- `modal-padding` variants
- `card-padding` variants

---

## Performance Considerations

### CSS File Size Impact

**Baseline:** 12 primitive spacing tokens × 40 bytes = ~480 bytes

**Adding 3-variant system to 6 layout tokens:**

- 6 base tokens × 40 bytes = 240 bytes
- 6 × 2 variants (md, lg) × 40 bytes = 480 bytes
- Media query overhead: ~200 bytes
- **Total:** ~920 bytes (+440 bytes, 92% increase)

**Adding 4 fluid tokens:**

- 4 tokens × 60 bytes (clamp is longer) = 240 bytes

**Grand Total Impact:** ~1,160 bytes (~1.2 KB)

**Assessment:** Negligible impact on bundle size (< 2% of 61.84 KB current CSS).

### Browser Support

**CSS clamp():**

- ✅ Chrome 79+ (Dec 2019)
- ✅ Firefox 75+ (Apr 2020)
- ✅ Safari 13.1+ (Mar 2020)
- ✅ Edge 79+ (Jan 2020)

**Coverage:** 97%+ global browser support (caniuse.com)

**Fallback Strategy:** Not needed - baseline browsers all support clamp().

---

## Consequences

### Positive

✅ **Systematic responsive spacing** - Clear rules for when/how to add variants  
✅ **Developer choice** - Manual variants for precision, fluid for smoothness  
✅ **Minimal token explosion** - Only 3 variants (base, md, lg) for most tokens  
✅ **Performance** - Small CSS impact (~1.2 KB)  
✅ **Future-proof** - Can add more variants/fluid tokens as needed  
✅ **Better UX** - Smooth scaling on fluid tokens, precise control on variants  
✅ **Backwards compatible** - Old tokens deprecated but still work

### Negative

⚠️ **Complexity** - 3 approaches (manual, fluid, static) to learn  
⚠️ **Decision overhead** - Designers/devs must choose approach per token  
⚠️ **CSS variable override magic** - Option A uses automatic override (could be confusing)  
⚠️ **Maintenance** - More tokens to update when spacing scale changes  
⚠️ **Testing** - Must test all breakpoint combinations

### Neutral

- **3 variants** - Fewer than Bootstrap (5) but more than basic mobile/desktop (2)
- **Fluid tokens are additive** - Teams can ignore if they prefer manual variants
- **Not automatic** - Tokens don't auto-generate responsive variants (intentional)

---

## Alternatives Considered

### Alternative 1: Full Breakpoint Variants (All 6 Breakpoints)

**Pattern:** Add xs, sm, md, lg, xl, 2xl variants for all spacing tokens.

**Rejected** because:

- **Token explosion:** 12 spacing × 6 variants = 72 tokens (vs 12 currently)
- **Maintenance nightmare:** Every spacing change affects 6 tokens
- **Overkill:** Most tokens don't need 6 variants
- **Poor DX:** Too many options, decision paralysis

### Alternative 2: Only Fluid Spacing (No Manual Variants)

**Pattern:** Use `clamp()` for all responsive spacing.

**Rejected** because:

- **Loss of control:** Can't target specific breakpoints precisely
- **Design mismatch:** Designs often specify exact values at breakpoints
- **Debugging difficulty:** Viewport-relative units harder to reason about
- **Not suitable for all spacing:** Small spacing (4-16px) doesn't benefit from fluid scaling

### Alternative 3: CSS Container Queries

**Pattern:** Use `@container` queries for component-level responsive spacing.

**Rejected for v0.8.0** because:

- **Browser support:** Still maturing (2023+), not baseline yet
- **Complexity:** Requires container context setup
- **Overkill:** Layout-level media queries are sufficient for most needs
- **Future consideration:** Revisit in Phase 3 (2027+)

### Alternative 4: JavaScript-Based Responsive Spacing

**Pattern:** Use JavaScript to detect viewport size and apply spacing classes.

**Rejected** because:

- **Performance:** Requires runtime JavaScript
- **Complexity:** Harder to implement and debug
- **Accessibility:** CSS-only approach is more reliable
- **Not necessary:** CSS media queries solve the problem natively

### Alternative 5: Automatic Responsive Scaling

**Pattern:** Generate responsive variants automatically based on primitive scale.

**Rejected** because:

- **Loss of design control:** Not all tokens should scale proportionally
- **No semantic meaning:** Auto-generated values may not match design intent
- **Hidden magic:** Hard to understand what values are used at each breakpoint
- **Maintenance risk:** Changing primitives unexpectedly affects all tokens

---

## Implementation Guidelines

### When to Add Responsive Variants

**✅ Add Variants If:**

- Token affects page-level layout (padding, gaps, margins)
- Design specifies different values at breakpoints
- Token value significantly impacts user experience at different sizes
- Token is used in multiple components/layouts

**❌ Don't Add Variants If:**

- Token is component-specific (button padding, icon size)
- Spacing is micro-level (4-12px)
- Same value works well at all breakpoints
- Token is rarely used

### When to Use Fluid Tokens

**✅ Use Fluid If:**

- Large spacing (48px+) that should scale smoothly
- Hero sections, page margins, section gaps
- Visual continuity more important than precision
- Design intent is "scale proportionally"

**❌ Don't Use Fluid If:**

- Precise breakpoint control needed
- Small spacing values (< 32px)
- Component-level spacing
- Design specifies exact breakpoint values

### Naming Conventions

**Manual Variants:**

- Base: `{token-name}` (no suffix)
- Variants: `{token-name}-{breakpoint}` (e.g., `page-padding-md`)

**Fluid Tokens:**

- Pattern: `{token-name}-fluid` (e.g., `section-gap-fluid`)

**Deprecated Tokens:**

- Keep old names as aliases
- Add `$deprecated: true` in extensions
- Document replacement token

---

## Documentation Requirements

### Must Document

1. **Responsive spacing guide** - When to use manual vs fluid vs static
2. **Token naming conventions** - How variants are named
3. **CSS output patterns** - How media queries are generated
4. **Migration guide** - How to update from old tokens
5. **Breakpoint reference** - Quick reference for md/lg values
6. **Clamp() calculator** - Tool or guide for creating fluid tokens
7. **Examples** - Real-world usage in components

### Code Examples

**Example 1: Manual Variant Usage**

```css
.page-container {
  /* Automatically responds to breakpoints */
  padding-inline: var(--lufa-core-layout-page-padding);
}
```

**Example 2: Fluid Token Usage**

```css
.hero-section {
  /* Smoothly scales between 32px and 80px */
  padding-block: var(--lufa-core-layout-hero-padding-fluid);
}
```

**Example 3: Explicit Breakpoint Control**

```css
.custom-component {
  margin-bottom: var(--lufa-core-layout-section-gap);
}

@media (min-width: 768px) {
  .custom-component {
    margin-bottom: var(--lufa-core-layout-section-gap-md);
  }
}
```

---

## References

### Industry Approaches

- **Tailwind CSS:** Responsive prefix system (`md:p-4`, `lg:p-8`)
- **Bootstrap 5:** Responsive spacing utilities (`.px-2`, `.px-md-3`)
- **Material Design 3:** Auto-scaling spacing based on density
- **Radix Themes:** Responsive object props (`{ initial: '1', md: '2' }`)
- **Utopia:** Fluid type/space scale calculator (utopia.fyi)

### Technical Resources

- **CSS Tricks:** [Linearly Scale font-size with CSS clamp()](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/)
- **MDN:** [clamp() CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- **Smashing Magazine:** [Min(), Max(), and Clamp(): CSS Functions to Know](https://www.smashingmagazine.com/2020/05/min-max-clamp-css-functions/)

### Internal References

- **ADR-005:** Breakpoint Token Strategy
- **Analysis:** Section 4.4 - Responsive Spacing Strategies
- **Existing tokens:** `core/layout/spacing.json` (page-padding-mobile, section-gap-mobile)

---

## Decision Outcome

**Chosen Option:** Hybrid approach with 3-tier system (manual variants, fluid tokens, static base tokens).

**Confidence Level:** High (8/10)

**Rationale:**

- **Flexibility:** Supports both precise control and smooth scaling
- **Pragmatic:** Only adds variants where needed (avoids token explosion)
- **Industry-aligned:** Combines best of Tailwind (variants) and Utopia (fluid)
- **Performance:** Minimal CSS impact (~1.2 KB)
- **Backwards compatible:** Old tokens work, new tokens are additive

**Key Decisions:**

1. Use **3 responsive variants** (base, md, lg) for manual tokens
2. Add **fluid tokens** using `clamp()` for large-scale spacing
3. Use **CSS variable override** pattern (Option A) for automatic breakpoint adaptation
4. **Deprecate** old `-mobile` suffix tokens in favor of base + variants
5. **Don't make everything responsive** - only layout-critical tokens

**Next Steps:**

1. Review and approve this ADR with design and engineering teams
2. Proceed to ADR-007 (Zero-Value Token Handling)
3. Create responsive spacing tokens (Phase 2 Sprint 2)
4. Implement CSS build system updates for media queries
5. Create responsive spacing usage guide

---

**Status:** ✅ Proposed (Awaiting Approval)  
**Approved By:** [Pending]  
**Date Approved:** [Pending]  
**Review Date:** [Pending]

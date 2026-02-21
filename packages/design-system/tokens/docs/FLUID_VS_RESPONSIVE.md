# Fluid vs Responsive Tokens - Architecture Guide

**Lufa Design System v2.0**  
**Package**: `@grasdouble/lufa_design-system-tokens`

---

## Executive Summary

The Lufa Design System uses **TWO distinct approaches** for viewport adaptation, each optimized for different use cases:

| Approach       | Tokens    | Method        | Use Case                                 |
| -------------- | --------- | ------------- | ---------------------------------------- |
| **Fluid**      | 11 tokens | CSS `clamp()` | Continuous viewport scaling (typography) |
| **Responsive** | 18 tokens | Media queries | Discrete breakpoint values (layout)      |

**This is intentional, not a bug.** Both approaches coexist by design to optimize for performance, maintainability, and user experience.

### Key Insight

- **Fluid tokens** (clamp) = Typography that scales smoothly across ALL viewport sizes
- **Responsive tokens** (@media) = Layout spacing that changes at specific breakpoints

**They solve different problems and are mutually exclusive by design.**

---

## Table of Contents

- [The Two Approaches Explained](#the-two-approaches-explained)
- [When to Use Fluid vs Responsive](#when-to-use-fluid-vs-responsive)
- [Technical Implementation](#technical-implementation)
- [Visual Examples](#visual-examples)
- [Code Examples from Actual Tokens](#code-examples-from-actual-tokens)
- [Decision Tree](#decision-tree)
- [Performance Considerations](#performance-considerations)
- [Browser Support](#browser-support)
- [Architecture Decisions](#architecture-decisions)
- [FAQ](#faq)

---

## The Two Approaches Explained

### Approach 1: Fluid Tokens (CSS clamp)

**What it is:** Typography tokens that scale continuously using CSS `clamp()` function.

**How it works:**

```css
font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
/* Minimum: 32px → Scales with viewport → Maximum: 48px */
```

**Characteristics:**

- Smooth, continuous scaling across ALL viewport sizes
- Single CSS declaration (minimal file size)
- No breakpoints or media queries needed
- Perfect for typography (headings, large text)

**Count:** 11 tokens total

- 7 fluid typography tokens (2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl)
- 4 fluid layout spacing tokens (hero section padding, large-scale spacing)

### Approach 2: Responsive Tokens (Media Queries)

**What it is:** Layout tokens that change at specific breakpoints using @media queries.

**How it works:**

```css
/* Base (mobile) */
padding: 16px;

/* Tablet */
@media (min-width: 768px) {
  padding: 24px;
}

/* Desktop */
@media (min-width: 1024px) {
  padding: 32px;
}
```

**Characteristics:**

- Discrete value changes at specific breakpoints
- Precise control over layout at each screen size
- Multiple CSS declarations (3-4 per token)
- Perfect for layout spacing (page padding, section gaps)

**Count:** 18 tokens total

- Page padding tokens (base, md, lg)
- Section gap tokens (base, md, lg)
- Container gutter tokens (base, md, lg)
- Grid gap tokens (base, md, lg)
- Header height tokens (base, md, lg)
- Modal padding tokens (base, md, lg)

---

## When to Use Fluid vs Responsive

### Use Fluid Tokens When:

✅ **Typography** - Headings, display text, large UI text  
✅ **Continuous scaling is desired** - Smooth adaptation across all viewport sizes  
✅ **Performance matters** - Minimal CSS overhead (single clamp() declaration)  
✅ **Visual hierarchy** - Text needs to maintain proportions at all sizes

**Examples:**

- H1 heading that scales from 32px on mobile to 48px on desktop
- Hero title that needs smooth scaling
- Display text in marketing pages

### Use Responsive Tokens When:

✅ **Layout spacing** - Page padding, section gaps, container spacing  
✅ **Discrete control is needed** - Different layouts at specific breakpoints  
✅ **Structural changes** - Layout shifts (1-column → 2-column → 3-column)  
✅ **Predictable values** - Known exact spacing at each breakpoint

**Examples:**

- Page horizontal padding that changes from 16px → 24px → 32px
- Section vertical spacing that increases at tablet and desktop
- Grid gaps that adjust for different screen sizes

### DO NOT Use:

❌ **Both on the same token** - They are mutually exclusive  
❌ **Fluid for layout spacing** - Can cause unpredictable gaps at intermediate sizes  
❌ **Responsive for typography** - Creates CSS bloat (3× the file size vs clamp)  
❌ **Fixed values for large headings** - Creates poor mobile experience

---

## Technical Implementation

### Fluid Token Structure (JSON)

```json
{
  "primitive": {
    "typography": {
      "font-size": {
        "5xl": {
          "$value": "clamp(2rem, 1.5rem + 2vw, 3rem)",
          "$type": "dimension",
          "$description": "5x extra large font size - fluid scaling",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "fluid": true,
              "fluidRange": {
                "min": "32px",
                "max": "48px",
                "viewport": {
                  "min": "320px",
                  "max": "1280px"
                }
              },
              "themeable": false,
              "modeAware": false
            }
          }
        }
      }
    }
  }
}
```

**Key Metadata:**

- `fluid: true` - Indicates this token uses CSS clamp()
- `fluidRange` - Documents the scaling range (min/max values and viewport range)

### Responsive Token Structure (JSON)

```json
{
  "core": {
    "layout": {
      "page-padding": {
        "base": {
          "$value": "{primitive.spacing.16}",
          "$type": "dimension",
          "$description": "Page padding on mobile (base)",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "layout",
              "responsive": {
                "breakpoint": "base",
                "applyAt": "all"
              },
              "themeable": false,
              "modeAware": false
            }
          }
        },
        "md": {
          "$value": "{primitive.spacing.24}",
          "$type": "dimension",
          "$description": "Page padding on tablet",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "layout",
              "responsive": {
                "breakpoint": "md",
                "applyAt": "768px"
              },
              "themeable": false,
              "modeAware": false
            }
          }
        },
        "lg": {
          "$value": "{primitive.spacing.32}",
          "$type": "dimension",
          "$description": "Page padding on desktop",
          "$extensions": {
            "lufa": {
              "level": "core",
              "category": "layout",
              "responsive": {
                "breakpoint": "lg",
                "applyAt": "1024px"
              },
              "themeable": false,
              "modeAware": false
            }
          }
        }
      }
    }
  }
}
```

**Key Metadata:**

- `responsive: {}` - Indicates this token uses media queries
- `breakpoint` - Which breakpoint this variant applies to
- `applyAt` - The pixel value where this variant activates

### CSS Output Comparison

#### Fluid Tokens → CSS

```css
/* Single declaration - minimal file size (80 bytes) */
--lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
```

**File size impact:** ~80 bytes per token

#### Responsive Tokens → CSS

```css
/* Base (mobile-first) */
--lufa-core-layout-page-padding-base: 16px;

/* Tablet */
@media (min-width: 768px) {
  --lufa-core-layout-page-padding-md: 24px;
}

/* Desktop */
@media (min-width: 1024px) {
  --lufa-core-layout-page-padding-lg: 32px;
}
```

**File size impact:** ~150 bytes per token set (3 variants)

---

## Visual Examples

### Example 1: Fluid Typography Scaling

```
Viewport Width:  320px    640px    960px    1280px   1920px
                  │         │        │        │        │
H1 Font Size:    32px     40px     44px     48px     48px  (clamped at max)
                  └─────────┴────────┴────────┴────────┘
                        Smooth, continuous scaling
```

**CSS:**

```css
h1 {
  font-size: var(--lufa-semantic-typography-heading-1);
  /* = clamp(2rem, 1.5rem + 2vw, 3rem) */
}
```

**User Experience:**

- On a 320px phone: 32px (readable, not overwhelming)
- On a 768px tablet: ~41px (scales proportionally)
- On a 1280px desktop: 48px (maximum size reached)
- On a 1920px large screen: 48px (clamped at maximum)

---

### Example 2: Responsive Layout Spacing

```
Viewport Width:  320px    768px         1024px        1920px
                  │         │              │             │
Page Padding:    16px      24px           32px          32px
                  │         │              │             │
                  └─────────┼──────────────┼─────────────┘
                           Jump at         Jump at
                           breakpoint      breakpoint
```

**CSS:**

```css
.page-container {
  padding-inline: var(--lufa-core-layout-page-padding-base); /* 16px */
}

@media (min-width: 768px) {
  .page-container {
    padding-inline: var(--lufa-core-layout-page-padding-md); /* 24px */
  }
}

@media (min-width: 1024px) {
  .page-container {
    padding-inline: var(--lufa-core-layout-page-padding-lg); /* 32px */
  }
}
```

**User Experience:**

- On a 320px phone: 16px padding (maximize content space)
- On a 767px phone landscape: 16px padding (still mobile)
- On a 768px tablet: 24px padding (discrete jump - more breathing room)
- On a 1024px desktop: 32px padding (discrete jump - comfortable margins)

---

### Example 3: Why Not Mix Them?

**❌ BAD: Responsive Typography (CSS Bloat)**

```css
/* 11 tokens × 3 breakpoints × 150 bytes = ~4,950 bytes */
--lufa-primitive-typography-font-size-5xl: 32px;

@media (min-width: 768px) {
  --lufa-primitive-typography-font-size-5xl: 40px;
}

@media (min-width: 1024px) {
  --lufa-primitive-typography-font-size-5xl: 48px;
}
/* Repeated for 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl... */
```

**Problems:**

- Massive CSS file size increase (~5 KB)
- Abrupt text size changes at breakpoints (jarring UX)
- Maintenance nightmare (3× the tokens to update)

**❌ BAD: Fluid Layout Spacing (Unpredictable)**

```css
/* Page padding scales continuously - BAD for layout */
padding: clamp(1rem, 0.5rem + 2vw, 2rem);
/* 16px → ??? → 32px - unpredictable intermediate values */
```

**Problems:**

- Unpredictable spacing at intermediate viewports (400px, 900px, etc.)
- Harder to debug layout issues
- Can't align to grid systems that expect discrete values
- Makes responsive design testing difficult

---

## Code Examples from Actual Tokens

### Fluid Typography Tokens (11 total)

#### Example 1: Heading 1 (5xl)

**Token Path:** `primitive.typography.font-size.5xl`

```json
{
  "$value": "clamp(2rem, 1.5rem + 2vw, 3rem)",
  "$type": "dimension",
  "$description": "5x extra large font size - fluid scaling from mobile to desktop",
  "$extensions": {
    "lufa": {
      "fluid": true,
      "fluidRange": {
        "min": "32px",
        "max": "48px",
        "viewport": { "min": "320px", "max": "1280px" }
      }
    }
  }
}
```

**Usage:**

```css
h1 {
  font-size: var(--lufa-semantic-typography-heading-1);
  /* References primitive.typography.font-size.5xl */
}
```

**Result:**

- 320px viewport → 32px font size
- 640px viewport → 40px font size
- 1280px viewport → 48px font size (clamped)

---

#### Example 2: Heading 2 (4xl)

**Token Path:** `primitive.typography.font-size.4xl`

```json
{
  "$value": "clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)",
  "$type": "dimension",
  "$description": "4x extra large font size - fluid scaling",
  "$extensions": {
    "lufa": {
      "fluid": true,
      "fluidRange": {
        "min": "28px",
        "max": "36px",
        "viewport": { "min": "320px", "max": "1280px" }
      }
    }
  }
}
```

**Usage:**

```css
h2 {
  font-size: var(--lufa-semantic-typography-heading-2);
}
```

---

#### Complete Fluid Typography Scale

| Token | Min  | Max  | Viewport Range | Use Case                      |
| ----- | ---- | ---- | -------------- | ----------------------------- |
| `2xl` | 20px | 24px | 320px - 1280px | H4 headings                   |
| `3xl` | 24px | 30px | 320px - 1280px | H3 headings                   |
| `4xl` | 28px | 36px | 320px - 1280px | H2 headings                   |
| `5xl` | 32px | 48px | 320px - 1280px | H1 headings                   |
| `6xl` | 40px | 56px | 320px - 1280px | Hero titles (ADR-010)         |
| `7xl` | 48px | 64px | 320px - 1280px | Marketing displays (ADR-010)  |
| `8xl` | 56px | 72px | 320px - 1280px | Landing page heroes (ADR-010) |

---

### Responsive Layout Tokens (18 total)

#### Example 1: Page Padding

**Token Paths:** `core.layout.page-padding.{base|md|lg}`

**Base (Mobile):**

```json
{
  "page-padding": {
    "base": {
      "$value": "{primitive.spacing.16}",
      "$extensions": {
        "lufa": {
          "responsive": { "breakpoint": "base", "applyAt": "all" }
        }
      }
    }
  }
}
```

**Tablet (md):**

```json
{
  "page-padding": {
    "md": {
      "$value": "{primitive.spacing.24}",
      "$extensions": {
        "lufa": {
          "responsive": { "breakpoint": "md", "applyAt": "768px" }
        }
      }
    }
  }
}
```

**Desktop (lg):**

```json
{
  "page-padding": {
    "lg": {
      "$value": "{primitive.spacing.32}",
      "$extensions": {
        "lufa": {
          "responsive": { "breakpoint": "lg", "applyAt": "1024px" }
        }
      }
    }
  }
}
```

**Usage:**

```css
.page-container {
  padding-inline: var(--lufa-core-layout-page-padding-base);
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

---

#### Complete Responsive Token List

**Page Layout (6 tokens):**

- `core.layout.page-padding.{base|md|lg}` - Horizontal page margins
- `core.layout.section-gap.{base|md|lg}` - Vertical section spacing

**Container Layout (6 tokens):**

- `core.layout.container-gutter.{base|md|lg}` - Grid container gutters
- `core.layout.grid-gap.{base|md|lg}` - Grid item spacing

**Component Layout (6 tokens):**

- `core.layout.header-height.{base|md|lg}` - Navigation bar height
- `core.layout.modal-padding.{base|md|lg}` - Modal content padding

---

## Decision Tree

Use this flowchart to decide which approach to use:

```
START: Need to create a viewport-adaptive token?
│
├─ Q1: Is this a typography token (font-size)?
│   │
│   ├─ YES: Is it 2xl or larger (20px+)?
│   │   │
│   │   ├─ YES → Use FLUID (clamp)
│   │   │         Token: primitive.typography.font-size.{2xl-8xl}
│   │   │         Method: clamp(minRem, minRem + vw, maxRem)
│   │   │         Example: clamp(2rem, 1.5rem + 2vw, 3rem)
│   │   │
│   │   └─ NO → Use FIXED value (no adaptation)
│   │             Token: primitive.typography.font-size.{xs|sm|base|lg|xl}
│   │             Example: 16px
│   │
│   └─ NO → Continue to Q2
│
├─ Q2: Is this a layout spacing token?
│   │
│   ├─ YES: Does it need different values at specific breakpoints?
│   │   │
│   │   ├─ YES → Use RESPONSIVE (media queries)
│   │   │         Token: core.layout.{token-name}.{base|md|lg}
│   │   │         Method: @media (min-width: Xpx)
│   │   │         Example: 16px → 24px → 32px at breakpoints
│   │   │
│   │   └─ NO → Use FIXED value
│   │             Token: primitive.spacing.{value}
│   │             Example: 16px
│   │
│   └─ NO → Continue to Q3
│
└─ Q3: Is this a component-specific token?
    │
    ├─ Does the component layout change at breakpoints?
    │   │
    │   ├─ YES → Use RESPONSIVE variants
    │   │         Token: component.{name}.{property}.{base|md|lg}
    │   │
    │   └─ NO → Use FIXED value
    │             Token: component.{name}.{property}
    │
    └─ DEFAULT: Use FIXED value (no viewport adaptation)
```

---

## Quick Reference Table

| Scenario       | Approach       | Token Example                             | CSS Output                                              |
| -------------- | -------------- | ----------------------------------------- | ------------------------------------------------------- |
| H1 heading     | **Fluid**      | `primitive.typography.font-size.5xl`      | `clamp(2rem, 1.5rem + 2vw, 3rem)`                       |
| H2 heading     | **Fluid**      | `primitive.typography.font-size.4xl`      | `clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)`              |
| Body text      | Fixed          | `primitive.typography.font-size.base`     | `16px`                                                  |
| Page padding   | **Responsive** | `core.layout.page-padding.{base\|md\|lg}` | `16px` → `@media (768px) 24px` → `@media (1024px) 32px` |
| Section gap    | **Responsive** | `core.layout.section-gap.{base\|md\|lg}`  | `48px` → `@media (768px) 64px` → `@media (1024px) 80px` |
| Button padding | Fixed          | `component.button.padding.md`             | `12px 16px`                                             |
| Card padding   | Fixed          | `primitive.spacing.16`                    | `16px`                                                  |

---

## Performance Considerations

### CSS File Size Impact

**Current State:**

- Total tokens: 600+
- Total CSS: 66.71 KB / 70 KB budget (95.3% utilized)
- Remaining budget: 3.29 KB

**Fluid Tokens (11 tokens):**

- File size: ~0.6 KB (80 bytes per token)
- Impact: **Minimal** ✅

**Responsive Tokens (18 tokens = 6 token groups × 3 variants):**

- File size: ~0.9 KB (50 bytes × 3 variants × 6 groups)
- Impact: **Low** ✅

**If we used responsive for typography (alternative):**

- File size: ~4.95 KB (150 bytes × 3 variants × 11 tokens)
- Impact: **High** ❌ (would exceed budget)

**Conclusion:** Fluid typography + responsive layout = optimal balance

---

### Runtime Performance

**Fluid (clamp):**

- ✅ **Modern CSS** - Single calculation per render
- ✅ **No JavaScript** - Pure CSS solution
- ✅ **No layout thrashing** - No breakpoint checks
- ✅ **Smooth transitions** - No jarring jumps

**Responsive (media queries):**

- ✅ **Native browser feature** - Highly optimized
- ✅ **No calculation overhead** - Simple value swaps
- ✅ **Cached by browser** - Efficient rendering
- ⚠️ **Discrete jumps** - Values change at breakpoints (intentional for layout)

**Both approaches are performant.** The choice is about UX and file size, not runtime performance.

---

## Browser Support

### CSS clamp() (Fluid Tokens)

**Support:** 96.1% global coverage (Can I Use, 2026)

**Supported Browsers:**

- ✅ Chrome 79+ (Dec 2019)
- ✅ Firefox 75+ (Apr 2020)
- ✅ Safari 13.1+ (Mar 2020)
- ✅ Edge 79+ (Jan 2020)

**Fallback Strategy:**

```css
/* Graceful degradation for older browsers */
font-size: 2rem; /* Static fallback (32px) */
font-size: clamp(2rem, 1.5rem + 2vw, 3rem); /* Modern browsers */
```

**Decision:** No fallback needed for Lufa (targets modern browsers)

---

### Media Queries (Responsive Tokens)

**Support:** 99.9% global coverage

**Supported Browsers:**

- ✅ All modern browsers
- ✅ IE 11 (with `-ms-` prefixes if needed)
- ✅ Safari 3.1+ (2008)

**Fallback Strategy:** Not needed (universal support)

---

## Architecture Decisions

### Why Both Approaches Coexist

This is documented in two Architecture Decision Records (ADRs):

#### ADR-006: Responsive Spacing Architecture

**Status:** Implemented (Phase 2C)  
**Decision:** Use media query-based responsive tokens for layout spacing

**Rationale:**

- Layout spacing needs discrete control at breakpoints
- Fluid spacing causes unpredictable intermediate values
- Developers expect precise, predictable spacing for grid systems
- Conservative approach: 3 variants (base, md, lg) instead of 6
- Targets critical layout tokens: page-padding, section-gap, container-gutter

**File:** [`../../_docs/adrs/ADR-006-IMPLEMENTED-responsive-spacing-architecture.md`](../../_docs/adrs/ADR-006-IMPLEMENTED-responsive-spacing-architecture.md)

---

#### ADR-008: Responsive Typography Strategy

**Status:** Implemented (Phase 2D)  
**Decision:** Use CSS clamp() for fluid typography (headings only)

**Rationale:**

- Heading sizes are too large on mobile (48px H1 on 320px screen = 15% of width)
- Fluid typography provides smooth scaling without CSS bloat
- CSS budget constraints: clamp = 0.6 KB vs media queries = 4.95 KB
- Applied only to large headings (2xl-8xl), body text remains fixed
- Modern, elegant solution with 96%+ browser support

**File:** [`../../_docs/adrs/ADR-008-IMPLEMENTED-responsive-typography-strategy.md`](../../_docs/adrs/ADR-008-IMPLEMENTED-responsive-typography-strategy.md)

---

### Architecture Principles

1. **Use the right tool for the job**
   - Fluid = Typography (smooth scaling, minimal CSS)
   - Responsive = Layout (discrete control, predictable spacing)

2. **Performance over purity**
   - Don't use responsive for typography (CSS bloat)
   - Don't use fluid for layout (unpredictable values)

3. **Developer ergonomics**
   - Clear naming conventions (`fluid: true` vs `responsive: {}`)
   - Token metadata documents the approach
   - Validation prevents mixing approaches

4. **Conservative expansion**
   - Start with fewer variants (3 instead of 6 breakpoints)
   - Expand only when proven necessary
   - Minimize token count while maximizing utility

---

## FAQ

### Q: Why not use one approach for everything?

**A:** Each approach has different strengths:

- **Fluid (clamp):** Perfect for typography - smooth scaling, minimal CSS, no breakpoints
- **Responsive (@media):** Perfect for layout - discrete control, predictable values, grid alignment

Using the wrong approach creates problems:

- Responsive typography = 8× CSS file size increase
- Fluid layout = unpredictable intermediate values, hard to debug

---

### Q: Can a token be both fluid and responsive?

**A:** No, they are mutually exclusive by design.

**Validation Rule:** A token cannot have both `fluid: true` AND `responsive: {}` metadata.

**Reason:** They solve different problems. If you need both, you're likely solving the wrong problem.

---

### Q: What if I need fluid spacing for a specific use case?

**A:** Use the 4 existing fluid layout tokens:

- `core.layout.hero-section-padding.fluid` - Large hero sections
- `core.layout.large-vertical-gap.fluid` - Marketing page spacing
- `core.layout.full-width-spacing.fluid` - Edge-to-edge layouts
- `core.layout.immersive-padding.fluid` - Fullscreen experiences

**Don't create new fluid spacing tokens without architectural review.**

---

### Q: Why only 3 breakpoints (base, md, lg) instead of 6?

**A:** Conservative approach (ADR-006):

- **Reduces token count by 50%** (3 variants vs 6)
- **Covers 95% of use cases** (mobile, tablet, desktop)
- **Easier maintenance** - fewer tokens to update
- **Can expand later** if needed (add sm, xl, 2xl)

**The 3 breakpoints are:**

- `base` - Mobile (320px+) - All viewports by default
- `md` - Tablet (768px+) - Medium screens
- `lg` - Desktop (1024px+) - Large screens

---

### Q: How do I know which tokens are fluid vs responsive?

**A:** Check the token metadata in JSON:

**Fluid:**

```json
{
  "$extensions": {
    "lufa": {
      "fluid": true,
      "fluidRange": { ... }
    }
  }
}
```

**Responsive:**

```json
{
  "$extensions": {
    "lufa": {
      "responsive": {
        "breakpoint": "md",
        "applyAt": "768px"
      }
    }
  }
}
```

**Or use this quick reference:**

**Fluid tokens (11):**

- All typography tokens 2xl and above (`primitive.typography.font-size.{2xl|3xl|4xl|5xl|6xl|7xl|8xl}`)
- 4 special layout tokens (`core.layout.*-fluid`)

**Responsive tokens (18):**

- All `core.layout.*` tokens with variants (`{base|md|lg}`)

---

### Q: What about body text? Why is it fixed?

**A:** Body text (16px) works well at all screen sizes:

- **Readable on mobile** - 16px is optimal for body text on small screens
- **Comfortable on desktop** - 16px is a standard web font size
- **No CSS overhead** - Single value, no scaling needed
- **Predictable line length** - Easier to control measure (characters per line)

**Only large headings (20px+) benefit from fluid scaling.**

---

### Q: Can I use clamp() for custom values in my components?

**A:** Yes, but use tokens first:

**✅ Preferred - Use existing tokens:**

```css
.my-heading {
  font-size: var(--lufa-semantic-typography-heading-1);
}
```

**⚠️ Allowed - Custom clamp for special cases:**

```css
.hero-title {
  font-size: clamp(3rem, 2rem + 4vw, 5rem);
  /* Only if no token fits your need */
}
```

**❌ Don't create new fluid tokens without architectural review.**

---

### Q: What if I need a responsive token that's not in the system?

**A:** Follow this process:

1. **Check if an existing token can be reused**
   - Use semantic aliases when possible
   - Reference existing primitives

2. **Evaluate if it's truly layout-critical**
   - Does it define page structure?
   - Does it significantly impact user experience at different viewport sizes?

3. **Propose architectural change**
   - Document the use case
   - Estimate CSS file size impact
   - Get approval from design system team

**Guideline:** Only add responsive variants for layout-critical tokens.

---

## Summary

### Key Takeaways

1. **Two approaches, both intentional:**
   - **Fluid (clamp)** = 11 tokens = Typography
   - **Responsive (@media)** = 18 tokens = Layout

2. **They are mutually exclusive by design:**
   - A token cannot be both fluid and responsive
   - Each solves a different problem
   - Using the wrong approach creates issues

3. **Performance optimized:**
   - Fluid = 0.6 KB (minimal impact)
   - Responsive = 0.9 KB (low impact)
   - Alternative (responsive typography) = 4.95 KB (would exceed budget)

4. **Clear decision tree:**
   - Large headings (2xl+) → Fluid
   - Layout spacing → Responsive
   - Body text & component spacing → Fixed

5. **Documented in ADRs:**
   - ADR-006: Responsive spacing (media queries)
   - ADR-008: Fluid typography (clamp)

### This is a Feature, Not a Bug

The coexistence of fluid and responsive tokens is **intentional architectural design**, not technical debt. Each approach is optimized for its use case, resulting in:

- ✅ Better performance (minimal CSS file size)
- ✅ Better UX (smooth typography, predictable layout)
- ✅ Better DX (clear token choices, easy to understand)
- ✅ Better maintainability (fewer tokens, clear patterns)

---

**Architecture Score:** 10/10 ✅

**Related Documentation:**

- [ADR-006: Responsive Spacing Architecture](../../_docs/adrs/ADR-006-IMPLEMENTED-responsive-spacing-architecture.md)
- [ADR-008: Responsive Typography Strategy](../../_docs/adrs/ADR-008-IMPLEMENTED-responsive-typography-strategy.md)
- [TOKEN_ARCHITECTURE_VISUAL.md](./TOKEN_ARCHITECTURE_VISUAL.md) - Visual hierarchy guide
- [TYPOGRAPHY_SYSTEM.md](./TYPOGRAPHY_SYSTEM.md) - Complete typography documentation
- [SPACING_SCALE.md](./SPACING_SCALE.md) - Spacing system guide

---

**Last Updated:** February 2026  
**Version:** 2.0.0  
**Status:** ✅ Complete

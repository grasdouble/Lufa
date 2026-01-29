# ADR-005: Breakpoint Token Strategy

**Status:** Accepted - Implemented (Phase 2C)  
**Date:** 2026-01-26  
**Deciders:** Design System Team, Architecture Team  
**Subject:** spacing-layout-tokens  
**Phase:** Phase 2C Implementation - Complete

---

## Context

The Lufa Design System (v0.7.1) currently has **no breakpoint tokens** defined in the token system. Storybook uses hard-coded breakpoint values (320, 576, 768, 1024, 1280, 1536) with no synchronization to design tokens. This creates inconsistency across consuming applications and prevents systematic responsive design.

### Current Problems

1. **Hard-coded breakpoints** in Storybook (`.storybook/breakpoints.ts`)
2. **No token-driven responsive design** - developers use arbitrary values
3. **Inconsistent breakpoints** across different apps/components
4. **Cannot generate responsive utilities** without breakpoint tokens
5. **Layout tokens reference mobile/desktop** but no formal breakpoint system exists

### Requirements

- Define 5-7 breakpoint tokens that serve as the foundation for responsive design
- Align with industry standards (Tailwind, Material Design, Bootstrap)
- Support mobile-first approach (most common in modern web development)
- Enable media query generation from tokens
- Integrate with existing Storybook breakpoints
- Work in px, em, or rem units (decision required)

---

## Decision

### 1. Breakpoint Values

We will adopt a **6-breakpoint system** aligned with Tailwind CSS and current Storybook values:

| Token Name | Value  | px Value | Device Target       | Description                     |
| ---------- | ------ | -------- | ------------------- | ------------------------------- |
| `xs`       | 320px  | 320      | Mobile portrait     | Minimum supported device width  |
| `sm`       | 640px  | 640      | Mobile landscape    | Landscape phones, small tablets |
| `md`       | 768px  | 768      | Tablet              | Tablets, small desktop          |
| `lg`       | 1024px | 1024     | Desktop             | Standard desktop, laptops       |
| `xl`       | 1280px | 1280     | Large desktop       | Large screens, HD displays      |
| `2xl`      | 1536px | 1536     | Extra large desktop | Wide screens, 1440p+            |

**Note:** `xs` (320px) serves as the base mobile size but is not typically used in min-width media queries (mobile-first starts at base, then `sm` and up).

### 2. Unit Type: Pixels (px)

**Decision:** Use **pixels (px)** for breakpoint tokens.

**Rationale:**

- **Consistency:** Most design tools (Figma, Sketch) work in pixels
- **Predictability:** Breakpoints don't change with user font size (expected behavior)
- **Industry standard:** Tailwind, Bootstrap, Material Design all use px for breakpoints
- **Simplicity:** Easier to reason about and debug
- **Browser zoom:** Modern browsers handle zoom correctly regardless of px/em/rem

**Rejected Alternatives:**

- **em/rem:** While accessible for font sizing, breakpoints based on em/rem can cause unexpected layout shifts when users change default font size. Industry consensus is that layout breakpoints should be fixed in px.

### 3. Naming Convention

**Decision:** Use **T-shirt sizing** with numeric suffix for largest size.

**Naming:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

**Rationale:**

- **Familiar:** Aligns with Tailwind CSS (most popular utility framework)
- **Intuitive:** T-shirt sizes are universally understood
- **Concise:** Short names reduce verbosity in media queries
- **Scalable:** Can add `3xl`, `4xl` if needed in future

**Rejected Alternatives:**

- **Descriptive names** (`mobile`, `tablet`, `desktop`): Too prescriptive, modern devices blur these categories
- **Numeric names** (`bp-320`, `bp-640`): Less intuitive, harder to remember
- **Storybook names** (`xsmall`, `small`, `medium`): Verbose, inconsistent with industry

### 4. Mobile-First Approach

**Decision:** Adopt **mobile-first** responsive design strategy.

**Media Query Pattern:**

```css
/* Base styles apply to xs (320px+) */
.element {
  padding: 16px;
}

/* sm and up (640px+) */
@media (min-width: 640px) {
  .element {
    padding: 24px;
  }
}

/* md and up (768px+) */
@media (min-width: 768px) {
  .element {
    padding: 32px;
  }
}
```

**Rationale:**

- **Performance:** Mobile devices get smaller CSS payload (no overrides needed)
- **Progressive enhancement:** Start with mobile experience, enhance for larger screens
- **Industry standard:** Mobile-first is the default in Tailwind, Bootstrap, Material
- **Accessibility:** Ensures mobile experience is always functional

**Max-width queries (desktop-first)** will be supported but not recommended.

### 5. Token Structure

**Primitive Level:** Raw pixel values

**File:** `tokens/src/primitives/breakpoint/scale.json`

```json
{
  "primitive": {
    "breakpoint": {
      "xs": {
        "$value": "320px",
        "$type": "dimension",
        "$description": "Extra small - Mobile portrait (minimum supported width)",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "mobile-portrait",
            "useCase": "Base mobile styles, minimum device width"
          }
        }
      },
      "sm": {
        "$value": "640px",
        "$type": "dimension",
        "$description": "Small - Mobile landscape, small tablets",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "mobile-landscape",
            "useCase": "Landscape orientation, phablets, small tablets"
          }
        }
      },
      "md": {
        "$value": "768px",
        "$type": "dimension",
        "$description": "Medium - Tablets, small desktop screens",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "tablet",
            "useCase": "Tablets (iPad), small desktop viewports"
          }
        }
      },
      "lg": {
        "$value": "1024px",
        "$type": "dimension",
        "$description": "Large - Desktop, laptops (13-15 inch)",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "desktop",
            "useCase": "Standard desktop, laptops"
          }
        }
      },
      "xl": {
        "$value": "1280px",
        "$type": "dimension",
        "$description": "Extra large - Large desktop, HD displays",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "desktop-large",
            "useCase": "Large monitors, HD displays, wide layouts"
          }
        }
      },
      "2xl": {
        "$value": "1536px",
        "$type": "dimension",
        "$description": "2X large - Extra wide displays, 1440p+",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "category": "breakpoint",
            "device": "desktop-extra-large",
            "useCase": "Ultra-wide monitors, 1440p+, professional displays"
          }
        }
      }
    }
  }
}
```

**Core Level:** Semantic aliases (optional for future expansion)

```json
{
  "core": {
    "breakpoint": {
      "mobile": {
        "$value": "{primitive.breakpoint.xs}",
        "$type": "dimension",
        "$description": "Mobile breakpoint - alias for xs"
      },
      "tablet": {
        "$value": "{primitive.breakpoint.md}",
        "$type": "dimension",
        "$description": "Tablet breakpoint - alias for md"
      },
      "desktop": {
        "$value": "{primitive.breakpoint.lg}",
        "$type": "dimension",
        "$description": "Desktop breakpoint - alias for lg"
      }
    }
  }
}
```

### 6. CSS Output Format

**Generated CSS Variables:**

```css
:root {
  --lufa-primitive-breakpoint-xs: 320px;
  --lufa-primitive-breakpoint-sm: 640px;
  --lufa-primitive-breakpoint-md: 768px;
  --lufa-primitive-breakpoint-lg: 1024px;
  --lufa-primitive-breakpoint-xl: 1280px;
  --lufa-primitive-breakpoint-2xl: 1536px;
}
```

**Usage in Media Queries:**

```css
/* Direct pixel value (CSS variables don't work in media queries) */
@media (min-width: 768px) {
  /* md styles */
}

/* Or using CSS custom media queries (future) */
@custom-media --md (min-width: 768px);

@media (--md) {
  /* md styles */
}
```

**Note:** CSS variables cannot be used in `@media` queries (CSS limitation). Breakpoint tokens will primarily serve as **documentation and single source of truth**, with build-time transformation to static values.

### 7. Storybook Integration

**Current Storybook breakpoints** will be updated to reference design system tokens:

**Before:**

```typescript
export const Breakpoints = {
  xsmall: { width: 320 },
  small: { width: 576 },
  medium: { width: 768 },
  large: { width: 1024 },
  xlarge: { width: 1280 },
  xxlarge: { width: 1536 },
};
```

**After:**

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens';

export const Breakpoints = {
  xs: { width: parseInt(tokens.primitive.breakpoint.xs) }, // 320
  sm: { width: parseInt(tokens.primitive.breakpoint.sm) }, // 640
  md: { width: parseInt(tokens.primitive.breakpoint.md) }, // 768
  lg: { width: parseInt(tokens.primitive.breakpoint.lg) }, // 1024
  xl: { width: parseInt(tokens.primitive.breakpoint.xl) }, // 1280
  '2xl': { width: parseInt(tokens.primitive.breakpoint['2xl']) }, // 1536
};
```

**Alignment Changes:**

- `xsmall` → `xs` (same value: 320)
- `small` (576) → `sm` (640) **[VALUE CHANGE]**
- `medium` → `md` (same value: 768)
- `large` → `lg` (same value: 1024)
- `xlarge` → `xl` (same value: 1280)
- `xxlarge` → `2xl` (same value: 1536)

**Breaking Change Note:** Storybook's `small` breakpoint changes from 576px to 640px to align with Tailwind standard. This only affects Storybook viewports, not production code.

### 8. Container Max-Widths Alignment

**Update container tokens** to align with breakpoints:

```json
{
  "core": {
    "layout": {
      "container-xs": {
        "$value": "100%",
        "$description": "Full width on xs screens"
      },
      "container-sm": {
        "$value": "{primitive.breakpoint.sm}",
        "$description": "640px max-width"
      },
      "container-md": {
        "$value": "{primitive.breakpoint.md}",
        "$description": "768px max-width"
      },
      "container-lg": {
        "$value": "{primitive.breakpoint.lg}",
        "$description": "1024px max-width"
      },
      "container-xl": {
        "$value": "{primitive.breakpoint.xl}",
        "$description": "1280px max-width (current container-max-width)"
      },
      "container-2xl": {
        "$value": "{primitive.breakpoint.2xl}",
        "$description": "1536px max-width"
      }
    }
  }
}
```

**Migration:** Current `container-max-width: 1280px` maps to `container-xl`.

---

## Consequences

### Positive

✅ **Single source of truth** - Breakpoints defined once, used everywhere  
✅ **Storybook alignment** - Viewports synchronized with design system  
✅ **Industry alignment** - Matches Tailwind (high developer familiarity)  
✅ **Scalable** - Easy to add more breakpoints (`3xl`, `4xl`) in future  
✅ **Documentation** - Clear device targets and use cases for each breakpoint  
✅ **TypeScript support** - Tokens can be imported and type-checked  
✅ **Mobile-first** - Encourages progressive enhancement and performance

### Negative

⚠️ **Storybook breaking change** - `small` breakpoint changes from 576px → 640px  
⚠️ **Migration effort** - Existing hard-coded breakpoints need updating  
⚠️ **CSS variable limitation** - Cannot use in media queries (build-time only)  
⚠️ **Learning curve** - Teams familiar with old breakpoints need to adapt

### Neutral

- **6 breakpoints** - More than Material (5) but fewer than Tailwind (7 with `3xl`)
- **Pixel units** - Not inherently accessible, but industry standard for breakpoints
- **No max-width queries** - Mobile-first is recommended, but max-width still possible

---

## Implementation Notes

### Phase 1: Create Tokens (Day 1)

1. Create `tokens/src/primitives/breakpoint/scale.json`
2. Add 6 breakpoint tokens (xs, sm, md, lg, xl, 2xl)
3. Run `npm run tokens:build`
4. Verify CSS output contains `--lufa-primitive-breakpoint-*` variables

### Phase 2: Update Storybook (Day 1)

1. Update `packages/design-system/storybook/.storybook/breakpoints.ts`
2. Import tokens and reference primitive values
3. Test all Storybook viewports
4. Document breaking change (small: 576 → 640)

### Phase 3: Update Layout Tokens (Day 2)

1. Add container size tokens (`container-xs` through `container-2xl`)
2. Deprecate old `container-max-width` (keep as alias to `container-xl`)
3. Update documentation

### Phase 4: Documentation (Day 2)

1. Create breakpoint usage guide
2. Document mobile-first approach
3. Provide media query examples
4. Document migration path from hard-coded breakpoints

---

## Implementation

**Decision Date:** 2026-01-26  
**Decision Outcome:** Accepted - Implemented (Phase 2C)  
**Phase:** Phase 2C Spacing & Layout Tokens  
**Implementation Status:** Implemented

### Implementation Summary

Phase 2C successfully implemented the 6-breakpoint system (xs, sm, md, lg, xl, 2xl) aligned with Tailwind CSS standards. All breakpoint tokens were created as primitive tokens in pixel values, enabling systematic responsive design across the Lufa Design System. The implementation established a mobile-first foundation that integrates seamlessly with the existing token architecture and Storybook viewport configuration.

The breakpoint tokens now serve as the single source of truth for all responsive design decisions, replacing hard-coded values throughout the codebase. Storybook viewports were updated to reference these tokens directly, with one intentional breaking change: the "small" breakpoint shifted from 576px to 640px to align with Tailwind's widely-adopted standard. This change only affects development viewports, not production code.

**Key Deliverables:**

- ✅ Created 6 breakpoint primitive tokens (xs: 320px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- ✅ Generated CSS custom properties for all breakpoint values
- ✅ Updated Storybook viewport configuration to reference design system tokens
- ✅ Added comprehensive token metadata documenting device targets and use cases
- ✅ Established mobile-first responsive design pattern as system standard
- ✅ Created container max-width tokens aligned with breakpoint scale

**Files Modified:**

```
packages/design-system/tokens/src/primitives/breakpoint/scale.json (NEW)
packages/design-system/storybook/.storybook/breakpoints.ts (UPDATED)
packages/design-system/tokens/src/core/layout/spacing.json (UPDATED - container tokens)
packages/design-system/tokens/dist/tokens.css (UPDATED - 6 new CSS variables)
```

**Commit:** 445737d (PR #132 - Phases 2A-2D Complete)  
**Changeset:** `.changeset/spacing-layout-tokens.md`  
**Version:** tokens@0.4.0, main@0.7.1 → 0.8.0

### Implementation Details

The breakpoint token implementation followed the strategy outlined in this ADR with high fidelity. A new primitive breakpoint category was created with six tokens covering mobile portrait (320px) through ultra-wide desktop (1536px). Each token includes extensive metadata documenting device targets, use cases, and recommended applications.

The Storybook integration required updating the viewport configuration to import and parse token values. The intentional breaking change from 576px to 640px for the small breakpoint was communicated clearly in documentation and changelogs. This alignment with Tailwind CSS significantly improves developer experience, as the 640px breakpoint is the de facto industry standard for landscape mobile devices.

Container max-width tokens were added to the layout system, referencing the new breakpoint primitives. This creates a cohesive responsive system where layout constraints automatically align with viewport breakpoints, ensuring visual consistency across all screen sizes.

### Success Metrics Achieved

Since this ADR is **implemented**, success is measured by:

- ✅ **All 6 breakpoint tokens created** - xs, sm, md, lg, xl, 2xl primitives exist in tokens system
- ✅ **CSS output contains breakpoint variables** - 6 new `--lufa-primitive-breakpoint-*` variables generated
- ✅ **Storybook integration complete** - Viewports now reference design system tokens
- ✅ **Mobile-first pattern established** - Documentation and examples promote min-width media queries
- ✅ **Zero build errors** - Token build pipeline succeeded without issues
- ✅ **Industry alignment achieved** - Tailwind CSS breakpoint values adopted (640px vs 576px)
- ✅ **Documentation complete** - Breakpoint usage guide and device target reference created

### Related Documentation

- **Phase 2C Implementation Summary:** `_bmad-output/subjects/spacing-layout-tokens/implementation/phase-2c-summary.md`
- **Responsive Spacing Guide:** `_bmad-output/subjects/spacing-layout-tokens/docs/responsive-spacing-guide.md`
- **Changeset:** `.changeset/spacing-layout-tokens.md`
- **ADR-006:** Responsive Spacing Architecture (uses breakpoints from ADR-005)

---

## Alternatives Considered

### Alternative 1: Use Storybook's Current Breakpoints (576, 768, 1024, 1280, 1536)

**Rejected** because:

- 576px is not a standard breakpoint (Bootstrap legacy)
- Doesn't align with Tailwind (640px is more common)
- Missing 320px (important for minimum mobile width)
- Not future-proof (harder to add more breakpoints)

### Alternative 2: Material Design Breakpoints (600, 960, 1280, 1920)

**Rejected** because:

- Fewer breakpoints (only 5 vs 6)
- 600px is uncommon in modern web
- 1920px is too large for wide breakpoint
- Less familiar to developers (Tailwind more popular)

### Alternative 3: Use rem/em Units

**Rejected** because:

- Breakpoints should not scale with user font size (layout should be fixed)
- Industry consensus: px for breakpoints, rem for typography
- Harder to reason about (640px is clearer than 40rem)
- Design tools work in pixels

### Alternative 4: Only 3-4 Breakpoints (mobile, tablet, desktop)

**Rejected** because:

- Not granular enough for modern device landscape
- Misses intermediate sizes (landscape phones, small desktops)
- Less flexible for responsive design
- Industry trend is 5-7 breakpoints

---

## References

### Industry Standards

- **Tailwind CSS:** 640, 768, 1024, 1280, 1536 (sm, md, lg, xl, 2xl)
- **Bootstrap 5:** 576, 768, 992, 1200, 1400 (sm, md, lg, xl, xxl)
- **Material Design 3:** 600, 960, 1280, 1920 (sm, md, lg, xl, xxl)
- **Ant Design:** 576, 768, 992, 1200, 1600 (xs, sm, md, lg, xl, xxl)

### Research

- **Tailwind Documentation:** [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- **CSS-Tricks:** [A Complete Guide to CSS Media Queries](https://css-tricks.com/a-complete-guide-to-css-media-queries/)
- **Web.dev:** [Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)
- **MDN:** [Using Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

### Internal References

- **Analysis:** `_bmad-output/subjects/spacing-layout-tokens/analysis/spacing-layout-analysis-2026-01-26.md` (Section 4.2 - Breakpoint Strategies)
- **Storybook Breakpoints:** `packages/design-system/storybook/.storybook/breakpoints.ts`
- **Container Token:** `packages/design-system/tokens/src/core/layout/spacing.json` (container-max-width)

---

## Decision Outcome

**Chosen Option:** 6-breakpoint system (xs, sm, md, lg, xl, 2xl) in pixels, aligned with Tailwind CSS, using mobile-first approach.

**Confidence Level:** High (9/10)

**Rationale:**

- Aligns with most popular framework (Tailwind) for developer familiarity
- Covers all common device sizes (320px - 1536px)
- Mobile-first approach is industry best practice
- Pixel units are standard for layout breakpoints
- Scalable for future needs (can add 3xl, 4xl)

**Next Steps:**

1. Review and approve this ADR with design and engineering teams
2. Proceed to ADR-006 (Responsive Spacing Architecture)
3. Implement breakpoint tokens (Phase 2 Sprint 1)
4. Update Storybook integration
5. Create breakpoint usage documentation

---

**Status:** ✅ Accepted - Implemented (Phase 2C)  
**Approved By:** Design System Team  
**Date Approved:** 2026-01-26  
**Implementation Date:** 2026-01-26

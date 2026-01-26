# Technical Specification: Typography Tokens Refinement

**Subject:** typography-tokens  
**Version:** 1.0  
**Date:** 2026-01-26  
**Design System Version:** v0.7.1 → v0.8.0  
**Phase:** 2D - Planning

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Scope](#scope)
3. [Architecture Overview](#architecture-overview)
4. [Token Additions](#token-additions)
5. [Token Updates](#token-updates)
6. [Component Updates](#component-updates)
7. [Build System Changes](#build-system-changes)
8. [File Structure](#file-structure)
9. [CSS Output](#css-output)
10. [Performance Impact](#performance-impact)
11. [Migration Strategy](#migration-strategy)
12. [Testing Requirements](#testing-requirements)
13. [Rollout Plan](#rollout-plan)

---

## Executive Summary

### Objectives

Refine the Lufa Design System typography token architecture to:

1. **Add responsive typography** - Implement fluid scaling for headings (clamp())
2. **Create letter-spacing tokens** - Add 5 tracking tokens for proper typography
3. **Fix Badge component** - Replace hard-coded font sizes with tokens
4. **Update documentation** - Fix false claims about existing letter-spacing tokens

### Impact

**New Tokens Created:** 5 tokens (letter-spacing only)  
**Existing Tokens Updated:** 4 tokens (font-sizes with clamp())  
**Files Modified:** ~8 files  
**Breaking Changes:** None (fully backward compatible)  
**Estimated Effort:** 8-10 hours (2 days)  
**Target Release:** v0.8.0

### Key Decisions (from ADRs)

- **ADR-008:** Fluid typography using clamp() for headings (2xl-5xl) - ~240 bytes
- **ADR-009:** 5 letter-spacing primitive tokens (tighter, tight, normal, wide, wider) - ~250 bytes
- **ADR-010:** Defer extended type scale (6xl-8xl) to v0.9.0 - 0 bytes

**Total CSS Impact:** ~640 bytes (including Badge tokens ~150 bytes) = **~0.64 KB**

**CSS Budget:**

- Current: 66.71 KB / 70 KB (95.3%)
- After Phase 2D: ~67.35 KB / 70 KB (96.2%)
- Remaining: ~2.65 KB ✅

---

## Scope

### In Scope ✅

**Token Changes:**

- Update 4 font-size primitive tokens with clamp() (2xl, 3xl, 4xl, 5xl)
- Create 5 letter-spacing primitive tokens
- Update 3 Badge component tokens to reference primitives

**Component Updates:**

- Badge component: Replace hard-coded font sizes (10px, 12px, 14px)
- Text component: Document letter-spacing usage (no code changes)

**Documentation:**

- Fix false letter-spacing claims in typography.md
- Add fluid typography usage guide
- Add letter-spacing usage guide
- Document Badge token changes (migration guide)

### Out of Scope ❌

**Not in This Phase:**

- Extended type scale (6xl-8xl) - Deferred to v0.9.0 (ADR-010)
- Composite typography tokens - Deferred to Phase 3
- Text component letter-spacing prop - Deferred to Phase 3
- Dark mode font-weight adjustments - Deferred to Phase 3
- Text decoration tokens - Deferred to Phase 3
- Line-length tokens - Deferred to Phase 3
- Responsive body text sizes - Not needed (16px is optimal)

---

## Architecture Overview

### Token Hierarchy (Unchanged)

The existing 4-tier hierarchy remains:

```
Primitive → Core → Semantic → Component
```

### Affected Token Categories

```
primitives/
  └── typography/
      ├── font-sizes.json          ← UPDATE: Add clamp() to 4 tokens
      ├── font-weights.json         ← UNCHANGED
      ├── line-heights.json         ← UNCHANGED
      ├── font-families.json        ← UNCHANGED
      └── letter-spacing.json       ← NEW: 5 tokens

semantic/
  └── typography/
      └── scale.json                ← UPDATE: Add metadata (optional)

component/
  └── badge/
      └── tokens.json               ← UPDATE: Use primitive tokens
```

---

## Token Additions

### 1. Letter-Spacing Tokens (5 tokens - NEW)

**File:** `tokens/src/primitives/typography/letter-spacing.json` (NEW)

**Tokens:**

| Token   | Value   | Use Case                         | Recommended Sizes |
| ------- | ------- | -------------------------------- | ----------------- |
| tighter | -0.04em | Extra large display text (60px+) | 6xl, 7xl, 8xl     |
| tight   | -0.02em | Large headings (30-48px)         | 3xl, 4xl, 5xl     |
| normal  | 0       | Body text (14-20px), default     | sm, base, lg, xl  |
| wide    | 0.05em  | Small text, uppercase labels     | xs, sm            |
| wider   | 0.1em   | All-caps headings, button text   | sm, base, lg      |

**JSON Structure:**

```json
{
  "primitive": {
    "typography": {
      "letter-spacing": {
        "tighter": {
          "$value": "-0.04em",
          "$type": "dimension",
          "$description": "Extra tight letter spacing for very large headings and display text",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "property": "letter-spacing",
              "useCase": "Display text, hero headings (60px+), 6xl-8xl sizes",
              "recommendedFontSizes": ["6xl", "7xl", "8xl"]
            }
          }
        },
        "tight": {
          "$value": "-0.02em",
          "$type": "dimension",
          "$description": "Tight letter spacing for large headings",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "property": "letter-spacing",
              "useCase": "Large headings (H1-H3), 3xl-5xl sizes",
              "recommendedFontSizes": ["3xl", "4xl", "5xl"]
            }
          }
        },
        "normal": {
          "$value": "0",
          "$type": "dimension",
          "$description": "Normal letter spacing for body text and default use",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "property": "letter-spacing",
              "useCase": "Body text, paragraphs, standard content (base-2xl)",
              "recommendedFontSizes": ["sm", "base", "lg", "xl", "2xl"]
            }
          }
        },
        "wide": {
          "$value": "0.05em",
          "$type": "dimension",
          "$description": "Wide letter spacing for small text and uppercase labels",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "property": "letter-spacing",
              "useCase": "Small text, captions, uppercase labels (xs-sm)",
              "recommendedFontSizes": ["xs", "sm"],
              "uppercaseRecommended": true
            }
          }
        },
        "wider": {
          "$value": "0.1em",
          "$type": "dimension",
          "$description": "Extra wide letter spacing for all-caps headings and emphasis",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "typography",
              "property": "letter-spacing",
              "useCase": "All-caps headings, button text (uppercase), section labels",
              "uppercaseRequired": true,
              "recommendedFontSizes": ["sm", "base", "lg", "xl"]
            }
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
:root {
  /* Letter-spacing primitives */
  --lufa-primitive-typography-letter-spacing-tighter: -0.04em;
  --lufa-primitive-typography-letter-spacing-tight: -0.02em;
  --lufa-primitive-typography-letter-spacing-normal: 0;
  --lufa-primitive-typography-letter-spacing-wide: 0.05em;
  --lufa-primitive-typography-letter-spacing-wider: 0.1em;
}
```

---

## Token Updates

### 1. Fluid Font Sizes (4 tokens - UPDATED)

**File:** `tokens/src/primitives/typography/font-sizes.json` (UPDATE)

**Tokens to Update:**

| Token | Current | New (Fluid)                                | Mobile | Desktop |
| ----- | ------- | ------------------------------------------ | ------ | ------- |
| 5xl   | "48px"  | "clamp(2rem, 1.5rem + 2vw, 3rem)"          | 32px   | 48px    |
| 4xl   | "36px"  | "clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem)" | 28px   | 36px    |
| 3xl   | "30px"  | "clamp(1.5rem, 1.25rem + 1vw, 1.875rem)"   | 24px   | 30px    |
| 2xl   | "24px"  | "clamp(1.25rem, 1rem + 1vw, 1.5rem)"       | 20px   | 24px    |

**Updated JSON (5xl example):**

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
        }
        // ... (4xl, 3xl, 2xl similar updates)
      }
    }
  }
}
```

**CSS Output:**

```css
:root {
  /* Fluid heading sizes (UPDATED) */
  --lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);
  --lufa-primitive-typography-font-size-4xl: clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem);
  --lufa-primitive-typography-font-size-3xl: clamp(1.5rem, 1.25rem + 1vw, 1.875rem);
  --lufa-primitive-typography-font-size-2xl: clamp(1.25rem, 1rem + 1vw, 1.5rem);

  /* Static sizes (UNCHANGED) */
  --lufa-primitive-typography-font-size-xl: 20px;
  --lufa-primitive-typography-font-size-lg: 18px;
  --lufa-primitive-typography-font-size-base: 16px;
  --lufa-primitive-typography-font-size-sm: 14px;
  --lufa-primitive-typography-font-size-xs: 12px;
}
```

### 2. Semantic Token Metadata (OPTIONAL)

**File:** `tokens/src/semantic/typography/scale.json` (UPDATE - OPTIONAL)

Add recommended letter-spacing to semantic token metadata:

```json
{
  "semantic": {
    "typography": {
      "heading-1": {
        "$value": "{primitive.typography.font-size.5xl}",
        "$type": "dimension",
        "$description": "H1 heading size - large titles",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "typography",
            "useCase": "H1 headings, page titles",
            "recommended": {
              "letter-spacing": "{primitive.typography.letter-spacing.tight}",
              "line-height": "{primitive.typography.line-height.tight}",
              "font-weight": "{primitive.typography.font-weight.bold}"
            }
          }
        }
      },
      "heading-2": {
        "$value": "{primitive.typography.font-size.4xl}",
        "$type": "dimension",
        "$description": "H2 heading size",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "typography",
            "useCase": "H2 headings, major section titles",
            "recommended": {
              "letter-spacing": "{primitive.typography.letter-spacing.tight}",
              "line-height": "{primitive.typography.line-height.tight}",
              "font-weight": "{primitive.typography.font-weight.bold}"
            }
          }
        }
      }
      // ... (other semantic tokens)
    }
  }
}
```

**Note:** This is metadata only - doesn't affect CSS output, just documentation.

### 3. Badge Component Tokens (3 tokens - UPDATED)

**File:** `tokens/src/component/badge/tokens.json` (UPDATE)

**Current (HARDCODED):**

```json
{
  "component": {
    "badge": {
      "size": {
        "sm": {
          "font-size": {
            "$value": "10px",
            "$type": "dimension"
          }
        },
        "md": {
          "font-size": {
            "$value": "12px",
            "$type": "dimension"
          }
        },
        "lg": {
          "font-size": {
            "$value": "14px",
            "$type": "dimension"
          }
        }
      }
    }
  }
}
```

**Updated (TOKEN REFERENCES):**

```json
{
  "component": {
    "badge": {
      "size": {
        "sm": {
          "font-size": {
            "$value": "10px",
            "$type": "dimension",
            "$description": "Small badge font size - 10px (between xs and sm)",
            "$extensions": {
              "lufa": {
                "note": "Custom value - smaller than xs (12px) for compact badges"
              }
            }
          }
        },
        "md": {
          "font-size": {
            "$value": "{primitive.typography.font-size.xs}",
            "$type": "dimension",
            "$description": "Medium badge font size - references xs (12px)"
          }
        },
        "lg": {
          "font-size": {
            "$value": "{primitive.typography.font-size.sm}",
            "$type": "dimension",
            "$description": "Large badge font size - references sm (14px)"
          }
        }
      }
    }
  }
}
```

**Rationale:**

- **sm (10px):** Keep as literal - no xs-minus token exists (below scale minimum)
- **md (12px):** Reference `xs` token (already exists)
- **lg (14px):** Reference `sm` token (already exists)

**CSS Output:**

```css
:root {
  /* Badge component sizes */
  --lufa-component-badge-size-sm-font-size: 10px; /* Literal (no token) */
  --lufa-component-badge-size-md-font-size: var(--lufa-primitive-typography-font-size-xs); /* 12px */
  --lufa-component-badge-size-lg-font-size: var(--lufa-primitive-typography-font-size-sm); /* 14px */
}
```

---

## Component Updates

### 1. Badge Component

**File:** `packages/design-system/tokens/src/component/badge/tokens.json` (UPDATE)

**Changes:**

- sm: Keep 10px (literal)
- md: Reference `{primitive.typography.font-size.xs}` (12px)
- lg: Reference `{primitive.typography.font-size.sm}` (14px)

**No visual changes** - same pixel values, now using tokens.

### 2. Text Component (Documentation Only)

**File:** `packages/design-system/main/src/components/Text/` (NO CODE CHANGES)

**Documentation updates:**

- Add letter-spacing usage examples
- Document that letter-spacing is opt-in (no automatic application)
- Provide code examples for applying letter-spacing

**Example documentation:**

````markdown
## Letter-Spacing (Optional)

The Text component doesn't automatically apply letter-spacing. To use letter-spacing tokens:

### Option 1: Custom className

```tsx
<Text variant="h1" className={styles.heroTitle}>
  Hero Title
</Text>
```
````

```css
/* styles.module.css */
.heroTitle {
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
}
```

### Option 2: Inline Style (Not Recommended)

```tsx
<Text variant="h1" style={{ letterSpacing: 'var(--lufa-primitive-typography-letter-spacing-tight)' }}>
  Hero Title
</Text>
```

### Recommended Pairings

- H1-H3: Use `tight` (-0.02em)
- H4-H6: Use `normal` (0)
- Body: Use `normal` (0)
- Caption/Labels: Use `wide` (0.05em) if uppercase

```

---

## Build System Changes

### No Build System Changes Required ✅

**Rationale:**

- **Fluid typography (clamp):** Style Dictionary already supports arbitrary dimension values
- **Letter-spacing tokens:** Standard primitive tokens (no special handling)
- **Badge tokens:** Standard component token references

**Existing build pipeline handles all changes:**

1. Token JSON files updated
2. Run `npm run tokens:build`
3. Style Dictionary processes tokens
4. CSS variables generated automatically
5. TypeScript types updated automatically

**No custom transforms or formats needed** (unlike Phase 2C responsive spacing).

---

## File Structure

### New Files

```

packages/design-system/tokens/
└── src/
└── primitives/
└── typography/
└── letter-spacing.json ← NEW (5 tokens)

```

### Modified Files

```

packages/design-system/tokens/
├── src/
│ ├── primitives/
│ │ └── typography/
│ │ └── font-sizes.json ← UPDATE (4 tokens with clamp)
│ ├── semantic/
│ │ └── typography/
│ │ └── scale.json ← UPDATE (add metadata - optional)
│ └── component/
│ └── badge/
│ └── tokens.json ← UPDATE (3 tokens to reference primitives)
└── docusaurus/
└── docs/
└── tokens/
└── typography.md ← UPDATE (fix false claims, add guides)

````

**Total Files:**

- **New:** 1 file (letter-spacing.json)
- **Modified:** 4 files (font-sizes, badge tokens, semantic metadata, docs)
- **Total Touched:** 5 files

---

## CSS Output

### Generated CSS Structure

**File:** `packages/design-system/tokens/dist/tokens.css`

**Estimated Size:**

- **Current:** ~66.71 KB
- **After Changes:** ~67.35 KB (+640 bytes, +0.96%)

**Breakdown:**

```css
:root {
  /* ========================================
     PRIMITIVES - Typography Font Sizes
     ======================================== */

  /* Fluid heading sizes (UPDATED - 4 tokens) */
  --lufa-primitive-typography-font-size-5xl: clamp(2rem, 1.5rem + 2vw, 3rem);         /* ~80 bytes */
  --lufa-primitive-typography-font-size-4xl: clamp(1.75rem, 1.5rem + 1.25vw, 2.25rem); /* ~80 bytes */
  --lufa-primitive-typography-font-size-3xl: clamp(1.5rem, 1.25rem + 1vw, 1.875rem);  /* ~80 bytes */
  --lufa-primitive-typography-font-size-2xl: clamp(1.25rem, 1rem + 1vw, 1.5rem);      /* ~80 bytes */

  /* Static sizes (UNCHANGED - 5 tokens) */
  --lufa-primitive-typography-font-size-xl: 20px;
  --lufa-primitive-typography-font-size-lg: 18px;
  --lufa-primitive-typography-font-size-base: 16px;
  --lufa-primitive-typography-font-size-sm: 14px;
  --lufa-primitive-typography-font-size-xs: 12px;

  /* ========================================
     PRIMITIVES - Letter-Spacing (NEW)
     ======================================== */
  --lufa-primitive-typography-letter-spacing-tighter: -0.04em;  /* ~50 bytes */
  --lufa-primitive-typography-letter-spacing-tight: -0.02em;    /* ~50 bytes */
  --lufa-primitive-typography-letter-spacing-normal: 0;         /* ~50 bytes */
  --lufa-primitive-typography-letter-spacing-wide: 0.05em;      /* ~50 bytes */
  --lufa-primitive-typography-letter-spacing-wider: 0.1em;      /* ~50 bytes */

  /* ========================================
     COMPONENT - Badge (UPDATED)
     ======================================== */
  --lufa-component-badge-size-sm-font-size: 10px;  /* ~50 bytes */
  --lufa-component-badge-size-md-font-size: var(--lufa-primitive-typography-font-size-xs);  /* ~60 bytes */
  --lufa-component-badge-size-lg-font-size: var(--lufa-primitive-typography-font-size-sm);  /* ~60 bytes */
}
````

**CSS Size Calculation:**

| Change                  | Count | Bytes Each | Total                            |
| ----------------------- | ----- | ---------- | -------------------------------- |
| Fluid font-size (clamp) | 4     | ~80 bytes  | ~320 bytes                       |
| Letter-spacing tokens   | 5     | ~50 bytes  | ~250 bytes                       |
| Badge token updates     | 3     | ~55 bytes  | ~165 bytes (overhead from var()) |
| **Total Addition**      |       |            | **~735 bytes**                   |

**Actual size may be lower due to:**

- CSS minification
- Removing old Badge literals (saves ~150 bytes)
- **Net impact: ~585 bytes**

---

## Performance Impact

### CSS File Size

**Current State:** 66.71 KB / 70 KB (95.3% utilized)  
**Remaining:** 3.29 KB (4.7% headroom)

**Phase 2D Additions:**

| Feature                  | Estimated Size | % of Remaining |
| ------------------------ | -------------- | -------------- |
| Fluid typography (clamp) | ~240 bytes     | 7.3%           |
| Letter-spacing tokens    | ~250 bytes     | 7.6%           |
| Badge token updates      | ~150 bytes     | 4.6%           |
| **Total**                | **~640 bytes** | **19.5%**      |

**New Total:** 66.71 KB + 0.64 KB = **67.35 KB / 70 KB (96.2%)**  
**Remaining:** ~2.65 KB (3.8% headroom) ✅

**Assessment:** ✅ **Well within budget** - 2.65 KB remaining for future enhancements.

### Build Time Impact

**Current Build Time:** ~2-3 seconds

**Additional Processing:**

- 5 new tokens to process (letter-spacing)
- 4 tokens to update (font-size with clamp)
- 3 tokens to update (badge references)

**Estimated New Build Time:** ~2.5-3.5 seconds (+0-0.5 sec)

**Assessment:** ✅ **Negligible** - Build still under 5 seconds.

### Runtime Performance

**No impact:**

- All tokens are CSS variables (no JavaScript runtime cost)
- `clamp()` is native CSS (highly optimized, <1ms calculation)
- No algorithmic calculations at runtime
- Letter-spacing is static CSS property

**Browser Support:**

- **clamp():** 96% global coverage (caniuse.com)
- **Fallback:** Older browsers use max value (48px) - acceptable
- **letter-spacing:** 100% support (standard CSS property)

---

## Migration Strategy

### Phase 1: Token Updates (Day 1 - Morning)

**Tasks:**

1. Create `primitives/typography/letter-spacing.json` (5 tokens)
2. Update `primitives/typography/font-sizes.json` (4 tokens to clamp)
3. Update `component/badge/tokens.json` (3 token references)
4. Run `npm run tokens:build`
5. Verify CSS output

**Time:** 2-3 hours

### Phase 2: Documentation (Day 1 - Afternoon)

**Tasks:**

1. Fix false letter-spacing claims in `docs/tokens/typography.md`
2. Add fluid typography usage guide
3. Add letter-spacing usage guide with recommended pairings
4. Document Badge token changes (migration guide)

**Time:** 2-3 hours

### Phase 3: Testing (Day 2 - Morning)

**Tasks:**

1. Visual regression testing (Storybook)
   - Capture headings at 320px, 768px, 1280px
   - Verify smooth scaling
   - Check Badge component (should look identical)

2. Unit testing
   - Test letter-spacing token values
   - Test fluid font-size calculations
   - Test Badge token resolution

3. Integration testing
   - Text component with all variants
   - Badge component (no visual changes)

**Time:** 2-3 hours

### Phase 4: Release (Day 2 - Afternoon)

**Tasks:**

1. Create changeset for v0.8.0
2. Write release notes
3. Update CHANGELOG.md
4. Alpha release preparation

**Time:** 1-2 hours

**Total:** **8-11 hours (1.5-2 days)**

---

## Testing Requirements

### Unit Tests

```typescript
// letter-spacing-tokens.test.ts
describe('Letter-Spacing Tokens', () => {
  it('should have 5 letter-spacing tokens', () => {
    expect(tokens.primitive.typography['letter-spacing']).toHaveProperty('tighter');
    expect(tokens.primitive.typography['letter-spacing']).toHaveProperty('tight');
    expect(tokens.primitive.typography['letter-spacing']).toHaveProperty('normal');
    expect(tokens.primitive.typography['letter-spacing']).toHaveProperty('wide');
    expect(tokens.primitive.typography['letter-spacing']).toHaveProperty('wider');
  });

  it('should have correct em values', () => {
    expect(tokens.primitive.typography['letter-spacing'].tighter).toBe('-0.04em');
    expect(tokens.primitive.typography['letter-spacing'].tight).toBe('-0.02em');
    expect(tokens.primitive.typography['letter-spacing'].normal).toBe('0');
    expect(tokens.primitive.typography['letter-spacing'].wide).toBe('0.05em');
    expect(tokens.primitive.typography['letter-spacing'].wider).toBe('0.1em');
  });
});

// fluid-typography.test.ts
describe('Fluid Typography', () => {
  it('should use clamp() for 2xl-5xl', () => {
    expect(tokens.primitive.typography['font-size']['5xl']).toContain('clamp');
    expect(tokens.primitive.typography['font-size']['4xl']).toContain('clamp');
    expect(tokens.primitive.typography['font-size']['3xl']).toContain('clamp');
    expect(tokens.primitive.typography['font-size']['2xl']).toContain('clamp');
  });

  it('should remain static for xl and below', () => {
    expect(tokens.primitive.typography['font-size'].xl).toBe('20px');
    expect(tokens.primitive.typography['font-size'].base).toBe('16px');
    expect(tokens.primitive.typography['font-size'].sm).toBe('14px');
  });
});

// badge-component.test.ts
describe('Badge Component Tokens', () => {
  it('should reference primitive tokens for md/lg', () => {
    const badgeTokens = tokens.component.badge.size;

    // md should resolve to xs (12px)
    expect(badgeTokens.md['font-size']).toContain('xs');

    // lg should resolve to sm (14px)
    expect(badgeTokens.lg['font-size']).toContain('sm');
  });

  it('should keep sm as literal 10px', () => {
    expect(tokens.component.badge.size.sm['font-size']).toBe('10px');
  });
});
```

### Visual Regression Tests

**Storybook Chromatic:**

- Capture Text component at 320px, 768px, 1280px
- Verify headings scale smoothly (no abrupt jumps)
- Capture Badge component (should be identical to before)
- Check letter-spacing visually on large headings

### Manual Testing Checklist

- [ ] Heading sizes scale from mobile (smaller) to desktop (current size)
- [ ] 5xl: 32px (mobile) → 48px (desktop)
- [ ] 4xl: 28px (mobile) → 36px (desktop)
- [ ] 3xl: 24px (mobile) → 30px (desktop)
- [ ] 2xl: 20px (mobile) → 24px (desktop)
- [ ] xl-xs: Remain static (no change)
- [ ] Letter-spacing tokens available in CSS
- [ ] Badge component looks identical (same pixel values)
- [ ] Build succeeds with zero TypeScript errors
- [ ] CSS size < 70 KB
- [ ] Test in Chrome, Firefox, Safari, Edge

---

## Rollout Plan

### Version Strategy

**Target Version:** v0.8.0  
**Breaking Changes:** None (fully backward compatible)  
**Deprecations:** None

### Release Phases

#### Phase 1: Alpha Release (v0.8.0-alpha.1)

- Internal testing
- Design team review
- Storybook preview deployment
- Duration: 3-5 days

#### Phase 2: Beta Release (v0.8.0-beta.1)

- External beta testing
- Collect feedback on responsive typography
- Monitor CSS budget
- Duration: 1 week

#### Phase 3: Release Candidate (v0.8.0-rc.1)

- Final testing
- Documentation complete
- Migration guide reviewed
- Duration: 2-3 days

#### Phase 4: Stable Release (v0.8.0)

- Public release
- Announcement
- npm publish
- Update documentation site

### Backwards Compatibility

**Guaranteed:**

- ✅ All existing typography tokens work (no name changes)
- ✅ Semantic tokens unchanged (heading-1, body, etc.)
- ✅ Text component API unchanged
- ✅ Badge component visually identical

**No breaking changes** - purely additive and enhancement.

**Visual Changes (Intentional):**

- Headings will be smaller on mobile (better readability)
- Headings will scale smoothly across viewports
- Badge component looks the same (same pixel values, now using tokens)

**Migration Required:** None - automatic on upgrade

---

## Success Criteria

### Must-Have (Launch Blockers)

- [ ] All 5 letter-spacing tokens created and tested
- [ ] 4 fluid font-size tokens working (clamp)
- [ ] Badge component using primitive tokens
- [ ] Documentation fixes complete (no false claims)
- [ ] CSS file size < 70 KB (target: ~67.35 KB)
- [ ] All tests passing (unit, visual regression)
- [ ] Zero TypeScript errors
- [ ] Build time < 5 seconds

### Nice-to-Have (Post-Launch)

- [ ] Semantic token metadata (recommended letter-spacing)
- [ ] Text component letter-spacing prop (Phase 3)
- [ ] Extended type scale (6xl-8xl) in v0.9.0

### Metrics for Success

| Metric                   | Baseline    | Target    | Actual |
| ------------------------ | ----------- | --------- | ------ |
| Letter-Spacing Tokens    | 0           | 5         | TBD    |
| Fluid Font Sizes         | 0           | 4         | TBD    |
| Badge Tokens Refactored  | 0/3         | 3/3       | TBD    |
| CSS File Size            | 66.71 KB    | < 67.5 KB | TBD    |
| Build Time               | 2-3 sec     | < 5 sec   | TBD    |
| Documentation Accuracy   | ~90% (bugs) | 100%      | TBD    |
| Mobile H1 Size (320px)   | 48px        | 32px      | TBD    |
| Desktop H1 Size (1280px) | 48px        | 48px      | TBD    |

---

## Documentation Requirements

### 1. Fix Typography Documentation

**File:** `packages/design-system/docusaurus/docs/tokens/typography.md`

**Fixes:**

- Remove false letter-spacing token claims (lines 63-69)
- Add correct letter-spacing token table
- Add fluid typography explanation
- Add recommended letter-spacing pairings

### 2. Add Usage Guides

**Fluid Typography Guide:**

```markdown
## Responsive Typography

Heading sizes now scale smoothly from mobile to desktop using CSS `clamp()`.

### How It Works

Large headings (2xl-5xl) use fluid sizing:

- **Mobile (320px):** Smaller sizes for better readability
- **Tablet (768px):** Intermediate sizes
- **Desktop (1280px+):** Full desktop sizes

### Size Ranges

| Token | Mobile | Desktop | Scaling |
| ----- | ------ | ------- | ------- |
| 5xl   | 32px   | 48px    | 50%     |
| 4xl   | 28px   | 36px    | 28%     |
| 3xl   | 24px   | 30px    | 25%     |
| 2xl   | 20px   | 24px    | 20%     |

### Browser Support

`clamp()` is supported in 96% of browsers. Older browsers (IE11) fall back to desktop size.
```

**Letter-Spacing Guide:**

```markdown
## Letter-Spacing (Tracking)

Letter-spacing tokens improve typography by adjusting character spacing.

### When to Use

- **Large headings:** Use `tight` (-0.02em)
- **Body text:** Use `normal` (0) - default
- **Small text:** Use `wide` (0.05em)
- **Uppercase text:** Always use `wide` or `wider`

### Recommended Pairings

See [Technical Spec - Recommended Pairings](#)
```

### 3. Migration Guide

````markdown
## Migration to v0.8.0

### Typography Changes

**Responsive Headings:**

Headings now scale automatically. No code changes required.

**Expected Visual Changes:**

- Headings will be smaller on mobile (better UX)
- Headings scale smoothly across viewports

**Letter-Spacing (Optional):**

New letter-spacing tokens available. Application is opt-in:

```css
.heading {
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
}
```
````

**Badge Component:**

No visual changes. Badge now uses primitive tokens internally.

```

---

**End of Technical Specification**

**Approved By:** [Pending]
**Implementation Start:** Sprint 1, Phase 2D
**Estimated Completion:** 1.5-2 days
**Review Date:** End of Sprint 1
```

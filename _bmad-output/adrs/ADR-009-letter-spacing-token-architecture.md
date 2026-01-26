# ADR-009: Letter-Spacing Token Architecture

**Status:** Proposed  
**Date:** 2026-01-26  
**Deciders:** Design System Team, Design Lead  
**Subject:** typography-tokens  
**Phase:** Planning (Phase 2D)

---

## Context

The Lufa Design System (v0.7.1) has **no letter-spacing tokens**, despite documentation claiming they exist. This creates multiple problems:

### Current Issues

1. **Documentation lies:** `docs/tokens/typography.md` references letter-spacing tokens that don't exist

   ```markdown
   | Token | CSS Variable | Value |
   | tight | --lufa-token-letter-spacing-tight | -0.02em | ← DOES NOT EXIST
   | normal | --lufa-token-letter-spacing-normal | 0 | ← DOES NOT EXIST
   | wide | --lufa-token-letter-spacing-wide | 0.05em | ← DOES NOT EXIST
   ```

2. **Inconsistent letter-spacing:** Components and consumers use hard-coded values with no system
3. **Poor heading hierarchy:** Large headings appear loose without negative letter-spacing
4. **Missing uppercase support:** All-caps text needs wider tracking for readability

### Typography Best Practices

**Letter-spacing (tracking) principles:**

- **Large headings (48px+):** Use negative tracking (-0.02em to -0.04em) for tighter appearance
- **Body text (14-18px):** Use normal tracking (0) for optimal readability
- **Small text (12px-):** Use slightly wider tracking (+0.01em to +0.02em) to improve legibility
- **Uppercase text:** Use wide tracking (+0.05em to +0.1em) to prevent cramped appearance
- **All-caps headings:** Use wider tracking (+0.1em to +0.15em) for visual hierarchy

### Industry Examples

#### Adobe Spectrum

```css
.spectrum-Heading1 {
  font-size: 36px;
  letter-spacing: -0.025em; /* Tight */
}

.spectrum-Body {
  font-size: 14px;
  letter-spacing: 0; /* Normal */
}

.spectrum-Detail {
  /* All-caps labels */
  font-size: 12px;
  letter-spacing: 0.06em; /* Wide */
}
```

#### Material Design 3

```css
.md3-display-large {
  font-size: 57px;
  letter-spacing: -0.25px; /* Tight */
}

.md3-body-large {
  font-size: 16px;
  letter-spacing: 0.5px; /* Slight wide */
}

.md3-label-small {
  /* Uppercase */
  font-size: 11px;
  letter-spacing: 0.5px; /* Wide */
}
```

#### Tailwind CSS

```css
.tracking-tighter {
  letter-spacing: -0.05em;
}
.tracking-tight {
  letter-spacing: -0.025em;
}
.tracking-normal {
  letter-spacing: 0;
}
.tracking-wide {
  letter-spacing: 0.025em;
}
.tracking-wider {
  letter-spacing: 0.05em;
}
.tracking-widest {
  letter-spacing: 0.1em;
}
```

### CSS Budget Impact

**Estimated cost:**

- 5 letter-spacing primitive tokens × ~40 bytes = **~200 bytes**
- Integration into semantic tokens (metadata only) = **~50 bytes**
- **Total:** ~250 bytes (0.35% of budget, 7.6% of remaining 3.29 KB)

**Remaining after responsive typography (~240 bytes):**

- 3.29 KB - 240 bytes = **3.05 KB**
- Letter-spacing: **250 bytes** (8.2% of 3.05 KB)
- **Remaining after both:** ~2.8 KB ✅

---

## Decision

### 1. Letter-Spacing Token Scale

We will create **5 letter-spacing primitive tokens** using em-based units:

| Token     | Value   | Use Case                                   | Example                    |
| --------- | ------- | ------------------------------------------ | -------------------------- |
| `tighter` | -0.04em | Extra large headings (60px+), display text | Hero titles, 6xl-8xl sizes |
| `tight`   | -0.02em | Large headings (30-48px), H1-H3            | heading-1, heading-2       |
| `normal`  | 0       | Body text (14-20px), default               | Body, paragraphs           |
| `wide`    | 0.05em  | Small text (12px), uppercase labels        | Captions, badges           |
| `wider`   | 0.1em   | All-caps headings, button text (optional)  | Section titles, CTAs       |

**Unit Choice:** `em` (relative to font-size)

**Rationale:**

- **Scales with font-size:** -0.02em on 48px = -0.96px, on 24px = -0.48px (proportional)
- **Industry standard:** All major design systems use em for letter-spacing
- **Responsive-friendly:** Automatically adjusts when font-size changes
- **Accessibility:** Scales with user font-size preferences

**Rejected alternatives:**

- **px units:** Not responsive, doesn't scale with font-size
- **rem units:** Would scale with root font-size, not element font-size (wrong behavior)

### 2. Token Architecture Layer

**Decision:** Letter-spacing tokens live at the **primitive layer** only.

**Structure:**

```
primitives/
  └── typography/
      ├── font-sizes.json           (existing)
      ├── font-weights.json          (existing)
      ├── line-heights.json          (existing)
      ├── font-families.json         (existing)
      └── letter-spacing.json        (NEW)
```

**Rationale:**

- **Primitive values:** Letter-spacing is a fundamental typographic property
- **Reusable:** Can be referenced by semantic and component tokens
- **Simple:** No need for core/semantic aliases - direct primitive usage
- **Consistent:** Matches existing typography token structure

### 3. Semantic Token Integration

**Decision:** Semantic typography tokens will **reference** letter-spacing but NOT bundle it.

**Approach:** Add `$extensions` metadata to document recommended pairing.

**Example:**

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
      }
    }
  }
}
```

**Why not composite tokens?**

We considered bundling letter-spacing into semantic tokens as a composite property:

```json
{
  "heading-1": {
    "font-size": "48px",
    "line-height": "1.25",
    "font-weight": "700",
    "letter-spacing": "-0.02em"  ← Bundle
  }
}
```

**Rejected because:**

- **CSS complexity:** Would require custom CSS generation (font-size is dimension, letter-spacing is separate)
- **DTCG limitation:** Design Token Community Group spec doesn't support composite types well
- **Flexibility loss:** Developers can't override letter-spacing easily
- **Build complexity:** Would need custom Style Dictionary formatter
- **Defer to Phase 3:** Composite typography tokens are a larger architectural change

**For Phase 2D:** Keep tokens separate, document recommended pairings.

### 4. Component-Level Defaults

**Decision:** Text component will **NOT** automatically apply letter-spacing.

**Rationale:**

- **Opt-in approach:** Developers choose when to apply letter-spacing
- **Backward compatibility:** No visual changes unless explicitly adopted
- **Flexibility:** Different use cases may need different tracking

**Future enhancement (Phase 3):**

```tsx
// Potential Text component API (Phase 3)
<Text variant="h1" tracking="tight">
  {' '}
  ← New prop Hero Title
</Text>
```

**Phase 2D:** Document letter-spacing tokens, leave application to consumers.

### 5. JSON Structure

**File:** `tokens/src/primitives/typography/letter-spacing.json` (NEW)

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

### 6. CSS Output

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

**Usage example:**

```css
.heading-1 {
  font-size: var(--lufa-primitive-typography-font-size-5xl);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-tight);
}

.caption-uppercase {
  font-size: var(--lufa-primitive-typography-font-size-xs);
  letter-spacing: var(--lufa-primitive-typography-letter-spacing-wide);
  text-transform: uppercase;
}
```

### 7. Documentation Requirements

**Update existing documentation** to remove false claims:

**File:** `docs/tokens/typography.md` (lines 63-69)

**Before (INCORRECT):**

```markdown
| Token | CSS Variable | Value |
| tight | --lufa-token-letter-spacing-tight | -0.02em |
| normal | --lufa-token-letter-spacing-normal | 0 |
| wide | --lufa-token-letter-spacing-wide | 0.05em |
```

**After (CORRECT):**

```markdown
| Token | CSS Variable | Value | Use Case |
| tighter | --lufa-primitive-typography-letter-spacing-tighter | -0.04em | Display text (60px+) |
| tight | --lufa-primitive-typography-letter-spacing-tight | -0.02em | Large headings (30-48px) |
| normal | --lufa-primitive-typography-letter-spacing-normal | 0 | Body text (default) |
| wide | --lufa-primitive-typography-letter-spacing-wide | 0.05em | Small/uppercase text |
| wider | --lufa-primitive-typography-letter-spacing-wider | 0.1em | All-caps headings |
```

**Add usage guide:**

```markdown
## Letter-Spacing Best Practices

### When to Use Tight Tracking

Large headings benefit from negative letter-spacing:

- **H1 (48px):** Use `tight` (-0.02em)
- **H2 (36px):** Use `tight` (-0.02em)
- **H3 (30px):** Use `tight` or `normal`
- **Display (60px+):** Use `tighter` (-0.04em)

### When to Use Wide Tracking

- **Captions (12px):** Use `wide` (0.05em) for better legibility
- **Uppercase labels:** Always use `wide` or `wider`
- **All-caps headings:** Use `wider` (0.1em)
- **Button text (uppercase):** Use `wide` or `wider`

### Default (Normal)

Body text, paragraphs, and most UI text should use `normal` (0).
```

### 8. Recommended Pairings

**Heading Sizes:**

| Semantic Token | Font Size  | Letter-Spacing  | Rationale                      |
| -------------- | ---------- | --------------- | ------------------------------ |
| heading-1      | 5xl (48px) | tight (-0.02em) | Large heading, tighten         |
| heading-2      | 4xl (36px) | tight (-0.02em) | Large heading, tighten         |
| heading-3      | 3xl (30px) | tight (-0.02em) | Medium heading, subtle tighten |
| heading-4      | 2xl (24px) | normal (0)      | Small heading, default         |
| heading-5      | xl (20px)  | normal (0)      | Small heading, default         |
| heading-6      | lg (18px)  | normal (0)      | Smallest heading, default      |

**Body Sizes:**

| Semantic Token | Font Size   | Letter-Spacing | Rationale                     |
| -------------- | ----------- | -------------- | ----------------------------- |
| body-large     | lg (18px)   | normal (0)     | Default body tracking         |
| body           | base (16px) | normal (0)     | Default body tracking         |
| body-small     | sm (14px)   | normal (0)     | Default body tracking         |
| caption        | xs (12px)   | wide (0.05em)  | Improve small text legibility |

**Special Cases:**

| Use Case             | Font Size | Letter-Spacing | Example       |
| -------------------- | --------- | -------------- | ------------- |
| Badge (uppercase)    | xs/sm     | wide (0.05em)  | "NEW", "BETA" |
| Button (uppercase)   | sm/base   | wider (0.1em)  | "SIGN UP NOW" |
| Section label (caps) | sm        | wider (0.1em)  | "ABOUT US"    |
| Hero display (caps)  | 6xl+      | wider (0.1em)  | "INTRODUCING" |

---

## Consequences

### Positive ✅

- **Fixes documentation:** Removes false claims about existing tokens
- **Improves heading hierarchy:** Negative tracking tightens large headings
- **Better uppercase support:** Wide tracking improves all-caps readability
- **Industry alignment:** Matches Material Design, Adobe Spectrum practices
- **Minimal CSS impact:** Only ~250 bytes (0.35% of budget)
- **Flexible architecture:** Opt-in, doesn't force letter-spacing on all components
- **Scalable:** Easy to add more values if needed (e.g., `widest: 0.15em`)
- **Type-safe:** TypeScript can enforce token usage

### Negative ⚠️

- **Not automatic:** Developers must manually apply letter-spacing
- **Adoption required:** Won't improve typography unless actively used
- **Documentation burden:** Need clear guidance on when to use each value
- **Composite tokens deferred:** Full typography composite tokens are Phase 3 work
- **Text component unchanged:** No built-in prop for letter-spacing (yet)

### Neutral

- **Primitive-only architecture:** Simple but requires referencing in multiple places
- **Recommendation-based:** Semantic tokens document pairings but don't enforce them
- **Opt-in approach:** Conservative but leaves flexibility for consumers

---

## Alternatives Considered

### Alternative 1: Composite Typography Tokens

**Approach:** Bundle letter-spacing into semantic tokens as a composite property.

```json
{
  "heading-1": {
    "font-size": "48px",
    "line-height": "1.25",
    "font-weight": "700",
    "letter-spacing": "-0.02em"
  }
}
```

**Pros:**

- All typography properties in one token
- Developers don't need to know about pairings
- Guaranteed consistency

**Cons:**

- **DTCG limitation:** No standard composite type for typography
- **CSS generation complexity:** Need custom formatter
- **Build system complexity:** Style Dictionary doesn't support out-of-box
- **Loss of flexibility:** Can't override individual properties easily
- **Larger scope:** Beyond Phase 2D timeline

**Decision:** Defer to Phase 3 - Phase 2D focuses on primitives only.

---

### Alternative 2: More Granular Scale (7-9 Values)

**Approach:** Add more letter-spacing values for finer control.

```
tightest: -0.05em
tighter: -0.04em
tight: -0.02em
normal: 0
wide: 0.025em
wider: 0.05em
widest: 0.1em
ultra-wide: 0.15em
```

**Pros:**

- More precise control
- Matches Tailwind's 6-value scale

**Cons:**

- **Overkill:** 5 values cover 95% of use cases
- **Decision paralysis:** More options = harder choices
- **Increased CSS:** ~350 bytes vs ~250 bytes
- **Maintenance burden:** More tokens to document/support

**Decision:** 5 values are sufficient - follow Pareto principle (80/20 rule).

---

### Alternative 3: Core/Semantic Aliases

**Approach:** Create semantic letter-spacing tokens.

```json
{
  "core": {
    "typography": {
      "letter-spacing": {
        "heading-large": "{primitive.typography.letter-spacing.tight}",
        "heading-small": "{primitive.typography.letter-spacing.normal}",
        "body": "{primitive.typography.letter-spacing.normal}",
        "caption": "{primitive.typography.letter-spacing.wide}"
      }
    }
  }
}
```

**Pros:**

- Semantic naming tied to use case
- Extra layer of abstraction

**Cons:**

- **Unnecessary indirection:** Primitives are already semantic enough
- **Added complexity:** More tokens without added value
- **Maintenance overhead:** Two layers to update
- **Inconsistent with current arch:** Other typography primitives don't have core aliases

**Decision:** Keep it simple - primitives are sufficient.

---

### Alternative 4: No Letter-Spacing Tokens (Status Quo)

**Approach:** Don't add letter-spacing tokens, leave to consumers.

**Pros:**

- Zero CSS impact
- No implementation effort
- Maximum flexibility

**Cons:**

- **Documentation remains broken:** Claims tokens exist when they don't
- **Inconsistent typography:** Everyone implements differently
- **Poor heading hierarchy:** Large headings look loose without tracking
- **Missed opportunity:** Industry best practice

**Decision:** Rejected - letter-spacing is too important to ignore.

---

## Implementation Notes

### Phase 1: Create Primitive Tokens (30 minutes)

1. Create `tokens/src/primitives/typography/letter-spacing.json`
2. Add 5 tokens (tighter, tight, normal, wide, wider)
3. Run `npm run tokens:build`
4. Verify CSS output contains letter-spacing variables

### Phase 2: Update Documentation (30 minutes)

1. Fix `docs/tokens/typography.md` (remove false claims)
2. Add letter-spacing usage guide
3. Document recommended pairings
4. Add code examples

### Phase 3: Update Semantic Token Metadata (15 minutes)

1. Edit `tokens/src/semantic/typography/scale.json`
2. Add `$extensions.lufa.recommended.letter-spacing` to heading tokens
3. Document pairings in metadata

### Phase 4: Testing (30 minutes)

- [ ] All 5 tokens present in CSS output
- [ ] CSS variables have correct values
- [ ] Build succeeds with zero errors
- [ ] CSS size < 70 KB
- [ ] TypeScript types generated correctly

### Total Effort: **2 hours**

---

## Success Metrics

| Metric                 | Target                        | Validation Method              |
| ---------------------- | ----------------------------- | ------------------------------ |
| CSS Budget             | < 70 KB                       | Measure `dist/tokens.css` size |
| CSS Increase           | < 300 bytes                   | Compare before/after build     |
| Token Count            | 5 letter-spacing tokens       | Count in JSON                  |
| Documentation Accuracy | 100% (no false claims)        | Manual review                  |
| Recommended Pairings   | 11 semantic tokens documented | Check semantic token metadata  |
| Build Success          | Zero errors                   | Run build, check exit code     |
| Adoption (30 days)     | > 30% of consuming apps       | Survey usage after release     |

---

## References

### Industry Standards

- **Adobe Spectrum:** [Typography - Letter Spacing](https://spectrum.adobe.com/page/typography/#Letter-spacing)
- **Material Design 3:** [Typography - Tracking](https://m3.material.io/styles/typography/applying-type#tracking)
- **Tailwind CSS:** [Letter Spacing Utilities](https://tailwindcss.com/docs/letter-spacing)
- **Web.dev:** [Typography Best Practices](https://web.dev/learn/design/typography/)

### Typography Research

- **Practical Typography:** [Letter Spacing](https://practicaltypography.com/letterspacing.html)
- **Elements of Typographic Style:** Chapter on letter-spacing
- **CSS-Tricks:** [Tracking (Letter-Spacing) in CSS](https://css-tricks.com/almanac/properties/l/letter-spacing/)

### Internal References

- **Analysis:** `_bmad-output/subjects/typography-tokens/analysis/typography-analysis-2026-01-26.md` (Section 2.1 - P2: Missing Letter-Spacing Tokens)
- **Documentation Bug:** `docs/tokens/typography.md` lines 63-69
- **Semantic Tokens:** `tokens/src/semantic/typography/scale.json`

---

## Decision Outcome

**Chosen Option:** Create 5 primitive letter-spacing tokens (tighter, tight, normal, wide, wider) at primitive layer only, with recommended pairings documented in semantic token metadata.

**Confidence Level:** High (9/10)

**Rationale:**

- **Fixes critical documentation bug:** Removes false claims
- **Budget-friendly:** Only ~250 bytes CSS impact
- **Industry-aligned:** Matches best practices from Material, Adobe, Tailwind
- **Simple architecture:** Primitive-only, no composite complexity
- **Flexible:** Opt-in approach, doesn't force adoption
- **Room for future:** Leaves 2.5+ KB for other Phase 2D work

**Next Steps:**

1. Review and approve this ADR
2. Proceed to ADR-010 (Extended Type Scale Strategy - optional)
3. Implement letter-spacing tokens (Sprint 1)
4. Update documentation
5. Document recommended pairings

---

**Status:** ✅ Proposed (Awaiting Approval)  
**Approved By:** [Pending]  
**Date Approved:** [Pending]  
**Review Date:** [Pending]

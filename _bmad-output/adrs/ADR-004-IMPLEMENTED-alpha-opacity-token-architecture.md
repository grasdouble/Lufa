# ADR-004: Alpha/Opacity Token Architecture

**Status:** Implemented  
**Date:** 2026-01-26  
**Implementation Date:** 2026-01-28  
**Deciders:** Architecture Team  
**Context:** Phase 2B - Color Token Refinement  
**Related:** ADR-003 (High-Contrast Strategy)

---

## Context

The Lufa Design System currently lacks a systematic approach to alpha/opacity variants for colors. This creates several problems:

### Current Issues

1. **Hard-Coded Alpha Values:**

   ```json
   {
     "semantic": {
       "ui": {
         "background-overlay": {
           "$value": "rgba(0, 0, 0, 0.5)" // Hard-coded
         }
       }
     }
   }
   ```

2. **No Opacity Variants:**
   - Cannot create semi-transparent versions of brand colors
   - No disabled state opacity standards
   - No overlay/backdrop patterns

3. **Mode-Specific Alpha Not Supported:**
   - Overlays should be darker in dark mode (0.75) vs light mode (0.5)
   - High-contrast needs stronger overlays (0.85)
   - Current system doesn't support this

4. **Use Cases Needing Alpha:**
   - Modal/dialog backdrops
   - Disabled states (60% opacity)
   - Hover states (subtle overlays)
   - Skeleton loaders
   - Shadows and elevation
   - Focus indicators

### Industry Approaches

**Tailwind CSS:**

```css
bg-blue-500/50    /* 50% opacity modifier */
text-red-600/75   /* 75% opacity modifier */
```

**Radix Colors:**

```javascript
grayA.1 to grayA.12  // Separate alpha scale
blueA.9             // Alpha variant of blue.9
```

**Material Design 3:**

```json
{
  "md.sys.color.surface-tint": "rgba(primary, 0.08)"
}
```

---

## Decision

We will implement a **dual approach** for alpha/opacity tokens:

### 1. Semantic Alpha Tokens (Primary Approach)

Create purpose-specific alpha tokens for common use cases:

```json
{
  "semantic": {
    "ui": {
      "overlay-backdrop": {
        "$value": "rgba(0, 0, 0, 0.5)",
        "$type": "color",
        "$description": "Semi-transparent backdrop for modals and dialogs",
        "$extensions": {
          "mode": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.75)",
            "high-contrast": "rgba(0, 0, 0, 0.85)"
          }
        }
      },
      "overlay-hover": {
        "$value": "rgba(0, 0, 0, 0.04)",
        "$type": "color",
        "$description": "Subtle overlay for hover states",
        "$extensions": {
          "mode": {
            "light": "rgba(0, 0, 0, 0.04)",
            "dark": "rgba(255, 255, 255, 0.08)",
            "high-contrast": "rgba(255, 255, 255, 0.12)"
          }
        }
      },
      "scrim": {
        "$value": "rgba(0, 0, 0, 0.32)",
        "$type": "color",
        "$description": "Scrim overlay for bottom sheets and drawers"
      }
    },
    "interactive": {
      "disabled-opacity": {
        "$value": "0.38",
        "$type": "number",
        "$description": "Opacity value for disabled interactive elements"
      }
    }
  }
}
```

### 2. Primitive Alpha Palette (Secondary Approach)

Add alpha variants to primitive palette for flexibility:

```json
{
  "primitive": {
    "color": {
      "alpha": {
        "black": {
          "100": { "$value": "rgba(0, 0, 0, 1.0)", "$type": "color" },
          "90": { "$value": "rgba(0, 0, 0, 0.9)", "$type": "color" },
          "80": { "$value": "rgba(0, 0, 0, 0.8)", "$type": "color" },
          "60": { "$value": "rgba(0, 0, 0, 0.6)", "$type": "color" },
          "50": { "$value": "rgba(0, 0, 0, 0.5)", "$type": "color" },
          "38": { "$value": "rgba(0, 0, 0, 0.38)", "$type": "color" },
          "16": { "$value": "rgba(0, 0, 0, 0.16)", "$type": "color" },
          "15": { "$value": "rgba(0, 0, 0, 0.15)", "$type": "color" },
          "12": { "$value": "rgba(0, 0, 0, 0.12)", "$type": "color" },
          "8": { "$value": "rgba(0, 0, 0, 0.08)", "$type": "color" },
          "5": { "$value": "rgba(0, 0, 0, 0.05)", "$type": "color" },
          "4": { "$value": "rgba(0, 0, 0, 0.04)", "$type": "color" }
        },
        "white": {
          "100": { "$value": "rgba(255, 255, 255, 1.0)", "$type": "color" },
          "90": { "$value": "rgba(255, 255, 255, 0.9)", "$type": "color" },
          "80": { "$value": "rgba(255, 255, 255, 0.8)", "$type": "color" },
          "60": { "$value": "rgba(255, 255, 255, 0.6)", "$type": "color" },
          "50": { "$value": "rgba(255, 255, 255, 0.5)", "$type": "color" },
          "38": { "$value": "rgba(255, 255, 255, 0.38)", "$type": "color" },
          "16": { "$value": "rgba(255, 255, 255, 0.16)", "$type": "color" },
          "15": { "$value": "rgba(255, 255, 255, 0.15)", "$type": "color" },
          "12": { "$value": "rgba(255, 255, 255, 0.12)", "$type": "color" },
          "8": { "$value": "rgba(255, 255, 255, 0.08)", "$type": "color" },
          "5": { "$value": "rgba(255, 255, 255, 0.05)", "$type": "color" },
          "4": { "$value": "rgba(255, 255, 255, 0.04)", "$type": "color" }
        }
      }
    }
  }
}
```

**Rationale for Specific Opacity Values:**

- **100%:** Solid color (reference value)
- **90%:** Very slightly transparent (subtle effects)
- **80%:** Strong but slightly transparent
- **60%:** Disabled state standard (WCAG guideline)
- **50%:** Half opacity (balanced overlay)
- **38%:** Material Design disabled standard
- **16%:** Very subtle overlay
- **15%:** Soft shadow layer and overlays
- **12%:** Hover/scrim variants aligned with Material 3
- **8%:** Hover state overlay
- **5%:** Ultra-subtle shadow layer
- **4%:** Ultra-subtle hover

### 3. Usage Patterns

**For Common Use Cases (Recommended):**

```json
{
  "component": {
    "modal": {
      "backdrop": {
        "$value": "{semantic.ui.overlay-backdrop}"
      }
    },
    "button": {
      "disabled-opacity": {
        "$value": "{semantic.interactive.disabled-opacity}"
      }
    }
  }
}
```

**For Custom Components (Advanced):**

```json
{
  "component": {
    "custom-overlay": {
      "background": {
        "$value": "{primitive.color.alpha.black.60}"
      }
    }
  }
}
```

---

## Rationale

### Why Dual Approach?

**Semantic Alpha Tokens (Primary):**

- ✅ Covers 95% of use cases
- ✅ Mode-specific values (light/dark/HC)
- ✅ Semantic naming (purpose over implementation)
- ✅ Easy to discover and use
- ✅ Fewer tokens needed (~8-10 tokens)

**Primitive Alpha Palette (Secondary):**

- ✅ Flexibility for edge cases
- ✅ Consistent opacity scale
- ✅ Reference values for semantic tokens
- ✅ Future-proof for custom components

### Why NOT Modifier Syntax (Tailwind-style)?

**Considered:**

```css
--lufa-color-primary/50   /* Not implemented */
```

**Rejected because:**

- ❌ CSS variables don't support `/` operator
- ❌ Requires runtime JavaScript to parse
- ❌ Not supported by Style Dictionary natively
- ❌ Breaks static CSS generation
- ❌ Incompatible with design tool plugins (Figma, etc.)

### Standards Alignment

**Material Design 3:**

- Uses semantic overlays (surface-tint, scrim)
- Opacity values: 0.08, 0.12, 0.16, 0.38
- Similar to our approach ✅

**Fluent UI 2:**

- "Shared colors" with alpha variants
- Backdrop tokens with mode-specific values
- Similar to our approach ✅

**WCAG Guidelines:**

- Disabled elements: 0.38-0.6 opacity recommended
- Ensures sufficient contrast is maintained
- Our values align with this ✅

---

## Consequences

### Positive

**Mode-Aware Overlays:**

```json
// Light mode: subtle overlay
"overlay-backdrop": "rgba(0, 0, 0, 0.5)"

// Dark mode: stronger overlay
"overlay-backdrop": "rgba(0, 0, 0, 0.75)"

// High-contrast: maximum overlay
"overlay-backdrop": "rgba(0, 0, 0, 0.85)"
```

**Consistent Disabled States:**

- All components use same opacity (0.38 or 0.6)
- Meets WCAG guidelines
- Visual consistency across system

**Flexible for Edge Cases:**

- Primitive alpha palette available
- Custom overlays possible
- No limitations for complex components

**No Hard-Coded Values:**

- All alpha values are tokens
- Can be themed and customized
- Centralized management

### Negative

**Increased Token Count:**

- +24 primitive alpha tokens (black + white × 12 opacities)
- +8 semantic alpha tokens
- ~32 alpha tokens total when fully implemented (net new at decision time)

**CSS Output Size:**

- Each alpha token = ~50 bytes
- Total: ~1.6 KB additional CSS
- Minimal but measurable

**Learning Curve:**

- Developers must know when to use semantic vs primitive alpha
- Documentation must explain patterns
- More tokens to discover

**RGBA Limitations:**

- RGBA doesn't support P3 color space
- Future migration to `color-mix()` may be needed
- Not a current concern (Phase 7+)

### Neutral

**No Breaking Changes:**

- Existing tokens unchanged
- New tokens are additive
- Backwards compatible

**Migration Path:**

- Replace hard-coded `rgba()` with semantic tokens
- Update component CSS incrementally
- No immediate breaking changes

---

## Alternatives Considered

### Alternative 1: Only Primitive Alpha Tokens

**Approach:** Only add primitive alpha scale, no semantic tokens

**Rejected because:**

- ❌ Requires every component to choose opacity value
- ❌ No mode-specific values
- ❌ Less semantic, harder to use
- ❌ Encourages inconsistency

---

### Alternative 2: Opacity Modifier Syntax

**Approach:** Use Tailwind-style `/opacity` syntax

```json
{
  "semantic": {
    "ui": {
      "overlay": "{core.neutral.background}/50"
    }
  }
}
```

**Rejected because:**

- ❌ Not supported by Style Dictionary
- ❌ CSS variables can't parse `/`
- ❌ Requires custom build tooling
- ❌ Breaks design tool integrations

---

### Alternative 3: Only Semantic Alpha Tokens

**Approach:** No primitive alpha palette, only semantic tokens

**Rejected because:**

- ❌ Limits flexibility for custom components
- ❌ No reference values for rare use cases
- ❌ Future custom themes harder to implement

---

### Alternative 4: Percentage-Based Naming

**Approach:** Name alpha tokens by percentage instead of decimal

```json
{
  "primitive": {
    "color": {
      "alpha": {
        "black-50-percent": "rgba(0, 0, 0, 0.5)"
      }
    }
  }
}
```

**Rejected because:**

- ❌ Verbose naming (black-50-percent vs black.50)
- ❌ Doesn't match existing naming conventions
- ❌ Harder to read in code

---

## Implementation Plan

### Phase 1: Create Primitive Alpha Palette

**File:** `tokens/src/primitives/color/palette.json`

Add alpha scale for black and white (24 tokens):

```json
{
  "primitive": {
    "color": {
      "alpha": {
        "black": {
          /* 12 opacity values */
        },
        "white": {
          /* 12 opacity values */
        }
      }
    }
  }
}
```

**Effort:** 5 hours

---

### Phase 2: Create Semantic Alpha Tokens

**File:** `tokens/src/semantic/ui/context.json`

Add semantic alpha tokens (8 tokens):

```json
{
  "semantic": {
    "ui": {
      "overlay-backdrop": {
        /* mode-specific rgba */
      },
      "overlay-hover": {
        /* mode-specific rgba */
      },
      "overlay-pressed": {
        /* mode-specific rgba */
      },
      "overlay-selected": {
        /* mode-specific rgba */
      },
      "scrim": {
        /* mode-specific rgba */
      }
    },
    "interactive": {
      "disabled-opacity": { "$value": "0.38", "$type": "number" },
      "loading-opacity": { "$value": "0.6", "$type": "number" },
      "placeholder-opacity": { "$value": "0.5", "$type": "number" }
    }
  }
}
```

**Effort:** 4 hours

---

### Phase 3: Replace Hard-Coded Alpha Values

**Files:**

- `tokens/src/semantic/ui/context.json` (update overlay token)
- `packages/design-system/main/src/components/Button/*.css` (disabled states)
- Other component CSS files with `rgba()` values

Replace:

```diff
- color: rgba(0, 0, 0, 0.5);
+ color: var(--lufa-semantic-ui-overlay-backdrop);
```

**Effort:** 4 hours

---

### Phase 4: Update Component Tokens

**Files:**

- `tokens/src/component/modal/tokens.json`
- `tokens/src/component/button/tokens.json`
- Other component token files

Reference semantic alpha tokens:

```json
{
  "component": {
    "modal": {
      "backdrop": {
        "$value": "{semantic.ui.overlay-backdrop}"
      }
    }
  }
}
```

**Effort:** 5 hours

---

### Phase 5: Documentation & Examples

Create documentation:

- Usage guide for semantic alpha tokens
- When to use primitive vs semantic
- Examples for common patterns
- Storybook stories showing overlays/disabled states

**Effort:** 4 hours

---

## Validation Criteria

This decision will be validated by:

1. **Zero Hard-Coded RGBA:** No component CSS contains `rgba()` literals
2. **Mode Coverage:** All semantic alpha tokens have light/dark/HC values
3. **Consistent Usage:** All components use semantic alpha tokens
4. **Accessibility:** Disabled states meet 0.38-0.6 opacity standard
5. **Visual Test:** Storybook shows overlays correctly in all modes

---

## Success Metrics (Decision-Time Targets)

Baseline reflects the state at the time of this ADR decision (2026-01-26). Current implementation status is tracked in the architecture review.

| Metric                      | Baseline (2026-01-26) | Target | Measurement     |
| --------------------------- | --------------------- | ------ | --------------- |
| Hard-Coded RGBA Values      | 4                     | 0      | Grep count      |
| Primitive Alpha Token Count | 0                     | 24     | Token count     |
| Semantic Alpha Token Count  | 0                     | 8      | Token count     |
| Components Using Alpha      | 5                     | 12+    | Component audit |
| Disabled State Consistency  | Mixed                 | 100%   | Visual review   |

---

## Related Decisions

- **ADR-003:** High-Contrast Token Strategy (HC alpha values)
- **Future:** Color-mix() syntax for modern browsers (Phase 7+)
- **Future:** P3 color space support with alpha

---

## References

- [Material Design 3 - Opacity](https://m3.material.io/styles/color/the-color-system/color-roles#0b5f6fc0-77ac-44f5-88b8-2d0e6a960bc1)
- [Radix Colors - Alpha Variants](https://www.radix-ui.com/colors/docs/palette-composition/alpha-colors)
- [WCAG 2.1 - Use of Color (SC 1.4.1)](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
- [CSS Color Module Level 4 - Alpha](https://www.w3.org/TR/css-color-4/#transparency)
- Analysis: `color-token-analysis-2026-01-26.md`

---

**Signed off by:** Architecture Team  
**Implementation Start:** Phase 2B Planning  
**Review Date:** Implementation complete (2026-01-28)

# ADR-003: High-Contrast Token Strategy

**Status:** Accepted  
**Date:** 2026-01-26  
**Deciders:** Architecture Team  
**Context:** Phase 2B - Color Token Refinement  
**Related:** ADR-001 (Modes vs Themes), ADR-002 (HTML Attributes)

---

## Context

The Lufa Design System v0.7.1 supports three accessibility modes (light, dark, high-contrast) but high-contrast mode has incomplete token coverage:

- **Current Coverage:** 31/46 semantic tokens (67%)
- **Missing Tokens:** Interactive state tokens, overlay backgrounds, button variants (warning/info)
- **WCAG Requirement:** AAA compliance requires 7:1 contrast ratio for normal text
- **User Need:** Users with low vision require maximum contrast with pure colors

### High-Contrast Mode Requirements

According to WCAG 2.1 AAA and Windows High Contrast Mode best practices:

1. **Pure Colors:** Use black (#000000), white (#ffffff), and highly saturated primary colors
2. **Strong Borders:** All interactive elements need 3:1 minimum border contrast
3. **No Subtle Colors:** Avoid grays, pastels, and low-saturation colors
4. **High Contrast Ratios:** 7:1 minimum for text, 4.5:1 for large text
5. **System Integration:** Should work with OS-level high-contrast modes

### Current Implementation

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$type": "color",
        "$extensions": {
          "mode": {
            "light": "{primitive.color.blue.600}",
            "dark": "{primitive.color.blue.500}",
            "high-contrast": "#0000ff" // Pure blue
          }
        }
      }
    }
  }
}
```

**Problems:**

- Hard-coded hex values in high-contrast mode (not using primitive tokens)
- Only 31 tokens have HC values
- Missing HC values for semantic/interactive layers
- No guidance on when to add HC overrides

---

## Decision

We will **complete high-contrast token coverage using a hybrid approach**:

### 1. Override at Core Layer (Primary Strategy)

**All core tokens** will have explicit high-contrast values using pure, highly saturated colors:

```json
{
  "core": {
    "neutral": {
      "background": {
        "$value": "{primitive.color.gray.50}",
        "$extensions": {
          "mode": {
            "light": "{primitive.color.gray.50}",
            "dark": "{primitive.color.gray.900}",
            "high-contrast": "#ffffff" // Pure white
          }
        }
      },
      "text-primary": {
        "$value": "{primitive.color.gray.900}",
        "$extensions": {
          "mode": {
            "light": "{primitive.color.gray.900}",
            "dark": "{primitive.color.gray.50}",
            "high-contrast": "#000000" // Pure black
          }
        }
      }
    }
  }
}
```

### 2. Inherit at Semantic Layer (Default Behavior)

**Semantic tokens** reference core tokens and automatically inherit HC values:

```json
{
  "semantic": {
    "ui": {
      "background-page": {
        "$value": "{core.neutral.background}"
        // Inherits HC value from core.neutral.background
      },
      "text-primary": {
        "$value": "{core.neutral.text-primary}"
        // Inherits HC value from core.neutral.text-primary
      }
    }
  }
}
```

### 3. Override at Semantic Layer (When Needed)

**Semantic tokens** with special HC requirements get explicit overrides:

```json
{
  "semantic": {
    "ui": {
      "background-overlay": {
        "$value": "rgba(0, 0, 0, 0.5)",
        "$extensions": {
          "mode": {
            "light": "rgba(0, 0, 0, 0.5)",
            "dark": "rgba(0, 0, 0, 0.75)",
            "high-contrast": "rgba(0, 0, 0, 0.85)" // Stronger overlay
          }
        }
      }
    }
  }
}
```

### 4. Create HC Primitive Palette

Add dedicated high-contrast primitive colors for consistency:

```json
{
  "primitive": {
    "color": {
      "hc": {
        "black": {
          "$value": "#000000",
          "$type": "color",
          "$description": "Pure black for high-contrast text and borders"
        },
        "white": {
          "$value": "#ffffff",
          "$type": "color",
          "$description": "Pure white for high-contrast backgrounds"
        },
        "blue": {
          "$value": "#0000ff",
          "$type": "color",
          "$description": "Pure blue for high-contrast primary actions"
        },
        "red": {
          "$value": "#ff0000",
          "$type": "color",
          "$description": "Pure red for high-contrast errors"
        },
        "green": {
          "$value": "#00ff00",
          "$type": "color",
          "$description": "Pure green for high-contrast success"
        },
        "yellow": {
          "$value": "#ffff00",
          "$type": "color",
          "$description": "Pure yellow for high-contrast warnings"
        }
      }
    }
  }
}
```

Then reference these in core tokens:

```json
{
  "core": {
    "brand": {
      "primary": {
        "$extensions": {
          "mode": {
            "high-contrast": "{primitive.color.hc.blue}"
          }
        }
      }
    }
  }
}
```

---

## Rationale

### Why Hybrid Approach?

**Core Layer Overrides (Primary):**

- ✅ Single source of truth for HC values
- ✅ Semantic tokens automatically inherit
- ✅ Easier to maintain (fewer overrides)
- ✅ Consistent HC behavior across system

**Semantic Layer Overrides (Secondary):**

- ✅ Flexibility for special cases (overlays, alpha values)
- ✅ Context-specific adjustments possible
- ✅ Doesn't break inheritance chain

**HC Primitive Palette:**

- ✅ Centralized pure color definitions
- ✅ Token references instead of hard-coded hex
- ✅ Easier to adjust if needed
- ✅ Consistent with token architecture

### Industry Alignment

**Material Design 3:**

- Uses dynamic color with HC overrides at primitive level
- HC values are algorithmically generated but manually tweakable
- Similar hybrid approach

**Fluent UI 2:**

- "Contrast themes" defined at token layer
- Core tokens have HC variants
- Semantic layer inherits with rare overrides

**Carbon Design System:**

- HC mode uses pure colors (#000, #fff, #0f62fe)
- Defined at theme level, applied to tokens
- Similar strategy to our approach

### Standards Compliance

**WCAG 2.1 AAA (SC 1.4.6):**

- Requires 7:1 contrast for normal text ✅
- Requires 4.5:1 contrast for large text ✅
- Pure colors guarantee maximum contrast ✅

**Windows High Contrast Mode:**

- Uses system colors (pure black, white, primary)
- Our pure color strategy aligns with this ✅

---

## Consequences

### Positive

**Complete Coverage:**

- All 46 semantic tokens will have HC support
- No missing tokens in HC mode
- 100% accessibility compliance

**Maintainable:**

- HC values defined once at core layer
- Semantic tokens inherit automatically
- Only ~6 new primitive HC tokens needed
- ~15 semantic tokens need explicit overrides

**Consistent:**

- Pure colors used consistently (#000, #fff, #0000ff)
- No arbitrary HC color choices
- Clear patterns for developers

**Testable:**

- Can programmatically verify 7:1 contrast
- Automated WCAG validation possible
- Visual regression tests easier

**Extensible:**

- New semantic tokens automatically work in HC mode
- New components inherit HC behavior
- Future-proof architecture

### Negative

**Hard-Coded Values:**

- HC primitive colors are literal hex values (not algorithmic)
- Can't derive HC colors automatically
- Manual selection required for new colors

**Increased Token Count:**

- +6 primitive HC colors
- +15 semantic HC overrides
- ~3% increase in token file size

**Visual Appearance:**

- HC mode looks "harsh" by design
- Pure colors are not aesthetically pleasing
- Trade-off for accessibility

**Testing Complexity:**

- Must test all 46 tokens × 3 modes = 138 test cases
- Visual regression tests for HC mode needed
- Manual accessibility review required

### Neutral

**Breaking Changes:**

- Not a breaking change (adding missing values)
- Existing HC values remain unchanged
- Only adds new coverage

**Migration Path:**

- No migration needed (backwards compatible)
- Consumers automatically get HC support
- Documentation updates required

---

## Alternatives Considered

### Alternative 1: Algorithmic HC Generation

**Approach:** Automatically generate HC values from light/dark values

```javascript
function toHighContrast(color) {
  const luminance = getLuminance(color);
  return luminance > 0.5 ? '#000000' : '#ffffff';
}
```

**Rejected because:**

- ❌ Loses semantic meaning (success → black/white, not green)
- ❌ All colors become black or white only
- ❌ Doesn't meet WCAG requirement for color differentiation
- ❌ Not customizable per token

---

### Alternative 2: Semantic-Only Overrides

**Approach:** Only add HC values at semantic layer, skip core layer

**Rejected because:**

- ❌ Violates single source of truth principle
- ❌ More overrides needed (46 vs 31)
- ❌ Harder to maintain consistency
- ❌ Core tokens don't work in HC mode alone

---

### Alternative 3: Separate HC Token Files

**Approach:** Create `tokens/high-contrast/colors.json` with all HC values

**Rejected because:**

- ❌ Breaks token hierarchy (primitive → core → semantic)
- ❌ Duplicates token structure
- ❌ Harder to keep in sync with main tokens
- ❌ Style Dictionary build complexity

---

### Alternative 4: Use Existing Primitive Shades

**Approach:** Use existing palette shades (gray-950, blue-900) for HC

**Rejected because:**

- ❌ Not pure enough for WCAG AAA
- ❌ gray-900 (#111827) is not pure black
- ❌ blue-900 has too low saturation
- ❌ Doesn't match Windows HC mode expectations

---

## Implementation Plan

### Phase 1: Create HC Primitive Palette

**File:** `tokens/src/primitives/color/palette.json`

Add 6 new HC primitive colors:

```json
{
  "primitive": {
    "color": {
      "hc": {
        "black": { "$value": "#000000" },
        "white": { "$value": "#ffffff" },
        "blue": { "$value": "#0000ff" },
        "red": { "$value": "#ff0000" },
        "green": { "$value": "#00ff00" },
        "yellow": { "$value": "#ffff00" }
      }
    }
  }
}
```

**Effort:** 1 hour

---

### Phase 2: Update Core Tokens

**Files:**

- `tokens/src/core/brand/colors.json` (6 tokens)
- `tokens/src/core/neutral/colors.json` (9 tokens)
- `tokens/src/core/semantic/colors.json` (16 tokens)

Update all core tokens to reference HC primitives:

```diff
{
  "core": {
    "brand": {
      "primary": {
        "$extensions": {
          "mode": {
            "light": "{primitive.color.blue.600}",
            "dark": "{primitive.color.blue.500}",
-           "high-contrast": "#0000ff"
+           "high-contrast": "{primitive.color.hc.blue}"
          }
        }
      }
    }
  }
}
```

**Effort:** 3 hours

---

### Phase 3: Add Semantic Overrides

**Files:**

- `tokens/src/semantic/ui/context.json` (3 new overrides)
- `tokens/src/semantic/interactive/states.json` (6 new overrides)
- `tokens/src/semantic/variant/components.json` (6 new overrides)

Add HC overrides for tokens that need special handling:

```json
{
  "semantic": {
    "ui": {
      "background-overlay": {
        "$value": "rgba(0, 0, 0, 0.5)",
        "$extensions": {
          "mode": {
            "high-contrast": "rgba(0, 0, 0, 0.85)"
          }
        }
      }
    },
    "interactive": {
      "focus-ring": {
        "$value": "{core.brand.primary}",
        "$extensions": {
          "mode": {
            "high-contrast": "{primitive.color.hc.blue}"
          }
        }
      }
    }
  }
}
```

**Effort:** 4 hours

---

### Phase 4: Testing & Validation

1. **Automated Contrast Testing:** Verify all HC token pairs meet 7:1 ratio
2. **Visual Regression:** Storybook snapshots for all components in HC mode
3. **Manual Testing:** Test with Windows High Contrast Mode
4. **Screen Reader:** Verify with NVDA/JAWS

**Effort:** 4 hours

---

## Validation Criteria

This decision will be validated by:

1. **Coverage Metric:** 46/46 semantic tokens have HC values (100%)
2. **Contrast Ratio:** All text/background pairs meet WCAG AAA (7:1)
3. **Pure Colors:** All HC colors use pure values (#000, #fff, #0000ff, etc.)
4. **No Hard-Coded Hex:** All HC values reference primitive tokens
5. **Visual Test:** Storybook shows all components in HC mode correctly
6. **System Integration:** Works with Windows High Contrast Mode

---

## Success Metrics

| Metric                     | Current | Target | Measurement         |
| -------------------------- | ------- | ------ | ------------------- |
| HC Token Coverage          | 67%     | 100%   | Token count         |
| WCAG AAA Pass Rate         | ~80%    | 100%   | Automated tool      |
| Hard-Coded HC Hex Values   | 31      | 0      | Grep count          |
| HC Primitive Token Count   | 0       | 6      | Token file analysis |
| Semantic HC Override Count | 0       | ~15    | Token file analysis |

---

## Related Decisions

- **ADR-001:** Modes vs Themes Separation
- **ADR-002:** HTML Attribute Naming Convention
- **Future:** Automated WCAG validation in CI/CD
- **Future:** P3 color space support (post-v1.0)

---

## References

- [WCAG 2.1 - Contrast (Enhanced) - SC 1.4.6](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html)
- [Windows High Contrast Mode](https://docs.microsoft.com/en-us/windows/apps/design/accessibility/high-contrast-themes)
- [Material Design - Accessibility](https://m3.material.io/foundations/accessible-design/overview)
- [Radix Colors - High Contrast](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)
- Analysis: `color-token-analysis-2026-01-26.md`

---

**Signed off by:** Architecture Team  
**Implementation Start:** Phase 2B Planning  
**Review Date:** Post-Phase 2D implementation

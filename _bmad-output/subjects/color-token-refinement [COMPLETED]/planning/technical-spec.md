# Technical Specification: Color Token Refinement

**Subject:** color-token-refinement  
**Version:** 1.0  
**Date:** 2026-01-26  
**Design System Version:** v0.7.1 → v0.8.0  
**Phase:** 2B - Planning

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Scope](#scope)
3. [Architecture Changes](#architecture-changes)
4. [Token Structure Changes](#token-structure-changes)
5. [New Tokens](#new-tokens)
6. [Token Migrations](#token-migrations)
7. [Component Updates](#component-updates)
8. [Build System Changes](#build-system-changes)
9. [Migration Strategy](#migration-strategy)
10. [Testing Requirements](#testing-requirements)
11. [Performance Impact](#performance-impact)
12. [Rollout Plan](#rollout-plan)

---

## Executive Summary

### Objectives

Refine the Lufa Design System color token architecture to:

1. **Complete high-contrast coverage** - 100% of semantic tokens (currently 67%)
2. **Eliminate hard-coded colors** - Replace 14 hard-coded hex/rgba values
3. **Add alpha/opacity system** - Enable mode-aware transparent colors
4. **Add missing semantic tokens** - Focus, disabled, selected, link states
5. **Maintain backwards compatibility** - No breaking changes for consumers

### Impact

**Files Modified:** ~15 files  
**New Tokens Created:** ~38 tokens  
**Hard-Coded Colors Removed:** 14 instances  
**Breaking Changes:** None (additive only)  
**Estimated Effort:** 24-32 hours  
**Target Release:** v0.8.0

### Key Decisions

- **ADR-003:** High-contrast strategy (hybrid approach: core overrides + semantic inheritance)
- **ADR-004:** Alpha/opacity architecture (dual approach: semantic + primitive alpha)
- **Naming:** Consistent with existing `data-mode` attribute (per ADR-002)

---

## Scope

### In Scope

✅ **Token Changes:**

- Create 6 HC primitive colors
- Add 15 HC overrides to semantic tokens
- Create 18 primitive alpha tokens
- Create 8 semantic alpha tokens
- Add 6 new interactive state tokens

✅ **Component Updates:**

- Replace 14 hard-coded color values
- Update Button component CSS (7 instances)
- Update semantic variant tokens (3 instances)
- Update utility functions (1 instance)

✅ **Build System:**

- No changes needed (existing Style Dictionary config supports this)

✅ **Documentation:**

- Update token usage guide
- Create high-contrast mode guide
- Document alpha token patterns

### Out of Scope

❌ **Not in This Phase:**

- Token reorganization (surface/text/border/action) - deferred to Phase 3
- Dark mode color optimization (purpose-designed palettes) - deferred to Phase 3
- Automated WCAG validation in CI/CD - deferred to Phase 3
- P3 color space support - deferred to Phase 7+
- Dynamic color generation - deferred to v1.0+
- Breaking changes to existing tokens - not acceptable for v0.8.0

---

## Architecture Changes

### Token Hierarchy (Unchanged)

The existing 4-tier hierarchy remains:

```
Primitive → Core → Semantic → Component
```

### New Token Categories

```
primitive/
  color/
    palette.json         ← Add `hc` palette (6 colors)
    palette.json         ← Add `alpha` palette (18 colors)

core/
  brand/colors.json      ← Update HC values to reference primitives
  neutral/colors.json    ← Update HC values to reference primitives
  semantic/colors.json   ← Update HC values to reference primitives

semantic/
  ui/context.json        ← Add 8 alpha tokens
  interactive/states.json ← Add 6 new state tokens
  variant/components.json ← Add missing button variants

component/
  button/tokens.json     ← Reference new semantic tokens
```

### File Impact Summary

| File                                                      | Change Type          | New Tokens | Updated Tokens | Lines Changed |
| --------------------------------------------------------- | -------------------- | ---------- | -------------- | ------------- |
| `primitives/color/palette.json`                           | Add primitives       | 24         | 0              | ~400          |
| `core/brand/colors.json`                                  | Update HC references | 0          | 6              | ~30           |
| `core/neutral/colors.json`                                | Update HC references | 0          | 9              | ~45           |
| `core/semantic/colors.json`                               | Update HC references | 0          | 16             | ~80           |
| `semantic/ui/context.json`                                | Add alpha tokens     | 5          | 1              | ~150          |
| `semantic/interactive/states.json`                        | Add state tokens     | 6          | 0              | ~180          |
| `semantic/variant/components.json`                        | Add button variants  | 6          | 0              | ~180          |
| `main/src/components/Button/Button.additional.module.css` | Replace hard-coded   | 0          | 0              | ~15           |

**Total:** 41 new tokens, 32 updated tokens, ~1,080 lines changed

---

## Token Structure Changes

### 1. HC Primitive Palette (New)

**File:** `tokens/src/primitives/color/palette.json`

**Location in JSON:** `primitive.color.hc`

```json
{
  "primitive": {
    "color": {
      "hc": {
        "black": {
          "$value": "#000000",
          "$type": "color",
          "$description": "Pure black for high-contrast text and borders - WCAG AAA compliant",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
              "palette": "high-contrast",
              "useCase": "High-contrast mode text, borders, and icons"
            }
          }
        },
        "white": {
          "$value": "#ffffff",
          "$type": "color",
          "$description": "Pure white for high-contrast backgrounds and inverse text",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
              "palette": "high-contrast",
              "useCase": "High-contrast mode backgrounds and inverse text"
            }
          }
        },
        "blue": {
          "$value": "#0000ff",
          "$type": "color",
          "$description": "Pure blue for high-contrast primary actions and links",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
              "palette": "high-contrast",
              "useCase": "High-contrast mode primary buttons, links, focus indicators"
            }
          }
        },
        "red": {
          "$value": "#ff0000",
          "$type": "color",
          "$description": "Pure red for high-contrast error states and destructive actions",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
              "palette": "high-contrast",
              "useCase": "High-contrast mode error messages, destructive buttons, validation"
            }
          }
        },
        "green": {
          "$value": "#00ff00",
          "$type": "color",
          "$description": "Pure green for high-contrast success states and positive feedback",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
              "palette": "high-contrast",
              "useCase": "High-contrast mode success messages, positive indicators"
            }
          }
        },
        "yellow": {
          "$value": "#ffff00",
          "$type": "color",
          "$description": "Pure yellow for high-contrast warning states and alerts",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
              "palette": "high-contrast",
              "useCase": "High-contrast mode warning messages, alert banners"
            }
          }
        }
      }
    }
  }
}
```

**Generated CSS Variables:**

```css
--lufa-primitive-color-hc-black: #000000;
--lufa-primitive-color-hc-white: #ffffff;
--lufa-primitive-color-hc-blue: #0000ff;
--lufa-primitive-color-hc-red: #ff0000;
--lufa-primitive-color-hc-green: #00ff00;
--lufa-primitive-color-hc-yellow: #ffff00;
```

---

### 2. Alpha Primitive Palette (New)

**File:** `tokens/src/primitives/color/palette.json`

**Location in JSON:** `primitive.color.alpha`

```json
{
  "primitive": {
    "color": {
      "alpha": {
        "black": {
          "100": {
            "$value": "rgba(0, 0, 0, 1.0)",
            "$type": "color",
            "$description": "Solid black - reference value"
          },
          "90": {
            "$value": "rgba(0, 0, 0, 0.9)",
            "$type": "color",
            "$description": "90% opacity black - very strong overlay"
          },
          "80": {
            "$value": "rgba(0, 0, 0, 0.8)",
            "$type": "color",
            "$description": "80% opacity black - strong overlay"
          },
          "60": {
            "$value": "rgba(0, 0, 0, 0.6)",
            "$type": "color",
            "$description": "60% opacity black - medium overlay"
          },
          "50": {
            "$value": "rgba(0, 0, 0, 0.5)",
            "$type": "color",
            "$description": "50% opacity black - balanced overlay"
          },
          "38": {
            "$value": "rgba(0, 0, 0, 0.38)",
            "$type": "color",
            "$description": "38% opacity black - disabled state standard (Material Design)"
          },
          "16": {
            "$value": "rgba(0, 0, 0, 0.16)",
            "$type": "color",
            "$description": "16% opacity black - subtle overlay"
          },
          "8": {
            "$value": "rgba(0, 0, 0, 0.08)",
            "$type": "color",
            "$description": "8% opacity black - hover state overlay"
          },
          "4": {
            "$value": "rgba(0, 0, 0, 0.04)",
            "$type": "color",
            "$description": "4% opacity black - ultra-subtle overlay"
          }
        },
        "white": {
          "100": {
            "$value": "rgba(255, 255, 255, 1.0)",
            "$type": "color",
            "$description": "Solid white - reference value"
          },
          "90": {
            "$value": "rgba(255, 255, 255, 0.9)",
            "$type": "color",
            "$description": "90% opacity white - very strong overlay"
          },
          "80": {
            "$value": "rgba(255, 255, 255, 0.8)",
            "$type": "color",
            "$description": "80% opacity white - strong overlay"
          },
          "60": {
            "$value": "rgba(255, 255, 255, 0.6)",
            "$type": "color",
            "$description": "60% opacity white - medium overlay"
          },
          "50": {
            "$value": "rgba(255, 255, 255, 0.5)",
            "$type": "color",
            "$description": "50% opacity white - balanced overlay"
          },
          "38": {
            "$value": "rgba(255, 255, 255, 0.38)",
            "$type": "color",
            "$description": "38% opacity white - disabled state standard"
          },
          "16": {
            "$value": "rgba(255, 255, 255, 0.16)",
            "$type": "color",
            "$description": "16% opacity white - subtle overlay"
          },
          "8": {
            "$value": "rgba(255, 255, 255, 0.08)",
            "$type": "color",
            "$description": "8% opacity white - hover state overlay"
          },
          "4": {
            "$value": "rgba(255, 255, 255, 0.04)",
            "$type": "color",
            "$description": "4% opacity white - ultra-subtle overlay"
          }
        }
      }
    }
  }
}
```

**Generated CSS Variables (example):**

```css
--lufa-primitive-color-alpha-black-100: rgba(0, 0, 0, 1);
--lufa-primitive-color-alpha-black-50: rgba(0, 0, 0, 0.5);
--lufa-primitive-color-alpha-white-8: rgba(255, 255, 255, 0.08);
/* ... etc */
```

---

### 3. Core Token HC Updates

**Files:** `core/brand/colors.json`, `core/neutral/colors.json`, `core/semantic/colors.json`

**Change:** Replace hard-coded HC hex values with primitive references

**Example (Brand Primary):**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$type": "color",
        "$description": "Primary brand color - main call-to-action and key interactive elements",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "brand",
            "mode": {
              "light": "{primitive.color.blue.600}",
              "dark": "{primitive.color.blue.500}",
              "high-contrast": "{primitive.color.hc.blue}"
            }
          }
        }
      }
    }
  }
}
```

**All Core Tokens Requiring HC Updates:**

| Token                                 | Light         | Dark          | High-Contrast (New)           |
| ------------------------------------- | ------------- | ------------- | ----------------------------- |
| `core.brand.primary`                  | blue.600      | blue.500      | `{primitive.color.hc.blue}`   |
| `core.brand.primary-hover`            | blue.700      | blue.400      | `{primitive.color.hc.blue}`   |
| `core.brand.primary-active`           | blue.800      | blue.600      | `{primitive.color.hc.blue}`   |
| `core.brand.secondary`                | purple.500    | purple.400    | purple.600                    |
| `core.brand.secondary-hover`          | purple.600    | purple.300    | purple.700                    |
| `core.brand.secondary-active`         | purple.700    | purple.500    | purple.800                    |
| `core.neutral.background`             | gray.50       | gray.900      | `{primitive.color.hc.white}`  |
| `core.neutral.surface`                | gray.100      | gray.800      | gray.50                       |
| `core.neutral.border`                 | gray.300      | gray.700      | `{primitive.color.hc.black}`  |
| `core.neutral.border-strong`          | gray.400      | gray.600      | `{primitive.color.hc.black}`  |
| `core.neutral.text-primary`           | gray.900      | gray.50       | `{primitive.color.hc.black}`  |
| `core.neutral.text-secondary`         | gray.600      | gray.400      | gray.700                      |
| `core.neutral.text-tertiary`          | gray.500      | gray.500      | gray.600                      |
| `core.neutral.text-disabled`          | gray.400      | gray.600      | gray.500                      |
| `core.semantic.success`               | green.600     | green.500     | `{primitive.color.hc.green}`  |
| `core.semantic.error`                 | red.600       | red.500       | `{primitive.color.hc.red}`    |
| `core.semantic.warning`               | yellow.500    | yellow.400    | `{primitive.color.hc.yellow}` |
| `core.semantic.info`                  | blue.500      | blue.400      | `{primitive.color.hc.blue}`   |
| All `*-subtle`, `*-border`, `*-hover` | (appropriate) | (appropriate) | (appropriate HC values)       |

**Note:** Some tokens use intermediate shades (gray.700, purple.600) instead of pure HC colors to maintain visual hierarchy while still meeting WCAG AAA.

---

### 4. Semantic Alpha Tokens (New)

**File:** `tokens/src/semantic/ui/context.json`

**Add these new tokens:**

```json
{
  "semantic": {
    "ui": {
      "overlay-backdrop": {
        "$value": "{primitive.color.alpha.black.50}",
        "$type": "color",
        "$description": "Semi-transparent backdrop for modals, dialogs, and drawers",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "ui",
            "subcategory": "overlay",
            "useCase": "Modal backdrops, dialog overlays, drawer backgrounds",
            "mode": {
              "light": "{primitive.color.alpha.black.50}",
              "dark": "{primitive.color.alpha.black.80}",
              "high-contrast": "{primitive.color.alpha.black.90}"
            }
          }
        }
      },
      "overlay-hover": {
        "$value": "{primitive.color.alpha.black.4}",
        "$type": "color",
        "$description": "Subtle overlay for hover states on interactive elements",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "ui",
            "subcategory": "overlay",
            "mode": {
              "light": "{primitive.color.alpha.black.4}",
              "dark": "{primitive.color.alpha.white.8}",
              "high-contrast": "{primitive.color.alpha.white.16}"
            }
          }
        }
      },
      "overlay-pressed": {
        "$value": "{primitive.color.alpha.black.8}",
        "$type": "color",
        "$description": "Overlay for pressed/active states",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "ui",
            "subcategory": "overlay",
            "mode": {
              "light": "{primitive.color.alpha.black.8}",
              "dark": "{primitive.color.alpha.white.16}",
              "high-contrast": "{primitive.color.alpha.white.16}"
            }
          }
        }
      },
      "overlay-selected": {
        "$value": "{primitive.color.alpha.black.16}",
        "$type": "color",
        "$description": "Overlay for selected states in lists and menus",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "ui",
            "subcategory": "overlay",
            "mode": {
              "light": "{primitive.color.alpha.black.16}",
              "dark": "{primitive.color.alpha.white.16}",
              "high-contrast": "{primitive.color.alpha.white.16}"
            }
          }
        }
      },
      "scrim": {
        "$value": "{primitive.color.alpha.black.38}",
        "$type": "color",
        "$description": "Scrim overlay for bottom sheets and temporary surfaces",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "ui",
            "subcategory": "overlay",
            "mode": {
              "light": "{primitive.color.alpha.black.38}",
              "dark": "{primitive.color.alpha.black.60}",
              "high-contrast": "{primitive.color.alpha.black.80}"
            }
          }
        }
      }
    }
  }
}
```

**Update existing token:**

```json
{
  "semantic": {
    "ui": {
      "background-overlay": {
        "$value": "{semantic.ui.overlay-backdrop}",
        "$type": "color",
        "$description": "DEPRECATED: Use overlay-backdrop instead. Kept for backwards compatibility.",
        "$extensions": {
          "lufa": {
            "deprecated": true,
            "replacement": "semantic.ui.overlay-backdrop"
          }
        }
      }
    }
  }
}
```

---

### 5. Interactive State Tokens (New)

**File:** `tokens/src/semantic/interactive/states.json`

**Add these new tokens:**

```json
{
  "semantic": {
    "interactive": {
      "disabled-opacity": {
        "$value": "0.38",
        "$type": "number",
        "$description": "Opacity value for disabled interactive elements (Material Design standard)",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "interactive",
            "subcategory": "state",
            "useCase": "Apply to buttons, inputs, and controls in disabled state"
          }
        }
      },
      "loading-opacity": {
        "$value": "0.6",
        "$type": "number",
        "$description": "Opacity value for loading states and skeleton loaders",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "interactive",
            "subcategory": "state",
            "useCase": "Skeleton loaders, loading placeholders"
          }
        }
      },
      "placeholder-opacity": {
        "$value": "0.5",
        "$type": "number",
        "$description": "Opacity value for placeholder text and empty states",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "interactive",
            "subcategory": "state",
            "useCase": "Input placeholders, empty state illustrations"
          }
        }
      },
      "focus-background": {
        "$value": "{core.brand.primary}",
        "$type": "color",
        "$description": "Background color for focused interactive elements (rare use case)",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "interactive",
            "subcategory": "state",
            "useCase": "Filled focus states (not just outline)"
          }
        }
      },
      "selected-background": {
        "$value": "{semantic.ui.overlay-selected}",
        "$type": "color",
        "$description": "Background color for selected items in lists and menus",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "interactive",
            "subcategory": "state",
            "useCase": "Selected list items, active menu items, selected tabs"
          }
        }
      },
      "selected-text": {
        "$value": "{core.brand.primary}",
        "$type": "color",
        "$description": "Text color for selected items",
        "$extensions": {
          "lufa": {
            "level": "semantic",
            "category": "interactive",
            "subcategory": "state",
            "useCase": "Text in selected list items, active navigation"
          }
        }
      }
    }
  }
}
```

---

### 6. Missing Button Variant Tokens (New)

**File:** `tokens/src/semantic/variant/components.json`

**Add these missing button tokens:**

```json
{
  "semantic": {
    "button": {
      "warning-background": {
        "$value": "{core.semantic.warning}",
        "$type": "color",
        "$description": "Background for warning action buttons"
      },
      "warning-background-hover": {
        "$value": "{core.semantic.warning-hover}",
        "$type": "color",
        "$description": "Hover background for warning buttons"
      },
      "warning-text": {
        "$value": "{core.neutral.text-primary}",
        "$type": "color",
        "$description": "Text color for warning buttons"
      },
      "info-background": {
        "$value": "{core.semantic.info}",
        "$type": "color",
        "$description": "Background for informational action buttons"
      },
      "info-background-hover": {
        "$value": "{core.semantic.info-hover}",
        "$type": "color",
        "$description": "Hover background for info buttons"
      },
      "info-text": {
        "$value": "{core.neutral.text-primary}",
        "$type": "color",
        "$description": "Text color for info buttons"
      }
    }
  }
}
```

---

## Token Migrations

### Hard-Coded Colors to Replace

| Location                                                | Current Value          | New Token                                   |
| ------------------------------------------------------- | ---------------------- | ------------------------------------------- |
| `Button.additional.module.css:15`                       | `color: #ffffff`       | `var(--lufa-semantic-button-warning-text)`  |
| `Button.additional.module.css:23`                       | `color: #ffffff`       | `var(--lufa-semantic-button-info-text)`     |
| `Button.additional.module.css:31`                       | `color: #ffffff`       | `var(--lufa-semantic-button-success-text)`  |
| `Button.additional.module.css:39`                       | `color: #ffffff`       | `var(--lufa-semantic-button-destructive)`   |
| `Button.additional.module.css:47`                       | `color: #ffffff`       | (same as above)                             |
| `Button.additional.module.css:55`                       | `color: #ffffff`       | (same as above)                             |
| `Button.additional.module.css:63`                       | `color: #ffffff`       | (same as above)                             |
| `semantic/variant/components.json`                      | `"$value": "#ffffff"`  | `"{core.neutral.text-on-primary}"`          |
| `semantic/variant/components.json`                      | `"$value": "#ffffff"`  | `"{core.neutral.text-on-secondary}"`        |
| `semantic/variant/components.json`                      | `"$value": "#ffffff"`  | `"{core.neutral.text-on-destructive}"`      |
| `semantic/ui/context.json`                              | `"rgba(0, 0, 0, 0.5)"` | `"{semantic.ui.overlay-backdrop}"`          |
| `semantic/ui/context.json`                              | `"#ffffff"`            | `"{primitive.color.hc.white}"`              |
| `semantic/ui/context.json`                              | `"#ffffff"`            | `"{primitive.color.hc.white}"`              |
| `utils/accessibility.ts` (dynamic contrast calculation) | `#ffffff` (fallback)   | Keep as fallback (OK for dynamic functions) |

**Note:** The `utils/accessibility.ts` hard-coded value is acceptable as it's a fallback for dynamic contrast calculations.

---

## Component Updates

### Button Component

**File:** `packages/design-system/main/src/components/Button/Button.additional.module.css`

**Changes Required:**

```diff
/* Warning variant - solid type */
.button.type-solid.variant-warning {
-  color: #ffffff;
+  color: var(--lufa-semantic-button-warning-text);
}

/* Info variant - solid type */
.button.type-solid.variant-info {
-  color: #ffffff;
+  color: var(--lufa-semantic-button-info-text);
}

/* Success variant - solid type */
.button.type-solid.variant-success {
-  color: #ffffff;
+  color: var(--lufa-semantic-button-success-text);
}

/* Destructive variant - solid type */
.button.type-solid.variant-destructive {
-  color: #ffffff;
+  color: var(--lufa-semantic-button-destructive-text);
}
```

**Lines affected:** ~15 lines across 4 variant classes

---

### Modal/Dialog Components (Future)

**File:** (When modal component exists)

**Example usage of new overlay tokens:**

```css
.modal-backdrop {
  background-color: var(--lufa-semantic-ui-overlay-backdrop);
}

.modal-scrim {
  background-color: var(--lufa-semantic-ui-scrim);
}
```

---

### Disabled States (All Components)

**Pattern to apply:**

```css
.button:disabled,
.input:disabled {
  opacity: var(--lufa-semantic-interactive-disabled-opacity);
}
```

---

## Build System Changes

### Style Dictionary Config

**File:** `packages/design-system/tokens/config.json`

**No changes required** - existing config already supports:

- Mode-based token generation via `$extensions.lufa.mode`
- RGBA color output
- Nested token structures

**Verification needed:** Ensure Style Dictionary resolves nested token references correctly:

```json
"{primitive.color.hc.blue}" → "#0000ff"
"{primitive.color.alpha.black.50}" → "rgba(0, 0, 0, 0.5)"
```

---

## Migration Strategy

### Phase 1: Primitive Layer (Week 1)

**Day 1-2: Create HC Primitives**

1. Add `primitive.color.hc.*` tokens (6 tokens)
2. Run `npm run tokens:build`
3. Verify CSS output contains `--lufa-primitive-color-hc-*` variables

**Day 3-4: Create Alpha Primitives**

1. Add `primitive.color.alpha.*` tokens (18 tokens)
2. Run `npm run tokens:build`
3. Verify RGBA output is correct

**Day 5: Testing**

- Verify all primitive tokens render correctly
- Check CSS variable output
- No breaking changes

---

### Phase 2: Core Layer (Week 1-2)

**Day 6-7: Update Core Brand Tokens**

1. Replace HC hard-coded values with `{primitive.color.hc.*}` references
2. Update 6 brand tokens

**Day 8-9: Update Core Neutral Tokens**

1. Replace HC hard-coded values
2. Update 9 neutral tokens

**Day 10: Update Core Semantic Tokens**

1. Replace HC hard-coded values
2. Update 16 semantic tokens

**Day 11: Testing**

- Verify all core tokens resolve correctly
- Test light/dark/HC modes in Storybook
- Check WCAG contrast ratios

---

### Phase 3: Semantic Layer (Week 2)

**Day 12-13: Add Semantic Alpha Tokens**

1. Add `semantic.ui.overlay-*` tokens (5 tokens)
2. Add `semantic.interactive.*-opacity` tokens (3 tokens)
3. Deprecate `semantic.ui.background-overlay`

**Day 14: Add Interactive State Tokens**

1. Add `semantic.interactive.selected-*` tokens (2 tokens)
2. Add `semantic.interactive.focus-background` (1 token)

**Day 15: Add Button Variant Tokens**

1. Add `semantic.button.warning-*` tokens (3 tokens)
2. Add `semantic.button.info-*` tokens (3 tokens)

**Day 16: Testing**

- Verify semantic tokens inherit mode values correctly
- Test all interactive states
- Verify button variants render correctly

---

### Phase 4: Component Updates (Week 2-3)

**Day 17-18: Update Button Component**

1. Replace 7 hard-coded color values in Button.additional.module.css
2. Test all button variants × types × states
3. Visual regression tests

**Day 19: Update Token JSON Files**

1. Update `semantic/variant/components.json` (3 replacements)
2. Update `semantic/ui/context.json` (3 replacements)

**Day 20: Testing**

- Test all components in 3 modes
- Verify no visual regressions
- Check accessibility

---

### Phase 5: Documentation & Release (Week 3)

**Day 21-22: Documentation**

1. Update token usage guide
2. Create high-contrast mode guide
3. Document alpha token patterns
4. Update Storybook stories

**Day 23: Final Testing**

- Full system test (all components × all modes)
- WCAG AAA validation
- Performance testing
- Cross-browser testing

**Day 24: Release**

- Version bump to v0.8.0
- Publish to npm
- Update changelog
- Migration guide

---

## Testing Requirements

### Unit Tests

**Token Resolution Tests:**

```typescript
describe('Color Token Resolution', () => {
  it('should resolve HC primitive references', () => {
    expect(resolveToken('core.brand.primary', 'high-contrast')).toBe('#0000ff');
  });

  it('should resolve alpha primitive references', () => {
    expect(resolveToken('semantic.ui.overlay-backdrop', 'light')).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('should resolve nested token references', () => {
    expect(resolveToken('semantic.ui.overlay-backdrop')).toBeDefined();
  });
});
```

---

### Visual Regression Tests

**Storybook Chromatic:**

```typescript
// Button.stories.tsx
export const AllVariantsInModes = () => (
  <>
    {['light', 'dark', 'high-contrast'].map(mode => (
      <div data-mode={mode} key={mode}>
        <h3>{mode} Mode</h3>
        {['primary', 'secondary', 'warning', 'info', 'success', 'destructive'].map(variant => (
          <Button variant={variant} key={variant}>
            {variant} Button
          </Button>
        ))}
      </div>
    ))}
  </>
);
```

**Capture screenshots:**

- All button variants × types × states × modes = ~144 combinations
- All components with new alpha overlays
- Focus states with new focus tokens

---

### Accessibility Tests

**Contrast Ratio Validation:**

```typescript
import { checkContrast } from '@adobe/leonardo-contrast-colors';

describe('WCAG AAA Compliance', () => {
  it('should meet 7:1 contrast in high-contrast mode', () => {
    const textColor = getToken('core.neutral.text-primary', 'high-contrast');
    const bgColor = getToken('core.neutral.background', 'high-contrast');
    const ratio = checkContrast(textColor, bgColor);
    expect(ratio).toBeGreaterThanOrEqual(7);
  });
});
```

**Manual Testing:**

- Test with Windows High Contrast Mode
- Test with macOS Increase Contrast
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard navigation testing

---

### Integration Tests

**Mode Switching:**

```typescript
describe('Mode Switching', () => {
  it('should apply correct tokens when mode changes', () => {
    render(<Button>Click me</Button>);

    document.documentElement.setAttribute('data-mode', 'high-contrast');

    const button = screen.getByRole('button');
    const styles = getComputedStyle(button);

    expect(styles.backgroundColor).toBe('rgb(0, 0, 255)'); // Pure blue
  });
});
```

---

## Performance Impact

### CSS File Size

**Current:** ~45 KB (tokens.css)  
**After Changes:** ~48 KB (+3 KB, +6.7%)

**Breakdown:**

- +24 primitive tokens × ~40 bytes = ~1.0 KB
- +14 semantic tokens × ~80 bytes = ~1.1 KB
- +32 updated tokens × ~30 bytes (delta) = ~1.0 KB

**Impact:** Negligible (< 1% of typical bundle size)

---

### Runtime Performance

**No impact expected:**

- All tokens are CSS variables (no runtime resolution)
- No additional JavaScript
- No algorithmic color generation

---

### Build Time

**Current:** ~2-3 seconds (token build)  
**After Changes:** ~2.5-3.5 seconds (+0.5 sec, +20%)

**Reason:** +38 tokens to process

**Mitigation:** None needed (still fast)

---

## Rollout Plan

### Version Strategy

**Target Version:** v0.8.0  
**Breaking Changes:** None  
**Deprecations:** 1 token (`semantic.ui.background-overlay`)

---

### Release Phases

#### Phase 1: Alpha Release (v0.8.0-alpha.1)

- Internal testing
- Design team review
- Storybook preview deployment

#### Phase 2: Beta Release (v0.8.0-beta.1)

- Limited external testing
- Collect feedback
- Fix critical bugs

#### Phase 3: RC Release (v0.8.0-rc.1)

- Final testing
- Documentation finalization
- Migration guide ready

#### Phase 4: Stable Release (v0.8.0)

- Public release
- Announcement
- npm publish

---

### Backwards Compatibility

**Guaranteed:**

- All existing tokens remain unchanged
- All existing CSS variables work
- No breaking changes for consumers

**Deprecated (with warnings):**

- `semantic.ui.background-overlay` → Use `semantic.ui.overlay-backdrop`

**Migration Path:**

- Consumers can upgrade immediately (v0.7.1 → v0.8.0)
- No code changes required
- Optional: adopt new tokens for enhanced features

---

### Communication Plan

**Announcement Channels:**

- GitHub Release Notes
- npm package changelog
- Design System documentation site
- Internal Slack/Teams channels

**Migration Guide:**

- Document new tokens available
- Show before/after examples
- Highlight improvements (HC coverage, alpha support)
- Provide code snippets

---

## Success Criteria

### Must-Have (Launch Blockers)

- [ ] All 38 new tokens created
- [ ] All 14 hard-coded colors replaced
- [ ] HC coverage reaches 100% (46/46 tokens)
- [ ] All button variants render correctly
- [ ] No visual regressions in Storybook
- [ ] WCAG AAA compliance verified
- [ ] All tests passing
- [ ] Documentation updated

---

### Nice-to-Have (Post-Launch)

- [ ] Automated WCAG validation in CI
- [ ] Additional alpha overlay patterns
- [ ] Link color tokens (default, hover, visited)
- [ ] Token reorganization (Phase 3)

---

### Metrics for Success

| Metric                     | Baseline | Target | Actual |
| -------------------------- | -------- | ------ | ------ |
| HC Token Coverage          | 67%      | 100%   | TBD    |
| Hard-Coded Color Instances | 14       | 0      | TBD    |
| WCAG AAA Pass Rate         | ~80%     | 100%   | TBD    |
| Token Count                | 149      | 187    | TBD    |
| CSS File Size              | 45 KB    | <50 KB | TBD    |
| Build Time                 | 2-3 sec  | <4 sec | TBD    |
| Zero Breaking Changes      | N/A      | Yes    | TBD    |
| Documentation Coverage     | ~85%     | 100%   | TBD    |

---

**End of Technical Specification**

**Approved By:** Architecture Team  
**Implementation Start:** Phase 2D  
**Estimated Completion:** 3-4 weeks  
**Review Date:** End of Phase 2D

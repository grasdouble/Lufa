# ADR-013: Token Metadata Simplification

**Status:** Implemented  
**Date:** 2026-02-24 (Updated)  
**Deciders:** Architecture Team  
**Context:** Token System Optimization - Architecture Cleanup

---

## Context

The Lufa Design System v0.7.1 token architecture (established in ADR-011) introduced explicit metadata flags to distinguish immutable primitives from mode-aware semantic tokens. However, after implementation and usage, several issues emerged:

### Problems with Current Architecture

**1. Excessive Redundancy**

```json
{
  "modeAware": true, // ❌ Redundant - can be inferred from modes presence
  "modes": {
    // If modes exists, token is obviously mode-aware
    "light": "{primitive.color.blue.600}",
    "dark": "{primitive.color.blue.400}",
    "high-contrast": "{primitive.color.hc.blue}"
  }
}
```

**2. Duplicate Information**

```json
{
  "$value": "{primitive.color.blue.600}", // Light mode value
  "modes": {
    "light": "{primitive.color.blue.600}", // ❌ Exact duplicate!
    "dark": "{primitive.color.blue.400}"
  }
}
```

**3. Verbose Primitives**

Every primitive (~500 tokens) repeats the same metadata:

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "level": "primitive", // ❌ Can be inferred from path
          "themeable": false, // ❌ Always false for primitives
          "modeAware": false // ❌ Always false for primitives
        }
      }
    }
  }
}
```

**4. Three Properties for One Concept**

- `themeable` → For themes (ocean/forest) - Phase 6
- `modeAware` → For modes (light/dark/high-contrast)
- `modes` → Actual mode values

This creates confusion: which flag controls what?

### Statistics

Analyzing the current token files:

- **74 token files** total
- **~500 primitive tokens** all with `themeable: false, modeAware: false`
- **~150 semantic tokens** with both `modeAware: true` AND `modes` object
- **~30% metadata overhead** (redundant properties)

---

## Decision

We will **simplify token metadata** by removing redundant properties and relying on **convention over configuration** and **inference**.

### Principle 1: Convention Over Configuration

**If `modes` object exists → token is mode-aware**

No need for explicit `modeAware` flag.

```json
// ❌ BEFORE (redundant)
{
  "modeAware": true,
  "modes": { "dark": "..." }
}

// ✅ AFTER (clean)
{
  "modes": { "dark": "..." }
}
```

### Principle 2: Implicit Light Mode

**`$value` is the light mode value**

No need to duplicate in `modes.light`.

```json
// ❌ BEFORE (duplicate)
{
  "$value": "{primitive.color.blue.600}",
  "modes": {
    "light": "{primitive.color.blue.600}",  // Duplicate!
    "dark": "{primitive.color.blue.400}"
  }
}

// ✅ AFTER (DRY)
{
  "$value": "{primitive.color.blue.600}",  // Light mode (implicit)
  "modes": {
    "dark": "{primitive.color.blue.400}"
    // light is implicit = $value
  }
}
```

### Principle 3: Inference from Path

**Token level is inferred from path structure**

No need for explicit `level` property.

```json
// Path: primitive.color.blue.600 → level = "primitive"
// Path: core.brand.primary → level = "core"
// Path: semantic.button.background → level = "semantic"
```

### Principle 4: Immutable by Nature

**Primitives are always immutable**

No need for `themeable: false` or `modeAware: false` on every primitive.

```json
// ❌ BEFORE (verbose)
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "level": "primitive",
          "themeable": false,
          "modeAware": false
        }
      }
    }
  }
}

// ✅ AFTER (minimal)
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb"
          // That's it! Level inferred, immutability implicit
        }
      }
    }
  }
}
```

---

### Principle 5: Auto-Generate Computed Metadata

**WCAG accessibility metadata is calculated at build time, not stored in source**

Contrast ratios are derived from color hex values (single source of truth).

```json
// ❌ BEFORE (manual maintenance, prone to errors)
{
  "primitive": {
    "color": {
      "gray": {
        "50": {
          "$value": "#f9fafb",
          "$extensions": {
            "lufa": {
              "wcagAALarge": ["gray-900", "gray-800"],  // Manually maintained
              "wcagAAA": ["gray-900"]  // Can become outdated
            }
          }
        }
      }
    }
  }
}

// ✅ AFTER (auto-generated, always accurate)
// Source file (src/primitives/color.json)
{
  "primitive": {
    "color": {
      "gray": {
        "50": {
          "$value": "#f9fafb"
          // No WCAG metadata - generated at build time
        }
      }
    }
  }
}

// Dist file (dist/tokens-metadata.json) - auto-generated
{
  "primitive": {
    "color": {
      "gray": {
        "50": {
          "value": "#f9fafb",
          "extensions": {
            "lufa": {
              "wcagAALarge": [
                "primitive-color-blue-500",
                "primitive-color-gray-500",
                "primitive-color-green-600",
                // ... 30+ compliant colors (all families)
              ],
              "wcagAAA": [
                "primitive-color-blue-900",
                "primitive-color-gray-700",
                // ... 14+ AAA-compliant colors
              ]
            }
          }
        }
      }
    }
  }
}
```

**Benefits:**

- ✅ Single source of truth (hex values)
- ✅ Always accurate (calculated from actual colors)
- ✅ Zero maintenance (auto-generated)
- ✅ Complete coverage (cross-color-family pairs)

**Implementation:**

- Build preprocessor: `build/preprocessors/add-wcag-metadata.js`
- WCAG calculator: `build/utils/wcag-contrast.js`
- Runs before Style Dictionary build

---

### Principle 6: Detect Fluid Tokens from CSS Value

**Fluid tokens are identified by the presence of `clamp()` in their value**

No need for explicit `fluid` flags or redundant `fluidRange` metadata.

```json
// ❌ BEFORE (redundant metadata)
{
  "primitive": {
    "typography": {
      "font-size": {
        "5xl": {
          "$value": "clamp(2rem, 1.5rem + 2vw, 3rem)",
          "$extensions": {
            "lufa": {
              "fluid": true,           // Redundant - detectable from clamp()
              "fluidRange": {
                "min": "32px",         // Redundant - already in clamp()
                "max": "48px",         // Redundant - already in clamp()
                "viewport": {
                  "min": "320px",      // System constant
                  "max": "1280px"      // System constant
                }
              }
            }
          }
        }
      }
    }
  }
}

// ✅ AFTER (convention-based detection)
{
  "primitive": {
    "typography": {
      "font-size": {
        "5xl": {
          "$value": "clamp(2rem, 1.5rem + 2vw, 3rem)"
          // Value contains clamp() → automatically fluid
          // Min/max parsable from clamp() value
          // Viewport range = system constant (320px-1280px)
        }
      }
    }
  }
}
```

**Detection logic:**

```javascript
export const isFluidToken = (token) => {
  return typeof token.value === 'string' && token.value.includes('clamp(');
};

export const parseFluidRange = (clampValue) => {
  // Extract min/max from: clamp(2rem, 1.5rem + 2vw, 3rem)
  const match = clampValue.match(/clamp\(([^,]+),\s*[^,]+,\s*([^)]+)\)/);
  return match ? { min: match[1], max: match[2] } : null;
};
```

**System constant (documented, not duplicated):**

```javascript
// All fluid tokens use this viewport range in their clamp() formulas
const FLUID_VIEWPORT_RANGE = {
  min: '320px', // Mobile
  max: '1280px', // Desktop XL
};
```

**Benefits:**

- ✅ Zero redundant metadata (18 properties removed)
- ✅ Single source of truth (`clamp()` value)
- ✅ Impossible to have inconsistencies (min/max can't diverge)
- ✅ Self-documenting (CSS value shows intent)
- ✅ Viewport range as system constant (not token property)

---

## Simplified Architecture

### Layer 1: Primitives (Immutable Constants)

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$type": "color",
          "$description": "Base blue color"
          // No metadata needed - it's a constant!
        }
      }
    }
  }
}
```

**Inferred:**

- `level`: "primitive" (from path)
- `themeable`: false (always)
- `modeAware`: false (always)
- Cannot have `modes` object

---

### Layer 2: Core/Semantic (Mode-Aware)

**Case A: Simple token (no mode variation)**

```json
{
  "core": {
    "spacing": {
      "base": {
        "$value": "{primitive.spacing.4}",
        "$type": "dimension"
        // No modes → same in all modes
      }
    }
  }
}
```

**Case B: Mode-aware token**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}", // Light mode (implicit)
        "$type": "color",
        "$extensions": {
          "lufa": {
            "modes": {
              // Presence indicates mode-awareness
              "dark": "{primitive.color.blue.400}",
              "high-contrast": "{primitive.color.hc.blue}"
              // No 'light' - it's implicit ($value)
            }
          }
        }
      }
    }
  }
}
```

**Inferred:**

- `level`: "core" (from path)
- `modeAware`: true (from `modes` presence)
- Light mode: `$value` (implicit)

---

### Layer 3: Component/Semantic (Inherits or Defines)

**Case A: Inherits from core (recommended)**

```json
{
  "semantic": {
    "button": {
      "primary": {
        "background": {
          "$value": "{core.brand.primary}",
          "$type": "color"
          // Inherits modes from core.brand.primary automatically
        }
      }
    }
  }
}
```

**Case B: Explicit modes (when different from reference)**

```json
{
  "semantic": {
    "button": {
      "ghost": {
        "background": {
          "$value": "transparent", // Light mode
          "$type": "color",
          "$extensions": {
            "lufa": {
              "modes": {
                "dark": "{core.neutral.surface.subtle}",
                "high-contrast": "{core.neutral.border.strong}"
              }
            }
          }
        }
      }
    }
  }
}
```

---

## Validation Rules (Simplified)

```javascript
// Only 5 core rules (down from 12)

1. Primitives CANNOT have 'modes' object
2. Layout tokens CANNOT have 'modes' object
3. If 'modes' exists, must have 'dark' mode
4. NO 'light' in modes (it's implicit = $value)
5. NO deprecated properties (themable, level, modeAware)
```

---

## Migration Strategy

### Step 1: Automated Cleanup Script

```bash
node scripts/migrate-simplify-metadata.js
```

Removes:

- ✅ `modeAware` flags (inferred from `modes` presence)
- ✅ `themeable: false` on primitives
- ✅ `level` property (inferred from path)
- ✅ `modes.light` (duplicate of `$value`)
- ✅ `themable` typo (deprecated)

### Step 2: Validation Update

Replace `token-consistency.js` with simplified `token-consistency-simplified.js`

### Step 3: Style Dictionary Update

Update CSS format to infer mode-awareness from `modes` object presence.

### Step 4: Run Tests

```bash
npm run validate:tokens  # Should pass with new rules
npm run build:tokens     # Should generate identical CSS
npm run test             # Ensure no regressions
```

---

## Before/After Comparison

### Example 1: Primitive Color

**BEFORE (v0.7.1):**

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$type": "color",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
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

**AFTER (v0.8.0):**

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$type": "color",
          "$extensions": {
            "lufa": {
              "category": "color" // Only semantic metadata remains
            }
          }
        }
      }
    }
  }
}
```

**Size:** 7 lines → 4 lines (43% reduction)

---

### Example 2: Core Brand Color

**BEFORE (v0.7.1):**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$type": "color",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "brand",
            "themeable": true,
            "modeAware": true,
            "modes": {
              "light": "{primitive.color.blue.600}",
              "dark": "{primitive.color.blue.400}",
              "high-contrast": "{primitive.color.hc.blue}"
            }
          }
        }
      }
    }
  }
}
```

**AFTER (v0.8.0):**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}", // Light mode (implicit)
        "$type": "color",
        "$extensions": {
          "lufa": {
            "category": "brand",
            "modes": {
              "dark": "{primitive.color.blue.400}",
              "high-contrast": "{primitive.color.hc.blue}"
            }
          }
        }
      }
    }
  }
}
```

**Changes:**

- ❌ Removed `level: "core"` (inferred from path)
- ❌ Removed `themeable: true` (not needed yet - Phase 6)
- ❌ Removed `modeAware: true` (inferred from `modes` presence)
- ❌ Removed `modes.light` (duplicate of `$value`)

**Size:** 18 lines → 13 lines (28% reduction)

---

### Example 3: Component Token

**BEFORE (v0.7.1):**

```json
{
  "semantic": {
    "button": {
      "primary": {
        "background": {
          "$value": "{core.brand.primary}",
          "$type": "color",
          "$extensions": {
            "lufa": {
              "level": "semantic",
              "category": "button",
              "themeable": true,
              "modeAware": false // ← Problem: doesn't inherit from core!
            }
          }
        }
      }
    }
  }
}
```

**AFTER (v0.8.0):**

```json
{
  "semantic": {
    "button": {
      "primary": {
        "background": {
          "$value": "{core.brand.primary}",
          "$type": "color",
          "$extensions": {
            "lufa": {
              "category": "button"
            }
          }
        }
      }
    }
  }
}
```

**Benefits:**

- Automatically inherits modes from `core.brand.primary` via CSS variable reference
- No conflicting `modeAware: false` flag
- Cleaner, more maintainable

---

## Impact Analysis

### File Size Reduction

| Category                    | Before             | After                | Reduction |
| --------------------------- | ------------------ | -------------------- | --------- |
| Primitives (~500 tokens)    | 4 properties/token | 0-1 properties/token | ~75%      |
| Core/Semantic (~150 tokens) | 5 properties/token | 1-2 properties/token | ~60%      |
| Component (~100 tokens)     | 4 properties/token | 0-1 properties/token | ~75%      |
| Fluid tokens (11)           | 2-3 properties     | 0 properties         | ~100%     |

**Total metadata size:** ~45% reduction

### Metadata Removals Summary

| Property              | Count    | Files  | Status       |
| --------------------- | -------- | ------ | ------------ |
| `modeAware`           | 630      | 74     | ✅ Removed   |
| `themeable`           | 179      | 74     | ✅ Removed   |
| `level`               | 631      | 74     | ✅ Removed   |
| `modes.light`         | 43       | 12     | ✅ Removed   |
| `wcagAALarge/wcagAAA` | 120      | 1      | ✅ Automated |
| `fluid`/`fluidRange`  | 18       | 5      | ✅ Removed   |
| **Total**             | **1621** | **74** | ✅ Complete  |

### Build Performance

- **Validation:** 200ms → 150ms (25% faster)
- **Build time:** No change (CSS generation unchanged)
- **Bundle size:** No change (CSS output identical)

### Developer Experience

**Before:**

```typescript
// Developer asks: "Is this token mode-aware?"
// Answer: Check THREE places:
// 1. modeAware flag
// 2. modes object
// 3. Ensure they match!
```

**After:**

```typescript
// Developer asks: "Is this token mode-aware?"
// Answer: Does it have a 'modes' object? → Yes/No. Done.
```

---

## Consequences

### Positive ✅

1. **Simpler mental model:** Presence of `modes` = mode-aware. That's it.
2. **Less duplication:** No redundant `modes.light` = `$value`
3. **Smaller files:** 30% less metadata overhead
4. **Faster validation:** Fewer properties to check
5. **Clearer primitives:** No confusing `themeable: false` everywhere
6. **Easier inheritance:** Component tokens auto-inherit via CSS variables
7. **Better DRY:** Single source of truth for each value

### Negative ❌

1. **Breaking change:** Existing metadata structure changes
2. **Migration required:** All 74 token files need updates
3. **Documentation updates:** ADR-011 needs revision
4. **Tooling updates:** VS Code extension, Storybook need adjustments

**Mitigation:** Automated migration script handles 99% of changes

### Neutral ⚪

1. **CSS output unchanged:** Functionally identical
2. **Visual appearance unchanged:** No user-facing changes
3. **API unchanged:** Hook behavior identical

---

## Migration Checklist

- [ ] Run migration script: `node scripts/migrate-simplify-metadata.js`
- [ ] Backup original files: `git commit -m "Pre-migration snapshot"`
- [ ] Review migration output (check warnings)
- [ ] Replace validator: `token-consistency-simplified.js`
- [ ] Run validation: `npm run validate:tokens`
- [ ] Build tokens: `npm run build:tokens`
- [ ] Diff CSS output: `git diff dist/tokens.css` (should be minimal)
- [ ] Run tests: `npm test`
- [ ] Update documentation
- [ ] Update VS Code extension (token metadata parsing)
- [ ] Update Storybook (token explorer)
- [ ] Commit changes: `git commit -m "refactor: simplify token metadata (ADR-013)"`

---

## Rollback Strategy

If critical issues arise:

1. **Revert commit:** `git revert HEAD`
2. **Restore validator:** `git checkout HEAD~1 build/validators/token-consistency.js`
3. **Rebuild:** `npm run build:tokens`

System returns to v0.7.1 state in < 5 minutes.

---

## Alternatives Considered

### Alternative 1: Keep Current Structure

**Rejected because:**

- ❌ Redundancy confuses developers
- ❌ 30% metadata overhead
- ❌ `modeAware: false` on components blocks inheritance

### Alternative 2: Remove Only `modeAware`

**Rejected because:**

- ❌ Doesn't address `modes.light` duplication
- ❌ Doesn't simplify primitives
- ❌ Partial solution, still verbose

### Alternative 3: Remove Everything (No Metadata)

**Rejected because:**

- ❌ Lose semantic information (category, useCase, etc.)
- ❌ Can't validate architecture rules
- ❌ Documentation generation breaks

---

## Related Decisions

- **ADR-001:** Modes vs Themes Separation → Still valid, simplifies implementation
- **ADR-011:** Token Architecture → Superseded by this ADR for metadata
- **Future ADR:** Phase 6 Themes → `themes` object will work similarly to `modes`

---

## References

### Design Token Standards

- [DTCG Format Spec](https://design-tokens.github.io/community-group/format/) - W3C Community Group
- [Style Dictionary Best Practices](https://amzn.github.io/style-dictionary/) - Amazon

### Industry Examples

- **Tailwind CSS:** No explicit flags, configuration inferred from structure
- **Chakra UI:** `_light` and `_dark` suffixes, not boolean flags
- **Material Design 3:** Reference tokens (primitives) vs System tokens (semantic)

### Academic Research

- **"Don't Repeat Yourself" (DRY) Principle** - Andy Hunt, Dave Thomas
- **"Convention Over Configuration"** - Ruby on Rails philosophy

---

## Validation Criteria

This ADR is successful when:

- ✅ All 74 token files migrated
- ✅ Validation passes with simplified rules
- ✅ CSS output functionally identical (diff < 10 lines)
- ✅ Build time unchanged or faster
- ✅ No regression in visual tests
- ✅ Documentation updated
- ✅ Team feedback positive (< 2 objections)

---

**Proposed by:** Architecture Team  
**Review Period:** 2026-02-23 to 2026-02-26 (3 days)  
**Implementation:** Week of 2026-02-26  
**Target Completion:** 2026-03-01

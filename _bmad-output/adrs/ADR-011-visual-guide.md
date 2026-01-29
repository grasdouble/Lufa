# ADR-011: Token Architecture Visual Guide

**Companion to:** ADR-011 Token Architecture - Primitives as Immutable Constants  
**Created:** 2026-01-27

---

## Token Flow: From Constant to Component

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ LAYER 1: PRIMITIVES (Immutable Constants)                   ┃
┃ themeable: false  │  modeAware: false                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    primitive.color.blue.600 = #2563eb  ← Always this value
    primitive.color.blue.400 = #60a5fa  ← Always this value
    primitive.color.hc.blue = #0000ff   ← Always this value

    CSS Output:
    :root {
      --lufa-primitive-color-blue-600: #2563eb;  /* No mode selectors! */
      --lufa-primitive-color-blue-400: #60a5fa;
      --lufa-primitive-color-hc-blue: #0000ff;
    }

                                ▼ references

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ LAYER 2: CORE/SEMANTIC (Mode-Aware Meaning)                 ┃
┃ themeable: true  │  modeAware: true                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    core.brand.primary
      modes.light → {primitive.color.blue.600}       (#2563eb)
      modes.dark → {primitive.color.blue.400}        (#60a5fa)
      modes.high-contrast → {primitive.color.hc.blue} (#0000ff)

    CSS Output:
    :root,
    [data-mode='light'] {
      --lufa-core-brand-primary: var(--lufa-primitive-color-blue-600);
    }

    [data-mode='dark'] {
      --lufa-core-brand-primary: var(--lufa-primitive-color-blue-400);
    }

    [data-mode='high-contrast'] {
      --lufa-core-brand-primary: var(--lufa-primitive-color-hc-blue);
    }

                                ▼ references

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ LAYER 3: COMPONENT (Semantic Usage)                         ┃
┃ themeable: true  │  modeAware: true                          ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    component.button.primary.background
      $value → {core.brand.primary}

    CSS Output:
    :root,
    [data-mode='light'] {
      --lufa-component-button-primary-background: var(--lufa-core-brand-primary);
    }

    [data-mode='dark'] {
      /* Inherits from core.brand.primary */
      --lufa-component-button-primary-background: var(--lufa-core-brand-primary);
    }

                                ▼ used in

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ COMPONENT CODE (React/Vue/etc)                              ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

    <button className="btn-primary">
      Click Me
    </button>

    .btn-primary {
      background: var(--lufa-component-button-primary-background);
    }

    Result in Browser:
    Light mode:        background: #2563eb
    Dark mode:         background: #60a5fa
    High-contrast:     background: #0000ff
```

---

## Mode Switching: How It Works

### User Action

```
User clicks dark mode toggle
  ↓
JavaScript sets: <html data-mode="dark">
  ↓
CSS [data-mode='dark'] selector activates
  ↓
Only mode-aware tokens change
  ↓
Primitives stay constant
```

### What Changes vs What Stays Constant

```
┌─────────────────────────────────────────────────────────────┐
│ LIGHT MODE                                                  │
├─────────────────────────────────────────────────────────────┤
│ Primitive: blue-600 = #2563eb          ← CONSTANT          │
│ Primitive: blue-400 = #60a5fa          ← CONSTANT          │
│ Core: brand-primary → blue-600         ← CHANGES           │
│ Component: button-bg → brand-primary   ← INHERITS CHANGE   │
└─────────────────────────────────────────────────────────────┘

                    User switches to dark mode
                              ▼

┌─────────────────────────────────────────────────────────────┐
│ DARK MODE                                                   │
├─────────────────────────────────────────────────────────────┤
│ Primitive: blue-600 = #2563eb          ← STILL CONSTANT    │
│ Primitive: blue-400 = #60a5fa          ← STILL CONSTANT    │
│ Core: brand-primary → blue-400         ← CHANGED           │
│ Component: button-bg → brand-primary   ← INHERITED CHANGE  │
└─────────────────────────────────────────────────────────────┘
```

**Key Insight:** Primitives are like a palette that never changes. Semantic tokens pick different colors from that palette based on mode.

---

## Analogy: Paint Store

```
┌─────────────────────────────────────────────────────────────┐
│ PRIMITIVES = Paint Cans on Shelf (Always Available)        │
├─────────────────────────────────────────────────────────────┤
│ Can #600: "Deep Blue" (#2563eb)                            │
│ Can #400: "Sky Blue" (#60a5fa)                             │
│ Can HC: "Pure Blue" (#0000ff)                              │
│                                                             │
│ These cans NEVER change their color!                       │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ SEMANTIC = Paint Job Instructions (Recipe Card)            │
├─────────────────────────────────────────────────────────────┤
│ "Primary Brand Color" recipe:                              │
│   - For light rooms: Use Can #600                          │
│   - For dark rooms: Use Can #400                           │
│   - For high-contrast: Use Can HC                          │
│                                                             │
│ The RECIPE changes based on context,                       │
│ but the paint cans stay the same!                          │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ COMPONENT = Specific Application                           │
├─────────────────────────────────────────────────────────────┤
│ "Button Background" uses "Primary Brand Color" recipe      │
│                                                             │
│ Light mode: Paints with Can #600 → #2563eb                │
│ Dark mode: Paints with Can #400 → #60a5fa                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Decision Tree: Creating New Tokens

```
                        ┌───────────────┐
                        │ New Token?    │
                        └───────┬───────┘
                                │
                    ┌───────────▼───────────┐
                    │ Is it a raw value?    │
                    │ (hex, px, ms, etc)    │
                    └───────┬───────────────┘
                           YES│    │NO
                    ┌──────────┘    └──────────┐
                    ▼                           ▼
            ┌───────────────┐        ┌──────────────────┐
            │ PRIMITIVE     │        │ Does it need to  │
            │               │        │ change by mode?  │
            │ themeable:    │        └────┬─────────────┘
            │   false       │            YES│    │NO
            │ modeAware:    │        ┌──────┘    └──────┐
            │   false       │        ▼                   ▼
            │               │  ┌──────────────┐   ┌──────────┐
            │ Example:      │  │ SEMANTIC     │   │ LAYOUT   │
            │ blue-600:     │  │              │   │          │
            │ #2563eb       │  │ themeable:   │   │themeable:│
            └───────────────┘  │   true       │   │  false   │
                               │ modeAware:   │   │modeAware:│
                               │   true       │   │  false   │
                               │              │   │          │
                               │ Example:     │   │ Example: │
                               │ brand-       │   │ max-     │
                               │ primary      │   │ width    │
                               └──────────────┘   └──────────┘
```

---

## Common Mistakes (Before vs After)

### ❌ WRONG: Mode-Aware Primitive

```json
// DON'T DO THIS!
{
  "primitive": {
    "color": {
      "surface": {
        "$value": "#ffffff",
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "themeable": true, // ❌ WRONG!
            "modeAware": true, // ❌ WRONG!
            "modes": {
              "light": "#ffffff", // ❌ Primitives don't vary!
              "dark": "#1a1a1a"
            }
          }
        }
      }
    }
  }
}
```

**Why it's wrong:**

- Violates immutability principle
- Confuses "what" (a color value) with "why" (surface purpose)
- Makes primitives unpredictable

### ✅ CORRECT: Mode-Aware Semantic

```json
// DO THIS INSTEAD!
{
  "primitive": {
    "color": {
      "white": {
        "$value": "#ffffff", // ✅ Constant
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "themeable": false, // ✅ Immutable
            "modeAware": false // ✅ Never changes
          }
        }
      },
      "gray-900": {
        "$value": "#1a1a1a", // ✅ Constant
        "$extensions": {
          "lufa": {
            "level": "primitive",
            "themeable": false,
            "modeAware": false
          }
        }
      }
    }
  },
  "core": {
    "surface": {
      "primary": {
        "$value": "{primitive.color.white}",
        "$extensions": {
          "lufa": {
            "level": "core",
            "themeable": true, // ✅ Can vary by theme
            "modeAware": true, // ✅ Varies by mode
            "modes": {
              "light": "{primitive.color.white}", // ✅ Reference
              "dark": "{primitive.color.gray-900}" // ✅ Different reference
            }
          }
        }
      }
    }
  }
}
```

**Why it's correct:**

- Primitives are immutable constants
- Semantic layer handles mode switching
- Clear separation of concerns

---

## Metadata at a Glance

### Primitive Token Metadata

```json
{
  "$extensions": {
    "lufa": {
      "level": "primitive",
      "category": "color", // ← Organizational
      "themeable": false, // ← NEW: Cannot vary by theme
      "modeAware": false, // ← NEW: Cannot vary by mode
      // ❌ NO modes object
      // ❌ NO themes object
      "wcagAAA": ["..."], // ← Optional: Accessibility metadata
      "palette": "blue" // ← Optional: Grouping
    }
  }
}
```

### Semantic Token Metadata

```json
{
  "$extensions": {
    "lufa": {
      "level": "core",
      "category": "brand",
      "role": "action", // ← Semantic meaning
      "themeable": true, // ← NEW: Can vary by theme
      "modeAware": true, // ← NEW: Varies by mode
      "modes": {
        // ← REQUIRED when modeAware: true
        "light": "{primitive.color.blue.600}",
        "dark": "{primitive.color.blue.400}",
        "high-contrast": "{primitive.color.hc.blue}"
      }
      // Future: themes object when Phase 6 lands
    }
  }
}
```

### Layout Token Metadata

```json
{
  "$extensions": {
    "lufa": {
      "level": "layout",
      "category": "container",
      "themeable": false, // ← NEW: Structural constant
      "modeAware": false, // ← NEW: Doesn't vary by mode
      // ❌ NO modes object
      // ❌ NO themes object
      "responsive": true // ← Optional: Responsive metadata
    }
  }
}
```

---

## CSS Output Comparison

### Primitive (Immutable)

**Token:**

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
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

**Generated CSS:**

```css
/* ========================================
 * IMMUTABLE TOKENS
 * These never change regardless of mode or theme
 * ======================================== */
:root {
  --lufa-primitive-color-blue-600: #2563eb;
}

/* NO [data-mode] selectors! */
/* NO [data-theme] selectors! */
```

---

### Semantic (Mode-Aware)

**Token:**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$extensions": {
          "lufa": {
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

**Generated CSS:**

```css
/* ========================================
 * MODE-AWARE TOKENS
 * These change based on [data-mode] attribute
 * ======================================== */
:root,
[data-mode='light'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-blue-600);
}

[data-mode='dark'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-blue-400);
}

[data-mode='high-contrast'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-hc-blue);
}
```

---

## Key Takeaways

### 1. Primitives = Constants

```
primitive.color.blue.600 = #2563eb

This NEVER changes. Ever.
Just like Math.PI = 3.14159...
```

### 2. Semantic = Mapping

```
core.brand.primary:
  - In light mode, use blue-600
  - In dark mode, use blue-400
  - In high-contrast, use hc.blue

The REFERENCE changes, not the primitive values.
```

### 3. Mode Switching = Selector Change

```
<html data-mode="light">  → [data-mode='light'] selector
<html data-mode="dark">   → [data-mode='dark'] selector

CSS cascade handles the rest!
```

### 4. Validation Enforces Architecture

```
✅ Primitive with themeable: false     → OK
❌ Primitive with themeable: true      → Build ERROR
✅ Semantic with modeAware: true       → OK
❌ Semantic with modes but no modeAware → Build ERROR
```

---

## Next Steps

1. **Read the full ADR:** `ADR-011-token-architecture-primitives-immutable.md`
2. **Review checklist:** `ADR-011-implementation-checklist.md`
3. **Ask questions:** Office hours or team channel
4. **Start implementation:** Follow Phase 1 checklist

---

**Questions?** Contact Architecture Team  
**Last Updated:** 2026-01-27

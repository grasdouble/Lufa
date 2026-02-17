# Token Architecture Guide

## Overview

This document explains the four-tier token architecture in the Lufa Design System and how to properly use each level.

---

## Token Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                   COMPONENT TOKENS                       │
│  Component-specific tokens (button, card, input, etc.)  │
│              ↓ references ↓                              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                   SEMANTIC TOKENS                        │
│  Context-specific tokens (ui, interactive, typography)  │
│              ↓ references ↓                              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                     CORE TOKENS                          │
│  Global design decisions (brand, text, neutral colors)  │
│              ↓ references ↓                              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│                   PRIMITIVE TOKENS                       │
│  Foundation values (colors, spacing, timing, etc.)      │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Primitive Tokens

**Location:** `packages/design-system/tokens/src/primitives/`

**Characteristics:**

- ✅ **Universal** - Never change across themes or modes
- ✅ **Foundation** - Lowest level of the token hierarchy
- ✅ **Non-themeable** - `themeable: false`
- ✅ **Not mode-aware** - Same value in light/dark/high-contrast

**Examples:**

```json
{
  "primitive": {
    "color": {
      "alpha": {
        "black": {
          "8": {
            "$value": "rgba(0, 0, 0, 0.08)",
            "$type": "color",
            "$description": "8% opacity black - hover state overlay"
          }
        }
      }
    },
    "motion": {
      "duration": {
        "fast": {
          "$value": "150ms",
          "$type": "duration"
        }
      },
      "easing": {
        "ease-out": {
          "$value": "cubic-bezier(0, 0, 0.2, 1)",
          "$type": "cubicBezier"
        }
      }
    }
  }
}
```

**Use Cases:**

- Color palettes (gray-50 through gray-900, blue-500, etc.)
- Alpha channel overlays (black-8, white-12, etc.)
- Spacing scales (4px, 8px, 16px, etc.)
- Typography primitives (font-sizes, line-heights, font-weights)
- Motion primitives (duration, easing functions)
- Breakpoints
- Border radius scales

**When to Add Primitive Tokens:**

- When defining a **new scale** (e.g., new color ramp, new spacing value)
- When creating **reusable foundation values** that never change

---

## 2. Core Tokens

**Location:** `packages/design-system/tokens/src/core/`

**Characteristics:**

- ✅ **Global design decisions** - Brand colors, base typography
- ✅ **References primitives** - Uses `{primitive.*}` references
- ✅ **Themeable** - `themeable: true` (can vary by theme)
- ✅ **Not mode-aware** - Same value across light/dark modes

**Examples:**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$type": "color",
        "$description": "Primary brand color"
      }
    },
    "text": {
      "body": {
        "$value": "{primitive.color.neutral.700}",
        "$type": "color",
        "$description": "Body text color"
      }
    }
  }
}
```

**Use Cases:**

- Brand colors (primary, secondary, accent)
- Base text colors (body, heading, muted)
- Neutral palette (white, black, grays)

**When to Add Core Tokens:**

- When defining **global brand decisions** that apply across the entire design system
- When creating **base colors** that semantic tokens will reference

---

## 3. Semantic Tokens

**Location:** `packages/design-system/tokens/src/semantic/`

**Characteristics:**

- ✅ **Context-specific** - Named by purpose, not by value
- ✅ **References core or primitives** - Uses `{core.*}` or `{primitive.*}` references
- ✅ **Themeable** - `themeable: true` for colors/shadows, `false` for dimensions/numbers
- ⚠️ **Sometimes mode-aware** - Can vary by mode when needed

**Categories:**

### 3.1 UI Tokens (`semantic/ui/`)

General UI patterns applicable across components

```json
{
  "semantic": {
    "ui": {
      "transition-fast": {
        "$value": "{primitive.motion.duration.fast}",
        "$type": "duration",
        "$description": "Fast transition for quick interactions"
      },
      "backdrop-blur-dark": {
        "$value": "blur(8px)",
        "$type": "other",
        "$description": "Dark mode backdrop blur for modals"
      }
    }
  }
}
```

**Use Cases:**

- Transitions and animations
- Shadows and elevation
- Backdrop effects
- Spacing (compact, comfortable, spacious)
- Border radius (small, medium, large)

### 3.2 Interactive Tokens (`semantic/interactive/`)

Interactive element behaviors

```json
{
  "semantic": {
    "interactive": {
      "transform": {
        "scale": {
          "hover": {
            "$value": "1.02",
            "$type": "number",
            "$description": "Scale transformation on hover, adapting per mode",
            "$extensions": {
              "lufa": {
                "modes": {
                  "light": "1.02",
                  "dark": "1.05",
                  "high-contrast": "1.02"
                },
                "modeAware": true
              }
            }
          }
        }
      },
      "opacity": {
        "disabled": {
          "$value": "0.38",
          "$type": "number",
          "$description": "Opacity for disabled elements"
        }
      }
    }
  }
}
```

**Use Cases:**

- Hover transforms (scale, translate)
- Opacity states (disabled, loading, inactive)
- Focus indicators

### 3.3 Typography Tokens (`semantic/typography/`)

Text hierarchy and semantics

```json
{
  "semantic": {
    "typography": {
      "heading-1": {
        "$value": "32px",
        "$type": "dimension"
      }
    }
  }
}
```

**When to Add Semantic Tokens:**

- When defining a **pattern used across multiple components**
- When creating **contextual meaning** (e.g., "disabled-opacity" vs "0.38")
- When a value needs to **vary by theme** but should have semantic meaning

---

## 4. Component Tokens

**Location:** `packages/design-system/tokens/src/component/`

**Characteristics:**

- ✅ **Component-specific** - Only used by one component
- ✅ **References semantics** - Uses `{semantic.*}` references
- ✅ **Themeable** - `themeable: true`
- ✅ **Not mode-aware** - Semantic tokens handle mode variations

**Examples:**

```json
{
  "component": {
    "button": {
      "padding": {
        "md": {
          "$value": "{semantic.ui.spacing-default} {semantic.ui.spacing-comfortable}",
          "$type": "dimension"
        }
      },
      "border-radius": {
        "$value": "{semantic.ui.radius-default}",
        "$type": "dimension"
      }
    }
  }
}
```

**When to Add Component Tokens:**

- When defining **component-specific variants** (button-sm, button-lg)
- When **composing semantic tokens** into component-specific patterns

---

## 6. ETR-003 Clarification

```
START: I need to define a new token

Q1: Does the value NEVER change across themes?
    ├─ YES → Add to PRIMITIVES
    │         Examples: new color in palette, new spacing value
    │
    └─ NO → Continue to Q2

Q2: Is this a global design decision (brand color, base text)?
    ├─ YES → Add to CORE TOKENS
    │         Examples: brand primary color, body text color
    │
    └─ NO → Continue to Q3

Q3: Is this used by only ONE component?
    ├─ YES → Add to COMPONENT TOKENS
    │         Examples: button-specific padding, card-specific radius
    │
    └─ NO → Continue to Q4

Q4: Is this a general UI pattern used across multiple components?
    ├─ YES → Add to SEMANTIC TOKENS
    │         Examples: transition durations, backdrop blur, hover transforms
    │
    └─ NO → Review requirements - may need to refactor
```

---

## 6. ETR-003 Clarification

**What ETR-003 IS:**

- Primitive alpha channel tokens for **black and white only**
- Examples: `--lufa-primitive-color-alpha-black-8`, `--lufa-primitive-color-alpha-white-12`
- Universal, non-themeable overlay values

**What ETR-003 IS NOT:**

- ❌ NOT theme-specific alpha tokens like `--lufa-alpha-primary-XX`
- ❌ NOT colored overlays with theme colors
- ❌ NOT related to brand primary/secondary colors

**Why `--lufa-alpha-primary-XX` was removed:**

- These were **theme-level** tokens (brass for steampunk, cyan for ocean, etc.)
- They do NOT belong in the primitive layer
- If needed for a theme, they should:
  1. Be defined directly in the theme file (not as separate alphas)
  2. Use `rgba()` with the theme's brand color when needed
  3. NOT pretend to be primitive tokens

---

## 7. Migration Examples

### Before (Duplicated Tokens)

```css
[data-theme='ocean'][data-mode='dark'] {
  /* WRONG - duplicates primitives */
  --lufa-transition-duration-fast: 150ms;
  --lufa-transition-duration-normal: 300ms;
  --lufa-transition-duration-slow: 500ms;

  /* WRONG - should use semantic tokens */
  --lufa-effect-backdrop-blur: blur(8px);
  --lufa-effect-scale-hover: 1.05;

  /* WRONG - not part of ETR-003 */
  --lufa-alpha-primary-10: rgba(34, 211, 238, 0.1);
}
```

### After (Clean References)

```css
[data-theme='ocean'][data-mode='dark'] {
  /* RIGHT - use semantic tokens (mode-aware) */
  --lufa-effect-backdrop-blur: var(--lufa-semantic-ui-backdrop-blur);
  --lufa-effect-scale-hover: var(--lufa-semantic-interactive-transform-scale-hover);

  /* RIGHT - theme-specific glow uses literal theme color */
  --lufa-effect-glow: 0 0 8px rgba(34, 211, 238, 0.4);

  /* No need for --lufa-transition-duration-* at all! */
  /* Components reference semantic tokens directly */
}
```

---

## 8. Best Practices

### DO ✅

1. **Use semantic naming**

   ```json
   "transform.scale.hover": 1.02  // ✅ Hierarchical, describes purpose
   ```

2. **Reference lower layers**

   ```json
   "$value": "{primitive.motion.duration.fast}"  // ✅ References primitive
   ```

3. **Keep themes lean**

   ```css
   /* ✅ Only theme-specific values */
   --lufa-core-brand-primary: #22d3ee;
   --lufa-effect-glow: 0 0 8px rgba(34, 211, 238, 0.4);
   ```

4. **Use mode-aware tokens properly**

   ```css
   /* Mode-aware tokens automatically adapt */
   [data-mode='light'] {
     --lufa-semantic-interactive-transform-scale-hover: 1.02; /* subtle */
   }

   [data-mode='dark'] {
     --lufa-semantic-interactive-transform-scale-hover: 1.05; /* pronounced */
   }

   /* Themes just reference the semantic token */
   --lufa-effect-scale-hover: var(--lufa-semantic-interactive-transform-scale-hover);
   ```

### DON'T ❌

1. **Duplicate primitive values in themes**

   ```css
   /* ❌ NEVER do this */
   --lufa-transition-duration-fast: 150ms;
   ```

2. **Use hardcoded values when semantic tokens exist**

   ```css
   /* ❌ WRONG */
   backdrop-filter: blur(8px);

   /* ✅ RIGHT */
   backdrop-filter: var(--lufa-effect-backdrop-blur);
   ```

3. **Create theme-specific alpha tokens pretending to be primitives**

   ```css
   /* ❌ These are NOT primitives! */
   --lufa-alpha-primary-10: rgba(184, 115, 51, 0.1);
   ```

4. **Skip the hierarchy**

   ```json
   // ❌ Component directly referencing primitive
   {
     "component": {
       "button": {
         "transition": "{primitive.motion.duration.fast}"
       }
     }
   }

   // ✅ Component referencing semantic
   {
     "component": {
       "button": {
         "transition": "{semantic.ui.transition-fast}"
       }
     }
   }
   ```

---

## 9. Summary Table

| Token Type    | Location                 | Themeable | Mode-Aware   | References         | Examples                                   |
| ------------- | ------------------------ | --------- | ------------ | ------------------ | ------------------------------------------ |
| **Primitive** | `tokens/src/primitives/` | ❌ No     | ❌ No        | Nothing            | `gray-500`, `spacing-16`, `duration-fast`  |
| **Core**      | `tokens/src/core/`       | ✅ Yes    | ❌ No        | Primitives         | `brand-primary`, `text-body`               |
| **Semantic**  | `tokens/src/semantic/`   | Mixed     | ⚠️ Sometimes | Core or Primitives | `transition-fast`, `transform.scale.hover` |
| **Component** | `tokens/src/component/`  | Mixed     | ❌ No        | Semantics          | `button-padding-md`, `card-radius`         |

---

## 10. Questions & Answers

**Q: When should I add a new primitive token?**  
A: Only when defining a **universal foundation value** that will NEVER change across themes (e.g., new color in palette, new spacing scale value).

**Q: When should I add a new core token?**  
A: When defining **global brand decisions** or **base colors** that apply across the entire design system and may vary by theme.

**Q: Can themes override core and semantic tokens?**  
A: Yes! Core and semantic tokens with `themeable: true` can be overridden by themes to customize the design system for different visual identities.

**Q: What if my component needs a theme-specific color with transparency?**  
A: Use `rgba()` inline with the core brand color, don't create fake primitive alpha tokens:

```css
/* ✅ RIGHT */
background: rgba(var(--lufa-core-brand-primary-rgb), 0.1);

/* ❌ WRONG */
--lufa-alpha-primary-10: rgba(184, 115, 51, 0.1);
```

**Q: Should transition durations be in theme files?**  
A: **No!** They're already defined as primitives and semantics. Components use semantic tokens directly.

**Q: What is the difference between core and semantic tokens?**  
A: Core tokens represent **global design decisions** (brand colors, base typography), while semantic tokens represent **contextual use cases** (UI patterns, interactive behaviors) that may reference core or primitive tokens.

---

## Last Updated

- **Date:** 2026-02-17
- **By:** Token Architecture Review - 4-Layer System Documentation
- **Changes:**
  - Updated documentation to reflect 4-layer architecture (Primitive → Core → Semantic → Component)
  - Removed Theme Tokens section (themes override core/semantic tokens, not a separate layer)
  - Added Core tokens layer explanation
  - Updated decision tree and summary table
  - Clarified when to use each layer

# AI Instructions: Design Tokens

## Context

You are generating or modifying design tokens for the Lufa Design System. These tokens are the source of truth for all design values (colors, spacing, typography, etc.) and are processed by **Style Dictionary**.

> **Schema version:** ADR-013 (simplified metadata). The old ADR-011 schema required `level`, `themeable: false`, `modeAware`, and `modes.light` — **all removed**. See "What Changed" below.

## File Structure & Format

- **Format**: JSON standard (Style Dictionary format).
- **Location**: `packages/design-system/tokens/src/`
- **Organization**:
  - `primitives/`: Raw constants (hex codes, raw pixels). NEVER referenced directly in components.
  - `core/`: Brand identity + mode-aware semantic foundations. The "what changes by dark mode" layer.
  - `semantic/`: Intent-based UI tokens. References `core/` or `primitive/`. Rarely defines its own modes.
  - `component/`: Component-specific tokens. ALWAYS references `semantic/`, never `primitive/`.

### Real file structure

```
tokens/src/
├── primitives/
│   ├── color.json               # All raw color values (grays, blues, purples, hc.*)
│   ├── spacing.json             # Spacing scale (0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96)
│   ├── radius.json              # Border radius scale (none, sm, base, md, lg, xl, 2xl, full)
│   ├── typography-font-sizes.json
│   ├── typography-font-families.json
│   ├── typography-font-weights.json
│   ├── typography-line-heights.json
│   ├── typography-letter-spacing.json
│   ├── shadow.json
│   ├── motion.json
│   ├── opacity.json
│   ├── border-width.json
│   ├── breakpoint.json
│   ├── height.json
│   └── icon-size.json
├── core/
│   ├── color/
│   │   ├── colors-brand.json    # Brand colors (primary, secondary, accent) — with dark/hc modes
│   │   ├── colors-neutral.json  # Neutral colors (background, surface, border, text) — with modes
│   │   └── colors-semantic.json # Semantic status colors (success, error, warning, info) — with modes
│   ├── typography/
│   │   └── body.json, heading.json, button.json, ...  # Typography role tokens
│   └── layout/
│       └── container.json, grid.json, ...             # Layout structural tokens
├── semantic/
│   ├── ui/
│   │   ├── spacing.json         # spacing.tight, .compact, .default, .comfortable, .spacious
│   │   ├── border-radius.json   # border-radius.small, .default, .medium, .large, .full
│   │   ├── shadow.json
│   │   ├── height.json
│   │   └── ...
│   ├── interactive/
│   │   ├── background.json      # Backgrounds for states (hover, active, disabled)
│   │   ├── border.json
│   │   ├── text.json
│   │   └── ...
│   ├── typography/
│   ├── elevation/
│   ├── variant/
│   ├── effect/
│   └── layout/
└── component/
    ├── button.json
    ├── card.json
    ├── input.json
    ├── badge.json
    ├── modal.json
    └── ...
```

---

## Token Schemas by Layer

### Layer 1 — Primitives (Immutable Constants)

Primitives are raw constants. They **never change** by mode or theme. No `modes` object allowed.

**Required fields:** `$value`, `$type`, `$description`
**Optional `$extensions.lufa`:** `category`, `useCase`
**Forbidden fields:** `level`, `themeable`, `modeAware`, `modes`

```json
// tokens/src/primitives/color.json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$type": "color",
          "$description": "Base blue - main brand actions",
          "$extensions": {
            "lufa": {
              "category": "color"
            }
          }
        }
      }
    }
  }
}
```

```json
// tokens/src/primitives/spacing.json
{
  "primitive": {
    "spacing": {
      "16": {
        "$value": "16px",
        "$type": "dimension",
        "$description": "Base spacing - standard component gaps",
        "$extensions": {
          "lufa": {
            "category": "spacing",
            "useCase": "section margins, component spacing"
          }
        }
      }
    }
  }
}
```

> Level is **inferred from the path** (`primitive.*` → primitive). No explicit `level` needed.

---

### Layer 2 — Core (Mode-Aware Semantic Foundations)

Core tokens are the bridge between raw primitives and UI semantics. They define **how values change between light mode, dark mode, and high-contrast mode**.

**Purpose:** Brand identity, neutral surfaces, semantic status colors, typography roles.
**References:** Only `primitive.*` tokens.
**Mode convention:** `$value` = light mode (implicit). Only `dark` and `high-contrast` are listed in `modes`.

**Required fields:** `$value` (light mode), `$type`, `$description`
**Optional `$extensions.lufa`:** `category`, `role`, `useCase`, `a11y`, `modes`, `themeable`
**Forbidden fields:** `level`, `modeAware`, `modes.light`

```json
// tokens/src/core/color/colors-brand.json
{
  "core": {
    "brand": {
      "primary": {
        "default": {
          "$value": "{primitive.color.blue.600}",
          "$type": "color",
          "$description": "Primary brand color for main actions, links, and focus states.",
          "$extensions": {
            "lufa": {
              "category": "brand",
              "role": "action",
              "useCase": "Primary buttons, links, focus indicators, active navigation items",
              "modes": {
                "dark": "{primitive.color.blue.400}",
                "high-contrast": "{primitive.color.hc.blue}"
              },
              "themeable": true
            }
          }
        }
      }
    }
  }
}
```

> **Implicit light convention:** `$value` is the light mode value. `modes.light` does NOT exist — it would be a duplicate. Only `dark` and `high-contrast` go in `modes`.

Core tokens that are **not color-based** (e.g. typography, layout) typically have **no `modes` object** since font sizes and spacing don't change by mode:

```json
// tokens/src/core/typography/body.json
{
  "core": {
    "typography": {
      "body": {
        "font-size": {
          "default": {
            "$value": "{primitive.typography.font-size.base}",
            "$type": "dimension",
            "$description": "Default body text size (16px)",
            "$extensions": {
              "lufa": {
                "category": "typography",
                "useCase": "Body text, paragraphs, default UI text",
                "themeable": true
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

### Layer 3 — Semantic (Intent-Based UI Tokens)

Semantic tokens map design intent to core values. They use **intent-based names** like `spacing.default`, `border-radius.small`, `interactive.background.hover`.

**References:** `core.*` tokens (preferred) or `primitive.*` (for structural, non-color values like spacing and radius).
**Modes:** Rarely defined directly — they inherit mode-awareness automatically via CSS variable references to `core.*` tokens.

**Required fields:** `$value`, `$type`, `$description`
**Optional `$extensions.lufa`:** `category`, `subcategory`, `useCase`, `themeable`
**Forbidden fields:** `level`, `modeAware`

```json
// tokens/src/semantic/ui/spacing.json
{
  "semantic": {
    "ui": {
      "spacing": {
        "default": {
          "$value": "{primitive.spacing.16}",
          "$type": "dimension",
          "$description": "Default spacing for standard layouts (most common)",
          "$extensions": {
            "lufa": {
              "category": "ui",
              "subcategory": "spacing",
              "useCase": "Standard button padding, card padding, form field spacing",
              "themeable": true
            }
          }
        }
      }
    }
  }
}
```

```json
// tokens/src/semantic/interactive/background.json
{
  "semantic": {
    "interactive": {
      "background": {
        "hover": {
          "$value": "{core.color.neutral.surface.hover}",
          "$type": "color",
          "$description": "Background color when hovering over interactive elements",
          "$extensions": {
            "lufa": {
              "category": "interactive",
              "useCase": "Hover state for buttons, inputs, cards, list items",
              "themeable": true
            }
          }
        }
      }
    }
  }
}
```

When a semantic token needs **explicit mode overrides** (different from the referenced core value):

```json
{
  "semantic": {
    "button": {
      "ghost": {
        "background": {
          "$value": "transparent",
          "$type": "color",
          "$description": "Ghost button background - transparent in light mode",
          "$extensions": {
            "lufa": {
              "category": "button",
              "useCase": "Ghost/outline button backgrounds",
              "modes": {
                "dark": "{core.color.neutral.surface.subtle}",
                "high-contrast": "{core.color.neutral.border.strong}"
              },
              "themeable": true
            }
          }
        }
      }
    }
  }
}
```

---

### Layer 4 — Component (Component-Specific Tokens)

Component tokens are scoped to a specific UI component. They provide fine-grained control for individual components.

**References:** ALWAYS `semantic.*` tokens. NEVER `primitive.*` or `core.*` directly.
**Modes:** Never defined here — always inherited via semantic/core references.

**Required fields:** `$value` (reference to `semantic.*`), `$type`, `$description`
**Optional `$extensions.lufa`:** `category`, `useCase`, `themeable`
**Forbidden fields:** `level`, `modeAware`, `modes`

```json
// tokens/src/component/button.json
{
  "component": {
    "button": {
      "padding": {
        "md": {
          "$value": "{semantic.ui.spacing.default} {semantic.ui.spacing.comfortable}",
          "$type": "dimension",
          "$description": "Medium button padding (default size)",
          "$extensions": {
            "lufa": {
              "category": "button",
              "useCase": "Standard buttons, primary actions",
              "themeable": true
            }
          }
        }
      },
      "border-radius": {
        "md": {
          "$value": "{semantic.ui.border-radius.default}",
          "$type": "dimension",
          "$description": "Default button border radius",
          "$extensions": {
            "lufa": {
              "category": "button",
              "useCase": "Standard rounded button corners",
              "themeable": true
            }
          }
        }
      }
    }
  }
}
```

---

## Key Rules

### 1. Naming Conventions

- Use **kebab-case** for all keys.
- **Primitives**: Scale-based or abstract names (`blue-600`, `spacing.16`, `radius.scale.lg`).
- **Core**: Role-based names (`brand.primary.default`, `neutral.surface.hover`, `neutral.text.primary`).
- **Semantic**: Intent-based names (`ui.spacing.default`, `interactive.background.hover`).
- **Component**: Component-scoped names (`button.padding.md`, `card.border-radius.md`).

### 2. Value Referencing (strict hierarchy)

```
primitive → core → semantic → component
```

- **NEVER** hardcode hex/px in `core`, `semantic`, or `component` tokens (except `transparent` and rare exceptions).
- **NEVER** reference `primitive.*` directly in `component` tokens.
- **NEVER** reference `core.*` directly in `component` tokens — use `semantic.*` as the intermediary.

### 3. Mode-Awareness Convention

- `$value` is **always the light mode value** (implicit light convention).
- Only `dark` and `high-contrast` are listed in `modes`.
- **Do not add `modes.light`** — it would duplicate `$value`.
- If a token does NOT have a `modes` object → it's the same in all modes.
- Mode-awareness is inferred from the presence of `modes`, not from a flag.

### 4. Metadata ($extensions.lufa)

| Field         | Where                   | Notes                                                           |
| ------------- | ----------------------- | --------------------------------------------------------------- |
| `category`    | All layers              | Grouping label (e.g. `"color"`, `"button"`, `"spacing"`)        |
| `useCase`     | Optional                | Human-readable description of when to use this token            |
| `role`        | Core only               | Semantic role (e.g. `"action"`, `"content"`, `"text-on-brand"`) |
| `subcategory` | Semantic only           | Optional sub-grouping (e.g. `"spacing"`, `"radius"`)            |
| `a11y`        | Core/Semantic           | Accessibility note (contrast requirements, WCAG level)          |
| `modes`       | Core/Semantic           | Only `dark` and `high-contrast` keys. Never `light`.            |
| `themeable`   | Core/Semantic/Component | `true` if value can change with a brand theme (Phase 6)         |

**Deprecated / forbidden fields (from old ADR-011 schema):**

- ❌ `level` — inferred from path, never write it
- ❌ `modeAware` — inferred from `modes` presence, never write it
- ❌ `modes.light` — duplicate of `$value`, never write it
- ❌ `themable` (typo) — use `themeable` if needed

### 5. Composite Tokens

For composite values (like padding shorthand), use space-separated references:

```json
"$value": "{semantic.ui.spacing.compact} {semantic.ui.spacing.default}"
```

---

## What Changed vs. Old ADR-011 Schema

The old documentation described a verbose schema. ADR-013 simplified it:

| Old (ADR-011)                                | New (ADR-013)                | Reason                                        |
| -------------------------------------------- | ---------------------------- | --------------------------------------------- |
| `"level": "primitive"`                       | ❌ Removed                   | Inferred from path (`primitive.*`)            |
| `"themeable": false` on primitives           | ❌ Removed                   | Primitives are always immutable by convention |
| `"modeAware": true`                          | ❌ Removed                   | Inferred from `modes` presence                |
| `"modes": { "light": "...", "dark": "..." }` | `"modes": { "dark": "..." }` | `light` = `$value` (implicit)                 |
| File `primitives/palette.json`               | `primitives/color.json`      | Real file name                                |
| File `primitives/scale.json`                 | `primitives/spacing.json`    | Real file name                                |

---

## Checklist for Validation

Before saving a token file, verify:

- [ ] Is `$value` a `{reference}` for `core/`, `semantic/`, and `component/` tokens?
- [ ] Is `$type` correctly set per the W3C Design Tokens format?
- [ ] Is `$description` clear and useful?
- [ ] Does the token reference the correct layer? (`component` → `semantic`, `semantic` → `core` or `primitive`, `core` → `primitive`)
- [ ] If there's a `modes` object, does it only contain `dark` and/or `high-contrast` (never `light`)?
- [ ] Are deprecated fields absent? (`level`, `modeAware`, `themable`, `modes.light`)
- [ ] For color tokens in `core/`, is `themeable: true` present?

# ADR-004 Alpha Tokens Usage Guide

**Audience:** Designers and engineers working with Lufa tokens
**Scope:** How to choose and apply alpha tokens (semantic and primitive)

---

## Overview

ADR-004 defines a dual approach for opacity values:

- **Semantic alpha tokens** express intent (overlay, scrim, disabled). Use these by default in components.
- **Primitive alpha palette** provides exact RGBA values for advanced use cases.

---

## Token Families

### Semantic Alpha Tokens (Preferred)

- `semantic.ui.overlay-backdrop`
- `semantic.ui.overlay-hover`
- `semantic.ui.overlay-pressed`
- `semantic.ui.overlay-selected`
- `semantic.ui.scrim`
- `semantic.interactive.disabled-opacity`
- `semantic.interactive.loading-opacity`
- `semantic.interactive.placeholder-opacity`

These tokens are mode-aware when relevant and align with ADR-001.

### Primitive Alpha Palette (Advanced)

Available opacities:

- **Black:** 4, 5, 8, 12, 15, 16, 38, 50, 60, 80, 90, 100
- **White:** 4, 5, 8, 12, 15, 16, 38, 50, 60, 80, 90, 100

Examples:

- `{primitive.color.alpha.black.5}`
- `{primitive.color.alpha.white.12}`

---

## When to Use What

### Use Semantic Tokens When

- You need an overlay, scrim, or pressed/hover/selected state
- You are defining component tokens
- You want mode-aware values (light/dark/high-contrast)

### Use Primitive Tokens When

- You need a specific opacity for shadows or rare effects
- There is no semantic token matching your use case
- You are authoring lower-level primitives or utilities

---

## Examples

### Modal Backdrop (Semantic)

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

### Button Disabled Opacity (Semantic)

```json
{
  "component": {
    "button": {
      "disabled": {
        "opacity": {
          "$value": "{semantic.interactive.disabled-opacity}"
        }
      }
    }
  }
}
```

### Shadow Layer (Primitive)

```json
{
  "primitive": {
    "shadow": {
      "elevation": {
        "sm": {
          "$value": {
            "offsetX": "0px",
            "offsetY": "1px",
            "blur": "2px",
            "spread": "0px",
            "color": "{primitive.color.alpha.black.5}"
          }
        }
      }
    }
  }
}
```

---

## Notes and Guardrails

- Prefer exact opacity matches from the palette.
- Avoid introducing new alpha values without updating ADR-004.
- If no exact match exists, keep the literal value temporarily and document it for follow-up.

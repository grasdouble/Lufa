# ADR-014: Semantic-to-Primitive Direct Reference Exception for Non-Color Scales

**Status:** Implemented
**Date:** 2026-03-01
**Deciders:** Architecture Team
**Context:** Token Hierarchy Clarification - Addressing ~55 semantic-to-primitive violations

---

## Context

The Lufa Design System's four-level token architecture (ADR-011) establishes a strict hierarchy:

```
Primitive  →  Core  →  Semantic  →  Component
```

Under this model, semantic tokens should reference core tokens, which in turn reference primitives. Color tokens follow this pattern faithfully: primitives define raw palette values (`#2563eb`), core tokens assign brand/theme meaning (`core.color.brand.primary`), and semantic tokens express intent (`semantic.text.primary`). The core layer is essential for colors because it carries real semantic weight — mapping palette values to brand roles that vary by mode and theme.

However, an audit of the token system revealed **~55 semantic tokens that reference primitive tokens directly**, bypassing the core layer entirely. These violations occur exclusively in **non-color categories**:

- **Spacing** (e.g., `semantic.spacing.component.padding` → `primitive.spacing.4`)
- **Border radius** (e.g., `semantic.radius.interactive` → `primitive.radius.md`)
- **Border width** (e.g., `semantic.border.width.default` → `primitive.border.width.1`)
- **Height** (e.g., `semantic.height.input.md` → `primitive.height.10`)
- **Shadow** (e.g., `semantic.shadow.card` → `primitive.shadow.elevation.sm`)
- **Motion** — duration and easing (e.g., `semantic.motion.duration.fast` → `primitive.motion.duration.150`)
- **Breakpoints** (e.g., `semantic.breakpoint.md` → `primitive.breakpoint.md`)
- **Opacity** (e.g., `semantic.opacity.disabled` → `primitive.opacity.38`)
- **Icon size** (e.g., `semantic.icon.size.md` → `primitive.icon.size.md`)

### Why Core Intermediaries Provide No Value Here

For color tokens, the core layer carries meaningful abstraction:

```
primitive.color.blue.600  →  core.color.brand.primary  →  semantic.text.link
```

`core.color.brand.primary` has genuine semantic meaning — it maps a raw color to a brand role and varies by mode (light/dark/high-contrast). The indirection is justified.

For non-color scales, a hypothetical core layer would be **pure pass-through** with no added semantics:

```
primitive.spacing.4  →  core.spacing.4  →  semantic.spacing.component.padding
                         ↑
                    Adds nothing — same value, same name, no mode variance
```

These non-color primitives:

1. **Do not vary by mode or theme** — `4px` of spacing is `4px` regardless of light/dark mode
2. **Have no brand-specific meaning** — there is no concept of "brand spacing" or "brand radius"
3. **Are already a complete, coherent scale** — the primitive values are the canonical scale
4. **Would create pure noise** — a core layer would duplicate every single primitive token 1:1

Creating ~100+ core intermediary tokens that simply mirror primitives would increase maintenance burden, bloat the token count, and add indirection without any architectural benefit.

### Related Fix: Shadow Primitive Self-References

During this audit, we also discovered that shadow primitives (`shadow.elevation.sm`, `.lg`, `.xl`) were referencing other primitives (`primitive.color.alpha.black.*`) within the same layer. This violates ADR-011's principle that **primitives must contain raw, immutable values**. These references were resolved by inlining the raw `rgba()` values directly, making all shadow primitives self-contained.

---

## Decision

We establish a formal exception to ADR-011's strict hierarchical requirement:

### Non-color primitive scales MAY be referenced directly by semantic tokens

Semantic tokens are permitted to reference the following primitive categories directly, without a core intermediary layer:

| Category          | Example Reference                    |
| ----------------- | ------------------------------------ |
| Spacing           | `{primitive.spacing.4}`              |
| Border radius     | `{primitive.radius.md}`              |
| Border width      | `{primitive.border.width.1}`         |
| Height            | `{primitive.height.10}`              |
| Shadow            | `{primitive.shadow.elevation.sm}`    |
| Motion (duration) | `{primitive.motion.duration.150}`    |
| Motion (easing)   | `{primitive.motion.easing.ease-out}` |
| Breakpoints       | `{primitive.breakpoint.md}`          |
| Opacity           | `{primitive.opacity.38}`             |
| Icon size         | `{primitive.icon.size.md}`           |

### Color tokens MUST still follow the full hierarchy

All color references must pass through core:

```
primitive.color.*  →  core.*  →  semantic.*  →  component.*
```

This rule has no exceptions. Color tokens carry brand, mode, and theme semantics that require the core abstraction layer.

### Primitives MUST NOT reference other primitives

Primitive tokens must contain only raw, literal values. No `{primitive.*}` references are permitted within primitive files. This was enforced by resolving the shadow primitive self-references as part of this decision.

---

## Consequences

### Positive

1. **Eliminates ~100+ unnecessary tokens** — No need to create pass-through core tokens for every spacing, radius, border-width, height, shadow, motion, breakpoint, opacity, and icon-size primitive
2. **Simplifies maintenance** — Fewer tokens to keep in sync, fewer files to update when scales change
3. **Clearer developer experience** — Developers don't have to navigate through a meaningless core layer for non-color values
4. **Preserves architectural integrity where it matters** — Color tokens still enforce the full hierarchy, which is where mode/theme variance actually occurs
5. **Shadow primitives are now self-contained** — No inter-primitive references that could break resolution order

### Negative

1. **Explicit exception to ADR-011** — The four-level hierarchy is no longer universally enforced; developers must understand which categories follow the full chain and which don't
2. **Validation complexity** — Automated validators must be aware of this exception and treat color vs. non-color references differently
3. **Future risk** — If a non-color category later needs mode-aware variance (e.g., spacing that differs by mode), a core intermediary layer would need to be introduced retroactively

### Neutral

1. **No visual or behavioral changes** — Token output values remain identical
2. **No impact on CSS generation** — The build pipeline resolves references regardless of how many layers are traversed
3. **Consistent with industry practice** — Most design systems (Material Design 3, Chakra UI, Radix) do not enforce intermediary layers for non-color scales

---

## Validation Criteria

- All shadow primitives use raw `rgba()` values (no `{primitive.*}` references)
- No new core token files created for non-color categories
- Existing semantic → primitive references for non-color categories remain valid
- Color tokens continue to reference core, never primitives directly
- Token build completes without resolution errors

---

## Related Decisions

- **ADR-011:** Token Architecture - Primitives as Immutable Constants
  - This ADR creates a scoped exception to ADR-011's hierarchy rule for non-color categories
- **ADR-001:** Modes vs Themes Separation
  - Supports this exception: non-color primitives do not participate in mode/theme switching
- **ADR-013:** Token Metadata Simplification
  - Metadata does not need `modeAware` flags on non-color primitives since they are inherently mode-independent

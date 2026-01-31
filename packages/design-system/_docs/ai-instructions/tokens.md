# AI Instructions: Design Tokens

## Context

You are generating or modifying design tokens for the Lufa Design System. These tokens are the source of truth for all design values (colors, spacing, typography, etc.) and are processed by **Style Dictionary**.

## File Structure & Format

- **Format**: JSON standard (Style Dictionary format).
- **Location**: `packages/design-system/tokens/src/`
- **Organization**:
  - `primitives/`: Core values (hex codes, raw pixels). NEVER used directly in components.
  - `semantic/`: Contextual values (text-primary, bg-surface). References primitives.
  - `component/`: Component-specific overrides. References semantic tokens.

## Rules for Token Definition

### 1. Structure Object

Every token MUST strictly follow this schema:

```json
"token-name": {
  "$value": "{reference.path}",
  "$type": "dimension" | "color" | "number" | "duration" | "cubicBezier" | "other",
  "$description": "Clear explanation of what this token controls",
  "$extensions": {
    "lufa": {
      "level": "primitive" | "semantic" | "component",
      "category": "string",
      "useCase": "string",
      "themeable": boolean,
      "modeAware": boolean
    }
  }
}
```

### 2. Naming Conventions

- Use **kebab-case** for all keys.
- **Primitives**: Abstract names (blue-500, spacing-100).
- **Semantic**: Intent-based names (primary-action, surface-default).
- **Component**: Component-scoped names (button-bg-hover, card-padding).

### 3. Value Referencing

- **NEVER** hardcode values (hex, px) in Semantic or Component tokens.
- **ALWAYS** use references: `"$value": "{semantic.color.primary}"`.
- **Component Tokens** must reference **Semantic Tokens**, not Primitives.

### 4. Required Metadata ($extensions.lufa)

You must include the `$extensions` object with the `lufa` namespace for every token.

- `level`: The architectural layer of the token.
- `category`: Grouping (e.g., 'button', 'typography', 'spacing').
- `useCase`: A human-readable description of when to use this token.
- `themeable`: `true` if this token changes between themes (e.g., brand themes).
- `modeAware`: `true` if this token changes between light/dark modes.

### 5. Composite Tokens

For composite values (like padding), use space-separated references:
`"$value": "{semantic.ui.spacing-compact} {semantic.ui.spacing-default}"`

## Checklist for Validation

Before saving a token file, verify:

- [ ] Is the `$value` a reference ({} notation) for non-primitive tokens?
- [ ] Is `$type` correctly defined according to W3C Design Tokens format?
- [ ] Is the `$description` clear and useful?
- [ ] Are all fields in `$extensions.lufa` populated?
- [ ] Does the hierarchy flow strictly Primitive -> Semantic -> Component?

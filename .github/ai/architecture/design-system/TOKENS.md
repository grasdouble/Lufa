# Tokens

Package: `@grasdouble/lufa_design-system-tokens`
Location: packages/design-system/tokens/
Updated: 2025-12-13
Version: 0.2.0

## Stats

- ~2100 lines TypeScript
- 9 token categories (color, border, space, typography, layout, motion, effects, elevation, icon)
- Dual export: JS + CSS
- Dependencies: 1 runtime (`@grasdouble/lufa_design-system-primitives`)

## Structure

```
packages/design-system/tokens/
├── src/
│   ├── tokens/
│   │   ├── color/          text, background, border, interactive, status
│   │   ├── border/         radius, width, style
│   │   ├── space/          semantic spacing (xs, sm, md, lg, xl)
│   │   ├── typography/     fontSize, fontWeight, lineHeight, letterSpacing
│   │   ├── layout/         dimension, breakpoint, container, grid, aspectRatio
│   │   ├── motion/         easing, duration, transition, focus
│   │   ├── effects/        shadows, blur
│   │   ├── elevation/      z-index layers
│   │   └── icon/           sizes
│   └── index.ts            re-exports all tokens
├── scripts/
│   └── generate-css.js     TS→CSS conversion
└── package.json
```

## Tech Stack

| Layer    | Technology | Purpose                |
| -------- | ---------- | ---------------------- |
| Language | TypeScript | Type safety + exports  |
| Build    | tsc        | JS compilation         |
| CSS Gen  | Node.js    | CSS custom properties  |
| Format   | ESM        | Modern module standard |

## Key Concepts

**Semantic Abstraction**: Primitives define values (blue-500), tokens define purpose (interactive-primary)

```ts
// Primitive
color.chromatic.blue[500]; // raw blue

// Token
color.interactive.primary; // button color (references primitive)
```

**Dual Export**: Same token in JS and CSS

```ts
export const color = { text: { primary: primitiveColor.neutral[900] } };
```

```css
:root {
  --lufa-token-color-text-primary: var(--lufa-primitive-color-neutral-900);
}
```

## Config

**tsconfig.json**: `composite: true`, `declaration: true`, ESM output

**package.json**:

```json
"exports": {
  ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
  "./style.css": "./dist/style.css"
}
```

## Build

**Dev**: N/A (tokens are static, no dev server)

**Prod**:

```bash
pnpm build
```

Steps: Clean dist → tsc (TS→JS) → generate-css.js (JS→CSS)
Output: dist/index.js, dist/index.d.ts, dist/style.css
Format: ESM, TypeScript declarations, CSS variables

## Dependencies

**Runtime**: `@grasdouble/lufa_design-system-primitives`
**Dev**: `typescript`, `@grasdouble/lufa_config_tsconfig`

Purpose:

- primitives: Source for all token values (color, spacing, typography, etc.)

## Integration

**In TypeScript/React**:

```ts
import { color, space } from '@grasdouble/lufa_design-system-tokens';

const style = { color: color.text.primary, padding: space.md };
```

Flow: Import token → Use in JS object → Apply to component

**In Tailwind**:

```js
// tailwind.config.js
colors: { 'text-primary': 'var(--lufa-token-color-text-primary)' }
```

```tsx
<div className="text-text-primary" />
```

Flow: Map token to utility → Use className → CSS variable resolved

**In CSS**:

```css
@import '@grasdouble/lufa_design-system-tokens/style.css';
.button {
  color: var(--lufa-token-color-interactive-primary);
}
```

Flow: Import CSS → Reference variable → Resolved to primitive value

## Workflows

**Add Token**:

1. Edit `src/tokens/{category}/{file}.ts` - Add JS export
2. Run `pnpm build` - Regenerate CSS
3. Verify `dist/style.css` - CSS variable exists
4. Update types if needed - Interface modification

**Change Mapping**:

1. Edit token file - Change primitive reference
2. Build - Regenerate outputs
3. No component changes needed - Semantic abstraction benefit

## Decisions

- **Dual JS+CSS export**: JS for type safety/React | CSS for framework-agnostic | Trade-off: Build complexity
- **Semantic naming**: `primary` not `blue` | Why: Theme changes without component edits | Trade-off: Abstraction layer to learn
- **Single primitives dependency**: All values from one source | Why: Consistency guarantee | Trade-off: Tight coupling
- **9 token categories**: Comprehensive coverage | Why: All design aspects tokenized | Trade-off: Large API surface

## Debug

| Issue                  | Fix                                                      |
| ---------------------- | -------------------------------------------------------- |
| Token undefined in CSS | Run `pnpm build`, check `generate-css.js` includes token |
| Type error on import   | Check `dist/index.d.ts` exists, rebuild if missing       |
| Token value incorrect  | Verify primitive import, check mapping in source file    |
| CSS not loading        | Import `@.../tokens/style.css` before use                |

## Links

- [Development Rules](../../rules/design-system/TOKENS.md)
- [Primitives](./PRIMITIVES.md)
- [Design System](./DESIGN_SYSTEM.md)

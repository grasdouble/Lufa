---
'@grasdouble/lufa_design-system-tokens': major
'@grasdouble/lufa_design-system-storybook': minor
'@grasdouble/lufa_design-system-docusaurus': minor
---

**BREAKING CHANGE: Remove JS/TS token exports, add metadata JSON**

The tokens package no longer exports JS/TS modules (`tokens.js`, `tokens.d.ts`). Now exports CSS and 2 JSON files (values + metadata).

**What changed:**
- Removed JS/TS token exports (tokens.js, tokens.d.ts)
- Now exports 3 files (CSS + 2 JSON): `tokens.css`, `tokens-values.json`, `tokens-metadata.json`
- Simplified Style Dictionary config (CSS + JSON only)
- Added custom format `json/nested-with-metadata` to preserve descriptions, type info, and WCAG data

**Output files:**
- `tokens.css` (51KB) - CSS custom properties for components
- `tokens-values.json` (19KB) - Simple values for Storybook/code usage
- `tokens-metadata.json` (170KB) - Full metadata for documentation (descriptions, WCAG ratios, extensions)

**Migration:**

For Storybook/code usage:
```typescript
// Before
import { LufaPrimitiveColorBlue500 } from '@grasdouble/lufa_design-system-tokens';

// After
import tokens from '@grasdouble/lufa_design-system-tokens/values';
const blue500 = tokens.primitive.color.blue['500']; // "#2563eb"
```

For documentation tools (design token viewers):
```typescript
// Access full metadata
import tokens from '@grasdouble/lufa_design-system-tokens/metadata';
const blue600 = tokens.primitive.color.blue['600'];
// {
//   value: "#2563eb",
//   type: "color",
//   description: "Primary blue...",
//   extensions: { lufa: { wcagAALarge: [...] } }
// }
```

For React components: **No change needed** - components should already be using CSS Modules with CSS custom properties (`var(--lufa-primitive-color-blue-500)`).

**Benefits:**
- Enforces architectural best practices (CSS Modules only)
- Metadata preserved for documentation purposes
- Simple values for code usage (no `.value` property needed)
- Impossible to misuse tokens in components
- JS exports were already deprecated (see previous commits)

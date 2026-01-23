---
'@grasdouble/lufa_design-system-tokens': major
'@grasdouble/lufa_design-system-storybook': minor
'@grasdouble/lufa_design-system-docusaurus': minor
---

**BREAKING CHANGE: Remove JS/TS token exports**

The tokens package no longer exports JS/TS modules (`tokens.js`, `tokens.d.ts`). Only CSS and JSON outputs are now provided.

**What changed:**
- Removed JS/TS token exports (tokens.js, tokens.d.ts)
- Simplified Style Dictionary config (CSS + JSON only)
- Package size reduced by 60% (from 5 files to 2 files)
- Main entry point is now `tokens-docs.json` (for documentation purposes)

**Migration:**

For Storybook/documentation usage:
```typescript
// Before
import { LufaPrimitiveColorBlue500 } from '@grasdouble/lufa_design-system-tokens';

// After
import tokens from '@grasdouble/lufa_design-system-tokens/dist/tokens-docs.json';
const blue500 = tokens.primitive.color.blue['500'];
```

For React components: **No change needed** - components should already be using CSS Modules with CSS custom properties (`var(--lufa-primitive-color-blue-500)`).

**Rationale:**
- Enforces architectural best practices (CSS Modules only)
- JS exports were already deprecated (see previous changeset)
- Simpler build configuration
- Impossible to misuse tokens in components

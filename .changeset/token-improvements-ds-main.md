---
'@grasdouble/lufa_design-system': minor
---

Add Label and Input utility configs, update Button and Badge tokens, improve component styling

**New components:**

- **Label** - New `label.utilities.config.cjs` and `Label.module.css` with token-based styling
- **Input** - New `input.utilities.config.cjs` with block/inline padding token support

**Updated components:**

- **Button** - Restructured CSS and utilities config to use new `type-solid`/`type-ghost`/`type-outline` token naming convention; added full variant coverage (primary, secondary, destructive, success, warning, info, neutral) with explicit `active` states
- **Badge** - Updated to use new `compact/default/large` padding tokens with block/inline axis
- **Box** - Minor CSS updates following token renaming
- **Center, Container, Flex, Grid** - CSS updated to use new token references

---
'@grasdouble/lufa_design-system-tokens': minor
---

Improve token architecture with new semantic layers and granular component tokens

**New token categories:**

- **Alpha colors** (`core/color/colors-alpha`) - 10 new black/white transparency levels (`--lufa-core-color-alpha-black-{4,8,16,38,50,60,80,90}`, `--lufa-core-color-alpha-white-{8,16}`)
- **Feedback colors** (`core/color/colors-feedback`) - Dedicated feedback palette replacing `colors-semantic`: success, error, warning, info with `default`, `subtle`, `border`, `hover`, `active`, `on-background` variants
- **Interactive action tokens** (`semantic/interactive/action`) - 28 new tokens for primary, secondary, destructive, success, warning, info, neutral action states (`default`, `hover`, `active`, `on`)
- **Icon size tokens** (`semantic/ui/icon-size`) - 5 standardized sizes: `xs`, `sm`, `md`, `lg`, `xl`
- **Divider tokens** (`semantic/ui/divider`) - `dash-size` and `dash-gap` tokens
- **Background surface tokens** (`semantic/ui/background`) - `pattern`, `surface-default`, `surface-raised`, `surface-active`
- **Spacing snug** (`semantic/ui/spacing`) - New `snug` spacing level
- **Layout primitives** (`primitives/layout`) - `sidebar-width` and `content-max-width` tokens

**Component token improvements:**

- **Button** - Restructured tokens with explicit `type-solid`, `type-ghost`, `type-outline` prefixes and full variant coverage (primary, secondary, destructive, success, warning, info, neutral) with `active` states
- **Badge** - Renamed padding tokens to `compact/default/large` with `block`/`inline` axis split
- **Input** - Padding tokens split into `block`/`inline` axis per size
- **Tooltip** - Padding split into `block`/`inline` axis
- **New merge script** (`scripts/merge-tokens.mjs`) - Utility to merge all DTCG source files into a single JSON for tooling

**Token validator improvements:**

- Extended `token-consistency.js` with additional validation rules from ADR-013 and ADR-014

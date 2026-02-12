# Architecture Decisions - Lufa Design System

**Version:** 2.0.0  
**Reference:** Brainstorming Session 2026-01-22  
**Status:** Current Decisions (as of 2026-01-25)

---

## Purpose

This document contains all current architectural decisions for the Lufa Design System. It serves as the **single source of truth** for the design system's architecture.

For decision changes and historical context, see `brainstorming/architecture-updates-*.md`.

---

## Decision #1: Structure Hybride (3+1 levels)

**Status:** ✅ Adopted

### Structure

```
Primitives → Core Tokens → Semantic Tokens → [Component Tokens] → Components
```

### Token Hierarchy

1. **Primitives** (Level 1)
   - Raw values: colors, spacing, typography, motion
   - No references to other tokens
   - Examples: `primitive.color.blue.600`, `primitive.spacing.4`

2. **Core Tokens** (Level 2)
   - Foundation: brand, neutral, semantic base
   - References primitives only
   - Examples: `core.brand.primary`, `core.neutral.background`

3. **Semantic Tokens** (Level 3)
   - UI-level meanings: backgrounds, text, borders, actions
   - References core tokens
   - Examples: `semantic.ui.background.page`, `semantic.ui.action.primary`

4. **Component Tokens** (Level 4) - Optional
   - Component-specific overrides
   - Activated only when needed
   - Examples: `component.button.background`, `component.modal.shadow`

### Implementation

```
packages/design-system/tokens/src/
├── primitives/
│   ├── color/
│   ├── spacing/
│   ├── typography/
│   ├── radius/
│   ├── shadow/
│   └── motion/
├── core/
│   ├── brand/
│   ├── neutral/
│   └── semantic/
├── semantic/
│   └── ui/
└── component/
    ├── button/
    ├── badge/
    └── ...
```

---

## Decision #2: Convention de Nommage DTCG

**Status:** ✅ Adopted

### Format Standards

**JSON (DTCG Spec):**

```json
{
  "token": {
    "$value": "#3b82f6",
    "$type": "color",
    "$description": "Primary brand color",
    "$extensions": {
      "lufa": {
        "level": "primitive",
        "category": "color"
      }
    }
  }
}
```

**TypeScript (Dot Notation):**

```typescript
// ❌ CANCELLED - See Decision Change #1
```

**CSS (Kebab-case with Prefix):**

```css
--lufa-primitive-color-blue-600: #3b82f6;
--lufa-core-brand-primary: var(--lufa-primitive-color-blue-600);
```

### Naming Rules

1. **Prefix:** Always `lufa-`
2. **Level:** `primitive`, `core`, `semantic`, `component`
3. **Category:** `color`, `spacing`, `typography`, etc.
4. **Name:** Descriptive, kebab-case
5. **Variant:** Optional suffix (hover, active, disabled)

---

## Decision #3: Style Dictionary (Distribution)

**Status:** ✅ Adopted (with modifications - see Decision Change #1)

### Build Process

**Tool:** Style Dictionary 4.x

**Inputs:**

- JSON token files (DTCG format)

**Outputs:**

1. ✅ **CSS Custom Properties** (`tokens.css`)
2. ✅ **JSON Metadata** (`tokens-metadata.json`)
3. ✅ **JSON Values** (`tokens-values.json`)
4. ❌ **TypeScript** (cancelled - see Decision Change #1)

### CSS Output Format

```css
/* Multi-mode support */
:root,
[data-mode='light'] {
  --lufa-core-neutral-background: var(--lufa-primitive-color-gray-50);
  /* ... 173 tokens */
}

[data-mode='dark'] {
  --lufa-core-neutral-background: var(--lufa-primitive-color-gray-900);
  /* ... 31 mode-specific tokens */
}

[data-mode='high-contrast'] {
  --lufa-core-neutral-background: #ffffff;
  /* ... 31 mode-specific tokens */
}
```

---

## Decision #4: Documentation Approach

**Status:** ✅ Adopted

### Documentation Structure

```
packages/design-system/
├── _docs/
│   ├── overview.md                     # High-level introduction
│   ├── architecture.md                 # System architecture
│   ├── development-guide.md            # Component development
│   └── brainstorming/
│       ├── brainstorming-session-2026-01-22.md
│       └── architecture-updates-*.md   # Decision changes
├── tokens/_docs/
│   └── token-architecture.md           # Token structure details
├── themes/_docs/
│   └── theme-switching-guide.md        # Theme implementation guide
├── playwright/_docs/
│   └── testing-strategy.md             # Testing approach
└── _docs/brainstorming/architecture-decisions.md       # This file
```

### Generated Documentation

- **Storybook:** Component documentation + live examples
- **Docusaurus:** Token catalog + usage guidelines
- **JSON Metadata:** Machine-readable token information

---

## Decision #5: No TypeScript Token Exports

**Status:** ✅ Adopted (Changed from original brainstorming)

**See:** Decision Change #1 in `architecture-updates-2026-01-25.md`

### Rationale

- Simpler architecture
- Direct CSS variable usage
- Reduced build complexity
- JSON sufficient for tooling

### Distribution

Tokens available as:

1. **CSS Custom Properties** - Primary consumption method
2. **JSON Metadata** - For documentation and tooling
3. **JSON Values** - For build-time processing

---

## Decision #6: Token Organization

**Status:** ✅ Adopted

### Folder Structure

**By Level + Category:**

```
primitives/
  ├── color/palette.json        # All color primitives
  ├── spacing/scale.json         # Spacing scale
  └── typography/scale.json      # Type scale

core/
  ├── brand/colors.json          # Brand colors
  ├── neutral/colors.json        # Neutral palette
  └── semantic/colors.json       # Semantic colors

semantic/
  └── ui/
      ├── backgrounds.json       # UI backgrounds
      ├── text.json              # UI text
      └── actions.json           # UI actions

component/
  ├── button/tokens.json         # Button-specific
  └── badge/tokens.json          # Badge-specific
```

### Benefits

- Clear separation of concerns
- Easy to find tokens by level
- Scalable structure
- Supports multi-file organization

---

## Decision #7: Build Process

**Status:** ✅ Adopted

### Build Pipeline

```
JSON Tokens (DTCG)
    ↓
Style Dictionary
    ↓
├── CSS (tokens.css)
├── JSON Metadata (tokens-metadata.json)
└── JSON Values (tokens-values.json)
```

### Commands

```bash
# Build all tokens
pnpm build

# Watch for changes
pnpm build:watch

# Clean dist folder
pnpm clean
```

### Custom Formats

**`css/variables-with-modes`** - Multi-mode CSS generation

- Handles `modes` metadata
- Generates `[data-mode]` selectors for accessibility modes
- Resolves primitive references

**Note:** Use `data-mode` for accessibility modes (light/dark/high-contrast) and `data-theme` for brand color themes.

---

## Decision #8: Dark Mode / Multi-Mode Support

**Status:** ✅ Adopted and Implemented

### Approach

**CSS-based theming** using `data-mode` attribute for accessibility modes

### Supported Modes

1. **Light** (default) - Standard light theme
2. **Dark** - Inverted colors for low-light
3. **High Contrast** - WCAG AAA compliant (7:1+ ratios)

### Token Metadata

```json
{
  "background": {
    "$value": "{primitive.color.gray.50}",
    "$type": "color",
    "$extensions": {
      "lufa": {
        "modes": {
          "light": "{primitive.color.gray.50}",
          "dark": "{primitive.color.gray.900}",
          "high-contrast": "#ffffff"
        }
      }
    }
  }
}
```

### Implementation

**31 tokens** support multi-mode:

- **Neutral (9):** backgrounds, surfaces, borders, text
- **Brand (6):** primary, secondary + hover/active states
- **Semantic (16):** success, error, warning, info + variants

### Usage

```tsx
// HTML/React
<div data-mode="dark">
  {/* Components automatically use dark theme */}
</div>

// CSS (automatic)
.component {
  background: var(--lufa-core-neutral-background);
  /* Resolves based on [data-mode] selector */
}
```

---

## Decision #9: Métadonnées DTCG

**Status:** ✅ Adopted (90% implemented)

### Metadata Structure

```json
{
  "$extensions": {
    "lufa": {
      "level": "primitive" | "core" | "semantic" | "component",
      "category": "color" | "spacing" | "typography" | ...,
      "role": "action" | "content" | "feedback",
      "modes": {
        "light": "value",
        "dark": "value",
        "high-contrast": "value"
      },
      "useCase": "Description of usage",
      "pairedWith": "token-name",
      "a11y": {
        "contrastRatio": { "onBackground": 4.5 },
        "wcagLevel": "AA" | "AAA"
      }
    }
  }
}
```

### Implemented Metadata

- ✅ `level` - Token hierarchy level
- ✅ `category` - Token category
- ✅ `role` - Usage role (action, content, feedback)
- ✅ `modes` - Multi-mode values
- ✅ `useCase` - Usage guidelines
- ✅ `pairedWith` - Recommended pairings
- ✅ `a11y` - Accessibility information

### Future Metadata (Phase 3)

- ⏳ `stability` - experimental, beta, stable, deprecated
- ⏳ `deprecated` - Deprecation flag
- ⏳ `deprecatedSince` - Version deprecated
- ⏳ `replacedBy` - Replacement token

---

## Cross-Cutting Concerns

### Pattern "on-X" (Contrast Pairs)

**Purpose:** Ensure accessible color combinations

**Examples:**

```json
{
  "background-on-primary": "#ffffff",
  "background-on-success": "#ffffff",
  "background-on-error": "#ffffff"
}
```

**Usage:** Text/icons on colored backgrounds

---

### Alpha Variants (Overlays)

**Purpose:** Transparent overlays for modals, tooltips

**Examples:**

```json
{
  "background-overlay": "rgba(0, 0, 0, 0.5)",
  "overlay-tooltip": "rgba(17, 24, 39, 0.95)"
}
```

---

### Recipe System (Component Tokens)

**Purpose:** Component-specific token overrides

**Activation:** Only when component needs customization beyond semantic tokens

**Example:**

```json
{
  "component.button.background": "{semantic.ui.action.primary}",
  "component.button.background-hover": "{semantic.ui.action.primary-hover}"
}
```

---

## Architecture Alignment

**Current Score:** 98% (8.9/9 decisions)

| Decision         | Status | Notes                                      |
| ---------------- | ------ | ------------------------------------------ |
| #1 Structure     | 100%   | 4-level hierarchy implemented              |
| #2 Naming        | 100%   | DTCG format + kebab-case CSS               |
| #3 Distribution  | 100%   | CSS + JSON (TypeScript cancelled)          |
| #4 Documentation | 100%   | 5 major docs complete                      |
| #5 TypeScript    | 100%   | Decision changed (no TS export)            |
| #6 Organization  | 100%   | By level + category                        |
| #7 Build Process | 100%   | Style Dictionary with custom formats       |
| #8 Dark Mode     | 100%   | 31 tokens with 3 modes                     |
| #9 Metadata      | 90%    | Core complete, lifecycle pending (Phase 3) |

---

## Related Documents

- **Decision Changes:** `architecture-updates-2026-01-25.md`
- **Brainstorming Session:** `brainstorming-session-2026-01-22.md`
- **Theme Guide:** `../../themes/_docs/theme-switching-guide.md`
- **Token Architecture:** `../../tokens/_docs/token-architecture.md`
- **Alignment Report:** `/_bmad-output/DESIGN-SYSTEM-ALIGNMENT-REPORT.md`

---

**Document Owner:** Design System Team  
**Last Updated:** 2026-01-25  
**Review Cycle:** Quarterly or on architectural changes

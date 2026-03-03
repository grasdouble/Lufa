# Token Architecture

**Package**: `@grasdouble/lufa_design-system-tokens`  
**Build Tool**: Style Dictionary v5.2.0 | **Format**: DTCG compliant | **Version**: 1.1.0

---

## Token Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  Level 4: COMPONENT TOKENS (235)                         │
│  Component-specific tokens (button, card, input, etc.)  │
│              ↓ references ↓                              │
├─────────────────────────────────────────────────────────┤
│  Level 3: SEMANTIC TOKENS (175)                          │
│  Context-specific tokens (ui, interactive, typography)  │
│              ↓ references ↓                              │
├─────────────────────────────────────────────────────────┤
│  Level 2: CORE TOKENS (85)                               │
│  Global design decisions (brand, neutral, layout, typo) │
│              ↓ references ↓                              │
├─────────────────────────────────────────────────────────┤
│  Level 1: PRIMITIVE TOKENS (203)                         │
│  Foundation values (colors, spacing, typography, etc.)  │
└─────────────────────────────────────────────────────────┘
```

**Total**: 698 tokens → 1025 CSS custom properties (including responsive variants)

---

## The 4 Levels

### Level 1 — Primitives (203 tokens)

Raw values that **never change** across themes or modes. The "paint catalog" of the system.

| Category         | Count | Description                                            |
| ---------------- | ----- | ------------------------------------------------------ |
| **Colors**       | 90    | 6 palettes × 15 shades + alpha overlays (black, white) |
| **Shadow**       | 30    | 6 elevation levels with full `box-shadow` values       |
| **Typography**   | 26    | Families (2), sizes (11), weights (4), LH (3), LS (6)  |
| **Spacing**      | 12    | Scale from 0px to 96px (4px base)                      |
| **Motion**       | 12    | Duration (6) + easing (6) for animations               |
| **Height**       | 8     | Component fixed heights                                |
| **Radius**       | 8     | Rounding from none to full (9999px)                    |
| **Breakpoint**   | 6     | xs (320px) → 2xl (1536px)                              |
| **Icon Size**    | 5     | xs, sm, md, lg, xl                                     |
| **Border Width** | 3     | thin, base, thick                                      |
| **Opacity**      | 3     | disabled, muted, full                                  |

**Rules**: Strictly immutable · `themeable: false` for dimensions · `themeable: true` for colors

```json
{
  "primitive": {
    "color": { "blue": { "600": { "$value": "#2563eb", "$type": "color" } } },
    "spacing": { "16": { "$value": "1rem", "$type": "dimension" } }
  }
}
```

---

### Level 2 — Core (85 tokens)

Global design decisions that reference primitives. Brand colors, neutral palette, layout, typography aliases.

| Category            | Count | Description                                               |
| ------------------- | ----- | --------------------------------------------------------- |
| **Layout**          | 32    | Page padding, section gaps, container widths (responsive) |
| **Typography**      | 21    | Font families, weights, sizes for common contexts         |
| **Semantic Colors** | 16    | Success, error, warning, info + variants                  |
| **Neutral Colors**  | 9     | Backgrounds, surfaces, borders, text hierarchy            |
| **Brand Colors**    | 7     | Primary/secondary with hover/active states                |

```json
{
  "core": {
    "brand": {
      "primary": { "$value": "{primitive.color.blue.600}", "$type": "color" }
    }
  }
}
```

---

### Level 3 — Semantic (175 tokens)

Context-specific tokens named by purpose, not by value. Usable across multiple components.

| Category        | Count | Description                                     |
| --------------- | ----- | ----------------------------------------------- |
| **UI**          | 79    | text, background, border, surface colors        |
| **Interactive** | 31    | hover, focus, active, disabled states           |
| **Button**      | 30    | Semantic tokens for button variants             |
| **Effect**      | 9     | Backdrop blur, overlays, transitions            |
| **Typography**  | 12    | Heading H1-H4, body variants, caption, label    |
| **Z-Index**     | 8     | Modal, tooltip, popover, sticky stacking layers |
| **Layout**      | 6     | compact, comfortable, spacious spacing contexts |

**Special pattern — `on-X` tokens**: WCAG AAA contrast colors for text on colored backgrounds:

```css
/* Text on primary-colored background */
color: var(--lufa-semantic-ui-text-on-primary);
```

---

### Level 4 — Component (235 tokens)

Component-specific tokens that reference semantic or core levels. One component per file.

| Component     | Count | Description                                     |
| ------------- | ----- | ----------------------------------------------- |
| **Button**    | 43    | 3 types × variants × states (padding, font, bg) |
| **Card**      | 37    | Padding, radius, shadow, border                 |
| **Input**     | 34    | Height, padding, border, all interaction states |
| **Modal**     | 27    | Width, padding, backdrop, spacing               |
| **Badge**     | 25    | Color, size, typography for all variants        |
| **Tooltip**   | 18    | Padding, radius, shadow, arrow                  |
| **Popover**   | 15    | Surface, border, shadow                         |
| **Divider**   | 15    | Width, color, spacing variants                  |
| **Shared**    | 14    | Cross-component focus rings, icon sizes         |
| **Container** | 7     | Max-width, padding per breakpoint               |

---

## Decision Tree: Where Does My Token Belong?

```
START: I need a new token
│
├─ Does the value NEVER change across themes?
│  └─ YES → PRIMITIVE (new color shade, new spacing step)
│
├─ Is it a global brand/layout/typography decision?
│  └─ YES → CORE (brand color, layout spacing)
│
├─ Is it used by ONLY ONE component?
│  └─ YES → COMPONENT (button-specific padding, card-specific radius)
│
└─ Is it a general UI pattern across multiple components?
   └─ YES → SEMANTIC (disabled-opacity, hover transition, backdrop blur)
```

---

## Naming Conventions

### CSS Variable Format

```
--lufa-{level}-{category}-{name}[-{variant}][-{state}]
```

| Level     | Example                                      |
| --------- | -------------------------------------------- |
| Primitive | `--lufa-primitive-color-blue-600`            |
| Core      | `--lufa-core-color-brand-primary`            |
| Semantic  | `--lufa-semantic-ui-text-primary`            |
| Component | `--lufa-component-button-primary-background` |

### Key Rules

1. **Semantic over visual** at levels 2–4: name by _purpose_, not by _appearance_
   - ✅ `button.primary.background` — ❌ `button.blue.background`
2. **State variants** follow this order: `default` → `hover` → `active` → `focus` → `disabled`
3. **Paths use kebab-case** (no camelCase, no spaces)
4. **`themeable` attribute** in `$extensions.lufa`:
   - `color` → `true` · `shadow` → `true`
   - `dimension` → `false` · `duration` → `false` · `number` → `false`

### DTCG Token Format

```json
{
  "token-name": {
    "$value": "...",
    "$type": "color | dimension | fontFamily | fontWeight | number | shadow | duration | cubicBezier",
    "$description": "English description (min 10 chars)",
    "$extensions": {
      "lufa": {
        "themeable": true,
        "category": "primitive | core | semantic | component"
      }
    }
  }
}
```

---

## Viewport Adaptation Strategy

Two approaches — **never mix them on the same token**:

| Approach       | Method        | Count      | Used For                           |
| -------------- | ------------- | ---------- | ---------------------------------- |
| **Fluid**      | CSS `clamp()` | 7 tokens   | Large headings (2xl–8xl)           |
| **Responsive** | Media queries | 18 tokens  | Layout spacing (page/section/grid) |
| **Fixed**      | Static value  | all others | Components, body text, UI elements |

### Fluid (clamp) — Typography Only

Headings scale smoothly across all viewport widths with a single declaration:

```css
font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
/* → Scales from 32px to 48px, no media queries needed */
```

| Token | Min  | Max  | Use Case          |
| ----- | ---- | ---- | ----------------- |
| `2xl` | 20px | 24px | H4 headings       |
| `3xl` | 24px | 30px | H3 headings       |
| `4xl` | 28px | 36px | H2 headings       |
| `5xl` | 32px | 48px | H1 headings       |
| `6xl` | 40px | 56px | Hero titles       |
| `7xl` | 48px | 64px | Marketing display |
| `8xl` | 56px | 72px | Landing heroes    |

### Responsive (media queries) — Layout Only

Layout spacing changes at defined breakpoints with discrete values:

```css
padding: var(--lufa-core-layout-page-padding-base); /* 16px */

@media (min-width: 768px) {
  padding: var(--lufa-core-layout-page-padding-md); /* 24px */
}

@media (min-width: 1024px) {
  padding: var(--lufa-core-layout-page-padding-lg); /* 32px */
}
```

Available groups: `page-padding`, `section-gap`, `container-gutter`, `grid-gap`, `header-height`, `modal-padding` — each with `{base|md|lg}` variants.

### Decision

```
Need viewport adaptation?
├─ Typography (font-size, 20px+)?  → FLUID tokens (2xl–8xl)
├─ Layout spacing?                 → RESPONSIVE tokens ({base|md|lg})
└─ Everything else?                → FIXED value
```

---

## Build System

```bash
# Validate tokens (DTCG format, required fields, themeable rules)
pnpm validate:tokens

# Build: validate → clean → style-dictionary → size check
pnpm build

# Check generated CSS file size (warn >120 KB, error >150 KB)
pnpm check:size
```

**Custom Style Dictionary transforms** (registered in `style-dictionary.config.js`):

| Transform                     | Purpose                                        |
| ----------------------------- | ---------------------------------------------- |
| `size/rem/fluid`              | Handles `clamp()` fluid values in `size/rem`   |
| `shadow/css/shorthand-custom` | Builds `box-shadow` shorthand without warnings |
| `responsive`                  | Adds media query context to responsive tokens  |

**Generated outputs** (`dist/`):

| File                   | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `tokens.css`           | 1025 CSS custom properties               |
| `tokens-values.json`   | Flat token values (JS/TS runtime access) |
| `tokens-metadata.json` | Full DTCG metadata (tooling, docs)       |
| `tokens.map.json`      | VSCode extension token map               |

---

## Adding New Tokens — Checklist

- [ ] Token placed at correct level (use decision tree above)
- [ ] Follows DTCG format (`$value`, `$type`, `$description`)
- [ ] `$description` is meaningful (min 10 chars, in English)
- [ ] `$extensions.lufa.themeable` matches token type rules
- [ ] Path uses kebab-case
- [ ] Runs `pnpm validate:tokens` with 0 errors
- [ ] Runs `pnpm build` with 0 warnings

---

**Related**: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) · [TOKENS.md](./TOKENS.md) · [USAGE.md](./USAGE.md)

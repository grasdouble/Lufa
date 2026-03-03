# Token Reference

**Package**: `@grasdouble/lufa_design-system-tokens` — v1.1.0  
**Total tokens**: 698 → 1025 CSS custom properties

---

## Colors

### Primitive Palettes (90 tokens)

6 palettes × 15 shades (50–950) + alpha overlays (black, white).

| Palette    | Key shades | Primary use                   |
| ---------- | ---------- | ----------------------------- |
| **Gray**   | 50–900     | Backgrounds, text, borders    |
| **Blue**   | 50–900     | Primary actions, links, info  |
| **Green**  | 50–900     | Success states, confirmations |
| **Red**    | 50–900     | Errors, destructive actions   |
| **Yellow** | 50–900     | Warnings, caution states      |
| **Purple** | 50–900     | Secondary brand, accents      |

```css
var(--lufa-primitive-color-gray-50)     /* #f9fafb */
var(--lufa-primitive-color-blue-600)    /* #2563eb */
var(--lufa-primitive-color-green-500)   /* #22c55e */
var(--lufa-primitive-color-red-600)     /* #dc2626 */
```

Alpha overlays: `--lufa-primitive-color-alpha-black-{8|12|20}` / `white-{8|12|20}`

---

### Core Colors — Brand & Semantic (32 tokens)

| Token                            | Light        | Dark         | Use Case                      |
| -------------------------------- | ------------ | ------------ | ----------------------------- |
| `core.color.brand.primary`       | `blue-600`   | `blue-500`   | Primary buttons, links, focus |
| `core.color.brand.primary-hover` | `blue-700`   | `blue-400`   | Primary hover                 |
| `core.color.brand.secondary`     | `purple-500` | `purple-400` | Secondary buttons, badges     |
| `core.semantic.success`          | `green-500`  | `green-400`  | Success text, icons           |
| `core.semantic.success-subtle`   | `green-100`  | `green-900`  | Success alert backgrounds     |
| `core.semantic.error`            | `red-600`    | `red-400`    | Error text, validation        |
| `core.semantic.error-subtle`     | `red-100`    | `red-900`    | Error alert backgrounds       |
| `core.semantic.warning`          | `yellow-500` | `yellow-400` | Warning text                  |
| `core.semantic.info`             | `blue-500`   | `blue-400`   | Info text, help icons         |

#### Mode switching

Colors adapt automatically via CSS data attributes:

```css
:root {
  --lufa-core-color-brand-primary: #2563eb;
}
[data-theme='dark'] {
  --lufa-core-color-brand-primary: #3b82f6;
}
[data-theme='high-contrast'] {
  --lufa-core-color-brand-primary: #0000ff;
}
```

---

### Semantic UI Colors (79 tokens)

Context-specific colors for text, backgrounds, and borders:

| Use Case       | Token                             | Light      | Dark       |
| -------------- | --------------------------------- | ---------- | ---------- |
| Primary text   | `semantic.ui.text.primary`        | `gray-900` | `gray-50`  |
| Secondary text | `semantic.ui.text.secondary`      | `gray-600` | `gray-400` |
| Background     | `semantic.ui.background.default`  | `white`    | `gray-900` |
| Surface        | `semantic.ui.background.elevated` | `gray-50`  | `gray-800` |
| Border         | `semantic.ui.border.default`      | `gray-200` | `gray-700` |
| Border hover   | `semantic.ui.border.hover`        | `gray-300` | `gray-600` |

**`on-X` pattern** — WCAG AAA contrast for text on colored backgrounds:

```css
/* Text on a primary-colored background */
color: var(--lufa-semantic-ui-text-on-primary);
```

---

### Color Decision Tree

```
Need a color?
├─ Raw palette value?             → primitive.color.{palette}.{shade}
├─ Brand (primary/secondary)?     → core.color.brand.{name}
├─ State (success/error/…)?       → core.semantic.{state}
├─ General UI (text/bg/border)?   → semantic.ui.{context}.{role}
└─ Component-specific?            → component.{name}.{…}
```

### Alert & Form Validation Examples

```css
/* Status alert */
.alert-success {
  background: var(--lufa-core-color-feedback-success-subtle);
  border: 1px solid var(--lufa-core-color-feedback-success-border);
  color: var(--lufa-core-color-feedback-success);
}

/* Form field in error state */
.input-invalid {
  border-color: var(--lufa-core-color-feedback-error);
}
.validation-error {
  color: var(--lufa-core-color-feedback-error);
  font-size: var(--lufa-semantic-typography-caption);
  margin-top: var(--lufa-primitive-spacing-4);
}
```

---

## Typography

### Font Size Scale (11 tokens)

| Token  | Value   | Fluid? | Semantic use               |
| ------ | ------- | ------ | -------------------------- |
| `xs`   | 12px    | —      | Captions, metadata         |
| `sm`   | 14px    | —      | Secondary text, labels     |
| `base` | 16px    | —      | Body text, buttons, inputs |
| `lg`   | 18px    | —      | Lead text, H6              |
| `xl`   | 20px    | —      | Subtitles, H5              |
| `2xl`  | 20–24px | ✅     | H4 headings                |
| `3xl`  | 24–30px | ✅     | H3 headings                |
| `4xl`  | 28–36px | ✅     | H2 headings                |
| `5xl`  | 32–48px | ✅     | H1 headings                |
| `6xl`  | 40–60px | ✅     | Hero titles                |
| `7xl`  | 48–72px | ✅     | Marketing display          |
| `8xl`  | 64–96px | ✅     | Landing hero impact        |

Fluid tokens use CSS `clamp()` for smooth viewport scaling. See [ARCHITECTURE.md](./ARCHITECTURE.md#viewport-adaptation-strategy) for details.

---

### Font Weights, Line Heights & Letter Spacing

| Weight     | Value | Semantic use              |
| ---------- | ----- | ------------------------- |
| `normal`   | 400   | Body text, paragraphs     |
| `medium`   | 500   | Labels, navigation, links |
| `semibold` | 600   | Buttons, H3–H6, subtitles |
| `bold`     | 700   | H1–H2, critical emphasis  |

| Line Height | Value | Use cases                    |
| ----------- | ----- | ---------------------------- |
| `tight`     | 1.25  | Headings, compact UI         |
| `normal`    | 1.5   | Body text (WCAG recommended) |
| `relaxed`   | 1.75  | Long-form content            |

| Letter Spacing | Value   | Use cases                    |
| -------------- | ------- | ---------------------------- |
| `tighter`      | -0.04em | Display text (6xl+)          |
| `tight`        | -0.02em | Large headings (H1–H3)       |
| `normal`       | 0       | Body text                    |
| `wide`         | 0.05em  | Small text, uppercase labels |
| `wider`        | 0.1em   | All-caps headings, buttons   |

---

### Semantic Typography Hierarchy (12 tokens)

| Token          | Size        | Weight   | Line Height | Use Case             |
| -------------- | ----------- | -------- | ----------- | -------------------- |
| `heading.1`    | `5xl` fluid | bold 700 | tight 1.25  | H1, page titles      |
| `heading.2`    | `4xl` fluid | bold 700 | tight 1.25  | H2, major sections   |
| `heading.3`    | `3xl` fluid | semi 600 | tight 1.25  | H3, subsections      |
| `heading.4`    | `2xl` fluid | semi 600 | tight 1.25  | H4, card titles      |
| `heading.5`    | `xl` 20px   | semi 600 | tight 1.25  | H5, list titles      |
| `heading.6`    | `lg` 18px   | semi 600 | tight 1.25  | H6, inline titles    |
| `body.large`   | `lg` 18px   | norm 400 | normal 1.5  | Lead paragraphs      |
| `body.default` | `base` 16px | norm 400 | normal 1.5  | Standard body text   |
| `body.small`   | `sm` 14px   | norm 400 | normal 1.5  | Secondary content    |
| `caption`      | `xs` 12px   | norm 400 | —           | Footnotes, metadata  |
| `label`        | `sm` 14px   | mid 500  | —           | Form labels, UI text |
| `button`       | `base` 16px | semi 600 | —           | Button text, CTAs    |

```css
h1 {
  font-size: var(--lufa-semantic-typography-heading-1);
  font-weight: var(--lufa-primitive-typography-font-weight-bold);
  line-height: var(--lufa-primitive-typography-line-height-tight);
}
```

---

## Spacing

### Primitive Scale (12 tokens) — 4px base unit

| Token        | Value | Use Case                     |
| ------------ | ----- | ---------------------------- |
| `spacing.0`  | 0px   | Reset margin/padding         |
| `spacing.4`  | 4px   | Icon-text gap, badge padding |
| `spacing.8`  | 8px   | Tight spacing, compact lists |
| `spacing.12` | 12px  | Form fields, compact cards   |
| `spacing.16` | 16px  | Default component spacing    |
| `spacing.24` | 24px  | Sections, large cards        |
| `spacing.32` | 32px  | Page sections, hero padding  |
| `spacing.40` | 40px  | Marketing sections           |
| `spacing.48` | 48px  | Page headers, major breaks   |
| `spacing.64` | 64px  | Landing sections             |
| `spacing.80` | 80px  | Footer, large hero margins   |
| `spacing.96` | 96px  | Maximum separation (hero xl) |

---

### Semantic Spacing (4 contexts)

| Token                             | Value | Use Case                      |
| --------------------------------- | ----- | ----------------------------- |
| `semantic.ui.spacing.compact`     | 8px   | Tight layouts, compact lists  |
| `semantic.ui.spacing.default`     | 12px  | Standard spacing, form fields |
| `semantic.ui.spacing.comfortable` | 16px  | Comfortable layouts, buttons  |
| `semantic.ui.spacing.spacious`    | 24px  | Spacious sections, cards      |

---

### Component Spacing Reference

| Component   | Padding     | Gap    | Token                         |
| ----------- | ----------- | ------ | ----------------------------- |
| Button (sm) | `8px 16px`  | `4px`  | `component.button.padding.sm` |
| Button (md) | `12px 16px` | `8px`  | `component.button.padding.md` |
| Button (lg) | `16px 24px` | `8px`  | `component.button.padding.lg` |
| Card (sm)   | `12px`      | `8px`  | `primitive.spacing.12`        |
| Card (md)   | `16px`      | `12px` | `primitive.spacing.16`        |
| Input       | `12px 16px` | —      | `component.input.padding`     |
| Modal       | `24px`      | `16px` | `component.modal.padding`     |

### Spacing Decision Tree

```
Need spacing?
├─ Component-specific?      → component.{name}.padding.{size}
├─ Contextual UI context?   → semantic.ui.spacing.{compact|default|comfortable|spacious}
└─ Specific value?          → primitive.spacing.{value}
```

---

## Accessibility

- **Font size minimum**: 12px (captions only) — 16px recommended for body text
- **Line height body**: 1.5 (WCAG 1.4.12)
- **Touch targets**: 44×44px minimum (iOS HIG) / 48×48px recommended (Material)
- **Color contrast**: 4.5:1 AA normal text · 3:1 AA large text (≥18px or bold ≥14px)

```css
/* Adequate touch target */
.button {
  min-height: 44px;
  padding: var(--lufa-primitive-spacing-12) var(--lufa-primitive-spacing-16);
}
```

---

**Related**: [ARCHITECTURE.md](./ARCHITECTURE.md) · [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) · [USAGE.md](./USAGE.md)

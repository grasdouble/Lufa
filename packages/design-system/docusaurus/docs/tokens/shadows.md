---
id: shadows
title: Shadows
sidebar_label: Shadows
description: Shadow tokens and elevation guidance.
sidebar_position: 4
---

# Shadow Tokens

Shadow tokens provide a consistent elevation system for creating depth and visual hierarchy in your UI.

## Overview

Lufa's shadow system uses semantic naming for different elevation levels, from subtle surface shadows to prominent floating overlays.

## Shadow Scale

### Small Shadow (`--lufa-semantic-ui-shadow-small`)

Subtle shadow for slightly elevated surfaces.

**Use cases:**

- Hovering cards
- Input fields with focus
- Subtle raised buttons

**CSS:**

```css
.card {
  box-shadow: var(--lufa-semantic-ui-shadow-small);
}
```

---

### Medium Shadow (`--lufa-semantic-ui-shadow-medium`)

Standard shadow for most elevated components.

**Use cases:**

- Default cards
- Dropdowns
- Modals

**CSS:**

```css
.dropdown {
  box-shadow: var(--lufa-semantic-ui-shadow-medium);
}
```

---

### Large Shadow (`--lufa-semantic-ui-shadow-large`)

Moderate shadow for prominently elevated surfaces.

**Use cases:**

- Floating action buttons
- Tooltips
- Popovers

**CSS:**

```css
.tooltip {
  box-shadow: var(--lufa-semantic-ui-shadow-large);
}
```

---

### Extra Large Shadow (`--lufa-semantic-ui-shadow-extra-large`)

Strong shadow for high elevation surfaces.

**Use cases:**

- Modal overlays
- Full-page overlays
- Drawers

**CSS:**

```css
.modal {
  box-shadow: var(--lufa-semantic-ui-shadow-extra-large);
}
```

## Shadow Token Reference

| Token                            | CSS Variable                            | Default Value (Light Mode)                                 |
| -------------------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `semantic.ui.shadow-small`       | `--lufa-semantic-ui-shadow-small`       | `0 1px 2px 0 var(--lufa-primitive-color-alpha-black-5)`    |
| `semantic.ui.shadow-medium`      | `--lufa-semantic-ui-shadow-medium`      | `0 2px 4px 0 rgba(0, 0, 0, 0.1)`                           |
| `semantic.ui.shadow-large`       | `--lufa-semantic-ui-shadow-large`       | `0 8px 16px 0 var(--lufa-primitive-color-alpha-black-12)`  |
| `semantic.ui.shadow-extra-large` | `--lufa-semantic-ui-shadow-extra-large` | `0 12px 24px 0 var(--lufa-primitive-color-alpha-black-15)` |

## Usage Examples

### Card with Elevation

```tsx
import { Box, Text } from '@grasdouble/lufa_design-system';

function ElevatedCard() {
  return (
    <Box
      padding="comfortable"
      background="surface"
      borderRadius="base"
      style={{ boxShadow: 'var(--lufa-semantic-ui-shadow-medium)' }}
    >
      <Text variant="heading-md">Elevated Card</Text>
      <Text>This card has a medium shadow for elevation.</Text>
    </Box>
  );
}
```

### Interactive Shadow on Hover

```css title="src/components/Card.module.css"
.card {
  box-shadow: var(--lufa-semantic-ui-shadow-small);
  transition: box-shadow var(--lufa-semantic-ui-transition-fast);
}

.card:hover {
  box-shadow: var(--lufa-semantic-ui-shadow-large);
}

.card:active {
  box-shadow: var(--lufa-semantic-ui-shadow-medium);
}
```

### Modal with Maximum Elevation

```tsx
function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 'var(--lufa-semantic-ui-shadow-extra-large)',
        backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        padding: 'var(--lufa-semantic-ui-spacing-comfortable)',
        borderRadius: 'var(--lufa-semantic-ui-radius-large)',
      }}
    >
      {children}
    </div>
  );
}
```

## Dark Mode Considerations

Shadow tokens are static by default. If you need stronger visibility in dark mode, override the semantic shadow tokens in your theme.

```css
/* Optional theme override for dark mode */
[data-mode='dark'] {
  --lufa-semantic-ui-shadow-small: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --lufa-semantic-ui-shadow-medium: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
  --lufa-semantic-ui-shadow-large: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
  --lufa-semantic-ui-shadow-extra-large: 0 12px 24px 0 rgba(0, 0, 0, 0.6);
}
```

## Best Practices

### Do ✅

- **Use semantic shadow tokens** instead of hardcoded values
- **Apply shadows to elevated surfaces** (cards, modals, dropdowns)
- **Increase shadow on hover** for interactive elements
- **Reduce shadow on active** (pressed) state
- **Test shadows in dark mode** for visibility

### Don't ❌

- **Don't hardcode box-shadow values** (use tokens)
- **Don't use excessive shadows** (keep UI clean and minimal)
- **Don't skip shadow transitions** (jarring instant changes)
- **Don't use shadows for non-elevated elements** (flat buttons, dividers)

## Accessibility Notes

- Shadows provide **visual depth cues** but should not be the only indicator
- Ensure sufficient **color contrast** independent of shadow
- Shadows **do not affect accessibility** (screen readers ignore them)
- Use shadows to **reinforce hierarchy**, not create it

## Related Tokens

- [Colors](/docs/tokens/colors) - Color tokens for backgrounds and borders
- [Spacing](/docs/tokens/spacing) - Spacing tokens for layout
- [Typography](/docs/tokens/typography) - Typography tokens for text styling

:::tip Combine with Transitions
Animate shadow changes for smooth interactions:

```css
.button {
  box-shadow: var(--lufa-semantic-ui-shadow-small);
  transition: box-shadow var(--lufa-semantic-ui-transition-fast);
}
```

:::

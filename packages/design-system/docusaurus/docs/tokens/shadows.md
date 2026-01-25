---
sidebar_position: 4
---

# Shadow Tokens

Shadow tokens provide a consistent elevation system for creating depth and visual hierarchy in your UI.

## Overview

Lufa's shadow system uses semantic naming for different elevation levels, from subtle surface shadows to prominent floating overlays.

## Shadow Scale

### Small Shadow (`--lufa-token-shadow-sm`)

Subtle shadow for slightly elevated surfaces.

**Use cases:**

- Hovering cards
- Input fields with focus
- Subtle raised buttons

**CSS:**

```css
.card {
  box-shadow: var(--lufa-token-shadow-sm);
}
```

**JavaScript:**

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

const styles = {
  boxShadow: tokens.shadow.sm,
};
```

---

### Base Shadow (`--lufa-token-shadow-base`)

Standard shadow for most elevated components.

**Use cases:**

- Default cards
- Dropdowns
- Modals

**CSS:**

```css
.dropdown {
  box-shadow: var(--lufa-token-shadow-base);
}
```

---

### Medium Shadow (`--lufa-token-shadow-md`)

Moderate shadow for prominently elevated surfaces.

**Use cases:**

- Floating action buttons
- Tooltips
- Popovers

**CSS:**

```css
.tooltip {
  box-shadow: var(--lufa-token-shadow-md);
}
```

---

### Large Shadow (`--lufa-token-shadow-lg`)

Strong shadow for high elevation surfaces.

**Use cases:**

- Modal overlays
- Full-page overlays
- Drawers

**CSS:**

```css
.modal {
  box-shadow: var(--lufa-token-shadow-lg);
}
```

---

### Extra Large Shadow (`--lufa-token-shadow-xl`)

Maximum shadow for the highest elevation level.

**Use cases:**

- Critical alerts
- Sticky headers
- Floating notifications

**CSS:**

```css
.alert-critical {
  box-shadow: var(--lufa-token-shadow-xl);
}
```

---

## Shadow Token Reference

| Token                | CSS Variable               | Light Mode Value                      | Dark Mode Value                       |
| -------------------- | -------------------------- | ------------------------------------- | ------------------------------------- |
| `tokens.shadow.sm`   | `--lufa-token-shadow-sm`   | `0 1px 2px 0 rgba(0, 0, 0, 0.05)`     | `0 1px 2px 0 rgba(0, 0, 0, 0.3)`      |
| `tokens.shadow.base` | `--lufa-token-shadow-base` | `0 1px 3px 0 rgba(0, 0, 0, 0.1)`      | `0 1px 3px 0 rgba(0, 0, 0, 0.5)`      |
| `tokens.shadow.md`   | `--lufa-token-shadow-md`   | `0 4px 6px -1px rgba(0, 0, 0, 0.1)`   | `0 4px 6px -1px rgba(0, 0, 0, 0.5)`   |
| `tokens.shadow.lg`   | `--lufa-token-shadow-lg`   | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | `0 10px 15px -3px rgba(0, 0, 0, 0.5)` |
| `tokens.shadow.xl`   | `--lufa-token-shadow-xl`   | `0 20px 25px -5px rgba(0, 0, 0, 0.1)` | `0 20px 25px -5px rgba(0, 0, 0, 0.5)` |

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
      style={{ boxShadow: 'var(--lufa-token-shadow-base)' }}
    >
      <Text variant="heading-md">Elevated Card</Text>
      <Text>This card has a base shadow for elevation.</Text>
    </Box>
  );
}
```

### Interactive Shadow on Hover

```css title="src/components/Card.module.css"
.card {
  box-shadow: var(--lufa-token-shadow-sm);
  transition: box-shadow var(--lufa-token-transition-fast);
}

.card:hover {
  box-shadow: var(--lufa-token-shadow-md);
}

.card:active {
  box-shadow: var(--lufa-token-shadow-base);
}
```

### Modal with Maximum Elevation

```tsx
import tokens from '@grasdouble/lufa_design-system-tokens';

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: tokens.shadow.xl,
        backgroundColor: tokens.color.background.surface,
        padding: tokens.spacing.comfortable,
        borderRadius: tokens.radius.lg,
      }}
    >
      {children}
    </div>
  );
}
```

## Dark Mode Considerations

Shadows automatically adjust for dark mode:

- **Light mode**: Softer, more subtle shadows (lower opacity)
- **Dark mode**: Stronger, more defined shadows (higher opacity)

This ensures shadows remain visible against dark backgrounds while maintaining appropriate visual hierarchy.

```css
/* Automatic dark mode adjustment */
:root {
  --lufa-token-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --lufa-token-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
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
  box-shadow: var(--lufa-token-shadow-sm);
  transition: box-shadow var(--lufa-token-transition-fast);
}
```

:::

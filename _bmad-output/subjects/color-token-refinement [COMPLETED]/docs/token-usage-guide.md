# Token Usage Guide

**Design System:** Lufa Design System  
**Version:** v0.8.0+  
**Last Updated:** 2026-01-26

---

## Overview

This guide provides comprehensive instructions for using Lufa Design System tokens effectively, including high-contrast support, alpha/opacity tokens, and best practices.

---

## Token Architecture

Lufa uses a 4-tier token hierarchy:

```
Primitive → Core → Semantic → Component
```

### 1. Primitive Tokens

**Direct color values** - Never use in components

```json
{
  "primitive": {
    "color": {
      "blue": { "600": "#0066cc" },
      "hc": { "blue": "#0000ff" },
      "alpha": { "black": { "50": "rgba(0,0,0,0.5)" } }
    }
  }
}
```

### 2. Core Tokens

**Brand/neutral/semantic abstractions** - Reference primitives

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "modes": {
          "high-contrast": "{primitive.color.hc.blue}"
        }
      }
    }
  }
}
```

### 3. Semantic Tokens

**UI-level tokens** - Reference core tokens

```json
{
  "semantic": {
    "ui": {
      "text-primary": {
        "$value": "{core.neutral.text-primary}"
      }
    }
  }
}
```

### 4. Component Tokens

**Component-specific** - Reference semantic tokens

```json
{
  "component": {
    "button": {
      "primary-background": {
        "$value": "{core.brand.primary}"
      }
    }
  }
}
```

---

## Using Tokens in Components

### CSS

```css
/* ✅ Correct - Use CSS custom properties */
.my-component {
  background-color: var(--lufa-semantic-ui-background-surface);
  color: var(--lufa-semantic-ui-text-primary);
  border: 1px solid var(--lufa-semantic-ui-border-default);
}

/* ❌ Incorrect - Never hard-code colors */
.my-component {
  background-color: #ffffff;
  color: #1a1a1a;
}
```

### React/TypeScript

```typescript
import { Box } from '@grasdouble/lufa_design-system-main';

// ✅ Correct - Use component props
<Box
  background="surface"
  color="text-primary"
  borderColor="default"
>
  Content
</Box>

// ✅ Also correct - Use CSS custom properties
<div style={{
  backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
  color: 'var(--lufa-semantic-ui-text-primary)'
}}>
  Content
</div>
```

---

## High-Contrast Mode

### Automatic HC Support

All semantic tokens automatically adapt to high-contrast mode:

```css
/* Automatically changes based on data-mode attribute */
.my-text {
  color: var(--lufa-semantic-ui-text-primary);
  /* Light mode: #1a1a1a (dark gray) */
  /* Dark mode: #f5f5f5 (light gray) */
  /* HC mode: #000000 (pure black) */
}
```

### Enabling HC Mode

```typescript
// Set on document root
document.documentElement.setAttribute('data-mode', 'high-contrast');

// Or use React
function App() {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  return <button onClick={() => setMode('high-contrast')}>HC Mode</button>;
}
```

### HC Primitives

Use HC primitives when you need guaranteed WCAG AAA contrast:

```css
/* For text that must be readable in ALL modes */
.critical-text {
  color: var(--lufa-primitive-color-hc-black);
  background: var(--lufa-primitive-color-hc-white);
  /* Always 21:1 contrast ratio */
}
```

**Available HC Primitives:**

- `--lufa-primitive-color-hc-black` (#000000)
- `--lufa-primitive-color-hc-white` (#ffffff)
- `--lufa-primitive-color-hc-blue` (#0000ff)
- `--lufa-primitive-color-hc-red` (#ff0000)
- `--lufa-primitive-color-hc-green` (#00ff00)
- `--lufa-primitive-color-hc-yellow` (#ffff00)

---

## Alpha/Opacity Tokens

### Semantic Alpha Tokens (Recommended)

Use semantic tokens for common UI patterns:

```css
/* Modal backdrop */
.modal-backdrop {
  background: var(--lufa-semantic-ui-overlay-backdrop);
  /* Light: rgba(0,0,0,0.5) */
  /* Dark: rgba(0,0,0,0.8) */
  /* HC: rgba(0,0,0,0.9) */
}

/* Hover state */
.list-item:hover {
  background: var(--lufa-semantic-ui-overlay-hover);
  /* Light: rgba(0,0,0,0.04) */
  /* Dark: rgba(255,255,255,0.08) */
  /* HC: rgba(255,255,255,0.16) */
}

/* Pressed state */
.button:active {
  background: var(--lufa-semantic-ui-overlay-pressed);
  /* Light: rgba(0,0,0,0.08) */
  /* Dark: rgba(255,255,255,0.16) */
}

/* Selected state */
.menu-item[aria-selected='true'] {
  background: var(--lufa-semantic-ui-overlay-selected);
  /* Light: rgba(0,0,0,0.16) */
  /* Dark: rgba(255,255,255,0.16) */
}

/* Drawer/sheet scrim */
.drawer-scrim {
  background: var(--lufa-semantic-ui-scrim);
  /* Light: rgba(0,0,0,0.38) */
  /* Dark: rgba(0,0,0,0.6) */
  /* HC: rgba(0,0,0,0.8) */
}
```

### Primitive Alpha Tokens (Advanced)

Use when you need specific opacity levels:

```css
/* Custom overlay with specific opacity */
.my-overlay {
  background: var(--lufa-primitive-color-alpha-black-60); /* 60% opacity */
}

/* Light overlay on dark background */
.dark-bg-hover {
  background: var(--lufa-primitive-color-alpha-white-8); /* 8% white */
}
```

**Available Alpha Levels:**

- Black: 4%, 8%, 16%, 38%, 50%, 60%, 80%, 90%, 100%
- White: 4%, 8%, 16%, 38%, 50%, 60%, 80%, 90%, 100%

---

## Interactive States

### Disabled States

```css
/* Use semantic opacity token */
.button:disabled {
  opacity: var(--lufa-semantic-interactive-disabled-opacity); /* 0.38 */
  cursor: not-allowed;
}
```

### Loading States

```css
/* Loading indicator overlay */
.loading {
  opacity: var(--lufa-semantic-interactive-loading-opacity); /* 0.6 */
}
```

### Placeholder Text

```css
/* Form input placeholder */
input::placeholder {
  opacity: var(--lufa-semantic-interactive-placeholder-opacity); /* 0.5 */
  color: var(--lufa-semantic-ui-text-tertiary);
}
```

### Focus States

```css
/* Focus background */
.focusable:focus {
  background: var(--lufa-semantic-interactive-focus-background);
  outline: 2px solid var(--lufa-core-brand-primary);
}
```

### Selected States

```css
/* Selected list item */
.list-item[aria-selected='true'] {
  background: var(--lufa-semantic-interactive-selected-background);
  color: var(--lufa-semantic-interactive-selected-text);
}
```

---

## Button Variants

### Using Button Tokens

```css
/* Warning button */
.button-warning {
  background: var(--lufa-semantic-button-warning-background);
  color: var(--lufa-semantic-button-warning-text);
}

.button-warning:hover {
  background: var(--lufa-semantic-button-warning-background-hover);
}

/* Info button */
.button-info {
  background: var(--lufa-semantic-button-info-background);
  color: var(--lufa-semantic-button-info-text);
}

.button-info:hover {
  background: var(--lufa-semantic-button-info-background-hover);
}
```

### All Available Button Variants

- Primary: `semantic.button.primary-*`
- Secondary: `semantic.button.secondary-*`
- Success: `semantic.button.success-*`
- Destructive: `semantic.button.destructive-*`
- Warning: `semantic.button.warning-*` (NEW in v0.8.0)
- Info: `semantic.button.info-*` (NEW in v0.8.0)
- Outline: `semantic.button.outline-*`
- Ghost: `semantic.button.ghost-*`

---

## Best Practices

### ✅ DO

1. **Use semantic tokens** - Always start with semantic layer
2. **Respect token hierarchy** - Components → Semantic → Core → Primitive
3. **Use mode-aware tokens** - Let tokens handle light/dark/HC automatically
4. **Use semantic overlays** - Don't hard-code rgba() values
5. **Test in all modes** - Verify light, dark, and high-contrast

### ❌ DON'T

1. **Hard-code colors** - Never use hex values directly
2. **Skip token layers** - Don't reference primitives from components
3. **Use magic numbers** - Use semantic opacity tokens instead of 0.38
4. **Override HC colors** - Let the system handle high-contrast
5. **Ignore accessibility** - Always test contrast ratios

---

## Common Patterns

### Modal/Dialog

```css
.modal-backdrop {
  background: var(--lufa-semantic-ui-overlay-backdrop);
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--lufa-semantic-ui-background-surface);
  border: 1px solid var(--lufa-semantic-ui-border-default);
  box-shadow: var(--lufa-semantic-ui-shadow-extra-large);
}
```

### Card Component

```css
.card {
  background: var(--lufa-semantic-ui-background-surface);
  border: 1px solid var(--lufa-semantic-ui-border-default);
}

.card:hover {
  background: var(--lufa-semantic-ui-overlay-hover);
}
```

### List Item

```css
.list-item {
  color: var(--lufa-semantic-ui-text-primary);
}

.list-item:hover {
  background: var(--lufa-semantic-ui-overlay-hover);
}

.list-item:active {
  background: var(--lufa-semantic-ui-overlay-pressed);
}

.list-item[aria-selected='true'] {
  background: var(--lufa-semantic-ui-overlay-selected);
  color: var(--lufa-semantic-interactive-selected-text);
}
```

### Alert/Banner

```css
/* Success alert */
.alert-success {
  background: var(--lufa-semantic-ui-background-success);
  color: var(--lufa-semantic-ui-background-on-success);
  border-left: 4px solid var(--lufa-semantic-ui-border-success);
}

/* Error alert */
.alert-error {
  background: var(--lufa-semantic-ui-background-error);
  color: var(--lufa-semantic-ui-background-on-error);
  border-left: 4px solid var(--lufa-semantic-ui-border-error);
}
```

---

## Migration Guide

### From v0.7.x to v0.8.0

**Breaking Change:** `semantic.ui.background-overlay` removed

```diff
# CSS
- background: var(--lufa-semantic-ui-background-overlay);
+ background: var(--lufa-semantic-ui-overlay-backdrop);

# JSON
- "$value": "{semantic.ui.background-overlay}"
+ "$value": "{semantic.ui.overlay-backdrop}"
```

**New Features Available:**

- HC primitives (`primitive.color.hc.*`)
- Alpha tokens (`primitive.color.alpha.*`)
- Semantic overlays (`semantic.ui.overlay-*`)
- Interactive states (`semantic.interactive.*`)
- Button variants (`semantic.button.warning-*`, `semantic.button.info-*`)

---

## Troubleshooting

### Token not updating in HC mode

**Problem:** Token doesn't change when switching to high-contrast mode

**Solution:** Ensure you're using a semantic token, not a primitive:

```css
/* ❌ Won't adapt to HC mode */
color: var(--lufa-primitive-color-gray-900);

/* ✅ Adapts automatically */
color: var(--lufa-semantic-ui-text-primary);
```

### Overlay not visible

**Problem:** Overlay is too subtle or not visible

**Solution:** Use the correct semantic overlay token:

```css
/* ❌ Too subtle */
background: var(--lufa-semantic-ui-overlay-hover);

/* ✅ Correct for backdrops */
background: var(--lufa-semantic-ui-overlay-backdrop);
```

### Button colors wrong in HC mode

**Problem:** Button doesn't have enough contrast in HC mode

**Solution:** Use button semantic tokens, not core tokens:

```css
/* ❌ May not have HC support */
background: var(--lufa-core-semantic-warning);

/* ✅ Full HC support */
background: var(--lufa-semantic-button-warning-background);
```

---

## Resources

- [High-Contrast Mode Guide](./high-contrast-guide.md)
- [Testing Strategy](./testing-strategy.md)
- [Token Architecture Docs](../../../packages/design-system/_docs/token-architecture.md)
- [ADR-003: High-Contrast Token Strategy](../../adrs/ADR-003-high-contrast-token-strategy.md)
- [ADR-004: Alpha/Opacity Token Architecture](../../adrs/ADR-004-alpha-opacity-token-architecture.md)

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-26  
**Maintained By:** Design System Team

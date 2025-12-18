---
sidebar_position: 4
---

# Shadows

Shadows create depth and visual hierarchy in your interface by simulating elevation.

## Shadow System

Lufa provides a set of elevation tokens that create consistent depth across your application.

### Shadow Tokens

```css
--lufa-shadow-xs: /* Subtle shadow for subtle elevation */ --lufa-shadow-sm:
  /* Small shadow for cards and buttons */
  --lufa-shadow-md: /* Medium shadow for dropdowns */
  --lufa-shadow-lg: /* Large shadow for modals */
  --lufa-shadow-xl: /* Extra large shadow for overlays */;
```

## Elevation Levels

Our shadow system represents different elevation levels:

### Level 0 - No Shadow

Flat elements at the base level of the interface.

```css
.flat-element {
  box-shadow: none;
}
```

### Level 1 - Subtle (xs)

Slightly raised elements like inactive cards.

```css
.card {
  box-shadow: var(--lufa-shadow-xs);
}
```

### Level 2 - Small (sm)

Interactive elements like buttons and cards on hover.

```css
.button:hover {
  box-shadow: var(--lufa-shadow-sm);
}
```

### Level 3 - Medium (md)

Floating elements like dropdowns and tooltips.

```css
.dropdown {
  box-shadow: var(--lufa-shadow-md);
}
```

### Level 4 - Large (lg)

Prominent elements like modals and dialogs.

```css
.modal {
  box-shadow: var(--lufa-shadow-lg);
}
```

### Level 5 - Extra Large (xl)

Maximum elevation for important overlays.

```css
.overlay {
  box-shadow: var(--lufa-shadow-xl);
}
```

## Usage

### Static Shadows

```css
.card {
  background-color: var(--lufa-color-background-primary);
  border-radius: var(--lufa-radius-md);
  padding: var(--lufa-spacing-lg);
  box-shadow: var(--lufa-shadow-sm);
}
```

### Interactive Shadows

Add depth on interaction:

```css
.interactive-card {
  box-shadow: var(--lufa-shadow-xs);
  transition: box-shadow 0.2s ease;
}

.interactive-card:hover {
  box-shadow: var(--lufa-shadow-md);
}

.interactive-card:active {
  box-shadow: var(--lufa-shadow-xs);
}
```

### With React Components

```tsx
<Card style={{ boxShadow: "var(--lufa-shadow-md)" }}>
  <Typography variant="h3">Elevated Card</Typography>
</Card>
```

## Best Practices

### Hierarchy

Use shadows to establish visual hierarchy:

1. **Background**: No shadow
2. **Cards**: xs or sm shadow
3. **Floating UI**: md shadow
4. **Modals**: lg shadow
5. **Critical overlays**: xl shadow

### Consistency

- Use the same shadow level for similar components
- Don't mix too many shadow levels in one view
- Increase shadow on hover for interactive elements

### Performance

```css
/* Use transform for better performance on hover */
.button {
  box-shadow: var(--lufa-shadow-sm);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.button:hover {
  box-shadow: var(--lufa-shadow-md);
  transform: translateY(-1px);
}
```

### Dark Mode

Shadows automatically adapt to dark mode. In dark themes, shadows might be more subtle or use different techniques for elevation.

## Common Patterns

### Cards

```css
.card {
  box-shadow: var(--lufa-shadow-sm);
  border-radius: var(--lufa-radius-md);
}

.card:hover {
  box-shadow: var(--lufa-shadow-md);
}
```

### Dropdowns

```css
.dropdown-menu {
  box-shadow: var(--lufa-shadow-md);
  border-radius: var(--lufa-radius-sm);
}
```

### Modals

```css
.modal {
  box-shadow: var(--lufa-shadow-lg);
  border-radius: var(--lufa-radius-lg);
}
```

### Buttons

```css
.button-elevated {
  box-shadow: var(--lufa-shadow-sm);
}

.button-elevated:hover {
  box-shadow: var(--lufa-shadow-md);
}

.button-elevated:active {
  box-shadow: var(--lufa-shadow-xs);
}
```

## Accessibility

- Don't rely solely on shadows to convey information
- Ensure interactive elements have other visual indicators
- Shadows should enhance, not define, the interface
- Test with users who have low vision

## Related

- [Colors →](./colors)
- [Spacing →](./spacing)
- [Border Radius →](../getting-started/theming)

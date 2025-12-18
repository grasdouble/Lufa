---
sidebar_position: 3
---

# Spacing

A consistent spacing system creates visual rhythm and improves the overall layout of your application.

## Spacing Scale

Lufa uses a standardized spacing scale based on a 4px baseline grid.

### Spacing Tokens

```css
--lufa-spacing-xs: 0.25rem; /* 4px */
--lufa-spacing-sm: 0.5rem; /* 8px */
--lufa-spacing-md: 1rem; /* 16px */
--lufa-spacing-lg: 1.5rem; /* 24px */
--lufa-spacing-xl: 2rem; /* 32px */
--lufa-spacing-2xl: 3rem; /* 48px */
--lufa-spacing-3xl: 4rem; /* 64px */
```

## Usage

### With CSS Variables

```css
.card {
  padding: var(--lufa-spacing-lg);
  margin-bottom: var(--lufa-spacing-md);
  gap: var(--lufa-spacing-sm);
}

.section {
  padding-block: var(--lufa-spacing-2xl);
  padding-inline: var(--lufa-spacing-xl);
}
```

### In Components

```tsx
<div
  style={{
    padding: 'var(--lufa-spacing-md)',
    gap: 'var(--lufa-spacing-sm)',
  }}
>
  <Button>Action</Button>
</div>
```

## Spacing Guidelines

### Component Spacing

- **xs (4px)**: Tight spacing within small components
- **sm (8px)**: Internal component spacing (e.g., button padding)
- **md (16px)**: Default spacing between related elements
- **lg (24px)**: Spacing between component groups
- **xl (32px)**: Spacing between sections
- **2xl (48px)**: Large section spacing
- **3xl (64px)**: Major page sections

### Layout Patterns

#### Stack (Vertical Spacing)

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-spacing-md);
}
```

#### Inline (Horizontal Spacing)

```css
.inline {
  display: flex;
  gap: var(--lufa-spacing-sm);
}
```

#### Grid

```css
.grid {
  display: grid;
  gap: var(--lufa-spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

## Responsive Spacing

Consider adjusting spacing for different screen sizes:

```css
.section {
  padding: var(--lufa-spacing-md);
}

@media (min-width: 768px) {
  .section {
    padding: var(--lufa-spacing-xl);
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--lufa-spacing-2xl);
  }
}
```

## Best Practices

### Consistency

- Use tokens instead of arbitrary values
- Stick to the scale for predictable layouts
- Use the same spacing for similar elements

### Optical Adjustments

Sometimes visual weight requires slight adjustments:

```css
/* Icons might need slightly less spacing due to visual weight */
.icon-button {
  padding: var(--lufa-spacing-sm);
}

/* Text might need more breathing room */
.text-content {
  padding: var(--lufa-spacing-lg);
}
```

### Negative Space

Don't be afraid of whitespace. It:

- Improves readability
- Creates visual hierarchy
- Reduces cognitive load
- Makes interfaces feel less cluttered

## Common Patterns

### Card Spacing

```css
.card {
  padding: var(--lufa-spacing-lg);
  gap: var(--lufa-spacing-md);
}
```

### Form Spacing

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-spacing-sm);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-spacing-lg);
}
```

### Button Groups

```css
.button-group {
  display: flex;
  gap: var(--lufa-spacing-sm);
}
```

## Related

- [Colors →](./colors)
- [Shadows →](./shadows)
- [Layout Examples →](../getting-started/usage)

---
title: Spacing
description: A guide in my new Starlight docs site.
---

# Spacing

A consistent spacing system creates visual rhythm and improves the overall layout of your application.

## Spacing Scale

Lufa uses a standardized spacing scale based on a 4px baseline grid.

### Spacing Tokens

```css
--lufa-token-spacing-none: 0;
--lufa-token-spacing-xxs: 2px;
--lufa-token-spacing-xs: 4px;
--lufa-token-spacing-2xs: 6px;
--lufa-token-spacing-sm: 8px;
--lufa-token-spacing-sm-md: 10px;
--lufa-token-spacing-md: 12px;
--lufa-token-spacing-base: 16px;
--lufa-token-spacing-md-lg: 20px;
--lufa-token-spacing-lg: 24px;
--lufa-token-spacing-lg-xl: 28px;
--lufa-token-spacing-xl: 32px;
--lufa-token-spacing-xl-2xl: 40px;
--lufa-token-spacing-2xl: 48px;
--lufa-token-spacing-2xl-3xl: 56px;
--lufa-token-spacing-3xl: 64px;
--lufa-token-spacing-3xl-4xl: 80px;
--lufa-token-spacing-4xl: 96px;
--lufa-token-spacing-5xl: 128px;
```

## Usage

### With CSS Variables

```css
.card {
  padding: var(--lufa-token-spacing-lg);
  margin-bottom: var(--lufa-token-spacing-md);
  gap: var(--lufa-token-spacing-sm);
}

.section {
  padding-block: var(--lufa-token-spacing-2xl);
  padding-inline: var(--lufa-token-spacing-xl);
}
```

### In Components

```tsx
<div
  style={{
    padding: 'var(--lufa-token-spacing-md)',
    gap: 'var(--lufa-token-spacing-sm)',
  }}
>
  <Button>Action</Button>
</div>
```

## Spacing Guidelines

### Component Spacing

- **xxs (2px)**: Micro spacing within tight UI
- **xs (4px)**: Tight spacing within small components
- **sm (8px)**: Internal component spacing (e.g., button padding)
- **base (16px)**: Default spacing between related elements
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
  gap: var(--lufa-token-spacing-md);
}
```

#### Inline (Horizontal Spacing)

```css
.inline {
  display: flex;
  gap: var(--lufa-token-spacing-sm);
}
```

#### Grid

```css
.grid {
  display: grid;
  gap: var(--lufa-token-spacing-lg);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

## Responsive Spacing

Consider adjusting spacing for different screen sizes:

```css
.section {
  padding: var(--lufa-token-spacing-md);
}

@media (min-width: 768px) {
  .section {
    padding: var(--lufa-token-spacing-xl);
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--lufa-token-spacing-2xl);
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
  padding: var(--lufa-token-spacing-sm);
}

/* Text might need more breathing room */
.text-content {
  padding: var(--lufa-token-spacing-lg);
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
  padding: var(--lufa-token-spacing-lg);
  gap: var(--lufa-token-spacing-md);
}
```

### Form Spacing

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-token-spacing-sm);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--lufa-token-spacing-lg);
}
```

### Button Groups

```css
.button-group {
  display: flex;
  gap: var(--lufa-token-spacing-sm);
}
```

## Related

- [Colors →](./colors)
- [Shadows →](./shadows)
- [Layout Examples →](../getting-started/usage)

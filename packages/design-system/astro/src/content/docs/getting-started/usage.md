---
title: Usage
description: A guide in my new Starlight docs site.
---

# Usage

Learn how to use Lufa Design System components in your React application.

## Basic Usage

After [installing](./installation) the design system, you can start using components in your React application.

### Importing Components

```tsx
import { Button, Card, Typography } from '@grasdouble/lufa_design-system';

import '@grasdouble/lufa_design-system/style.css';
```

### Using Components

```tsx
function App() {
  return (
    <div className="p-4">
      <Typography variant="h1">Welcome to Lufa</Typography>
      <Card>
        <Typography variant="body1">This is a card component with typography inside.</Typography>
        <Button variant="primary" onClick={() => alert('Clicked!')}>
          Click Me
        </Button>
      </Card>
    </div>
  );
}
```

## Working with Themes

Lufa Design System includes built-in theme support. Learn more about [theming](./theming).

### Accessing Theme Variables

You can use CSS custom properties (CSS variables) directly in your styles:

```css
.my-component {
  color: var(--lufa-token-color-text-primary);
  background-color: var(--lufa-token-color-background-primary);
  padding: var(--lufa-token-spacing-md);
  border-radius: var(--lufa-token-radius-md);
}
```

### Available Token Categories

- **Colors**: `--lufa-token-color-*`
- **Spacing**: `--lufa-token-spacing-*`
- **Typography**: `--lufa-token-font-family-*`, `--lufa-token-font-size-*`, `--lufa-token-font-weight-*`, `--lufa-token-line-height-*`, `--lufa-token-letter-spacing-*`, `--lufa-token-measure-*`
- **Shadows**: `--lufa-token-shadow-*`
- **Border Radius**: `--lufa-token-radius-*`

## Component Patterns

### Button Variants

```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outlined Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

### Typography Variants

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Caption text</Typography>
```

### Card Composition

```tsx
<Card>
  <Typography variant="h3">Card Title</Typography>
  <Typography variant="body2">
    Card content goes here. Cards are flexible containers that can hold any content.
  </Typography>
  <Button variant="primary">Action</Button>
</Card>
```

## Accessibility

All Lufa components are built with accessibility in mind:

- Semantic HTML elements
- ARIA attributes where appropriate
- Keyboard navigation support
- Screen reader friendly
- Focus management

## TypeScript Support

Lufa Design System is written in TypeScript and provides full type definitions:

```tsx
import type { ButtonProps, TypographyProps } from '@grasdouble/lufa_design-system';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Next Steps

- [Explore theming options →](./theming)
- [Browse all components →](../components/overview)
- [View component examples in Storybook →](http://localhost:6006)

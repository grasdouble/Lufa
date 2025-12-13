---
sidebar_position: 0
---

# Component Overview

Explore the complete collection of components in the Lufa Design System.

## Available Components

### Core Components

#### [Button](./forms/button)

Interactive buttons for actions and navigation with multiple variants.

```tsx
<Button variant="primary">Click Me</Button>
```

#### [Card](./display/card)

Flexible container for grouping related content.

```tsx
<Card>
  <Typography variant="h3">Title</Typography>
  <Typography variant="body1">Content</Typography>
</Card>
```

#### [Typography](./typography)

Text display component with semantic variants.

```tsx
<Typography variant="h1">Heading</Typography>
<Typography variant="body1">Body text</Typography>
```

## Component Categories

### Layout Components

- **Card** - Content containers
- **Grid** - (Coming soon) Layout grid system
- **Stack** - (Coming soon) Vertical/horizontal stacking

### Form Components

- **Button** - Actions and submissions
- **Input** - (Coming soon) Text input fields
- **Select** - (Coming soon) Dropdown selections
- **Checkbox** - (Coming soon) Toggle options
- **Radio** - (Coming soon) Single choice options

### Typography Components

- **Typography** - Text display
- **Heading** - (Coming soon) Specialized headings
- **Text** - (Coming soon) Body text wrapper

### Feedback Components

- **Alert** - (Coming soon) Status messages
- **Toast** - (Coming soon) Notifications
- **Spinner** - (Coming soon) Loading indicator

### Navigation Components

- **Link** - (Coming soon) Navigation links
- **Menu** - (Coming soon) Navigation menus
- **Tabs** - (Coming soon) Tabbed navigation

## Component Features

All Lufa components share these characteristics:

### Accessible

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA attributes

### Themeable

- Respects light/dark mode
- Uses semantic design tokens
- Customizable via CSS variables
- Consistent styling

### TypeScript

- Full type definitions
- IntelliSense support
- Type-safe props
- Generic component types

### Responsive

- Mobile-first design
- Flexible layouts
- Touch-friendly sizing
- Adaptive spacing

## Usage

### Import Components

```tsx
import { Button, Card, Typography } from "@grasdouble/lufa_design-system";
```

### Import Styles

```tsx
import "@grasdouble/lufa_design-system/style.css";
```

### Use in Your App

```tsx
function App() {
  return (
    <Card>
      <Typography variant="h2">Welcome</Typography>
      <Typography variant="body1">
        Start building with Lufa components.
      </Typography>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## Design Principles

### Consistency

Components follow consistent patterns for props, styling, and behavior.

### Composability

Components work well together and can be composed to create complex UIs.

### Flexibility

Components provide sensible defaults but allow customization when needed.

### Performance

Optimized for fast rendering and minimal bundle size.

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Storybook

Explore interactive examples in [Storybook](http://localhost:6006).

## Related

- [Getting Started →](../getting-started/installation)
- [Usage Guide →](../getting-started/usage)
- [Theming →](../getting-started/theming)
- [Design Tokens →](../tokens/colors)

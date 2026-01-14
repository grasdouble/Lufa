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
<Button variant="solid" color="primary">
  Click Me
</Button>
```

#### [Card](./display/card)

Flexible container for grouping related content.

```tsx
<Card>
  <Typography variant="h3">Title</Typography>
  <Typography variant="body">Content</Typography>
</Card>
```

#### [Avatar](./display/avatar)

Profile image component with size/shape variants and optional status indicator.

```tsx
<Avatar src="/image.jpg" alt="Jane Doe" status="online" />
```

#### [AvatarGroup](./display/avatar-group)

Overlapped set of avatars with an optional "+N" count when truncated.

```tsx
<AvatarGroup max={3}>
  <Avatar src="/a.jpg" />
  <Avatar src="/b.jpg" />
  <Avatar src="/c.jpg" />
  <Avatar src="/d.jpg" />
</AvatarGroup>
```

#### [Badge](./display/badge)

Compact label for statuses, tags, and counters.

```tsx
<Badge variant="success" dot rounded>
  Synced
</Badge>
```

#### [Alert](./feedback/alert)

Inline feedback message for communicating info, success, warning, or error states.

```tsx
<Alert variant="warning" title="Heads up">
  Please double-check your input.
</Alert>
```

#### [Spinner](./feedback/spinner)

Loading indicator for async content and background operations.

```tsx
<Spinner size="small" />
```

#### [Typography](./typography)

Text display component with semantic variants.

```tsx
<Typography variant="h1">Heading</Typography>
<Typography variant="body">Body text</Typography>
```

## Component Categories

### Layout Components

- **Container** - Page-level max-width container
- **Grid** - Token-driven grid system
- **Layout** - Page scaffold (header/sidebar/content/footer)
- **Stack** - Vertical/horizontal stacking
- **Divider** - Section separators
- **Placeholder** - Prototyping blocks
- **Space** - Simple spacer utility
- **AspectRatio** - Media ratio container
- **Center** - Flex centering helper
- **Flex** - Generic flex container

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

- **Alert** - Status messages
- **Spinner** - Loading indicator
- **Toast** - (Coming soon) Notifications

### Display Components

- **Card** - Surface container
- **Avatar** - Profile image
- **AvatarGroup** - Group of avatars with count
- **Badge** - Label / status indicator

### Navigation Components

- **Link** - Navigation links
- **Menu** - Navigation menus
- **Tabs** - Tabbed navigation

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
import { Button, Card, Typography } from '@grasdouble/lufa_design-system';
```

### Import Styles

```tsx
import '@grasdouble/lufa_design-system/style.css';
```

### Use in Your App

```tsx
function App() {
  return (
    <Card>
      <Typography variant="h2">Welcome</Typography>
      <Typography variant="body">Start building with Lufa components.</Typography>
      <Button variant="solid" color="primary">
        Get Started
      </Button>
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

Explore interactive examples in [Storybook](https://lufa-design.sebastien-lemouillour.fr).

## Related

- [Getting Started →](../getting-started/installation)
- [Usage Guide →](../getting-started/usage)
- [Theming →](../getting-started/theming)
- [Design Tokens →](../tokens/colors)

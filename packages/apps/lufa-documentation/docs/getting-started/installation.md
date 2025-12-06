---
sidebar_position: 1
---

# Installation

Get started with Lufa Design System in your React project.

## Prerequisites

- Node.js 18+ and pnpm
- React 19+
- Tailwind CSS v4

## Installation

Install the design system package:

```bash
pnpm add @grasdouble/lufa_design-system
```

## Setup

### 1. Import CSS

Import the design system CSS in your main entry file:

```tsx title="src/main.tsx"
// For full Tailwind integration (recommended)
import "@grasdouble/lufa_design-system/tailwind.css";

// OR for standalone usage without Tailwind utilities
import "@grasdouble/lufa_design-system/style.css";
```

### 2. Configure Tailwind (Optional)

If you're using Tailwind utilities in your app, extend your `tailwind.config.js`:

```js title="tailwind.config.js"
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@grasdouble/lufa_design-system/dist/**/*.{js,mjs}",
  ],
  // Your config...
};
```

### 3. Start Using Components

```tsx
import { Button, Typography } from "@grasdouble/lufa_design-system";

function App() {
  return (
    <>
      <Typography variant="h1">Hello Lufa!</Typography>
      <Button variant="primary">Get Started</Button>
    </>
  );
}
```

## Next Steps

- [Learn about usage patterns →](./usage)
- [Explore theming options →](./theming)
- [Browse components in Storybook →](http://localhost:6006)

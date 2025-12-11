---
sidebar_position: 1
---

# Installation

Get started with Lufa Design System in your React project.

## Prerequisites

- Node.js 18+
- React 19+
- Package manager: pnpm, npm, or yarn

## Installation

Install the design system package using your preferred package manager:

```bash
# Using pnpm
pnpm add @grasdouble/lufa_design-system

# Using npm
npm install @grasdouble/lufa_design-system

# Using yarn
yarn add @grasdouble/lufa_design-system
```

## Setup

### 1. Import Styles

Import the design system CSS in your application's entry point:

```tsx title="src/main.tsx"
import "@grasdouble/lufa_design-system/style.css";
```

This includes all component styles and design tokens (CSS variables) needed by the design system.

### 2. Import Components

Import and use components in your React application:

```tsx title="src/App.tsx"
import { Button, Card, Typography } from "@grasdouble/lufa_design-system";

function App() {
  return (
    <Card>
      <Typography variant="h1">Welcome to Lufa</Typography>
      <Typography variant="body1">
        A modern, accessible design system.
      </Typography>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

### 3. Using Design Tokens

You can use design tokens (CSS variables) in your custom styles:

```css title="src/styles.css"
.my-component {
  color: var(--lufa-color-text-primary);
  background-color: var(--lufa-color-background-primary);
  padding: var(--lufa-spacing-md);
  border-radius: var(--lufa-radius-md);
  box-shadow: var(--lufa-shadow-sm);
}
```

Or with inline styles:

```tsx
<div
  style={{
    padding: "var(--lufa-spacing-lg)",
    backgroundColor: "var(--lufa-color-background-secondary)",
  }}
>
  Content
</div>
```

## TypeScript Support

Lufa Design System is written in TypeScript and provides full type definitions. TypeScript will automatically detect component props and provide IntelliSense:

```tsx
import type {
  ButtonProps,
  TypographyProps,
} from "@grasdouble/lufa_design-system";

// Full type safety and autocompletion
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Framework Integration

### Vite

Lufa works out of the box with Vite. Just import the CSS and components:

```tsx title="src/main.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import "@grasdouble/lufa_design-system/style.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Next.js

Import the CSS in your root layout or `_app.tsx`:

```tsx title="app/layout.tsx"
import "@grasdouble/lufa_design-system/style.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Create React App

Import the CSS in `src/index.tsx`:

```tsx title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import "@grasdouble/lufa_design-system/style.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Build Tool Configuration

No special build configuration is required. Lufa Design System:

- ✅ Works with any React bundler (Vite, Webpack, Rollup, etc.)
- ✅ Includes pre-compiled styles (no CSS processing needed)
- ✅ Uses standard ES modules
- ✅ Provides CSS variables for theming
- ✅ No peer dependencies except React

## Verifying Installation

Create a simple test component to verify everything is working:

```tsx title="src/Test.tsx"
import { Button, Typography } from "@grasdouble/lufa_design-system";

export function Test() {
  return (
    <div style={{ padding: "var(--lufa-spacing-xl)" }}>
      <Typography variant="h2">Lufa Design System</Typography>
      <Typography variant="body1">
        If you can see this styled text and button, installation is successful!
      </Typography>
      <Button variant="primary" onClick={() => alert("It works!")}>
        Click Me
      </Button>
    </div>
  );
}
```

## Troubleshooting

### Styles Not Loading

If component styles aren't appearing:

1. Verify you've imported the CSS file:

   ```tsx
   import "@grasdouble/lufa_design-system/style.css";
   ```

2. Check the import is at the top level of your application (before any component imports)

3. Clear your build cache and restart your dev server

### TypeScript Errors

If you see "Cannot find module" errors:

1. Ensure `@grasdouble/lufa_design-system` is installed
2. Restart your TypeScript server (VS Code: Command + Shift + P → "Restart TS Server")
3. Check that your `tsconfig.json` includes `"moduleResolution": "node"` or `"moduleResolution": "bundler"`

### CSS Variables Not Working

If CSS variables appear as plain text:

1. Ensure the design system CSS is imported before your custom styles
2. Check browser DevTools to verify CSS variables are defined on `:root`
3. Verify your CSS file is being processed correctly by your bundler

## Next Steps

- [Learn about usage patterns →](./usage)
- [Explore theming options →](./theming)
- [Browse all components →](../components/overview)
- [Understand design Tokens →](../tokens/colors)

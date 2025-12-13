# Storybook Architecture

> **Last Updated**: December 13, 2025  
> **Package**: `@grasdouble/lufa_design-system-storybook`  
> **Location**: `packages/design-system/storybook/`  
> **Version**: Storybook 10.1.4

## Overview

Storybook serves as the interactive component documentation and development environment for the Lufa Design System. It provides a sandbox for building, testing, and documenting components in isolation.

**Live Deployment**: [lufa-storybook.sebastien-lemouillour.fr](https://lufa-storybook.sebastien-lemouillour.fr)

> **Development Guide**: See [../../rules/design-system/STORYBOOK.md](../../rules/design-system/STORYBOOK.md) for story writing guidelines

## Architecture

### Package Structure

```
packages/design-system/storybook/
├── .storybook/                 # Configuration
│   ├── main.ts                # Core Storybook config
│   ├── preview.tsx            # Global decorators & parameters
│   └── breakpoints.ts         # Viewport definitions
│
├── src/
│   ├── stories/               # Story files
│   │   ├── components/       # Component stories (organized by category)
│   │   │   ├── display/     # Display component stories
│   │   │   ├── feedback/    # Feedback component stories
│   │   │   ├── forms/       # Form component stories
│   │   │   ├── layout/      # Layout component stories
│   │   │   ├── overlay/     # Overlay component stories
│   │   │   └── patterns/    # Pattern stories
│   │   ├── primitives/       # Primitive documentation stories
│   │   ├── tokens/           # Design token stories
│   │   └── utilities/        # Utility documentation
│   ├── components/           # Storybook-specific helper components
│   └── style.css             # Storybook-specific styles
│
├── storybook-static/          # Build output
├── package.json
└── vite.config.ts
```

### Technology Stack

- **Storybook**: v10.1.4
- **Framework**: `@storybook/react-vite`
- **Addons**:
  - `@storybook/addon-themes` - Theme switching (light/dark)
  - `@storybook/addon-docs` - Auto-generated documentation
- **Build Tool**: Vite 7

## Story Organization

### Naming Convention

Stories are organized with numeric prefixes for consistent ordering:

```
1. Tokens/           # Design tokens (colors, spacing, etc.)
2. Layout/           # Layout components
3. Forms/            # Form components
4. Display/          # Display components
5. Feedback/         # Feedback components
6. Overlay/          # Overlay components
7. Patterns/         # Composite patterns
8. Primitives/       # CSS primitives
9. Utilities/        # Utility documentation
```

### Story File Structure

Each component story follows this pattern:

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComponentName } from "@grasdouble/lufa_design-system";

const meta = {
  title: "3. Forms/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Component description",
      },
    },
  },
  tags: [],
  argTypes: {
    // Prop documentation
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// First story is always "Playground"
export const Playground: Story = {
  args: {
    /* default props */
  },
};

// Additional variant stories
export const Variant1: Story = {
  /* ... */
};
export const Variant2: Story = {
  /* ... */
};
```

## Configuration

### Main Configuration (.storybook/main.ts)

```typescript
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: ["@storybook/addon-themes", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
```

**Key Features**:

- **Auto-discovery**: Finds all `.stories.tsx` files
- **TypeScript support**: Full type extraction for props
- **React-docgen**: Automatic prop documentation

### Preview Configuration (.storybook/preview.tsx)

#### Theme Support

Dual theme system (light/dark) using two strategies:

1. **Data attribute**: `data-theme="dark|light"`
2. **Class name**: `class="theme-dark|theme-light"`

```typescript
const decorators = [
  withThemeByDataAttribute({
    themes: { light: "light", dark: "dark" },
    defaultTheme: "light",
    attributeName: "data-theme",
  }),
  withThemeByClassName({
    themes: { light: "light", dark: "dark" },
    defaultTheme: "light",
  }),
];
```

#### Viewport Configuration

Custom viewports matching design system breakpoints:

```typescript
storybookViewports = {
  mobile: { width: "375px" },
  tablet: { width: "768px" },
  desktop: { width: "1024px" },
  wide: { width: "1280px" },
};
```

#### Story Sorting

Custom sort algorithm:

1. **Category order**: Numeric prefixes (1. Tokens, 2. Layout, etc.)
2. **Playground first**: Within each component, "Playground" story appears first
3. **Alphabetical**: Other stories sorted alphabetically

```typescript
storySort: (a, b) => {
  // Sort by category (numeric)
  const titleCompare = a.title.localeCompare(b.title, { numeric: true });
  if (titleCompare !== 0) return titleCompare;

  // Playground always first
  if (a.name === "Playground") return -1;
  if (b.name === "Playground") return 1;

  // Alphabetical for others
  return a.id.localeCompare(b.id);
};
```

## Dark Mode Implementation

Custom decorator handles dark mode backgrounds:

```typescript
export const hackDecoratorDarkMode: Decorator = (story, context) => {
  const isDarkMode = context?.globals?.theme === "dark";
  const darkColor = "#333";
  const lightColor = "#ffffff";

  // Apply background to docs mode
  const styleContentForDocs = `
    .docs-story {
      background-color: ${isDarkMode ? darkColor : lightColor};
    }`;

  // Apply background to story canvas
  const styleContentForStories = `
    .dark,
    [data-theme="dark"] {
      background-color: #333;
    }`;

  return (
    <>
      <style>{styleContentForDocs}</style>
      <style>{styleContentForStories}</style>
      {story(context)}
    </>
  );
};
```

## Dependencies

### Runtime Dependencies

```json
{
  "@grasdouble/lufa_design-system": "workspace:^",
  "@grasdouble/lufa_design-system-tokens": "workspace:^",
  "@grasdouble/lufa_design-system-primitives": "workspace:^",
  "react": "^19.2.1",
  "react-dom": "^19.2.1"
}
```

**All design system packages** are imported from workspace for live development.

### Dev Dependencies

```json
{
  "storybook": "^10.1.4",
  "@storybook/react-vite": "^10.1.4",
  "@storybook/addon-docs": "^10.1.4",
  "@storybook/addon-themes": "^10.1.4",
  "vite": "^7.2.6"
}
```

## Build & Deployment

### Development Server

```bash
pnpm dev
# Runs on http://localhost:6006
# --no-open flag prevents auto-opening browser
```

**Hot Reload**: Changes to design system components trigger automatic reload.

### Production Build

```bash
pnpm build
```

**Output**: `storybook-static/` directory containing:

- Static HTML/CSS/JS files
- All component documentation
- Search index
- Asset files

### Deployment Flow

1. Build Storybook: `pnpm build`
2. Deploy `storybook-static/` to static hosting
3. Accessible at: [lufa-storybook.sebastien-lemouillour.fr](https://lufa-storybook.sebastien-lemouillour.fr)

## Story Categories

### 1. Tokens

Visual documentation of design tokens:

- Colors (primitives + semantic)
- Typography scale
- Spacing system
- Shadows & borders
- Breakpoints
- Motion & transitions

### 2-7. Components

Interactive component documentation:

- **Layout**: Container, Grid, Stack, Divider
- **Forms**: Button, Input, Select, Checkbox, Radio
- **Display**: Card, Badge, Avatar, Typography, Image
- **Feedback**: Alert, Toast, Progress, Spinner
- **Overlay**: Modal, Dropdown, Tooltip, Popover
- **Patterns**: Form layouts, navigation patterns

### 8. Primitives

Documentation of CSS primitives (custom properties)

### 9. Utilities

Helper functions and utility documentation

## Integration Points

### Design System

Storybook imports the **compiled** design system package:

```typescript
import { Button, Card, ... } from '@grasdouble/lufa_design-system';
import '@grasdouble/lufa_design-system/style.css';
```

**Workflow**:

1. Make changes to design system components
2. Design system rebuilds (watch mode: `pnpm dev`)
3. Storybook detects changes and hot-reloads

### Documentation Site

Storybook complements the Docusaurus documentation site:

- **Storybook**: Interactive playground, visual testing
- **Docusaurus**: Guides, tutorials, architecture docs

## Best Practices

### Story Organization

✅ **Do**:

- Use numeric prefixes for categories
- Put "Playground" story first
- Document all props with argTypes
- Include component descriptions

❌ **Don't**:

- Mix story categories
- Skip prop documentation
- Use ambiguous story names

### Theme Testing

✅ **Do**:

- Test components in both light and dark modes
- Use theme switcher in toolbar
- Verify color contrast

❌ **Don't**:

- Hardcode theme-specific colors
- Assume default theme

### Performance

✅ **Do**:

- Lazy load heavy components
- Optimize story asset sizes
- Use code splitting

❌ **Don't**:

- Import entire icon libraries
- Load unnecessary dependencies

## Troubleshooting

### Common Issues

**Issue**: Stories not appearing

- **Solution**: Check file naming (must end in `.stories.tsx`)
- **Solution**: Verify story export syntax

**Issue**: Dark mode not working

- **Solution**: Ensure component uses CSS custom properties
- **Solution**: Check theme decorator configuration

**Issue**: Slow build times

- **Solution**: Clear Storybook cache: `rm -rf node_modules/.cache`
- **Solution**: Optimize story imports

**Issue**: TypeScript errors in stories

- **Solution**: Verify `Meta` and `StoryObj` types are correct
- **Solution**: Check component prop types match story args

## Future Enhancements

Potential additions:

- `@storybook/addon-interactions` - Interaction testing
- `@storybook/addon-a11y` - Accessibility testing
- `@chromatic-com/storybook` - Visual regression testing
- Component tests using `@storybook/experimental-addon-test`

---

**Related Documentation**:

- [Development Rules](../../rules/design-system/STORYBOOK.md) - How to write stories
- [Design System Overview](./DESIGN_SYSTEM.md) - Parent architecture
- [Main Package](./MAIN.md) - Component architecture

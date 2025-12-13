# Design System Storybook - Development Rules

> **Package**: `@grasdouble/lufa_design-system-storybook`  
> **Location**: `packages/design-system/storybook/`  
> **Last Updated**: December 13, 2025

## Overview

Storybook provides interactive component documentation and testing environment.

**Deployed**: [lufa-storybook.sebastien-lemouillour.fr](https://lufa-storybook.sebastien-lemouillour.fr)

## 📦 Structure

```
packages/design-system/storybook/
├── stories/                # Component stories
│   ├── Button.stories.tsx
│   └── ...
├── .storybook/            # Storybook configuration
│   ├── main.ts
│   └── preview.ts
└── package.json
```

## ✏️ Creating Stories

### Basic Story

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@grasdouble/lufa_design-system";

const meta: Meta<typeof ComponentName> = {
  title: "Components/{Category}/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: "Content",
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: "primary",
  },
};
```

### Multiple Variants

```typescript
export const AllSizes: Story = {
  render: () => (
    <>
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="md">Medium</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </>
  ),
};
```

## 🚀 Commands

```bash
pnpm dev     # Start Storybook dev server
pnpm build   # Build static Storybook
```

## 📚 Related Documentation

- **Main Package**: [`MAIN.md`](MAIN.md)

---

**Last Updated**: December 13, 2025

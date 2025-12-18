# Design System Docusaurus - Development Rules

> **Package**: `@grasdouble/lufa_design-system-documentation`  
> **Location**: `packages/design-system/documentation/`  
> **Last Updated**: December 13, 2025

## Overview

Docusaurus site for comprehensive design system documentation.

**Deployed**: [lufa-design.sebastien-lemouillour.fr](https://lufa-design.sebastien-lemouillour.fr)

## 📦 Structure

```
packages/design-system/documentation/
├── docs/                   # Documentation content
│   ├── components/        # Component docs
│   ├── tokens/           # Token docs
│   └── getting-started/  # Guides
├── src/                   # React components
├── docusaurus.config.ts  # Configuration
└── package.json
```

## ✏️ Adding Component Documentation

Create MDX file in `docs/components/{category}/{component}.mdx`:

```mdx
---
sidebar_position: 1
---

import { ComponentName } from '@grasdouble/lufa_design-system';

# ComponentName

Component description.

## Usage

\`\`\`jsx
import { ComponentName } from '@grasdouble/lufa_design-system';

<ComponentName variant="primary">Content</ComponentName>
\`\`\`

## Live Example

<ComponentName variant="primary">Click me</ComponentName>

## Props

| Prop    | Type   | Default   | Description    |
| ------- | ------ | --------- | -------------- |
| variant | string | 'default' | Visual variant |
```

## 🚀 Commands

```bash
pnpm start   # Start dev server
pnpm build   # Build static site
pnpm clear   # Clear cache (IMPORTANT after design system updates!)
```

## ⚠️ Important: Cache Management

**Always clear cache after design system changes**:

```bash
pnpm clear
pnpm start
```

This prevents "Module not found" errors.

## 📚 Related Documentation

- **Main Package**: [`MAIN.md`](MAIN.md)

---

**Last Updated**: December 13, 2025

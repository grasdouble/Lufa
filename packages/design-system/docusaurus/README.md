[← Back to Design System Overview](../README.md)

# Lufa Design System Documentation

[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.x-3ECC5F?style=flat-square&logo=docusaurus)](https://docusaurus.io)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../LICENSE.md)

> Comprehensive documentation site for learning and using the Lufa Design System

**Part of the [Lufa Design System](../README.md)** - Documentation & Learning Resources

## Overview

This Docusaurus site provides everything you need to understand, implement, and contribute to the Lufa Design System. From getting started guides to detailed component specifications, it's your central resource for all design system knowledge.

### What You'll Find

- **Getting Started** - Installation, setup, and first steps
- **Design Principles** - Philosophy, accessibility, and design approach
- **Component Guide** - Detailed documentation for every component
- **Token Reference** - Complete design token specifications
- **Patterns** - Common UI patterns and best practices
- **Migration Guides** - Upgrading between versions
- **Tutorials** - Step-by-step learning paths
- **Blog** - Updates, releases, and announcements

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server (port 3000)
pnpm ds:documentation:dev

# Build for production
pnpm ds:documentation:build

# Preview build
pnpm ds:documentation:serve
```

Visit `http://localhost:3000` to view the site.

## Writing Documentation

### Creating Pages

Add Markdown or MDX files to `docs/`:

```markdown
---
sidebar_position: 1
title: My Guide
description: Learn how to use feature X
---

# My Guide

Welcome to this guide on...

## Section 1

Content here...
```

### Adding Blog Posts

Create date-prefixed files in `blog/`:

```markdown
---
title: Design System v2.0 Released
authors: [john, jane]
tags: [release, breaking-changes]
---

We're excited to announce the release of Design System v2.0!

<!-- truncate -->

Full post content...
```

### Using Live Components

Embed interactive components in MDX:

```mdx
import { BrowserWindow } from '@site/src/components/BrowserWindow';

import { Button } from '@grasdouble/lufa_design-system';

# Button Documentation

<BrowserWindow>
  <Button variant="primary">Click me</Button>
  <Button variant="secondary">Or me</Button>
</BrowserWindow>
```

### Code Examples

Use syntax highlighting with live previews:

````mdx
```tsx live
function Example() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Clicked {count} times</Button>;
}
```
````

## Site Structure

```
docs/
├── getting-started/     # Installation and setup
├── components/          # Component documentation
├── design-tokens/       # Token reference
├── patterns/            # UI patterns
├── guides/              # How-to guides
└── migration/           # Version migration

blog/                    # Release notes and updates
src/
├── components/          # Custom MDX components
├── pages/               # Custom pages
└── css/                 # Custom styles
```

## Configuration

Customize in `docusaurus.config.ts`:

- **Site metadata** - Title, tagline, URL
- **Theme** - Colors, fonts, dark mode
- **Navbar** - Navigation items and logo
- **Footer** - Links and copyright
- **Plugins** - Search, analytics, etc.

## Deployment

Automatically deployed via GitHub Actions:

- Pull requests → Preview deployments
- Main branch → Production site

Manual deployment:

```bash
pnpm ds:documentation:build
# Upload ./build to hosting service
```

## Best Practices

### Content Guidelines

- Use clear, concise language
- Include code examples for every feature
- Provide both conceptual and practical content
- Add visual examples (images, diagrams)
- Keep pages focused on a single topic

### Accessibility

- Use semantic heading hierarchy
- Provide alt text for images
- Ensure sufficient color contrast
- Test with screen readers
- Include keyboard navigation docs

### Maintenance

- Keep docs in sync with code
- Update examples when APIs change
- Archive outdated content
- Review and update quarterly

## Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [MDX Documentation](https://mdxjs.com)
- [Design System Components](../main/)
- [Storybook](../storybook/)
- [Contributing Guide](../../../CONTRIBUTING.md)

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

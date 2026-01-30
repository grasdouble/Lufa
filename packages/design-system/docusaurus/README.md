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

Use these guides when authoring documentation:

- [Component Documentation Best Practices](./_docs/component-documentation-best-practices.md)
- [Adding a New Page](./_docs/adding-a-new-page.md)
- [Adding a Blog Post](./_docs/adding-a-blog-post.md)
- [Using Live Components](./_docs/using-live-components.md)
- [Writing Code Examples](./_docs/writing-code-examples.md)

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

## Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [MDX Documentation](https://mdxjs.com)
- [Design System Components](../main/)
- [Storybook](../storybook/)
- [Contributing Guide](../../../CONTRIBUTING.md)

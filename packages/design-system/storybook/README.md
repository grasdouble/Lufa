[← Back to Design System Overview](../README.md)

# Lufa Design System Storybook

[![Storybook](https://img.shields.io/badge/Storybook-10.x-FF4785?style=flat-square&logo=storybook)](https://storybook.js.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](../../../LICENSE.md)

> Interactive component explorer and documentation for the Lufa Design System

**Part of the [Lufa Design System](../README.md)** - Component Explorer & Testing

## Overview

This Storybook instance serves as the primary documentation and testing environment for all Lufa Design System components. It provides an interactive playground for developers and designers to explore, test, and understand component behavior.

### What's Inside

- **Component Catalog** - Browse all available components with live examples
- **Interactive Controls** - Test components with different props in real-time
- **Accessibility Testing** - Built-in a11y auditing for WCAG compliance
- **Theme Switching** - Preview components in light/dark and custom themes
- **Code Examples** - Copy-paste ready code snippets
- **Documentation** - Inline docs with MDX support

## Development

```bash
# Start Storybook dev server
pnpm ds:storybook:dev

# Build Storybook for production
pnpm ds:storybook:build

# Lint stories
pnpm ds:storybook:lint

# Format stories
pnpm ds:storybook:prettier
```

## 📖 Story Documentation

**Complete story writing guide:**

| Document                                        | Purpose                          | Use When                           |
| ----------------------------------------------- | -------------------------------- | ---------------------------------- |
| **[Story Guide](./_docs/story-guide.md)**       | Complete guide with explanations | Learning how to write stories      |
| **[Story Rules](./_docs/story-rules.md)**       | All rules and standards          | Quick reference during development |
| **[Story Template](./_docs/story-template.md)** | Copy-paste templates             | Starting a new story               |

### Quick Start

1. **New to story writing?** → Start with [Story Guide](./_docs/story-guide.md)
2. **Need a template?** → Check [Story Template](./_docs/story-template.md)
3. **Quick rule lookup?** → See [Story Rules](./_docs/story-rules.md)

### Writing Guides

- [Storybook Conventions](./_docs/storybook-conventions.md)
- [Writing Stories](./_docs/writing-stories.md)
- [Operational Notes](./_docs/operational-notes.md)

## Related Packages

- [Design System](../main/) - Component library
- [Design Tokens](../tokens/) - Semantic tokens
- [Documentation](../docusaurus/) - Docusaurus docs

---

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) and the internal design system instructions for development guidelines.

---

**Status:** ✅ Production Ready  
**Last Updated:** January 23, 2026

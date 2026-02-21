# Internal Documentation (\_docs)

This directory contains **internal documentation** for maintainers and contributors to the Docusaurus package. This documentation is **not published** to the public documentation site.

## Purpose

Internal docs help package maintainers understand:

- How the package is structured
- How to add new features
- How to maintain existing features
- Technical implementation details

## Contents

### Content Management

- **`adding-a-blog-post.md`** - How to add blog posts
- **`adding-a-new-page.md`** - How to add documentation pages

### Component Documentation

- **`component-documentation-best-practices.md`** - Best practices for documenting components
- **`using-live-components.md`** - How to use the LiveDemoSection component
- **`writing-code-examples.md`** - Guidelines for writing code examples

## Distinction: Internal vs Public Docs

### Internal Documentation (`_docs/`)

- **Audience:** Package maintainers, contributors
- **Purpose:** Technical implementation, maintenance guides
- **Examples:**
  - How to add blog posts
  - Component documentation guidelines

### Public Documentation (`docs/`)

- **Audience:** Design system users, application developers
- **Purpose:** How to use the design system in their apps
- **Examples:**
  - Getting started guide
  - Component API reference
  - Design token customization
  - Accessibility guidelines

## Related Documentation

### Public Documentation

- `docs/getting-started/theming.md` - **Design System token customization** (public)
- `docs/components/` - Component API reference (public)
- `docs/tokens/` - Design tokens reference (public)

## Contributing

When adding internal documentation:

1. **File naming:** Use lowercase with hyphens (`my-doc-file.md`)
2. **Location:** Place in `_docs/` directory
3. **Format:** Use Markdown (`.md`)
4. **Content:** Focus on "how it works" not "how to use"
5. **Audience:** Write for maintainers and contributors

---

**Last Updated:** February 12, 2026  
**Maintainer:** Lufa Design System Team

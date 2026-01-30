# Adding a New Page

This guide explains how to add a new documentation page to the Docusaurus site.

## Where to Put the File

- Use `docs/` for standard documentation pages.
- Use `blog/` for announcements and release notes.
- Use `src/pages/` for custom React pages that are not part of the docs sidebar.

## Step-by-Step (Docs Page)

1. Create a new Markdown or MDX file under `docs/`.
2. Add front matter at the top of the file.
3. Update `sidebars.ts` to include the page (or place the file in a folder that is already auto-registered).
4. Start the dev server and verify the page renders correctly.

### Front Matter Minimum

Use at least `title` and `description`. Add `sidebar_position` when ordering matters. Add `slug` only when the default URL is not acceptable.

## Minimal Example

```md
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

## Sidebar Entry

If you manage the sidebar manually, add the new file path in `sidebars.ts`.

```ts
{
  type: 'doc',
  id: 'getting-started/my-guide',
}
```

## Common Checks

- The page title matches the front matter.
- The doc appears in the expected sidebar section.
- Links are relative and resolve correctly.
- Code examples render without errors.

## Related Docs

- [Component Documentation Best Practices](./component-documentation-best-practices.md)
- [Using Live Components](./using-live-components.md)

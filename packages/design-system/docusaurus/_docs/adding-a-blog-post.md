# Adding a Blog Post

This guide explains how to publish a new blog post in the Docusaurus site.

## Where to Put the File

- Create posts in the `blog/` directory.
- Use the format `YYYY-MM-DD-title.md` or `YYYY-MM-DD-title.mdx`.

## Step-by-Step

1. Create a new file in `blog/` with the date prefix.
2. Add front matter with title, authors, and tags.
3. Write the post content and include a `<!-- truncate -->` marker.
4. Start the dev server and verify the post renders correctly.

## Minimal Example

```md
---
title: Design System v2.0 Released
authors: [john, jane]
tags: [release, breaking-changes]
---

We are excited to announce the release of Design System v2.0!

<!-- truncate -->

Full post content...
```

## Author Profiles

- Define authors in `blog/authors.yml` (preferred).
- You can also inline author data in the front matter if needed.

Example `blog/authors.yml` entry:

```yaml
jane:
  name: Jane Doe
  title: Design Systems
  url: https://github.com/janedoe
  image_url: https://github.com/janedoe.png
```

## Common Checks

- The file name uses the correct date format.
- Tags are consistent with existing blog tags.
- The truncate marker appears after the intro paragraph.
- Links are relative and resolve correctly.

## Related Docs

- [Adding a New Page](./adding-a-new-page.md)
- [Writing Code Examples](./writing-code-examples.md)

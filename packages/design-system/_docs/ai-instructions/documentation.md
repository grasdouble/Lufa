# AI Instructions: Documentation (Docusaurus)

## Context

You are writing documentation for the Lufa Design System using Docusaurus. This documentation targets human developers and designers.

## File Structure

- **Location**: `packages/design-system/docusaurus/docs/`
- **Format**: Markdown (`.md`) or MDX (`.mdx`).

## Rules for Documentation

### 1. Frontmatter

Every file MUST start with valid YAML frontmatter:

```yaml
---
id: component-name
title: Component Name
sidebar_label: Component Name
description: Brief description for SEO and previews.
---
```

### 2. Content Structure

Follow this standard outline for Component documentation:

1.  **Introduction**: What is it? (1-2 sentences).
2.  **Usage**: When to use it vs. when not to.
3.  **Anatomy**: Breakdown of parts (optional).
4.  **Examples**: Code blocks showing common patterns.
5.  **Props API**: Generated automatically or manually documented table.
6.  **Accessibility**: Specific a11y features or requirements.

### 3. Code Examples

- Use `import` statements in examples to show where components come from.
- Use `jsx` or `tsx` language tags for syntax highlighting.
- Keep examples self-contained and copy-pasteable.

### 4. Tone and Style (Writing Guidelines)

- **Objective**: Be concise, professional, and instructional. Avoid marketing fluff.
- **Active Voice**: "Use the button" (Good) vs "The button should be used" (Bad).
- **Empathy**: Write for a developer who is tired and in a hurry. Get to the point fast.
- **Formatting**:
  - Use **bold** for UI elements or key concepts.
  - Use `code` ticks for props, values, and filenames.

### 5. Admonitions

Use Docusaurus admonitions for warnings or tips:

```md
:::tip Best Practice
Always provide a text label for icon-only buttons via `aria-label`.
:::
```

## 6. Document Patterns (Reference)

For standard documentation structure (MDX), **READ AND COPY** patterns from:
`packages/design-system/_docs/ai-instructions/templates/doc-patterns.md`

## Checklist for Validation

- [ ] Is the frontmatter complete and correct?
- [ ] Are code examples syntax-highlighted?
- [ ] Is the tone consistent and professional?
- [ ] Are accessibility implications documented?

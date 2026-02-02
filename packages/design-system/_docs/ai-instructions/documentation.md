# AI Instructions: Documentation (Strict)

> **Strict alignment required** with:
>
> - `packages/design-system/docusaurus/_docs/component-documentation-best-practices.md`
> - `packages/design-system/docusaurus/_docs/adding-a-new-page.md`
> - `packages/design-system/docusaurus/_docs/writing-code-examples.md`

## Context

You are writing Docusaurus documentation for the Lufa Design System. Content must be concise, consistent, and accurate.

## File Structure

- **Location:** `packages/design-system/docusaurus/docs/`
- **Format:** Markdown (`.md`) or MDX (`.mdx`)

## 1) Frontmatter (Required)

Every doc must start with YAML frontmatter:

```yaml
---
id: component-kebab
title: Component Name
sidebar_label: Component Name
description: Brief description for SEO and previews.
---
```

When adding a new page, ensure `sidebars.ts` is updated if the directory is not auto-registered.

## 2) Component Documentation Structure (Strict)

Use this **exact** order for component pages:

1. **Overview**
2. **Anatomy**
3. **Usage**
4. **Variants**
5. **Props**
6. **Accessibility**
7. **Theming & Tokens**
8. **Do / Don’t**
9. **Related Components**

### Do / Don’t Formatting (Strict)

Use Docusaurus admonitions for this section:

```mdx
:::tip Do

- ...
  :::

:::warning Don’t

- ...
  :::
```

## 3) Writing Style

- Lead with user goal, not implementation.
- Short, direct sentences.
- Avoid marketing tone.
- Use **bold** for UI concepts and `code` for props/values.

## 4) Code Examples (Strict)

From `writing-code-examples.md`:

- Use fenced blocks with a language tag (`tsx` preferred).
- Show minimal, copy‑pasteable snippets.
- Avoid app-specific logic or large scaffolding.
- Default examples must use default props only.

## Live Demo Tabs (Strict)

- Use `LiveDemoSection` with `tabs` for live demos.
- Always include **Default** first.
- Then add one tab per primary prop.
- If using live examples, use:

````mdx
```tsx live
function Example() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Clicked {count}</Button>;
}
```
````

## 5) Accessibility & Theming

- Document keyboard interaction and ARIA requirements.
- Mention token groups and mode-aware behavior.

## 6) Validation Checklist

- [ ] Frontmatter complete
- [ ] Structure matches the strict order
- [ ] Examples compile and match API
- [ ] Accessibility notes included
- [ ] Theming & tokens documented

## Reference Patterns

**Copy patterns from:**

- `packages/design-system/_docs/ai-instructions/templates/doc-patterns.md`

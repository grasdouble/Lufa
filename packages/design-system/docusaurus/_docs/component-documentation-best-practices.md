# Component Documentation Best Practices

This guide defines how to write clear, consistent component documentation for the design system.

## Goals

- Make the component easy to understand at a glance.
- Provide enough detail to use it correctly without reading source code.
- Highlight accessibility, tokens, and theming implications.

## Recommended Structure

1. **Overview**
   - One paragraph on what the component is and when to use it.
2. **Anatomy**
   - Short list of the main parts (slot names or sub-elements).
3. **Usage**
   - Minimal example that demonstrates the default case.
   - Avoid non-default props in the default example.
4. **Variants**
   - Show all supported variants with a short explanation.
5. **Props**
   - Document required, optional, and default values.
6. **Accessibility**
   - ARIA notes, keyboard interactions, focus behavior.
7. **Theming & Tokens**
   - Which tokens affect visuals and which are theme-aware.
8. **Do / Don’t**
   - Use Docusaurus admonitions: `:::tip Do` and `:::warning Don’t`.
   - Two or three concrete examples.
9. **Related Components**
   - Links to similar or complementary components.

### Template

```
# Component Name

## Overview

## Anatomy

## Usage

## Variants

## Props

## Accessibility

## Theming & Tokens

## Do / Don’t

## Related Components
```

## Writing Style

- Lead with the user goal, not the implementation details.
- Use short, direct sentences.
- Prefer concrete examples over abstract descriptions.
- Keep headings consistent across components.
- Keep Do/Don’t formatting consistent with the admonition pattern.

## Content Checklist

- Primary use cases are explicit.
- Default behavior is described.
- Variant names match the API exactly.
- All props have types and defaults.
- Accessibility requirements are listed.
- Theming and token usage are explained.
- Examples cover at least one real-world scenario.

## Code Examples

- Keep examples minimal and copy-paste ready.
- Prefer a single focused example over a long, exhaustive one.
- Avoid app-specific context or business logic.
- If a prop has tricky behavior, show it explicitly.
- For default examples, use the component with no extra props whenever possible.

## Live Demo Tabs

- Use `LiveDemoSection` with `tabs` to separate examples.
- Always include a **Default** tab first.
- Then add one tab per primary prop (the props highlighted in Variants/Usage).

## Accessibility Notes

- Describe keyboard interactions and focus order.
- Note required ARIA attributes if any.
- Explain any color contrast or motion considerations.

## Theming & Tokens

- Reference token groups instead of raw values.
- Note which tokens are mode-aware (light/dark/high-contrast).
- Explain any theme-specific overrides or limitations.

## Review Tips

- Verify examples render correctly in Storybook.
- Validate prop tables match the actual API.
- Ensure links resolve to current docs.

## Related Docs

- [Storybook Patterns](../../storybook/_docs/storybook-patterns.md)
- [Component Inventory](../../main/_docs/component-inventory.md)

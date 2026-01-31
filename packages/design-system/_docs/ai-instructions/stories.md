# AI Instructions: Storybook Stories (Strict)

> **This document is strict and must match Storybook rules/templates.**
> Source of truth: `packages/design-system/storybook/_docs/story-guide.md`,
> `packages/design-system/storybook/_docs/story-rules.md`,
> `packages/design-system/storybook/_docs/story-template.md`.

## Context

You are creating stories to document and test UI components in Storybook. Stories must be consistent, visual, and easy to copy. These are **not** unit tests nor full documentation.

## File Structure

- **Location:** `packages/design-system/storybook/src/stories/`
- **Naming:** `[ComponentName].stories.tsx`

## 1) Format (CSF 3.0)

- Use **Component Story Format (CSF) 3.0** objects.
- `meta` object must include: `title`, `component`, and `argTypes`.
- **Do NOT include** `tags: ['autodocs']` unless explicitly requested.
- Import types from `@storybook/react`.

```ts
import type { Meta, StoryObj } from '@storybook/react';
```

## 2) Visual Standards (CRITICAL)

### A) Colors

- **NEVER** use hardcoded hex/rgb values.
- **ALWAYS** use `STORY_COLORS` (and `getColorByIndex`) from:

```ts
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';
```

**Color decision guide:**

- Directional props → `STORY_COLORS.directional`
- Axis props → `STORY_COLORS.axis`
- Multiple variants (mapping) → `getColorByIndex(index)`
- Primary highlights → `STORY_COLORS.primary`
- Backgrounds/borders/text → `STORY_COLORS.neutral`

### B) Helper Components

Use the helpers from:

```ts
import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
```

Rules:

- Wrap **everything** in `<StoryContainer>`
- Wrap each example in `<PropCard label="...">`
- Use `<CodeBlock>` to show clean usage examples

### C) Spacing Visualization (Padding/Margin)

Use the **Border + Inner Content** pattern (light background + dashed border + vibrant inner content). See `story-template.md` for the exact pattern.

## 3) Story Structure (STRICT)

Every story should follow this layout:

```
StoryContainer
  └─ Grid/Flex of PropCard examples
  └─ CodeBlock (clean code)
```

### Naming Conventions

- `Prop*` for prop-focused stories
- `Variant*` for variants
- `Playground*` for interactive playground
- `Example*` for usage examples

## 4) Code Generation (STRICT)

- Always create a `generateCode()` helper function.
- **Remove all story-only styles** from the displayed code.
- Keep code short and copy‑pasteable.

## 5) Hover Interactions (when multiple examples)

- Use `useState` and `onMouseEnter` to highlight the current example.
- Update the `<CodeBlock>` dynamically based on hover state.

## 6) Accessibility

- Use semantic HTML.
- Add `aria-label` to interactive elements when needed.

## Reference Templates

**Use and copy from:**

- `packages/design-system/storybook/_docs/story-template.md`
- `packages/design-system/storybook/_docs/story-rules.md`
- `packages/design-system/storybook/_docs/story-guide.md`

## Quick Checklist

- [ ] No hardcoded colors
- [ ] `StoryContainer` + `PropCard` + `CodeBlock`
- [ ] Clean `generateCode()`
- [ ] Hover highlights + dynamic code (when multiple variants)
- [ ] Proper naming (`Prop*`, `Variant*`, `Playground*`)
- [ ] **No `autodocs` tags**

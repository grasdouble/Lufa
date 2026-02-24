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
- Import types from **`@storybook/react-vite`** (Storybook 10.x — NOT `@storybook/react`).

```ts
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
```

> **Important:** Always put `import React from 'react'` first, then the Storybook import.

## 2) Visual Standards (CRITICAL)

### A) Colors

- **NEVER** use hardcoded hex/rgb values.
- **ALWAYS** use `STORY_COLORS` (and `getColorByIndex`) from:

```ts
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';
```

**Color decision guide:**

| Use case                                  | Color to use                               |
| ----------------------------------------- | ------------------------------------------ |
| Story UI (text, containers, borders)      | `STORY_COLORS.themed.*` ✅ **recommended** |
| Directional props (top/right/bottom/left) | `STORY_COLORS.directional`                 |
| Axis props (X/Y)                          | `STORY_COLORS.axis`                        |
| Multiple variants (mapping)               | `getColorByIndex(index)`                   |
| Primary decorative highlights             | `STORY_COLORS.primary`                     |
| Legacy code only                          | `STORY_COLORS.neutral` ⚠️ deprecated       |

#### `STORY_COLORS.themed` — Theme-aware colors (recommended)

Use for story containers, text, borders, and backgrounds. These CSS variables **automatically adapt** to light, dark, and high-contrast modes.

```ts
// ✅ NEW — adapts to all themes
color: STORY_COLORS.themed.text.primary;
backgroundColor: STORY_COLORS.themed.background.surface;
border: `1px solid ${STORY_COLORS.themed.border.default}`;
```

Available themed tokens:

- `themed.text.primary` / `.secondary` / `.tertiary` / `.inverse`
- `themed.background.page` / `.surface` / `.success` / `.error` / `.warning` / `.info`
- `themed.border.default` / `.subtle`
- `themed.shadow.sm` / `.md`

#### `STORY_COLORS.neutral` — Legacy (deprecated)

> **⚠️ Deprecated.** Still present for backwards compatibility.
> Prefer `STORY_COLORS.themed.*` for all new stories.
> `neutral` colors are hardcoded and **do not adapt to dark mode**.

```ts
// ❌ OLD — always light mode values, doesn't adapt to dark mode
color: STORY_COLORS.neutral.textDark;

// ✅ NEW — adapts to all themes
color: STORY_COLORS.themed.text.primary;
```

Migration map:

- `neutral.textDark` / `neutral.text` → `themed.text.primary`
- `neutral.textSlate` → `themed.text.secondary`
- `neutral.backgroundLight` / `neutral.bgGray` → `themed.background.surface`
- `neutral.borderMedium` → `themed.border.default`
- `neutral.borderSlate` → `themed.border.subtle`

### B) Helper Components

Use the helpers from:

```ts
import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
```

For interactive Playground stories, also use:

```ts
import { PlaygroundContainer } from '../../components/helpers';
```

Rules:

- Wrap **everything** in `<StoryContainer>`
- Wrap each example in `<PropCard label="...">`
- Use `<CodeBlock>` to show clean usage examples
- Use `<PlaygroundContainer>` for full Playground stories with args

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

- [ ] Import from `@storybook/react-vite` (NOT `@storybook/react`)
- [ ] `import React from 'react'` is the first import
- [ ] No hardcoded colors
- [ ] Use `STORY_COLORS.themed.*` for story UI elements (not `neutral`)
- [ ] `StoryContainer` + `PropCard` + `CodeBlock`
- [ ] Clean `generateCode()`
- [ ] Hover highlights + dynamic code (when multiple variants)
- [ ] Proper naming (`Prop*`, `Variant*`, `Playground*`)
- [ ] **No `autodocs` tags**

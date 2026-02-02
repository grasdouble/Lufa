# AI Code Patterns: Docusaurus Documentation (Strict)

> **Strict patterns aligned with Docusaurus docs rules.**
> Source of truth:
>
> - `packages/design-system/docusaurus/_docs/component-documentation-best-practices.md`
> - `packages/design-system/docusaurus/_docs/adding-a-new-page.md`
> - `packages/design-system/docusaurus/_docs/writing-code-examples.md`

## Usage

Copy these patterns exactly. Replace placeholders with real content.

---

## PATTERN: COMPONENT_DOC_FULL

Standard component documentation page.

````mdx
---
id: [component-kebab]
title: [ComponentName]
sidebar_label: [ComponentName]
description: [Brief description]
---

import { [ComponentName] } from '@grasdouble/lufa_design-system';
import { PropsTable } from '@site/src/components/PropsTable';

# [ComponentName]

## Overview

[One short paragraph describing what it is and when to use it.]

<LiveDemoSection
  tabs={[
    { id: 'default', label: 'Default', content: <LiveDemo /> },
    { id: '[prop]', label: '[Prop]', content: <[PropDemo] /> },
  ]}
/>

## Anatomy

- **Root**: [Description]
- **[Slot]**: [Description]

## Usage

```tsx
import { [ComponentName] } from '@grasdouble/lufa_design-system';

export function Example() {
  return <[ComponentName]>Content</[ComponentName]>;
}
```

Default usage examples must avoid non-default props.

## Variants

```tsx
<[ComponentName] variant="primary">Primary</[ComponentName]>
<[ComponentName] variant="secondary">Secondary</[ComponentName]>
```

## Props

<PropsTable component={[ComponentName]} />

## Accessibility

- **Keyboard**: [Describe interactions]
- **ARIA**: [Required attributes]

## Theming & Tokens

- Tokens: [List token groups used]
- Mode-aware: [Mention light/dark/high-contrast behavior]

## Do / Don’t

:::tip Do
Use [ComponentName] when [...].
:::

:::warning Don’t
Avoid [...].
:::

## Related Components

- [OtherComponent](/docs/[path])
````

---

## PATTERN: LIVE_EXAMPLE

Interactive example using MDX live blocks.

````mdx
```tsx live
function Example() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Clicked {count}</Button>;
}
```
````

---

## PATTERN: NEW_PAGE_MINIMAL

Minimal new page (non-component guide).

```md
---
title: My Guide
description: Learn how to use feature X
sidebar_position: 1
---

# My Guide

## Section 1

Content here...
```

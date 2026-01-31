# AI Code Patterns: Docusaurus Documentation

## Usage

Copy these patterns exactly. Replace `[ComponentName]` and content accordingly.

## PATTERN: COMPONENT_DOC_FULL

Standard documentation page for a UI component.

````mdx
---
id: [component-kebab]
title: [ComponentName]
sidebar_label: [ComponentName]
description: [Brief description of what the component does]
---

import { [ComponentName] } from '@grasdouble/lufa_design-system';
import { PropsTable } from '@site/src/components/PropsTable';

# [ComponentName]

[One sentence summary of the component's purpose.]

## Usage

Use [ComponentName] when [scenario A]. Do not use it for [scenario B].

```tsx
import { [ComponentName] } from '@grasdouble/lufa_design-system';

<[ComponentName] variant="primary">Click Me</[ComponentName]>
```
````

## Anatomy

- **Root**: The main container.
- **Label**: The text content.
- **Icon** (Optional): Visual indicator.

## Examples

### Variants

Use the `variant` prop to control visual hierarchy.

```tsx
<[ComponentName] variant="primary">Primary</[ComponentName]>
<[ComponentName] variant="secondary">Secondary</[ComponentName]>
<[ComponentName] variant="ghost">Ghost</[ComponentName]>
```

### Sizes

Available in `sm`, `md` (default), and `lg`.

```tsx
<[ComponentName] size="sm">Small</[ComponentName]>
<[ComponentName] size="md">Medium</[ComponentName]>
<[ComponentName] size="lg">Large</[ComponentName]>
```

### With Icons

Supports `iconLeft` and `iconRight` props using Icon names.

```tsx
<[ComponentName] iconLeft="check">Save</[ComponentName]>
<[ComponentName] iconRight="arrow-right">Next</[ComponentName]>
```

## API

<PropsTable component={[ComponentName]} />

## Accessibility

- **Keyboard**: Full support via `Tab` and `Enter`/`Space`.
- **ARIA**: Automatically handles `aria-disabled` and `aria-busy`.
- **Contrast**: Meets WCAG AA standards for all default variants.

````

## PATTERN: ADMONITION_TIPS
Use for best practices.

```md
:::tip Best Practice
Always use the `ghost` variant for actions inside dense data tables to reduce visual noise.
:::

:::warning Accessibility
Avoid using icon-only buttons without an `aria-label`.
:::
````

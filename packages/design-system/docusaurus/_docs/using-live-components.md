# Using Live Components

This guide explains how to embed live components in MDX pages.

## When to Use Live Components

- When behavior is best understood interactively.
- When you need to demo states or variations.
- When a static snippet is not sufficient.

## Basic Setup

Import the MDX wrapper and the component you want to render.

```mdx
import { BrowserWindow } from '@site/src/components/BrowserWindow';

import { Button } from '@grasdouble/lufa_design-system';

# Button Documentation

<BrowserWindow>
  <Button variant="primary">Click me</Button>
  <Button variant="secondary">Or me</Button>
</BrowserWindow>
```

If a component is not available in MDX, add it to the MDX scope configuration for this package (usually in `src/theme/MDXComponents` or the MDX provider).

## Best Practices

- Keep live examples small and focused.
- Avoid heavy logic or async behavior in MDX.
- Use real component props (no pseudo-API).
- Prefer two or three clear examples over many variations.
- Default live demos should show the component with default props only.
- When using `LiveDemoSection`, include a Default tab first and then one tab per primary prop.

## LiveDemoSection with Tabs

```mdx
import { LiveDemoSection } from '../../src/components/LiveDemoSection';
import { LiveDemo, SizeDemo } from '../../src/dsExamples/components/button';

<LiveDemoSection
  tabs={[
    { id: 'default', label: 'Default', content: <LiveDemo /> },
    { id: 'size', label: 'Size', content: <SizeDemo /> },
  ]}
/>
```

## Common Checks

- The example renders without console errors.
- Imports resolve correctly.
- Props reflect actual component API.

## Related Docs

- [Adding a New Page](./adding-a-new-page.md)
- [Component Documentation Best Practices](./component-documentation-best-practices.md)
- [Writing Code Examples](./writing-code-examples.md)

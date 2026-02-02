# Writing Code Examples

This guide defines how to write code examples that are clear and reliable in Docusaurus.

## When to Use Code Examples

- To show the primary usage pattern.
- To demonstrate a specific prop or behavior.
- To provide copy-paste ready snippets.

## Standard Example

Use fenced blocks with a language, and prefer `tsx` for React examples.

```tsx
import { Button } from '@grasdouble/lufa_design-system';

export function Example() {
  return <Button variant="primary">Save</Button>;
}
```

## Live Examples

For interactive examples, use MDX live blocks:

````mdx
```tsx live
function Example() {
  const [count, setCount] = useState(0);
  return <Button onClick={() => setCount(count + 1)}>Clicked {count}</Button>;
}
```
````

If `useState` or components are not in scope, import them in the MDX file or add them to the live code scope for this package.

## Best Practices

- Keep examples minimal and focused.
- Avoid app-specific business logic.
- Show realistic props and default usage.
- Prefer one good example over many variations.

## Live Demo Tabs

When using `LiveDemoSection` in docs, group examples by tabs:

- Always include a **Default** tab first.
- Then add one tab per primary prop.

```mdx
<LiveDemoSection
  tabs={[
    { id: 'default', label: 'Default', content: <LiveDemo /> },
    { id: 'size', label: 'Size', content: <SizeDemo /> },
  ]}
/>
```

## Common Checks

- Examples compile without warnings.
- The example matches the current API.
- Imports resolve correctly.

## Related Docs

- [Using Live Components](./using-live-components.md)
- [Component Documentation Best Practices](./component-documentation-best-practices.md)

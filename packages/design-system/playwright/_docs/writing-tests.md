# Writing Tests

Follow the internal Playwright CT guidelines when writing tests.

**Example test**:

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '@grasdouble/lufa_design-system';

test('renders with correct variant', async ({ mount }) => {
  const component = await mount(<Button variant="primary">Click me</Button>);
  await expect(component).toContainText('Click me');
  await expect(component).toHaveClass(/btn-primary/);
});
```

import { expect, test } from '@playwright/experimental-ct-react';

import { Card, Text } from '@grasdouble/lufa_design-system';

test.describe('Card', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Card Content');
  });

  test('should support polymorphism', async ({ mount }) => {
    const component = await mount(
      <Card as="section">
        <Text>Section Card</Text>
      </Card>
    );
    await expect(component).toHaveAttribute('class', /card/);
  });

  test('should match snapshot', async ({ mount }) => {
    const component = await mount(
      <Card>
        <Text>Snapshot Content</Text>
      </Card>
    );
    await expect(component).toHaveScreenshot();
  });
});

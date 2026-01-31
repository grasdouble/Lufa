import { expect, test } from '@playwright/experimental-ct-react';

import { Input, Label } from '@grasdouble/lufa_design-system';

test.describe('Label', () => {
  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Label>Label Text</Label>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText('Label Text');
  });

  test('should associate with input via htmlFor', async ({ mount }) => {
    const component = await mount(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <Input id="test-input" />
      </>
    );
    await expect(component.getByText('Test Label')).toBeVisible();
    await expect(component.getByLabel('Test Label')).toBeVisible();
  });

  test('should support polymorphism', async ({ mount }) => {
    const component = await mount(<Label as="span">Span Label</Label>);
    await expect(component).toHaveText('Span Label');
  });

  test('should match snapshot', async ({ mount }) => {
    const component = await mount(<Label>Snapshot Label</Label>);
    await expect(component).toHaveScreenshot();
  });
});

import { expect, test } from '@playwright/experimental-ct-react';

import { Input } from '@grasdouble/lufa_design-system';

test.describe('Input', () => {
  test('renders with placeholder', async ({ mount }) => {
    const component = await mount(<Input placeholder="Type here" />);
    await expect(component.getByPlaceholder('Type here')).toBeVisible();
  });

  test('renders with label', async ({ mount }) => {
    const component = await mount(
      <label htmlFor="input-id">
        <span>Label</span>
        <Input id="input-id" />
      </label>
    );
    await expect(component.getByLabel('Label')).toBeVisible();
  });

  test('accepts value and onChange', async ({ mount }) => {
    const component = await mount(<Input placeholder="Type here" />);
    const input = component.locator('input');
    await input.fill('Hello');
    await expect(input).toHaveValue('Hello');
  });

  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(<Input aria-label="Accessible input" />);
    await expect(component).toMatchAriaSnapshot(`
			- textbox "Accessible input"
		`);
  });

  test('is keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<Input aria-label="Tab input" />);
    await page.keyboard.press('Tab');
    await expect(component.getByRole('textbox')).toBeFocused();
  });

  test('visual regression: default, disabled, error', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', gap: 16, padding: 24 }}>
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Error" aria-invalid="true" />
      </div>
    );
    await expect(component).toHaveScreenshot('input-variants.png');
  });
});

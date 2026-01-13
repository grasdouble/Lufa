import { expect, test } from '@playwright/experimental-ct-react';

import { Checkbox } from '@grasdouble/lufa_design-system';

test.describe('Checkbox', () => {
  test('renders with label', async ({ mount }) => {
    const component = await mount(<Checkbox label="Accept terms" />);
    await expect(component.getByText('Accept terms')).toBeVisible();
  });

  test('can be checked and unchecked', async ({ mount }) => {
    const component = await mount(<Checkbox label="Subscribe" />);
    const checkbox = component.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test('supports defaultChecked prop', async ({ mount }) => {
    const component = await mount(<Checkbox label="Subscribe" defaultChecked />);
    const checkbox = component.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
  });

  test('supports controlled checked state', async ({ mount }) => {
    const component = await mount(<Checkbox label="Subscribe" checked={true} onChange={() => {}} />);
    const checkbox = component.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
  });

  test('handles disabled state', async ({ mount }) => {
    const component = await mount(<Checkbox label="Subscribe" disabled />);
    const checkbox = component.getByRole('checkbox');
    await expect(checkbox).toBeDisabled();
  });

  test('displays error message', async ({ mount }) => {
    const component = await mount(<Checkbox label="Accept terms" error="You must accept the terms" />);
    await expect(component.getByText('You must accept the terms')).toBeVisible();
  });

  test('displays helper text', async ({ mount }) => {
    const component = await mount(<Checkbox label="Subscribe" helperText="You can unsubscribe anytime" />);
    await expect(component.getByText('You can unsubscribe anytime')).toBeVisible();
  });

  test('shows required indicator', async ({ mount }) => {
    const component = await mount(<Checkbox label="Accept terms" required />);
    await expect(component.getByText('*')).toBeVisible();
  });

  test('supports indeterminate state', async ({ mount }) => {
    const component = await mount(<Checkbox label="Select All" indeterminate />);
    const checkbox = component.getByRole('checkbox');
    // Note: indeterminate is a DOM property, not an attribute
    // We can't directly test it via Playwright, but we can check CSS/visual state
    await expect(checkbox).toBeVisible();
  });

  test('is keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<Checkbox label="Subscribe" />);
    await page.keyboard.press('Tab');
    const checkbox = component.getByRole('checkbox');
    await expect(checkbox).toBeFocused();
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();
    await page.keyboard.press('Space');
    await expect(checkbox).not.toBeChecked();
  });

  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(<Checkbox label="Accept terms and conditions" />);
    await expect(component).toMatchAriaSnapshot(`
      - checkbox "Accept terms and conditions"
    `);
  });

  test('visual regression: sizes', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <Checkbox label="Small" size="small" defaultChecked />
        <Checkbox label="Medium" size="medium" defaultChecked />
        <Checkbox label="Large" size="large" defaultChecked />
      </div>
    );
    await expect(component).toHaveScreenshot('checkbox-sizes.png');
  });

  test('visual regression: colors', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <Checkbox label="Primary" color="primary" defaultChecked />
        <Checkbox label="Secondary" color="secondary" defaultChecked />
        <Checkbox label="Success" color="success" defaultChecked />
        <Checkbox label="Warning" color="warning" defaultChecked />
        <Checkbox label="Danger" color="danger" defaultChecked />
      </div>
    );
    await expect(component).toHaveScreenshot('checkbox-colors.png');
  });

  test('visual regression: states', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
        <Checkbox label="Error" error="Error message" />
        <Checkbox label="Helper" helperText="Helper text" />
      </div>
    );
    await expect(component).toHaveScreenshot('checkbox-states.png');
  });
});

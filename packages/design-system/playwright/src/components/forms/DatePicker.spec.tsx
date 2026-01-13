import { expect, test } from '@playwright/experimental-ct-react';

import { DatePicker } from '@grasdouble/lufa_design-system';

test.describe('DatePicker', () => {
  test('renders with placeholder', async ({ mount }) => {
    const component = await mount(<DatePicker placeholder="Choose a date" />);
    await expect(component.getByPlaceholder('Choose a date')).toBeVisible();
  });

  test('renders with label', async ({ mount }) => {
    const component = await mount(<DatePicker label="Select Date" placeholder="Choose a date" />);
    await expect(component.getByText('Select Date')).toBeVisible();
  });

  test('renders as date input by default', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" />);
    const input = component.locator('input[type="date"]');
    await expect(input).toBeVisible();
  });

  test('renders as datetime input when showTime is true', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date and Time" showTime />);
    const input = component.locator('input[type="datetime-local"]');
    await expect(input).toBeVisible();
  });

  test('accepts default value', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" defaultValue="2024-01-15" />);
    const input = component.locator('input[type="date"]');
    await expect(input).toHaveValue('2024-01-15');
  });

  test('accepts user input', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" />);
    const input = component.locator('input[type="date"]');
    await input.fill('2024-06-30');
    await expect(input).toHaveValue('2024-06-30');
  });

  test('supports min constraint', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" min="2024-01-01" />);
    const input = component.locator('input[type="date"]');
    await expect(input).toHaveAttribute('min', '2024-01-01');
  });

  test('supports max constraint', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" max="2024-12-31" />);
    const input = component.locator('input[type="date"]');
    await expect(input).toHaveAttribute('max', '2024-12-31');
  });

  test('handles disabled state', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" disabled />);
    const input = component.locator('input[type="date"]');
    await expect(input).toBeDisabled();
  });

  test('displays error message', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" error="Date cannot be in the future" />);
    await expect(component.getByText('Date cannot be in the future')).toBeVisible();
  });

  test('displays helper text', async ({ mount }) => {
    const component = await mount(<DatePicker label="Date" helperText="Select the event date" />);
    await expect(component.getByText('Select the event date')).toBeVisible();
  });

  test('shows required indicator', async ({ mount }) => {
    const component = await mount(<DatePicker label="Event Date" required />);
    await expect(component.getByText('*')).toBeVisible();
  });

  test('is keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<DatePicker label="Date" />);
    await page.keyboard.press('Tab');
    const input = component.locator('input[type="date"]');
    await expect(input).toBeFocused();
  });

  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(<DatePicker label="Select date" />);
    await expect(component).toMatchAriaSnapshot(`
      - text "Select date"
    `);
  });

  test('visual regression: sizes and variants', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <DatePicker label="Small" size="small" defaultValue="2024-01-15" />
        <DatePicker label="Medium" size="medium" defaultValue="2024-01-15" />
        <DatePicker label="Large" size="large" defaultValue="2024-01-15" />
        <DatePicker label="Outlined" variant="outlined" defaultValue="2024-01-15" />
        <DatePicker label="Filled" variant="filled" defaultValue="2024-01-15" />
      </div>
    );
    await expect(component).toHaveScreenshot('datepicker-variants.png');
  });

  test('visual regression: states', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <DatePicker label="Default" defaultValue="2024-01-15" />
        <DatePicker label="With Time" showTime defaultValue="2024-01-15T10:30" />
        <DatePicker label="Disabled" defaultValue="2024-01-15" disabled />
        <DatePicker label="Error" defaultValue="2024-01-15" error="Error message" />
        <DatePicker label="Helper" defaultValue="2024-01-15" helperText="Helper text" />
        <DatePicker label="Full Width" defaultValue="2024-01-15" fullWidth />
      </div>
    );
    await expect(component).toHaveScreenshot('datepicker-states.png');
  });

  test('visual regression: date constraints', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <DatePicker label="With Min" min="2024-01-01" defaultValue="2024-01-15" />
        <DatePicker label="With Max" max="2024-12-31" defaultValue="2024-01-15" />
        <DatePicker label="With Min and Max" min="2024-01-01" max="2024-12-31" defaultValue="2024-01-15" />
      </div>
    );
    await expect(component).toHaveScreenshot('datepicker-constraints.png');
  });
});

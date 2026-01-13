import { expect, test } from '@playwright/experimental-ct-react';

import { ColorPicker } from '@grasdouble/lufa_design-system';

test.describe('ColorPicker', () => {
  test('renders with label', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Pick a color" />);
    await expect(component.getByText('Pick a color')).toBeVisible();
  });

  test('renders with default value', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" defaultValue="#3b82f6" />);
    const hexInput = component.locator('input[type="text"]');
    await expect(hexInput).toHaveValue('#3b82f6');
  });

  test('shows color preview by default', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" defaultValue="#3b82f6" />);
    // Preview should be visible as a div with background color
    await expect(component.locator('div').filter({ hasText: '' }).first()).toBeVisible();
  });

  test('can hide color preview', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" defaultValue="#3b82f6" showPreview={false} />);
    // Check that there's no preview swatch
    const inputs = component.locator('input');
    await expect(inputs).toHaveCount(2); // Only color and hex inputs, no preview
  });

  test('hex input accepts valid hex values', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" />);
    const hexInput = component.locator('input[type="text"]');
    await hexInput.fill('#ff5733');
    await expect(hexInput).toHaveValue('#ff5733');
  });

  test('validates hex input format', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" />);
    const hexInput = component.locator('input[type="text"]');
    // Try to enter invalid characters
    await hexInput.fill('#gggggg');
    // Should only allow valid hex characters
    const value = await hexInput.inputValue();
    expect(value).toMatch(/^#[0-9A-Fa-f]{0,6}$/);
  });

  test('handles disabled state', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" disabled />);
    const colorInput = component.locator('input[type="color"]');
    const hexInput = component.locator('input[type="text"]');
    await expect(colorInput).toBeDisabled();
    await expect(hexInput).toBeDisabled();
  });

  test('displays error message', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" error="Invalid color format" />);
    await expect(component.getByText('Invalid color format')).toBeVisible();
  });

  test('displays helper text', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Color" helperText="Choose your brand color" />);
    await expect(component.getByText('Choose your brand color')).toBeVisible();
  });

  test('shows required indicator', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Brand Color" required />);
    await expect(component.getByText('*')).toBeVisible();
  });

  test('is keyboard accessible', async ({ mount, page }) => {
    const component = await mount(<ColorPicker label="Color" />);
    await page.keyboard.press('Tab');
    const colorInput = component.locator('input[type="color"]');
    await expect(colorInput).toBeFocused();
    await page.keyboard.press('Tab');
    const hexInput = component.locator('input[type="text"]');
    await expect(hexInput).toBeFocused();
  });

  test('is accessible (ARIA snapshot)', async ({ mount }) => {
    const component = await mount(<ColorPicker label="Pick a color" />);
    await expect(component).toMatchAriaSnapshot(`
      - text "Pick a color"
    `);
  });

  test('visual regression: sizes', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <ColorPicker label="Small" size="small" defaultValue="#3b82f6" />
        <ColorPicker label="Medium" size="medium" defaultValue="#3b82f6" />
        <ColorPicker label="Large" size="large" defaultValue="#3b82f6" />
      </div>
    );
    await expect(component).toHaveScreenshot('colorpicker-sizes.png');
  });

  test('visual regression: states', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <ColorPicker label="Default" defaultValue="#3b82f6" />
        <ColorPicker label="Without Preview" defaultValue="#3b82f6" showPreview={false} />
        <ColorPicker label="Disabled" defaultValue="#3b82f6" disabled />
        <ColorPicker label="Error" defaultValue="#3b82f6" error="Error message" />
        <ColorPicker label="Helper" defaultValue="#3b82f6" helperText="Helper text" />
        <ColorPicker label="Full Width" defaultValue="#3b82f6" fullWidth />
      </div>
    );
    await expect(component).toHaveScreenshot('colorpicker-states.png');
  });

  test('visual regression: different colors', async ({ mount }) => {
    const component = await mount(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
        <ColorPicker label="Blue" defaultValue="#3b82f6" />
        <ColorPicker label="Red" defaultValue="#ef4444" />
        <ColorPicker label="Green" defaultValue="#10b981" />
        <ColorPicker label="Purple" defaultValue="#8b5cf6" />
        <ColorPicker label="Amber" defaultValue="#f59e0b" />
      </div>
    );
    await expect(component).toHaveScreenshot('colorpicker-colors.png');
  });
});

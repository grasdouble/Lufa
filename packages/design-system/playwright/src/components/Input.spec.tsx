import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Input } from '@grasdouble/lufa_design-system';

test.describe('Input', () => {
  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(<Input placeholder="Accessible Input" />);
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Input placeholder="Enter text" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveAttribute('placeholder', 'Enter text');
  });

  test('should handle value changes', async ({ mount }) => {
    const component = await mount(<Input />);
    await component.fill('Hello World');
    await expect(component).toHaveValue('Hello World');
  });

  test('should apply error state', async ({ mount }) => {
    const component = await mount(<Input error placeholder="Error" />);
    await expect(component).toHaveClass(/error/);
  });

  test('should apply disabled state', async ({ mount }) => {
    const component = await mount(<Input disabled placeholder="Disabled" />);
    await expect(component).toBeDisabled();
    await expect(component).toHaveClass(/disabled/);
  });

  test('should apply fullWidth state', async ({ mount }) => {
    const component = await mount(<Input fullWidth />);
    await expect(component).toHaveClass(/fullWidth/);
  });

  test('should match snapshot', async ({ mount }) => {
    const component = await mount(<Input placeholder="Snapshot" />);
    await expect(component).toHaveScreenshot();
  });

  test('should match snapshot - error', async ({ mount }) => {
    const component = await mount(<Input error placeholder="Error Snapshot" />);
    await expect(component).toHaveScreenshot();
  });
});

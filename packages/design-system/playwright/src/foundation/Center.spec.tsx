import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Center } from '@grasdouble/lufa_design-system';

test.describe('Center', () => {
  test('should render content centered', async ({ mount }) => {
    const component = await mount(
      <Center style={{ width: '200px', height: '100px', background: '#ccc' }}>
        Centered
      </Center>
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveText('Centered');
    
    // Check computed styles for centering
    await expect(component).toHaveCSS('display', 'flex');
    await expect(component).toHaveCSS('justify-content', 'center');
    await expect(component).toHaveCSS('align-items', 'center');
  });

  test('should render inline', async ({ mount }) => {
    const component = await mount(<Center inline>Inline</Center>);
    await expect(component).toHaveCSS('display', 'inline-flex');
  });

  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(
      <Center>
        <button>Click me</button>
      </Center>
    );
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('visual regression - default', async ({ mount }) => {
    const component = await mount(
      <Center style={{ width: '200px', height: '100px', border: '1px solid black' }}>
        <div>Item</div>
      </Center>
    );
    await expect(component).toHaveScreenshot();
  });
});

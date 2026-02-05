import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Flex } from '@grasdouble/lufa_design-system';

test.describe('Flex', () => {
  test('should render properly', async ({ mount }) => {
    const component = await mount(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('display', 'flex');
  });

  test('should apply flex direction', async ({ mount }) => {
    const component = await mount(
      <Flex direction="column">
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>
    );
    await expect(component).toHaveCSS('flex-direction', 'column');
  });

  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(
      <Flex>
        <span>Valid text</span>
      </Flex>
    );
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('visual regression - gap', async ({ mount }) => {
    const component = await mount(
      <Flex gap="default" style={{ border: '1px solid black' }}>
        <div style={{ background: 'red', width: 20, height: 20 }} />
        <div style={{ background: 'blue', width: 20, height: 20 }} />
      </Flex>
    );
    await expect(component).toHaveScreenshot();
  });
});

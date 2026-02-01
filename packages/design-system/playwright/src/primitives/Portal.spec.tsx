import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Portal } from '@grasdouble/lufa_design-system';

test.describe('Portal', () => {
  // Test interaction with Portal is tricky in component testing because it renders outside root.
  // We mostly verify it doesn't crash and renders content.

  test('should render content in portal', async ({ mount, page }) => {
    await mount(
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>
    );

    // Locate element on page (it attaches to body)
    const content = page.getByTestId('portal-content');
    await expect(content).toBeVisible();
    await expect(content).toHaveText('Portal Content');
  });

  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(
      <Portal>
        <div role="status">Accessible Status Message</div>
      </Portal>
    );
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

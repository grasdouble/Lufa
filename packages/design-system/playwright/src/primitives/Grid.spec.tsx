import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Grid } from '@grasdouble/lufa_design-system';

test.describe('Grid', () => {
  test('should render properly', async ({ mount }) => {
    const component = await mount(
      <Grid columns={3}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Grid>
    );
    await expect(component).toBeVisible();
    await expect(component).toHaveCSS('display', 'grid');
  });

  test('visual regression - 3 columns with gap', async ({ mount }) => {
    const component = await mount(
      <Grid columns={3} gap="default" style={{ width: '300px' }}>
        <div style={{ background: '#ddd', height: 20 }}>1</div>
        <div style={{ background: '#ddd', height: 20 }}>2</div>
        <div style={{ background: '#ddd', height: 20 }}>3</div>
        <div style={{ background: '#ddd', height: 20 }}>4</div>
      </Grid>
    );
    await expect(component).toHaveScreenshot();
  });

  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(
      <Grid>
        <span>Content</span>
      </Grid>
    );
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

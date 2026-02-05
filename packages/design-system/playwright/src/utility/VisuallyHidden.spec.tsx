import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { VisuallyHidden } from '@grasdouble/lufa_design-system';

test.describe('VisuallyHidden', () => {
  test('should not be visible visually but exist in DOM', async ({ mount }) => {
    const component = await mount(
      <VisuallyHidden>Hidden Text</VisuallyHidden>
    );

    // Be careful: toBeVisible() checks visibility using style, opacity, etc.
    // VisuallyHidden sets width/height to 1px and clip, so it might technically be "visible" to playwright
    // depending on how strictly it checks "clip".
    // Usually, screen reader only content is considered "hidden" by playwright's standard rules if size < 1px.
    // But our CSS uses 1px.
    // Let's check CSS properties instead.
    
    await expect(component).toHaveCSS('position', 'absolute');
    await expect(component).toHaveCSS('clip', 'rect(0px, 0px, 0px, 0px)');
    await expect(component).toHaveText('Hidden Text');
  });

  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(
      <button>
        <span>Icon</span>
        <VisuallyHidden>Label</VisuallyHidden>
      </button>
    );
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

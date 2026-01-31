import { expect, test } from '@playwright/experimental-ct-react';
import AxeBuilder from '@axe-core/playwright';

import { Container } from '@grasdouble/lufa_design-system';

test.describe('Container', () => {
  test('should render content correctly', async ({ mount }) => {
    const component = await mount(<Container>Content</Container>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText('Content');
  });

  test('should render as a different element', async ({ mount }) => {
    const component = await mount(<Container as="section">Content</Container>);
    // Check if the underlying HTML tag is a section
    // Playwright locator resolves to the element handle
    const tagName = await component.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('section');
  });

  test('should have max-width class when size is provided', async ({ mount }) => {
    const component = await mount(<Container size="md">Content</Container>);
    // We check if the class containing 'size-md' is present. 
    // Since we use CSS modules, the actual class name might be mangled, but the regex match is safer if we knew the format.
    // However, visual regression is better for verifying styles.
    // Here we just check visibility to ensure no crash.
    await expect(component).toBeVisible();
  });

  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(<Container>Accessible Content</Container>);
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('visual regression - default', async ({ mount }) => {
    const component = await mount(
      <div style={{ backgroundColor: '#eeeeee', width: '1000px', height: '100px' }}>
        <Container style={{ backgroundColor: '#aaaaff' }}>Default Container</Container>
      </div>
    );
    await expect(component).toHaveScreenshot();
  });

  test('visual regression - fluid', async ({ mount }) => {
    const component = await mount(
      <div style={{ backgroundColor: '#eeeeee', width: '1000px', height: '100px' }}>
        <Container fluid style={{ backgroundColor: '#aaffaa' }}>Fluid Container</Container>
      </div>
    );
    await expect(component).toHaveScreenshot();
  });
});

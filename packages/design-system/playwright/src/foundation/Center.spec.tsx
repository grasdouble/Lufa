import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Center } from '@grasdouble/lufa_design-system';

test.describe('Center', () => {
  test('should render content centered', async ({ mount }) => {
    const component = await mount(
      <Center style={{ width: '200px', height: '100px', background: '#ccc' }}>Centered</Center>
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

  test.describe('Visual Regression', () => {
    test('visual regression - all variants', async ({ mount }) => {
      const component = await mount(
        <div style={{ padding: '32px', backgroundColor: 'var(--lufa-semantic-ui-background-page)', width: '800px' }}>
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Center Component - All Variants
          </h1>

          {/* Section 1: Default */}
          <section style={{ marginBottom: '40px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Default (flex)
            </h2>
            <Center style={{ width: '300px', height: '100px', border: '1px solid var(--lufa-core-neutral-border)' }}>
              <div style={{ backgroundColor: '#aaaaff', padding: '8px' }}>Centered Item</div>
            </Center>
          </section>

          {/* Section 2: Inline */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              Inline (inline-flex)
            </h2>
            <div style={{ border: '1px solid var(--lufa-core-neutral-border)', padding: '8px' }}>
              Text before{' '}
              <Center inline style={{ border: '1px dashed var(--lufa-core-neutral-border)', padding: '8px' }}>
                <div style={{ backgroundColor: '#aaffaa', padding: '4px' }}>Inline Center</div>
              </Center>{' '}
              text after
            </div>
          </section>
        </div>
      );
      await component.page().waitForTimeout(100);
      await expect(component).toHaveScreenshot('center-all-variants.png');
    });
  });
});

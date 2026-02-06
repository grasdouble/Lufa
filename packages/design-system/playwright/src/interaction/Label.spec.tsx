import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Input, Label } from '@grasdouble/lufa_design-system';

test.describe('Label', () => {
  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(<Label>Accessible Label</Label>);
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Label>Label Text</Label>);
    await expect(component).toBeVisible();
    await expect(component).toHaveText('Label Text');
  });

  test('should associate with input via htmlFor', async ({ mount }) => {
    const component = await mount(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <Input id="test-input" />
      </>
    );
    await expect(component.getByText('Test Label')).toBeVisible();
    await expect(component.getByLabel('Test Label')).toBeVisible();
  });

  test('should support polymorphism', async ({ mount }) => {
    const component = await mount(<Label as="span">Span Label</Label>);
    await expect(component).toHaveText('Span Label');
  });
});

test.describe('Visual Regression', () => {
  test('should match snapshot - all variants', async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: '32px', backgroundColor: 'var(--lufa-semantic-ui-background-page)', width: '600px' }}>
        <h1
          style={{
            marginBottom: '24px',
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'var(--lufa-semantic-ui-text-primary)',
          }}
        >
          Label Component - All Variants
        </h1>

        {/* Section 1: Default Label */}
        <section style={{ marginBottom: '24px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Default
          </h2>
          <Label>Default Label</Label>
        </section>

        {/* Section 2: With Input */}
        <section style={{ marginBottom: '24px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Associated with Input
          </h2>
          <Label htmlFor="test-input">Test Label</Label>
          <Input id="test-input" placeholder="Input field" />
        </section>

        {/* Section 3: Polymorphic (as span) */}
        <section>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            As Span Element
          </h2>
          <Label as="span">Span Label</Label>
        </section>
      </div>
    );

    await component.page().waitForTimeout(100);
    await expect(component).toHaveScreenshot('label-all-variants.png');
  });
});

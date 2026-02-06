import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Card, Container, Text } from '@grasdouble/lufa_design-system';

test.describe('Card', () => {
  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(
      <Card>
        <Text>Accessible Card</Text>
      </Card>
    );
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should render correctly', async ({ mount }) => {
    const component = await mount(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    await expect(component).toBeVisible();
    await expect(component).toContainText('Card Content');
  });

  test('should support polymorphism', async ({ mount }) => {
    const component = await mount(
      <Card as="section">
        <Text>Section Card</Text>
      </Card>
    );
    await expect(component).toHaveAttribute('class', /card/);
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants', async ({ mount }) => {
      const component = await mount(
        <Container>
          <Text variant="h1">Card Component - All Variants</Text>
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--lufa-semantic-ui-text-primary)',
            }}
          >
            Card Component - All Variants
          </h1>

          {/* Section 1: Default Card */}
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
            <Card>
              <Text>Default Card Content</Text>
            </Card>
          </section>

          {/* Section 2: Card with Multiple Children */}
          <section style={{ marginBottom: '24px' }}>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              With Multiple Elements
            </h2>
            <Card>
              <Text variant="h3" weight="bold">
                Card Title
              </Text>
              <Text variant="body" color="secondary" style={{ marginTop: '8px' }}>
                This is the card body with some descriptive text about the content.
              </Text>
              <Text variant="caption" color="tertiary" style={{ marginTop: '12px' }}>
                Footer information
              </Text>
            </Card>
          </section>

          {/* Section 3: Polymorphic (as section) */}
          <section>
            <h2
              style={{
                marginBottom: '16px',
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--lufa-semantic-ui-text-secondary)',
              }}
            >
              As Section Element
            </h2>
            <Card as="section">
              <Text>Card rendered as section element</Text>
            </Card>
          </section>
        </Container>
      );

      await component.page().waitForTimeout(100);
      await expect(component).toHaveScreenshot('card-all-variants.png');
    });
  });
});

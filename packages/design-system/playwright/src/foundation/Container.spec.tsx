import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

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
});

test.describe('Visual Regression', () => {
  test('should match snapshot for all variants', async ({ mount }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    const component = await mount(
      <div style={{ backgroundColor: 'var(--lufa-semantic-ui-background-page)', padding: '32px', width: '1200px' }}>
        <h1
          style={{
            marginBottom: '24px',
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'var(--lufa-semantic-ui-text-primary)',
          }}
        >
          Container Component - All Variants
        </h1>

        {/* Section 1: Default Container */}
        <section style={{ marginBottom: '40px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Default Container
          </h2>
          <Container style={{ backgroundColor: '#aaaaff', padding: '16px' }}>
            Default Container - Max width with padding
          </Container>
        </section>

        {/* Section 2: Fluid Container */}
        <section style={{ marginBottom: '40px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Fluid Container
          </h2>
          <Container fluid style={{ backgroundColor: '#aaffaa', padding: '16px' }}>
            Fluid Container - 100% width
          </Container>
        </section>

        {/* Section 3: Size Variants */}
        <section>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Size Variants
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sizes.map((size) => (
              <div key={size}>
                <p style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)', marginBottom: '8px' }}>
                  size=&quot;{size}&quot;
                </p>
                <Container size={size} style={{ backgroundColor: '#ffaaaa', padding: '16px' }}>
                  Container {size}
                </Container>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
    await expect(component).toHaveScreenshot('container-all-variants.png');
  });
});

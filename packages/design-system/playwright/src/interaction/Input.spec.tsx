import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

import { Input } from '@grasdouble/lufa_design-system';

test.describe('Input', () => {
  test('should pass a11y checks', async ({ mount, page }) => {
    await mount(<Input placeholder="Accessible Input" />);
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['page-has-heading-one', 'landmark-one-main', 'region'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should render correctly', async ({ mount }) => {
    const component = await mount(<Input placeholder="Enter text" />);
    await expect(component).toBeVisible();
    await expect(component).toHaveAttribute('placeholder', 'Enter text');
  });

  test('should handle value changes', async ({ mount }) => {
    const component = await mount(<Input />);
    await component.fill('Hello World');
    await expect(component).toHaveValue('Hello World');
  });

  test('should apply error state', async ({ mount }) => {
    const component = await mount(<Input error placeholder="Error" />);
    await expect(component).toHaveClass(/error/);
  });

  test('should apply disabled state', async ({ mount }) => {
    const component = await mount(<Input disabled placeholder="Disabled" />);
    await expect(component).toBeDisabled();
    await expect(component).toHaveClass(/disabled/);
  });

  test('should apply fullWidth state', async ({ mount }) => {
    const component = await mount(<Input fullWidth />);
    await expect(component).toHaveClass(/fullWidth/);
  });
});

test.describe('Visual Regression', () => {
  test('should match snapshot for all variants', async ({ mount }) => {
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
          Input Component - All Variants
        </h1>

        {/* Section 1: Default State */}
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
          <Input placeholder="Enter text" />
        </section>

        {/* Section 2: With Value */}
        <section style={{ marginBottom: '24px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            With Value
          </h2>
          <Input value="Hello World" readOnly />
        </section>

        {/* Section 3: Error State */}
        <section style={{ marginBottom: '24px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Error State
          </h2>
          <Input error placeholder="Error input" />
        </section>

        {/* Section 4: Disabled State */}
        <section style={{ marginBottom: '24px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Disabled
          </h2>
          <Input disabled placeholder="Disabled input" />
        </section>

        {/* Section 5: Full Width */}
        <section>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Full Width
          </h2>
          <Input fullWidth placeholder="Full width input" />
        </section>
      </div>
    );
    await expect(component).toHaveScreenshot('input-all-variants.png');
  });
});

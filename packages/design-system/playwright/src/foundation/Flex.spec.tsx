import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

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
});

test.describe('Visual Regression', () => {
  test('should match snapshot for all variants', async ({ mount }) => {
    const directions = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
    const gaps = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const;

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
          Flex Component - All Variants
        </h1>

        {/* Section 1: Directions */}
        <section style={{ marginBottom: '40px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Directions
          </h2>
          {directions.map((direction) => (
            <div key={direction} style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)', marginBottom: '8px' }}>
                direction=&quot;{direction}&quot;
              </p>
              <Flex
                direction={direction}
                style={{ border: '1px solid var(--lufa-core-neutral-border-default)', padding: '8px' }}
              >
                <div style={{ background: 'red', width: 40, height: 40 }}>1</div>
                <div style={{ background: 'blue', width: 40, height: 40 }}>2</div>
                <div style={{ background: 'green', width: 40, height: 40 }}>3</div>
              </Flex>
            </div>
          ))}
        </section>

        {/* Section 2: Gap Values */}
        <section>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Gap Values
          </h2>
          {gaps.map((gap) => (
            <div key={gap} style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)', marginBottom: '8px' }}>
                gap=&quot;{gap}&quot;
              </p>
              <Flex gap={gap} style={{ border: '1px solid var(--lufa-core-neutral-border-default)', padding: '8px' }}>
                <div style={{ background: 'red', width: 30, height: 30 }} />
                <div style={{ background: 'blue', width: 30, height: 30 }} />
                <div style={{ background: 'green', width: 30, height: 30 }} />
              </Flex>
            </div>
          ))}
        </section>
      </div>
    );
    await expect(component).toHaveScreenshot('flex-all-variants.png');
  });
});

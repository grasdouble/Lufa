import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/experimental-ct-react';

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

test.describe('Visual Regression', () => {
  test('should match snapshot for all variants', async ({ mount }) => {
    const columnCounts = [1, 2, 3, 4, 6] as const;
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
          Grid Component - All Variants
        </h1>

        {/* Section 1: Column Counts */}
        <section style={{ marginBottom: '40px' }}>
          <h2
            style={{
              marginBottom: '16px',
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--lufa-semantic-ui-text-secondary)',
            }}
          >
            Column Counts
          </h2>
          {columnCounts.map((cols) => (
            <div key={cols} style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)', marginBottom: '8px' }}>
                columns={cols}
              </p>
              <Grid
                columns={cols}
                gap="tight"
                style={{ border: '1px solid var(--lufa-core-neutral-border)', padding: '8px' }}
              >
                {Array.from({ length: cols * 2 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--lufa-core-neutral-surface-hover)',
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
              </Grid>
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
            Gap Values (3 columns)
          </h2>
          {gaps.map((gap) => (
            <div key={gap} style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--lufa-semantic-ui-text-secondary)', marginBottom: '8px' }}>
                gap=&quot;{gap}&quot;
              </p>
              <Grid
                columns={3}
                gap={gap}
                style={{ border: '1px solid var(--lufa-core-neutral-border)', padding: '8px' }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ background: 'var(--lufa-core-neutral-surface-hover)', height: 30 }} />
                ))}
              </Grid>
            </div>
          ))}
        </section>
      </div>
    );
    await expect(component).toHaveScreenshot('grid-all-variants-light.png');
  });
});

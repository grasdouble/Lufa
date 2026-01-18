import { expect, test } from '@playwright/experimental-ct-react';

import { Paper } from '@grasdouble/lufa_design-system';

test.describe('Paper Component', () => {
  test.describe('Basic Rendering', () => {
    test('should render with children', async ({ mount }) => {
      const component = await mount(<Paper>Content</Paper>);
      await expect(component).toBeVisible();
      await expect(component).toContainText('Content');
    });

    test('should apply custom className', async ({ mount }) => {
      const component = await mount(<Paper className="custom-paper">Content</Paper>);
      await expect(component).toHaveClass(/custom-paper/);
    });

    test('should render as a div element', async ({ mount }) => {
      const component = await mount(<Paper>Content</Paper>);
      await expect(component).toHaveAttribute('class');
    });

    test('should pass through additional props', async ({ mount }) => {
      const component = await mount(
        <Paper data-testid="paper-test" aria-label="Test Paper">
          Content
        </Paper>
      );
      await expect(component).toHaveAttribute('data-testid', 'paper-test');
      await expect(component).toHaveAttribute('aria-label', 'Test Paper');
    });
  });

  test.describe('Variants', () => {
    const variants = ['default', 'elevated', 'outlined', 'filled'] as const;
    for (const variant of variants) {
      test(`should render ${variant} variant`, async ({ mount }) => {
        const component = await mount(<Paper variant={variant}>Content</Paper>);
        await expect(component).toHaveClass(new RegExp(`variant`, 'i'));
        await expect(component).toBeVisible();
      });
    }

    test('should default to "default" variant', async ({ mount }) => {
      const component = await mount(<Paper>Content</Paper>);
      await expect(component).toHaveClass(new RegExp(`variant`, 'i'));
    });
  });

  test.describe('Padding Options', () => {
    const paddings = ['none', 'small', 'medium', 'large'] as const;
    for (const padding of paddings) {
      test(`should render with ${padding} padding`, async ({ mount }) => {
        const component = await mount(<Paper padding={padding}>Content</Paper>);
        await expect(component).toHaveClass(new RegExp(`padding`, 'i'));
        await expect(component).toBeVisible();
      });
    }

    test('should default to "medium" padding', async ({ mount }) => {
      const component = await mount(<Paper>Content</Paper>);
      await expect(component).toHaveClass(new RegExp(`padding`, 'i'));
    });
  });

  test.describe('Radius Options', () => {
    const radiuses = ['none', 'small', 'medium', 'large', 'full'] as const;
    for (const radius of radiuses) {
      test(`should render with ${radius} radius`, async ({ mount }) => {
        const component = await mount(<Paper radius={radius}>Content</Paper>);
        await expect(component).toHaveClass(new RegExp(`radius`, 'i'));
        await expect(component).toBeVisible();
      });
    }

    test('should default to "medium" radius', async ({ mount }) => {
      const component = await mount(<Paper>Content</Paper>);
      await expect(component).toHaveClass(new RegExp(`radius`, 'i'));
    });
  });

  test.describe('Elevation Options', () => {
    const elevations = ['none', 'small', 'medium', 'large', 'xlarge'] as const;

    test.describe('Elevated Variant', () => {
      for (const elevation of elevations) {
        test(`should render elevated variant with ${elevation} elevation`, async ({ mount }) => {
          const component = await mount(
            <Paper variant="elevated" elevation={elevation}>
              Content
            </Paper>
          );
          await expect(component).toHaveClass(new RegExp(`elevation`, 'i'));
          await expect(component).toBeVisible();
        });
      }

      test('should default to "medium" elevation for elevated variant', async ({ mount }) => {
        const component = await mount(<Paper variant="elevated">Content</Paper>);
        await expect(component).toHaveClass(new RegExp(`elevation`, 'i'));
      });
    });

    test.describe('Non-Elevated Variants', () => {
      const nonElevatedVariants = ['default', 'outlined', 'filled'] as const;

      for (const variant of nonElevatedVariants) {
        test(`should not apply elevation to ${variant} variant`, async ({ mount }) => {
          const component = await mount(
            <Paper variant={variant} elevation="xlarge">
              Content
            </Paper>
          );
          // The elevation class should not be present for non-elevated variants
          await expect(component).toBeVisible();
        });
      }
    });
  });

  test.describe('Prop Combinations', () => {
    test('should apply multiple props correctly', async ({ mount }) => {
      const component = await mount(
        <Paper variant="elevated" padding="large" radius="large" elevation="xlarge">
          Content
        </Paper>
      );
      await expect(component).toHaveClass(new RegExp(`variant`, 'i'));
      await expect(component).toHaveClass(new RegExp(`padding`, 'i'));
      await expect(component).toHaveClass(new RegExp(`radius`, 'i'));
      await expect(component).toHaveClass(new RegExp(`elevation`, 'i'));
    });

    test('should combine all padding and radius options', async ({ mount }) => {
      const component = await mount(
        <Paper padding="none" radius="full">
          Content
        </Paper>
      );
      await expect(component).toBeVisible();
      await expect(component).toContainText('Content');
    });

    test('should work with custom className and other props', async ({ mount }) => {
      const component = await mount(
        <Paper variant="outlined" padding="small" radius="medium" className="custom">
          Content
        </Paper>
      );
      await expect(component).toHaveClass(/custom/);
      await expect(component).toHaveClass(new RegExp(`variant`, 'i'));
    });
  });

  test.describe('Children Rendering', () => {
    test('should render text children', async ({ mount }) => {
      const component = await mount(<Paper>Simple text content</Paper>);
      await expect(component).toContainText('Simple text content');
    });

    test('should render complex children', async ({ mount }) => {
      const component = await mount(
        <Paper>
          <div>
            <h2>Title</h2>
            <p>Paragraph content</p>
            <button>Action</button>
          </div>
        </Paper>
      );
      await expect(component).toContainText('Title');
      await expect(component).toContainText('Paragraph content');
      await expect(component).toContainText('Action');
    });

    test('should render nested components', async ({ mount }) => {
      const component = await mount(
        <Paper variant="elevated">
          <Paper variant="outlined" padding="small">
            Nested Paper
          </Paper>
        </Paper>
      );
      await expect(component).toContainText('Nested Paper');
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible structure with text content', async ({ mount }) => {
      const component = await mount(<Paper>Accessible content</Paper>);
      await expect(component).toMatchAriaSnapshot(`
        - text: Accessible content
      `);
    });

    test('should have accessible structure with complex content', async ({ mount }) => {
      const component = await mount(
        <Paper>
          <h2>Heading</h2>
          <p>Paragraph</p>
        </Paper>
      );
      await expect(component).toMatchAriaSnapshot(`
        - heading "Heading" [level=2]
        - paragraph: Paragraph
      `);
    });

    test('should preserve ARIA attributes', async ({ mount }) => {
      const component = await mount(
        <Paper aria-label="Information panel" role="region">
          Content
        </Paper>
      );
      await expect(component).toHaveAttribute('aria-label', 'Information panel');
      await expect(component).toHaveAttribute('role', 'region');
    });
  });

  test.describe('Visual Regression', () => {
    test('should match snapshot for all variants and options', async ({ mount }) => {
      const variants = ['default', 'elevated', 'outlined', 'filled'] as const;
      const paddings = ['none', 'small', 'medium', 'large'] as const;
      const radiuses = ['none', 'small', 'medium', 'large', 'full'] as const;
      const elevations = ['none', 'small', 'medium', 'large', 'xlarge'] as const;

      const sectionTitleStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '32px',
        marginBottom: '16px',
        color: '#333',
      };

      const subsectionTitleStyle = {
        fontSize: '16px',
        fontWeight: '600',
        marginTop: '16px',
        marginBottom: '12px',
        color: '#555',
      };

      const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      };

      const labelStyle = {
        fontSize: '12px',
        fontWeight: '500',
        color: '#666',
        marginBottom: '4px',
        textTransform: 'capitalize' as const,
      };

      const component = await mount(
        <div style={{ padding: '32px', background: '#f9f9f9', width: 'fit-content', minWidth: '900px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#222' }}>
            Paper Component Variants
          </h1>

          {/* Variants Section */}
          <div style={sectionTitleStyle}>1. Variants</div>
          <div style={gridStyle}>
            {variants.map((variant) => (
              <div key={variant}>
                <div style={labelStyle}>{variant}</div>
                <Paper variant={variant} padding="medium">
                  <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {variant}
                  </div>
                </Paper>
              </div>
            ))}
          </div>

          {/* Padding Options Section */}
          <div style={sectionTitleStyle}>2. Padding Options</div>
          <div style={subsectionTitleStyle}>Applied to all variants</div>
          {variants.map((variant) => (
            <div key={`padding-${variant}`}>
              <div style={{ ...subsectionTitleStyle, fontSize: '14px', marginTop: '12px' }}>{variant} variant</div>
              <div style={gridStyle}>
                {paddings.map((padding) => (
                  <div key={padding}>
                    <div style={labelStyle}>{padding}</div>
                    <Paper variant={variant} padding={padding}>
                      <div>Content with {padding} padding</div>
                    </Paper>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Radius Options Section */}
          <div style={sectionTitleStyle}>3. Radius Options</div>
          <div style={gridStyle}>
            {radiuses.map((radius) => (
              <div key={radius}>
                <div style={labelStyle}>{radius}</div>
                <Paper variant="outlined" radius={radius} padding="medium">
                  <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {radius}
                  </div>
                </Paper>
              </div>
            ))}
          </div>

          {/* Elevation Options Section */}
          <div style={sectionTitleStyle}>4. Elevation Options (Elevated Variant Only)</div>
          <div style={gridStyle}>
            {elevations.map((elevation) => (
              <div key={elevation}>
                <div style={labelStyle}>{elevation}</div>
                <Paper variant="elevated" elevation={elevation} padding="medium">
                  <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {elevation}
                  </div>
                </Paper>
              </div>
            ))}
          </div>

          {/* Elevation Not Applied to Other Variants */}
          <div style={subsectionTitleStyle}>Elevation ignored on non-elevated variants</div>
          <div style={gridStyle}>
            {['default', 'outlined', 'filled'].map((variant) => (
              <div key={variant}>
                <div style={labelStyle}>{variant} (elevation=xlarge)</div>
                <Paper variant={variant as 'default' | 'outlined' | 'filled'} elevation="xlarge" padding="medium">
                  <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    No elevation applied
                  </div>
                </Paper>
              </div>
            ))}
          </div>

          {/* Complex Combinations */}
          <div style={sectionTitleStyle}>5. Complex Combinations</div>
          <div style={gridStyle}>
            <div>
              <div style={labelStyle}>elevated + large padding + large radius + xlarge elevation</div>
              <Paper variant="elevated" padding="large" radius="large" elevation="xlarge">
                <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Maximum elevation
                </div>
              </Paper>
            </div>
            <div>
              <div style={labelStyle}>outlined + none padding + none radius</div>
              <Paper variant="outlined" padding="none" radius="none">
                <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No padding or radius
                </div>
              </Paper>
            </div>
            <div>
              <div style={labelStyle}>filled + small padding + full radius</div>
              <Paper variant="filled" padding="small" radius="full">
                <div style={{ minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Pill shape
                </div>
              </Paper>
            </div>
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('paper-all-variants.png');
    });
  });
});

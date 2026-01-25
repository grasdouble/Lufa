import { expect, test } from '@playwright/experimental-ct-react';

import { Grid } from '@grasdouble/lufa_design-system';

test.describe('Grid Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options in light mode', async ({ mount }) => {
      const gutters = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

      const sectionTitleStyle = {
        fontWeight: 700,
        fontSize: 20,
        margin: '0 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
      };
      const labelStyle = { fontSize: 12, color: 'var(--lufa-token-color-text-secondary)', marginBottom: 8 };
      const boxStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
      const containerStyle = {
        border: '2px dashed var(--lufa-token-color-border-default)',
        background: 'var(--lufa-token-color-background-primary)',
        padding: 16,
        marginBottom: 24,
      };

      // Helper to generate grid items
      const generateItems = (count: number) =>
        Array.from({ length: count }, (_, i) => (
          <div key={i} style={boxStyle}>
            {i + 1}
          </div>
        ));

      const component = await mount(
        <div
          style={{
            padding: 32,
            background: 'var(--lufa-token-color-background-primary)',
            fontFamily: 'sans-serif',
            width: '900px',
          }}
        >
          {/* Column Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Column Options</h2>

            {/* Single */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="single" (1 column)</p>
              <div style={containerStyle}>
                <Grid columns="single">{generateItems(3)}</Grid>
              </div>
            </div>

            {/* Double */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="double" (2 columns)</p>
              <div style={containerStyle}>
                <Grid columns="double">{generateItems(4)}</Grid>
              </div>
            </div>

            {/* Triple */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="triple" (3 columns)</p>
              <div style={containerStyle}>
                <Grid columns="triple">{generateItems(6)}</Grid>
              </div>
            </div>

            {/* Quad */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="quad" (4 columns)</p>
              <div style={containerStyle}>
                <Grid columns="quad">{generateItems(8)}</Grid>
              </div>
            </div>

            {/* Six */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="six" (6 columns)</p>
              <div style={containerStyle}>
                <Grid columns="six">{generateItems(12)}</Grid>
              </div>
            </div>

            {/* Eight */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="eight" (8 columns)</p>
              <div style={containerStyle}>
                <Grid columns="eight">{generateItems(16)}</Grid>
              </div>
            </div>

            {/* Twelve */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="twelve" (12 columns, default)</p>
              <div style={containerStyle}>
                <Grid columns="twelve">{generateItems(12)}</Grid>
              </div>
            </div>

            {/* Sixteen */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="sixteen" (16 columns)</p>
              <div style={containerStyle}>
                <Grid columns="sixteen">{generateItems(16)}</Grid>
              </div>
            </div>
          </div>

          {/* Gutter Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gutter Options (using quad layout)</h2>

            {gutters.map((gutter) => (
              <div key={gutter} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>gutter="{gutter}"</p>
                <div style={containerStyle}>
                  <Grid columns="quad" gutter={gutter}>
                    {generateItems(8)}
                  </Grid>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props Examples</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="triple" + gutter="lg"</p>
              <div style={containerStyle}>
                <Grid columns="triple" gutter="lg">
                  {generateItems(6)}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="double" + gutter="none"</p>
              <div style={containerStyle}>
                <Grid columns="double" gutter="none">
                  {generateItems(4)}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="six" + gutter="xs"</p>
              <div style={containerStyle}>
                <Grid columns="six" gutter="xs">
                  {generateItems(12)}
                </Grid>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Product Grid (triple columns, medium gutter)</p>
              <div style={containerStyle}>
                <Grid columns="triple" gutter="md">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        ...boxStyle,
                        background: 'white',
                        color: 'var(--lufa-token-color-text-primary)',
                        border: '1px solid #e0e0e0',
                        flexDirection: 'column',
                        gap: 8,
                        padding: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          background: '#667eea',
                          width: '100%',
                          height: 120,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        Image
                      </div>
                      <div style={{ padding: 12 }}>
                        <div style={{ fontWeight: 600 }}>Product {i + 1}</div>
                        <div style={{ fontSize: 12, color: 'var(--lufa-token-color-text-secondary)' }}>$99.99</div>
                      </div>
                    </div>
                  ))}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Dashboard Cards (quad columns, large gutter)</p>
              <div style={containerStyle}>
                <Grid columns="quad" gutter="lg">
                  {[
                    { label: 'Users', value: '1,234' },
                    { label: 'Revenue', value: '$45.6K' },
                    { label: 'Orders', value: '567' },
                    { label: 'Growth', value: '+12%' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      style={{
                        ...boxStyle,
                        flexDirection: 'column',
                        background: 'white',
                        color: 'var(--lufa-token-color-text-primary)',
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <div style={{ fontSize: 24, fontWeight: 700, color: '#667eea' }}>{stat.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--lufa-token-color-text-secondary)' }}>{stat.label}</div>
                    </div>
                  ))}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Image Gallery (six columns, small gutter)</p>
              <div style={containerStyle}>
                <Grid columns="six" gutter="sm">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      style={{ ...boxStyle, background: `hsl(${i * 30}, 70%, 60%)`, padding: 0, minHeight: 80 }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </Grid>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Feature Highlights (double columns, extra large gutter)</p>
              <div style={containerStyle}>
                <Grid columns="double" gutter="xl">
                  {[
                    { icon: '🚀', title: 'Fast', desc: 'Lightning fast performance' },
                    { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
                    { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
                    { icon: '🎨', title: 'Beautiful', desc: 'Stunning user interface' },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        ...boxStyle,
                        background: 'white',
                        color: 'var(--lufa-token-color-text-primary)',
                        border: '1px solid #e0e0e0',
                        flexDirection: 'column',
                        gap: 8,
                        textAlign: 'left' as const,
                        alignItems: 'flex-start',
                        padding: 24,
                      }}
                    >
                      <div style={{ fontSize: 32 }}>{feature.icon}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--lufa-token-color-text-primary)' }}>
                        {feature.title}
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--lufa-token-color-text-secondary)' }}>
                        {feature.desc}
                      </div>
                    </div>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('grid-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: all variants and options in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const gutters = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;

      const sectionTitleStyle = {
        fontWeight: 700,
        fontSize: 20,
        margin: '0 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
      };
      const labelStyle = { fontSize: 12, color: 'var(--lufa-token-color-text-secondary)', marginBottom: 8 };
      const boxStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
      const containerStyle = {
        border: '2px dashed var(--lufa-token-color-text-secondary)',
        background: 'var(--lufa-token-color-background-primary)',
        padding: 16,
        marginBottom: 24,
      };

      // Helper to generate grid items
      const generateItems = (count: number) =>
        Array.from({ length: count }, (_, i) => (
          <div key={i} style={boxStyle}>
            {i + 1}
          </div>
        ));

      const component = await mount(
        <div
          style={{
            padding: 32,
            background: 'var(--lufa-token-color-background-primary)',
            fontFamily: 'sans-serif',
            width: '900px',
          }}
        >
          {/* Column Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Column Options</h2>

            {/* Single */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="single" (1 column)</p>
              <div style={containerStyle}>
                <Grid columns="single">{generateItems(3)}</Grid>
              </div>
            </div>

            {/* Double */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="double" (2 columns)</p>
              <div style={containerStyle}>
                <Grid columns="double">{generateItems(4)}</Grid>
              </div>
            </div>

            {/* Triple */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="triple" (3 columns)</p>
              <div style={containerStyle}>
                <Grid columns="triple">{generateItems(6)}</Grid>
              </div>
            </div>

            {/* Quad */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="quad" (4 columns)</p>
              <div style={containerStyle}>
                <Grid columns="quad">{generateItems(8)}</Grid>
              </div>
            </div>

            {/* Six */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="six" (6 columns)</p>
              <div style={containerStyle}>
                <Grid columns="six">{generateItems(12)}</Grid>
              </div>
            </div>

            {/* Eight */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="eight" (8 columns)</p>
              <div style={containerStyle}>
                <Grid columns="eight">{generateItems(16)}</Grid>
              </div>
            </div>

            {/* Twelve */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="twelve" (12 columns, default)</p>
              <div style={containerStyle}>
                <Grid columns="twelve">{generateItems(12)}</Grid>
              </div>
            </div>

            {/* Sixteen */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="sixteen" (16 columns)</p>
              <div style={containerStyle}>
                <Grid columns="sixteen">{generateItems(16)}</Grid>
              </div>
            </div>
          </div>

          {/* Gutter Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gutter Options (using quad layout)</h2>

            {gutters.map((gutter) => (
              <div key={gutter} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>gutter="{gutter}"</p>
                <div style={containerStyle}>
                  <Grid columns="quad" gutter={gutter}>
                    {generateItems(8)}
                  </Grid>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props Examples</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="triple" + gutter="lg"</p>
              <div style={containerStyle}>
                <Grid columns="triple" gutter="lg">
                  {generateItems(6)}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="double" + gutter="none"</p>
              <div style={containerStyle}>
                <Grid columns="double" gutter="none">
                  {generateItems(4)}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>columns="six" + gutter="xs"</p>
              <div style={containerStyle}>
                <Grid columns="six" gutter="xs">
                  {generateItems(12)}
                </Grid>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Product Grid (triple columns, medium gutter)</p>
              <div style={containerStyle}>
                <Grid columns="triple" gutter="md">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      style={{
                        ...boxStyle,
                        background: 'var(--lufa-token-color-background-primary)',
                        color: 'var(--lufa-token-color-text-primary)',
                        border: '1px solid var(--lufa-token-color-text-secondary)',
                        flexDirection: 'column',
                        gap: 8,
                        padding: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          background: '#667eea',
                          width: '100%',
                          height: 120,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        Image
                      </div>
                      <div style={{ padding: 12 }}>
                        <div style={{ fontWeight: 600 }}>Product {i + 1}</div>
                        <div style={{ fontSize: 12, color: 'var(--lufa-token-color-text-secondary)' }}>$99.99</div>
                      </div>
                    </div>
                  ))}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Dashboard Cards (quad columns, large gutter)</p>
              <div style={containerStyle}>
                <Grid columns="quad" gutter="lg">
                  {[
                    { label: 'Users', value: '1,234' },
                    { label: 'Revenue', value: '$45.6K' },
                    { label: 'Orders', value: '567' },
                    { label: 'Growth', value: '+12%' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      style={{
                        ...boxStyle,
                        flexDirection: 'column',
                        background: 'var(--lufa-token-color-background-primary)',
                        color: 'var(--lufa-token-color-text-primary)',
                        border: '1px solid var(--lufa-token-color-text-secondary)',
                      }}
                    >
                      <div style={{ fontSize: 24, fontWeight: 700, color: '#667eea' }}>{stat.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--lufa-token-color-text-secondary)' }}>{stat.label}</div>
                    </div>
                  ))}
                </Grid>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Image Gallery (six columns, small gutter)</p>
              <div style={containerStyle}>
                <Grid columns="six" gutter="sm">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      style={{ ...boxStyle, background: `hsl(${i * 30}, 70%, 60%)`, padding: 0, minHeight: 80 }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </Grid>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Feature Highlights (double columns, extra large gutter)</p>
              <div style={containerStyle}>
                <Grid columns="double" gutter="xl">
                  {[
                    { icon: '🚀', title: 'Fast', desc: 'Lightning fast performance' },
                    { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
                    { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
                    { icon: '🎨', title: 'Beautiful', desc: 'Stunning user interface' },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        ...boxStyle,
                        background: 'var(--lufa-token-color-background-primary)',
                        color: 'var(--lufa-token-color-text-primary)',
                        border: '1px solid var(--lufa-token-color-text-secondary)',
                        flexDirection: 'column',
                        gap: 8,
                        textAlign: 'left' as const,
                        alignItems: 'flex-start',
                        padding: 24,
                      }}
                    >
                      <div style={{ fontSize: 32 }}>{feature.icon}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--lufa-token-color-text-primary)' }}>
                        {feature.title}
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--lufa-token-color-text-secondary)' }}>
                        {feature.desc}
                      </div>
                    </div>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('grid-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});

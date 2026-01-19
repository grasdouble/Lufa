import { expect, test } from '@playwright/experimental-ct-react';

import { Center } from '@grasdouble/lufa_design-system';

test.describe('Center Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options in light mode', async ({ mount }) => {
      const axes = ['both', 'horizontal', 'vertical'] as const;
      const minHeights = [100, 200, '10rem'];

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };
      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 8 };
      const boxStyle = {
        background: '#667eea',
        color: 'white',
        padding: '12px 24px',
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
      };
      const containerStyle = { border: '2px dashed #ccc', background: '#fff', marginBottom: 24 };
      const inlineBoxStyle = {
        background: '#764ba2',
        color: 'white',
        padding: '8px 16px',
        borderRadius: 4,
        fontSize: 12,
        display: 'inline-block',
      };

      const component = await mount(
        <div style={{ padding: 32, background: '#ffffff', fontFamily: 'sans-serif', width: '900px' }}>
          {/* Axis Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Centering Axis</h2>
            {axes.map((axis) => (
              <div key={axis} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>axis="{axis}"</p>
                <div style={{ ...containerStyle, height: 200 }}>
                  <Center axis={axis}>
                    <div style={boxStyle}>{axis}</div>
                  </Center>
                </div>
              </div>
            ))}
          </div>

          {/* Block vs Inline */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Block vs Inline</h2>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>inline=false (default, uses flex)</p>
              <div style={{ ...containerStyle, height: 150 }}>
                <Center inline={false}>
                  <div style={boxStyle}>Block Center</div>
                </Center>
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>inline=true (uses inline-flex)</p>
              <div style={{ ...containerStyle, height: 150 }}>
                <Center inline>
                  <div style={inlineBoxStyle}>Inline Center</div>
                </Center>
                <span style={{ marginLeft: 16, color: '#666' }}>← inline-flex allows content to flow</span>
              </div>
            </div>
          </div>

          {/* MinHeight Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Min-Height Options</h2>
            {minHeights.map((minHeight, idx) => (
              <div key={idx} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>minHeight={typeof minHeight === 'number' ? `${minHeight}` : `"${minHeight}"`}</p>
                <div style={containerStyle}>
                  <Center minHeight={minHeight}>
                    <div style={boxStyle}>Min-height: {minHeight}</div>
                  </Center>
                </div>
              </div>
            ))}
          </div>

          {/* Different Elements */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Different HTML Elements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              {(['div', 'span', 'section', 'main'] as const).map((element) => (
                <div key={element}>
                  <p style={labelStyle}>as="{element}"</p>
                  <div style={{ ...containerStyle, height: 120 }}>
                    <Center as={element}>
                      <div style={boxStyle}>{element}</div>
                    </Center>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Props */}
          <div>
            <h2 style={sectionTitleStyle}>Combined Props</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <p style={labelStyle}>axis="horizontal" + inline=true + minHeight=150</p>
                <div style={containerStyle}>
                  <Center axis="horizontal" inline minHeight={150}>
                    <div style={inlineBoxStyle}>Combined 1</div>
                  </Center>
                </div>
              </div>
              <div>
                <p style={labelStyle}>axis="vertical" + minHeight=150</p>
                <div style={containerStyle}>
                  <Center axis="vertical" minHeight={150}>
                    <div style={boxStyle}>Combined 2</div>
                  </Center>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div style={{ marginTop: 48 }}>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
              <div>
                <p style={labelStyle}>Loading State</p>
                <div style={{ ...containerStyle, height: 200 }}>
                  <Center>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 48, color: '#667eea' }}>⟳</div>
                      <div style={{ color: '#666', marginTop: 8 }}>Loading...</div>
                    </div>
                  </Center>
                </div>
              </div>
              <div>
                <p style={labelStyle}>Empty State</p>
                <div style={{ ...containerStyle, height: 200 }}>
                  <Center>
                    <div style={{ textAlign: 'center', color: '#666' }}>
                      <div style={{ fontSize: 48 }}>📭</div>
                      <div style={{ marginTop: 8, fontWeight: 600 }}>No items found</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your filters</div>
                    </div>
                  </Center>
                </div>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('center-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: all variants and options in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const axes = ['both', 'horizontal', 'vertical'] as const;
      const minHeights = [100, 200, '10rem'];

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
        padding: '12px 24px',
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
      };
      const containerStyle = {
        border: '2px dashed #555',
        background: 'var(--lufa-token-color-background-primary)',
        marginBottom: 24,
      };
      const inlineBoxStyle = {
        background: '#764ba2',
        color: 'white',
        padding: '8px 16px',
        borderRadius: 4,
        fontSize: 12,
        display: 'inline-block',
      };

      const component = await mount(
        <div
          style={{
            padding: 32,
            background: 'var(--lufa-token-color-background-primary)',
            fontFamily: 'sans-serif',
            width: '900px',
          }}
        >
          {/* Axis Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Centering Axis</h2>
            {axes.map((axis) => (
              <div key={axis} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>axis="{axis}"</p>
                <div style={{ ...containerStyle, height: 200 }}>
                  <Center axis={axis}>
                    <div style={boxStyle}>{axis}</div>
                  </Center>
                </div>
              </div>
            ))}
          </div>

          {/* Block vs Inline */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Block vs Inline</h2>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>inline=false (default, uses flex)</p>
              <div style={{ ...containerStyle, height: 150 }}>
                <Center inline={false}>
                  <div style={boxStyle}>Block Center</div>
                </Center>
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>inline=true (uses inline-flex)</p>
              <div style={{ ...containerStyle, height: 150 }}>
                <Center inline>
                  <div style={inlineBoxStyle}>Inline Center</div>
                </Center>
                <span style={{ marginLeft: 16, color: 'var(--lufa-token-color-text-secondary)' }}>
                  ← inline-flex allows content to flow
                </span>
              </div>
            </div>
          </div>

          {/* MinHeight Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Min-Height Options</h2>
            {minHeights.map((minHeight, idx) => (
              <div key={idx} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>minHeight={typeof minHeight === 'number' ? `${minHeight}` : `"${minHeight}"`}</p>
                <div style={containerStyle}>
                  <Center minHeight={minHeight}>
                    <div style={boxStyle}>Min-height: {minHeight}</div>
                  </Center>
                </div>
              </div>
            ))}
          </div>

          {/* Different Elements */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Different HTML Elements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
              {(['div', 'span', 'section', 'main'] as const).map((element) => (
                <div key={element}>
                  <p style={labelStyle}>as="{element}"</p>
                  <div style={{ ...containerStyle, height: 120 }}>
                    <Center as={element}>
                      <div style={boxStyle}>{element}</div>
                    </Center>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Props */}
          <div>
            <h2 style={sectionTitleStyle}>Combined Props</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <p style={labelStyle}>axis="horizontal" + inline=true + minHeight=150</p>
                <div style={containerStyle}>
                  <Center axis="horizontal" inline minHeight={150}>
                    <div style={inlineBoxStyle}>Combined 1</div>
                  </Center>
                </div>
              </div>
              <div>
                <p style={labelStyle}>axis="vertical" + minHeight=150</p>
                <div style={containerStyle}>
                  <Center axis="vertical" minHeight={150}>
                    <div style={boxStyle}>Combined 2</div>
                  </Center>
                </div>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div style={{ marginTop: 48 }}>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
              <div>
                <p style={labelStyle}>Loading State</p>
                <div style={{ ...containerStyle, height: 200 }}>
                  <Center>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 48, color: '#667eea' }}>⟳</div>
                      <div style={{ color: 'var(--lufa-token-color-text-secondary)', marginTop: 8 }}>Loading...</div>
                    </div>
                  </Center>
                </div>
              </div>
              <div>
                <p style={labelStyle}>Empty State</p>
                <div style={{ ...containerStyle, height: 200 }}>
                  <Center>
                    <div style={{ textAlign: 'center', color: 'var(--lufa-token-color-text-secondary)' }}>
                      <div style={{ fontSize: 48 }}>📭</div>
                      <div style={{ marginTop: 8, fontWeight: 600, color: 'var(--lufa-token-color-text-primary)' }}>
                        No items found
                      </div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your filters</div>
                    </div>
                  </Center>
                </div>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('center-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});

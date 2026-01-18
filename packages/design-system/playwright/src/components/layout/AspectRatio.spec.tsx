import { expect, test } from '@playwright/experimental-ct-react';

import { AspectRatio } from '@grasdouble/lufa_design-system';

test.describe('AspectRatio Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options in light mode', async ({ mount }) => {
      const ratioTokens = [
        'square',
        'traditional',
        'photo',
        'video',
        'ultrawide',
        'vertical',
        'portrait',
        'portraitDisplay',
      ] as const;
      const customRatios = [1, 2, 0.5, 21 / 9, 9 / 16];

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };

      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 4, textAlign: 'center' as const };
      const boxStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 600,
        height: '100%',
        width: '100%',
      };
      const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 };
      const itemContainerStyle = { display: 'flex', flexDirection: 'column' as const };

      const component = await mount(
        <div style={{ padding: 32, background: '#ffffff', fontFamily: 'sans-serif', maxWidth: 1200, width: '900px' }}>
          {/* Token-based Ratios */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Token-based Aspect Ratios</h2>
            <div style={gridStyle}>
              {ratioTokens.map((ratio) => (
                <div key={ratio} style={itemContainerStyle}>
                  <p style={labelStyle}>{ratio}</p>
                  <AspectRatio ratio={ratio}>
                    <div style={boxStyle}>{ratio}</div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Numeric Ratios */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Custom Numeric Ratios</h2>
            <div style={gridStyle}>
              {customRatios.map((ratio, index) => (
                <div key={index} style={itemContainerStyle}>
                  <p style={labelStyle}>{typeof ratio === 'number' ? ratio.toFixed(2) : ratio}</p>
                  <AspectRatio ratio={ratio}>
                    <div style={boxStyle}>{ratio}</div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>

          {/* Different Content Types */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Different Content Types</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              {/* Image placeholder */}
              <div style={itemContainerStyle}>
                <p style={labelStyle}>Image (video ratio)</p>
                <AspectRatio ratio="video">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23667eea' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='white'%3EImage%3C/text%3E%3C/svg%3E"
                    alt="Example"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </AspectRatio>
              </div>

              {/* Video placeholder */}
              <div style={itemContainerStyle}>
                <p style={labelStyle}>Video (video ratio)</p>
                <AspectRatio ratio="video">
                  <div style={{ ...boxStyle, background: '#000' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 48 }}>▶</div>
                      <div>Video Player</div>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* Map placeholder */}
              <div style={itemContainerStyle}>
                <p style={labelStyle}>Map (square ratio)</p>
                <AspectRatio ratio="square">
                  <div style={{ ...boxStyle, background: 'linear-gradient(135deg, #48c774 0%, #38a169 100%)' }}>
                    Map
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>

          {/* Different Elements */}
          <div>
            <h2 style={sectionTitleStyle}>Different HTML Elements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 600 }}>
              <div style={itemContainerStyle}>
                <p style={labelStyle}>as="div" (default)</p>
                <AspectRatio as="div" ratio="video">
                  <div style={boxStyle}>div element</div>
                </AspectRatio>
              </div>

              <div style={itemContainerStyle}>
                <p style={labelStyle}>as="figure"</p>
                <AspectRatio as="figure" ratio="video">
                  <div style={boxStyle}>figure element</div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('aspectratio-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const ratioTokens = [
        'square',
        'traditional',
        'photo',
        'video',
        'ultrawide',
        'vertical',
        'portrait',
        'portraitDisplay',
      ] as const;
      const customRatios = [1, 2, 0.5, 21 / 9, 9 / 16];

      const sectionTitleStyle = {
        fontWeight: 700,
        fontSize: 20,
        margin: '0 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
      };

      const labelStyle = {
        fontSize: 12,
        color: 'var(--lufa-token-color-text-secondary)',
        marginBottom: 4,
        textAlign: 'center' as const,
      };
      const boxStyle = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 600,
        height: '100%',
        width: '100%',
      };
      const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 };
      const itemContainerStyle = { display: 'flex', flexDirection: 'column' as const };

      const component = await mount(
        <div
          style={{
            padding: 32,
            background: 'var(--lufa-token-color-background-primary)',
            fontFamily: 'sans-serif',
            maxWidth: 1200,
            width: '900px',
          }}
        >
          {/* Token-based Ratios */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Token-based Aspect Ratios</h2>
            <div style={gridStyle}>
              {ratioTokens.map((ratio) => (
                <div key={ratio} style={itemContainerStyle}>
                  <p style={labelStyle}>{ratio}</p>
                  <AspectRatio ratio={ratio}>
                    <div style={boxStyle}>{ratio}</div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Numeric Ratios */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Custom Numeric Ratios</h2>
            <div style={gridStyle}>
              {customRatios.map((ratio, index) => (
                <div key={index} style={itemContainerStyle}>
                  <p style={labelStyle}>{typeof ratio === 'number' ? ratio.toFixed(2) : ratio}</p>
                  <AspectRatio ratio={ratio}>
                    <div style={boxStyle}>{ratio}</div>
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>

          {/* Different Content Types */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Different Content Types</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              {/* Image placeholder */}
              <div style={itemContainerStyle}>
                <p style={labelStyle}>Image (video ratio)</p>
                <AspectRatio ratio="video">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23667eea' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='white'%3EImage%3C/text%3E%3C/svg%3E"
                    alt="Example"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </AspectRatio>
              </div>

              {/* Video placeholder */}
              <div style={itemContainerStyle}>
                <p style={labelStyle}>Video (video ratio)</p>
                <AspectRatio ratio="video">
                  <div style={{ ...boxStyle, background: '#000' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 48 }}>▶</div>
                      <div>Video Player</div>
                    </div>
                  </div>
                </AspectRatio>
              </div>

              {/* Map placeholder */}
              <div style={itemContainerStyle}>
                <p style={labelStyle}>Map (square ratio)</p>
                <AspectRatio ratio="square">
                  <div style={{ ...boxStyle, background: 'linear-gradient(135deg, #48c774 0%, #38a169 100%)' }}>
                    Map
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>

          {/* Different Elements */}
          <div>
            <h2 style={sectionTitleStyle}>Different HTML Elements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 600 }}>
              <div style={itemContainerStyle}>
                <p style={labelStyle}>as="div" (default)</p>
                <AspectRatio as="div" ratio="video">
                  <div style={boxStyle}>div element</div>
                </AspectRatio>
              </div>

              <div style={itemContainerStyle}>
                <p style={labelStyle}>as="figure"</p>
                <AspectRatio as="figure" ratio="video">
                  <div style={boxStyle}>figure element</div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('aspectratio-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});

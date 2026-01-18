import { expect, test } from '@playwright/experimental-ct-react';

import { Placeholder } from '../../../../main/src/components/layout/Placeholder/Placeholder';

test.describe('Placeholder Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options', async ({ mount }) => {
      const heights = ['small', 'medium', 'large', 'auto', 'full'] as const;
      const widths = ['auto', 'small', 'medium', 'large', 'full'] as const;
      const solidColors = ['#667eea', '#764ba2', '#48c774', '#ffdd57', '#ff3860', '#333333'];

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };
      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 8 };
      const containerStyle = { border: '2px dashed #ccc', background: '#fff', padding: 16, marginBottom: 16 };

      const component = await mount(
        <div style={{ padding: 32, background: '#ffffff', fontFamily: 'sans-serif', width: '900px' }}>
          {/* Height Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Height Options</h2>
            {heights.map((height) => (
              <div key={height} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>height="{height}"</p>
                <div style={containerStyle}>
                  <Placeholder height={height}>{height}</Placeholder>
                </div>
              </div>
            ))}
          </div>

          {/* Width Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Width Options</h2>
            {widths.map((width) => (
              <div key={width} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>width="{width}"</p>
                <div style={containerStyle}>
                  <Placeholder width={width} height="medium">
                    {width}
                  </Placeholder>
                </div>
              </div>
            ))}
          </div>

          {/* Solid Colors */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Solid Colors</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {solidColors.map((color) => (
                <div key={color}>
                  <p style={labelStyle}>color="{color}"</p>
                  <Placeholder color={color} height="medium">
                    {color}
                  </Placeholder>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Colors */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gradient Colors</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>colorFrom="#667eea" + colorTo="#764ba2"</p>
                <Placeholder colorFrom="#667eea" colorTo="#764ba2" height="medium">
                  Purple Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#48c774" + colorTo="#38a169"</p>
                <Placeholder colorFrom="#48c774" colorTo="#38a169" height="medium">
                  Green Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#ffdd57" + colorTo="#ffa94d"</p>
                <Placeholder colorFrom="#ffdd57" colorTo="#ffa94d" height="medium">
                  Yellow Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#ff3860" + colorTo="#ff6b9d"</p>
                <Placeholder colorFrom="#ff3860" colorTo="#ff6b9d" height="medium">
                  Pink Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#209cee" + colorTo="#0077b6"</p>
                <Placeholder colorFrom="#209cee" colorTo="#0077b6" height="medium">
                  Blue Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#333333" + colorTo="#666666"</p>
                <Placeholder colorFrom="#333333" colorTo="#666666" height="medium">
                  Gray Gradient
                </Placeholder>
              </div>
            </div>
          </div>

          {/* Text Color Contrast */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Automatic Text Color Contrast</h2>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>
              Component automatically chooses light/dark text based on background luminance
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>Light background (dark text)</p>
                <Placeholder color="#ffffff" height="medium">
                  Light Background
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>Dark background (light text)</p>
                <Placeholder color="#000000" height="medium">
                  Dark Background
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>Medium background (light text)</p>
                <Placeholder color="#667eea" height="medium">
                  Medium Background
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>Bright background (dark text)</p>
                <Placeholder color="#ffdd57" height="medium">
                  Bright Background
                </Placeholder>
              </div>
            </div>
          </div>

          {/* Combined Props - Height and Width */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Height + Width</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>small × small</p>
                <Placeholder height="small" width="small">
                  S × S
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>medium × medium</p>
                <Placeholder height="medium" width="medium">
                  M × M
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>large × large</p>
                <Placeholder height="large" width="large">
                  L × L
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>small × full</p>
                <Placeholder height="small" width="full">
                  Small Height, Full Width
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>large × small</p>
                <Placeholder height="large" width="small">
                  Tall & Narrow
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>medium × auto</p>
                <Placeholder height="medium" width="auto">
                  Medium × Auto
                </Placeholder>
              </div>
            </div>
          </div>

          {/* All Props Combined */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>All Props Combined</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>height="large" + width="full" + gradient</p>
                <Placeholder height="large" width="full" colorFrom="#667eea" colorTo="#764ba2">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>Large Card</div>
                    <div style={{ fontSize: 14, marginTop: 8, opacity: 0.9 }}>With gradient background</div>
                  </div>
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>height="medium" + width="medium" + solid color</p>
                <Placeholder height="medium" width="medium" color="#48c774">
                  Medium Box
                </Placeholder>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Loading Skeleton (gray, various sizes)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Placeholder color="#e0e0e0" height="small" width="large">
                  <span style={{ visibility: 'hidden' }}>Loading...</span>
                </Placeholder>
                <Placeholder color="#e0e0e0" height="small" width="full">
                  <span style={{ visibility: 'hidden' }}>Loading...</span>
                </Placeholder>
                <Placeholder color="#e0e0e0" height="small" width="medium">
                  <span style={{ visibility: 'hidden' }}>Loading...</span>
                </Placeholder>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Image Placeholder (aspect ratio)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <Placeholder colorFrom="#667eea" colorTo="#764ba2" height="large" width="full">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48 }}>🖼️</div>
                    <div style={{ fontSize: 12, marginTop: 8 }}>Image</div>
                  </div>
                </Placeholder>
                <Placeholder colorFrom="#48c774" colorTo="#38a169" height="large" width="full">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48 }}>🎨</div>
                    <div style={{ fontSize: 12, marginTop: 8 }}>Artwork</div>
                  </div>
                </Placeholder>
                <Placeholder colorFrom="#209cee" colorTo="#0077b6" height="large" width="full">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48 }}>📷</div>
                    <div style={{ fontSize: 12, marginTop: 8 }}>Photo</div>
                  </div>
                </Placeholder>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Empty State</p>
              <Placeholder height="large" width="full" color="#f5f5f5">
                <div style={{ textAlign: 'center', color: '#666' }}>
                  <div style={{ fontSize: 48 }}>📭</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>No Content</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>There's nothing here yet</div>
                </div>
              </Placeholder>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Feature Card</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                <Placeholder colorFrom="#667eea" colorTo="#764ba2" height="large" width="full">
                  <div
                    style={{
                      padding: 24,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Fast</div>
                    <div style={{ fontSize: 14, opacity: 0.9 }}>Lightning-fast performance for your applications</div>
                  </div>
                </Placeholder>
                <Placeholder colorFrom="#48c774" colorTo="#38a169" height="large" width="full">
                  <div
                    style={{
                      padding: 24,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Secure</div>
                    <div style={{ fontSize: 14, opacity: 0.9 }}>Enterprise-grade security you can trust</div>
                  </div>
                </Placeholder>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Hero Section</p>
              <Placeholder height="full" width="full" colorFrom="#667eea" colorTo="#764ba2">
                <div
                  style={{
                    padding: 64,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>Welcome</div>
                  <div style={{ fontSize: 20, marginBottom: 24, opacity: 0.9 }}>
                    Build amazing things with our platform
                  </div>
                  <div>
                    <button
                      style={{
                        background: 'white',
                        color: '#667eea',
                        border: 'none',
                        padding: '12px 32px',
                        borderRadius: 4,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </Placeholder>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('placeholder-all-variants-chromium-darwin.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: all variants and options in dark mode', async ({ mount, page }) => {
      // Set dark mode before mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const heights = ['small', 'medium', 'large', 'auto', 'full'] as const;
      const widths = ['auto', 'small', 'medium', 'large', 'full'] as const;
      const solidColors = ['#667eea', '#764ba2', '#48c774', '#ffdd57', '#ff3860', '#333333'];

      const sectionTitleStyle = {
        fontWeight: 700,
        fontSize: 20,
        margin: '0 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
      };
      const labelStyle = {
        fontSize: 12,
        color: 'var(--lufa-token-color-text-secondary)',
        marginBottom: 8,
      };
      const containerStyle = {
        border: '2px dashed #555',
        background: 'var(--lufa-token-color-background-primary)',
        padding: 16,
        marginBottom: 16,
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
          {/* Height Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Height Options</h2>
            {heights.map((height) => (
              <div key={height} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>height="{height}"</p>
                <div style={containerStyle}>
                  <Placeholder height={height}>{height}</Placeholder>
                </div>
              </div>
            ))}
          </div>

          {/* Width Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Width Options</h2>
            {widths.map((width) => (
              <div key={width} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>width="{width}"</p>
                <div style={containerStyle}>
                  <Placeholder width={width} height="medium">
                    {width}
                  </Placeholder>
                </div>
              </div>
            ))}
          </div>

          {/* Solid Colors */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Solid Colors</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {solidColors.map((color) => (
                <div key={color}>
                  <p style={labelStyle}>color="{color}"</p>
                  <Placeholder color={color} height="medium">
                    {color}
                  </Placeholder>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Colors */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gradient Colors</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>colorFrom="#667eea" + colorTo="#764ba2"</p>
                <Placeholder colorFrom="#667eea" colorTo="#764ba2" height="medium">
                  Purple Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#48c774" + colorTo="#38a169"</p>
                <Placeholder colorFrom="#48c774" colorTo="#38a169" height="medium">
                  Green Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#ffdd57" + colorTo="#ffa94d"</p>
                <Placeholder colorFrom="#ffdd57" colorTo="#ffa94d" height="medium">
                  Yellow Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#ff3860" + colorTo="#ff6b9d"</p>
                <Placeholder colorFrom="#ff3860" colorTo="#ff6b9d" height="medium">
                  Pink Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#209cee" + colorTo="#0077b6"</p>
                <Placeholder colorFrom="#209cee" colorTo="#0077b6" height="medium">
                  Blue Gradient
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>colorFrom="#333333" + colorTo="#666666"</p>
                <Placeholder colorFrom="#333333" colorTo="#666666" height="medium">
                  Gray Gradient
                </Placeholder>
              </div>
            </div>
          </div>

          {/* Text Color Contrast */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Automatic Text Color Contrast</h2>
            <p
              style={{
                fontSize: 14,
                color: 'var(--lufa-token-color-text-secondary)',
                marginBottom: 16,
              }}
            >
              Component automatically chooses light/dark text based on background luminance
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>Light background (dark text)</p>
                <Placeholder color="#ffffff" height="medium">
                  Light Background
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>Dark background (light text)</p>
                <Placeholder color="#000000" height="medium">
                  Dark Background
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>Medium background (light text)</p>
                <Placeholder color="#667eea" height="medium">
                  Medium Background
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>Bright background (dark text)</p>
                <Placeholder color="#ffdd57" height="medium">
                  Bright Background
                </Placeholder>
              </div>
            </div>
          </div>

          {/* Combined Props - Height and Width */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Height + Width</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>small × small</p>
                <Placeholder height="small" width="small">
                  S × S
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>medium × medium</p>
                <Placeholder height="medium" width="medium">
                  M × M
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>large × large</p>
                <Placeholder height="large" width="large">
                  L × L
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>small × full</p>
                <Placeholder height="small" width="full">
                  Small Height, Full Width
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>large × small</p>
                <Placeholder height="large" width="small">
                  Tall & Narrow
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>medium × auto</p>
                <Placeholder height="medium" width="auto">
                  Medium × Auto
                </Placeholder>
              </div>
            </div>
          </div>

          {/* All Props Combined */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>All Props Combined</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>height="large" + width="full" + gradient</p>
                <Placeholder height="large" width="full" colorFrom="#667eea" colorTo="#764ba2">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>Large Card</div>
                    <div style={{ fontSize: 14, marginTop: 8, opacity: 0.9 }}>With gradient background</div>
                  </div>
                </Placeholder>
              </div>
              <div>
                <p style={labelStyle}>height="medium" + width="medium" + solid color</p>
                <Placeholder height="medium" width="medium" color="#48c774">
                  Medium Box
                </Placeholder>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Loading Skeleton (gray, various sizes)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Placeholder color="#e0e0e0" height="small" width="large">
                  <span style={{ visibility: 'hidden' }}>Loading...</span>
                </Placeholder>
                <Placeholder color="#e0e0e0" height="small" width="full">
                  <span style={{ visibility: 'hidden' }}>Loading...</span>
                </Placeholder>
                <Placeholder color="#e0e0e0" height="small" width="medium">
                  <span style={{ visibility: 'hidden' }}>Loading...</span>
                </Placeholder>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Image Placeholder (aspect ratio)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <Placeholder colorFrom="#667eea" colorTo="#764ba2" height="large" width="full">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48 }}>🖼️</div>
                    <div style={{ fontSize: 12, marginTop: 8 }}>Image</div>
                  </div>
                </Placeholder>
                <Placeholder colorFrom="#48c774" colorTo="#38a169" height="large" width="full">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48 }}>🎨</div>
                    <div style={{ fontSize: 12, marginTop: 8 }}>Artwork</div>
                  </div>
                </Placeholder>
                <Placeholder colorFrom="#209cee" colorTo="#0077b6" height="large" width="full">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48 }}>📷</div>
                    <div style={{ fontSize: 12, marginTop: 8 }}>Photo</div>
                  </div>
                </Placeholder>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Empty State</p>
              <Placeholder height="large" width="full" color="#f5f5f5">
                <div
                  style={{
                    textAlign: 'center',
                    color: 'var(--lufa-token-color-text-secondary)',
                  }}
                >
                  <div style={{ fontSize: 48 }}>📭</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>No Content</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>There's nothing here yet</div>
                </div>
              </Placeholder>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Feature Card</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                <Placeholder colorFrom="#667eea" colorTo="#764ba2" height="large" width="full">
                  <div
                    style={{
                      padding: 24,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Fast</div>
                    <div style={{ fontSize: 14, opacity: 0.9 }}>Lightning-fast performance for your applications</div>
                  </div>
                </Placeholder>
                <Placeholder colorFrom="#48c774" colorTo="#38a169" height="large" width="full">
                  <div
                    style={{
                      padding: 24,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
                    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Secure</div>
                    <div style={{ fontSize: 14, opacity: 0.9 }}>Enterprise-grade security you can trust</div>
                  </div>
                </Placeholder>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Hero Section</p>
              <Placeholder height="full" width="full" colorFrom="#667eea" colorTo="#764ba2">
                <div
                  style={{
                    padding: 64,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>Welcome</div>
                  <div style={{ fontSize: 20, marginBottom: 24, opacity: 0.9 }}>
                    Build amazing things with our platform
                  </div>
                  <div>
                    <button
                      style={{
                        background: 'white',
                        color: '#667eea',
                        border: 'none',
                        padding: '12px 32px',
                        borderRadius: 4,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </Placeholder>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('placeholder-all-variants-chromium-darwin-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});

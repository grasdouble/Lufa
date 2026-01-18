import { expect, test } from '@playwright/experimental-ct-react';

import { Container } from '@grasdouble/lufa_design-system';

test.describe('Container Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options', async ({ mount }, testInfo) => {
      testInfo.setTimeout(20000); // Increase timeout for large test
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full', 'fluid'] as const;
      const aligns = ['start', 'center', 'end'] as const;
      const paddingOptions = ['none', 'xs', 'sm', 'md', 'base', 'lg', 'xl'] as const;

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };
      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 8 };
      const contentStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
      };
      const viewportStyle = { border: '2px solid #ccc', background: '#f5f5f5', padding: 8, marginBottom: 16 };
      const paddingBoxStyle = { background: 'rgba(102, 126, 234, 0.1)', border: '2px dashed #667eea' };

      const component = await mount(
        <div style={{ padding: 32, background: '#ffffff', fontFamily: 'sans-serif', width: '900px' }}>
          {/* Size Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Size Options (Max-width constraints)</h2>
            {sizes.map((size) => (
              <div key={size} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>size="{size}"</p>
                <div style={viewportStyle}>
                  <Container size={size}>
                    <div style={contentStyle}>
                      {size} -{' '}
                      {size === 'fluid' ? 'No max-width' : size === 'full' ? '100% width' : 'Token-based max-width'}
                    </div>
                  </Container>
                </div>
              </div>
            ))}
          </div>

          {/* Alignment Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Alignment Options (constrained containers)</h2>
            {aligns.map((align) => (
              <div key={align} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>align="{align}" with size="md"</p>
                <div style={viewportStyle}>
                  <Container size="md" align={align}>
                    <div style={contentStyle}>Aligned: {align}</div>
                  </Container>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Padding */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Horizontal Padding (paddingX)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {paddingOptions.map((padding) => (
                <div key={padding}>
                  <p style={labelStyle}>paddingX="{padding}"</p>
                  <Container size="md" paddingX={padding}>
                    <div style={paddingBoxStyle}>
                      <div style={contentStyle}>paddingX: {padding}</div>
                    </div>
                  </Container>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Padding */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Vertical Padding (paddingY)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {paddingOptions.map((padding) => (
                <div key={padding}>
                  <p style={labelStyle}>paddingY="{padding}"</p>
                  <Container size="sm" paddingY={padding as any}>
                    <div style={paddingBoxStyle}>
                      <div style={contentStyle}>paddingY: {padding}</div>
                    </div>
                  </Container>
                </div>
              ))}
            </div>
          </div>

          {/* Different Elements */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Different HTML Elements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {(['div', 'main', 'section', 'article'] as const).map((element) => (
                <div key={element}>
                  <p style={labelStyle}>as="{element}"</p>
                  <Container as={element} size="sm">
                    <div style={contentStyle}>{element}</div>
                  </Container>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>size="lg" + align="center" + paddingX="lg" + paddingY="base"</p>
              <div style={viewportStyle}>
                <Container size="lg" align="center" paddingX="lg" paddingY="base">
                  <div style={contentStyle}>Large container, centered, with padding</div>
                </Container>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>size="md" + align="start" + paddingX="xl" + paddingY="lg"</p>
              <div style={viewportStyle}>
                <Container size="md" align="start" paddingX="xl" paddingY="lg">
                  <div style={contentStyle}>Medium container, left-aligned, extra padding</div>
                </Container>
              </div>
            </div>
          </div>

          {/* Real-world Layout Examples */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Layout Examples</h2>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Hero Section (full width, large padding)</p>
              <Container size="full" paddingX="base" paddingY="3xl">
                <div
                  style={{
                    ...contentStyle,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: 48,
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>Welcome</div>
                  <div style={{ fontSize: 16, opacity: 0.9 }}>This is a hero section with full-width container</div>
                </div>
              </Container>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Article Content (medium width, centered)</p>
              <div style={viewportStyle}>
                <Container size="md" align="center" paddingX="base" paddingY="lg">
                  <div
                    style={{
                      ...contentStyle,
                      background: 'white',
                      color: '#333',
                      textAlign: 'left' as const,
                      lineHeight: 1.6,
                    }}
                  >
                    <h3 style={{ marginTop: 0, color: '#111' }}>Article Title</h3>
                    <p style={{ margin: 0 }}>
                      This is article content in a centered, medium-width container with comfortable padding for
                      reading.
                    </p>
                  </div>
                </Container>
              </div>
            </div>
            <div>
              <p style={labelStyle}>Sidebar Content (extra small width, no padding)</p>
              <div style={viewportStyle}>
                <Container size="xs" align="start" paddingX="none" paddingY="none">
                  <div style={contentStyle}>Compact sidebar content</div>
                </Container>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('container-all-variants-chromium-darwin.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: dark mode', async ({ mount, page }, testInfo) => {
      testInfo.setTimeout(20000); // Increase timeout for large test

      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full', 'fluid'] as const;
      const aligns = ['start', 'center', 'end'] as const;
      const paddingOptions = ['none', 'xs', 'sm', 'md', 'base', 'lg', 'xl'] as const;

      const sectionTitleStyle = {
        fontWeight: 700,
        fontSize: 20,
        margin: '0 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
      };
      const labelStyle = { fontSize: 12, color: 'var(--lufa-token-color-text-secondary)', marginBottom: 8 };
      const contentStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
      };
      const viewportStyle = {
        border: '2px solid #444',
        background: 'var(--lufa-token-color-background-primary)',
        padding: 8,
        marginBottom: 16,
      };
      const paddingBoxStyle = { background: 'rgba(102, 126, 234, 0.1)', border: '2px dashed #667eea' };

      const component = await mount(
        <div
          style={{
            padding: 32,
            background: 'var(--lufa-token-color-background-primary)',
            fontFamily: 'sans-serif',
            width: '900px',
          }}
        >
          {/* Size Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Size Options (Max-width constraints)</h2>
            {sizes.map((size) => (
              <div key={size} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>size="{size}"</p>
                <div style={viewportStyle}>
                  <Container size={size}>
                    <div style={contentStyle}>
                      {size} -{' '}
                      {size === 'fluid' ? 'No max-width' : size === 'full' ? '100% width' : 'Token-based max-width'}
                    </div>
                  </Container>
                </div>
              </div>
            ))}
          </div>

          {/* Alignment Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Alignment Options (constrained containers)</h2>
            {aligns.map((align) => (
              <div key={align} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>align="{align}" with size="md"</p>
                <div style={viewportStyle}>
                  <Container size="md" align={align}>
                    <div style={contentStyle}>Aligned: {align}</div>
                  </Container>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Padding */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Horizontal Padding (paddingX)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {paddingOptions.map((padding) => (
                <div key={padding}>
                  <p style={labelStyle}>paddingX="{padding}"</p>
                  <Container size="md" paddingX={padding}>
                    <div style={paddingBoxStyle}>
                      <div style={contentStyle}>paddingX: {padding}</div>
                    </div>
                  </Container>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Padding */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Vertical Padding (paddingY)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {paddingOptions.map((padding) => (
                <div key={padding}>
                  <p style={labelStyle}>paddingY="{padding}"</p>
                  <Container size="sm" paddingY={padding as any}>
                    <div style={paddingBoxStyle}>
                      <div style={contentStyle}>paddingY: {padding}</div>
                    </div>
                  </Container>
                </div>
              ))}
            </div>
          </div>

          {/* Different Elements */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Different HTML Elements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {(['div', 'main', 'section', 'article'] as const).map((element) => (
                <div key={element}>
                  <p style={labelStyle}>as="{element}"</p>
                  <Container as={element} size="sm">
                    <div style={contentStyle}>{element}</div>
                  </Container>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>size="lg" + align="center" + paddingX="lg" + paddingY="base"</p>
              <div style={viewportStyle}>
                <Container size="lg" align="center" paddingX="lg" paddingY="base">
                  <div style={contentStyle}>Large container, centered, with padding</div>
                </Container>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>size="md" + align="start" + paddingX="xl" + paddingY="lg"</p>
              <div style={viewportStyle}>
                <Container size="md" align="start" paddingX="xl" paddingY="lg">
                  <div style={contentStyle}>Medium container, left-aligned, extra padding</div>
                </Container>
              </div>
            </div>
          </div>

          {/* Real-world Layout Examples */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Layout Examples</h2>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Hero Section (full width, large padding)</p>
              <Container size="full" paddingX="base" paddingY="3xl">
                <div
                  style={{
                    ...contentStyle,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: 48,
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>Welcome</div>
                  <div style={{ fontSize: 16, opacity: 0.9 }}>This is a hero section with full-width container</div>
                </div>
              </Container>
            </div>
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Article Content (medium width, centered)</p>
              <div style={viewportStyle}>
                <Container size="md" align="center" paddingX="base" paddingY="lg">
                  <div
                    style={{
                      ...contentStyle,
                      background: 'var(--lufa-token-color-background-primary)',
                      color: 'var(--lufa-token-color-text-primary)',
                      textAlign: 'left' as const,
                      lineHeight: 1.6,
                    }}
                  >
                    <h3 style={{ marginTop: 0, color: 'var(--lufa-token-color-text-primary)' }}>Article Title</h3>
                    <p style={{ margin: 0 }}>
                      This is article content in a centered, medium-width container with comfortable padding for
                      reading.
                    </p>
                  </div>
                </Container>
              </div>
            </div>
            <div>
              <p style={labelStyle}>Sidebar Content (extra small width, no padding)</p>
              <div style={viewportStyle}>
                <Container size="xs" align="start" paddingX="none" paddingY="none">
                  <div style={contentStyle}>Compact sidebar content</div>
                </Container>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('container-all-variants-dark-chromium-darwin.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});

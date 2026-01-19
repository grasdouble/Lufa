import { expect, test } from '@playwright/experimental-ct-react';

import { Flex } from '@grasdouble/lufa_design-system';

test.describe('Flex Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options in light mode', async ({ mount }) => {
      const directions = ['row', 'column'] as const;
      const aligns = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
      const justifies = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;
      const wraps = ['nowrap', 'wrap', 'wrap-reverse'] as const;
      const gaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };
      const subTitleStyle = { fontWeight: 600, fontSize: 16, margin: '24px 0 12px 0', color: '#333' };
      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 8 };
      const boxStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        minWidth: 80,
        textAlign: 'center' as const,
      };
      const containerStyle = { border: '2px dashed #ccc', background: '#fff', padding: 16, marginBottom: 16 };
      const tallBoxStyle = { ...boxStyle, height: 100 };
      const shortBoxStyle = { ...boxStyle, height: 40 };
      const baselineBoxStyle = { ...boxStyle, fontSize: 24, lineHeight: 1 };

      const component = await mount(
        <div style={{ padding: 32, background: '#ffffff', fontFamily: 'sans-serif', width: '900px' }}>
          {/* Direction Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Direction Options</h2>
            {directions.map((direction) => (
              <div key={direction} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>direction="{direction}"</p>
                <div style={containerStyle}>
                  <Flex direction={direction}>
                    <div style={boxStyle}>Item 1</div>
                    <div style={boxStyle}>Item 2</div>
                    <div style={boxStyle}>Item 3</div>
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Justify Options (Row) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Justify Options (direction="row")</h2>
            {justifies.map((justify) => (
              <div key={justify} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>justify="{justify}"</p>
                <div style={containerStyle}>
                  <Flex direction="row" justify={justify}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Align Options (Row) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Align Options (direction="row", different heights)</h2>
            {aligns.map((align) => (
              <div key={align} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>align="{align}"</p>
                <div style={containerStyle}>
                  <Flex direction="row" align={align}>
                    <div style={tallBoxStyle}>Tall</div>
                    <div style={shortBoxStyle}>Short</div>
                    <div style={{ ...boxStyle, height: 70 }}>Medium</div>
                    {align === 'baseline' && <div style={baselineBoxStyle}>Big</div>}
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Justify Options (Column) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Justify Options (direction="column")</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {justifies.map((justify) => (
                <div key={justify}>
                  <p style={labelStyle}>justify="{justify}"</p>
                  <div style={{ ...containerStyle, height: 300 }}>
                    <Flex direction="column" justify={justify}>
                      <div style={boxStyle}>1</div>
                      <div style={boxStyle}>2</div>
                      <div style={boxStyle}>3</div>
                    </Flex>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Align Options (Column) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Align Options (direction="column")</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {aligns
                .filter((a) => a !== 'baseline')
                .map((align) => (
                  <div key={align}>
                    <p style={labelStyle}>align="{align}"</p>
                    <div style={{ ...containerStyle, height: 250 }}>
                      <Flex direction="column" align={align}>
                        <div style={{ ...boxStyle, width: 100 }}>Wide</div>
                        <div style={{ ...boxStyle, width: 60 }}>Narrow</div>
                        <div style={{ ...boxStyle, width: 80 }}>Medium</div>
                      </Flex>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Wrap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Wrap Options</h2>
            {wraps.map((wrap) => (
              <div key={wrap} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>wrap="{wrap}"</p>
                <div style={{ ...containerStyle, width: 400 }}>
                  <Flex direction="row" wrap={wrap}>
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} style={boxStyle}>
                        Item {i + 1}
                      </div>
                    ))}
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Gap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gap Options</h2>
            <h3 style={subTitleStyle}>Row Direction</h3>
            {gaps.map((gap) => (
              <div key={gap} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>gap="{gap}"</p>
                <div style={containerStyle}>
                  <Flex direction="row" gap={gap}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                    <div style={boxStyle}>4</div>
                  </Flex>
                </div>
              </div>
            ))}
            <h3 style={subTitleStyle}>Column Direction</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {gaps.map((gap) => (
                <div key={gap}>
                  <p style={labelStyle}>gap="{gap}"</p>
                  <div style={containerStyle}>
                    <Flex direction="column" gap={gap}>
                      <div style={boxStyle}>1</div>
                      <div style={boxStyle}>2</div>
                      <div style={boxStyle}>3</div>
                    </Flex>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Gap (numeric) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Custom Numeric Gap</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>
                  gap={'{'}4{'}'} (4px)
                </p>
                <div style={containerStyle}>
                  <Flex gap={4}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                  </Flex>
                </div>
              </div>
              <div>
                <p style={labelStyle}>
                  gap={'{'}32{'}'} (32px)
                </p>
                <div style={containerStyle}>
                  <Flex gap={32}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                  </Flex>
                </div>
              </div>
            </div>
          </div>

          {/* Inline vs Block */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Inline vs Block</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>inline=false (default, display: flex)</p>
              <div style={containerStyle}>
                <Flex inline={false}>
                  <div style={boxStyle}>1</div>
                  <div style={boxStyle}>2</div>
                </Flex>
                <span style={{ marginLeft: 16, color: '#666' }}>← Takes full width</span>
              </div>
            </div>
            <div>
              <p style={labelStyle}>inline=true (display: inline-flex)</p>
              <div style={containerStyle}>
                <Flex inline>
                  <div style={boxStyle}>1</div>
                  <div style={boxStyle}>2</div>
                </Flex>
                <span style={{ marginLeft: 16, color: '#666' }}>← Only as wide as content</span>
              </div>
            </div>
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props Examples</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>direction="row" + justify="between" + align="center" + gap="lg"</p>
              <div style={containerStyle}>
                <Flex direction="row" justify="between" align="center" gap="lg">
                  <div style={{ ...boxStyle, height: 60 }}>Left</div>
                  <div style={{ ...boxStyle, height: 80 }}>Center</div>
                  <div style={{ ...boxStyle, height: 60 }}>Right</div>
                </Flex>
              </div>
            </div>
            <div>
              <p style={labelStyle}>direction="column" + justify="center" + align="end" + gap="md"</p>
              <div style={{ ...containerStyle, height: 250 }}>
                <Flex direction="column" justify="center" align="end" gap="md">
                  <div style={{ ...boxStyle, width: 100 }}>Top</div>
                  <div style={{ ...boxStyle, width: 120 }}>Middle</div>
                  <div style={{ ...boxStyle, width: 80 }}>Bottom</div>
                </Flex>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>Navigation Bar (justify="between", align="center")</p>
              <div style={containerStyle}>
                <Flex justify="between" align="center">
                  <div style={{ ...boxStyle, background: '#667eea' }}>Logo</div>
                  <Flex gap="sm">
                    <div style={{ ...boxStyle, background: '#764ba2' }}>Home</div>
                    <div style={{ ...boxStyle, background: '#764ba2' }}>About</div>
                    <div style={{ ...boxStyle, background: '#764ba2' }}>Contact</div>
                  </Flex>
                </Flex>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>Card Actions (justify="end", gap="sm")</p>
              <div style={containerStyle}>
                <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, marginBottom: 8 }}>Card Content</div>
                <Flex justify="end" gap="sm">
                  <div style={{ ...boxStyle, background: '#999' }}>Cancel</div>
                  <div style={{ ...boxStyle, background: '#667eea' }}>Submit</div>
                </Flex>
              </div>
            </div>
            <div>
              <p style={labelStyle}>Form Row (wrap="wrap", gap="md")</p>
              <div style={{ ...containerStyle, width: 500 }}>
                <Flex wrap="wrap" gap="md">
                  <div style={{ ...boxStyle, flex: '1 1 200px' }}>First Name</div>
                  <div style={{ ...boxStyle, flex: '1 1 200px' }}>Last Name</div>
                  <div style={{ ...boxStyle, flex: '1 1 400px' }}>Email Address</div>
                </Flex>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('flex-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: all variants and options in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const directions = ['row', 'column'] as const;
      const aligns = ['start', 'center', 'end', 'stretch', 'baseline'] as const;
      const justifies = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;
      const wraps = ['nowrap', 'wrap', 'wrap-reverse'] as const;
      const gaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      const sectionTitleStyle = {
        fontWeight: 700,
        fontSize: 20,
        margin: '0 0 16px 0',
        color: 'var(--lufa-token-color-text-primary)',
      };
      const subTitleStyle = {
        fontWeight: 600,
        fontSize: 16,
        margin: '24px 0 12px 0',
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
        minWidth: 80,
        textAlign: 'center' as const,
      };
      const containerStyle = {
        border: '2px dashed #555',
        background: 'var(--lufa-token-color-background-primary)',
        padding: 16,
        marginBottom: 16,
      };
      const tallBoxStyle = { ...boxStyle, height: 100 };
      const shortBoxStyle = { ...boxStyle, height: 40 };
      const baselineBoxStyle = { ...boxStyle, fontSize: 24, lineHeight: 1 };

      const component = await mount(
        <div
          style={{
            padding: 32,
            background: 'var(--lufa-token-color-background-primary)',
            fontFamily: 'sans-serif',
            width: '900px',
          }}
        >
          {/* Direction Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Direction Options</h2>
            {directions.map((direction) => (
              <div key={direction} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>direction="{direction}"</p>
                <div style={containerStyle}>
                  <Flex direction={direction}>
                    <div style={boxStyle}>Item 1</div>
                    <div style={boxStyle}>Item 2</div>
                    <div style={boxStyle}>Item 3</div>
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Justify Options (Row) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Justify Options (direction="row")</h2>
            {justifies.map((justify) => (
              <div key={justify} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>justify="{justify}"</p>
                <div style={containerStyle}>
                  <Flex direction="row" justify={justify}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Align Options (Row) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Align Options (direction="row", different heights)</h2>
            {aligns.map((align) => (
              <div key={align} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>align="{align}"</p>
                <div style={containerStyle}>
                  <Flex direction="row" align={align}>
                    <div style={tallBoxStyle}>Tall</div>
                    <div style={shortBoxStyle}>Short</div>
                    <div style={{ ...boxStyle, height: 70 }}>Medium</div>
                    {align === 'baseline' && <div style={baselineBoxStyle}>Big</div>}
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Justify Options (Column) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Justify Options (direction="column")</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {justifies.map((justify) => (
                <div key={justify}>
                  <p style={labelStyle}>justify="{justify}"</p>
                  <div style={{ ...containerStyle, height: 300 }}>
                    <Flex direction="column" justify={justify}>
                      <div style={boxStyle}>1</div>
                      <div style={boxStyle}>2</div>
                      <div style={boxStyle}>3</div>
                    </Flex>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Align Options (Column) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Align Options (direction="column")</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {aligns
                .filter((a) => a !== 'baseline')
                .map((align) => (
                  <div key={align}>
                    <p style={labelStyle}>align="{align}"</p>
                    <div style={{ ...containerStyle, height: 250 }}>
                      <Flex direction="column" align={align}>
                        <div style={{ ...boxStyle, width: 100 }}>Wide</div>
                        <div style={{ ...boxStyle, width: 60 }}>Narrow</div>
                        <div style={{ ...boxStyle, width: 80 }}>Medium</div>
                      </Flex>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Wrap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Wrap Options</h2>
            {wraps.map((wrap) => (
              <div key={wrap} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>wrap="{wrap}"</p>
                <div style={{ ...containerStyle, width: 400 }}>
                  <Flex direction="row" wrap={wrap}>
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} style={boxStyle}>
                        Item {i + 1}
                      </div>
                    ))}
                  </Flex>
                </div>
              </div>
            ))}
          </div>

          {/* Gap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gap Options</h2>
            <h3 style={subTitleStyle}>Row Direction</h3>
            {gaps.map((gap) => (
              <div key={gap} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>gap="{gap}"</p>
                <div style={containerStyle}>
                  <Flex direction="row" gap={gap}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                    <div style={boxStyle}>4</div>
                  </Flex>
                </div>
              </div>
            ))}
            <h3 style={subTitleStyle}>Column Direction</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {gaps.map((gap) => (
                <div key={gap}>
                  <p style={labelStyle}>gap="{gap}"</p>
                  <div style={containerStyle}>
                    <Flex direction="column" gap={gap}>
                      <div style={boxStyle}>1</div>
                      <div style={boxStyle}>2</div>
                      <div style={boxStyle}>3</div>
                    </Flex>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Gap (numeric) */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Custom Numeric Gap</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div>
                <p style={labelStyle}>
                  gap={'{'}4{'}'} (4px)
                </p>
                <div style={containerStyle}>
                  <Flex gap={4}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                  </Flex>
                </div>
              </div>
              <div>
                <p style={labelStyle}>
                  gap={'{'}32{'}'} (32px)
                </p>
                <div style={containerStyle}>
                  <Flex gap={32}>
                    <div style={boxStyle}>1</div>
                    <div style={boxStyle}>2</div>
                    <div style={boxStyle}>3</div>
                  </Flex>
                </div>
              </div>
            </div>
          </div>

          {/* Inline vs Block */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Inline vs Block</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>inline=false (default, display: flex)</p>
              <div style={containerStyle}>
                <Flex inline={false}>
                  <div style={boxStyle}>1</div>
                  <div style={boxStyle}>2</div>
                </Flex>
                <span style={{ marginLeft: 16, color: 'var(--lufa-token-color-text-secondary)' }}>
                  ← Takes full width
                </span>
              </div>
            </div>
            <div>
              <p style={labelStyle}>inline=true (display: inline-flex)</p>
              <div style={containerStyle}>
                <Flex inline>
                  <div style={boxStyle}>1</div>
                  <div style={boxStyle}>2</div>
                </Flex>
                <span style={{ marginLeft: 16, color: 'var(--lufa-token-color-text-secondary)' }}>
                  ← Only as wide as content
                </span>
              </div>
            </div>
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props Examples</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>direction="row" + justify="between" + align="center" + gap="lg"</p>
              <div style={containerStyle}>
                <Flex direction="row" justify="between" align="center" gap="lg">
                  <div style={{ ...boxStyle, height: 60 }}>Left</div>
                  <div style={{ ...boxStyle, height: 80 }}>Center</div>
                  <div style={{ ...boxStyle, height: 60 }}>Right</div>
                </Flex>
              </div>
            </div>
            <div>
              <p style={labelStyle}>direction="column" + justify="center" + align="end" + gap="md"</p>
              <div style={{ ...containerStyle, height: 250 }}>
                <Flex direction="column" justify="center" align="end" gap="md">
                  <div style={{ ...boxStyle, width: 100 }}>Top</div>
                  <div style={{ ...boxStyle, width: 120 }}>Middle</div>
                  <div style={{ ...boxStyle, width: 80 }}>Bottom</div>
                </Flex>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>Navigation Bar (justify="between", align="center")</p>
              <div style={containerStyle}>
                <Flex justify="between" align="center">
                  <div style={{ ...boxStyle, background: '#667eea' }}>Logo</div>
                  <Flex gap="sm">
                    <div style={{ ...boxStyle, background: '#764ba2' }}>Home</div>
                    <div style={{ ...boxStyle, background: '#764ba2' }}>About</div>
                    <div style={{ ...boxStyle, background: '#764ba2' }}>Contact</div>
                  </Flex>
                </Flex>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>Card Actions (justify="end", gap="sm")</p>
              <div style={containerStyle}>
                <div
                  style={{
                    background: 'var(--lufa-token-color-background-primary)',
                    padding: 16,
                    borderRadius: 4,
                    marginBottom: 8,
                    color: 'var(--lufa-token-color-text-primary)',
                  }}
                >
                  Card Content
                </div>
                <Flex justify="end" gap="sm">
                  <div style={{ ...boxStyle, background: '#999' }}>Cancel</div>
                  <div style={{ ...boxStyle, background: '#667eea' }}>Submit</div>
                </Flex>
              </div>
            </div>
            <div>
              <p style={labelStyle}>Form Row (wrap="wrap", gap="md")</p>
              <div style={{ ...containerStyle, width: 500 }}>
                <Flex wrap="wrap" gap="md">
                  <div style={{ ...boxStyle, flex: '1 1 200px' }}>First Name</div>
                  <div style={{ ...boxStyle, flex: '1 1 200px' }}>Last Name</div>
                  <div style={{ ...boxStyle, flex: '1 1 400px' }}>Email Address</div>
                </Flex>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('flex-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});

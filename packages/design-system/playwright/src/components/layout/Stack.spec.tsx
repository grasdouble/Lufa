import { expect, test } from '@playwright/experimental-ct-react';

import { Stack } from '@grasdouble/lufa_design-system';

test.describe('Stack Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options', async ({ mount }) => {
      const gaps = ['none', 'condensed', 'normal', 'spacious'] as const;
      const directions = ['horizontal', 'vertical'] as const;
      const aligns = ['stretch', 'start', 'center', 'end', 'baseline'] as const;
      const wraps = ['wrap', 'nowrap'] as const;
      const justifies = ['start', 'center', 'end', 'space-between', 'space-evenly'] as const;
      const paddings = ['none', 'condensed', 'normal', 'spacious'] as const;

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };
      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 8 };
      const boxStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
      };
      const containerStyle = { border: '2px dashed #ccc', background: '#fff', marginBottom: 16 };
      const tallBoxStyle = { ...boxStyle, height: 100 };
      const shortBoxStyle = { ...boxStyle, height: 40 };
      const baselineBoxStyle = { ...boxStyle, fontSize: 24, lineHeight: 1 };

      const component = await mount(
        <div style={{ padding: 32, background: '#f9f9f9', fontFamily: 'sans-serif' }}>
          {/* Gap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gap Options</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Vertical Direction</p>
              {gaps.map((gap) => (
                <div key={gap} style={{ marginBottom: 16 }}>
                  <p style={{ ...labelStyle, fontSize: 11 }}>gap="{gap}"</p>
                  <div style={containerStyle}>
                    <Stack gap={gap} direction="vertical">
                      <div style={boxStyle}>Item 1</div>
                      <div style={boxStyle}>Item 2</div>
                      <div style={boxStyle}>Item 3</div>
                    </Stack>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p style={labelStyle}>Horizontal Direction</p>
              {gaps.map((gap) => (
                <div key={gap} style={{ marginBottom: 16 }}>
                  <p style={{ ...labelStyle, fontSize: 11 }}>gap="{gap}"</p>
                  <div style={containerStyle}>
                    <Stack gap={gap} direction="horizontal">
                      <div style={boxStyle}>Item 1</div>
                      <div style={boxStyle}>Item 2</div>
                      <div style={boxStyle}>Item 3</div>
                    </Stack>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direction Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Direction Options</h2>
            {directions.map((direction) => (
              <div key={direction} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>direction="{direction}"</p>
                <div style={containerStyle}>
                  <Stack direction={direction} gap="normal">
                    <div style={boxStyle}>Item 1</div>
                    <div style={boxStyle}>Item 2</div>
                    <div style={boxStyle}>Item 3</div>
                    <div style={boxStyle}>Item 4</div>
                  </Stack>
                </div>
              </div>
            ))}
          </div>

          {/* Align Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Align Options (with different item heights)</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Horizontal Direction</p>
              {aligns.map((align) => (
                <div key={align} style={{ marginBottom: 16 }}>
                  <p style={{ ...labelStyle, fontSize: 11 }}>align="{align}"</p>
                  <div style={containerStyle}>
                    <Stack direction="horizontal" align={align} gap="normal">
                      <div style={tallBoxStyle}>Tall</div>
                      <div style={shortBoxStyle}>Short</div>
                      <div style={{ ...boxStyle, height: 70 }}>Medium</div>
                      {align === 'baseline' && <div style={baselineBoxStyle}>Big</div>}
                    </Stack>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p style={labelStyle}>Vertical Direction (with different widths)</p>
              {aligns
                .filter((a) => a !== 'baseline')
                .map((align) => (
                  <div key={align} style={{ marginBottom: 16 }}>
                    <p style={{ ...labelStyle, fontSize: 11 }}>align="{align}"</p>
                    <div style={containerStyle}>
                      <Stack direction="vertical" align={align} gap="normal">
                        <div style={{ ...boxStyle, width: 150 }}>Wide</div>
                        <div style={{ ...boxStyle, width: 80 }}>Narrow</div>
                        <div style={{ ...boxStyle, width: 120 }}>Medium</div>
                      </Stack>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Justify Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Justify Options</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Horizontal Direction</p>
              {justifies.map((justify) => (
                <div key={justify} style={{ marginBottom: 16 }}>
                  <p style={{ ...labelStyle, fontSize: 11 }}>justify="{justify}"</p>
                  <div style={containerStyle}>
                    <Stack direction="horizontal" justify={justify} gap="normal">
                      <div style={boxStyle}>1</div>
                      <div style={boxStyle}>2</div>
                      <div style={boxStyle}>3</div>
                    </Stack>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p style={labelStyle}>Vertical Direction (with min-height container)</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {justifies.map((justify) => (
                  <div key={justify}>
                    <p style={{ ...labelStyle, fontSize: 11 }}>justify="{justify}"</p>
                    <div style={{ ...containerStyle, height: 300 }}>
                      <Stack direction="vertical" justify={justify} gap="normal">
                        <div style={boxStyle}>1</div>
                        <div style={boxStyle}>2</div>
                        <div style={boxStyle}>3</div>
                      </Stack>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wrap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Wrap Options</h2>
            {wraps.map((wrap) => (
              <div key={wrap} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>wrap="{wrap}" (horizontal, constrained width)</p>
                <div style={{ ...containerStyle, width: 400 }}>
                  <Stack direction="horizontal" wrap={wrap} gap="normal">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} style={boxStyle}>
                        Item {i + 1}
                      </div>
                    ))}
                  </Stack>
                </div>
              </div>
            ))}
          </div>

          {/* Padding Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Padding Options</h2>
            {paddings.map((padding) => (
              <div key={padding} style={{ marginBottom: 16 }}>
                <p style={labelStyle}>padding="{padding}"</p>
                <div style={containerStyle}>
                  <Stack direction="vertical" padding={padding} gap="normal">
                    <div style={boxStyle}>Item 1</div>
                    <div style={boxStyle}>Item 2</div>
                    <div style={boxStyle}>Item 3</div>
                  </Stack>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props Examples</h2>

            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>
                direction="horizontal" + justify="space-between" + align="center" + gap="spacious" + padding="normal"
              </p>
              <div style={containerStyle}>
                <Stack direction="horizontal" justify="space-between" align="center" gap="spacious" padding="normal">
                  <div style={{ ...boxStyle, height: 60 }}>Left</div>
                  <div style={{ ...boxStyle, height: 80 }}>Center</div>
                  <div style={{ ...boxStyle, height: 60 }}>Right</div>
                </Stack>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>
                direction="vertical" + justify="center" + align="end" + gap="condensed" + padding="spacious"
              </p>
              <div style={{ ...containerStyle, height: 300 }}>
                <Stack direction="vertical" justify="center" align="end" gap="condensed" padding="spacious">
                  <div style={{ ...boxStyle, width: 120 }}>Top</div>
                  <div style={{ ...boxStyle, width: 150 }}>Middle</div>
                  <div style={{ ...boxStyle, width: 100 }}>Bottom</div>
                </Stack>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p style={labelStyle}>
                direction="horizontal" + wrap="wrap" + justify="center" + gap="normal" + padding="normal"
              </p>
              <div style={{ ...containerStyle, width: 500 }}>
                <Stack direction="horizontal" wrap="wrap" justify="center" gap="normal" padding="normal">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} style={boxStyle}>
                      Tag {i + 1}
                    </div>
                  ))}
                </Stack>
              </div>
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Navigation Bar</p>
              <div style={containerStyle}>
                <Stack direction="horizontal" justify="space-between" align="center" padding="normal" gap="spacious">
                  <div style={{ ...boxStyle, background: '#667eea' }}>Logo</div>
                  <Stack direction="horizontal" gap="normal">
                    <div style={{ ...boxStyle, background: '#764ba2' }}>Home</div>
                    <div style={{ ...boxStyle, background: '#764ba2' }}>About</div>
                    <div style={{ ...boxStyle, background: '#764ba2' }}>Contact</div>
                  </Stack>
                </Stack>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Form Layout (vertical stack)</p>
              <div style={containerStyle}>
                <Stack direction="vertical" gap="normal" padding="normal">
                  <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
                    <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        padding: 8,
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
                    <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: 8,
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <Stack direction="horizontal" justify="end" gap="condensed">
                    <button style={{ ...boxStyle, background: '#999', border: 'none', cursor: 'pointer' }}>
                      Cancel
                    </button>
                    <button style={{ ...boxStyle, border: 'none', cursor: 'pointer' }}>Submit</button>
                  </Stack>
                </Stack>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Card Footer Actions</p>
              <div style={containerStyle}>
                <div style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, marginBottom: 12 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Card Title</div>
                  <div style={{ fontSize: 14, color: '#666' }}>Card content goes here</div>
                </div>
                <Stack direction="horizontal" justify="end" gap="condensed" padding="none">
                  <button style={{ ...boxStyle, background: '#999', border: 'none', cursor: 'pointer', fontSize: 12 }}>
                    Dismiss
                  </button>
                  <button style={{ ...boxStyle, border: 'none', cursor: 'pointer', fontSize: 12 }}>Action</button>
                </Stack>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Tag List (horizontal wrap)</p>
              <div style={{ ...containerStyle, width: 600 }}>
                <Stack direction="horizontal" wrap="wrap" gap="condensed" padding="normal">
                  {[
                    'React',
                    'TypeScript',
                    'CSS',
                    'HTML',
                    'JavaScript',
                    'Node.js',
                    'Git',
                    'Webpack',
                    'Vite',
                    'ESLint',
                  ].map((tag) => (
                    <div key={tag} style={{ ...boxStyle, background: '#48c774', fontSize: 12, padding: '8px 12px' }}>
                      {tag}
                    </div>
                  ))}
                </Stack>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Feature List (vertical, spacious)</p>
              <div style={containerStyle}>
                <Stack direction="vertical" gap="spacious" padding="spacious">
                  {[
                    { icon: '🚀', title: 'Fast', desc: 'Lightning-fast performance' },
                    { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security' },
                    { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
                  ].map((feature) => (
                    <Stack key={feature.title} direction="horizontal" gap="normal" align="start">
                      <div style={{ fontSize: 32, flexShrink: 0 }}>{feature.icon}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{feature.title}</div>
                        <div style={{ fontSize: 14, color: '#666' }}>{feature.desc}</div>
                      </div>
                    </Stack>
                  ))}
                </Stack>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Sidebar Navigation (vertical, condensed)</p>
              <div style={{ ...containerStyle, width: 250 }}>
                <Stack direction="vertical" gap="condensed" padding="normal">
                  <div style={{ ...boxStyle, background: '#667eea', textAlign: 'left' as const }}>📊 Dashboard</div>
                  <div style={{ ...boxStyle, background: '#764ba2', textAlign: 'left' as const }}>📈 Analytics</div>
                  <div style={{ ...boxStyle, background: '#764ba2', textAlign: 'left' as const }}>👥 Users</div>
                  <div style={{ ...boxStyle, background: '#764ba2', textAlign: 'left' as const }}>⚙️ Settings</div>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('stack-all-variants-chromium-darwin.png');
    });
  });
});

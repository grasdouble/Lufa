import { expect, test } from '@playwright/experimental-ct-react';

import { Space } from '@grasdouble/lufa_design-system';

test.describe('Space Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options', async ({ mount }) => {
      const directions = ['horizontal', 'vertical'] as const;
      const sizes = [
        'none',
        'xxs',
        'xs',
        '2xs',
        'sm',
        'sm-md',
        'md',
        'base',
        'md-lg',
        'lg',
        'lg-xl',
        'xl',
        'xl-2xl',
        '2xl',
        '2xl-3xl',
        '3xl',
        '3xl-4xl',
        '4xl',
        '5xl',
      ] as const;
      const customSizes = [8, 16, 32, 64];

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };
      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 8 };
      const boxStyle = {
        background: '#667eea',
        color: 'white',
        padding: 12,
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        display: 'inline-block',
      };
      const containerStyle = { border: '2px dashed #ccc', background: '#fff', padding: 16, marginBottom: 16 };
      const measurementLabelStyle = { fontSize: 10, color: '#999', fontFamily: 'monospace' };

      const component = await mount(
        <div style={{ padding: 32, background: '#f9f9f9', fontFamily: 'sans-serif' }}>
          {/* Vertical Direction - All Token Sizes */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Vertical Direction - Token Sizes</h2>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>Creates vertical spacing between elements</p>
            {sizes.map((size) => (
              <div key={size} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>size="{size}" (vertical)</p>
                <div style={containerStyle}>
                  <div style={boxStyle}>Element Above</div>
                  <Space direction="vertical" size={size} />
                  <div style={boxStyle}>Element Below</div>
                  <span style={{ ...measurementLabelStyle, marginLeft: 16 }}>↕ {size}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal Direction - All Token Sizes */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Horizontal Direction - Token Sizes</h2>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 16 }}>Creates horizontal spacing between elements</p>

            {/* Show smaller sizes */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Small to Medium sizes</p>
              {sizes.slice(0, 10).map((size) => (
                <div key={size} style={{ ...containerStyle, display: 'flex', alignItems: 'center' }}>
                  <span style={{ ...labelStyle, margin: 0, minWidth: 80 }}>{size}:</span>
                  <div style={boxStyle}>Left</div>
                  <Space direction="horizontal" size={size} />
                  <div style={boxStyle}>Right</div>
                  <span style={{ ...measurementLabelStyle, marginLeft: 16 }}>↔ {size}</span>
                </div>
              ))}
            </div>

            {/* Show larger sizes */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Large to Extra Large sizes</p>
              {sizes.slice(10).map((size) => (
                <div key={size} style={{ ...containerStyle, display: 'flex', alignItems: 'center' }}>
                  <span style={{ ...labelStyle, margin: 0, minWidth: 80 }}>{size}:</span>
                  <div style={boxStyle}>Left</div>
                  <Space direction="horizontal" size={size} />
                  <div style={boxStyle}>Right</div>
                  <span style={{ ...measurementLabelStyle, marginLeft: 16 }}>↔ {size}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Numeric Sizes */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Custom Numeric Sizes (px values)</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Vertical - Custom px values</p>
              {customSizes.map((size) => (
                <div key={size} style={{ marginBottom: 16 }}>
                  <p style={{ ...labelStyle, marginBottom: 4 }}>
                    size={'{' + size + '}'} ({size}px)
                  </p>
                  <div style={containerStyle}>
                    <div style={boxStyle}>Top</div>
                    <Space direction="vertical" size={size} />
                    <div style={boxStyle}>Bottom</div>
                    <span style={{ ...measurementLabelStyle, marginLeft: 16 }}>↕ {size}px</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p style={labelStyle}>Horizontal - Custom px values</p>
              {customSizes.map((size) => (
                <div key={size} style={{ ...containerStyle, display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ ...labelStyle, margin: 0, minWidth: 100 }}>size={'{' + size + '}'}:</span>
                  <div style={boxStyle}>Left</div>
                  <Space direction="horizontal" size={size} />
                  <div style={boxStyle}>Right</div>
                  <span style={{ ...measurementLabelStyle, marginLeft: 16 }}>↔ {size}px</span>
                </div>
              ))}
            </div>
          </div>

          {/* Different Elements */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Different HTML Elements</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <p style={labelStyle}>as="div" (default, block element)</p>
                <div style={containerStyle}>
                  <div style={boxStyle}>Top</div>
                  <Space as="div" direction="vertical" size="lg" />
                  <div style={boxStyle}>Bottom</div>
                </div>
              </div>
              <div>
                <p style={labelStyle}>as="span" (inline element)</p>
                <div style={containerStyle}>
                  <span style={boxStyle}>Left</span>
                  <Space as="span" direction="horizontal" size="lg" />
                  <span style={boxStyle}>Right</span>
                </div>
              </div>
            </div>
          </div>

          {/* Size Comparison */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Size Comparison (Vertical)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].map((size) => (
                <div key={size}>
                  <p style={{ ...labelStyle, textAlign: 'center' as const }}>{size}</p>
                  <div
                    style={{
                      ...containerStyle,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minHeight: 200,
                    }}
                  >
                    <div style={{ ...boxStyle, fontSize: 12 }}>A</div>
                    <Space direction="vertical" size={size as any} />
                    <div style={{ ...boxStyle, fontSize: 12 }}>B</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-world Use Cases */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Use Cases</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Section Spacing (large vertical space between sections)</p>
              <div style={containerStyle}>
                <div style={{ ...boxStyle, width: '100%', boxSizing: 'border-box' }}>Section 1: Introduction</div>
                <Space direction="vertical" size="3xl" />
                <div style={{ ...boxStyle, width: '100%', boxSizing: 'border-box' }}>Section 2: Content</div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Form Field Spacing (medium vertical space)</p>
              <div style={containerStyle}>
                <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    style={{
                      width: '100%',
                      padding: 8,
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <Space direction="vertical" size="md" />
                <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 4 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    style={{
                      width: '100%',
                      padding: 8,
                      border: '1px solid #ccc',
                      borderRadius: 4,
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Inline Button Group (small horizontal space)</p>
              <div style={{ ...containerStyle, display: 'flex', alignItems: 'center' }}>
                <button style={{ ...boxStyle, border: 'none', cursor: 'pointer' }}>Save</button>
                <Space direction="horizontal" size="sm" />
                <button style={{ ...boxStyle, background: '#999', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <Space direction="horizontal" size="sm" />
                <button style={{ ...boxStyle, background: '#ff3860', border: 'none', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Navigation Items (base horizontal space)</p>
              <div style={{ ...containerStyle, display: 'flex', alignItems: 'center' }}>
                <span style={{ ...boxStyle, background: '#48c774' }}>Home</span>
                <Space direction="horizontal" size="base" />
                <span style={{ ...boxStyle, background: '#764ba2' }}>Products</span>
                <Space direction="horizontal" size="base" />
                <span style={{ ...boxStyle, background: '#764ba2' }}>About</span>
                <Space direction="horizontal" size="base" />
                <span style={{ ...boxStyle, background: '#764ba2' }}>Contact</span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Card Stack (lg vertical space)</p>
              <div style={containerStyle}>
                <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Card 1</div>
                  <div style={{ fontSize: 14, color: '#666' }}>This is the first card in the stack</div>
                </div>
                <Space direction="vertical" size="lg" />
                <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Card 2</div>
                  <div style={{ fontSize: 14, color: '#666' }}>This is the second card in the stack</div>
                </div>
                <Space direction="vertical" size="lg" />
                <div style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Card 3</div>
                  <div style={{ fontSize: 14, color: '#666' }}>This is the third card in the stack</div>
                </div>
              </div>
            </div>

            <div>
              <p style={labelStyle}>List Items (sm vertical space)</p>
              <div style={containerStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, marginRight: 8 }}>✓</span>
                  <span style={{ fontSize: 14 }}>Feature one is enabled</span>
                </div>
                <Space direction="vertical" size="sm" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, marginRight: 8 }}>✓</span>
                  <span style={{ fontSize: 14 }}>Feature two is enabled</span>
                </div>
                <Space direction="vertical" size="sm" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, marginRight: 8 }}>✓</span>
                  <span style={{ fontSize: 14 }}>Feature three is enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      await expect(component).toHaveScreenshot('space-all-variants-chromium-darwin.png');
    });
  });
});

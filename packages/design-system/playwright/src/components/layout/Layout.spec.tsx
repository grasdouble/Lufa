import { expect, test } from '@playwright/experimental-ct-react';

import { Layout } from '@grasdouble/lufa_design-system';

const LayoutHeader = Layout.Header;
const LayoutSidebar = Layout.Sidebar;
const LayoutContent = Layout.Content;
const LayoutFooter = Layout.Footer;

test.describe('Layout Component', () => {
  test.describe('Visual Regression', () => {
    test('visual regression: all variants and options in light mode', async ({ mount }) => {
      const sidebarPositions = ['left', 'right'] as const;
      const sidebarWidths = ['collapsed', 'default', 'wide'] as const;
      const gaps = ['none', 'sm', 'md', 'lg', 'xl'] as const;

      const sectionTitleStyle = { fontWeight: 700, fontSize: 20, margin: '0 0 16px 0', color: '#111' };
      const labelStyle = { fontSize: 12, color: '#666', marginBottom: 8 };
      const headerStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
      };
      const sidebarStyle = {
        background: '#764ba2',
        color: 'white',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
        minHeight: 200,
      };
      const contentStyle = {
        background: '#48c774',
        color: 'white',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
        minHeight: 200,
      };
      const footerStyle = {
        background: '#ffdd57',
        color: '#333',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
      };
      const containerStyle = { border: '2px solid #ccc', background: '#f5f5f5', marginBottom: 24, overflow: 'hidden' };

      const component = await mount(
        <div style={{ padding: 32, background: '#ffffff', fontFamily: 'sans-serif', width: '900px' }}>
          {/* Basic Layout - No Sidebar */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Basic Layout (No Sidebar)</h2>
            <p style={labelStyle}>sidebar=false (default)</p>
            <div style={containerStyle}>
              <Layout sidebar={false}>
                <LayoutHeader>
                  <div style={headerStyle}>Header</div>
                </LayoutHeader>
                <LayoutContent>
                  <div style={contentStyle}>Main Content</div>
                </LayoutContent>
                <LayoutFooter>
                  <div style={footerStyle}>Footer</div>
                </LayoutFooter>
              </Layout>
            </div>
          </div>

          {/* With Sidebar - Position Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Sidebar Position Options</h2>

            {sidebarPositions.map((position) => (
              <div key={position} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>sidebar=true + sidebarPosition="{position}"</p>
                <div style={containerStyle}>
                  <Layout sidebar sidebarPosition={position}>
                    <LayoutHeader>
                      <div style={headerStyle}>Header</div>
                    </LayoutHeader>
                    <LayoutSidebar>
                      <div style={sidebarStyle}>Sidebar ({position})</div>
                    </LayoutSidebar>
                    <LayoutContent>
                      <div style={contentStyle}>Main Content</div>
                    </LayoutContent>
                    <LayoutFooter>
                      <div style={footerStyle}>Footer</div>
                    </LayoutFooter>
                  </Layout>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Width Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Sidebar Width Options (left position)</h2>

            {sidebarWidths.map((width) => (
              <div key={width} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>sidebarWidth="{width}"</p>
                <div style={containerStyle}>
                  <Layout sidebar sidebarPosition="left" sidebarWidth={width}>
                    <LayoutHeader>
                      <div style={headerStyle}>Header</div>
                    </LayoutHeader>
                    <LayoutSidebar>
                      <div style={sidebarStyle}>Sidebar: {width}</div>
                    </LayoutSidebar>
                    <LayoutContent>
                      <div style={contentStyle}>Main Content</div>
                    </LayoutContent>
                    <LayoutFooter>
                      <div style={footerStyle}>Footer</div>
                    </LayoutFooter>
                  </Layout>
                </div>
              </div>
            ))}
          </div>

          {/* Gap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gap Options</h2>

            {gaps.map((gap) => (
              <div key={gap} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>gap="{gap}" (with sidebar)</p>
                <div style={containerStyle}>
                  <Layout sidebar sidebarPosition="left" gap={gap}>
                    <LayoutHeader>
                      <div style={headerStyle}>Header</div>
                    </LayoutHeader>
                    <LayoutSidebar>
                      <div style={sidebarStyle}>Sidebar</div>
                    </LayoutSidebar>
                    <LayoutContent>
                      <div style={contentStyle}>Content (gap: {gap})</div>
                    </LayoutContent>
                    <LayoutFooter>
                      <div style={footerStyle}>Footer</div>
                    </LayoutFooter>
                  </Layout>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props Examples</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>sidebar=true + sidebarPosition="right" + sidebarWidth="wide" + gap="lg"</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="right" sidebarWidth="wide" gap="lg">
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={sidebarStyle}>Wide Sidebar (Right)</div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content with Large Gap</div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Footer</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>sidebar=true + sidebarPosition="left" + sidebarWidth="collapsed" + gap="sm"</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="left" sidebarWidth="collapsed" gap="sm">
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={sidebarStyle}>Nav</div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content with Collapsed Sidebar</div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Footer</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>
          </div>

          {/* Partial Layouts */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Partial Layouts (optional areas)</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Header + Content only (no footer)</p>
              <div style={containerStyle}>
                <Layout sidebar={false}>
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content (No Footer)</div>
                  </LayoutContent>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Content + Footer only (no header)</p>
              <div style={containerStyle}>
                <Layout sidebar={false}>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content (No Header)</div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Footer</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Content only (minimal layout)</p>
              <div style={containerStyle}>
                <Layout sidebar={false}>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content Only</div>
                  </LayoutContent>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>With Sidebar but no footer</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="left">
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={sidebarStyle}>Sidebar</div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content (No Footer)</div>
                  </LayoutContent>
                </Layout>
              </div>
            </div>
          </div>

          {/* Real-world Examples */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Layout Examples</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Dashboard Layout (left sidebar, default width)</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="left" sidebarWidth="default" gap="md">
                  <LayoutHeader>
                    <div style={headerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Dashboard</span>
                        <span style={{ fontSize: 12 }}>👤 User Profile</span>
                      </div>
                    </div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div
                      style={{
                        ...sidebarStyle,
                        textAlign: 'left' as const,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <div>📊 Dashboard</div>
                      <div>📈 Analytics</div>
                      <div>⚙️ Settings</div>
                      <div>👥 Users</div>
                    </div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={{ ...contentStyle, textAlign: 'left' as const }}>
                      <div style={{ marginBottom: 8, fontSize: 18 }}>Welcome back!</div>
                      <div style={{ fontSize: 12, opacity: 0.9 }}>
                        Here's what's happening with your projects today.
                      </div>
                    </div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>© 2024 Company Name</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Documentation Layout (right sidebar, wide)</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="right" sidebarWidth="wide" gap="lg">
                  <LayoutHeader>
                    <div style={headerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Docs</span>
                        <span style={{ fontSize: 12 }}>Search 🔍</span>
                      </div>
                    </div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={{ ...sidebarStyle, textAlign: 'left' as const, fontSize: 12 }}>
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>On This Page</div>
                      <div style={{ opacity: 0.9 }}>• Introduction</div>
                      <div style={{ opacity: 0.9 }}>• Getting Started</div>
                      <div style={{ opacity: 0.9 }}>• API Reference</div>
                      <div style={{ opacity: 0.9 }}>• Examples</div>
                    </div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={{ ...contentStyle, textAlign: 'left' as const }}>
                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Getting Started</div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>
                        Learn how to integrate our library into your project...
                      </div>
                    </div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Last updated: Jan 2024</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Simple Landing Page (no sidebar)</p>
              <div style={containerStyle}>
                <Layout sidebar={false} gap="none">
                  <LayoutHeader>
                    <div style={headerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700 }}>Logo</span>
                        <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                          <span>Features</span>
                          <span>Pricing</span>
                          <span>Contact</span>
                        </div>
                      </div>
                    </div>
                  </LayoutHeader>
                  <LayoutContent>
                    <div style={{ ...contentStyle, padding: 48, textAlign: 'center' as const }}>
                      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Welcome</div>
                      <div style={{ fontSize: 16, opacity: 0.9 }}>Build amazing things with our platform</div>
                    </div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span>© 2024 Company</span>
                        <div style={{ display: 'flex', gap: 16 }}>
                          <span>Privacy</span>
                          <span>Terms</span>
                          <span>Contact</span>
                        </div>
                      </div>
                    </div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('layout-all-variants-light.png', {
        animations: 'disabled',
      });
    });

    test('visual regression: all variants and options in dark mode', async ({ mount, page }) => {
      // Set dark mode BEFORE mounting
      await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'dark'));

      const sidebarPositions = ['left', 'right'] as const;
      const sidebarWidths = ['collapsed', 'default', 'wide'] as const;
      const gaps = ['none', 'sm', 'md', 'lg', 'xl'] as const;

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
      const headerStyle = {
        background: '#667eea',
        color: 'white',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
      };
      const sidebarStyle = {
        background: '#764ba2',
        color: 'white',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
        minHeight: 200,
      };
      const contentStyle = {
        background: '#48c774',
        color: 'white',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
        minHeight: 200,
      };
      const footerStyle = {
        background: '#ffdd57',
        color: '#333',
        padding: 16,
        fontWeight: 600,
        fontSize: 14,
        textAlign: 'center' as const,
      };
      const containerStyle = {
        border: '2px solid #444',
        background: 'var(--lufa-token-color-background-primary)',
        marginBottom: 24,
        overflow: 'hidden',
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
          {/* Basic Layout - No Sidebar */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Basic Layout (No Sidebar)</h2>
            <p style={labelStyle}>sidebar=false (default)</p>
            <div style={containerStyle}>
              <Layout sidebar={false}>
                <LayoutHeader>
                  <div style={headerStyle}>Header</div>
                </LayoutHeader>
                <LayoutContent>
                  <div style={contentStyle}>Main Content</div>
                </LayoutContent>
                <LayoutFooter>
                  <div style={footerStyle}>Footer</div>
                </LayoutFooter>
              </Layout>
            </div>
          </div>

          {/* With Sidebar - Position Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Sidebar Position Options</h2>

            {sidebarPositions.map((position) => (
              <div key={position} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>sidebar=true + sidebarPosition="{position}"</p>
                <div style={containerStyle}>
                  <Layout sidebar sidebarPosition={position}>
                    <LayoutHeader>
                      <div style={headerStyle}>Header</div>
                    </LayoutHeader>
                    <LayoutSidebar>
                      <div style={sidebarStyle}>Sidebar ({position})</div>
                    </LayoutSidebar>
                    <LayoutContent>
                      <div style={contentStyle}>Main Content</div>
                    </LayoutContent>
                    <LayoutFooter>
                      <div style={footerStyle}>Footer</div>
                    </LayoutFooter>
                  </Layout>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Width Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Sidebar Width Options (left position)</h2>

            {sidebarWidths.map((width) => (
              <div key={width} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>sidebarWidth="{width}"</p>
                <div style={containerStyle}>
                  <Layout sidebar sidebarPosition="left" sidebarWidth={width}>
                    <LayoutHeader>
                      <div style={headerStyle}>Header</div>
                    </LayoutHeader>
                    <LayoutSidebar>
                      <div style={sidebarStyle}>Sidebar: {width}</div>
                    </LayoutSidebar>
                    <LayoutContent>
                      <div style={contentStyle}>Main Content</div>
                    </LayoutContent>
                    <LayoutFooter>
                      <div style={footerStyle}>Footer</div>
                    </LayoutFooter>
                  </Layout>
                </div>
              </div>
            ))}
          </div>

          {/* Gap Options */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Gap Options</h2>

            {gaps.map((gap) => (
              <div key={gap} style={{ marginBottom: 24 }}>
                <p style={labelStyle}>gap="{gap}" (with sidebar)</p>
                <div style={containerStyle}>
                  <Layout sidebar sidebarPosition="left" gap={gap}>
                    <LayoutHeader>
                      <div style={headerStyle}>Header</div>
                    </LayoutHeader>
                    <LayoutSidebar>
                      <div style={sidebarStyle}>Sidebar</div>
                    </LayoutSidebar>
                    <LayoutContent>
                      <div style={contentStyle}>Content (gap: {gap})</div>
                    </LayoutContent>
                    <LayoutFooter>
                      <div style={footerStyle}>Footer</div>
                    </LayoutFooter>
                  </Layout>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Props */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Combined Props Examples</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>sidebar=true + sidebarPosition="right" + sidebarWidth="wide" + gap="lg"</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="right" sidebarWidth="wide" gap="lg">
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={sidebarStyle}>Wide Sidebar (Right)</div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content with Large Gap</div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Footer</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>sidebar=true + sidebarPosition="left" + sidebarWidth="collapsed" + gap="sm"</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="left" sidebarWidth="collapsed" gap="sm">
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={sidebarStyle}>Nav</div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content with Collapsed Sidebar</div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Footer</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>
          </div>

          {/* Partial Layouts */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={sectionTitleStyle}>Partial Layouts (optional areas)</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Header + Content only (no footer)</p>
              <div style={containerStyle}>
                <Layout sidebar={false}>
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content (No Footer)</div>
                  </LayoutContent>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Content + Footer only (no header)</p>
              <div style={containerStyle}>
                <Layout sidebar={false}>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content (No Header)</div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Footer</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Content only (minimal layout)</p>
              <div style={containerStyle}>
                <Layout sidebar={false}>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content Only</div>
                  </LayoutContent>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>With Sidebar but no footer</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="left">
                  <LayoutHeader>
                    <div style={headerStyle}>Header</div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={sidebarStyle}>Sidebar</div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={contentStyle}>Main Content (No Footer)</div>
                  </LayoutContent>
                </Layout>
              </div>
            </div>
          </div>

          {/* Real-world Examples */}
          <div>
            <h2 style={sectionTitleStyle}>Real-world Layout Examples</h2>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Dashboard Layout (left sidebar, default width)</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="left" sidebarWidth="default" gap="md">
                  <LayoutHeader>
                    <div style={headerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Dashboard</span>
                        <span style={{ fontSize: 12 }}>User Profile</span>
                      </div>
                    </div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div
                      style={{
                        ...sidebarStyle,
                        textAlign: 'left' as const,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <div>Dashboard</div>
                      <div>Analytics</div>
                      <div>Settings</div>
                      <div>Users</div>
                    </div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={{ ...contentStyle, textAlign: 'left' as const }}>
                      <div style={{ marginBottom: 8, fontSize: 18 }}>Welcome back!</div>
                      <div style={{ fontSize: 12, opacity: 0.9 }}>
                        Here's what's happening with your projects today.
                      </div>
                    </div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>© 2024 Company Name</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Documentation Layout (right sidebar, wide)</p>
              <div style={containerStyle}>
                <Layout sidebar sidebarPosition="right" sidebarWidth="wide" gap="lg">
                  <LayoutHeader>
                    <div style={headerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Docs</span>
                        <span style={{ fontSize: 12 }}>Search</span>
                      </div>
                    </div>
                  </LayoutHeader>
                  <LayoutSidebar>
                    <div style={{ ...sidebarStyle, textAlign: 'left' as const, fontSize: 12 }}>
                      <div style={{ fontWeight: 700, marginBottom: 8 }}>On This Page</div>
                      <div style={{ opacity: 0.9 }}>• Introduction</div>
                      <div style={{ opacity: 0.9 }}>• Getting Started</div>
                      <div style={{ opacity: 0.9 }}>• API Reference</div>
                      <div style={{ opacity: 0.9 }}>• Examples</div>
                    </div>
                  </LayoutSidebar>
                  <LayoutContent>
                    <div style={{ ...contentStyle, textAlign: 'left' as const }}>
                      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Getting Started</div>
                      <div style={{ fontSize: 14, opacity: 0.9 }}>
                        Learn how to integrate our library into your project...
                      </div>
                    </div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>Last updated: Jan 2024</div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Simple Landing Page (no sidebar)</p>
              <div style={containerStyle}>
                <Layout sidebar={false} gap="none">
                  <LayoutHeader>
                    <div style={headerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700 }}>Logo</span>
                        <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                          <span>Features</span>
                          <span>Pricing</span>
                          <span>Contact</span>
                        </div>
                      </div>
                    </div>
                  </LayoutHeader>
                  <LayoutContent>
                    <div style={{ ...contentStyle, padding: 48, textAlign: 'center' as const }}>
                      <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Welcome</div>
                      <div style={{ fontSize: 16, opacity: 0.9 }}>Build amazing things with our platform</div>
                    </div>
                  </LayoutContent>
                  <LayoutFooter>
                    <div style={footerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span>© 2024 Company</span>
                        <div style={{ display: 'flex', gap: 16 }}>
                          <span>Privacy</span>
                          <span>Terms</span>
                          <span>Contact</span>
                        </div>
                      </div>
                    </div>
                  </LayoutFooter>
                </Layout>
              </div>
            </div>
          </div>
        </div>,
        { animations: 'disabled' }
      );

      // Wait for rendering to stabilize
      await component.page().waitForTimeout(100);

      await expect(component).toHaveScreenshot('layout-all-variants-dark.png', {
        animations: 'disabled',
      });

      // Clean up dark mode
      await page.evaluate(() => document.documentElement.removeAttribute('data-mode'));
    });
  });
});

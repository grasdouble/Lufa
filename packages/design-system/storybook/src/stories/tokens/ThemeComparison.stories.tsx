import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@grasdouble/lufa_design-system';

import { StoryContainer } from '../../components/helpers';

/**
 * Theme Testing - Interactive Theme Demonstration
 *
 * The Lufa Design System supports three themes:
 * - **Default Theme**: Blue and purple (tech-focused)
 * - **Ocean Theme 🌊**: Cyan and teal (marine-inspired)
 * - **Forest Theme 🌲**: Emerald and green (nature-inspired)
 *
 * ## How to Use
 *
 * Use the **Theme toolbar** (🎨 paintbrush icon) at the top to switch between themes.
 * Watch the components below update instantly!
 *
 * ## What Changes?
 *
 * **Brand Colors** (change with theme):
 * - Primary/secondary buttons
 * - Links
 * - Ghost button text
 * - Outline button borders
 * - Focus states
 *
 * **Semantic Colors** (stay the same):
 * - Success (green), Error (red), Warning (yellow)
 * - Maintains consistent meaning across themes
 */
const meta = {
  title: '0. Architecture/Theme Testing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive theme demonstration. Use the toolbar to switch between Default, Ocean, and Forest themes.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Theme Showcase
 *
 * Use the **Theme toolbar** (🎨) to switch between Default, Ocean 🌊, and Forest 🌲 themes.
 * All components below will update instantly to show the active theme.
 *
 * **Try this:**
 * 1. Click the Theme toolbar button
 * 2. Select "Ocean 🌊" → observe cyan/teal colors
 * 3. Select "Forest 🌲" → observe emerald/green colors
 * 4. Try Dark mode (◐) → notice colors brighten for visibility
 */
export const ThemeShowcase: Story = {
  render: () => {
    // Simple color swatch component
    const ColorSwatch = ({ label, cssVariable }: { label: string; cssVariable: string }) => {
      const [computedColor, setComputedColor] = React.useState('');

      React.useEffect(() => {
        const color = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
        setComputedColor(color);
      }, [cssVariable]);

      return (
        <div style={{ flex: 1, minWidth: '140px' }}>
          <div
            style={{
              height: '80px',
              backgroundColor: `var(${cssVariable})`,
              borderRadius: '8px',
              border: '1px solid var(--lufa-semantic-ui-border-default)',
              marginBottom: '8px',
            }}
          />
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--lufa-semantic-ui-text-primary)',
              marginBottom: '4px',
            }}
          >
            {label}
          </div>
          <code
            style={{
              fontSize: '11px',
              color: 'var(--lufa-semantic-ui-text-secondary)',
              display: 'block',
            }}
          >
            {computedColor || cssVariable}
          </code>
        </div>
      );
    };

    return (
      <StoryContainer title="Theme Testing">
        {/* Instructions Banner */}
        <div
          style={{
            padding: '20px',
            marginBottom: '32px',
            backgroundColor: 'var(--lufa-semantic-ui-background-info)',
            border: '1px solid var(--lufa-semantic-ui-border-info)',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--lufa-semantic-ui-text-info)',
              marginBottom: '8px',
            }}
          >
            🎨 Use the Theme Toolbar to Switch Themes
          </div>
          <div
            style={{
              fontSize: '14px',
              color: 'var(--lufa-semantic-ui-text-info)',
              lineHeight: '1.5',
            }}
          >
            Click the <strong>Theme toolbar button</strong> (🎨 paintbrush icon) at the top of the page. Select Default,
            Ocean 🌊, or Forest 🌲 to see the components below update instantly.
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Brand Colors Section */}
          <section style={{ marginBottom: '48px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-primary)',
                marginBottom: '16px',
              }}
            >
              Brand Colors (Change with Theme)
            </h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <ColorSwatch label="Primary" cssVariable="--lufa-core-brand-primary" />
              <ColorSwatch label="Secondary" cssVariable="--lufa-core-brand-secondary" />
            </div>
          </section>

          {/* Buttons Section */}
          <section style={{ marginBottom: '48px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-primary)',
                marginBottom: '8px',
              }}
            >
              Buttons (Change with Theme)
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                marginBottom: '16px',
              }}
            >
              These buttons automatically use the active theme's brand colors
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button type="solid" variant="primary" size="md">
                Primary Button
              </Button>
              <Button type="solid" variant="secondary" size="md">
                Secondary Button
              </Button>
              <Button type="outline" variant="primary" size="md">
                Outline Button
              </Button>
              <Button type="ghost" variant="primary" size="md">
                Ghost Button
              </Button>
            </div>
          </section>

          {/* Links Section */}
          <section style={{ marginBottom: '48px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-primary)',
                marginBottom: '8px',
              }}
            >
              Links (Change with Theme)
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                marginBottom: '16px',
              }}
            >
              Links use the primary brand color
            </p>
            <a
              href="#"
              style={{
                color: 'var(--lufa-core-brand-primary)',
                textDecoration: 'underline',
                fontSize: '14px',
                fontWeight: 500,
              }}
              onClick={(e) => e.preventDefault()}
            >
              Example themed link - click to see hover state
            </a>
          </section>

          {/* Card Example */}
          <section style={{ marginBottom: '48px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-primary)',
                marginBottom: '8px',
              }}
            >
              Card with Brand Accent (Changes with Theme)
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                marginBottom: '16px',
              }}
            >
              Cards can use brand colors for accents and highlights
            </p>
            <div
              style={{
                padding: '20px',
                backgroundColor: 'var(--lufa-component-card-background)',
                border: '1px solid var(--lufa-component-card-border)',
                borderRadius: '8px',
                borderLeft: `4px solid var(--lufa-core-brand-primary)`,
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--lufa-semantic-ui-text-primary)',
                  marginBottom: '8px',
                }}
              >
                Themed Card Example
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: 'var(--lufa-semantic-ui-text-secondary)',
                  marginBottom: '16px',
                }}
              >
                This card has a brand-colored accent border on the left that updates with the active theme.
              </div>
              <Button type="solid" variant="primary" size="sm">
                Card Action
              </Button>
            </div>
          </section>

          {/* Semantic Colors Section */}
          <section style={{ marginBottom: '48px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-primary)',
                marginBottom: '8px',
              }}
            >
              Semantic Colors (Do NOT Change)
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                marginBottom: '16px',
              }}
            >
              These colors stay the same across all themes to maintain consistent meaning
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: 'var(--lufa-component-badge-success-background)',
                  color: 'var(--lufa-component-badge-success-text)',
                }}
              >
                Success (Always Green)
              </span>
              <span
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: 'var(--lufa-component-badge-error-background)',
                  color: 'var(--lufa-component-badge-error-text)',
                }}
              >
                Error (Always Red)
              </span>
              <span
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: 'var(--lufa-component-badge-warning-background)',
                  color: 'var(--lufa-component-badge-warning-text)',
                }}
              >
                Warning (Always Yellow)
              </span>
              <span
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  backgroundColor: 'var(--lufa-component-badge-info-background)',
                  color: 'var(--lufa-component-badge-info-text)',
                }}
              >
                Info (Always Blue)
              </span>
            </div>
          </section>

          {/* Summary Box */}
          <div
            style={{
              padding: '20px',
              backgroundColor: 'var(--lufa-semantic-ui-background-success)',
              border: '1px solid var(--lufa-semantic-ui-border-success)',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--lufa-semantic-ui-text-success)',
                marginBottom: '12px',
              }}
            >
              ✅ How Theming Works
            </div>
            <ul
              style={{
                fontSize: '13px',
                color: 'var(--lufa-semantic-ui-text-success)',
                lineHeight: '1.6',
                margin: 0,
                paddingLeft: '20px',
              }}
            >
              <li>
                <strong>Default Theme:</strong> Blue (#2563eb) primary, Purple (#a855f7) secondary
              </li>
              <li>
                <strong>Ocean Theme:</strong> Cyan (#0891b2) primary, Teal (#14b8a6) secondary
              </li>
              <li>
                <strong>Forest Theme:</strong> Emerald (#059669) primary, Green (#16a34a) secondary
              </li>
              <li>
                <strong>Dark Mode:</strong> All themes use brighter shades for better contrast on dark backgrounds
              </li>
              <li>
                <strong>Semantic colors</strong> (success/error/warning) stay consistent across all themes
              </li>
            </ul>
          </div>
        </div>
      </StoryContainer>
    );
  },
};

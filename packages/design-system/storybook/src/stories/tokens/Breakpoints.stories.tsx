import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Breakpoints',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBreakpoints: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '1400px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Breakpoint Tokens</h1>
      <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
        Standardized responsive breakpoints for mobile-first design. Use min-width media queries.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(tokens.breakpoint).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '150px 100px 1fr',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: tokens.color.background.secondary,
              borderRadius: '8px',
              border: `1px solid ${tokens.color.border.light}`,
            }}
          >
            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>breakpoint.{key}</div>
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.tertiary, fontSize: '12px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: tokens.color.text.tertiary }}>
              {key === 'xs' && 'Mobile landscape (480px+)'}
              {key === 'sm' && 'Small tablet (768px+)'}
              {key === 'md' && 'Tablet (1024px+)'}
              {key === 'lg' && 'Desktop (1280px+)'}
              {key === 'xl' && 'Large desktop (1440px+)'}
              {key === '2xl' && 'Extra large (1920px+)'}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: tokens.color.info.light,
          border: `1px solid ${tokens.color.info.border}`,
          borderRadius: '8px',
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '8px', color: tokens.color.info.text }}>
          Mobile-First Approach
        </div>
        <div style={{ fontSize: '14px', color: tokens.color.info.text, marginBottom: '12px' }}>
          Start with mobile styles and progressively enhance for larger screens using min-width media queries.
        </div>
        <pre
          style={{
            margin: 0,
            padding: '12px',
            backgroundColor: tokens.color.background.inverse,
            color: tokens.color.success.default,
            borderRadius: '6px',
            fontSize: '12px',
            overflow: 'auto',
          }}
        >
          {`/* Mobile styles (default) */
.element {
  width: 100%;
}

/* Tablet and up */
@media (min-width: ${tokens.breakpoint.md}) {
  .element {
    width: 50%;
  }
}

/* Desktop and up */
@media (min-width: ${tokens.breakpoint.lg}) {
  .element {
    width: 33.333%;
  }
}`}
        </pre>
      </div>
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  render: () => {
    const [currentWidth, setCurrentWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
      const handleResize = () => setCurrentWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getActiveBreakpoint = () => {
      const widthNum = currentWidth;
      if (widthNum >= parseInt(tokens.breakpoint['2xl'])) return '2xl';
      if (widthNum >= parseInt(tokens.breakpoint.xl)) return 'xl';
      if (widthNum >= parseInt(tokens.breakpoint.lg)) return 'lg';
      if (widthNum >= parseInt(tokens.breakpoint.md)) return 'md';
      if (widthNum >= parseInt(tokens.breakpoint.sm)) return 'sm';
      if (widthNum >= parseInt(tokens.breakpoint.xs)) return 'xs';
      return 'mobile';
    };

    const activeBreakpoint = getActiveBreakpoint();

    return (
      <div style={{ padding: '20px', maxWidth: '1400px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Responsive Breakpoint Demo</h1>
        <p style={{ marginBottom: '32px', color: tokens.color.text.tertiary, fontSize: '16px' }}>
          Resize your browser window to see the active breakpoint change.
        </p>

        <div
          style={{
            padding: '24px',
            backgroundColor: tokens.color.interactive.focus,
            borderRadius: '8px',
            color: tokens.color.text.inverse,
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Current viewport width</div>
          <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>{currentWidth}px</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>
            Active breakpoint: <span style={{ color: tokens.color.warning.default }}>{activeBreakpoint}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(tokens.breakpoint).map(([key, value]) => {
            const isActive =
              activeBreakpoint === key ||
              (activeBreakpoint === '2xl' && ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'].includes(key)) ||
              (activeBreakpoint === 'xl' && ['xl', 'lg', 'md', 'sm', 'xs'].includes(key)) ||
              (activeBreakpoint === 'lg' && ['lg', 'md', 'sm', 'xs'].includes(key)) ||
              (activeBreakpoint === 'md' && ['md', 'sm', 'xs'].includes(key)) ||
              (activeBreakpoint === 'sm' && ['sm', 'xs'].includes(key)) ||
              (activeBreakpoint === 'xs' && key === 'xs');

            return (
              <div
                key={key}
                style={{
                  padding: '16px',
                  backgroundColor: isActive ? tokens.color.success.default : tokens.color.background.tertiary,
                  color: isActive ? tokens.color.text.inverse : tokens.color.text.secondary,
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 200ms ease-out',
                }}
              >
                <div>
                  <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>breakpoint.{key}</span>
                  <span
                    style={{
                      marginLeft: '12px',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      opacity: 0.8,
                    }}
                  >
                    ({value})
                  </span>
                </div>
                {isActive && <span style={{ fontWeight: '600' }}>✓ Active</span>}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: tokens.color.warning.light,
            border: `1px solid ${tokens.color.warning.border}`,
            borderRadius: '8px',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '8px', color: tokens.color.warning.text }}>
            💡 Responsive Design Tips
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: tokens.color.warning.text, fontSize: '14px' }}>
            <li>Design mobile-first: start with smallest screen, enhance for larger</li>
            <li>Test at actual breakpoint values, not just approximate sizes</li>
            <li>Consider content reflow between breakpoints</li>
            <li>Ensure touch targets remain ≥44px at all breakpoints</li>
            <li>Test on real devices, not just browser DevTools</li>
          </ul>
        </div>
      </div>
    );
  },
};

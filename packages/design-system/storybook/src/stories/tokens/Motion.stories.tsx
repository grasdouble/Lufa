import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { easing, motion, timing } from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Motion',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TimingTokens: Story = {
  render: () => {
    const [activeBox, setActiveBox] = useState<string | null>(null);

    return (
      <div style={{ padding: '20px', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Timing Tokens</h1>
        <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
          Standardized animation durations for consistent motion design. Click boxes to see timing in action.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {Object.entries(timing).map(([key, value]) => (
            <div key={key}>
              <div
                onClick={() => {
                  setActiveBox(key);
                  setTimeout(() => setActiveBox(null), parseInt(value));
                }}
                style={{
                  width: '100%',
                  height: '100px',
                  backgroundColor: activeBox === key ? '#3B82F6' : '#E5E5E5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: `background-color ${value} ease-in-out`,
                }}
              >
                <span style={{ fontWeight: '600', color: activeBox === key ? 'white' : '#737373' }}>Click me</span>
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px' }}>
                <div style={{ fontWeight: '600' }}>{key}</div>
                <div style={{ color: '#737373', fontFamily: 'monospace' }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
            border: '1px solid #E5E5E5',
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>WCAG 2.1 Guidelines</h3>
          <ul
            style={{
              margin: '0',
              paddingLeft: '20px',
              color: '#737373',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            <li>Respect prefers-reduced-motion for accessibility (WCAG 2.3.3)</li>
            <li>Keep animations under 5 seconds unless user-controlled (WCAG 2.2.2)</li>
            <li>Avoid rapid flashing (WCAG 2.3.1)</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const EasingTokens: Story = {
  render: () => {
    const [activeEasing, setActiveEasing] = useState<string | null>(null);

    return (
      <div style={{ padding: '20px', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Easing Tokens</h1>
        <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
          Animation easing curves for natural motion. Click to see each easing in action.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {Object.entries(easing).map(([key, value]) => (
            <div key={key}>
              <div
                onClick={() => {
                  setActiveEasing(key);
                  setTimeout(() => setActiveEasing(null), 600);
                }}
                style={{
                  width: '100%',
                  height: '80px',
                  backgroundColor: '#FAFAFA',
                  borderRadius: '8px',
                  border: '1px solid #E5E5E5',
                  padding: '12px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>{key}</div>
                <div style={{ fontSize: '10px', color: '#737373', fontFamily: 'monospace' }}>{value}</div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: activeEasing === key ? '100%' : '0%',
                    height: '4px',
                    backgroundColor: '#3B82F6',
                    transition: `width 600ms ${value}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: '#FAFAFA',
            borderRadius: '8px',
            border: '1px solid #E5E5E5',
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Usage Guidelines</h3>
          <ul
            style={{
              margin: '0',
              paddingLeft: '20px',
              color: '#737373',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            <li>
              <strong>easeIn:</strong> Elements entering the viewport
            </li>
            <li>
              <strong>easeOut:</strong> Elements exiting the viewport
            </li>
            <li>
              <strong>easeInOut:</strong> Movement within the viewport
            </li>
            <li>
              <strong>gentle:</strong> Smooth, less jarring motion for larger elements
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

export const MotionPresets: Story = {
  render: () => {
    const [activeMotion, setActiveMotion] = useState<string | null>(null);

    return (
      <div style={{ padding: '20px', maxWidth: '1000px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Motion Presets</h1>
        <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
          Pre-configured motion tokens combining timing, easing, and properties for common UI patterns.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {Object.entries(motion).map(([key, config]) => (
            <div
              key={key}
              style={{
                padding: '20px',
                backgroundColor: '#FAFAFA',
                borderRadius: '8px',
                border: '1px solid #E5E5E5',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>{key}</h3>
                  <div style={{ fontSize: '12px', color: '#737373', fontFamily: 'monospace' }}>
                    duration: {config.duration} | easing: {config.easing}
                  </div>
                  <div style={{ fontSize: '12px', color: '#737373', marginTop: '4px' }}>
                    properties: {config.properties}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveMotion(key);
                    setTimeout(() => setActiveMotion(null), parseInt(config.duration) + 100);
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  Preview
                </button>
              </div>
              <div
                style={{
                  width: activeMotion === key ? '100%' : '20%',
                  height: '40px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '6px',
                  transition: `all ${config.duration} ${config.easing}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>
                  {activeMotion === key ? 'Animating!' : 'Demo'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

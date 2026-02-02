/**
 * Live examples for Divider component documentation
 * These components are imported and rendered in divider.mdx
 */

import React from 'react';

import type { DividerProps } from '@grasdouble/lufa_design-system';
import { Divider } from '@grasdouble/lufa_design-system';

/**
 * Basic demo showing default Divider usage
 */
export function LiveDemo() {
  return (
    <div>
      <div>Section Above</div>
      <Divider />
      <div>Section Below</div>
    </div>
  );
}

/**
 * All orientation demonstrations
 */
export function AllOrientations() {
  const orientations: { value: DividerProps['orientation']; label: string; description: string }[] = [
    { value: 'horizontal', label: 'Horizontal', description: 'Spans width (default)' },
    { value: 'vertical', label: 'Vertical', description: 'Spans height' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {orientations.map(({ value, description }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--lufa-token-spacing-compact)',
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-light)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
                color: 'var(--lufa-token-color-text-primary)',
              }}
            >
              orientation="{value}"
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              {description}
            </span>
          </div>

          {value === 'horizontal' ? (
            <div>
              <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>Content Above</div>
              <Divider orientation="horizontal" />
              <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>Content Below</div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', height: '60px', justifyContent: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>Left</span>
              <Divider orientation="vertical" />
              <span style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>Right</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * All emphasis level demonstrations
 */
export function AllEmphasisLevels() {
  const emphasisLevels: {
    value: DividerProps['emphasis'];
    label: string;
    color: string;
    thickness: string;
    description: string;
  }[] = [
    { value: 'subtle', label: 'Subtle', color: 'gray.300', thickness: '1px', description: 'Minimal separation' },
    { value: 'default', label: 'Default', color: 'gray.300', thickness: '1px', description: 'Standard separator' },
    { value: 'moderate', label: 'Moderate', color: 'gray.300', thickness: '2px', description: 'Visible separation' },
    { value: 'strong', label: 'Strong', color: 'gray.400', thickness: '2px', description: 'Emphasized separator' },
    { value: 'bold', label: 'Bold', color: 'gray.400', thickness: '4px', description: 'Major section breaks' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {emphasisLevels.map(({ value, color, thickness, description }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--lufa-token-spacing-compact)',
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-light)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
                color: 'var(--lufa-token-color-text-primary)',
              }}
            >
              emphasis="{value}"
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              {thickness} • {color} • {description}
            </span>
          </div>
          <Divider emphasis={value} />
        </div>
      ))}
    </div>
  );
}

/**
 * All spacing demonstrations
 */
export function AllSpacing() {
  const spacings: { value: DividerProps['spacing']; label: string; margin: string; description: string }[] = [
    { value: 'compact', label: 'Compact', margin: '8px', description: 'Tight spacing' },
    { value: 'default', label: 'Default', margin: '16px', description: 'Standard spacing' },
    { value: 'comfortable', label: 'Comfortable', margin: '24px', description: 'Relaxed spacing' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {spacings.map(({ value, margin, description }) => (
        <div
          key={value}
          style={{
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-light)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--lufa-token-font-size-sm)',
              fontWeight: 'var(--lufa-token-font-weight-semibold)',
              color: 'var(--lufa-token-color-text-primary)',
              marginBottom: '8px',
            }}
          >
            spacing="{value}"
          </div>
          <div
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            {margin} • {description}
          </div>

          <div
            style={{
              padding: '8px',
              backgroundColor: 'var(--lufa-token-color-background-secondary)',
              borderRadius: 'var(--lufa-token-radius-sm)',
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>Content Above</div>
            <Divider spacing={value} />
            <div style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)' }}>Content Below</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Line style demonstrations
 */
export function LineStyles() {
  const lineStyles: { value: DividerProps['lineStyle']; label: string; description: string }[] = [
    { value: 'solid', label: 'Solid', description: 'Continuous line (default)' },
    { value: 'dashed', label: 'Dashed', description: 'Dashed line pattern' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-default)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {lineStyles.map(({ value, description }) => (
        <div
          key={value}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--lufa-token-spacing-compact)',
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-light)',
            borderRadius: 'var(--lufa-token-radius-sm)',
            backgroundColor: 'var(--lufa-token-color-background-base)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-sm)',
                fontWeight: 'var(--lufa-token-font-weight-semibold)',
                color: 'var(--lufa-token-color-text-primary)',
              }}
            >
              lineStyle="{value}"
            </span>
            <span
              style={{
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
              }}
            >
              {description}
            </span>
          </div>
          <Divider lineStyle={value} />
        </div>
      ))}

      {/* Show line styles with different emphasis levels */}
      <div
        style={{
          padding: 'var(--lufa-token-spacing-default)',
          border: '1px solid var(--lufa-token-color-border-light)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-secondary)',
        }}
      >
        <div
          style={{
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            marginBottom: '12px',
          }}
        >
          Line Styles with Emphasis Levels
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Solid: All Emphasis Levels
          </div>
          <Divider lineStyle="solid" emphasis="subtle" />
          <Divider lineStyle="solid" emphasis="default" />
          <Divider lineStyle="solid" emphasis="moderate" />
          <Divider lineStyle="solid" emphasis="strong" />
          <Divider lineStyle="solid" emphasis="bold" />
        </div>

        <div>
          <div
            style={{
              fontSize: 'var(--lufa-token-font-size-xs)',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: '8px',
            }}
          >
            Dashed: All Emphasis Levels
          </div>
          <Divider lineStyle="dashed" emphasis="subtle" />
          <Divider lineStyle="dashed" emphasis="default" />
          <Divider lineStyle="dashed" emphasis="moderate" />
          <Divider lineStyle="dashed" emphasis="strong" />
          <Divider lineStyle="dashed" emphasis="bold" />
        </div>
      </div>
    </div>
  );
}

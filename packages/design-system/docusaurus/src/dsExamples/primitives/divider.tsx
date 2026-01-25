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
    <div
      style={{
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--lufa-token-font-size-body)',
          color: 'var(--lufa-token-color-text-primary)',
        }}
      >
        Section Above
      </div>
      <Divider />
      <div
        style={{
          fontSize: 'var(--lufa-token-font-size-body)',
          color: 'var(--lufa-token-color-text-primary)',
        }}
      >
        Section Below
      </div>
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
        border: '1px solid var(--lufa-token-color-border-base)',
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
            border: '1px solid var(--lufa-token-color-border-subtle)',
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
        border: '1px solid var(--lufa-token-color-border-base)',
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
            border: '1px solid var(--lufa-token-color-border-subtle)',
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
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {spacings.map(({ value, margin, description }) => (
        <div
          key={value}
          style={{
            padding: 'var(--lufa-token-spacing-default)',
            border: '1px solid var(--lufa-token-color-border-subtle)',
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
              backgroundColor: 'var(--lufa-token-color-background-subtle)',
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
        border: '1px solid var(--lufa-token-color-border-base)',
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
            border: '1px solid var(--lufa-token-color-border-subtle)',
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
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-subtle)',
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

/**
 * Real-world usage examples
 */
export function RealWorldExamples() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--lufa-token-spacing-comfortable)',
        padding: 'var(--lufa-token-spacing-default)',
        border: '1px solid var(--lufa-token-color-border-base)',
        borderRadius: 'var(--lufa-token-radius-base)',
      }}
    >
      {/* Section breaks example */}
      <div
        style={{
          padding: 'var(--lufa-token-spacing-default)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
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
          Section Breaks in Content
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--lufa-token-color-text-primary)' }}>
          Introduction
        </div>
        <div style={{ fontSize: '13px', color: 'var(--lufa-token-color-text-secondary)' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <Divider spacing="comfortable" />
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--lufa-token-color-text-primary)' }}>
          Main Content
        </div>
        <div style={{ fontSize: '13px', color: 'var(--lufa-token-color-text-secondary)' }}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>

      {/* List separation example */}
      <div
        style={{
          padding: 'var(--lufa-token-spacing-default)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
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
          List Item Separation
        </div>
        <div style={{ fontSize: '13px', color: 'var(--lufa-token-color-text-primary)', padding: '8px 0' }}>
          Item 1 - First entry
        </div>
        <Divider emphasis="subtle" spacing="compact" />
        <div style={{ fontSize: '13px', color: 'var(--lufa-token-color-text-primary)', padding: '8px 0' }}>
          Item 2 - Second entry
        </div>
        <Divider emphasis="subtle" spacing="compact" />
        <div style={{ fontSize: '13px', color: 'var(--lufa-token-color-text-primary)', padding: '8px 0' }}>
          Item 3 - Third entry
        </div>
      </div>

      {/* Toolbar example */}
      <div
        style={{
          padding: 'var(--lufa-token-spacing-default)',
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          backgroundColor: 'var(--lufa-token-color-background-base)',
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
          Toolbar with Vertical Dividers
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px',
            backgroundColor: 'var(--lufa-token-color-background-subtle)',
            borderRadius: 'var(--lufa-token-radius-sm)',
          }}
        >
          <button
            style={{
              padding: '6px 12px',
              background: 'white',
              border: '1px solid var(--lufa-token-color-border-base)',
              borderRadius: 'var(--lufa-token-radius-sm)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Cut
          </button>
          <button
            style={{
              padding: '6px 12px',
              background: 'white',
              border: '1px solid var(--lufa-token-color-border-base)',
              borderRadius: 'var(--lufa-token-radius-sm)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Copy
          </button>
          <Divider orientation="vertical" spacing="compact" />
          <button
            style={{
              padding: '6px 12px',
              background: 'white',
              border: '1px solid var(--lufa-token-color-border-base)',
              borderRadius: 'var(--lufa-token-radius-sm)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Undo
          </button>
          <button
            style={{
              padding: '6px 12px',
              background: 'white',
              border: '1px solid var(--lufa-token-color-border-base)',
              borderRadius: 'var(--lufa-token-radius-sm)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Redo
          </button>
        </div>
      </div>

      {/* Card footer example */}
      <div
        style={{
          border: '1px solid var(--lufa-token-color-border-subtle)',
          borderRadius: 'var(--lufa-token-radius-sm)',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            fontSize: 'var(--lufa-token-font-size-sm)',
            fontWeight: 'var(--lufa-token-font-weight-semibold)',
            color: 'var(--lufa-token-color-text-primary)',
            padding: 'var(--lufa-token-spacing-default)',
            backgroundColor: 'var(--lufa-token-color-background-subtle)',
          }}
        >
          Card with Footer Divider
        </div>
        <div style={{ padding: 'var(--lufa-token-spacing-default)' }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--lufa-token-color-text-primary)',
              marginBottom: '8px',
            }}
          >
            Card Title
          </div>
          <div style={{ fontSize: '13px', color: 'var(--lufa-token-color-text-secondary)' }}>
            This is the main content of the card. It contains important information.
          </div>
        </div>
        <Divider spacing="compact" />
        <div
          style={{
            padding: '12px var(--lufa-token-spacing-default)',
            backgroundColor: 'var(--lufa-token-color-background-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          <button
            style={{
              padding: '6px 16px',
              background: 'white',
              border: '1px solid var(--lufa-token-color-border-base)',
              borderRadius: 'var(--lufa-token-radius-sm)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Cancel
          </button>
          <button
            style={{
              padding: '6px 16px',
              background: 'var(--lufa-token-color-background-primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--lufa-token-radius-sm)',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

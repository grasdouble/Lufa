import React from 'react';

/**
 * PaddingVisualizer Props
 */
export type PaddingVisualizerProps = {
  /** Background color for the padding area visualization. Uses info token by default for theme consistency. */
  color?: string;
  /** Opacity of the background color (0-1) */
  opacity?: number;
  /** Whether to show a border around the content area */
  showBorder?: boolean;
  /** Whether to show a label with the padding value */
  showLabel?: boolean;
  /** Label text to display (e.g., "32px", "Top: 32px") */
  label?: string;
  /** Content inside the padding area */
  children: React.ReactNode;
};

/**
 * PaddingVisualizer
 *
 * Helper component to visualize padding areas in Storybook stories.
 * Shows the padding space with a semi-transparent background color.
 *
 * **Use Case:**
 * - Stories demonstrating padding properties (padding, paddingTop, paddingX, etc.)
 * - Visual indication of how much padding is applied
 * - Helps users understand the difference between padding variants
 *
 * **How it works:**
 * - Wraps the content in a container with a background color
 * - The Box component's padding creates space between the container edge and content
 * - The background color fills the padding area, making it visible
 * - Optional border around the content area for clearer separation
 * - Optional label to show the exact padding value
 *
 * @example
 * ```tsx
 * // Using default token-based color
 * <PaddingVisualizer showLabel label="32px">
 *   <Box paddingTop="spacious" background="surface">
 *     Content with top padding
 *   </Box>
 * </PaddingVisualizer>
 * ```
 *
 * @example
 * ```tsx
 * // With custom color, border and opacity
 * <PaddingVisualizer
 *   color="#ec4899"
 *   opacity={0.2}
 *   showBorder
 *   showLabel
 *   label="Top: 32px"
 * >
 *   <Box paddingTop="spacious">
 *     Content
 *   </Box>
 * </PaddingVisualizer>
 * ```
 */
export const PaddingVisualizer: React.FC<PaddingVisualizerProps> = ({
  color, // Use token-based default if not provided
  opacity = 0.15,
  showBorder = false,
  showLabel = false,
  label = '',
  children,
}) => {
  // Use token-based color if no custom color provided
  const defaultColor = 'var(--lufa-semantic-ui-background-info)';
  const finalColor = color ?? defaultColor;

  // Extract token name from CSS variable for educational purposes
  const extractTokenName = (colorValue: string): string | null => {
    // Ensure colorValue is a string before calling string methods
    if (typeof colorValue !== 'string') {
      return null;
    }
    if (colorValue.startsWith('var(')) {
      const match = /--lufa-([a-z-]+)/.exec(colorValue);
      return match ? match[1] : null;
    }
    return null;
  };

  const tokenName = extractTokenName(finalColor);

  // Convert hex color to rgba for opacity
  const hexToRgba = (hex: string, alpha: number): string => {
    // Validate that hex is a string
    if (!hex || typeof hex !== 'string') {
      console.warn('PaddingVisualizer: Invalid color provided (expected string):', hex);
      return `rgba(200, 200, 200, ${alpha})`; // Fallback to gray
    }

    // If it's a CSS variable, use color-mix
    if (hex.startsWith('var(')) {
      return `color-mix(in srgb, ${hex} ${alpha * 100}%, transparent)`;
    }

    // If it's already an rgb/rgba, return as-is with opacity adjustment
    if (hex.startsWith('rgb')) {
      return hex.replace(/[\d.]+\)$/g, `${alpha})`);
    }

    // Handle hex colors
    const cleanHex = hex.startsWith('#') ? hex : `#${hex}`;
    const r = parseInt(cleanHex.slice(1, 3), 16);
    const g = parseInt(cleanHex.slice(3, 5), 16);
    const b = parseInt(cleanHex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const backgroundColor = hexToRgba(finalColor, opacity);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor,
        borderRadius: '4px',
      }}
      title={tokenName ? `Token: ${tokenName}` : undefined}
    >
      {/* Label (if enabled) */}
      {showLabel && label && (
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            backgroundColor: finalColor,
            color: 'var(--lufa-semantic-ui-background-on-primary)',
            fontSize: '10px',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '3px',
            zIndex: 10,
            lineHeight: 1.4,
          }}
        >
          {label}
        </div>
      )}

      {/* Token name badge (shown when using token-based colors) */}
      {tokenName && (
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            left: '4px',
            fontSize: '9px',
            fontWeight: 600,
            color: 'var(--lufa-semantic-ui-text-secondary)',
            backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
            padding: '2px 6px',
            borderRadius: '3px',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
            zIndex: 10,
            pointerEvents: 'none',
            fontFamily: 'monospace',
            opacity: 0.8,
          }}
          title={`Using design token: --lufa-${tokenName}`}
        >
          🏷️ {tokenName}
        </div>
      )}

      {/* Content wrapper with optional border */}
      <div
        style={{
          ...(showBorder && {
            border: `2px dashed ${finalColor}`,
            borderRadius: '4px',
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

PaddingVisualizer.displayName = 'PaddingVisualizer';

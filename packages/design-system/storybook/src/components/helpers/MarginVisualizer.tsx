/**
 * MarginVisualizer
 *
 * A helper component that visualizes margins by providing a colored background
 * that fits exactly the content size (including the margin space).
 *
 * **How it works:**
 * - Uses `display: inline-block` to fit content size
 * - Applies a colored background to show the margin area
 * - The margin applied to the child "pushes" against this background, making it visible
 *
 * **Use Cases:**
 * - Visualizing margin props in Box component stories
 * - Showing how margin creates space around elements
 * - Demonstrating margin variants (tight, compact, default, comfortable, spacious)
 *
 * **Note:** Default colors use design system tokens for theme consistency.
 * Custom colors can be provided for specific visualization needs.
 *
 * @example
 * ```tsx
 * // Using default token-based color
 * <MarginVisualizer>
 *   <Box margin="spacious" padding="default">Content</Box>
 * </MarginVisualizer>
 * ```
 *
 * @example With custom background color
 * ```tsx
 * <MarginVisualizer color="#ec4899" opacity={0.15}>
 *   <Box marginTop="comfortable">Content</Box>
 * </MarginVisualizer>
 * ```
 */
export type MarginVisualizerProps = {
  /**
   * The component with margin to visualize
   */
  children: React.ReactNode;

  /**
   * Background color (hex or named color)
   * @default Uses info-default token for theme consistency
   */
  color?: string;

  /**
   * Background opacity (0-1)
   * @default 0.12
   */
  opacity?: number;

  /**
   * Border color (hex or named color)
   * Uses color with 50% opacity if not specified
   */
  borderColor?: string;

  /**
   * Border width in pixels
   * @default 2
   */
  borderWidth?: number;

  /**
   * Border radius in pixels
   * @default 6
   */
  borderRadius?: number;

  /**
   * Show dimension label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Label text (e.g., "32px")
   */
  label?: string;
};

export const MarginVisualizer = ({
  children,
  color, // Will use CSS variable as default if not provided
  opacity = 0.12,
  borderColor,
  borderWidth = 2,
  borderRadius = 6,
  showLabel = false,
  label,
}: MarginVisualizerProps) => {
  // Use token-based color if no custom color provided
  const defaultColor = 'var(--lufa-semantic-ui-background-info)';
  const finalColor = color || defaultColor;

  // Extract token name from CSS variable for educational purposes
  const extractTokenName = (colorValue: string): string | null => {
    if (colorValue?.startsWith('var(')) {
      const match = /--lufa-([a-z-]+)/.exec(colorValue);
      return match ? match[1] : null;
    }
    return null;
  };

  const tokenName = extractTokenName(finalColor);

  // For CSS variables, we can't compute hex alpha, so use rgba with opacity
  const backgroundColor = finalColor.startsWith('var(')
    ? `color-mix(in srgb, ${finalColor} ${opacity * 100}%, transparent)`
    : `${finalColor}${Math.round(opacity * 255)
        .toString(16)
        .padStart(2, '0')}`;

  const computedBorderColor =
    borderColor ||
    (finalColor.startsWith('var(') ? `color-mix(in srgb, ${finalColor} 50%, transparent)` : `${finalColor}80`);

  return (
    <div
      style={{
        display: 'inline-block',
        backgroundColor,
        border: `${borderWidth}px solid ${computedBorderColor}`,
        borderRadius: `${borderRadius}px`,
        position: 'relative',
      }}
      title={tokenName ? `Token: ${tokenName}` : undefined}
    >
      {/* Optional dimension label */}
      {showLabel && label && (
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            fontSize: '10px',
            fontWeight: 600,
            color: finalColor,
            backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
            padding: '2px 6px',
            borderRadius: '3px',
            border: `1px solid ${finalColor}`,
            zIndex: 10,
            pointerEvents: 'none',
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

      {children}
    </div>
  );
};

MarginVisualizer.displayName = 'MarginVisualizer';

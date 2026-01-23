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
 * @example
 * ```tsx
 * <MarginVisualizer color="#3b82f6">
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
export interface MarginVisualizerProps {
  /**
   * The component with margin to visualize
   */
  children: React.ReactNode;

  /**
   * Background color (hex or named color)
   * @default '#3b82f6' (blue)
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
}

export const MarginVisualizer = ({
  children,
  color = '#3b82f6',
  opacity = 0.12,
  borderColor,
  borderWidth = 2,
  borderRadius = 6,
  showLabel = false,
  label,
}: MarginVisualizerProps) => {
  const backgroundColor = `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
  const computedBorderColor = borderColor || `${color}80`; // 50% opacity if not specified

  return (
    <div
      style={{
        display: 'inline-block',
        backgroundColor,
        border: `${borderWidth}px solid ${computedBorderColor}`,
        borderRadius: `${borderRadius}px`,
        position: 'relative',
      }}
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
            color: color,
            backgroundColor: 'white',
            padding: '2px 6px',
            borderRadius: '3px',
            border: `1px solid ${color}`,
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {label}
        </div>
      )}

      {children}
    </div>
  );
};

MarginVisualizer.displayName = 'MarginVisualizer';
